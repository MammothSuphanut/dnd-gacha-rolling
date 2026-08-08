# Monster Hunter — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 4 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Monster Hunter](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 4 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/grim-hollow/Ghostfire Gaming; Grim Hollow - Player's Guide - 2024.json` — source `GrimHollowPG24`

---

## Class Baseline (Monster Hunter, 2024)

Floor 0-10 ต่อ axis ของ **Monster Hunter เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting, saving throw proficiency Dex + Int, armor proficiency light/medium/shield (ไม่มี heavy), weapon proficiency simple+martial, Weapon Mastery, Fighting Style, **Monster Grimoire (lv1, เลือก 2→4 ชนิดสัตว์ประหลาดที่ถนัดล่า ขยายได้แต่สลับไม่ได้)**, Studied Response (lv2, reaction ตีก่อนศัตรูโจมตี คืน reaction ถ้าพลาด), Expert Strike (lv5, บวก Int mod เข้า attack+damage roll ของอาวุธ**ทุกชนิด**), Improved Monster Grimoire (lv6/13), Knowledgeable Defense (lv9), Lair Sense (lv14), **Extra Attack (lv11 — ช้ากว่า martial class ส่วนใหญ่ที่ได้ lv5)**, Slayer's Aid (lv17), Grave Strike (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Expert Strike (lv5) บวก Int mod เข้า attack **และ** damage roll ของอาวุธทุกชนิดแบบ universal (ไม่ผูก Grimoire type) บวก Improved Monster Grimoire (lv6, crit 19-20 เฉพาะเป้าที่อยู่ใน Grimoire) และ Grave Strike (lv20, crit ใส่เป้า Grimoire บังคับ CON save DC=ดาเมจที่ตี (สูงสุด 30) ไม่งั้นร่วง 0 HP ทันที) — magnitude สูงมากแต่ Extra Attack มาช้าถึง lv11 ทำให้ early-mid game อ่อนกว่า martial class อื่น [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | Studied Response (lv2) เป็น reaction ตีก่อนศัตรูโจมตี ไม่ใช่ hard-CC จริง (ไม่มีเอฟเฟกต์ผูกเงื่อนไข) ไม่มี control feature ที่ยืนยันได้ติด chassis [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 3/10 (C) | Slayer's Aid (lv17) ให้ ally ใช้ Reaction ของตัวเองร่วมโจมตีเมื่อเรา trigger Studied Response ได้ เป็น support ทางอ้อมที่ปลดล็อกช้ามาก [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 4/10 (C) | HD d10 + armor medium/shield เป็นฐานกลางๆ Knowledgeable Defense (lv9, ใช้ Int save แทน save ปกติเมื่อโดน Grimoire type บังคับ) และ Lair Sense (lv14, Advantage+Resistance ต้าน lair/legendary action ของ Grimoire type) ล้วนผูกกับ "ต้องเจอศัตรูที่อยู่ใน Grimoire" เท่านั้น ไม่ใช่การป้องกันทั่วไป [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Studied Response (lv2) เป็น Reaction ตีศัตรูก่อนที่มันจะโจมตี **และคืน Reaction กลับให้ทันทีถ้าพลาด** ทำให้เป็นการโจมตีฟรีที่แทบไม่มีต้นทุนจริง [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 3/10 (C) | เลือก skill proficiency 3 ตัวจาก list กว้าง (ฐานมาตรฐาน) ไม่มี expertise, ritual, หรือ utility feature พิเศษติด chassis เลย [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 4/10 (C) | Monster Grimoire ให้เลือกชนิดศัตรูที่ถนัดล่าได้ตรงกับภัยคุกคามของแคมเปญ (2→4 ชนิด) แต่เป็นการ**เพิ่มชนิดใหม่เท่านั้น สลับของเดิมไม่ได้** ทำให้ปรับตัวได้ช้ากว่า class อื่นที่ swap ได้ทุก long rest [M:2/4] [R:1/3] [B:1/3] |

---

## Subclass Scoring (4)

**Class Baseline อ้างอิง**: Damage 7, Control 3, Support 3, Survivability 4, Action Economy 6, Utility 3, Versatility 4

ทั้ง 4 Guild มาจาก `Grim Hollow Player's Guide 2024` เดียวกัน (ไม่มี 🕰️) ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ หมายเหตุข้อมูล: **Devourer Guild** (รายการ "Mutations") และ **Trapper Guild** (รายการ "Trapper Gadgets"/"Armor Modifications") มีตัวเลือกย่อยที่ไม่ปรากฏรายละเอียดเต็มในไฟล์ข้อมูล (มีแค่หัวข้อ) จึงให้คะแนนแบบระมัดระวังในแกนที่ไม่ยืนยันได้

| Subclass | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| Carver Guild | 9 (S) | 7 (A) | 4 (C) | 7 (A) | 9 (S) | 3 (C) | 6 (B) |
| Devourer Guild | 8 (A) | 3 (C) | 6 (B) | 6 (B) | 7 (A) | 4 (C) | 7 (A) |
| Occultist Guild | 9 (S) | 6 (B) | 5 (B) | 7 (A) | 8 (A) | 7 (A) | 8 (A) |
| Trapper Guild | 8 (A) | 5 (B) | 3 (C) | 7 (A) | 8 (A) | 6 (B) | 7 (A) |

---

### Carver Guild

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Close Quarters (reaction extra 1d6→3d6 ดาเมจทุกครั้งที่ตีเมลีโดน) บวก Controlled Footwork (lv18, ใช้ reaction ได้ 2 ครั้ง/รอบ — ทวีคูณจำนวนครั้งที่ trigger Close Quarters/Studied Response ได้) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Close Quarters (Disadvantage การโจมตีถัดไปของเป้า) + Terrorize the Terrors (lv10, reaction-attack → Frightened) + Deadly Redirect (lv15, Disadvantage ทุกการโจมตีของเป้า) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 4/10 (C) | True Grit ใช้ปลด Frightened ให้ ally ได้ผ่าน reaction-attack trigger — support ทางอ้อมเล็กน้อย [M:1/4] [R:1/3] [B:2/3] |
| **Survivability** | 7/10 (A) | Equipped for Battle (heavy armor proficiency จาก medium-only ของ baseline) + True Grit (immune Frightened จาก Grimoire type + Advantage ต้าน Frightened ทั่วไป) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Controlled Footwork (lv18) ให้ reaction 2 ครั้ง/รอบ — economy multiplier ที่ทรงพลังที่สุดในกลุ่มเพราะ baseline ทั้งหมดขับด้วย reaction [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | ธีม fear-immune tank-bruiser ที่ผสมดาเมจ/control ผ่านการซ้อน reaction [M:2/4] [R:2/3] [B:2/3] |

### Devourer Guild

> **หมายเหตุข้อมูล**: รายการ "Mutations" เต็มรูปแบบไม่ปรากฏในไฟล์ข้อมูล (มีแค่หัวข้อ) จึงให้คะแนนแบบระมัดระวังในแกนที่ไม่ยืนยันได้

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Synchronized Response (lv7, extra 1d6 ดาเมจทุกครั้งที่ reaction-attack นาน 1 นาทีหลังกินเนื้อ) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่สามารถยืนยันตัวเลือก control-based ใน Mutations ได้ = เท่า baseline |
| **Support** | 6/10 (B) | Alchemical Decoctions (lv15) แปลง Mutation เป็นยาที่คนอื่นกินได้ — แบ่งปันบัฟให้ทีมได้จริง [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 6/10 (B) | Gnawing Hunger (lv10, temp HP เท่าครึ่ง/เต็มดาเมจที่สร้างเมื่อตีเมลีโดน, Int mod ครั้ง/rest) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Acquired Taste (lv18, Advantage บนการโจมตีที่เป็น reaction หลังกินเนื้อ) เสริม reliability ให้ Studied Response ที่เป็นแกนหลักของ baseline [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Alchemist's Supplies + Cook's Utensils proficiency เป็น utility เล็กน้อย [M:1/4] [R:1/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ระบบ Mutation ให้เลือกได้หลายแบบพร้อมกันตามชนิดสัตว์ที่กิน ปรับตัวได้ตามสถานการณ์แม้ไม่ทราบรายละเอียดเต็ม [M:2/4] [R:2/3] [B:3/3] |

### Occultist Guild

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | เข้าถึง spell list ของ Wizard (รวม blast spell) + Arcane Response (lv18, แคส spell ผ่าน Studied Response โดยไม่เสีย action เพิ่ม) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | เข้าถึง control spell ของ Wizard + Mage Hunter (lv7, Disadvantage บน Concentration save ของเป้า Grimoire type ที่โดนดาเมจ) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 5/10 (B) | Magical Aegis (lv15, AoE 20ft) แจก Advantage บน save ต้าน spell ของ Grimoire type ให้ ally ด้วย [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Arcane Interference (Advantage save ต้าน spell ของ Grimoire type) + free Counterspell (lv15) — anti-magic defense ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Arcane Response ให้แคส spell แนบไปกับ Studied Response reaction ที่มีอยู่แล้วโดยไม่เสีย action เพิ่ม [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | เข้าถึง cantrip/spell ของ Wizard เต็มชุด + Occult Knowledge (lv10, ritual casting + 2 ritual spell จาก Cleric/Druid/Wizard) — utility ที่ baseline แทบไม่มีเลย [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | Hybrid นักล่าอสูร-นักเวทย์ต้านเวทมนตร์เต็มรูปแบบ [M:2/4] [R:3/3] [B:3/3] |

### Trapper Guild

> **หมายเหตุข้อมูล**: รายการ "Trapper Gadgets" และ "Armor Modifications" เต็มรูปแบบไม่ปรากฏในไฟล์ข้อมูล (มีแค่หัวข้อ) จึงให้คะแนนแบบระมัดระวังในแกนที่ไม่ยืนยันได้

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Trapper Gadgets น่าจะมีตัวเลือกดาเมจ (สอดคล้องธีมกับดัก) แต่ไม่ยืนยันได้เต็ม = ให้คะแนนแบบระมัดระวัง [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | Trapper Gadgets น่าจะมีตัวเลือก control (เช่น net/caltrops) แต่ไม่ยืนยันได้เต็ม [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่สามารถยืนยัน ally-support ที่ชัดเจนได้ = เท่า baseline |
| **Survivability** | 7/10 (A) | Agile Response (lv10, reaction กด Disadvantage ผู้โจมตีเมลี + ขยับฟรีครึ่ง speed) + Monster-Hide Armor (lv15, เกราะที่คราฟต์เองพร้อม modification 2 ช่อง) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Agile Response รวม Studied Response เข้ากับ reaction เดียวกัน — ได้ผล 2 อย่างจาก reaction เดียว [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Tinker's Tools + Trapper Gadgets (คราฟต์กับดัก/อุปกรณ์ได้) เป็น utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญดักซุ่มโจมตี + ปรับแต่งเกราะได้เอง ให้ breadth แม้ไม่ทราบ gadget เต็มลิสต์ [M:2/4] [R:2/3] [B:3/3] |
