# Craftsman — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 11 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Craftsman](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 11 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Craftsman, 2024)

Floor 0-10 ต่อ axis ของ **Craftsman เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting มาตรฐาน (มี spell-like free cast บางตัว), saving throw proficiency Con + Int, armor proficiency ครบทุกชนิดรวม heavy+shield, weapon proficiency simple+martial, tool proficiency **artisan's tools ทุกชนิด**, Weapon Mastery, Extra Attack (lv5), Expert Crafting (lv1, Instant Crafting = Utilize action ดึงไอเทม ≤50gp มาใช้ได้ทันที), Masterwork Weapon (lv1, +1→scale attack/damage + mastery property ที่ 2), Masterwork Armor (lv2, +AC ให้ตัวเองและแบ่ง +1 AC ให้คนอื่นที่ใส่ได้), Folded Steel (lv5), Customize Armor (lv6), Fortify Arsenal (lv7, hone/reinforce อาวุธ-เกราะได้ 5 ชิ้น), Eye for Quality (lv9, free Identify+Locate Object), Weapon Enchantment (lv11), Armor Enchantment (lv13), Fabrication (lv15, free Fabricate), Improved Masterwork (lv17), Spellwrought Armor (lv18), Magnum Opus (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Extra Attack (lv5) บวก Masterwork Weapon ที่ให้โบนัส attack/damage roll สเกลตามเลเวล (เทียบเท่าอาวุธเวทย์ถาวรที่สร้างเอง) + mastery property ที่ 2 บวก Weapon Enchantment (lv11) เพิ่ม extra damage dice (Blessed/Elemental/Vampiric) และ Folded Steel (lv5) เปลี่ยนชนิดดาเมจของอาวุธได้ทุก Long Rest เพื่อหลบ resistance ศัตรู — magnitude สูงระดับ Fighter และไม่กิน resource ระหว่างไฟต์เลย [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis เลย [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 6/10 (B) | Masterwork Armor ให้ **คนอื่นที่ใส่เกราะนั้น** ได้ +1 AC ด้วย (ไม่ใช่แค่ตัวเอง) และ Fortify Arsenal (lv7, 10 นาทีตอน short rest) ให้ hone อาวุธได้ถึง 5 ชิ้น (Advantage โจมตีนัดแรก) หรือ reinforce เกราะได้ถึง 5 ชุด (Resistance B/P/S จนโดนดาเมจครั้งแรก) — ทั้งสองแบบใช้ได้กับอุปกรณ์ของ**เพื่อนร่วมทีมทั้งหมด**ไม่ใช่แค่ของตัวเอง [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | HD d10 + armor ครบทุกชนิดรวม heavy+shield + saving throw proficiency Con เป็นฐานที่แข็งอยู่แล้ว เสริมด้วย Masterwork Armor (AC เพิ่มถาวร) และช่วงปลายเกม Armor Enchantment (lv13, Adamantine = Critical Hit ที่โดนกลายเป็น hit ธรรมดาเสมอ หรือ Resistance เลือกชนิดดาเมจ) กับ Spellwrought Armor (lv18, บวก Masterwork Bonus เข้า saving throw ทุกอัน) [M:3/4] [R:2/3] [B:2/3] |
| **Action Economy** | 4/10 (C) | Expert Crafting's Instant Crafting ใช้ Utilize action (ไม่ฟรี) และ enchantment ส่วนใหญ่เป็น passive ติดตัวถาวรไม่ต้อง activate ทุกเทิร์น — ไม่มี free-action หรือ extra-action feature เด่นชัดติด chassis [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 9/10 (S) | Eye for Quality (lv9) cast Identify + Locate Object ได้**ฟรีไม่จำกัดครั้ง**ไม่ต้องใช้ slot/component เลย บวก Fabrication (lv15) cast Fabricate ฟรีแบบเดียวกัน และ Expert Crafting's Instant Crafting ดึงไอเทมมาใช้ได้ทันที — รวมกับ tool proficiency **artisan's tools ทุกชนิด** ตั้งแต่ lv1 ทำให้เป็นชุด utility ที่กว้างและฟรีที่สุดในบรรดา class ที่ทำมาแล้ว [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 6/10 (B) | Folded Steel/Weapon Enchantment/Armor Enchantment/Customize Armor สลับได้ทุก Long Rest ให้ปรับอุปกรณ์รับมือปัญหาที่แคมเปญเจอในวันนั้นได้ (ชนิดดาเมจ, ต้าน crit, ว่ายน้ำ/ปีนกำแพง ฯลฯ) บวก proficiency artisan's tools ครบทุกชนิดทำให้ non-combat check ไหนก็ทำได้ [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (11)

**Class Baseline อ้างอิง**: Damage 8, Control 3, Support 6, Survivability 7, Action Economy 4, Utility 9, Versatility 6

ทั้ง 11 Guild มาจากไฟล์เดียวกัน (`Valda's Spire of Secrets 2024`, ทุกตัวมี reprint 2024 ไม่มี 🕰️ orphan เลย) ไม่มี guild ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น)

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Arcane Maesters' Guild | B | ValdaSpire24 | 9 (S) | 3 (C) | 7 (A) | 8 (A) | 4 (C) | 10 (S) | 8 (A) |
| Armigers' Guild | S | ValdaSpire24 | 9 (S) | 6 (B) | 7 (A) | 10 (S) | 6 (B) | 9 (S) | 7 (A) |
| Bladeworkers' Guild | A | ValdaSpire24 | 9 (S) | 5 (B) | 6 (B) | 8 (A) | 6 (B) | 9 (S) | 6 (B) |
| Calibarons' Guild | A | ValdaSpire24 | 9 (S) | 6 (B) | 6 (B) | 7 (A) | 4 (C) | 9 (S) | 7 (A) |
| Clockworkers' Guild | S | ValdaSpire24Extras | 10 (S) | 3 (C) | 7 (A) | 7 (A) | 9 (S) | 9 (S) | 8 (A) |
| Courtiers' Guild | A | ValdaSpire24Extras | 8 (A) | 3 (C) | 9 (S) | 7 (A) | 6 (B) | 9 (S) | 8 (A) |
| Forgeknights' Guild | B | ValdaSpire24 | 10 (S) | 3 (C) | 6 (B) | 8 (A) | 4 (C) | 9 (S) | 7 (A) |
| Mechanauts' Guild | S | ValdaSpire24 | 10 (S) | 3 (C) | 6 (B) | 10 (S) | 6 (B) | 9 (S) | 9 (S) |
| Thunderlords' Guild | A | ValdaSpire24 | 10 (S) | 3 (C) | 7 (A) | 8 (A) | 6 (B) | 9 (S) | 7 (A) |
| Trappers' Guild | A | ValdaSpire24 | 9 (S) | 7 (A) | 6 (B) | 8 (A) | 7 (A) | 9 (S) | 8 (A) |
| Wintercarvers' Guild | A | ValdaSpire24Extras | 8 (A) | 8 (A) | 6 (B) | 9 (S) | 6 (B) | 9 (S) | 8 (A) |

---

### Arcane Maesters' Guild (ValdaSpire24)

**Overall**: B — Damage/Utility เป็น S ทั้งคู่ แต่ Control/Action Economy (สอง axis ที่ baseline อ่อนสุด) นิ่งสนิทไม่ขยับเลย — ทิ้งจุดอ่อนของ baseline ไว้เหมือนเดิมทั้งคู่ อ่อนสุดในกลุ่ม 11 Guild


> **คอนเซปต์**: ช่างเวทย์ที่คราฟต์ไอเทมวิเศษของจริงได้ (ไม่ใช่แค่ Masterwork ธรรมดา)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Arcane Strike แทนที่ 1 การโจมตีด้วย cantrip wizard หรือใช้ magic item ที่คราฟต์เอง (เช่น Wand of Magic Missiles) เข้ากับ Extra Attack ปกติ — เพิ่ม damage source ที่ยืดหยุ่นและเชื่อถือได้ [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 7/10 (A) | Magic Item Crafting คราฟต์ไอเทมวิเศษจริง (Ring of Free Action, Sending Stones, Bag of Holding ฯลฯ) แจกให้ทีมใช้ได้ [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 8/10 (A) | Sever Connection (reaction) สละการ attune ไอเทม 1 ชิ้นแลก AC โบนัสเท่า Int mod จนถึงต้นเทิร์นถัดไป กันโดนตีได้จริง [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 4/10 (C) | Arcane Strike เป็นการ "แลก" การโจมตี ไม่ใช่ extra action = เท่า baseline |
| **Utility** | 10/10 (S) | Magic Item Crafting เปิดคลังไอเทมวิเศษระดับ 2,500gp (Boots of Speed, Ring of Evasion, Portable Hole ฯลฯ) ให้คราฟต์ได้เองแบบไม่จำกัดชนิด — ขยาย baseline utility ที่สูงอยู่แล้วให้กว้างกว่าเดิมอีกขั้น [M:4/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เข้าถึงคลังไอเทมวิเศษหลากหลายหมวด (mobility/detection/combat/social) ทำให้ปรับตัวรับสถานการณ์ได้กว้างกว่า Craftsman ทั่วไปมาก [M:3/4] [R:2/3] [B:3/3] |

### Armigers' Guild (ValdaSpire24)

**Overall**: S — 3 axis เป็น S (Damage, Survivability 10/10 เต็ม, Utility) และยังแก้จุดอ่อน Control/Action Economy ของ baseline ขึ้นมาเป็น B ทั้งคู่ — สมดุลที่สุดในกลุ่มพร้อม peak สูงสุด


> **คอนเซปต์**: แทงค์เกราะหนักที่ใช้เกราะเป็นทั้งเกราะและอาวุธ

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Armored Slam (แทนที่การโจมตี, ดาเมจ = AC ของตัวเอง, 2 ครั้ง/rest) สเกลตาม AC ที่สูงอยู่แล้วจาก build tank บวก Colossal Slam (lv14, +2d10 force + prone) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Shining Steel (ตอนทอย initiative) ท้าทายศัตรูในระยะ 30ft ให้ Disadvantage เมื่อโจมตีใครก็ตามที่ไม่ใช่ตัวเอง — taunt/aggro-control เต็มรูปแบบ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 7/10 (A) | Shining Steel ดึงความสนใจศัตรูออกจากทีมทางอ้อม เป็น support เชิง protection [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 10/10 (S) | Tower Shield (+3 AC แทน +2 จากโล่) บวก Fortify (bonus action, AC+Str/Dex mod + Resistance ดาเมจทุกชนิดจนถึงต้นเทิร์นถัดไป, Masterwork Bonus ครั้ง/วัน) — ยกระดับความอึดของ tank build ขึ้นไปอีกขั้นชัดเจน [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Fortify เป็น bonus action ให้ AC+Resistance เต็มรูปแบบ ไม่แย่ง action หลัก [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | ไม่มี utility ใหม่นอกคอมแบต = เท่า baseline |
| **Versatility** | 7/10 (A) | เปิด role "ถัง/taunt-tank" ที่ชัดเจนกว่า Craftsman ทั่วไป [M:2/4] [R:2/3] [B:2/3] |

### Bladeworkers' Guild (ValdaSpire24)

**Overall**: A — 2 axis เป็น S (Damage, Utility) บวก Control/Action Economy ขยับเป็น B ทั้งคู่ กว้างพอสมควรแต่ peak น้อยกว่า Armigers'/Mechanauts'


> **คอนเซปต์**: นักดาบผู้เชี่ยวชาญอาวุธประชิดทุกชนิด

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Weapon Versatilist (Advantage ฟรี 1 ครั้ง/เทิร์นต่ออาวุธ 1 ชนิด) บวก Bane Weapons (extra 1d6 force ต่อ creature type ที่เลือก) บวก Vicious Strike (lv14, แปลง Advantage เป็น auto-crit) — stack ความแม่นยำ+ดาเมจสูงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | Defensive Disarm (reaction, Str save) ทำให้ศัตรูที่โจมตีตัวเองทำอาวุธหลุดมือ — control เฉพาะทางแคบแต่ใช้ได้จริง [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 8/10 (A) | Defensive Disarm ป้องกันตัวเองจากการโดนตี (บังคับให้ศัตรูเปลี่ยนอาวุธหรือพลาด) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Weapon Versatilist ให้ Advantage ฟรีไม่เสีย action/resource เพิ่ม [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | ไม่มี utility ใหม่นอกคอมแบต = เท่า baseline |
| **Versatility** | 6/10 (B) | โฟกัสนักดาบ single-target ล้วนๆ ไม่ขยาย role อื่น = เท่า baseline |

### Calibarons' Guild (ValdaSpire24)

**Overall**: A — 2 axis เป็น S (Damage, Utility) แก้ Control ขึ้นมาเป็น B แต่ Action Economy ยังนิ่งที่ baseline C


> **คอนเซปต์**: มือปืน/นักยิงที่ดัดแปลงกระสุนพิเศษได้

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Exotic Ammunition (เลือก Drilling เจาะทะลุ/Flechette AoE save) บวก Stopping Power (lv14, ยกพื้นดาเมจ die ขึ้นเป็นครึ่งค่าสูงสุด) — เพิ่ม magnitude และลด variance ของดาเมจปืน [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Suppressive Fire (ทุกเทิร์นเมื่อยิงโดน) กด Disadvantage การโจมตีครั้งถัดไปของเป้า — debuff ที่ใช้ได้ถี่มาก [M:2/4] [R:3/3] [B:1/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 4/10 (C) | Magazine เปลี่ยน property อาวุธเป็น Reload (ยิงได้หลายนัดก่อน reload) เป็น ammo-economy ไม่ใช่ action-economy = เท่า baseline |
| **Utility** | 9/10 (S) | Zeroed Sights (เพิกเฉย half/three-quarters cover) เป็น tactical utility เฉพาะทางคอมแบต = เท่า baseline |
| **Versatility** | 7/10 (A) | เลือกชนิดกระสุนได้หลายแบบ (เจาะเกราะ/ไฟ/เจาะทะลุ/AoE) ปรับกลยุทธ์ตามสถานการณ์ [M:2/4] [R:2/3] [B:3/3] |

### Clockworkers' Guild (ValdaSpire24Extras)

**Overall**: S — 3 axis เป็น S (Damage 10/10, Action Economy กระโดดจาก C เป็น S (4→9), Utility) — แก้จุดอ่อน Action Economy ของ baseline ได้แรงที่สุดในกลุ่ม แม้ Control จะยังนิ่ง


> **คอนเซปต์**: วิศวกรที่มีหุ่นยนต์คลอควร์ก 2 ตัวเป็นผู้ช่วยรบ

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Clockwork Construct 2 ตัวโจมตีเองได้ทุกเทิร์นด้วยอาวุธ Masterwork ของมันเอง (บังคับผ่าน bonus action เดียว) บวก Death Burst (ระเบิด 6d6 fire ตอน construct ตาย) บวก Construct Enchantments (lv14, ให้ weapon enchant + Advantage ติดตัว construct) — เท่ากับได้นักสู้เพิ่ม 2 คนที่ดาเมจแรงขึ้นเรื่อยๆ [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 7/10 (A) | Construct ทำหน้าที่ bodyguard ปกป้อง ally ได้ตามธีม (ดึงเป้า/บล็อกทาง) [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 7/10 (A) | ไม่มี feature ป้องกันตัวเองโดยตรงใหม่ (construct ปกป้องทางอ้อมเท่านั้น) = เท่า baseline |
| **Action Economy** | 9/10 (S) | สั่ง construct ทั้ง 2 ตัวให้ลงมือได้ด้วย bonus action เดียว เท่ากับได้ "เทิร์นเพิ่ม" จากหน่วยรบ 2 หน่วยแทบฟรี — economy multiplier ที่แรงที่สุดในบรรดา guild ที่ทำมา [M:4/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Mechanized Attachments (grappling hook, lantern, ram, springheels) เป็น utility gadget เสริม แต่ magnitude ไม่พอเกิน baseline ที่สูงอยู่แล้ว = เท่า baseline |
| **Versatility** | 8/10 (A) | เปิด role "ผู้บัญชาการหน่วยรบ" ที่แตกต่างจาก Craftsman ทั่วไปโดยสิ้นเชิง [M:3/4] [R:2/3] [B:3/3] |

### Courtiers' Guild (ValdaSpire24Extras)

**Overall**: A — 2 axis เป็น S (Support กระโดดจาก B เป็น S, Utility) เป็น Guild เดียวที่ไม่ดัน Damage เพิ่มเลย (นิ่งที่ baseline A) เอียงไปทาง support เต็มตัวแทน


> **คอนเซปต์**: ช่างตัดเสื้อในราชสำนักที่เย็บแผลและปลุกใจทีมได้

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 9/10 (S) | Rapid Suturing (bonus action ฮีล 1d10+level, Masterwork Bonus ครั้ง/วัน) บวก Adventuring Couture (lv14, bonus action เดียวให้ Heroic Inspiration + temp HP เท่า level แก่ ally ทุกคนในระยะ 30ft ที่ใส่ของมีเวทมนตร์แต่งตัว) — ซัพพอร์ตฮีล+บัฟทีมที่ baseline ไม่มีเลย [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Petticoat Plate ให้เอา customization ของ Customize Armor มาใส่เกราะชุดที่สองได้ แต่ magnitude เท่าของเดิม = เท่า baseline |
| **Action Economy** | 6/10 (B) | Rapid Suturing/Glow-Up ทั้งคู่เป็น bonus action ที่ให้ผลฮีล/บัฟทีมโดยไม่แย่ง action หลัก [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | Cosmetic Enchantments (ปลอมเสียง/ช่องซ่อนของ/self-mending) เป็น utility เชิงสังคม/แอบซ่อนเฉพาะทาง = เท่า baseline |
| **Versatility** | 8/10 (A) | พลิก Craftsman จาก combat-crafter เป็น healer/buffer/social specialist ได้เต็มรูปแบบ — บทบาทต่างจาก guild อื่นชัดเจน [M:2/4] [R:2/3] [B:3/3] |

### Forgeknights' Guild (ValdaSpire24)

**Overall**: B — Damage/Utility เป็น S ทั้งคู่เหมือน Arcane Maesters' แต่ Control/Action Economy ก็นิ่งสนิทเหมือนกัน — รูปแบบเดียวกับ Arcane Maesters' อ่อนสุดร่วมกัน


> **คอนเซปต์**: นักตีเหล็กที่พกเตาไฟติดตัวและระเบิดไฟใส่ศัตรู

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Flare Damage (reroll damage die ที่ทอยได้เลขสูงสุดของดาเมจไฟ ไม่จำกัดจำนวนครั้งเท่า Int mod) บวก Explosive Armory (เพิ่ม property ระเบิด AoE ให้อาวุธไฟ) บวก Fire Burst (lv14, แคส Fireball ฟรีไม่โดนดาเมจตัวเอง หลายครั้ง/วัน) — nova AoE damage ที่สูงมาก [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ (Fire Burst เป็น self-centered AoE ที่ระวังไม่โดน ally เอง) = เท่า baseline |
| **Survivability** | 8/10 (A) | Fire resistance (Portable Forge) บวก Scorching Steel (reaction 2d10 fire dmg ตอบโต้ผู้โจมตีระยะประชิด) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 4/10 (C) | Scorching Steel เป็น reaction แต่ Fire Burst ยังเสีย action ปกติ ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 9/10 (S) | Mending+Produce Flame เป็น utility เล็กน้อย = เท่า baseline |
| **Versatility** | 7/10 (A) | เปิด role blaster ธาตุไฟที่ใช้ทั้งอาวุธและ AoE spell ได้ในตัวเดียว [M:2/4] [R:2/3] [B:2/3] |

### Mechanauts' Guild (ValdaSpire24)

**Overall**: S — 4 axis เป็น S พร้อมกัน (Damage, Survivability 10/10 เต็ม, Utility, Versatility) มากที่สุดในกลุ่มทั้ง 11 Guild แม้ Control จะยังไม่ขยับก็ตาม


> **คอนเซปต์**: นักบินรถถังปูยักษ์ที่ปรับแต่งได้เต็มที่

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | ขับ apparatus ที่มี Extra Attack ของตัวเองในตัว บวก Magitech Upgrade (lv14, เลือก Ballista 10d6 line หรือ Missile Pod 5d6 AoE หรือ Rocket Engine ตี 3 ครั้ง) — magnitude ดาเมจสูงระดับ AoE spell เต็มรูปแบบ [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 6/10 (B) | Passenger Seat ให้ ally นั่งไปด้วยได้แบบ Total Cover แต่เป็น utility เฉพาะทางแคบ = เท่า baseline |
| **Survivability** | 10/10 (S) | Apparatus มี HP pool ของตัวเองแยกจากตัวละคร (ดูดซับดาเมจแทน) + Total Cover ระหว่างขับ + Ejector Seat (reaction สลัดตัวเองออกก่อนตาย) — เท่ากับมี "พูล HP สำรอง" เต็มรูปแบบที่ baseline ไม่มี [M:4/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Rocket Engine (Magitech Upgrade, bonus action) ให้ตีได้ 3 ครั้งแทน 2 ในเทิร์นเดียว [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | Frame Upgrade (climb/swim/jump ×3+ไม่โดนฟอลดาเมจ) เป็น traversal utility ที่ดี = เท่า baseline |
| **Versatility** | 9/10 (S) | Apparatus ปรับแต่งได้ทั้งด้านดาเมจ/traversal/utility ผ่านโมดูลสลับได้ทุก long rest — breadth กว้างที่สุดใน guild ที่ทำมา [M:3/4] [R:3/3] [B:3/3] |

### Thunderlords' Guild (ValdaSpire24)

**Overall**: A — 2 axis เป็น S (Damage 10/10, Utility) บวก Survivability/Support/Versatility ขยับเป็น A แต่ Control ยังนิ่งที่ baseline


> **คอนเซปต์**: ช่างไฟฟ้าที่สะสม Charge Point มาปล่อยเป็นดาเมจสายฟ้า

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 10/10 (S) | Shock (แลก Charge Point เป็น extra lightning dmg สเกลตาม prof bonus) บวก Arcing Jolt (chain ดาเมจไปเป้าที่ 2) บวก Static Charge (bonus action, 3d6 lightning ตอบโต้) บวก Ball Lightning (lv14, โซนถาวรเสริมดาเมจอาวุธโลหะทุกคนที่เดินผ่าน) — ระบบดาเมจไฟฟ้าที่ยืดหยุ่นและซ้อนได้หลายชั้น [M:4/4] [R:3/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ที่ระบุชัดเจน = เท่า baseline |
| **Support** | 7/10 (A) | Ball Lightning ให้อาวุธโลหะของใครก็ตามที่เดินผ่านโซนได้ดาเมจไฟฟ้าเพิ่ม (รวม ally) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 8/10 (A) | Lightning resistance (Power Cell) เป็น mitigation ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Static Charge/Ball Lightning เป็น bonus action ที่ให้ผลต่อเนื่องหลายเทิร์นโดยไม่เสีย action หลักซ้ำ [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | ไม่มี utility นอกคอมแบตใหม่ = เท่า baseline |
| **Versatility** | 7/10 (A) | ผสมดาเมจเดี่ยว/chain/AoE-zone ในกลไกเดียวกันได้หลายรูปแบบ [M:2/4] [R:2/3] [B:2/3] |

### Trappers' Guild (ValdaSpire24)

**Overall**: A — แก้จุดอ่อนทั้งคู่ของ baseline ได้ดีที่สุด (Control 3→7 เป็น A, Action Economy 4→7 เป็น A) ไม่เหลือจุดอ่อนเลย แต่ peak สูงสุดแค่ S สองตัว (Damage, Utility) น้อยกว่า Mechanauts'/Armigers'


> **คอนเซปต์**: นักวางกับดักที่ควบคุมสนามรบด้วยกลไก

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Traps สเกลดาเมจตามเลเวล (สูงสุด 4 dice ที่ lv17) บวก Booby Trap (ดาเมจ 2 เท่าถ้าซ่อนไม่ถูกจับได้) วางได้ผ่าน bonus action หลายครั้ง/วัน — เป็นแหล่งดาเมจคู่ขนานกับอาวุธหลัก [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | กับดักอย่าง Caltrops/Hunting Trap/Razor Wire ให้ผล restrain/ชะลอความเร็วในพื้นที่ วางซ้ำได้ผ่าน bonus action ระดับเลเวลครั้ง/วัน — control tool ที่ baseline ไม่มีเลย [M:2/4] [R:3/3] [B:2/3] |
| **Support** | 6/10 (B) | กับดักเป็นเครื่องมือควบคุมสนามรบที่ปกป้องทีมทางอ้อม ไม่ใช่ ally-support โดยตรง = เท่า baseline |
| **Survivability** | 8/10 (A) | Danger Sense (Advantage บน Dex save) เป็น mitigation ที่ baseline ไม่มี [M:2/4] [R:3/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Quick Deployment (bonus action วางกับดัก) บวก Escape Plan (reaction เคลื่อนที่+วางกับดักไม่โดน OA) — เครื่องมือควบคุมสนามรบที่ไม่แย่ง action หลักเลย [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | กับดักอย่าง Ball Bearings/Booby Trap มี utility เชิง area-denial/detection แต่ magnitude ไม่พอเกิน baseline ที่สูงอยู่แล้ว = เท่า baseline |
| **Versatility** | 8/10 (A) | เปิด role "ผู้ควบคุมสนามรบ" ที่ต่างจาก Craftsman แนวประชิด/ระยะไกลทั่วไปชัดเจน [M:2/4] [R:2/3] [B:3/3] |

### Wintercarvers' Guild (ValdaSpire24Extras)

**Overall**: A — Control กระโดดจาก C เป็น A (3→8) บวก Survivability/Utility เป็น S สองแกน แต่ Action Economy ขยับแค่ B


> **คอนเซปต์**: ช่างแกะสลักน้ำแข็งที่แช่แข็งศัตรูให้เป็นอัมพาต

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Frostbite (ทอย 1 บนดาเมจ cold ให้กลายเป็นเลขสูงสุดแทน) เป็น floor-raise เล็กน้อย ไม่พอเพิ่มคะแนนแกนนี้เกิน baseline อย่างมีนัยสำคัญ = ใกล้เท่า baseline |
| **Control** | 8/10 (A) | Frigid Armory อัปเกรด mastery property ที่มีอยู่ให้แรงขึ้น (Numb บล็อก bonus action, Sap ขยายเป็นทุก d20 test, Slow เป็น 20ft, Topple บังคับ fail save อัตโนมัติ) บวก Sub-Zero (bonus action, Con save หรือ Paralyzed) — control kit ที่ทรงพลังกว่า baseline มาก [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Cold resistance (Winter Core) บวก Frostburn (แคส Fire Shield ฟรี ให้ fire resistance + ตอบโต้ดาเมจ cold ใส่ผู้โจมตี) — mitigation ที่ baseline ไม่มีเลย [M:3/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Sub-Zero เป็น bonus action ที่ล็อกเป้าด้วย Paralyzed โดยไม่แย่ง action หลัก [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 9/10 (S) | Ice Sculpting สร้างวัตถุน้ำแข็งขนาด Medium ได้อิสระ (ไม่ใช่แค่อาวุธ) เป็น utility เชิงสร้างสรรค์ แต่คงอยู่แค่ 10 นาที magnitude ไม่พอเกิน baseline ที่สูงอยู่แล้ว = เท่า baseline |
| **Versatility** | 8/10 (A) | ผสม control(Paralyze)/tank(resistance คู่)/damage-floor ในธีมน้ำแข็งเดียว — breadth กว้างกว่า guild ดาเมจล้วนทั่วไป [M:2/4] [R:2/3] [B:3/3] |
