/**
 * Xear, the Silent Invoker — CR 19 Invocation Wizard (Evoker), Divine tier, legendary boss
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Xear" (all items and effects) and rebuilds it.
 *     Portrait, token and folder are kept.
 *   - Signature: Thoughtcasting (spells need no components and give no sign of casting)
 *     and Multicast (Twin Thought + Echo Thought cast extra spells in one round).
 *   - Spells are copied from the system's spell compendium (2024 version preferred) as real,
 *     castable spells, grouped by spell level. Missing spells become placeholders.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Xear";
  const MAKE_BACKUP = false;   // true = copy "Xear (backup)" before wiping
  const DC = "21";             // flat DC for his features (= his spell save DC)

  // Wizard spellcasting (Intelligence, DC 21, +13 to hit).
  // NPC slot rule (Core-Rules/NPC-Design-system.md): CR 19 row, Full caster.
  const SLOTS = { spell1: 7, spell2: 7, spell3: 6, spell4: 6, spell5: 5, spell6: 4, spell7: 3, spell8: 3, spell9: 2 };
  // list: "control" = Spellcasting item, "destruction" = Spellcasting (Destruction) item.
  // always: always prepared.
  const SPELLS = [
    // Cantrips
    { name: "Fire Bolt", list: "destruction" },
    { name: "Ray of Frost", list: "destruction" },
    { name: "Shocking Grasp", list: "destruction" },
    { name: "Mage Hand", list: "control" },
    { name: "Message", list: "control" },
    { name: "Prestidigitation", list: "control" },
    // 1st
    { name: "Magic Missile", list: "destruction" },
    { name: "Shield", list: "control", always: true },
    { name: "Detect Magic", list: "control" },
    // 2nd
    { name: "Scorching Ray", list: "destruction" },
    { name: "Misty Step", list: "control" },
    { name: "Detect Thoughts", list: "control" },
    // 3rd
    { name: "Fireball", list: "destruction" },
    { name: "Lightning Bolt", list: "destruction" },
    { name: "Counterspell", list: "control", always: true },
    { name: "Dispel Magic", list: "control" },
    // 4th
    { name: "Ice Storm", list: "destruction" },
    { name: "Greater Invisibility", list: "control" },
    { name: "Banishment", list: "control" },
    // 5th
    { name: "Cone of Cold", list: "destruction" },
    { name: "Wall of Force", list: "control" },
    // 6th
    { name: "Disintegrate", list: "destruction" },
    { name: "Globe of Invulnerability", list: "control" },
    // 7th
    { name: "Delayed Blast Fireball", list: "destruction" },
    { name: "Teleport", list: "control" },
    // 8th
    { name: "Sunburst", list: "destruction" },
    { name: "Maze", list: "control" },
    // 9th
    { name: "Foresight", list: "control" },
    { name: "Time Stop", list: "control" }
  ];

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const xear = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !xear ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

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
        catch ( err ) { console.error(`Xear macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(data.name); }
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
    async function buildSpell({ name, always = false }) {
      let data = await findSpell(name);
      if ( !data ) {
        missingSpells.push(name);
        data = { name, type: "spell", img: "icons/magic/control/hypnosis-mesmerism-swirl.webp",
          system: { level: 1, description: { value: `<p>Placeholder: "${name}" wasn't found in a compendium. Replace it with the real spell.</p>` }, activities: {} } };
      }
      delete data._id;
      if ( data.system.preparation ) data.system.preparation = { mode: always ? "always" : "prepared", prepared: true };
      else { data.system.method = "spell"; data.system.prepared = always ? 2 : 1; }
      // Thoughtcasting: no components at all.
      data.system.properties = (data.system.properties ?? []).filter(p => !["vocal", "somatic", "material"].includes(p));
      return data;
    }

    const failed = [];

    if ( MAKE_BACKUP ) {
      const data = xear.toObject();
      delete data._id;
      data.name = `${xear.name} (backup)`;
      await Actor.implementation.create(data);
    }

    const spellList = (list, level) => SPELLS
      .filter(s => s.list === list && s.level === level)
      .map(s => `<em>${s.name.toLowerCase()}</em>${s.always ? " (always prepared)" : ""}`).join(", ");

    // Spell levels for the Spellcasting description (only used for text).
    const LEVELS = {
      "Fire Bolt": 0, "Ray of Frost": 0, "Shocking Grasp": 0, "Mage Hand": 0, "Message": 0, "Prestidigitation": 0,
      "Magic Missile": 1, "Shield": 1, "Detect Magic": 1,
      "Scorching Ray": 2, "Misty Step": 2, "Detect Thoughts": 2,
      "Fireball": 3, "Lightning Bolt": 3, "Counterspell": 3, "Dispel Magic": 3,
      "Ice Storm": 4, "Greater Invisibility": 4, "Banishment": 4,
      "Cone of Cold": 5, "Wall of Force": 5,
      "Disintegrate": 6, "Globe of Invulnerability": 6,
      "Delayed Blast Fireball": 7, "Teleport": 7,
      "Sunburst": 8, "Maze": 8,
      "Foresight": 9, "Time Stop": 9
    };
    for ( const s of SPELLS ) s.level = LEVELS[s.name];
    const spellBlock = list => "<ul>" + Array.from({ length: 10 }, (_, lvl) => {
      const names = spellList(list, lvl);
      if ( !names ) return "";
      const label = lvl === 0 ? "Cantrips (at will)" : `${lvl}${["st", "nd", "rd"][lvl - 1] ?? "th"} level (${SLOTS[`spell${lvl}`]} slot${SLOTS[`spell${lvl}`] > 1 ? "s" : ""})`;
      return `<li><strong>${label}:</strong> ${names}</li>`;
    }).join("") + "</ul>";

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const greyEffect = statusEffect("Grey Silence", "icons/magic/control/hypnosis-mesmerism-swirl.webp", ["deafened"],
      { rounds: 10 }, "In a scene under Xear's Grey Silence: can't speak or hear (Deafened), can't cast spells with a Verbal component or speak command words, and sees only in grey (Disadvantage on Wisdom (Perception) checks that rely on sight). Remove when the Domain ends.");

    const xearItems = [
      // ---- Traits ----
      feat("Divine Being", "icons/magic/symbols/star-solid-gold.webp",
        "<p><strong>Tier of Being: Divine (Definition).</strong> Xear has defined himself: <em>\"a thought is already a spell.\"</em> That definition, not his body, is the source of his existence. He doesn't age and can't die of old age.</p>"
        + "<p><em>Tier Gap:</em> Against an Ascendant-tier creature, Xear has a +5 bonus to every d20 Test that involves that creature (his attack rolls against it, his saving throws against its effects, and contested checks with it); the Ascendant gains no penalty. A creature two or more tiers below him (Mortal) can't affect him at all.</p>"),

      feat("Persisting Definition", "icons/magic/unholy/silhouette-robe-evil-power.webp",
        "<p>When Xear drops to 0 Hit Points, his body dissolves into silent thought instead of dying. He re-forms 1d10 days later in a place where his name is spoken or his spells are studied, with all his Hit Points. He stays gone for good only once no living creature remembers him (or his definition is broken in a way the DM decides).</p>"),

      feat("Thoughtcasting", "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "<p>Xear casts spells by thought alone. His spells require no Verbal, Somatic, or Material components, including Material components with a cost, unless the spell consumes them.</p>"
        + "<p>His casting has no visible or audible sign. Other creatures can't tell that he is casting a spell or identify it until its effect appears, so a reaction triggered by seeing a creature cast a spell (such as <em>counterspell</em>) can't be used against him. He can cast spells while Silenced, Grappled, Restrained, or with his hands bound or full.</p>"),

      feat("Unbound Mind", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p>Xear can maintain Concentration on two spells at the same time. When he would make a saving throw to maintain Concentration, he makes one save for both spells. On a failure, he chooses one of the two spells to end; the other remains.</p>"),

      feat("Hidden Origin", "icons/magic/unholy/silhouette-robe-evil-glow.webp",
        "<p>Xear's mind and history are veiled. Magic can't read his thoughts, learn his creature type or true name, or locate him unless he allows it, and he is never targeted by scrying unless he chooses to be. Divination spells that would reveal his past return only silence.</p>"),

      feat("Thought Sense", "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "<p>Xear senses every creature with an Intelligence of 3 or higher within 120 feet of him. He knows the location of each such creature, even if it is Invisible, behind total cover, or Hidden, and he can target it with his spells as if he could see it. He can't be surprised by such creatures. A creature protected by <em>mind blank</em> or <em>nondetection</em> is hidden from this sense.</p>"),

      feat("Legendary Resistance (4/Day, or 5/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Xear fails a saving throw, he can choose to succeed instead. Divine tier = 4 uses. In his lair he has 5 uses instead of 4 (set the maximum to 5 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Magic Resistance", "icons/magic/defensive/shield-barrier-blue.webp",
        "<p>Xear has Advantage on saving throws against spells and other magical effects.</p>"),

      feat("Sculpt Thought", "icons/magic/defensive/shield-barrier-deflect-teal.webp",
        "<p>When Xear casts an Evocation spell that affects other creatures he can sense, he can choose any number of them. Each chosen creature automatically succeeds on its saving throw against the spell and takes no damage if it would normally take half damage on a successful save.</p>"),

      feat("Empowered Evocation", "icons/magic/unholy/beam-ringed-impact-purple.webp",
        "<p>Xear adds his Intelligence modifier (+7) to one damage roll of any Wizard Evocation spell he casts.</p>",
        { activities: [act("damage", {
          activation: activation("special", { condition: "One damage roll of an Evocation spell" }),
          damage: { parts: [{ number: null, denomination: null, bonus: "7", types: ["force"] }] }
        })] }),

      feat("Overchannel (1/Day)", "icons/magic/unholy/silhouette-robe-evil-power.webp",
        "<p>When Xear casts a Wizard spell of 5th level or lower that deals damage, he can deal maximum damage with that spell on the turn he casts it.</p>",
        { uses: DAILY(1), activities: [act("utility", {
          activation: activation("special", { condition: "Cast a damaging spell of 5th level or lower" }),
          consumption: { spellSlot: true, targets: [USE_ITEM] }
        })] }),

      // ---- Actions ----
      feat("Multiattack", "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "<p>Xear makes three Thought Lance attacks. He can replace two of the attacks with a use of Spellcasting or Spellcasting (Destruction) to cast a spell of 5th level or lower. A spell of 6th level or higher takes his whole action instead of Multiattack.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      feat("Thought Lance", "icons/magic/unholy/beam-ringed-impact-purple.webp",
        "<p><em>Melee or Ranged Attack Roll:</em> +13, reach 5 ft. or range 120 ft. <em>Hit:</em> 25 (4d8 + 7) Psychic damage.</p>",
        { activities: [act("attack", {
          activation: activation("action"),
          range: { override: true, value: "120", units: "ft" },
          attack: { ability: "int", bonus: "", flat: false, type: { value: "ranged", classification: "spell" } },
          damage: { includeBase: false, parts: [{ number: 4, denomination: 8, bonus: "@mod", types: ["psychic"] }] }
        })] }),

      feat("Spellcasting", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p>Xear is a CR 19 Boss spellcaster (NPC slot rule: CR 19, Full caster). His spellcasting ability is Intelligence (spell save DC 21, +13 to hit with spell attacks). Thanks to Thoughtcasting, none of his spells need components. He has the following control and utility spells prepared:</p>"
        + spellBlock("control")
        + "<p><em>Spell slots are shared with Spellcasting (Destruction).</em></p>"),

      feat("Spellcasting (Destruction)", "icons/magic/unholy/beam-ringed-impact-purple.webp",
        "<p>Xear's Evocation spells, shaped by Sculpt Thought and Empowered Evocation (+7 to one damage roll). Same slots, DC 21, +13 to hit:</p>"
        + spellBlock("destruction")),

      feat("Domain: Grey Silence (1/Day)", "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "<p><strong>Divine Domain — ความเงียบสีเทา.</strong> Xear opens his Domain, the expression of his Definition: in a world where thought is enough, sound and color are unnecessary. The whole scene turns soundless and grey (no range: the Domain covers the entire scene). It lasts 1 minute, until he has the Incapacitated condition, or until he ends it (no action required). It doesn't require Concentration.</p>"
        + "<p>Every creature other than Xear in the scene (he can exempt any creatures he chooses):</p><ul>"
        + "<li><strong>Can't speak.</strong> It can't cast spells with a Verbal component, speak command words, or use effects that require speech.</li>"
        + "<li><strong>Can't hear.</strong> It has the Deafened condition and automatically fails any ability check that relies on hearing.</li>"
        + "<li><strong>Can't see color.</strong> Everything is grey. It has Disadvantage on Wisdom (Perception) checks that rely on sight and can't tell anything apart by color (light, flame, banners, potions, illusions disguised by hue).</li></ul>"
        + "<p>Telepathy still works inside, and Xear's own spellcasting is unaffected (Thoughtcasting).</p>",
        {
          uses: DAILY(1),
          effects: [greyEffect],
          activities: [act("utility", {
            activation: activation("action"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            duration: { override: true, value: "1", units: "minute" },
            range: { override: true, value: "", units: "spec", special: "The whole scene" },
            target: { override: true, affects: { type: "creature", choice: true } },
            effects: [{ _id: greyEffect._id }]
          })]
        }),

      // ---- Bonus Actions ----
      feat("Thought Step", "icons/magic/movement/portal-vortex-orange.webp",
        "<p>Xear teleports up to 30 feet to an unoccupied space he can see or sense with Thought Sense.</p>",
        { activities: [act("utility", {
          activation: activation("bonus"),
          range: { override: true, value: "30", units: "ft" },
          target: { override: true, affects: { type: "self" } }
        })] }),

      feat("Twin Thought (Recharge 5–6)", "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "<p><strong>Multicast.</strong> Xear casts a second spell of 3rd level or lower that has a casting time of an action, expending a spell slot as normal. This ignores the rule that limits him to one spell slot per turn, and the second spell can be cast the same turn as another leveled spell.</p>",
        { uses: RECHARGE(5), activities: [act("utility", {
          activation: activation("bonus"),
          consumption: { spellSlot: true, targets: [USE_ITEM] }
        })] }),

      // ---- Legendary Actions (5 uses, Divine tier, regained at the start of his turn) ----
      feat("Lance (Costs 1 Action)", "icons/magic/unholy/beam-ringed-impact-purple.webp",
        "<p>Xear makes one Thought Lance attack. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("utility", legendary(1, "Once per round"))] }),

      feat("Blink of Thought (Costs 1 Action)", "icons/magic/movement/portal-vortex-orange.webp",
        "<p>Xear uses Thought Step.</p>",
        { activities: [act("utility", { ...legendary(1), range: { override: true, value: "30", units: "ft" } })] }),

      feat("Shatter Focus (Costs 2 Actions)", "icons/magic/control/fear-fright-white.webp",
        "<p>Xear crushes the mind of one creature he can sense within 120 feet of him. The target makes a DC 21 Intelligence saving throw. <em>Failure:</em> 22 (4d10) Psychic damage, and if the target is Concentrating, its Concentration ends. <em>Success:</em> Half damage only. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("save", {
          ...legendary(2, "Once per round"),
          range: { override: true, value: "120", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          save: { ability: ["int"], dc: { calculation: "", formula: DC } },
          damage: { onSave: "half", parts: [{ number: 4, denomination: 10, bonus: "", types: ["psychic"] }] }
        })] }),

      feat("Echo Thought (Costs 3 Actions)", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p><strong>Multicast.</strong> Xear casts a spell of 3rd level or lower that has a casting time of an action, expending a spell slot as normal. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("utility", legendary(3, "Once per round"))] })
    ];

    for ( const spell of SPELLS ) {
      try { xearItems.push(await buildSpell(spell)); }
      catch ( err ) { console.error(`Xear macro | Failed to build spell "${spell.name}"`, err); failed.push(spell.name); }
    }

    const biography = "<h2>Xear, the Silent Invoker</h2>"
      + "<p>A wizard of invocation who no longer speaks, gestures, or carries a focus. Spells simply happen around him the moment he thinks them, and no one can see them coming.</p>"
      + "<p><strong>Tier of Being:</strong> Divine (stage: Definition; cap CR 30, ability 27). His definition is <em>\"a thought is already a spell.\"</em> He sits low in the Divine band at CR 19: the tier is a ceiling, not his current power.</p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Before the fight:</strong> He senses minds through walls with Thought Sense, so he is never surprised. If he has time, he opens with <em>greater invisibility</em> and holds it alongside a second Concentration spell (Unbound Mind).</li>"
      + "<li><strong>Round 1:</strong> <em>Wall of force</em> or <em>maze</em> to split the party, then Twin Thought <em>fireball</em> or <em>lightning bolt</em> on everyone left, using Sculpt Thought to spare his allies.</li>"
      + "<li><strong>Grey Silence:</strong> Open the Domain on round 1 or 2. Across the whole scene every Verbal spell goes quiet, nobody can call out to each other, and he keeps casting freely.</li>"
      + "<li><strong>Every round:</strong> Multiattack with Thought Lance, swapping two attacks for a spell of 5th level or lower when there are three or more targets in an area. <em>Disintegrate</em> and <em>sunburst</em> take his whole action.</li>"
      + "<li><strong>Legendary:</strong> Shatter Focus on the party's Concentration caster first, Echo Thought for a second <em>fireball</em> or <em>counterspell</em>-proof <em>dispel magic</em>, and Blink of Thought to escape melee.</li>"
      + "<li><strong>Before a big fight:</strong> <em>Foresight</em> on himself (Advantage on everything, attackers have Disadvantage) to cover his thin defenses.</li>"
      + "<li><strong>When pressed:</strong> <em>Shield</em> and <em>counterspell</em> as reactions, <em>globe of invulnerability</em> against blasters, <em>time stop</em> to set up <em>delayed blast fireball</em>, or <em>teleport</em> out.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li><strong>Grey Silence:</strong> It covers the whole scene, so there's no running from it: outlast the 1 minute or Incapacitate him. Subtle Spell, Somatic/Material-only spells, telepathy, and pre-planned hand signals still work. Incapacitating him ends it at once.</li>"
      + "<li>Silence, grapples, and <em>counterspell</em> don't work. What does: Incapacitating him (Stunned, Paralyzed, Unconscious), <em>antimagic field</em>, and breaking his Concentration.</li>"
      + "<li>His saves are strong in INT, WIS, CON, and SAN. Target STR, DEX, or CHA, and burn through Legendary Resistance and Magic Resistance with cheap effects first.</li>"
      + "<li><em>Mind blank</em> or <em>nondetection</em> hides a creature from Thought Sense, so it can sneak up or stay out of his targeting.</li>"
      + "<li><strong>Persisting Definition:</strong> killing him only buys 1d10 days. Ending him for good is a story goal: erase the memory of him, or break his definition (for example, make him speak a spell aloud or fail to cast one by thought).</li>"
      + "<li>He has 292 HP and only AC 17. Spreading out limits area spells, and martial pressure in melee forces him to spend his bonus action and legendary actions on Thought Step.</li></ul>"
      + "<h3>CR Check</h3>"
      + "<p>Defense ≈ CR 17–18 (AC 17, 22 with <em>shield</em>; 292 HP; Psychic and Charmed immunity, Magic Resistance, Legendary Resistance 4/Day; <em>foresight</em> if he prepares). Grey Silence shuts off most Verbal spells across the whole scene for 1 minute, which pushes effective defense up about 1–2 CR against caster-heavy parties. Offense ≈ CR 21 (best 3 rounds average ~175 damage per round at +13 to hit and DC 21, counting area spells as 2 targets: round 1 <em>disintegrate</em> 75 + Twin Thought <em>fireball</em> 56 + legendary Echo Thought <em>fireball</em> 56 and Shatter Focus 22; round 2 <em>sunburst</em> ~98 + legendary 78; round 3 three Thought Lances 75 + legendary 78). Average ≈ CR 19–20. Limits that keep him at CR 19: Multiattack can swap in only spells of 5th level or lower, Twin Thought and Echo Thought cast only 3rd level or lower, and Lance, Shatter Focus and Echo Thought are each once per round. The Tier Gap matters more than CR here: Ascendant-tier PCs face +5 on all his d20 Tests against them, and Mortal-tier PCs can't affect him at all, so a Mortal party can't fight him directly.</p>";

    const xearSystem = {
      abilities: {
        str: { value: 9, proficient: 0 }, dex: { value: 16, proficient: 0 }, con: { value: 16, proficient: 1 },
        int: { value: 24, proficient: 1 }, wis: { value: 18, proficient: 1 }, cha: { value: 14, proficient: 0 },
        hon: { value: 12, proficient: 0 }, san: { value: 22, proficient: 1 }
      },
      attributes: {
        ac: { calc: "flat", flat: 17 },
        hp: { value: 292, max: 292, temp: 0, tempmax: 0, formula: "39d8 + 117" },
        init: { ability: "", bonus: "" },
        movement: { walk: "30", burrow: "", climb: "", fly: "", swim: "", units: "ft", hover: false },
        senses: { ranges: { darkvision: null, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "Thought Sense 120 ft." },
        spellcasting: "int",
        spell: { level: 19 }
      },
      spells: Object.fromEntries(Array.from({ length: 9 }, (_, i) => {
        const key = `spell${i + 1}`;
        const max = SLOTS[key] ?? 0;
        return [key, { value: max, override: max }];
      })),
      details: {
        cr: 19,
        type: { value: "humanoid", subtype: "Wizard", swarm: "", custom: "" },
        habitat: { value: [{ type: "planar" }, { type: "urban" }], custom: "" },
        treasure: { value: ["arcana"] },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 5, spent: 0 },   // Divine tier = 5
        legres: { max: 4, spent: 0 }, // Divine tier = 4
        lair: { value: false }
      },
      skills: {
        arc: { value: 2 },   // Expertise: +19
        his: { value: 1 },   // +13
        ins: { value: 2 },   // Expertise: +16
        prc: { value: 1 }    // +10 (Passive 20)
      },
      traits: {
        size: "med",
        di: { value: ["psychic"] },
        dr: { value: [] },
        dv: { value: [] },
        ci: { value: ["charmed"] },
        languages: {
          value: ["common", "draconic", "elvish", "deep"],
          custom: "plus two others",
          communication: { telepathy: { value: 120, units: "ft" } }
        }
      }
    };

    await wipe(xear);
    await xear.update({
      system: xearSystem,
      "prototypeToken.actorLink": true,
      "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.HOSTILE
    });
    await addItems(xear, xearItems, failed);

    xear.sheet.render(true);
    ui.notifications.info(`${xear.name} rebuilt as a CR 19 Invocation Wizard (${xearItems.length} items).`);
    if ( missingSpells.length ) ui.notifications.warn(`Spells not found in any compendium (placeholders made): ${missingSpells.join(", ")}`, { permanent: true });
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Xear macro | ", err);
    ui.notifications.error(`Xear macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
