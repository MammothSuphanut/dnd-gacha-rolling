# Tactician — Class Baseline (Level-Indexed, ชั้น 1) — ⚠️ (ข้อมูลจาก web, ไม่มีในไฟล์ repo)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Strategic Focus subclass ที่ lv3/6/10/15/18 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: **ไม่มีไฟล์ chassis ในโปรเจกต์นี้เลย** (เช็คแล้ว: ไม่มีใน `class.json` bundled, ไม่มีใน `src/data/5etools/*` ทั้ง official และ homebrew mirror — มีแค่ชื่อใน `src/data/classes.json` ซึ่งเป็น roll-table ไม่ใช่ mechanic) — Tactician เป็น 3rd-party จาก *Drizzt's Travelogue of Everything* (DMs Guild) — user ให้ URL Roll20 Compendium มา (`app.roll20.net/compendium/dnd5e/Classes:Tactician` โดน 403, ใช้ `roll20.net/compendium/dnd5e/Tactician` แทนสำเร็จ) **พบเพิ่มว่ามี Class Baseline ที่ระบบเก่าเคยเขียนไว้แล้วที่ [tactician-subclass-scorecard-2024.md](tactician-subclass-scorecard-2024.md)** (เขียนไว้ 2026-08-08 จากแหล่งเดียวกัน + screenshot volume 2 จาก user) ใช้ cross-check ยืนยันรายละเอียดฟีเจอร์เพิ่มเติม — ยกระดับความเชื่อมั่นขึ้นจากที่คาดไว้แรกเริ่ม (ยังต่ำกว่าคลาสที่มีไฟล์ JSON โดยตรงอยู่ดี แต่ดีกว่า Mystic ตรงที่มี Class Baseline ยืนยันจาก session ก่อนหน้าจริง)
**สถานะ**: คลาสที่ 24 ของชั้น 1

⚠️ **แก้ไขจากรอบแรก (หลัง cross-check กับ tactician-subclass-scorecard-2024.md)**: Perfect Plan die มี 2 การใช้แยกกัน — **(1) Perfect Plan หลัก (lv1)**: ใช้ **Reaction** เติม d4 บน attack roll/ability check ของตัวเองหรือ ally-ในแผน (saving throw ด้วยที่ lv7+ ผ่าน Improved Perfect Plan) — ไม่เสีย action หลัก, **(2) Combat Analysis (lv2, ส่วนหนึ่งของ Analyze)**: เสีย PP die 1 ลูกเพิ่มดาเมจ 1d4→4d4 เฉพาะเป้าที่ analyze — คนละกลไกกัน แม้ใช้ pool เดียวกัน — ยืนยัน Perfect Plan Dice progression ตรงกับที่ระบบเก่าบันทึกไว้ (2 ที่ lv1 → 21 ที่ lv20)

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: INT/WIS · **ไม่มีสเปลล์คาสติ้งเลย ไม่มี Weapon Mastery เลย** (ไม่พบในข้อมูลที่ fetch มา — อาจเพราะเขียนก่อนกฎ Weapon Mastery ของ 2024 XPHB จะออก)

| Lv | Perfect Plan Dice (d4) | Milestone อื่น |
|---|---|---|
| 1 | 2 | **Perfect Plan** (pool เสริม roll ของ ally), Intelligent Defense (Int→AC แทน Dex), Polyglot |
| 2 | 3 | **Analyze** (bonus action, เผย AC/trait ศัตรู, prof-bonus ครั้ง/rest), **Combat Analysis** (จ่าย PP die → dmg เสริมต่อเป้าที่ analyze), Trait Analysis, Contingency Plan |
| 3 | 4 | *(Strategic Focus — ยกเว้น)*, **Expertise** (×2) |
| 4 | 5 | ASI |
| 5 | 6 | **Guiding Guile** (หลังตีโดน 1 ครั้ง/เทิร์น → ally ใช้ reaction โจมตีเป้าเดียวกันได้ฟรี) |
| 6 | 7 | *(Strategic Focus feature — ยกเว้น)* |
| 7 | 8 | **Resilient Mind** (WIS-save-half-dmg→ไม่โดนเลยถ้า save ผ่าน + adv save vs charm/frighten/stun), **Improved Perfect Plan** (PP die เข้า saving throw ได้) |
| 8 | 9 | ASI |
| 9 | 10 | Advanced Planning Techniques (reroll 1-2/หัก dice จาก save ศัตรู), Mind's Eye (กัน unseen-attacker adv) |
| 10 | 11 | *(Strategic Focus feature — ยกเว้น)*, Expertise รอบ 2 |
| 11 | 12 | **Analytic Advantage** (ดาเมจเสริมจาก PP die ต่อเป้า analyzed พ่วง rider: กัน reaction/ผลัก/Prone) |
| 12 | 13 | ASI |
| 13 | 14 | Improvised Plan (action/reaction, แจก Improvisation die d4 ให้ ally สูงสุด 1+Int-mod คน) |
| 14 | 15 | **Battlefield Commander** (reaction เสริมแยกต่างหากเฉพาะใช้ PP die) |
| 15 | 16 | *(Strategic Focus feature — ยกเว้น)* |
| 16 | 17 | ASI |
| 17 | 18 | Piercing Eye (โจมตีแรกต่อเทิร์นต่อเป้า analyzed ได้ PP die ฟรีไม่ต้องใช้ reaction) |
| 18 | 19 | *(Strategic Focus feature — ยกเว้น)* |
| 19 | 20 | Epic Boon(สมมติฐาน มาตรฐาน lv19) |
| 20 | 21 | **Ultimate Knowing** (Int+2, กันแปลกใจ, adv ทุก attack/check/save, ศัตรูโจมตีเรามี disadv) |

---

## Damage Axis

**Primary = Magnitude** — **ไม่มี Extra Attack เลยตลอดชาติ** (ไม่พบในข้อมูลที่ fetch มาที่ระดับไหนเลย — ธีมคลาส "ผู้บัญชาการ" สอดคล้องกับการไม่มี Extra Attack)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | matches peer (1 attack, ยังไม่มี Combat Analysis) |
| 2-20 | **C** | Combat Analysis เสริมดาเมจ 1d4→4d4 แต่**เฉพาะเป้าที่ analyze แล้วเท่านั้น** (conditional) + ยังคง 1 attack เดียวตลอดกาล ต่ำกว่า peer's 2-attack(~17) = **C** (pattern เดียวกับ Captain เป๊ะ — "ผู้บัญชาการ" ไม่นัวก้อนดาเมจเอง) |

**สรุปเกรด**: B(1) → **C(2-20)**

---

## Control Axis

**Primary = Severity** — Analytic Advantage (lv11) คือกลไก Control เดียวในเบสคลาส

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | D | ไม่มีกลไก Control เลย = **D** |
| 11-20 | **C** | Analytic Advantage: กัน reaction/ผลัก 10ft/Prone (Tier1-2) ต่อเป้าที่ analyze เท่านั้น — ต่ำกว่า peer's Tier4 = **C** |

**สรุปเกรด**: D(1-10) → **C(11-20)**

---

## Support Axis

**Primary = Magnitude** — **นี่คือ axis ที่ตรงกับตัวตนคลาสที่สุด (ธีม "warlord" เต็มรูปแบบ)** — แต่ **ไม่มีฮีลเลยสักจุด** (PP Dice เป็น buff/reroll-assist ล้วน ไม่ใช่ heal)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | C | PP die เสริม roll ของ ally (~2.5 avg/ครั้ง) ต่ำกว่า peer's heal-tier benchmark (ไม่มีฮีลเลย) = **C** |
| 5-12 | **B** | **Guiding Guile ปลดล็อก** — แจก ally reaction attack ฟรี(Action Economy เหนือกว่ามาก) + pool ใหญ่มาก(2→13 ในช่วงนี้, Frequency เหนือกว่า) + ไม่ผูก concentration(เหนือกว่า) → **3/5 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C เป็น B** |
| 13-20 | **A** | **Improvised Plan ปลดล็อก (lv13)** — แจก die ให้ ally **หลายคนพร้อมกัน** (สูงสุด 1+Int-mod) = Breadth ขยับเป็นเหนือกว่าด้วย → **4/5 เหนือกว่า ยังคง cap +1 ขั้น** แต่ Primary เองก็แข็งแรงขึ้นตามจำนวนรวม PP die (14+) → **ขยับขึ้นอีก 1 ขั้นเป็น A** |

**สรุปเกรด**: C(1-4) → **B(5-12)** → **A(13-20)** ⚠️ (ความเชื่อมั่นปานกลาง — ตีความจาก summary web ไม่ใช่ text ต้นฉบับ)

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-6 | **C** | Primary=B — modifier ทั้งหมดยังไม่ปลดล็อก(D×3, Save=ตรง) → 3/4 ต่ำ → ขยับลงเป็น **C** |
| 7-20 | **A** | **Resilient Mind+Improved Perfect Plan ปลดล็อกพร้อมกันที่ lv7** — Mitigation(WIS-save-half→ไม่โดน)+Debuff Resistance(adv vs charm/frighten/stun)+Save Reliability(PP die เข้า save) ขยับเป็นเหนือกว่าพร้อมกันทั้ง 3 → **3/4 เหนือกว่า ถึงเกณฑ์ไกล → ขยับขึ้น 1 ขั้นจาก B(Primary) เป็น A** |

**สรุปเกรด**: C(1-6) → **A(7-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **D** | Reaction=เหนือกว่าแล้วตั้งแต่ lv1(**Perfect Plan หลักเป็น Reaction จริง** ไม่ใช่แค่ Combat Analysis) แต่ Bonus Action/Extra Action/Resource-Conversion ยังไม่มี(D×3) → 3/4 ต่ำ ถึงเกณฑ์ → ขยับลงจาก C เป็น **D** |
| 2-20 | **C** | **Analyze ปลดล็อก (lv2)** — Bonus Action ขยับเป็นเหนือกว่าด้วย → tally: **2 เหนือ(Bonus Action, Reaction)/2 ต่ำ(Extra Action, Resource-Conversion) — เสมอกันยาวตลอด 2-20 (ครั้งที่ 21!)** ⚠️ net cancellation → กลับ Primary(C) ตลอด (Guiding Guile lv5/Battlefield Commander lv14 เสริม Reaction ที่เหนืออยู่แล้ว ไม่เปิด dimension ใหม่) |

**สรุปเกรด**: D(1) → **C(2-20)**

---

## Utility Axis

**Primary = Magnitude** — Analyze(lv2, เผย AC/trait ศัตรู) เป็นกลไกจริงแต่แคบกว่า peer's Detect-Magic-tier (เฉพาะ combat-focused)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | D | ไม่มีกลไกเลย = **D** |
| 2-20 | **C** | Analyze/Trait Analysis มีกลไกจริงแต่แคบกว่า peer — Skill-Check Layer=เหนือกว่า(Expertise lv3,lv10) 1/4 ไม่พอขยับ → คง **C** |

**สรุปเกรด**: D(1) → **C(2-20)**

---

## Versatility Axis

**Primary = Loadout Flexibility** — **ไม่มีสเปลล์ + ไม่มี Weapon Mastery** → ไม่มี floor-escape route เลย (เหมือน Monk เป๊ะ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไกสลับ loadout เลย → **floor rule ล็อก D ทั้ง axis** — ครั้งที่ 3 ของ pattern "fungible-resource-มากแต่ไม่มี swap mechanism → floor D" ต่อจาก Sacred Knight/Monk (PP Dice fungible มากแต่ไม่ใช่ loadout-swap) |

**สรุปเกรด**: **D(1-20) flat**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1) → C(2-20) |
| Control | D(1-10) → C(11-20) |
| Support | C(1-4) → B(5-12) → **A(13-20)** |
| Survivability | C(1-6) → **A(7-20)** |
| Action Economy | D(1) → C(2-20) |
| Utility | D(1) → C(2-20) |
| Versatility | **D(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **⚠️ คลาสแรกในระบบนี้ที่ไม่มีไฟล์ chassis ในโปรเจกต์เลยแม้แต่นิดเดียว** — ต่างจาก Mystic ที่ยังมี `classFeaturesFull` ในไฟล์ bundled ยืนยันชื่อ/เลเวลได้ Tactician ต้อง fetch จาก Roll20 Compendium (URL ที่ user ให้มา) ทั้งหมด — ความเชื่อมั่นต่ำที่สุดในระบบนี้ ควรกลับมาตรวจซ้ำถ้ามีไฟล์ต้นฉบับ (DMs Guild PDF) ให้เช็คในอนาคต
2. **ยืนยัน pattern "unmodeled/pet-adjacent ally-action-economy feature" ซ้ำเป็นครั้งที่ 3** — Guiding Guile (Tactician) ปฏิบัติเหมือน Blitz (Captain) เป๊ะ — สั่งให้ ally ใช้ reaction ฟรี นับเป็น Reaction Value ของผู้สั่งเอง (ไม่ใช่ pet แต่หลักการเดียวกัน)
3. **Support เป็น axis ที่ตรงตัวตนคลาสที่สุด แต่ไม่มีฮีลเลยสักจุด** — ทุ่มหนักไปทาง buff/reroll-assist บริสุทธิ์ (ต่างจาก Captain ที่มี Rally ฮีลด้วย) — Magnitude เริ่มที่ C เพราะไม่มีฮีล แต่ modifier (Frequency/Action-Economy/Concentration-Risk) ดันขึ้นถึง A ได้ในที่สุด
4. **Versatility=D-flat เป็นครั้งที่ 3 ของ pattern เดียวกับ Sacred Knight/Monk** — PP Dice fungible มากแต่ไม่มี swap mechanism เลย ยืนยันความถี่ของ pattern นี้เพิ่มขึ้นอีก
5. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 21** (Action Economy lv5-20) — สะสมต่อเนื่อง
