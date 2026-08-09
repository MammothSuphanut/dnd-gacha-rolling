/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Subclass Homebrew "Throne of Fear and Sorrow" (Sacred Throne)
 * Generated from codex/homebrew-subclass/Sacred-Knight/Throne-of-Fear-and-Sorrow.md — 2026-08-09
 *
 * ต้องรัน codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js (Class item) ก่อนเสมอ —
 * subclass นี้ผูกกับ classIdentifier "sacred-knight" ที่ macro นั้นสร้างไว้
 *
 * หมายเหตุ: ทุก feature ผูกกับกลไก Sorrow's Toll / Faith Halo ที่มี HP-to-Fervor conversion, force-crit
 * condition, และ forced-damage capstone ที่ complex เกินจะ auto-gen เป็น Activity ได้ จึงสร้างเป็น
 * Feature item แบบไม่มี Activity ทั้งหมด (คำอธิบายเต็มอยู่ใน description) — ตาม
 * Class-builder/foundry-export-rules.md § 7
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "sacred-knight";
  const SUBCLASS_NAME = "Throne of Fear and Sorrow";
  const SUBCLASS_IDENTIFIER = "throne-of-fear-and-sorrow";
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
      "Sorrow's Toll",
      3,
      "<p>Whenever you take the bonus action to convert a spell slot into Fervor, you can also choose to pay hit points to gain bonus Fervor, at a rate of 3 hit points per 1 Fervor, up to a maximum of your Wisdom modifier in bonus Fervor gained this way.</p>"
    ),
    makeFeatureData(
      "Moment of Dread",
      6,
      "<p>When you make an attack using Faith Halo, if the resulting attack roll is at least the target's AC + 15 + the target's Proficiency Bonus, that attack counts as a critical hit. You can trigger this only once per turn.</p>" +
        "<p>Faith Halo can now stack exceeding its normal cap on a single use.</p>"
    ),
    makeFeatureData(
      "Mercy's Embrace",
      10,
      "<p>Sorrow's Toll becomes more efficient: the rate drops from 3 hit points per 1 Fervor to 2 hit points per 1 Fervor, up to the same cap of your Wisdom modifier in bonus Fervor.</p>"
    ),
    makeFeatureData(
      "Wrath of Ruin",
      14,
      "<p>When you score a critical hit with an attack using Faith Halo, that attack deals triple damage instead of double. This is still bound by Moment of Dread's once-per-turn limit.</p>"
    ),
    makeFeatureData(
      "Throne of Fear and Sorrow",
      17,
      "<p>You can activate this Throne by spending spell slots with a combined level of 10 (calculated the same way as converting Fervor, but spent to activate the Throne rather than banked as Fervor). Once activated, the Throne's effect lasts for 1 minute.</p>" +
        "<p>While active, at the start of each of your turns — no longer tied to your bonus action — you are forced to take 20 damage immediately (real damage to your current hit points, not a reduction to your maximum) in exchange for 10 Fervor automatically, along with the effects of Dash and Disengage for free that turn.</p>" +
        "<p>This cost is mandatory, not optional. If a turn passes in which you don't actually take that 20 damage — because of an immunity, a ward, or any other effect that prevents it — the Throne shuts off immediately, before its full duration ends. You can also choose to end it early yourself at any time. Running it for the full 10 rounds costs up to 200 hit points in total.</p>" +
        "<p><em>Activation type ไม่ได้ระบุชัดในต้นฉบับ (action/bonus action) และการเสียเลือด/รับ Fervor อัตโนมัติทุกเทิร์นไม่สามารถ auto-gen เป็น Activity ได้ — ต่อ Activity หรือ Active Effect เองใน Foundry UI ตามที่ตกลงกันที่โต๊ะ</em></p>"
    ),
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. สร้าง Subclass Item พร้อม ItemGrant Advancement ----------

  const advancementPlan = [
    { level: 3, items: ["Sorrow's Toll"] },
    { level: 6, items: ["Moment of Dread"] },
    { level: 10, items: ["Mercy's Embrace"] },
    { level: 14, items: ["Wrath of Ruin"] },
    { level: 17, items: ["Throne of Fear and Sorrow"] },
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
          "<blockquote><p>Known in the ranks as the Knight of Destruction and Forgiveness — a title that carries its own contradiction. A knight of this Throne is devastating without restraint, and merciful without hesitation, and never sees those two truths as being in conflict. They break their enemies first, and only afterward decide whether to spare them.</p></blockquote>",
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
