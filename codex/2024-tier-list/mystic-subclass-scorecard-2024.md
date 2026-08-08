# Mystic — Subclass Scorecard (2024) 🕰️

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 6 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Mystic](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 6 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-mystic.json` — source `UATheMysticClass` (Unearthed Arcana, **ไม่เคยตีพิมพ์เป็นทางการทั้ง 2014 และ 2024**) — 🕰️ ใช้กติกา 2014-only orphan ของโปรเจกต์เพราะเป็นตัวเลือกเดียวที่มีในโปรเจกต์

**⚠️ ข้อจำกัดข้อมูล**: ไฟล์ data ของโปรเจกต์มีแค่ class feature หลัก (Psi Point economy, Telepathy, Strength of Mind ฯลฯ) แต่ **ไม่มีเนื้อหารายละเอียดของ Psionic Disciplines/Talents แต่ละตัว** (เนื้อหาที่กำหนด damage/control/utility จริงของ class นี้ส่วนใหญ่อยู่ใน discipline ที่ผู้เล่นเลือกเอง คล้าย spell list ของ caster ทั่วไป) คะแนนด้านล่างจึงประเมินจาก mechanic ที่ยืนยันได้เท่านั้น (ระบบ Psi Point + feature ที่มีชื่อชัดเจน) เป็น floor ที่ระมัดระวัง — ถ้าจะให้แม่นขึ้นต้องมีเนื้อหา discipline ฉบับเต็มมาอ้างอิงเพิ่ม

---

## Class Baseline (Mystic, UA) 🕰️

Floor 0-10 ต่อ axis ของ **Mystic เปล่าๆ ไม่นับ subclass (Mystic Order) feature ใดๆ เลย** — HD d8, ไม่ใช่ spellcaster แบบมาตรฐาน (ใช้ระบบ Psionics/Psi Point แยกต่างหาก), saving throw proficiency Int + Wis, armor proficiency light เท่านั้น, weapon proficiency simple เท่านั้น, Psionic Talents (1→4 รู้) + Psionic Disciplines (1→8 รู้ สลับ 1 ตัว/level-up), Psi Points (4 lv1 → 71 lv20, ฟื้นเต็มทุก Long Rest), Mystical Recovery (lv2, bonus action ฮีลตัวเองเท่า psi point ที่เพิ่งใช้), Telepathy (lv2, ระยะ 120ft ไม่ต้องรู้ภาษาเดียวกัน), Strength of Mind (lv4, สลับ saving throw proficiency จาก Wis ไปเป็น Str/Dex/Con/Cha ได้ทุก short/long rest), Potent Psionics (lv8, +1d8→2d8 psychic ทุกครั้งที่ตีด้วยอาวุธ), Consumptive Power (lv10, จ่าย psi point cost ด้วย HP แทนได้), Psionic Mastery (lv11+, psi point พิเศษก้อนใหญ่ใช้ได้เฉพาะ discipline action/bonus action), Psionic Body (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | Potent Psionics (lv8) ให้ extra 1d8 psychic damage ทุกครั้งที่ตีด้วยอาวุธ (2d8 ที่ lv14) แบบ passive ไม่กิน resource เลย บวก Int mod เข้าดาเมจของ psionic talent — แต่ปลดล็อกช้าถึง lv8 และเนื้อหา damage discipline ที่แท้จริงไม่มีในข้อมูลโปรเจกต์ให้ยืนยันเพิ่ม [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis นอกเหนือจาก discipline ที่ผู้เล่นเลือกเอง (ซึ่งไม่มีเนื้อหาให้ตรวจสอบในไฟล์ data ของโปรเจกต์) — คะแนนนี้เป็น floor แบบระมัดระวัง [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลย — Mystical Recovery ฮีลได้แค่ตัวเอง ("regain hit points" ไม่ระบุ ally) |
| **Survivability** | 7/10 (A) | Mystical Recovery ให้ฮีลตัวเองด้วย Bonus Action เท่ากับ psi point ที่เพิ่งใช้ไป (pool psi point โตถึง 64-71 ที่ lv17+ ทำให้สะสมฮีลได้เยอะมากตลอดวัน) บวก Strength of Mind (lv4) ให้สลับ saving throw proficiency จาก Wis ไปเป็น ability score อื่นได้ทุก short/long rest ปรับรับภัยคุกคามเฉพาะวันได้ และ Psionic Body (lv20) ให้ resistance ดาเมจกายภาพ + กันตาย [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Mystical Recovery ใช้แค่ Bonus Action, Consumptive Power (lv10) ตัดข้อจำกัด psi point ด้วยการจ่าย HP แทนได้ (ไม่ต้องรอฟื้น), Psionic Mastery (lv11+) ให้ psi point พิเศษก้อนใหญ่ (9→11) ใช้ได้เฉพาะ discipline ที่เป็น action/bonus action เป็น nova tool 1-4 ครั้ง/วัน [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 6/10 (B) | Telepathy (lv2) คุยทางจิตได้ไกลถึง 120ft โดยไม่ต้องรู้ภาษาเดียวกันเลย เป็น passive ตลอดเวลาไม่เสีย resource — utility ด้านสื่อสาร/ลาดตระเวนที่แข็งแกร่ง แต่ไม่มี skill bonus หรือ utility breadth อื่นที่ยืนยันได้ [M:2/4] [R:3/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Strength of Mind (lv4) ให้เลือก saving throw proficiency ใหม่ได้ทุกครั้งที่จบ short/long rest ปรับรับภัยคุกคามที่เจอในวันนั้นได้ตรงจุด (ไม่มี class ไหนทำแบบนี้ได้) บวก Psi Point pool ก้อนใหญ่ก้อนเดียวที่ funds ได้ทุก discipline ที่รู้อย่างอิสระ (ยืดหยุ่นกว่า spell slot แยกระดับของ caster ทั่วไป) แม้ breadth จริงจะขึ้นกับ discipline ที่เลือกรู้ซึ่งไม่มีเนื้อหาให้ตรวจสอบเพิ่ม [M:3/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (6)

**Class Baseline อ้างอิง**: Damage 5, Control 3, Support 0, Survivability 7, Action Economy 6, Utility 6, Versatility 7

> **ข้อจำกัดข้อมูลเดียวกับ baseline**: ทุก Order มีฟีเจอร์ "Bonus Disciplines" (lv1, ปลดล็อก 2 discipline เพิ่มจากลิสต์เฉพาะ Order) ที่ไม่มีเนื้อหาให้ตรวจสอบในไฟล์ data ของโปรเจกต์ — คะแนนด้านล่างจึงประเมินจากฟีเจอร์ตั้งชื่อชัดเจนที่ยืนยันได้เท่านั้น (lv1/lv3/lv6/lv14 อื่นๆ) เป็น floor ที่ระมัดระวัง ไม่มี Order ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก

| Subclass | Overall | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Order of the Avatar | S | 5 (B) | 3 (C) | 9 (S) | 8 (A) | 6 (B) | 6 (B) | 8 (A) |
| Order of the Awakened | A | 5 (B) | 6 (B) | 0 (D) | 9 (S) | 6 (B) | 8 (A) | 8 (A) |
| Order of the Immortal | A | 5 (B) | 3 (C) | 0 (D) | 10 (S) | 6 (B) | 6 (B) | 7 (A) |
| Order of the Nomad | A | 5 (B) | 3 (C) | 0 (D) | 9 (S) | 7 (A) | 8 (A) | 8 (A) |
| Order of the Soul Knife | A | 8 (A) | 3 (C) | 0 (D) | 8 (A) | 7 (A) | 6 (B) | 7 (A) |
| Order of the Wu Jen | A | 7 (A) | 5 (B) | 0 (D) | 8 (A) | 7 (A) | 8 (A) | 9 (S) |

---

### Order of the Avatar

**Overall**: S — ออร่าบัฟทีมสามชั้น (initiative/heal/speed) ทำงานตลอดเวลาโดยไม่เสีย resource เลย บวก Survivability A และ Versatility A คู่กัน ไม่มี axis ไหนถูกตัดทอนต่ำกว่า baseline สักตัว ทำให้เป็นตัวเสริมทีมที่แทบไม่มีจุดอ่อนเลย

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ที่ยืนยันได้ (ธีม support/aura ล้วน) = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ที่ยืนยันได้ = เท่า baseline |
| **Support** | 9/10 (S) | Avatar of Battle (lv3, aura +2 initiative ให้ ally ทุกคนในระยะ 30ft) + Avatar of Healing (lv6, aura บวก Int mod เข้าการฮีลของ ally ทุกครั้งที่ฮีลจาก discipline) + Avatar of Speed (lv14, aura Dash ฟรีเป็น bonus action ให้ ally) — ออร่าบัฟทีมสามชั้นที่ทำงานตลอดเวลาโดยไม่เสีย resource เลย [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Armor Training (medium armor+shield จาก light-only ของ baseline) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ออร่าทั้งหมดเป็น passive ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ยืนยันได้ = เท่า baseline |
| **Versatility** | 8/10 (A) | ออร่า 3 แบบ (initiative/heal/speed) ซ้อนกันให้ทีมได้ประโยชน์หลายด้านพร้อมกัน [M:2/4] [R:3/3] [B:3/3] |

### Order of the Awakened

**Overall**: A — Survivability S (Spectral Form resist ทุกดาเมจ) + Utility/Versatility A คู่กัน + Control ขยับขึ้นมาเป็น B จาก baseline C แต่ Support เป็น 0 เต็ม (ไม่มี feature เสริมทีมเลย) ทำให้พึ่งเพื่อนร่วมทีมด้าน support แทน ไม่ถึงขั้น S เหมือน Avatar

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ที่ยืนยันได้ = เท่า baseline |
| **Control** | 6/10 (B) | Psionic Surge (lv6) บังคับ Disadvantage บน save ของเป้าต้าน discipline/talent ที่ใช้ แลกด้วยการเสีย psychic focus [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 9/10 (S) | Spectral Form (lv14, action, resistance **ทุกชนิดดาเมจ** นาน 10 นาที + ทะลุสิ่งกีดขวางได้) — mitigation ระดับสูงมาก แม้ใช้ได้แค่ 1/long rest [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 8/10 (A) | Psionic Investigation (lv3, อ่านความทรงจำ/ติดตามวัตถุนาน 24 ชม.) เป็น investigative utility ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสม investigation/control/defense สุดขั้วในธีมเดียว [M:2/4] [R:2/3] [B:3/3] |

### Order of the Immortal

**Overall**: A — Survivability 10/10 คือคะแนนสูงสุดทั้งไฟล์นี้ (แทงค์ตัวจริง แทบตายไม่ได้) แต่ Support เป็น 0 เต็มและ Control/Utility ค้างที่ baseline ทำให้เป็น one-trick tank ที่เก่งด้าน survive สุดขั้วแต่ไม่ขยาย role อื่นเลย

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ที่ยืนยันได้ (ธีม tank ล้วน) = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ที่ยืนยันได้ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 10/10 (S) | Immortal Durability (+1 max HP/level ถาวร + Unarmored Defense 10+Dex+Con) + Psionic Resilience (lv3, temp HP เท่า Int mod ทุกต้นเทิร์น) + Surge of Health (lv6, reaction ลดดาเมจครึ่งหนึ่ง) + Immortal Will (lv14, ฟื้นคืนชีพตัวเองที่ 0 HP ผ่าน psi point) — ชั้นการรอดชีวิตที่หนาแน่นที่สุดในกลุ่ม [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ยืนยันได้ = เท่า baseline |
| **Versatility** | 7/10 (A) | โฟกัส tank เฉพาะทางสุดขั้ว ไม่ขยาย role อื่น = เท่า baseline |

### Order of the Nomad

**Overall**: A — Survivability S ผ่านการหนี/เทเลพอร์ตแทนการแท้งค์ + Action Economy/Utility/Versatility A ทั้งสามแกน กระจาย breadth ได้กว้างกว่า Immortal มาก แม้ Support จะเป็น 0 เหมือนกันก็ตาม

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ที่ยืนยันได้ = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ที่ยืนยันได้ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 9/10 (S) | Memory of a Thousand Steps (lv3, reaction เทเลพอร์ตหนีทำให้การโจมตีพลาดอัตโนมัติ) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Effortless Journey (lv14, แปลงระยะเดิน 30ft เป็นเทเลพอร์ตได้ฟรีไม่เสีย action เพิ่ม) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Breadth of Knowledge (lv1, 2 proficiency ใดก็ได้ สลับได้ทุก Long Rest) เป็น utility ที่ยืดหยุ่นที่สุดในกลุ่ม [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผู้เชี่ยวชาญเทเลพอร์ต/mobility ที่มี proficiency สลับได้ทุกวันเสริมความยืดหยุ่นอีกชั้น [M:2/4] [R:3/3] [B:3/3] |

### Order of the Soul Knife

**Overall**: A — Damage A (8/10) สูงสุดในกลุ่มร่วมกับ Wu Jen บวก Survivability/Action Economy A คู่กัน เป็น striker ที่ตีแรง+อึดพร้อมกัน แม้ Support จะเป็น 0 เหมือนตัวอื่นในคลาสนี้

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Soul Knife (อาวุธ 1d8 psychic finesse ติดตัวถาวรผ่าน bonus action) + Hone the Blade (lv3, จ่าย psi ได้ atk/dmg bonus สูงสุด +4 นาน 10 นาที) + Phantom Knife (lv14, ตีเป้าเสมือนมี AC 10) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ที่ยืนยันได้ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 8/10 (A) | Soul Knife's parry option (bonus action, +2 AC) + Martial Training (medium armor) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Consumptive Knife (lv6, ฟื้น 2 psi point ทุกครั้งที่ฆ่าศัตรูด้วย soul knife) เป็น resource-sustain [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ยืนยันได้ (เน้นคอมแบตล้วน) = เท่า baseline |
| **Versatility** | 7/10 (A) | โฟกัส weapon-striker เฉพาะทางสุดขั้ว ไม่ขยาย role อื่น = เท่า baseline |

### Order of the Wu Jen

**Overall**: A — Versatility 9/10 สูงสุดในกลุ่ม (hybrid psionics-wizard เต็มระบบ) บวก Damage/Survivability/Action Economy/Utility ล้วน A ทั้งหมด กว้างที่สุดในบรรดา Order ทั้ง 6 แต่ Support ยังเป็น 0 เหมือนเดิม เลยไม่ถึง S แบบ Avatar ที่ครบทุก role จริงๆ

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Elemental Attunement (lv3, จ่าย 1 psi ทะลุ resistance ของเป้า) + Arcane Dabbler (lv6, เข้าถึง spell ดาเมจของ Wizard lv1-3 ผ่าน spell slot ที่สร้างจาก psi point) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | Arcane Dabbler เลือกเป็น control spell ของ Wizard ได้เช่นกัน (เช่น Hold Person) [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 8/10 (A) | Elemental Mastery (lv14, reaction, ได้ immunity เต็มต่อดาเมจธาตุที่มี resistance อยู่แล้ว) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Arcane Dabbler สร้าง spell slot ได้ผ่าน bonus action จาก psi point ที่ยืดหยุ่นกว่า slot ปกติ [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Arcane Dabbler เข้าถึง spell utility ของ Wizard (เช่น Comprehend Languages, Fly) + Hermit's Study (2 skill proficiency จาก list กว้าง) [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | Hybrid psionics-wizard เต็มรูปแบบ เข้าถึง spell list อีกระบบทั้งหมดผ่าน psi point เดียวกัน — breadth กว้างที่สุดในกลุ่ม [M:3/4] [R:2/3] [B:3/3] |
