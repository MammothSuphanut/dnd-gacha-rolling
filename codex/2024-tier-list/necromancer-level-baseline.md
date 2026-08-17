# Necromancer — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Necromancer Subclass ที่ lv3/6/10/20 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Necromancer", source: "ValdaSpire24"` — homebrew จาก *Valda's Spire of Secrets* — ยืนยัน `classFeaturesFull` ครบ 20 รายการ + `classSpells` (125 สเปลล์ผูกกับคลาสตรงๆ)
**สถานะ**: คลาสที่ 19 ของชั้น 1 — **full caster ตัวที่ 4** (Bard/Cleric/Druid ก่อนหน้า) — **d6 HD ตัวแรกในระบบนี้** (ต่ำกว่า peer d8) + **มี pet-mechanic (Thralls) เหมือน Captain's Cohort ที่ flag ไว้ให้เช็คซ้ำ**

⚠️ **หมายเหตุสำคัญ 2 ข้อ**:

1. **Thralls (lv2) ปฏิบัติเหมือน Captain's Cohort — ไม่ฝังเข้า axis ไหนของ Necromancer โดยตรง** (ยืนยัน methodology เดียวกันตามที่ flag ไว้ตอนทำ Captain) — Thralls เดินเทิร์นแยก ใช้ spell-atk-mod/DC ของ Necromancer เอง แชร์ reaction+bonus action 1 ชุด/รอบ — เป็น "unmodeled parallel actor" อีกตัวหนึ่ง Charnel Touch's ฮีล-thrall / Improved Thralls / Undying Servitude ล้วนเป็นฟีเจอร์ที่ประโยชน์ตกกับ **Thrall ไม่ใช่ Necromancer เอง** จึงไม่นับเข้า Survivability/Support ของ Necromancer โดยตรง
2. **d6 HD เป็นครั้งแรกในระบบนี้ที่ Primary(Effective HP) ต่ำกว่า peer** (Anchor เองระบุ Sorcerer/Wizard d6 เป็น "deviation ต่ำกว่า" ไว้ชัดเจน) — Survivability Primary = **C โดยตรง** (ตรงข้ามกับ Barbarian/Craftsman/Dancer/Fighter/Martyr ที่ d10-d12 ให้ A โดยตรง)

---

## สรุป Chassis

**HD**: d6 (ต่ำกว่า peer d8 — Primary Survivability เริ่มที่ C) · **Save prof**: CON/INT · **Spellcasting**: INT-based, สลับ 1 สเปลล์/เลเวลอัพ (tier "ต่ำ")

| Lv | Cantrips | Prepared Spells | Charnel Touch Pool | Thralls (จำนวน/CR รวม) | Milestone อื่น | EHP (d6+CON+3) |
|---|---|---|---|---|---|---|
| 1 | 3 | 4 | 5 | — | **Spellcasting**, **Charnel Touch** (melee spell attack, จ่าย point ยืดหยุ่น) | 9 |
| 2 | 3 | 5 | 10 | 1 / CR¼ | **Thralls** (pet undead), **Dead Space** (กระเป๋ามิติเก็บศพ/thrall) | 16 |
| 3 | 3 | 6 | 15 | 2 / CR½ | *(Necromancer Subclass — ยกเว้น)*, **Dark Arcana** (bonus action: slot→Charnel Touch point) | 23 |
| 4 | 4 | 7 | 20 | 2 / CR½ | ASI, cantrip เพิ่ม | 30 |
| 5 | 4 | 9 | 25 | 2 / CR1 | **Animate Dead ติดตัวฟรี**, **Critical Spellcasting** (crit 19-20 spell atk + auto-fail ต่อ nat-1 save) | 37 |
| 6 | 4 | 10 | 30 | 2 / CR1 | *(Subclass feature — ยกเว้น)* | 44 |
| 7 | 4 | 11 | 35 | 3 / CR1 | Improved Thralls (Avoidance/Necrotic-swap/Turn-immune — ผลตกกับ thrall) | 51 |
| 8 | 4 | 12 | 40 | 3 / CR1 | ASI | 58 |
| 9 | 4 | 14 | 45 | 3 / CR2 | — | 65 |
| 10 | 5 | 15 | 50 | 3 / CR2 | *(Subclass feature — ยกเว้น)* | 72 |
| 11 | 5 | 16 | 55 | 4 / CR2 | — | 79 |
| 12 | 5 | 16 | 60 | 4 / CR2 | ASI | 86 |
| 13 | 5 | 17 | 65 | 4 / CR3 | — | 93 |
| 14 | 5 | 17 | 70 | 4 / CR3 | **Improved Critical Spellcasting** (crit 18-20, auto-fail nat 1-2) | 100 |
| 15 | 5 | 18 | 75 | 5 / CR3 | — | 107 |
| 16 | 5 | 18 | 80 | 5 / CR3 | ASI | 114 |
| 17 | 5 | 19 | 85 | 5 / CR4 | — | 121 |
| 18 | 5 | 20 | 90 | 5 / CR4 | Undying Servitude (reaction กัน thrall ตาย — ผลตกกับ thrall) | 128 |
| 19 | 5 | 21 | 95 | 6 / CR4 | Epic Boon | 135 |
| 20 | 5 | 22 | 100 | 6 / CR4 | **Lichdom** (Undead+Spirit Jar respawn+Truesight+immune Necrotic/Poison/Exhaustion/Poisoned) | 142 |

---

## Damage Axis

**Primary = Magnitude** (cantrip track — ไม่มี Extra Attack เลยตลอดชาติ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | B | cantrip ตรง peer — Charnel Touch(lv1) เป็น burst เสริมยืดหยุ่นแต่ยังไม่พอขยับ Primary |
| 5-20 | **A** | **Critical Spellcasting ปลดล็อก** — crit 19-20(→18-20 lv14)+auto-fail ต่อ nat-1 save(ดาเมจคูณสองถ้ามีดาเมจ) ซ้อนเหนือ peer's cantrip baseline โดยตรง (pattern เดียวกับ Cleric's Blessed Strikes/Mystic's Potent Psionics) → **A** |

**สรุปเกรด**: B(1-4) → **A(5-20)**

---

## Control Axis

**Primary = Severity** — ใช้ความรู้ทั่วไปว่า Necromancer มักมีสเปลล์ CC ธีมมืด (Hold Person/Fear/Enervation-tier) ตรง peer benchmark ใกล้เคียง Cleric/Bard

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | สมมติฐาน spell list ตรง peer's Tier4 benchmark ตามความรู้ทั่วไป — Critical Spellcasting's auto-fail-on-nat-1 เป็น modifier เสริมแต่ไม่ใช่มิติหลักที่นับใน 6-มิติเดิมโดยตรง ไม่พอปัดขึ้น A |

**สรุปเกรด**: **B(1-20) flat**

---

## Support Axis

**Primary = Magnitude** — **ไม่มีฟีเจอร์ base-class เล็ง ally เลยแม้แต่จุดเดียว** (Charnel Touch's ฮีลใช้ได้แค่กับ thrall ของตัวเอง, Undying Servitude ก็ผลตกกับ thrall) — ต่างจาก Bard/Cleric/Druid ที่ธีมคลาสเอง support-friendly

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | สมมติฐาน spell list อาจมีฮีล ally บ้างตามทั่วไปของ full caster แต่ธีมคลาสเน้น self/thrall ชัดเจน (Charnel Touch/Thralls/Lichdom ล้วน self-focus) ไม่ให้เครดิตเต็ม B แบบ Bard/Cleric — ประเมินอนุรักษ์นิยมกว่า = **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d6 — **ต่ำกว่า peer d8 เป็นครั้งแรกในระบบนี้**) = **C โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-19 | **D** | Primary=C — modifier: Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D), Death Prevention=ไม่มีกลไก(D — Undying Servitude ผลตกกับ thrall ไม่ใช่ตัวเอง) → 3/4 ต่ำกว่า ถึงเกณฑ์ → **ขยับลง 1 ขั้นจาก C(ที่ต่ำกว่า peer อยู่แล้ว) เป็น D** — **คลาสที่อ่อน Survivability ที่สุดในระบบนี้จนถึง lv19** |
| 20 | **B** | **Lichdom ปลดล็อก** — immune Necrotic/Poison(Mitigation)+immune Exhaustion/Poisoned(Debuff Resistance)+Spirit Jar respawn(Death Prevention) ขยับเป็นเหนือกว่าพร้อมกันทั้ง 3 → **3/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C(Primary) เป็น B** — กระโดดจาก D สุดต่ำไปเป็น B ในเลเวลเดียว |

**สรุปเกรด**: **D(1-19)** → B(20) — เส้นเรื่อง "glass cannon ที่ตายง่ายที่สุดจนกลายเป็นอมตะในบั้นปลาย" ตรงกับธีม Lichdom เป๊ะ

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | **D** | modifier ทั้ง 4 ยังไม่มีกลไก(D) → ขยับลงจาก C เป็น **D** |
| 3-17 | = lv1-2 | **Dark Arcana ปลดล็อก** — Bonus Action เหนือกว่า(slot→Charnel Touch point) → tally: 1 เหนือ/3 ต่ำ ยังไม่พอกลับ → คง **D** |
| 18-20 | **C** | **Undying Servitude ปลดล็อก** (reaction, ผลตกกับ thrall แต่ตัว Necromancer เองใช้ reaction จริง) — Reaction เหนือกว่า → tally: **2 เหนือ(Bonus Action, Reaction)/2 ต่ำ(Extra Action, Resource-Conversion) — เสมอกัน (ครั้งที่ 19!)** ⚠️ net cancellation → กลับ Primary(C) |

**สรุปเกรด**: D(1-17) → **C(18-20)** — Action Economy อ่อนที่สุดในบรรดา full caster ที่ทำมา (Bard/Cleric/Druid ทุกตัวแตะ A/B ได้เร็วกว่านี้)

---

## Utility Axis

**Primary = Magnitude** — สมมติฐาน spell list ตรง peer (Speak with Dead/Gentle Repose-tier ธีมมืดมาตรฐาน) ไม่มี Skill-Check Layer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | สมมติฐาน generic full-caster track ตรง peer — Skill-Check Layer=ไม่มีกลไก(D) 1/4 ไม่พอขยับ → คง **B** |

**สรุปเกรด**: **B(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — ยืนยันจาก text จริง "replace one spell...whenever you gain a level" = tier **"ต่ำ"** ตรงตัว → **Primary = C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | C | Primary=C — Dark Arcana ยังไม่มา modifier ยังไม่พอขยับ (Fungibility เดียวจาก Charnel Touch, 1/4) |
| 3-20 | **B** | **Dark Arcana ปลดล็อก** — Resource Fungibility เหนือกว่าเพิ่ม(slot↔Charnel-Touch สองทาง), Cross-Axis Coverage เหนือกว่า(Damage/Action-Economy/Utility พร้อมกัน) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C เป็น B** |

**สรุปเกรด**: C(1-2) → **B(3-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-4) → **A(5-20)** |
| Control | **B(1-20) flat** |
| Support | **C(1-20) flat** |
| Survivability | **D(1-19)** → B(20) |
| Action Economy | D(1-17) → C(18-20) |
| Utility | **B(1-20) flat** |
| Versatility | C(1-2) → **B(3-20)** |

---

## ข้อค้นพบสำคัญ

1. **ยืนยัน methodology "unmodeled parallel actor" สำหรับ pet-mechanic เป็นครั้งที่ 2** — Thralls (Necromancer) ปฏิบัติเหมือน Cohort (Captain) เป๊ะ ไม่ฝังเข้า axis ไหนโดยตรง — ตอบคำถามที่ flag ไว้ตอนทำ Captain ว่าจะเจอ pet-mechanic คลาสอื่นอีกไหม (เจอแล้ว และใช้หลักการเดียวกันได้จริง)
2. **d6 HD ตัวแรกในระบบนี้ — Survivability ร่วงถึง D ตลอด 19 เลเวลแรก** — อ่อนที่สุดในระบบนี้จนถึงตอนนี้ (ต่ำกว่า Craftsman/Channeler/Cleric/Druid ที่ยังได้ C อย่างน้อย) แต่กระโดดเป็น B ทันทีที่ lv20 ผ่าน Lichdom — เส้นเรื่อง "เปราะบางที่สุดจนกลายเป็นอมตะ" ตรงธีมคลาสเป๊ะ
3. **Support ประเมินอนุรักษ์นิยมกว่า Bard/Cleric/Druid โดยเจตนา** — แม้ใช้ methodology "generic caster track" เหมือนกัน แต่ธีมคลาส (Charnel Touch/Thralls/Lichdom ล้วน self/pet-focus) ชี้ชัดว่าไม่ใช่ Support-class โดยดีไซน์ ให้ C แทน B เพื่อสะท้อนความจริงนี้ — ตัวอย่างว่า "generic caster track" ไม่ใช่การให้เกรดเดียวกันทุกคลาสอัตโนมัติ ต้องพิจารณาธีม/ฟีเจอร์จริงประกอบด้วยเสมอ
4. **Action Economy อ่อนที่สุดในบรรดา full caster ที่ทำมา** (Bard/Cleric/Druid ทุกตัวแตะ A/B เร็วกว่านี้มาก) — D ยาวถึง lv17 ก่อนจะขยับเป็น C ที่ lv18 เท่านั้น
5. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 19** (Action Economy lv18-20) — สะสมต่อเนื่อง
6. **Damage ใช้ pattern Primary-elevation ผ่าน Critical Spellcasting เหมือน Cleric's Blessed Strikes/Mystic's Potent Psionics** — ยืนยันเป็น pattern ที่เกิดขึ้นซ้ำๆ ในคลาส full-caster ที่มีฟีเจอร์กลางเกม (lv5-8) ดันดาเมจ ไม่ใช่เฉพาะคลาส official เท่านั้น
