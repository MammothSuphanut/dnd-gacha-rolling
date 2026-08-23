# Novice Base Job (Job ID 1000 — ก่อน Job Change เลเวล 3)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — วัตถุดิบอ้างอิง skill จริงของ "Novice" เอง (ตัว base job ก่อนเปลี่ยนอาชีพ ไม่ใช่ 1st Class อย่าง Swordsman/Mage) สำหรับใช้ออกแบบ Class Features เลเวล 1-2 ที่ตาราง [Level Progression](Novice-Concept.md#level-progression) ยังเว้นว่างไว้ ("-") — คู่กับไฟล์ fork อื่นๆ ที่แยกตาม Job Path (Knight.md, Crusader.md, ฯลฯ) แต่ไฟล์นี้ไม่มี fork เพราะ Novice เป็น job เดียว ไม่แตกสาย

> 🚧 **สถานะ: DRAFT** — มี D&D Feature Draft แล้วสำหรับ Strike/First Aid/Play Dead ในรูปแบบ **Track (Rank 1-4)** ตาม [ระบบการเลือก/อัพเกรด Track](Novice-Concept.md#ระบบการเลือกอัพเกรด-track-pick--upgrade-schedule) ของ Novice-Concept.md — ได้ทั้ง **3 Track อัตโนมัติ ไม่ต้องเลือก** (Strike + First Aid ที่ level 1, Play Dead ที่ level 2) ทุก Track อัป Rank เองพร้อมกันที่ lv9/13/17 จนเต็ม Rank 4 ตอน lv17 — **Tame Pet ตัดออกจากสโคปแล้ว ไม่ใช้งาน** และ Skill #1000104 ที่ไม่มีข้อมูลต้นทางก็ไม่ใช้เช่นกัน

## ROX Skill Reference — Novice (Base Job)

> ดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1000) — Novice มีสกิลทั้งหมด 5 ช่อง (Talent: ไม่มี)

| Skill | ID | Type | Max Lv | Range | Description |
|---|---|---|---|---|---|
| **Strike** | 1000101 | Active | 1 | 2 | Deal 200% physical damage to an enemy. |
| **First Aid** | 1000102 | Active | 1 | 0 | Heal yourself for 300 HP. |
| **Play Dead** | 1000103 | Active | 1 | 0 | Lie on the floor and feign death, clearing all Threat from monsters. Restores self Max HP by 10% and self Max SP by 10% every 5 seconds while active. |
| *(ไม่มีชื่อ)* | 1000104 | Active | 0 | 0 | ไม่มีข้อมูลในฐานข้อมูล ROXPEDIA — Max Lv 0 บ่งชี้ว่าอาจเป็น placeholder/สกิลที่ไม่ได้ใช้งานจริงในเกม |
| **Tame Pet** | 1000105 | Active | 1 | 9 | Attempt to tame a wild monster into a pet. Lower monster HP% increases taming success rate and resulting pet stat quality. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1000)

**หมายเหตุข้อมูล**: Skill #1000104 ไม่มีชื่อ/คำอธิบาย/Max Lv ในฐานข้อมูลต้นทาง (Max Lv = 0) — น่าจะเป็นช่อง placeholder ที่เกมไม่ได้เปิดใช้จริง ไม่ใช่ความผิดพลาดในการดึงข้อมูล ปล่อยว่างไว้จนกว่าจะเจอแหล่งอื่นยืนยัน

## D&D Feature Draft — Novice (Base Job)

> 🔄 **2026-08-22 (rev. 2 — แปลงเป็น Track ตามระบบกลาง)**: เปลี่ยนจาก "ได้ทั้ง 3 feature พร้อมกันที่ level 1 ค่าตายตัว" → **3 Track (Rank 1-4)** ตาม [ระบบการเลือก/อัพเกรด Track](Novice-Concept.md#ระบบการเลือกอัพเกรด-track-pick--upgrade-schedule) กลาง
>
> 🔄 **2026-08-23 (rev. 3 — เลิกเลือก กลับไปได้ทั้ง 3 อัตโนมัติ + auto-upgrade)**: rev. 2 เคยให้เลือก 2 จาก 3 ที่ level 1/2 — เปลี่ยนใจกลับมาเป็น **ได้ทั้ง 3 อัตโนมัติ ไม่ต้องเลือก** เพราะ level 1-2 ยังไม่มีข้อมูลระบบพอจะเดิมพันเลือกทิ้งอันนึงถาวร (ไม่มี Respec) — **Strike + First Aid ที่ level 1, Play Dead ที่ level 2** — Rank ขึ้นเองพร้อมกันทั้ง 3 Track (ไม่ต้องเลือก ไม่มีแต้ม) ที่ **level 9 (→R2), 13 (→R3), 17 (→R4 เต็ม)** ตามกฎกลางใน [Novice-Concept.md](Novice-Concept.md#ระบบการเลือกอัพเกรด-track-pick--upgrade-schedule) — จุดนี้ร่วมกับ Job Path Track ที่เลือกไว้ตอน level 3 ด้วย (ทุก Track ที่ถืออยู่ ณ ตอนนั้นอัปพร้อมกันหมด)
>
> 🔄 **2026-08-23 (rev. 4 — Play Dead กลายเป็นจุดคืนมานาเดียวของระบบ แทน Short Rest)**: คู่กับการตัด Short Rest recovery ออกทั้งระบบใน [Novice-Concept.md](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules) — **Play Dead** เปลี่ยนจาก "คืนมานาบางส่วนสเกลตาม Rank (2/4/8/16)" → **คืนมานาเต็ม pool ทันทีต่อการใช้ 1 ครั้ง เท่ากันทุก Rank ไม่ scale อีกต่อไป** (คอนเฟิร์มแล้วว่าไม่ต้องมี progression ต่อ Rank) — เพิ่มเงื่อนไข **Action, ใช้เวลา 1 นาที, นอกการต่อสู้เท่านั้น** กันไม่ให้ spam กลางไฟต์ — โควตาการใช้ลองตั้งที่ **Proficiency Bonus ครั้ง/วัน** ก่อน พบว่า Day Math ไม่ผ่าน (โตแบบ quadratic) จึงล็อกใหม่เป็น **2 ครั้ง/วันคงที่ทุกเลเวล** แทน (ดู rev. 5 ด้านล่าง) — ผ่าน sanity check แล้ว ดูรายละเอียดที่ตาราง reference ใน Novice-Concept.md
>
> 🔄 **2026-08-23 (rev. 5 — ล็อกโควตา Play Dead ที่ 2 ครั้ง/วัน)**: แก้โควตา Play Dead จาก Proficiency Bonus ครั้ง/วัน → **2 ครั้ง/วันคงที่** ตามที่แก้ไว้ใน Novice-Concept.md — ทำให้ Total Mana/วันโตเชิงเส้นตาม Pool เท่านั้น (Pool × 3) แทนที่จะโตแบบ quadratic ตาม Proficiency Bonus

| Track | หมวด | Mana | Rank 1 (หยิบครั้งที่ 1) | Rank 2 | Rank 3 | Rank 4 |
|---|---|---|---|---|---|---|
| **Strike** | Action | 1/2/3/4 | โจมตี 1 ครั้ง (แทนที่การโจมตีด้วยอาวุธปกติ — ไม่ใช้ลูกเต๋าดาเมจอาวุธอีกต่อไป) ทำดาเมจ **2d8** | ...**4d8** | ...**6d8** | ...**8d8** |
| **First Aid** | Action | 1/2/3/4 | เลือกเป้าหมาย 1 ตัวในระยะประชิด (ตัวเองหรือพันธมิตร) ฟื้น HP **2d8** | ...**4d8** | ...**6d8** | ...**8d8** |
| **Play Dead** | Action | 0 ทุก Rank | นอนนิ่งทำเป็นตาย 1 นาที (ต้องอยู่นอกการต่อสู้) จบแล้วคืน mana **เต็ม pool ทันที** — ใช้ได้ไม่เกิน **2 ครั้ง/วัน คงที่ทุกเลเวล** (ไม่ผูกกับ Proficiency Bonus, รีเซ็ตตอน Long Rest) | เหมือน Rank 1 | เหมือน Rank 1 | เหมือน Rank 1 |

> ⚠️ **หมายเหตุ (2026-08-22)**: ราคา mana ของ Strike/First Aid (1/2/3/4) เป็นราคาที่ผมตั้งเทียบ cost band เดิม (ตาม pattern เดียวกับ Weapon Empower ใน [Knight.md](Knight.md#8-track-หลัก-passiveactionbonus-actionreaction) — จ่ายมากขึ้นตาม Rank) ยังไม่ได้ confirm จากผู้ใช้ ปรับได้ถ้าต้องการราคาอื่น — Play Dead ยังคง 0 mana (มันคือตัวที่*ให้*มานาคืน ไม่ใช่ตัวที่เสียมานา) แต่เปลี่ยนจาก Passive ผูกกับ Short Rest → **Action ที่ผู้เล่นกดใช้เองได้ (1 นาที, นอกการต่อสู้), จำกัดด้วย limited-use resource 2 ครั้ง/วันคงที่** (ดู rev. 4/5 ด้านบน) — ตัด HP-heal component เดิมของ Play Dead (ทอย d8×Prof Bonus) ออกเช่นเดิม เพราะโจทย์ยังเน้นแค่ mana refund ล้วน ถ้าอยากเก็บ HP-heal ไว้ด้วยแจ้งได้

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Strike: ตัดกลไก "200% ATK" ตรงตัวออก (ตัวเลขจากเกมมือถือสเกลสูงเกินสำหรับ level 1) → แปลงเป็นท่าโจมตีที่ทอย **Xd8 คงที่แทนลูกเต๋าอาวุธ** สเกลตาม Rank แทน — ตัดขาดจากอาวุธที่ถืออยู่โดยเจตนา (ถืออาวุธอะไรก็ได้ดาเมจเท่ากัน แลกกับการเสียโบนัสจากลูกเต๋าอาวุธวิเศษ/Weapon Mastery property)
- First Aid: 300 HP ต้นฉบับสเกลสูงเกิน level 1 เช่นกัน → ใช้ Xd8 สเกลตาม Rank เดียวกับ Strike และขยายเป็นรักษา**พันธมิตรในระยะประชิดได้ด้วย** ไม่ใช่แค่ตัวเองแล้ว (เปลี่ยนบทบาทจาก self-sustain เป็น battlefield support เล็กน้อย — ดูความเห็นเรื่อง overlap กับ Priest ที่เคยพูดถึง)
- Play Dead: ตัดกลไก "เคลียร์ threat" ออก (D&D ไม่มีระบบ threat/aggro ตรงๆ) เก็บแก่น "นอนนิ่งฟื้นตัว" ไว้เป็นแก่นธีม — 🔄 rev. 4: ไม่ผูกกับ Short Rest แล้ว (ระบบตัด Short Rest recovery ทิ้งทั้งหมด) กลายเป็น**ปุ่มคืนมานาเต็ม pool ที่ผู้เล่นกดใช้เอง Action, 1 นาที, นอกการต่อสู้เท่านั้น** ไม่ scale ตาม Rank แล้ว (เดิม rev. 3 เคยสเกล 2/4/8/16 ตอนยังเป็น partial refund ผูก short rest) — 🔄 rev. 5: โควตาที่ลองตั้ง Prof Bonus ครั้ง/วันก่อน ทำให้ Day Math ไม่ผ่าน (โต quadratic) จึงล็อกใหม่เป็น **2 ครั้ง/วันคงที่ทุกเลเวล**
- Tame Pet: 🔄 **2026-08-23** ตัดออกจากสโคปแล้ว (ไม่ทำเป็น pet mechanic) — ไม่ใช่ Track ของ pool นี้อีกต่อไป
- **เช็ค Day Math**: ย้ายไปคำนวณรวมที่ตาราง reference ใน [Novice-Concept.md](Novice-Concept.md#กฎการใช้-mana-mana-usage-rules) แล้ว (เพราะตอนนี้ Play Dead กระทบ Total Mana/วันของทั้งระบบ ไม่ใช่แค่ Novice-Base) — ✅ ผ่าน sanity check แล้วหลังล็อกที่ 2 ครั้ง/วัน ดูรายละเอียดที่ไฟล์นั้น
