/**
 * Buyer, the Man of Many Faces — CR 12 Shapeshifter Wizard/Rogue, Ascendant tier, legendary boss
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Buyer" (all items and effects) and rebuilds it
 *     as a CR 12 shapeshifting Wizard/Rogue. Portrait, token and folder are kept.
 *   - Spells are copied from the system's spell compendium (2024 version preferred) as real,
 *     castable spells, grouped by spell level. Missing spells become placeholders.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Buyer";
  const MAKE_BACKUP = false;   // true = copy "Buyer (backup)" before wiping
  const DC = "17";             // flat DC for his features (= his spell save DC)

  // Wizard spellcasting (Intelligence, DC 17, +9 to hit).
  // NPC slot rule (Core-Rules/NPC-Design-system.md): CR 12 row, Hybrid (Wizard + Rogue, max 5th).
  const SLOTS = { spell1: 5, spell2: 5, spell3: 4, spell4: 4, spell5: 3 };
  // method: "spell" = uses slots, "atwill" / "innate" = signature spells outside slots.
  // perDay: daily uses for innate spells. always: always prepared.
  const SPELLS = [
    // Signature (outside slots)
    { name: "Disguise Self", level: 1, method: "atwill" },
    { name: "Alter Self", level: 2, method: "atwill" },
    { name: "Misty Step", level: 2, method: "innate", perDay: 3 },
    // Cantrips
    { name: "Fire Bolt", level: 0, method: "spell" },
    { name: "Minor Illusion", level: 0, method: "spell" },
    { name: "Mage Hand", level: 0, method: "spell" },
    { name: "Message", level: 0, method: "spell" },
    // 1st
    { name: "Shield", level: 1, method: "spell", always: true },
    { name: "Mage Armor", level: 1, method: "spell" },
    { name: "Magic Missile", level: 1, method: "spell" },
    { name: "Silent Image", level: 1, method: "spell" },
    // 2nd
    { name: "Invisibility", level: 2, method: "spell" },
    { name: "Mirror Image", level: 2, method: "spell" },
    { name: "Suggestion", level: 2, method: "spell" },
    // 3rd
    { name: "Counterspell", level: 3, method: "spell", always: true },
    { name: "Fireball", level: 3, method: "spell" },
    { name: "Fly", level: 3, method: "spell" },
    { name: "Major Image", level: 3, method: "spell" },
    // 4th
    { name: "Polymorph", level: 4, method: "spell" },
    { name: "Greater Invisibility", level: 4, method: "spell" },
    { name: "Dimension Door", level: 4, method: "spell" },
    // 5th
    { name: "Cone of Cold", level: 5, method: "spell" },
    { name: "Seeming", level: 5, method: "spell" },
    { name: "Mislead", level: 5, method: "spell" }
  ];

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const buyer = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !buyer ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

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
        catch ( err ) { console.error(`Buyer macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(data.name); }
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
    async function buildSpell({ name, level, method, perDay = 0, always = false }) {
      let data = await findSpell(name);
      if ( !data ) {
        missingSpells.push(name);
        data = { name, type: "spell", img: "icons/magic/control/hypnosis-mesmerism-swirl.webp",
          system: { level, description: { value: `<p>Placeholder: "${name}" wasn't found in a compendium. Replace it with the real spell.</p>` }, activities: {} } };
      }
      delete data._id;
      const mode = always ? "always" : (method === "spell" ? "prepared" : method);
      if ( data.system.preparation ) data.system.preparation = { mode, prepared: true };
      else { data.system.method = method; data.system.prepared = always ? 2 : 1; }
      // Signature spells spend their own daily uses (or nothing, at will) instead of slots.
      if ( perDay ) data.system.uses = DAILY(perDay);
      if ( method !== "spell" ) {
        for ( const a of Object.values(data.system.activities ?? {}) ) {
          a.consumption = { ...(a.consumption ?? {}), spellSlot: false, targets: perDay ? [USE_ITEM] : [] };
        }
      }
      return data;
    }

    const slotSpells = SPELLS.filter(s => s.method === "spell");
    const spellBlock = "<ul>" + Array.from({ length: 10 }, (_, lvl) => {
      const names = slotSpells.filter(s => s.level === lvl)
        .map(s => `<em>${s.name.toLowerCase()}</em>${s.always ? " (always prepared)" : ""}`).join(", ");
      if ( !names ) return "";
      const label = lvl === 0 ? "Cantrips (at will)" : `${lvl}${["st", "nd", "rd"][lvl - 1] ?? "th"} level (${SLOTS[`spell${lvl}`]} slot${SLOTS[`spell${lvl}`] > 1 ? "s" : ""})`;
      return `<li><strong>${label}:</strong> ${names}</li>`;
    }).join("") + "</ul>";

    const failed = [];

    if ( MAKE_BACKUP ) {
      const data = buyer.toObject();
      delete data._id;
      data.name = `${buyer.name} (backup)`;
      await Actor.implementation.create(data);
    }

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const buyerItems = [
      // ---- Traits ----
      feat("Ascendant Being", "icons/magic/symbols/star-solid-gold.webp",
        "<p><strong>Tier of Being: Ascendant.</strong> Buyer's body and soul are fused into a single will. He doesn't age and can't die of old age.</p>"
        + "<p><em>Tier Gap:</em> For each tier Buyer is above another creature, he gains +5 to every d20 Test that involves that creature (his attack rolls against it, his saving throws against its effects, and contested checks with it) and +5 AC against that creature's attacks (Mortal +5). The lower creature's other rolls are unchanged.</p>"),

      feat("Thousand Faces", "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "<p>Buyer's true face is unknown, perhaps even to himself. When he changes shape (Change Shape, <em>disguise self</em>, <em>alter self</em>, <em>polymorph</em> on himself), the copy is perfect: his voice, smell, handwriting, and mannerisms match the form. Only Truesight or a creature that touches him and succeeds on a DC 17 Wisdom (Insight) check can tell. He has Advantage on Charisma (Deception) checks while disguised.</p>"),

      feat("Legendary Resistance (3/Day, or 4/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Buyer fails a saving throw, he can choose to succeed instead. Ascendant tier = 3 uses. In his lair he has 4 uses instead of 3 (set the maximum to 4 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Magic Resistance", "icons/magic/defensive/shield-barrier-blue.webp",
        "<p>Buyer has Advantage on saving throws against spells and other magical effects.</p>"),

      feat("Mind Blank", "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "<p>Buyer is permanently under the effect of <em>mind blank</em>: he is immune to Psychic damage and the Charmed condition, his thoughts can't be read, and he can't be located or scried on by magic.</p>"),

      feat("Sneak Attack (1/Turn)", "icons/skills/melee/strike-dagger-white-orange.webp",
        "<p>Once per turn, Buyer deals an extra 17 (5d6) damage when he hits a target with Arcane Burst and has Advantage on the attack roll, or when the target is within 5 feet of an ally of his that doesn't have the Incapacitated condition and he doesn't have Disadvantage on the attack roll.</p>",
        { activities: [act("damage", {
          activation: activation("special", { condition: "Once per turn, on an Arcane Burst hit with Advantage or an ally nearby" }),
          damage: { parts: [{ number: 5, denomination: 6, bonus: "", types: ["force"] }] }
        })] }),

      feat("Evasion", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>If Buyer is subjected to an effect that allows a Dexterity saving throw to take only half damage, he instead takes no damage on a success and only half damage on a failure. He can't use this trait if he has the Incapacitated condition.</p>"),

      // ---- Actions ----
      feat("Multiattack", "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "<p>Buyer makes two Arcane Burst attacks. He can replace one of them with a use of Spellcasting to cast a cantrip or a spell of 3rd level or lower. A spell of 4th level or higher takes his whole action instead of Multiattack.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      feat("Arcane Burst", "icons/magic/unholy/beam-ringed-impact-purple.webp",
        "<p><em>Melee or Ranged Attack Roll:</em> +9, reach 5 ft. or range 120 ft. <em>Hit:</em> 18 (3d8 + 5) Force damage. In melee, the burst comes from a blade of force hidden in his sleeve.</p>",
        { activities: [act("attack", {
          activation: activation("action"),
          range: { override: true, value: "120", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "int", bonus: "", flat: false, type: { value: "ranged", classification: "spell" } },
          damage: { includeBase: false, parts: [{ number: 3, denomination: 8, bonus: "@mod", types: ["force"] }] }
        })] }),

      feat("Spellcasting", "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "<p>Buyer is a CR 12 Boss spellcaster (NPC slot rule: CR 12, Hybrid). His spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks). He casts using his wand as a focus.</p>"
        + "<p><strong>Signature spells (no slot):</strong></p><ul>"
        + "<li><strong>At will:</strong> <em>disguise self</em>, <em>alter self</em></li>"
        + "<li><strong>3/Day:</strong> <em>misty step</em></li></ul>"
        + "<p><strong>Prepared Wizard spells:</strong></p>"
        + spellBlock),

      // ---- Bonus Actions ----
      feat("Change Shape", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p>Buyer shape-shifts into any Small or Medium Humanoid or Beast he has seen, or back into his true form. His game statistics stay the same, except that he gains the form's Speeds (Fly Speed up to 60 feet, Swim and Climb Speed up to 40 feet). Anything he is wearing or carrying transforms with him. Thousand Faces makes the copy perfect.</p>"
        + "<p><em>Ambush Form:</em> If he changes shape this turn, he has Advantage on the next attack roll he makes before the end of the turn.</p>",
        { activities: [act("utility", { activation: activation("bonus") })] }),

      feat("Cunning Action", "icons/magic/movement/trail-streak-zigzag-yellow.webp",
        "<p>Buyer takes the Dash, Disengage, or Hide action.</p>",
        { activities: [act("utility", { activation: activation("bonus") })] }),

      // ---- Reactions ----
      feat("Protective Magic (3/Day)", "icons/magic/defensive/shield-barrier-blue.webp",
        "<p>Buyer casts <em>counterspell</em> or <em>shield</em> in response to the spell's trigger, without expending a spell slot.</p>",
        { uses: DAILY(3), activities: [act("utility", {
          activation: activation("reaction", { condition: "Trigger of counterspell or shield" }),
          consumption: { spellSlot: true, targets: [USE_ITEM] }
        })] }),

      feat("Uncanny Dodge", "icons/magic/defensive/shield-barrier-deflect-teal.webp",
        "<p><em>Trigger:</em> An attacker Buyer can see hits him with an attack roll. <em>Response:</em> Buyer halves the attack's damage against him.</p>",
        { activities: [act("utility", { activation: activation("reaction", { condition: "Hit by an attack roll from a seen attacker" }) })] }),

      // ---- Legendary Actions (4 uses, Ascendant tier, regained at the start of his turn) ----
      feat("Burst (Costs 1 Action)", "icons/magic/unholy/beam-ringed-impact-purple.webp",
        "<p>Buyer makes one Arcane Burst attack. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("utility", legendary(1, "Once per round"))] }),

      feat("Slip Away (Costs 1 Action)", "icons/magic/control/silhouette-hold-change-blue.webp",
        "<p>Buyer uses Change Shape and moves up to half his Speed without provoking Opportunity Attacks. If he ends the move obscured or among other creatures of his chosen form's kind, he can take the Hide action.</p>",
        { activities: [act("utility", legendary(1))] }),

      feat("Face Swap (Costs 2 Actions)", "icons/magic/control/hypnosis-mesmerism-swirl.webp",
        "<p>Buyer becomes a perfect copy of one creature he can see within 30 feet of him and swaps places with it by teleporting. An unwilling creature can make a DC 17 Charisma saving throw to stay in place (Buyer still takes its appearance).</p>"
        + "<p>Until the start of Buyer's next turn, whenever a creature attacks or targets either of them, it can't tell which is which: roll any die, and on an odd number it targets the other one instead. Truesight sees through the swap. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("save", {
          ...legendary(2, "Once per round"),
          range: { override: true, value: "30", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          save: { ability: ["cha"], dc: { calculation: "", formula: DC } },
          damage: { onSave: "none", parts: [] }
        })] })
    ];

    for ( const spell of SPELLS ) {
      try { buyerItems.push(await buildSpell(spell)); }
      catch ( err ) { console.error(`Buyer macro | Failed to build spell "${spell.name}"`, err); failed.push(spell.name); }
    }

    const biography = "<h2>Buyer, the Man of Many Faces</h2>"
      + "<p>A wizard who learned a thief's trade, or a thief who learned a wizard's. Nobody knows which, because nobody has seen his real face. He buys secrets, sells lies, and wears whoever he needs to be today.</p>"
      + "<p><strong>Tier of Being:</strong> Ascendant (CR 11–20 band, ability cap 24).</p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Before the fight:</strong> He is already in the room, wearing the face of a guard, a servant, or one of the party's allies. <em>Mage armor</em> is up.</li>"
      + "<li><strong>Round 1:</strong> Change Shape to break the disguise (Advantage, Sneak Attack), Multiattack swapping one Arcane Burst for <em>fireball</em> on the bunched-up party.</li>"
      + "<li><strong>Every round:</strong> Change Shape or Cunning Action as his bonus action, two Arcane Bursts with Sneak Attack. <em>Cone of cold</em> or <em>polymorph</em> on the biggest threat when it matters.</li>"
      + "<li><strong>Legendary:</strong> Face Swap with a PC so the party hits each other, Slip Away into a crowd, Burst on whoever stands alone.</li>"
      + "<li><strong>When pressed:</strong> <em>Mislead</em> or <em>greater invisibility</em>, then <em>dimension door</em> out. He never fights to the death; there is always another face to wear.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>Truesight ends almost every trick he has. <em>See invisibility</em> and <em>true seeing</em> are worth the slots.</li>"
      + "<li>His HP is low (121) and his Strength and Constitution saves are weak. Area effects that call for STR or CON saves go around Evasion.</li>"
      + "<li>Agree on a password before the fight so Face Swap and disguises don't fool the party.</li>"
      + "<li>Protective Magic is 3/Day: bait it with a cheap spell before the important one.</li></ul>"
      + "<h3>CR Check</h3>"
      + "<p>Defense ≈ CR 12–13 (AC 17, 22 with <em>shield</em>; 121 HP + Legendary Resistance 3/Day as +90 effective HP = ~211; Magic Resistance, Uncanny Dodge, Evasion). "
      + "Offense ≈ CR 13 (best 3 rounds average ~91 damage per round at +9 to hit, DC 17: round 1 <em>fireball</em> 28 on 2 targets + Arcane Burst 18.5 + Sneak Attack 17.5 + legendary Burst 18.5; round 2 <em>cone of cold</em> 36 on 2 targets + legendary Burst; round 3 two Arcane Bursts 37 + Sneak Attack 17.5 + legendary Burst 18.5). "
      + "Average ≈ CR 12–13. Face Swap can turn the party's own damage against itself, so treat him as CR 13 against a party that focuses fire.</p>";

    const buyerSystem = {
      abilities: {
        str: { value: 10, proficient: 0 }, dex: { value: 18, proficient: 1 }, con: { value: 12, proficient: 0 },
        int: { value: 20, proficient: 1 }, wis: { value: 15, proficient: 1 }, cha: { value: 16, proficient: 0 },
        hon: { value: 16, proficient: 0 }, san: { value: 15, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 17 },
        hp: { value: 121, max: 121, temp: 0, tempmax: 0, formula: "22d8 + 22" },
        init: { ability: "", bonus: "" },
        movement: { walk: "30", burrow: "", climb: "", fly: "", swim: "", units: "ft", hover: false },
        senses: { ranges: { darkvision: null, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" },
        spellcasting: "int",
        spell: { level: 12 }
      },
      spells: Object.fromEntries(Array.from({ length: 9 }, (_, i) => {
        const key = `spell${i + 1}`;
        const max = SLOTS[key] ?? 0;
        return [key, { value: max, override: max }];
      })),
      details: {
        cr: 12,
        alignment: "Neutral",
        type: { value: "humanoid", subtype: "Wizard, Rogue, Shapeshifter", swarm: "", custom: "" },
        habitat: { value: [{ type: "any" }], custom: "" },
        treasure: { value: ["arcana", "individual"] },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 4, spent: 0 },   // Ascendant tier = 4
        legres: { max: 3, spent: 0 },   // Ascendant tier = 3
        lair: { value: false }
      },
      skills: {
        arc: { value: 2 },   // Expertise: +13
        dec: { value: 2 },   // Expertise: +11
        his: { value: 1 },   // +9
        prc: { value: 1 },   // +6 (Passive 16)
        ste: { value: 1 }    // +8
      },
      traits: {
        size: "med",
        di: { value: ["psychic"] },
        dr: { value: [] },
        dv: { value: [] },
        ci: { value: ["charmed"] },
        languages: { value: ["common"], custom: "plus five other languages" }
      }
    };

    await wipe(buyer);
    await buyer.update({
      system: buyerSystem,
      "prototypeToken.actorLink": true,
      "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.HOSTILE
    });
    await addItems(buyer, buyerItems, failed);

    buyer.sheet.render(true);
    ui.notifications.info(`${buyer.name} rebuilt as a CR 12 shapeshifting Wizard/Rogue (${buyerItems.length} items).`);
    if ( missingSpells.length ) ui.notifications.warn(`Spells not found in any compendium (placeholders made): ${missingSpells.join(", ")}`, { permanent: true });
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Buyer macro | ", err);
    ui.notifications.error(`Buyer macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
