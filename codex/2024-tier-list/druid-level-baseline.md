# Druid — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Druid Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-druid.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 23 รายการ
**สถานะ**: คลาสที่ 11 ของชั้น 1 — **full caster ตัวที่ 3** ต่อจาก Bard/Cleric — **คลาสแรกที่มี Wild Shape** (กลไกที่ Anchor เองยังไม่เคยโมเดลไว้เลยตามที่ user เตือนไว้ตั้งแต่ตอนออกแบบ tier-list-level-split)

⚠️ **หมายเหตุก่อนอ่านตาราง — วิธีจัดการ Wild Shape**: Wild Shape (lv2+, bonus action แปลงร่างเป็น Beast, ได้ temp HP=Druid level, คงสเตตัสจิตใจ+class feature+spellcasting ability ของตัวเอง แต่ **cast สเปลล์ไม่ได้จนกว่าจะถึง Beast Spells lv18**) ไม่ได้ดัน Damage Primary โดยตรง (ดาเมจ Beast form ทั่วไปอ่อนกว่าสเปลล์) แต่ถูกนับเป็น **modifier จริงใน 4 axis พร้อมกัน**: Survivability(temp HP ซ้ำได้ 2-4 ครั้ง/rest), Action Economy(bonus action ที่เปลี่ยนทั้งชุดความสามารถ), Utility(สำรวจ/ว่ายน้ำ/บิน), Versatility(Cross-Axis Coverage สูงสุด) — วิธีนี้สอดคล้องกับที่เคยจัดการ Bardic Inspiration(Bard)/Divine Spark(Cleric) มาก่อน คือไม่ดันเลขตรงๆ แต่ให้เครดิตเป็น modifier ตามจริง — **Primal Order (lv1: Magician/Warden)** และ **Elemental Fury (lv7: Potent Spellcasting/Primal Strike)** เป็น binary choice แบบเดียวกับ Cleric's Divine Order/Blessed Strikes เป๊ะ (ฟีเจอร์คู่ขนานชื่อเดียวกันจริง) — ปฏิบัติ track-neutral เหมือนกัน

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: INT/WIS · **Spellcasting**: WIS-based เต็มรูปแบบตั้งแต่ lv1, full-swap prepared spells ทุก Long Rest

| Lv | Wild Shape uses | Cantrips | Prepared Spells | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|
| 1 | — | 2 | 4 | Druidic (Speak with Animals ติดตัวฟรีถาวร), **Primal Order** (Magician/Warden), Spellcasting | 11 |
| 2 | 2 | 2 | 5 | **Wild Companion** (Find Familiar ฟรีผ่าน slot/Wild Shape), **Wild Shape** (4 known form, CR≤1/4) | 19 |
| 3 | 2 | 2 | 6 | *(Druid Subclass — ยกเว้น)* | 27 |
| 4 | 2 | 3 | 7 | ASI, cantrip เพิ่ม, Wild Shape 6 known form/CR≤1/2 | 35 |
| 5 | 2 | 3 | 9 | **Wild Resurgence** (แปลง slot↔Wild Shape สองทาง ฟรี ไม่เสีย action) | 43 |
| 6 | 3 | 3 | 10 | *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 3 | 3 | 11 | **Elemental Fury** (Potent Spellcasting/Primal Strike) | 59 |
| 8 | 3 | 3 | 12 | ASI, Wild Shape 8 known form/CR≤1/บิน ได้ | 67 |
| 9 | 3 | 3 | 14 | — | 75 |
| 10 | 3 | 4 | 15 | *(Subclass feature — ยกเว้น)*, cantrip เพิ่ม | 83 |
| 11 | 3 | 4 | 16 | — | 91 |
| 12 | 3 | 4 | 16 | ASI | 99 |
| 13 | 3 | 4 | 17 | — | 107 |
| 14 | 3 | 4 | 17 | *(Subclass feature — ยกเว้น)* | 115 |
| 15 | 3 | 4 | 18 | **Improved Elemental Fury** | 123 |
| 16 | 4 | 4 | 18 | ASI | 131 |
| 17 | 4 | 4 | 19 | — | 139 |
| 18 | 4 | 4 | 20 | **Beast Spells** (cast ได้แม้อยู่ในร่าง Beast) | 147 |
| 19 | 4 | 4 | 21 | Epic Boon | 155 |
| 20 | 4 | 4 | 22 | **Archdruid** (Evergreen Wild Shape + Nature Magician: แปลง Wild Shape→slot) | 163 |

---

## Damage Axis

**Primary = Magnitude** (cantrip track — ไม่มี Extra Attack เลยตลอดชาติ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-6 | B | cantrip (Produce Flame-tier) ตรง peer's cantrip track เป๊ะ — Primal Strike ยังไม่มา |
| 7-20 | **A** | **Elemental Fury ปลดล็อก** — Potent Spellcasting(Wis mod เข้าดาเมจ cantrip) หรือ Primal Strike(+1d8→2d8 weapon-**หรือ**-Beast-attack rider) ซ้อนเหนือ peer's cantrip-ไม่บวก-mod baseline → Primary ขยับเป็น **A** ทันที (pattern เดียวกับ Cleric's Blessed Strikes เป๊ะ — Primal Strike ใช้ได้กับ Beast form attack ด้วย ต่างจาก Cleric ที่จำกัดแค่ weapon) |

**สรุปเกรด**: B(1-6) → **A(7-20)**

---

## Control Axis

**Primary = Severity**. Druid ไม่มี Sleep/Hold Person/Hold Monster (ตามความรู้ทั่วไป) — สาย Control ของ Druid เป็น **battlefield/terrain control** (Entangle, Wall of Thorns) ที่ให้ **Restrained (Tier3)** เป็นเพดานสูงสุด ไม่เคยแตะ Tier4 เลยตลอดอาชีพ

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Entangle(1st, Tier3 Restrained, AoE 20ft) ตั้งแต่ lv1 — ต่ำกว่า peer's Tier4 benchmark ตลอด (ไม่มีสเปลล์ไหนใน list ที่ยกระดับถึง Tier4 จริง) = Primary **C** ตลอดกาล — modifier: Breadth=เหนือกว่า(AoE กว้างเกือบทุกสเปลล์ CC ของ Druid ต่างจาก peer's single-target Hold Person) แต่โดดเดี่ยวมิติเดียวไม่พอถึงเกณฑ์ ≥3/5 |

**สรุปเกรด**: **C(1-20) flat** — ต่างจาก Bard/Cleric ที่ไล่ทันถึง B ในที่สุด เพราะ Druid ไม่มีสเปลล์ Tier4-lockdown เลยจริงๆ

---

## Support Axis

**Primary = Magnitude**. Druid มี Cure Wounds ในลิสต์แนะนำเริ่มต้นโดยตรง (ยืนยันจาก text จริง: "Cure Wounds...are recommended") + Goodberry/Mass Cure Wounds/Regenerate ตามความรู้ทั่วไป — ตรง peer's Support benchmark เกือบทุกจุดเหมือน Cleric **แต่ไม่มีทรัพยากรคู่ขนานแบบ Divine Spark/Bardic Inspiration** (Wild Shape เป็น self-only ไม่ใช่ ally-buff)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Cure Wounds/Goodberry(lv1)/Mass Cure Wounds(lv9)/Regenerate(lv13)/Reincarnate(unique)ตรง peer's spell benchmark ทุกจุดเทียบเลเวลเดียวกัน = Primary **B** ตรง peer — modifier ทั้ง 5 ไม่มีตัวไหนเด่นพอขยับ (ไม่มี Frequency/Concentration-Risk advantage แบบ Divine Spark/Bardic Inspiration) → คง **B** ตลอด |

**สรุปเกรด**: **B(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B — modifier: Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D), Death Prevention=ไม่มีกลไก(D) → 3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลง 1 ขั้นเป็น **C** |
| 2-20 | **A** | **Wild Shape ปลดล็อก** — temp HP=Druid level ทุกครั้งที่แปลงร่าง (ซ้ำได้ 2-4 ครั้ง/rest) = บัฟเฟอร์ HP จริงจังซ้ำได้บ่อย → Mitigation **และ** Death Prevention ขยับเป็นเหนือกว่าพร้อมกัน → tally: **2 เหนือ/1 ต่ำ(Debuff Resistance)** → ถึงเกณฑ์ ≥2/4 → **ขยับขึ้น 1 ขั้นจาก B(Primary) เป็น A** |

**สรุปเกรด**: C(1) → **A(2-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **D** | Primary=C — modifier ทั้ง 4 ไม่มีกลไกเลย(D ครบ) → 4/4 ต่ำกว่า เกินเกณฑ์มาก แต่ cap 1 ขั้น → ขยับลงจาก C เป็น **D** |
| 2-4 | = lv1 | **Wild Shape ปลดล็อก** — bonus action ที่เปลี่ยนทั้งชุดความสามารถ = Bonus Action Value เหนือกว่า → tally: 1 เหนือ/3 ต่ำ ยังไม่พอกลับขึ้น → คง **D** |
| 5-20 | **C** | **Wild Resurgence ปลดล็อก** — แปลง slot↔Wild-Shape-use สองทาง **ไม่เสีย action เลย** (ตัวอย่าง Resource-to-Action Conversion ที่ดีกว่า Monk's Stunning-Strike ที่ Anchor cite ไว้ด้วยซ้ำ เพราะฟรีไม่เสียแม้แต่ bonus action) → Resource-to-Action Conversion ขยับเป็นเหนือกว่า → tally: **2 เหนือ(Bonus Action, Resource-Conversion)/2 ต่ำ(Reaction, Extra Action) — เสมอกันอีกครั้ง (ครั้งที่ 9!)** ⚠️ net cancellation → กลับ Primary(C) |

**สรุปเกรด**: D(1-4) → **C(5-20)** — ดีกว่า Cleric (D-flat เต็มตัว) เพราะ Wild Shape/Wild Resurgence ให้ modifier จริงที่ Cleric ไม่มี

---

## Utility Axis

**Primary = Magnitude** — Speak with Animals **ติดตัวฟรีถาวรตั้งแต่ lv1** (ไม่กินโควตา prepared spell) ตรง peer's lv1 Detect-Magic-tier — Wild Shape เสริม Solve-Problem นอกคอมแบต (สำรวจ/ว่ายน้ำ/บินตั้งแต่ lv8)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Speak with Animals + สเปลล์ Reveal-Info/Solve-Problem อื่น (Locate Animals or Plants, Commune with Nature ฯลฯ) ตรง peer ทุกจุด = Primary **B** — modifier: Skill-Check Layer=ไม่มีกลไก(D) ตัวเดียว 1/4 ไม่ถึงเกณฑ์ → คง **B** |

**สรุปเกรด**: **B(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — "replacing any of the spells with other Druid spells" ทุก Long Rest = tier **"สูง"** → **Primary = A โดยตรงตั้งแต่ lv1**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | A | Primary=A — Wild Resurgence ยังไม่มา |
| 2-20 | **S** | **Wild Shape+Wild Resurgence ปลดล็อก** — Resource Fungibility=เหนือกว่ามาก(แปลง slot↔Wild-Shape สองทางฟรี — ตัวอย่างที่ชัดกว่า Divine Spark ของ Cleric เพราะเป็นสองพูลทรัพยากรคนละแบบเลย ไม่ใช่พูลเดียว), Cross-Axis Coverage=เหนือกว่า(Wild Shape เดียวแตะ Damage/Survivability/Utility/Action-Economy พร้อมกัน) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก A เป็น S** — **คลาสที่ 3 ต่อจาก Artificer/Cleric ที่แตะ S ใน Versatility ด้วย pattern เดียวกันเป๊ะ** |

**สรุปเกรด**: A(1) → **S(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-6) → A(7-20) |
| Control | **C(1-20) flat** |
| Support | **B(1-20) flat** |
| Survivability | C(1) → **A(2-20)** |
| Action Economy | D(1-4) → C(5-20) |
| Utility | **B(1-20) flat** |
| Versatility | A(1) → **S(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **Wild Shape จัดการสำเร็จโดยไม่ต้องแก้ Anchor** — ใช้หลักการเดียวกับ Bardic Inspiration/Divine Spark (นับเป็น modifier ข้าม 4 axis แทนการดันตัวเลข Primary โดยตรง) พิสูจน์ว่าวิธีนี้ยืดหยุ่นพอรองรับกลไกที่แตกต่างกันมากได้ (ทรัพยากรคู่ขนานล้วนๆ vs การเปลี่ยนร่างทั้งตัว)
2. **Control ต่างจาก Bard/Cleric อย่างชัดเจน** — Druid ไม่มีสเปลล์ Tier4-lockdown เลย (Entangle/Wall of Thorns เพดานแค่ Tier3 Restrained) ทำให้ค้างที่ C ตลอดกาล ไม่ไล่ทันถึง B เหมือน 2 full caster ก่อนหน้า — ยืนยันอีกครั้งว่า "full caster" ไม่รับประกันเกรด Control เท่ากันหมด ขึ้นกับ spell list จริงเสมอ (พบซ้ำเป็นครั้งที่ 2 ต่อจาก Cleric's Sleep-gap)
3. **Action Economy ดีกว่า Cleric แต่ยังไม่ถึง B** — Wild Shape+Wild Resurgence ให้ modifier จริง 2 ตัวที่ Cleric ไม่มีเลย แต่โดน tie-break 2-2 (ครั้งที่ 9!) กันไว้ที่ C ไม่ใช่ B — แสดงว่ามี "ของจริง" มากกว่า Cleric แต่ยังไม่พอข้ามเกณฑ์เต็มที่
4. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 9 แล้ว** (Action Economy lv5-20) — ยืนยันหนักแน่นว่าเป็น pattern ที่เกิดถี่มากพอจะต้องฟอร์มัลไลซ์เข้า Anchor Rubric ในรอบทำงานถัดไปจริงจัง ไม่ควรปล่อยเป็น ad hoc ต่อไปเรื่อยๆ
5. **Versatility แตะ S เป็นคลาสที่ 3 ต่อจาก Artificer/Cleric ด้วย pattern เดียวกันเป๊ะ** — tier "สูง" จาก lv1 + parallel resource (infusion/Divine Spark/Wild Shape) ปลดล็อกเร็ว → ยืนยันว่า combo นี้แข็งแกร่งพอที่จะเป็น "กฎทั่วไป" ไม่ใช่เคสเดี่ยวๆ อีกต่อไป
6. **Survivability's Wild Shape temp HP เป็นตัวอย่าง Mitigation+Death-Prevention คู่ที่ทรงพลังกว่าตัวอย่างเพดานส่วนใหญ่ใน Anchor** — ซ้ำได้ 2-4 ครั้ง/rest (ไม่ใช่ครั้งเดียวแบบ Uncanny Dodge/Relentless Rage) ดันเกรดขึ้น A ตั้งแต่ lv2 ทันที (เร็วกว่า Sacred Knight ที่ใช้ d10 เป็นตัวขับ)
