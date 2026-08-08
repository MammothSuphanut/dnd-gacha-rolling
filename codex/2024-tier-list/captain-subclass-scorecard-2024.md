# Captain — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 29 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Captain](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 29 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

**⚠️ ข้อจำกัดข้อมูล**: ไม่มีเนื้อหา Maneuver แต่ละตัว (Bolster/Born Leader/Morale Boost/Rally/Staggering Strike) แบบละเอียด — ชื่อบ่งชี้ theme (ฮีล/บัฟ/debuff) แต่ตัวเลขจริงยังตรวจสอบไม่ได้ คะแนน Control/Damage บางส่วนด้านล่างจึงระมัดระวังไว้ก่อน

---

## Class Baseline (Captain, 2024)

Floor 0-10 ต่อ axis ของ **Captain เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, ไม่มี spellcasting, saving throw proficiency Con + Cha, armor proficiency ครบทุกชนิดรวม heavy+shield, weapon proficiency simple+martial, Weapon Mastery, Fighting Style, Battle Tactics (lv1, Battle Dice 2d6→เพิ่มขึ้นตามเลเวล ฟื้นเต็มตอนทอย initiative + ทุก short/long rest ขับ 5 maneuver), **Cohort (lv2, ผู้ติดตามเต็มตัวที่ต่อสู้เคียงข้าง ใช้ Charisma ของเราโจมตี ลงมือทุกรอบ อัปเกรดตามเลเวล)**, Blitz (lv5), Valiant Surge (lv7), Coordinated Strike (lv11), Lead by Example (lv15), Teamwork Maneuvers (lv18), Legendary Commander (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี Extra Attack ส่วนตัวติด baseline (ต่างจาก martial class อื่นส่วนใหญ่) — Coordinated Strike (lv11) ให้ extra 2d8 ดาเมจเมื่อ Cohort ทำดาเมจเป้าเดียวกันมาก่อนในรอบล่าสุด เป็น combo damage ที่ต้องพึ่ง Cohort เสมอ ไม่ใช่ magnitude เดี่ยวของตัวเอง [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 3/10 (C) | Maneuver "Staggering Strike" ชื่อบ่งชี้ soft-CC แต่เนื้อหาจริงไม่มีในข้อมูลที่ตรวจสอบได้ ไม่มี hard-CC ที่ยืนยันได้ติด chassis [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 9/10 (S) | Cohort คือ**ผู้ติดตามเต็มตัวที่ลงมือทุกรอบ**เทียบเท่าได้ปาร์ตี้เมมเบอร์เพิ่มฟรี 1 คน ใช้ Charisma/Proficiency ของ Captain อัปเกรดขึ้นตามเลเวล บวก Blitz (lv5) ให้สั่ง Cohort หรือ ally มอบ Reaction เดิน/โจมตีฟรีได้ 1 ครั้ง/เทิร์น และ Legendary Commander (lv20) ให้ตัวเองหรือ ally ลง Legendary Action พิเศษได้ระหว่างเทิร์นคนอื่น (3 ครั้ง/short-long rest) — เป็น class เดียวที่ chassis สร้าง action-economy เพิ่มให้ทั้งทีมได้โดยตรง [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | HD d8 + armor proficiency ครบทุกชนิดรวม heavy+shield ตั้งแต่ lv1 เป็นฐานที่แข็งพอสมควร แต่ไม่มี resistance/self-heal เฉพาะติด chassis [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Blitz (lv5) มอบ Reaction เดิน/โจมตีฟรีให้ Cohort หรือ ally ได้ 1 ครั้ง/เทิร์นแบบไม่เสีย resource เพิ่ม, Teamwork Maneuvers (lv18) ให้ maneuver ที่เล็ง ally ยิงได้ 2 เป้าโดยจ่าย Battle Die แค่ก้อนเดียว, และ Legendary Commander (lv20) มอบ turn พิเศษให้ตัวเองหรือ ally ได้ระหว่างรอบคนอื่น — เป็นเครื่องกำเนิด action ให้ทั้งทีม ไม่ใช่แค่ตัวเอง [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี skill bonus, ritual, หรือ utility feature นอกคอมแบตติด chassis เลย ทุกอย่างเน้น combat-leadership ล้วนๆ [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Battle Dice ขับ 5 maneuver คนละสายให้เลือกใช้ตามสถานการณ์ ฟื้นได้บ่อยมาก (ทุกครั้งที่ทอย initiative + ทุก short/long rest) บวก Cohort ที่เลือก stat block ได้เองตอน initiate (ปรับ role ของ "สมาชิกทีมเพิ่ม" ให้เข้ากับ build ได้) [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (29)

**Class Baseline อ้างอิง**: Damage 5, Control 3, Support 9, Survivability 4, Action Economy 7, Utility 3, Versatility 6

**หมายเหตุโครงสร้างข้อมูล**: 12 subclass เป็น Captain-native (ValdaSpire24/Extras), 10 subclass เป็น "Cross-Compatible" ที่ยืมมาจาก class Vagabond ตรงๆ (เนื้อหาเต็มอยู่ในไฟล์ Vagabond ไม่ใช่ Captain — ดึงมาให้คะแนนแล้ว), และ 7 Banner เป็น 2014-only orphan (VSS/ValdaSpireExtras ไม่มี reprint 2024) ทั้งหมดแท็ก 🕰️

**ข้อยกเว้น baseline floor**: Demon Brand (2024) และ Demon Banner (2014 🕰️) มีข้อความ explicit ว่า "forgo the companionship of a Cohort" — Cohort ไม่แยกร่างเป็นตัวละครที่สองที่ลงมือเองทุกรอบเหมือน subclass อื่น (ผู้เล่นแปลงร่างเป็นปีศาจแทน ใช้ turn เดียวกัน) จึงเป็น subclass เดียวที่มีสิทธิ์ให้คะแนน Support/Action Economy **ต่ำกว่า baseline** ได้ตามกติกา

| Subclass | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Daggermark | ValdaSpire24 | 5 (B) | 3 (C) | 10 (S) | 7 (A) | 8 (A) | 5 (B) | 6 (B) |
| Demon Brand | ValdaSpire24Extras | 5 (B) | 3 (C) | 4 (C) ⚠️ | 8 (A) | 5 (B) ⚠️ | 8 (A) | 7 (A) |
| Dragon Banner | ValdaSpire24 | 9 (S) | 6 (B) | 9 (S) | 4 (C) | 9 (S) | 3 (C) | 6 (B) |
| Eagle Banner | ValdaSpire24 | 7 (A) | 5 (B) | 10 (S) | 4 (C) | 7 (A) | 4 (C) | 7 (A) |
| Holy Icon | ValdaSpire24 | 6 (B) | 3 (C) | 10 (S) | 4 (C) | 8 (A) | 5 (B) | 6 (B) |
| Jolly Roger | ValdaSpire24 | 7 (A) | 6 (B) | 10 (S) | 4 (C) | 8 (A) | 4 (C) | 7 (A) |
| Lion Banner | ValdaSpire24 | 6 (B) | 6 (B) | 10 (S) | 6 (B) | 8 (A) | 3 (C) | 7 (A) |
| Siegeball Jersey | ValdaSpire24Extras | 5 (B) | 6 (B) | 10 (S) | 7 (A) | 8 (A) | 4 (C) | 7 (A) |
| Skull Banner | ValdaSpire24Extras | 9 (S) | 6 (B) | 10 (S) | 6 (B) | 9 (S) | 3 (C) | 7 (A) |
| Star-Spangled Banner | ValdaSpire24Extras | 9 (S) | 6 (B) | 10 (S) | 7 (A) | 9 (S) | 3 (C) | 8 (A) |
| Tower Banner | ValdaSpire24 | 6 (B) | 5 (B) | 10 (S) | 9 (S) | 8 (A) | 3 (C) | 6 (B) |
| Yellow Sign | ValdaSpire24Extras | 7 (A) | 9 (S) | 9 (S) | 5 (B) | 7 (A) | 6 (B) | 7 (A) |
| Adrenaline Junkie | ValdaSpire24Extras (Vagabond) | 6 (B) | 3 (C) | 9 (S) | 8 (A) | 8 (A) | 4 (C) | 6 (B) |
| Brigand | ValdaSpire24Extras (Vagabond) | 8 (A) | 6 (B) | 9 (S) | 5 (B) | 7 (A) | 4 (C) | 6 (B) |
| Feylost | ValdaSpire24Extras (Vagabond) | 6 (B) | 8 (A) | 9 (S) | 7 (A) | 7 (A) | 3 (C) | 7 (A) |
| Gourmand | ValdaSpire24Extras (Vagabond) | 6 (B) | 3 (C) | 10 (S) | 6 (B) | 7 (A) | 4 (C) | 7 (A) |
| Houndmaster | ValdaSpire24Extras (Vagabond) | 6 (B) | 3 (C) | 9 (S) | 6 (B) | 8 (A) | 5 (B) | 7 (A) |
| Knight Errant | ValdaSpire24Extras (Vagabond) | 5 (B) | 6 (B) | 10 (S) | 7 (A) | 8 (A) | 4 (C) | 7 (A) |
| Plague Doctor | ValdaSpire24Extras (Vagabond) | 7 (A) | 6 (B) | 10 (S) | 4 (C) | 7 (A) | 5 (B) | 7 (A) |
| Pugilist | ValdaSpire24Extras (Vagabond) | 8 (A) | 6 (B) | 9 (S) | 8 (A) | 7 (A) | 3 (C) | 6 (B) |
| Rōnin | ValdaSpire24Extras (Vagabond) | 8 (A) | 3 (C) | 9 (S) | 8 (A) | 7 (A) | 4 (C) | 6 (B) |
| Troubadour | ValdaSpire24Extras (Vagabond) | 6 (B) | 3 (C) | 10 (S) | 4 (C) | 7 (A) | 6 (B) | 7 (A) |
| Demon Banner | ValdaSpireExtras 🕰️ | 6 (B) | 3 (C) | 5 (B) ⚠️ | 7 (A) | 5 (B) ⚠️ | 5 (B) | 7 (A) |
| Jolly Roger Banner | VSS 🕰️ | 7 (A) | 4 (C) | 10 (S) | 5 (B) | 9 (S) | 4 (C) | 7 (A) |
| Ram Banner | VSS 🕰️ | 6 (B) | 6 (B) | 10 (S) | 4 (C) | 7 (A) | 4 (C) | 6 (B) |
| Raven Banner | VSS 🕰️ | 8 (A) | 3 (C) | 9 (S) | 6 (B) | 8 (A) | 5 (B) | 6 (B) |
| Siegeball Banner | ValdaSpireExtras 🕰️ | 5 (B) | 6 (B) | 10 (S) | 6 (B) | 8 (A) | 4 (C) | 6 (B) |
| Treant Banner | ValdaSpireExtras 🕰️ | 6 (B) | 7 (A) | 10 (S) | 6 (B) | 7 (A) | 3 (C) | 7 (A) |
| Turtle Banner | VSS 🕰️ | 5 (B) | 3 (C) | 10 (S) | 9 (S) | 7 (A) | 3 (C) | 6 (B) |

---

### Daggermark (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจโดยตรง = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Flanking Strike ให้ ally advantage บนการโจมตีถัดไปใส่เป้าที่คุณเพิ่งตี ทุกครั้งที่โจมตีสำเร็จ — เพิ่มเข้าไปบน Cohort baseline ที่สูงอยู่แล้ว [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Evasion (lv10) แปลง half-damage save เป็น no-damage บน success และครอบคลุมถึง Cohort ด้วย [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Effortless Dodge (bonus action Disengage/Dodge ฟรี) + Preemptive Strike (lv14, reaction โจมตีก่อนที่ศัตรูจะตีโดน) [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Covert Tactics ให้ Stealth+Sleight of Hand proficiency และ bonus action Hide — utility แทรกซึมที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | เพิ่มธีม stealth/rogue ให้ leader class แต่ไม่ได้ขยาย breadth มาก = เท่า baseline |

### Demon Brand (ValdaSpire24Extras)

> **ข้อยกเว้น baseline**: ข้อความ subclass ระบุชัดว่า "forgo the companionship of a Cohort" และ demon "doesn't take its own turn" (ต่างจาก Cohort ปกติที่ลงมือเองทุกรอบ) — เป็นเหตุผล explicit ที่ทำให้ Support/Action Economy ต่ำกว่า baseline ได้

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | สแตทบล็อกปีศาจตอนแปลงร่างไม่มีตัวเลขยืนยันในข้อมูลที่มี = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 4/10 (C) ⚠️ | ไม่มี Cohort แยกร่างที่ลงมือเองอีกต่อไป — demon เป็นแค่ "อีกครึ่งหนึ่ง" ของตัวคุณเองที่ผลัดกันใช้ turn เดียวกัน ตัดความสามารถ Support หลักของ baseline ที่มาจาก Cohort โดยตรง [M:2/4] [R:1/3] [B:1/3] |
| **Survivability** | 8/10 (A) | Temp HP เท่า HP ของปีศาจ (บัฟเฟอร์ก้อนใหญ่) + Instinctive Transformation (lv10, resistance ดาเมจที่ trigger) + Abyssal Regeneration (lv14, ฟื้น HP เองเมื่อเลือดต่ำ) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 5/10 (B) ⚠️ | เพราะ demon ไม่ได้ลงมือแยกจากคุณ (ใช้ turn ร่วมกัน) — เสีย credit "Cohort เป็นตัวละครที่สอง" ของ baseline ไปเกือบทั้งหมด [M:2/4] [R:2/3] [B:1/3] |
| **Utility** | 8/10 (A) | Abyssal Arcana ให้ free-cast utility spell 9 ตัว (Detect Magic, Disguise Self, Alter Self, Darkvision, Detect Thoughts, Dispel Magic, Nondetection, Tongues ฯลฯ) ผ่านการเสีย Battle Dice — breadth utility กว้างกว่า baseline มาก [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | สลับระหว่างร่างตัวเอง (utility caster) กับร่างปีศาจ (melee brawler) ได้ตามสถานการณ์ [M:2/4] [R:3/3] [B:2/3] |

### Dragon Banner (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Critical Focus ขยาย crit range ได้ถึง 16-20 แบบ snowball ทุกครั้งที่ครีหรือฆ่า + Rampage (ตี-ย้ายฟรีทุกครั้งที่ครี/ฆ่า) + Coup de Grâce (lv14, dice เพิ่มเพื่อ execute) — คลังดาเมจที่ยิ่งฆ่ายิ่งแรง [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Bloody Spectacle (lv10) AoE Frightened รัศมี 30ft ทุกครั้งที่ครี/ฆ่า [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 9/10 (S) | ไม่มี feature เสริมทีมโดยตรง (ทุกอย่างเน้นตัวเองล้วน) = เท่า baseline |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 9/10 (S) | Martial Recovery (bonus action คืน Battle Dice ทั้งหมด) + Rampage (ย้าย+ตีฟรีไม่เสีย action) — เครื่องกำเนิด action ที่ยิ่งฆ่ายิ่งไหลลื่น [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 6/10 (B) | เน้นดาเมจ/crit-snowball ธีมเดียวหนักมาก = เท่า baseline |

### Eagle Banner (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Hundred-Arrow Volley (lv14, AoE cone/cylinder ระยะไกลหลายเป้า) + Eagle Eye (เปลี่ยนพลาดให้เป็นโดนได้) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Counter-Shot (lv10, reaction หัก die จาก ranged attack ที่จะโดนใครก็ได้ ทำให้พลาดได้จริง) [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 10/10 (S) | Counter-Shot ป้องกันได้ทั้งตัวเองและ ally จากการโจมตีระยะไกล + Close-Quarters Shooting ครอบคลุม Cohort ด้วย — support เชิงป้องกันที่ baseline ไม่มี [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเองโดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Eagle Eye/Counter-Shot ไม่เสีย action แยก = เท่า baseline |
| **Utility** | 4/10 (C) | Vantage Point ให้ Climb Speed เต็ม — traversal utility เล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | เปลี่ยน Captain ให้เป็น dedicated ranged/sniper build พร้อม high-ground synergy [M:2/4] [R:3/3] [B:2/3] |

### Holy Icon (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Zealous Fervor (lv6) เพิ่ม 1d6 radiant ให้การโจมตีที่ Blitz สั่งให้ ally ทำ [M:2/4] [R:3/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Minor Miracle เพิ่มพลังฮีลของ Rally มหาศาล (2→4 die+Cha) **และชุบคนที่ 0 HP ได้** + Aura of Reprieve (AoE เลือก temp HP/resistance/ปลด condition) + Raise Cohort (lv14, free Raise Dead) — healer kit ระดับสูงสุดที่ทำมา [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ทุก feature เน้นช่วยเพื่อน ไม่มีการป้องกันตัวเองโดยตรง = เท่า baseline |
| **Action Economy** | 8/10 (A) | Aura of Reprieve เป็น action เดียวแต่ให้ผลต่อเนื่องกับทั้งทีมทุกเทิร์นนาน 1 นาที [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | 2 cantrip จาก Cleric list + Religion skill/bonus [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | เป็น dedicated healer ธีมเดียวหนักมาก = เท่า baseline |

### Jolly Roger (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Skirmish (bonus action ตีเพิ่มอีกครั้งผสมเมลี+ระยะไกลได้) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Dirty Tactics (lv10) เลือก Trip (prone) หรือ Pocket Sand (disadvantage) ทุกเทิร์นที่ตีเมลีโดน [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | All Hands on Deck (lv14) ให้ทั้งทีม advantage บน d20 test ครั้งถัดไปผ่าน bonus action เดียว (Cha mod ครั้ง/วัน) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 8/10 (A) | Skirmish เป็น bonus action extra attack + Fancy Footwork ย้ายตำแหน่งฟรีไม่เสีย action [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Swim speed (ตัวเอง+Cohort) — utility เฉพาะทางน้ำ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ผสมเมลี+ระยะไกล (Skirmish) + soft-control (Dirty Tactics) + team buff (All Hands) [M:2/4] [R:3/3] [B:2/3] |

### Lion Banner (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Challenge เพิ่ม die เข้าดาเมจตอน taunt + Vengeful Gambit (lv10) ให้ counter-attack [M:2/4] [R:3/3] [B:1/3] |
| **Control** | 6/10 (B) | Challenge (bonus action taunt: เป้ามี disadvantage โจมตีคนอื่นตราบใดที่คุณอยู่ใกล้) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | High Morale (lv6) ขยาย Morale Boost ให้เพื่อนหลายคนพร้อมกันโดยเสีย die แค่ก้อนเดียว + Heroic Leadership (lv14) แถม Heroic Inspiration ทุกครั้งที่ใช้ Bolster/Rally — efficiency multiplier บน support maneuver ของ baseline [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Vengeful Gambit ให้ resistance ดาเมจแบบ reactive ตอนโดนเป้าที่ challenge ตี [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Commanding Presence (ไม่เสีย die ถ้า Born Leader ล้มเหลว) + High Morale (จ่าย die เดียวได้ผล AoE) [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม tank/taunt + counter-attack + team-wide buff ได้ในตัวเดียว [M:2/4] [R:3/3] [B:2/3] |

### Siegeball Jersey (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจโดยตรง = เท่า baseline |
| **Control** | 6/10 (B) | Game Plan (lv6) ให้ Blitz-commanded ally ใช้ Grapple/Shove ผ่าน Defensive Tackle option [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | Team Inspiration (bonus action มอบ Battle Die ให้เพื่อนพลิกความล้มเหลวเป็นสำเร็จ) + Game Plan (ขยายสิ่งที่ Blitz สั่งให้ ally ทำได้: กระแทก/วิ่งไกล/ซ่อน) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Athletic Constitution (สลับ Str/Dex save เป็น Con save แบบ advantage) + Game-Winning Play (lv14, ยืดความตายที่ 0 HP พร้อมขยับ+action เต็ม) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Game-Winning Play ให้ action+bonus action เต็มแม้กำลังจะตาย — คุณค่าสูงมากในสถานการณ์ฉุกเฉิน [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Athletics bonus + sports trivia — utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ผสม control (ผ่าน Cohort/ally) + support + personal emergency-survival [M:2/4] [R:3/3] [B:2/3] |

### Skull Banner (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Necromantic Burst (lv14) เป็น AoE nova 10d8 necrotic รัศมี 30ft save-for-half — magnitude สูงสุดในกลุ่ม Captain ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Horrific Strike (bonus action Frightened จนจบเทิร์นถัดไปทุกครั้งที่ตีเมลีโดน) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | Undead Horde (lv6) สร้าง Undead Cohort ชั่วคราวเพิ่มอีกตัวผ่าน bonus action (นอกเหนือจาก Cohort หลัก) — ตัวช่วยรบสองตัวพร้อมกัน [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Sacrificial Thralls (lv10, reaction ให้ Undead รับดาเมจแทนตัวเอง) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 9/10 (S) | Undead Horde เพิ่มตัวช่วยรบตัวที่สองผ่าน bonus action เดียว — ทวีคูณ action-economy ของ baseline ที่มาจาก Cohort อยู่แล้ว [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสม necromancer-summoner เข้ากับ leader kit เดิม เปลี่ยน playstyle ชัดเจน [M:2/4] [R:3/3] [B:2/3] |

### Star-Spangled Banner (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Extra Attack (lv6, baseline Captain ไม่มีเลย) + Bull Rush (bonus dmg+push+prone) + Shield Fighter (อาวุธเพิ่ม) — สามแหล่งดาเมจซ้อนกัน [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Bull Rush บังคับ Str save ไม่งั้น prone+ผลัก 10ft [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | Patriotism free-cast Heroism (temp HP ต่อเนื่อง+immune frightened ให้เป้าที่เลือกได้) [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Freedom of Movement (lv10, free-cast ตัวเอง+Cohort) + Liberty or Death (lv14, cheat death ด้วยการเสีย die) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Wings of Liberty (lv14) ให้ special bonus action เพิ่มสำหรับ maneuver โดยเฉพาะนาน 1 นาที — ทวีคูณ AE ของ baseline [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | Second Amendment (weapon mastery ที่ 3) เน้นคอมแบตล้วน = เท่า baseline |
| **Versatility** | 8/10 (A) | ผสมเมลี+shield-throw+"super mode" (บิน+extra action+cheat death) นาน 1 นาที [M:3/4] [R:2/3] [B:3/3] |

### Tower Banner (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Iron Retribution (lv14) ให้ 3d6 bludgeoning ฟรีทุกครั้งที่มีคนพลาดตีเมลีใส่คุณ (ไม่เสีย action) [M:2/4] [R:3/3] [B:1/3] |
| **Control** | 5/10 (B) | Siege Defense สลับ weapon mastery เป็น Push/Slow ได้ [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 10/10 (S) | Armored Redirection (lv6, reaction ดึงการโจมตีที่จะโดน ally ให้มาโดนตัวเองแทน) — guardian mechanic แท้ที่ baseline ไม่มี [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Iron Wall (reactive AC boost) + Mettle (lv10, Con-save Evasion ครอบคลุม Cohort) + Iron Retribution — คลัง tank ที่ครบเครื่องมาก [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Iron Retribution ทำงานฟรีไม่เสีย action + Armored Redirection เป็น reaction [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 6/10 (B) | dedicated tank/protector ธีมเดียวหนักมาก = เท่า baseline |

### Yellow Sign (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Nightmarish Glow (lv14) ให้ตัวเอง+ally ในออร่าตี extra 1d6 psychic ทุกครั้งที่โดน [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 9/10 (S) | Frenzied Strike (Confusion-like condition on hit) + Maniacal Influence (lv10, ขยายเวลา Frenzy + สั่ง Blitz ให้ enemy ที่ Frenzied ได้แม้ไม่ใช่พวกเรา) — ควบคุมศัตรูให้หันไปตีกันเองได้จริง [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 9/10 (S) | Nightmarish Glow/Eldritch Herald เน้น debuff/self-buff มากกว่า ally โดยตรง = เท่า baseline |
| **Survivability** | 5/10 (B) | Eldritch Herald ให้ advantage ต้าน charm/frightened แก่ตัวเอง+Cohort [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Frenzied Strike/Pallid Aura เป็น bonus action ผลกว้าง = เท่า baseline |
| **Utility** | 6/10 (B) | Outer Knowledge ให้ expertise skill ที่หมุนเวียนได้ทุก long rest (GM เลือก) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | eldritch cultist ธีม control/debuff เฉพาะทาง บวก utility skill หมุนเวียน [M:2/4] [R:3/3] [B:2/3] |

### Adrenaline Junkie (ValdaSpire24Extras, ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Hyper Focus (advantage การโจมตีครั้งถัดไป) — ดาเมจทางอ้อมผ่าน Stim Potion [M:2/4] [R:3/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Stim Potion/Adrenaline เน้นตัวเองล้วน ไม่มี ally-support โดยตรง = เท่า baseline |
| **Survivability** | 8/10 (A) | Rush (Dash/Disengage ฟรี) + Bullet Time (disadvantage ใส่ผู้โจมตีคุณ) + Tuck and Roll (กัน fall damage ≤60ft) + Daredevil (lv10, temp HP ตอนโดนพลาดขณะเลือดต่ำ) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Stim Potion effect ทำงาน "no action required" ทุกเทิร์น + Rush ก็ฟรีเช่นกัน [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Heroic Inspiration บน risky check + fall immunity — utility เฉพาะทางแคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | เน้น self-buff/reckless playstyle ธีมเดียว = เท่า baseline |

### Brigand (ValdaSpire24Extras, ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Ambush (โจมตีฟรีตอนทอย initiative) + Cutthroat (lv14, exploding damage dice สูงสุด 4 รอบ) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Take Hostage (lv6, Grappled+Incapacitated เป้าที่เลือดต่ำ) + Underhanded Blow (lv10, disadvantage debuff) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 9/10 (S) | ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 5/10 (B) | Craven (reaction ย้าย 5ft ฟรีตอนโดนพลาด) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 7/10 (A) | Ambush ทำงานฟรีตอนทอย initiative = เท่า baseline |
| **Utility** | 4/10 (C) | Take Hostage ให้ cover+advantage ข่มขู่ — utility เชิงเจรจาต่อรอง [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ธีม hostage-taking/heist แคบ = เท่า baseline |

### Feylost (ValdaSpire24Extras, ยืมจาก Vagabond)

> **หมายเหตุข้อมูล**: ตาราง Fey Moods ไม่มีเนื้อหาละเอียดในไฟล์ที่ตรวจสอบได้ — ให้คะแนน Damage แบบระมัดระวังไว้ก่อนตามธีม "สุ่มบัฟ/เอฟเฟกต์" ที่ชื่อบ่งชี้

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Fey Moods table ไม่ทราบตัวเลขแน่ชัด ประเมินอนุรักษ์นิยมใกล้เท่า baseline [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 8/10 (A) | Frenzied Strike (Confusion-like) + Irresistible Mood (lv10, reaction charm/frighten ผู้โจมตีตอนเลือดต่ำ) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | ไม่มี feature เสริมทีมที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 7/10 (A) | Misty Pathways (lv6, free Misty Step) + Irresistible Mood (คุม CC ผู้โจมตีตอนเลือดต่ำ) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Mercurial (lv14) เรียก Fey Mood ได้ตามต้องการผ่าน bonus action = เท่า baseline |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบตที่ยืนยันได้ = เท่า baseline |
| **Versatility** | 7/10 (A) | คลัง control/escape + Fey Mood ที่ไม่แน่นอนแต่หลากหลายตามธีม [M:2/4] [R:3/3] [B:2/3] |

### Gourmand (ValdaSpire24Extras, ยืมจาก Vagabond — Quick Snack ดัดแปลงให้ใช้ Hit Dice แทน Breather)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Carve (bonus dmg ผ่าน 2 Battle Dice ตอนชำแหละเป้า) [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Monster Meal เลี้ยง temp HP+บัฟตามชนิดสัตว์ให้คนได้ถึงครึ่งเลเวล+Con mod คน + Gourmet Ingredients (lv14, เลือก Heroic Inspiration/ability score +2/free spell-cast ให้แต่ละคนที่กิน) — party-wide buff กว้างมาก [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Quick Snack (เวอร์ชัน Captain: ใช้ Hit Dice ฟื้น HP ตัวเองต้นเทิร์น) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Quick Snack ทำงาน "no action required" = เท่า baseline |
| **Utility** | 4/10 (C) | Gentle Repose ritual + Cook's Utensils — utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Monster Meal ให้บัฟต่างกันตามชนิดสัตว์ที่ล่ามาปรุง — ปรับตามแคมเปญได้กว้าง [M:2/4] [R:3/3] [B:2/3] |

### Houndmaster (ValdaSpire24Extras, ยืมจาก Vagabond — Hound กลายเป็น Cohort)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Martial Excellence (+1→+3 attack/damage ของหมา) + Sick 'Em! (bonus action สั่งหมาโจมตี+ขยับฟรี) [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ตรงติด chassis = เท่า baseline |
| **Support** | 9/10 (S) | ไม่มี feature เสริมทีมนอกเหนือจากตัวหมาเอง = เท่า baseline |
| **Survivability** | 6/10 (B) | Loyal Redirection (lv10, สลับโดนตีระหว่างตัวเองกับหมาได้) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Old Dog, New Tricks (lv14) ให้หมามี Battle Dice ของตัวเอง (2d10) ใช้ maneuver เองได้ — ทวีคูณ action-economy ของ Cohort baseline [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Hound's Instincts (lv6, blindsight 30ft + ดมกลิ่นจับ possession/disguise) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | หมาเรียนรู้ maneuver เองได้ 2 ตัว — เพิ่ม breadth ให้ Cohort baseline [M:2/4] [R:3/3] [B:2/3] |

### Knight Errant (ValdaSpire24Extras, ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจโดยตรง = เท่า baseline |
| **Control** | 6/10 (B) | Knight's Challenge เรียนรู้ Challenge maneuver และขยายเวลาเป็น 1 นาที [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | Inspiring Battlecry (lv6, free Heroic Inspiration ทั้งทีมตอนเลือดต่ำ) + Redirection (lv10, reaction รับดาเมจแทน ally พร้อม resistance) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Chivalrous Oath (temp HP ตอนทอย initiative + advantage ต้าน charm/fear) + Surge of Valor (lv14, ลดดาเมจฟรีผ่าน die ที่ไม่เสีย) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Surge of Valor ให้ reroll ฟรี (ไม่เสีย die) ทั้งด้าน defense และ d20 test นาน 1 รอบ [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | 2 skill proficiency (Animal Handling/History/Insight/Persuasion) [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ผสม tank/protector + party morale-booster [M:2/4] [R:3/3] [B:2/3] |

### Plague Doctor (ValdaSpire24Extras, ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Sanguine option (Imbalance Humors) เพิ่ม necrotic dmg + Bloodletting (lv14, Wounding Strike bleed สะสมสูงสุด 3 ก้อน) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Imbalance Humors ให้เลือก Melancholic (disadvantage) หรือ Phlegmatic (ล็อก opportunity attack) ทุกเทิร์นที่ตีโดน [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | Remedy (bonus action ฮีล 2 die+Con + ปลด condition ให้ ally ข้างตัว) + Analgesic Remedy (lv10, เพิ่ม temp HP เข้า Remedy) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ทุก feature เน้นช่วยเพื่อน ไม่มีป้องกันตัวเองโดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Remedy เป็น bonus action, Imbalance Humors แนบกับการโจมตีที่ทำอยู่แล้ว = เท่า baseline |
| **Utility** | 5/10 (B) | Diagnosis (Search action ตรวจ poison/bloodied/magical contagion) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ผสม healer + debuffer ได้ลงตัว [M:2/4] [R:3/3] [B:2/3] |

### Pugilist (ValdaSpire24Extras, ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Brute Force (bonus dmg = unarmed die ทุกเทิร์นบน hit แรก) + unarmed die สเกล 1d6→1d12 + Knockout (lv14, 3-die execute) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 6/10 (B) | Intimidating Blow (lv6, AoE Frightened ผ่าน Horrific Strike) + Knockout (Unconscious บนเป้าเลือดต่ำ) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 9/10 (S) | ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 8/10 (A) | Unarmored Defense (Dex+Con AC) + Shrug Off (reaction ลดดาเมจ) + Desperate Endurance (lv10, auto-succeed 1 save ตอนเลือดต่ำ) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Brute Force ทำงานฟรีบน hit แรก, Shrug Off เป็น reaction = เท่า baseline |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 6/10 (B) | pure unarmed-brawler ธีมเดียว = เท่า baseline |

### Rōnin (ValdaSpire24Extras, ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Grudge Battle Die (resource เพิ่มเฉพาะเป้าที่ผูกใจ) + Swordmaster (lv14, ทวนโจมตีที่พลาดได้ฟรี 1 ครั้ง/เทิร์น) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | ธีม solo-fighter (Lone Wolf) ไม่มี ally-support โดยตรง = เท่า baseline |
| **Survivability** | 8/10 (A) | Lone Wolf (กัน Advantage เมื่ออยู่คนเดียว) + Killing Stroke (lv10, reaction ตีก่อน ทำให้การโจมตีที่จะโดนพลาดถ้าคุณตีโดน) [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Killing Stroke เป็น reaction, Swordmaster ทวนฟรีไม่เสีย resource = เท่า baseline |
| **Utility** | 4/10 (C) | Deception/Intimidation expertise [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ธีม solo-duelist แคบ (ขัดกับ concept ผู้นำทีมของ Captain โดยรวม) = เท่า baseline |

### Troubadour (ValdaSpire24Extras, ยืมจาก Vagabond)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Scathing Retort (lv10, reaction psychic dmg ตอนมีคนพลาด/save สำเร็จใส่คุณ) [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature จริง (Fast Friends เป็น social charm ไม่ใช่ combat control) = เท่า baseline |
| **Support** | 10/10 (S) | Inspiring Tune (bonus action มอบ Battle Die พลิกความล้มเหลว) + Marvelous Troupe (lv14, ขยายให้เพื่อนหลายคนพร้อมกัน Cha mod คน) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Inspiring Tune เป็น bonus action = เท่า baseline |
| **Utility** | 6/10 (B) | Fast Friends (ชักชวน NPC ให้เป็นมิตร) + Pantomime (สื่อสารข้ามภาษา) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | bard-like party-buffer + social-utility hybrid [M:2/4] [R:3/3] [B:2/3] |

### Demon Banner (ValdaSpireExtras 🕰️)

> **ข้อยกเว้น baseline**: เช่นเดียวกับ Demon Brand — ข้อความระบุชัดว่า "forgo the companionship of a cohort" ทำให้ Support/Action Economy ต่ำกว่า baseline ได้ (แม้ demon เวอร์ชันนี้จะแยกสแตทบล็อกและ "ลงมือก่อนหรือหลัง turn ของคุณ" แต่ต้องแปลงร่างเข้าไปใช้ turn เดียวกัน ไม่ใช่สองร่างคู่ขนาน)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Abyssal Rebuke (reaction fire dmg ตอบโต้ตอนโดนดาเมจ) — สแตทบล็อกปีศาจตอนแปลงร่างไม่มีตัวเลขยืนยัน [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) ⚠️ | Cohort ปกติถูกแทนที่ด้วยการแปลงร่าง — ไม่มีตัวช่วยรบที่ลงมือคู่ขนานอย่างแท้จริง [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 7/10 (A) | One with the Abyss (lv17, รวม HP pool + เลือก AC สูงสุด) + Abyssal Rebuke (กันคนมาตี) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 5/10 (B) ⚠️ | ผลัดกันใช้ turn เดียวกันระหว่างร่างคุณกับปีศาจ ไม่ใช่สองตัวละครคู่ขนานเหมือน Cohort ปกติ [M:2/4] [R:2/3] [B:1/3] |
| **Utility** | 5/10 (B) | Abyssal Arcana (lv13, ใช้ Innate Spellcasting ของปีศาจได้แม้ไม่แปลงร่าง) — สเปลไม่ระบุชัดในข้อมูล [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | สลับร่างนักสู้/นักเวทย์ได้ตามสถานการณ์ [M:2/4] [R:3/3] [B:2/3] |

### Jolly Roger Banner (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Double Thrust (bonus action ตีเพิ่มด้วยอาวุธ finesse) [M:2/4] [R:3/3] [B:2/3] |
| **Control** | 4/10 (C) | Unfair Play (lv13) ให้ advantage ผลักคนตกน้ำ — control แคบเฉพาะบริบท [M:1/4] [R:2/3] [B:1/3] |
| **Support** | 10/10 (S) | All Hands on Deck (lv17) สั่งพวกพ้องทุกคนในระยะ 60ft ทำ action ผ่าน reaction ของตัวเอง — action-economy generator ระดับทั้งทีม [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Tricky Footwork (lv7, สลับตำแหน่งกับเป้าตอนตีโดน) [M:2/4] [R:2/3] [B:1/3] |
| **Action Economy** | 9/10 (S) | All Hands on Deck แจก action ฟรีให้ทั้งทีม + Double Thrust extra attack ผ่าน bonus action [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 4/10 (C) | Unfair Play ให้ Hide/Use Object เป็น bonus action (ตัวเอง+Cohort) [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | swashbuckler-repositioning + massive team-action tool [M:2/4] [R:3/3] [B:2/3] |

### Ram Banner (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Bull Rush เพิ่ม die เข้าดาเมจตอน shove [M:2/4] [R:3/3] [B:1/3] |
| **Control** | 6/10 (B) | Bull Rush (prone/push) + And Stay Down (lv17, opportunity attack ตอนลุกจาก prone) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | Lock Horns (lv13) ให้ ally ได้ reaction attack ฟรีทุกครั้งที่คุณ shove ศัตรูเข้าใส่พวกเขา [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 4/10 (C) | ไม่มี feature ป้องกันตัวเอง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Bull Rush เป็น bonus action, Lock Horns/And Stay Down ฟรีไม่เสีย action = เท่า baseline |
| **Utility** | 4/10 (C) | Surefooted (lv7, ไม่เสีย movement จาก difficult terrain) [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ธีม shove/prone-lock แคบ = เท่า baseline |

### Raven Banner (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Flanking Strike (die+ครึ่งเลเวลตอน flank) + Guerilla Warfare (lv17, 2 Battle Dice ฟรีบน hit แรกของไฟต์) [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ (Effortless Dodge เป็น defense) = เท่า baseline |
| **Support** | 9/10 (S) | Flanking Strike ต้องมี ally อยู่ใกล้แต่ผลตกกับตัวเอง ไม่ใช่ ally-support โดยตรง = เท่า baseline |
| **Survivability** | 6/10 (B) | Effortless Dodge (bonus action Dodge ฟรี ต้องใส่เกราะเบา/ไม่ใส่) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Strike First Strike Last (lv13, reaction ตีก่อน) + Effortless Dodge (bonus action defense) [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 5/10 (B) | Covert (lv7, ซ่อนใหม่หลังถูกจับได้) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ambush/skirmisher rogue-hybrid = เท่า baseline |

### Siegeball Banner (ValdaSpireExtras 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจโดยตรง = เท่า baseline |
| **Control** | 6/10 (B) | Incisive Taunt (lv13, bonus action disadvantage debuff บนศัตรู) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 10/10 (S) | Team Player ฟื้นทุก 1 นาที (**ไม่ใช่ต้อง short/long rest**) ทำให้เป็นการมอบ Battle Die ที่สแปมได้บ่อยมาก [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Game-Winning Play (lv17, ยืดความตายที่ 0 HP พร้อมขยับ+action) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Game-Winning Play ให้ turn เต็มแม้กำลังจะตาย + Team Player เป็น bonus action ที่รีเซ็ตไว [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Athletics expertise-like bonus + sports trivia [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | support+taunt+emergency-survival ผสมกัน = เท่า baseline |

### Treant Banner (ValdaSpireExtras 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Thornfoot (lv17) ทิ้งหนามแบบ Spike Growth ไว้ตามทาง (ตัวเอง/Cohort) [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Blocked Passage (bonus action สร้างพื้นที่ impassable/difficult terrain ได้จริง) — battlefield control ที่ไม่มี Captain subclass ตัวไหนทำได้ [M:2/4] [R:3/3] [B:2/3] |
| **Support** | 10/10 (S) | Superior Positioning (lv13) ให้ ally ในระยะ 15ft ได้ advantage ใส่ศัตรูที่ยืนใน difficult terrain [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Druidbane (lv7, immune terrain-altering spell เช่น Spike Growth/Plant Growth ตัวเอง+Cohort) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Blocked Passage เป็น bonus action, Thornfoot ทำงานฟรี = เท่า baseline |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 7/10 (A) | เปลี่ยนภูมิประเทศได้จริง — เครื่องมือ unique ที่ไม่มี subclass อื่นเทียบได้ [M:2/4] [R:3/3] [B:2/3] |

### Turtle Banner (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี feature เพิ่มดาเมจ = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Iron Shell (bonus action เพิ่ม AC ให้ ally) + Shield Wall (lv13, half cover ให้เพื่อนข้างตัว) [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Slow and Steady (lv7, immune forced-movement/prone/speed-0 — กัน battlefield control ได้เกือบสมบูรณ์) + Unbreakable (lv17, armor-point pool 20 แต้มกัน melee) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Iron Shell เป็น bonus action, Unbreakable เป็น free reaction pool = เท่า baseline |
| **Utility** | 3/10 (C) | ไม่มี utility นอกคอมแบต = เท่า baseline |
| **Versatility** | 6/10 (B) | dedicated tank/protector ธีมเดียว = เท่า baseline |
