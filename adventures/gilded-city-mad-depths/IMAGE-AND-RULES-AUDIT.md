# รายงานตรวจสอบ: รูปภาพประกอบ + การยึดกฎเกณฑ์โปรเจกต์

**แคมเปญ: Gilded City, Mad Depths — Act 1 ถึง Act 10 (ทั้งแคมเปญ)**
**วันที่ตรวจ:** 2026-08-18
**วันที่แก้ไข:** 2026-08-18 — ✅ **แก้ไขแล้ว** ดูหมวด 0 ด้านล่างสำหรับสรุปสิ่งที่แก้
**วันที่ตรวจซ้ำรอบสอง:** 2026-08-18 — ✅ พบและแก้บั๊กที่เกิดจากสคริปต์แก้ไขรอบแรกเพิ่มเติม ดูหมวด 0.1

---

## 0. สถานะหลังแก้ไข (2026-08-18)

รูปภาพถูกเพิ่มเข้าไปแล้วทุกไฟล์ที่ระบุในรายงานนี้ ยกเว้นกลุ่มที่ตัดสินใจข้ามโดยเจตนา — สรุปตัวเลขหลังแก้:

| รายการ | ก่อนแก้ | หลังแก้ |
|---|---|---|
| รูปในขอบเขตกฎที่ปรากฏจริง (จาก 201 รูป) | 68 (34%) | **168 (84%)** |
| Level ที่ไม่มีรูปเลย (จาก Level 3-23) | 21 / 21 | **0 / 21** |
| ไฟล์ CH0X brief ที่มีรูปปก WDMMC | 0 / 24 | **24 / 24** |
| รูป WDMMC ที่เคยใช้ | 0 / 35 | **12 / 35** (ที่เหลือคือรูป "Player Version" แผนที่ซ้ำ หรือรูปที่ไม่มีคำบรรยายให้ระบุตำแหน่งได้) |

**สิ่งที่ทำ**:
1. ทุก EP หลักของ Level 3-23 (21 ชั้น) ได้รูป splash art + แผนที่ DM ต้นเรื่องส่วน "สำรวจ Level X" แล้ว (ยึด pattern เดียวกับที่ Act 2 Level 1-2 วางไว้)
2. ทุกไฟล์ CH0X brief (Level 1-23 + Skullport) ได้รูปปกประจำชั้นจาก Companion (WDMMC) แล้ว
3. รูป "extra" ที่มีคำบรรยายเฉพาะเจาะจง (Scaladar, Arcturia, Dezmyr Shadowdusk, Lynnorax, Violet Beacon, Obsidian Scarabs, Donkey Kong Redux, Snakes and Portals, 7 Houses/Lesser Temple ของ Dweomercore) ถูกวางในจุดที่ตรงเนื้อหาที่สุดแล้ว (ค้นด้วย grep หา NPC/ห้อง/หัวข้อที่ตรงกัน)
4. รูป motif "Halaster's Game" (Halaster/Gates/Party) ถูกใส่ใน `03-halasters-game-framework.md` แล้ว
5. Act 1 (Dragon Heist) เติมรูปที่ขาดครบทั้ง 17 รูป — ward maps 4 รูป + encounter-chain diagram ย้ายไปไว้ที่ `CH04-dragon-season.md` (เอกสารภาพรวม Chapter แทนที่จะซ้ำในทั้ง 4 ไฟล์ EP)

**สิ่งที่ตั้งใจข้าม (ไม่ใช่บั๊กที่เหลือ)**:
- **รูป "Player Version" ของแผนที่ทุกชั้น (23 รูป)** — ข้ามซ้ำรูปแผนที่ DM ที่มีเลขห้องกำกับอยู่แล้ว ตามธรรมเนียมเดิมที่ Act 2 Level 1-2 วางไว้ก่อนหน้านี้ (journal นี้เขียนให้ DM อ่าน ไม่ใช่โชว์ผู้เล่นโดยตรง จึงไม่จำเป็นต้องมีแผนที่เปล่าไม่มีเลขห้อง)
- **รูปเสริม 4 รูปที่ไม่มีคำบรรยายในต้นฉบับเลย** (Level 10 "034-10-05.webp", Level 15 "050-15-04.webp", Level 19 "063-19-04.webp"/"064-19-05.webp") — หาจุดตรงเนื้อหาไม่ได้อย่างมั่นใจ ทิ้งไว้ให้ผู้ใช้ตรวจสอบเองว่าอยากใช้จุดไหน (URL ยังอยู่ในหมวด 4 ด้านล่าง)
- **WDMMC "WreckoftheWightsShadow.webp" และ "PillarsoftheTempleRains.webp"** (Level 23 sub-map) — เป็นแผนที่ประกอบตัวเลือกย่อยใน "Third Time's the Charm" ที่ EP04 ไม่ได้บรรยายละเอียดระดับห้อง จึงไม่มีจุดตรงให้แทรก

### 0.1 ตรวจซ้ำรอบสอง — พบบั๊กที่สคริปต์รอบแรกทิ้งไว้ 3 จุด (แก้แล้วทั้งหมด)

หลังแก้ไขรอบแรก ได้ scan ไฟล์ .md ทั้งหมดอีกรอบด้วยสคริปต์ตรวจ (นับ blank line ก่อน/หลังรูป, หา URL/caption ที่ผิดปกติ, เทียบจำนวนรูปในขอบเขตกฎอีกครั้ง) พบ 3 ปัญหาที่หลุดมาจากสคริปต์แทรกรูปอัตโนมัติ:

1. **Caption มี quote (`"`) ซ้อนกันจนตัด markdown syntax ผิด** — `EP08 - Vault of Dragons.md` มีบรรทัด `![...](url "...คำว่า "dragon" นับแสนเหรียญ")` ซึ่ง quote คู่ในกลาง caption ทำให้ syntax `![alt](url "title")` ตัดสั้นผิดที่ (บาง renderer จะเห็น title ขาดตอน หรือ URL เพี้ยน) — เปลี่ยนเป็นใช้ single quote (`'dragon'`) แทน แก้ไปแล้ว 1 จุด
2. **รูปที่แทรกด้วย `insertAfter` ไม่มี blank line คั่นกับย่อหน้าถัดไป** — สคริปต์ stage3/stage4 แทรก `\n\n` ก่อนรูปแต่ไม่ได้เผื่อ `\n\n` หลังรูป ทำให้บรรทัดรูปกับข้อความ/บทบรรยายถัดไปติดกันเป็นย่อหน้าเดียว (ไม่ fatal แต่ผิด format ที่ใช้อยู่ทั้งไฟล์) พบ 9 จุด: `EP04`/`EP05`/`EP08`(x2)/`EP09`(x2)/`EP10` ของ Act 1, และ `EP01`/`EP04` ของ Act 10 — เพิ่ม blank line ให้ครบทุกจุด พร้อมลด double-blank-line ก่อนรูปที่เกิดร่วมกันให้เหลือบรรทัดเดียวตามธรรมเนียมไฟล์อื่น ๆ
3. **Caption ว่างเปล่า (`""`)** — `Houses.webp` (Dweomercore, EP03 Act 5) และ `Lynnorax.webp` (EP01 Act 10) ต้นฉบับ WDMMC ไม่มี title กำกับมาเลย ทำให้สคริปต์ใส่ `""` ตรงๆ — เขียน caption ภาษาไทยให้ใหม่ตามบริบทฉาก ("แผนผัง 7 บ้าน (Houses) ของ Dweomercore" และ "Lynnorax มังกรโครงกระดูกจอมปลอม เฝ้า Lair ที่ area 40")

**ผลตรวจซ้ำ**: scan URL/caption/blank-line ทั้งหมดทุกไฟล์ .md ในแคมเปญ (89 ไฟล์) แล้ว — ไม่มีปัญหาเหลือ (no duplicate images ในไฟล์เดียวกัน, ไม่มี caption ว่าง, ไม่มี URL ผิดรูปแบบ, blank line ครบทุกจุด) ตัวเลขรวมหลังแก้: **168/201 รูปในขอบเขต (84%)** — เท่าเดิมจากรอบแรกเพราะ Vault-of-Dragons.webp ถูกนับซ้อนอยู่แล้ว (เป็นปัญหา markdown syntax ไม่ใช่ปัญหา "ไม่มีรูป") ส่วนรูปที่เหลือ 33 รูปคือกลุ่มที่ตั้งใจข้ามตามที่อธิบายไว้ข้างบน (ไม่มีอะไรเพิ่ม)

---

---

## TL;DR — สรุปสั้นที่สุด

🔴 **ปัญหาหลักที่ยืนยันแล้ว**: ตั้งแต่ **Act 3 (Level 3) เป็นต้นไปจนจบแคมเปญที่ Act 10 (Level 23)** — **ไม่มีไฟล์ EP ไหนเลยที่มีรูปภาพประกอบแม้แต่รูปเดียว** ทั้งที่ต้นฉบับ (WDMM ทางการ) กำหนดรูปไว้ให้ทุกชั้น (art splash + DM map + player map + บางชั้นมีรูปมอนสเตอร์/ไอเทมเสริม) และ Companion (WDMMC) ก็มีรูปปกประจำชั้นให้ทุกชั้นเช่นกัน — รวมเป็น **21 ชั้น (Level 3-23) / 27 ไฟล์ EP ที่ขาดรูปทั้งหมด 100%**

🟡 Act 1 (Dragon Heist) และ Act 2 (Level 1-2) มีความพยายามใส่รูปตามกฎจริง แต่ก็ยังขาดหายไปบางส่วน (Act 1: ขาด 17/80 รูป, Act 2: ขาด 2/7 รูป WDMM + WDMMC ทั้งคู่ 0/2)

🔴 **รูปจาก Companion (WDMMC) ไม่เคยถูกใช้เลยสักรูปเดียวตลอดทั้งแคมเปญ** (0/35 รูป) ทั้งที่ `99-notes.md` เขียนกฎแปลง URL ไว้ชัดเจนแล้วตั้งแต่ต้น Act 2 — กฎถูกตั้งไว้แต่ไม่เคยถูกนำไปใช้จริงแม้แต่ครั้งเดียว

**สรุปตัวเลขรวมทั้งแคมเปญ: จากรูปต้นฉบับทั้งหมด 271 รูป (WDH+WDMM+WDMMC ทุกหน้ารวม appendix/front-matter) มีรูปปรากฏจริงในไฟล์ EP 102 ครั้ง (นับ occurrence รวมรูปซ้ำหลายหน้า) — ถ้านับเฉพาะเนื้อหาที่ควรมีรูปตามกฎจริง ๆ (WDH 8 บท + WDMM 23 ชั้น + Skullport + WDMMC 23 ชั้น + Skullport + Halaster's Game เท่านั้น ไม่รวม appendix/front-matter) มีรูปที่ควรมีทั้งหมด 201 รูป แต่ปรากฏจริงแค่ 68 รูป — ขาดไป 133 รูป (66% ของรูปในขอบเขตกฎ)**

---

## 1. กฎที่ใช้ตรวจสอบ (อ้างอิงจาก `99-notes.md` บรรทัด 27-32)

> ## รูปภาพประกอบ
>
> ใช้ pattern เดียวกับ adventure อื่นในโปรเจค (`![alt](url "caption")` ก่อน boxed text ของฉากนั้น):
>
> - WDH/WDMM (official): รูปชี้ตรงไป URL สาธารณะอยู่แล้วในไฟล์ต้นฉบับ (`https://cdn.5e.tools/...`) — ก็อปมาใช้ตรงๆ ได้เลย
> - WDMMC (Companion): path ในไฟล์ต้นฉบับเป็น relative (`assets/srd5e/img/TheGiddyLimit/homebrew/master/_img/WDMMC/...`) ต้องแปลงเป็น `https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/...` ก่อนใช้ (ตัด prefix `assets/srd5e/img/` ออก เติม `https://raw.githubusercontent.com/` แทน) — เทสต์แล้วโหลดได้ปกติ

กฎนี้เขียนไว้ตั้งแต่ช่วงต้นของการทำ Act 2 (Undermountain) และไม่เคยถูกยกเลิกหรือแก้ไขในบันทึกใดๆ ที่ตรวจพบ (`NEXT-SESSION.md`, `PROGRESS.md` ไม่มีจุดไหนพูดถึงการ "ยกเลิกใส่รูป")

---

## 2. วิธีตรวจสอบ (Methodology)

1. เขียนสคริปต์ดึงรูปทั้งหมดจากไฟล์ JSON ต้นฉบับ 3 ไฟล์ (`waterdeep-dragon-heist.json`, `waterdeep-dungeon-of-the-mad-mage.json`, `dungeon-of-the-mad-mage-companion.json`) ทุกหน้า (`pages[]`) โดยใช้ `imageIndex()` จาก `extract-common.cjs` ที่มีอยู่แล้วในโปรเจกต์ → ได้รูปทั้งหมด **271 รูป**
2. สแกนไฟล์ `.md` ทั้งหมด **88 ไฟล์** ในโฟลเดอร์ `adventures/gilded-city-mad-depths/` (ไม่รวม `_source/`) หา pattern `![alt](url "caption")` → เจอรูปที่ถูกใช้จริง **102 รูป**
3. เทียบ **ชื่อไฟล์รูป** (filename ท้าย URL) จากต้นฉบับ กับรูปที่ปรากฏใน EP เพื่อหาว่ารูปไหนขาดหายไป — วิธีนี้แม่นยำเพราะชื่อไฟล์รูปแต่ละใบไม่ซ้ำกัน (เช่น `030-10-01.webp` ใช้ได้แค่ครั้งเดียวในทั้งเล่ม)
4. ยืนยันซ้ำด้วยการ `grep -c '!\[' ` ตรงไฟล์ EP ทุกไฟล์ทีละไฟล์ (ไม่ใช่แค่การเทียบผ่านสคริปต์) — ผลตรงกัน: ไฟล์ EP ตั้งแต่ Act 3 เป็นต้นไปมีค่า `0` หมดทุกไฟล์ ไม่มีข้อยกเว้น
5. ตรวจ `CH0X-*.md` และ `00-act-outline.md` ทุกไฟล์ด้วยว่ารูปอาจถูกย้ายไปไว้จุดอื่นแทน — ผลคือ **ไม่มีรูปอยู่ที่ไฟล์เหล่านี้เลยเช่นกัน** (รูปไม่ได้ "ย้ายที่" แค่หายไปจริง)

---

## 3. สรุปภาพรวมต่อ Act

| Act | รูป WDMM (มี/ทั้งหมด) | รูป WDMMC (มี/ทั้งหมด) | สถานะ |
|---|---|---|---|
| Act 1: Dragon Heist | 63/80 | — | 🟡 ขาดบางส่วน |
| Act 2: Level 1-2 | 5/7 | 0/2 | 🟡 ขาดบางส่วน |
| Act 3: Level 3 + Skullport | 0/10 | 0/2 | 🔴 ไม่มีรูปเลย |
| Act 4: Level 4-6 | 0/10 | 0/3 | 🔴 ไม่มีรูปเลย |
| Act 5: Level 7-9 | 0/9 | 0/5 | 🔴 ไม่มีรูปเลย |
| Act 6: Level 10-12 | 0/11 | 0/3 | 🔴 ไม่มีรูปเลย |
| Act 7: Level 13-15 | 0/10 | 0/3 | 🔴 ไม่มีรูปเลย |
| Act 8: Level 16-18 | 0/9 | 0/3 | 🔴 ไม่มีรูปเลย |
| Act 9: Level 19-21 | 0/11 | 0/3 | 🔴 ไม่มีรูปเลย |
| Act 10: Level 22-23 | 0/9 | 0/8 | 🔴 ไม่มีรูปเลย |

## 4. รายละเอียดต่อชั้น (Level 3-23 — Act 3 ถึง Act 10) — ต้นฉบับมีรูปทุกชั้น แต่ EP ไม่มีรูปเลยแม้แต่รูปเดียว

ตารางด้านล่างคือรูปทั้งหมดที่ต้นฉบับ (WDMM ทางการ + WDMMC Companion) กำหนดไว้สำหรับแต่ละชั้น ซึ่ง**ไม่มีรูปไหนเลยที่ถูกใส่ในไฟล์ EP จริง** — คอลัมน์ URL คือ URL ที่แปลงตามกฎ 99-notes.md แล้ว พร้อมก็อปวางได้ทันที

### Level 1 — ไฟล์: `ACT02-into-the-yawning-depths/EP01 - The Dungeon Level (Level 1).md`

**WDMM (ทางการ) — หน้า "Level 1: Dungeon Level"** (3 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ✅ 001-101.webp | Art credit: Eric Belisle | https://cdn.5e.tools/2024/img/adventure/WDMM/001-101.webp |
| ✅ 002-102.webp | Map 1. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/002-102.webp |
| ❌ 003-103.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/003-103.webp |

**WDMMC (Companion) — หน้า "Level I: The Dungeon Level"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelI.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelI.webp |

### Level 2 — ไฟล์: `ACT02-into-the-yawning-depths/EP02 - The Arcane Chambers (Level 2).md`

**WDMM (ทางการ) — หน้า "Level 2: Arcane Chambers"** (4 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ✅ 004-201.webp | Art credit: Cory Trego-Erdner | https://cdn.5e.tools/2024/img/adventure/WDMM/004-201.webp |
| ✅ 005-202.webp | Map 2. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/005-202.webp |
| ❌ 006-203.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/006-203.webp |
| ✅ 007-204.webp | Art credit: Emily Fiegenschuh | https://cdn.5e.tools/2024/img/adventure/WDMM/007-204.webp |

**WDMMC (Companion) — หน้า "Level II: The Arcane Chambers"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelII.webp |

### Level 3 — ไฟล์: `ACT03-the-sunless-sea/EP01 - The Sargauth Level (Level 3).md`

**WDMM (ทางการ) — หน้า "Level 3: Sargauth Level"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 008-301.webp | Art credit: Clint Cearley | https://cdn.5e.tools/2024/img/adventure/WDMM/008-301.webp |
| ❌ 009-302.webp | Map 3. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/009-302.webp |
| ❌ 010-303.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/010-303.webp |

**WDMMC (Companion) — หน้า "Level III: The Sargauth Level"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelIII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelIII.webp |

### Level 4 — ไฟล์: `ACT04-twisted-wilds/EP01 - The Twisted Caverns (Level 4).md`

**WDMM (ทางการ) — หน้า "Level 4: Twisted Caverns"** (4 รูป, ขาดทั้งหมด 4)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 011-401.webp | Art credit: Craig J Spearing | https://cdn.5e.tools/2024/img/adventure/WDMM/011-401.webp |
| ❌ 012-402.webp | Map 4. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/012-402.webp |
| ❌ 013-403.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/013-403.webp |
| ❌ 014-404.webp | Art credit: Tyler Jacobson | https://cdn.5e.tools/2024/img/adventure/WDMM/014-404.webp |

**WDMMC (Companion) — หน้า "Level IV: The Twisted Caverns"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelIV.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelIV.webp |

### Level 5 — ไฟล์: `ACT04-twisted-wilds/EP02 - Wyllowwood (Level 5).md`

**WDMM (ทางการ) — หน้า "Level 5: Wyllowwood"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 015-501.webp | Art credit: Zoltan Boros | https://cdn.5e.tools/2024/img/adventure/WDMM/015-501.webp |
| ❌ 016-502.webp | Map 5. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/016-502.webp |
| ❌ 017-503.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/017-503.webp |

**WDMMC (Companion) — หน้า "Level V: Wyllowwood"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelV.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelV.webp |

### Level 6 — ไฟล์: `ACT04-twisted-wilds/EP03 - The Lost Level (Level 6).md`

**WDMM (ทางการ) — หน้า "Level 6: Lost Level"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 018-601.webp | Art credit: Scott Murphy | https://cdn.5e.tools/2024/img/adventure/WDMM/018-601.webp |
| ❌ 019-602.webp | Map 6. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/019-602.webp |
| ❌ 020-603.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/020-603.webp |

**WDMMC (Companion) — หน้า "Level VI: The Lost Level"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelVI.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelVI.webp |

### Level 7 — ไฟล์: `ACT05-castle-and-swamp/EP01 - Maddgoth's Castle (Level 7).md`

**WDMM (ทางการ) — หน้า "Level 7: Maddgoth's Castle"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 021-701.webp | Art credit: Mark Behm | https://cdn.5e.tools/2024/img/adventure/WDMM/021-701.webp |
| ❌ 022-702.webp | Map 7. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/022-702.webp |
| ❌ 023-703.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/023-703.webp |

**WDMMC (Companion) — หน้า "Level VII: Maddgoth's Castle"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelVII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelVII.webp |

### Level 8 — ไฟล์: `ACT05-castle-and-swamp/EP02 - Slitherswamp (Level 8).md`

**WDMM (ทางการ) — หน้า "Level 8: Slitherswamp"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 024-801.webp | Art credit: Julian Kok | https://cdn.5e.tools/2024/img/adventure/WDMM/024-801.webp |
| ❌ 025-802.webp | Map 8. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/025-802.webp |
| ❌ 026-803.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/026-803.webp |

**WDMMC (Companion) — หน้า "Level VIII: Slitherswamp"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelVIII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelVIII.webp |

### Level 9 — ไฟล์: `ACT05-castle-and-swamp/EP03/EP04 - Dweomercore Part 1/2`

**WDMM (ทางการ) — หน้า "Level 9: Dweomercore"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 027-901.webp | Art credit: Christopher Moeller | https://cdn.5e.tools/2024/img/adventure/WDMM/027-901.webp |
| ❌ 028-902.webp | Map 9. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/028-902.webp |
| ❌ 029-903.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/029-903.webp |

**WDMMC (Companion) — หน้า "Level IX: Dweomercore"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelIX.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelIX.webp |
| ❌ Houses.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/Houses.webp |
| ❌ LesserTemple.webp | Lesser Temple of the Heretics—One Square = 10 ft.. Art credit: Dyson Logos | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LesserTemple.webp |

### Level 10 — ไฟล์: `ACT06-muirals-gauntlet/EP01 - Muiral's Gauntlet (Level 10).md`

**WDMM (ทางการ) — หน้า "Level 10: Muiral's Gauntlet"** (5 รูป, ขาดทั้งหมด 5)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 030-10-01.webp | Art credit: Zoltan Boros | https://cdn.5e.tools/2024/img/adventure/WDMM/030-10-01.webp |
| ❌ 031-10-02.webp | Map 10. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/031-10-02.webp |
| ❌ 032-10-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/032-10-03.webp |
| ❌ 033-10-04.webp | Obsidian Scarabs of Houses Freth and Auvryndar. Art credit: Leesha Hannigan | https://cdn.5e.tools/2024/img/adventure/WDMM/033-10-04.webp |
| ❌ 034-10-05.webp | Art credit: Jason Felix | https://cdn.5e.tools/2024/img/adventure/WDMM/034-10-05.webp |

**WDMMC (Companion) — หน้า "Level X: Muiral's Gauntlet"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelX.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelX.webp |

### Level 11 — ไฟล์: `ACT06-muirals-gauntlet/EP02 - Troglodyte Warrens (Level 11).md`

**WDMM (ทางการ) — หน้า "Level 11: Troglodyte Warrens"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 035-11-01.webp | Art credit: Cory Trego-Erdner | https://cdn.5e.tools/2024/img/adventure/WDMM/035-11-01.webp |
| ❌ 036-11-02.webp | Map 11. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/036-11-02.webp |
| ❌ 037-11-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/037-11-03.webp |

**WDMMC (Companion) — หน้า "Level XI: The Troglodyte Warrens"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXI.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXI.webp |

### Level 12 — ไฟล์: `ACT06-muirals-gauntlet/EP03 - The Maze Level (Level 12).md`

**WDMM (ทางการ) — หน้า "Level 12: Maze Level"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 038-12-01.webp | Art credit: Lake Hurwitz | https://cdn.5e.tools/2024/img/adventure/WDMM/038-12-01.webp |
| ❌ 039-12-02.webp | Map 12. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/039-12-02.webp |
| ❌ 040-12-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/040-12-03.webp |

**WDMMC (Companion) — หน้า "Level XII: The Maze Level"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXII.webp |

### Level 13 — ไฟล์: `ACT07-graveyard-and-ruin/EP01 - Trobriand's Graveyard (Level 13).md`

**WDMM (ทางการ) — หน้า "Level 13: Trobriand's Graveyard"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 041-13-01.webp | Art credit: Craig J Spearing | https://cdn.5e.tools/2024/img/adventure/WDMM/041-13-01.webp |
| ❌ 042-13-02.webp | Map 13. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/042-13-02.webp |
| ❌ 043-13-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/043-13-03.webp |

**WDMMC (Companion) — หน้า "Level XIII: Trobriand's Graveyard"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXIII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXIII.webp |

### Level 14 — ไฟล์: `ACT07-graveyard-and-ruin/EP02 - Arcturiadoom (Level 14).md`

**WDMM (ทางการ) — หน้า "Level 14: Arcturiadoom"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 044-14-01.webp | Art credit: Sam Keiser | https://cdn.5e.tools/2024/img/adventure/WDMM/044-14-01.webp |
| ❌ 045-14-02.webp | Map 14. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/045-14-02.webp |
| ❌ 046-14-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/046-14-03.webp |

**WDMMC (Companion) — หน้า "Level XIV: Arcturiadoom"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXIV.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXIV.webp |

### Level 15 — ไฟล์: `ACT07-graveyard-and-ruin/EP03/EP04 - Obstacle Course Part 1/2`

**WDMM (ทางการ) — หน้า "Level 15: Obstacle Course"** (4 รูป, ขาดทั้งหมด 4)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 047-15-01.webp | Art credit: Zoltan Boros | https://cdn.5e.tools/2024/img/adventure/WDMM/047-15-01.webp |
| ❌ 048-15-02.webp | Map 15. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/048-15-02.webp |
| ❌ 049-15-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/049-15-03.webp |
| ❌ 050-15-04.webp | Art credit: Vincent Proce | https://cdn.5e.tools/2024/img/adventure/WDMM/050-15-04.webp |

**WDMMC (Companion) — หน้า "Level XV: The Obstacle Course"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXV.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXV.webp |

### Level 16 — ไฟล์: `ACT08-crystal-and-sea/EP01 - Crystal Labyrinth (Level 16).md`

**WDMM (ทางการ) — หน้า "Level 16: Crystal Labyrinth"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 051-16-01.webp | Art credit: Lars Grant-West | https://cdn.5e.tools/2024/img/adventure/WDMM/051-16-01.webp |
| ❌ 052-16-02.webp | Map 16. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/052-16-02.webp |
| ❌ 053-16-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/053-16-03.webp |

**WDMMC (Companion) — หน้า "Level XVI: The Crystal Labyrinth"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXVI.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXVI.webp |

### Level 17 — ไฟล์: `ACT08-crystal-and-sea/EP02/EP03 - Seadeeps Part 1/2`

**WDMM (ทางการ) — หน้า "Level 17: Seadeeps"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 054-17-01.webp | Art credit: Scott Murphy | https://cdn.5e.tools/2024/img/adventure/WDMM/054-17-01.webp |
| ❌ 055-17-02.webp | Map 17. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/055-17-02.webp |
| ❌ 056-17-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/056-17-03.webp |

**WDMMC (Companion) — หน้า "Level XVII: Seadeeps"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXVII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXVII.webp |

### Level 18 — ไฟล์: `ACT08-crystal-and-sea/EP04 - Vanrakdoom.md`

**WDMM (ทางการ) — หน้า "Level 18: Vanrakdoom"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 057-18-01.webp | Art credit: Eric Belisle | https://cdn.5e.tools/2024/img/adventure/WDMM/057-18-01.webp |
| ❌ 058-18-02.webp | Map 18. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/058-18-02.webp |
| ❌ 059-18-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/059-18-03.webp |

**WDMMC (Companion) — หน้า "Level XVIII: Vanrakdoom"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXVIII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXVIII.webp |

### Level 19 — ไฟล์: `ACT09-the-deepest-halls/EP01 - Caverns of Ooze (Level 19).md`

**WDMM (ทางการ) — หน้า "Level 19: Caverns of Ooze"** (5 รูป, ขาดทั้งหมด 5)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 060-19-01.webp | Art credit: Eric Belisle | https://cdn.5e.tools/2024/img/adventure/WDMM/060-19-01.webp |
| ❌ 061-19-02.webp | Map 19. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/061-19-02.webp |
| ❌ 062-19-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/062-19-03.webp |
| ❌ 063-19-04.webp | — | https://cdn.5e.tools/2024/img/adventure/WDMM/063-19-04.webp |
| ❌ 064-19-05.webp | — | https://cdn.5e.tools/2024/img/adventure/WDMM/064-19-05.webp |

**WDMMC (Companion) — หน้า "Level XIX: Caverns of Ooze"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXIX.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXIX.webp |

### Level 20 — ไฟล์: `ACT09-the-deepest-halls/EP02 - Runestone Caverns (Level 20).md`

**WDMM (ทางการ) — หน้า "Level 20: Runestone Caverns"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 065-20-01.webp | Art credit: Zoltan Boros | https://cdn.5e.tools/2024/img/adventure/WDMM/065-20-01.webp |
| ❌ 066-20-02.webp | Map 20. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/066-20-02.webp |
| ❌ 067-20-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/067-20-03.webp |

**WDMMC (Companion) — หน้า "Level XX: Runestone Gardens"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXX.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXX.webp |

### Level 21 — ไฟล์: `ACT09-the-deepest-halls/EP03/EP04 - Terminus Level Part 1/2`

**WDMM (ทางการ) — หน้า "Level 21: Terminus Level"** (3 รูป, ขาดทั้งหมด 3)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 068-21-01.webp | Art credit: Sam Keiser | https://cdn.5e.tools/2024/img/adventure/WDMM/068-21-01.webp |
| ❌ 069-21-02.webp | Map 21. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/069-21-02.webp |
| ❌ 070-21-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/070-21-03.webp |

**WDMMC (Companion) — หน้า "Level XXI: The Terminus Level"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXXI.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXXI.webp |

### Level 22 — ไฟล์: `ACT10-halasters-reckoning/EP01 - Shadowdusk Hold.md`

**WDMM (ทางการ) — หน้า "Level 22: Shadowdusk Hold"** (4 รูป, ขาดทั้งหมด 4)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 071-22-01.webp | Art credit: Eric Belisle | https://cdn.5e.tools/2024/img/adventure/WDMM/071-22-01.webp |
| ❌ 072-22-02.webp | Map 22. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/072-22-02.webp |
| ❌ 073-22-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/073-22-03.webp |
| ❌ 074-22-04.webp | Dezmyr Shadowdusk. Art credit: Shawn Wood | https://cdn.5e.tools/2024/img/adventure/WDMM/074-22-04.webp |

**WDMMC (Companion) — หน้า "Level XXII: Shadowdusk Hold"** (2 รูป, ขาดทั้งหมด 2)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXXII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXXII.webp |
| ❌ Lynnorax.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/Lynnorax.webp |

### Level 23 — ไฟล์: `ACT10-halasters-reckoning/EP02/EP03/EP04 - Mad Wizard's Lair Part 1-3`

**WDMM (ทางการ) — หน้า "Level 23: Mad Wizard's Lair"** (5 รูป, ขาดทั้งหมด 5)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 075-23-01.webp | Art credit: Scott Murphy | https://cdn.5e.tools/2024/img/adventure/WDMM/075-23-01.webp |
| ❌ 076-23-02.webp | Map 23. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/076-23-02.webp |
| ❌ 077-23-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/077-23-03.webp |
| ❌ 078-23-04.webp | Scaladar. Art credit: Leesha Hannigan | https://cdn.5e.tools/2024/img/adventure/WDMM/078-23-04.webp |
| ❌ 079-23-05.webp | Arcturia. Art credit: Shawn Wood | https://cdn.5e.tools/2024/img/adventure/WDMM/079-23-05.webp |

**WDMMC (Companion) — หน้า "Level XXIII: Mad Wizard's Lair"** (6 รูป, ขาดทั้งหมด 6)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ LevelXXIII.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/LevelXXIII.webp |
| ❌ VioletBeacon.webp | The Violet Beacon—Top Platform Square = 5 ft.. Art credit: Dyson Logos | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/VioletBeacon.webp |
| ❌ DK.webp | Definitely not the Level 1 Map from Donkey Kong 1981 | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/DK.webp |
| ❌ WreckoftheWightsShadow.webp | The Wreck of the Wight's Shadow—One Square = 5 ft.. Art credit: Dyson Logos | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/WreckoftheWightsShadow.webp |
| ❌ PillarsoftheTempleRains.webp | Pillars of the Temple Rains—One Square = 5 ft.. Art credit: Dyson Logos | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/PillarsoftheTempleRains.webp |
| ❌ SnakesandPortals.webp | Snakes and Portals Diagram—One Square = 5 ft. | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/SnakesandPortals.webp |

### Skullport — ไฟล์: `ACT03-the-sunless-sea/EP02` และ `EP03`

**WDMM (ทางการ) — หน้า "Skullport"** (7 รูป, ขาดทั้งหมด 7)

| Filename | คำบรรยาย | URL |
|---|---|---|
| ❌ 080-24-01.webp | Art credit: Juliak Kok | https://cdn.5e.tools/2024/img/adventure/WDMM/080-24-01.webp |
| ❌ 081-24-02.webp | Map 24. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/081-24-02.webp |
| ❌ 082-24-03.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/082-24-03.webp |
| ❌ 083-24-04.webp | Map 25. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/083-24-04.webp |
| ❌ 084-24-05.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/084-24-05.webp |
| ❌ 085-24-06.webp | Map 26. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/085-24-06.webp |
| ❌ 086-24-07.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/086-24-07.webp |

**WDMMC (Companion) — หน้า "Skullport"** (1 รูป, ขาดทั้งหมด 1)

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ Skullport.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/Skullport.webp |

### Halaster's Game (Companion บทที่ 2 — รูป motif ทั่วไป ไม่ผูกกับชั้นใดชั้นหนึ่ง)

รูปเหล่านี้ควรพิจารณาใส่ใน `03-halasters-game-framework.md` เพราะเป็นภาพประกอบ Halaster/Party/Gates ทั่วไป ไม่ใช่รูปเฉพาะชั้น

| Filename | คำบรรยาย | URL (แปลงแล้ว) |
|---|---|---|
| ❌ Halaster.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/Halaster.webp |
| ❌ Gates.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/Gates.webp |
| ❌ Party.webp | — | https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/Party.webp |
## 5. Act 1 (Dragon Heist) และ Act 2 Level 1-2 — มีรูปอยู่บ้าง แต่ขาดหายบางส่วน

สอง Act นี้เป็นของเดียวที่มีความพยายามใส่รูปตามกฎจริง แต่ยังไม่ครบ 100% เทียบกับต้นฉบับ:

### Ch. 1: A Friend in Need → `EP01 - A Friend in Need.md`  (6/7 มีอยู่)

| Filename | คำบรรยาย | URL |
|---|---|---|
| Zhent-Warehouse-DM.webp | Zhent Warehouse | https://cdn.5e.tools/2024/img/adventure/WDH/Zhent-Warehouse-DM.webp |

### Ch. 2: Trollskull Alley → `EP02 - Trollskull Alley.md`  (5/5 มีอยู่)

✅ ครบทุกรูปแล้ว

### Ch. 3: Fireball → `EP03 - Fireball.md`  (7/7 มีอยู่)

✅ ครบทุกรูปแล้ว

### Ch. 4: Dragon Season → `EP04-EP07 (Ch.4 แยก 4 สายวายร้าย — Xanathar/Cassalanters/Jarlaxle/Manshoon)`  (19/30 มีอยู่)

| Filename | คำบรรยาย | URL |
|---|---|---|
| Dock-Ward.webp | Dock Ward | https://cdn.5e.tools/2024/img/adventure/WDH/Dock-Ward.webp |
| City-of-the-Dead-Map.webp | City of the Dead Map | https://cdn.5e.tools/2024/img/adventure/WDH/City-of-the-Dead-Map.webp |
| Trades-Ward-Map.webp | Trades Ward Map | https://cdn.5e.tools/2024/img/adventure/WDH/Trades-Ward-Map.webp |
| Field-Ward-Map.webp | Field Ward Map | https://cdn.5e.tools/2024/img/adventure/WDH/Field-Ward-Map.webp |
| EncounterChains.webp | — | https://cdn.5e.tools/2024/img/adventure/WDH/EncounterChains.webp |
| Alley-DM.webp | Alley | https://cdn.5e.tools/2024/img/adventure/WDH/Alley-DM.webp |
| Alley-Players.webp | Player Version | https://cdn.5e.tools/2024/img/adventure/WDH/Alley-Players.webp |
| Rooftop.webp | Rooftop Chase | https://cdn.5e.tools/2024/img/adventure/WDH/Rooftop.webp |
| Vault-Door.webp | — | https://cdn.5e.tools/2024/img/adventure/WDH/Vault-Door.webp |
| Vault-of-Dragons.webp | A gold dragon guards a pile of golden dragons | https://cdn.5e.tools/2024/img/adventure/WDH/Vault-of-Dragons.webp |
| Aurinax.webp | Barok Clanghammer | https://cdn.5e.tools/2024/img/adventure/WDH/Aurinax.webp |

### Ch. 5: Spring Madness → `EP09 - Spring Madness (Xanathar).md`  (4/7 มีอยู่)

| Filename | คำบรรยาย | URL |
|---|---|---|
| Xanathar-Lair.webp | Stealing Sylgar | https://cdn.5e.tools/2024/img/adventure/WDH/Xanathar-Lair.webp |
| Panopticus.webp | Panopticus | https://cdn.5e.tools/2024/img/adventure/WDH/Panopticus.webp |
| Smokepowder.webp | Smokepowder Keg | https://cdn.5e.tools/2024/img/adventure/WDH/Smokepowder.webp |

### Ch. 6: Hell of a Summer → `EP10 - Hell of a Summer (Cassalanters).md`  (7/8 มีอยู่)

| Filename | คำบรรยาย | URL |
|---|---|---|
| Osvaldo.webp | Osvaldo | https://cdn.5e.tools/2024/img/adventure/WDH/Osvaldo.webp |

### Ch. 7: Maestro's Fall → `EP11 - Maestro's Fall (Jarlaxle).md`  (8/8 มีอยู่)

✅ ครบทุกรูปแล้ว

### Ch. 8: Winter Wizardry → `EP12 - Winter Wizardry (Manshoon).md`  (7/8 มีอยู่)

| Filename | คำบรรยาย | URL |
|---|---|---|
| Manshoon.webp | Manshoon | https://cdn.5e.tools/2024/img/adventure/WDH/Manshoon.webp |

### Level 1: Dungeon Level → `ACT02-into-the-yawning-depths/EP01 - The Dungeon Level (Level 1).md`

(2/3 มีอยู่)

| Filename | คำบรรยาย | URL |
|---|---|---|
| 003-103.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/003-103.webp |

WDMMC Level I: 1 รูป (1 ขาด) — ดูรายละเอียดในหมวด 4

### Level 2: Arcane Chambers → `ACT02-into-the-yawning-depths/EP02 - The Arcane Chambers (Level 2).md`

(3/4 มีอยู่)

| Filename | คำบรรยาย | URL |
|---|---|---|
| 006-203.webp | Player Version. Art credit: Tim Hartin | https://cdn.5e.tools/2024/img/adventure/WDMM/006-203.webp |

WDMMC Level II: 1 รูป (1 ขาด) — ดูรายละเอียดในหมวด 4

## 6. สรุป: รูปจาก WDMMC (Companion) ไม่เคยถูกใช้เลยแม้แต่ครั้งเดียว

ตรวจด้วย `grep -rl "raw.githubusercontent.com"` ทั่วทั้งโฟลเดอร์แคมเปญ — **ไม่พบผลลัพธ์แม้แต่ 1 ไฟล์** นั่นแปลว่ารูปทั้ง 35 รูปที่ Companion เตรียมไว้ (รูปปกประจำชั้น 23 รูป Level I-XXIII, Skullport 1 รูป, Halaster's Game motif 3 รูป, Cover & Credits 2 รูป, และรูปเสริมเฉพาะจุดอีก 6 รูปที่ Level IX/XXII/XXIII) **ไม่เคยถูกแปลง URL หรือถูกวางในไฟล์ EP ไหนเลยตลอดทั้งแคมเปญ** — รายละเอียดรูปทั้งหมดพร้อม URL ที่แปลงแล้วอยู่ในหมวด 4 ด้านบน (แถวที่ขึ้นต้นด้วย WDMMC ทุกแถว)

สิ่งที่น่าสังเกต: กฎการแปลง URL ถูกเขียนไว้อย่างละเอียดใน `99-notes.md` (พร้อมบอกด้วยว่า "เทสต์แล้วโหลดได้ปกติ") แสดงว่ามีการทดสอบไว้ล่วงหน้าจริง แต่สุดท้ายไม่เคยถูกใช้งานจริงในการเขียน EP แม้แต่ครั้งเดียว — เป็นไปได้ว่ากฎนี้ถูกวางไว้ตอนต้น Act 2 แต่ขั้นตอนการเขียน EP จริงในทุก session ถัดมาลืมข้ามขั้นตอนนี้ไปทั้งหมด

---

## 7. รูปอ้างอิง/ภาคผนวก (Front-matter & Appendix) — นอกขอบเขตกฎหลัก แต่แจ้งไว้เผื่อพิจารณา

รูปกลุ่มนี้อยู่ในหน้า "ภาคผนวก" ของหนังสือต้นฉบับ (ไม่ใช่เนื้อหาฉาก/ห้องที่ถูกแปลเป็น EP โดยตรง) เช่น NPC portrait catalog, Magic Item catalog, Handout, Poster Map, Foreword/Introduction, Volo's Waterdeep Enchiridion (WDH) และ Dungeon Denizens/Elder Runes Deck/Secrets Deck/Dungeon Key (WDMM) — กฎ "รูปภาพประกอบ" ใน `99-notes.md` พูดถึงรูป "ก่อน boxed text ของฉากนั้น" ซึ่งเป็นรูปเชิงบรรยายฉาก ไม่ได้ระบุชัดว่าต้องใช้รูป catalog ประเภทนี้ด้วย จึงนับเป็น **นอกขอบเขตของการตรวจครั้งนี้โดยตรง** — แต่ขอบันทึกไว้เผื่อผู้ใช้อยากพิจารณาใช้บางรูปเป็น handout จริง (โดยเฉพาะกลุ่มที่เป็น "handout" ชัดเจน เช่น Trollskull Manor map, The Yawning Portal):

| หน้า | จำนวนรูปทั้งหมด | สถานะ |
|---|---|---|
| WDH — Foreword | 2 | ไม่ใช้ (เนื้อหาปก/บทนำหนังสือ) |
| WDH — Introduction | 8 | ไม่ใช้ (ส่วนใหญ่เป็น flowchart/NPC roster ของหนังสือ ไม่ใช่ฉาก) |
| WDH — Poster Map | 2 | ไม่ใช้ (แผนที่โปสเตอร์รวม Waterdeep) |
| WDH — Volo's Waterdeep Enchiridion | 13 | ไม่ใช้ (บทความเสริมท้ายเล่ม ไม่ได้แปลเป็น EP) |
| WDH — App. A: Magic Items | 4 | ไม่ใช้ (ไอเทมถูกพูดถึงใน EP4-7/EP9-12 แล้ว แต่ไม่มีรูปไอเทมแนบ) |
| WDH — App. B: Monsters and NPCs | 21 | ไม่ใช้ (ภาพ NPC หลายตัวที่ปรากฏตัวจริงใน EP เช่น Renaer/Mirt/Laeral/Nihiloor — **อาจพิจารณาใส่เพิ่มได้** เพราะเป็น NPC ที่มีบทบาทจริง) |
| WDH — App. C: Handouts | 4/5 | ขาด 4 — **กลุ่มนี้เป็น handout แท้ๆ** (Trollskull Manor DM/Player, The Yawning Portal, Friendly Faces) น่าจะเข้าเกณฑ์กฎรูปภาพจริง เพราะเป็น "ฉาก" ที่ EP1/EP2 พูดถึงตรงๆ |
| WDMM — App. A: Dungeon Denizens | 7 | ไม่ใช้ (ภาพมอนสเตอร์รวมท้ายเล่ม) |
| WDMM — App. B: Elder Runes Deck | 1 | ไม่ใช้ (การ์ดพิมพ์ประกอบเกม) |
| WDMM — App. C: Secrets Deck | 2 | ไม่ใช้ (การ์ดพิมพ์ประกอบเกม) |
| WDMM — App. D: Dungeon Key | 1 | ไม่ใช้ (สัญลักษณ์แผนที่รวม) |
| WDMM — Waterdeep: Dungeon of the Mad Mage (cover) | 2 | ไม่ใช้ (ปกหนังสือ) |
| WDMMC — Cover & Credits | 2 | ไม่ใช้ (ปก Companion) |

**ข้อเสนอย่อย**: ถ้าจะจัดลำดับความสำคัญ กลุ่ม "WDH App. C: Handouts" (Trollskull Manor, Yawning Portal) มีน้ำหนักสูงสุดที่ควรพิจารณาเพิ่ม เพราะเป็น handout ที่ EP1-EP2 อ้างถึงสถานที่นั้นตรงๆ อยู่แล้ว ต่างจากกลุ่มอื่นที่เป็น catalog รวมท้ายเล่มจริงๆ

---

## 8. กฎ/โครงสร้างอื่นๆ ที่ตรวจเพิ่มเติม (นอกเรื่องรูปภาพ)

| กฎ | ผลตรวจ |
|---|---|
| กฎข้อ 7: "ห้ามสร้างโฟลเดอร์ย่อยเพิ่มใน Act" | ✅ **ผ่าน** — ตรวจทุกโฟลเดอร์ ACT01-ACT10 ไม่พบโฟลเดอร์ย่อยเลยสักที่ ไฟล์ทั้งหมดอยู่แบนตามกฎ |
| โครงสร้างหัวข้อบังคับ (`## NPC ประจำ EP`, `## Story Overview`) ตาม journal-template.md | 🟡 **Act 1 ทั้ง 12 ไฟล์ไม่มีหัวข้อ `## Story Overview`** ตรงตัว (ใช้หัวข้อฉากเปิดเรื่องแทนทันที เช่น `## เปิดเรื่อง: Yawning Portal`) — Act 2-10 ทุกไฟล์มีหัวข้อนี้ครบ ดูเหมือนเป็นธรรมเนียมที่เพิ่งถูกกำหนดชัดตอนเริ่ม Act 2 ไม่ใช่บั๊กของ Act 1 (Act 1 เขียนก่อน template จะนิ่ง) — เป็นความคลาดเคลื่อนที่ไม่กระทบเนื้อหา ไม่จำเป็นต้องแก้ย้อนหลังเว้นแต่ผู้ใช้ต้องการความสม่ำเสมอ 100% |
| `## NPC ประจำ EP` มีอยู่ทุกไฟล์ | ✅ ผ่านทั้ง 43 ไฟล์ EP |
| หัวเรื่อง `# EPxx: ชื่อตอน` ตรงรูปแบบ | ✅ ผ่านทั้ง 43 ไฟล์ EP |
| Halaster's Gate cross-reference (ตาราง 31 บาน) | ไม่ได้ตรวจซ้ำในรอบนี้ — จากบันทึกใน `PROGRESS.md`/`NEXT-SESSION.md` มีการยืนยันครอสเรฟทุกชั้นระหว่างเขียนอยู่แล้ว (พบ 1 จุดแก้ไขแล้วคือ Gate #19 ที่ Level 8, และจุดคลาดเคลื่อนเล็กน้อยที่บันทึกไว้ทั้งคู่ระหว่าง L15/L20 Gate #26) ถ้าต้องการให้ตรวจซ้ำทั้งตารางแบบละเอียด แจ้งเพิ่มได้ |

---

## 9. ข้อเสนอแนะ (Recommendations)

1. **แก้ปัญหาใหญ่ก่อน**: เพิ่มรูป WDMM (splash + DM map + player map เป็นอย่างน้อย) ให้ทุกไฟล์ EP ตั้งแต่ Act 3 ถึง Act 10 (21 ชั้น) — URL ทั้งหมดพร้อมใช้แล้วในหมวด 4 ก็อปวางได้ทันทีตาม pattern `![alt](url "caption")` ก่อน boxed text ของฉากเปิดแต่ละชั้น (ปกติคือส่วน "Before the Descent" หรือ "What Dwells Here?" ของ EP แรกในชั้นนั้น)
2. **เพิ่มรูป WDMMC**: อย่างน้อยควรใส่รูปปกประจำชั้น (`LevelX.webp` แปลง URL แล้ว) ที่จุดเปิดของแต่ละ Chapter/EP เป็นมาตรฐานเดียวกับที่กฎตั้งใจไว้ และรูป motif "Halaster's Game" 3 รูป (`Halaster.webp`/`Gates.webp`/`Party.webp`) น่าจะเหมาะกับ `03-halasters-game-framework.md`
3. **ปิดช่องว่างที่เหลือใน Act 1/Act 2**: 17 รูปใน Act 1 + 2 รูป WDMM ใน Act 2 (ดูหมวด 5) — ใช้เวลาไม่มากเพราะเป็นไฟล์ที่มีรูปอยู่แล้วบางส่วน แค่เติมให้ครบ
4. **พิจารณา WDH App. C Handouts** (Trollskull Manor, Yawning Portal) เพิ่มเข้า EP1/EP2 เพราะเป็น handout ที่ตรงเนื้อหาอยู่แล้ว แม้จะนอกขอบเขตกฎหลักตรงตัว
5. ถ้าต้องการให้ลงมือแก้จริง (ไม่ใช่แค่รายงาน) แจ้งได้เลยว่าจะให้เริ่มจาก Act ไหนก่อน — แนะนำเริ่มจาก Act 3 (Level 3 + Skullport) เพราะเป็นจุดที่ปัญหาเริ่มต้น แล้วไล่ตามลำดับ Act จนถึง Act 10

---

## ภาคผนวก: ไฟล์ข้อมูลดิบที่ใช้ตรวจ (เก็บไว้ที่ `_source/extract-tools/` เผื่ออ้างอิงซ้ำ)

- `_audit_source_images.json` — รูปทั้งหมด 271 รูปจากไฟล์ JSON ต้นฉบับ 3 ไฟล์ พร้อม page/filename/alt/title
- `_audit_ep_images.json` — รูปทั้งหมด 102 รูปที่พบจริงในไฟล์ .md ของแคมเปญ พร้อม path ไฟล์ที่พบ
- `_audit_md_filelist.json` — รายชื่อไฟล์ .md ทั้ง 88 ไฟล์ที่ถูกสแกน
