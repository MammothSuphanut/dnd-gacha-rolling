# Next Session — Resume Point (อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง)

**อัปเดตล่าสุด**: 2026-08-15 (หลังจบ Level 19 Caverns of Ooze — **Act 9: The Deepest Halls เริ่มแล้ว** EP01 เสร็จสมบูรณ์ — ต่อไปคือ **Level 20 (Runestone Caverns), Chapter 2 ของ Act 9 เดียวกัน, EP02** ตัวลิช Ezzat ที่ถูกปูมาตั้งแต่ Act 5)

> ไฟล์นี้มีไว้ให้ session ถัดไป (หรือ AI ตัวใหม่ที่ไม่มี context เดิม) อ่านแล้วทำงานต่อได้ทันทีโดยไม่เพี้ยนจากรูปแบบ/มาตรฐานเดิม — ถ้าผู้ใช้พิมพ์ "ทำต่อ" ให้เริ่มจากหัวข้อ **"งานถัดไปแบบเจาะจง"** ด้านล่างได้เลย ไม่ต้องถามซ้ำว่าจะทำอะไร

---

## 1. สถานะโดยรวม ณ ตอนนี้

โปรเจกต์: แปลง 3 ไฟล์ FoundryVTT JSON ดิบ (Waterdeep: Dragon Heist, Waterdeep: Dungeon of the Mad Mage, และ Dungeon of the Mad Mage Companion แฟนเมด) เป็นแคมเปญ Thai ACT/CH/EP journal เต็มรูปแบบที่ `adventures/gilded-city-mad-depths/`

**เสร็จแล้วทั้งหมด**:
- ✅ **Act 1 — Dragon Heist** (`ACT01-dragon-heist/`): ครบ 12 ไฟล์ EP (EP1-3 เนื้อเรื่องกลาง, EP4-7 = Ch.4 แยก 4 สายวายร้าย, EP8 = Vault of Dragons ร่วม, EP9-12 = Ch.5-8 แยก 4 สายวายร้ายอีกรอบ)
- ✅ **Act 2 — Into the Yawning Depths** (`ACT02-into-the-yawning-depths/`): Undermountain Level 1-2, ครบ EP01+EP02
- ✅ **Act 3 — The Sunless Sea** (`ACT03-the-sunless-sea/`): Undermountain Level 3 + Skullport, ครบ EP01 (Sargauth Level) + EP02+EP03 (Skullport แยก 2 ไฟล์เพราะเนื้อหาใหญ่มาก)
- ✅ **Act 4 — Twisted Wilds** (`ACT04-twisted-wilds/`): **ครบทั้ง Act แล้ว — Level 4, 5, 6 ทั้งหมด**
  - Level 4 (Twisted Caverns): `CH01-the-twisted-caverns.md` + `EP01 - The Twisted Caverns (Level 4).md` ครบ 24 พื้นที่ รวมตัวแปร Companion "Halaster's Game — Halngaloon the Mad God" (kuo-toa บูชา Halaster แทนรูปปั้น otyugh, ประตูเวทที่ 11c ถูกปิด), Illuun the aboleth ธีม "the Lover in the Dark"
  - Level 5 (Wyllowwood): `CH02-wyllowwood.md` + `EP02 - Wyllowwood (Level 5).md` ครบ 24 พื้นที่ รวม Companion เขียน Wyllow อาร์คดรูอิดใหม่เป็นวายร้ายซ่อนเร้น ("A Web of Dread" 5 องก์ + "Wyllow's Hunt" tactics เต็มรูปแบบ)
  - Level 6 (Lost Level): `CH03-the-lost-level.md` + `EP03 - The Lost Level (Level 6).md` ครบ 48 พื้นที่ รวมตัวแปร Companion "Halaster's Game" เต็มรูปแบบ (ปิดผนึกทางออก, ปิด darkvision, invisible stalker ไล่ล่าทุกฝ่ายจนเปิด Heart of the Mountain สำเร็จ), ฮับประตูเวท 10 บาน — ใหญ่ที่สุดในแคมเปญ
- ✅ **Act 5 — Castle & Swamp** (`ACT05-castle-and-swamp/`): **ครบทั้ง Act แล้ว — Level 7, 8, 9 ทั้งหมด (4 ไฟล์ EP)**
  - Level 7: `CH01-maddgoths-castle.md` + `EP01 - Maddgoth's Castle (Level 7).md` ครบ 47 พื้นที่ รวมตัวแปร Companion "Maddgoth's Dance" เต็มรูปแบบ (พ่อมดฆาตกรต่อเนื่องกลับมากลางเรื่อง เชิญปาร์ตี้เป็นแขก วางยาพิษ วางแผนสังหารตอนเที่ยงคืน) และปม "The Shadow of Ghnorsh"
  - Level 8: `CH02-slitherswamp.md` + `EP02 - Slitherswamp (Level 8).md` ครบ 24 พื้นที่ รวม 2 เนื้อเรื่องคู่ขนานจาก Companion ("Out from Under the Rod" — ปาร์ตี้ถูกนาคาสะกดจิต, "The Blacktongue Breakout" — ปาร์ตี้ถูก bullywug จับติดเชื้อ chaos phage) ผ่านปาร์ตี้ NPC "The Gentlemen Bastards" พบข้อผิดพลาดเล็กน้อยในตาราง Gate กลางแคมเปญ (Gate #19 ปลายทางจริงคือ L10 ไม่ใช่ L9 ตามที่เคยพิมพ์ไว้) แก้ไขแล้วใน `03-halasters-game-framework.md`
  - Level 9: `CH03-dweomercore.md` + **`EP03 - Dweomercore, Part 1 - The Academy.md`** (49 พื้นที่ + Companion เปลี่ยนเป็น "evil Hogwarts" เต็มรูปแบบ 7 บ้าน/Houses) + **`EP04 - Dweomercore, Part 2 - The High Wizard Tournament.md`** (ทัวร์นาเมนต์ 3 ภารกิจดัดแปลงจาก Harry Potter and the Goblet of Fire, ไคลแมกซ์คือการคืนชีพของ Ezzat ลิชจาก L20) — **Level 9 เป็นชั้นแรกที่ต้องแตกเป็น 2 EP แบบ Skullport** เพราะเนื้อหาดันเจี้ยนสำรวจ vs. ทัวร์นาเมนต์นอกสถานที่เป็นคนละประเภทชัดเจน
- ✅ **Act 6 — Muiral's Gauntlet** (`ACT06-muirals-gauntlet/`): **ครบสมบูรณ์ทั้ง Act แล้ว — Level 10, 11, 12 ทั้งหมด**
  - Level 10: `CH01-muirals-gauntlet.md` + `EP01 - Muiral's Gauntlet (Level 10).md` ครบ 30 พื้นที่ รวม "Muiral's Mad Dash" โครงเรื่องไล่ล่า/หลบหนี, Halaster's Game สองเป้าหมาย ("Muiral's Ugly Mug" บังคับ Muiral ส่องกระจก + "The Auvryndar Armageddon" ยุยง Gorzil ก่อกบฏ), สงครามสามฝ่าย Muiral vs. House Auvryndar vs. สายลับ House Freth (Xarann A'Daragon) — **ยังคงเป็น 1 ไฟล์ EP** (ไม่แตกแบบ Level 9) เพราะเนื้อหาทั้งหมดเกิดในดันเจี้ยนเดิม ไม่มีการย้ายไปสถานที่นอกดันเจี้ยน — Halaster's Gate 5 บาน (มากที่สุดตั้งแต่ L6) ครอสเรฟตรงกับตารางกลางทุกบาน ไม่ต้องแก้ไข (ยืนยัน Gate #19 ที่แก้ตอน L8 ด้วย)
  - Level 11: `CH02-troglodyte-warrens.md` + `EP02 - Troglodyte Warrens (Level 11).md` ครบ 17 พื้นที่ รวม **The Balhannoth** ที่ Companion เพิ่มเข้ามา (นักล่าทะลุมิติจาก Shadowfell ที่ House Auvryndar ลักลอบดึงเข้ามาแต่ควบคุมไม่ได้ ยึดพื้นที่ 7 เป็นรัง สร้างภาพลวงตา "สวรรค์ปลอม"), Special Event "Clash of the Titans" (behir ปะทะ balhannoth, Halaster ถ่ายทอดสดเป็นเกมโชว์), สงคราม House Auvryndar vs. House Freth ต่อเนื่องจาก L10 — **ยังคงเป็น 1 ไฟล์ EP** (จุดยืนยันที่ 3 ต่อจาก L8, L10 — Companion เองบอกว่าชั้นนี้ควรจบในเซสชันเดียว) — Halaster's Gate 3 บาน (ไป L6/L7/L8) ครอสเรฟตรงกับตารางกลางทุกบาน ไม่ต้องแก้ไข
  - Level 12: `CH03-the-maze-level.md` + `EP03 - The Maze Level (Level 12).md` ครบ 19 พื้นที่หลัก + 45 sub-area รวม **"Halaster Gets Hitched"** ปมเรื่อง 3 องก์เต็มรูปแบบจาก Companion (Erelal Freth ลักพาตัว Sim simulacrum ของ Halaster มาบังคับแต่งงาน จบด้วย Halaster ตัวจริงเปิดโปงกลางพิธี), Special Event "The Wedding Present" (Drivvin เรียก goristro คุมไม่ได้) — **ยังคงเป็น 1 ไฟล์ EP** แม้ขนาดใหญ่สุดของ Act (170K ตัวอักษร) เพราะพิธีทั้งหมดเกิดในป้อมปราการเดียวกับที่สำรวจ (เทียบเคียง L7's Maddgoth's Dance, และ L10 ที่ใหญ่กว่านี้อีกก็ยังเป็น 1 EP ได้) — Halaster's Gate 4 บาน (มากที่สุดตั้งแต่ L10 — ไป L6/L10/L14/L19) ครอสเรฟตรงกับตารางกลางทุกบาน ไม่ต้องแก้ไข — **นี่คือ EP ปิด Act 6**
- ✅ **Act 7 — Graveyard & Ruin** (`ACT07-graveyard-and-ruin/`): **ครบทั้ง Act แล้ว — Level 13, 14, 15 ทั้งหมด (4 ไฟล์ EP)**
  - Level 13: `CH01-trobriands-graveyard.md` + `EP01 - Trobriand's Graveyard (Level 13).md` ครบ 12 พื้นที่หลัก + sub-area รวม **"Mad Mage: Fury Road"** การปรับโฉมทั้งชั้นจาก Companion เป็นทะเลทรายรกร้างสไตล์ Mad Max (สเกล 1 ตาราง = 1 ไมล์, กฎยานพาหนะ deathcycle/death jeep, Extreme Heat), Halaster's Game "Zox Hunt" เควสต์คุ้มกัน Zox Clammersham 5 ช่วง, Special Events 4 อัน (Death Valley, Historic on the Fury Road, Out of Gas, Tremors) — **ยังคงเป็น 1 ไฟล์ EP** แม้เป็นจุดทดสอบเกณฑ์ตัดสินใจที่สุดขั้วที่สุด (รูปแบบการเดินทางทั้งชั้นเปลี่ยนหมด ไม่ใช่แค่ special event ฝังอยู่) เพราะยังเกิดในแผนที่ 13 พื้นที่เดิม ไม่ย้ายสถานที่จริง — Halaster's Gate 1 บาน (น้อยที่สุดเท่าที่เจอมา — ไป L6) ครอสเรฟตรงกับตารางกลาง ไม่ต้องแก้ไข
  - Level 14: `CH02-arcturiadoom.md` + `EP02 - Arcturiadoom (Level 14).md` ครบ 41 พื้นที่หลัก + sub-area (ใหญ่ที่สุดในแคมเปญจนถึงตอนนี้ — WDMM 111,713 ตัวอักษร) รวม **"Halaster's Game: The Mid-Season Finale"** กลไก Companion ครอบคลุมทั้งชั้น (Weapon of Mass Disintegration นับถอยหลัง 10 นาที ต้องหากุญแจ mithral 6 ดอกกระจายทั่วดันเจี้ยน), ยืนยัน **Arcturia เป็นลิชจริง** ตามปมจาก L13, NPC เด่น (Emberosa/Hrossk ยักษ์ไฟสร้าง Mecha-Halaster, Doomcrown/Ernie the flumph, Vanar Freth ดรอว์วิ่งหนี, Alussiarr rakshasa ที่ถูกกักขัง, Xebekal beholder-ผ้าทอ, Cheeky Pluckers), Send-Off ผูกกับ hook ใหญ่ของแคมเปญ (Halaster เหวี่ยงปาร์ตี้เข้า demiplane 3 เดือน, Mecha-Halaster จะบุก Waterdeep ตอนกลับมา) — **ยังคงเป็น 1 ไฟล์ EP** เพราะกลไก WMD ยังเกิดในดันเจี้ยนเดียวกันทั้งหมด ไม่ย้ายสถานที่จริง (เทียบเคียง Level 6's full-level lockdown) — Halaster's Gate 3 บาน (มากที่สุดตั้งแต่ L10 — ไป L9/L12/L17) ครอสเรฟตรงกับตารางกลางทุกบาน ไม่ต้องแก้ไข
  - Level 15: `CH03-obstacle-course.md` + **`EP03 - The Obstacle Course, Part 1 - Netherskull's Gauntlet (Level 15).md`** (ดันเจี้ยนกับดักคลาสสิก 40 พื้นที่หลัก + sub-area — WDMM 135,725 ตัวอักษร ไฟล์ WDMM เดี่ยวใหญ่ที่สุดในแคมเปญ — บอสประจำชั้น Netherskull the Death Tyrant, ตัวแปร "Halaster's Game: Victory or Death", NPC เด่น Fidelio's Ghost/Lorlynn Zmirth/Yrlakka the githzerai/Zorak Lightdrinker/Thwad Underbrew/Kavil Mereshanter, Halaster's Gate 3 บานไป L17/L18/L20 — ชั้นแรกที่มีประตูไปชั้นที่ยังไม่เขียนถึง 3 บานพร้อมกัน) + **`EP04 - The Obstacle Course, Part 2 - Mecha-Halaster's March.md`** (payoff ปม demiplane 3 เดือนจาก L14 — ปาร์ตี้ถูกส่งขึ้น Waterdeep สู้ Mecha-Halaster เต็มรูปแบบที่กำแพงเมือง แล้วถูกเรียกตัวกลับ Undermountain ใน 1 สัปดาห์) — **Level 15 เป็นชั้นที่สองที่ต้องแตกเป็น 2 EP แบบ Skullport/Dweomercore** เพราะ Mecha-Halaster's March ย้ายสถานที่ออกจากดันเจี้ยนไป Waterdeep เต็มรูปแบบ (ต่างจาก L6/L10/L14 ที่กลไกครอบทั้งชั้นแต่ยังอยู่ในดันเจี้ยนเดิม) — **นี่คือ EP ปิด Act 7**
- ✅ **Act 8 — Crystal & Sea** (`ACT08-crystal-and-sea/`): **ครบสมบูรณ์ทั้ง Act แล้ว 2026-08-15 — Level 16-17-18 (EP01-04)**
  - Level 16: `CH01-crystal-labyrinth.md` + `EP01 - Crystal Labyrinth (Level 16).md` ครบ 32 พื้นที่ (11 พื้นที่ใน Undermountain เดิม + 21 พื้นที่บนดาวเคราะห์น้อย Stardock ที่เข้าถึงผ่านประตู Stardock rod) รวม Special Event "Ashtyrranthor's Hunt" 3 ระยะ, ปมกบฏ Urlon vs. Al'chaia, Ezria เชลย githzerai จาก L15, Infernexus มังกรหนุ่มขอไปสร้างรังที่ Twisted Caverns (L4) — **ทดสอบเกณฑ์ตัดสินใจแบบใหม่ (เปลี่ยนระนาบ ไม่ใช่แค่สถานที่) แต่ยังคงเป็น 1 EP** เพราะ Stardock ยังผูกกับ Crystal Labyrinth ด้วยประตูทางเดียว ไม่มีเนื้อเรื่องแยกขาดแบบ L9/L15 — **ไม่มี Halaster's Gate มาตรฐานในชั้นนี้** (ประตู Stardock ใช้ rod ไม่ใช่ elder rune) — Send-Off ปิดท้ายเป็น "กับดักหลอก" โดยเจตนา ปูทาง "The Matrix" ของ Extremiton ที่จะเฉลยเต็มที่ L17
  - Level 17: `CH02-seadeeps.md` + **`EP02 - Seadeeps, Part 1 - Alterdeep.md`** (ฉาก in-town vignette เต็มรูปแบบ — ตื่นที่ Yawning Portal จำลอง, Flaws of the Simulation/Hints & Tidbits, ฉากย่อย Mugged/"ภาษาแปดเปื้อน", Yrlakka+githzerai zerth เสนอตัวเลือกยาแดง/น้ำเงินแบบ The Matrix ตรงๆ, ไคลแมกซ์ Battle of the Yawning Portal เผชิญหน้า Extremiton ในภาพจำลอง) + **`EP03 - Seadeeps, Part 2 - The Illithid Colony.md`** (ครบ 20 พื้นที่หลัก + sub-area, สงคราม githyanki Yaveklar/Lashiir vs. mind flayer colony, neothelid ขังในพื้นที่ 8, Detention Facility พื้นที่ 10, Dynamo พื้นที่ 12 เผชิญหน้า Extremiton แบบแยกสองทางตามผล EP02, Halaster's Gate 3 บานยืนยันครอสเรฟถูกต้อง — ไป L14/L15/L19) — **Level 17 เป็นชั้นที่สามที่ต้องแตกเป็น 2 EP แบบ Skullport/Dweomercore/Obstacle Course** เพราะ Companion เปลี่ยน Alterdeep เป็นฉากคนละโหมดการเล่นจริงๆ (ไม่ใช่แค่ยาว) — ลำดับสำรวจกลับด้าน (เริ่มจากในฐานทัพออกสู่นอก) เพราะปาร์ตี้เข้า psipod ตั้งแต่ต้น Level
  - Level 18: `CH03-vanrakdoom.md` + `EP04 - Vanrakdoom.md` ครบ 33 พื้นที่หลัก + sub-area (Entrance ถึง Dragon's Hoard) รวมปูมหลัง Lord Vanrak Moonstar (death knight ผู้สำนึกผิดทำลายตัวเองด้วย sun blade ปี 1436 DR — **ไม่มีลิชในชั้นนี้จริงๆ แม้ EP03 (L17) จะทิ้งปมเตือนไว้ว่า "-doom" = รังลิช** ซึ่งเป็นการหักมุมตั้งใจ), เควสต์ **"Save the Dragon"** ไถ่บาปมังกรเงามืด Umbraxakar/Glyster ด้วยของที่ระลึก 4 ชิ้น, Companion เพิ่มป่า **"Through the Deadwood"** เป็นด่านนำ (ต้นแบบของ Wyllowwood — **ยังคงนับเป็น 1 EP** เพราะยังเป็นการสำรวจ/เดินทางแบบเดียวกับดันเจี้ยนอื่น ไม่ใช่เนื้อหาคนละประเภทแบบ Alterdeep) พร้อม Portia Dzuth quest giver ที่ถูกย้ายมาจากพื้นที่ 25b, บอสสองตัวยากสุดขั้วในแคมเปญ (Keresta Delvingstone พื้นที่ 26, Umbraxakar พื้นที่ 32), Halaster's Gate 2 บานยืนยันครอสเรฟถูกต้อง (Gate #15 ↔ L6 พื้นที่ 47a, Gate #28 ↔ L15 พื้นที่ 30a), ปิดท้ายด้วยปมปริศนา "A.M." (Artor Morlin บารอนแห่งเลือด) และ Send-Off คู่ที่ปรับโทนไม่มีคำอำลามาตรฐานตามต้นฉบับ — **EP นี้ปิด Act 8 สมบูรณ์**

- 🔄 **Act 9 — The Deepest Halls** (`ACT09-the-deepest-halls/`): **เริ่มแล้ว 2026-08-15 — Level 19 เสร็จ (EP01)**
  - Level 19: `CH01-caverns-of-ooze.md` + `EP01 - Caverns of Ooze (Level 19).md` ครบ 16 พื้นที่หลัก + sub-area (1a-c/3a-b/5a-b/11a-b/13a-h) รวมดราม่า genie คู่แข่ง **Ichthyglug the marid** (area 1) vs. **Jarûk the dao** (area 11) ที่แข่งกันหา phylactery ของลิช **Ezzat** (L20) มาแลกอิสรภาพ ผูก Halaster's Goal #3 เข้ากับการคืนชีพ Ezzat ที่ Dweomercore Tournament (Act 5 EP04) โดยตรง, เรือ spelljammer *Scavenger* เต็มรูปแบบพร้อมกัปตัน mind flayer หิวโหย N'ghathrod, ลัทธิ Ghaunadaur ที่แปลงสาวกเป็นอูซมีสติปัญญา, Halaster's Gate 3 บานยืนยันครอสเรฟถูกต้องทุกบาน (Gate #23/#29/#30 — Gate #30 ไป L21 area 23b บันทึกรอไว้แล้ว), Send-Off คู่ปิดท้ายด้วยนิมิต Halaster-Ezzat ในอดีตที่ "เจือคำโกหก" ปูทาง L20 — **ยังคงเป็น 1 ไฟล์ EP** เพราะต้นฉบับ Companion ระบุตรงๆ ว่าชั้นนี้ตั้งใจให้สั้น เป็น breather ระหว่างสองชั้นอันตราย ไม่มีประเด็นเรื่องแตก EP เลย

**ยังไม่เริ่ม**: Level 20 (Runestone Caverns), Level 21 (Terminus Level) — ดูหัวข้อ 2 และตาราง Act คร่าวๆ ในหัวข้อ 6

รายละเอียด checklist แบบละเอียดทุกบรรทัดอยู่ใน [`PROGRESS.md`](./PROGRESS.md) — ไฟล์นี้ (`NEXT-SESSION.md`) เป็นตัวสรุป "ทำอย่างไรต่อ" ไม่ใช่ตัวแทน PROGRESS.md อัปเดตทั้งสองไฟล์คู่กันเสมอเมื่อทำงานเสร็จแต่ละก้อน

---

## 2. งานถัดไปแบบเจาะจง — Act 9: The Deepest Halls, Level 20 (Runestone Caverns) — Chapter 2

**Level 19 (Caverns of Ooze) เสร็จแล้ว** (EP01 ✅) ต่อไปคือ **Level 20 (Runestone Caverns)** — Chapter 2 ของ Act 9 เดียวกัน (โฟลเดอร์ `ACT09-the-deepest-halls/` มีอยู่แล้ว ไม่ต้องสร้างใหม่) — เลข EP นับต่อเนื่องจาก EP01 คือเริ่มที่ **EP02**

| Level | ชื่อใน WDMM (Arabic) | ชื่อใน Companion (Roman) | ขนาด HTML ดิบ (WDMM / Companion) | สถานะ |
|---|---|---|---|---|
| 19 | `Level 19: Caverns of Ooze` | `Level XIX: Caverns of Ooze` | 71,991 / 61,220 ตัวอักษร | ✅ เสร็จ (EP01) |
| 20 | `Level 20: Runestone Caverns` | `Level XX: Runestone Gardens` | 92,358 / 83,083 ตัวอักษร | ⬜ ถัดไป |
| 21 | `Level 21: Terminus Level` | `Level XXI: The Terminus Level` | 91,068 / 88,893 ตัวอักษร | ⬜ รอคิว |

*(ขนาดจากการ query ต้นฉบับ JSON ตรงๆ ล่วงหน้า — ยังไม่ได้อ่านเนื้อหาเต็มของ L20/L21 ต้องอ่านจริงตอนเริ่มทำแต่ละชั้น ชื่อ Companion ของ L20 ต่างจาก WDMM เล็กน้อย "Runestone Gardens" ไม่ใช่ "Runestone Caverns" — ใช้ชื่อ WDMM ตอน `.find(p => p.name === ...)` เสมอ)*

**บริบทที่ต้องรู้ก่อนเริ่ม Level 20** (จากสิ่งที่สะสมมาตลอดแคมเปญ + สิ่งที่ยืนยันแล้วตอนเขียน L19 — ยังไม่ได้อ่านเนื้อหาเต็มของ L20 เอง ต้องอ่านจริงตอนเริ่มทำ):
- **Ezzat ลิชคือหัวใจของชั้นนี้ทั้งชั้น**: ตาม `03-halasters-game-framework.md` — Ezzat คือเป้าหมายอันดับ 3 ของ Halaster's Goals, ถูกคืนชีพที่ไคลแมกซ์ Dweomercore Tournament (Act 5, EP04) มาก่อนแล้ว — **สำคัญมาก อย่าลืมครอสเรฟ EP04 ของ Act 5 (Dweomercore) ตอนเขียน L20** ว่า Ezzat กลับมามีชีวิต (undeath) ในสภาพ/บริบทแบบไหน
- **Genie สองตนจาก L19 ฝากเควสต์ไว้แล้ว**: Ichthyglug (marid) และ Jarûk (dao) ต่างขอให้ปาร์ตี้เอา phylactery ของ Ezzat มาแลกอิสรภาพของตัวเอง มอบให้ตนไหนจะสร้างศัตรูกับอีกตนอัตโนมัติ (ดู Special Events "Dao-Daddy Beatdown"/"Marid Meltdown" ใน EP01) — decision นี้ควรมีผลกระทบชัดเจนตอนเขียน Aftermath ของ L20
- **Halaster-Ezzat มีปมอดีตร่วมกันที่ Dweomercore**: Send-Off ของ L19 (EP01) ให้นิมิตว่า Ezzat เคยเป็นลูกศิษย์ของ Halaster ที่ Dweomercore ก่อนถูกปฏิเสธ/ทรยศ (ต้นฉบับกำกับไว้ว่า "เจือด้วยคำโกหก" ไม่ใช่ความจริงทั้งหมด) — ต้องตัดสินใจตอนเขียน L20 ว่าส่วนไหนจริง ส่วนไหนโกหก
- **Heads Up ที่บันทึกไว้แล้วจาก L19 (area 16)**: Ezzat วาง *symbol* spell ดักไว้ที่ "Area 1" ฝั่ง L20 (Investigation DC 20 ตรวจจับ, พลาด/เดินผ่านคนแรกกระตุ้น necrotic 10d10, CON save DC 20 ลดครึ่ง) — ต้องเช็คว่าตรงกับพื้นที่ไหนจริงตอนอ่านต้นฉบับ L20
- **The Runestone ถูกพูดถึงล่วงหน้าแล้วที่ L19 area 7** (ในตาราง Beholder Memories ผลลัพธ์ 41-60): "หินงอกขนาดหอคอยที่มีคริสตัลก้อนใหญ่อยู่บนยอด" อยู่ที่ **L20 area 14** — เป็น callback เล็กๆ ที่ผู้เล่นอาจจำได้ถ้าเคยสูดสปอร์ตอน L19
- **Gate #26 "The Jigsaw Gate" (L15↔L20)**: บันทึกไว้แล้วตอนเขียน L15 ว่าเป็นจิ๊กซอว์หินหลายร้อยชิ้น (ถอดผิด = adult white dragon โจมตี) — ยังไม่เคยระบุพื้นที่ฝั่ง L20 ต้องคอนเฟิร์มตอนอ่านต้นฉบับ L20
- **ยังไม่มีการเช็ค**: แฟกชันหลัก/ธีมของ L20 (Runestone Caverns/Gardens) ยังไม่รู้จนกว่าจะอ่านเนื้อหาเต็ม รวมถึงต้องเช็คว่า Companion เพิ่มกลไกระดับชั้นแบบเดียวกับ Deadwood (L18)/Alterdeep (L17) หรือไม่ — **อย่าตัดสินใจ 1 EP vs. หลาย EP ก่อนอ่านเนื้อหาจริง**

**ขั้นตอนที่ต้องทำ** (ตามลำดับ, อ้างอิง workflow ของ `/build-ep` skill):

1. อ่าน [`adventure-builder/journal-template.md`](../../adventure-builder/journal-template.md) และ [`adventure-builder/structure-guide.md`](../../adventure-builder/structure-guide.md) และ [`adventure-builder/canon-reference.md`](../../adventure-builder/canon-reference.md) ให้ครบทั้งไฟล์ก่อนเริ่มเขียนอะไรทั้งสิ้น (บังคับตาม skill — ห้ามข้าม แม้จะทำมาหลายรอบแล้ว กฎอาจถูกแก้ระหว่างทาง)
2. เพิ่ม `CH02-runestone-caverns.md` ในโฟลเดอร์ `ACT09-the-deepest-halls/` ที่มีอยู่แล้ว (ไม่ต้องสร้างโฟลเดอร์ใหม่)
3. เลข EP นับต่อเนื่องจาก EP01 — Level 20 เริ่มที่ **EP02**
4. ใช้ pipeline การสกัดเนื้อหาในหัวข้อ 4 ด้านล่าง ดึงเนื้อหาจาก 2 ไฟล์ต้นทางออกมาเป็น plaintext ก่อนเขียน markdown จริง — ใช้ชื่อ page `Level 20: Runestone Caverns` (WDMM) / `Level XX: Runestone Gardens` (Companion — ชื่อต่างกัน!)
5. เขียนตามกฎรูปแบบในหัวข้อ 5 ให้ครบทุกข้อ ไม่ตัดทอนเนื้อหาห้อง/NPC/treasure ใดๆ — **ต้องอ่านเนื้อหาก่อนตัดสินใจว่าจะแตกเป็นหลาย EP หรือไม่** (ห้ามตัดสินใจจากขนาดเพียงอย่างเดียว ใช้เกณฑ์ "เนื้อหาต่างประเภทกันจริงจนแยกอ่าน/แยกรันได้อย่างเป็นธรรมชาติ" ตามหัวข้อ 5.3)
6. อัปเดต bookkeeping 4 จุดเสมอหลังจบแต่ละ EP: `00-act-outline.md` (ลิงก์ ✅), `PROGRESS.md` (checklist + ตาราง Act), memory file `project_waterdeep_duology_conversion.md`, `MEMORY.md` index บรรทัดเดียว — และอัปเดตไฟล์นี้ (`NEXT-SESSION.md`) ด้วยทุกครั้งที่จบ session ทำงาน

---

## 3. กฎ/ธรรมเนียมที่ตกลงกันไว้แล้ว — ห้ามเปลี่ยนโดยไม่ถามผู้ใช้ก่อน

1. **Companion layering rule** (จาก `99-notes.md`, พร้อมข้อยกเว้นที่ตกลงกันไว้):
   - Quick Notes → ไปอยู่ใน **CH0X brief ของชั้นนั้น** (ไม่ใช่ Act outline — deviation จากคำเดิมใน 99-notes.md ที่ตกลงกันตั้งแต่ Act 2 เพื่อกัน Act outline ยาวเกินไปเมื่อมีหลาย Chapter สะสม)
   - Before the Descent → hook เปิด EP แรกของชั้นนั้น
   - Random Encounters → ตาราง/หัวข้อ hazard ใกล้ต้น EP
   - Areas of Note → แทรกเนื้อหาเข้าห้อง/พื้นที่ที่เกี่ยวข้องโดยตรง ไม่แยกเป็นหัวข้อลอย
   - Epilogue → ปิดท้าย EP สุดท้ายของชั้นนั้นด้วย "The Host's Send-Off" (มาตรฐาน Halaster's Game motif) คู่กับ "The Standard Send-Off" ให้เลือกอ่านอย่างใดอย่างหนึ่ง
2. **Halaster's Game motif** ใช้ต่อเนื่องทุกชั้น — อ้างอิง [`03-halasters-game-framework.md`](./03-halasters-game-framework.md) เสมอ (7 เป้าหมาย Halaster, Gags & Gimmicks, 10 แฟกชัน, ตาราง 31 Halaster's Gates) ถ้าชั้นนั้นมี Halaster's Gate ให้ครอสเรฟกับตารางในไฟล์นี้
3. **ไม่ตัดเนื้อหาเพื่อความสั้น** — ทุกห้อง/พื้นที่/NPC/treasure/trap ในต้นฉบับ WDMM ต้องมี full breakdown เสมอ นี่คือมาตรฐานที่ยึดมาตั้งแต่ Act 1 EP1 และคงไว้ตลอดทุก Act
4. **หนึ่ง Chapter = หนึ่ง Level ของ Undermountain เสมอ** (ไม่ว่า Chapter จะมีกี่ EP ก็ตาม)
5. **หนึ่ง Chapter ปกติ = หนึ่งไฟล์ EP** เว้นแต่เนื้อหาใหญ่เกินไปจริงๆ (ดูเกณฑ์ตัดสินใจในหัวข้อ 5.3) — ถ้าต้องแตกเป็นหลาย EP ให้ตั้งชื่อไฟล์แบบ `EP0Y - <ชื่อ Chapter>, Part 1 - <หัวข้อย่อย>.md`, `EP0Z - <ชื่อ Chapter>, Part 2 - <หัวข้อย่อย>.md` ตามที่ทำกับ Skullport (EP02/EP03)
6. **เลข EP นับต่อเนื่องทั้ง Act** ไม่รีเซ็ตทุก Chapter — ไม่มี `CH0X-` นำหน้าชื่อไฟล์ EP เด็ดขาด
7. **ห้ามสร้างโฟลเดอร์ย่อยเพิ่มใน Act** ไฟล์ journal อยู่แบนในโฟลเดอร์ Act เดียวกับ brief/outline เสมอ
8. **Canon reference rule**: ถ้าชื่อสถานที่/NPC/องค์กรอาจซ้ำกับ Critical Role canon ต้องถามผู้ใช้ก่อนค้น ห้ามเดาเอง (ดู `feedback_canon_reference_rule` ใน memory + `adventure-builder/canon-reference.md`)
9. **ตอบกลับผู้ใช้เป็นภาษาไทย** เสมอในบทสนทนา (prompt ภาพ/รูปเป็นภาษาอังกฤษได้ถ้ามี)
10. **รายงานผลแบบไม่มโน** — ถ้าทำ EP เสร็จ บอกสรุปเนื้อหาจริงที่เขียน ไม่พูดเกินจริง และถามผู้ใช้เสมอว่าจะทำ EP/Chapter/Act ถัดไปต่อเลยไหม อย่าลุยต่อเองแบบไม่ยั้งหยุดจนกว่าจะมีคำยืนยัน "ทำต่อ" ใหม่ทุกรอบ (แต่ละ "ทำต่อ" = อนุมัติทำหนึ่งก้อนเนื้อหาถัดไป ไม่ใช่คำสั่งให้ลุยยาวไม่หยุดทั้งที่เหลือ)

---

## 4. Pipeline การสกัดเนื้อหาจากไฟล์ JSON ต้นทาง (ต้องทำใหม่ทุก session เพราะ scratchpad ถูกล้าง)

ไฟล์ต้นทางอยู่ที่:
- `adventures/gilded-city-mad-depths/_source/waterdeep-dungeon-of-the-mad-mage.json` (WDMM ทางการ, 30 pages — index `.pages[].name`)
- `adventures/gilded-city-mad-depths/_source/dungeon-of-the-mad-mage-companion.json` (Companion แฟนเมด, 30 pages)

**Helper script ถาวรอยู่แล้วที่**: [`_source/extract-tools/extract-common.cjs`](./_source/extract-tools/extract-common.cjs) — มีฟังก์ชัน `clean(html)` (HTML→plaintext แบบ markdown-ish: h1-h4→`#`-`####`, table→`[TABLE START]/[ROW]/|`, list→`- `, bold/italic→`**`/`*`, img→`[IMG]`), `headingIndex(html)` (คืน array ของ `{level, text, offset}` ไล่หา h1-h4 ทั้งหมด), `imageIndex(html)` (คืนตำแหน่ง+src/alt/title ของ `<img>` ทั้งหมด) — **ใช้ต่อได้เลย ไม่ต้องเขียนใหม่** — **นามสกุลไฟล์ต้องเป็น `.cjs` ไม่ใช่ `.js`** เพราะ `d:/dnd-gacha-rolling/package.json` มี `"type": "module"` ทำให้ไฟล์ `.js` ทั้งหมดในโปรเจกต์ถูก Node ตีความเป็น ES module โดยอัตโนมัติ — ถ้า `require()` ไฟล์ `.js` ที่เขียนด้วย `module.exports =` แบบ CommonJS จะได้ object ว่างเปล่ากลับมาเงียบๆ ไม่มี error (เจอปัญหานี้มาแล้วตอนเริ่ม Level 4 — แก้โดยเปลี่ยนนามสกุลเป็น `.cjs` ซึ่งบังคับ Node ให้ตีความเป็น CommonJS เสมอไม่ว่า package.json จะตั้งอะไรไว้) — สคริปต์ตัด chunk ที่เขียนเพิ่มเอง (เช่น `slice_l4.js`) ก็ต้องตั้งชื่อ `.cjs` ด้วยเช่นกันถ้าใช้ `require()`

**ขั้นตอนมาตรฐาน** (รันผ่าน Bash tool, working directory = scratchpad):

```js
// 1. โหลด page ที่ต้องการจากทั้งสองไฟล์ + เขียน raw HTML ลง scratchpad
const fs = require('fs');
const wdmm = JSON.parse(fs.readFileSync('D:/dnd-gacha-rolling/adventures/gilded-city-mad-depths/_source/waterdeep-dungeon-of-the-mad-mage.json','utf8'));
const comp = JSON.parse(fs.readFileSync('D:/dnd-gacha-rolling/adventures/gilded-city-mad-depths/_source/dungeon-of-the-mad-mage-companion.json','utf8'));
const pw = wdmm.pages.find(p => p.name === 'Level 4: Twisted Caverns');
const pc = comp.pages.find(p => p.name === 'Level IV: The Twisted Caverns');
fs.writeFileSync('l4_wdmm_raw.html', pw.text.content);
fs.writeFileSync('l4_companion_raw.html', pc.text.content);

// 2. หา heading index ของแต่ละไฟล์ (ใช้กำหนดจุดตัด chunk)
const { clean, headingIndex, imageIndex } = require('D:/dnd-gacha-rolling/adventures/gilded-city-mad-depths/_source/extract-tools/extract-common.cjs');
fs.writeFileSync('l4w_headings.json', JSON.stringify(headingIndex(pw.text.content), null, 1));
fs.writeFileSync('l4w_images.json', JSON.stringify(imageIndex(pw.text.content), null, 1));
```

3. **อ่าน `l4w_headings.json` ด้วย Read tool** เพื่อวางแผนว่าจะตัด chunk ตรงไหน (ตัดตาม H1 หลักก่อน เช่น "What Dwells Here?" / "Exploring This Level" / "Aftermath", แล้วถ้า "Exploring This Level" ยาวเกินไป ให้ตัดย่อยตาม H2 เป็นกลุ่มพื้นที่ ~5-9 ห้องต่อ chunk — ดูตัวอย่างจริงที่ `slice_l3.js`/`slice_skullport_wdmm.js` ที่เคยเขียนไว้ใน session ก่อน แต่ไฟล์นั้นอยู่ใน scratchpad ที่ถูกล้างไปแล้ว ต้องเขียนสคริปต์ตัด chunk ใหม่ทุกครั้งโดยอิง headingIndex + `html.slice(startOffset, endOffset)` แล้ว `clean()` แต่ละ chunk)
4. **Read ทีละ chunk ที่ตัดออกมา** (ไฟล์ `.txt`) ก่อนเขียน markdown จริง — ห้ามข้ามการอ่านเนื้อหาต้นฉบับจริงแล้วเดาเอาเอง
5. ทำแบบเดียวกันกับไฟล์ Companion (`l4c_...`) แล้วรวมเนื้อหาสองฝั่งตาม Companion layering rule (หัวข้อ 3.1)

**ข้อควรระวังที่เจอมาแล้ว**:
- Heading บางอันในเนื้อหาที่ clean() แล้วอาจมีช่องว่างซ้ำ (`"#  ชื่อหัวข้อ"` สองช่องว่าง) เป็น artifact จาก source HTML เดิม — ถ้าจะ `indexOf()` หาตำแหน่ง heading ในข้อความที่ clean แล้ว ให้ Grep หา pattern `^# ` ก่อนเพื่อดู exact string แทนการเดา ไม่งั้น indexOf จะคืน -1
- ชื่อ page บางอันมี HTML entity ปนอยู่ เช่น `22. The Guts &amp; Garters` — ตอน `.find(p => p.name === ...)` ต้องใช้ string ที่มี `&amp;` ตรงตัว ไม่ใช่ `&`

---

## 5. กฎการเขียนไฟล์ markdown (สรุปจาก journal-template.md — แต่ต้องอ่านไฟล์เต็มจริงเสมอ อันนี้แค่กันลืม)

### 5.1 โครงสร้างบังคับของทุกไฟล์ EP
- บรรทัดแรกสุด: `# EP0Y: <ชื่อตอนเต็ม Title Case>`
- บรรทัด italic รองลงมา: `*Level X-Y — Chapter N ของ [Act M: <ชื่อ>](./00-act-outline.md) — ต่อจาก [EP ก่อนหน้า](<link>)*`
- `## NPC ประจำ EP` — ตาราง markdown 2-3 คอลัมน์ (ชื่อ/บทบาท/หมายเหตุ) ครอบคลุม NPC สำคัญทุกตัวที่มีบทพูด/จุดตัดสินใจ (ไม่ต้องรวม mook ทั่วไป) — ขนาดทั่วไปที่ทำมาแล้วคือ 10-16 แถว
- `## Story Overview` — ย่อหน้าปูเรื่องสั้นๆ
- `## Before the Descent` (เฉพาะ EP แรกของ Chapter/Level) — boxed text (`> *...*`) เปิดฉาก + ข้อมูล DM prep เพิ่มเติม (provisioning/rumors ถ้ามี)
- `## What Dwells Here?` — สรุปแฟกชัน/มอนสเตอร์หลักที่ครองพื้นที่
- `## Wandering Monsters & Random Encounters` (ถ้าต้นฉบับมี) — ตาราง d-อะไรก็ตาม + รายละเอียดแต่ละผลลัพธ์
- `## สำรวจ Level X` (H2) ครอบ `### N. ชื่อพื้นที่หลัก` (H3) → `#### Na. ชื่อพื้นที่ย่อย` (H4) → `##### Treasure` (H5) — **ระดับ heading เหล่านี้ตายตัว ห้ามสลับ**
- `## Aftermath / The Host's Send-Off` ปิดท้าย — มี boxed text ทั้ง "Standard Send-Off" และ "Host's Send-Off" ให้เลือก
- บรรทัดท้ายไฟล์: `[← กลับ Chapter brief](./CH0X-slug.md) · [กลับ Act X outline](./00-act-outline.md)`

### 5.2 กฎเนื้อหาแต่ละห้อง (จาก journal-template.md ข้อ 1)
- ทุกสถานที่ที่ถูกพูดถึงต้องมี section ของตัวเอง
- ทุก NPC ที่ให้ข้อมูลสำคัญต้องมี `### What [ชื่อ] Knows` หรือเทียบเท่า (ในทางปฏิบัติที่ทำมา มักฝังรายละเอียดนี้ในเนื้อหาห้องแทนแยกหัวข้อ ถ้า NPC พูดข้อมูลสำคัญเป็น list ให้ทำ bullet list ในพื้นที่นั้น)
- ทุก encounter ต้องมี **Tactics** ระบุชัด (มอนสเตอร์ทำอะไรก่อน-หลัง)
- ทุกจุด loot ต้องมี `##### Treasure` heading พร้อม gp/ไอเทมชัดเจน ไม่พูดลอยๆ ว่า "มีของมีค่า"
- boxed read-aloud text ใช้ `> *...*` เสมอ, DC/mechanics ตัวหนา (`**DC 15**`), ชื่อคาถา/ไอเทม/มอนสเตอร์ตัวหนา
- narration (สิ่งที่ผู้เล่นเห็น/ได้ยิน) แยกให้ชัดจาก DM-only note (เช่น sidebar คำแนะนำจาก Companion ที่ไม่ใช่สิ่งผู้เล่นรู้ — ใส่ *ตัวเอียงมีคำอธิบาย* กำกับไว้ว่าเป็นข้อมูล DM)

### 5.3 เกณฑ์ตัดสินใจว่าจะแตก 1 Chapter เป็นหลาย EP หรือไม่
บรรทัดฐานที่ใช้จริงจนถึงตอนนี้: **Level 1, 2, 3 = จบใน 1 EP ได้แม้มี 20-40+ ห้อง** (เพราะยังเป็นแค่ "ดันเจี้ยนชั้นเดียว") แต่ **Skullport แตกเป็น 2 EP เพราะเป็นเมืองฮับเต็มรูปแบบ (36 สถานที่) บวกเควสต์ไลน์ยาว 5 องก์แยกต่างหาก (Return of the Thirteen)** ไม่ใช่แค่ห้องเยอะ แต่มีเนื้อหาคนละ "ประเภท" ปนกัน (พื้นที่/สถานที่ ≠ เนื้อเรื่องเควสต์) — เกณฑ์ที่ใช้ตัดสินคือ **"เนื้อหาต่างประเภทกันจริงจนแยกอ่าน/แยกรันได้อย่างเป็นธรรมชาติ" ไม่ใช่แค่ "ยาวเกินไป"** ถ้า Level 4-6 ยาวมากแต่ยังเป็นดันเจี้ยนธรรมดาต่อเนื่อง ให้เขียนเป็น 1 EP ต่อ Chapter ตามปกติก่อน แล้วค่อยประเมินหน้างานว่าจำเป็นต้องแตกจริงหรือไม่

---

## 6. ตาราง Act คร่าวๆ ทั้งหมด (จาก PROGRESS.md — ใช้เป็นแผนที่รวม ปรับได้เมื่อใกล้ถึงจริง)

| Act (คร่าวๆ) | เนื้อหา | Char level | สถานะ |
|---|---|---|---|
| Dragon Heist | ทั้งเล่ม | 1-5 | ✅ ครบ (Act 1, 12 EP) |
| Into the Yawning Depths | Level 1-2 | 5-7 | ✅ ครบ (Act 2, EP01-02) |
| The Sunless Sea | Level 3 + Skullport | 7-9 | ✅ ครบ (Act 3, EP01-03) |
| Twisted Wilds | Level 4-6 | 9-11 | ✅ ครบ (Act 4, EP01-03) |
| Castle & Swamp | Level 7-9 | 11-13 | ✅ ครบ (Act 5, EP01-04) |
| Muiral's Gauntlet | Level 10-12 | 13-15 | ✅ ครบ (Act 6, EP01-03) |
| Graveyard & Ruin | Level 13-15 | 15-17 | ✅ ครบ (Act 7, EP01-04) |
| Crystal & Sea | Level 16-18 | 17-18 | ✅ ครบ (Act 8, EP01-04) |
| **The Deepest Halls** | **Level 19-21** | **18-19** | **🔄 กำลังทำ — ดูหัวข้อ 2 (Level 20 ถัดไป, Chapter 2, EP02 — Level 19 เสร็จแล้ว)** |
| Halaster's Reckoning | Level 22-23 (ไฟนอล) | 19-20 | ⬜ รอคิว |

---

## 7. เอกสารอ้างอิงที่ต้องรู้จักไว้เสมอ

- [`adventure-builder/journal-template.md`](../../adventure-builder/journal-template.md) — กฎรูปแบบ journal เต็ม (อ่านทุกครั้งก่อนเขียน EP)
- [`adventure-builder/structure-guide.md`](../../adventure-builder/structure-guide.md) — กฎโครงสร้างโฟลเดอร์/ไฟล์ (อ่านทุกครั้งก่อนเขียน)
- [`adventure-builder/canon-reference.md`](../../adventure-builder/canon-reference.md) — กฎเช็ค CR Wiki canon
- [`99-notes.md`](./99-notes.md) — กฎผสาน Companion เข้า WDMM (มี deviation เรื่อง Quick Notes placement ที่ตกลงกันแล้ว — ดูหัวข้อ 3.1)
- [`03-halasters-game-framework.md`](./03-halasters-game-framework.md) — กรอบ Halaster's Game ทั้งแคมเปญ (goals/gags/factions/gates)
- [`PROGRESS.md`](./PROGRESS.md) — checklist ละเอียดทุกบรรทัดของทุก Act/EP ที่ทำไปแล้ว
- Memory ถาวร: `project_waterdeep_duology_conversion.md` (ในโฟลเดอร์ memory ของ Claude) — ประวัติการตัดสินใจแบบเจาะจงเซสชันต่อเซสชัน, ลิงก์จาก `MEMORY.md` index

---

## 8. เมื่อผู้ใช้พิมพ์ "ทำต่อ" ในเซสชันถัดไป

1. อ่านไฟล์นี้ทั้งหมดก่อน
2. ยืนยันสั้นๆ 1 บรรทัดว่าจะทำ Level 20 (Runestone Caverns, Chapter 2 ของ Act 9 — EP02) ต่อ หรือถามถ้าผู้ใช้ระบุงานอื่นเจาะจง
3. เข้าสู่ขั้นตอนในหัวข้อ 2 ทันที ไม่ต้องถามซ้ำเรื่อง scope/รูปแบบที่ตกลงกันไปแล้วในหัวข้อ 3-5
4. ทำงานทีละ EP แล้วรายงานผล + ถามว่าทำต่อเลยไหมทุกครั้ง (ตามกฎข้อ 10 ในหัวข้อ 3)
5. อัปเดตไฟล์นี้ทุกครั้งที่จบก้อนงานใหญ่ (จบ 1 EP ขึ้นไป) ให้ "สถานะโดยรวม" (หัวข้อ 1) และ "งานถัดไปแบบเจาะจง" (หัวข้อ 2) ตรงกับความจริงเสมอ — ไฟล์นี้ต้อง**ไม่ล้าสมัย**ไม่ว่าจะกลับมาทำต่อเมื่อไหร่
