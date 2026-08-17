# Sorcerer — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Sorcerer Subclass ที่ lv3/6/14/18 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-sorcerer.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 19 รายการ — Metamagic options (Quickened/Twinned/Empowered/Heightened Spell ฯลฯ) ยืนยันจาก `optionalfeature.json`
**สถานะ**: คลาสที่ 23 ของชั้น 1 — **full caster ตัวที่ 5** — **Sorcerer คือคลาสที่ Anchor Rubric เองอ้างชื่อ Quickened Spell(Action Economy)/tier "ต่ำ"(Versatility, ร่วมกับ Bard/Warlock) ไว้ตรงๆ** — d6 HD ตัวที่ 2 ในระบบนี้ (ต่อจาก Necromancer)

⚠️ **หมายเหตุ**: **Survivability=D-flat ตลอด 20 เลเวลไม่มีจุดกู้เลยแม้แต่ lv20** (ต่างจาก Necromancer ที่มี Lichdom กู้ที่ lv20) — ทำให้ Sorcerer เป็น **Survivability ที่อ่อนที่สุดในระบบนี้จนถึงตอนนี้**

---

## สรุป Chassis

**HD**: d6 (ต่ำกว่า peer d8 — Primary Survivability เริ่มที่ C) · **Save prof**: CON/CHA · **Spellcasting**: CHA-based เต็มรูปแบบ, สลับ 1 สเปลล์/เลเวลอัพ (tier "ต่ำ")

| Lv | Cantrips | Prepared Spells | Sorcery Points | Milestone อื่น | EHP (d6+CON+3) |
|---|---|---|---|---|---|
| 1 | 4 | 2 | 0 | **Innate Sorcery** (bonus action: +1 DC+adv สเปลล์อาตัก 1 นาที, 2 ครั้ง/rest), Spellcasting | 9 |
| 2 | 4 | 4 | 2 | **Font of Magic** (slot↔Sorcery Point สองทาง), **Metamagic** (2 ตัวเลือกแรก) | 16 |
| 3 | 4 | 6 | 3 | *(Sorcerer Subclass — ยกเว้น)* | 23 |
| 4 | 5 | 7 | 4 | ASI, cantrip เพิ่ม | 30 |
| 5 | 5 | 9 | 5 | Sorcerous Restoration (คืน SP ครึ่งเลเวล/short-rest) | 37 |
| 6 | 5 | 10 | 6 | *(Subclass feature — ยกเว้น)* | 44 |
| 7 | 5 | 11 | 7 | Sorcery Incarnate (จ่าย SP เปิด Innate Sorcery ซ้ำ + ใช้ Metamagic 2 ตัว/สเปลล์) | 51 |
| 8 | 5 | 12 | 8 | ASI | 58 |
| 9 | 5 | 14 | 9 | — | 65 |
| 10 | 6 | 15 | 10 | Metamagic รอบ 2 (+2 ตัวเลือก), cantrip เพิ่ม | 72 |
| 11 | 6 | 16 | 11 | — | 79 |
| 12 | 6 | 16 | 12 | ASI | 86 |
| 13 | 6 | 17 | 13 | — | 93 |
| 14 | 6 | 17 | 14 | *(Subclass feature — ยกเว้น)* | 100 |
| 15 | 6 | 18 | 15 | — | 107 |
| 16 | 6 | 18 | 16 | ASI | 114 |
| 17 | 6 | 19 | 17 | Metamagic รอบ 3 (+2 ตัวเลือก) | 121 |
| 18 | 6 | 20 | 18 | *(Subclass feature — ยกเว้น)* | 128 |
| 19 | 6 | 21 | 19 | Epic Boon | 135 |
| 20 | 6 | 22 | 20 | **Arcane Apotheosis** (Metamagic ฟรีไม่เสีย SP ตอน Innate Sorcery เปิดอยู่) | 142 |

---

## Damage Axis

**Primary = Magnitude** (cantrip track — ไม่มี Extra Attack เลยตลอดชาติ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | cantrip ตรง peer — Innate Sorcery(adv สเปลล์อาตัก)เป็น burst จริงแต่ 1/4 ไม่พอขยับ |
| 2-20 | **A** | **Metamagic ปลดล็อก** — Empowered Spell(reroll ดาเมจต่ำ)+Twinned Spell(ยิง 2 เป้าพร้อมกัน) ให้ Burst **และ** Breadth เหนือกว่า peer พร้อมกัน → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)**

---

## Control Axis

**Primary = Severity** — สมมติฐาน spell list ตรง peer (Sleep/Hold Person-tier มาตรฐาน arcane list) + Heightened Spell(Metamagic, disadvantage save แรก) เป็นตัวเสริม

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | สมมติฐานตรง peer's Tier4 benchmark ตามความรู้ทั่วไป — Heightened Spell เป็น modifier เสริม 1 มิติ ไม่พอปัดขึ้น A |

**สรุปเกรด**: **B(1-20) flat**

---

## Support Axis

**Primary = Magnitude** — spell list Sorcerer ธีมเน้น damage/utility มากกว่า healing (Burning Hands/Detect Magic แนะนำเริ่มต้น ไม่ใช่สาย heal) — ประเมินอนุรักษ์นิยมเหมือน Necromancer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | ไม่มีทรัพยากรคู่ขนานหรือ base-feature เล็ง ally เลย สมมติฐาน spell-list-based Support บางเบากว่า Bard/Cleric/Druid ตามธีมคลาส = **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d6 ต่ำกว่า peer d8) = **C โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary=C — modifier: Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D), Death Prevention=ไม่มีกลไก(D — Sorcerous Restoration คืน resource pool ไม่ใช่ HP) → 3/4 ต่ำกว่า ถึงเกณฑ์ → **ขยับลงจาก C(ต่ำกว่า peer อยู่แล้ว) เป็น D ตลอด 20 เลเวล ไม่มีจุดกู้เลยแม้แต่ lv20** |

**สรุปเกรด**: **D(1-20) flat** — **Survivability อ่อนที่สุดในระบบนี้จนถึงตอนนี้** (แม้แต่ Necromancer ยังกู้กลับที่ lv20 ผ่าน Lichdom, Sorcerer ไม่มีอะไรกู้เลย)

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **D** | modifier: Bonus Action=เหนือกว่า(Innate Sorcery), Reaction/Extra Action/Resource-Conversion=ยังไม่มี(D) → 3/4 ต่ำ ถึงเกณฑ์ → ขยับลงจาก C เป็น **D** |
| 2-20 | **C** | **Font of Magic+Quickened Spell ปลดล็อก (ตัวอย่างที่ Anchor เองอ้างชื่อ "Quickened Spell" ตรงๆ — cast สเปลล์ action→bonus action เปิดทาง cast สเปลล์ที่ 2 ในเทิร์นเดียว)** — Resource-to-Action Conversion เหนือกว่า → tally: **2 เหนือ(Bonus Action, Resource-Conversion)/2 ต่ำ(Reaction, Extra Action) — เสมอกัน (ครั้งที่ 20!)** ⚠️ net cancellation → กลับ Primary(C) |

**สรุปเกรด**: D(1) → **C(2-20)**

---

## Utility Axis

**Primary = Magnitude** — Detect Magic แนะนำเริ่มต้นจริง + สมมติฐาน generic caster track ตรง peer — ไม่มี Skill-Check Layer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | สมมติฐาน generic full-caster track ตรง peer — Skill-Check Layer=ไม่มีกลไก(D) 1/4 ไม่พอขยับ → คง **B** |

**สรุปเกรด**: **B(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — ยืนยันจาก text จริง "replace one spell...whenever you gain a Sorcerer level" = tier **"ต่ำ"** (Anchor เองอ้างชื่อ "Sorcerer, Bard, Warlock" ไว้ตรงๆ) → **Primary = C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Primary=C — Font of Magic/Metamagic ยังไม่มา |
| 2-20 | **B** | **Font of Magic+Metamagic ปลดล็อก** — Resource Fungibility เหนือกว่ามาก(SP แปลงเป็น slot สองทาง+ซื้อ Metamagic 10 แบบ), Cross-Axis Coverage เหนือกว่า(Damage/Control/Action-Economy/Utility พร้อมกัน) → **แม้จะมี 4/4 modifier เหนือกว่าตามทฤษฎี ก็ยัง cap ที่ +1 ขั้นตามกฎ → ขยับขึ้นจาก C(Primary) เป็น B เท่านั้น** |

**สรุปเกรด**: C(1) → **B(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1) → **A(2-20)** |
| Control | **B(1-20) flat** |
| Support | **C(1-20) flat** |
| Survivability | **D(1-20) flat** ⚠️ |
| Action Economy | D(1) → C(2-20) |
| Utility | **B(1-20) flat** |
| Versatility | C(1) → **B(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **⚠️ Survivability อ่อนที่สุดในระบบนี้จนถึงตอนนี้ — D-flat ตลอด 20 เลเวลไม่มีจุดกู้เลย** — ต่างจาก Necromancer (d6 เหมือนกัน) ที่ยังมี Lichdom กู้กลับที่ lv20, Sorcerer ไม่มีฟีเจอร์ไหนแตะ Mitigation/Debuff-Resistance/Death-Prevention เลยตลอดทั้งอาชีพ — "glass cannon" ที่บริสุทธิ์ที่สุดในแง่ Survivability เท่าที่เจอในระบบนี้
2. **ยืนยัน Anchor's ชื่อ Quickened Spell/tier "ต่ำ" ตรงกันเป๊ะ** — Action Economy's modifier ปลดล็อกผ่าน Font of Magic+Quickened Spell ตรงกับที่ Anchor เขียนไว้, Versatility Primary=C ตรง tier "ต่ำ" ที่ Anchor อ้างชื่อ Sorcerer ไว้
3. **Versatility ถูก cap ที่ B ทั้งที่ modifier ควรจะ 4/4 เหนือกว่าตามทฤษฎี** — ตัวอย่างชัดเจนที่สุดเท่าที่เจอมาของ max-1-step-cap (Sorcery Points fungible ที่สุดในเกม แต่ยังโดนกฎกันไว้ไม่ให้ทะลุ B)
4. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 20** (Action Economy lv2-20) — ทำลายสถิติไม่มี tie 4 คลาสติดต่อกัน (Gunslinger/Paladin/Ranger/Rogue) — สะสมครบ 20 ครั้งพอดี ยิ่งตอกย้ำว่าควรฟอร์มัลไลซ์กฎเข้า Anchor Rubric อย่างจริงจังที่สุด ณ จุดนี้
