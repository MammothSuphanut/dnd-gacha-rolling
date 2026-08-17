# Paladin — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Paladin Subclass ที่ lv3/7/15/20 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-paladin.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 24 รายการ
**สถานะ**: คลาสที่ 20 ของชั้น 1 — **half-caster ตัวที่ 2** (Artificer ก่อนหน้า) — **Paladin คือคลาสที่ Anchor Rubric เองอ้างชื่อ "Aura of Protection" เป็นตัวอย่างเพดานที่ lv6 ตรงๆ** (Survivability's Save Reliability) และ "Paladin, Ranger" เป็นตัวอย่าง tier "กลาง" ของ Versatility — ไฟล์นี้ยืนยันทั้ง 2 จุดตรงกันเป๊ะ

⚠️ **หมายเหตุ**: 2024 เปลี่ยน casterProgression เป็นแบบ "artificer" (เร็วขึ้น 1 เลเวลจาก 2014) — ได้ slot ระดับ1 ตั้งแต่ **lv1 เลย** ไม่ใช่ lv2 แบบเดิม — Weapon Mastery (2 kinds, LR swap) ยืนยัน cross-check ครั้งที่ 10

---

## สรุป Chassis

**HD**: d10 (เหนือ peer d8 — Primary Survivability เริ่มที่ A) · **Save prof**: WIS/CHA · **Spellcasting**: CHA-based, half-caster (เพดาน 5th-level), สลับ 1 สเปลล์/Long Rest (tier "กลาง")

| Lv | Channel Divinity | Prepared Spells | Lay on Hands Pool | Milestone อื่น | EHP (d10+CON+3) |
|---|---|---|---|---|---|
| 1 | 0 | 2 | 5 | **Lay on Hands** (bonus action ฮีล ตัวเอง/ally จาก pool), **Spellcasting** (slot ระดับ1 เร็วขึ้น 1 เลเวล), **Weapon Mastery** | 13 |
| 2 | 0 | 3 | 10 | Fighting Style, **Paladin's Smite** (Divine Smite ฟรี 1/long rest) | 22 |
| 3 | 2 | 4 | 15 | *(Paladin Subclass — ยกเว้น)*, **Channel Divinity** (Divine Sense) | 31 |
| 4 | 2 | 5 | 20 | ASI | 40 |
| 5 | 2 | 6 | 25 | **Extra Attack**, Faithful Steed (Find Steed ฟรี) | 49 |
| 6 | 2 | 6 | 30 | **Aura of Protection** (CHA mod เข้า save ตัวเอง+ปาร์ตี้ 10ft) | 58 |
| 7 | 2 | 7 | 35 | *(Subclass feature — ยกเว้น)* | 67 |
| 8 | 2 | 7 | 40 | ASI | 76 |
| 9 | 2 | 9 | 45 | **Abjure Foes** (Channel Divinity: Wis save พลาด=Frightened+action-limit AoE ตาม CHA mod) | 85 |
| 10 | 2 | 9 | 50 | **Aura of Courage** (immune Frightened ในออร่า ตัวเอง+ปาร์ตี้) | 94 |
| 11 | 3 | 10 | 55 | **Radiant Strikes** (+1d8 radiant weapon rider ไม่มีเงื่อนไข) | 103 |
| 12 | 3 | 10 | 60 | ASI | 112 |
| 13 | 3 | 11 | 65 | — | 121 |
| 14 | 3 | 11 | 70 | **Restoring Touch** (Lay on Hands ลบ condition ได้: Blind/Charm/Deaf/Frighten/Paralyze/Stun) | 130 |
| 15 | 3 | 12 | 75 | *(Subclass feature — ยกเว้น)* | 139 |
| 16 | 3 | 12 | 80 | ASI | 148 |
| 17 | 3 | 14 | 85 | — | 157 |
| 18 | 3 | 14 | 90 | Aura Expansion (ออร่า 10ft→30ft) | 166 |
| 19 | 3 | 15 | 95 | Epic Boon | 175 |
| 20 | 3 | 15 | 100 | *(Subclass feature — ยกเว้น)* | 184 |

---

## Damage Axis

**Primary = Magnitude** — Extra Attack ตรงเวลา lv5 = matches peer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | B | matches peer — Paladin's Smite/Divine Smite เป็น burst เสริมแต่ไม่ใช่ flat stacking |
| 11-20 | **A** | **Radiant Strikes ปลดล็อก** — +1d8 radiant ไม่มีเงื่อนไขซ้อนบน weapon baseline ตรงๆ (pattern เดียวกับ Cleric's Blessed Strikes) → **A** |

**สรุปเกรด**: B(1-10) → **A(11-20)**

---

## Control Axis

**Primary = Severity** — Abjure Foes (lv9) คือกลไก Control เดียวในเบสคลาส

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-8 | D | ไม่มีกลไกเลย (Divine Sense เป็น detection ไม่ใช่ Control) = **D** |
| 9-20 | **B** | Abjure Foes: Frightened+จำกัดเหลือทำได้แค่ 1 อย่าง/เทิร์น (move/action/bonus action) = Tier2-3 ตรง peer พอสมควร — modifier: **Breadth=เหนือกว่า**(AoE ตาม CHA mod เทียบ peer's single-target), Frequency=ตรง, Stickiness=**ต่ำกว่า**(หลุดทันทีที่โดนดาเมจ อ่อนกว่า peer มาก), LR-bypass=ตรง, **Concentration Risk=เหนือกว่า**(ไม่ใช่ concentration) → 2/5 เหนือ ไม่ถึงเกณฑ์ ≥3/5 → คง **B** ตาม Primary |

**สรุปเกรด**: D(1-8) → **B(9-20)**

---

## Support Axis

**Primary = Magnitude** — Lay on Hands (lv1) เป็นกลไกจริงจากระดับแรกสุด แต่ Magnitude ต่อครั้งอ่อนกว่า peer จนกว่า Restoring Touch จะมา

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-5 | C | Lay on Hands: pool 5×level ต่อครั้งอ่อนกว่า peer's Cure-Wounds-tier(แม้จะยืดหยุ่นใช้ได้หลายครั้ง/วัน) = Primary **C** — modifier: Frequency=เหนือกว่า(ใช้ได้ตลอดวันจนกว่า pool หมด ไม่ใช่ slot-based), Concentration Risk=เหนือกว่า(instant) → 2/5 ยังไม่ถึงเกณฑ์ ≥3/5 → คง **C** |
| 6-13 | **B** | **Aura of Protection ปลดล็อก** (ผลตกทั้งปาร์ตี้ ไม่ใช่แค่ตัวเอง) — Breadth+Proactive ขยับเป็นเหนือกว่าเพิ่ม → tally: **4/5 เหนือกว่า ถึงเกณฑ์ไกล → ขยับขึ้น 1 ขั้นจาก C เป็น B** |
| 14-20 | **A** | **Restoring Touch ปลดล็อก** — ลบ condition ร้ายแรง(Paralyze/Stun/Charm ฯลฯ) ผ่าน Lay on Hands = เทียบเท่า Freedom-of-Movement-tier value → Primary เองขยับเป็น **B** ตรง peer + modifier ยังคง 4/5 เหนือกว่า → ขยับขึ้นอีก 1 ขั้นจาก B เป็น **A** |

**สรุปเกรด**: C(1-5) → **B(6-13)** → **A(14-20)**

---

## Survivability Axis

**Primary = Effective HP** (d10 เหนือ peer d8) = **A โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-5 | **B** | Primary=A — Lay on Hands เล็งตัวเองได้(Death Prevention เหนือกว่า) แต่ Mitigation/Debuff Resistance ยังไม่มีกลไก(D) → tally: 1 เหนือ/2 ต่ำ → 2/4 ต่ำ ถึงเกณฑ์ → ขยับลง 1 ขั้นเป็น **B** |
| 6-9 | **S** | **Aura of Protection ปลดล็อก (lv6 — ตัวอย่างเพดานที่ Anchor เองอ้างชื่อตรงๆ)** — Save Reliability ขยับเป็นเหนือกว่า → tally: **2 เหนือ(Death, Save)/1 ต่ำ(Debuff) ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก A(Primary) เป็น S** |
| 10-20 | = lv6-9 | **Aura of Courage ปลดล็อก (lv10)** — Debuff Resistance ขยับเป็นเหนือกว่าด้วย (3/4 เต็ม) แต่ cap ที่ +1 ขั้นอยู่แล้ว → คง **S** |

**สรุปเกรด**: B(1-5) → **S(6-20)** — ตรงกับที่ Anchor cite ไว้ว่า lv6 เป็นจุดเปลี่ยนใหญ่พอดี

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Primary=B — modifier: Bonus Action=เหนือกว่า(Lay on Hands lv1), Reaction=ไม่มีกลไก(D), Extra Action=ไม่มีกลไก(D), Resource-Conversion=ไม่มีกลไก(D) → 3/4 ต่ำ ถึงเกณฑ์ → ขยับลงจาก B เป็น **C ตลอด** (ไม่มีจุดปลดล็อกใหม่ตลอด 20 เลเวล) |

**สรุปเกรด**: **C(1-20) flat**

---

## Utility Axis

**Primary = Magnitude** — Divine Sense(lv3, detect celestial/fiend/undead+consecrated ground) เป็นกลไกจริงแต่แคบกว่า peer's Detect-Magic-tier — spell list ของ Paladin เน้น combat/buff มากกว่า Utility (ต่างจาก Cleric/Druid)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Divine Sense+สเปลล์ Utility ที่มีจำกัด ต่ำกว่า peer benchmark ตลอด (ไม่มี Skill-Check Layer เลยด้วย) = **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — ยืนยันจาก text จริง "replace one spell...whenever you finish a Long Rest" = tier **"กลาง"** (Anchor เองอ้างชื่อ Paladin/Ranger ไว้ตรงๆ ว่าเป็นตัวอย่างของ tier นี้) → **Primary = B โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **A** | Primary=B — Lay on Hands(ฮีล/ลบ poison/ลบ condition จาก pool เดียว)=Resource Fungibility เหนือกว่าตั้งแต่ lv1, Cross-Axis Coverage เหนือกว่า(Damage/Control/Support/Survivability/Action-Economy พร้อมกันจาก lv1-2) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A ตั้งแต่ lv1** |

**สรุปเกรด**: **A(1-20) flat**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-10) → A(11-20) |
| Control | D(1-8) → B(9-20) |
| Support | C(1-5) → B(6-13) → **A(14-20)** |
| Survivability | B(1-5) → **S(6-20)** |
| Action Economy | **C(1-20) flat** |
| Utility | **C(1-20) flat** |
| Versatility | **A(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **ยืนยันคำอธิบายของ Anchor Rubric เองตรงกันเป๊ะ 2 จุดพร้อมกัน** — Survivability กระโดดเป็น S ที่ lv6 พอดี (ตรงกับที่ Anchor cite "Aura of Protection (Paladin)" เป็นตัวอย่างเพดานที่ lv6 ตรงๆ), Versatility Primary=B จาก tier "กลาง" ตรงกับที่ Anchor cite ชื่อ "Paladin, Ranger" ไว้ตรงๆ — คลาสที่ 2 ต่อจาก Fighter ที่ไฟล์ทำหน้าที่ยืนยันความถูกต้องของ Anchor เอง
2. **Versatility เปิดที่ A ตั้งแต่ lv1 และไม่ขยับเลยตลอด 20 เลเวล** — คลาสที่ 2 ต่อจาก... (ไม่มีคลาสไหนก่อนหน้าเปิด A ตั้งแต่ lv1 แบบไม่มีจุดเปลี่ยนเลย ปกติต้องไต่จาก B/C ก่อน — Paladin เป็นคลาสแรกที่ Versatility นิ่งที่ A ตลอดทั้งอาชีพไม่มี milestone ให้ขยับต่อเพราะติด cap ตั้งแต่ lv1)
3. **Support ไต่ระดับ 3 ขั้นชัดเจน (C→B→A)** — ต่างจาก Cleric/Bard ที่กระโดดถึง S ท้ายเกม Paladin หยุดที่ A เพราะไม่มี Power-Word-Heal-tier capstone แต่ Aura+Restoring Touch ก็เพียงพอสำหรับ A ที่มั่นคง
4. **Action Economy/Utility ทั้งคู่ค้างที่ C ตลอด 20 เลเวลไม่มีจุดปลดล็อกเลย** — Paladin ทุ่มทรัพยากรไปที่ Survivability/Support/Versatility เป็นหลัก ไม่มีอะไรเหลือให้ Action Economy/Utility เติบโตต่อ
5. **ไม่มี tie-break 2-2 เกิดขึ้นเลยในไฟล์นี้** — เหมือน Gunslinger ครั้งก่อน (modifier เอียงชัดเจนพอในทุก axis ที่ตรวจ)
