/**
 * Foref Nodaz, Tidepriest of the Endless Shoal — CR 17 Sahuagin Life Cleric, Ascendant tier, legendary boss
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Foref Nodaz" (all items and effects) and rebuilds it
 *     as a CR 17 Life Cleric (was the CR 5 sahuagin priest). Portrait, token and folder are kept.
 *   - Spells are copied from the system's spell compendium (2024 version preferred) as real,
 *     castable spells, grouped by spell level. Missing spells become placeholders.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Foref Nodaz";
  const MAKE_BACKUP = false;   // true = copy "Foref Nodaz (backup)" before wiping
  const DC = "20";             // flat DC for his features (= his spell save DC)

  // Cleric spellcasting (Wisdom, DC 20, +12 to hit).
  // NPC slot rule (Core-Rules/NPC-Design-system.md): CR 17 row, Full caster.
  const SLOTS = { spell1: 7, spell2: 6, spell3: 6, spell4: 5, spell5: 5, spell6: 3, spell7: 3, spell8: 2, spell9: 2 };
  // always: always prepared (Life Domain spells).
  const SPELLS = [
    // Cantrips
    { name: "Sacred Flame", level: 0 },
    { name: "Guidance", level: 0 },
    { name: "Spare the Dying", level: 0 },
    { name: "Thaumaturgy", level: 0 },
    // 1st
    { name: "Bless", level: 1, always: true },
    { name: "Cure Wounds", level: 1, always: true },
    { name: "Healing Word", level: 1 },
    { name: "Command", level: 1 },
    { name: "Inflict Wounds", level: 1 },
    // 2nd
    { name: "Aid", level: 2, always: true },
    { name: "Lesser Restoration", level: 2, always: true },
    { name: "Spiritual Weapon", level: 2 },
    { name: "Hold Person", level: 2 },
    // 3rd
    { name: "Mass Healing Word", level: 3, always: true },
    { name: "Revivify", level: 3, always: true },
    { name: "Spirit Guardians", level: 3 },
    { name: "Dispel Magic", level: 3 },
    // 4th
    { name: "Aura of Life", level: 4, always: true },
    { name: "Death Ward", level: 4, always: true },
    { name: "Guardian of Faith", level: 4 },
    { name: "Banishment", level: 4 },
    // 5th
    { name: "Greater Restoration", level: 5, always: true },
    { name: "Mass Cure Wounds", level: 5, always: true },
    { name: "Flame Strike", level: 5 },
    // 6th
    { name: "Heal", level: 6 },
    { name: "Harm", level: 6 },
    { name: "Blade Barrier", level: 6 },
    // 7th
    { name: "Fire Storm", level: 7 },
    { name: "Regenerate", level: 7 },
    // 8th
    { name: "Holy Aura", level: 8 },
    // 9th
    { name: "Gate", level: 9 },
    { name: "True Resurrection", level: 9 }
  ];

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const foref = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !foref ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const USE_ITEM = { type: "itemUses", target: "", value: "1" };
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
        catch ( err ) { console.error(`Foref macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(data.name); }
      }
    }

    // Find a spell in any Item compendium. Prefers 2024 packs (collection id containing "24").
    const itemPacks = game.packs.filter(p => p.documentName === "Item")
      .sort((a, b) => Number(b.collection.includes("24")) - Number(a.collection.includes("24")));
    // Search order: 2024 compendiums → spells already in the world's Items directory
    // (e.g. imported with Plutonium) → every other compendium.
    async function findSpell(name) {
      const lower = name.toLowerCase();
      const fromPack = async pack => {
        const index = await pack.getIndex({ fields: ["type"] });
        const entry = index.find(e => (e.type === "spell") && (e.name.toLowerCase() === lower));
        return entry ? (await pack.getDocument(entry._id)).toObject() : null;
      };
      for ( const pack of itemPacks.filter(p => p.collection.includes("24")) ) {
        const data = await fromPack(pack);
        if ( data ) return data;
      }
      const worldSpell = game.items.find(i => (i.type === "spell") && (i.name.toLowerCase() === lower));
      if ( worldSpell ) return worldSpell.toObject();
      for ( const pack of itemPacks.filter(p => !p.collection.includes("24")) ) {
        const data = await fromPack(pack);
        if ( data ) return data;
      }
      return null;
    }

    const missingSpells = [];
    async function buildSpell({ name, level, always = false }) {
      let data = await findSpell(name);
      if ( !data ) {
        missingSpells.push(name);
        data = { name, type: "spell", img: "icons/magic/light/explosion-star-glow-silhouette.webp",
          system: { level, description: { value: `<p>Placeholder: "${name}" wasn't found in a compendium. Replace it with the real spell.</p>` }, activities: {} } };
      }
      delete data._id;
      if ( data.system.preparation ) data.system.preparation = { mode: always ? "always" : "prepared", prepared: true };
      else { data.system.method = "spell"; data.system.prepared = always ? 2 : 1; }
      return data;
    }

    const spellBlock = "<ul>" + Array.from({ length: 10 }, (_, lvl) => {
      const names = SPELLS.filter(s => s.level === lvl)
        .map(s => `<em>${s.name.toLowerCase()}</em>${s.always ? " (always prepared)" : ""}`).join(", ");
      if ( !names ) return "";
      const label = lvl === 0 ? "Cantrips (at will)" : `${lvl}${["st", "nd", "rd"][lvl - 1] ?? "th"} level (${SLOTS[`spell${lvl}`]} slot${SLOTS[`spell${lvl}`] > 1 ? "s" : ""})`;
      return `<li><strong>${label}:</strong> ${names}</li>`;
    }).join("") + "</ul>";

    const failed = [];

    if ( MAKE_BACKUP ) {
      const data = foref.toObject();
      delete data._id;
      data.name = `${foref.name} (backup)`;
      await Actor.implementation.create(data);
    }

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const forefItems = [
      // ---- Traits ----
      feat("Ascendant Being", "icons/magic/symbols/star-solid-gold.webp",
        "<p><strong>Tier of Being: Ascendant.</strong> Foref's body and soul are fused into a single will. He doesn't age and can't die of old age.</p>"
        + "<p><em>Tier Gap:</em> For each tier Foref is above another creature, he gains +5 to every d20 Test that involves that creature (his attack rolls against it, his saving throws against its effects, and contested checks with it) and +5 AC against that creature's attacks (Mortal +5). The lower creature's other rolls are unchanged.</p>"),

      feat("Legendary Resistance (3/Day, or 4/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Foref fails a saving throw, he can choose to succeed instead. Ascendant tier = 3 uses. In his lair he has 4 uses instead of 3 (set the maximum to 4 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Blood Frenzy", "icons/magic/unholy/hand-weapon-glow-black-green.webp",
        "<p>Foref has Advantage on melee attack rolls against any creature that doesn't have all its Hit Points.</p>"),

      feat("Limited Amphibiousness", "icons/magic/water/wave-water-blue.webp",
        "<p>Foref can breathe air and water, but he needs to be submerged at least once every 4 hours to avoid suffocating.</p>"),

      feat("Shark Telepathy", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p>Foref can magically command any shark within 120 feet of him, using a limited telepathy.</p>"),

      feat("Disciple of Life", "icons/magic/life/heart-cross-strong-flame-green.webp",
        "<p>When a spell Foref casts with a spell slot restores Hit Points to a creature, that creature regains extra Hit Points equal to 2 + the slot's level.</p>"),

      feat("Blessed Healer", "icons/magic/life/heart-cross-strong-flame-green.webp",
        "<p>When Foref casts a spell with a spell slot that restores Hit Points to a creature other than himself, he regains Hit Points equal to 2 + the slot's level.</p>"),

      feat("Supreme Healing", "icons/magic/life/heart-cross-strong-flame-green.webp",
        "<p>When Foref would roll dice to restore Hit Points with a spell or Channel Divinity, he uses the highest number possible for each die instead.</p>"),

      feat("Channel Divinity (3/Day)", "icons/magic/light/explosion-star-glow-silhouette.webp",
        "<p>Foref channels the power of the Endless Shoal, choosing one of the following effects (Magic action):</p>"
        + "<ul><li><strong>Preserve Life.</strong> Foref restores up to 85 Hit Points, divided as he chooses among any creatures (including himself) within 30 feet of him. No creature can be restored to more than half its Hit Point maximum this way.</li>"
        + "<li><strong>Divine Spark (Harm).</strong> One creature he can see within 30 feet makes a DC 20 Constitution saving throw, taking 24 (4d8 + 6) Radiant or Necrotic damage (his choice) on a failure, or half as much on a success.</li>"
        + "<li><strong>Divine Spark (Heal).</strong> One creature he can see within 30 feet regains 38 (4d8 + 6, maximized by Supreme Healing) Hit Points.</li></ul>",
        {
          uses: DAILY(3),
          activities: [
            act("heal", {
              name: "Preserve Life",
              activation: activation("action"),
              consumption: { spellSlot: true, targets: [USE_ITEM] },
              range: { override: true, value: "30", units: "ft" },
              healing: { number: null, denomination: null, bonus: "85", types: ["healing"] }
            }),
            act("save", {
              name: "Divine Spark (Harm)",
              activation: activation("action"),
              consumption: { spellSlot: true, targets: [USE_ITEM] },
              range: { override: true, value: "30", units: "ft" },
              target: { override: true, affects: { count: "1", type: "creature" } },
              save: { ability: ["con"], dc: { calculation: "", formula: DC } },
              damage: { onSave: "half", parts: [{ number: 4, denomination: 8, bonus: "6", types: ["radiant", "necrotic"] }] }
            }),
            act("heal", {
              name: "Divine Spark (Heal)",
              activation: activation("action"),
              consumption: { spellSlot: true, targets: [USE_ITEM] },
              range: { override: true, value: "30", units: "ft" },
              target: { override: true, affects: { count: "1", type: "creature" } },
              healing: { number: null, denomination: null, bonus: "38", types: ["healing"] }
            })
          ]
        }),

      // ---- Actions ----
      feat("Multiattack", "icons/magic/light/explosion-star-glow-silhouette.webp",
        "<p>Foref makes two attacks, using Light Force or Holy Light in any combination. He can replace one attack with a use of Spellcasting to cast a cantrip or a spell of 3rd level or lower. A spell of 4th level or higher takes his whole action instead of Multiattack.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      feat("Light Force", "icons/magic/light/explosion-star-glow-silhouette.webp",
        "<p><em>Melee Attack Roll:</em> +12, reach 5 ft. <em>Hit:</em> 15 (2d8 + 6) Piercing damage plus 4 (1d8) Radiant damage. Foref's holy coral staff ends in jagged shark teeth wreathed in light.</p>",
        { activities: [act("attack", {
          activation: activation("action"),
          range: { override: true, value: "5", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "wis", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
          damage: { includeBase: false, parts: [
            { number: 2, denomination: 8, bonus: "@mod", types: ["piercing"] },
            { number: 1, denomination: 8, bonus: "", types: ["radiant"] }
          ] }
        })] }),

      feat("Holy Light", "icons/magic/light/beam-rays-yellow.webp",
        "<p><em>Ranged Attack Roll:</em> +12, range 120 ft. <em>Hit:</em> 15 (2d8 + 6) Radiant damage.</p>",
        { activities: [act("attack", {
          activation: activation("action"),
          range: { override: true, value: "120", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "wis", bonus: "", flat: false, type: { value: "ranged", classification: "spell" } },
          damage: { includeBase: false, parts: [{ number: 2, denomination: 8, bonus: "@mod", types: ["radiant"] }] }
        })] }),

      feat("Spellcasting", "icons/magic/light/explosion-star-glow-silhouette.webp",
        "<p>Foref is a CR 17 Boss spellcaster (NPC slot rule: CR 17, Full caster). His spellcasting ability is Wisdom (spell save DC 20, +12 to hit with spell attacks). He has the following Cleric spells prepared:</p>"
        + spellBlock),

      // ---- Reactions ----
      feat("Mending Tide", "icons/magic/water/wave-water-blue.webp",
        "<p><em>Trigger:</em> Foref or an ally he can see within 60 feet of him takes damage. <em>Response:</em> The creature that took damage regains 14 (2d8 + 6, maximized by Supreme Healing: 22) Hit Points.</p>",
        { activities: [act("heal", {
          activation: activation("reaction", { condition: "He or an ally within 60 feet takes damage" }),
          range: { override: true, value: "60", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          healing: { number: null, denomination: null, bonus: "22", types: ["healing"] }
        })] }),

      // ---- Legendary Actions (4 uses, Ascendant tier, regained at the start of his turn) ----
      feat("Holy Light (Costs 1 Action)", "icons/magic/light/beam-rays-yellow.webp",
        "<p>Foref makes one Holy Light attack. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("utility", legendary(1, "Once per round"))] }),

      feat("Word of Mending (Costs 1 Action)", "icons/magic/life/heart-cross-strong-flame-green.webp",
        "<p>One creature Foref can see within 60 feet of him regains 22 Hit Points (2d8 + 6, maximized). He can't take this option again until the start of his next turn.</p>",
        { activities: [act("heal", {
          ...legendary(1, "Once per round"),
          range: { override: true, value: "60", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          healing: { number: null, denomination: null, bonus: "22", types: ["healing"] }
        })] }),

      feat("Sapping Radiance (Costs 2 Actions)", "icons/magic/light/explosion-star-glow-silhouette.webp",
        "<p>One creature Foref can see within 60 feet of him makes a DC 20 Constitution saving throw. <em>Failure:</em> 13 (3d8) Radiant damage, and the target can't regain Hit Points until the end of its next turn. <em>Success:</em> Half damage only.</p>",
        { activities: [act("save", {
          ...legendary(2),
          range: { override: true, value: "60", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          save: { ability: ["con"], dc: { calculation: "", formula: DC } },
          damage: { onSave: "half", parts: [{ number: 3, denomination: 8, bonus: "", types: ["radiant"] }] }
        })] })
    ];

    for ( const spell of SPELLS ) {
      try { forefItems.push(await buildSpell(spell)); }
      catch ( err ) { console.error(`Foref macro | Failed to build spell "${spell.name}"`, err); failed.push(spell.name); }
    }

    const biography = "<h2>Foref Nodaz, Tidepriest of the Endless Shoal</h2>"
      + "<p>An ancient sahuagin high priest whose faith has outlived his kingdom. He heals his own warriors as easily as he breathes water, and he has turned that gift of life into a weapon: nothing he protects stays down.</p>"
      + "<p><strong>Tier of Being:</strong> Ascendant (CR 11–20 band, ability cap 24).</p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Before the fight:</strong> <em>Aid</em> and <em>death ward</em> on himself, <em>aura of life</em> or <em>holy aura</em> if he expects a long battle.</li>"
      + "<li><strong>Round 1:</strong> Multiattack, swapping one attack for <em>spirit guardians</em>, then <em>spiritual weapon</em> as a bonus action. He wades into the front line so the guardians grind everyone near him.</li>"
      + "<li><strong>Every round:</strong> Two Light Force hits with Blood Frenzy (Advantage against anyone already wounded). Sapping Radiance on whoever the party's healer is trying to save.</li>"
      + "<li><strong>When hurt:</strong> <em>Heal</em> (78 HP with Disciple of Life), Preserve Life on his allies, and Mending Tide plus Word of Mending to undo the party's burst.</li>"
      + "<li><strong>Big rounds:</strong> <em>Flame strike</em> or <em>fire storm</em> (whole action) when the party bunches up.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>His own HP is low (153). Burst him down in one round before he can heal: his healing is strong but spread over reactions and legendary actions.</li>"
      + "<li>Sapping Radiance and healing are once per round. Several small hits use up Mending Tide early in the round.</li>"
      + "<li>Break Concentration to drop <em>spirit guardians</em>. <em>Counterspell</em> on <em>heal</em> is the best use of a slot in the fight.</li>"
      + "<li>Grievous wounds: effects that stop healing (such as <em>chill touch</em>) shut down most of his defense.</li></ul>"
      + "<h3>CR Check</h3>"
      + "<p>Defense ≈ CR 19 (AC 20; 153 HP + Legendary Resistance 3/Day as +90 effective HP + one <em>heal</em> of 78 over three rounds = ~321 effective HP; plus Mending Tide and Word of Mending). "
      + "Offense ≈ CR 16 (best 3 rounds average ~105 damage per round at +12 to hit, DC 20: <em>spirit guardians</em> 13.5 on 2 targets = 27 + two Light Force 39 + <em>spiritual weapon</em> 10.5 + legendary Holy Light 15 and Sapping Radiance 13.5; one round of <em>flame strike</em> 35 on 2 targets). "
      + "Average ≈ CR 17–18. Built as a healer boss: he makes his allies much harder to kill, so add about 1 CR when he fights with minions.</p>";

    const forefSystem = {
      abilities: {
        str: { value: 14, proficient: 0 }, dex: { value: 12, proficient: 0 }, con: { value: 18, proficient: 1 },
        int: { value: 12, proficient: 0 }, wis: { value: 22, proficient: 1 }, cha: { value: 14, proficient: 1 },
        hon: { value: 10, proficient: 0 }, san: { value: 16, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 20 },
        hp: { value: 153, max: 153, temp: 0, tempmax: 0, formula: "18d8 + 72" },
        init: { ability: "", bonus: "" },
        movement: { walk: "30", burrow: "", climb: "", fly: "", swim: "40", units: "ft", hover: false },
        senses: { ranges: { darkvision: 120, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" },
        spellcasting: "wis",
        spell: { level: 17 }
      },
      spells: Object.fromEntries(Array.from({ length: 9 }, (_, i) => {
        const key = `spell${i + 1}`;
        const max = SLOTS[key] ?? 0;
        return [key, { value: max, override: max }];
      })),
      details: {
        cr: 17,
        alignment: "Lawful Evil",
        type: { value: "humanoid", subtype: "Sahuagin", swarm: "", custom: "" },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 4, spent: 0 },   // Ascendant tier = 4
        legres: { max: 3, spent: 0 },   // Ascendant tier = 3
        lair: { value: false }
      },
      skills: {
        ins: { value: 1 },   // +12
        med: { value: 2 },   // Expertise: +18
        prc: { value: 1 },   // +12 (Passive 22)
        rel: { value: 1 }    // +7
      },
      traits: {
        size: "med",
        di: { value: [] },
        dr: { value: [] },
        dv: { value: [] },
        ci: { value: [] },
        languages: { value: [], custom: "Sahuagin" }
      }
    };

    await wipe(foref);
    await foref.update({
      system: forefSystem,
      "prototypeToken.actorLink": true,
      "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.HOSTILE
    });
    await addItems(foref, forefItems, failed);

    foref.sheet.render(true);
    ui.notifications.info(`${foref.name} rebuilt as a CR 17 Life Cleric (${forefItems.length} items).`);
    if ( missingSpells.length ) ui.notifications.warn(`Spells not found in any compendium (placeholders made): ${missingSpells.join(", ")}`, { permanent: true });
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Foref macro | ", err);
    ui.notifications.error(`Foref macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
