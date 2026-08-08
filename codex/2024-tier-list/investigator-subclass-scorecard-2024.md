# Investigator — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 14 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Investigator](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 14 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Investigator, 2024)

Floor 0-10 ต่อ axis ของ **Investigator เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d8, spellcasting ability Int, Ritualist (grimoire คล้าย Wizard's spellbook มี Ritual Casting มาตรฐาน), saving throw proficiency Dex + Int, armor proficiency light เท่านั้น, weapon proficiency simple+martial, Weapon Mastery, Expertise (lv2+lv9), Finisher (lv2, extra 1d8+ ดาเมจเมื่อตีเป้าที่ Bloodied), Rushed Incantation (lv2, cast grimoire spell เป็น Bonus Action ได้ 3+ ครั้ง/วัน), Trinkets (lv3, 2+ ใช้/วันจาก subclass), Exploit Weakness (lv5, ให้ Vulnerability + ลบ Resistance ชั่วคราว), Holy Trinkets (lv7, Amulet of Warding=บัฟ AC/save ally, Restorative Ankh=ฮีล ally, Rune of Banishment), Improved Finisher (lv11), Enigma Arcane (lv13/15/17, cast คาถา lv7-9 ฟรีจากลิสต์ Teleport/Mind Blank/Gate ฯลฯ), Supernatural Resolve (lv18), Spellbinder (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Exploit Weakness (lv5, ไม่กิน resource) ให้เป้าที่ตีติด **Vulnerability** ต่อชนิดดาเมจที่เลือก + ลบ Resistance ชั่วคราว เป็นตัวคูณดาเมจที่แรงมากถ้าใช้ถูกจังหวะ บวก Finisher (lv2) ให้ extra 1d8+ ดาเมจเมื่อตีเป้าที่ Bloodied (ใช้ได้กับเป้าไม่ Bloodied ด้วยที่ lv11) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 5/10 (B) | Holy Trinkets (lv7) มี Rune of Banishment เป็นตัวเลือกที่ใช้ Trinkets charge (2-4 ใช้/วัน) เป็น control เฉพาะทางที่จำกัดด้วย resource pool เดียวกับ heal/buff [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 6/10 (B) | Holy Trinkets ให้ Amulet of Warding (Bonus Action, บวก Int mod เข้า AC+saving throw ของ ally ในระยะ 60ft จนถึงเทิร์นถัดไป) และ Restorative Ankh (Bonus Action, ฮีล ally เท่า Investigator level+Int mod) จากคลัง Trinkets เดียวกัน (2-4 ใช้/วัน ฟื้น 1/short rest) [M:2/4] [R:2/3] [B:2/3] |
| **Survivability** | 3/10 (C) | HD d8 + armor proficiency แค่ light + saving throw proficiency Dex (หลบ AoE บ่อย) เป็นฐานกลางๆ ไม่มี resistance/self-heal ติด baseline นอกจาก Supernatural Resolve (lv18, Advantage saving throw ต้านคาถา/magic) ที่ปลดล็อกช้ามาก [M:1/4] [R:1/3] [B:1/3] |
| **Action Economy** | 6/10 (B) | Rushed Incantation (lv2) เปลี่ยนคาถาในกริมัวร์ที่ปกติเป็น action ให้กลายเป็น **Bonus Action** ได้ 3+ ครั้ง/วัน (ฟื้น 1/short rest) เป็นการประหยัด action ที่ยืนยันได้ชัดเจน บวก Exploit Weakness/Finisher ที่เป็น rider บนการตีที่ตีอยู่แล้วไม่กิน action เพิ่ม [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Enigma Arcane (lv13-17) ให้เลือก cast คาถาระดับ 7-9 **ฟรีไม่เสีย slot** 1 ครั้ง/long rest ต่อระดับ จากลิสต์ที่ทรงพลังที่สุดในเกม (Teleport, Mind Blank, Antimagic Field, Gate, Astral Projection, Weird) — magnitude สูงมากแม้จะปลดล็อกช้าและเลือกได้แค่ 1 ตัว/ระดับ [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Trinkets/Holy Trinkets ให้สลับใช้ heal/buff/banish จาก resource pool เดียวได้ตามสถานการณ์ บวก Enigma Arcane ที่เลือกคาถา utility ระดับสูงให้ตรงกับปัญหาที่แคมเปญเจอ (เดินทาง/แทรกซึม/ต้านเวทย์) แม้จะเลือกได้แค่ 1 ตัว/ระดับไม่ใช่ทั้งลิสต์ [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (14)

**Class Baseline อ้างอิง**: Damage 7, Control 5, Support 6, Survivability 3, Action Economy 6, Utility 7, Versatility 6

13 จาก 14 subclass มาจาก `Valda's Spire of Secrets 2024` (ไม่มี 🕰️) ยกเว้น **Infernal Agent** ที่มีแค่ในไฟล์ 2014 (`ValdaSpireExtras`) — 🆕 ไม่เคยถูกวิเคราะห์มาก่อนในไฟล์ tier-list เก่า และไม่มี reprint 2024 จึงเป็น orphan ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) หมายเหตุ: เนื้อหา Trinkets ของแต่ละ subclass (สเปลฟรีที่เลือกได้ 3 ตัว) คือสิ่งที่กำหนดว่า subclass นั้นเสริมแกนไหนเป็นหลัก เพราะ baseline Trinkets เองไม่มีสเปลติดตัวเลย

| Subclass | Overall | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|---|
| Antiquarian | S | ValdaSpire24 | 9 (S) | 6 (B) | 7 (A) | 7 (A) | 7 (A) | 9 (S) | 8 (A) |
| Archivist | B | ValdaSpire24 | 7 (A) | 6 (B) | 6 (B) | 3 (C) | 6 (B) | 10 (S) | 8 (A) |
| Conspiracy Theorist | A | ValdaSpire24Extras | 8 (A) | 5 (B) | 6 (B) | 5 (B) | 7 (A) | 8 (A) | 7 (A) |
| Containment Specialist | A | ValdaSpire24Extras | 7 (A) | 8 (A) | 6 (B) | 3 (C) | 6 (B) | 9 (S) | 7 (A) |
| Detective | A | ValdaSpire24 | 8 (A) | 6 (B) | 6 (B) | 5 (B) | 7 (A) | 9 (S) | 7 (A) |
| Exterminator | A | ValdaSpire24 | 9 (S) | 6 (B) | 6 (B) | 7 (A) | 8 (A) | 7 (A) | 7 (A) |
| Infernal Agent | A | ValdaSpireExtras 🕰️ | 9 (S) | 6 (B) | 6 (B) | 5 (B) | 7 (A) | 7 (A) | 8 (A) |
| Infernum | S | ValdaSpire24Extras | 9 (S) | 7 (A) | 6 (B) | 5 (B) | 8 (A) | 8 (A) | 8 (A) |
| Inquisitor | S | ValdaSpire24 | 9 (S) | 8 (A) | 8 (A) | 5 (B) | 8 (A) | 7 (A) | 8 (A) |
| Kid Sleuth | S | ValdaSpire24Extras | 7 (A) | 7 (A) | 9 (S) | 5 (B) | 8 (A) | 8 (A) | 8 (A) |
| Medium | S | ValdaSpire24 | 8 (A) | 5 (B) | 8 (A) | 6 (B) | 7 (A) | 9 (S) | 8 (A) |
| Occultist | A | ValdaSpire24 | 9 (S) | 8 (A) | 6 (B) | 3 (C) | 8 (A) | 9 (S) | 8 (A) |
| Spy | A | ValdaSpire24 | 8 (A) | 6 (B) | 6 (B) | 5 (B) | 7 (A) | 9 (S) | 7 (A) |
| Time Operative | S | ValdaSpire24Extras | 9 (S) | 5 (B) | 6 (B) | 6 (B) | 9 (S) | 9 (S) | 8 (A) |

---

### Antiquarian (ValdaSpire24)

**Overall**: S — Damage และ Utility เป็น S ทั้งคู่ บวก Survivability กระโดด +4 (C→A) และขยับตามอีก 3 axis กว้างที่สุดในกลุ่ม มีแค่ Control ที่นิ่ง


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Trinkets ปลดล็อก Scorching Ray ฟรี + Arcane Relics (lv6) ปลดล็อก Fireball/Lightning Bolt ฟรี + Soul Jar's Draining Touch (lv14, 8d8 necrotic + ฮีลตัวเองเท่าดาเมจที่สร้าง) — คลังดาเมจฟรีที่หลากหลายที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Hateful Arrowhead ปลดล็อก Ray of Enfeeblement ฟรี (debuff เบาๆ) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 7/10 (A) | Razortooth Bandages ปลดล็อก Cure Wounds ฟรี พร้อมบวก Investigator level เข้าไปในค่าฮีล [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 7/10 (A) | Warped Prism ปลดล็อก Shield ฟรี + Soul Jar ให้ temp HP (bonus action) และ Undead Fortitude (ตกลง 1 HP แทน 0 เมื่อควรตาย) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | ความสามารถ Soul Jar ทั้งหมดเป็น bonus action (temp HP, ฟื้น Trinket use) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Magic Item Collection (lv10, สร้างไอเทมวิเศษฟรีทุก Long Rest จากลิสต์ทรงพลัง เช่น Carpet of Flying, Ring of Telekinesis) + Lich's Deathmask ปลดล็อก Dispel Magic/Counterspell ฟรี — utility toolkit ที่กว้างที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เลือกได้จากคลัง Trinket/Relic ที่ครอบคลุมดาเมจ/ป้องกัน/ฮีล/utility พร้อมสลับไอเทมวิเศษได้ทุก Long Rest [M:2/4] [R:3/3] [B:3/3] |

### Archivist (ValdaSpire24)

**Overall**: B — Utility พุ่งเป็น 10/10 (S) เต็มสเกล แต่มีแค่ Versatility ที่ขยับตามเล็กน้อย อีก 5 axis นิ่งสนิทรวมถึง Survivability ที่อ่อนสุดของ baseline


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ที่ยืนยันได้ (ขึ้นกับ Thesis ที่เลือก) = เท่า baseline |
| **Control** | 6/10 (B) | Erudite Spell (บังคับ Disadvantage บน save ต้าน spell ตัวเอง 1 เป้า) เสริม control spell ที่เตรียมไว้ [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ที่ยืนยันได้ = เท่า baseline |
| **Survivability** | 3/10 (C) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 6/10 (B) | Eidetic Memory ใช้ Rushed Incantation ที่ baseline มีอยู่แล้ว ไม่นับเป็น economy gain ใหม่ = เท่า baseline |
| **Utility** | 10/10 (S) | Thesis ให้สเปล ritual-tag ฟรีตามหัวข้อที่เลือก (สลับได้ทุกเลเวล) + Encyclopedic Expertise (lv10, ระบุ spell/item/creature effect ใดๆ ฟรีไม่ต้องทอย) + Eidetic Memory (lv14, ก็อปปี้ spell ที่เห็น/ได้ยินเข้ากริมัวร์ฟรี + แคสสเปลที่เห็นได้โดยไม่เสีย slot) — ระบบความรู้ที่กว้างที่สุดในกลุ่ม [M:4/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Thesis เลือกได้ 4 หัวข้อ (Corpus/Mentis/Mortis/Oculus) สลับได้ทุกเลเวล ปรับ toolkit ตามสถานการณ์ [M:2/4] [R:3/3] [B:3/3] |

### Conspiracy Theorist (ValdaSpire24Extras)

**Overall**: A — ขยับขึ้น 5 axis แบบกลางๆ (Damage/Survivability/AE/Utility/Versatility) กว้างแต่ไม่มี peak ถึง S เลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Masonic Charm (ขยาย crit range เป็น 10-19 นาน 1 นาที) + Unfathomable Metal (2d6 radiant ต่อเนื่อง) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ (Trinket ทั้งหมดเน้นตัวเอง) = เท่า baseline |
| **Survivability** | 5/10 (B) | Off the Grid (lv14, reaction Invisible เมื่อโดนดาเมจ) [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Three-Headed Coin (การันตี Advantage ก่อนทอยได้ทันที) + Arcane Relics (Advantage บน Ready reaction) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 8/10 (A) | Connect the Dots (lv10, สลับ Expertise skill ได้ทุกครั้งที่พัก) + Off the Grid (แคส Nondetection ฟรี) [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผสมดาเมจ/reliability/stealth ตามธีมทฤษฎีสมคบคิด [M:2/4] [R:2/3] [B:3/3] |

### Containment Specialist (ValdaSpire24Extras)

**Overall**: A — Control กระโดด +3 (B→A) บวก Utility เป็น S แต่ Survivability (จุดอ่อนสุดของ baseline) ไม่ถูกแตะเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม control/utility ล้วน) = เท่า baseline |
| **Control** | 8/10 (A) | Containment Dimension (lv14, บังคับย้ายเป้าที่เลือกไปมิติกักกัน 10 นาที — เท่ากับ lockdown เต็มรูปแบบ) + Arcane Disruption (ปิด Magic Resistance ของเป้า Exploit Weakness) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ (Black Bag เป็น personal storage) = เท่า baseline |
| **Survivability** | 3/10 (C) | ไม่มี feature ป้องกันตัวเองใหม่ (Cover Story เป็น social ไม่ใช่ combat) = เท่า baseline |
| **Action Economy** | 6/10 (B) | Trinket ทั้งหมดเป็น bonus action ที่ baseline มีโครงสร้างอยู่แล้ว = เท่า baseline |
| **Utility** | 9/10 (S) | Black Bag (extradimensional storage พร้อม Antimagic Field) + Cinnabar Compass (Locate Object ฟรี) + Nothing to See Here (lv10, Modify Memory 3 เป้าฟรี) — investigation utility ที่ครบเครื่องที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผสม control(lockdown)/social/utility ในธีมนักสืบสายลึกลับ [M:2/4] [R:2/3] [B:3/3] |

### Detective (ValdaSpire24)

**Overall**: A — ขยับขึ้น 5 axis กลางๆ บวก Utility เป็น S หนึ่งแกน กว้างพอสมควร


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Predictive Intuition (bonus action, +1d6 การโจมตีใส่เป้าจนถึงเทิร์นถัดไป, ไม่จำกัดเป้าที่ lv14) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Predictive Intuition ลบ 1d6 จากการโจมตีของเป้าใส่ตัวเองด้วย เป็น soft-debuff [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 5/10 (B) | Predictive Intuition ลดการโจมตีของเป้าใส่ตัวเองได้จริง (-1d6) [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Predictive Intuition เป็น bonus action ให้ผลต่อเนื่องจนจบเทิร์นถัดไป [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Interrogator's Instinct (lv10, ตรวจจับ cursed/possessed/charmed/frightened + Advantage แยกภาพลวงตา/คำโกหก) — investigative utility ครบเครื่อง [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | นักสืบ-นักต่อสู้ hybrid ที่ผสม damage-buff/debuff เข้ากับ investigation [M:2/4] [R:2/3] [B:3/3] |

### Exterminator (ValdaSpire24)

**Overall**: A — Damage เป็น S บวก Survivability กระโดด +4 (C→A) และ Action Economy/Versatility ขยับตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Mimic-Tooth Necklace (2d8 acid เสริม) + Monster Slayer (bonus action ตีเพิ่ม, Int mod ครั้ง/วัน) + Killer Instinct (lv14, ใช้ Exploit Weakness ได้ 2 ครั้ง/เทิร์นกับ 2 เป้า) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Silvered Edge (lv10, สลับ mastery property เป็น Sap/Vex ได้) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 7/10 (A) | Silvered Shield (armor training medium+shield จาก light-only ของ baseline + ใช้ Int แทน Dex คำนวณ AC) + Gilded Dragon Scale (resistance ธาตุที่เลือก) [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Monster Slayer (bonus action ตีเพิ่ม, Int mod ครั้ง/วัน ฟื้น 1/short rest) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน (เน้นคอมแบตล้วน) = เท่า baseline |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญล่าสัตว์ประหลาดที่เป็นทั้ง tank(medium armor) และ striker [M:2/4] [R:2/3] [B:3/3] |

### Infernal Agent (ValdaSpireExtras 🕰️)

**Overall**: A — Damage เป็น S บวกขยับกลางๆ อีก 3 axis (Survivability/AE/Versatility)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Sinister Emblem เลือกได้ Fist (natural weapon 1d10+Str) หรือ Shadow (pet โจมตีเองได้) บวก Broken Ankh (2d10 เสริม vs celestial/elemental/fiend) + Kick 'em While They're Down (extra 2d6 เมื่อมี Advantage) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Horns option ปลดล็อก Charm Person ฟรี (2 ครั้ง/rest) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | Shadow option ใช้ Help action แทนได้ (bonus action) แต่เป็น utility เฉพาะทางแคบ = เท่า baseline |
| **Survivability** | 5/10 (B) | Fist option ลดดาเมจ B/P/S จากอาวุธไม่วิเศษ 3 แต้มถาวร [M:2/4] [R:1/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Shadow option สั่งงานผ่าน bonus action ได้ทั้งเคลื่อนที่+โจมตี+Help — เท่ากับได้ผู้ช่วยตัวที่สอง [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 7/10 (A) | Hide the Body (ซ่อนหลักฐานอาชญากรรม) + Glass Demon's Eye (darkvision 120ft) เป็น utility เฉพาะทาง = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | 3 build ที่ต่างกันสิ้นเชิงจาก Sinister Emblem (tank-เมลี/caster/pet-summoner) ให้ toolkit กว้างมาก [M:2/4] [R:3/3] [B:3/3] |

### Infernum (ValdaSpire24Extras)

**Overall**: S — Damage เป็น S บวกขยับขึ้นอีก 5 axis พร้อมกัน (Control/Survivability/AE/Utility/Versatility) กว้างมาก มีแค่ Support ที่นิ่ง


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Diabolical Barb ปลดล็อก Hellish Rebuke ฟรี + Hexagram Pendant ปลดล็อก Hex ฟรี + Infernal Bargain "Damage and Actions" (แลก necrotic dmg ตัวเองเป็น action เพิ่มสำหรับตีอีกครั้ง) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 7/10 (A) | Hex (debuff check) + Spiteful Distraction (bonus action, familiar บังคับ Disadvantage การโจมตีถัดไปของศัตรู) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ (Fiendish Familiar เป็นของส่วนตัว) = เท่า baseline |
| **Survivability** | 5/10 (B) | Infernal Bargain "Resistance and Vulnerability" ให้เลือก resistance 2 ธาตุ (แลกด้วย vulnerability 1 ธาตุที่ GM เลือก) [M:2/4] [R:1/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Infernal Bargain's extra action (1 ครั้ง/เทิร์น แลกดาเมจ necrotic) + familiar ที่ลงมือเองได้อิสระ [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Binding Contract (lv10, Geas ฟรีแบบสัญญาเขียนละเอียดได้ 10 เงื่อนไข นานสูงสุด 90 วัน) + Blindsight bargain option [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Hybrid pet-summoner/caster/damage พร้อม build-defining choice จาก Infernal Bargain ทุกวัน [M:2/4] [R:3/3] [B:3/3] |

### Inquisitor (ValdaSpire24)

**Overall**: S — Damage เป็น S บวก Control/Support ขยับเป็น A ทั้งคู่ และขยับตามอีก 3 axis กว้างที่สุดในกลุ่ม มีแค่ Utility ที่นิ่ง (แต่ Utility เป็น A ของ baseline อยู่แล้ว)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Divine Strike (extra 1d8 necrotic/radiant ทุกเทิร์นที่ตีโดน) + Excommunication (lv14, 6d6 radiant/เทิร์นต่อเนื่อง + ห้ามฮีล) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | Excommunication ห้ามเป้าฮีลและห้ามมี Advantage บน d20 test ใดๆ นาน 1 นาที (save-ends) — debuff ที่ครอบคลุมมาก [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Alabaster Balm ปลดล็อก Lesser Restoration ฟรี + Rote Piety (lv10, ใช้ Holy Trinkets เพิ่ม 3 ครั้งโดยไม่แตะ Trinkets pool หลัก) — ขยายกำลังฮีล/บัฟของ baseline อย่างมาก [M:2/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Consecrated Armor (AC 13+Dex จาก spell ที่แคสเองได้ฟรี) [M:2/4] [R:1/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Rote Piety ให้ Holy Trinkets ใช้เพิ่มฟรี 3 ครั้งโดยไม่กิน resource เดิม — resource multiplier ที่แท้จริง [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Dogma (ปัดผล Religion check ต่ำเป็น 10) + Detect Thoughts เฉพาะอารมณ์ลบ = ใกล้เท่า baseline |
| **Versatility** | 8/10 (A) | ผสมดาเมจ/control/support/survivability ครบทุกแกนในธีมนักบวชศักดิ์สิทธิ์ [M:2/4] [R:3/3] [B:3/3] |

### Kid Sleuth (ValdaSpire24Extras)

**Overall**: S — Support เป็น S (9/10) สูงสุดในกลุ่ม บวกขยับตามอีก 5 axis (Control/Survivability/AE/Utility/Versatility) มีแค่ Damage ที่นิ่ง (แต่เป็น A ของ baseline อยู่แล้ว)


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม support/utility ล้วน) = เท่า baseline |
| **Control** | 7/10 (A) | Bag of Traps (caltrops/hunting trap/manacles ฯลฯ เป็น battlefield control tool) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 9/10 (S) | Dooby Snack (temp HP+Advantage ให้ ally ที่กิน) + Split Up Gang (ให้ ally เคลื่อนที่ฟรีตอนใช้ Exploit Weakness) + Meddling Kids (lv14, reaction กด Disadvantage การโจมตีที่จะโดน ally ใกล้ตัว) — protector kit ที่หนาแน่นที่สุดในกลุ่ม [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 5/10 (B) | Cunning Companion (lv10, ได้ผล Dash/Disengage/Hide ฟรีตามที่สัตว์เลี้ยงทำ) [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 8/10 (A) | Split Up Gang ไม่เสีย action เพิ่ม + Cunning Companion ได้ผลฟรีจาก action ของสัตว์เลี้ยง [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 8/10 (A) | Bag of Traps (ไอเทม utility/trap หลายแบบ) + Magnifying Glass (Clue spell + ระบุรอยเท้า/ลายนิ้วมือ) [M:2/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสม support/control/utility ผ่านสัตว์เลี้ยง+trinket ในธีมนักสืบเด็ก [M:2/4] [R:3/3] [B:3/3] |

### Medium (ValdaSpire24)

**Overall**: S — Utility เป็น S บวกขยับขึ้นอีก 5 axis พร้อมกัน (Damage/Support/Survivability/AE/Versatility) กว้างเทียบเท่า Kid Sleuth มีแค่ Control ที่นิ่ง


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Foretold Demise (แทนที่ damage die ด้วยผลทอย Foretelling ที่ล็อกไว้ล่วงหน้า — ใช้เป็นเลขสูงสุดได้) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 8/10 (A) | Foretelling ใช้แทน d20 test ของ**ใครก็ได้ที่เห็น**รวมถึง ally ได้ — การันตีผลสำคัญของเพื่อนร่วมทีมได้จริง [M:2/4] [R:3/3] [B:3/3] |
| **Survivability** | 6/10 (B) | Foretelling ใช้แทน saving throw ของตัวเองได้ + Lucent Mirror (partial ethereal phase หนีได้) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Foretelling roll ประกาศใช้ก่อนทอยแบบไม่เสีย action เลย [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Third Eye (lv14, แคส True Seeing ฟรี + Advantage การโจมตีแรกทุกเทิร์นระหว่างฤทธิ์) + Whispers from Beyond (lv10, คำใบ้จาก GM ฟรี) — divination utility ที่ทรงพลัง [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Foretelling ใช้แทน d20 test ได้ทุกประเภททั้งของตัวเองและคนอื่น — ยืดหยุ่นแบบไม่ผูก build [M:2/4] [R:3/3] [B:3/3] |

### Occultist (ValdaSpire24)

**Overall**: A — Damage และ Utility เป็น S ทั้งคู่ บวก Control ขยับเป็น A แต่ Survivability (จุดอ่อนสุดของ baseline) ไม่ถูกแตะเลยสักตัว ต่างจาก Antiquarian/Exterminator/Infernum/Inquisitor ที่แก้จุดนี้ไปแล้ว


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | เข้าถึง cantrip/spell ของ Warlock (Eldritch Blast ที่แนะนำ) + Maleficium (lv14, Exploit Weakness → Bestow Curse ฟรีเป็น bonus action) [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 8/10 (A) | เข้าถึง control spell ของ Warlock (Hex, Charm Person) + Maleficium (Bestow Curse ผูกกับ Exploit Weakness) [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 3/10 (C) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 8/10 (A) | Eldritch Ruin (แคส cantrip Warlock เป็น bonus action, Int mod ครั้ง/วัน) + Maleficium (Bestow Curse ฟรีเป็น bonus action) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 9/10 (S) | Eyes of Another World (lv10, เห็นล่องหน/ระนาบวิญญาณ + รู้ว่าเป้าแคสสเปลได้ไหม + ระบุชนิด/ระนาบต้นกำเนิดของสิ่งมีชีวิตเหนือธรรมชาติ) — detection utility ครบเครื่อง [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Hybrid Warlock-gish เต็มรูปแบบพร้อม detection utility [M:2/4] [R:3/3] [B:3/3] |

### Spy (ValdaSpire24)

**Overall**: A — Utility เป็น S บวกขยับกลางๆ อีก 5 axis (Damage/Control/Survivability/AE/Versatility) กว้างแต่ magnitude ต่อแกนไม่สูงเท่า Antiquarian


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Cloak and Dagger (extra Force dmg เท่า Investigator level ตอนเปิดฉากรบหรือมี Advantage) [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | Martini Glass ปลดล็อก Charm Person ฟรี [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ (เน้นตัวเองเป็นสายลับเดี่ยว) = เท่า baseline |
| **Survivability** | 5/10 (B) | Glass Dust (AoE Invisible รวมตัวเองได้) [M:1/4] [R:2/3] [B:2/3] |
| **Action Economy** | 7/10 (A) | Glib (lv14, Influence action เป็น bonus action) [M:2/4] [R:3/3] [B:2/3] |
| **Utility** | 9/10 (S) | Body Double (lv10, ปลอมตัวเป็นบุคคล/ศพที่แตะได้สมบูรณ์แบบ) + Horn-Rimmed Glasses (Disguise Self ฟรี) + Glib (แคส Glibness ฟรี) — spy toolkit ครบเครื่อง [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญสายลับ (social+stealth+opener damage) [M:2/4] [R:2/3] [B:3/3] |

### Time Operative (ValdaSpire24Extras)

**Overall**: S — 3 axis เป็น S พร้อมกัน (Damage, Action Economy, Utility) มากที่สุดในกลุ่มทั้งหมด บวก Survivability ก็ขยับตามด้วย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Borrowed Time ให้ action พิเศษ (รวม Attack 1 ครั้ง) 1 ครั้ง/เทิร์น 2 ครั้ง/long rest — ดาเมจส่วนเพิ่มที่แท้จริงจาก extra action [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 6/10 (B) | ไม่มี feature เสริมทีมใหม่ (Rewind เป็นการรีรอลของตัวเอง) = เท่า baseline |
| **Survivability** | 6/10 (B) | Rewind (bonus action รีรอล d20 test ที่ล้มเหลว รวม saving throw, Int mod ครั้ง/วัน) [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 9/10 (S) | Borrowed Time เป็น action พิเศษจริงๆ ไม่ใช่แค่ bonus action ที่ baseline แรงอยู่แล้ว บวก Steal Time (lv14, ฟื้น use ตอน short rest หรือฆ่าศัตรู) — economy feature ที่แรงที่สุดในกลุ่ม [M:4/4] [R:2/3] [B:3/3] |
| **Utility** | 9/10 (S) | Echo of Yesterday (lv10, มองย้อนสถานที่ 24 ชม.ที่ผ่านมาได้) เป็น investigative scrying tool ที่ทรงพลัง [M:3/4] [R:3/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ผสม extra-action economy + reroll reliability + investigative utility ในธีมสายลับข้ามเวลา [M:2/4] [R:3/3] [B:3/3] |
