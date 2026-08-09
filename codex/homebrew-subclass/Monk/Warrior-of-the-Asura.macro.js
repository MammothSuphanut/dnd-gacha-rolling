/**
 * FoundryVTT V14 - dnd5e 5.x
 * สร้าง Subclass Homebrew "Warrior of the Asura" (Monastic Tradition)
 * Generated from codex/homebrew-subclass/Monk/Warrior-of-the-Asura.md — 2026-08-09
 *
 * หมายเหตุ:
 * - "Asura Strike" (ส่วนหนึ่งของ Level 3) เป็น attack + damage roll ที่ scale ตาม Focus Points ที่เสีย
 *   ไป และมีเงื่อนไข Force Crit พิเศษ — ซับซ้อนเกินจะ auto-gen เป็น Activity ตาม
 *   Class-builder/foundry-export-rules.md § 7 จึงสร้างเป็น Feature item แบบไม่มี Activity ทั้งคู่
 *   (Spirit Sphere + Asura Strike อยู่ในไฟล์ item เดียวกันตามโครง heading ต้นฉบับ)
 * - "Steel Body" (Level 11) มี action economy ชัดเจน (bonus action) + uses cap "Once per Short Rest
 *   or Long Rest" จึงมี utility activity + uses.recovery ให้
 *
 * ต้องเช็คก่อนรัน: CLASS_IDENTIFIER ควรเป็น "monk" (identifier มาตรฐานของ dnd5e system) แต่ถ้าโลก
 * Foundry ของคุณตั้ง Class item Monk ไว้ด้วย identifier อื่น ให้แก้ค่าด้านล่างให้ตรงก่อนรัน
 *
 * วิธีใช้: สร้าง Macro ใหม่ type "script" แล้ววาง code นี้ทั้งหมด กด Run (ต้องรันด้วยสิทธิ์ GM)
 */

(async () => {
  const CLASS_IDENTIFIER = "monk";
  const SUBCLASS_NAME = "Warrior of the Asura";
  const SUBCLASS_IDENTIFIER = "warrior-of-the-asura";
  const PARENT_FOLDER_PATH = ["HomeBrew Classes", "Monk"];
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

  const steelBodyId = foundry.utils.randomID();

  const featuresData = [
    makeFeatureData(
      "Spirit Sphere & Asura Strike",
      3,
      "<p><strong>Spirit Sphere.</strong> Whenever you hit a target with an Unarmed Strike, you gain 1 Spirit Sphere (maximum 5). If you end your own turn without landing a single attack, all of your Spirit Spheres are lost immediately.</p>" +
        "<p>As long as you have at least the listed number of Spirit Spheres, you gain the following benefits (benefits from lower thresholds always remain active as well):</p>" +
        "<ul>" +
        "<li>1+: Your Speed increases by 5 feet.</li>" +
        "<li>2+: When you fail a saving throw, you can spend your Reaction to reroll it once, and you must use the new result.</li>" +
        "<li>3+: The first attack you make on your turn has advantage.</li>" +
        "<li>4+: Each Focus Point you spend on Asura Strike (see below) grants a +1 bonus to that attack's attack roll.</li>" +
        "<li>5: You can use Asura Strike (see below).</li>" +
        "</ul>" +
        "<p><strong>Asura Strike.</strong> When you have 5 Spirit Spheres, you can spend your Action, Bonus Action, and all remaining Speed this turn, along with every Focus Point you currently have and all 5 Spirit Spheres, to unleash the single most devastating Unarmed Strike you can muster:</p>" +
        "<ul>" +
        "<li><strong>Attack roll</strong>: your normal attack modifier + the number of Focus Points spent.</li>" +
        "<li><strong>Damage</strong>: your Martial Arts die × (the number of Focus Points spent + 1) + your Dexterity modifier.</li>" +
        "<li><strong>Force Crit</strong>: if the total attack roll (after all bonuses) equals or exceeds the target's AC + 15 + its Proficiency Bonus, the attack automatically becomes a critical hit (a roll of 1 still always misses).</li>" +
        "</ul>" +
        "<p>After using Asura Strike, you have 0 Focus Points and 0 Spirit Spheres remaining until you next rest.</p>"
    ),
    makeFeatureData(
      "Wrathful Momentum",
      6,
      "<p>When you reduce a target to 0 hit points with an Unarmed Strike, or score a critical hit (a normal one, not a Force Crit) with an Unarmed Strike, you immediately gain 1 Spirit Sphere (not exceeding the cap of 5) and gain temporary hit points equal to your Martial Arts die + your Monk level.</p>"
    ),
    makeFeatureData(
      "Steel Body",
      11,
      "<p>Once per Short Rest or Long Rest, you can use a Bonus Action to enter this stance until the start of your next turn: you have resistance to all damage, but your Speed becomes 0 and you have disadvantage on attack rolls for the duration.</p>",
      {
        [steelBodyId]: makeUtilityActivity({
          id: steelBodyId,
          name: "Steel Body",
          activationType: "bonus",
        }),
      },
      { max: "1", spent: 0, recovery: [{ period: "sr", type: "recoverAll" }] }
    ),
    makeFeatureData(
      "Annihilating Fury",
      17,
      "<p>A Force Crit from your Asura Strike now deals triple damage instead of double damage.</p>"
    ),
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 3. สร้าง Feature Items ----------

  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 4. สร้าง Subclass Item พร้อม ItemGrant Advancement ----------

  const advancementPlan = [
    { level: 3, items: ["Spirit Sphere & Asura Strike"] },
    { level: 6, items: ["Wrathful Momentum"] },
    { level: 11, items: ["Steel Body"] },
    { level: 17, items: ["Annihilating Fury"] },
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
          "<blockquote><p>Nothing within the body deserves to be saved for tomorrow — breath, ki, the last drop of blood, all of it exists only for the single moment it is unleashed. Warriors of the Asura believe the truest fist is not the one that conserves its power, but the one that burns everything it has into a single strike.</p></blockquote>" +
          "<h3>Designer's Note</h3>" +
          "<p>Inspired by the Asura Strike skill from the Monk/Champion class in Ragnarok Online — an ultimate move that spends all of your SP and requires a special buff to unleash one attack of unimaginable force. Asura Strike is intentionally designed to be strong enough to one-shot a boss if every condition lands — a deliberate design risk, not a bug to be fixed.</p>",
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
