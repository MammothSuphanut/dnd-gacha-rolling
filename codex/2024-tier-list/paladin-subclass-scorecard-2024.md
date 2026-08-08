# Paladin — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 19 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Paladin](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 19 ตัว

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

**Class Baseline อ้างอิง**: Damage 7, Control 5, Support 9, Survivability 8, Action Economy 6, Utility 4, Versatility 4

หมายเหตุที่มา: Devotion/Glory/Ancients/Vengeance = XPHB (2024 official) — Oathbreaker(DMG)/Crown(SCAG)/Conquest+Redemption(XGE)/Watchers(TCE)/Eternal Night+Heresy+Storms+The Sun+Winter(VSS) = 🕰️ 2014-only ไม่มี reprint — Pestilence/Slaughter/Zeal = GrimHollowPG24 (2024) — Noble Genies = FRHoF (2024) — Revelry = ValdaPlayerPack (ตรวจสอบแล้วใช้ chassis 2024/`XPHB` จึงไม่ติด 🕰️) ไม่มี Oath ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ หมายเหตุ: Support baseline สูงมากอยู่แล้ว (9) ทำให้หลาย Oath ยัง "เท่า baseline" แม้มี aura เสริมเพราะ magnitude ไม่พอข้าม tier

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Oath of Conquest | S | XGE 🕰️ | 9 (S) | 8 (A) | 9 (S) | 9 (S) | 6 (B) | 4 (C) | 7 (A) |
| Oath of Devotion | A | XPHB | 8 (A) | 5 (B) | 10 (S) | 9 (S) | 6 (B) | 4 (C) | 6 (B) |
| Oath of Eternal Night | A | VSS 🕰️ | 8 (A) | 6 (B) | 9 (S) | 9 (S) | 7 (A) | 6 (B) | 7 (A) |
| Oath of Glory | A | XPHB | 8 (A) | 5 (B) | 10 (S) | 9 (S) | 6 (B) | 6 (B) | 7 (A) |
| Oath of Heresy | A | VSS 🕰️ | 8 (A) | 8 (A) | 9 (S) | 9 (S) | 7 (A) | 4 (C) | 6 (B) |
| Oath of Pestilence | S | GrimHollowPG24 | 9 (S) | 9 (S) | 9 (S) | 9 (S) | 6 (B) | 4 (C) | 7 (A) |
| Oath of Redemption | A | XGE 🕰️ | 8 (A) | 5 (B) | 10 (S) | 9 (S) | 6 (B) | 5 (B) | 6 (B) |
| Oath of Revelry | A | ValdaPlayerPack | 8 (A) | 5 (B) | 10 (S) | 9 (S) | 6 (B) | 4 (C) | 8 (A) |
| Oath of Slaughter | S | GrimHollowPG24 | 10 (S) | 5 (B) | 9 (S) | 9 (S) | 8 (A) | 4 (C) | 6 (B) |
| Oath of Storms | S | VSS 🕰️ | 9 (S) | 6 (B) | 9 (S) | 9 (S) | 6 (B) | 6 (B) | 6 (B) |
| Oath of the Ancients | A | XPHB | 7 (A) | 7 (A) | 10 (S) | 10 (S) | 7 (A) | 4 (C) | 7 (A) |
| Oath of the Crown | A | SCAG 🕰️ | 7 (A) | 7 (A) | 10 (S) | 9 (S) | 6 (B) | 4 (C) | 7 (A) |
| Oath of the Noble Genies | S | FRHoF | 8 (A) | 8 (A) | 10 (S) | 10 (S) | 7 (A) | 4 (C) | 8 (A) |
| Oath of The Sun | S | VSS 🕰️ | 9 (S) | 7 (A) | 9 (S) | 9 (S) | 6 (B) | 4 (C) | 6 (B) |
| Oath of the Watchers | A | TCE 🕰️ | 8 (A) | 7 (A) | 10 (S) | 9 (S) | 6 (B) | 5 (B) | 7 (A) |
| Oath of Vengeance | A | XPHB | 8 (A) | 7 (A) | 9 (S) | 8 (A) | 8 (A) | 4 (C) | 6 (B) |
| Oath of Winter | A | VSS 🕰️ | 8 (A) | 7 (A) | 9 (S) | 10 (S) | 6 (B) | 4 (C) | 6 (B) |
| Oath of Zeal | S | GrimHollowPG24 | 9 (S) | 7 (A) | 10 (S) | 9 (S) | 8 (A) | 6 (B) | 7 (A) |
| Oathbreaker | S | DMG 🕰️ | 9 (S) | 8 (A) | 9 (S) | 9 (S) | 7 (A) | 5 (B) | 7 (A) |

---

### Oath of Conquest (XGE 🕰️)

**Overall**: S — Damage และ Survivability เป็น S ใหม่ทั้งคู่ (baseline Survivability เดิมก็ A อยู่แล้วแต่ขยับขึ้นถึง S) บวก Control กระโดด +3


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Invincible Conqueror (lv20, ตีเพิ่มอีก 1 ครั้ง + crit range 19-20 + resist ดาเมจทุกชนิด นาน 1 นาที) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Conquering Presence (CD, AoE Frightened) + Aura of Conquest (lv7, เป้าที่ Frightened speed เป็น 0 ในออร่า + psychic dmg ต่อเนื่อง) — lockdown ที่ครบเครื่อง [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | ไม่มี ally-support ใหม่ (ออร่าเน้นข่มขู่ศัตรู) = เท่า baseline |
| **Survivability** | 9/10 (S) | Scornful Rebuke (lv15, psychic dmg ตอบโต้ทุกครั้งที่โดนตี) + Invincible Conqueror (resist ทุกดาเมจ) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม fear-control/tank/damage ในธีมผู้พิชิต [M:2/4] [R:2/3] [B:3/3] |

### Oath of Devotion (XPHB)

**Overall**: A — Survivability ขยับเป็น S ใหม่ (baseline A) แต่ breadth แคบ มีแค่ Versatility ที่ขยับตามอีกนิด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Sacred Weapon (บวก Cha mod เข้า attack roll + เลือกดาเมจ radiant แทนได้) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Aura of Devotion (lv7, immune Charmed ทั้งออร่า) + Smite of Protection (lv15, half cover ให้ทีมทุกครั้งที่ smite) + Holy Nimbus (lv20, radiant dmg อัตโนมัติใส่ศัตรูในออร่า) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Aura of Devotion ป้องกันตัวเองจาก Charmed ด้วย + Holy Nimbus (Advantage save ต้าน fiend/undead) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 4/10 (C) | Sacred Weapon's แสงสว่าง (20/20ft) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 6/10 (B) | Paladin แบบคลาสสิก (defender+support) ธีมมาตรฐาน = ใกล้เท่า baseline |

### Oath of Eternal Night (VSS 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ บวกขยับขึ้นอีก 3 axis กลางๆ (Control/AE/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Shadow Form (lv20, extra 3d6 necrotic ทุกครั้งที่ตีเมลีโดนในที่มืด/สลัว) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Cover of Darkness (CD, AoE ความมืดวิเศษ 15ft) เป็น battlefield control เล็กน้อย [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 9/10 (S) | Slip Into the Shadows (lv7, ally ในออร่าใช้ Hide เป็น bonus action ได้ด้วย) = ใกล้เท่า baseline |
| **Survivability** | 9/10 (S) | Cloak of Night (lv15, reaction กด Disadvantage การโจมตีถัดไปใส่เรา) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Shadow Form (bonus action teleport 60ft ระหว่างฤทธิ์) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Shrouded Armor (Cha บวกเข้า Stealth + ไม่มี disadvantage) + Cover of Darkness (ใช้แทรกซึมได้) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | เปิด role นักฆ่าเงา/แทรกซึมที่ต่างจาก paladin ทั่วไป [M:2/4] [R:2/3] [B:3/3] |

### Oath of Glory (XPHB)

**Overall**: A — Survivability เป็น S ใหม่ บวก Utility/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Living Legend's Unerring Strike (lv20, แปลงพลาดเป็นโดน 1 ครั้ง/เทิร์น) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Inspiring Smite (CD, แจก temp HP ให้ทีมทุกครั้งที่ smite) + Aura of Alacrity (lv7, +10ft speed ให้ ally ที่เข้าออร่า) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Glorious Defense (lv15, reaction บวก AC ให้ตัวเอง/คนใกล้ตัวจนพลาด+ตีสวนได้) + Living Legend (reroll failed save) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 6/10 (B) | Peerless Athlete (Advantage Athletics/Acrobatics + ระยะกระโดดเพิ่ม) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ธีมวีรบุรุษที่ผสม support/defense/athletics [M:2/4] [R:2/3] [B:3/3] |

### Oath of Heresy (VSS 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ บวก Control กระโดด +3 และ AE/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Blaspheme (CD, AoE psychic 2d6×prof bonus) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Turn the Holy (turn celestial**และ**ผู้แคส Wis-based ในระยะเดียว — กว้างกว่า Turn Undead ปกติ) + Blaspheme (deafen) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | ไม่มี ally-support บวกใหม่ (ธีมต้านศาสนา) = เท่า baseline |
| **Survivability** | 9/10 (S) | Implacable Will (lv15, reroll failed save ด้วย Advantage) + Apostate (lv20, temp HP 20/เทิร์น) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Godless Aura (lv7, แคส Counterspell ฟรีเป็น reaction ต้านผู้แคส Wis-based) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 6/10 (B) | ผู้เชี่ยวชาญต้านเวทมนตร์ศักดิ์สิทธิ์เฉพาะทาง = ใกล้เท่า baseline |

### Oath of Pestilence (GrimHollowPG24)

**Overall**: S — 3 axis เป็น S ใหม่พร้อมกัน (Damage, Control กระโดด +4, Survivability) มากที่สุดในกลุ่มร่วมกับ Storms/The Sun


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Entropic Infection (CD, extra 2d6 necrotic ต่อเนื่อง + ลบ resistance/immunity necrotic ของเป้า) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 9/10 (S) | Debilitating Fever (CD, Poisoned+Incapacitated บนเป้า — เท่ากับ stun เฉพาะทาง) + Aura of Rampant Sickness (lv7, reaction กด Disadvantage บน d20 test ใดๆ ในออร่า) [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 9/10 (S) | ไม่มี ally-support บวกใหม่ (ธีม debuff/DoT ล้วน) = เท่า baseline |
| **Survivability** | 9/10 (S) | Disgusting Resilience (lv15, จ่าย Hit Dice ลดดาเมจตอน 0 HP) + Plaguebringer (lv20, immune poison + resist necrotic + max HP ไม่ลด) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญ debuff/DoT เฉพาะทาง [M:2/4] [R:2/3] [B:3/3] |

### Oath of Redemption (XGE 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ แต่ breadth แคบ (แค่ Utility/Versatility ขยับตามเล็กน้อย)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Rebuke the Violent (CD, reaction ดาเมจ radiant สะท้อนเท่าที่ผู้โจมตีเพิ่งสร้างใส่คนอื่น) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Aura of the Guardian (lv7, reaction รับดาเมจแทน ally ในระยะ 10→30ft เต็มจำนวนไม่ลด) — protector tool ที่ตรงไปตรงมาที่สุดในกลุ่ม [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Protective Spirit (lv15, ฮีลตัวเองทุกเทิร์นตอนเลือดต่ำ) + Emissary of Redemption (lv20, resist ทุกดาเมจจากศัตรูที่ยังไม่โจมตี) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 5/10 (B) | Emissary of Peace (+5 Persuasion ชั่วคราว) [M:1/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | โฟกัส protector/pacifist เฉพาะทางสุดขั้ว = ใกล้เท่า baseline |

### Oath of Revelry (ValdaPlayerPack)

**Overall**: A — Survivability เป็น S ใหม่ บวก Versatility กระโดด +4 เด่นชัด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Aura of Fraternity (lv7, +1d4→1d8 ดาเมจ passive ให้ตัวเอง+ally ในออร่าทุกครั้งที่ตีเมลีโดน) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Conjure Drink (CD, temp HP+Advantage save ให้หลาย ally) + Aura of Fraternity (บัฟดาเมจทีม) + Merrymaker (lv15, reaction แจก Advantage บน d20 test ใดๆ ให้ ally ฟรี คืน charge ถ้ายังพลาด) + Party Animal (lv20, Heroic Inspiration ทุกเทิร์น) — support kit ที่ครบเครื่องที่สุดในกลุ่ม [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Party Animal (immune Blinded/Deafened/Exhaustion/Poisoned ทั้งออร่า) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 8/10 (A) | ผู้เชี่ยวชาญบัฟทีมที่ครบเครื่องที่สุดในบรรดา Oath [M:2/4] [R:3/3] [B:3/3] |

### Oath of Slaughter (GrimHollowPG24)

**Overall**: S — Damage พุ่งเป็น 10/10 (S เต็มสเกล) บวก Survivability เป็น S ใหม่ด้วย และ Action Economy/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Frenzied Slaughter (CD, reaction ตีเพิ่มทุกครั้งที่พลาด) + Blood Knight's Wanton Slaughter (lv20, AoE force dmg รอบเป้าที่ตีเมลีโดน) [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Bloodthirst Aura (lv7, บัฟดาเมจให้ ally ที่ Bloodied) เป็น combat-buff ไม่ใช่ heal = เท่า baseline |
| **Survivability** | 9/10 (S) | Frenzied Slaughter (Advantage ต้าน charmed/frightened/stunned) + Blood Knight (temp HP 30 เมื่อ ally เลือดตก) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Frenzied Slaughter ให้ตีเพิ่มฟรีทุกครั้งที่พลาดผ่าน reaction [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | ธีม bloodied-synergy berserker ที่มีองค์ประกอบทีมอยู่บ้าง = ใกล้เท่า baseline |

### Oath of Storms (VSS 🕰️)

**Overall**: S — Damage และ Survivability เป็น S ใหม่ทั้งคู่ บวก Control/Utility/Versatility ขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Thunder God (lv20, แคส Call Lightning ฟรีเป็น bonus action ได้ทุกเทิร์นระหว่างฤทธิ์) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Vortex Aura (lv7, bonus action สร้าง difficult terrain รอบตัว) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 9/10 (S) | ไม่มี ally-support บวกใหม่ (ธีม self-focused blaster) = เท่า baseline |
| **Survivability** | 9/10 (S) | Storm Soul (lv15, resist lightning + ตอบโต้ดาเมจ lightning) + Thunder God (immune lightning/thunder) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 6/10 (B) | Walk on Waves (CD, water walk + speed 2 เท่าบนน้ำ นาน 1 ชม.) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Storm-blaster ที่ผสมดาเมจ+resist+mobility น้ำ = ใกล้เท่า baseline |

### Oath of the Ancients (XPHB)

**Overall**: A — Survivability พุ่งเป็น 10/10 (S เต็มสเกล) บวก Control/Action Economy/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม defense/support ล้วน) = เท่า baseline |
| **Control** | 7/10 (A) | Nature's Wrath (CD, AoE Restrained 15ft) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 10/10 (S) | Aura of Warding (lv7, resist necrotic/psychic/radiant ให้ตัวเอง+ทีมทั้งออร่า) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 10/10 (S) | Undying Sentinel (lv15, ตกลง 1 HP แทน 0 + ฮีล 3×level, 1/long rest) + Elder Champion (lv20, ฟื้น HP 10/เทิร์น) [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Elder Champion (lv20, แคส spell action-casting-time เป็น bonus action ได้) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม control/resist-aura/self-heal ในธีมผู้พิทักษ์ธรรมชาติ [M:2/4] [R:2/3] [B:3/3] |

### Oath of the Crown (SCAG 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ บวก Control/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม tank/support ล้วน) = เท่า baseline |
| **Control** | 7/10 (A) | Champion Challenge (CD, bonus action AoE taunt-lock ห้ามศัตรูขยับหนีเกิน 30ft) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 10/10 (S) | Turn the Tide (CD, bonus action AoE ฮีล ally ที่ Bloodied) + Divine Allegiance (lv7, reaction รับดาเมจแทน ally เต็มจำนวนไม่ลด) + Exalted Champion (lv20, Advantage death save+Wis save ให้ทั้งทีม) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Unyielding Spirit (lv15, Advantage ต้าน paralyzed/stunned) + Exalted Champion (resist B/P/S) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | Tank-protector คลาสสิกที่ผสม control+heal+defense [M:2/4] [R:2/3] [B:3/3] |

### Oath of the Noble Genies (FRHoF)

**Overall**: S — Survivability พุ่งเป็น 10/10 (S เต็มสเกล) บวกขยับขึ้นอีก 4 axis พร้อมกัน (Damage/Control/AE/Versatility) กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Efreeti's Fury (ตัวเลือก Elemental Smite, extra fire dmg ใส่ 2 เป้าพร้อมกัน) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Dao's Crush (Restrained) + Marid's Surge (AoE push+prone) — ตัวเลือก control ที่ยืดหยุ่นบน smite เดียวกัน [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 10/10 (S) | Aura of Elemental Shielding (lv7, resist ธาตุที่เลือกให้ทีม สลับได้ทุกเทิร์น) + Noble Scion's Minor Wish (lv20, reroll ทดแทน d20 test ที่ล้มเหลวให้ตัวเองหรือ ally ในออร่า) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 10/10 (S) | Djinni's Escape (ตัวเลือก smite, teleport+resist B/P/S+immune grapple/prone/restrain) + Elemental Rebuke (lv15, reaction ลดดาเมจครึ่ง+ตอบโต้) [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | ตัวเลือก Elemental Smite ทั้งหมดแนบมากับ Divine Smite ที่แคสอยู่แล้วไม่เสีย action เพิ่ม [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Genie's Splendor (skill proficiency) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | เลือกได้ 4 ตัวเลือก Elemental Smite (control/damage/escape/AoE) ตามสถานการณ์ — ยืดหยุ่นที่สุดในกลุ่ม [M:2/4] [R:3/3] [B:3/3] |

### Oath of The Sun (VSS 🕰️)

**Overall**: S — Damage และ Survivability เป็น S ใหม่ทั้งคู่ บวก Control/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Incandescent Fury (lv15, Smite die อัปเกรดเป็น d10) + Zenith (lv20, แคส Sunbeam ฟรี) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Solar Flare (CD, AoE Blinded 20ft) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | Sun's Warmth (lv7, resist cold/fire ให้ ally ในออร่าด้วย) = ใกล้เท่า baseline |
| **Survivability** | 9/10 (S) | Glorious Radiance (CD, temp HP เท่า level+Cha + ตอบโต้ดาเมจ radiant) + Zenith (ฮีลตัวเองทุกเทิร์นตอนเลือดต่ำ) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 4/10 (C) | Sun's Warmth's ทนอุณหภูมิสุดขั้ว เป็น utility เฉพาะทางแคบ = ใกล้เท่า baseline |
| **Versatility** | 6/10 (B) | Radiant blaster-tank hybrid = ใกล้เท่า baseline |

### Oath of the Watchers (TCE 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ บวกขยับขึ้นอีก 4 axis กลางๆ กว้างพอสมควร


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Vigilant Rebuke (lv15, reaction ดาเมจ force ทุกครั้งที่ตัวเอง/ally เซฟ Int/Wis/Cha ผ่าน) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Abjure the Extraplanar (CD, turn 5 ชนิดสิ่งมีชีวิตนอกโลก) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 10/10 (S) | Watcher's Will (CD, Advantage Int/Wis/Cha save ให้ตัวเอง+ally สูงสุดเท่า Cha mod คน) + Aura of the Sentinel (lv7, บวก initiative ให้ทั้งทีม) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Watcher's Will ป้องกันตัวเองได้ด้วย + Mortal Bulwark (lv20, truesight) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 5/10 (B) | Mortal Bulwark (lv20, truesight 120ft) มาช้ามากแต่ยืนยันได้ [M:1/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญต้านสิ่งมีชีวิตนอกระนาบที่มี support แข็งแรง [M:2/4] [R:2/3] [B:3/3] |

### Oath of Vengeance (XPHB)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 4 axis กลางๆ พร้อมกัน (Damage/Control/AE/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Vow of Enmity (CD, Advantage ทุกการโจมตีใส่เป้าที่เลือกนาน 1 นาที) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Relentless Avenger (lv7, OA ลด speed เป้าเป็น 0) + Avenging Angel (lv20, AoE Frightened) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | ไม่มี ally-support บวกใหม่ (ธีมล่าเป้าเดี่ยว) = เท่า baseline |
| **Survivability** | 8/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่โดยตรง = เท่า baseline |
| **Action Economy** | 8/10 (A) | Relentless Avenger (ขยับฟรีเป็นส่วนหนึ่งของ OA reaction) + Soul of Vengeance (lv15, reaction ตีฟรีใส่เป้า vow ทุกครั้งที่มันโจมตี) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | ผู้ล่าเป้าเดี่ยวเฉพาะทาง = ใกล้เท่า baseline |

### Oath of Winter (VSS 🕰️)

**Overall**: A — Survivability พุ่งเป็น 10/10 (S เต็มสเกล) บวก Control/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | North Wind (CD, AoE cone cold dmg สเกลตาม prof bonus + ลด speed ครึ่ง) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | North Wind (ลด speed ครึ่ง) + Father Winter (lv20, difficult terrain aura) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | Frigid Aura (lv7, resist cold/fire ให้ ally ในออร่าด้วย) = ใกล้เท่า baseline |
| **Survivability** | 10/10 (S) | Ice Armor (CD, temp HP 2×level+Cha) + Iceflesh (lv15, reaction "แช่แข็ง" ดีเลย์ดาเมจ/condition ใดๆ ไว้ 1 นาที) + Father Winter (immune cold) [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 4/10 (C) | Father Winter's ดับไฟที่ไม่ใช่เวทมนตร์ เป็น utility เฉพาะทางแคบ = ใกล้เท่า baseline |
| **Versatility** | 6/10 (B) | Cold-blaster/tank hybrid = ใกล้เท่า baseline |

### Oath of Zeal (GrimHollowPG24)

**Overall**: S — Damage และ Survivability เป็น S ใหม่ทั้งคู่ บวกขยับขึ้นครบเกือบทุก axis (6 ใน 7) กว้างที่สุดในกลุ่มทั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Mark of the Heretic (CD, ขยาย crit range เป็น 19-20 ใส่เป้าที่มาร์ก + ตีฟรีทุกครั้งที่เป้าเริ่มเทิร์นผ่าน reaction) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Apocalyptic Revelation (lv20, AoE Blinded รอบตัว) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 10/10 (S) | Aura of Clarity (lv7, immune Blinded+เห็นล่องหนให้ทีมทั้งออร่า) + Smite the Heretic (lv20, Advantage การโจมตีให้ทั้งทีมใส่เป้าที่เลือก) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Aura of Clarity ป้องกันตัวเองจาก Blinded ด้วย [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Mark of the Heretic ให้ตีฟรีผ่าน reaction ทุกครั้งที่เป้าที่มาร์กเริ่มเทิร์น [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Compel Confession (lv15, แคส Zone of Truth ฟรี + psychic dmg ถ้าโกหก) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | นักไต่สวน/ผู้ล่าเป้าเดี่ยวที่มี support แข็งแรง [M:2/4] [R:2/3] [B:3/3] |

### Oathbreaker (DMG 🕰️)

**Overall**: S — Damage และ Survivability เป็น S ใหม่ทั้งคู่ บวก Control กระโดด +3 และขยับตามอีก 2 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Aura of Hate (lv7, บวก Cha mod เข้าดาเมจเมลี passive ตลอดเวลา) + Dread Lord (lv20, psychic dmg ต่อเนื่อง + bonus action โจมตีเงา) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Control Undead (CD, ครอบงำ undead 24 ชม.) + Dreadful Aspect (CD, AoE Frightened) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | Aura of Hate ให้ผลกับ fiend/undead ที่อยู่ใกล้ ไม่ใช่ ally มีชีวิต = เท่า baseline |
| **Survivability** | 9/10 (S) | Supernatural Resistance (lv15, resist B/P/S จากอาวุธไม่วิเศษ) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Dread Lord ให้โจมตีเพิ่มผ่าน bonus action ทุกเทิร์นระหว่างฤทธิ์ [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Control Undead (ครอบงำ undead ได้นานถึง 24 ชม. เป็น pet/utility เฉพาะทาง) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Paladin-วายร้ายที่ผสม control(undead+fear)/damage ครบเครื่อง [M:2/4] [R:2/3] [B:3/3] |
