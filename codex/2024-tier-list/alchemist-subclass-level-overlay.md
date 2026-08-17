# Alchemist — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Alchemist + subclass feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** (ไม่ใช่แค่เทียบกับ Class Baseline) ทุกเลเวล 1-20
**ที่มาข้อมูล**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — `subclassFeature` array (className=Alchemist) ทั้งหมด ยืนยันจากไฟล์จริงทุกตัว (ไม่ใช่แปลงจากคะแนนระบบเก่า)
**Class Baseline อ้างอิง**: [alchemist-level-baseline.md](alchemist-level-baseline.md)
**รูปแบบตาราง**: **Delta-only** — ยืนยันกับ user ก่อนเริ่มเขียนแล้ว (2026-08-17) — แสดงเฉพาะเลเวล/axis ที่เกรดเปลี่ยนไปจาก Class Baseline เท่านั้น (ตาม milestone principle เดิม) เลเวลที่เหลือ = เท่ากับ baseline โดยปริยาย ไม่ list ซ้ำ
**Subclass gate**: lv3 (ทุก subclass ของ Alchemist ปลดล็อกฟีเจอร์ที่ lv3/6/10/14 คงที่)
**สถานะ**: 🚧 first pass — คลาสแรกของชั้น 2 ยังไม่ผ่านรอบ refine ซ้ำแบบ Anchor Rubric (ชั้น 0 ผ่าน 12 รอบ) ตัวเลข/เหตุผลอาจต้องแก้ถ้าเจอจุดขัดแย้งภายหลัง

⚠️ **ห่างจากระบบเดิม**: [alchemist-subclass-scorecard-2024.md](alchemist-subclass-scorecard-2024.md) คือระบบเก่า (คะแนนภาพรวม 0-10 เดียวครอบคลุมทั้ง 1-20) — ใช้เป็น**จุดคาลิเบรตคร่าวๆ**เท่านั้น (peak letter grade ควรใกล้เคียงกัน) ไม่ใช่แปลงตัวเลขตรงๆ เพราะคนละ methodology — ไฟล์นี้ตัดสินจาก feature text จริงเทียบ Anchor Rubric เป็นหลัก

**Class Baseline ที่ lv3/6/10/14 (ก่อนใส่ subclass)**: Damage A/B/B/A · Control C/C/C/C · Support C/C/C/C · Survivability C/C/C/B · Action Economy B/C/C/C · Utility C/C/C/C · Versatility A/A/A/A

---

## Amorist — สาย charm/social control

*Charmer (lv3, Deception+Persuasion+Int mod) + Pheromone Bomb (lv3, AoE Charmed formula) + Magnetic Personality (lv6, Influence เป็น Bonus Action) + Beguiling Perfume (lv10, passive บังคับ attacker เปลี่ยนเป้า) + Alchemical Romance (lv14, อัปเกรด Pheromone Bomb)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Control | 3 | B | Pheromone Bomb: Severity **Tier 3** (Charmed) ต่ำกว่า Anchor peer lv3's Tier 4 (Hold Person) → Primary=C ก่อน แต่ Breadth(AoE)+Frequency(unlimited-use)+**Concentration Risk=ไม่มีเลย** (ไม่ใช่ spell) รวม 3/5 modifier เหนือ peer → ขยับ C→B |
| Control | 10 | A | + Beguiling Perfume: control lever ตัวที่ 2 ที่ทำงานอิสระ (บังคับ attacker ระยะประชิด Wis save ไม่งั้นเปลี่ยนเป้า/เสีย attack, passive ไม่จำกัดครั้ง) เสริม Breadth+Frequency ซ้อนบน B เดิม → ขยับ B→A |
| Survivability | 10 | B | Beguiling Perfume ลบ Mitigation ออกจาก D (ป้องกันตัวเองจาก melee attacker แบบ passive) เหลือ below-modifier แค่ 1/4 (Death Prevention) ไม่ถึง ≥2/4 → ขยับ C→B **เร็วกว่า baseline 1 เลเวล** (baseline ขยับที่ lv11 ปกติ) |
| Utility | 6 | B | Magnetic Personality: Influence เป็น Bonus Action + เปลี่ยนทัศนคติ Hostile→Indifferent→Friendly ได้ตรงๆ = แก้ปัญหาสังคมได้เบ็ดเสร็จ (Primary Magnitude เหนือ peer standard C) บวก Charmer's skill bonus เป็น modifier ที่ 2 → ขยับ C→B |

**สรุปเกรด**: Damage=baseline ตลอด | Control: D(1)→C(2)→**B(3-9)→A(10-20)** | Support=baseline ตลอด | Survivability: C(1-9)→**B(10-20)** | Action Economy=baseline ตลอด (Magnetic Personality มีแค่ 1/4 modifier ไม่พอขยับ) | Utility: C(1-5)→**B(6-20)** | Versatility=baseline ตลอด

---

## Apothecary — สาย healer เต็มตัว

*Painkiller Bomb (lv3, AoE temp HP = Alchemist level) + Physician's Studies (lv3) + Concentrated Healing (lv6, max ครึ่งเต๋าฮีล) + Alchemical Resurrection (lv10, ชุบชีวิตคนตาย<24ชม.) + Miracle Serum (lv14, Advantage ทุก D20 หลังดื่ม potion ฮีล)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Support | 3 | B | Painkiller Bomb: AoE temp HP (Proactive, Breadth เท่ากลุ่ม) เสริม Access-Cost เดิมของ baseline (brew-ล่วงหน้า) — Breadth+Proactive 2 modifier เหนือ peer → ขยับ C→B |
| Support | 6 | A | Concentrated Healing: บังคับ potion ฮีลครึ่งเต๋าสูงสุดเสมอ = Primary Magnitude เหนือ peer (ค่าเฉลี่ยที่ได้จริงสูงกว่าปกติ ไม่ใช่แค่ทอยเฉลี่ย) → ขยับ B→A |
| Support | 10 | S | **Alchemical Resurrection** — ชุบชีวิตคนตาย<24ชม.ด้วย potion ธรรมดา (ไม่ใช่ spell ระดับ Revivify/Raise Dead) เป็นความสามารถที่ไม่มี peer standard ไหนในตาราง Support Anchor เทียบเท่า (ใกล้เคียง Wish-tier rarity) → ตรงนิยาม S "เหนือ peer standard ชัดเจนในหลายมิติพร้อมกัน" |

**สรุปเกรด**: Damage/Control/Survivability/Action Economy/Utility/Versatility=baseline ตลอด (Quick Healer/Physician's Studies แคบเกินไปที่จะขยับ) | Support: C(1-2)→**B(3-5)→A(6-9)→S(10-20)**

---

## Dynamo Engineer — ได้ spellcasting จริงจาก Wizard spell list

*Spell Dynamos (lv3, cast Wizard spell ผ่าน dynamo slot) + Spectrum Analyzer (lv3, Detect Magic ฟรี 1/rest) + Arcano Bomb (lv6, Force dmg d12+extra d12) + Counter-Discharge (lv10, reaction กัน spell) + Arcane Recycler (lv14, reaction ยึด spell ศัตรู)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 6 | A | Arcano Bomb: dice ทั้งหมดเป็น d12 + extra 1d12 Force damage (~22.5 vs baseline's 2d10+3≈14) บวก Resistance-proofing (Force แทบไม่มีใครต้าน) — จำกัดด้วยจำนวน Dynamo/วัน (ไม่ใช่ unlimited เหมือน Bomb ปกติ) จึงกระทบ Burst/Peak+Resistance-proofing มากกว่า sustained Magnitude ล้วนๆ — 2/4 modifier เหนือ peer → ขยับ B→A **เร็วกว่า baseline 5 เลเวล** (baseline ขยับ B→A ที่ lv11) |
| Control | 3 | B | Spell Dynamos เปิดทาง Wizard control spell (เช่น Hold Person) ถ้าเลือกเตรียม — ยกระดับ Severity เพดานจาก Tier 2 (baseline) ไปแตะ Tier 4 ได้จริง แต่ผูกกับจำนวน Dynamo จำกัด (เลือก slot ระหว่าง Damage/Control/Utility) ไม่ใช่ของฟรีไม่จำกัดเหมือน Formula ปกติ → ขยับ C→B |
| Survivability | 10 | B | Counter-Discharge: reaction กัน spell เฉพาะทาง (Advantage save + Resistance ดาเมจ) เป็น Mitigation modifier ที่ 2 (ต่อจาก Evasion lv7) เหลือ below-modifier 1/4 → ขยับ C→B **เร็วกว่า baseline 1 เลเวล** |
| Action Economy | 14 | B | Arcane Recycler: reaction ยึด spell ศัตรูมาใช้ฟรี = Reaction Value **และ** Resource-to-Action Conversion พร้อมกัน (2/4 modifier) → ขยับ C→B |
| Utility | 3 | B | Spectrum Analyzer: Detect Magic ฟรี 1/short-or-long-rest (Access Cost ดีกว่า baseline's brew-ล่วงหน้าทั้งหมด) + Wizard spell list utility (ถ้าเลือกเตรียม) → ขยับ C→B |

**สรุปเกรด**: Damage: B(1-5)→**A(6-20)** | Control: D(1)→C(2)→**B(3-20)** | Support=baseline ตลอด | Survivability: C(1-9)→**B(10-20)** | Action Economy: B(1-4)→C(5-13)→**B(14-20)** | Utility: C(1-2)→**B(3-20)** | Versatility=baseline ตลอด (Dynamo pool เสริม fungibility แต่ Primary Loadout Flexibility ไม่เปลี่ยน)

---

## Mad Bomber — สาย blast ล้วนๆ

*Black Powder Bomb (lv3, d12 dice + ลบ/ลด fire resist) + Blasting Specialty (lv3, 2x dmg วัตถุ) + Timed Demolition (lv6) + Blast Shield (lv10, resistance สลับได้) + Overloaded Charge (lv14, +2 reagent ฟรี)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 5 | A | Black Powder Bomb (d12 dice + ลบ fire resistance เป้าหมาย) ชดเชยจุดที่ baseline ตกจาก A→B ที่ lv5 (ไม่มี Extra Attack) ไว้ได้ — Resistance-proofing เหนือ peer ชัดเจน → คงเกรด A แทนที่จะตกเป็น B ตาม baseline |
| Damage | 11 | S | Overloaded Charge (lv14 จริง แต่ผลสะสมกับ d12 dice ทำให้ magnitude สูงเทียบเท่า Fighter-outlier tier ตั้งแต่ baseline ขยับเป็น A ที่ lv11) — d12 dice ยกเพดานทุก tier ที่ baseline เคยผ่าน → ขยับ A→S เร็วกว่า baseline 6 เลเวล (baseline ขยับที่ lv17) |
| Survivability | 10 | B | Blast Shield: resistance เลือกได้ 1/5 ชนิด สลับได้ทุก short/long rest = Mitigation modifier ตัวที่ 2 → ขยับ C→B **เร็วกว่า baseline 1 เลเวล** |

**สรุปเกรด**: Damage: B(1-4)→**A(5-10)→S(11-20)** | Control/Support=baseline ตลอด | Survivability: C(1-9)→**B(10-20)** | Action Economy/Utility/Versatility=baseline ตลอด (Timed Demolition ใช้ Utilize action ไม่ใช่ AE modifier, Blasting Specialty แคบเกินไปสำหรับ Utility)

---

## Mutagenist — สาย self-buff/transformation

*Bonus Proficiencies (lv3) + Mutagens (lv3, bonus action self-buff Str/Dex/Con) + Shared Mutagen (lv6, แบ่ง ally 1 คน) + Advanced Mutation (lv10, rider เพิ่ม) + Mutated Blood (lv14, +2 สเตตถาวร)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Survivability | 10 | B | Advanced Mutation's Hyperelastic: Advantage ต้าน Grappled/Restrained = Debuff/Condition Resistance modifier ตัวที่ 2 (ต่อจาก Evasion lv7) → ขยับ C→B **เร็วกว่า baseline 1 เลเวล** |

**สรุปเกรด**: Damage/Control/Support/Action Economy/Utility/Versatility=baseline ตลอดอาชีพ (Strength Mutagen/Shared Mutagen/Mucilaginous ล้วนแคบหรือใกล้เคียง baseline เกินกว่าจะขยับเกรด — subclass ที่เปลี่ยนน้อยสุดในกลุ่มร่วมกับ Pigmentist) | Survivability: C(1-9)→**B(10-20)**

---

## Ooze Rancher — สาย pet/summoner ตัวเล็ก

*Ooze Resilience (lv3, acid resist+ooze-attack immunity) + Slime Bomb (lv3, halve speed+ห้าม Dash/Disengage/Dodge) + Bottled Oozes (lv6, pet Gray Ooze) + Sacrificial Slime (lv10, reaction redirect attack ไปที่ ooze) + Elemental Oozes (lv14)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 6 | A | Bottled Oozes: pet โจมตีเองด้วย Int+prof ทุกเทิร์นแบบไม่กิน action ผู้เล่น = แหล่งดาเมจเสริมจริง (Breadth/Burst modifier) → ขยับ B→A |
| Control | 3 | B | Slime Bomb: halve Speed + ห้าม Dash/Disengage/Dodge = Severity ยังคง Tier 2 เท่า baseline (Bramble) แต่เพิ่ม action-denial rider (Breadth ของผลที่ได้) → ขยับ C→B |
| Survivability | 10 | B | Sacrificial Slime: reaction redirect ทั้ง attack ไปที่ ooze pet = Mitigation modifier แรง (กันดาเมจได้ทั้งก้อน ไม่ใช่แค่ resist บางส่วน) → ขยับ C→B **เร็วกว่า baseline 1 เลเวล** |
| Action Economy | 6 | B | Bottled Ooze ลงมือเองทุกรอบ (คุมด้วย free command ถ้าอยู่ในระยะ) = board presence เพิ่มโดยไม่เสีย action ผู้เล่น (Resource-to-Action-adjacent value) → ขยับ C→B |

**สรุปเกรด**: Damage: B(1-5)→**A(6-20)** | Control: D(1)→C(2)→**B(3-20)** | Support=baseline ตลอด | Survivability: C(1-9)→**B(10-20)** | Action Economy: B(1-4)→**B(5)→B(6-20)** (แทนที่จะตกเป็น C ตาม baseline ที่ lv5) | Utility/Versatility=baseline ตลอด

---

## Pigmentist — สาย paint-themed

*Paint Bombs (lv3, extra dmg ตามสี 1d4→1d8) + Painter (lv3) + Palette Portals (lv6, เทเลพอร์ตผ่านสี 60ft) + Pigment Potions (lv10, potion+resistance) + Splatter Bombs (lv14, 3 สีพร้อมกัน)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Utility | 6 | B | Palette Portals: เทเลพอร์ต 60ft ผ่านจุดสีเปียก (ข้ามสิ่งกีดขวาง/เข้าถึงพื้นที่ปิด) = Solve-Problem magnitude เหนือ peer standard C → ขยับ C→B |

**สรุปเกรด**: Damage/Control/Support/Survivability/Action Economy/Versatility=baseline ตลอดอาชีพ (subclass ที่เปลี่ยนน้อยสุดในกลุ่มร่วมกับ Mutagenist — Paint Bombs/Pigment Potions ล้วนเป็น rider เล็กที่ไม่ข้าม threshold ขยับเกรด) | Utility: C(1-5)→**B(6-20)**

---

## Resonator — สาย เสียง/คลื่นสั่นสะเทือน

*Resonant Frequency (lv3, auto-dmg ตามวัสดุ ไม่ทอย attack) + Anti-Sound Bomb (lv3, เลือก save type) + Flashbang (lv6, ห้าม Opp Attack) + Audio Enhancer (lv10, Blindsight+Thunder immunity) + Reverb Explosions (lv14)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Support | 6 | B | Flashbang เลือกป้องกัน ally ได้ด้วย (ไม่ใช่แค่ตัวเอง) ในระยะ 10ft = Breadth+Proactive modifier (ช่วยปาร์ตี้ถอยได้ปลอดภัย) → ขยับ C→B |
| Survivability | 10 | B | Audio Enhancer: Thunder immunity+Deafened immunity แบบ passive ตลอดเวลา = Debuff/Condition Resistance modifier ตัวที่ 2 → ขยับ C→B **เร็วกว่า baseline 1 เลเวล** |
| Utility | 10 | B | Audio Enhancer's Blindsight 30ft = การรับรู้ทะลุความมืด/มองไม่เห็นในระยะ ทั้ง exploration และคอมแบต = Magnitude/Reliability เหนือ peer → ขยับ C→B |

**สรุปเกรด**: Damage/Control/Action Economy/Versatility=baseline ตลอด (Resonant Frequency ชดเชยกันเองระหว่าง auto-hit กับ Breadth แคบ, Flashbang's Severity ยังแค่ Tier 1) | Support: C(1-5)→**B(6-20)** | Survivability: C(1-9)→**B(10-20)** | Utility: C(1-9)→**B(10-20)**

---

## Venomsmith — สาย poison เต็มตัว

*Laughing Gas Bombs (lv3, d10 dice+nat-1 prone rider) + Poisoner (lv3, free Discovery) + Alchemical Assassin (lv6, bonus action poison ring ทุกเทิร์น) + Mithridatism (lv10, poison immunity เต็ม) + Toxic Recompense (lv14, reaction poison spray)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 6 | A | Alchemical Assassin: bonus action สร้างดาเมจพิษเพิ่มได้ทุกเทิร์นแบบไม่จำกัดจำนวนครั้ง/วัน = แหล่งดาเมจคู่ขนานจริงจัง (Magnitude+Burst modifier) → ขยับ B→A |
| Survivability | 10 | B | Mithridatism: Poison damage **และ** Poisoned condition immunity เต็มรูปแบบ = Debuff/Condition Resistance modifier แรง (immune ทั้งดาเมจและ condition พร้อมกัน) → ขยับ C→B **เร็วกว่า baseline 1 เลเวล** |
| Action Economy | 6 | B | Alchemical Assassin: bonus action ให้ดาเมจ+poison ซ้ำได้ทุกเทิร์นไม่แย่ง action หลัก = Bonus Action Value เหนือ peer ชัดเจน → ขยับ C→B |

**สรุปเกรด**: Damage: B(1-5)→**A(6-20)** | Control/Support/Utility/Versatility=baseline ตลอด (Laughing Gas prone rider ผูก nat-1 หายาก, Poisoner แคบเฉพาะ poison crafting) | Survivability: C(1-9)→**B(10-20)** | Action Economy: B(1-4)→C(5)→**B(6-20)**

---

## Xenoalchemist — สาย monster-graft + golem

*Mad Scientist (lv3, graft ฟรี 2 ชิ้น) + Sleep Bomb (lv3, 2-stage Wis save→Unconscious) + Xenobiology (lv3) + Examine Specimen (lv6, bonus action reveal ข้อมูล) + Necromantic Organs (lv10, drop เป็น 2×level HP แทน 0) + It's Alive! (lv14, Golem ถาวร)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 14 | S | It's Alive!: Golem เป็นแหล่งดาเมจอิสระถาวร (สู้เองทุกรอบ คุมด้วย Bonus Action) ซ้อนบน graft weapon เดิม — ระดับเทียบเท่า outlier-comparable ตั้งแต่เลเวลนี้ → ขยับ A→S **เร็วกว่า baseline 3 เลเวล** (baseline ขยับที่ lv17) |
| Control | 3 | A | Sleep Bomb: Severity **Tier 4 เต็มรูปแบบ** (Unconscious จริง หลัง 2-stage save) = ตรงกับ Anchor peer lv1 (Sleep spell) พอดี ครั้งแรกที่ Alchemist แตะเพดาน Severity ได้ — Primary=B ก่อน บวก Breadth(AoE)+**Concentration Risk=ไม่มีเลย** (ไม่ใช่ spell) เป็น modifier เหนือ peer ≥2/5 → ขยับ B→A |
| Survivability | 10 | B | Necromantic Organs: ตก 0 HP → drop เป็น 2×level HP แทน (1/long rest) = Death Prevention modifier ระดับเทียบเท่า Relentless Rage-tier ("ตัวอย่างเพดาน" ใน Anchor) → ขยับ C→B **เร็วกว่า baseline 1 เลเวล** |
| Utility | 6 | B | Examine Specimen: bonus action เปิดเผย AC/Immunity/Resistance/Bloodied (Reveal Info จริงจัง ไม่ใช่แค่ identify) บวก Xenobiology's Advantage ระบุมอนสเตอร์ → ขยับ C→B |

**สรุปเกรด**: Damage: A(1-13)→**S(14-20)** | Control: D(1)→C(2)→**A(3-20)** | Support=baseline ตลอด | Survivability: C(1-9)→**B(10-20)** | Action Economy=baseline ตลอด | Utility: C(1-5)→**B(6-20)** | Versatility=baseline ตลอด (Sleep Bomb/graft/Golem ทั้งหมดขยาย Cross-Axis Coverage แต่ Primary Loadout Flexibility ไม่เปลี่ยน — เพดาน A เท่า baseline)

---

## สรุปรวม 10 subclass (peak grade ต่อ axis)

| Subclass | Damage peak | Control peak | Support peak | Survivability peak | Action Economy peak | Utility peak | Versatility peak |
|---|---|---|---|---|---|---|---|
| Class Baseline | S(17-20) | C | C | B(11-20) | B(1-4)/C(5+) | C | A |
| Amorist | =baseline | **A(10-20)** | =baseline | **B(10-20)** | =baseline | **B(6-20)** | =baseline |
| Apothecary | =baseline | =baseline | **S(10-20)** | =baseline | =baseline | =baseline | =baseline |
| Dynamo Engineer | **A(6-20)** | **B(3-20)** | =baseline | **B(10-20)** | **B(14-20)** | **B(3-20)** | =baseline |
| Mad Bomber | **S(11-20)** | =baseline | =baseline | **B(10-20)** | =baseline | =baseline | =baseline |
| Mutagenist | =baseline | =baseline | =baseline | **B(10-20)** | =baseline | =baseline | =baseline |
| Ooze Rancher | **A(6-20)** | **B(3-20)** | =baseline | **B(10-20)** | **B(5-20)** | =baseline | =baseline |
| Pigmentist | =baseline | =baseline | =baseline | =baseline | =baseline | **B(6-20)** | =baseline |
| Resonator | =baseline | =baseline | **B(6-20)** | **B(10-20)** | =baseline | **B(10-20)** | =baseline |
| Venomsmith | **A(6-20)** | =baseline | =baseline | **B(10-20)** | **B(6-20)** | =baseline | =baseline |
| Xenoalchemist | **S(14-20)** | **A(3-20)** | =baseline | **B(10-20)** | =baseline | **B(6-20)** | =baseline |

**ข้อค้นพบเบื้องต้น**:
1. **lv10 คือจุดขยับ Survivability ที่พบซ้ำ 8/10 subclass** (ทุกตัวยกเว้น Apothecary/Pigmentist) — เพราะ Alchemist baseline เองมี Mitigation-modifier แรกที่ lv11 (Blast Coating) พอดี ทำให้ subclass feature เกือบทุกสายที่มี Mitigation/Death-Prevention rider ของตัวเอง (มักอยู่ lv10 ตาม cadence subclass) มาถึงเร็วกว่า baseline 1 เลเวลเป็นรูปแบบซ้ำ ไม่ใช่เรื่องบังเอิญ
2. **Pigmentist/Mutagenist คือ subclass ที่ขยับน้อยสุด** (1 axis เท่านั้น) — ตรงกับที่ระบบเก่าให้ Overall D/C ต่ำสุดในกลุ่มเหมือนกัน แม้วิธีคิดจะคนละ methodology
3. **Xenoalchemist คือ subclass เดียวที่แตะ Severity Tier 4 เต็มรูปแบบใน Control** (Sleep Bomb) — subclass อื่นที่มี control (Amorist/Ooze Rancher) ติดเพดาน Tier 2-3 ของ baseline chassis
4. **Damage bump ส่วนใหญ่ผูกกับ "แหล่งดาเมจที่ 2" ที่ทำงานอิสระ** (pet/golem: Ooze Rancher, Xenoalchemist / bonus-action-repeatable: Venomsmith / resistance-proofing dice-upgrade: Dynamo Engineer, Mad Bomber) ไม่ใช่การเพิ่ม Bomb dice ตรงๆ — สอดคล้องกับ baseline's finding ว่า Alchemist ไม่มี Extra Attack เชิงโครงสร้าง ต้องหา workaround อื่นเสมอ
