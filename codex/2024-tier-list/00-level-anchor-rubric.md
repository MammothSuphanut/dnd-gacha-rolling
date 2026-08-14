# Level-Indexed Tier System — Anchor Rubric (2024)

**สถานะ**: 🚧 WIP — **Anchor Rubric (ชั้น 0) เสร็จครบ 7/7 axis แล้ว ผ่าน refinement pass 8 รอบ** แต่ **ยังไม่ได้เริ่มนำไปใช้กับ Class Baseline หรือ Subclass ตัวจริงตัวใดเลย** (ชั้น 1/2 ยังไม่เริ่ม) ระบบ [00-scorecard-methodology.md](00-scorecard-methodology.md) (คะแนนภาพรวมตัวเดียวครอบคลุม 1-20 เลเวล) ยังเป็นระบบที่ใช้งานจริงอยู่ **ไม่ถูกแตะต้อง** — ไฟล์นี้คือ groundwork สำหรับระบบใหม่ที่จะแยกคะแนนตามช่วงเลเวล ทำคู่ขนานไว้ก่อน

**วันที่เริ่มออกแบบ**: 2026-08-14

**🔧 Refinement pass (2026-08-14, หลัง 7/7 axis เสร็จ)**: (1) เพิ่ม [Grading Scale](#grading-scale--แปลงผลเทียบ-anchor-เป็นเกรดยังไง-เพิ่ม-2026-08-14) นิยาม S/A/B/C/D ต่อ checkpoint ชัดเจน — "ไม่มีกลไกเลย" = **D** เสมอ ไม่ใช่ N/A, (2) Damage + Survivability + Support axis เลิก track ASI progression ตามเลเวล เปลี่ยนมาใช้ **flat modifier คงที่ +3 ทุกสเตตตลอด 1-20** แทน (weapon attack/HP บวก +3, cantrip/sneak attack ไม่บวกตามกติกาจริง) กัน ASI assumption ชนกันข้าม axis, (3) เพิ่ม Artificer เข้าตาราง Loadout Flexibility ของ Versatility (ยืนยันมี 2024-style update จริงจากไฟล์ source `EFA`), (4) แก้ N/A→D ในทุกจุดที่เคยเขียนไว้ผิด

**🔧 Refinement pass รอบ 2 (2026-08-14)**: (5) เพิ่ม [Sub-dimension tie-break](#sub-dimension-tie-break--เกรดเดียวจาก-5-มิติที่อาจไม่ตรงกัน-เพิ่ม-2026-08-14-รอบ-2) — นิยาม Primary dimension ต่อ axis + กฎขยับเกรด ±1 จากมิติรอง + floor rule (Primary=D → เกรดรวม=D เสมอ) แก้ช่องว่างที่ Grading Scale เดิมไม่บอกวิธีรวม 5 มิติที่ให้ผลไม่ตรงกันเป็นเกรดเดียว, (6) Damage table แก้ band "17-20" ที่เคยเขียนให้ Fighter's 4-attack outlier (~34) ดูเหมือนคงที่ทั้ง band ทั้งที่จริงเกิดเฉพาะ lv20 เท่านั้น (lv17-19 ยังเป็น 3-attack=~26) — เพิ่ม qualifier ชัดเจน, (7) ยุบ band "4" ที่ซ้ำกับ "1-3" (เหลือจากยุค ASI-based ก่อนเปลี่ยนมาใช้ flat +3) รวมเป็น "1-4", (8) Control table แก้ Power Word Kill stickiness cell เลิกใช้คำว่า "N/A" (ชนกับกฎ N/A→D ของ Grading Scale ทั้งที่ความหมายจริงคือ "เป้าตายจบเกม" ไม่ใช่ "ไม่มีกลไก") เปลี่ยนเป็นคำอธิบายตรงๆ แทน, (9) Support table แก้ Aid's Frequency cell ที่เคยปนจำนวน slot/วันกับจำนวนครั้งที่ต้อง cast จริง (Aid คุ้มทั้งวันด้วย 1 cast)

**🔧 Refinement pass รอบ 3 (2026-08-14)**: user ยืนยันให้ทำตามหลักการข้อ 1 อย่างเคร่งครัด (**"ทุกเลเวลต้องมีแถวของตัวเอง"**) ซึ่งตารางแบบ band-compressed (1-4, 5-7 ฯลฯ) ที่ใช้มาตั้งแต่ต้นไม่ตรงตามนี้จริง — **ขยายทั้ง 7 ตารางเป็น 20 แถวเต็ม (lv1-20) ทุกแกน** แถวที่ไม่มีจุดเปลี่ยนเขียนเป็น "= lvN" อ้างอิงกลับแทนพิมพ์ค่าซ้ำยาวๆ (ยังนับว่าพิจารณาแล้ว ไม่ใช่ข้ามไป) ระหว่างขยายพบ + แก้เพิ่ม 2 จุดที่ band เดิมซ่อนความไม่แม่นยำไว้: Action Economy table ก็มีปัญหาเดียวกับ Damage (Fighter 4-attack ที่ lv20 เคยถูกฝังรวมอยู่ใน band "17-20" — ตอนนี้แยกออกมาเป็นแถว lv20 เดี่ยวๆ ชัดเจน), และ Utility table's Skill-Check Layer column เคยผูกกับ slot-level band ทั้งที่จริงมี milestone ของตัวเอง (Rogue lv1/lv6, Bard lv2/lv9, Ranger lv9) ไม่ตรง slot cadence — ตอนนี้แยก 2 จังหวะชัดเจนแล้ว

**🔧 Refinement pass รอบ 4 (2026-08-14)**: ตรวจซ้ำหลังขยายเป็น 20 แถว เจอ 3 จุด — (a) Sub-dimension tie-break ตัวอย่าง (Wizard lv1 Survivability) มีเลขคณิตผิด/ขัดแย้งในตัวเอง (เขียนว่า "2/4 มิติเป็น D" แล้วพูดต่อว่า "ยังไม่ถึง ≥2" ทั้งที่จริงมี 3 มิติเป็น D ไม่ใช่ 2) — แก้เลขและคำอธิบายให้ตรงกันแล้ว, (b) Damage table's Magnitude column แถว lv9 กับ lv15 อ้างอิงย้อนไปแถว carry-forward อื่น (lv7-8, lv13-14) แทนที่จะชี้ตรงไปแถว milestone จริง (lv5, lv11) กลายเป็น reference 2 ชั้น (ต้องตามลิงก์ 2 ต่อกว่าจะเจอค่าจริง) — แก้ให้ชี้ตรงแถว milestone จริงแล้วทั้ง 2 จุด (ตรวจทั้งไฟล์แล้วพบว่าเป็นจุดเดียวที่มีปัญหานี้ ตารางอื่นอ้างอิงชั้นเดียวหมด), (c) ประโยค "เป็น assumption ปรับได้" ใน Damage Anchor ลอยเดี่ยวไม่มีบริบทจากการแก้ไขก่อนหน้า — รวมเข้ากับย่อหน้าบนแล้ว

**🔧 Refinement pass รอบ 5 (2026-08-14)**: ตรวจ cross-check ตัวเลข/claim กับไฟล์ข้อมูลจริงเพิ่มเติม (Monk/Barbarian/Rogue/Paladin classFeature + Mass Cure Wounds/Heal/Regenerate/Sleep spell text) เจอบั๊กจริง 2 จุด — (a) **Control table's Sleep (lv1) Severity เขียนผิดเป็น "Tier 2" ทั้งที่ spell text จริงจบที่ Unconscious condition** ซึ่ง Severity scale ของไฟล์นี้เองนิยาม Unconscious ไว้ที่ Tier 4 — แก้เป็น Tier 4 แล้ว ย้ายคำอธิบายเรื่อง "หลุดง่าย/save ซ้ำได้" ไปอยู่ที่มิติ Stickiness ล้วนๆ (ที่มันควรอยู่อยู่แล้ว) แทนที่จะไปลดเกรด Severity ซึ่งทำให้ 2 มิติทับซ้อนกัน, (b) **Versatility table's lv6 Resource Fungibility milestone อ้าง Empowered Strikes (Monk) ผูกกับ Focus Point ทั้งที่เช็คไฟล์จริงแล้วเป็น feature ฟรีไม่มีต้นทุนเลย** — milestone จริงที่พลาดไปคือ Stunning Strike (Monk, **lv5** ไม่ใช่ lv6) ซึ่งจ่าย Focus Point แลก Stunned condition ตรงๆ (ตัวอย่าง fungibility ข้าม Damage→Control axis ชัดที่สุดในตาราง) — ย้าย milestone จาก lv6 ไป lv5 แล้ว, lv6 กลายเป็น carry-forward ล้วน ตรวจสอบเพิ่มเติม (Mass Cure Wounds 5d8 ในปี 2024 ไม่ใช่ 3d8 แบบ 2014, Heal 70HP, Regenerate 4d8+15, Relentless Rage/Uncanny Dodge/Aura of Protection/Disciplined Survivor/Superior Defense) ยืนยันตรงกับไฟล์ข้อมูลจริงหมด ไม่ต้องแก้

**🔧 Refinement pass รอบ 6 (2026-08-14)**: cross-check ตัวเลขที่เหลือใน Action Economy/Utility (Cunning Action/Steady Aim/Reliable Talent/Flurry of Blows/Action Surge/Metamagic option count+Quickened Spell restriction/Bard+Ranger Expertise levels) กับไฟล์ XPHB จริงทั้งหมด — **ตรงหมด ไม่มีบั๊กใหม่** ยกเว้น 1 จุดขาดรายละเอียด: **Survivability table's Indomitable (Fighter, lv9) เขียนแค่ "reroll save พลาดได้" ทั้งที่ 2024/XPHB อัปเกรดเป็น "reroll พร้อมบวก Fighter level เข้าไปในการทอยใหม่ด้วย"** (แรงกว่า plain reroll ของปี 2014 อย่างมีนัยสำคัญ) — เพิ่มรายละเอียดนี้เข้าไปแล้ว ไม่ใช่บั๊กแต่เป็นช่องว่างความละเอียดที่ควรเติมเพราะไฟล์นี้อ้างว่ายืนยันจาก classFeature จริงทุกจุด — **ตรวจ Metamagic option count (2+2+2=6 ที่ lv2/10/17) และ Quickened Spell's "ห้าม cast level1+ ซ้ำเทิร์นเดียวกัน" ยืนยันตรงกับไฟล์จริงทุกตัวอักษร**

**🔧 Refinement pass รอบ 7 (2026-08-14)**: user ชี้ประเด็นเชิงระเบียบวิธี — **ไม่ควรเอา feature ของคลาสใดคลาสหนึ่งมาแปะเป็น "มาตรฐาน" ของทั้งตาราง** (ขัดกับนิยาม Grading Scale เองที่บอกว่า "B = ตรงกับ peer standard = ค่ากลาง ไม่ใช่ค่าเฉลี่ย") — พบว่า **Survivability table's Mitigation/Debuff-Resistance/Death-Prevention columns เป็นจุดที่ผิดหลักการนี้ชัดที่สุด**: cell หลายจุด (Uncanny Dodge=Rogue, Evasion=Rogue/Monk, Indomitable=Fighter, Relentless Rage=Barbarian, Disciplined Survivor/Superior Defense=Monk) เขียนด้วยถ้อยคำที่ฟังดูเหมือนเป็นมาตรฐานร่วม (เช่น "กลายเป็นมาตรฐานใหม่ที่พบได้") ทั้งที่จริงมีคลาสเดียวเท่านั้นที่มี — แก้โดย (1) เพิ่มคำเตือนต้นตารางว่า peer standard ของ 4 มิตินี้คือ **D (ไม่มีเลย)** เกือบตลอดทั้งตาราง ไม่ใช่ feature ตัวอย่างที่ยกไว้, (2) แก้ทุก cell ที่อ้างอิงชื่อคลาสเดี่ยวให้ขึ้นต้นด้วย "**ตัวอย่างเพดาน ไม่ใช่ peer standard**" ชัดเจนทุกจุด (lv5 Uncanny Dodge, lv7 Evasion, lv9/13/17 Indomitable, lv11 Relentless Rage, lv14 Disciplined Survivor, lv18 Superior Defense) — ตรวจ Action Economy แล้วพบว่าเขียนไว้ดีอยู่แล้ว (Riposte ระบุ "subclass-locked ไม่ใช่ peer-standard" ชัดเจน, lv2 milestone ระบุเป็น "4 คลาสต่างกัน" ไม่ใช่มาตรฐานเดียว) — Control/Support ใช้สเปลล์ full-caster ที่เข้าถึงได้หลายคลาสพร้อมกันอยู่แล้วจึงไม่มีปัญหานี้

**🔧 Refinement pass รอบ 8 (2026-08-14)**: cross-check เพิ่มเติมกับ `spells-xphb.json` เจอบั๊ก/ช่องว่างจริง 5 จุดใน Support Anchor — (a) **Haste (lv5) เขียนผิดว่า extra action "ยกเว้น attack"** ทั้งที่ 2024/XPHB เปลี่ยนกติกาให้ทำ Attack ได้ 1 ครั้งด้วย (Attack[one attack only]/Dash/Disengage/Hide/Utilize) — คำอธิบายเดิมยังใช้กติกา 2014 อยู่ แก้แล้ว พร้อมเพิ่มดาบสองคมตอนสเปลล์หมดฤทธิ์ (Incapacitated+Speed0 จนจบเทิร์นถัดไป) ที่เคยละไว้, (b) **lv1 Magnitude ปนกัน Cure Wounds (2d8+3≈12) กับ Healing Word (2d4+3≈8) เป็นค่าเดียวกัน** ทั้งที่ 2024 อัปเกรดเต๋าคนละขนาด (Healing Word เบากว่าจริง แลกกับ bonus action+ระยะ) — แยกคำนวณแล้ว, (c) **Mass Cure Wounds (lv9) ปัดเลขผิด** — 5d8+3 เฉลี่ยจริงคือ 22.5+3=25.5 ปัดเป็น 26 (ไม่ใช่ 27 ที่เขียนไว้เดิม ซึ่งปัดขึ้นเกิน 1.5) แก้ทั้งค่าต่อคนและค่ารวม 6 คน (156 ไม่ใช่ 162), (d) **Death Ward (lv7) ขาดเอฟเฟกต์ที่สอง** — สเปลล์จริงมี 2 ส่วน (กัน HP=0 ครั้งนึง + กัน instant-death effect ที่ไม่ใช่ดาเมจด้วย เช่น disintegrate/sphere of annihilation) เดิมเขียนแค่ส่วนแรก เพิ่มส่วนที่สองแล้ว, (e) **Power Word Stun/Kill (lv15/17) ขาด fallback ตอน HP เกินเกณฑ์** — Power Word Stun ถ้า HP>150 จริงๆ ยังมี fallback (Speed=0 ชั่วคราว) ไม่ใช่ "ไม่เกิดอะไรเลย", Power Word Kill ถ้า HP>100 fallback เป็น 12d12 Psychic damage (~78) ซึ่งสำคัญมากเพราะบอส lv17+ ส่วนใหญ่ HP เกิน 100 จึงเจอ fallback นี้บ่อยกว่าเอฟเฟกต์ตายทันทีจริงๆ — เพิ่มทั้ง 2 จุดแล้ว

---

## เป้าหมาย

ระบบเดิมให้คะแนน subclass เป็นภาพรวมตัวเดียวครอบคลุมทั้ง 1-20 เลเวล (ดู [00-scorecard-methodology.md](00-scorecard-methodology.md)) ซึ่งไม่ตอบโจทย์กรณีอยากรู้ว่า subclass นี้ "แรงแค่ไหน ณ เลเวลที่กำลังเล่นอยู่จริง" — เป้าหมายของระบบใหม่คือให้ผู้ใช้เลือกเลเวล 1-20 แล้วเห็นคะแนนที่ตรงกับจุดนั้นจริง โดยไม่ต้องประเมินทีละเลเวลจริง 20 รอบ (ซึ่งจะซ้ำซ้อนมหาศาลเพราะ feature ส่วนใหญ่เปลี่ยนที่ milestone level เท่านั้น ไม่ใช่ทุกเลเวล)

## หลักการที่ตกลงกันไว้ (จากบทสนทนาออกแบบ)

1. **Milestone-based ไม่ใช่ full-20 authored** — เขียนคะแนนจริงเฉพาะเลเวลที่มีอะไรเปลี่ยนแปลงจริง เลเวลที่เหลือ carry-forward ค่าจากจุดล่าสุด **แต่ทุกเลเวลต้องมีแถวของตัวเองเสมอ** (แม้จะ carry-forward ก็ต้องระบุชัดว่าพิจารณาแล้ว ไม่ใช่ข้ามไปเฉยๆ)
2. **ห้าม sum คะแนนสะสม (base + subclass บวกตรงๆ)** — จะชนเพดาน 10/10 เร็วเกินไปเพราะพลังในเกมเพิ่มขึ้นทุกเลเวลทุกคลาส ทำให้ทุกอย่างกลายเป็น S ตั้งแต่กลางเกม แยกดีแยกแย่ไม่ออก ต้อง**ตัดสินใหม่ทุก checkpoint แบบเทียบกับเพื่อนร่วมเลเวลเดียวกัน** (ไม่ใช่เทียบกับตัวเองในอดีต)
3. **milestone level ต่างกันได้ตาม axis** — Damage เปลี่ยนที่เลเวล ASI/Extra Attack/cantrip-die (4,5,8,11,12,16,17,19,20) ส่วน Control เปลี่ยนที่เลเวล spell-slot (1,3,5,7,9,11,13,15,17) คนละ cadence กัน ไม่บังคับให้ทุก axis ใช้จุดตัดเดียวกัน
4. **ต้องมี Anchor Rubric กลางก่อน** — จุดอ้างอิง "มาตรฐานเพื่อนร่วมเลเวล" ต้องเขียนไว้ล่วงหน้าเป็นลายลักษณ์อักษร (ไฟล์นี้) ไม่ใช่ให้ผู้ประเมินนึกเอาเองทุกครั้ง เพื่อลดความเสี่ยง calibration เพี้ยนข้ามคลาส/ข้าม session (ระบบเดิมเคยเจอปัญหานี้มาแล้วครั้งหนึ่ง — S tier พุ่ง 30% ก่อนแก้ด้วย point-formula ดู [project_overall_tier_point_rework])
5. **แต่ละ axis อาจต้องมีมิติเทียบมากกว่า 1 ตัวเลข** — ตัวเลขเดียว (DC สำหรับ Control, DPR เฉลี่ยสำหรับ Damage) ไม่พอแยกของเก่ง/แย่ ต้องแตกเป็นหลายมิติ (ดูรายละเอียดแต่ละ axis ด้านล่าง)
6. **"ไม่มีกลไกเลย" = คะแนนต่ำสุด (D) เสมอ ไม่ใช่ N/A ที่ยกเว้นการให้คะแนน** — ดู [Grading Scale](#grading-scale--แปลงผลเทียบ-anchor-เป็นเกรดยังไง-เพิ่ม-2026-08-14) ด้านล่าง (ยืนยันจาก user 2026-08-14)

## Workflow เต็ม (3 ชั้น)

- **ชั้น 0 (ไฟล์นี้)**: Anchor Rubric — จุดอ้างอิงกลางข้ามคลาส ต่อ axis ต่อเลเวล ทำครั้งเดียวใช้ตลอดทั้งระบบ
- **ชั้น 1 (ยังไม่เริ่ม)**: 30 Class Baseline แบบ level-indexed — เทียบกับ Anchor Rubric แต่ละเลเวล
- **ชั้น 2 (ยังไม่เริ่ม)**: 478 Subclass overlay แบบ level-indexed — เทียบกับ Anchor Rubric เหมือนกัน ไม่ใช่เทียบกับ baseline ของคลาสตัวเองอย่างเดียว

## Grading Scale — แปลงผลเทียบ Anchor เป็นเกรดยังไง (เพิ่ม 2026-08-14)

ทุก checkpoint (1 axis × 1 เลเวล ของ 1 คลาส/subclass ในชั้น 1/2) ให้เกรดเดียวโดยเทียบ 5 มิติของ axis นั้นกับแถว Anchor ที่ตรงกับ band ของเลเวลนั้น ใช้ตัวอักษรชุดเดียวกับระบบเดิม ([00-scorecard-methodology.md](00-scorecard-methodology.md)) เพื่อให้แปลงเป็น point ได้ทันทีถ้าวันหลังอยากรวมคะแนนข้าม axis (S=+3/A=+2/B=+1/C=0/D=-1 ตาม point formula ของ [[project_overall_tier_point_rework]]):

| เกรด | เกณฑ์ |
|---|---|
| **S** | เหนือ peer standard ชัดเจนในหลายมิติพร้อมกัน — ระดับเดียวกับ "outlier" ที่ตารางแต่ละ axis ระบุไว้แล้ว (เช่น Fighter ใน Damage, Monk ใน Survivability) |
| **A** | เหนือ peer standard ในอย่างน้อย 1 มิติ ส่วนที่เหลือเท่ากับมาตรฐาน |
| **B** | ตรงกับ peer standard ทุกมิติ — นี่คือนิยามของคำว่า "peer" เอง (ค่ากลาง ไม่ใช่ค่าเฉลี่ย) |
| **C** | มีกลไกของ axis นี้จริง แต่ต่ำกว่า peer standard ในบางมิติ (อ่อนกว่ามาตรฐาน — ไม่ใช่ไม่มี) |
| **D** | **ไม่มีกลไกที่เกี่ยวข้องกับ axis นี้เลย ณ เลเวลนั้น** — ให้เป็นคะแนนต่ำสุดตรงๆ **ไม่ใช่ N/A ที่ยกเว้นการให้คะแนน** (ยืนยันจาก user 2026-08-14: "ถ้า class/subclass นั้นมันไม่มีเลยก็ควรจะต่ำสุด") |

ตัวอย่างการใช้จริง: Barbarian ที่ lv1 ไม่มีสเปลล์และไม่มี Expertise → ไม่มีกลไกใน Utility axis เลย → **D** ตรงๆ ไม่ใช่ N/A — ต่างจาก Wizard ที่ lv1 มี Detect Magic/Identify แต่ breadth แคบกว่ามาตรฐาน mid-game ซึ่งจะได้ **C** ไม่ใช่ D เพราะยังมีกลไกอยู่ เพียงแต่ยังไม่ถึงมาตรฐานพีค

⚠️ กติกานี้ใช้แทนที่คำว่า "N/A" **ในบริบทของการให้เกรด/checkpoint scoring** ที่เคยปรากฏในบาง finding ของแกน Survivability/Versatility ด้านล่าง (เขียนไว้ก่อนกฎนี้จะล็อก) — จุดที่เจอคำว่า N/A ในบริบทให้คะแนน ให้อ่านเป็น "D" แทน **ข้อยกเว้น**: แกน Control ตาราง Power Word Kill ใช้คำอื่น (ไม่ใช้ "N/A") อธิบาย stickiness เพราะเป็นความหมายคนละแบบ (เป้าตายจบเกม ไม่ใช่ "ไม่มีกลไก") — ดู Control Anchor ด้านล่าง

### Sub-dimension tie-break — เกรดเดียวจาก 5 มิติที่อาจไม่ตรงกัน (เพิ่ม 2026-08-14 รอบ 2)

แต่ละ axis มี 5 มิติที่มักให้ผลไม่ตรงกัน (เช่น Wizard lv1 ใน Survivability: Effective HP=C แต่ Mitigation/Death Prevention=D ทั้งคู่) — ต้องมีกติกาแปลงเป็นเกรดเดียวที่ชัดเจน ไม่ใช่ให้ผู้ประเมินเดาเอาเอง:

1. **แต่ละ axis มี 1 มิติ "Primary"** ที่เป็นตัวตั้งต้นของเกรด (ดูตารางด้านล่าง) — ให้เกรดตั้งต้นจากมิตินี้มิติเดียวก่อน โดยเทียบกับ Anchor ตามเกณฑ์ S/A/B/C/D ปกติ
2. **มิติที่เหลือ (4 มิติ) เป็น "Modifier"** — นับจำนวนมิติที่เหนือ peer standard (จะขยับเกรดตั้งต้น **ขึ้น 1 ขั้น** ถ้ามี ≥2 มิติเหนือมาตรฐาน) กับจำนวนมิติที่ต่ำกว่า/ไม่มีกลไกเลย (ขยับเกรดตั้งต้น **ลง 1 ขั้น** ถ้ามี ≥2 มิติต่ำกว่ามาตรฐาน) — ขยับได้สูงสุดครั้งละ 1 ขั้นเท่านั้น (กัน 1 มิติเด่นมากลากทั้งเกรดขึ้น S ทั้งที่ภาพรวมยังธรรมดา)
3. **กฎพื้น (floor rule)**: ถ้ามิติ Primary เป็น D (ไม่มีกลไกเลย) เกรดรวมล็อกที่ **D เสมอ** ไม่ว่ามิติอื่นจะเด่นแค่ไหน — เพราะมิติ Primary คือแกนหลักของ axis นั้นๆ ถ้าไม่มีเลยก็ไม่มีอะไรให้ "เสริม" ได้ (เช่น มาร์เชียลไม่มีสเปลล์ = D ใน Versatility's Loadout Flexibility เสมอ แม้ Cross-Axis Coverage มิติอื่นจะแรงแค่ไหนก็ตาม)

| Axis | Primary dimension | เหตุผล |
|---|---|---|
| Damage | Magnitude (DPR) | ตัวเลขที่นิยาม "แรงแค่ไหน" ตรงที่สุด มิติอื่น (Burst/Breadth/Conditionality/Resistance-proofing) ล้วนเป็นตัวปรับบริบทของ DPR ก้อนนี้ |
| Control | Severity | เกม 5e วัด CC จาก "ทำอะไรเป้าหมายได้แค่ไหน" ก่อนเสมอ — Breadth/Frequency/Stickiness/LR-bypass ล้วนขยาย/จำกัดผลของ severity นั้น |
| Support | Magnitude | เช่นเดียวกับ Damage — ค่าที่ได้ต่อครั้งคือแกนหลัก ส่วน Proactive/Reactive เป็นตัวคูณมูลค่าเชิงคุณภาพ |
| Survivability | Effective HP | เป็นมิติเดียวที่ไม่เคยเป็น D จริง (ทุกคลาสมี hit die) เหมาะเป็นฐาน ส่วน Mitigation/Death Prevention เป็น modifier ที่ปกติจะ D สำหรับ full caster (ดู finding #1) โดยไม่ทำให้เกรดรวมพังเป็น D ทั้งที่ยังมี HP ปกติ |
| Action Economy | Attack-Action Efficiency | Extra Attack cadence คือกระดูกสันหลังของแกนนี้ (เหมือน Damage) ส่วน Bonus/Reaction/Extra-Action/Resource-Conversion เป็นตัวเสริมชั้นบน |
| Utility | Magnitude | ระดับความสมบูรณ์ของการแก้ปัญหาคือตัวตัดสินหลัก Breadth/Reliability/Access-Cost/Skill-Check-Layer ขยายผลนั้น |
| Versatility | Loadout Flexibility | เป็นมิติที่ "คงที่ตายตัวตาม class" ตามที่ finding #1 ของแกนนี้ระบุไว้แล้ว เหมาะเป็นฐานเพราะไม่ผันตาม milestone เหมือนมิติอื่น |

ตัวอย่าง: Wizard lv1 ใน Survivability — Primary (Effective HP, d6 ต่ำกว่า d8 peer) = **C** ก่อน, ตรวจ 4 มิติ Modifier ที่เหลือ: Save Reliability=B (2 prof เท่ากับ baseline ปกติ) แต่ **Mitigation=D / Debuff Resistance=D / Death Prevention=D** (ไม่มีกลไกทั้ง 3 มิติที่ peer-standard สำหรับ full caster) → ครบ 3 มิติ (เกิน ≥2) ต่ำกว่ามาตรฐาน → ขยับลง 1 ขั้น (สูงสุดครั้งละ 1 ขั้นตามกฎ ไม่ว่าจะเกิน ≥2 กี่มิติก็ตาม) จาก C เป็น **D** สุดท้าย — สะท้อนภาพจริงว่า full caster ระดับต้นไม่มีอะไรป้องกันตัวเองเลยนอกจาก HP ดิบ

## ความคืบหน้า Anchor Rubric (7/7 axis — ครบแล้ว)

- [x] Damage
- [x] Control
- [x] Support
- [x] Survivability
- [x] Action Economy
- [x] Utility
- [x] Versatility

---

## Damage Anchor

**Sustained Magnitude (DPR)** คำนวณจากเต๋าดาเมจของแต่ละสาย **บวก flat modifier คงที่ +3 ทุกสเตตที่เกี่ยวข้อง (STR/DEX/CON/ฯลฯ) ตลอด 1-20** แทนการ track ASI progression จริง (ตัวละครเบสสมมติว่า "ทุกสเตตที่ใช้ +3 เท่ากันหมดตั้งแต่ lv1" ไม่ไต่ระดับ 3→4→5→6 ตามเลเวลเหมือนที่เคยทำ) — กัน Damage กับ Survivability axis ชนกันเรื่อง "ASI ก้อนแรกลงสเตตไหน" โดยไม่ต้องทิ้ง mod ไปเลยทั้งหมด แบ่งเป็น 3 สาย peer-standard คนละ track:

- **มาร์เชียล (2-attack baseline)**: อาวุธ 1d10+3 (avg 8.5) ต่อ attack — 1 ครั้ง lv1-4, 2 ครั้งหลัง Extra Attack (lv5+, คงที่ยาวไปจนจบอาชีพสำหรับคลาสที่ไม่ใช่ Fighter) — weapon attack ตามกติกาจริงบวก ability mod เข้าดาเมจเสมอ
- **คาสเตอร์ (cantrip)**: ยืนยันจาก `spells-xphb.json` — Fire Bolt scale 1d10(lv1)→2d10(lv5)→3d10(lv11)→4d10(lv17) **ไม่บวก mod เลย** ตามกติกาจริง (cantrip attack ประเภท Fire Bolt ไม่เคยบวก spellcasting modifier เข้าดาเมจ ต่างจาก weapon attack — ยืนยันจาก entry text ที่ระบุแค่ "1d10 Fire damage" ไม่มี mod)
- **Rogue (weapon+Sneak Attack)**: อาวุธ finesse 1d6+3 (avg 6.5) + Sneak Attack **ไม่บวก mod** (ตามกติกาจริง sneak attack เป็นเต๋าเสริมล้วน) — ยืนยันจาก `class-rogue.json`: 1d6(lv1-2) โตขึ้น 1d6 ทุก 2 เลเวลจนถึง 10d6(lv19-20), เงื่อนไขการ trigger อยู่ในมิติ Conditionality แยกต่างหาก

ทั้ง 3 track นี้เป็น **assumption ที่ปรับได้ ไม่ใช่ตัวเลขทางการ** — ใช้เพื่อให้มีจุดอ้างอิงตัวเลขคงที่ข้าม session เท่านั้น

5 มิติที่ใช้ประเมิน: **Magnitude** (DPR ยั่งยืน) / **Burst-Peak** (ทุ่ม resource จำกัดสูงสุดได้เท่าไหร่) / **Breadth** (เดี่ยว vs AoE) / **Conditionality** (ต้องมีเงื่อนไขก่อนได้ดาเมจเต็มไหม) / **Resistance-proofing** (ชนิดดาเมจโดนต้านง่ายแค่ไหน)

**หมายเหตุการอ่านตาราง**: ทุกเลเวลมีแถวของตัวเองตามหลักการข้อ 1 — แถวที่ไม่มีจุดเปลี่ยนจะเขียน "= lvN (ไม่มีจุดเปลี่ยน)" สั้นๆ แทนการพิมพ์ค่าซ้ำยาวๆ แต่ยังนับว่าพิจารณาแล้ว ไม่ใช่ข้ามไป

| Lv | Magnitude (DPR — เต๋า + flat +3 บนสาย weapon เท่านั้น) | Burst/Peak | Breadth | Conditionality | Resistance-proofing |
|---|---|---|---|---|---|
| 1 | มาร์เชียล 1d10+3=**~9** / คาสเตอร์ 1d10 (ไม่มี mod)=**~6** / Rogue (1d6+3)+sneak1d6=**~10** | ~1x — แทบไม่มี resource สำหรับ nova | เดี่ยว | ไม่มีเงื่อนไข (attack/cantrip ปกติ) | อาวุธ nonmagical โดน resist จาก construct/ooze บางตัวได้; ดาเมจธาตุ (fire/cold) โดนต้านบ่อยกว่า |
| 2 | = lv1 (ไม่มีจุดเปลี่ยน) | = lv1 | = lv1 | = lv1 | = lv1 |
| 3 | มาร์เชียล/คาสเตอร์ = lv1-2 / **Rogue sneak dice bump** → 2d6=**~14** | = lv1 | = lv1 | = lv1 | = lv1 |
| 4 | = lv3 (ไม่มีจุดเปลี่ยน — ASI เดิมเคยสำคัญที่ lv4 แต่ตอนนี้ใช้ flat +3 คงที่แล้วไม่มีผลอะไรที่เลเวลนี้) | = lv1 | = lv1 | = lv1 | = lv1 |
| 5 | **จุดเปลี่ยนใหญ่ (3 track พร้อมกัน)** — มาร์เชียล Extra Attack: 2 ครั้ง=**~17** / คาสเตอร์ cantrip die bump: 2d10=**~11** / Rogue sneak dice bump → 3d6=**~17** | **~2x** — rider die ก้อนแรกใช้ได้ (sneak attack/smite แรก) หรือ Action Surge (เฉพาะ Fighter) | เดี่ยว (เว้น caster ที่มี Fireball-tier AoE ตั้งแต่ slot3) | **เริ่มมีเงื่อนไข** — sneak attack ต้อง advantage/ally ประชิด, smite ต้องตีติดก่อนถึงจ่ายได้ | อาวุธเริ่มเป็น magical (หลบ nonmagical-resist ส่วนใหญ่) |
| 6 | = lv5 (ไม่มีจุดเปลี่ยน) | = lv5 | = lv5 | = lv5 | = lv5 |
| 7 | มาร์เชียล/คาสเตอร์ = lv5-6 / Rogue sneak dice bump → 4d6=**~21** | = lv5 | = lv5 | = lv5 | = lv5 |
| 8 | = lv7 (ไม่มีจุดเปลี่ยนที่มาร์เชียล/คาสเตอร์ — ไม่มีกลไกเพิ่มจำนวน/ขนาดเต๋าอาวุธอีกแล้วนอกจาก Fighter) | ~2x คงเดิม (resource pool ใหญ่ขึ้นแต่สัดส่วน burst เท่าเดิม) | ตามคลาส | เงื่อนไขเดิม | เหมือนเดิม |
| 9 | มาร์เชียล/คาสเตอร์ = lv5 (คงที่มาตั้งแต่นั้น ยังไม่มีจุดเปลี่ยนใหม่) / Rogue sneak dice bump → 5d6=**~24** | = lv8 | = lv8 | = lv8 | = lv8 |
| 10 | = lv9 (ไม่มีจุดเปลี่ยน) | = lv8 | = lv8 | = lv8 | = lv8 |
| 11 | **จุดเปลี่ยนใหญ่** — มาร์เชียล peer-standard ยังคง 2 attack=**~17** (⚠️ Fighter outlier เริ่มที่นี่: Extra Attack×3=**~26**) / **คาสเตอร์กระโดด** cantrip die bump: 3d10=**~17** (มาบรรจบกับมาร์เชียล peer-standard พอดี) / Rogue sneak dice bump → 6d6=**~28** | **~2.5x** — resource pool ใหญ่พอ dump ซ้ำได้หลายรอบ/แรงขึ้น | caster เริ่มมี AoE ระดับ6+ กว้างขึ้น | เงื่อนไขเดิม แต่บาง subclass ทำให้ trigger ง่ายขึ้น | caster เลือกดาเมจ psychic/force ได้แล้ว (หลบ resist แทบทุกกรณี) |
| 12 | = lv11 (ไม่มีจุดเปลี่ยน) | = lv11 | = lv11 | = lv11 | = lv11 |
| 13 | มาร์เชียล/คาสเตอร์ = lv11-12 (Fighter outlier ยังคง ~26) / Rogue sneak dice bump → 7d6=**~31** | = lv11 | = lv11 | = lv11 | = lv11 |
| 14 | = lv13 (ไม่มีจุดเปลี่ยน) | = lv11 | = lv11 | = lv11 | = lv11 |
| 15 | มาร์เชียล/คาสเตอร์ = lv11 (Fighter outlier ยังคง ~26) / Rogue sneak dice bump → 8d6=**~35** | = lv11 | = lv11 | = lv11 | = lv11 |
| 16 | = lv15 (ไม่มีจุดเปลี่ยน) | = lv11 | = lv11 | = lv11 | = lv11 |
| 17 | **จุดเปลี่ยนใหญ่** — มาร์เชียล peer-standard ยังคง 2 attack=**~17** (Fighter outlier ยังคง 3 attack=**~26** — 4th attack ยังไม่มาถึง lv20) / คาสเตอร์ cantrip die bump: 4d10=**~22** (**แซงมาร์เชียลแล้ว**) / Rogue sneak dice bump → 9d6=**~38** | **~3x+** — nova เต็มรูปแบบ (Action Surge ซ้อน smite, หรือ slot สูงสุด all-in) | caster กว้างสุด (AoE ระดับ9) | เงื่อนไขเดิม | force/psychic แทบไม่มีอะไรต้านได้เลย ณ จุดนี้ |
| 18 | = lv17 (ไม่มีจุดเปลี่ยน) | = lv17 | = lv17 | = lv17 | = lv17 |
| 19 | มาร์เชียล/คาสเตอร์ = lv17-18 / Rogue sneak dice bump → 10d6=**~42** (**แซงทุกคน**) | = lv17 | = lv17 | = lv17 | = lv17 |
| 20 | **จุดเปลี่ยนสุดท้าย** — มาร์เชียล peer-standard ยังคง 2 attack=**~17** (⚠️ Fighter outlier แตะเพดาน Extra Attack×4=**~34** **เฉพาะเลเวลนี้เลเวลเดียว**) / คาสเตอร์ = lv19 (~22 คงที่) / Rogue = lv19 (~42, sneak 10d6 คงที่ถึง lv20) | = lv17 | = lv17 | = lv17 | = lv17 |

**ข้อค้นพบ**:
1. จุดเปลี่ยนของ Damage ผูกกับ Extra Attack(5) + cantrip die bump(5,11,17) — ไม่ผูกกับ ASI progression เลยหลังเปลี่ยนมาใช้ flat +3 คงที่ (คนละ cadence กับ Control) — **lv11-16 คือจุดที่มาร์เชียล(~17) กับคาสเตอร์(3d10=~17) มาบรรจบกันพอดี** เพราะคาสเตอร์ไม่มี +3 ช่วยเลย (cantrip ไม่บวก mod ตามกติกาจริง) ส่วนมาร์เชียลมี +3 ช่วยทุก attack แต่จำนวน/ขนาดเต๋าอาวุธหยุดโตหลัง lv5 — พอถึง lv17 คาสเตอร์ (4d10=~22) แซงมาร์เชียล (~17 คงที่) ไปเลยเพราะเต๋ายังโตต่อ
2. **Rogue แซง Magnitude ทุกคนตั้งแต่กลางเกม** (sneak attack โตทุก 2 เลเวลไม่มีสะดุด ไม่ผูกกับ ASI/subclass milestone ใดๆ, ได้ +3 ช่วยเฉพาะฝั่ง weapon die ไม่ใช่ sneak dice) แต่ตัวเลขดิบนี้ต้องอ่านคู่กับ Conditionality เสมอ (ต้อง advantage/ally ประชิดก่อนถึงจะได้เต๋า sneak จริง) — Magnitude สูงไม่ได้แปลว่า DPR จริงในสนามสูงตามเสมอ
3. ใช้ **flat +3 คงที่ทุกสเตตตลอด 1-20** (ไม่ track ASI timeline) ทำให้ Damage กับ Survivability axis ไม่ชนกันเรื่อง "ASI ก้อนแรกลงสเตตไหน" อีกต่อไป โดยไม่ต้องทิ้ง ability mod ไปทั้งหมด — ยังคงความจริงของกติกาไว้ (weapon attack บวก mod, cantrip/sneak attack ไม่บวก mod) เพียงแค่ไม่มีฝั่งไหนสมมติ "ASI ลงสเตตไหนก่อน" ที่ขัดกับอีก axis

⚠️ **Fighter เป็น outlier**: Extra Attack ×3 (lv11) และ ×4 (lv20) ทำให้ Magnitude/Burst สูงกว่าตารางนี้อีกชั้น — **ไม่นับเป็นมาตรฐานกลาง** แต่เป็นตัวอย่างที่ควรได้คะแนนเหนือมาตรฐาน (A/S)

---

## Control Anchor

**Severity scale** (ไม้บรรทัดกลางของ condition):

| Tier | ตัวอย่าง | ผล |
|---|---|---|
| 4 (สูงสุด) | Stunned, Paralyzed, Incapacitated, Unconscious | ทำอะไรแทบไม่ได้เลย |
| 3 | Restrained, Banished ระยะสั้น, Charmed (จำกัดบริบท) | จำกัดหนักมาก แต่ยังต้านได้บ้าง |
| 2 | Prone, Slowed, Grappled | จำกัดปานกลาง |
| 1 | debuff เล็กๆ | รบกวนเล็กน้อย |

5 มิติที่ใช้ประเมิน: **Severity** / **Breadth** (กี่เป้าหมาย) / **Frequency** (กี่ครั้ง/วัน) / **Stickiness** (หลุดง่ายแค่ไหน — save ทุกเทิร์น / save ครั้งเดียวคงอยู่ / ไม่มี save เลย) / **LR-bypass** (ใช้ mechanism ที่ Legendary Resistance ต้านไม่ได้หรือเปล่า — สำคัญเฉพาะ lv15+ ที่เริ่มเจอบอสมี Legendary Resistance บ่อย)

ตัวเลขทั้งหมดยืนยันจาก spell text จริงในไฟล์ `src/data/5etools/official/spells/spells-xphb.json` (2024/XPHB) ไม่ใช่ความจำ:

**หมายเหตุการอ่านตาราง**: milestone ผูกกับ slot level ซึ่งปลดล็อกที่เลเวลคี่เสมอ (1,3,5,7,9,11,13,15,17) เลเวลคู่ที่ตามมาจึง carry-forward เต็มรูปแบบ (ไม่มี slot ใหม่ระหว่างทาง) — เขียน "= lvN" แทนค่าเต็มเพื่อความกระชับ แต่ยังนับว่าพิจารณาแล้วทุกแถว

| Lv | Spell อ้างอิง (slot) | Severity | Breadth | Frequency | Stickiness | LR-bypass |
|---|---|---|---|---|---|---|
| 1 | Sleep (slot1) — 2024 เปลี่ยนมาใช้ WIS save (ต่างจาก 2014 ที่ใช้ HP-pool) | **Tier 4** (Incapacitated ก่อน → Unconscious ถ้า save รอบสองพลาดด้วย — ยืนยันจาก spell text จริง ทั้งคู่เป็น Tier 4 ตามนิยาม Severity scale ด้านบน) | หลายตัวอ่อนๆ ใน 5ft radius | ~3-4/วัน | **ต่ำ** — save รอบถัดไปอีกที + หลุดถ้าโดนดาเมจ (ความอ่อนของสเปลล์นี้อยู่ที่ Stickiness ไม่ใช่ Severity — เดิมเคยลดเกรด Severity ลงมาเป็น Tier 2 เพื่อสะท้อนความอ่อน ซึ่งขัดกับนิยาม Tier scale เอง ทำให้ Severity/Stickiness ทับซ้อนกัน) | ไม่ (มี save) |
| 2 | = lv1 (ไม่มี slot ใหม่) | = lv1 | = lv1 | = lv1 | = lv1 | = lv1 |
| 3 | Hold Person (slot2) | **Tier 4** (Paralyzed) | 1 (humanoid เท่านั้น) | ~3-4/วัน | **ต่ำ** — save ทุกจบเทิร์นเป้าหมาย หลุดเร็ว | ไม่ |
| 4 | = lv3 (ไม่มี slot ใหม่) | = lv3 | = lv3 | = lv3 | = lv3 | = lv3 |
| 5 | Hypnotic Pattern (slot3) | Tier 4 (Charmed+Incap+Speed0) | **กว้าง** — ~10 ตัวใน cube 30ft | ~2-3/วัน | **สูง** — ไม่มี repeat save เลย หลุดแค่โดนดาเมจ/ถูกเขย่า | ไม่ (save แยกทีละตัว) |
| 6 | = lv5 (ไม่มี slot ใหม่) | = lv5 | = lv5 | = lv5 | = lv5 | = lv5 |
| 7 | Banishment (slot4) | Tier 4 (Incap เต็ม duration) | 1-2 | ~2/วัน | **สูง** — ไม่มี repeat save จนกว่า concentration จะขาด | ไม่ |
| 8 | = lv7 (ไม่มี slot ใหม่) | = lv7 | = lv7 | = lv7 | = lv7 | = lv7 |
| 9 | Hold Monster (slot5) | Tier 4 (Paralyzed, ทุกชนิด) | 1 | ~2/วัน | **ต่ำ** — save ทุกเทิร์นเหมือน Hold Person (⚠️ slot สูงขึ้นไม่ได้แปลว่า sticky ขึ้นเสมอ) | ไม่ |
| 10 | = lv9 (ไม่มี slot ใหม่) | = lv9 | = lv9 | = lv9 | = lv9 | = lv9 |
| 11 | Mass Suggestion (slot6) | Tier 3 (Charmed) | **กว้างมาก** — สูงสุด 12 ตัว | ~1-2/วัน | **สูง** — หลุดแค่โดนดาเมจเท่านั้น | ไม่ |
| 12 | = lv11 (ไม่มี slot ใหม่) | = lv11 | = lv11 | = lv11 | = lv11 | = lv11 |
| 13 | *(ไม่มี condition-lock เด่นที่ slot7 — control เปลี่ยนรูปเป็น battlefield control เช่น Reverse Gravity)* | ผสม | กว้าง (AoE) | ~1/วัน | แล้วแต่ spell | ไม่ |
| 14 | = lv13 (ไม่มี slot ใหม่) | = lv13 | = lv13 | = lv13 | = lv13 | = lv13 |
| 15 | **Power Word Stun** (slot8) — ทางเลือก: *Dominate Monster* (Tier 3 Charmed เต็มรูปแบบ, stickiness **สูง**-save แค่ตอนโดนดาเมจ, ไม่ LR-bypass) | Tier 4 (Stunned ถ้า HP≤150 — **fallback ถ้า HP>150: Speed=0 จนถึงต้นเทิร์นถัดไปของผู้คาสต์เท่านั้น** ไม่ใช่ "ไม่เกิดอะไรเลย" แบบที่เคยละไว้ ยืนยันจาก spell text) | 1 | ~1/วัน | ต่ำ (หลุดด้วย CON save ทุกเทิร์นหลังติด) | **✅ ใช่ — ไม่มี save ตอนติดเลย** |
| 16 | = lv15 (ไม่มี slot ใหม่) | = lv15 | = lv15 | = lv15 | = lv15 | = lv15 |
| 17 | **Power Word Kill** (slot9) | สูงสุด (ตายทันทีถ้า HP≤100 — **fallback ถ้า HP>100: 12d12 Psychic damage (~78) แทน** ไม่ใช่ "ไม่เกิดอะไรเลย" แบบที่เคยละไว้ ยืนยันจาก spell text — สำคัญเพราะบอสระดับ lv17+ มักเกิน 100 HP จึงมักเจอ fallback นี้บ่อยกว่าเอฟเฟกต์ตายทันที) | 1 | ~1/วัน | ไม่มีความหมายให้วัดเมื่อเป้าตาย — เป้าตายจบเกมทันที ไม่เหลืออะไรให้ "หลุด" อีก (คนละความหมายกับ "ไม่มีกลไก" ที่ให้ D ตาม Grading Scale — นี่คือผลลัพธ์ที่ดีที่สุดเท่าที่เป็นไปได้ ไม่ใช่การขาดกลไก); กรณี fallback (HP>100) ดาเมจ 12d12 ก็ไม่มี save ต้านเช่นกัน | **✅ ใช่ — ไม่มี save เลย ทั้ง 2 กรณี** |
| 18 | = lv17 (ไม่มี slot ใหม่ — slot9 คือเพดานสูงสุด ไม่มี slot10) | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 |
| 19 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 |
| 20 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 |

**ข้อค้นพบ**:
1. Severity แตะ Tier 4 เร็ว (lv3) แต่ stickiness ไม่ได้ตามมาด้วยเสมอ (Hold Person lv3 และ Hold Monster lv9 ทั้งคู่ save-ทุกเทิร์นเหมือนกัน ห่างกัน 6 เลเวล) — slot level สูงขึ้นไม่การันตี stickiness เพิ่ม
2. lv5 (Hypnotic Pattern) คือจุดที่ severity+breadth+stickiness มาบรรจบกันครั้งแรกจริงๆ ไม่ใช่ lv3
3. lv15 คือจุดที่ LR-bypass เกิดขึ้นครั้งแรก เป็น trade-off ชัดเจนกับ Dominate Monster (sticky-แต่โดน LR ต้าน vs LR-proof-แต่หลุดง่ายกว่า)
4. ⚠️ Control **ไม่มีมาตรฐานกลางที่ยุติธรรมข้ามทุกคลาส** เพราะเกมออกแบบให้ full caster ผูกขาด CC เกือบทั้งหมด — anchor นี้อิง full-caster เป็นหลัก มาร์เชียลล้วนได้คะแนนต่ำกว่าตามจริงโดยไม่ต้องหา "มาตรฐานคู่ขนาน" มาช่วย

---

## Support Anchor

Support มีสองสาย mixed กัน ที่มูลค่าจริงต่างกันมาก: **ฮีล** (แก้หลังเกิดเรื่อง) กับ **บัฟ** (กันก่อนเกิดเรื่อง) — 5 มิติที่ใช้ประเมิน: **Magnitude** (ค่าที่ได้ต่อครั้ง) / **Breadth** (เดี่ยว vs ทั้งปาร์ตี้) / **Action Economy** (bonus action vs full action vs free ผ่าน aura) / **Proactive vs Reactive** (บัฟก่อนเกิดเรื่องมักคุ้มกว่าฮีลหลังเกิดเรื่อง เพราะฮีลแค่ลบล้างดาเมจที่ทำไปแล้ว ไม่เพิ่มมูลค่าใหม่ให้ encounter) / **Frequency/Sustainability** (จำกัดครั้ง/วัน vs aura ต่อเนื่อง vs downtime-only)

ยืนยันจาก spell text จริงในไฟล์ `spells-xphb.json`:

**หมายเหตุการอ่านตาราง**: milestone ผูกกับ slot level (เลเวลคี่ 1,3,5,7,9,11,13,15,17) เหมือนแกน Control — เลเวลคู่ carry-forward เต็มรูปแบบ

| Lv | Spell อ้างอิง (slot) | Magnitude | Breadth | Action Economy | Proactive/Reactive | Frequency |
|---|---|---|---|---|---|---|
| 1 | Bless / Cure Wounds / **Healing Word** (slot1) | ฮีล **Cure Wounds** 2d8+3(**~12**, full action, touch) vs **Healing Word** 2d4+3(**~8**, bonus action, 60ft) — ยืนยันจาก `spells-xphb.json`: 2024 ทั้งคู่อัปเกรดจาก 2014 (Cure Wounds 1d8→2d8, Healing Word 1d4→2d4) แต่ **เต๋าคนละขนาดกันจริง ไม่ใช่ ~12 เท่ากันแบบที่เคยเขียนรวมไว้** — Healing Word เบากว่าจริง แลกกับความสะดวก bonus action+ระยะ ไม่ใช่ magnitude เท่ากัน — เดี่ยวทั้งคู่ / Bless +1d4 atk/save 3 คน | สูงสุด 3 (Bless) / เดี่ยว (ฮีล) | **ผสม** — Healing Word เป็น **bonus action** (ฮีลได้โดยยังโจมตีได้ปกติ) ส่วน Cure Wounds/Bless เป็น full action | ทั้งสองสายมีตั้งแต่ lv1 | ~3-4/วัน |
| 2 | = lv1 (ไม่มี slot ใหม่) | = lv1 | = lv1 | = lv1 | = lv1 | = lv1 |
| 3 | Aid (slot2) | +5 max/current HP ×3 คน — อยู่ทั้งวัน ไม่ต้อง cast ซ้ำ | 3 คน | full action แต่ cast ครั้งเดียวคุ้มทั้งวัน | **Proactive** | **1 ครั้ง/วันก็พอ** — ผลอยู่ 8 ชม. เต็มรอบผจญภัย (เดิมเขียน "~3-4/วัน" ปนกับจำนวน slot ที่มี ทำให้เข้าใจผิดว่าต้อง cast ซ้ำหลายครั้ง — แก้ให้ตรงกับนิยาม Frequency จริง คือ "ต้อง cast กี่ครั้ง" ไม่ใช่ "มี slot กี่อัน") |
| 4 | = lv3 (ไม่มี slot ใหม่) | = lv3 | = lv3 | = lv3 | = lv3 | = lv3 |
| 5 | Beacon of Hope / Haste (slot3) | **สูง** — Haste ให้ action เพิ่มทั้งตัว: **2024 อนุญาต Attack ได้ 1 ครั้งด้วย** (Attack[one attack only]/Dash/Disengage/Hide/Utilize — ยืนยันจาก `spells-xphb.json` entry text ตรงๆ, แก้จากที่เคยเขียนผิดว่า "ยกเว้น attack" ซึ่งเป็นกติกา 2014 เก่าที่ 2024 เปลี่ยนไปแล้ว) แต่มีดาบสองคม — เมื่อสเปลล์หมดฤทธิ์เป้าหมายติด Incapacitated+Speed0 จนจบเทิร์นถัดไป (lethargy), Beacon กัน unconscious + advantage WIS/death save ตลอด duration | เดี่ยว (ทั้งคู่ single target) | full action, ผลอยู่ตลอด duration (concentration) | **Proactive** | ~2-3/วัน |
| 6 | = lv5 (ไม่มี slot ใหม่) | = lv5 | = lv5 | = lv5 | = lv5 | = lv5 |
| 7 | Death Ward / Freedom of Movement (slot4) | **สูงมาก — จุดเปลี่ยน** — Death Ward กัน HP=0 ครั้งนึงฟรี (cheat-death เต็มรูปแบบ) **+ กัน instant-death effect ที่ไม่ใช่ดาเมจด้วย** (เช่น disintegrate ตอน HP เหลือ0, sphere of annihilation — ยืนยันเพิ่มจาก entry ที่ 2 ของ spell text, เดิมเขียนไว้แค่ effect แรก), Freedom of Movement กัน paralyze/restrain/grapple ทั้งดื้อตลอด duration | เดี่ยว | full action, ผลอยู่ตลอด duration | **Proactive ล้วน** — Magnitude แซงฮีลไปไกล | ~2/วัน |
| 8 | = lv7 (ไม่มี slot ใหม่) | = lv7 | = lv7 | = lv7 | = lv7 | = lv7 |
| 9 | Mass Cure Wounds / Greater Restoration (slot5) | 5d8+3 เฉลี่ย 22.5+3=25.5 → **~26**/คน ×6 คน (**~156** รวม — แก้เลขปัดจาก ~27/~162 เดิมที่ปัดขึ้นเกินจริง 1.5) หรือแก้ debuff หนัก (curse/stat drain/exhaustion) | กว้าง (6 คน) | full action | **Reactive** กลับมาโดดเด่นด้วย breadth | ~2/วัน |
| 10 | = lv9 (ไม่มี slot ใหม่) | = lv9 | = lv9 | = lv9 | = lv9 | = lv9 |
| 11 | Heal (slot6) | **70 HP คงที่** + แก้ blind/deaf/poison | เดี่ยว | full action | Reactive | ~1-2/วัน |
| 12 | = lv11 (ไม่มี slot ใหม่) | = lv11 | = lv11 | = lv11 | = lv11 | = lv11 |
| 13 | Regenerate (slot7) | 4d8+15 + ฟื้น 1HP/เทิร์นต่อเนื่อง | เดี่ยว | **downtime-only** (cast 1 นาที ใช้กลางคอมแบตไม่ได้) | Reactive | ~1/วัน (นอกคอมแบต) |
| 14 | = lv13 (ไม่มี slot ใหม่) | = lv13 | = lv13 | = lv13 | = lv13 | = lv13 |
| 15 | **Holy Aura** (slot8) | advantage ทุก save + disadvantage ศัตรูโจมตี + blind fiend/undead ที่ตี | **ทั้งปาร์ตี้** (ไม่จำกัดจำนวน) | full action, ผลอยู่ตลอด duration | **Proactive สูงสุด** | ~1/วัน |
| 16 | = lv15 (ไม่มี slot ใหม่) | = lv15 | = lv15 | = lv15 | = lv15 | = lv15 |
| 17 | Mass Heal / Power Word Heal (slot9) | สูงสุด 700 HP แบ่งได้ทุกคน หรือฮีลเต็ม 100% ทันทีแบบไม่มีเงื่อนไข | เลือกได้ (กว้างสุด vs การันตีเดี่ยว) | full action | Reactive | ~1/วัน |
| 18 | = lv17 (ไม่มี slot ใหม่ — slot9 คือเพดานสูงสุด) | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 |
| 19 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 |
| 20 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 |

**ข้อค้นพบ**:
1. **รูปแบบ zigzag proactive/reactive**: lv1-4 ผสม → lv5-8 proactive ครองเวที (มูลค่าเกิน slot level ตัวเองมาก) → lv9-14 reactive กลับมา (breadth/magnitude ไล่ทัน) → lv15-16 proactive สูงสุด (Holy Aura) → lv17-20 reactive ปิดท้ายระดับ "แก้ทุกอย่างในคลิกเดียว" — ยืนยันความเชื่อเมต้า 5e ว่า proactive buff ให้มูลค่าเกิน slot level เสมอ ส่วน reactive heal โตแบบเส้นตรงตาม slot level เท่านั้น
2. **Support hard-counter Control ได้โดยตรง** (Freedom of Movement lv7 กัน paralyze/restrain ทั้งหมด, Death Ward กันตายจาก HP=0) — จุดเชื่อมข้าม axis ที่ไม่มีใน Damage/Control เดี่ยวๆ

---

## Survivability Anchor

**ทำไมไม่ใช้ AC เป็นตัวตัดสินหลัก**: AC ส่วนใหญ่มาจาก "เกราะ+DEX" ซึ่งเป็นตัวเลือกอุปกรณ์ที่ผู้เล่นทุกคลาสไล่ตามได้ใกล้เคียงกัน (ไม่ใช่สิ่งที่ class/subclass feature ควบคุมเป็นหลัก) — ใช้เป็นตัวแยกดี/แย่ข้ามคลาสไม่ยุติธรรมเท่า HP pool (ผูกกับ hit die ที่ fix ตาม class จริง) เหมือนที่ Control axis เจอปัญหาเดียวกันกับ DC — เพราะงั้น Anchor นี้ตัด AC ออก ใช้ **HP pool + mitigation ที่มาจาก feature จริง** แทน

5 มิติที่ใช้ประเมิน: **Effective HP** (HP pool จาก **hit die + flat CON mod คงที่ +3 ทุกเลเวล** (ใช้กติกา fixed-HP ของ PHB คือ max die+CON ที่ lv1 แล้ว +ค่าเฉลี่ยปัดขึ้น+CON ทุกเลเวลถัดไป — ไม่ track ASI progression เหมือน Damage axis) d8 เป็นค่ากลาง — Sorcerer/Wizard d6 และ Fighter/Paladin/Ranger d10 / Barbarian d12 คือ deviation ที่ไปตัดสินระดับ Class Baseline) / **Mitigation** (resistance/immunity ต่อดาเมจ, temp HP, ลดดาเมจที่โดนหลังโดนตีแล้ว) / **Save Reliability** (จำนวน save proficiency + bonus ที่ให้ตัวเอง/ปาร์ตี้ + reroll/auto-fix เมื่อ save พลาด) / **Debuff/Condition Resistance** (ต้าน/หลุด condition ที่ไม่ใช่ดาเมจโดยตรง เช่น Paralyzed, Frightened, Charmed) / **Death Prevention** (self-heal ในคอมแบต, cheat-death, กันตกเลข 0 ซ้ำ)

ยืนยันจาก `classFeature` จริงในไฟล์ `src/data/5etools/official/class/class-*.json` (XPHB):

**หมายเหตุการอ่านตาราง**: Effective HP คำนวณทุกเลเวล (สูตร fixed-HP: lv1=max die+CON+3, เลเวลถัดไป +ค่าเฉลี่ยปัดขึ้น+CON+3) เพราะโตทุกเลเวลจริง — ส่วนอีก 4 มิติ (Mitigation/Save Reliability/Debuff Resistance/Death Prevention) carry-forward จนกว่าจะถึง milestone feature จริงของคลาสใดคลาสหนึ่ง

⚠️ **สำคัญ — peer standard ของ 4 มิตินี้ (ไม่รวม Effective HP) คือ D (ไม่มีเลย) เกือบตลอดทั้งตาราง ไม่ใช่ feature ของคลาสที่ยกตัวอย่างไว้**: Mitigation/Debuff Resistance/Death Prevention กระจุกอยู่ที่คลาสเดียวต่อจุด (Uncanny Dodge=Rogue เท่านั้น, Relentless Rage=Barbarian เท่านั้น, Disciplined Survivor/Superior Defense=Monk เท่านั้น, Indomitable=Fighter เท่านั้น) — ตามนิยาม Grading Scale เอง "B = ตรงกับ peer standard (ค่ากลาง)" ถ้าเอา feature เฉพาะคลาสมาแปะเป็นค่าในตารางตรงๆ จะกลายเป็นว่าไม่มีคลาสไหนนอกจากเจ้าของ feature ที่ "B" ได้เลยในมิตินั้น ซึ่งขัดกับนิยาม peer/median — **ชื่อคลาสที่อ้างในแต่ละ cell ด้านล่างเป็น "ตัวอย่างเพดาน" สำหรับ calibrate C/B/A/S เผื่อคลาสอื่นมีอะไรใกล้เคียง ไม่ใช่ค่าที่ทุกคลาสควรมี** — คลาสที่ไม่มีกลไกใดๆ ในมิตินั้นเลย (คือส่วนใหญ่ รวม full caster เกือบทั้งหมด) ให้ **D** ตรงไปตรงมาตาม Grading Scale โดยไม่ต้องเทียบกับชื่อคลาสที่ยกตัวอย่างไว้

| Lv | Feature อ้างอิง (คลาส) | Effective HP (d8 + flat CON+3) | Mitigation | Save Reliability | Debuff/Condition Resistance | Death Prevention |
|---|---|---|---|---|---|---|
| 1 | Rage (Barbarian) / Second Wind (Fighter) | **11** | **ปกติ = 0** ที่ peer-standard — Barbarian Rage (resist B/P/S dmg) เป็น outlier ตั้งแต่ lv1 | 2 save prof (baseline ทุกคลาส) | ไม่มีที่ peer-standard | ไม่มีที่ peer-standard — Second Wind (1d10+lv, bonus action) เป็น outlier |
| 2 | = lv1 (ไม่มีจุดเปลี่ยน) | **19** | = lv1 | = lv1 | = lv1 | = lv1 |
| 3 | = lv1 | **27** | = lv1 | = lv1 | = lv1 | = lv1 |
| 4 | = lv1 | **35** | = lv1 | = lv1 | = lv1 | = lv1 |
| 5 | Uncanny Dodge (Rogue) | **43** | **ตัวอย่างเพดาน ไม่ใช่ peer standard** — Uncanny Dodge (Rogue เท่านั้น, reaction ลดดาเมจครึ่งนึง 1 ครั้ง/เทิร์น) — peer standard ยังคง D (0) เหมือนเดิมสำหรับคลาสอื่นทั้งหมด | = lv1 | = lv1 | = lv1 |
| 6 | Aura of Protection (Paladin) | **51** | = lv5 | **จุดเปลี่ยน** — Aura of Protection (Paladin): +CHA mod ให้ save ทุกตัว ตัวเอง+ปาร์ตี้ในระยะ 10ft — outlier แรงมาก ไม่ใช่ peer-standard | = lv1 | = lv1 |
| 7 | Evasion (Rogue / Monk) | **59** | = lv5 | = lv6 | **ตัวอย่างเพดาน ไม่ใช่ peer standard** — Evasion (Rogue/Monk เท่านั้น): DEX-save AoE พลาด=โดนครึ่ง, ผ่าน=ไม่โดนเลย — กันดาเมจได้ไม่ใช่กัน condition ตรงๆ แต่ผลลัพธ์เทียบเท่า, คลาสอื่นยังคง D | = lv1 |
| 8 | = lv7 (ไม่มีจุดเปลี่ยน) | **67** | = lv5 | = lv6 | = lv7 | = lv1 |
| 9 | Indomitable (Fighter) | **75** | **ตัวอย่างเพดาน ไม่ใช่ peer standard** — Indomitable (Fighter เท่านั้น, reroll save พลาดได้ **พร้อมบวก Fighter level เข้าไปในการทอยใหม่ด้วย** — ยืนยันจาก `class-fighter.json` XPHB: "reroll it with a bonus equal to your Fighter level", แรงกว่า plain reroll ของปี 2014) นับเป็น mitigation ทางอ้อมสำหรับ Fighter เท่านั้น คลาสอื่นยังคง D | = lv6 | = lv7 | = lv1 |
| 10 | = lv9 (ไม่มีจุดเปลี่ยน) | **83** | = lv9 | = lv6 | = lv7 | = lv1 |
| 11 | Relentless Rage (Barbarian) | **91** | = lv9 | = lv6 | = lv7 | **ตัวอย่างเพดาน ไม่ใช่ peer standard** — Relentless Rage (Barbarian เท่านั้น): ตก 0 HP ระหว่าง Rage → CON save DC10 ไม่ตาย ฟื้นเป็น 2×level HP แทน (cheat-death จริงจังตัวแรกในตาราง แต่เฉพาะ Barbarian) คลาสอื่นยังคง D |
| 12 | = lv11 (ไม่มีจุดเปลี่ยน) | **99** | = lv9 | = lv6 | = lv7 | = lv11 |
| 13 | Indomitable ใช้ได้ 2 ครั้ง (Fighter) | **107** | = lv9 | = lv6 | = lv7 | **ตัวอย่างเพดาน (Fighter เท่านั้น)** — Indomitable เพิ่มเป็น 2 ครั้ง/long rest |
| 14 | Disciplined Survivor (Monk) | **115** | = lv9 | **ตัวอย่างเพดาน ไม่ใช่ peer standard** — Disciplined Survivor (Monk เท่านั้น): proficiency **ทุก saving throw** + reroll ด้วย Focus Point เมื่อพลาด — กระโดดจาก 2 prof ไปเป็นครบทุกตัวในก้าวเดียว แต่เฉพาะ Monk เท่านั้น peer standard คลาสอื่นยังคง 2 prof เดิม | = lv7 | = lv13 |
| 15 | = lv14 (ไม่มีจุดเปลี่ยน) | **123** | = lv9 | = lv14 | = lv7 | = lv13 |
| 16 | = lv14 | **131** | = lv9 | = lv14 | = lv7 | = lv13 |
| 17 | Indomitable ใช้ได้ 3 ครั้ง (Fighter) | **139** | = lv9 | = lv14 | = lv7 | **ตัวอย่างเพดาน (Fighter เท่านั้น)** — Indomitable เพิ่มเป็น 3 ครั้ง/long rest (เพดานของ Fighter ในมิตินี้) |
| 18 | Superior Defense (Monk) | **147** | **ตัวอย่างเพดานของทั้งแกน (Monk เท่านั้น) ไม่ใช่ peer standard** — Superior Defense: จ่าย Focus Point resist **ทุกชนิดดาเมจยกเว้น force** นาน 1 นาที — คลาสอื่นทั้งหมดยังคง D ในมิตินี้ | = lv14 | = lv7 | = lv17 |
| 19 | = lv18 (ไม่มีจุดเปลี่ยน) | **155** | = lv18 | = lv14 | = lv7 | = lv17 |
| 20 | = lv18 | **163** | = lv18 | = lv14 | = lv7 | = lv17 |

**ข้อค้นพบ**:
1. Survivability **ไม่มีมาตรฐานกลางที่ยุติธรรมข้ามทุกคลาสเหมือนกัน** กับ Control — full caster ส่วนใหญ่ (Wizard, Sorcerer นอกเหนือจากใช้สเปลล์ป้องกันตัวเอง) แทบไม่มี structural mitigation/death-prevention feature จาก base class เลย ฟีเจอร์แกนนี้กระจุกอยู่ที่ Barbarian/Rogue/Monk/Fighter/Paladin เท่านั้น — ตาม Grading Scale คลาสที่ไม่มีเลยในมิติ Mitigation/Death Prevention ให้ **D** ตรงๆ ที่ checkpoint นั้น ไม่ใช่ N/A
2. **Save Reliability เป็นเส้นราบยาว ไม่ใช่กราฟไต่ขึ้นแบบ Damage** — ค้าง 2 prof คงที่แทบทั้งอาชีพ มีแค่ 2 จุดกระโดดใหญ่คือ lv6 (Paladin aura) และ lv14 (Monk all-saves) ซึ่งทั้งคู่ผูกกับคลาสเฉพาะ ไม่ใช่ peer-standard สากล
3. lv14 (Disciplined Survivor: prof ทุก save) และ lv18 (Superior Defense: resist ทุกดาเมจยกเว้น force) คือ 2 ฟีเจอร์ defensive ที่แรงที่สุดในเกม ทั้งคู่เป็นของ Monk — ควรถูกนับเป็นตัวอย่างเพดานคะแนน (คล้าย Fighter ใน Damage axis) ไม่ใช่มาตรฐานกลาง
4. Mitigation กับ Death Prevention เชื่อมกับ **resource เฉพาะคลาส** เสมอ (Rage uses, Focus Points, Indomitable uses/Long Rest) — ต่างจาก Support ที่ผูกกับ spell slot สากล ทำให้การเทียบข้ามคลาสต้องดู "ทำได้กี่ครั้ง/วัน" ควบคู่ไปกับ "แรงแค่ไหน" เสมอ
5. Effective HP คำนวณจาก hit die + **flat CON mod คงที่ +3 ทุกเลเวล** (กติกา fixed-HP ของ PHB: max+CON ที่ lv1 + ค่าเฉลี่ยปัดขึ้น+CON ทุกเลเวลถัดไป) — ไม่ track ASI progression เหมือนที่ Damage axis เปลี่ยนมาใช้ (ดู Damage Anchor finding ข้อ 3) ทำให้ full caster ที่ปกติทุ่ม CON เป็นสเตตรองยังได้ +3 เท่ากับทุกคลาส ไม่ถูกลงโทษซ้ำสองจากทั้ง d6 เตี้ยกว่าและ mod ที่สมมติไว้ต่างกัน

---

## Action Economy Anchor

**ขอบเขต**: แกนนี้วัด "ได้มูลค่ามากกว่า 1 action + 1 reaction (opportunity attack) มาตรฐานแค่ไหนต่อรอบ" — ครอบคลุม Bonus Action / Reaction / extra action เต็มรูปแบบ / การแปลง resource เป็น action พิเศษ ไม่นับ DPR (อยู่ใน Damage แล้ว) แต่นับ "การบีบมูลค่าให้ได้มากกว่า 1 การกระทำ/เทิร์น"

5 มิติที่ใช้ประเมิน: **Bonus Action Value** (ทำอะไรได้ด้วย bonus action, บ่อยแค่ไหน, ต้นทุนเท่าไหร่) / **Reaction Value** (เกินกว่า opportunity attack ปกติ) / **Extra Action Access** (ได้ action เต็มเพิ่มทั้งเทิร์น — magnitude+frequency) / **Resource-to-Action Conversion** (จ่าย resource แลกบีบ 2 อย่างในเทิร์นเดียว) / **Attack-Action Efficiency** (1 action ได้กี่ attack — Extra Attack แบบ Damage axis แต่มองมุม "ความคุ้มต่อ action" แทน DPR)

ยืนยันจาก `classFeature`/`optionalfeature` จริงในไฟล์ `class-*.json` และ `optionalfeatures.json` (XPHB):

**หมายเหตุการอ่านตาราง**: milestone กระจายไม่สม่ำเสมอ (lv2 กระจุกหนักสุด) จึงมีหลาย column ที่ carry-forward จาก "จุดอ้างอิงล่าสุดของ column นั้น" ไม่ใช่จาก lv ก่อนหน้าเสมอไป — อ่าน "= lvN" ว่าอ้างอิงถึง column เดียวกันที่ lvN

| Lv | Feature อ้างอิง (คลาส) | Bonus Action Value | Reaction Value | Extra Action Access | Resource-to-Action Conversion | Attack-Action Efficiency |
|---|---|---|---|---|---|---|
| 1 | Rage (Barbarian) — outlier เดียว ณ lv1 | **ปกติ = ไม่มี** ที่ peer-standard (ยังไม่มี feature ให้ bonus action ทำอะไร) — ⚠️ Barbarian Rage เข้าด้วย bonus action ตั้งแต่ lv1 เป็น outlier แรกสุดในตาราง (แม้ตัว Rage เองจะนับผลเป็น Damage/Survivability buff ไม่ใช่ "การกระทำ" เพิ่มก็ตาม การใช้ bonus action ฟรีเพื่อเปิดผลนั้นยังนับเป็นมูลค่า Action Economy) | มีแค่ opportunity attack มาตรฐาน | ไม่มี | ไม่มี | 1 attack/action (มาตรฐาน) |
| 2 | Cunning Action (Rogue) / Flurry of Blows (Monk) / Action Surge (Fighter) / Metamagic (Sorcerer) | **จุดเปลี่ยนใหญ่ที่สุดของแกนนี้** — Cunning Action (Dash/Disengage/Hide ฟรีเป็น bonus action ไม่จำกัดครั้ง), Flurry of Blows (จ่าย 1 Focus Point แลก 2 unarmed strike เป็น bonus action) | = lv1 (ไม่มีเพิ่ม) | **Action Surge** (Fighter): action เต็มเพิ่มอีก 1 ครั้ง/short rest — outlier แรงสุดในตาราง | **Metamagic** (Sorcerer): เลือก option ได้ 2 ตัว รวม Quickened Spell (จ่าย 2 Sorcery Points เปลี่ยนสเปลล์ action→bonus action ได้ แต่ห้าม cast สเปลล์ level 1+ action ซ้ำในเทิร์นเดียวกัน — กติกาจริงจากไฟล์ยืนยันข้อจำกัดนี้) | = lv1 |
| 3 | Steady Aim (Rogue) / Riposte (Battle Master maneuver, Fighter subclass gate) | Steady Aim: bonus action แลก advantage โจมตีครั้งถัดไป แต่ต้อง speed=0 (trade-off ชัดเจน) | **Riposte** (Battle Master เท่านั้น): ศัตรู melee พลาดใส่เรา → reaction โจมตีสวนได้ (จ่าย Superiority Die) — subclass-locked ไม่ใช่ peer-standard | = lv2 | = lv2 | = lv1 |
| 4 | = lv3 (ไม่มีจุดเปลี่ยน) | = lv3 | = lv3 | = lv2 | = lv2 | = lv1 |
| 5 | Extra Attack (มาร์เชียลทุกคลาส) | = lv3 | = lv3 | = lv2 | = lv2 | **จุดเปลี่ยน** — 1 action = 2 attacks (caster ไม่มีมิตินี้เลยเชิงโครงสร้าง) |
| 6 | = lv5 (ไม่มีจุดเปลี่ยน) | = lv3 | = lv3 | = lv2 | = lv2 | = lv5 |
| 7 | = lv5 | = lv3 | = lv3 | = lv2 | = lv2 | = lv5 |
| 8 | = lv5 | = lv3 | = lv3 | = lv2 | = lv2 | = lv5 |
| 9 | = lv5 | = lv3 | = lv3 | = lv2 | = lv2 | = lv5 |
| 10 | Metamagic (Sorcerer, ชุดที่ 2) | = lv3 | = lv3 | = lv2 | Metamagic options เพิ่มอีก 2 ตัว (breadth ของการแปลง resource กว้างขึ้น) | = lv5 |
| 11 | Two Extra Attacks (Fighter) | = lv3 | = lv3 | = lv2 | = lv10 | **จุดเปลี่ยน** — Fighter แซงมาตรฐาน 2 attacks → 3 attacks/action (outlier ไม่นับ peer-standard) |
| 12 | = lv11 (ไม่มีจุดเปลี่ยน) | = lv3 | = lv3 | = lv2 | = lv10 | = lv11 |
| 13 | = lv11 | = lv3 | = lv3 | = lv2 | = lv10 | = lv11 |
| 14 | = lv11 | = lv3 | = lv3 | = lv2 | = lv10 | = lv11 |
| 15 | = lv11 | = lv3 | = lv3 | = lv2 | = lv10 | = lv11 |
| 16 | = lv11 | = lv3 | = lv3 | = lv2 | = lv10 | = lv11 |
| 17 | Action Surge ครั้งที่ 2 (Fighter) / Metamagic (Sorcerer, ชุดที่ 3) | = lv3 | = lv3 | **เพดานของแกนนี้** — Fighter ใช้ Action Surge ได้ 2 ครั้ง/short rest | Metamagic options ครบชุดสุดท้าย | = lv11 (ยังเป็น 3 attacks — 4th attack ยังไม่มาถึง lv20) |
| 18 | = lv17 (ไม่มีจุดเปลี่ยน) | = lv3 | = lv3 | = lv17 | = lv17 | = lv11 |
| 19 | = lv17 | = lv3 | = lv3 | = lv17 | = lv17 | = lv11 |
| 20 | Three Extra Attacks (Fighter) | = lv3 | = lv3 | = lv17 | = lv17 | **จุดเปลี่ยนสุดท้าย** — Fighter แตะ 4 attacks/action **เฉพาะเลเวลนี้เลเวลเดียว** (outlier สุดขั้ว, เหมือน pattern เดียวกับ Damage axis lv20) |

**ข้อค้นพบ**:
1. **lv2 คือจุดเปลี่ยนใหญ่ที่สุดของแกนนี้ข้ามคลาส** — Cunning Action/Flurry of Blows/Action Surge/Metamagic ทั้ง 4 คลาสต่างกันกระจุกที่เลเวลเดียวกันพอดี ต่างจาก Damage(lv5)/Control(lv3-5)/Support(lv1)/Survivability(กระจาย) ที่แต่ละแกนมีจุดเปลี่ยนของตัวเอง
2. Full caster ได้มูลค่า Action Economy ผ่าน **Metamagic (จ่าย resource)** เป็นหลัก ไม่ใช่ feature ฟรี — sourcery points เป็น resource-gate เหมือน Focus Point/Superiority Die ของแกน Survivability (pattern เดียวกันข้ามแกน: full caster ไม่มีของฟรี ต้องแลก resource เสมอ)
3. **Reaction Value เป็นมิติที่อ่อนที่สุด** — เกือบทุกคลาสค้างที่ opportunity attack มาตรฐานตลอดอาชีพ ของเสริม (Riposte) ผูกกับ subclass เฉพาะ (Battle Master) ไม่ใช่ base class ใดๆ เลย — ไม่มี peer-standard กลางให้เทียบ ต้องประเมินเป็นรายคลาส/subclass
4. Attack-Action Efficiency ซ้ำเงื่อนไขกับ Damage axis (Extra Attack lv5, Fighter outlier lv11/20) โดยเจตนา — แต่ตัดสินคนละมุม (Damage วัด "ได้ดาเมจเท่าไหร่" ส่วนแกนนี้วัด "ได้ความคุ้มต่อ 1 action เท่าไหร่") ไม่ถือเป็นการนับซ้ำคะแนน เพราะอยู่คนละ axis ในระบบ 7-axis

---

## Utility Anchor

**ขอบเขต**: แกนนี้วัดการแก้ปัญหานอกคอมแบต (exploration/social/information) — แยกเป็น 3 สายจริง: **Reveal Info** (สเปลล์เปิดเผยข้อมูล), **Solve Problem** (สเปลล์แก้ปัญหาสิ่งแวดล้อม/การเดินทาง), และ **Skill-Check Layer** (ไม่ใช่สเปลล์เลย — Expertise/Jack of All Trades/Reliable Talent) ซึ่งสายที่ 3 นี้สำคัญมากเพราะเป็นช่องทางเดียวที่ non-caster (โดยเฉพาะ Rogue) ได้คะแนนแกนนี้อย่างจริงจัง

5 มิติที่ใช้ประเมิน: **Magnitude** (แก้ปัญหาสมบูรณ์แค่ไหน — ให้ข้อมูลเริ่มต้น vs แก้เบ็ดเสร็จ) / **Breadth** (ครอบคลุมกี่ประเภทปัญหา) / **Reliability** (auto-success ไม่มี save/check vs มีโอกาสพลาด/ถูกต้าน) / **Access Cost** (ritual = free ไม่จำกัดครั้งแต่เสียเวลา vs เสีย spell slot จำกัด/วัน vs class feature ฟรีตลอด) / **Skill-Check Layer** (Expertise ฯลฯ ที่ให้ผลเป็นตัวคูณ proficiency ไม่ใช่สเปลล์)

ยืนยันจาก `classFeature` จริงในไฟล์ `class-*.json` และ spell text จริงใน `spells-xphb.json` (XPHB) — ใช้ band เดียวกับ Control/Support (ผูกกับ spell-slot level 1,3,5,7,9,11,13,15,17) เพื่อให้เทียบข้ามแกนได้ง่าย:

**หมายเหตุการอ่านตาราง**: Magnitude/Breadth/Reliability/Access Cost ผูกกับ slot level (เลเวลคี่) เหมือน Control/Support แต่ **Skill-Check Layer มี milestone ของตัวเองแยกต่างหาก** (Rogue lv1/lv6, Bard lv2/lv9, Ranger lv9) ซึ่งไม่ตรงกับ slot cadence เสมอไป — ต้องอ่าน 2 จังหวะแยกกัน

| Lv | Feature/Spell อ้างอิง (slot) | Magnitude | Breadth | Reliability | Access Cost | Skill-Check Layer |
|---|---|---|---|---|---|---|
| 1 | Detect Magic / Comprehend Languages / Identify (slot1, ทั้งหมด ritual) + Ritual Adept (Wizard) + **Expertise (Rogue)** | ให้ข้อมูลเริ่มต้นเท่านั้น (มีเวทมนตร์ไหม/แปลภาษาไหม/ของนี้คืออะไร) ไม่แก้ปัญหาใหญ่ | แคบ — แต่ละสเปลล์คลุมเรื่องเดียว | **auto-success** ไม่มี save | **ritual = ไม่เสีย slot เลย** เสียแค่เวลา cast +10 นาที (จำกัดนอกคอมแบต) — Ritual Adept ทำให้ Wizard cast ได้แม้ไม่เตรียม | **จุดเปลี่ยนแรก** — Rogue Expertise (×2 skill) |
| 2 | + Expertise + Jack of All Trades (Bard) | = lv1 | = lv1 | = lv1 | = lv1 | **จุดเปลี่ยน** — Bard Expertise (×2) + Jack of All Trades (ครึ่ง prof ให้ทุก skill ที่ไม่ชำนาญ) |
| 3 | Knock (slot2) | แก้ปัญหาเฉพาะจุดเบ็ดเสร็จ (ล็อก/โซ่ใดๆ เปิด/พังทันที ไม่ต้องทอย check) | แคบมาก (เฉพาะของถูกล็อก) | auto-success | เสีย slot จริง จำกัดครั้ง/วัน | = lv2 |
| 4 | = lv3 (ไม่มี slot ใหม่) | = lv3 | = lv3 | = lv3 | = lv3 | = lv2 |
| 5 | Clairvoyance / Tongues / Water Breathing (slot3) | Water Breathing แก้ปัญหาสิ่งแวดล้อมเบ็ดเสร็จ (หายใจใต้น้ำทั้งปาร์ตี้ 24ชม.), Tongues แก้ปัญหาภาษาทุกภาษา | กว้างขึ้น (ครอบคลุมทั้งปาร์ตี้) | auto-success | เสีย slot | = lv2 |
| 6 | + Expertise รอบ 2 (Rogue) | = lv5 | = lv5 | = lv5 | = lv5 | **จุดเปลี่ยน** — Rogue สะสม Expertise ครบ 4 skill — นำหน้าเรื่อง skill utility |
| 7 | Divination (slot4) + **Reliable Talent (Rogue)** | Divination ถามคำถามได้คำตอบจริงจาก deity | เฉพาะทาง (หาข้อมูล/หาเป้าหมาย) | Divination มีโอกาสคำตอบกำกวม/ไม่สมบูรณ์ — **ไม่ auto-success 100%** ตัวแรกในตาราง | slot, ปกติ 1/long rest | **จุดเปลี่ยน** — Reliable Talent: d20 ที่ทอยได้ ≤9 ในสกิล/tool ที่ชำนาญ นับเป็น 10 — กันพลาดขั้นต่ำแทบทุก check |
| 8 | = lv7 (ไม่มี slot ใหม่) | = lv7 | = lv7 | = lv7 | = lv7 | = lv7 |
| 9 | Legend Lore / Scrying / Teleportation Circle (slot5) + Expertise รอบ 2 (Bard) / Expertise (Ranger) | **จุดเปลี่ยนใหญ่ที่สุดของแกนนี้** — Legend Lore รู้ประวัติ/จุดสำคัญของสิ่งใดก็ได้แทบไม่จำกัด, Teleportation Circle ข้ามทวีปได้ทันที (ต้องมีวงกลมปลายทาง) | กว้างมาก — ครอบคลุมข้อมูล/เดินทาง/สอดแนม 3 ปัญหาต่างกันพร้อมกัน | Legend Lore auto-success, Scrying มี WIS save ต้านได้ (ไม่ auto เสมอไป) | slot | **จุดเปลี่ยน** — Bard/Ranger ตามทัน Rogue ด้วย Expertise รอบใหม่ |
| 10 | = lv9 (ไม่มี slot ใหม่) | = lv9 | = lv9 | = lv9 | = lv9 | = lv9 |
| 11 | True Seeing (slot6) | มองทะลุ illusion/invisible/shapechange/Ethereal ทั้งหมด 120ft นาน 1ชม. — แก้ปัญหา "มองไม่เห็นความจริง" เบ็ดเสร็จ | กว้าง (คลุมหลายประเภทการซ่อนตัวพร้อมกัน) | auto-success | slot | = lv9 (คงที่) |
| 12 | = lv11 (ไม่มี slot ใหม่) | = lv11 | = lv11 | = lv11 | = lv11 | = lv9 |
| 13 | Teleport / Plane Shift (slot7) | **เพดานการเดินทาง** — ไปไหนก็ได้บนระนาบเดียวกันแทบไม่จำกัดระยะ, Plane Shift ข้ามมิติได้ทั้งปาร์ตี้ | กว้างที่สุดในหมวดเดินทาง | Teleport มี % โอกาสคลาดเคลื่อนถ้าไม่คุ้นสถานที่ปลายทาง (ไม่ auto สมบูรณ์) | slot | = lv9 (คงที่) |
| 14 | = lv13 (ไม่มี slot ใหม่) | = lv13 | = lv13 | = lv13 | = lv13 | = lv9 |
| 15 | Mind Blank (slot8) | ป้องกัน divination/mind-reading/charm ทั้งหมด 24ชม. — utility เชิงป้องกันข้อมูล ไม่ใช่แก้ปัญหาเดินทาง/หาข้อมูล | แคบ (จุดประสงค์เดียว) แต่สมบูรณ์แบบ (กันได้แม้ effect ระดับ wish) | auto-success (ตัวเองยินยอมรับผล) | slot | = lv9 (คงที่) |
| 16 | = lv15 (ไม่มี slot ใหม่) | = lv15 | = lv15 | = lv15 | = lv15 | = lv9 |
| 17 | Wish (slot9) | **เพดานสูงสุดทั้งเกม** — จำลองสเปลล์ระดับ8ลงมาได้ทุกตัวไม่มีเงื่อนไข หรือขอ effect กำหนดเอง (DM adjudicate) | **ไม่จำกัด** — สเปลล์เดียวในเกมที่ breadth ไม่มีขอบเขต | การขอ effect กำหนดเองมีความเสี่ยง (โอกาสเสีย stress จน cast Wish ไม่ได้อีก) — auto-success เฉพาะกรณี duplicate สเปลล์ระดับ8ลงมา | 1/long rest เท่านั้น (ทุ่มสุดตัว) | = lv9 (คงที่) |
| 18 | = lv17 (ไม่มี slot ใหม่ — slot9 คือเพดานสูงสุด) | = lv17 | = lv17 | = lv17 | = lv17 | = lv9 |
| 19 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 | = lv9 |
| 20 | = lv17 | = lv17 | = lv17 | = lv17 | = lv17 | = lv9 |

**ข้อค้นพบ**:
1. Utility แยกเป็น **3 สายจริง** (Reveal Info / Solve Problem / Skill-Check Layer) ต่างจาก 5 axis ก่อนหน้าที่มีสายเดียวเด่นชัด — non-caster (โดยเฉพาะ Rogue) พึ่งสายที่ 3 เกือบทั้งหมด ขณะ full caster ได้ทั้ง 3 สายพร้อมกัน
2. **Rogue เป็น "Utility specialist ที่ไม่มีสเปลล์" ตัวจริง** — ได้ Expertise 2 รอบ (lv1, lv6) + Reliable Talent (lv7) นำหน้า full caster ไปก่อน จน Bard/Ranger เพิ่งตามทันด้วย Expertise รอบ 2 ที่ lv9 — พิสูจน์ว่า skill-based utility ไม่ได้ด้อยกว่า spell-based เชิงโครงสร้าง เป็นแค่รูปแบบต่างกัน (deterministic bonus ทุก check vs สเปลล์ทรงพลังเฉพาะจุด)
3. lv9-10 (Legend Lore/Scrying/Teleportation Circle) คือจุดเปลี่ยนใหญ่สุดของแกนนี้ — full-caster utility กว้างสุดหลายมิติพร้อมกัน คล้ายที่ Control/Support ก็มีจุดพีคช่วง mid-tier เหมือนกัน
4. **Ritual tag คือมิติ Access Cost ที่ไม่มีในแกนอื่น** — สเปลล์ tier1 (Detect Magic ฯลฯ) cast ได้ไม่จำกัดครั้ง/วันถ้ามีเวลา 10 นาที ไม่เคย "หมด" เหมือนสเปลล์ปกติ — ไม่มี "ritual CC" หรือ "ritual heal" เทียบเท่าในแกน Control/Support เลย

---

## Versatility Anchor

**ขอบเขต**: ระบบเดิม ([00-scorecard-methodology.md](00-scorecard-methodology.md)) นิยาม Versatility ว่า "ใช้ได้ทุกสถานการณ์/ทุกช่วงเลเวล ไม่ผูก build ตายตัว" — ในระบบ level-indexed ส่วน "ทุกช่วงเลเวล" ถูกจัดการโดยโครงสร้าง 20 แถวอยู่แล้ว เหลือแค่ "ทุกสถานการณ์ ณ เลเวลนั้นๆ" ให้วัด: **ยืดหยุ่นสลับแผนได้แค่ไหนโดยไม่ต้องเปลี่ยน build/multiclass**

5 มิติที่ใช้ประเมิน: **Loadout Flexibility** (สลับสเปลล์ที่เตรียมได้บ่อยแค่ไหน) / **Resource Fungibility** (1 resource pool ใช้ซื้อผลลัพธ์ต่างประเภทกันได้ไหม) / **Cross-Axis Coverage** (kit ครอบคลุมกี่ axis จาก 6 axis อื่นพร้อมกัน ณ เลเวลนั้น — อ้างอิงย้อนไปยัง milestone ที่บันทึกไว้แล้วในแต่ละ Anchor ด้านบน) / **Target-Type Coverage** (มีทั้ง single-target และ AoE ให้เลือกในคราวเดียวไหม) / **Adaptability Under Pressure** (ปรับแผนกลางคอมแบตได้ทันทีไหม หรือทำ routine เดิมซ้ำทุกเทิร์น)

ยืนยันจาก `classFeature` จริงในไฟล์ `class-*.json` (XPHB) — โดยเฉพาะ **มิติ Loadout Flexibility ยืนยันจาก text "Changing Your Prepared Spells" ของทุกคลาส** พบ 2024 เปลี่ยนศัพท์ทุกคลาสเป็น "Prepared Spells" เหมือนกันหมด แต่กลไกจริงยังต่างกัน 3 ระดับ:

| ระดับ | คลาส | กลไกจริง |
|---|---|---|
| **สูง** — สลับได้เต็มทุก Long Rest | Wizard, Cleric, Druid, **Artificer** | "เปลี่ยนสเปลล์ในลิสต์กี่ตัวก็ได้" ทุกครั้งที่จบ Long Rest |
| **กลาง** — สลับ 1 ตัวได้ทุก Long Rest | Paladin, Ranger | "เปลี่ยนได้ 1 สเปลล์" แต่ทำได้ทุกครั้งที่จบ Long Rest |
| **ต่ำ** — สลับ 1 ตัวได้เฉพาะตอนเลเวลอัพ | Sorcerer, Bard, Warlock | "เปลี่ยนได้ 1 สเปลล์" เฉพาะตอนได้เลเวลใหม่เท่านั้น |

⚠️ **แก้ไข 2026-08-14**: Artificer เคยถูกมองข้ามจากตารางนี้เพราะเข้าใจผิดว่า "ไม่มี XPHB reprint" — เช็คไฟล์จริงแล้วพบว่า Artificer มี source `EFA` ("Eberron: Forge of the Artificer") ซึ่งเป็นอัปเดตถ้อยคำสไตล์ 2024 เต็มรูปแบบ (`class-artificer.json`, feature "Changing Your Prepared Spells": *"Whenever you finish a Long Rest, you can change your list of prepared spells, replacing any of the spells there with other Artificer spells for which you have spell slots"* — คำเดียวกับ Wizard/Cleric/Druid เป๊ะ) Artificer จึงไม่ใช่คลาส 2014-only และต้องนับรวมในชั้น 1 (30 Class Baseline) เหมือนคลาสอื่น ไม่ใช่ข้อยกเว้น

**หมายเหตุการอ่านตาราง**: Loadout Flexibility คงที่ทั้ง 20 แถวตามที่ finding #1 ระบุ (เขียน "= lv1" ทุกแถวเพื่อยืนยันว่าพิจารณาแล้ว ไม่ใช่ column ที่ถูกลืม) — 4 มิติที่เหลือมี milestone กระจายตามแต่ละคลาส

| Lv | Feature/Mechanic อ้างอิง | Loadout Flexibility | Resource Fungibility | Cross-Axis Coverage | Target-Type Coverage | Adaptability Under Pressure |
|---|---|---|---|---|---|---|
| 1 | Prepared Spells (ทุก full caster) | **กำหนด tier ตั้งแต่ lv1 คงที่ตลอดอาชีพ** (ดูตาราง 3 ระดับด้านบน) — มาร์เชียลไม่มีสเปลล์ = **D (ต่ำสุด)** ตาม Grading Scale (ไม่มีกลไกที่เกี่ยวข้องเลย ไม่ใช่ N/A) | ยังไม่มี (Focus Points/Sorcery Points/Channel Divinity ทั้งหมดเริ่ม lv2) | peer-standard ~1-2 axis (Damage หลัก + Support เล็กน้อยถ้ามี cantrip) | full caster มีทั้ง single (Fire Bolt) และ AoE (Burning Hands, slot1) ตั้งแต่ lv1; มาร์เชียล single-target ล้วน | full caster เลือกสเปลล์ต่อเทิร์นได้อิสระ; มาร์เชียลทำ attack routine เดิมซ้ำทุกเทิร์น |
| 2 | Monk's Focus (Monk) / Font of Magic (Sorcerer) / Channel Divinity (Cleric) | = lv1 | **จุดเปลี่ยนใหญ่สุดของแกนนี้ คู่ขนานกับ lv2 ของ Action Economy** — Focus Point เดียวซื้อ Flurry of Blows(Damage)/Patient Defense(Survivability)/Step of the Wind(Utility) ได้; Sorcery Point แปลงเป็น spell slot ได้ทั้งสองทาง; Channel Divinity เลือก Divine Spark(Damage) หรือ Turn Undead(Control) จาก resource เดียว | กระโดดขึ้นทันที (1 resource → หลาย axis พร้อมกัน ตามตัวอย่างซ้าย) | = lv1 | เพิ่มขึ้นตามจำนวนตัวเลือก resource ใหม่ |
| 3 | subclass gate (ส่วนใหญ่) | = lv1 | เมนูคงที่จาก lv2 (จำนวน point เพิ่ม แต่ตัวเลือกเท่าเดิมจนถึง milestone ถัดไป) | = lv2 | = lv1 | = lv2 |
| 4 | = lv3 (ไม่มีจุดเปลี่ยน) | = lv1 | = lv3 | = lv2 | = lv1 | = lv2 |
| 5 | Extra Attack (มาร์เชียล) / slot3 AoE (caster) / **Stunning Strike (Monk)** | = lv1 | **จุดเปลี่ยน** — Stunning Strike (Monk, lv5): จ่าย 1 Focus Point แลก Stunned condition ตรงๆ — Damage-resource ซื้อผล Control-axis ได้ตรงตัว ตัวอย่าง fungibility ชัดที่สุดในตาราง (ยืนยันจาก `class-monk.json`) | **จุดเปลี่ยน** — กว้างขึ้นตามที่แต่ละ axis ปลดล็อกฟีเจอร์ใหม่ (Damage lv5 Extra Attack, Control lv5 Hypnotic Pattern, Support lv5 Beacon/Haste) — full caster เริ่มมีของครบเกือบทุก axis พร้อมกัน | caster ได้ AoE ใหญ่ขึ้น (Fireball-tier); มาร์เชียลยังคง single-target เว้นมี subclass เสริม | full caster เลือก option ได้กว้างขึ้นตามจำนวน slot/point |
| 6 | = lv5 (ไม่มีจุดเปลี่ยนต่อ Versatility — Monk ได้ Empowered Strikes ที่ lv6 แต่เช็คไฟล์จริงแล้วเป็น feature ฟรีไม่ผูก Focus Point เลย ไม่ใช่ fungibility milestone ตามที่เคยเข้าใจผิดไว้ก่อนหน้า — subclass feature gate ที่ lv6 ถูกนับรวมในหลักการ "subclass gate" ทั่วไปแล้ว) | = lv1 | = lv5 | = lv5 | = lv5 | = lv5 |
| 7 | = lv5 (ไม่มีจุดเปลี่ยน) | = lv1 | = lv5 | = lv5 | = lv5 | = lv5 |
| 8 | = lv5 | = lv1 | = lv5 | = lv5 | = lv5 | = lv5 |
| 9 | = lv5 | = lv1 | = lv5 | = lv5 | = lv5 | = lv5 |
| 10 | Metamagic รอบ 2 (Sorcerer) / Self-Restoration (Monk) | = lv1 | **จุดเปลี่ยน** — เมนูเพิ่มอีกรอบ (Channel Divinity ได้ตัวเลือกใหม่ตามเลเวลคู่ขนาน) | = lv5 | = lv5 | = lv5 |
| 11 | = lv10 (ไม่มีจุดเปลี่ยน) | = lv1 | = lv10 | full caster ครอบคลุมเกือบครบ 5-6 axis พร้อมกัน (Damage/Control/Support/Survivability/Utility ล้วนมีของใช้แล้ว) | = lv5 | = lv5 |
| 12 | = lv10 | = lv1 | = lv10 | = lv11 | = lv5 | = lv5 |
| 13 | Deflect Energy (Monk) | = lv1 | **จุดเปลี่ยน** — เมนูเพิ่มอีกรอบ | = lv11 | = lv5 | = lv5 |
| 14 | = lv13 (ไม่มีจุดเปลี่ยน) | = lv1 | = lv13 | = lv11 | = lv5 | = lv5 |
| 15 | = lv13 | = lv1 | = lv13 | = lv11 | = lv5 | = lv5 |
| 16 | = lv13 | = lv1 | = lv13 | = lv11 | = lv5 | = lv5 |
| 17 | Wish (slot9) | = lv1 | **เพดานของแกนนี้** — Wish จำลองสเปลล์ระดับ8ลงมาได้ทุกตัว = resource ที่ fungible ที่สุดในเกม | full caster ครบเกือบทุก axis พร้อมกันในวันเดียว | = lv5 | **สูงสุด** — Wish ปรับใช้ได้แทบทุกสถานการณ์ที่จินตนาการได้ |
| 18 | Superior Defense (Monk) | = lv1 | เมนูเพิ่มอีกรอบสุดท้าย (Monk resource menu ครบชุด) | = lv17 | = lv5 | = lv17 |
| 19 | = lv18 (ไม่มีจุดเปลี่ยน) | = lv1 | = lv18 | = lv17 | = lv5 | = lv17 |
| 20 | = lv18 | = lv1 | = lv18 | = lv17 | = lv5 | = lv17 |

**ข้อค้นพบ**:
1. **Loadout Flexibility เป็นมิติเดียวในทั้ง 7 axis ที่คงที่ตายตัวตั้งแต่ lv1 ตลอดอาชีพ ไม่มี milestone เปลี่ยนแปลงเลย** — ต่างจากทุกมิติอื่นที่ไต่ระดับไปเรื่อยๆ เป็นตัวบ่งชี้ "สไตล์ของคลาส" มากกว่า "พลังที่เพิ่มขึ้นตามเลเวล" — ยืนยันพบ 3 ระดับจริงจาก text "Changing Your Prepared Spells": full-swap-per-Long-Rest (Wizard/Cleric/Druid) / partial-swap-per-Long-Rest (Paladin/Ranger) / partial-swap-per-level-up (Sorcerer/Bard/Warlock)
2. lv2 คือจุดเปลี่ยนใหญ่สุดของแกนนี้เหมือน Action Economy แต่คนละประเด็น — Action Economy วัด "ได้ action เพิ่มเท่าไหร่", Versatility วัด "1 resource ใช้ได้กี่แบบ" (fungibility ไม่ใช่ปริมาณ)
3. **Versatility เป็น axis เดียวที่อ้างอิงย้อนไปยัง 5 axis ก่อนหน้าโดยตรง** ผ่านมิติ Cross-Axis Coverage — เหตุผลที่ต้องทำเป็น axis สุดท้ายตามลำดับที่วางแผนไว้ เพราะต้องมี anchor อื่นเสร็จก่อนถึงจะนับ coverage ได้จริง
4. มาร์เชียลล้วน (ไม่มีสเปลล์) **ไม่มีมิติ Loadout Flexibility และ Resource Fungibility เลยเชิงโครงสร้าง** → ให้ **D (ต่ำสุด)** ตรงๆ ตาม Grading Scale (2026-08-14: user ยืนยันว่า "ไม่มี" ควรเท่ากับคะแนนต่ำสุด ไม่ใช่ N/A ที่ยกเว้นการให้คะแนน) เว้นแต่มี subclass เสริมทรัพยากร fungible ของตัวเอง (เช่น Battle Master's Superiority Dice) ซึ่งจะดันคะแนนขึ้นจาก D ได้ตามจริง — ประเด็นสำคัญที่ต้องระวังตอนให้คะแนนจริงใน Layer 1/2 อย่าปนกับ "มีมิติแต่คะแนนต่ำ" (นั่นคือ C ไม่ใช่ D)

---

## Next Steps — Anchor Rubric ครบ 7/7 axis แล้ว

1. ✅ Anchor Rubric (ชั้น 0) เสร็จสมบูรณ์ทั้ง 7 axis: Damage, Control, Support, Survivability, Action Economy, Utility, Versatility — แต่ละ axis มี "ตัวตัดสิน" เฉพาะของตัวเอง ไม่ใช่ copy pattern เดียวกันซ้ำ และยืนยันจากไฟล์ข้อมูลจริงทุกจุดสำคัญ
2. เริ่มชั้น 1 (30 Class Baseline level-indexed) — ยังไม่เริ่ม รอ user ยืนยันก่อนเริ่มงานจริง เพราะเป็น scope ใหญ่ (30 คลาส × 20 เลเวล × 7 axis)
3. เริ่มชั้น 2 (478 Subclass overlay level-indexed) — หลังชั้น 1 เสร็จ
