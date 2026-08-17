# Barbarian — Class Baseline (Level-Indexed, 2024)

**ชั้น**: 1 (Class Baseline) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — เทียบ Barbarian เปล่าๆ (ไม่นับ Primal Path subclass feature ใดๆ ที่ lv3/6/10/14) กับ Anchor Rubric ทุกเลเวล 1-20
**ที่มาข้อมูล**: `src/data/5etools/official/class/class-barbarian.json` (entry `source: "XPHB"`, `edition: "one"`) — `classFeature` + `classTableGroups` (Rages/Rage Damage/Weapon Mastery) ทั้งหมด ยืนยันจากไฟล์จริง ไม่ใช่ความจำ
**รูปแบบตาราง**: Compact grade+เหตุผล (Lv | Grade | เหตุผล) — ตามฟอร์แมตที่ยืนยันแล้วตั้งแต่ Alchemist/Artificer/Sacred Knight
**สถานะ**: ✅ เสร็จ 7/7 axis (คลาสที่ 4 ของชั้น 1 — คลาสมาร์เชียลล้วนตัวแรกในชั้นนี้ ไม่มี spellcasting เลย)

⚠️ **สมมติฐานตัวเลข**: ใช้สูตรอาวุธอ้างอิงเดียวกับ Anchor's marchial track (1d10+3) เพื่อเทียบข้ามคลาสได้ตรง แม้ Barbarian จริงมักถือ Greataxe(1d12)/Greatsword(2d6) ก็ตาม — Rage Damage bonus (ตัวเลขจริงจาก `classTableGroups`) บวกเพิ่มบนสูตรนี้ตรงๆ เพราะเป็น class-feature bonus แยกจาก ability mod ไม่ใช่สิ่งที่ flat+3 convention ครอบคลุมอยู่แล้ว

---

## สรุป Chassis

HD **d12** (สูงสุดในเกม — Anchor เองระบุเป็น deviation เหนือ peer-standard d8), save prof STR+CON, armor light/medium/shield, weapon simple+martial + Weapon Mastery (2 ประเภท, สลับ 1/Long Rest)

| Lv | Rages/วัน | Rage Dmg | Weapon Mastery # | Effective HP (d12+CON+3) | Milestone อื่น |
|---|---|---|---|---|---|
| 1 | 2 | +2 | 2 | 15 | Rage, Unarmored Defense (10+DEX+CON), Weapon Mastery |
| 2 | 2 | +2 | 2 | 25 | **Danger Sense, Reckless Attack** |
| 3 | 3 | +2 | 2 | 35 | (Subclass gate — ไม่นับ), **Primal Knowledge** |
| 4 | 3 | +2 | 3 | 45 | ASI/Feat (ไม่นับตาม convention) |
| 5 | 3 | +2 | 3 | 55 | **Extra Attack, Fast Movement (+10ft)** |
| 6 | 4 | +2 | 3 | 65 | (Subclass feature — ไม่นับ) |
| 7 | 4 | +2 | 3 | 75 | **Feral Instinct, Instinctive Pounce** |
| 8 | 4 | +2 | 3 | 85 | ASI/Feat |
| 9 | 4 | +3 | 3 | 95 | **Brutal Strike (Forceful/Hamstring Blow)** |
| 10 | 4 | +3 | 4 | 105 | (Subclass feature — ไม่นับ) |
| 11 | 4 | +3 | 4 | 115 | **Relentless Rage** |
| 12 | 5 | +3 | 4 | 125 | ASI/Feat |
| 13 | 5 | +3 | 4 | 135 | **Improved Brutal Strike (Staggering/Sundering Blow)** |
| 14 | 5 | +3 | 4 | 145 | (Subclass feature — ไม่นับ) |
| 15 | 5 | +3 | 4 | 155 | **Persistent Rage** |
| 16 | 5 | +4 | 4 | 165 | ASI/Feat |
| 17 | 6 | +4 | 4 | 175 | **Improved Brutal Strike→2d10 + 2 effects พร้อมกัน** |
| 18 | 6 | +4 | 4 | 185 | **Indomitable Might** |
| 19 | 6 | +4 | 4 | 195 | Epic Boon (ไม่นับ) |
| 20 | Unlimited | +4 | 4 | 205 | **Primal Champion (STR/CON+4, max25)** |

---

## Damage

**Primary**: Magnitude (DPR) — weapon+3(ability, flat convention) **+ Rage Damage bonus** (class-feature bonus แยกจาก ability mod, บวกทุก STR attack ที่ตีโดน)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | A | (1d10+3)+Rage2=**~11** ผ่าน attack roll ปกติ **เหนือมาร์เชียล peer(~9) แล้วตั้งแต่ lv1** เพราะ Rage bonus ซ้อนบน ability mod ที่ peer ไม่มี — Primary เองสูงกว่า peer ตรงๆ = A ทันที (โครงสร้างเดียวกับ Sacred Knight's Survivability lv1) — modifier: Conditionality ต่ำกว่า peer เล็กน้อย (ต้อง Rage ก่อน, จำกัด 2/วัน) 1/4 below ไม่พอขยับ |
| 2 | =lv1 | Reckless Attack ปลดล็อก (advantage โจมตี STR แลกศัตรูได้ advantage ตีเราด้วย) — เพิ่ม accuracy จริงแต่ modifier ยังไม่ถึง ≥2/4 (Burst/Peak above 1 + Conditionality below 1 = หักกลบ) คงที่ A |
| 3 | =lv1 | Primal Knowledge เป็น Utility ไม่กระทบ Damage |
| 4 | =lv1 | ไม่มีจุดเปลี่ยน |
| 5 | A | Extra Attack: (1d10+3+Rage2)×2=**~21** เหนือมาร์เชียล peer(~17) ชัดเจน — Primary=A ต่อเนื่อง modifier เดิม ไม่พอขยับ |
| 6 | =lv5 | ไม่มีจุดเปลี่ยน |
| 7 | =lv5 | Feral Instinct/Instinctive Pounce เป็น Action Economy ไม่กระทบ Damage |
| 8 | =lv5 | ไม่มีจุดเปลี่ยน |
| 9 | A | Rage Dmg→+3: (1d10+3+3)×2=**~23** + **Brutal Strike ปลดล็อก** (จ่าย "สละ Reckless Attack advantage 1 ครั้ง" แลก extra 1d10 rider damage + เลือก Forceful/Hamstring Blow) → Burst/Peak ขยับเป็น above peer (nova option ใหม่จริง) แต่ Conditionality ยังคง below (Rage-gate เดิม) = 1 above/1 below หักกลบ คงที่ A |
| 10 | =lv9 | ไม่มีจุดเปลี่ยน |
| 11 | =lv9 | **จุดที่มาร์เชียล/คาสเตอร์ peer มาบรรจบกันที่ 17 พอดี (ตาม Anchor)** — Barbarian(23) เหนือทั้งคู่แล้วชัดเจน |
| 12 | =lv9 | ไม่มีจุดเปลี่ยน |
| 13 | =lv9 | Improved Brutal Strike เพิ่ม Staggering/Sundering Blow (riders ไม่ใช่ดาเมจเพิ่ม) ไม่เปลี่ยน Magnitude |
| 14 | =lv9 | ไม่มีจุดเปลี่ยน |
| 15 | A | Persistent Rage — Rage คงอยู่เต็ม 10 นาทีอัตโนมัติไม่ต้อง extend ทุกเทิร์นอีกต่อไป + regain เต็มทุก Rage uses ตอนทอย Initiative (1/Long Rest) — **Conditionality ผ่อนลง** (ไม่ใช่ below เต็มรูปแบบอีกต่อไป) แต่ modifier รวมยังไม่ถึง ≥2/4 above คงที่ A (Magnitude ไม่เปลี่ยน ยังคง 23) |
| 16 | A | Rage Dmg→+4: (1d10+3+4)×2=**~25** — **ใกล้ Fighter outlier(26) มากแล้วด้วยตัวเลข sustained ล้วนๆ** ยังไม่นับ Brutal Strike |
| 17 | S | **Improved Brutal Strike อัปเกรด**: rider damage 1d10→**2d10**(avg11) + ใช้ 2 Brutal Strike effect พร้อมกันได้ในครั้งเดียว — Magnitude sustained(25) เข้าใกล้ Fighter outlier(26) + Burst/Peak ตอนนี้เทียบเท่าระดับ outlier จริง (rider dice ใหญ่+riders ซ้อน 2 อย่าง) = **2 มิติเหนือ peer พร้อมกันชัดเจนระดับ outlier** ตามนิยาม S |
| 18 | =lv17 | Indomitable Might เป็น Survivability ไม่กระทบ Damage |
| 19 | =lv17 | Epic Boon ไม่นับ |
| 20 | =lv17 ⚠️ | Magnitude คงที่ ~25 แต่ **Primal Champion (STR/CON+4, max25)** ดันสเตตเกินเพดาน ASI ปกติ (mod จริงเกิน+5 ที่ flat+3 convention สมมติไว้) — เป็น ceiling-outlier เพิ่มเติมแยกต่างหาก คล้าย Alchemist's Nuclear Bomb ไม่นับรวมในสูตร flat+3 นี้ตรงๆ |

**สรุปเกรด**: A(1-16) → S(17-20) — **ไม่มีช่วง B/C เลยตลอดอาชีพ** ต่างจาก Alchemist ที่มีช่วงตกกลับไป B — Rage Damage bonus ที่ซ้อนบน ability mod ทำให้ Primary เหนือ peer ตั้งแต่ lv1 และไม่เคยตกลงมาต่ำกว่านั้นอีกเลย

---

## Control

**Primary**: Severity — ไม่มี hard-CC ใดๆ ในคลาสเลย (ไม่มี Stunned/Paralyzed/Restrained/Charmed/Frightened จาก base kit) เพดานสูงสุดคือ Brutal Strike's Hamstring Blow (ลด Speed 15ft ถึงต้นเทิร์นถัดไปเท่านั้น — Tier ต่ำกว่า 2 ด้วยซ้ำ เพราะไม่ใช่ full-stop) หรือ Forceful Blow (ผลักระยะ ไม่ใช่ condition จริง)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-8 | D | ไม่มีกลไก control ใดๆ เลย (Rage/Reckless/Danger Sense/Primal Knowledge ล้วนเป็น self-buff/skill ไม่ใช่ control) — floor rule ล็อก D ตรงๆ |
| 9 | C | **Brutal Strike ปลดล็อก** — Hamstring Blow(Speed-15ft ชั่วคราว)/Forceful Blow(ผลัก 15ft) มีกลไกจริงแล้วแต่ Severity ต่ำกว่า Tier 2 ด้วยซ้ำ (ต่ำกว่า full-caster peer's Tier 3-4 มาก) — modifier: Breadth=match(1 เป้าเหมือน peer ส่วนใหญ่), Frequency=above(ไม่จำกัดครั้ง/วัน แค่แลก Reckless Attack advantage), Stickiness=below(สั้นกว่า peer's "ต่ำ" อีก — จบทันทีต้นเทิร์นถัดไปไม่มี save ให้ลุ้น), LR-bypass=match(ไม่มีทั้งคู่ที่ระดับนี้), Concentration Risk=above(ไม่มีเลย ต่างจากสเปลล์ CC เกือบทั้งหมดที่ต้อง concentration) = 2 above/1 below ไม่ถึง ≥3/5 ทั้งคู่ ไม่ขยับ คงที่ C |
| 10 | =lv9 | ไม่มีจุดเปลี่ยน |
| 11 | =lv9 | Relentless Rage เป็น Survivability |
| 12 | =lv9 | ไม่มีจุดเปลี่ยน |
| 13 | =lv9 | **Improved Brutal Strike เพิ่ม Staggering Blow**(disadvantage save ถัดไป + กัน OA ถึงต้นเทิร์นถัดไป)/**Sundering Blow**(+5 attack roll ถัดไปที่โดนเป้านี้) — เมนู riders กว้างขึ้นแต่ severity เพดานยังต่ำกว่า Tier 2 เหมือนเดิม ไม่เปลี่ยนเกรด |
| 14 | =lv9 | ไม่มีจุดเปลี่ยน |
| 15 | =lv9 | Persistent Rage เป็น Action Economy/Survivability |
| 16 | =lv9 | ไม่มีจุดเปลี่ยน |
| 17 | =lv9 | Improved Brutal Strike ให้ใช้ 2 effect พร้อมกัน (เช่น Hamstring+Staggering ซ้อนเป้าเดียว) — severity รวมแรงขึ้นจริงแต่ยังไม่ถึง Tier 3-4 + modifier ยังไม่ถึง ≥3/5 คงที่ C |
| 18 | =lv9 | Indomitable Might เป็น Survivability |
| 19-20 | =lv9 | ไม่มีจุดเปลี่ยน |

**สรุปเกรด**: D(1-8) → C(9-20) — เพดาน Severity ต่ำกว่า Alchemist ด้วยซ้ำ (Alchemist แตะ Tier 2 เต็ม, Barbarian ไม่ถึง Tier 2) แต่ modifier ข้าง (Frequency ไม่จำกัด+Concentration Risk ไม่มีเลย) ยังพอประคองไว้ที่ C ไม่ตกไป D

---

## Support

**Primary**: Magnitude — **ไม่มีกลไก Support เลยสักฟีเจอร์เดียวตลอด 20 เลเวล** (Rage/Reckless Attack/Danger Sense/Feral Instinct/Instinctive Pounce/Brutal Strike/Relentless Rage/Persistent Rage/Indomitable Might/Primal Champion **ทุกตัวเป็น self-only ทั้งหมด** ไม่มีฟีเจอร์ไหนฮีล/บัฟ ally เลยแม้แต่ตัวเดียว)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-20 | D | ไม่มีกลไก Support ใดๆ เลยทั้ง 20 เลเวล — floor rule ล็อก D ตรงไปตรงมาที่สุดเท่าที่เจอมาในชั้น 1 (ไม่มีแม้แต่จุดเปลี่ยนเดียวให้บันทึก) |

**สรุปเกรด**: D(1-20) แบนราบสนิท — ตรงกับระบบเก่าที่ให้ Support ต่ำสุดเสมอสำหรับ Barbarian แต่ระบบใหม่ยืนยันด้วยเหตุผลเชิงกลไกที่ชัดกว่า (ไม่ใช่แค่ "อ่อน" แต่ "ไม่มีเลยจริงๆ" ทุกเลเวล)

---

## Survivability

**Primary**: Effective HP — **d12** (สูงสุดในเกม, Anchor เองระบุเป็น deviation เหนือ peer d8) — เหนือ peer ทุกเลเวลตั้งแต่ lv1 (15 vs peer 11, ห่างเพิ่มขึ้นเรื่อยๆ จนถึง 205 vs peer 163 ที่ lv20)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Effective HP=15 เหนือ peer(11) ชัดเจน = Primary เริ่มที่ A แต่ Mitigation=above(**Rage resist B/P/S dmg — ตัวอย่าง outlier ที่ Anchor เองอ้างอิงตรงๆ ที่ lv1**), Save Reliability=match(advantage STR save/check เฉพาะตอน Rage ยังไม่กว้างพอ), Debuff Resistance=D/below, Death Prevention=D/below(ยังไม่ถึง Relentless Rage lv11) = 1 above/2 below → **≥2/4 below ชนะ** ขยับลง 1 ขั้น A→B |
| 2 | A | **Danger Sense ปลดล็อก** — advantage DEX save แบบไม่มีเงื่อนไข (ไม่ต้อง Rage) ดัน Save Reliability→above ทันที = 2 above(Mitigation,SaveReliability)/2 below(DebuffResistance,DeathPrevention) **เสมอกันพอดี (2-2)** → ตีความเป็นหักกลบสุทธิ ไม่ขยับ กลับไปที่ Primary เพียวๆ = A (บันทึกเป็น edge case ของกฎ tie-break ที่ยังไม่เคยเจอมาก่อน — 2-2 tie ไม่ใช่ ≥2 ฝ่ายเดียวชัดเจนแบบตัวอย่างที่ Anchor เขียนไว้) |
| 3-4 | =lv2 | ไม่มีจุดเปลี่ยน (Primal Knowledge เป็น Utility) |
| 5-10 | =lv2 | ไม่มีจุดเปลี่ยน (Extra Attack/Fast Movement/Feral Instinct/Instinctive Pounce/Brutal Strike ไม่กระทบ 4 มิตินี้) |
| 11 | S | **Relentless Rage ปลดล็อก** — cheat-death เต็มรูปแบบ (CON save DC10 ไม่ตายตอน HP=0 ระหว่าง Rage, ฟื้นเป็น 2×level HP) — **นี่คือฟีเจอร์ที่ Anchor เองอ้างเป็นตัวอย่างเพดานของ Death Prevention ที่ lv11 พอดี** ดัน Death Prevention→above = 3 above(Mitigation,SaveReliability,DeathPrevention)/1 below(DebuffResistance) → **≥2/4 above ชนะชัดเจน** ขยับขึ้น 1 ขั้น A→S |
| 12-17 | =lv11 | ไม่มีจุดเปลี่ยน |
| 18 | =lv11 | Indomitable Might เสริม Save Reliability อีกชั้น (ใช้ STR score แทน total ถ้าต่ำกว่า) แต่ modifier ขยับได้สูงสุด+1 ขั้นเท่าเดิมอยู่แล้ว (คงเพดาน S) |
| 19-20 | =lv11 | Primal Champion(lv20) เพิ่ม CON+4 จริง — ดัน Effective HP เกินตัวเลข flat+3 ที่คำนวณไว้อีกชั้น (ceiling-outlier แยกต่างหาก คล้าย Damage lv20) |

**สรุปเกรด**: B(1) → A(2-10) → S(11-20) — Barbarian เป็นคลาสที่ 2 ต่อจาก Sacred Knight ที่ Primary(Effective HP) เหนือ peer เองตั้งแต่ lv1 แต่ต่างจาก Sacred Knight ตรงที่ Barbarian ไต่ขึ้นไปถึง S จริงที่ lv11 (Sacred Knight นิ่งที่ A ตลอด) เพราะมี Mitigation+Death Prevention ที่แข็งแรงกว่ามาก

---

## Action Economy

**Primary**: Attack-Action Efficiency — 1 attack/action(lv1-4)→2 attacks/action(lv5+) **ตรงกับมาร์เชียล peer เป๊ะทุกจุด** (ไม่มี 3rd/4th attack แบบ Fighter outlier)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Primary=B (1atk/action ตรง peer เป๊ะ) — modifier: **Bonus Action Value=above** (**Rage เข้าด้วย Bonus Action — Anchor เองอ้างเป็น outlier ตัวแรกสุดของตารางที่ lv1 พอดี**), Reaction Value=match(ไม่มี, เท่า peer-baseline ทั่วไป), Extra Action Access=below(ไม่มีเลย, Action Surge เป็นของ Fighter เท่านั้น), Resource-to-Action Conversion=below(ไม่มีเลย, Metamagic เป็นของ caster เท่านั้น) = 1 above/2 below → **≥2/4 below ชนะ** ขยับลง 1 ขั้น B→C — **ผลลัพธ์สวนทางความรู้สึก** (Barbarian มีฟีเจอร์ Bonus Action ที่แรงมากแต่ modifier-count กลับกดเกรดลง เพราะไม่มี Reaction/Extra-Action/Resource-Conversion เลยสักอย่าง) |
| 2 | =lv1 | Reckless Attack เป็น Damage ไม่ใช่ Action Economy dimension โดยตรง (ไม่ให้ action/bonus action ใหม่ แค่ toggle การโจมตี) ไม่เปลี่ยนเกรด |
| 3-4 | =lv1 | ไม่มีจุดเปลี่ยน |
| 5 | C | Extra Attack: Primary=B (2atk/action ตรง peer ใหม่เป๊ะ) — modifier tally เดิม (1 above/2 below) ยังคงขยับลง คงที่ C |
| 6 | =lv5 | ไม่มีจุดเปลี่ยน |
| 7 | =lv5 | Instinctive Pounce (เดินครึ่ง speed ผ่าน bonus action เดียวกับ Rage) เสริม Bonus Action Value ที่ above อยู่แล้วให้แน่นขึ้น ไม่ใช่มิติใหม่ ไม่เปลี่ยนเกรด |
| 8-16 | =lv5 | ไม่มีจุดเปลี่ยน (Brutal Strike/Relentless Rage/Improved Brutal Strike ไม่ให้ action/bonus action/reaction ใหม่ — เป็นการปรับผล attack ที่มีอยู่แล้ว) |
| 15 | =lv5 | Persistent Rage ลดภาระ "ต้อง extend Rage ทุกเทิร์น" ลง (ไม่ต้องเสีย attack/bonus action/reaction เพื่อรักษา Rage อีกต่อไป) — เสริม Bonus Action Value ที่ above อยู่แล้วอีกชั้น ยังไม่พอเปลี่ยน tally (1 above/2 below เดิม) |
| 17-20 | =lv5 | ไม่มีจุดเปลี่ยน |

**สรุปเกรด**: C(1-20) แบนราบตลอดอาชีพ — **ข้อค้นพบสำคัญ**: แม้ Barbarian จะมีฟีเจอร์ Bonus Action ระดับ outlier (Rage) ตั้งแต่ lv1 แต่ modifier-count rule (นับจำนวนมิติ ไม่ใช่ชั่งน้ำหนัก) ทำให้เกรดรวมตกลงมาเป็น C เพราะขาด Reaction/Extra-Action/Resource-Conversion ครบทั้ง 2/4 มิติ — เป็นผลลัพธ์ตรงไปตามกฎ tie-break ที่เขียนไว้ ไม่ใช่ข้อผิดพลาด แต่ควรจดไว้เป็นตัวอย่างว่ากฎนี้ไม่ได้ชั่งน้ำหนักความแรงของแต่ละมิติเลย (1 มิติ outlier ยังแพ้ 2 มิติที่แค่ "ไม่มี" ได้)

---

## Utility

**Primary**: Magnitude — **ไม่มีสเปลล์/ritual เลย** (Reveal Info/Solve Problem = D ตลอด) เหลือแค่ Skill-Check Layer สายเดียวที่มีศักยภาพ แต่ Primal Knowledge (lv3) ให้แค่ **skill proficiency เพิ่ม 1 ตัว** (ไม่ใช่ Expertise/reliability-multiplier แบบที่ Anchor นับเป็น milestone) และ Indomitable Might (lv18) เป็น check-floor เฉพาะ STR เท่านั้น ไม่ใช่ Magnitude ของการแก้ปัญหาจริง

| Lv | Grade | เหตุผล |
|---|---|---|
| 1-2 | D | ไม่มีกลไก Utility ใดๆ เลย (skill proficiency พื้นฐาน 2 ตัวที่ทุกคลาสมีเหมือนกันไม่นับเป็นกลไกตาม Anchor's Skill-Check Layer framework ที่นับเฉพาะ Expertise/JOAT/Reliable Talent) |
| 3 | D | **Primal Knowledge ปลดล็อก** — +1 skill proficiency + ใช้ STR แทนสกิลอื่นได้ตอน Rage (Acrobatics/Intimidation/Perception/Stealth/Survival) — เป็น breadth เล็กน้อยของ skill coverage ไม่ใช่ Magnitude ของการแก้ปัญหา exploration/social/info จริง **Primary(Magnitude) ยังคง D** → floor rule ล็อกทั้งแกน D ต่อ (เหมือน Sacred Knight's Versatility floor-lock) |
| 4-17 | =lv3 | ไม่มีจุดเปลี่ยน |
| 18 | D | Indomitable Might — check-floor เฉพาะ STR check/save เท่านั้น (แคบกว่า Reliable Talent ของ Rogue มาก ซึ่งครอบคลุมทุก skill/tool ที่ชำนาญ) ไม่ถือเป็น Magnitude mechanism ของแกนนี้ Primary ยังคง D |
| 19-20 | =lv18 | ไม่มีจุดเปลี่ยน |

**สรุปเกรด**: D(1-20) แบนราบสนิททั้ง 20 เลเวล — **แกนที่ 2 ของ Barbarian ที่เป็น D เต็มรูปแบบ** (คู่กับ Support) สะท้อนตัวตนคลาสตรงไปตรงมา (ไม่ใช่ skill-monkey แบบ Rogue แม้จะมี skill proficiency พอสมควรก็ตาม เพราะไม่มี reliability-layer ใดๆ ซ้อนทับ)

---

## Versatility

**Primary**: Loadout Flexibility — **จุดที่ผิดคาดที่สุดของไฟล์นี้**: Barbarian ไม่มีสเปลล์ ตามกฎทั่วไป (Anchor finding #4) ควรได้ D ตรงๆ แต่ **Weapon Mastery (lv1)** ให้ "สลับ 1 ประเภทอาวุธที่เลือกไว้ได้ทุก Long Rest" ซึ่ง**โครงสร้างเดียวกันเป๊ะกับ tier "กลาง" (Paladin/Ranger's สลับสเปลล์ได้ 1 ตัว/Long Rest)** — เป็นคลาสมาร์เชียลล้วนตัวแรกในชั้น 1 ที่มีกลไกระดับ Loadout-Flexibility เทียบเท่าคลาสมีสเปลล์จริง

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Weapon Mastery = tier "กลาง" (สลับ 1/Long Rest) → Primary=B ตรงๆ (เทียบเท่า Paladin/Ranger) — modifier: Resource Fungibility=below(ไม่มี resource pool ที่ fungible ข้าม axis จริงจัง), Cross-Axis Coverage=**above**(kit ครอบคลุม Damage+Survivability+Action Economy = 3/6 axis ตั้งแต่ lv1 เกินมาตรฐาน full-caster's "~1-2 axis" ที่ lv1), Target-Type Coverage=match(single-target ล้วน ตรงกับ marchial baseline ของ Anchor เอง ไม่ใช่ below), Adaptability Under Pressure=match(ยังไม่มี Reckless Attack toggle) = 1 above/1 below ไม่พอขยับ (ต้องการ ≥2/4) คงที่ B |
| 2 | A | **Reckless Attack ปลดล็อก** — เลือก toggle ทุกเทิร์นว่าจะ reckless หรือไม่ ดัน Adaptability Under Pressure→above = 2 above(CrossAxis,Adaptability)/1 below(ResourceFungibility) → **≥2/4 above ชนะ** ขยับขึ้น 1 ขั้น B→A |
| 3-8 | =lv2 | ไม่มีจุดเปลี่ยน |
| 9 | =lv2 | Brutal Strike เพิ่ม Cross-Axis Coverage อีก (แตะ Control axis ด้วย Forceful/Hamstring Blow) + เพิ่มตัวเลือก Adaptability (เลือก effect ต่อครั้ง) แต่ modifier ขยับได้สูงสุด+1 ขั้นเท่าเดิมอยู่แล้ว คงเพดาน A |
| 10-20 | =lv2 | ไม่มีจุดเปลี่ยน (Relentless Rage/Improved Brutal Strike/Persistent Rage/Indomitable Might/Primal Champion ล้วนเสริม modifier ที่ above อยู่แล้วให้แน่นขึ้น ไม่ข้ามเกณฑ์ใหม่) |

**สรุปเกรด**: B(1) → A(2-20) — **คลาสมาร์เชียลล้วนตัวแรกในชั้น 1 ที่ไม่ตก D ในแกนนี้เลย** ต่างจากกฎทั่วไปของ Anchor finding #4 ที่สมมติว่ามาร์เชียลไม่มีสเปลล์ = D เสมอ — Weapon Mastery's "สลับ 1 ประเภท/Long Rest" เป็นกลไกที่ Anchor เองไม่เคยพิจารณาตอนเขียน finding #4 (เขียนก่อน 2024 Weapon Mastery จะถูกนับเข้ามาในสโคป) ควรบันทึกเป็นข้อยกเว้นสำคัญสำหรับ Fighter/Paladin/Ranger/Rogue ที่มี Weapon Mastery เหมือนกันด้วย (ต้องเช็คทีละคลาสต่อไป)

---

## สรุปรวม 7 axis

| Axis | เกรดตามเลเวล |
|---|---|
| Damage | A(1-16) → S(17-20) |
| Control | D(1-8) → C(9-20) |
| Support | D(1-20) |
| Survivability | B(1) → A(2-10) → S(11-20) |
| Action Economy | C(1-20) |
| Utility | D(1-20) |
| Versatility | B(1) → A(2-20) |

**ข้อค้นพบสำคัญ**:
1. **Barbarian คือคลาสแรกในชั้น 1 ที่ Primary dimension เหนือ peer เองพร้อมกันถึง 2 axis** (Damage's Magnitude จาก Rage Damage bonus, Survivability's Effective HP จาก d12) — ทั้งคู่ดัน Primary ไปเริ่มที่ A ตั้งแต่ lv1 โดยไม่ต้องพึ่ง modifier เลย เป็นรูปแบบ chassis ที่แข็งแรงตั้งแต่ต้นเกมชัดเจนที่สุดในบรรดา 4 คลาสที่ทำมาแล้ว
2. **Versatility พลิกความคาดหมาย** — Anchor finding #4 เขียนไว้ว่ามาร์เชียลไม่มีสเปลล์ = D เสมอ แต่ Weapon Mastery's Long-Rest-swap ทำให้ Barbarian ได้ B→A แทน เป็นครั้งแรกที่พบว่ากฎทั่วไปของ Anchor มีข้อยกเว้นจริงจากฟีเจอร์ 2024-only ที่ Anchor เขียนไว้ก่อนจะพิจารณา Weapon Mastery ครบถ้วน — ควรเช็คคลาสมาร์เชียลอื่นที่มี Weapon Mastery (Fighter/Paladin/Ranger/Rogue) ด้วยหลักการเดียวกันต่อไป
3. **Action Economy สวนทางความรู้สึก** — Rage เป็นฟีเจอร์ Bonus-Action-outlier ที่ Anchor เองยกเป็นตัวอย่างเด่นสุด แต่กฎ tie-break แบบนับจำนวนมิติ (ไม่ชั่งน้ำหนัก) ทำให้ Barbarian ตกไปที่ C ตลอดอาชีพเพราะขาด Reaction/Extra-Action/Resource-Conversion 2/4 มิติ — ยืนยันว่ากฎนี้ประเมิน "ความกว้าง" ไม่ใช่ "ความลึก" ของแต่ละ axis
4. **Support และ Utility เป็น D เต็มรูปแบบทั้ง 20 เลเวลทั้งคู่** — ครั้งแรกในชั้น 1 ที่คลาสหนึ่งมีถึง 2 axis เป็น D แบนราบสนิทไม่มีจุดเปลี่ยนเลยแม้แต่จุดเดียว สะท้อนตัวตน "pure damage/tank marchial" ของ Barbarian ตรงไปตรงมาที่สุดในบรรดาคลาสที่ทำมา
5. **Damage ไม่มีช่วงตกกลับเป็น B/C เลย** — ต่างจาก Alchemist (มีช่วง B แทรกตรงกลาง) เพราะ Rage Damage bonus ไล่ตามจังหวะ Extra Attack ได้พอดีทุกครั้ง ไม่มีช่วง "รอ milestone ใหม่" ที่ทำให้ตกต่ำกว่า peer เหมือน Alchemist's lv5 dip
6. **lv11 คือจุดกระโดดใหญ่สุดของ Survivability** (A→S) เพราะ Relentless Rage ตรงกับตัวอย่างเพดาน Death Prevention ที่ Anchor เขียนไว้พอดีเป๊ะ (ชื่อฟีเจอร์+เลเวลตรงกันเป๊ะ) — เป็นคลาสแรกที่ไต่ถึง S ในแกนนี้ (Sacred Knight ได้แค่ A นิ่งตลอด)
7. **เจอ tie-break edge case ใหม่ที่ Anchor ไม่เคยเขียนกฎรองรับ**: Survivability lv2 มี modifier tally 2 above/2 below พอดี (เสมอกัน) — ตีความเป็น "หักกลบสุทธิ กลับไปที่ Primary เพียวๆ" เพราะไม่มีฝ่ายไหนถึงเกณฑ์ ≥2/4 ที่ชัดเจนกว่าอีกฝ่าย ควรบันทึกไว้เป็นแนวปฏิบัติสำหรับเคสเสมอกันในอนาคต (ยังไม่ได้แก้ Anchor Rubric ตรงๆ รอ user ยืนยันถ้าต้องการ)