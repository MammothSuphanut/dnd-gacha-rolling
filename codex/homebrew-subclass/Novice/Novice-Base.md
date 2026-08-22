# Novice Base Job (Job ID 1000 — ก่อน Job Change เลเวล 3)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — วัตถุดิบอ้างอิง skill จริงของ "Novice" เอง (ตัว base job ก่อนเปลี่ยนอาชีพ ไม่ใช่ 1st Class อย่าง Swordsman/Mage) สำหรับใช้ออกแบบ Class Features เลเวล 1-2 ที่ตาราง [Level Progression](Novice-Concept.md#level-progression) ยังเว้นว่างไว้ ("-") — คู่กับไฟล์ fork อื่นๆ ที่แยกตาม Job Path (Knight.md, Crusader.md, ฯลฯ) แต่ไฟล์นี้ไม่มี fork เพราะ Novice เป็น job เดียว ไม่แตกสาย

> 🚧 **สถานะ: DRAFT (วัตถุดิบอ้างอิงเท่านั้น)** — ยังไม่มี D&D Feature Draft สำหรับ tier นี้ (ต่างจาก Knight.md ที่มีทั้ง ROX Skill Reference + D&D Feature Draft) เพราะเลเวล 1-2 ยังไม่ได้ตกลงจังหวะ/งบประมาณฟีเจอร์กับผู้ใช้ — ไฟล์นี้เก็บเฉพาะ skill จริงจากเกมไว้ก่อน รอ session ออกแบบแยกทีหลัง

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

## แนวคิดเบื้องต้นสำหรับแปลงเป็น D&D (ยังไม่ตัดสินใจ — รอ balance session)

รายการนี้เป็นแค่ observation ดิบจาก skill list ด้านบน **ไม่ใช่ฟีเจอร์ที่ล็อกแล้ว**:

- **Strike**: ท่าโจมตีหลักไม่ผูกอาวุธ (200% dmg) — ตรงธีม "ท่าตีหลักฟรี 0 mana" ตามกฎกลางเรื่อง [Mana Usage Rules](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules) เหมือนกับ Bash ของ Swordsman
- **First Aid**: heal ตัวเอง — ต้องคิดว่าจะ scale เท่าไหร่ที่เลเวล 1-2 (300 HP ในเกมมือถือคือค่าที่ปรับสเกลระดับสูงมาก ไม่ใช่ตัวเลขที่ใช้ตรงๆ ได้กับ D&D level 1)
- **Play Dead**: กลไก "เคลียร์ threat + ฟื้น HP/SP ต่อเนื่อง" — แนวทาง D&D อาจเทียบเคียงกับการ Feign Death/Hide แล้วฟื้น HP ต่อเนื่องหลายเทิร์น (ต้องระวังไม่ให้แรงเกิน short rest heal ปกติ)
- **Tame Pet**: กลไก sidekick/pet ตั้งแต่เลเวล 1 — ถ้าจะใช้จริงต้องตัดสินใจว่าจะให้ pet เป็น mechanical companion (แบบ Ranger's Companion หรือ Beast of the Land/Sky/Sea) หรือแค่ flavor/RP tool เพราะเป็น sidequest ที่ไม่ใช่ทุก Job Path จะใช้ pet ต่อ

**ยังไม่ทำ**: ยังไม่มีการกำหนด Save DC/Action economy/mana cost ให้ 4 ท่านี้ — รอ session ถัดไปที่ตกลงกับผู้ใช้ว่าจะให้ Novice level 1-2 (ก่อน Job Change) มี "ตัวตน" เชิงกลไกแค่ไหน (เทียบเท่า 1st Class จริงๆ ในเกม ROX หรือจะยุบรวมเข้ากับ chassis เฉยๆ)
