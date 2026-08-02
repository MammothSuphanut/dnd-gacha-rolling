# Character Builder — วิธีใช้

โฟลเดอร์นี้รวมเครื่องมือช่วย **สร้างตัวละคร D&D และปรึกษาเรื่อง level up** แบบสัมภาษณ์ทีละคำถาม โดยอ้างอิงข้อมูล class/subclass/feat/species/background ฯลฯ จากข้อมูลที่ mirror ไว้ในโปรเจกต์นี้ (`src/data/5etools/`) เป็นหลัก และเสริมด้วยการค้นเว็บ [5e.tools](https://5e.tools) เฉพาะตอนหาในโปรเจกต์ไม่เจอ

## แหล่งข้อมูลที่ใช้อ้างอิง

| แหล่ง | ตำแหน่งในโปรเจกต์ | ประเภทเนื้อหา |
|---|---|---|
| Official (WotC) | `src/data/5etools/official/` | class, subclass, species/race, background, feat, item, spell ฯลฯ ทั้งเวอร์ชัน 2014 (PHB) และ 2024 (XPHB) |
| Grim Hollow (Ghostfire Gaming) | `src/data/5etools/homebrew/grim-hollow/` | class/subclass/feat/species สายดาร์กแฟนตาซี |
| Valda's Spire of Secrets (Mage Hand Press) | `src/data/5etools/homebrew/valdas-spire/` | class/subclass/feat/species เสริมทางเลือกอื่นๆ |

**กติกาการเสนอตัวเลือก**: ทุกครั้งที่แนะนำ class/subclass/feat/species ฯลฯ ให้ **เสนอทั้ง official และ homebrew เท่าเทียมกัน** พร้อมระบุแหล่งที่มา (เช่น `PHB`, `XPHB`, `Grim Hollow - Player's Guide 2024`, `Valda's Spire of Secrets`) กำกับทุกตัวเลือกเสมอ ให้ผู้ใช้เป็นคนชั่งใจเองว่าจะเอาสายไหน — ห้ามตัดตัวเลือก homebrew ทิ้งเองโดยไม่ถาม

**ลำดับการค้นข้อมูล**: ค้นในไฟล์ local ที่ `src/data/5etools/` ก่อนเสมอ ถ้าหาไม่เจอ (เช่น errata ล่าสุด หรือ content ที่ยังไม่ได้ mirror ไว้) ค่อยเปิดเว็บค้น 5e.tools เสริม — ไม่ต้องเปิดเว็บถ้าข้อมูล local มีอยู่แล้ว

**เวลาเปรียบเทียบ/แนะนำ class ตามเกณฑ์ที่ผู้ใช้ตั้ง** (เช่น "เก่งรอบด้าน", "เบิสแรง", "เล่นได้เรื่อยๆ", "เน้น mono/group") **ห้ามเลือกตัวเลือกจากภาพจำ (fluff/flavor) ของคลาสเพียงอย่างเดียว** เพราะจะพลาดคลาสที่กลไกจริงตอบโจทย์แต่ fluff ไม่ตรงธีมที่คิดไว้ก่อน (เคยพลาดไม่เสนอ Monk ตอนถูกถามหาคลาส pure-combat ที่ครบ mono+group+burst+sustain ทั้งที่ Monk ตอบโจทย์ทุกแกน เพราะตอนแรกนึกถึงแต่ Fighter/Paladin/Barbarian ที่ "ภาพจำ" ตรงกว่า) แนวทางที่ถูกต้อง:
1. ไล่ดูรายชื่อ class ทั้งหมดที่มีจริงในไฟล์ local (official ทุกคลาสใน `src/data/5etools/official/class/` + homebrew ทุกคลาสใน `src/data/5etools/homebrew/*/`) ไม่ใช่แค่คลาสที่นึกออกทันที
2. เช็คกลไกแต่ละคลาส (feature, resource, recharge ตอน short/long rest ฯลฯ) เทียบกับเกณฑ์ทีละแกนที่ผู้ใช้ตั้งไว้ จากข้อมูลจริงในไฟล์ ไม่ใช่จากความจำ/สมมติฐาน
3. ถ้าพบว่ามีคลาสที่เข้าเกณฑ์ดีแต่ไม่ได้เสนอไปตั้งแต่รอบแรก ให้บอกตรงๆ ว่าพลาดอะไรไป ไม่ต้องแก้ตัว

**Edition**: ข้อมูล official มีทั้งเวอร์ชัน 2014 (`PHB` และหนังสือเก่า) และ 2024 (`XPHB` และหนังสือใหม่) ปนกันอยู่ ทุกครั้งที่เริ่มสร้างตัวละครใหม่ **ต้องถามผู้ใช้ก่อนเสมอ**ว่าจะยึด edition ไหนเป็นหลัก (2014 หรือ 2024) — ถ้าเลือก homebrew ที่มีให้ทั้งสองเวอร์ชัน (เช่น Grim Hollow, Valda's Spire) ให้ใช้ไฟล์ตัวที่ตรงกับ edition ที่เลือกไว้

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
| Header | ชื่อ, edition, level ปัจจุบัน, class/subclass, species, background, world-setting/adventure ที่ผูกอยู่ (ถ้ามี) |
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
