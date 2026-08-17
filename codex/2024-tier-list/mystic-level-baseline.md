# Mystic — Class Baseline (Level-Indexed, ชั้น 1) — ⚠️ (2014-only, ไม่มี 2024 update)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Mystic Order ที่ lv1/3/6/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Mystic", source: "UATheMysticClass", edition: "classic"` (2014/2017 UA) — **ไม่มี XPHB entry เลย** (เช็คทั้ง `src/data/5etools/official/class/class-mystic.json` และ bundled file แล้ว มีแค่ classic เดียว) → ใช้ตามธรรมเนียม "2024-scope tier lists keep 2014-only content" (เหมือนกับ subclass 2014-only ในระบบเดิม) — ยืนยัน `classFeaturesFull` ครบ 23 รายการ
**สถานะ**: คลาสที่ 18 ของชั้น 1 — **Psion-style class** (Talents/Disciplines/Psi Points) — Disciplines = สเปลล์เทียบเท่าที่ผูกกับ Psi Points

⚠️ **ข้อจำกัดข้อมูลสำคัญที่สุดในไฟล์นี้**: **ไม่มีไฟล์ psionics data ในโปรเจกต์นี้เลย** (เช็คแล้วไม่พบ `*psionic*` ไฟล์ใดๆ ต่างจาก `spells-xphb.json` ที่ยืนยันกลไกสเปลล์จริงได้เสมอ) — ถามผู้ใช้แล้วตัดสินใจให้ **ใช้ "generic caster track" แบบเดียวกับที่ทำกับ Bard/Cleric/Druid** (Damage=cantrip-equivalent track, Control/Support/Utility=matches peer benchmark ทั่วไปตามสมมติฐาน full-caster ปกติ) **แทนการอ้างชื่อ discipline เฉพาะเจาะจงที่ไม่มีทางยืนยันความถูกต้องได้** — ต่างจากทุกคลาสก่อนหน้าที่อย่างน้อยมี `spells-xphb.json` ยืนยันกลไกจริง (แม้ list-membership จะใช้ความรู้ทั่วไป) ไฟล์นี้ **ทั้ง list-membership และ mechanic ล้วนเป็นสมมติฐาน generic ทั้งหมด ความเชื่อมั่นต่ำกว่าไฟล์อื่นในระบบนี้ทุกไฟล์**

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: INT/WIS · **Psionics**: INT-based, Psi Points (spell-point equivalent) เริ่ม lv1, Disciplines สลับ 1 ตัว/เลเวลอัพ (tier "ต่ำ")

| Lv | Talents Known | Disciplines Known | Psi Points | Psi Limit | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 4 | 2 | **Psionics** (Psychic Focus: bonus action ตั้ง ongoing benefit), *(Mystic Order — ยกเว้น)* | 11 |
| 2 | 1 | 1 | 6 | 2 | **Mystical Recovery** (bonus action self-heal=psi points ที่ใช้), **Telepathy** | 19 |
| 3 | 2 | 2 | 14 | 3 | *(Order feature — ยกเว้น)* | 27 |
| 4 | 2 | 2 | 17 | 3 | ASI, **Strength of Mind** (สลับ save prof จาก WIS เป็นสเตตอื่นได้ทุก rest) | 35 |
| 5 | 2 | 3 | 27 | 5 | — | 43 |
| 6 | 2 | 3 | 32 | 5 | *(Order feature — ยกเว้น)* | 51 |
| 7 | 2 | 4 | 38 | 6 | — | 59 |
| 8 | 2 | 4 | 44 | 6 | ASI, **Potent Psionics** (+1d8 psychic weapon attack + Int mod เข้า Talent damage) | 67 |
| 9 | 2 | 5 | 57 | 7 | — | 75 |
| 10 | 3 | 5 | 64 | 7 | **Consumptive Power** (จ่าย psi cost ด้วย HP แทนได้ 1/long rest) | 83 |
| 11 | 3 | 5 | 64 | 7 | **Psionic Mastery** (action → psi point พิเศษ 9 แต้ม, 1/วัน) | 91 |
| 12 | 3 | 6 | 64 | 7 | ASI | 99 |
| 13 | 3 | 6 | 64 | 7 | Psionic Mastery 2/วัน | 107 |
| 14 | 3 | 6 | 64 | 7 | *(Order feature — ยกเว้น)*, Potent Psionics เพิ่มเป็น 2d8 | 115 |
| 15 | 3 | 7 | 64 | 7 | Psionic Mastery 3/วัน+psi พิเศษเพิ่มเป็น 11 | 123 |
| 16 | 3 | 7 | 64 | 7 | ASI | 131 |
| 17 | 4 | 7 | 64 | 7 | Psionic Mastery 4/วัน | 139 |
| 18 | 4 | 8 | 71 | 7 | — | 147 |
| 19 | 4 | 8 | 71 | 7 | ASI | 155 |
| 20 | 4 | 8 | 71 | 7 | **Psionic Body** (resist B/P/S, immune poison/disease, "discorporate" กันตายถาวร) | 163 |

---

## Damage Axis

**Primary = Magnitude** (Talent = cantrip-equivalent generic track — ไม่มี Extra Attack เลยตลอดชาติ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-7 | B | Talent ตรง peer's cantrip track (สมมติฐาน generic) = **B** |
| 8-20 | **A** | **Potent Psionics ปลดล็อก** — +1d8→2d8 psychic weapon rider + Int mod เข้า Talent damage ซ้อนเหนือ peer baseline (pattern เดียวกับ Cleric's Blessed Strikes) → **A** |

**สรุปเกรด**: B(1-7) → **A(8-20)**

---

## Control Axis

**Primary = Severity** — ใช้ generic caster track ตามที่ user ยืนยัน (สมมติฐาน ไม่ได้ยืนยันจาก discipline text จริง)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | สมมติฐาน generic full-caster track ตรง peer benchmark ตลอด (เหมือน Bard) — **ข้อควรระวัง: ไม่มีทางยืนยันว่า discipline ของ Mystic จริงๆ มี hard-CC เทียบเท่า Hold Person/Hypnotic Pattern หรือไม่ เพราะไม่มีไฟล์ข้อมูลอ้างอิง** |

**สรุปเกรด**: **B(1-20) flat** ⚠️ (ความเชื่อมั่นต่ำ — สมมติฐานล้วน)

---

## Support Axis

**Primary = Magnitude** — ไม่มีฟีเจอร์ base-class เล็ง ally เลยแม้แต่จุดเดียว (Mystical Recovery เป็น self-only) — Support ทั้งหมดขึ้นกับ discipline ที่เลือก (generic caster track)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | สมมติฐาน generic full-caster track ตรง peer benchmark (เหมือน Bard) — **ไม่มีฟีเจอร์ base-class ยืนยันได้เลย ล้วนขึ้นกับ discipline choice ที่ไม่มีข้อมูลอ้างอิง** |

**สรุปเกรด**: **B(1-20) flat** ⚠️ (ความเชื่อมั่นต่ำ — สมมติฐานล้วน)

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B — modifier ทั้งหมดยังไม่ปลดล็อก → 3/4 ต่ำกว่า → ขยับลงเป็น **C** |
| 2-3 | = lv1 | Mystical Recovery(self-heal)=Death Prevention เหนือกว่า → tally 1 เหนือ/2 ต่ำ ยังไม่พอ → คง **C** |
| 4-19 | **B** | **Strength of Mind ปลดล็อก** — Save Reliability เหนือกว่า → tally: **2 เหนือ(Death, Save)/2 ต่ำ(Mitigation, Debuff) — เสมอกัน (ครั้งที่ 17!)** ⚠️ net cancellation → กลับ Primary(B) |
| 20 | **A** | **Psionic Body ปลดล็อก** — Mitigation(resist B/P/S)+Debuff Resistance(immune poison/disease) ขยับเป็นเหนือกว่าพร้อมกัน → 4/4 เหนือ → ถึงเกณฑ์ → **ขยับขึ้น 1 ขั้นจาก B(Primary) เป็น A** |

**สรุปเกรด**: C(1-3) → B(4-19) → **A(20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-9 | **D** | Primary=C — modifier: Bonus Action=เหนือกว่า(Psychic Focus lv1), Reaction=ไม่มีกลไก(D), Extra Action=ไม่มีกลไก(D), Resource-Conversion=ไม่มีกลไก(D) → 3/4 ต่ำ ถึงเกณฑ์ → ขยับลงจาก C เป็น **D** |
| 10-20 | **C** | **Consumptive Power ปลดล็อก** (จ่าย HP แทน psi cost ไม่เสีย action เพิ่ม) — Resource-Conversion เหนือกว่า → tally: **2 เหนือ(Bonus Action, Resource-Conversion)/2 ต่ำ(Reaction, Extra Action) — เสมอกัน (ครั้งที่ 18!)** ⚠️ net cancellation → กลับ Primary(C) |

**สรุปเกรด**: D(1-9) → **C(10-20)**

---

## Utility Axis

**Primary = Magnitude** — Telepathy(lv2, จริง ยืนยันจาก base-class feature) + discipline-based Reveal-Info/Solve-Problem (generic caster track)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Telepathy(base-class, ยืนยันจริง)+สมมติฐาน generic caster track ตรง peer — Skill-Check Layer=ไม่มีกลไก(D) 1/4 ไม่พอขยับ → คง **B** |

**สรุปเกรด**: **B(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — ยืนยันจาก text จริง "replace one discipline you know...whenever you gain a level" = tier **"ต่ำ"** ตรงตัว → **Primary = C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Primary=C — modifier: **Resource Fungibility=เหนือกว่า**(Psi Points เดียวซื้อ discipline หลายแบบตั้งแต่ lv1), **Cross-Axis Coverage=เหนือกว่า**(Psychic Focus+Talents+Disciplines แตะหลาย axis พร้อมกันตั้งแต่ lv1), Target-Type=ตรง, Adaptability=ตรง → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C(Primary) เป็น B** ตั้งแต่ lv1 (Psi Points มีตั้งแต่ lv1 ไม่ต้องรอ milestone แบบ Bard) |

**สรุปเกรด**: **B(1-20) flat**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-7) → **A(8-20)** |
| Control | **B(1-20) flat** ⚠️ (สมมติฐาน) |
| Support | **B(1-20) flat** ⚠️ (สมมติฐาน) |
| Survivability | C(1-3) → B(4-19) → **A(20)** |
| Action Economy | D(1-9) → C(10-20) |
| Utility | **B(1-20) flat** |
| Versatility | **B(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **⚠️ ไฟล์นี้มีความเชื่อมั่นต่ำที่สุดในระบบนี้จนถึงตอนนี้** — ไม่มีไฟล์ psionics data ให้ยืนยัน discipline mechanics เลย (ต่างจาก Bard/Cleric/Druid ที่อย่างน้อยมี `spells-xphb.json` ยืนยันตัวเลขจริง) Control/Support ทั้ง 2 axis เป็นสมมติฐาน generic-caster-track ล้วนๆ ไม่มีทางตรวจสอบว่าตรงกับ discipline จริงของ 2017 UA Mystic หรือไม่ — ถ้า user มีความรู้เกี่ยวกับ discipline ตัวจริงมากกว่านี้ ควรกลับมาแก้ไฟล์นี้ในอนาคต
2. **2014-only class ตัวแรกในระบบ level-indexed นี้** — ใช้ธรรมเนียมเดียวกับระบบเก่าที่เก็บ subclass 2014-only ไว้ในสโคป (`feedback_2024_scope_keep_2014_only`) แต่นี่เป็นครั้งแรกที่ใช้กับ **base class** ทั้งตัว ไม่ใช่แค่ subclass
3. **Loadout Flexibility เป็นข้อมูลที่เชื่อถือได้ 100%** (ยืนยันจาก text จริงในไฟล์) แม้ Control/Support จะเป็นสมมติฐาน — Disciplines สลับ 1 ตัว/เลเวลอัพ ตรง "ต่ำ" tier เป๊ะ, Versatility ยังแตะ B ได้เร็วกว่า Bard เพราะ Psi Points fungible ตั้งแต่ lv1 ไม่ต้องรอ milestone
4. **⚠️ Tie-break 2-2 เกิดซ้ำถึง 2 ครั้งในไฟล์เดียว** (Survivability lv4-19, Action Economy lv10-20) รวมเป็นครั้งที่ 17-18 ของทั้งระบบ
5. **Potent Psionics (lv8) ให้ผลเดียวกับ Cleric's Blessed Strikes เป๊ะ** — Damage Primary ยกระดับผ่าน stacking bonus บนดาเมจ weapon+cantrip พร้อมกัน — ยืนยันว่า pattern "Primary-elevation จากฟีเจอร์กลางเกม" เกิดขึ้นได้ทั้งกับคลาส official และ 2014-UA เหมือนกัน
