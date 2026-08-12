# Next Session — Resume Point (อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง)

**อัปเดตล่าสุด**: 2026-08-12 (หลังจบ Act 3 สมบูรณ์)

> ไฟล์นี้มีไว้ให้ session ถัดไป (หรือ AI ตัวใหม่ที่ไม่มี context เดิม) อ่านแล้วทำงานต่อได้ทันทีโดยไม่เพี้ยนจากรูปแบบ/มาตรฐานเดิม — ถ้าผู้ใช้พิมพ์ "ทำต่อ" ให้เริ่มจากหัวข้อ **"งานถัดไปแบบเจาะจง"** ด้านล่างได้เลย ไม่ต้องถามซ้ำว่าจะทำอะไร

---

## 1. สถานะโดยรวม ณ ตอนนี้

โปรเจกต์: แปลง 3 ไฟล์ FoundryVTT JSON ดิบ (Waterdeep: Dragon Heist, Waterdeep: Dungeon of the Mad Mage, และ Dungeon of the Mad Mage Companion แฟนเมด) เป็นแคมเปญ Thai ACT/CH/EP journal เต็มรูปแบบที่ `adventures/gilded-city-mad-depths/`

**เสร็จแล้วทั้งหมด**:
- ✅ **Act 1 — Dragon Heist** (`ACT01-dragon-heist/`): ครบ 12 ไฟล์ EP (EP1-3 เนื้อเรื่องกลาง, EP4-7 = Ch.4 แยก 4 สายวายร้าย, EP8 = Vault of Dragons ร่วม, EP9-12 = Ch.5-8 แยก 4 สายวายร้ายอีกรอบ)
- ✅ **Act 2 — Into the Yawning Depths** (`ACT02-into-the-yawning-depths/`): Undermountain Level 1-2, ครบ EP01+EP02
- ✅ **Act 3 — The Sunless Sea** (`ACT03-the-sunless-sea/`): Undermountain Level 3 + Skullport, ครบ EP01 (Sargauth Level) + EP02+EP03 (Skullport แยก 2 ไฟล์เพราะเนื้อหาใหญ่มาก)

**ยังไม่เริ่ม**: Act 4 เป็นต้นไป (Undermountain Level 4-23) — ดูตาราง Act คร่าวๆ ในหัวข้อ 6

รายละเอียด checklist แบบละเอียดทุกบรรทัดอยู่ใน [`PROGRESS.md`](./PROGRESS.md) — ไฟล์นี้ (`NEXT-SESSION.md`) เป็นตัวสรุป "ทำอย่างไรต่อ" ไม่ใช่ตัวแทน PROGRESS.md อัปเดตทั้งสองไฟล์คู่กันเสมอเมื่อทำงานเสร็จแต่ละก้อน

---

## 2. งานถัดไปแบบเจาะจง — Act 4: Twisted Wilds (Level 4-6)

ตาม `PROGRESS.md` § "แผนคร่าวๆ Act 3+ ที่เหลือ": **Act 4 = Undermountain Level 4-6, char level 9-11**

| Level | ชื่อใน WDMM (Arabic) | ชื่อใน Companion (Roman) | ขนาด HTML ดิบ (WDMM / Companion) |
|---|---|---|---|
| 4 | `Level 4: Twisted Caverns` | `Level IV: The Twisted Caverns` | 75,735 / 60,763 ตัวอักษร |
| 5 | `Level 5: Wyllowwood` | `Level V: Wyllowwood` | 97,162 / 94,445 ตัวอักษร |
| 6 | `Level 6: Lost Level` | `Level VI: The Lost Level` | 110,605 / 57,572 ตัวอักษร |

**ทั้ง 3 ชั้นนี้ใหญ่กว่า Level 1-2 ทั้งคู่ และ Level 6 ใหญ่เกือบเท่า Level 3 บวก Skullport รวมกัน** — เตรียมใจว่าอาจต้องแตกเป็นหลาย EP ต่อ Chapter แบบที่ Skullport ทำ (ดูกฎการตัดสินใจในหัวข้อ 5.3)

**ขั้นตอนที่ต้องทำ** (ตามลำดับ, อ้างอิง workflow ของ `/build-ep` skill):

1. อ่าน [`adventure-builder/journal-template.md`](../../adventure-builder/journal-template.md) และ [`adventure-builder/structure-guide.md`](../../adventure-builder/structure-guide.md) และ [`adventure-builder/canon-reference.md`](../../adventure-builder/canon-reference.md) ให้ครบทั้งไฟล์ก่อนเริ่มเขียนอะไรทั้งสิ้น (บังคับตาม skill — ห้ามข้าม แม้จะทำมาหลายรอบแล้ว กฎอาจถูกแก้ระหว่างทาง)
2. สร้างโฟลเดอร์ `ACT04-twisted-wilds/` พร้อม `00-act-outline.md` (ใช้ `ACT03-the-sunless-sea/00-act-outline.md` เป็นแม่แบบโครงสร้าง)
3. ต่อ Chapter ทีละชั้น: Ch.1 = Level 4 (Twisted Caverns), Ch.2 = Level 5 (Wyllowwood), Ch.3 = Level 6 (Lost Level) — แต่ละ Chapter มี `CH0X-slug.md` brief ของตัวเอง (ใส่ Companion Quick Notes ไว้ในนี้ ไม่ใช่ใน Act outline — ดูหัวข้อ 5.2)
4. ต่อ EP เลขต่อเนื่องข้าม Chapter ทั้ง Act (ไม่รีเซ็ตเป็น EP01 ทุก Chapter) — เช็คไฟล์ EP ล่าสุดที่มีอยู่แล้วในโฟลเดอร์ Act ก่อนตั้งเลขใหม่เสมอ
5. ใช้ pipeline การสกัดเนื้อหาในหัวข้อ 4 ด้านล่าง ดึงเนื้อหาจาก 2 ไฟล์ต้นทางออกมาเป็น plaintext ก่อนเขียน markdown จริง
6. เขียนตามกฎรูปแบบในหัวข้อ 5 ให้ครบทุกข้อ ไม่ตัดทอนเนื้อหาห้อง/NPC/treasure ใดๆ
7. อัปเดต bookkeeping 4 จุดเสมอหลังจบแต่ละ EP: `00-act-outline.md` (ลิงก์ ✅), `PROGRESS.md` (checklist + ตาราง Act), memory file `project_waterdeep_duology_conversion.md`, `MEMORY.md` index บรรทัดเดียว — และอัปเดตไฟล์นี้ (`NEXT-SESSION.md`) ด้วยทุกครั้งที่จบ session ทำงาน

**เนื้อเรื่องคร่าวๆ ของ Level 4-6** (จากการอ่านหัวข้อ H1 คร่าวๆ ตอนสำรวจ ยังไม่ได้อ่านเนื้อหาเต็ม — ต้องอ่านจริงตอนเริ่มทำ):
- Level 4 (Twisted Caverns): อาณาเขต kuo-toa, aboleth Illuun เป็นภัยเงียบเบื้องหลัง (มีพูดถึงในหลาย EP ก่อนหน้าแล้วว่า kuo-toa หนีจากที่นี่), ดรอว์ House Auvryndar (Melith น้องสาว T'rissa) เพิ่งตั้งฐานที่มั่นที่นี่ (ปูมาแล้วใน EP01 ของ Act 3 พื้นที่ 7d/7e)
- Level 5 (Wyllowwood): มีประตูเวท (Halaster's Gate) เชื่อมมาจาก Level 3 พื้นที่ 15a (Gate of the Elder Wand) — ปาร์ตี้อาจข้ามมาทางลัดได้ถ้าเลือกใช้ประตูนั้นระหว่าง Level 3
- Level 6 (Lost Level): มีประตูเวทเชื่อมมาจาก Level 3 พื้นที่ 21p ด้วย (ไปโผล่ที่พื้นที่ 36c บน Level 6)

---

## 3. กฎ/ธรรมเนียมที่ตกลงกันไว้แล้ว — ห้ามเปลี่ยนโดยไม่ถามผู้ใช้ก่อน

1. **Companion layering rule** (จาก `99-notes.md`, พร้อมข้อยกเว้นที่ตกลงกันไว้):
   - Quick Notes → ไปอยู่ใน **CH0X brief ของชั้นนั้น** (ไม่ใช่ Act outline — deviation จากคำเดิมใน 99-notes.md ที่ตกลงกันตั้งแต่ Act 2 เพื่อกัน Act outline ยาวเกินไปเมื่อมีหลาย Chapter สะสม)
   - Before the Descent → hook เปิด EP แรกของชั้นนั้น
   - Random Encounters → ตาราง/หัวข้อ hazard ใกล้ต้น EP
   - Areas of Note → แทรกเนื้อหาเข้าห้อง/พื้นที่ที่เกี่ยวข้องโดยตรง ไม่แยกเป็นหัวข้อลอย
   - Epilogue → ปิดท้าย EP สุดท้ายของชั้นนั้นด้วย "The Host's Send-Off" (มาตรฐาน Halaster's Game motif) คู่กับ "The Standard Send-Off" ให้เลือกอ่านอย่างใดอย่างหนึ่ง
2. **Halaster's Game motif** ใช้ต่อเนื่องทุกชั้น — อ้างอิง [`03-halasters-game-framework.md`](./03-halasters-game-framework.md) เสมอ (7 เป้าหมาย Halaster, Gags & Gimmicks, 10 แฟกชัน, ตาราง 31 Halaster's Gates) ถ้าชั้นนั้นมี Halaster's Gate ให้ครอสเรฟกับตารางในไฟล์นี้
3. **ไม่ตัดเนื้อหาเพื่อความสั้น** — ทุกห้อง/พื้นที่/NPC/treasure/trap ในต้นฉบับ WDMM ต้องมี full breakdown เสมอ นี่คือมาตรฐานที่ยึดมาตั้งแต่ Act 1 EP1 และคงไว้ตลอดทุก Act
4. **หนึ่ง Chapter = หนึ่ง Level ของ Undermountain เสมอ** (ไม่ว่า Chapter จะมีกี่ EP ก็ตาม)
5. **หนึ่ง Chapter ปกติ = หนึ่งไฟล์ EP** เว้นแต่เนื้อหาใหญ่เกินไปจริงๆ (ดูเกณฑ์ตัดสินใจในหัวข้อ 5.3) — ถ้าต้องแตกเป็นหลาย EP ให้ตั้งชื่อไฟล์แบบ `EP0Y - <ชื่อ Chapter>, Part 1 - <หัวข้อย่อย>.md`, `EP0Z - <ชื่อ Chapter>, Part 2 - <หัวข้อย่อย>.md` ตามที่ทำกับ Skullport (EP02/EP03)
6. **เลข EP นับต่อเนื่องทั้ง Act** ไม่รีเซ็ตทุก Chapter — ไม่มี `CH0X-` นำหน้าชื่อไฟล์ EP เด็ดขาด
7. **ห้ามสร้างโฟลเดอร์ย่อยเพิ่มใน Act** ไฟล์ journal อยู่แบนในโฟลเดอร์ Act เดียวกับ brief/outline เสมอ
8. **Canon reference rule**: ถ้าชื่อสถานที่/NPC/องค์กรอาจซ้ำกับ Critical Role canon ต้องถามผู้ใช้ก่อนค้น ห้ามเดาเอง (ดู `feedback_canon_reference_rule` ใน memory + `adventure-builder/canon-reference.md`)
9. **ตอบกลับผู้ใช้เป็นภาษาไทย** เสมอในบทสนทนา (prompt ภาพ/รูปเป็นภาษาอังกฤษได้ถ้ามี)
10. **รายงานผลแบบไม่มโน** — ถ้าทำ EP เสร็จ บอกสรุปเนื้อหาจริงที่เขียน ไม่พูดเกินจริง และถามผู้ใช้เสมอว่าจะทำ EP/Chapter/Act ถัดไปต่อเลยไหม อย่าลุยต่อเองแบบไม่ยั้งหยุดจนกว่าจะมีคำยืนยัน "ทำต่อ" ใหม่ทุกรอบ (แต่ละ "ทำต่อ" = อนุมัติทำหนึ่งก้อนเนื้อหาถัดไป ไม่ใช่คำสั่งให้ลุยยาวไม่หยุดทั้งที่เหลือ)

---

## 4. Pipeline การสกัดเนื้อหาจากไฟล์ JSON ต้นทาง (ต้องทำใหม่ทุก session เพราะ scratchpad ถูกล้าง)

ไฟล์ต้นทางอยู่ที่:
- `adventures/gilded-city-mad-depths/_source/waterdeep-dungeon-of-the-mad-mage.json` (WDMM ทางการ, 30 pages — index `.pages[].name`)
- `adventures/gilded-city-mad-depths/_source/dungeon-of-the-mad-mage-companion.json` (Companion แฟนเมด, 30 pages)

**Helper script ถาวรอยู่แล้วที่**: [`_source/extract-tools/extract-common.js`](./_source/extract-tools/extract-common.js) — มีฟังก์ชัน `clean(html)` (HTML→plaintext แบบ markdown-ish: h1-h4→`#`-`####`, table→`[TABLE START]/[ROW]/|`, list→`- `, bold/italic→`**`/`*`, img→`[IMG]`), `headingIndex(html)` (คืน array ของ `{level, text, offset}` ไล่หา h1-h4 ทั้งหมด), `imageIndex(html)` (คืนตำแหน่ง+src/alt/title ของ `<img>` ทั้งหมด) — **ใช้ต่อได้เลย ไม่ต้องเขียนใหม่**

**ขั้นตอนมาตรฐาน** (รันผ่าน Bash tool, working directory = scratchpad):

```js
// 1. โหลด page ที่ต้องการจากทั้งสองไฟล์ + เขียน raw HTML ลง scratchpad
const fs = require('fs');
const wdmm = JSON.parse(fs.readFileSync('D:/dnd-gacha-rolling/adventures/gilded-city-mad-depths/_source/waterdeep-dungeon-of-the-mad-mage.json','utf8'));
const comp = JSON.parse(fs.readFileSync('D:/dnd-gacha-rolling/adventures/gilded-city-mad-depths/_source/dungeon-of-the-mad-mage-companion.json','utf8'));
const pw = wdmm.pages.find(p => p.name === 'Level 4: Twisted Caverns');
const pc = comp.pages.find(p => p.name === 'Level IV: The Twisted Caverns');
fs.writeFileSync('l4_wdmm_raw.html', pw.text.content);
fs.writeFileSync('l4_companion_raw.html', pc.text.content);

// 2. หา heading index ของแต่ละไฟล์ (ใช้กำหนดจุดตัด chunk)
const { clean, headingIndex, imageIndex } = require('D:/dnd-gacha-rolling/adventures/gilded-city-mad-depths/_source/extract-tools/extract-common.js');
fs.writeFileSync('l4w_headings.json', JSON.stringify(headingIndex(pw.text.content), null, 1));
fs.writeFileSync('l4w_images.json', JSON.stringify(imageIndex(pw.text.content), null, 1));
```

3. **อ่าน `l4w_headings.json` ด้วย Read tool** เพื่อวางแผนว่าจะตัด chunk ตรงไหน (ตัดตาม H1 หลักก่อน เช่น "What Dwells Here?" / "Exploring This Level" / "Aftermath", แล้วถ้า "Exploring This Level" ยาวเกินไป ให้ตัดย่อยตาม H2 เป็นกลุ่มพื้นที่ ~5-9 ห้องต่อ chunk — ดูตัวอย่างจริงที่ `slice_l3.js`/`slice_skullport_wdmm.js` ที่เคยเขียนไว้ใน session ก่อน แต่ไฟล์นั้นอยู่ใน scratchpad ที่ถูกล้างไปแล้ว ต้องเขียนสคริปต์ตัด chunk ใหม่ทุกครั้งโดยอิง headingIndex + `html.slice(startOffset, endOffset)` แล้ว `clean()` แต่ละ chunk)
4. **Read ทีละ chunk ที่ตัดออกมา** (ไฟล์ `.txt`) ก่อนเขียน markdown จริง — ห้ามข้ามการอ่านเนื้อหาต้นฉบับจริงแล้วเดาเอาเอง
5. ทำแบบเดียวกันกับไฟล์ Companion (`l4c_...`) แล้วรวมเนื้อหาสองฝั่งตาม Companion layering rule (หัวข้อ 3.1)

**ข้อควรระวังที่เจอมาแล้ว**:
- Heading บางอันในเนื้อหาที่ clean() แล้วอาจมีช่องว่างซ้ำ (`"#  ชื่อหัวข้อ"` สองช่องว่าง) เป็น artifact จาก source HTML เดิม — ถ้าจะ `indexOf()` หาตำแหน่ง heading ในข้อความที่ clean แล้ว ให้ Grep หา pattern `^# ` ก่อนเพื่อดู exact string แทนการเดา ไม่งั้น indexOf จะคืน -1
- ชื่อ page บางอันมี HTML entity ปนอยู่ เช่น `22. The Guts &amp; Garters` — ตอน `.find(p => p.name === ...)` ต้องใช้ string ที่มี `&amp;` ตรงตัว ไม่ใช่ `&`

---

## 5. กฎการเขียนไฟล์ markdown (สรุปจาก journal-template.md — แต่ต้องอ่านไฟล์เต็มจริงเสมอ อันนี้แค่กันลืม)

### 5.1 โครงสร้างบังคับของทุกไฟล์ EP
- บรรทัดแรกสุด: `# EP0Y: <ชื่อตอนเต็ม Title Case>`
- บรรทัด italic รองลงมา: `*Level X-Y — Chapter N ของ [Act M: <ชื่อ>](./00-act-outline.md) — ต่อจาก [EP ก่อนหน้า](<link>)*`
- `## NPC ประจำ EP` — ตาราง markdown 2-3 คอลัมน์ (ชื่อ/บทบาท/หมายเหตุ) ครอบคลุม NPC สำคัญทุกตัวที่มีบทพูด/จุดตัดสินใจ (ไม่ต้องรวม mook ทั่วไป) — ขนาดทั่วไปที่ทำมาแล้วคือ 10-16 แถว
- `## Story Overview` — ย่อหน้าปูเรื่องสั้นๆ
- `## Before the Descent` (เฉพาะ EP แรกของ Chapter/Level) — boxed text (`> *...*`) เปิดฉาก + ข้อมูล DM prep เพิ่มเติม (provisioning/rumors ถ้ามี)
- `## What Dwells Here?` — สรุปแฟกชัน/มอนสเตอร์หลักที่ครองพื้นที่
- `## Wandering Monsters & Random Encounters` (ถ้าต้นฉบับมี) — ตาราง d-อะไรก็ตาม + รายละเอียดแต่ละผลลัพธ์
- `## สำรวจ Level X` (H2) ครอบ `### N. ชื่อพื้นที่หลัก` (H3) → `#### Na. ชื่อพื้นที่ย่อย` (H4) → `##### Treasure` (H5) — **ระดับ heading เหล่านี้ตายตัว ห้ามสลับ**
- `## Aftermath / The Host's Send-Off` ปิดท้าย — มี boxed text ทั้ง "Standard Send-Off" และ "Host's Send-Off" ให้เลือก
- บรรทัดท้ายไฟล์: `[← กลับ Chapter brief](./CH0X-slug.md) · [กลับ Act X outline](./00-act-outline.md)`

### 5.2 กฎเนื้อหาแต่ละห้อง (จาก journal-template.md ข้อ 1)
- ทุกสถานที่ที่ถูกพูดถึงต้องมี section ของตัวเอง
- ทุก NPC ที่ให้ข้อมูลสำคัญต้องมี `### What [ชื่อ] Knows` หรือเทียบเท่า (ในทางปฏิบัติที่ทำมา มักฝังรายละเอียดนี้ในเนื้อหาห้องแทนแยกหัวข้อ ถ้า NPC พูดข้อมูลสำคัญเป็น list ให้ทำ bullet list ในพื้นที่นั้น)
- ทุก encounter ต้องมี **Tactics** ระบุชัด (มอนสเตอร์ทำอะไรก่อน-หลัง)
- ทุกจุด loot ต้องมี `##### Treasure` heading พร้อม gp/ไอเทมชัดเจน ไม่พูดลอยๆ ว่า "มีของมีค่า"
- boxed read-aloud text ใช้ `> *...*` เสมอ, DC/mechanics ตัวหนา (`**DC 15**`), ชื่อคาถา/ไอเทม/มอนสเตอร์ตัวหนา
- narration (สิ่งที่ผู้เล่นเห็น/ได้ยิน) แยกให้ชัดจาก DM-only note (เช่น sidebar คำแนะนำจาก Companion ที่ไม่ใช่สิ่งผู้เล่นรู้ — ใส่ *ตัวเอียงมีคำอธิบาย* กำกับไว้ว่าเป็นข้อมูล DM)

### 5.3 เกณฑ์ตัดสินใจว่าจะแตก 1 Chapter เป็นหลาย EP หรือไม่
บรรทัดฐานที่ใช้จริงจนถึงตอนนี้: **Level 1, 2, 3 = จบใน 1 EP ได้แม้มี 20-40+ ห้อง** (เพราะยังเป็นแค่ "ดันเจี้ยนชั้นเดียว") แต่ **Skullport แตกเป็น 2 EP เพราะเป็นเมืองฮับเต็มรูปแบบ (36 สถานที่) บวกเควสต์ไลน์ยาว 5 องก์แยกต่างหาก (Return of the Thirteen)** ไม่ใช่แค่ห้องเยอะ แต่มีเนื้อหาคนละ "ประเภท" ปนกัน (พื้นที่/สถานที่ ≠ เนื้อเรื่องเควสต์) — เกณฑ์ที่ใช้ตัดสินคือ **"เนื้อหาต่างประเภทกันจริงจนแยกอ่าน/แยกรันได้อย่างเป็นธรรมชาติ" ไม่ใช่แค่ "ยาวเกินไป"** ถ้า Level 4-6 ยาวมากแต่ยังเป็นดันเจี้ยนธรรมดาต่อเนื่อง ให้เขียนเป็น 1 EP ต่อ Chapter ตามปกติก่อน แล้วค่อยประเมินหน้างานว่าจำเป็นต้องแตกจริงหรือไม่

---

## 6. ตาราง Act คร่าวๆ ทั้งหมด (จาก PROGRESS.md — ใช้เป็นแผนที่รวม ปรับได้เมื่อใกล้ถึงจริง)

| Act (คร่าวๆ) | เนื้อหา | Char level | สถานะ |
|---|---|---|---|
| Dragon Heist | ทั้งเล่ม | 1-5 | ✅ ครบ (Act 1, 12 EP) |
| Into the Yawning Depths | Level 1-2 | 5-7 | ✅ ครบ (Act 2, EP01-02) |
| The Sunless Sea | Level 3 + Skullport | 7-9 | ✅ ครบ (Act 3, EP01-03) |
| **Twisted Wilds** | **Level 4-6** | **9-11** | **⬜ ถัดไป — ดูหัวข้อ 2** |
| Castle & Swamp | Level 7-9 | 11-13 | ⬜ รอคิว |
| Muiral's Gauntlet | Level 10-12 | 13-15 | ⬜ รอคิว |
| Graveyard & Ruin | Level 13-15 | 15-17 | ⬜ รอคิว |
| Crystal & Sea | Level 16-18 | 17-18 | ⬜ รอคิว |
| The Deepest Halls | Level 19-21 | 18-19 | ⬜ รอคิว |
| Halaster's Reckoning | Level 22-23 (ไฟนอล) | 19-20 | ⬜ รอคิว |

---

## 7. เอกสารอ้างอิงที่ต้องรู้จักไว้เสมอ

- [`adventure-builder/journal-template.md`](../../adventure-builder/journal-template.md) — กฎรูปแบบ journal เต็ม (อ่านทุกครั้งก่อนเขียน EP)
- [`adventure-builder/structure-guide.md`](../../adventure-builder/structure-guide.md) — กฎโครงสร้างโฟลเดอร์/ไฟล์ (อ่านทุกครั้งก่อนเขียน)
- [`adventure-builder/canon-reference.md`](../../adventure-builder/canon-reference.md) — กฎเช็ค CR Wiki canon
- [`99-notes.md`](./99-notes.md) — กฎผสาน Companion เข้า WDMM (มี deviation เรื่อง Quick Notes placement ที่ตกลงกันแล้ว — ดูหัวข้อ 3.1)
- [`03-halasters-game-framework.md`](./03-halasters-game-framework.md) — กรอบ Halaster's Game ทั้งแคมเปญ (goals/gags/factions/gates)
- [`PROGRESS.md`](./PROGRESS.md) — checklist ละเอียดทุกบรรทัดของทุก Act/EP ที่ทำไปแล้ว
- Memory ถาวร: `project_waterdeep_duology_conversion.md` (ในโฟลเดอร์ memory ของ Claude) — ประวัติการตัดสินใจแบบเจาะจงเซสชันต่อเซสชัน, ลิงก์จาก `MEMORY.md` index

---

## 8. เมื่อผู้ใช้พิมพ์ "ทำต่อ" ในเซสชันถัดไป

1. อ่านไฟล์นี้ทั้งหมดก่อน
2. ยืนยันสั้นๆ 1 บรรทัดว่าจะเริ่ม Act 4 (Level 4: Twisted Caverns) หรือถามถ้าผู้ใช้ระบุงานอื่นเจาะจง
3. เข้าสู่ขั้นตอนในหัวข้อ 2 ทันที ไม่ต้องถามซ้ำเรื่อง scope/รูปแบบที่ตกลงกันไปแล้วในหัวข้อ 3-5
4. ทำงานทีละ EP แล้วรายงานผล + ถามว่าทำต่อเลยไหมทุกครั้ง (ตามกฎข้อ 10 ในหัวข้อ 3)
5. อัปเดตไฟล์นี้ทุกครั้งที่จบก้อนงานใหญ่ (จบ 1 EP ขึ้นไป) ให้ "สถานะโดยรวม" (หัวข้อ 1) และ "งานถัดไปแบบเจาะจง" (หัวข้อ 2) ตรงกับความจริงเสมอ — ไฟล์นี้ต้อง**ไม่ล้าสมัย**ไม่ว่าจะกลับมาทำต่อเมื่อไหร่
