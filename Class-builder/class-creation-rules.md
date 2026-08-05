# กฎการสร้าง Class ใหม่ (Homebrew, D&D 2024)

ใช้ไฟล์นี้เวลาออกแบบ **class ใหม่ทั้ง class** (ไม่ใช่แค่ subclass ของ class เดิม — ถ้าเป็น subclass ให้ไปใช้ [subclass-creation-rules.md](subclass-creation-rules.md) แทน) อ่าน [Class-builder/README.md](README.md) ก่อนเสมอเพื่อรู้แหล่งข้อมูลอ้างอิงและข้อจำกัดของแอป

## 1. ก่อนเริ่ม: เช็คว่าจำเป็นจริงไหม

เปิด [class-subclass-index.md](../codex/General/class-subclass-index.md) ไล่ดูสารบัญ **class ทั้งหมด 31 class** (official + Grim Hollow + Valda's Spire) ก่อนเสมอ — โปรเจกต์นี้มี class ครอบคลุมบทบาทแทบทุกแบบอยู่แล้ว (Craftsman = crafting-focused, Captain = leadership/banner, Dancer = performance-combat, Warmage = battlefield caster ฯลฯ) ถ้าคอนเซปต์ที่จะสร้างมีบทบาทซ้ำกับ class ที่มีอยู่แล้วชัดเจน ให้ทักผู้ใช้ตรงๆ ว่าจะสร้าง class ใหม่จริงหรือควรทำเป็น **subclass** ของ class ที่ใกล้เคียงที่สุดแทน (ง่ายกว่า, balance ง่ายกว่า, ยังผูกเข้ากลไก roll ของแอปได้ทันทีตาม [README.md § ขอบเขตของ "class" ในแอปนี้](README.md#ขอบเขตของ-class-ในแอปนี้---ข้อจำกัดที่ต้องรู้ก่อนเริ่ม))

## 2. Design Pillars — ต้องตอบให้ได้ 4 ข้อนี้ก่อนแตะรายละเอียดกลไก

1. **Fantasy/ธีม**: class นี้ "เล่นเป็นอะไร" ในหนึ่งประโยค (เช่น Artificer = "นักประดิษฐ์ที่ผสมเวทมนตร์เข้ากับของเล่นกล")
2. **บทบาทในปาร์ตี้ (role)**: เลือกอย่างน้อย 1 หลัก — Striker (ดาเมจ), Tank (รับดาเมจ/คุมพื้นที่), Support (ฮีล/บัฟ), Controller (debuff/battlefield control) — class ส่วนใหญ่เก่ง 1-2 role ไม่ใช่ทั้งหมด (ถ้าตอบ "เก่งทุกอย่าง" ให้ทักท้วง — นั่นคือสัญญาณ overtuned)
3. **Resource หลัก**: spell slot (full/half/third caster), point pool (Ki, Sorcery Points, Rage), dice pool (Superiority Dice), หรือ per-rest use count — เป็นตัวกำหนด "จังหวะ" ของ class (resource ที่ recharge ทุก short rest เล่นบ่อย/ไม่ต้องอั้น, recharge long rest เท่านั้นต้องวางแผนระยะยาว)
4. **จุดต่างจาก class อื่นที่มีอยู่แล้ว**: กลไกอะไรที่ทำให้ class นี้ไม่ใช่แค่ "Fighter สกินใหม่" หรือ "Wizard สกินใหม่" — ต้องระบุได้ชัดหลังเช็คข้อ 1 แล้ว

## 3. Chassis (ค่าพื้นฐาน)

ตั้งค่าพวกนี้โดยเทียบกับ class official ที่ role ใกล้เคียงที่สุดจาก `src/data/5etools/official/class/`:

| หัวข้อ | แนวทาง |
|---|---|
| Hit Die | d6 (caster เปราะ), d8 (caster/hybrid ทั่วไป), d10 (martial), d12 (tank เต็มตัว เช่น Barbarian) — อย่าใช้ d12 ถ้า class ไม่ใช่ frontline tank จริง |
| Saving Throw proficiency | เลือก 2 ตัว โดยปกติคู่ที่คุมกันเอง (STR+CON, DEX+INT, WIS+CHA) — 5e ตั้งใจไม่ให้ class ไหนมี save ครบทั้ง physical (STR/DEX/CON) หรือ mental (INT/WIS/CHA) พร้อมกัน |
| Armor/Weapon proficiency | ให้สอดคล้องกับ role — full caster ปกติไม่ให้ heavy armor/martial weapon เต็มชุด (กันการเป็น tank+caster พร้อมกันฟรีๆ), martial class ให้ light+medium+heavy+shield+martial weapon |
| Skill proficiency | เลือกจาก list ที่เข้ากับธีม ให้จำนวนตามมาตรฐาน (ส่วนใหญ่ 2 จาก list 4-8 ตัว) |
| Primary ability | 1 ค่าเป็นหลัก (spellcasting ability หรือ attack ability) — อย่าให้ class ต้อง MAD (ต้องการหลายค่าพร้อมกันเกิน 2 ตัว) โดยไม่ได้ตั้งใจ |

## 4. Level Progression (1–20)

ทำตารางเต็ม 1-20 ก่อนเริ่มเขียนรายละเอียด feature โดยยึดโครงมาตรฐาน 2024:

- **ASI/feat**: เลเวล 4, 8, 12, 16, 19 (มาตรฐานทุก class ใน 2024 — บาง martial class อาจได้เพิ่มพิเศษ เช่น Fighter ได้เพิ่มที่ 6, 14 — ถ้าจะให้ class ใหม่ได้ ASI เพิ่มพิเศษ ต้องมีเหตุผลว่าทำไม class นี้ "ธรรมดา" น้อยกว่า Fighter ด้าน combat feature อื่น)
- **Subclass เลือกได้ตอนไหน**: เลเวล 1 (แบบ Cleric/Sorcerer/Warlock — ต้องมี identity ชัดตั้งแต่ต้น), เลเวล 2 (แบบ Wizard/Druid), หรือเลเวล 3 (ค่าเริ่มต้นของ class ส่วนใหญ่) — เลือกอันที่เข้ากับ fantasy ของ class (class ที่ subclass = "แหล่งพลัง" เช่น pact/god/bloodline มักได้ตอน 1)
- **Feature หลักของ class เอง** (ไม่ใช่ subclass feature): กระจายให้มีอะไรใหม่ทุก 2-4 เลเวลโดยประมาณ ไม่กระจุกอยู่แค่ต้นเกม — เทียบจังหวะกับ class official role ใกล้เคียงเป็น baseline
- **Capstone (เลเวล 20)**: ควรเป็น "signature ability" ที่รู้สึกคุ้มกับการเล่นถึงเลเวลสูงสุด แต่ไม่ควรเป็น win-button ที่จบไฟต์ทันทีแบบไม่มีเงื่อนไข (เทียบ capstone official เช่น Barbarian's Primal Champion, Wizard's Spell Mastery)

## 5. Power Budget ต่อ Tier

เช็คว่า feature ที่ให้ในแต่ละ tier ไม่แรง/อ่อนกว่า class official ที่ role ใกล้เคียงในช่วงเลเวลเดียวกันมากเกินไป — ใช้ [2024-tier-list/](../codex/2024-tier-list/) และไฟล์ class json จริงเทียบ:

| Tier | เลเวล | สิ่งที่ต้องเช็ค |
|---|---|---|
| 1 | 1–4 | class เล่นได้จริงตั้งแต่เลเวล 1 ไม่ใช่ "ต้องรอถึงเลเวล X ถึงจะมีอะไรทำ" (จุดอ่อนที่ full caster บางตัวโดนวิจารณ์) |
| 2 | 5–10 | ดาเมจ/utility หลักต้อง scale ทันจังหวะที่ extra attack (martial) หรือ 3rd-level spell slot (caster) มาถึง |
| 3 | 11–16 | feature กลางเกมต้องยังมีความหมาย ไม่ใช่แค่ "+1 ตัวเลข" ซ้ำของเดิม |
| 4 | 17–20 | เทียบกับ capstone ของ class official role เดียวกัน อย่าให้แรงเกิน/ด้อยกว่าเห็นชัด |

**วิธีเทียบตัวเลข**: ดูวิธีเต็มที่ [subclass-creation-rules.md § Balance Validation](subclass-creation-rules.md#5-balance-validation-ตัวอย่างจริง) — หลักการเดียวกัน (เทียบ DPR/utility กับ spell หรือ feature official ระดับเดียวกัน, เช็ค uses-per-rest, เช็ค action economy stacking) ใช้ได้ทั้งกับ class feature และ subclass feature

## 6. เกณฑ์ subclass ขั้นต่ำก่อนเปิดใช้จริง

Class official ใน 2024 PHB แต่ละตัวมาพร้อม subclass อย่างน้อย 4 ตัวตั้งแต่เปิดตัว เพื่อให้ผู้เล่นมีตัวเลือกจริง — class ใหม่ที่สร้างในนี้ไม่จำเป็นต้องมีครบ 4 ทันที แต่ **แนะนำอย่างน้อย 2 subclass** (คนละธีม/บทบาทกัน) ก่อนถือว่า class นี้ "พร้อมเล่นจริง" ไม่ใช่แค่ draft — แต่ละ subclass ใหม่ให้ทำตาม [subclass-creation-rules.md](subclass-creation-rules.md)

## 7. ข้อจำกัดของแอปนี้ (ต้องแจ้งผู้ใช้เสมอตอนจบ)

class ใหม่ที่สร้างในนี้ **ไม่ได้ผูกเข้ากลไก roll ของแอปอัตโนมัติ** (`src/data/classes.json` เป็นตาราง subclass ล้วนๆ ไม่มีตาราง "roll ทั้ง class") — ดูรายละเอียดที่ [README.md § ขอบเขตของ "class" ในแอปนี้](README.md#ขอบเขตของ-class-ในแอปนี้---ข้อจำกัดที่ต้องรู้ก่อนเริ่ม) ถ้าอยากให้ subclass ของ class ใหม่นี้ roll ได้ในแอป ต้องเพิ่ม `group` ใหม่เข้า `src/data/classes.json` เอง (ขอ Claude ทำให้ได้ตอนจบการสัมภาษณ์)

## 8. Output File

บันทึกเป็น `homebrew-subclass/<ClassName>/<ClassName>.md` (สร้างโฟลเดอร์ `<ClassName>` ถ้ายังไม่มี) โครงไฟล์แนะนำ:

```markdown
# Class: <ชื่อ Class>

> ประโยคเดียวสรุป fantasy/ธีมของ class (ดู Design Pillars ข้อ 1)

## Designer's Note (ถ้ามี)

แรงบันดาลใจ/ปัญหาที่อยากแก้ตอนออกแบบ class นี้

## Chassis

| หัวข้อ | ค่า |
|---|---|
| Hit Die | dX |
| Saving Throws | ... |
| Armor/Weapon Proficiency | ... |
| Skill Proficiency | เลือก N จาก: ... |
| Primary Ability | ... |

## Level Progression

| เลเวล | Proficiency Bonus | Feature |
|---|---|---|
| 1 | +2 | ... |
| ... | | |
| 20 | +6 | ... (capstone) |

## Class Features

### เลเวล 1 — <ชื่อ feature>
คำอธิบายเต็ม

(ไล่ทุกเลเวลที่มี feature ใหม่...)

## Subclass

class นี้เลือก subclass ตอนเลเวล [1/2/3] — ดู subclass ที่มีอยู่แล้วใน `homebrew-subclass/<ClassName>/`
```
