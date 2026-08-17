# Monk — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Monk Subclass ที่ lv3/6/11/17 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-monk.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 34 รายการ
**สถานะ**: คลาสที่ 16 ของชั้น 1 — **Monk คือคลาสที่ Anchor Rubric เองอ้างชื่อเป็นตัวอย่างเพดานถึง 2 axis พร้อมกัน** (Survivability: Evasion/Disciplined Survivor/Superior Defense, Versatility: Stunning Strike สำหรับ Resource Fungibility) — ไฟล์นี้ยืนยันตัวเลขจริงตรงกับที่ Anchor cite ไว้ทุกจุด

⚠️ **หมายเหตุสำคัญที่สุด — Versatility floor rule**: Monk **ไม่มี Weapon Mastery เลย** (สแกนครบ 34 feature ไม่พบ) — เป็นมาร์เชียลตัวแรกในชั้น 1 ที่ไม่มี floor-escape route นี้ ทั้งที่ Focus Points เป็นทรัพยากร fungible ที่หนาแน่นที่สุดเท่าที่เจอมา (จ่ายซื้อ Damage/Survivability/Control/Action-Economy ได้พร้อมกัน) — แต่ **Loadout Flexibility Primary วัดเฉพาะ "สลับตัวเลือกที่มีได้ไหม" ไม่ใช่ "ทรัพยากร fungible แค่ไหน"** และ Focus Point ไม่ได้ให้สลับ 3 ความสามารถ (Flurry/Patient Defense/Step of the Wind) เลย — รู้ทั้ง 3 ตายตัวตลอดกาล → **floor rule ล็อก Versatility ทั้ง axis ที่ D** แม้ modifier อื่นจะแรงแค่ไหนก็ตาม — ยืนยัน pattern เดียวกับที่ Sacred Knight เจอมาก่อน (Fervor Technique ก็ไม่สลับได้เหมือนกัน) เป็นข้อมูลจุดที่ 2

---

## สรุป Chassis

**HD**: d8 (ตรง peer — **ไม่ได้ยกระดับเหมือนที่คาดจากธีม "นักสู้ป้องกันตัวเก่ง"**) · **Save prof**: STR/DEX · **ไม่มีสเปลล์คาสติ้งเลย ไม่มี Weapon Mastery เลย**

| Lv | Martial Arts Die | Focus Points | Unarmored Movement | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|
| 1 | 1d6 | 0 | — | Martial Arts (Bonus Unarmed Strike ฟรี, Dexterous Attacks), Unarmored Defense | 11 |
| 2 | 1d6 | 2 | +10ft | **Monk's Focus** (Flurry of Blows/Patient Defense/Step of the Wind), **Uncanny Metabolism** (คืน Focus Point เต็ม+ฟื้น HP ตอนทอย Initiative) | 19 |
| 3 | 1d6 | 3 | +10ft | *(Monk Subclass — ยกเว้น)*, **Deflect Attacks** (reaction ลดดาเมจ B/P/S) | 27 |
| 4 | 1d6 | 4 | +10ft | ASI, Slow Fall | 35 |
| 5 | 1d8 | 5 | +10ft | **Extra Attack**, **Stunning Strike** (Focus Point → CON save พลาด=Stunned) | 43 |
| 6 | 1d8 | 6 | +15ft | Empowered Strikes (unarmed = Force damage ได้), *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 1d8 | 7 | +15ft | **Evasion** | 59 |
| 8 | 1d8 | 8 | +15ft | ASI | 67 |
| 9 | 1d8 | 9 | +15ft | Acrobatic Movement | 75 |
| 10 | 1d10 | 10 | +20ft | Heightened Focus (Flurry 3 attack/Patient Defense temp HP/Step of Wind ลาก ally), Self-Restoration | 83 |
| 11 | 1d10 | 11 | +20ft | *(Subclass feature — ยกเว้น)* | 91 |
| 12 | 1d10 | 12 | +20ft | ASI | 99 |
| 13 | 1d10 | 13 | +20ft | Deflect Energy (ขยาย Deflect Attacks ทุกชนิดดาเมจ) | 107 |
| 14 | 1d10 | 14 | +25ft | **Disciplined Survivor** (prof ทุก save+reroll) | 115 |
| 15 | 1d10 | 15 | +25ft | Perfect Focus (คืน Focus Point ถ้าเหลือ≤3 ตอน Initiative) | 123 |
| 16 | 1d10 | 16 | +25ft | ASI | 131 |
| 17 | 1d12 | 17 | +25ft | *(Subclass feature — ยกเว้น)* | 139 |
| 18 | 1d12 | 18 | +30ft | **Superior Defense** (3 Focus Point → resist ทุกดาเมจยกเว้น force 1 นาที) | 147 |
| 19 | 1d12 | 19 | +30ft | Epic Boon | 155 |
| 20 | 1d12 | 20 | +30ft | Body and Mind (DEX/WIS +4) | 163 |

---

## Damage Axis

**Primary = Magnitude** — Extra Attack ตรงเวลา lv5 = matches peer (Bonus Unarmed Strike/Flurry of Blows นับเป็น Action-Economy modifier แยก ไม่ผสาน Primary ตามธรรมเนียมเดิมที่ทำกับ Rage/Rushed Incantation)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-5 | B | matches peer — modifier: Burst=เหนือกว่า(Flurry of Blows lv2+) แต่ 1/4 ไม่พอขยับ |
| 6-20 | **A** | **Empowered Strikes ปลดล็อก** — unarmed strike เลือกดาเมจ Force ได้ (แทบไม่มีอะไรต้าน) = Resistance-proofing เหนือกว่า → tally: **2/4 เหนือกว่า(Burst, Resistance-proofing) ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1-5) → **A(6-20)**

---

## Control Axis

**Primary = Severity** — **Stunning Strike (lv5) คือ Tier4 CC ที่ทรงพลังที่สุดเท่าที่เจอในระบบนี้จนถึงตอนนี้**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | D | ไม่มีกลไก Control เลย = **D** |
| 5-20 | **A** | Stunning Strike: CON save พลาด → **Stunned (Tier4) ไม่มี repeat save ระหว่างทาง** ใช้ได้ทุกเทิร์นถ้ามี Focus Point (2→20 ตามเลเวล) = Severity ตรง peer(Tier4) = Primary **B** — modifier: Breadth=ต่ำกว่า(เดี่ยว), **Frequency=เหนือกว่ามาก**(Focus Point รีฟิลด้วย Short Rest+Initiative-roll ไม่ใช่แค่ slot/วัน), **Stickiness=เหนือกว่า**(ไม่มี repeat save เลยตลอด duration), LR-bypass=ตรง(ยังต้อง save ปกติ), **Concentration Risk=เหนือกว่า**(instant on-hit ไม่ใช่ concentration) → **3/5 เหนือกว่า ถึงเกณฑ์ ≥3/5 → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: D(1-4) → **A(5-20)** — Control ที่แข็งแกร่งที่สุดในบรรดามาร์เชียลทั้งหมดที่ทำมา

---

## Support Axis

ไม่มีกลไกเล็ง ally เลย — Step of the Wind's lv10 upgrade (ลาก willing ally ไปด้วย) เป็น utility เล็กน้อย ไม่ใช่ Magnitude จริง

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไก Support จริงจังเลยตลอด 20 เลเวล = **D flat** |

**สรุปเกรด**: **D(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer — ไม่ได้ยกระดับ) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B — modifier ทั้งหมดยังไม่ปลดล็อก → 3/4 ต่ำกว่า → ขยับลงเป็น **C** |
| 2 | = lv1 | Uncanny Metabolism(self-heal ตอน Initiative)=Death Prevention เหนือกว่า → tally: 1 เหนือ/2 ต่ำ(Mitigation, Debuff) → ยังไม่ถึงเกณฑ์เหนือ → คง **C** |
| 3-6 | **A** | **Deflect Attacks ปลดล็อก** — Mitigation เหนือกว่า(reaction ลดดาเมจ B/P/S) → tally: **2 เหนือ(Mitigation, Death Prevention)/1 ต่ำ(Debuff) ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B(Primary) เป็น A** |
| 7-20 | = lv3-6 | **Evasion ปลดล็อก (lv7, ตัวอย่างเพดานที่ Anchor เองอ้างชื่อ Monk ตรงๆ)** — Debuff Resistance เหนือกว่าด้วย (3/4 เต็ม), **Disciplined Survivor (lv14, ตัวอย่างเพดานอีกจุดที่ Anchor cite ชื่อ Monk)** — Save Reliability เหนือกว่า (4/4 เต็ม) — cap ที่ +1 ขั้นตลอด → คง **A** |

**สรุปเกรด**: C(1-2) → **A(3-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B(pre-EA) — Bonus Unarmed Strike(bonus action ฟรีตั้งแต่ lv1)=Bonus Action เหนือกว่า แต่ modifier อื่นยังไม่มี(D×3) → 3/4 ต่ำ ถึงเกณฑ์ → ขยับลงเป็น **C** |
| 2 | **B** | Patient Defense/Step of the Wind(Focus Point→2 action พร้อมกันเป็น bonus action)=Resource-to-Action Conversion เหนือกว่า → tally: **2 เหนือ(Bonus Action, Resource-Conversion)/2 ต่ำ(Reaction, Extra Action) — เสมอกัน (ครั้งที่ 15!)** ⚠️ net cancellation → กลับ Primary(B) |
| 3-20 | **A** | **Deflect Attacks ปลดล็อก** — Reaction เหนือกว่า(ลดดาเมจ+โต้กลับ) → tally: **3 เหนือ(Bonus Action, Reaction, Resource-Conversion)/1 ต่ำ(Extra Action)** → ถึงเกณฑ์ → **ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: C(1) → B(2) → **A(3-20)**

---

## Utility Axis

ไม่มีสเปลล์เลย ไม่มี Expertise เลย — Acrobatic Movement(lv9, ปีน/ว่ายน้ำ) เป็น mobility/Survivability-adjacent ไม่ใช่ Reveal-Info/Solve-Problem ตามนิยาม Anchor

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไก Utility เลยตามนิยาม Anchor เข้มงวด = **D flat** |

**สรุปเกรด**: **D(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — **ไม่มี Weapon Mastery + ไม่มีสเปลล์** → Focus Points ไม่ใช่กลไก "สลับตัวเลือก" (Flurry/Patient Defense/Step of the Wind รู้ครบ 3 ตัวตายตัวตลอดกาล) → **Primary = D floor rule ล็อกทั้ง axis**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไกสลับ loadout เลยจริงๆ (Focus Points เป็น fungible resource แต่ไม่ใช่ swap mechanism — คนละมิติกัน) → floor rule ล็อก D ทั้ง axis **แม้ Resource Fungibility(Stunning Strike ที่ Anchor เองอ้างชื่อ Monk ไว้)/Cross-Axis Coverage/Adaptability จะแรงที่สุดเท่าที่เจอมาก็ตาม** — floor rule ไม่สนใจ modifier เลยไม่ว่าจะแรงแค่ไหน |

**สรุปเกรด**: **D(1-20) flat** — ผลลัพธ์ขัดความรู้สึกอย่างมาก (Monk เป็นคลาสที่ "รู้สึกยืดหยุ่นที่สุด" ในเกมจริง แต่ระบบให้ D เพราะ technical definition ของ Loadout Flexibility เข้มงวดเรื่อง "สลับได้ไหม" ไม่ใช่ "ทรัพยากรยืดหยุ่นแค่ไหน")

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-5) → A(6-20) |
| Control | D(1-4) → **A(5-20)** |
| Support | **D(1-20) flat** |
| Survivability | C(1-2) → **A(3-20)** |
| Action Economy | C(1) → B(2) → **A(3-20)** |
| Utility | **D(1-20) flat** |
| Versatility | **D(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **⚠️ Versatility=D-flat ทั้งที่ Focus Points เป็นทรัพยากรยืดหยุ่นที่สุดเท่าที่เจอมา — ตอกย้ำ pattern จาก Sacred Knight** — Loadout Flexibility Primary วัดเฉพาะ "สลับตัวเลือกได้ไหม" ไม่ใช่ "ทรัพยากรร่วม fungible แค่ไหน" (2 มิติคนละเรื่องที่ดูเผินๆ เหมือนกัน) — Monk เป็นข้อมูลจุดที่ 2 ต่อจาก Sacred Knight ที่ floor rule กัด Versatility รุนแรงทั้งที่ในทางปฏิบัติเป็นคลาสที่ยืดหยุ่นมาก — ควรพิจารณาทบทวน Anchor Rubric ว่ามิตินี้ (Loadout Flexibility) ควรแยกจาก Resource Fungibility ให้ชัดกว่านี้หรือไม่ในระยะยาว
2. **Control แข็งแกร่งที่สุดในบรรดามาร์เชียลทั้งหมด (A ตั้งแต่ lv5)** — Stunning Strike ให้ Tier4 CC ที่ใช้ได้แทบทุกเทิร์น (Focus Point 2→20 ตามเลเวล, รีฟิลด้วย Short Rest ด้วย) ต่างจาก Barbarian/Fighter/Captain ที่ Control สูงสุดแค่ C
3. **HD ไม่ได้ยกระดับ (d8 ธรรมดา) แต่ Survivability ยังแตะ A ได้ผ่าน modifier ล้วนๆ** — ตัดกับ Barbarian/Martyr/Craftsman/Dancer(กึ่งหนึ่ง) ที่ต้องพึ่ง d10-d12 ก่อน — Monk พิสูจน์ว่า hit die ธรรมดาก็ไปถึง A ได้ถ้า modifier (Deflect Attacks+Evasion+Disciplined Survivor) แน่นพอ
4. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 15** (Action Economy lv2) — สะสมสูงสุดเท่าที่เคยมี ยิ่งย้ำว่าควรฟอร์มัลไลซ์กฎเสมอกันเข้า Anchor Rubric อย่างจริงจังในรอบทำงานถัดไป
5. **ไฟล์นี้ยืนยันตัวเลขทุกจุดที่ Anchor Rubric เคย cite ชื่อ Monk ไว้ล่วงหน้าตรงกันหมด** — Evasion(lv7)/Disciplined Survivor(lv14, prof ทุก save+reroll)/Superior Defense(lv18, resist ทุกดาเมจยกเว้น force)/Stunning Strike(lv5, Focus Point→Stunned) — ทุกจุดตรงกับที่ Anchor อธิบายไว้แบบคำต่อคำ เหมือนที่ Fighter เคยยืนยันมาก่อน
