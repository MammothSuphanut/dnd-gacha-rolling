/**
 * Nebula Orion, the Яe-birth — CR 3 fallen Circle of the Stars druid, Mortal tier, two phases
 * Tuned for: 4 level-3 PCs (+1 beast companion). Built per Core-Rules/NPC-Design-system.md (CR 3 = fair boss for 4 level-3 PCs).
 * For Foundry VTT v14 + D&D 5e system 5.x / 6.x (+ midi-qol for the one-click summon chain)
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - Nebula: rebuilds the sheet. KEEPS portrait, token, the Starry Shot weapon, and The Fragment of
 *     Wisdom (untouched). All old spells are deleted and the SPELLS list below is added fresh
 *     (2024 compendium → world Items, e.g. Plutonium imports → other compendiums → placeholder).
 *     Dragon Claw is renamed to Frog Slam (keeps its animation). Every other item is replaced.
 *   - Creates (or rebuilds) world NPCs "Frog Arm" and "Frog Leg" in Nebula's folder.
 *   - "Shattered Constellation" summons 2 Frog Arms → 2 Frog Legs → Stalin chan in one click (midi-qol
 *     chain). Each step is also its own button on the same feature, in case the chain misbehaves.
 *   - Stalin chan The Яe-birth is used as-is (only items an earlier version of this macro added are removed).
 *   - MAKE_BACKUP = true copies Nebula as "<name> (backup)" first. Safe to run again.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const NEBULA_NAME = "Nebula Orion The Яe-birth";
  const FLY_NAME = "Stalin chan The Яe-birth";
  const ARM_NAME = "Frog Arm";
  const LEG_NAME = "Frog Leg";
  const MAKE_BACKUP = true;

  // Circle of the Stars druid. NPC slot rule (Core-Rules/NPC-Design-system.md): CR 3 row, Full caster = 3 / 3.
  // always: Star Map spells (always prepared).
  const SLOTS = { spell1: 3, spell2: 3 };
  const SPELLS = [
    // Cantrips
    { name: "Guidance", level: 0, always: true },
    { name: "Starry Wisp", level: 0 },
    { name: "Produce Flame", level: 0 },
    { name: "Druidcraft", level: 0 },
    // 1st
    { name: "Guiding Bolt", level: 1, always: true },
    { name: "Thunderwave", level: 1 },
    { name: "Faerie Fire", level: 1 },
    { name: "Entangle", level: 1 },
    { name: "Healing Word", level: 1 },
    // 2nd
    { name: "Spike Growth", level: 2 },
    { name: "Hold Person", level: 2 },
    { name: "Gust of Wind", level: 2 }
  ];

  // Party size this fight is tuned for (4 = as designed). Run again after changing it.
  const PARTY_SIZE = 4;
  const SCALE = {
    // CR 3. Body/limb HP already offset Legendary Resistance 2/Day (CR 1–4 = +10 effective HP each).
    // Body raised to the top of the CR 3 band (effective HP ~111 at 4 PCs).
    4: { body: 40,  bodyFormula: "7d8 + 8",   limb: 9 },
    5: { body: 50,  bodyFormula: "9d8 + 10",  limb: 11 },
    6: { body: 60,  bodyFormula: "11d8 + 10", limb: 13 },
    7: { body: 70,  bodyFormula: "13d8 + 12", limb: 15 }
  }[PARTY_SIZE] ?? { body: 40, bodyFormula: "7d8 + 8", limb: 9 };

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const nebula = game.actors.find(a => (a.type === "npc") && (a.name === NEBULA_NAME));
    const fly = game.actors.find(a => (a.type === "npc") && (a.name === FLY_NAME));
    if ( !nebula ) return ui.notifications.error(`Couldn't find an NPC named "${NEBULA_NAME}".`);
    if ( !fly ) return ui.notifications.error(`Couldn't find an NPC named "${FLY_NAME}".`);

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const OVERRIDE = CONST.ACTIVE_EFFECT_MODES?.OVERRIDE ?? 5;
    const LEGACT = { type: "attribute", target: "resources.legact.value", value: "1" };
    const USE_ITEM = { type: "itemUses", target: "", value: "1" };
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
    const failed = [];

    async function addItems(actor, items) {
      for ( const data of items ) {
        try { await actor.createEmbeddedDocuments("Item", [data]); }
        catch ( err ) { console.error(`Nebula macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(`${data.name} (${actor.name})`); }
      }
    }

    async function wipeExcept(actor, keepNames) {
      const ids = actor.items.filter(i => !keepNames.includes(i.name)).map(i => i.id);
      if ( ids.length ) await actor.deleteEmbeddedDocuments("Item", ids);
      const effectIds = actor.effects.map(e => e.id);
      if ( effectIds.length ) await actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);
    }

    // Updates every activity of one type on an item with the same partial data.
    const activityPatch = (item, type, data) => Object.fromEntries(
      [...(item.system.activities ?? [])].filter(a => a.type === type).map(a => [`system.activities.${a.id}`, data])
    );

    if ( MAKE_BACKUP ) {
      const data = nebula.toObject();
      delete data._id;
      data.name = `${nebula.name} (backup)`;
      await Actor.implementation.create(data);
    }

    /* ================================================================== */
    /*  1. Frog Arm / Frog Leg (summons)                                  */
    /* ================================================================== */
    const limbSystem = (kind) => ({
      abilities: {
        str: { value: 16, proficient: 0 }, dex: { value: 10, proficient: 0 }, con: { value: 14, proficient: 0 },
        int: { value: 1, proficient: 0 }, wis: { value: 10, proficient: 0 }, cha: { value: 1, proficient: 0 },
        hon: { value: 10, proficient: 0 }, san: { value: 10, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 13 },
        hp: { value: SCALE.limb, max: SCALE.limb, formula: "" },
        movement: { walk: "0", burrow: "", climb: "", fly: "", swim: "", units: "ft", hover: false },
        senses: { ranges: { darkvision: null, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" }
      },
      details: {
        cr: 0,
        alignment: "Unaligned",
        type: { value: "monstrosity", subtype: "", swarm: "", custom: "" },
        biography: { value: `<p>A giant frog ${kind} of starlit flesh, grown out of Nebula's broken mind and bound to his body. `
          + "It has no turn and no actions of its own: Nebula uses it on his turn. When it drops to 0 Hit Points it is severed and fades. "
          + "Press <em>Limb Severed</em> on Nebula's <strong>Limb Bond</strong> when that happens.</p><p><em>Grants no XP.</em></p>" }
      },
      traits: {
        size: "lg",
        ci: { value: ["charmed", "frightened", "prone", "unconscious"] },
        languages: { value: [], custom: "" }
      }
    });

    const limbItems = (kind) => [
      feat("Bound Limb", "icons/magic/control/silhouette-hold-change-blue.webp",
        `<p>The ${kind} is fused to Nebula. It stays in a space touching him and moves when he moves (the GM drags it along). `
        + "It has no turn; Nebula uses it during his turn. If Nebula dies, it fades.</p>")
    ];

    async function upsertLimb(name, kind, img) {
      const tokenData = {
        name,
        actorLink: false,
        appendNumber: true,
        disposition: CONST.TOKEN_DISPOSITIONS.HOSTILE,
        displayName: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
        displayBars: CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
        bar1: { attribute: "attributes.hp" }
      };
      let actor = game.actors.find(a => (a.type === "npc") && (a.name === name));
      if ( actor ) {
        await wipeExcept(actor, []);
        await actor.update({ img, system: limbSystem(kind), prototypeToken: { ...tokenData, texture: { src: img } } });
      } else {
        actor = await Actor.implementation.create({
          name, type: "npc", img,
          folder: nebula.folder?.id ?? null,
          system: limbSystem(kind),
          prototypeToken: { ...tokenData, texture: { src: img } }
        });
      }
      await addItems(actor, limbItems(kind));
      return actor;
    }

    const arm = await upsertLimb(ARM_NAME, "arm", "icons/commodities/biological/foot-amphibian-green.webp");
    const leg = await upsertLimb(LEG_NAME, "leg", "icons/consumables/meat/frog-leg-raw-green.webp");

    // Stalin chan stays as you built it; only drop the items an earlier version of this macro added.
    const oldFlyItems = fly.items.filter(i => ["Bound Star", "Talons"].includes(i.name)).map(i => i.id);
    if ( oldFlyItems.length ) await fly.deleteEmbeddedDocuments("Item", oldFlyItems);

    /* ================================================================== */
    /*  2. Nebula — keep / patch existing items                           */
    /* ================================================================== */
    const clawItem = nebula.items.find(i => (i.name === "Dragon Claw") || (i.name === "Frog Slam"));
    // Old spells are wiped too; the SPELLS list is rebuilt fresh in section 4.
    await wipeExcept(nebula, ["Starry Shot", "The Fragment of Wisdom", clawItem?.name].filter(Boolean));

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
        data = { name, type: "spell", img: "icons/magic/light/explosion-star-glow-silhouette.webp",
          system: { level, description: { value: `<p>Placeholder: "${name}" wasn't found in a compendium or the world's Items. Import it (e.g. with Plutonium) and run the macro again.</p>` }, activities: {} } };
      }
      delete data._id;
      if ( data.system.preparation ) data.system.preparation = { mode: always ? "always" : "prepared", prepared: true };
      else { data.system.method = "spell"; data.system.prepared = always ? 2 : 1; }
      return data;
    }

    const starry = nebula.items.find(i => i.name === "Starry Shot");
    if ( starry ) await starry.update({
      "system.equipped": true,
      "system.proficient": 1,
      "system.range": { value: 60, long: 120, reach: null, units: "ft" },
      "system.damage.base": { number: 1, denomination: 6, bonus: "", types: ["radiant"] },
      "system.description.value": "<p><em>Ranged Attack Roll:</em> +5, range 60/120 ft. <em>Hit:</em> 6 (1d6 + 3) Radiant damage.</p>",
      ...activityPatch(starry, "attack", { "attack.ability": "wis", "activation.type": "action" })
    });
    else failed.push("Starry Shot weapon not found");

    const slamData = {
      "name": "Frog Slam",
      "system.equipped": true,
      "system.proficient": 1,
      "system.range": { value: null, long: null, reach: 10, units: "ft" },
      "system.damage.base": { number: 1, denomination: 8, bonus: "", types: ["bludgeoning"] },
      "system.description.value": "<p><em>Phase 1, needs a Frog Arm.</em> <em>Melee Attack Roll:</em> +5, reach 10 ft. <em>Hit:</em> 7 (1d8 + 3) Bludgeoning damage.</p>"
    };
    if ( clawItem ) await clawItem.update({ ...slamData, ...activityPatch(clawItem, "attack", { "attack.ability": "wis", "activation.type": "action" }) });
    else {
      const a = act("attack", { activation: activation("action"), attack: { ability: "wis", bonus: "", flat: false, type: { value: "", classification: "" } }, damage: { includeBase: true, parts: [] } });
      await addItems(nebula, [{
        name: "Frog Slam", type: "weapon", img: "icons/commodities/biological/foot-amphibian-green.webp",
        system: {
          type: { value: "natural", baseItem: "" }, quantity: 1, equipped: true, proficient: 1, identified: true,
          range: { value: null, long: null, reach: 10, units: "ft" },
          damage: { base: { number: 1, denomination: 8, bonus: "", types: ["bludgeoning"] } },
          description: { value: slamData["system.description.value"] },
          activities: { [a._id]: { sort: 100000, ...a } }
        }
      }]);
    }

    /* ================================================================== */
    /*  3. Nebula — actor stats                                           */
    /* ================================================================== */
    const L = SCALE.limb;
    const biography = "<h2>Nebula Orion, the Яe-birth</h2>"
      + "<p>A Circle of the Stars druid whose mind has shattered. When the party meets him he looks like an ordinary, quiet person. "
      + "The moment the fight starts, his constellation breaks open: two giant frog arms and two giant frog legs tear out of starlight and fuse to his body, and Stalin chan, his giant fly, buzzes at his shoulder.</p>"
      + "<h3>Setup</h3><ul>"
      + "<li>Roll Initiative, then use <strong>Shattered Constellation</strong>: place 2 Frog Arms, 2 Frog Legs (touching Nebula) and Stalin chan.</li>"
      + "<li>Arms, legs and Stalin chan all act on <strong>Nebula's turn</strong>. They are never in the turn order.</li>"
      + "<li>Each time a limb drops to 0 HP, press <strong>Limb Severed</strong> on Limb Bond (it counts the limbs left).</li></ul>"
      + "<h3>Phase 1 — while any limb remains</h3><ul>"
      + "<li><strong>Can't drop below 1 HP.</strong> Damage to his body still counts and carries into phase 2.</li>"
      + "<li>Start of his turn: regains <strong>3 HP per limb left</strong> (Limb Bond → Regrow).</li>"
      + "<li>Arms: Frog Slam reaches 10 ft. Multiattack = 1 Frog Slam per arm + 1 Frog Kick if any leg is left (2 Kicks if no arms).</li>"
      + "<li>Legs: Speed 60 instead of 30 (the <em>Frog Legs</em> effect). Turn it off when both legs are gone.</li>"
      + "<li>Stalin chan uses Paranoid Fly on him every turn, so his first Slam usually has Advantage.</li>"
      + "<li>Tell: \"the wound on his chest closes every time the frog limbs pulse.\" Nature or Insight DC 12 = cut the limbs first.</li></ul>"
      + "<h3>Phase 2 — all four limbs severed</h3><ul>"
      + "<li><strong>Constellation Collapse:</strong> he teleports up to 30 ft away. From now on he kites and casts.</li>"
      + "<li>Multiattack = two Starry Shots, or one Starry Shot + one 1st-level spell. A 2nd-level spell takes his whole action. Legendary Actions (3) unlock: Starry Spark, Star Step.</li>"
      + "<li>Spike Growth to wall off Thalric / N'Earth; Gust of Wind to blow melee off him; Thunderwave (2nd level as a full action, or 1st level with a Starry Shot) on anyone who reaches him; Hold Person or Entangle on the biggest hitter; Faerie Fire on hidden or invisible PCs; Guiding Bolt (2nd level) on the healer.</li>"
      + "<li>Only one Concentration spell at a time (Spike Growth / Hold Person / Entangle / Faerie Fire / Gust of Wind). Hitting him while he holds one is the party's best answer.</li></ul>"
      + "<h3>Encounter Budget</h3>"
      + "<p><strong>Project rule (NPC-Design-system):</strong> CR 3 = a fair boss fight for 4 level-3 PCs. "
      + "On the 2024 DMG XP budget (Low 600 / Moderate 900 / High 1,600) CR 3 is only 700 XP, but the limbs, Stalin chan, Legendary Actions and Legendary Resistance add no XP, so it plays around Moderate–High. "
      + "N'Earth on the party side softens it a little; Surge of Will (house rule) is the safety net.</p>"
      + "<p><strong>Other party sizes:</strong> set PARTY_SIZE at the top of the macro and run it again — body / each limb: 5 PCs 50 / 11, 6 PCs 60 / 13, 7 PCs 70 / 15.</p>"
      + "<h3>CR Check (project NPC-Design-system)</h3>"
      + `<p><strong>Defense ≈ CR 3:</strong> AC 14 (limbs 13). Effective HP = body ${SCALE.body} + limbs 4 × ${L} = ${SCALE.body + 4 * L} + regrowth over 3 rounds (~15 with fast limb loss) + Legendary Resistance 2/Day (+10 each at CR 1–4 = 20) ≈ ${SCALE.body + 4 * L + 35} (CR 3 = 101–115; AC 1 above the CR 3 norm).</p>`
      + "<p><strong>Offense ≈ CR 3–4:</strong> best 3 rounds at +5 / DC 13 — R1 phase 1: 2 Frog Slams (15) + Frog Kick (6.5) = 21.5, with Advantage on one swing from Stalin chan; "
      + "R2 phase 2: Thunderwave at 2nd level on 2 targets (27) + Starry Spark legendary (3.5) = 30.5; R3: Starry Shot (6.5) + Thunderwave at 1st level on 2 targets (18) + Starry Spark (3.5) = 28. Average ≈ 27 (CR 3 = 21–26). "
      + "Final ≈ CR 3.</p>";

    await nebula.update({
      "system.abilities.wis.value": 16,                   // +3: DC 13, +5 to hit at Prof +2
      "system.attributes.ac": { calc: "flat", flat: 14, formula: "" },
      "system.attributes.hp": { value: SCALE.body, max: SCALE.body, formula: SCALE.bodyFormula, temp: 0, tempmax: 0 },
      "system.attributes.movement.walk": "30",
      "system.attributes.movement.units": "ft",
      "system.attributes.spellcasting": "wis",
      "system.details.cr": 3,
      "system.details.spellLevel": 3,          // legacy path (older dnd5e)
      "system.attributes.spell.level": 3,      // dnd5e 5.x path, = CR per NPC-Design-system
      "system.details.type": { value: "humanoid", subtype: "Druid", swarm: "", custom: "" },
      "system.details.biography.value": biography,
      "system.resources.legact": { max: 3, spent: 0 },   // Mortal tier = 3, phase 2 only
      "system.resources.legres": { max: 2, spent: 0 },   // Mortal tier = 2
      "system.traits.dr.value": [],
      // NPC-Design-system CR 3–4 row, Full caster: 3 / 3
      "system.spells.spell1.override": 3,
      "system.spells.spell2.override": 3,
      "system.spells.spell3.override": 0,
      "system.spells.spell1.value": 3,
      "system.spells.spell2.value": 3,
      "system.spells.spell3.value": 0,
      "prototypeToken.actorLink": true
    });

    /* ================================================================== */
    /*  4. Nebula — new items                                             */
    /* ================================================================== */
    // One-click summon: Arms → (midi-qol trigger) Legs → (midi-qol trigger) Stalin chan.
    const summonAct = (name, actor, count, nextId) => ({
      _id: rid(),
      type: "summon",
      name,
      activation: activation("special", { condition: "When the fight starts (after Initiative)" }),
      consumption: { spellSlot: true, targets: [] },
      range: { override: true, value: "5", units: "ft" },
      bonuses: { ac: "", hd: "", hp: "", attackDamage: "", saveDamage: "", healing: "" },
      creatureSizes: [],
      creatureTypes: [],
      match: { ability: "", attacks: false, disposition: true, proficiency: false, saves: false },
      profiles: [{ _id: rid(), count: String(count), name: actor.name, uuid: actor.uuid, level: { min: null, max: null }, types: [] }],
      summon: { mode: "", prompt: true },
      ...(nextId ? { midiProperties: {
        triggeredActivityId: nextId,
        triggeredActivityConditionText: "",
        triggeredActivityTargets: "targets",
        triggeredActivityRollAs: "self",
        triggeredActivityConsume: true,
        triggeredActivityConfigure: false
      } } : {})
    });
    const sumFly = summonAct("Stalin chan", fly, 1, null);
    const sumLegs = summonAct("Frog Legs ×2", leg, 2, sumFly._id);
    const sumArms = summonAct("Shatter! (Arms → Legs → Stalin chan)", arm, 2, sumLegs._id);

    const frogLegsEffect = {
      _id: rid(),
      name: "Frog Legs (Speed ×2)",
      img: "icons/consumables/meat/frog-leg-raw-green.webp",
      transfer: true,
      disabled: false,
      changes: [{ key: "system.attributes.movement.walk", mode: OVERRIDE, value: "60" }],
      description: "<p>Walking Speed 60 ft while at least one Frog Leg is attached. Turn this off when both legs are severed.</p>"
    };

    const nebulaItems = [
      // ---- Traits ----
      feat("Shattered Mind", "icons/magic/perception/silhouette-stealth-shadow.webp",
        "<p>Outside combat Nebula looks and acts like an ordinary, quiet person; magic that detects creature type or alignment shows nothing unusual. "
        + "He speaks in broken fragments of star names and half-remembered prayers.</p>"),

      feat("Shattered Constellation", "icons/magic/light/explosion-star-glow-silhouette.webp",
        "<p>When the fight starts, Nebula's mind breaks open. Two <strong>Frog Arms</strong> and two <strong>Frog Legs</strong> appear in spaces touching him and fuse to his body, and <strong>Stalin chan</strong> appears within 5 feet of him.</p>"
        + "<p>The limbs and Stalin chan act on Nebula's turn and are never in the turn order.</p>"
        + "<p><em>Foundry:</em> use <strong>Shatter!</strong>. With midi-qol it summons the arms, then the legs, then Stalin chan in one go — place each when asked. "
        + "If the chain stops early, use the other two buttons on this feature.</p>",
        { activities: [sumArms, sumLegs, sumFly] }),

      feat("Limb Bond", "icons/magic/life/heart-cross-strong-flame-green.webp",
        "<p>While at least one Frog Arm or Frog Leg is attached, Nebula can't drop below 1 Hit Point, and at the start of each of his turns he regains <strong>3 Hit Points for each limb still attached</strong>.</p>"
        + "<p>When the last limb is severed, Nebula enters <strong>phase 2</strong> (see Constellation Collapse).</p>"
        + "<p><em>Foundry:</em> uses = limbs still attached. Press <strong>Limb Severed</strong> each time a limb drops to 0 HP; <strong>Regrow</strong> heals 3 × limbs left. Uses reset each day.</p>",
        { uses: { spent: 0, max: "4", recovery: [{ period: "day", type: "recoverAll" }] },
          activities: [
            act("heal", {
              name: "Regrow",
              activation: activation("special", { condition: "Start of Nebula's turn, while a limb is attached" }),
              consumption: { spellSlot: true, targets: [] },
              range: { override: true, units: "self" },
              target: { override: true, affects: { type: "self" } },
              healing: { number: null, denomination: null, bonus: "", types: ["healing"], custom: { enabled: true, formula: "3 * (4 - @item.uses.spent)" } }
            }),
            act("utility", {
              name: "Limb Severed",
              activation: activation("special", { condition: "A Frog Arm or Frog Leg drops to 0 HP" }),
              consumption: { spellSlot: true, targets: [USE_ITEM] }
            })
          ] }),

      feat("Frog Legs", "icons/consumables/meat/frog-leg-raw-green.webp",
        "<p>While at least one Frog Leg is attached, Nebula's Speed is doubled (60 feet).</p>"
        + "<p><em>Foundry:</em> the <strong>Frog Legs (Speed ×2)</strong> effect. Turn it off when both legs are severed.</p>",
        { effects: [frogLegsEffect] }),

      feat("Starsplit Mind", "icons/magic/perception/eye-ringed-glow-angry-small-teal.webp",
        "<p>Nebula has Advantage on Constitution saving throws he makes to maintain Concentration.</p>"),

      // ---- Actions ----
      feat("Multiattack", "icons/skills/melee/strike-sword-dagger-runes-yellow.webp",
        "<p><strong>Phase 1:</strong> Nebula makes one Frog Slam for each Frog Arm still attached, and one Frog Kick if at least one Frog Leg is attached. If no arms are left, he makes two Frog Kicks instead.</p>"
        + "<p><strong>Phase 2:</strong> Nebula makes two Starry Shot attacks, or one Starry Shot attack and casts a cantrip or 1st-level spell. A spell cast with a 2nd-level slot takes his whole action instead.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      feat("Frog Kick", "icons/consumables/meat/frog-leg-raw-green.webp",
        "<p><em>Phase 1, needs a Frog Leg.</em> <em>Melee Attack Roll:</em> +5, reach 5 ft. <em>Hit:</em> 6 (1d6 + 3) Bludgeoning damage, and the target is pushed up to 5 feet away.</p>",
        { activities: [act("attack", {
          activation: activation("action"),
          range: { override: true, value: "5", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "wis", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
          damage: { includeBase: false, parts: [{ number: 1, denomination: 6, bonus: "@mod", types: ["bludgeoning"] }] }
        })] }),

      // ---- Reactions / phase change ----
      feat("Constellation Collapse", "icons/magic/movement/portal-vortex-orange.webp",
        "<p><em>Trigger:</em> Nebula's last Frog Arm or Frog Leg is severed. <em>Response:</em> He teleports up to 30 feet to an unoccupied space he can see. "
        + "<strong>Phase 2 begins:</strong> Speed 30, new Multiattack, Legendary Actions unlock.</p>",
        { activities: [act("utility", {
          activation: activation("reaction", { condition: "Last limb severed" }),
          range: { override: true, value: "30", units: "ft" }
        })] }),

      // ---- Legendary Resistance (Mortal tier = 2) ----
      feat("Legendary Resistance (2/Day, or 3/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Nebula fails a saving throw, he can choose to succeed instead. Mortal tier = 2 uses, in both phases. In his lair he has 3 uses instead of 2 (set the maximum to 3 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      // ---- Legendary Actions (3, phase 2 only, regained at the start of his turn) ----
      feat("Legendary: Starry Spark", "icons/magic/light/projectile-beam-yellow.webp",
        "<p><strong>Legendary Action (phase 2).</strong> <em>Ranged Attack Roll:</em> +5, range 60/120 ft. <em>Hit:</em> 3 (1d6) Radiant damage. Once per round.</p>",
        { activities: [act("attack", {
          activation: activation("legendary", { condition: "Phase 2, once per round" }),
          consumption: { spellSlot: true, targets: [LEGACT] },
          range: { override: true, value: "60", long: "120", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "wis", bonus: "", flat: false, type: { value: "ranged", classification: "weapon" } },
          damage: { includeBase: false, parts: [{ number: 1, denomination: 6, bonus: "", types: ["radiant"] }] }
        })] }),

      feat("Legendary: Star Step", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p><strong>Legendary Action (phase 2).</strong> Nebula moves up to his Speed without provoking Opportunity Attacks.</p>",
        { activities: [act("utility", {
          activation: activation("legendary", { condition: "Phase 2" }),
          consumption: { spellSlot: true, targets: [LEGACT] }
        })] })
    ];

    for ( const spell of SPELLS ) {
      try { nebulaItems.push(await buildSpell(spell)); }
      catch ( err ) { console.error(`Nebula macro | Failed to build spell "${spell.name}"`, err); failed.push(spell.name); }
    }

    await addItems(nebula, nebulaItems);

    nebula.sheet.render(true);
    ui.notifications.info(`${nebula.name} rebuilt (party size ${PARTY_SIZE}); "${ARM_NAME}" and "${LEG_NAME}" are ready to summon.`);
    if ( missingSpells.length ) ui.notifications.warn(`Spells not found (placeholders made): ${missingSpells.join(", ")}`, { permanent: true });
    if ( failed.length ) ui.notifications.warn(`Check these: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Nebula macro | ", err);
    ui.notifications.error(`Nebula macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
