# FoundryVTT Macro Export — แปลง Subclass (หรือ Class) เป็น Macro นำเข้าจริง (V14 + dnd5e 5.x)

ใช้ไฟล์นี้เวลาแปลงไฟล์ subclass/class ที่มีอยู่แล้วใน `codex/homebrew-subclass/<ClassName>/` ให้กลายเป็น **FoundryVTT script macro** ที่รันแล้วสร้าง Item จริงในโลก (Feature items + Subclass item + ItemGrant advancement ผูกเข้าด้วยกันอัตโนมัติ) ตาม pattern เดียวกับ macro ตัวอย่างจริงที่ใช้สร้าง subclass "Grandmaster" (Tactician) — ดู [export-foundry.md](../.claude/commands/export-foundry.md) สำหรับ command ที่ generate ให้อัตโนมัติ หรืออ่านไฟล์นี้แล้วเขียนเอง

## 1. ก่อนเริ่ม: ข้อจำกัดที่ต้องรู้

- Macro นี้สร้างแค่ **Feature items ของ subclass + Subclass item + ItemGrant advancement** เท่านั้น ไม่ได้สร้าง Class item ทั้ง class (Hit Die, saving throw proficiency, class feature เลเวลอื่นๆ, spellcasting progression ของ class)
  - ถ้า subclass เป็นของ **class official หรือ class homebrew ที่มีอยู่แล้วในโลก Foundry** (เช่น Sorcerer, Monk, หรือ Tactician ที่เคย import ไปแล้ว) → รัน macro ตัวนี้ตัวเดียวพอ
  - ถ้าเป็น subclass ของ **class ใหม่ทั้ง class ที่ยังไม่เคยมีอยู่ในโลก Foundry เลย** → ต้องสร้าง Class item (พร้อม `identifier` ที่ตั้งใจใช้) ในโลกก่อน ไม่งั้น `classIdentifier` ใน subclass จะไม่ผูกกับอะไร ตัวละครจะเลือก subclass นี้ไม่ได้ตอน level up จนกว่าจะมี class ต้นสังกัดอยู่จริง — เรื่องนี้เป็นงานคนละ scope (สร้าง Class item เต็มรูปแบบซับซ้อนกว่า subclass มาก แนะนำให้ทำผ่าน UI ของ Foundry เอง หรือแยกคุยกับ Claude เป็นงานใหม่)
- Activity ที่ macro สร้างอัตโนมัติได้ครบสมบูรณ์คือ **"utility" activity เท่านั้น** — คือ activity ที่มีแค่: activation type (action/bonus/reaction/special) + roll formula เดี่ยวๆ ที่ไม่ผูกกับ input อื่น (เช่น "ทอย 1d4")
  - Feature ที่มี **attack roll / damage roll / saving throw** ที่ formula ผูกกับค่าที่ผู้เล่นเลือกเอง (เช่น "attack modifier + Focus Points ที่ใช้", "ดาเมจ = Martial Arts die × N") **สร้างอัตโนมัติแม่นยำ 100% ไม่ได้** — macro จะสร้าง Feature item เปล่าที่มีแค่คำอธิบายเต็มไว้ก่อน แล้วต้องไปต่อเติม Activity เองใน Foundry UI (ดูข้อ 6)

## 2. โครงสร้างไฟล์ macro มาตรฐาน

```
1. CONFIG constants          — ชื่อ/identifier ของ class, subclass, folder path, icon
2. Helper functions          — slug(), getOrCreateFolder(), makeUtilityActivity(), makeFeatureData() (คงที่ ก็อปใช้ได้ทุกครั้งไม่ต้องแก้)
3. สร้าง/หาโฟลเดอร์ปลายทาง
4. เตรียมข้อมูล Feature แต่ละเลเวล (featuresData)
5. สร้าง Feature Items         — Item.createDocuments(featuresData)
6. สร้าง Subclass Item         — พร้อม ItemGrant advancement ผูกเข้ากับ Feature items ที่เพิ่งสร้าง (ต้องสร้าง Feature ก่อนเพราะ ItemGrant ต้องใช้ uuid ของ item จริง)
```

## 3. Mapping: ไฟล์ subclass .md → field ใน macro

| ในไฟล์ `codex/homebrew-subclass/<Class>/<Subclass>.md` | ใน macro |
|---|---|
| `# <ประเภท Subclass>: <ชื่อ Subclass>` (H1) | `SUBCLASS_NAME` |
| `## Level N — <ชื่อ Feature>` | หนึ่ง entry ใน `featuresData` (level N) + หนึ่ง entry ใน `advancementPlan` (level N) |
| ย่อหน้า/bullet ใต้ heading feature | แปลง markdown → HTML แล้วใส่ `system.description.value` ของ Feature item นั้น (**ตัวหนา** → `<strong>`, `- x` → `<ul><li>x</li></ul>`, ตาราง markdown → `<table>`) |
| Flavor quote บนสุด (`> ...`) + Designer's Note | ใส่รวมใน `system.description.value` ของตัว **Subclass item** เอง (ไม่ใช่ feature ไหน) |
| ชื่อ class ต้นสังกัด (จากชื่อโฟลเดอร์ `<ClassName>`) | ใช้ตั้ง `CLASS_IDENTIFIER` — **แต่ต้องเช็คค่าจริงจาก Class item ในโลก Foundry ก่อนเสมอ อย่าเดาจาก slug ชื่อเฉยๆ** (ดูข้อ 5) |

หลาย feature อยู่ level เดียวกันได้ (เช่น level 3 มี 2 feature พร้อมกัน) — `advancementPlan` แต่ละ entry รับ array ของชื่อ feature ได้มากกว่า 1 ตัว ตาม pattern ในตัวอย่างต้นฉบับ (`{ level: 3, items: ["Bonus Proficiencies", "Moving Pieces"] }`)

## 4. เลือก Activation Type ต่อ feature (heuristic)

| ข้อความในคำอธิบาย feature | `activationType` | ใส่ activity ไหม |
|---|---|---|
| ไม่มีคำระบุ action economy เลย (passive ตลอดเวลา, ไม่มีปุ่มกด) | — | ไม่ต้องใส่ activity เลย ปล่อย `activities: {}` |
| "as an action" / "spend your Action" | `"action"` | ใส่ |
| "as a bonus action" | `"bonus"` | ใส่ |
| "as a reaction" / "you can spend your Reaction to" | `"reaction"` | ใส่ |
| feature มอบ trigger/resource ให้ "ally" หรือคนอื่นใช้เอง โดยตัวเจ้าของ feature ไม่ได้เสีย action ปกติของตัวเอง (เช่น "Moving Pieces" ในตัวอย่างต้นฉบับที่ให้พันธมิตรใช้ Reaction ของเขาเอง) | `"special"` | ใส่ |
| Feature ที่ให้เลือกใช้ได้ทั้ง action/bonus/reaction แล้วแต่สถานการณ์ (rare) | `"special"` + อธิบายเงื่อนไขใน description | ใส่ |

## 5. Roll formula (utility activity เท่านั้น)

เติม `roll` key ใน activity **เฉพาะ** feature ที่ทอยลูกเต๋าเดี่ยวๆ ได้ทันทีโดยไม่ต้องอิงค่าอื่น (เช่น "roll a d4 and add the result to your AC") — ตั้ง `rollName` เป็น `"<ชื่อ Feature> Roll"` เสมอ ตามตัวอย่างต้นฉบับ (`"Perfect Defense Roll"`)

```js
activity.roll = {
  prompt: false,
  formula: "1d4",              // ดึงจากคำอธิบาย feature ตรงๆ (เช่น "Perfect Plan die" = d4)
  name: `${name} Roll`,
  visible: false,
};
```

ถ้า formula ต้องอิงตัวแปรที่ scale ตาม class level หรือ resource ที่ผู้เล่นเลือกเอง (เช่น "N × Martial Arts die") **ห้ามเดาใส่** — ปล่อย feature นั้นไม่มี `roll` แล้วไปทำต่อตามข้อ 6

## 6. Limited-use features — schema จริงของ `uses.recovery`

ตัวอย่างต้นฉบับใส่ `uses: { spent: 0, recovery: [] }` เป็น placeholder เฉยๆ (แปลว่า "ไม่จำกัดครั้ง/ไม่ auto-reset") — ถ้า feature มีข้อความ "Once per Short Rest or Long Rest", "1/day" ฯลฯ **ต้องเปลี่ยนเป็นค่าจริงแบบนี้ ไม่ปล่อย placeholder**:

```js
uses: {
  max: "1",                 // string เพราะรองรับ formula ได้ เช่น "@abilities.wis.mod"
  spent: 0,
  recovery: [
    { period: "sr", type: "recoverAll" },  // Short Rest — ใช้เมื่อ feature ฟื้นตอน short rest ด้วย
    { period: "lr", type: "recoverAll" },  // Long Rest
  ],
},
```

`period` อื่นที่ใช้ได้: `"day"` (ต่อวัน ไม่ผูก rest), `"dawn"`, `"dusk"` — ดูตัวเลือกเต็มจาก dropdown ใน Foundry UI ถ้าไม่แน่ใจ

## 7. Attack / Damage / Save activities — ต้องต่อเติมเองใน Foundry UI

สำหรับ feature ที่มี attack roll, damage roll, หรือ saving throw ที่ formula ซับซ้อน (ผูกกับ resource ที่สเกลตามเลเวลหรือค่าที่ผู้เล่นเลือกตอนใช้ เช่น "attack modifier + Focus Points ที่เสียไป" หรือ "ดาเมจ = Martial Arts die × (Focus Points + 1) + DEX mod"):

1. ให้ macro สร้าง Feature item แบบ **ไม่มี activity** (แค่ `description` + `requirements` เต็ม เหมือนที่ macro ทำกับ "Perfectionist", "Strength in Numbers" ในตัวอย่างต้นฉบับ)
2. เปิด item นั้นใน Foundry → tab **Activities** → **Add Activity** → เลือกชนิด `Attack` / `Damage` / `Save` ตามจริง
3. กรอก formula ตามคำอธิบาย — field ใน Foundry UI มี autocomplete อ้างอิงตัวแปรจริงให้ (เช่น `@abilities.dex.mod`, `@classes.monk.levels`, `@prof`) ปลอดภัยกว่าเขียน JSON scaling logic เองในสคริปต์เพราะเช็ค syntax ให้ทันที
4. บันทึก แล้วทดสอบ roll จริงจาก item sheet ก่อนเอาไปใช้ในเซสชันจริง

**อย่าพยายามเขียน attack/damage/save activity object เต็มรูปแบบในสคริปต์เอง** เพราะ schema จริงของ dnd5e 5.x มี field ผูกกับ ability score / proficiency / critical rules ที่เปลี่ยนบ่อยตาม system version — เขียนผิดแล้ว item จะดู "เหมือนใช้ได้" ใน macro แต่ roll ผิดค่าใน chat โดยไม่มี error แจ้ง

## 8. identifier ที่ต้องตรงกัน

- `CLASS_IDENTIFIER` **ต้องตรงกับ `identifier` ของ Class item ที่มีอยู่แล้วในโลก Foundry เป๊ะๆ** — เช็คจริงจากแท็บ Details ของ Class item นั้นก่อนรัน (คลิกเปิด item ในโลก Foundry ดู field "Identifier") อย่าเดาจาก slug ชื่อ class เฉยๆ เพราะบางทีคนตั้ง class item ไว้ด้วย identifier ที่ต่างจากชื่อ (เช่นสะกดคนละแบบ)
- `SUBCLASS_IDENTIFIER` = `slug(SUBCLASS_NAME)` เป็นค่าใหม่ที่ macro นี้กำหนดเอง ไม่ต้องอ้างอิงอะไรที่มีอยู่ก่อน แค่ห้ามชนกับ subclass identifier อื่นของ class เดียวกันที่มีอยู่แล้วในโลก

## 9. Icon

ใช้ `"icons/svg/book.svg"` เป็น default ถ้าไม่ได้ระบุ — เป็น core icon ของ Foundry ใช้ได้ทุกเครื่องไม่ต้องพึ่ง module เสริม เปลี่ยนทีหลังในแอป Foundry เองได้เสมอ (ไม่กระทบ mechanic)

## 10. Template เต็ม (Helper functions — คงที่ ก็อปใช้ตรงๆ ได้ทุกครั้ง)

ส่วนนี้ไม่ต้องแก้ต่อ subclass — เปลี่ยนแค่ CONFIG (ข้อ 11) กับ DATA (ข้อ 12):

```js
/**
 * FoundryVTT V14 - dnd5e 5.x
 * Helper functions มาตรฐานสำหรับสร้าง Subclass Homebrew พร้อม Feature ทุก Level
 * และผูก ItemGrant advancement เข้ากับตัว Subclass อัตโนมัติ
 */

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

// utility activity เท่านั้น — ดูข้อ 7 สำหรับ attack/damage/save
function makeUtilityActivity({ id, name, activationType, rollFormula, rollName }) {
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
    uses: { spent: 0, recovery: [] }, // เปลี่ยนตามข้อ 6 ถ้า feature มี limited use
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

  if (rollFormula) {
    activity.roll = { prompt: false, formula: rollFormula, name: rollName ?? `${name} Roll`, visible: false };
  }

  return activity;
}

function makeFeatureData(name, level, description, activities = {}, { subclassName = SUBCLASS_NAME, icon = ICON } = {}) {
  return {
    name,
    type: "feat",
    img: icon,
    system: {
      description: { value: description, chat: "" },
      requirements: `${subclassName} ${level}`,
      type: { value: "subclass", subtype: "" },
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
```

## 11. CONFIG — แก้ทุกครั้งต่อ subclass

```js
const CLASS_IDENTIFIER = "<slug ของ class ต้นสังกัด — เช็คจาก Class item จริงในโลก Foundry ก่อน ดูข้อ 8>";
const SUBCLASS_NAME = "<ชื่อ subclass ตาม H1 ในไฟล์ .md>";
const SUBCLASS_IDENTIFIER = "<slug(SUBCLASS_NAME)>";
const PARENT_FOLDER_PATH = ["HomeBrew Classes", "<ชื่อ Class>"]; // ปรับตามโฟลเดอร์ที่มีอยู่จริงในโลก Foundry
const ICON = "icons/svg/book.svg";
```

## 12. DATA + สร้าง Item จริง — โครงมาตรฐาน (แทนที่ด้วยข้อมูลจาก .md จริง)

```js
(async () => {
  // ---------- 1. เตรียมโฟลเดอร์ ----------
  const subclassFolder = await getOrCreateFolder([...PARENT_FOLDER_PATH, SUBCLASS_NAME], "Item");

  // ---------- 2. เตรียม id ล่วงหน้าให้ activity แต่ละตัว (เฉพาะ feature ที่มี activity) ----------
  const someFeatureActivityId = foundry.utils.randomID();

  // ---------- 3. featuresData: หนึ่ง entry ต่อหนึ่ง "## Level N — ชื่อ" ในไฟล์ .md ----------
  const featuresData = [
    makeFeatureData(
      "<ชื่อ Feature>",
      3, // level ตาม heading
      "<p>คำอธิบายเต็ม แปลงจาก markdown เป็น HTML</p>",
      {
        // ใส่เฉพาะ feature ที่มี action economy ชัดเจน (ดูข้อ 4) — ไม่ใช่ทุก feature
        [someFeatureActivityId]: makeUtilityActivity({
          id: someFeatureActivityId,
          name: "<ชื่อ Feature>",
          activationType: "bonus", // action | bonus | reaction | special
          // rollFormula / rollName ใส่เฉพาะที่เข้าเงื่อนไขข้อ 5
        }),
      }
    ),
    // ... เพิ่ม entry ต่อทุก feature/level ที่เจอในไฟล์ .md
  ];
  featuresData.forEach((f) => (f.folder = subclassFolder.id));

  // ---------- 4. สร้าง Feature Items ----------
  const createdFeatures = await Item.createDocuments(featuresData);
  const byName = Object.fromEntries(createdFeatures.map((i) => [i.name, i]));

  // ---------- 5. Advancement plan: group feature ตาม level ----------
  const advancementPlan = [
    { level: 3, items: ["<ชื่อ Feature>", "<ชื่อ Feature 2 ถ้ามีในเลเวลเดียวกัน>"] },
    // ... ต่อทุก level ที่มี feature ใหม่
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

  // ---------- 6. สร้าง Subclass Item ----------
  const subclassData = {
    name: SUBCLASS_NAME,
    type: "subclass",
    img: ICON,
    folder: subclassFolder.id,
    system: {
      description: {
        value: "<p>Flavor quote + Designer's Note จากไฟล์ .md</p>",
        chat: "",
      },
      identifier: SUBCLASS_IDENTIFIER,
      classIdentifier: CLASS_IDENTIFIER,
      advancement,
      source: { revision: 1, rules: "2024" },
      spellcasting: { progression: "none", preparation: {} }, // เปลี่ยน progression ถ้า subclass ปลด spellcasting (ดู feature ในไฟล์ .md)
    },
    effects: [],
    flags: {},
  };

  const [subclassItem] = await Item.createDocuments([subclassData]);

  ui.notifications.info(`สร้าง Subclass "${SUBCLASS_NAME}" พร้อม Feature ทั้งหมดเรียบร้อยแล้ว!`);
  console.log(`${SUBCLASS_NAME} subclass created:`, subclassItem);
  subclassItem.sheet.render(true);
})();
```

## 13. วิธีรันจริงใน Foundry

1. เปิด Foundry World ด้วยสิทธิ์ GM
2. Sidebar → tab **Macros** → **Create Macro** → Type: **Script**
3. วางโค้ดทั้งหมด (helper functions ข้อ 10 + CONFIG ข้อ 11 + DATA ข้อ 12 รวมกันเป็นไฟล์เดียว) → กด **Save** → กด **Run**
4. เช็ค notification มุมล่างขวา + เปิด Subclass item ที่ sheet เด้งขึ้นมาอัตโนมัติ ตรวจ description/level/advancement ให้ตรงกับไฟล์ .md ต้นฉบับ
5. ถ้ามี feature ที่ข้อ 7 บอกให้ต่อเติมเอง ให้ทำตอนนี้ก่อนใช้งานจริงในเซสชัน

## 14. เชื่อมกับ command อัตโนมัติ

ไม่อยากไล่แทนค่าเองทีละจุด ใช้คำสั่ง `/export-foundry` ให้ Claude อ่านไฟล์ subclass ที่มีอยู่แล้วใน `codex/homebrew-subclass/` แล้ว generate ไฟล์ macro เต็มให้อัตโนมัติตามกติกาในไฟล์นี้ทั้งหมด (ดู [.claude/commands/export-foundry.md](../.claude/commands/export-foundry.md))

**หมายเหตุ**: `/export-foundry` ปัจจุบัน parse เฉพาะไฟล์ subclass ที่ใช้ heading `## Level N — <ชื่อ Feature>` เท่านั้น — ไฟล์บางไฟล์ในโปรเจกต์ (เช่น Sacred Throne ใน `codex/homebrew-subclass/Sacred-Knight/Throne-of-*.md`) ใช้ heading คนละแบบ (`### Nth Level: <ชื่อ Feature>` ใต้ section `## Sacred Throne Features`) — ถ้าจะ export ไฟล์แบบนี้ ต้องปรับ parser ของ command ให้รองรับ format นั้นก่อน หรือ mapping ด้วยมือ

## 15. Class Item Export — สร้าง Class ทั้ง class (แยกจาก Subclass)

ใช้ส่วนนี้เมื่ออยากสร้าง **Class item เต็มรูปแบบ** (ไม่ใช่แค่ subclass) เช่น "Sacred Knight" ทั้ง class — ดูตัวอย่างจริงที่ [codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js](../codex/homebrew-subclass/Sacred-Knight/Sacred-Knight.macro.js)

### 15.1 ต่างจาก Subclass ตรงไหน

- `type: "class"` แทน `type: "subclass"`, และ Feature item ของ class ใช้ `system.type.value: "class"` แทน `"subclass"`
- `CLASS_IDENTIFIER` ของ Class item **ตัว class เองเป็นคนกำหนด** ไม่ต้องเช็คกับของเดิมในโลก (ตรงข้ามกับ subclass ที่ต้องตรงกับ Class item ที่มีอยู่แล้ว — ดู [§8](#8-identifier-ที่ต้องตรงกัน))
- มี field chassis เพิ่มที่ subclass ไม่มี: `hd` (hit die), `saves` (saving throw proficiency), `skills` (เลือก N จาก list), `spellcasting.progression`
- มี Advancement type เพิ่มที่ subclass ไม่ค่อยได้ใช้: `HitPoints`, `Trait` (proficiency), `AbilityScoreImprovement`

### 15.2 Chassis fields (ความมั่นใจสูง ใช้ตรงๆ ได้)

```js
system: {
  identifier: "<slug ของ class เอง>",
  levels: 1,
  hd: { denomination: "d10", spent: 0, additional: "" }, // d6/d8/d10/d12 ตาม Hit Die จริง
  saves: ["str", "wis"], // ability abbreviation มาตรฐาน: str/dex/con/int/wis/cha
  skills: {
    number: 2,                                    // เลือกได้กี่ตัว
    choices: ["ath", "ins", "itm", "prc", "per", "rel"], // skill key มาตรฐานของ dnd5e
    value: [],
  },
  spellcasting: { progression: "full", ability: "wis" }, // "none"|"full"|"half"|"third"|"pact"|"artificer"
}
```

### 15.3 Advancement type เพิ่มเติมสำหรับ Class

```js
// HitPoints — ใส่ level 1 เสมอ ไม่มี configuration (Foundry คำนวณจาก hd.denomination เอง)
{ type: "HitPoints", level: 1, configuration: {}, value: {}, flags: {}, hint: "" }

// AbilityScoreImprovement — เลเวล 4/8/12/16/19 ตามปกติ (หรือเลเวลอื่นถ้า class ออกแบบเอง)
{ type: "AbilityScoreImprovement", level: 4, configuration: { points: 2, fixed: {}, cap: 20 }, value: {}, flags: {}, hint: "" }

// Trait — proficiency ที่แน่ใจ key (ดูข้อ 15.4 สำหรับ key ที่ไม่ควรเดา)
{
  type: "Trait",
  level: 1,
  configuration: { grants: ["armor:lgt", "armor:med", "weapon:sim"], choices: [], allowReplacements: false },
  value: {}, flags: {}, hint: "",
}
```

### 15.4 Proficiency key ที่ปลอดภัย vs ที่ต้องต่อเองใน UI

| Grant | key ที่ใช้ | มั่นใจแค่ไหน |
|---|---|---|
| Light armor | `"armor:lgt"` | สูง — เป็น category-level key มาตรฐานที่เสถียรข้าม version |
| Medium/Heavy armor | `"armor:med"` / `"armor:hvy"` | สูง |
| Shield | `"armor:shl"` | สูง |
| Simple weapons (ทั้งหมด) | `"weapon:sim"` | สูง |
| Martial weapons (ทั้งหมด) | `"weapon:mar"` | สูง |
| **Weapon เฉพาะชนิด** (เช่น "Longsword", "Battleaxe") | ไม่มี key ที่มั่นใจ | **ต่ำ** — key จริงต่างกันตาม version ของ dnd5e system และไม่มีตัวอย่างยืนยันแล้วในโปรเจกต์นี้ |
| **Property-based restriction** (เช่น "Martial weapon ที่มี property Versatile เท่านั้น") | ไม่มี trait key รองรับเลย | Foundry ไม่มีกลไก grant ตาม weapon property ในตัว ต้อง track ด้วย description text + GM ตัดสินเอง หรือ grant weapon เฉพาะตัวทีละชื่อผ่าน advancement UI (มี dropdown เลือกเองแม่นยำกว่าเดา key) |

**กติกา**: grant เฉพาะแถวที่ "มั่นใจสูง" ผ่าน macro เท่านั้น ส่วนที่ไม่มั่นใจให้ปล่อยไว้เป็น `hint` บอกผู้ใช้ให้ไปกดเพิ่มเองผ่าน Advancement UI ของ Foundry (ปลอดภัยกว่าเดา key ผิดแล้วดูเหมือนใช้ได้แต่ grant proficiency ผิดตัว)

### 15.5 สิ่งที่ยังไม่ auto-gen ได้ (ต้องทำแยก หรือทำมือ)

- **"เลือก 1 จากตัวเลือกหลายแบบที่แต่ละแบบให้ feature ต่างกัน"** (เช่น Sacred Knight's "Choose Your Path": Retribution/Guardian/Formless) — ต้องสร้าง feature item ของแต่ละตัวเลือกก่อน แล้วใช้ Advancement type `ItemChoice` (schema ซับซ้อนกว่า `ItemGrant` เพราะต้องมี `pool` ของ uuid ให้เลือก) — ยังไม่ได้ verify schema เต็มในโปรเจกต์นี้ แนะนำสร้าง choice items ด้วย macro แล้วตั้งค่า `ItemChoice` ผ่าน Advancement UI เอง
- **"เรียนรู้ความสามารถจาก pool ใหญ่ทีละใบ"** (เช่น Fervor Technique ที่เลือกเรียนได้ 5 จาก 11 ตลอดทั้ง class) — pattern เดียวกับข้างบน (ItemChoice) แต่ pool ใหญ่กว่า
- **Subclass ผูกเข้า Class**: ไม่ต้องทำอะไรฝั่ง Class item — ผู้เล่นลาก Subclass item ที่ `classIdentifier` ตรงกับ Class item นี้ไปวางบน actor เอง Foundry จัดการ level gate ให้อัตโนมัติจาก `advancement` ของตัว subclass item เอง (ดู [§8](#8-identifier-ที่ต้องตรงกัน))
- Attack/Damage/Save activity ที่ formula ซับซ้อน — เหมือนกับ subclass ทุกประการ ดู [§7](#7-attack--damage--save-activities--ต้องต่อเติมเองใน-foundry-ui)

### 15.6 ระดับความมั่นใจของ schema ทั้งหมด

Field ในส่วน Helper functions (§10) และ Feature item ทั่วไปมาจาก macro ตัวอย่างที่ผู้ใช้ทดสอบรันจริงแล้ว (มั่นใจสูง) — แต่ field เฉพาะของ Class item (`hd`, `saves`, `skills`, `spellcasting`, `HitPoints`/`Trait`/`AbilityScoreImprovement` advancement) เขียนจากความรู้ schema ของ dnd5e 5.x โดยยังไม่มีตัวอย่างที่ผู้ใช้ยืนยันว่ารันผ่านจริงในโปรเจกต์นี้ — **หลังรัน macro ที่สร้าง Class item ให้เปิด item เช็คทุก field ที่ sheet แสดงจริงก่อนใช้งานจริงเสมอ** ถ้ามี field ไหนไม่ตรง แก้ผ่าน Item sheet UI ได้โดยตรง ไม่กระทบ Feature items ที่สร้างไปแล้ว
