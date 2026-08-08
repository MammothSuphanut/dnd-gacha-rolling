# Warden — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 17 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Warden](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 17 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Warden, 2024)

Floor 0-10 ต่อ axis ของ **Warden เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d10, ไม่มี spellcasting, saving throw proficiency Str + Con, armor proficiency ครบทุกชนิดรวม heavy+shield, weapon proficiency simple+martial, Weapon Mastery, Fighting Style, Extra Attack (lv5), Sentinel's Stand (lv1, เลือก save prof เพิ่ม/HP เพิ่ม=Con mod+level/AC โบนัสจาก shield +3→+4 สลับได้ทุก level-up), Guardian Tactics (lv2, Bonus Action: Block=แบ่ง AC ให้ ally ข้างๆ, Challenge=ล่อเป้าศัตรูให้ disadvantage ตีคนอื่น), Unyielding Resolve (lv2, resist B/P/S ตอน Bloodied), Interrupt (lv5, reaction ตัด attack ออกจาก multiattack ศัตรู), Mettle (lv7), Survive (lv9), Sentinel's Strike (lv11), Font of Life (lv13), Extended Tactics (lv14), Improved Resolve (lv15, resist เกือบทุกชนิดดาเมจตอน Bloodied), Sentinel's Soul (lv18), Legendary Resistance (lv20, 3 ครั้ง/long rest เปลี่ยน fail save เป็น success)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | Extra Attack (lv5) เป็นฐาน magnitude มาตรฐาน บวก Sentinel's Strike (lv11) มีตัวเลือก Shield Slam ให้ extra 1d8+AC bonus ของ shield ดาเมจทุกครั้งที่ตี — Warden ไม่ได้เน้นดาเมจเป็นหลัก ธีมเน้น defense/control มากกว่า [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 6/10 (B) | Guardian Tactics' Challenge (Bonus Action ทุกเทิร์น ฟรี) ล่อศัตรูให้ Disadvantage โจมตีคนอื่นนอกจากเรา บวก Interrupt (lv5, reaction) **ตัด attack หรือ ability ออกจาก multiattack ของศัตรูได้โดยตรง** ก่อนแม้แต่จะทอย d20 เป็น action-denial ที่แรงมาก (3 ครั้ง/วัน ฟื้น 1/short rest) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 7/10 (A) | Guardian Tactics' Block (Bonus Action ทุกเทิร์น ฟรี) ให้ ally ข้างๆ ใช้ AC ของเราแทนถ้าสูงกว่า เป็นการโอนความทนทานให้ทีมโดยตรง บวก Challenge ที่ดึงเป้าศัตรูออกจาก ally — เป็น toolkit "ผู้พิทักษ์" ที่ออกแบบมาปกป้องทีมชัดเจน ใช้ได้ไม่จำกัดจำนวนครั้ง/วัน [M:2/4] [R:3/3] [B:2/3] |
| **Survivability** | 10/10 (S) | Sentinel's Stand ให้เลือก HP เพิ่ม/save prof เพิ่ม/AC โบนัส shield +3→+4 ตั้งแต่ lv1 บวก Unyielding Resolve (lv2, resist B/P/S ตอน Bloodied แบบ passive) ขยายเป็น**เกือบทุกชนิดดาเมจ**ที่ lv15 (Improved Resolve) บวก Mettle (lv7, Con-save ครึ่งดาเมจกลายเป็นศูนย์), Survive (lv9, กันตาย+ฮีลก้อนใหญ่), Font of Life (lv13, ล้าง condition ฟรีทุกเทิร์น) และ Legendary Resistance (lv20, เปลี่ยน fail save เป็น success ได้ 3 ครั้ง/long rest) — ชั้นการป้องกันครบทุกมิติมากที่สุดในบรรดา class ที่ทำมาแล้ว [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Guardian Tactics ใช้ Bonus Action ฟรีไม่จำกัดจำนวนครั้ง/เทิร์น, Interrupt เป็น Reaction ฟรี, Font of Life เป็น "no action required" — ทุกอย่างประหยัด action แม้จะไม่มี extra-attack หรือ extra-turn โดยตรง [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | Sentinel's Soul (lv18) มีตัวเลือก All-Seeing ให้ Blindsight 30ft เป็น utility เดียวที่ยืนยันได้ ปลดล็อกช้ามาก ไม่มี skill bonus หรือ ritual casting [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Sentinel's Stand/Strike/Soul เป็นจุดเลือก build 3 จุดกระจายทั้งอาชีพ (lv1/11/18) สลับได้ทุก level-up หรือ long rest ปรับ playstyle การป้องกัน/ล่อเป้าได้หลายแบบ แต่ยังคงเป็น archetype tank/defender ตายตัว ไม่มีทางปรับ role อื่น [M:2/4] [R:2/3] [B:1/3] |

---

## Subclass Scoring (17)

**Class Baseline อ้างอิง**: Damage 5, Control 6, Support 7, Survivability 10, Action Economy 6, Utility 3, Versatility 5

ไม่มี archetype ตัวไหนมีข้อความ explicit ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ **หมายเหตุพิเศษ**: Survivability baseline ของ Warden อยู่ที่ 10/10 (S) ซึ่งเป็นเพดานสูงสุดอยู่แล้ว จึงไม่มี subclass ตัวไหนได้คะแนนแกนนี้เกิน 10 — ทุกตัวจะเท่ากับ 10 เสมอไม่ว่าจะมี feature เสริม survivability เพิ่มมากแค่ไหนก็ตาม (คะแนนแตะเพดานของระบบ)

**หมายเหตุแหล่งที่มา**: 12 ตัว (Beastblood Guardian, Carrion King, Diabolist, Drake-Blooded, Godsworn, Grey Watchman, Nightgaunt, Rimekeeper, Stoneheart Defender, Storm Sentinel, Verdant Protector, Witchbane Hunter) เป็น ValdaSpire24/24Extras 2024-native ส่วนอีก 5 ตัว (Fey Trailblazer, Hellkeeper, Iceheart Bastion, Loreseeker, Soulblood Shaman) เป็น 2014-only 🕰️ จากไฟล์ VSS 2014 — ในจำนวนนี้ **Hellkeeper ถูก reprint เป็น Diabolist** และ **Iceheart Bastion ถูก reprint เป็น Rimekeeper** ในเวอร์ชัน 2024 (ยืนยันจาก `reprintedAs` field) แต่ tracker แยกบรรทัดทั้งคู่เป็นรายการอิสระ (รูปแบบเดียวกับ Fighter Banneret/Purple Dragon Knight ไม่ใช่แบบ Sorcerer ที่รวมเป็นบรรทัดเดียว) จึงให้คะแนนแยกกันคนละตัวโดยใช้กลไก 2014 ดั้งเดิมสำหรับตัว 🕰️ และกลไก 2024 สำหรับตัว reprint — นอกจากนี้ Warden เวอร์ชัน 2014 ใช้ core feature ชื่อ **Warden's Grasp** (bonus action ตรึงตัวเอง+กันศัตรูข้างเคียงหนี) และ **Warden's Mark** (bonus action ล่อเป้าให้ disadvantage ตีคนอื่น) ซึ่งเทียบเท่าฟังก์ชันกับ Guardian Tactics' Grasp/Challenge ของเวอร์ชัน 2024 — ใช้เป็นฐานอ้างอิงตีความ feature ของ 5 ตัว 🕰️

| Subclass | Source | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Beastblood Guardian | ValdaSpire24 | 9 (S) | 7 (A) | 7 (A) | 10 (S) | 7 (A) | 5 (B) | 6 (B) |
| Carrion King | ValdaSpire24Extras | 8 (A) | 9 (S) | 7 (A) | 10 (S) | 7 (A) | 6 (B) | 7 (A) |
| Diabolist | ValdaSpire24Extras | 8 (A) | 7 (A) | 5 (B) | 10 (S) | 8 (A) | 4 (C) | 6 (B) |
| Drake-Blooded | ValdaSpire24 | 9 (S) | 6 (B) | 7 (A) | 10 (S) | 7 (A) | 6 (B) | 7 (A) |
| Fey Trailblazer | VSS 🕰️ | 5 (B) | 6 (B) | 7 (A) | 10 (S) | 6 (B) | 4 (C) | 5 (B) |
| Godsworn | ValdaSpire24 | 6 (B) | 6 (B) | 9 (S) | 10 (S) | 6 (B) | 5 (B) | 7 (A) |
| Grey Watchman | ValdaSpire24Extras | 8 (A) | 8 (A) | 8 (A) | 10 (S) | 8 (A) | 3 (C) | 8 (A) |
| Hellkeeper | VSS 🕰️ | 8 (A) | 6 (B) | 7 (A) | 10 (S) | 6 (B) | 4 (C) | 5 (B) |
| Iceheart Bastion | VSS 🕰️ | 7 (A) | 6 (B) | 7 (A) | 10 (S) | 6 (B) | 4 (C) | 5 (B) |
| Loreseeker | VSS 🕰️ | 8 (A) | 6 (B) | 7 (A) | 10 (S) | 6 (B) | 6 (B) | 6 (B) |
| Nightgaunt | ValdaSpire24 | 8 (A) | 6 (B) | 7 (A) | 10 (S) | 6 (B) | 6 (B) | 6 (B) |
| Rimekeeper | ValdaSpire24Extras | 8 (A) | 7 (A) | 7 (A) | 10 (S) | 6 (B) | 5 (B) | 7 (A) |
| Soulblood Shaman | VSS 🕰️ | 8 (A) | 6 (B) | 7 (A) | 10 (S) | 6 (B) | 4 (C) | 6 (B) |
| Stoneheart Defender | ValdaSpire24 | 6 (B) | 7 (A) | 8 (A) | 10 (S) | 7 (A) | 3 (C) | 6 (B) |
| Storm Sentinel | ValdaSpire24 | 9 (S) | 6 (B) | 7 (A) | 10 (S) | 8 (A) | 4 (C) | 6 (B) |
| Verdant Protector | ValdaSpire24 | 8 (A) | 8 (A) | 8 (A) | 10 (S) | 6 (B) | 6 (B) | 7 (A) |
| Witchbane Hunter | ValdaSpire24Extras | 8 (A) | 8 (A) | 7 (A) | 10 (S) | 6 (B) | 7 (A) | 7 (A) |

---

### Beastblood Guardian (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Aspect of the Beast (lv17, Bleeding Wounds สะสมได้ถึง 6 stack ดาเมจ Necrotic ทะลุ resist/immune ทุกเทิร์น + Bloodied Frenzy=Advantage ตลอดเวลาที่ Bloodied) บวก Wild Pounce (extra 1d8 slashing+Prone ทุกเทิร์นแรกที่ตีโดน) และ Bloodied Fury (Advantage ทั้งเทิร์น 1/rest) เป็น damage engine ที่ magnitude สูงมาก [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 7/10 (A) | Roar (ผลัก 5ft + กัน AOO ทุกเทิร์นด้วย bonus action ฟรี) บวก Wild Pounce (Prone ทุกเทิร์นแรกที่ตีโดน Large หรือเล็กกว่า) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Furious Speed (double speed) เป็น mobility ไม่ใช่ survivability โดยตรง |
| **Action Economy** | 7/10 (A) | Roar เป็น bonus action ฟรี, Wild Pounce ไม่เสีย action เพิ่ม (ส่วนหนึ่งของการตี), Aspect of the Beast เป็น bonus action ที่ให้ผลต่อเนื่องหลายเทิร์น [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 5/10 (B) | Hunting Grounds (Climb+Swim Speed เท่า Speed + ไม่เสีย movement จาก Difficult Terrain) บวก skill proficiency+bonus จาก Primal Warrior [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Aspect of the Beast มี 3 โหมดพร้อมกัน (Advantage/bleed/speed) ให้เลือกใช้ แต่ยังคงเป็น predator archetype เดี่ยวตายตัว [M:2/4] [R:2/3] [B:1/3] |

### Carrion King (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Infest (ดาเมจสเกล 1d6→1d12 พร้อม debuff) บวก Blinding Bites (lv17, แทนที่การโจมตี 1 ครั้งด้วย 2d10 dmg+Blind) และ Infesting Swarm (ขยาย Infest ให้โจมตีได้หลายเป้าพร้อมกันในระยะ Swarm Cloud) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 9/10 (S) | Swarm Cloud (AoE scale ได้ 5-15ft เลือก Deafen/Difficult Terrain/Heavily Obscured ได้ 10 นาที) บวก Infest (ลด d20 test ของเป้า) บวก Plague Vector (lv10, Interrupt ยังเพิ่ม Poisoned) บวก Blinding Bites (Blind AoE) เป็นชุด control ที่กว้างและแรงที่สุดในบรรดา class นี้ [M:3/4] [R:3/3] [B:3/3] |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่โดยตรง (Versatile Vermin เป็น solo utility) = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) |
| **Action Economy** | 7/10 (A) | Infest/Swarm Cloud เป็น bonus action, Versatile Vermin ไม่เสีย action เลย [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 6/10 (B) | Versatile Vermin (สั่งแมลงหยิบของ/เปิดประตู/เทของเหลวจากระยะไกลได้ทุกเทิร์นแบบไม่เสีย action) เป็น utility ที่มีประโยชน์นอกคอมแบตจริง [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | มีครบทั้งดาเมจ, control หลายรูปแบบ (obscure/terrain/deafen/blind/poison), และ utility ในตัวเดียว [M:2/4] [R:2/3] [B:3/3] |

### Diabolist (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Hellbent Survival (lv10, ใช้ Survive แล้วเคลื่อนที่ฟรี+โจมตี 2 ครั้งทันที) บวก Hellfire Aura (lv17, AoE ดาเมจไฟทุกจบเทิร์น) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Infernal Command (bonus action cast Command ฟรี 2 ครั้ง/รอบ ไม่เสีย spell slot) เป็น control ที่ reliable และซ้ำได้บ่อย [M:2/4] [R:3/3] [B:2/3] |
| **Support** | 5/10 (B) | Soul Broker (lv6, ทุกครั้งที่ตัวเองหรือ ally ในระยะ 10ft kill ศัตรู เลือกโบนัสวิเศษได้ 5 แบบ เช่น temp HP/resistance/skill expertise ให้ทีม) เป็น support จริงที่ break เหนือ baseline เดิม [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Devil's Advocate (Fiendish Empathy vs Fiend + Fire resist) เป็นส่วนเสริมที่ถูกเพดานครอบไว้ |
| **Action Economy** | 8/10 (A) | Hellbent Survival ให้เคลื่อนที่ฟรี+โจมตี 2 ครั้งทันทีโดยไม่เสีย action เพิ่มเมื่อ trigger Survive บวก Infernal Command เป็น bonus action [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Silver-Tongued (skill proficiency+bonus เลือกได้ 1 จาก 3) เป็น utility เสริมเล็กน้อย [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Soul Broker มี 5 ตัวเลือกโบนัสต่างกันทุกครั้งที่ kill บวก control (Command) และ damage (Hellfire) ในตัวเดียว [M:2/4] [R:2/3] [B:1/3] |

### Drake-Blooded (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Full spellcasting hybrid เข้าถึง Sorcerer spell list เต็ม บวก Aspect of the Greatwyrm (lv17, Breath Weapon 6d6 AoE แทนที่การโจมตี + Elemental Fury extra 1d6 ทุกครั้งที่ตี melee) และ Draconic Vengeance (lv10, reaction AoE ดาเมจตอบโต้) เป็น damage kit ที่ครอบคลุมทั้ง AoE และ single-target [M:4/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | เข้าถึงคาถา control จาก Sorcerer spell list ได้ (ผ่าน prepared spell ที่ขยายตามเลเวล) แต่ไม่ใช่จุดเน้นหลักของ subclass [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 7/10 (A) | Sorcerer spell list มี support/heal น้อยมาก ไม่มี feature เสริมทีมโดยตรง = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) |
| **Action Economy** | 7/10 (A) | Arcane Strike แทนที่การโจมตีด้วยคาถา cantrip ไม่เสีย action เพิ่ม บวก Breath Weapon ก็แทนที่การโจมตีเช่นกัน [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 6/10 (B) | เข้าถึงคาถา utility เต็มจาก Sorcerer list (Detect Magic ฯลฯ) ผ่าน prepared spell ที่สลับได้ทุกเลเวลอัพ [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Mortal Metamagic (Empowered/Quickened ผ่าน Hit Point Dice) บวก full spellcasting hybrid บน chassis นักสู้ = ความยืดหยุ่นสูง [M:3/4] [R:2/3] [B:2/3] |

### Fey Trailblazer (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 5/10 (B) | ไม่มี damage feature ใหม่ = เท่า baseline |
| **Control** | 6/10 (B) | Alluring Mark เปลี่ยนผลของ Warden's Mark จาก disadvantage เป็น Charmed condition เต็มตัว (แลกกับการเสียผลปกติของ Mark) เป็นการสลับ control mode ไม่ใช่การเพิ่มสุทธิ = ใกล้เคียง baseline |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Archfey of Majesty (lv20, AoE บังคับ save มิฉะนั้น attack พลาดอัตโนมัติ) และ Spell Resistance (lv13) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | Archfey of Majesty ให้ bonus action teleport เพิ่ม แต่ Misty Jaunt ต้องเสีย movement เต็มจำนวน ไม่ประหยัด action สุทธิ = ใกล้เคียง baseline |
| **Utility** | 4/10 (C) | Misty Jaunt (teleport ระยะสั้นด้วยการเสีย movement) เป็น mobility utility แคบๆ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | โฟกัส charm-control + mobility เท่านั้น เป็น toolkit ที่บางกว่า archetype 2024 ส่วนใหญ่ = เท่า baseline |

### Godsworn (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Sainted Mantle's Spirit Guardians (lv17, cast ฟรีไม่ต้อง Concentration) เป็น AoE damage source ต่อเนื่องที่ทรงพลัง แต่ magnitude โดยรวมยังไม่สูงเท่า archetype เน้นดาเมจอื่น [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 6/10 (B) | Zone of Truth (Benediction) เป็น social soft-control แคบ ไม่พอยกระดับ = เท่า baseline |
| **Support** | 9/10 (S) | Anointed Block (Block ให้ ally +1d4 ต่อ attack/save roll) บวก Benediction (cast Lesser Restoration/Sanctuary ฟรี 1/rest) บวก Selfless Survival (lv10, ใช้ Survive ช่วย ally แทนตัวเองได้ ฮีล 2x level) เป็นชุด support ที่ทรงพลังและ reliable ที่สุดใน class [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Radiant Regeneration (lv17, ฮีลตัวเองทุกเทิร์น) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | Benediction/Sainted Mantle ยังคงเสีย action ปกติในการ cast (ประหยัดแค่ spell slot ไม่ใช่ action) = เท่า baseline |
| **Utility** | 5/10 (B) | Religion skill proficiency+bonus บวกคาถา utility ฟรี (Sanctuary/Zone of Truth) จาก Benediction [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | ชุด support+utility spell menu ที่หลากหลาย (Daylight/Lesser Restoration/Sanctuary/Zone of Truth) บวกความสามารถ heal-ally แทนตัวเอง [M:2/4] [R:2/3] [B:3/3] |

### Grey Watchman (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Maneuver ทั้ง 6 แบบ (Bear Hug/Bull Rush/Heel-Cutter/Staggering Strike) เพิ่ม battle die ใส่ดาเมจการตีเกือบทุกแบบ บวก Rampage (โจมตีฟรีทันทีหลัง kill/crit) และ Deadly Strike (lv17, battle die ฟรีเพิ่มทุกครั้งที่ maneuver โดน) [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 8/10 (A) | Bear Hug (Grapple+ลด save), Bull Rush (Prone+Push), Heel-Cutter (Speed=0), Staggering Strike (Disadvantage ครั้งถัดไป) เป็นเมนู control ที่ครบครันมาก [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Hold the Line (lv10, Grasp emanation ให้ตัวเอง+ally ทั้งหมดในพื้นที่มี Advantage ต่อ Str/Dex/Con save) เป็น support ที่ break เหนือ baseline ชัดเจน [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Siege Defender's Tight Formation (กันไม่ให้ศัตรูมี Advantage ตอนอยู่ใกล้ ally 2+ คน) ถูกเพดานครอบไว้ |
| **Action Economy** | 8/10 (A) | Rampage ไม่เสีย action เลย, Unbreakable Sentinel (lv17) ให้ bonus action พิเศษเฉพาะสำหรับ maneuver (Deft Maneuver) บวก battle die คืนฟรีทุกเทิร์น (Martial Recovery) [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 3/10 (C) | Lightning Reflexes (เพิ่ม Initiative) เป็น combat utility ไม่ใช่ out-of-combat utility จริง = เท่า baseline |
| **Versatility** | 8/10 (A) | 6 maneuver ที่ต่างกันโดยสิ้นเชิง (grapple/push/slow/stagger/initiative/rampage) ให้เลือกใช้ตามสถานการณ์ทุกเทิร์น เป็น breadth ที่กว้างที่สุดใน class นี้ [M:3/4] [R:2/3] [B:3/3] |

### Hellkeeper (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Hellish Grasp (Grasp ดาเมจไฟ AoE 1d6→2d6 ให้ทุกเป้าที่ติด) บวก Spiteful Mark (Mark ดาเมจไฟ 1d6→2d6) บวก Hellbent (lv20, +2d8 ดาเมจไฟ 1 นาที ที่ทะลุ resist/immunity ทั้งหมด) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่ (แค่เพิ่มดาเมจให้ Grasp/Mark เดิม) = เท่า baseline |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Fell Resilience (Adv Str/Con save ตอน Bloodied) และ Evasion (lv13) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | ไม่มี feature ประหยัด action ใหม่ = เท่า baseline |
| **Utility** | 4/10 (C) | Tormenter (double proficiency bonus เฉพาะ Intimidation vs เป้าที่ Restrained) เป็น utility แคบมาก [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Toolkit ค่อนข้างบาง (เน้นเพิ่มดาเมจไฟให้ฟีเจอร์เดิม + defensive capstone ปลายเกม) = เท่า baseline |

### Iceheart Bastion (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | North Wind (lv6, breath line 4d6 cold+halve speed) บวก Form of the Old Hoarfrost (lv20, AoE 8d6/เทิร์นต่อเนื่อง 1 นาที) [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Form of the Old Hoarfrost สร้างพื้นที่ Difficult Terrain ถาวรระหว่าง duration บวก North Wind halve speed ตอน fail save — ไม่มากพอยกระดับ tier ชัดเจน = ใกล้เคียง baseline |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Icy Grasp (temp HP ตอนใช้ Grasp) และ Mettle (lv13, ซ้ำกับ baseline 2024) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | ไม่มี feature ประหยัด action ใหม่ = เท่า baseline |
| **Utility** | 4/10 (C) | Snowshoes (ไม่เสีย movement จาก Difficult Terrain ที่เกิดจากหิมะ/น้ำแข็ง) เป็น terrain utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 5/10 (B) | Toolkit เน้น cold-damage เป็นหลัก ค่อนข้างบาง = เท่า baseline |

### Loreseeker (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Full spellcasting hybrid เข้าถึง Wizard spell list (เน้น abjuration/evocation) บวก Bookmark/Librarian of the Eternal (lv20, เป้าที่ mark มี disadvantage ต่อ save vs คาถาตัวเอง = คาถาโจมตีลงง่ายขึ้นมาก) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Ensnaring Mark (lv6, Mark ดึงเป้าเข้ามาใกล้ตัวทันที) เป็น control เสริม แต่การเข้าถึงคาถา control หลักถูกจำกัดด้วยเงื่อนไข abjuration/evocation-only จนถึง lv8/14/20 [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Librarian of the Eternal (temp HP ทุกครั้งที่ cast) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | Librarian of the Eternal (lv20, cast cantrip เป็น bonus action ได้) เป็น AE gain ที่ปลดล็อกช้ามาก ไม่พอยกระดับ tier = ใกล้เคียง baseline |
| **Utility** | 6/10 (B) | เข้าถึงคาถา utility จาก Wizard spell list ได้ (แม้จำกัด school ส่วนใหญ่) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Caster-hybrid archetype แต่ถูกจำกัดด้วยเงื่อนไข school abjuration/evocation จนถึงเลเวลปลาย ทำให้แคบกว่า Drake-Blooded ที่เข้าถึง Sorcerer list แบบเปิดกว้าง [M:2/4] [R:2/3] [B:2/3] |

### Nightgaunt (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Vampiric Strike (lv17, cast Vampiric Touch แทนที่การโจมตีหนึ่งครั้ง) บวก Death's Gambit (execute เป้าที่ Challenge ไว้ถ้า HP ต่ำกว่า 2x level) บวก Frightful Aura ให้ Advantage ต่อการโจมตีเป้าที่ Frightened [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Frightful Aura (lv17, AoE Frightened 15ft) เป็น control ที่ปลดล็อกช้า ไม่พอยกระดับ tier มาก = ใกล้เคียง baseline |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Undying (lv10, Survive 3 ครั้ง/รอบ) และ Grave Keeper's resistance/darkvision ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | Vampiric Strike แทนที่การโจมตีไม่เสีย action เพิ่ม แต่ Innate Necromancy ยังเสีย action ปกติในการ cast = ใกล้เคียง baseline |
| **Utility** | 6/10 (B) | Innate Necromancy ให้ cast Speak with Dead ฟรี (ข้อมูลสำคัญ) + Gentle Repose บวก Darkvision 60-120ft [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | ผสมผสาน execute-damage, fear-control, และ vampiric self-sustain ในตัวเดียว [M:2/4] [R:2/3] [B:2/3] |

### Rimekeeper (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Frostbite (สเกล 2d12→4d12, ใช้แทนที่การโจมตีได้ที่ lv17) บวกความสามารถสลับดาเมจธาตุ Cold บนอาวุธทุกครั้งที่ตี [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 7/10 (A) | Black Ice (AoE Prone ซ้ำได้ทุกครั้งที่มีคนเข้าพื้นที่) บวก North Wind (ดึง/ผลัก 10ft บน Block/Challenge) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 7/10 (A) | Snowbank ให้ Half Cover แก่ ally 2 คนได้ แต่เป็น utility แคบไม่พอยกระดับเหนือ baseline = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Snowclad/Hoarfrost Herald (temp HP ทุกเทิร์น) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | Ice Blast เสีย Magic action เต็ม, North Wind ไม่เสีย action เพิ่ม (ส่วนหนึ่งของ Block/Challenge) = ใกล้เคียง baseline |
| **Utility** | 5/10 (B) | Freeze Shut (ล็อกประตู/หีบ) บวก Polar Acclimation (cold resist+อาวุธเปลี่ยนธาตุ) [M:2/4] [R:2/3] [B:1/3] |
| **Versatility** | 7/10 (A) | Ice Blast มี 4 โหมดเลือกได้ (AoE prone/utility/single-target dmg/cover) เป็น breadth ที่กว้าง [M:2/4] [R:2/3] [B:3/3] |

### Soulblood Shaman (VSS 🕰️)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Full spellcasting hybrid เข้าถึง Druid spell list (เน้น evocation/transmutation) บวก Ethereal Watcher (lv20, กลับจาก ethereal แต่ละครั้งสร้าง 4d10 force dmg AoE ซ้ำได้หลายครั้งใน 1 นาที) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 6/10 (B) | Soulblood (reaction ติด mark อัตโนมัติเมื่อโดนโจมตีระยะประชิด) เป็นการล็อกเป้าอัตโนมัติ ไม่ใช่ control ใหม่โดยตรง = เท่า baseline |
| **Support** | 7/10 (A) | Druid spell list ที่จำกัดเฉพาะ evocation/transmutation ตัดคาถาฮีล/เสริมทีมส่วนใหญ่ออกไป (Cure Wounds เป็น Abjuration เข้าไม่ถึง) จึงไม่มี support ใหม่จริงจัง = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Ethereal Watcher (กลายเป็น ethereal หลบทุกอย่างได้) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | Ethereal Watcher (lv20) ให้ bonus action สลับ ethereal ไปมาได้คล่องตัว แต่ปลดล็อกช้ามาก ไม่พอยกระดับ tier = ใกล้เคียง baseline |
| **Utility** | 4/10 (C) | Whispers of Beyond (Advantage บน Int/Wis check ผ่านพิธีกรรม 1 นาที ขึ้นกับดุลพินิจ GM) เป็น utility ที่จำกัดและไม่ reliable [M:1/4] [R:1/3] [B:1/3] |
| **Versatility** | 6/10 (B) | Caster-hybrid + ethereal-shift utility แต่ถูกจำกัดด้วย school evocation/transmutation-only จนถึงเลเวลปลาย [M:2/4] [R:2/3] [B:2/3] |

### Stoneheart Defender (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 6/10 (B) | Earthshatter (AoE Prone แทนที่การโจมตี) เอื้อให้พวกเดียวกันโจมตี Advantage ต่อเป้าที่ Prone แต่ตัวเองไม่ได้ดาเมจโดยตรงมาก บวก Giant Strength (lv17, +4 Str) เป็นตัวเสริมดาเมจเล็กน้อย [M:2/4] [R:2/3] [B:1/3] |
| **Control** | 7/10 (A) | Earthshatter (AoE Prone แทนที่การโจมตี, ฟรีเพิ่มที่ lv17 ไม่ต้องแลกการโจมตี) เป็น control ที่ทำซ้ำได้บ่อยและกว้างขึ้นตามเลเวล [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Stonewall (Block+ถือ Shield ลดดาเมจ B/P/S ให้ทั้งตัวเองและ ally ที่เลือกเท่ากับ AC bonus ของ Shield) เป็น damage-reduction แบบ flat ที่ทรงพลังเหนือ baseline (ซึ่งเดิมมีแค่การแบ่ง AC) [M:2/4] [R:3/3] [B:2/3] |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Immortal Resolve (lv17, Resistance ต่อทุกดาเมจตอน Bloodied) และ Roots of Rock (Immovable+Prone Immunity) ถูกเพดานครอบไว้ |
| **Action Economy** | 7/10 (A) | Earthshatter แทนที่การโจมตีปกติ แต่ Stoneforged Champion (lv17) ให้ใช้ Earthshatter ฟรีโดยไม่ต้องแลกการโจมตีอีกต่อไป = ได้ action เพิ่มสุทธิ [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 3/10 (C) | ไม่มี utility feature ใหม่ (Roots of Rock เป็น defensive ไม่ใช่ utility) = เท่า baseline |
| **Versatility** | 6/10 (B) | โฟกัส tank/AoE-control archetype ชัดเจน มีมิติเดียวเป็นหลัก [M:2/4] [R:2/3] [B:1/3] |

### Storm Sentinel (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Thunderblast (Grasp ให้ดาเมจ AoE 1d8→3d8 ทุกเป้าในระยะ) บวก Lightning Step (lv10, 4d8 AoE ตอน teleport) บวก Stormlord (lv17, Call Lightning ฟรีและซ้ำได้ทุกเทิร์นผ่านการแทนที่การโจมตี) เป็น damage kit ที่เน้น AoE ล้วนและ magnitude สูงมาก [M:3/4] [R:3/3] [B:3/3] |
| **Control** | 6/10 (B) | ไม่มี control feature ใหม่นอกเหนือจาก Grasp เดิม = เท่า baseline |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) |
| **Action Economy** | 8/10 (A) | Storm Wings ให้ Fly Speed ฟรีไม่เสีย action ทุกเทิร์น บวก Lightning Step (bonus action) และ Call Lightning (แทนที่การโจมตี ไม่เสีย action เพิ่ม) [M:3/4] [R:2/3] [B:2/3] |
| **Utility** | 4/10 (C) | Swim Speed + Flash from Above (เอฟเฟกต์ประกอบฉาก ไม่มีผลเชิงกลไก) เป็น utility แคบ [M:1/4] [R:2/3] [B:1/3] |
| **Versatility** | 6/10 (B) | โฟกัส lightning-elemental blaster + mobility (fly) เป็น archetype เดี่ยวชัดเจน [M:2/4] [R:2/3] [B:1/3] |

### Verdant Protector (ValdaSpire24)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Armor of Thorns (lv17, ตอบโต้ 4d6 Piercing ทุกครั้งที่โดนตีระยะประชิด) บวกการเข้าถึง Spike Growth (damage-over-terrain) [M:2/4] [R:2/3] [B:2/3] |
| **Control** | 8/10 (A) | Entangling Transformation (lv17, AoE Restrained 15ft) บวก Spike Growth/Grasping Vines (ขยายระยะ Grasp emanation เป็น 10-15ft) เป็นชุด battlefield-control ที่กว้างมาก [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 8/10 (A) | Goodberry (อาหาร/น้ำ+ฮีลเล็กน้อยฟรีให้ทีม) บวก Verdant Resilience (lv10, ใช้ Survive แล้ว ally ในระยะ 10ft ได้ temp HP=2x level ด้วย) เป็น support ที่ break เหนือ baseline ชัดเจน [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Armor of Thorns (+4 AC) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | Nature's Emissary ยังเสีย action ปกติในการ cast = เท่า baseline |
| **Utility** | 6/10 (B) | Speak with Plants (ข้อมูลจากพืชรอบข้าง) + Goodberry (แก้ปัญหา logistics อาหาร/น้ำ) + skill proficiency [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผสมผสาน nature-magic, battlefield control, และ team support ในตัวเดียวอย่างสมดุล [M:2/4] [R:2/3] [B:3/3] |

### Witchbane Hunter (ValdaSpire24Extras)

| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Branding Challenge (extra 2d8 Fire บนเป้า Challenge ทุกครั้งที่ตีโดน) บวก Silvered Whetstone (สลับดาเมจเป็น Force บายพาส resistance) บวก Arcane Rebuke (4d8 Force บน Counterspell ที่สำเร็จ) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 8/10 (A) | Anti-Mage (lv17, cast Antimagic Field ฟรี — ปิดสนามเวทมนตร์ทั้งหมด) บวก Arcane Rebuke (Counterspell ฟรีไม่เสีย spell slot) เป็นชุด anti-caster ที่แรงที่สุดในบรรดา class นี้ [M:3/4] [R:2/3] [B:3/3] |
| **Support** | 7/10 (A) | ไม่มี feature เสริมทีมใหม่โดยตรง (เครื่องมือส่วนใหญ่เป็น self-focused) = เท่า baseline |
| **Survivability** | 10/10 (S) | เท่า baseline (เต็มเพดานแล้ว) — Spiteful Challenge (Adv save vs เป้า Challenge) ถูกเพดานครอบไว้ |
| **Action Economy** | 6/10 (B) | Arcane Rebuke ใช้ Counterspell ซึ่งปกติเป็น reaction อยู่แล้ว ไม่ได้ประหยัด action เพิ่มสุทธิ = เท่า baseline |
| **Utility** | 7/10 (A) | Cerulean Medallion (ตรวจจับ Celestial/Fey/Fiend/Undead ในระยะ) + Grimoire Monstrum (Advantage lore check) + Otherworldly Eye (ตรวจจับเวทมนตร์/มองทะลุ Invisible-Ethereal) + Holy Water เป็นชุด detection/utility ที่ครบครันเหนือ baseline [M:3/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ชุดไอเทม+ฟีเจอร์ anti-caster ที่หลากหลาย (ดาเมจ/ควบคุม/ตรวจจับ) ครอบคลุมการล่าเป้าหมายเวทมนตร์ได้รอบด้าน [M:2/4] [R:2/3] [B:3/3] |
