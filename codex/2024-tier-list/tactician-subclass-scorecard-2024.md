# Tactician — Subclass Scorecard (2024) 🕰️

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-08
**ขอบเขต**: 6 subclass (Gambler, Grandmaster, Medic, Mentalist, Scholar, War Mind) — ดูรายชื่อใน [src/data/classes.json](../../src/data/classes.json) (คลาสนี้ยังไม่อยู่ใน scope 29 คลาสของ [00-scorecard-progress.md](00-scorecard-progress.md) เพราะเพิ่งพบว่าอยู่ในตารางสุ่มแต่ไม่เคยถูกเพิ่มเข้า tracker — รอผู้ใช้ยืนยันว่าจะเพิ่มเข้า scope ถาวรหรือไม่)
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 6 ตัว

**ที่มาข้อมูล chassis**: Tactician **ไม่ใช่คลาสทางการของ WotC ทั้ง 2014 และ 2024** — เป็น 3rd-party class จาก **"Drizzt's Travelogue of Everything"** (DMs Guild, ผู้แต่ง Drizzt) แบ่งเป็น 2 เล่ม:
- **Volume 1**: core class chassis + subclass **Grandmaster, Mentalist, Scholar, War Mind** — Roll20 เอาขึ้นฟรีในคอมเพนเดียม ([Tactician class](https://roll20.net/compendium/dnd5e/Tactician), [Grandmaster](https://roll20.net/compendium/dnd5e/Grandmaster), [Mentalist](https://roll20.net/compendium/dnd5e/Mentalist), [Scholar](https://roll20.net/compendium/dnd5e/Scholar), [War Mind](https://roll20.net/compendium/dnd5e/War%20Mind)) — ดึงข้อความเต็มมาอ้างอิงได้ครบทุกเลเวล
- **Volume 2**: subclass เพิ่มเติมรวมถึง **Gambler, Medic** — ขายเป็น PDF บน DMsGuild เท่านั้น หาทางเว็บไม่ได้ แต่ผู้ใช้ส่ง screenshot ข้อความเต็มจากหน้า Roll20 compendium ของทั้งสองตัวมาให้ (ครบทุกเลเวล 3/6/10/15/18) จึงให้คะแนนได้แล้ว

🕰️ ใช้กติกา "orphan" ของโปรเจกต์ (เหมือน [Mystic](mystic-subclass-scorecard-2024.md)) เพราะเป็นตัวเลือกเดียวที่มีในโปรเจกต์ ไม่มีเวอร์ชันอื่นให้เทียบ

---

## Class Baseline (Tactician, DToE Vol.1) 🕰️

Floor 0-10 ต่อ axis ของ **Tactician เปล่าๆ ไม่นับ Strategic Focus (subclass) feature ใดๆ เลย** — HD d8, ไม่ใช่ spellcaster โดย baseline (Scholar subclass เท่านั้นที่ได้ spell), saving throw proficiency Int + Wis, armor proficiency light เท่านั้น, weapon proficiency simple + hand crossbow/longsword/rapier, skill proficiency 3 จาก History/Insight/Investigation/Medicine/Nature/Perception/Persuasion/Survival, Perfect Plan (lv1, d4 pool เริ่ม 2 ลูก lv1 → 21 ลูก lv20 ฟื้นเต็มทุก Long Rest), Intelligent Defense (lv1, ใช้ Int แทน Dex คำนวณ AC), Polyglot (lv1, 2 ภาษา), Analyze (lv2, bonus action มาร์คเป้า 60ft นาน 1 นาที ใช้ได้เท่า proficiency bonus/rest ปลดล็อก Combat Analysis + Trait Analysis), Contingency Plan (lv2), Expertise (lv3, 2→4 skill), Guiding Guile (lv5), Resilient Mind (lv7), Advanced Planning Techniques + Mind's Eye (lv9), Analytic Advantage (lv11), Improvised Plan (lv13), Battlefield Commander (lv14), Piercing Eye (lv17), Ultimate Knowing (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 4/10 (C) | Combat Analysis (ส่วนหนึ่งของ Analyze lv2) ให้ตีเข้าเป้าที่ analyze อยู่แล้วเสีย Perfect Plan die 1 ลูกเพื่อเพิ่มดาเมจ 1d4 (2d4 ที่ lv6, 3d4 ที่ lv11, 4d4 ที่ lv17) — pool dice ใหญ่พอใช้ได้บ่อย (ฟื้นเต็มทุก Long Rest + ฟื้นบางส่วนทุก Short Rest ผ่าน Contingency Plan) แต่ผูกกับเป้าที่ analyze อยู่เท่านั้น (จำกัด proficiency bonus ครั้ง/rest) และ weapon proficiency มีแค่ simple + hand crossbow/longsword/rapier ไม่มี Extra Attack ติด baseline เลย [M:1/4] [R:2/3] [B:1/3] |
| **Control** | 2/10 (D) | Analyze ให้เป้าเสีย Advantage ตอนทำ opportunity attack ใส่คุณ (soft, ป้องกันตัวเองเป็นหลัก) ส่วน control ใส่ศัตรูจริงๆ (Analytic Advantage: push 10ft/prone save/ห้าม reaction) มาช้าถึง lv11 และยังต้องพึ่งการตีเข้า + เสีย Perfect Plan die ด้วย ก่อนหน้านั้นแทบไม่มี control เลย [M:1/4] [R:1/3] [B:0/3] |
| **Support** | 7/10 (A) | หัวใจของ class — Perfect Plan die ให้เพื่อนใน Plan (วางแผนล่วงหน้า 10 นาที ครอบคลุมได้ 1+Int mod ตัว ขั้นต่ำ 2) ใช้ Reaction เติม d4 บน attack roll/ability check ของตัวเอง (และ saving throw ด้วยที่ lv7+) ได้ไม่จำกัดจำนวนครั้งตราบมี die เหลือ (pool 2→21 ลูกตามเลเวล ฟื้นเต็มทุก Long Rest) บวก Guiding Guile (lv5, 1 ครั้ง/เทิร์นหลังตีเข้า เรียกเพื่อนในระยะ 60ft ให้ตีแถมด้วย Reaction) — เสีย Reaction ไม่เสีย action หลัก แต่ต้อง plan ล่วงหน้า/อยู่ในระยะเห็น-ได้ยิน [M:2/4] [R:3/3] [B:2/3] |
| **Survivability** | 4/10 (C) | Intelligent Defense (lv1) ให้ใช้ Int แทน Dex คำนวณ AC ซึ่งน่าจะเป็น stat หลักของคลาสนี้อยู่แล้ว (ไม่ต้องพึ่ง subclass) บวก Resilient Mind (lv7, save ที่ปกติโดนครึ่งดาเมจกลายเป็นไม่โดนเลยถ้า save ผ่าน + Advantage ต้าน charm/frighten/stun) และ Mind's Eye (lv9, ศัตรูที่มองไม่เห็นไม่ได้ Advantage ใส่คุณ) — ทั้งหมดเป็น passive ไม่กิน resource แต่ไม่มี HP บวก/damage resistance ติด baseline เลย [M:1/4] [R:2/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Analyze เข้าด้วย Bonus Action, Perfect Plan die จ่ายผ่าน Reaction ไม่เสีย action หลักทั้งของตัวเองและเพื่อน, Battlefield Commander (lv14) ให้ Reaction พิเศษแยกต่างหากเฉพาะใช้ Perfect Plan die (ใช้คู่กับ Reaction ปกติในเทิร์นเดียวกันได้) และ Piercing Eye (lv17) ให้เติม die เข้าโจมตีแรกของเทิร์นใส่เป้าที่ analyze ได้ฟรีไม่เสีย Reaction/ไม่เสีย die เลย — resource หลักยั่งยืนดีเพราะฟื้นเต็มทุก Long Rest + ฟื้นบางส่วนทุก Short Rest [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Trait Analysis (ส่วนหนึ่งของ Analyze) ให้เป้า Int save DC 8+prof+Int ทุกจบเทิร์นที่ analyze อยู่ พลาดแล้วรู้ 1 อย่าง (AC/ability score/vulnerability-resistance-immunity/condition immunity) ฟรีไม่เสีย resource เพิ่ม บวก Polyglot (2 ภาษา) และ Expertise (lv3, double proficiency 2→4 skill) — ไม่มี utility นอกคอมแบตแบบ exploration (teleport/detect magic ฯลฯ) ติด baseline เลย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Perfect Plan die ใช้ได้ทั้ง attack roll, ability check, และ saving throw (lv7+) ของทั้งตัวเองและเพื่อนในแผน ครอบคลุมทั้งในและนอกคอมแบต ไม่ผูก role เดียว — แต่ magnitude ต่อครั้ง (d4) ค่อนข้างต่ำและต้อง setup แผนล่วงหน้าก่อนเสมอ [M:1/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (6)

**Class Baseline อ้างอิง**: Damage 4, Control 2, Support 7, Survivability 4, Action Economy 6, Utility 4, Versatility 5

ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ

| Subclass | Source | Overall | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Gambler | DToE Vol.2 🕰️ | A | 6 (B) | 2 (D) | 8 (A) | 4 (C) | 7 (A) | 6 (B) | 7 (A) |
| Grandmaster | DToE Vol.1 🕰️ | A | 6 (B) | 3 (C) | 9 (S) | 5 (B) | 7 (A) | 6 (B) | 7 (A) |
| Medic | DToE Vol.2 🕰️ | B | 4 (C) | 3 (C) | 10 (S) | 4 (C) | 8 (A) | 6 (B) | 6 (B) |
| Mentalist | DToE Vol.1 🕰️ | S | 7 (A) | 7 (A) | 8 (A) | 4 (C) | 7 (A) | 7 (A) | 6 (B) |
| Scholar | DToE Vol.1 🕰️ | S | 8 (A) | 5 (B) | 8 (A) | 4 (C) | 8 (A) | 8 (A) | 9 (S) |
| War Mind | DToE Vol.1 🕰️ | A | 9 (S) | 2 (D) | 8 (A) | 6 (B) | 8 (A) | 5 (B) | 6 (B) |

---

### Gambler

**Overall**: A — ยกระดับ 5 ใน 7 axis เหนือ baseline พร้อมกัน (Damage/Support/AE/Utility/Versatility) ด้วยการขยายมูลค่า/ความแน่นอนของ Perfect Plan die เดิม ไม่ใช่ one-trick pony เลย แม้ Control/Survivability จะยังค้างที่ baseline

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Gambler's Guile (lv6, ทุกครั้งที่ใช้ Guiding Guile บังคับเป้า Intelligence save DC 8+Int mod+prof bonus เป้า fail แล้วทอย Perfect Plan die เติมเข้าการตีที่ trigger ได้ฟรีโดย**ไม่เสีย die**) + Weighted Dice (lv15, เลิกทอย PP die แล้วรับค่าสูงสุดแทนได้ เท่า proficiency bonus ครั้ง/Long Rest ครอบคลุมด้วย Combat Analysis damage die) — ทั้งสองเป็นตัวขยาย damage die ของ baseline โดยไม่เพิ่มต้นทุน [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 2/10 (D) | Gambler's Guile บังคับ save ก็จริงแต่ผลตอน fail คือเสริม die ให้ฝ่ายเรา ไม่ใช่ debuff ใส่ศัตรู ไม่มี control feature ใหม่ที่ยืนยันได้ = เท่า baseline |
| **Support** | 8/10 (A) | Gambler's Guile ทำให้ Guiding Guile (baseline) แถม Perfect Plan die ฟรีเข้าการตีของเพื่อนที่ trigger ได้บ่อยขึ้นโดยไม่กิน pool + Weighted Dice การันตีค่าสูงสุดทุกครั้งที่ทอย PP die ให้เพื่อน (ทั้ง attack/check/save) [M:2/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature เสริมการรอดชีวิตของตัวเองใหม่ที่ยืนยันได้ (ธีมเน้นบิด probability ของ Perfect Plan die ล้วน) = เท่า baseline |
| **Action Economy** | 7/10 (A) | Double Down (lv3, 1 ครั้ง/เทิร์นตอนทอย PP die ทอยซ้ำแล้วบวกเพิ่ม โดยไม่เสีย die เพิ่ม จนกว่าจะสะสมเลข 1 ครบ proficiency bonus ครั้ง) + Weighted Dice (การันตีค่าสูงสุดไม่ต้องเสี่ยงทอยแย่) — ขยายมูลค่าของ PP die เดิมโดยไม่เพิ่ม cost แม้ Cheater's Contingency (lv10, Action ทอย+เสีย 1 die แลกฟื้น die เท่าผล-1) จะเสีย Action เต็ม 1 ครั้ง/Long Rest [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | Bonus Proficiencies (lv3, 2 skill จาก Deception/Insight/Sleight of Hand + gaming set 2 ชนิด) + Layered Bluff (lv6, เสีย PP die ทอย Charisma(Deception) check ซ้ำได้ เลือกหลังทอยแต่ก่อนรู้ผล บังคับใช้ผลใหม่) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ฟีเจอร์ทั้งหมดขยายมูลค่า/ความแน่นอนของ Perfect Plan die แบบกว้างๆ ครอบคลุมทั้ง attack, ally-support, และ social check (Layered Bluff) ไม่ผูก role เดียว [M:2/4] [R:2/3] [B:3/3] |

### Grandmaster

**Overall**: A — Support S เดี่ยว (Perfectionist กันพลาดทั้งทีม) บวก Damage/AE/Utility/Versatility ยกขึ้นเป็น B/A ทั่วกระดาน มีแค่ Control ที่ค้าง baseline — breadth กว้างแต่ไม่มี axis ที่สองที่แรงพอจะดันขึ้น S เหมือน Mentalist/Scholar

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Counterplay (lv10, ทุกครั้งที่โดนดาเมจ ใช้ Reaction ตีอาวุธใส่คนที่ทำดาเมจได้ ใช้ได้เท่า proficiency bonus/Long Rest) + Checkmate (lv18, ตอน analyzed creature โดนตีแบบมี Advantage ใช้ Reaction เปลี่ยนให้เป็น critical hit อัตโนมัติ 1 ครั้ง/short-or-long rest) — เพิ่มโอกาสตีได้บ่อยขึ้น/แรงขึ้นเหนือ baseline แต่ยังจำกัดจำนวนครั้ง/rest [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | Moving Pieces (lv3, สละการเดินของตัวเอง ให้เพื่อนที่เห็น/ได้ยินเดินได้ระยะเท่า speed โดยไม่โดน opportunity attack ใช้ได้เท่า proficiency bonus/rest) เป็น soft-control เชิงจัดทัพ ไม่ใช่ debuff ใส่ศัตรูโดยตรง [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 9/10 (S) | Moving Pieces ให้เพื่อนขยับฟรีไม่โดน OA (สลับตำแหน่งทีมได้อย่างปลอดภัย) บวก Perfectionist (lv15, ครั้งแรกที่เพื่อนใน Plan ทอยได้ 1 ดิบใน attack/check/save ต่อเทิร์น สามารถ reroll แล้วต้องใช้ผลใหม่) ซึ่งกันความซวยระดับทีมได้จริง ไม่เสีย resource เพิ่มเลย [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Two Steps Ahead (lv6, +2 AC ต้าน attack จาก analyzed creature และ +2 Dex saving throw ต้าน analyzed creature) — โบนัสป้องกันเฉพาะเวลาเจอเป้าที่ analyze อยู่เท่านั้น ไม่ใช่ universal [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Counterplay ให้ Reaction-attack แถมทุกครั้งที่โดนดาเมจ (เท่า proficiency bonus ครั้ง/Long Rest) เป็น damage เสริมที่ไม่กิน action ของตัวเองเลย [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 6/10 (B) | Bonus Proficiencies (lv3, 2 skill จาก Deception/Insight/Persuasion + gaming set สูงสุด 3 ชนิด) เสริม social/utility เหนือ baseline [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผสมทั้ง damage-punish (Counterplay/Checkmate), team-safety (Moving Pieces/Perfectionist), และ defense เฉพาะจุด (Two Steps Ahead) ไม่ยึดติด role เดียว [M:2/4] [R:2/3] [B:3/3] |

### Medic

**Overall**: B — Support 10/10 คือคะแนนสูงสุดทั้งไฟล์นี้ (healer ตัวจริง) แต่ Damage/Control/Survivability ค้างที่ baseline ทั้ง 3 แกน มี Utility เดียวที่ขยับขึ้นมาเป็น B — one-trick pony ตัวชัดเจน: เก่งสุดขั้วด้าน heal แต่แทบไม่มี value อื่นให้ทีมเลยนอกเหนือจากบทบาทนั้น จึงไม่ควรได้ A ทั้งที่ราย axis เฉลี่ยดูดี

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 4/10 (C) | ไม่มี feature เพิ่มดาเมจใหม่ที่ยืนยันได้ (ธีม healer/protector ล้วน) = เท่า baseline |
| **Control** | 3/10 (C) | Invigorating Treatments (lv10, attack roll ที่พุ่งใส่เป้าที่มี temp HP จาก Treatment Under Trial ของคุณ ต้องทอยแบบ Disadvantage) เป็น soft-control เชิงป้องกันเพื่อน ไม่ใช่ debuff ตรงใส่ศัตรู [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 10/10 (S) | Treatment Under Trial (lv3, Bonus Action แตะเพื่อน เสีย PP dice สูงสุด Int mod (ขั้นต่ำ 1) ทอยรวมกันฮีล HP เท่าผลรวม + เพื่อนได้ temp HP เท่า Tactician level จนถึงต้นเทิร์นถัดไป) + Emergency Aid (lv6, Bonus Action เดียวกัน เสีย 1 PP die วิ่งเข้าหาเพื่อนแล้วฮีลต่อได้เลยถ้าเข้าระยะ 5ft) + Patch Up (lv3, auto-succeed Medicine check stabilize + ฟื้น 1 HP นอกคอมแบต 10 นาที) + Perfect Medic (lv18, Action เสีย 3 PP die ฮีล 100 HP + ล้าง Blinded/Deafened/Paralyzed/Poisoned + neutralize โรค/พิษ 1 ครั้ง/Long Rest) — สแต็กฮีล/ป้องกันหนาแน่นที่สุดในบรรดา subclass ทั้งหมดของคลาสนี้ [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ทุก feature เล็งไปที่เพื่อน ไม่มีอันไหนป้องกันตัวเองโดยตรง = เท่า baseline |
| **Action Economy** | 8/10 (A) | Treatment Under Trial และ Emergency Aid ทั้งคู่เป็น Bonus Action และ Emergency Aid ให้วิ่งเข้าหา + ฮีลจบใน Bonus Action เดียว (ปกติต้องแยก 2 ทรัพยากร) — ประหยัด action สุดในกลุ่ม แม้ Perfect Medic capstone จะเสีย Action เต็ม 1 ครั้ง/Long Rest [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | Bonus Proficiencies (lv3, 2 skill จาก Investigation/Medicine/Survival) + Patch Up ให้ auto-succeed Medicine check stabilize คนใกล้ตาย และฟื้น HP นอกคอมแบตให้คนเสถียรที่ 0 HP ได้ [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | โฟกัส healer/protector เฉพาะทางหนักมาก แข็งแกร่งสุดขั้วด้าน Support แต่แทบไม่แตะ damage/control เลย [M:2/4] [R:2/3] [B:2/3] |

### Mentalist

**Overall**: S — 5 ใน 7 axis อยู่ที่ A พร้อมกัน (Damage/Control/Support/AE/Utility) ไม่มี axis ไหนถูกตัดทอนต่ำกว่า baseline เลยสักตัว เป็นตัวคุมเกม+ดาเมจ-แอมป์+ซัพพอร์ตครบเครื่องที่สุดในคลาสนี้ จุดอ่อนเดียวคือ Survivability ที่ยังอยู่แค่ baseline

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Insightful Prediction ที่ lv10 ให้ reaction ตีอาวุธใส่เป้าทุกครั้งที่เป้าพลาด attack roll หรือ fail ability check (ใช้ได้เท่า proficiency bonus/Long Rest) บวก Disarming Words (lv18, เป้าที่โดน Insightful Prediction รับ 1d12 psychic damage เพิ่มทุกครั้งที่โดนตี "โดยใครก็ได้" ก่อนเทิร์นถัดไปของคุณ) เป็น damage amplifier ระดับทีมที่แรงมากช่วง endgame [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Insightful Prediction (lv3, ต้นเทิร์นเป้าที่ analyze อยู่ ทอย Wisdom(Insight) contest กับ Charisma(Deception) ของเป้า ถ้าชนะ เป้าเสีย 1d4 จากทุก attack roll/ability check จนถึงเทิร์นถัดไปของมัน ขยับเป็น 1d6 ที่ lv10 และครอบคลุม saving throw ด้วยที่ lv15) + Goad (lv6, bonus action บังคับเป้าที่โดน prediction ให้ attack เพื่อนที่เลือกเท่านั้น ไม่งั้นเสีย Advantage เท่า proficiency bonus ครั้ง/Long Rest) — debuff กว้างและต่อเนื่องตราบชนะ contest ทุกเทิร์น [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Goad ดึงเป้าให้ attack เพื่อนที่กำหนดแทนตัวที่เปราะบางกว่าได้ เป็น protection ทางอ้อมเสริมจาก baseline Perfect Plan support เดิม [M:2/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature เสริมการรอดชีวิตของตัวเองใหม่ที่ยืนยันได้ (ธีมเน้น debuff/investigation เป้าหมาย) = เท่า baseline |
| **Action Economy** | 7/10 (A) | Search เป็น bonus action ได้ (lv6) + reaction weapon attack ทุกครั้งที่เป้าพลาด/fail จาก Insightful Prediction (lv10, เท่า proficiency bonus/Long Rest) เพิ่มมูลค่าให้ทุกเทิร์นโดยไม่กิน action หลัก [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Int mod บวกเข้า Wisdom(Perception) check แบบ passive ตลอดเวลา + Search เป็น bonus action + analyze เป้าครบ duration ได้ Advantage บน Insight check ต้านเป้านั้นนาน 24 ชม. + Psychoanalyze (lv18) ให้ auto-success Insight check ต้านเป้าตลอด duration [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 6/10 (B) | เน้นหนักไปทาง single-target debuff/damage-amp + investigation เป็นหลัก breadth แคบกว่า Grandmaster/Scholar เพราะไม่แตะ survivability/exploration เลย [M:2/4] [R:2/3] [B:2/3] |

### Scholar

**Overall**: S — เพิ่มระบบ spellcasting เต็มรูปแบบทับบน chassis เดิม ดัน Damage/Support/AE/Utility ขึ้นเป็น A ทั้งหมดพร้อม Versatility S (9/10) สูงสุดในคลาส กว้างที่สุดในบรรดา subclass ทั้ง 6 ตัว มีแค่ Survivability ที่ยังอยู่ baseline

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ได้ spellcasting จริงจาก Wizard spell list (2 cantrip + 3 first-level spell ที่ lv3, cantrip เพิ่มอีก 1 ที่ lv10) ซึ่งเลือก damage spell ได้ (1 ใน 3 first-level spell ไม่บังคับ school) บวก Analyze extension (lv10, ตีเป้าที่ analyze ด้วยคาถา lv1+ ได้ damage die เพิ่มอีก 1 ลูกของคาถานั้น) และ lv18 หล่อคาถาที่รู้โดยไม่เสีย spell slot (จ่าย Perfect Plan die แทน 2×spell level) ทำให้ sustain ดาเมจจากคาถาได้ทั้งวันผ่าน pool ใหญ่ [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | เข้าถึง Wizard spell list ทั้งระบบทำให้เลือก control spell ระดับ 1 ได้บางส่วน (เช่น Sleep) แต่ Scholar ยังไม่ใช่ full caster — spell known/slot มีจำกัดมากช่วงต้นเกม (3 spell ที่ lv3, 2 ใน 3 ต้องเป็น divination/transmutation ด้วย) ทำให้ breadth ของ control ยังแคบ [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 8/10 (A) | Guiding Guile ขยายไปใช้กับ damage จากคาถาได้ด้วย (lv6, ไม่ต้องพึ่ง weapon hit อีกต่อไป) บวก lv15 ให้ Reaction ทอย Perfect Plan die เสริม saving throw ของเพื่อนที่โดน AOE save-spell ของศัตรู — ขยาย baseline support ให้ครอบคลุมสถานการณ์คาถามากขึ้น [M:2/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature เสริมการรอดชีวิตของตัวเองที่ระบุชัดเจน (spell known เป็น damage/divination/transmutation เป็นหลักตาม constraint ของ subclass) = เท่า baseline |
| **Action Economy** | 8/10 (A) | lv18 หล่อคาถาที่รู้ได้โดยไม่เสีย spell slot เลย จ่ายด้วย Perfect Plan die แทน (2×spell level) แปลง resource pool ที่ฟื้นเร็ว/ใหญ่อยู่แล้วให้กลายเป็นคาถา "ฟรี" เพิ่มความยั่งยืนทั้งวันแบบก้าวกระโดด [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | เข้าถึง Wizard spell list เต็มระบบ (utility spell อย่าง Comprehend Languages/Identify เป็นไปได้) + proficiency Arcana/Investigation/Medicine (เลือก 2) + calligrapher's supplies + Trait Analysis อัพเกรด (เป้า fail save ได้ข้อมูล 2 อย่างแทน 1) [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | เพิ่มระบบ spellcasting เต็มรูปแบบทับบน chassis support/tactics เดิม เป็นการขยาย breadth มากที่สุดในบรรดา subclass ที่ประเมินได้ [M:3/4] [R:3/3] [B:3/3] |

### War Mind

**Overall**: A — Damage 9/10 คือคะแนนสูงสุดทั้งไฟล์นี้ (Extra Attack + crit 19-20) บวก Support/AE ที่ A คู่กัน แต่ Control ค้าง baseline เต็มและ Utility/Versatility แค่ B — striker เฉพาะทางที่แรงสุดขั้วด้าน damage แต่ breadth แคบกว่า Mentalist/Scholar จึงไม่ถึง S

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Extra Attack (lv6, ตีอาวุธ 2 ครั้งต่อ Attack action — subclass เดียวใน 4 ตัวที่ได้) บวก martial weapon + Fighting Style (lv3, เลือก Archery +2 ranged attack / Dueling +2 melee damage ฯลฯ) + crit range ขยายเป็น 19-20 ใส่เป้าที่ analyze อยู่ + ทุกครั้งที่เติม Perfect Plan die เข้า attack roll ใส่เป้าที่ analyze จะได้ Combat Analysis damage แถมอัตโนมัติ (ไม่ต้องเลือกแลกอีกต่อไป) — ดาเมจต่อเทิร์นสูงสุดในกลุ่มชัดเจน [M:4/4] [R:3/3] [B:2/3] |
| **Control** | 2/10 (D) | ไม่มี control feature ใหม่ที่ยืนยันได้ (ธีม melee-DPR ล้วน) = เท่า baseline |
| **Support** | 8/10 (A) | lv15 ให้เพื่อนในระยะ 30ft ได้โบนัส saving throw (สูงสุด +5) เท่า proficiency bonus ครั้ง/Long Rest + lv18 aura ให้เพื่อนในระยะ 5ft ได้ AC บวก Int mod และดาเมจเพิ่ม 1d6 ขณะอยู่ในฟอร์เมชัน — เสริม baseline support เดิมด้วย aura เชิงรับ+ดาเมจให้ทีม [M:2/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Medium armor proficiency (lv3, ดีกว่า light-only ของ baseline) + Fighting Style ตัวเลือก Defense (+1 AC) หรือ Protection (บังคับ Disadvantage บนคนตีเพื่อนข้างๆ) + lv10 bonus action ทอย Perfect Plan die เติม AC ถึงต้นเทิร์นถัดไป (ใช้ได้เฉพาะเทิร์นที่ Attack action มาแล้ว) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Extra Attack เพิ่มผลตอบแทนต่อ Attack action หนึ่งครั้งเป็นสองเท่าโดยไม่เสีย resource เพิ่มเลย เป็นตัวคูณ economyที่แรงที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Bonus Proficiencies (lv3, 2 skill จาก Athletics/Persuasion/Survival) เท่านั้น ไม่มี utility นอกคอมแบตอื่นเพิ่ม [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | โฟกัส melee-striker หนักมาก แม้จะมี aura support (lv15/18) แถมมาด้วย แต่ breadth โดยรวมยังแคบกว่า Grandmaster/Mentalist/Scholar เพราะไม่แตะ control/utility เลย [M:2/4] [R:2/3] [B:2/3] |

---

## สรุป: สิ่งที่ยังค้างอยู่

1. **เพิ่มเข้า scope ถาวรหรือไม่** — Tactician ยังไม่อยู่ใน [00-scorecard-progress.md](00-scorecard-progress.md) (29-class scope เดิม) — ถ้าต้องการให้เข้า tracker ถาวรเหมือน 29 คลาสอื่น ต้องเพิ่ม Class Baseline checklist + Subclass checklist (6 รายการ) เข้าไฟล์นั้นด้วย
