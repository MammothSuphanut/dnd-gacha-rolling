# Alchemist — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 10 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Alchemist](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24` (Mage Hand Press, 2024 edition ของ Valda's Spire of Secrets)

**⚠️ ข้อจำกัดข้อมูล**: มีเนื้อหา class feature หลักครบ (Bombs, Reagents, Potion Brewing ฯลฯ) แต่ **ไม่มีรายการ Bomb Formula/Discovery แต่ละตัวแบบละเอียด** (อยู่ใน optionalfeature ที่ยังไม่ได้ดึงมาตรวจสอบ) คะแนน Control ด้านล่างจึงเป็น floor แบบระมัดระวังจนกว่าจะมีเนื้อหานั้นมาอ้างอิงเพิ่ม

---

## Class Baseline (Alchemist, 2024)

Floor 0-10 ต่อ axis ของ **Alchemist เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting (ใช้ระบบ Bomb + Reagent แทน), saving throw proficiency Dex + Int, armor proficiency light เท่านั้น, weapon proficiency simple + Bomb, tool proficiency Alchemist's Supplies, Bombs (lv1, สร้างได้ไม่จำกัดจำนวนจริงตามกฎ "as many as needed for the adventuring day"), Potion Brewing (lv1), Reagents (2→6 ต่อวัน), Prime Bomb (lv2), Bomb Formulas (lv2, รู้ 3 ตัว สลับ 1/long rest), Reagent Synthesis (lv2), Discovery (lv5, รู้ 1→4 ตัว), Improved Bombs (lv5), Evasion (lv7), Blast Coating (lv11), Potion Mixologist (lv15), Experimentalist (lv18), Nuclear Bomb + Philosopher's Stone (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Bomb เป็นการโจมตีที่สร้างได้ไม่จำกัดจริงตามกฎ Alchemist's Supplies (ไม่ต้องนับสต็อก) ให้ Intelligent Explosions บวก Int mod เข้าดาเมจ Explode property, Improved Bombs (lv5) ยกดาเมจฐานเป็น 2d10 และ Prime Bomb ให้เพิ่ม 1d10 ต่อ Reagent ที่จ่าย (สเกลตามจำนวน Reagent สูงสุด/เลเวล) — magnitude สูงและ **ใช้ได้ทุกเทิร์นไม่จำกัดจำนวนครั้ง/วัน** ต่างจาก slot-based caster [M:3/4] [R:3/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis นอกเหนือจาก Bomb Formula/Discovery ที่ผู้เล่นเลือกเอง (เนื้อหารายละเอียดไม่มีในไฟล์ data ที่ตรวจสอบได้) — คะแนนนี้เป็น floor แบบระมัดระวัง [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 4/10 (C) | Potion Brewing เข้าถึง healing potion ระดับดี (Potion of Healing → Greater Healing lv4 → Superior Healing lv8) ที่แจกให้ ally ถือไว้ใช้เองได้ แต่สต็อก potion ที่ active พร้อมกันได้จำกัดแค่เท่า Int mod (ต่ำสุด 1) และต้องใช้เวลา brew 10 นาทีล่วงหน้า ไม่ใช่ support แบบทันทีทันควัน [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 4/10 (C) | HD d8 + saving throw proficiency Dex (หลบ AoE ได้บ่อย) เป็นฐานกลางๆ เสริมด้วย Evasion (lv7, save AoE ผ่านไม่โดนดาเมจเลย) และ Blast Coating (lv11, ไม่โดนดาเมจจาก Bomb ตัวเองเลย) แต่ไม่มี resistance/self-heal อื่นติด chassis [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 4/10 (C) | Bomb เป็นการโจมตีมาตรฐาน (ไม่มี free extra attack ติด baseline) Reagent Synthesis (lv2) คืน Reagent เพิ่มตอน short rest แบบไม่กิน action และ Potion Mixologist (lv15) ให้ดื่ม 2 potion พร้อมกันด้วย Bonus Action เดียว แต่ปลดล็อกช้ามาก [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 5/10 (B) | Potion Brewing เข้าถึง potion หลากหลายจาก DMG list (Climbing, Water Breathing, Invisibility, Flying, Giant Strength ฯลฯ) ครอบคลุม exploration niche ได้กว้าง แต่สต็อก potion active พร้อมกันจำกัดแค่เท่า Int mod และต้องมี Reagent เพียงพอ + เวลา brew ล่วงหน้าเสมอ [M:2/4] [R:1/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Bomb Formula (สลับ 1/long rest, สลับได้ทั้งหมดที่ lv18 Experimentalist) ปรับชนิดดาเมจ/เอฟเฟกต์ของ Bomb ได้ตามสถานการณ์ บวก Discovery (1→4 ตัว) และเมนู Potion ที่กว้างมากให้เลือก brew ตามที่ทีมต้องการในแต่ละวัน — resource หลายก้อน (Reagent/Formula/Discovery/Potion) ปรับ role ได้หลากหลายในกรอบ "นักเล่นแร่แปรธาตุ" เดียว [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (10)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Alchemist](00-scorecard-progress.md)_
