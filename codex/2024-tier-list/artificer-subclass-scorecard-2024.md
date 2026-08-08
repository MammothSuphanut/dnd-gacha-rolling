# Artificer — Subclass Scorecard (2024) 🕰️

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 6 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Artificer](00-scorecard-progress.md))
**สถานะปัจจุบัน**: ทำเสร็จแค่ **Class Baseline** ด้านล่าง — ยังไม่เริ่มให้คะแนน subclass ตัวไหนเลย

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-artificer.json` — source `TCE` (Tasha's Cauldron of Everything) — **🕰️ Artificer ไม่มี reprint 2024 ใน PHB/XPHB** จึงใช้กลไก/ตัวเลขจากเวอร์ชัน 2014 ทั้งหมดตามกติกา 2014-only orphan ของโปรเจกต์

---

## Class Baseline (Artificer, 2014) 🕰️

Floor 0-10 ต่อ axis ของ **Artificer เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Int, caster progression แบบ artificer (ช้าที่สุดในกลุ่ม half-caster, สลับ prepared spell ได้เต็มทุก Long Rest, มี Ritual Casting), saving throw proficiency Con + Int, armor proficiency light/medium/shield, weapon proficiency simple (+firearms เป็น optional rule), tool proficiency thieves' tools + tinker's tools + artisan's tools 1 ชนิด, Magical Tinkering (lv1), Infuse Item/Infusions Known (lv2, รู้ 4→8 infusion จากคลัง สลับ 1 ตัว/level-up), The Right Tool for the Job (lv3), Tool Expertise (lv6, double prof tool check), Flash of Genius (lv7, reaction บวก Int mod ให้ check/save ของตัวเองหรือ ally ในระยะ 30ft, Int mod ครั้ง/วัน), Magic Item Adept (lv10), Spell-Storing Item (lv11), Magic Item Savant (lv14, ignore attunement requirement ทุกชนิด), Magic Item Master (lv18), Soul of Artifice (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | Caster progression แบบ artificer เป็น half-caster ที่ปลดล็อก slot ช้าที่สุดในเกม (ช้ากว่า Paladin/Ranger 1 ระดับตัวละคร) และ artificer spell list ไม่ได้เน้น blast โดยตรง magnitude จึงต่ำกว่า full caster และ half-caster อื่นชัดเจน [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature เฉพาะติด chassis เลย ต้องพึ่ง spell ที่เลือกเตรียมเอง (เช่น Hold Person) เหมือน caster ทั่วไป [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 6/10 (B) | Flash of Genius (lv7) เป็น reaction บวก Int mod ให้ **ability check หรือ saving throw** ของตัวเองหรือ ally ในระยะ 30ft ได้ (Int mod ครั้ง/วัน ฟื้น long rest) ครอบคลุมทั้ง check และ save กว้างกว่า Bardic Inspiration ที่ต้องมอบล่วงหน้า บวก Spell-Storing Item (lv11) ให้ ally ใช้คาถาที่เก็บไว้ในไอเทมได้เองโดยไม่ต้องพึ่งเรา [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 4/10 (C) | HD d8 + armor medium/shield (ไม่มี heavy) + saving throw proficiency Con (กัน concentration break ได้ดี) บวก Soul of Artifice (lv20, +1 ทุก saving throw ต่อ magic item ที่ attune อยู่ สูงสุด +6 ที่ attune ครบ 6 ชิ้น + เปลี่ยน death เป็น 1 HP ได้โดยสละ infusion) แต่ปลดล็อกช้ามากถึง lv20 [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 4/10 (C) | Flash of Genius เป็น reaction ไม่กิน turn ตัวเอง แต่ใช้ได้แค่ Int mod ครั้ง/วัน ฟื้น long rest เท่านั้น ไม่มี free-action หรือ extra-action feature อื่นติด chassis [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 8/10 (A) | Infuse Item/Infusions Known ให้สร้าง magic item ได้เองจากคลัง infusion (4→8 ชิ้นพร้อมกัน), The Right Tool for the Job (lv3) สร้าง artisan's tools ชนิดใดก็ได้ขึ้นมาฟรีใน 1 ชม., Tool Expertise (lv6) double proficiency ทุก tool check, และ Magic Item Savant (lv14) **ignore ข้อจำกัด class/race/level ในการ attune magic item ทุกชนิด** ทำให้ใช้ magic item อะไรก็ได้ในเกมโดยไม่มีเงื่อนไข — breadth utility กว้างที่สุดในบรรดา class ที่ทำมาแล้ว [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Prepared spell list reset เต็มทุก Long Rest เหมือน Wizard บวก Infusions Known ที่เลือกได้ว่าจะ craft item สายไหน (ดาเมจ/ป้องกัน/utility) และ Magic Item Savant ที่ใช้ magic item อะไรก็ได้ในเกม — ปรับตัวเข้ากับสิ่งที่ทีม/แคมเปญต้องการได้กว้างมาก แม้ตัว archetype จะยังเป็นสาย caster/item-crafter เป็นแกนหลัก [M:3/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (6)

**Class Baseline อ้างอิง**: Damage 5, Control 3, Support 6, Survivability 4, Action Economy 4, Utility 8, Versatility 8

ไม่มี subclass ตัวไหนมี prerequisite หรือกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น)

| Subclass | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Alchemist | TCE | 6 (B) | 3 (C) | 9 (S) | 7 (A) | 4 (C) | 9 (S) | 8 (A) |
| Armorer | TCE | 8 (A) | 5 (B) | 6 (B) | 7 (A) | 6 (B) | 8 (A) | 9 (S) |
| Artillerist | TCE | 8 (A) | 4 (C) | 8 (A) | 6 (B) | 7 (A) | 8 (A) | 9 (S) |
| Battle Smith | TCE | 8 (A) | 4 (C) | 7 (A) | 6 (B) | 8 (A) | 8 (A) | 8 (A) |
| Cartographer | EFA | 6 (B) | 6 (B) | 8 (A) | 6 (B) | 5 (B) | 9 (S) | 9 (S) |
| Reanimator | RHW (Eberron: Forge of the Artificer) | 7 (A) | 5 (B) | 7 (A) | 6 (B) | 7 (A) | 9 (S) | 9 (S) |

---

### Alchemist (TCE)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Alchemical Savant (lv5) บวก Int mod เข้าหนึ่ง roll ของ spell ที่ cast ผ่าน alchemist's supplies ได้ทั้ง healing roll หรือ damage roll สาย acid/fire/necrotic/poison — reliable เพราะผูกกับ focus ที่ subclass การันตีว่ามีอยู่แล้ว แต่ magnitude แค่ +Int mod ครั้งเดียวต่อ spell ไม่ใช่ damage source ใหม่ [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | Experimental Elixir table เน้นบัฟ/รักษา/ยูทิลิตี้ (เช่น Invisibility, Enhanced Ability) ไม่มีเอฟเฟกต์ปลดล็อกที่นับเป็น control จริงจัง ไม่มี feature เพิ่มด้านนี้ = เท่า baseline [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 9/10 (S) | Experimental Elixir สุ่มเอฟเฟกต์ให้เพื่อนดื่มได้ 1→3 ขวด/long rest (บวก craft เพิ่มด้วย spell slot), Restorative Reagents (lv9) ให้ temp HP ทุกครั้งที่มีคนดื่ม elixir + free lesser restoration Int mod ครั้ง/วัน, Chemical Mastery (lv15) free greater restoration และ heal 1 ครั้ง/long rest โดยไม่เสีย slot/material — ครอบคลุมทั้ง buff, heal, status-removal กว้างมาก [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Chemical Mastery (lv15) ให้ resistance acid+poison, immune poisoned แบบถาวร บวก temp HP จาก elixir ของตัวเอง และ free greater restoration/heal เผื่อกรณีฉุกเฉิน — สูงกว่า baseline ชัดเจนแม้ปลดล็อกช้า [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 4/10 (C) | free-cast ของ Restorative Reagents/Chemical Mastery ประหยัด **resource** (ไม่เสีย slot) แต่ไม่ได้ประหยัด **action** — ยังต้องเสีย action cast ปกติ ไม่มี feature ลด action cost หรือให้ extra action = เท่า baseline [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 9/10 (S) | เพิ่ม reliability ในการเข้าถึง utility spell tier สูง (greater restoration, heal) แบบ free-cast ไม่ต้องเตรียมล่วงหน้าด้วยซ้ำ ต่อยอดจาก Infuse Item ที่กว้างอยู่แล้วของ baseline [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Elixir table สุ่มเอฟเฟกต์ (ไม่ได้เลือกเอง) ทำให้ breadth เชิงทฤษฎีกว้างแต่ควบคุมไม่ได้ว่าจะได้อะไร ไม่ได้เพิ่ม versatility เกิน baseline ที่มาจาก prepared-spell-reset + Infusions Known อยู่แล้ว = เท่า baseline [M:3/4] [R:3/3] [B:2/3] |

### Armorer (TCE)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ได้ **Extra Attack ที่ lv5** ซึ่ง baseline chassis ของ Artificer ไม่มีเลย บวกอาวุธประจำตัว (Thunder Gauntlets 1d8 thunder หรือ Lightning Launcher 1d6+1d6 lightning) ที่ใช้ Int mod แทน Str/Dex บวก Perfected Armor (lv15) เพิ่ม damage debuff ให้ attack ถัดไปของพวกพ้อง — magnitude กระโดดสูงกว่า baseline มากเพราะปกติ Artificer ไม่ได้ออกแบบมาเป็น weapon-attacker [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Perfected Armor–Guardian (lv15) reaction บังคับ Str save แล้วดึงเป้าเข้ามา 25 ft (forced movement) บวก Thunder Gauntlets ที่ทำให้เป้ามี disadvantage โจมตีคนอื่น (soft target-lock) — เป็น control ทางอ้อมที่ผูกกับการเลือก Armor Model [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 6/10 (B) | ไม่มี feature ที่ให้ประโยชน์ตรงกับ ally นอกเหนือจาก baseline (Defensive Field/Perfected Armor เป็น self-buff ล้วน) = เท่า baseline [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | proficiency heavy armor (AC สูงขึ้นตั้งแต่ lv3) + Defensive Field (bonus action, temp HP = class level, ใช้ได้ PB ครั้ง/long rest) + Arcane Armor ที่ถอดไม่ได้โดยไม่สมัครใจและซ่อมแขนขาที่ขาดหาย รวมกันเป็น personal tankiness ที่สูงกว่า baseline ชัดเจน [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Extra Attack (lv5) คือการดึงดาเมจสองเท่าออกจาก 1 Attack action เดียว ถือเป็นการเพิ่มประสิทธิภาพ action ที่มีอยู่แล้วอย่างชัดเจน แม้ไม่ได้เพิ่ม action ใหม่ [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 8/10 (A) | Arcane Armor เป็น spellcasting focus + ไม่มีข้อจำกัด Str requirement + Armor Modifications (lv9) แยก infuse ได้หลายชิ้นส่วน แต่ breadth utility โดยรวมไม่ได้กว้างขึ้นจาก baseline ที่มาจาก Infuse Item/Magic Item Savant อยู่แล้ว = เท่า baseline [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | เลือกสลับ Guardian (แทงค์-forced movement) ↔ Infiltrator (skirmisher-debuff) ได้ทุก short/long rest แค่มี smith's tools — ปรับ playstyle ทั้งชุดให้เข้ากับสถานการณ์ได้ในระดับที่ class อื่นทำไม่ได้ง่ายขนาดนี้ [M:3/4] [R:3/3] [B:3/3] |

### Artillerist (TCE)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Eldritch Cannon เลือกโหมด Flamethrower/Force Ballista ได้ดาเมจตรงทุกเทิร์นผ่าน bonus action, Arcane Firearm (lv5) บวก 1d8 เข้า damage roll ของ spell ที่ยิงผ่านปืน, Explosive Cannon (lv9) เพิ่ม 1d8 ให้ cannon ทุกแบบ **และ**เพิ่มออปชัน detonate 3d8 AoE — หลายแหล่งดาเมจที่ซ้อนกันได้ [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 4/10 (C) | Force Ballista ผลัก 5 ft ทุกครั้งที่โดน (forced movement เล็กน้อย) แต่ไม่มี hard-CC ผูกกับ chassis หลัก เป็นแค่ side-effect ของโหมดดาเมจหนึ่งในสาม [M:2/4] [R:1/3] [B:1/3] |
| **Support** | 8/10 (A) | Eldritch Cannon โหมด Protector ให้ temp HP กับพวกพ้องที่อยู่ใกล้ cannon ได้ทุกเทิร์นผ่าน bonus action เดียวกับที่สั่งยิง บวก Fortified Position (lv15) ให้ half cover กับตัวเองและพวกพ้องทุกคนในระยะ 10 ft จาก cannon — สนับสนุนทั้งเชิง heal และเชิง defense พร้อมกัน [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Fortified Position ให้ half cover กับตัวเอง (ลด AC ที่โดน 2 แต้ม) เมื่ออยู่ใกล้ cannon แต่ผูกเงื่อนไขต้องยืนใกล้ cannon ตลอด ไม่ใช่ buff ติดตัวถาวร [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | cannon ทำหน้าที่เหมือนตัวละครที่สองที่ยิง/รักษาได้ทุกเทิร์นผ่าน bonus action สั่งเดียว (ไม่ต้องเสีย action ตัวเองไปโจมตี) และ lv15 สั่งได้ 2 cannon พร้อมกันด้วย bonus action เดิม — action-multiplier ที่ชัดเจน [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility breadth ใหม่ที่กว้างขึ้นจาก baseline (Infuse Item/Magic Item Savant) — cannon เน้น combat ล้วน = เท่า baseline [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | เลือกโหมด cannon (Flamethrower/Force Ballista/Protector) ใหม่ได้ทุกครั้งที่สร้าง และ lv15 ถือ 2 cannon ต่างโหมดพร้อมกันได้ ปรับบทบาท damage/control/support ได้กลางแคมเปญ [M:3/4] [R:3/3] [B:3/3] |

### Battle Smith (TCE)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | martial weapon proficiency + ใช้ Int mod กับ magic weapon attack, Extra Attack (lv5), และ Arcane Jolt (lv9) เพิ่ม 2d6→4d6 force damage ต่อการโจมตีที่โดน (ใช้ได้ทั้งจากตัวเองและจาก steel defender) — หลายแหล่งดาเมจซ้อนกันเหมือน Armorer [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 4/10 (C) | steel defender มี Grapple ในสแตทบล็อกเป็น control ทางอ้อมผ่าน companion เท่านั้น ไม่มี control feature ตรงติด chassis Battle Smith เอง [M:1/4] [R:2/3] [B:1/3] |
| **Support** | 7/10 (A) | Arcane Jolt เลือกใช้เป็น heal 2d6→4d6 แทนดาเมจได้ (Int mod ครั้ง/วัน) บวก steel defender ที่ revive ได้ด้วย smith's tools ถ้าตายมาไม่เกิน 1 ชม. — สูงกว่า baseline เพราะมี healing option ตรงจุด แม้จะจำกัดจำนวนครั้ง [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | steel defender เป็นร่างที่สองไว้ดึงความสนใจ/แทงค์แทน และฟื้นคืนชีพได้เองด้วย spell slot — เพิ่ม survivability ของทีมทางอ้อมแม้จะไม่ได้บวก HP/AC ให้ตัวผู้เล่นโดยตรง [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | steel defender เป็นตัวละครที่สองเต็มรูปแบบที่ขยับ+ใช้ reaction เองได้ทุกเทิร์น และโจมตี/ทำ action พิเศษได้ผ่าน bonus action สั่งเดียว — action-multiplier ที่แข็งแรงที่สุดในกลุ่ม Artificer subclass ที่ทำมา (เทียบเท่า Artillerist's cannon แต่ตัว defender ยังมี full stat block ของตัวเอง) [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | ไม่มี utility breadth ใหม่ที่กว้างขึ้นจาก baseline = เท่า baseline [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Arcane Jolt เลือกดาเมจ/heal ได้ตามสถานการณ์ แต่ breadth โดยรวมไม่ได้กว้างไปกว่า baseline (prepared-reset + Infusions Known) มากนัก = เท่า baseline [M:3/4] [R:3/3] [B:2/3] |

### Cartographer (EFA)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Guided Precision (lv5) บวก Int mod เข้าหนึ่ง damage roll ต่อเทิร์นเมื่อ cast Cartographer spell หรือโจมตีเป้าที่ติด Faerie Fire — reliable แต่ magnitude เท่า Alchemical Savant พอดี ไม่ใช่แหล่งดาเมจใหม่ [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | free-cast Faerie Fire (Int mod ครั้ง/วัน) ให้ advantage แก่การโจมตีทุกคนที่เล็งเป้านั้นและเปิดเผยตัวล่องหน แถม lv5 ทำให้เสีย concentration จากดาเมจไม่ได้ — เป็น control-enabler ที่ reliable และฟรีตลอดทั้งวัน สูงกว่า baseline ที่ไม่มี control เลย [M:2/4] [R:3/3] [B:1/3] |
| **Support** | 8/10 (A) | Adventurer's Atlas แจก map ให้เพื่อนสูงสุด 1+Int mod คน ให้ +1d4 initiative และ target กันข้าม cover/sight ได้ทั้งทีม บวก Superior Atlas (lv15) เป็น safety net ให้ผู้ถือ map ทุกคน (ไม่ใช่แค่ตัวเอง) รอดจาก 0 HP ได้ — breadth กว้างครอบคลุมทั้งปาร์ตี้ [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Superior Atlas ให้ตัวเอง (ในฐานะผู้ถือ map คนหนึ่ง) รอดจาก 0 HP ได้เช่นกัน (HP = 2×level + teleport หนี) แต่ปลดล็อกช้าถึง lv15 และเป็น one-shot จนกว่าจะสร้าง map ใหม่ [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 5/10 (B) | Portal Jump ใช้แค่ครึ่ง movement (ไม่ใช้ action) เพื่อ teleport 10 ft และ Ingenious Movement (lv9) แถม teleport 30 ft ให้ตัวเอง/พวกพ้องต่อท้าย Flash of Genius reaction เดิมได้ฟรี — ประหยัด action ได้จริงแต่ magnitude เป็นแค่การเคลื่อนที่ ไม่ใช่ extra attack/turn [M:1/4] [R:3/3] [B:1/3] |
| **Utility** | 9/10 (S) | free-cast Find the Path (lv15, ไม่ต้องเตรียม ไม่เสีย component) เป็น utility-spell tier สูงที่ปกติต้องใช้ 6th-level slot บวก Portal Jump teleport และ scroll-crafting ที่เร็วขึ้นครึ่งหนึ่ง — breadth utility กว้างกว่า baseline ชัดเจน [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | Adventurer's Atlas ใช้ได้ทุกสถานการณ์ (initiative, ignore-cover targeting) ไม่ผูกกับ combat type ใดโดยเฉพาะ บวก Faerie Fire ที่ใช้ได้ทั้งเป็น control/damage-enabler — ปรับใช้ได้กว้างกว่า baseline [M:3/4] [R:3/3] [B:3/3] |

### Reanimator (RHW, *Eberron: Forge of the Artificer*)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Reanimated Companion's Death Burst (necrotic, เพิ่มเป็น 4d4 ที่ lv9 และ**ignore resistance**) + Jolt to Life ดัดแปลง Spare the Dying ให้ยิง lightning AoE 2d4→4d4 + Arcane Conduit (ถ้าเลือก) บวก Int mod เข้า damage roll ของ spell สาย Evocation/Necromancy — magnitude สูงแต่ Death Burst ต้องพึ่งการที่ companion ตาย (semi-consumable) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 5/10 (B) | Gaunt modification (ถ้าเลือก) ให้ companion แผ่ aura บังคับ Wisdom save หรือติด Frightened รอบตัว — เป็น control จริงที่ reliable ระดับหนึ่งแต่ต้องแลกกับ modification slot อื่น [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 7/10 (A) | Jolt to Life ฮีล Spare the Dying เป้าหมายเท่ากับ artificer level ทันทีที่ cast (ไม่ใช่แค่กันตาย) บวก Refined Reanimation (lv15) free-cast Raise Dead 1 ครั้ง/long rest — เป็น support ทั้งระดับ in-combat และ out-of-combat [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Life Transfer (lv15) reaction ดูด HP ปัจจุบันของ companion มาเป็น HP ตัวเอง (แลกกับ companion ตาย) เป็น emergency self-heal ที่ยืดหยุ่นสูงแม้เป็น one-time-per-companion [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | companion เป็นตัวละครที่สองที่ขยับ+ใช้ reaction เองได้ทุกเทิร์น สั่ง action พิเศษผ่าน bonus action เดียว เหมือน steel defender ของ Battle Smith [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | free-cast Raise Dead (lv15) เป็น utility-spell tier สูงที่ปกติต้องใช้ 5th-level slot + material component แพง บวกความสามารถ climb/swim ของ companion (ถ้าเลือก Gaunt/Moist) — breadth กว้างกว่า baseline [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | Strange/Macabre/Superior Modifications ให้เลือก build companion ได้ถึง 3 ออปชันพร้อมกันที่ lv15 จาก 5 แบบ (Arcane Conduit/Ferocity/Bloated/Gaunt/Moist) ปรับบทบาท companion ให้เข้ากับสถานการณ์ได้กว้างมาก [M:3/4] [R:3/3] [B:3/3] |
