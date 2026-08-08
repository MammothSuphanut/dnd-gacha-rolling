# Necromancer — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 14 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Necromancer](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 14 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Necromancer, 2024)

Floor 0-10 ต่อ axis ของ **Necromancer เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d6, spellcasting ability Int, full caster progression, saving throw proficiency Con + Int, ไม่มี armor proficiency, weapon proficiency simple เท่านั้น, Charnel Touch (lv1, pool 5×level แต้ม แปลงเป็นดาเมจ melee spell attack ได้ตามต้องการ ทะลุ 2 เท่าเมื่อ crit), Dead Space (lv2), **Thralls (lv2, กองทัพ Undead ถาวรที่คุมได้ไม่จำกัดวัน)**, Dark Arcana (lv3, แลก spell slot เติม Charnel Touch), Animate Dead ติดตัวฟรี+cast เร็วขึ้น (lv5), Critical Spellcasting (lv5, ศัตรู fail save อัตโนมัติเมื่อทอย 1 + spell attack crit ที่ 19-20), Improved Thralls (lv7), Improved Critical Spellcasting (lv14), Undying Servitude (lv18), Lichdom (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Charnel Touch ให้ยิง melee spell attack ดาเมจปรับได้เองสูงสุดเท่า 5×Proficiency Bonus ต่อครั้ง (ทะลุ 2 เท่าถ้า crit) จาก pool 5×level ที่ฟื้นเต็มทุก long rest และเติมเพิ่มได้อีกด้วย Dark Arcana บวก Critical Spellcasting (lv5) ที่ทำให้ spell attack crit ได้ตั้งแต่ 19-20 (ถี่กว่าปกติ 2 เท่า) — ที่สำคัญที่สุดคือ **Thralls เป็นกองทัพ Undead ถาวรที่โจมตีเองทุกรอบแบบไม่กิน resource หรือ action ของเราเลย** เพิ่มดาเมจรวมของทีมได้มหาศาลแบบไม่มี class อื่นเทียบได้ [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Full spell slot lv1-9 ให้เข้าถึง necromancy-flavored control spell ได้ (ไม่มีรายละเอียด spell list เฉพาะของ Necromancer มาตรวจสอบเพิ่ม) magnitude/reliability ประเมินเทียบเท่า full caster ทั่วไปที่เน้นสาย control ปานกลาง [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally (มีชีวิต) ติด class baseline เลย — Thralls เป็นกองกำลังส่วนตัวของ Necromancer ไม่ใช่ฟีเจอร์เสริม ally ที่มีชีวิตในทีมโดยตรง |
| **Survivability** | 3/10 (C) | HD d6 (ต่ำสุดเท่า Wizard/Sorcerer) ไม่มี armor proficiency ติดตัว saving throw proficiency Con (กัน concentration break ได้ดี) กับ Int (หายาก) ไม่มี resistance/self-heal ติด baseline เลย — Thralls ช่วยกันดาเมจได้แค่ทางอ้อม (ยืน block/ล่อเป้า) ไม่ใช่กลไก defense ของตัวเองโดยตรง [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | **Thralls ลงมือเองทุกรอบโดยไม่กิน action ของ Necromancer เลยแม้แต่นิดเดียว** เทียบเท่าได้ turn เพิ่มฟรีจากกองทัพทั้งหมด (คงอยู่ถาวรไม่ต้อง resummon ทุกวัน) บวก Dark Arcana (lv3) แปลง spell slot → Charnel Touch point ด้วย Bonus Action และ Undying Servitude (lv18) เซฟ thrall ได้แบบ reaction ฟรี [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | Dead Space (lv2) เป็น extradimensional storage สำหรับศพ/กระดูก/thrall เป็น utility เฉพาะทางแคบมาก ไม่มี skill bonus หรือ ritual casting ที่ยืนยันได้ [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Thralls มีหลายชนิดให้เลือกคุม (Bloodlurk/Bone Beast/Deadnaught/Gorger ฯลฯ แต่ละตัวมี trait ต่างกัน เช่น climb speed, pack tactics, regeneration) ปรับ composition กองทัพให้เข้ากับสถานการณ์ได้ บวก Dark Arcana ที่แปลง spell slot ↔ Charnel Touch point ได้ตามต้องการ [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (14)

**Class Baseline อ้างอิง**: Damage 8, Control 6, Support 0, Survivability 3, Action Economy 7, Utility 3, Versatility 6

ทั้ง 14 subclass มาจากไฟล์เดียวกัน (`Valda's Spire of Secrets 2024`, ไม่มี 🕰️ orphan เลย) ทุกตัวมีฟีเจอร์ lv20 "[Lichdom]" เป็น capstone เสริม (ปลดล็อกช้ามากแต่ยังนับรวมในคะแนน) ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ

| Subclass | Overall | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Black Rider | A | 10 (S) | 6 (B) | 0 (D) | 8 (A) | 9 (S) | 3 (C) | 8 (A) |
| Blood Ascendant | B | 8 (A) | 8 (A) | 0 (D) | 7 (A) | 7 (A) | 5 (B) | 8 (A) |
| Corpse Florist | A | 9 (S) | 8 (A) | 0 (D) | 6 (B) | 8 (A) | 3 (C) | 8 (A) |
| Crone | B | 8 (A) | 8 (A) | 3 (C) | 3 (C) | 7 (A) | 6 (B) | 7 (A) |
| Dead Mist Acolyte | B | 8 (A) | 6 (B) | 0 (D) | 8 (A) | 7 (A) | 5 (B) | 7 (A) |
| Death Knight | A | 10 (S) | 6 (B) | 0 (D) | 8 (A) | 9 (S) | 3 (C) | 8 (A) |
| Necrodancer | S | 9 (S) | 8 (A) | 5 (B) | 9 (S) | 10 (S) | 3 (C) | 9 (S) |
| Overlord | A | 9 (S) | 8 (A) | 0 (D) | 6 (B) | 8 (A) | 4 (C) | 8 (A) |
| Pale Master | A | 10 (S) | 8 (A) | 0 (D) | 5 (B) | 8 (A) | 3 (C) | 7 (A) |
| Pharaoh | S | 9 (S) | 6 (B) | 9 (S) | 3 (C) | 7 (A) | 5 (B) | 8 (A) |
| Plague Lord | B | 9 (S) | 8 (A) | 0 (D) | 3 (C) | 8 (A) | 3 (C) | 7 (A) |
| Reanimator | A | 9 (S) | 7 (A) | 5 (B) | 4 (C) | 7 (A) | 5 (B) | 8 (A) |
| Reaper | A | 9 (S) | 6 (B) | 0 (D) | 8 (A) | 7 (A) | 6 (B) | 7 (A) |
| Toymaker | A | 10 (S) | 7 (A) | 0 (D) | 3 (C) | 9 (S) | 3 (C) | 7 (A) |

---

### Black Rider

**Overall**: A — Damage และ Action Economy เป็น S ทั้งคู่ บวก Survivability กระโดด +5 (C→A) และ Versatility ขยับตาม แต่ Support/Control/Utility นิ่งสนิท


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Extra Attack (lv6) เปิดช่องทางดาเมจอาวุธเต็มรูปแบบที่ baseline ไม่มีเลย (Necromancer ปกติมีแค่ spell attack) และยังใช้คู่กับ Charnel Touch ผ่าน bonus action ได้ในเทิร์นเดียวกัน [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Charnel Shield (reaction ลดดาเมจด้วย Charnel pool) + Corpse Cavalry (light/medium armor+shield จาก no-armor ของ baseline + Int-AC) + ม้าโครงกระดูกเป็นร่างสำรองรับความเสี่ยง [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Charnel Strike (Charnel Touch เป็น bonus action ระหว่าง Attack action) + ม้าตีเองผ่าน reaction ได้ที่ lv6 [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | Hybrid เมลี-caster เต็มรูปแบบ (อาวุธ+spell+ม้า) — พลิกโฉม Necromancer ที่ปกติเป็น caster ล้วน [M:2/4] [R:3/3] [B:3/3] |

### Blood Ascendant

**Overall**: B — ขยับขึ้น 4 axis แบบกลางๆ (Control/Survivability/Utility/Versatility) ไม่มี peak ถึง S เลยสักตัว


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่โดยตรง (ธีม charm/self-sustain) = เท่า baseline |
| **Control** | 8/10 (A) | Blood Ascendant Spells รับประกัน Sleep/Hypnotic Pattern/Dominate Person ติดตัวถาวร [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Charnel Drain (ฮีลตัวเองเมื่อฆ่าด้วย Charnel Touch) + Vampiric Transformation (lv6, resistance B/P/S + Advantage Str/Dex/Con save ในร่างหมอก/ค้างคาว) [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 5/10 (B) | Vampiric Transformation (ร่างหมอกลอดผ่านช่องแคบ+บินได้) เป็น utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | ผสม charm-control/self-sustain/shapeshift ในธีมแวมไพร์ [M:2/4] [R:3/3] [B:3/3] |

### Corpse Florist

**Overall**: A — Damage เป็น S บวกขยับขึ้นอีก 4 axis กลางๆ (Control/Survivability/AE/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Rotten Seed (lv6, bonus action ปลูกเมล็ด DoT necrotic 1d8→1d12 ทุกต้นเทิร์นของเป้า) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Charnel Entangle (Restrained เมื่อ Charnel Touch สร้างดาเมจ 5+) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | Rotten Seed ให้ temp HP ตัวเองเท่าดาเมจที่ DoT สร้างทุกเทิร์น [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Rotten Seed เป็น bonus action ที่ให้ผลดาเมจ+ฮีลต่อเนื่องหลายเทิร์นจากการลงทุนครั้งเดียว [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 8/10 (A) | ผสม DoT/control/self-sustain ในธีมพืชกินซาก [M:2/4] [R:3/3] [B:3/3] |

### Crone

**Overall**: B — ขยับขึ้น 4 axis (Control/Support/Utility/Versatility) แต่ Survivability (จุดอ่อนสุดของ baseline) ไม่ถูกแตะเลย ไม่มี peak S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (คำสาปเป็น debuff ไม่ใช่ดาเมจ) = เท่า baseline |
| **Control** | 8/10 (A) | Charnel Curse (ลบ 1d6 จากทุก d20 test ของเป้า นาน 1 นาทีแบบ recurring save) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | Witch's Cauldron (lv6, ปรุงยาที่แจก ally ได้ เช่น Potion of Healing/Resistance) [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 3/10 (C) | ไม่มี feature ป้องกันตัวเองใหม่โดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 6/10 (B) | Witch's Cauldron (ยาหลากชนิด) + Flying Broom (lv20, บิน 60ft) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผสม curse/potion-crafting/utility ในธีมแม่มด [M:2/4] [R:2/3] [B:3/3] |

### Dead Mist Acolyte

**Overall**: B — Survivability กระโดด +5 (C→A) บวก Utility/Versatility ขยับเล็กน้อย แต่ Damage/Control/Support/AE นิ่งสนิททั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่โดยตรง (ธีม self-sustain) = เท่า baseline |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Gaseous Escape (lv6, reaction กลายเป็นหมอกลดทอนดาเมจที่กำลังจะโดน) + Mistborne Regeneration (ฮีลตัวเองด้วย Charnel point) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 5/10 (B) | Fog Cloud/Misty Step/Gaseous Form ติดตัวถาวร + Charnel Consumption (สลับจ่าย HP แทน Charnel point ได้) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญหลบหลีก/self-sustain เฉพาะทาง [M:2/4] [R:2/3] [B:3/3] |

### Death Knight

**Overall**: A — รูปแบบเดียวกับ Black Rider เป๊ะ — Damage/Action Economy เป็น S ทั้งคู่ บวก Survivability/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Extra Attack (lv6) เปิดช่องทางดาเมจอาวุธเต็มรูปแบบเหมือน Black Rider — บวก cantrip แทนการตีได้ 1 ครั้ง [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Charnel Resilience (temp HP ทุกครั้งที่ Charnel Touch สร้างดาเมจ Necrotic) + Combat Research (light/medium armor+shield + Int-AC) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Charnel Strike (Charnel Touch เป็น bonus action) + Overcharged Thralls (lv10, คืน Charnel point เมื่อ thrall ตาย/ถูกปล่อย) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 8/10 (A) | Hybrid เมลี-caster เต็มรูปแบบเหมือน Black Rider [M:2/4] [R:3/3] [B:3/3] |

### Necrodancer

**Overall**: S — 4 axis เป็น S พร้อมกัน (Damage, Survivability, Action Economy, Versatility) มากที่สุดในกลุ่มทั้งหมด บวก Support กระโดดจาก 0 เป็น 5 (B) ด้วย — แรงและกว้างที่สุดในคลาส


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Backup Dancers table ให้บวกดาเมจ +1→+3 แบบ passive ตามจำนวน thrall ที่กำลัง Dance (สูงสุด 6 ตัว) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 8/10 (A) | Charnel Groove (บังคับเป้าเต้นแทนทำอย่างอื่น จนจบเทิร์นถัดไป — lockdown เต็มรูปแบบ) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 5/10 (B) | Graveyard Tango (lv6, bonus action แบ่งบัฟ Backup Dancers ให้ ally 1 คน) [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 9/10 (S) | Backup Dancers table ให้ AC +1→+3 + Evasion (5+ ตัว) + Disadvantage การโจมตีทุกครั้งใส่เรา (6 ตัว) — mitigation ที่ทรงพลังมากเมื่อกองทัพครบ [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 10/10 (S) | Backup Dancers table ให้ Disengage/Dash/Strike ฟรีเป็น bonus action + **bonus action 2 ครั้ง/เทิร์น** ที่ 4 ตัวขึ้นไป — economy multiplier ที่แรงที่สุดในกลุ่ม [M:4/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 9/10 (S) | ตาราง scaling เดียวให้ผลครบทั้งดาเมจ/control/defense/economy ตามจำนวน thrall — รอบด้านที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |

### Overlord

**Overall**: A — Damage เป็น S บวกขยับขึ้นอีก 4 axis กลางๆ (Control/Survivability/AE/Utility/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Charnel Aura (bonus action, บวก d20/damage/AC +1→+3 ให้ Undead ที่คุมทุกตัวในรัศมี 30ft) เพิ่มดาเมจรวมของกองทัพ thrall [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Overlord Spells รับประกัน Command/Hold Person/Dominate Person/Geas ติดตัวถาวร [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | Charnel Aura ให้ผลกับ Undead ที่คุมเท่านั้น ไม่ใช่ ally มีชีวิต = เท่า baseline |
| **Survivability** | 6/10 (B) | Sacrificial Thralls (lv10, reaction เปลี่ยนเป้าการโจมตีที่จะโดนไปโดน thrall แทน) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Charnel Aura เป็น bonus action ให้ผลบัฟกว้างต่อเนื่อง [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Despotic Discourse (Cha check bonus) เป็น utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | ผสม control(domination spell)/buff(aura)/defense(sacrifice) ในธีมผู้ปกครอง [M:2/4] [R:3/3] [B:3/3] |

### Pale Master

**Overall**: A — Damage พุ่งเป็น 10/10 (S เต็มสเกล) บวก Control/Survivability/AE/Versatility ขยับตาม แต่ Support/Utility นิ่งสนิท


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Charnel Empower ให้เพิ่มดาเมจ necrotic เสริมกับ spell necromancy ใดๆ ได้สูงสุดเท่า level+Int mod แต้ม Charnel Touch — ดาเมจเสริมที่ scale สูงที่สุดในกลุ่ม [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Frightening Gaze (lv6, bonus action Frighten แบบ recurring save 1 นาที) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | Magic Resistance (lv20, Advantage ทุก save ต้าน spell) มาช้ามาก ไม่มี defense feature ก่อนหน้านั้น [M:2/4] [R:1/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Thrall Rush (lv10, thrall ทุกตัวขยับเต็ม speed ฟรีตอน initiative) [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญขยายดาเมจ spell เฉพาะทางหนักมาก ไม่ขยาย role อื่นมาก = เท่า baseline |

### Pharaoh

**Overall**: S — Support กระโดดจาก 0 เป็น 9 (S) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงที่สุดในกลุ่ม บวก Damage เป็น S ด้วย แม้ Survivability จะยังไม่ถูกแตะก็ตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Ankh of Radiance (retaliation dmg 1d6→4d6 radiant ใส่ผู้โจมตีเมลีที่ตี ally ที่ blessed) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ (spell list เน้นสาย support/divine) = เท่า baseline |
| **Support** | 9/10 (S) | Ankh of Radiance (บัฟ resistance+retaliation ให้ ally สูงสุดเท่า Int mod คน) + Pharaoh Spells (Revivify/Death Ward/Greater Restoration ติดตัวถาวร) + Scarab of Judgment (lv10, เสียสละ thrall เพื่อฮีลเต็มให้ ally) — Necromancer เพียงตัวเดียวที่เป็น dedicated healer/support [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 3/10 (C) | ไม่มี feature ป้องกันตัวเองโดยตรง (ทุกอย่างเน้นช่วยคนอื่น) = เท่า baseline |
| **Action Economy** | 7/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 5/10 (B) | Divination ติดตัวถาวร + Mock Divinity (lv6, ภาพลวงตา/เอฟเฟกต์เชิงสัญลักษณ์) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | พลิก Necromancer ให้เป็น healer/support เต็มตัว — role-shift ที่กว้างที่สุดในกลุ่ม [M:2/4] [R:3/3] [B:3/3] |

### Plague Lord

**Overall**: B — Damage เป็น S บวก Control/AE/Versatility ขยับเล็กน้อย แต่ Support และ Survivability (สอง axis อ่อนสุดของ baseline) ไม่ถูกแตะเลยทั้งคู่


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Bloated Thralls (lv10, thrall ระเบิดเป็น AoE 4d6 poison ทุกครั้งที่ตายหรือถูกปล่อย — nova ที่เกิดซ้ำได้ไม่จำกัด) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 8/10 (A) | Charnel Toxin (Poisoned เมื่อ Charnel Touch สร้างดาเมจ 5+) + Vile Congregation (aura passive ลบ 1d4 จาก d20 test ของศัตรูใกล้ตัว) [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 3/10 (C) | ไม่มี feature ป้องกันตัวเองใหม่โดยตรง = เท่า baseline |
| **Action Economy** | 8/10 (A) | Bloated Thralls ทำงานอัตโนมัติไม่เสีย action เพิ่ม + Projectile Spew (ระยะ Charnel Touch ไกลขึ้น 10ft) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญพิษ/debuff-aura เฉพาะทาง [M:2/4] [R:2/3] [B:3/3] |

### Reanimator

**Overall**: A — Support กระโดดจาก 0 เป็น 5 (B) บวก Damage เป็น S และขยับตามอีก 3 axis กว้างพอสมควร


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Charnel Voltage (Charnel Touch แตกไปเป้าที่สองในระยะ 5ft ด้วยดาเมจ lightning) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Charnel Voltage ทำให้เป้าที่สองทำ Opportunity Attack ไม่ได้จนจบเทิร์นถัดไป [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 5/10 (B) | Lazarus Bolt (lv6, ชุบชีวิต ally ที่เพิ่งตายให้ตื่นด้วย 1 HP+temp HP) [M:2/4] [R:1/3] [B:2/3] |
| **Survivability** | 4/10 (C) | Spell-Stitches บางแบบ (Tough/Armored) ใช้กับตัวเองได้ก็ต่อเมื่อถึง Self-Stitches ที่ lv20 เท่านั้น ก่อนหน้านั้นใช้ได้แค่กับ thrall [M:1/4] [R:1/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 5/10 (B) | Medicine proficiency + Lazarus Bolt (ชุบชีวิตฉุกเฉิน) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | Spell-Stitching ให้ปรับแต่ง thrall ได้ 5 แบบผสมกัน (AC/speed/skill/HP/advantage) ปรับ composition กองทัพได้กว้าง [M:2/4] [R:3/3] [B:3/3] |

### Reaper

**Overall**: A — Damage เป็น S บวก Survivability กระโดด +5 (C→A) และ Utility/Versatility ขยับตาม แต่ Support ไม่ถูกแตะเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Charnel Veil (Invisible ทุกครั้งที่ Charnel Touch สร้างดาเมจ 5+ — เปิดทาง Advantage การโจมตีถัดไปจากการล่องหน) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ (ธีมหลบหลีก) = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Charnel Veil (ล่องหนหลังตีโดน) + Umbral Form (lv6, immune grapple/prone + Disadvantage การโจมตีทุกครั้งใส่เรา) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจนเกิน baseline = เท่า baseline |
| **Utility** | 6/10 (B) | Umbral Form (ความเร็ว 2 เท่า + climb speed เต็ม เดินบนเพดานได้ + ล่องหนในที่มืด) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญหลบหลีก/สอดแนมเฉพาะทาง [M:2/4] [R:2/3] [B:3/3] |

### Toymaker

**Overall**: A — Damage และ Action Economy เป็น S ทั้งคู่ แต่ Support/Survivability/Utility (3 axis อ่อนสุดของ baseline) นิ่งสนิททั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Charnel Puppet (action, เรียก Slaymate เพิ่มได้ 2 ตัวต่อ 5 Charnel point ที่จ่าย) รวมกับ Slaymates ที่นับ 2 ตัวเป็น 1 thrall ในโควตา — ได้กองทัพขนาดใหญ่กว่าปกติมาก เพิ่มดาเมจรวมมหาศาล [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Soul Doll (lv6, reaction ดักวิญญาณที่เพิ่งตายไม่ให้ฟื้นคืนชีพได้ — ปิดทาง resurrection ของศัตรู/บอส) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ (ธีม thrall ล้วน) = เท่า baseline |
| **Survivability** | 3/10 (C) | Miniature Minions (+3 AC ให้ thrall ขนาด Tiny) ป้องกันกองทัพ ไม่ใช่ตัวเอง = เท่า baseline |
| **Action Economy** | 9/10 (S) | Slaymates นับ 2 ตัวเป็น 1 thrall ในโควตา — ได้จำนวนนักสู้เพิ่มขึ้นเป็นเท่าตัวจากการลงทุนเท่าเดิม [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญกองทัพขนาดใหญ่ (mass-summoner) [M:2/4] [R:2/3] [B:3/3] |
