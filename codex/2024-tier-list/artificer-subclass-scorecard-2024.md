# Artificer — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 6 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Artificer](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 6 ตัว

**⚠️ แก้ไข 2026-08-08**: ไฟล์เดิมใช้เวอร์ชัน 2014 (`TCE`) ทั้งไฟล์และติด 🕰️ orphan โดยเข้าใจผิดว่า Artificer ไม่มี reprint 2024 — ตรวจกับ `public/data/5etools/class.json`/`subclass.json` แล้วพบว่า **มีเวอร์ชัน 2024 จริง** (source `EFA`, *Eberron: Forge of the Artificer*) ทั้ง class chassis และ 4 ใน 6 subclass (Alchemist/Armorer/Artillerist/Battle Smith) จึงเขียนใหม่ทั้ง Class Baseline + 4 subclass นั้นด้วยกลไก EFA ตามกติกา 2024-scope ของโปรเจกต์ (Cartographer/Reanimator ใช้ EFA/RHW อยู่แล้วไม่ต้องแก้ไข ยกเว้นแก้ label หนังสือของ Reanimator ที่เขียนผิด)

**ที่มาข้อมูล chassis**: `src/data/5etools/official/class/class-artificer.json` — source `EFA` (*Eberron: Forge of the Artificer*, `edition: "one"` = 2024-compatible) — เทียบ feature ระดับต่อระดับกับ `TCE` (2014) แล้วพบว่ากลไกเปลี่ยนจริงหลายจุด ไม่ใช่แค่ reprint ชื่อเดิม (เช่น Infuse Item/Infusions Known → Replicate Magic Item, Tool Expertise/The Right Tool for the Job หายไป, Magic Item Savant ตัดข้อความ "ignore attunement restriction ทุกชนิด" ออก, ASI lv19 → Epic Boon, Soul of Artifice เปลี่ยนจาก passive save bonus เป็น Cheat Death)

---

## Class Baseline (Artificer, 2024)

Floor 0-10 ต่อ axis ของ **Artificer เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Int, caster progression แบบ artificer (ช้าที่สุดในกลุ่ม half-caster, สลับ prepared spell ได้เต็มทุก Long Rest), saving throw proficiency Con + Int, armor proficiency light/medium/shield, weapon proficiency simple, tool proficiency Thieves' Tools + Tinker's Tools + Artisan's Tools 1 ชนิด, Tinker's Magic (lv1, Mending cantrip + สร้างไอเทม mundane จากลิสต์ ~30 ชิ้น Int mod ครั้ง/วัน หายเมื่อจบ Long Rest), Replicate Magic Item (lv2, รู้ Plan 4→8 ชิ้นจากตาราง Magic Item Plans 4 ระดับ สร้างไอเทมเวทจริงพร้อมกันได้ 2→6 ชิ้นหลัง Long Rest แต่ไม่ถาวร หายไปถ้าตายหรือเปลี่ยน plan), Magic Item Tinker (lv6, Charge/Drain/Transmute Magic Item เสริม Replicate Magic Item), Flash of Genius (lv7, reaction บวก Int mod ให้ check/save ของตัวเองหรือ ally ในระยะ 30ft, Int mod ครั้ง/วัน), Magic Item Adept (lv10, attune 4 ชิ้น), Spell-Storing Item (lv11), Advanced Artifice (lv14: attune 5 ชิ้น + Refreshed Genius คืน Flash of Genius 1 ใช้/short rest), Magic Item Master (lv18, attune 6 ชิ้น), Epic Boon (lv19), Soul of Artifice (lv20: Cheat Death สลาย item Uncommon/Rare กี่ชิ้นก็ได้แลก HP = 20×จำนวนชิ้นแทนตาย + Magical Guidance คืน Flash of Genius เต็มทุก short rest ถ้า attune อย่างน้อย 1 ชิ้น)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | Caster progression แบบ artificer เป็น half-caster ที่ปลดล็อก slot ช้าที่สุดในเกม (ช้ากว่า Paladin/Ranger 1 ระดับตัวละคร) และ artificer spell list ไม่ได้เน้น blast โดยตรง magnitude จึงต่ำกว่า full caster และ half-caster อื่นชัดเจน — ไม่เปลี่ยนจาก 2014 [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 3/10 (C) | ไม่มี control feature เฉพาะติด chassis เลย ต้องพึ่ง spell ที่เลือกเตรียมเอง (เช่น Hold Person) เหมือน caster ทั่วไป — ไม่เปลี่ยนจาก 2014 [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 6/10 (B) | Flash of Genius (lv7) เป็น reaction บวก Int mod ให้ **ability check หรือ saving throw** ของตัวเองหรือ ally ในระยะ 30ft ได้ (Int mod ครั้ง/วัน ฟื้น long rest) บวก Spell-Storing Item (lv11) ให้ ally ใช้คาถาที่เก็บไว้ในไอเทมได้เองโดยไม่ต้องพึ่งเรา — กลไกเหมือน 2014 ทุกจุด [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 4/10 (C) | HD d8 + armor medium/shield (ไม่มี heavy) + saving throw proficiency Con (กัน concentration break ได้ดี) บวก Soul of Artifice (lv20) **Cheat Death**: ตอนเหลือ 0 HP สลาย magic item Uncommon/Rare ที่สร้างจาก Replicate Magic Item กี่ชิ้นก็ได้ แลก HP = 20×จำนวนชิ้นที่สลาย — magnitude สูงถ้ามี item ให้สลาย แต่เป็น reactive one-time ที่ต้องพึ่ง permanent magic item ของตัวเอง (2024 ตัด passive "+1 save ต่อ item attune" ของเดิมออก) [M:2/4] [R:1/3] [B:1/3] |
| **Action Economy** | 4/10 (C) | Flash of Genius เป็น reaction ไม่กิน turn ตัวเอง แต่ใช้ได้แค่ Int mod ครั้ง/วัน ฟื้น long rest เท่านั้น ไม่มี free-action หรือ extra-action feature อื่นติด chassis — ไม่เปลี่ยนจาก 2014 [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 7/10 (A) | Tinker's Magic (lv1, Mending + สร้างไอเทม mundane จากลิสต์ยาว Int mod ครั้ง/วัน) บวก Replicate Magic Item ที่ระดับสูงมีตัวเลือก catch-all "common item ใดๆ ที่ไม่ใช่ potion/scroll", "uncommon wondrous item ใดๆ", "rare wondrous item ใดๆ" ทำให้พูลไอเทมกว้างมาก บวก Magic Item Tinker (lv6, Charge/Drain/Transmute Magic Item ปรับ item กลางทางได้) — **แต่ 2024 ตัด The Right Tool for the Job/Tool Expertise ออก และ Advanced Artifice (lv14) ไม่มี "ignore attunement restriction ทุกชนิด" เหมือน Magic Item Savant เดิมแล้ว** (เพิ่มแค่จำนวน attunement slot) breadth จึงลดลงจาก 2014 เล็กน้อย [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Prepared spell list reset เต็มทุก Long Rest เหมือน Wizard บวก Replicate Magic Item ที่เลือกสาย Plan ได้เอง (offense/defense/utility) ปรับ role ได้ตามทีมต้องการ — **แต่ไม่มี wildcard "ใช้ magic item อะไรก็ได้ในเกมข้ามข้อจำกัด class/race/level" ของ Magic Item Savant เดิมแล้ว** ซึ่งเคยเป็นตัวขับ versatility หลัก breadth จึงลดลงจาก 2014 [M:2/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (6)

**Class Baseline อ้างอิง**: Damage 5, Control 3, Support 6, Survivability 4, Action Economy 4, Utility 7, Versatility 7

ไม่มี subclass ตัวไหนมี prerequisite หรือกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) **Alchemist/Armorer/Artillerist/Battle Smith ให้คะแนนใหม่ด้วยกลไก EFA (2024) แทน TCE (2014) เดิม** — ดูหมายเหตุแก้ไขด้านบนของไฟล์

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Alchemist | A | EFA | 6 (B) | 3 (C) | 9 (S) | 7 (A) | 4 (C) | 8 (A) | 7 (A) |
| Armorer | S | EFA | 8 (A) | 5 (B) | 6 (B) | 7 (A) | 6 (B) | 7 (A) | 9 (S) |
| Artillerist | S | EFA | 8 (A) | 4 (C) | 8 (A) | 6 (B) | 7 (A) | 7 (A) | 9 (S) |
| Battle Smith | A | EFA | 8 (A) | 4 (C) | 7 (A) | 6 (B) | 8 (A) | 7 (A) | 7 (A) |
| Cartographer | S | EFA | 6 (B) | 6 (B) | 8 (A) | 6 (B) | 5 (B) | 9 (S) | 9 (S) |
| Reanimator | S | RHW (*Ravenloft: The Horrors Within*) | 7 (A) | 5 (B) | 7 (A) | 6 (B) | 7 (A) | 9 (S) | 9 (S) |

---

### Alchemist (EFA)

**Overall**: A — Support S (9/10) สูงสุดในกลุ่ม บวก Survivability/Utility A แต่ Action Economy ยังค้างที่ baseline (4, C) — healer/buffer เฉพาะทางที่แรงสุดด้าน support แต่ Action Economy ไม่ขยับเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Alchemical Savant (lv5) บวก Int mod เข้าหนึ่ง roll ของ spell ที่ cast ผ่าน Alchemist's Supplies ได้ทั้ง healing roll หรือ damage roll สาย Acid/Fire/Poison (2024 ตัด Necrotic ออกจากลิสต์เดิม) — reliable เพราะผูกกับ focus ที่ subclass การันตีว่ามีอยู่แล้ว แต่ magnitude แค่ +Int mod ครั้งเดียวต่อ spell ไม่ใช่ damage source ใหม่ [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | Experimental Elixir table เน้นบัฟ/รักษา (Healing/Swiftness/Resilience/Boldness/Flight) ไม่มีเอฟเฟกต์ปลดล็อกที่นับเป็น control จริงจัง ไม่มี feature เพิ่มด้านนี้ = เท่า baseline [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 9/10 (S) | Experimental Elixir สร้างได้ 2→5 ขวด/long rest (เลือกหรือสุ่ม 1d6 จาก Healing/Swiftness/Resilience/Boldness/Flight) แจก ally ดื่มได้ด้วย bonus action บวก Restorative Reagents (lv9) free-cast Lesser Restoration Int mod ครั้ง/วัน บวก Chemical Mastery (lv15) free-cast Tasha's Bubbling Cauldron 1 ครั้ง/long rest (AoE heal+buff) — ครอบคลุมทั้ง buff/heal/status-removal กว้างมาก [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Chemical Mastery (lv15) ให้ resistance Acid+Poison แบบถาวร + immune Poisoned ถาวร บวกดื่ม elixir ของตัวเองได้เหมือน ally — สูงกว่า baseline ชัดเจนแม้ปลดล็อกช้า [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 4/10 (C) | free-cast ของ Restorative Reagents/Conjured Cauldron ประหยัด **resource** (ไม่เสีย slot) แต่ไม่ได้ประหยัด **action** — ยังต้องเสีย action cast ปกติ = เท่า baseline [M:1/4] [R:2/3] [B:1/3] |
| **Utility** | 8/10 (A) | Restorative Reagents + Chemical Mastery's Conjured Cauldron (Tasha's Bubbling Cauldron free-cast) เพิ่มการเข้าถึง utility/heal spell tier สูงแบบ free-cast ไม่ต้องเตรียมล่วงหน้า ต่อยอดจาก Replicate Magic Item ของ baseline ที่กว้างอยู่แล้ว [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | Elixir table ให้ effect หลายแบบ (heal/speed/AC/attack-save/flight) แต่สุ่ม/เลือกจาก list คงที่ ไม่ได้เพิ่ม breadth เกิน baseline ที่มาจาก prepared-spell-reset + Replicate Magic Item อยู่แล้ว = เท่า baseline [M:2/4] [R:3/3] [B:2/3] |

### Armorer (EFA)

**Overall**: S — Versatility S (9/10) บวก Damage/Survivability/Utility ล้วน A พร้อมกัน ไม่มี axis ไหนอยู่ต่ำกว่า B เลย เป็น all-rounder ที่กว้างและแรงพร้อมกัน


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | ได้ **Extra Attack ที่ lv5** ซึ่ง baseline chassis ของ Artificer ไม่มีเลย บวกอาวุธประจำ Armor Model ที่ใช้ Int mod แทน Str/Dex (Force Demolisher 1d10 force reach+ผลัก/ดึง 10ft, Thunder Pulse 1d8 thunder, Lightning Launcher 1d6+1d6 lightning) บวก Improved Arsenal (lv9, +1 atk/dmg) และ Perfected Armor (lv15) ยกดาเมจอาวุธเป็น 2d6/1d10/2d6 ตามโมเดล — magnitude กระโดดสูงกว่า baseline มากเพราะปกติ Artificer ไม่ได้ออกแบบมาเป็น weapon-attacker [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 5/10 (B) | Perfected Armor–Guardian (lv15) reaction บังคับ Str save แล้วดึงเป้าเข้ามา 25 ft (forced movement) บวก Thunder Pulse ที่ทำให้เป้ามี disadvantage โจมตีคนอื่น (soft target-lock) — เป็น control ทางอ้อมที่ผูกกับการเลือก Armor Model [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 6/10 (B) | ไม่มี feature ที่ให้ประโยชน์ตรงกับ ally นอกเหนือจาก baseline (Defensive Field/Perfected Armor เป็น self-buff ล้วน) = เท่า baseline [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 7/10 (A) | training heavy armor (AC สูงขึ้นตั้งแต่ lv3 เกิน baseline's medium-only) + Defensive Field (bonus action, temp HP = artificer level, ตอน Bloodied) + Arcane Armor ที่ถอดไม่ได้โดยไม่สมัครใจ รวมกันเป็น personal tankiness ที่สูงกว่า baseline ชัดเจน [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Extra Attack (lv5) คือการดึงดาเมจสองเท่าออกจาก 1 Attack action เดียว ถือเป็นการเพิ่มประสิทธิภาพ action ที่มีอยู่แล้วอย่างชัดเจน แม้ไม่ได้เพิ่ม action ใหม่ [M:2/4] [R:3/3] [B:1/3] |
| **Utility** | 7/10 (A) | Arcane Armor เป็น spellcasting focus + ไม่มีข้อจำกัด Str requirement แต่ breadth utility โดยรวมไม่ได้กว้างขึ้นจาก baseline ที่มาจาก Replicate Magic Item/Magic Item Tinker อยู่แล้ว = เท่า baseline [M:3/4] [R:2/3] [B:3/3] |
| **Versatility** | 9/10 (S) | เลือกสลับได้ถึง **3 Armor Model** — Dreadnaught (บุก-เพิ่มขนาด/reach), Guardian (แทงค์-forced movement), Infiltrator (skirmisher-stealth) — ได้ทุก short/long rest แค่มี Smith's Tools ในมือ (2024 เพิ่ม Dreadnaught เข้ามาใหม่ 2014 มีแค่ 2 โมเดล) ปรับ playstyle ทั้งชุดให้เข้ากับสถานการณ์ได้กว้างกว่าเดิมอีก [M:3/4] [R:3/3] [B:3/3] |

### Artillerist (EFA)

**Overall**: S — Versatility S (9/10) บวก Damage/Support/Action Economy/Utility ล้วน A ครบเกือบทุกแกน มีแค่ Survivability ที่เป็น B เท่านั้นที่ไม่ถึง A


> **หมายเหตุข้อมูล**: รายละเอียดโหมด Flamethrower/Force Ballista/Protector ของ Eldritch Cannon (EFA) อยู่ใน object stat block แยกที่ไม่มีอยู่ในไฟล์ data ที่ดึงมาได้ (มีแค่ชื่อ "Protector" ถูกอ้างถึงใน Explosive Cannon lv9 ยืนยันว่ายังมีโหมดนี้อยู่) ใช้ตัวเลขจากเวอร์ชัน TCE 2014 (2d8 dmg/ผลัก 5ft/1d8+Int temp HP) เป็น proxy ประมาณคะแนน เพราะกลไกฐาน (สร้าง cannon แบบ bonus action, Detonate) เหมือนกันเกือบทั้งหมด

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Eldritch Cannon (โหมด Flamethrower/Force Ballista ให้ดาเมจ AoE/single-target ทุกเทิร์นผ่าน bonus action — ตัวเลขอ้างอิงจาก proxy 2014), Arcane Firearm (lv5) บวก 1d8 เข้า damage roll ของ spell ที่ยิงผ่านปืน, Explosive Cannon (lv9) เพิ่ม 1d8 ให้ cannon ทุกแบบ **และ** Detonate reaction 3d10 force AoE เมื่อ cannon โดนดาเมจ — หลายแหล่งดาเมจที่ซ้อนกันได้ [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 4/10 (C) | Force Ballista ผลัก 5 ft ทุกครั้งที่โดน (proxy 2014, forced movement เล็กน้อย) แต่ไม่มี hard-CC ผูกกับ chassis หลัก เป็นแค่ side-effect ของโหมดดาเมจหนึ่งในสาม [M:2/4] [R:1/3] [B:1/3] |
| **Support** | 8/10 (A) | โหมด Protector ให้ temp HP กับพวกพ้องที่อยู่ใกล้ cannon ได้ทุกเทิร์นผ่าน bonus action เดียวกับที่สั่งยิง (Explosive Cannon lv9 ยืนยันยังมีโหมดนี้ + เพิ่ม temp HP อีก 1d8) บวก Fortified Position (lv15) ให้ half cover กับตัวเองและพวกพ้องทุกคนในระยะ 10 ft จาก cannon [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Fortified Position ให้ half cover กับตัวเอง (ลด AC ที่โดน 2 แต้ม) เมื่ออยู่ใกล้ cannon แต่ผูกเงื่อนไขต้องยืนใกล้ cannon ตลอด ไม่ใช่ buff ติดตัวถาวร [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | cannon ทำหน้าที่เหมือนตัวละครที่สองที่ยิง/รักษาได้ทุกเทิร์นผ่าน bonus action สั่งเดียว (ไม่ต้องเสีย action ตัวเองไปโจมตี) และ lv15 สั่งได้ 2 cannon พร้อมกันด้วย bonus action เดิม — action-multiplier ที่ชัดเจน [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | ไม่มี utility breadth ใหม่ที่กว้างขึ้นจาก baseline (Replicate Magic Item/Magic Item Tinker) — cannon เน้น combat ล้วน = เท่า baseline [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 9/10 (S) | เลือกโหมด cannon (Flamethrower/Force Ballista/Protector) ใหม่ได้ทุกครั้งที่สร้าง และ lv15 ถือ 2 cannon ต่างโหมดพร้อมกันได้ ปรับบทบาท damage/control/support ได้กลางแคมเปญ [M:3/4] [R:3/3] [B:3/3] |

### Battle Smith (EFA)

**Overall**: A — 5 ใน 7 axis อยู่ที่ A (Damage/Support/Action Economy/Utility/Versatility) กว้างมากแต่ไม่มี axis ไหนถึง S เลยสักตัว


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Martial weapon proficiency + ใช้ Int mod กับ magic weapon attack (Arcane Empowerment), Extra Attack (lv5), และ Arcane Jolt (lv9) เพิ่ม 2d6→4d6 (lv15) force damage ต่อการโจมตีที่โดน (ใช้ได้ทั้งจากตัวเองและจาก Steel Defender) — หลายแหล่งดาเมจซ้อนกันเหมือน Armorer [M:3/4] [R:3/3] [B:2/3] |
| **Control** | 4/10 (C) | ไม่มี control feature ตรงติด chassis Battle Smith เอง — Steel Defender มี stat block ของตัวเองที่อาจมี option ทำนอง grapple/reposition แต่ไม่ปรากฏรายละเอียดเต็มในไฟล์ data class จึงให้คะแนนใกล้เคียง baseline อย่างระมัดระวัง [M:1/4] [R:2/3] [B:1/3] |
| **Support** | 7/10 (A) | Arcane Jolt เลือกใช้เป็น Restorative Energy heal 2d6→4d6 แทนดาเมจได้ (Int mod ครั้ง/วัน) บวก Steel Defender ที่ revive ได้ด้วย Smith's Tools ถ้าตายมาไม่เกิน 1 ชม. — สูงกว่า baseline เพราะมี healing option ตรงจุด แม้จะจำกัดจำนวนครั้ง [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Steel Defender เป็นร่างที่สองไว้ดึงความสนใจ/แทงค์แทน (Deflect Attack ในสแตทบล็อกของมันเอง) และฟื้นคืนชีพได้เองด้วย spell slot — เพิ่ม survivability ของทีมทางอ้อมแม้จะไม่ได้บวก HP/AC ให้ตัวผู้เล่นโดยตรง [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Steel Defender เป็นตัวละครที่สองเต็มรูปแบบที่ขยับ+ใช้ reaction เองได้ทุกเทิร์น และโจมตี/ทำ action พิเศษได้ผ่าน bonus action สั่งเดียว — action-multiplier ที่แข็งแรงที่สุดในกลุ่ม Artificer subclass ที่ทำมา (เทียบเท่า Artillerist's cannon แต่ตัว defender ยังมี full stat block ของตัวเอง) [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | ไม่มี utility breadth ใหม่ที่กว้างขึ้นจาก baseline = เท่า baseline [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Arcane Jolt เลือกดาเมจ/heal ได้ตามสถานการณ์ แต่ breadth โดยรวมไม่ได้กว้างไปกว่า baseline (prepared-reset + Replicate Magic Item) มากนัก = เท่า baseline [M:2/4] [R:3/3] [B:2/3] |

### Cartographer (EFA)

**Overall**: S — Utility และ Versatility S (9/10) พร้อมกันสองแกน บวก Support A — เป็น subclass เดียวในกลุ่มที่มี 2 axis เป็น S แม้ Damage/Action Economy จะแค่ B


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Guided Precision (lv5) บวก Int mod เข้าหนึ่ง damage roll ต่อเทิร์นเมื่อ cast Cartographer spell หรือโจมตีเป้าที่ติด Faerie Fire — reliable แต่ magnitude เท่า Alchemical Savant พอดี ไม่ใช่แหล่งดาเมจใหม่ [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | free-cast Faerie Fire (Int mod ครั้ง/วัน) ให้ advantage แก่การโจมตีทุกคนที่เล็งเป้านั้นและเปิดเผยตัวล่องหน แถม lv5 ทำให้เสีย concentration จากดาเมจไม่ได้ — เป็น control-enabler ที่ reliable และฟรีตลอดทั้งวัน สูงกว่า baseline ที่ไม่มี control เลย [M:2/4] [R:3/3] [B:1/3] |
| **Support** | 8/10 (A) | Adventurer's Atlas แจก map ให้เพื่อนสูงสุด 1+Int mod คน ให้ +1d4 initiative และ target กันข้าม cover/sight ได้ทั้งทีม บวก Superior Atlas (lv15) เป็น safety net ให้ผู้ถือ map ทุกคน (ไม่ใช่แค่ตัวเอง) รอดจาก 0 HP ได้ — breadth กว้างครอบคลุมทั้งปาร์ตี้ [M:3/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Superior Atlas ให้ตัวเอง (ในฐานะผู้ถือ map คนหนึ่ง) รอดจาก 0 HP ได้เช่นกัน (HP = 2×level + teleport หนี) แต่ปลดล็อกช้าถึง lv15 และเป็น one-shot จนกว่าจะสร้าง map ใหม่ [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 5/10 (B) | Portal Jump ใช้แค่ครึ่ง movement (ไม่ใช้ action) เพื่อ teleport 10 ft และ Ingenious Movement (lv9) แถม teleport 30 ft ให้ตัวเอง/พวกพ้องต่อท้าย Flash of Genius reaction เดิมได้ฟรี — ประหยัด action ได้จริงแต่ magnitude เป็นแค่การเคลื่อนที่ ไม่ใช่ extra attack/turn [M:1/4] [R:3/3] [B:1/3] |
| **Utility** | 9/10 (S) | free-cast Find the Path (lv15, ไม่ต้องเตรียม ไม่เสีย component) เป็น utility-spell tier สูงที่ปกติต้องใช้ 6th-level slot บวก Portal Jump teleport และ scroll-crafting ที่เร็วขึ้นครึ่งหนึ่ง — breadth utility กว้างกว่า baseline ชัดเจน [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | Adventurer's Atlas ใช้ได้ทุกสถานการณ์ (initiative, ignore-cover targeting) ไม่ผูกกับ combat type ใดโดยเฉพาะ บวก Faerie Fire ที่ใช้ได้ทั้งเป็น control/damage-enabler — ปรับใช้ได้กว้างกว่า baseline [M:3/4] [R:3/3] [B:3/3] |

### Reanimator (RHW, *Ravenloft: The Horrors Within*)

**Overall**: S — Utility และ Versatility S (9/10) พร้อมกันเหมือน Cartographer แต่กระจายกว้างกว่า (Damage/Support/Action Economy ล้วน A แทนที่จะเป็น B) — กว้างที่สุดในกลุ่มทั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Reanimated Companion's Death Burst (necrotic, เพิ่มเป็น 4d4 ที่ lv9 และ**ignore resistance**) + Jolt to Life ดัดแปลง Spare the Dying ให้ยิง lightning AoE 2d4→4d4 + Arcane Conduit (ถ้าเลือก) บวก Int mod เข้า damage roll ของ spell สาย Evocation/Necromancy — magnitude สูงแต่ Death Burst ต้องพึ่งการที่ companion ตาย (semi-consumable) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 5/10 (B) | Gaunt modification (ถ้าเลือก) ให้ companion แผ่ aura บังคับ Wisdom save หรือติด Frightened รอบตัว — เป็น control จริงที่ reliable ระดับหนึ่งแต่ต้องแลกกับ modification slot อื่น [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 7/10 (A) | Jolt to Life ฮีล Spare the Dying เป้าหมายเท่ากับ artificer level ทันทีที่ cast (ไม่ใช่แค่กันตาย) บวก Refined Reanimation (lv15) free-cast Raise Dead 1 ครั้ง/long rest — เป็น support ทั้งระดับ in-combat และ out-of-combat [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Life Transfer (lv15) reaction ดูด HP ปัจจุบันของ companion มาเป็น HP ตัวเอง (แลกกับ companion ตาย) เป็น emergency self-heal ที่ยืดหยุ่นสูงแม้เป็น one-time-per-companion [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | companion เป็นตัวละครที่สองที่ขยับ+ใช้ reaction เองได้ทุกเทิร์น สั่ง action พิเศษผ่าน bonus action เดียว เหมือน steel defender ของ Battle Smith [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | free-cast Raise Dead (lv15) เป็น utility-spell tier สูงที่ปกติต้องใช้ 5th-level slot + material component แพง บวกความสามารถ climb/swim ของ companion (ถ้าเลือก Gaunt/Moist) — breadth กว้างกว่า baseline [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 9/10 (S) | Strange/Macabre/Superior Modifications ให้เลือก build companion ได้ถึง 3 ออปชันพร้อมกันที่ lv15 จาก 5 แบบ (Arcane Conduit/Ferocity/Bloated/Gaunt/Moist) ปรับบทบาท companion ให้เข้ากับสถานการณ์ได้กว้างมาก [M:3/4] [R:3/3] [B:3/3] |
