# Sacred Knight — Class Baseline (Level-Indexed, 2024)

**ชั้น**: 1 (Class Baseline) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — เทียบ Sacred Knight เปล่าๆ (ไม่นับ Sacred Throne feature ใดๆ) กับ Anchor Rubric ทุกเลเวล 1-20
**ที่มาข้อมูล chassis**: [Sacred-Knight.md](../homebrew-subclass/Sacred-Knight/Sacred-Knight.md) — homebrew class ของโปรเจกต์นี้เอง (source of truth, ไม่ใช่ไฟล์ concept ดราฟต์เก่า) — **ไม่มีปัญหา spell-list-gap แบบ Artificer เพราะ Fervor ไม่ใช่สเปลล์ ข้อมูลครบ 100% จากไฟล์เดียว**
**รูปแบบตาราง**: Compact grade+เหตุผล — เหมือน [alchemist-level-baseline.md](alchemist-level-baseline.md)/[artificer-level-baseline.md](artificer-level-baseline.md)
**สถานะ**: 🚧 เสร็จ 7/7 axis (คลาสที่ 3 ของชั้น 1)

⚠️ **ห่างจากระบบเดิม**: [sacred-knight-subclass-scorecard-2024.md](sacred-knight-subclass-scorecard-2024.md) คือ Class Baseline ของระบบเก่า (คะแนนภาพรวม 0-10 เดียว, ไม่มีแนวคิด Primary dimension/floor rule) — ไฟล์นี้เป็นคนละระบบ ไม่ทับซ้อน ไม่แก้ไฟล์เก่า **ผลลัพธ์ Versatility ของไฟล์นี้ต่างจากระบบเก่าอย่างมีนัยสำคัญ** (D ไม่ใช่ A) — ดูคำอธิบายในหัวข้อ Versatility ด้านล่าง เป็นผลจาก floor rule ของระบบใหม่ ไม่ใช่การตัดสินว่าระบบเก่าผิด

⚠️ **โครงสร้างเฉพาะของคลาสนี้**: **Path** (Retribution/Guardian/Formless, เลือก lv1) กำหนดว่าเรียน Fervor Technique จากลิสต์ไหนได้ — แยกจาก **Sacred Throne** (subclass จริง, เลือก lv3, ไม่นับในไฟล์นี้) เหมือนไฟล์ระบบเก่า baseline ด้านล่างให้เครดิต **Universal techniques (4 ตัว) แบบไม่มีเงื่อนไข** (ทุก Path เรียนได้) และให้เครดิต Path-specific techniques แบบ **"ถ้าเลือก Retribution/Formless"** หรือ **"ถ้าเลือก Guardian/Formless"** ตามความเหมาะสม (2 ใน 3 Path เข้าถึงได้เสมอในทั้งสองกรณี ตามธรรมเนียมเดียวกับที่ระบบเก่าใช้)

---

## สรุป Chassis

HD **d10** (เหนือ peer-standard d8 ของ Anchor — deviation ที่ระบุไว้ใน Survivability Anchor เอง), save prof **STR+WIS**, armor light/medium (+heavy ถ้า Guardian Path), weapon simple + versatile martial (2-handed die เสมอ), **ไม่มี Extra Attack ตลอดทั้งคลาสโดยตั้งใจ** — Fervor pool = ตาราง spell slot เท่า full caster เป๊ะ แต่แปลงเป็น Fervor ผ่าน Bonus Action เท่านั้น (ห้าม cast)

| Lv | Fervor รวม/วัน | Fervor/BA ปกติ | Fervor/BA + Surge | Technique ที่เรียนแล้ว | Milestone อื่น |
|---|---|---|---|---|---|
| 1 | 8 | 4 | *(ยังไม่มี)* | 1 | Choose Path, Fervor Awakening |
| 2 | 12 | 4 | 8 | 2 | **Fervor Surge** (1/short rest) |
| 5 | 43 | 6 | 11 | 3 | (Subclass lv3/ASI lv4 excluded) |
| 7 | 56 | 7 | 13 | 3 | **Improve Fervor Technique (I)** |
| 9 | 92 | 9 | 17 | 4 | |
| 11 | 111 | 10 | 19 | 4 | **Fervor Surge Improvement** (2/short rest) |
| 13 | 122 | 11 | 21 | 5 (ครบ) | |
| 15 | 134 | 12 | 23 | 5 | **Improve Fervor Technique (II)** |
| 18 | 176 | 27 | 39 | 5 | **Fervor Overflow** (2 slot/BA อัตโนมัติ, Surge→3) |
| 20 | 199 | 27 | 39 | 5 | **Transcendent Fervor** (short rest = long rest สำหรับ Fervor 1x/long rest) |

**Technique ที่ใช้อ้างอิงเป็นตัวแทน baseline**: Universal (**Faith Halo**=+atk roll/stack, **Clarity**=+ability check/stack, **Pure White Blade**=+range/adv, **Swift**=+speed) เรียนได้ไม่มีเงื่อนไข; Retribution/Formless-conditional (**Light Sword**=+1d4 radiant/stack, **Cross Slash**=ซื้อ attack เพิ่ม, **Rising Dragon Strike**=counterattack ฟรีไม่เสีย reaction); Guardian/Formless-conditional (**Spirit Ward**=ลดดาเมจ, **Guardian's Blessing**=แปลง failed save→success, **Bulwark Shift**=สลับตำแหน่ง) — ทุก Path ได้ **+1 AC แบบไม่มีเงื่อนไข** ภายใต้เงื่อนไขของตัวเอง (dual-wield/shield)

---

## Damage

**Primary**: Magnitude (DPR) — ไม่มี Extra Attack เลย (จุดอ่อนโครงสร้างหลักของคลาส) ชดเชยด้วย Light Sword/Cross Slash ที่ซื้อด้วย Fervor (conditional 2/3 Path: Retribution/Formless)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | อาวุธ versatile martial 2-handed 1d10+3=**~9** ตรง peer's มาร์เชียล lv1 เป๊ะ (ยังไม่มีใครมี Extra Attack ตอนนี้) — technique แรกที่เรียนยังไม่ดันดาเมจโดยตรงเสมอไป (ขึ้นกับเลือก) → คงที่ B |
| 2-4 | A | **Light Sword ปลดล็อกได้** (ถ้า Retribution/Formless) — +1d4 radiant/stack สูงสุด WIS+PB stack ≈**+5d4(~12.5)**ต่อการตี บวกฐาน~9 = **~21.5** เกิน peer's ยังไม่มี Extra Attack(~9)ไปมาก — Sacred Knight นำหน้า peer ชั่วคราวก่อน peer จะได้ Extra Attack ที่ lv5 |
| 5-16 | A | peer ได้ Extra Attack(~17)แล้ว — Sacred Knight ยังคง 1 attack ฐาน(~9)+Light Sword ที่ stack cap โตตาม WIS+PB(lv13≈WIS4+PB5=9stack=~9d4=22.5) รวม**~31.5**หรือใช้ Fervor ซื้อ Cross Slash แทน (attack เพิ่มที่ lv13 costs 7 Fervor/ครั้งจาก pool 122) — ทั้งสองทางเลือกเกิน peer ได้จริงแต่ผูกกับ Fervor budget/turn เป็นตัวจำกัดตามธรรมชาติ (ไม่ nova ไม่จำกัดจริง) → A ตลอดช่วงนี้ ไม่ถึง S เพราะ per-turn cap จาก budget |
| 17-20 | S | **Improve Fervor Technique (lv15, Light Sword→1d6/stack)** + **Fervor Overflow (lv18, 2-3 slot/BA)** ดัน single-turn burst ให้สูงกว่าที่ marchial peer's Fighter-outlier(~26-34)เอื้อมถึงได้จริง (WIS+PB stack cap lv18≈WIS5+PB6=11stack=11d6≈38.5 บวกฐาน~9=**~47.5** ในเทิร์นเดียวถ้าทุ่ม Fervor เกือบหมด) — ระดับ outlier-comparable จริงที่ endgame |

**สรุปเกรด**: B(1) → A(2-16) → S(17-20) — pattern คล้าย Alchemist (ไต่ขึ้นเพราะ resource-fueled burst โตเร็วกว่า peer) มากกว่า Artificer (นิ่งแล้วตกลง) เพราะไม่มี slot cap ตายตัว Fervor pool โตต่อเนื่องตลอดเกม

---

## Control

**Primary**: Severity — ตรวจ Technique list ทั้งหมด (Universal 4 + Retribution 3 + Guardian 3 = 10 ตัว) พบว่า **ไม่มีตัวไหนกำหนด condition ให้ศัตรูเลยสักตัว** (ไม่มี Prone/Restrained/Frightened/ฯลฯ — Bulwark Shift สลับตำแหน่งเท่านั้น ไม่ได้ล็อกเป้าหมายไว้กับที่) — ต่างจากที่ระบบเก่าให้ C(3/10) ตรงนี้ ระบบใหม่ใช้กฎ Grading Scale ที่เข้มกว่า ("ไม่มีกลไกเลย = D เสมอ")

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | D | ไม่มี Fervor Technique ตัวไหนในทั้ง 10 ตัว (Universal+Retribution+Guardian) ที่กำหนด condition ให้เป้าหมายเลยสักตัว ไม่ว่าจะเรียนกี่ตัว/เลือก Path ไหน/ปลดล็อก Sacred Throne กี่ตัว (ไม่นับใน baseline) — **ไม่มีกลไกที่เกี่ยวข้องกับ axis นี้เลยจริงๆ ตามนิยาม D ของ Grading Scale** ไม่ใช่ "มีแต่อ่อน" แบบ Alchemist/Artificer |

**สรุปเกรด**: D(1-20) แบนราบเต็มอาชีพ — **แตกต่างจากคะแนนของระบบเก่า (C, 3/10) อย่างมีนัยสำคัญ** เหตุผลคือระบบเก่าใช้ดุลยพินิจ M/R/B ที่ยอมให้ "เกือบไม่มี" ได้คะแนนต่ำแต่ไม่ใช่ต่ำสุด ส่วนระบบใหม่ (Grading Scale ยืนยันจาก user 2026-08-14) บังคับว่า "ไม่มีกลไกเลย" ต้องเป็น D เสมอ — ตรวจซ้ำยืนยันว่าไม่มี technique ไหนพลาดจริงๆ ก่อนสรุป

---

## Support

**Primary**: Magnitude — **Bulwark Shift** (Guardian/Formless-conditional, 2/3 Path) สลับตำแหน่งกับ ally/ศัตรูได้ไม่จำกัดระยะที่จ่าย Fervor ไหว ไม่โดน opportunity attack — เป็นเครื่องมือดึง ally ออกจากอันตราย/จัด position ทีม ไม่ใช่ heal/buff โดยตรง

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | C | Bulwark Shift มีกลไกจริง (ถ้า Guardian/Formless) แต่ Magnitude ต่ำกว่า peer's healing/buff spell มาก (แก้ปัญหา positioning ไม่ใช่ HP/buff) — คงที่ตลอดเพราะไม่มี technique อื่นเสริม Support โดยตรงเลย (Spirit Ward/Guardian's Blessing เป็น self-only ไม่นับ Support) ไม่มี milestone ใหม่ระหว่างทาง (ไม่นับ Sacred Throne) |

**สรุปเกรด**: C(1-20) แบนราบ — ตรงกับระบบเก่า (4/10≈C) พอดี เพราะ Bulwark Shift คือกลไก Support เดียวที่มีอยู่ ไม่มี milestone อื่นให้ไต่ระดับ

---

## Survivability

**Primary**: Effective HP — **d10 เหนือ peer-standard d8 ของ Anchor โดยตรง** (11,19,27...→**13,22,31,40,49,58,67,76,85,94,103,112,121,130,139,148,157,166,175,184**) — Primary เองอยู่เหนือ peer ตั้งแต่ lv1 ไม่ต้องรอ modifier

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | A | Effective HP (d10) เหนือ peer(d8) ทุกเลเวล = Primary ตรงๆ ได้ A — เสริมด้วย **+1 AC แบบไม่มีเงื่อนไข** (ทุก Path ได้ ภายใต้เงื่อนไขของตัวเอง — Mitigation ทางอ้อม เหนือ peer-standard "D/ไม่มี" ของ Anchor) แต่ Death Prevention/Debuff Resistance ยังพึ่ง Guardian's Blessing (2/3 Path เท่านั้น, ไม่ใช่ universal เต็มรูปแบบ) ทำให้ไม่นับเป็น modifier ที่ครบเกณฑ์ universal พอจะดันขึ้น S — คงที่ A ตลอด |

**สรุปเกรด**: A(1-20) แบนราบ — ตรงกับระบบเก่า (8/10≈A) แต่เหตุผลรัดกุมกว่า (d10 ที่ Anchor เองยืนยันว่าเหนือ median ชัดเจน ไม่ใช่แค่ "รู้สึกว่าทน")

---

## Action Economy

**Primary**: Attack-Action Efficiency — ไม่มี Extra Attack เลย → ใช้กฎ **C ไม่ใช่ D** (มี attack routine ปกติ) — แต่ modifier ที่แข็งแรงมากดันกลับขึ้นเกือบทั้งเกม

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-4 | B | 1 attack/action ตรง peer (ยังไม่มีใครมี Extra Attack) — **Bonus Action Value เหนือ peer ตั้งแต่ lv1** (Fervor conversion ผ่าน Bonus Action ล้วน ไม่แตะ action หลักเลย, peer-standard="ไม่มี" ตาม Anchor) = 1/4 above ไม่พอขยับ (Primary ก็ B ตรง peer อยู่แล้วไม่มีที่ให้ขยับขึ้นต่อ) → คงที่ B |
| 5-20 | B | peer ได้ Extra Attack(lv5) แต่ Sacred Knight ไม่มี → Primary ตกเป็น C — **Bonus Action Value ยังเหนือ peer** (Fervor conversion, ยิ่งแรงขึ้นด้วย Fervor Surge lv2/lv11/Fervor Overflow lv18) + **Rising Dragon Strike ปลดล็อกได้ตั้งแต่เรียน technique** (Retribution/Formless-conditional, counterattack ฟรีไม่เสีย reaction ทุกครั้งที่โดนตี, Reaction Value เหนือ peer-standard "แทบไม่มี" ตาม Anchor finding#3) = **2/4 above ครบเกณฑ์** → ขยับขึ้น 1 ขั้น C→B |

**สรุปเกรด**: B(1-20) แบนราบทั้งเกม — Primary เองผันผวน B→C ที่ lv5 แต่ modifier (Bonus Action + Reaction Value) ดึงกลับมา B เสมอ ทำให้เกรดที่แสดงจริงไม่ขยับเลยตลอดทั้งไฟล์ — pattern คล้าย Artificer's lv7+ แต่เริ่มเร็วกว่า (Sacred Knight ไม่มีช่วง C แสดงผลจริงเลย เพราะ modifier พร้อมตั้งแต่ technique 2 ตัวแรกที่เรียนได้เร็ว)

---

## Utility

**Primary**: Magnitude — **Clarity** (Universal, +Fervor ต่อ ability check สูงสุด WIS+PB/ครั้ง) คือกลไก Utility เดียวในทั้งคลาส ไม่มีสเปลล์ ritual/solve-problem ใดๆ เพราะ Fervor ห้าม cast

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | C | Clarity มีกลไกจริง (บวก check ได้สูงสุด WIS+PB ≈ ใกล้เคียง Expertise-tier ที่ investment สูง) แต่ต้องจ่าย Fervor ทุกครั้ง (ไม่ฟรี/ไม่ auto-on แบบ Skill-Check Layer ของ Anchor) + ไม่มี Reveal-Info/Solve-Problem สาย spell เลย (ครอบคลุมแค่ 1 ใน 3 สายของ Utility axis) → below peer ตลอด ไม่มี milestone อื่นเสริม (Swift ช่วยเรื่อง pace การเดินทางเป็นผลพลอยได้ ไม่นับเปลี่ยนเกรด) → คงที่ C |

**สรุปเกรด**: C(1-20) แบนราบ — ต่ำกว่าระบบเก่าเล็กน้อย (B, 5/10) เพราะ Grading Scale เข้มกว่าเรื่อง "ครอบคลุมกี่สาย" — Clarity แข็งแรงในสายเดียวแต่ไม่ครอบคลุม Reveal Info/Solve Problem เลย

---

## Versatility

**Primary**: Loadout Flexibility — ตรวจ [Sacred-Knight.md](../homebrew-subclass/Sacred-Knight/Sacred-Knight.md) ทั้งไฟล์แล้ว **ไม่มีข้อความ "swap/change technique known" ที่ไหนเลย** — Technique ที่เรียนแล้ว **ถาวรตลอดชาติ** (Improve Fervor Technique lv7/15 แค่อัปเกรดของเดิม ไม่ใช่เปลี่ยนตัวที่รู้) — เข้มงวดกว่าแม้แต่ tier "ต่ำ" ของ Anchor (Sorcerer/Bard/Warlock อย่างน้อยยังสลับได้ 1 ตัวตอน level-up)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | D | Loadout Flexibility = **ไม่มีกลไกเลย** (technique ที่เรียนคือของถาวร ไม่เคยสลับได้ในทั้ง 20 เลเวล) — ตรงนิยาม D ของ Grading Scale เป๊ะ ("ไม่มีกลไกที่เกี่ยวข้องกับ axis นี้เลย") — **floor rule**: Primary=D → เกรดรวมล็อกที่ D **เสมอ** ไม่ว่า Resource Fungibility (Fervor pool เดียวจ่ายได้ทั้ง damage/defense/speed/check — จุดแข็งที่สุดของคลาสนี้) จะแรงแค่ไหนก็ตาม |

**สรุปเกรด**: D(1-20) แบนราบเต็มอาชีพ — **ต่างจากระบบเก่าอย่างสิ้นเชิง (A, 8/10)** เพราะ floor rule ของระบบใหม่ตัดสินจากมิติ Primary เพียงมิติเดียวก่อน (เหมือนที่ตัดกับมาร์เชียลไม่มีสเปลล์ตาม Anchor finding#4) — Sacred Knight มี Fervor resource ที่ fungible สูงมากจริง (เทียบเท่าหรือเหนือ Artificer's Replicate Magic Item) แต่**สิ่งที่เรียนรู้ถาวรไม่เคยสลับได้เลย** ทำให้โครงสร้างคล้ายมาร์เชียลไม่มีสเปลล์มากกว่าคาสเตอร์ในมิตินี้เจาะจง — เป็นตัวอย่างที่ชัดเจนที่สุดเท่าที่เจอมาว่า floor rule ทำงานตามที่ออกแบบไว้ (ตัดสินจาก "มีกลไกไหม" ก่อนเสมอ ไม่ใช่ "โดยรวมยืดหยุ่นแค่ไหน")

---

## สรุปรวม 7 axis

| Axis | เกรดตามเลเวล |
|---|---|
| Damage | B(1) → A(2-16) → S(17-20) |
| Control | D(1-20) |
| Support | C(1-20) |
| Survivability | A(1-20) |
| Action Economy | B(1-20) |
| Utility | C(1-20) |
| Versatility | D(1-20) |

**ข้อค้นพบสำคัญ**:
1. **Versatility=D ทั้งเกมคือความแตกต่างที่ใหญ่ที่สุดจากระบบเก่าเท่าที่เจอมา** (เก่า A 8/10 → ใหม่ D) — floor rule ตัดสินจาก "สลับ technique ที่รู้ได้ไหม" (ไม่ได้เลย) ก่อนเสมอ ไม่สนใจว่า Fervor resource เองจะ fungible แค่ไหน — คำเตือนสำหรับคลาสถัดไป: **ต้องเช็คก่อนเสมอว่า "known ถาวร" หรือ "prepared สลับได้"** เพราะกระทบ Versatility grade รุนแรงมาก ไม่ใช่แค่คลาสที่ไม่มีสเปลล์เลยที่จะโดน floor rule นี้
2. **Control=D ก็ต่างจากระบบเก่า (C→D)** ด้วยเหตุผลเดียวกัน — Grading Scale ใหม่เข้มกว่าดุลยพินิจเก่า ตรวจแล้วยืนยันว่าไม่มี technique ไหนให้ condition แก่ศัตรูจริงๆ ไม่ใช่การตีความผิดพลาด
3. **Damage/Action Economy ทั้งคู่แสดง pattern "โตต่อเนื่องไม่มีเพดานตายตัว"** ต่างจาก Artificer (โดน slot-cap กด) เพราะ Fervor pool ของ Sacred Knight โตทุกเลเวลไม่มี cap แบบ half-caster — Damage ถึง S ได้จริงที่ endgame (lv17+) จาก resource accumulation ล้วนๆ ไม่ต้องพึ่ง subclass
4. **Survivability=A มาจาก d10 ที่ Anchor เองยืนยันว่าเหนือ median (d8)** — เป็นตัวอย่างแรกในชั้น 1 ที่ Primary dimension เองอยู่เหนือ peer ตั้งแต่ lv1 โดยไม่ต้องพึ่ง modifier เลย (Artificer's Versatility ก็เป็นแบบนี้เหมือนกัน แต่คนละ axis)
5. **คลาสนี้ไม่มีปัญหา spell-list-gap เลย** เพราะ Fervor Technique ทั้งหมดมีนิยามอยู่ในไฟล์ homebrew เดียวจบ — ต่างจาก Artificer ที่ต้องพึ่งความรู้ทั่วไปสำหรับสเปลล์บางส่วน
