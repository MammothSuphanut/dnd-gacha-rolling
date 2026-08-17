# Captain — Class Baseline (Level-Indexed, ชั้น 1)

**ขอบเขต**: ประเมินเฉพาะฟีเจอร์ base-class (ไม่รวม Captain Subclass ที่ lv3/6/10/14 — subclass overlay แยกไปทำในชั้น 2) — เทียบกับ [00-level-anchor-rubric.md](00-level-anchor-rubric.md) ทุกแถว
**Data source**: `class.json` (bundled 5etools data, `public/data/5etools/class.json`) entry `name: "Captain", source: "ValdaSpire24", edition: "one"` — homebrew class จาก *Valda's Spire of Secrets* (2024 update), ไม่มี official WotC XPHB entry เพราะเป็นคลาส 3rd-party ทั้งหมด (คล้ายกับ Sacred Knight/Tactician ที่เป็น homebrew ในสโคปนี้อยู่แล้ว) — ยืนยัน `classFeaturesFull` ครบ 22 รายการ, `optionalfeature.json` สำหรับ 5 maneuver (`featureType: "MV:C"`), และ `bestiary.json` สำหรับ Cohort stat block ตัวอย่าง (Champion) เพื่อยืนยันกลไกจริง
**สถานะ**: คลาสที่ 6 ของชั้น 1 — **คลาส pet/companion ตัวแรกในระบบนี้** (Cohort เป็น base-class feature ไม่ใช่ subclass feature เหมือน Artificer's Steel Defender หรือ Ranger's Beast Master ที่ล้วนเป็น subclass-gated)

⚠️ **หมายเหตุสำคัญ 3 ข้อก่อนอ่านตาราง**:

1. **Cohort ไม่ถูกนับเข้า Captain's personal Damage/Action-Economy โดยตรง** — Cohort เป็นสิ่งมีชีวิตแยกที่เดินเทิร์นของตัวเอง (ก่อน/หลังเทิร์น Captain) ใช้ Charisma ของ Captain ยิง attack/damage/save DC เอง ถ้านับดาเมจ/แอคชั่นของ Cohort รวมเข้า axis ของ Captain ตรงๆ จะกลายเป็นนับข้าม "ตัวละคร" ซึ่งขัดกับสโคปที่ Anchor นิยามไว้ ("ได้มูลค่ามากกว่า 1 action ต่อ**รอบของตัวเอง**") — เลยตัดสินใจ (ครั้งแรกในระบบนี้ที่ต้องเจอเคสนี้จริง) ว่า **Cohort คือ "unmodeled parallel actor"** คล้ายกับที่ Bardic Inspiration ถูก flag ไว้ให้ Bard — มีอิทธิพลจริงต่อพาร์ตี้มหาศาล (ทั้งเทิร์นฟรีทุกรอบ) แต่ไม่ inject เข้าตัวเลขหลักของ axis ไหนโดยตรง จะพูดถึงในเชิงคุณภาพ/finding เท่านั้น — ถ้าเจอคลาสอื่นที่มี base-class pet คล้ายกัน (Necromancer, Warden, Tactician ที่ยังไม่ทำ) ต้องเช็คว่าจะใช้หลักการเดียวกันหรือไม่
2. **spell-list membership ไม่เกี่ยวข้องกับไฟล์นี้เลย** — Captain ไม่มีสเปลล์คาสติ้งใดๆ ในกติกาจริง (ไม่มี `casterProgression`/`spellcastingAbility` field ใน `class.json`) เป็นมาร์เชียลล้วนตัวที่สองในชั้น 1 ต่อจาก Barbarian
3. **Weapon Mastery property choice (เช่น Topple ที่ทำให้ล้ม Prone ได้) ไม่ถูกฝังเข้า Damage/Control Primary ของไฟล์นี้** — ตามธรรมเนียมเดียวกับที่ทำกับ Barbarian's Weapon Mastery (ไม่ผูกกับ mastery property เฉพาะตัวใดตัวหนึ่ง เพราะเป็น player choice ที่ generic marchial track ของ Anchor เองก็ไม่ได้ผูกไว้) — นับ Weapon Mastery ใน Versatility axis เท่านั้น ตามธรรมเนียมเดิม

---

## สรุป Chassis

**HD**: d8 (ตรงกับ peer-standard ของ Anchor เป๊ะ — เป็นคลาสแรกในชั้น 1 ที่ hit die ตรงกับ Anchor's own calibration table โดยตรง ไม่ต้องคำนวณใหม่) · **Save prof**: CON/CHA · **ไม่มีสเปลล์คาสติ้ง**

| Lv | Battle Dice | Cohort | ASI/Feat | Milestone อื่น | Effective HP (d8+CON+3) |
|---|---|---|---|---|---|
| 1 | 2d6 | — | — | Battle Tactics (5 maneuvers: Bolster/Born Leader/Morale Boost/Rally/Staggering Strike), Weapon Mastery (2 kinds) | 11 |
| 2 | 2d6 | **Gain** (เลือก stat block, Cha-based atk/dmg/DC) | — | Fighting Style (feat) | 19 |
| 3 | 2d6 | = lv2 | — | *(Captain Subclass — ยกเว้นในไฟล์นี้)* | 27 |
| 4 | 2d6 | = lv2 | **ASI** | — | 35 |
| 5 | 3d6 | Cohort ปรับ: Martial Excellence (+1 atk/dmg), Flurry (1/วัน 3 attacks disadvantage) | — | **Blitz** (ฟรี ไม่เสีย action/resource — สั่ง Cohort/ally ใช้ Reaction เดิน/โจมตี 1 ครั้งทุกเทิร์น) | 43 |
| 6 | 3d6 | = lv5 | — | *(Subclass feature — ยกเว้น)* | 51 |
| 7 | 3d6 | = lv5 | — | Valiant Surge (crit/KO ตัวเองหรือ Cohort → คืน Battle Die) | 59 |
| 8 | 3d6 | = lv5 | **ASI** | — | 67 |
| 9 | 3d8 | Cohort ปรับ: Keen Strike (+1d8 dmg), Martial Excellence +2 | — | — | 75 |
| 10 | 3d8 | = lv9 | — | *(Subclass feature — ยกเว้น)* | 83 |
| 11 | 3d8 | = lv9 | — | **Coordinated Strike** (+2d8 dmg เงื่อนไข: Cohort ต้องตีเป้าเดียวกันมาก่อน) | 91 |
| 12 | 3d8 | = lv9 | **ASI** | — | 99 |
| 13 | 4d8 | Cohort ปรับ: Martial Excellence +3, Indomitable (2/วัน reroll save) | — | — | 107 |
| 14 | 4d8 | = lv13 | — | *(Subclass feature — ยกเว้น)* | 115 |
| 15 | 4d8 | = lv13 | — | Lead by Example (crit ตัวเอง/Cohort → Heroic Inspiration ให้ ally ที่เลือก) | 123 |
| 16 | 4d8 | = lv13 | **ASI** | — | 131 |
| 17 | 5d8 | Cohort ปรับ: Multiattack (2 attacks) | — | — | 139 |
| 18 | 5d8 | = lv17 | — | Teamwork Maneuvers (maneuver เล็ง ally ตีเป้าที่ 2 ได้ฟรี) | 147 |
| 19 | 5d8 | = lv17 | **Epic Boon** | — | 155 |
| 20 | 5d8 | = lv17 | — | **Legendary Commander** (ตัวเองหรือ ally ใช้ Legendary Action ได้ 3 ครั้ง/short-or-long rest) | 163 |

---

## Damage Axis

**Primary = Magnitude**. Captain **ไม่มี Extra Attack เลยตลอด 20 เลเวล** (สแกน 22 feature แล้วไม่มีคำว่า "Extra Attack" ปรากฏเลย) — attack ส่วนตัวคงที่ 1 ครั้ง/action ตลอดอาชีพ ต่างจาก peer มาร์เชียลที่ได้ 2 attack ตั้งแต่ lv5

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Magnitude 1 attack (1d10+3≈9) ตรงกับ peer lv1-4 เป๊ะ (peer เองก็ยัง 1 attack ก่อน Extra Attack) — modifier: Burst=ต่ำกว่า (Battle Die ต้องแบ่งกับ 4 maneuver อื่น ไม่ใช่ rider เฉพาะดาเมจ), Breadth=ตรง(เดี่ยว), Conditionality=ตรง(ไม่มีเงื่อนไข), Resistance-proofing=ตรง → 1/4 ต่ำกว่า ไม่ถึงเกณฑ์ขยับ → **B** |
| 2 | = lv1 | ไม่มีจุดเปลี่ยน |
| 3 | = lv1 | ไม่มีจุดเปลี่ยน |
| 4 | = lv1 | ไม่มีจุดเปลี่ยน |
| 5 | **C** | **จุดเปลี่ยน — peer ได้ Extra Attack (2 attack≈17) แต่ Captain ยังคง 1 attack (≈9)** → Primary ตกต่ำกว่า peer ตรงๆ = **C** (มีกลไกจริง แค่ต่ำกว่ามาตรฐาน ไม่ใช่ D) — เหมือน pattern ที่ Alchemist เจอมาก่อน (hybrid ไม่มี Extra Attack) modifier ยังเหมือนเดิม (1/4 ต่ำกว่า) ไม่พอขยับต่อ |
| 6-10 | = lv5 | ไม่มีจุดเปลี่ยน |
| 11 | **C** (แต่คนละเหตุผล) | **Coordinated Strike ปลดล็อก** — ดาเมจส่วนตัวจริง = 1 attack(~9) + 2d8 เงื่อนไข(~9) = **~18 แซง peer's 2-attack(~17) ไปนิดหน่อย** → Primary ตัวเลขดิบขยับกลับมาเป็น **B (ตรง peer)** แต่ modifier เปลี่ยน: Burst=ต่ำกว่า(เหมือนเดิม), Conditionality=**ต่ำกว่าใหม่**(ต้องรอ Cohort ตีเป้าเดียวกันก่อน — เหมือน sneak attack ที่ต้องมีเงื่อนไข), Breadth/Resistance=ตรง → **2/4 ต่ำกว่า ถึงเกณฑ์ ≥2/4 → ขยับลง 1 ขั้นจาก B เป็น C** — ผลลัพธ์เกรดเท่าเดิม (C) แต่เหตุผลเปลี่ยนจาก "ตัวเลขต่ำกว่า" เป็น "ตัวเลขตรง peer แต่โดนหักคะแนนจาก Burst+Conditionality ที่อ่อน" — ตัวอย่างที่ดีว่าเกรดไม่ได้ตัดสินจากตัวเลข Magnitude อย่างเดียว |
| 12-20 | = lv11 | ไม่มีจุดเปลี่ยน (Coordinated Strike คงที่ตลอด ไม่มี Battle Die size เพิ่มผลกับดาเมจก้อนนี้เพราะเป็นเต๋าคงที่ 2d8 ไม่ผูกกับ Battle Die progression) |

**สรุปเกรด**: B(1-4) → C(5-20) — สองช่วง C ที่มาจากเหตุผลต่างกัน (5-10: ตัวเลขต่ำจริง / 11-20: ตัวเลขตรง peer แต่โดน modifier ฉุด)

---

## Control Axis

**Primary = Severity**. Captain มีกลไก Control จริงแค่ทางเดียวตลอดทั้งเกม: **Staggering Strike** (bonus action, ตีโดนแล้วใส่ Battle Die เข้าดาเมจ + เป้าหมายหัก Battle Die จาก attack roll ครั้งถัดไปก่อนจบเทิร์นถัดไปของ Captain) — ไม่มี maneuver ใหม่ปลดล็อกเพิ่มเลยตลอด 20 เลเวล (เมนู 5 maneuver คงที่ตั้งแต่ lv1)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **B** | Primary: Staggering Strike = **Tier 1** severity (debuff เล็กๆ ต่อ attack roll เดียว — ต่ำกว่า peer's Sleep ที่ Tier 4 มาก) = **C** ตรงๆ (มีกลไกจริงแต่อ่อนกว่ามาตรฐานมาก) — แต่ตรวจ 5 modifier: **Breadth=ต่ำกว่า**(เดี่ยวเทียบกับ Sleep ที่โดนหลายตัว), **Frequency=เหนือกว่า**(Battle Dice รีฟิลเต็มทุกครั้งที่ทอย Initiative/Short Rest/Long Rest — ไม่ใช่ pool/วันแบบ spell slot ปกติ เท่ากับ "รีเซ็ตทุกไฟต์" ซึ่งบ่อยกว่า peer's ~3-4/วันจริงๆ), **Stickiness=ต่ำกว่า**(ไม่มี save แต่ duration สั้นมาก 1 รอบ), **LR-bypass=เหนือกว่า**(⚠️ ไม่มี save ให้ทอยเลย = LR ต้านไม่ได้โดยอัตโนมัติ — ใช้ตรรกะเดียวกับ Power Word Kill/Stun แต่กรณีนี้เอฟเฟกต์เล็กมากจนคำถามคือ "LR-bypass" ควรนับว่าเหนือกว่าจริงไหมถ้าผลลัพธ์มันเล็กจนไม่มีความหมายให้ boss ต้อง "กลัว" เลย — ดู finding #3), **Concentration Risk=เหนือกว่า**(ไม่ใช่ concentration เลย เป็น instant rider) → **3/5 เหนือกว่า (Frequency+LR-bypass+Concentration Risk) ถึงเกณฑ์ ≥3/5 → ขยับขึ้น 1 ขั้นจาก C เป็น B** |
| 2-20 | = lv1 | ไม่มีจุดเปลี่ยนเลยตลอด 20 เลเวล — เมนู maneuver คงที่ 5 ตัว, Battle Die โตแค่จำนวน/ขนาด (2d6→5d8) ไม่กระทบ severity/breadth/stickiness เชิงคุณภาพ |

**สรุปเกรด**: **B(1-20) flat** — Severity อ่อนที่สุดในบรรดาคลาสที่ทำมา (Tier 1 ตลอดเกม ไม่เคยขยับ) แต่โครงสร้าง Frequency+LR-bypass+Concentration-Risk ดันเกรดขึ้นมา B ได้ — ดู finding #3 สำหรับข้อกังขาเชิงระเบียบวิธีที่พบจุดนี้

---

## Support Axis

**Primary = Magnitude**. Captain มี 3 maneuver ที่เล็ง ally ตรงๆ ตั้งแต่ lv1: **Bolster** (bonus action, +Battle Die เข้า atk+dmg ของ ally ครั้งถัดไป), **Rally** (bonus action, ฮีล Battle Die+CHA — ตีความว่าเล็งตัวเองได้ด้วยตามธรรมเนียม "ally" ทั่วไปของ 5e ที่ไม่ได้เขียนกันตัวเองออกชัดเจน — ดู finding #4), **Morale Boost** (reaction, +Battle Die ให้ ally ที่ save พลาด)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **B** | Primary: Rally ฮีล ≈1d6+3=**~6.5**/ครั้ง เทียบ peer's Healing Word(~8, bonus action) → **ต่ำกว่า = C** — ตรวจ 5 modifier: **Breadth=ต่ำกว่า**(เดี่ยวเทียบ Bless ที่ 3 คน), **Action Economy=ตรง**(bonus action เหมือน peer mixed baseline), **Proactive/Reactive=เหนือกว่า**(มีทั้ง Bolster-proactive และ Rally/Morale Boost-reactive พร้อมกันตั้งแต่ lv1 ไม่ต้องรอ milestone แยกแบบ peer), **Frequency=เหนือกว่า**(รีฟิลทุกไฟต์เหมือนที่วิเคราะห์ใน Control), **Concentration Risk=เหนือกว่า**(ไม่มี maneuver ไหนผูก concentration เลย) → **3/5 เหนือกว่า ถึงเกณฑ์ → ขยับขึ้น 1 ขั้นจาก C เป็น B** |
| 2-4 | = lv1 | ไม่มีจุดเปลี่ยน |
| 5 | = lv1 (เกรดเท่าเดิม) | **Blitz ปลดล็อก** — สั่ง Cohort/ally ใช้ Reaction ฟรี (ไม่เสีย action/resource ของ Captain เองเลย) นับเป็นหลักฐานเพิ่มของ Action Economy dimension ที่เหนือกว่า peer ชัดเจนขึ้น (จาก "ตรง" เป็น "เหนือกว่า" ก็ตาม) — แต่โดน cap ที่ +1 ขั้นอยู่แล้วจาก lv1 เลยไม่ขยับเกรดเพิ่ม (เพดาน B คงเดิม) |
| 6-14 | = lv5 | ไม่มีจุดเปลี่ยน |
| 15 | = lv5 (เกรดเท่าเดิม) | Lead by Example เพิ่ม utility เชิง buff (Heroic Inspiration) แต่ไม่ใช่ Magnitude/heal โดยตรง ไม่กระทบ tally |
| 16-17 | = lv15 | ไม่มีจุดเปลี่ยน |
| 18 | = lv15 (เกรดเท่าเดิม) | Teamwork Maneuvers ทำให้ Bolster/Morale Boost/Rally เล็ง ally ที่ 2 ได้ฟรี — Breadth ดีขึ้นจาก "เดี่ยว" เป็น "2 คน" แต่ยังต่ำกว่ามาตรฐาน full-party ของ peer ที่ tier นี้ (Holy Aura lv15 ทั้งปาร์ตี้) → ยังนับเป็น "ต่ำกว่า" เหมือนเดิม ไม่เปลี่ยน tally |
| 19-20 | = lv18 | ไม่มีจุดเปลี่ยน |

**สรุปเกรด**: **B(1-20) flat** — เหมือน Control เป๊ะ ขับเคลื่อนด้วยกลไกโครงสร้างเดียวกัน (Battle Dice รีฟิลทุกไฟต์ + ไม่มี maneuver ไหนผูก concentration) ดู finding #2

---

## Survivability Axis

**Primary = Effective HP** (d8 — ตรงกับ Anchor's peer table เป๊ะ ไม่ต้องคำนวณใหม่ ใช้ตัวเลขจากตาราง Chassis ด้านบนได้เลย) = **B ตรง peer ทุกเลเวล**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary Effective HP=11 ตรง peer = **B** — ตรวจ 4 modifier: **Mitigation=ไม่มีกลไก(D)**, **Save Reliability=ตรง**(2 prof baseline), **Debuff/Condition Resistance=ไม่มีกลไก(D)** (Morale Boost ช่วย ally ไม่ใช่ตัวเอง — นับใน Support แล้ว ไม่นับซ้ำที่นี่), **Death Prevention=มีกลไกจริงแต่อ่อนกว่าตัวอย่างเพดาน**(Rally เล็งตัวเองได้ ~1d6+3=~6.5 bonus action เทียบ Second Wind 1d10+level — ใกล้เคียงกันแต่ไม่เท่า จัดเป็น "เหนือกว่า D-baseline" เพราะ peer-standard ของมิตินี้คือไม่มีอะไรเลย) → **2/4 ต่ำกว่า (Mitigation, Debuff Resistance) ถึงเกณฑ์ ≥2/4 → ขยับลง 1 ขั้นจาก B เป็น C** |
| 2-20 | = lv1 (EHP โตตามตาราง Chassis) | ไม่มีจุดเปลี่ยนเชิงคุณภาพเลยตลอด 20 เลเวล — Captain ไม่มีฟีเจอร์ Mitigation/Debuff-Resistance/Death-Prevention เพิ่มเติมอีกเลยนอกจาก Rally ที่มีตั้งแต่ lv1 (Battle Die โตแค่จำนวน/ขนาด ไม่เปลี่ยนโครงสร้าง) |

**สรุปเกรด**: **C(1-20) flat**

---

## Action Economy Axis

**Primary = Attack-Action Efficiency** — ไม่มี Extra Attack เลย แต่มี attack routine จริง (simple/martial weapon prof) → ใช้ carve-out เดียวกับ Alchemist/Bard = **C** ตลอดเกม (ไม่เคยขยับเพราะไม่มี Extra Attack ปรากฏที่ไหนเลย)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **C** | Primary=C (carve-out) — ตรวจ 4 modifier: **Bonus Action Value=เหนือกว่า**(Bolster/Rally/Staggering Strike ให้ตัวเลือก bonus action หลายแบบตั้งแต่ lv1 — แซงหน้า peer's lv1 baseline ที่ "ไม่มี" ไปเลย), **Reaction Value=เหนือกว่า**(Morale Boost เป็น base-class reaction จริง — เทียบเท่าหรือดีกว่า Riposte ที่เป็น subclass-lock ของ Fighter), **Extra Action Access=ไม่มีกลไก(D)**, **Resource-to-Action Conversion=ไม่มีกลไก(D)** → **2 เหนือกว่า/2 ต่ำกว่า — เสมอกันพอดี (2/4=2/4)** ⚠️ **เจอ tie-break edge case แบบเดียวกับที่ Barbarian's Survivability lv2 เจอมาก่อน** ไม่มีกฎรองรับเคสเสมอกันตรงๆ ใน Anchor — ใช้การตัดสินใจแบบเดียวกัน (net cancellation → กลับไปที่ Primary เฉยๆ) = **C** — นี่คือครั้งที่ 3 ที่เจอ tie 2-2 ในระบบนี้ (ยิ่งเพิ่มน้ำหนักว่าควรฟอร์มัลไลซ์กฎนี้ใน Anchor จริงจัง — ดู finding #5) |
| 2-4 | = lv1 | ไม่มีจุดเปลี่ยน |
| 5 | = lv1 (เกรดเท่าเดิม) | **Blitz ปลดล็อก** — จัดเป็น Extra Action Access ระดับอ่อน (ให้ ally ใช้ Reaction เดิน/ตี 1 ครั้งฟรีทุกเทิร์น ไม่ใช่ full action เต็มแบบ Action Surge) → Extra Action Access ขยับจาก "ไม่มีกลไก(D)" เป็น "มีกลไกแต่อ่อนกว่าเพดาน(C-เทียบเท่า)" — ยังนับเป็น "ต่ำกว่า" อยู่ดี (นิยาม C = below peer) → tally ยังคง 2 เหนือกว่า/2 ต่ำกว่า (Resource-Conversion ยังคง D) → **เสมอต่อเนื่อง** ยังคง C |
| 6-19 | = lv5 | ไม่มีจุดเปลี่ยน |
| 20 | **B** | **Legendary Commander ปลดล็อก** — extra full action จริง (ไม่ใช่แค่ reaction) ให้ตัวเองหรือ ally ได้ 3 ครั้ง/short-or-long rest — เทียบเท่าหรือดีกว่า peer's Action Surge outlier (ceiling example) เพราะเลือกเป้าได้ด้วย → Extra Action Access ขยับเป็น **เหนือกว่า** เต็มตัว → tally ใหม่: **3 เหนือกว่า(Bonus Action, Reaction, Extra Action Access)/1 ต่ำกว่า(Resource-Conversion)** → ถึงเกณฑ์ ≥2/4 เหนือกว่า → **ขยับขึ้น 1 ขั้นจาก C เป็น B — เฉพาะเลเวลนี้เลเวลเดียว** |

**สรุปเกรด**: **C(1-19) flat → B(20)** — แบนราบยาวที่สุดในบรรดา axis ที่เคยพบ (19 เลเวลไม่ขยับเลย) ก่อนกระโดดที่ capstone เลเวลสุดท้ายเดียว

---

## Utility Axis

**Primary = Magnitude** — Captain ไม่มีสเปลล์ Reveal-Info/Solve-Problem เลย และไม่มี Expertise/Jack-of-All-Trades/Reliable-Talent-style skill-check-layer มาตรฐานเช่นกัน (สแกน 22 feature ครบแล้วไม่พบ)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **D** | Primary (Magnitude) = ไม่มีกลไกเลย = **D** → **floor rule ล็อกเกรดรวมที่ D ทันที** ไม่ว่า modifier อื่นจะเป็นยังไง — Born Leader (reroll Wis/Cha **check** ที่พลาดด้วย Battle Die) เป็นกลไก Skill-Check-Layer ที่แคบมาก (แค่ 2 สเตต, เฉพาะตอนพลาดเท่านั้น ไม่ใช่ตัวคูณ proficiency แบบ Expertise) — เหมือน Barbarian's Primal Knowledge ที่ก็ไม่นับเป็น Magnitude ที่แท้จริง floor rule ยังคงล็อก D อยู่ดี |
| 2-20 | = lv1 | ไม่มีจุดเปลี่ยนเลยตลอด 20 เลเวล — ไม่มีฟีเจอร์ Utility เพิ่มที่ไหนเลยในเบสคลาส |

**สรุปเกรด**: **D(1-20) flat** — เหมือน Barbarian เป๊ะ (คลาสมาร์เชียลล้วนที่ 2 ที่เจอผล D-flat ใน Utility)

---

## Versatility Axis

**Primary = Loadout Flexibility** — Weapon Mastery (2 kinds, สลับได้ทุก Long Rest) ข้อความตรงกับ Barbarian's Weapon Mastery เป๊ะ → ยืนยัน cross-check ที่ flag ไว้ในไฟล์ Barbarian (finding #2 ของ Barbarian) ว่าตรงกับ "กลาง" tier จริง → **Primary = B โดยตรง** (หลุด D floor เหมือน Barbarian)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | **A** | Primary=B (Weapon Mastery, กลาง-tier) — ตรวจ 4 modifier: **Resource Fungibility=เหนือกว่ามาก**(Battle Die เดียวซื้อผลได้ 5 แบบพร้อมกันตั้งแต่ lv1 — Damage/Control/Support×3/Utility-เล็กน้อย กว้างกว่าตัวอย่างเพดานของ Anchor เองที่ lv2 อย่าง Focus Point/Sorcery Point/Channel Divinity ซึ่งซื้อได้แค่ 2-3 แบบ), **Cross-Axis Coverage=เหนือกว่า**(แตะ 5 ใน 6 axis อื่นตั้งแต่ lv1 — Damage/Control/Support/Survivability/Action-Economy เว้นแค่ Utility — เทียบ peer's "~1-2 axis" ที่ lv1), **Target-Type Coverage=ต่ำกว่า**(เดี่ยวตลอดกาล ไม่มี AoE เลย), **Adaptability Under Pressure=ตรง**(เลือก maneuver ตามสถานการณ์ได้ทุกเทิร์น เทียบเท่า peer baseline) → **2/4 เหนือกว่า ถึงเกณฑ์ ≥2/4 → ขยับขึ้น 1 ขั้นจาก B เป็น A** |
| 2 | = lv1 (เกรดเท่าเดิม) | Cohort เพิ่ม Cross-Axis Coverage อีก แต่ dimension นี้ถูกนับเป็น "เหนือกว่า" อยู่แล้ว ไม่กระทบ tally |
| 3-20 | = lv1 | ไม่มีจุดเปลี่ยนเชิงคุณภาพอีกเลย — โครงสร้างเดิมคงอยู่ตลอด (ไม่มี S เพราะไม่ใช่ตัวอย่างเพดานที่ Anchor อ้างถึงชัดเจนแบบ Fighter/Monk ตาม max-1-step-cap) |

**สรุปเกรด**: **A(1-20) flat** — **คลาสแรกในชั้น 1 ที่เปิด Versatility ที่ A ตั้งแต่ lv1 เลย** (ทุกคลาสก่อนหน้าต้องไต่ขึ้นมาถึง A)

---

## สรุปเกรดรวม (7 axis × 20 เลเวล)

| Axis | เกรดตามช่วงเลเวล |
|---|---|
| Damage | B(1-4) → C(5-20) |
| Control | **B(1-20) flat** |
| Support | **B(1-20) flat** |
| Survivability | **C(1-20) flat** |
| Action Economy | C(1-19) → B(20) |
| Utility | **D(1-20) flat** |
| Versatility | **A(1-20) flat** |

---

## ข้อค้นพบสำคัญ

1. **Captain เป็นคลาส pet/companion base-class ตัวแรกในระบบนี้** — Cohort ไม่ถูกฝังเข้า axis ไหนของ Captain โดยตรง (ตัดสินใจว่าเป็น "unmodeled parallel actor" คล้าย Bardic Inspiration ของ Bard) ทั้งที่ในทางปฏิบัติ Cohort คือทรัพยากร Action-Economy ที่ทรงพลังที่สุดในเกม (ได้เทิร์นเต็มฟรีทุกรอบ ตลอดกาล) — flag ไว้ให้ตรวจสอบซ้ำเมื่อทำ Necromancer/Warden/Tactician ที่อาจมีกลไก pet คล้ายกัน ว่าจะยึดหลักการเดียวกันหรือต้องคิดใหม่
2. **Control และ Support ลงเอยที่ B แบนราบทั้งคู่ ด้วยกลไกโครงสร้างเดียวกัน** — Battle Dice รีฟิลเต็มทุกครั้งที่ทอย Initiative (ไม่ใช่ pool/วันแบบ spell slot) ทำให้ Frequency เหนือกว่า peer ใน 2 axis พร้อมกัน บวกกับไม่มี maneuver ไหนผูก concentration เลย (Concentration Risk เหนือกว่าทั้ง 2 axis เช่นกัน) — Severity/Magnitude ของ Captain เองอ่อนกว่ามาตรฐานมาก (Tier 1 debuff / heal ต่ำกว่า Healing Word) แต่โครงสร้างดันเกรดขึ้นมาได้ทั้งคู่ — ตัวอย่างที่ 3 ของธีม "ระบบตัดสินจากการนับกฎ ไม่ใช่ความรู้สึกว่าฟีเจอร์แรงแค่ไหน" ต่อจาก Bard's Words of Creation
3. **⚠️ ข้อกังขาเชิงระเบียบวิธีใหม่ — LR-bypass dimension อาจนับ "เหนือกว่า" ง่ายเกินไป**: Staggering Strike ไม่มี saving throw ให้ทอยเลย (เป็น automatic rider ตอนตีโดน) ตามนิยามที่ Anchor ใช้กับ Power Word Kill/Stun จึงนับเป็น "LR-bypass" ได้ตรงตัว — แต่ต่างจาก PWK/PWS ตรงที่ผลลัพธ์ของ Staggering Strike (หัก Battle Die จาก attack roll ครั้งเดียว) เล็กมากจนไม่มีความหมายเชิงยุทธวิธีกับบอสที่มี Legendary Resistance จริงๆ — นิยามปัจจุบันของ Anchor ไม่แยกระหว่าง "ไม่มี save เพราะเอฟเฟกต์ทรงพลังเกินจะให้ save" (PWK) กับ "ไม่มี save เพราะเอฟเฟกต์เล็กจนไม่จำเป็นต้องมี save" (Staggering Strike) — ยังไม่แก้ Anchor เอง แค่ flag ไว้เป็นช่องโหว่นิยามที่อาจต้องพิจารณาเพิ่มเงื่อนไข "ต้องมีนัยสำคัญด้วย" ไม่ใช่แค่ "ไม่มี save" อย่างเดียว
4. **ข้อตีความ Rally self-target**: ตีความว่า Rally เล็งตัวเองได้ (ตามธรรมเนียมทั่วไปของ 5e ที่คำว่า "ally" มักไม่กันตัวเองออกเว้นเขียนชัดว่า "another creature") ทำให้ Death Prevention dimension ของ Survivability axis ได้ "เหนือกว่า D-baseline" แทนที่จะเป็น D ตรงๆ — เป็นการตีความ ไม่ใช่ข้อความชัดเจน 100% จากไฟล์ต้นฉบับ บันทึกไว้ตรงนี้เผื่อ user อยากพลิกกลับ
5. **⚠️ Tie-break 2-2 เกิดซ้ำเป็นครั้งที่ 3** — Action Economy lv1 เจอ modifier tally 2 เหนือกว่า/2 ต่ำกว่าพอดี (หลังจากที่ Barbarian's Survivability lv2 เจอมาก่อนหน้านี้) ยังคงใช้การตัดสินใจแบบ ad hoc เดิม (net cancellation กลับไปที่ Primary) — ความถี่ที่เพิ่มขึ้นนี้เป็นเหตุผลที่ดีขึ้นเรื่อยๆ ว่าควรฟอร์มัลไลซ์กฎนี้เข้า Anchor Rubric จริงจัง ไม่ใช่แค่ตัดสินใจเฉพาะหน้าทุกครั้ง — ยังไม่แก้ Anchor รอ user คอนเฟิร์ม
6. **ยืนยัน Weapon Mastery floor-escape เป็น pattern จริง ไม่ใช่เคสเดียวของ Barbarian** — Captain มี Weapon Mastery ข้อความเดียวกันเป๊ะ (2 kinds, สลับได้ทุก Long Rest) และได้ผลลัพธ์เดียวกัน (Primary=B หลุด D floor) — เพิ่มความมั่นใจว่า Fighter/Paladin/Ranger/Rogue (ที่ยังไม่ทำ) น่าจะเจอ pattern เดียวกันเมื่อถึงคิว
7. **Action Economy แบนราบยาวที่สุดเท่าที่เคยเจอ (19 เลเวลไม่ขยับ) ก่อนกระโดดที่ capstone เดี่ยว** — Legendary Commander (lv20) เป็นจุดกระโดดเดียวทั้งอาชีพ ต่างจาก Bard ที่มีจุดกระโดดกลางเกม (lv5 Font of Inspiration) — Captain เก็บทุกอย่างไว้ที่ปลายทางสุดขั้ว
8. **Versatility เปิดที่ A ตั้งแต่ lv1 — ไม่มีคลาสไหนก่อนหน้าทำได้** — ขับเคลื่อนด้วย Battle Dice ที่ fungible ข้าม 5 แบบผลลัพธ์พร้อมกันตั้งแต่ต้นเกม ต่างจาก Alchemist/Artificer/Sacred Knight/Barbarian/Bard ที่ล้วนต้องไต่ระดับกว่าจะถึง A
