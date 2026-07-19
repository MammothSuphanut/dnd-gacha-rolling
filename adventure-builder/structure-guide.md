# Adventure Structure Guide

เอกสารนี้คือ**กติกากลางเรื่องโครงสร้างไฟล์/โฟลเดอร์** ที่ทุก adventure ในโปรเจกต์ใช้ร่วมกัน ไม่ว่าจะเป็น one-shot, short campaign, หรือ long campaign — `/build-adventure` และ `/build-ep` ทุกคำสั่งอ่านไฟล์นี้เป็น source of truth เดียวกัน

ตัวอย่างจริงในโปรเจกต์: `frozen-sick-the-plague-covenant` (short campaign, มี Act เดียวคือ `ACT01-the-plague-covenant/`) และ `aeorian-cataclysm` (long campaign, มี 6 โฟลเดอร์ `ACT0X-slug/`) — ทั้งสองเรื่องเป็นไปตามกติกาเดียวกันนี้ทุกประการ ไม่มี adventure ไหนในโปรเจกต์ที่ไม่มีโฟลเดอร์ Act เลย

## หลักการ: ทุก adventure มีโฟลเดอร์ Act อย่างน้อย 1 อันเสมอ

โครงสร้างมี 3 "ระดับ" เชิงเนื้อเรื่องเสมอ (Adventure → Act → Chapter → EP) — **ระดับ Act เป็นโฟลเดอร์จริงเสมอ ไม่มีข้อยกเว้น** แม้ adventure จะสั้นแค่ไหน (one-shot ก็ยังมี `ACT01-slug/` หนึ่งโฟลเดอร์) เพื่อให้ทุก adventure ในโปรเจกต์หน้าตาเหมือนกันเป๊ะๆ เปิดโฟลเดอร์ไหนก็เจอ pattern เดิม ไม่ต้องเดาว่าเรื่องนี้ใช้ convention ไหน — ส่วน Chapter กับ EP เป็น**ไฟล์แบน**วางเรียงต่อกันอยู่ในโฟลเดอร์ Act เดียวกัน ไม่ซ้อนโฟลเดอร์อีกชั้น เหตุผล: ตอนเล่นจริงก็เรียงเล่นตามลำดับ EP อยู่แล้ว การซ้อนโฟลเดอร์ตาม Chapter แยกต่างหากมีแต่ทำให้ต้องคลิกลึกเข้าไปโดยไม่ได้ช่วยอะไรเพิ่ม ในเมื่อชื่อไฟล์ (`CH0X-...`, `EP0Y - ...`) เรียงตัวอักษร/ตัวเลขให้ตรงกับลำดับเล่นอยู่แล้ว (Chapter ทั้งหมดขึ้นต้น `CH` มาก่อน ตามด้วย EP ทั้งหมดขึ้นต้น `EP` เรียงเลขต่อเนื่อง)

### กฎ 1 — สร้างโฟลเดอร์ `ACT0X-slug/` อย่างน้อย 1 อันเสมอ

- มี Act เดียวทั้งเรื่อง (ธรรมชาติของ one-shot/short campaign) → ยังคงมีโฟลเดอร์ `ACT01-slug/` หนึ่งอัน ครอบทุก Chapter/EP ของทั้งเรื่องไว้ในนั้น (แบบ `frozen-sick-the-plague-covenant` — ทั้ง 6 EP อยู่ใน `ACT01-the-plague-covenant/`)
- มีหลาย Act จริง (long campaign) → แต่ละ Act ได้โฟลเดอร์ของตัวเอง `ACT0X-slug/`
- ชื่อ slug ของ Act เดียว (กรณีมี Act เดียว) ตั้งให้สื่อธีม/ชื่อรองของ adventure นั้นได้เลย ไม่ต้องเป็นคำว่า "act-1" เฉยๆ
- **ระวังเนื้อหาซ้ำเมื่อมี Act เดียว**: ถ้าทั้งเรื่องมี Act เดียว ห้ามใส่รายละเอียดแคมเปญชุดเดียวกัน (ประเภท, level range, ระบบเลื่อนระดับ, theme, setting, สารบัญ EP) ซ้ำทั้งใน `00-overview.md` (root) และ `ACT01-slug/00-act-outline.md` — ให้รายละเอียดพวกนี้อยู่ใน `00-act-outline.md` ที่เดียว ส่วน root `00-overview.md` เหลือแค่สิ่งที่เป็น root-scope จริงๆ (จุดเชื่อม Astral Nexus + สารบัญ Act ที่ชี้ไปไฟล์เดียวนั้น) พร้อมประโยคสั้นๆ บอกให้ไปอ่านรายละเอียดที่ act-outline — ข้อยกเว้นคือ **Story Overview / Adventure Summary แบบ prose เต็ม** (เนื้อเรื่อง ไม่ใช่ตัวเลข/สารบัญ) ที่ `/build-ep` เติมเข้ามาทีหลังได้ตามปกติ ไม่นับเป็นเนื้อหาซ้ำ — ตัวอย่างแก้แล้วดูที่ `frozen-sick-the-plague-covenant/00-overview.md`

### กฎ 2 — ภายในโฟลเดอร์ Act: Chapter กับ EP เป็นไฟล์แบน เรียงตามลำดับเล่น

- ไฟล์ `ACT0X-slug/00-act-outline.md` ทำหน้าที่เป็น**สารบัญ** ว่า Chapter ไหนมี EP ไหนบ้าง
- Chapter brief เป็นไฟล์ `CH0X-slug.md` (lowercase-hyphen slug) — ถ้า Act นั้นมี **Chapter เดียว** ให้ยุบรวมเนื้อหาเข้ากับ `00-act-outline.md` ไปเลย ไม่ต้องมีไฟล์ Chapter แยก (ดูตัวอย่าง Act 6 ใน `aeorian-cataclysm` ที่มีแค่ 1 Chapter)
- **EP ทุกไฟล์ (ไม่ว่า Act นั้นจะมี Chapter หรือไม่) ตั้งชื่อ `EP0Y - ชื่อตอนเต็ม.md`** — เลข `EP0Y` **นับต่อเนื่องทั้ง Act** ไม่รีเซ็ตตาม Chapter (เช่น Chapter 3 ของ Act ที่ EP ล่าสุดคือ EP4 จาก Chapter ก่อนหน้า ก็เริ่มที่ EP5 ต่อเลย ไม่ใช่ EP1 ใหม่) — **ห้ามมี `CH0X-` นำหน้าไฟล์ EP เด็ดขาด** แม้ Act นั้นจะมีหลาย Chapter ก็ตาม (Chapter ที่ EP นั้นสังกัดอยู่ระบุไว้แค่ในเนื้อหา/บรรทัดใต้หัวเรื่องของไฟล์ EP เอง ไม่ต้องเข้ารหัสไว้ในชื่อไฟล์)
  - รูปแบบชื่อ: `EP` + เลข 2 หลัก + ` - ` (เว้นวรรค-ขีด-เว้นวรรค) + ชื่อตอนแบบ Title Case เต็ม (มีเว้นวรรคปกติ ไม่ใช้ตัวพิมพ์เล็ก-ขีดกลางแบบ slug) — ตัวอย่างจริง: `EP01 - Travel to Syrinlya.md`, `EP03 - Little Thieves of Palebank.md`
  - **EP หนึ่งเลขมีไฟล์เดียวเสมอ ห้ามมีไฟล์ซ้อนเลขเดียวกัน** — ถ้า Act นั้นเขียน outline เต็มแยกไว้ล่วงหน้าด้วย (ตามกฎ 3 — adventure สั้น ≤10 EP) ไฟล์ outline นั้นชื่อ slug ชั่วคราว `EP0Y-slug.md` แต่พอ `/build-ep` ขยายเป็น journal เต็มของ EP เดียวกันเมื่อไหร่ **ต้องรวมข้อมูลที่มีเฉพาะใน outline (เช่นตาราง NPC ประจำ EP) เข้าไปในไฟล์ journal แล้วลบไฟล์ outline ทิ้ง** — ผลลัพธ์สุดท้ายของทุก EP คือไฟล์ `EP0Y - ชื่อตอนเต็ม.md` ไฟล์เดียวเสมอ ไม่มีทางที่ EP เลขเดียวกันจะมีสองไฟล์ค้างอยู่พร้อมกัน
  - ไฟล์ journal ที่มีเว้นวรรคในชื่อ ต้องครอบลิงก์ด้วย `<...>` เวลาลิงก์จาก Markdown อื่น เช่น `[EP1: Travel to Syrinlya](<./EP01 - Travel to Syrinlya.md>)` เพื่อให้ path เว้นวรรค parse ถูกต้อง

### กฎ 3 — ความละเอียดของ outline ผูกกับขนาดเนื้อหา ไม่ใช่ผูกกับโฟลเดอร์

- **adventure ที่มี EP รวมทั้งเรื่อง ≤ ~10 EP** (ธรรมชาติของ one-shot/short campaign) → เขียน outline เต็มของทุก EP ไว้ล่วงหน้าตั้งแต่ตอนสร้างเรื่องเลย เป็นไฟล์ `EP0Y-slug.md` เพราะสโคปทั้งเรื่องมองเห็นจบตั้งแต่แรก — ไฟล์นี้เป็นแค่สถานะ**ชั่วคราว**ก่อน `/build-ep` มาขยาย เมื่อขยายเป็น journal เต็มแล้วไฟล์ slug นี้จะถูกรวมเข้า journal แล้วลบทิ้ง (ดูกฎ 2)
- **adventure ที่ยาวเกินนั้น** (long campaign หลายสิบ EP) → `00-act-outline.md`/`CH0X-slug.md` มีแค่หัวข้อ "EP ที่แนะนำ" แบบสรุปย่อ (bullet) เท่านั้น **ไม่ต้อง**ลงไฟล์ outline เต็มแยกต่อ EP ล่วงหน้า — เหตุผล: campaign ระดับ 1-20 ใช้เวลาเล่นเป็นปี เขียนละเอียดทุก EP ตั้งแต่ต้นมีโอกาสสูงที่เนื้อหาจะเปลี่ยนก่อนได้เล่นจริง ให้ลงรายละเอียดแบบ **just-in-time** ก่อนใกล้ถึง EP นั้นจริง ด้วย `/build-ep` แทน — ผลลัพธ์คือไฟล์ `EP0Y - ชื่อตอน.md` เท่านั้น (ไม่มี outline คั่นกลาง)

## ไฟล์ที่ root เสมอ (ทุกขนาด)

```
adventures/<slug>/
  00-overview.md               ภาพรวม, level range, ระบบเลื่อนระดับ, จุดเชื่อม Astral Nexus, สารบัญ Act
  01-hook-and-antagonist.md    Hook, ตัวร้าย, เดิมพัน
  02-npcs.md                   ตาราง NPC สำคัญ
  99-notes.md                  องค์ประกอบพิเศษ + จุดเปิดกว้างให้ DM ปรับหน้างาน
  PROGRESS.md                  (ไม่บังคับ) checklist งานที่เหลือ — ใช้เฉพาะเรื่องที่มีงานหลายรอบ/ยาวจนต้องมี tracker
```

เมื่อ `/build-ep` ทำ "ภาพรวมทั้งเรื่องแบบ prose เต็ม" (Story Overview + Adventure Summary) ให้**ขยายเข้าไปใน `00-overview.md` ไฟล์เดิมโดยตรง** ไม่สร้างไฟล์ `00-overview-journal.md` แยกต่างหาก — กติกาเดียวกับ EP (กฎ 2): มีไฟล์เดียวต่อ 1 หัวข้อเสมอ ไม่ปล่อยให้ไฟล์สรุปย่อกับไฟล์ prose เต็มค้างอยู่คู่กัน

## Journal ไม่มีโฟลเดอร์แยก

ไฟล์ journal ฉบับเต็ม (`EP0Y - ชื่อตอน.md`) วางไว้**ชั้นเดียวกับไฟล์ brief ของ Act/Chapter นั้น**เสมอ — ไม่มีโฟลเดอร์ `journal/` แยกต่างหาก เพื่อไม่ให้ต้องเปิดโฟลเดอร์ซ้อนโฟลเดอร์โดยไม่จำเป็น เห็นสถานะ "ทำ journal ของ EP ไหนแล้วบ้าง" ได้จาก file listing เดียว (ไฟล์ `EP0Y-slug.md` แบบ outline ที่เขียนไว้ล่วงหน้าจะถูกรวมเข้า journal แล้วลบทิ้งทันทีที่ขยายเสร็จ — ไม่ปล่อยให้ค้างคู่กัน ดูกฎ 2)

## ตัวอย่างที่คำนวณจากกฎทั้งสาม

### One-shot / short campaign แบบไม่มี Chapter (≤10 EP, Act เดียว, EP เรียงตรง)

```
adventures/<slug>/
  00-overview.md               ลิงก์ไปแค่ ACT01 เดียว ไม่ลิงก์ EP โดยตรง
  01-hook-and-antagonist.md
  02-npcs.md
  99-notes.md
  ACT01-<slug>/
    00-act-outline.md                              สารบัญ EP ทั้งหมดของ Act เดียวนี้ (ไม่มี Chapter คั่น)
    EP01-<slug>.md ... EP06-<slug>.md              outline เต็มทุก EP (เขียนตั้งแต่ /build-adventure — สถานะชั่วคราวก่อนถูกรวมเข้า journal)
```
เมื่อ `/build-ep` ขยาย EP ไหนเป็น journal เต็มแล้ว ไฟล์ `EP0Y-<slug>.md` ของ EP นั้นจะถูกรวมเข้า `EP0Y - <ชื่อตอน>.md` แล้วลบทิ้งทันที (ดูกฎ 2) — ถ้าขยายครบทุก EP แล้ว โฟลเดอร์นี้จะเหลือแค่ `00-act-outline.md` + `EP01 - <ชื่อตอน>.md` ... `EP06 - <ชื่อตอน>.md` เท่านั้น ไม่มีไฟล์ `EP0Y-<slug>.md` ค้างอยู่คู่กันเลย

### Short campaign ที่แบ่ง Chapter ภายใน Act เดียว (ตรงกับ `frozen-sick-the-plague-covenant` ปัจจุบัน)

Act เดียวไม่ได้แปลว่าห้ามมี Chapter — ถ้าเนื้อเรื่องมีจังหวะ/arc ย่อยชัดเจน (แม้ EP รวมจะ ≤10) ก็แบ่ง Chapter ภายใน Act เดียวนั้นได้ตามกฎ 2 ปกติ:

```
adventures/<slug>/
  00-overview.md
  01-hook-and-antagonist.md
  02-npcs.md
  99-notes.md
  ACT01-<slug>/
    00-act-outline.md              สารบัญ: Chapter ไหนมี EP ไหน
    CH01-<slug>.md                  chapter brief มีหัวข้อ "EP ในบทนี้" ลิงก์ไปไฟล์ journal ของแต่ละ EP ในบทนั้น
    EP01 - <ชื่อตอน>.md            journal เต็ม (ไม่มี CH0X- นำหน้า — กฎเดียวกับ long campaign)
    EP02 - <ชื่อตอน>.md
    CH02-<slug>.md
    EP03 - <ชื่อตอน>.md
    EP04 - <ชื่อตอน>.md
    CH03-<slug>.md
    EP05 - <ชื่อตอน>.md
    EP06 - <ชื่อตอน>.md
```
(ดูตัวอย่างจริงที่ `frozen-sick-the-plague-covenant/ACT01-the-plague-covenant/`)

### Long campaign หลาย Act หลาย Chapter (>10 EP รวม — ตรงกับ `aeorian-cataclysm` ปัจจุบัน)

```
adventures/<slug>/
  00-overview.md
  01-hook-and-antagonist.md
  02-npcs.md
  99-notes.md
  PROGRESS.md
  ACT01-<slug>/
    00-act-outline.md            สารบัญ: Chapter ไหนมี EP ไหน (ลิงก์เฉพาะ EP ที่ขยายเป็น journal แล้ว)
    CH01-<slug>.md                chapter brief มีหัวข้อ "EP ที่แนะนำ" แบบย่อของ Chapter นี้
    CH02-<slug>.md
    CH03-<slug>.md
    EP01 - <ชื่อตอน>.md          journal เต็ม สร้างแบบ just-in-time ด้วย /build-ep — เลขนับต่อเนื่องทั้ง Act ไม่ใช่รีเซ็ตต่อ Chapter, ไม่มี CH0X- นำหน้า (EP นี้อาจสังกัด Chapter 1 หรือ Chapter อื่นก็ได้ ดูได้จากเนื้อหาในไฟล์)
    EP02 - <ชื่อตอน>.md
    CH04-<slug>.md
  ACT02-<slug>/
    ...
```

### Act ที่มีแค่ 1 Chapter (ยุบ Chapter file รวมกับ act-outline — ตรงกับ Act 6 ของ `aeorian-cataclysm`)

```
ACT06-<slug>/
  00-act-outline.md         รวมเนื้อหา chapter brief เข้ามาด้วยเลย เพราะมี Chapter เดียว
  EP01 - <ชื่อตอน>.md      ไม่มี CH0X- นำหน้าเหมือนกัน (กฎเดียวกับ Act ที่มีหลาย Chapter)
  EP02 - <ชื่อตอน>.md
  EP03 - <ชื่อตอน>.md
```

## เมื่อ scope ของเรื่องโตขึ้นระหว่างทาง

ถ้าเริ่มเป็น short campaign (Act เดียว) แล้วภายหลังอยากขยายยาวขึ้นจนต้องแบ่งเป็นหลาย Act จริง — แยกกลุ่ม Chapter/EP ที่เกี่ยวข้องออกเป็นโฟลเดอร์ `ACT0X-slug/` ใหม่แต่ละอัน (ย้ายทั้งคู่ brief+journal ของแต่ละ EP ไปด้วยกัน) แล้วอัปเดตลิงก์ข้ามไฟล์ใน `00-overview.md` ให้ชี้ไปแต่ละ Act ไม่ต้องคิดจากศูนย์
