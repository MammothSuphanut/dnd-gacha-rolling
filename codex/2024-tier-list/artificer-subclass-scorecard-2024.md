# Artificer — Subclass Scorecard (2024) 🕰️

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 6 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Artificer](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-artificer.json` — source `TCE` (Tasha's Cauldron of Everything) — **🕰️ Artificer ไม่มี reprint 2024 ใน PHB/XPHB** จึงใช้กลไก/ตัวเลขจากเวอร์ชัน 2014 ทั้งหมดตามกติกา 2014-only orphan ของโปรเจกต์

---

## Class Baseline (Artificer, 2014) 🕰️

Floor 0-10 ต่อ axis ของ **Artificer เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Int, caster progression แบบ artificer (ช้าที่สุดในกลุ่ม half-caster, สลับ prepared spell ได้เต็มทุก Long Rest, มี Ritual Casting), saving throw proficiency Con + Int, armor proficiency light/medium/shield, weapon proficiency simple (+firearms เป็น optional rule), tool proficiency thieves' tools + tinker's tools + artisan's tools 1 ชนิด, Magical Tinkering (lv1), Infuse Item/Infusions Known (lv2, รู้ 4→8 infusion จากคลัง สลับ 1 ตัว/level-up), The Right Tool for the Job (lv3), Tool Expertise (lv6, double prof tool check), Flash of Genius (lv7, reaction บวก Int mod ให้ check/save ของตัวเองหรือ ally ในระยะ 30ft, Int mod ครั้ง/วัน), Magic Item Adept (lv10), Spell-Storing Item (lv11), Magic Item Savant (lv14, ignore attunement requirement ทุกชนิด), Magic Item Master (lv18), Soul of Artifice (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | Caster progression แบบ artificer เป็น half-caster ที่ปลดล็อก slot ช้าที่สุดในเกม (ช้ากว่า Paladin/Ranger 1 ระดับตัวละคร) และ artificer spell list ไม่ได้เน้น blast โดยตรง magnitude จึงต่ำกว่า full caster และ half-caster อื่นชัดเจน [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature เฉพาะติด chassis เลย ต้องพึ่ง spell ที่เลือกเตรียมเอง (เช่น Hold Person) เหมือน caster ทั่วไป [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 6/10 (B) | Flash of Genius (lv7) เป็น reaction บวก Int mod ให้ **ability check หรือ saving throw** ของตัวเองหรือ ally ในระยะ 30ft ได้ (Int mod ครั้ง/วัน ฟื้น long rest) ครอบคลุมทั้ง check และ save กว้างกว่า Bardic Inspiration ที่ต้องมอบล่วงหน้า บวก Spell-Storing Item (lv11) ให้ ally ใช้คาถาที่เก็บไว้ในไอเทมได้เองโดยไม่ต้องพึ่งเรา [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 4/10 (C) | HD d8 + armor medium/shield (ไม่มี heavy) + saving throw proficiency Con (กัน concentration break ได้ดี) บวก Soul of Artifice (lv20, +1 ทุก saving throw ต่อ magic item ที่ attune อยู่ สูงสุด +6 ที่ attune ครบ 6 ชิ้น + เปลี่ยน death เป็น 1 HP ได้โดยสละ infusion) แต่ปลดล็อกช้ามากถึง lv20 [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 4/10 (C) | Flash of Genius เป็น reaction ไม่กิน turn ตัวเอง แต่ใช้ได้แค่ Int mod ครั้ง/วัน ฟื้น long rest เท่านั้น ไม่มี free-action หรือ extra-action feature อื่นติด chassis [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 8/10 (A) | Infuse Item/Infusions Known ให้สร้าง magic item ได้เองจากคลัง infusion (4→8 ชิ้นพร้อมกัน), The Right Tool for the Job (lv3) สร้าง artisan's tools ชนิดใดก็ได้ขึ้นมาฟรีใน 1 ชม., Tool Expertise (lv6) double proficiency ทุก tool check, และ Magic Item Savant (lv14) **ignore ข้อจำกัด class/race/level ในการ attune magic item ทุกชนิด** ทำให้ใช้ magic item อะไรก็ได้ในเกมโดยไม่มีเงื่อนไข — breadth utility กว้างที่สุดในบรรดา class ที่ทำมาแล้ว [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Prepared spell list reset เต็มทุก Long Rest เหมือน Wizard บวก Infusions Known ที่เลือกได้ว่าจะ craft item สายไหน (ดาเมจ/ป้องกัน/utility) และ Magic Item Savant ที่ใช้ magic item อะไรก็ได้ในเกม — ปรับตัวเข้ากับสิ่งที่ทีม/แคมเปญต้องการได้กว้างมาก แม้ตัว archetype จะยังเป็นสาย caster/item-crafter เป็นแกนหลัก [M:3/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (6)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Artificer](00-scorecard-progress.md)_
