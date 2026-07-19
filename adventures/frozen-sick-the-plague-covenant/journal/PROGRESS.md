# Journal Build Progress — Frozen Sick: The Plague Covenant

สถานะล่าสุด: 2026-07-19

## อัปเดต 2026-07-19 (2) — ปิดช่องว่าง EP3-4 เดิม เรียงเลข EP ต่อเนื่อง 1-6
- EP ที่เคยเป็น EP3-8 (ทั้งไฟล์ design และ journal) ถูกเปลี่ยนหมายเลขเป็น **EP3-6** ทั้งหมด (เนื้อหาไม่เปลี่ยน แค่ renumber + แก้ลิงก์/อ้างอิงข้ามไฟล์) — เดิมเว้น EP3-4 ว่างไว้โดยตั้งใจ ตอนนี้เลิกเว้นแล้ว เรียงเลขต่อเนื่อง EP1-6 ทั้งแคมเปญ
- อัปเดต `00-overview.md`, `00-overview-journal.md`, `99-notes.md`, `01-hook-and-antagonist.md` ให้สอดคล้องกับเลข EP ใหม่แล้ว

## อัปเดต 2026-07-19 (1) — ต่อ EP1-2 (Frozen Sick ต้นฉบับ) เข้ามาก่อน EP เดิม
- เพิ่ม **EP1: A Village in Mourning** และ **EP2: The Salsvault Expedition** — ดัดแปลงจากแคมเปญต้นฉบับ "Frozen Sick" (Wildemount) เกือบทั้งหมด ทั้งไฟล์ design (`EP01-a-village-in-mourning.md`, `EP02-the-salsvault-expedition.md`) และ journal (`EP01-journal.md`, `EP02-journal.md`)
- อัปเดต `00-overview.md`, `00-overview-journal.md`, `02-npcs.md` ให้ครอบคลุม EP1-2 ใหม่แล้ว

## เสร็จแล้ว
- [x] `00-overview-journal.md` — ภาพรวมทั้งเรื่อง (Story Overview + Adventure Summary, ครอบคลุม EP1-6 ต่อเนื่อง)
- [x] `EP01-journal.md` — A Village in Mourning (จาก Frozen Sick ต้นฉบับ)
- [x] `EP02-journal.md` — The Salsvault Expedition (จาก Frozen Sick ต้นฉบับ)
- [x] `EP03-journal.md` — Little Thieves of Palebank
- [x] `EP04-journal.md` — Ashes and Alms
- [x] `EP05-journal.md` — Ashes of the Faithful
- [x] `EP06-journal.md` — The Last Warm Lie

เนื้อหาทั้งหมด (treasure, monster stat block/tactics, ชื่อ NPC ที่ยังไม่ล็อก, เอกสารในเกม) ให้ AI คิดให้ตามที่ตกลงกันไว้แล้ว — ใช้เล่นได้ทันที **ยกเว้นผังสถานที่ 4 จุดด้านล่างที่ผู้ใช้ขอออกแบบเอง**

## ผังสถานที่ 4 จุด — เสร็จครบแล้ว (จับคู่กับแมพที่ผู้ใช้เลือก + ขยายเป็น room-by-room)

แต่ละจุดขยายเป็นห้องย่อยมีรหัสห้อง (เช่น G1-G4, CD1-CD4, IS1-IS3, M-) พร้อม boxed text, combat, treasure, tactics และการเชื่อมต่อระหว่างห้องครบแล้วในไฟล์ journal ที่เกี่ยวข้อง — ตำแหน่งห้องบนแมพยังเป็น**สมมติฐาน**ที่ปรับได้ ดูโน้ตในแต่ละไฟล์

1. ~~**ถ้ำกอบลิน**~~ — `EP03-journal.md` หัวข้อ "The Goblin Den" — แมพถ้ำใหญ่มีทะเลสาบ, ห้อง G1 (ทางเข้า/หมาเฝ้า) → G2 (ทางเดิน) → G3 (ซอกของเก็บ ไม่บังคับ) → G4 (ห้องในสุด/บอส)
2. ~~**ถ้ำลัทธิ Everwarm**~~ — `EP04-journal.md` หัวข้อ "The Cultists' Den" — แมพ Old Cruik Hollow, ห้อง CD1 (patrol) → CD2 (กับดัก) → CD3a (ที่พักสาวก ไม่บังคับ) → CD3 (เตรียมพิธี) → CD4 (ห้องในสุด/มินิบอส)
3. ~~**Cinderrest Sanctum ชั้นในสุด**~~ — `EP05-journal.md` หัวข้อ "The Inner Sanctum" — แมพถ้ำลาวา, ห้อง IS1 (ประตูปริศนา) → IS2 (ผู้พิทักษ์) → IS-Bridge (ข้ามลาวา) → IS3 (ห้อง Varnis/บอส)
4. ~~**คฤหาสน์ Bram Ironvow + Uthodurn Undercroft**~~ — `EP06-journal.md` หัวข้อ "Bram Ironvow's Mansion" — แมพคฤหาสน์ใหญ่ (สระ+วงเวทม่วง), Room Key M-Reception/M-Pool/M-Bedrooms/**M-Study** (จุดสำคัญ: ทางลับ+บัญชีลับ)/M-Dining/M-Kitchen — เล่นแบบ narrated เป็นหลัก (ไม่บังคับ room-by-room) ส่วน Uthodurn Undercroft (Day 3) ไม่ทำผังแยก เล่นเชิงเส้นตามที่เขียนไว้

## หมายเหตุ

ตำแหน่งห้อง/โซนที่จับคู่ไว้ในแต่ละไฟล์เป็น**สมมติฐานจากการอ่านแมพ** ไม่ใช่ของตายตัว — ถ้าอยากย้ายจุดไหนไปโซนอื่นของแมพเดิม หรือเปลี่ยนแมพที่ใช้ บอกได้ตลอด แล้วแก้ในไฟล์ journal ที่เกี่ยวข้องได้ทันที

ไฟล์นี้ทำหน้าที่เสร็จแล้ว — ลบทิ้งได้ หรือเก็บไว้เป็นบันทึกอ้างอิงก็ได้
