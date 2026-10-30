/**
 * Jack Underfog, the Kingdom Thief — CR 19 Halfling Rogue (twin daggers), Divine tier, legendary boss
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Jack Underfog" (all items and effects) and rebuilds it
 *     as a CR 19 Halfling Rogue with the Blessing of the Wind (2 actions, 2 bonus actions,
 *     2 reactions, double Speed). Portrait, token and folder are kept.
 *   - Domain ปล้นอาณาจักร: steals a piece of the world into his Vault. Size sets how long he keeps it.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Jack Underfog";
  const MAKE_BACKUP = false;   // true = copy "Jack Underfog (backup)" before wiping
  const DC = "21";             // flat DC for his features (8 + Prof 6 + DEX 7)

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const jack = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !jack ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const USE_ITEM = { type: "itemUses", target: "", value: "1" };
    const RECHARGE = n => ({ spent: 0, max: "1", recovery: [{ period: "recharge", formula: String(n), type: "recoverAll" }] });
    const DAILY = n => ({ spent: 0, max: String(n), recovery: [{ period: "day", type: "recoverAll" }] });
    const LEGACT = (cost = 1) => ({ type: "attribute", target: "resources.legact.value", value: String(cost) });
    const activation = (type, extra = {}) => ({ type, value: type === "legendary" ? 1 : null, override: false, condition: "", ...extra });
    const act = (type, data = {}) => ({ _id: rid(), type, ...data });
    const feat = (name, img, desc, { activities = [], uses, effects } = {}) => ({
      name,
      type: "feat",
      img,
      ...(effects ? { effects } : {}),
      system: {
        type: { value: "monster", subtype: "" },
        description: { value: desc },
        activities: Object.fromEntries(activities.map((a, i) => [a._id, { sort: (i + 1) * 100000, ...a }])),
        ...(uses ? { uses } : {})
      }
    });
    const statusEffect = (name, img, statuses, duration, desc) => ({
      _id: rid(), name, img, transfer: false, statuses, duration, description: `<p>${desc}</p>`
    });
    const legendary = (cost, condition = "") => ({
      activation: activation("legendary", { value: cost, condition }),
      consumption: { spellSlot: true, targets: [LEGACT(cost)] }
    });

    async function wipe(actor) {
      const itemIds = actor.items.map(i => i.id);
      if ( itemIds.length ) await actor.deleteEmbeddedDocuments("Item", itemIds);
      const effectIds = actor.effects.map(e => e.id);
      if ( effectIds.length ) await actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);
    }

    async function addItems(actor, items, failed) {
      for ( const data of items ) {
        try { await actor.createEmbeddedDocuments("Item", [data]); }
        catch ( err ) { console.error(`Jack macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(data.name); }
      }
    }

    const failed = [];

    if ( MAKE_BACKUP ) {
      const data = jack.toObject();
      delete data._id;
      data.name = `${jack.name} (backup)`;
      await Actor.implementation.create(data);
    }

    /* ================================================================== */
    /*  Effects                                                           */
    /* ================================================================== */
    const vaultEffect = statusEffect("Stolen Away", "icons/magic/symbols/question-stone-yellow.webp", ["incapacitated"],
      { rounds: 1 }, "Stolen into Jack's Vault along with the plundered ground. The creature is removed from the scene, can't be targeted, and can't affect the scene. It repeats the Charisma saving throw at the end of each of its turns, reappearing in the nearest unoccupied space on a success.");

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const daggerParts = [{ number: 1, denomination: 4, bonus: "", types: ["slashing"] }];

    const jackItems = [
      // ---- Traits ----
      feat("Divine Being", "icons/magic/symbols/star-solid-gold.webp",
        "<p><strong>Tier of Being: Divine (Definition).</strong> Jack has defined himself: <em>\"nothing in this world is out of reach of my hands.\"</em> That definition, not his body, is the source of his existence. He doesn't age and can't die of old age.</p>"
        + "<p><em>Tier Gap:</em> For each tier Jack is above another creature, he gains +5 to every d20 Test that involves that creature (his attack rolls against it, his saving throws against its effects, and contested checks with it) and +5 AC against that creature's attacks (Ascendant +5, Mortal +10). The lower creature's other rolls are unchanged.</p>"),

      feat("Blessing of the Wind", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>The wind carries Jack twice as fast as anyone else. His Speed and Climb Speed are doubled (80 feet, included on the sheet).</p>"
        + "<p>On each of his turns he can take <strong>two actions</strong> and <strong>two bonus actions</strong>, and he has <strong>two reactions</strong> each round (he regains both at the start of his turn). He can't take the same bonus action twice in one turn, except Cunning Action.</p>"),

      feat("Halfling Daring", "icons/magic/control/fear-fright-white.webp",
        "<p><em>Luck:</em> When Jack rolls a 1 on the d20 of a D20 Test, he can reroll the die and must use the new roll.</p>"
        + "<p><em>Brave:</em> Jack has Advantage on saving throws he makes to avoid or end the Frightened condition.</p>"
        + "<p><em>Halfling Nimbleness:</em> Jack can move through the space of any creature that is a size larger than him, but he can't stop in the same space.</p>"
        + "<p><em>Naturally Stealthy:</em> Jack can take the Hide action even when he is obscured only by a creature that is at least one size larger than him.</p>"),

      feat("Assassinate", "icons/skills/melee/strike-dagger-white-orange.webp",
        "<p>Jack has Advantage on Initiative rolls and on attack rolls against any creature that hasn't taken a turn in the combat yet.</p>"),

      feat("Sneak Attack (1/Turn, max 2/Round)", "icons/skills/melee/strike-dagger-white-orange.webp",
        "<p>Once per turn, Jack deals an extra 24 (7d6) damage when he hits a target with a dagger attack and has Advantage on the attack roll, or when the target is within 5 feet of an ally of his that doesn't have the Incapacitated condition and he doesn't have Disadvantage on the attack roll.</p>"
        + "<p>He can deal Sneak Attack damage no more than twice per round: once on his own turn and once on another creature's turn (through a reaction or a legendary action).</p>",
        { activities: [act("damage", {
          activation: activation("special", { condition: "Once per turn, max twice per round, on a dagger hit with Advantage or an ally nearby" }),
          damage: { parts: [{ number: 7, denomination: 6, bonus: "", types: ["piercing"] }] }
        })] }),

      feat("Evasion", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>If Jack is subjected to an effect that allows a Dexterity saving throw to take only half damage, he instead takes no damage on a success and only half damage on a failure. He can't use this trait if he has the Incapacitated condition.</p>"),

      feat("Legendary Resistance (4/Day, or 5/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Jack fails a saving throw, he can choose to succeed instead. Divine tier = 4 uses. In his lair he has 5 uses instead of 4 (set the maximum to 5 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      // ---- Actions ----
      feat("Multiattack", "icons/skills/melee/strike-dagger-white-orange.webp",
        "<p>Jack makes two Gale Dagger attacks, one with each hand. (With the Blessing of the Wind he can take this action twice on his turn.)</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      (() => {
        const a = act("attack", {
          activation: activation("action"),
          attack: { ability: "dex", bonus: "", flat: false, type: { value: "", classification: "" } },
          damage: { includeBase: true, parts: daggerParts }
        });
        return {
          name: "Gale Dagger",
          type: "weapon",
          img: "icons/skills/melee/strike-dagger-white-orange.webp",
          system: {
            type: { value: "simpleM", baseItem: "dagger" },
            quantity: 2, equipped: true, proficient: 1, identified: true,
            properties: ["fin", "lgt", "thr", "mgc"],
            range: { value: 20, long: 60, reach: null, units: "ft" },
            damage: { base: { number: 1, denomination: 4, bonus: "", types: ["piercing"] } },
            description: { value: "<p><em>Melee or Ranged Attack Roll:</em> +13, reach 5 ft. or range 20/60 ft. <em>Hit:</em> 9 (1d4 + 7) Piercing damage plus 2 (1d4) Slashing damage from the cutting wind. A thrown dagger flies back to his hand at the end of the turn.</p>" },
            activities: { [a._id]: { sort: 100000, ...a } }
          }
        };
      })(),

      feat("Thousand Cuts (Recharge 5–6)", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>Jack becomes a gust of blades. He moves up to his Speed without provoking Opportunity Attacks, and each creature of his choice he passes within 5 feet of makes a DC 21 Dexterity saving throw. <em>Failure:</em> 27 (6d8) Slashing damage. <em>Success:</em> Half damage.</p>",
        {
          uses: RECHARGE(5),
          activities: [act("save", {
            activation: activation("action"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, units: "self" },
            target: { override: true, affects: { type: "creature", choice: true } },
            save: { ability: ["dex"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "half", parts: [{ number: 6, denomination: 8, bonus: "", types: ["slashing"] }] }
          })]
        }),

      feat("Domain: Plunder the Kingdom (1/Day)", "icons/magic/symbols/question-stone-yellow.webp",
        "<p><strong>Divine Domain — ปล้นอาณาจักร.</strong> Jack opens his Domain, the expression of his Definition: if nothing is out of reach, then even the ground itself can be stolen. He chooses an area he can see (anywhere in the scene, up to a whole city around him) and steals it into his Vault, a pocket dimension only he can open. Buildings, walls, floors, bridges, objects, and treasure in the area vanish, leaving only barren ground (or empty air: creatures standing on a stolen floor or bridge fall).</p>"
        + "<p><strong>The smaller the theft, the longer he keeps it.</strong> The area returns exactly as it was when the time runs out, or sooner if Jack chooses (no action required):</p><ul>"
        + "<li><strong>A city</strong> (up to 1 mile across): 1 day</li>"
        + "<li><strong>A castle or district</strong> (up to 500 feet across): 1 week</li>"
        + "<li><strong>A building</strong> (up to 100 feet across): 1 month</li>"
        + "<li><strong>A room</strong> (up to a 20-foot Cube): 1 year</li>"
        + "<li><strong>A single object</strong> he could hold in one hand: until he returns it</li></ul>"
        + "<p><strong>Creatures:</strong> Creatures in the area are left behind on the barren ground, except those Jack chooses. Each chosen creature makes a DC 21 Charisma saving throw. <em>Failure:</em> It is stolen into the Vault with the area: it is removed from the scene and has the Incapacitated condition. It repeats the save at the end of each of its turns, reappearing in the nearest unoccupied space on a success. A creature still in the Vault when the area returns comes back with it.</p>"
        + "<p>Opening the Domain takes an action and doesn't require Concentration. Unlike other Domains, it has no 1-minute duration: the size of the theft sets how long it lasts.</p>",
        {
          uses: DAILY(1),
          effects: [vaultEffect],
          activities: [act("save", {
            activation: activation("action"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, value: "", units: "spec", special: "Any area in the scene, up to a city" },
            target: { override: true, affects: { type: "creature", choice: true } },
            save: { ability: ["cha"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "none", parts: [] },
            effects: [{ _id: vaultEffect._id, onSave: false }]
          })]
        }),

      // ---- Bonus Actions ----
      feat("Cunning Action", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>Jack takes the Dash, Disengage, or Hide action. (He can take this bonus action twice on his turn.)</p>",
        { activities: [act("utility", { activation: activation("bonus") })] }),

      feat("Twin Fang", "icons/skills/melee/strike-dagger-white-orange.webp",
        "<p>Jack makes one Gale Dagger attack. He can take this bonus action only once per turn.</p>",
        { activities: [act("utility", { activation: activation("bonus", { condition: "Once per turn" }) })] }),

      // ---- Reactions (two per round) ----
      feat("Uncanny Dodge", "icons/magic/defensive/shield-barrier-blue.webp",
        "<p><em>Trigger:</em> An attacker Jack can see hits him with an attack roll. <em>Response:</em> Jack halves the attack's damage against him.</p>",
        { activities: [act("utility", { activation: activation("reaction", { condition: "Hit by an attack roll from a seen attacker" }) })] }),

      feat("Riposte of the Wind", "icons/skills/melee/strike-dagger-white-orange.webp",
        "<p><em>Trigger:</em> A creature within 5 feet of Jack misses him with a melee attack. <em>Response:</em> Jack makes one Gale Dagger attack against it.</p>",
        { activities: [act("utility", { activation: activation("reaction", { condition: "Missed by a melee attack within 5 feet" }) })] }),

      // ---- Legendary Actions (5 uses, Divine tier, regained at the start of his turn) ----
      feat("Gale Strike (Costs 1 Action)", "icons/skills/melee/strike-dagger-white-orange.webp",
        "<p>Jack makes one Gale Dagger attack. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("utility", legendary(1, "Once per round"))] }),

      feat("Slip the Wind (Costs 1 Action)", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>Jack moves up to half his Speed (40 feet) without provoking Opportunity Attacks. If he ends the move obscured, he can take the Hide action.</p>",
        { activities: [act("utility", legendary(1))] }),

      feat("Pickpocket (Costs 2 Actions)", "icons/magic/symbols/question-stone-yellow.webp",
        "<p>Jack snatches something from one creature within 5 feet of him. The target makes a DC 21 Dexterity saving throw. <em>Failure:</em> Jack takes one object the target is holding or wearing that isn't armor or a shield (a weapon, wand, spellcasting focus, potion, holy symbol, ring, and so on). The object goes into his Vault. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("save", {
          ...legendary(2, "Once per round"),
          range: { override: true, value: "5", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          save: { ability: ["dex"], dc: { calculation: "", formula: DC } },
          damage: { onSave: "none", parts: [] }
        })] })
    ];

    const biography = "<h2>Jack Underfog, the Kingdom Thief</h2>"
      + "<p>A halfling rogue as bold as he is quick. The wind blessed him, so he moves twice as fast and acts twice as often as anyone around him. He fights with a dagger in each hand, laughs while he does it, and once stole a whole city for a day just to prove he could.</p>"
      + "<p><strong>Tier of Being:</strong> Divine. Definition: <em>\"nothing in this world is out of reach of my hands.\"</em></p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Round 1:</strong> Assassinate gives him Advantage on Initiative and on every attack against anyone who hasn't acted. He closes 80 feet, takes two Multiattacks (four dagger attacks) plus Twin Fang, and Sneak Attacks the party's caster.</li>"
      + "<li><strong>Every turn:</strong> One action on Multiattack, the other on Multiattack or Thousand Cuts when it recharges. His second bonus action is Cunning Action: Disengage out, or Hide behind a bigger ally (Naturally Stealthy).</li>"
      + "<li><strong>Off his turn:</strong> Gale Strike on a different creature's turn for his second Sneak Attack. Pickpocket the healer's holy symbol or the wizard's focus. Slip the Wind to stay out of reach.</li>"
      + "<li><strong>Two reactions:</strong> Uncanny Dodge on the biggest hit, Riposte of the Wind when a melee PC whiffs.</li>"
      + "<li><strong>Domain:</strong> In a fight he steals the battlefield: the bridge the party stands on, the tower they hold, or the room around the tank. Chosen PCs who fail the save vanish into his Vault until they fight their way out.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>His HP is low for a CR 19 boss (253). Area effects that call for STR, CON, or WIS saves go around Evasion; Uncanny Dodge only halves two hits per round.</li>"
      + "<li>Grapples, Restrained, and difficult-to-escape terrain shut down the Blessing of the Wind: double Speed means nothing at 0.</li>"
      + "<li>Stand apart from each other so he gets no Sneak Attack from adjacent allies, and give him no hiding places.</li>"
      + "<li>Keep important items stowed rather than in hand; Pickpocket can only take what is held or worn.</li>"
      + "<li>Against the Domain: a Charisma save keeps you out of the Vault. A creature inside keeps saving each turn until it escapes.</li></ul>"
      + "<h3>CR Check</h3>"
      + "<p>Defense ≈ CR 18 (AC 19, 253 HP, two Uncanny Dodges per round, Evasion, Legendary Resistance 4/Day, Halfling Luck, 80 ft of Speed). "
      + "Offense ≈ CR 20 (best 3 rounds average ~143 damage per round at +13 to hit, DC 21: on his turn five dagger hits × 12 = 60 + Sneak Attack 24; off his turn Gale Strike 12 + a second Sneak Attack 24 + Riposte 12; plus Thousand Cuts on 2 targets about once every 3 rounds, ~10 per round). "
      + "Average ≈ CR 19. The double action economy is paid for with small hits (12 each) and a hard cap of two Sneak Attacks per round. The Domain is control, not damage: it removes PCs or terrain rather than adding to the damage total.</p>";

    const jackSystem = {
      abilities: {
        str: { value: 12, proficient: 0 }, dex: { value: 24, proficient: 1 }, con: { value: 16, proficient: 0 },
        int: { value: 14, proficient: 1 }, wis: { value: 16, proficient: 1 }, cha: { value: 14, proficient: 0 },
        hon: { value: 9, proficient: 0 }, san: { value: 14, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 19 },
        hp: { value: 253, max: 253, temp: 0, tempmax: 0, formula: "39d6 + 117" },
        init: { ability: "", bonus: "" },
        movement: { walk: "80", burrow: "", climb: "80", fly: "", swim: "", units: "ft", hover: false },
        senses: { ranges: { darkvision: 120, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" }
      },
      details: {
        cr: 19,
        alignment: "Chaotic Neutral",
        type: { value: "humanoid", subtype: "Halfling, Rogue", swarm: "", custom: "" },
        habitat: { value: [{ type: "underdark" }, { type: "urban" }], custom: "" },
        treasure: { value: ["armaments", "individual"] },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 5, spent: 0 },   // Divine tier = 5
        legres: { max: 4, spent: 0 },   // Divine tier = 4
        lair: { value: false }
      },
      skills: {
        acr: { value: 1 },   // +13
        dec: { value: 1 },   // +8
        prc: { value: 1 },   // +9 (Passive 19)
        slt: { value: 1 },   // +13
        ste: { value: 2 }    // Expertise: +19
      },
      traits: {
        size: "sm",
        di: { value: [] },
        dr: { value: [] },
        dv: { value: [] },
        ci: { value: [] },
        languages: { value: ["common", "elvish", "cant", "undercommon"], custom: "" }
      }
    };

    await wipe(jack);
    await jack.update({
      system: jackSystem,
      "prototypeToken.actorLink": true,
      "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.HOSTILE
    });
    await addItems(jack, jackItems, failed);

    jack.sheet.render(true);
    ui.notifications.info(`${jack.name} rebuilt as a CR 19 Halfling Rogue (${jackItems.length} items).`);
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Jack macro | ", err);
    ui.notifications.error(`Jack macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
