/**
 * Elro Aldataur, the Thornveil Hunter — CR 15 Wood Elf Ranger (Hunter), Ascendant tier, legendary boss
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Elro Aldataur" (all items and effects) and rebuilds it
 *     as a CR 15 Wood Elf Ranger (was CR 12). Portrait, token and folder are kept.
 *   - Spells are copied from the system's spell compendium (2024 version preferred) as real,
 *     castable spells. If a spell isn't found, a placeholder spell with the same name is created.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Elro Aldataur";
  const MAKE_BACKUP = false;   // true = copy "Elro Aldataur (backup)" before wiping
  const DC = "18";             // flat DC for his features (= his spell save DC)

  // Ranger spellcasting (Wisdom, DC 18, +10 to hit).
  // NPC slot rule (Core-Rules/NPC-Design-system.md): CR 15 row, Hybrid (max 5th).
  const SLOTS = { spell1: 6, spell2: 6, spell3: 5, spell4: 5, spell5: 4 };
  // method: "spell" = uses slots (grouped by level), "innate" = own daily uses.
  // always: always prepared.
  const SPELLS = [
    { name: "Druidcraft", method: "spell" },
    { name: "Hunter's Mark", method: "spell", always: true },
    { name: "Ensnaring Strike", method: "spell" },
    { name: "Cure Wounds", method: "spell" },
    { name: "Pass without Trace", method: "spell" },
    { name: "Spike Growth", method: "spell" },
    { name: "Conjure Barrage", method: "spell" },
    { name: "Freedom of Movement", method: "spell" },
    { name: "Tree Stride", method: "spell" },
    { name: "Steel Wind Strike", method: "spell" }
  ];

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const elro = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !elro ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const USE_ITEM = { type: "itemUses", target: "", value: "1" };
    const RECHARGE = n => ({ spent: 0, max: "1", recovery: [{ period: "recharge", formula: String(n), type: "recoverAll" }] });
    const DAILY = n => ({ spent: 0, max: String(n), recovery: [{ period: "day", type: "recoverAll" }] });
    const LEGACT = { type: "attribute", target: "resources.legact.value", value: "1" };
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
    const statusEffect = (name, img, status, duration, desc) => ({
      _id: rid(), name, img, transfer: false, statuses: [status], duration, description: `<p>${desc}</p>`
    });
    const weapon = (name, img, typeValue, baseItem, properties, range, base, extraParts, desc) => {
      const a = act("attack", {
        activation: activation("action"),
        attack: { ability: "dex", bonus: "", flat: false, type: { value: "", classification: "" } },
        damage: { includeBase: true, parts: extraParts }
      });
      return {
        name,
        type: "weapon",
        img,
        system: {
          type: { value: typeValue, baseItem },
          quantity: 1, equipped: true, proficient: 1, identified: true,
          properties,
          range: { units: "ft", ...range },
          damage: { base },
          description: { value: desc },
          activities: { [a._id]: { sort: 100000, ...a } }
        }
      };
    };

    async function wipe(actor) {
      const itemIds = actor.items.map(i => i.id);
      if ( itemIds.length ) await actor.deleteEmbeddedDocuments("Item", itemIds);
      const effectIds = actor.effects.map(e => e.id);
      if ( effectIds.length ) await actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);
    }

    async function addItems(actor, items, failed) {
      for ( const data of items ) {
        try { await actor.createEmbeddedDocuments("Item", [data]); }
        catch ( err ) { console.error(`Elro macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(data.name); }
      }
    }

    // Find a spell in any Item compendium. Prefers 2024 packs (collection id containing "24").
    const itemPacks = game.packs.filter(p => p.documentName === "Item")
      .sort((a, b) => Number(b.collection.includes("24")) - Number(a.collection.includes("24")));
    async function findSpell(name) {
      const lower = name.toLowerCase();
      for ( const pack of itemPacks ) {
        const index = await pack.getIndex({ fields: ["type"] });
        const entry = index.find(e => (e.type === "spell") && (e.name.toLowerCase() === lower));
        if ( entry ) return (await pack.getDocument(entry._id)).toObject();
      }
      return null;
    }

    // Spells that may be missing from the SRD compendium, built by hand.
    const CUSTOM_SPELLS = {
      "Conjure Barrage": () => {
        const a = act("save", {
          activation: { type: "action", value: 1, override: false, condition: "" },
          consumption: { spellSlot: true, targets: [] },
          save: { ability: ["dex"], dc: { calculation: "spellcasting", formula: "" } },
          damage: { onSave: "half", parts: [{ number: 5, denomination: 8, bonus: "", types: ["force"], scaling: { mode: "whole", number: 1 } }] }
        });
        return {
          name: "Conjure Barrage",
          type: "spell",
          img: "icons/skills/ranged/arrows-flying-salvo-yellow.webp",
          system: {
            level: 3,
            school: "con",
            properties: ["vocal", "somatic", "material"],
            materials: { value: "a Melee or Ranged weapon worth at least 1 CP", consumed: false, cost: 0, supply: 0 },
            activation: { type: "action", value: 1, condition: "" },
            duration: { value: "", units: "inst" },
            range: { value: null, units: "self" },
            target: { template: { type: "cone", size: "60", units: "ft" }, affects: { type: "creature", choice: false } },
            description: { value: "<p>You brandish the weapon used to cast the spell and conjure similar spectral weapons (or ammunition appropriate to the weapon) that launch forward and then disappear. Each creature of your choice that you can see in a 60-foot Cone makes a Dexterity saving throw, taking 5d8 Force damage on a failed save or half as much damage on a successful one.</p><p><strong>Using a Higher-Level Spell Slot.</strong> The damage increases by 1d8 for each spell slot level above 3.</p>" },
            activities: { [a._id]: { sort: 100000, ...a } }
          }
        };
      }
    };

    const missingSpells = [];
    async function buildSpell({ name, method, perDay = 0, always = false }) {
      let data = CUSTOM_SPELLS[name]?.() ?? await findSpell(name);
      if ( !data ) {
        missingSpells.push(name);
        data = { name, type: "spell", img: "icons/magic/nature/leaf-glow-green.webp",
          system: { level: 1, description: { value: `<p>Placeholder: "${name}" wasn't found in a compendium. Replace it with the real spell.</p>` }, activities: {} } };
      }
      delete data._id;
      const prepared = always ? 2 : 1;
      if ( data.system.preparation ) data.system.preparation = { mode: always ? "always" : (method === "spell" ? "prepared" : method), prepared: true };
      else { data.system.method = method; data.system.prepared = prepared; }
      // Slot spells spend slots; innate ones spend the item's own daily uses instead.
      if ( perDay ) data.system.uses = DAILY(perDay);
      for ( const a of Object.values(data.system.activities ?? {}) ) {
        if ( method !== "spell" ) a.consumption = { ...(a.consumption ?? {}), spellSlot: false, targets: perDay ? [USE_ITEM] : [] };
        // Foe Slayer: Hunter's Mark deals 1d10 instead of 1d6.
        if ( name === "Hunter's Mark" ) {
          for ( const part of a.damage?.parts ?? [] ) if ( part.denomination === 6 ) part.denomination = 10;
        }
      }
      return data;
    }

    const failed = [];

    if ( MAKE_BACKUP ) {
      const data = elro.toObject();
      delete data._id;
      data.name = `${elro.name} (backup)`;
      await Actor.implementation.create(data);
    }

    /* ================================================================== */
    /*  Effects                                                           */
    /* ================================================================== */
    const restrainedVolley = statusEffect("Thorn Volley", "icons/magic/nature/root-vine-entangle-foot-green.webp", "restrained",
      { rounds: 1 }, "Pinned by thorned vines until the end of Elro's next turn. A creature can take an action to make a DC 18 Strength (Athletics) check, freeing itself on a success.");
    const invisibleVeil = statusEffect("Veil of the Old Wood", "icons/magic/nature/leaf-glow-green.webp", "invisible",
      { rounds: 1 }, "Invisible until the end of Elro's next turn, or until he makes an attack roll.");
    const restrainedSnare = statusEffect("Thorn Snare", "icons/magic/nature/root-vine-entangle-foot-green.webp", "restrained",
      { rounds: 1 }, "Bound by thorned roots until the end of its next turn.");

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const elroItems = [
      // ---- Traits ----
      feat("Ascendant Being", "icons/magic/symbols/star-solid-gold.webp",
        "<p><strong>Tier of Being: Ascendant.</strong> Elro's body and soul are fused into a single will. He doesn't age and can't die of old age.</p>"
        + "<p><em>Tier Gap:</em> Against a Mortal-tier creature, Elro has a +5 bonus to every d20 Test that involves that creature (his attack rolls against it, his saving throws against its effects, and contested checks with it). Mortal creatures gain no penalty, and creatures two or more tiers below him can't affect him at all.</p>"),

      feat("Legendary Resistance (3/Day)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Elro fails a saving throw, he can choose to succeed instead.</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Fey Ancestry", "icons/magic/nature/leaf-glow-green.webp",
        "<p>Elro has Advantage on saving throws he makes to avoid or end the Charmed condition, and magic can't put him to sleep.</p>"),

      feat("Mask of the Wild", "icons/magic/nature/leaf-glow-green.webp",
        "<p>Elro can take the Hide action even when he is only Lightly Obscured by foliage, heavy rain, falling snow, mist, or other natural phenomena.</p>"),

      feat("Ambush of the Old Wood", "icons/skills/melee/strike-sword-dagger-runes-yellow.webp",
        "<p>Elro has Advantage on Initiative rolls. On his first turn of each combat, his Speed increases by 10 feet, and when he uses Multiattack he can make one additional attack. If that attack hits, it deals an extra 13 (3d8) Psychic damage.</p>",
        { activities: [act("damage", {
          activation: activation("special", { condition: "First turn of combat, extra Multiattack attack hits" }),
          damage: { parts: [{ number: 3, denomination: 8, bonus: "", types: ["psychic"] }] }
        })] }),

      feat("Colossus Slayer (1/Turn)", "icons/skills/melee/strike-dagger-white-orange.webp",
        "<p>Once on each of his turns, when Elro hits a creature with a weapon attack and that creature is missing any of its Hit Points, he deals an extra 4 (1d8) damage of the weapon's type.</p>",
        { activities: [act("damage", {
          activation: activation("special", { condition: "Once per turn, weapon hit vs. a wounded creature" }),
          damage: { parts: [{ number: 1, denomination: 8, bonus: "", types: ["piercing"] }] }
        })] }),

      feat("Foe Slayer", "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "<p>The damage die of Elro's <em>Hunter's Mark</em> is a d10 instead of a d6, and taking damage can't break his Concentration on <em>Hunter's Mark</em>.</p>"),

      feat("Evasion", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>If Elro is subjected to an effect that allows a Dexterity saving throw to take only half damage, he instead takes no damage on a success and only half damage on a failure. He can't use this trait if he has the Incapacitated condition.</p>"),

      // ---- Actions ----
      feat("Multiattack", "icons/skills/melee/strike-sword-dagger-runes-yellow.webp",
        "<p>Elro makes three attacks, using Elven Blade or Thornbow in any combination. He can replace one attack with a use of Spellcasting to cast a spell whose casting time is 1 action.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      weapon("Elven Blade", "icons/weapons/swords/sword-guard-worn-purple.webp", "martialM", "shortsword",
        ["fin", "lgt", "mgc"], { value: null, long: null, reach: null },
        { number: 1, denomination: 6, bonus: "", types: ["piercing"] },
        [{ number: 1, denomination: 6, bonus: "", types: ["poison"] }],
        "<p><em>Melee Attack Roll:</em> +12, reach 5 ft. <em>Hit:</em> 10 (1d6 + 7) Piercing damage plus 3 (1d6) Poison damage.</p>"),

      weapon("Thornbow", "icons/weapons/bows/longbow-recurve-leather-brown.webp", "martialR", "longbow",
        ["two", "mgc"], { value: 150, long: 600, reach: null },
        { number: 1, denomination: 8, bonus: "", types: ["piercing"] },
        [{ number: 1, denomination: 6, bonus: "", types: ["poison"] }],
        "<p><em>Ranged Attack Roll:</em> +12, range 150/600 ft. <em>Hit:</em> 11 (1d8 + 7) Piercing damage plus 3 (1d6) Poison damage.</p>"),

      feat("Thorn Volley (Recharge 5–6)", "icons/magic/nature/root-vine-entangle-foot-green.webp",
        "<p>Elro fires a single arrow that bursts into a storm of thorned vines in a 20-foot-radius Sphere centered on a point he can see within 150 feet. Each creature in that area makes a DC 18 Dexterity saving throw. <em>Failure:</em> 45 (10d8) Piercing damage, and the target has the Restrained condition until the end of Elro's next turn (a creature can take an action to make a DC 18 Strength (Athletics) check to free itself). <em>Success:</em> Half damage only.</p>",
        {
          uses: RECHARGE(5),
          effects: [restrainedVolley],
          activities: [act("save", {
            activation: activation("action"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, value: "150", units: "ft" },
            target: { override: true, template: { type: "sphere", size: "20", units: "ft" }, affects: { type: "creature" } },
            save: { ability: ["dex"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "half", parts: [{ number: 10, denomination: 8, bonus: "", types: ["piercing"] }] },
            effects: [{ _id: restrainedVolley._id, onSave: false }]
          })]
        }),

      feat("Spellcasting", "icons/magic/nature/leaf-glow-green.webp",
        "<p>Elro is a CR 15 Boss spellcaster (NPC slot rule: CR 15, Hybrid). His spellcasting ability is Wisdom (spell save DC 18, +10 to hit with spell attacks). He has the following Ranger spells prepared:</p>"
        + "<ul><li><strong>Cantrip (at will):</strong> <em>druidcraft</em></li>"
        + "<li><strong>1st level (6 slots):</strong> <em>cure wounds</em>, <em>ensnaring strike</em>, <em>hunter's mark</em> (always prepared)</li>"
        + "<li><strong>2nd level (6 slots):</strong> <em>pass without trace</em>, <em>spike growth</em></li>"
        + "<li><strong>3rd level (5 slots):</strong> <em>conjure barrage</em></li>"
        + "<li><strong>4th level (5 slots):</strong> <em>freedom of movement</em></li>"
        + "<li><strong>5th level (4 slots):</strong> <em>steel wind strike</em>, <em>tree stride</em></li></ul>"
        + "<p><em>Favored Enemy:</em> Elro can cast <em>hunter's mark</em> 5 times without a spell slot (untick slot use in the cast dialog), regaining all uses on a Long Rest.</p>"),

      // ---- Bonus Actions ----
      feat("Veil of the Old Wood (Recharge 4–6)", "icons/magic/nature/leaf-glow-green.webp",
        "<p>Elro calls on the forest to hide him, then teleports up to 30 feet to an unoccupied space he can see. He has the Invisible condition until the end of his next turn or until he makes an attack roll.</p>",
        {
          uses: RECHARGE(4),
          effects: [invisibleVeil],
          activities: [act("utility", {
            activation: activation("bonus"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, value: "30", units: "ft" },
            target: { override: true, affects: { type: "self" } },
            effects: [{ _id: invisibleVeil._id }]
          })]
        }),

      // ---- Reactions ----
      feat("Uncanny Dodge", "icons/magic/defensive/shield-barrier-blue.webp",
        "<p><em>Trigger:</em> An attacker Elro can see hits him with an attack roll. <em>Response:</em> Elro halves the attack's damage against him.</p>",
        { activities: [act("utility", { activation: activation("reaction", { condition: "Hit by an attack roll from a seen attacker" }) })] }),

      // ---- Legendary Actions (4 uses, Ascendant tier, regained at the start of his turn) ----
      feat("Quick Shot", "icons/weapons/bows/longbow-recurve-leather-brown.webp",
        "<p>Elro makes one Thornbow or Elven Blade attack. He can't take this action again until the start of his next turn.</p>",
        { activities: [act("utility", {
          activation: activation("legendary", { condition: "Once per round" }),
          consumption: { spellSlot: true, targets: [LEGACT] }
        })] }),

      feat("Fade Into the Leaves", "icons/magic/nature/leaf-glow-green.webp",
        "<p>Elro moves up to half his Speed without provoking Opportunity Attacks. If he ends this move Lightly Obscured, he can take the Hide action.</p>",
        { activities: [act("utility", { activation: activation("legendary"), consumption: { spellSlot: true, targets: [LEGACT] } })] }),

      feat("Thorn Snare", "icons/magic/nature/root-vine-entangle-foot-green.webp",
        "<p>Thorned roots burst from the ground under one creature Elro can see within 60 feet of him. The target makes a DC 18 Strength saving throw. <em>Failure:</em> The target has the Restrained condition until the end of its next turn. Elro can't take this action again until the start of his next turn.</p>",
        {
          effects: [restrainedSnare],
          activities: [act("save", {
            activation: activation("legendary", { condition: "Once per round" }),
            consumption: { spellSlot: true, targets: [LEGACT] },
            range: { override: true, value: "60", units: "ft" },
            target: { override: true, affects: { count: "1", type: "creature" } },
            save: { ability: ["str"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "none", parts: [] },
            effects: [{ _id: restrainedSnare._id, onSave: false }]
          })]
        }),

      feat("Shift the Mark", "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "<p>If <em>hunter's mark</em> is active, Elro moves the mark to a different creature he can see within 90 feet of him.</p>",
        { activities: [act("utility", { activation: activation("legendary"), consumption: { spellSlot: true, targets: [LEGACT] }, range: { override: true, value: "90", units: "ft" } })] })
    ];

    for ( const spell of SPELLS ) {
      try { elroItems.push(await buildSpell(spell)); }
      catch ( err ) { console.error(`Elro macro | Failed to build spell "${spell.name}"`, err); failed.push(spell.name); }
    }

    const biography = "<h2>Elro Aldataur, the Thornveil Hunter</h2>"
      + "<p>A wood elf ranger of the Hunter's path whose body and soul have fused into a single will. He has stopped aging, and the forest seems to open for him and close behind him.</p>"
      + "<p><strong>Tier of Being:</strong> Ascendant (CR 11–20 band, ability cap 24).</p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Before the fight:</strong> <em>Pass without trace</em> and Mask of the Wild set up an ambush. On his first turn, Ambush of the Old Wood gives him four attacks.</li>"
      + "<li><strong>Round 1:</strong> Bonus action <em>hunter's mark</em> (d10) on the biggest threat, then Thornbow from range.</li>"
      + "<li><strong>Burst:</strong> <em>Steel wind strike</em> teleports him past the front line to hit up to five spellcasters at once.</li>"
      + "<li><strong>Control:</strong> <em>Spike growth</em> plus Thorn Volley turns the approach to him into a killing field. <em>Ensnaring strike</em> pins the melee PC who is fastest to reach him.</li>"
      + "<li><strong>When pressed:</strong> Veil of the Old Wood to break line of sight, <em>cure wounds</em> while invisible, <em>tree stride</em> to leave.</li>"
      + "<li><strong>Legendary:</strong> Thorn Snare on whoever is closing in, Quick Shot on the marked target, and Fade Into the Leaves at the end of the round to reset his range and Hide.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>Bright, open ground shuts down Mask of the Wild. Fire clears <em>spike growth</em> and the woods.</li>"
      + "<li>Breaking his Concentration takes a spell or condition, since damage can't break <em>hunter's mark</em>. Make him choose between <em>hunter's mark</em> and <em>spike growth</em>.</li>"
      + "<li>He has 255 HP, light for a CR 15 solo. Uncanny Dodge works once per round, so several attackers wear him down fast.</li>"
      + "<li>Area spells that call for Strength, Constitution, or Charisma saves go around Evasion. Burn through his 3 Legendary Resistances with cheap save effects before the big spell.</li></ul>"
      + "<h3>CR Check</h3>"
      + "<p>Defense ≈ CR 14–15 (AC 19, 255 HP, plus Evasion, Uncanny Dodge and Legendary Resistance 3/Day). Offense ≈ CR 15–16 (~87 damage per round at +12 to hit: three Thornbow hits 45 + Quick Shot 15 + Hunter's Mark 4d10 22 + Colossus Slayer 4; Thorn Volley 45 to each creature in the area, DC 18). Average ≈ CR 15. Built as a solo boss: treat him as CR 16 when he fights with minions. The Tier Gap +5 against Mortal-tier PCs makes him much deadlier than CR 15 against a Mortal party.</p>";

    const elroSystem = {
      abilities: {
        str: { value: 12, proficient: 1 }, dex: { value: 24, proficient: 1 }, con: { value: 16, proficient: 0 },
        int: { value: 12, proficient: 0 }, wis: { value: 20, proficient: 1 }, cha: { value: 10, proficient: 0 },
        hon: { value: 14, proficient: 0 }, san: { value: 18, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 19 },
        hp: { value: 255, max: 255, temp: 0, tempmax: 0, formula: "34d8 + 102" },
        init: { ability: "", bonus: "" },
        movement: { walk: "35", burrow: "", climb: "35", fly: "", swim: "35", units: "ft", hover: false },
        senses: { ranges: { darkvision: 60, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" },
        spellcasting: "wis",
        spell: { level: 15 }
      },
      spells: Object.fromEntries(Array.from({ length: 9 }, (_, i) => {
        const key = `spell${i + 1}`;
        const max = SLOTS[key] ?? 0;
        return [key, { value: max, override: max }];
      })),
      details: {
        cr: 15,
        alignment: "Neutral Evil",
        type: { value: "humanoid", subtype: "Elf, Wood Elf", swarm: "", custom: "" },
        habitat: { value: [{ type: "forest" }], custom: "" },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 4, spent: 0 },   // Ascendant tier = 4
        legres: { max: 3, spent: 0 }, // Ascendant tier = 3
        lair: { value: false }
      },
      skills: {
        acr: { value: 1 },   // +12
        ani: { value: 1 },   // +10
        prc: { value: 2 },   // Expertise: +15 (Passive 25)
        ste: { value: 2 },   // Expertise: +17
        sur: { value: 1 }    // +10
      },
      traits: {
        size: "med",
        di: { value: [] },
        dr: { value: [] },
        dv: { value: [] },
        ci: { value: [] },
        languages: { value: ["common", "elvish", "sylvan"], custom: "" }
      }
    };

    await wipe(elro);
    await elro.update({
      system: elroSystem,
      "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.HOSTILE
    });
    await addItems(elro, elroItems, failed);

    elro.sheet.render(true);
    ui.notifications.info(`${elro.name} rebuilt as a CR 15 Ranger (${elroItems.length} items).`);
    if ( missingSpells.length ) ui.notifications.warn(`Spells not found in any compendium (placeholders made): ${missingSpells.join(", ")}`, { permanent: true });
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Elro macro | ", err);
    ui.notifications.error(`Elro macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
