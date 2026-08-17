# Martyr — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Martyr Subclass ที่ lv3/6/14/18 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Martyr", source: "ValdaSpire24"` — homebrew จาก *Valda's Spire of Secrets* — ยืนยัน `classFeaturesFull` ครบ 25 รายการ + `classSpells` array (55 สเปลล์ผูกกับคลาสตรงๆ ไม่มีปัญหา spell-list-gap)
**สถานะ**: คลาสที่ 15 ของชั้น 1 — **"blood magic paladin" — cast สเปลล์โดยเสีย HP ตัวเอง (Radiant damage) แทน slot ปกติ**, d12 (สูงสุดเท่า Barbarian), ธีม "การเสียสละตัวเองเพื่อคนอื่น"

⚠️ **หมายเหตุสำคัญ**: **Hit Point Spellcasting** — cast สเปลล์ทุกครั้งต้องรับ Radiant damage เอง (5→40 ตาม slot level) ก่อนสร้าง slot ชั่วคราวมาใช้ — ดาเมจนี้ทะลุ Resistance/Immunity/Temp HP ของตัวเอง — **"Healing Magic"**: ตีความว่า**ห้ามฮีลตัวเองผ่านสเปลล์เท่านั้น** (ฮีล ally ได้ปกติ — ตีความตาม class fantasy "เสียสละเพื่อคนอื่น" เพราะ spell list เต็มไปด้วยสเปลล์ฮีล ally เช่น Mass Cure Wounds/Revivify ที่ไม่มีความหมายถ้าฮีลใครไม่ได้เลย — บันทึกไว้เป็นข้อตีความเผื่อ user อยากพลิกกลับ) — **Max Slot Level เพดานที่ 5th ตลอดกาล** (cadence ช้ากว่า half-caster ปกติ 2 เลเวล: 1st@1, 2nd@5, 3rd@9, 4th@13, 5th@17) ทำให้ Control/Support ตกขบวน peer benchmark ถาวรกลางเกม (pattern เดียวกับ Channeler)

---

## สรุป Chassis

**HD**: d12 (สูงสุดในระบบนี้เท่า Barbarian — Primary Survivability เริ่มที่ A) · **Save prof**: STR/WIS · **Spellcasting**: WIS-based, HP-cost, prepared spells สลับ 1 ตัว/Long Rest (tier "กลาง")

| Lv | Prepared Spells | Max Slot Lv | Spell Uses | Milestone อื่น | EHP (d12+CON+3) |
|---|---|---|---|---|---|
| 1 | 2 | 1st | 2 | Armor of Faith, **Spellcasting** (HP-cost), **Weapon Mastery** | 15 |
| 2 | 3 | 1st | 2 | **Miraculous Healing** (bonus action self-heal HD), **Reprisal** (reaction ลดดาเมจครึ่ง+โต้กลับ 1d6→4d6) | 25 |
| 3 | 4 | 1st | 3 | *(Martyr Subclass — ยกเว้น)*, **Sacrifice** (Sacrificial Strike: +10→+20 dmg เสีย HP เอง / Sacrificial Skill: +5 test เสีย HP) | 35 |
| 4 | 5 | 1st | 3 | ASI | 45 |
| 5 | 6 | 2nd | 6 | **Extra Attack** | 55 |
| 6 | 6 | 2nd | 6 | *(Subclass feature — ยกเว้น)* | 65 |
| 7 | 7 | 2nd | 7 | Sacrifice Foe (ไม่เสีย HP ถ้า Sacrificial Strike ฆ่าเป้า) | 75 |
| 8 | 7 | 2nd | 7 | ASI | 85 |
| 9 | 8 | 3rd | 9 | Divine Respite (คืน HD 3 อัน/short-rest) | 95 |
| 10 | 8 | 3rd | 9 | **Undying** (ตก0HP→เหลือ1HP+ฟื้นฟรี, 1/long rest) | 105 |
| 11 | 10 | 3rd | 10 | **Improved Sacrificial Strike** (+20 dmg เสีย 10 HP) | 115 |
| 12 | 10 | 3rd | 10 | ASI | 125 |
| 13 | 11 | 4th | 11 | Divine Respite (6 HD) | 135 |
| 14 | 11 | 4th | 11 | *(Subclass feature — ยกเว้น)* | 145 |
| 15 | 12 | 4th | 12 | **March Unto Destiny** (immune Paralyzed/Petrified/Stunned) | 155 |
| 16 | 12 | 4th | 12 | ASI | 165 |
| 17 | 14 | 5th | 14 | Divine Respite (10 HD), Sacrificial Strike ครั้งแรก/เทิร์นฟรีไม่เสีย bonus action | 175 |
| 18 | 14 | 5th | 14 | *(Subclass feature — ยกเว้น)* | 185 |
| 19 | 15 | 5th | 15 | Epic Boon | 195 |
| 20 | 15 | 5th | 15 | **Final Martyrdom** (immune ทุกอย่าง 10นาที+adv ทุก test+Wish ฟรี แล้วตายถาวร) | 205 |

---

## Damage Axis

**Primary = Magnitude** — Sacrificial Strike (lv3+) เป็น flat rider ดาเมจก้อนใหญ่ (+10→+20) ที่ใช้ได้ทุกเทิร์นแลก HP ตัวเอง

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | B | matches peer (1 attack, ยังไม่มี Sacrifice) |
| 3-10 | **A** | **Sacrificial Strike ปลดล็อก** — +10 Radiant flat (เสีย 5 HP เอง) ซ้อนบน weapon baseline ตรงๆ ทุกเทิร์น เทียบเท่า Barbarian/Craftsman's stacking bonus pattern → **A** |
| 11-20 | **S** | **Improved Sacrificial Strike** — +20 Radiant (เสีย 10 HP) ผสาน Extra Attack(lv5) = ดาเมจรวมแตะระดับเดียวกับ Fighter's 3-attack outlier — **S** |

**สรุปเกรด**: B(1-2) → **A(3-10)** → **S(11-20)**

---

## Control Axis

**Primary = Severity**. Spell list มี Hold Person/Hold Monster/Banishment (Tier4 จริง) แต่ Max Slot Level เพดาน 5th ทำให้มาถึงช้ากว่า peer 2 เลเวล

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | C | Command (1st, Tier2) — ต่ำกว่า peer's Tier4 = **C** |
| 5-20 | **B** | **Hold Person ปลดล็อก (2nd-tier, lv5 — ช้ากว่า peer's lv3 benchmark 2 เลเวล)** — Tier4 ตรง peer ในที่สุด = **B** — modifier ไม่พอขยับต่อ (ไม่มี Mass-Suggestion-tier LR-bypass/no-concentration ceiling เพราะเพดาน 5th-level ตัดไม่ให้ไปถึง) |

**สรุปเกรด**: C(1-4) → **B(5-20)** — เหมือน Cleric's shape แต่มาช้ากว่า 2 เลเวลตลอด

---

## Support Axis

**Primary = Magnitude** — spell list มี Cure Wounds/Aid/Prayer of Healing/Death Ward/Freedom of Movement/Mass Cure Wounds/Revivify/Raise Dead ครบเซ็ตระดับ Cleric-tier (ฮีล ally ได้ปกติตามการตีความ "Healing Magic")

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | ตรง peer benchmark ในเชิงตัวเลข แต่มาช้ากว่า 2 เลเวลตลอด + เพดาน 5th-level กันไม่ให้ไต่ถึง Mass-Heal/Power-Word-Heal-tier ท้ายเกมได้เลย (pattern เดียวกับ Channeler) → **B flat ตลอด** ไม่มีทรัพยากรคู่ขนานแบบ Divine Spark/Bardic Inspiration มาดันขึ้น A/S |

**สรุปเกรด**: **B(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d12 — เหนือ peer มากที่สุดในระบบนี้เท่า Barbarian) = **A โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary=A — modifier ยังไม่มีอะไรปลดล็อก → 3/4 ต่ำกว่า(Mitigation/Debuff/Death=D) → ขยับลง 1 ขั้นเป็น **B** |
| 2-20 | **S** | **Reprisal+Miraculous Healing ปลดล็อกพร้อมกัน (lv2)** — Reprisal(reaction ลดดาเมจครึ่งหนึ่งทุกครั้งที่โดนตี ประชิด)=Mitigation เหนือกว่าอย่างชัดเจน, Miraculous Healing(bonus action self-heal จริงจัง)=Death Prevention เหนือกว่า → **2/4 เหนือกว่าทันทีที่ lv2 ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก A(Primary) เป็น S** — **คลาสแรกในระบบนี้ที่แตะ S ใน Survivability** (March Unto Destiny lv15 เพิ่ม Debuff Resistance เป็นเหนือกว่าด้วยแต่ cap ที่ +1 ขั้นอยู่แล้ว) |

**สรุปเกรด**: B(1) → **S(2-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | modifier ทั้ง 4 ยังไม่มีกลไก(D) → ขยับลงจาก B เป็น **C** |
| 2 | **B** | Miraculous Healing+Sacrificial-Strike(ยังไม่มา lv3)=Bonus Action เหนือกว่า, Reprisal=Reaction เหนือกว่า → tally: **2 เหนือ/2 ต่ำ(Extra Action, Resource-Conversion) — เสมอกัน (ครั้งที่ 14!)** ⚠️ net cancellation → กลับ Primary(B) |
| 3-20 | **A** | **Sacrifice ปลดล็อก** — Sacrificial Skill(เสีย HP แลก+5 test โดยไม่เสีย action)=Resource-to-Action Conversion เหนือกว่า → tally: **3 เหนือ(Bonus Action, Reaction, Resource-Conversion)/1 ต่ำ(Extra Action)** → ถึงเกณฑ์ → **ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: C(1) → B(2) → **A(3-20)**

---

## Utility Axis

**Primary = Magnitude** — spell list มี Detect Magic/Augury/Speak with Dead/Locate Creature/Divination/Commune/Tongues/Zone of Truth ครบพอสมควร แต่มาช้ากว่า peer 2 เลเวลตลอด+เพดาน 5th-level

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Primary มีกลไกจริงตลอดแต่ต่ำกว่า peer เพราะมาช้า+เพดานตัด — Sacrificial Skill ให้ Skill-Check-Layer จริง(เสีย HP แลก+5 ต่อ test พลาด) แต่ 1/4 ไม่พอขยับ → คง **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — "replace one spell...when you finish a Long Rest" = tier **"กลาง"** ตรงตัว → **Primary = B โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary=B |
| 2-20 | **A** | **HP เดียวเป็นทรัพยากรกลางที่ป้อนทั้งสเปลล์+Miraculous Healing+Sacrifice** = Resource Fungibility เหนือกว่ามาก (ตัวอย่างที่รวมศูนย์ที่สุดเท่าที่เจอมา), Cross-Axis Coverage เหนือกว่า(แตะ Damage/Control/Support/Survivability/Action-Economy พร้อมกันจาก lv2-3) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-2) → A(3-10) → **S(11-20)** |
| Control | C(1-4) → B(5-20) |
| Support | **B(1-20) flat** |
| Survivability | B(1) → **S(2-20)** |
| Action Economy | C(1) → B(2) → **A(3-20)** |
| Utility | **C(1-20) flat** |
| Versatility | B(1) → **A(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **คลาสแรกในระบบนี้ที่แตะ S ใน Survivability** — d12 บวก Reprisal(Mitigation)+Miraculous Healing(Death Prevention) ปลดล็อกพร้อมกันตั้งแต่ lv2 ดันเกรดขึ้น S ทันที (Barbarian ที่ก็มี d12 เหมือนกันต้องรอถึง lv11 ถึงจะแตะ S ผ่าน Relentless Rage) — Martyr ทำได้เร็วกว่ามาก
2. **HP-cost spellcasting เป็นกลไกที่ไม่เคยเจอมาก่อน** — ทุกสเปลล์ต้องรับ Radiant damage เอง (ทะลุ resistance/immunity/temp HP) แทนการเสีย slot ปกติ — สร้างความเสี่ยงจริงที่ผูกกับ Damage/Control/Support ทั้ง 3 axis พร้อมกัน (ยิ่ง cast แรงยิ่งเจ็บตัวเอง) แต่ d12+Miraculous Healing+Divine Respite ก็ออกแบบมาให้รองรับความเสี่ยงนี้ได้พอดี — ไม่มีมิติไหนใน 6-มิติเดิมจับ "ต้นทุน HP ของการ cast" ได้ตรงๆ (คล้ายกับช่องโหว่ LR-bypass/creature-type-restriction ที่เจอมาก่อน) — flag ไว้เป็นข้อสังเกตแต่ไม่กระทบเกรดที่ให้ไปเพราะ d12+self-heal ชดเชยพอ
3. **Max Slot Level เพดาน 5th (cadence ช้ากว่า peer 2 เลเวลตลอด) — pattern เดียวกับ Channeler** — Control/Support/Utility ทั้ง 3 axis ตกขบวน peer benchmark ถาวรกลางเกม แม้ตัวเลขจริง (Hold Person ที่ lv5) จะตรง peer's Tier4 พอดีก็ตาม
4. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 14** (Action Economy lv2) — สะสมมากที่สุดเท่าที่เคยมีมาในระบบนี้ ยิ่งตอกย้ำความจำเป็นต้องฟอร์มัลไลซ์กฎเข้า Anchor Rubric
5. **ข้อตีความ "Healing Magic" restriction**: ตัดสินใจว่าห้ามฮีลตัวเองผ่านสเปลล์เท่านั้น (ฮีล ally ได้ปกติ) ตามธีม class fantasy — เป็นการตีความ ไม่ใช่ข้อความชัดเจน 100% บันทึกไว้เผื่อ user อยากพลิกกลับ (ถ้าตีความว่าห้ามฮีลใครเลย Support จะร่วงลงมาเป็น D-ish ทันที)
6. **Damage เข้าเกรด S เร็วที่สุดเท่าที่เจอมา (lv11 ผ่าน Improved Sacrificial Strike)** — ไม่ต้องรอ capstone lv17-20 แบบ Barbarian/Craftsman/Dancer/Gunslinger — Sacrificial Strike เป็น flat-rider ทุกเทิร์นไม่ใช่ nova ครั้งเดียว/วัน ทำให้ sustained DPR สูงกว่าคลาส "nova ปลายเกม" ตัวอื่นๆ ตลอดทั้งอาชีพหลัง lv11
