# Investigator — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Investigator Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Investigator", source: "ValdaSpire24"` — homebrew จาก *Valda's Spire of Secrets* — ยืนยัน `classFeaturesFull` ครบ 24 รายการ + `classSpells` array (65 สเปลล์ผูกกับคลาสตรงๆ ไม่มีปัญหา spell-list-gap)
**สถานะ**: คลาสที่ 14 ของชั้น 1 — **นักสืบ/ผู้เชี่ยวชาญเรื่องเหนือธรรมชาติ** ผสม Rogue-style (Expertise+Finisher rider เหมือน Sneak Attack) กับ **ritual-only spellcasting ล้วน** (ไม่มี spell slot เลยตลอดชาติ — cast ได้แค่แบบ ritual 10 นาที เว้นแต่ใช้ Rushed Incantation) — **ไม่มี Extra Attack เลย** (เหมือน Rogue)

⚠️ **หมายเหตุสำคัญ 2 ข้อ**:

1. **Damage ใช้ track "Rogue-style" ของ Anchor** (weapon+rider dice, ไม่บวก mod เข้า rider) — Finisher เป็น bonus rider แบบเดียวกับ Sneak Attack แต่โตช้ากว่ามาก (1d8→2d8→3d8 แค่ 3 ระดับ vs Rogue's 1d6 ทุก 2 เลเวลจนถึง 10d6) และ**ต้องเป้าเป็น Bloodied (HP≤ครึ่ง) ก่อน** จนกว่าจะถึง Improved Finisher (lv11) ที่เปิดให้ใช้กับเป้าปกติได้ (แต่ดาเมจต่ำกว่า)
2. **⚠️ ค้นพบ tier ใหม่ต่ำกว่า "ต่ำ" ในมิติ Loadout Flexibility** — Grimoire ของ Investigator **เพิ่มสเปลล์ได้อย่างเดียว ไม่มีกลไก "สลับ" เลยแม้แต่จุดเดียว** (ต่างจาก Sorcerer/Bard/Warlock's "ต่ำ" ที่อย่างน้อยสลับได้ 1 ตัวตอนเลเวลอัพ) — ตรวจข้อความ "Whenever you gain an Investigator level after 1, you can add two Investigator spells" ยืนยันชัดว่าเป็นการ**เพิ่มถาวร ไม่ใช่แทนที่**เลย — ถือเป็น sub-tier ใหม่ที่อ่อนกว่า "ต่ำ" (ให้ Primary=C แทน D เพราะยังมีกลไกเลือกสเปลล์ที่เกี่ยวข้องอยู่บ้าง แค่ไม่มีการสลับ) — flag ไว้เป็นข้อค้นพบเชิงระเบียบวิธีใหม่ ยังไม่ได้แก้ Anchor Rubric

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: DEX/INT · **Spellcasting**: INT-based, ritual-only ล้วน (ไม่มี spell slot)

| Lv | Ritual Level cap | Rushed Incantation uses | Finisher die | Trinkets uses | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|---|
| 1 | 1st | 0 | — | 0 | **Ritualist** (Grimoire 4 สเปลล์เริ่มต้น), **Weapon Mastery** | 11 |
| 2 | 1st | 3 | 1d8 | 0 | **Expertise** (×2 skill), **Finisher**, **Rushed Incantation** (cast ritual เป็น bonus action) | 19 |
| 3 | 2nd | 4 | 1d8 | 2 | *(Investigator Subclass — ยกเว้น)*, **Trinkets** (2 ใช้/rest) | 27 |
| 4 | 2nd | 4 | 1d8 | 2 | ASI | 35 |
| 5 | 3rd | 5 | 1d8 | 3 | **Exploit Weakness** (Vulnerability/strip Resistance ครั้งเดียว/เทิร์น) | 43 |
| 6 | 3rd | 5 | 1d8 | 3 | *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 4th | 6 | 1d8 | 3 | **Holy Trinkets** (Amulet of Warding/Restorative Ankh/Rune of Banishment) | 59 |
| 8 | 4th | 6 | 1d8 | 3 | ASI | 67 |
| 9 | 5th | 7 | 1d8 | 4 | Expertise รอบ 2 (×2 skill เพิ่ม) | 75 |
| 10 | 5th | 7 | 1d8 | 4 | *(Subclass feature — ยกเว้น)* | 83 |
| 11 | 6th | 7 | 2d8 | 4 | **Improved Finisher** (ใช้กับเป้าไม่ Bloodied ได้, 1d8) | 91 |
| 12 | 6th | 8 | 2d8 | 4 | ASI | 99 |
| 13 | 6th | 8 | 2d8 | 5 | **Enigma Arcane** (cast สเปลล์ระดับ7 ฟรี 1/long rest) | 107 |
| 14 | 6th | 8 | 2d8 | 5 | *(Subclass feature — ยกเว้น)* | 115 |
| 15 | 6th | 9 | 2d8 | 5 | Enigma Arcane (ระดับ8 เพิ่ม) | 123 |
| 16 | 6th | 9 | 2d8 | 5 | ASI | 131 |
| 17 | 6th | 9 | 3d8 | 6 | Enigma Arcane (ระดับ9 เพิ่ม), Improved Finisher เพิ่มเป็น 2d8 | 139 |
| 18 | 6th | 10 | 3d8 | 6 | Supernatural Resolve (adv save vs magic) | 147 |
| 19 | 6th | 10 | 3d8 | 6 | Epic Boon | 155 |
| 20 | 6th | 10 | 3d8 | 6 | **Spellbinder** (5 สเปลล์ cast ฟรีไม่เสีย Rushed Incantation) | 163 |

---

## Damage Axis

**Primary = Magnitude** (weapon+Finisher rider, ไม่มี Extra Attack เลย — track เดียวกับ Rogue's Sneak Attack)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | C | 1 attack(~9)+Finisher rider(1d8~4.5, **ต้อง Bloodied**) = ~13.5 conditional — ต่ำกว่า peer's 2-attack(~17) มาก แม้จะมีกลไกจริง = **C** |
| 11-20 | **B** | **Improved Finisher ปลดล็อก** — ใช้ rider ได้กับเป้าไม่ Bloodied ด้วย (ตัดเงื่อนไข gate ออก แม้ดาเมจต่ำกว่า) + Finisher die โตเป็น 2d8→3d8 → ตัวเลขรวมไล่ทัน peer's 2-attack benchmark ได้ใกล้เคียง (1 attack+3d8≈22.5 เทียบ peer's~17) = **B (ตรง/เหนือ peer เล็กน้อย)** — modifier Burst=เหนือกว่า(Exploit Weakness's Vulnerability rider เพิ่มดาเมจเป็น 2 เท่าได้ครั้ง/เทิร์น) แต่ไม่พอปัดขึ้น A |

**สรุปเกรด**: C(1-10) → **B(11-20)**

---

## Control Axis

**Primary = Severity**. Spell list ของ Investigator (65 สเปลล์) เน้น info/protection ล้วน **ไม่มี Sleep/Hold Person/Hypnotic Pattern เลยแม้แต่ตัวเดียว** — กลไก Control เดียวคือ **Rune of Banishment** (Holy Trinkets, lv7+)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-6 | D | ไม่มีกลไก Control เลย = **D** |
| 7-20 | **C** | Rune of Banishment: CHA save พลาด → Incapacitated+Speed0 บน Ethereal (Tier4 จริง แต่กลับมาอัตโนมัติแค่ 1 รอบ สั้นกว่า Banishment ตัวจริงมาก + แชร์ pool กับ Amulet/Ankh 3 ตัวเลือก) = มีกลไกจริงแต่อ่อนกว่า peer's sustained Tier4 = **C** |

**สรุปเกรด**: D(1-6) → **C(7-20)**

---

## Support Axis

**Primary = Magnitude**. Amulet of Warding (AC+save bonus ally) และ Restorative Ankh (heal ally) จาก Holy Trinkets (lv7+) เป็นกลไกเดียว — แชร์ pool เดียวกับ Rune of Banishment

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-6 | D | ไม่มีกลไก Support เลย = **D** |
| 7-20 | **C** | Restorative Ankh(heal=level+Int mod)/Amulet of Warding(AC+save=Int mod) ต่ำกว่า peer's benchmark ณ เลเวลเดียวกันมาก + แชร์ pool กับ Control's Rune of Banishment (จำกัดจริงจัง) = มีกลไกจริงแต่อ่อน = **C** |

**สรุปเกรด**: D(1-6) → **C(7-20)**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-17 | **C** | Primary=B — modifier: Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง(จนถึง lv18), Debuff Resistance=ไม่มีกลไก(D), Death Prevention=Restorative Ankh self-target ได้จาก lv7(เหนือกว่า) → tally: 1 เหนือ/2 ต่ำ → **2/4 ต่ำ ถึงเกณฑ์ → ขยับลง 1 ขั้นจาก B เป็น C** |
| 18-20 | **B** | **Supernatural Resolve ปลดล็อก** (adv save vs magic) — Save Reliability ขยับเป็นเหนือกว่า → tally: **2 เหนือ(Death Prevention, Save Reliability)/2 ต่ำ(Mitigation, Debuff Resistance) — เสมอกันอีกครั้ง (ครั้งที่ 12!)** ⚠️ net cancellation → กลับ Primary(B) |

**สรุปเกรด**: C(1-17) → **B(18-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **D** | modifier ทั้ง 4 ไม่มีกลไก(D ครบ, Rushed Incantation ยังไม่มา) → 4/4 ต่ำกว่า → ขยับลงจาก C เป็น **D** |
| 2-20 | **C** | **Rushed Incantation ปลดล็อก** (แปลง ritual-cast 10 นาที → bonus action ทันที) — Bonus Action Value **และ** Resource-to-Action Conversion ขยับเป็นเหนือกว่าพร้อมกัน → tally: **2 เหนือ/2 ต่ำ(Reaction, Extra Action) — เสมอกันอีกครั้ง (ครั้งที่ 13!)** ⚠️ net cancellation → กลับ Primary(C) |

**สรุปเกรด**: D(1) → **C(2-20)**

---

## Utility Axis

**Primary = Magnitude** — spell list ทั้ง 65 ตัวเน้น Reveal-Info/Solve-Problem แทบทั้งหมด (Detect Magic/Legend Lore/Commune/Divination/Speak with Dead/Zone of Truth/Locate Creature/Sending ฯลฯ) **cast ได้แบบ ritual ไม่จำกัดครั้ง/วันทั้งลิสต์** — Expertise ×2 ตรงกับ milestone ที่ Anchor cite ชื่อ Rogue ไว้เป๊ะ (lv2, lv9)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary ตรง peer (Detect Magic-tier) — modifier: Access Cost=เหนือกว่า(ritual ทั้งลิสต์) แต่ 1/4 ไม่พอขยับ (Expertise ยังไม่มา) |
| 2-20 | **A** | **Expertise ปลดล็อก (lv2, lv9 — ตรง milestone ที่ Anchor cite Rogue ไว้เป๊ะทั้ง 2 จุด)** — Skill-Check Layer ขยับเป็นเหนือกว่าเพิ่ม → tally: **2/4 เหนือกว่า(Access Cost, Skill-Check Layer) ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)** — axis ที่แข็งแกร่งที่สุดของ Investigator ตรงกับธีม "นักสืบ"

---

## Versatility Axis

**Primary = Loadout Flexibility** — **ค้นพบ sub-tier ใหม่ต่ำกว่า "ต่ำ"**: Grimoire เพิ่มสเปลล์ได้อย่างเดียว ไม่มีกลไกสลับเลย → **Primary = C** (มีกลไกเลือกสเปลล์จริงแต่อ่อนกว่า "ต่ำ" tier เพราะไม่มีการสลับเลยแม้แต่จุดเดียว)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **D** | Primary=C — modifier: Resource Fungibility=ไม่มีกลไก(D, Rushed Incantation ยังไม่มา), Cross-Axis Coverage=ตรง(แค่ Utility+Damage), Target-Type=ตรง, Adaptability=ไม่มีกลไก(D) → 2/4 ต่ำ ถึงเกณฑ์ → ขยับลงจาก C เป็น **D** |
| 2-20 | **B** | **Rushed Incantation ปลดล็อก** — Resource Fungibility เหนือกว่า(แปลง ritual→bonus-action ยืดหยุ่นทุกสเปลล์ใน grimoire), Adaptability Under Pressure เหนือกว่า(cast สเปลล์ไหนก็ได้แบบ reactive กลางคอมแบต) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C(Primary) เป็น B** |

**สรุปเกรด**: D(1) → **B(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | C(1-10) → **B(11-20)** |
| Control | D(1-6) → C(7-20) |
| Support | D(1-6) → C(7-20) |
| Survivability | C(1-17) → B(18-20) |
| Action Economy | D(1) → C(2-20) |
| Utility | B(1) → **A(2-20)** |
| Versatility | D(1) → B(2-20) |

---

## ข้อค้นพบสำคัญ

1. **⚠️ ค้นพบ tier ใหม่ต่ำกว่า "ต่ำ" ในมิติ Loadout Flexibility** — Grimoire's "เพิ่มได้อย่างเดียว ไม่สลับเลย" เป็นกลไกที่อ่อนกว่าแม้แต่ Sorcerer/Bard/Warlock's "ต่ำ" tier (ที่ยังสลับได้ 1 ตัว/เลเวลอัพ) — ตัดสินใจให้ Primary=C (ไม่ใช่ D floor เพราะยังมีกลไกเลือกสเปลล์อยู่บ้าง) — flag เป็นข้อค้นพบเชิงระเบียบวิธีใหม่ที่ยังไม่ได้แก้ Anchor Rubric ให้เป็นทางการ ต้องเช็คคลาสอื่นที่มีระบบ "grimoire/spellbook แบบเพิ่มอย่างเดียว" ในอนาคตว่าเจอ pattern เดียวกันไหม
2. **Damage ใช้ track "Rogue-style" ของ Anchor ได้พอดี** — เป็นคลาสที่ 2 ต่อจาก (ที่ยังไม่ทำ) Rogue เองที่ track นี้ใช้ได้ตรงๆ — Finisher โตช้ากว่า Sneak Attack มาก (3 ระดับ vs ~10 ระดับ) ทำให้ Investigator ไม่มีวันแซง peer ได้แบบที่ Rogue ทำได้ตาม Anchor's finding #2 (Rogue แซง Magnitude ทุกคนกลางเกม) — Investigator ทำได้แค่ไล่ทันแบบพอดีๆ ที่ lv11 ขึ้นไป
3. **Utility เป็น axis ที่แข็งแกร่งที่สุด ตรงกับธีม "นักสืบ" อย่างสมบูรณ์** — Expertise ×2 ตรง milestone ที่ Anchor cite ชื่อ Rogue ไว้เป๊ะทั้ง 2 จุด (lv2, lv9) บวกกับ spell list ทั้งหมดเป็น ritual (unlimited/day) — คลาสที่ 2 ต่อจาก Bard ที่ Utility แตะ A แต่มาจากเส้นทางไม่มีสเปลล์-slot เลย
4. **⚠️ Tie-break 2-2 เกิดซ้ำถึง 2 ครั้งในไฟล์เดียว** (Survivability lv18-20, Action Economy lv2-20) รวมเป็นครั้งที่ 12-13 ของทั้งระบบ — จำนวนสะสมตอนนี้สูงมากจนควรฟอร์มัลไลซ์กฎเข้า Anchor Rubric ในรอบทำงานถัดไปอย่างจริงจังที่สุดเท่าที่เคยมีมา
5. **Control/Support ทั้งคู่แชร์ resource pool เดียวกัน (Holy Trinkets, lv7)** — เป็นตัวอย่างแรกที่ Control และ Support มาจากฟีเจอร์เดียวกันเป๊ะ (Rune of Banishment=Control, Amulet/Ankh=Support) แข่งกันใช้ pool 3-6 ครั้ง/rest เดียวกัน — สะท้อนการออกแบบ "เลือกอย่างใดอย่างหนึ่งต่อครั้ง" ที่ทำให้ทั้ง 2 axis ไม่มีวันแรงพร้อมกันเต็มที่ในทางปฏิบัติ แม้ baseline จะให้เครดิตทั้งคู่แยกกัน
