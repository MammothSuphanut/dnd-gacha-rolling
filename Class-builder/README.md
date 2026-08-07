# Class Builder — วิธีใช้

โฟลเดอร์นี้รวมเครื่องมือช่วย **ปรึกษาและออกแบบ homebrew class/subclass ใหม่สำหรับ D&D 2024** แบบสัมภาษณ์ทีละคำถาม (mirror pattern เดียวกับ [character-builder/](../character-builder/README.md) และ [adventure-builder/](../adventure-builder/README.md)) โดยอ้างอิงข้อมูล class/subclass ที่มีอยู่แล้วในโปรเจกต์เป็นหลัก เสริมด้วยการค้นเว็บ (5e.tools, D&D Beyond) เฉพาะตอนหาในโปรเจกต์ไม่เจอ

## แหล่งข้อมูลที่ใช้อ้างอิง

| แหล่ง | ตำแหน่งในโปรเจกต์ | ใช้ตอนไหน |
|---|---|---|
| ดัชนี class/subclass ทั้งหมด | [codex/General/class-subclass-index.md](../codex/General/class-subclass-index.md) | สำรวจว่ามี class/subclass ธีมใกล้เคียงกับที่จะสร้างอยู่แล้วหรือยัง (ทั้ง official + homebrew) ก่อนเริ่มออกแบบเสมอ — กันไม่ให้สร้างของซ้ำ niche |
| Tier list ต่อ class (2024) | [codex/2024-tier-list/](../codex/2024-tier-list/) | ใช้เทียบ "แรงแค่ไหนถึงจะสมดุล" กับ subclass official/homebrew ที่มีอยู่แล้วของ class เดียวกัน (ดู tier A/B/C แล้ววาง subclass ใหม่ไว้ tier ที่ตั้งใจ) |
| ข้อมูล class จริง (official) | `src/data/5etools/official/class/` | โครงสร้าง level progression, feature ระดับต่างๆ, saving throw/proficiency ที่แท้จริงของแต่ละ class — ใช้เทียบ chassis ตอนสร้าง class ใหม่ หรือหาระดับที่ subclass feature ปลดล็อกตอนสร้าง subclass ใหม่ |
| ข้อมูล class homebrew ที่มีอยู่ | `src/data/5etools/homebrew/grim-hollow/`, `src/data/5etools/homebrew/valdas-spire/` | ตัวอย่าง class/subclass ฝั่ง 3rd-party ที่ผ่านการ balance มาแล้ว ใช้เทียบระดับพลังได้เหมือนกับ official |
| ตัวอย่างงานจริงในโปรเจกต์ + บันทึกการปรับบาลานซ์ | [codex/homebrew-subclass/Sorcerer/The-Ruined-Flame.md](../codex/homebrew-subclass/Sorcerer/The-Ruined-Flame.md) | ตัวอย่าง subclass homebrew ที่เขียนจบแล้วและผ่านรอบ balance review จริง (เทียบดาเมจกับ Fireball/Finger of Death, แก้ปัญหา no-save burst, แก้ stacking กับ Quickened Spell) — ใช้เป็น case study เวลาทำ balance validation ตาม [subclass-creation-rules.md § Balance Validation](subclass-creation-rules.md#5-balance-validation-ตัวอย่างจริง) |

**ลำดับการค้นข้อมูล**: ค้นในไฟล์ local ของโปรเจกต์ก่อนเสมอ ถ้าหาไม่เจอ (เช่นอยากดูว่า WotC/3rd-party เคยออกแบบ archetype แนวนี้มาก่อนหรือยัง) ค่อยเปิดเว็บค้นเสริม

## ไฟล์กฎในโฟลเดอร์นี้

| ไฟล์ | ใช้ตอนไหน |
|---|---|
| [class-creation-rules.md](class-creation-rules.md) | เปิดอ่านก่อนเริ่มออกแบบ **class ใหม่ทั้ง class** (ไม่ใช่แค่ subclass) — ครอบคลุม design pillar, chassis, level progression, power budget ต่อ tier |
| [subclass-creation-rules.md](subclass-creation-rules.md) | เปิดอ่านก่อนเริ่มออกแบบ **subclass ใหม่ของ class ที่มีอยู่แล้ว** (หรือ class ใหม่ที่เพิ่งสร้าง) — ครอบคลุมระดับปลดล็อก feature, power budget เทียบ tier list, checklist ข้อผิดพลาดที่เจอบ่อย, balance validation |

## ขอบเขตของ "class" ในแอปนี้ — ข้อจำกัดที่ต้องรู้ก่อนเริ่ม

`src/data/classes.json` ที่แอป gacha ใช้จริงคือ **ตาราง roll ของ subclass** ทั้งหมด (แต่ละ entry มี `group` เป็นชื่อ class ต้นสังกัด เช่น `"group": "Sorcerer"`) ไม่มีกลไก "roll ทั้ง class" แยกต่างหาก ดังนั้น:

- **สร้าง subclass ใหม่ของ class ที่มีอยู่แล้ว** → เพิ่ม entry ใหม่ใน `src/data/classes.json` ได้ทันที (`group` = ชื่อ class เดิม, `link` = path ไปไฟล์ md ที่สร้าง) แล้ว roll ได้จริงในแอป
- **สร้าง class ใหม่ทั้ง class** → เอกสารที่ได้เป็น **design doc/homebrew supplement** (เหมือน Grim Hollow/Valda's Spire) ไม่ได้ผูกเข้ากลไก roll อัตโนมัติ ถ้าอยากให้ subclass ของ class ใหม่นี้ roll ได้ในแอป ต้องเพิ่ม `group` ใหม่ (ชื่อ class ใหม่) เข้า `src/data/classes.json` เอาเอง — แจ้งผู้ใช้ตรงๆ ตอนจบการสัมภาษณ์เสมอว่าข้อจำกัดนี้มีอยู่

## โครงสร้างไฟล์ผลลัพธ์

```
codex/homebrew-subclass/
  <ClassName>/
    <ClassName>.md       ← เอกสารของ "class ใหม่ทั้ง class" (ถ้ากำลังสร้าง class ใหม่)
    <SubclassName>.md    ← เอกสารของ subclass แต่ละตัว (ของ class เดิมหรือ class ใหม่ก็ได้)
```

- โฟลเดอร์ `<ClassName>` ตั้งชื่อตาม class ต้นสังกัดเสมอ (สร้างใหม่ถ้ายังไม่มี — เช็คก่อนว่ามีโฟลเดอร์อยู่แล้วหรือยังจาก `codex/homebrew-subclass/`)
- ไฟล์ตั้งชื่อแบบ PascalCase คั่นด้วย `-` (ตัวอย่างจริง: `The-Ruined-Flame.md`) ให้ตรงกับ `<h1>` ในไฟล์ (ตัว `homebrewRules.js` ดึง title จาก `# ` heading บรรทัดแรกอัตโนมัติ — เหมือนไฟล์ codex/ อื่นๆ ทุกไฟล์ ไม่มี loader แยกอีกต่อไปตั้งแต่ 2026-08-07)
- Route ที่แอปใช้แสดงผล: `/codex/homebrew-subclass/<ClassName>/<SubclassName>` (เหมือนไฟล์ codex/ อื่นๆ ทุกไฟล์ — ดู `src/pages/HomebrewRuleDocPage.jsx` + `src/utils/homebrewRules.js`)

## วิธีที่ 1: ใช้ผ่าน Claude Code (แนะนำ)

```
/build-class
```

หรือใส่คอนเซปต์ไปด้วยเลย:

```
/build-class subclass นักดาบที่ผูกสัญญากับเงา สาย Rogue
```

Claude จะสัมภาษณ์ทีละหัวข้อ (จะสร้าง class ใหม่หรือ subclass ใหม่, ธีม/fantasy, บทบาทในปาร์ตี้, resource หลัก, feature แต่ละเลเวล ฯลฯ) พร้อม balance-check ตามกติกาในไฟล์กฎ 2 ไฟล์ด้านบน ก่อนสร้างไฟล์จริง — ดูรายละเอียดเต็มที่ [.claude/commands/build-class.md](../.claude/commands/build-class.md)

## วิธีที่ 2: ปรึกษาแบบข้อความธรรมดา (ยังไม่อยากสร้างไฟล์)

คุยกับ Claude ตามปกติได้เลยโดยไม่ต้องเรียก `/build-class` — Claude จะใช้ [class-subclass-index.md](../codex/General/class-subclass-index.md), [2024-tier-list/](../codex/2024-tier-list/) และไฟล์กฎ 2 ไฟล์นี้ประกอบการตอบคำถาม/ระดมไอเดีย พอคุยจนได้คอนเซปต์ที่พอใจแล้วค่อยขอให้สร้างไฟล์จริงทีหลัง (Claude จะตามกติกาการตั้งชื่อโฟลเดอร์/ไฟล์ด้านบนให้อัตโนมัติ)

## จุดเชื่อมกับส่วนอื่นของโปรเจกต์

- ถ้าอยากให้ subclass ที่สร้างเสร็จ roll ได้จริงในแอป ให้ขอ Claude เพิ่ม entry เข้า `src/data/classes.json` ต่อท้ายการสัมภาษณ์ (ดูตัวอย่างจริงที่ entry `"The Ruined Flame"` กลุ่ม `"Sorcerer"`)
- ถ้า class/subclass ใหม่ผูกกับ world-setting/adventure ในโปรเจกต์ ([world-settings/](../world-settings/), [adventures/](../adventures/)) แจ้ง Claude ได้ระหว่างสัมภาษณ์เพื่อช่วยปรับ flavor ให้เข้ากับ lore
- ทุกครั้งที่สร้าง/แก้ไข subclass แล้วอยากได้รอบ balance review เต็ม ให้ขอแยกต่างหากได้ — Claude จะเทียบดาเมจ/utility กับ spell หรือ feature official ระดับเดียวกันตามวิธีที่ใช้จริงกับ The Ruined Flame ([ดูสรุปวิธี](subclass-creation-rules.md#5-balance-validation-ตัวอย่างจริง))
