# Craftsman — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 11 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Craftsman](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Craftsman, 2024)

Floor 0-10 ต่อ axis ของ **Craftsman เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting มาตรฐาน (มี spell-like free cast บางตัว), saving throw proficiency Con + Int, armor proficiency ครบทุกชนิดรวม heavy+shield, weapon proficiency simple+martial, tool proficiency **artisan's tools ทุกชนิด**, Weapon Mastery, Extra Attack (lv5), Expert Crafting (lv1, Instant Crafting = Utilize action ดึงไอเทม ≤50gp มาใช้ได้ทันที), Masterwork Weapon (lv1, +1→scale attack/damage + mastery property ที่ 2), Masterwork Armor (lv2, +AC ให้ตัวเองและแบ่ง +1 AC ให้คนอื่นที่ใส่ได้), Folded Steel (lv5), Customize Armor (lv6), Fortify Arsenal (lv7, hone/reinforce อาวุธ-เกราะได้ 5 ชิ้น), Eye for Quality (lv9, free Identify+Locate Object), Weapon Enchantment (lv11), Armor Enchantment (lv13), Fabrication (lv15, free Fabricate), Improved Masterwork (lv17), Spellwrought Armor (lv18), Magnum Opus (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Extra Attack (lv5) บวก Masterwork Weapon ที่ให้โบนัส attack/damage roll สเกลตามเลเวล (เทียบเท่าอาวุธเวทย์ถาวรที่สร้างเอง) + mastery property ที่ 2 บวก Weapon Enchantment (lv11) เพิ่ม extra damage dice (Blessed/Elemental/Vampiric) และ Folded Steel (lv5) เปลี่ยนชนิดดาเมจของอาวุธได้ทุก Long Rest เพื่อหลบ resistance ศัตรู — magnitude สูงระดับ Fighter และไม่กิน resource ระหว่างไฟต์เลย [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis เลย [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 6/10 (B) | Masterwork Armor ให้ **คนอื่นที่ใส่เกราะนั้น** ได้ +1 AC ด้วย (ไม่ใช่แค่ตัวเอง) และ Fortify Arsenal (lv7, 10 นาทีตอน short rest) ให้ hone อาวุธได้ถึง 5 ชิ้น (Advantage โจมตีนัดแรก) หรือ reinforce เกราะได้ถึง 5 ชุด (Resistance B/P/S จนโดนดาเมจครั้งแรก) — ทั้งสองแบบใช้ได้กับอุปกรณ์ของ**เพื่อนร่วมทีมทั้งหมด**ไม่ใช่แค่ของตัวเอง [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | HD d10 + armor ครบทุกชนิดรวม heavy+shield + saving throw proficiency Con เป็นฐานที่แข็งอยู่แล้ว เสริมด้วย Masterwork Armor (AC เพิ่มถาวร) และช่วงปลายเกม Armor Enchantment (lv13, Adamantine = Critical Hit ที่โดนกลายเป็น hit ธรรมดาเสมอ หรือ Resistance เลือกชนิดดาเมจ) กับ Spellwrought Armor (lv18, บวก Masterwork Bonus เข้า saving throw ทุกอัน) [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 4/10 (C) | Expert Crafting's Instant Crafting ใช้ Utilize action (ไม่ฟรี) และ enchantment ส่วนใหญ่เป็น passive ติดตัวถาวรไม่ต้อง activate ทุกเทิร์น — ไม่มี free-action หรือ extra-action feature เด่นชัดติด chassis [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 9/10 (S) | Eye for Quality (lv9) cast Identify + Locate Object ได้**ฟรีไม่จำกัดครั้ง**ไม่ต้องใช้ slot/component เลย บวก Fabrication (lv15) cast Fabricate ฟรีแบบเดียวกัน และ Expert Crafting's Instant Crafting ดึงไอเทมมาใช้ได้ทันที — รวมกับ tool proficiency **artisan's tools ทุกชนิด** ตั้งแต่ lv1 ทำให้เป็นชุด utility ที่กว้างและฟรีที่สุดในบรรดา class ที่ทำมาแล้ว [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | Folded Steel/Weapon Enchantment/Armor Enchantment/Customize Armor สลับได้ทุก Long Rest ให้ปรับอุปกรณ์รับมือปัญหาที่แคมเปญเจอในวันนั้นได้ (ชนิดดาเมจ, ต้าน crit, ว่ายน้ำ/ปีนกำแพง ฯลฯ) บวก proficiency artisan's tools ครบทุกชนิดทำให้ non-combat check ไหนก็ทำได้ [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (11)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Craftsman](00-scorecard-progress.md)_
