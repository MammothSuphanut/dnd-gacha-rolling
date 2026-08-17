# Gunslinger — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Gunslinger Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Gunslinger", source: "ValdaGunslinger"` — homebrew จาก *Valda's Spire of Secrets: Gunslinger* (ภาคเสริมเฉพาะคลาสนี้) — ยืนยัน `classFeaturesFull` ครบ 24 รายการ + `optionalfeature.json` สำหรับ 6 maneuver (Bite the Bullet/Blindfire/Dodge Roll/Grazing Shot/Maverick Spirit/Skin of Your Teeth)
**สถานะ**: คลาสที่ 13 ของชั้น 1 — มาร์เชียลนักแม่นปืนล้วน (ไม่มีสเปลล์เลย) โครงสร้างคล้าย Captain (Risk Dice = maneuver resource) แต่ **maneuver ทั้ง 6 ตัวเป็น self-only ทั้งหมด ไม่มี ally-targeting เลยสักตัว** (ต่างจาก Captain ที่ครึ่งหนึ่งเล็ง ally)

⚠️ **หมายเหตุ**: **Gut Shot (lv5)** ให้ debuff จริงต่อศัตรู (Speed halved+Disadvantage 1 นาที) แต่ **trigger เฉพาะตอน crit เท่านั้น** — นับเป็น Control mechanism จริงแต่ conditional สูง (ต่างจาก Barbarian's Brutal Strike ที่ trigger ได้ทุกครั้งที่ตี)

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: DEX/CHA · **ไม่มีสเปลล์คาสติ้งเลย**

| Lv | Risk Dice | Weapon Mastery (kinds) | Critical Shot range | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|
| 1 | — | 2 | — | Fighting Style, Quick Draw (adv Initiative+double draw), **Weapon Mastery** | 11 |
| 2 | 4d8 | 2 | 19-20 | **Critical Shot**, **Risk** (6 maneuver: Bite the Bullet/Blindfire/Dodge Roll/Grazing Shot/Maverick Spirit/Skin of Your Teeth) | 19 |
| 3 | 4d8 | 2 | 19-20 | *(Gunslinger Subclass — ยกเว้น)* | 27 |
| 4 | 4d8 | 3 | 19-20 | ASI | 35 |
| 5 | 4d8 | 3 | 19-20 | **Extra Attack**, Gut Shot (crit→Speed halved+Disadv 1 นาที) | 43 |
| 6 | 5d8 | 3 | 19-20 | *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 5d8 | 3 | 19-20 | **Evasion** | 59 |
| 8 | 5d8 | 3 | 19-20 | ASI | 67 |
| 9 | 5d8 | 3 | 18-20 | Critical Shot ขยาย | 75 |
| 10 | 5d10 | 4 | 18-20 | *(Subclass feature — ยกเว้น)* | 83 |
| 11 | 5d10 | 4 | 18-20 | **Overkill** (ability mod ติดดาเมจเสมอ/+1d8 ถ้ามีอยู่แล้ว) | 91 |
| 12 | 5d10 | 4 | 18-20 | ASI | 99 |
| 13 | 5d10 | 4 | 18-20 | **Cheat Death** (ตก0HP→เหลือ1HP+ฟื้น=level) | 107 |
| 14 | 6d10 | 4 | 18-20 | *(Subclass feature — ยกเว้น)* | 115 |
| 15 | 6d10 | 4 | 18-20 | Dire Gambit (Initiative/crit → คืน Risk Die) | 123 |
| 16 | 6d10 | 4 | 18-20 | ASI | 131 |
| 17 | 6d10 | 4 | 17-20 | Critical Shot ขยายสุดท้าย | 139 |
| 18 | 6d12 | 4 | 17-20 | Deft Maneuver (bonus action เสริมเฉพาะ maneuver) | 147 |
| 19 | 6d12 | 4 | 17-20 | Epic Boon | 155 |
| 20 | 6d12 | 4 | 17-20 | **Headshot** (crit HP<100→ตายทันที / มากกว่า→+10d10) | 163 |

---

## Damage Axis

**Primary = Magnitude** — Extra Attack ตรงเวลา lv5 = matches peer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | B | matches peer — modifier: Burst=เหนือกว่า(Critical Shot ขยาย crit range จาก lv2) แต่ 1/4 ไม่พอขยับ |
| 11-19 | **A** | **Overkill ปลดล็อก** — ability mod ติดดาเมจเสมอ (แม้อาวุธปืนที่ปกติไม่บวก mod) + 1d8 เสริมถ้ามีอยู่แล้ว ซ้อนเหนือ peer baseline ตรงๆ (pattern เดียวกับ Barbarian/Craftsman/Cleric) → **A** |
| 20 | **S** | **Headshot** — crit ต่อเป้า HP<100 = ตายทันที, มากกว่า = +10d10 → nova ระดับเดียวกับ Grand Finale/Three Extra Attacks = **S** |

**สรุปเกรด**: B(1-10) → **A(11-19)** → **S(20)**

---

## Control Axis

**Primary = Severity**. Gut Shot (lv5) เป็นกลไก Control เดียวในเบสคลาส — **trigger เฉพาะ crit เท่านั้น**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | D | ไม่มีกลไกเลย = **D** |
| 5-20 | **C** | Gut Shot: Speed halved+Disadvantage 1 นาที (Tier1-2, ต่ำกว่า peer's Tier4) แต่ conditional สูงกว่า Barbarian's Brutal Strike (ต้อง crit ไม่ใช่แค่ตีโดน) = **C** (มีกลไกจริงแต่อ่อน+conditional) |

**สรุปเกรด**: D(1-4) → **C(5-20)**

---

## Support Axis

Risk maneuver ทั้ง 6 ตัวเป็น self-only หมด — ไม่มีกลไกเล็ง ally เลยสักตัว

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไก Support เลยตลอด 20 เลเวล = **D flat** |

**สรุปเกรด**: **D(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B — modifier ยังไม่มีอะไรปลดล็อก (Risk เริ่ม lv2) → 3/4 ต่ำกว่า(Mitigation/Debuff/Death=D) → ขยับลง 1 ขั้นเป็น **C** |
| 2-6 | **A** | **Risk ปลดล็อก** — Skin of Your Teeth(reaction+Risk Die เข้า AC)=Mitigation เหนือกว่า, Maverick Spirit(reroll Int/Wis/Cha check-**หรือ**save พลาด)=Save Reliability เหนือกว่า, Bite the Bullet(temp HP=Risk Die+level)=Death Prevention เหนือกว่า → **3/4 เหนือกว่าพร้อมกันตั้งแต่ lv2 (แรงกว่า Fighter's Second Wind ที่มีแค่ 1 มิติ)** → ถึงเกณฑ์ไกล → ขยับขึ้น 1 ขั้นจาก B(Primary) เป็น **A** ทันที |
| 7-20 | = lv2-6 | **Evasion ปลดล็อก (lv7)** — Debuff Resistance ขยับเป็นเหนือกว่าด้วย (4/4 เต็ม) แต่ยังคง cap ที่ +1 ขั้น → คง **A** |

**สรุปเกรด**: C(1) → **A(2-20)** — แรงกว่า Fighter's B(1-8)→A(9-20) เพราะ Risk maneuver ตี 3 มิติพร้อมกันตั้งแต่ lv2 (Fighter's Second Wind ตีแค่ 1 มิติที่ lv1)

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | modifier ยังไม่มีอะไรปลดล็อก → 4/4 ต่ำกว่า → ขยับลงจาก B เป็น **C** |
| 2-20 | **A** | **Risk ปลดล็อก** — Bite the Bullet/Dodge Roll/Blindfire=Bonus Action เหนือกว่า, Skin of Your Teeth=Reaction เหนือกว่า, Grazing Shot(ไม่เสีย action เลยตอน trigger)=Resource-to-Action Conversion เหนือกว่า → **3/4 เหนือกว่า ถึงเกณฑ์ไกล → ขยับขึ้น 1 ขั้นจาก B เป็น A** ทันทีที่ lv2 |

**สรุปเกรด**: C(1) → **A(2-20)** — แรงพอกับ Survivability เพราะ Risk Dice ตีหลายมิติพร้อมกันเช่นเดียวกัน

---

## Utility Axis

**Primary = Magnitude** — ไม่มีสเปลล์เลย = ไม่มีกลไก(D) → floor rule ล็อกทั้ง axis

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary=D (ไม่มีสเปลล์) → floor rule ล็อก D — Maverick Spirit ให้ Skill-Check-Layer จริง (reroll ability **check** พลาดด้วย) แต่ไม่ช่วยเพราะ floor rule ไม่สนใจ modifier เลย (เหมือน Fighter's Tactical Mind เป๊ะ) |

**สรุปเกรด**: **D(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — Weapon Mastery (2 kinds, LR swap) ยืนยัน cross-check ครั้งที่ 7 → **Primary = B โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary=B |
| 2-20 | **A** | Risk Dice ใช้ได้ 6 แบบผลลัพธ์ (Damage/Survivability×3/Action-Economy×2/Utility-เบา) = Resource Fungibility เหนือกว่า, Cross-Axis Coverage เหนือกว่า(แตะ 4+ axis ตั้งแต่ lv2) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-10) → A(11-19) → **S(20)** |
| Control | D(1-4) → C(5-20) |
| Support | **D(1-20) flat** |
| Survivability | C(1) → **A(2-20)** |
| Action Economy | C(1) → **A(2-20)** |
| Utility | **D(1-20) flat** |
| Versatility | B(1) → **A(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **Risk Dice ตีหลายมิติพร้อมกันแรงกว่า Fighter's Second Wind** — Survivability และ Action Economy ทั้งคู่กระโดดจาก C ไป **A ทันทีที่ lv2** (ไม่ใช่ B ก่อนแล้วค่อยไต่) เพราะ Risk maneuver 6 ตัวกระจายผลไปตี 3 มิติของแต่ละ axis พร้อมกันตั้งแต่ปลดล็อกครั้งแรก — Gunslinger คือคลาสที่ maneuver-resource ให้ผลตอบแทนต่อ "จำนวนมิติที่ตี" หนาแน่นที่สุดเท่าที่เจอมา (เทียบ Captain ที่ maneuver ครึ่งหนึ่งเล็ง ally แทน)
2. **Gut Shot เป็น Control ที่ conditional มากที่สุดเท่าที่เจอ** — ต้อง crit เท่านั้นถึง trigger (ต่างจาก Barbarian's Brutal Strike ที่ trigger ได้ทุกครั้งที่ตี) แต่ยัง grade เป็น C เหมือนกันเพราะเมื่อ trigger ได้ผลจริงและมี Critical Shot ช่วยขยาย crit range ให้ trigger บ่อยขึ้นเรื่อยๆ ตามเลเวล (19-20→18-20→17-20)
3. **คลาสแรกที่มีทั้ง Support+Utility เป็น D-flat พร้อมกัน แต่ Damage/Survivability/Action-Economy ทั้ง 3 แตะ A หรือสูงกว่า** — โปรไฟล์ "glass-cannon ยิงปืน" ที่ทุ่มหนักกับตัวเองล้วนๆ คล้าย Dancer แต่ Gunslinger ยังมี Control C (Dancer ไม่มีเลย)
4. **ยืนยัน Weapon Mastery floor-escape เป็นครั้งที่ 7** (Barbarian/Captain/Craftsman/Dancer/Fighter/Gunslinger) — pattern สม่ำเสมอเต็มที่แล้ว ทุกคลาสมาร์เชียลที่มี Weapon Mastery แบบ swap-1-per-Long-Rest จบที่ Versatility B→A เหมือนกันหมดไม่มีข้อยกเว้นเลยจนถึงตอนนี้
5. **ไม่มี tie-break 2-2 เกิดขึ้นเลยในไฟล์นี้** — ครั้งแรกในรอบหลายคลาสที่ไม่เจอเคสเสมอกัน (Risk Dice ให้ modifier เอียงไปทาง "เหนือกว่า" ชัดเจนเกิน 2-2 ในทุก axis ที่ตรวจ)
