# Adventure Structure Guide

เอกสารนี้คือ**กติกากลางเรื่องโครงสร้างไฟล์/โฟลเดอร์** ที่ทุก adventure ในโปรเจกต์ใช้ร่วมกัน ไม่ว่าจะเป็น one-shot, short campaign, หรือ long campaign — `/build-adventure` และ `/build-ep` ทุกคำสั่งอ่านไฟล์นี้เป็น source of truth เดียวกัน

ตัวอย่างจริงในโปรเจกต์: `frozen-sick-the-plague-covenant` (short campaign, มี Act เดียวคือ `ACT01-the-plague-covenant/`) และ `aeorian-cataclysm` (long campaign, มี 6 โฟลเดอร์ `ACT0X-slug/`) — ทั้งสองเรื่องเป็นไปตามกติกาเดียวกันนี้ทุกประการ ไม่มี adventure ไหนในโปรเจกต์ที่ไม่มีโฟลเดอร์ Act เลย

## หลักการ: ทุก adventure มีโฟลเดอร์ Act อย่างน้อย 1 อันเสมอ

โครงสร้างมี 3 "ระดับ" เชิงเนื้อเรื่องเสมอ (Adventure → Act → Chapter → EP) — **ระดับ Act เป็นโฟลเดอร์จริงเสมอ ไม่มีข้อยกเว้น** แม้ adventure จะสั้นแค่ไหน (one-shot ก็ยังมี `ACT01-slug/` หนึ่งโฟลเดอร์) เพื่อให้ทุก adventure ในโปรเจกต์หน้าตาเหมือนกันเป๊ะๆ เปิดโฟลเดอร์ไหนก็เจอ pattern เดิม ไม่ต้องเดาว่าเรื่องนี้ใช้ convention ไหน — ส่วน Chapter กับ EP เป็น**ไฟล์แบน**วางเรียงต่อกันอยู่ในโฟลเดอร์ Act เดียวกัน ไม่ซ้อนโฟลเดอร์อีกชั้น เหตุผล: ตอนเล่นจริงก็เรียงเล่นตามลำดับ EP อยู่แล้ว การซ้อนโฟลเดอร์ตาม Chapter แยกต่างหากมีแต่ทำให้ต้องคลิกลึกเข้าไปโดยไม่ได้ช่วยอะไรเพิ่ม ในเมื่อชื่อไฟล์ (`CH0X-...`, `CH0X-EP0Y-...`) เรียงตัวอักษร/ตัวเลขให้ตรงกับลำดับเล่นอยู่แล้ว

### กฎ 1 — สร้างโฟลเดอร์ `ACT0X-slug/` อย่างน้อย 1 อันเสมอ

- มี Act เดียวทั้งเรื่อง (ธรรมชาติของ one-shot/short campaign) → ยังคงมีโฟลเดอร์ `ACT01-slug/` หนึ่งอัน ครอบทุก Chapter/EP ของทั้งเรื่องไว้ในนั้น (แบบ `frozen-sick-the-plague-covenant` — ทั้ง 6 EP อยู่ใน `ACT01-the-plague-covenant/`)
- มีหลาย Act จริง (long campaign) → แต่ละ Act ได้โฟลเดอร์ของตัวเอง `ACT0X-slug/`
- ชื่อ slug ของ Act เดียว (กรณีมี Act เดียว) ตั้งให้สื่อธีม/ชื่อรองของ adventure นั้นได้เลย ไม่ต้องเป็นคำว่า "act-1" เฉยๆ
- **ระวังเนื้อหาซ้ำเมื่อมี Act เดียว**: ถ้าทั้งเรื่องมี Act เดียว ห้ามใส่รายละเอียดแคมเปญชุดเดียวกัน (ประเภท, level range, ระบบเลื่อนระดับ, theme, setting, สารบัญ EP) ซ้ำทั้งใน `00-overview.md` (root) และ `ACT01-slug/00-act-outline.md` — ให้รายละเอียดพวกนี้อยู่ใน `00-act-outline.md` ที่เดียว ส่วน root `00-overview.md` เหลือแค่สิ่งที่เป็น root-scope จริงๆ (จุดเชื่อม Astral Nexus + สารบัญ Act ที่ชี้ไปไฟล์เดียวนั้น) พร้อมประโยคสั้นๆ บอกให้ไปอ่านรายละเอียดที่ act-outline — ตัวอย่างแก้แล้วดูที่ `frozen-sick-the-plague-covenant/00-overview.md`

### กฎ 2 — ภายในโฟลเดอร์ Act: Chapter กับ EP เป็นไฟล์แบน เรียงตามลำดับเล่น

- ไฟล์ `ACT0X-slug/00-act-outline.md` ทำหน้าที่เป็น**สารบัญ** ว่า Chapter ไหนมี EP ไหนบ้าง
- Chapter brief เป็นไฟล์ `CH0X-slug.md` — ถ้า Act นั้นมี **Chapter เดียว** ให้ยุบรวมเนื้อหาเข้ากับ `00-act-outline.md` ไปเลย ไม่ต้องมีไฟล์ Chapter แยก (ดูตัวอย่าง Act 6 ใน `aeorian-cataclysm` ที่มีแค่ 1 Chapter)
- EP ของแต่ละ Chapter ตั้งชื่อ `CH0X-EP0Y-slug.md` (outline) และ/หรือ `CH0X-EP0Y-journal.md` (journal เต็ม) — คำนำหน้า `CH0X-` ทำให้ไฟล์เรียงตัวอักษรอยู่ติดกับ Chapter brief ของตัวเองเสมอ แม้จะยังไม่รู้ว่า Chapter อื่นจะมีกี่ EP กันแน่ (เช่น Chapter ที่บอกว่า "จำนวน EP ยืดหยุ่นตาม session" ก็ไม่กระทบเลขของ Chapter ถัดไป)
- ถ้า Act นั้นไม่มี Chapter เลย (Act สั้นมาก เดินเรื่องตรงเป็น EP ต่อ EP — เช่น Act เดียวของ one-shot) → EP ใช้ชื่อ `EP0Y-slug.md` ตรงๆ ไม่ต้องมี `CH0X-` นำหน้า

### กฎ 3 — ความละเอียดของ outline ผูกกับขนาดเนื้อหา ไม่ใช่ผูกกับโฟลเดอร์

- **adventure ที่มี EP รวมทั้งเรื่อง ≤ ~10 EP** (ธรรมชาติของ one-shot/short campaign) → เขียน outline เต็มของทุก EP ไว้ล่วงหน้าตั้งแต่ตอนสร้างเรื่องเลย เป็นไฟล์ `EP0Y-slug.md` (หรือ `CH0X-EP0Y-slug.md`) เพราะสโคปทั้งเรื่องมองเห็นจบตั้งแต่แรก
- **adventure ที่ยาวเกินนั้น** (long campaign หลายสิบ EP) → `00-act-outline.md`/`CH0X-slug.md` มีแค่หัวข้อ "EP ที่แนะนำ" แบบสรุปย่อ (bullet) เท่านั้น **ไม่ต้อง**ลงไฟล์ outline เต็มแยกต่อ EP ล่วงหน้า — เหตุผล: campaign ระดับ 1-20 ใช้เวลาเล่นเป็นปี เขียนละเอียดทุก EP ตั้งแต่ต้นมีโอกาสสูงที่เนื้อหาจะเปลี่ยนก่อนได้เล่นจริง ให้ลงรายละเอียดแบบ **just-in-time** ก่อนใกล้ถึง EP นั้นจริง ด้วย `/build-ep` แทน — ผลลัพธ์คือไฟล์ `CH0X-EP0Y-journal.md` เท่านั้น (ไม่มี outline คั่นกลาง)

## ไฟล์ที่ root เสมอ (ทุกขนาด)

```
adventures/<slug>/
  00-overview.md               ภาพรวม, level range, ระบบเลื่อนระดับ, จุดเชื่อม Astral Nexus, สารบัญ Act
  01-hook-and-antagonist.md    Hook, ตัวร้าย, เดิมพัน
  02-npcs.md                   ตาราง NPC สำคัญ
  99-notes.md                  องค์ประกอบพิเศษ + จุดเปิดกว้างให้ DM ปรับหน้างาน
  00-overview-journal.md       (ไม่บังคับ) prose เต็มของภาพรวมทั้งเรื่อง — สร้างทีหลังด้วย /build-ep
  PROGRESS.md                  (ไม่บังคับ) checklist งานที่เหลือ — ใช้เฉพาะเรื่องที่มีงานหลายรอบ/ยาวจนต้องมี tracker
```

## Journal ไม่มีโฟลเดอร์แยก

ไฟล์ journal ฉบับเต็ม (`EP0Y-journal.md` หรือ `CH0X-EP0Y-journal.md`) วางไว้**ชั้นเดียวกับไฟล์ brief/outline ของมัน**เสมอ — ไม่มีโฟลเดอร์ `journal/` แยกต่างหาก เพื่อไม่ให้ต้องเปิดโฟลเดอร์ซ้อนโฟลเดอร์โดยไม่จำเป็น และไฟล์ outline คู่กับ journal ของ EP เดียวกันจะได้อยู่ติดกันเสมอ เห็นสถานะ "ทำ journal แล้วหรือยัง" ได้จาก file listing เดียว

**ข้อยกเว้นเดียว**: `00-overview-journal.md` (prose เต็มของภาพรวมทั้งเรื่อง ขยายจาก `00-overview.md` + `01-hook-and-antagonist.md`) อยู่ที่ **root เสมอ** ชั้นเดียวกับ `00-overview.md` ไม่ว่า adventure จะมีกี่ Act ก็ตาม — เพราะเป็นการขยายไฟล์ระดับ root ไม่ใช่ไฟล์ระดับ Act ไหนโดยเฉพาะ

## ตัวอย่างที่คำนวณจากกฎทั้งสาม

### One-shot / short campaign (≤10 EP, Act เดียว — ตรงกับ `frozen-sick-the-plague-covenant` ปัจจุบัน)

```
adventures/<slug>/
  00-overview.md               ลิงก์ไปแค่ ACT01 เดียว ไม่ลิงก์ EP โดยตรง
  01-hook-and-antagonist.md
  02-npcs.md
  99-notes.md
  ACT01-<slug>/
    00-act-outline.md                     สารบัญ EP ทั้งหมดของ Act เดียวนี้
    EP01-<slug>.md ... EP06-<slug>.md     outline เต็มทุก EP (เขียนตั้งแต่ /build-adventure)
    EP01-journal.md ... EP06-journal.md   journal เต็มทุก EP (สร้างทีหลังด้วย /build-ep)
```

### Long campaign หลาย Act หลาย Chapter (>10 EP รวม — ตรงกับ `aeorian-cataclysm` ปัจจุบัน)

```
adventures/<slug>/
  00-overview.md
  01-hook-and-antagonist.md
  02-npcs.md
  99-notes.md
  PROGRESS.md
  ACT01-<slug>/
    00-act-outline.md           สารบัญ: Chapter ไหนมี EP ไหน (ลิงก์เฉพาะ EP ที่ขยายเป็น journal แล้ว)
    CH01-<slug>.md               chapter brief มีหัวข้อ "EP ที่แนะนำ" แบบย่อของ Chapter นี้
    CH01-EP01-journal.md         journal เต็ม สร้างแบบ just-in-time ด้วย /build-ep
    CH01-EP02-journal.md
    CH02-<slug>.md
    CH02-EP01-journal.md
    CH03-<slug>.md
    CH04-<slug>.md
  ACT02-<slug>/
    ...
```

### Act ที่มีแค่ 1 Chapter (ยุบ Chapter file รวมกับ act-outline — ตรงกับ Act 6 ของ `aeorian-cataclysm`)

```
ACT06-<slug>/
  00-act-outline.md     รวมเนื้อหา chapter brief เข้ามาด้วยเลย เพราะมี Chapter เดียว
  EP01-journal.md        ไม่ต้องมี CH0X- นำหน้า เพราะไม่มี Chapter อื่นให้สับสน
  EP02-journal.md
  EP03-journal.md
```

## เมื่อ scope ของเรื่องโตขึ้นระหว่างทาง

ถ้าเริ่มเป็น short campaign (Act เดียว) แล้วภายหลังอยากขยายยาวขึ้นจนต้องแบ่งเป็นหลาย Act จริง — แยกกลุ่ม Chapter/EP ที่เกี่ยวข้องออกเป็นโฟลเดอร์ `ACT0X-slug/` ใหม่แต่ละอัน (ย้ายทั้งคู่ brief+journal ของแต่ละ EP ไปด้วยกัน) แล้วอัปเดตลิงก์ข้ามไฟล์ใน `00-overview.md` ให้ชี้ไปแต่ละ Act ไม่ต้องคิดจากศูนย์
