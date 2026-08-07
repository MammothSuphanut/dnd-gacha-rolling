# Warmage — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 11 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Warmage](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24` — **หมายเหตุกลไก**: Warmage ไม่มี spell slot ระดับ 1+ มาตรฐานเลย (ไม่มี `casterProgression` ในไฟล์ data) เป็น class ที่เล่นรอบ **cantrip ล้วนๆ** ที่ถูกเสริมพลังหนักผ่าน class feature แทน — คนละดีไซน์กับ full/half caster ทั่วไป

---

## Class Baseline (Warmage, 2024)

Floor 0-10 ต่อ axis ของ **Warmage เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Int, cantrip known **มากที่สุดในบรรดา class ที่ทำมาแล้ว** (4 lv1 → 10 lv20), saving throw proficiency Con + Int, armor proficiency light เท่านั้น, weapon proficiency simple เท่านั้น, Arcane Initiation (lv1, เลือก background trait), Warmage Edge (lv1, บวก Int mod + extra dice เข้าดาเมจ cantrip 1 ครั้ง/เทิร์น), Reliable Cantrip (lv2, cantrip ดาเมจขั้นต่ำเสมอแม้พลาด/ศัตรู save ผ่าน), Warmage Tricks (lv2, รู้ 2+ ตัว สลับได้ทุก level-up), Arcane Surge (lv5, ดับเบิล/ทริปเปิลดาเมจ dice ของ cantrip 2-3 ครั้ง/วัน), Tactical Insight (lv6), Arcane Surge Improvement (lv11), Strategic Deflection (lv14), Master Warmage (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Cantrip known มากที่สุดในเกม (4→10) บวก Warmage Edge (บวก Int mod + extra dice ทุกเทิร์น) + Reliable Cantrip (การันตีดาเมจขั้นต่ำแม้พลาด/ศัตรู save ผ่าน — cantrip แทบไม่มีทาง "ยิงเปล่า" เลย) + Arcane Surge (lv5) ที่ **ดับเบิลดาเมจ dice ของ cantrip เหมือน crit ได้ 2-3 ครั้ง/วัน** (ทริปเปิลถ้าคาถานั้น crit อยู่แล้ว) — เป็นชุด cantrip-optimization ที่แน่นที่สุดในบรรดา class ที่ทำมา แลกด้วยการที่ **ไม่มี spell slot ระดับ 1+ เลย** จึงพึ่งพา cantrip อย่างเดียวตลอดเกม [M:4/4] [R:3/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis เลย cantrip แนะนำ (Force Dart, Quickstep, Shocking Grasp) เอียงไปทาง damage/mobility ไม่ใช่ control [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว |
| **Survivability** | 4/10 (C) | HD d8 + armor proficiency แค่ light เป็นฐานอ่อน แต่ Tactical Insight (lv6) บวก Int mod เข้า saving throw ต้านคาถา/magical effect ทุกอัน (ยกเว้น Int save เอง) และ Strategic Deflection (lv14, reaction) ให้สะท้อนคาถาที่บังคับ save กลับไปหาเป้าอื่นได้ถ้า save ผ่าน แต่ทั้งสองอย่างจำกัดแค่ภัยคุกคามจาก "เวทย์" เท่านั้น ไม่ครอบคลุมดาเมจกายภาพ [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 4/10 (C) | Warmage Edge/Reliable Cantrip/Arcane Surge เป็น rider บน cantrip ที่ cast อยู่แล้วไม่กิน action เพิ่ม แต่ไม่มี bonus-action spellcasting หรือ extra-turn feature ติด chassis เลย [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 3/10 (C) | Arcane Initiation (lv1) เป็นตัวเลือก background-flavor แคบๆ ไม่มี skill bonus หรือ ritual casting ที่ยืนยันได้ Warmage Tricks อาจมี utility trick แต่เนื้อหาไม่มีในไฟล์ data ที่ตรวจสอบได้ [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Warmage Tricks (2+ ตัว สลับได้ทุก level-up) ปรับลูกเล่นการต่อสู้/เคลื่อนที่/cast ได้ตามสถานการณ์ บวก cantrip list สลับได้ทุก level-up เช่นกัน แต่ทุกอย่างยังคงวนอยู่รอบกลไก cantrip อย่างเดียว ไม่มี spell slot ให้ปรับ role กว้างแบบ caster อื่น [M:2/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (11)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Warmage](00-scorecard-progress.md)_
