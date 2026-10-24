/**
 * Smugmug, the Grinning Fist — CR 3 goblin monk, Mortal tier, legendary boss
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 * Built per Core-Rules/NPC-Design-system.md (CR 3 = fair boss for 4 level-3 PCs). Not a spellcaster (no slots).
 *
 * How to use:
 *   1. Create an NPC named "Smugmug" (any portrait/token you like).
 *   2. Macro Directory → Create Macro → Type: "Script"
 *   3. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Smugmug" (all items and effects) and rebuilds it
 *     as a CR 3 goblin monk. Portrait, token, disposition and folder are kept.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Smugmug";
  const MAKE_BACKUP = false;   // true = copy "Smugmug (backup)" before wiping
  const DC = "13";             // 8 + Prof 2 + WIS 3

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const smug = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !smug ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const USE_ITEM = { type: "itemUses", target: "", value: "1" };
    const RECHARGE = n => ({ spent: 0, max: "1", recovery: [{ period: "recharge", formula: String(n), type: "recoverAll" }] });
    const PER_DAY = n => ({ spent: 0, max: String(n), recovery: [{ period: "day", type: "recoverAll" }] });
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
    const fistAttack = activationData => act("attack", {
      ...activationData,
      range: { override: true, value: "5", units: "ft" },
      target: { override: true, affects: { count: "1", type: "creature" } },
      attack: { ability: "dex", bonus: "", flat: false, type: { value: "melee", classification: "unarmed" } },
      damage: { includeBase: false, parts: [{ number: 1, denomination: 6, bonus: "@mod", types: ["bludgeoning"] }] }
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
        catch ( err ) { console.error(`Smugmug macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(data.name); }
      }
    }

    const failed = [];

    if ( MAKE_BACKUP ) {
      const data = smug.toObject();
      delete data._id;
      data.name = `${smug.name} (backup)`;
      await Actor.implementation.create(data);
    }

    const tauntEffect = statusEffect("Smugmug's Taunt", "icons/skills/social/intimidation-impressing.webp", [], { rounds: 1, turns: 1 },
      "Has Disadvantage on its next attack roll before the end of its next turn.");
    const stunEffect = statusEffect("Stunning Strike", "icons/skills/melee/unarmed-punch-fist-yellow-red.webp", ["stunned"], { rounds: 1 },
      "Stunned until the start of Smugmug's next turn.");
    const proneEffect = statusEffect("Swept Off Their Feet", "icons/skills/movement/figure-running-gray.webp", ["prone"], {},
      "Knocked Prone by Sweeping Leg.");

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const smugItems = [
      // ---- Traits ----
      feat("Mortal Being", "icons/magic/nature/leaf-glow-green.webp",
        "<p><strong>Tier of Being: Mortal.</strong> Smugmug is an ordinary goblin with an extraordinary opinion of himself — and, annoyingly, the fists to back some of it up.</p>"
        + "<p><em>Tier Gap:</em> Creatures one tier above him (Ascendant) gain a +5 bonus to d20 Tests that involve him, and creatures two or more tiers above can't be affected by him at all.</p>"),

      feat("Legendary Resistance (2/Day, or 3/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Smugmug fails a saving throw, he can choose to succeed instead (he insists it was a feint). Mortal tier = 2 uses. In his lair (the \"dojo\" he stole from a retired master) he has 3 uses instead of 2 (set the maximum to 3 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Unarmored Defense & Movement", "icons/magic/defensive/shield-barrier-blue.webp",
        "<p>While Smugmug wears no armor and carries no Shield, his AC equals 10 + his Dexterity and Wisdom modifiers (16), and his Speed increases by 10 feet (included).</p>"),

      feat("Smug Bastard", "icons/skills/social/intimidation-impressing.webp",
        "<p>While Smugmug has more than half his Hit Points, he has Advantage on saving throws against the Charmed and Frightened conditions. Once he is Bloodied, the grin slips: he loses this benefit, but his allies within 30 feet have Advantage on their next attack roll as he screams at them to \"DO SOMETHING!\"</p>"),

      feat("Stunning Strike (3/Day)", "icons/skills/melee/unarmed-punch-fist-yellow-red.webp",
        "<p>Once per turn, when Smugmug hits a creature with an Unarmed Strike, he can jab a nerve point. The target makes a DC 13 Constitution saving throw. <em>Failure:</em> The target has the Stunned condition until the start of Smugmug's next turn. <em>Success:</em> The target's Speed is halved and the next attack roll against it before the start of Smugmug's next turn has Advantage.</p>",
        {
          uses: PER_DAY(3),
          effects: [stunEffect],
          activities: [act("save", {
            activation: activation("special", { condition: "Once per turn, on an Unarmed Strike hit" }),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, value: "5", units: "ft" },
            target: { override: true, affects: { count: "1", type: "creature" } },
            save: { ability: ["con"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "none", parts: [] },
            effects: [{ _id: stunEffect._id, onSave: false }]
          })]
        }),

      // ---- Actions ----
      feat("Multiattack", "icons/skills/melee/unarmed-punch-fist.webp",
        "<p>Smugmug makes two attacks, using Cheap Knuckles or Pocket Darts in any combination.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      feat("Cheap Knuckles", "icons/skills/melee/unarmed-punch-fist.webp",
        "<p>Brass-studded knuckle wraps, an eye-poke, a knee where it hurts. <em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 6 (1d6 + 3) Bludgeoning damage.</p>",
        { activities: [fistAttack({ activation: activation("action") })] }),

      feat("Pocket Darts", "icons/weapons/thrown/dart-feathered.webp",
        "<p><em>Ranged Attack Roll:</em> +5, range 20/60 ft. <em>Hit:</em> 5 (1d4 + 3) Piercing damage.</p>",
        { activities: [act("attack", {
          activation: activation("action"),
          range: { override: true, value: "20", long: "60", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "dex", bonus: "", flat: false, type: { value: "ranged", classification: "weapon" } },
          damage: { includeBase: false, parts: [{ number: 1, denomination: 4, bonus: "@mod", types: ["piercing"] }] }
        })] }),

      feat("Sweeping Leg (Recharge 5–6)", "icons/skills/melee/strike-sword-slashing-red.webp",
        "<p>Smugmug drops low and spins, kicking the legs out from everyone around him. Each creature within 5 feet of him makes a DC 13 Dexterity saving throw. <em>Failure:</em> 7 (2d6) Bludgeoning damage, and the target has the Prone condition. <em>Success:</em> Half damage only.</p>",
        {
          uses: RECHARGE(5),
          effects: [proneEffect],
          activities: [act("save", {
            activation: activation("action"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, units: "self" },
            target: { override: true, template: { type: "radius", size: "5", units: "ft" }, affects: { type: "creature" } },
            save: { ability: ["dex"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "half", parts: [{ number: 2, denomination: 6, bonus: "", types: ["bludgeoning"] }] },
            effects: [{ _id: proneEffect._id, onSave: false }]
          })]
        }),

      // ---- Bonus Actions ----
      feat("Martial Arts", "icons/skills/melee/unarmed-punch-fist.webp",
        "<p>Smugmug makes one Cheap Knuckles attack.</p>",
        { activities: [fistAttack({ activation: activation("bonus") })] }),

      feat("Nimble Escape", "icons/skills/movement/feet-winged-boots-brown.webp",
        "<p>Smugmug takes the Disengage, Dash or Dodge action (Step of the Wind / Patient Defense, but with more giggling).</p>",
        { activities: [act("utility", { activation: activation("bonus") })] }),

      // ---- Reactions ----
      feat("Not Me, Him!", "icons/skills/social/diplomacy-handshake.webp",
        "<p><em>Trigger:</em> Smugmug is hit by an attack roll that deals Bludgeoning, Piercing or Slashing damage. <em>Response:</em> He reduces the damage by 1d10 + 3 (Deflect Attacks). "
        + "If this reduces the damage to 0, he steers the blow into another creature he can see within 5 feet of him (preferably an ally of the attacker, but he isn't picky). That creature makes a DC 13 Dexterity saving throw. <em>Failure:</em> 10 (2d6 + 3) damage of the same type.</p>",
        { activities: [
          act("utility", {
            name: "Deflect",
            activation: activation("reaction", { condition: "Hit by an attack that deals B/P/S damage" }),
            roll: { formula: "1d10 + 3", name: "Damage reduced", prompt: false, visible: true }
          }),
          act("save", {
            name: "Redirect",
            activation: activation("special", { condition: "Deflect reduced the damage to 0" }),
            range: { override: true, value: "5", units: "ft" },
            target: { override: true, affects: { count: "1", type: "creature" } },
            save: { ability: ["dex"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "none", parts: [{ number: 2, denomination: 6, bonus: "3", types: ["bludgeoning"] }] }
          })
        ] }),

      // ---- Legendary Actions (3 uses, Mortal tier, regained at the start of his turn) ----
      feat("Cheap Shot (Costs 1 Action)", "icons/skills/melee/unarmed-punch-fist.webp",
        "<p>Smugmug makes one Cheap Knuckles attack. He can't take this option again until the start of his next turn.</p>",
        { activities: [fistAttack(legendary(1, "Once per round"))] }),

      feat("Scamper (Costs 1 Action)", "icons/skills/movement/feet-winged-boots-brown.webp",
        "<p>Smugmug moves up to half his Speed without provoking Opportunity Attacks.</p>",
        { activities: [act("utility", legendary(1))] }),

      feat("Nyah-Nyah! (Costs 2 Actions)", "icons/skills/social/intimidation-impressing.webp",
        "<p>Smugmug blows a raspberry at one creature within 30 feet that can hear him. It makes a DC 13 Wisdom saving throw. <em>Failure:</em> It has Disadvantage on its next attack roll before the end of its next turn.</p>",
        {
          effects: [tauntEffect],
          activities: [act("save", {
            ...legendary(2),
            range: { override: true, value: "30", units: "ft" },
            target: { override: true, affects: { count: "1", type: "creature" } },
            save: { ability: ["wis"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "none", parts: [] },
            effects: [{ _id: tauntEffect._id, onSave: false }]
          })]
        })
    ];

    const biography = "<h2>Smugmug, the Grinning Fist</h2>"
      + "<p>A goblin who spent one week sweeping the floors of a mountain monastery, decided he had learned everything, and left with the master's prayer beads. He calls his style \"the Way of the Open Palm (to the Face)\". Insufferable, quick, and genuinely good at it — which is the worst part. He never stops grinning, and he keeps a few goblins around to be hit instead of him.</p>"
      + "<p><strong>Tier of Being:</strong> Mortal.</p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Round 1:</strong> Dash in and Sweeping Leg when 2+ PCs are adjacent, then Martial Arts on a Prone target (Advantage).</li>"
      + "<li><strong>Every round:</strong> Multiattack + Martial Arts on the same target, Stunning Strike on the first hit against a caster or the biggest hitter.</li>"
      + "<li><strong>Reaction:</strong> Not Me, Him! on the first big weapon hit each round, aiming the redirect at another PC.</li>"
      + "<li><strong>Legendary:</strong> Cheap Shot after another creature's turn, Scamper out of melee, Nyah-Nyah! on whoever is about to hit him hardest.</li>"
      + "<li><strong>When Bloodied:</strong> He screams for help (Smug Bastard), swaps Martial Arts for Nimble Escape (Dodge), and looks for the exit.</li>"
      + "<li><strong>When losing:</strong> He bows deeply, \"concedes the sparring match\", and offers to teach the party his secret technique (there is no secret technique).</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>Spells and saving throws ignore Not Me, Him! — it only works against attack rolls.</li>"
      + "<li>Don't bunch up next to him (Sweeping Leg).</li>"
      + "<li>His Strength is poor: grapples and shoves work once Legendary Resistance is spent.</li>"
      + "<li>He's a coward: Intimidation or a show of force can end the fight early.</li></ul>"
      + "<h3>Encounter</h3>"
      + "<p><strong>Project rule (NPC-Design-system):</strong> CR 3 = a fair boss fight for 4 level-3 PCs. Add 2–3 ordinary goblins (CR 1/4) as meat shields; add more for 5+ PCs.</p>"
      + "<h3>CR Check</h3>"
      + "<p><strong>Defense ≈ CR 3:</strong> AC 16 (Unarmored Defense). HP 55 + Legendary Resistance 2/Day (+10 each at CR 1–4 = 20) + Not Me, Him! ~8.5 per round over 3 rounds (~25) = ~100 effective (CR 2), +1 for AC 3 above the CR 3 norm = CR 3.</p>"
      + "<p><strong>Offense ≈ CR 3:</strong> best 3 rounds at +5 / DC 13: round 1 Sweeping Leg 7 on 2 targets (14) + Martial Arts 6.5 + Cheap Shot 6.5 = 27; rounds 2–3 Multiattack (13) + Martial Arts 6.5 + Cheap Shot 6.5 = 26 each. Average ≈ 26 (top of CR 3). Stunning Strike adds control, not damage. "
      + "Final ≈ CR 3.</p>";

    const smugSystem = {
      abilities: {
        str: { value: 8, proficient: 0 }, dex: { value: 16, proficient: 1 }, con: { value: 14, proficient: 0 },
        int: { value: 10, proficient: 0 }, wis: { value: 16, proficient: 1 }, cha: { value: 14, proficient: 0 },
        hon: { value: 6, proficient: 0 }, san: { value: 10, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 16 },
        hp: { value: 55, max: 55, temp: 0, tempmax: 0, formula: "10d6 + 20" },
        init: { ability: "", bonus: "" },
        movement: { walk: "40", burrow: "", climb: "", fly: "", swim: "", units: "ft", hover: false },
        senses: { ranges: { darkvision: 60, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" },
        spellcasting: ""
      },
      details: {
        cr: 3,
        alignment: "Chaotic Neutral",
        type: { value: "fey", subtype: "Goblinoid", swarm: "", custom: "" },
        habitat: { value: [{ type: "forest" }, { type: "mountain" }], custom: "" },
        treasure: { value: ["individual", "any"] },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 3, spent: 0 },   // Mortal tier = 3
        legres: { max: 2, spent: 0 },   // Mortal tier = 2
        lair: { value: false }
      },
      skills: {
        acr: { value: 1 },   // +5
        dec: { value: 2 },   // Expertise: +6
        ste: { value: 2 },   // Expertise: +7
        prc: { value: 1 }    // +5
      },
      traits: {
        size: "sm",
        di: { value: [] },
        dr: { value: [] },
        dv: { value: [] },
        ci: { value: [] },
        languages: { value: ["common", "goblin"], custom: "" }
      }
    };

    await wipe(smug);
    await smug.update({ system: smugSystem, "prototypeToken.actorLink": true });
    // Clear skills left over from the old build (e.g. Sleight of Hand)
    const staleSkills = Object.keys(smug.system.skills ?? {}).filter(k => !(k in smugSystem.skills) && smug.system.skills[k].value);
    if ( staleSkills.length ) await smug.update(Object.fromEntries(staleSkills.map(k => [`system.skills.${k}.value`, 0])));
    await addItems(smug, smugItems, failed);

    smug.sheet.render(true);
    ui.notifications.info(`${smug.name} rebuilt as a CR 3 goblin monk (${smugItems.length} items).`);
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Smugmug macro | ", err);
    ui.notifications.error(`Smugmug macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
