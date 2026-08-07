# Paladin — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Paladin](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-paladin.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Paladin, 2024)

Floor 0-10 ต่อ axis ของ **Paladin เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, spellcasting ability Cha, half-caster (slot สูงสุด lv5 ที่ character lv17+), saving throw proficiency Wis + Cha, armor proficiency ครบทุกชนิดรวม heavy+shield, weapon proficiency simple+martial, Weapon Mastery (2 ชนิด), Lay on Hands (pool ฮีล = 5×level/long rest), Paladin's Smite (Divine Smite ติดตัวฟรี cast ไม่เสีย slot ได้ 1 ครั้ง/long rest), Fighting Style, Channel Divinity (Divine Sense เริ่มต้น, 2→3 ใช้/วัน), Extra Attack (lv5), Faithful Steed (lv5, Find Steed ติดตัวฟรี), Aura of Protection (lv6, +Cha mod บน saving throw ให้ตัวเอง+ally ในระยะ 10ft→30ft), Abjure Foes (lv9), Aura of Courage (lv10), Radiant Strikes (lv11), Restoring Touch (lv14), Aura Expansion (lv18)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Extra Attack (lv5) + Paladin's Smite (Divine Smite ติดตัวฟรี cast ไม่เสีย slot ได้ 1 ครั้ง/long rest เป็น burst ดาเมจก้อนใหญ่บนการตีเดียว) บวก Radiant Strikes (lv11) เพิ่ม 1d8 radiant ทุกครั้งที่ตี melee/unarmed แบบ passive ไม่กิน resource — nova potential สูงจากทั้งอาวุธและ smite spell พร้อมกัน [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 5/10 (B) | Abjure Foes (lv9, Channel Divinity) บังคับ Wis save เป้าหมายหลายตัวเท่า Cha mod ในระยะ 60ft ไม่งั้นติด Frightened 1 นาที (จำกัดให้ทำได้แค่ move **หรือ** action **หรือ** bonus action อย่างเดียวต่อเทิร์น) เป็น soft-lockdown ที่ area กว้างพอสมควรแต่ปลดล็อกช้า (lv9) และใช้ Channel Divinity ที่มีจำกัด 2-3 ครั้ง/วัน [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 9/10 (S) | Aura of Protection (lv6) บวก Cha mod (ขั้นต่ำ +1) เข้า saving throw ของตัวเอง**และ**ทุก ally ในระยะ 10ft (ขยายเป็น 30ft ที่ lv18) แบบ **passive ตลอดเวลาไม่เสีย action หรือ resource เลย** เป็นบัฟทีมที่ฟรีที่สุดในเกม บวก Lay on Hands (pool ฮีล 5×level/long rest จัดสรรเองได้อิสระ ใช้ bonus action) และ Aura of Courage (lv10, immune Frightened ทั้ง aura) — coverage กว้างครบทั้งฮีล/save-buff/condition-immunity [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | HD d10 + armor ครบทุกชนิดรวม heavy+shield ตั้งแต่ lv1 + saving throw proficiency Wis กับ Cha (สองเซฟที่ป้องกัน control effect ได้กว้าง) บวกยังได้ประโยชน์จาก Aura of Protection ของตัวเองด้วย (บวก Cha mod เข้า save ทุกอัน) และ Lay on Hands ใช้ฮีลตัวเองได้เช่นกัน [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Lay on Hands ใช้แค่ Bonus Action, Paladin's Smite เป็นแค่ rider บนการตีที่ตีอยู่แล้ว (ไม่กิน action เพิ่ม), Aura of Protection ไม่กิน action เลยสักนิด (passive ตลอดเวลา) — Channel Divinity จำกัด 2-3 ครั้ง/วัน ฟื้น 1/short rest และ Paladin's Smite แบบฟรีใช้ได้แค่ 1 ครั้ง/long rest เป็นจุดจำกัด [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Faithful Steed (lv5) ติดตัว Find Steed ฟรีตลอดกาล cast ไม่เสีย slot ได้ 1 ครั้ง/long rest เป็นเครื่องมือเดินทาง/exploration ที่ดี (ม้าเวทย์ที่มีสถิติแข็งแรง) บวก Divine Sense (bonus action, ตรวจจับ celestial/fiend/undead + consecrated ground ในระยะ 60ft 10 นาที) เป็น utility เฉพาะทางแคบ ไม่มี skill bonus หรือ ritual casting ใดๆ [M:2/4] [R:1/3] [B:1/3] |
| **Versatility** | 4/10 (C) | Weapon Mastery สลับชนิดอาวุธได้ทุก Long Rest บวก Fighting Style เลือก Blessed Warrior (โน้มไปทาง caster) ได้ แต่ prepared spell list สลับได้แค่ **1 คาถา/Long Rest** เท่านั้น (จำกัดแบบเดียวกับ Bard ไม่ใช่ reset เต็มแบบ Cleric/Druid) ทำให้ปรับตัวรายวันได้จำกัด และยังคงเป็น archetype นักดาบ+ผู้พิทักษ์ทีมตายตัว [M:2/4] [R:1/3] [B:1/3] |

---

## Subclass Scoring (19)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Paladin](00-scorecard-progress.md)_
