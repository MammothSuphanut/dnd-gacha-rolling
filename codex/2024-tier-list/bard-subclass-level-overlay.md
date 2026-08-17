# Bard — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Bard + Bard College feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: `class-bard.json` (official, XPHB 2024 + XGE/TCE/FRHoF/RHW 2014-era) + `classes.json`'s `note` field + Grim Hollow PG'24 (Adventurers/Fools/Requiems) + Valda's Spire 2014 (Cantors/Graffiti/Jesters/Masks/Romance/Mad God)
**Class Baseline อ้างอิง**: [bard-level-baseline.md](bard-level-baseline.md)
**รูปแบบตาราง**: Delta-only แบบย่อ (pattern เดียวกับ [barbarian-subclass-level-overlay.md](barbarian-subclass-level-overlay.md) — 19 subclass เยอะกว่า threshold 10 ที่เริ่มใช้ format นี้)
**Subclass gate**: lv3/6/10/14 (ตรงกับ baseline's chassis table)
**สถานะ**: 🚧 first pass — Adventurers's "Adventurer's Talent" list และ Masks's mask list ส่วนใหญ่ถูกตัดจาก extract (ยาวเกิน/เป็น optionalfeature แยก) ทำเครื่องหมาย ⚠️ ไว้

**Class Baseline ที่ lv3/6/10/14**: Damage B/B/B/B · Control B/B/B/B · Support B/A/A/A · Survivability C/C/C/C · Action Economy C/B/B/B · Utility B/B/A/A · Versatility C/B/B/B

⚠️ **modifier-tie precedent ใช้ซ้ำอีกครั้ง**: College of Lore's Cutting Words (reaction, ลดเลขที่ทอย) เพิ่ม Reaction Value ให้ Action Economy แต่ที่ lv3 (ก่อน Font of Inspiration ปลดล็อกที่ lv5) tally ออก **2-2 tie** (BonusAction+Reaction=above, ExtraAction+ResourceConversion=below) → ไม่ขยับ ตรงกับ precedent จาก Barbarian's Berserker/Tranquility เป๊ะ

---

## Dance (XPHB) — melee/agility hybrid

Agile Strikes(lv3, จ่าย BI แลก unarmed strike ผูกกับ action/bonus/reaction ใดก็ได้) + Bardic Damage(lv3, unarmed ใช้ BI die+DEX) + Inspiring Movement(lv6, reaction ย้ายตัวเอง+ally เมื่อศัตรูจบเทิร์นใกล้) + Tandem Footwork(lv6, BI die→initiative ทั้งปาร์ตี้) + Leading Evasion(lv14, Dex-save AoE พลาด=โดนครึ่ง ผ่าน=ไม่โดนเลย แชร์กับ ally ข้างตัว)

- **Damage**: =baseline(B)→**A(3-20**, Agile Strikes+Bardic Damage ให้แหล่งโจมตีที่ 2 ผูกกับ BI แทบทุก action)
- **Survivability**: =baseline(C)→**B(14-20**, Leading Evasion = Evasion-tier modifier ตัวที่ 2 ต่อจาก Countercharm's Debuff Resistance — flip Mitigation เป็น above ครบ 2/4)

---

## Glamour (XPHB) — fey charm

Beguiling Magic(lv3, free Charm Person/Mirror Image + Charmed/Frightened rider หลัง Enchant/Illusion) + Mantle of Inspiration(lv3, temp HP+free-move CHA-mod ally ผ่าน BI) + Mantle of Majesty(lv6, free-cast Command ซ้ำได้ bonus action 1 นาที) + Unbreakable Majesty(lv14, attacker ต้อง save ไม่งั้นพลาด)

- **Control**: =baseline(B)→**A(6-20**, Beguiling Magic's condition-rider + Mantle of Majesty's free-repeatable Command สะสม 2 modifier)
- **Support**: B(3)→**A(3-19**, Mantle of Inspiration มาเร็วกว่า baseline's Font of Inspiration lv5)→S(20, เท่า baseline)
- **Survivability**: =baseline(C)→**B(14-20**, Unbreakable Majesty flip Mitigation เป็น above)

---

## Lore (XPHB) — spell/knowledge generalist

Cutting Words(lv3, reaction ลดเลขที่ทอยของศัตรูด้วย BI) + Magical Discoveries(lv6, 2 สเปลล์ Cleric/Druid/Wizard สลับได้ทุก level-up) + Peerless Skill(lv14, BI แก้ roll พลาด)

- **Utility**: B(3)→**A(6-20**, Magical Discoveries มาเร็วกว่า baseline's Magical Secrets lv10 ถึง 4 เลเวล)
- Action Economy: =baseline — Cutting Words เพิ่ม Reaction Value แต่ tally เป็น **2-2 tie** ที่ lv3 (ดูคำเตือนต้นไฟล์)

---

## Valor (XPHB) — martial hybrid

Combat Inspiration(lv3, BI die→+AC-on-hit หรือ +dmg-on-hit) + Martial Training(lv3) + **Extra Attack(lv6)** + Battle Magic(lv14, bonus-action weapon atk หลัง cast)

- **Damage**: A(3-13, Extra Attack+Combat Inspiration's Offense เปิดสาย weapon คู่ขนาน)→**S(14-20**, Battle Magic เพิ่ม attack ที่ 3 ทุกเทิร์นที่ cast)
- **Action Economy**: A(6-13, Extra Attack ดัน Primary ให้ตรง peer โดยตรง ไม่ใช่แค่ modifier-derived เหมือน baseline)→**S(14-20**, Battle Magic = Resource-to-Action Conversion ระดับสูงสุด "cast+ตี" แทบทุกเทิร์น)

---

## Swords (XGE, 2014-only)

Blade Flourish(lv3, Defensive/Mobile/Slashing เลือก 1/เทิร์น) + **Extra Attack(lv6)** + Master's Flourish(lv14, ใช้ d6 แทน BI die)

- **Damage**: =baseline(B)→**A(6-20**, Extra Attack+Flourish's BI-die dmg rider+Slashing Flourish's cleave)
- **Action Economy**: =baseline(B, C ที่ lv1-4)→**A(6-20**, Extra Attack ดัน Primary ตรง peer โดยตรง)

---

## Whispers (XGE, 2014-only)

Psychic Blades(lv3, +2d6→3d6(5)→5d6(10)→8d6(15) psychic ผ่าน BI) + Words of Terror(lv3, ตั้ง Frightened ผ่านบทสนทนา 1นาที) + Shadow Lore(lv14, Charmed 8ชม. action)

- **Damage**: A(3-9, Psychic Blades 2d6-3d6)→**S(10-20**, 5d6→8d6 dice scaling เข้าเพดาน outlier)
- **Control**: =baseline(B)→**A(14-20**, Shadow Lore ระยะยาว 8ชม.เดี่ยว เทียบเท่า/เหนือ peer's Tier3 spell)

---

## Creation (TCE, 2014-only)

Mote of Potential(lv3, effect เสริมตาม BI-die ใช้) + Performance of Creation(lv3, สร้างของ nonmagical มูลค่า 20gp×lv) + Animating Performance(lv6, ปลุกของให้เป็น ally สู้เอง) + Creative Crescendo(lv14, สร้างได้หลายชิ้น+ไม่จำกัด gp)

- **Utility**: B(3-5, Performance of Creation)→A(6-13)→**S(14-20**, Creative Crescendo ตัด gp limit ออก = สร้างอะไรก็ได้ nonmagical)
- **Damage**: =baseline(B)→**A(6-20**, Animating Performance = pet pattern เดียวกับที่พบใน Alchemist/Barbarian หลายจุด)

---

## Eloquence (TCE, 2014-only)

Silver Tongue(lv3, floor 9→10 Persuasion/Deception) + Unsettling Words(lv3, ลด save ศัตรูผ่าน BI) + Universal Speech(lv6, Tongues-เทียบเท่า CHA-mod เป้าหมาย) + Infectious Inspiration(lv14, แจก BI die ฟรีเมื่อสำเร็จ)

- **Utility**: =baseline(B)→**A(6-20**, Universal Speech ตรง peer's Tongues-tier ฟรี มาเร็วกว่า Magical Secrets lv10)
- Support: =baseline (Infectious Inspiration เสริมภายใน A เดิม ไม่ข้าม threshold ใหม่)

---

## Spirits (RHW)

Channeler(lv3, Guidance+tools) + Spirits from Beyond(lv3, buff ผ่าน BI เลือกได้) + Empowered Channeling(lv6, +1d6 dmg/heal roll + free Spirit Guardians ปรับป้องกัน ally ได้) + Mystical Connection(lv14, roll 2 เลือก 1)

- **Support**: =baseline(A จาก lv5)→**S(6-20**, free Spirit Guardians (ปกติ slot6) ปรับโหมดป้องกัน ally + heal-roll bonus มาเร็วกว่า peer มาก)
- **Damage**: =baseline(B)→**A(6-20**, free Spirit Guardians AoE ทุกเทิร์น + +1d6 dmg-roll bonus)

---

## Adventurers (GrimHollowPG24)

⚠️ **ข้อมูลไม่ครบ**: Adventurer's Talent list (ตัวเลือกจริงที่เรียนได้) ถูกตัดจาก extract

Party Planner(lv3, ผู้ถือ BI ใช้ Help ผ่าน bonus action) + Talented Adventurer(lv3/6/14, เรียน talent) + Well-Rounded(lv6)

- **Support**: B(3)→**A(3-19**, Party Planner มาเร็วกว่า Font of Inspiration lv5 — Help-action-ฟรีให้ทั้งทีม)→S(20, เท่า baseline)
- ⚠️ Utility/Versatility ที่อาจมาจาก Talented Adventurer's talent list **ไม่ประเมิน** จนกว่าจะดึงรายชื่อเต็มมาตรวจ

---

## Fools (GrimHollowPG24)

Antagonistic Antics(lv3, free VM+Dissonant Whispers + cast VM bonus-action หลัง Dash/Disengage/Influence) + Cruel Jest(lv3, reaction dmg เมื่อศัตรูพลาด d20-test ใดๆใกล้ตัว) + Gallows Humor(lv6, regen BI บนศัตรูตาย + Prone/Speed0 rider) + Last Laugh(lv14, resist-all-dmg 1นาที+reflect)

- **Damage**: =baseline(B)→**A(3-20**, bonus-action VM cast + broad-trigger Cruel Jest reaction dmg)
- **Control**: =baseline(B)→**A(6-20**, Gallows Humor's Prone+Speed0 rider)
- **Survivability**: =baseline(C)→**B(14-20**, Last Laugh flip Mitigation เป็น above)

---

## Requiems (GrimHollowPG24)

Chilling Melody(lv3, 2 necromancy cantrip) + Pluck the Heartstrings(lv3, Defense=ลงเหลือ BI-die HP แทน 0 / Offense=+dmg necrotic) + Stir the Bones(lv6, free Animate Dead + BI die ให้ undead) + Dual Death(lv14, necromancy spell ยิง 2 เป้า)

- **Survivability**: =baseline(C)→**B(3-20**, Pluck the Heartstrings's Defense option flip Death Prevention เป็น above — มาเร็วที่สุดในบรรดา subclass ของ Bard)
- **Damage**: =baseline(B)→**A(6-13**, Stir the Bones = pet-army pattern)→**S(14-20**, Dual Death เพิ่มประสิทธิภาพเป็น 2 เท่า)

---

## Cantors (VSS, 2014-only)

Healing Hymn(lv3, +BI-die+half-lv ฮีล) + Heavenly Voice(lv3, free Thaumaturgy) + Angelic Chorus(lv6, Help ระยะไกล+ward ally reaction-reflect) + Song of the Divines(lv14, Healing Hymn ฟรีไม่เสีย BI)

- **Support**: =baseline(A จาก lv5)→**S(14-20**, Song of the Divines ตัดต้นทุน BI ออกจาก Healing Hymn = ฮีลเสริมไม่จำกัดครั้งจริงจัง)

---

## Graffiti (VSS, 2014-only)

Street Art(lv3, มิวรัล +1→+3 ability-check/attack/save ทั้งปาร์ตี้ 30ft) + Signature Mark(lv6, mark เป้า+dmg เสริม+ally advantage) + Kaleidoscopic Spray(lv14, cone 15ft Blind+mark)

- **Support**: B(3)→**A(3-19**, Street Art มาเร็วกว่า Font of Inspiration lv5 — party-wide buff ครอบคลุมทั้ง check/attack/save)→S(20, เท่า baseline)
- **Control**: =baseline(B)→**A(14-20**, Kaleidoscopic Spray AoE cone Blind)

---

## Jesters (VSS, 2014-only)

Raconteur(lv3, BI-die+CHA extra dmg บน Vicious Mockery ที่ศัตรู save พลาด + disadvantage rider) + Juggling(lv6, bonus-action ranged atk ผ่านอาวุธปา) + Grand Finale(lv14, action เต็มเพิ่ม 1 ครั้ง/combat)

- **Damage**: A(3-13, Raconteur+Juggling)→**S(14-20**, Grand Finale = extra full action ตรงนิยาม Anchor's Extra Action Access เป๊ะ)
- **Action Economy**: =baseline(B)→**A(14-20**, Grand Finale flip Extra Action Access โดยตรง)

---

## Masks (VSS, 2014-only)

⚠️ **ข้อมูลไม่ครบ**: mask list ส่วนใหญ่ถูกตัด (มีแค่ Angel+Archmage บางส่วน) — ประเมินระมัดระวังจากที่มี

Persona Masks(lv3, เลือก 2 masks — Angel=BI-die+CHA radiant dmg on hit, Archmage=Fire Bolt+spell list) + Hidden Persona(lv6) + Master of Many Faces(lv14, สวม 2 masks พร้อมกัน)

- **Damage**: =baseline(B)→**A(3-20**, Angel mask's BI-die-dmg rider — pattern เดียวกับ Whispers/Raconteur)
- ⚠️ Master of Many Faces(lv14) อาจดัน Damage/Utility เพิ่มถ้ารู้ mask อื่นครบ — ไม่ประเมินเพิ่มจนกว่าจะมีข้อมูล

---

## Romance (VSS, 2014-only) — charm specialist

Cupid's Arrow(lv3, Wis-save Charmed ผ่าน BI) + Likeable(lv3, bonus-action disadvantage+immobilize เป้า charm) + Enemy of My Enemy(lv6, สั่งเป้า charm โจมตี ally ตัวเองผ่าน reaction ของมัน) + Infatuate(lv14, Charmed จนกว่าจะถูกถอน, target ต้อง Incapacitated ก่อน)

- **Control**: A(3-5, Cupid's Arrow+Likeable สะสม Charmed+disadvantage+immobilize เกิน peer เดี่ยว)→**S(6-20**, Enemy of My Enemy redirect เป้าโจมตีเอง เทียบเท่า/เหนือ Dominate-tier + Infatuate lv14 ระยะยาวเกือบถาวร)

---

## the Mad God (VSS, 2014-only)

Cacophony(lv3, บน save-fail ของศัตรู→psychic dmg/deafen-silence/forced-move ผ่าน BI) + Frenzied Strings(lv6, action, Wis save→Frenzied 1นาที โจมตีสุ่มรวม ally) + Mad Melody(lv14, AoE psychic สะสมผลตามจำนวนเทิร์น)

- **Control**: =baseline(B)→**A(6-20**, Frenzied Strings เทียบเท่า Confusion-lite)→**S(14-20**, Mad Melody's escalating AoE multi-turn control)

---

## the Moon (FRHoF)

Moon's Inspiration(lv3, Inspired Eclipse=invisible+teleport 30ft ผ่าน BI / Lunar Vitality=+BI-die ฮีล) + Primal Lore(lv3, Druidic+cantrip) + Blessing of Moonlight(lv6, free Moonbeam+heal-rider) + Eventide's Splendor(lv14, อัปเกรดทั้ง 2 ตัวเลือก)

- **Support**: =baseline(A จาก lv5)→**S(6-20**, Blessing of Moonlight free-cast slot3 spell (Moonbeam) + built-in heal-rider — pattern "free slot-spell = jump tier" ซ้ำอีกครั้ง)

---

## สรุปรวม 19 subclass (peak grade ต่อ axis)

| Subclass | Damage | Control | Support | Survivability | Action Economy | Utility |
|---|---|---|---|---|---|---|
| Class Baseline | B | B | S | C | B | A |
| Dance | **A** | =base | =base | **B** | =base | =base |
| Glamour | =base | **A** | =base(S เท่าเดิม) | **B** | =base | =base |
| Lore | =base | =base | =base | =base | =base | **A** |
| Valor | **S** | =base | =base | =base | **S** | =base |
| Swords | **A** | =base | =base | =base | **A** | =base |
| Whispers | **S** | **A** | =base | =base | =base | =base |
| Creation | **A** | =base | =base | =base | =base | **S** |
| Eloquence | =base | =base | =base | =base | =base | **A** |
| Spirits | **A** | =base | **S** | =base | =base | =base |
| Adventurers | =base | =base | =base(S เท่าเดิม) | =base | =base | =base⚠️ |
| Fools | **A** | **A** | =base | **B** | =base | =base |
| Requiems | **S** | =base | =base | **B** | =base | =base |
| Cantors | =base | =base | **S** | =base | =base | =base |
| Graffiti | =base | **A** | =base(S เท่าเดิม) | =base | =base | =base |
| Jesters | **S** | =base | =base | =base | **A** | =base |
| Masks | **A** | =base⚠️ | =base | =base | =base | =base⚠️ |
| Romance | =base | **S** | =base | =base | =base | =base |
| the Mad God | =base | **S** | =base | =base | =base | =base |
| the Moon | =base | =base | **S** | =base | =base | =base |

**ข้อค้นพบเบื้องต้น**:
1. **Damage ขยับบ่อยสุด (9/19)** — สวนทาง Alchemist/Artificer/Barbarian ที่ Support มักขยับบ่อยสุด เพราะ Bard baseline's Damage เริ่มที่ B แบนราบ (จุดอ่อนเดียวที่ subclass เกือบทุกสาย "BI-die+CHA/DEX dmg rider" เข้ามาแก้ได้ง่าย) ต่างจาก Support ที่ baseline สูงอยู่แล้ว (A ตั้งแต่ lv5) ทำให้ยากจะขยับต่อ
2. **"Extra Attack ผ่าน subclass" เจอ 2 ครั้ง (Valor, Swords)** — ทั้งคู่ดัน Action Economy Primary ให้ตรง peer โดยตรง (ไม่ใช่แค่ modifier-derived เหมือน baseline) ยืนยัน pattern เดียวกับ Artificer's Armorer/Battle Smith ว่า subclass Extra Attack แก้ทั้ง Damage และ Action Economy พร้อมกันเสมอ
3. **"BI-die+ability-mod extra damage rider" เป็น pattern ที่พบซ้ำมากที่สุดในไฟล์นี้** (Dance/Whispers/Jesters/Masks/Fools ทั้งหมด 5 subclass) — สะท้อนว่า Bardic Inspiration เป็นทรัพยากรที่ subclass designer ใช้ผูก damage rider ได้ง่ายที่สุด ตรงกับที่ baseline file เองระบุไว้แล้วว่า BI เป็น "ทรัพยากรคู่ขนานที่ Anchor ไม่เคยโมเดลไว้"
4. **"free-cast slot-tier spell" ยังคงเป็น pattern ที่ดัน Support ไปถึง S ซ้ำอีก 3 ครั้ง** (Spirits's Spirit Guardians, Cantors's cost-free Healing Hymn, the Moon's Moonbeam) — รวมกับที่เจอในคลาสก่อนหน้าแล้ว ยืนยันว่า pattern นี้ไม่ได้ผูกกับ "revival magic" อย่างเดียวอีกต่อไป แต่เป็น "free access ที่ slot สูงกว่าที่ควรได้ตอนนั้น" โดยรวม
5. **Romance/the Mad God คือ 2 subclass เดียวที่ Control ถึง S** — ทั้งคู่เป็นสาย charm/mind-control เข้มข้น (Bard's ธีมตามชื่อคลาส) ยืนยันว่า Control ของ Bard ที่แข็งแรงที่สุดมาจาก subclass ที่เน้น social/mental มากกว่า blast-based
