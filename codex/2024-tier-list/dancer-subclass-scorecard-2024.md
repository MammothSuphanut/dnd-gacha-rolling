# Dancer — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 14 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Dancer](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 14 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24Extras`

---

## Class Baseline (Dancer, 2024)

Floor 0-10 ต่อ axis ของ **Dancer เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting, saving throw proficiency Dex + Cha, armor proficiency light เท่านั้น, weapon proficiency simple+finesse/light martial, Weapon Mastery, Dervish Fighting (lv1, อาวุธ 1d4/1d6 กลายเป็น 2d4), Unarmored Defense (10+Dex+Cha), Dance (lv2, Bonus Action เข้า flow state ขับ Dance Die d4→scale, N ครั้ง/วัน), Dance Styles (lv2, เลือก 1 จาก Agile Movement/Elegant Form/Retaliatory Swipe สลับได้เป็น Bonus Action), Nimble Start (lv2), Fast Movement (lv3), **Three-Target Extra Attack (lv5) → Four-Target (lv11) → Five-Target (lv17)**, Evasion (lv7), Heroic Dance (lv9), Graceful Retaliation (lv11, reaction attack ทุกครั้งที่โดนตีหรือถูกพลาด), Freestyle (lv13), Fierce Start (lv15), Invigorating Dance (lv18), Grand Finale (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Extra Attack สเกลแบบ multi-target ที่แรงกว่า Fighter อย่างชัดเจน — **ตีได้ 3 ครั้งใส่เป้าต่างกันตั้งแต่ lv5** (Fighter ต้องรอถึง lv11 ถึงจะได้ 3 ครั้ง) ไต่ถึง 5 ครั้งที่ lv17 บวก Dervish Fighting ที่ยกดาเมจอาวุธเล็ก (1d4/1d6) เป็น 2d4 ถาวร และ Graceful Retaliation (lv11) ให้ตีสวนแบบ reaction ได้ **ทุกครั้งที่โดนตีหรือถูกพลาด** โดยไม่จำกัดจำนวนครั้ง/วัน — magnitude และความถี่โจมตีสูงที่สุดในบรรดา class ที่ทำมาแล้ว [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis เลย [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว |
| **Survivability** | 6/10 (B) | Unarmored Defense (10+Dex+Cha ใช้ 2 stat ดี) + Nimble Start (lv2, Disadvantage ทุกการโจมตีใส่เราในรอบแรกของไฟต์) + Evasion (lv7) บวก Dance Style "Elegant Form" (บวก Dance Die เข้า check/save ที่ fail ได้กว้าง) และ Invigorating Dance (lv18, temp HP เท่า level+Cha mod ทุกครั้งที่เริ่ม Dance ซึ่งเข้าได้หลายครั้ง/วัน) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Dance เข้าด้วย Bonus Action และสลับ Dance Style ก็เป็น Bonus Action เช่นกัน บวก Graceful Retaliation (lv11) เป็น Reaction ตีสวนฟรีทุกครั้งที่โดนตีหรือถูกพลาด **ไม่มีข้อจำกัดจำนวนครั้ง/วันที่ระบุ** และ Grand Finale (lv20) มอบการตีเพิ่มอีก 2 ครั้งแบบ Bonus Action ในเทิร์นเดียว [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Fast Movement (+10ft passive) ช่วย exploration pace เล็กน้อย ไม่มี skill bonus, ritual, หรือ utility feature อื่นติด chassis [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Dance Styles ให้เลือกสลับระหว่าง Agile Movement (หนี)/Elegant Form (reliability)/Retaliatory Swipe (ตอบโต้) ได้เป็น Bonus Action ระหว่าง Dance ที่ active อยู่ บวก Freestyle (lv13) ให้ใช้ 2 style พร้อมกัน แต่ยังคงเป็น archetype นักสู้ finesse-melee เดียวตายตัว [M:2/4] [R:3/3] [B:1/3] |

---

## Subclass Scoring (14)

**Class Baseline อ้างอิง**: Damage 9, Control 3, Support 0, Survivability 6, Action Economy 7, Utility 4, Versatility 6

ทั้ง 14 subclass มาจากไฟล์เดียวกัน (`Valda's Spire of Secrets 2024`, source `ValdaSpire24Extras`, ไม่มี 🕰️ orphan เลย) ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) หมายเหตุ: baseline Damage/Action Economy สูงมากอยู่แล้ว (9 และ 7) ทำให้หลาย subclass ยัง "เท่า baseline" ในสองแกนนี้แม้จะมี feature เสริมเล็กน้อย เพราะ magnitude ไม่พอข้ามระดับ

| Subclass | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| Acrobat | 9 (S) | 3 (C) | 0 (D) | 8 (A) | 7 (A) | 6 (B) | 7 (A) |
| Cheerleader | 9 (S) | 3 (C) | 9 (S) | 6 (B) | 7 (A) | 4 (C) | 8 (A) |
| Contortionist | 9 (S) | 3 (C) | 0 (D) | 9 (S) | 8 (A) | 4 (C) | 7 (A) |
| Courtesan | 9 (S) | 8 (A) | 0 (D) | 6 (B) | 8 (A) | 6 (B) | 7 (A) |
| Danseur Macabre | 10 (S) | 3 (C) | 0 (D) | 7 (A) | 9 (S) | 7 (A) | 8 (A) |
| Dramaturge | 9 (S) | 6 (B) | 0 (D) | 7 (A) | 8 (A) | 8 (A) | 8 (A) |
| Fencer | 10 (S) | 5 (B) | 0 (D) | 7 (A) | 8 (A) | 4 (C) | 6 (B) |
| Fey Ballerina | 9 (S) | 3 (C) | 0 (D) | 9 (S) | 7 (A) | 5 (B) | 7 (A) |
| Fire Dancer | 10 (S) | 6 (B) | 0 (D) | 7 (A) | 7 (A) | 4 (C) | 7 (A) |
| Harlequin | 10 (S) | 6 (B) | 0 (D) | 6 (B) | 8 (A) | 4 (C) | 6 (B) |
| Marionettist | 9 (S) | 9 (S) | 3 (C) | 6 (B) | 7 (A) | 7 (A) | 8 (A) |
| Mime | 10 (S) | 7 (A) | 0 (D) | 6 (B) | 7 (A) | 6 (B) | 7 (A) |
| Shadow Dancer | 9 (S) | 3 (C) | 0 (D) | 8 (A) | 7 (A) | 6 (B) | 7 (A) |
| Steelsinger | 9 (S) | 3 (C) | 8 (A) | 10 (S) | 7 (A) | 4 (C) | 8 (A) |

---

### Acrobat

> **คอนเซปต์**: นักกายกรรมที่แปลงความเร็ว/การเคลื่อนที่เป็นดาเมจ

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Momentum (extra ดาเมจเท่า Dance Die เมื่อตีโดนหลังเคลื่อนที่ 15ft/ออกจาก reach ศัตรู) บวก Deadly Momentum (lv14, สะสมได้ 3 stack พร้อมกัน) เป็นการเพิ่มดาเมจเล็กน้อยที่ผูกกับความเร็ว — magnitude ไม่พอข้าม tier จาก baseline ที่สูงอยู่แล้ว = ใกล้เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Tumbling (ลดฟอลดาเมจ 5×level, เพิกเฉย difficult terrain, +10ft speed) บวก Evasive Speed (bonus action Dodge ฟรีเมื่อเคลื่อนที่ 30ft+) — เครื่องมือหลีกเลี่ยงอันตรายที่ baseline ไม่มี [M:2/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Evasive Speed ใช้ bonus action ที่ baseline มีโครงสร้างอยู่แล้ว ไม่นับเป็น economy gain ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | Aerial Acrobat ให้ Climb Speed เท่าความเร็วเดิน + ใช้ Dex คำนวณระยะกระโดด + Acrobatics proficiency — traversal utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ชุด mobility (ปีน/กระโดด/หนี) เปิด role นักสำรวจ/scout เพิ่มจาก striker ล้วน [M:2/4] [R:2/3] [B:3/3] |

### Cheerleader

> **คอนเซปต์**: นักเชียร์ที่ปลุกใจทีมด้วยเสียงเชียร์และผาดโผน

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Inspiring Chant (Dance Style, AoE 10ft) ให้ ally reroll d20 test ที่ fail ด้วย Dance Die บวก Squad Warmup (แจก Dance Style ใดก็ได้ให้ ally ที่อยู่ใกล้) บวก Spirited Start (lv14, แจก Heroic Inspiration ให้ทั้งทีมตอน initiative) — จาก 0 baseline กลายเป็น support hub เต็มรูปแบบ [M:4/4] [R:3/3] [B:2/3] |
| **Survivability** | 6/10 (B) | Cheerful (Advantage ต้าน Frightened) เป็น mitigation เล็กน้อย = ใกล้เท่า baseline |
| **Action Economy** | 7/10 (A) | Athletic Dexterity เป็นการสลับชนิด save ไม่ใช่ economy gain ใหม่ = เท่า baseline |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 8/10 (A) | Squad Warmup แจก Dance Style ใดก็ได้ (ไม่ใช่แค่ของตัวเอง) ให้ ally ทำให้ปรับ role ของทั้งทีมได้กว้างมาก [M:3/4] [R:2/3] [B:3/3] |

### Contortionist

> **คอนเซปต์**: นักดัดตัวที่หลบและตอบโต้ด้วยความยืดหยุ่นเหนือมนุษย์

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Double Joints (immune Grappled/Restrained ระหว่าง Dance + ลุกจาก Prone ฟรี) บวก Backbend (เข้าไปในช่องศัตรู กัน Advantage + Half Cover) บวก Twisting Redirection (reaction เปลี่ยนเป้าการโจมตีที่พลาดไปโดนตัวอื่นแทน) บวก Reactive (lv14, reaction เพิ่ม) — ชุดป้องกัน/หลบหลีกที่หนาแน่นที่สุดใน class [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Reactive (lv14) ให้ reaction เพิ่มอีก 1 ครั้งต่อเทิร์น (ฟื้นทุกเทิร์น) เป็น economy multiplier ที่แท้จริง [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 4/10 (C) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ชุด reactive/defensive ให้เล่น role "ผู้รอด" ที่แตกต่างจาก striker ทั่วไปของคลาส [M:2/4] [R:2/3] [B:3/3] |

### Courtesan

> **คอนเซปต์**: นักเสน่ห์ที่ครอบงำจิตใจศัตรูด้วยเสน่ห์

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Heartbreaker (lv14, ดาเมจ psychic 2 ทอย Dance Die ไม่ว่าเป้าจะเซฟผ่านหรือพลาด Enthralling Movement) เป็นดาเมจเสริมเล็กน้อยที่ผูกกับ control — magnitude ไม่พอข้าม tier = ใกล้เท่า baseline |
| **Control** | 8/10 (A) | Enthralling Movement (Dance Style, ทุกเทิร์นฟรีไม่เสีย action) บังคับ Wisdom save หรือ Charmed จนถึงต้นเทิร์นถัดไป บวก Beguiling Charm (เลือกลด save หรือ attack roll ของเป้าที่ถูก Charm ด้วย Dance Die) — hard-CC เดี่ยวที่ทำซ้ำได้ทุกเทิร์นแบบไม่เสีย resource [M:3/4] [R:3/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Enthralling Movement ทำงานอัตโนมัติทุกต้นเทิร์นโดยไม่เสีย action ใดๆ เลย เป็น control ที่ "ฟรี" อย่างแท้จริง [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Honeyed Words (Deception+Persuasion proficiency + 2 ภาษา) เสริม social utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | เปิด role นักเสน่ห์/นักสังคมที่ต่างจาก striker ทั่วไปของคลาสอย่างชัดเจน [M:2/4] [R:2/3] [B:3/3] |

### Danseur Macabre

> **คอนเซปต์**: นักเต้นเนโครแมนเซอร์ที่เรียกโครงกระดูกมาเต้นรำและสู้ด้วยกัน

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Danse Macabre (Dance Style) เรียก Skeleton Spirit ได้หลายตัว (สูงสุดเท่า Cha mod) ที่โจมตีเองได้ทุกเทิร์นผ่าน bonus action เดียว บวก Grim Troupe (lv14, reaction แคส Create Undead ฟรีสร้าง Ghoul ควบคุมได้ทันทีเมื่อศัตรูตาย) — เท่ากับได้กองทัพนักสู้เพิ่มที่โจมตีคู่ขนานกับตัวเอง [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ (ธีมเน้นสร้างกำลังพลไม่ใช่ debuff) = เท่า baseline |
| **Support** | 0/10 (D) | Skeleton/Ghoul สู้เพื่อตัวเองไม่ใช่ ally-support โดยตรง = เท่า baseline |
| **Survivability** | 7/10 (A) | Ghoulish Calling ให้ Necrotic Resistance + Darkvision 60ft + Undead Empathy (ศัตรูอันเดดที่โจมตีต้องเซฟหรือพลาดอัตโนมัติ) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | bonus action เดียวทั้งเรียกและสั่ง Skeleton Spirit หลายตัวให้โจมตีพร้อมกันได้ทุกเทิร์น เป็น economy multiplier ระดับสูงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Dance with the Dead (แคส Speak with Dead ฟรี ถามได้ 5 คำถามข้ามศพหลายศพ) เป็น investigative utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เปิด role "ผู้บัญชาการกองทัพอันเดด" ที่ต่างจาก striker เดี่ยวของคลาสโดยสิ้นเชิง [M:2/4] [R:3/3] [B:3/3] |

### Dramaturge

> **คอนเซปต์**: นักแสดงที่ใช้เวทมนตร์การแสดงควบคู่กับการเต้น

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Arcane Strike แทนที่การโจมตีด้วย cantrip Bard ที่เตรียมไว้ (ไม่ใช่ extra damage source ใหม่ แค่ flexibility) — magnitude ไม่พอข้าม tier = ใกล้เท่า baseline |
| **Control** | 6/10 (B) | Spotlight (Dance Style, ทุกเทิร์น) แปลง save ที่เป้าผ่านต้าน spell ของตัวเองให้กลายเป็น fail ได้ด้วยการลบ Dance Die — เสริม control ของ spell list Bard ที่เตรียมไว้ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | Comedy/Tragedy Mask ให้ผลกับ**ตัวเอง**เมื่อ ally โดนเหตุการณ์บางอย่าง ไม่ใช่ ally-support โดยตรง = เท่า baseline |
| **Survivability** | 7/10 (A) | Tragedy Mask ให้ Resistance ดาเมจชนิดที่ ally เพิ่งโดนแก่ตัวเอง เป็น mitigation ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Encore (lv14, 1 ครั้ง/rest) แคส spell action-casting-time ได้เป็น bonus action แทน — economy gain ที่ชัดเจน [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Spellcasting เต็มรูปแบบจาก Bard list (เตรียม spell ได้ตามระดับ) + Disguise Kit proficiency — ขยาย utility จาก baseline ที่แทบไม่มีอะไรเลยอย่างมาก [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสม caster เต็มตัวเข้ากับ striker เดิม เปิด role hybrid ที่กว้างกว่า Dancer ทั่วไปมาก [M:3/4] [R:2/3] [B:3/3] |

### Fencer

> **คอนเซปต์**: นักฟันดาบมือเดียวที่ปัดป้องและแทงสวนแม่นยำ

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Dueling Stance (Dance Style, +Dance Die ดาเมจเมื่อถืออาวุธมือเดียว) บวก Superior Flourish (lv14, ตี crit หรือฆ่าเป้าให้ตีเพิ่มได้อีก สูงสุด 3 ครั้ง/เทิร์น) — ต่อยอด multi-attack ของ baseline ให้ทะลุเพดานเดิมได้ [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | Fencing Maneuvers ให้ En Garde (taunt-lite, Disadvantage โจมตีคนอื่น) + Disarm (bonus action, ทำอาวุธหลุดมือ) [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Parry and Riposte (reaction, +Dance Die เข้า AC ต้านการโจมตีที่กำลังเข้า) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Fencing Maneuvers (Disarm/En Garde/Lunge ทั้งหมดเป็น bonus action) บวก Superior Flourish คืนระยะเคลื่อนที่+ตีเพิ่มฟรีเมื่อ crit/ฆ่า [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 4/10 (C) | Panache (Persuasion proficiency) เป็น utility เล็กน้อย = ใกล้เท่า baseline |
| **Versatility** | 6/10 (B) | โฟกัสนักดวลมือเดียวล้วนๆ ไม่ขยาย role อื่น = เท่า baseline |

### Fey Ballerina

> **คอนเซปต์**: นักบัลเลต์ที่ได้พรจากภาคีเฟย์ให้เต้นได้สมบูรณ์แบบ

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Sublime Start (ความเร็ว 2 เท่า + เซฟผ่านอัตโนมัติทุกอันในรอบแรก) บวก Swan Song (bonus action ตอน Bloodied, ฮีลครึ่ง max HP + Advantage d20 test แรกทุกเทิร์น) — เครื่องมือรอดชีวิตที่ทรงพลังมาก [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Misty Waltz แคส Misty Step ฟรีหลายครั้ง/วัน แต่เป็น mobility ไม่ใช่ extra-action economy โดยตรง = เท่า baseline |
| **Utility** | 5/10 (B) | Magic Slippers เพิกเฉย difficult terrain ตลอดเวลา เป็น utility เล็กน้อย [M:1/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผสม mobility(Misty Step)/defense(auto-save)/self-heal ในตัวเดียว [M:2/4] [R:2/3] [B:3/3] |

### Fire Dancer

> **คอนเซปต์**: นักเล่นไฟที่พ่นเปลวเพลิงใส่ศัตรูเป็นวงกว้าง

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Pyrotechnics (Dance Style, exploding dice บนดาเมจไฟ ไม่จำกัดจำนวนครั้งเท่า Cha mod) บวก Fire Breather (AoE cone 3×Dance Die+level) บวก Inferno Breath (lv14, ขยาย cone เป็น 30ft + เพิกเฉย fire resistance + burning ต่อเนื่อง) — AoE nova magnitude สูงกว่า baseline single-target มาก [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Blinding Flare (ทุกเทิร์นเมื่อทอยดาเมจไฟสูงสุด) บังคับ Con save หรือ Blinded จนถึงต้นเทิร์นถัดไป [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Fire resistance (Flame Twirling) เป็น mitigation ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Fire Breather ใช้ Magic action เต็ม ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 4/10 (C) | Torch Juggler เป็น flavor เล็กน้อย = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสมดาเมจ AoE + control(blind) ในธีมไฟเดียว [M:2/4] [R:2/3] [B:3/3] |

### Harlequin

> **คอนเซปต์**: ตัวตลกนักกายกรรมที่ล้อเลียนและปาดาบเป้าหมาย

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Deft Fling (ทุกเทิร์น) ให้ยิงอาวุธ juggling ระยะไกลใส่เป้าเดิมฟรีทันทีที่พลาดการโจมตี — เท่ากับได้โอกาสตีสองครั้งจริงทุกครั้งที่พลาด ไม่เสีย resource [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Jest (Dance Style, bonus action) กด Disadvantage การโจมตีครั้งถัดไปของเป้าใส่คนอื่น บวก Vexing Jest (lv10, ขยายผลต่อเนื่องเมื่อเป้าพลาดหรือทอย 20) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Deft Fling ให้การโจมตีเพิ่มฟรีทุกครั้งที่พลาด ไม่แย่ง action/bonus action หลัก [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 4/10 (C) | Juggling เป็น flavor เล็กน้อย = เท่า baseline |
| **Versatility** | 6/10 (B) | โฟกัส skirmisher เดี่ยวล้วนๆ ไม่ขยาย role อื่น = เท่า baseline |

### Marionettist

> **คอนเซปต์**: นักเชิดหุ่นที่บังคับศัตรูให้กลายเป็นตุ๊กตาของตัวเอง

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่โดยตรง (ธีมเน้น control ล้วน) = เท่า baseline |
| **Control** | 9/10 (S) | Puppet Strings (Dance Style, ทุกเทิร์นฟรี) บังคับเป้าใช้ reaction โจมตีเป้าอื่นที่เลือกเอง บวก Heartstrings (lv10, Charmed+Disadvantage โจมตี ally) บวก Master of Puppets (lv14, แคส Dominate Beast/Person/Monster ฟรีแบบ auto-fail save เมื่อเป้าพลาด Puppet Strings) — chain control ที่ทรงพลังที่สุดในบรรดา class ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 3/10 (C) | Heartstrings ทำให้เป้าที่ถูก charm ได้ Disadvantage เมื่อโจมตี ally เป็นการป้องกันทีมทางอ้อม [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Puppet Strings/Stringed Suggestion เป็น bonus action ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 7/10 (A) | Familiar Doll (แคส Find Familiar เป็น ritual ฟรี) + Manipulator (Suggestion ฟรีเป็น bonus action) — utility สอดแนม/สังคมที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เปิด role นัก control/charm เต็มรูปแบบที่มี spellcasting utility ควบคู่ — ต่างจาก striker เดิมของคลาสมาก [M:2/4] [R:3/3] [B:3/3] |

### Mime

> **คอนเซปต์**: นักแสดงใบ้ที่ทำให้ของสมมติกลายเป็นของจริง

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Mystical Maul (ระหว่าง Pantomime) แปลงดาเมจอาวุธ 1d4/1d6 ให้กลายเป็น 2d6 Force คงที่ — เพิ่ม magnitude ให้อาวุธเบาอย่างมีนัยสำคัญ (สูงกว่าการอัปเกรดปกติของ baseline อีกขั้น) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Unseen Impact (ทุกเทิร์นเมื่อตีโดน) ให้ Prone หรือผลัก 10ft บวก Invisible Wall (แคส Wall of Force ฟรี) — control tool ที่หลากหลาย [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 6/10 (B) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 7/10 (A) | Pantomime ให้ Advantage บนการโจมตีประชิดครั้งแรกทุกเทิร์นแบบ passive ไม่เสีย action เพิ่ม = ใกล้เท่า baseline |
| **Utility** | 6/10 (B) | Mimed Communication (สื่อสารเงียบ 10 คำ) + Sly (Stealth/Sleight of Hand) — utility เฉพาะทางที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผสมดาเมจ/control(prone-push-wall)/stealth ในกลไกเดียว [M:2/4] [R:2/3] [B:3/3] |

### Shadow Dancer

> **คอนเซปต์**: นักเต้นที่มีเงาของตัวเองเป็นคู่เต้นและโล่กำบัง

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Vengeful Shadow (lv14, extra 1d6 necrotic + Advantage เมื่อเงาถูกทำลาย) เป็นดาเมจเสริมเล็กน้อย — magnitude ไม่พอข้าม tier = ใกล้เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Shadowdance (แทนที่ Graceful Dodge) สร้างร่างเงาที่รับดาเมจแทนได้ถ้าทอย Dance Die ได้ 3+ บวก Shrouded Start (Invisible รอบแรก) บวก Umbral Escape (reaction teleport 60ft เมื่อเงาถูกทำลาย) — ชุดหลบหลีก/พรางตัวที่หนาแน่น [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Umbral Escape เป็น reaction ที่ baseline มีโครงสร้างอยู่แล้ว ไม่นับเป็น economy gain ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | Darkvision 120ft (ซ้อนกับที่มีอยู่) + Stealth proficiency+Cha bonus — exploration utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผสม stealth/defense/damage ในธีมเงาเดียว [M:2/4] [R:2/3] [B:3/3] |

### Steelsinger

> **คอนเซปต์**: นักเต้นเกราะหนักที่ปัดป้องดาเมจและปกป้องทีม

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีมเน้นแทงค์/ป้องกัน) = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Armored Redirection (reaction) บังคับการโจมตีที่กำลังจะโดน ally ในระยะ 5ft ให้มาโดนตัวเองแทน — protector tool ที่ baseline ไม่มีเลย [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 10/10 (S) | Deflection (Dance Style, ทุกครั้งที่โดนตี) ลดดาเมจ B/P/S ด้วย Dance Die บวก Improved/Prismatic Deflection (lv10, ปัดค่าต่ำเป็น 4 + ขยายไปดาเมจธาตุอื่นด้วย) บวก Martial Training (อาวุธ martial+เกราะ medium+โล่) — ชุดลดดาเมจที่ครอบคลุมและทรงพลังที่สุดใน class [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Armored Redirection เป็น reaction ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 4/10 (C) | Athletics proficiency เป็น utility เล็กน้อย = เท่า baseline |
| **Versatility** | 8/10 (A) | เปิด role "แทงค์/protector" เต็มรูปแบบที่ต่างจาก light-armor striker ของคลาสโดยสิ้นเชิง [M:3/4] [R:2/3] [B:3/3] |
