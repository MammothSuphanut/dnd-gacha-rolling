# องค์ประกอบพิเศษ & บันทึก

## วัตถุดิบต้นฉบับ

แคมเปญนี้แปล/ดัดแปลงจากหนังสือทางการ + fan supplement โดยตรง — เก็บไฟล์ต้นฉบับ (Foundry VTT JournalEntry export, ภาษาอังกฤษ) ไว้อ้างอิงที่ [`_source/`](./_source/):

- `waterdeep-dragon-heist.json` — **Waterdeep: Dragon Heist** (WotC, official) ใช้เป็นฐานของ Act 1
- `waterdeep-dungeon-of-the-mad-mage.json` — **Waterdeep: Dungeon of the Mad Mage** (WotC, official) 23 ชั้น + Skullport ใช้เป็นฐานของ Act 2 เป็นต้นไป
- `dungeon-of-the-mad-mage-companion.json` — **Dungeon of the Mad Mage Companion** (fan supplement โดย TheGiddyLimit) ชั้นเสริมเนื้อหาให้ทุกชั้นของ Act 2+

## วิธีผสาน Companion เข้ากับ WDMM หลัก (ตัดสินใจแล้ว)

ทุกห้องใน WDMM หลักได้ full room breakdown เต็มรูปแบบตาม journal-template.md เสมอ (ไม่ตัดห้องไหนทิ้งเพื่อความสั้น) — Companion ทำหน้าที่เป็นชั้นเสริม ไม่ใช่ตัวกรอง:

| ส่วนของ Companion | ไปอยู่ตรงไหน |
|---|---|
| Quick Notes | ย้ายเข้า `00-act-outline.md` ของ Act นั้นเป็นส่วน "DM Prep" (DM อ่านเอง ไม่ใช่สิ่งผู้เล่นได้ยิน) |
| Before the Descent | กลายเป็น hook/boxed text เปิดของ EP แรกในชั้นนั้น |
| Random Encounters | นิยามครั้งเดียวต้น EP/ชั้น เป็นหัวข้อ hazard/encounter ที่ใช้ซ้ำระหว่างเดินทางในชั้น |
| Areas of Note (NPC motivation, roleplay direction, trivia) | สอดแทรกเข้าเนื้อหาห้องที่เกี่ยวข้องโดยตรงในเนื้อ EP |
| Epilogue | ปิดท้าย EP สุดท้ายของแต่ละชั้น เป็นสะพานไปชั้นถัดไป |

## Halaster's Game (ตัดสินใจแล้ว — ใช้เต็มรูปแบบตามที่ Companion ออกแบบ)

ใช้ motif นี้ต่อเนื่องตลอดทั้ง Act 2 (Undermountain) ทุกชั้น ไม่ใช่แค่บางชั้น — Halaster มองปาร์ตี้เป็นผู้เข้าแข่งขันในเกมโชว์ข้ามมิติของตัวเอง แทรก trivia/บทพูดผ่านจิตตามจุดที่ Companion ระบุไว้ในแต่ละชั้น และปิดท้ายทุกชั้นด้วย "The Host's Send-Off" แทน epilogue ธรรมดา — เข้ากับธีม "กฎเกณฑ์แห่งการทำลายล้างเฝ้ามองความวิบัติเหมือนมหรสพ" ที่ผูกไว้กับ Astral Nexus lore พอดี (ดู [00-overview.md](./00-overview.md))

## รูปภาพประกอบ

ใช้ pattern เดียวกับ adventure อื่นในโปรเจค (`![alt](url "caption")` ก่อน boxed text ของฉากนั้น):

- WDH/WDMM (official): รูปชี้ตรงไป URL สาธารณะอยู่แล้วในไฟล์ต้นฉบับ (`https://cdn.5e.tools/...`) — ก็อปมาใช้ตรงๆ ได้เลย
- WDMMC (Companion): path ในไฟล์ต้นฉบับเป็น relative (`assets/srd5e/img/TheGiddyLimit/homebrew/master/_img/WDMMC/...`) ต้องแปลงเป็น `https://raw.githubusercontent.com/TheGiddyLimit/homebrew/master/_img/WDMMC/...` ก่อนใช้ (ตัด prefix `assets/srd5e/img/` ออก เติม `https://raw.githubusercontent.com/` แทน) — เทสต์แล้วโหลดได้ปกติ

## จุดที่ยังเปิดกว้าง/รอตัดสินใจ

- [ ] **เลือกวายร้าย Dragon Heist** (Xanathar / Cassalanters / Jarlaxle / Manshoon) — ต้องเลือกก่อนแปล Ch.4 เป็นต้นไป ดู [01-hook-and-antagonist.md](./01-hook-and-antagonist.md)
- [ ] **แบ่ง Act ของ Undermountain** — เสนอไว้คร่าวๆ ใน [PROGRESS.md](./PROGRESS.md) (จัดกลุ่มชั้นตาม character-level milestone ของหนังสือ) ยังปรับได้ตอนใกล้ถึงจริง
- [ ] เตรียมแมพ/ภาพประกอบเพิ่มเติมสำหรับฉากสำคัญ (ยังอิงแค่รูปจากต้นฉบับ ยังไม่มีแมพ custom)
