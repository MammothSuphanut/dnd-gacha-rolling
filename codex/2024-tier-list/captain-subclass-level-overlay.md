# Captain — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Captain + subclass feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: Valda's Spire 2024 (native, ส่วนใหญ่) + Valda's Spire 2014 (7 "Banner" subclass ที่ไม่มี 2024 reprint แม้ `classes.json` label "VSS'24" — ยืนยันจากไฟล์จริงว่าอยู่ใน 2014 book เท่านั้น เก็บเป็น data-source discrepancy ไม่แก้ classes.json) + **12 subclass "cross-compatible" ที่เนื้อหาเต็มถูกเก็บไว้ใต้ Vagabond className ในไฟล์เดียวกัน** (Captain's entry แค่ป้ายกำกับสั้นๆ ชี้ไปที่ต้นฉบับ — ดึงจาก Vagabond แทน)
**Class Baseline อ้างอิง**: [captain-level-baseline.md](captain-level-baseline.md)
**รูปแบบตาราง**: Delta-only แบบย่อ (29 subclass — ใหญ่สุดเท่าที่ทำมา)
**Subclass gate**: lv3/6/10/14 สำหรับ subclass ยุค 2024 (native+cross-compatible) — **lv3/7/13/17 สำหรับ 7 subclass ยุค 2014** (cadence ต่างกัน ใช้เลขจริงตามไฟล์)
**สถานะ**: 🚧 first pass

**Class Baseline แบบ flat เกือบทุก axis**: Damage B(1-4)→C(5-20) · Control B(1-20) flat · Support B(1-20) flat · Survivability C(1-20) flat · Action Economy C(1-19)→B(20) · Utility D(1-20) flat · Versatility A(1-20) flat

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก subclass**: (1) **Cohort ไม่นับเข้า personal-axis ของ Captain** (unmodeled parallel actor ตาม baseline's finding#1) — subclass ที่แค่ "อัปเกรด Cohort" (เช่น Houndmaster's hound, Skull Banner's undead) ไม่ได้เครดิต Damage เพิ่มจากตัว pet เอง (2) **Survivability ต้องแก้ 2 ใน 3 มิติ D พร้อมกัน** (Mitigation/Debuff Resistance, ไม่นับ Death Prevention ที่ above อยู่แล้วจาก Rally) ถึงจะขยับ C→B — เจอ pattern นี้ซ้ำมากที่สุดในไฟล์นี้ (3) **modifier-tie 2-2 เกิดซ้ำอีก 2 ครั้ง** (Pugilist's Desperate Endurance, Siegeball Jersey's Athletic Constitution — ทั้งคู่ flip Save Reliability เป็น above แต่ tally ออก 2-2 พอดี ไม่ขยับ Survivability)

---

## Daggermark (native) — stealth/ambush

Covert Tactics(lv3) + Effortless Dodge(lv3, BD Disengage/Dodge) + Flanking Strike(lv6, ally advantage) + **Evasion(lv10)** + Preemptive Strike(lv14, reaction atk ก่อนโดนตี)

- **Survivability**: =baseline(C)→**B(10-20**, Evasion flip Mitigation เป็น above, ครบ 2/3 มิติ)

## Demon Brand (native) — demon shape-shift

Abyssal Arcana(lv3, free-cast utility spell 3 tier) + Demon Cohort(lv3, shape-shift) + Blindsight(lv6) + Instinctive Transformation(lv10, reaction resist+shift) + Abyssal Regeneration(lv14, self-heal ถ้า Bloodied)

- **Utility**: =baseline(D)→**B(3-20**, Abyssal Arcana free-cast utility spell 3 ระดับ — แก้ floor D)
- **Survivability**: =baseline(C)→**B(10-20**, Instinctive Transformation flip Mitigation เป็น above, ครบ 2/3 มิติ)

## Dragon Banner (native) — crit-fishing

Critical Focus(lv3, crit 19-20 + range ขยายบน kill/crit) + Rampage(lv3, free move+atk บน kill/crit) + Martial Recovery(lv6) + Bloody Spectacle(lv10, AoE Frightened บน kill/crit) + Coup de Grâce(lv14, 2BD execute)

- **Damage**: B(3-9, Critical Focus offset C-dip)→**A(10-20**, Coup de Grâce nova ซ้อนบน crit-range compounding)
- **Control**: =baseline(B)→**A(10-20**, Bloody Spectacle AoE Frightened)

## Eagle Banner (native) — ranged specialist

Close-Quarters Shooting(lv3) + Eagle Eye(lv3, BD แก้ miss) + Vantage Point(lv6) + Counter-Shot(lv10, reaction ลด atk ศัตรู) + Hundred-Arrow Volley(lv14, AoE ranged)

- ไม่มี delta ข้าม threshold ชัดเจน (Hundred-Arrow Volley ให้ Breadth modifier ตัวเดียว 1/4 ไม่พอ, Counter-Shot ซ้อนกับ Reaction Value ที่ above อยู่แล้ว) — build-optimizer ที่เสริมภายใน tier เดิม

## Feylost (via Vagabond) — mood-swing chaos

Fey Moods(lv3, สุ่มบัฟบน Bloodied — RNG ไม่ให้เครดิต) + Frenzied Strike(lv3, BD Frenzied) + Misty Pathways(lv6, free Misty Step) + Irresistible Mood(lv10, reaction Charmed/Frightened บน Bloodied) + Mercurial(lv14, เลือก mood เองได้)

- **Control**: =baseline(B)→**A(3-20**, Frenzied Strike = Confusion-lite เสริมด้วย Irresistible Mood lv10)
- ⚠️ Fey Moods table เป็น RNG — ไม่ให้เครดิต optimal-branch ตาม precedent จาก Barbarian's Wild Magic

## Gourmand (via Vagabond) — cooking buffs

Fine Cuisine(lv3) + Monster Meal(lv3, temp HP+buff หลายคน) + Carve(lv6) + Quick Snack(lv10) + Gourmet Ingredients(lv14, ตัวเลือก Wish Bone=free lv5 spell)

- **Support**: B(3-13, Monster Meal party-wide proactive buff)→**S(14-20**, Wish Bone = free-cast level-5 spell — pattern "free slot-tier spell" ซ้ำ)

## Holy Icon (native) — divine healer

Minor Miracle(lv3, Rally→2×BD+CHA ฮีล+revive-0HP, →4× ที่ lv10) + Theological Studies(lv3) + Zealous Fervor(lv6) + Aura of Reprieve(lv10) + **Raise Cohort(lv14, free Raise Dead)**

- **Support**: B(3-5, Minor Miracle Magnitude+revive-0HP)→A(6-13, Aura of Reprieve reinforce)→**S(14-20**, Raise Cohort free-cast Raise Dead — pattern "free revival" ซ้ำ)

## Houndmaster (via Vagabond) — dog companion

Desperate Companion(lv3) + Faithful Hound(lv3, pet — **ไม่นับ Damage** ตาม Cohort-exclusion) + Sick 'Em!(lv3) + Hound's Instincts(lv6) + **Loyal Redirection(lv10**, reaction redirect atk ระหว่างตัวเอง/hound) + Old Dog New Tricks(lv14)

- **Survivability**: =baseline(C)→**B(10-20**, Loyal Redirection flip Mitigation เป็น above)

## Jolly Roger (native) — pirate swashbuckler

Scallywag(lv3) + Skirmish(lv3, BD 2nd attack melee+ranged) + Fancy Footwork(lv6) + Dirty Tactics(lv10, Flank/Pocket-Sand/**Trip=Prone no-save**) + All Hands on Deck(lv14)

- **Damage**: =baseline(B, ไม่ตก C)→**B(5-20**, Skirmish's BD-fueled 2nd attack ชดเชย C-dip ตลอด)
- **Control**: =baseline(B)→**A(10-20**, Dirty Tactics's Trip = Prone ไม่มี save)

## Knight Errant (via Vagabond) — chivalry

Chivalrous Oath(lv3) + Knight's Challenge(lv3) + Inspiring Battlecry(lv6) + **Redirection(lv10**, reaction redirect+resist) + Surge of Valor(lv14)

- **Survivability**: =baseline(C)→**B(10-20**, Redirection flip Mitigation เป็น above)

## Lion Banner (native) — heroic leader

Challenge(lv3, BD mark+disadvantage) + Commanding Presence(lv3) + High Morale(lv6, Morale Boost AoE-save-coverage) + **Vengeful Gambit(lv10**, reaction resist+counter) + Heroic Leadership(lv14)

- **Control**: =baseline(B)→**A(3-20**, Challenge's persistent disadvantage-debuff)
- **Support**: =baseline(B)→**A(6-20**, High Morale's AoE-save-coverage = Breadth modifier)
- **Survivability**: =baseline(C)→**B(10-20**, Vengeful Gambit flip Mitigation เป็น above)

## Plague Doctor (via Vagabond) — battlefield medic

Physician(lv3) + Remedy(lv3, BD ฮีล+cure 4 condition) + Imbalance Humors(lv6, 4-option debuff-on-hit) + Analgesic Remedy(lv10) + Bloodletting(lv14)

- **Support**: =baseline(B)→**A(3-20**, Remedy's heal+condition-cure combo)
- **Control**: =baseline(B)→**A(6-20**, Imbalance Humors 4-option debuff menu)

## Pugilist (via Vagabond) — unarmed brawler

Hand-to-Hand(lv3, dice 1d6→1d12 + Brute Force free rider) + Shrug Off(lv3) + Intimidating Blow(lv6, AoE Frightened) + Desperate Endurance(lv10) + Knockout(lv14)

- **Damage**: B(3-16, Brute Force free extra-die offset)→**A(17-20**, 1d12 dice+Knockout burst)
- **Control**: =baseline(B)→**A(6-20**, Intimidating Blow AoE Frightened)
- Survivability: =baseline — Desperate Endurance flip Save Reliability แต่ tally เป็น **2-2 tie** (ดูคำเตือนต้นไฟล์)

## Rōnin (via Vagabond) — disgraced swordmaster

Grudge(lv3, BD เสริม) + Infamy(lv3) + Lone Wolf(lv6) + **Killing Stroke(lv10**, reaction counter+auto-miss) + **Swordmaster(lv14**, repeat attack ที่พลาด)

- **Damage**: A(10-13, Killing Stroke)→**S(14-20**, Swordmaster = Reliability modifier ใหญ่ที่สุดเท่าที่เจอในไฟล์นี้)
- **Survivability**: =baseline(C)→**B(10-20**, Killing Stroke flip Mitigation เป็น above)

## Siegeball Jersey (native, 2024) — sports coach

Sports Fanatic(lv3) + Team Inspiration(lv3) + Game Plan(lv6, เสริม Blitz — ไม่ใช่มิติใหม่) + Athletic Constitution(lv10) + Game-Winning Play(lv14)

- ไม่มี delta ข้าม threshold — Athletic Constitution flip Save Reliability แต่ tally เป็น **2-2 tie** (ดูคำเตือนต้นไฟล์), ที่เหลือเสริม dimension ที่ above อยู่แล้ว

## Skull Banner (native) — undead necromancer

**Horrific Strike(lv3**, BD Frightened rider) + Undead Cohort(lv3, pet — ไม่นับ Damage) + Undead Horde(lv6) + **Sacrificial Thralls(lv10**, reaction redirect) + **Necromantic Burst(lv14**, 10d8 AoE nova)

- **Control**: =baseline(B)→**A(3-20**, Horrific Strike = condition จริงแทน Battle-Die-penalty ธรรมดา)
- **Damage**: =baseline(C)→**S(14-20**, Necromantic Burst 10d8≈45 nova)
- **Survivability**: =baseline(C)→**B(10-20**, Sacrificial Thralls flip Mitigation เป็น above)

## Star-Spangled Banner (native) — patriotic tank

Bull Rush(lv3) + Patriotism(lv3) + Shield Fighter(lv3) + **Extra Attack(lv6)** + **Freedom of Movement(lv10**, free-cast self+Cohort) + Wings of Liberty(lv14)

- **Damage**: B(5-13, Extra Attack ข้าม C-dip)→**S(14-20**, Wings of Liberty compounding)
- **Action Economy**: B(6-13, Extra Attack ดัน Primary ตรง peer)→**A(14-20**, Wings of Liberty's extra bonus-action = Extra Action Access)
- **Survivability**: =baseline(C)→**B(10-20**, Freedom of Movement flip Debuff Resistance เป็น above)

## Tower Banner (native) — shield tank

Iron Wall(lv3) + Siege Defense(lv3) + Armored Redirection(lv6, protect ally) + **Mettle(lv10**, Con-save Evasion) + Iron Retribution(lv14, free reflect dmg)

- **Survivability**: =baseline(C)→**B(10-20**, Mettle flip Mitigation เป็น above)
- **Support**: =baseline(B)→**A(6-20**, Armored Redirection protect ally)
- **Damage**: =baseline(C)→**B(14-20**, Iron Retribution free reflect dmg บนพลาด)

## Troubadour (via Vagabond) — bard-flavored

Folk Musician(lv3) + Inspiring Tune(lv3) + **Fast Friends(lv6**, Charmed via Influence) + Scathing Retort(lv10, reflect dmg on miss) + Marvelous Troupe(lv14, multi-target BD)

- **Control**: =baseline(B)→**A(6-20**, Fast Friends genuine Charmed condition)
- **Support**: =baseline(B)→**A(14-20**, Marvelous Troupe multi-target Breadth)
- **Damage**: =baseline(C)→**B(10-20**, Scathing Retort free reflect dmg)

## Yellow Sign (native) — eldritch cult

Eldritch Herald(lv3) + Frenzied Strike(lv3, BD Frenzied — เหมือน Feylost) + Pallid Aura(lv6, debuff-roll aura) + Maniacal Influence(lv10) + Nightmarish Glow(lv14, +1d6 psychic ให้ตัวเอง+ally ในออร่า)

- **Control**: =baseline(B)→**A(3-20**, Frenzied Strike = Confusion-lite เหมือน Feylost)
- **Support**: =baseline(B)→**A(14-20**, Nightmarish Glow party-wide dmg buff)

---

## 2014-era subclass (cadence lv3/7/13/17 — ต่างจากที่อื่น)

## Demon Banner (2014) — precursor ของ Demon Brand, กลไกอ่อนกว่า

Demon Cohort(lv3) + Abyssal Rebuke(lv3, reaction BD fire dmg) + Demon's Sight(lv7) + Abyssal Arcana(lv13, ใช้ spellcasting โดยไม่ transform) + One with the Abyss(lv17, shared HP pool)

- **Damage**: =baseline(C, offset เล็กน้อยจาก Abyssal Rebuke)→**B(5-16** จาก reactive dmg — ไม่ถึง S เพราะไม่มี Instinctive-Transformation/Abyssal-Regeneration แบบรุ่น 2024)
- ⚠️ One with the Abyss's shared-HP-pool เป็น Primary-dimension boost ไม่ใช่ modifier — ไม่ map เข้ากฎ tie-break ตรงๆ ไม่ปรับเกรดแม้จะแรงเชิงคุณภาพ

## Jolly Roger Banner (2014) — precursor ของ Jolly Roger

Double Thrust(lv3, BD 2nd attack finesse) + Tricky Footwork(lv7) + Unfair Play(lv13) + All Hands on Deck(lv17)

- **Damage**: =baseline(B, ไม่ตก C)→**B(5-20**, Double Thrust's BD-fueled 2nd attack — เหมือน Jolly Roger's Skirmish)

## Ram Banner (2014)

Bull Rush(lv3, BD shove-check) + Surefooted(lv7) + Lock Horns(lv13) + And Stay Down(lv17, free OA บน Prone-ยืน)

- **Control**: =baseline(B)→**A(3-20**, Bull Rush's Prone-or-push contested check)
- **Damage**: =baseline(C)→**B(17-20**, And Stay Down free OA)

## Raven Banner (2014)

Effortless Dodge(lv3) + Flanking Strike(lv3, BD+half-lv rider) + Covert(lv7) + Strike First Strike Last(lv13) + Guerilla Warfare(lv17, free 2BD dmg round1)

- **Damage**: B(3-16, Flanking Strike conditional rider)→**A(17-20**, Guerilla Warfare free burst)

## Siegeball Banner (2014) — precursor ของ Siegeball Jersey, กลไกอ่อนกว่า

Sports Enthusiast(lv3) + Team Player(lv3, BD-give 1/นาที) + Superfan(lv7) + Incisive Taunt(lv13, CHA-mod/วัน) + Game-Winning Play(lv17)

- ไม่มี delta ข้าม threshold — ทุกฟีเจอร์แคบ/จำกัดกว่ารุ่น 2024 พอดี

## Treant Banner (2014)

Blocked Passage(lv3, สร้าง terrain กั้น) + Druidbane(lv7) + Superior Positioning(lv13) + Thornfoot(lv17, zone damage)

- ⚠️ กลไกหลักเป็น battlefield-terrain-control (ไม่ใช่ condition-ต่อ-เป้าหมาย) ไม่ map เข้า Anchor's Severity-scale ตรงๆ — ไม่ให้เครดิต Control
- **Damage**: =baseline(C)→**B(17-20**, Thornfoot zone damage)

## Turtle Banner (2014)

Bonus Proficiencies(lv3) + Iron Shell(lv3, BD AC-ally) + **Slow and Steady(lv7**, immune forced-move+Prone) + Shield Wall(lv13, half-cover ally) + Unbreakable(lv17, AC-pool — Anchor ตัด AC ออก)

- **Survivability**: =baseline(C)→**B(7-20**, Slow and Steady flip Debuff Resistance เป็น above)
- **Support**: B(3-12, Iron Shell)→**A(13-20**, Shield Wall เพิ่ม Mitigation-for-ally มิติที่ 2)

---

## สรุปรวม 29 subclass (peak grade ต่อ axis, ย่อ)

**Damage ถึง S**: Holy Icon(ไม่ถึง, สูงสุด S ใน Support), Skull Banner, Star-Spangled Banner, Rōnin — 3/29
**Support ถึง S**: Gourmand, Holy Icon — 2/29
**Control ถึง A (เพดานของคลาสนี้ ไม่มีตัวไหนถึง S)**: Dragon Banner, Feylost, Jolly Roger, Lion Banner, Plague Doctor, Pugilist, Skull Banner, Troubadour, Yellow Sign, Ram Banner — 10/29
**Survivability ถึง B (เพดานของคลาสนี้)**: Daggermark, Demon Brand, Houndmaster, Knight Errant, Lion Banner, Rōnin, Skull Banner, Star-Spangled Banner, Tower Banner, Turtle Banner — 10/29
**ไม่มี delta เลยสักแกน**: Eagle Banner, Adrenaline Junkie, Siegeball Banner — 3/29

**ข้อค้นพบเบื้องต้น**:
1. **Survivability's "ต้องแก้ 2/3 มิติ" กติกาคือตัวกรองสำคัญที่สุดของไฟล์นี้** — 10/29 subclass ขยับ Survivability ได้ (มากกว่าคลาสอื่นๆ ที่ทำมาเกือบทั้งหมด) เพราะ Captain's baseline Survivability มีแค่ 2 มิติ D (ไม่ใช่ 3 แบบ Artificer) ทำให้แก้แค่ 1 มิติเพิ่มก็พอ (Mitigation หรือ Debuff Resistance) ต่างจาก Artificer ที่ต้องแก้ 2 มิติพร้อมกัน — ยืนยันว่าจำนวน D-มิติเริ่มต้นของ baseline กำหนด "ความยากในการขยับ" ของ subclass ทั้งหมดในคลาสนั้น
2. **"redirect attack to self" เป็น pattern ที่ซ้ำมากที่สุด (7 subclass)** — Loyal Redirection/Redirection/Vengeful Gambit/Killing Stroke/Sacrificial Thralls/Freedom-of-Movement(ทางอ้อม)/Mettle ล้วนแก้ Mitigation ผ่านกลไกคล้ายกัน (reaction ป้องกันตัวเอง/redirect) — สะท้อนธีม "protector-leader" ของคลาส Captain ที่ subclass ส่วนใหญ่วนกลับมาที่จุดนี้
3. **ไม่มี subclass ไหนถึง Control S เลย (เพดานคือ A)** — ต่างจาก Bard ที่มี 2 subclass ถึง S — เพราะ Captain baseline's Control B เริ่มจากกลไก LR-bypass+Frequency ที่แข็งแรงอยู่แล้ว (severity ต่ำ) ทำให้แม้ subclass เพิ่ม condition จริงจัง (Charmed/Frightened/Prone) ก็แค่ดันไป A ไม่ถึง outlier-tier
4. **7 subclass ยุค 2014 (Banner) มักเป็นเวอร์ชันอ่อนกว่าของ 2024 cross-compatible คู่แฝด** (Demon Banner vs Demon Brand, Jolly Roger Banner vs Jolly Roger, Siegeball Banner vs Siegeball Jersey) — สอดคล้องกับที่ scope [[feedback_2024_scope_keep_2014_only]] คาดไว้ แต่เป็นครั้งแรกที่เห็นคู่ "รีเมค" ชัดเจนขนาดนี้ในคลาสเดียว
5. **Treant Banner เป็น subclass แรกที่กลไกหลักไม่ map เข้า 7-axis framework ได้ตรงๆ** (battlefield terrain-control ไม่ใช่ per-creature condition) — บันทึกเป็น methodology edge case สำหรับ subclass ประเภท "zone control" ที่อาจเจออีกในอนาคต (เช่น Druid's terrain spells)
