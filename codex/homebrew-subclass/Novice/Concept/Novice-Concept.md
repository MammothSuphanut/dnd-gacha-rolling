# Class: Novice

> ทุกตำนานเริ่มต้นจากศูนย์ — นักผจญภัยมือใหม่ที่ยังไม่มีสายอาชีพ ค่อยๆ ไต่บันไดเลื่อนขั้น "เปลี่ยนอาชีพ" (Job Change) ไปเรื่อยๆ ตามเส้นทางที่เลือก จนกลายเป็นยอดฝีมือระดับตำนานในสายของตน

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นฉบับร่างจากการสัมภาษณ์เบื้องต้น ยังไม่ผ่าน balance check เต็มรูปแบบ (checklist + validation ตาม `subclass-creation-rules.md`) และตัวเลขหลายจุดยังเป็นค่าประมาณรอ feedback จากผู้ใช้ก่อนสรุปจริง เนื้อหา Job Paths ทั้งหมด (Swordsman/Mage/Archer/Thief/Acolyte/Merchant/Super Novice) ถูกลบออกไปแล้วเพื่อออกแบบใหม่ตามจังหวะเลเวลล่าสุด — เหลือแค่ chassis + progression skeleton + ตารางอ้างอิง

## Designer's Note

แรงบันดาลใจจากระบบเลื่อนขั้นอาชีพของ Ragnarok Online / ROX: Novice → First Class → Second Class → Transcendent Second Class → Third Class → Fourth Class ปัญหาที่ต้องแก้คือ D&D 2024 ปกติให้เลือก subclass "ครั้งเดียวจบ" ตอนต้นเกม แต่ RO ให้ความรู้สึก "อัพคลาส" ซ้ำหลายรอบตลอดเกม — ดังนั้น class นี้จึงออกแบบให้ subclass (Job) มี milestone ใหญ่ 4 จุด (เลเวล 3/7/11/15) โดย**ข้าม First Class (Swordsman/Mage/Archer/Thief/Acolyte/Merchant เอง) ไปเลย** เลเวล 3 เลือกตรงเป็น Second Class ทันที แมปตรงกับ 4 tier ที่เหลือของ RO (Second Class → Transcendent Second Class → Third Class → Fourth Class) แทนที่จะได้ features มาเรื่อยๆ แบบ subclass ปกติ โดยแต่ละจุดคือ "เลื่อนขั้น" จริงที่เปลี่ยนตัวตนการเล่นอย่างชัดเจน ไม่ใช่แค่บวกเลข — จังหวะนี้เลือกเพื่อไม่ให้ทับเลเวล ASI/Epic Boon (4/8/12/16/19) เลย

รวมทั้ง **6 สายอาชีพหลักของ RO + Super Novice** — วัตถุดิบ skill reference ของแต่ละสาย (6 สายหลัก) แยกออกเป็นไฟล์ต่อสายแล้วตาม convention ปกติของโปรเจกต์ (ดูลิงก์ในหัวข้อ "ROX Skill Reference" ด้านล่าง) แต่ละสายอ้างอิง job tree + skill จริงจาก ROX (Ragnarok X: Next Generation) และตารางอ้างอิงทางการที่ผู้ใช้ให้มา (ดูหัวข้อ "ROX Job Tree Reference" ด้านล่าง)

**6 สายหลัก** (ต่อยอดจาก Swordsman/Mage/Archer/Thief/Acolyte/Merchant): เลือกได้ตอนเลเวล 3 เหมือนกันหมด **ข้าม First Class ไปเลย** ชื่อ tier ทุกสายอ้างอิงตามตารางทางการ 4 tier ที่เหลือ (Second Class เลเวล 3 → Transcendent Second Class เลเวล 7 → Third Class เลเวล 11 → Fourth Class เลเวล 15)

**Super Novice** เป็นสายพิเศษที่ 7 — ไม่ผ่าน job-change tree ปกติ (ในเกมจริง Super Novice คือทางเลือกทดแทน 1st job ที่ยึดติดกับความเป็น "Novice" ตลอดไป ไม่มี 2nd/3rd job ต่อ) จึงต้องออกแบบให้เป็น "jack of all trades" ที่หยิบยืม feature จากสายอื่นแทนการมี fork ของตัวเอง

**ไม่รวม**: Gunslinger, Ninja, Taekwon, Summoner (Doram) — ตัดออกตามคำขอให้เก็บเฉพาะ 6 สายหลัก (+ Super Novice)

- [ROX Job Guide (Bluestacks)](https://www.bluestacks.com/blog/game-guides/ragnarok-x-next-generation/rox-job-guide-en.html)
- [ROX Official Class List](https://www.ragnarokx.com/main/class_list?job=1_3)
- [ROXPEDIA Job Database](https://roxpedia.com/job-database)
- [Lord Knight Guide](http://ragnamobileguide.com/lord-knight-guide-agi-crit-bash-pierce-build/)
- [Ragnarok Mobile Mage/Wizard/High Wizard Guide](https://99porings.com/mobile.php?guide=ragnarok-mobile-mage-wizard-high-wizard-guide)
- [ROX Archer/Sniper Build Guide](https://www.bluestacks.com/blog/game-guides/ragnarok-x-next-generation/rox-archer-sniper-build-guide-en.html)
- [ROX Assassin Class Guide](https://www.bluestacks.com/blog/game-guides/ragnarok-x-next-generation/rox-assassin-class-guide-en.html)
- [RO Mobile Acolyte/Priest/High Priest Guide](https://tatarom.home.blog/2020/08/06/ro-mobile-acolyte-priest-high-priest/)
- [RO Mobile Merchant/Blacksmith/Whitesmith/Mechanic Guide](https://tatarom.home.blog/2020/03/21/ro-mobile-merchant-blacksmith-whitesmith-mechanic/)
- [ROX Alchemist Class Guide](https://www.bluestacks.com/blog/game-guides/ragnarok-x-next-generation/rox-alchemist-guide-en.html)
- [Super Novice Guide (StrategyWiki)](https://strategywiki.org/wiki/Ragnarok_Online/Supernovice), [Super Novice (iRO Wiki via RagnaPlace)](https://ragnaplace.com/en/wiki/irowiki/Super_Novice)
- ตารางอ้างอิง First/Second/Transcendent Second/Third/Fourth Class — ให้โดยผู้ใช้โดยตรง (ภาพตารางทางการ ไม่ใช่จากเว็บค้นหา)

## Chassis

| หัวข้อ | ค่า |
|---|---|
| Hit Die | d8 |
| Saving Throws | Dexterity, Constitution |
| Armor/Weapon Proficiency | เกราะเบา, อาวุธประเภท Simple (จะได้เพิ่มเติมตาม Job ที่เลือกตอนเลเวล 3 — ดู Job Paths) |
| Skill Proficiency | เลือก 2 จาก: Acrobatics, Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Persuasion, Stealth, Survival |
| Tool Proficiency | เลือก 1 จาก artisan's tools หรือ gaming set ใดก็ได้ |
| Primary Ability | กำหนดโดย Job (subclass) ที่เลือกตอนเลเวล 3 |

**อุปกรณ์เริ่มต้น**: อาวุธ simple 1 ชิ้น, เกราะหนัง, explorer's pack, และเงินเริ่มต้นตามมาตรฐาน (5e 2024)

**กติกากลางเรื่อง Save DC**: ทุกความสามารถในเอกสารนี้ที่ต้องใช้ saving throw DC ใช้สูตรเดียวกันเสมอ (เว้นแต่ระบุไว้เป็นอย่างอื่น): **DC = 8 + Proficiency Bonus + primary ability modifier ของ Job ที่เลือก**

## Level Progression

| เลเวล | Proficiency Bonus | Max Mana | Mana per day (= Pool × 3) | Feature |
|---|---|---|---|---|
| 1 | +2 | 2 | 6 | ได้ **STRIKE** + **First Aid** |
| 2 | +2 | 2 | 6 | ได้ **Play Dead** |
| 3 | +2 | 2 | 6 | **Job Change: Second Class** + เลือก Job Path Job Skill 2 อัน |
| 4 | +2 | 2 | 6 | Ability Score Improvement |
| 5 | +3 | 3 | 9 | **Extra Attack**|
| 6 | +3 | 3 | 9 | **Super Novice** — เลือก Job Path Job Skill เพิ่มอีก 1 อัน |
| 7 | +3 | 3 | 9 | **Job Change: Transcendent Second Class** |
| 8 | +3 | 3 | 9 | Ability Score Improvement |
| 9 | +4 | 4 | 12 | **ทุก Job Skill ที่ถืออยู่ → Rank 2** |
| 10 | +4 | 4 | 12 | **Ultra Super Novice** — Jack of All Trades |
| 11 | +4 | 4 | 12 | **Job Change: Third Class** |
| 12 | +4 | 4 | 12 | Ability Score Improvement |
| 13 | +5 | 5 | 15 | **ทุก Job Skill ที่ถืออยู่ → Rank 3** |
| 14 | +5 | 5 | 15 | **Elevated Novice** — เพิ่ม proficiency saving throw อีก 1 อัน |
| 15 | +5 | 5 | 15 | **Job Change: Fourth Class** |
| 16 | +5 | 5 | 15 | Ability Score Improvement |
| 17 | +6 | 6 | 18 | **ทุก Job Skill ที่ถืออยู่ → Rank 4 (เต็ม)** |
| 18 | +6 | 6 | 18 | **Hyper Novice** — Indomitable Will |
| 19 | +6 | 6 | 18 | Ability Score Improvement |
| 20 | +6 | 6 | 18 | **Extra Attack Improvement** |

> 🔄 **2026-08-23 (เปลี่ยน Multi Casting → Extra Attack)**: เดิม Multi Casting ให้ "ใช้ Track/skill เดิมซ้ำได้ 2-3 ครั้งใน 1 Action" (ปัญหาคือ Track แบบ "เพิ่มจำนวนตี" อย่าง Wind Cutter จะคูณกับตัวเองซ้ำเป็นทวีคูณ) — เปลี่ยนนิยามใหม่ทั้งหมดเป็นระบบ **Extra Attack**: เวลาใช้ Attack action คุณโจมตีได้ตามจำนวนครั้งที่กำหนด และ **แต่ละครั้งเลือกได้อิสระว่าจะโจมตีด้วยอาวุธปกติ หรือใช้ Job Skill ที่ระบุ Casting Time: Action แทนก็ได้** — ข้อจำกัดเดียว: **ห้ามใช้ Job Skill ชื่อเดียวกันซ้ำ 2 ครั้งขึ้นไปในเทิร์นเดียวกัน** (ต้องเป็น Job Skill คนละชื่อ หรือสลับกับการโจมตีปกติ)
>
> **Extra Attack (level 5)**: โจมตีได้ **2 ครั้ง** ต่อ Attack action — เช่น ใช้ Job Skill 2 อัน (คนละชื่อ), ใช้ Job Skill 1 อัน + โจมตีปกติ 1 ครั้ง, หรือโจมตีปกติ 2 ครั้งแบบเดิมก็ได้
> **Extra Attack Improvement (level 20)**: จำนวนครั้งเพิ่มเป็น **3 ครั้ง** ต่อ Attack action (กติกาเดียวกัน — ห้ามใช้ Job Skill ชื่อเดียวกันซ้ำในเทิร์นเดียวกัน)
>
> ⚠️ **ผลกระทบที่ต้องแก้ต่อ**: Job Skill ที่ระบุ Casting Time: Action ทุกอันตอนนี้ "ราคาโอกาส" ถูกลงมาก (เดิมใช้แล้วเสียทั้งเทิร์น ตอนนี้แค่เสีย 1 ใน 2-3 attack slot เท่านั้น ที่เหลือยังโจมตีต่อได้) ต้อง balance-pass ใหม่ทุก Job Skill ที่โดนผลนี้ — และ **Wind Cutter ("ทำ 2-3 การโจมตี" ต่อการใช้ 1 ครั้ง) ชนกับนิยาม Extra Attack ใหม่โดยตรง** เพราะตอนนี้ตัวคลาสเองมีกลไก "โจมตีได้หลายครั้ง" อยู่แล้วในระดับ baseline ต้องออกแบบ Wind Cutter ใหม่ (ไม่ใช่แค่ปรับตัวเลข) — ดูการตัดสินใจที่ [Knight.md](JobSkill/Knight.md)
>
> ดูรายละเอียดเต็มที่หัวข้อ [ระบบการเลือก/อัพเกรด Job Skill](#ระบบการเลือกอัพเกรด-job-skill-pick--upgrade-schedule) ด้านล่าง — สรุปสั้นๆ: Base Job Skill ทั้ง 3 อันได้อัตโนมัติไม่ต้องเลือก (Strike+First Aid ที่ lv1, Play Dead ที่ lv2), Job Path Job Skill เลือก 2 อันที่ lv3 + เพิ่มอีก 1 อันที่ lv20 (ไม่ auto-upgrade แล้วเพราะมาหลัง lv17), **ทุก Job Skill ที่ถืออยู่ ณ ตอนนั้น (ไม่ว่า Base หรือ Job Path) อัป Rank ขึ้นเองพร้อมกันหมดที่ lv9/13/17** ไม่มีแต้มให้เลือก ไม่มีจุดแข่งกัน — **ไม่มี Respec**
>
> 🔄 **2026-08-23 (rev. 2 — auto-upgrade ทั้งหมด, ตัดจุดหยิบที่ lv7/11/15 ออก)**: เปลี่ยนจากระบบ "จุดอัพเกรดแบบเลือกเอง ผูก cap กับ milestone" (rev. 1 ด้านล่าง) → **auto-upgrade ล้วนๆ ไม่มีจุดให้เลือกอีกเลย** ทุก Track ที่ถืออยู่ ณ ตอนนั้นอัป Rank พร้อมกันหมดที่ lv9/13/17 — ตัดปัญหา "Track ไหนไม่ได้อัปจะรู้สึกแย่" ออกไปทั้งหมดเพราะไม่มี Track ไหนถูกทิ้งอีกแล้ว (ยกเว้น Job Path Track ที่หยิบตอน lv20 ซึ่งตั้งใจให้ค้าง Rank 1 ตลอดไปเป็นของแถมท้ายสาย) — **lv7/11/15 ไม่ผูกกับ Track อีกต่อไป** เหลือแค่ Job Change (เปลี่ยนชื่อ tier) + subclass feature คงที่ที่จะออกแบบทีหลัง (ไม่ใช่ Track)
>
> 🔄 **2026-08-23 (rev. 1, ถูกแทนที่ด้วย rev. 2 แล้ว)**: เคยลองผูก cap ของ Rank กับ Job Change milestone (R1@lv3→R2@lv7→R3@lv11→R4@lv15) แล้วให้จุดอัพเกรดที่ lv9/10/13/14/17/18 (6 แต้ม) เลือกเองว่าจะอัป Track ไหน — พบว่า level 5/6 (จุดอัพเกรดเดิม) ใช้จริงไม่ได้เพราะ cap ยังไม่ขยับจนกว่าจะถึง lv7 เลยตัดออกไปก่อน ก่อนจะเปลี่ยนไปใช้ auto-upgrade ล้วนๆ ใน rev. 2 แทน

### Universal Chassis Feature (เลเวล 6/10/14/18)

นอกจาก Job Skill กับ Job Change แล้ว มี feature เสริมอีกชุดที่**ทุก Job ได้เหมือนกันหมด ไม่ผูกกับสายที่เลือก** วางไว้ 4 จุด (6/10/14/18) — ตั้งชื่อล้อกับมีม "Super Novice → Ultra Super Novice" ในคอมมูนิตี้ RO (ฉายาที่แฟนๆเรียกผู้เล่น Super Novice ระดับสูง) มาใช้เป็น flavor name เฉยๆ แม้ตัว feature จะใช้ได้กับทุก Job ไม่ใช่แค่สาย Super Novice ก็ตาม — เป็น idiom มาตรฐานของ 5e ทั้งหมด ไม่แตะ Mana Pool/Day Math เลย:

- **เลเวล 6 — Super Novice**: เลือก Job Path Job Skill เพิ่มอีก **1 อัน** จาก pool ของ Job ที่เลือกไว้ (Rank 1) — มาก่อนจุด auto-upgrade แรก (lv9) จึงตาม Rank ทันทุกจุดเหมือน 2 อันแรกจากเลเวล 3 (ดูรายละเอียดที่หัวข้อ [ระบบการเลือก/อัพเกรด Job Skill](#ระบบการเลือกอัพเกรด-job-skill-pick--upgrade-schedule))
- **เลเวล 10 — Ultra Super Novice**: บวก**ครึ่งหนึ่งของ Proficiency Bonus** (ปัดลง) เข้า ability check ใดก็ตามที่คุณยังไม่มี proficiency อยู่แล้ว (Jack of All Trades)
- **เลเวล 14 — Elevated Novice**: เลือกเพิ่ม proficiency ให้ saving throw ได้อีก **1 อัน** (นอกเหนือจาก Dexterity/Constitution ที่มีอยู่แล้วตั้งแต่ต้น)
- **เลเวล 18 — Hyper Novice**: **1 ครั้ง/Long Rest** เมื่อ saving throw พลาด เลือกให้สำเร็จแทนได้ (Indomitable Will)

**หมายเหตุ Mana** 🚧 (ยังไม่ final): pool = **Proficiency Bonus × 1** (universal ทุก Job, ไม่มี HP-swap) — ใช้จ่ายกับ Active Mastery Branch ที่ scale ได้ (เช่น Fire Bolt) — รายละเอียดเต็มเรื่อง cost/recovery ดูหัวข้อ [กฎการใช้ Mana](#กฎการใช้-mana-mana-usage-rules) ด้านล่าง
>
> 🔄 **2026-08-23**: ปรับจาก **เลเวล×2 → เลเวล×1** ตามคำสั่งตรง คู่กับการปรับทุก Track ของ [Knight.md](Knight.md#8-track-หลัก-passiveactionbonus-actionreaction) ให้เสีย mana 1 คงที่ทุก Rank — **⚠️ Day Math Sanity Check และตาราง reference ด้านล่างยังเป็นตัวเลขเก่าที่คำนวณจาก pool เดิม (เลเวล×2) อยู่ ยังไม่ได้ไล่คำนวณใหม่** โดยเฉพาะเลเวลสูง (9+) ที่ pool ยังโตเชิงเส้นตามเลเวลต่อไปแต่ท่าจะคงราคาที่ 1 mana เสมอ (ถ้า Job Path อื่นทำตาม pattern เดียวกับ Knight) อาจทำให้จำนวนครั้ง/วันเกินกรอบเป้าหมาย 6-10 ครั้ง/วันที่ตั้งไว้ — รอ balance pass รอบหน้า ขอบเขตการเปลี่ยนรอบนี้ยังจำกัดแค่ Knight เท่านั้น (Job Path อื่นที่ยังเป็นวัตถุดิบดิบยังไม่ได้แตะ) (ถูกแทนที่ด้วยรอบถัดไปด้านล่างแล้ว)
>
> 🔄 **2026-08-23 (รอบล่าสุด — เปลี่ยนไปผูกกับ Proficiency Bonus + ตัด Short Rest recovery)**: เปลี่ยนจาก **เลเวล×1 → Proficiency Bonus × 2** (pool = 4/6/8/10/12 ตามช่วงเลเวล 1-4/5-8/9-12/13-16/17-20) เพื่อไม่ให้ pool โตเชิงเส้นไม่มีเพดานเหมือนตอนผูกกับเลเวลตรงๆ — คู่กับการ **ตัด Short Rest recovery ออกจากระบบทั้งหมด** (เดิมคืน mana = PB ปัจจุบันตอน short rest) เปลี่ยนมาให้จุดคืนมานาระหว่างวันเป็นหน้าที่ของ Track **Play Dead** เพียงจุดเดียวแทน — ⚠️ ลองตั้งโควตา Play Dead ที่ **Proficiency Bonus ครั้ง/วัน** ก่อน พบว่า Day Math ไม่ผ่าน (โตแบบ quadratic ตาม PB) จึงแก้เป็นรอบถัดไปด้านล่างนี้แล้ว
>
> 🔄 **2026-08-23 (รอบถัดมา — ล็อกโควตา Play Dead ที่ 2 ครั้ง/วันคงที่ ไม่ผูกกับ PB)**: เปลี่ยนโควตา Play Dead จาก **Proficiency Bonus ครั้ง/วัน → 2 ครั้ง/วันคงที่ทุกเลเวล** (สะท้อนธีม "จำนวนรอบพักระหว่างวัน" แบบ 5e มาตรฐาน 2 short rest/วัน แทนที่จะสเกลตามพลัง) — ทำให้ Total mana/วัน = Pool × 3 (โตเชิงเส้นตาม Pool ล้วนๆ ไม่ใช่ quadratic แล้ว) ผ่าน Day Math สมเหตุสมผลกว่าเดิมมาก ดูตาราง reference ที่แก้แล้วด้านล่าง
>
> 🔄 **2026-08-23 (ล่าสุด — กลับไป Proficiency Bonus × 1 ตามคำสั่งตรงจากผู้ใช้)**: เปลี่ยนจาก **Proficiency Bonus × 2 → Proficiency Bonus × 1** (pool = 2/3/4/5/6 ตามช่วงเลเวล 1-4/5-8/9-12/13-16/17-20 — ตรงกับค่า Proficiency Bonus เป๊ะ) — สะท้อนเข้า [Novice.md](../Novice.md) แล้ว (ไฟล์ class หลักที่ compile จาก draft นี้) ตาราง reference/Day Math ด้านล่างคำนวณใหม่ตามค่านี้แล้ว — ⚠️ **ยังไม่ได้ตรวจ Day Math ใหม่กับราคา mana จริงของ First Aid ที่ Rank สูง** (Rank 4 ที่ lv17 ราคา 4 mana แต่ pool มีแค่ 6 — เหลือพื้นที่ใช้ได้จำกัดมากต่อ 1 pool) รอ balance pass รอบหน้าถ้าต้องการ

### กฎการใช้ Mana (Mana Usage Rules)

> กฎกลางที่ใช้ได้กับทุกสาย/ทุก tier — ล็อกไว้แล้วหลังทดลองตั้งราคาจริงกับ Swordsman/Knight tier (ดู [Knight.md](Knight.md#dd-feature-draft--swordsman-1st-class)) ครั้งต่อไปที่แปลงสกิลสายอื่น ให้ใช้ cost band + sanity check ด้านล่างนี้แทนการคำนวณ balance ใหม่ตั้งแต่ต้น

**Pool & Recovery**
- Pool = **Proficiency Bonus × 1** (universal ทุก Job) — 🔄 2026-08-23: กลับไปที่ PB×1 ตามคำสั่งตรงจากผู้ใช้ (เคยผ่าน PB×2 มาก่อน ดู revision note ด้านบน)
- Long Rest: คืนเต็ม pool เสมอ
- **ไม่มี Short Rest recovery แล้ว** (เดิมคืน mana = Proficiency Bonus ปัจจุบันตอน short rest — ตัดออกทั้งกฎ) — จุดคืนมานาระหว่างวันจุดเดียวที่เหลืออยู่คือ Job Skill **Play Dead** (Novice-Base, ทุกตัวละครได้ตั้งแต่ level 2): คืนเต็ม pool ต่อการใช้ 1 ครั้ง ใช้ได้ **2 ครั้ง/วันคงที่ทุกเลเวล** (ไม่ผูกกับ Proficiency Bonus แล้ว — ดู revision note ด้านบน) เท่ากันทุก Rank ไม่ scale — ดู [Novice-Base.md](Novice-Base.md#dd-feature-draft--novice-base-job)
- Feature อื่นนอกจาก Play Dead ยังห้ามออกแบบให้คืน mana เต็ม pool เด็ดขาด (Play Dead คือข้อยกเว้นเดียวที่อนุญาตไว้แล้วโดยตั้งใจ จำกัดด้วยโควตา 2 ครั้ง/วัน) — อนุญาตให้มี feature เฉพาะจุดที่คืน mana เพิ่มได้เป็นชั้นเสริมเล็กๆ (เช่น Fatal Blow คืน 1 mana ตอน proc) แต่ต้องผูกกับเงื่อนไขในเกม (โจมตีสำเร็จ/ฆ่า) ไม่ใช่ auto

**Cost Bands ตามประเภทท่า** (baseline — ปรับได้ตามความแรงจริงของแต่ละท่า ไม่ใช่กฎตายตัว 100%)

| ประเภทท่า | Cost แนะนำ | เหตุผล |
|---|---|---|
| ท่าโจมตีหลัก/สัญลักษณ์ประจำ Job (แทน auto-attack) | **0** | ต้องมีอย่างน้อย 1 ท่าแบบนี้เสมอต่อ Job — กันไม่ให้ตัวละครทำอะไรไม่ได้เลยเมื่อ mana หมด (ไม่ควรอ่อนแอกว่า Fighter เปล่าๆ) |
| Bonus Action / Reaction ระยะสั้น (จบเทิร์นนี้-เทิร์นหน้า) หรือ rider เสริมท่าฟรีด้านบน | **1** (floor ต่ำสุดตามกติกา "ทุกท่าที่ใช้ต้องจ่ายอย่างน้อย 1 mana") | บัฟตัวเอง/ดีบัฟเดี่ยว/ดีเฟนส์ชั่วคราว/เอฟเฟกต์เสริม เช่น สตันต่อ Bash |
| Action หลักที่เป็น AoE หรือเอฟเฟกต์ที่อยู่ยาว 1 นาทีขึ้นไป | **2** | แรงกว่าปกติทั้งดาเมจกว้างขึ้นและ/หรือระยะเวลานานขึ้น |
| Capstone/signature ของ tier สูง (Transcendent ขึ้นไป) | **3+** | สงวนไว้ ยังไม่เคยใช้จริงในทัวร์ Swordsman/Knight |
| Passive (trigger อัตโนมัติ ไม่ใช่ตัวเลือกที่กดใช้กลางคัน) | **0 เสมอ ไม่มีข้อยกเว้น** | ทริกเกอร์จากจบ short rest/โจมตีสำเร็จ ไม่ใช่ action economy ของผู้เล่น — เก็บ mana ซ้ำจะเหมือนหักภาษีซ้อนสอง |

**Upcast Cap**: ท่าที่ให้ upcast ได้ (จ่าย mana เพิ่มระหว่างใช้เพื่อเพิ่มดาเมจ/เอฟเฟกต์ เช่น Magnum Break จ่ายเพิ่ม 1 mana ต่อ +1d6) จำนวนครั้งที่ upcast ได้ต่อการใช้ 1 ครั้ง **cap ไว้ที่ Proficiency Bonus ปัจจุบัน** (เช่น level 3 Prof +2 → upcast ได้สูงสุด 2 ครั้ง, level 7 Prof +3 → สูงสุด 3 ครั้ง) — กันไม่ให้ mana pool ที่โตเร็วกว่าดาเมจ base (pool เพิ่มเชิงเส้นตามเลเวล แต่ damage cap ควรโตช้ากว่า) ถูกอัดลงท่าเดียวจนดาเมจพุ่งเกินตัว

**Day Math Sanity Check** (เช็คทุกครั้งก่อนล็อกราคาใหม่ของสายอื่น)

Total mana ต่อวัน ≈ Pool (Long Rest) + (**2 ครั้ง/วันคงที่** × Pool เพราะ Play Dead คืนเต็ม pool ทุกครั้ง) = Pool × 3 หารด้วย avg cost ของท่า active ที่ตั้งใจไว้ ควรได้ **6-10 ครั้ง/วัน** (ใกล้เคียงจำนวน encounter ที่ 5e คาดหวังต่อวัน) — ต่ำกว่านี้มาก = แพงไป, สูงกว่า ~15 = ถูกไปจนไม่รู้สึกเป็น resource

ตาราง reference สำเร็จรูปต่อช่วงเลเวล (คำนวณไว้แล้ว ใช้แทนได้เลย):

> 🔄 **2026-08-23**: ตารางนี้คำนวณใหม่ทั้งหมดตาม Pool = PB×1 ที่ล็อกล่าสุดแล้ว (เดิมคำนวณจาก PB×2 — ดู revision note ที่หัวข้อ [Universal Chassis Feature](#universal-chassis-feature-เลเวล-61014-18) ด้านบน)

| เลเวล | Pool (PB×1) | Play Dead เต็มโควตา/วัน | Total Mana/วัน (Pool × 3) | avg cost เป้าหมาย (ที่ 6-10 ครั้ง/วัน) |
|---|---|---|---|---|
| 1-4 | 2 | 2 | 6 | 0.6-1 |
| 5-8 | 3 | 2 | 9 | 0.9-1.5 |
| 9-12 | 4 | 2 | 12 | 1.2-2 |
| 13-16 | 5 | 2 | 15 | 1.5-2.5 |
| 17-20 | 6 | 2 | 18 | 1.8-3 |

⚠️ **ยังไม่ผ่าน sanity check เต็มรูปแบบหลังกลับไป PB×1**: Total Mana/วันยังโต**เชิงเส้นตาม Pool** เหมือนเดิม (×3 คงที่ทุกเลเวล) แต่ avg cost เป้าหมายที่ 6-10 ครั้ง/วันตอนนี้แคบลงมาก โดยเฉพาะช่วงเลเวลต้น (1-4) ที่เหลือแค่ ~0.6-1 ต่อครั้ง ซึ่ง**ต่ำกว่า floor ขั้นต่ำ 1 mana/ท่าที่กติกา Cost Bands ด้านบนกำหนดไว้** (ทุกท่าที่ไม่ใช่ signature attack ฟรี/passive ต้องจ่ายอย่างน้อย 1 mana) — เท่ากับว่าเลเวลต้นเล่นได้จริงแค่ ~6 ครั้ง/วัน (ต่ำกว่ากรอบ 6-10 ที่ตั้งไว้พอดีที่ขอบล่าง) และ **First Aid ที่ Rank สูง (4 mana ที่ lv17, pool มีแค่ 6) แทบใช้ไม่ได้ 2 ครั้งต่อ pool เดียว** — จุดนี้ยังไม่ได้ balance pass ใหม่ รอผู้ใช้ยืนยันว่าจะยอมรับตัวเลขนี้หรือปรับราคา Job Skill ให้ต่ำลงตาม

**หมายเหตุจังหวะ**: เลเวล 3/7/11/15 คือ "Job Change" milestone ใหญ่ 4 จุด **ข้าม First Class เป็น mechanical step ไปเลย** แมปตรงกับ 4 tier ที่เหลือของ RO (Second Class → Transcendent Second Class → Third Class → Fourth Class — ดูตาราง [ROX Job Tree Reference](#rox-job-tree-reference-ทางการ) ด้านล่าง) เลือกจังหวะนี้เพื่อไม่ให้ทับเลเวล ASI/Epic Boon (4/8/12/16/19) เลย — lv3 ยังทำหน้าที่เลือก Job Path Job Skill ด้วย ส่วน lv7/11/15 เหลือแค่ Job Change + subclass feature (รอออกแบบ) ไม่ผูกกับ Job Skill แล้ว — Job Skill ทั้งหมดอัป Rank อัตโนมัติพร้อมกันที่ **lv9/13/17** แทน (ดูหัวข้อ [ระบบการเลือก/อัพเกรด Job Skill](#ระบบการเลือกอัพเกรด-job-skill-pick--upgrade-schedule) ด้านล่าง) ส่วน level 5 ได้ Extra Attack, level 6/10/14/18 ได้ **Universal Chassis Feature** (Super Novice / Ultra Super Novice / Elevated Novice / Hyper Novice — ดูหัวข้อด้านบน) โดยเลเวล 6 เป็นจุดเลือก Job Path Job Skill เพิ่มอีก 1 อันด้วย (จุดสุดท้ายที่หยิบ Job Path Job Skill — ไม่มีจุดหยิบที่ level 20 อีกต่อไป ดู revision note ที่หัวข้อ [ระบบการเลือก/อัพเกรด Job Skill](#ระบบการเลือกอัพเกรด-job-skill-pick--upgrade-schedule)), level 20 ได้แค่ **Extra Attack Improvement**

> 🚧 ระบบ Mastery Branch (เดิมอยู่ที่ Mastery-Branches.md) ถูกลบไปแล้ว รอออกแบบใหม่ทั้งจังหวะ Mastery Point และเนื้อหา pool ให้ตรงกับตารางเลเวลนี้ก่อนใช้งานจริง

## ระบบการเลือก/อัพเกรด Job Skill (Pick & Upgrade Schedule)

> 🔄 **2026-08-23**: เปลี่ยนเป็น**ระบบ auto-upgrade ล้วนๆ** — ตัดจุด "อัพเกรดแบบเลือกเอง" ออกทั้งหมด แทนที่ด้วยจุด auto ที่ตายตัว 3 จุด (lv9/13/17) ที่อัป Rank ให้ **ทุก Track ที่ถืออยู่พร้อมกันหมด** ไม่ต้องเลือก ไม่มีแต้มให้บริหาร (ดูประวัติการเปลี่ยนแปลงที่หมายเหตุใต้ตาราง [Level Progression](#level-progression)) — **Respec ยังคงไม่มี**: Track ที่เลือกไว้แล้ว (Job Path ที่ lv3/lv20) เปลี่ยนใจทีหลังไม่ได้
>
> 🔄 **2026-08-23 (เพิ่มจุดเลือกที่ lv6 — Super Novice)**: เติม level 6/10/14/18 ที่เคยว่างเป็น "-" ด้วยชุด **Universal Chassis Feature** (ดูหัวข้อ [Universal Chassis Feature](#universal-chassis-feature-เลเวล-61014-18) ใต้ตาราง Level Progression) — เลเวล 6 ("Super Novice") กลายเป็นจุดเลือก Job Path Track เพิ่มอีก 1 อันของจริง (ไม่ใช่เศษข้อความเก่าที่ตกหล่นจาก rev.1 อย่างที่เข้าใจไว้ก่อนหน้า) ทำให้ Job Path Track รวมเพิ่มจาก 3 → **4 อัน** (Track รวมทั้งสายเพิ่มจาก 6 → **7 อัน**) — เลเวล 10/14/18 ที่เหลือได้ Jack of All Trades / เพิ่ม saving throw proficiency / Indomitable Will ตามลำดับ ทั้งหมดเป็น idiom มาตรฐาน 5e ไม่แตะ Mana Pool/Day Math
>
> 🔄 **2026-08-23 (เปลี่ยนชื่อระบบ Track → Job Skill)**: เปลี่ยนคำศัพท์ "Track" เป็น "Job Skill" ทั่วทั้งเอกสาร (รวมชื่อหัวข้อนี้) ตามคำสั่งตรงจากผู้ใช้ — ให้ตรงกับคำที่ใช้ใน [Novice.md](../Novice.md) (ไฟล์ class หลัก) และ [JobSkill Planning/Novice.md](../JobSkill%20Planning/Novice.md) ที่เรียกแต่ละความสามารถว่า Job Skill อยู่แล้ว กลไกเดิมทุกอย่างเหมือนเดิมทุกประการ (Rank 1-4, auto-upgrade ที่ lv9/13/17, pick schedule lv3/6/20) — เปลี่ยนแค่ชื่อเรียก ข้อความใน revision log ที่มีวันที่ก่อนหน้าโน้ตนี้ (2 ก้อนด้านบน) ยังคงคำว่า "Track" ไว้ตามเดิมโดยตั้งใจ เพื่อรักษาความถูกต้องของบันทึกประวัติการตัดสินใจ ณ ตอนนั้น

**Base Job Skill (3 อัน, ไม่ต้องเลือก)**: ได้อัตโนมัติทั้ง 3 อันจาก [Novice-Base.md](Novice-Base.md) — **Strike + First Aid ที่ level 1**, **Play Dead ที่ level 2** — ไม่มีการเลือก/แข่งกันอีกต่อไป ทุกตัวละคร Novice ได้เหมือนกันหมด (ตัด Tame Pet ออกจากสโคปแล้ว ไม่ใช้งาน)

> 🔄 **2026-08-23 (ตัด Level 20 pick ออก)**: เดิมมีจุดเลือก Job Path Job Skill เพิ่มอีก 1 อันที่ level 20 (ค้าง Rank 1 ตลอดไปเพราะมาหลัง auto-upgrade จุดสุดท้าย) — **ตัดออกตามคำสั่งตรงจากผู้ใช้** ตอนนี้ Job Path Job Skill มีแค่ **3 อัน** (เลือกที่ lv3×2 + lv6×1) ไม่มีจุดหยิบที่ lv20 อีกต่อไป level 20 เหลือแค่ **Extra Attack Improvement** อย่างเดียว (ดู [Level Progression](#level-progression)) — Job Skill รวมทั้งสายตอนนี้เหลือ **6 อัน** (Base 3 + Job Path 3) และ**ทุกอันถึง Rank 4 พร้อมกันหมดที่ lv17** ไม่มี Job Skill ไหนค้าง Rank 1 อีกแล้ว

**Job Path Job Skill (3 อัน ตลอดสาย)**:
- **Level 3**: เลือก **2 อัน** จาก Job Skill pool ของ Job Path ที่เลือกไว้ (ดูไฟล์ fork แต่ละสาย เช่น [Knight.md](Knight.md)) เริ่มที่ Rank 1
- **Level 6 (Super Novice)**: เลือกเพิ่มอีก **1 อัน** จาก pool เดียวกัน (Rank 1) — มาก่อนจุด auto-upgrade แรก (lv9) จึงตาม Rank ทันทุกจุดเหมือน 2 อันแรกจากเลเวล 3

**จุด Auto-Upgrade (3 จุด)**: level **9, 13, 17** — **ทุก Job Skill ที่ถืออยู่ ณ ตอนนั้น** (Base ทั้ง 3 + Job Path ที่หยิบไว้ตอน lv3/lv6) อัป Rank ขึ้น 1 ขั้นพร้อมกันหมดโดยอัตโนมัติ ไม่ต้องเลือก ไม่มีแต้ม:

| Level | Rank ที่ได้ |
|---|---|
| 3 (หยิบ) | Rank 1 |
| 9 | Rank 2 |
| 13 | Rank 3 |
| 17 | Rank 4 (เต็ม) |

Job Skill ทั้งหมด (Base 3 + Job Path 3 จาก lv3×2 + lv6×1) จะถึง **Rank 4 พร้อมกันหมดตอน lv17** แน่นอน 100% — ไม่มี Job Skill ไหนถูกทิ้งร้างหรือแข่งแย่งกันอีกต่อไป และไม่มี Job Skill ไหนค้าง Rank 1 อีกแล้ว

**ผลรวมทั้งสาย**: Job Skill รวมทั้งหมด **6 อัน** (Base 3 + Job Path 3) — จบที่ **Rank 4 เต็มทุกอันการันตี** ที่ level 17

## Job Paths

Novice เลือก Job (subclass) ตอนเลเวล 3 จากทั้งหมด 7 สาย (6 สายหลัก + Super Novice) — **ข้าม First Class ไปเลย** แต่ละสายมี milestone ใหญ่ที่เลเวล 3/7/11/15 ตรงกับ Second/Transcendent Second/Third/Fourth Class ตามตาราง Level Progression ด้านบน (เนื้อหารายละเอียดของแต่ละสายยังไม่ได้เขียน รอออกแบบใหม่)

**เพิ่มเติม**: นอกจาก feature ตายตัวของแต่ละ Job แล้ว เดิมมีระบบ Mastery Branches — pool เทคนิคเสริมที่ล็อกด้วยเงื่อนไข Job+Level (เช่น "Knight 7+") ให้เลือกเก็บสะสมได้ตลอดทาง ทำหน้าที่แทน spell list ของ full caster — **ระบบนี้ถูกลบไปแล้วรอออกแบบใหม่** ให้ตรงกับแนวทาง "ข้าม First Class เป็น mechanical step" ที่ตกลงล่าสุด (First Class เดิมของแต่ละสายจะเข้าถึงได้ผ่าน Mastery Branch แทน ไม่ใช่ subclass feature ตายตัว)

### ROX Job Tree Reference (ทางการ)

ตารางอ้างอิงที่ผู้ใช้ให้มา — ใช้เป็นแหล่งความจริงหลักสำหรับชื่อ tier ของ 6 สายหลัก:

| Novice | First Class | Second Class | Transcendent Second Class | Third Class | Fourth Class |
|---|---|---|---|---|---|
| Novice | Swordsman | Knight | Lord Knight | Rune Knight | Dragon Knight |
| | | Crusader | Paladin | Royal Guard | Imperial Guard |
| | Mage | Wizard | High Wizard | Warlock | Arch Mage |
| | | Sage | Scholar | Sorcerer | Elemental Master |
| | Merchant | Blacksmith | Mastersmith | Mechanic | Meister |
| | | Alchemist | Biochemist | Geneticist | Biolo |
| | Acolyte | Priest | High Priest | Arch Bishop | Cardinal |
| | | Monk | Champion | Sura | Inquisitor |
| | Thief | Assassin | Assassin Cross | Guillotine Cross | Shadow Cross |
| | | Rogue | Stalker | Shadow Chaser | Abyss Chaser |
| | Archer | Hunter | Sniper | Ranger | Windhawk |
| | | Bard/Dancer* | Minstrel/Gypsy* | Maestro/Wanderer* | Troubadour/Trouvere* |
| | **Super Novice** (ไม่ผ่าน tree ปกติ) | — | — | — | — |

*ในเกมจริงชื่อฝั่ง Bard เพศชาย/Dancer เพศหญิงต่างกัน — เอกสารนี้ใช้เป็นตัวเลือก playstyle อิสระ ไม่ผูกกับเพศตัวละคร

**Fourth Class อยู่ในสโคปแล้ว**: milestone ทั้ง 4 จุด (3/7/11/15) ของ class นี้แมปตรงกับ 4 คอลัมน์ที่เหลือในตารางหลังข้าม First Class (Second Class → Transcendent Second Class → Third Class → **Fourth Class**) พอดี — Fourth Class คือ "Job Change: Fourth Class" ที่เลเวล 15 (capstone ของแต่ละสาย) ไม่ใช่แค่ชื่อสำรองอีกต่อไป

### ROX Skill Reference (แต่ละ Job มี skill อะไรบ้าง)

รวบรวม skill จริงต่อ Job tier ไว้เป็นวัตถุดิบสำหรับออกแบบ feature ของแต่ละ Job Path ทีหลัง — **ยึดตาม ROX เป็นหลัก** ตามที่ระบุ แต่ ROX สืบทอด skill ส่วนใหญ่มาจาก RO classic (skill ชื่อเดียวกันในหลายเวอร์ชัน) จึงอ้างอิง RO classic database (ratemyserver, iRO Wiki, Divine Pride, Ragnarok Fandom Wiki, renewal.playragnarok.com) เสริมในจุดที่หาข้อมูล ROX โดยตรงไม่ได้ — **ครบทั้ง 12 สายย่อย ทุก tier รวม Fourth Class แล้ว** (อัปเดตล่าสุด: ปิดช่องว่างเดิมของ Shadow Cross, Abyss Chaser, Biolo, Scholar, Elemental Master ครบแล้ว) **และเพิ่ม 1st Class (Swordsman/Mage/Acolyte/Thief/Archer/Merchant เอง ก่อนเปลี่ยนอาชีพ) ที่เคยขาดไปครบทั้ง 6 สายแล้วเช่นกัน**

> **แยกเป็นไฟล์ต่อ fork** (12 ไฟล์ — 1 ไฟล์ต่อ 1 Second Class ขึ้นไป) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ — ดีไซน์ปัจจุบันข้าม First Class เป็น mechanical step แล้ว (เลือกตรงเป็น Second Class ตั้งแต่เลเวล 3) จึงแตกจาก 6 ไฟล์รวมเดิมเป็น 12 ไฟล์นี้ แต่ละคู่ fork ยังเก็บตาราง First Class เดิมไว้ซ้ำกันทั้งสองไฟล์เป็นวัตถุดิบ Mastery Branch — คำอธิบายเป็นการสรุปคร่าวๆจากชื่อ/ข้อมูลที่ค้นเจอ ไม่ใช่ตัวเลขบาลานซ์จริง ดูหมายเหตุการแก้ไขชื่ออาชีพที่คลาดเคลื่อนจากตาราง [ROX Job Tree Reference](#rox-job-tree-reference-ทางการ) ด้านบนในแต่ละไฟล์ที่เกี่ยวข้อง (Sage.md, Monk.md, Bard.md, Blacksmith.md, Alchemist.md)

- Swordsman → [Knight.md](Knight.md) (Knight → Lord Knight → Rune Knight → Dragon Knight) / [Crusader.md](Crusader.md) (Crusader → Paladin → Royal Guard → Imperial Guard)
- Mage → [Wizard.md](Wizard.md) (Wizard → High Wizard → Warlock → Arch Mage) / [Sage.md](Sage.md) (Sage → Professor → Sorcerer → Elemental Master)
- Acolyte → [Priest.md](Priest.md) (Priest → High Priest → Archbishop → Cardinal) / [Monk.md](Monk.md) (Monk → Champion → Shura → Inquisitor)
- Thief → [Assassin.md](Assassin.md) (Assassin → Assassin Cross → Guillotine Cross → Shadow Cross) / [Rogue.md](Rogue.md) (Rogue → Stalker → Shadow Chaser → Abyss Chaser)
- Archer → [Hunter.md](Hunter.md) (Hunter → Sniper → Ranger → Wind Hawk) / [Bard.md](Bard.md) (Bard → Clown → Minstrel → Troubadour)
- Merchant → [Blacksmith.md](Blacksmith.md) (Blacksmith → Whitesmith → Mechanic → Meister) / [Alchemist.md](Alchemist.md) (Alchemist → Creator → Genetic → Biolo)

### สาขาย่อยในแต่ละสาย (สรุปรวมทั้ง 12 สาย)

ไล่ดู skill data จริงในแต่ละไฟล์ fork แล้วพบว่าเกือบทุกสายซ่อนสาขาย่อยไว้ 2-4 ทาง (แยกตามอาวุธ/สไตล์ที่ skill require หรือแยกตามธาตุ) — เก็บสรุปไว้เป็นวัตถุดิบสำหรับตอน curate Mastery Branch pool จริง รายละเอียดเต็มอยู่ในหัวข้อ "สาขาย่อยในสายนี้" ของแต่ละไฟล์

| Job Path | สาขาย่อย | จุดเด่น |
|---|---|---|
| [Knight.md](Knight.md) | ดาบสองมือ | Crit/burst หนัก (Aura Blade, Bowling Bash AoE, Storm Slash) |
| | หอก + ขี่ม้า/มังกร (Cavalry) | โจมตีเดี่ยวระยะไกล + mobility (Brandish Spear, Spiral Pierce, Dragon Breath ตอน 4th) |
| | ดาบ/หอก + โล่ | สายตอบโต้/แทงค์ (Auto Counter, Weapon Blocking, Rune Shield) |
| [Crusader.md](Crusader.md) | ดาบสองมือ | ดูดเลือดตัวเอง/บั่นทอนแลกดาเมจ (Sacrifice, Cyclone Strike, Fearless Charge) |
| | หอกสองมือ (Holy) | AoE ศักดิ์สิทธิ์ เล่นคล้ายนักบวชสายรบ (Holy Cross, Grand Cross, Moon Slasher) |
| | โล่ | แทงค์/ซัพพอร์ตปาร์ตี้ (Shield Charge, Guard, Devotion, Ultimate Sacrifice) |
| [Wizard.md](Wizard.md) | ไฟ | เบิร์น/DoT สะสม (Fire Ball, Kindle, All Bloom, Conflagration) |
| | น้ำ | คุมฝูง/แช่แข็ง (Storm Gust, Frost Nova, Diamond Dust) |
| | ลม | Chain/knockback เป็นกลุ่ม (Jupitel Thunder, Lord of Vermilion, Chain Lightning) |
| | ดิน | หมุดเดี่ยวกลายหิน (Heaven's Drive, Earth Spike, Earth Strain) |
| | Ghost/Neutral | ดาเมจเดี่ยวใส่อันเดตโดยเฉพาะ (Soul Strike, Soul Expansion, Napalm Vulcan) |
| [Sage.md](Sage.md) | Battle Mage (Book melee) | ตีประชิดด้วยเวทมนตร์ (Advanced Book, Spell Fist, Striking) |
| | Field Control | คุมพื้นที่ต่อเนื่องด้วยสนามธาตุ (Elemental Field, Elemental Mark, Element Bonus) |
| | Spirit Summoner | เรียกวิญญาณธาตุมาเป็นโล่/ตัวช่วยดาเมจ (Summon Spirit, Spirit Possession, Elemental Action) |
| [Priest.md](Priest.md) | Healer/Support บริสุทธิ์ | รักษา/บัฟปาร์ตี้ (Heal, Sanctuary, Coluceo Heal, Resurrection) |
| | Holy Nuker | ดาเมจศักดิ์สิทธิ์ต้านอันเดต/ปีศาจ (Judex, Magnus Exorcismus, Adoramus) |
| | Mace Melee | ตีประชิดเสริมพลังศักดิ์สิทธิ์ (Holy Strike, Expiatio, Sacred Hammer) |
| [Monk.md](Monk.md) | Heavy Knuckle Combo | คอมโบต่อเนื่องแล้วปิดจ๊อบด้วย Asura Strike (Triple Attack → Raging Quadruple Blow → Combo Finish) |
| | Light Knuckle Spirit Spam | ยิง Spirit Sphere ระยะไกลต่อเนื่อง (Finger Offensive, Blade Stop, Tiger Cannon) |
| [Assassin.md](Assassin.md) | Dual Dagger Poison | DoT พิษสะสม + ลอบโจมตีจาก Hiding (Enchant Poison, Venom Spreader, Assassination mark) |
| | Katar | Crit burst ตรงไปตรงมา (Sonic Blow, Soul Destroyer, Advanced Katar Mastery) |
| [Rogue.md](Rogue.md) | Dagger Melee | โจมตีประชิด/ขโมยค่าสเตตัส (Back Stab, Raid, Snatcher) |
| | Bow Ranged | ยิงธนูผสมพิษระยะไกล (Assault, Double Strafe, Ranged Toxic Attack) |
| | Utility/Debuff | Strip อุปกรณ์ศัตรู, ขโมยสกิล, กับดักมิติ (Strip Weapon/Armor, Plagiarism, Dimension Door) |
| [Hunter.md](Hunter.md) | Trapper | คุมพื้นที่ด้วยกับดักธาตุต่างๆ (Ankle Snare, Freezing Trap, Claymore Trap, Land Mine) |
| | Falcon Pet | เหยี่ยวโจมตีเสริมดาเมจ (Blitz Beat, Falcon Assault, Steel Crow) |
| | Direct-Shot Burst | ยิงนัดเดียวแรง (Focused Shot, Sharp Shooting, Aimed Bolt) |
| | Warg Mount (Ranger) | ขี่หมาป่าลุยประชิด-ไกลผสม (Warg Strike, Warg Bite, Prowling Wolf) |
| [Bard.md](Bard.md) | Solo Buffer | บัฟปาร์ตี้คนเดียว (The Apple of Idun, Assassin Cross of Sunset, A Poem of Bragi) |
| | Ensemble | บัฟ/ดีบัฟแรงขึ้นเมื่อจับคู่กับนักดนตรีอีกคน (Lullaby, March of Prontera, Eternal Chaos) |
| | Instrument Damage | โจมตีด้วยเครื่องดนตรี (Musical Strike, Arrow Vulcan, Rose Blossom) |
| [Blacksmith.md](Blacksmith.md) | Cart Melee | ตีด้วยรถเข็น (Cart Revolution, Cart Blitz, Cart Termination) |
| | Zeny Nuker | จ่ายเงินแลกดาเมจ (Mammonite, Hurl Zeny, Zeny Storm) |
| | Mado Gear Pilot | ขับหุ่นยนต์ยิงโดรน/ABR (Mechanic/Meister: Vulcan Arm, ABR - Battle Warrior/Dual Cannon) |
| [Alchemist.md](Alchemist.md) | Homunculus Summoner | เลี้ยงเพ็ท 4 แบบ (Lif/Amistr/Vanilmirth/Filir), Homunculus Upgrade, Life Fusion |
| | Bomb Thrower | ปาระเบิด/กรด AoE DoT (Demonstration, Acid Terror, Acid Demonstration, Spore Explosion) |
| | Cart Cannon Artillery | ปืนใหญ่ระยะไกล (Genetic tier: Cart Cannon, Heavy Cannon) |

**สรุปภาพรวม**: เฉลี่ย ≈ 2.75 สาขาย่อยต่อสาย (Wizard เยอะสุด 5 สาขาเพราะแยกตามธาตุ, ส่วนใหญ่สายอื่น 2-3 สาขาแยกตามอาวุธ/สไตล์) — แต่ละสาขาย่อยอาจกลายเป็น "ชุด Mastery" ที่เลือกเน้นได้ตอน curate จริง ไม่บังคับต้องเลือกสาขาเดียวตายตัว
