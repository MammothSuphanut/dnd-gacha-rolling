/**
 * Isus, the Oathless Monarch — CR 19 Oathbreaker Paladin, Divine tier (sword & shield duelist, revenant honor guard)
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Isus" (all items and effects) and rebuilds it.
 *     Portrait, token and folder are kept.
 *   - Creates (or rebuilds) a world NPC "Shadow Revenant" in the same folder.
 *     Isus's "Rise, Revenants" and "Rise From Ruin" summon it straight onto the map.
 *   - Domain เงาทมิฬกลืนโลก: the "Devouring Dark" tracker item rolls the growing damage.
 *   - Paladin spells are copied from compendiums (2024 first) or the world's Items directory
 *     (e.g. Plutonium imports). Missing spells become placeholders.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Isus";
  const REVENANT_NAME = "Shadow Revenant";
  const MAKE_BACKUP = false;   // true = copy "Isus (backup)" before wiping

  // Oathbreaker Paladin spellcasting (Charisma, DC 20, +12 to hit).
  // NPC slot rule (Core-Rules/NPC-Design-system.md): CR 19 row, Hybrid (max 5th) = 7 / 7 / 6 / 6 / 5.
  // No smite spells: Dread Smite and Monarch's Ruin replace them. always = Oathbreaker oath spells.
  const SLOTS = { spell1: 7, spell2: 7, spell3: 6, spell4: 6, spell5: 5 };
  const SPELLS = [
    // 1st
    { name: "Command", level: 1 },
    { name: "Compelled Duel", level: 1 },
    { name: "Inflict Wounds", level: 1, always: true },
    { name: "Protection from Evil and Good", level: 1 },
    // 2nd
    { name: "Darkness", level: 2, always: true },
    { name: "Crown of Madness", level: 2, always: true },
    { name: "Find Steed", level: 2 },
    // 3rd
    { name: "Bestow Curse", level: 3, always: true },
    { name: "Dispel Magic", level: 3 },
    { name: "Fear", level: 3 },
    // 4th
    { name: "Blight", level: 4, always: true },
    { name: "Confusion", level: 4, always: true },
    { name: "Banishment", level: 4 },
    // 5th
    { name: "Destructive Wave", level: 5 },
    { name: "Dominate Person", level: 5, always: true },
    { name: "Contagion", level: 5, always: true }
  ];

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const isus = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !isus ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const ADD = CONST.ACTIVE_EFFECT_MODES?.ADD ?? 2;
    const LEGACT = { type: "attribute", target: "resources.legact.value", value: "1" };
    const USE_ITEM = { type: "itemUses", target: "", value: "1" };
    const RECHARGE = n => ({ spent: 0, max: "1", recovery: [{ period: "recharge", formula: String(n), type: "recoverAll" }] });
    const DAILY = n => ({ spent: 0, max: String(n), recovery: [{ period: "day", type: "recoverAll" }] });
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
    const auraOfHate = desc => ({
      _id: rid(),
      name: "Aura of Hate",
      img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
      transfer: true,
      disabled: false,
      changes: [{ key: "system.bonuses.mwak.damage", mode: ADD, value: "6" }],
      description: `<p>${desc}</p>`
    });

    async function wipe(actor) {
      const itemIds = actor.items.map(i => i.id);
      if ( itemIds.length ) await actor.deleteEmbeddedDocuments("Item", itemIds);
      const effectIds = actor.effects.map(e => e.id);
      if ( effectIds.length ) await actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);
    }

    // Search order: 2024 compendiums → spells already in the world's Items directory
    // (e.g. imported with Plutonium) → every other compendium.
    const itemPacks = game.packs.filter(p => p.documentName === "Item")
      .sort((a, b) => Number(b.collection.includes("24")) - Number(a.collection.includes("24")));
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
        data = { name, type: "spell", img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
          system: { level, description: { value: `<p>Placeholder: "${name}" wasn't found in a compendium or the world's Items. Import it (e.g. with Plutonium) and run the macro again.</p>` }, activities: {} } };
      }
      delete data._id;
      if ( data.system.preparation ) data.system.preparation = { mode: always ? "always" : "prepared", prepared: true };
      else { data.system.method = "spell"; data.system.prepared = always ? 2 : 1; }
      return data;
    }

    const spellBlock = "<ul>" + Array.from({ length: 10 }, (_, lvl) => {
      const names = SPELLS.filter(s => s.level === lvl)
        .map(s => `<em>${s.name.toLowerCase()}</em>${s.always ? " (oath spell)" : ""}`).join(", ");
      if ( !names ) return "";
      const label = `${lvl}${["st", "nd", "rd"][lvl - 1] ?? "th"} level (${SLOTS[`spell${lvl}`]} slots)`;
      return `<li><strong>${label}:</strong> ${names}</li>`;
    }).join("") + "</ul>";

    async function addItems(actor, items, failed) {
      for ( const data of items ) {
        try { await actor.createEmbeddedDocuments("Item", [data]); }
        catch ( err ) { console.error(`Isus macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(`${data.name} (${actor.name})`); }
      }
    }

    const EMPTY_MOVEMENT = { walk: "30", burrow: "", climb: "", fly: "", swim: "", units: "ft", hover: false };
    const failed = [];

    if ( MAKE_BACKUP ) {
      const data = isus.toObject();
      delete data._id;
      data.name = `${isus.name} (backup)`;
      await Actor.implementation.create(data);
    }

    /* ================================================================== */
    /*  1. Shadow Revenant (summon)                                       */
    /* ================================================================== */
    const revenantSystem = {
      abilities: {
        str: { value: 18, proficient: 0 }, dex: { value: 12, proficient: 0 }, con: { value: 16, proficient: 0 },
        int: { value: 6, proficient: 0 }, wis: { value: 10, proficient: 0 }, cha: { value: 6, proficient: 0 },
        hon: { value: 10, proficient: 0 }, san: { value: 10, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 16 },
        hp: { value: 45, max: 45, formula: "6d8 + 18" },
        movement: EMPTY_MOVEMENT,
        senses: { ranges: { darkvision: 60 }, units: "ft", special: "" }
      },
      details: {
        cr: 3,
        alignment: "Neutral Evil",
        type: { value: "undead", subtype: "", swarm: "", custom: "" },
        biography: { value: "<p>A fallen warrior pulled back from death by Isus. It wears its old armor as solid shadow and obeys his silent commands.</p><p><em>Summoned revenants grant no XP.</em></p>" }
      },
      traits: {
        size: "med",
        di: { value: ["necrotic", "poison"] },
        ci: { value: ["charmed", "exhaustion", "frightened", "poisoned"] },
        languages: { value: [], custom: "Understands the languages Isus knows but can't speak" }
      }
    };

    const revenantItems = [
      feat("Bound to the Monarch", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p>The revenant takes its turn immediately after Isus and obeys his telepathic commands (no action required). If Isus dies, the revenant collapses into shadow and is destroyed.</p>"),

      feat("Undying Loyalty", "icons/creatures/magical/spirit-undead-ghost-purple.webp",
        "<p>If damage reduces the revenant to 0 Hit Points, it makes a Constitution saving throw (DC 5 plus the damage taken) unless the damage is Radiant or from a Critical Hit. On a success, the revenant drops to 1 Hit Point instead.</p>"),

      feat("Aura of Hate", "icons/magic/unholy/silhouette-robe-evil-power.webp",
        "<p>While within 30 feet of Isus, the revenant deals an extra 6 damage with melee weapon attacks.</p><p><em>Foundry: the \"Aura of Hate\" effect is on by default. Turn it off in the Effects tab if the revenant is more than 30 feet from Isus.</em></p>",
        { effects: [auraOfHate("Melee weapon attacks deal an extra 6 damage (within 30 feet of Isus).")] }),

      (() => {
        const a = act("attack", {
          activation: activation("action"),
          attack: { ability: "str", bonus: "", flat: false, type: { value: "", classification: "" } },
          damage: { includeBase: true, parts: [] }
        });
        return {
          name: "Shadow Blade",
          type: "weapon",
          img: "icons/skills/melee/sword-damaged-broken-purple.webp",
          system: {
            type: { value: "martialM", baseItem: "longsword" },
            quantity: 1, equipped: true, proficient: 1, identified: true,
            properties: ["mgc"],
            range: { value: null, long: null, reach: null, units: "ft" },
            damage: { base: { number: 1, denomination: 8, bonus: "", types: ["slashing"] } },
            description: { value: "<p><em>Melee Attack Roll:</em> +6, reach 5 ft. <em>Hit:</em> 8 (1d8 + 4) Slashing damage, or 14 (1d8 + 10) Slashing damage within 30 feet of Isus (Aura of Hate).</p>" },
            activities: { [a._id]: { sort: 100000, ...a } }
          }
        };
      })()
    ];

    let revenant = game.actors.find(a => (a.type === "npc") && (a.name === REVENANT_NAME));
    const revenantImg = "icons/creatures/magical/spirit-undead-ghost-purple.webp";
    const revenantToken = {
      name: REVENANT_NAME,
      actorLink: false,
      appendNumber: true,
      disposition: CONST.TOKEN_DISPOSITIONS.HOSTILE,
      displayName: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
      displayBars: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
      bar1: { attribute: "attributes.hp" }
    };
    if ( revenant ) {
      await wipe(revenant);
      await revenant.update({ system: revenantSystem, prototypeToken: revenantToken });
    } else {
      revenant = await Actor.implementation.create({
        name: REVENANT_NAME,
        type: "npc",
        img: revenantImg,
        folder: isus.folder?.id ?? null,
        system: revenantSystem,
        prototypeToken: { ...revenantToken, texture: { src: revenantImg } }
      });
    }
    await addItems(revenant, revenantItems, failed);

    /* ================================================================== */
    /*  2. Isus                                                           */
    /* ================================================================== */
    const LEGACT2 = { type: "attribute", target: "resources.legact.value", value: "2" };
    const frightenedAspect = statusEffect("Dreadful Aspect", "icons/magic/control/fear-fright-white.webp", "frightened",
      { seconds: 60 }, "Frightened of Isus for 1 minute. Repeat the save at the end of each turn, ending the effect on a success.");
    const frightenedRuin = statusEffect("Monarch's Ruin", "icons/magic/control/fear-fright-white.webp", "frightened",
      { rounds: 1 }, "Frightened of Isus until the end of its next turn.");
    const proneBash = statusEffect("Shield Bash", "icons/magic/control/silhouette-fall-slip-prone.webp", "prone",
      {}, "Knocked Prone by Isus's shield.");

    const summonActivity = (count, actType, extra = {}) => act("summon", {
      activation: activation(actType, extra.activation ?? {}),
      consumption: { spellSlot: true, targets: extra.consume ? [USE_ITEM] : [] },
      range: { override: true, value: extra.range ?? "30", units: "ft" },
      bonuses: { ac: "", hd: "", hp: "", attackDamage: "", saveDamage: "", healing: "" },
      creatureSizes: [],
      creatureTypes: [],
      match: { ability: "", attacks: false, disposition: true, proficiency: false, saves: false },
      profiles: [{ _id: rid(), count: String(count), name: REVENANT_NAME, uuid: revenant.uuid, level: { min: null, max: null }, types: [] }],
      summon: { mode: "", prompt: true }
    });

    const isusItems = [
      // ---- Traits ----
      feat("Divine Being", "icons/magic/symbols/star-solid-gold.webp",
        "<p><strong>Tier of Being: Divine (Definition).</strong> Isus has defined himself: <em>\"an oath I broke is a crown no one can take back.\"</em> That definition, not his body, is the source of his existence. He doesn't age and can't die of old age.</p>"
        + "<p><em>Tier Gap:</em> For each tier Isus is above another creature, he gains +5 to every d20 Test that involves that creature (his attack rolls against it, his saving throws against its effects, and contested checks with it) and +5 AC against that creature's attacks (Ascendant +5, Mortal +10). The lower creature's other rolls are unchanged.</p>"),

      feat("Aura of Hate", "icons/magic/unholy/silhouette-robe-evil-power.webp",
        "<p>While Isus doesn't have the Incapacitated condition, he and each Undead of his choice within 30 feet of him deal an extra 6 damage with melee weapon attacks (included in his attacks).</p>",
        { effects: [auraOfHate("Isus's melee weapon attacks deal an extra 6 damage.")] }),

      feat("Unburdened Steel", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>Isus moves in full plate and shield as if he wore nothing. His armor never gives him Disadvantage, his Speed is 40 feet, and Difficult Terrain costs him no extra movement. He has Advantage on Initiative rolls.</p>"
        + "<p>He can split his movement between the attacks of his Multiattack, and his movement doesn't provoke Opportunity Attacks from any creature he has hit this turn.</p>"),

      feat("Lord of the Fallen", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p>Isus can control up to four Shadow Revenants at a time. They take their turns immediately after his, obey his telepathic commands (no action required), and are destroyed if he dies. They are his honor guard, not his weapon: he fights his own battles.</p>"),

      feat("Legendary Resistance (4/Day, or 5/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Isus fails a saving throw, he can choose to succeed instead. Divine tier = 4 uses. In his lair he has 5 uses instead of 4 (set the maximum to 5 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Dread Smite", "icons/magic/unholy/hand-weapon-glow-black-green.webp",
        "<p>Once on each of Isus's turns, immediately after he hits a creature with Ruin Blade, he can deal an extra 13 (3d8) Necrotic damage to it.</p>",
        { activities: [act("damage", {
          activation: activation("special", { condition: "Once on his turn, after a Ruin Blade hit" }),
          damage: { parts: [{ number: 3, denomination: 8, bonus: "", types: ["necrotic"] }] }
        })] }),

      feat("Monarch's Ruin (1/Day)", "icons/magic/unholy/beam-ringed-impact-purple.webp",
        "<p>Once per day on his turn, immediately after Isus hits a creature with Ruin Blade, he can deal an extra 44 (8d10) Necrotic damage to it. This can stack with Dread Smite. The target makes a DC 20 Constitution saving throw.</p>"
        + "<p><em>Failure:</em> The target's Hit Point maximum is reduced by an amount equal to the Necrotic damage it took from this smite, and it has the Frightened condition until the end of its next turn. The reduction lasts until it finishes a Long Rest.</p>"
        + "<p>A creature killed by this damage rises at the start of Isus's next turn as a Shadow Revenant under his control.</p>",
        {
          uses: DAILY(1),
          effects: [frightenedRuin],
          activities: [
            act("damage", {
              activation: activation("special", { condition: "Once per day, after a Ruin Blade hit" }),
              consumption: { spellSlot: true, targets: [USE_ITEM] },
              damage: { parts: [{ number: 8, denomination: 10, bonus: "", types: ["necrotic"] }] }
            }),
            act("save", {
              activation: activation("special"),
              save: { ability: ["con"], dc: { calculation: "cha", formula: "" } },
              damage: { onSave: "none", parts: [] },
              effects: [{ _id: frightenedRuin._id, onSave: false }]
            })
          ]
        }),

      // ---- Actions ----
      feat("Multiattack", "icons/skills/melee/strike-sword-dagger-runes-yellow.webp",
        "<p>Isus makes three Ruin Blade attacks. He can replace one of them with Shield Bash, and he can move between the attacks. Casting a spell takes his whole action instead of Multiattack.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      (() => {
        const a = act("attack", {
          activation: activation("action"),
          attack: { ability: "str", bonus: "", flat: false, type: { value: "", classification: "" } },
          damage: { includeBase: true, parts: [{ number: 1, denomination: 8, bonus: "", types: ["necrotic"] }] }
        });
        return {
          name: "Ruin Blade",
          type: "weapon",
          img: "icons/weapons/swords/sword-guard-worn-purple.webp",
          system: {
            type: { value: "martialM", baseItem: "longsword" },
            quantity: 1, equipped: true, proficient: 1, identified: true,
            properties: ["mgc"],
            range: { value: null, long: null, reach: null, units: "ft" },
            damage: { base: { number: 2, denomination: 8, bonus: "", types: ["slashing"] } },
            description: { value: "<p><em>Melee Attack Roll:</em> +13, reach 5 ft. <em>Hit:</em> 22 (2d8 + 13) Slashing damage plus 4 (1d8) Necrotic damage. (Includes Aura of Hate.)</p>" },
            activities: { [a._id]: { sort: 100000, ...a } }
          }
        };
      })(),

      feat("Shield Bash", "icons/magic/defensive/shield-barrier-deflect-teal.webp",
        "<p><em>Melee Attack Roll:</em> +13, reach 5 ft. <em>Hit:</em> 16 (1d6 + 13) Bludgeoning damage (includes Aura of Hate). If the target is Large or smaller, it must succeed on a DC 21 Strength saving throw or be pushed up to 10 feet straight away from Isus and have the Prone condition.</p>",
        {
          effects: [proneBash],
          activities: [
            act("attack", {
              activation: activation("action"),
              range: { override: true, value: "5", units: "ft" },
              target: { override: true, affects: { count: "1", type: "creature" } },
              attack: { ability: "str", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
              damage: { includeBase: false, parts: [{ number: 1, denomination: 6, bonus: "@mod", types: ["bludgeoning"] }] }
            }),
            act("save", {
              activation: activation("special", { condition: "On a Shield Bash hit" }),
              save: { ability: ["str"], dc: { calculation: "str", formula: "" } },
              damage: { onSave: "none", parts: [] },
              effects: [{ _id: proneBash._id, onSave: false }]
            })
          ]
        }),

      feat("Spellcasting", "icons/magic/unholy/silhouette-robe-evil-power.webp",
        "<p>Isus is a CR 19 Boss spellcaster (NPC slot rule: CR 19, Hybrid). His spellcasting ability is Charisma (spell save DC 20, +12 to hit with spell attacks). He uses Ruin Blade as his holy symbol, so he can cast with sword and shield in hand.</p>"
        + "<p>Casting a spell takes his whole action (it can't replace an attack in Multiattack). He knows no smite spells: Dread Smite and Monarch's Ruin are what his broken oath left him.</p>"
        + "<p><strong>Prepared Paladin spells:</strong></p>"
        + spellBlock),

      feat("Domain: Shadow That Swallows the World (1/Day)", "icons/magic/unholy/silhouette-robe-evil-glow.webp",
        "<p><strong>Divine Domain — เงาทมิฬกลืนโลก.</strong> Isus opens his Domain, the expression of his Definition: the oath is gone, and the darkness he took in its place spreads over everything. Shadow floods the whole scene (no range: the Domain covers the entire scene). It lasts 1 minute, until he has the Incapacitated condition, or until he ends it (no action required). It doesn't require Concentration.</p>"
        + "<p>Each creature Isus chooses in the scene (chosen when the Domain opens; he can add more at the start of each of his turns) takes Necrotic damage at the end of each of its turns. The damage grows every round the Domain stays open: <strong>1d4 in the first round, 2d4 in the second, 3d4 in the third</strong>, and so on, up to 10d4 in the tenth round.</p>"
        + "<p><em>Foundry:</em> Use the <strong>Devouring Dark</strong> item. Press <em>Next Round</em> once when the Domain opens and once at the start of each of Isus's later turns, then roll <em>Shadow Damage</em> at the end of each chosen creature's turn. The dice go up on their own.</p>",
        {
          uses: DAILY(1),
          activities: [act("utility", {
            activation: activation("action"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, value: "", units: "spec", special: "The whole scene" },
            target: { override: true, affects: { type: "creature", choice: true } },
            duration: { override: true, value: "1", units: "minute", concentration: false }
          })]
        }),

      // ---- Bonus Actions ----
      feat("Rise, Revenants (Recharge 6)", "icons/creatures/magical/spirit-undead-ghost-purple.webp",
        "<p>Isus drives his blade into his own shadow. Two Shadow Revenants rise in unoccupied spaces within 30 feet of him. They take their turns immediately after Isus. Isus can control no more than four at a time.</p>",
        { uses: RECHARGE(6), activities: [summonActivity(2, "bonus", { consume: true })] }),

      feat("Dreadful Aspect (Recharge 5–6)", "icons/magic/control/fear-fright-white.webp",
        "<p>Each creature of Isus's choice within 30 feet of him makes a DC 20 Wisdom saving throw. <em>Failure:</em> The target has the Frightened condition for 1 minute. It repeats the save at the end of each of its turns, ending the effect on itself on a success.</p>",
        {
          uses: RECHARGE(5),
          effects: [frightenedAspect],
          activities: [act("save", {
            activation: activation("bonus"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, units: "self" },
            target: { override: true, template: { type: "radius", size: "30", units: "ft" }, affects: { type: "creature", choice: true } },
            save: { ability: ["wis"], dc: { calculation: "cha", formula: "" } },
            damage: { onSave: "none", parts: [] },
            effects: [{ _id: frightenedAspect._id, onSave: false }]
          })]
        }),

      // ---- Reactions ----
      feat("Aegis Parry", "icons/magic/defensive/shield-barrier-blue.webp",
        "<p><em>Trigger:</em> A creature Isus can see hits him with an attack roll. <em>Response:</em> Isus adds 4 to his AC against that attack, possibly causing it to miss. If it misses and the attacker is within 5 feet, Isus can make one Shield Bash against it.</p>",
        { activities: [act("utility", { activation: activation("reaction", { condition: "Hit by an attack roll" }) })] }),

      feat("Rise From Ruin", "icons/magic/unholy/silhouette-robe-evil-glow.webp",
        "<p><em>Trigger:</em> A Humanoid Isus can see within 60 feet of him dies. <em>Response:</em> Its body dissolves into shadow and rises as a Shadow Revenant under Isus's control in the space where it died.</p>",
        { activities: [summonActivity(1, "reaction", { range: "60", activation: { condition: "A Humanoid within 60 feet dies" } })] }),

      // ---- Legendary Actions (5 uses, Divine tier, regained at the start of his turn) ----
      feat("Ruin Strike (Costs 2 Actions)", "icons/weapons/swords/sword-guard-worn-purple.webp",
        "<p>Isus makes one Ruin Blade attack. He can use only one attack legendary action (Ruin Strike or Iron Bash) per round.</p>",
        { activities: [act("attack", {
          activation: { type: "legendary", value: 2, override: false, condition: "One attack legendary action per round" },
          consumption: { spellSlot: true, targets: [LEGACT2] },
          range: { override: true, value: "5", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "str", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
          damage: { includeBase: false, parts: [
            { number: 2, denomination: 8, bonus: "@mod", types: ["slashing"] },
            { number: 1, denomination: 8, bonus: "", types: ["necrotic"] }
          ] }
        })] }),

      feat("Iron Bash", "icons/magic/defensive/shield-barrier-deflect-teal.webp",
        "<p>Isus makes one Shield Bash attack. He can use only one attack legendary action (Ruin Strike or Iron Bash) per round.</p>",
        { activities: [act("utility", {
          activation: activation("legendary", { condition: "One attack legendary action per round" }),
          consumption: { spellSlot: true, targets: [LEGACT] }
        })] }),

      feat("Iron Rush", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>Isus moves up to his Speed without provoking Opportunity Attacks.</p>",
        { activities: [act("utility", { activation: activation("legendary"), consumption: { spellSlot: true, targets: [LEGACT] } })] }),

      feat("Shadow Swap", "icons/magic/movement/portal-vortex-orange.webp",
        "<p>Isus swaps places with one of his Shadow Revenants that he can see within 120 feet of him.</p>",
        { activities: [act("utility", { activation: activation("legendary"), consumption: { spellSlot: true, targets: [LEGACT] }, range: { override: true, value: "120", units: "ft" } })] }),

      feat("Command the Fallen", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p>One Shadow Revenant moves up to half its Speed and makes one Shadow Blade attack.</p>",
        { activities: [act("utility", { activation: activation("legendary"), consumption: { spellSlot: true, targets: [LEGACT] } })] })
    ];

    // Domain damage tracker: uses spent = the Domain's current round (1–10), reset each day.
    const tickId = rid(), dmgId = rid();
    isusItems.push({
      name: "Devouring Dark (Domain Tracker)",
      type: "feat",
      img: "icons/magic/unholy/orb-glowing-purple.webp",
      system: {
        type: { value: "monster", subtype: "" },
        description: { value: "<p>Round tracker for <strong>เงาทมิฬกลืนโลก</strong>. <em>Next Round</em> spends 1 use (uses spent = the Domain's current round). <em>Shadow Damage</em> rolls (spent)d4 Necrotic: 1d4 in round 1, 2d4 in round 2, up to 10d4. Uses reset each day; reset them by hand if the Domain opens again on the same day.</p>" },
        uses: { spent: 0, max: "10", recovery: [{ period: "day", type: "recoverAll" }] },
        activities: {
          [tickId]: { _id: tickId, type: "utility", name: "Next Round", sort: 100000,
            activation: activation("special", { condition: "When the Domain opens, then at the start of each of Isus's turns" }),
            consumption: { spellSlot: true, targets: [USE_ITEM] } },
          [dmgId]: { _id: dmgId, type: "damage", name: "Shadow Damage", sort: 200000,
            activation: activation("special", { condition: "End of each chosen creature's turn" }),
            consumption: { spellSlot: true, targets: [] },
            damage: { parts: [{ number: null, denomination: null, bonus: "", types: ["necrotic"], custom: { enabled: true, formula: "(@item.uses.spent)d4" } }] } }
        }
      }
    });

    const biography = "<h2>Isus, the Oathless Monarch</h2>"
      + "<p>A paladin who broke his oath and took something darker in its place. He fights in full plate and shield yet moves like a duelist, and every swing of Ruin Blade lands like a falling wall. The dead rise from his shadow, but they are only his honor guard: Isus fights his own battles.</p>"
      + "<p><strong>Tier of Being:</strong> Divine. Definition: <em>\"an oath I broke is a crown no one can take back.\"</em></p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Round 1:</strong> He wins Initiative (Advantage), runs 40 ft into the party's front line and opens <strong>เงาทมิฬกลืนโลก</strong> on everyone. Dreadful Aspect as his bonus action.</li>"
      + "<li><strong>Every turn after:</strong> Multiattack, moving between swings, with Dread Smite on the first hit. Shield Bash knocks the toughest melee PC Prone so the next swings land with Advantage.</li>"
      + "<li><strong>Monarch's Ruin:</strong> Saved for the healer or the caster. Anyone it kills gets back up on his side.</li>"
      + "<li><strong>Revenants:</strong> A bonus action when it recharges, used to body-block healers and archers. He never spends his action on them.</li>"
      + "<li><strong>Legendary:</strong> Ruin Strike on the most hurt target, Iron Rush to chase a fleeing caster, Shadow Swap out of a bad spot.</li>"
      + "<li><strong>Spells (whole action):</strong> <em>Compelled duel</em> or <em>command</em> (\"Kneel\") on whoever runs; <em>darkness</em> to split the party; <em>banishment</em> or <em>dominate person</em> on the party's strongest; <em>destructive wave</em> when three or more PCs crowd him; <em>dispel magic</em> on the buff that's keeping them alive.</li>"
      + "<li><strong>Domain:</strong> The longer the fight lasts, the more it hurts (round 5 = 5d4 per creature, round 10 = 10d4). Once it is open he plays for time with Aegis Parry, Iron Rush and revenant walls.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>The Domain rewards burst: spend everything early, because the damage only grows. Incapacitating Isus ends it.</li>"
      + "<li>He has no ranged attack. Flying keeps him out of reach, but ground kiting fails against 40 ft of speed that ignores Difficult Terrain.</li>"
      + "<li>Revenants have only 45 HP and AC 16, and Radiant damage or Critical Hits ignore Undying Loyalty. Killing Isus destroys every revenant at once.</li>"
      + "<li>Legendary Resistance (4/Day) is the wall. Burn it with cheap DEX or INT save effects first.</li></ul>"
      + "<h3>CR Check</h3>"
      + "<p>Defense ≈ CR 19 (AC 21, 294 HP, Aegis Parry, Necrotic resistance, Legendary Resistance 4/Day). Offense ≈ CR 20 (best 3 rounds average ~145 damage per round at +13 to hit, DC 20–21: Multiattack 3 × 26.5 = 80 + Dread Smite 13 + Ruin Strike 26.5 = ~120, plus Monarch's Ruin 44 once (~15 per round) and the Domain on 2 targets over rounds 1–3 (~10 per round)). Average ≈ CR 19–20. Revenants add a little on top; with four out, treat the fight as CR 20. "
      + "Spells don't raise offense: they take his whole action, and his best spell round (<em>destructive wave</em> 35 on 2 targets = 70 + legendary Ruin Strike) is below a Multiattack round. They give him control (<em>command</em>, <em>banishment</em>, <em>dominate person</em>) instead of damage.</p>";

    const isusSystem = {
      abilities: {
        str: { value: 24, proficient: 1 }, dex: { value: 18, proficient: 1 }, con: { value: 22, proficient: 1 },
        int: { value: 14, proficient: 0 }, wis: { value: 16, proficient: 1 }, cha: { value: 22, proficient: 1 },
        hon: { value: 8, proficient: 0 }, san: { value: 16, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 21 },
        hp: { value: 294, max: 294, temp: 0, tempmax: 0, formula: "28d8 + 168" },
        init: { ability: "", bonus: "" },
        movement: { ...EMPTY_MOVEMENT, walk: "40" },
        senses: { ranges: { darkvision: 120, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" },
        spellcasting: "cha",
        spell: { level: 19 }
      },
      spells: Object.fromEntries(Array.from({ length: 9 }, (_, i) => {
        const key = `spell${i + 1}`;
        const max = SLOTS[key] ?? 0;
        return [key, { value: max, override: max }];
      })),
      details: {
        cr: 19,
        alignment: "Neutral Evil",
        type: { value: "humanoid", subtype: "Paladin", swarm: "", custom: "" },
        habitat: { value: [{ type: "any" }], custom: "Battlefields, Ruins" },
        treasure: { value: ["armaments", "relics"] },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 5, spent: 0 },   // Divine tier = 5
        legres: { max: 4, spent: 0 },   // Divine tier = 4
        lair: { value: false }
      },
      skills: {
        acr: { value: 1 },   // +10
        ath: { value: 1 },   // +13
        itm: { value: 2 },   // Expertise: +18
        prc: { value: 1 },   // +9 (Passive 19)
        rel: { value: 1 }    // +8
      },
      traits: {
        size: "med",
        di: { value: [] },
        dr: { value: ["necrotic"] },
        dv: { value: [] },
        ci: { value: ["charmed", "frightened"] },
        languages: { value: ["common", "abyssal", "infernal"], custom: "", communication: { telepathy: { value: 120, units: "ft" } } }
      }
    };

    await wipe(isus);
    await isus.update({
      system: isusSystem,
      "prototypeToken.actorLink": true,
      "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.HOSTILE
    });
    for ( const spell of SPELLS ) {
      try { isusItems.push(await buildSpell(spell)); }
      catch ( err ) { console.error(`Isus macro | Failed to build spell "${spell.name}"`, err); failed.push(spell.name); }
    }
    await addItems(isus, isusItems, failed);

    isus.sheet.render(true);
    ui.notifications.info(`${isus.name} rebuilt (${isusItems.length} features) and "${REVENANT_NAME}" is ready to summon.`);
    if ( missingSpells.length ) ui.notifications.warn(`Spells not found (placeholders made): ${missingSpells.join(", ")}`, { permanent: true });
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Isus macro | ", err);
    ui.notifications.error(`Isus macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
