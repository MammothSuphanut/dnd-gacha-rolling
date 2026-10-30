/**
 * Hank, the Iron Ledger of Syrinlya — CR 12 merchant brawler with a great hammer, Ascendant tier, legendary boss
 * For Foundry VTT v14 + D&D 5e system 5.3.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * What it does:
 *   - WIPES the existing NPC named "Hank" (all items and effects) and rebuilds it
 *     as a CR 12 hammer-swinging merchant. Portrait, token, disposition and folder are kept.
 */
(async () => {
  /* ------------------------------------------------------------------ */
  /*  Settings                                                          */
  /* ------------------------------------------------------------------ */
  const ACTOR_NAME = "Hank";
  const MAKE_BACKUP = false;   // true = copy "Hank (backup)" before wiping
  const DC = "18";             // 8 + Prof 4 + STR 6

  try {
    if ( game.system.id !== "dnd5e" ) return ui.notifications.error("This macro requires the D&D 5e system.");
    if ( !game.user.isGM ) return ui.notifications.error("Only a GM can run this macro.");

    const hank = game.actors.find(a => (a.type === "npc") && (a.name.toLowerCase() === ACTOR_NAME.toLowerCase()));
    if ( !hank ) return ui.notifications.error(`Couldn't find an NPC named "${ACTOR_NAME}".`);

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                           */
    /* ------------------------------------------------------------------ */
    const rid = () => foundry.utils.randomID();
    const USE_ITEM = { type: "itemUses", target: "", value: "1" };
    const DAILY = n => ({ spent: 0, max: String(n), recovery: [{ period: "day", type: "recoverAll" }] });
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

    async function wipe(actor) {
      const itemIds = actor.items.map(i => i.id);
      if ( itemIds.length ) await actor.deleteEmbeddedDocuments("Item", itemIds);
      const effectIds = actor.effects.map(e => e.id);
      if ( effectIds.length ) await actor.deleteEmbeddedDocuments("ActiveEffect", effectIds);
    }

    async function addItems(actor, items, failed) {
      for ( const data of items ) {
        try { await actor.createEmbeddedDocuments("Item", [data]); }
        catch ( err ) { console.error(`Hank macro | Failed to create "${data.name}" on ${actor.name}`, err); failed.push(data.name); }
      }
    }

    const failed = [];

    if ( MAKE_BACKUP ) {
      const data = hank.toObject();
      delete data._id;
      data.name = `${hank.name} (backup)`;
      await Actor.implementation.create(data);
    }

    // Shared status effects
    const proneCrash = () => statusEffect("Knocked Prone", "icons/svg/falling.svg", ["prone"], {},
      "Knocked flat by Hank's hammer.");
    const crashProne = proneCrash();
    const quakeProne = proneCrash();
    const flashBlind = statusEffect("Flash Powder", "icons/svg/blind.svg", ["blinded"], { rounds: 1, turns: 1 },
      "Blinded until the end of its next turn.");

    /* ================================================================== */
    /*  Items                                                             */
    /* ================================================================== */
    const hankItems = [
      // ---- Traits ----
      feat("Ascendant Being", "icons/magic/symbols/star-solid-gold.webp",
        "<p><strong>Tier of Being: Ascendant.</strong> Decades of hauling cargo across Eiselcross and haggling with things that should not be haggled with have fused Hank's body and will into one. He doesn't age and can't die of old age.</p>"
        + "<p><em>Tier Gap:</em> For each tier Hank is above another creature, he gains +5 to every d20 Test that involves that creature (his attack rolls against it, his saving throws against its effects, and contested checks with it) and +5 AC against that creature's attacks (Mortal +5). The lower creature's other rolls are unchanged.</p>"),

      feat("Legendary Resistance (3/Day, or 4/Day in Lair)", "icons/magic/symbols/star-solid-gold.webp",
        "<p>If Hank fails a saving throw, he can choose to succeed instead. Ascendant tier = 3 uses. In his lair (his trading tent and stockpile at Syrinlya) he has 4 uses instead of 3 (set the maximum to 4 on the sheet).</p>",
        { activities: [act("utility", {
          activation: activation("special", { condition: "fails a saving throw" }),
          consumption: { spellSlot: true, targets: [{ type: "attribute", target: "resources.legres.value", value: "1" }] }
        })] }),

      feat("Bad Debt", "icons/commodities/currency/coins-plain-stack-gold.webp",
        "<p>The last creature that dealt damage to Hank is his <strong>Debtor</strong> (he doesn't need to see it; he never forgets who owes him). Once per turn, when Hank hits his Debtor with The Final Offer, the target takes an extra 7 (2d6) Thunder damage.</p>",
        { activities: [act("damage", {
          activation: activation("special", { condition: "Once per turn, on a hammer hit against his Debtor" }),
          damage: { parts: [{ number: 2, denomination: 6, bonus: "", types: ["thunder"] }] }
        })] }),

      feat("Short Fuse", "icons/magic/fire/flame-burning-fist-strike.webp",
        "<p>The first time Hank is Bloodied in a fight, he loses his temper: Market Crash recharges immediately, and he has Advantage on Strength checks and Strength saving throws until the end of the fight.</p>"),

      feat("Appraiser's Eye", "icons/tools/scribal/magnifying-glass.webp",
        "<p>Hank knows the value of anything he can see. Holding an object for 1 minute, he learns whether it is magical, its properties and how to use it (as <em>identify</em>), and its fair market price. He can't be fooled by forged coins, fake gems or illusory goods.</p>"),

      feat("Truebearing Compass", "icons/tools/navigation/compass-plain-blue.webp",
        "<p>Hank always knows which way is north and can retrace any route he has walked in the last year, even inside Eiselcross's arcane storms that scramble ordinary compasses. (His beloved brass compass; see EP04 \"Travel to Syrinlya\".)</p>"),

      // ---- Actions ----
      feat("Multiattack", "icons/weapons/hammers/hammer-double-steel-embossed.webp",
        "<p>Hank makes two attacks with The Final Offer. He can replace one of them with a Shove.</p>",
        { activities: [act("utility", { activation: activation("action") })] }),

      feat("The Final Offer", "icons/weapons/hammers/hammer-double-steel-embossed.webp",
        "<p>A two-handed hammer as big as a cart axle, its head stamped with a merchant's seal. <em>Melee Attack Roll:</em> +10, reach 5 ft. <em>Hit:</em> 16 (3d6 + 6) Bludgeoning damage.</p>",
        { activities: [act("attack", {
          activation: activation("action"),
          range: { override: true, value: "5", units: "ft" },
          target: { override: true, affects: { count: "1", type: "creature" } },
          attack: { ability: "str", bonus: "", flat: false, type: { value: "melee", classification: "weapon" } },
          damage: { includeBase: false, parts: [{ number: 3, denomination: 6, bonus: "@mod", types: ["bludgeoning"] }] }
        })] }),

      feat("Market Crash (Recharge 5–6)", "icons/magic/earth/barrier-stone-explosion-debris.webp",
        "<p>Hank brings The Final Offer down on the ground like a gavel. Each creature in a 15-foot Emanation originating from him makes a DC 18 Strength saving throw. <em>Failure:</em> 27 (5d10) Thunder damage and the creature has the Prone condition. <em>Success:</em> Half damage only.</p>",
        {
          uses: RECHARGE(5),
          effects: [crashProne],
          activities: [act("save", {
            activation: activation("action"),
            consumption: { spellSlot: true, targets: [USE_ITEM] },
            range: { override: true, units: "self" },
            target: { override: true, template: { type: "radius", size: "15", units: "ft" }, affects: { type: "creature" } },
            save: { ability: ["str"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "half", parts: [{ number: 5, denomination: 10, bonus: "", types: ["thunder"] }] },
            effects: [{ _id: crashProne._id, onSave: false }]
          })]
        }),

      // ---- Bonus Actions ----
      feat("Merchant's Stock (3/Day)", "icons/containers/bags/pack-leather-white-tan.webp",
        "<p>Hank pulls something useful out of his overstuffed pack. Choose one:</p><ul>"
        + "<li><strong>Greater Healing Potion.</strong> He drinks it and regains 14 (4d4 + 4) Hit Points.</li>"
        + "<li><strong>Flash Powder.</strong> He throws it at one creature within 15 feet. It makes a DC 18 Constitution saving throw or has the Blinded condition until the end of its next turn.</li></ul>",
        {
          uses: DAILY(3),
          effects: [flashBlind],
          activities: [
            act("heal", {
              name: "Greater Healing Potion",
              activation: activation("bonus"),
              consumption: { spellSlot: true, targets: [USE_ITEM] },
              range: { override: true, units: "self" },
              healing: { number: 4, denomination: 4, bonus: "4", types: ["healing"] }
            }),
            act("save", {
              name: "Flash Powder",
              activation: activation("bonus"),
              consumption: { spellSlot: true, targets: [USE_ITEM] },
              range: { override: true, value: "15", units: "ft" },
              target: { override: true, affects: { count: "1", type: "creature" } },
              save: { ability: ["con"], dc: { calculation: "", formula: DC } },
              damage: { onSave: "none", parts: [] },
              effects: [{ _id: flashBlind._id, onSave: false }]
            })
          ]
        }),

      // ---- Reactions ----
      feat("No Refunds", "icons/weapons/hammers/hammer-double-steel-embossed.webp",
        "<p><em>Trigger:</em> A creature within 5 feet of Hank hits him with a melee attack. <em>Response:</em> Hank makes one attack with The Final Offer against that creature (it is now his Debtor, so Bad Debt applies).</p>",
        { activities: [act("utility", { activation: activation("reaction", { condition: "Hit by a melee attack from within 5 ft" }) })] }),

      // ---- Legendary Actions (4 uses, Ascendant tier, regained at the start of his turn) ----
      feat("Hammer Swing (Costs 1 Action)", "icons/weapons/hammers/hammer-double-steel-embossed.webp",
        "<p>Hank makes one attack with The Final Offer. He can't take this option again until the start of his next turn.</p>",
        { activities: [act("utility", legendary(1, "Once per round"))] }),

      feat("Shoulder Through (Costs 1 Action)", "icons/skills/movement/feet-winged-boots-brown.webp",
        "<p>Hank moves up to half his Speed. During this move he can move through the space of a Medium or smaller creature, which must succeed on a DC 18 Strength saving throw or be pushed 5 feet away.</p>",
        { activities: [act("utility", legendary(1))] }),

      feat("Quake Step (Costs 2 Actions)", "icons/magic/earth/projectile-stone-landslide.webp",
        "<p>Hank stomps hard enough to crack ice. Each creature within 10 feet of him makes a DC 18 Dexterity saving throw. <em>Failure:</em> 7 (2d6) Thunder damage and the creature has the Prone condition. <em>Success:</em> Half damage only. He can't take this option again until the start of his next turn.</p>",
        {
          effects: [quakeProne],
          activities: [act("save", {
            ...legendary(2, "Once per round"),
            range: { override: true, units: "self" },
            target: { override: true, template: { type: "radius", size: "10", units: "ft" }, affects: { type: "creature" } },
            save: { ability: ["dex"], dc: { calculation: "", formula: DC } },
            damage: { onSave: "half", parts: [{ number: 2, denomination: 6, bonus: "", types: ["thunder"] }] },
            effects: [{ _id: quakeProne._id, onSave: false }]
          })]
        })
    ];

    const biography = "<h2>Hank, the Iron Ledger of Syrinlya</h2>"
      + "<p>The big merchant who runs the supply and trade tent at the Syrinlya camp on Foren. Middle-aged, scowling and loud, he shouts at his Dragonborn guards (Coke, Pha and Junk) and blames whoever he dislikes first, but he pays his debts and is not a bad man. He has hauled cargo in and out of Eiselcross for years, and the great hammer he calls <em>The Final Offer</em> is how he settles the deals that words can't.</p>"
      + "<p><strong>Tier of Being:</strong> Ascendant (CR 11–20 band, ability cap 24).</p>"
      + "<h3>Tactics</h3><ul>"
      + "<li><strong>Round 1:</strong> Walk into the middle of the party and Market Crash: everyone nearby is knocked Prone, then Hammer Swing on a Prone target (Advantage).</li>"
      + "<li><strong>Every round:</strong> Two hammer attacks on his Debtor (whoever hurt him last). Quake Step to knock melee attackers down again; No Refunds punishes anyone who hits him in melee.</li>"
      + "<li><strong>Bonus action:</strong> Flash Powder on the most dangerous caster or archer, or a Greater Healing Potion once he is Bloodied.</li>"
      + "<li><strong>When Bloodied:</strong> Short Fuse recharges Market Crash; use it immediately.</li>"
      + "<li><strong>When losing:</strong> He is a merchant, not a martyr. If the fight is clearly lost, he offers a deal (goods, information, safe passage) instead of dying.</li></ul>"
      + "<h3>Counterplay</h3><ul>"
      + "<li>He has no ranged attack and no way to fly. Archers and casters who stay out of his 15-foot Market Crash take very little damage.</li>"
      + "<li>Bad Debt only rewards the last creature that hurt him: let a durable ally hit last.</li>"
      + "<li>His Dexterity, Intelligence and Wisdom saves are weak; control spells work once Legendary Resistance is spent.</li>"
      + "<li>Talking works. Hank respects a good bargain, and Persuasion with a real offer can end the fight.</li></ul>"
      + "<h3>CR Check</h3>"
      + "<p>Defense ≈ CR 12–13 (AC 17; 119 HP + Legendary Resistance 3/Day as +90 effective HP + about 28 from two potions = ~237). "
      + "Offense ≈ CR 12 (best 3 rounds average ~86 damage per round at +10 to hit, DC 18: round 1 Market Crash 27.5 on 2 targets + legendary Hammer Swing 16.5 and Quake Step 7 on 2 targets = 85.5; round 2 two hammer hits 33 + Bad Debt 7 + legendary 30.5 + No Refunds 16.5 = 87; round 3 Short Fuse Market Crash again = 85.5). "
      + "Average ≈ CR 12 (12–13 if the party crowds him in melee).</p>";

    const hankSystem = {
      abilities: {
        str: { value: 22, proficient: 1 }, dex: { value: 12, proficient: 0 }, con: { value: 18, proficient: 1 },
        int: { value: 14, proficient: 0 }, wis: { value: 12, proficient: 0 }, cha: { value: 16, proficient: 1 },
        hon: { value: 13, proficient: 0 }, san: { value: 14, proficient: 0 }
      },
      attributes: {
        ac: { calc: "flat", flat: 17 },
        hp: { value: 119, max: 119, temp: 0, tempmax: 0, formula: "14d8 + 56" },
        init: { ability: "", bonus: "" },
        movement: { walk: "30", burrow: "", climb: "", fly: "", swim: "", units: "ft", hover: false },
        senses: { ranges: { darkvision: null, blindsight: null, tremorsense: null, truesight: null }, units: "ft", special: "" },
        spellcasting: ""
      },
      details: {
        cr: 12,
        alignment: "Neutral",
        type: { value: "humanoid", subtype: "Human, Merchant", swarm: "", custom: "" },
        habitat: { value: [{ type: "arctic" }, { type: "coastal" }], custom: "" },
        treasure: { value: ["individual", "armaments"] },
        biography: { value: biography }
      },
      resources: {
        legact: { max: 4, spent: 0 },   // Ascendant tier = 4
        legres: { max: 3, spent: 0 },   // Ascendant tier = 3
        lair: { value: false }
      },
      skills: {
        ath: { value: 1 },   // +10
        ins: { value: 1 },   // +5
        inv: { value: 1 },   // +6 (appraisal)
        itm: { value: 1 },   // +7
        per: { value: 2 },   // Expertise: +11
        sur: { value: 1 }    // +5
      },
      traits: {
        size: "med",
        di: { value: [] },
        dr: { value: ["cold"] },
        dv: { value: [] },
        ci: { value: [] },
        languages: { value: ["common", "dwarvish", "draconic", "giant"], custom: "" }
      }
    };

    await wipe(hank);
    await hank.update({ system: hankSystem, "prototypeToken.actorLink": true });
    await addItems(hank, hankItems, failed);

    hank.sheet.render(true);
    ui.notifications.info(`${hank.name} rebuilt as a CR 12 hammer-swinging merchant (${hankItems.length} items).`);
    if ( failed.length ) ui.notifications.error(`Could not create: ${failed.join(", ")}. Press F12 → Console for details.`, { permanent: true });
  } catch ( err ) {
    console.error("Hank macro | ", err);
    ui.notifications.error(`Hank macro failed: ${err.message}. Press F12 → Console for details.`, { permanent: true });
  }
})();
