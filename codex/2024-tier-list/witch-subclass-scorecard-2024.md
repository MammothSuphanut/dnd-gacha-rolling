# Witch — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 13 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Witch](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 13 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Witch, 2024)

Floor 0-10 ต่อ axis ของ **Witch เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Cha, full caster progression, saving throw proficiency Wis + Cha, armor proficiency light เท่านั้น, weapon proficiency simple เท่านั้น, Hexes (lv1, cantrip พิเศษสาย curse 2→มากขึ้น แยกจากนับ cantrip ปกติ), Witch's Curse (lv1, เลือก 1 จาก 11 คำสาปประจำตัว), Cackle (lv2, Bonus Action ยืด Hex ออก 1 รอบ), Familiar (lv2, Find Familiar ติดตัวฟรี cast 10 นาทีไม่เสีย slot, form พิเศษ, ลงมือประกบเทิร์นเรา), Insidious Spell (lv5, ผูก Disadvantage save ระหว่าง Hex กับ Witch spell อื่น), Improved Familiar (lv7), Hastened Hex (lv9, cast Hex + cantrip อื่นพร้อมกันใน 1 action), Grand Hex (lv11/13/15/17, รวม 4 ตัว), Vengeful Curse (lv18), Hexmaster (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Full spell slot lv1-9 บวก Hexes ที่เป็น cantrip พิเศษแยกโควตา (นับเพิ่มจาก cantrip ปกติ) และ Hastened Hex (lv9) ให้ cast Hex **พร้อมกับ** cantrip อื่นในการ cast เดียวกัน — เท่ากับยิงได้ 2 คาถาต่อ 1 action ฟรีไม่เสีย resource เพิ่ม เป็น magnitude ที่สูงมากสำหรับ at-will damage [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Hexes เป็น cantrip สาย curse/debuff โดยธีม (Hex: Misfortune, Hex: Ruin) บวก Insidious Spell (lv5) ที่ผูก Disadvantage saving throw ระหว่าง Hex กับ Witch spell อื่นเข้าด้วยกัน (ศัตรู fail Hex → เสีย save คาถาถัดไปง่ายขึ้น และกลับกัน) ยกระดับ reliability ของ control chain โดยตรงแบบไม่ต้องเสีย resource เพิ่ม [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลย — chassis เน้นคำสาป/ดาเมจตัวเองล้วนๆ |
| **Survivability** | 3/10 (C) | HD d8 + armor proficiency แค่ light + saving throw proficiency Wis (กันสาย charm/fear/control ได้กว้าง) เป็นฐานกลางๆ Witch's Curse (lv1) เป็นการแลกเปลี่ยนพลัง-จุดอ่อนตามธีม ไม่ใช่ของเสริม survivability โดยตรง [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Hastened Hex (lv9) ให้ cast Hex + Witch cantrip อื่นพร้อมกันในการ cast เดียว **ไม่เสีย action หรือ resource เพิ่มเลย** เท่ากับได้ 2 casts ต่อ 1 action บวก Familiar's Synchronized Turns (ลงมือก่อน/หลังเราทันที เป็นแหล่ง action เสริมย่อยๆ) และ Cackle เป็นแค่ Bonus Action [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Familiar (lv2) ติดตัวฟรีไม่เสีย slot cast 10 นาที เข้าถึง form พิเศษหลากหลาย (Flying Book, Pet Rock, Moon Jelly ฯลฯ) ที่ปรับปรุงเพิ่มที่ lv7 (Force damage option + form โหดขึ้นอย่าง Imp/Quasit) เป็นเครื่องมือสอดแนม/สำรวจที่ฟรีตลอดกาลไม่จำกัดจำนวนครั้ง [M:2/4] [R:3/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Grand Hex (lv11-17, รวม 4 ตัว สลับได้ทุก level-up) ให้เลือกพลังสาย curse ขั้นสูงตามสถานการณ์ บวก Familiar ที่เปลี่ยน form ได้ (recast ใหม่) ปรับบทบาทสัตว์เลี้ยงให้ตรงงาน — Witch's Curse (lv1) เป็นตัวเลือกที่ตรึงตัวตนของตัวละครไว้ ไม่สลับภายหลัง [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (13)

**Class Baseline อ้างอิง**: Damage 7, Control 6, Support 0, Survivability 3, Action Economy 7, Utility 7, Versatility 6

ไม่มี archetype ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) **หมายเหตุแหล่งที่มา**: ทั้ง 13 ตัวเป็น ValdaSpire24/24Extras 2024-native ครบ ไม่มีตัวไหนเป็น 2014-only orphan

| Subclass | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Black Magic | ValdaSpire24 | 8 (A) | 6 (B) | 0 (D) | 5 (B) | 8 (A) | 7 (A) | 6 (B) |
| Blood Magic | ValdaSpire24 | 9 (S) | 6 (B) | 0 (D) | 3 (C) | 9 (S) | 8 (A) | 6 (B) |
| Blue Magic | ValdaSpire24Extras | 8 (A) | 7 (A) | 0 (D) | 5 (B) | 8 (A) | 9 (S) | 9 (S) |
| Fragrant Magic | ValdaSpire24Extras | 7 (A) | 7 (A) | 8 (A) | 4 (C) | 7 (A) | 8 (A) | 7 (A) |
| Gingerbread Magic | ValdaSpire24Extras | 7 (A) | 6 (B) | 7 (A) | 5 (B) | 8 (A) | 7 (A) | 7 (A) |
| Green Magic | ValdaSpire24 | 8 (A) | 6 (B) | 7 (A) | 6 (B) | 8 (A) | 7 (A) | 7 (A) |
| Purple Magic | ValdaSpire24 | 7 (A) | 8 (A) | 0 (D) | 3 (C) | 7 (A) | 8 (A) | 7 (A) |
| Red Magic | ValdaSpire24 | 9 (S) | 6 (B) | 0 (D) | 7 (A) | 7 (A) | 7 (A) | 6 (B) |
| Sky Magic | ValdaSpire24Extras | 7 (A) | 7 (A) | 0 (D) | 7 (A) | 8 (A) | 8 (A) | 6 (B) |
| Steel Magic | ValdaSpire24 | 9 (S) | 6 (B) | 0 (D) | 6 (B) | 8 (A) | 7 (A) | 6 (B) |
| Tea Magic | ValdaSpire24 | 7 (A) | 6 (B) | 8 (A) | 5 (B) | 8 (A) | 9 (S) | 8 (A) |
| Technicolor Magic | ValdaSpire24 | 7 (A) | 7 (A) | 4 (C) | 7 (A) | 8 (A) | 8 (A) | 7 (A) |
| White Magic | ValdaSpire24 | 7 (A) | 6 (B) | 9 (S) | 6 (B) | 8 (A) | 7 (A) | 6 (B) |

---

### Black Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Grim Sacrifice (lv14, สังเวย familiar เป็น AoE 8d10 Necrotic 20ft, refill ด้วย spell slot lv6+) บวกศักยภาพกองทัพ undead จาก Undeath Command [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่นอกเหนือจาก Hex kit เดิม = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 5/10 (B) | Life Tether (lv10, reaction โอนครึ่งดาเมจที่ตัวเองได้รับไปให้เป้าที่ Hex ไว้) เป็นเครื่องมือ redirect ที่มีประโยชน์ [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Undeath Command ให้สั่ง familiar+undead ทั้งหมดด้วย bonus action เดียวกัน [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Undead Familiar (ขยาย benefit ของ Familiar sidebar ให้ undead จาก Animate Dead) เป็น synergy ที่ทรงพลังแต่เฉพาะทาง = เท่า baseline |
| **Versatility** | 6/10 (B) | โฟกัส necromancer-specialist ชัดเจน (minion+curse+redirect+nova) = เท่า baseline |

### Blood Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Sanguine (lv14, แลก HP ตัวเองเพื่อดาเมจ Necrotic เพิ่มสูงสุด 6d8 ต่อเป้าที่ Hex ไว้) บวก Arcane Bloodletting (แลกดาเมจเปลี่ยน casting time เป็น bonus action = ร่ายคาถาได้มากขึ้นต่อเทิร์น) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 3/10 (C) | Deathseeker เป็น utility ตรวจจับ ไม่ใช่ survivability โดยตรง กลไกหลักของ subclass (self-damage) ยิ่งลด survivability = เท่า baseline |
| **Action Economy** | 9/10 (S) | Arcane Bloodletting (แลก Necrotic dmg เพื่อเปลี่ยน casting time action→bonus action, Cha mod ครั้ง/วัน) เท่ากับ cast คาถาได้ 2 ครั้ง/เทิร์นบ่อยๆ เป็นตัวคูณ action ที่ทรงพลังที่สุดในบรรดา Witch [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Deathseeker (ตรวจจับเป้าที่บาดเจ็บ/มองทะลุ Invisible ในระยะ 60ft + Adv tracking) เป็นเครื่องมือสอดแนม/ตามล่าที่มีประโยชน์จริง [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | โฟกัส nova-caster ที่แลก HP เพื่อพลัง เป็น archetype เดี่ยวตายตัว = เท่า baseline |

### Blue Magic (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Cerulean Reflection (lv14, reaction redirect คาถาที่ save ผ่านไปหาเป้าใหม่เหมือนร่ายเอง) เป็นดาเมจ "ขโมย" ที่ทรงพลังแม้จะต้องรอเงื่อนไข [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Blue Magic Duplication ให้เตรียมคาถาอะไรก็ได้ที่เคยโดนใส่ (รวม control spell ของศัตรู) ตามสถานการณ์จริง [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 5/10 (B) | Turquoise Efficiency (lv6, Adv save ต่อคาถาที่เตรียมไว้ + คืน slot ถ้า save ผ่าน) เป็นเทคนิคป้องกันเฉพาะทางที่แข็งแกร่งต่อนักคาถา [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Duplication/Cerulean Reflection ทั้งหมดเป็น Reaction ไม่เสีย action หลัก = ได้ทรัพยากรฟรีจากการโดนโจมตี [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Copycat (lv10, ขโมย skill/save proficiency reactively) + Arcane Awareness (Detect Magic ฟรี+ตรวจจับนักคาถา) + Duplication (เตรียมคาถาอะไรก็ได้ที่เคยโดนใส่) เป็นชุด adaptive utility ที่กว้างที่สุดใน class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | ธีมทั้ง subclass คือ "กลายเป็นสิ่งที่โดนใส่" — เป็นกลไกที่ยืดหยุ่นที่สุดในบรรดา subclass ของ Witch ทั้งหมด ปรับตัวได้ตามสถานการณ์จริงเสมอ [M:3/4] [R:3/3] [B:3/3] |

### Fragrant Magic (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี damage feature ใหม่โดยตรง = เท่า baseline |
| **Control** | 7/10 (A) | Sulfur (AoE Disadvantage Con check/save) บวก Dizzying Fog (lv10, AoE Poisoned condition ต่อเนื่อง) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Frankincense/Smelling Salts บัฟ ally ในระยะ 30ft บวก Olfactory Aura (lv14, aura ถาวร ally ในระยะ 30ft เพิ่ม d4 ให้ D20 Test ใดก็ได้ตลอดเวลา) เป็น support field ที่กว้างและ always-on [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 4/10 (C) | Incense Casting (cast โดยไม่ใช้ component + กัน Counterspell) เป็นเทคนิคป้องกันเฉพาะทาง [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Fragrant Aura/Perfumed Charisma เสีย Magic action เต็ม ไม่ประหยัด action สุทธิ = เท่า baseline |
| **Utility** | 8/10 (A) | Perfumed Charisma (Adv Cha check aura 1 ชม.) + Incense Casting (componentless casting) เป็น utility สังคม/logistics ที่มีประโยชน์จริง [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Fragrant Aura 3 โหมด + aura เสริมทีมถาวร + control เป็น breadth ที่กว้าง [M:2/4] [R:2/3] [B:3/3] |

### Gingerbread Magic (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Candy Land แปลงพื้นที่เป็น environmental hazard ไม่ใช่ดาเมจผู้เล่นโดยตรง = เท่า baseline |
| **Control** | 6/10 (B) | Distracting Aroma (familiar debuff แคบ) ไม่พอยกระดับ tier = เท่า baseline |
| **Support** | 7/10 (A) | Sugar Rush (bonus action ให้ ally Dash/Disengage ฟรี) บวก Candy Land (lv14, โซนฮีล 10 HP/เทิร์นต่อเนื่อง 1 นาทีให้ตัวเอง+ally) เป็น support ที่ต่อเนื่องและกว้าง [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Sugar-Coat (lv10, reaction ยกเลิก weapon attack ที่โดนตัวเองโดยแปลงอาวุธเป็นลูกอม) เป็นการบล็อกเป้าเดียวที่มีประสิทธิภาพ [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Sugar Rush เป็น bonus action ที่มอบ action ฟรีให้ ally [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Candy Land เป็น transformation effect ที่ narrow เชิงกลไก = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม debuff (familiar), support (heal zone/dash), และป้องกัน (sugar-coat) ในตัวเดียว [M:2/4] [R:2/3] [B:3/3] |

### Green Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Twin Familiar (lv6, แยก familiar เป็น 2 ตัวแชร์ HP pool เดียวกัน ใช้ Quick Attack ได้ทั้งคู่ = ดาเมจ pet เพิ่มเป็น 2 เท่า) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 7/10 (A) | Vital Nourishment (lv10, ทุก long rest ให้ temp HP+ล้าง 1 condition แก่ 6 คน) เป็น support ที่ reliable และกว้าง [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Sacrificial Familiar (lv14, redirect attack ไปที่ familiar Cha mod ครั้ง/วัน) เป็นการป้องกันตัวเองผ่าน pet-tanking [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Twin Familiar ให้สั่ง familiar ทั้งสองตัวพร้อมกันด้วย action+bonus action = โจมตี 2 ครั้งจาก pet ต่อเทิร์น [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Elder Tongue (Speak with Animals ฟรี) เป็น utility แคบ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม familiar-focused pet-build, support, และ utility ภาษา ในตัวเดียว [M:2/4] [R:2/3] [B:3/3] |

### Purple Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Waking Nightmare สร้างความเสียหายทางอ้อมผ่าน Frenzied condition ไม่ใช่ดาเมจเพิ่มโดยตรง = เท่า baseline |
| **Control** | 8/10 (A) | Waking Nightmare (lv14, เป้าที่ fail save ต่อ Hex: Hallucination ได้ Frenzied condition — โจมตีสุ่มใส่ทุกฝ่ายรวมพวกเดียวกันเอง) เป็น control ที่แรงที่สุดในบรรดา class นี้ [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 3/10 (C) | ไม่มี survivability feature ใหม่ (False Authority/Deceitful Transposition เน้นรุก/หลอกลวง) = เท่า baseline |
| **Action Economy** | 7/10 (A) | Deceitful Transposition เป็น bonus action สร้างภาพลวงตาที่ทรงพลัง = เท่า baseline |
| **Utility** | 8/10 (A) | False Authority (Disguise Self แปรผันตามผู้มอง) + Deceitful Transposition (lv10, สลับตัวตนลวง 2 เป้าหมาย) เป็นชุด social/infiltration ที่ทรงพลัง [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | โฟกัส illusion/control specialist ที่มีเครื่องมือสังคมแข็งแกร่งเสริม [M:2/4] [R:2/3] [B:3/3] |

### Red Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Elemental Annihilation (lv14, แลก spell slot อีกลูกเพื่อการันตีดาเมจสูงสุดของคาถาธาตุ) เป็น damage nova ที่ magnitude สูงมาก [M:4/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 7/10 (A) | Invulnerability (lv10, reaction ลดดาเมจคงที่ 50 แต้ม, refill ด้วย slot lv4+) เป็นการลดดาเมจก้อนเดียวที่ทรงพลังมาก [M:3/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Convolute Energy ใช้ได้ฟรีไม่เสีย action = เท่า baseline |
| **Utility** | 7/10 (A) | Convolute Energy (สลับชนิดดาเมจธาตุของใครก็ได้ ไม่ใช่แค่ตัวเอง) เป็น utility ทางยุทธวิธีที่น่าสนใจแต่ไม่พอยกระดับ = เท่า baseline |
| **Versatility** | 6/10 (B) | โฟกัส blaster-nuker archetype เดี่ยวตายตัวชัดเจน = เท่า baseline |

### Sky Magic (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 7/10 (A) | Vortex (lv10, AoE รวม Difficult Terrain + ranged Disadvantage + กันการบินของสัตว์เล็ก) เป็น battlefield control หลายมิติ [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย (Corvid Familiar บัฟ pet ไม่ใช่ ally) |
| **Survivability** | 7/10 (A) | Feathered Heels ให้บินฟรีแทบตลอดการต่อสู้ (trigger จากการ cast Hex/spell) บวก Cloud Dancer (lv14, 25% auto-miss ตอนบิน/ตก) เป็นคอมโบหลบหลีกที่แข็งแกร่ง [M:2/4] [R:3/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Feathered Heels ให้ Fly Speed ฟรีไม่เสีย action ทุกครั้งที่ cast [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Corvid Familiar (Fly 50ft+AC bonus+พูด Common) + Cushioned Fall (Feather Fall ฟรี) เป็น traversal/scouting utility ที่แข็งแกร่ง [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | โฟกัสธีม mobility (บิน+control+ป้องกัน) เป็น archetype เดียวที่เชื่อมโยงกันแน่น = เท่า baseline |

### Steel Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Extra Attack (lv6, โจมตี 2 ครั้ง + แทนที่ 1 ครั้งด้วย cantrip/Hex ได้) เป็นการเพิ่มดาเมจก้าวกระโดดสำหรับ full-caster ที่ปกติโจมตีทีละครั้ง บวก Insidious Smite (lv10, nova ผ่านการแลก slot) [M:4/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย |
| **Survivability** | 6/10 (B) | Martial Training (medium armor+shield ยกระดับจาก light-only) บวก Hexplate (lv14, resist B/P/S จากเป้าที่ Hex ไว้) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Extra Attack + ตัวเลือกแทนที่การโจมตีด้วยคาถาเป็นชุด AE ที่แข็งแกร่ง [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | ไม่มี utility feature ใหม่ = เท่า baseline |
| **Versatility** | 6/10 (B) | Melee-caster hybrid (Gish) archetype ที่ค่อนข้างโฟกัสบทบาทเดียว = เท่า baseline |

### Tea Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Tea Ceremony (ลด Exhaustion ให้ตัวเอง+6 ally ทุก rest) บวก Herbal Remedy (lv10, tea-drinker เลือก temp HP/resist poison/Lesser หรือ Greater Restoration ฟรี) เป็น support ที่ทรงพลังและกว้างมาก [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Tasseography ใช้แทนที่ saving throw ที่พลาดได้เช่นกัน (Cha mod ครั้ง/วัน) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Tasseography เป็น bonus action แล้วใช้แทนที่ roll ได้ฟรี บวก As Foretold (lv14, ฟื้นการใช้งานทุกครั้งที่ทอย Initiative) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | Tasseography (แทนที่ D20 Test อะไรก็ได้ของตัวเองหรือใครก็ได้ที่เห็นในระยะ 60ft) บวก Shapes and Omens (lv6, คำทำนายจาก GM ทุก long rest) เป็นเครื่องมือ reliability สากลที่กว้างที่สุดใน class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | รวม universal-reliability tool (Tasseography) กับ support kit ที่แข็งแกร่ง ปรับใช้ได้แทบทุกสถานการณ์ [M:3/4] [R:2/3] [B:3/3] |

### Technicolor Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 7/10 (A) | Redemption Arc (lv14, บังคับเป้าที่เหลือ 0 HP ให้ Unconscious แทนตาย และล้าง Charmed/curse/Frightened/possession ตอนตื่น) เป็นการถอดศัตรูออกจากการต่อสู้แบบถาวรที่มีประโยชน์ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 4/10 (C) | Friendship Bracelet (Help เป็น bonus action + tracking + target ข้าม line-of-sight) เป็น support ที่มีประโยชน์แต่ยังแคบเมื่อเทียบกับ White/Tea Magic [M:1/4] [R:2/3] [B:1/3] |
| **Survivability** | 7/10 (A) | Positivity (lv10, reaction บวก AC สูงสุด +10 ตามจำนวนเพื่อนใกล้ตัว อาจกันโดนได้เต็มๆ) เป็นเครื่องมือป้องกันที่ทรงพลังมากในปาร์ตี้เต็ม [M:3/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Friendship Bracelet's Helping Hand ให้ Help action เป็น bonus action = เท่า baseline+ |
| **Utility** | 8/10 (A) | Friendship Bracelet's Sense Location + Targetable-ข้าม-line-of-sight เป็นเครื่องมือประสานงานทีมที่ดีเยี่ยม บวก Animal Friends (pet storage) [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ธีม friendship-support ครอบคลุมทั้งป้องกัน/utility/สังคม [M:2/4] [R:2/3] [B:3/3] |

### White Magic (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี damage feature ใหม่ (เน้นสายฮีลเต็มตัว) = เท่า baseline |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Remedy (pool ฮีล d6 สเกลตามเลเวล ใช้ได้ทั้ง action/bonus action) บวก Talisman of Protection (item +d4 ทุก save แชร์ให้ทีมได้) บวก Benevolent Surge (lv10, reaction ฮีลตัวเอง/familiar/ally ทันทีที่โดนดาเมจ) บวก Witch's Gift (lv14, +3 AC ให้ทุกคนที่ฮีล) เป็นชุด healer ที่ครบและแรงที่สุดในบรรดา Witch ทั้งหมด เทียบเท่า dedicated healer ของ Cleric [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Remedy/Witch's Gift/Benevolent Surge ใช้กับตัวเองได้ทั้งหมดเช่นกัน [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 8/10 (A) | Remedy ใช้ bonus action ได้ (ประหยัด action เทียบกับคาถาฮีลปกติ) [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Talisman crafting (item แชร์ได้) เป็น utility เสริมเล็กน้อย = เท่า baseline |
| **Versatility** | 6/10 (B) | โฟกัส pure-healer archetype ชัดเจนแม้จะแข็งแกร่งมาก = เท่า baseline |
