# Channeler — Subclass Scorecard (2024) 🕰️

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 4 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Channeler](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 4 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2014.json` — source `ValdaSpireExtras` — **🕰️ Channeler ไม่มี reprint ในไฟล์ Valda's Spire 2024** (มีแค่คลาส Alchemist/Captain/Craftsman/Investigator/Martyr/Necromancer/Vagabond/Warden/Warmage/Witch/Dancer เท่านั้นที่ได้ reprint 2024) จึงใช้กลไก/ตัวเลขจากเวอร์ชัน 2014 ทั้งหมดตามกติกา 2014-only orphan ของโปรเจกต์

---

## Class Baseline (Channeler, 2014) 🕰️

Floor 0-10 ต่อ axis ของ **Channeler เปล่าๆ ไม่นับ subclass (Planar Order) feature ใดๆ เลย** — HD d10, spellcasting ability Int แบบ **Arcana Point** (pool แต้มแปลงเป็น spell slot 1-5 เอง ไม่ใช่ slot ตรงๆ แบบ caster ทั่วไป), cantrip 3→4, saving throw proficiency Con + Int, armor proficiency light/medium/heavy (ไม่มี shield), weapon proficiency simple+martial, Fighting Style (lv2), Arcane Reverberation (lv1), Spell Channeling (lv2, Bonus Action แทนที่ spell attack ด้วย melee weapon attack ที่ได้ผลคาถาด้วย), Planar Focus (lv3, Bonus Action สลับ 4 stance ธาตุ), Combat Channeling (lv5, Spell Channeling ตีได้ 2 เป้า), Extra Attack (lv5), Null Arcane (lv6, reaction ยกเลิกคาถาศัตรู), Combat Channeling Improvement (lv11), Greater Focus (lv14, +3 stance), Planeshifter (lv18), Nexus Arcane (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Extra Attack (lv5) บวก Spell Channeling (lv2, Bonus Action) ให้แทนที่ spell attack ด้วยการตีอาวุธที่ได้ผลคาถาด้วยในตีเดียว และ Combat Channeling (lv5) อัปเกรดให้ตีได้ 2 เป้าพร้อมกัน (รวมเป้าเดียวกันได้ที่ lv11 สำหรับ burst) บวก Planar Focus แบบ Fire (reroll damage die ที่ทอยได้ 1-2) — hybrid martial-caster ที่ดาเมจสูงจากทั้งสองทาง [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature เฉพาะติด chassis นอกเหนือจาก spell ที่เลือกเตรียมเอง (ไม่มีรายละเอียด Channeler spell list มาตรวจสอบเพิ่ม) [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีม/ฮีล/บัฟ ally ติด class baseline เลยแม้แต่ตัวเดียว |
| **Survivability** | 6/10 (B) | Armor proficiency ครบถึง heavy (ไม่มี shield) + HD d10 เป็นฐานที่แข็ง เสริมด้วย Planar Focus แบบ Earth (+2 AC ตอนไม่ถือ shield) หรือ Air (+10 speed, ลุกจาก prone ฟรี, ศัตรู Disadvantage ตอน opportunity attack ใส่เรา) สลับกันได้เป็น Bonus Action ทุกเทิร์น [M:2/4] [R:2/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Spell Channeling ให้ผล spell + weapon attack มาพร้อมกันด้วย Bonus Action เดียว บวก Planar Focus สลับ stance ได้เป็น Bonus Action ทุกเทิร์น — ไม่มี extra-action nova แต่ประหยัด action ได้สม่ำเสมอ [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Planeshifter (lv18) ให้ cast Plane Shift ฟรี 1 ครั้ง/long rest และ Planar Focus แบบ Paradise (lv14, บินได้) เป็น utility ทรงพลังแต่ปลดล็อกช้ามาก Arcane Reverberation (lv1) เป็น detect-magic เฉพาะทางแคบ [M:2/4] [R:1/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Planar Focus ให้สลับ stance ได้ทุกเทิร์นด้วย Bonus Action จากเมนูที่โตขึ้นเรื่อยๆ (4 ตัว lv3 → 7 ตัวที่ lv14) ครอบคลุมทั้ง mobility/AC/ดาเมจ/ฟื้น resource/บิน/free-spell ปรับ role รายเทิร์นได้กว้างมากจากฟีเจอร์เดียว [M:2/4] [R:3/3] [B:2/3] |

---

## Subclass Scoring (4)

**Class Baseline อ้างอิง**: Damage 7, Control 3, Support 0, Survivability 6, Action Economy 6, Utility 4, Versatility 7

ทั้ง 4 Planar Order มาจากไฟล์เดียวกัน (`ValdaSpireExtras`, 2014-only 🕰️) มีโครงสร้างเหมือนกันหมด: cantrip 3→4 จาก list เฉพาะทาง + "Portal Key" item เฉพาะทาง (lv1) + Bonus Planar Focus option ใหม่ (lv7) + feature รบ (lv10) + capstone (lv15) ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น)

| Subclass | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Order of Blinknights | ValdaSpireExtras 🕰️ | 7 (A) | 3 (C) | 0 (D) | 8 (A) | 6 (B) | 6 (B) | 8 (A) |
| Order of Dimensional Magi | ValdaSpireExtras 🕰️ | 8 (A) | 5 (B) | 0 (D) | 7 (A) | 6 (B) | 7 (A) | 8 (A) |
| Order of Titanfists | ValdaSpireExtras 🕰️ | 9 (S) | 6 (B) | 0 (D) | 6 (B) | 8 (A) | 4 (C) | 8 (A) |
| Order of Wild Hunters | ValdaSpireExtras 🕰️ | 8 (A) | 3 (C) | 0 (D) | 7 (A) | 7 (A) | 6 (B) | 8 (A) |

---

### Order of Blinknights (ValdaSpireExtras 🕰️)

> **คอนเซปต์**: melee weapon-bond channeler ที่ teleport ผ่าน Ethereal Plane และแท็งค์ด้วย temp HP ward

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Arcane Edge (lv15) แปลง spell-channeled melee attack ที่โดนให้กลายเป็น critical hit ได้ 1 ครั้ง/short-long rest — magnitude สูงแต่ใช้ได้แค่ครั้งเดียวต่อการพัก ไม่พอเพิ่มคะแนนเกิน baseline [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย = เท่า baseline |
| **Survivability** | 8/10 (A) | Spellstrike Ward (lv10, bonus action) สร้าง temp HP pool 5 แต้ม ที่ฟื้นเพิ่ม Int mod ทุกครั้งที่ตีโดนศัตรูด้วยอาวุธ (สูงสุด 2×level) — เป็น self-sustain tank loop ที่แข็งกว่า baseline เดิมชัดเจน [M:3/4] [R:3/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Ethereal Focus (lv7) เป็นแค่ตัวเลือก Planar Focus เพิ่ม ไม่ใช่ economy gain ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | Ethereal Focus (bonus action, spend สูงสุด 3 AP = teleport ไกลสุด 45ft ไปจุดที่เห็น) ใช้ได้ทั้งในและนอกการต่อสู้เพื่อข้ามสิ่งกีดขวาง/เข้าถึงพื้นที่ปิด เป็น utility ที่กว้างกว่า baseline [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | Ethereal Focus เพิ่มตัวเลือกที่ 5 เข้าไปใน Planar Focus menu ของ baseline (mobility เพิ่มเติมจากที่มีอยู่แล้ว) ทำให้สลับ role รายเทิร์นได้กว้างขึ้นอีกขั้น [M:2/4] [R:3/3] [B:3/3] |

### Order of Dimensional Magi (ValdaSpireExtras 🕰️)

> **คอนเซปต์**: scholar-channeler ที่ผูกกับสมุดคาถา ritual caster + ยืม spell wizard ระดับสูงมาใช้ฟรี

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Secret Arcana (lv15) รู้ spell wizard 3 ตัวระดับ 7 หรือต่ำกว่าตามใจเลือก แคสฟรีไม่เสีย slot/AP ได้ 1 ครั้ง/long rest — ถ้าเลือก damage spell (เช่น blast ระดับสูง) ได้ nova magnitude สูงมาก แต่ reliability ต่ำเพราะใช้ได้แค่ครั้งเดียวและต้องเลือกล่วงหน้า [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | Secret Arcana เลือกเป็น control spell ระดับสูง (เช่น hold monster) ได้เช่นกัน เพิ่ม breadth ให้แกน control ที่ baseline แทบไม่มีอะไรเลย [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมโดยตรง — ritual spellbook เลือกได้แค่ spell ที่มี ritual tag เท่านั้น ไม่ครอบคลุม support ทั่วไป = เท่า baseline |
| **Survivability** | 7/10 (A) | Phase Shift (lv10, action, 1 นาที) ลดดาเมจ bludgeoning/piercing/slashing ลง Int mod ทุกครั้งที่โดน — mitigation tool ที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Shadowfell Focus (lv7) เป็นแค่ตัวเลือก Planar Focus เพิ่ม ไม่ใช่ economy gain ใหม่ = เท่า baseline |
| **Utility** | 7/10 (A) | Portal Key: Book ให้จารึก ritual spell จาก class list ใดก็ได้ (ไม่นับเข้าจำนวน spell ที่รู้) แคสเป็น ritual ได้ไม่จำกัด — ขยาย utility toolkit นอกการต่อสู้กว้างกว่า baseline ชัดเจน [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | Shadowfell Focus (invisibility ผ่าน bonus action) เพิ่มตัวเลือกที่ 5 เข้า Planar Focus menu บวก Secret Arcana ให้เข้าถึง spell pool ของ wizard ทั้งเล่ม — ปรับ role ได้กว้างกว่า baseline [M:2/4] [R:3/3] [B:3/3] |

### Order of Titanfists (ValdaSpireExtras 🕰️)

> **คอนเซปต์**: brawler-channeler ที่ผูกกับ battlefist คู่ ชกแบบ dual-wield ไม่ต้องมีมือว่าง

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Portal Key: Battlefist ให้ตีด้วย battlefist อีกข้างเป็น bonus action ทุกครั้งที่ใช้ Attack action (ไม่ต้องเสีย resource ใดๆ) เท่ากับได้ attack เพิ่มถาวรทุกเทิร์นตั้งแต่ lv1 บวก Meteor Blow (lv15) ที่ให้ดาเมจเสริม 4d6 + AoE prone รอบเป้า — ดาเมจสูงกว่า baseline ทั้ง magnitude และ reliability ชัดเจน [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Concussive Strike (lv10, spend 2 AP เมื่อตีโดน) บังคับ Con save หรือ dazed (เสีย advantage โจมตี + Dex save) บวก Meteor Blow (lv15) บังคับ Dex save หรือล้ม prone เป็นวงกว้าง — เพิ่ม control tool จริงที่ baseline ไม่มีเลย [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย = เท่า baseline |
| **Survivability** | 6/10 (B) | Olympus Focus (enlarge เท่านั้น ไม่มี defense mitigation ตรง) ไม่นับเป็นการเพิ่ม survivability อย่างมีนัยสำคัญ = เท่า baseline |
| **Action Economy** | 8/10 (A) | bonus-action battlefist attack ฟรีทุกเทิร์นที่ใช้ Attack action เป็น economy gain ที่ reliable สุด (ไม่มีเงื่อนไข ไม่เสีย resource) สูงกว่า baseline ชัดเจน [M:3/4] [R:3/3] [B:2/3] |
| **Utility** | 4/10 (C) | Olympus Focus (enlarge ตัวเองระหว่าง concentration) เป็น utility เชิง combat เป็นหลัก (reach/carry) ไม่ได้ขยาย breadth utility นอกการต่อสู้ = เท่า baseline |
| **Versatility** | 8/10 (A) | Olympus Focus เพิ่มตัวเลือกที่ 5 เข้า Planar Focus menu ของ baseline ทำให้สลับ role ได้กว้างขึ้นอีกขั้น [M:2/4] [R:3/3] [B:3/3] |

### Order of Wild Hunters (ValdaSpireExtras 🕰️)

> **คอนเซปต์**: ranged channeler ที่ผูกกับ quiver อาวุธไม่จำกัด + teleport ตามลูกธนู

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Arrow Downpour (lv15, action, 1 ครั้ง/long rest) ยิงเป็นเส้นตรง 100×15ft โดน 8d6+10 piercing (save ครึ่ง) — AoE nova magnitude สูงกว่า baseline ที่เป็น single-target ล้วน [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ (Fey Arrowhead เป็น mobility ไม่ใช่ control) = เท่า baseline |
| **Support** | 0/10 (D) | ไม่มี feature เสริมทีมเลย = เท่า baseline |
| **Survivability** | 7/10 (A) | Fey Arrowhead (lv10, spend 2 AP เมื่อยิงโดน) teleport ตัวเองไปจุดที่ลูกธนูตก — ใช้หนีจากระยะประชิดหรือจัด positioning เลี่ยงดาเมจได้จริง แม้ผูกกับการโจมตีก็ตาม [M:2/4] [R:2/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Asphodel Focus (lv7) ให้ยิงซ้ำใส่เป้าเดิมฟรีเมื่อพลาด (จ่าย AP เท่านั้น ไม่เสีย action/bonus action เพิ่ม) — แปลงการพลาดให้กลายเป็นโอกาสสองได้แบบไม่เสีย economy [M:2/4] [R:2/3] [B:3/3] |
| **Utility** | 6/10 (B) | Portal Key: Quiver ผลิตกระสุนไม่จำกัดตลอดเวลา (ไม่ต้องซื้อ/พกลูกธนู) บวก Fey Arrowhead ใช้ teleport ข้ามสิ่งกีดขวางนอกการต่อสู้ได้ — utility กว้างกว่า baseline [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | Asphodel Focus เพิ่มตัวเลือกที่ 5 เข้า Planar Focus menu ของ baseline ทำให้สลับ role ได้กว้างขึ้นอีกขั้น [M:2/4] [R:3/3] [B:3/3] |
