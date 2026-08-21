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

| เลเวล | Proficiency Bonus | Mana | Feature |
|---|---|---|---|
| 1 | +2 | 2 | - |
| 2 | +2 | 4 | - |
| 3 | +2 | 6 | **Job Change: Second Class** |
| 4 | +2 | 8 | Ability Score Improvement |
| 5 | +3 | 10 | - |
| 6 | +3 | 12 | - |
| 7 | +3 | 14 | **Job Change: Transcendent Second Class** |
| 8 | +3 | 16 | Ability Score Improvement |
| 9 | +4 | 18 | - |
| 10 | +4 | 20 | - |
| 11 | +4 | 22 | **Job Change: Third Class** |
| 12 | +4 | 24 | Ability Score Improvement |
| 13 | +5 | 26 | - |
| 14 | +5 | 28 | - |
| 15 | +5 | 30 | **Job Change: Fourth Class**  |
| 16 | +5 | 32 | Ability Score Improvement |
| 17 | +6 | 34 | - |
| 18 | +6 | 36 | - |
| 19 | +6 | 38 | Ability Score Improvement |
| 20 | +6 | 40 | - |

**หมายเหตุ Mana** 🚧 (ยังไม่ final): pool = **เลเวล × 2** (universal ทุก Job, ไม่มี HP-swap) — เปลี่ยนจากสูตรเดิม (สะสม Proficiency Bonus) เป็นสูตรเชิงเส้นตรงไปตรงมา เข้าใจง่าย ไล่จาก 2 (lv 1) ถึง 40 (lv 20) ใช้จ่ายกับ Active Mastery Branch ที่ scale ได้ (เช่น Fire Bolt) — **cost curve ต่อการใช้ยังไม่ตกลง** (รอออกแบบระบบ Mastery Branch ใหม่ก่อนสรุป — ดูหมายเหตุด้านล่าง) ฟื้นเต็มตอน Long Rest, Short Rest คืนบางส่วน (สัดส่วนยังไม่ระบุ)

**หมายเหตุจังหวะ**: เลเวล 3/7/11/15 คือ "Job Change" milestone ใหญ่ 4 จุด **ข้าม First Class เป็น mechanical step ไปเลย** แมปตรงกับ 4 tier ที่เหลือของ RO (Second Class → Transcendent Second Class → Third Class → Fourth Class — ดูตาราง [ROX Job Tree Reference](#rox-job-tree-reference-ทางการ) ด้านล่าง) เลือกจังหวะนี้เพื่อไม่ให้ทับเลเวล ASI/Epic Boon (4/8/12/16/19) เลย — เลเวลอื่นทั้งหมด (1/2/5/6/9/10/13/14/17/18/20) ยังไม่กำหนด feature ไว้ ("-") รอออกแบบเพิ่มทีหลัง (ทั้ง Class Features พื้นฐานของ Novice เองและเนื้อหา Job Paths แต่ละสาย ถูกลบออกไปแล้วเพื่อออกแบบใหม่ให้ตรงจังหวะนี้)

> 🚧 ระบบ Mastery Branch (เดิมอยู่ที่ Mastery-Branches.md) ถูกลบไปแล้ว รอออกแบบใหม่ทั้งจังหวะ Mastery Point และเนื้อหา pool ให้ตรงกับตารางเลเวลนี้ก่อนใช้งานจริง

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
