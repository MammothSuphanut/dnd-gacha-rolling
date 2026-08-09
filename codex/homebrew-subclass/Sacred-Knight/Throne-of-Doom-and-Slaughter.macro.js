/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Subclass Homebrew "Throne of Doom and Slaughter" (Sacred Throne)
 * Generated from codex/homebrew-subclass/Sacred-Knight/Throne-of-Doom-and-Slaughter.md — 2026-08-09
 *
 * ต้องรัน codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js (Class item) ก่อนเสมอ —
 * subclass นี้ผูกกับ classIdentifier "sacred-knight" ที่ macro นั้นสร้างไว้
 *
 * หมายเหตุ: ทุก feature ผูกกับกลไก Fervor/Cross Slash ที่มี resource cost ซับซ้อน (ตาราง cumulative
 * cost, force-crit condition ฯลฯ) จึงสร้างเป็น Feature item แบบไม่มี Activity ทั้งหมด (คำอธิบายเต็ม
 * อยู่ใน description) ยกเว้น "Final Verdict" ที่มี uses cap ต่อ short rest ชัดเจน — ตาม
 * Class-builder/foundry-export-rules.md § 7
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "sacred-knight";
  const SUBCLASS_NAME = "Throne of Doom and Slaughter";
  const SUBCLASS_IDENTIFIER = "throne-of-doom-and-slaughter";
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
      "Blood for Blood",
      3,
      "<p>Whenever an attack made with Cross Slash reduces a target to 0 hit points, you immediately regain Fervor and hit points equal to your Wisdom modifier.</p>"
    ),
    makeFeatureData(
      "Sealed Fate",
      6,
      "<p>Cross Slash's cost for you is always calculated as though you'd already taken its Improve Fervor Technique upgrade (N+1), starting at 3rd level. If you later select Cross Slash's own improvement via Improve Fervor Technique, its cost drops further, but no lower than N (never below its improved rate).</p>"
    ),
    makeFeatureData(
      "Unrelenting Carnage",
      10,
      "<p>Attacks made with Cross Slash gain 5 feet of Speed each time you attack and your movement doesn't provoke opportunity attacks until the end of your turn.</p>"
    ),
    makeFeatureData(
      "Final Verdict",
      14,
      "<p>For every Cross Slash attack you make this turn, you gain 1 Verdict stack and it unleashes when you make your last Cross Slash attack. You roll an additional attack roll and deal additional damage equal to your weapon damage die times the number of Verdict stacks you have. You can use this once per short rest.</p>",
      {},
      { max: "1", spent: 0, recovery: [{ period: "sr", type: "recoverAll" }] }
    ),
    makeFeatureData(
      "Throne of Doom and Slaughter",
      17,
      "<p>You can activate this Throne by spending spell slots with a combined level of 10 (calculated the same way as converting Fervor, but spent to activate the Throne rather than banked as Fervor). Once activated, the Throne's effect lasts for 1 minute.</p>" +
        "<p>While active, each time you attack, your next attack that turn deals 2 additional damage until the end of your turn, and you gain 5 feet of Speed each time you attack.</p>" +
        "<p><em>Activation type ไม่ได้ระบุชัดในต้นฉบับ (action/bonus action) — ต่อ Activity เองใน Foundry UI ตามที่ตกลงกันที่โต๊ะ</em></p>"
    ),
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. สร้าง Subclass Item พร้อม ItemGrant Advancement ----------

  const advancementPlan = [
    { level: 3, items: ["Blood for Blood"] },
    { level: 6, items: ["Sealed Fate"] },
    { level: 10, items: ["Unrelenting Carnage"] },
    { level: 14, items: ["Final Verdict"] },
    { level: 17, items: ["Throne of Doom and Slaughter"] },
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
          "<blockquote><p>Known in the ranks as the Knight of Judgment and Inquisition — a pure offensive throne, matched more closely to the Retribution Path than any other. Its knights don't debate a sentence. They deliver it, blade first, and let the verdict speak for itself.</p></blockquote>" +
          "<h3>Designer's Note</h3>" +
          "<p>An earlier version of this Throne's capstone granted flat bonus damage per hit instead of Fervor. Final Verdict's current form (Fervor returned per kill, rather than damage per hit) keeps the \"kill and keep swinging\" payoff this Throne is built around, while being naturally bounded by how many enemies you can actually finish off in a turn.</p>",
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
