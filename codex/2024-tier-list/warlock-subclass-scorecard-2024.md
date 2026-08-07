# Warlock — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Warlock](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-warlock.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Warlock, 2024)

Floor 0-10 ต่อ axis ของ **Warlock เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Cha, Pact Magic (spell slot น้อย 2→4 ช่อง แต่ **cast ทุกครั้งที่ระดับสูงสุดที่มี** เสมอ, ฟื้นเต็มทุก **Short Rest**), saving throw proficiency Wis + Cha, armor proficiency light เท่านั้น, weapon proficiency simple เท่านั้น, Eldritch Invocations (คลัง 28 ตัวเลือก รู้พร้อมกัน 1 lv1 → 10 lv20 สลับได้ทุก level-up), Magical Cunning (lv2, พิธี 1 นาที คืน slot ครึ่งหนึ่ง 1 ครั้ง/long rest), Contact Patron (lv9), Mystic Arcanum (lv11/13/15/17, cast คาถา lv6-9 ฟรีไม่เสีย slot 1 ครั้ง/long rest ต่อระดับ), Eldritch Master (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Pact Magic slot cast ที่ระดับสูงสุดเสมอ (เช่น lv5 Warlock มี slot lv3 ทั้งคู่ แม้จะร่าย spell lv1 ก็ยกเป็น lv3) บวกฟื้นเต็มทุก **Short Rest** (ไม่ใช่แค่ Long Rest) ทำให้ nova ได้บ่อยกว่า full caster ทั่วไป และ Mystic Arcanum (lv11+) ให้ cast คาถา lv6-9 ฟรี 1 ครั้ง/long rest ต่อระดับ — magnitude ต่อครั้งสูงมากแต่จำนวน slot พร้อมกันมีแค่ 2-4 ช่องเท่านั้น [M:3/4] [R:3/3] [B:1/3] |
| **Control** | 5/10 (B) | Warlock spell list มี control ให้เลือกพอสมควร (Hex, Hold Person, Banishment) ไม่ได้เป็นจุดเด่นเท่า Damage และ slot ที่ฟื้นทุก short rest ก็ช่วยให้ใช้ control spell ได้บ่อยกว่า full caster [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — chassis เน้น pact ส่วนตัวล้วนๆ |
| **Survivability** | 3/10 (C) | HD d8 + armor proficiency แค่ light + saving throw proficiency Wis กับ Cha (สองเซฟที่ป้องกัน control ได้กว้างพอควร) ไม่มี resistance/self-heal ติด baseline เลย (Invocation อย่าง Armor of Shadows/Fiendish Vigor เป็นตัวเลือกที่ต้องเลือกเอา ไม่ใช่ของฟรีทุกตัว) [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Pact Magic ฟื้นเต็มทุก Short Rest บวก Magical Cunning (lv2) คืน slot ได้ครึ่งหนึ่งอีกรอบ 1 ครั้ง/long rest ทำให้จำนวนครั้งที่ cast ได้ต่อวันสูงกว่า full caster ที่พึ่ง Long Rest อย่างเดียวมาก แต่ตัวจำนวน slot พร้อมกันยังน้อย (2-4 ช่อง) และไม่มี free-action spell พิเศษติด chassis [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 7/10 (A) | Eldritch Invocation pool มี 28 ตัวเลือกครอบคลุม utility กว้างมาก (Mask of Many Faces=Disguise Self ตลอดเวลา, Misty Visions=Minor Illusion ตลอดเวลา, Witch Sight=มองทะลุ illusion/shapechange, Gift of the Depths=หายใจใต้น้ำ) รู้พร้อมกันสูงสุด 10 ตัวที่ lv20 ส่วนใหญ่ใช้ได้ at-will ไม่เสีย slot เลย [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 5/10 (B) | Invocation สลับได้ 1 ตัว/level-up และ Mystic Arcanum สลับคาถาได้ 1 ตัว/level-up ให้ปรับ build ระยะยาวได้กว้าง (ครอบคลุม combat/exploration/social) แต่ day-to-day/rest-to-rest ปรับได้จำกัดเหมือน known-caster ทั่วไป [M:2/4] [R:1/3] [B:2/3] |

---

## Subclass Scoring (19)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Warlock](00-scorecard-progress.md)_
