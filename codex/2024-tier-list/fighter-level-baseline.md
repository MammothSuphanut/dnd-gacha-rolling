# Fighter — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Fighter Subclass ที่ lv3/7/10/15/18 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-fighter.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 27 รายการ
**สถานะ**: คลาสที่ 12 ของชั้น 1 — **Fighter คือคลาสที่ Anchor Rubric เองใช้เป็น "outlier ตัวอย่าง" ในหลาย axis อยู่แล้ว** (Extra Attack ×3/×4, Action Surge, Indomitable, Second Wind ล้วนถูกอ้างชื่อไว้ตรงๆ ในตาราง Anchor) — ไฟล์นี้จึงเหมือนเป็นการ "ประเมิน Fighter เทียบกับตัวอย่างของตัวเอง" มากกว่าคลาสอื่น

⚠️ **หมายเหตุ**: **Weapon Mastery ของ Fighter เริ่มที่ 3 kinds** (มากกว่า Barbarian/Captain/Craftsman/Dancer ที่เริ่ม 2 kinds ทั้งหมด) โตถึง 6 kinds ที่ lv16 — **Tactical Master (lv9)** ให้สลับ mastery property เป็น Push/Sap/Slow ได้ **โดยไม่ขึ้นกับอาวุธที่เลือกไว้** (ต่างจาก generic mastery property choice ที่ปฏิบัติ track-neutral ในไฟล์อื่น) จึงนับเป็น Control mechanism จริงในไฟล์นี้ (การันตีว่าได้ Slow/Push/Sap เสมอ ไม่ใช่ผูกกับตัวเลือกอาวุธที่อาจไม่มี mastery property เกี่ยวกับ control เลย)

---

## สรุป Chassis

**HD**: d10 (เหนือ peer d8 — Primary Survivability เริ่มที่ A ตามธรรมเนียม) · **Save prof**: STR/CON · **ไม่มีสเปลล์คาสติ้งเลย**

| Lv | Second Wind uses | Weapon Mastery (kinds) | Milestone | EHP (d10+CON+3) |
|---|---|---|---|---|
| 1 | 2 | 3 | Fighting Style, **Second Wind** (bonus action self-heal 1d10+lv), **Weapon Mastery** | 13 |
| 2 | 2 | 3 | **Action Surge** (action เต็มเพิ่ม 1/short-rest), Tactical Mind (expend Second Wind แก้ ability check พลาด) | 22 |
| 3 | 2 | 3 | *(Fighter Subclass — ยกเว้น)* | 31 |
| 4 | 3 | 4 | ASI | 40 |
| 5 | 3 | 4 | **Extra Attack**, Tactical Shift (Second Wind+เดินฟรีไม่โดน OA) | 49 |
| 6 | 3 | 4 | ASI | 58 |
| 7 | 3 | 4 | *(Subclass feature — ยกเว้น)* | 67 |
| 8 | 3 | 4 | ASI | 76 |
| 9 | 3 | 4 | **Indomitable** (reroll failed save +Fighter level), **Tactical Master** (สลับ mastery property เป็น Push/Sap/Slow) | 85 |
| 10 | 4 | 5 | *(Subclass feature — ยกเว้น)* | 94 |
| 11 | 4 | 5 | **Two Extra Attacks** (3 attack/action) | 103 |
| 12 | 4 | 5 | ASI | 112 |
| 13 | 4 | 5 | Indomitable ครั้งที่ 2, Studied Attacks (advantage หลังพลาดใส่เป้าเดิม) | 121 |
| 14 | 4 | 5 | ASI | 130 |
| 15 | 4 | 5 | *(Subclass feature — ยกเว้น)* | 139 |
| 16 | 4 | 6 | ASI | 148 |
| 17 | 4 | 6 | Action Surge ครั้งที่ 2, Indomitable ครั้งที่ 3 | 157 |
| 18 | 4 | 6 | *(Subclass feature — ยกเว้น)* | 166 |
| 19 | 4 | 6 | Epic Boon | 175 |
| 20 | 4 | 6 | **Three Extra Attacks** (4 attack/action — เฉพาะเลเวลนี้เลเวลเดียว) | 184 |

---

## Damage Axis

**Primary = Magnitude** — Fighter คือ outlier ที่ Anchor เองระบุชื่อไว้ตรงๆ ("Fighter outlier เริ่มที่ lv11: Extra Attack×3=~26" และ "lv20: ×4=~34 เฉพาะเลเวลนี้")

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | B | 1 attack(lv1-4)→2 attack(lv5-10) ตรง peer's มาตรฐานเป๊ะ (2-attack คือ peer standard เอง ไม่ใช่ outlier) — modifier: Burst=เหนือกว่า(Action Surge lv2+ เพิ่ม action เต็มให้โจมตีซ้ำ) แต่ 1/4 ไม่พอขยับ |
| 11-19 | **A** | **Two Extra Attacks ปลดล็อก** — 3 attack(~26) **แซง peer's 2-attack(~17) ตรงตามที่ Anchor เองระบุไว้ว่าเป็นจุด outlier เริ่มต้น** = **A** |
| 20 | **S** | **Three Extra Attacks** — 4 attack(~34) เฉพาะเลเวลนี้เลเวลเดียว ตรงกับที่ Anchor เขียนไว้ตรงๆ ว่า "แตะเพดาน Extra Attack×4 เฉพาะเลเวลนี้" = **S** |

**สรุปเกรด**: B(1-10) → **A(11-19)** → **S(20)** — เกรดตรงกับคำอธิบายของ Anchor เองทุกคำ

---

## Control Axis

**Primary = Severity**. Tactical Master (lv9) การันตี Push/Sap/Slow mastery property ทุกการโจมตี — เป็นกลไก Control จริงที่ไม่ขึ้นกับอาวุธที่เลือก

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-8 | D | ไม่มีกลไก Control ที่การันตีได้เลย (generic mastery property choice ปฏิบัติ track-neutral ตามธรรมเนียมเดิม) = **D** |
| 9-20 | **C** | **Tactical Master ปลดล็อก** — Slow(ลด speed 10ft+ไม่โดน OA)/Push(ผลัก 10ft)/Sap(disadvantage โจมตีครั้งถัดไปของเป้า) ล้วน Tier1-2 (ต่ำกว่า peer's Tier4) แต่การันตีได้ทุกครั้ง = **C** (เหมือน pattern ของ Barbarian's Brutal Strike ที่ lv9 เป๊ะ) |

**สรุปเกรด**: D(1-8) → **C(9-20)** — ตรงกับ pattern ของ Barbarian ทุกจุด (D จนถึง lv9 พอดี)

---

## Support Axis

Second Wind เป็น self-only ทั้งหมด — ไม่มีกลไกเล็ง ally เลย

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไก Support เลยตลอด 20 เลเวล = **D flat** |

**สรุปเกรด**: **D(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d10 เหนือ peer d8) = **A โดยตรงตั้งแต่ lv1**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-8 | **B** | Primary=A — Second Wind (lv1, **ตัวอย่างเพดานที่ Anchor เองอ้างชื่อ "Second Wind (Fighter)" ตรงๆ ที่ lv1**) = Death Prevention เหนือกว่า — แต่ Mitigation/Debuff Resistance ยังไม่มีกลไก(D ทั้งคู่) → tally: 1 เหนือ/2 ต่ำ → **2/4 ต่ำ ถึงเกณฑ์ → ขยับลง 1 ขั้นจาก A เป็น B** |
| 9-20 | **A** | **Indomitable ปลดล็อก (lv9, ตัวอย่างเพดานที่ Anchor เองอ้างชื่อ "Indomitable (Fighter)" ตรงๆ เช่นกัน — reroll save +Fighter level)** — Save Reliability ขยับเป็นเหนือกว่า → tally: **2 เหนือ(Death Prevention, Save Reliability)/2 ต่ำ(Mitigation, Debuff Resistance) — เสมอกันอีกครั้ง (ครั้งที่ 10!)** ⚠️ net cancellation → กลับ Primary(A) = **A** |

**สรุปเกรด**: B(1-8) → **A(9-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Fighter คือ outlier ที่ Anchor เองระบุชื่อไว้ตรงๆ อีกครั้งในแกนนี้ (มิติเดียวกับ Damage แต่มองมุม "ความคุ้มต่อ action")

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B(1 attack ตรง peer) — modifier: Bonus Action=เหนือกว่า(Second Wind), Reaction=ไม่มีกลไก(D), Extra Action=ไม่มีกลไก(D, Action Surge ยังไม่มา), Resource-Conversion=ไม่มีกลไก(D) → 1 เหนือ/3 ต่ำ ถึงเกณฑ์ → ขยับลง 1 ขั้นเป็น **C** |
| 2-10 | **B** | **Action Surge ปลดล็อก (ตัวอย่างเพดานที่ Anchor เองอ้างชื่อ "Action Surge (Fighter): outlier แรงสุดในตาราง" ตรงๆ)** — Extra Action Access ขยับเป็นเหนือกว่า → tally: **2 เหนือ(Bonus Action, Extra Action)/2 ต่ำ(Reaction, Resource-Conversion) — เสมอกัน (ครั้งที่ 11!)** ⚠️ net cancellation → กลับ Primary(B) |
| 11-19 | **A** | Primary เองขยับเป็น A (3-attack แซง peer) — modifier tally ยังเสมอ 2-2 เหมือนเดิม → net cancellation กลับ Primary(A) = **A** |
| 20 | **S** | Primary เองขยับเป็น S (4-attack extreme) — modifier tally ยังเสมอ 2-2 เหมือนเดิม → net cancellation กลับ Primary(S) = **S** |

**สรุปเกรด**: C(1) → B(2-10) → A(11-19) → **S(20)** — คลาสที่แรงที่สุดใน Action Economy เท่าที่เจอในระบบนี้ ตรงตามบทบาท "ตัวอย่างเพดาน" ที่ Anchor เขียนไว้ตั้งแต่ต้น

---

## Utility Axis

Tactical Mind (lv2, expend Second Wind แลก +1d10 ต่อ ability check ที่พลาด) เป็นกลไก Skill-Check-Layer จริงแต่ resource-gated (ไม่ฟรีไม่จำกัดแบบ Reliable Talent) — **ไม่มีสเปลล์ Reveal-Info/Solve-Problem เลย** (Primary=Magnitude=D)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary(Magnitude)=ไม่มีกลไก(D) → **floor rule ล็อกเกรดรวมที่ D** ไม่ว่า Tactical Mind's Skill-Check-Layer จะมีจริงแค่ไหนก็ตาม (เหมือน pattern ของ Barbarian's Primal Knowledge เป๊ะ) |

**สรุปเกรด**: **D(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — Weapon Mastery (3 kinds, LR swap) ยืนยัน cross-check ครั้งที่ 6 → **Primary = B โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary=B — Second Wind ยังไม่ปลดล็อก modifier เสริม |
| 2-20 | **A** | Second Wind's dual-use(heal-or-check-boost)=Resource Fungibility เหนือกว่า, Cross-Axis Coverage เหนือกว่า(Damage/Survivability/Action-Economy/Utility พร้อมกันตั้งแต่ lv2) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)** — ตรงกับ pattern Barbarian/Dancer เป๊ะ

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-10) → A(11-19) → **S(20)** |
| Control | D(1-8) → C(9-20) |
| Support | **D(1-20) flat** |
| Survivability | B(1-8) → **A(9-20)** |
| Action Economy | C(1) → B(2-10) → A(11-19) → **S(20)** |
| Utility | **D(1-20) flat** |
| Versatility | B(1) → **A(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **Fighter คือคลาสแรกที่เกรดของมันเองตรงกับคำอธิบายใน Anchor Rubric แทบทุกคำ** — เพราะ Anchor ใช้ Fighter เป็นตัวอย่าง outlier ในหลาย axis อยู่แล้วตั้งแต่ตอนออกแบบ (Extra Attack×3/×4 ใน Damage, Action Surge ใน Action Economy, Indomitable+Second Wind ใน Survivability) — ไฟล์นี้จึงเหมือนเป็นการยืนยันว่าตาราง Anchor เขียนไว้ถูกต้องตรงกับที่ควรจะเป็นจริงๆ ไม่ใช่แค่คำอธิบายลอยๆ
2. **Control D(1-8)→C(9-20) ตรงกับ pattern ของ Barbarian's Brutal Strike เป๊ะ** — ทั้งคู่ปลดล็อกกลไก Control ที่ lv9 พอดี แม้ที่มาต่างกัน (Barbarian=subclass-independent class feature, Fighter=Tactical Master's mastery-property override) — ยืนยันว่า lv9 เป็นจุดเปลี่ยนที่พบบ่อยสำหรับมาร์เชียลที่ไม่มี Control ธรรมชาติ
3. **⚠️ Tie-break 2-2 เกิดซ้ำถึง 2 ครั้งในไฟล์เดียว** (Survivability lv9-20, Action Economy lv2-20 ตลอดช่วงหลัง) รวมเป็นครั้งที่ 10-11 ของทั้งระบบ — ยืนยันหนักแน่นยิ่งขึ้นว่าควรฟอร์มัลไลซ์กฎเสมอกันเข้า Anchor Rubric จริงจัง
4. **ยืนยัน Weapon Mastery floor-escape เป็นครั้งที่ 6** (Barbarian/Captain/Craftsman/Dancer/Fighter) — Fighter เริ่มที่ 3 kinds (มากกว่าคลาสอื่นทั้งหมดที่เริ่ม 2 kinds) แต่ผลลัพธ์ Versatility เกรดเดียวกัน (B→A) เพราะ tier "กลาง" วัดจาก**จังหวะการสลับ** ไม่ใช่จำนวนเริ่มต้น
5. **Utility D-flat แม้มี Tactical Mind (Skill-Check-Layer จริง)** — floor rule ล็อก D เพราะ Primary(Magnitude)=ไม่มีสเปลล์เลย ยืนยันซ้ำว่า floor rule ทำงานเข้มงวดไม่สนใจมิติอื่นเลยแม้จะมีจริง (เหมือน Barbarian's Primal Knowledge)
6. **Fighter เป็นคลาสที่แรงที่สุดใน Action Economy เท่าที่เจอในระบบนี้จนถึงตอนนี้ (แตะ S ที่ lv20)** — สมเหตุสมผลตามบทบาทที่ Anchor ออกแบบไว้ให้เป็นตัวอย่างเพดานของแกนนี้โดยเฉพาะ
