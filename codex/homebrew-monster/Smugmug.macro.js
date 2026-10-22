/**
 * Smugmug, the Grinning Boss — CR 3 goblin boss, Mortal tier, legendary boss
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
 *     as a CR 3 goblin boss. Portrait, token, disposition and folder are kept.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Smugmug";
  const MAKE_BACKUP = false;   // true = copy "Smugmug (backup)" before wiping
  const DC = "13";             // 8 + Prof 2 + CHA 3

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
    const shivAttack = (activationData, rangeData = { override: true, value: "5", units: "ft" }) => act("attack", {
      ...activationData,
      range: rangeData,
      target: { override: true, affects: { count: "1", type: "creature" } },
      attack: { ability: "dex", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
      damage: { includeBase: false, parts: [{ number: 1, denomination: 4, bonus: "@mod", types: ["piercing"] }] }
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

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const smugItems = [
      // ---- Traits ----
      feat("Mortal Being", "icons/magic/nature/leaf-glow-green.webp",
        "<p><strong>Tier of Being: Mortal.</strong> Smugmug is an ordinary goblin with an extraordinary opinion of himself.</p>"
        + "<p><em>Tier Gap:</em> Creatures one tier above him (Ascendant) gain a +5 bonus to d20 Tests that involve him, and creatures two or more tiers above can't be affected by him at all.</p>"),

      feat("Legendary Resistance (2/Day, or 3/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Smugmug fails a saving throw, he can choose to succeed instead (he insists it was on purpose). Mortal tier = 2 uses. In his lair (his warren of stolen junk) he has 3 uses instead of 2 (set the maximum to 3 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Dirty Fighting", "icons/weapons/daggers/dagger-curved-poison-green.webp",
        "<p>Once per round, when Smugmug hits a creature with an attack and he has Advantage on the roll or one of his allies is within 5 feet of the target, the target takes an extra 7 (2d6) Piercing damage.</p>",
        { activities: [act("damage", {
          activation: activation("special", { condition: "Once per round, on a hit with Advantage or an ally next to the target" }),
          damage: { parts: [{ number: 2, denomination: 6, bonus: "", types: ["piercing"] }] }
        })] }),

      feat("Smug Bastard", "icons/skills/social/intimidation-impressing.webp",
        "<p>While Smugmug has more than half his Hit Points, he has Advantage on saving throws against the Charmed and Frightened conditions. Once he is Bloodied, the grin slips: he loses this benefit, but his allies within 30 feet have Advantage on their next attack roll as he screams at them to \"DO SOMETHING!\"</p>"),

      // ---- Actions ----
      feat("Multiattack", "icons/weapons/daggers/dagger-jeweled-purple.webp",
        "<p>Smugmug makes two attacks, using Lucky Shiv or Pocket Crossbow in any combination.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      feat("Lucky Shiv", "icons/weapons/daggers/dagger-jeweled-purple.webp",
        "<p>A gaudy, gem-crusted dagger he swears he won fairly. <em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 5 (1d4 + 3) Piercing damage.</p>",
        { activities: [shivAttack({ activation: activation("action") })] }),

      feat("Pocket Crossbow", "icons/weapons/crossbows/handcrossbow-black.webp",
        "<p><em>Ranged Attack Roll:</em> +5, range 30/120 ft. <em>Hit:</em> 6 (1d6 + 3) Piercing damage.</p>",
        { activities: [act("attack", {
          activation: activation("action"),
          range: { override: true, value: "30", long: "120", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "dex", bonus: "", flat: false, type: { value: "ranged", classification: "weapon" } },
          damage: { includeBase: false, parts: [{ number: 1, denomination: 6, bonus: "@mod", types: ["piercing"] }] }
        })] }),

      feat("Jar of Bad Ideas (Recharge 5–6)", "icons/consumables/potions/bottle-round-corked-orange.webp",
        "<p>Smugmug hurls a jar of alchemist's fire, lamp oil and something that's still moving. Each creature in a 10-foot-radius Sphere centered on a point within 30 feet of him makes a DC 13 Dexterity saving throw. <em>Failure:</em> 10 (3d6) Fire damage. <em>Success:</em> Half damage.</p>",
        {
          uses: RECHARGE(5),
          activities: [act("save", {
            activation: activation("action"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, value: "30", units: "ft" },
            target: { override: true, template: { type: "sphere", size: "10", units: "ft" }, affects: { type: "creature" } },
            save: { ability: ["dex"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "half", parts: [{ number: 3, denomination: 6, bonus: "", types: ["fire"] }] }
          })]
        }),

      // ---- Bonus Actions ----
      feat("Nimble Escape", "icons/skills/movement/feet-winged-boots-brown.webp",
        "<p>Smugmug takes the Disengage or Hide action.</p>",
        { activities: [act("utility", { activation: activation("bonus") })] }),

      // ---- Reactions ----
      feat("Not Me, Him!", "icons/skills/social/diplomacy-handshake.webp",
        "<p><em>Trigger:</em> A creature Smugmug can see targets him with an attack roll while one of his allies is within 5 feet of him. <em>Response:</em> Smugmug and that ally swap places, and the ally becomes the target instead.</p>",
        { activities: [act("utility", { activation: activation("reaction", { condition: "Targeted by an attack with an ally within 5 ft" }) })] }),

      // ---- Legendary Actions (3 uses, Mortal tier, regained at the start of his turn) ----
      feat("Cheap Shot (Costs 1 Action)", "icons/weapons/daggers/dagger-jeweled-purple.webp",
        "<p>Smugmug makes one Lucky Shiv or Pocket Crossbow attack. He can't take this option again until the start of his next turn.</p>",
        { activities: [shivAttack(legendary(1, "Once per round"))] }),

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

    const biography = "<h2>Smugmug, the Grinning Boss</h2>"
      + "<p>A goblin boss who believes he is the cleverest creature alive and is right just often enough to be dangerous. He never stops grinning, never fights fair, and always keeps a few goblins nearby to stand between him and anyone with a sword. Everything he owns is stolen, and he'll tell you each piece was a gift.</p>"
      + "<p><strong>Tier of Being:</strong> Mortal.</p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Round 1:</strong> Jar of Bad Ideas on the most clumped PCs, then Cheap Shot at whoever is next to one of his goblins (Dirty Fighting).</li>"
      + "<li><strong>Every round:</strong> Two attacks on a target that has a goblin next to it, Nimble Escape (Hide) behind cover, and Not Me, Him! to shove a minion into the way.</li>"
      + "<li><strong>Legendary:</strong> Nyah-Nyah! on the biggest hitter, Scamper away from melee, Cheap Shot when Dirty Fighting is still unused this round.</li>"
      + "<li><strong>When Bloodied:</strong> He screams for help (Smug Bastard) and starts looking for the exit.</li>"
      + "<li><strong>When losing:</strong> He surrenders instantly, offers to betray his employer, and tries to slip away the moment no one is watching.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>Kill or push away his goblins first: without allies nearby, Dirty Fighting needs Advantage and Not Me, Him! does nothing.</li>"
      + "<li>Spread out against Jar of Bad Ideas.</li>"
      + "<li>His Strength and Wisdom are poor; grapples and control spells work once Legendary Resistance is spent.</li>"
      + "<li>He's a coward: Intimidation or a show of force can end the fight early.</li></ul>"
      + "<h3>Encounter</h3>"
      + "<p><strong>Project rule (NPC-Design-system):</strong> CR 3 = a fair boss fight for 4 level-3 PCs. Add 2–4 ordinary goblins (CR 1/4) to make Dirty Fighting and Not Me, Him! work; add more for 5+ PCs.</p>"
      + "<h3>CR Check</h3>"
      + "<p><strong>Defense ≈ CR 3:</strong> AC 15 (studded leather). HP 78 + Legendary Resistance 2/Day (+10 each at CR 1–4 = 20) = ~98 effective (CR 2), +1 for AC 2 above the CR 3 norm = CR 3.</p>"
      + "<p><strong>Offense ≈ CR 3:</strong> best 3 rounds at +5 / DC 13: round 1 Jar of Bad Ideas 10.5 on 2 targets (21) + Cheap Shot 5.5 + Dirty Fighting 7 = 33.5; rounds 2–3 two attacks (11) + Dirty Fighting 7 + Cheap Shot 5.5 = 23.5 each. Average ≈ 27 (top of CR 3 / bottom of CR 4). "
      + "Final ≈ CR 3.</p>";

    const smugSystem = {
      abilities: {
        str: { value: 8, proficient: 0 }, dex: { value: 16, proficient: 1 }, con: { value: 16, proficient: 0 },
        int: { value: 12, proficient: 0 }, wis: { value: 8, proficient: 0 }, cha: { value: 16, proficient: 1 },
        hon: { value: 6, proficient: 0 }, san: { value: 10, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 15 },
        hp: { value: 78, max: 78, temp: 0, tempmax: 0, formula: "12d6 + 36" },
        init: { ability: "", bonus: "" },
        movement: { walk: "30", burrow: "", climb: "", fly: "", swim: "", units: "ft", hover: false },
        senses: { ranges: { darkvision: 60, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" },
        spellcasting: ""
      },
      details: {
        cr: 3,
        alignment: "Chaotic Neutral",
        type: { value: "fey", subtype: "Goblinoid", swarm: "", custom: "" },
        habitat: { value: [{ type: "forest" }, { type: "underdark" }], custom: "" },
        treasure: { value: ["individual", "any"] },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 3, spent: 0 },   // Mortal tier = 3
        legres: { max: 2, spent: 0 },   // Mortal tier = 2
        lair: { value: false }
      },
      skills: {
        dec: { value: 2 },   // Expertise: +7
        ste: { value: 2 },   // Expertise: +7
        slt: { value: 1 },   // +5
        prc: { value: 1 }    // +1
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
    await addItems(smug, smugItems, failed);

    smug.sheet.render(true);
    ui.notifications.info(`${smug.name} rebuilt as a CR 3 goblin boss (${smugItems.length} items).`);
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Smugmug macro | ", err);
    ui.notifications.error(`Smugmug macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
