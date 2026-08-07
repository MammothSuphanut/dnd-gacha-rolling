# Druid — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 17 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Druid](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-druid.json` — source `XPHB` (Player's Handbook 2024) — เช่นเดียวกับ Cleric เวอร์ชัน 2024 ตัดหัวข้อ "Ritual Casting" ออกจาก Spellcasting feature เดิม (มีแค่ใน PHB 2014)

---

## Class Baseline (Druid, 2024)

Floor 0-10 ต่อ axis ของ **Druid เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Wis, full caster progression, saving throw proficiency Int + Wis, armor baseline light/shield (หรือ medium ถ้าเลือก Warden), weapon baseline simple (หรือ martial ถ้าเลือก Warden), Druidic (มี Speak with Animals ติดตัวฟรีตลอดเวลา ไม่กิน prepared slot), **Primal Order (lv1, เลือก 1 อย่าง)**: Magician (cantrip เพิ่ม + bonus เท่า Wis mod ให้ Int(Arcana/Nature) check) หรือ Warden (martial weapon + medium armor prof), Wild Companion (lv2), Wild Shape (2 ใช้/วัน lv2, temp HP = Druid level ต่อครั้งที่แปลง), Wild Resurgence (lv5, แปลง spell slot ↔ Wild Shape use ได้อิสระ), Elemental Fury (lv7, เลือก Potent Spellcasting หรือ Primal Strike), Beast Spells (lv18), Archdruid (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Full spell slot lv1-9 ให้ magnitude ระดับ full caster มาตรฐาน (Moonbeam, Ice Storm, Sunbeam ในสาย damage/control ผสม) บวก Elemental Fury (lv7) ถ้าเลือก Primal Strike จะได้ extra 1d8 Cold/Fire/Lightning/Thunder ทุกครั้งที่ตีด้วยอาวุธ **หรือ**การโจมตีของ Beast form ตอน Wild Shape — เป็น class เดียวที่ดาเมจ baseline มีถึง 3 ช่องทางส่ง (spell/อาวุธ/สัตว์) พร้อมกัน [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Druid spell list แข็งไม่แพ้ Wizard ในสาย battlefield control แนวธรรมชาติ (Entangle lv1, Faerie Fire lv1, Spike Growth lv2, Plant Growth lv3, Wall of Thorns lv6, Insect Plague lv5) ครอบคลุมทั้ง restrain/บังคับพื้นที่/ลด mobility ศัตรู [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี free heal-on-demand ติด chassis แบบ Cleric's Divine Spark มีแค่ full spell list ที่เข้าถึง Cure Wounds/Goodberry ได้ (ต้องแลก slot กับสายอื่นเหมือนปกติ) buff เช่น Barkskin ก็ single-target [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Wild Shape ให้ temp HP เท่า Druid level ทุกครั้งที่แปลงร่าง (2 ครั้ง/วันตั้งแต่ lv2 ฟื้น 1/short rest) แล้วยังสลับไปใช้ HP pool ของ Beast form แทนของตัวเอง เท่ากับมี "บัฟเฟอร์กันดาเมจ" สองชั้นซ้อนกัน บวก Wild Resurgence (lv5) แปลง spell slot ↔ Wild Shape use ได้อิสระแบบไม่เสีย action ทำให้ยืด uptime ของบัฟเฟอร์นี้ได้ทั้งวัน แต่ต้อง commit เข้า Beast form ถึงจะได้ (เสีย spellcasting ระหว่างนั้นจนถึง lv18) [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (B) | Wild Shape เข้า/ออกด้วย Bonus Action, Wild Companion ให้เลือกจ่าย Wild Shape use หรือ spell slot เพื่อ summon familiar (ยืดหยุ่นเลือก resource ได้), Wild Resurgence (lv5) แปลง spell slot → Wild Shape use หรือกลับกันได้ **ไม่เสีย action เลย** ทำให้ resource pool 2 ก้อน (slot กับ shape) หนุนกันได้ทั้งวันแทนที่จะแยกขาดจากกัน [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Speak with Animals ติดตัวฟรีตลอดเวลาไม่กิน prepared slot (Druidic feature) บวก Magician (ถ้าเลือกใน Primal Order) ให้ cantrip เพิ่ม + bonus Wis mod กับ Arcana/Nature check และ Wild Shape เปิดให้แปลงเป็นสัตว์ที่ใช้ scout/สำรวจได้ (ว่าย/ปีน/lv8+บิน) โดยไม่ต้องพึ่ง spell แยก [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | Prepared spell list reset เต็มทุก Long Rest เหมือน Wizard บวกจุดเลือก build 2 จุดที่ไม่ผูก subclass เลย (Primal Order: Magician vs Warden, Elemental Fury: Potent Spellcasting vs Primal Strike) และ Wild Shape ให้ "เปลี่ยนร่างเป็นสิ่งมีชีวิตอื่นทั้งตัว" ซึ่งเป็นเครื่องมือปรับ role แบบที่ไม่มี class อื่นทำได้ (จากนักเวทย์เป็นสัตว์ tank/scout ได้ในเทิร์นเดียว) แม้ Beast form จะห้ามร่ายคาถาระหว่างนั้นจนกว่าจะถึง lv18 ก็ตาม [M:3/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (17)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Druid](00-scorecard-progress.md)_
