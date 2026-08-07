# Wizard — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 26 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Wizard](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย (ตาราง tier จะตามมาทีหลัง)

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-wizard.json` — source `XPHB` (Player's Handbook 2024) เท่านั้น ตามขอบเขต edition ของโปรเจกต์

---

## Class Baseline (Wizard, 2024)

Floor 0-10 ต่อ axis ของ **Wizard เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — เขียนครั้งเดียว ใช้ร่วมกับทุก subclass ของ Wizard ตลอดทั้งไฟล์นี้

**Chassis ที่นับ (ทุก subclass ได้เหมือนกันหมด)**: HD d6, spellcasting ability Int, full caster progression (spell slot lv1-9 เต็มตาราง Wizard Features, cantrip 3→4(lv4)→5(lv10)), saving throw proficiency Int + Wis, weapon proficiency simple weapons เท่านั้น, ไม่มี armor proficiency, spellbook (6 spell lv1 เริ่มต้น +2 ทุกเลเวลที่ขึ้น), Arcane Recovery (lv1), Ritual Adept (lv1), Scholar (lv2, Expertise 1 skill), Memorize Spell (lv5), Spell Mastery (lv18), Signature Spells (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Full 9-ระดับ spell slot progression (ตาราง Wizard Features) และ cantrip ที่เลือกได้เอง (3 ตัว lv1 → 4 ตัว lv4 → 5 ตัว lv10) ดึงจาก Wizard spell list ที่มี damage option ให้เลือกเพียบโดยไม่ต้องพึ่ง subclass เลย — Fire Bolt scale ถึง 4d10 ที่ lv17, Fireball 8d6 ที่ lv5, Magic Missile ยิง 3 ลูกโดนชัวร์ไม่ต้อง roll เลย แต่ spell slot lv1+ ที่จะเอาไปยิงดาเมจแชร์ pool เดียวกับ control/support/utility ทั้งหมด จึงต้องแลกกับการเตรียมสายอื่นน้อยลงเสมอ ไม่ได้ฟรี [M:3/4] [R:2/3] [B:1/3] |
| **Control** | 7/10 (A) | Wizard spell list มี hard-CC ระดับสูงให้เลือกตั้งแต่ level ต้น — Sleep (lv1, ไม่ต้อง save เลยถ้า HP ไม่พอ), Hold Person (lv2, paralyze เป้าที่ fail Wis save), Web (lv2, restrain เป็นพื้นที่), ไปจนถึง Wall of Force (lv8, กันสนิท 100% ไม่มีช่องโหว่) หรือ Banishment (lv4, ลบเป้าออกจากการต่อสู้ชั่วคราว) — กว้าง/แรงสุดในเกมสำหรับ control โดยเฉพาะ แต่ส่วนใหญ่ยังต้องพึ่ง enemy save fail และแย่ง slot กับ role อื่นเช่นเดียวกับ Damage [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | Wizard ไม่มี healing spell ติด class list โดยตรง (ไม่มี Cure Wounds/Healing Word เหมือน Cleric/Druid) ของเสริมทีมที่มีคือ buff เช่น Haste (ให้ extra action + AC/Dex save เป้าเดียว, lv3) หรือ Mage Armor (ปกติใช้กับตัวเองมากกว่า ally) ซึ่งเป็น single-target concentration ทั้งคู่และแย่ง slot กับสาย damage/control โดยตรง แทบไม่ถูกใช้ถ้าไม่ specialize ไปทางนี้ [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 3/10 (C) | HD d6 (ต่ำสุดในเกมร่วมกับ Sorcerer) = HP เฉลี่ยน้อยที่สุด ไม่มี armor proficiency ติดตัว (ต้องพึ่ง spell เช่น Mage Armor ถึงจะได้ AC 13+Dex mod แทนชุดเกราะจริง) saving throw proficiency มีแค่ Int (กัน rare save เช่น Psychic/Confusion) กับ Wis (กัน charm/fear/บาง control ได้) ไม่มี damage resistance หรือ mobility/escape tool ติด class baseline เลยสักอย่าง [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Cantrip ยิงได้ทุกเทิร์นไม่จำกัดจำนวนครั้ง/วัน ไม่เสีย resource ใดๆ นอกจาก action เป็นฐาน sustain ที่ดี, Arcane Recovery คืน spell slot รวมกันได้สูงสุด ≈ ครึ่งหนึ่งของ Wizard level (ปัดขึ้น, ห้ามระดับ 6+) 1 ครั้ง/short rest ช่วยยืดจำนวนครั้งที่ใช้ slot ต่อวันได้อีกชั้น และ Ritual Adept ให้ cast spell ที่มีแท็ก ritual จากสมุดได้ฟรีไม่แตะ slot เลย (แลกด้วย cast time +10 นาที จึงใช้ในคอมแบตไม่ได้) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Wizard spell list กว้างที่สุดในเกม ครอบคลุม utility/exploration ระดับสูง (Detect Magic, Comprehend Languages, Knock, Scrying, Teleport) และ Ritual Adept ให้ cast ritual-tag spell ในสมุด (Alarm, Identify, Find Familiar ฯลฯ) ได้ไม่จำกัดจำนวนครั้ง/วันโดยไม่แตะ slot เลยแม้แต่ครั้งเดียว บวก Scholar (lv2) ให้ Expertise 1 skill จาก Arcana/History/Investigation/Medicine/Nature/Religion เพิ่ม non-combat proficiency อีกชั้นแยกจากสาย spell [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Prepared spell list (จำนวน = ระดับ Wizard + Int mod) reset ใหม่ได้เต็มทุก Long Rest ไม่ lock-in เหมือน known-spell caster บวก Memorize Spell (lv5) ให้สลับ 1 spell ที่เตรียมไว้ได้ทุก Short Rest เลือกจาก spellbook ที่โตขึ้นเรื่อยๆ (เริ่ม 6 spell lv1, +2 ทุกเลเวลที่ขึ้น) ทำให้ปรับ role รายวัน/ราย encounter ได้ในระดับสูงสุดของเกม แม้ยังมีต้นทุนทอง/เวลาคัดลอก spell ใหม่เข้าสมุด (50gp + 2ชม./ระดับ ต่อ spell ที่เจอนอกเหนือจากที่ได้ฟรีตอน level up) เป็นตัวจำกัดความกว้างของ list ที่เข้าถึงได้จริง ณ จุดใดจุดหนึ่ง [M:3/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (26)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Wizard](00-scorecard-progress.md)_
