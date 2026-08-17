# Barbarian — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Barbarian + Primal Path feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: `class-barbarian.json` (official, source XPHB/2014-books) + `classes.json`'s `note` field (ระบุ source ที่ใช้จริงต่อ subclass ชัดเจน กันสับสนเรื่อง 2014/2024 ปนกัน) + Grim Hollow PG'24 (Fractured/Primal Spirit/Wrathful Dead) + Grim Hollow Player Pack (Carrion Raven) + Valda's Spire 2014 (Heavy Metal/Colossus/Fin/Rage Mage/Tranquility) + Valda's Spire Player Pack (Muscle Wizard)
**Class Baseline อ้างอิง**: [barbarian-level-baseline.md](barbarian-level-baseline.md)
**รูปแบบตาราง**: **Delta-only แบบย่อ** (ต่างจาก Alchemist/Artificer/Sacred Knight ที่ใช้ตาราง Axis|Lv|Grade|เหตุผลเต็ม) — เพราะ Barbarian มี **21 subclass** (มากกว่าที่เคยทำมา 2-3.5 เท่า) ใช้ bullet สั้นต่อ subclass แทนตาราง ยังคงอ้างอิง Anchor Rubric เดียวกันทุกจุด แต่ลดความยาวรายละเอียดต่อจุดลง — **นี่คือ format adaptation ใหม่สำหรับคลาสที่มี subclass เยอะ (20+)** ใช้ pattern นี้กับคลาสอื่นที่ subclass เยอะระดับเดียวกันต่อไป (Captain 29, Gunslinger 34, Cleric 27)
**Subclass gate**: lv3/6/10/14 (ตรงกับ baseline's chassis table เป๊ะ ไม่มี lv17 capstone แบบ Sacred Knight)
**สถานะ**: 🚧 first pass — บางตัว (Carrion Raven's maneuver list, Primal Spirit's companion statblock, Wild Magic's RNG table) ข้อมูลไม่ครบ 100% จาก extract เพราะยาวเกิน cutoff/เป็นตารางสุ่ม — ทำเครื่องหมาย ⚠️ ไว้ตรงจุด

**Class Baseline ที่ lv3/6/10/14**: Damage A/A/A/A · Control D/D/C/C · Support D/D/D/D · Survivability A/A/A/S · Action Economy C/C/C/C · Utility D/D/D/D · Versatility A/A/A/A

⚠️ **กติกา modifier-tie precedent จาก baseline** (ใช้ซ้ำหลายจุดในไฟล์นี้): baseline's Survivability lv2 เจอ tally 2-2 (above/below) แล้วตัดสินว่า "หักกลบสุทธิ ไม่ขยับ" — Barbarian's Action Economy tally เริ่มที่ 1above/2below(=C) พอดี ทำให้ subclass ที่เพิ่ม Reaction Value เป็น modifier ที่ 2 (above) มักเจอ tally 2-2 พอดี (ไม่ใช่ 2above/1below) — ต้องเช็คตัวเลขให้ตรงทุกครั้งว่าเป็น 2-2(ไม่ขยับ) หรือ 2-1(ขยับ) เพราะมีทั้ง 2 แบบในไฟล์นี้

---

## Berserker (XPHB) — pure damage/melee

Frenzy(lv3, extra dmg=Rage-Dmg-in-d6s บน Reckless hit) + Mindless Rage(lv6, immune Charmed+Frightened ระหว่าง Rage) + Retaliation(lv10, reaction melee attack เมื่อโดนตีใน 5ft) + Intimidating Presence(lv14, AoE Frightened bonus action, Wis save, refresh ผ่าน Rage)

- **Damage**: A(3-8, Frenzy เสริมภายใน A)→**S(9-20**, Rage Dmg+3 ผสม Frenzy dice ที่โตตาม)
- **Control**: =baseline(C จาก lv9)→**B(14-20**, Intimidating Presence AoE 30ft + refresh ผ่าน Rage = Breadth+Frequency เหนือ baseline's Brutal Strike riders)
- **Survivability**: A(3-5)→**S(6-20**, Mindless Rage แก้ Debuff Resistance จาก below→above ครบ 3/4 above)
- **Action Economy**: =baseline(C) — Retaliation เพิ่ม Reaction Value แต่ tally กลายเป็น **2-2 tie** (ไม่ใช่ 2-1) ตาม precedent → ไม่ขยับ

---

## Wild Heart (XPHB) — animal totem (2024 แทน Totem Warrior)

Rage of the Wilds(lv3, เลือก Bear/Eagle/Wolf) + Aspect of the Wilds(lv6, Owl/Panther/Salmon) + Nature Speaker(lv10, free ritual Commune with Nature) + Power of the Wilds(lv14, Falcon/Lion/Ram)

- **Support**: =baseline(D)→**C(3-20**, Wolf option: ally ได้ Advantage โจมตีศัตรูใกล้ตัวคุณ — Support mechanism แรกที่พบในสาย Barbarian)
- **Utility**: =baseline(D)→**C(6-9**, Aspect of the Wilds ให้ exploration trait จริง)→**B(10-20**, Nature Speaker free ritual)
- **Action Economy**: =baseline(C)→**B(3-20**, Eagle option: Dash+Disengage ผูกกับ Rage's bonus action แล้วขยายเป็น Bonus Action แยกภายหลัง — flip Extra Action Access เป็น above, 2above/1below)
- Survivability: =baseline (Bear's resist-เกือบทุกอย่าง เสริม Mitigation ที่ above อยู่แล้ว ไม่ flip มิติใหม่ตาม strict count rule)

---

## World Tree (XPHB)

Vitality of the Tree(lv3, temp HP ตัวเอง+ally ทุกเทิร์น) + Branches of the Tree(lv6, reaction บังคับเทเลพอร์ต+Speed 0) + Battering Roots(lv10, reach+mastery รวม) + Travel Along the Tree(lv14, เทเลพอร์ต 60-150ft พา 6 ally)

- **Support**: =baseline(D)→**C(3-20**, Life-Giving Force แจก temp HP ally ทุกเทิร์นระหว่าง Rage)
- **Control**: =baseline(D จน lv8)→**C(6-20**, Branches of the Tree เป็น reaction บังคับเทเลพอร์ต+Speed0 — มาเร็วกว่า baseline's lv9 ปกติ 3 เลเวล)
- **Utility**: =baseline(D)→**C(14-20**, Travel Along the Tree เทเลพอร์ตไกล+พา ally 6 คน — เทียบเท่า peer's Teleport-tier)

---

## Zealot (XPHB)

Divine Fury(lv3, extra 1d6+half-lv Necrotic/Radiant) + Warrior of the Gods(lv3, d12 pool self-heal bonus action) + Fanatical Focus(lv6, reroll save+Rage Dmg) + Zealous Presence(lv10, ≤10 ally Advantage atk+save) + Rage of the Gods(lv14, flight+resist+ally-revive reaction)

- **Damage**: A(3-13)→**S(14-20**, Divine Fury's dice+half-level bonus compound เป็น outlier)
- **Support**: =baseline(D)→**S(10-20**, Zealous Presence: 10 เป้าหมาย Advantage ทั้ง atk+save พร้อมกัน เทียบเท่า/เหนือ Holy Aura magnitude แม้ breadth เดี่ยวเทิร์น — เสริมด้วย Rage of the Gods's ally-revive reaction lv14)
- **Survivability**: A(3-5)→**S(3-20**, Warrior of the Gods self-heal flip Death Prevention เป็น above ทันทีที่ lv3 — เร็วกว่าคลาสอื่นเกือบทั้งหมด)

---

## Ancestral Guardian (XGE, 2014-only)

Ancestral Protectors(lv3, mark ศัตรู→disadvantage atk คนอื่น+resist ผลดาเมจให้เป้ารอง) + Spirit Shield(lv6, reaction ลดดาเมจ ally 2d6→3d6(lv10)→4d6(lv14)) + Consult the Spirits(lv10, free augury/clairvoyance) + Vengeful Ancestors(lv14, ดาเมจที่กันได้สะท้อนเป็น Force ใส่ผู้โจมตี)

- **Support**: =baseline(D)→**C(3-5**, Ancestral Protectors' party-wide resistance-if-hit-others)→**B(6-9**, Spirit Shield 2d6)→**A(10-13**, 3d6)→**S(14-20**, 4d6+Vengeful Ancestors' dmg-reflect)
- **Control**: =baseline(D)→**C(3-20**, Ancestral Protectors marks 1 ศัตรูให้ disadvantage เป้าอื่น)
- **Utility**: =baseline(D)→**C(10-20**, Consult the Spirits free augury/clairvoyance)

---

## Battlerager (SCAG, 2014-only, Dwarves-only ตามต้นฉบับ)

Battlerager Armor(lv3, spike bonus-action atk 1d4) + Reckless Abandon(lv6, temp HP บน Reckless) + Battlerager Charge(lv10, Dash bonus action) + Spiked Retribution(lv14, 3 dmg สะท้อนผู้โจมตีประชิด)

- **Action Economy**: =baseline(C)→**B(10-20**, Battlerager Charge flip Extra Action Access เป็น above, 2above/1below)
- Damage/Survivability: =baseline (ฟีเจอร์เล็กเกินจะข้าม threshold — spike atk 1d4, temp HP เล็กน้อย, reflect 3 dmg)

---

## Beast (TCE, 2014-only)

Form of the Beast(lv3, natural weapon Bite/Claws/Tail) + Bestial Soul(lv6, adapt trait) + Infectious Fury(lv10, WIS save→forced-attack-ally-เลือกเอง หรือ 2d12 psychic) + Call the Hunt(lv14, temp HP+dmg-buff ally หลายคน)

- **Control**: =baseline(C จาก lv9)→**B(10-20**, Infectious Fury's forced-attack-a-random-target option — ให้เครดิตเฉพาะตอนเลือก control branch ไม่ double-dip กับ Damage branch เดียวกัน)
- **Support**: =baseline(D)→**B(14-20**, Call the Hunt: temp HP+dmg buff ให้ ally หลายคนพร้อมกัน CON-mod ครั้ง/วัน)

---

## Storm Herald (XGE, 2014-only) — เลือก environment ได้ทุก level-up

Storm Aura(lv3, Desert/Sea/Tundra) + Storm Soul(lv6, passive resist) + Shielding Storm(lv10, แชร์ resist ให้ ally ในออร่า) + Raging Storm(lv14, upgrade ตาม environment)

- **Support**: =baseline(D)→**C(3-9**, Tundra option แจก temp HP ทุกคนในออร่าทุกเทิร์น)→**A(10-13**, Shielding Storm แชร์ damage resistance ให้ ally ทั้งออร่า — Mitigation-for-ally breadth ใหญ่)→**S(14-20**, สะสม temp-HP+resist-sharing+Tundra's Speed-lock รวมกันถึงระดับ outlier)
- Control/Damage: =baseline (Desert/Sea dmg options เสริมภายใน tier เดิม ไม่ข้าม threshold ใหม่)

---

## Wild Magic (TCE, 2014-only)

Magic Awareness(lv3, ตรวจจับเวท) + Wild Surge(lv3, สุ่มผล) + Bolstering Magic(lv6, touch ally บัฟ/คืน slot) + Unstable Backlash(lv10)/Controlled Surge(lv14, ปรับตารางสุ่ม)

- **Support**: =baseline(D)→**C(6-20**, Bolstering Magic touch ally บัฟ d3/คืน spell slot — real mechanism แม้จำกัด PB/วัน)
- ⚠️ **Wild Surge table เป็นผลสุ่ม ไม่ใช่ตัวเลือกผู้เล่น** — ไม่ให้เครดิตแบบ "เลือก optimal branch" เหมือน subclass อื่น (ต่างจากหลักการที่ใช้กับ Beast/Fractured ที่ผู้เล่นเลือกได้เอง) เพราะ DM/ทอยเต๋าเป็นคนกำหนดผล ไม่ใช่ตัดสินใจของผู้เล่น — Control/Damage/Utility อื่นๆ ที่อาจเกิดจากตาราง **ไม่นับเข้า grade** ในไฟล์นี้ (methodology caveat ใหม่สำหรับ RNG-table subclass feature)

---

## Totem Warrior (PHB, 2014-only) — subclass แบบ 2014 ดั้งเดิม (Wild Heart คือฉบับ 2024)

Totem Spirit(lv3, Bear/Eagle/Elk/Tiger/Wolf) + Spirit Seeker(lv3, ritual ฟรี) + Aspect of the Beast(lv6) + Spirit Walker(lv10, free ritual) + Totemic Attunement(lv14)

- **Support**: =baseline(D)→**C(3-20**, Wolf totem: ally ได้ Advantage โจมตีศัตรูใกล้ตัว — เหมือน Wild Heart's Wolf)
- **Utility**: =baseline(D)→**C(3-20**, Spirit Seeker's ritual Beast Sense/Speak with Animals ตั้งแต่ lv3 เสริมด้วย Spirit Walker lv10)

---

## Giant (BGG)

Giant's Havoc(lv3, Crushing Throw+Giant Stature) + Elemental Cleaver(lv6, weapon +1d6 elemental, ขว้างได้) + Mighty Impel(lv10, bonus action ผลักเป้าหมาย 30ft+ตก) + Demiurgic Colossus(lv14, ขยายขนาด+reach)

- **Control**: =baseline(C จาก lv9)→**B(10-20**, Mighty Impel: บังคับย้ายตำแหน่ง 30ft+ตกพื้น/prone, bonus action ทุกเทิร์น, Str save)
- Damage: =baseline (Elemental Cleaver +1d6/2d6 เสริมภายใน A/S เดิม ไม่ข้าม threshold ใหม่)

---

## Carrion Raven (GrimHollowPlayerPack)

⚠️ **ข้อมูลไม่ครบ**: Martial Maneuvers list (รายชื่อ maneuver ที่เลือกได้จริง) ถูกตัดออกจาก extract เพราะยาวเกิน — ให้เครดิตเฉพาะฟีเจอร์ที่ระบุชัดเจนเท่านั้น

Feral Celerity(lv3, atk ตอนเข้า Rage+concentration ระหว่าง Rage) + Martial Maneuvers(lv3, ระบบ maneuver point แยก) + Raven's Spirit(lv6) + Ferocious Rage(lv10, AoE Frightened เข้า Rage) + Violent Hunger(lv14, reroll max-die)

- **Control**: =baseline(C จาก lv9)→**B(10-20**, Ferocious Rage: AoE 10ft Frightened ทุกครั้งเข้า Rage — Breadth+Frequency เหนือ baseline's single-target riders)
- ⚠️ Versatility/Action Economy ที่อาจเกิดจากระบบ Maneuver Points **ไม่ประเมิน** จนกว่าจะดึงรายชื่อ maneuver เต็มมาตรวจ

---

## Fractured (GrimHollowPG24)

Face of Rage(lv3, unarmed 1d8 Force+push/prone CON save) + Brains and Brawn(lv6, resist เกือบทุกอย่างขณะ Rage) + Cunning and Brutal(lv10, crit 19-20 unarmed ขณะ Rage) + Better Half(lv14, cheat-death ลง 1 HP+temp HP ครึ่ง max)

- **Control**: =baseline(D)→**C(3-20**, Face of Rage's push-or-prone CON save rider ทุกครั้งที่ตี unarmed)
- **Damage**: A(3-9)→**S(10-20**, Cunning and Brutal ขยาย crit range 19-20 = Burst/Peak modifier ชัดเจน)
- **Survivability**: A(3-13)→**S(14-20**, Better Half flip Death Prevention เป็น above)

---

## Primal Spirit (GrimHollowPG24)

⚠️ **ข้อมูลไม่ครบ**: Primal Guardian/Primal Striker statblock ไม่มีในไฟล์ extract — ประเมินแบบระมัดระวังจาก text ที่มีเท่านั้น

Primal Companion(lv3, pet Guardian/Striker) + Shared Rage(lv3) + Kin to Beasts(lv6, free Animal Friendship/Speak with Animals) + Skinrider's Trance(lv10, ครอบครอง companion) + Shape of the Wild(lv14, เปลี่ยนร่าง companion)

- **Utility**: =baseline(D)→**B(10-20**, Skinrider's Trance: ครอบครองร่างสัตว์ ได้ senses/speed ของมัน — เครื่องมือ exploration/adaptability ที่ยืดหยุ่นสูง)
- Damage/Support: ⚠️ ไม่ประเมิน (ขึ้นกับ companion statblock ที่ไม่มีในข้อมูล — pet-based damage/utility ต้องรอข้อมูลเพิ่ม)

---

## Wrathful Dead (GrimHollowPG24)

Final Night Catharsis(lv3, Hate/Jealousy/Terror) + Dark Doom Revisited(lv6, AoE Poison 1/Rage) + Death Is but a Door(lv10, Advantage death save+4th fail+free revival spell ที่แลก Exhaustion) + Powered by Pathos(lv14, อัปเกรดตาม emotion เดิม)

- **Control**: =baseline(D)→**C(6-20**, Dark Doom Revisited AoE Poison+Poisoned 10ft)→**B(14-20**, Powered by Pathos's Jealousy option: reaction AoE Grapple)
- **Survivability**: A(3-9)→**S(10-20**, Death Is but a Door flip Death Prevention เป็น above ผ่าน Advantage-death-save+fail-buffer)
- **Support**: =baseline(D)→**S(10-20**, Return the Spirit: free-cast Cure Wounds/Raise Dead/Revivify (แลก Exhaustion) — ตรง pattern "free revival = S" ที่พบซ้ำในหลายคลาสแล้ว)

---

## Heavy Metal (VSS, 2014-only)

Heavy Metal Axe(lv3, weapon→instrument) + Solo Shredding(lv3, Rage Dmg +1/hit สูงสุด 2×PB) + Killer Vocals(lv6, ผลัก+deafen) + Up To Eleven(lv10, floor check 11) + Smash Hit(lv14, 4d12 burst 1/short rest)

- **Damage**: A(3-13, Solo Shredding เสริมภายใน A)→**S(14-20**, Smash Hit's 4d12 burst)
- **Utility**: =baseline(D)→**C(10-20**, Up To Eleven — reliability floor แคบ, Charisma/instrument check เท่านั้น)

---

## Colossus (VSS, 2014-only)

Larger Than Life(lv3, ขยายขนาด+1d4 dmg+AoE line atk) + Imposing Presence(lv6, บัง line-of-sight ให้ ally) + Boulder Throw(lv10, ขว้างหิน 2d8) + Colossal Strength(lv14, STR+2+reach)

- **Support**: =baseline(D)→**C(6-20**, Imposing Presence: ให้ ally cover 3/4-เต็มจากแนวยิงถ้ายืนหลังคุณ — Mitigation-for-ally)
- Damage: =baseline (AoE line atk ที่ lv3 เป็น Breadth modifier ตัวเดียว ไม่พอข้าม threshold คนเดียว)

---

## Fin (VSS, 2014-only)

Aquatic(lv3) + Feeding Frenzy(lv3, bonus-action bite CON-mod/วัน) + Blood Sense(lv6) + Mako(lv10, bite→1d10+prone/grapple rider) + Tsunami(lv14, AoE บังคับว่ายน้ำ)

- **Damage**: A(3-9, Feeding Frenzy เสริมภายใน A)→**S(10-20**, Mako's dice bump+prone/grapple rider)
- **Control**: =baseline(C จาก lv9)→**B(10-20**, Mako's prone-or-grapple rider ทุกครั้งกัดโดน)
- Action Economy: =baseline (Feeding Frenzy's bonus-action bite ซ้อนกับ Bonus-Action-Value ที่ above อยู่แล้ว ไม่ flip มิติใหม่)

---

## Rage Mage (VSS, 2014-only) — spellcasting จริงระหว่าง Rage

Spellcasting(lv3, Sorcerer cantrip+slot ระหว่าง Rage, concentrate ได้) + Arcane Rampage(lv6, cast แทน 1 attack ผ่าน bonus action) + Supernatural Exploits(lv10, free-cast utility spell หลายตัว) + Eldritch Explosions(lv14, AoE force จาก slot)

- **Damage**: A(3-5)→**S(6-20**, spell-slot blast (ถ้าเลือก) ซ้อนบน weapon+Extra-Attack track เดิม + Arcane Rampage เพิ่มประสิทธิภาพ action)
- **Control**: =baseline(D)→**B(3-20**, spell slot จริงเปิดทาง Hold Person-tier control จาก Sorcerer list — เทียบเท่า Dynamo Engineer's judgement)
- **Utility**: =baseline(D)→**B(10-20**, Supernatural Exploits: free-cast darkvision/feather fall/jump/see invisibility)
- **Action Economy**: =baseline(C)→**B(6-20**, Arcane Rampage flip Resource-to-Action Conversion เป็น above, 2above/1below)

---

## Tranquility (VSS, 2014-only) — reactive/defensive playstyle

Anticipate(lv3, reaction atk เมื่อไม่ได้โจมตีเทิร์นนั้น) + Mantra(lv3) + Battle Trance(lv6, reaction atk→2 ครั้ง) + Tranquility(lv10, free-cast Calm Emotions/Enthrall/Sanctuary) + Zen State(lv14, +AC ต่อการพลาด — Anchor ตัด AC ออก ไม่นับ)

- **Control**: =baseline(C จาก lv9)→**B(10-20**, Calm Emotions ตัวเลือกจาก Tranquility — สเปลล์ควบคุมจริงตัวแรกของ subclass นี้)
- **Support**: =baseline(D)→**B(10-20**, Sanctuary ตัวเลือกจาก Tranquility — ป้องกัน ally เต็มรูปแบบ 1 ครั้ง)
- **Action Economy**: =baseline(C) — Anticipate เพิ่ม Reaction Value แต่ tally เป็น **2-2 tie** (เหมือน Berserker's Retaliation) → ไม่ขยับ

---

## Muscle Wizard (ValdaPlayerPack)

"Cantrips"(lv3, Mage Hand push/Shocking Grasp no-OA/True Strike +1d6) + "Spells"(lv6, Burning Hands AoE/Magic Missile 3 ranged, 1/long rest) + Magic Resistance(lv10, Adv save vs magic ขณะ Rage) + I Cast Fist(lv14, 6d6+prone nova 1/Rage)

- **Damage**: A(3-13, True Strike/Burning Hands/Magic Missile เสริมภายใน A)→**S(14-20**, I Cast Fist's 6d6+advantage nova)
- **Control**: =baseline(C จาก lv9)→**B(14-20**, I Cast Fist's Prone rider — advantage-boosted ให้ reliable)
- Survivability: =baseline (Magic Resistance เสริม Save Reliability ที่ above อยู่แล้ว ไม่ flip มิติใหม่)

---

## สรุปรวม 21 subclass (peak grade ต่อ axis)

| Subclass | Damage | Control | Support | Survivability | Action Economy | Utility |
|---|---|---|---|---|---|---|
| Class Baseline | S | C | D | S | C | D |
| Berserker | **S** | **B** | =base | **S** | =base | =base |
| Wild Heart | =base | =base | **C** | =base | **B** | **B** |
| World Tree | =base | **C** | **C** | =base | =base | **C** |
| Zealot | **S** | =base | **S** | **S** | =base | =base |
| Ancestral Guardian | =base | **C** | **S** | =base | =base | **C** |
| Battlerager | =base | =base | =base | =base | **B** | =base |
| Beast | =base | **B** | **B** | =base | =base | =base |
| Storm Herald | =base | =base | **S** | =base | =base | =base |
| Wild Magic | =base | =base | **C** | =base | =base | =base |
| Totem Warrior | =base | =base | **C** | =base | =base | **C** |
| Giant | =base | **B** | =base | =base | =base | =base |
| Carrion Raven | =base | **B** | =base | =base | =base⚠️ | =base⚠️ |
| Fractured | **S** | **C** | =base | **S** | =base | =base |
| Primal Spirit | =base⚠️ | =base | =base⚠️ | =base | =base | **B** |
| Wrathful Dead | =base | **B** | **S** | **S** | =base | =base |
| Heavy Metal | **S** | =base | =base | =base | =base | **C** |
| Colossus | =base | =base | **C** | =base | =base | =base |
| Fin | **S** | **B** | =base | =base | =base | =base |
| Rage Mage | **S** | **B** | =base | =base | **B** | **B** |
| Tranquility | =base | **B** | **B** | =base | =base | =base |
| Muscle Wizard | **S** | **B** | =base | =base | =base | =base |

**ข้อค้นพบเบื้องต้น**:
1. **Support คือ axis ที่ขยับบ่อยสุด (13/21 subclass)** — สวนทาง baseline ที่ Support=D แบนราบสนิท (ไม่มีจุดเปลี่ยนแม้แต่จุดเดียวในไฟล์ baseline) แปลว่า subclass feature เกือบทุกสายของ Barbarian คือช่องทางเดียวที่เติม Support ให้คลาสนี้ได้ — สอดคล้องกับดีไซน์เกม (Primal Path มักให้ "share Rage benefits กับ ally" เป็นธีมร่วม)
2. **Modifier-tie precedent (2-2 = ไม่ขยับ) เกิดซ้ำ 2 ครั้งพอดี** (Berserker's Retaliation, Tranquility's Anticipate) — ทั้งคู่เพิ่ม Reaction Value ให้ Action Economy แต่ tally ออกมา 2-2 พอดีทั้งคู่ ยืนยันว่า precedent จาก baseline ใช้ได้จริงกับ subclass overlay ไม่ใช่แค่ทฤษฎี
3. **"Free-cast revival spell (แลกต้นทุนสูง) = Support S" ยืนยันซ้ำอีกครั้ง** — Wrathful Dead's Return the Spirit (แลก Exhaustion) เป็นตัวที่ 4 แล้วในระบบนี้ (ต่อจาก Alchemist's Apothecary, Artificer's Reanimator, Sacred Knight's Wisdom-and-Spirit-adjacent) ที่ pattern นี้ดัน Support ถึง S ทุกครั้งไม่มีข้อยกเว้น
4. **RNG-table subclass (Wild Magic) ต้องมี methodology แยก** — ไม่ให้เครดิต "เลือก optimal branch" แบบ subclass อื่น เพราะผลเป็นการสุ่มจริง ไม่ใช่การตัดสินใจของผู้เล่น — บันทึกเป็นกฎใหม่สำหรับ subclass ประเภทนี้ที่อาจเจออีกในคลาสอื่น (เช่น Sorcerer's Wild Magic Sorcery)
5. **2014-only subclass (11/21 ตัว) ไม่ได้ด้อยกว่า 2024 subclass อย่างเป็นระบบ** — Rage Mage/Fin/Heavy Metal (ทั้งหมด 2014-only) ขยับถึง Damage S เหมือนกับ Berserker/Zealot/Fractured (2024) — ยืนยันว่า scope "2024-prefer-but-keep-2014-only" ตาม [[feedback_2024_scope_keep_2014_only]] ไม่ทำให้คะแนนเอนเอียงไปทาง edition ใดเป็นพิเศษ
