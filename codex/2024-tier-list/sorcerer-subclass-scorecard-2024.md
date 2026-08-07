# Sorcerer — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 20 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Sorcerer](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-sorcerer.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Sorcerer, 2024)

Floor 0-10 ต่อ axis ของ **Sorcerer เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d6, spellcasting ability Cha, full caster progression, cantrip เริ่มต้นมากที่สุดในบรรดา full caster (4→5→6), saving throw proficiency Con + Cha, ไม่มี armor proficiency, weapon proficiency simple เท่านั้น, prepared spell สลับได้แค่ 1 คาถา/level-up (จำกัดแบบ known-caster), Innate Sorcery (bonus action, 1 นาที: +1 spell save DC + Advantage บน spell attack roll, 2 ครั้ง/long rest), Font of Magic (Sorcery Points แปลงกับ spell slot ได้ 2 ทาง), Metamagic (2 ตัวเลือก lv2 → 4 lv10 → 6 lv17 จาก 10 options), Sorcerous Restoration (lv5), Sorcery Incarnate (lv7), Arcane Apotheosis (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Innate Sorcery ให้ Advantage บน spell attack roll ทุกครั้ง + spell save DC +1 นาน 1 นาที (2 ครั้ง/long rest, re-trigger ได้อีกด้วย 2 Sorcery Point จาก lv7) ยกระดับ accuracy/crit ของทุกคาถาที่ยิงในหน้าต่างนั้น บวก Metamagic option อย่าง Empowered Spell (reroll damage dice) หรือ Twinned Spell (ยิงซ้ำเป้าที่ 2) แปลงดาเมจฐานให้แรงขึ้นได้ตามต้องการ [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Sorcerer spell list มี control พอสมควร (Hold Person, Sleep) แต่แคบกว่า Wizard เพราะ known-list เล็กกว่า — จุดเด่นจริงๆ คือ Metamagic ตัวเลือก Heightened Spell ที่ให้เป้าหมาย **Disadvantage** บน saving throw ต้านคาถาที่เลือก ยกระดับ reliability ของ control spell ที่มีอยู่โดยตรง (แลกด้วย Sorcery Point) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี heal/buff dedicated ติด chassis เลย แต่ Metamagic ตัวเลือก Twinned Spell ให้ยิงคาถา single-target buff/utility ซ้ำใส่เป้าที่ 2 พร้อมกันได้ (เช่น cast Haste ครั้งเดียวได้ผล 2 คน) เป็น support enabler เดียวที่มี แลกด้วย Sorcery Point ทุกครั้ง [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 3/10 (C) | HD d6 (ต่ำสุดเท่า Wizard) ไม่มี armor proficiency ติดตัว saving throw proficiency Con (ป้องกัน concentration break ได้ดีกว่า Wizard) กับ Cha ไม่มี resistance/mitigation tool อื่นเลย [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Font of Magic แปลง spell slot → Sorcery Point แบบไม่เสีย action เลย และแปลงกลับเป็น slot ได้ด้วย Bonus Action ทำให้จัดสรร resource รายวันได้อิสระ บวก Metamagic ตัวเลือก Quickened Spell เปลี่ยนคาถาที่ปกติใช้ action ให้เป็น **Bonus Action** ได้ (แลก Sorcery Point) เป็นเครื่องมือ action-economy ที่ยืดหยุ่นที่สุดในบรรดา full caster [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี skill bonus, expertise, หรือ ritual casting ติด chassis เลย มีแค่ Metamagic บางตัวที่เอียง utility ทางอ้อม (Subtle Spell ตัดคอมโพเนนต์ verbal/somatic ทำให้ cast แบบไม่มีใครสังเกต, Distant/Extended Spell ขยาย range/duration) แต่ทั้งหมดต้องแลก Sorcery Point [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Metamagic ให้ปรับ "วิธี cast" ของแทบทุกคาถาที่รู้ได้ตามสถานการณ์ (เงียบ/ไกล/เร็ว/ซ้ำเป้า/บังคับ save) จาก 10 ตัวเลือก คูณกับ Font of Magic ที่แปลง spell slot ↔ Sorcery Point ได้อิสระทั้งสองทาง ทำให้จัดสรร resource รายวันได้ยืดหยุ่นเฉพาะตัวไม่มี full caster ตัวอื่นทำได้ แม้ known-spell list จะเล็กกว่า Wizard/Cleric/Druid ก็ตาม [M:3/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (20)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Sorcerer](00-scorecard-progress.md)_
