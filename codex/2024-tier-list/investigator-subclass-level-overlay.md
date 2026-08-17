# Investigator — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Investigator + subclass feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [investigator-subclass-scorecard-2024.md](investigator-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดครบทั้ง 14 ตัว — 13 native `ValdaSpire24`/`Extras` + Infernal Agent orphan 🕰️)
**Class Baseline อ้างอิง**: [investigator-level-baseline.md](investigator-level-baseline.md) — Damage C(1-10)→B(11-20) · Control D(1-6)→C(7-20) · Support D(1-6)→C(7-20) · Survivability C(1-17)→B(18-20) · Action Economy D(1)→C(2-20) · Utility B(1)→**A(2-20**, axis แข็งสุดของคลาส) · Versatility D(1)→B(2-20)
**รูปแบบตาราง**: Delta-only แบบย่อ (14 subclass)
**Subclass gate**: lv3/6/10/14 (uniform) — ใช้เลขจริงที่ระบุชัดในระบบเดิมเมื่อมี
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก subclass**:
1. **Survivability's C(1-17)→B(18-20) เป็น modifier-tally 2-2 tie เหมือนเดิม** — subclass ที่ flip Mitigation/Debuff-Resistance (มิติที่ยังเหลือ below) ได้ 1 มิติใหม่ จะดัน grade ไปถึง B (เท่าที่ baseline เองไปถึงที่ lv18) **แต่เร็วกว่ามาก** (lv3-14) — พบ 10/14 subclass! สูงที่สุดเท่าที่เคยเจอสำหรับ pattern นี้ เพราะ Trinkets/pool ของแต่ละ subclass มักมีของป้องกันติดมาด้วยเสมอ
2. **Versatility baseline หยุดที่ B (ไม่ใช่ A/S)** — เกณฑ์ทะลุต้องเป็น full-spell-list-access (Target-Type flip) หรือ real-time-reactive-universal-substitution (Adaptability flip) เท่านั้น พบแค่ 2 เคส (Occultist, Medium) แม้ subclass อื่นจะมี old-score สูงกว่าก็ตาม (multi-role reinforcement ธรรมดาไม่นับ)
3. **Utility S เกิดถี่ที่สุดในไฟล์นี้ (8/14)** เพราะ baseline Utility=A อยู่แล้วและธีมคลาส "นักสืบ" ทำให้แทบทุก subclass เพิ่ม detection/investigation tool ที่ magnitude สูง

---

## Antiquarian (native ValdaSpire24)

Trinkets ปลดล็อกสเปลล์ฟรีจากไอเทม (Scorching Ray→Fireball lv6→Soul Jar's 8d8 necrotic lv14) + Magic Item Collection(lv10, สร้างไอเทมวิเศษฟรี) + Warped Prism(free Shield)+Undead Fortitude

- **Damage**: C(1-2)→B(3-5)→**A(6-20**, escalating free-cast blast spell แท้จริง[Fireball-tier] ผลัก Primary เกิน baseline lv11)
- **Survivability**: C(1-2)→**B(3-20**, Warped Prism's free Shield flip Mitigation — เร็วกว่า baseline's เอง lv18 ถึง 15 เลเวล)
- **Utility**: A(2-9,=baseline)→**S(10-20**, Magic Item Collection+Lich's Deathmask 2 กลไกพร้อมกัน)

## Archivist (native ValdaSpire24)

Thesis(สเปลล์ ritual-tag สลับได้ทุกเลเวล)+Encyclopedic Expertise(lv10, free-identify)+Eidetic Memory(lv14, copy+cast สเปลล์ที่เห็นฟรี)

- **Utility**: A(2-9,=baseline)→**S(10-20**, Encyclopedic Expertise+Eidetic Memory ซ้อน 2 กลไก — old-score สูงสุดในกลุ่ม [10/10])
- ไม่มี delta อื่น (5 axis นิ่งสนิทตามระบบเดิม)

## Conspiracy Theorist (native ValdaSpire24Extras)

Masonic Charm(ขยาย crit range)+Three-Headed Coin+Off the Grid(lv14, reaction Invisible)+Connect the Dots(lv10, สลับ Expertise ได้)

- **Survivability**: C(1-13,=baseline)→**B(14-20**, Off the Grid flip Mitigation — onset ช้าสุดในกลุ่ม 10 ตัวที่ได้ delta นี้)
- ไม่มี delta อื่น (Damage/AE/Utility/Versatility old-score+1 modest)

## Containment Specialist (native ValdaSpire24Extras)

Containment Dimension(lv14, บังคับย้ายเป้าไปมิติกักกัน 10 นาที)+Black Bag(extradimensional storage+Antimagic)+Nothing to See Here(lv10, free Modify Memory×3)

- **Control**: C(7-13,=baseline)→**A(14-20**, Containment Dimension's 10-นาที-lockdown เกิน baseline's Rune-of-Banishment 1-รอบไปมาก)
- **Utility**: A(2-9,=baseline)→**S(10-20**, Black Bag+Nothing to See Here 2 กลไกพร้อมกัน)

## Detective (native ValdaSpire24)

Predictive Intuition(bonus action, +1d6 atk-boost+ลด atk เป้าใส่ตัวเอง)+Interrogator's Instinct(lv10)

- **Survivability**: C(1-2)→**B(3-20**, Predictive Intuition's atk-reduction flip Mitigation)
- **Utility**: A(2-9,=baseline)→**S(10-20**, Interrogator's Instinct — investigative utility ครบเครื่อง)

## Exterminator (native ValdaSpire24)

Monster Slayer(bonus action ตีเพิ่ม)+Killer Instinct(lv14, Exploit Weakness 2 เป้า/เทิร์น)+Silvered Shield(medium armor+shield)+Gilded Dragon Scale(resistance)

- **Damage**: C(1-2)→B(3-13)→**A(14-20**, Killer Instinct's double-debuff-application ผลัก Primary)
- **Survivability**: C(1-2)→**B(3-20**, Gilded Dragon Scale flip Mitigation)
- Action Economy: ไม่มี delta (Monster Slayer = bonus action มิติเดียวกับที่ above อยู่แล้ว)

## Infernal Agent (ValdaSpireExtras 🕰️)

Sinister Emblem(Fist/Shadow เลือกได้)+Broken Ankh+Kick 'em While They're Down

- **Damage**: C(1-2)→**B(3-20**, Shadow pet-attack option = extra-combatant-adjacent ผลัก Primary)
- **Survivability**: C(1-2)→**B(3-20**, Fist option's ถาวร BPS-nonmagical dmg-reduction flip Mitigation)

## Infernum (native ValdaSpire24Extras)

Diabolical Barb/Hexagram Pendant(free Hellish Rebuke/Hex)+Infernal Bargain(เลือกทุกวัน: extra-action-for-dmg/resist-vulnerability swap)+Spiteful Distraction

- **Damage**: C(1-2)→**B(3-20**, Infernal Bargain's extra-action-trade = genuine extra attack)
- **Control**: D(1-2)→**B(3-20**, Hex+Spiteful Distraction 2 กลไก debuff)
- **Survivability**: C(1-2)→**B(3-20**, Infernal Bargain's resistance-swap flip Mitigation — มี downside vulnerability แต่ net ยังบวก)
- **Action Economy**: C(2-2)→**B(3-20**, Infernal Bargain flip Extra-Action-Access — มิติที่ 3 เหนือ baseline's 2-2 tie เดิม)

## Inquisitor (native ValdaSpire24)

Divine Strike(rider)+Excommunication(lv14, no-heal+no-advantage 1 นาที)+Alabaster Balm(free Lesser Restoration)+Rote Piety(lv10, +3 Trinket-use แยกพูล)

- **Damage**: C(1-2)→B(3-13)→**A(14-20**, Excommunication's continuous nova ผลัก Primary)
- **Control**: C(7-13,=baseline)→**A(14-20**, Excommunication's broad+long-duration debuff เกิน baseline's Rune-of-Banishment)
- **Support**: D(1-2)→B(3-9, Alabaster Balm's free-heal-spell)→**A(10-20**, Rote Piety ซ้อนมิติที่ 2[Frequency])
- **Survivability**: C(1-2)→**B(3-20**, Consecrated Armor's free-cast AC-buff flip Mitigation)
- Action Economy: ไม่มี delta (Rote Piety = Resource-Conversion มิติเดียวกับที่ above อยู่แล้ว)

## Kid Sleuth (native ValdaSpire24Extras)

Dooby Snack(temp-HP+adv ally)+Split Up Gang(free ally move)+Meddling Kids(lv14, reaction protect ally)+Bag of Traps(control items)+Cunning Companion(lv10)

- **Control**: D(1-2)→**B(3-20**, Bag of Traps ให้ restrain/slow จริงผ่านไอเทม)
- **Support**: D(1-2)→A(3-9, Dooby Snack+Split Up Gang 2 กลไกทีม)→**S(14-20**, Meddling Kids ซ้อนมิติที่ 3 — protector kit หนาแน่นที่สุดในกลุ่ม)
- **Survivability**: C(1-9,=baseline)→**B(10-20**, Cunning Companion's free-repositioning flip Mitigation)

## Medium (native ValdaSpire24)

Foretold Demise+Foretelling(ใช้แทน d20 test ของตัวเอง**หรือใครก็ได้ที่เห็น** real-time)+Lucent Mirror(partial-ethereal escape)+Third Eye(lv14, free True Seeing)

- **Support**: D(1-2)→**A(3-20**, Foretelling ใช้การันตีผลของ ally ได้จริง — single mechanism ที่แรงพอเหมือน Order Domain's Voice of Authority)
- **Survivability**: C(1-2)→**B(3-20**, Lucent Mirror flip Mitigation ผ่าน partial-incorporeal)
- **Utility**: A(2-9,=baseline)→**S(10-20**, Whispers from Beyond+Third Eye 2 กลไก divination)
- **Versatility**: B(2)→**A(3-20**, Foretelling ใช้ real-time แทน d20 test ของใครก็ได้ flip Adaptability-Under-Pressure — 1 ใน 2 เคสเดียวที่ทะลุเพดาน B ของคลาสนี้)

## Occultist (native ValdaSpire24)

เข้าถึง spell list Warlock(Eldritch Blast)+Maleficium(lv14, Exploit Weakness→free Bestow Curse)+Eldritch Ruin(bonus action cantrip)+Eyes of Another World(lv10)

- **Damage**: C(1-2)→**B(3-20**, spell-based damage channel คู่ขนาน)
- **Control**: D(1-2)→**A(3-20**, Hex/Charm Person-tier ตรง peer benchmark)
- **Utility**: A(2-9,=baseline)→**S(10-20**, Eyes of Another World — detection utility ครบเครื่อง)
- **Versatility**: B(2)→**A(3-20**, full Warlock spell list flip Target-Type Coverage — เหมือน Eldritch Knight/Spellslinger ในคลาสก่อนหน้า)
- Action Economy: ไม่มี delta (Eldritch Ruin+Maleficium ทั้งคู่ bonus action = มิติเดียวกัน)

## Spy (native ValdaSpire24)

Cloak and Dagger+Martini Glass(free Charm Person)+Glass Dust(AoE Invisible รวมตัวเอง)+Body Double(lv10)+Glib(lv14)

- **Survivability**: C(1-2)→**B(3-20**, Glass Dust's self-Invisible flip Mitigation)
- **Utility**: A(2-9,=baseline)→**S(10-20**, Body Double+Horn-Rimmed Glasses+Glib — spy toolkit ครบเครื่อง)

## Time Operative (native ValdaSpire24Extras)

Borrowed Time(action พิเศษเต็มรูปแบบรวม Attack, 1/เทิร์น 2/long-rest)+Steal Time(lv14, ฟื้นเมื่อฆ่า)+Rewind(reroll d20)+Echo of Yesterday(lv10)

- **Damage**: C(1-2)→B(3-5)→**A(6-20**, Borrowed Time's extra-full-action ให้ Attack เพิ่มจริงจัง ผลัก Primary)
- **Action Economy**: C(2-2)→**B(3-20**, Borrowed Time flip Extra-Action-Access อย่างชัดเจน[action เต็ม ไม่ใช่แค่ bonus action] — มิติที่ 3 เหนือ baseline's 2-2 tie เดิม)
- **Utility**: A(2-9,=baseline)→**S(10-20**, Echo of Yesterday's scrying-tool ทรงพลัง)
- Survivability: ไม่มี delta (Rewind = Save-Reliability มิติเดียวกับที่ above อยู่แล้ว แม้ old-score จะสูง +3)

---

## สรุปเกรดที่ Lv20 (baseline + 14 subclass)

| Subclass | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | B | C | C | B | C | A | B |
| Antiquarian | **A** | C | C | **B**(lv3) | C | **S** | B |
| Archivist | B | C | C | B | C | **S** | B |
| Conspiracy Theorist | B | C | C | **B**(lv14) | C | A | B |
| Containment Specialist | B | **A**(lv14) | C | B | C | **S** | B |
| Detective | B | C | C | **B**(lv3) | C | **S** | B |
| Exterminator | **A**(lv14) | C | C | **B**(lv3) | C | A | B |
| Infernal Agent | **B**(lv3) | C | C | **B**(lv3) | C | A | B |
| Infernum | **B**(lv3) | **B**(lv3) | C | **B**(lv3) | **B**(lv3) | A | B |
| Inquisitor | **A**(lv14) | **A**(lv14) | **A**(lv10) | **B**(lv3) | C | A | B |
| Kid Sleuth | B | **B**(lv3) | **S**(lv14) | **B**(lv10) | C | A | B |
| Medium | B | C | **A**(lv3) | **B**(lv3) | C | **S** | **A** |
| Occultist | **B**(lv3) | **A**(lv3) | C | B | C | **S** | **A** |
| Spy | B | C | C | **B**(lv3) | C | **S** | B |
| Time Operative | **A**(lv6) | C | C | B | **B**(lv3) | **S** | B |

---

## ข้อค้นพบเบื้องต้น

1. **Survivability escape เกิดถี่ที่สุดเท่าที่เคยเจอ — 10/14 (71%)** เพราะ Trinkets/pool ของแทบทุก subclass มีของป้องกันตัวเองติดมาด้วยเสมอ (theme "นักสืบพกไอเทมเวทย์") — ทุกเคสไปถึงแค่ B เท่านั้น (ไม่มีตัวไหนถึง A) เพราะมีแค่ 1 มิติใหม่ที่ flip ได้ต่อครั้ง (Mitigation หรือ Debuff Resistance อย่างใดอย่างหนึ่ง ไม่เคยทั้งคู่พร้อมกัน)
2. **Utility S เกิด 8/14 (57%)** — สูงสุดเท่าที่เคยเจอสำหรับ axis เดียว เพราะ baseline Utility เป็น A อยู่แล้วและธีม "นักสืบ" ทำให้ subclass เกือบทุกตัวมี detection/investigation tool ที่ magnitude สูงพอข้าม A→S
3. **Versatility ทะลุเพดาน B ได้แค่ 2 เคส (Medium, Occultist)** ทั้งคู่ผ่านกลไกที่ตรงกับ pattern ที่เคยเจอในคลาสอื่น (full-spell-list-access=Occultist เหมือน Eldritch Knight/Spellslinger, real-time-universal-substitution=Medium เป็น pattern ใหม่ที่ไม่เคยเจอมาก่อน) — ยืนยันว่า multi-role reinforcement ธรรมดา (แม้ old-score สูง) ไม่พอข้าม threshold
4. **Action Economy escape (มิติที่ 3: Extra-Action-Access) เกิด 3 ครั้ง** (Infernum, Inquisitor-ไม่ผ่าน/Time Operative) — Time Operative's Borrowed Time เป็นตัวอย่างที่ชัดเจนที่สุด (action เต็มจริงๆ ไม่ใช่แค่ bonus action) ต่างจาก Inquisitor's Rote Piety ที่ดูแรง (old-score เท่ากัน) แต่จริงๆแค่เสริม Resource-Conversion มิติเดิม — ตอกย้ำว่า "extra full action" ≠ "extra bonus-action-uses" แม้จะดูคล้ายกันในคำอธิบาย
5. **Inquisitor เป็น subclass เดียวที่ได้ delta ครบ 5 ใน 7 axis** (Damage/Control/Support/Survivability, ขาดแค่ AE/Utility/Versatility) ตรงกับที่ระบบเดิมให้คะแนนกว้างที่สุดในกลุ่ม (14 คะแนน, breadth สูงสุด)
