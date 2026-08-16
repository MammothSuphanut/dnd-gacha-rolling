# Alchemist — Class Baseline (Level-Indexed, 2024)

**ชั้น**: 1 (Class Baseline) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — เทียบ Alchemist เปล่าๆ (ไม่นับ subclass feature ใดๆ) กับ Anchor Rubric ทุกเลเวล 1-20
**ที่มาข้อมูล**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` (source `ValdaSpire24`) — classFeature + classTableGroups + optionalfeature (Bomb Formula/Discovery) ทั้งหมด ยืนยันจากไฟล์จริง ไม่ใช่ความจำ
**รูปแบบตาราง**: Compact grade+เหตุผล (Lv | Grade | เหตุผล) — ยืนยันกับ user ก่อนเริ่มเขียนแล้ว (2026-08-16)
**สถานะ**: 🚧 เสร็จ 7/7 axis (คลาสแรกของชั้น 1)

⚠️ **ห่างจากระบบเดิม**: [alchemist-subclass-scorecard-2024.md](alchemist-subclass-scorecard-2024.md) คือ Class Baseline ของระบบเก่า (คะแนนภาพรวม 0-10 เดียว) — ไฟล์นี้เป็นคนละระบบ (level-indexed) ไม่ทับซ้อน ไม่แก้ไฟล์เก่า ตัวเลข chassis อ้างอิงเดียวกัน (เพิ่งมีข้อมูล Bomb Formula/Discovery ครบกว่าตอนทำระบบเก่า 2026-08-07 ซึ่งตอนนั้นระบุว่า "ข้อมูลไม่ครบ" — รอบนี้ดึงมาครบแล้ว)

---

## สรุป Chassis

HD d8, ไม่มี spellcasting ปกติ (ใช้ Bomb + Reagent + Potion แทน), save prof DEX+INT, armor light เท่านั้น, weapon simple+Bomb (martial weapon, ranged 30/90, Fire dmg, mastery Explode — attack roll ปกติ หรือใช้ Alchemist Save DC แทนถ้าใช้ Explode property ทำ AoE)

| Lv | Bomb Damage | Prime Bomb (cap) | Reagents/วัน | Formulas รู้ | Discoveries รู้ | Milestone อื่น |
|---|---|---|---|---|---|---|
| 1 | 1d10 | 0 | 2 | 0 | 0 | Bombs, Potion Brewing, Reagents, Alchemist Save DC |
| 2 | 1d10 | 1 | 4 | 3 | 0 | **Prime Bomb, Bomb Formulas (เลือก 3, สลับ 1/Long Rest), Reagent Synthesis** |
| 3 | 1d10 | 1 | 6 | 3 | 0 | (Alchemist Subclass — ไม่นับใน baseline) |
| 4 | 1d10 | 1 | 8 | 4 | 0 | ASI/Feat (ไม่นับใน baseline ตาม flat+3 convention) |
| 5 | 2d10 | 2 | 10 | 4 | 1 | **Discovery #1, Improved Bombs (2d10)** |
| 7 | 2d10 | 2 | 14 | 4 | 1 | **Evasion** |
| 9 | 2d10 | 3 | 18 | 5 | 2 | **Discovery #2** |
| 11 | 3d10 | 3 | 22 | 5 | 2 | **Blast Coating, Bomb Damage→3d10** |
| 13 | 3d10 | 4 | 26 | 6 | 3 | **Discovery #3** |
| 15 | 3d10 | 4 | 30 | 6 | 3 | **Potion Mixologist** |
| 17 | 4d10 | 5 | 34 | 7 | 4 | **Discovery #4, Bomb Damage→4d10** |
| 18 | 4d10 | 5 | 36 | 7 | 4 | **Experimentalist (สลับ Formula ได้ทั้งหมด/Long Rest)** |
| 20 | 4d10 | 5 | 40 | 8 | 4 | **Nuclear Bomb (10d10+100 Force, รัศมี 1 ไมล์, ใช้ครั้งเดียว), Philosopher's Stone** |

**Bomb Formula ที่ใช้อ้างอิงเป็นตัวแทน baseline** (จาก 18 ตัวเลือก, รู้ 3→8 ตัวพร้อมกัน สลับ 1/Long Rest จนถึง lv17, สลับได้ทั้งหมด/Long Rest ตั้งแต่ lv18): Impact Bomb (Force dmg d8 + Prone), Fear Bomb (Psychic dmg d6 + Frightened จนต้นเทิร์นถัดไป), Bramble Bomb (ไม่มีดาเมจ + Speed=0 จนกว่าจะสลัดหลุด/1 นาที) — ใช้เป็นตัวแทน Damage-type-swap (Resistance-proofing) และ Control (Bramble/Fear) ตามลำดับ

---

## Damage

**Primary**: Magnitude (Bomb dice + flat Int mod +3, ตามธรรมเนียม Anchor — Bomb เป็น "attack ไม่จำกัดจำนวนครั้ง/วัน" เทียบเท่าอาวุธมาร์เชียล ไม่ใช่ slot-based)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Bomb 1d10+3=**~9** ผ่าน ranged attack roll — ตรงเป๊ะกับมาร์เชียล peer(~9, 1d10+3 เหมือนกัน) ไม่ต่างกัน แต่ Bomb เลือกทำ AoE ได้ตั้งแต่ lv1 (Explode property) ซึ่งมาร์เชียล peer ไม่มี — modifier เดียวไม่พอขยับเกรด (1/4) |
| 2 | A | Bomb Formulas ปลดล็อก (รู้ 3 ตัว) → เลือกดาเมจชนิดอื่นได้ (Force/Psychic/Cold/Thunder) **ทันทีตั้งแต่ lv2** เร็วกว่า full-caster ที่มักได้ pivot ชนิดดาเมจราวๆ lv11 — Breadth(AoE)+Resistance-proofing 2/4 modifier เหนือ peer → ขยับ B→A |
| 3 | =lv2 | ไม่มีจุดเปลี่ยน (Subclass gate ที่ lv3 ไม่นับใน baseline) |
| 4 | =lv2 | ไม่มีจุดเปลี่ยน |
| 5 | B | Improved Bombs: 2d10+3=**~14** ต่ำกว่ามาร์เชียล peer(Extra Attack 2 ครั้ง=~17) — Primary ตกเป็น C แต่ Breadth+Resistance-proofing ยังเหนือ peer (2/4) → ขยับกลับ C→B |
| 6 | =lv5 | ไม่มีจุดเปลี่ยน |
| 7 | =lv5 | ไม่มีจุดเปลี่ยน (Evasion เป็น Survivability ไม่กระทบ Damage) |
| 8 | =lv5 | Formulas รู้เพิ่มเป็น 5 ตัว — เสริม Resistance-proofing ไม่เปลี่ยนเกรด |
| 9 | =lv5 | Prime Bomb cap→3 (burst แรงขึ้น) Magnitude ยังคง 14 (C) แต่ modifier ยังพอ (2-3/4) → คงเป็น B |
| 10 | =lv5 | ไม่มีจุดเปลี่ยน |
| 11 | A | Bomb Damage→3d10+3=**~20** **เกินมาร์เชียล peer(17)แล้ว** (แต่ยังต่ำกว่า Fighter outlier ~26) — Primary=A ตรงๆ, Blast Coating(Survivability)ไม่กระทบ Damage |
| 12 | =lv11 | Formulas รู้เพิ่มเป็น 6 ตัว ไม่เปลี่ยนเกรด |
| 13 | =lv11 | Prime Bomb cap→4 (burst แรงขึ้นอีก) ไม่เปลี่ยนเกรด |
| 14 | =lv11 | ไม่มีจุดเปลี่ยน |
| 15 | =lv11 | Potion Mixologist เป็น Action Economy ไม่กระทบ Damage |
| 16 | =lv11 | Formulas รู้เพิ่มเป็น 7 ตัว ไม่เปลี่ยนเกรด |
| 17 | S | Bomb Damage→4d10+3=**~25** เกินทั้งมาร์เชียล peer(17)และ caster peer(4d10 cantrip=~22) เข้าใกล้ Fighter outlier(~26) มาก — **ระดับ outlier-comparable จริง** ต่างจาก lv11 ที่แค่เหนือ peer ธรรมดา |
| 18 | =lv17 | Experimentalist เป็น Versatility ไม่กระทบ Damage โดยตรง |
| 19 | =lv17 | Epic Boon ไม่นับใน baseline (ขึ้นกับ feat ที่เลือก) |
| 20 | =lv17 ⚠️ | ตัวเลขคงที่ ~25 แต่มี **Nuclear Bomb เป็น ceiling outlier แยกต่างหาก** — 10d10+100 Force (avg **~155**!) รัศมี 1 ไมล์ **ใช้ได้ครั้งเดียว** (ทำลาย Philosopher's Stone ต้องสร้างใหม่ 1000+GP/7วัน) เทียบเท่ากับที่ Anchor แฟลก Fighter's 4-attack lv20 ไว้ — ไม่นับเป็น sustained Magnitude แต่ควรได้คะแนนเหนือมาตรฐาน (S) ถ้าประเมิน Burst/Peak แยก |

**สรุปเกรด**: B(1) → A(2-4) → B(5-10) → A(11-16) → S(17-20)

---

## Control

**Primary**: Severity — Bomb Formula ให้ทางเลือก control จริง (Impact=Prone, Fear=Frightened, Bramble=Speed 0) แต่เพดาน Severity สูงสุดที่ base chassis ทำได้คือ **Tier 2** (ไม่มี formula ไหนให้ Tier 3-4 อย่าง Charmed/Restrained/Stunned/Paralyzed) — ต่ำกว่า full-caster Anchor ที่แตะ Tier 4 ตั้งแต่ lv1 (Sleep) ชัดเจน — **Bramble Bomb (Speed=0, ไม่มีดาเมจ)** ใช้เป็นตัวแทนอ้างอิงหลักเพราะมี stickiness ดีสุด (หลุดด้วย Athletics check เท่านั้น ไม่ใช่ save ทุกเทิร์น)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | D | Formulas ยังไม่ปลดล็อก (lv2) — ไม่มีกลไก control ใดๆ เลยที่ chassis ระดับนี้ |
| 2 | C | Bomb Formula ปลดล็อก — เลือก Bramble Bomb ได้ (Speed=0, STR save, AoE ผ่าน Explode, unlimited-use) แต่ Severity สูงสุด = Tier 2 ต่ำกว่า Anchor peer(Tier 4) ชัดเจน — modifier ที่เหนือ peer มีแค่ Frequency(unlimited)+Concentration Risk(ไม่มีเลย เพราะเป็น condition ผูกกับ target ไม่ใช่ spell ที่ต้อง concentration) = 2/5 **ไม่ถึง ≥3/5 ของ Control** (6 มิติ) → ไม่พอขยับเกรด คงที่ C |
| 3 | =lv2 | ไม่มีจุดเปลี่ยน |
| 4 | =lv2 | ไม่มีจุดเปลี่ยน |
| 5 | =lv2 | Discovery #1 (ไม่มีตัวเลือกที่เพิ่ม Severity โดยตรงในเมนู 12 ตัว) |
| 6 | =lv2 | ไม่มีจุดเปลี่ยน |
| 7 | =lv2 | Evasion เป็น Survivability ไม่กระทบ Control |
| 8 | =lv2 | Formulas รู้เพิ่ม (5 ตัว) — เพิ่มความยืดหยุ่นแต่ไม่เพิ่ม Severity เพดาน |
| 9 | =lv2 | Discovery #2 — ไม่กระทบ Control โดยตรง |
| 10 | =lv2 | ไม่มีจุดเปลี่ยน |
| 11 | =lv2 | Blast Coating เป็น Survivability ไม่กระทบ Control |
| 12 | =lv2 | Formulas รู้เพิ่ม (6 ตัว) |
| 13 | =lv2 | Discovery #3 |
| 14 | =lv2 | ไม่มีจุดเปลี่ยน |
| 15 | =lv2 | Potion Mixologist เป็น Action Economy |
| 16 | =lv2 | Formulas รู้เพิ่ม (7 ตัว) |
| 17 | =lv2 | Discovery #4 — ไม่มีตัวเลือกใน 12 Discovery ที่ยกระดับ Severity เพดานของ Bomb Formula |
| 18 | =lv2 | Experimentalist ทำให้สลับ Formula ได้เต็มที่ (Versatility) แต่ Severity เพดานยังคงเดิม |
| 19 | =lv2 | ไม่มีจุดเปลี่ยน |
| 20 | =lv2 | Nuclear Bomb/Philosopher's Stone เป็น Damage/Utility ไม่กระทบ Control |

**สรุปเกรด**: D(1) → C(2-20) แบนราบตลอดอาชีพ — ยืนยันว่า floor เดิมของระบบเก่า (3/10≈C) แม่นแล้วแม้ตอนนั้นข้อมูล Bomb Formula ไม่ครบ เหตุผลที่แท้จริงคือ **เพดาน Severity ต่ำ (Tier 2 สูงสุด)** ไม่ใช่ "ไม่มีกลไก control เลย" อย่างที่ตั้งข้อสังเกตไว้ก่อนหน้า

---

## Support

**Primary**: Magnitude — Potion Brewing ให้เข้าถึง healing potion จริง แต่ต้อง brew ล่วงหน้า (10 นาที, นับเป็น short rest ได้) + สต็อก potion active พร้อมกันจำกัดที่ Int mod (มักแค่ 3-5) ต่างจาก spell แบบ cast-เมื่อต้องการของ Anchor

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Potion of Healing (2d4+2≈**7**) ใกล้เคียง Anchor's Healing Word(~8) แต่ต้อง brew ล่วงหน้า+สต็อกจำกัด (Access Cost ต่ำกว่า peer ชัดเจน) — Primary ผสม(magnitude ใกล้เคียงแต่ access แย่กว่า) ลงเอยที่ C |
| 2 | =lv1 | ไม่มีจุดเปลี่ยน |
| 3 | =lv1 | ไม่มีจุดเปลี่ยน |
| 4 | =lv1 | Potion of Greater Healing ปลดล็อก (4d4+4≈**14**) ใกล้เคียง Anchor lv1 Cure Wounds(~12) แต่มาช้ากว่า 3 เลเวล+ยังติด access-cost เดิม — ยังคง C |
| 5 | =lv1 | ไม่มีจุดเปลี่ยน (Discovery #1 ไม่กระทบ Support โดยตรงเว้นเลือก Alchemy of Restoration) |
| 6 | =lv1 | ไม่มีจุดเปลี่ยน |
| 7 | =lv1 | Evasion เป็น Survivability |
| 8 | =lv1 | **Potion of Superior Healing ปลดล็อก (8d4+8≈28)** ใกล้เคียง Anchor lv9 Mass Cure Wounds(~26/คน) — magnitude ไล่ทันแล้วแต่ยัง single-target+access-cost เดิม คงที่ C |
| 9 | =lv1 | ไม่มีจุดเปลี่ยน |
| 10 | =lv1 | ไม่มีจุดเปลี่ยน |
| 11 | =lv1 | Blast Coating เป็น Survivability |
| 12 | =lv1 | Potion of Invulnerability ปลดล็อก (resist ทุกดาเมจ 1 นาที) — buff-ทางอ้อมที่แรงแต่ไม่ใช่ healing โดยตรง ไม่เปลี่ยนเกรด magnitude หลัก |
| 13 | =lv1 | ไม่มีจุดเปลี่ยน |
| 14 | =lv1 | ไม่มีจุดเปลี่ยน |
| 15 | =lv1 | Potion Mixologist เป็น Action Economy (ไม่เพิ่ม magnitude แค่ประหยัด action) |
| 16 | =lv1 | Potion of Speed ปลดล็อก — buff ไม่ใช่ heal |
| 17 | =lv1 | Discovery #4 — ไม่มีตัวเลือกยก healing magnitude เกิน Superior Healing |
| 18 | =lv1 | Experimentalist ไม่กระทบ magnitude การฮีล |
| 19 | =lv1 | ไม่มีจุดเปลี่ยน |
| 20 | =lv1 | Philosopher's Stone (Quick Brewing) แก้ access-cost บางส่วน (brew เป็น Utilize action แทน 10 นาที) แต่ magnitude สูงสุดยังคง Superior Healing(~28) ไม่ขยับ |

**สรุปเกรด**: C(1-20) แบนราบตลอดอาชีพ — ตรงกับระบบเก่า (4/10≈C) แม่นยำ magnitude ไล่ทัน Anchor ได้เรื่อยๆ (lv8 ทันคู่ lv9 ของ Anchor) แต่ access-cost (ต้อง brew ล่วงหน้า+สต็อกจำกัด) กดเกรดไว้ที่ C ตลอด

---

## Survivability

**Primary**: Effective HP (d8+flat CON+3 — สูตรเดียวกับ Anchor เป๊ะ ตัวเลขจึงตรงกับ Anchor's Survivability table ทุกแถว: 11,19,27,35,43,51,59,67,75,83,91,99,107,115,123,131,139,147,155,163)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Effective HP=11 ตรง peer(B) แต่ Mitigation/Debuff Resistance/Death Prevention ทั้ง 3 มิติ=D (ยังไม่มีกลไกใดๆ) ≥2/4 below → ขยับลง B→C (รูปแบบเดียวกับตัวอย่าง Wizard lv1 ใน Anchor เป๊ะ) |
| 2-6 | =lv1 | ไม่มีจุดเปลี่ยน (Reagent Synthesis lv2 เป็น resource ไม่ใช่ survivability) |
| 7 | C | **Evasion ปลดล็อก** — ตรงกับ feature ที่ Anchor เองยกเป็น "ตัวอย่างเพดาน" ของ Debuff/Condition Resistance (Rogue/Monk) พอดี ดัน Debuff Resistance จาก D→เหนือ peer แต่ Mitigation+Death Prevention ยังเป็น D อยู่ 2/4 (≥2/4) below ยังคงพอที่จะกดเกรดไว้ที่ C (Evasion เด่นมิติเดียวไม่พอ) |
| 8-10 | =lv7 | ไม่มีจุดเปลี่ยน |
| 11 | B | **Blast Coating ปลดล็อก** — กัน dmg จาก Bomb ตัวเอง 100% เป็น Mitigation แบบแคบ(เฉพาะ self-bomb) แต่ทำให้ Mitigation ไม่ใช่ D เต็มๆอีกต่อไป (นับเป็น tie ไม่ใช่ below) เหลือ below แค่ 1/4 (Death Prevention เท่านั้น) ไม่ถึง ≥2/4 → เกรดกลับขึ้น B (Primary ล้วน) |
| 12-14 | =lv11 | ไม่มีจุดเปลี่ยน |
| 15-19 | =lv11 | ไม่มีจุดเปลี่ยน (Potion Mixologist เป็น Action Economy) |
| 20 | =lv11 | Philosopher's Stone ไม่เพิ่ม Mitigation/Death Prevention โดยตรง |

**สรุปเกรด**: C(1-10) → B(11-20) — ดีขึ้นจากระบบเก่า(4/10≈C คงที่) เพราะข้อมูลละเอียดกว่าเผยว่า Blast Coating(lv11) ดันเกรดขึ้นจริง

---

## Action Economy

**Primary**: Attack-Action Efficiency — **ชี้แจง methodology (ยืนยันจาก user 2026-08-16)**: Alchemist ไม่มี Extra Attack เลยตลอดอาชีพ (เหมือน full caster ส่วนใหญ่) แต่ยังมี Bomb attack ปกติทุกเทิร์น (1 attack/action) จึงให้ **C** ไม่ใช่ D เมื่อต่ำกว่า peer (สงวน D ไว้เฉพาะคลาสที่ไม่มี attack routine เลยจริงๆ) — บันทึกไว้ใน [00-level-anchor-rubric.md § Primary dimension table](00-level-anchor-rubric.md#sub-dimension-tie-break--เกรดเดียวจากหลายมิติที่อาจไม่ตรงกัน-เพิ่ม-2026-08-14-รอบ-2-แก้ให้รองรับจำนวนมิติไม่เท่ากันรอบ-10) แล้ว

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | 1 attack/action ตรง peer (ยังไม่มีใครมี Extra Attack ในช่วงนี้) — ไม่มี Bonus/Reaction/Extra-Action feature ใดๆ (1/4 below, ไม่พอขยับ) |
| 2-4 | =lv1 | ไม่มีจุดเปลี่ยน (Reagent Synthesis เป็น resource-recovery ไม่ใช่ resource-to-action conversion) |
| 5 | C | มาร์เชียล peer ได้ Extra Attack(2atk) แต่ Alchemist ยังคง 1atk/action — Primary ตกเป็น C (มีกลไกจริง แค่ต่ำกว่า peer ตาม methodology ที่ยืนยันแล้ว) ไม่มี modifier พอชดเชย |
| 6-14 | =lv5 | ไม่มีจุดเปลี่ยน |
| 15 | C | **Potion Mixologist** — ดื่ม 2 potion พร้อมกันด้วย Bonus Action เดียว เป็น Bonus Action Value ที่เหนือ peer จริง แต่มิติเดียวไม่พอ (1/4 above) ขยับเกรดไม่ได้ตามกฎ ≥2/4 — คงที่ C |
| 16-19 | =lv15 | ไม่มีจุดเปลี่ยน |
| 20 | =lv15 | Quick Brewing (Philosopher's Stone) ยกระดับ Potion Brewing จาก 10 นาทีเป็น Utilize action — เป็น Utility/Frequency มากกว่า Action-Economy-per-turn โดยตรง ไม่เปลี่ยนเกรด |

**สรุปเกรด**: B(1-4) → C(5-20) — ตรงกับระบบเก่า (4/10≈C) เกือบทั้งหมด มี nuance เพิ่มว่าช่วง pre-Extra-Attack(lv1-4) จริงๆ ตรง peer พอดี

---

## Utility

**Primary**: Magnitude — Potion Brewing ให้ solution เบ็ดเสร็จจริง (Water Breathing, Invisibility, Flying) แต่ Access Cost (brew ล่วงหน้า+สต็อกจำกัด Int mod) กับ Skill-Check Layer (ไม่มีเลยที่ chassis) ถ่วงเกรดไว้

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Potion of Water Breathing/Climbing/Diminution/Growth/Resistance — magnitude ใกล้เคียง Anchor's ritual spell lv1 (ให้ solution เบ็ดเสร็จ) แต่ Access Cost ต่ำกว่าชัดเจน (brew ล่วงหน้า vs ritual cast-ได้ทันที) + Skill-Check Layer=D (ไม่มีเลย) 2/4 below → ขยับลง B→C |
| 2-3 | =lv1 | ไม่มีจุดเปลี่ยน |
| 4 | =lv1 | **Potion of Invisibility ปลดล็อก** — solution สมบูรณ์เพิ่มอีกประเภท (stealth) magnitude ดีขึ้นแต่ access-cost/skill-layer ยังกดไว้ที่ C เท่าเดิม |
| 5-7 | =lv1 | ไม่มีจุดเปลี่ยน |
| 8 | =lv1 | Potion of Heroism/Hill Giant Strength ปลดล็อก — เป็น buff มากกว่า utility แท้ ไม่เปลี่ยนเกรด |
| 9-11 | =lv1 | ไม่มีจุดเปลี่ยน |
| 12 | =lv1 | **Potion of Flying ปลดล็อก** — magnitude พีคของแกนนี้ (มิติการเดินทาง/exploration ระดับสูง) แต่สต็อกจำกัด Int mod (ไม่ใช่ปาร์ตี้ทั้งหมดพร้อมกันเสมอ) + access-cost เดิม ยังคงเกรด C |
| 13-15 | =lv1 | ไม่มีจุดเปลี่ยน |
| 16 | =lv1 | Potion of Speed ปลดล็อก — buff-utility hybrid ไม่เปลี่ยนเกรด |
| 17-19 | =lv1 | ไม่มีจุดเปลี่ยน |
| 20 | =lv1 | Quick Brewing (Philosopher's Stone) ลด access-cost ลงจริง (10นาที→Utilize action) แต่ยังติดสต็อกจำกัด Int mod + ไม่มี Skill-Check Layer อยู่ดี — ไม่พอขยับเกรด |

**สรุปเกรด**: C(1-20) แบนราบตลอดอาชีพ — Access Cost + ไม่มี Skill-Check Layer เป็นคอขวดถาวรของแกนนี้ แม้ magnitude ของ potion จะดีขึ้นเรื่อยๆ ตามเลเวลก็ตาม

---

## Versatility

**Primary**: Loadout Flexibility — Bomb Formula สลับ **1 ตัว/Long Rest** (lv2-17) ตรงกับ tier "กลาง" ของ Anchor (Paladin/Ranger) พอดี แล้วกระโดดเป็น **สลับได้ทั้งหมด/Long Rest** (lv18+, Experimentalist) ตรงกับ tier "สูง" (Wizard/Cleric/Druid/Artificer) — ค้นพบใหม่ที่ระบบเก่าไม่เคยระบุความละเอียดระดับนี้ (Discovery มีคนละ cadence คือสลับได้แค่ตอนเลเวลอัพ = tier "ต่ำ" แยกกัน แต่ Formula เป็น pool หลักที่ใช้บ่อยกว่า)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | D | ยังไม่มี Formula/Discovery เลย (ปลดล็อก lv2/lv5) — Primary=D ตรงๆ ตามกฎ floor rule → เกรดรวมล็อก D ทั้งแกน |
| 2 | A | **Formula ปลดล็อก (tier กลาง)** = B ทันที + **Reagent เดียวกันจ่ายได้ทั้ง Prime Bomb(Damage) และ Potion Brewing(Support/Utility)** = Resource Fungibility กระโดดสูง (ตรงกับตัวอย่าง fungibility ที่ Anchor เองยกไว้) บวก Cross-Axis Coverage เพิ่ม(Control ผ่าน Formula) + Adaptability(เลือก Formula ต่อการโจมตีได้อิสระ) = 3/4 modifier เหนือ peer → ขยับ B→A |
| 3-4 | =lv2 | ไม่มีจุดเปลี่ยน |
| 5 | =lv2 | Discovery #1 (cadence ต่ำ แยกจาก Formula) — เสริม breadth เล็กน้อย ไม่เปลี่ยนเกรด |
| 6 | =lv2 | ไม่มีจุดเปลี่ยน |
| 7 | =lv2 | Evasion เพิ่ม Cross-Axis Coverage (Survivability) — เสริมไม่เปลี่ยนเกรด |
| 8-10 | =lv2 | ไม่มีจุดเปลี่ยน |
| 11 | =lv2 | Blast Coating เสริม Cross-Axis Coverage อีกเล็กน้อย ไม่เปลี่ยนเกรด |
| 12-14 | =lv2 | ไม่มีจุดเปลี่ยน |
| 15 | =lv2 | Potion Mixologist เติม Cross-Axis Coverage ครบ 6/6 axis (Action Economy สุดท้าย) — เสริมความหนาแน่นของ modifier ที่เหนือ peer อยู่แล้ว ไม่ขยับเกรดต่อ (คงเพดาน +1 step) |
| 16 | =lv2 | ไม่มีจุดเปลี่ยน |
| 17 | =lv2 | Discovery #4 — ไม่เปลี่ยนเกรด |
| 18 | A | **Experimentalist** — Formula สลับได้**ทั้งหมด**/Long Rest = ตรง tier "สูง" (เท่า Wizard/Cleric/Druid/Artificer) พอดี เป็นจุดพีคของแกนนี้ แต่การขยับตามกฎ tie-break ทำได้สูงสุด+1 step เท่าเดิม (จาก B ที่ตรง top-tier ขึ้นไป A) — **ใกล้ S มากแต่ยังไม่ถึงเกณฑ์ outlier-comparable** |
| 19-20 | =lv18 | Philosopher's Stone (Quick Brewing) เสริม Fungibility อีกเล็กน้อย ไม่ขยับเกรดต่อ |

**สรุปเกรด**: D(1) → A(2-20) — จุดกระโดดเดี่ยวที่ชัดที่สุดในทั้ง 7 axis ของ Alchemist (จากต่ำสุดไปเกือบสูงสุดในเลเวลเดียว) เพราะ Formula+Reagent-fungibility ทั้งหมดผูกติดกับ lv2 milestone เดียว

---

## สรุปรวม 7 axis

| Axis | เกรดตามเลเวล |
|---|---|
| Damage | B(1) → A(2-4) → B(5-10) → A(11-16) → S(17-20) |
| Control | D(1) → C(2-20) |
| Support | C(1-20) |
| Survivability | C(1-10) → B(11-20) |
| Action Economy | B(1-4) → C(5-20) |
| Utility | C(1-20) |
| Versatility | D(1) → A(2-20) |

**ข้อค้นพบสำคัญ**:
1. **lv2 คือจุดเปลี่ยนใหญ่ที่สุดของ Alchemist ข้ามแกน** (Damage B→A, Control D→C, Versatility D→A พร้อมกัน) เพราะ Bomb Formulas + Prime Bomb + Reagent Synthesis ปลดล็อกพร้อมกันหมดที่ lv2 เดียว — ต่างจาก full-caster ที่จุดเปลี่ยนมักกระจายตาม slot level
2. **Damage มีจุดกลับตัว 2 รอบ** — B(1)→A(2, ดีกว่า peer จาก formula)→B(5, แย่กว่า peer เพราะไม่มี Extra Attack)→A(11)→S(17, Bomb dice แซง peer ทุกสาย) เป็น pattern ที่ไม่เชิงเส้น ต่างจาก Anchor's marchial/caster tracks ที่ไต่ขึ้นทางเดียว
3. **Control ยืนยัน floor เดิมของระบบเก่าถูกต้อง แต่ด้วยเหตุผลที่ต่างไป** — ไม่ใช่ "ไม่มีกลไก" แต่เป็น "มีกลไกจริงแต่เพดาน Severity ต่ำ (Tier 2 สูงสุด)"
4. **Support/Utility ทั้งคู่แบนราบที่ C ตลอดอาชีพ** — สาเหตุเดียวกัน (Access Cost จาก brew-ล่วงหน้า+สต็อกจำกัด Int mod) เป็น "cost" ที่ Anchor ไม่มีเทียบเท่าในระบบ spell-slot ปกติ
5. **Versatility มี 2 resource pool คนละ cadence** (Formula=Long-Rest tier กลาง, Discovery=level-up tier ต่ำ) — ครั้งแรกที่พบคลาสมี Loadout Flexibility ไม่เป็นค่าเดียวตลอดอาชีพเหมือนที่ Anchor สมมติไว้ (Anchor's Versatility finding #1 บอกว่ามิตินี้ "คงที่ตายตัวตั้งแต่ lv1" — Alchemist แหกกฎนั้นตรงๆ ที่ lv18 Experimentalist) — **ควรบันทึกเป็นข้อยกเว้นในการอัปเดต Anchor Rubric ภายหลังถ้าเจอเคสอื่นซ้ำ**
6. **Methodology fix ที่เกิดระหว่างทำ**: Action Economy's Primary dimension (Attack-Action Efficiency) สำหรับคลาสไม่มี Extra Attack ตอนนี้ชัดเจนแล้วว่า = **C** ไม่ใช่ D (บันทึกใน Anchor Rubric แล้ว) — มีผลกับทุกคลาสที่ไม่มี Extra Attack ในชั้น 1 ต่อจากนี้
