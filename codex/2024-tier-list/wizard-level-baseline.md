# Wizard — Class Baseline (Level-Indexed, ชั้น 1) — 🏁 คลาสสุดท้ายของชั้น 1 (30/30)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Wizard Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-wizard.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 16 รายการ
**สถานะ**: คลาสที่ 30 ของชั้น 1 — **Wizard คือคลาสที่ Anchor Rubric เองใช้เป็นตัวอย่างอ้างอิงหลักในหลายจุดที่สุด** (Sleep worked-example ของทั้ง Grading Scale, Ritual Adept สำหรับ Utility's Access-Cost, tier "สูง" ของ Versatility ร่วมกับ Cleric/Druid/Artificer) — d6 HD ตัวที่ 3 ในระบบนี้ (ต่อจาก Necromancer/Sorcerer)

⚠️ **นี่คือคลาสสุดท้ายของ 30 Class Baseline (ชั้น 1)** — หลังไฟล์นี้ ชั้น 1 เสร็จสมบูรณ์ 30/30 — ชั้น 2 (478 Subclass Overlay) ยังไม่เริ่ม รอ user สั่งต่อ

---

## สรุป Chassis

**HD**: d6 (ต่ำกว่า peer d8 — Primary Survivability เริ่มที่ C) · **Save prof**: INT/WIS · **Spellcasting**: INT-based เต็มรูปแบบ, **full-swap prepared spells ทุก Long Rest (tier "สูง")** + Memorize Spell(lv5, swap เพิ่มทุก Short Rest ด้วย)

| Lv | Cantrips | Prepared Spells | Milestone อื่น | EHP (d6+CON+3) |
|---|---|---|---|---|
| 1 | 3 | 4 | Spellbook(6 สเปลล์เริ่มต้น รวม **Sleep**), **Ritual Adept** (cast ritual แม้ไม่เตรียม), **Arcane Recovery** (คืน slot ครึ่งเลเวล/short-rest 1/วัน) | 9 |
| 2 | 3 | 5 | **Scholar** (Expertise 1 skill) | 16 |
| 3 | 3 | 6 | *(Wizard Subclass — ยกเว้น)* | 23 |
| 4 | 4 | 7 | ASI, cantrip เพิ่ม | 30 |
| 5 | 4 | 9 | **Memorize Spell** (swap prepared spell เพิ่มทุก Short Rest) | 37 |
| 6 | 4 | 10 | *(Subclass feature — ยกเว้น)* | 44 |
| 7 | 4 | 11 | — | 51 |
| 8 | 4 | 12 | ASI | 58 |
| 9 | 4 | 14 | — | 65 |
| 10 | 5 | 15 | *(Subclass feature — ยกเว้น)*, cantrip เพิ่ม | 72 |
| 11 | 5 | 16 | — | 79 |
| 12 | 5 | 16 | ASI | 86 |
| 13 | 5 | 17 | — | 93 |
| 14 | 5 | 18 | *(Subclass feature — ยกเว้น)* | 100 |
| 15 | 5 | 19 | — | 107 |
| 16 | 5 | 21 | ASI | 114 |
| 17 | 5 | 22 | — | 121 |
| 18 | 5 | 23 | **Spell Mastery** (สเปลล์ 1st+2nd cast ฟรีไม่จำกัดครั้ง) | 128 |
| 19 | 5 | 24 | Epic Boon | 135 |
| 20 | 5 | 25 | **Signature Spells** (สเปลล์ 3rd ฟรี 1 ครั้ง/short-or-long-rest ×2) | 142 |

---

## Damage Axis

**Primary = Magnitude** (cantrip track — ไม่มี Extra Attack เลยตลอดชาติ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Ray of Frost ตรง peer's cantrip track เป๊ะ (Wizard คือคลาสที่ Anchor's cantrip track อ้างอิงโดยตรง) — ไม่มี stacking bonus แบบ Cleric/Necromancer/Sorcerer → คง **B ตลอด** |

**สรุปเกรด**: **B(1-20) flat**

---

## Control Axis

**Primary = Severity** — **Sleep แนะนำเป็นสเปลล์เริ่มต้นจริง — ตรงกับตัวอย่างที่ Anchor เองใช้อธิบาย Grading Scale ทั้งบทตรงๆ**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Sleep(Tier4)/Hold Person/Hypnotic Pattern ตรง peer benchmark เป๊ะทุกจุด (Wizard คือคลาสอ้างอิงหลักของ Control Anchor เอง) → **B ตลอด** |

**สรุปเกรด**: **B(1-20) flat**

---

## Support Axis

**Primary = Magnitude** — ไม่มี Cure Wounds ในลิสต์แนะนำเริ่มต้น (Detect Magic/Feather Fall/Mage Armor/Magic Missile/Sleep/Thunderwave ล้วนไม่ใช่ Support) — ไม่มีทรัพยากรคู่ขนานเล็ง ally เลย

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | สมมติฐาน spell-list-based Support บางกว่า Bard/Cleric/Druid ตามธีมคลาส (นักวิชาการ ไม่ใช่นักบวช) = **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d6 ต่ำกว่า peer d8) = **C โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary=C — modifier ทั้ง 4 ไม่มีกลไก guaranteed เลยตลอดอาชีพ (Arcane Recovery คืน resource ไม่ใช่ HP) → 3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลงจาก C เป็น **D ตลอด 20 เลเวล** — เหมือน Sorcerer เป๊ะ (d6+ไม่มี modifier เลย) |

**สรุปเกรด**: **D(1-20) flat** — เหมือน Sorcerer เป๊ะ (Survivability อ่อนที่สุดร่วมกับ Sorcerer)

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary=C — modifier ทั้ง 4 ไม่มีกลไก guaranteed เลยสักตัว (Arcane Recovery ใช้ Short Rest เต็ม ไม่ใช่ instant-trick) → 4/4 ต่ำ ถึงเกณฑ์เกินไกล → ขยับลงจาก C เป็น **D ตลอด 20 เลเวล** — เหมือน Cleric/Warlock (modifier tally แซง carve-out กลับไป D) — **คลาสที่ 3 ที่เจอ pattern นี้** |

**สรุปเกรด**: **D(1-20) flat**

---

## Utility Axis

**Primary = Magnitude** — **Ritual Adept (lv1) เป็นตัวอย่างที่ Anchor เองอ้างชื่อไว้ตรงๆ ในบท Utility Anchor**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary ตรง peer (Detect Magic-tier) — Ritual Adept=Access Cost เหนือกว่า(cast ritual ได้แม้ไม่เตรียม ดีกว่า peer's ritual-ต้องเตรียมก่อน) แต่ 1/4 ไม่พอขยับเดี่ยวๆ → คง **B** |
| 2-20 | **A** | **Scholar ปลดล็อก (lv2)** — Skill-Check Layer เหนือกว่า(Expertise 1 skill) → tally: **2/4 เหนือกว่า(Access Cost, Skill-Check Layer) ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)**

---

## Versatility Axis

**Primary = Loadout Flexibility** — "replacing any of the spells there with spells from your spellbook" ทุก Long Rest = tier **"สูง"** (Anchor เองอ้างชื่อ "Wizard, Cleric, Druid, Artificer" ไว้ตรงๆ เป็นตัวอย่างหลักของ tier นี้) → **Primary = A โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **A** | Primary=A — Memorize Spell(lv5, swap เพิ่มทุก Short Rest) เป็น modifier เสริมจริงแต่เป็น "จังหวะเร็วขึ้นของกลไกเดิม" ไม่ใช่ทรัพยากรคู่ขนานใหม่แบบ Divine Spark(Cleric)/Wild Shape(Druid)/Infusion(Artificer) → **ไม่ถึงเกณฑ์ปัดขึ้น S** ตามวินัยเดิม (ต่างจาก 3 คลาสนั้นที่มี parallel resource แท้จริง) → คง **A ตลอด** |

**สรุปเกรด**: **A(1-20) flat**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | **B(1-20) flat** |
| Control | **B(1-20) flat** |
| Support | **C(1-20) flat** |
| Survivability | **D(1-20) flat** |
| Action Economy | **D(1-20) flat** |
| Utility | B(1) → **A(2-20)** |
| Versatility | **A(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **Wizard คือคลาสที่ Anchor Rubric เองอ้างอิงมากที่สุดในระบบทั้งหมด** — Sleep เป็น worked example ของ Grading Scale เอง, Ritual Adept ถูก cite ชื่อตรงๆ ใน Utility Anchor, tier "สูง" ของ Versatility ก็ใช้ Wizard เป็นตัวอย่างหลัก — ไฟล์นี้จึงทำหน้าที่ "ปิดวง" ยืนยันว่า Anchor ทั้งฉบับสอดคล้องกับตัวมันเองตั้งแต่ต้นจนจบ
2. **Survivability+Action Economy ทั้งคู่ D-flat พร้อมกัน — คลาสที่อ่อนที่สุดในระบบนี้ร่วมกับ Sorcerer** — d6 ไม่มี modifier เลยสักตัวใน Survivability, และ Action Economy โดน modifier tally แซง carve-out เป็นครั้งที่ 3 (ต่อจาก Cleric, Warlock) — ยืนยันว่า pattern นี้เกิดกับ full-caster ที่ไม่มี parallel-resource เลยอย่างสม่ำเสมอ
3. **Versatility=A-flat ไม่ถึง S ทั้งที่ tier "สูง" เหมือน Cleric/Druid/Artificer** — เพราะ Memorize Spell เป็นแค่ "จังหวะเร็วขึ้นของกลไกเดิม" ไม่ใช่ทรัพยากรคู่ขนานแยกต่างหาก (Divine Spark/Wild Shape/Infusion) — เป็นเส้นแบ่งที่ชัดเจนระหว่าง 4 คลาส tier "สูง" ในระบบนี้: 3 คลาสมี parallel resource แท้จริง (S) ส่วน Wizard ไม่มี (A)
4. **ไม่มี tie-break 2-2 เกิดขึ้นเลยในไฟล์นี้** — ทุก axis เป็น flat สนิท ไม่มี milestone shift ให้เกิด tie

---

## 🏁 สรุปภาพรวม ชั้น 1 (30 Class Baseline) เสร็จสมบูรณ์

ทั้ง 30 Class Baseline เขียนเสร็จครบแล้ว (2026-08-16 ถึง 2026-08-17) — รายชื่อไฟล์ทั้งหมดอยู่ที่ [00-level-progress.md](00-level-progress.md) — ระบบนี้ผ่านการค้นพบเชิงระเบียบวิธีที่สำคัญหลายจุดระหว่างทาง (floor rule vs. class identity, tie-break 2-2 ที่เกิดซ้ำ 25+ ครั้ง, unmodeled parallel actor สำหรับ pet-mechanic, generic-caster-track สำหรับ data gap) ซึ่งบันทึกไว้ครบใน memory `project_tier_list_level_split_idea` — **ขั้นต่อไปคือชั้น 2 (478 Subclass Overlay) รอ user สั่งเริ่มงาน**
