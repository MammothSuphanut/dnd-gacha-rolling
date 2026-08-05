# Class: Sacred Knight

> อัศวินผู้เข้าใจตัวตนภายในของตนเองลึกซึ้งขึ้นเรื่อยๆ จนสามารถปลดปล่อยพลัง **Aura** ออกมาได้ — เป็น martial ล้วน ไม่มี spellcasting แม้จะมี spell slot ติดตัว (spell slot ใช้แปลงเป็น Aura เท่านั้น ร่ายเวทไม่ได้เด็ดขาด) และพลังนี้ใช้ได้เฉพาะผู้ที่ยึดมั่นใน **Lawful alignment** เท่านั้น

## Designer's Note

แรงบันดาลใจหลักมาจากระบบ Knight (骑士) ในนิยาย/donghua จีนเรื่อง **Throne of Seal (神印王座 / Shen Yin Wang Zuo)** ซึ่งแบ่งอัศวินเป็นสองสาย Guardian Knight (守护骑士 เน้นป้องกัน/ซัพพอร์ต) และ Retribution Knight (惩戒骑士 เน้นโจมตี) — ชื่อ technique หลายตัวในไฟล์นี้แปล/ดัดแปลงมาจากทักษะจริงในเรื่อง (纯白之刃, 光剑, 十字斩, 升天阵曜日斩, 升龙击, 信念光环, 灵光罩, 守护恩赐 ฯลฯ)

โจทย์การออกแบบที่ตั้งไว้: อยากให้ resource หลักเป็น "spell slot ที่ใช้ร่ายเวทไม่ได้" (ฉีกจากภาพจำเดิม) และผูก power ทั้งหมดของ class ไว้กับ alignment จริงจัง (ไม่ใช่แค่ flavor แบบ Paladin's Oath) — เป็นการทดลองกลไก resource-reuse (spell slot → ทรัพยากรอื่นที่ไม่ใช่เวท) ที่ไม่เคยมีมาก่อนใน official 5e

## ข้อกำหนด Alignment (สำคัญ อ่านก่อนเล่น)

Sacred Knight ต้องเป็น **Lawful** (Lawful Good, Lawful Neutral, หรือ Lawful Evil) เท่านั้นจึงจะใช้ฟีเจอร์ที่เกี่ยวกับ **Aura** ได้ทั้งหมด (Aura Awakening, Aura Technique ทุกตัว, Domain ฯลฯ) — ความสามารถพื้นฐานที่ไม่เกี่ยวกับ Aura (การโจมตีด้วยอาวุธปกติ, proficiency, saving throw ฯลฯ) ยังใช้ได้ตามปกติเสมอ

หาก alignment ของตัวละครไม่ใช่ Lawful อีกต่อไป (เช่น ตัดสินใจเปลี่ยนเอง, โดนเวทมนตร์บังคับเปลี่ยน alignment, หรือ DM ตัดสินว่าเปลี่ยนจริงจากพฤติกรรมสะสม) **ฟีเจอร์ Aura ทั้งหมดปิดใช้งานทันที** จนกว่าจะกลับมา Lawful อีกครั้ง

- การกระทำผิดกฎ/ผิดจรรยาบรรณเพียงครั้งเดียวไม่ได้ทำให้เสีย Lawful ทันที — ให้ DM ใช้ดุลยพินิจแยกระหว่าง "เหตุการณ์ชั่วคราว" (ยังคง Lawful) กับ "การเปลี่ยน alignment จริง" (เสียสิทธิ์ใช้ Aura)
- Aura ที่ชาร์จค้างอยู่ตอนที่สูญเสีย Lawful จะคงอยู่แต่ใช้ไม่ได้ จนกว่าจะกลับมา Lawful (ไม่ได้เสียทิ้งทันที)

## Chassis

| หัวข้อ | ค่า |
|---|---|
| Hit Die | d10 |
| Saving Throws | Strength, Wisdom |
| Armor Proficiency | Light armor, Medium armor, Heavy armor, Shields |
| Weapon Proficiency | Simple weapons, Martial weapons |
| Skill Proficiency | เลือก 2 จาก: Athletics, Insight, Intimidation, Perception, Persuasion, Religion |
| Primary Ability | Strength |

## Aura — ระบบทรัพยากรหลัก

Sacred Knight มีตาราง **Spell Slot** เหมือน full caster (Wizard/Cleric/Druid) ทุกประการตามตาราง Level Progression ด้านล่าง แต่ **ร่ายเวทไม่ได้เด็ดขาด** — แม้จะได้ spell ผ่าน feat (เช่น Magic Initiate), multiclass, หรือแหล่งอื่นใด ก็ไม่สามารถใช้ spell slot ของ class นี้ร่ายเวทได้ (slot เหล่านี้มีไว้แปลงเป็น Aura เท่านั้น)

**การแปลง Spell Slot → Aura**
- **Bonus Action**: แปลง spell slot สูงสุด **2 ใบพร้อมกัน** เป็น Aura จำนวนเท่ากับผลรวมระดับของ slot ที่แปลง (เช่น แปลง slot ระดับ 3 + ระดับ 2 พร้อมกัน ได้ 5 Aura) — เป็นวิธีเดียวที่แปลง slot เป็น Aura ได้ (ไม่มีทางเลือกแปลงด้วย Action) ดังนั้น Action ยังว่างไปโจมตี/ใช้ technique ได้ตามปกติทุกเทิร์น
- Aura ที่ได้จากการแปลงจะสะสมอยู่ในตัวละคร ใช้จ่ายเป็นค่า Aura Technique ได้ทันทีหรือเทิร์นถัดๆ ไป
- **Aura ที่ยังไม่ได้ใช้จะคงอยู่นาน 1 นาที** (10 รอบ) นับจากตอนชาร์จ หลังจากนั้นเสื่อมสลายหายไป (เปลี่ยนแปลงที่เลเวล 20 — ดู [Transcendent Aura](#เลเวล-20--transcendent-aura-capstone))

**ไม่มีการจำกัดจำนวน Technique ต่อเทิร์น** — ใช้ได้เท่าที่มี Aura จ่ายไหว (Aura ที่มีจำกัดต่อวันเป็นตัวกันความถี่ในตัวอยู่แล้ว)

## Level Progression

| เลเวล | Proficiency Bonus | Feature |
|---|---|---|
| 1 | +2 | Choose Your Path (Retribution/Guardian), Aura Awakening, Aura Mastery (1 technique) |
| 2 | +2 | Aura Mastery, Awareness |
| 3 | +2 | Subclass Feature |
| 4 | +2 | Ability Score Improvement |
| 5 | +3 | Aura Upgrade (I) (Bonus Action แปลง 3 slot) |
| 6 | +3 | Subclass Feature |
| 7 | +3 | Technique Mastery (I) (+1 rank) |
| 8 | +3 | Ability Score Improvement |
| 9 | +4 | Aura Upgrade (II) (Bonus Action แปลง 4 slot) |
| 10 | +4 | Subclass Feature |
| 11 | +4 | Technique Mastery (II) (+1 rank) |
| 12 | +4 | Ability Score Improvement |
| 13 | +5 | Aura Upgrade (III) (Bonus Action แปลง 5 slot) |
| 14 | +5 | Subclass Feature |
| 15 | +5 | Technique Mastery (III) (+1 rank) |
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

## Class Features

### เลเวล 1 — Choose Your Path

เลือกหนึ่งใน 2 แนวทาง (แยกจากการเลือก Subclass ที่เลเวล 3):

- **Retribution** — อัศวินผู้ลงทัณฑ์ เน้นโจมตีและการสวนกลับ นิยมใช้อาวุธสองมือ (เช่น ดาบยาวสองมือ)
- **Guardian** — อัศวินผู้พิทักษ์ เน้นการตั้งรับและปกป้องพันธมิตร นิยมใช้โล่คู่กับอาวุธ

Path ที่เลือกกำหนดว่าใช้ Aura Technique สาย **Retribution** หรือ **Guardian** ได้ (ทั้งสองสายใช้ technique สาย **Universal** ร่วมกันได้เสมอ) — ดูรายละเอียดที่หัวข้อ [Aura Technique](#aura-technique)

### เลเวล 1 — Aura Awakening

ดูกลไกเต็มที่หัวข้อ [Aura — ระบบทรัพยากรหลัก](#aura--ระบบทรัพยากรหลัก) ด้านบน

### เลเวล 1 — Aura Mastery

ได้เรียนรู้ **Aura Technique** 1 ตัวแรก (เลือกจากลิสต์ Universal หรือลิสต์ตาม Path ที่เลือก)

ตั้งแต่เลเวลนี้เป็นต้นไป ได้รับ **แต้ม Aura Mastery 1 แต้มทุกเลเวล** (รวม 20 แต้มตลอด 1-20) ใช้แต้มได้ 2 แบบ (เลือกอย่างใดอย่างหนึ่งต่อแต้ม):

1. **เรียนรู้ Technique ใหม่** 1 ตัวจากลิสต์ที่ใช้ได้ (Universal + Path ตัวเอง)
2. **อัพเกรด Rank** ของ Technique ที่รู้อยู่แล้ว 1 ขั้น (rank+1 ไปจนถึง rank+5 สูงสุดต่อ technique)

### เลเวล 2 — Awareness

ใช้เวลา **1 นาที** โฟกัสสมาธิเข้าถึงตัวตนภายใน (ไม่ต้องรอ Short Rest) เพื่อฟื้นคืน spell slot ที่ใช้ไปได้ โดยระดับรวมของ slot ที่ฟื้นต้องไม่เกิน **Proficiency Bonus** ของตัวเอง (เช่น Prof +3 เลือกฟื้น slot ระดับ 3 ใบเดียว หรือ slot ระดับ 1 สามใบก็ได้) — ใช้ได้ **1 ครั้งต่อ Long Rest**

### เลเวล 5 — Aura Upgrade (I)

การแปลง Spell Slot เป็น Aura มีประสิทธิภาพขึ้น — **Bonus Action แปลงได้ 3 slot พร้อมกัน** (จากเดิม 2 slot)

> Sacred Knight ไม่ได้รับ Extra Attack ที่เลเวลนี้หรือเลเวลใดๆ ตลอด class — ดาเมจส่วนใหญ่มาจาก Aura Technique แทน

### เลเวล 7 — Technique Mastery (I)

ทุก Aura Technique ที่รู้จัก (รวมถึงที่จะเรียนรู้เพิ่มในอนาคต) ได้รับ **+1 rank ถาวรโดยอัตโนมัติ** ฟรี ไม่ต้องเสียแต้ม Aura Mastery

### เลเวล 9 — Aura Upgrade (II)

การแปลง Spell Slot เป็น Aura มีประสิทธิภาพขึ้นอีกขั้น — **Bonus Action แปลงได้ 4 slot พร้อมกัน** (จากเดิม 3 slot)

### เลเวล 11 — Technique Mastery (II)

ทุก Aura Technique ที่รู้จักได้ **+1 rank ถาวรโดยอัตโนมัติ** อีกครั้ง (สะสมรวมเป็น +2 จากเลเวล 7)

### เลเวล 13 — Aura Upgrade (III)

การแปลง Spell Slot เป็น Aura มีประสิทธิภาพขึ้นอีกขั้น — **Bonus Action แปลงได้ 5 slot พร้อมกัน** (จากเดิม 4 slot)

### เลเวล 15 — Technique Mastery (III)

ทุก Aura Technique ที่รู้จักได้ **+1 rank ถาวรโดยอัตโนมัติ** อีกครั้ง (สะสมรวมเป็น +3 จากเลเวล 7)

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

Technique แต่ละตัวมี **Cost** (จำนวน Aura ที่ต้องจ่ายเพื่อใช้) และมี **Rank** ที่อัพเกรดได้ผ่านแต้ม Aura Mastery (rank+1 ถึง rank+5 สูงสุด เว้นแต่ระบุไว้เป็นอย่างอื่น) — ลิสต์นี้เป็น **starter list** ตั้งใจให้ขยายเพิ่มเติมได้ในอนาคต (ดู [Designer's Note](#designers-note))

Technique สาย **Universal** ใช้ได้ทั้งสอง Path — Technique สาย **Retribution**/**Guardian** ใช้ได้เฉพาะผู้เลือก Path นั้นเท่านั้น

**กฎสำคัญ — Technique หลายครั้งต่อเทิร์น**: technique ที่ให้โจมตีหลายครั้งในเทิร์นเดียว (เช่น Cross Slash) ไม่ได้ทำให้ technique อื่นที่ผูกกับการโจมตี (เช่น Focused Edge, Light Sword) ติดไปกับทุกครั้งที่โจมตีโดยอัตโนมัติ — ถ้าต้องการให้ effect เหล่านั้นติดกับการโจมตีแต่ละครั้ง ต้องจ่าย Aura cost ของ technique นั้นแยกต่างหากในแต่ละครั้งที่โจมตี

### Universal

#### Pure White Blade — 1 Aura
เมื่อโจมตี เพิ่มระยะการโจมตีครั้งถัดไป — ถ้าการโจมตีครั้งนี้ติด สามารถเคลื่อนที่ได้ทันทีสูงสุด 10 ft โดยไม่โดน Opportunity Attack (ใช้ได้ทั้งระยะประชิดและระยะไกล)

| Rank | ระยะ | เพิ่มเติม |
|---|---|---|
| Base | 10 ft | — |
| +1 | 20 ft | — |
| +2 | 30 ft | — |
| +3 | 40 ft | — |
| +4 | 50 ft | — |
| +5 | 60 ft | ตราบใดที่เป้าหมายอยู่ในระยะ ignore ½ cover หรือ ¾ cover |

#### Swift Aura — 1 Aura
เพิ่ม Speed ของตัวเอง คงอยู่จนถึงต้นเทิร์นถัดไปของตัวเอง (ไม่ใช่แค่จบเทิร์นนี้) และ ignore difficult terrain ตลอดช่วงที่ผลยังอยู่

| Rank | Speed เพิ่ม | เพิ่มเติม |
|---|---|---|
| Base | +5 ft | — |
| +1 | +10 ft | — |
| +2 | +15 ft | — |
| +3 | +20 ft | — |
| +4 | +25 ft | — |
| +5 | +30 ft | เคลื่อนที่ผ่านช่องที่มีศัตรูยืนอยู่ได้โดยไม่โดน Opportunity Attack |

#### Focused Edge — 1 Aura ต่อ stack
เมื่อโจมตี เพิ่ม ATK Roll ตามจำนวน stack ที่จ่าย (จ่าย 1 Aura ต่อ stack เพิ่ม) — technique นี้หยุดที่ rank+4 ไม่มี rank+5

| Rank | Stack สูงสุด | Cost | ATK Roll |
|---|---|---|---|
| Base | 2 | 2 Aura | +2 |
| +1 | 4 | 4 Aura | +4 |
| +2 | 6 | 6 Aura | +6 |
| +3 | 8 | 8 Aura | +8 |
| +4 | 10 | 10 Aura | +10 |

#### Light Sword — 1 Aura ต่อ stack
เมื่อโจมตี เพิ่มดาเมจ Radiant ตามจำนวน stack ที่จ่าย (จ่าย 1 Aura ต่อ stack เพิ่ม)

| Rank | Stack สูงสุด | Cost | ดาเมจ |
|---|---|---|---|
| Base | 1 | 1 Aura | +1d4 |
| +1 | 2 | 2 Aura | +2d4 |
| +2 | 3 | 3 Aura | +3d4 |
| +3 | 4 | 4 Aura | +4d4 |
| +4 | 5 | 5 Aura | +5d4 |
| +5 | 5 | 5 Aura | +5d6 (เปลี่ยนชนิดลูกเต๋าเป็น d6) |

#### Clarity Aura — 1 Aura ต่อ stack
ก่อนทอย **Skill Check** ใดๆ ของตัวเอง (ต้องประกาศใช้ก่อนทอยลูกเต๋าเสมอ ใช้ย้อนหลังหลังเห็นผลไม่ได้) จ่าย Aura เพื่อเพิ่ม bonus ให้ check นั้นตามจำนวน stack ที่จ่าย — อัตราแลกเปลี่ยนเท่ากับ Focused Edge เป๊ะ (1 Aura = +1) เพื่อไม่ให้ถูกกว่า technique สายโจมตีโดยไม่มีเหตุผล

| Rank | Stack สูงสุด | Cost | Skill Check |
|---|---|---|---|
| Base | 1 | 1 Aura | +1 |
| +1 | 2 | 2 Aura | +2 |
| +2 | 3 | 3 Aura | +3 |
| +3 | 4 | 4 Aura | +4 |
| +4 | 5 | 5 Aura | +5 |

### Retribution

#### Cross Slash — Aura ต่อ stack (ไม่คงที่ ดูตาราง)
โจมตีด้วยอาวุธเพิ่มเติมภายในเทิร์นเดียวกัน — จำนวน stack ที่จ่าย = จำนวนครั้งที่โจมตีรวม

| Rank | Stack สูงสุด | Cost | จำนวนครั้งโจมตี |
|---|---|---|---|
| Base | 1 | 2 Aura | 1 |
| +1 | 2 | 4 Aura | 2 |
| +2 | 3 | 8 Aura | 3 |
| +3 | 4 | 12 Aura | 4 |
| +4 | 5 | 16 Aura | 5 |
| +5 | 6 | 20 Aura | 6 |

#### Vengeful Riposte — 1 Aura ต่อ stack (Reaction)
เมื่อโดนโจมตีติด จ่าย Aura เพื่อลดดาเมจที่ได้รับ — ถ้าลดจนเหลือ 0 ส่วนที่เหลือ (overflow) จะสะท้อนกลับไปเป็นดาเมจใส่ผู้โจมตี

| Rank | Stack สูงสุด | Cost | ลดดาเมจ |
|---|---|---|---|
| Base | 1 | 1 Aura | 1d4 |
| +1 | 2 | 2 Aura | 2d4 |
| +2 | 3 | 3 Aura | 3d4 |
| +3 | 4 | 4 Aura | 4d4 |
| +4 | 5 | 5 Aura | 5d4 |
| +5 | 5 | 5 Aura | 5d6 (เปลี่ยนชนิดลูกเต๋าเป็น d6) |

#### Sun Slash — 1 Aura ต่อ stack
โจมตีแบบพลังพวยพุ่งรอบตัวเป็นพื้นที่สี่เหลี่ยมจัตุรัส — ทุกเป้าหมายในพื้นที่ทำ Dexterity Saving Throw (DC = 8 + Proficiency Bonus + Wisdom modifier) รับดาเมจ Radiant ตามจำนวน stack ที่จ่าย (เซฟผ่านลดดาเมจครึ่งหนึ่ง)

| Rank | Stack สูงสุด | Cost | พื้นที่ | ดาเมจ |
|---|---|---|---|---|
| Base | 1 | 2 Aura | 5×5 ft | 1d6 |
| +1 | 2 | 4 Aura | 10×10 ft | 2d6 |
| +2 | 3 | 6 Aura | 15×15 ft | 3d6 |
| +3 | 4 | 8 Aura | 15×15 ft | 4d6 |
| +4 | 5 | 10 Aura | 20×20 ft | 5d6 |
| +5 | 5 | 10 Aura | 20×20 ft | 5d8 (เปลี่ยนชนิดลูกเต๋าเป็น d8) |

### Guardian

#### Aegis Aura — 1 Aura
เพิ่ม AC ของตัวเองจนถึงต้นเทิร์นถัดไป

| Rank | AC | เพิ่มเติม |
|---|---|---|
| Base | +1 | — |
| +1 | +2 | — |
| +2 | +3 | — |
| +3 | +4 | — |
| +4 | +5 | — |
| +5 | +5 | ได้ Resistance ต่อดาเมจประเภทที่โดนโจมตีครั้งนั้นด้วย |

#### Steadfast Aura — 1 Aura
เพิ่ม Saving Throw ครั้งถัดไปของตัวเอง **หรือของพันธมิตร 1 คนในระยะ 10 ft** (เลือกเป้าหมายตอนใช้)

| Rank | Saving Throw | เพิ่มเติม |
|---|---|---|
| Base | +1 | — |
| +1 | +2 | — |
| +2 | +3 | — |
| +3 | +4 | — |
| +4 | +5 | — |
| +5 | +5 | ถ้า save ผ่าน ไม่รับดาเมจเลย (จากปกติที่ควรได้ครึ่งหนึ่ง) — ถ้า save พลาด รับดาเมจครึ่งหนึ่ง (จากปกติที่ควรได้เต็ม) |

#### Divine Block — 3 Aura ต่อ stack
เมื่อโดนโจมตีติด จ่าย Aura เพื่อลดดาเมจที่ได้รับ — ถ้าลดจนเหลือ 0 ส่วนที่เหลือ (overflow) จะแปลงเป็น Temporary HP ให้ตัวเอง (ไม่เสีย Reaction — ใช้ได้แม้ Reaction ถูกใช้ไปแล้ว)

| Rank | Stack สูงสุด | Cost | ลดดาเมจ |
|---|---|---|---|
| Base | 1 | 3 Aura | 1d4 |
| +1 | 2 | 6 Aura | 2d4 |
| +2 | 3 | 9 Aura | 3d4 |
| +3 | 4 | 12 Aura | 4d4 |
| +4 | 5 | 15 Aura | 5d4 |
| +5 | 5 | 15 Aura | 5d6 (เปลี่ยนชนิดลูกเต๋าเป็น d6) |

#### Guardian's Blessing — 5 Aura (Reaction)
เมื่อพันธมิตรในระยะกำลังจะโดน attack roll หรือถูกบังคับทำ saving throw สลับตำแหน่งกับพันธมิตรคนนั้นทันที แล้วรับการโจมตี/saving throw นั้นแทน (ใช้ Reaction — ถ้า Reaction ถูกใช้ไปแล้วในเทิร์นนั้น ใช้ technique นี้ไม่ได้)

| Rank | ระยะ | เพิ่มเติม |
|---|---|---|
| Base | 10 ft | — |
| +1 | 15 ft | — |
| +2 | 20 ft | — |
| +3 | 25 ft | — |
| +4 | 30 ft | — |
| +5 | 30 ft | ได้ Resistance ต่อดาเมจที่รับแทนครั้งนั้นด้วย |

## Subclass

Sacred Knight เลือก Subclass ตอนเลเวล 3 (ได้ feature เพิ่มที่เลเวล 3, 6, 10, 14) — ยังไม่มี subclass ที่ออกแบบไว้ในขณะนี้ ดู subclass ที่จะเพิ่มในอนาคตใน `homebrew-subclass/Sacred-Knight/`

**แนวทางออกแบบ Subclass ในอนาคต**: ให้ subclass ทำหน้าที่ "ต่อยอด/อัพเกรด Technique ที่มีอยู่แล้ว" เป็นหลัก แทนที่จะเพิ่มกลไกใหม่แยกขาด — เช่น subclass สาย A อาจให้ Focused Edge แรงขึ้นเป็นพิเศษ (rank เพิ่มเร็วกว่าปกติ/ปลดล็อก rank+5 ที่เดิมไม่มี), subclass สาย B อาจให้ Cross Slash ทะลุเพดาน 4 ครั้งโจมตีได้ ฯลฯ — วิธีนี้ทำให้แต่ละ subclass รู้สึกเหมือน "สายการเล่น" ที่ผูกกับ technique หลักที่เลือกใช้บ่อย ไม่ใช่แค่ feature แถมที่แยกจากระบบหลัก

## ข้อจำกัดของแอปนี้

Class นี้เป็น **design doc/homebrew supplement** ไม่ได้ผูกเข้ากลไก roll อัตโนมัติของแอป (`src/data/classes.json` เป็นตาราง roll ของ subclass เท่านั้น ไม่มีตาราง "roll ทั้ง class") — เมื่อมี subclass ของ Sacred Knight อย่างน้อย 1 ตัวแล้ว จะเพิ่ม `group: "Sacred Knight"` เข้า `src/data/classes.json` ให้ roll ได้จริงในแอป
