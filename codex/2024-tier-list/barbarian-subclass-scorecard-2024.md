# Barbarian — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 21 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Barbarian](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-barbarian.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Barbarian, 2024)

Floor 0-10 ต่อ axis ของ **Barbarian เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d12, ไม่มี spellcasting, saving throw proficiency Str + Con, armor proficiency light/medium/shield, weapon proficiency simple+martial, Rage (2 ครั้ง/วัน lv1 → เพิ่มเป็น unlimited ที่ lv20, bonus +2 dmg lv1 → +4 lv16+), Unarmored Defense, Weapon Mastery (2 ชนิดอาวุธ lv1), Danger Sense, Reckless Attack, Primal Knowledge, Extra Attack (lv5), Fast Movement, Feral Instinct, Instinctive Pounce, Brutal Strike (lv9), Relentless Rage, Persistent Rage, Indomitable Might, Primal Champion

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Rage ให้โบนัสดาเมจแฟลตทุกครั้งที่ตีด้วย Strength (+2 ที่ lv1 → +4 ที่ lv16+) รวมกับ Reckless Attack ที่ให้ Advantage บนทุก attack roll สาย Str แลกกับให้ศัตรู Advantage ตีกลับ และ Extra Attack (lv5) เพิ่มจำนวนครั้งที่ได้โบนัสนี้ต่อเทิร์น — magnitude สูงและไม่ต้องพึ่ง subclass เลย แต่ผูกกับอาวุธ Strength-based เท่านั้น (ไม่มีทางเลือกสายไกล/เวทย์) [M:3/4] [R:2/3] [B:1/3] |
| **Control** | 3/10 (C) | Brutal Strike (lv9, ต้อง Reckless Attack + ยอม forgo Advantage 1 ครั้ง) ให้เลือก Forceful Blow (ผลัก 15 ฟุต) หรือ Hamstring Blow (ลด speed 15 ฟุตจนถึงเทิร์นถัดไป) เป็น soft-CC เดี่ยวๆ ที่ต้อง hit ก่อนถึงจะติด ไม่มี hard-CC (stun/paralyze/restrain) ติด baseline เลย [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — Rage, Reckless Attack, Weapon Mastery ล้วนเป็น self-buff ทั้งหมด |
| **Survivability** | 8/10 (A) | HD d12 (สูงสุดในเกม) + Unarmored Defense (AC = 10+Dex+Con mod ใช้ shield ได้ด้วย) + ตอน Rage active ได้ Resistance ดาเมจ Bludgeoning/Piercing/Slashing (ลดดาเมจกายภาพเกือบทุกแหล่งลงครึ่งหนึ่ง) พร้อม Relentless Rage (lv11, DC10 Con save เมื่อ HP ลง 0 ระหว่าง Rage เพื่อลุกมาเหลือ HP = 2×level แทน) และ Feral Instinct (lv7, Advantage initiative ช่วยลงมือก่อนโดนตี) — magnitude/reliability สูงมาก แต่ resistance ใช้ได้แค่ตอน active Rage และครอบแค่ 3 damage type กายภาพ ไม่กันดาเมจธาตุ/เวทย์ [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Rage เข้าด้วย Bonus Action (ไม่เสีย action หลัก) และคงอยู่ต่อได้ฟรีแค่โจมตี/บังคับ save ในเทิร์นนั้น, Reckless Attack ไม่เสีย action เพิ่ม (แค่ประกาศตอนโจมตี), Instinctive Pounce (lv7) ให้เดินครึ่ง speed ฟรีเป็นส่วนหนึ่งของ bonus action เข้า Rage, Fast Movement (+10ft passive ตลอดเวลา) — Rage เองจำกัดแค่ 2 ครั้ง/วันตอน lv1 (ฟื้น 1 ครั้ง/short rest) กว่าจะเกือบไม่จำกัดต้องถึง lv20 [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | Primal Knowledge (lv3) ให้ skill proficiency เพิ่ม 1 ตัวจาก skill list ของ Barbarian บวกให้ใช้ Strength แทน ability score ปกติของ Acrobatics/Intimidation/Perception/Stealth/Survival ได้ตอน Rage active — ประโยชน์นอกคอมแบตแคบมาก เพราะใช้ได้แค่ตอน Rage (ปกติเปิดในคอมแบต) และ skill ที่ swap ได้ก็เอียงไปทาง combat-adjacent [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 3/10 (C) | Weapon Mastery ให้เลือกอาวุธ 2 ชนิด (เพิ่มเป็น 4 ที่ lv13+) และสลับชนิดได้ทุก Long Rest เป็นความยืดหยุ่นเดียวที่มี — ไม่มี spellcasting/ไม่มีทางปรับ role นอกเหนือจาก Str-melee striker/tank ตัว chassis ผูก archetype เดียวตายตัวตั้งแต่ lv1 [M:1/4] [R:1/3] [B:1/3] |

---

## Subclass Scoring (21)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Barbarian](00-scorecard-progress.md)_
