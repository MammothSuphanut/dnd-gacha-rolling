# Warlock — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Warlock Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `src/data/5etools/official/class/class-warlock.json` entry `source: "XPHB"` (official) — ยืนยัน `classFeature` array ครบ 19 รายการ + Eldritch Invocation options (28 ตัว) ยืนยันจากรายชื่อในไฟล์
**สถานะ**: คลาสที่ 27 ของชั้น 1 — **full caster ตัวที่ 6** — **Pact Magic คือระบบ slot ที่ไม่เหมือนคลาสไหนเลย** (slot น้อยแต่ระดับสูงสุดเสมอ + คืนด้วย Short Rest ไม่ใช่ Long Rest) — d8 HD ตรง peer

⚠️ **หมายเหตุสำคัญ 2 ข้อ**:

1. **Agonizing Blast** (Eldritch Invocation, ไม่มีเงื่อนไขเลเวล) ตั้งสมมติฐานว่าเลือกจาก lv1 (เป็น invocation ที่ถูกแนะนำ/เลือกใช้มากที่สุดในทางปฏิบัติแทบทุก build จนถือเป็น "มาตรฐานพฤตินัย") — เพิ่ม CHA mod เข้าดาเมจ Eldritch Blast **แหกกฎ "cantrip ไม่บวก mod" ของ peer โดยตรง** → ดัน Damage Primary ขึ้นตั้งแต่ lv1 — **invocation อื่นๆ (Fiendish Vigor/Armor of Shadows/Thirsting Blade ฯลฯ) ปฏิบัติ track-neutral** (ไม่ commit เข้าเกรด) เพราะไม่มี consensus ชัดเท่า Agonizing Blast
2. **Action Economy=D-flat ทั้ง 20 เลเวล** — ต่างจาก Cleric ที่ modifier tally ก็ D-flat เหมือนกันแต่ Warlock ไม่มีแม้แต่ modifier เดียวที่พอจะเถียงได้เลย (Magical Cunning ใช้เวลา 1 นาทีเต็ม ไม่ใช่ instant-action-economy-trick)

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: WIS/CHA · **Spellcasting**: CHA-based, **Pact Magic** (slot 1-4 ลูก แต่ระดับสูงสุดเสมอตามตาราง, คืนด้วย Short Rest), สลับ 1 สเปลล์/เลเวลอัพ (tier "ต่ำ")

| Lv | Invocations | Cantrips | Prepared Spells | Slots(ระดับ) | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|---|
| 1 | 1 | 2 | 2 | 1(1st) | **Eldritch Invocations** (สมมติฐาน: Agonizing Blast), **Pact Magic** | 11 |
| 2 | 3 | 2 | 3 | 2(1st) | **Magical Cunning** (คืน slot ครึ่งนึงผ่านพิธี 1 นาที, 1/long rest) | 19 |
| 3 | 3 | 2 | 4 | 2(2nd) | *(Warlock Subclass — ยกเว้น)* | 27 |
| 4 | 3 | 3 | 5 | 2(2nd) | ASI, cantrip เพิ่ม | 35 |
| 5 | 5 | 3 | 6 | 2(3rd) | — | 43 |
| 6 | 5 | 3 | 7 | 2(3rd) | *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 6 | 3 | 8 | 2(4th) | — | 59 |
| 8 | 6 | 3 | 9 | 2(4th) | ASI | 67 |
| 9 | 7 | 3 | 10 | 2(5th) | **Contact Patron** (Contact Other Plane ฟรี, auto-succeed save) | 75 |
| 10 | 7 | 4 | 10 | 2(5th) | *(Subclass feature — ยกเว้น)*, cantrip เพิ่ม | 83 |
| 11 | 7 | 4 | 11 | 3(5th) | **Mystic Arcanum** (สเปลล์ระดับ6 ฟรี 1/long rest) | 91 |
| 12 | 8 | 4 | 11 | 3(5th) | ASI | 99 |
| 13 | 8 | 4 | 12 | 3(5th) | Mystic Arcanum (ระดับ7) | 107 |
| 14 | 8 | 4 | 12 | 3(5th) | *(Subclass feature — ยกเว้น)* | 115 |
| 15 | 9 | 4 | 13 | 3(5th) | Mystic Arcanum (ระดับ8) | 123 |
| 16 | 9 | 4 | 13 | 4(5th) | ASI | 131 |
| 17 | 9 | 4 | 14 | 4(5th) | Mystic Arcanum (ระดับ9 — เพดานสูงสุด) | 139 |
| 18 | 10 | 4 | 14 | 4(5th) | — | 147 |
| 19 | 10 | 4 | 15 | 4(5th) | Epic Boon | 155 |
| 20 | 10 | 4 | 15 | 4(5th) | **Eldritch Master** (Magical Cunning คืน slot เต็ม 100% แทนครึ่งเดียว) | 163 |

---

## Damage Axis

**Primary = Magnitude** — Agonizing Blast (สมมติฐาน lv1) ทำให้ cantrip บวก CHA mod ได้ทุกลำแสง แหกกฎ peer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-10 | **A** | Eldritch Blast+Agonizing Blast (CHA mod ×จำนวนลำแสง 1→2→3→4) ซ้อนเหนือ peer's cantrip-ไม่บวก-mod baseline ตรงๆ ตั้งแต่ lv1 → **A** |
| 11-20 | **S** | **Mystic Arcanum ปลดล็อก (lv11)** — สเปลล์ระดับ6-9 ฟรี 1/long rest ซ้อนบน Eldritch Blast ที่แรงอยู่แล้ว = nova-tier เพิ่มเติมทุก long rest → **S** |

**สรุปเกรด**: **A(1-10)** → **S(11-20)**

---

## Control Axis

**Primary = Severity** — สมมติฐาน spell list ตรง peer (Hex/Charm Person/Hypnotic Pattern-tier ตามความรู้ทั่วไป)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | ตรง peer's Tier4 benchmark ตามสมมติฐาน — modifier: **Frequency=เหนือกว่า**(Pact Magic คืนด้วย Short Rest ไม่ใช่ Long Rest — ได้ cast CC ต่อวันมากกว่า peer จริง) แต่ 1/5 ไม่พอปัดขึ้น A |

**สรุปเกรด**: **B(1-20) flat**

---

## Support Axis

**Primary = Magnitude** — ไม่มีธีม Support ชัดเจน (คล้าย Sorcerer/Necromancer) ไม่มีทรัพยากรคู่ขนานเล็ง ally เลย

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | สมมติฐาน spell-list-based Support บางกว่า Bard/Cleric/Druid ตามธีมคลาส = **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Primary=B — modifier: Mitigation/Debuff Resistance/Death Prevention ทั้งหมด**ไม่มีกลไก guaranteed ใน base kit** (Fiendish Vigor/Armor of Shadows เป็น invocation choice ที่ปฏิบัติ track-neutral ไม่ commit เข้าเกรด) → 3/4 ต่ำกว่า ถึงเกณฑ์ → ขยับลงจาก B เป็น **C ตลอด 20 เลเวลไม่มีจุดกู้เลย** |

**สรุปเกรด**: **C(1-20) flat**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack guaranteed (Thirsting Blade เป็น invocation choice, track-neutral) = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary=C — modifier ทั้ง 4 **ไม่มีกลไก guaranteed เลยสักตัว** (Magical Cunning ใช้เวลา 1 นาทีเต็ม ไม่ใช่ instant-trick) → 4/4 ต่ำ ถึงเกณฑ์เกินไกล → ขยับลงจาก C เป็น **D ตลอด 20 เลเวล** — เหมือน Cleric เป๊ะ (modifier tally แซง carve-out กลับไป D) |

**สรุปเกรด**: **D(1-20) flat**

---

## Utility Axis

**Primary = Magnitude** — สมมติฐาน generic caster track + **Contact Patron (lv9)** เป็นกลไกจริงยืนยันจากไฟล์

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **B** | สมมติฐานตรง peer — Contact Patron(lv9, auto-succeed save บน Contact Other Plane — **เชื่อถือได้กว่า peer's เวอร์ชันเอง**) = Reliability เหนือกว่า 1/4 ไม่พอขยับเดี่ยวๆ → คง **B** |

**สรุปเกรด**: **B(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — ยืนยันจาก text จริง "replace one spell...whenever you gain a Warlock level" = tier **"ต่ำ"** (Anchor เองอ้างชื่อ "Sorcerer, Bard, Warlock" ไว้ตรงๆ) → **Primary = C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Primary=C — modifier: Resource Fungibility=**ต่ำกว่า/ตรง**(Pact Magic slot ตายตัวกว่า Sorcery Points มาก ไม่ยืดหยุ่นเท่า), Cross-Axis Coverage=เหนือกว่า(invocation menu 28 ตัวครอบคลุมหลาย axis ได้ถ้าเลือกดี) แต่แค่ 1/4 ไม่พอขยับ, Adaptability=**ต่ำกว่า**(invocation สลับได้แค่ตอนเลเวลอัพ ไม่ใช่ต่อเทิร์นแบบสเปลล์) → tally สุทธิไม่ถึงเกณฑ์ทั้งขึ้นและลง → คง **C** |

**สรุปเกรด**: **C(1-20) flat** — ต่างจาก Sorcerer(B)/Bard(B) เพราะ Pact Magic แข็งตัวกว่า Sorcery Points/Bardic-Inspiration มาก

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | **A(1-10)** → **S(11-20)** |
| Control | **B(1-20) flat** |
| Support | **C(1-20) flat** |
| Survivability | **C(1-20) flat** |
| Action Economy | **D(1-20) flat** |
| Utility | **B(1-20) flat** |
| Versatility | **C(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **Damage เป็น A ตั้งแต่ lv1 — เร็วที่สุดในบรรดา full caster ทั้งหมดที่ทำมา** — Agonizing Blast ดัน cantrip ให้บวก mod ได้จาก lv1 (Cleric/Necromancer/Mystic ต้องรอถึง lv7-8 ถึงจะมีฟีเจอร์เทียบเท่า) — แม้จะเป็นสมมติฐานจาก invocation choice ก็ตาม แต่ความ "แทบเป็นมาตรฐาน" ของ Agonizing Blast ในทางปฏิบัติสูงกว่า invocation อื่นมาก
2. **Action Economy=D-flat เหมือน Cleric เป๊ะ (modifier tally แซง carve-out กลับไป D)** — ยืนยัน pattern นี้เกิดกับคลาสอื่นได้อีก ไม่ใช่แค่ Cleric — Warlock เป็นคลาสที่ 2
3. **Versatility=C-flat ต่างจาก Sorcerer/Bard ที่ไต่ถึง B** — ทั้งที่ tier "ต่ำ" เดียวกันและมี invocation menu ใหญ่ — เพราะ Pact Magic slot แข็งตัวกว่า Sorcery Points มาก (ไม่ fungible เท่า) + invocation สลับได้แค่ตอนเลเวลอัพไม่ใช่ต่อเทิร์น — ตัวอย่างที่ 3 ที่ tier เดียวกันแต่โครงสร้างทรัพยากรต่างกันให้ผลต่างกัน (ต่อจาก Ranger vs Paladin)
4. **Survivability=C-flat ตลอด 20 เลเวลไม่มีจุดกู้เลยแม้แต่จุดเดียว** — เหมือน Sorcerer (d6 ก็จริง) แต่ Warlock เป็น d8 (ตรง peer) แล้วยังจบที่ C เพราะไม่มี guaranteed-modifier เลยสักตัวในเบสคลาส (ทุกอย่างเป็น invocation choice ที่ไม่ commit)
5. **ไม่มี tie-break 2-2 เกิดขึ้นเลยในไฟล์นี้** — เพราะแทบทุก axis เป็น flat ไม่มี milestone shift ให้เกิด tie
