# Gunslinger — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Gunslinger + subclass feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [gunslinger-subclass-scorecard-2024.md](gunslinger-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดครบทั้ง 34 ตัว — ใหญ่ที่สุดในโปรเจกต์ แบ่ง 4 กลุ่มที่มา: native `ValdaGunslinger`(6)/native `ValdaSpire24`(6)/cross-compatible ยืมจาก Vagabond(10)+Captain(6)/2014-only orphan 🕰️(6))
**Class Baseline อ้างอิง**: [gunslinger-level-baseline.md](gunslinger-level-baseline.md) — Damage B(1-10)→A(11-19)→S(20) · Control D(1-4)→C(5-20) · Support **D(1-20) flat** (floor) · Survivability C(1)→**A(2-20**, tally 4/4 เต็มตั้งแต่ lv7 ผ่าน Evasion) · Action Economy C(1)→**A(2-20**, tally 3/4) · Utility **D(1-20) flat** (floor) · Versatility B(1)→A(2-20)
**รูปแบบตาราง**: Delta-only แบบย่อ (34 subclass)
**Subclass gate**: lv3/6/10/14 (uniform) — ใช้เลขจริงที่ระบุชัดในระบบเดิมเมื่อมี
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก subclass**:
1. **Survivability/AE baseline ชนเพดาน tally เกือบเต็มแล้ว (4/4 และ 3/4 above ตามลำดับ)** — ต่างจากคลาสอื่นที่ยังมีที่ว่าง 2+ มิติ subclass ต้องมีกลไก**ประเภทใหม่จริงๆ**ไม่ใช่แค่เสริม Mitigation/Bonus-Action ที่ above อยู่แล้ว ถึงจะทะลุ A ไปถึง S ได้ (Survivability ต้องการ "multi-mechanism exceptional stack", AE ต้องการ "genuine Extra-Action-Access" ซึ่งเป็นมิติเดียวที่ยังเหลือ below)
2. **Damage early-S เกิดถี่ที่สุดเท่าที่เคยเจอ (14/34 ≈ 41%)** เพราะ homebrew Gunslinger เน้นกลไก multi-attack/AoE-multi-target/parallel-attack หนักมาก (ธีม "นักแม่นปืนยิงรัว") — สูงกว่า Fighter(6/21≈29%)/Dancer(5/14≈36%)/Druid(5/17≈29%)
3. **Versatility baseline หยุดที่ A เหมือน Fighter** — เปิดช่องให้ Spellslinger (full Wizard spell list, Target-Type flip) ทะลุไป S ได้เหมือน Eldritch Knight
4. **RNG-based subclass (Feylost) ยังคงไม่ให้เครดิต optimal-branch** ตาม precedent จาก Barbarian's Wild Magic — เครดิตเฉพาะเมื่อ deliberate-choice ปลดล็อก (Mercurial lv14)
5. **6 subclass ยืมมาจาก Captain โดยตรง (Daggermark/Dragon Banner/Eagle Banner/Jolly Roger/Siegeball Jersey/Yellow Sign)** — feature text เดียวกับที่ Captain overlay เคยให้คะแนนไว้ แต่ **grade ในไฟล์นี้ต่างจาก Captain เพราะเทียบกับ Gunslinger baseline คนละชุด** (คงความสอดคล้องของ mechanism-severity-judgment ไว้เมื่อทำได้)

---

## Adrenaline Junkie (🔁 Vagabond)

Hyper Focus+Bullet Time+Tuck and Roll+Daredevil — ทุกกลไกเสริมมิติที่ above อยู่แล้ว

- **ไม่มี delta** — subclass แรกในกลุ่มที่ 0 delta เต็ม

## Big Game Hunter (native ValdaSpire24Extras)

Elephant Gun(lv3, single-die burst 6d10)+Exotic Caliber(lv14, AoE cone/explosion)+Tracker(lv3)+Legendary Shot(lv10)

- **Damage**: B(1-2)→**S(3-20**, Exotic Caliber's AoE option ผลัก Primary ก่อน baseline)
- **Utility**: D(1-2)→**C(3-20**, Tracker หลุด floor — narrow)

## Brigand (🔁 Vagabond)

Take Hostage(lv3, Grappled+Incapacitated เป้า HP ต่ำ)+Underhanded Blow(lv3)+Cutthroat(lv14)

- **Control**: C(5)→**A(3-20**, Take Hostage's Incapacitated = Tier3+ ชัดเจน หลุดจาก baseline's Gut-Shot-tier)

## Covert Operative (ValdaSpireExtras 🕰️)

Fieldcraft+Sneaky Shot+Concealed Gear+double-prof

- **Utility**: D(1-2)→**C(3-20**, double-prof+Concealed Gear หลุด floor — spy toolkit narrow)

## Daggermark (🔁 Captain)

Flanking Strike(lv3, ally advantage)+Covert Tactics(lv3)+Evasion(lv10, ซ้ำกับ baseline's เอง lv7 — ไม่นับ)

- **Support**: D(1-2)→**B(3-20**, Flanking Strike หลุด floor)
- **Utility**: D(1-2)→**C(3-20**, Covert Tactics หลุด floor — narrow)

## Deadeye (native ValdaGunslinger)

Focused Shot(lv14, guaranteed-crit reliability)+Concealed Position(lv3)+Reposition(lv3)

- **Utility**: D(1-2)→**C(3-20**, Concealed Position's no-cover-hide หลุด floor — narrow)

## Dragon Banner (🔁 Captain)

Critical Focus(lv3)+Rampage(lv3, ฟรีย้าย+ตีทุกครั้งที่ครี/ฆ่า — ไม่เสีย action)+Bloody Spectacle(lv10, AoE Frightened)

- **Damage**: B(1-2)→**S(3-20**, Rampage's free-attack-on-crit ผลัก Primary — Critical Shot's crit-rate สูงทำให้ trigger ถี่)
- **Control**: C(5-9)→**A(10-20**, Bloody Spectacle AoE Frightened)
- **Action Economy**: A(2-2)→**S(3-20**, Rampage flip Extra-Action-Access — มิติสุดท้ายที่ baseline ยังไม่แตะ)

## Eagle Banner (🔁 Captain)

Hundred-Arrow Volley(lv14, AoE cone/cylinder)+Eagle Eye(lv3)+Counter-Shot(lv10, reaction ป้องกันทีม)

- **Damage**: B(1-2)→**S(14-20**, Hundred-Arrow Volley's AoE ผลัก Primary — onset ช้าเพราะเป็น lv14 gate)
- **Support**: D(1-2)→**B(10-20**, Counter-Shot ป้องกันใครก็ได้ในทีม)

## Feylost (🔁 Vagabond) — ⚠️ RNG-based

Fey Moods(lv3, สุ่ม 8 แบบ)+Frenzied Strike(lv3)+Misty Pathways(lv3)+Mercurial(lv14, เลือก mood เองได้)

- **Control**: C(5)→**A(3-20**, Frenzied Strike ไม่สุ่ม = flip Severity ตรงๆ)
- **Survivability**: A(2-13,=baseline)→**S(14-20**, Mercurial's deliberate-choice ปลดล็อกการเข้าถึงบัฟ 3+ ชนิดอย่างเชื่อถือได้ — ก่อนหน้านั้นเป็น RNG ไม่ให้เครดิต optimal-branch)

## Gourmand (🔁 Vagabond)

Monster Meal(lv3, temp-HP+3-type buff กลุ่ม)+Gourmet Ingredients(lv14, Heroic Inspiration/ability+2/free spell)+Quick Snack(lv3)

- **Support**: D(1-2)→**S(3-20**, Monster Meal ทีมกว้างตั้งแต่ gate แรก ซ้อนกับ Gourmet Ingredients ที่ lv14 — เต็ม max)

## Grenadier (native ValdaSpire24Extras)

Clusterbomb(lv14, AoE 20ft 10d6 ทะลุ resist)+Heavy Ordnance(lv3)+Take Cover(lv10)

- **Damage**: B(1-2)→**S(14-20**, Clusterbomb's AoE nova ผลัก Primary)
- **Control**: C(5-13)→**A(14-20**, Clusterbomb's Prone-AoE)
- **Support**: D(1-2)→**B(10-20**, Take Cover ขยาย Evasion ให้ ally)

## Gun Tank (native ValdaSpire24)

Walking Turret(lv3)+Gatling Shot(lv14, ตีซ้ำเป้าเดิมสูงสุด 5 ครั้งแม้ Disadvantage)+Heavy Gunner(lv3, medium/heavy armor)+Thick-Skulled(lv3)+Bulletproof(lv3)

- **Damage**: B(1-2)→**S(14-20**, Gatling Shot = multi-attack จริง)
- **Survivability**: A(2)→**S(3-20**, Heavy Gunner[armor]+Thick-Skulled[debuff resist]+Bulletproof[BPS resist] 3 กลไกใหม่พร้อมกัน — "ยกระดับข้ามขั้นจาก glass-cannon" ตามระบบเดิม)

## Gun-Ko Master (native ValdaSpire24)

Gun-Ko's Bonus Action Strike(lv3, เมลีเพิ่มผ่าน bonus action ทุกครั้งที่ยิงประชิดโดน)+Flash Assault(lv14)+Lightning Disarm(lv3)

- **Damage**: B(1-2)→**S(3-20**, parallel action+bonus-action attack ผลัก Primary)
- **Control**: C(5)→**A(3-20**, Lightning Disarm+Flash Assault's Prone 2 กลไก)
- Action Economy: ไม่มี delta — ⚠️ ระบบเดิมให้สูงสุด (9/10) แต่ Gun-Ko Strike/Wall Dash ทั้งคู่เป็น bonus action = มิติเดียวกับที่ above อยู่แล้ว (same-dimension trap)

## Gundead (ValdaSpireExtras 🕰️)

Gun Soul+Dead Shot(reaction ชุบศพ)+Grave Whisperer

- **Utility**: D(1-2)→**C(3-20**, Grave Whisperer หลุด floor — narrow)

## High Roller (native ValdaGunslinger)

Liar's Dice/Double or Nothing(variance สูง ไม่ใช่ magnitude รับประกัน)+Risk Taker(lv10)+Poker Face

- **ไม่มี delta** — variance-based feature ไม่นับเป็น magnitude แน่นอนตามนโยบายเดิม

## Houndmaster (🔁 Vagabond)

Sick 'Em!(lv3, สุนัขโจมตีเองทุกเทิร์นผ่าน bonus action)+Loyal Redirection(lv3)+Hound's Instincts(lv3)

- **Damage**: B(1-2)→**S(3-20**, extra-combatant pattern — สุนัขเป็นนักสู้คู่ขนาน)
- **Utility**: D(1-2)→**C(3-20**, Hound's Instincts' Blindsight หลุด floor — narrow)

## Janissary (ValdaSpireExtras 🕰️)

Coordinated Volley+Defensive Formation(lv14)+Steel Discipline+Influence

- **Utility**: D(1-2)→**C(3-20**, Steel Discipline+Influence หลุด floor — narrow)

## Jolly Roger (🔁 Captain)

Skirmish(lv3, bonus action ตีเพิ่มเมลี+ระยะไกล)+Dirty Tactics(lv10)+All Hands on Deck(lv14, bonus action ทีมทั้งหมด adv)

- **Damage**: B(1-2)→**S(3-20**, Skirmish's bonus-action extra attack ผลัก Primary)
- **Control**: C(5-9)→**B(10-20**, Dirty Tactics' Trip-or-Disadvantage choice)
- **Support**: D(1-2)→**S(14-20**, All Hands on Deck — ทีมทั้งหมดพร้อมกัน, เต็ม max)

## Knight Errant (🔁 Vagabond)

Chivalrous Oath(lv3, temp-HP+adv-vs-charm/frightened)+Redirection(lv10, resistance+รับแทน ally)+Surge of Valor(lv14)+Inspiring Battlecry(lv3)+Knight's Challenge(lv3)

- **Control**: C(5)→**B(3-20**, Knight's Challenge ขยาย taunt-duration)
- **Support**: D(1-2)→**A(3-20**, Inspiring Battlecry+Redirection 2 กลไกทีมพร้อมกัน)
- **Survivability**: A(2)→**S(3-20**, Chivalrous Oath+Redirection+Surge of Valor 3 กลไกป้องกันพร้อมกัน)

## Musketeer (native ValdaSpire24)

Skirmish(lv3, เหมือน Jolly Roger)+Morale Boost(lv3, temp-HP ทีม 5 คน)+All for One(lv14, reaction ยิงตอบโต้แทน ally)+Mobile Tactics(lv10)

- **Damage**: B(1-2)→**S(3-20**, Skirmish ผลัก Primary)
- **Support**: D(1-2)→**A(3-20**, Morale Boost+All for One 2 กลไกทีมพร้อมกัน)

## Pistolero (native ValdaSpire24)

Fan the Hammer(lv3, bonus action ตีเพิ่ม 2 ครั้งแม้ Disadvantage)+Bullet Time(lv14)+Showdown(lv10)

- **Damage**: B(1-2)→**S(3-20**, Fan the Hammer = multi-attack จริง 3 ครั้ง/เทิร์น)
- Action Economy: ไม่มี delta (Fan the Hammer = bonus action มิติเดียวกับที่ above อยู่แล้ว)

## Plague Doctor (🔁 Vagabond)

Imbalance Humors(lv3, 4-option debuff เลือกต่อการตี)+Remedy(lv3, bonus action ฮีล+ปลด condition)+Analgesic Remedy(lv10)

- **Control**: C(5)→**A(3-20**, Imbalance Humors 4-option — สอดคล้องกับที่ Captain's Plague Doctor เคยได้ A เช่นกัน)
- **Support**: D(1-2)→**A(3-20**, Remedy+Analgesic Remedy 2 กลไกฮีลจริง)

## Pugilist (🔁 Vagabond)

Intimidating Blow(lv6, AoE 10ft Frightened)+Unarmored Defense+Shrug Off+Desperate Endurance(lv10)

- **Control**: C(5)→**A(6-20**, Intimidating Blow AoE Frightened — สอดคล้องกับที่ Captain's Pugilist เคยได้ A เช่นกัน)
- Survivability: ไม่มี delta (Shrug Off+Desperate Endurance modest, ไม่ถึงเกณฑ์ exceptional-stack เหมือน Captain's เอง 2-2 tie finding)

## Rōnin (🔁 Vagabond)

Lone Wolf(lv3)+Killing Stroke(lv10, reaction ฆ่าผู้โจมตีก่อนโดนตี = auto-miss)+Swordmaster(lv14)

- **Survivability**: A(2-9,=baseline)→**S(10-20**, Killing Stroke ป้องกันการโจมตีไม่ให้ลงเลยไม่ใช่แค่ลดดาเมจ — mechanism ประเภท "cancel-the-hit")

## Secret Agent (native ValdaGunslinger)

License to Kill(lv14, exploding-dice reroll สูงสุดเท่า prof bonus)+Exit Strategy(lv3)+Parting Shot(lv3)+spy toolkit(lv3)

- **Damage**: B(1-2)→**S(14-20**, exploding-dice compounding-magnitude ผลัก Primary)
- **Utility**: D(1-2)→**B(3-20**, Concealed Shot cantrip+Disguise/Thieves' Tools+2 skill+Quick Change — toolkit กว้างสุดในกลุ่ม floor-escape นี้)

## Sharpshooter (VSS 🕰️)

Focused Shot(lv14)+Camouflage(lv3)+Eye For Movement(lv10)

- **Utility**: D(1-2)→**C(3-20**, Camouflage+Eye For Movement หลุด floor — narrow)

## Siegeball Jersey (🔁 Captain)

Team Inspiration(lv3, bonus action Battle Die ให้ ally)+Game Plan(lv3)+Athletic Constitution(lv10)+Game-Winning Play(lv14, action เต็มตอน 0 HP)

- **Support**: D(1-2)→**A(3-20**, Team Inspiration+Game Plan 2 กลไกทีม)
- **Action Economy**: A(2-13)→**S(14-20**, Game-Winning Play flip Extra-Action-Access ตอน 0 HP)

## Spellslinger (native ValdaGunslinger)

เข้าถึง spell list Wizard(lv3)+Spellshot(lv3)+Magic Bullet(lv14)

- **Damage**: B(1-2)→**S(3-20**, spell-based damage channel คู่ขนาน)
- **Control**: C(5)→**A(3-20**, Web/Hold Person-tier ตรง peer benchmark)
- **Utility**: D(1-2)→**C(3-20**, cantrip/spell utility เข้าถึงได้)
- **Versatility**: A(2)→**S(3-20**, spell list flip Target-Type Coverage[AoE vs single-target] — เหมือน Eldritch Knight ใน Fighter)

## Storm Gunner (ValdaSpireExtras 🕰️)

Bullet Hell(lv3, ยิงหลายเป้าพร้อมกันด้วยอาวุธ Automatic)+Riddle with Holes(lv14)+Ammunition Belt(lv7)

- **Damage**: B(1-2)→**S(3-20**, Bullet Hell = multi-target attack จริง)

## Trick Shot (native ValdaGunslinger)

Pinball Shot(lv14, สะท้อนไปเป้าอื่นสูงสุด 5 เป้าจากการตีครั้งเดียว)+Deft Deflection(lv10)+Ricochet(lv3)

- **Damage**: B(1-2)→**S(14-20**, Pinball Shot = multi-target-เทียม AoE)
- **Support**: D(1-2)→**B(10-20**, Deft Deflection ป้องกัน ally)

## Troubadour (🔁 Vagabond)

Inspiring Tune(lv3, bonus action Battle Die ให้ ally)+Marvelous Troupe(lv14, ขยายหลาย ally)+Fast Friends(lv3)

- **Support**: D(1-2)→**A(3-20**, Inspiring Tune+Marvelous Troupe 2 กลไกทีม)
- **Utility**: D(1-2)→**C(3-20**, Folk Musician หลุด floor — narrow)

## Twice-Damned (ValdaSpireExtras 🕰️)

Hateful Vengeance(lv3, guaranteed-max dmg ต่อเป้าที่มาร์ก)+Marked for Death(lv14, ฆ่าเป้าที่มาร์กใน 1 นาที→ได้ action เพิ่ม)+Black Bullet(lv3)

- **Action Economy**: A(2-13)→**S(14-20**, Marked for Death flip Extra-Action-Access โดยตรง)
- Damage: ไม่มี delta (Hateful Vengeance = guaranteed-max = Reliability reinforcement ไม่ใช่ multi-attack/AoE ใหม่)

## White Hat (native ValdaGunslinger)

Reach for the Skies(lv3, crit→Frightened+Incapacitated)+Long Arm of the Law(lv10, hobble speed)+Stunned-upgrade(lv14)+Lay Down the Law(lv3)+Steely-Eyed Aura(lv3)

- **Control**: C(5)→A(3-13, Reach for Skies+Long Arm 2 กลไก)→**S(14-20**, Stunned-upgrade ซ้อนมิติที่ 3 — severity สูงสุด)
- **Support**: D(1-2)→**A(3-20**, Lay Down the Law+Steely-Eyed Aura 2 กลไกทีม)

## Yellow Sign (🔁 Captain)

Frenzied Strike(lv3, บังคับเป้าโจมตีสุ่มรวมพวกเดียวกัน)+Maniacal Influence(lv10, สั่ง adv/disadv ให้เป้าที่ Frenzied)+Nightmarish Glow(lv14)+Outer Knowledge(lv3)

- **Control**: C(5)→**S(3-20**, Frenzied Strike[force-random-atk]+Maniacal Influence[adv/disadv control] 2 กลไก mind-control-chain — Control สูงสุดในกลุ่ม 34 subclass นี้)
- **Support**: D(1-2)→**C(14-20**, Nightmarish Glow ให้ ally ด้วยแต่เป็นโบนัสรอง)
- **Utility**: D(1-2)→**C(3-20**, Outer Knowledge หลุด floor — narrow)

---

## สรุปเกรดที่ Lv20 (baseline + 34 subclass, ย่อเฉพาะ axis ที่มี delta)

| Subclass | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | S | C | D | A | A | D | A |
| Big Game Hunter | **S**(lv3) | C | D | A | A | C | A |
| Brigand | S | **A** | D | A | A | D | A |
| Covert Operative | S | C | D | A | A | **C** | A |
| Daggermark | S | C | **B** | A | A | **C** | A |
| Deadeye | S | C | D | A | A | **C** | A |
| Dragon Banner | **S**(lv3) | **A**(lv10) | D | A | **S**(lv3) | D | A |
| Eagle Banner | **S**(lv14) | C | **B** | A | A | D | A |
| Feylost | S | **A** | D | **S**(lv14) | A | D | A |
| Gourmand | S | C | **S** | A | A | D | A |
| Grenadier | **S**(lv14) | **A**(lv14) | **B** | A | A | D | A |
| Gun Tank | **S**(lv14) | C | D | **S** | A | D | A |
| Gun-Ko Master | **S**(lv3) | **A** | D | A | A | D | A |
| Gundead | S | C | D | A | A | **C** | A |
| Houndmaster | **S**(lv3) | C | D | A | A | **C** | A |
| Janissary | S | C | D | A | A | **C** | A |
| Jolly Roger | **S**(lv3) | **B**(lv10) | **S**(lv14) | A | A | D | A |
| Knight Errant | S | **B** | **A** | **S** | A | D | A |
| Musketeer | **S**(lv3) | C | **A** | A | A | D | A |
| Pistolero | **S**(lv3) | C | D | A | A | D | A |
| Plague Doctor | S | **A** | **A** | A | A | D | A |
| Pugilist | S | **A**(lv6) | D | A | A | D | A |
| Rōnin | S | C | D | **S**(lv10) | A | D | A |
| Secret Agent | **S**(lv14) | C | D | A | A | **B** | A |
| Sharpshooter | S | C | D | A | A | **C** | A |
| Siegeball Jersey | S | C | **A** | A | **S**(lv14) | D | A |
| Spellslinger | **S**(lv3) | **A** | D | A | A | **C** | **S** |
| Storm Gunner | **S**(lv3) | C | D | A | A | D | A |
| Trick Shot | **S**(lv14) | C | **B** | A | A | D | A |
| Troubadour | S | C | **A** | A | A | **C** | A |
| Twice-Damned | S | C | D | A | **S**(lv14) | D | A |
| White Hat | S | **S**(lv14) | **A** | A | A | D | A |
| Yellow Sign | S | **S** | **C** | A | A | **C** | A |

*(Adrenaline Junkie/High Roller = 0 delta เต็ม, ไม่แสดงในตาราง)*

---

## ข้อค้นพบเบื้องต้น

1. **Damage early-S เกิดถี่ที่สุดเท่าที่เคยเจอ — 14/34 (≈41%)** สูงกว่า Dancer(36%)/Fighter(29%)/Druid(29%) เพราะ homebrew Gunslinger เน้นกลไก multi-attack/AoE-multi-target/parallel-attack เป็นแกนธีมของคลาสเอง (Gatling Shot, Fan the Hammer, Bullet Hell, Pinball Shot, Skirmish ล้วนเป็นตัวอย่างชัด)
2. **มีแค่ 2 subclass จาก 34 ตัวที่ 0 delta เต็ม** (Adrenaline Junkie, High Roller) — ต่ำกว่าสัดส่วนของ Cleric(7/27)/Druid(1/17 นับ Mutation) มาก เพราะ baseline ที่มี Support+Utility floor คู่กันเปิดช่องให้แทบทุก subclass หลุด floor ได้อย่างน้อย 1 axis
3. **Extra-Action-Access เป็นมิติเดียวที่เหลือให้ AE ขยับจาก A→S** (baseline มี Bonus-Action/Reaction/Resource-Conversion above ครบแล้ว) — พบ 3 เคสชัดเจน (Dragon Banner's Rampage, Siegeball Jersey's Game-Winning-Play, Twice-Damned's Marked-for-Death) ทุกเคสให้ "action เต็ม" จริงๆ ไม่ใช่แค่ bonus action เสริม
4. **Survivability tally เต็ม 4/4 ตั้งแต่ baseline (ครั้งแรกในระบบ)** ทำให้ต้องพึ่ง "exceptional multi-mechanism stack" เท่านั้นถึงจะข้าม A ไป S ได้ (4 เคส: Gun Tank/Feylost/Knight Errant/Rōnin) — Rōnin's Killing Stroke เป็นตัวอย่างใหม่ของ "cancel-the-hit" mechanism-type ที่ไม่เคยแยกประเภทมาก่อน (ต่างจาก Mitigation ที่แค่ลดดาเมจ)
5. **6 subclass ที่ยืมจาก Captain ให้ผลไม่เหมือนกันเป๊ะแม้ feature text เดียวกัน** — Plague Doctor/Pugilist ยืนยัน Control-A ตรงกับที่ Captain เคยให้ (mechanism severity เดียวกันจริง) แต่ Yellow Sign ได้ Control **S** ในไฟล์นี้ (สูงกว่าที่คาด) เพราะ Gunslinger baseline's Control C ต่ำกว่า Captain's baseline B ทำให้ threshold ข้ามง่ายกว่า — ยืนยันว่า "grade เดียวกันไม่การันตีข้ามคลาส" แม้ feature จะเหมือนกันทุกตัวอักษร
6. **Versatility ขยับได้ 1 ครั้ง (Spellslinger)** ตรงกับ pattern ของ Eldritch Knight ในคลาส Fighter (full spell-list access flip Target-Type Coverage) — ยืนยันว่า "gish subclass เข้าถึง spell list เต็มเล่ม" เป็น pattern ที่ให้ผลเดียวกันข้ามคลาสมาร์เชียลได้จริง
