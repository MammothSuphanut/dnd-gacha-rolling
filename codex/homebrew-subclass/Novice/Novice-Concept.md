# Class: Novice

> ทุกตำนานเริ่มต้นจากศูนย์ — นักผจญภัยมือใหม่ที่ยังไม่มีสายอาชีพ ค่อยๆ ไต่บันไดเลื่อนขั้น "เปลี่ยนอาชีพ" (Job Change) ไปเรื่อยๆ ตามเส้นทางที่เลือก จนกลายเป็นยอดฝีมือระดับตำนานในสายของตน

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นฉบับร่างจากการสัมภาษณ์เบื้องต้น ยังไม่ผ่าน balance check เต็มรูปแบบ (checklist + validation ตาม `subclass-creation-rules.md`) และตัวเลขหลายจุดยังเป็นค่าประมาณรอ feedback จากผู้ใช้ก่อนสรุปจริง เนื้อหา Job Paths ทั้งหมด (Swordsman/Mage/Archer/Thief/Acolyte/Merchant/Super Novice) ถูกลบออกไปแล้วเพื่อออกแบบใหม่ตามจังหวะเลเวลล่าสุด — เหลือแค่ chassis + progression skeleton + ตารางอ้างอิง

## Designer's Note

แรงบันดาลใจจากระบบเลื่อนขั้นอาชีพของ Ragnarok Online / ROX: Novice → First Class → Second Class → Transcendent Second Class → Third Class → Fourth Class ปัญหาที่ต้องแก้คือ D&D 2024 ปกติให้เลือก subclass "ครั้งเดียวจบ" ตอนต้นเกม แต่ RO ให้ความรู้สึก "อัพคลาส" ซ้ำหลายรอบตลอดเกม — ดังนั้น class นี้จึงออกแบบให้ subclass (Job) มี milestone ใหญ่ถึง 5 จุด (เลเวล 3/6/9/13/17) แมปตรงกับ 5 tier จริงของ RO ครบทุก tier รวมถึง Fourth Class ด้วย แทนที่จะได้ features มาเรื่อยๆ แบบ subclass ปกติ โดยแต่ละจุดคือ "เลื่อนขั้น" จริงที่เปลี่ยนตัวตนการเล่นอย่างชัดเจน ไม่ใช่แค่บวกเลข — จังหวะนี้เลือกเพื่อไม่ให้ทับเลเวล ASI/Epic Boon (4/8/12/16/19) เลย

รวมทั้ง **6 สายอาชีพหลักของ RO + Super Novice** — วัตถุดิบ skill reference ของแต่ละสาย (6 สายหลัก) แยกออกเป็นไฟล์ต่อสายแล้วตาม convention ปกติของโปรเจกต์ (ดูลิงก์ในหัวข้อ "ROX Skill Reference" ด้านล่าง) แต่ละสายอ้างอิง job tree + skill จริงจาก ROX (Ragnarok X: Next Generation) และตารางอ้างอิงทางการที่ผู้ใช้ให้มา (ดูหัวข้อ "ROX Job Tree Reference" ด้านล่าง)

**6 สายหลัก** (ต่อยอดจาก Swordsman/Mage/Archer/Thief/Acolyte/Merchant): เลือกได้ตอนเลเวล 3 เหมือนกันหมด ชื่อ tier ทุกสายอ้างอิงตามตารางทางการครบทั้ง 5 tier (First Class เลเวล 3 → Second Class เลเวล 6 → Transcendent Second Class เลเวล 9 → Third Class เลเวล 13 → Fourth Class เลเวล 17)

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

| เลเวล | Proficiency Bonus | Feature |
|---|---|---|
| 1 | +2 | - |
| 2 | +2 | - |
| 3 | +2 | **Job Change: First Class** (เลือก subclass) |
| 4 | +2 | Ability Score Improvement |
| 5 | +3 | - |
| 6 | +3 | **Job Change: Second Class** (subclass — จุดแตกสายส่วนใหญ่) |
| 7 | +3 | - |
| 8 | +3 | Ability Score Improvement |
| 9 | +4 | **Job Change: Transcendent Second Class** (subclass) |
| 10 | +4 | - |
| 11 | +4 | - |
| 12 | +4 | Ability Score Improvement |
| 13 | +5 | **Job Change: Third Class** (subclass) |
| 14 | +5 | - |
| 15 | +5 | - |
| 16 | +5 | Ability Score Improvement |
| 17 | +6 | **Job Change: Fourth Class** (subclass — capstone ของสาย) |
| 18 | +6 | - |
| 19 | +6 | Ability Score Improvement |
| 20 | +6 | - |

**หมายเหตุจังหวะ**: เลเวล 3/6/9/13/17 คือ "Job Change" milestone ใหญ่ 5 จุด แมปตรงกับ 5 tier จริงของ RO ทั้งหมด (First Class → Second Class → Transcendent Second Class → Third Class → Fourth Class — ดูตาราง [ROX Job Tree Reference](#rox-job-tree-reference-ทางการ) ด้านล่าง) เลือกจังหวะนี้เพื่อไม่ให้ทับเลเวล ASI/Epic Boon (4/8/12/16/19) เลย — เลเวลอื่นทั้งหมด (1/2/5/7/10/11/14/15/18/20) ยังไม่กำหนด feature ไว้ ("-") รอออกแบบเพิ่มทีหลัง (ทั้ง Class Features พื้นฐานของ Novice เองและเนื้อหา Job Paths แต่ละสาย ถูกลบออกไปแล้วเพื่อออกแบบใหม่ให้ตรงจังหวะนี้)

> 🚧 [Mastery-Branches.md](Mastery-Branches.md) ยังอ้างอิงจังหวะเก่า (3/5/7/10/11/14/15/17/19) อยู่ — ต้องปรับให้ตรงกับตารางนี้ก่อนใช้งานจริงเช่นกัน

## Job Paths

Novice เลือก Job (subclass) ตอนเลเวล 3 จากทั้งหมด 7 สาย (6 สายหลัก + Super Novice) — แต่ละสายมี milestone ใหญ่ที่เลเวล 3/6/9/13/17 ตรงกับ First/Second/Transcendent Second/Third/Fourth Class ตามตาราง Level Progression ด้านบน (เนื้อหารายละเอียดของแต่ละสายยังไม่ได้เขียน รอออกแบบใหม่)

**เพิ่มเติม**: นอกจาก feature ตายตัวของแต่ละ Job แล้ว ยังมีระบบ **[Mastery Branches](Mastery-Branches.md)** — pool เทคนิคเสริมที่ล็อกด้วยเงื่อนไข Job+Level (เช่น "Knight 7+") ให้เลือกเก็บสะสมได้ตลอดทาง ทำหน้าที่แทน spell list ของ full caster ให้ class นี้มีความลึกในการปรับ build โดยไม่ใช้ spell ของ D&D

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

**Fourth Class อยู่ในสโคปแล้ว**: milestone ทั้ง 5 จุด (3/6/9/13/17) ของ class นี้แมปตรงกับ 5 คอลัมน์ในตาราง (First Class → Second Class → Transcendent Second Class → Third Class → **Fourth Class**) พอดี — Fourth Class คือ "Job Change: Fourth Class" ที่เลเวล 17 (capstone ของแต่ละสาย) ไม่ใช่แค่ชื่อสำรองอีกต่อไป

### ROX Skill Reference (แต่ละ Job มี skill อะไรบ้าง)

รวบรวม skill จริงต่อ Job tier ไว้เป็นวัตถุดิบสำหรับออกแบบ feature ของแต่ละ Job Path ทีหลัง — **ยึดตาม ROX เป็นหลัก** ตามที่ระบุ แต่ ROX สืบทอด skill ส่วนใหญ่มาจาก RO classic (skill ชื่อเดียวกันในหลายเวอร์ชัน) จึงอ้างอิง RO classic database (ratemyserver, iRO Wiki, Divine Pride, Ragnarok Fandom Wiki, renewal.playragnarok.com) เสริมในจุดที่หาข้อมูล ROX โดยตรงไม่ได้ — **ครบทั้ง 12 สายย่อย ทุก tier รวม Fourth Class แล้ว** (อัปเดตล่าสุด: ปิดช่องว่างเดิมของ Shadow Cross, Abyss Chaser, Biolo, Scholar, Elemental Master ครบแล้ว) **และเพิ่ม 1st Class (Swordsman/Mage/Acolyte/Thief/Archer/Merchant เอง ก่อนเปลี่ยนอาชีพ) ที่เคยขาดไปครบทั้ง 6 สายแล้วเช่นกัน**

> **แยกเป็นไฟล์ต่อสาย** (6 สายหลัก) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ — คำอธิบายเป็นการสรุปคร่าวๆจากชื่อ/ข้อมูลที่ค้นเจอ ไม่ใช่ตัวเลขบาลานซ์จริง ดูหมายเหตุการค้นข้อมูลรวม (ROX vs RO classic source) ท้ายไฟล์ [Merchant.md](Merchant.md)

- [Swordsman.md](Swordsman.md) → Swordsman (1st) → Knight/Crusader (2nd) → Lord Knight/Paladin (Transcendent) → Rune Knight/Royal Guard (3rd) → Dragon Knight/Imperial Guard (4th) — มี Mastery Branch ตัวอย่างครบใน [Mastery-Branches.md](Mastery-Branches.md)
- [Mage.md](Mage.md) → Mage (1st) → Wizard/Sage (2nd) → High Wizard/Scholar (Transcendent) → Warlock/Sorcerer (3rd) → Arch Mage/Elemental Master (4th)
- [Acolyte.md](Acolyte.md) → Acolyte (1st) → Priest/Monk (2nd) → High Priest/Champion (Transcendent) → Arch Bishop/Sura (3rd) → Cardinal/Inquisitor (4th)
- [Thief.md](Thief.md) → Thief (1st) → Assassin/Rogue (2nd) → Assassin Cross/Stalker (Transcendent) → Guillotine Cross/Shadow Chaser (3rd) → Shadow Cross/Abyss Chaser (4th)
- [Archer.md](Archer.md) → Archer (1st) → Hunter/Bard-Dancer (2nd) → Sniper/Minstrel-Gypsy (Transcendent) → Ranger/Maestro-Wanderer (3rd) → Windhawk/Troubadour-Trouvere (4th)
- [Merchant.md](Merchant.md) → Merchant (1st) → Blacksmith/Alchemist (2nd) → Mastersmith/Biochemist (Transcendent) → Mechanic/Geneticist (3rd) → Meister/Biolo (4th)
