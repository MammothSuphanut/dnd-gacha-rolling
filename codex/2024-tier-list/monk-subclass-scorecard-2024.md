# Monk — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 20 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Monk](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-monk.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Monk, 2024)

Floor 0-10 ต่อ axis ของ **Monk เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting, saving throw proficiency Str + Dex, ไม่มี armor proficiency (Unarmored Defense = 10+Dex+Wis), weapon proficiency simple + martial-light, Martial Arts (Dex แทน Str กับ unarmed/monk weapon, Martial Arts die d6→d12, Bonus Unarmed Strike ฟรีทุกเทิร์น), Focus Points (0 lv1 → 13 lv20, ฟื้นเต็มทุก Short **และ** Long Rest) ขับ Flurry of Blows/Patient Defense/Step of the Wind, Unarmored Movement (+10ft lv2 → +30ft lv18), Uncanny Metabolism (lv2), Deflect Attacks (lv3), Slow Fall (lv4), Extra Attack (lv5), Stunning Strike (lv5), Empowered Strikes (lv6), Evasion (lv7), Acrobatic Movement (lv9), Heightened Focus (lv10), Self-Restoration (lv10), Deflect Energy (lv13), Disciplined Survivor (lv14), Perfect Focus (lv15), Superior Defense (lv18), Body and Mind (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Extra Attack (lv5) + Bonus Unarmed Strike (ฟรีทุกเทิร์น ไม่กิน Focus) ให้ตีได้ 3 ครั้ง/เทิร์นจากฐานเปล่าๆ และ Flurry of Blows เพิ่มอีก 2 ครั้ง (3 ครั้งที่ lv10) ด้วย 1 Focus Point — Martial Arts die สเกล d6→d12 ตามเลเวล บวก Empowered Strikes (lv6) เปลี่ยนดาเมจ unarmed เป็น Force damage ทะลุ resistance ปกติได้ [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Stunning Strike (lv5, 1 Focus Point/ครั้งที่ตีติด) บังคับ CON save ไม่งั้นติด Stunned จนถึงเทิร์นถัดไปของเรา (ไร้ action/ล้ม save ทุกอันโดยอัตโนมัติ) เป็น hard-CC ที่แรงที่สุดที่ class ไม่มีเวทย์ตัวไหนมีติด baseline แต่ต้องตีติดก่อนและใช้ได้แค่ 1 ครั้ง/เทิร์นกับเป้าเดียว [M:3/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — ทุกอย่างเป็น self-focused |
| **Survivability** | 9/10 (S) | Unarmored Defense (10+Dex+Wis) เป็นสูตร AC ที่ใช้ 2 stat ดีพร้อมกัน, Deflect Attacks (lv3, reaction ลดดาเมจ B/P/S ด้วย 1d10+Dex+level ขยายเป็นทุกชนิดที่ lv13) สเกลแรงขึ้นตามเลเวล, Evasion (lv7, save เสียครึ่งดาเมจกลายเป็นศูนย์เมื่อ save ผ่าน), Self-Restoration (lv10, ล้าง charmed/frightened/poisoned อัตโนมัติทุกจบเทิร์น), Disciplined Survivor (lv14, proficiency **ทุก** saving throw + reroll ได้), Superior Defense (lv18, resist ทุกดาเมจยกเว้น Force 1 นาที) — ชั้นการป้องกันซ้อนกันหลายเลเยอร์มากที่สุดในเกม แม้ early-game จะยังไม่ครบ (Deflect ยังอ่อนที่ lv3, ครบทุกอย่างจริงๆ ต้อง lv14+) [M:4/4] [R:3/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Bonus Unarmed Strike ให้ตีฟรีด้วย Bonus Action ทุกเทิร์นไม่กิน resource, Patient Defense/Step of the Wind แปลง Disengage+Dodge หรือ Disengage+Dash ให้เป็น Bonus Action เดียว (ประหยัด action หลักไปเต็มๆ), และ Focus Points ฟื้นเต็มทุก **ทั้ง Short และ Long Rest** (ดีกว่า resource pool ของเกือบทุก class ที่ฟื้นแค่ Long Rest) บวก Uncanny Metabolism (lv2) รีเซ็ต Focus เต็ม + ฮีลได้ฟรีตอนทอย initiative 1 ครั้ง/long rest [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Unarmored Movement ให้ speed เพิ่มแบบ passive ตลอดเวลา (+10ft lv2 ไต่ถึง +30ft lv18) และ Acrobatic Movement (lv9) เดินบนกำแพง/น้ำได้โดยไม่ตกแบบ passive ช่วย exploration/สำรวจได้มาก แต่ไม่มี skill expertise หรือ ritual casting เลย [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 5/10 (B) | Focus Point pool เดียวขับ 3 ฟีเจอร์คนละสาย (Flurry of Blows=รุก, Patient Defense=รับ, Step of the Wind=เคลื่อนที่) ให้เลือกใช้ได้ทุกเทิร์นตามสถานการณ์ ฟื้นเต็มทุก short rest ทำให้ปรับบทบาทรายเทิร์นได้บ่อย บวก Disciplined Survivor (lv14) proficiency ทุก save ตัดจุดอ่อนออกไปเกือบหมด แต่ยังคงเป็น archetype นักสู้มือเปล่า/อาวุธเบา Dex-based เดียวตายตัว ไม่มีทางปรับไป role ระยะไกล/เวทย์ [M:2/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (20)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Monk](00-scorecard-progress.md)_
