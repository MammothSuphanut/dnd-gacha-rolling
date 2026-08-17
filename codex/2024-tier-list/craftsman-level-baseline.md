# Craftsman — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Craftsman Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Craftsman", source: "ValdaSpire24"` — homebrew จาก *Valda's Spire of Secrets* — ยืนยัน `classFeaturesFull` ครบ 25 รายการ + `classSpells: ["Identify","Locate Object"]` (สเปลล์ innate 2 ตัวเท่านั้น ไม่ใช่ full spellcasting progression)
**สถานะ**: คลาสที่ 9 ของชั้น 1 — **มาร์เชียลล้วนที่มี Extra Attack + ระบบ "ตีเหล็กเอง" (Masterwork Bonus ซ้อนบนอาวุธ+เกราะ) แทนการพึ่ง magic item** — ไม่มีสเปลล์คาสติ้งจริง (2 สเปลล์ innate cast ฟรีที่ lv9/15 เท่านั้น ไม่มี slot/prepared list)

⚠️ **หมายเหตุก่อนอ่านตาราง**: Masterwork Bonus (+1→+4) เป็น **self-applied magic-weapon-bonus ที่ซ้อนบน weapon+3 baseline โดยตรงตั้งแต่ lv1** — ต่างจาก Barbarian's Rage Damage/Cleric's Blessed Strikes ที่มาเป็น milestone กลางเกม Craftsman ได้ bonus นี้ตั้งแต่ **lv1 เลย** ทำให้ Damage Primary เริ่มเหนือ peer เร็วกว่าทุกคลาสก่อนหน้า

---

## สรุป Chassis

**HD**: d10 (เหนือ peer d8 — Primary Survivability เริ่มที่ A ตามธรรมเนียม Sacred Knight) · **Save prof**: CON/INT · **ไม่มี spell slot/prepared list จริง**

| Lv | Masterwork Bonus | Weapon Mastery (kinds) | Milestone | EHP (d10+CON+3) |
|---|---|---|---|---|
| 1 | +1 | 2 | Expert Crafting (crafting tools+downtime craft), **Weapon Mastery**, **Masterwork Weapon** | 13 |
| 2 | +1 | 2 | Fighting Style, **Masterwork Armor** | 22 |
| 3 | +1 | 2 | *(Craftsman Subclass — ยกเว้น)* | 31 |
| 4 | +1 | 3 | ASI | 40 |
| 5 | +2 | 3 | **Extra Attack**, Folded Steel (เปลี่ยนชนิดดาเมจอาวุธ) | 49 |
| 6 | +2 | 3 | Customize Armor, *(Subclass feature — ยกเว้น)* | 58 |
| 7 | +2 | 3 | Fortify Arsenal (Hone Weapons=advantage / Reinforce Armor=resist B/P/S) | 67 |
| 8 | +2 | 3 | ASI | 76 |
| 9 | +2 | 3 | **Eye for Quality** (cast Identify+Locate Object ฟรี) | 85 |
| 10 | +2 | 4 | *(Subclass feature — ยกเว้น)* | 94 |
| 11 | +3 | 4 | **Weapon Enchantment** (+1d4-1d8 dmg เสริม) | 103 |
| 12 | +3 | 4 | ASI | 112 |
| 13 | +3 | 4 | **Armor Enchantment** (Adamantine=crit→hit ปกติ ฯลฯ) | 121 |
| 14 | +3 | 4 | *(Subclass feature — ยกเว้น)* | 130 |
| 15 | +3 | 4 | Fabrication (cast Fabricate ฟรี) | 139 |
| 16 | +3 | 4 | ASI | 148 |
| 17 | +4 | 4 | Improved Masterwork (enchantment dmg ×2, mastery property ที่ 3) | 157 |
| 18 | +4 | 4 | Spellwrought Armor (Masterwork Bonus เข้า saving throw ด้วย) | 166 |
| 19 | +4 | 4 | Epic Boon | 175 |
| 20 | +4 | 4 | Magnum Opus (สร้างไอเทม Very Rare/Legendary เอง) | 184 |

---

## Damage Axis

**Primary = Magnitude** — Masterwork Bonus (+1 จาก lv1) ซ้อนบน weapon+3 baseline ตรงๆ → **Primary = A ทันทีตั้งแต่ lv1**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | **A** | Masterwork Bonus (+1→+2) ซ้อนบน weapon track เหนือ peer โดยตรง — Extra Attack มาตรงเวลา lv5 (ตรง peer เป๊ะ ไม่ใช่ต่ำกว่าแบบ Captain) — modifier: Burst=เหนือกว่า(Fortify Arsenal lv7), Resistance-proofing=เหนือกว่า(Folded Steel lv5 เปลี่ยนชนิดดาเมจได้) แต่ยังไม่พอปัดเป็น S |
| 11-20 | **S** | **Weapon Enchantment ปลดล็อก** — เสริมดาเมจอีก 1 เต๋า (Blessed/Elemental/Vampiric/Venomous, 1d4-1d8) ซ้อนบน Masterwork Bonus ที่ +3→+4 อยู่แล้ว บวก Improved Masterwork(lv17) เพิ่มเป็น 2 เต๋า — Magnitude สะสมหลายชั้นพร้อมกัน (Extra Attack+Masterwork+Enchantment+Mastery property) เทียบเท่าระดับ Fighter outlier — **S** |

**สรุปเกรด**: **A(1-10) → S(11-20)** — Primary เหนือ peer เร็วที่สุดเท่าที่เจอมา (ตั้งแต่ lv1 ไม่ใช่ milestone กลางเกม)

---

## Control Axis

ไม่มีกลไก Control เลยในทั้ง 25 feature — สแกนครบแล้วไม่พบฟีเจอร์ไหนบังคับ condition/save ต่อศัตรูเลยสักตัว

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไกที่เกี่ยวข้องกับ Control เลยตลอด 20 เลเวล = **D flat เต็มรูปแบบ** |

**สรุปเกรด**: **D(1-20) flat** — คลาสแรกที่ D-flat เต็มตัวทั้ง 20 เลเวลไม่มีจุดเปลี่ยนเลยแม้แต่ครั้งเดียว (Barbarian ยังมี Brutal Strike ที่ lv9 ขยับเป็น C ได้)

---

## Support Axis

**Primary = Magnitude**. Craftsman **ไม่มีสเปลล์ฮีล/บัฟเลย** แต่ Masterwork Weapon/Armor มีข้อความ "**Other Creatures Wielding/Wearing**" ที่ให้ ally ที่ถืออาวุธ/สวมเกราะ Masterwork ของเรารับ**ครึ่งหนึ่งของ Masterwork Bonus** (ปัดขึ้น) แบบ **passive ถาวร ไม่ต้อง cast/ใช้ resource ทุกครั้ง** — รูปแบบ Support ที่ไม่เคยเจอมาก่อนในระบบนี้

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Primary(Magnitude)=ต่ำมาก (+1 AC/ครึ่งบัลลังก์ atk-dmg bonus) ต่ำกว่า peer's Healing-Word-tier มาก = **C** — modifier: Breadth=แล้วแต่จำนวนไอเทมที่แจก(ตรง/เหนือกว่าได้ถ้า craft หลายชิ้น), **Action Economy=เหนือกว่า**(ไม่เสีย action เลยในคอมแบต เพราะเป็น passive ติดตัวไอเทม), **Proactive/Reactive=เหนือกว่า**(proactive เต็มรูปแบบ ตลอดเวลา), **Frequency=เหนือกว่า**(ถาวรไม่จำกัดครั้ง/วันเลย ต่างจาก slot-based ทั้งหมด), **Concentration Risk=เหนือกว่า**(ไม่มี concentration เกี่ยวข้องเลย เป็น item property) → **4/5 เหนือกว่า ถึงเกณฑ์ ≥3/5 มาก → ขยับขึ้น 1 ขั้นจาก C เป็น B** |

**สรุปเกรด**: **B(1-20) flat** — **คลาสแรกที่แตะ B ใน Support โดยไม่มีสเปลล์ฮีล/บัฟเลยสักตัว** ขับเคลื่อนด้วยกลไก passive-gear-sharing ล้วนๆ — pattern ใหม่ที่ไม่เคยเจอมาก่อน

---

## Survivability Axis

**Primary = Effective HP** (d10 เหนือ peer d8) = **A โดยตรงตั้งแต่ lv1**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **B** | Primary=A — modifier: Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D), Death Prevention=ไม่มีกลไก(D) → 3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลง 1 ขั้นเป็น **B** |
| 2-6 | = lv1 | ไม่มีจุดเปลี่ยน (Masterwork Armor ให้ AC ซึ่งถูกตัดออกจากสูตรนี้โดยเจตนา — ดู Anchor's เหตุผลไม่ใช้ AC) |
| 7-12 | = lv1 | Fortify Arsenal's Reinforce Armor (resist B/P/S ต่อ short-rest prep) = Mitigation มีกลไกจริงแต่ยังนับ "ต่ำกว่า" (short-rest-limited, ใช้แล้วหมดฤทธิ์ตอนโดนดาเมจครั้งแรก) → tally ไม่เปลี่ยน คง **B** |
| 13-17 | = lv1 | **Adamantine armor enchantment (lv13, crit→hit ปกติ)** = Mitigation จริงจังพอนับ "เหนือกว่า" ได้แล้ว — แต่ tally ยังคง 2/4 ต่ำกว่า(Debuff Resistance, Death Prevention) ถึงเกณฑ์เดิม → คง **B** |
| 18-20 | **A** | **Spellwrought Armor ปลดล็อก** — Masterwork Bonus เข้า saving throw ทุกตัว = Save Reliability ขยับเป็นเหนือกว่า → tally ใหม่: **2 เหนือ(Mitigation, Save Reliability)/2 ต่ำ(Debuff Resistance, Death Prevention) — เสมอกันอีกครั้ง (ครั้งที่ 6!)** ⚠️ net cancellation → กลับ Primary(A) เต็มตัว = **A** |

**สรุปเกรด**: B(1-17) → **A(18-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 เป๊ะ = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-12 | **C** | Primary=B — modifier: Bonus Action=ไม่มีกลไก(D), Reaction=ไม่มีกลไก(D), Extra Action=ไม่มีกลไก(D), Resource-Conversion=ไม่มีกลไก(D) → **4/4 ต่ำกว่า เกินเกณฑ์มาก แต่ cap 1 ขั้น → ขยับลงจาก B เป็น C** |
| 13-20 | = lv1-12 | **Armor Enchantment (Cloaking=Hide bonus action / Winged=Fly bonus action)** ปลดล็อก — Bonus Action ขยับเป็นเหนือกว่า → tally: 1 เหนือ/3 ต่ำ ไม่ถึงเกณฑ์กลับขึ้น → คง **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Utility Axis

**Primary = Magnitude** — Overnight Crafting (lv1, craft nonmagical item ระหว่าง Long Rest มูลค่า≤level×10 GP) เป็นกลไกจริงตั้งแต่ lv1 แต่ downtime-only/ช้า — Eye for Quality(lv9, Identify+Locate Object ฟรี) มาช้ากว่า peer's lv1 benchmark 8 เลเวล — Fabrication(lv15, Fabricate ฟรี) เป็น Solve-Problem จริงแต่ยังตามหลัง peer ณ tier เดียวกัน

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Primary มีกลไกจริงตลอด (Overnight Crafting→Eye for Quality→Fabrication) แต่ตามหลัง peer's escalating benchmark ทุกจุดเทียบเลเวลเดียวกัน (pattern เดียวกับ Channeler/Artificer's capped-resource-always-behind) — Skill-Check Layer=ไม่มีกลไก(D) ตลอด → modifier ไม่พอดันขึ้น = **C flat** |

**สรุปเกรด**: **C(1-20) flat** — Overnight Crafting เป็น Access-Cost dimension แบบใหม่ที่ไม่เคยเจอ (downtime-crafting แทน ritual-casting)

---

## Versatility Axis

**Primary = Loadout Flexibility** — ไม่มี prepared-spell mechanism เลย (มีแค่ 2 สเปลล์ innate ตายตัว) **แต่ Weapon Mastery (2→4 kinds, สลับ 1/Long Rest)** ยืนยัน cross-check ครั้งที่ 4 ว่าตรง "กลาง" tier → **Primary = B โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Primary=B — modifier: **Resource Fungibility=เหนือกว่า**(ระบบ craft ครอบคลุม weapon bonus/damage type/enchantment/mastery property/armor customization ทั้งหมดจาก "Long Rest crafting" เดียว), **Cross-Axis Coverage=เหนือกว่า**(แตะ Damage/Survivability/Support/Utility พร้อมกันตั้งแต่ lv1-2), **Target-Type=ต่ำกว่า**(เดี่ยวล้วนตลอดกาล), **Adaptability Under Pressure=ต่ำกว่า**(สลับได้แค่ตอน Long Rest เท่านั้น ไม่ใช่ต่อเทิร์นแบบคาสเตอร์ — จุดอ่อนจริงเทียบ peer) → **2 เหนือ/2 ต่ำ — เสมอกันอีกครั้ง (ครั้งที่ 7!)** ⚠️ net cancellation → กลับ Primary(B) เต็มตัว |

**สรุปเกรด**: **B(1-20) flat**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | A(1-10) → **S(11-20)** |
| Control | **D(1-20) flat** |
| Support | **B(1-20) flat** |
| Survivability | B(1-17) → A(18-20) |
| Action Economy | **C(1-20) flat** |
| Utility | **C(1-20) flat** |
| Versatility | **B(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **Damage Primary เหนือ peer ตั้งแต่ lv1 — เร็วที่สุดเท่าที่เจอมา** — Masterwork Bonus (+1) เป็น self-applied magic-weapon-bonus ตั้งแต่ระดับแรกสุด ต่างจาก Barbarian(Rage Damage มา lv1 เหมือนกันจริง)/Cleric(Blessed Strikes lv7)/Sacred Knight(d10 lv1) ที่ต่างมีจุดเริ่มต่างกัน — Craftsman เป็นคลาสที่ 2 ต่อจาก Barbarian ที่ Primary เหนือ peer จาก lv1 เป๊ะ
2. **Control D-flat เต็มรูปแบบ ไม่มีจุดเปลี่ยนแม้แต่ครั้งเดียวตลอด 20 เลเวล** — เข้มกว่า Barbarian (ที่ยังมี Brutal Strike ขยับเป็น C ที่ lv9) และ Captain (ขยับเป็น B ทั้งอาชีพ) — Craftsman คือคลาสมาร์เชียลล้วนที่อ่อน Control ที่สุดเท่าที่เจอในระบบนี้
3. **Support แตะ B โดยไม่มีสเปลล์ฮีล/บัฟเลยสักตัว — pattern ใหม่ที่ไม่เคยเจอมาก่อน** — "Other Creatures Wielding/Wearing Masterwork" เป็น passive gear-sharing mechanism ล้วนๆ ไม่ต้อง cast/ใช้ resource ทุกครั้ง แต่ Magnitude อ่อนมาก (+1 AC/ครึ่ง atk-dmg bonus) ถูกชดเชยด้วย Action-Economy/Frequency/Concentration-Risk ที่เหนือกว่า peer ทั้งหมด — Cross-check ที่ดีว่าระบบให้เครดิต "กลไกที่ไม่ใช่สเปลล์" ได้จริงถ้าโครงสร้างตรงตามนิยาม
4. **⚠️ Tie-break 2-2 เกิดซ้ำถึง 2 ครั้งในไฟล์เดียวอีกแล้ว** (Survivability lv18-20, Versatility ตลอดเกม) — รวมเป็นครั้งที่ 6-7 ของทั้งระบบ ยิ่งตอกย้ำว่าควรฟอร์มัลไลซ์กฎเสมอกันเข้า Anchor Rubric อย่างจริงจังในรอบถัดไป
5. **ยืนยัน Weapon Mastery floor-escape เป็นครั้งที่ 4** (ต่อจาก Barbarian/Captain/— รวมทุกคลาสที่มี Weapon Mastery แบบ swap-1-per-Long-Rest ล้วนหลุด D floor ไปที่ B เหมือนกันหมดจนถึงตอนนี้) — pattern มั่นคงมากแล้ว คาดว่า Fighter/Paladin/Ranger/Rogue จะเจอเหมือนกัน
6. **Versatility's Adaptability Under Pressure เป็นจุดอ่อนจริงที่ยังไม่เคยเห็นชัดขนาดนี้** — ระบบ crafting ทั้งหมดล็อกที่ "Long Rest เท่านั้น" ต่างจากคาสเตอร์ที่เลือกสเปลล์ใหม่ได้ทุกเทิร์น เป็นตัวอย่างชัดว่ากลไก non-caster ที่ทรงพลังก็ยังมีจุดอ่อนเชิงโครงสร้างที่สเปลล์ไม่มี
