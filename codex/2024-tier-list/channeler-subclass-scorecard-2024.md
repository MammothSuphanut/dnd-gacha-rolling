# Channeler — Subclass Scorecard (2024) 🕰️

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 4 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Channeler](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2014.json` — source `ValdaSpireExtras` — **🕰️ Channeler ไม่มี reprint ในไฟล์ Valda's Spire 2024** (มีแค่คลาส Alchemist/Captain/Craftsman/Investigator/Martyr/Necromancer/Vagabond/Warden/Warmage/Witch/Dancer เท่านั้นที่ได้ reprint 2024) จึงใช้กลไก/ตัวเลขจากเวอร์ชัน 2014 ทั้งหมดตามกติกา 2014-only orphan ของโปรเจกต์

---

## Class Baseline (Channeler, 2014) 🕰️

Floor 0-10 ต่อ axis ของ **Channeler เปล่าๆ ไม่นับ subclass (Planar Order) feature ใดๆ เลย** — HD d10, spellcasting ability Int แบบ **Arcana Point** (pool แต้มแปลงเป็น spell slot 1-5 เอง ไม่ใช่ slot ตรงๆ แบบ caster ทั่วไป), cantrip 3→4, saving throw proficiency Con + Int, armor proficiency light/medium/heavy (ไม่มี shield), weapon proficiency simple+martial, Fighting Style (lv2), Arcane Reverberation (lv1), Spell Channeling (lv2, Bonus Action แทนที่ spell attack ด้วย melee weapon attack ที่ได้ผลคาถาด้วย), Planar Focus (lv3, Bonus Action สลับ 4 stance ธาตุ), Combat Channeling (lv5, Spell Channeling ตีได้ 2 เป้า), Extra Attack (lv5), Null Arcane (lv6, reaction ยกเลิกคาถาศัตรู), Combat Channeling Improvement (lv11), Greater Focus (lv14, +3 stance), Planeshifter (lv18), Nexus Arcane (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Extra Attack (lv5) บวก Spell Channeling (lv2, Bonus Action) ให้แทนที่ spell attack ด้วยการตีอาวุธที่ได้ผลคาถาด้วยในตีเดียว และ Combat Channeling (lv5) อัปเกรดให้ตีได้ 2 เป้าพร้อมกัน (รวมเป้าเดียวกันได้ที่ lv11 สำหรับ burst) บวก Planar Focus แบบ Fire (reroll damage die ที่ทอยได้ 1-2) — hybrid martial-caster ที่ดาเมจสูงจากทั้งสองทาง [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature เฉพาะติด chassis นอกเหนือจาก spell ที่เลือกเตรียมเอง (ไม่มีรายละเอียด Channeler spell list มาตรวจสอบเพิ่ม) [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว |
| **Survivability** | 6/10 (B) | Armor proficiency ครบถึง heavy (ไม่มี shield) + HD d10 เป็นฐานที่แข็ง เสริมด้วย Planar Focus แบบ Earth (+2 AC ตอนไม่ถือ shield) หรือ Air (+10 speed, ลุกจาก prone ฟรี, ศัตรู Disadvantage ตอน opportunity attack ใส่เรา) สลับกันได้เป็น Bonus Action ทุกเทิร์น [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Spell Channeling ให้ผล spell + weapon attack มาพร้อมกันด้วย Bonus Action เดียว บวก Planar Focus สลับ stance ได้เป็น Bonus Action ทุกเทิร์น — ไม่มี extra-action nova แต่ประหยัด action ได้สม่ำเสมอ [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Planeshifter (lv18) ให้ cast Plane Shift ฟรี 1 ครั้ง/long rest และ Planar Focus แบบ Paradise (lv14, บินได้) เป็น utility ทรงพลังแต่ปลดล็อกช้ามาก Arcane Reverberation (lv1) เป็น detect-magic เฉพาะทางแคบ [M:2/4] [R:1/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Planar Focus ให้สลับ stance ได้ทุกเทิร์นด้วย Bonus Action จากเมนูที่โตขึ้นเรื่อยๆ (4 ตัว lv3 → 7 ตัวที่ lv14) ครอบคลุมทั้ง mobility/AC/ดาเมจ/ฟื้น resource/บิน/free-spell ปรับ role รายเทิร์นได้กว้างมากจากฟีเจอร์เดียว [M:2/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (4)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Channeler](00-scorecard-progress.md)_
