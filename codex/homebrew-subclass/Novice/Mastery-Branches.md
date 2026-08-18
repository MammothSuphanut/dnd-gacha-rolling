# Mastery Branches (Novice)

> ไม่ใช่ทุกพลังจะมาจากคาถา — Mastery Branch คือเทคนิคเฉพาะทางที่สั่งสมมาจากการฝึกฝนตามสายอาชีพ ยิ่งลึกเท่าไหร่ในเส้นทางของตัวเอง ยิ่งเข้าถึงเทคนิคที่คนอื่นทำตามไม่ได้

> 🚧 **สถานะ: DRAFT** — ระบบนี้เพิ่งออกแบบเป็นฉบับร่างแรก ยังไม่ผ่าน balance check และมีแค่สาย Swordsman ที่ทำเป็นตัวอย่างครบ ส่วนอีก 6 สายยังไม่ได้ลงเนื้อหา (ดู "ยังไม่ได้ทำ" ท้ายไฟล์)

## Designer's Note

จุดเริ่มต้นของไฟล์นี้: ผู้ใช้อยากให้ class [Novice](Novice.md) รู้สึกเหมือน **full caster** (มีตัวเลือกกว้าง ปรับ build ได้ลึก เหมือนมี "สเปลลิสต์" ของตัวเอง) แต่**ไม่ใช้ spell ของ D&D** — Mastery Branch คือคำตอบของโจทย์นี้: แทนที่จะได้ spell slot คุณได้ "Mastery Point" มาเลือกเทคนิคจาก pool ที่ล็อกด้วยเงื่อนไข Job+Level (เหมือนระบบ skill tree จริงของ RO ที่ skill หนึ่งต้องมี skill ก่อนหน้าถึงระดับหนึ่งก่อนถึงจะเรียนได้)

ระบบนี้เป็น**ของเสริม**นอกเหนือจาก Job Path หลัก (feature ที่เลเวล 3/5/7/10/11/14/15/17/19 ใน [Novice.md](Novice.md) ยังเหมือนเดิมทุกอย่าง) — Mastery Branch คือชั้นตัวเลือกเพิ่มที่ทำให้แต่ละตัวละครในสายเดียวกัน (เช่น Lord Knight สองตัว) เล่นไม่เหมือนกันได้ ตาม build ที่เลือก

## กติกาการทำงาน

### เงื่อนไข (Prerequisite)

Mastery Branch แต่ละอันมีเงื่อนไขรูปแบบ **"\<ชื่อ Job\> \<เลเวล\>+"** เช่น "Swordsman 3+", "Knight 7+", "Lord Knight 15+" — หมายถึง:

1. คุณต้องมี Job identity นั้นอยู่ (เลือกสายนั้นไว้แล้ว ณ ตอนนี้)
2. character level ของคุณต้องถึงเกณฑ์ที่ระบุ

ในทางปฏิบัติ **ชื่อ Job ที่ระบุมักบอกเลเวลขั้นต่ำอยู่แล้วในตัว** (Swordsman มีได้ตั้งแต่เลเวล 3, Knight/Crusader ตั้งแต่เลเวล 7, Lord Knight/Paladin ตั้งแต่เลเวล 15, Rune Knight/Royal Guard ตั้งแต่เลเวล 19 — ดูตาราง [Job Tree Reference](Novice.md#rox-job-tree-reference-ทางการ)) ตัวเลขที่ใส่ต่อท้ายชื่อ Job จึงมีไว้เพื่อความชัดเจน ปกติจะตรงกับเลเวลที่ Job นั้นปลดล็อกพอดี

**เมื่อสายแตก (fork) แล้ว** Mastery Branch ของอีกฝั่งที่ไม่ได้เลือกจะเลือกไม่ได้อีกต่อไป (เช่น เลือก Knight ตอนเลเวล 7 แล้ว จะหยิบ Mastery Branch ที่ต้องการ Crusader ไม่ได้)

### Mastery Point

คุณรู้จัก Mastery Branch ได้จำนวนจำกัดตามตาราง (นับรวมทุกอันที่เลือกไว้ ไม่ใช่แค่ที่เพิ่งได้ใหม่):

| เลเวล | Mastery Branch ที่รู้จัก |
|---|---|
| 1 | 1 |
| 2 | 2 |
| 6 | 3 |
| 9 | 4 |
| 13 | 5 |
| 18 | 6 |

จังหวะนี้ตรงกับทุกเลเวลที่ Job Path **ไม่มี** feature ใหม่ และ**ไม่ใช่**เลเวล Ability Score Improvement (ดูตาราง [Level Progression](Novice.md#level-progression) — เว้นเลเวล 3/5/7/10/11/14/15/17/19 ที่เป็น Job feature, เลเวล 4/8/12/16/19 ที่เป็น ASI, และเลเวล 20 ที่เป็น Living Legend capstone ของ class อยู่แล้ว) เพิ่ม Mastery Point 1 แต้มทุกครั้ง — หมายเหตุ: เลเวล 1-2 ยังไม่มี Job (เลือกตอนเลเวล 3) จึงยังใช้แต้มไม่ได้จนกว่าจะเลือก Job แต้มที่ได้ก่อนหน้าจะสะสมรอไว้

**สลับ Mastery Branch**: ทุกครั้งที่ได้ Mastery Point ใหม่ คุณสลับ Mastery Branch ที่เคยรู้จัก 1 อันเป็นอันอื่นที่มีสิทธิ์เลือกได้ ณ ตอนนั้นก็ได้ (ไม่บังคับ) — ถ้า fork ทำให้ Mastery Branch ที่รู้จักอยู่ขาดคุณสมบัติ (เช่นเลือก Knight ทั้งที่รู้จัก Mastery Branch ฝั่ง Crusader) ให้สลับอันนั้นทิ้งฟรีทันทีโดยไม่นับเป็นการสลับปกติ

### การใช้งาน

Mastery Branch มี 2 แบบ:

- **Passive**: มีผลตลอดเวลา ไม่ต้องใช้ action หรือเสียการใช้งานใดๆ
- **Active**: ต้องจ่ายจาก **Mastery Uses** — pool ใช้ร่วมกันทั้งหมด (แยกจาก Instinct Dice และ uses เฉพาะของแต่ละ Job feature) มีจำนวนเท่า Proficiency Bonus ต่อ Long Rest

Active Mastery Branch บางอันอาจมี cap ของตัวเอง (เช่น "1 ครั้งต่อ Long Rest") แยกจาก Mastery Uses ถ้าระบุไว้ชัดเจนในตัวมันเอง — ให้ยึดตามที่ระบุไว้ในแต่ละอัน

**Save DC**: ใช้สูตรเดียวกับ [Novice.md § Chassis](Novice.md#chassis) — 8 + Proficiency Bonus + primary ability modifier ของ Job ปัจจุบัน

---

## Mastery Branch Pool — Swordsman Lineage

*ตัวอย่างเต็มรูปแบบ อ้างอิงจาก real skill ของ RO ที่ยังไม่ได้ใช้ใน [Novice.md](Novice.md) (Magnum Break, Two-Hand Sword Mastery, Spear Mastery, Cavalier Mastery, Frenzy, Death Bound, King's Grace)*

**Magnum Break** — *Swordsman 3+* — Active (Mastery Use) เป็น action ระเบิดไฟรอบตัวคุณรัศมี 10 ฟุต สิ่งมีชีวิตในพื้นที่ (ไม่รวมตัวคุณ) ทอย Dexterity save (DC มาตรฐาน) รับดาเมจไฟ 2d6 (fail) หรือครึ่งหนึ่ง (success)

**Two-Hand Sword Mastery** — *Swordsman 3+* — Passive ขณะถืออาวุธประชิดสองมือ ดาเมจจากการโจมตีเพิ่ม +1

**Spear Mastery** — *Swordsman 3+* — Passive ขณะถือหอก/polearm ดาเมจจากการโจมตีเพิ่ม +1

**Vital Strike** — *Knight 7+ หรือ Crusader 7+* — Active (Mastery Use) เป็น bonus action การโจมตีด้วยอาวุธครั้งถัดไปในเทิร์นนี้ ถ้าโดน จะไม่ถูกลดดาเมจจาก resistance ของเป้าหมาย (ยังคง immune ตามปกติถ้าเป้าหมาย immune จริง)

**Cavalier Mastery** — *Knight 7+ หรือ Crusader 7+* — Passive ขณะขี่ม้า/สัตว์พาหนะ คุณได้ +2 AC และสัตว์พาหนะของคุณไม่ถูกบังคับให้ตกใจหนี (frightened ไม่ทำให้มันวิ่งหนีเอง)

**Frenzy** — *Lord Knight 15+ หรือ Paladin 15+* — Active (Mastery Use) เป็น bonus action เป็นเวลา 1 นาที คุณได้ advantage บนการโจมตีระยะประชิด และเพิ่มดาเมจ +1d6 แต่คุณมี disadvantage บน Dexterity saving throw ตลอดช่วงเวลานี้

**Death Bound** — *Lord Knight 15+* — Passive, reaction (1 ครั้งต่อ Long Rest, ไม่ใช้ Mastery Use) เมื่อดาเมจจะทำให้คุณเหลือ 0 HP สิ่งมีชีวิตที่สร้างดาเมจนั้นให้คุณ (ถ้าอยู่ในระยะ 5 ฟุต) รับดาเมจย้อนกลับเท่ากับดาเมจที่คุณเพิ่งรับ ก่อนที่ดาเมจของคุณจะถูกคำนวณ

**King's Grace** — *Rune Knight 19+ หรือ Royal Guard 19+* — Active (Mastery Use) เป็น action ล้าง 1 condition (blinded, charmed, deafened, frightened, paralyzed, หรือ poisoned) จากตัวคุณเองและพันธมิตรไม่เกิน 2 ตัวในระยะ 30 ฟุต แล้วให้ทุกคนที่ถูกล้าง condition มี immunity ต่อ condition ประเภทนั้นเป็นเวลา 1 นาที

---

## ยังไม่ได้ทำ

Mastery Branch Pool ของอีก 6 สาย (Mage, Archer, Thief, Acolyte, Merchant, Super Novice) ยังไม่ได้ออกแบบ — แนวทางเดียวกับ Swordsman ด้านบน: หยิบ real skill ของ RO ที่ยังไม่ถูกใช้ใน [Novice.md](Novice.md) มาแปลงเป็น Mastery Branch โดยผูกเงื่อนไข Job+Level ตาม tier ของสายนั้นๆ

Super Novice อาจต้องออกแบบกติกาแยกเฉพาะ (เพราะไม่มี Job tier ให้ผูกเงื่อนไขแบบสายอื่น — อาจใช้ Borrowed Talent ที่เลือกไว้แทน หรือเปิด Mastery Branch pool ทั้งหมดให้เลือกข้ามสายได้เลย) ยังไม่ได้ตัดสินใจ
