# Warden — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Warden Subclass ที่ lv3/6/10/17 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Warden", source: "ValdaSpire24"` — homebrew จาก *Valda's Spire of Secrets* — ยืนยัน `classFeaturesFull` ครบ 24 รายการ
**สถานะ**: คลาสที่ 26 ของชั้น 1 — **"ผู้พิทักษ์/แทงค์" ที่ออกแบบมาสมบูรณ์ที่สุดในระบบนี้จนถึงตอนนี้** — Guardian Tactics (Block/Challenge/Grasp) เป็น **at-will ไม่ผูก resource เลย** (ต่างจากทุกคลาส Battle-Dice/Focus-Point ก่อนหน้า) + **Interrupt (lv5)** เป็น Reaction Value ที่แรงที่สุดเท่าที่เจอในระบบนี้ (ยกเลิกการโจมตี/ความสามารถของศัตรูได้ตรงๆ)

⚠️ **หมายเหตุ**: **Sentinel's Stand (lv1)** เป็น choice บังคับ 3 ทาง (Stalwart Spirit=save prof / Steadfast Toughness=HP เพิ่ม / Tower Shield=AC เพิ่ม) — ปฏิบัติ track-neutral เหมือน Divine Order ของ Cleric ไม่ commit choice ใดเข้าเกรด baseline

---

## สรุป Chassis

**HD**: d10 (เหนือ peer d8 — Primary Survivability เริ่มที่ A) · **Save prof**: STR/CON · **ไม่มีสเปลล์คาสติ้งเลย**

| Lv | Interrupt uses | Weapon Mastery | Milestone อื่น | EHP (d10+CON+3) |
|---|---|---|---|---|
| 1 | — | 2 | Fighting Style, **Sentinel's Stand** (เลือก 1 ใน 3, track-neutral), **Weapon Mastery** | 13 |
| 2 | — | 2 | **Guardian Tactics** (bonus action **ไม่ผูก resource**: Block=แบ่ง AC ให้ ally/Challenge=ตรึงศัตรู/Grasp=AoE กันหนี), **Unyielding Resolve** (resist B/P/S ตอน Bloodied) | 22 |
| 3 | — | 2 | *(Warden Subclass — ยกเว้น)* | 31 |
| 4 | — | 3 | ASI | 40 |
| 5 | 3 | 3 | **Extra Attack**, **Interrupt** (reaction ยกเลิก extra attack/ability ของศัตรู) | 49 |
| 6 | 3 | 3 | *(Subclass feature — ยกเว้น)* | 58 |
| 7 | 3 | 3 | **Mettle** (CON-save-half-dmg→ไม่โดนเลย) | 67 |
| 8 | 3 | 3 | ASI | 76 |
| 9 | 4 | 3 | **Survive** (ตก0HP→เหลือ1+ฟื้น=2×level, 1/long rest) | 85 |
| 10 | 4 | 4 | *(Subclass feature — ยกเว้น)* | 94 |
| 11 | 4 | 4 | **Sentinel's Strike** (เลือก 1 ใน 3: Interdict=Interrupt+โจมตี/Shield Slam=+dmg/**Sweep=โจมตีทุกเป้าประชิด**) | 103 |
| 12 | 4 | 4 | ASI | 112 |
| 13 | 5 | 4 | **Font of Life** (ลบ condition ตัวเอง 8 แบบ ฟรี 2 ครั้ง/rest) | 121 |
| 14 | 5 | 4 | Extended Tactics (Guardian Tactics ระยะ 5→10ft) | 130 |
| 15 | 5 | 4 | Improved Resolve (resist เกือบทุกดาเมจตอน Bloodied) | 139 |
| 16 | 5 | 4 | ASI | 148 |
| 17 | 6 | 4 | *(Subclass feature — ยกเว้น)* | 157 |
| 18 | 6 | 4 | Sentinel's Soul (เลือก 1 ใน 3: Blindsight/no-adv-against-you/เดินทะลุศัตรู) | 166 |
| 19 | 6 | 4 | Epic Boon | 175 |
| 20 | 6 | 4 | **Legendary Resistance** (save พลาด→เลือกผ่านแทนได้ 3/long rest — ของจริงแบบมอนสเตอร์) | 184 |

---

## Damage Axis

**Primary = Magnitude** — Extra Attack ตรงเวลา lv5 = matches peer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | B | matches peer |
| 11-20 | **A** | **Sentinel's Strike ปลดล็อก** — Sweep(โจมตีทุกเป้าประชิดแยก roll)=Breadth เหนือกว่า, Shield Slam(+1d8+shield AC bonus)=Magnitude เสริม → **A** |

**สรุปเกรด**: B(1-10) → **A(11-20)**

---

## Control Axis

**Primary = Severity** — Guardian Tactics's Challenge/Grasp (lv2) เป็นกลไก Control **ไม่ผูก resource เลย**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | D | ไม่มีกลไกเลย = **D** |
| 2-20 | **B** | Challenge(taunt, disadvantage ศัตรูต่อเป้าอื่น)/Grasp(AoE กันหนี 5ft→10ft lv14) = Tier1-2 ต่ำกว่า peer's Tier4 = Primary **C** — modifier: **Breadth=เหนือกว่า**(Grasp เป็น AoE), **Frequency=เหนือกว่ามาก**(ไม่ผูก resource เลย ใช้ได้ทุกเทิร์นไม่จำกัด), **Concentration Risk=เหนือกว่า**(ไม่ใช่ concentration) → **3/5 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C เป็น B** |

**สรุปเกรด**: D(1) → **B(2-20)**

---

## Support Axis

**Primary = Magnitude** — Guardian Tactics's Block (lv2) เป็นกลไก Support **at-will ไม่ผูก resource** — ไม่มีฮีลเลยสักจุด

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | D | ไม่มีกลไกเลย = **D** |
| 2-20 | **B** | Block: แบ่ง AC (ของตัวเองที่สูงกว่า) ให้ ally ประชิด = Magnitude ต่ำ(ไม่มีฮีลเลย) = Primary **C** — modifier: **Action Economy=เหนือกว่า**(bonus action ฟรีไม่จำกัด), **Proactive/Reactive=เหนือกว่า**(proactive), **Frequency=เหนือกว่ามาก**(ไม่ผูก resource), Concentration Risk=เหนือกว่า(ไม่ concentration) → **4/5 เหนือกว่า ถึงเกณฑ์ไกล → ขยับขึ้น 1 ขั้นจาก C เป็น B** |

**สรุปเกรด**: D(1) → **B(2-20)**

---

## Survivability Axis

**Primary = Effective HP** (d10 เหนือ peer d8) = **A โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **B** | Primary=A — modifier ยังไม่มีอะไรปลดล็อก(D×3, Save=ตรง) → 3/4 ต่ำ → ขยับลงเป็น **B** |
| 2-8 | = lv1 | **Unyielding Resolve ปลดล็อก** — Mitigation เหนือกว่า(resist B/P/S ตอน Bloodied) → tally: 1 เหนือ/2 ต่ำ ยังไม่พอกลับ → คง **B** |
| 9-20 | **S** | **Survive ปลดล็อก (lv9)** — Death Prevention เหนือกว่าเพิ่ม → tally: **2 เหนือ(Mitigation, Death)/1 ต่ำ(Debuff) ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก A(Primary) เป็น S** — Font of Life(lv13, ลบ condition 8 แบบฟรี)+Legendary Resistance(lv20)เสริมต่อแต่ cap +1 ขั้นอยู่แล้ว |

**สรุปเกรด**: B(1-8) → **S(9-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | **C** | Primary=B(pre-EA) — modifier ทั้งหมดยังไม่มีกลไก(D×4) → 4/4 ต่ำ → ขยับลงเป็น **C** |
| 5-10 | **B** | **Guardian Tactics(Bonus Action)+Interrupt(lv5, Reaction — ยกเลิก extra attack/ability ของศัตรูตรงๆ, แรงที่สุดในระบบนี้)** ปลดล็อก → tally: **2 เหนือ(Bonus Action, Reaction)/2 ต่ำ(Extra Action, Resource-Conversion) — เสมอกัน (ครั้งที่ 23!)** ⚠️ net cancellation → กลับ Primary(B) |
| 11-20 | **A** | **Sentinel's Strike's Interdict (lv11, โจมตีพ่วง Interrupt reaction — บีบ 2 อย่างในเทิร์นเดียว)** — Resource-to-Action Conversion เหนือกว่า → tally: **3 เหนือ(Bonus Action, Reaction, Resource-Conversion)/1 ต่ำ(Extra Action)** → ถึงเกณฑ์ → **ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: C(1-4) → B(5-10) → **A(11-20)**

---

## Utility Axis

ไม่มีกลไก Utility ที่การันตีได้เลย (All-Seeing ที่ lv18 เป็น choice ไม่ใช่ guaranteed)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไกเลยตลอด 20 เลเวล = **D flat** |

**สรุปเกรด**: **D(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — Weapon Mastery (2 kinds, LR swap) → floor-escape → **Primary = B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary=B |
| 2-20 | **A** | Guardian Tactics's 3 ตัวเลือก(เลือกได้ทุกครั้งไม่ผูก resource)=Resource Fungibility เหนือกว่า, Cross-Axis Coverage เหนือกว่า(Support/Control/Action-Economy พร้อมกันจาก lv2-5) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-10) → A(11-20) |
| Control | D(1) → **B(2-20)** |
| Support | D(1) → **B(2-20)** |
| Survivability | B(1-8) → **S(9-20)** |
| Action Economy | C(1-4) → B(5-10) → **A(11-20)** |
| Utility | **D(1-20) flat** |
| Versatility | B(1) → **A(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **คลาสที่ออกแบบสมบูรณ์ที่สุดในระบบนี้จนถึงตอนนี้ — แข็งแกร่งทุก axis ยกเว้น Utility เดียว** — Damage(A)/Control(B)/Support(B)/Survivability(S)/Action-Economy(A)/Versatility(A) ล้วนแตะระดับสูง ตัดกับ Barbarian/Dancer/Gunslinger ที่เน้นทุ่มหนักบาง axis ทิ้งอื่น — Warden กระจายความแข็งแกร่งได้ทั่วถึงที่สุด
2. **Guardian Tactics เป็นฟีเจอร์ Support+Control ที่ไม่ผูก resource เลย — ครั้งแรกในระบบนี้** — ทุกคลาส Battle-Dice/Focus-Point/Perfect-Plan ก่อนหน้าล้วนมี "จำนวนใช้ได้/rest" จำกัด แต่ Block/Challenge/Grasp ของ Warden ใช้ได้**ไม่จำกัดทุกเทิร์น** — ทำให้ Frequency modifier เหนือกว่า peer แรงกว่าคลาสอื่นทั้งหมดที่เจอมา ดันทั้ง Control และ Support ขึ้นถึง B ตั้งแต่ lv2 พร้อมกัน
3. **Interrupt (lv5) เป็น Reaction Value ที่แรงที่สุดเท่าที่เจอในระบบนี้** — ยกเลิกการโจมตี/ความสามารถของศัตรูตรงๆ (ไม่ใช่แค่ลดดาเมจหรือโต้กลับแบบ Uncanny Dodge/Riposte) — เทียบเท่าหรือเหนือกว่า Riposte/Uncanny Dodge ที่เคยเจอมา
4. **Legendary Resistance (lv20) เป็นฟีเจอร์เดียวในระบบนี้ที่ใช้ชื่อ/กลไกตรงจากมอนสเตอร์** — save พลาด→เลือกผ่านแทนได้ 3 ครั้ง/long rest — capstone ที่ตรงไปตรงมาที่สุดเท่าที่เจอมา
5. **ไม่มี tie-break 2-2 ในไฟล์นี้ยกเว้น 1 จุด** (Action Economy lv5-10, ครั้งที่ 23) — โดยรวมยังเจอน้อยกว่าคลาสอื่นๆ ที่มี resource-gated maneuver เพราะ Guardian Tactics ไม่ผูก resource ทำให้ modifier เอียงชัดกว่า
