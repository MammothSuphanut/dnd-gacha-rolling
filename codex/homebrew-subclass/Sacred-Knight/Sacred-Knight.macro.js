/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Class Homebrew "Sacred Knight" (chassis + class feature ที่ไม่ผูก Path/Throne)
 * Generated from codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.md — 2026-08-09
 *
 * ==================== ขอบเขตของ macro นี้ ====================
 * รวม:
 *   - Class item "Sacred Knight" (Hit Die d10, save Str/Wis, skill choice, weapon/armor prof พื้นฐาน)
 *   - AbilityScoreImprovement ที่เลเวล 4/8/12/16/19
 *   - Class feature ที่ "ไม่ผูก Path หรือ Sacred Throne": Fervor Awakening, Fervor Surge,
 *     Improve Fervor Technique (I)/(II), Fervor Surge Improvement, Fervor Overflow, Transcendent Fervor
 *
 * ไม่รวม (ต้องทำแยกทีหลัง):
 *   - "Choose Your Path" (เลเวล 1, เลือก Retribution/Guardian/Formless) — ต้องสร้าง 3 feature item
 *     + ItemChoice advancement เอง
 *   - "Fervor Mastery" (การเรียน Fervor Technique ที่เลเวล 1/2/5/9/13) — ต้องสร้าง Technique
 *     item ทั้ง 11 ตัว (Universal/Retribution/Guardian) + ItemChoice advancement pool เอง
 *   - Sacred Throne ทั้ง 6 แบบ (Throne-of-*.md) — export แยกด้วย /export-foundry เมื่อปรับ heading
 *     parser ให้รองรับ format "### Nth Level: Name" ของไฟล์ Throne ก่อน (ตอนนี้ /export-foundry
 *     รองรับเฉพาะ "## Level N — Name" ของไฟล์ subclass ทั่วไป) — ไม่ต้องทำอะไรเพิ่มฝั่ง Class
 *     item เพราะผู้เล่นลาก Subclass item ที่ classIdentifier ตรงกันไปวางบน actor เองได้เลย
 *   - Fervor Surge ที่เลเวล 11 ต้องอัปเดต Max Uses จาก 1 → 2 เอง (ดู comment ในโค้ดจุดสร้าง item นั้น)
 *   - Martial weapon proficiency 5 ชนิดที่ระบุเฉพาะ (Battleaxe/Longsword/Trident/War Pick/Warhammer)
 *     ไม่ได้ auto-grant เพราะ Foundry ไม่มี trait key ระดับ "เฉพาะ weapon ที่มี property Versatile"
 *     ให้เปิด Class item → tab Advancement → แก้ Trait advancement เพิ่มเอง (ดูข้อ 5 ด้านล่าง)
 *
 * ==================== ความไม่แน่นอนของ schema ====================
 * ต่างจาก macro ตัวอย่างต้นฉบับสำหรับ subclass (ที่ผู้ใช้ทดสอบรันจริงแล้ว) macro นี้เขียนจาก
 * ความรู้ schema ของ Class item ที่ยังไม่ได้ทดสอบจริงกับโลก Foundry ของผู้ใช้ — หลังรันแล้วเปิด
 * Class item เช็คทุก field ที่ระบุไว้ (โดยเฉพาะ hd.denomination, saves, skills, spellcasting,
 * Trait advancement) ว่าตรงกับที่ sheet แสดงจริงไหม ถ้า field ไหนไม่ตรง เปิด console (F12) ดู error
 * แล้วแก้ผ่าน Item sheet UI แทนได้เสมอ (ปลอดภัยกว่าแก้ raw data)
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "sacred-knight"; // Class นี้กำหนด identifier ของตัวเอง ไม่ต้องเช็คกับของเดิม
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

  // utility activity เท่านั้น (ดู Class-builder/foundry-export-rules.md § 7 สำหรับ attack/damage/save)
  function makeUtilityActivity({ id, name, activationType, uses }) {
    const activity = {
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
      uses: uses ?? { spent: 0, recovery: [] },
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
    return activity;
  }

  // ต่างจาก makeFeatureData ของ subclass ตรง type.value = "class" ไม่ใช่ "subclass"
  function makeClassFeatureData(name, level, description, activities = {}, uses) {
    return {
      name,
      type: "feat",
      img: ICON,
      system: {
        description: { value: description, chat: "" },
        requirements: `${CLASS_NAME} ${level}`,
        type: { value: "class", subtype: "" },
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

  const classFolder = await getOrCreateFolder(PARENT_FOLDER_PATH, "Item");

  // ---------- 2. เตรียมข้อมูล Feature ต่อเลเวล (เฉพาะที่ไม่ผูก Path/Throne) ----------

  const fervorSurgeId = foundry.utils.randomID();
  const transcendentFervorId = foundry.utils.randomID();

  const featuresData = [
    makeClassFeatureData(
      "Fervor Awakening",
      1,
      "<p>You've learned to draw Fervor out of yourself. As a bonus action, you can convert up to 1 spell slot into Fervor, gaining Fervor equal to the slot's level + your Wisdom modifier. This is the only way to convert a slot into Fervor — there's no option to spend your action instead.</p>" +
        "<p>Fervor Slots function exactly like a full spellcaster's spell slots for this purpose, but <strong>you can never expend a Sacred Knight spell slot to cast a spell</strong> — not even from a feat, a multiclass level, or any other source, for as long as you have at least 1 level of Sacred Knight.</p>" +
        "<p>Unspent Fervor lasts for 1 minute (10 rounds) after you gain it, then disperses.</p>"
    ),
    makeClassFeatureData(
      "Fervor Surge",
      2,
      "<p>Once per short rest, when you take the bonus action to convert a spell slot into Fervor, you can spend a use of Fervor Surge to convert one additional slot as part of the same bonus action (bringing the total to 2 slots converted in that bonus action). This doesn't cost an extra action. Your Wisdom modifier applies separately to the additional slot.</p>" +
        "<p>You can use Fervor Surge only once per turn, no matter how many uses per short rest you have available.</p>" +
        "<p><strong>เตือน:</strong> ที่เลเวล 11 (Fervor Surge Improvement) Max Uses ของ feature นี้ต้องอัปเดตจาก 1 เป็น 2 เอง — macro นี้ไม่ได้ผูก Active Effect เชื่อมสอง feature นี้อัตโนมัติ</p>",
      {
        [fervorSurgeId]: makeUtilityActivity({
          id: fervorSurgeId,
          name: "Fervor Surge",
          activationType: "special", // ใช้ร่วมกับ bonus action ของ Fervor Awakening ไม่ใช่ action แยก
          uses: { max: "1", spent: 0, recovery: [{ period: "sr", type: "recoverAll" }] },
        }),
      }
    ),
    makeClassFeatureData(
      "Improve Fervor Technique (I)",
      7,
      "<p>Choose one Fervor Technique you know (from the Universal, Retribution, or Guardian lists, or one granted by your Sacred Throne) and upgrade it permanently — see each technique's own Improvement entry for what it grants. You gain this feature again at 15th level (<em>Improve Fervor Technique (II)</em>) and must choose a different technique each time.</p>" +
        "<p><strong>Manual step:</strong> Fervor Technique items ยังไม่ถูกสร้างโดย macro นี้ — track การอัปเกรดบน sheet เองจนกว่าจะ import technique pool</p>"
    ),
    makeClassFeatureData(
      "Fervor Surge Improvement",
      11,
      "<p><em>Fervor Surge</em> becomes more efficient — you can now use it twice per short rest, up from once. You're still limited to using it only once per turn.</p>" +
        "<p><strong>Manual step:</strong> เปิด Feature item \"Fervor Surge\" → Activities → แก้ Max Uses จาก 1 เป็น 2</p>"
    ),
    makeClassFeatureData(
      "Improve Fervor Technique (II)",
      15,
      "<p>As <em>Improve Fervor Technique (I)</em> at 7th level, but you must choose a technique you haven't already improved.</p>"
    ),
    makeClassFeatureData(
      "Fervor Overflow",
      18,
      "<p>Converting spell slots into Fervor becomes more efficient — your bonus action can now convert 2 slots at once automatically, every turn, up from 1 (this is the only permanent increase to your bonus-action cap across the whole class; your Wisdom modifier still applies separately to each slot). <em>Fervor Surge</em> still functions after this level, pushing you to 3 slots in the bonus action you use it (still limited to once per turn, and to your uses per short rest from <em>Fervor Surge Improvement</em>).</p>"
    ),
    makeClassFeatureData(
      "Transcendent Fervor",
      20,
      "<p>Once per long rest, when you take a short rest, you can choose to have that short rest restore all of your spell slots to their maximum, exactly as a long rest would — solely for the purpose of converting them into Fervor. This doesn't restore hit points, Hit Dice, or any other benefit tied to a long rest, and you can use it only once between long rests.</p>" +
        "<p>The rule that Fervor fades after 1 minute (10 rounds) still applies without exception, even at 20th level.</p>",
      {
        [transcendentFervorId]: makeUtilityActivity({
          id: transcendentFervorId,
          name: "Transcendent Fervor",
          activationType: "special", // trigger ตอนเลือกทำ short rest ไม่ใช่ action ปกติ
          uses: { max: "1", spent: 0, recovery: [{ period: "lr", type: "recoverAll" }] },
        }),
      }
    ),
  ];
  featuresData.forEach((f) => (f.folder = classFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. Advancement plan ----------

  const itemGrantPlan = [
    { level: 1, items: ["Fervor Awakening"] },
    { level: 2, items: ["Fervor Surge"] },
    { level: 7, items: ["Improve Fervor Technique (I)"] },
    { level: 11, items: ["Fervor Surge Improvement"] },
    { level: 15, items: ["Improve Fervor Technique (II)"] },
    { level: 18, items: ["Fervor Overflow"] },
    { level: 20, items: ["Transcendent Fervor"] },
  ];

  const asiLevels = [4, 8, 12, 16, 19];

  const advancement = {};

  // HitPoints — เลเวล 1 เสมอ, ไม่ต้องมี configuration
  {
    const id = foundry.utils.randomID();
    advancement[id] = {
      _id: id,
      type: "HitPoints",
      level: 1,
      configuration: {},
      value: {},
      flags: {},
      hint: "",
    };
  }

  // Trait — weapon/armor proficiency พื้นฐานที่แน่ใจ schema (ดู comment หัวไฟล์เรื่อง 5 martial weapon ที่ไม่รวม)
  {
    const id = foundry.utils.randomID();
    advancement[id] = {
      _id: id,
      type: "Trait",
      level: 1,
      configuration: {
        grants: ["armor:lgt", "armor:med", "weapon:sim"],
        choices: [],
        allowReplacements: false,
      },
      value: {},
      flags: {},
      hint: "Martial weapon เฉพาะที่มี property Versatile (Battleaxe/Longsword/Trident/War Pick/Warhammer) ต้องเพิ่มเองผ่าน UI",
    };
  }

  // ItemGrant — class feature ที่ไม่ผูก Path/Throne
  for (const entry of itemGrantPlan) {
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

  // AbilityScoreImprovement — เลเวล 4/8/12/16/19
  for (const level of asiLevels) {
    const id = foundry.utils.randomID();
    advancement[id] = {
      _id: id,
      type: "AbilityScoreImprovement",
      level,
      configuration: { points: 2, fixed: {}, cap: 20 },
      value: {},
      flags: {},
      hint: "",
    };
  }

  // ---------- 5. สร้าง Class Item ----------

  const classData = {
    name: CLASS_NAME,
    type: "class",
    img: ICON,
    folder: classFolder.id,
    system: {
      description: {
        value:
          "<blockquote><p>A warrior who looks inward before looking outward. The deeper a Sacred Knight understands their own convictions, the more of their inner Fervor they can call upon — a burning devotion that sharpens a blade, steadies a shield, and refuses to bend. This power answers only to the disciplined and the Lawful; it has no interest in the lawless or the uncommitted.</p></blockquote>" +
          "<h3>Designer's Note</h3>" +
          "<p>The Sacred Knight draws its inspiration from the Knight orders of <em>Throne of Seal</em> (神印王座), which splits its knights into Guardian Knights (defense/support) and Retribution Knights (offense/punishment). The class was built around two experiments: giving a martial class a resource pool that looks exactly like a caster's spell slots but can never be used to cast a spell, and tying that resource's availability to alignment (must be Lawful) rather than treating alignment as pure flavor.</p>" +
          "<h3 style=\"color:#b91c1c\">⚠️ กติกาสำคัญที่ Foundry บังคับไม่ได้อัตโนมัติ</h3>" +
          "<p><strong>ห้าม cast spell ด้วย Fervor Slot เด็ดขาด</strong> ไม่ว่าจะจากฟีตหรือ multiclass ใดก็ตาม ตราบใดที่ยังมีอย่างน้อย 1 เลเวลใน Sacred Knight — sheet นี้ตั้ง spellcasting progression เป็น \"full\" เพื่อให้ Foundry แสดง slot pip 1-9 สำหรับ track Fervor เท่านั้น ไม่ได้เปิดให้ cast จริง ต้องคุมกันเองที่โต๊ะ</p>" +
          "<p><strong>ต้องเป็น Lawful เท่านั้น</strong> (Lawful Good/Neutral/Evil) จึงใช้ feature ที่ผูกกับคำว่า \"Fervor\" ได้ทั้งหมด ถ้าเปลี่ยนเป็น non-Lawful ทุก Fervor feature ปิดใช้งานทันทีจนกว่าจะกลับมา Lawful (Fervor ที่ถืออยู่ไม่หาย แค่ใช้ไม่ได้ชั่วคราว)</p>" +
          "<p>Class item นี้สร้างแค่ chassis + feature ที่ไม่ผูก Path/Sacred Throne — ยังไม่รวม \"Choose Your Path\" (เลเวล 1), Fervor Technique pool (เลเวล 1/2/5/9/13), และ Sacred Throne ทั้ง 6 แบบ ดู comment หัวไฟล์ macro สำหรับขั้นตอนถัดไป</p>",
        chat: "",
      },
      identifier: CLASS_IDENTIFIER,
      levels: 1,
      hd: { denomination: "d10", spent: 0, additional: "" },
      saves: ["str", "wis"],
      skills: {
        number: 2,
        choices: ["ath", "ins", "itm", "prc", "per", "rel"],
        value: [],
      },
      spellcasting: { progression: "full", ability: "wis" },
      advancement,
      source: { revision: 1, rules: "2024" },
    },
    effects: [],
    flags: {},
  };

  const [classItem] = await Item.createDocuments([classData]);

  ui.notifications.info(`สร้าง Class "${CLASS_NAME}" (chassis + feature ที่ไม่ผูก Path/Throne) เรียบร้อยแล้ว!`);
  console.log("Sacred Knight class created:", classItem);
  classItem.sheet.render(true);
})();
