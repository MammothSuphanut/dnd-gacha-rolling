# Class: Aura Knight

> อัศวินผู้เข้าใจตัวตนภายในของตนเองลึกซึ้งขึ้นเรื่อยๆ จนสามารถปลดปล่อยพลัง **Aura** ออกมาได้ — เป็น martial ล้วน ไม่มี spellcasting แม้จะมี spell slot ติดตัว (spell slot ใช้แปลงเป็น Aura เท่านั้น ร่ายเวทไม่ได้เด็ดขาด) และพลังนี้ใช้ได้เฉพาะผู้ที่ยึดมั่นใน **Lawful alignment** เท่านั้น

## Designer's Note

แรงบันดาลใจหลักมาจากระบบ Knight (骑士) ในนิยาย/donghua จีนเรื่อง **Throne of Seal (神印王座 / Shen Yin Wang Zuo)** ซึ่งแบ่งอัศวินเป็นสองสาย Guardian Knight (守护骑士 เน้นป้องกัน/ซัพพอร์ต) และ Retribution Knight (惩戒骑士 เน้นโจมตี) — ชื่อ technique หลายตัวในไฟล์นี้แปล/ดัดแปลงมาจากทักษะจริงในเรื่อง (纯白之刃, 光剑, 十字斩, 升天阵曜日斩, 升龙击, 信念光环, 灵光罩, 守护恩赐 ฯลฯ)

โจทย์การออกแบบที่ตั้งไว้: อยากให้ resource หลักเป็น "spell slot ที่ใช้ร่ายเวทไม่ได้" (ฉีกจากภาพจำเดิม) และผูก power ทั้งหมดของ class ไว้กับ alignment จริงจัง (ไม่ใช่แค่ flavor แบบ Paladin's Oath) — เป็นการทดลองกลไก resource-reuse (spell slot → ทรัพยากรอื่นที่ไม่ใช่เวท) ที่ไม่เคยมีมาก่อนใน official 5e

## ข้อกำหนด Alignment (สำคัญ อ่านก่อนเล่น)

Aura Knight ต้องเป็น **Lawful** (Lawful Good, Lawful Neutral, หรือ Lawful Evil) เท่านั้นจึงจะใช้ฟีเจอร์ที่เกี่ยวกับ **Aura** ได้ทั้งหมด (Aura Awakening, Aura Technique ทุกตัว, Domain ฯลฯ) — ความสามารถพื้นฐานที่ไม่เกี่ยวกับ Aura (การโจมตีด้วยอาวุธปกติ, proficiency, saving throw ฯลฯ) ยังใช้ได้ตามปกติเสมอ

หาก alignment ของตัวละครไม่ใช่ Lawful อีกต่อไป (เช่น ตัดสินใจเปลี่ยนเอง, โดนเวทมนตร์บังคับเปลี่ยน alignment, หรือ DM ตัดสินว่าเปลี่ยนจริงจากพฤติกรรมสะสม) **ฟีเจอร์ Aura ทั้งหมดปิดใช้งานทันที** จนกว่าจะกลับมา Lawful อีกครั้ง

- การกระทำผิดกฎ/ผิดจรรยาบรรณเพียงครั้งเดียวไม่ได้ทำให้เสีย Lawful ทันที — ให้ DM ใช้ดุลยพินิจแยกระหว่าง "เหตุการณ์ชั่วคราว" (ยังคง Lawful) กับ "การเปลี่ยน alignment จริง" (เสียสิทธิ์ใช้ Aura)
- Aura ที่ชาร์จค้างอยู่ตอนที่สูญเสีย Lawful จะคงอยู่แต่ใช้ไม่ได้ จนกว่าจะกลับมา Lawful (ไม่ได้เสียทิ้งทันที)

## Chassis

| หัวข้อ | ค่า |
|---|---|
| Hit Die | d10 |
| Saving Throws | Strength, Wisdom |
| Armor Proficiency | Light armor, Medium armor (Guardian ได้ Heavy armor + Shields เพิ่มจาก Path — ดู [Choose Your Path](#เลเวล-1--choose-your-path)) |
| Weapon Proficiency | Simple weapons (ทั้งหมด), Martial weapons ที่มีคุณสมบัติ **Versatile** เท่านั้น (เช่น Longsword, Battleaxe, Warhammer, Spear, Trident, War Pick, Quarterstaff) |
| Skill Proficiency | เลือก 2 จาก: Athletics, Insight, Intimidation, Perception, Persuasion, Religion |
| Primary Ability | Strength |

## Aura — ระบบทรัพยากรหลัก

Aura Knight มีตาราง **Spell Slot** เหมือน full caster (Wizard/Cleric/Druid) ทุกประการตามตาราง Level Progression ด้านล่าง แต่ **ร่ายเวทไม่ได้เด็ดขาด** — แม้จะได้ spell ผ่าน feat (เช่น Magic Initiate), multiclass, หรือแหล่งอื่นใด ก็ไม่สามารถใช้ spell slot ของ class นี้ร่ายเวทได้ (slot เหล่านี้มีไว้แปลงเป็น Aura เท่านั้น)

**การแปลง Spell Slot → Aura**
- **Bonus Action**: แปลง spell slot สูงสุด **2 ใบพร้อมกัน** เป็น Aura จำนวนเท่ากับผลรวมระดับของ slot ที่แปลง (เช่น แปลง slot ระดับ 3 + ระดับ 2 พร้อมกัน ได้ 5 Aura) — เป็นวิธีเดียวที่แปลง slot เป็น Aura ได้ (ไม่มีทางเลือกแปลงด้วย Action) ดังนั้น Action ยังว่างไปโจมตี/ใช้ technique ได้ตามปกติทุกเทิร์น
- Aura ที่ได้จากการแปลงจะสะสมอยู่ในตัวละคร ใช้จ่ายเป็นค่า Aura Technique ได้ทันทีหรือเทิร์นถัดๆ ไป
- **Aura ที่ยังไม่ได้ใช้จะคงอยู่นาน 1 นาที** (10 รอบ) นับจากตอนชาร์จ หลังจากนั้นเสื่อมสลายหายไป (เปลี่ยนแปลงที่เลเวล 20 — ดู [Transcendent Aura](#เลเวล-20--transcendent-aura-capstone))

**ไม่มีการจำกัดจำนวน Technique ต่อเทิร์น** — ใช้ได้เท่าที่มี Aura จ่ายไหว (Aura ที่มีจำกัดต่อวันเป็นตัวกันความถี่ในตัวอยู่แล้ว)

## Level Progression

| เลเวล | Proficiency Bonus | Feature |
|---|---|---|
| 1 | +2 | Choose Your Path (Retribution/Guardian), Aura Awakening, Aura Mastery (2 techniques) |
| 2 | +2 | Aura Surge |
| 3 | +2 | Subclass Feature, Aura Mastery (1 technique) |
| 4 | +2 | Ability Score Improvement |
| 5 | +3 | Aura Upgrade (I) (Bonus Action แปลง 3 slot) |
| 6 | +3 | Subclass Feature |
| 7 | +3 | Aura Mastery (1 technique) |
| 8 | +3 | Ability Score Improvement |
| 9 | +4 | Aura Upgrade (II) (Bonus Action แปลง 4 slot) |
| 10 | +4 | Subclass Feature |
| 11 | +4 | Aura Mastery (1 technique) |
| 12 | +4 | Ability Score Improvement |
| 13 | +5 | Aura Upgrade (III) (Bonus Action แปลง 5 slot) |
| 14 | +5 | Subclass Feature |
| 15 | +5 | Aura Mastery (1 technique) |
| 16 | +5 | Ability Score Improvement |
| 17 | +6 | Domain |
| 18 | +6 | Domain Growth |
| 19 | +6 | Ability Score Improvement, Domain Growth |
| 20 | +6 | Transcendent Aura (Capstone — Aura ไม่เสื่อมสลาย), Domain Growth |

### ตาราง Spell Slot (สำหรับแปลงเป็น Aura เท่านั้น — ร่ายเวทไม่ได้)

| เลเวล | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2 | | | | | | | | |
| 2 | 3 | | | | | | | | |
| 3 | 4 | 2 | | | | | | | |
| 4 | 4 | 3 | | | | | | | |
| 5 | 4 | 3 | 2 | | | | | | |
| 6 | 4 | 3 | 3 | | | | | | |
| 7 | 4 | 3 | 3 | 1 | | | | | |
| 8 | 4 | 3 | 3 | 2 | | | | | |
| 9 | 4 | 3 | 3 | 3 | 1 | | | | |
| 10 | 4 | 3 | 3 | 3 | 2 | | | | |
| 11 | 4 | 3 | 3 | 3 | 2 | 1 | | | |
| 12 | 4 | 3 | 3 | 3 | 2 | 1 | | | |
| 13 | 4 | 3 | 3 | 3 | 2 | 1 | 1 | | |
| 14 | 4 | 3 | 3 | 3 | 2 | 1 | 1 | | |
| 15 | 4 | 3 | 3 | 3 | 2 | 1 | 1 | 1 | |
| 16 | 4 | 3 | 3 | 3 | 2 | 1 | 1 | 1 | |
| 17 | 4 | 3 | 3 | 3 | 2 | 1 | 1 | 1 | 1 |
| 18 | 4 | 3 | 3 | 3 | 3 | 1 | 1 | 1 | 1 |
| 19 | 4 | 3 | 3 | 3 | 3 | 2 | 1 | 1 | 1 |
| 20 | 4 | 3 | 3 | 3 | 3 | 2 | 2 | 1 | 1 |

### ตาราง Aura Conversion Reference

| เลเวล | แปลง slot ทั้งหมด = กี่ Aura | BA ดึงได้สูงสุด 1 เทิร์น | รวมถ้าใช้ Aura Surge ด้วย (ต่อวัน) |
|---|---|---|---|
| 1 | 2 | 2 (2 ใบ) | 6 |
| 2 | 3 | 2 (2 ใบ) | 7 |
| 3 | 8 | 4 (2 ใบ) | 12 |
| 4 | 10 | 4 (2 ใบ) | 14 |
| 5 | 16 | 8 (3 ใบ) | 25 |
| 6 | 19 | 9 (3 ใบ) | 28 |
| 7 | 23 | 10 (3 ใบ) | 32 |
| 8 | 27 | 11 (3 ใบ) | 36 |
| 9 | 36 | 17 (4 ใบ) | 52 |
| 10 | 41 | 18 (4 ใบ) | 57 |
| 11 | 47 | 20 (4 ใบ) | 63 |
| 12 | 47 | 20 (4 ใบ) | 63 |
| 13 | 54 | 27 (5 ใบ) | 79 |
| 14 | 54 | 27 (5 ใบ) | 79 |
| 15 | 62 | 31 (5 ใบ) | 87 |
| 16 | 62 | 31 (5 ใบ) | 87 |
| 17 | 71 | 35 (5 ใบ) | 107 |
| 18 | 76 | 35 (5 ใบ) | 112 |
| 19 | 82 | 36 (5 ใบ) | 118 |
| 20 | 89 | 37 (5 ใบ) | 125 |

> **วิธีคิดแต่ละคอลัมน์**: คอลัมน์ 1 = Σ(ระดับ slot × จำนวน slot) ทุกระดับที่มีในวันนั้น (เพดานสูงสุดถ้าแปลงหมดเกลี้ยงไม่เหลือ slot เลย) — คอลัมน์ 2 = แปลงแบบเลือก slot ระดับสูงสุดเท่าที่มีใส่โควตา BA ครั้งเดียว (2/3/4/5 ใบ ตาม Aura Upgrade I/II/III ที่ปลดล็อกตามเลเวล) เป็นค่าสูงสุดที่เป็นไปได้ **ในเทิร์นเดียว** ถ้า slot ยังเต็มอยู่ ไม่ใช่ค่าที่ทำซ้ำได้ทุกเทิร์น — คอลัมน์ 3 = คอลัมน์ 1 + (Proficiency Bonus × Proficiency Bonus) จาก Aura Surge (ได้ PB Aura ฟรีทุกครั้งที่ทอย initiative ใช้ได้สูงสุด PB ครั้ง/Long Rest) เป็นเพดานทางทฤษฎีถ้าเจอไฟต์ครบจำนวนครั้งเท่า PB และทุ่ม Action/Bonus Action ไปกับการแปลง slot ที่เหลือทั้งหมดด้วย ในทางปฏิบัติจริงจะน้อยกว่านี้เพราะต้องเอา Action ไปโจมตี/ใช้ technique ด้วย

## Class Features

### เลเวล 1 — Choose Your Path

เลือกหนึ่งใน 2 แนวทาง (แยกจากการเลือก Subclass ที่เลเวล 3) — แต่ละ Path มอบ **proficiency เพิ่มเติม** นอกเหนือจาก Chassis พื้นฐาน ตามสไตล์การต่อสู้:

- **Retribution** — อัศวินผู้ลงทัณฑ์ เน้นโจมตีและการสวนกลับ ถืออาวุธ versatile ข้างละเล่ม (dual wield) เช่น longsword คู่, warhammer คู่, battleaxe คู่ ฯลฯ ได้ฟีเจอร์ **Twin Blade Stance**:
  - ถืออาวุธ versatile ข้างละเล่มพร้อมกันได้ (ไม่ผูกกับกฎ Two-Weapon Fighting ใดๆ ทั้งสิ้น — **ไม่ได้โจมตีเพิ่มด้วย Bonus Action** แค่เพื่อความเท่ตามคอนเซ็ปต์ล้วนๆ)
  - อาวุธ versatile ที่ตัวเองถือ ใช้ **ดาเมจไดซ์แบบสองมือ** ได้เสมอ ไม่ว่าจะถือมือเดียวหรือถือคู่ (เช่น longsword = 1d10 เสมอ แทนที่จะเป็น 1d8 ตอนถือมือเดียว)
  - ได้ **AC +1** เสมอไม่ว่าจะถืออาวุธกี่เล่ม (ไม่ต้องถือครบสองมือถึงจะได้)
  - ชักอาวุธออกจากฝัก/เก็บอาวุธเข้าฝักได้ครั้งละ 2 เล่ม (แทนที่จะเป็น 1 เล่มตามปกติ)
- **Guardian** — อัศวินผู้พิทักษ์ เน้นการตั้งรับและปกป้องพันธมิตร นิยมใช้โล่คู่กับอาวุธ ได้ **Armor Proficiency เพิ่ม: Heavy armor, Shields**

Path ที่เลือกกำหนดว่าใช้ Aura Technique สาย **Retribution** หรือ **Guardian** ได้ (ทั้งสองสายใช้ technique สาย **Universal** ร่วมกันได้เสมอ) — ดูรายละเอียดที่หัวข้อ [Aura Technique](#aura-technique)

### เลเวล 1 — Aura Awakening

ดูกลไกเต็มที่หัวข้อ [Aura — ระบบทรัพยากรหลัก](#aura--ระบบทรัพยากรหลัก) ด้านบน

### เลเวล 1 — Aura Mastery

เรียนรู้ **Aura Technique** ใหม่ 2 ตัวแรกทันที (เลือกจากลิสต์ Universal หรือลิสต์ตาม Path ที่เลือก)

ได้ฟีเจอร์ Aura Mastery เพิ่มอีกที่เลเวล **3, 7, 11, 15** — เลเวลละ **1 technique ใหม่** (รวมทั้งเกม 6 ตัวตลอด 1-20)

**ไม่มีระบบอัพเกรด Rank** — แต่ละ Technique มีค่าคงที่ตัวเดียวตลอดทั้งเกม ไม่ว่าจะเรียนรู้ตอนเลเวลไหน กำลังของตัวละครโตขึ้นผ่าน Aura ที่มีมากขึ้น/แปลงได้เร็วขึ้นตาม [Aura Upgrade](#เลเวล-5--aura-upgrade-i) และผ่านจำนวน Technique ที่รู้เพิ่มขึ้น ไม่ใช่ผ่านการอัพเกรด Technique เดิม

### เลเวล 2 — Aura Surge

ทุกครั้งที่ทอย **Initiative** เข้าสู่การต่อสู้ ได้รับ Aura ทันที **เท่ากับ Proficiency Bonus** ของตัวเอง โดยไม่เสีย action หรือเวลาใดๆ — ใช้ได้สูงสุด **Proficiency Bonus ครั้งต่อ Long Rest** (เช่น Prof +4 ใช้ได้ 4 ครั้ง/วัน ได้ครั้งละ 4 Aura)

> ใช้ดุลยพินิจ DM — ไม่นับไฟต์ที่ผู้เล่นจงใจก่อขึ้นเพื่อฟาร์ม Aura Surge โดยเฉพาะ (เช่น ยั่วมอนสเตอร์อ่อนแอให้ตีเพื่อทอย initiative เก็บของ)

### เลเวล 5 — Aura Upgrade (I)

การแปลง Spell Slot เป็น Aura มีประสิทธิภาพขึ้น — **Bonus Action แปลงได้ 3 slot พร้อมกัน** (จากเดิม 2 slot)

> Aura Knight ไม่ได้รับ Extra Attack ที่เลเวลนี้หรือเลเวลใดๆ ตลอด class — ดาเมจส่วนใหญ่มาจาก Aura Technique แทน

### เลเวล 9 — Aura Upgrade (II)

การแปลง Spell Slot เป็น Aura มีประสิทธิภาพขึ้นอีกขั้น — **Bonus Action แปลงได้ 4 slot พร้อมกัน** (จากเดิม 3 slot)

### เลเวล 13 — Aura Upgrade (III)

การแปลง Spell Slot เป็น Aura มีประสิทธิภาพขึ้นอีกขั้น — **Bonus Action แปลงได้ 5 slot พร้อมกัน** (จากเดิม 4 slot)

### เลเวล 17 — Domain

ใช้ **Action** จ่าย **10 Aura** เพื่อกางเขตแดน (Domain) รัศมี **15 ft** รอบตัวเอง ณ จุดที่กางขึ้น (จุดศูนย์กลางไม่เคลื่อนตามตัวละคร)

**คงสภาพ**: ต้นเทิร์นของตัวเอง จ่าย **2 Aura** เพื่อคง Domain ไว้ต่อ ไม่จ่าย = Domain ปิดทันที การจะย้ายตำแหน่ง Domain ต้องปิดแล้วเปิดใหม่เท่านั้น (เสีย Action + Aura ใหม่)

ขณะที่ Domain เปิดอยู่:
- เจ้าของ Domain เคลื่อนที่แบบวาป (teleport) ไปยังจุดใดก็ได้ภายใน Domain โดยใช้ระยะเคลื่อนที่เพียง 5 ft
- ศัตรูภายใน Domain ไม่สามารถทำ Opportunity Attack ได้
- เจ้าของ Domain มี Advantage บนการโจมตีและ saving throw ทุกครั้งขณะอยู่ใน Domain
- ศัตรูมี Disadvantage บนการโจมตีเจ้าของ Domain และบน saving throw ที่เกี่ยวข้องกับเจ้าของ Domain เสมอ ขณะอยู่ใน Domain

### เลเวล 18/19/20 — Domain Growth

รัศมีของ Domain ขยายเพิ่มขึ้นตามเลเวล (ผลอื่นๆ ของ Domain เหมือนเดิมทุกประการ):

| เลเวล | รัศมี Domain |
|---|---|
| 17 | 15 ft |
| 18 | 20 ft |
| 19 | 25 ft |
| 20 | 30 ft |

### เลเวล 20 — Transcendent Aura (Capstone)

**Aura ที่ชาร์จไว้ไม่เสื่อมสลายอีกต่อไป** — คงอยู่จนกว่าจะถูกใช้จ่าย หรือจนกว่าจะทำ Long Rest (เดิมเสื่อมภายใน 1 นาทีตาม [Aura — ระบบทรัพยากรหลัก](#aura--ระบบทรัพยากรหลัก)) — ตัวละครที่บรรลุถึงเลเวลนี้เข้าใจตัวตนภายในลึกซึ้งจนสามารถควบคุม Aura ให้คงสภาพได้ตามใจปรารถนา ไม่ต้องเร่งรีบปล่อยพลังออกอีกต่อไป

## Aura Technique

Technique แต่ละตัวมี **Cost** คงที่ (จำนวน Aura ที่ต้องจ่ายเพื่อใช้) — ไม่มีระบบ Rank/อัพเกรดอีกต่อไป ค่าที่ระบุคือค่าสุดท้ายตลอดทั้งเกม — ลิสต์นี้เป็น **starter list** ตั้งใจให้ขยายเพิ่มเติมได้ในอนาคต (ดู [Designer's Note](#designers-note))

Technique สาย **Universal** ใช้ได้ทั้งสอง Path — Technique สาย **Retribution**/**Guardian** ใช้ได้เฉพาะผู้เลือก Path นั้นเท่านั้น

**กฎสำคัญ — Technique หลายครั้งต่อเทิร์น**: technique ที่ให้โจมตีหลายครั้งในเทิร์นเดียว (เช่น Cross Slash) ไม่ได้ทำให้ technique อื่นที่ผูกกับการโจมตี (เช่น Focused Edge, Light Sword) ติดไปกับทุกครั้งที่โจมตีโดยอัตโนมัติ — ถ้าต้องการให้ effect เหล่านั้นติดกับการโจมตีแต่ละครั้ง ต้องจ่าย Aura cost ของ technique นั้นแยกต่างหากในแต่ละครั้งที่โจมตี

### Universal

#### Pure White Blade — 1 Aura ต่อ stack
เมื่อโจมตี เพิ่มระยะการโจมตีของการโจมตีครั้งนี้ **+5 ft ต่อ stack** ที่จ่าย (จ่าย 1 Aura ต่อ stack เพิ่ม) — ใช้ได้ทั้งระยะประชิดและระยะไกล ไม่มีเพดาน stack สูงสุด จำกัดแค่ Aura ที่มีอยู่

#### Swift Aura — 1 Aura ต่อ stack
เพิ่ม Speed ของตัวเอง **+10 ft ต่อ stack** ที่จ่าย คงอยู่จนถึงต้นเทิร์นถัดไปของตัวเอง (ไม่ใช่แค่จบเทิร์นนี้) และ ignore difficult terrain ตลอดช่วงที่ผลยังอยู่ — ไม่มีเพดาน stack สูงสุด จำกัดแค่ Aura ที่มีอยู่ (ระยะที่เพิ่มจาก technique นี้ **แยกคำนวณจาก base Speed** — เวลา Dash ได้ 2 เท่าเฉพาะ base Speed เท่านั้น ไม่รวมส่วนนี้)

#### Focused Edge — 1 Aura ต่อ stack
เมื่อโจมตี เพิ่ม ATK Roll **+1 ต่อ stack** ที่จ่าย (จ่าย 1 Aura ต่อ stack เพิ่ม) — ไม่มีเพดาน stack สูงสุด จำกัดแค่ Aura ที่มีอยู่

#### Clarity Aura — 1 Aura ต่อ stack
ก่อนทอย **Skill Check** ใดๆ ของตัวเอง (ต้องประกาศใช้ก่อนทอยลูกเต๋าเสมอ ใช้ย้อนหลังหลังเห็นผลไม่ได้) จ่าย Aura เพื่อเพิ่ม **+1 ต่อ stack** ให้ check นั้น — อัตราแลกเปลี่ยนเท่ากับ Focused Edge เป๊ะ (1 Aura = +1) เพื่อไม่ให้ถูกกว่า technique สายโจมตีโดยไม่มีเหตุผล ไม่มีเพดาน stack สูงสุด จำกัดแค่ Aura ที่มีอยู่

### Retribution

#### Cross Slash — เริ่มที่ 3 Aura ต่อ stack แล้วเพิ่มขึ้นทุก stack
โจมตีด้วยอาวุธเพิ่มเติมภายในเทิร์นเดียวกัน — ต้นทุนของ stack ที่ N (การโจมตีเพิ่มครั้งที่ N นอกเหนือจากการโจมตีฐาน) = **N+2 Aura** (stack 1 = 3, stack 2 = 4, stack 3 = 5, ... ไล่ขึ้นไปเรื่อยๆ) ไม่มีเพดาน จำกัดแค่ Aura ที่มีอยู่

| จำนวนครั้งโจมตีรวม | Aura รวมที่ใช้ |
|---|---|
| 1 (ฐาน ไม่ใช้ technique) | 0 |
| 2 | 3 |
| 3 | 7 |
| 4 | 12 |
| 5 | 18 |
| 6 | 25 |

#### Vengeful Riposte — 3 Aura
เมื่อโดนโจมตีติด จ่าย 3 Aura เพื่อโจมตีสวนกลับด้วยอาวุธที่ถืออยู่ทันที 1 ครั้ง — **ไม่เสีย Reaction** ใช้ได้ทุกครั้งที่โดนตี (จำกัดแค่ Aura ที่มีอยู่ ไม่จำกัดจำนวนครั้ง/เทิร์น)

#### Light Sword — 1 Aura ต่อ stack
เมื่อโจมตี เพิ่มดาเมจ Radiant **+1d4 ต่อ stack** ที่จ่าย (จ่าย 1 Aura ต่อ stack เพิ่ม) — ไม่มีเพดาน stack สูงสุด จำกัดแค่ Aura ที่มีอยู่ *(ย้ายมาจากสาย Universal — เดิม Sun Slash เคยอยู่ตรงนี้ ถูกตัดออกแล้ว ดู [subclass-concepts.md](subclass-concepts.md) สำหรับที่มา)*

### Guardian

#### Aegis Aura — Reaction, 1 Aura หักล้างดาเมจได้ 2
เมื่อโดนโจมตีติดและทราบดาเมจแล้ว จ่าย Aura เพื่อหักล้างดาเมจที่ได้รับในอัตรา **1 Aura ต่อดาเมจ 2 หน่วย** (เช่น โดนดาเมจ 10 จ่าย 5 Aura หักล้างได้หมด) — จ่ายน้อยกว่าก็หักล้างได้ตามสัดส่วน ไม่มีเพดาน จำกัดแค่ Aura ที่มีอยู่

#### Steadfast Aura — 2 Aura ต่อ 1 แต้มที่ขาดจาก DC
เมื่อ Saving Throw ของตัวเองพลาด (fail) จ่าย Aura ทันทีหลังทราบผลทอย เพื่อเปลี่ยนผลเป็นผ่าน (Success) ได้ — อัตรา **2 Aura ต่อ 1 แต้มที่ขาดจาก DC** (เช่น ทอยได้ 10 ต้องการ DC 15 ขาดอยู่ 5 แต้ม จ่าย 10 Aura เพื่อผ่าน)

#### Guardian's Swap — 1 Aura ต่อ 5 ft (Reaction)
จ่าย Reaction และ Aura ตามระยะทาง (**1 Aura ต่อ 5 ft**) เพื่อสลับตำแหน่งเข้าไปแทนที่เป้าหมาย 1 คนภายในระยะที่จ่ายไหว (ใช้ได้ทั้งพันธมิตรและศัตรู) — เป้าหมายที่ถูกสลับจะถูกย้ายไปยังตำแหน่งใหม่ในระยะ 5 ft จากจุดเดิม (เลือกตำแหน่งได้เอง) การสลับตำแหน่งนี้ไม่กระตุ้น Opportunity Attack

## Subclass

Aura Knight เลือก Subclass ตอนเลเวล 3 (ได้ feature เพิ่มที่เลเวล 3, 6, 10, 14) — ยังไม่มี subclass ที่ออกแบบกลไกเต็มไว้ในขณะนี้ วางแผนไว้ทั้งหมด **7 ตัว** (6 ตัวอิงบัลลังก์จาก Throne of Seal + 1 ตัวคอนเซ็ปต์ใหม่ของโปรเจกต์) — ดูร่าง concept ของแต่ละตัวที่ [subclass-concepts.md](subclass-concepts.md)

**แนวทางออกแบบ Subclass ในอนาคต**: ให้ subclass ทำหน้าที่ "ต่อยอด/อัพเกรด Technique ที่มีอยู่แล้ว" เป็นหลัก แทนที่จะเพิ่มกลไกใหม่แยกขาด — เช่น subclass สาย A อาจให้ Focused Edge/Light Sword ลดต้นทุน Aura ต่อ stack ลง (ถูกกว่า 1 Aura/stack ปกติ), subclass สาย B อาจให้ Cross Slash ลดอัตราคูณต้นทุนต่อ stack ลง (จากปกติ stack ที่ N ราคา N+2 Aura เหลือถูกกว่านั้น เช่น N+1) ฯลฯ — วิธีนี้ทำให้แต่ละ subclass รู้สึกเหมือน "สายการเล่น" ที่ผูกกับ technique หลักที่เลือกใช้บ่อย ไม่ใช่แค่ feature แถมที่แยกจากระบบหลัก

## ข้อจำกัดของแอปนี้

Class นี้เป็น **design doc/homebrew supplement** ไม่ได้ผูกเข้ากลไก roll อัตโนมัติของแอป (`src/data/classes.json` เป็นตาราง roll ของ subclass เท่านั้น ไม่มีตาราง "roll ทั้ง class") — เมื่อมี subclass ของ Aura Knight อย่างน้อย 1 ตัวแล้ว จะเพิ่ม `group: "Aura Knight"` เข้า `src/data/classes.json` ให้ roll ได้จริงในแอป
