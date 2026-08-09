/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Subclass Homebrew "Throne of Wisdom and Spirit" (Sacred Throne)
 * Generated from codex/homebrew-subclass/Sacred-Knight/Throne-of-Wisdom-and-Spirit.md — 2026-08-09
 *
 * ต้องรัน codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js (Class item) ก่อนเสมอ —
 * subclass นี้ผูกกับ classIdentifier "sacred-knight" ที่ macro นั้นสร้างไว้
 *
 * หมายเหตุ: "Anointed Bond" (เลเวล 3) มี action economy + uses cap ชัดเจน ("bonus action",
 * "a number of times equal to your Proficiency Bonus per long rest") จึงมี utility activity +
 * uses.max = "@prof" (roll-data key มาตรฐานของ dnd5e สำหรับ Proficiency Bonus — เช็คซ้ำหลังรันว่า
 * sheet คำนวณถูกไหม) ส่วน feature อื่นเป็น passive ล้วน ไม่มี Activity ตาม
 * Class-builder/foundry-export-rules.md § 4-6
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "sacred-knight";
  const SUBCLASS_NAME = "Throne of Wisdom and Spirit";
  const SUBCLASS_IDENTIFIER = "throne-of-wisdom-and-spirit";
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

  const anointedBondId = foundry.utils.randomID();

  const featuresData = [
    makeFeatureData(
      "Anointed Bond",
      3,
      "<p>As a bonus action, choose one ally within 120 feet that you can see and designate them as your Anointed Ally. This designation lasts for 1 minute, or until you designate a different Anointed Ally, whichever comes first — you can have only one Anointed Ally at a time. You can use this feature a number of times equal to your Proficiency Bonus per long rest.</p>" +
        "<p>While a creature is your Anointed Ally, any Universal Fervor Technique you use can grant its benefit to your Anointed Ally instead of to yourself. You still choose to use the technique and still pay its Fervor cost as normal — only the recipient of the effect changes. Every later feature in this Sacred Throne refers to this designated creature as your Anointed Ally.</p>",
      {
        [anointedBondId]: makeUtilityActivity({
          id: anointedBondId,
          name: "Anointed Bond",
          activationType: "bonus",
        }),
      },
      { max: "@prof", spent: 0, recovery: [{ period: "lr", type: "recoverAll" }] }
    ),
    makeFeatureData(
      "Deepened Wisdom",
      6,
      "<p>You learn one additional Fervor Technique, chosen from the lists your Path allows — bringing your total learned techniques to six instead of the usual five.</p>" +
        "<p>Additionally, choose one Fervor Technique you know and upgrade it permanently, exactly as <em>Improve Fervor Technique</em> (7th level, base class) allows. This follows the same rules as that feature, including never upgrading the same technique twice, and is entirely separate from your two uses of <em>Improve Fervor Technique</em> granted by the base class — it doesn't use one up, and doesn't share the \"different technique each time\" restriction with them.</p>"
    ),
    makeFeatureData(
      "Shared Fate",
      10,
      "<p>Whenever you designate a creature as your Anointed Ally (see 3rd level), you and that creature each gain Heroic Inspiration if you don't already have it.</p>" +
        "<p>Additionally, whenever you have Heroic Inspiration, you can give it to your Anointed Ally as a free action instead of keeping it for yourself — you lose Heroic Inspiration when you do this, exactly as if you'd spent it.</p>"
    ),
    makeFeatureData(
      "Kindred Strength",
      14,
      "<p>Your Anointed Ally (see 3rd level) can now also receive the benefit of any Retribution or Guardian Fervor Technique you know, not just Universal ones — regardless of which Path granted you access to them. This otherwise works exactly like the 3rd-level feature: you still choose to use the technique and pay its cost, only the recipient changes, and only your current Anointed Ally can receive it.</p>"
    ),
    makeFeatureData(
      "Throne of Wisdom and Spirit",
      17,
      "<p>You can activate this Throne by spending spell slots with a combined level of 10 (calculated the same way as converting Fervor, but spent to activate the Throne rather than banked as Fervor). You must have an Anointed Ally (see 3rd level) to activate this Throne — if you don't currently have one, you can designate one as part of activating it, using one of that feature's daily uses. Once activated, the Throne's effect lasts for 1 minute.</p>" +
        "<p>While active, your Anointed Ally has advantage on attack rolls, ability checks, and saving throws. Enemies have disadvantage on attack rolls against your Anointed Ally, and disadvantage on saving throws against any effect your Anointed Ally creates.</p>" +
        "<p><em>Activation type ไม่ได้ระบุชัดในต้นฉบับ (action/bonus action) — ต่อ Activity เองใน Foundry UI ตามที่ตกลงกันที่โต๊ะ</em></p>"
    ),
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. สร้าง Subclass Item พร้อม ItemGrant Advancement ----------

  const advancementPlan = [
    { level: 3, items: ["Anointed Bond"] },
    { level: 6, items: ["Deepened Wisdom"] },
    { level: 10, items: ["Shared Fate"] },
    { level: 14, items: ["Kindred Strength"] },
    { level: 17, items: ["Throne of Wisdom and Spirit"] },
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
          "<blockquote><p>Known in the ranks as the Knight of Enlightenment and Legacy — a scholar's throne among warriors. Its knights measure their strength not by what they can strike down themselves, but by how much of it they can pour into the one person fighting beside them who needs it most.</p></blockquote>",
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
