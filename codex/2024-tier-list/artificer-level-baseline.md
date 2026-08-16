# Artificer — Class Baseline (Level-Indexed, 2024)

**ชั้น**: 1 (Class Baseline) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — เทียบ Artificer เปล่าๆ (ไม่นับ subclass feature ใดๆ) กับ Anchor Rubric ทุกเลเวล 1-20
**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-artificer.json` — source `EFA` (*Eberron: Forge of the Artificer*, `edition: "one"` = 2024-compatible) — classFeature + classTableGroups ทั้งหมดยืนยันจากไฟล์จริง
**รูปแบบตาราง**: Compact grade+เหตุผล (Lv | Grade | เหตุผล) — เหมือน [alchemist-level-baseline.md](alchemist-level-baseline.md)
**สถานะ**: 🚧 เสร็จ 7/7 axis (คลาสที่ 2 ของชั้น 1)

⚠️ **ห่างจากระบบเดิม**: [artificer-subclass-scorecard-2024.md](artificer-subclass-scorecard-2024.md) คือ Class Baseline ของระบบเก่า (คะแนนภาพรวม 0-10 เดียว) — ไฟล์นี้เป็นคนละระบบ (level-indexed) ไม่ทับซ้อน ไม่แก้ไฟล์เก่า

⚠️ **ช่องว่างข้อมูลสำคัญ (ค้นพบระหว่างทำไฟล์นี้ 2026-08-16)**: ไฟล์ spell ทุกไฟล์ในโปรเจกต์ (`spells-xphb.json` ฯลฯ) **ไม่มี field `classes`/`fromClassList` เก็บไว้เลย** — ตรวจแล้วว่าไม่ใช่แค่ Artificer แต่เป็นข้อจำกัดของ mirror ข้อมูลทั้งหมด ไม่มีทางตรวจจากไฟล์จริงได้ว่าคลาสไหนได้สเปลล์ตัวไหนบ้าง (ปัญหานี้จะเจอซ้ำกับทุกคลาสที่มี spellcasting จริงในชั้น 1 ต่อจากนี้ ไม่ใช่แค่ Artificer) — **user ยืนยันให้ใช้ความรู้ทั่วไปของระบบเกม** (spell list ที่เป็นที่รู้จักกันทั่วไปจากหนังสือจริง) แทน โดยระบุชัดในไฟล์ทุกจุดที่อ้างอิงสเปลล์เฉพาะ ว่ามาจากความรู้ทั่วไป ไม่ใช่ data file — **ตัวเลข/กลไกของสเปลล์เอง (dice, duration, condition) ยังคงยืนยันจาก `spells-xphb.json` จริงตามปกติ** มีแค่ "สเปลล์ตัวนี้อยู่ใน list ของ Artificer หรือเปล่า" เท่านั้นที่ใช้ความรู้ทั่วไปแทน

---

## สรุป Chassis

HD d8, spellcasting ability **Int**, save prof **CON+INT**, armor light/medium/shield (**ไม่มี heavy**), weapon **simple เท่านั้น** (ไม่มี martial — ต่างจาก Alchemist ที่มี Bomb เป็น martial weapon), tool Thieves'+Tinker's+Artisan's 1 ชนิด — caster progression แบบ half-caster: **slot1 ที่ lv1** (เร็วกว่า Paladin/Ranger 1 เลเวล) แต่ slot2-5 ตรงจังหวะเดียวกับ Paladin/Ranger เป๊ะ (lv5/9/13/17) **และไม่มี slot6 ขึ้นไปตลอดชาติ** (ยืนยันจาก `classTableGroups` — ตารางมีแค่ 5 คอลัมน์ 1st-5th เท่านั้น)

| Lv | Cantrips | Prepared | Slot สูงสุด | Plans รู้ | Items พร้อมกัน | Milestone อื่น |
|---|---|---|---|---|---|---|
| 1 | 2 | 2 | 1st×2 | — | — | Spellcasting, Tinker's Magic |
| 2 | 2 | 3 | 1st×2 | 4 | 2 | **Replicate Magic Item** |
| 3-4 | 2 | 4-5 | 1st×3 | 4 | 2 | (Subclass lv3 / ASI lv4 — ไม่นับใน baseline) |
| 5 | 2 | 6 | 2nd | 4 | 2 | (Subclass feature — ไม่นับ) |
| 6 | 2 | 6 | 2nd | 5 | 3 | **Magic Item Tinker** |
| 7 | 2 | 7 | 2nd | 5 | 3 | **Flash of Genius** |
| 9 | 2 | 9 | 3rd | 5 | 3 | (Subclass feature — ไม่นับ) |
| 10 | 3 | 9 | 3rd | 6 | 4 | Magic Item Adept (attune 4) |
| 11 | 3 | 10 | 3rd | 6 | 4 | **Spell-Storing Item** |
| 13 | 3 | 11 | 4th | 6 | 4 | (จุดเปลี่ยน slot) |
| 14 | 4 | 11 | 4th | 7 | 5 | Advanced Artifice (attune5 + Refreshed Genius) |
| 17 | 4 | 14 | 5th (สูงสุดตลอดกาล) | 7 | 5 | (จุดเปลี่ยน slot สุดท้าย) |
| 18 | 4 | 14 | 5th | 8 | 6 | Magic Item Master (attune 6) |
| 20 | 4 | 15 | 5th | 8 | 6 | **Soul of Artifice** (Cheat Death + Magical Guidance) |

**สเปลล์/กลไกที่ใช้อ้างอิงเป็นตัวแทน baseline** (ยืนยันชื่อคาถาจาก`spells-xphb.json`จริง ทุกตัวเลข/duration; **การเป็นสมาชิก Artificer spell list ใช้ความรู้ทั่วไปตามหมายเหตุด้านบน**): Damage=**Fire Bolt** (คาสเตอร์แคนทริปมาตรฐาน, ทางเลือก AoE อ่อนกว่า=Acid Splash ซึ่งยืนยันเป็น "recommended" ตรงๆในตัว classFeature Spellcasting), Control=**Grease→Web→Otiluke's Resilient Sphere**, Support=**Cure Wounds/Healing Word→Aid→Revivify→Freedom of Movement→Greater Restoration**, Utility=**Tinker's Magic + Replicate Magic Item wildcard tiers** (Common lv2+ → Uncommon lv10+ → Rare lv14+)

---

## Damage

**Primary**: Magnitude (DPR) — ใช้ **Fire Bolt** (1d10→2d10@5→3d10@11→4d10@17, ไม่บวก mod) ซึ่งเป็นแคนทริปเดียวกับที่ Anchor ใช้เป็น peer-standard ของสาย "คาสเตอร์" เป๊ะ ตัวเลขจึงตรงกับ peer **ทุกเลเวลไม่มีเบี่ยงเบนเลย** — ตัวชี้ขาดจริงจึงอยู่ที่มิติรอง (Burst/Peak, Breadth) ที่ถูกจำกัดด้วย slot cap 5th-level ถาวร

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Fire Bolt 1d10=**~6** ตรง peer เป๊ะ, Burst/Peak เท่า peer (ทั้งคู่มีแค่ resource น้อยตอนนี้), Breadth/Conditionality/Resistance-proofing เท่า peer ทั้งหมด — ไม่มี modifier ต่าง → B |
| 2-4 | =lv1 | ไม่มีจุดเปลี่ยน |
| 5-10 | B | Fire Bolt→2d10=**~11** ตรง peer เป๊ะอีกครั้ง — Burst/Peak เริ่มต่ำกว่า peer (peer มี slot3 Fireball-tier แล้ว, Artificer เพิ่งได้ slot2) **1/4 below** ไม่พอขยับเกรด (ต้อง≥2/4) → คงที่ B |
| 11-16 | C | Fire Bolt→3d10=**~16.5** ตรง peer เป๊ะเหมือนเดิม (cantrip die bump เป็น class-agnostic ทั้งคู่แซง milestone lv11 พร้อมกัน) — แต่ตอนนี้ **Breadth ก็ตกต่ำกว่า peer ด้วย** (peer ได้ slot6 AoE กว้างขึ้นที่ lv11, Artificer สูงสุดแค่ slot3 ถาวรจนถึง lv13) รวมกับ Burst/Peak ที่ต่ำกว่าอยู่แล้ว = **2/4 below** → ขยับลง 1 ขั้น B→C |
| 17-20 | =lv11-16 | Fire Bolt→4d10=**~22** ตรง peer เป๊ะเป็นครั้งที่ 4 แต่ Burst/Peak+Breadth ยังต่ำกว่า peer เท่าเดิม (Artificer แตะ slot5 เป็นเพดานถาวร ขณะ peer เดินไปถึง slot9/Wish) ช่องว่างกว้างขึ้นเรื่อยๆ แต่เกรดขยับได้สูงสุดครั้งละ 1 ขั้นเท่านั้นตามกฎ → คงที่ C |

**สรุปเกรด**: B(1-10) → C(11-20) — Magnitude (Primary) ตรง peer **ทุกเลเวลไม่มีข้อยกเว้น** เพราะ Fire Bolt เป็นแคนทริป class-agnostic แท้ๆ แต่ slot cap 5th-level ถาวรของ half-caster ทำให้ Burst/Breadth ไล่ไม่ทัน peer ตั้งแต่กลางเกมเป็นต้นไป — pattern ต่างจาก Alchemist (ซึ่งไต่ขึ้นเพราะ Bomb dice โตเร็วกว่า peer) ตรงข้ามกันเลย

---

## Control

**Primary**: Severity — Artificer spell list (ความรู้ทั่วไป) **ไม่มี** hard-CC ระดับ Tier4 เลยสักตัว (ไม่มี Hold Person/Sleep/Hypnotic Pattern/Hold Monster/Banishment/Dominate Monster/Power Word Stun-Kill/Mass Suggestion) ต่างจาก full-caster peer ที่ Anchor ใช้เป็นมาตรฐานอย่างสิ้นเชิง — ตัวแทนที่ดีที่สุดที่มีจริงคือ **Grease(Tier2, slot1)→Web(Tier3, slot2)→Otiluke's Resilient Sphere(Tier3-4 แบบ lock-single-target, slot4)**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Grease (Tier2 Prone, AoE เล็ก 10×10ft, ไม่ concentration) — มีกลไกจริงแต่ Severity ต่ำกว่า peer(Tier4 Sleep)มาก, ไม่ concentration ทำให้ Concentration Risk ดีกว่า peer 1 มิติ (**1/5 above**, ต้อง≥3/5 ถึงขยับ) → ไม่พอ คงที่ C |
| 2-4 | =lv1 | ไม่มีจุดเปลี่ยน |
| 5-8 | C | **Web ปลดล็อก** (Tier3 Restrained, AoE cube 20ft, concentration, save ทุกเทิร์นหลุด) — Severity ดีขึ้นจาก Tier2→Tier3 แต่ยังต่ำกว่า peer(Tier4)อยู่ดี, ตอนนี้ concentration แล้วเสียข้อได้เปรียบเดิมไป (0/5 above) → คงที่ C |
| 9-12 | =lv5-8 | slot3 ปลดล็อก แต่ไม่มีสเปลล์ hard-CC ใหม่ในช่วงนี้ (list เน้น utility/buff ที่ slot3) |
| 13-20 | C | **Otiluke's Resilient Sphere ปลดล็อก** (slot4, lock เป้าหมายเดี่ยวออกจากการต่อสู้เกือบสมบูรณ์ ไม่มี repeat save ฝั่งเป้า แต่ผูก concentration) — Severity ใกล้เคียง peer มากขึ้นแต่ยังแคบกว่า (เดี่ยว, ไม่มี LR-bypass, ไม่มี slot5 ให้ severity สูงไปกว่านี้อีกแล้วเพราะ slot5 ของ Artificer ไม่มีตัวเลือก control เพิ่ม) — ยังไม่ถึง ≥2/4-เทียบเท่า(≥3/5) ที่จะขยับเกรด → คงที่ C ตลอด |

**สรุปเกรด**: C(1-20) แบนราบตลอดอาชีพ — เหตุผลต่างจาก Alchemist (เพดาน Severity ต่ำแบบ fixed) ตรงที่ Artificer **ไล่ Severity ขึ้นเรื่อยๆ ได้จริง (Tier2→3→3-4) แต่ไล่ไม่ทัน peer ที่อยู่ Tier4 มาตั้งแต่ lv3** และไม่มีทางแตะ slot6+ ที่ peer ใช้ปลดล็อก LR-bypass/Mass Suggestion-tier ได้เลยตลอดชาติ (structural cap ยืนยันจาก data)

---

## Support

**Primary**: Magnitude — Artificer spell list (ความรู้ทั่วไป) มี **Cure Wounds/Healing Word(slot1)→Aid(slot2)→Revivify(slot3)→Freedom of Movement(slot4)→Greater Restoration(slot5)** ตรงกับสาย heal/buff ของ peer หลายตัว **แต่มาถึงช้ากว่า peer เสมอ** เพราะ slot cadence ของ half-caster (slot2 ที่ lv5 ไม่ใช่ lv3, slot4 ที่ lv13 ไม่ใช่ lv7 ฯลฯ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | B | Cure Wounds(~12)/Healing Word(~8) ตรง peer's lv1 benchmark **เป๊ะ** (สเปลล์เดียวกัน, +3 convention เดียวกัน) ไม่ concentration ทั้งคู่เหมือนกัน — ไม่มี modifier ต่าง → B |
| 3-4 | C | peer เลื่อนไป Aid-tier(slot2, breadth 3คน, instant, proactive) แล้ว แต่ Artificer ยังไม่มี slot2 จนกว่าจะ lv5 (slot cadence ต่างจาก full-caster) — Magnitude ตอนนี้ต่ำกว่า peer มาตรฐานปัจจุบัน → C |
| 5-6 | =lv3-4 | **Aid ปลดล็อก** (ตรงกับ peer's เดิมที่ lv3) แต่ peer เองก็เลื่อนไป Beacon of Hope/Haste-tier(slot3)แล้วที่ lv5 พอดี — ไล่ทันจุดเก่าของ peer แต่ยังตามหลัง peer ปัจจุบันเท่าเดิม → คงที่ C |
| 7 | C | **Flash of Genius ปลดล็อก** — reaction บวก Int mod ให้ ally check/save ในระยะ 30ft, Int mod ครั้ง/วัน, **ไม่ผูก concentration เลย** (ฟรีเทียบกับ resource สเปลล์) เป็น modifier บวก 1 จุด (Concentration Risk เหนือ peer) แต่ Magnitude หลักยังห่างจาก peer's Freedom of Movement/Death Ward(slot4)อยู่มาก (Artificer เพิ่งมี slot2) — **1/5 above ไม่พอ (ต้อง≥3/5)** → คงที่ C |
| 8-12 | =lv7 | slot3 ปลดล็อก lv9 → **Revivify** (ฮีลชุบชีวิต, magnitude สูงมากแต่ situational/reactive จัด) ยังต่ำกว่า peer ปัจจุบัน(Mass Cure Wounds/Greater Restoration ที่ slot5, breadth 6คน) |
| 13-16 | C | **Freedom of Movement ปลดล็อก** (slot4, ตรงกับสเปลล์เดียวกับ peer's lv7 benchmark เป๊ะ) มาช้ากว่า peer ถึง 6 เลเวล — peer ปัจจุบัน(lv13)อยู่ที่ Regenerate-tier แล้ว → ยังตามหลัง คงที่ C |
| 17-20 | C | **Greater Restoration ปลดล็อก** (slot5, เพดานสูงสุดตลอดกาลของ Artificer เพราะไม่มี slot6+) — peer ปัจจุบัน(lv17)อยู่ที่ Mass Heal/Power Word Heal (700HP) ซึ่ง Artificer **ไม่มีทางไปถึงได้เลยตลอดชาติ** (structural cap) → ห่างจาก peer มากที่สุดในทั้งตาราง แต่ยังมีกลไกจริงอยู่ ไม่ใช่ D → คงที่ C |

**สรุปเกรด**: B(1-2) → C(3-20) — slot cadence ของ half-caster ทำให้ไล่ peer ไม่ทันตั้งแต่ lv3 เป็นต้นไป และไม่มีทางไล่ทันได้เลยเพราะ slot cap 5th-level ถาวร (verified จาก data) แม้สเปลล์แต่ละตัวที่มีจะ "ตรง" กับ peer's benchmark spell เป๊ะก็ตาม (Cure Wounds lv1, Freedom of Movement lv13) — เป็นปัญหาเรื่อง**จังหวะ**ไม่ใช่**คุณภาพสเปลล์**

---

## Survivability

**Primary**: Effective HP (d8 + flat CON+3 — **สูตร/ตัวเลขเดียวกับ Anchor peer เป๊ะทุกแถว** เพราะ Artificer เป็น d8 พอดี: 11,19,27,...,163)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-19 | C | Effective HP ตรง peer ทุกแถว (Primary=B) แต่ **Mitigation/Debuff Resistance/Death Prevention ทั้ง 3 มิติ = D ตลอด** (Artificer baseline ไม่มี resistance/evasion/cheat-death ใดๆก่อน lv20) — 3/4 below (≥2/4) → ขยับลง 1 ขั้น B→C ตั้งแต่ lv1 (รูปแบบเดียวกับตัวอย่าง Wizard lv1 ใน Anchor เป๊ะ) — คงที่ตลอด 19 เลเวลเพราะไม่มี milestone อื่นแทรก |
| 20 | =lv1-19 | **Soul of Artifice ปลดล็อก** — Cheat Death (disintegrate item Uncommon/Rare กี่ชิ้นก็ได้ แลก HP=20×จำนวนชิ้น) แก้ Death Prevention จาก D→มีกลไกจริง (เทียบเท่าตัวอย่างเพดานอย่าง Relentless Rage) แต่ Mitigation+Debuff Resistance ยังเป็น D อยู่ 2 มิติ = **ยังคง 2/4 below** (ครบเกณฑ์≥2/4 เหมือนเดิม แม้จำนวนจะลดจาก 3→2) → เกรดขยับได้แค่ครั้งละ 1 ขั้นตามกฎ ซึ่งขยับไปแล้วตั้งแต่ lv1 → **ไม่ขยับเพิ่ม คงที่ C แม้ถึง lv20** |

**สรุปเกรด**: C(1-20) แบนราบตลอดอาชีพ — ต่างจาก Alchemist (ซึ่งไต่ขึ้นเป็น B ที่ lv11 เพราะ Blast Coating ลดจำนวนมิติ below เหลือ 1/4) เพราะ Artificer's Soul of Artifice มาสายเกินไป (lv20 เดียว) และแก้ได้แค่ 1 ใน 3 มิติที่มีปัญหา ไม่พอลดจำนวน below ให้ต่ำกว่าเกณฑ์ ≥2/4

---

## Action Economy

**Primary**: Attack-Action Efficiency — Artificer ไม่มี Extra Attack เลยตลอด baseline (Armorer subclass เท่านั้นที่ได้ที่ lv5 — ไม่นับ) แต่มี Fire Bolt/weapon attack ปกติทุกเทิร์น → ใช้กฎ **C ไม่ใช่ D** ที่ยืนยันแล้วตอนทำ Alchemist

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | B | 1 attack/action ตรง peer (ยังไม่มีใครมี Extra Attack ช่วงนี้) — ไม่มี Bonus/Reaction/Extra-Action พิเศษใดๆ |
| 5-6 | C | peer ได้ Extra Attack(lv5) แต่ Artificer ยังคง 1atk/action — Primary ตกเป็น C — **Magic Item Tinker ปลดล็อก(lv6)**: Charge/Drain Magic Item เป็น Bonus Action ที่เกินมาตรฐาน (peer-standard Bonus Action Value = "ไม่มี" ตาม Anchor) = **1/4 above** ยังไม่พอขยับ (ต้อง≥2/4) → คงที่ C |
| 7-19 | B | **Flash of Genius ปลดล็อก(lv7)** — reaction ที่ให้มูลค่าเกิน opportunity attack ปกติ (Reaction Value เหนือ peer-standard ซึ่งเป็น "แทบไม่มีใครมี" ตาม Anchor finding #3) = modifier บวกตัวที่ 2 ต่อจาก Magic Item Tinker(lv6) → **2/4 above ครบเกณฑ์** → ขยับขึ้น 1 ขั้น C→B ตั้งแต่ lv7 |
| 20 | =lv7-19 | Soul of Artifice's Magical Guidance (คืน Flash of Genius เต็มทุก short rest ถ้า attune item) เป็นแค่ frequency boost ของมิติที่นับไปแล้ว ไม่ใช่มิติใหม่ → ไม่ขยับเพิ่ม คงที่ B |

**สรุปเกรด**: B(1-4) → C(5-6) → B(7-20) — pattern ที่ต่างจาก Alchemist (B→C แบนราบ) ชัดเจน เพราะ Magic Item Tinker+Flash of Genius สะสมกันพอดี 2 modifier ที่ lv7 ดันเกรดกลับขึ้นมาได้ทั้งที่ Primary ยังเป็น C ตลอด — ตัวอย่างที่ดีของกฎ tie-break ทำงานตามที่ออกแบบไว้

---

## Utility

**Primary**: Magnitude — Tinker's Magic(lv1, ของมันดาน)+Replicate Magic Item(lv2+, ไอเทมเวทจริงจาก 4→8 plans พร้อม wildcard "item ใดๆ" ที่ tier rarity สูงขึ้นเรื่อยๆ) เป็นกลไกที่กว้างกว่าสเปลล์เดี่ยวๆของ peer มาก แต่ต้องแลกกับ Access Cost (ของไม่ถาวร หายเมื่อตาย/เปลี่ยน plan, จำกัดจำนวนพร้อมกัน)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Tinker's Magic เท่านั้น — ของมันดานล้วน (Ball Bearings/Rope/Torch ฯลฯ) magnitude ต่ำกว่า peer's ritual utility spell (Detect Magic ให้ข้อมูลเวทจริง) + Access Cost แย่กว่า (Int mod ครั้ง/วัน ไม่ใช่ ritual ไม่จำกัด) → C |
| 2-5 | A | **Replicate Magic Item ปลดล็อก** — Bag of Holding/Sending Stones/Cap of Water Breathing + wildcard "**Common item ใดๆ ที่ไม่ใช่ Potion/Scroll**" — breadth กว้างกว่าสเปลล์ ritual ไม่กี่ตัวของ peer's lv1-2 ชัดเจน (**Breadth above peer 1 มิติ**) magnitude ก็เป็นไอเทมเวทจริงไม่ใช่แค่ข้อมูล (**Magnitude above peer** อีก 1) = 2/4 above → ขยับขึ้น 1 ขั้น C→A |
| 6-9 | =lv2-5 | Magic Item Tinker(lv6) เพิ่ม Transmute Magic Item (สลับไอเทมกลางทาง) เสริม Adaptability ไม่กระทบ Magnitude หลัก — คงที่ A |
| 10-13 | =lv2-5 | **wildcard ขยับเป็น "Uncommon Wondrous Item ใดๆ"(lv10+)** — breadth กว้างขึ้นอีกแต่ modifier ที่ขยับได้แล้ว(A)ชนเพดาน+1 step ตามกฎ ไม่ขยับต่อเป็น S (ยังไม่ถึงระดับ outlier-comparable ของทั้งระบบ) → คงที่ A |
| 14-20 | =lv2-5 | **wildcard ขยับเป็น "Rare Wondrous Item ใดๆ"(lv14+)** — เพดานกว้างที่สุดของกลไกนี้ (เกือบทุกไอเทมไม่ต่อสู้ในเกมเข้าถึงได้) แต่ยังติด Access Cost เดิม(ไม่ถาวร+จำกัดจำนวนพร้อมกัน 6 ชิ้นสูงสุด) ที่กันไม่ให้แตะ S → คงที่ A ตลอด |

**สรุปเกรด**: C(1) → A(2-20) — จุดกระโดดเดี่ยวที่ lv2 คล้าย pattern ของ Alchemist's Versatility (Replicate Magic Item ปลดล็อกทุกอย่างพร้อมกัน) แต่ Access Cost (ของไม่ถาวร/จำกัดจำนวน) กันไว้ไม่ให้ทะลุ S แม้ wildcard tier จะกว้างขึ้นเรื่อยๆ

---

## Versatility

**Primary**: Loadout Flexibility — Anchor เองยืนยันแล้ว (refinement pass รอบ 1) ว่า Artificer อยู่ tier **"สูง — สลับได้เต็มทุก Long Rest"** เท่า Wizard/Cleric/Druid ตรงๆ (ข้อความ "Changing Your Prepared Spells" ตรงกันทุกคำ) — tier "สูง" = **A โดยตรง** (ไม่ต้องผ่าน tie-break shift เหมือน Alchemist เพราะ Primary เองอยู่ tier สูงสุดตั้งแต่ lv1 ไม่ใช่ไต่มาจาก "กลาง")

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | A | Loadout="สูง" (Primary เพียงมิติเดียว)=A ตรงๆ — **Cross-Axis Coverage เหนือ peer 1 มิติ**: Artificer lv1 คลุม Damage(Fire Bolt)+Utility(Tinker's Magic ฟรีไม่แย่ง slot)+อีก 1-2 axis จาก 2 prepared spells พร้อมกัน (~3-4 axis) เทียบกับ peer's lv1 benchmark ("~1-2 axis") — แต่ Resource Fungibility ยังเป็น D เท่า peer (ยังไม่มี point-resource) = **1/4 above ไม่พอ** (ต้อง≥2/4) → คงที่ A |
| 2-20 | S | **Replicate Magic Item ปลดล็อก** — 1 "plan slot" ซื้อผลลัพธ์ข้าม axis ได้กว้างกว่าตัวอย่าง Fungibility ของ Anchor เอง (Focus Point ซื้อ 2-3 axis) เพราะ plan ครอบคลุมได้ทั้ง Damage(Wand of Magic Missiles)/Survivability(Ring of Protection)/Utility(Cloak of Elvenkind)/Control(Wand of Web) พร้อมกันในคนละ slot — **Resource Fungibility above peer** + **Cross-Axis Coverage above peer** (spellcasting+itemcraft คลุมเกือบทุก axis พร้อมกันตั้งแต่ lv2) = **2/4 above ครบเกณฑ์** → ขยับขึ้น 1 ขั้น A→S ตั้งแต่ lv2 — เพดานของกฎ tie-break (+1 step สูงสุด) ทำได้แค่นี้แต่ Primary เริ่มสูงกว่า Alchemist อยู่แล้วจึงไปถึง S ได้จริง (Alchemist ไปได้แค่ A เพราะ Primary เริ่มจาก "กลาง"=B) |

**สรุปเกรด**: A(1) → S(2-20) — Artificer เป็นคลาสแรกในชั้น 1 ที่แตะ S ตั้งแต่ lv2 และคงอยู่ยาวที่สุดในบรรดา 2 คลาสที่ทำมา (Alchemist แตะ A สูงสุด) — สอดคล้องกับภาพลักษณ์ทั่วไปของ Artificer ในฐานะ "toolbox class" ที่ยืดหยุ่นที่สุดในเกมเชิงโครงสร้าง (spellcasting เต็มรูปแบบ + itemcraft fungible ซ้อนกัน)

---

## สรุปรวม 7 axis

| Axis | เกรดตามเลเวล |
|---|---|
| Damage | B(1-10) → C(11-20) |
| Control | C(1-20) |
| Support | B(1-2) → C(3-20) |
| Survivability | C(1-20) |
| Action Economy | B(1-4) → C(5-6) → B(7-20) |
| Utility | C(1) → A(2-20) |
| Versatility | A(1) → S(2-20) |

**ข้อค้นพบสำคัญ**:
1. **ค้นพบช่องว่างข้อมูลระดับโปรเจกต์**: ไฟล์ spell ทุกไฟล์ไม่มี field เก็บว่าคลาสไหนได้สเปลล์ตัวไหน — ปัญหานี้จะเกิดซ้ำกับทุกคลาสที่มี spellcasting จริงในชั้น 1 ต่อจากนี้ (Bard/Cleric/Druid/Paladin/Ranger/Sorcerer/Warlock/Wizard) — user ยืนยันให้ใช้ความรู้ทั่วไปแทน โดยแยกให้ชัดว่าจุดไหนมาจาก data file (ตัวเลข/mechanic ของสเปลล์) vs ความรู้ทั่วไป (สเปลล์อยู่ใน list ของคลาสไหน)
2. **half-caster slot cadence ≠ "ช้าที่สุด" อย่างที่ระบบเก่าเคยเขียนไว้** — ตรวจจาก `classTableGroups` จริงพบว่า Artificer ได้ slot1 **เร็วกว่า** Paladin/Ranger 1 เลเวล (lv1 ไม่ใช่ lv2) แต่ slot2-5 จังหวะเดียวกันเป๊ะ (lv5/9/13/17) — เป็นข้อสังเกตที่ต่างจากคำอธิบายในระบบเก่า ([artificer-subclass-scorecard-2024.md](artificer-subclass-scorecard-2024.md) บรรทัด Damage baseline) แต่**ไม่แก้ไฟล์เก่าตามกติกาโครงการ** เก็บไว้เป็นข้อสังเกตในไฟล์นี้แทน
3. **slot cap 5th-level ถาวร (verified จาก data)** คือสาเหตุหลักที่ Control/Support ค้างที่ C ตลอดชาติ ไม่ใช่เพราะสเปลล์ที่มีคุณภาพต่ำ — Artificer **ไม่มีทาง** แตะ Anchor's lv9+ benchmark (Mass Cure Wounds/Hold Monster/True Seeing tier) ได้เลยตลอดอาชีพ ต่างจาก full caster ทุกคน
4. **Versatility เป็น axis เดียวที่ Artificer เหนือ Alchemist ชัดเจน** (S ตั้งแต่ lv2 เทียบ A สูงสุดของ Alchemist) เพราะ Loadout Flexibility เริ่มจาก tier "สูง" อยู่แล้ว (ไม่ต้องไต่จาก "กลาง" เหมือน Alchemist) บวกกับ Resource Fungibility ของ Replicate Magic Item ที่กว้างกว่า
5. **Action Economy มี pattern การ "ตก-แล้วกลับขึ้น" ที่ชัดเจน** (B→C→B) จาก 2 modifier สะสม (Magic Item Tinker lv6 + Flash of Genius lv7) — ตัวอย่างที่ดีของกฎ tie-break ที่ดันเกรดกลับขึ้นได้แม้ Primary ยังคงเป็น C ตลอด
6. **Damage เป็นแกนเดียวที่ Primary ตรง peer 100% ทุกเลเวล** (Fire Bolt เป็น class-agnostic cantrip) แต่เกรดยังตกจาก B→C ที่ lv11 เพราะมิติรอง (Burst/Breadth) ถ่วงไว้ — ยืนยันว่า Primary-only ไม่พอตัดสินเกรด ต้องดู modifier ประกอบเสมอตามกฎ tie-break
