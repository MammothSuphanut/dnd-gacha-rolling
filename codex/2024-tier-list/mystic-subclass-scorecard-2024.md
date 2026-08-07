# Mystic — Subclass Scorecard (2024) 🕰️

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 6 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Mystic](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

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

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Mystic](00-scorecard-progress.md)_
