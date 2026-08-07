# Rogue — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Rogue](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-rogue.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Rogue, 2024)

Floor 0-10 ต่อ axis ของ **Rogue เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting, saving throw proficiency Dex + Int, armor proficiency light เท่านั้น, weapon proficiency simple + finesse/light martial, Weapon Mastery (2 ชนิด), Expertise (2 skill lv1 + 2 skill lv6 = 4 รวม), Sneak Attack (1d6 lv1 → 10d6 lv20, ครั้งเดียว/เทิร์น ต้อง Advantage หรือมี ally ประกบเป้า, จำกัดแค่ finesse/ranged weapon), Thieves' Cant, Cunning Action (lv2, Dash/Disengage/Hide เป็น Bonus Action ฟรี), Steady Aim (lv3), Cunning Strike (lv5, แลก dice Sneak Attack เป็น Poison/Trip/Withdraw), Uncanny Dodge (lv5), Evasion (lv7), Reliable Talent (lv7), Improved Cunning Strike (lv11), Devious Strikes (lv14, Daze/Knock Out/Obscure), Slippery Mind (lv15), Elusive (lv18), Stroke of Luck (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Sneak Attack สเกลจาก 1d6 (lv1) เป็น 10d6 (lv20) — extra damage dice ก้อนเดียวที่โตที่สุดในเกม แต่ต้องมี Advantage หรือ ally อยู่ประกบเป้าภายใน 5ft ถึงจะ trigger ได้ และใช้ได้แค่ครั้งเดียว/เทิร์นกับอาวุธ finesse/ranged เท่านั้น [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 4/10 (C) | Cunning Strike (lv5) ให้แลก die ของ Sneak Attack เป็น Trip (ล้ม prone) หรือ Withdraw (หนีฟรี) และ Devious Strikes (lv14) เพิ่ม Daze/Knock Out (สลบจริง!)/Obscure (ทำให้ตาบอดชั่วคราว) เป็น control ที่หลากหลายแต่ต้อง**แลกดาเมจ**ทุกครั้ง (opportunity cost ตรงๆ) และปลดล็อกช้า (lv5/lv14) [M:2/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — chassis เน้นตัวเองล้วนๆ |
| **Survivability** | 6/10 (B) | Uncanny Dodge (lv5, reaction ลดดาเมจการโจมตีที่โดนลงครึ่งหนึ่ง ใช้ได้ไม่จำกัดครั้ง/วันตราบเห็นผู้โจมตี) + Evasion (lv7, save AoE ผ่านไม่โดนดาเมจเลย) + Elusive (lv18, ห้ามศัตรูมี Advantage ใส่เราเลยนอกจากเรา Incapacitated) เป็นชุดป้องกันที่ครบแต่ทยอยปลดล็อกช้า (เต็มรูปแบบต้อง lv18) HD d8 กลางๆ ไม่มี armor หนัก [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Cunning Action (lv2) แปลง Dash/Disengage/Hide เป็น Bonus Action **ฟรีไม่จำกัดจำนวนครั้ง/เทิร์น ไม่กิน resource เลย** เป็นเครื่องมือ mobility/stealth ที่ดีที่สุดในเกมสำหรับ non-caster และ Cunning Strike ให้ Sneak Attack แปลงเป็น control/utility ได้โดยไม่ต้องเสีย action เพิ่มเลย (แค่แลก dice) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | Expertise รวม 4 skill (2 ที่ lv1 + 2 ที่ lv6) บวก Reliable Talent (lv7) ที่ทำให้ roll d20 ≤9 ในทุก skill/tool check ที่ proficient นับเป็น 10 แทน (ตัดโอกาสพลาดแบบสุ่มทิ้งเกือบหมด) เป็นชุด skill-monkey ที่ reliability สูงมาก แม้จะช่วยได้แค่ skill ที่ proficient อยู่แล้ว (แคบกว่า Jack of All Trades ของ Bard ที่ช่วยได้ทุก skill) [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Cunning Strike ให้เมนูแปลง Sneak Attack dice เป็นเอฟเฟกต์ต่างสาย (Poison/Trip/Withdraw ที่ lv5 → Daze/Knock Out/Obscure ที่ lv14) รวม 6 ตัวเลือกที่ trigger ได้ทุกครั้งที่ Sneak Attack ทำงาน (อย่างน้อย 1 ครั้ง/เทิร์นในไฟต์ส่วนใหญ่) ทำให้ resource เดียวปรับไปทางดาเมจ/control/utility ได้ตามสถานการณ์ บวก Weapon Mastery สลับได้ทุก Long Rest [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (19)

_ยังไม่เริ่ม — ตารางจะเพิ่มทีหลังตาม [00-scorecard-progress.md § Rogue](00-scorecard-progress.md)_
