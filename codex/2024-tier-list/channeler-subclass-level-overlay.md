# Channeler — Subclass Level Overlay (ชั้น 2, delta-only)

**ขอบเขต**: Planar Order subclass ทั้ง 4 (lv1/7/10/15) เทียบกับ [channeler-level-baseline.md](channeler-level-baseline.md) — list เฉพาะ Lv/Axis ที่เกรดต่างจาก baseline เท่านั้น ไม่ระบุ = **เท่ากับ baseline**
**Data source**: `Mage Hand Press; Valda's Spire of Secrets - 2014.json` → `subclassFeature` filtered `className: "Channeler"`, source `ValdaSpireExtras` ทั้ง 4 subclass (ยืนยันตรงกับ `subclass.json` bundled ที่ระบุ `source: ValdaSpireExtras` เหมือนกัน — ไม่มีปัญหา 2014-vs-2024 label mismatch แบบ Captain เพราะ Channeler ทั้งคลาสเป็น homebrew เดี่ยว ไม่มีเวอร์ชันคู่ขนาน)

⚠️ **นโยบายการตัดสิน delta ของไฟล์นี้** (ระบุไว้ล่วงหน้าเพราะ 2/4 subclass จบด้วย 0 delta): ฟีเจอร์ที่เสริม "มิติเดียว" ในแกนที่ tally เดิมมีมิตินั้นอยู่แล้ว (เช่น Burst ที่แรงขึ้นแต่ Burst ก็ "เหนือ" อยู่แล้วจาก base-class) **ไม่นับเป็น delta** เพราะไม่ข้าม threshold ใหม่ (กฎ ≥ครึ่งของ modifier ต้องขยับฝั่งเดียวกัน) — นับเฉพาะฟีเจอร์ที่ flip มิติที่เดิม "ต่ำกว่า/ไม่มีกลไก" ให้กลายเป็น "ตรง/เหนือ" จนเปลี่ยน tally จริง

---

## Order of Blinknights (melee weapon-bond gish)

**ไม่มี delta — เท่ากับ baseline ทั้ง 20 เลเวล 7 axis**

Portal Key: Weapon (lv1, อาวุธนับเป็นเวทมนตร์ถาวร), Spellstrike Ward (lv10, temp-HP pool จากการตีระยะประชิด), Arcane Edge (lv15, auto-crit 1/short rest) ล้วนเป็นฟีเจอร์จริงที่แรงในทางเนื้อเรื่อง แต่แต่ละตัวเสริมแค่มิติเดียวในแกนที่ tally เดิมมีมิตินั้น "เหนือ" อยู่แล้ว (Damage's Burst จาก Combat Channeling, Survivability's tally ยังติด Debuff Resistance+Death Prevention เป็น D อยู่ 2/4 แม้ Mitigation จะขยับจริง) — ไม่ข้าม threshold จุดไหนเลย **คลาสแรกในระบบทั้งหมดที่ subclass จบด้วย 0 delta เป๊ะ** (ไม่ใช่ error — เป็นผลตรงไปตรงมาจากการที่ signature feature ทั้ง 3 ตัวเสริม "ของเดิม" แทนที่จะเปิดมิติใหม่)

---

## Order of Dimensional Magi (ritual scholar/wizard-spell borrower)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Utility | 1-16 | **B** (baseline C) | **Portal Key: Book (lv1)** — ritual-cast 2 เลือกเองจาก ritual spell **ลิสต์ของคลาสไหนก็ได้** + ritual-cast channeler spell ตัวเองที่มี ritual tag — ตั้งแต่ lv1! Breadth modifier flip จาก "ตรง"(peer-neutral) เป็น "เหนือ"(คลังริชวลกว้างข้ามคลาส ไม่มีต้นทุน resource) → tally ใหม่ 2 เหนือ(Access Cost เดิม+Breadth ใหม่)/2 ต่ำ(Reliability, Skill-Check) = **เสมอ 2-2 (ครั้งที่ 6 ในระบบ)** ⚠️ net cancellation → กลับ Primary เต็มตัว = **B** (ไม่ใช่ C ที่โดนกดจาก tally เดิม) |
| Damage | 15-20 | **S** (baseline B) | **Secret Arcana (lv15)**: รู้ 3 สเปลล์ wizard-list ระดับ ≤7 ฟรี 1 ตัว/long rest — **เกินเพดานจริงของคลาส (5th) ไป 2 ระดับเต็ม** ตรงกับ pattern "free-cast สเปลล์เกินเพดานคลาส = กระโดด S ทันที" (Apothecary/Reanimator/Wrathful Dead) — เลือก known-slot เป็นสเปลล์ดาเมจ 7th-tier (เช่น Prismatic Spray/Delayed Blast Fireball) ฟรีไม่เสีย Arcana Point |
| Control | 15-20 | **S** (baseline B) | Secret Arcana — เลือก known-slot เป็น Control 7th-tier (Forcecage/Reverse Gravity) ฟรี 1/long rest — เกินเพดานคลาสเช่นกัน |
| Utility | 15-20 | **S** (baseline B, ก็คือ B จาก delta แถวบนอยู่แล้ว) | Secret Arcana — เลือก known-slot เป็น Utility 7th-tier (Teleport/Mirage Arcane) ฟรี 1/long rest — 3 known-slot ของฟีเจอร์นี้พอดีครอบ Damage/Control/Utility ได้ครบทั้ง 3 แกนพร้อมกัน (ใช้หลัก "เลือก optimal ต่อแกนที่กำลังให้คะแนน" ตามธรรมเนียมโครงการ) |

**Support ไม่ได้รับผล** — wizard spell list ไม่มีสเปลล์ฮีล/บัฟที่ทรงพลังพอ (Globe of Invulnerability ป้องกันทีมได้จริงแต่ magnitude ไม่ถึงเกณฑ์ Support Primary) → คง C ตาม baseline
**Versatility ไม่ขยับต่อ** — โดน max-1-step-cap เดิมของ baseline กันไว้ที่ B อยู่แล้วตั้งแต่ lv9 (ดู baseline ข้อค้นพบ #5)

---

## Order of Titanfists (size-changing melee brawler)

**ไม่มี delta — เท่ากับ baseline ทั้ง 20 เลเวล 7 axis**

Battlefist (lv1, off-hand bonus-action attack ในตัว) ทำให้ Action Economy's Bonus Action modifier flip เป็น "เหนือ" แต่ tally lv1-4 ยังเหลือ 3/4 ต่ำกว่า (Reaction/Extra Action/Resource-Conversion) — ไม่พอดันออกจาก C. Olympus enlarge (lv7) กับ Meteor Blow (lv15) ทั้งคู่เสริม Burst/Breadth ที่ Damage tally นับ "เหนือ" อยู่แล้วจาก Combat Channeling/Fireball-tier — ไม่ข้าม threshold ใหม่. Concussive Strike (lv10, dazed on-hit) เป็น Control ทางเลือกที่สองแต่ยังเป็น single-target เหมือน Command เดิม ไม่ขยับ Breadth พอ

---

## Order of Wild Hunters (ranged arrow-caster)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Action Economy | 2-4 | **B** (baseline C) | **Portal Key: Quiver (ปลดล็อกส่วนที่ 2 ตั้งแต่ lv2)** — bonus action สลับ spell-attack เป็น ranged weapon attack ที่ยิงพร้อมกับดาเมจสเปลล์ **เร็วกว่า Combat Channeling ของ base-class 3 เลเวล** → Bonus Action + Resource-Conversion modifier flip จาก D เป็น "เหนือ" ทั้งคู่ → tally lv2-4 กลายเป็น 2 เหนือ/2 ต่ำ(Reaction, Extra Action) = **เสมอ 2-2 (ครั้งที่ 7 ในระบบ)** ⚠️ net cancellation → กลับ Primary = **B** (ไม่ใช่ C ที่ baseline โดนกดเพราะ 4/4 ต่ำกว่า) — lv1 ยังไม่มีผล (ฟีเจอร์นี้ระบุ "starting at 2nd level" ชัดเจน) |

Bonus Focus [Asphodel] (lv7, ยิงซ้ำเมื่อพลาด), Fey Arrowhead (lv10, teleport ไปจุดตกกระสุน), Arrow Downpour (lv15, AoE line 8d6+10) ทั้งหมดเสริมมิติที่ tally มีอยู่แล้ว (Burst/Breadth ที่ "เหนือ" จาก Fireball-tier lv9 หรือเป็น mobility tool ที่ไม่ map เข้า axis ไหนชัดเจน) — ไม่ข้าม threshold เพิ่ม

---

## สรุปเกรดพีค (Lv20, เทียบ baseline)

| Subclass | Damage | Control | Support | Survivability | Action Econ | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| Baseline (lv20) | B | B | C | B | A | B | B |
| Blinknights | B | B | C | B | A | B | B |
| Dimensional Magi | **S** | **S** | C | B | A | **S** | B |
| Titanfists | B | B | C | B | A | B | B |
| Wild Hunters | B | B | C | B | A | B | B |

---

## ข้อค้นพบเบื้องต้น

1. **Blinknights และ Titanfists เป็น subclass แรกในระบบทั้งหมด (91 subclass ก่อนหน้า) ที่จบด้วย 0 delta เป๊ะ** — ไม่ใช่ข้อผิดพลาดของการประเมิน แต่เป็นผลตรงไปตรงมาของ methodology: ทั้งสองใช้ signature feature เสริม "มิติที่แรงอยู่แล้ว" (Burst, Bonus-Action ที่มี partial-flip ไม่พอ majority) แทนที่จะเปิดมิติใหม่ที่ tally ไม่เคยมี — ชี้ว่าระบบ delta-only เผยสัดส่วนความ "flavor-only" ของ subclass ได้ตรงไปตรงมากว่าระบบเดิม (0-10 คะแนนรวม ซึ่งมักให้คะแนนสูงกว่าความจริงจากการนับ feature text อย่างเดียว)
2. **Dimensional Magi's Secret Arcana (lv15) เป็นตัวอย่างที่ชัดที่สุดของ "free-cast เกินเพดานคลาส = S" — เกินเพดานถึง 2 ระดับเต็ม** (5th cap ถาวรของคลาส vs 7th-level free-cast) มากกว่าทุกเคสก่อนหน้าที่เกินแค่ 1 ระดับ (Apothecary/Reanimator) — และพิเศษตรงที่ 3 known-slot ของฟีเจอร์พอดีครอบคลุม 3 แกน (Damage/Control/Utility) พร้อมกันได้แบบไม่ชนกัน ทำให้เดียว feature เดียวดัน 3 แกนขึ้น S พร้อมกัน — สูงสุดเท่าที่เจอมาในบรรดา "1 feature ดันกี่แกน"
3. **2-2 tie เกิดซ้ำอีก 2 ครั้งในไฟล์นี้** (Dimensional Magi's Utility lv1, Wild Hunters' Action Economy lv2) รวมเป็นครั้งที่ 6-7 ของทั้งระบบ (ก่อนหน้า: Barbarian×2, Bard×1, Captain×2) — ยิ่งตอกย้ำว่ากฎเสมอกันควรฟอร์มัลไลซ์เข้า Anchor Rubric อย่างเป็นทางการ ยังไม่แก้ รอ user คอนเฟิร์ม
4. **Wild Hunters' quiver-substitution (lv2) เป็น "Extra Attack via subclass" pattern เวอร์ชันย่อ** — มาเร็วกว่า base-class's Combat Channeling (lv5) ถึง 3 เลเวล แต่ให้ผลแค่ระดับ tie-break shift (C→B) ไม่ใช่ full skip-the-dip แบบที่ Armorer/Battle Smith/College of Valor/Star-Spangled Banner ทำกับ Damage axis — เพราะกลไกให้ Action Economy โดยตรง ไม่ได้แก้ Attack-Action-Efficiency Primary ของ Damage
5. **ทั้ง 4 subclass ไม่มีใครแตะ Control/Support/Survivability/Versatility เลยสักตัว** — ต่างจากคลาสก่อนหน้าที่มักมี subclass อย่างน้อย 1 ตัวดัน Survivability หรือ Control ได้ (Channeler's Planar Order signature features เน้น Damage/Utility/Action-Economy เป็นหลักตามธีม "gish นักผจญภัยข้ามมิติ" ไม่ใช่ตัวป้องกัน/ซัพพอร์ต) — Sacred Knight ยังเป็นคลาสเดียวที่มี Control/Versatility D-lock ทุก subclass, Channeler กลับกันคือ Control/Support ไม่มี subclass ไหนขยับเลย
