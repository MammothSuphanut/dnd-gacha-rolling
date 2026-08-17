# Monster Hunter — Subclass Level Overlay (ชั้น 2)

**อ้างอิง**: [monster-hunter-level-baseline.md](monster-hunter-level-baseline.md) (Class Baseline, ชั้น 1) + [monster-hunter-subclass-scorecard-2024.md](monster-hunter-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 4 Guild (Carver, Devourer, Occultist, Trapper) — Monster Hunter Subclass gate ที่ lv3/7/10/15/18 (ตรงกับ "(Subclass feature — ยกเว้น)" ในตาราง Chassis ของ baseline)
**รูปแบบ**: full table ต่อแกน (≤10 subclass) — ระบุเฉพาะช่วงเลเวลที่เกรด**ต่างจาก baseline**; ช่วงที่ไม่ระบุ = เท่า baseline
**หมายเหตุข้อมูล**: Devourer Guild's "Mutations" และ Trapper Guild's "Trapper Gadgets"/"Armor Modifications" ไม่มีรายละเอียดเต็มในไฟล์ข้อมูล (มีแค่หัวข้อ ตามที่ old scorecard เองก็ flag ไว้) — ให้เกรดแบบระมัดระวัง (0 delta) ในแกนที่พึ่งพารายการเหล่านี้เพียงอย่างเดียวโดยไม่มี named feature อื่นรองรับ

**Baseline โดยสรุป** (สำหรับเทียบ): Damage B(1-4)→C(5-10)→A(11-19)→S(20) · Control D(1-19)→C(20) · Support D(1-16)→C(17-20) · Survivability B(1-13)→A(14-20) · Action Economy C(1-4)→D(5-10)→C(11-20) · Utility **D(1-20) flat** · Versatility B(1)→C(2-20)

---

## Carver Guild

Fear-immune tank-bruiser ขับด้วย reaction ซ้อน reaction — old score สูงสุดในกลุ่ม (Damage 9, AE 9)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 3-4 | **A** | Close Quarters (reaction extra 1d6→3d6 ดาเมจทุกครั้งที่ตีเมลีโดน) = Magnitude เพิ่มจริงตั้งแต่ subclass gate แรก |
| Damage | 5-10 | **B** | Close Quarters ชดเชยช่วง dip ที่ยังไม่มี Extra Attack ได้บางส่วน (ดาเมจต่อฮิตคงที่แม้ attack เดียว) |
| Damage | 11-17 | A | เท่า baseline — Close Quarters ตอนนี้เสริมมิติที่ favorable อยู่แล้ว (same-dimension) ไม่ข้าม threshold ใหม่ |
| Damage | 18-20 | **S** | Controlled Footwork (lv18, reaction 2 ครั้ง/รอบ) = ทวีคูณจำนวนครั้ง Close Quarters trigger ได้ต่อรอบ — กลไกใหม่จริง ไม่ใช่แค่เสริมมิติเดิม → ข้าม A ไป S ก่อน baseline (lv20) |
| Control | 3-9 | **C** | Close Quarters (Disadvantage โจมตีถัดไปของเป้า) = floor escape แรก (baseline D ตลอดจนถึง lv19) |
| Control | 10-14 | **B** | Terrorize the Terrors (lv10, reaction-attack → Frightened) = hard-CC จริงตัวแรกในคลาสนี้ |
| Control | 15-20 | **A** | Deadly Redirect (lv15, Disadvantage **ทุก**การโจมตีของเป้า ไม่ใช่แค่ครั้งถัดไป) = debuff-lock ยาวนานกว่าเดิม |
| Support | 3-6 | D | เท่า baseline — True Grit ยังไม่ปลดล็อก |
| Support | 7-20 | **C** | True Grit (ปลด Frightened ให้ ally ผ่าน reaction-attack trigger) = floor escape เร็วกว่า baseline's Slayer's Aid (lv17) ถึง 10 เลเวล |
| Survivability | 3-20 | **A** | Equipped for Battle (heavy armor prof, Mitigation ขึ้น) + True Grit (immune Frightened จาก Grimoire + Advantage ต้าน Frightened ทั่วไป, Debuff Resistance ขึ้น — general ไม่ผูก Grimoire) → tally พลิกจาก 3 below (B) เหลือ 1 below → กลับ Primary(A) ทันทีตั้งแต่ subclass gate แรก แทนที่จะรอถึง lv14 |
| Action Economy | 18-20 | **B** | Controlled Footwork (2 reaction/รอบ) = Extra-Action-Access ใหม่ (ไม่ใช่แค่ reliability ของ reaction เดิม) → tally 2 favorable/2 below (เสมอ) → กลับ Primary(B) |
| Utility | — | D(1-20) | เท่า baseline flat — ไม่มีฟีเจอร์แตะ Utility เลย |
| Versatility | — | B(1)→C(2-20) | เท่า baseline — ทุกฟีเจอร์ยังคง melee-single-target, ไม่มี resource pool ใหม่, ไม่พลิก modifier |

---

## Devourer Guild

ธีมกินเนื้อ-กลายพันธุ์ — กระจาย 5/7 axis แต่ไม่มีแกนไหนถึง S เลย (ตรงกับ old score ที่ไม่มี 9-10 เลยสักตัว)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 5-6 | C | เท่า baseline — Synchronized Response ยังไม่ปลดล็อก |
| Damage | 7-10 | **B** | Synchronized Response (lv7, extra 1d6 ดาเมจต่อ reaction-attack นาน 1 นาทีหลังกินเนื้อ) = Magnitude เพิ่มแต่มีเงื่อนไข(ต้องกินเนื้อก่อน) แคบกว่า Carver's Close Quarters → ยกได้แค่ 1 ขั้น ไม่ถึง A |
| Control | — | D(1-19)→C(20) | เท่า baseline — "Mutations" ไม่ยืนยันรายละเอียด Control ได้ |
| Support | 15-16 | **C** | Alchemical Decoctions (lv15, แปลง Mutation เป็นยาให้ ally กิน) = floor escape เร็วกว่า baseline's Slayer's Aid (lv17) |
| Support | 17-20 | **B** | Alchemical Decoctions + baseline's Slayer's Aid (lv17) ซ้อนกัน 2 กลไก ally-support พร้อมกัน |
| Survivability | 10-20 | **A** | Gnawing Hunger (lv10, temp HP = ครึ่ง/เต็มดาเมจที่สร้างเมื่อตีเมลีโดน, Int mod/rest) = Mitigation-adjacent ทั่วไป (ไม่ผูก Grimoire ต่างจาก baseline's Knowledgeable Defense) → tally พลิกจาก 3 below เหลือ 2 → เสมอ 2-2 → กลับ Primary(A) เร็วกว่า baseline 4 เลเวล |
| Action Economy | — | C(1-4)→D(5-10)→C(11-20) | เท่า baseline — Acquired Taste (lv18) เสริมแค่ reliability ของ reaction เดิม (same-dimension) ไม่ข้าม threshold ใหม่ |
| Utility | — | D(1-20) | เท่า baseline flat — Alchemist's/Cook's tool prof ไม่ใช่ Magnitude-unlock (ไม่มีสเปลล์) |
| Versatility | — | B(1)→C(2-20) | เท่า baseline — "Mutations" ให้เกรดแบบระมัดระวังเพราะไม่ยืนยันได้ว่าพลิก modifier ไหนจริง (data incompleteness) |

---

## Occultist Guild

Hybrid นักล่าอสูร-นักเวทย์ต้านเวทมนตร์ — **ขยับทุกแกนทั้ง 7 แกน**, กว้างที่สุดในกลุ่มและในบรรดา Guild ทั้งหมดของคลาสนี้

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | 3-17 | **A** | เข้าถึง spell list ของ Wizard (blast spell) ตั้งแต่ subclass gate แรก — ปิดช่วง dip (5-10) ได้เต็มเพราะสเปลล์ไม่ผูกกับ Extra Attack |
| Damage | 18-20 | **S** | Arcane Response (lv18, แคสสเปลล์ผ่าน Studied Response โดยไม่เสีย action เพิ่ม) = trigger ใหม่ทั้งหมด ไม่ใช่แค่เสริมมิติเดิม → ข้าม A ไป S ก่อน baseline |
| Control | 3-6 | **C** | เข้าถึง control spell ของ Wizard (สเปลล์ระดับต้น) = floor escape (baseline D ตลอด lv1-19) |
| Control | 7-14 | **B** | Mage Hunter (lv7, Disadvantage Concentration save ของเป้า Grimoire type ที่โดนดาเมจ) + สล็อตสเปลล์มากขึ้น |
| Control | 15-20 | **A** | Magical Aegis (lv15) เสริมประสิทธิภาพ control ให้ทีม + สล็อตระดับสูงขึ้น |
| Support | 15-20 | **C** | Magical Aegis (lv15, AoE 20ft ให้ Advantage บน save ต้านสเปลล์ของ Grimoire type แก่ ally) = floor escape เร็วกว่า baseline's Slayer's Aid 2 เลเวล |
| Survivability | — | B(1-13)→A(14-20) | เท่า baseline — Arcane Interference ผูก Grimoire-type เหมือน baseline's Knowledgeable Defense (narrowness เดิม ไม่พลิก modifier ใหม่); free Counterspell (lv15) เสริมช่วงที่เป็น A(14-20) อยู่แล้ว (same-dimension, ไม่มี S tier ให้ Survivability ในคลาสนี้) |
| Action Economy | 18-20 | **B** | Arcane Response (แคสฟรีติดกับ reaction เดิม) = Extra-Action-Access ใหม่ → tally 2 favorable/2 below (เสมอ) → กลับ Primary(B) |
| Utility | 3-9 | **C** | เข้าถึง cantrip/สเปลล์ของ Wizard = **Primary(Magnitude) ปลดล็อกจริง** ครั้งแรกในคลาสนี้ (floor-lock ของ baseline มีเงื่อนไข "ไม่มีสเปลล์เลย" — Occultist มีสเปลล์แล้ว) |
| Utility | 10-14 | **B** | Occult Knowledge (lv10, ritual casting + 2 ritual spell จาก Cleric/Druid/Wizard) |
| Utility | 15-20 | **A** | สล็อตสเปลล์ระดับสูงขึ้น + Magical Aegis's info-adjacent utility |
| Versatility | 2 | C | เท่า baseline — สเปลล์ยังไม่ปลดล็อกจนถึง subclass gate แรก |
| Versatility | 3-20 | **A** | สเปลล์ list เต็มของ Wizard = พลิก Target-Type Coverage (AoE/ranged/utility เทียบ baseline's melee-single) **และ** Resource Fungibility (สล็อตสเปลล์ = shared pool ที่ fungible จริง ต่างจาก baseline ที่ไม่มี pool เลย) **และ** Adaptability — เหมือน pattern "full alt spell list" ที่เจอใน Eldritch Knight/Spellslinger/Investigator's Occultist |

---

## Trapper Guild

ผู้เชี่ยวชาญดักซุ่มโจมตี+ปรับแต่งเกราะ — ขยับ 3/7 แกน (ระมัดระวังกับ Trapper Gadgets/Armor Modifications ที่ไม่ยืนยันรายละเอียดได้)

| Axis | Lv | Grade | เหตุผล |
|---|---|---|---|
| Damage | — | B(1-4)→C(5-10)→A(11-19)→S(20) | เท่า baseline — Trapper Gadgets ไม่ยืนยันรายละเอียดดาเมจได้ ไม่มี named feature อื่นรองรับ = ให้เกรดแบบระมัดระวัง |
| Control | — | D(1-19)→C(20) | เท่า baseline — เหตุผลเดียวกับ Damage (Trapper Gadgets ไม่ยืนยันได้) |
| Support | — | D(1-16)→C(17-20) | เท่า baseline — ไม่มี named feature เล็ง ally เลย |
| Survivability | 10-20 | **A** | Agile Response (lv10, reaction: Disadvantage ผู้โจมตีเมลี + ขยับฟรีครึ่ง speed) = พลิก modifier ทั่วไป(ไม่ผูก Grimoire) → tally เหลือ 2 below (ต่ำกว่าเกณฑ์ downgrade 3-below ของแกนนี้) → กลับ Primary(A) เร็วกว่า baseline 4 เลเวล; Monster-Hide Armor (lv15) เสริมต่อ แต่ไม่มี S tier ให้ Survivability ในคลาสนี้ |
| Action Economy | 11-20 | **B** | Agile Response ได้ผล 2 อย่างจาก reaction เดียว (Disadvantage+ขยับฟรี) = Extra-value modifier ใหม่ → tally 2 favorable/2 below (เสมอ) → กลับ Primary(B) |
| Utility | 3-20 | **C** | Tinker's Tools + Trapper Gadgets (คราฟต์กับดัก/อุปกรณ์ได้) = floor escape แบบระมัดระวัง (ยืนยันได้แค่ tool prof + concept คราฟต์ ไม่ยืนยัน magnitude เต็ม จึงให้แค่ 1 ขั้นจาก D) |
| Versatility | 15-20 | **B** | Monster-Hide Armor (lv15, 2 ช่อง modification ที่ปรับได้) = พลิก Resource Fungibility จาก below → เหลือ 1 below (ต่ำกว่าเกณฑ์ downgrade 2-below) → กลับ Primary(B) |

---

## ข้อค้นพบสำคัญ

1. **Occultist Guild ขยับทุกแกนทั้ง 7 แกน** — คลาสแรกในบรรดา 17 คลาสที่ทำ Layer 2 มาแล้วที่มี subclass เดียวขยับครบทุกแกน (ไม่มีแกนไหนเท่า baseline เลย) ตรงกับ old-system's Overall=A (สูงสุดในกลุ่ม) และเป็นตัวอย่างชัดที่สุดของ "full alt spell list access" ที่พลิกทั้ง Utility floor-lock (Primary unlock ตรงๆ) และ Versatility (Target-Type+Resource Fungibility+Adaptability พร้อมกัน)
2. **Devourer + Trapper ให้เกรดแบบระมัดระวังจาก data incompleteness** — "Mutations"/"Trapper Gadgets"/"Armor Modifications" ไม่มีรายละเอียดเต็มในไฟล์ข้อมูล เหมือนที่ old scorecard เองก็ flag ไว้แล้ว ส่งผลให้ Devourer's Versatility และ Trapper's Damage/Control ไม่ได้ delta ทั้งที่ old score สูง (7, 8, 5 ตามลำดับ) — ยึดหลัก "old score สูงไม่พอ ต้องมี mechanism ยืนยันได้จริง"
3. **Survivability downgrade-threshold ต่างจากคลาสอื่น (3-below แทน 2-2 tie)** — baseline ของคลาสนี้เขียนไว้ชัดว่า "3/4 below → downgrade" ไม่ใช่ 2-2 tie แบบคลาสอื่น ทำให้ single-modifier-flip (Carver's True Grit/Equipped for Battle, Devourer's Gnawing Hunger, Trapper's Agile Response) พอจะดันกลับ Primary(A) ได้ทันทีโดยไม่ต้องรอ 2 flip — ทั้ง 3 Guild ที่มี named Survivability feature หลุด B-dip เร็วกว่า baseline's lv14 ทั้งหมด
4. **Carver's Controlled Footwork (lv18) และ Occultist's Arcane Response (lv18) เป็น pattern คู่ขนาน** — ทั้งคู่คือ "กลไกใหม่ที่ผูกกับ reaction เดิมแต่ไม่ใช่แค่เสริม reliability" (2 reaction/รอบ vs แคสฟรีติด reaction) ทำให้ Damage ทั้งสอง Guild ข้าม A ไป S ที่ lv18 ก่อน baseline's lv20 — เป็นตัวอย่างที่ 2 ของ "late-subclass-capstone ที่แซง class capstone เรื่องเวลา" ในระบบนี้
5. **ไม่มี subclass ไหนแตะ Damage-dip (lv5-10, baseline=C) เต็มช่วงได้ยกเว้น Occultist** — Carver ได้แค่บางส่วน(→B), Devourer ได้แค่ครึ่งหลัง(lv7-10→B), Trapper ไม่ได้เลย — ยืนยันว่า Extra Attack lv11 ที่ล่าช้าที่สุดในระบบนี้สร้างช่องโหว่ที่กลไก subclass ทั่วไปปิดได้ยาก ต้องเป็นสเปลล์คาสติ้งเท่านั้น(Occultist)ถึงจะปิดเต็ม
