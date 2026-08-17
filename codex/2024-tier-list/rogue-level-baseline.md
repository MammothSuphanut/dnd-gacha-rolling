# Rogue — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Rogue Subclass ที่ lv3/9/13/17 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-rogue.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 32 รายการ
**สถานะ**: คลาสที่ 22 ของชั้น 1 — **Rogue คือคลาสที่ Anchor Rubric เองสร้าง track เฉพาะให้ใน Damage axis** (weapon+Sneak Attack, ไม่บวก mod) **และอ้างชื่อเป็นตัวอย่างเพดานถึง 4 จุด** (Uncanny Dodge, Evasion, Reliable Talent, Expertise lv1/lv6) — ไฟล์นี้ยืนยันตัวเลขทุกจุดตรงกับที่ Anchor เขียนไว้

⚠️ **ข้อค้นพบที่ Striking ที่สุดในไฟล์นี้ — Utility=D-flat ทั้งที่ Anchor เองเรียก Rogue ว่า "Utility specialist ตัวจริง"**: ดูรายละเอียดในหัวข้อ Utility Axis ด้านล่าง — floor rule ล็อก D เพราะ Magnitude(Primary)=ไม่มีสเปลล์เลย แม้ Reliable Talent+Expertise×4 จะแรงแค่ไหนก็ตาม

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: DEX/INT · **ไม่มีสเปลล์คาสติ้งเลย**

| Lv | Sneak Attack Die | Expertise (รวม) | Cunning Strike Menu | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|
| 1 | 1d6 | 2 | — | **Expertise**, **Sneak Attack**, Thieves' Cant, **Weapon Mastery** | 11 |
| 2 | 1d6 | 2 | — | **Cunning Action** (bonus action Dash/Disengage/Hide) | 19 |
| 3 | 2d6 | 2 | — | *(Rogue Subclass — ยกเว้น)*, **Steady Aim** (bonus action self-adv, speed=0) | 27 |
| 4 | 2d6 | 2 | — | ASI | 35 |
| 5 | 3d6 | 2 | Poison/Trip/Withdraw | **Cunning Strike** (สละ sneak dice แลกเอฟเฟกต์), **Uncanny Dodge** | 43 |
| 6 | 3d6 | 4 | = lv5 | Expertise รอบ 2 (×2 เพิ่ม) | 51 |
| 7 | 4d6 | 4 | = lv5 | **Evasion**, **Reliable Talent** | 59 |
| 8 | 4d6 | 4 | = lv5 | ASI | 67 |
| 9 | 5d6 | 4 | = lv5 | *(Subclass feature — ยกเว้น)* | 75 |
| 10 | 5d6 | 4 | = lv5 | ASI | 83 |
| 11 | 6d6 | 4 | = lv5 | **Improved Cunning Strike** (ใช้ 2 เอฟเฟกต์พร้อมกัน) | 91 |
| 12 | 6d6 | 4 | = lv5 | ASI | 99 |
| 13 | 7d6 | 4 | = lv5 | *(Subclass feature — ยกเว้น)* | 107 |
| 14 | 7d6 | 4 | +Daze/Obscure/**Knock Out** | **Devious Strikes** (Knock Out=Unconscious จริง!) | 115 |
| 15 | 8d6 | 4 | = lv14 | Slippery Mind (prof WIS+CHA save) | 123 |
| 16 | 8d6 | 4 | = lv14 | ASI | 131 |
| 17 | 9d6 | 4 | = lv14 | *(Subclass feature — ยกเว้น)* | 139 |
| 18 | 9d6 | 4 | = lv14 | Elusive (ไม่มีใครได้ adv ใส่เราเลย) | 147 |
| 19 | 10d6 | 4 | = lv14 | Epic Boon | 155 |
| 20 | 10d6 | 4 | = lv14 | Stroke of Luck (พลาด d20 test → เปลี่ยนเป็น 20) | 163 |

---

## Damage Axis

**Primary = Magnitude** — ใช้ **Rogue track ที่ Anchor เขียนไว้เฉพาะสำหรับคลาสนี้โดยตรง** (finesse weapon 1d6+3 + Sneak Attack ไม่บวก mod)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-6 | B | Magnitude ตรง/สูงกว่า peer เล็กน้อยตามตาราง Anchor เอง — modifier: **Conditionality=ต่ำกว่า**(ต้อง advantage หรือ ally ประชิดเป้า) 1/4 ไม่พอขยับ → คง **B** |
| 7-16 | **A** | Magnitude **แซง peer's static 2-attack(~17)** ตามที่ Anchor เองระบุไว้ตรงๆ ("Rogue แซง Magnitude ทุกคนตั้งแต่กลางเกม") → **A** — Conditionality ยังต่ำกว่าอยู่ (1/4) แต่ Primary เองสูงพอไม่ต้องพึ่ง modifier |
| 17-20 | **S** | Magnitude ~38-42 **แซง Fighter's 4-attack outlier(~34)** ตามที่ Anchor เขียนไว้ตรงๆ ที่ lv19 ("Rogue แซงทุกคน") → **S** |

**สรุปเกรด**: B(1-6) → **A(7-16)** → **S(17-20)** — ตรงกับคำอธิบายของ Anchor เองทุกจุด

---

## Control Axis

**Primary = Severity** — Cunning Strike เมนูขยายจาก Poison/Trip/Withdraw(lv5) เป็น +Daze/Obscure/**Knock Out**(lv14)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | D | ไม่มีกลไก Control เลย = **D** |
| 5-13 | **C** | Trip(Prone, Tier2)/Poison(Poisoned, Tier1-2) — ต่ำกว่า peer's Tier4 = **C** |
| 14-20 | **B** | **Knock Out ปลดล็อก — Unconscious จริง (Tier4 เต็มรูปแบบ) ตรง peer's benchmark เป๊ะ** (แลก 6d6 sneak dice, ต้นทุนสูงแต่ผลลัพธ์เทียบเท่า Sleep/Hold Monster) = **B** |

**สรุปเกรด**: D(1-4) → C(5-13) → **B(14-20)**

---

## Support Axis

ไม่มีกลไกเล็ง ally เลยแม้แต่จุดเดียว (ally-adjacent เป็นแค่เงื่อนไข trigger Sneak Attack ไม่ใช่ผลที่ ally ได้)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไก Support เลยตลอด 20 เลเวล = **D flat** |

**สรุปเกรด**: **D(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-6 | **C** | Primary=B — modifier: Mitigation=ไม่มีกลไก(D)จนถึง lv5, Save Reliability=ตรง, Debuff Resistance=ไม่มีกลไก(D)จนถึง lv7, Death Prevention=ไม่มีกลไกเลย(D ตลอดกาล) → 2-3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลงเป็น **C** |
| 7-14 | **A** | **Uncanny Dodge(lv5, ตัวอย่างเพดานที่ Anchor เองอ้างชื่อตรงๆ)+Evasion(lv7, ตัวอย่างเพดานอีกจุด)** ปลดล็อกครบ — Mitigation+Debuff Resistance ขยับเป็นเหนือกว่าพร้อมกัน → tally: **2 เหนือ/1 ต่ำ(Death Prevention) ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B(Primary) เป็น A** |
| 15-20 | = lv7-14 | Slippery Mind(lv15, prof WIS+CHA save) เพิ่ม Save Reliability เป็นเหนือกว่าด้วย (3/4 เต็ม) แต่ cap +1 ขั้น → คง **A** |

**สรุปเกรด**: C(1-6) → **A(7-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | **D** | modifier: Bonus Action=เหนือกว่า(Cunning Action lv2, ตัวอย่างที่ Anchor เองอ้างชื่อ), Reaction/Extra Action/Resource-Conversion=ยังไม่มี(D) → 3/4 ต่ำ ถึงเกณฑ์ → ขยับลงจาก C เป็น **D** |
| 5-20 | **B** | **Uncanny Dodge(Reaction)+Cunning Strike(Resource-to-Action Conversion จริง — แปลง sneak dice เป็นเอฟเฟกต์โดยไม่เสีย action เพิ่ม)** ปลดล็อกพร้อมกัน → tally: **3 เหนือ(Bonus Action, Reaction, Resource-Conversion)/1 ต่ำ(Extra Action)** → ถึงเกณฑ์ → **ขยับขึ้น 1 ขั้นจาก C(Primary) เป็น B** |

**สรุปเกรด**: D(1-4) → **B(5-20)**

---

## Utility Axis

**Primary = Magnitude** — ⚠️ **ข้อค้นพบ striking ที่สุดในไฟล์นี้**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary(Magnitude)=ไม่มีสเปลล์ Reveal-Info/Solve-Problem เลย = **D** → **floor rule ล็อกทั้ง axis ที่ D** แม้จะมี **Expertise (lv1+lv6, ×4 รวม — ตรง milestone ที่ Anchor เองอ้างชื่อ Rogue ไว้เป็นจุดเปลี่ยนแรกของ Skill-Check Layer)** และ **Reliable Talent (lv7 — ตรง milestone ที่ Anchor cite ชื่อ Rogue ไว้เป็น "จุดเปลี่ยน" ของมิตินี้โดยตรง)** ก็ตาม — **Anchor เองเขียนไว้ในบท finding ว่า "Rogue เป็น Utility specialist ที่ไม่มีสเปลล์ตัวจริง" แต่ระบบให้เกรด D-flat เพราะ floor rule สนใจแค่ Primary(Magnitude)=D เท่านั้น ไม่สนใจว่า Skill-Check Layer จะแรงระดับไหน** — เป็นข้อขัดแย้งตรงๆ ระหว่างคำอธิบายของ Anchor เองกับผลลัพธ์เชิงกลไกของระบบนี้ — ครั้งที่ 3 ของ pattern "floor rule ทำลายจุดเด่นที่แท้จริงของคลาส" ต่อจาก Sacred Knight(Versatility)/Monk(Versatility) |

**สรุปเกรด**: **D(1-20) flat** ⚠️

---

## Versatility Axis

**Primary = Loadout Flexibility** — ไม่มีสเปลล์ แต่ Weapon Mastery (2 kinds, LR swap) → floor-escape → **Primary = B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | **C** | Primary=B — modifier: Resource Fungibility=ยังไม่มี(D, Cunning Strike ยังไม่มา), Cross-Axis Coverage=ตรง, Target-Type=ต่ำกว่า(เดี่ยว) → 2/4 ต่ำ ถึงเกณฑ์ → ขยับลงจาก B เป็น **C** |
| 5-20 | **A** | **Cunning Strike ปลดล็อก** — Resource Fungibility เหนือกว่ามาก(sneak dice แปลงเป็น Damage/Control/Action-Economy ได้หมด), Adaptability Under Pressure เหนือกว่า(เลือกเอฟเฟกต์ต่อเทิร์นได้) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B(Primary) เป็น A** |

**สรุปเกรด**: C(1-4) → **A(5-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-6) → A(7-16) → **S(17-20)** |
| Control | D(1-4) → C(5-13) → **B(14-20)** |
| Support | **D(1-20) flat** |
| Survivability | C(1-6) → **A(7-20)** |
| Action Economy | D(1-4) → **B(5-20)** |
| Utility | **D(1-20) flat** ⚠️ |
| Versatility | C(1-4) → **A(5-20)** |

---

## ข้อค้นพบสำคัญ

1. **⚠️ Utility=D-flat ทั้งที่ Anchor เองเรียก Rogue ว่า "Utility specialist ตัวจริง" — ครั้งที่ 3 ของ pattern floor-rule-ขัดกับ-ตัวตนคลาส** (ต่อจาก Sacred Knight/Monk's Versatility) — Expertise×4+Reliable Talent ตรง milestone ที่ Anchor cite ชื่อ Rogue ไว้เองทุกจุด แต่ floor rule ยังคงล็อก D เพราะ Magnitude(ไม่มีสเปลล์)=D — ยืนยันหนักแน่นว่าระบบนี้มีช่องว่างเชิงโครงสร้างจริงจังระหว่าง "axis ที่คลาสหนึ่งขับเคลื่อนด้วย Modifier ล้วนๆ" กับ "axis ที่ Primary คือตัวตัดสินหลักเสมอ" — ควรพิจารณาทบทวน Anchor ในรอบทำงานถัดไปอย่างจริงจัง (3 ข้อมูลจุดตอนนี้ก็มากพอ)
2. **Damage/Control ทั้งคู่ยืนยันคำอธิบายของ Anchor ตรงกันทุกคำ** — Magnitude แซง peer กลางเกม(lv7)และแซงทุกคนปลายเกม(lv19)ตามที่ Anchor เขียนไว้เป๊ะ, Knock Out(lv14)ให้ Unconscious จริง (Tier4) ตรง peer benchmark
3. **Survivability แตะ A ผ่านตัวอย่างเพดานที่ Anchor เองอ้างชื่อถึง 3 จุด** (Uncanny Dodge, Evasion, Reliable Talent แม้ Reliable Talent จะอยู่ใน Utility ก็ตาม) — คลาสที่ไฟล์ยืนยัน Anchor มากที่สุดเท่าที่ทำมา ต่อจาก Fighter/Paladin/Monk
4. **ไม่มี tie-break 2-2 เกิดขึ้นเลยในไฟล์นี้** — ครั้งที่ 4 ติดต่อกัน (Gunslinger, Paladin, Ranger, Rogue) ยืนยันว่าคลาส official XPHB รุ่นล่าสุดออกแบบ modifier ให้เอียงชัดกว่า homebrew อย่างสม่ำเสมอ
