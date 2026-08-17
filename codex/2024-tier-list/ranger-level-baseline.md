# Ranger — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Ranger Subclass ที่ lv3/7/11/15 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-ranger.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 23 รายการ
**สถานะ**: คลาสที่ 21 ของชั้น 1 — **half-caster ตัวที่ 3** (Artificer, Paladin ก่อนหน้า) — **คลาสแรกในระบบนี้ที่ทั้ง 7 axis เป็น flat ตลอด 20 เลเวลไม่มี milestone shift เลยสักแกน** — สะท้อนภาพลักษณ์ "generalist ไม่มีจุดเด่นพิเศษ" ที่ Ranger มักถูกวิจารณ์ในวงการจริง

⚠️ **หมายเหตุ**: Expertise รอบ 2 (lv9) ตรงกับที่ Anchor เองอ้างชื่อ "Ranger" ไว้ตรงๆ ในตาราง Utility Anchor พอดี — ยืนยันจุดนี้ตรงกัน

---

## สรุป Chassis

**HD**: d10 (เหนือ peer d8 — Primary Survivability เริ่มที่ A) · **Save prof**: STR/DEX · **Spellcasting**: WIS-based, half-caster (เพดาน 5th-level, slot ระดับ1 เร็วขึ้น 1 เลเวลแบบ Paladin), สลับ 1 สเปลล์/Long Rest (tier "กลาง")

| Lv | Favored Enemy uses | Prepared Spells | Milestone อื่น | EHP (d10+CON+3) |
|---|---|---|---|---|
| 1 | 2 | 2 | **Favored Enemy** (Hunter's Mark ติดตัวฟรี, cast ฟรี 2 ครั้ง/rest), **Spellcasting**, **Weapon Mastery** | 13 |
| 2 | 2 | 3 | **Deft Explorer** (Expertise ×1 + 2 ภาษา), Fighting Style | 22 |
| 3 | 2 | 4 | *(Ranger Subclass — ยกเว้น)* | 31 |
| 4 | 2 | 5 | ASI | 40 |
| 5 | 3 | 6 | **Extra Attack** | 49 |
| 6 | 3 | 6 | Roving (+10ft speed+climb+swim — ไม่นับ axis ไหน) | 58 |
| 7 | 3 | 7 | *(Subclass feature — ยกเว้น)* | 67 |
| 8 | 3 | 7 | ASI | 76 |
| 9 | 4 | 9 | **Expertise รอบ 2** (×2 เพิ่ม — ตรง milestone ที่ Anchor cite ชื่อ Ranger ไว้) | 85 |
| 10 | 4 | 9 | **Tireless** (Magic action self temp HP=1d8+Wis, Wis-mod ครั้ง/rest + ลด Exhaustion 1 ระดับ/short-rest) | 94 |
| 11 | 4 | 10 | *(Subclass feature — ยกเว้น)* | 103 |
| 12 | 4 | 10 | ASI | 112 |
| 13 | 5 | 11 | Relentless Hunter (ดาเมจไม่ตัด concentration ของ Hunter's Mark) | 121 |
| 14 | 5 | 11 | Nature's Veil (bonus action self-invisible, Wis-mod ครั้ง/rest) | 130 |
| 15 | 5 | 12 | *(Subclass feature — ยกเว้น)* | 139 |
| 16 | 5 | 12 | ASI | 148 |
| 17 | 6 | 14 | Precise Hunter (adv โจมตีเป้าที่ mark) | 157 |
| 18 | 6 | 14 | Feral Senses (blindsight 30ft) | 166 |
| 19 | 6 | 15 | Epic Boon | 175 |
| 20 | 6 | 15 | Foe Slayer (Hunter's Mark die 1d6→1d10) | 184 |

---

## Damage Axis

**Primary = Magnitude** — Extra Attack ตรงเวลา lv5 = matches peer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | matches peer ตลอด — Hunter's Mark(+1d6→1d10 lv20) เป็นดาเมจเสริมจริงแต่**ผูก concentration+เป้าเดียว** (Conditionality จริง แม้ Relentless Hunter lv13 จะลดความเสี่ยง concentration ก็ยังเหลือ "เป้าเดียว" อยู่ดี) → modifier: Burst=เหนือกว่าเล็กน้อย 1/4 ไม่พอขยับ → คง **B ตลอด 20 เลเวล** |

**สรุปเกรด**: **B(1-20) flat**

---

## Control Axis

**Primary = Severity** — สมมติฐาน spell list ธีม battlefield-control (Ensnaring Strike/Spike Growth-tier) เพดานแค่ Restrained (Tier3) เหมือน Druid ไม่มี Hold-Person-tier จริง

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | มีกลไกจริงตลอด (Ensnaring Strike-tier) แต่ไม่เคยถึง Tier4 peer benchmark = **C** (pattern เดียวกับ Druid) |

**สรุปเกรด**: **C(1-20) flat**

---

## Support Axis

**Primary = Magnitude** — Cure Wounds แนะนำเริ่มต้นจริง (ยืนยันจาก text) แต่ spell list โดยรวมเบากว่า Cleric/Bard/Druid มาก ไม่มีทรัพยากรคู่ขนานเลย

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Cure Wounds-tier ตรง peer ที่ lv1 แต่ spell list Support โดยรวมบางกว่า peer มากในระยะยาว ไม่มี Divine-Spark/Lay-on-Hands-equivalent มาดันขึ้น = **C ตลอด** |

**สรุปเกรด**: **C(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d10 เหนือ peer d8) = **A โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-9 | **B** | Primary=A — modifier: Mitigation=ไม่มีกลไก(D), Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D) → 2/4 ต่ำ ถึงเกณฑ์ → ขยับลง 1 ขั้นเป็น **B** |
| 10-20 | = lv1-9 | **Tireless ปลดล็อก** — Death Prevention เหนือกว่า(self temp HP) → tally: 1 เหนือ/2 ต่ำ ยังไม่พอกลับขึ้น (ต้อง ≥2 เหนือ) → คง **B** |

**สรุปเกรด**: **B(1-20) flat** — ไม่มี Aura-of-Protection-tier feature แบบ Paladin มาดันเป็น S

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-13 | **C** | Primary=B — modifier ทั้ง 4 ไม่มีกลไก(D) → 4/4 ต่ำ → ขยับลงเป็น **C** |
| 14-20 | = lv1-13 | **Nature's Veil ปลดล็อก** — Bonus Action เหนือกว่า → tally: 1 เหนือ/3 ต่ำ ยังไม่พอกลับ → คง **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Utility Axis

**Primary = Magnitude** — spell list ตรง peer (Speak with Animals/Locate Animals-tier) — **Expertise ×3 รวม (lv2+lv9) ตรง milestone ที่ Anchor cite ชื่อ Ranger ไว้เป๊ะ**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | Primary ตรง peer — Skill-Check Layer=เหนือกว่า(Expertise) แต่เป็นมิติเดียวที่เหนือ 1/4 ไม่พอขยับเดี่ยวๆ → คง **B** |

**สรุปเกรด**: **B(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — ยืนยันจาก text จริง "replace one spell...whenever you finish a Long Rest" = tier **"กลาง"** (Anchor เองอ้างชื่อ "Paladin, Ranger" ไว้ตรงๆ) → **Primary = B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Primary=B — modifier: **Resource Fungibility=ต่ำกว่า**(ไม่มี shared pool แบบ Lay-on-Hands/Divine-Spark เลย), Cross-Axis Coverage=ตรง(2-3 axis เท่านั้น), **Target-Type=ต่ำกว่า**(เดี่ยวล้วน ไม่มี AoE), Adaptability=ตรง → **2/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลง 1 ขั้นจาก B(Primary) เป็น C** |

**สรุปเกรด**: **C(1-20) flat** — ตัดกับ Paladin (Versatility=A) ทั้งที่ tier "กลาง" เหมือนกัน เพราะ Ranger ไม่มีทรัพยากรคู่ขนานที่ fungible เลย

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | **B(1-20) flat** |
| Control | **C(1-20) flat** |
| Support | **C(1-20) flat** |
| Survivability | **B(1-20) flat** |
| Action Economy | **C(1-20) flat** |
| Utility | **B(1-20) flat** |
| Versatility | **C(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **คลาสแรกในระบบนี้ที่ทั้ง 7 axis เป็น flat ตลอด 20 เลเวล ไม่มี milestone shift เลยสักแกน** — ทุกคลาสก่อนหน้ามีอย่างน้อย 1-2 axis ที่มีจุดเปลี่ยนชัดเจน (มักมาจาก Extra Attack lv5 หรือฟีเจอร์กลางเกม lv6-9) — Ranger's chassis ไม่มีฟีเจอร์ไหนแรงพอจะข้าม tie-break threshold เลยตลอดทั้งอาชีพ — สะท้อนภาพลักษณ์จริงของ Ranger ในวงการ D&D ว่าเป็น "generalist ไม่มีจุดเด่นเฉพาะทาง" ได้ตรงมาก
2. **Versatility ตัดกับ Paladin ชัดเจนแม้ tier "กลาง" เหมือนกัน** — Paladin มี Lay on Hands (fungible pool) ดัน Versatility ถึง A ตั้งแต่ lv1 แต่ Ranger ไม่มีทรัพยากรคู่ขนานแบบนั้นเลย ทำให้ modifier กลับเป็นลบสุทธิ กดลงเหลือ C — พิสูจน์ว่า Primary tier เดียวกันไม่ได้แปลว่าเกรดสุดท้ายเท่ากันเสมอ
3. **Expertise รอบ 2 (lv9) ตรงกับที่ Anchor cite ชื่อ Ranger ไว้เป๊ะ** — ยืนยันความถูกต้องของ Anchor Rubric ต่อเนื่องจาก Fighter/Paladin
4. **ไม่มี tie-break 2-2 เกิดขึ้นเลยในไฟล์นี้** — ครั้งที่ 3 ติดต่อกัน (Gunslinger, Paladin, Ranger) ที่ modifier เอียงชัดพอไม่เกิดเสมอ — อาจสะท้อนว่าคลาส official XPHB ล่าสุด (Paladin/Ranger) ออกแบบ modifier ให้เอียงชัดกว่า homebrew ที่มักสร้าง tie บ่อยกว่า
