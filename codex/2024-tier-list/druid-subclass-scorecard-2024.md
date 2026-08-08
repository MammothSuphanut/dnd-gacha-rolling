# Druid — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 17 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Druid](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 17 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-druid.json` — source `XPHB` (Player's Handbook 2024) — เช่นเดียวกับ Cleric เวอร์ชัน 2024 ตัดหัวข้อ "Ritual Casting" ออกจาก Spellcasting feature เดิม (มีแค่ใน PHB 2014)

---

## Class Baseline (Druid, 2024)

Floor 0-10 ต่อ axis ของ **Druid เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Wis, full caster progression, saving throw proficiency Int + Wis, armor baseline light/shield (หรือ medium ถ้าเลือก Warden), weapon baseline simple (หรือ martial ถ้าเลือก Warden), Druidic (มี Speak with Animals ติดตัวฟรีตลอดเวลา ไม่กิน prepared slot), **Primal Order (lv1, เลือก 1 อย่าง)**: Magician (cantrip เพิ่ม + bonus เท่า Wis mod ให้ Int(Arcana/Nature) check) หรือ Warden (martial weapon + medium armor prof), Wild Companion (lv2), Wild Shape (2 ใช้/วัน lv2, temp HP = Druid level ต่อครั้งที่แปลง), Wild Resurgence (lv5, แปลง spell slot ↔ Wild Shape use ได้อิสระ), Elemental Fury (lv7, เลือก Potent Spellcasting หรือ Primal Strike), Beast Spells (lv18), Archdruid (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Full spell slot lv1-9 ให้ magnitude ระดับ full caster มาตรฐาน (Moonbeam, Ice Storm, Sunbeam ในสาย damage/control ผสม) บวก Elemental Fury (lv7) ถ้าเลือก Primal Strike จะได้ extra 1d8 Cold/Fire/Lightning/Thunder ทุกครั้งที่ตีด้วยอาวุธ **หรือ**การโจมตีของ Beast form ตอน Wild Shape — เป็น class เดียวที่ดาเมจ baseline มีถึง 3 ช่องทางส่ง (spell/อาวุธ/สัตว์) พร้อมกัน [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Druid spell list แข็งไม่แพ้ Wizard ในสาย battlefield control แนวธรรมชาติ (Entangle lv1, Faerie Fire lv1, Spike Growth lv2, Plant Growth lv3, Wall of Thorns lv6, Insect Plague lv5) ครอบคลุมทั้ง restrain/บังคับพื้นที่/ลด mobility ศัตรู [M:3/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี free heal-on-demand ติด chassis แบบ Cleric's Divine Spark มีแค่ full spell list ที่เข้าถึง Cure Wounds/Goodberry ได้ (ต้องแลก slot กับสายอื่นเหมือนปกติ) buff เช่น Barkskin ก็ single-target [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Wild Shape ให้ temp HP เท่า Druid level ทุกครั้งที่แปลงร่าง (2 ครั้ง/วันตั้งแต่ lv2 ฟื้น 1/short rest) แล้วยังสลับไปใช้ HP pool ของ Beast form แทนของตัวเอง เท่ากับมี "บัฟเฟอร์กันดาเมจ" สองชั้นซ้อนกัน บวก Wild Resurgence (lv5) แปลง spell slot ↔ Wild Shape use ได้อิสระแบบไม่เสีย action ทำให้ยืด uptime ของบัฟเฟอร์นี้ได้ทั้งวัน แต่ต้อง commit เข้า Beast form ถึงจะได้ (เสีย spellcasting ระหว่างนั้นจนถึง lv18) [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Wild Shape เข้า/ออกด้วย Bonus Action, Wild Companion ให้เลือกจ่าย Wild Shape use หรือ spell slot เพื่อ summon familiar (ยืดหยุ่นเลือก resource ได้), Wild Resurgence (lv5) แปลง spell slot → Wild Shape use หรือกลับกันได้ **ไม่เสีย action เลย** ทำให้ resource pool 2 ก้อน (slot กับ shape) หนุนกันได้ทั้งวันแทนที่จะแยกขาดจากกัน [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Speak with Animals ติดตัวฟรีตลอดเวลาไม่กิน prepared slot (Druidic feature) บวก Magician (ถ้าเลือกใน Primal Order) ให้ cantrip เพิ่ม + bonus Wis mod กับ Arcana/Nature check และ Wild Shape เปิดให้แปลงเป็นสัตว์ที่ใช้ scout/สำรวจได้ (ว่าย/ปีน/lv8+บิน) โดยไม่ต้องพึ่ง spell แยก [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | Prepared spell list reset เต็มทุก Long Rest เหมือน Wizard บวกจุดเลือก build 2 จุดที่ไม่ผูก subclass เลย (Primal Order: Magician vs Warden, Elemental Fury: Potent Spellcasting vs Primal Strike) และ Wild Shape ให้ "เปลี่ยนร่างเป็นสิ่งมีชีวิตอื่นทั้งตัว" ซึ่งเป็นเครื่องมือปรับ role แบบที่ไม่มี class อื่นทำได้ (จากนักเวทย์เป็นสัตว์ tank/scout ได้ในเทิร์นเดียว) แม้ Beast form จะห้ามร่ายคาถาระหว่างนั้นจนกว่าจะถึง lv18 ก็ตาม [M:3/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (17)

**Class Baseline อ้างอิง**: Damage 6, Control 7, Support 3, Survivability 7, Action Economy 7, Utility 6, Versatility 8

ไม่มี Circle ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) หมายเหตุพิเศษ: Circle of the Wyrm (2014) มีฟีเจอร์ "Wild Shape เป็น Bonus Action แทน Action" ซึ่ง**เป็นค่า default อยู่แล้วใน baseline 2024** จึงไม่นับเป็นการเพิ่มคะแนน Action Economy — และ Circle of Mutation มีรายการ "Mutation Options" ที่ตัวไฟล์ข้อมูลไม่ระบุรายละเอียดครบ (แสดงแค่หัวข้อ) จึงให้คะแนนแบบระมัดระวังในแกนที่เกี่ยวข้อง (Survivability/Utility)

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Circle of Blood | A | GrimHollowPG24 | 8 (A) | 8 (A) | 6 (B) | 9 (S) | 8 (A) | 6 (B) | 8 (A) |
| Circle of Dreams | S | XGE 🕰️ | 6 (B) | 7 (A) | 8 (A) | 7 (A) | 8 (A) | 9 (S) | 9 (S) |
| Circle of Entropy | S | GrimHollowPG24 | 10 (S) | 8 (A) | 3 (C) | 8 (A) | 7 (A) | 6 (B) | 9 (S) |
| Circle of Mutation | B | GrimHollowPG24 | 8 (A) | 7 (A) | 3 (C) | 7 (A) | 8 (A) | 6 (B) | 8 (A) |
| Circle of Spores | S | TCE 🕰️ | 8 (A) | 7 (A) | 3 (C) | 9 (S) | 8 (A) | 6 (B) | 9 (S) |
| Circle of Stars | A | XPHB | 8 (A) | 8 (A) | 6 (B) | 8 (A) | 7 (A) | 6 (B) | 9 (S) |
| Circle of Stones | A | VSS 🕰️ | 6 (B) | 8 (A) | 7 (A) | 8 (A) | 8 (A) | 8 (A) | 8 (A) |
| Circle of the City | S | VSS 🕰️ | 6 (B) | 9 (S) | 3 (C) | 8 (A) | 7 (A) | 9 (S) | 9 (S) |
| Circle of the Deep | B | VSS 🕰️ | 8 (A) | 7 (A) | 5 (B) | 7 (A) | 7 (A) | 7 (A) | 8 (A) |
| Circle of the Fist | S | VSS 🕰️ | 9 (S) | 7 (A) | 3 (C) | 9 (S) | 9 (S) | 6 (B) | 8 (A) |
| Circle of the Land | A | XPHB | 7 (A) | 7 (A) | 6 (B) | 8 (A) | 8 (A) | 7 (A) | 9 (S) |
| Circle of the Moon | S | XPHB | 9 (S) | 8 (A) | 6 (B) | 10 (S) | 8 (A) | 6 (B) | 10 (S) |
| Circle of the Sea | S | XPHB | 8 (A) | 8 (A) | 6 (B) | 9 (S) | 8 (A) | 7 (A) | 9 (S) |
| Circle of the Shepherd | A | XGE 🕰️ | 6 (B) | 7 (A) | 9 (S) | 8 (A) | 8 (A) | 6 (B) | 8 (A) |
| Circle of the Wyrm | S | VSS 🕰️ | 9 (S) | 7 (A) | 6 (B) | 9 (S) | 7 (A) | 6 (B) | 9 (S) |
| Circle of Vermin | B | VSS 🕰️ | 7 (A) | 7 (A) | 3 (C) | 9 (S) | 7 (A) | 7 (A) | 8 (A) |
| Circle of Wildfire | S | TCE 🕰️ | 9 (S) | 7 (A) | 7 (A) | 8 (A) | 8 (A) | 6 (B) | 9 (S) |

---

### Circle of Blood (GrimHollowPG24)

**Overall**: A — Survivability เป็น S (9/10) บวกขยับขึ้นอีก 4 axis กลางๆ (Damage/Control/Support/AE) ไม่มี S ตัวที่สอง


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Rite of the Blood Moon (bonus action WS use, 10 นาที) เพิ่ม extra necrotic damage ทุกครั้งที่ตีโดน (1d6→2d6 ที่ lv10) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 8/10 (A) | Circle of Blood Spells รับประกัน Dominate Person ติดตัวถาวรตั้งแต่ lv9 — hard-CC ระดับสูงที่ baseline ไม่มี [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | Blood Boon (reaction เมื่อศัตรูตายใกล้ๆ) คืน Hit Die ให้ตัวเอง + แจก temp HP ให้ ally บวก Exsanguinate (lv14, แจกหลายเป้าพร้อมกัน) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Rite of Blood Moon ให้ temp HP 3×level ทุกครั้งที่เข้า + Blood Lust (lv10, resistance B/P/S ระหว่างฤทธิ์) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Rite of Blood Moon แถม Dash ฟรีเป็น bonus action บวก Blood Boon เป็น reaction ที่ไม่แย่ง action หลัก [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | ผสม bruiser-melee/support(temp HP)/control(dominate) ในธีมเลือดเดียว [M:2/4] [R:3/3] [B:3/3] |

### Circle of Dreams (XGE 🕰️)

**Overall**: S — Utility และ Versatility เป็น S ทั้งคู่ บวก Support กระโดด +5 (C→A) แก้จุดอ่อนใหญ่สุดของ baseline ไปด้วย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Balm of the Summer Court (bonus action, pool d6 เท่า level) ฮีล+แจก temp HP ให้ ally ในระยะ 120ft — ยกระดับ Support จาก baseline ที่แทบไม่มีอะไรเลยขึ้นมาเป็น healer เต็มตัว [M:3/4] [R:3/3] [B:2/3] |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ (Hearth เป็น camp utility) = เท่า baseline |
| **Action Economy** | 8/10 (A) | Hidden Paths (bonus action teleport ตัวเอง 60ft, Wis mod ครั้ง/วัน) เป็น mobility ที่ไม่แย่ง action หลัก [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 9/10 (S) | Hearth of Moonlight/Shadow (sanctuary ระหว่างพัก) + Hidden Paths (teleport ally) + Walker in Dreams (lv14, แคส Dream/Scrying/Teleportation Circle ฟรี 1/short rest) — utility นอกคอมแบตครบวงจรที่สุดใน Circle ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | ผสม healer/traveler/scout ในตัวเดียว [M:3/4] [R:3/3] [B:3/3] |

### Circle of Entropy (GrimHollowPG24)

**Overall**: S — Damage พุ่งเป็น 10/10 (S เต็มสเกล) บวก Versatility เป็น S ด้วย แม้ Support (จุดอ่อนสุดของ baseline) จะยังไม่ถูกแตะเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Ruin Incarnate (bonus action WS use) ให้ตี**สองครั้ง**แทนหนึ่งครั้งทุกครั้งที่ใช้ Attack action (**สามครั้ง**ที่ lv14) บวก Ruinous Smite (extra necrotic สเกลตาม spell slot) บวก Elemental Cataclysm (AoE เผาผลาญ+Vulnerability) — magnitude ดาเมจสูงที่สุดใน Circle ที่ทำมา [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Elemental Cataclysm ติด Vulnerability ต่อดาเมจธาตุที่เลือก บวก Shake the Earth (lv10, AoE บังคับ Dex save หรือ Prone) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Ironskin Armor (ระหว่าง Ruin Incarnate) ยก AC เป็น 17+Wis mod ถ้าสูงกว่าเดิม [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | การตีเพิ่มมาจาก Attack action เดิม ไม่ใช่ extra-action ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 9/10 (S) | Catastrophic Power ให้เลือก 1 ใน 3 โหมด (AoE elemental/single-target necrotic/weapon mastery) ทุกครั้งที่พัก ปรับกลยุทธ์ได้ตามสถานการณ์ [M:3/4] [R:3/3] [B:3/3] |

### Circle of Mutation (GrimHollowPG24)

**Overall**: B — ขยับแค่ 2 axis เล็กน้อย (Damage/Action Economy) ไม่มี peak ถึง S เลย แคบที่สุดในกลุ่มร่วมกับ Circle of the Deep


> **หมายเหตุข้อมูล**: รายการ "Mutation Options" เต็มรูปแบบไม่ปรากฏในไฟล์ข้อมูล (มีแค่หัวข้อ) จึงให้คะแนน Survivability/Utility แบบระมัดระวังจากฟีเจอร์ที่ยืนยันได้เท่านั้น

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Predator's Strike (+2 ดาเมจถาวรทุกครั้งที่ตีด้วย Beast form) บวก Apex Predator (lv14, extra 2d10 force 1 ครั้ง/เทิร์น) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ที่ยืนยันได้ (Mutation list เต็มไม่ปรากฏ) = เท่า baseline |
| **Support** | 3/10 (C) | Mutate Beasts (lv14) ใช้กับ Beast ของคนอื่นได้ แต่เป็น utility เฉพาะทางแคบ ไม่นับเป็น ally-support ที่ชัดเจน = เท่า baseline |
| **Survivability** | 7/10 (A) | ไม่มี defense feature ที่ยืนยันได้ชัดเจนนอกเหนือ Mutation ที่ไม่ทราบรายละเอียด = เท่า baseline |
| **Action Economy** | 8/10 (A) | Unpredictable ให้ Dash/Disengage/Influence เป็น bonus action ได้ทุกเทิร์นระหว่าง Wild Shape [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Unnerving Aura (Advantage Deception/Intimidation/Animal Handling) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | Mutate Shape ให้ปรับแต่งความสามารถระหว่าง Wild Shape ได้แบบ real-time โดยแลก spell slot = เท่า baseline (ยืดหยุ่นแต่ไม่ทราบรายละเอียดเต็มเพื่อยืนยัน bump) |

### Circle of Spores (TCE 🕰️)

**Overall**: S — Survivability และ Versatility เป็น S ทั้งคู่ บวก Damage/Action Economy ขยับตาม แม้ Support จะยังไม่ถูกแตะ


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Halo of Spores (reaction proximity dmg, 1d4→1d10) เพิ่มเป็นทอย 2 ครั้งระหว่าง Symbiotic Entity บวก extra 1d6 necrotic ทุกครั้งที่ตีด้วยอาวุธ บวก Spreading Spores (lv10, AoE cube ต่อเนื่อง) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ (ธีมดาเมจ/summon) = เท่า baseline |
| **Support** | 3/10 (C) | Fungal Infestation สร้าง zombie ต่อสู้เพื่อตัวเอง ไม่ใช่ ally-support โดยตรง = เท่า baseline |
| **Survivability** | 9/10 (S) | Symbiotic Entity ให้ temp HP 4×level ทุกครั้งที่ใช้ บวก Fungal Body (lv14, immune blinded/deafened/frightened/poisoned + ยกเลิกคริติคอลที่โดน) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Halo of Spores เป็น reaction ฟรี บวก Spreading Spores เป็น bonus action สร้างโซนดาเมจต่อเนื่อง [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 9/10 (S) | ผสม necromancer(zombie summon)/damage(spore)/tank(temp HP) ในธีมเดียว [M:3/4] [R:3/3] [B:3/3] |

### Circle of Stars (XPHB)

**Overall**: A — Versatility เป็น S บวก Support กระโดด +3 (C→B) และขยับตามอีก 3 axis กว้างพอสมควรแต่มีแค่ S เดียว


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Archer constellation (bonus action ทุกเทิร์นระหว่าง Starry Form) ยิง ranged spell attack 1d8+Wis→2d8+Wis ที่ lv10 [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Cosmic Omen แบบ Woe (reaction, Wis mod ครั้ง/วัน) ลบ 1d6 จาก d20 test ของศัตรูที่เห็นในระยะ 30ft — debuff ที่ baseline ไม่มี [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 6/10 (B) | Chalice constellation (บวก HP ให้ ally ทุกครั้งที่แคส heal spell) + Cosmic Omen แบบ Weal (reaction บวก 1d6 ให้ d20 test ของ ally) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 8/10 (A) | Dragon constellation (ปัดผลเซฟ Int/Wis/Con-concentration ต่ำเป็น 10) บวก Full of Stars (lv14, resistance B/P/S ระหว่าง Starry Form) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Cosmic Omen ทำงานผ่าน reaction ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 6/10 (B) | Star Map ให้แคส Guiding Bolt ฟรีเป็นหลัก เน้นคอมแบต ไม่ใช่ utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 9/10 (S) | เลือกได้ 3 constellation (Archer=ดาเมจ/Chalice=support/Dragon=defense) สลับได้ทุกเทิร์นตั้งแต่ lv10 — ยืดหยุ่นเปลี่ยน role รายเทิร์นได้จริง [M:3/4] [R:3/3] [B:3/3] |

### Circle of Stones (VSS 🕰️)

**Overall**: A — ไม่มี axis ไหนถึง S เลย แต่ขยับขึ้น 5 ใน 7 axis พร้อมกัน (Control/Support/Survivability/AE/Utility) กว้างที่สุดในกลุ่มที่ไม่มี S peak


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 8/10 (A) | Warding Stones (แคส Magic Circle ฟรีในเขต henge) เป็นเครื่องมือกัน/ควบคุมสิ่งมีชีวิตนอกโลกได้จริง [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 7/10 (A) | Raise Henge แจก temp HP ให้ ally ที่เลือกทุกครั้งที่เริ่มเทิร์นในเขต henge — AoE support ต่อเนื่องที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Raise Henge แจก temp HP ให้ตัวเองด้วยทุกเทิร์น + three-quarters cover จากหิน [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Great Henge (lv14) ให้ henge ถือ Concentration แทนตัวเอง เท่ากับ concentrate spell ได้ 2 ตัวพร้อมกัน — ทะลุ limitation ปกติของเกม [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Ley Passage (lv10) เชื่อม henge เป็นเครือข่าย teleport ระยะไกลข้ามแผนที่ [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เปิด role "ผู้พิทักษ์จุดยึด" (defense/travel-node/control) ที่ต่างจาก mobile caster ทั่วไป แต่ผูกกับสถานที่ทำให้ breadth จำกัดกว่าตัวเลือกอื่น [M:2/4] [R:3/3] [B:3/3] |

### Circle of the City (VSS 🕰️)

**Overall**: S — 3 axis เป็น S พร้อมกัน (Control, Utility, Versatility) มากที่สุดในกลุ่มร่วมกับ Fist/Moon/Wyrm แม้ Support จะยังไม่ถูกแตะเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีมเน้น control/utility ล้วน) = เท่า baseline |
| **Control** | 9/10 (S) | Cobbleshift (AoE difficult terrain + Prone save + สร้างกำแพงกำบัง) บวก Breath of Smog (reaction AoE poisoned) — battlefield control ในเมืองที่ครบเครื่องมากที่สุดใน Circle ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 3/10 (C) | กำแพง/terrain ช่วยทีมทางอ้อมเท่านั้น ไม่ใช่ ally-support โดยตรง = เท่า baseline |
| **Survivability** | 8/10 (A) | Breath of Smog เป็น reaction ตอบโต้เมื่อโดนดาเมจ (poison ผู้โจมตี + บดบังพื้นที่) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 9/10 (S) | Streettalk (Investigation adv + thieves' cant) + Whispers of Walls (ตรวจจับ humanoid ในตึก) + Passwall ฟรี — utility สำรวจ/แทรกซึมเมืองที่กว้างที่สุดใน Circle ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | เปิด role "ผู้เชี่ยวชาญเมือง" ที่ต่างจาก Druid ป่าเถื่อนทั่วไปโดยสิ้นเชิง ผสม control+utility+defense [M:3/4] [R:3/3] [B:3/3] |

### Circle of the Deep (VSS 🕰️)

**Overall**: B — ขยับแค่ 3 axis เล็กน้อย (Damage/Support/Utility) ไม่มี peak ถึง S เลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Vortex Attack (lv6, extra attack + ถ้าอยู่ใต้น้ำ/HP ต่ำกว่าครึ่งโจมตีทุกเป้ารอบตัวได้) บวก Davy Jones' Locker (lv14, extra 1d8 + ทะลุ resistance) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) | Ocean's Ally (lv10, summon aquatic beast CR3 มาช่วยรบ 1/rest) เป็น support เฉพาะทางแคบ (ใต้น้ำเท่านั้น) [M:1/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | Aquatic เป็น mobility/environment adaptation ไม่ใช่ mitigation โดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | ไม่มี economy gain ใหม่ = เท่า baseline |
| **Utility** | 7/10 (A) | Aquatic (หายใจใต้น้ำ+ swim speed ถาวร ขยายไปถึง Wild Shape form ด้วย) เป็น environmental utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เฉพาะทางใต้น้ำ/ทะเลสูงมาก แต่ในบริบทอื่นไม่ได้ขยาย breadth เกินปกติ = เท่า baseline |

### Circle of the Fist (VSS 🕰️)

**Overall**: S — 3 axis เป็น S พร้อมกัน (Damage, Survivability, Action Economy) แม้ Support/Control/Utility จะนิ่งสนิททั้งหมดก็ตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Untamed Fury ให้ตีหมัดเพิ่มได้ผ่าน bonus action โดยแลก spell slot (สูงสุด 3 ครั้งต่อเทิร์นถ้าแลก slot lv5+) บวก Extra Attack (lv6) — multi-attack unarmed ที่ทะลุเพดานปกติของคลาส [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ที่ชัดเจน (Mountain's Might แค่ advantage เมื่อ grapple) = เท่า baseline |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Primal Infusion ให้ temp HP มหาศาล (4×level+Wis mod) + Untamed Fury AC=10+Dex+Wis + Savage Instinct's Tree's Resilience (reaction ลดดาเมจด้วย Wis mod) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Untamed Fury แลก spell slot เพื่อโจมตีเพิ่มผ่าน bonus action ได้สูงสุด 3 ครั้ง — economy gain สูงที่สุดใน Circle ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | เป็น monk-hybrid melee เฉพาะทางที่ทรงพลังมาก แต่โฟกัสแคบอยู่ที่การชกหมัด ไม่ขยาย role อื่น = เท่า baseline |

### Circle of the Land (XPHB)

**Overall**: A — Versatility เป็น S บวกขยับขึ้นอีก 5 axis กลางๆ (Damage/Support/Survivability/AE/Utility) กว้างมากแต่มีแค่ S เดียว


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Land's Aid (action WS use) ดาเมจ necrotic AoE 2d6→4d6 พร้อมฮีลไปด้วยในการใช้เดียว [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่โดยตรง (Circle Spells มี control spell ตาม terrain แต่เป็นแค่ prepared list ปกติ) = เท่า baseline |
| **Support** | 6/10 (B) | Land's Aid ฮีล ally พร้อมกับดาเมจในการใช้เดียวกัน บวก Nature's Sanctuary (lv14, AoE cover+resistance ให้ทีม) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 8/10 (A) | Nature's Ward (poison immune + resistance ธาตุตาม terrain) + Natural Recovery (ฟื้น spell slot ตอน short rest) [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Natural Recovery แคส circle spell ฟรี 1/วัน + ฟื้น spell slot ตอน short rest โดยไม่เสีย action [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Circle Spells ตาม terrain ให้ utility spell ติดตัวถาวร (เช่น Tree Stride, Freedom of Movement) [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | สลับ terrain type ได้ทุก Long Rest ปรับ spell package ทั้งชุดตามสถานการณ์แคมเปญ [M:3/4] [R:3/3] [B:3/3] |

### Circle of the Moon (XPHB)

**Overall**: S — 3 axis เป็น S พร้อมกัน (Damage, Survivability 10/10 เต็ม, Versatility 10/10 เต็ม) บวกขยับตามอีก 3 axis กว้างและแรงที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Circle Forms ยก CR ของ Wild Shape form ขึ้นตามเลเวล + Improved Lunar Radiance (lv14, extra 2d10 radiant 1/เทิร์น) — ทำให้ตัวสัตว์เป็นแหล่งดาเมจหลักได้จริง [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | แคส Moonbeam และ control spell อื่นได้**ระหว่างอยู่ใน Wild Shape** (ปกติ baseline ห้ามแคสระหว่างแปลงร่างจนถึง lv18) — ปลดล็อกการเข้าถึง control spell list ทั้งชุดเร็วกว่ามาก [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 6/10 (B) | Mass Cure Wounds ติดตัวถาวร + แคสฮีลได้ระหว่าง Wild Shape เช่นกัน [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 10/10 (S) | Circle Forms ให้ temp HP 3×level **ทุกครั้ง**ที่แปลงร่าง (ไม่ใช่ครั้งเดียว) + AC floor 13+Wis + CR สูงขึ้นตามเลเวล — Wild Shape กลายเป็น tank form เต็มรูปแบบที่ baseline เข้าไม่ถึง [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Moonlight Step (lv10, bonus action teleport 30ft + Advantage โจมตีครั้งถัดไป, Wis mod ครั้ง/วัน) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 10/10 (S) | Wild Shape กลายเป็นฟอร์มต่อสู้ที่สมบูรณ์แบบ (ดาเมจ+ป้องกัน+แคสสเปลได้) ใช้ซ้ำได้ไม่จำกัดจำนวนครั้งในทางปฏิบัติ — shapeshifter ที่สมบูรณ์แบบที่สุดในเกม [M:4/4] [R:3/3] [B:3/3] |

### Circle of the Sea (XPHB)

**Overall**: S — ขยับขึ้นครบทั้ง 7 axis จาก baseline ไม่เหลือแกนไหนนิ่งเลย บวก 2 axis เป็น S (Survivability, Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Wrath of the Sea (bonus action ทุกเทิร์นระหว่างฤทธิ์ 10 นาที) ดาเมจ cold สเกลตาม Wis mod + ผลักเป้า [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Wrath of the Sea ผลักเป้า Large หรือเล็กกว่าไป 15ft ทุกเทิร์น — forced-movement ที่ baseline ไม่มี [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 6/10 (B) | Oceanic Gift (lv14) แบ่งฤทธิ์ Wrath of the Sea ทั้งชุด (รวมความสามารถโจมตี) ให้ ally ใช้เองได้ [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Stormborn (lv10, fly speed + resistance cold/lightning/thunder พร้อมกัน 3 ธาตุ) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Wrath of the Sea ให้ดาเมจ+ผลักซ้ำได้ทุกเทิร์นผ่าน bonus action เดียวตลอด 10 นาที [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Aquatic Affinity (swim speed) + circle spell ที่มี Water Breathing เป็น niche utility [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | ผสม blaster/mobility(บิน+ว่ายน้ำ)/support(แบ่งฤทธิ์) ผ่านกลไก emanation เดียว [M:3/4] [R:3/3] [B:3/3] |

### Circle of the Shepherd (XGE 🕰️)

**Overall**: A — Support กระโดด +6 (3→9, C→S) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงที่สุดในกลุ่ม แต่ breadth แคบ (มีแค่ Support/Survivability/AE ที่ขยับ)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม support/summoner ล้วน) = เท่า baseline |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Spirit Totem (bonus action, ไม่เสีย Wild Shape use) ให้เลือก Bear(temp HP+adv Str)/Hawk(adv โจมตีของ ally)/Unicorn(adv detect+ฮีลสะท้อน) บวก Guardian Spirit (lv10, ฮีล summoned creature ในเขต totem) บวก Faithful Summons (lv14, summon 4 ตัวป้องกันฉุกเฉินเมื่อล้ม) — support hub ที่ครบเครื่องที่สุดใน Circle ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Bear Spirit แจก temp HP ให้ตัวเองด้วย + Faithful Summons เป็นระบบป้องกันฉุกเฉินเมื่อ HP หมด [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Spirit Totem เป็น resource แยกจาก Wild Shape/spell slot โดยสิ้นเชิง เท่ากับได้เครื่องมือเสริมฟรีที่ไม่แย่ง resource เดิม [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Speech of the Woods (สื่อสารสัตว์) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | โฟกัส support/summoner เฉพาะทางสุดขั้ว ไม่ขยาย role อื่น = เท่า baseline |

### Circle of the Wyrm (VSS 🕰️)

**Overall**: S — 3 axis เป็น S พร้อมกัน (Damage, Survivability, Versatility) บวก Support ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Breath Weapon (แลก spell slot, AoE cone สเกลตาม slot level) บวก Infused Strikes (extra 1d6 ธาตุทุกครั้งที่ตีด้วย Wild Shape) บวก Wyrm Perfection (lv14, ใช้ได้แม้ไม่แปลงร่าง) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ (ธีม breath weapon เป็นดาเมจล้วน) = เท่า baseline |
| **Support** | 6/10 (B) | Primordial Aura (lv10, bonus action AoE) แจก resistance ธาตุที่เลือกให้ ally + ฮีล 1 เป้าทุกเทิร์นเมื่อสร้างดาเมจธาตุนั้น [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Draconic Wild Shape ให้ resistance B/P/S ระหว่างแปลงร่าง + Fangs and Flight (บิน หนีได้) + Primordial Aura ให้ resistance ตัวเองด้วย [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Draconic Wild Shape ระบุว่าเข้า Wild Shape เป็น Bonus Action แทน Action แต่**baseline 2024 ใช้ Bonus Action อยู่แล้ว** จึงไม่นับเป็นการเพิ่ม = เท่า baseline |
| **Utility** | 6/10 (B) | Dragonkin (ภาษา Draconic) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 9/10 (S) | ผสม blaster(breath weapon AoE)/tank(resistance)/support(healing aura) ในธีมมังกรเดียว [M:3/4] [R:3/3] [B:3/3] |

### Circle of Vermin (VSS 🕰️)

**Overall**: B — Survivability เป็น S แต่ breadth แคบมาก (มีแค่ Damage/Utility ที่ขยับตามเล็กน้อย) Support/Control/AE/Versatility นิ่งสนิท


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Infested ตอบโต้ดาเมจ 1d4 piercing อัตโนมัติทุกครั้งที่โดนตีประชิด (ไม่เสีย resource) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 7/10 (A) | Infested ลดค่าโจมตีครั้งถัดไปของศัตรูที่ตีเราด้วยดาเมจที่มันสร้าง เป็น soft-debuff เล็กน้อย = ใกล้เท่า baseline |
| **Support** | 3/10 (C) | ฝูงสัตว์ป้องกันตัวเองเป็นหลัก ไม่ใช่ ally-support โดยตรง = เท่า baseline |
| **Survivability** | 9/10 (S) | Lord of the Low ให้ +2 AC ขณะฝูงอยู่ในช่อง + เลือกให้ฝูงรับดาเมจแทนตัวเองได้ — เท่ากับมี HP pool สำรองที่ baseline ไม่มี [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Infested ทำงานแบบ passive ไม่เสีย action = เท่า baseline |
| **Utility** | 7/10 (A) | Tremorsense (10ft) + Plague Carrier (lv10, immune โรค/พิษ + เก็บเชื้อมาแพร่ใส่ผู้โจมตี) เป็น utility เฉพาะทางที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | โฟกัส tank-via-pet + passive retaliation เฉพาะทาง ไม่ขยาย role อื่นมาก = เท่า baseline |

### Circle of Wildfire (TCE 🕰️)

**Overall**: S — Damage และ Versatility เป็น S ทั้งคู่ บวก Support กระโดด +4 (C→A) และขยับตามอีก 2 axis กว้างพอสมควร


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Summon Wildfire Spirit (ตัวช่วยรบอิสระที่ดาเมจได้เอง + AoE fire dmg ตอนปรากฏตัว) บวก Enhanced Bond (lv6, +1d8 เข้าทุก damage/healing roll ธาตุไฟ) บวก Cauterizing Flames (lv10, dmg/heal 2d10+Wis) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 7/10 (A) | Circle Spells มี Revivify/Mass Cure Wounds/Aura of Life ติดตัวถาวร + Enhanced Bond บวก dice เข้า healing roll ด้วย + Cauterizing Flames เลือกฮีลแทนดาเมจได้ [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Blazing Revival (lv14) ให้วิญญาณไฟสละตัวเองฟื้น HP ครึ่งนึงให้ตัวเองอัตโนมัติเมื่อร่วงเหลือ 0 HP [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | สั่งวิญญาณไฟให้ลงมือได้ด้วย bonus action เดียว เท่ากับได้นักสู้เพิ่มอีกคนในทีม [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 9/10 (S) | ผสม pet-summoner/blaster/healer ในตัวเดียวผ่านวิญญาณไฟที่ควบคุมได้ [M:3/4] [R:3/3] [B:3/3] |
