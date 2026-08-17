# Warmage — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Warmage Subclass ที่ lv3/7/10/15/18 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Warmage", source: "ValdaSpire24"` — homebrew จาก *Valda's Spire of Secrets* — ยืนยัน `classFeaturesFull` ครบ 20 รายการ + `classSpells` (13 cantrip ทั้งหมด — **ไม่มีสเปลล์ระดับ 1+ เลยแม้แต่ตัวเดียว**) + Warmage Tricks (38+ ตัวเลือก, `optionalfeature.json` tag `T`)
**สถานะ**: คลาสที่ 28 ของชั้น 1 — **"cantrip specialist" ตัวจริง — ไม่มีสเปลล์ระดับ 1+ เลยตลอดชาติ ไม่มี Extra Attack เลย** ธีม chess/gambling (subclass ชื่อ House of Bishops/Cards/Dice ฯลฯ)

⚠️ **หมายเหตุ**: **Warmage Edge (lv1) เป็น base-class feature ที่การันตี** (ไม่ใช่ trick-choice) เพิ่ม Int mod เข้าดาเมจ cantrip ทุกครั้ง — ต่างจาก Warlock's Agonizing Blast ที่เป็นสมมติฐาน invocation choice, ที่นี่**ยืนยันจากไฟล์ตรงๆ** — Arcane Initiation(lv1) และ Warmage Tricks (2→10 จาก 38+) ยังคงปฏิบัติ track-neutral เหมือน Vagabond/Warlock

---

## สรุป Chassis

**HD**: d8 (ตรง peer) · **Save prof**: CON/INT · **Cantrip-only spellcasting** (ไม่มี spell slot/prepared spell ระดับ1+ เลย)

| Lv | Cantrips | Cantrip Bonus Dice | Tricks รู้ | Arcane Surge uses | Milestone อื่น | EHP (d8+CON+3) |
|---|---|---|---|---|---|---|
| 1 | 4 | 0 | 0 | 0 | **Spellcasting** (cantrip-only), Arcane Initiation (choice, track-neutral), **Warmage Edge** (Int mod เข้าดาเมจ cantrip — การันตี) | 11 |
| 2 | 4 | 0 | 2 | 0 | Reliable Cantrip (miss/save-succeed ยังได้ดาเมจขั้นต่ำ), **Warmage Tricks** | 19 |
| 3 | 5 | 0 | 3 | 0 | *(Warmage Subclass — ยกเว้น)* | 27 |
| 4 | 5 | 0 | 3 | 0 | ASI | 35 |
| 5 | 6 | 1 | 4 | 2 | **Arcane Surge** (cantrip dmg dice ×2 เหมือน crit, 1/เทิร์น) | 43 |
| 6 | 6 | 1 | 4 | 2 | **Tactical Insight** (Int mod เข้า save ต้าน magic — การันตี) | 51 |
| 7 | 6 | 1 | 5 | 2 | *(Subclass feature — ยกเว้น)* | 59 |
| 8 | 6 | 1 | 5 | 2 | ASI | 67 |
| 9 | 7 | 1 | 6 | 2 | — | 75 |
| 10 | 7 | 1 | 6 | 2 | *(Subclass feature — ยกเว้น)* | 83 |
| 11 | 7 | 2 | 7 | 3 | Arcane Surge Improvement (+1 ใช้) | 91 |
| 12 | 7 | 2 | 7 | 3 | ASI | 99 |
| 13 | 8 | 2 | 8 | 3 | — | 107 |
| 14 | 8 | 2 | 8 | 3 | **Strategic Deflection** (reaction, save ผ่าน→ส่งดาเมจ spell ไปเป้าอื่น — การันตี) | 115 |
| 15 | 8 | 3 | 9 | 3 | *(Subclass feature — ยกเว้น)* | 123 |
| 16 | 8 | 3 | 9 | 3 | ASI | 131 |
| 17 | 9 | 3 | 10 | 3 | — | 139 |
| 18 | 9 | 3 | 10 | 3 | *(Subclass feature — ยกเว้น)* | 147 |
| 19 | 9 | 3 | 10 | 3 | Epic Boon | 155 |
| 20 | 10 | 4 | 10 | 3 | **Master Warmage** (คืน Arcane Surge 1 ใช้ตอน Initiative ถ้าหมด) | 163 |

---

## Damage Axis

**Primary = Magnitude** — Warmage Edge (lv1, การันตี) ทำลายกฎ "cantrip ไม่บวก mod" ของ peer ทันที

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | **A** | Int mod เข้าดาเมจ cantrip ทุกครั้ง ซ้อนเหนือ peer's cantrip-ไม่บวก-mod baseline → **A** |
| 5-20 | **S** | **Cantrip Bonus Dice + Arcane Surge ปลดล็อกพร้อมกัน** — Bonus Dice เพิ่มเต๋าดาเมจตรงๆ (0→4) + Arcane Surge คูณเต๋าดาเมจ ×2 เหมือน crit ได้ 1 ครั้ง/เทิร์น (×3 ถ้า crit จริงด้วย!) = nova ระดับสูงสุดเท่าที่เจอในระบบนี้จนถึงตอนนี้ → **S** |

**สรุปเกรด**: **A(1-4)** → **S(5-20)** — เข้า S เร็วที่สุดในบรรดา full-caster ทั้งหมด (lv5, ผูกกับ Arcane Surge โดยตรง)

---

## Control Axis

**Primary = Severity** — สมมติฐาน generalist trick pick (Blasting/Icy/Explosive Cantrip ฯลฯ ให้ rider Push/Slow/AoE ตาม damage type ของ cantrip ที่เลือก)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | D | ไม่มีกลไก Control เลย (Trick ยังไม่มา) = **D** |
| 2-20 | **C** | สมมติฐาน trick ธาตุ (Tier1-2 rider เช่น push/numb/AoE) ต่ำกว่า peer's Tier4 = **C** |

**สรุปเกรด**: D(1) → **C(2-20)**

---

## Support Axis

Field Medic (trick, Support จริง) มีในเมนูแต่**ไม่ใช่ recommended** ต่างจาก Dig Deep ของ Vagabond — ประเมินอนุรักษ์นิยม ไม่ commit

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไก Support ที่ guaranteed เลย (cantrip ที่แนะนำ 4 ตัว: Force Dart/Prestidigitation/Quickstep/Shocking Grasp ไม่มีตัวไหนเป็น Support) = **D flat** |

**สรุปเกรด**: **D(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d8 ตรง peer) = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-5 | **C** | Primary=B — modifier ทั้งหมดยังไม่มีกลไก guaranteed(D×3, Save=ตรง) → 3/4 ต่ำ → ขยับลงเป็น **C** |
| 6-20 | = lv1-5 | **Tactical Insight ปลดล็อก (lv6)** — Save Reliability เหนือกว่า(Int mod เข้า save ต้าน magic) → tally: 1 เหนือ/2 ต่ำ ยังไม่พอกลับ → คง **C** |

**สรุปเกรด**: **C(1-20) flat**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย ใช้ carve-out = **C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | **D** | modifier ทั้งหมดยังไม่มี(D×4) → 4/4 ต่ำ → ขยับลงจาก C เป็น **D** |
| 5-13 | **C** | สมมติฐาน trick bonus-action(Bonus Action เหนือกว่า)+**Arcane Surge (Resource-to-Action Conversion การันตี, lv5)** → tally: **2 เหนือ/2 ต่ำ(Reaction, Extra Action) — เสมอกัน (ครั้งที่ 24!)** ⚠️ net cancellation → กลับ Primary(C) |
| 14-20 | **B** | **Strategic Deflection ปลดล็อก (lv14, การันตี)** — Reaction เหนือกว่า → tally: **3 เหนือ/1 ต่ำ(Extra Action)** → ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C เป็น **B** |

**สรุปเกรด**: D(1-4) → C(5-13) → **B(14-20)**

---

## Utility Axis

**Primary = Magnitude** — cantrip-only ตลอดกาล แต่ Prestidigitation(cantrip แนะนำ)+Mending(อยู่ใน list 13 ตัว) ให้ Utility จริงแม้อ่อน

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Prestidigitation/Mending-tier ให้กลไกจริงตลอดแต่เพดานคงที่ (cantrip เท่านั้น ไม่มีทางไต่ถึง Legend-Lore-tier ได้เลย) ต่ำกว่า peer เสมอ = **C** — Skill-Check Layer=ไม่มี(D) 1/4 ไม่พอขยับ |

**สรุปเกรด**: **C(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — cantrip สลับ 1 ตัว/เลเวลอัพ (เหมือน tier "ต่ำ") → **Primary = C**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **C** | Primary=C — modifier: Resource Fungibility=ต่ำ(ไม่มี shared pool ใหญ่แบบ Sorcery Points), Cross-Axis Coverage=เหนือกว่า(trick menu ใหญ่) แต่แค่ 1/4, Adaptability=ต่ำ(trick คงที่ไม่ใช่เลือกต่อเทิร์น) → สุทธิไม่ถึงเกณฑ์ → คง **C** (เหมือน Warlock เป๊ะ) |

**สรุปเกรด**: **C(1-20) flat**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | A(1-4) → **S(5-20)** |
| Control | D(1) → C(2-20) |
| Support | **D(1-20) flat** |
| Survivability | **C(1-20) flat** |
| Action Economy | D(1-4) → C(5-13) → **B(14-20)** |
| Utility | **C(1-20) flat** |
| Versatility | **C(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **Damage แตะ S เร็วที่สุดในบรรดา full-caster ทั้งหมด (lv5)** — ผูกกับ Arcane Surge โดยตรงและเป็น**การันตี** (ไม่ใช่ invocation choice แบบ Warlock's Agonizing Blast) — ยืนยันว่า cantrip-only design ของ Warmage ถูกออกแบบมาให้ magnitude สูงมากตั้งแต่ต้นเพื่อชดเชยการไม่มีสเปลล์ระดับสูงเลย
2. **Support เป็น D-flat ทั้งที่มี Field Medic trick ในเมนู — ตัดสินใจอนุรักษ์นิยมกว่า Vagabond's Dig Deep** — เพราะ Field Medic ไม่ถูก flag "recommended" เหมือน Dig Deep ทำให้ความมั่นใจว่าจะถูกเลือกต่ำกว่า
3. **Versatility=C-flat เหมือน Warlock เป๊ะ** — cantrip-swap/trick-swap ทั้งคู่เป็น "ต่ำ" tier ไม่มี shared fungible pool ใหญ่แบบ Sorcery Points ให้ดันขึ้น B — ยืนยัน pattern "tier เดียวกันแต่โครงสร้างต่างกันให้ผลต่างกัน" เป็นครั้งที่ 4
4. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 24** (Action Economy lv5-13)
5. **คลาสแรกในระบบนี้ที่ไม่มีสเปลล์ระดับ 1+ เลยแม้แต่ตัวเดียวตลอดชาติ** — ต่างจาก Channeler/Craftsman(marchial ล้วน)หรือ Martyr/Necromancer(full spellcasting) Warmage อยู่กึ่งกลางแท้จริง: เป็น "caster" ในนิยาม (spellcastingAbility, cantripProgression) แต่ mechanics ทั้งหมดขับเคลื่อนด้วย cantrip ล้วนๆ ไม่มี prepared-spell/slot progression เลยสักคอลัมน์เดียวในตาราง
