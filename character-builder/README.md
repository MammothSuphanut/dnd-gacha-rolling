# Character Builder — วิธีใช้

โฟลเดอร์นี้รวมเครื่องมือช่วย **สร้างตัวละคร D&D และปรึกษาเรื่อง level up** แบบสัมภาษณ์ทีละคำถาม โดยอ้างอิงข้อมูล class/subclass/feat/species/background ฯลฯ จากข้อมูลที่ mirror ไว้ในโปรเจกต์นี้ (`src/data/5etools/`) เป็นหลัก และเสริมด้วยการค้นเว็บ [5e.tools](https://5e.tools) เฉพาะตอนหาในโปรเจกต์ไม่เจอ

## แหล่งข้อมูลที่ใช้อ้างอิง

| แหล่ง | ตำแหน่งในโปรเจกต์ | ประเภทเนื้อหา |
|---|---|---|
| Official (WotC) | `src/data/5etools/official/` | class, subclass, species/race, background, feat, item, spell ฯลฯ ทั้งเวอร์ชัน 2014 (PHB) และ 2024 (XPHB) |
| Grim Hollow (Ghostfire Gaming) | `src/data/5etools/homebrew/grim-hollow/` | class/subclass/feat/species สายดาร์กแฟนตาซี |
| Valda's Spire of Secrets (Mage Hand Press) | `src/data/5etools/homebrew/valdas-spire/` | class/subclass/feat/species เสริมทางเลือกอื่นๆ |

**ดัชนี class/subclass ทั้งหมด**: [class-subclass-index.md](../codex/General/class-subclass-index.md) เป็นไฟล์ auto-generated รวมทุก class (official + homebrew) พร้อม subclass ของแต่ละ class ครบทุกตัว ระบุ edition/source/book กำกับ — สร้างขึ้นเพราะ homebrew subclass (โดยเฉพาะ Valda's Spire of Secrets ที่มีเกือบ 200 ตัว) ถูกฝังปนกับ spell/monster/item อยู่ในไฟล์ compendium ก้อนใหญ่ก้อนเดียวต่อเล่ม เปิดไฟล์ตรงๆ แล้วมีโอกาสเห็นไม่ครบ **ทุกครั้งที่จะเสนอ/เปรียบเทียบ subclass ของ class ใดก็ตาม ให้เปิดไฟล์นี้ดูรายชื่อ subclass ทั้งหมดของ class นั้นก่อนเสมอ** (ทั้ง official และ homebrew) แล้วค่อยไปอ่านรายละเอียด feature จากไฟล์ source จริงใน `src/data/5etools/` ตามที่ระบุไว้ในตาราง — ห้ามข้ามขั้นนี้แล้วไล่หาเองในไฟล์ homebrew ก้อนใหญ่ตรงๆ เพราะเป็นสาเหตุที่เคยเสนอ subclass ไม่ครบ

ถ้าข้อมูลใน `src/data/5etools/` เปลี่ยน (เพิ่ม/อัปเดต mirror) ให้รันคำสั่งนี้เพื่อ regenerate ไฟล์ดัชนีใหม่:

```
node character-builder/scripts/generate-class-subclass-index.cjs
```

## Ruleset ก่อนเริ่มสร้าง/ปรึกษาตัวละคร

ทุกครั้งที่จะใช้ข้อมูลจาก `src/data/5etools/` หรือไฟล์ดัชนี [class-subclass-index.md](../codex/General/class-subclass-index.md) เพื่อสร้างตัวละครใหม่หรือปรึกษาเรื่องตัวละครเดิม (level up, เลือก subclass/feat/spell ฯลฯ) **ต้องถามผู้ใช้ 4 คำถามนี้ก่อนเสมอ**: (ถามครั้งเดียวตอนเริ่ม — ถ้าตอบไว้แล้วในเซสชันเดียวกัน หรือมีบันทึกไว้ใน header ของ `character-sheet.md` แล้ว ให้ใช้ค่าเดิมโดยไม่ต้องถามซ้ำ เว้นแต่ผู้ใช้อยากเปลี่ยน)

1. **Edition**: 2014 หรือ 2024 — เป็นตัวกรองเนื้อหาทุกประเภท ไม่ใช่แค่ subclass แต่รวม class, species, background, feat, spell, item ฯลฯ ด้วย
   - เลือก **2014** → ใช้เฉพาะตัวเลือกที่มี edition 2014 เท่านั้น ตัดตัวเลือกที่มีเฉพาะ 2024 ทิ้งทั้งหมด
   - เลือก **2024** → ใช้ตัวเลือกทั้งหมดทั้งฝั่ง 2014 และ 2024 แต่ถ้าตัวเลือกไหนมีให้ทั้งสอง edition (เช่น subclass ที่ reprint จาก PHB เป็น XPHB) ให้ใช้เวอร์ชัน **2024 เป็นหลักเสมอ** (อ้างอิง source ฉบับ 2024)
2. **ขอบเขต class**: เอาเฉพาะ class หลัก (official) / เอาเฉพาะ class เสริม (homebrew: Grim Hollow, Valda's Spire) / เอาทั้งคู่ — เป็นตัวกรองตั้งแต่ต้น ถ้าผู้ใช้เลือกขอบเขตใดขอบเขตหนึ่ง ห้ามเสนออีกฝั่งอีกจนกว่าจะถามเปลี่ยนใจ (คนละกรณีกับกติกา "เสนอ official/homebrew เท่าเทียมกัน" ด้านล่าง ซึ่งใช้ตอนขอบเขต = ทั้งคู่)
3. **กฎพิเศษของ campaign** (ถ้ามี): เช่น ใช้ Grim Hollow: Grievous Wounds, Gritty Realism (variant rest rules) ฯลฯ ถ้ามีให้จดไว้และปรับคำแนะนำให้สอดคล้อง (เช่น Gritty Realism ทำให้ short/long rest ห่างขึ้นมาก ควรเลี่ยงแนะนำ subclass/feat ที่พึ่ง short-rest recharge หนักๆ)
4. **Level ที่ต้องการสร้าง/ปรึกษา**: level เริ่มต้นของตัวละครใหม่ (ตอนสร้าง) หรือ level เป้าหมายที่จะเลื่อนไป (ตอน level up)

บันทึกคำตอบทั้ง 4 ข้อนี้ไว้ใน header ของ `character-sheet.md` เสมอ เพื่อให้ตอนปรึกษา/level up ครั้งถัดไปอ่านจาก header แทนการถามซ้ำ

**กติกาการเสนอตัวเลือก**: ทุกครั้งที่แนะนำ class/subclass/feat/species ฯลฯ ให้ **เสนอทั้ง official และ homebrew เท่าเทียมกัน** (ตามขอบเขตที่ตอบไว้ในข้อ 2 ด้านบน) พร้อมระบุแหล่งที่มา (เช่น `PHB`, `XPHB`, `Grim Hollow - Player's Guide 2024`, `Valda's Spire of Secrets`) กำกับทุกตัวเลือกเสมอ ให้ผู้ใช้เป็นคนชั่งใจเองว่าจะเอาสายไหน — ห้ามตัดตัวเลือก homebrew ทิ้งเองโดยไม่ถาม

**ลำดับการค้นข้อมูล**: ค้นในไฟล์ local ที่ `src/data/5etools/` ก่อนเสมอ ถ้าหาไม่เจอ (เช่น errata ล่าสุด หรือ content ที่ยังไม่ได้ mirror ไว้) ค่อยเปิดเว็บค้น 5e.tools เสริม — ไม่ต้องเปิดเว็บถ้าข้อมูล local มีอยู่แล้ว

**เวลาเปรียบเทียบ/แนะนำ class ตามเกณฑ์ที่ผู้ใช้ตั้ง** (เช่น "เก่งรอบด้าน", "เบิสแรง", "เล่นได้เรื่อยๆ", "เน้น mono/group") **ห้ามเลือกตัวเลือกจากภาพจำ (fluff/flavor) ของคลาสเพียงอย่างเดียว** เพราะจะพลาดคลาสที่กลไกจริงตอบโจทย์แต่ fluff ไม่ตรงธีมที่คิดไว้ก่อน (เคยพลาดไม่เสนอ Monk ตอนถูกถามหาคลาส pure-combat ที่ครบ mono+group+burst+sustain ทั้งที่ Monk ตอบโจทย์ทุกแกน เพราะตอนแรกนึกถึงแต่ Fighter/Paladin/Barbarian ที่ "ภาพจำ" ตรงกว่า) แนวทางที่ถูกต้อง:
1. ไล่ดูรายชื่อ class ทั้งหมดที่มีจริง (เปิด [class-subclass-index.md](../codex/General/class-subclass-index.md) ดูสารบัญ class ได้เลย — ครอบคลุมทั้ง official ใน `src/data/5etools/official/class/` และ homebrew ทุกคลาสใน `src/data/5etools/homebrew/*/`) ไม่ใช่แค่คลาสที่นึกออกทันที — กติกาเดียวกันนี้ใช้กับตอนเปรียบเทียบ/เสนอ **subclass** ภายใน class เดียวกันด้วย ให้ไล่ดูตาราง subclass ของ class นั้นในไฟล์ index ให้ครบก่อนตัดตัวเลือกไหนทิ้ง
2. เช็คกลไกแต่ละคลาส (feature, resource, recharge ตอน short/long rest ฯลฯ) เทียบกับเกณฑ์ทีละแกนที่ผู้ใช้ตั้งไว้ จากข้อมูลจริงในไฟล์ ไม่ใช่จากความจำ/สมมติฐาน
3. ถ้าพบว่ามีคลาสที่เข้าเกณฑ์ดีแต่ไม่ได้เสนอไปตั้งแต่รอบแรก ให้บอกตรงๆ ว่าพลาดอะไรไป ไม่ต้องแก้ตัว

## วิธีที่ 1: ใช้ผ่าน Claude Code (แนะนำ)

### สร้างตัวละครใหม่

```
/build-character
```

หรือใส่ชื่อ/คอนเซปต์ตัวละครไปด้วยเลยก็ได้:

```
/build-character นักรบมังกรทองผู้เคร่งในคำสาบาน
```

Claude จะสัมภาษณ์ทีละหัวข้อ (ชื่อ, level เริ่มต้น, คอนเซปต์/บทบาท, edition, class, subclass, species, background, ค่าพลัง, feat, อุปกรณ์เริ่มต้น, จุดเชื่อมกับ world-setting/adventure ในโปรเจกต์ถ้ามี) — คำถามแบบเลือกตัวเลือกจะเด้งเป็นปุ่มให้กด พร้อมระบุแหล่งอ้างอิง (source book) กำกับทุกตัวเลือกเสมอ ตอนถึง subclass Claude จะแนะนำตัวเลือกที่เข้ากับคอนเซปต์ที่สุดให้เสมอ ไม่ใช่แค่แจกแจงตัวเลือก

เมื่อตอบครบทุกข้อ Claude จะสร้างไฟล์ `character-builder/<ชื่อตัวละคร>/character-sheet.md` เก็บ build เต็ม พร้อมเหตุผลของแต่ละตัวเลือก

### ปรึกษาเรื่อง level up ตัวละครเดิม

```
/level-up-character
```

หรือระบุชื่อตัวละครไปด้วยเลย:

```
/level-up-character Thalric Dawn-Shield
```

Claude จะหาไฟล์ `character-builder/<ชื่อตัวละคร>/character-sheet.md` ที่ตรงกัน (ถ้าไม่ระบุหรือหาไม่เจอจะ list ให้เลือก) อ่าน build เดิมทั้งหมด แล้วถามว่าจะเลื่อนไป level ไหน จากนั้นไล่ทีละ level ที่ข้าม ปรึกษาทางเลือกที่ปลดล็อกในแต่ละ level (ASI/feat, subclass feature, spell ที่เรียนได้, ตัวเลือก multiclass ถ้าอยากคุย) โดยอ้างอิงข้อมูลตามกติกาด้านบนเหมือนกัน

ผลลัพธ์จะ**อัปเดตไฟล์ `character-sheet.md` เดิมโดยตรง** (เป็น living doc อัปเดตสถานะปัจจุบันเสมอ ไม่สร้างไฟล์แยกต่อ level) และเพิ่มบันทึกไว้ในส่วน `## Changelog` ท้ายไฟล์ว่า level นั้นเลือกอะไร เพราะอะไร

ไฟล์คำสั่งอยู่ที่ [.claude/commands/build-character.md](../.claude/commands/build-character.md) และ [.claude/commands/level-up-character.md](../.claude/commands/level-up-character.md) ถ้าอยากปรับหัวข้อคำถามหรือรูปแบบไฟล์ผลลัพธ์ แก้ที่ไฟล์นั้นได้เลย

## โครงสร้างไฟล์ผลลัพธ์

```
character-builder/
  <slug-ชื่อตัวละคร>/
    character-sheet.md
```

`character-sheet.md` เป็นไฟล์เดียวต่อตัวละคร แบ่งเป็นหัวข้อ:

| หัวข้อ | เนื้อหา |
|---|---|
| Header | ชื่อ, edition, ขอบเขต class (official/homebrew/ทั้งคู่), กฎพิเศษ campaign (ถ้ามี), level ปัจจุบัน, class/subclass, species, background, world-setting/adventure ที่ผูกอยู่ (ถ้ามี) — 4 ข้อแรกคือคำตอบจากชุดคำถาม [Ruleset](#ruleset-ก่อนเริ่มสร้างปรึกษาตัวละคร) |
| Ability Scores & Combat Stats | ค่าพลัง 6 ตัว, saving throw, skill, AC, HP, speed, initiative |
| Features & Traits | class feature / subclass feature / species trait / feat ทั้งหมดที่มีตอนนี้ พร้อมระบุแหล่งอ้างอิง (source book) ทุกอัน |
| Equipment | อุปกรณ์/ไอเทมเริ่มต้นและที่มีตอนนี้ |
| Roleplay | บุคลิก, ideal, bond, flaw, backstory ย่อ (ถ้าผู้ใช้อยากใส่) |
| Build Notes | เหตุผลเบื้องหลังตัวเลือกสำคัญ + แผน level ล่วงหน้าคร่าวๆ ถ้าคุยกันไว้ (เช่น "วางแผน multiclass ไป Fighter ตอน level 6") |
| Changelog | บันทึกทุกครั้งที่ level up ว่าจาก level ไหนไป level ไหน วันที่ เลือกอะไรบ้าง เพราะอะไร |

**หมายเหตุ**: ไฟล์นี้เป็นเอกสารสำหรับปรึกษา/วางแผน build เท่านั้น **ไม่ sync เข้า `src/data/characters.json`** (ข้อมูลจริงที่แอปใช้แสดงผล) — ถ้าตัวละครที่ build เสร็จแล้วพร้อมเอาไปใช้ในแอป ต้องกรอกเข้า `src/data/characters.json` เอง

## จุดเชื่อมกับส่วนอื่นของโปรเจกต์

- ถ้าตัวละครผูกกับ world-setting ในโปรเจกต์ (เช่น Exandria, Forgotten Realms ที่ [world-settings/](../world-settings/)) หรือ adventure ที่ [adventures/](../adventures/) ให้ถามผู้ใช้ระหว่างสัมภาษณ์ว่าอยากผูกไหม เพื่อช่วยเลือก species/background/lore ให้เข้ากับฉาก
- ถ้าชื่อสถานที่/องค์กร/NPC ที่เกี่ยวกับ backstory ตัวละครไปใกล้เคียงกับ Critical Role canon ให้ทำตามกติกาใน [adventure-builder/canon-reference.md](../adventure-builder/canon-reference.md) เช่นเดียวกับตอนสร้าง adventure

## วิธีที่ 2: ใช้กับ AI เว็บอื่น (ChatGPT, Claude เว็บ ฯลฯ)

ยังไม่มีเวอร์ชัน prompt สำหรับใช้นอกโปรเจกต์ (ต่างจาก adventure-builder) เพราะ character builder นี้พึ่งพาข้อมูล local ที่ mirror ไว้ใน `src/data/5etools/` เป็นหลัก ถ้าต้องการใช้นอกโปรเจกต์ แนะนำเปิด [5e.tools](https://5e.tools) ประกอบการคุยแทน
