# Alchemist — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 10 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Alchemist](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 10 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24` (Mage Hand Press, 2024 edition ของ Valda's Spire of Secrets)

**⚠️ ข้อจำกัดข้อมูล**: มีเนื้อหา class feature หลักครบ (Bombs, Reagents, Potion Brewing ฯลฯ) แต่ **ไม่มีรายการ Bomb Formula/Discovery แต่ละตัวแบบละเอียด** (อยู่ใน optionalfeature ที่ยังไม่ได้ดึงมาตรวจสอบ) คะแนน Control ด้านล่างจึงเป็น floor แบบระมัดระวังจนกว่าจะมีเนื้อหานั้นมาอ้างอิงเพิ่ม

---

## Class Baseline (Alchemist, 2024)

Floor 0-10 ต่อ axis ของ **Alchemist เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting (ใช้ระบบ Bomb + Reagent แทน), saving throw proficiency Dex + Int, armor proficiency light เท่านั้น, weapon proficiency simple + Bomb, tool proficiency Alchemist's Supplies, Bombs (lv1, สร้างได้ไม่จำกัดจำนวนจริงตามกฎ "as many as needed for the adventuring day"), Potion Brewing (lv1), Reagents (2→6 ต่อวัน), Prime Bomb (lv2), Bomb Formulas (lv2, รู้ 3 ตัว สลับ 1/long rest), Reagent Synthesis (lv2), Discovery (lv5, รู้ 1→4 ตัว), Improved Bombs (lv5), Evasion (lv7), Blast Coating (lv11), Potion Mixologist (lv15), Experimentalist (lv18), Nuclear Bomb + Philosopher's Stone (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Bomb เป็นการโจมตีที่สร้างได้ไม่จำกัดจริงตามกฎ Alchemist's Supplies (ไม่ต้องนับสต็อก) ให้ Intelligent Explosions บวก Int mod เข้าดาเมจ Explode property, Improved Bombs (lv5) ยกดาเมจฐานเป็น 2d10 และ Prime Bomb ให้เพิ่ม 1d10 ต่อ Reagent ที่จ่าย (สเกลตามจำนวน Reagent สูงสุด/เลเวล) — magnitude สูงและ **ใช้ได้ทุกเทิร์นไม่จำกัดจำนวนครั้ง/วัน** ต่างจาก slot-based caster [M:3/4] [R:3/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis นอกเหนือจาก Bomb Formula/Discovery ที่ผู้เล่นเลือกเอง (เนื้อหารายละเอียดไม่มีในไฟล์ data ที่ตรวจสอบได้) — คะแนนนี้เป็น floor แบบระมัดระวัง [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 4/10 (C) | Potion Brewing เข้าถึง healing potion ระดับดี (Potion of Healing → Greater Healing lv4 → Superior Healing lv8) ที่แจกให้ ally ถือไว้ใช้เองได้ แต่สต็อก potion ที่ active พร้อมกันได้จำกัดแค่เท่า Int mod (ต่ำสุด 1) และต้องใช้เวลา brew 10 นาทีล่วงหน้า ไม่ใช่ support แบบทันทีทันควัน [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 4/10 (C) | HD d8 + saving throw proficiency Dex (หลบ AoE ได้บ่อย) เป็นฐานกลางๆ เสริมด้วย Evasion (lv7, save AoE ผ่านไม่โดนดาเมจเลย) และ Blast Coating (lv11, ไม่โดนดาเมจจาก Bomb ตัวเองเลย) แต่ไม่มี resistance/self-heal อื่นติด chassis [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 4/10 (C) | Bomb เป็นการโจมตีมาตรฐาน (ไม่มี free extra attack ติด baseline) Reagent Synthesis (lv2) คืน Reagent เพิ่มตอน short rest แบบไม่กิน action และ Potion Mixologist (lv15) ให้ดื่ม 2 potion พร้อมกันด้วย Bonus Action เดียว แต่ปลดล็อกช้ามาก [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 5/10 (B) | Potion Brewing เข้าถึง potion หลากหลายจาก DMG list (Climbing, Water Breathing, Invisibility, Flying, Giant Strength ฯลฯ) ครอบคลุม exploration niche ได้กว้าง แต่สต็อก potion active พร้อมกันจำกัดแค่เท่า Int mod และต้องมี Reagent เพียงพอ + เวลา brew ล่วงหน้าเสมอ [M:2/4] [R:1/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Bomb Formula (สลับ 1/long rest, สลับได้ทั้งหมดที่ lv18 Experimentalist) ปรับชนิดดาเมจ/เอฟเฟกต์ของ Bomb ได้ตามสถานการณ์ บวก Discovery (1→4 ตัว) และเมนู Potion ที่กว้างมากให้เลือก brew ตามที่ทีมต้องการในแต่ละวัน — resource หลายก้อน (Reagent/Formula/Discovery/Potion) ปรับ role ได้หลากหลายในกรอบ "นักเล่นแร่แปรธาตุ" เดียว [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (10)

**ที่มาข้อมูล**: `subclassFeature` array ใน `Mage Hand Press; Valda's Spire of Secrets - 2024.json` (className=Alchemist) — ทุก subclass source `ValdaSpire24` ยกเว้น Pigmentist/Resonator ที่เป็น `ValdaSpire24Extras`

| Subclass | Overall | Damage | Control | Support | Survivability | Action Economy | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| **Class Baseline** | 7 (A) | 3 (C) | 4 (C) | 4 (C) | 4 (C) | 5 (B) | 6 (B) |
| Amorist | A | 7 (A) | **8 (A)** | 4 (C) | 6 (B) | 5 (B) | **8 (A)** | 6 (B) |
| Apothecary | B | 7 (A) | 3 (C) | **10 (S)** | 4 (C) | 4 (C) | 5 (B) | 6 (B) |
| Dynamo Engineer | A | 8 (A) | 6 (B) | 4 (C) | 4 (C) | 5 (B) | 7 (A) | 8 (A) |
| Mad Bomber | B | **9 (S)** | 3 (C) | 4 (C) | 5 (B) | 4 (C) | 5 (B) | 6 (B) |
| Mutagenist | C | 7 (A) | 3 (C) | 4 (C) | 5 (B) | 4 (C) | 5 (B) | 7 (A) |
| Ooze Rancher | B | 7 (A) | 5 (B) | 4 (C) | 6 (B) | 5 (B) | 5 (B) | 6 (B) |
| Pigmentist | C | 7 (A) | 3 (C) | 4 (C) | 4 (C) | 4 (C) | 6 (B) | 7 (A) |
| Resonator | B | 7 (A) | 4 (C) | 5 (B) | 6 (B) | 4 (C) | 6 (B) | 7 (A) |
| Venomsmith | B | 8 (A) | 3 (C) | 4 (C) | 6 (B) | 6 (B) | 5 (B) | 6 (B) |
| Xenoalchemist | A | 8 (A) | 7 (A) | 4 (C) | 4 (C) | 5 (B) | 6 (B) | 7 (A) |

ไม่มี subclass ตัวไหนต่ำกว่า baseline เลยสักแกน (ไม่มี prerequisite ที่ตัดทอนความสามารถแบบ Sacred Knight)

---

### Amorist — สาย charm/social control

**Overall**: A — Control กระโดดจาก C ไป A (3→8) บวก Utility A (3→8) และ Survivability/Action Economy ขยับเป็น B — control specialist ที่กว้างพอสมควร ไม่มี axis ไหนถึง S


*Pheromone Bomb (AoE Charmed) + Beguiling Perfume (บังคับศัตรูเปลี่ยนเป้า/เสียการโจมตี) + Magnetic Personality (Influence เป็น Bonus Action + เปลี่ยนทัศนคติศัตรู)*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | Pheromone Bomb ไม่ทำดาเมจเลย (แลกเป็น Charmed condition) เป็น formula ทางเลือกที่ไม่ตัด Bomb ปกติออก = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Control | 8/10 (A) | Pheromone Bomb (lv3) บังคับ Wis save ทั้ง AoE ไม่งั้นติด Charmed จนกว่าจะโดนดาเมจ บวก Beguiling Perfume (lv10, passive ตลอดเวลา) บังคับศัตรูที่ตีเราระยะประชิด Wis save ไม่งั้นต้องเปลี่ยนเป้าหรือเสียการโจมตีไปเลย (immune 1 ชม.หลังโดนดาเมจจากเรา) — control 2 ชั้นทั้งรุกและรับ [M:3/4] [R:3/3] [B:2/3] |
| Support | 4/10 (C) | ไม่มี heal/buff ally โดยตรง Magnetic Personality เปลี่ยนทัศนคติศัตรูเป็นประโยชน์ต่อทีมทางอ้อมแต่ไม่ใช่ support ตรงๆ = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Survivability | 6/10 (B) | Beguiling Perfume (lv10) เป็น passive ป้องกันตัวเองระดับสูง — บังคับผู้โจมตีระยะประชิด Wis save ไม่งั้นเสียการโจมตีไปเปล่าๆ ตลอดเวลาไม่เสีย resource เลย [M:3/4] [R:2/3] [B:1/3] |
| Action Economy | 5/10 (B) | Magnetic Personality (lv6) ให้ Influence action เป็น Bonus Action ได้ ประหยัด action ในฉากสังคม [M:2/4] [R:2/3] [B:1/3] |
| Utility | 8/10 (A) | Charmer (Deception+Persuasion prof + Int mod bonus) บวก Magnetic Personality ที่เปลี่ยนทัศนคติศัตรู hostile→indifferent→friendly ได้ตรงๆ เป็นเครื่องมือสังคม/หลีกเลี่ยงคอมแบตที่ทรงพลังมาก [M:3/4] [R:3/3] [B:2/3] |
| Versatility | 6/10 (B) | เจาะจงสาย social/control เต็มตัว ไม่ได้ขยาย role อื่นเพิ่ม = baseline พอดี [M:2/4] [R:2/3] [B:2/3] |

### Apothecary — สาย healer เต็มตัว

**Overall**: B — Support พุ่งเป็น 10/10 (S) เต็มสเกล แต่เป็น axis เดียวที่ขยับเลย อีก 6 axis เท่า baseline หมด — one-trick healer ที่สุดขั้วด้านเดียวจริงๆ


*Painkiller Bomb (AoE temp HP) + Concentrated Healing (potion ฮีลเต็มครึ่งนึง) + Alchemical Resurrection (ชุบชีวิตจริง!) + Miracle Serum*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | Painkiller Bomb แลกดาเมจเป็น temp HP เป็น formula ทางเลือก ไม่ตัด Bomb ปกติออก = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 10/10 (S) | Painkiller Bomb ให้ temp HP เท่า Alchemist level แบบ AoE (ปรับเพิ่มได้ด้วย Prime Bomb), Concentrated Healing (lv6) ให้ potion ฮีลแม็กซ์ครึ่งนึงของ dice เสมอ, **Alchemical Resurrection (lv10) ชุบชีวิตคนตายไม่เกิน 24 ชม.กลับมาด้วย Potion of Superior/Supreme Healing** (ของหายากมากในเกม), Miracle Serum (lv14) ให้ Advantage ทุก D20 Test หลังดื่ม potion ฮีล — coverage กว้างที่สุดและ magnitude สูงสุดในบรรดา subclass ที่ทำมา [M:4/4] [R:3/3] [B:3/3] |
| Survivability | 4/10 (C) | เครื่องมือฮีลใช้กับตัวเองได้เหมือน ally แต่ไม่ต่างจาก baseline's potion access มากนัก = baseline พอดี [M:2/4] [R:1/3] [B:1/3] |
| Action Economy | 4/10 (C) | Quick Healer (lv3) ให้ใช้ Healer's Kit เป็น Bonus Action แต่เป็นเครื่องมือแคบ ไม่ขยับเกิน baseline ชัดเจน [M:1/4] [R:2/3] [B:1/3] |
| Utility | 5/10 (B) | Physician's Studies ให้ Medicine proficiency + Int mod bonus = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 6/10 (B) | เจาะจงสาย healer เต็มตัว ไม่ได้ขยาย role อื่น = baseline พอดี [M:2/4] [R:2/3] [B:2/3] |

### Dynamo Engineer — ได้ spellcasting จริงจาก Wizard spell list

**Overall**: A — ขยับขึ้น 5 ใน 7 axis (Damage/Control/Action Economy/Utility/Versatility) กว้างที่สุดในกลุ่ม แต่ไม่มี axis ไหนถึง S เลย


*Spell Dynamos (ระบบ slot แยกที่ cast Wizard spell ได้จริง) + Arcano Bomb (Force damage d12) + Counter-Discharge/Arcane Recycler (โต้คาถาศัตรู)*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 8/10 (A) | Spell Dynamos เปิดให้เข้าถึง **Wizard spell list เต็มรูปแบบ** (blast spell อย่าง Fireball ถ้าเลือกเตรียม) เป็นครั้งแรกที่ Alchemist มี spellcasting จริง บวก Arcano Bomb (lv6, แปลง Bomb เป็น Force damage ทุก dice เป็น d12 + extra 1d12) ที่ทะลุ resistance ดาเมจกายภาพเกือบทุกกรณีเพราะเป็น Force [M:3/4] [R:2/3] [B:3/3] |
| Control | 6/10 (B) | Wizard spell list เปิดทางเข้าถึง control spell (เช่น Hold Person) ถ้าเลือกเตรียม เป็นการเพิ่ม role ที่ Alchemist ไม่เคยมีมาก่อนเลย [M:2/4] [R:2/3] [B:2/3] |
| Support | 4/10 (C) | ไม่มี support feature เฉพาะเพิ่ม (Wizard list มี buff บ้างแต่ไม่การันตี) = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Survivability | 4/10 (C) | Counter-Discharge (lv10, reaction, Advantage+Resistance ต้านคาถาที่เล็งเรา) เป็นเครื่องมือป้องกันเฉพาะทาง magic แต่จำกัดด้วย Dynamo pool ที่มีไม่เยอะ = ใกล้เคียง baseline [M:2/4] [R:1/3] [B:1/3] |
| Action Economy | 5/10 (B) | Arcane Recycler (lv14, reaction) ยึดคาถาที่ศัตรูร่ายใส่เรา (ไม่ต้องเป็น Wizard spell ด้วยซ้ำ) มาเก็บใน Dynamo ที่หมดแล้วให้ใช้ซ้ำได้ฟรี เป็นการสร้าง resource จากการกระทำของศัตรูโดยตรง [M:2/4] [R:2/3] [B:1/3] |
| Utility | 7/10 (A) | Spectrum Analyzer (Detect Magic ฟรี 1 ครั้ง/short-long rest) บวก Wizard spell list ที่มี utility spell ระดับสูงให้เลือก (ถ้ามี slot/dynamo พอ) [M:3/4] [R:2/3] [B:2/3] |
| Versatility | 8/10 (A) | Spellcasting จริงที่เพิ่มเข้ามาทำให้ Alchemist ปรับ role ได้กว้างขึ้นมากในวันเดียว (blast/control/utility จาก Wizard list) แม้ Dynamo pool จะจำกัดกว่า full caster [M:3/4] [R:2/3] [B:3/3] |

### Mad Bomber — สาย blast ล้วนๆ

**Overall**: B — Damage พุ่งเป็น S (9/10) แต่มีแค่ Survivability ที่ขยับตามเล็กน้อย (+1) ที่เหลือเท่า baseline หมด — blaster เฉพาะทางแคบ


*Black Powder Bomb (d12 ทะลุ Fire resistance/immunity) + Overloaded Charge (Prime Bomb ฟรีเพิ่ม) + Blast Shield*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 9/10 (S) | Black Powder Bomb (lv3) เปลี่ยน dice เป็น d12 ทั้งหมด + ลบ Fire resistance หรือลด immunity เป็น resistance ของเป้า บวก Overloaded Charge (lv14) ที่เพิ่ม Reagent สมมติอีก 2 หน่วยเข้า Prime Bomb แบบไม่ต้องจ่ายจริงเมื่อใช้ Reagent สูงสุดของเลเวลแล้ว — magnitude สูงสุดในบรรดา subclass ของ Alchemist [M:4/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 4/10 (C) | ไม่มี support feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Survivability | 5/10 (B) | Blast Shield (lv10) ให้เลือก resistance 1 จาก 5 ชนิดดาเมจได้ สลับได้ทุก short/long rest ปรับรับภัยคุกคามรายวันได้ [M:2/4] [R:2/3] [B:1/3] |
| Action Economy | 4/10 (C) | Timed Demolition (lv6) ใช้ Utilize action ตั้งเวลาระเบิด ไม่ได้ประหยัด action ชัดเจน = baseline พอดี [M:1/4] [R:2/3] [B:1/3] |
| Utility | 5/10 (B) | Blasting Specialty (ดาเมจ 2 เท่าใส่วัตถุ/โครงสร้าง) เป็น utility เฉพาะทางแคบ (เจาะประตู/กำแพง) = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 6/10 (B) | เจาะจงสาย pure-blaster เต็มตัว ไม่ได้ขยาย role อื่น = baseline พอดี [M:2/4] [R:2/3] [B:2/3] |

### Mutagenist — สาย self-buff/transformation

**Overall**: C — มีแค่ 2 axis ขยับจาก baseline แบบเล็กน้อย (Survivability/Versatility +1) ที่เหลือ 5 axis นิ่งสนิท เป็นตัวที่เพิ่มน้อยที่สุดในกลุ่ม


*Mutagens (บัฟร่างกายชั่วคราวเลือกได้) + Shared Mutagen (แบ่งให้ ally) + Advanced Mutation*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | Strength Mutagen ให้ +3 Str + natural weapon 1d8+mod เป็นทางเลือกดาเมจ melee ใหม่ที่ Alchemist ไม่เคยมี แต่ magnitude รวมไม่ต่างจาก baseline มาก = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 4/10 (C) | Shared Mutagen (lv6, Bonus Action + 1 Reagent) แบ่ง Mutagen ให้ ally ได้ แต่จำกัดแค่ 1 ally/ครั้งและต้องรอ Mutagen เดิมหมดฤทธิ์ก่อน [M:2/4] [R:1/3] [B:1/3] |
| Survivability | 5/10 (B) | Advanced Mutation (lv10) มีตัวเลือก Hyperelastic (Advantage ต้าน Grappled/Restrained) และ Mutagen สาย Constitution (โดยนัยจาก Mutated Blood lv14) เพิ่มความทนทาน [M:2/4] [R:2/3] [B:1/3] |
| Action Economy | 4/10 (C) | Mutagen/Shared Mutagen ใช้ Bonus Action ตามปกติ ไม่ได้ประหยัดเกิน baseline [M:1/4] [R:2/3] [B:1/3] |
| Utility | 5/10 (B) | Advanced Mutation มี Mucilaginous (climb speed เต็ม) เป็น exploration utility ที่ดี = ใกล้เคียง baseline [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 7/10 (A) | เมนู Mutagen (Strength/Dexterity/Constitution + Advanced Mutation riders) สลับได้ด้วย Bonus Action ทุกเมื่อ ปรับร่างกายให้เข้ากับสถานการณ์ได้จริง [M:2/4] [R:3/3] [B:2/3] |

### Ooze Rancher — สาย pet/summoner ตัวเล็ก

**Overall**: B — ขยับขึ้น 3 axis แบบกลางๆ (Control/Survivability/Action Economy +1 ถึง +2) ไม่มี peak เด่นชัด


*Bottled Oozes (สัตว์เลี้ยง) + Sacrificial Slime (สลับเป้าโจมตีไปที่ Ooze) + Slime Bomb*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | Slime Bomb (Acid Bomb + ลด Speed ครึ่ง + ห้าม Dash/Disengage/Dodge) บวก Bottled Ooze ที่โจมตีเองได้ (ใช้ Int mod+Prof) เป็นแหล่งดาเมจเสริมจากสัตว์เลี้ยง แต่ตัวเดียวไม่ใช่กองทัพ = ใกล้เคียง baseline [M:2/4] [R:2/3] [B:2/3] |
| Control | 5/10 (B) | Slime Bomb (lv3 upgrade) ลด Speed ครึ่งหนึ่ง + ห้าม Dash/Disengage/Dodge จนถึงเทิร์นหน้าเป็น soft-CC ที่ดี [M:2/4] [R:2/3] [B:1/3] |
| Support | 4/10 (C) | Sacrificial Slime (lv10) ป้องกันตัวเองด้วยการสลับเป้าไปที่ Ooze ไม่ใช่ support ให้ ally = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Survivability | 6/10 (B) | Ooze Resilience (Acid resistance + immune ต่อการโจมตีจาก Ooze เป็นเวลา 24 ชม.หลังโดนครั้งแรก) บวก Sacrificial Slime (lv10, reaction สลับเป้าการโจมตีไปที่ Ooze ที่อยู่ข้างๆ) [M:2/4] [R:2/3] [B:2/3] |
| Action Economy | 5/10 (B) | Bottled Ooze เป็นสัตว์เลี้ยงที่มีตาสู้ของตัวเอง เพิ่ม board presence ให้ทีมโดยไม่กิน action ของ Alchemist เพิ่ม [M:2/4] [R:2/3] [B:1/3] |
| Utility | 5/10 (B) | ไม่มี utility feature เพิ่มชัดเจน = baseline พอดี [M:2/4] [R:2/3] [B:1/3] |
| Versatility | 6/10 (B) | Elemental Oozes (lv14) ปรับ Ooze ให้ immune+ฟื้น HP จากดาเมจชนิดที่เลือกได้ เป็นการปรับแต่งสัตว์เลี้ยง ไม่ได้ขยาย role ของ Alchemist เองมาก = baseline พอดี [M:2/4] [R:2/3] [B:2/3] |

### Pigmentist — สาย paint-themed

**Overall**: C — มีแค่ 2 axis ขยับเล็กน้อย (Utility/Versatility +1) ที่เหลือ 5 axis เท่า baseline หมด แคบพอกับ Mutagenist


*Paint Bombs (มาร์คดาเมจตามสี) + Palette Portals (เทเลพอร์ตผ่านสี) + Pigment Potions*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | Paint Bombs (lv3) ให้ extra 1d4→1d8 (Splatter Bombs lv14) ดาเมจตามธาตุที่เลือกทุกครั้งที่เป้าที่เปื้อนสีโดนตี เป็น damage-mark mechanic ที่ดีแต่ไม่ถึงขั้นพลิกโผจาก baseline [M:2/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | ไม่มี control feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 4/10 (C) | Pigment Potions (lv10) ให้ potion ที่ดื่มแล้วได้ resistance ดาเมจธาตุที่เลือกด้วย เป็น support แคบๆ [M:1/4] [R:1/3] [B:1/3] |
| Survivability | 4/10 (C) | Pigment Potions ใช้ป้องกันตัวเองได้เหมือนกัน แต่ไม่ต่างจาก baseline มาก [M:2/4] [R:1/3] [B:1/3] |
| Action Economy | 4/10 (C) | Palette Portals (lv6) กินระยะเดิน 10ft ไม่ใช่ประหยัด action = baseline พอดี [M:1/4] [R:2/3] [B:1/3] |
| Utility | 6/10 (B) | Painter's Supplies proficiency+Int mod บวก Palette Portals ที่เทเลพอร์ตผ่านจุดสีเปียกได้ (เข้าถึงพื้นที่ปิด/ไขปริศนาได้) เป็นเครื่องมือ exploration ที่สร้างสรรค์ [M:2/4] [R:2/3] [B:2/3] |
| Versatility | 7/10 (A) | Splatter Bombs (lv14) ใส่ได้ 3 สีพร้อมกันในระเบิดเดียว ปรับชนิดดาเมจให้ตรงจุดอ่อนศัตรูได้หลากหลายขึ้น [M:2/4] [R:2/3] [B:3/3] |

### Resonator — สาย เสียง/คลื่นสั่นสะเทือน

**Overall**: B — ขยับขึ้น 5 axis แต่ทุกตัวขยับแค่ +1 ถึง +2 เท่านั้น กว้างแต่ตื้น ไม่มี peak ไหนแรงจริง


*Resonant Frequency (ดาเมจอัตโนมัติใส่วัสดุที่เลือก) + Flashbang (ป้องกัน OA หมู่) + Audio Enhancer (Blindsight)*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 7/10 (A) | Resonant Frequency (lv3, Magic action) ทำดาเมจ Force 1d8+Int **อัตโนมัติไม่ต้องทอย** ทุกเทิร์นที่เปิดใช้งานใส่วัตถุ/Construct/Elemental ที่ทำจากวัสดุที่เลือก แต่ขอบเขตเป้าหมายแคบมาก (แค่วัสดุเฉพาะ) จึงชดเชยกันพอดี = baseline พอดี [M:2/4] [R:3/3] [B:2/3] |
| Control | 4/10 (C) | Flashbang (lv6, Bonus Action) ห้ามเป้าหมาย Large หรือเล็กกว่าในระยะ 10ft ทำ Opportunity Attack จนถึงเทิร์นหน้า (Int mod ครั้ง/วัน) [M:1/4] [R:2/3] [B:1/3] |
| Support | 5/10 (B) | Flashbang ป้องกัน ally ที่เลือกได้ด้วย ไม่ใช่แค่ตัวเอง ช่วยให้ทีมถอยได้ปลอดภัย [M:2/4] [R:2/3] [B:1/3] |
| Survivability | 6/10 (B) | Audio Enhancer (lv10) ให้ Blindsight 30ft + Immunity ดาเมจ Thunder + Immunity Deafened แบบ passive ตลอดเวลา [M:2/4] [R:3/3] [B:1/3] |
| Action Economy | 4/10 (C) | ไม่มี feature ประหยัด action ชัดเจนเกิน baseline [M:1/4] [R:2/3] [B:1/3] |
| Utility | 6/10 (B) | Blindsight 30ft (Audio Enhancer) เป็น utility การรับรู้ที่ทรงพลังทั้ง exploration และคอมแบต [M:2/4] [R:3/3] [B:1/3] |
| Versatility | 7/10 (A) | Anti-Sound Bomb (lv3) เลือก save type ได้เอง (Str/Dex/Con) ปรับให้ตรงจุดอ่อนศัตรูแต่ละตัว [M:2/4] [R:2/3] [B:3/3] |

### Venomsmith — สาย poison เต็มตัว

**Overall**: B — ขยับขึ้น 3 axis กลางๆ (Damage/Survivability/Action Economy) ไม่มี peak เด่นชัดเหมือน Ooze Rancher


*Alchemical Assassin (แหวนพิษ Bonus Action) + Toxic Recompense (พ่นพิษตอบโต้) + Mithridatism*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 8/10 (A) | Alchemical Assassin (lv6, Bonus Action) ให้แทงพิษซ้ำได้ทุกเทิร์นแบบไม่จำกัดจำนวนครั้ง/วัน บวก Toxic Recompense (lv14, reaction) พ่นพิษใส่ผู้โจมตีระยะประชิด บังคับ CON save ไม่งั้นโดน 2d10 poison ทุกเทิร์นต่อเนื่อง — แหล่งดาเมจสะสมหลายทางพร้อมกัน [M:3/4] [R:3/3] [B:2/3] |
| Control | 3/10 (C) | Laughing Gas Bomb's prone/speed-0 rider ผูกกับ nat-1 save เท่านั้น (หายาก) ไม่นับเป็นการเพิ่ม control ที่มีนัยสำคัญ = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Support | 4/10 (C) | ไม่มี support feature เพิ่ม = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Survivability | 6/10 (B) | Mithridatism (lv10) ให้ Immunity ดาเมจ Poison + condition Poisoned แบบถาวร บวก potion ที่ดื่มให้ Poison Resistance เพิ่มด้วย [M:2/4] [R:3/3] [B:1/3] |
| Action Economy | 6/10 (B) | Alchemical Assassin ให้แหล่งดาเมจพิษเพิ่มทุกเทิร์นด้วย Bonus Action เดียว (1 Piercing dmg + poison) ไม่แย่ง action หลักเลย [M:2/4] [R:3/3] [B:1/3] |
| Utility | 5/10 (B) | Poisoner (lv3) ให้ Discovery ฟรี + ยกเลิกเงื่อนไข level ในการ brew poison = baseline พอดี [M:1/4] [R:2/3] [B:1/3] |
| Versatility | 6/10 (B) | เจาะจงสาย poison เต็มตัว ไม่ได้ขยาย role อื่นชัดเจน = baseline พอดี [M:2/4] [R:2/3] [B:2/3] |

### Xenoalchemist — สาย monster-graft + golem

**Overall**: A — Control กระโดดจาก C ไป A (3→7) บวก Damage/Action Economy/Utility/Versatility ขยับตาม กว้างเทียบเท่า Dynamo Engineer


*Mad Scientist (graft สัตว์ประหลาดฟรี 2 ชิ้น) + Sleep Bomb (hard-CC) + It's Alive! (Golem ถาวร)*

| Axis | คะแนน | เหตุผล |
|---|---|---|
| Damage | 8/10 (A) | Mad Scientist ให้ graft ฟรี 2 ชิ้น (แนะนำ Monstrous Weapon) ใช้ Int mod ตี unarmed strike ได้ บวก It's Alive! (lv14) สร้าง Alchemy Golem ถาวรที่ต่อสู้เองทุกรอบเป็นแหล่งดาเมจเสริมถาวร (คุมด้วย Bonus Action) [M:3/4] [R:3/3] [B:2/3] |
| Control | 7/10 (A) | Sleep Bomb (lv3, ไม่ทำดาเมจ) บังคับ Wis save 2 ชั้น — fail แรก Incapacitated, fail รอบสอง **Unconscious เต็มรูปแบบ 1 นาที** เป็น hard-CC ระดับสูงสุดในเกม (จบเมื่อโดนดาเมจ/มีคนปลุก) [M:3/4] [R:2/3] [B:2/3] |
| Support | 4/10 (C) | Golem เป็นสัตว์เลี้ยงของ Xenoalchemist เอง ไม่ใช่ feature เสริม ally โดยตรง = baseline พอดี [M:1/4] [R:1/3] [B:1/3] |
| Survivability | 4/10 (C) | Necromantic Organs (lv10) กันตายด้วยการตกลง 2×level HP แทน 0 ได้ 1 ครั้ง/long rest — ใกล้เคียง baseline [M:2/4] [R:1/3] [B:1/3] |
| Action Economy | 5/10 (B) | It's Alive! ให้ Golem ลงมือเองทุกรอบ (คุมด้วย Bonus Action) เพิ่มบอดี้ในสนามรบโดยไม่กิน action หลักของ Xenoalchemist [M:2/4] [R:2/3] [B:1/3] |
| Utility | 6/10 (B) | Xenobiology (skill prof + Advantage ระบุตัวมอนสเตอร์) บวก Examine Specimen (lv6, Bonus Action เรียนรู้ AC/Immunity/Resistance/Bloodied ของเป้า) เป็น intel tool ที่ดีมาก [M:2/4] [R:2/3] [B:2/3] |
| Versatility | 7/10 (A) | Graft (melee), Sleep Bomb (control), Golem (extra body/damage) ครอบคลุมหลาย role พร้อมกันจากฟีเจอร์ต่างกัน [M:2/4] [R:2/3] [B:2/3] |
