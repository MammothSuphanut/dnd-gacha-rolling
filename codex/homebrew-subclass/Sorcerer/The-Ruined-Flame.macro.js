/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Subclass Homebrew "The Ruined Flame" (Sorcerous Origin)
 * Generated from codex/homebrew-subclass/Sorcerer/The-Ruined-Flame.md — 2026-08-09
 *
 * ==================== หมายเหตุสำคัญ ====================
 * ทุก feature ของ subclass นี้ปรับพฤติกรรมของสเปล Fireball โดยตรง (สร้าง slot พิเศษ, เพิ่ม damage
 * pool, auto-succeed save, เปลี่ยน point of origin ฯลฯ) ซึ่งเป็นกลไกที่ผูกกับ item สเปลอีกใบ ไม่ใช่
 * activity เดี่ยวๆ ของตัว feature เอง — ตาม Class-builder/foundry-export-rules.md § 7 จึงสร้างเป็น
 * Feature item แบบไม่มี activity ทั้งหมด (คำอธิบายเต็มอยู่ใน description) ต้องอาศัยการตัดสินของ GM
 * หรือ module เสริม (เช่น Midi-QOL) ตอนใช้งานจริงที่โต๊ะ ไม่มีจุดไหนต้องต่อเติม Activity เพิ่มเอง
 * เพราะไม่มี Activity ให้ต่อตั้งแต่แรก
 *
 * ต้องเช็คก่อนรัน: CLASS_IDENTIFIER ควรเป็น "sorcerer" (identifier มาตรฐานของ dnd5e system) แต่ถ้า
 * โลก Foundry ของคุณตั้ง Class item Sorcerer ไว้ด้วย identifier อื่น ให้แก้ค่าด้านล่างให้ตรงก่อนรัน
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "sorcerer";
  const SUBCLASS_NAME = "The Ruined Flame";
  const SUBCLASS_IDENTIFIER = "the-ruined-flame";
  const PARENT_FOLDER_PATH = ["HomeBrew Classes", "Sorcerer"];
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
      "First Ember",
      3,
      "<p>You always have Fireball prepared, and it doesn't count against the number of spells you know as a Sorcerer.</p>" +
        "<p>As a bonus action, you can spend 5 Sorcery Points to create a special 3rd-level spell slot that can be used only to cast Fireball. You can convert a spell slot into Sorcery Points as part of this bonus action. Sorcery Points created this way are expended immediately and don't count toward your Sorcery Point maximum.</p>" +
        "<p>Starting at 5th level, the cost decreases to 4 Sorcery Points, and you can use this feature as part of the action you use to cast Fireball.</p>"
    ),
    makeFeatureData(
      "Shattered Flame",
      6,
      "<p>When you cast the first Fireball you cast on your turn, you can spend 2 Sorcery Points to empower it. You gain a pool of bonus fire damage equal to your Proficiency Bonus, expressed in d6s.</p>" +
        "<p>If you cast Fireball using a spell slot above 3rd level, the pool increases by 1d6 for each slot level above 3rd.</p>" +
        "<p>After the spell resolves, divide the bonus dice as evenly as possible among all creatures that took damage from the spell (any leftover die goes to a target of your choice), then roll the dice separately for each target. A target that failed its saving throw against Fireball takes the full damage from its share; a target that succeeded takes half that damage (rounded down).</p>"
    ),
    makeFeatureData(
      "Heart of Ash",
      14,
      "<p>While your Innate Sorcery is active, you gain the following benefits:</p>" +
        "<ul>" +
        "<li>You can choose yourself as the point of origin for Fireball.</li>" +
        "<li>You automatically succeed on saving throws against your own Fireball.</li>" +
        "<li>If you take fire damage from a Fireball centered on you, you regain 2 Sorcery Points. Once you regain Sorcery Points from this effect, you can't do so again until the start of your next turn.</li>" +
        "</ul>"
    ),
    makeFeatureData(
      "Walking Calamity",
      18,
      "<p>While your Innate Sorcery is active, when you cast the first Fireball you cast on your turn, you gain one of the following benefits, depending on the spell's point of origin:</p>" +
        "<p><strong>Calamity's Heart.</strong> If you choose yourself as the point of origin, you gain resistance to all damage until the end of your next turn, and you gain temporary hit points equal to 1d6 for each creature that took damage from the spell (including yourself), to a maximum of your Proficiency Bonus in d6s.</p>" +
        "<p><strong>Ruined Target.</strong> If you choose a creature as the point of origin, it has disadvantage on its saving throw. The spell ignores that target's resistance to fire damage. If it fails the saving throw, its speed becomes 0 until the start of your next turn.</p>"
    ),
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. สร้าง Subclass Item พร้อม ItemGrant Advancement ----------

  const advancementPlan = [
    { level: 3, items: ["First Ember"] },
    { level: 6, items: ["Shattered Flame"] },
    { level: 14, items: ["Heart of Ash"] },
    { level: 18, items: ["Walking Calamity"] },
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
          "<blockquote><p>A flame born of tragedy — a witch burned alive by her own self-loathing, a village consumed by madness, a soul that refuses to die. This fire is not merely an element; it is a scar that never stops burning.</p></blockquote>" +
          "<h3>Designer's Note</h3>" +
          "<p>This subclass began with watching a low-tier party get wiped by a single Fireball from an enemy, and the question that followed: \"What if Fireball were worth casting at a boss?\" The Ruined Flame solves this by letting Fireball scale against a single target (through Shattered Flame and Walking Calamity) without losing what makes the spell special — wide-area damage.</p>",
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

  ui.notifications.info(`สร้าง Subclass "${SUBCLASS_NAME}" พร้อม Feature ทั้งหมดเรียบร้อยแล้ว!`);
  console.log(`${SUBCLASS_NAME} subclass created:`, subclassItem);
  subclassItem.sheet.render(true);
})();
