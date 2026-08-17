# Vagabond — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Vagabond Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled, `public/data/5etools/class.json`) entry `name: "Vagabond", source: "ValdaSpire24Extras"` — homebrew จาก *Valda's Spire of Secrets* (ภาคเสริม) — ยืนยัน `classFeaturesFull` ครบ 24 รายการ + `optionalfeature.json` สำหรับ maneuver menu (24 ตัวเลือก, tag `MV:V`)
**สถานะ**: คลาสที่ 25 ของชั้น 1 — **นักผจญภัยธีม "underdog/bloodied-survivor"** — ไม่มีสเปลล์เลย, Battle Dice maneuver เหมือน Captain/Gunslinger **แต่มีเมนูใหญ่กว่ามาก (24 ตัวเลือก vs 5-6 ของคลาสอื่น) และรู้ได้แค่บางส่วน (3→10 จาก 24) โดยเลือกเองได้**

⚠️ **หมายเหตุสำคัญที่สุด — วิธีจัดการเมนู maneuver ที่เลือกเองได้**: ต่างจาก Captain/Gunslinger ที่รู้ maneuver **ครบทุกตัว** ตั้งแต่ lv1 (ไม่มีทางเลือก) Vagabond **เลือกได้จากเมนู 24 ตัวเลือก รู้แค่บางส่วน (3 ตัวที่ lv1 → 10 ตัวที่ lv18-20)** — ไฟล์นี้ตั้งสมมติฐานว่า **ผู้เล่นที่เล่นแบบ "generalist ครบเครื่อง" จะเลือก maneuver ให้ครอบคลุมหลาย axis ทันทีที่มีช่องว่าง/Battle Die พอจ่าย** (เช่น Dig Deep ที่ระบุ "recommended" ไว้ตรงๆ ในข้อความจริง ถือว่ารู้จาก lv1, Stunning Blow/Riposte/Whirlwind ที่ต้องการ 3 Battle Dice ถือว่าเลือกได้ตั้งแต่จ่ายไหว lv3) — เป็นสมมติฐาน**ไม่ใช่การรับประกัน** เพราะผู้เล่นจริงอาจเลือกทางอื่น — ต่างจาก Weapon Mastery property choice (ที่ปฏิบัติ track-neutral เสมอ) เพราะ maneuver ที่นี่**คือแกนหลักของทั้งคลาส** ไม่ใช่ตัวเสริมชายขอบ

---

## สรุป Chassis

**HD**: d10 (เหนือ peer d8 — Primary Survivability เริ่มที่ A) · **Save prof**: STR/CON · **ไม่มีสเปลล์คาสติ้งเลย**

| Lv | Weapon Mastery | Maneuvers รู้ | Battle Dice | Milestone อื่น | EHP (d10+CON+3) |
|---|---|---|---|---|---|
| 1 | 2 | 3 | 2d6 | Secret (เลือก background hook), **Battle Tactics** (สมมติฐาน: Battle Edge/**Dig Deep**/Rampage), **Weapon Mastery** | 13 |
| 2 | 2 | 4 | 2d6 | Desperate Attack (adv ตอน Bloodied), **Breather** (action self-heal HD) | 22 |
| 3 | 2 | 5 | 3d6 | *(Vagabond Subclass — ยกเว้น)*, Overexertion (ฝืนใช้ Battle Die แลก HP), **สมมติฐาน: เพิ่ม Stunning Blow/Riposte เมื่อจ่าย 3 dice ไหว** | 31 |
| 4 | 3 | 5 | 3d6 | ASI | 40 |
| 5 | 3 | 5 | 3d8 | **Extra Attack** | 49 |
| 6 | 3 | 6 | 3d8 | *(Subclass feature — ยกเว้น)* | 58 |
| 7 | 3 | 6 | 4d8 | **Mettle** (CON-save-half-dmg→ไม่โดนเลย) | 67 |
| 8 | 3 | 6 | 4d8 | ASI | 76 |
| 9 | 3 | 7 | 5d8 | **Last Stand** (ตก0HP→เหลือ1+ฟื้น=2×level, 1/long rest) | 85 |
| 10 | 4 | 7 | 5d8 | *(Subclass feature — ยกเว้น)* | 94 |
| 11 | 4 | 7 | 5d10 | Desperate Fury (+1d8 dmg ตอน Bloodied) | 103 |
| 12 | 4 | 8 | 5d10 | ASI | 112 |
| 13 | 4 | 8 | 6d10 | **Tenacity** (reroll+Battle Die ต่อ save-condition พลาด) | 121 |
| 14 | 4 | 8 | 6d10 | *(Subclass feature — ยกเว้น)* | 130 |
| 15 | 4 | 9 | 7d10 | Desperate Survival (crit ใส่เรา→miss ตอน Bloodied) | 139 |
| 16 | 4 | 9 | 7d10 | ASI | 148 |
| 17 | 4 | 9 | 7d12 | Deft Maneuver (bonus action เสริมเฉพาะ maneuver) | 157 |
| 18 | 4 | 10 | 7d12 | **Wayworn** (นับเป็น Bloodied ตลอดเวลา — เปิดโบนัส "ตอน Bloodied" ทั้งหมดถาวร) | 166 |
| 19 | 4 | 10 | 8d12 | Epic Boon | 175 |
| 20 | 4 | 10 | 8d12 | Martial Recovery (bonus action คืน Battle Dice เต็ม 1/rest) | 184 |

---

## Damage Axis

**Primary = Magnitude** — Extra Attack ตรงเวลา lv5 = matches peer

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | B | matches peer — modifier: Burst=เหนือกว่า(maneuver rider dice) 1/4 ไม่พอขยับ |
| 5-17 | **A** | Battle Edge/Ruinous Blow/Whirlwind (ถ้าเลือก) ให้ rider ดาเมจจริงซ้อนบน Extra Attack + Desperate Fury(lv11, +1d8 **ตอน Bloodied เท่านั้น** — conditional) → tally: Burst=เหนือกว่า, Breadth=เหนือกว่า(Whirlwind ถ้าเลือก, ยิง 3 เป้า) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |
| 18-20 | **S** | **Wayworn ปลดล็อก** — นับเป็น Bloodied ตลอดเวลา = Desperate Fury's +1d8 กลายเป็น**ไม่มีเงื่อนไข**ถาวร ซ้อนบน Extra Attack+rider เดิม → **S** |

**สรุปเกรด**: B(1-4) → **A(5-17)** → **S(18-20)**

---

## Control Axis

**Primary = Severity** — **Stunning Blow** (3 Battle Dice, Stunned Tier4 — เหมือน Monk's Stunning Strike เป๊ะ) เป็นไปได้ในเมนูตั้งแต่จ่ายไหว (3 dice, lv3+)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | D | ยังจ่าย Stunning Blow ไม่ไหว(ต้องการ 3 dice, มีแค่ 2d6) = **D** |
| 3-20 | **A** | **Stunning Blow affordable** — Stunned(Tier4) ตรง peer, modifier เหมือน Monk's Stunning Strike เป๊ะ: Frequency=เหนือกว่า(รีฟิลทุกไฟต์), Stickiness=เหนือกว่า(ไม่มี repeat save), Concentration Risk=เหนือกว่า(instant) → **3/5 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: D(1-2) → **A(3-20)** ⚠️ (ขึ้นกับสมมติฐานว่าเลือก Stunning Blow — ไม่การันตี 100%)

---

## Support Axis

ไม่มี maneuver หรือฟีเจอร์ไหนเล็ง ally เลยแม้แต่ตัวเดียวในเมนู 24 ตัวเลือก (Iron Wall/Dig Deep/Mettle ล้วน self)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | ไม่มีกลไก Support เลยตลอด 20 เลเวล = **D flat** |

**สรุปเกรด**: **D(1-20) flat**

---

## Survivability Axis

**Primary = Effective HP** (d10 เหนือ peer d8) = **A โดยตรง**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **B** | Primary=A — Dig Deep(สมมติฐาน recommended, temp HP)=Mitigation เหนือกว่า แต่ Death/Debuff ยังไม่มี(D) → 1 เหนือ/2 ต่ำ → 2/4 ต่ำ ถึงเกณฑ์ → ขยับลง 1 ขั้นเป็น **B** |
| 2-20 | **S** | **Breather ปลดล็อก (lv2, action self-heal HD)** — Death Prevention เหนือกว่าเพิ่ม → tally: **2 เหนือ(Mitigation, Death)/1 ต่ำ(Debuff) ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก A(Primary) เป็น S** — **แตะ S เร็วที่สุดเท่าที่เจอมาเสมอ Martyr (ทั้งคู่ lv2)** — Mettle(lv7)/Last Stand(lv9)/Tenacity(lv13) เสริมต่อแต่ cap +1 ขั้นอยู่แล้ว |

**สรุปเกรด**: B(1) → **S(2-20)**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — Extra Attack ตรงเวลา lv5 = matches peer = **B**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | **C** | Primary=B(pre-EA) — modifier: Bonus Action=เหนือกว่า(maneuver ส่วนใหญ่เป็น bonus action), Reaction=ยังจ่ายไม่ไหว(Riposte ต้องการ 3 dice), Extra Action/Resource-Conversion=ไม่มีกลไก(D) → 3/4 ต่ำ ถึงเกณฑ์ → ขยับลงเป็น **C** |
| 3-20 | **B** | **Riposte affordable (3 dice)** — Reaction เหนือกว่า → tally: **2 เหนือ(Bonus Action, Reaction)/2 ต่ำ(Extra Action, Resource-Conversion) — เสมอกัน (ครั้งที่ 22!)** ⚠️ net cancellation → กลับ Primary(B) |

**สรุปเกรด**: C(1-2) → **B(3-20)**

---

## Utility Axis

Knack maneuver (skill-check-assist) มีในเมนูแต่ Primary(Magnitude)=ไม่มีสเปลล์เลย

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | **D** | Primary=ไม่มีกลไก(D) → floor rule ล็อกทั้ง axis (เหมือน Barbarian/Fighter/Gunslinger/Monster-Hunter/Tactician) |

**สรุปเกรด**: **D(1-20) flat**

---

## Versatility Axis

**Primary = Loadout Flexibility** — Weapon Mastery (2 kinds, LR swap) → floor-escape → **Primary = B** (เสริมด้วย maneuver ที่สลับได้ 1 ตัว/เลเวลอัพเองด้วย — สอง swap-mechanism ซ้อนกัน)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Primary=B |
| 2-20 | **A** | เมนู 24 ตัวเลือก = Resource Fungibility เหนือกว่ามาก, Cross-Axis Coverage เหนือกว่า(Damage/Control/Survivability/Action-Economy พร้อมกันได้จากเมนูใหญ่) → **2/4 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก B เป็น A** |

**สรุปเกรด**: B(1) → **A(2-20)**

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-4) → A(5-17) → **S(18-20)** |
| Control | D(1-2) → **A(3-20)** |
| Support | **D(1-20) flat** |
| Survivability | B(1) → **S(2-20)** |
| Action Economy | C(1-2) → B(3-20) |
| Utility | **D(1-20) flat** |
| Versatility | B(1) → **A(2-20)** |

---

## ข้อค้นพบสำคัญ

1. **⚠️ คลาสแรกที่ maneuver-known เป็น player-choice ไม่ใช่ fixed-list — ต้องตั้งสมมติฐาน "generalist build"** — ต่างจาก Captain(5 ตัวคงที่)/Gunslinger(6 ตัวคงที่) Vagabond เลือกจากเมนู 24 ตัวรู้แค่ 3→10 ตัว — เกรดในไฟล์นี้ขึ้นกับสมมติฐานว่าผู้เล่นเลือกให้ครอบคลุมหลาย axis (Dig Deep ที่ recommended จริง, Stunning Blow/Riposte/Whirlwind ที่จ่ายไหวตั้งแต่ lv3) — ถ้าผู้เล่นเลือกทางอื่น (เช่น all-in Damage) เกรดจริงจะต่างจากนี้มาก — ธรรมชาติของคลาสนี้ทำให้ "baseline เดียว" มีความหมายจำกัดกว่าคลาสอื่น
2. **Survivability แตะ S เร็วที่สุดเท่าที่เจอมาเสมอ Martyr** — ทั้งคู่ที่ lv2 (Vagabond ผ่าน Dig Deep+Breather, Martyr ผ่าน Reprisal+Miraculous Healing) — สะท้อนธีม "underdog ที่ตายยาก" ของทั้ง 2 คลาส
3. **Control แตะ A ผ่าน Stunning Blow เหมือน Monk's Stunning Strike เป๊ะ** — ยืนยัน pattern เดียวกัน (Tier4 CC + Frequency/Stickiness/Concentration-Risk เหนือกว่า = A) เกิดขึ้นได้กับ maneuver-based mechanism เหมือนกับ Focus-Point-based mechanism ของ Monk
4. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 22** (Action Economy lv3-20)
5. **Damage แตะ S ที่ lv18 ผ่าน Wayworn ทำให้ "Bloodied" กลายเป็นถาวร** — เทคนิคการออกแบบที่ไม่เคยเจอมาก่อน (เปลี่ยนเงื่อนไขที่เคยมีให้หายไปถาวรที่ปลายเกม แทนที่จะเพิ่มพลังตรงๆ)
