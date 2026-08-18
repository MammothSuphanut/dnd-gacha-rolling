# Warlock — Subclass Level Overlay (ชั้น 2)

**อ้างอิง**: [warlock-level-baseline.md](warlock-level-baseline.md) (Class Baseline, ชั้น 1) + [warlock-subclass-scorecard-2024.md](warlock-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 19 subclass — gate lv3/6/10/14 (มาตรฐาน Warlock ทุกเวอร์ชัน)
**รูปแบบ**: delta-only แบบย่อ (>10 subclass) — list เฉพาะ axis/เลเวลที่เกรดเปลี่ยนจาก baseline เท่านั้น ไม่ระบุ = เท่า baseline
**หมายเหตุแหล่งที่มา**: Archfey/Celestial/Fiend/Great Old One ให้คะแนนด้วยกลไก 2024 (XPHB); Fathomless/Genie/Hexblade/Undying (2014-only 🕰️) และ Dead Mists/GM/Legacy/Magician/Symbiont (VSS 2014-only 🕰️) ไม่มี reprint ใน XPHB; The Undead (VRGR 🕰️) กับ Undead Patron (RHW 2024) แยกให้คะแนนคนละบรรทัด (เหมือน Fighter Banneret/PDK, Warden Hellkeeper/Diabolist); Future You Patron (ValdaPlayerPack 2024 reprint ของ The Future You VSS) ให้คะแนนเฉพาะเวอร์ชัน 2024

**Baseline โดยสรุป**: Damage A(1-10)→S(11-20) · Control B(1-20) flat · Support C(1-20) flat · Survivability C(1-20) flat · Action Economy **D(1-20) flat** (modifier-tally-lock แบบเดียวกับ Cleric — ต้องพลิก ≥2 modifier ถึงหลุด D→C) · Utility B(1-20) flat · Versatility C(1-20) flat

---

## The Archfey (XPHB)

- Control: **A(3-20)** — Taunting Step (AoE Disadvantage โจมตีเป้าอื่น) trigger ได้ทุกครั้งที่ teleport
- Survivability: **A(3-5) → S(6-20)** — Beguiling Defenses (immune Charmed+reaction ลดดาเมจครึ่ง+สะท้อน Psychic) ซ้อน Misty Escape (lv6, reaction Misty Step ตอนโดนดาเมจ) = mitigation+escape 2 ชั้น
- Action Economy: **C(14-20)** — Misty Step ฟรี(flip1)+Bewitching Magic (lv14, หล่อ Misty Step ฟรีในแอ็กชันเดียวกับสเปลล์ Enchant/Illusion, flip2)
- Versatility: **B(3-20)** — เลือกโหมด offense/defense ได้ทุกครั้งที่ teleport

## The Celestial (XPHB)

- Support: **S(3-20)** — Healing Light(bonus action ฮีล dice pool สเกลตามเลเวล)+Celestial Resilience(lv10, temp HP ทีมสูงสุด 5 คน passive trigger)+Searing Vengeance(lv14, กันตาย+ฮีลครึ่ง max HP+AoE dmg+Blind ทั้งทีม) = ชุด healer แรงสุดในคลาส
- Action Economy: **C(10-20)** — Healing Light bonus action(flip1, lv3)+Celestial Resilience passive ไม่เสีย action(flip2, lv10)

## The Coven (GrimHollowPG24)

- Control: **A(3-9) → S(10-20)** — Hag's Eye(หล่อ Hex/Bestow Curse ฟรี)→Hag's Visage(lv10, ห่วงโซ่ Frightened→Paralyzed→0HP ต่อ Humanoid) = control chain ยาวและแรงสุดในคลาส
- Utility: **A(14-20)** — Hag's Craft (ปรุงยา+สร้าง Minor Heartstone item ทุก long rest)

## The Dead Mists (VSS) 🕰️

*(ไม่มี delta — ขยับแค่ในระบบเดิม 2 axis เล็กน้อยที่ไม่ถึงเกณฑ์ระบบใหม่ — Support ยังเป็น 0 เต็ม, self-only ทั้งไฟล์)*

## The Fathomless (TCE) 🕰️

- Control: **A(3-20)** — Tentacle ลดความเร็วทุกครั้งที่ตีโดน→Grasping Tentacles(lv10, หล่อ Evard's Black Tentacles ฟรี, Concentration ทำลายไม่ได้)
- Action Economy: **C(10-20)** — Tentacle bonus action เคลื่อนที่+โจมตีทุกเทิร์น(flip1, lv3)+Grasping Tentacles หล่อฟรี(flip2, lv10)

## The Fiend (XPHB)

- Survivability: **B(3-9) → A(10-20)** — Fiendish Resilience(lv10, เลือก damage resistance ทุก rest)+Dark One's Blessing(temp HP ตอน kill)

## The First Vampire Patron (GrimHollowPG24)

- Survivability: **A(3-20)** — Drain Life self-heal loop+Eternal Night regen+Eldritch Appetite(lv10, kill คืน slot) = sustain loop ครบวงจร
- Action Economy: **C(10-20)** — Drain Life bonus action โจมตีซ้ำทุกเทิร์น(flip1, lv3)+Eldritch Appetite คืน slot(flip2, lv10)
- Utility: **A(6-20)** — Creature of the Night (Polymorph ตัวเองเป็น Bat/Rat/Wolf, Cha mod ครั้ง/วัน)
- Versatility: **B(3-20)** — ดาเมจ+lifesteal+shapeshift breadth

## The Genie (TCE) 🕰️

- Survivability: **B(3-20)** — Bottled Respite+Elemental Gift resistance
- Utility: **A(10-13) → S(14-20)** — Sanctuary Vessel(lv10, ที่หลบภัยทีม+short rest ฟรี)→Limited Wish(lv14, ขอผลคาถาระดับ 6 หรือต่ำกว่าใดก็ได้)
- Versatility: **B(3-13) → S(14-20)** — Limited Wish เดี่ยวๆ คือกลไกยืดหยุ่นที่สุดในคลาส

## The GM (VSS) 🕰️

- Survivability: **B(3-5) → A(6-20)** — Fudge The Roll(lv6, reroll/แก้ d20 ใดก็ได้รวม saving throw)→Plot Armor(lv10, temp HP ทีมทุก rest)
- Action Economy: **C(14-20)** — Fudge ไม่เสีย action(flip1, lv6)+OP Class Feature bonus action ให้ Advantage ต่อเนื่อง(flip2, lv14)
- Support: **B(10-20)** — Plot Armor temp HP ทีมที่ reliable ทุก rest
- Versatility: **B(3-5) → A(6-13) → S(14-20)** — Fudge The Roll(แก้ roll อะไรก็ได้)→OP Class Feature(Advantage ทุกอย่างชั่วคราว) = meta-tool ปรับใช้ได้ทุกสถานการณ์

## The Great Old One (XPHB)

- Control: **A(3-20)** — Eldritch Hex(Hex เตรียมตลอด+Disadvantage save)+Clairvoyant Combatant(lv6, บังคับเป้า Disadvantage ตีคนอื่น)
- Versatility: **B(3-20)** — Psychic damage reskin+cast Enchant/Illusion ไม่ใช้ component

## The Hexblade (XGE) 🕰️

- Damage: **S(3-20)** — Hexblade's Curse (bonus action ต่อเนื่อง +prof bonus ดาเมจ+crit range 19-20) ใช้งานได้ตั้งแต่ subclass gate — S-tier ดาเมจต่อเนื่องเร็วที่สุดในคลาส
- Survivability: **B(3-9) → A(10-20)** — Armor of Hexes(lv10, reaction 50% auto-miss ต่อผู้โจมตีเป้าที่สาป+ฮีลตอนเป้าตาย)
- Action Economy: **C(6-20)** — Hexblade's Curse bonus action(flip1, lv3)+Accursed Specter(lv6, summon นักสู้ฟรีที่ทำงานเอง, flip2)
- Versatility: **B(3-20)** — Hex Warrior เปิดทาง melee-caster hybrid ตั้งแต่ lv3+นักสู้เสริม

## The Legacy (VSS) 🕰️

- Damage: **S(3-20)** — Battle Dice(ดาเมจเสริมทุกครั้งที่ตีโดน สเกล 4d10 ที่ lv19)+Final Legacy(lv14, ลำแสงสูงสุด 30d10 Force)
- Support: **A(6-20)** — Resolute Legacy(lv6, aura Adv death/fear save+ฮีล ally)+Aura of Legend(lv10, resistance ทีม)+Final Legacy(ทีมช่วยชาร์จ)
- Survivability: **B(3-20)** — Relic of Transformation(AC เพิ่ม)+Adv death saves
- Versatility: **B(3-20)** — nova damage+party-wide support aura+resistance breadth

## The Magician (VSS) 🕰️

- Utility: **S(3-20)** — Abracadabra/Alakazam(หล่อคาถา Wizard ใดก็ได้ผ่าน Cha check)+Master of Illusions(lv14, Silent Image+Major Image ฟรี 2 คาถาพร้อมกัน) = utility stack กว้างสุดในคลาส
- Versatility: **S(3-20)** — เข้าถึง spell list เต็มของ Wizard ทุกระดับทุกโรงเรียน = floor-break pattern เดียวกับ Wu Jen/Occultist/Scholar แต่ครอบคลุมกว่า (ทุกโรงเรียน)

## The Parasite Patron (GrimHollowPG24)

- Control: **A(3-9) → S(10-20)** — Spell Siphon(reaction ขโมยสเปลล์+ห้าม cast 8ชม.)→Spawn Pawn(lv10, Dominate Person เตรียมตลอด+หล่อฟรี+Concentration ทำลายไม่ได้) = disruption chain แรงสุดในคลาส
- Survivability: **A(3-13) → S(14-20)** — Physical Specimen(เมนูบัฟ)+Symbiotic Sentinel(lv6, กัน surprise+Adv initiative+Adv charm/fear save)→Larval Regeneration(lv14, โกงความตายด้วยการย้ายร่างเป็นปรสิต)
- Utility: **A(3-20)** — Physical Specimen เมนู multi-option (climb/jump/darkvision/skill เลือกได้หลายอย่างพร้อมกัน)
- Versatility: **A(3-20)** — เมนูบัฟ 6 แบบ+control แรงสุด+survival-cheat breadth

## The Symbiont (VSS) 🕰️

- Damage: **S(6-20)** — Extra Attack ด้วยกรงเล็บ(lv3)+Traumatic Rend(lv6, โจมตีที่ 3 ฟรีหลังตีโดน 2 ครั้ง) = extra-attack-equivalent engine ที่ไม่ผูกกับ Eldritch Blast
- Action Economy: **C(6-20)** — Transform bonus action ปลดล็อก Extra Attack ต่อเนื่อง(flip1, lv3)+Traumatic Rend โจมตีที่ 3 ฟรี(flip2, lv6)
- Versatility: **B(3-5) → A(6-20)** — สลับโหมด caster/melee-brawler แบบเรียลไทม์ด้วย bonus action เดียว

## The Undead (VRGR) 🕰️

- Survivability: **A(3-9) → S(10-20)** — Form of Dread(temp HP+immune Frightened)→Necrotic Husk(lv10, resist/immune Necrotic+AoE burst ตอนใกล้ตาย 1/1d4 long rests, ทำหน้าที่ death-prevention)
- Utility: **A(14-20)** — Spirit Projection(lv14, แยกวิญญาณสำรวจ ทะลุสิ่งกีดขวาง+บิน)

## The Undying (SCAG) 🕰️

- Survivability: **B(3-13) → A(14-20)** — Defy Death(ฮีลตอน save-vs-death ผ่าน)+Indestructible Life(lv14, bonus action ฮีลตัวเองซ้ำได้)

## Undead Patron (RHW)

- Damage: **S(3-20)** — Arcane Necrosis (บายพาส damage resistance ทั้งหมด+สลับดาเมจเป็น Necrotic) = Reliability เหนือกว่า The Undead 2014
- Survivability: **A(3-9) → S(10-20)** — Necrotic Resilience+Unholy Resuscitation(lv10, กันตาย 1/rest — reliable กว่าเวอร์ชัน 2014's 1/1d4 long rests มาก)
- Action Economy: **C(10-20)** — Form of Dread bonus action(flip1, lv3)+Unholy Resuscitation trigger อัตโนมัติ(flip2, lv10)
- Utility: **A(3-20)** — Profane Casting(ยกเว้น component ทั้ง 2 โรงเรียน)+Ghostly Flight(lv14, บิน+ทะลุสิ่งกีดขวาง)
- Versatility: **A(3-20)** — ดาเมจ+control+survival+mobility ครบทุกมิติ ตามที่ old scorecard ระบุไว้เอง — ครบรอบด้านที่สุดในคู่ Undead/Undead Patron

## Future You Patron (ValdaPlayerPack)

- Control: **A(14-20)** — Grandfather Paradox(lv14, 10d6 Psychic+Stunned 1 นาที save ทุกจบเทิร์น)
- Support: **B(3-20)** — It Happened Like This ใช้แทนที่ d20 test ของ ally คนไหนก็ได้ที่เห็น ไม่ใช่แค่ตัวเอง
- Survivability: **A(3-9) → S(10-20)** — Expect an Ambush(lv10, Adv initiative+Resistance ดาเมจทุกชนิดรอบแรก)+I Could Do With Fewer Scars(reaction +10 AC 2/วัน) = cancel-the-hit-adjacent instance ที่ 4 ในระบบ
- Action Economy: **C(3-20)** — I Could Do With Fewer Scars reaction ไม่เสีย action(flip1)+It Happened Like This แทนที่ roll ไม่เสีย action(flip2)
- Utility: **S(3-20)** — It Happened Like This = เครื่องมือแทนที่ d20 test สากล (attack/check/save) ของใครก็ได้ที่เห็น กว้างสุดในคลาส
- Versatility: **A(3-13) → S(14-20)** — control+damage+defense+เครื่องมือ reliability สากล breadth กว้างสุดในคลาส บวก Grandfather Paradox(lv14) เพิ่มมิติ nova-execute

---

## ข้อค้นพบสำคัญ

1. **Survivability ขยับ 12/19 (63%) — กว้างที่สุดในไฟล์นี้** แม้ baseline จะตั้งไว้ C-flat แบบไม่มีจุดกู้เลยสักจุด (ทุกอย่างเป็น invocation choice track-neutral) — แต่ subclass ส่วนใหญ่เติมกลไก defense จริงมาเอง (self-heal loop, resistance-choice, death-prevention) ยืนยันว่า Warlock's Survivability floor เป็น "ทั่วไปหลวม" (generic-caster-assumption) ไม่ใช่ literal-floor-D แบบ Sorcerer
2. **Versatility ขยับ 14/19 (74%) — กว้างกว่า Survivability เล็กน้อย** ทั้งที่ baseline ระบุชัดว่า Pact Magic แข็งตัวกว่า Sorcery Points มาก — Magician (unrestricted full Wizard list) และ Genie/GM/Future You Patron (universal-tool mechanism) เป็นกลุ่มที่ทะลุไปถึง S
3. **Action Economy=D-flat หลุดจากเกณฑ์ modifier-tally-lock (ต้องพลิก ≥2 modifier) ได้ 9/19 (47%)** — ทุกตัวที่หลุดได้ผ่านการมี bonus-action ability ที่เป็น subclass-granted (ไม่ใช่ invocation choice track-neutral แบบ base kit) ซ้อนกับ automatic-trigger/free-cast อีกตัวหนึ่ง ยืนยัน pattern เดียวกับ Cleric ว่า modifier-tally-lock เปิดทางให้ subclass เข้ามาพลิกได้จริง ไม่ใช่ ceiling ตายตัว
4. **The Magician ทะลุ floor-lock ได้ 2 axis พร้อมกัน (Utility S + Versatility S)** ผ่านการเข้าถึง Wizard spell list เต็มรูปแบบทุกระดับทุกโรงเรียน — pattern เดียวกับ Wu Jen/Occultist/Scholar แต่เป็นครั้งแรกที่ครอบคลุม "ทุกโรงเรียน" ไม่ถูกจำกัดแบบ Warden's Loreseeker/Soulblood Shaman
5. **Undead Patron (RHW 2024) เหนือกว่า The Undead (VRGR 2014) อย่างชัดเจนใน 3 axis** (Damage S vs no-delta, Survivability S(10-20) vs S(10-20) เท่ากันแต่ reliability ต่างกันมาก คือ 1/rest vs 1/1d4 long rests, Versatility A vs no-delta) — ตัวอย่างที่ชัดเจนที่สุดในระบบว่า 2024 reprint ปรับสมดุลขึ้นจริง ไม่ใช่แค่ косметик
6. **Future You Patron's "I Could Do With Fewer Scars" (+10 AC reaction) เป็น cancel-the-hit-adjacent instance ที่ 4 ในระบบทั้งหมด** (ต่อจาก Gunslinger's Rōnin, Ranger's Nomad, Rogue's Sanguine Thief) — ต่างตรงที่เป็น AC-boost แทนที่จะเป็น auto-miss ตรงๆ แต่ +10 AC ทำให้แทบทุกการโจมตีพลาดในทางปฏิบัติ
7. **The Symbiont เป็น subclass ที่ 3 ในคลาส full-caster ที่ได้ Extra Attack จริงจาก subclass** (ต่อจาก Necromancer's Black Rider/Death Knight, Tactician's War Mind) — ผ่านกรงเล็บ Cha-based + Traumatic Rend เสริมโจมตีที่ 3 ฟรี ดัน Damage ตรงไป S ตั้งแต่ lv6
8. **Damage เป็น axis ที่ขยับน้อยที่สุด (4/19, 21%)** เพราะ baseline ตั้งสูงอยู่แล้ว (A ตั้งแต่ lv1 ผ่าน Agonizing Blast สมมติฐาน → S ตั้งแต่ lv11 ผ่าน Mystic Arcanum) เหลือพื้นที่ให้ subclass ยกระดับได้แค่การดัน S onset ให้เร็วขึ้น (Hexblade/Legacy/Undead Patron จาก lv3, Symbiont จาก lv6) ไม่ใช่การไต่เกรดใหม่
