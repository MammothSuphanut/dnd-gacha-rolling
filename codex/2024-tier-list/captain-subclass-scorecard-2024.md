# Captain — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 29 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Captain](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

**⚠️ ข้อจำกัดข้อมูล**: ไม่มีเนื้อหา Maneuver แต่ละตัว (Bolster/Born Leader/Morale Boost/Rally/Staggering Strike) แบบละเอียด — ชื่อบ่งชี้ theme (ฮีล/บัฟ/debuff) แต่ตัวเลขจริงยังตรวจสอบไม่ได้ คะแนน Control/Damage บางส่วนด้านล่างจึงระมัดระวังไว้ก่อน

---

## Class Baseline (Captain, 2024)

Floor 0-10 ต่อ axis ของ **Captain เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting, saving throw proficiency Con + Cha, armor proficiency ครบทุกชนิดรวม heavy+shield, weapon proficiency simple+martial, Weapon Mastery, Fighting Style, Battle Tactics (lv1, Battle Dice 2d6→เพิ่มขึ้นตามเลเวล ฟื้นเต็มตอนทอย initiative + ทุก short/long rest ขับ 5 maneuver), **Cohort (lv2, ผู้ติดตามเต็มตัวที่ต่อสู้เคียงข้าง ใช้ Charisma ของเราโจมตี ลงมือทุกรอบ อัปเกรดตามเลเวล)**, Blitz (lv5), Valiant Surge (lv7), Coordinated Strike (lv11), Lead by Example (lv15), Teamwork Maneuvers (lv18), Legendary Commander (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี Extra Attack ส่วนตัวติด baseline (ต่างจาก martial class อื่นส่วนใหญ่) — Coordinated Strike (lv11) ให้ extra 2d8 ดาเมจเมื่อ Cohort ทำดาเมจเป้าเดียวกันมาก่อนในรอบล่าสุด เป็น combo damage ที่ต้องพึ่ง Cohort เสมอ ไม่ใช่ magnitude เดี่ยวของตัวเอง [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 3/10 (C) | Maneuver "Staggering Strike" ชื่อบ่งชี้ soft-CC แต่เนื้อหาจริงไม่มีในข้อมูลที่ตรวจสอบได้ ไม่มี hard-CC ที่ยืนยันได้ติด chassis [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 9/10 (S) | Cohort คือ**ผู้ติดตามเต็มตัวที่ลงมือทุกรอบ**เทียบเท่าได้ปาร์ตี้เมมเบอร์เพิ่มฟรี 1 คน ใช้ Charisma/Proficiency ของ Captain อัปเกรดขึ้นตามเลเวล บวก Blitz (lv5) ให้สั่ง Cohort หรือ ally มอบ Reaction เดิน/โจมตีฟรีได้ 1 ครั้ง/เทิร์น และ Legendary Commander (lv20) ให้ตัวเองหรือ ally ลง Legendary Action พิเศษได้ระหว่างเทิร์นคนอื่น (3 ครั้ง/short-long rest) — เป็น class เดียวที่ chassis สร้าง action-economy เพิ่มให้ทั้งทีมได้โดยตรง [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | HD d8 + armor proficiency ครบทุกชนิดรวม heavy+shield ตั้งแต่ lv1 เป็นฐานที่แข็งพอสมควร แต่ไม่มี resistance/self-heal เฉพาะติด chassis [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Blitz (lv5) มอบ Reaction เดิน/โจมตีฟรีให้ Cohort หรือ ally ได้ 1 ครั้ง/เทิร์นแบบไม่เสีย resource เพิ่ม, Teamwork Maneuvers (lv18) ให้ maneuver ที่เล็ง ally ยิงได้ 2 เป้าโดยจ่าย Battle Die แค่ก้อนเดียว, และ Legendary Commander (lv20) มอบ turn พิเศษให้ตัวเองหรือ ally ได้ระหว่างรอบคนอื่น — เป็นเครื่องกำเนิด action ให้ทั้งทีม ไม่ใช่แค่ตัวเอง [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี skill bonus, ritual, หรือ utility feature นอกคอมแบตติด chassis เลย ทุกอย่างเน้น combat-leadership ล้วนๆ [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Battle Dice ขับ 5 maneuver คนละสายให้เลือกใช้ตามสถานการณ์ ฟื้นได้บ่อยมาก (ทุกครั้งที่ทอย initiative + ทุก short/long rest) บวก Cohort ที่เลือก stat block ได้เองตอน initiate (ปรับ role ของ "สมาชิกทีมเพิ่ม" ให้เข้ากับ build ได้) [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (29)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Captain](00-scorecard-progress.md)_
