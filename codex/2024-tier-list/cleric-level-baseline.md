# Cleric — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Cleric Subclass ที่ lv3/6/17 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-cleric.json` entry `source: "XPHB"` (official, ไม่ใช่ homebrew) — ยืนยัน `classFeature` array ครบ 22 รายการ (แยกอยู่ที่ root ของไฟล์ ไม่ใช่ `classFeaturesFull` เหมือนไฟล์ bundled — ไฟล์ official structure ต่างจาก Captain/Channeler)
**สถานะ**: คลาสที่ 8 ของชั้น 1 — **full caster ตัวที่ 2** ต่อจาก Bard, ใช้ spell-list membership จากความรู้ทั่วไป (resolved ตั้งแต่ Artificer) — ตัวเลข/mechanic ของสเปลล์เองยืนยันจาก `spells-xphb.json` เหมือนเดิม

⚠️ **หมายเหตุก่อนอ่านตาราง**:

1. **Divine Order (lv1)** เป็น choice บังคับใน base-class เอง (ไม่ใช่ subclass): **Protector** (martial weapon+heavy armor prof) vs **Thaumaturge** (cantrip เพิ่ม 1 + bonus Int check เท่า Wis mod) — ไม่มีผลกับ Damage track โดยตรง (ไม่ให้ Extra Attack) ปฏิบัติแบบ track-neutral เหมือนที่ทำกับ Fighting Style ของ Captain/Channeler
2. **Blessed Strikes (lv7)** เป็น choice บังคับอีกจุด: **Divine Strike** (weapon rider +1d8→2d8 dmg) vs **Potent Spellcasting** (Wis mod เข้าดาเมจ cantrip + temp HP ที่ lv14) — ทั้งคู่บวก Damage ได้เหมือนกัน (นับรวมได้) แต่ **Support ที่ lv14 ได้เฉพาะสาย Potent Spellcasting เท่านั้น** — ระบุไว้ชัดในตาราง Support ว่าเป็น "ถ้าเลือก" ไม่ใช่ guaranteed baseline
3. **Cleric ไม่มี Sleep ในลิสต์สเปลล์** (ตามความรู้ทั่วไปทั่วไปของเกม — Sleep เป็นสาย Wizard/Bard/Sorcerer) ต่างจาก Bard ที่มี Sleep ตรงกับ peer's lv1 benchmark เป๊ะ — Cleric's Control ที่ lv1 จึงอ่อนกว่า Bard จริง แม้เป็น full caster เหมือนกัน (พิสูจน์ว่า "full caster" ไม่ได้แปลว่าได้คะแนน Control เท่ากันหมด ขึ้นกับ list จริง)

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: WIS/CHA · **Spellcasting**: WIS-based, เต็มรูปแบบตั้งแต่ lv1 (ไม่มี delay เหมือน half-caster), full-swap prepared spells ทุก Long Rest

| Lv | Channel Divinity | Cantrips | Prepared Spells | Max Slot Lv | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|---|
| 1 | 0 | 3 | 4 | 1st | Spellcasting, **Divine Order** (Protector/Thaumaturge) | 11 |
| 2 | 2 | 3 | 5 | 1st | **Channel Divinity** (Divine Spark heal-or-dmg + Turn Undead) | 19 |
| 3 | 2 | 3 | 6 | 2nd | *(Cleric Subclass — ยกเว้น)* | 27 |
| 4 | 2 | 4 | 7 | 2nd | ASI, cantrip เพิ่ม | 35 |
| 5 | 2 | 4 | 9 | 3rd | **Sear Undead** (Turn Undead เพิ่มดาเมจ AoE) | 43 |
| 6 | 3 | 4 | 10 | 3rd | *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 3 | 4 | 11 | 4th | **Blessed Strikes** (Divine Strike/Potent Spellcasting) | 59 |
| 8 | 3 | 4 | 12 | 4th | ASI | 67 |
| 9 | 3 | 4 | 14 | 5th | — | 75 |
| 10 | 3 | 5 | 15 | 5th | **Divine Intervention** (cast สเปลล์≤5th ฟรีไม่เสีย slot, 1/long rest), cantrip เพิ่ม | 83 |
| 11 | 3 | 5 | 16 | 6th | — | 91 |
| 12 | 3 | 5 | 16 | 6th | ASI | 99 |
| 13 | 3 | 5 | 17 | 7th | — | 107 |
| 14 | 3 | 5 | 17 | 7th | **Improved Blessed Strikes** | 115 |
| 15 | 3 | 5 | 18 | 8th | *(Subclass feature — ยกเว้น)* | 123 |
| 16 | 3 | 5 | 18 | 8th | ASI | 131 |
| 17 | 4 | 5 | 19 | 9th | *(Subclass feature — ยกเว้น)* | 139 |
| 18 | 4 | 5 | 20 | 9th | — | 147 |
| 19 | 4 | 5 | 21 | 9th | Epic Boon | 155 |
| 20 | 4 | 5 | 22 | 9th | Greater Divine Intervention (Divine Intervention เลือก Wish ได้) | 163 |

---

## Damage Axis

**Primary = Magnitude** (cantrip track — ไม่มี Extra Attack เลยตลอดชาติ ยืนยันสแกน 22 feature แล้ว)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-6 | B | cantrip (Sacred Flame-tier) ตรง peer's cantrip track เป๊ะ — Divine Spark(lv2+) เป็น burst เสริม (เหนือ peer) แต่ยังไม่พอขยับ Primary |
| 7-20 | **A** | **Blessed Strikes ปลดล็อก** — Divine Strike (+1d8→2d8 weapon rider) หรือ Potent Spellcasting (Wis mod เข้าดาเมจ cantrip) ทั้งคู่ทำให้ Magnitude **ซ้อนเหนือ peer's cantrip-ไม่บวก-mod baseline โดยตรง** (คล้าย pattern ที่ Barbarian's Rage Damage/Sacred Knight's d10 เคยดัน Primary ตรงๆ) → Primary ขยับเป็น **A ทันที** — modifier เสริม (Divine Spark burst=เหนือ, Resistance-type-choice ระหว่าง Necrotic/Radiant=เหนือ) มีจริงแต่ไม่ปัดขึ้นเป็น S ตามวินัย "ไม่ปัดขึ้นตามความรู้สึก" |

**สรุปเกรด**: B(1-6) → **A(7-20)**

---

## Control Axis

**Primary = Severity**. Cleric **ไม่มี Sleep** ในลิสต์ (ต่างจาก Bard) — Command (1st, ~Tier2) คือ general-purpose CC ตัวแรก, **Turn Undead (lv2, Channel Divinity)** ให้ Tier4 (Frightened+Incapacitated) แต่ **จำกัดเฉพาะ undead เท่านั้น** — เจอมิติใหม่ที่ 6 มิติเดิมไม่ครอบคลุม (creature-type restriction) flag ไว้เป็นช่องโหว่นิยามเหมือนที่เจอกับ Captain's LR-bypass

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Command(Tier2, general-purpose) ต่ำกว่า peer's Tier4 Sleep = **C** |
| 2 | = lv1 | Turn Undead ปลดล็อก — Tier4 จริงแต่จำกัด undead เท่านั้น (creature-type restriction ที่ไม่มีมิติรองรับตรงๆ) ถือเป็น modifier เสริม (Frequency=เหนือกว่า จาก short-rest refill) แต่ไม่พอเปลี่ยน Primary(ที่ยังอิง general-purpose Command) |
| 3 | **B** | **Hold Person ปลดล็อก (2nd-tier)** — Tier4 ตรง peer's lv3 benchmark เป๊ะ → Primary ขยับเป็น **B** |
| 4-20 | = lv3 | ไม่มีจุดเปลี่ยนต่อ (spell list ตามทัน peer's benchmark tracks ปกติจากจุดนี้ไป — Banishment/Hold Monster/Power Word Stun-Kill ตามความรู้ทั่วไปน่าจะอยู่ในลิสต์ Cleric ด้วยเช่นกัน) |

**สรุปเกรด**: C(1-2) → **B(3-20)** — อ่อนกว่า Bard ที่ lv1-2 จริง (ไม่มี Sleep) แต่ไล่ทันจาก lv3

---

## Support Axis

**Primary = Magnitude**. Cleric คือคลาสที่สเปลล์ตัวอย่างใน Support Anchor เกือบทั้งหมด (Cure Wounds/Bless/Healing Word/Aid/Death Ward/Mass Cure Wounds/Greater Restoration/Heal/Regenerate/Holy Aura/Mass Heal/Power Word Heal) เป็นสเปลล์ Cleric อยู่แล้วโดยตรง — **Divine Spark (lv2+)** เป็นทรัพยากรคู่ขนานที่ยืดหยุ่นกว่า Bard's Bardic Inspiration (heal-or-damage เลือกได้ทุกครั้ง)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Cure Wounds/Healing Word/Bless ตรง peer's lv1 benchmark เป๊ะ (เป็นสเปลล์ต้นแบบเดียวกัน) = **B** |
| 2-19 | **A** | Divine Spark ปลดล็อก — Frequency เหนือกว่า(รีฟิลด้วย Short Rest แยกจาก slot economy) — แม้ Action Economy ของ Divine Spark เองไม่ฟรีเหมือน Bard's Font of Inspiration (ยังเป็น Magic action เต็ม) แต่ breadth ของสเปลล์ที่ตรง peer benchmark ทุกจุด (Aid lv3, Death Ward lv7, Mass Cure Wounds lv9, Holy Aura lv15) รวมกับ Divine Spark's Frequency ที่เหนือกว่า → **ถึงเกณฑ์ขยับขึ้น 1 ขั้นจาก B เป็น A** |
| 20 | **S** | Power Word Heal (ตามความรู้ทั่วไป) ปลดล็อก ตรงกับ peer's lv17-20 เพดานสูงสุด + Divine Spark ที่โตเป็น 4d8+Wis แล้ว = หลายมิติเหนือ peer พร้อมกัน → **S** |

⚠️ **Potent Spellcasting's temp-HP (lv14)** เป็น Support จริง (proactive, unlimited-use ทุกครั้งคาสต์ cantrip โดนดาเมจ) **แต่เฉพาะถ้าเลือก Blessed Strikes สาย Potent Spellcasting เท่านั้น** — ไม่ได้ฝังเข้าเกรดข้างต้น (baseline ไม่ commit choice ใดโดยเฉพาะ) ถ้าเลือกสายนี้จริง Support จะแรงกว่านี้อีก

**สรุปเกรด**: B(1) → **A(2-19)** → **S(20)**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B — modifier: Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D), Death Prevention=ไม่มีกลไก(D) → 3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลง 1 ขั้นเป็น **C** |
| 2-20 | = lv1 | Divine Spark(lv2+) เล็งตัวเองได้ (self-heal จริง) → Death Prevention ขยับเป็น "เหนือกว่า D-baseline" แต่ tally ยังคง 2/4 ต่ำกว่า(Mitigation, Debuff Resistance) ถึงเกณฑ์เดิม → คงที่ **C** |

**สรุปเกรด**: **C(1-20) flat** — เหมือน Bard เป๊ะ (d8 full-caster support-type pattern ซ้ำ)

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ⚠️ **พบข้อค้นพบใหม่**: Primary=C (carve-out) — ตรวจ 4 modifier: **Bonus Action Value=ไม่มีกลไกเลย(D)** (Divine Spark/Divine Intervention/Turn Undead ล้วนเป็น Magic action ไม่ใช่ bonus action), **Reaction Value=ไม่มีกลไก(D)**, **Extra Action Access=ไม่มีกลไก(D)**, **Resource-to-Action Conversion=ไม่มีกลไก(D)** (Divine Intervention ประหยัด slot แต่ไม่ได้บีบ 2 action ในเทิร์นเดียว ไม่ตรงนิยาม) → **4/4 ต่ำกว่า ถึงเกณฑ์ (เกินเกณฑ์มากด้วย) → ขยับลง 1 ขั้นจาก C เป็น D** — **เกรดปลายทางเท่ากับที่ floor rule จะให้ถ้า Primary เป็น D ตรงๆ ทั้งที่ Primary จริงคือ C (carve-out ทำงานถูกต้อง)** — เป็นครั้งแรกที่เจอ modifier-tally ธรรมดา (ไม่ใช่ floor rule) ให้ผลลัพธ์เดียวกับ floor-D โดยไม่ได้ตั้งใจ — flag เป็นข้อค้นพบเชิงระบบใหม่ ไม่ใช่บั๊ก (กลไกทำงานตามกฎที่เขียนไว้ทุกอย่างถูกต้อง เพียงแค่ Cleric บังเอิญไม่มีฟีเจอร์ไหนแตะ 4 มิตินี้เลยจริงๆ ตลอด 20 เลเวล) |

**สรุปเกรด**: **D(1-20) flat** — คลาสแรกที่ carve-out(C) ถูก "แซง" กลับไป D ผ่าน modifier tally ธรรมดา

---

## Utility Axis

**Primary = Magnitude** — สเปลล์ Reveal-Info/Solve-Problem (Detect Magic/Identify/Divination/Commune ตามความรู้ทั่วไป) ตรง peer's spell-based track เกือบทุกจุด **แต่ไม่มี Skill-Check Layer เลย** (ไม่มี Expertise/JOAT/Reliable Talent ที่ไหนในเบสคลาส)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Magnitude/Breadth/Reliability/Access-Cost (ritual tag) ตรง peer ทุกจุด — modifier เดียวที่อ่อนกว่าคือ Skill-Check Layer=ไม่มีกลไก(D) → **1/4 ต่ำกว่าเท่านั้น ไม่ถึงเกณฑ์ ≥2/4** → คงที่ Primary(B) ตลอด 20 เลเวล |

**สรุปเกรด**: **B(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — ยืนยันจาก text จริง "replacing any of the spells there with other Cleric spells" ทุก Long Rest = tier **"สูง"** ตรงตัว (เทียบเท่า Wizard/Druid/Artificer) → **Primary = A โดยตรงตั้งแต่ lv1**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | A | Primary=A (tier สูง) — ยังไม่มี Divine Spark เสริม modifier ยังไม่ถึงเกณฑ์ขยับ |
| 2-20 | **S** | Divine Spark ปลดล็อก — Resource Fungibility=เหนือกว่า(heal-or-damage จาก pool เดียว), Cross-Axis Coverage=เหนือกว่า(แตะ Damage/Control/Support/Utility พร้อมกันตั้งแต่ lv2-3) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก A เป็น S** — **คลาสที่ 2 ต่อจาก Artificer ที่แตะ S ใน Versatility** (รูปแบบเดียวกันเป๊ะ: tier สูงจาก lv1 + parallel resource ปลดล็อกเร็ว) |

**สรุปเกรด**: A(1) → **S(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-6) → A(7-20) |
| Control | C(1-2) → B(3-20) |
| Support | B(1) → A(2-19) → S(20) |
| Survivability | **C(1-20) flat** |
| Action Economy | **D(1-20) flat** |
| Utility | **B(1-20) flat** |
| Versatility | A(1) → **S(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **⚠️ ข้อค้นพบเชิงระบบใหม่ — modifier tally สามารถ "แซง" carve-out กลับไป D ได้โดยไม่ต้องพึ่ง floor rule**: Action Economy's carve-out (C สำหรับคลาสไม่มี Extra Attack) มีไว้กันไม่ให้ floor rule ล็อก D อัตโนมัติ — แต่ Cleric ไม่มีฟีเจอร์แตะ Bonus-Action/Reaction/Extra-Action/Resource-Conversion เลยสักมิติตลอด 20 เลเวล ทำให้ modifier tally (4/4 ต่ำกว่า) ดึงกลับไป D เหมือนเดิมอยู่ดี ผ่านกลไกคนละทางกับ floor rule — Cleric คือคลาสแรกที่เจอเคสนี้ (Bard/Alchemist/Artificer ทุกตัวมีอย่างน้อย 1 ฟีเจอร์ขยับสักมิติจนพ้น D)
2. **Cleric ≠ Bard ใน Control ทั้งที่เป็น full caster เหมือนกัน** — Bard มี Sleep ตรง peer's Tier4 benchmark ตั้งแต่ lv1 แต่ Cleric ไม่มี Sleep ในลิสต์เลย (Command เท่านั้น, Tier2) ทำให้ Control อ่อนกว่า Bard จริงที่ lv1-2 ก่อนไล่ทันที่ lv3 (Hold Person) — พิสูจน์ว่า "full caster" ไม่ใช่ passport อัตโนมัติสู่เกรดเท่ากันหมด ต้องเช็ค spell list จริงเสมอ
3. **Turn Undead (lv2) เจอมิติที่ 6 มิติเดิมไม่ครอบคลุม — "creature-type restriction"** — Tier4 CC ที่ทรงพลังจริงแต่จำกัดเฉพาะ undead เท่านั้น ไม่มีมิติไหนใน Control's 6 มิติที่จับ "ผลแรงแต่จำกัดประเภทศัตรู" ได้ตรงๆ (คล้ายกับ Captain's LR-bypass gap ที่เจอมาก่อน) — flag ไว้เป็นช่องโหว่นิยามที่สองในระบบนี้
4. **Damage/Versatility ทั้งคู่ยกระดับผ่าน Primary-elevation ("ซ้อนดาเมจ/tier สูงสุด") เหมือนกัน** — Blessed Strikes (lv7) ดัน Damage Primary ตรงๆ (คล้าย Barbarian's Rage Damage/Sacred Knight's d10), Loadout Flexibility tier "สูง" ดัน Versatility Primary ตรงๆ ตั้งแต่ lv1 (คล้าย Artificer) — Cleric เป็นคลาสแรกที่มีทั้ง 2 pattern พร้อมกันในไฟล์เดียว
5. **Versatility แตะ S เป็นคลาสที่ 2 ต่อจาก Artificer ด้วยรูปแบบเดียวกันเป๊ะ** — tier "สูง" จาก lv1 + parallel resource (Divine Spark/infusion) ปลดล็อกเร็วดัน cross-axis coverage — ยืนยันว่า "tier สูง + parallel resource" เป็น combo ที่นำไปสู่ S ได้จริงอย่างสม่ำเสมอ ไม่ใช่เคสเดียว
6. **Support แตะ S ที่ lv20 เหมือน Bard เป๊ะ แต่เส้นทางการขยับขึ้น A ต่างกัน** — Bard ต้องรอ Font of Inspiration(lv5)'s ฟรี-action-cost ก่อนถึงเกณฑ์ ส่วน Cleric ขยับได้เร็วกว่าที่ lv2 ทันทีผ่าน Divine Spark's Frequency-advantage ผสานกับ breadth ของสเปลล์ที่ตรง peer benchmark หนาแน่นกว่า — เส้นทางคนละแบบ แต่ปลายทางเดียวกัน
