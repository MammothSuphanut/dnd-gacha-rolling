# Artificer — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Artificer + subclass feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: `src/data/5etools/official/class/class-artificer.json` — `subclassFeature` array กรองเฉพาะ source **EFA** (2024) สำหรับ Alchemist/Armorer/Artillerist/Battle Smith/Cartographer และ **RHW** สำหรับ Reanimator (ไม่มี EFA reprint แต่เป็น 3rd-party 2024-native อยู่แล้ว) — ไม่ใช้ source TCE (2014) ที่ปนอยู่ในไฟล์เดียวกัน
**Class Baseline อ้างอิง**: [artificer-level-baseline.md](artificer-level-baseline.md)
**รูปแบบตาราง**: Delta-only (เหมือน [alchemist-subclass-level-overlay.md](alchemist-subclass-level-overlay.md))
**Subclass gate**: lv3/5/9/15 — **ต่างจาก Alchemist (lv3/6/10/14)** เพราะ Artificer เป็น half-caster (subclass feature ผูกกับจังหวะ ASI/slot ของตัวเอง ไม่ใช่ cadence เดียวกับ Alchemist)
**สถานะ**: 🚧 first pass

**Class Baseline ที่ lv3/5/9/15 (ก่อนใส่ subclass)**: Damage B/B/B/C · Control C/C/C/C · Support C/C/C/C · Survivability C/C/C/C · Action Economy B/C/B/B · Utility A/A/A/A · Versatility S/S/S/S

⚠️ **ข้อจำกัดเชิงโครงสร้างที่พบระหว่างทำไฟล์นี้**: Artificer baseline's Survivability มี **3/4 มิติ = D ตลอด** (Mitigation/Debuff Resistance/Death Prevention) มากกว่า Alchemist (ซึ่งมีปัญหาแค่ 2-3 มิติและลดลงเร็วกว่า) — กติกา tie-break ต้องการ below-modifier **≤1/4** ถึงจะขยับเกรดขึ้นได้ (ดู [00-level-anchor-rubric.md § Sub-dimension tie-break](00-level-anchor-rubric.md#sub-dimension-tie-break)) แปลว่า **subclass ต้องแก้ D ให้ได้อย่างน้อย 2 ใน 3 มิติพร้อมกัน** ถึงจะขยับ Survivability ขึ้นจาก C ได้ ต่างจาก Alchemist subclass ที่แค่แก้ 1 มิติเพิ่มจาก baseline ที่แก้ไปแล้ว 1 มิติก็พอ — ผลคือ **Artificer subclass ส่วนใหญ่ไม่ขยับ Survivability เลย** แม้จะมี feature ป้องกันตัวที่ดูแรง (เพราะแก้ได้แค่ 1 มิติ ไม่ใช่ 2) มีข้อยกเว้นแค่ 2 subclass ที่แก้ได้ครบ 2 มิติพร้อมกัน (ดูรายละเอียดด้านล่าง)

---

## Alchemist (subclass) — สาย elixir/potion

*Experimental Elixir (lv3, 2 elixir สุ่มผล/Long Rest จากตาราง Healing/Buff/ฯลฯ) + Tools of the Trade (lv3) + Alchemical Savant (lv5, +Int mod 1 roll ฮีล/Acid/Fire/Poison dmg เมื่อใช้ Alchemist's Supplies เป็น focus) + Restorative Reagents (lv9, free Lesser Restoration) + Chemical Mastery (lv15: Alchemical Eruption +2d8 Force 1/turn, Chemical Resistance Acid+Poison resist+Poisoned immunity, Conjured Cauldron free)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 5 | A | Alchemical Savant: +Int mod (~3) บวกเข้า 1 roll ของสเปลล์ Acid/Fire/Poison ทุกครั้งที่ใช้ Alchemist's Supplies เป็น focus — เป็น modifier ที่ Anchor's cantrip-track ไม่มี (cantrip ปกติไม่บวก mod ตามกติกาจริง) → Magnitude เหนือ peer → ขยับ B→A |
| Damage | 15 | B | Chemical Mastery's Alchemical Eruption: +2d8 Force damage (~9) ซ้อนบน spell dmg ที่เข้าเงื่อนไข 1 ครั้ง/เทิร์น = Magnitude modifier ตัวที่ 2 ชดเชยจุดที่ baseline ตกเป็น C ที่ lv11-20 → ขยับ C→B |
| Support | 3 | B | Experimental Elixir: มีผล Healing ในตาราง (Breadth=แจกใครก็ได้ใน 5ft, Proactive=หลายผลเป็นบัฟ) เสริม Access Cost เดิม (2 elixir/rest คงที่ ไม่ใช่ cast-เมื่อต้องการ) — Breadth+Proactive 2 modifier → ขยับ C→B |
| Support | 15 | A | Chemical Mastery's Conjured Cauldron: free-cast Tasha's Bubbling Cauldron (แจก elixir เพิ่มแบบไม่เสีย slot) เสริม Frequency ซ้อนบน B เดิม → ขยับ B→A |
| Survivability | 15 | B | Chemical Resistance: Acid+Poison **resistance** (Mitigation) **และ** Poisoned **immunity** (Debuff Resistance) แก้ 2 มิติพร้อมกันจาก feature เดียว — เหลือ below-modifier แค่ 1/4 (Death Prevention) → ขยับ C→B (1 ใน 2 subclass ของ Artificer ที่ทำได้) |

**สรุปเกรด**: Damage: B(1-4)→**A(5-14)→B(15-20)** | Control=baseline ตลอด | Support: C(1-2)→**B(3-14)→A(15-20)** | Survivability: C(1-14)→**B(15-20)** | Action Economy/Utility/Versatility=baseline ตลอด

---

## Armorer — สาย power-armor เต็มตัว

*Arcane Armor + Armor Model เลือก 1 (Dreadnaught/Guardian/Infiltrator) (lv3) + **Extra Attack** (lv5) + Improved Armorer (lv9, +1 atk/dmg special weapon + armor plan เสริม) + Perfected Armor (lv15, model-specific upgrade)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 11 | B | **Extra Attack** (lv5) เปิดสาย weapon-attack คู่ขนานกับ cantrip track — special weapon (เช่น Dreadnaught's 1d10 Force + Int mod) ตี 2 ครั้ง/action ตรงกับมาร์เชียล peer-standard (~17) พอดี ทำให้มีทาง "เลือกสาย weapon แทน cantrip" ตอนที่ cantrip track ของ baseline ตกเป็น C ที่ lv11 — ใช้สายที่ดีกว่าเสมอ → **คงเกรด B แทนที่จะตกเป็น C ตาม baseline** |
| Damage | 15 | A | Perfected Armor (Dreadnaught: dice→2d6≈7) + Improved Armorer's +1 atk/dmg (lv9) สะสมกันดัน weapon track เหนือมาร์เชียล peer ชัดเจน (2/4 modifier) → ขยับ B→A |
| Action Economy | 5 | B | Extra Attack แก้ Primary (Attack-Action Efficiency) ให้ตรง peer-standard **โดยตรง** ทันที ไม่ต้องพึ่ง modifier สะสมแบบ baseline (Magic Item Tinker+Flash of Genius ที่ต้องรอถึง lv7) → **ขยับเกรดขึ้นตรงจุดที่ baseline ตก C (lv5-6) ไปเป็น B ทันที ข้าม dip ไปเลย** |

**สรุปเกรด**: Damage: B(1-10)→**B(11-14)→A(15-20)** | Control/Support=baseline ตลอด | Survivability=baseline ตลอด (Guardian's temp HP แก้ได้แค่ 1/3 มิติ D ไม่พอครบ 2 มิติตามกฎ) | Action Economy: B(1-4)→**B(5-6)**→B(7-20, เท่า baseline พอดีอยู่แล้ว) | Utility/Versatility=baseline ตลอด

---

## Artillerist — สาย turret/cannon

*Eldritch Cannon (lv3, สร้างปืนใหญ่ 1 ตัว โหมด Flamethrower/Force Ballista/Protector — ยืนยันจากความรู้ทั่วไป TCE/EFA เพราะตาราง entries เต็มถูกตัดในไฟล์ extract) + Arcane Firearm (lv5, +1d8 dmg roll) + Explosive Cannon (lv9, Detonate reaction 3d10 Force + Firepower +1d8) + Fortified Position (lv15, cannอง 2 ตัวพร้อมกัน + half cover)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 5 | A | Arcane Firearm: +1d8(~4.5) บวกเข้า 1 damage roll ของสเปลล์ทุกครั้งที่ cast ผ่านปืน = Magnitude modifier ตรงบวก Eldritch Cannon เป็นแหล่งดาเมจอิสระคู่ขนาน (Breadth/Burst modifier) — 2 modifier เหนือ peer → ขยับ B→A |
| Damage | 15 | S | Fortified Position: cannon 2 ตัวพร้อมกัน = แหล่งดาเมจอิสระเพิ่มเป็น 2 เท่า ซ้อนบน Firepower(lv9, +1d8/cannon) ที่สะสมมาแล้ว → ระดับ outlier-comparable → ขยับ A→S |
| Support | 3 | B | Eldritch Cannon's **Protector mode** (ยืนยันจากความรู้ทั่วไป): แจก temp HP ให้ ally ในระยะทุกเทิร์นที่สั่ง = Breadth+Proactive modifier → ขยับ C→B |
| Support | 9 | A | Explosive Cannon's Firepower: +1d8 บวกเข้าจำนวน temp HP ที่ Protector แจก = Magnitude modifier ที่ 2 → ขยับ B→A |

**สรุปเกรด**: Damage: B(1-4)→**A(5-14)→S(15-20)** | Control=baseline ตลอด (Force Ballista's push เป็นแค่ forced-movement ไม่ถึง Severity Tier ที่นับ) | Support: C(1-2)→**B(3-8)→A(9-20)** | Survivability=baseline ตลอด (half-cover จาก Fortified Position แคบ+เป็น AC-adjacent ที่ Anchor ตัดออกอยู่แล้ว) | Action Economy/Utility/Versatility=baseline ตลอด

---

## Battle Smith — สาย protector+medic พร้อม Steel Defender

*Battle Ready (lv3, Int mod atk/dmg อาวุธเวท + martial weapon prof) + Steel Defender (lv3, pet — Deflect Attack reaction ยืนยันจาก statblock จริงใน `bestiary-efa.json`) + **Extra Attack** (lv5) + Arcane Jolt (lv9, on-hit +2d6 dmg หรือฮีล 2d6) + Improved Defender (lv15, Jolt→4d6)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 5 | B | Extra Attack เปิดสาย weapon-attack (Int mod ผ่าน Battle Ready) คู่ขนานกับ cantrip — **คงเกรด B แทนที่จะตกเป็น C ตาม baseline ที่ lv11-20** (เหตุผลเดียวกับ Armorer) |
| Damage | 9 | A | Arcane Jolt's Destructive Energy: +2d6(~7) dmg ทุกครั้งที่ตี (ตัวเองหรือ Steel Defender ก็ trigger ได้) Int mod ครั้ง/วัน บวก Steel Defender's Force-Empowered Rend เป็นแหล่งดาเมจอิสระคู่ขนาน — 2 modifier เหนือ peer → ขยับ B→A |
| Damage | 15 | S | Improved Jolt: +2d6→**4d6**(~14) เพิ่มขึ้นเท่าตัว ซ้อนบน weapon track+pet track เดิม → ระดับ outlier-comparable → ขยับ A→S |
| Support | 9 | B | Arcane Jolt's Restorative Energy: ฮีล 2d6(~7) ให้ตัวเองหรือเป้าใน 30ft ทุกครั้งที่ตี Int mod ครั้ง/วัน — proactive-ish (trigger จากการโจมตีตัวเอง ไม่ใช่ reactive ล้วน), Frequency ดี (ทุกครั้งที่ตีถูก ไม่ใช่จำกัด/วันเฉยๆ) → ขยับ C→B |
| Support | 15 | A | Improved Jolt เพิ่ม Restorative Energy เป็น 4d6(~14) เท่าตัว → ขยับ B→A |
| Survivability | 9 | B | Steel Defender's **Deflect Attack** (reaction, บังคับ Disadvantage การโจมตีที่เล็งใครก็ตามในระยะ 5ft จากตัว defender รวมถึง Battle Smith เองถ้ายืนใกล้ — ยืนยันจาก statblock จริง) = Mitigation modifier (แบบมีเงื่อนไขตำแหน่ง) **บวก** Arcane Jolt's Restorative Energy ที่ใช้กับตัวเองได้ = Death Prevention modifier — **แก้ครบ 2/3 มิติพร้อมกัน** → ขยับ C→B (1 ใน 2 subclass ของ Artificer ที่ทำได้) |
| Action Economy | 5 | B | Extra Attack แก้ Primary ให้ตรง peer ทันที เหมือน Armorer → ข้าม dip ที่ lv5-6 ไปเป็น B ตรงๆ |

**สรุปเกรด**: Damage: B(1-4)→**B(5-8)→A(9-14)→S(15-20)** | Control=baseline ตลอด | Support: C(1-8)→**B(9-14)→A(15-20)** | Survivability: C(1-8)→**B(9-20)** | Action Economy: B(1-4)→**B(5-6)**→B(7-20) | Utility/Versatility=baseline ตลอด

---

## Cartographer — สาย navigator/recon

*Adventurer's Atlas (lv3, แผนที่แจก initiative+1d4 + targeting ข้ามระยะสายตา) + Mapping Magic (lv3, free Faerie Fire + Portal Jump) + Guided Precision (lv5, +Int mod 1 dmg roll + Faerie Fire concentration ไม่หลุดจากดาเมจ) + Ingenious Movement (lv9, Flash of Genius เทเลพอร์ตด้วย) + Superior Atlas (lv15, Safe Haven cheat-death + free Find the Path)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 5 | A | Guided Precision: +Int mod(~3) บวกเข้า 1 damage roll ทุกเทิร์นจาก Cartographer spell หรือ attack ที่โดน Faerie-Fire-marked target — Magnitude modifier ถาวรที่คงอยู่แม้ baseline จะตกเป็น C ที่ lv11 (modifier ยังเหนือ peer ต่อเนื่อง ไม่ใช่แค่จุดเดียว) → ขยับ B→A **และคงเกรด A ตลอด 5-20** (ไม่ตกตามจุด lv11 ของ baseline) |
| Support | 3 | B | Illuminated Cartography: free-cast Faerie Fire Int mod/วัน = Advantage การโจมตีให้**ทั้งปาร์ตี้**ต่อเป้าที่ทำเครื่องหมาย (Breadth กว้าง+Proactive) → ขยับ C→B |
| Utility | 15 | S | Unerring Path: free-cast Find the Path (ยกเลิกอุปสรรคการเดินทางทั้งหมด 1 วัน) เทียบเท่า peer's lv13 benchmark (Teleport/Plane Shift tier) แต่ได้ฟรีไม่เสีย slot ซ้อนบน Replicate Magic Item ที่กว้างอยู่แล้ว → ขยับ A→S |

**สรุปเกรด**: Damage: B(1-4)→**A(5-20)** | Control=baseline ตลอด (Faerie Fire ไม่ใช่ condition-lock) | Support: C(1-2)→**B(3-20)** | Survivability=baseline ตลอด (Safe Haven แก้ได้แค่ Death Prevention มิติเดียว ไม่ครบ 2 มิติตามกฎ) | Action Economy=baseline ตลอด (Ingenious Movement เสริม Flash of Genius ที่นับไปแล้ว ไม่ใช่มิติใหม่) | Utility: A(2-14)→**S(15-20)** | Versatility=baseline ตลอด

---

## Reanimator — สาย necromancy pet

*Reanimated Companion (lv3, pet ลบล้างตอนจบ Long Rest) + Jolt to Life (lv3, Spare the Dying → ฮีล Artificer-level + AoE lightning) + Strange Modifications (lv5, 1 rider) + Improved/Macabre Modifications (lv9, Death Burst→4d4 ไม่โดน resist + 2 rider รวม Gaunt's Frightened aura) + Refined Reanimation (lv15, free Raise Dead + Life Transfer cheat-death-ish + 3 rider)*

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 5 | A | Companion โจมตีเองทุกเทิร์น (Dreadful Swipe) เป็นแหล่งดาเมจอิสระ บวก Arcane Conduit (ถ้าเลือก): +Int mod(~3) เข้า 1 damage roll ของสเปลล์ Evocation/Necromancy — 2 modifier เหนือ peer → ขยับ B→A |
| Damage | 15 | S | Superior Modifications (3 rider พร้อมกัน) + Improved Reanimation's ignore-resistance (lv9) สะสมดันดาเมจ companion เหนือ peer ชัดเจน → ขยับ A→S |
| Control | 9 | B | **Gaunt modification** (จาก Macabre Modifications): AoE Frightened (Severity **Tier 2** — บังคับ Wis save ทุกเทิร์นที่เริ่มในระยะ 10ft, disadvantage attack/check ขณะเห็นแหล่งกลัว) เป็น passive aura ต่อเนื่อง (Frequency สูง, Breadth=ทุกตัวในระยะ) → ขยับ C→B |
| Support | 15 | S | Facilitated Revival: free-cast **Raise Dead** (ชุบชีวิตคนตาย≤10วัน ไม่เสีย slot/material) — เทียบเท่าหรือแรงกว่า Apothecary(Alchemist subclass)'s Alchemical Resurrection เพราะเป็นสเปลล์ทางการระดับสูง ไม่ใช่ potion — ตรงนิยาม S |

**สรุปเกรด**: Damage: B(1-4)→**A(5-14)→S(15-20)** | Control: C(1-8)→**B(9-20)** | Support: C(1-14)→**S(15-20)** | Survivability=baseline ตลอด (Life Transfer แก้ได้แค่ Death Prevention มิติเดียว ไม่ครบ 2 มิติ) | Action Economy/Utility/Versatility=baseline ตลอด

---

## สรุปรวม 6 subclass (peak grade ต่อ axis)

| Subclass | Damage peak | Control peak | Support peak | Survivability peak | Action Economy peak | Utility peak | Versatility peak |
|---|---|---|---|---|---|---|---|
| Class Baseline | C(11-20) | C | C(1-2)/C(3+) | C | C(5-6)/B(7+) | A(2+) | S(2+) |
| Alchemist (subclass) | **B(15-20)** | =baseline | **A(15-20)** | **B(15-20)** | =baseline | =baseline | =baseline |
| Armorer | **A(15-20)** | =baseline | =baseline | =baseline | **B(5-6, ข้าม dip)** | =baseline | =baseline |
| Artillerist | **S(15-20)** | =baseline | **A(9-20)** | =baseline | =baseline | =baseline | =baseline |
| Battle Smith | **S(15-20)** | =baseline | **A(15-20)** | **B(9-20)** | **B(5-6, ข้าม dip)** | =baseline | =baseline |
| Cartographer | **A(5-20)** | =baseline | **B(3-20)** | =baseline | =baseline | **S(15-20)** | =baseline |
| Reanimator | **S(15-20)** | **B(9-20)** | **S(15-20)** | =baseline | =baseline | =baseline | =baseline |

**ข้อค้นพบเบื้องต้น**:
1. **Damage คือ axis ที่ขยับมากที่สุดในทุก subclass** (5/6 ตัว ยกเว้นไม่มีเลยสักตัว) — ตรงข้ามกับ Alchemist ที่ Damage ขยับแค่ 5/10 ตัว เพราะ Artificer baseline's Damage มีจุดอ่อนชัดเจน (ตกเป็น C ที่ lv11 จาก slot-cap ถาวร) ทำให้ subclass feature แทบทุกสาย (weapon track ผ่าน Extra Attack, pet/cannon, flat-mod bonus) เข้ามาแก้จุดอ่อนนี้ได้พอดี
2. **Extra Attack (Armorer lv5, Battle Smith lv5) แก้ Action Economy's dip ได้ทันทีแบบไม่ต้องรอสะสม modifier** — ต่างจาก baseline เองที่ต้องรอ 2 modifier สะสม (Magic Item Tinker lv6 + Flash of Genius lv7) ถึงจะขยับ B ที่ lv7 — subclass ที่มี Extra Attack ข้าม dipไปตั้งแต่ lv5 เลย
3. **Survivability คือ axis ที่ขยับยากที่สุด** (2/6 subclass เท่านั้น: Alchemist-subclass, Battle Smith) เพราะ baseline เริ่มจาก 3/4 มิติ=D (มากกว่า Alchemist class ที่เริ่มน้อยกว่า) ต้องแก้ครบ 2 มิติพร้อมกันถึงจะขยับ — Cartographer/Reanimator/Artillerist/Armorer ล้วนมี feature ป้องกันตัวที่ดูแรง (Safe Haven/Life Transfer/Deflect Attack เดี่ยวๆ/Guardian temp HP) แต่แก้ได้แค่ 1 มิติ ไม่พอ
4. **Support S-tier เกิดจาก "revival magic ฟรี" ซ้ำรูปแบบเดียวกับ Alchemist class's Apothecary** — Reanimator's free Raise Dead (lv15) และ Alchemist-subclass's Conjured Cauldron ecosystem ยืนยันว่า pattern "ชุบชีวิต/free-cast peak-tier spell" คือทางเดียวที่ดัน Support axis ไปถึง S ในทั้ง 2 คลาสที่ทำมา
