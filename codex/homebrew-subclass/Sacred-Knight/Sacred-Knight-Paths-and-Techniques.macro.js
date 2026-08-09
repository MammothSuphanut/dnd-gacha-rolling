/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Feature item สำหรับ "Choose Your Path" (3 แบบ) และ "Fervor Technique" (10 แบบ) ของ Sacred Knight
 * Generated from codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.md — 2026-08-09
 *
 * ==================== ขอบเขตของ macro นี้ ====================
 * สร้างแค่ตัว Feature item ทั้ง 13 ใบ (3 Path + 10 Technique) เก็บไว้ในโฟลเดอร์ให้พร้อมใช้ —
 * ยังไม่ผูก ItemChoice advancement เข้ากับ Class item "Sacred Knight" ให้เลือกอัตโนมัติตอน level up
 * (เลเวล 1 สำหรับ Path, เลเวล 1/2/5/9/13 สำหรับ Technique) เพราะ schema ของ ItemChoice ซับซ้อนกว่า
 * ItemGrant (ต้องมี pool ของ uuid + จำนวนที่เลือกได้) และยังไม่ได้ verify กับโลก Foundry จริง —
 * ตอนนี้ต้องลาก item เหล่านี้ไปให้ตัวละครเลือกเองผ่าน UI หรือแจ้งมาทำ ItemChoice ต่อเป็นงานแยก
 *
 * "Shared Reaction" (กติกาที่บอกว่า Spirit Ward/Guardian's Blessing/Bulwark Shift ใช้ reaction
 * ร่วมกันได้ในครั้งเดียว) ไม่ได้แยกเป็น item ของตัวเอง — ใส่เป็นข้อความอธิบายในทั้ง 3 technique
 * ของ Guardian แทน ตรงกับที่นับได้ 10 technique จริง (ไม่ใช่ 11)
 *
 * ต้องรัน codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js (Class item) ก่อน ถ้าอยากให้
 * item เหล่านี้อยู่ในโฟลเดอร์เดียวกับ Class — แต่ item ชุดนี้ไม่ได้ผูก classIdentifier ตรงๆ
 * (เป็น "feat" ธรรมดา ไม่ใช่ subclass) รันก่อนหรือหลังก็ได้ ไม่กระทบกัน
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_NAME = "Sacred Knight";
  const PARENT_FOLDER_PATH = ["HomeBrew Classes", "Sacred Knight"];
  const ICON = "icons/svg/book.svg";

  // ---------- Helpers ----------

  function slug(name) {
    return name
      .toLowerCase()
      .replace(/'/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function getOrCreateFolder(pathArr, type = "Item") {
    let parent = null;
    for (const name of pathArr) {
      let folder = game.folders.find(
        (f) => f.type === type && f.name === name && (f.folder?.id ?? null) === (parent?.id ?? null)
      );
      if (!folder) {
        folder = await Folder.create({
          name,
          type,
          folder: parent?.id ?? null,
          color: parent?.color ?? "#6f0000",
        });
      }
      parent = folder;
    }
    return parent;
  }

  function makeUtilityActivity({ id, name, activationType }) {
    return {
      type: "utility",
      name,
      activation: { type: activationType, value: null, override: false },
      _id: id,
      img: null,
      sort: 0,
      consumption: { scaling: { allowed: false }, spellSlot: true, targets: [] },
      description: {},
      duration: { units: "inst", concentration: false, override: false },
      effects: [],
      flags: {},
      range: { units: "self", override: false },
      target: {
        template: { contiguous: false, stationary: false, units: "ft" },
        affects: { choice: false },
        override: false,
        prompt: true,
      },
      uses: { spent: 0, recovery: [] },
      visibility: { level: {}, requireAttunement: false, requireIdentification: false, requireMagic: false },
      useConditionText: "",
      useConditionReason: "",
      effectConditionText: "",
      macroData: { name: "", command: "" },
      ignoreTraits: { idi: false, idr: false, idv: false, ida: false, idm: false },
      midiProperties: {
        ignoreTraits: [], triggeredActivityId: "none", triggeredActivityConditionText: "",
        triggeredActivityTargets: "targets", triggeredActivityRollAs: "self", triggeredActivityConsume: true,
        triggeredActivityConfigure: true, autoConsume: false, forceConsumeDialog: "default",
        forceRollDialog: "default", forceDamageDialog: "default", confirmTargets: "default",
        autoTargetType: "any", autoTargetAction: "default", automationOnly: false,
        otherActivityCompatible: true, otherActivityAsParentType: true, identifier: "",
        displayActivityName: false, rollMode: "default", chooseEffects: false, toggleEffect: false,
        ignoreFullCover: false, removeChatButtons: "default", magicEffect: false, magicDamage: false,
        noConcentrationCheck: false, skipConcentrationCheck: false, autoCEEffects: "default",
      },
      isOverTimeFlag: false,
      overTimeProperties: { saveRemoves: true, rollAs: "target", preRemoveConditionText: "", postRemoveConditionText: "" },
      regionBehavior: {
        enabled: false, dispositionFilter: -1, excludeSource: true, oncePerTurn: true,
        wallRestriction: "none", regionVisibility: 2, rules: [],
      },
      regionLight: {
        enabled: false, dim: 0, bright: 0, color: null, alpha: 0.5, luminosity: 0.5,
        animationType: "", animationSpeed: 5, animationIntensity: 5,
      },
      otherActivityId: "none",
      otherActivityAsParentType: true,
    };
  }

  function makeFeatureData(name, requirements, description, activities = {}) {
    return {
      name,
      type: "feat",
      img: ICON,
      system: {
        description: { value: description, chat: "" },
        requirements,
        type: { value: "class", subtype: "" },
        properties: [],
        activities,
        uses: { spent: 0, recovery: [] },
        advancement: {},
        identifier: slug(name),
        source: { revision: 1, rules: "2024" },
        crewed: false,
        enchant: {},
        prerequisites: { items: [], repeatable: false },
      },
      effects: [],
      flags: {},
    };
  }

  // ---------- 1. เตรียมโฟลเดอร์ ----------

  const pathFolder = await getOrCreateFolder([...PARENT_FOLDER_PATH, "Choose Your Path"], "Item");
  const techniqueFolder = await getOrCreateFolder([...PARENT_FOLDER_PATH, "Fervor Techniques"], "Item");

  // ---------- 2. Choose Your Path — 3 ตัวเลือก (เลเวล 1) ----------

  const pathsData = [
    makeFeatureData(
      "Path: Retribution",
      `${CLASS_NAME} 1`,
      "<p>A knight of punishment, built around offense and counterattack. You gain the <strong>Twin Blade Stance</strong> feature:</p>" +
        "<ul>" +
        "<li>You can wield one Versatile weapon in each hand at the same time (a pair of longswords, a pair of warhammers, and so on). This isn't governed by the two-weapon fighting rules in any way — you don't gain an extra attack with your bonus action from doing this.</li>" +
        "<li>Any Versatile weapon you wield uses its two-handed damage die at all times, whether you're wielding it in one hand or two (a longsword deals 1d10 instead of 1d8, for example).</li>" +
        "<li>You gain a +1 bonus to AC while wielding two weapons this way.</li>" +
        "<li>You can draw or sheathe two weapons at once, instead of the usual one.</li>" +
        "</ul>" +
        "<p>You can learn Fervor Techniques from the <strong>Universal and Retribution</strong> lists only.</p>" +
        "<p><em>Learning versus using a technique.</em> The list you can learn from is fixed by your Path and never changes — but once you've learned a technique, you can use it at any time, regardless of what you're currently wielding.</p>"
    ),
    makeFeatureData(
      "Path: Guardian",
      `${CLASS_NAME} 1`,
      "<p>A knight of protection, built around defense and supporting allies. You gain proficiency with <strong>Heavy armor</strong> and <strong>Shields</strong>, and you gain the <strong>Bulwark Stance</strong> feature: while you're wielding a shield, you gain an additional +1 bonus to AC (stacking with the shield's normal +2, for a total of +3 AC from the shield).</p>" +
        "<p>You can learn Fervor Techniques from the <strong>Universal and Guardian</strong> lists only.</p>" +
        "<p><em>Learning versus using a technique.</em> The list you can learn from is fixed by your Path and never changes — but once you've learned a technique, you can use it at any time, regardless of what you're currently wielding.</p>" +
        "<p><strong>Manual step:</strong> proficiency กับ Heavy armor/Shield ไม่ได้ auto-grant โดย macro นี้ — เพิ่มเองผ่าน Actor sheet หรือ Trait advancement ของ item นี้</p>"
    ),
    makeFeatureData(
      "Path: Formless",
      `${CLASS_NAME} 1`,
      "<p>A knight who refuses to commit to a single stance, shifting between offense and defense as the fight demands. You gain proficiency with <strong>Shields</strong> only (not Heavy armor — you remain limited to Light and Medium armor). You gain the <strong>Adaptive Stance</strong> feature:</p>" +
        "<ul>" +
        "<li>You can swap your off-hand between a weapon and a shield as part of making an attack, or as a reaction — including on a turn that isn't your own. This costs no Fervor.</li>" +
        "<li>While wielding two weapons (no shield), your primary weapon uses its two-handed damage die even in one hand, and you gain a +1 bonus to AC — identical to Twin Blade Stance.</li>" +
        "<li>While wielding a shield, you gain only the shield's normal benefit (+2 AC) — it doesn't stack with the two-handed damage die or the +1 AC bonus above.</li>" +
        "</ul>" +
        "<p>You can learn Fervor Techniques from the <strong>Universal, Retribution, and Guardian</strong> lists — all three. This is Formless's defining strength, in exchange for never reaching either specialist's peak AC or peak damage.</p>" +
        "<p><strong>Manual step:</strong> proficiency กับ Shield ไม่ได้ auto-grant โดย macro นี้ — เพิ่มเองผ่าน Actor sheet หรือ Trait advancement ของ item นี้</p>"
    ),
  ];
  pathsData.forEach((f) => (f.folder = pathFolder.id));

  const createdPaths = await Item.createDocuments(pathsData);

  // ---------- 3. Fervor Techniques — 4 Universal + 3 Retribution + 3 Guardian ----------

  const swiftId = foundry.utils.randomID();
  const clarityId = foundry.utils.randomID();
  const risingDragonStrikeId = foundry.utils.randomID();
  const spiritWardId = foundry.utils.randomID();
  const guardiansBlessingId = foundry.utils.randomID();
  const bulwarkShiftId = foundry.utils.randomID();

  const sharedReactionNote =
    "<p><em>Shared Reaction.</em> Spirit Ward, Guardian's Blessing, and Bulwark Shift all use the same reaction — one per round, as normal. A single use of your reaction can trigger all three of these techniques against the same triggering event at once, as long as you have enough Fervor to pay for each one you want to use.</p>";

  const techniquesData = [
    // --- Universal ---
    makeFeatureData(
      "Pure White Blade",
      "Universal Fervor Technique",
      "<p><strong>Cost: 1 Fervor per stack.</strong> When you make an attack, you can increase its range by 5 feet per stack of Fervor spent, usable on both melee and ranged attacks. If you spend 5 or more Fervor on a single use (25 feet or more of bonus range), you also gain advantage on that attack roll. You can spend a maximum of your Wisdom modifier + Proficiency Bonus in stacks on a single use.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> Each stack now grants +10 feet of range instead of +5 (the cost and stack cap don't change).</p>"
    ),
    makeFeatureData(
      "Swift",
      "Universal Fervor Technique",
      "<p><strong>Cost: 1 Fervor per stack.</strong> As a free action, usable once per turn, you increase your Speed by 10 feet per stack of Fervor spent until the start of your next turn, and you ignore difficult terrain for as long as the effect lasts. The bonus Speed from this technique is calculated separately from your base Speed — Dash only doubles your base Speed, not this bonus. You can spend a maximum of your Wisdom modifier + Proficiency Bonus in stacks on a single use.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> Each stack now grants +15 feet of Speed instead of +10 (the cost, duration, and stack cap don't change).</p>",
      {
        [swiftId]: makeUtilityActivity({ id: swiftId, name: "Swift", activationType: "special" }),
      }
    ),
    makeFeatureData(
      "Faith Halo",
      "Universal Fervor Technique",
      "<p><strong>Cost: 1 Fervor per stack.</strong> When you make an attack, you increase the attack roll by +1 per stack of Fervor spent (paid before you roll). You can spend a maximum of your Wisdom modifier + Proficiency Bonus in stacks on a single use.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> For every 2 additional Fervor you spend beyond the base 1-per-+1 rate, you gain an extra +1 to the attack roll. The stack cap doesn't change.</p>"
    ),
    makeFeatureData(
      "Clarity",
      "Universal Fervor Technique",
      "<p><strong>Cost: 1 Fervor per stack.</strong> As a Reaction, before making any ability check of your own, you can spend Fervor to add +1 per stack to the check. You must declare this before you roll. You can spend a maximum of your Wisdom modifier + Proficiency Bonus in stacks on a single check.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> For every 2 additional Fervor you spend beyond the base rate, you gain an extra +1 to the check. The stack cap doesn't change.</p>",
      {
        [clarityId]: makeUtilityActivity({ id: clarityId, name: "Clarity", activationType: "reaction" }),
      }
    ),
    // --- Retribution ---
    makeFeatureData(
      "Cross Slash",
      "Retribution Fervor Technique",
      "<p><strong>Cost: starts at 3 Fervor, rising with each additional attack.</strong> You make an additional weapon attack within the same turn. The cost of the Nth additional attack (beyond your base attack) is N + 2 Fervor — 3 for the first, 4 for the second, 5 for the third, and so on (see the cumulative-cost table in Sacred-Knight.md for the full progression up to 10 attacks).</p>" +
        "<p><em>Improvement (7th or 15th level).</em> The cost of the Nth additional attack drops from N + 2 to N + 1 Fervor.</p>"
    ),
    makeFeatureData(
      "Rising Dragon Strike",
      "Retribution Fervor Technique",
      "<p><strong>Cost: 3 Fervor.</strong> When you're hit by an attack, you can spend 3 Fervor to immediately make one counterattack with a weapon you're wielding. This doesn't cost your reaction. You can use this every time you're hit — it's limited only by your available Fervor, not by a per-turn cap.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> The cost drops from 3 Fervor to 2 Fervor per use.</p>",
      {
        [risingDragonStrikeId]: makeUtilityActivity({ id: risingDragonStrikeId, name: "Rising Dragon Strike", activationType: "special" }),
      }
    ),
    makeFeatureData(
      "Light Sword",
      "Retribution Fervor Technique",
      "<p><strong>Cost: 1 Fervor per stack.</strong> When you make an attack, you add 1d4 radiant damage per stack of Fervor spent. You can spend a maximum of your Wisdom modifier + Proficiency Bonus in stacks on a single attack.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> Each stack now deals 1d6 radiant damage instead of 1d4 (the number of dice and the stack cap don't change).</p>"
    ),
    // --- Guardian ---
    makeFeatureData(
      "Spirit Ward",
      "Guardian Fervor Technique",
      "<p><strong>Cost: 1 Fervor reduces damage by 2 (reaction).</strong> When you're hit by an attack and know the damage, you can spend Fervor to reduce that damage at a rate of 1 Fervor per 2 points of damage. Spending less still reduces damage proportionally. You can spend a maximum of your Wisdom modifier + Proficiency Bonus in stacks on a single reduction.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> The rate improves to a flat 1 Fervor per 3 points of damage.</p>" +
        sharedReactionNote,
      {
        [spiritWardId]: makeUtilityActivity({ id: spiritWardId, name: "Spirit Ward", activationType: "reaction" }),
      }
    ),
    makeFeatureData(
      "Guardian's Blessing",
      "Guardian Fervor Technique",
      "<p><strong>Cost: 2 Fervor per point below the DC (reaction).</strong> When you fail a saving throw, you can spend Fervor immediately after learning the result to turn that failure into a success, at a rate of 2 Fervor per point you fell short of the DC. You can cover a maximum of your Wisdom modifier + Proficiency Bonus points below the DC on a single use.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> The rate improves to a flat 1 Fervor per point.</p>" +
        sharedReactionNote,
      {
        [guardiansBlessingId]: makeUtilityActivity({ id: guardiansBlessingId, name: "Guardian's Blessing", activationType: "reaction" }),
      }
    ),
    makeFeatureData(
      "Bulwark Shift",
      "Guardian Fervor Technique",
      "<p><strong>Cost: 1 Fervor per 5 feet (reaction).</strong> You spend Fervor based on distance (1 Fervor per 5 feet) to swap places with one creature — ally or enemy — within the distance you can afford. The swapped creature is moved to a space within 5 feet of its original position (you choose where). This movement doesn't provoke opportunity attacks.</p>" +
        "<p><em>Improvement (7th or 15th level).</em> The cost is halved to 1 Fervor per 10 feet, and the creature you swap can be relocated up to 10 feet from its original position (up from 5 feet).</p>" +
        sharedReactionNote,
      {
        [bulwarkShiftId]: makeUtilityActivity({ id: bulwarkShiftId, name: "Bulwark Shift", activationType: "reaction" }),
      }
    ),
  ];
  techniquesData.forEach((f) => (f.folder = techniqueFolder.id));

  const createdTechniques = await Item.createDocuments(techniquesData);

  ui.notifications.info(
    `สร้าง Path 3 แบบ (${createdPaths.map((i) => i.name).join(", ")}) และ Fervor Technique ${createdTechniques.length} แบบเรียบร้อยแล้ว! (ยังไม่ผูก ItemChoice advancement เข้ากับ Class — ต้องทำแยกหรือลากให้ตัวละครเลือกเองผ่าน UI)`
  );
  console.log("Paths created:", createdPaths);
  console.log("Fervor Techniques created:", createdTechniques);
})();
