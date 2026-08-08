# Fighter — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 21 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Fighter](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 21 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-fighter.json` — source `XPHB` (Player's Handbook 2024)

---

## Class Baseline (Fighter, 2024)

Floor 0-10 ต่อ axis ของ **Fighter เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting, saving throw proficiency Str + Con, armor proficiency light/medium/heavy/shield ครบทุกชนิดตั้งแต่ lv1, weapon proficiency simple+martial, Fighting Style (feat เลือกได้ สลับได้ทุกเลเวลที่ขึ้น), Second Wind (2→4 ใช้/วัน ฮีล 1d10+level), Weapon Mastery (3 ชนิด lv1 → 6 ชนิด lv16), Action Surge (extra action เต็มๆ 1 ครั้ง/short rest → 2 ครั้งที่ lv17), Tactical Mind, Extra Attack (lv5, 2 ครั้ง) → Two Extra Attacks (lv11, 3 ครั้ง) → Three Extra Attacks (lv20, 4 ครั้ง), Indomitable (lv9, reroll failed save 1→3 ครั้ง/long rest), Tactical Master (lv9), Studied Attacks (lv13)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | จำนวนครั้งโจมตี/เทิร์นสูงสุดในเกม (2 ครั้งที่ lv5 → 3 ที่ lv11 → 4 ที่ lv20) เป็น passive ไม่กิน resource เลยแม้แต่น้อย บวก Weapon Mastery ที่ปลดล็อกอาวุธได้มากที่สุดในเกม (3→6 ชนิด) ให้ property เสริมดาเมจ (เช่น Vex, Cleave) ติดทุกการตี และ Action Surge ให้โจมตีซ้ำเป็น action เต็มๆ อีกรอบ 1 ครั้ง/short rest (2 ครั้งที่ lv17) เป็น nova ที่แรงที่สุดในเกม [M:4/4] [R:3/3] [B:1/3] |
| **Control** | 3/10 (C) | Tactical Master (lv9) ให้เปลี่ยน mastery property ของอาวุธที่ตีเป็น Push (ผลักเป้า)/Sap (disadvantage โจมตีครั้งถัดไป)/Slow (ลด speed) ได้ต่อการตี 1 ครั้ง เป็น soft-CC เดี่ยวๆ ที่ผูกกับ weapon mastery ของ lv9+ เท่านั้น ไม่มี hard-CC เลย [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว — Second Wind ฮีลได้แค่ตัวเอง |
| **Survivability** | 8/10 (A) | HD d10 (สูงเป็นอันดับ 2 รองจาก Barbarian) + armor proficiency ครบทุกชนิดรวม heavy+shield ตั้งแต่ lv1 (AC สูงสุดในบรรดา class ที่ไม่พึ่ง spell) บวก Second Wind (bonus action ฮีล 1d10+level, 2→4 ครั้ง/วัน ฟื้น 1/short rest) และ Indomitable (lv9, reroll failed saving throw 1→3 ครั้ง/long rest ด้วยโบนัสเท่า Fighter level) เป็น safety net กันทั้ง HP loss และ failed save [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Action Surge ให้ **action เต็มๆ อีกรอบ** (ไม่ใช่แค่ bonus action) 1 ครั้ง/short rest (2 ครั้งที่ lv17) เป็นฟีเจอร์ action-economy ที่แรงที่สุดในเกม เทียบเท่าเพิ่ม turn ให้ตัวเองกลางไฟต์ บวก Second Wind ที่เป็น bonus action ฟรี และ Tactical Shift (lv5) ให้เดินครึ่ง speed แถมมากับ bonus action ของ Second Wind โดยไม่เสีย action เพิ่ม [M:4/4] [R:2/3] [B:2/3] |
| **Utility** | 0/10 (D) | ไม่มี utility feature ติด class baseline เลยสักอย่าง — ไม่มี expertise, ไม่มี free skill proficiency พิเศษ, ไม่มี ritual casting, Fighting Style feat (lv1) ก็เป็นตัวเลือกสาย combat ล้วนๆ ไม่มีผลนอกคอมแบต |
| **Versatility** | 4/10 (C) | Fighting Style สลับได้ทุกครั้งที่ Fighter level ขึ้น (ถี่กว่า class อื่นที่ส่วนใหญ่ล็อกจนกว่าจะ long rest) บวก Weapon Mastery สลับชนิดอาวุธได้ทุก Long Rest และ Tactical Master ให้เปลี่ยน mastery property ต่อการตี — ยืดหยุ่นระดับ "จูนสไตล์นักดาบ" แต่ยังคงเป็น weapon-based martial archetype เดียวตายตัว ไม่มีทางปรับไป role เวทย์/support จากตัว chassis เลย [M:1/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (21)

**Class Baseline อ้างอิง**: Damage 8, Control 3, Support 0, Survivability 8, Action Economy 8, Utility 0, Versatility 4

ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) หมายเหตุพิเศษ: **Banneret (2024, FRHoF)** และ **Purple Dragon Knight (Banneret) (2014, SCAG)** เป็น subclass เดียวกันตามสายข้อมูล (`reprintedAs`) แต่ progress tracker แยกให้คะแนน 2 รายการเพราะกลไกเวอร์ชัน 2014 อ่อนกว่า 2024 อย่างมีนัยสำคัญ (ไม่มี ritual spell, ไม่มี advantage bonus, Bulwark จำกัดแค่ 3 saving throw) — คะแนนจึงต่างกันแม้ธีมเดียวกัน มี 3 subclass ที่ไฟล์ข้อมูลไม่ระบุรายละเอียดตัวเลือกย่อยครบ (Arcane Shot ของ Arcane Archer, Martial Maneuvers ของ Blade Breaker, Rune effects ของ Rune Knight, Compound options ของ Living Crucible) จึงให้คะแนนแบบระมัดระวังในแกนที่ไม่ยืนยันได้ พร้อมหมายเหตุกำกับ

| Subclass | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Arcane Archer | XGE 🕰️ | 8 (A) | 3 (C) | 0 (D) | 8 (A) | 9 (S) | 3 (C) | 6 (B) |
| Banneret | FRHoF | 8 (A) | 3 (C) | 9 (S) | 8 (A) | 10 (S) | 4 (C) | 7 (A) |
| Battle Master | XPHB | 9 (S) | 7 (A) | 6 (B) | 9 (S) | 9 (S) | 2 (C) | 9 (S) |
| Blade Breaker | GrimHollowPlayerPack 🕰️ | 9 (S) | 6 (B) | 0 (D) | 9 (S) | 9 (S) | 0 (D) | 8 (A) |
| Bone Knight | VSS 🕰️ | 9 (S) | 3 (C) | 0 (D) | 10 (S) | 9 (S) | 3 (C) | 6 (B) |
| Brawler | VSS 🕰️ | 9 (S) | 6 (B) | 0 (D) | 9 (S) | 8 (A) | 2 (C) | 6 (B) |
| Bulwark Warrior | GrimHollowPG24 | 9 (S) | 7 (A) | 6 (B) | 10 (S) | 8 (A) | 0 (D) | 7 (A) |
| Cavalier | XGE 🕰️ | 9 (S) | 8 (A) | 6 (B) | 9 (S) | 10 (S) | 2 (C) | 7 (A) |
| Celestial Lancer | VSS 🕰️ | 9 (S) | 6 (B) | 5 (B) | 8 (A) | 8 (A) | 5 (B) | 7 (A) |
| Champion | XPHB | 9 (S) | 3 (C) | 0 (D) | 9 (S) | 8 (A) | 0 (D) | 5 (B) |
| Corsair | VSS 🕰️ | 9 (S) | 5 (B) | 0 (D) | 9 (S) | 9 (S) | 3 (C) | 7 (A) |
| Dungeoneer | VSS 🕰️ | 9 (S) | 3 (C) | 0 (D) | 10 (S) | 8 (A) | 5 (B) | 6 (B) |
| Echo Knight | EGW 🕰️ | 10 (S) | 3 (C) | 5 (B) | 9 (S) | 9 (S) | 5 (B) | 8 (A) |
| Eldritch Knight | XPHB | 9 (S) | 7 (A) | 0 (D) | 8 (A) | 9 (S) | 6 (B) | 9 (S) |
| Living Crucible | GrimHollowPG24 | 8 (A) | 3 (C) | 0 (D) | 9 (S) | 9 (S) | 5 (B) | 7 (A) |
| Mage Hand Magus | VSS 🕰️ | 9 (S) | 7 (A) | 0 (D) | 8 (A) | 9 (S) | 8 (A) | 8 (A) |
| Nightwatcher | GrimHollowPG24 | 9 (S) | 6 (B) | 5 (B) | 9 (S) | 9 (S) | 6 (B) | 7 (A) |
| Psi Warrior | XPHB | 9 (S) | 6 (B) | 6 (B) | 10 (S) | 9 (S) | 6 (B) | 9 (S) |
| Purple Dragon Knight (Banneret) | SCAG 🕰️ | 8 (A) | 3 (C) | 8 (A) | 8 (A) | 9 (S) | 2 (C) | 6 (B) |
| Rune Knight | TCE 🕰️ | 9 (S) | 6 (B) | 6 (B) | 9 (S) | 8 (A) | 4 (C) | 7 (A) |
| Samurai | XGE 🕰️ | 9 (S) | 3 (C) | 0 (D) | 9 (S) | 9 (S) | 2 (C) | 5 (B) |

---

### Arcane Archer (XGE 🕰️)

> **หมายเหตุข้อมูล**: รายการ "Arcane Shot Options" เต็มรูปแบบไม่ปรากฏในไฟล์ข้อมูล (มีแค่หัวข้อ) จึงให้คะแนน Damage/Control แบบระมัดระวังจากกลไกที่ยืนยันได้เท่านั้น (Curving Shot, Magic Arrow, Ever-Ready Shot)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Arcane Shot ยืนยันได้ว่าเพิ่มดาเมจ/เอฟเฟกต์พิเศษต่อลูกธนู (2 ครั้ง/rest) แต่รายการตัวเลือกเต็มไม่ปรากฏในข้อมูล จึงให้คะแนนแบบระมัดระวัง = เท่า baseline |
| **Control** | 3/10 (C) | ไม่สามารถยืนยันตัวเลือก control-based ได้จากข้อมูลที่มี = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 8/10 (A) | ไม่มี feature ป้องกันตัวเองที่ยืนยันได้ = เท่า baseline |
| **Action Economy** | 9/10 (S) | Curving Shot (bonus action reroll ลูกธนูที่พลาดใส่เป้าใหม่ในระยะ 60ft) เปลี่ยนการพลาดให้กลายเป็นโอกาสสองได้โดยไม่เสีย resource หลัก [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | Arcana/Nature proficiency + cantrip (prestidigitation/druidcraft) เป็น utility ที่ baseline ไม่มีเลย [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 6/10 (B) | แม้ไม่ทราบรายการเต็ม แต่ระบบ Arcane Shot ที่เลือกตัวเลือกได้เพิ่มเรื่อยๆ (จนถึง lv18) บ่งชี้ toolkit ที่กว้างกว่า baseline [M:2/4] [R:2/3] [B:2/3] |

### Banneret (FRHoF)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม support/leader ล้วน) = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Group Recovery (Second Wind → ฮีล ally สูงสุด Cha mod ตัว) + Team Tactics (lv7, ally ที่ฮีลได้ Advantage เพิ่ม) + Rallying Surge (Action Surge → ally ได้ reaction attack/move ฟรี) + Shared Resilience (lv15, expend Indomitable ให้ ally reroll save) — ทุกอย่างพ่วงมากับ resource เดิม (Second Wind/Action Surge/Indomitable) ไม่เสีย resource เพิ่มเลย [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 8/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ (ทุกอย่างมุ่งช่วย ally) = เท่า baseline |
| **Action Economy** | 10/10 (S) | Rallying Surge ให้ ally สูงสุด Cha mod ตัวได้ **reaction ฟรี** (ตี/เคลื่อนที่) ทุกครั้งที่ใช้ Action Surge — economy multiplier ระดับทีมที่แรงที่สุดในบรรดา Fighter subclass ที่ทำมา [M:4/4] [R:3/3] [B:3/3] |
| **Utility** | 4/10 (C) | Knightly Envoy (ritual Comprehend Languages + ภาษาเพิ่ม + skill proficiency) เป็น utility ที่ baseline ไม่มีเลย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | เปิด role "ผู้นำทัพ/support" เต็มรูปแบบบนโครง striker เดิม [M:2/4] [R:2/3] [B:3/3] |

### Battle Master (XPHB)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Maneuver อย่าง Precision Attack/Trip Attack เพิ่ม Superiority Die (d8→d12) เข้าดาเมจ/เอฟเฟกต์ทุกการตีที่เลือกใช้ ยืดหยุ่นเลือกได้จากคลัง maneuver ที่รู้ [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Trip Attack (ล้ม Prone)/Menacing Attack (Frightened)/Disarming Attack ให้เลือกใช้ได้ต่อการตี — control ที่ยืดหยุ่นกว่า Tactical Master ของ baseline มาก [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | Commander's Strike (สละการตีให้ ally โจมตีแทนด้วย reaction) + Rally (แจก temp HP ให้ ally) — support ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Riposte (reaction ตีสวนเมื่อศัตรูพลาด) และ Parry (ลดดาเมจที่โดนด้วย Superiority Die) เป็น mitigation ที่ baseline ไม่มี [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Maneuver ส่วนใหญ่พ่วงกับการตีที่ทำอยู่แล้วไม่เสีย action เพิ่ม บวก Riposte เป็น reaction แถมฟรี [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 2/10 (C) | Student of War (artisan's tools + skill proficiency) เป็น utility เล็กน้อยจาก 0 [M:1/4] [R:1/3] [B:0/3] |
| **Versatility** | 9/10 (S) | เลือก maneuver ได้จากคลังใหญ่ (สูงสุด 9 ตัวที่ lv15) ครอบคลุมดาเมจ/control/support/defense พร้อมกัน — "มีดพกสวิส" ของ Fighter ทั้งหมด [M:3/4] [R:3/3] [B:3/3] |

### Blade Breaker (GrimHollowPlayerPack 🕰️)

> **หมายเหตุข้อมูล**: รายการ "Blade Breaker Maneuvers" เต็มรูปแบบไม่ปรากฏในไฟล์ข้อมูล (มีแค่หัวข้อ) จึงให้คะแนนแบบระมัดระวังจากกลไกที่ยืนยันได้เท่านั้น (4 stance + feature เสริม)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Iron Punisher stance (Advantage การโจมตีประชิดถาวรระหว่างฤทธิ์ แลกกับศัตรูก็ Advantage ใส่เราด้วย) + Blooded Clarity (lv18, บวก d10 เข้าการโจมตี/save แรกทุกเทิร์นตอน Bloodied) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Adamantine Bull stance (reaction ผลักศัตรูที่ตีเราออกไป 5-10ft) เป็น forced-movement ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 9/10 (S) | Unyielding Determination (Advantage บนทุก saving throw ระหว่างเทิร์นตัวเอง) + Weightless Mithral stance (Advantage Dex save + Dodge ฟรีที่ lv18) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Maneuver พ่วงกับการตีปกติไม่เสีย action เพิ่ม บวกสลับ stance ได้ด้วย bonus action [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 0/10 (D) | ไม่มี utility นอกคอมแบตที่ยืนยันได้ = เท่า baseline |
| **Versatility** | 8/10 (A) | 4 stance (tank-ผลัก/glass-cannon/reach/หลบหลีก) ให้ปรับสไตล์การสู้ได้ตามสถานการณ์ บวกคลัง maneuver แยกต่างหาก [M:2/4] [R:3/3] [B:3/3] |

### Bone Knight (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Bone Blades ให้แลก Hit Die เพิ่มดาเมจอาวุธที่ตีโดนได้ (ตั้งแต่ lv7) และเป็นอาวุธที่แยกออกจากตัวไม่ได้เลย [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Adamant Ivory ให้ AC ไม่สวมเกราะสูงถึง 17→20 (สูงกว่าเกราะ+โล่ปกติ) บวก reaction ลดดาเมจ B/P/S ด้วย Hit Die บวก Master Osteoth (lv18, ฟื้น Hit Die ตอน initiative + แลก Hit Die เป็น Second Wind/Action Surge use) [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Master Osteoth แลก Hit Die เป็น Second Wind/Action Surge use เพิ่มได้โดยไม่เสีย action — resource multiplier ให้ฟีเจอร์ economy หลักของคลาส [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | Restructure (เปลี่ยนรูปร่าง/ขนาดโครงกระดูก Medium↔Small) เป็น disguise utility ที่ baseline ไม่มี [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ระบบแปลง Hit Die เป็น AC/ดาเมจ/Second Wind/Action Surge ให้ยืดหยุ่นเลือกใช้ resource เดียวกันได้หลายทาง [M:2/4] [R:2/3] [B:2/3] |

### Brawler (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Brute Force (bonus action extra dmg 1d6→1d12 ทุกครั้งที่ตีด้วยหมัด) + Haymaker (lv10, สละการตีที่เหลือแลกดาเมจก้อนใหญ่) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Brute Force เลือก grapple แทนดาเมจได้ + Owlbear Wrestler (lv15, grapple ได้ทุกขนาดรวม Gargantuan) — ผู้เชี่ยวชาญ grapple-control [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Skullbreaker (lv18, resistance ดาเมจจากเป้าที่เพิ่งตีโดนจนถึงต้นเทิร์นถัดไป) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Brute Force เป็น bonus action ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 2/10 (C) | Imposing Physique (carry capacity 2 เท่า + Str-based Intimidation) เป็น utility เล็กน้อยจาก 0 [M:1/4] [R:1/3] [B:0/3] |
| **Versatility** | 6/10 (B) | ผู้เชี่ยวชาญ unarmed/grapple เฉพาะทาง (ดาเมจ+control ผ่านหมัดเปล่า) [M:2/4] [R:2/3] [B:2/3] |

### Bulwark Warrior (GrimHollowPG24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Aggressive Defense (แลก temp HP เป็นดาเมจเพิ่มทุกครั้งที่ตีโดน) + Threatening Presence (lv7, AoE 5d6 psychic) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Protective Taunt (Disadvantage ศัตรูโจมตีคนอื่นทุกครั้งที่ตีโดน) + Threatening Presence (AoE taunt) — taunt-control ที่ครบเครื่อง [M:2/4] [R:3/3] [B:2/3] |
| **Support** | 6/10 (B) | Halt the Assault (lv18, reaction เปลี่ยนเป้าการโจมตีที่จะโดน ally มาโดนตัวเองแทน + resistance) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 10/10 (S) | Weather the Storm (bonus action, temp HP ทุกจบเทิร์นนาน 1 นาที) + Improved Second Wind (lv15, temp HP เพิ่มจาก Second Wind) + Halt the Assault (resistance เมื่อรับแทน ally) — ชุด tank ที่หนาแน่นที่สุดในบรรดา Fighter subclass [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Weather the Storm เป็น bonus action ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 0/10 (D) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | เปิด role "แทงค์/protector" เต็มรูปแบบที่ต่างจาก striker ทั่วไปของคลาส [M:2/4] [R:2/3] [B:3/3] |

### Cavalier (XGE 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Unwavering Mark ให้ bonus action ตีสวนแบบ Advantage + ดาเมจเสริมเท่าครึ่ง Fighter level เมื่อเป้าที่มาร์กไว้ทำร้ายคนอื่น [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Unwavering Mark (Disadvantage โจมตีคนอื่นในระยะ 5ft) + Hold the Line (lv10, ลด speed เป้าเป็น 0 เมื่อโดน OA) — lockdown-tank เต็มรูปแบบ [M:2/4] [R:3/3] [B:3/3] |
| **Support** | 6/10 (B) | Warding Maneuver (reaction, บวก Armor Class ให้ ally/ม้าที่โดนโจมตี + resistance ถ้ายังโดน) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Warding Maneuver ใช้ป้องกันตัวเองได้เช่นกัน [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 10/10 (S) | Vigilant Defender (lv18) ให้ reaction พิเศษสำหรับทำ opportunity attack ได้ **1 ครั้งต่อเทิร์นของศัตรูแต่ละตัว** (แยกจาก reaction ปกติ) — economy multiplier ที่มหาศาลเมื่อเจอศัตรูหลายตัว [M:4/4] [R:3/3] [B:3/3] |
| **Utility** | 2/10 (C) | Bonus Proficiency (skill/ภาษา) เป็น utility เล็กน้อยจาก 0 [M:1/4] [R:1/3] [B:0/3] |
| **Versatility** | 7/10 (A) | เปิด role "lockdown-tank" เต็มรูปแบบ (ดาเมจ+control+protect) [M:2/4] [R:2/3] [B:3/3] |

### Celestial Lancer (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Plunging Attack (ดาเมจเสริมสูงสุด 5d6 เมื่อตีขณะตกจากที่สูง) + Earthshaker (lv10, AoE เมื่อลงพื้นจากที่สูง 20ft+ บวก fire dmg ที่ lv18) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Earthshaker บังคับ Dex save หรือ Prone เป็นวงกว้าง [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 5/10 (B) | Celestial Aura (lv15, Second Wind → แจก temp HP ให้ ally ใกล้ตัวด้วย) [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 8/10 (A) | Meteor Jump ลดฟอลดาเมจและไม่โดน OA ตอนกระโดด แต่ไม่ใช่ mitigation โดยตรงต่อดาเมจจากศัตรู = เท่า baseline |
| **Action Economy** | 8/10 (A) | Earthshaker เป็น bonus action ที่ต้องอาศัยการตกจากที่สูงก่อน (มีเงื่อนไข) = เท่า baseline |
| **Utility** | 5/10 (B) | Meteor Jump ให้กระโดดสูงได้ถึง 40ft เป็น traversal utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ธีม vertical-combat เฉพาะทาง ผสมดาเมจ/control/support ผ่านกลไกการกระโดด-ตก [M:2/4] [R:2/3] [B:3/3] |

### Champion (XPHB)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Improved/Superior Critical (โดน crit ที่ 19-20 → 18-20 ที่ lv15) ขยายช่วงคริติคอลซึ่งทวีคูณกับจำนวนการโจมตีที่สูงอยู่แล้วของ baseline [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Survivor (lv18, Advantage death save + ทอย 18-20 นับเป็น nat20 + ฟื้น HP ทุกเทิร์นตอน Bloodied) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจน (Remarkable Athlete แค่เดินฟรีหลัง crit) = เท่า baseline |
| **Utility** | 0/10 (D) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 5/10 (B) | Additional Fighting Style (lv7) เพิ่มตัวเลือก passive อีกหนึ่ง แต่ยังคงเป็น "striker เรียบง่ายที่สุด" ของคลาส [M:1/4] [R:2/3] [B:2/3] |

### Corsair (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Surprise Attack (ดาเมจเสริม 1d6→4d6 แบบ sneak-attack เมื่อมี Advantage หรือมีศัตรูอื่นประกบเป้า ใช้กับ finesse/ranged) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | Untouchable Swordsman (lv18, เป้าที่โดน Surprise Attack ได้ Disadvantage โจมตีเรา) [M:1/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Slippery Positioning (lv15, ขยับ 5ft ฟรีไม่โดน OA เท่า Dex mod ครั้ง/รอบ) + Charmed Life (Advantage 1 ครั้ง/rest บน check/attack/save Dex-Cha) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Three Sheets (lv7, Second Wind → Dash/Disengage ฟรีในการ bonus action เดียวกัน) + Slippery Positioning ไม่เสีย reaction/action [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 3/10 (C) | Commandeer (ขโมยไอเทมแทนการโจมตี) + Sleight of Hand proficiency เป็น utility ที่ baseline ไม่มี [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Hybrid skirmisher-rogue (sneak damage+mobility+ขโมยของ) เปิด role ต่างจาก striker ปกติ [M:2/4] [R:2/3] [B:3/3] |

### Dungeoneer (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Kick In The Door (Advantage ทุกการโจมตีในรอบแรกถ้าเปิดฉากรุก) + Monster Kill (lv10, extra damage die ใส่ 5 ประเภทสัตว์, 3/rest) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Danger Sense (Advantage Dex save ต้าน trap/spell ที่เห็น) + Lethality Prevention (lv15, cap ดาเมจก้อนเดียวที่ 50) + Avoidance (lv18, evasion เต็มรูปแบบ) — mitigation ต่อดาเมจก้อนใหญ่ที่หนาแน่นที่สุด [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 5/10 (B) | Dungeoneer's Intuition (Advantage ตรวจจับ shapechanger/trap/magic effect) เป็น exploration utility ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | ผู้เชี่ยวชาญ dungeon-delving (เปิดฉากรุก+ตรวจจับ+รอดดาเมจก้อนใหญ่) [M:2/4] [R:2/3] [B:2/3] |

### Echo Knight (EGW 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Unleash Incarnation ให้ตีเพิ่มอีกครั้งจากตำแหน่ง echo ทุกครั้งที่ใช้ Attack action (Con mod ครั้ง/rest) บวก Legion of One (lv18) มี echo 2 ตัวพร้อมกัน — เพิ่มจำนวนการโจมตี/เทิร์นเกินเพดานปกติของคลาส [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) | Shadow Martyr (lv10, reaction เปลี่ยนเป้าการโจมตีที่จะโดน ally ให้ไปโดน echo แทน) [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 9/10 (S) | Reclaim Potential (lv15, temp HP เมื่อ echo ถูกทำลาย, Con mod ครั้ง/rest) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | ตีจากตำแหน่ง echo/สลับที่ผ่าน bonus action + OA จากตำแหน่ง echo ได้ด้วย — ขยาย positioning options โดยไม่เสีย action เพิ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 5/10 (B) | Echo Avatar (lv7, มองผ่านตา echo ได้ไกลถึง 1,000ft นาน 10 นาที) เป็น scouting utility ที่แรงมาก [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 8/10 (A) | กลไก "ร่างที่สอง" เปิด role สอดแนม/จัดตำแหน่ง/ป้องกัน ally ที่ Fighter ปกติทำไม่ได้ [M:2/4] [R:2/3] [B:3/3] |

### Eldritch Knight (XPHB)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | เข้าถึง spell list ของ Wizard (รวม blast spell) บวก War Magic (lv7, แทนที่การโจมตีด้วย cantrip) — ช่องทางดาเมจเสริมที่ baseline ไม่มี [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | เข้าถึง control spell ของ Wizard (Web, Hold Person ฯลฯ) บวก Eldritch Strike (lv10, Disadvantage บน save ต้าน spell ตัวเองหลังตีโดน) เสริมให้ control spell ติดง่ายขึ้น [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมติด chassis โดยตรง (ขึ้นกับ spell ที่เลือกเอง) = เท่า baseline |
| **Survivability** | 8/10 (A) | ไม่มี defense feature ติด chassis โดยตรง (ขึ้นกับ spell ที่เลือกเอง เช่น Shield/Mage Armor) = เท่า baseline |
| **Action Economy** | 9/10 (S) | War Magic/Improved War Magic (แทนที่ 1-2 การโจมตีด้วย spell โดยไม่เสีย action เพิ่ม) + Arcane Charge (lv15, Action Surge → teleport ฟรี) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | เข้าถึง cantrip/spell ของ Wizard เต็มชุด (Detect Magic, Comprehend Languages, Knock ฯลฯ) เป็น utility ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 9/10 (S) | เข้าถึง spell list ของ Wizard ทั้งเล่ม (ดาเมจ/control/utility) ผสมกับ martial baseline — hybrid gish เต็มรูปแบบ [M:3/4] [R:3/3] [B:3/3] |

### Living Crucible (GrimHollowPG24)

> **หมายเหตุข้อมูล**: รายการ "Compound Options" เต็มรูปแบบไม่ปรากฏในไฟล์ข้อมูล จึงให้คะแนน Damage/Control แบบระมัดระวัง

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ไม่สามารถยืนยันตัวเลือก damage-boosting compound ได้จากข้อมูลที่มี = เท่า baseline |
| **Control** | 3/10 (C) | ไม่สามารถยืนยันตัวเลือก control-based compound ได้ = เท่า baseline |
| **Support** | 0/10 (D) | "Only you can benefit from your compounds" — ระบุชัดว่าเป็น self-only ไม่มี ally-support = เท่า baseline |
| **Survivability** | 9/10 (S) | Toxin Transmutation (lv15, resistance พิษ + ล้าง Poisoned + temp HP) และธีม compound ที่ระบุว่า "inure to magical attacks" บ่งชี้ resistance-based buff อื่นเพิ่มเติม [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Rapid Consumption (lv10, ดื่ม compound 2 ขวดในการ bonus action เดียว) — เพิ่มประสิทธิภาพ resource สำคัญของ subclass [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 5/10 (B) | Alchemist's Supplies proficiency (double prof) + ธีม compound ที่ระบุ "see in darkness" บ่งชี้ utility buff (เช่น darkvision) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ระบบเลือก compound ได้ 3+ ตัวจาก pool และสลับได้ทุก Long Rest ให้ปรับ build ตามสถานการณ์แม้ไม่ทราบรายการเต็ม [M:2/4] [R:2/3] [B:3/3] |

### Mage Hand Magus (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Warhand (lv10, ความสามารถระดับ Bigby's Hand เช่น Clenched Fist ที่ดาเมจแรงมาก) + โจมตีจากระยะไกลผ่านมือได้ (Combat Hands) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Warhand มีความสามารถแบบ Grasping Hand (restrain)/Forceful Hand (ผลัก) — control tool ระดับสูงที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | ไม่มี defense feature โดยตรง (มือเน้นโจมตี/utility) = เท่า baseline |
| **Action Economy** | 9/10 (S) | Warhand ใช้ action หลักได้พร้อมกับตีด้วยมืออีกข้างเป็น bonus action ในเทิร์นเดียว [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Mage Hand ยกของหนักได้ (5×level ปอนด์) + ทำ ability check ระยะไกลได้ทุกแบบ + Handglide (lv15, บินได้) — utility นอกคอมแบตที่กว้างมาก [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/control/utility ผ่านกลไก "แขนเสริม" ที่ยืดหยุ่นมาก [M:2/4] [R:2/3] [B:3/3] |

### Nightwatcher (GrimHollowPG24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Beat Down (lv18, พลาดใส่เป้าที่ Size Up ไว้ → โจมตีฟรีเพิ่มแบบ Advantage) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Size Up (bonus action, reaction กด Disadvantage + Resistance บนการโจมตีของเป้าที่เลือกใส่ตัวเอง/ally ใกล้ตัว) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 5/10 (B) | Size Up ป้องกัน ally ที่อยู่ใกล้ได้ด้วย + Warning Shout (แจก Advantage initiative + เคลื่อนที่ฟรีให้ทีม) [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 9/10 (S) | Night Stalker (lv10, OA ต่อต้านตัวเองมี Disadvantage + ไม่โดน OA ในที่มืด) + Size Up (resistance เมื่อเป้าที่มาร์กตีตัวเอง) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Ready for Action (lv15, ทอย initiative 18-20 ได้ action เพิ่มฟรีในเทิร์นแรก) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Darkvision + Advantage Perception + Expertise + skill proficiency 2 ตัว — ชุด utility สอดแนมที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Hybrid scout/ambusher/protector ที่เน้นความมืดและ initiative [M:2/4] [R:2/3] [B:3/3] |

### Psi Warrior (XPHB)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Psionic Strike (extra force dmg ทุกครั้งที่ตีโดน โดยใช้ Psionic Energy Die pool ที่ใหญ่มาก สูงสุด 12d12) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Telekinetic Thrust (lv7, บังคับ Str save หรือ Prone/ผลัก 10ft เมื่อโดน Psionic Strike) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | Protective Field (reaction ลดดาเมจให้ตัวเองหรือ ally ในระยะ 30ft) + Bulwark of Force (lv15, half cover ให้หลายเป้ารวม ally) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 10/10 (S) | Protective Field ใช้กับตัวเองได้ + Guarded Mind (lv10, resistance psychic + ล้าง charmed/frightened) + Bulwark of Force (half cover ให้ตัวเองด้วย) — mitigation หลายชั้นจาก resource pool ขนาดใหญ่ [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Psi-Powered Leap (bonus action บิน 2×speed) + Telekinetic Master (lv18, ตีฟรีเป็น bonus action ระหว่าง concentrate Telekinesis ฟรี) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 6/10 (B) | Telekinetic Movement (ย้ายวัตถุ/ผู้เต็มใจ 30ft) + Telekinetic Master (แคส Telekinesis ฟรี) เป็น utility ที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 9/10 (S) | ดาเมจ+control+support+defense+utility ทั้งหมดมาจาก resource pool เดียว (Psionic Energy Dice) — หนึ่งใน Fighter subclass ที่ครบเครื่องที่สุด [M:3/4] [R:3/3] [B:3/3] |

### Purple Dragon Knight (Banneret) (SCAG 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Rallying Cry (Second Wind → ฮีล ally สูงสุด 3 ตัวเท่า fighter level) + Inspiring Surge (lv10, Action Surge → ally 1 ตัวได้ reaction attack ฟรี, 2 ตัวที่ lv18) + Bulwark (lv15, ขยาย Indomitable reroll ให้ ally แต่จำกัดแค่ Int/Wis/Cha save) — เวอร์ชัน 2014 ที่เบากว่า Banneret เล็กน้อย (จำนวน ally คงที่ ไม่มี advantage bonus, Bulwark แคบกว่า) [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 8/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 9/10 (S) | Inspiring Surge ให้ ally ได้ reaction attack ฟรีทุกครั้งที่ใช้ Action Surge [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 2/10 (C) | Royal Envoy (double proficiency bonus บน Persuasion) เป็น utility เล็กน้อยจาก 0 [M:1/4] [R:1/3] [B:0/3] |
| **Versatility** | 6/10 (B) | ธีมผู้นำทัพเดียวกับ Banneret แต่ toolkit แคบกว่า [M:2/4] [R:2/3] [B:2/3] |

### Rune Knight (TCE 🕰️)

> **หมายเหตุข้อมูล**: รายละเอียด Rune เฉพาะตัว (Cloud/Fire/Frost/Hill/Stone/Storm) ไม่ปรากฏครบในไฟล์ข้อมูล (มีแค่ Hill/Storm ระบุชื่อหัวข้อ) จึงให้คะแนนแบบระมัดระวังโดยอิงจากกลไก Giant's Might ที่ยืนยันได้เป็นหลัก

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Giant's Might (bonus action, 1 นาที) เพิ่มดาเมจ 1d6→1d10 ทุกเทิร์น + ขยายร่างเป็น Large/Huge (Runic Juggernaut lv18) เพิ่ม reach [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Rune ที่ทราบธีม (เช่น Frost=ลด speed, Storm=ผลัก) บ่งชี้ control option แม้ไม่ทราบรายละเอียดเต็ม [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | Runic Shield (lv7, reaction บังคับผู้โจมตี ally ให้ทอย d20 ใหม่) เป็น protection tool ที่ยืนยันได้ [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 9/10 (S) | Giant's Might ให้ Advantage Str save + ขนาดใหญ่ขึ้น บวก Rune ธีม Hill ที่มักให้ resistance (บ่งชี้จากชื่อ) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Giant's Might เป็น bonus action ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 4/10 (C) | smith's tools + ภาษา Giant เป็น utility เล็กน้อย บวก Rune บางตัวน่าจะมี utility เสริม (ไม่ยืนยันเต็ม) [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | เลือก Rune ได้ 2→5 ตัวจาก pool สลับได้ทุก Long Rest ให้ toolkit ที่กว้างกว่า baseline [M:2/4] [R:2/3] [B:3/3] |

### Samurai (XGE 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Fighting Spirit (bonus action, Advantage ทุกการโจมตีอาวุธตลอดเทิร์น, 3 ครั้ง/วัน) เพิ่มความแม่นยำทุกการโจมตีพร้อมกัน + Rapid Strike (lv15, สละ Advantage แลกตีเพิ่ม) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Fighting Spirit แจก temp HP 5→15 ทุกครั้งที่ใช้ (3/วัน) + Strength before Death (lv18, ต่อเทิร์นพิเศษก่อนสลบตอน 0 HP) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 9/10 (S) | Fighting Spirit ให้ Advantage+temp HP ผ่าน bonus action หลายครั้ง/วัน บวก Tireless Spirit (lv10, ฟื้น 1 use ตอน initiative) [M:3/4] [R:3/3] [B:3/3] |
| **Utility** | 2/10 (C) | Bonus Proficiency (skill/ภาษา) เป็น utility เล็กน้อยจาก 0 [M:1/4] [R:1/3] [B:0/3] |
| **Versatility** | 5/10 (B) | Elegant Courtier เสริมมิติสังคม (Persuasion+Wis save prof) แต่แกนหลักยังเป็น duelist เดี่ยวๆ [M:1/4] [R:2/3] [B:2/3] |
