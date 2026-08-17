# Witch — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Witch Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Witch", source: "ValdaSpire24"` — homebrew จาก *Valda's Spire of Secrets* — ยืนยัน `classFeaturesFull` ครบ 23 รายการ + `classSpells` (116 สเปลล์ผูกกับคลาสตรงๆ)
**สถานะ**: คลาสที่ 29 ของชั้น 1 — **full caster ตัวที่ 7 (สุดท้ายก่อน Wizard)** — ธีม "คำสาป" เต็มรูปแบบ, มี **Familiar** (pet-mechanic เหมือน Druid's Wild Companion/Necromancer's Thralls) + **Hexes** (cantrip-tier CC พิเศษ ไม่จำกัดการใช้)

⚠️ **หมายเหตุ**: Familiar ปฏิบัติเหมือน Thralls/Cohort (ไม่ฝังเข้า axis ไหนโดยตรง) **ยกเว้น Quick Attack/Spell Channeling ที่ใช้ Action Economy ของ Witch เอง** จึงนับเข้า Action Economy modifier ได้ตรงๆ — Witch's Curse(lv1, เลือก 1 ใน 11) ปฏิบัติ track-neutral

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: WIS/CHA · **Spellcasting**: CHA-based เต็มรูปแบบ, สลับ 1 สเปลล์/เลเวลอัพ (tier "ต่ำ") + **Hexes** (cantrip-tier CC แยกพูล, ไม่จำกัดการใช้)

| Lv | Hexes | Cantrips | Prepared Spells | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|
| 1 | 2 | 2 | 2 | Witch's Curse(choice), **Hexes** (Hex: Misfortune/Ruin แนะนำ), Spellcasting | 11 |
| 2 | 3 | 2 | 4 | **Cackle** (bonus action ยืด Hex 1 รอบ), **Familiar** (Find Familiar ฟรี+ปรับปรุง) | 19 |
| 3 | 3 | 2 | 6 | *(Witch Subclass — ยกเว้น)* | 27 |
| 4 | 3 | 3 | 7 | ASI, cantrip เพิ่ม | 35 |
| 5 | 4 | 3 | 9 | **Insidious Spell** (พลาด Hex→disadv save ต่อสเปลล์ปกติ และย้อนกลับ) | 43 |
| 6 | 4 | 3 | 10 | *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 4 | 3 | 11 | Improved Familiar (Force dmg option) | 59 |
| 8 | 4 | 3 | 12 | ASI | 67 |
| 9 | 5 | 3 | 14 | **Hastened Hex** (cast Hex+cantrip อื่นพร้อมกันใน Magic action เดียว) | 75 |
| 10 | 5 | 4 | 15 | *(Subclass feature — ยกเว้น)*, cantrip เพิ่ม | 83 |
| 11 | 5 | 4 | 16 | **Grand Hex** (เลือก 1 จากเมนู) | 91 |
| 12 | 5 | 4 | 16 | ASI | 99 |
| 13 | 6 | 4 | 17 | Grand Hex เพิ่ม | 107 |
| 14 | 6 | 4 | 17 | *(Subclass feature — ยกเว้น)* | 115 |
| 15 | 6 | 4 | 18 | Grand Hex เพิ่ม | 123 |
| 16 | 6 | 4 | 18 | ASI | 131 |
| 17 | 7 | 4 | 19 | Grand Hex เพิ่ม | 139 |
| 18 | 7 | 4 | 20 | **Vengeful Curse** (reaction, ally bloodied→ศัตรู disadv ทุก test) | 147 |
| 19 | 7 | 4 | 21 | Epic Boon | 155 |
| 20 | 7 | 4 | 22 | **Hexmaster** (บังคับ Hex save พลาดอัตโนมัติ, CHA-mod ครั้ง/rest) | 163 |

---

## Damage Axis

**Primary = Magnitude** (cantrip track — ไม่มี Extra Attack เลยตลอดชาติ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Hex: Ruin ตรง peer's cantrip track — Hastened Hex(lv9, cast 2 cantrip พร้อมกัน)=Burst เหนือกว่า 1/4 ไม่พอขยับ → คง **B ตลอด** |

**สรุปเกรด**: **B(1-20) flat**

---

## Control Axis

**Primary = Severity** — Hexes เป็น cantrip-tier CC **ไม่จำกัดการใช้** (ต่างจากสเปลล์ปกติที่ผูก slot) ธีมคลาสทั้งหมดคือคำสาป

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-19 | **B** | สมมติฐาน spell list ตรง peer's Tier4 benchmark — modifier: **Frequency=เหนือกว่ามาก**(Hex เป็น cantrip ไม่จำกัดการใช้ ต่างจาก peer ที่ผูก slot), Insidious Spell(lv5)=Stickiness เหนือกว่า(chain-disadvantage ระหว่าง Hex-save กับ spell-save) → 2/5 ยังไม่ถึงเกณฑ์ ≥3/5 → คง **B** |
| 20 | **S** | **Hexmaster ปลดล็อก** — บังคับ Hex save พลาดอัตโนมัติ (เทียบเท่า Power-Word-Kill-tier reliability, ไม่มี save ให้หนีเลย) → **S** |

**สรุปเกรด**: B(1-19) → **S(20)**

---

## Support Axis

**Primary = Magnitude** — ไม่มีธีม Support ชัดเจน (คล้าย Sorcerer/Necromancer/Warlock) — Vengeful Curse(lv18)ป้องกัน ally ทางอ้อมด้วยการ debuff ศัตรู ไม่ใช่ buff ally ตรงๆ

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | ไม่มีทรัพยากรคู่ขนานเล็ง ally เลย สมมติฐาน spell-list-based Support บางกว่า Bard/Cleric/Druid = **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Primary=B — modifier ทั้ง 4 **ไม่มีกลไก guaranteed เลยสักตัวตลอดอาชีพ** (Familiar ไม่ฮีล Witch เอง) → 3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลงจาก B เป็น **C ตลอด 20 เลเวล** |

**สรุปเกรด**: **C(1-20) flat**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **D** | modifier ทั้งหมดยังไม่มี(D×4) → 4/4 ต่ำ → ขยับลงจาก C เป็น **D** |
| 2-8 | = lv1 | **Cackle ปลดล็อก** — Bonus Action เหนือกว่า → tally: 1 เหนือ/3 ต่ำ ยังไม่พอกลับ → คง **D** |
| 9-17 | **C** | **Hastened Hex ปลดล็อก** (cast 2 cantrip ในการกระทำเดียว — Resource-to-Action Conversion จริง) → tally: **2 เหนือ(Bonus Action, Resource-Conversion)/2 ต่ำ(Reaction, Extra Action) — เสมอกัน (ครั้งที่ 25!)** ⚠️ net cancellation → กลับ Primary(C) |
| 18-20 | **B** | **Vengeful Curse ปลดล็อก (lv18, reaction จริงของ Witch เอง)** — Reaction เหนือกว่า → tally: **3 เหนือ/1 ต่ำ(Extra Action)** → ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C เป็น **B** |

**สรุปเกรด**: D(1-8) → C(9-17) → **B(18-20)**

---

## Utility Axis

**Primary = Magnitude** — สมมติฐาน generic caster track ตรง peer ไม่มี Skill-Check Layer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | สมมติฐาน generic full-caster track ตรง peer — Skill-Check Layer=ไม่มีกลไก(D) 1/4 ไม่พอขยับ → คง **B** |

**สรุปเกรด**: **B(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — "replace one spell...whenever you gain a Witch level" = tier **"ต่ำ"** → **Primary = C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Primary=C — Familiar ยังไม่มา |
| 2-20 | **B** | **Familiar+Cackle ปลดล็อก** — Cross-Axis Coverage เหนือกว่า(Damage/Control/Action-Economy พร้อมกัน), Adaptability เหนือกว่า(เลือก spell/Hex/Cackle ต่อเทิร์นได้) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C เป็น B** |

**สรุปเกรด**: C(1) → **B(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | **B(1-20) flat** |
| Control | B(1-19) → **S(20)** |
| Support | **C(1-20) flat** |
| Survivability | **C(1-20) flat** |
| Action Economy | D(1-8) → C(9-17) → **B(18-20)** |
| Utility | **B(1-20) flat** |
| Versatility | C(1) → **B(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **Control แตะ S ที่ lv20 ผ่าน Hexmaster — เหมือน Power-Word-Kill-tier reliability** — บังคับ Hex save พลาดอัตโนมัติ (ไม่มีทางหนีเลย) — ตรงกับธีมคลาส "คำสาปที่หนีไม่พ้น" อย่างสมบูรณ์
2. **Hexes เป็นตัวอย่างที่ 2 ของ "at-will cantrip-tier CC" ต่อจาก Monk's Stunning Strike/Vagabond's Stunning Blow** — Frequency เหนือกว่า peer เพราะไม่ผูก slot เลย แต่ยังไม่ถึงเกณฑ์ปัดขึ้น A จนกว่าจะถึง Hexmaster's guaranteed-fail ที่ lv20
3. **ยืนยัน methodology "unmodeled parallel actor" สำหรับ pet-mechanic เป็นครั้งที่ 3** — Familiar ปฏิบัติเหมือน Thralls(Necromancer)/Wild-Shape(Druid) แต่ Quick-Attack/Spell-Channeling ที่ใช้ Action Economy ของ Witch เองยังนับได้ตรงๆ (ต่างจาก Cohort/Thralls ที่ล้วนแยกขาด)
4. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 25** (Action Economy lv9-17) — สะสมสูงสุดต่อเนื่อง
5. **Versatility=B (ไม่ใช่ C-flat แบบ Warlock/Warmage)** — เพราะ Familiar+Cackle ให้ Cross-Axis Coverage ที่แท้จริงตั้งแต่ lv2 ต่างจาก Warlock's invocation ที่ต้อง choice-dependent
