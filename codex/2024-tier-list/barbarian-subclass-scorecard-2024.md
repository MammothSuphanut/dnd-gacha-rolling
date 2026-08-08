# Barbarian — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 21 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Barbarian](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 21 ตัว

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

**Class Baseline อ้างอิง**: Damage 6, Control 3, Support 0, Survivability 8, Action Economy 6, Utility 3, Versatility 3

ไม่มี subclass ตัวไหนมี prerequisite/กลไก explicit ที่ตัด baseline capability ออก (Battlerager's "Dwarves Only" เป็นข้อจำกัดเชื้อชาติที่ DM ยกเลิกได้ ไม่ใช่การตัดความสามารถออกจาก axis ใดๆ) — ทุกแกนจึงต้อง ≥ baseline เสมอ

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Path of Heavy Metal | B | VSS 🕰️ | 8 (A) | 5 (B) | 0 (D) | 8 (A) | 7 (A) | 4 (C) | 3 (C) |
| Path of the Ancestral Guardian | S | XGE 🕰️ | 7 (A) | 5 (B) | 8 (A) | 8 (A) | 7 (A) | 5 (B) | 3 (C) |
| Path of the Battlerager | B | SCAG 🕰️ | 7 (A) | 3 (C) | 0 (D) | 9 (S) | 7 (A) | 3 (C) | 3 (C) |
| Path of the Beast | S | TCE 🕰️ | 8 (A) | 6 (B) | 6 (B) | 9 (S) | 7 (A) | 5 (B) | 6 (B) |
| Path of the Berserker | S | XPHB | 9 (S) | 6 (B) | 0 (D) | 9 (S) | 8 (A) | 3 (C) | 3 (C) |
| Path of the Carrion Raven | S | GrimHollowPlayerPack 🕰️ | 9 (S) | 7 (A) | 5 (B) | 10 (S) | 7 (A) | 8 (A) | 9 (S) |
| Path of the Colossus | B | VSS 🕰️ | 8 (A) | 3 (C) | 4 (C) | 8 (A) | 7 (A) | 3 (C) | 4 (C) |
| Path of the Fin | A | VSS 🕰️ | 7 (A) | 6 (B) | 0 (D) | 8 (A) | 7 (A) | 5 (B) | 4 (C) |
| Path of the Muscle Wizard | S | VSS 🕰️ | 9 (S) | 5 (B) | 0 (D) | 9 (S) | 8 (A) | 4 (C) | 5 (B) |
| Path of the Rage Mage | A | VSS 🕰️ | 8 (A) | 6 (B) | 0 (D) | 8 (A) | 6 (B) | 6 (B) | 8 (A) |
| Path of the Storm Herald | S | XGE 🕰️ | 7 (A) | 5 (B) | 6 (B) | 9 (S) | 7 (A) | 5 (B) | 7 (A) |
| Path of the Totem Warrior | A | PHB 🕰️ | 6 (B) | 5 (B) | 5 (B) | 10 (S) | 7 (A) | 5 (B) | 6 (B) |
| Path of the Wild Heart | S | XPHB | 6 (B) | 5 (B) | 6 (B) | 10 (S) | 7 (A) | 6 (B) | 9 (S) |
| Path of the World Tree | S | XPHB | 6 (B) | 8 (A) | 8 (A) | 9 (S) | 7 (A) | 6 (B) | 8 (A) |
| Path of the Wrathful Dead | S | GrimHollowPG24 | 8 (A) | 7 (A) | 5 (B) | 9 (S) | 7 (A) | 7 (A) | 7 (A) |
| Path of the Zealot | S | XPHB | 8 (A) | 3 (C) | 9 (S) | 10 (S) | 8 (A) | 4 (C) | 8 (A) |
| Path of Tranquility | A | VSS 🕰️ | 6 (B) | 6 (B) | 5 (B) | 9 (S) | 7 (A) | 6 (B) | 6 (B) |
| Path of Wild Magic | A | TCE 🕰️ | 7 (A) | 5 (B) | 5 (B) | 9 (S) | 7 (A) | 5 (B) | 6 (B) |
| Path of the Fractured | A | GrimHollowPG24 | 7 (A) | 5 (B) | 3 (C) | 10 (S) | 7 (A) | 4 (C) | 6 (B) |
| Path of the Giant | A | BGG 🕰️ | 8 (A) | 6 (B) | 3 (C) | 8 (A) | 7 (A) | 4 (C) | 7 (A) |
| Path of the Primal Spirit | B | GrimHollowPG24 | 7 (A) | 3 (C) | 2 (D) | 8 (A) | 7 (A) | 6 (B) | 7 (A) |

---

### Path of Heavy Metal (VSS 🕰️)

**Overall**: B — ขยับกลางๆ 4 axis (Damage/Control/AE/Utility) Support ยังเป็น 0 เต็ม ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Solo Shredding เพิ่ม Rage damage bonus +1 ทุกครั้งที่ตีโดน (สะสมได้สูงสุด 2×PB) ตราบใดที่ยังถือ instrument weapon และไม่พลาด บวก Smash Hit (lv14) นัดเดียว 4d12 นอกเหนือดาเมจปกติ [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Killer Vocals (lv6) bonus action ผลัก 5ft + deafen ทุกตัวในระยะ 5ft รอบตัว ใช้ซ้ำได้ทุกเทิร์นตราบใด rage ยัง active — deafen ยังตัด verbal component ของศัตรูที่ใช้เวทย์ได้ด้วย [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลยแม้แต่ตัวเดียว = เท่า baseline |
| **Survivability** | 8/10 (A) | ไม่มี feature เพิ่มด้าน survivability โดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Solo Shredding เพิ่มดาเมจแบบ passive ไม่กิน action เพิ่ม บวก Killer Vocals เป็น bonus action มูลค่าสูง (push+deafen AoE) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | proficiency เครื่องดนตรี 3 ชนิด + Up To Eleven (lv10, treat d20≤10 เป็น 11 กับ Cha check/instrument check) — ประโยชน์นอกคอมแบตแคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 3/10 (C) | ผูกกับ instrument weapon สองมือชนิดเดียวตลอด ไม่มี feature ขยาย role หรือ damage type ใหม่ = เท่า baseline [M:1/4] [R:1/3] [B:1/3] |

### Path of the Ancestral Guardian (XGE 🕰️)

**Overall**: S — Support กระโดดจาก 0 (D) เป็น 8 (A) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงมาก บวกขยับตามอีก 4 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Vengeful Ancestors (lv14) สะท้อนดาเมจที่ Spirit Shield กันได้กลับไปเป็น force damage ใส่ผู้โจมตี เป็นดาเมจทางอ้อมที่ผูกกับการใช้ reaction ป้องกันทีม [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Ancestral Protectors (lv3) ให้เป้าที่โดนตีครั้งแรกในเทิร์นมี disadvantage บนทุก attack roll ที่ไม่ใช่ใส่คุณ (soft taunt) ทำงานอัตโนมัติทุกครั้งที่ rage active ไม่ต้องเสีย action เพิ่ม [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 8/10 (A) | Spirit Shield (lv6) reaction ลดดาเมจที่เพื่อนในระยะ 30ft ได้รับ 2d6→4d6 ทุกเทิร์น + Ancestral Protectors ให้เป้าที่ถูกคาถา "แพร่" resistance ดาเมจให้เพื่อนที่โดนเป้านั้นตีต่อ — เป็น subclass tank/protector ที่แข็งแรงมาก [M:3/4] [R:3/3] [B:2/3] |
| **Survivability** | 8/10 (A) | ทุก feature เน้นป้องกันเพื่อน ไม่มีการเพิ่ม HP/AC/resistance ให้ตัวเองโดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Spirit Shield เป็น reaction (ไม่เสีย turn) + Ancestral Protectors ทำงาน passive จากการโจมตีปกติ [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Consult the Spirits (lv10) free-cast augury หรือ clairvoyance 1 ครั้ง/short rest ไม่เสีย slot — divination utility ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 3/10 (C) | เป็น dedicated protector/tank role เดียวตลอด ไม่มี feature ขยาย role อื่น = เท่า baseline [M:1/4] [R:1/3] [B:1/3] |

### Path of the Battlerager (SCAG 🕰️)

**Overall**: B — Survivability เป็น S ใหม่ แต่ breadth แคบมาก Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Battlerager Armor ให้โจมตี spike เพิ่มด้วย bonus action (1d4) + dmg แถมตอน grapple สำเร็จ (3) บวก Spiked Retribution (lv14, 3 piercing ตอบโต้ทุกครั้งที่โดนตีประชิด) — ต้องพึ่ง spiked armor ตลอด [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม = เท่า baseline |
| **Survivability** | 9/10 (S) | Reckless Abandon (lv6) ให้ temp HP = Con mod ทุกครั้งที่ใช้ Reckless Attack (แทบทุกเทิร์น) บวก Spiked Retribution กันคนมาตีประชิดทางอ้อม — แหล่ง temp HP ที่ reliable สูงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Battlerager Charge (lv10) ให้ Dash เป็น bonus action ตอน raging บวก spike attack เองก็เป็น bonus action มูลค่าสูง [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 3/10 (C) | ผูกกับ spiked armor ตลอดทั้ง build ไม่ขยาย role = เท่า baseline |

### Path of the Beast (TCE 🕰️)

**Overall**: S — Support กระโดดจาก 0 เป็น 6 (D→B) บวก Survivability เป็น S ใหม่ และขยับขึ้นครบ 6 ใน 7 axis กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | natural weapon (bite/claw/tail) overcome resistance ดาเมจกายภาพแบบไม่ใช้เวทย์ตั้งแต่ lv6 บวก Infectious Fury (lv10, 2d12 psychic) และ Call the Hunt (lv14, ให้เพื่อนที่ร่วม hunt ได้ d6 damage bonus ทุกครั้งที่ตี) — ดาเมจซ้อนทั้งของตัวเองและทีม [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Infectious Fury บังคับ Wisdom save ไม่งั้นเป้าต้องใช้ reaction โจมตีพวกเดียวกันเอง (PB ครั้ง/วัน) — hard-CC ทางอ้อมที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | Call the Hunt ให้ temp HP (5/ตัว) และ damage-bonus d6 ต่อการโจมตีแก่พวกพ้องที่เลือกร่วม hunt (Con mod คน, PB ครั้ง/วัน) — support ทั้งเชิงป้องกันและเชิงดาเมจ [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Bestial Soul (lv6) ให้เลือก swim/climb/enhanced-jump ทุก short/long rest บวก temp HP ของตัวเองจาก Call the Hunt — เพิ่ม adaptability และ buffer เหนือ baseline ชัดเจน [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | natural weapon ใช้ฟรีตอน rage (ไม่เสีย action สร้าง), Infectious Fury/Call the Hunt trigger จากการตีปกติไม่เสีย action เพิ่ม [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Bestial Soul ให้ breathe underwater/climb ceiling/extend jump แบบเลือกได้ทุก short rest — utility นอกคอมแบตที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | เลือกอาวุธธรรมชาติ (bite/claw/tail) ใหม่ได้ทุกครั้งที่ rage + เลือก adaptation ใหม่ได้ทุก short rest — ปรับตัวเข้าสถานการณ์ได้กว้างกว่า baseline [M:2/4] [R:2/3] [B:2/3] |

### Path of the Berserker (XPHB)

**Overall**: S — Damage และ Survivability เป็น S ใหม่ทั้งคู่ แม้ Support จะยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Frenzy เพิ่มดาเมจ d6 จำนวนเท่า Rage Damage bonus (2-4 ลูก) ให้เป้าแรกที่โดน Reckless Attack ทุกเทิร์น บวก Retaliation (lv10) เป็นการโจมตีฟรีเพิ่มทุกครั้งที่โดนตีประชิด — magnitude สูงและ reliable มาก [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Intimidating Presence (lv14) bonus action AoE 30ft บังคับ Wisdom save ไม่งั้นติด Frightened 1 นาที (save ทุกจบเทิร์น) — hard-CC เต็มรูปแบบที่คืนใช้ได้ด้วยการเสีย Rage 1 ครั้ง [M:3/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม = เท่า baseline |
| **Survivability** | 9/10 (S) | Mindless Rage (lv6) ให้ immune Charmed+Frightened ตลอดที่ rage active (ยกเลิกสภาวะทันทีถ้าติดอยู่ตอนเข้า rage) — กัน debuff สำคัญสองอย่างที่ resistance ปกติของ Rage กันไม่ได้ [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Retaliation เป็น reaction attack ฟรีทุกครั้งที่โดนตีประชิด ไม่เสีย resource ใดๆ [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility feature นอกคอมแบต = เท่า baseline |
| **Versatility** | 3/10 (C) | เป็น damage/tank ล้วนแบบเดียวตลอด ไม่ขยาย role = เท่า baseline |

### Path of the Carrion Raven (GrimHollowPlayerPack 🕰️)

**Overall**: S — 3 axis เป็น S ใหม่พร้อมกัน (Damage, Survivability 10/10 เต็ม, Versatility กระโดด +6) ขยับขึ้นครบทั้ง 7 axis จาก baseline ไม่เหลือแกนไหนนิ่งเลย — แรงและกว้างที่สุดในคลาสทั้งหมด


> **หมายเหตุข้อมูล**: ระบบ Martial Maneuvers มีตัวเลือกทั้งหมด 16 แบบ (รู้ 3 ตัวตอน lv3 → 6 ตัวตอน lv14) ให้คะแนนจากภาพรวมของ pool ทั้งหมดที่ยืนยันได้ในไฟล์ ไม่ใช่ build เดียว — magnitude/breadth จึงสูงเพราะเลือกได้จากคลังกว้างมาก แม้แต่ละตัวละครจะรู้พร้อมกันแค่บางส่วน

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | คลัง maneuver มีตัวดาเมจหนักหลายตัว: Apex Dominance (6d10 force + execute ที่ 0 HP, 5 แต้ม), Carrion Feast (5d6 necrotic + temp HP เท่าดาเมจที่ทำ, 4 แต้ม), Tusks of the Rampaging Mammoth (3d12 + ผลัก, 3 แต้ม) — magnitude สูงสุดในกลุ่ม barbarian subclass ที่ทำมา แต่จำกัดด้วย maneuver point pool/เทิร์น [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Predator's Howl (AoE frighten 2 เป้า + dmg ต่อเนื่อง), Trampling Bull (บังคับ Str save ล้ม prone เป็นแนว), Pack Leader (reaction ยึด advantage ให้ตัวเอง) — hard-CC จริงหลายรูปแบบ [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 5/10 (B) | Pack Leader ให้ advantage แก่การโจมตีของ ally ที่ trigger ด้วยกัน + Call of the Beast Lord เรียกสัตว์เพื่อนพันธมิตรมาช่วยรบ (CR ≤ level) — support ทางอ้อมผ่าน combo/summon [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 10/10 (S) | Woolly Beast's Hide (reaction ลดดาเมจ+temp HP), Axolotl's Regeneration (bonus action ฮีล 1d12+Con), Hibernating Bear Recuperation (นอนฟื้น HP เต็ม+ล้าง exhaustion เหมือน short rest ฟรี) — คลัง self-sustain ที่ครบเครื่องที่สุดในกลุ่มที่ทำมา ซ้อนทับ baseline 8 ที่สูงอยู่แล้ว [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Feral Celerity ให้โจมตีฟรีตอนเข้า rage + maneuver ส่วนใหญ่ใช้ bonus action/reaction ไม่แย่ง action หลัก [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Bestial Transformation (polymorph ตัวเองฟรี), Falcon's Glide (fly speed ชั่วคราว), Snout of the Bloodhound (tracking+initiative+ไม่เสีย adv ใส่ invisible), Raven's Spirit (ritual speak with animals) — breadth utility กว้างมาก [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | เลือก 3→6 maneuver จาก 16 แบบที่ครอบคลุมดาเมจ/control/heal/mobility/utility พร้อมสลับเมื่อเรียนใหม่แต่ละ tier — เทียบเท่า Battle Master สำหรับ barbarian [M:3/4] [R:3/3] [B:3/3] |

### Path of the Colossus (VSS 🕰️)

**Overall**: B — ขยับกลางๆ 3 axis (Damage/Support/Versatility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Larger Than Life ให้อาวุธ +1d4 ดาเมจตลอด rage + action พิเศษตีทุกตัวในแนว 15ft (roll แยกแต่ละเป้า) บวก Boulder Throw (2d8 ระยะไกล) — burst damage สูงจาก line attack [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ (reach ไม่ใช่ control) = เท่า baseline |
| **Support** | 4/10 (C) | Imposing Presence (lv6) ให้เพื่อนที่ยืนหลังคุณได้ 3/4 cover (total cover ตอน raging) จากการโจมตีระยะไกล — support เชิงป้องกันทางอ้อม [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 8/10 (A) | ไม่มี resistance/HP/AC เพิ่มให้ตัวเองโดยตรง (การขยายขนาดไม่ใช่ defense) = เท่า baseline |
| **Action Economy** | 7/10 (A) | Line attack ใช้ action ปกติแต่ตีได้หลายเป้าในครั้งเดียว = ประสิทธิภาพต่อ action สูงขึ้น [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 4/10 (C) | Boulder Throw เพิ่มตัวเลือกโจมตีระยะไกลให้ build ที่ปกติเป็นเมลีล้วน [M:2/4] [R:1/3] [B:1/3] |

### Path of the Fin (VSS 🕰️)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ขยับขึ้น 4 axis กลางๆ พร้อมกัน Support ยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Feeding Frenzy ให้ bonus action bite attack (1d8→1d10+Str) ทุกครั้งที่ตีเป้าประชิดสำเร็จ (Con mod ครั้ง/วัน, advantage ถ้าเป้าเลือดต่ำกว่าครึ่ง) — extra attack source ที่ reliable [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Mako (lv10) บังคับ Dex save ล้ม prone/grapple ทุกครั้งที่กัดโดน (disadvantage ถ้าอยู่ในน้ำ) + Tsunami (lv14) บังคับสัตว์ในคลื่นต้องว่ายน้ำ/กลั้นหายใจ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม = เท่า baseline |
| **Survivability** | 8/10 (A) | Aquatic ให้ breathe water+swim speed และ rage ไม่จบก่อนเวลาเมื่ออยู่ในน้ำ — ประโยชน์จำกัดเฉพาะสภาพแวดล้อมทางน้ำเท่านั้น ไม่ใช่ defense ทั่วไป = เท่า baseline |
| **Action Economy** | 7/10 (A) | Feeding Frenzy เป็น bonus action attack ฟรีที่ trigger จากการตีปกติ [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Blood Sense (advantage tracking-by-smell + ระบุกลิ่นสิ่งมีชีวิตในระยะ 100ft/1 ไมล์ในน้ำ) + Aquatic traversal — utility เฉพาะทางที่กว้างพอสมควร [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 4/10 (C) | เพิ่ม breadth ด้านสิ่งแวดล้อมทางน้ำที่ class อื่นส่วนใหญ่ไม่มี แต่ธีมยังแคบมาก (เน้นน้ำ+กัด) [M:2/4] [R:1/3] [B:1/3] |

### Path of the Muscle Wizard (VSS 🕰️)

**Overall**: S — Damage และ Survivability เป็น S ใหม่ทั้งคู่ บวกขยับตามอีก 2 axis แม้ Support จะยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | True Strike (+1d8 บน hit), "Burning Hands" (AoE unarmed 1d8+Str ทุกตัวในระยะเอื้อม), "Magic Missile" (bonus action ranged attack แบบ advantage), และ I Cast Fist (lv14, advantage melee 8d8+Str นัดเดียว/rage) — คลังดาเมจซ้อนกันได้หลายทาง [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | Shocking Grasp (bonus action) ทำให้เป้าที่โดนตีใช้ reaction ไม่ได้จนถึงเทิร์นถัดไป — กัน opportunity attack/reaction spell ของศัตรู [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม = เท่า baseline |
| **Survivability** | 9/10 (S) | "Shield" (reaction, +AC ชั่วคราว + ลดดาเมจ 1d12+Con) + Magic Resistance (lv10, resistance ดาเมจจากเวทย์ตอน raging) — กันทั้งดาเมจกายภาพและเวทย์ [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | "cantrip"/"spell" ส่วนใหญ่แนบมากับ bonus action บนการโจมตีที่ทำอยู่แล้ว ไม่เสีย action แยก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Unarguable Wizardry ให้ advantage Intimidation เพื่ออ้างว่าเป็นพ่อมด — ประโยชน์แคบเชิง social/flavor [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | เลือกได้ระหว่าง shove-prone/deny-reaction/extra-damage บนแต่ละ hit + "Magic Missile" เพิ่มตัวเลือกระยะไกลให้ build เมลี [M:2/4] [R:2/3] [B:1/3] |

### Path of the Rage Mage (VSS 🕰️)

**Overall**: A — Versatility กระโดด +5 (C→A) บวกขยับขึ้นอีก 3 axis กลางๆ ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ได้ spell slot จริง (sorcerer list, เน้น evocation/transmutation) ใช้ได้เฉพาะตอน raging บวก Eldritch Explosions (lv14, ตีโดน→เสีย slot สร้าง AoE 2d6/ระดับ slot) — ดาเมจซ้อนจากทั้งอาวุธและเวทย์ [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | เข้าถึง sorcerer spell list เต็มรูปแบบ (เลือกได้อิสระที่ lv8/14/20) ทำให้หยิบ control spell อย่าง Hold Person/Slow ได้จริง แม้ core picks จะเอียงไปทาง evocation/transmutation [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature/spell ที่ยืนยันได้ว่าเสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 8/10 (A) | Supernatural Exploits (darkvision/feather fall/see invisibility ฟรี) เป็น utility/awareness มากกว่า defense ตรงตัว ไม่มี resistance/HP เพิ่ม = เท่า baseline |
| **Action Economy** | 6/10 (B) | Arcane Rampage ให้ cast spell แทนการโจมตีหนึ่งครั้งตอน Reckless Attack — สลับ action ไม่ได้เพิ่ม action = เท่า baseline |
| **Utility** | 6/10 (B) | Supernatural Exploits (darkvision, feather fall, jump, see invisibility แบบ at-will เฉพาะตัวเอง) เป็นคลัง utility spell ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | เป็นระบบ spellcasting เต็มรูปแบบต่อกิ่งเข้ากับ chassis มาร์เชียล เปลี่ยนบทบาทจาก striker ล้วนเป็น striker/blaster ผสม เทียบเคียง Dynamo Engineer ของ Alchemist [M:3/4] [R:2/3] [B:3/3] |

### Path of the Storm Herald (XGE 🕰️)

**Overall**: S — Support กระโดดจาก 0 เป็น 6 (D→B) บวก Survivability เป็น S ใหม่ และขยับขึ้นครบ 6 ใน 7 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Desert/Sea aura activate ได้ทุกเทิร์นด้วย bonus action ให้ดาเมจ AoE/single-target ที่ขยับสเกล (2→6 dmg ตามระดับ) — เป็นแหล่งดาเมจ recurring ที่ reliable แต่ magnitude ต่ำต่อครั้ง [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Raging Storm (lv14) ให้ Tundra ลด speed เป้าเหลือ 0 หรือ Sea ล้ม prone เมื่อโจมตีโดน — ผูกกับ element ที่เลือกไว้ [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 6/10 (B) | Tundra aura ให้ temp HP เพื่อนที่เลือกทุกเทิร์น (2→6 ตามระดับ) + Shielding Storm (lv10) แจก elemental resistance ของตัวเองให้เพื่อนที่อยู่ในออร่า [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Storm Soul (lv6) ให้ resistance ธาตุที่เลือก (fire/lightning/cold) แบบ**ถาวรแม้ไม่ raging** + กันสภาพอากาศสุดขั้ว — กว้างกว่า resistance BPS-only ของ baseline ที่ผูกกับ rage เท่านั้น [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Storm Aura activate ด้วย bonus action ทุกเทิร์นได้ผล AoE ต่อเนื่อง [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Storm Soul ให้ action พิเศษตามธาตุ (จุดไฟวัตถุไวไฟ / แช่แข็งน้ำ 5ft cube / swim speed+breathe underwater) — utility นอกคอมแบตที่เลือกได้ตามธาตุ [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | เลือกธาตุ (Desert/Sea/Tundra) ได้ใหม่ทุกครั้งที่เลเวลอัพ แต่ละธาตุให้บทบาทต่างกัน (damage/control/support) — ปรับ role ได้กว้าง [M:2/4] [R:3/3] [B:2/3] |

### Path of the Totem Warrior (PHB 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ บวก Support ขยับบางส่วน (0→5) และขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ทั้ง Bear/Eagle/Wolf ไม่มีตัวไหนเพิ่มดาเมจให้ตัวเองโดยตรง = เท่า baseline |
| **Control** | 5/10 (B) | Totemic Attunement–Wolf (lv14) ให้ล้ม prone ด้วย bonus action ทุกครั้งที่ตีโดนเป้า Large หรือเล็กกว่า — ผูกกับการเลือก totem [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 5/10 (B) | Totem Spirit–Wolf (lv3) ให้เพื่อนมี advantage โจมตีเมลีใส่ศัตรูที่อยู่ติดตัวคุณตลอดที่ raging — party-wide advantage aura ที่แข็งแรง แม้ต้องเลือก Wolf [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 10/10 (S) | Totem Spirit–Bear ให้ resistance **ทุกชนิดดาเมจยกเว้น psychic** ตลอด rage (กว้างกว่า BPS-only ของ baseline มาก) บวก Eagle ให้ dash ฟรี+ไม่โดน disadvantage opportunity attack เพื่อหนี [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Eagle totem ให้ Dash เป็น bonus action ตอน raging + lv14 ได้ fly speed ระยะสั้น [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Spirit Seeker (ritual beast sense/speak with animals) + Spirit Walker (lv10, ritual commune with nature) — divination/scouting utility ที่กว้าง [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | เลือก/เลือกใหม่ totem (Bear tank / Eagle mobility / Wolf support) ได้ 3 ครั้งตลอด career (lv3/6/14) — ปรับ role ได้แต่ความถี่จำกัดกว่า subclass สมัยใหม่ [M:2/4] [R:2/3] [B:2/3] |

### Path of the Wild Heart (XPHB)

**Overall**: S — Survivability และ Versatility เป็น S ใหม่ทั้งคู่ (Versatility กระโดด +6) บวก Support ขยับบางส่วน และขยับตามอีก 2 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ทั้ง Bear/Eagle/Wolf/Owl/Panther/Salmon/Falcon/Lion/Ram ไม่มีตัวไหนเพิ่มดาเมจให้ตัวเองโดยตรง = เท่า baseline |
| **Control** | 5/10 (B) | Power of the Wilds–Ram (lv14) ล้ม prone บน hit + Lion ให้ศัตรูติดตัวมี disadvantage โจมตีเป้าอื่น — ผูกกับตัวเลือกที่สุ่มใหม่ได้ทุกครั้งที่ rage [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 6/10 (B) | Rage of the Wilds–Wolf ให้เพื่อน advantage โจมตีศัตรูที่ติดตัวคุณ **เลือกใหม่ได้ทุกครั้งที่เข้า rage** (ยืดหยุ่นกว่า Totem Warrior ที่ fix ตาม tier) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 10/10 (S) | Rage of the Wilds–Bear ให้ resistance ทุกชนิดดาเมจยกเว้น Force/Necrotic/Psychic/Radiant (กว้างกว่า BPS-only ของ baseline) เลือกใหม่ได้ทุก rage บวก Aspect–Owl/Salmon เพิ่ม darkvision/swim [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Eagle option ให้ Disengage+Dash เป็นส่วนหนึ่งของ bonus action เข้า rage และทำซ้ำได้ทุกเทิร์นตอน raging [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Aspect of the Wilds (Owl darkvision/Panther climb/Salmon swim สลับได้ทุก long rest) + Animal Speaker/Nature Speaker ritual — utility ที่ปรับแต่งได้บ่อยกว่า Totem Warrior [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 9/10 (S) | เลือกใหม่ได้ทุก rage (Bear/Eagle/Wolf) + ทุก long rest (Owl/Panther/Salmon) + ทุก rage อีกครั้งที่ lv14 (Falcon/Lion/Ram) — reconfigurability สูงสุดในกลุ่ม totem-style subclass ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |

### Path of the World Tree (XPHB)

**Overall**: S — Support กระโดดจาก 0 เป็น 8 (D→A) บวก Survivability เป็น S ใหม่ และ Control/Versatility กระโดด +5 ทั้งคู่ — กว้างและแรงพร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Battering Roots (lv10) ให้ proc mastery property Push/Topple เพิ่มได้อีกหนึ่งอย่างนอกเหนือของอาวุธเอง แต่เป็น synergy ทางอ้อม ไม่ใช่แหล่งดาเมจใหม่โดยตรง = เท่า baseline |
| **Control** | 8/10 (A) | Branches of the Tree (lv6) reaction บังคับ Str save ไม่งั้นถูกเทเลพอร์ตออกจากตำแหน่งและ speed เหลือ 0 จนจบเทิร์น — hard-CC ระยะไกล (30ft) ที่ใช้ซ้ำได้ทุกเทิร์นที่มีเป้าเข้าเงื่อนไข [M:3/4] [R:3/3] [B:2/3] |
| **Support** | 8/10 (A) | Life-Giving Force ให้ temp HP เพื่อน 1 คนทุกเทิร์นที่ raging (d6 เท่า Rage Damage bonus) + Travel Along the Tree (lv14) เทเลพอร์ตพวกพ้องได้ถึง 6 คนไกล 150ft — support ทั้งเชิงฮีลและเชิง utility-เคลื่อนที่ [M:3/4] [R:3/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Vitality Surge ให้ temp HP = barbarian level ทุกครั้งที่เข้า rage แบบ guaranteed ไม่ต้องสุ่ม/เลือก [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Travel Along the Tree เป็น bonus action teleport + Branches of the Tree เป็น reaction — ทั้งคู่ไม่แย่ง action หลัก [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Travel Along the Tree ระยะไกลสุด 150ft พาทีมข้ามสิ่งกีดขวาง/หนี/reposition ได้ทั้งในและนอกคอมแบต [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | ทำหน้าที่พร้อมกันได้ทั้ง self-tank (temp HP), healer (temp HP เพื่อน), controller (forced teleport), และ party-mover (group teleport) — multi-role สูง [M:3/4] [R:2/3] [B:3/3] |

### Path of the Wrathful Dead (GrimHollowPG24)

**Overall**: S — Support ขยับบางส่วน (0→5) บวก Survivability เป็น S ใหม่ และขยับขึ้นครบทั้ง 6 axis ที่เหลือ (นอกจาก Damage) กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Dark Doom Revisited (1 ครั้ง/rage) เลือก AoE persistent damage (poison/cold/fire, d6 เท่า Rage Damage bonus) ใส่ทุกตัวในออร่าทุกเทิร์น บวก Hate option (lv14) ให้ crit range 19-20 [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Dark Doom Revisited (Hypothermia ลด speed ครึ่ง) + Jealousy (disadvantage การดิ้นหลุด grapple) + Terror (lv14, ลด speed ครึ่ง+ให้ opportunity attack advantage ใส่เป้า) — คลัง control หลากหลายแม้ต้องเลือกทีละ emotion [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 5/10 (B) | Death Is but a Door (lv10) free-cast Cure Wounds/Raise Dead/Revivify ไม่ต้องใช้ material component (แลกด้วย exhaustion ของตัวเอง) — ฮีล/ชุบชีวิตเพื่อนได้จริงแม้มีต้นทุนสูง [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 9/10 (S) | Shadow Form/Shadowy Sidestep (ตลอด rage: เดินทะลุศัตรู+ไม่โดน difficult terrain, +10ft speed, opportunity attack ใส่ตัวเองมี disadvantage) + Death Is but a Door (advantage death save, ต้องพลาด 4 ครั้งแทน 3) — หนี+รอดตายได้ดีขึ้นมาก [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Rage of the Dead เป็น passive ตลอด rage ไม่เสีย action, Dark Doom Revisited เสีย action ปีละครั้ง/rage แลกกับ AoE ต่อเนื่องหลายเทิร์น [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | Spectral Sight เห็น invisible+มองเข้า Ethereal Plane ระยะ 120ft ตลอด rage (anti-ambush ชั้นดี) + free-cast Raise Dead/Revivify แม้มีต้นทุน exhaustion [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 7/10 (A) | เลือก emotion ได้ 3 แบบ (Hate=aggressive re-attack, Jealousy=grapple-control, Terror=hit-and-run) สลับได้ทุก long rest บวกความสามารถฮีล/ชุบชีวิต [M:2/4] [R:3/3] [B:2/3] |

### Path of the Zealot (XPHB)

**Overall**: S — Support กระโดดจาก 0 เป็น 9 (D→S เต็มสเกล) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงที่สุดในคลาส บวก Survivability เป็น S ใหม่ด้วย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Divine Fury เพิ่มดาเมจ 1d6+ครึ่งเลเวลให้เป้าแรกที่ตีทุกเทิร์นที่ raging แบบ guaranteed ไม่ต้องสุ่ม/เลือก [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature — Divine Fury/Warrior of the Gods/Zealous Presence ล้วนเป็นดาเมจ/ฮีล/บัฟ = เท่า baseline |
| **Support** | 9/10 (S) | Zealous Presence (lv10) bonus action ให้ **เพื่อนสูงสุด 10 คน** advantage ทั้ง attack roll และ saving throw จนถึงเทิร์นถัดไป (คืนใช้ได้ด้วยการเสีย Rage 1 ครั้ง) + Rage of the Gods (lv14) reaction ช่วยเพื่อนที่กำลังจะ 0 HP ให้ฟื้นเป็น HP เท่า barbarian level แทน — support ระดับ mass-buff/emergency-rez [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 10/10 (S) | Warrior of the Gods ให้ pool ฮีลตัวเอง 4d12→7d12 ด้วย bonus action (ฟื้นเต็มทุก long rest) + Rage of the Gods ให้ resistance necrotic/psychic/radiant และ fly speed 1 นาที/long rest — ครบทั้งฮีลตัวเองและ resistance เพิ่ม [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Warrior of the Gods ฮีลด้วย bonus action, Zealous Presence บัฟทีม 10 คนด้วย bonus action เดียว, Fanatical Focus reroll save ฟรีไม่เสีย action — คุ้มค่า action สูงมาก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Rage of the Gods ให้ fly speed 1 นาที/long rest — utility จำกัดเฉพาะช่วงสั้นๆ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | ทำหน้าที่ได้ทั้ง damage-dealer, self-healer, party-wide buffer, และ emergency-reviver พร้อมกันใน subclass เดียว [M:3/4] [R:2/3] [B:3/3] |

### Path of Tranquility (VSS 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ บวก Support ขยับบางส่วน (0→5) และขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Anticipate/Battle Trance (lv6) ให้ reaction attack สูงสุด 2 ครั้งเมื่อไม่ได้โจมตีในเทิร์นตัวเอง (เช่นใช้ Dodge) — เป็นดาเมจทางอ้อมที่มีเงื่อนไขแลก (ต้องไม่โจมตี) จึง magnitude ปานกลาง = ใกล้เท่า baseline [M:3/4] [R:2/3] [B:1/3] |
| **Control** | 6/10 (B) | free-cast calm emotions/enthrall/sanctuary (lv10, ครั้งละ/long rest) ใช้ได้แม้ตอน raging — calm emotions ระงับ charm/fear หรือทำให้ hostile หยุดโจมตีได้จริง [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 5/10 (B) | sanctuary ป้องกันเป้าหมายจากการถูกโจมตี + calm emotions ปลดปล่อยเพื่อนจาก charm/fear + enthrall เบี่ยงเบนความสนใจศัตรู — support เชิง utility-spell ที่ครบเครื่อง [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 9/10 (S) | Zen State (lv14) ให้ +2 AC ทุกครั้งที่โดนพลาด สะสมสูงสุด +6 (รีเซ็ตเมื่อโดนดาเมจ) — defensive scaling ที่แข็งแรงในไฟต์ยาว บวก Anticipate เป็น deterrence จากการโต้กลับ [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Battle Trance เปลี่ยนเทิร์นที่ "เสียเปล่า" (ไม่โจมตี) ให้กลายเป็น reaction attack 2 ครั้งเมื่อโดนตี — พลิก trade-off ให้กลายเป็นมูลค่า [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | calm emotions/enthrall/sanctuary ใช้แก้ปัญหา social/non-combat ได้จริง (สงบสถานการณ์, เบี่ยงเบนฝูงชน, ป้องกัน NPC) — utility ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | เล่นสวนทางกับ barbarian ทั่วไปทั้งหมด (reactive/defensive แทน aggressive) พร้อมมีคาถา social-utility สำรอง — เปลี่ยน playstyle ได้กว้าง [M:2/4] [R:2/3] [B:2/3] |

### Path of Wild Magic (TCE 🕰️)

**Overall**: A — Survivability เป็น S ใหม่ บวก Support ขยับบางส่วน (0→5) และขยับตามอีก 3 axis เหมือน Path of Tranquility


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | 4 จาก 8 ผลบน Wild Surge table ให้ดาเมจ (necrotic/force/radiant 1d6-1d12) และบางผล (2,3,5,8) ใช้ซ้ำได้ทุกเทิร์นด้วย bonus action จนกว่า rage จบ — magnitude ดีแต่สุ่มไม่ได้เลือก [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | ผล 8 (blind ซ้ำได้ทุกเทิร์น) และผล 7 (difficult terrain รัศมี 15ft) เป็น control จริง แต่ต้องสุ่มได้ก่อน [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 5/10 (B) | Bolstering Magic (lv6) เลือกให้เพื่อน 1 คน d3 บวก roll ทุกครั้งเป็นเวลา 10 นาที หรือคืน spell slot — เป็น support ที่**เลือกได้แน่นอน**ไม่ต้องพึ่งสุ่ม ต่างจาก Wild Surge [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 9/10 (S) | ผล 1 (temp HP ตัวเอง) + ผล 5 (สะท้อนดาเมจใส่ผู้โจมตี) + ผล 6 (+1 AC ตัวเอง+เพื่อนใกล้) + Unstable Backlash (lv10, reroll ได้เมื่อโดนดาเมจ/พลาด save) ลดความเสี่ยงจากผลแย่ [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | ผลส่วนใหญ่ที่ใช้ซ้ำได้ (2,3,5,8) ทำงานฟรีด้วย bonus action ต่อเนื่องทุกเทิร์นเมื่อสุ่มได้ [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Magic Awareness (action, ตรวจจับ spell/magic item ในระยะ 60ft พร้อมระบุ school, PB ครั้ง/วัน) — utility สืบสวน/ตรวจจับที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Bolstering Magic เลือกได้แน่นอน (buff หรือคืน slot) + Wild Surge สุ่มครอบคลุมทั้งดาเมจ/control/mobility/defense — breadth กว้างแม้ reliability ของ surge จะต่ำ [M:2/4] [R:2/3] [B:2/3] |

### Path of the Fractured (GrimHollowPG24)

**Overall**: A — Survivability เป็น S ใหม่ (10/10 เต็ม) บวกขยับขึ้นอีก 4 axis กลางๆ แต่ Support แก้ได้แค่บางส่วน (0→3, ยังเกรด C)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Face of Rage ให้ unarmed strike 1d8 force + Cunning and Brutal (lv10) ให้ crit range 19-20 บน unarmed strike ตอน raging — ยกระดับ unarmed build ให้แข่งกับอาวุธได้ [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Face of Rage บังคับ Con save ล้ม prone หรือผลัก 10ft ทุกครั้งที่ unarmed strike โดน — hard-CC ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 3/10 (C) | Cunning and Brutal ให้ Help action เป็น bonus action ตอนไม่ raging (ให้ advantage เพื่อน) — support แคบเพราะใช้ได้แค่นอก rage [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 10/10 (S) | Brains and Brawn ให้ resistance psychic ตอนไม่ raging **และ** resistance ทุกชนิดยกเว้น Force+Psychic ตอน raging — คลุมช่องโหว่ทั้งสองสถานะแทบตลอดเวลา บวก Better Half (lv14) กันตายด้วย temp HP ครึ่ง max [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Disengage/Help เป็น bonus action ฟรีตอนไม่ raging [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Mask of Civility ให้ skill + tool/language เพิ่ม 1 อย่าง — utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | มีสองบุคลิกที่ใช้งานต่างกันชัดเจน (civil/skilled นอก rage vs monstrous/damage ใน rage) — breadth ครอบคลุมทั้ง social และ combat pillar [M:2/4] [R:2/3] [B:2/3] |

### Path of the Giant (BGG 🕰️)

**Overall**: A — ไม่มี axis ไหนถึง S ใหม่ แต่ Versatility กระโดด +4 และขยับขึ้นอีก 4 axis พร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Crushing Throw บวก Rage Damage bonus เข้าดาเมจอาวุธขว้าง + Elemental Cleaver (+1d6→2d6 ธาตุที่เลือก พร้อม thrown 20/60ft คืนมือ) + Mighty Impel ใช้เหวี่ยงศัตรูไปโดนอันตราย (fall damage) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Mighty Impel (lv10) บังคับ Str save ย้ายเป้า Medium หรือเล็กกว่าไป 30ft (ล้ม prone ถ้าตกจากที่สูง) — forced-movement control ที่ใช้แยกศัตรูออกจากกลุ่มได้ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | Mighty Impel ใช้ย้าย**พันธมิตร**ได้เช่นกัน (พาเพื่อนออกจากอันตราย/ไปยังตำแหน่งได้เปรียบ) — support ทางอ้อมที่แคบเพราะแชร์ use กับโหมดโจมตี [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 8/10 (A) | Giant Stature ให้ reach+ขนาดใหญ่ขึ้น แต่ไม่ใช่ defense โดยตรง (ไม่มี resistance/HP/AC เพิ่ม) = เท่า baseline |
| **Action Economy** | 7/10 (A) | Mighty Impel เป็น bonus action ที่ให้ผล control/damage/support พร้อมกัน + สลับ element ของ Elemental Cleaver ก็เป็น bonus action [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Giant Power ให้ cantrip เลือกได้ (druidcraft/thaumaturgy) — utility เวทย์เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Elemental Cleaver สลับ damage type ได้ 5 ชนิด (acid/cold/fire/thunder/lightning) เพื่อเลี่ยง resistance ศัตรู + Crushing Throw เปิดตัวเลือกโจมตีระยะไกล [M:2/4] [R:3/3] [B:2/3] |

### Path of the Primal Spirit (GrimHollowPG24)

**Overall**: B — ขยับกลางๆ 3 axis (Damage/Utility/Versatility) Support แทบไม่ขยับ (0→2 ยังเกรด D)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | companion โจมตีได้ทุกเทิร์นผ่าน bonus action สั่ง หรือสละ 1 attack ของตัวเองสั่ง Beast's Strike — เพิ่มแหล่งดาเมจแต่ต้องแลกกับ action ของตัวเองในบางกรณี [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ตรงจาก chassis (ขึ้นกับสแตทบล็อกที่เลือก ซึ่งไม่ระบุในข้อมูลที่มี) = เท่า baseline |
| **Support** | 2/10 (D) | Kin to Beasts ให้ free-cast Animal Friendship (มีประโยชน์ต่อทีมทางอ้อมในบริบท nature-heavy) แต่ไม่ใช่ ally-support โดยตรง — เพิ่มขึ้นเล็กน้อยจาก baseline 0 [M:1/4] [R:1/3] [B:0/3] |
| **Survivability** | 8/10 (A) | Shared Rage ให้ resistance BPS แก่**companion** ไม่ใช่ตัวเอง และ Skinrider's Trance ทำให้ร่างตัวเองอยู่ในสภาวะ catatonic (เสี่ยงเพิ่มด้วยซ้ำ) — ไม่มีการเพิ่ม survivability ให้ตัวเองโดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | companion เป็นตัวละครที่สองที่ขยับ+ใช้ reaction เองได้ทุกเทิร์น สั่ง action พิเศษผ่าน bonus action เดียว [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Kin to Beasts (Animal Friendship+Speak with Animals ฟรี) + Skinrider's Trance (สิงร่างสัตว์เพื่อสอดแนม/ใช้ประสาทสัมผัสมัน) — utility สำรวจ/สอดแนมที่กว้าง [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | เลือกสแตทบล็อก (Guardian/Striker) + environment (Land/Sea/Sky) ได้ใหม่ทุก long rest หรือ bonus action ผ่าน Shape of the Wild — ปรับ companion เข้ากับสถานการณ์ได้กว้าง [M:2/4] [R:3/3] [B:2/3] |
