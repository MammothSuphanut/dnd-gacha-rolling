# Novice Base Job (Job ID 1000 — ก่อน Job Change เลเวล 3)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — วัตถุดิบอ้างอิง skill จริงของ "Novice" เอง (ตัว base job ก่อนเปลี่ยนอาชีพ ไม่ใช่ 1st Class อย่าง Swordsman/Mage) สำหรับใช้ออกแบบ Class Features เลเวล 1-2 ที่ตาราง [Level Progression](Novice-Concept.md#level-progression) ยังเว้นว่างไว้ ("-") — คู่กับไฟล์ fork อื่นๆ ที่แยกตาม Job Path (Knight.md, Crusader.md, ฯลฯ) แต่ไฟล์นี้ไม่มี fork เพราะ Novice เป็น job เดียว ไม่แตกสาย

> 🚧 **สถานะ: DRAFT** — มี D&D Feature Draft แล้วสำหรับ Strike/First Aid/Play Dead ในรูปแบบ **Track (Rank 1-4)** ตาม [ระบบการเลือก/อัพเกรด Track](Novice-Concept.md#ระบบการเลือกอัพเกรด-track-pick--upgrade-schedule) ของ Novice-Concept.md — เลือกได้ **2 จาก 3 Track นี้** ที่ level 1 กับ 2 (ไม่ใช่ได้ทั้ง 3 อัตโนมัติแบบเดิมอีกต่อไป และไม่มี Respec ให้เปลี่ยนใจทีหลัง) — เหลือ **Tame Pet** ที่ยังไม่ได้ออกแบบ (รอตัดสินใจว่าจะทำเป็น pet mechanic จริงหรือไม่ — ถ้าออกแบบเสร็จจะกลายเป็น Track ที่ 4 ของ pool นี้) และ Skill #1000104 ที่ไม่มีข้อมูลต้นทาง

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

> 🔄 **2026-08-22 (rev. 2 — แปลงเป็น Track ตามระบบกลาง)**: เปลี่ยนจาก "ได้ทั้ง 3 feature พร้อมกันที่ level 1 ค่าตายตัว" → **3 Track (Rank 1-4)** ตาม [ระบบการเลือก/อัพเกรด Track](Novice-Concept.md#ระบบการเลือกอัพเกรด-track-pick--upgrade-schedule) กลาง — เลือกได้ **2 จาก 3** ที่ level 1 กับ 2 (คนละ 1 อัน) ส่วนอีกอันที่ไม่ได้เลือกจะไม่มีทางได้อีกเลยเพราะไม่มี Respec แล้ว — Rank ขึ้นต่อไปได้ผ่านจุดอัพเกรดกลาง (level 5/6/9/10/13/14/17/18) ร่วม pool เดียวกับ Track ของ Job Path ที่เลือกตอน level 3 เป็นต้นไป

| Track | หมวด | Mana | Rank 1 (หยิบครั้งที่ 1) | Rank 2 | Rank 3 | Rank 4 |
|---|---|---|---|---|---|---|
| **Strike** | Action | 1/2/3/4 | โจมตี 1 ครั้ง (แทนที่การโจมตีด้วยอาวุธปกติ — ไม่ใช้ลูกเต๋าดาเมจอาวุธอีกต่อไป) ทำดาเมจ **2d8** | ...**4d8** | ...**6d8** | ...**8d8** |
| **First Aid** | Action | 1/2/3/4 | เลือกเป้าหมาย 1 ตัวในระยะประชิด (ตัวเองหรือพันธมิตร) ฟื้น HP **2d8** | ...**4d8** | ...**6d8** | ...**8d8** |
| **Play Dead** | Passive | 0 ทุก Rank | ตอนจบ Short Rest แต่ละครั้ง เลือกฟื้น mana เพิ่ม **2** หน่วย (นอกเหนือจากค่าคืน mana มาตรฐานของ Short Rest ตามกฎกลาง) — ใช้ได้ไม่เกิน **Proficiency Bonus ครั้งต่อ Long Rest** | ...**4** หน่วย/ครั้ง | ...**8** หน่วย/ครั้ง | ...**16** หน่วย/ครั้ง |

> ⚠️ **หมายเหตุ (2026-08-22)**: ราคา mana ของ Strike/First Aid (1/2/3/4) เป็นราคาที่ผมตั้งเทียบ cost band เดิม (ตาม pattern เดียวกับ Weapon Empower ใน [Knight.md](Knight.md#8-track-หลัก-passiveactionbonus-actionreaction) — จ่ายมากขึ้นตาม Rank) ยังไม่ได้ confirm จากผู้ใช้ ปรับได้ถ้าต้องการราคาอื่น — Play Dead คง 0 mana เพราะเป็น Passive ที่ trigger เฉพาะตอน Short Rest ไม่ได้แย่งจังหวะ action economy กลางการต่อสู้ แต่ "ใช้ได้ Prof Bonus ครั้ง/Long Rest" คือ limited-use resource ใหม่ (ไม่เคยมีในเอกสารนี้มาก่อน) แยกจาก mana pool ปกติ — ตัด HP-heal component เดิมของ Play Dead (ทอย d8×Prof Bonus) ออกด้วย เพราะโจทย์ใหม่พูดถึงแค่ mana refund ที่ scale เป็น 2/4/8/16 ถ้าอยากเก็บ HP-heal ไว้ด้วยแจ้งได้

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Strike: ตัดกลไก "200% ATK" ตรงตัวออก (ตัวเลขจากเกมมือถือสเกลสูงเกินสำหรับ level 1) → แปลงเป็นท่าโจมตีที่ทอย **Xd8 คงที่แทนลูกเต๋าอาวุธ** สเกลตาม Rank แทน — ตัดขาดจากอาวุธที่ถืออยู่โดยเจตนา (ถืออาวุธอะไรก็ได้ดาเมจเท่ากัน แลกกับการเสียโบนัสจากลูกเต๋าอาวุธวิเศษ/Weapon Mastery property)
- First Aid: 300 HP ต้นฉบับสเกลสูงเกิน level 1 เช่นกัน → ใช้ Xd8 สเกลตาม Rank เดียวกับ Strike และขยายเป็นรักษา**พันธมิตรในระยะประชิดได้ด้วย** ไม่ใช่แค่ตัวเองแล้ว (เปลี่ยนบทบาทจาก self-sustain เป็น battlefield support เล็กน้อย — ดูความเห็นเรื่อง overlap กับ Priest ที่เคยพูดถึง)
- Play Dead: ตัดกลไก "เคลียร์ threat" ออก (D&D ไม่มีระบบ threat/aggro ตรงๆ) เก็บแก่น "นอนนิ่งฟื้นตัว" มาผูกกับจังหวะ Short Rest แทนการนับวินาทีจริง แปลงเป็น **mana refund ล้วน สเกล 2/4/8/16 ตาม Rank จำกัดใช้ Prof Bonus ครั้ง/Long Rest**
- Tame Pet: ยังไม่แปลง — เก็บไว้เป็นของค้างรอ balance session แยก (ถ้าออกแบบเสร็จจะเป็น Track ที่ 4 ของ pool นี้)
- **เช็ค Day Math ที่ level 1-2 (Rank 1)**: pool 2-4 + short rest 2 ครั้ง×2 = 6-8 mana/วัน — avg cost ของท่า active ที่เสีย mana จริง (Strike/First Aid Rank 1 = 1 mana) ตรงกรอบเป้าหมาย ~1 ของ level 1-2 band พอดี → 6-8 mana ÷ 1 ≈ 6-8 ครั้ง/วัน อยู่ในกรอบ 6-10 ครั้ง/วัน ไม่ต้องปรับ — **ยังไม่ได้เช็ค Rank 2-4** (เกิดตอนเลเวลสูงกว่า pool จะโตตามธรรมชาติ รอ balance pass รอบหน้าเทียบตาราง cost band ใน [Novice-Concept.md](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules))
