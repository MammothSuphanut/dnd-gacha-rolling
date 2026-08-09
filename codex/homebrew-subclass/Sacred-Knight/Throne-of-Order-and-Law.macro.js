/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Subclass Homebrew "Throne of Order and Law" (Sacred Throne)
 * Generated from codex/homebrew-subclass/Sacred-Knight/Throne-of-Order-and-Law.md — 2026-08-09
 *
 * ต้องรัน codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js (Class item) ก่อนเสมอ —
 * subclass นี้ผูกกับ classIdentifier "sacred-knight" ที่ macro นั้นสร้างไว้
 *
 * หมายเหตุ: "Commander's Cadence" (เลเวล 3) เป็น feature เดียวในไฟล์นี้ที่ระบุ action economy
 * ชัดเจน ("use an action to use Swift on...") จึงมี utility activity แบบ action ให้ ส่วน feature
 * อื่นเป็น passive trigger ที่ผูกกับ Swift/Fervor ล้วน ไม่มี Activity ตาม
 * Class-builder/foundry-export-rules.md § 4, § 7
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "sacred-knight";
  const SUBCLASS_NAME = "Throne of Order and Law";
  const SUBCLASS_IDENTIFIER = "throne-of-order-and-law";
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

  function makeFeatureData(name, level, description, activities = {}, uses) {
    return {
      name,
      type: "feat",
      img: ICON,
      system: {
        description: { value: description, chat: "" },
        requirements: `${SUBCLASS_NAME} ${level}`,
        type: { value: "subclass", subtype: "" },
        properties: [],
        activities,
        uses: uses ?? { spent: 0, recovery: [] },
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

  const subclassFolder = await getOrCreateFolder([...PARENT_FOLDER_PATH, SUBCLASS_NAME], "Item");

  // ---------- 2. เตรียมข้อมูล Feature แต่ละ Level ----------

  const commandersCadenceId = foundry.utils.randomID();

  const featuresData = [
    makeFeatureData(
      "Commander's Cadence",
      3,
      "<p>You can use an action to use Swift on a friendly creature within 60 feet that you can see or hear (including yourself), granting them Speed equal to the Speed bonus Swift grants. A willing creature can spend their own reaction to move up to that Speed and then make one attack (counting as a single attack only — it doesn't trigger Extra Attack or Multiattack) or cast one cantrip with a casting time of an action or less (no spells of any other level) immediately.</p>",
      {
        [commandersCadenceId]: makeUtilityActivity({
          id: commandersCadenceId,
          name: "Commander's Cadence",
          activationType: "action",
        }),
      }
    ),
    makeFeatureData(
      "Iron Discipline",
      6,
      "<p>While you are affected by Swift, you don't provoke opportunity attacks. A friendly creature you use Swift on this way also doesn't provoke opportunity attacks for as long as its effect lasts.</p>"
    ),
    makeFeatureData(
      "Absolute Command",
      10,
      "<p>Swift's effect — whether you use it on yourself or on a friendly creature — now lasts until the start of your next turn, instead of ending as soon as it's spent.</p>"
    ),
    makeFeatureData(
      "Unyielding Law",
      14,
      "<p>Swift grants you the benefit of the Dodge action for as long as its effect lasts.</p>"
    ),
    makeFeatureData(
      "Throne of Order and Law",
      17,
      "<p>You can activate this Throne by spending spell slots with a combined level of 10 (calculated the same way as converting Fervor, but spent to activate the Throne rather than banked as Fervor). Once activated, the Throne's effect lasts for 1 minute.</p>" +
        "<p>While active, you can target a number of allies with Swift at once equal to your Wisdom modifier, instead of just one.</p>" +
        "<p><em>Activation type ไม่ได้ระบุชัดในต้นฉบับ (action/bonus action) — ต่อ Activity เองใน Foundry UI ตามที่ตกลงกันที่โต๊ะ</em></p>"
    ),
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. สร้าง Subclass Item พร้อม ItemGrant Advancement ----------

  const advancementPlan = [
    { level: 3, items: ["Commander's Cadence"] },
    { level: 6, items: ["Iron Discipline"] },
    { level: 10, items: ["Absolute Command"] },
    { level: 14, items: ["Unyielding Law"] },
    { level: 17, items: ["Throne of Order and Law"] },
  ];

  const advancement = {};
  for (const entry of advancementPlan) {
    const id = foundry.utils.randomID();
    advancement[id] = {
      _id: id,
      type: "ItemGrant",
      level: entry.level,
      configuration: {
        items: entry.items.map((n) => ({ uuid: byName[n].uuid, optional: false })),
        optional: false,
        spell: null,
      },
      flags: {},
      value: {},
      hint: "",
    };
  }

  const subclassData = {
    name: SUBCLASS_NAME,
    type: "subclass",
    img: ICON,
    folder: subclassFolder.id,
    system: {
      description: {
        value:
          "<blockquote><p>Known in the ranks as the Knight of Control and Restraint — the throne most tightly bound to what it means to be a Sacred Knight at all. Where the other five Thrones interpret Lawful conviction in their own way, this one simply is that conviction: order given shape, and discipline given a blade.</p></blockquote>",
        chat: "",
      },
      identifier: SUBCLASS_IDENTIFIER,
      classIdentifier: CLASS_IDENTIFIER,
      advancement,
      source: { revision: 1, rules: "2024" },
      spellcasting: { progression: "none", preparation: {} },
    },
    effects: [],
    flags: {},
  };

  const [subclassItem] = await Item.createDocuments([subclassData]);

  ui.notifications.info(`สร้าง Subclass "${SUBCLASS_NAME}" พร้อม Feature ทั้งหมดเรียบร้อยแล้ว! (ต้องมี Class item "Sacred Knight" อยู่ในโลกก่อน)`);
  console.log(`${SUBCLASS_NAME} subclass created:`, subclassItem);
  subclassItem.sheet.render(true);
})();
