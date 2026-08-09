# Wizard — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 26 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Wizard](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 26 บรรทัดใน tracker (= 28 subclass จริง เพราะ 2 บรรทัดรวม 2 ตัวไว้ด้วยกัน)

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-wizard.json` — source `XPHB` (Player's Handbook 2024) เท่านั้น ตามขอบเขต edition ของโปรเจกต์

---

## Class Baseline (Wizard, 2024)

Floor 0-10 ต่อ axis ของ **Wizard เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — เขียนครั้งเดียว ใช้ร่วมกับทุก subclass ของ Wizard ตลอดทั้งไฟล์นี้

**Chassis ที่นับ (ทุก subclass ได้เหมือนกันหมด)**: HD d6, spellcasting ability Int, full caster progression (spell slot lv1-9 เต็มตาราง Wizard Features, cantrip 3→4(lv4)→5(lv10)), saving throw proficiency Int + Wis, weapon proficiency simple weapons เท่านั้น, ไม่มี armor proficiency, spellbook (6 spell lv1 เริ่มต้น +2 ทุกเลเวลที่ขึ้น), Arcane Recovery (lv1), Ritual Adept (lv1), Scholar (lv2, Expertise 1 skill), Memorize Spell (lv5), Spell Mastery (lv18), Signature Spells (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Full 9-ระดับ spell slot progression (ตาราง Wizard Features) และ cantrip ที่เลือกได้เอง (3 ตัว lv1 → 4 ตัว lv4 → 5 ตัว lv10) ดึงจาก Wizard spell list ที่มี damage option ให้เลือกเพียบโดยไม่ต้องพึ่ง subclass เลย — Fire Bolt scale ถึง 4d10 ที่ lv17, Fireball 8d6 ที่ lv5, Magic Missile ยิง 3 ลูกโดนชัวร์ไม่ต้อง roll เลย แต่ spell slot lv1+ ที่จะเอาไปยิงดาเมจแชร์ pool เดียวกับ control/support/utility ทั้งหมด จึงต้องแลกกับการเตรียมสายอื่นน้อยลงเสมอ ไม่ได้ฟรี [M:3/4] [R:2/3] [B:1/3] |
| **Control** | 7/10 (A) | Wizard spell list มี hard-CC ระดับสูงให้เลือกตั้งแต่ level ต้น — Sleep (lv1, ไม่ต้อง save เลยถ้า HP ไม่พอ), Hold Person (lv2, paralyze เป้าที่ fail Wis save), Web (lv2, restrain เป็นพื้นที่), ไปจนถึง Wall of Force (lv8, กันสนิท 100% ไม่มีช่องโหว่) หรือ Banishment (lv4, ลบเป้าออกจากการต่อสู้ชั่วคราว) — กว้าง/แรงสุดในเกมสำหรับ control โดยเฉพาะ แต่ส่วนใหญ่ยังต้องพึ่ง enemy save fail และแย่ง slot กับ role อื่นเช่นเดียวกับ Damage [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | Wizard ไม่มี healing spell ติด class list โดยตรง (ไม่มี Cure Wounds/Healing Word เหมือน Cleric/Druid) ของเสริมทีมที่มีคือ buff เช่น Haste (ให้ extra action + AC/Dex save เป้าเดียว, lv3) หรือ Mage Armor (ปกติใช้กับตัวเองมากกว่า ally) ซึ่งเป็น single-target concentration ทั้งคู่และแย่ง slot กับสาย damage/control โดยตรง แทบไม่ถูกใช้ถ้าไม่ specialize ไปทางนี้ [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 3/10 (C) | HD d6 (ต่ำสุดในเกมร่วมกับ Sorcerer) = HP เฉลี่ยน้อยที่สุด ไม่มี armor proficiency ติดตัว (ต้องพึ่ง spell เช่น Mage Armor ถึงจะได้ AC 13+Dex mod แทนชุดเกราะจริง) saving throw proficiency มีแค่ Int (กัน rare save เช่น Psychic/Confusion) กับ Wis (กัน charm/fear/บาง control ได้) ไม่มี damage resistance หรือ mobility/escape tool ติด class baseline เลยสักอย่าง [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Cantrip ยิงได้ทุกเทิร์นไม่จำกัดจำนวนครั้ง/วัน ไม่เสีย resource ใดๆ นอกจาก action เป็นฐาน sustain ที่ดี, Arcane Recovery คืน spell slot รวมกันได้สูงสุด ≈ ครึ่งหนึ่งของ Wizard level (ปัดขึ้น, ห้ามระดับ 6+) 1 ครั้ง/short rest ช่วยยืดจำนวนครั้งที่ใช้ slot ต่อวันได้อีกชั้น และ Ritual Adept ให้ cast spell ที่มีแท็ก ritual จากสมุดได้ฟรีไม่แตะ slot เลย (แลกด้วย cast time +10 นาที จึงใช้ในคอมแบตไม่ได้) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Wizard spell list กว้างที่สุดในเกม ครอบคลุม utility/exploration ระดับสูง (Detect Magic, Comprehend Languages, Knock, Scrying, Teleport) และ Ritual Adept ให้ cast ritual-tag spell ในสมุด (Alarm, Identify, Find Familiar ฯลฯ) ได้ไม่จำกัดจำนวนครั้ง/วันโดยไม่แตะ slot เลยแม้แต่ครั้งเดียว บวก Scholar (lv2) ให้ Expertise 1 skill จาก Arcana/History/Investigation/Medicine/Nature/Religion เพิ่ม non-combat proficiency อีกชั้นแยกจากสาย spell [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Prepared spell list (จำนวน = ระดับ Wizard + Int mod) reset ใหม่ได้เต็มทุก Long Rest ไม่ lock-in เหมือน known-spell caster บวก Memorize Spell (lv5) ให้สลับ 1 spell ที่เตรียมไว้ได้ทุก Short Rest เลือกจาก spellbook ที่โตขึ้นเรื่อยๆ (เริ่ม 6 spell lv1, +2 ทุกเลเวลที่ขึ้น) ทำให้ปรับ role รายวัน/ราย encounter ได้ในระดับสูงสุดของเกม แม้ยังมีต้นทุนทอง/เวลาคัดลอก spell ใหม่เข้าสมุด (50gp + 2ชม./ระดับ ต่อ spell ที่เจอนอกเหนือจากที่ได้ฟรีตอน level up) เป็นตัวจำกัดความกว้างของ list ที่เข้าถึงได้จริง ณ จุดใดจุดหนึ่ง [M:3/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (26 บรรทัด tracker = 28 subclass จริง)

**Class Baseline อ้างอิง**: Damage 6, Control 7, Support 3, Survivability 3, Action Economy 6, Utility 8, Versatility 8

ไม่มี archetype ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ **หมายเหตุแหล่งที่มาและการจัดกลุ่ม**:
- **5 ตัวเป็น XPHB/FRHoF 2024-compatible โดยตรง** (ไม่มี 🕰️): Abjurer, Diviner, Evoker, Illusionist (ทั้งหมด XPHB, reprint จาก PHB 2014 เดิม) และ Bladesinger (FRHoF, ยืนยัน `classSource: XPHB`, reprint จาก Bladesinging TCE 2014)
- **8 ตัวเป็น 2014-only orphan 🕰️** (ไม่มี reprint ใน XPHB เลย): School of Conjuration (PHB), School of Enchantment (PHB), School of Necromancy (PHB), School of Transmutation (PHB), War Magic (XGE), Chronurgy Magic (EGW), Graviturgy Magic (EGW), Order of Scribes (TCE)
- **15 ตัวเป็น homebrew 2024-compatible** (ยืนยัน `classSource: XPHB` ทุกตัว, ไม่มี 🕰️): Chronomancer/Familiar Master/Gastronomer/Magic Missile Mage/Mystic Strategist (ValdaSpire24Extras, มีเวอร์ชัน 2014 เดิมด้วยแต่ให้คะแนนเฉพาะ 2024 ตาม precedent เดียวกับ Sorcerer), Fumaturge/Protomancer/Scroll Scribe/Somnomancer/Tyromancer/Universalist/Wand Wizard (ValdaSpire24Extras, เป็นของใหม่เฉพาะ 2024 ไม่มี 2014 มาก่อน), Daemonologist/Plague Doctor (Wizard)/Sangromancer (GrimHollowPG24)
- **หมายเหตุพิเศษเรื่องบรรทัด "X / Y" ของ tracker**: ต่างจาก Sorcerer ที่ "X / Y" หมายถึงชื่อ 2014→2024 ของ **subclass เดียวกัน** — สำหรับ Wizard บรรทัด **"Familiar Master / Fumaturge"** และ **"Scroll Scribe / Wand Wizard"** คือ subclass ที่**แยกจากกันจริง 2 ตัว** อยู่ในหนังสือ 2024 เดียวกัน (ตรวจสอบแล้วว่าไม่มี `reprintedAs` เชื่อมกัน และ shortName ต่างกันคนละตัว) จึงให้คะแนนแยกกันครบทั้ง 2 ตัวต่อ 1 บรรทัด tracker (รวม 28 subclass จริงจาก 26 บรรทัด checkbox)

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Abjurer | A | XPHB | 6 (B) | 7 (A) | 5 (B) | 8 (A) | 7 (A) | 8 (A) | 8 (A) |
| Diviner | B | XPHB | 6 (B) | 7 (A) | 4 (C) | 3 (C) | 7 (A) | 9 (S) | 8 (A) |
| Evoker | B | XPHB | 9 (S) | 7 (A) | 5 (B) | 3 (C) | 6 (B) | 8 (A) | 8 (A) |
| Illusionist | B | XPHB | 7 (A) | 7 (A) | 3 (C) | 6 (B) | 7 (A) | 8 (A) | 8 (A) |
| Bladesinger | A | FRHoF | 9 (S) | 7 (A) | 3 (C) | 8 (A) | 8 (A) | 8 (A) | 8 (A) |
| School of Conjuration | C | PHB 🕰️ | 6 (B) | 7 (A) | 4 (C) | 4 (C) | 6 (B) | 8 (A) | 8 (A) |
| School of Enchantment | B | PHB 🕰️ | 6 (B) | 8 (A) | 3 (C) | 5 (B) | 6 (B) | 8 (A) | 8 (A) |
| School of Necromancy | B | PHB 🕰️ | 7 (A) | 7 (A) | 3 (C) | 6 (B) | 7 (A) | 8 (A) | 8 (A) |
| School of Transmutation | A | PHB 🕰️ | 6 (B) | 7 (A) | 5 (B) | 5 (B) | 6 (B) | 9 (S) | 9 (S) |
| War Magic | B | XGE 🕰️ | 7 (A) | 7 (A) | 3 (C) | 7 (A) | 6 (B) | 8 (A) | 8 (A) |
| Chronurgy Magic | B | EGW 🕰️ | 6 (B) | 8 (A) | 5 (B) | 4 (C) | 6 (B) | 9 (S) | 8 (A) |
| Graviturgy Magic | A | EGW 🕰️ | 8 (A) | 8 (A) | 5 (B) | 3 (C) | 7 (A) | 8 (A) | 9 (S) |
| Order of Scribes | A | TCE 🕰️ | 7 (A) | 7 (A) | 3 (C) | 7 (A) | 7 (A) | 9 (S) | 9 (S) |
| Chronomancer | A | ValdaSpire24Extras | 6 (B) | 8 (A) | 6 (B) | 5 (B) | 8 (A) | 8 (A) | 9 (S) |
| Familiar Master | B | ValdaSpire24Extras | 7 (A) | 7 (A) | 4 (C) | 4 (C) | 6 (B) | 8 (A) | 8 (A) |
| Fumaturge | A | ValdaSpire24Extras | 6 (B) | 8 (A) | 3 (C) | 8 (A) | 7 (A) | 9 (S) | 8 (A) |
| Gastronomer | A | ValdaSpire24Extras | 6 (B) | 7 (A) | 9 (S) | 3 (C) | 6 (B) | 9 (S) | 9 (S) |
| Magic Missile Mage | A | ValdaSpire24Extras | 9 (S) | 8 (A) | 3 (C) | 6 (B) | 7 (A) | 8 (A) | 8 (A) |
| Mystic Strategist | A | ValdaSpire24Extras | 8 (A) | 8 (A) | 5 (B) | 5 (B) | 7 (A) | 8 (A) | 9 (S) |
| Protomancer | A | ValdaSpire24Extras | 7 (A) | 8 (A) | 3 (C) | 5 (B) | 7 (A) | 8 (A) | 9 (S) |
| Scroll Scribe | A | ValdaSpire24Extras | 6 (B) | 7 (A) | 8 (A) | 5 (B) | 6 (B) | 9 (S) | 9 (S) |
| Somnomancer | A | ValdaSpire24Extras | 7 (A) | 9 (S) | 3 (C) | 5 (B) | 6 (B) | 9 (S) | 8 (A) |
| Tyromancer | B | ValdaSpire24Extras | 7 (A) | 8 (A) | 3 (C) | 5 (B) | 6 (B) | 8 (A) | 8 (A) |
| Universalist | A | ValdaSpire24Extras | 7 (A) | 8 (A) | 3 (C) | 4 (C) | 8 (A) | 9 (S) | 9 (S) |
| Wand Wizard | A | ValdaSpire24Extras | 8 (A) | 8 (A) | 3 (C) | 6 (B) | 8 (A) | 9 (S) | 9 (S) |
| Daemonologist | A | GrimHollowPG24 | 8 (A) | 7 (A) | 4 (C) | 4 (C) | 7 (A) | 9 (S) | 9 (S) |
| Plague Doctor (Wizard) | S | GrimHollowPG24 | 8 (A) | 8 (A) | 8 (A) | 5 (B) | 7 (A) | 9 (S) | 9 (S) |
| Sangromancer | A | GrimHollowPG24 | 8 (A) | 7 (A) | 3 (C) | 7 (A) | 7 (A) | 8 (A) | 8 (A) |

---

### Abjurer (XPHB)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +5 (C→A) บวก Support/Action Economy ขยับตาม ไม่มี peak ถึง S ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) | Projected Ward (lv6, reaction ให้ Arcane Ward ดูดซับดาเมจแทน ally ในระยะ 30ft) เป็น support ที่ break เหนือ baseline ชัดเจน [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 8/10 (A) | Arcane Ward (pool HP=2xlevel+Int ดูดซับดาเมจทุกชนิดแทนตัวเอง เติมเต็มได้ทุกครั้งที่ cast Abjuration spell) บวก Spell Resistance (lv14, Adv save+Resist ดาเมจจากคาถา) เป็นเลเยอร์ป้องกันที่แข็งแกร่งมากสำหรับ class ที่ปกติเปราะบางที่สุด [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Spell Breaker (lv10, cast Dispel Magic เป็น bonus action + คืน slot ถ้า check ล้มเหลว) เป็นการประหยัด action ที่แท้จริง [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Spell Breaker (Counterspell+Dispel Magic เตรียมไว้ตลอด) เป็น combat utility ไม่พอยกระดับเหนือ baseline ที่กว้างอยู่แล้ว = เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส anti-magic/protector specialist ชัดเจน ไม่ได้ขยาย breadth เกิน baseline = เท่า baseline |

### Diviner (XPHB)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility เป็น S ใหม่ แต่ breadth แคบ Survivability (จุดอ่อนสุดของ baseline) ไม่ถูกแตะเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 4/10 (C) | Portent ใช้แทนที่ D20 Test ของ creature อื่นที่เห็นได้ด้วย เป็น support ที่ break เหนือ baseline |
| **Survivability** | 3/10 (C) | The Third Eye's Darkvision option เป็น addition เล็กน้อย = เท่า baseline |
| **Action Economy** | 7/10 (A) | Expert Divination (lv6, cast Divination spell lv2+ แล้วคืน slot ระดับต่ำกว่า) เป็นตัวคูณจำนวนครั้งที่ cast ได้ต่อวัน [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Portent (บันทึกผลทอย d20 2-3 ครั้ง/วัน แทนที่ roll อะไรก็ได้ของตัวเองหรือใครก็ได้ที่เห็น) บวก The Third Eye (bonus action เลือก Darkvision/อ่านภาษาใดก็ได้/See Invisibility ฟรี) เป็นชุด reliability+info ที่ทรงพลังที่สุดในบรรดา Wizard [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Portent ใช้ได้กับทุกประเภท roll ไม่ว่าจะเป็นของใคร บวก Third Eye 3 โหมด = breadth สูงแต่ยังอยู่ในกรอบ baseline ที่กว้างอยู่แล้ว = เท่า baseline |

### Evoker (XPHB)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ แต่ breadth แคบมาก มีแค่ Support ขยับตามอีกนิด Survivability ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Potent Cantrip (cantrip ไม่มีทาง "ยิงเปล่า" เลยแม้ miss/save ผ่าน) บวก Empowered Evocation (lv10, +Int mod ดาเมจทุกคาถา Evocation) บวก Overchannel (lv14, การันตีดาเมจสูงสุดของคาถา แลกด้วยดาเมจตัวเองที่เพิ่มขึ้นเรื่อยๆ ถ้าใช้ซ้ำ) เป็น blaster ที่สมบูรณ์แบบที่สุดในเกม [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) | Sculpt Spells (lv6, เลือก ally จำนวน 1+ระดับคาถา ให้ auto-succeed save + ไม่โดนดาเมจจาก Evocation AoE ของตัวเอง) เป็น support ป้องกันข้าง friendly-fire ที่สำคัญมากสำหรับ blaster [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 3/10 (C) | ไม่มี survivability feature ใหม่ = เท่า baseline |
| **Action Economy** | 6/10 (B) | ไม่มี feature ประหยัด action ใหม่ (Overchannel ใช้ตอน cast ปกติ) = เท่า baseline |
| **Utility** | 8/10 (A) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส pure-blaster specialist เดี่ยวชัดเจน = เท่า baseline |

### Illusionist (XPHB)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับกลางๆ 3 axis (Damage/Survivability/AE) Support ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Phantasmal Creatures (lv6, cast Summon Beast/Fey ฟรี 1/long rest แม้จะ HP ครึ่งเดียว) เป็น damage add ที่มาพร้อม combat presence เพิ่ม [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Illusory Self (lv10, reaction ให้ attack ที่โดนตัวเองพลาดอัตโนมัติผ่านภาพลวงตา, refill ด้วย slot lv2+) เป็นการบล็อกเป้าเดียวที่มีประสิทธิภาพสูง [M:2/4] [R:3/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Improved Illusions ให้ Minor Illusion อัพเกรด (เสียง+ภาพพร้อมกัน) cast เป็น bonus action ได้ [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Illusory Reality (lv14, ทำให้ส่วนหนึ่งของภาพลวงตาเป็นของจริงชั่วคราว) เป็นเครื่องมือแก้ปัญหาเชิงสร้างสรรค์ที่ยอดเยี่ยม แต่ไม่พอยกระดับเหนือ baseline ที่กว้างอยู่แล้ว = เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส illusion-trickster ที่มี combat safety net (Illusory Self) + free summons เสริม = เท่า baseline |

### Bladesinger (FRHoF)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Survivability กระโดด +5 (C→A) และ Action Economy ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Extra Attack (lv6, โจมตี 2 ครั้ง + แทนที่ 1 ครั้งด้วย cantrip ได้) บวก Song of Victory (lv14, โจมตีด้วยอาวุธฟรีด้วย bonus action หลัง cast คาถา action) เท่ากับโจมตีได้ถึง 3 ครั้งต่อเทิร์นผสมกับคาถา [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Bladesong (bonus action +AC=Int mod+Speed+10ft, Int mod ครั้ง/รอบ) บวก Song of Defense (lv10, reaction ลดดาเมจ 5x ระดับ slot ที่แลก) เป็นเลเยอร์ป้องกันที่แข็งแกร่งมากทั้งที่ chassis d6 HP ไม่มีเกราะ [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Song of Victory ให้โจมตีด้วยอาวุธฟรีทุกครั้งที่ cast คาถา action บวก Extra Attack's cantrip-option เป็นชุด AE ที่แข็งแกร่งมาก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility feature ใหม่นอกเหนือจาก weapon proficiency = เท่า baseline |
| **Versatility** | 8/10 (A) | Melee-caster hybrid (Gish) archetype ที่โฟกัสบทบาทเดียวชัดเจนแม้จะทำได้ดีมาก = เท่า baseline |

### School of Conjuration (PHB 🕰️)

**Overall**: C — (8 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis เล็กน้อย (Support/Survivability) ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Durable Summons (lv14, +30 temp HP ให้ summon) เป็นความทนทานของ pet ไม่ใช่ดาเมจเพิ่มโดยตรง = เท่า baseline |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 4/10 (C) | Benign Transposition (lv6, สลับที่กับ creature ที่เต็มใจ) ใช้ช่วย ally ออกจากอันตรายได้ เป็น support ที่ break เหนือ baseline เล็กน้อย |
| **Survivability** | 4/10 (C) | Focused Conjuration (lv10, Concentration ทำลายไม่ได้เฉพาะคาถา Conjuration) เป็นเทคนิคป้องกันเฉพาะทางที่แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | ไม่มี feature ประหยัด action ใหม่ = เท่า baseline |
| **Utility** | 8/10 (A) | Minor Conjuration (สร้างวัตถุไร้เวทมนตร์ขนาดเล็กฟรีไม่จำกัดจำนวนครั้ง) เป็น utility ทดแทนเครื่องมือที่มีประโยชน์แต่ไม่พอยกระดับเหนือ baseline = เท่า baseline |
| **Versatility** | 8/10 (A) | Durable Summons เสริม summon-build ให้ viable มากขึ้น แต่ยังคงแคบเฉพาะ Conjuration = เท่า baseline |

### School of Enchantment (PHB 🕰️)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis เล็กน้อย (Control/Survivability) ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 8/10 (A) | Hypnotic Gaze (action ทุกเทิร์น กด Incapacitate+Speed 0 เป้าเดียวต่อเนื่อง) บวก Split Enchantment (lv10, คาถา enchantment เป้าเดียวโดนได้ 2 เป้าพร้อมกัน — เพิ่ม breadth ของ control 2 เท่า) [M:3/4] [R:3/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ (Instinctive Charm ป้องกันตัวเอง ไม่ใช่ ally) = เท่า baseline |
| **Survivability** | 5/10 (B) | Instinctive Charm (lv6, reaction เบี่ยง attack ที่เข้าใส่ตัวเองไปหาเป้าอื่นที่ใกล้ที่สุด 1 ครั้ง/ศัตรู/วัน) เป็นการป้องกันตัวเองที่มีประสิทธิภาพ [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Hypnotic Gaze เสีย action เต็มทุกเทิร์นเพื่อรักษาผล ไม่ประหยัด action สุทธิ = เท่า baseline |
| **Utility** | 8/10 (A) | Alter Memories (lv14, ลบความทรงจำที่ถูก charm) เป็น social utility เฉพาะทาง ไม่พอยกระดับ = เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส charm/enchant specialist ชัดเจน = เท่า baseline |

### School of Necromancy (PHB 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับกลางๆ 3 axis (Damage/Survivability/AE) Support ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Undead Thralls (lv6, Animate Dead สร้าง undead เพิ่ม 1 ตัว + undead ทุกตัวได้ HP เพิ่ม=level + ดาเมจอาวุธเพิ่ม=prof bonus) เป็นการเสริมกองทัพ minion ที่แข็งแกร่งขึ้นถาวร [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | Command Undead (lv14, ครอบครอง undead ใดก็ได้รวมของนักคาถาคนอื่น) เป็น control เฉพาะทางที่แรงในแคมเปญที่มี undead เยอะ ไม่พอยกระดับ tier โดยรวม = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Grim Harvest (ฮีลตัวเองทุกครั้งที่ kill ด้วยคาถา 2x-3x ระดับคาถา) บวก Inured to Undeath (lv10, Resist Necrotic + HP max ลดไม่ได้) เป็นเลเยอร์ sustain ที่ครบวงจร [M:2/4] [R:3/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Grim Harvest เป็น passive ไม่เสีย action เพิ่มเลย [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส necromancer-specialist (minion army + self-sustain) ชัดเจน = เท่า baseline |

### School of Transmutation (PHB 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility และ Versatility เป็น S ใหม่ทั้งคู่ บวก Support/Survivability ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่โดยตรง = เท่า baseline |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) | Transmuter's Stone แชร์ให้ ally ถือได้ บวก Master Transmuter (lv14, ตัวเลือก Panacea=ล้างคำสาป/โรค/พิษ+ฮีลเต็ม หรือ Restore Life=Raise Dead ฟรี ให้เป้าอื่นได้) เป็น support ฉุกเฉินที่ทรงพลังแม้จะใช้ได้ครั้งเดียว/รอบ [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 5/10 (B) | Transmuter's Stone (เลือก Con save prof/resist ธาตุ ให้ตัวเองได้) บวก Shapechanger (lv10, Polymorph ตัวเองเป็นสัตว์ CR≤1 ฟรี 1/rest เป็นเครื่องมือหนี/ปลอมตัว) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | ไม่มี feature ประหยัด action ใหม่ = เท่า baseline |
| **Utility** | 9/10 (S) | Transmuter's Stone (เลือกบัฟถาวรได้ 4 แบบ สลับได้ทุกครั้งที่ cast) บวก Minor Alchemy (แปลงวัสดุ) บวก Master Transmuter (แปลงวัตถุ/ล้างคำสาป-โรค-พิษ/ชุบชีวิต/คืนความหนุ่มสาว — ตัวเลือกที่หลากหลายที่สุดในบรรดา capstone ของ Wizard) [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | ครอบคลุมทั้งบัฟตัวเอง/ally, ฮีล, ชุบชีวิต, และแปลงร่างในตัวเดียว เป็น breadth ที่กว้างที่สุดในบรรดา 2014-orphan ของ class นี้ [M:3/4] [R:3/3] [B:3/3] |

### War Magic (XGE 🕰️)

**Overall**: B — (11 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +4 (C→A) บวก Damage ขยับตาม Support ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Power Surge (lv6, สะสมได้จาก Counterspell/Dispel Magic ที่สำเร็จ, แลกดาเมจ Force เพิ่ม=ครึ่ง level) บวก Deflecting Shroud (lv14, Arcane Deflection แผ่ดาเมจ Force ไปยังศัตรู 3 ตัวด้วย) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Arcane Deflection (reaction +2AC/+4 save แลกกับ cast ได้แค่ cantrip จนถึงเทิร์นถัดไป) บวก Durable Magic (lv10, +2AC+ทุก save ตลอดเวลาที่ Concentrate ซึ่งมี uptime สูงมาก) [M:2/4] [R:3/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Arcane Deflection มีต้นทุนล็อกการ cast คาถา ไม่ประหยัด action สุทธิ = เท่า baseline |
| **Utility** | 8/10 (A) | Tactical Wit (Int mod เข้า Initiative) เป็น utility แคบ ไม่พอยกระดับ = เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส "war mage" defense+combat specialist ชัดเจน = เท่า baseline |

### Chronurgy Magic (EGW 🕰️)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility เป็น S ใหม่ บวก Control/Support/Survivability ขยับตามอีก 3 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่โดยตรง (Momentary Stasis ล็อกเป้าให้โดนง่ายขึ้นแต่ไม่ใช่ดาเมจ) = เท่า baseline |
| **Control** | 8/10 (A) | Momentary Stasis (lv6, action กด Incapacitate+Speed 0 เป้าเดียว Int mod ครั้ง/วัน) บวก Chronal Shift (บังคับ reroll หลังเห็นผลแล้ว = พลิกผล save ของศัตรูจากผ่านเป็นพลาดได้) [M:3/4] [R:3/3] [B:2/3] |
| **Support** | 5/10 (B) | Chronal Shift ใช้แก้ roll ที่ ally พลาดได้เช่นกัน บวก Arcane Abeyance (lv10, บรรจุคาถาไว้ในลูกปัดให้ใครก็ได้ปล่อยทีหลัง — มอบบัฟ/ฮีลให้ ally แบบ delayed ได้) [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 4/10 (C) | Chronal Shift ใช้แก้ save ของตัวเองได้เช่นกัน [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Arcane Abeyance ให้ cast คาถาล่วงหน้าเก็บไว้ปล่อยทีหลัง (ยังเสีย action ตอนปล่อยอยู่ดี) = เท่า baseline |
| **Utility** | 9/10 (S) | Arcane Abeyance (บรรจุคาถาเป็นไอเทมให้ตัวเองหรือใครก็ได้ปล่อยภายหลังภายใน 1 ชม.) เป็นเครื่องมือ tactical ที่มีเอกลักษณ์และทรงพลัง บวก Convergent Future (lv14, บังคับผล roll ให้อยู่ที่ threshold พอดีหรือต่ำกว่า 1, แลกด้วย Exhaustion) [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสม control (Momentary Stasis)+reliability (Chronal Shift)+delayed-spell-item (Arcane Abeyance) ในตัวเดียว = เท่า baseline |

### Graviturgy Magic (EGW 🕰️)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Versatility เป็น S ใหม่ บวก Damage/Control/Support ขยับตาม แต่ Survivability ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Violent Attraction (lv10, reaction เพิ่ม 1d10 ดาเมจให้การตีของ ally หรือ 2d10 ดาเมจตกจากที่สูงใส่ศัตรู) บวก Event Horizon (lv14, AoE ดาเมจ Force ต่อเนื่อง 2d10/เทิร์น 1 นาที) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Adjust Density (เพิ่ม/ลด speed+Str save ของเป้า) บวก Gravity Well (บังคับเคลื่อนที่ฟรีทุกครั้งที่คาถาโดน/fail save — ไม่เสีย action เพิ่ม) บวก Event Horizon (Speed 0 lockdown zone) เป็นชุด control หลากหลายที่สุดใน class นี้ [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 5/10 (B) | Adjust Density ใช้บัฟ ally ได้ (ลดน้ำหนัก=speed+10+jump 2x) บวก Violent Attraction เสริมดาเมจการตีของ ally ได้ [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 3/10 (C) | ไม่มี survivability feature ใหม่โดยตรงสำหรับตัวเอง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Gravity Well ทำงานฟรีทุกครั้งที่คาถาโดนเป้า ไม่เสีย action เพิ่มเลย [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Adjust Density มีประโยชน์เชิงสร้างสรรค์ (เคลื่อนย้ายของหนัก) แต่ไม่พอยกระดับเหนือ baseline = เท่า baseline |
| **Versatility** | 9/10 (S) | รวมดาเมจ+control+support เข้าด้วยกันผ่านธีม gravity เดียวที่ประยุกต์ใช้ได้ทุกสถานการณ์ [M:3/4] [R:3/3] [B:3/3] |

### Order of Scribes (TCE 🕰️)

**Overall**: A — (14 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +4 (C→A) บวก Utility และ Versatility เป็น S ใหม่ทั้งคู่ กว้างมาก


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Awakened Spellbook's damage-type swap ช่วยบายพาส resistance ของศัตรูได้ เป็น damage-reliability ที่มีประโยชน์จริง [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมโดยตรง (scroll ใช้ได้แค่ตัวเองตามข้อความ) = เท่า baseline |
| **Survivability** | 7/10 (A) | One with the Word (lv14, reaction ป้องกันดาเมจทั้งหมดจากการโดนตี 1 ครั้ง แลกด้วยการเสียคาถาจาก spellbook รวมระดับ≥3d6) เป็นปุ่ม "ไม่โดนดาเมจเลย" ที่ทรงพลัง [M:3/4] [R:3/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Awakened Spellbook ให้ cast ritual ด้วยเวลาปกติ 1 ครั้ง/วัน (ประหยัด 10 นาทีในสถานการณ์กดดันเวลา) บวก Manifest Mind (cast คาถาผ่านตำแหน่งวิญญาณสอดแนมได้) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Manifest Mind (lv6, ส่งวิญญาณสอดแนม Tiny มี Darkvision 60ft + cast คาถาผ่านมันได้) บวก Master Scrivener (lv10, ม้วนคาถาฟรีทุก long rest ระดับสูงกว่าปกติ 1 ระดับ) เป็นชุด scouting+resource ที่ทรงพลังมาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | สลับชนิดดาเมจ+สอดแนมระยะไกล+ป้องกันฉุกเฉิน+ทำม้วนคาถา ครอบคลุมหลายมิติมาก [M:3/4] [R:3/3] [B:3/3] |

### Chronomancer (ValdaSpire24Extras)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Versatility เป็น S ใหม่ บวกขยับขึ้นอีก 3 axis พร้อมกัน (Control/Support/Survivability/AE) กว้างที่สุดในกลุ่มที่ไม่ใช่ Domain-max


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่โดยตรง (theme เน้น utility/control ผ่านคาถาสาย Haste/Slow/Time Stop) = เท่า baseline |
| **Control** | 8/10 (A) | Lag Spell (lv10, หน่วงผลคาถาไว้ 1-3 รอบ เป็น tactical setup ที่ไม่มีใครทำได้) บวกการเข้าถึง Slow/Time Stop ผ่าน Chronomancy Savant [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 6/10 (B) | Time Loop (lv14, reaction ให้ creature ที่เห็น — รวม ally — ได้เทิร์นพิเศษระหว่างที่เวลาหยุดสำหรับคนอื่นทั้งหมด) เท่ากับมอบเทิร์นฟรีให้ ally ได้โดยตรง [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 5/10 (B) | Retroactive Spell (cast คาถาบัฟตัวเอง ระดับ 1-3 ฟรีไม่เสีย action ตอนทอย Initiative) เป็นการเตรียมตัวก่อนต่อสู้ที่มีประโยชน์ [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Chronoshift (ได้ action พิเศษจำกัดฟรีทุกครั้งที่ cast คาถา Chronomancy) บวก Retroactive Spell (cast ฟรีไม่เสีย action) เป็นชุด AE ที่แข็งแกร่งมาก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Lag Spell/Retroactive Spell เป็น tactical utility เชิงเวลาที่มีเอกลักษณ์ แต่ไม่พอยกระดับเหนือ baseline ที่กว้างอยู่แล้ว = เท่า baseline |
| **Versatility** | 9/10 (S) | Time Loop เลือกเป้าได้ทั้ง ally/ศัตรู บวก Lag Spell/Chronoshift/Retroactive Spell ที่ต่างกันโดยสิ้นเชิง ครอบคลุมทั้ง damage-setup/control/support/action-economy [M:3/4] [R:3/3] [B:3/3] |

### Familiar Master (ValdaSpire24Extras)

**Overall**: B — (9 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับแค่ 2 axis เล็กน้อย (Support/Survivability) ไม่มี peak ใหม่ (ชื่อรุ่น 2014 ของ Fumaturge)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Arcane Evolution ให้ familiar โจมตีได้จริงจัง (สเกลตามระดับ slot ที่ใช้) บวก Fiend Planar Familiar (lv14, AoE hellfire 4d6) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | Fey Planar Familiar (lv14, teleport familiar + Disadvantage ต่อ attack ที่เข้าใส่มัน) ไม่พอยกระดับ tier = เท่า baseline |
| **Support** | 4/10 (C) | Celestial Planar Familiar (lv14, familiar ให้ ally ที่ fail test reroll ด้วย Advantage ผ่าน reaction) เป็น support ที่ break เหนือ baseline |
| **Survivability** | 4/10 (C) | Servitor's Agility's "No Special Speed" option ให้ Disadvantage ต่อ AOO ที่เข้าใส่ตัวเอง [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | ไม่มี feature ประหยัด action ใหม่นอกเหนือจากการสั่ง familiar ปกติ = เท่า baseline |
| **Utility** | 8/10 (A) | Servitor's Agility (climb/fly/swim speed ตามประเภท familiar) เป็น traversal utility ที่มีประโยชน์แต่ไม่พอยกระดับ = เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส pet-build specialist ที่มีตัวเลือก planar-type ปลายเกม 3 แบบ = เท่า baseline |

### Fumaturge (ValdaSpire24Extras)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +5 (C→A) บวก Utility เป็น S ใหม่ และ Control/AE ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่โดยตรง = เท่า baseline |
| **Control** | 8/10 (A) | Fogcrafting's Difficult Terrain option บวกการควบคุมพื้นที่หมอกควันที่หลากหลาย (sculpt/undispersible) ยกระดับความยืดหยุ่นของ battlefield control อย่างมาก [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 3/10 (C) | Fogcrafting's Sculpted (เว้นพื้นที่ AoE ให้ ally ไม่โดน) เป็น support แคบไม่พอยกระดับ = เท่า baseline |
| **Survivability** | 8/10 (A) | Gaseous Escape (lv6, reaction cast Gaseous Form ฟรีตอนโดนดาเมจ B/P/S ได้ Resistance ย้อนหลัง) บวก Smoke Mage (lv14, Gaseous Form ไม่ต้อง Concentration+Fly Speed เต็ม+cast คาถาได้ระหว่างแปลงร่าง) เป็นชุดหลบหนี/ล่องหนที่ทรงพลังมาก [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Greater Fogcrafting's Fog Step (lv10, bonus action teleport ภายในกลุ่มควันตัวเอง) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Smoke Animals (familiar ควันบิน 60ft ฟรี) บวก Fogcrafting 4 modifier ที่ปรับคาถากลุ่มควันได้ตามสถานการณ์ บวก Gaseous Form access เต็มรูปแบบ เป็นชุด utility ที่หลากหลายมาก [M:4/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ธีมควัน/แก๊สครอบคลุม control+survival+utility เชื่อมโยงกันแน่น = เท่า baseline |

### Gastronomer (ValdaSpire24Extras)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดดจาก 3 เป็น 9 (C→S เต็มสเกล) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงที่สุดในกลุ่ม บวก Utility/Versatility เป็น S ใหม่ด้วย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Monster Meal (temp HP+บัฟตามประเภทมอนสเตอร์ให้หลายคน) บวก Arcane Condiments (lv6, เพิ่ม utility spell เช่น Water Breathing/Darkvision ให้ทุกคนที่กินมื้ออาหาร) บวก **Heroic Snacks (lv10, cast Heroes' Feast ฟรีไม่เสีย slot ให้ Int mod คนกิน — ปกติเป็นคาถา lv6)** บวก Five-Star Condiments (lv14, เพิ่ม Fly/Invisibility/Blur ให้กลุ่ม) เป็นชุด support ที่ทรงพลังและกว้างที่สุดในบรรดา Wizard ทั้งหมด [M:4/4] [R:3/3] [B:2/3] |
| **Survivability** | 3/10 (C) | ไม่มี survivability feature ใหม่เฉพาะตัวเอง (ได้ประโยชน์ร่วมจากมื้ออาหารตัวเองเท่านั้น) = เท่า baseline |
| **Action Economy** | 6/10 (B) | Heroic Snacks กินเป็น bonus action ต่อคน แต่การเตรียมยังต้องใช้เวลา rest ไม่ใช่ combat action = เท่า baseline |
| **Utility** | 9/10 (S) | Sous Chef (Create Food and Water ฟรี) บวก Arcane Condiments (Comprehend Languages/Darkvision/Water Breathing ให้ทั้งทีม) เป็น exploration utility ที่กว้างมาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | Support+utility คู่ขนานที่กว้างที่สุด (10 ประเภทมอนสเตอร์ + 6+5 condiment) [M:3/4] [R:3/3] [B:3/3] |

### Magic Missile Mage (ValdaSpire24Extras)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Damage เป็น S ใหม่ บวก Control/Survivability ขยับตาม Support ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Extra Darts (สูงสุด +4 ลูก = รวม 7-8 ลูกที่ lv14) บวก Giga-Missile (lv14, +Int mod ดาเมจต่อลูก) บนคาถาที่โดนชัวร์ไม่ต้องทอย attack roll เลย เป็น reliable burst damage ที่สูงมาก [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Versatile Missiles (lv6, แปลงลูกดอกเป็น Prone/Blind/Stun ได้โดยแลกจำนวนลูก) เป็น control ที่ยืดหยุ่นบนคาถาที่โดนชัวร์ [M:3/4] [R:3/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Shield of Missiles (lv10, AC bonus สูงสุด +5 + สวนกลับอัตโนมัติทุกครั้งที่ศัตรูพลาดตี + โซนดาเมจ) เป็นการป้องกันที่ดีมาก [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Free Casting (cast Magic Missile ฟรี Int mod ครั้ง/วัน) เป็นตัวคูณทรัพยากรที่ดี [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility feature ใหม่นอกคอมแบต = เท่า baseline |
| **Versatility** | 8/10 (A) | Magic Missile ที่โดนชัวร์+ตัวเลือก control หลายแบบ+โหมดป้องกัน แต่ยังเป็น "one-spell specialist" = เท่า baseline |

### Mystic Strategist (ValdaSpire24Extras)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Versatility เป็น S ใหม่ บวกขยับขึ้นอีก 4 axis พร้อมกัน (Damage/Control/Support/Survivability) กว้างที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Potent Spell (เพิ่ม battle die ใส่ดาเมจคาถา) บวก Sanguine Spell (lv14, DoT Necrotic ต่อเป้าที่ fail save) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Staggering Spell (halve speed+atk penalty บนเป้าที่ fail save) บวก Inexorable Spell (lv14, บังคับ reroll Disadvantage บนเป้าที่ save ผ่านไปแล้ว — พลิกผลได้) [M:3/4] [R:3/3] [B:2/3] |
| **Support** | 5/10 (B) | Bolstering Spell (temp HP ให้ ally ที่ตัวเองบัฟด้วยคาถา) บวก Morale Boost (reaction แก้ save ที่ ally พลาด) เป็น support จริงที่ break เหนือ baseline [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 5/10 (B) | Unbreakable Concentration (reaction แก้ save Concentration ที่พลาด) เป็นการป้องกันตัวเองที่สำคัญสำหรับ full-caster [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Spell Tactics (lv10, bonus action+slot คืน battle die) เป็นการบริหารทรัพยากรที่ดี [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Flash of Brilliance (แก้ Int/Wis check พลาด) + Arcane Assessment (lv6, ตรวจสอบความสามารถเวทมนตร์+Adv save ต่อเป้า) ไม่พอยกระดับเหนือ baseline = เท่า baseline |
| **Versatility** | 9/10 (S) | 6 maneuver ที่ต่างกันโดยสิ้นเชิง (dmg/control/support/defense/utility) ครอบคลุมทุกมิติมากที่สุดในบรรดา Wizard subclass เดียว [M:3/4] [R:3/3] [B:3/3] |

### Protomancer (ValdaSpire24Extras)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Versatility เป็น S ใหม่ บวก Damage/Control/Survivability ขยับตาม Support ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Amnesia Surge's Advantage-on-spell-attack option (แลก spell ที่เตรียมไว้เพื่อ Adv attack roll) เป็นดาเมจ-reliability ที่มีประโยชน์ [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Amnesia Surge's Impose-Disadvantage option (แลก spell ที่เตรียมไว้เพื่อให้เป้ามี Disadvantage ต่อ save) ช่วยให้คาถา control ที่ยากลงได้ง่ายขึ้นมาก [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | Amnesia Surge's Advantage-on-own-saves option บวก Mnemonic Concentration (lv10, การันตี save Concentration แลกด้วยการเสีย spell ที่เตรียมไว้) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Vital Recovery (lv6, แลก Hit Dice เพื่อเพิ่มจำนวน slot ที่ Arcane Recovery คืนได้) เป็นตัวคูณทรัพยากรที่ดี [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Proto-Master (lv14, cast protospell ที่เตรียมไว้ฟรี effective level 3) เป็น utility เสริม ไม่พอยกระดับเหนือ baseline = เท่า baseline |
| **Versatility** | 9/10 (S) | Amnesia Surge ใช้แลก spell ที่เตรียมไว้เพื่อโบนัส 3 แบบ (dmg/control/defense) ได้ทุกครั้งที่ cast คาถาอะไรก็ได้ เป็นความยืดหยุ่นเชิง trade-off ที่ประยุกต์ใช้ได้ตลอดเวลา [M:3/4] [R:3/3] [B:3/3] |

### Scroll Scribe (ValdaSpire24Extras)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดด +5 (C→A) บวก Utility/Versatility เป็น S ใหม่ทั้งคู่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี damage feature ใหม่โดยตรง (ม้วนคาถาอาจมีคาถาดาเมจแต่ไม่ใช่ magnitude เพิ่มของตัวเอง) = เท่า baseline |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่โดยตรง = เท่า baseline |
| **Support** | 8/10 (A) | Scribe Scroll's **Universal Scrolls** (ใครก็ได้ที่อ่านภาษาได้ cast คาถาที่เตรียมไว้ของตัวเองจากม้วนได้ ใช้ save DC/attack ของตัวเอง) เท่ากับมอบ spellcasting ของตัวเองให้ทั้งทีมใช้ได้ เป็น support ที่แปลกใหม่และทรงพลัง [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Warding Scrawl (lv10, ผู้ใช้ม้วนคาถาได้ temp HP+Adv Concentration save) ใช้ป้องกันตัวเองได้เช่นกัน [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Recycle Spell Scroll เสีย Magic action เต็มในการทำลายม้วนเพื่อคืน slot ไม่ประหยัด action สุทธิ = เท่า baseline |
| **Utility** | 9/10 (S) | Scroll Codex (lv14, ม้วนคาถาฟรี lv1-3 เพิ่มทุก long rest ไม่นับโควตา) บวกม้วนคาถาปกติที่ทำได้ทุก rest เป็นคลังคาถาสำรองที่ใหญ่มาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | เปลี่ยนทั้งปาร์ตี้ให้เข้าถึง spellcasting ของตัวเองได้ (ผ่านม้วนคาถา) เป็นการขยาย breadth ของทีมทั้งหมด ไม่ใช่แค่ตัวเอง [M:3/4] [R:3/3] [B:3/3] |

### Somnomancer (ValdaSpire24Extras)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Control เป็น S ใหม่ (กระโดด +2) บวก Utility เป็น S ใหม่ด้วย และ Damage/Survivability ขยับตาม Support ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Nightmares (lv14, bonus action ดาเมจ Psychic=level ให้ทุกเป้าที่ Unconscious ในระยะ 60ft) ทำงานร่วมกับ Deep Sleep ได้ดีมาก [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 9/10 (S) | Deep Sleep (Sleep spell ฟรี + fail save ครั้งแรก = Unconscious ทันทีไม่ต้องรอ HP threshold) บวก Hypnotize (lv6, พิธี 1 นาที กด Charmed + ตอบคำถามตามจริง + auto-fail Suggestion) เป็น control/interrogation ที่แรงที่สุดในบรรดา Wizard [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | Somnambulist (ป้องกันตัวเองจากผล Unconscious แบบเต็ม — ยังเคลื่อนที่/กระทำได้ครึ่งความเร็วแม้ถูก knockout) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Deep Sleep cast ฟรีไม่เสีย slot แต่ยังเสีย action ปกติในการ cast = เท่า baseline |
| **Utility** | 9/10 (S) | Lucid Dream (lv10, cast Divination/Dream/Legend Lore/Scrying ฟรีระหว่างหลับใน Long Rest โดยไม่รบกวนการพักผ่อน) เป็นเครื่องมือหาข้อมูลฟรีที่ทรงพลังมาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | รวม control/interrogation/free-divination ในตัวเดียว = เท่า baseline |

### Tyromancer (ValdaSpire24Extras)

**Overall**: B — (10 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ขยับกลางๆ 3 axis (Damage/Control/Survivability) Support ไม่ถูกแตะ ไม่มี peak ใหม่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Lactose Intolerance (lv14, Ferment Spell เพิ่มดาเมจ Poison=ครึ่ง level+Int mod) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Ferment Spell (lv6, แปลง save ของคาถา action ใดก็ได้เป็น Con + เพิ่ม Poisoned condition บน fail, Int mod ครั้ง/วัน) เป็น debuff-attachment ที่ประยุกต์ใช้ได้กับคาถาแทบทุกตัว [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | Legen-Dairy Resistance (lv10, แปลง save ที่พลาดเป็นสำเร็จ 1/rest) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Cheese Magic ไม่เสีย action เพิ่ม (ติดมากับการ cast ปกติ) แต่ไม่พอยกระดับ tier = เท่า baseline |
| **Utility** | 8/10 (A) | Cheese Magic's Heroic Inspiration option (1/rest) เป็น utility เล็กน้อย ไม่พอยกระดับ = เท่า baseline |
| **Versatility** | 8/10 (A) | Ferment Spell ใช้ได้กับคาถาแทบทุกประเภทที่มี saving throw เป็น universal add-on ที่กว้าง แต่ยังคงอยู่ในกรอบ baseline = เท่า baseline |

### Universalist (ValdaSpire24Extras)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility และ Versatility เป็น S ใหม่ทั้งคู่ บวก Damage/Control/Action Economy ขยับตาม แม้ Support จะไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Arcane Excellence (spell slot เพิ่มอีก 1 ช่องที่ระดับสูงสุดเสมอ สูงสุดถึง lv7) เท่ากับได้ cast คาถาแรงสุด 1 ครั้งเพิ่มทุกวัน [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Spellwarp (lv10, สลับประเภท saving throw ของคาถาใดก็ได้ระหว่างกลุ่ม Str/Dex/Con หรือ Int/Wis/Cha — โจมตี save ที่อ่อนแอของเป้าได้เสมอ) [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 4/10 (C) | Erudite Focus (lv14, Adv save ต่อคาถาระหว่าง Concentrate บน feature นี้) เป็นการป้องกันที่มีเงื่อนไข [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Eidetic Memory (lv6, Memorize Spell เป็น bonus action Int mod ครั้ง/วัน) บวก Erudite Focus (bonus action Study/cantrip/ใช้ item ระหว่าง Concentrate) เป็นชุด AE ที่แข็งแกร่งมาก [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Universal Savant (เพิ่ม spell จากโรงเรียนไหนก็ได้ฟรีเข้าสมุด) บวก Multidisciplinary Scholar (Expertise skill ที่ 2) เป็นการเข้าถึงความรู้ที่กว้างที่สุด [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | ออกแบบมาให้เป็น "ผู้เชี่ยวชาญทุกด้าน" อย่างแท้จริง (slot เพิ่ม+เข้าถึงทุกโรงเรียน+สลับ save+จัดการ action หลายรูปแบบ) [M:3/4] [R:3/3] [B:3/3] |

### Wand Wizard (ValdaSpire24Extras)

**Overall**: A — (13 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility และ Versatility เป็น S ใหม่ทั้งคู่ บวกขยับขึ้นอีก 3 axis พร้อมกัน (Damage/Control/Survivability/AE) กว้างมาก


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Wand Slinger (lv6, bonus action ยิงคาถาจากไม้กายสิทธิ์ = cast ได้ 2 คาถาต่อเทิร์นถ้าไม่ cast คาถา lv1+ ปกติในเทิร์นนั้น) เป็นการเพิ่ม magnitude ที่ทรงพลัง [M:4/4] [R:2/3] [B:2/3] |
| **Control** | 8/10 (A) | Arcane Duelist's Impair option (Disadvantage ต่อ spell attack ครั้งถัดไปของเป้า) บวกไม้กายสิทธิ์อาจบรรจุคาถา control ได้ [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Warding Shield (lv10, cast Shield ฟรีตอน save พลาด +5 ต่อ save นั้น — แก้ save ที่พลาดให้กลายเป็นสำเร็จได้เกือบทุกครั้ง) [M:2/4] [R:3/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Wand Slinger ให้ "cast คาถาที่ 2" ผ่าน bonus action ในเทิร์นเดียวกัน เป็นตัวคูณ action ที่ทรงพลัง [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Craft Wands (เก็บคาถาไว้ในไม้กายสิทธิ์ได้สูงสุด 6 อัน ระดับสูงสุด 5 พร้อมใช้งานได้ทันที) เป็นคลังคาถาสำรองที่ยืดหยุ่นมาก [M:4/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | ไม้กายสิทธิ์หลายอันพร้อมกัน (สูงสุด 6 อันที่ lv17) ให้เข้าถึงคาถาได้หลากหลายพร้อมกันเสมอ บวกกลไก AE คูณสอง [M:3/4] [R:3/3] [B:3/3] |

### Daemonologist (GrimHollowPG24)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Utility และ Versatility เป็น S ใหม่ทั้งคู่ บวก Damage/AE ขยับตาม แม้ Support/Survivability จะขยับได้แค่บางส่วน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Eternal War Eruption (lv14, AoE 4d10 Necrotic+4d10 Radiant+Blind พร้อมกัน) บวก Unearthly Countenance (lv10, upcast คาถาจากตาราง Daemon/Seraph ขึ้น 1 ระดับฟรี) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | Eternal War Eruption's Blind condition เสริมจาก AoE damage เป็นหลัก ไม่พอยกระดับ tier = เท่า baseline |
| **Support** | 4/10 (C) | Fair and Foul's Seraph list (Aid/Bless/Revivify/Greater Restoration) เข้าถึง support spell ระดับสูงได้ถ้าเลือกฝั่งนี้ เป็น support ที่ break เหนือ baseline |
| **Survivability** | 4/10 (C) | Borrowed Tongues and Hides (Resist Necrotic หรือ Radiant ตามฝั่งที่เลือก) [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Stolen Secrets ให้ Eldritch Invocation ที่ส่วนใหญ่ใช้ได้แบบ at-will ไม่เสีย action เพิ่ม [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Stolen Secrets ให้เข้าถึงคลัง Eldritch Invocation ทั้ง 28 ตัวเลือกของ Warlock มาเสริม utility ของ Wizard ที่กว้างอยู่แล้วให้กว้างขึ้นไปอีก [M:4/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | เข้าถึงคาถา 2 สาย (Daemon/Seraph) สลับได้ทุก long rest บวก Invocation pool เป็นความยืดหยุ่นที่กว้างมาก [M:3/4] [R:3/3] [B:3/3] |

### Plague Doctor (Wizard) (GrimHollowPG24)

**Overall**: S — (15 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Support กระโดด +5 (C→A) บวก Utility/Versatility เป็น S ใหม่ทั้งคู่ และขยับขึ้นครบ 6 ใน 7 axis กว้างที่สุดในกลุ่มทั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Bad Medicine (ปาโปชั่นใส่ AoE 5 เอฟเฟกต์สะสมตามระดับ slot) บวก Medicinal Master (lv14, +2d8 Acid+Disadvantage save) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Bad Medicine ให้ Poisoned/Speed halved/DoT สะสมได้พร้อมกันหลายแบบตามระดับ slot เป็น debuff kit ที่หลากหลาย [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 8/10 (A) | Potion Craft (บรรจุคาถา single-target ที่เตรียมไว้ **อะไรก็ได้** ลงโปชั่นให้ ally ดื่มเองได้) บวก Good Medicine (โปชั่นฮีลบริสุทธิ์สเกลตาม slot + ล้าง Poisoned) เป็นชุด support ที่ยืดหยุ่นที่สุดในบรรดา Wizard เพราะมอบคาถาอะไรก็ได้ให้ทีมใช้ผ่านโปชั่น [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Breathe It In (lv10, temp HP จากดาเมจ Necrotic/Poison ที่ได้รับ + Immune Poisoned) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | โปชั่นดื่มเป็น bonus action ต่อคน เท่ากับแบ่งเบา action การ cast ให้ ally ทำเองได้ [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Potion Craft (บรรจุคาถา single-target อะไรก็ได้จาก spellbook ลงโปชั่น) เป็นความยืดหยุ่นระดับสูงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | ดาเมจ+control+support+ฮีล ผ่านกลไก potion-crafting เดียวกัน ครอบคลุมทุกมิติ [M:3/4] [R:3/3] [B:3/3] |

### Sangromancer (GrimHollowPG24)

**Overall**: A — (12 คะแนนจาก 7 axis: S=+3/A=+2/B=+1/C=0/D=-1, คำนวณอัตโนมัติแทนดุลยพินิจเดิม ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) Survivability กระโดด +4 (C→A) บวก Damage/Action Economy ขยับตาม Support ไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Blood for Blood (lv10, แลก Hit Dice/Sangromancy Die เพิ่มดาเมจทุกครั้งที่คาถาโดน ดับเบิลถ้าเป้า Bloodied) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Sanguine Vigor (+6 HP max +1/level + ฮีลตัวเองทุกครั้งที่ cast คาถา Sangromancy) บวก Red Renewal (lv14, คืน Hit Dice+Sangromancy Dice ตอน short rest) เป็นการยกระดับ HP pool ที่ต่ำที่สุดในเกม (d6) ให้แข็งแกร่งขึ้นอย่างเห็นได้ชัด [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Blood for Blood ทำงานฟรีเป็นส่วนหนึ่งของการโดนคาถา ไม่เสีย action เพิ่ม [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส blood-magic nova/self-sustain specialist ชัดเจน = เท่า baseline |
