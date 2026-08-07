# Fighter — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 21 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Fighter](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-fighter.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Fighter, 2024)

Floor 0-10 ต่อ axis ของ **Fighter เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting, saving throw proficiency Str + Con, armor proficiency light/medium/heavy/shield ครบทุกชนิดตั้งแต่ lv1, weapon proficiency simple+martial, Fighting Style (feat เลือกได้ สลับได้ทุกเลเวลที่ขึ้น), Second Wind (2→4 ใช้/วัน ฮีล 1d10+level), Weapon Mastery (3 ชนิด lv1 → 6 ชนิด lv16), Action Surge (extra action เต็มๆ 1 ครั้ง/short rest → 2 ครั้งที่ lv17), Tactical Mind, Extra Attack (lv5, 2 ครั้ง) → Two Extra Attacks (lv11, 3 ครั้ง) → Three Extra Attacks (lv20, 4 ครั้ง), Indomitable (lv9, reroll failed save 1→3 ครั้ง/long rest), Tactical Master (lv9), Studied Attacks (lv13)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | จำนวนครั้งโจมตี/เทิร์นสูงสุดในเกม (2 ครั้งที่ lv5 → 3 ที่ lv11 → 4 ที่ lv20) เป็น passive ไม่กิน resource เลยแม้แต่น้อย บวก Weapon Mastery ที่ปลดล็อกอาวุธได้มากที่สุดในเกม (3→6 ชนิด) ให้ property เสริมดาเมจ (เช่น Vex, Cleave) ติดทุกการตี และ Action Surge ให้โจมตีซ้ำเป็น action เต็มๆ อีกรอบ 1 ครั้ง/short rest (2 ครั้งที่ lv17) เป็น nova ที่แรงที่สุดในเกม [M:4/4] [R:3/3] [B:1/3] |
| **Control** | 3/10 (C) | Tactical Master (lv9) ให้เปลี่ยน mastery property ของอาวุธที่ตีเป็น Push (ผลักเป้า)/Sap (disadvantage โจมตีครั้งถัดไป)/Slow (ลด speed) ได้ต่อการตี 1 ครั้ง เป็น soft-CC เดี่ยวๆ ที่ผูกกับ weapon mastery ของ lv9+ เท่านั้น ไม่มี hard-CC เลย [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — Second Wind ฮีลได้แค่ตัวเอง |
| **Survivability** | 8/10 (A) | HD d10 (สูงเป็นอันดับ 2 รองจาก Barbarian) + armor proficiency ครบทุกชนิดรวม heavy+shield ตั้งแต่ lv1 (AC สูงสุดในบรรดา class ที่ไม่พึ่ง spell) บวก Second Wind (bonus action ฮีล 1d10+level, 2→4 ครั้ง/วัน ฟื้น 1/short rest) และ Indomitable (lv9, reroll failed saving throw 1→3 ครั้ง/long rest ด้วยโบนัสเท่า Fighter level) เป็น safety net กันทั้ง HP loss และ failed save [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Action Surge ให้ **action เต็มๆ อีกรอบ** (ไม่ใช่แค่ bonus action) 1 ครั้ง/short rest (2 ครั้งที่ lv17) เป็นฟีเจอร์ action-economy ที่แรงที่สุดในเกม เทียบเท่าเพิ่ม turn ให้ตัวเองกลางไฟต์ บวก Second Wind ที่เป็น bonus action ฟรี และ Tactical Shift (lv5) ให้เดินครึ่ง speed แถมมากับ bonus action ของ Second Wind โดยไม่เสีย action เพิ่ม [M:4/4] [R:2/3] [B:2/3] |
| **Utility** | 0/10 (D) | ไม่มี utility feature ติด class baseline เลยสักอย่าง — ไม่มี expertise, ไม่มี free skill proficiency พิเศษ, ไม่มี ritual casting, Fighting Style feat (lv1) ก็เป็นตัวเลือกสาย combat ล้วนๆ ไม่มีผลนอกคอมแบต |
| **Versatility** | 4/10 (C) | Fighting Style สลับได้ทุกครั้งที่ Fighter level ขึ้น (ถี่กว่า class อื่นที่ส่วนใหญ่ล็อกจนกว่าจะ long rest) บวก Weapon Mastery สลับชนิดอาวุธได้ทุก Long Rest และ Tactical Master ให้เปลี่ยน mastery property ต่อการตี — ยืดหยุ่นระดับ "จูนสไตล์นักดาบ" แต่ยังคงเป็น weapon-based martial archetype เดียวตายตัว ไม่มีทางปรับไป role เวทย์/support จากตัว chassis เลย [M:1/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (21)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Fighter](00-scorecard-progress.md)_
