/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Subclass Homebrew "Throne of Eternity and Creation" (Sacred Throne)
 * Generated from codex/homebrew-subclass/Sacred-Knight/Throne-of-Eternity-and-Creation.md — 2026-08-09
 *
 * ต้องรัน codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js (Class item) ก่อนเสมอ —
 * subclass นี้ผูกกับ classIdentifier "sacred-knight" ที่ macro นั้นสร้างไว้
 *
 * หมายเหตุ: ทุก feature ผูกกับกลไก Pure White Blade / Everlasting Grace ที่มี Fervor cost แยกตามสถานการณ์
 * จึงสร้างเป็น Feature item แบบไม่มี Activity ทั้งหมด (คำอธิบายเต็มอยู่ใน description) — ตาม
 * Class-builder/foundry-export-rules.md § 7
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "sacred-knight";
  const SUBCLASS_NAME = "Throne of Eternity and Creation";
  const SUBCLASS_IDENTIFIER = "throne-of-eternity-and-creation";
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

  const featuresData = [
    makeFeatureData(
      "Everlasting Grace",
      3,
      "<p>Whenever you use Pure White Blade, you can direct it at yourself or an ally instead of making an attack against an enemy. Doing so waives the attack roll and instead, you (or the ally) regain hit points equal to 1d4 per stack of Fervor spent, at the same 1 Fervor per stack cost and the same stack cap as Pure White Blade itself: a maximum of your Wisdom modifier + Proficiency Bonus in stacks per use, further limited by the Fervor you have available.</p>"
    ),
    makeFeatureData(
      "Genesis Wave",
      6,
      "<p>Whenever you use Pure White Blade — making Everlasting Grace to heal — every 3 Fervor you spend on that use also lets your target gain additional hit points equal to 1d4.</p>"
    ),
    makeFeatureData(
      "Undying Providence",
      10,
      "<p>Whenever you use Pure White Blade — making Everlasting Grace to heal — every 3 Fervor you spend on that use also lets your target gain temporary hit points equal to 1d4 per 3 Fervor spent + Wisdom modifier + Proficiency Bonus.</p>"
    ),
    makeFeatureData(
      "Absolute Genesis",
      14,
      "<p>The dice granted by Everlasting Grace, Genesis Wave, and Undying Providence all improve from 1d4 to 1d6.</p>"
    ),
    makeFeatureData(
      "Throne of Eternity and Creation",
      17,
      "<p>You can activate this Throne by spending spell slots with a combined level of 10 (calculated the same way as converting Fervor, but spent to activate the Throne rather than banked as Fervor). You aren't limited to activating it a fixed number of times per long rest — you're limited only by how many spell slots you have available across the day. Once activated, the Throne's effect lasts for 1 minute.</p>" +
        "<p>While active, you can use Pure White Blade or Everlasting Grace against up to a number of separate targets equal to your Wisdom modifier within a single action, paying each technique's Fervor cost separately per target.</p>" +
        "<p><em>Activation type ไม่ได้ระบุชัดในต้นฉบับ (action/bonus action) — ต่อ Activity เองใน Foundry UI ตามที่ตกลงกันที่โต๊ะ</em></p>"
    ),
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. สร้าง Subclass Item พร้อม ItemGrant Advancement ----------

  const advancementPlan = [
    { level: 3, items: ["Everlasting Grace"] },
    { level: 6, items: ["Genesis Wave"] },
    { level: 10, items: ["Undying Providence"] },
    { level: 14, items: ["Absolute Genesis"] },
    { level: 17, items: ["Throne of Eternity and Creation"] },
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
          "<blockquote><p>Where the other five Thrones are echoes of a single true seat of power, this one is the origin — the wellspring the rest were copied from. It carries no separate knightly title, because it has nothing to inherit from; it is the thing itself. Its knights don't destroy to create, or create to destroy — they simply understand that nothing is ever truly gone, only remade.</p></blockquote>" +
          "<p>A Sacred Knight who pledges to the Throne of Eternity and Creation channels Fervor into restoration as readily as into the sword — sustaining allies, healing wounds, and turning a single strike into a wave that reshapes the battlefield around it.</p>",
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
