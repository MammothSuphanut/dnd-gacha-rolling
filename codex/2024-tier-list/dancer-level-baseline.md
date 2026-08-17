# Dancer — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Dancer Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Dancer", source: "ValdaSpire24Extras"` — homebrew จาก *Valda's Spire of Secrets* (ภาคเสริม) — ยืนยัน `classFeaturesFull` ครบ 27 รายการ
**สถานะ**: คลาสที่ 10 ของชั้น 1 — **มาร์เชียลนักดาบ finesse ล้วน ไม่มีสเปลล์เลย** (ไม่มี `spellcastingAbility` field ในไฟล์) — คลาสแรกที่มี**ทั้ง Control+Support+Utility เป็น D-flat พร้อมกันทั้ง 3 axis**

⚠️ **หมายเหตุก่อนอ่านตาราง**: **Multi-Target Extra Attack** (Three/Four/Five-Target Extra Attack ที่ lv5/11/17) ให้โจมตีเพิ่ม **เฉพาะเมื่อแต่ละครั้งเล็งเป้าต่างกัน** — เทียบเป้าเดียว (boss fight) ยังคง 2 attack เท่า peer ปกติ แต่เทียบกลุ่มศัตรู (มัด mob) ได้ถึง **5 attack/action ที่ lv17** (แซง Fighter outlier's 4-attack@lv20 ไปก่อน 3 เลเวล) — ใช้ 2 attack เป็น baseline สำหรับ Primary(Magnitude) แต่นับ multi-target scaling เป็น **Breadth modifier** เพื่อไม่ conflate ตัวเลขดิบกับเงื่อนไข

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: DEX/CHA · **ไม่มีสเปลล์คาสติ้งเลย** · **Unarmored Defense**: AC=10+DEX+CHA (ไม่นับใน Survivability ตามหลักการไม่ใช้ AC ของ Anchor)

| Lv | Dances/rest | Dance Die | Milestone | EHP (d8+CON+3) |
|---|---|---|---|---|
| 1 | — | — | Dervish Fighting (Deadly D4s: 1d4/1d6 weapon→2d4), Unarmored Defense, **Weapon Mastery** | 11 |
| 2 | 2 | 1d4 | **Dance** (bonus action stance, Graceful Dodge=+Die ต่อ AC เมื่อโดนตี), **Dance Styles** (4 แบบ), Nimble Start (disadv ต่อผู้โจมตีเรารอบ1) | 19 |
| 3 | 2 | 1d4 | *(Dancer Subclass — ยกเว้น)*, Fast Movement (+10ft) | 27 |
| 4 | 2 | 1d4 | ASI | 35 |
| 5 | 3 | 1d6 | **Extra Attack**, **Three-Target Extra Attack** (3 attack ถ้าเล็งคนละเป้า) | 43 |
| 6 | 3 | 1d6 | *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 3 | 1d6 | **Evasion** (ตรงกับตัวอย่างเพดานที่ Anchor เองอ้างถึง) | 59 |
| 8 | 3 | 1d6 | ASI | 67 |
| 9 | 4 | 1d6 | Heroic Dance (Heroic Inspiration ตัวเองตอนเริ่ม Dance) | 75 |
| 10 | 4 | 1d6 | *(Subclass feature — ยกเว้น)* | 83 |
| 11 | 4 | 1d8 | **Four-Target Extra Attack**, **Graceful Retaliation** (reaction โจมตีสวนเมื่อโดนตี**หรือ**โดนพลาด) | 91 |
| 12 | 4 | 1d8 | ASI | 99 |
| 13 | 5 | 1d8 | Freestyle (เลือก Dance Style ได้ 2 แบบพร้อมกัน) | 107 |
| 14 | 5 | 1d8 | *(Subclass feature — ยกเว้น)* | 115 |
| 15 | 5 | 1d8 | Fierce Start (+CHA mod dmg รอบ1) | 123 |
| 16 | 5 | 1d8 | ASI | 131 |
| 17 | 6 | 1d10 | **Five-Target Extra Attack** | 139 |
| 18 | 6 | 1d10 | Invigorating Dance (temp HP = level+CHA ตอนเริ่ม Dance) | 147 |
| 19 | 6 | 1d10 | Epic Boon | 155 |
| 20 | 6 | 1d10 | **Grand Finale** (crit อัตโนมัติ+2 attack ฟรีเป็น bonus action, 1/long rest) | 163 |

---

## Damage Axis

**Primary = Magnitude** (เทียบเป้าเดียว) — Deadly D4s (lv1, อัปเกรด 1d4/1d6 weapon dice → 2d4) ซ้อนบน weapon+3 baseline ตรงๆ ตั้งแต่ lv1 → **Primary = A ทันที**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-19 | **A** | Deadly D4s ดัน Magnitude เหนือ peer จาก lv1 — modifier: **Breadth=เหนือกว่ามาก**(multi-target Extra Attack 3→4→5 เป้าตั้งแต่ lv5/11/17 — เกินกว่า peer's single-target เดิม), Burst=เหนือกว่า(Dance Die เสริมดาเมจผ่าน Retaliatory Swipe/Spinning Shot), Conditionality=ตรง(2-attack baseline ไม่มีเงื่อนไขลบ), Resistance-proofing=ตรง — modifier แรงจริงแต่ไม่ปัดขึ้น S ตามวินัยเดิม |
| 20 | **S** | **Grand Finale** (crit อัตโนมัติทุกโจมตี + 2 attack ฟรีเป็น bonus action) = nova ทุ่มสุดตัวระดับเดียวกับ Barbarian/Craftsman's lv17-20 S — **S** |

**สรุปเกรด**: **A(1-19) → S(20)**

---

## Control Axis

ไม่มีกลไก Control เลยในทั้ง 27 feature — สแกนครบแล้วไม่พบฟีเจอร์ไหนบังคับ condition/save ต่อศัตรูเลยสักตัว

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไกเลยตลอด 20 เลเวล = **D flat เต็มรูปแบบ** (เหมือน Craftsman เป๊ะ — คลาสที่ 2 ที่ D-flat เต็มตัว) |

**สรุปเกรด**: **D(1-20) flat**

---

## Support Axis

ไม่มีกลไกเล็ง ally เลย — Heroic Dance/Invigorating Dance ทั้งคู่เป็น**ตัวเองเท่านั้น** ไม่ใช่ ally

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไก Support เลยตลอด 20 เลเวล = **D flat เต็มรูปแบบ** |

**สรุปเกรด**: **D(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B — modifier ยังไม่มีอะไรปลดล็อก (Dance เริ่ม lv2): Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D), Death Prevention=ไม่มีกลไก(D) → 3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลง 1 ขั้นเป็น **C** |
| 2-6 | = lv1 | Dance ปลดล็อก — Graceful Dodge(+Die ต่อ AC เมื่อโดนตี) + Nimble Start(disadv ต่อผู้โจมตีรอบ1) = Mitigation จริง(class feature ที่ปรับโอกาสโดนตี ไม่ใช่ AC ดิบจากเกราะ) → Mitigation ขยับเป็นเหนือกว่า — tally: 1 เหนือ(Mitigation)/2 ต่ำ(Debuff Resistance, Death Prevention) → ยังไม่ถึงเกณฑ์ ≥2/4 เหนือ → คง **C** |
| 7-17 | **A** | **Evasion ปลดล็อก (lv7) — ตรงกับตัวอย่างเพดานที่ Anchor เองอ้างถึงชื่อ Rogue/Monk** — Debuff/Condition Resistance ขยับเป็นเหนือกว่าเต็มตัว → tally: **2 เหนือ(Mitigation, Debuff Resistance)/2 ต่ำ(Save Reliability=ตรงไม่นับ, Death Prevention=ต่ำ)** จริงๆคือ 2 เหนือ/1ต่ำ(Death Prevention เท่านั้น, Save Reliability เป็น "ตรง" ไม่นับ) → **2/4 เหนือ ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B(Primary) เป็น A** |
| 18-20 | = lv7-17 | Invigorating Dance(temp HP ตอนเริ่ม Dance) เพิ่ม Death Prevention เป็นเหนือกว่าด้วย → 3/4 เหนือ ยังคง cap ที่ +1 ขั้น → คง **A** |

**สรุปเกรด**: C(1-6) → **A(7-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 เป๊ะ = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | **C** | Primary=B — modifier: Bonus Action=เหนือกว่า(Dance/Dance Style switch จาก lv2), Reaction=ไม่มีกลไก(D จนถึง lv11), Extra Action=ไม่มีกลไก(D), Resource-Conversion=ไม่มีกลไก(D) → 1 เหนือ/3 ต่ำ ถึงเกณฑ์ ≥2/4 ต่ำ → ขยับลง 1 ขั้นเป็น **C** |
| 11-19 | **B** | **Graceful Retaliation ปลดล็อก** (reaction โจมตีสวนเมื่อโดนตี**หรือพลาด** — กว้างกว่า Riposte ที่ต้องพลาดเท่านั้น) — Reaction ขยับเป็นเหนือกว่า → tally: **2 เหนือ(Bonus Action, Reaction)/2 ต่ำ(Extra Action, Resource-Conversion) — เสมอกันอีกครั้ง (ครั้งที่ 8!)** ⚠️ net cancellation → กลับ Primary(B) |
| 20 | **A** | **Grand Finale ปลดล็อก** (2 attack ฟรีเป็น bonus action = Extra Action Access จริง) → tally: **3 เหนือ(Bonus Action, Reaction, Extra Action)/1 ต่ำ(Resource-Conversion)** → ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น **A** |

**สรุปเกรด**: C(1-10) → B(11-19) → **A(20)**

---

## Utility Axis

ไม่มีกลไก Utility เลย — สแกนครบ 27 feature ไม่พบ Reveal-Info/Solve-Problem/Skill-Check-Layer ที่ไหนเลย (Fast Movement เป็น combat/exploration-speed ไม่ใช่ Utility ตามนิยาม Anchor)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไกเลยตลอด 20 เลเวล = **D flat เต็มรูปแบบ** |

**สรุปเกรด**: **D(1-20) flat** — **คลาสแรกที่มีทั้ง Control+Support+Utility เป็น D-flat พร้อมกันทั้ง 3 axis**

---

## Versatility Axis

**Primary = Loadout Flexibility** — ไม่มีสเปลล์ แต่ Weapon Mastery (2 kinds, LR swap) ยืนยัน cross-check ครั้งที่ 5 → **Primary = B โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary=B — ยังไม่มี Dance Die เสริม |
| 2-20 | **A** | Dance ปลดล็อก — **Resource Fungibility=เหนือกว่า**(Dance Die ใช้ได้ทั้ง Damage/Survivability/Utility-เบาผ่าน 4 Dance Style), **Cross-Axis Coverage=เหนือกว่า**(แตะ Damage/Survivability/Action-Economy ตั้งแต่ lv2), **Target-Type Coverage=เหนือกว่า**(multi-target Extra Attack ตั้งแต่ lv5 — quasi-AoE ผ่านการโจมตีหลายเป้า) → **3/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | A(1-19) → **S(20)** |
| Control | **D(1-20) flat** |
| Support | **D(1-20) flat** |
| Survivability | C(1-6) → **A(7-20)** |
| Action Economy | C(1-10) → B(11-19) → **A(20)** |
| Utility | **D(1-20) flat** |
| Versatility | B(1) → **A(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **คลาสแรกที่มีทั้ง Control+Support+Utility เป็น D-flat พร้อมกันทั้ง 3 axis ตลอด 20 เลเวล** — เข้มกว่า Barbarian (Support+Utility D-flat 2 axis) — Dancer คือ "glass-cannon duelist" ที่บริสุทธิ์ที่สุดในระบบนี้จนถึงตอนนี้: ทุ่มหมดกับ Damage+Survivability+Action-Economy ไม่มีอะไรเหลือให้ 3 axis ที่เหลือเลย
2. **Multi-Target Extra Attack เป็นกลไกใหม่ที่ไม่เคยเจอ** — Three/Four/Five-Target Extra Attack (3/4/5 attack ถ้าเล็งคนละเป้า) ให้ผลต่างกันสุดขั้วระหว่าง solo-boss(2 attack เท่า peer)กับ mob-fight(5 attack ที่ lv17 แซง Fighter outlier ไปก่อน 3 เลเวล) — จัดการโดยแยก Primary(single-target)ออกจาก Breadth modifier(multi-target) เพื่อไม่ conflate 2 สถานการณ์เข้าด้วยกัน
3. **Evasion ตรงกับตัวอย่างเพดานที่ Anchor เองอ้างชื่อ Rogue/Monk ไว้พอดี** — Dancer เป็นคลาสที่ 3 (ต่อจาก Rogue/Monk ที่ Anchor cite ไว้เป็นตัวอย่าง) ที่มี Evasion จริง — ยืนยันว่าตัวอย่างเพดานในตาราง Survivability Anchor ใช้ได้กับคลาสอื่นนอกเหนือจากที่ระบุชื่อไว้จริง
4. **Graceful Retaliation กว้างกว่า Riposte (subclass-locked ของ Fighter)** — trigger ได้ทั้งตอนโดนตี**และ**โดนพลาด (Riposte ต้องพลาดเท่านั้น) เป็น base-kit feature ไม่ใช่ subclass — Reaction Value ที่แรงที่สุดเท่าที่เจอมาในระบบนี้
5. **⚠️ Tie-break 2-2 เกิดซ้ำอีกครั้ง (ครั้งที่ 8)** — Action Economy lv11-19 — จำนวนครั้งสะสมตอนนี้สูงมากพอที่ควรฟอร์มัลไลซ์กฎเข้า Anchor Rubric อย่างจริงจังในรอบทำงานถัดไป ไม่ควรปล่อยเป็น ad hoc ต่อไปเรื่อยๆ
6. **ยืนยัน Weapon Mastery floor-escape เป็นครั้งที่ 5** (Barbarian/Captain/Craftsman/Dancer) — pattern สม่ำเสมอมาก ทุกคลาสที่มี Weapon Mastery แบบ swap-1-per-Long-Rest จบที่ Versatility A เหมือนกันหมด
7. **Damage/Survivability/Action-Economy ทั้ง 3 axis ที่ Dancer แรง ล้วนแตะเกรดสูงสุด (S/A/A) ในช่วงปลายเกม** — สะท้อนดีไซน์ "นักดาบที่แข็งแกร่งขึ้นเรื่อยๆ" ตรงไปตรงมา ต่างจาก Craftsman ที่กระจาย strength ข้าม Damage+Support+Survivability
