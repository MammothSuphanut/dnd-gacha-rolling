# Monk — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 21 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Monk](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 21 ตัว (รวม "Warrior of the Asura" homebrew ของโปรเจกต์)

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

**Class Baseline อ้างอิง**: Damage 7, Control 6, Support 0, Survivability 9, Action Economy 8, Utility 6, Versatility 5

**หมายเหตุที่มาข้อมูล**: "Warrior of X" (Mercy/Shadow/Elements/Open Hand) คือชื่อ 2024 official ของ subclass ที่เดิมชื่อ "Way of X" ใน PHB 2014 (Mercy/Shadow/Four Elements/Open Hand) — progress tracker แยกให้คะแนนทั้งสองเวอร์ชันเหมือนกรณี Banneret/Purple Dragon Knight ของ Fighter เพราะกลไก 2014 กับ 2024 ต่างกันจริง "Warrior of Pride/Regret/the Leaden Crown" มาจาก Grim Hollow 2024 และ "Warrior of the Street" มาจาก Valda's Spire Player Pack (ตรวจสอบแล้วว่าใช้ chassis 2024/`XPHB` จึงไม่ติด 🕰️) ส่วนที่เหลือเป็น 2014-only orphan จาก XGE/SCAG/TCE/FTD/VSS **Warrior of the Asura** เป็น homebrew ของโปรเจกต์เอง หมายเหตุข้อมูล: **Way of the Ascendant Dragon** และ **Way of the Four Elements** มีฟีเจอร์ย่อยบางส่วน (Draconic Disciple's Presence/Strike/Tongue, Aspect of the Wyrm's ตัวเลือก, Elemental Disciplines ทั้งหมด) ที่ไม่ปรากฏรายละเอียดเต็มในไฟล์ข้อมูล จึงให้คะแนนแบบระมัดระวังในแกนที่ไม่ยืนยันได้

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Warrior of Mercy | S | XPHB | 8 (A) | 7 (A) | 9 (S) | 9 (S) | 9 (S) | 7 (A) | 8 (A) |
| Warrior of Shadow | A | XPHB | 8 (A) | 6 (B) | 0 (D) | 10 (S) | 9 (S) | 8 (A) | 7 (A) |
| Warrior of the Elements | A | XPHB | 9 (S) | 7 (A) | 0 (D) | 9 (S) | 8 (A) | 8 (A) | 8 (A) |
| Warrior of the Open Hand | A | XPHB | 9 (S) | 8 (A) | 0 (D) | 9 (S) | 9 (S) | 6 (B) | 7 (A) |
| Warrior of Pride | B | GrimHollowPG24 | 9 (S) | 6 (B) | 0 (D) | 10 (S) | 8 (A) | 6 (B) | 6 (B) |
| Warrior of Regret | S | GrimHollowPG24 | 9 (S) | 7 (A) | 6 (B) | 9 (S) | 9 (S) | 6 (B) | 7 (A) |
| Warrior of the Leaden Crown | A | GrimHollowPG24 | 8 (A) | 9 (S) | 0 (D) | 9 (S) | 8 (A) | 8 (A) | 8 (A) |
| Warrior of the Street | A | ValdaPlayerPack | 9 (S) | 7 (A) | 0 (D) | 9 (S) | 9 (S) | 7 (A) | 7 (A) |
| Way of the Bow | A | VSS 🕰️ | 9 (S) | 7 (A) | 0 (D) | 9 (S) | 8 (A) | 7 (A) | 7 (A) |
| Way of the Flagellant | A | VSS 🕰️ | 9 (S) | 7 (A) | 0 (D) | 9 (S) | 9 (S) | 6 (B) | 6 (B) |
| Way of the Four Fists | A | VSS 🕰️ | 8 (A) | 6 (B) | 0 (D) | 10 (S) | 9 (S) | 8 (A) | 7 (A) |
| Way of the Mask | A | VSS 🕰️ | 8 (A) | 9 (S) | 0 (D) | 9 (S) | 8 (A) | 6 (B) | 7 (A) |
| Way of the Rose | S | VSS 🕰️ | 8 (A) | 7 (A) | 7 (A) | 9 (S) | 9 (S) | 6 (B) | 8 (A) |
| Way of the Ascendant Dragon | B | FTD 🕰️ | 8 (A) | 6 (B) | 0 (D) | 9 (S) | 8 (A) | 7 (A) | 7 (A) |
| Way of the Drunken Master | A | XGE 🕰️ | 9 (S) | 7 (A) | 0 (D) | 9 (S) | 9 (S) | 6 (B) | 7 (A) |
| Way of the Kensei | A | XGE 🕰️ | 9 (S) | 6 (B) | 0 (D) | 9 (S) | 9 (S) | 6 (B) | 7 (A) |
| Way of the Long Death | B | SCAG 🕰️ | 9 (S) | 7 (A) | 0 (D) | 9 (S) | 8 (A) | 6 (B) | 6 (B) |
| Way of the Sun Soul | B | XGE 🕰️ | 9 (S) | 6 (B) | 0 (D) | 9 (S) | 9 (S) | 6 (B) | 6 (B) |
| Way of the Astral Self | A | TCE 🕰️ | 9 (S) | 6 (B) | 0 (D) | 10 (S) | 9 (S) | 8 (A) | 8 (A) |
| Way of the Four Elements | B | PHB 🕰️ | 8 (A) | 6 (B) | 0 (D) | 9 (S) | 8 (A) | 7 (A) | 7 (A) |
| Warrior of the Asura | B | Homebrew | 9 (S) | 6 (B) | 0 (D) | 9 (S) | 8 (A) | 6 (B) | 6 (B) |

---

### Warrior of Mercy (XPHB)

**Overall**: S — (17 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดดจาก 0 (D) เป็น 9 (S เต็มสเกล) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงที่สุดในกลุ่ม บวก Action Economy เป็น S ใหม่ด้วย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Hand of Harm (1 Focus, extra necrotic เท่า Martial Arts die+Wis mod ทุกครั้งที่ตี unarmed โดน) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Physician's Touch (lv6) ให้ Hand of Harm ติด Poisoned เพิ่มจนถึงเทิร์นถัดไป [M:2/4] [R:3/3] [B:2/3] |
| **Support** | 9/10 (S) | Hand of Healing ฮีล ally ได้ด้วย 1 Focus (ฟรีผ่าน Flurry ที่ lv11) + Hand of Ultimate Mercy (lv17, ชุบคนตายฟรี) — ยกระดับจาก Support 0 ของ baseline เป็น healer เต็มตัว [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | ไม่มี feature ป้องกันตัวเองใหม่ (ทุกอย่างมุ่งช่วยคนอื่น) = เท่า baseline |
| **Action Economy** | 9/10 (S) | Flurry of Healing and Harm (lv11) ให้ฮีล**และ**ทำร้ายพร้อมกันในการใช้ Flurry ครั้งเดียวโดยไม่เสีย Focus เพิ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Insight+Medicine proficiency + Herbalism Kit เป็น utility ที่ baseline ไม่มี [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 8/10 (A) | มือเดียวทำดาเมจ อีกมือฮีล เปิด role striker-healer hybrid ที่แท้จริง [M:2/4] [R:3/3] [B:3/3] |

### Warrior of Shadow (XPHB)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Action Economy เป็น S ใหม่ บวก Utility/Versatility ขยับตาม Support ยังเป็น 0 เต็ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Shadow Step (bonus action teleport 60ft ในที่มืด + Advantage การโจมตีเมลีถัดไป) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Cloak of Shadows (lv17, 3 Focus) ให้ Invisible + partial incorporeal นาน 1 นาที — evasion tier สูงสุดที่ต่อยอดจาก baseline ที่แข็งอยู่แล้ว [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Shadow Step ไม่เสีย action หลัก + Cloak of Shadows ให้ Flurry ฟรีไม่เสีย Focus [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Darkvision 60ft+ ฟรี + Minor Illusion + Darkness ฟรี — utility แทรกซึม/ที่มืดครบเครื่อง [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผสม stealth/mobility/illusion ในธีมเดียว [M:2/4] [R:2/3] [B:3/3] |

### Warrior of the Elements (XPHB)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Control/Utility/Versatility ขยับตาม Support ยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Elemental Burst (lv6, AoE 3×Martial Arts die) + Empowered Strikes (lv17, extra die 1 ครั้ง/เทิร์น) + forced-move on hit จาก Elemental Attunement [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Elemental Attunement บังคับ Str save หรือถูกผลัก/ดึง 10ft ทุกครั้งที่ตีธาตุโดน [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Elemental Epitome (lv17) ให้ resistance ธาตุที่เลือกได้ (สลับได้ทุกเทิร์น) ระหว่าง Attunement active = ใกล้เท่า baseline ที่แข็งอยู่แล้ว |
| **Action Economy** | 8/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 8/10 (A) | Stride of the Elements (lv11, fly+swim speed) + Elementalism cantrip ฟรี [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เลือกธาตุได้อิสระ ผสม AoE/melee/mobility ในกลไกเดียว [M:2/4] [R:3/3] [B:3/3] |

### Warrior of the Open Hand (XPHB)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Action Economy เป็น S ใหม่ทั้งคู่ บวก Control/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Quivering Palm (lv17) ดีเลย์ดาเมจ 10d12 Force ที่ตั้งขึ้นล่วงหน้า — nova magnitude สูงที่สุดในกลุ่ม [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 8/10 (A) | Open Hand Technique ให้เลือก Addle/Push/Topple ทุกครั้งที่ Flurry ตีโดน — control ที่ถี่และยืดหยุ่นกว่า baseline มาก [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Wholeness of Body (lv6, bonus action ฮีลตัวเอง, Wis mod ครั้ง/วัน) = ใกล้เท่า baseline ที่แข็งอยู่แล้ว |
| **Action Economy** | 9/10 (S) | Fleet Step (lv11) ให้ Step of the Wind ต่อท้าย bonus action อื่นได้ฟรี — เท่ากับได้ผล 2 bonus action จาก 1 ครั้ง [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม control(Push/Topple)+ดาเมจ(Quivering Palm)+self-heal [M:2/4] [R:2/3] [B:3/3] |

### Warrior of Pride (GrimHollowPG24)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ แต่ breadth แคบมาก Support ยังเป็น 0 เต็ม และ Control/Utility นิ่งสนิท


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Assertive Attacker (Wis mod เพิ่มดาเมจตอน Bloodied) + Egotistical (lv17, นับเป็น Bloodied ตราบใด HP ไม่เต็ม — ทำให้ effect ทำงานเกือบตลอดเวลา) + Redoubled Efforts (die คริติคอลเพิ่ม) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Bruised Ego (temp HP ทุกครั้งที่ใช้ Focus Point, เพิ่มเป็น 2 เท่าตอน Bloodied) + Ever Prideful (lv11, ยังมีสติที่ 0 HP ผ่าน Focus) [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Irrational Retaliation เป็น reaction ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 6/10 (B) | Tall Tales (skill proficiency) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 6/10 (B) | ธีม bloodied-synergy berserker เฉพาะทาง ไม่ขยาย role อื่นมาก = ใกล้เท่า baseline |

### Warrior of Regret (GrimHollowPG24)

**Overall**: S — (15 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Action Economy เป็น S ใหม่ทั้งคู่ บวก Support กระโดด +6 (D→B) — กว้างและแรงพร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Crushing Guilt (lv11, AoE 3×Martial Arts die psychic+prone) + Relive the Past (lv17, ตีเพิ่มจาก shade หลัง Flurry) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Crushing Guilt ทำให้เป้าล้ม Prone เป็นวงกว้าง [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | Aid Not Given (bonus action Help action หรือฮีล ally ผ่าน MA die) + The Road Not Traveled (ดึง ally ออกจากอันตรายผ่านการเทเลพอร์ตไปที่ shade) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Shade เป็นตัวล่อโจมตีทางอ้อม แต่ไม่ลดดาเมจที่ตัวเองรับโดยตรง = เท่า baseline |
| **Action Economy** | 9/10 (S) | Flurry ยิงจากตำแหน่ง shade ได้ฟรี + Aid Not Given เป็น bonus action [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม positioning(shade)/support/control ในกลไกเดียว [M:2/4] [R:2/3] [B:3/3] |

### Warrior of the Leaden Crown (GrimHollowPG24)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control เป็น S ใหม่ (กระโดด +3) บวก Utility/Versatility ขยับตาม Support ยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Shatter ปลดล็อกผ่าน Focus + Psychic Crush (lv11, ดาเมจ Force สเกลตาม Pressure Point ที่สะสม) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 9/10 (S) | Hold Person/Hold Monster ปลดล็อกผ่าน Focus + Unsubtle Strike (บังคับผลัก/ดึง 10ft) + Psychic Crush (Restrained) — control kit ที่ครบเครื่องที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมที่ยืนยันได้ชัดเจน = เท่า baseline |
| **Survivability** | 9/10 (S) | ไม่มี feature ป้องกันตัวเองใหม่โดยตรง (Levitate เป็น mobility) = เท่า baseline |
| **Action Economy** | 8/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 8/10 (A) | Mage Hand ล่องหนไม่มี V/S + Levitate + Wall of Force ผ่าน Focus [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Psionic-caster hybrid ที่ผสมดาเมจ/control/utility [M:2/4] [R:3/3] [B:3/3] |

### Warrior of the Street (ValdaPlayerPack)

**Overall**: A — (14 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Action Economy เป็น S ใหม่ทั้งคู่ บวก Control/Utility/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Combo (สะสม +2→+6 attack bonus ทุกครั้งที่ตีต่อเนื่อง) + Energy Blast (AoE-เดี่ยว Force dmg) + K.O. (lv17, extra 3×MA die + สลบถ้า HP≤100) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Uppercut (ผลัก+Prone เป้า Large หรือเล็กกว่า) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 9/10 (S) | Guard Breaker (แปลงพลาดเป็นดาเมจเล็กน้อยโดยไม่ล้าง Combo) เป็น salvage tool ที่มีค่า [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Air Dash (lv11, บินฟรี) เป็น mobility utility ที่ baseline ไม่มี [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ธีม fighting-game combo ที่ผสมดาเมจ/control/AoE [M:2/4] [R:2/3] [B:3/3] |

### Way of the Bow (VSS 🕰️)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Control/Utility/Versatility ขยับตาม Support ยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Soul Arrow (extra Wis mod dmg + เพิกเฉย partial cover) + Flurry of Arrows (ตีระยะไกลเพิ่มผ่าน ki) + Zen Archery (lv17, ยิงซ้ำฟรีเมื่อพลาด) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Stunning Strike ใช้ได้ผ่านการยิงระยะไกลตั้งแต่ lv6 — ขยาย breadth ของ control หลักของ baseline ไปยัง build ระยะไกล [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Intercepting Shot (lv6, reaction ยิงสวนลดค่าการโจมตีที่จะโดน 5 แต้ม) = ใกล้เท่า baseline ที่แข็งอยู่แล้ว |
| **Action Economy** | 8/10 (A) | Flurry of Arrows เป็นเวอร์ชันระยะไกลของ Flurry ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 7/10 (A) | Serenity of the Wind (lv11, blindsight 120ft ผ่าน ki, ถาวร 30ft ที่ lv17) [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 7/10 (A) | พลิก Monk ทั้งชุดให้เป็น dedicated archer โดยไม่เสียเครื่องมือเดิม [M:2/4] [R:2/3] [B:3/3] |

### Way of the Flagellant (VSS 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Action Economy เป็น S ใหม่ทั้งคู่ แม้ Support จะยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Penitent Lash (Advantage ทุกการโจมตีแลกดาเมจตัวเอง) + Branding Palm (extra fire proc 2d8→4d8) + Scissorhand (bleed สะสม) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Scissorhand ทำให้เป้าห้ามฟื้น HP ระหว่างเลือดไหล [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Purity Through Pain (lv11, ฟื้น ki เมื่อโดนดาเมจก้อนใหญ่) เป็น resource-sustain ไม่ใช่ mitigation โดยตรง = เท่า baseline |
| **Action Economy** | 9/10 (S) | Electroshock Strike (ฟรี shocking grasp เป็น bonus action หลัง Attack action) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | ธีม self-harm damage เฉพาะทางหนักมาก ไม่ขยาย role อื่น = ใกล้เท่า baseline |

### Way of the Four Fists (VSS 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Action Economy เป็น S ใหม่ บวก Utility/Versatility ขยับตาม Support ยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Flurry of Limbs (lv17, ตี 3 ครั้งแทน 2 ตอนใช้ Flurry of Blows) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Uncanny Dodge (lv11, reaction ลดดาเมจครึ่งจากการโจมตีใดก็ได้ ไม่จำกัดแค่ B/P/S แบบ Deflect Attacks) [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Simian Swift (ตอน initiative, ขยับ+ตีฟรีผ่าน ki) + Nimbus (bonus action บิน) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Grasp of the Monkey (climb speed เต็ม+กระโดด 2 เท่า+Advantage climb/balance) + Nimbus (บิน) — traversal utility ที่กว้างมาก [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | นักกายกรรมลิงที่ผสม mobility/defense/economy ครบ [M:2/4] [R:2/3] [B:3/3] |

### Way of the Mask (VSS 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control เป็น S ใหม่ (กระโดด +3) บวก Versatility ขยับตาม Support ยังเป็น 0


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Headbutt of Justice (ตีเพิ่มฟรีเมื่อพลาด unarmed strike) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 9/10 (S) | Heavyweight Champion (grapple ได้ทุกขนาด + pin=restrain ทั้งคู่) + Choked Out (lv17, pin → สลบผ่าน ki) — ผู้เชี่ยวชาญ grapple-control ที่ทรงพลังที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | ไม่มี feature ป้องกันตัวเองใหม่โดยตรง (grapple เป็นเชิงรุก) = เท่า baseline |
| **Action Economy** | 8/10 (A) | Off The Top Rope (lv11) มีเงื่อนไขต้องตกจากที่สูงก่อน = เท่า baseline |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญนักมวยปล้ำ-ควบคุมเฉพาะทาง [M:2/4] [R:2/3] [B:3/3] |

### Way of the Rose (VSS 🕰️)

**Overall**: S — (15 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดดจาก 0 เป็น 7 (D→A) บวก Action Economy เป็น S ใหม่ และขยับตามอีก 3 axis กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Wreathed in Thorns (lv17, ตีสวนฟรีเมื่อโดนดาเมจระยะประชิด) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Blossom Burst (Blinded ผ่านการตี unarmed โดนด้วย ki) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 7/10 (A) | Colors of Love (lv11) เลือกออร่าได้: Pink=Help action ฟรีให้ ally / Red=extra 1d6 ให้ ally ที่ตีโดน / White=temp HP ให้ ally ทุกจบเทิร์น — support ที่ Monk ไม่ค่อยมี [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 9/10 (S) | White aura ให้ temp HP ตัวเองได้เช่นกัน = ใกล้เท่า baseline ที่แข็งอยู่แล้ว |
| **Action Economy** | 9/10 (S) | Falling Petal Flurry (teleport ระหว่าง Flurry ไม่เสีย action เพิ่ม) + Pink aura (Help action ฟรี) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Sweet Aroma (กันการตามกลิ่น + Persuasion boost) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | เลือกออร่าได้ 3 แบบตามสถานการณ์ ผสม support/control/mobility ในกลไกเดียว [M:2/4] [R:3/3] [B:3/3] |

### Way of the Ascendant Dragon (FTD 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis เล็กน้อย (Utility/Versatility) ไม่มี peak ใหม่ Support ยังเป็น 0


> **หมายเหตุข้อมูล**: Draconic Disciple (Presence/Strike/Tongue), ตัวเลือกของ Aspect of the Wyrm, และ Ascendant Aspect (Augment Breath/Blindsight/Explosive Fury) ไม่ปรากฏรายละเอียดเต็มในไฟล์ข้อมูล จึงให้คะแนนแบบระมัดระวังโดยอิงจาก Breath of the Dragon และ Wings Unfurled ที่ยืนยันได้เป็นหลัก

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Breath of the Dragon (แทนที่การโจมตี, AoE cone/line 2-3×Martial Arts die เลือกธาตุ, prof bonus ครั้ง/วัน+ฟื้นด้วย ki) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่สามารถยืนยันผล Frightful Presence ของ Aspect of the Wyrm ได้ครบ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่สามารถยืนยัน ally-support ที่ชัดเจนได้ = เท่า baseline |
| **Survivability** | 9/10 (S) | ตัวเลือก Resistance ของ Aspect of the Wyrm ไม่ทราบรายละเอียดดาเมจที่ครอบคลุมเต็ม = เท่า baseline |
| **Action Economy** | 8/10 (A) | Wings Unfurled ผูกกับ Step of the Wind ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 7/10 (A) | Wings Unfurled (บินฟรีผ่าน Step of Wind) + Blindsight (Ascendant Aspect, lv17) [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | เลือกธาตุ Breath ได้ 5 แบบ + บิน + aura เลือกได้ [M:2/4] [R:2/3] [B:3/3] |

### Way of the Drunken Master (XGE 🕰️)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Action Economy เป็น S ใหม่ทั้งคู่ บวก Control/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Intoxicated Frenzy (lv17, Flurry of Blows ตีได้สูงสุด 5 ครั้งใส่เป้าต่างกัน) — magnitude สูงมากเมื่อเจอศัตรูหลายตัว [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Redirect Attack (lv6, reaction เปลี่ยนเป้าการโจมตีที่พลาดไปโดนคนอื่นแทน) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Drunkard's Luck (lv11, จ่าย ki ยกเลิก Disadvantage บนการทอยใดก็ได้รวม save) = ใกล้เท่า baseline ที่แข็งอยู่แล้ว |
| **Action Economy** | 9/10 (S) | Drunken Technique ให้ Disengage ฟรี+speed เพิ่ม 10ft ทุกครั้งที่ใช้ Flurry [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Brewer's Supplies + Performance proficiency เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 7/10 (A) | ตีหลายเป้าพร้อมป้องกันตัวเอง/หลอกล่อได้ในกลไกเดียว [M:2/4] [R:2/3] [B:3/3] |

### Way of the Kensei (XGE 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Action Economy เป็น S ใหม่ทั้งคู่ แม้ breadth ที่เหลือจะแคบก็ตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Deft Strike (extra Martial Arts die ผ่าน ki) + Sharpen the Blade (lv11, บวก atk/dmg ชั่วคราวผ่าน ki) + Kensei's Shot (extra 1d4 ระยะไกล) + Unerring Accuracy (lv17, รีรอลพลาดฟรี) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Agile Parry (+2 AC หลังตีด้วย kensei melee weapon) = ใกล้เท่า baseline ที่แข็งอยู่แล้ว |
| **Action Economy** | 9/10 (S) | Unerring Accuracy ให้รีรอลพลาดฟรีไม่เสีย resource [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Calligrapher's/Painter's Supplies เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 7/10 (A) | เลือกอาวุธ kensei ได้สูงสุด 5 ชนิด (เมลี+ระยะไกลผสม) เพิ่มขึ้นทุกเลเวลสำคัญ [M:2/4] [R:2/3] [B:3/3] |

### Way of the Long Death (SCAG 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ แต่ breadth แคบ (แค่ Control/Versatility ขยับตามเล็กน้อย)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Touch of the Long Death (lv17, ดาเมจ necrotic สูงสุด 20d10 จากการจ่าย ki 10 แต้ม) — nova เดี่ยวที่สูงที่สุดในกลุ่ม [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Hour of Reaping (lv6, action AoE Frightened รัศมี 30ft) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Touch of Death (temp HP ตอนฆ่า) + Mastery of Death (lv11, ตกลง 1 HP แทน 0 ผ่าน ki) = ใกล้เท่า baseline ที่แข็งอยู่แล้ว |
| **Action Economy** | 8/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | ธีมความตาย/ความกลัวเฉพาะทางหนักมาก ไม่ขยาย role อื่น = ใกล้เท่า baseline |

### Way of the Sun Soul (XGE 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Action Economy เป็น S ใหม่ทั้งคู่ แม้ breadth ที่เหลือจะแคบก็ตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Radiant Sun Bolt (ตีระยะไกล ki-doubled bonus action) + Searing Arc Strike (lv6, Burning Hands ฟรีเป็น bonus action) + Searing Sunburst (lv11, AoE scalable) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ (เน้นดาเมจล้วน) = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Sun Shield (lv17) เป็นการตอบโต้ ไม่ใช่ mitigation โดยตรง = เท่า baseline |
| **Action Economy** | 9/10 (S) | Searing Arc Strike แนบมากับ Attack action ไม่เสีย action เพิ่ม + Radiant Sun Bolt ki-doubled [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Sun Shield (แหล่งแสงถาวร) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 6/10 (B) | Blaster ระยะไกลธีมเดียวหนักมาก ไม่ขยาย role อื่น = ใกล้เท่า baseline |

### Way of the Astral Self (TCE 🕰️)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Action Economy เป็น S ใหม่ทั้งคู่ บวก Utility/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Arms' AoE burst ตอนเรียก (2×MA die force) + Empowered Arms (lv11, extra die 1 ครั้ง/เทิร์น) + Astral Barrage (lv17, ตี 3 ครั้งแทน 2 ตอน Extra Attack ถ้าใช้แขนวิญญาณ) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ (เน้น stat-boost/ดาเมจ) = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Deflect Energy (lv11, reaction ลดดาเมจ acid/cold/fire/force/lightning/thunder ด้วย 1d10+Wis — ครอบคลุมกว่า Deflect Attacks ของ baseline ที่ยังไม่ครบทุกธาตุจนถึง lv13) + Armor of the Spirit (+2 AC ที่ lv17) [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Arms/Visage/Body สรุปเป็น bonus action ที่คงอยู่ 10 นาที และ Body มาฟรีเมื่อมีอีกสองอย่างแล้ว [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Visage (darkvision 120ft ทั้ง magical/nonmagical + Advantage Insight/Intimidation + สื่อสารระยะไกล) [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | แปลงร่างเต็มตัวที่สลับ Wis แทน Str + reach + defense + utility ได้พร้อมกัน [M:2/4] [R:3/3] [B:3/3] |

### Way of the Four Elements (PHB 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis เล็กน้อย (Utility/Versatility) ไม่มี peak ใหม่ Support ยังเป็น 0


> **หมายเหตุข้อมูล**: รายการ Elemental Disciplines เต็มรูปแบบ (Breath of Winter, Clench of the North Wind, Eternal Mountain Defense ฯลฯ) ไม่ปรากฏรายละเอียดในไฟล์ข้อมูล (มีแค่ชื่อ+level requirement) จึงให้คะแนนแบบระมัดระวัง

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Disciplines หลายตัวเป็นสาย spell ดาเมจ (เช่น Sweeping Cinder Strike=Burning Hands, River of Hungry Flame ระดับสูง) เลือกได้ 4 จาก 9+ ตัวเลือกที่ lv17 [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่สามารถยืนยันตัวเลือก control-based ได้ครบ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่สามารถยืนยัน ally-support ได้ = เท่า baseline |
| **Survivability** | 9/10 (S) | Eternal Mountain Defense (ชื่อบ่งชี้ defense) ไม่ทราบรายละเอียดเต็ม = เท่า baseline |
| **Action Economy** | 8/10 (A) | ไม่สามารถยืนยัน economy gain ใหม่ได้ = เท่า baseline |
| **Utility** | 7/10 (A) | Ride the Wind (ชื่อบ่งชี้บิน) + Mist Stance (ชื่อบ่งชี้ gaseous/หลบหลีก) เพิ่ม utility แม้ไม่ทราบรายละเอียดเต็ม [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 7/10 (A) | เลือก discipline ได้ 4 จาก 9+ ตัวเลือก สลับได้ทุกครั้งที่เรียนใหม่ — toolkit ยืดหยุ่นแม้ไม่ทราบผลแต่ละตัวครบ [M:2/4] [R:2/3] [B:3/3] |

### Warrior of the Asura (Homebrew)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage และ Survivability เป็น S ทั้งคู่ (nova magnitude สูงสุดในกลุ่ม + resistance ดาเมจทุกชนิดจาก Steel Body) แต่ Support ยังเป็น 0 (D) เต็ม และ Control/Action Economy/Utility นิ่งสนิทที่ baseline ฉุดผลรวมให้อยู่แค่ B

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Asura Strike (lv3, ต้องมี 5 Spirit Sphere) เผา Action+Bonus Action+Speed ที่เหลือทั้งหมด รวม Focus Point และ Spirit Sphere ทุกแต้ม แลกดาเมจ Martial Arts die × (จำนวน Focus Point ที่จ่าย + 1) + Dex mod ในการตีครั้งเดียว — ที่ lv17+ (MA die d12, Focus pool สูงสุด 13) ทุ่มได้ถึง ~13d12+Dex ในตาเดียว บวก Force Crit (attack roll รวม ≥ AC เป้าหมาย+15+Prof Bonus กลายเป็นคริติคอลอัตโนมัติ) ที่ lv17 ผ่าน Annihilating Fury ดาเมจคริติคอลกลายเป็น 3 เท่าแทน 2 เท่า — nova magnitude สูงสุดในกลุ่ม Monk ทั้งหมด แต่ต้องสะสม Spirit Sphere อย่างน้อย 2-3 เทิร์นก่อนถึงจะปลดล็อกได้ [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ (threshold ของ Spirit Sphere ทั้งหมดเป็น self-buff ไม่ใช่ debuff ศัตรู) = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่เลย = เท่า baseline |
| **Survivability** | 9/10 (S) | Wrathful Momentum (lv6) ให้ temporary hit point เท่า Martial Arts die + Monk level ทุกครั้งที่ฆ่าเป้าหรือคริติคอลด้วย Unarmed Strike (ไม่จำกัดจำนวนครั้ง/เทิร์น) และ Steel Body (lv11, 1 ครั้ง/short หรือ long rest, bonus action) ให้ resistance ดาเมจ**ทุกชนิด**จนถึงต้นเทิร์นถัดไป แลกด้วย Speed 0 และ Disadvantage การโจมตี — ครอบคลุมกว้างกว่า Deflect Attacks ของ baseline ที่จำกัดแค่ B/P/S จนถึง lv13 และช่วยปิดจุดอ่อนที่ Designer's Note ระบุไว้ตรงๆ (ไม่มีการป้องกันตัวเองช่วงหลังทุ่ม Asura Strike) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Asura Strike ผูก Action+Bonus Action+Speed ที่เหลือทั้งหมดไว้ในการกระทำเดียว (จ่ายตูมทีเดียวแล้วแห้งทั้งวันตามนิยาม Action Economy ของกติกา) ส่วน Steel Body คุ้มทุนด้วยการใช้แค่ bonus action เดียวแลก resistance เต็มรอบ แต่ก็แลกด้วย Speed 0 และ Disadvantage — หักล้างกันจนไม่มีกำไรสุทธิเกิน baseline ชัดเจน = เท่า baseline |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ (Speed +5ft จาก Spirit Sphere 1+ เป็นแค่ mobility ในคอมแบต) = เท่า baseline |
| **Versatility** | 6/10 (B) | Spirit Sphere threshold ให้ตัวเลือกใช้งานสองขั้ว — ทุ่มทุกอย่างเป็น Asura Strike (striker เดี่ยว) หรือกด Steel Body เป็นแท็งค์ฉุกเฉิน (resistance ทุกดาเมจ) ทำให้สลับบทบาทได้กว้างกว่า baseline เล็กน้อยแม้จะยังผูกกับอาวุธมือเปล่า Dex build เดียวเหมือนเดิม [M:2/4] [R:2/3] [B:2/3] |
