# Wizard — Subclass Level Overlay (ชั้น 2) — 🏁 คลาสสุดท้ายของชั้น 2 (30/30)

**อ้างอิง**: [wizard-level-baseline.md](wizard-level-baseline.md) (Class Baseline, ชั้น 1) + [wizard-subclass-scorecard-2024.md](wizard-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 28 subclass — gate lv3/6/10/14 (มาตรฐาน Wizard)
**รูปแบบ**: delta-only แบบย่อ (>10 subclass) — list เฉพาะ axis/เลเวลที่เกรดเปลี่ยนจาก baseline เท่านั้น ไม่ระบุ = เท่า baseline
**หมายเหตุแหล่งที่มา**: 5 ตัวเป็น XPHB/FRHoF 2024-compatible โดยตรง (Abjurer/Diviner/Evoker/Illusionist/Bladesinger); 8 ตัวเป็น 2014-only orphan 🕰️ (School of Conjuration/Enchantment/Necromancy/Transmutation, War Magic, Chronurgy Magic, Graviturgy Magic, Order of Scribes); 15 ตัวเป็น homebrew 2024-compatible (ValdaSpire24Extras ×12, GrimHollowPG24 ×3: Daemonologist/Plague Doctor/Sangromancer) — Familiar Master/Fumaturge และ Scroll Scribe/Wand Wizard เป็นคู่ subclass ที่แยกจากกันจริง ไม่ใช่ 2014→2024 rename เดียวกัน

**Baseline โดยสรุป**: Damage B(1-20) flat · Control B(1-20) flat · Support C(1-20) flat · Survivability **D(1-20) flat** (เหมือน Sorcerer เป๊ะ, อ่อนสุดร่วมกัน) · Action Economy **D(1-20) flat** (modifier-tally-lock ครั้งที่ 3 ในระบบ ต่อจาก Cleric/Warlock) · Utility B(1)→A(2-20) · Versatility **A(1-20) flat** (tier "สูง" แต่ไม่ถึง S เพราะ Memorize Spell ไม่ใช่ parallel-resource แท้จริงแบบ Cleric/Druid/Artificer)

---

## Abjurer (XPHB)

- Support: **B(6-20)** — Projected Ward (lv6, reaction ให้ Arcane Ward ดูดซับดาเมจแทน ally ในระยะ 30ft)
- Survivability: **B(3-13) → A(14-20)** — Arcane Ward(ดูดซับดาเมจทุกชนิด, เติมเต็มทุกครั้งที่ cast Abjuration)→Spell Resistance(lv14, Adv save+resist ดาเมจคาถา)
- Action Economy: **C(10-20)** — Spell Breaker (lv10, cast Dispel Magic เป็น bonus action+คืน slot ถ้าล้มเหลว)

## Diviner (XPHB)

- Support: **B(3-20)** — Portent ใช้แทนที่ d20 test ของ creature อื่นได้ด้วย
- Action Economy: **C(6-20)** — Expert Divination (lv6, cast Divination lv2+ แล้วคืน slot ต่ำกว่า)
- Utility: **S(3-20)** — Portent(บันทึกผลทอย d20 2-3 ครั้ง/วัน แทนที่ roll อะไรก็ได้ของตัวเองหรือใครก็ได้ที่เห็น)+Third Eye(Darkvision/อ่านภาษา/See Invisibility ฟรี) = **"ทรงพลังที่สุดในบรรดา Wizard" ตามที่ old scorecard ระบุตรงๆ**

## Evoker (XPHB)

- Damage: **A(3-9) → S(10-20)** — Potent Cantrip(ไม่มีทาง "ยิงเปล่า")+Empowered Evocation(lv10, +Int mod ดาเมจ Evocation ทุกคาถา)+Overchannel(lv14, การันตีดาเมจสูงสุด) = **"blaster ที่สมบูรณ์แบบที่สุดในเกม" ตามที่ old scorecard ระบุตรงๆ**
- Support: **B(6-20)** — Sculpt Spells (lv6, ally auto-succeed save+ไม่โดนดาเมจจาก Evocation AoE ของตัวเอง)

## Illusionist (XPHB)

- Damage: **A(6-20)** — Phantasmal Creatures (lv6, free Summon Beast/Fey 1/long rest)
- Survivability: **B(3-9) → A(10-20)** — Illusory Self (lv10, reaction ให้ attack พลาดอัตโนมัติผ่านภาพลวงตา) = **cancel-the-hit instance ที่ 9 ในระบบ**
- Action Economy: **C(6-20)** — Improved Illusions ให้ Minor Illusion อัพเกรด cast เป็น bonus action

## Bladesinger (FRHoF)

- Damage: **A(6-13) → S(14-20)** — **Extra Attack (lv6, real!)** — full-caster subclass ตัวที่ 5 ในระบบที่ได้ Extra Attack จริง (ต่อจาก Necromancer/Tactician/Warlock's Symbiont/Witch's Steel Magic) — บวก Song of Victory (lv14, โจมตีอาวุธฟรีทุกครั้งที่ cast)
- Survivability: **B(3-9) → A(10-20)** — Bladesong(bonus action +AC=Int mod+speed)→Song of Defense(lv10, reaction ลดดาเมจ)
- Action Economy: **C(6-13) → B(14-20)** — Song of Victory ให้โจมตีฟรีทุกครั้งที่ cast คาถา action

## School of Conjuration (PHB) 🕰️

- Support: **B(6-20)** — Benign Transposition (lv6, สลับที่กับ creature ที่เต็มใจ)

## School of Enchantment (PHB) 🕰️

- Control: **A(3-20)** — Hypnotic Gaze(action ทุกเทิร์น Incapacitate+Speed0 ต่อเนื่อง)+Split Enchantment(lv10, คาถาเป้าเดียวโดนได้ 2 เป้า)
- Survivability: **B(6-20)** — Instinctive Charm (lv6, reaction เบี่ยง attack ไปเป้าอื่น)

## School of Necromancy (PHB) 🕰️

- Damage: **A(6-20)** — Undead Thralls (lv6, Animate Dead เพิ่ม 1 ตัว+undead ทุกตัวได้ HP/ดาเมจถาวรเพิ่ม)
- Survivability: **B(3-9) → A(10-20)** — Grim Harvest(ฮีลตัวเองทุกครั้งที่ kill ด้วยคาถา)→Inured to Undeath(lv10, resist Necrotic+HP max ลดไม่ได้)

## School of Transmutation (PHB) 🕰️

- Support: **B(3-13) → A(14-20)** — Transmuter's Stone แชร์ ally→Master Transmuter(lv14, Panacea=ล้าง+ฮีลเต็ม หรือ Restore Life=Raise Dead ฟรี)
- Survivability: **B(3-9) → A(10-20)** — Transmuter's Stone(save prof/resist เลือกได้)→Shapechanger(lv10, free Polymorph ตัวเอง)
- Utility: **S(3-20)** — Transmuter's Stone(4 บัฟถาวรสลับได้)+Minor Alchemy+Master Transmuter = **"ตัวเลือกที่หลากหลายที่สุดในบรรดา capstone ของ Wizard" ตามที่ old scorecard ระบุตรงๆ**
- Versatility: **S(3-20)** — บัฟ/ฮีล/ชุบชีวิต/แปลงร่าง = **"breadth ที่กว้างที่สุดในบรรดา 2014-orphan ของ class นี้"**

## War Magic (XGE) 🕰️

- Damage: **A(6-20)** — Power Surge(สะสมจาก Counterspell/Dispel สำเร็จ แลกดาเมจ Force)+Deflecting Shroud(lv14, แผ่ดาเมจ Force 3 ศัตรู)
- Survivability: **B(3-9) → A(10-20)** — Arcane Deflection(reaction +2AC/+4save)→Durable Magic(lv10, +2AC+all save ระหว่าง Concentrate)

## Chronurgy Magic (EGW) 🕰️

- Control: **A(3-20)** — Momentary Stasis(lv6, Incapacitate+Speed0)+Chronal Shift(บังคับ reroll หลังเห็นผล พลิก save ศัตรูได้)
- Support: **B(3-9) → A(10-20)** — Chronal Shift แก้ roll ally ได้ด้วย→Arcane Abeyance(lv10, บรรจุคาถาให้ใครก็ได้ปล่อยทีหลัง)
- Survivability: **C(3-20)** — Chronal Shift แก้ save ตัวเองได้เช่นกัน (floor-break D→C)
- Utility: **S(3-20)** — Arcane Abeyance(บรรจุคาถาเป็นไอเทม ให้ตัวเองหรือใครก็ได้ปล่อยภายหลัง)+Convergent Future(lv14, บังคับ roll อยู่ threshold)

## Graviturgy Magic (EGW) 🕰️

- Damage: **A(3-20)** — Violent Attraction(+1d10 ดาเมจตี ally หรือ +2d10 falling)+Event Horizon(lv14, AoE Force ต่อเนื่อง)
- Control: **A(3-20)** — Adjust Density+Gravity Well+Event Horizon = **"ชุด control หลากหลายที่สุดใน class นี้" ตามที่ old scorecard ระบุตรงๆ**
- Support: **B(3-20)** — Adjust Density บัฟ ally(speed+jump)+Violent Attraction เสริมดาเมจตี ally
- Action Economy: **C(3-20)** — Gravity Well ทำงานฟรีทุกครั้งที่คาถาโดนเป้า
- Versatility: **S(3-20)** — ดาเมจ+control+support ผ่านธีม gravity เดียว ประยุกต์ได้ทุกสถานการณ์

## Order of Scribes (TCE) 🕰️

- Damage: **A(3-20)** — Awakened Spellbook's damage-type swap บายพาส resistance ศัตรู
- Survivability: **B(3-13) → A(14-20)** — One with the Word (lv14, reaction ป้องกันดาเมจทั้งหมดจากการโดนตี 1 ครั้ง แลกด้วยเสียคาถา) = **cancel-the-hit instance ที่ 10 ในระบบ**
- Action Economy: **C(3-20)** — Awakened Spellbook ritual เวลาปกติ 1/วัน+Manifest Mind
- Utility: **A(3-5) → S(6-20)** — Manifest Mind(lv6, วิญญาณสอดแนม Darkvision+cast ผ่านมันได้)+Master Scrivener(lv10, ม้วนคาถาฟรีระดับสูงกว่าปกติ)
- Versatility: **S(3-20)** — สลับดาเมจ+สอดแนม+ป้องกันฉุกเฉิน+ม้วนคาถา ครอบคลุมหลายมิติ

## Chronomancer (ValdaSpire24Extras)

- Control: **A(10-20)** — Lag Spell (lv10, หน่วงผลคาถา 1-3 รอบ)+เข้าถึง Slow/Time Stop
- Support: **B(3-13) → A(14-20)** — Time Loop (lv14, reaction ให้ creature ที่เห็นรวม ally ได้เทิร์นพิเศษระหว่างเวลาหยุด)
- Survivability: **C(3-20)** — Retroactive Spell (cast บัฟตัวเองฟรีตอนทอย Initiative)
- Action Economy: **B(3-20)** — Chronoshift(action พิเศษฟรีทุกครั้งที่ cast Chronomancy)+Retroactive Spell(cast ฟรี)
- Versatility: **S(3-20)** — Time Loop(ally/ศัตรู)+Lag Spell/Chronoshift/Retroactive Spell ครอบคลุม damage-setup/control/support/AE

## Familiar Master (ValdaSpire24Extras)

- Damage: **A(3-20)** — Arcane Evolution(familiar โจมตีสเกลตาม slot)+Fiend Planar Familiar(lv14, AoE hellfire)

## Fumaturge (ValdaSpire24Extras)

- Control: **A(3-20)** — Fogcrafting (Difficult Terrain+sculpt/undispersible fog control)
- Survivability: **B(3-5) → A(6-20)** — Gaseous Escape(lv6, reaction free Gaseous Form+resist ย้อนหลัง)→Smoke Mage(lv14, Gaseous Form ไม่ต้อง Concentration+Fly เต็ม+cast ระหว่างแปลงร่าง)
- Action Economy: **C(10-20)** — Greater Fogcrafting's Fog Step (lv10, bonus action teleport ในกลุ่มควัน)
- Utility: **S(3-20)** — Smoke Animals(familiar ควันบิน 60ft)+Fogcrafting 4 modifier+Gaseous Form เต็มรูปแบบ

## Gastronomer (ValdaSpire24Extras)

- Support: **S(3-20)** — Monster Meal+Arcane Condiments(lv6)+**Heroic Snacks(lv10, cast Heroes' Feast ฟรี — ปกติเป็นคาถา lv6!)**+Five-Star Condiments(lv14) = **"ชุด support ที่ทรงพลังและกว้างที่สุดในบรรดา Wizard ทั้งหมด" ตามที่ old scorecard ระบุตรงๆ — คำชมสูงสุดในไฟล์**
- Utility: **S(3-20)** — Sous Chef(free Create Food and Water)+Arcane Condiments(utility spell ให้ทั้งทีม)
- Versatility: **S(3-20)** — Support+utility คู่ขนานที่กว้างที่สุด (10 ประเภทมอนสเตอร์+11 condiment)

## Magic Missile Mage (ValdaSpire24Extras)

- Damage: **A(3-13) → S(14-20)** — Extra Darts(สูงสุด 7-8 ลูก)+Giga-Missile(lv14, +Int mod ต่อลูก) บนคาถาที่โดนชัวร์ไม่ต้องทอย
- Control: **A(6-20)** — Versatile Missiles (lv6, แปลงลูกดอกเป็น Prone/Blind/Stun)
- Survivability: **B(3-9) → A(10-20)** — Shield of Missiles (lv10, +5AC+สวนกลับอัตโนมัติ+โซนดาเมจ)
- Action Economy: **C(3-20)** — Free Casting (cast Magic Missile ฟรี Int mod/วัน)

## Mystic Strategist (ValdaSpire24Extras)

- Damage: **A(3-20)** — Potent Spell(battle die ใส่ดาเมจคาถา)+Sanguine Spell(lv14, DoT Necrotic)
- Control: **A(3-20)** — Staggering Spell(halve speed+atk penalty)+Inexorable Spell(lv14, บังคับ reroll Disadvantage บนเป้าที่ save ผ่าน)
- Support: **B(3-20)** — Bolstering Spell(temp HP ally)+Morale Boost(reaction แก้ save ally พลาด)
- Survivability: **C(3-20)** — Unbreakable Concentration (reaction แก้ save Concentration พลาด)
- Action Economy: **C(10-20)** — Spell Tactics (lv10, bonus action+slot คืน battle die)
- Versatility: **S(3-20)** — 6 maneuver ต่างกันสิ้นเชิง = **"ครอบคลุมทุกมิติมากที่สุดในบรรดา Wizard subclass เดียว" ตามที่ old scorecard ระบุตรงๆ**

## Protomancer (ValdaSpire24Extras)

- Damage: **A(3-20)** — Amnesia Surge's Adv-on-spell-attack option (แลก spell เตรียมไว้)
- Control: **A(3-20)** — Amnesia Surge's Impose-Disadvantage option
- Survivability: **C(3-20)** — Amnesia Surge's Adv-on-own-saves+Mnemonic Concentration(lv10, การันตี save Concentration)
- Action Economy: **C(6-20)** — Vital Recovery (lv6, แลก Hit Dice เพิ่ม Arcane Recovery slot)
- Versatility: **S(3-20)** — Amnesia Surge แลก spell เพื่อโบนัส 3 แบบทุกครั้งที่ cast

## Scroll Scribe (ValdaSpire24Extras)

- Support: **A(3-20)** — Scribe Scroll's Universal Scrolls (ใครก็ได้ cast คาถาที่เตรียมไว้ของตัวเองจากม้วน ใช้ save DC/attack ตัวเอง)
- Survivability: **D(3-9) → C(10-20)** — Warding Scrawl (lv10, temp HP+Adv Concentration save)
- Utility: **S(3-20)** — Scroll Codex(lv14, ม้วนฟรี lv1-3 ไม่นับโควตา)+ม้วนคาถาปกติทุก rest
- Versatility: **S(3-20)** — เปลี่ยนทั้งปาร์ตี้ให้เข้าถึง spellcasting ตัวเองได้ = ขยาย breadth ทั้งทีม ไม่ใช่แค่ตัวเอง

## Somnomancer (ValdaSpire24Extras)

- Damage: **A(14-20)** — Nightmares (lv14, bonus action Psychic dmg=level ต่อเป้า Unconscious)
- Control: **S(3-20)** — Deep Sleep(fail save แรก=Unconscious ทันที)+Hypnotize(lv6, Charmed+ตอบคำถามจริง) = **"control/interrogation ที่แรงที่สุดในบรรดา Wizard" ตามที่ old scorecard ระบุตรงๆ**
- Survivability: **C(3-20)** — Somnambulist (ป้องกันตัวเองจากผล Unconscious แบบเต็ม)
- Utility: **A(3-9) → S(10-20)** — Lucid Dream (lv10, free-cast Divination/Dream/Legend Lore/Scrying ระหว่างหลับ)

## Tyromancer (ValdaSpire24Extras)

- Damage: **A(14-20)** — Lactose Intolerance (lv14, Ferment Spell +Poison dmg)
- Control: **A(6-20)** — Ferment Spell (lv6, แปลง save เป็น Con+Poisoned บน fail — ใช้ได้กับคาถาแทบทุกตัว)
- Survivability: **C(10-20)** — Legen-Dairy Resistance (lv10, แปลง save พลาดเป็นสำเร็จ 1/rest)

## Universalist (ValdaSpire24Extras)

- Damage: **A(3-20)** — Arcane Excellence (slot เพิ่ม 1 ช่องที่ระดับสูงสุดเสมอ)
- Control: **A(10-20)** — Spellwarp (lv10, สลับประเภท saving throw ของคาถาไปโจมตี save ที่อ่อนแอ)
- Action Economy: **C(3-5) → B(6-20)** — Eidetic Memory(lv6, Memorize Spell bonus action)+Erudite Focus(bonus action ระหว่าง Concentrate)
- Utility: **S(3-20)** — Universal Savant(สเปลล์โรงเรียนไหนก็ได้ฟรี)+Multidisciplinary Scholar(Expertise ที่ 2)
- Versatility: **S(3-20)** — "ผู้เชี่ยวชาญทุกด้าน" อย่างแท้จริง

## Wand Wizard (ValdaSpire24Extras)

- Damage: **A(6-20)** — Wand Slinger (lv6, bonus action cast จากไม้กายสิทธิ์ = 2 คาถา/เทิร์น)
- Control: **A(3-20)** — Arcane Duelist's Impair option+wand บรรจุคาถา control ได้
- Survivability: **B(3-9) → A(10-20)** — Warding Shield (lv10, free-cast Shield+5 บน save พลาด)
- Action Economy: **C(3-5) → B(6-20)** — Wand Slinger ให้ cast คาถาที่ 2 ผ่าน bonus action
- Utility: **S(3-20)** — Craft Wands (บรรจุคาถาไว้ในไม้กายสิทธิ์สูงสุด 6 อัน ระดับสูงสุด 5)
- Versatility: **S(3-20)** — ไม้กายสิทธิ์หลายอันพร้อมกัน (สูงสุด 6) + AE คูณสอง

## Daemonologist (GrimHollowPG24)

- Damage: **A(3-20)** — Eternal War Eruption(lv14, AoE คู่ธาตุ+Blind)+Unearthly Countenance(lv10, upcast ฟรี)
- Survivability: **C(3-20)** — Borrowed Tongues and Hides (resist Necrotic หรือ Radiant)
- Action Economy: **C(3-20)** — Stolen Secrets ให้ Invocation ที่ใช้ได้แบบ at-will
- Utility: **S(3-20)** — Stolen Secrets เข้าถึงคลัง Eldritch Invocation ทั้ง 28 ตัวของ Warlock
- Versatility: **S(3-20)** — 2 สาย (Daemon/Seraph) สลับได้ทุก long rest+Invocation pool

## Plague Doctor (Wizard) (GrimHollowPG24)

**⚠️ ขยับครบทั้ง 7/7 axis — ครั้งแรกในระบบทั้งหมดที่พบ subclass เดียวขยับทุกแกนพร้อมกัน**

- Damage: **A(3-20)** — Bad Medicine(ปาโปชั่น AoE 5 เอฟเฟกต์สะสม)+Medicinal Master(lv14, +2d8 Acid)
- Control: **A(3-20)** — Bad Medicine ให้ debuff หลากหลาย (Poisoned/halve speed/DoT พร้อมกันได้)
- Support: **S(3-20)** — Potion Craft(บรรจุคาถา single-target **อะไรก็ได้**ที่เตรียมไว้ลงโปชั่น)+Good Medicine(โปชั่นฮีล+ล้าง Poisoned) = **"ชุด support ที่ยืดหยุ่นที่สุดในบรรดา Wizard เพราะมอบคาถาอะไรก็ได้ให้ทีมใช้ผ่านโปชั่น" ตามที่ old scorecard ระบุตรงๆ**
- Survivability: **C(3-9) → B(10-20)** — Breathe It In (lv10, temp HP จากดาเมจ Necrotic/Poison+Immune Poisoned)
- Action Economy: **C(3-20)** — โปชั่นดื่มเป็น bonus action ต่อคน = แบ่งเบา action การ cast ให้ ally
- Utility: **S(3-20)** — Potion Craft (บรรจุคาถา single-target อะไรก็ได้จาก spellbook)
- Versatility: **S(3-20)** — ดาเมจ+control+support+ฮีล ผ่านกลไก potion-crafting เดียว

## Sangromancer (GrimHollowPG24)

- Damage: **A(3-20)** — Blood for Blood (lv10, แลก Hit Dice/Sangromancy Die เพิ่มดาเมจ ดับเบิลถ้าเป้า Bloodied)
- Survivability: **B(3-9) → A(10-20)** — Sanguine Vigor(+6 HP max+1/level+self-heal)→Red Renewal(lv14, คืน Hit Dice+Sangromancy Dice)
- Action Economy: **C(3-20)** — Blood for Blood ทำงานฟรีเป็นส่วนหนึ่งของการโดนคาถา

---

## ข้อค้นพบสำคัญ

1. **Survivability ขยับ 21/28 (75%) กว้างที่สุดในไฟล์** ทั้งที่ baseline เป็น D-flat อ่อนสุดในระบบร่วมกับ Sorcerer (d6 ไม่มี modifier เลย) — Wizard เป็น full-caster ตัวที่ 4 ติดต่อกัน (ต่อจาก Warlock/Warmage/Witch) ที่ Survivability floor กลายเป็นจุดขยับกว้างสุด ยืนยัน pattern นี้เป็นเรื่องปกติของ full-caster ทั้งหมดในระบบ ไม่ใช่ข้อยกเว้น
2. **⚠️ Plague Doctor (Wizard) ขยับครบทั้ง 7/7 axis พร้อมกัน — ครั้งแรกในระบบทั้งหมดเท่าที่เคยเจอ** ผ่านกลไก potion-crafting เดียวที่ครอบคลุมทุกมิติ (ดาเมจ/control/support/ฮีล/utility) — สอดคล้องกับ Overall=S ที่สูงสุดในบรรดา 28 subclass ของคลาสนี้ทั้งหมด
3. **พบ cancel-the-hit mechanism อีก 2 ครั้ง** (Illusionist's Illusory Self #9, Order of Scribes' One with the Word #10) — สะสมครบ 10 ครั้งพอดีเมื่อจบทั้งระบบ
4. **Bladesinger เป็น full-caster subclass ตัวที่ 5 ในระบบทั้งหมดที่ได้ Extra Attack จริงจาก subclass** (ต่อจาก Necromancer/Tactician/Warlock's Symbiont/Witch's Steel Magic) — ปิดชุด "gish hybrid" pattern ที่พบซ้ำในเกือบทุก full-caster class
5. **Gastronomer's Support ถูก old scorecard เรียกว่า "ทรงพลังและกว้างที่สุดในบรรดา Wizard ทั้งหมด" ตรงๆ** — รวมถึงกลไก Heroic Snacks ที่ free-cast คาถาระดับ 6 (Heroes' Feast) ได้จาก subclass feature โดยตรง เป็นตัวอย่างสุดโต่งของการฝ่าฝืนกฎ spell-level ปกติผ่าน subclass
6. **Versatility ขยับถึง S ได้ 12/28 (43%) ทั้งที่ baseline เป็น A-flat อยู่แล้ว (tier "สูง")** — สูงกว่าที่คาดไว้มาก เพราะ Wizard มี homebrew subclass จำนวนมาก (15/28) ที่มักออกแบบมาให้ theme ครอบคลุมหลายมิติพร้อมกันเป็นจุดขาย
7. **🏁 ไฟล์นี้ปิดชั้น 2 ทั้งระบบ — 30/30 คลาส, 481 subclass ครบสมบูรณ์** (ตัวเลขจริงสูงกว่าประมาณการเดิม 478 ที่ตั้งไว้ตอนเริ่มโปรเจกต์เล็กน้อย เพราะการนับ subclass คู่ 2014/2024 บางกรณีละเอียดขึ้นระหว่างทาง)
