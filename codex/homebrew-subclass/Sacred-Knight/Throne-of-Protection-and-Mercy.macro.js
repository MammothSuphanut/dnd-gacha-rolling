/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Subclass Homebrew "Throne of Protection and Mercy" (Sacred Throne)
 * Generated from codex/homebrew-subclass/Sacred-Knight/Throne-of-Protection-and-Mercy.md — 2026-08-09
 *
 * ต้องรัน codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js (Class item) ก่อนเสมอ —
 * subclass นี้ผูกกับ classIdentifier "sacred-knight" ที่ macro นั้นสร้างไว้
 *
 * Prerequisite (จากไฟล์ต้นฉบับ): ต้องเลือก Guardian Path ที่เลเวล 1 — Path ยังไม่ได้ import
 * ในระบบนี้ (ดู comment ในหัวไฟล์ Sacred-Knight.macro.js) จึง prerequisite นี้ยังบังคับอัตโนมัติไม่ได้
 * ต้องเช็คเองที่โต๊ะจนกว่าจะ import Path เข้าไป
 *
 * หมายเหตุ: ทุก feature เป็น passive trigger ที่ผูกกับ Fervor/Sealed Wrath/reaction เพิ่ม ไม่มี
 * Activity เลย ตาม Class-builder/foundry-export-rules.md § 7
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "sacred-knight";
  const SUBCLASS_NAME = "Throne of Protection and Mercy";
  const SUBCLASS_IDENTIFIER = "throne-of-protection-and-mercy";
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
      "Compassion's Toll",
      3,
      "<p>Every 2 hit points or temporary hit points you lose grants you 1 Fervor, with a cap per turn equal to your Wisdom modifier + your Proficiency Bonus.</p>"
    ),
    makeFeatureData(
      "Vanguard's Instinct",
      6,
      "<p>You gain one additional reaction each turn. This bonus reaction can be used only to activate Fervor Techniques. Your normal reaction remains completely separate and free to use on anything else, including a different Fervor Technique.</p>"
    ),
    makeFeatureData(
      "Sealed Wrath",
      10,
      "<p>Whenever Spirit Ward successfully reduces damage you take (this feature works only when you use Spirit Ward on yourself), you stockpile the reduced damage into a separate pool called Sealed Wrath, at a full 1-for-1 rate. This pool is entirely separate from Fervor and doesn't have a cap.</p>" +
        "<p>The next time you land a weapon attack — on any turn — all of the Sealed Wrath you're carrying is released automatically as bonus radiant damage on that attack. This is an automatic trigger; you don't declare it or pay any additional cost. If your attack misses, your Sealed Wrath isn't lost. Like Fervor, Sealed Wrath fades 1 minute (10 rounds) after you gain it.</p>"
    ),
    makeFeatureData(
      "Endless Vigil",
      14,
      "<p>You gain one additional reaction each turn, on top of the one granted by Vanguard's Instinct. Like that reaction, this one can be used only to activate a Fervor Technique — never for anything else. Between your normal reaction, your Vanguard's Instinct reaction, and this one, you now have up to three separate reactions available each turn.</p>"
    ),
    makeFeatureData(
      "Throne of Protection and Mercy",
      17,
      "<p>You can activate this Throne by spending spell slots with a combined level of 10 (calculated the same way as converting Fervor, but spent to activate the Throne rather than banked as Fervor). Once activated, the Throne's effect lasts for 1 minute.</p>" +
        "<p>While active, you gain resistance to all damage, and Bulwark Shift no longer costs a reaction to use — for the same duration. Additionally, at the end of each of your turns, you gain temporary hit points equal to your Sacred Knight level + your Wisdom modifier.</p>" +
        "<p><em>Activation type ไม่ได้ระบุชัดในต้นฉบับ (action/bonus action) — ต่อ Activity เองใน Foundry UI ตามที่ตกลงกันที่โต๊ะ</em></p>"
    ),
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. สร้าง Subclass Item พร้อม ItemGrant Advancement ----------

  const advancementPlan = [
    { level: 3, items: ["Compassion's Toll"] },
    { level: 6, items: ["Vanguard's Instinct"] },
    { level: 10, items: ["Sealed Wrath"] },
    { level: 14, items: ["Endless Vigil"] },
    { level: 17, items: ["Throne of Protection and Mercy"] },
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
          "<blockquote><p>Known in the ranks as the Knight of Defense and Coordination — matched more closely to the Guardian Path than any other. Its knights don't just stand between danger and their allies; they hold the line, read the fight, and turn every blow they take into something the whole party benefits from.</p></blockquote>" +
          "<p><strong>Prerequisite: Guardian Path.</strong> You must have chosen the Guardian Path at 1st level to select this Sacred Throne.</p>",
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

  ui.notifications.info(`สร้าง Subclass "${SUBCLASS_NAME}" พร้อม Feature ทั้งหมดเรียบร้อยแล้ว! (ต้องมี Class item "Sacred Knight" อยู่ในโลกก่อน — และผู้เล่นต้องเลือก Guardian Path เองด้วย)`);
  console.log(`${SUBCLASS_NAME} subclass created:`, subclassItem);
  subclassItem.sheet.render(true);
})();
