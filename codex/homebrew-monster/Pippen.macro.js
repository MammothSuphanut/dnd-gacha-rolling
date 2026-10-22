/**
 * Pippen, Moonwhisker of the Deep Wood — CR 10 Mouseling Druid (Circle of the Moon), peak Mortal tier
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Pippen" (all items and effects) and rebuilds it
 *     as a CR 10 Tiny mouseling druid. Portrait, token, disposition and folder are kept.
 *   - Spells are copied from the system's spell compendium (2024 version preferred) as real,
 *     castable spells, grouped by spell level. Missing spells become placeholders.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Pippen";
  const MAKE_BACKUP = false;   // true = copy "Pippen (backup)" before wiping
  const DC = "17";             // 8 + Prof 4 + WIS 5 (= his spell save DC)

  // Druid spellcasting (Wisdom, DC 17, +9 to hit).
  // NPC slot rule (Core-Rules/NPC-Design-system.md): CR 10 row, Full caster.
  const SLOTS = { spell1: 5, spell2: 4, spell3: 4, spell4: 3, spell5: 3 };
  // always: Circle of the Moon spells (always prepared).
  const SPELLS = [
    // Cantrips
    { name: "Shillelagh", level: 0 },
    { name: "Starry Wisp", level: 0, always: true },
    { name: "Thorn Whip", level: 0 },
    { name: "Guidance", level: 0 },
    { name: "Druidcraft", level: 0 },
    // 1st
    { name: "Cure Wounds", level: 1, always: true },
    { name: "Healing Word", level: 1 },
    { name: "Entangle", level: 1 },
    { name: "Goodberry", level: 1 },
    { name: "Speak with Animals", level: 1 },
    // 2nd
    { name: "Moonbeam", level: 2, always: true },
    { name: "Barkskin", level: 2 },
    { name: "Pass without Trace", level: 2 },
    { name: "Spike Growth", level: 2 },
    // 3rd
    { name: "Conjure Animals", level: 3, always: true },
    { name: "Call Lightning", level: 3 },
    { name: "Plant Growth", level: 3 },
    { name: "Dispel Magic", level: 3 },
    // 4th
    { name: "Fount of Moonlight", level: 4, always: true },
    { name: "Polymorph", level: 4 },
    { name: "Conjure Woodland Beings", level: 4 },
    // 5th
    { name: "Mass Cure Wounds", level: 5, always: true },
    { name: "Tree Stride", level: 5 },
    { name: "Greater Restoration", level: 5 }
  ];

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const pippen = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !pippen ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

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
        catch ( err ) { console.error(`Pippen macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(data.name); }
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

    // Handmade copies for spells that aren't in the free SRD compendiums.
    // Used only when the spell isn't found anywhere (compendium or world Items).
    const FALLBACK_SPELLS = {
      "Thorn Whip": () => {
        const a = act("attack", {
          activation: { type: "action", value: 1, condition: "" },
          range: { override: false },
          target: { override: false },
          attack: { ability: "", bonus: "", flat: false, type: { value: "melee", classification: "spell" } },
          // Potent Spellcasting (Elemental Fury) adds his Wisdom modifier.
          damage: { includeBase: false, parts: [{ number: 1, denomination: 6, bonus: "@mod", types: ["piercing"], scaling: { mode: "whole", number: 1 } }] }
        });
        return {
          name: "Thorn Whip", type: "spell", img: "icons/magic/nature/root-vine-thorned-coil-green.webp",
          system: {
            level: 0, school: "trs",
            properties: ["vocal", "somatic", "material"],
            materials: { value: "the stem of a plant with thorns", consumed: false, cost: 0, supply: 0 },
            activation: { type: "action", value: 1, condition: "" },
            duration: { value: "", units: "inst" },
            range: { value: "30", units: "ft" },
            target: { affects: { count: "1", type: "creature" } },
            description: { value: "<p>You create a vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. On a hit, the target takes 1d6 Piercing damage, and if it is Large or smaller, you can pull it up to 10 feet closer to you.</p><p><strong>Cantrip Upgrade.</strong> The damage increases by 1d6 when you reach levels 5 (2d6), 11 (3d6), and 17 (4d6).</p>" },
            source: { book: "PHB 2024", page: "" },
            activities: { [a._id]: { sort: 100000, ...a } }
          }
        };
      }
    };

    const missingSpells = [];
    async function buildSpell({ name, level, always = false }) {
      let data = (await findSpell(name)) ?? FALLBACK_SPELLS[name]?.();
      if ( !data ) {
        missingSpells.push(name);
        data = { name, type: "spell", img: "icons/magic/nature/leaf-glow-green.webp",
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
      const data = pippen.toObject();
      delete data._id;
      data.name = `${pippen.name} (backup)`;
      await Actor.implementation.create(data);
    }

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const pippenItems = [
      // ---- Gear ----
      (() => {
        const a = act("attack", {
          activation: activation("action"),
          attack: { ability: "wis", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
          damage: { includeBase: true, parts: [] }
        });
        return {
          name: "Mossroot Staff",
          type: "weapon",
          img: "icons/weapons/staves/staff-nature-spiral.webp",
          system: {
            type: { value: "simpleM", baseItem: "quarterstaff" },
            quantity: 1, equipped: true, proficient: 1, identified: true,
            properties: ["ver", "mgc"],
            range: { value: null, long: null, reach: null, units: "ft" },
            damage: { base: { number: 1, denomination: 10, bonus: "", types: ["bludgeoning"] } },
            description: { value: "<p>A gnarled wooden staff twice Pippen's height, wrapped in living moss with a glowing seed at its tip. It is his Druidic Focus and always holds his <em>shillelagh</em>: he uses Wisdom for its attacks, its damage die is a d10, and he can make it deal Force damage instead of Bludgeoning.</p>"
              + "<p><em>Melee Attack Roll:</em> +9, reach 5 ft. <em>Hit:</em> 10 (1d10 + 5) Bludgeoning or Force damage.</p>" },
            activities: { [a._id]: { sort: 100000, ...a } }
          }
        };
      })(),

      {
        name: "Pendant of the Common Tongue",
        type: "equipment",
        img: "icons/equipment/neck/pendant-faceted-green.webp",
        system: {
          type: { value: "trinket", baseItem: "" },
          quantity: 1, equipped: true, identified: true,
          description: { value: "<p>A tiny acorn pendant on a braided cord. While Pippen wears it, everything he says in Rodentia is heard as Common by every creature that understands Common (his squeaks still sound like squeaks to anyone else). Without it, he can only speak Rodentia, and must write in Common or Druidic to be understood.</p>" }
        }
      },

      // ---- Traits ----
      feat("Mortal Being (Peak)", "icons/magic/nature/leaf-glow-green.webp",
        "<p><strong>Tier of Being: Mortal, at its very peak.</strong> Pippen stands on the threshold of Ascendant. He has reached the Mortal level cap (10) and the next step means fusing body and soul into a single will.</p>"
        + "<p><em>Tier Gap:</em> Creatures one tier above him (Ascendant) gain a +5 bonus to d20 Tests that involve him, and creatures two or more tiers above can't be affected by him at all.</p>"),

      feat("Legendary Resistance (2/Day, or 3/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Pippen fails a saving throw, he can choose to succeed instead. Mortal tier = 2 uses. In his lair (his home grove) he has 3 uses instead of 2 (set the maximum to 3 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Mouseling", "icons/creatures/mammals/rodent-rat-green.webp",
        "<p><strong>Darkvision</strong> 60 ft. <strong>Lightfooted:</strong> proficient in Stealth. <strong>Scurry:</strong> he can move through the space of any hostile creature as if it were Difficult Terrain. <strong>Squeeze:</strong> no penalty for squeezing into a space one size smaller than him. <strong>Brave:</strong> Advantage on saving throws against being Frightened.</p>"),

      feat("Druidic", "icons/sundries/scrolls/scroll-runed-brown-green.webp",
        "<p>Pippen knows Druidic, the secret language of druids, and can leave hidden messages in it. He can write Common and Druidic but can only <em>speak</em> Rodentia (see Pendant of the Common Tongue).</p>"),

      feat("Wild Resurgence", "icons/magic/nature/root-vine-entangled-hand.webp",
        "<p>Once per turn, if Pippen has no uses of Wild Shape left, he can expend a spell slot to regain one use (no action). Once per Long Rest, he can expend one use of Wild Shape to regain a 1st-level spell slot.</p>"),

      // ---- Actions ----
      feat("Spellcasting", "icons/magic/nature/leaf-glow-green.webp",
        "<p>Pippen is a CR 10 spellcaster (NPC slot rule: CR 10, Full). His spellcasting ability is Wisdom (spell save DC 17, +9 to hit with spell attacks). His Mossroot Staff is his Druidic Focus. <strong>Elemental Fury (Potent Spellcasting):</strong> he adds his Wisdom modifier (+5) to the damage of his druid cantrips.</p>"
        + "<p><strong>Prepared Druid spells:</strong></p>"
        + spellBlock),

      feat("Moon-Beast Form: Multiattack", "icons/creatures/abilities/bear-roar-bite-brown.webp",
        "<p><em>Wild Shape only (Moonbear form).</em> Pippen makes one Moon Claw attack and one Moon Bite attack.</p>",
        { activities: [act("utility", { activation: activation("action", { condition: "In Wild Shape (Moonbear form)" }) })] }),

      feat("Moon Claw", "icons/creatures/claws/claw-bear-paw-swipe-brown.webp",
        "<p><em>Wild Shape only.</em> <em>Melee Attack Roll:</em> +9, reach 5 ft. <em>Hit:</em> 12 (2d6 + 5) Slashing or Radiant damage (Improved Circle Forms).</p>",
        { activities: [act("attack", {
          activation: activation("action", { condition: "In Wild Shape" }),
          range: { override: true, value: "5", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "wis", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
          damage: { includeBase: false, parts: [{ number: 2, denomination: 6, bonus: "@mod", types: ["slashing", "radiant"] }] }
        })] }),

      feat("Moon Bite", "icons/creatures/abilities/mouth-teeth-long-red.webp",
        "<p><em>Wild Shape only.</em> <em>Melee Attack Roll:</em> +9, reach 5 ft. <em>Hit:</em> 14 (2d8 + 5) Piercing or Radiant damage (Improved Circle Forms).</p>",
        { activities: [act("attack", {
          activation: activation("action", { condition: "In Wild Shape" }),
          range: { override: true, value: "5", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "wis", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
          damage: { includeBase: false, parts: [{ number: 2, denomination: 8, bonus: "@mod", types: ["piercing", "radiant"] }] }
        })] }),

      // ---- Bonus Actions ----
      feat("Wild Shape (3/Day)", "icons/creatures/abilities/bear-roar-bite-brown.webp",
        "<p>Pippen shape-shifts into a Beast of CR 3 or lower that he has seen, for up to 5 hours or until he uses a bonus action to change back. <strong>Circle Forms:</strong> while in the form his AC is 18 (13 + his Wisdom modifier) if that's higher than the beast's, he gains 30 Temporary Hit Points, and he adds his Wisdom modifier to his Constitution saving throws. He keeps his own Hit Points, ability scores (except Strength, Dexterity and Constitution, which use the beast's for checks), and Concentration, but he can't cast spells in Wild Shape.</p>"
        + "<p><strong>Favorite forms:</strong></p><ul>"
        + "<li><strong>Moonbear</strong> (Large, glowing silver fur; fight form): uses Moon-Beast Form: Multiattack.</li>"
        + "<li><strong>Giant Owl</strong> (Large; Fly 60 ft.; travel and scouting).</li>"
        + "<li><strong>Field Mouse</strong> (Tiny; for hiding in plain sight).</li></ul>",
        {
          uses: DAILY(3),
          activities: [act("heal", {
            name: "Wild Shape (30 Temp HP)",
            activation: activation("bonus"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, units: "self" },
            healing: { number: null, denomination: null, bonus: "30", types: ["temphp"] }
          })]
        }),

      feat("Moonlight Step (5/Day)", "icons/magic/light/beam-rays-blue-small.webp",
        "<p>Pippen magically teleports up to 30 feet to an unoccupied space he can see. He has Advantage on the next attack roll he makes before the end of this turn. He can use this in or out of Wild Shape.</p>",
        { uses: DAILY(5), activities: [act("utility", {
          activation: activation("bonus"),
          consumption: { spellSlot: true, targets: [USE_ITEM] },
          range: { override: true, value: "30", units: "ft" }
        })] }),

      // ---- Reactions ----
      feat("Nimble Escape", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p><em>Trigger:</em> A creature Pippen can see makes an Opportunity Attack against him. <em>Response:</em> The attack roll has Disadvantage. He can't use this while wearing Medium or Heavy armor.</p>",
        { activities: [act("utility", { activation: activation("reaction", { condition: "Targeted by an Opportunity Attack" }) })] }),

      // ---- Legendary Actions (3 uses, Mortal tier, regained at the start of his turn) ----
      feat("Moon Swipe (Costs 1 Action)", "icons/creatures/claws/claw-bear-paw-swipe-brown.webp",
        "<p>Pippen makes one Moon Claw attack (in Wild Shape) or one Mossroot Staff attack (in his true form). He can't take this option again until the start of his next turn.</p>",
        { activities: [act("utility", legendary(1, "Once per round"))] }),

      feat("Scurry Away (Costs 1 Action)", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>Pippen moves up to half his Speed without provoking Opportunity Attacks.</p>",
        { activities: [act("utility", legendary(1))] }),

      feat("Guide the Moonlight (Costs 1 Action)", "icons/magic/light/beam-rays-blue-small.webp",
        "<p>If Pippen is concentrating on <em>moonbeam</em>, he moves its Cylinder up to 30 feet (this works even in Wild Shape). A creature the Cylinder moves into makes the spell's saving throw as normal.</p>",
        { activities: [act("utility", legendary(1))] })
    ];

    for ( const spell of SPELLS ) {
      try { pippenItems.push(await buildSpell(spell)); }
      catch ( err ) { console.error(`Pippen macro | Failed to build spell "${spell.name}"`, err); failed.push(spell.name); }
    }

    const biography = "<h2>Pippen, Moonwhisker of the Deep Wood</h2>"
      + "<p>A brown-furred mouseling no taller than a boot, wrapped in a green hooded cloak and carrying a mossy staff twice his height. Once a forest guide, now a druid of the Circle of the Moon who has walked as far as a mortal can go: one more step and he would become Ascendant. He speaks only the squeaking tongue Rodentia; the acorn pendant at his neck lets everyone else hear him in Common.</p>"
      + "<p><strong>Tier of Being:</strong> Mortal, peak (level 10, the Mortal cap).</p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Before the fight:</strong> <em>Pass without trace</em> for his allies; <em>barkskin</em> if he expects to fight in his true form.</li>"
      + "<li><strong>Round 1:</strong> <em>Moonbeam</em> at a high level on the enemies' front line, then Wild Shape into the Moonbear as a bonus action.</li>"
      + "<li><strong>Every round:</strong> Moonbear Multiattack while Moonbeam keeps burning (Concentration holds in Wild Shape). Moonlight Step to reach a caster or get Advantage.</li>"
      + "<li><strong>When the Moonbear drops:</strong> Back in his true form (Tiny and hard to hit), <em>healing word</em> or <em>cure wounds</em>, then Wild Shape again. <em>Spike growth</em> or <em>entangle</em> to hold a choke point.</li>"
      + "<li><strong>As an ally:</strong> <em>Mass cure wounds</em>, <em>greater restoration</em>, <em>conjure animals</em>, and guidance through any wilderness.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>He can't cast spells while in Wild Shape: force him out of the form to stop new spells.</li>"
      + "<li>Break his Concentration to end <em>moonbeam</em> or <em>conjure animals</em>; in true form his Constitution save is only +3.</li>"
      + "<li>Take or silence the pendant and he can't talk to you in Common (he can still cast and write).</li>"
      + "<li>Legendary Resistance is only 2/Day: bait it with cheap control before the spell that matters.</li></ul>"
      + "<h3>CR Check</h3>"
      + "<p>Defense ≈ CR 10 (AC 15 true form / 18 in Wild Shape; 92 HP + Legendary Resistance 2/Day as +40 effective HP (+20 each at CR 5–10) + about 60 Temporary HP from two Wild Shapes + about 20 healing = ~212 effective HP). "
      + "Offense ≈ CR 10 (best 3 rounds average ~66 damage per round at +9 to hit, DC 17: round 1 <em>moonbeam</em> at 5th level 27.5 on 2 targets + legendary Moon Swipe 12 = 67; rounds 2–3 Moonbear Multiattack 26 + <em>moonbeam</em> 27.5 + Moon Swipe 12 = 65.5). "
      + "Average ≈ CR 10.</p>";

    const pippenSystem = {
      abilities: {
        str: { value: 8, proficient: 0 }, dex: { value: 16, proficient: 0 }, con: { value: 16, proficient: 0 },
        int: { value: 14, proficient: 1 }, wis: { value: 20, proficient: 1 }, cha: { value: 12, proficient: 0 },
        hon: { value: 14, proficient: 0 }, san: { value: 14, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 15 },
        hp: { value: 92, max: 92, temp: 0, tempmax: 0, formula: "20d4 + 42" },
        init: { ability: "", bonus: "" },
        movement: { walk: "25", burrow: "", climb: "", fly: "", swim: "", units: "ft", hover: false },
        senses: { ranges: { darkvision: 60, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" },
        spellcasting: "wis",
        spell: { level: 10 }
      },
      spells: Object.fromEntries(Array.from({ length: 9 }, (_, i) => {
        const key = `spell${i + 1}`;
        const max = SLOTS[key] ?? 0;
        return [key, { value: max, override: max }];
      })),
      details: {
        cr: 10,
        alignment: "Neutral Good",
        type: { value: "humanoid", subtype: "Mousefolk (Mouseling), Druid", swarm: "", custom: "" },
        habitat: { value: [{ type: "forest" }, { type: "grassland" }], custom: "" },
        treasure: { value: ["individual"] },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 3, spent: 0 },   // Mortal tier = 3
        legres: { max: 2, spent: 0 },   // Mortal tier = 2
        lair: { value: false }
      },
      skills: {
        ani: { value: 1 },   // +9
        med: { value: 1 },   // +9
        nat: { value: 1 },   // +6
        prc: { value: 1 },   // +9 (Passive 19)
        ste: { value: 1 },   // +7 (Lightfooted)
        sur: { value: 2 }    // Expertise (Guide): +13
      },
      traits: {
        size: "tiny",
        di: { value: [] },
        dr: { value: [] },
        dv: { value: [] },
        ci: { value: [] },
        languages: { value: ["druidic"], custom: "Rodentia (speaks only); writes Common; heard as Common while wearing his pendant" }
      }
    };

    await wipe(pippen);
    await pippen.update({ system: pippenSystem, "prototypeToken.actorLink": true });
    await addItems(pippen, pippenItems, failed);

    pippen.sheet.render(true);
    ui.notifications.info(`${pippen.name} rebuilt as a CR 10 mouseling Moon druid (${pippenItems.length} items).`);
    if ( missingSpells.length ) ui.notifications.warn(`Spells not found in any compendium (placeholders made): ${missingSpells.join(", ")}`, { permanent: true });
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Pippen macro | ", err);
    ui.notifications.error(`Pippen macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
