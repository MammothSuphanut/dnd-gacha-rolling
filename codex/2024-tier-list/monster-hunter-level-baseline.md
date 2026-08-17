# Monster Hunter — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Monster Hunter Subclass ที่ lv3/7/10/15/18 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Monster Hunter", source: "GrimHollowPG24"` — 3rd-party จาก *Grim Hollow Player's Guide (2024 update)* (ผู้จัดพิมพ์ต่างจาก Valda's Spire homebrew ตัวอื่นๆ) — ยืนยัน `classFeaturesFull` ครบ 22 รายการ
**สถานะ**: คลาสที่ 17 ของชั้น 1 — **นักล่าปีศาจธีม Witcher** — ไม่มีสเปลล์เลย, ไม่มี maneuver-resource-pool เลย (linear feature ทั้งหมด ไม่ผูก Focus/Battle/Risk Dice) — **Extra Attack มาช้าที่สุดเท่าที่เจอในระบบนี้ (lv11 แทนที่จะเป็น lv5 ปกติ)**

⚠️ **หมายเหตุสำคัญ**: **Monster Grimoire** (เลือก 2→4 ประเภทสัตว์ร้ายที่ถนัด) เป็นตัวขับหลักของหลายฟีเจอร์ (Improved Grimoire's crit range, Knowledgeable Defense's save-swap, Lair Sense's resist, Grave Strike's execute) แต่**ทุกอันจำกัดเฉพาะประเภทสัตว์ที่เลือกไว้เท่านั้น** — เจอ "creature-type restriction" ซ้ำเป็นครั้งที่ 2 (ต่อจาก Cleric's Turn Undead) ยิ่งยืนยันว่าควรมีมิติจับเรื่องนี้โดยเฉพาะในอนาคต

---

## สรุป Chassis

**HD**: d10 (เหนือ peer d8 — Primary Survivability เริ่มที่ A) · **Save prof**: DEX/INT · **ไม่มีสเปลล์คาสติ้งเลย**

| Lv | Weapon Mastery (kinds) | Grimoire (ประเภทสัตว์) | Milestone อื่น | EHP (d10+CON+3) |
|---|---|---|---|---|
| 1 | 2 | 2 | **Monster Grimoire** (prof/double-prof ต่อ Int/Wis check เกี่ยวกับสัตว์ที่ถนัด), **Weapon Mastery** | 13 |
| 2 | 2 | 2 | Fighting Style, **Studied Response** (reaction โจมตีก่อนศัตรูตี, รีเซ็ตถ้าพลาด) | 22 |
| 3 | 2 | 2 | *(Monster Hunter Subclass — ยกเว้น)* | 31 |
| 4 | 2 | 2 | ASI | 40 |
| 5 | 3 | 2 | **Expert Strike** (Int mod เข้า attack+damage เพิ่ม — บวกซ้อนกับ mod ปกติ) | 49 |
| 6 | 3 | 3 | Improved Monster Grimoire (ประเภทที่ 3, crit 19-20 ต่อสัตว์ที่ถนัด) | 58 |
| 7 | 3 | 3 | *(Subclass feature — ยกเว้น)* | 67 |
| 8 | 3 | 3 | ASI | 76 |
| 9 | 3 | 3 | Knowledgeable Defense (ใช้ Int save แทน save ที่ถูกบังคับ ต่อสัตว์ที่ถนัด) | 85 |
| 10 | 3 | 3 | *(Subclass feature — ยกเว้น)* | 94 |
| 11 | 4 | 3 | **Extra Attack** (มาช้ามาก) | 103 |
| 12 | 4 | 3 | ASI | 112 |
| 13 | 4 | 3 | Improved Monster Grimoire (ประเภทที่ 4) | 121 |
| 14 | 4 | 3 | Lair Sense (adv+resist ต่อ lair action/legendary action ของสัตว์ที่ถนัด) | 130 |
| 15 | 4 | 3 | *(Subclass feature — ยกเว้น)* | 139 |
| 16 | 4 | 4 | ASI | 148 |
| 17 | 5 | 4 | **Slayer's Aid** (ally ได้ reaction โจมตีร่วมตอน Studied Response) | 157 |
| 18 | 5 | 4 | *(Subclass feature — ยกเว้น)* | 166 |
| 19 | 5 | 4 | Epic Boon | 175 |
| 20 | 5 | 4 | **Grave Strike** (crit 18-20 ต่อสัตว์ที่ถนัด + save-หรือ-ตกHP0) | 184 |

---

## Damage Axis

**Primary = Magnitude** — Extra Attack ล่าช้าถึง lv11 สร้างช่วงเปลี่ยนแปลงที่ชัดเจนกว่าคลาสอื่น

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | B | matches peer (1 attack, ยังไม่มี Expert Strike) |
| 5-10 | **C** | **Expert Strike ปลดล็อก** — Int mod เข้า attack+damage เพิ่ม (~+3 ซ้อน) แต่ยังคง 1 attack เดียว (~14.5) เทียบ peer's 2-attack(~17) ยังต่ำกว่า = **C** (มีกลไกจริงแต่ Extra Attack ยังไม่มาถึง) |
| 11-19 | **A** | **Extra Attack มาถึงในที่สุด** — 2 attack×(1d10+3+3)≈29 **แซง peer's 2-attack(~17) และแม้แต่ Fighter's 3-attack(~26)** เพราะ double-mod bonus สะสมมาตั้งแต่ lv5 = **A** |
| 20 | **S** | Grave Strike (crit 18-20 ต่อสัตว์ที่ถนัด + save-หรือ-ตกHP0) = execute mechanic ระดับ nova = **S** |

**สรุปเกรด**: B(1-4) → C(5-10) → **A(11-19)** → **S(20)** — dip-แล้ว-ทะยาน pattern ชัดที่สุดเท่าที่เจอ

---

## Control Axis

ไม่มีกลไก Control จนถึง Grave Strike (lv20) ซึ่งจำกัดสัตว์ที่ถนัด+จำนวนใช้/วันเท่า Int mod

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-19 | D | ไม่มีกลไกเลย = **D** |
| 20 | **C** | Grave Strike's death-save-or-drop = Control-adjacent จริงแต่แคบมาก (สัตว์ที่ถนัด+ครั้งจำกัด+เลเวลเดียว) = **C** |

**สรุปเกรด**: D(1-19) → **C(20)**

---

## Support Axis

Slayer's Aid (lv17) เป็นกลไกเดียวที่เล็ง ally — มาช้าที่สุดในบรรดา Support-mechanism ที่เจอในระบบนี้

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-16 | D | ไม่มีกลไก Support เลย = **D** |
| 17-20 | **C** | Slayer's Aid: ให้ ally ใช้ reaction โจมตีร่วมตอน Studied Response trigger = มีกลไกจริงแต่แคบ(ผูกกับ Studied Response) และมาช้ามาก = **C** |

**สรุปเกรด**: D(1-16) → **C(17-20)**

---

## Survivability Axis

**Primary = Effective HP** (d10 เหนือ peer d8) = **A โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-13 | **B** | Primary=A — modifier ทั้งหมดยังไม่มีกลไกทั่วไป(D)หรือมีแต่แคบมาก(Knowledgeable Defense lv9 ผูกสัตว์ที่ถนัดเท่านั้น=ยังนับต่ำกว่า) → 3/4 ต่ำกว่า → ขยับลง 1 ขั้นจาก A เป็น **B** |
| 14-20 | **A** | **Lair Sense ปลดล็อก** — Mitigation ขยับเป็นเหนือกว่า(resist lair/legendary action dmg) → tally: **2 เหนือ(Mitigation, Save Reliability)/2 ต่ำ(Debuff Resistance, Death Prevention) — เสมอกัน (ครั้งที่ 16!)** ⚠️ net cancellation → กลับ Primary(A) |

**สรุปเกรด**: B(1-13) → **A(14-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ล่าช้าเป็น lv11 ทำให้ต่ำกว่า peer นานผิดปกติ

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=B(pre-EA) — modifier ยังไม่มี(D×4) → 4/4 ต่ำกว่า → ขยับลงเป็น **C** |
| 2-4 | = lv1 | **Studied Response ปลดล็อก** — Reaction เหนือกว่า(preemptive attack ก่อนศัตรูตี) → tally: 1 เหนือ/3 ต่ำ ยังไม่พอกลับ → คง **C** |
| 5-10 | **D** | **Extra Attack ยังไม่มา** — Primary ตกเป็น C(carve-out, ต่ำกว่า peer's 2-attack) — modifier tally เดิม(1 เหนือ/3 ต่ำ) ยังกดต่ออีก 1 ขั้น → ขยับลงจาก C เป็น **D** |
| 11-20 | **C** | **Extra Attack มาถึง** — Primary กลับเป็น B(ตรง peer) — modifier tally เดิม(1 เหนือ/3 ต่ำ) กดกลับลงอีกครั้ง → **C** |

**สรุปเกรด**: C(1-4) → **D(5-10)** → **C(11-20)** — คลาสแรกที่มีจุดต่ำสุด(D) อยู่ตรงกลางอาชีพ ไม่ใช่ต้นเกม

---

## Utility Axis

**Monster Grimoire (lv1) ให้ Skill-Check-Layer จริง** (prof/double-prof ต่อ check เกี่ยวกับสัตว์ที่ถนัด) แต่ไม่มีสเปลล์เลย

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary(Magnitude)=ไม่มีกลไก(D, ไม่มีสเปลล์) → floor rule ล็อกทั้ง axis แม้ Monster Grimoire's Skill-Check-Layer จะมีจริงตั้งแต่ lv1 ก็ตาม (เหมือน pattern ของ Barbarian/Fighter/Gunslinger) |

**สรุปเกรด**: **D(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — Weapon Mastery (2 kinds, LR swap) → **Primary = B โดยตรง** (ยืนยัน cross-check ครั้งที่ 9)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary=B |
| 2-20 | **C** | **⚠️ ข้อยกเว้นแรกของ pattern B→A** — Resource Fungibility=**ต่ำกว่า**(ไม่มี shared resource pool เลยตลอดทั้งคลาส ทุกฟีเจอร์เป็น linear ไม่ผูก Battle/Focus/Risk Dice), Cross-Axis Coverage=เหนือกว่า(แตะ Damage/Utility/Action-Economy จาก lv2), Target-Type=ต่ำกว่า(เดี่ยวล้วน), Adaptability=ตรง → **2/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลง 1 ขั้นจาก B(Primary) เป็น C** |

**สรุปเกรด**: B(1) → **C(2-20)** — **มาร์เชียลที่มี Weapon Mastery ตัวแรกในระบบนี้ที่ไม่ไปถึง A**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-4) → C(5-10) → A(11-19) → **S(20)** |
| Control | D(1-19) → C(20) |
| Support | D(1-16) → C(17-20) |
| Survivability | B(1-13) → **A(14-20)** |
| Action Economy | C(1-4) → **D(5-10)** → C(11-20) |
| Utility | **D(1-20) flat** |
| Versatility | B(1) → **C(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **Extra Attack ล่าช้าถึง lv11 — ช้าที่สุดในระบบนี้จนถึงตอนนี้** — สร้าง Damage dip (B→C→A→S) และ Action Economy dip (C→D→C) ที่ชัดเจนกว่าคลาสอื่นทั้งหมด — คลาสแรกที่มีจุดต่ำสุดของ axis อยู่**ตรงกลางอาชีพ** (lv5-10) ไม่ใช่ต้นเกม
2. **⚠️ ข้อยกเว้นแรกของ pattern "Weapon Mastery → Versatility B→A"** — Monster Hunter มี Weapon Mastery เหมือนคลาสอื่น 8 คลาสก่อนหน้า แต่ **ไม่มี shared resource pool เลย** (ไม่มี Battle/Focus/Risk Dice หรือเทียบเท่า) ทำให้ Resource Fungibility ต่ำกว่า peer จริงๆ กดเกรดกลับลงเป็น C แทน A — พิสูจน์ว่า pattern ที่เคยเห็นซ้ำๆ ไม่ใช่กฎตายตัว ขึ้นกับโครงสร้างจริงของแต่ละคลาส
3. **"Creature-type restriction" เจอซ้ำเป็นครั้งที่ 2** (ต่อจาก Cleric's Turn Undead) — Monster Grimoire ผูกกับฟีเจอร์เกือบครึ่งคลาส (Improved Grimoire/Knowledgeable Defense/Lair Sense/Grave Strike) แต่ทุกอันจำกัดเฉพาะ 2-4 ประเภทสัตว์ที่เลือกไว้เท่านั้น — ยิ่งเพิ่มน้ำหนักว่าควรมีมิติจับเรื่องนี้ในอนาคต
4. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 16** (Survivability lv14-20) — สะสมสูงสุดต่อเนื่อง
5. **Support มาช้าที่สุดในระบบนี้ (lv17, Slayer's Aid)** — แม้แต่ Craftsman/Gunslinger ที่ D-flat ทั้งอาชีพยังไม่มีจุดปลดล็อกเลย ส่วน Monster Hunter อย่างน้อยก็มีจุดปลดล็อกที่ปลายเกมสุดๆ
