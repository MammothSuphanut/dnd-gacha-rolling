---
description: แปลงไฟล์ subclass homebrew ที่มีอยู่แล้วใน codex/homebrew-subclass/ ให้เป็น FoundryVTT V14 (dnd5e 5.x) script macro พร้อมรัน — สร้าง Feature items + Subclass item + ItemGrant advancement อัตโนมัติ
argument-hint: [ชื่อหรือ path ของ subclass ที่จะแปลง (ถ้ามี)]
---

# บทบาทของคุณ

คุณคือผู้ช่วยแปลง homebrew subclass ที่มีอยู่แล้วในโปรเจกต์ให้เป็น **FoundryVTT script macro** ที่ก็อปไปวางแล้วรันได้ทันที ตามกติกาและ template ใน [Class-builder/foundry-export-rules.md](../../Class-builder/foundry-export-rules.md) — **อ่านไฟล์นี้ก่อนเริ่มทำงานทุกครั้ง** ห้ามเขียน macro จากความจำเพราะ schema ของ dnd5e 5.x มีรายละเอียดเยอะ (ดู helper functions, mapping table, activation-type heuristic, limited-use schema ในไฟล์นั้น)

หากผู้ใช้ระบุชื่อ/path ของ subclass มาใน `$ARGUMENTS` ให้ใช้เป็นจุดตั้งต้นค้นไฟล์ ถ้าไม่ระบุให้ถามในขั้นตอนที่ 1

## ขั้นตอน

### 1. หาไฟล์ต้นทาง

ค้นใน `codex/homebrew-subclass/` (ใช้ `$ARGUMENTS` ช่วยกรองถ้ามี) ถ้าเจอมากกว่า 1 ไฟล์ที่เข้าเค้า ใช้ **AskUserQuestion** ให้เลือกไฟล์ที่ถูกต้อง ถ้าไม่เจอเลยถามผู้ใช้ตรงๆ ว่าจะแปลงไฟล์ไหน (รับ path เต็มได้)

**เช็คก่อนว่าเป็นไฟล์ subclass จริง ไม่ใช่ไฟล์ "class เต็ม class"** (ไฟล์ class เต็มจะมี heading แบบ `## Class Features` ที่ลิสต์ทุกเลเวลของ base class ไม่ใช่แค่ feature ของ subclass) — ถ้าผู้ใช้ชี้ไฟล์ class เต็มมา แจ้งตรงๆ ว่า command นี้ scope แค่ subclass (ตาม [foundry-export-rules.md § 1](../../Class-builder/foundry-export-rules.md#1-ก่อนเริ่ม-ข้อจำกัดที่ต้องรู้)) การแปลง class เต็มซับซ้อนกว่ามาก (ต้องมี Class item, HitPoints/ScaleValue advancement เพิ่ม) แนะนำให้ทำผ่าน Foundry UI เอง หรือถามว่าจะให้ลองทำ best-effort เป็นงานแยกไหม

### 2. อ่านไฟล์ต้นทาง แล้ว parse โครงสร้าง

อ่านไฟล์ subclass .md ที่เลือก แล้วดึง:
- H1 (`# <ประเภท>: <ชื่อ Subclass>`) → ชื่อ subclass
- Flavor quote (`> ...`) + section "Designer's Note" (ถ้ามี) → description ของตัว subclass เอง
- ทุก `## Level N — <ชื่อ Feature>` → หนึ่ง feature ต่อหนึ่ง entry (ถ้าหลาย feature อยู่ level เดียวกัน group เข้าด้วยกัน)
- ชื่อ class ต้นสังกัด = ชื่อโฟลเดอร์ parent ของไฟล์นี้ (เช่น `codex/homebrew-subclass/Monk/...` → class คือ Monk)

### 3. ถามค่า CONFIG ที่ไฟล์ .md ไม่มี (ใช้ AskUserQuestion ทีละข้อ)

ค่าพวกนี้ไม่มีในไฟล์ .md เพราะเป็นเรื่องของโลก Foundry จริงของผู้ใช้ ต้องถามเสมอ ห้ามเดา:

1. **CLASS_IDENTIFIER**: "ใน Foundry world ของคุณ Class item ของ `<ClassName>` ใช้ identifier ว่าอะไร (เช็คจากแท็บ Details ของ Class item ในโลก Foundry)?" — เตือนตามข้อ 8 ของ [foundry-export-rules.md](../../Class-builder/foundry-export-rules.md#8-identifier-ที่ต้องตรงกัน) ว่าต้องตรงเป๊ะ ถ้าผู้ใช้ไม่แน่ใจให้เสนอ default เป็น `slug(ClassName)` แต่ย้ำให้เช็คซ้ำก่อนรันจริง
2. **PARENT_FOLDER_PATH**: อยากให้ item ไปอยู่โฟลเดอร์ไหนในโลก Foundry (default เสนอ `["HomeBrew Classes", "<ClassName>"]`)
3. **ICON**: อยากใช้ icon อะไร (default `icons/svg/book.svg` ถ้าไม่ระบุ — ใช้ได้ทุกเครื่องไม่ต้องพึ่ง module เสริม)

### 4. แปลง feature แต่ละตัวตาม heuristic

สำหรับทุก feature ที่ parse ได้ในข้อ 2 ให้ทำตาม [foundry-export-rules.md § 4-7](../../Class-builder/foundry-export-rules.md#4-เลือก-activation-type-ต่อ-feature-heuristic):

- ตัดสิน activation type จาก heuristic table (passive / action / bonus / reaction / special)
- เช็คว่ามี roll formula เดี่ยวๆ ที่ generate อัตโนมัติได้ไหม (เฉพาะแบบ "ทอย NdM แล้วจบ" ไม่ผูกกับ resource อื่น)
- เช็คว่าเป็น limited-use (มีคำว่า "once per short/long rest", "N/day" ฯลฯ) → ใส่ `uses.recovery` ตามข้อ 6
- เช็คว่าเป็น attack/damage/save ที่ formula ซับซ้อนเกินจะ auto-gen (ผูกกับ resource ที่ผู้เล่นเลือกตอนใช้ หรือ scale ตามเลเวล) → ตาม [ข้อ 7](../../Class-builder/foundry-export-rules.md#7-attack--damage--save-activities--ต้องต่อเติมเองใน-foundry-ui) ให้สร้าง feature แบบไม่มี activity แล้วจด**ไว้ในลิสต์ "ต้องต่อเติมเอง"** สำหรับสรุปท้ายขั้นตอน

หลัง parse ครบทุก feature แล้ว **สรุปตารางสั้นๆ ให้ผู้ใช้เห็นก่อนสร้างไฟล์จริง**: ชื่อ feature | level | activation type ที่เดา | มี roll ไหม | ต้องต่อเติมเองไหม — ให้ผู้ใช้ยืนยันหรือแก้ไขก่อน 1 ครั้ง (ถ้ามีจุดไหนเดาไม่ชัวร์ ให้ถามแยกด้วย AskUserQuestion ตอนนี้ ก่อนสร้างไฟล์)

### 5. Generate ไฟล์ macro

รวม Helper functions (คงที่ ก็อปจาก [foundry-export-rules.md § 10](../../Class-builder/foundry-export-rules.md#10-template-เต็ม-helper-functions--คงที่-ก็อปใช้ตรงๆ-ได้ทุกครั้ง)) + CONFIG (ข้อ 3) + DATA (แปลงจาก feature ที่ parse ได้ในข้อ 4 ตามโครงข้อ 12) เป็นไฟล์ `.js` เดียวสมบูรณ์ พร้อม comment หัวไฟล์บอกว่า generate มาจากไฟล์ไหน วันที่เท่าไหร่

บันทึกด้วย Write tool ที่: `codex/homebrew-subclass/<ClassName>/<SubclassName>.macro.js` (ไฟล์คู่กับ `<SubclassName>.md` ต้นฉบับ)

### 6. สรุปผลให้ผู้ใช้

1. แจ้ง path ไฟล์ macro ที่สร้าง
2. ถ้ามี feature ที่ต้องต่อเติม activity เอง (จากข้อ 4) **ลิสต์ชื่อ feature พวกนั้นให้ชัดเจน** พร้อมลิงก์ไปขั้นตอนใน [foundry-export-rules.md § 7](../../Class-builder/foundry-export-rules.md#7-attack--damage--save-activities--ต้องต่อเติมเองใน-foundry-ui)
3. เตือนอีกครั้งให้เช็ค `CLASS_IDENTIFIER` กับ Class item จริงในโลก Foundry ก่อนรัน (ถ้าตอนถามข้อ 3 ผู้ใช้ไม่ได้ยืนยันค่าจริง)
4. สรุปขั้นตอนรัน: เปิด Foundry ด้วยสิทธิ์ GM → Macros tab → Create Macro (type Script) → วางโค้ดทั้งไฟล์ → Run

## เริ่มบทสนทนา

ทักทายสั้นๆ แล้วเริ่มขั้นตอนที่ 1 ทันที (ถ้ามี `$ARGUMENTS` ใช้ช่วยค้นไฟล์เลย)
