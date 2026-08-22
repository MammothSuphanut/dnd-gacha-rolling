# Novice Base Job (Job ID 1000 — ก่อน Job Change เลเวล 3)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — วัตถุดิบอ้างอิง skill จริงของ "Novice" เอง (ตัว base job ก่อนเปลี่ยนอาชีพ ไม่ใช่ 1st Class อย่าง Swordsman/Mage) สำหรับใช้ออกแบบ Class Features เลเวล 1-2 ที่ตาราง [Level Progression](Novice-Concept.md#level-progression) ยังเว้นว่างไว้ ("-") — คู่กับไฟล์ fork อื่นๆ ที่แยกตาม Job Path (Knight.md, Crusader.md, ฯลฯ) แต่ไฟล์นี้ไม่มี fork เพราะ Novice เป็น job เดียว ไม่แตกสาย

> 🚧 **สถานะ: DRAFT** — มี D&D Feature Draft แล้วสำหรับ Strike/First Aid/Play Dead (มอบที่ **level 1**) ตามที่ผู้ใช้กำหนดตรง — เหลือ **Tame Pet** ที่ยังไม่ได้ออกแบบ (รอตัดสินใจว่าจะทำเป็น pet mechanic จริงหรือไม่) และ Skill #1000104 ที่ไม่มีข้อมูลต้นทาง

## ROX Skill Reference — Novice (Base Job)

> ดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1000) — Novice มีสกิลทั้งหมด 5 ช่อง (Talent: ไม่มี)

| Skill | ID | Type | Max Lv | Range | Description |
|---|---|---|---|---|---|
| **Strike** | 1000101 | Active | 1 | 2 | Deal 200% physical damage to an enemy. |
| **First Aid** | 1000102 | Active | 1 | 0 | Heal yourself for 300 HP. |
| **Play Dead** | 1000103 | Active | 1 | 0 | Lie on the floor and feign death, clearing all Threat from monsters. Restores self Max HP by 10% and self Max SP by 10% every 5 seconds while active. |
| *(ไม่มีชื่อ)* | 1000104 | Active | 0 | 0 | ไม่มีข้อมูลในฐานข้อมูล ROXPEDIA — Max Lv 0 บ่งชี้ว่าอาจเป็น placeholder/สกิลที่ไม่ได้ใช้งานจริงในเกม |
| **Tame Pet** | 1000105 | Active | 1 | 9 | Attempt to tame a wild monster into a pet. Lower monster HP% increases taming success rate and resulting pet stat quality. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1000)

**หมายเหตุข้อมูล**: Skill #1000104 ไม่มีชื่อ/คำอธิบาย/Max Lv ในฐานข้อมูลต้นทาง (Max Lv = 0) — น่าจะเป็นช่อง placeholder ที่เกมไม่ได้เปิดใช้จริง ไม่ใช่ความผิดพลาดในการดึงข้อมูล ปล่อยว่างไว้จนกว่าจะเจอแหล่งอื่นยืนยัน

## D&D Feature Draft — Novice (Base Job)

> 🚧 **ฉบับร่างแรก (rev. 1)** ของการแปลง skill ROX Novice (Base Job) เป็น D&D feature — มอบทั้งชุดที่ **level 1** (ก่อนถึง "Job Change: Second Class" ที่ level 3) ใช้ [กฎการใช้ Mana](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules) กลาง — ที่ level 1-2: pool 2-4, Prof Bonus +2, avg cost เป้าหมายตามตาราง reference คือ **~1**

| Level | Feature | Action | Mana | ผลลัพธ์ |
|---|---|---|---|---|
| 1 | **Strike** | Action | 1 | โจมตีด้วยอาวุธ ถ้าโดน จ่าย 1 mana เพื่อทอยลูกเต๋าดาเมจอาวุธเพิ่มอีก 1 ลูก (รวมกับดาเมจโจมตีปกติ) |
| 1 | **First Aid** | Action | 1 | ฟื้น HP ตัวเอง 1d8 + Proficiency Bonus |
| 1 | **Play Dead** | ระหว่าง Short Rest | 0 | ใช้เวลา Short Rest ทั้งหมดนอนแกล้งตาย — จบ Short Rest นั้น ฟื้น HP เพิ่มเท่ากับทอย d8 จำนวน Proficiency Bonus ลูก (เช่น level 1-4 = ทอย 2d8) **และ** ฟื้น mana เพิ่มอีกเท่ากับ Proficiency Bonus (นอกเหนือจากค่าคืน mana มาตรฐานของ Short Rest ตามกฎกลาง — รวมแล้วรอบนั้นได้คืน mana 2× Prof Bonus) |
| 1 | Tame Pet | — | — | 🚧 ยังไม่ได้ออกแบบ — รอตัดสินใจว่าจะทำเป็น pet/companion mechanic จริง (เช่น เทียบเคียง Ranger's Companion) หรือเป็นแค่ RP tool |

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Strike: ตัดกลไก "200% ATK" ตรงตัวออก (ตัวเลขจากเกมมือถือสเกลสูงเกินสำหรับ level 1) → แปลงเป็น **เพิ่มลูกเต๋าดาเมจอาวุธ 1 ลูก** แทน ให้สเกลไปกับอาวุธที่ถืออยู่จริงตามธรรมชาติของ 5e ราคา 1 mana ตรงกับ cost band "rider เสริมท่าฟรีด้านบน" (การโจมตีปกติเองยังคงฟรี 0 mana เสมอ)
- First Aid: 300 HP ต้นฉบับสเกลสูงเกิน level 1 เช่นกัน → ใช้สูตรมาตรฐาน **1d8 + Proficiency Bonus** ราคา 1 mana ตาม cost band เดียวกับ Strike
- Play Dead: ตัดกลไก "เคลียร์ threat" ออก (D&D ไม่มีระบบ threat/aggro ตรงๆ) เก็บแก่น "นอนนิ่งฟื้นตัว" มาผูกกับจังหวะ Short Rest แทนการนับวินาทีจริง แปลงเป็น **heal (Prof Bonus)d8 + คืน mana เพิ่ม Prof Bonus** — ราคา 0 mana เพราะไม่ใช่ท่าที่ใช้กลางการต่อสู้ (ทริกเกอร์เฉพาะตอน Short Rest) แต่ trade-off คือเสียโอกาสทำกิจกรรมอื่นระหว่างพัก ไม่ใช่ mana cost
- Tame Pet: ยังไม่แปลง — เก็บไว้เป็นของค้างรอ balance session แยก
- **เช็ค Day Math ที่ level 1-2**: pool 2-4 + short rest 2 ครั้ง×2 = 6-8 mana/วัน (Play Dead ให้เพิ่มอีก 2×2=4 ถ้าเลือกใช้ทั้ง 2 ครั้ง แต่ไม่นับเป็น baseline เพราะเป็นทางเลือก) — avg cost ของท่า active ที่เสีย mana จริง (Strike, First Aid) = (1+1)/2 = **1** ตรงกรอบเป้าหมาย ~1 ของ level 1-2 band พอดี → 6-8 mana ÷ 1 ≈ 6-8 ครั้ง/วัน อยู่ในกรอบ 6-10 ครั้ง/วัน ไม่ต้องปรับ
