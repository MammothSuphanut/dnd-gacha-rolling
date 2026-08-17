# Ranger — Subclass Level Overlay (ชั้น 2)

**อ้างอิง**: [ranger-level-baseline.md](ranger-level-baseline.md) (Class Baseline, ชั้น 1) + [ranger-subclass-scorecard-2024.md](ranger-subclass-scorecard-2024.md) (แหล่งข้อมูล feature-text หลัก)
**ขอบเขต**: 19 Ranger Archetype — gate lv3/7/11/15 (ตรงกับ "(Ranger Subclass/Subclass feature — ยกเว้น)" ในตาราง Chassis ของ baseline)
**รูปแบบ**: delta-only แบบย่อ (>10 subclass) — list เฉพาะเลเวล/axis ที่เกรดต่างจาก baseline; ไม่ระบุ = เท่า baseline
**หมายเหตุสำคัญ**: baseline **ทั้ง 7 axis เป็น flat ตลอด 20 เลเวล** (คลาสแรกในระบบที่ไม่มี milestone shift เลย) — ทุก delta ในไฟล์นี้จึงเป็นการ "เปิดจุดเปลี่ยน" ที่ baseline ไม่มีเลย ไม่ใช่แค่การขยับจุดเปลี่ยนเดิมให้เร็วขึ้นแบบคลาสอื่น
**เกณฑ์ single-flip ของแกนนี้**: Action Economy ต้องการ **2 modifier flip** ถึงจะข้าม C→B (ยืนยันจาก baseline's Nature's Veil ที่ flip เดียวไม่พอ) — ต่างจาก Monster Hunter/Mystic ที่บาง axis ต้องการแค่ 1 flip — ฟีเจอร์ AE เดี่ยวๆ ที่ไม่ชัดว่าพลิก 2 มิติจึงถูกเก็บเป็น **0 delta แบบระมัดระวัง** หลายจุดในไฟล์นี้

**Baseline โดยสรุป**: Damage **B(1-20) flat** · Control **C(1-20) flat** · Support **D(1-20) flat** · Survivability **B(1-20) flat** · Action Economy **C(1-20) flat** · Utility **B(1-20) flat** · Versatility **C(1-20) flat**

---

## Beast Master (XPHB)

- **Damage**: B(1-2)→**A(3-20)** — Primal Companion = "นักสู้เพิ่มอีกตัวเต็มๆ" (pattern เดียวกับ Necromancer's Thralls)
- **Action Economy**: C(1-2)→**A(3-20)** — สั่งสัตว์ Attack/Dash/Disengage/Dodge/Help ด้วย bonus action เดียว = พลิก Extra-Action **และ** Resource-Conversion พร้อมกัน
- **Versatility**: C(1-2)→**B(3-20)** — เลือก stat block 3 แบบ (บก/น้ำ/ฟ้า) = พลิก Target-Type

## Beastborne (VSS 🕰️)

- **Damage**: B(1-2)→A(3-6)→**S(7-20)** — Bestial Aspect pool system ไต่ magnitude สูงมาก
- **Survivability**: B(1-2)→**A(3-20)** — Resistance B/P/S (pool 20)
- **Versatility**: C(1-2)→**A(3-20)** — pool เดียวครอบคลุมดาเมจ/ต้านทาน/ความเร็ว = พลิก Resource Fungibility+Cross-Axis

## Drakewarden (FTD 🕰️)

- **Damage**: B(1-2)→A(3-10)→**S(11-20)** — Drake Companion(นักสู้เพิ่ม)+Drake's Breath(lv11, AoE nova 8d6→10d6)
- **Survivability**: B(1-6)→**A(7-20)** — Resistance ธาตุจาก Draconic Essence (lv7)
- **Action Economy**: C(1-2)→**A(3-20)** — สั่ง drake โจมตี/ขี่บิน ด้วย bonus action = พลิก Extra-Action+Resource-Conversion
- **Utility**: B(1-6)→**A(7-20)** — Tongue of Dragons+drake มาบิน (lv7+)
- **Versatility**: C(1-2)→**A(3-20)** — สลับ drake เป็นนักสู้/พาหนะ/blaster

## Fey Wanderer (XPHB)

- **Damage**: B(1-2)→**A(3-20)** — Dreadful Strikes (extra psychic dmg reliable ทุกเทิร์น)
- **Control**: C(1-6)→**B(7-20)** — Beguiling Twist (lv7, reaction บังคับ Charmed/Frightened จริง — เกิน Ensnaring-Strike-tier)
- **Support**: D(1-14)→**C(15-20)** — Misty Wanderer (lv15, พา ally เทเลพอร์ตด้วย — "แคบมาก" แต่จริง)
- **Survivability**: B(1-6)→**A(7-20)** — Beguiling Twist ให้ Adv save ต้าน Charmed/Frightened ถาวร
- **Utility**: B(1-2)→**S(3-20)** — Fey Wanderer Spells (Charm Person/Misty Step/Summon Fey/Dimension Door/Mislead รับประกัน) + Fey Reinforcements ฟรี
- **Versatility**: C(1-2)→**A(3-20)** — ดาเมจ/control/mobility/summon กระจายครบ

## Freerunner (VSS 🕰️)

- **Damage**: B(1-2)→**A(3-20)** — Momentum (extra dmg reliable หลังเคลื่อนที่)
- **Survivability**: B(1-2)→**A(3-20)** — Evasive Fighter (+2 AC ชั่วคราว)
- **Utility**: B(1-2)→**A(3-20)** — Adv Acrobatics+Dex-Athletics+Wall Run
- **Versatility**: C(1-2)→**B(3-20)** — "โฟกัสความคล่องตัวชัดเจน breadth แคบ" (specialist, ขยับแค่ 1 ขั้น)

## Gloom Stalker (XPHB)

- **Damage**: B(1-2)→**A(3-20)** — Dread Ambusher(extra dmg)+Stalker's Flurry(lv11, extra attack option)
- **Control**: C(1-10)→**B(11-20)** — Mass Fear (Stalker's Flurry ตัวเลือก lv11, AoE Frightened)
- **Survivability**: B(1-2)→**A(3-20)** — Iron Mind (save prof เพิ่ม)
- **Utility**: B(1-2)→**A(3-20)** — Umbral Sight (darkvision+invisible ในที่มืด)
- **Versatility**: C(1-10)→**B(11-20)** — Stalker's Flurry เลือก dmg/control ทุกครั้ง trigger

## Green Reaper (GrimHollowPG24)

- **Damage**: B(1-2)→A(3-6)→**S(7-20)** — Envenomed Attack+Toxic Tradecraft+Stinging Application ซ้อน 3 ชั้น
- **Control**: C(1-2)→A(3-6)→**S(7-20)** — Toxin Effect 5 แบบ (Uncoordinated/Paraplegia/Insensate/Debilitate) = "ทรงพลังและหลากหลายที่สุดในกลุ่ม Ranger"
- **Survivability**: B(1-2)→**A(3-20)** — Poison Control(resist+adv save)+Pain Tolerance(lv15, "แทบยกเลิกการโดนตี")
- **Versatility**: C(1-2)→**A(3-20)** — Toxin Effect 11 ตัวเลือกตาม slot = พลิก Adaptability+Resource Fungibility

## Highwayman (VSS 🕰️)

- **Support**: D(1-6)→**C(7-20)** — Merry Confederates (adv Stealth 3+ คนซุ่มด้วยกัน — แคบแต่จริง)
- **Survivability**: B(1-14)→**A(15-20)** — Get Out of Dodge (lv15, Disengage อัพเกรด 2 เอฟเฟกต์)
- **Action Economy**: C(1-2)→B(3-10)→**A(11-20)** — Nobody Move!(reaction free atk, lv3)+No Seriously(lv11, 2 atk/reaction) = "ได้ action พิเศษเยอะมาก"
- **Versatility**: C(1-2)→**B(3-20)** — ธีมพึ่งพาทีม breadth แคบ (specialist)

## Hollow Warden (RHW)

- **Damage**: B(1-6)→**A(7-20)** — Prowling Retribution(free OA)+Ominous Strikes(lv15)+Steel Wind Strike(lv17)
- **Control**: C(1-2)→**A(3-20)** — Unnerving Aura (AoE Frightened ขณะแปลงร่าง) — เกิน Ensnaring-Strike-tier
- **Survivability**: B(1-2)→**S(3-20)** — Ancient Armor+Hungering Might+Persistent Wrath(lv15)+Timeless = 4 กลไกซ้อน exceptional-stack
- **Action Economy**: C(1-2)→**B(3-20)** — Prowling Retribution (free OA ที่ไม่กิน reaction ปกติของ OA — กลไกแรงพอข้าม 2-flip ด้วยตัวเดียว)
- **Versatility**: C(1-2)→**A(3-20)** — Wrath of the Wild แปลงร่างเดียวพลิกครบ damage/control/survivability/tank พร้อมกัน (pattern เดียวกับ Necromancer's Necrodancer)

## Horizon Walker (XGE 🕰️)

- **Damage**: B(1-2)→**A(3-20)** — Planar Warrior (extra force dmg unlimited)+Distant Strike(lv11, เป้าที่ 3)
- **Control**: C(1-12)→**B(13-20)** — Banishment (lv13, hard-CC จริงแต่มาช้า+per-slot)
- **Survivability**: B(1-14)→**A(15-20)** — Spectral Defense (lv15, reaction resist ทุกดาเมจ ไม่จำกัดครั้ง/วัน)
- **Action Economy**: C(1-10)→**B(11-20)** — Distant Strike(teleport ระหว่างโจมตี)+Ethereal Step(bonus action)
- **Utility**: B(1-2)→**S(3-20)** — Detect Portal+Misty Step/Haste/Teleportation Circle รับประกัน
- **Versatility**: C(1-2)→**B(3-20)** — ดาเมจ/control/mobility ข้ามระนาบ

## Hunter (XPHB)

- **Damage**: B(1-2)→**A(3-20)** — Hunter's Prey (เลือก Colossus Slayer/Horde Breaker, สลับได้)
- **Survivability**: B(1-2)→**A(3-20)** — Defensive Tactics (always-on choice)+Superior Hunter's Defense(lv15)
- **Action Economy**: C(1-2)→**B(3-20)** — Horde Breaker (ตีเป้าที่สองฟรี "ไม่เสีย bonus action หรือทรัพยากรใดๆ" — สะอาดพอข้าม 2-flip ด้วยตัวเดียว)
- **Versatility**: C(1-2)→**B(3-20)** — สลับ Hunter's Prey/Defensive Tactics ทุกรอบพัก

## Monster Slayer (XGE 🕰️)

- **Damage**: B(1-2)→**A(3-20)** — Slayer's Prey (extra dmg reliable)
- **Control**: C(1-2)→**A(3-20)** — Magic-User's Nemesis(lv11, reaction กันสเปลล์/เทเลพอร์ต)+Banishment+**Hold Monster** รับประกัน (Tier4 hard-CC จริง!)
- **Survivability**: B(1-2)→**A(3-20)** — Supernatural Defense (+1d6 save/หลุด grapple)
- **Utility**: B(1-2)→**A(3-20)** — Hunter's Sense+Zone of Truth/Magic Circle/Banishment/Hold Monster
- **Versatility**: C(1-2)→**B(3-20)** — ผสม control/damage/defense รอบธีม "prey" ("breadth ปานกลาง")

## Primordial Archer (GrimHollowPG24)

- **Damage**: B(1-2)→**A(3-20)** — Elemental Arrows+Witching Arrows(lv11)+Primordial Magic(lv15, bonus action 6d6)
- **Control**: C(1-10)→**A(11-20)** — Witching Arrows เลือก Restrained/Charmed/Frightened จริง
- **Support**: D(1-2)→**C(3-20)** — Herbal Lore (stabilize/ฟื้น 1HP ให้ ally หมดสติ — floor escape แคบแต่จริง)
- **Survivability**: B(1-2)→**A(3-20)** — Weave the Elements(resist)+Concentration-protection
- **Utility**: B(1-2)→**A(3-20)** — Polymorph+Wall of Stone รับประกัน
- **Versatility**: C(1-2)→**A(3-20)** — 5 ธาตุ+4 เอฟเฟกต์ Witching Arrows = "ปรับตามสถานการณ์ได้กว้าง"

## Spellbreaker (VSS 🕰️)

- **Damage**: B(1-2)→**A(3-20)** — Antimagic Strike(extra dmg, ×2 ถ้าเป้ากำลัง concentrate)+Arcane Burst(lv11)
- **Control**: C(1-2)→A(3-6)→**S(7-20)** — Antimagic Strike(suppress)+Counterspell+Antimagic Curse(lv15) = "anti-caster toolkit ที่แข็งแกร่งที่สุดในกลุ่ม"
- **Survivability**: B(1-6)→**A(7-20)** — Spell Resistance (lv7, always-on adv save ต้านสเปลล์ทุกชนิด)
- **Utility**: B(1-2)→**S(3-20)** — Detect Magic+See Invisibility+Scrying = "ตรวจจับ/สอดแนมครบวงจร"
- **Versatility**: C(1-2)→**B(3-20)** — "โฟกัส anti-magic ชัดเจน breadth แคบกว่า" (specialist)

## Swarmkeeper (TCE 🕰️)

- **Damage**: B(1-2)→**A(3-20)** — Gathered Swarm (extra dmg เลือกได้ ไม่จำกัดครั้ง)
- **Control**: C(1-2)→**A(3-20)** — Gathered Swarm(push)+Mighty Swarm(lv11, Prone)+Web/Insect Plague
- **Survivability**: B(1-14)→**A(15-20)** — Swarming Dispersal (lv15, reaction resist+เทเลพอร์ต)
- **Utility**: B(1-2)→**A(3-20)** — Mage Hand+Faerie Fire/Gaseous Form/Arcane Eye/Insect Plague
- **Versatility**: C(1-2)→**A(3-20)** — เลือก 3 ทาง (dmg/push-เป้า/push-ตัวเอง) ทุกครั้งที่ตีโดน = real-time choice ถี่มาก

## Trophy Hunter (VSS 🕰️)

- **Damage**: B(1-2)→**A(3-20)** — Trophy(+2 dmg แคบ)+Visceral Attack+Fell The Leviathan(lv11)
- **Survivability**: B(1-2)→**A(3-20)** — Trophy(+2 AC/save แคบ)+Clever Wrestler
- **Action Economy**: C(1-2)→**B(3-20)** — Clever Wrestler(bonus action หลุด grapple ไม่ยั่วยุ OA)+Masterful Sidestep(lv15, reaction) = 2 flip
- **Versatility**: C(1-2)→**B(3-20)** — "ล่าเป้าเดี่ยวตัวใหญ่ breadth แคบ" (specialist)

## Vermin Lord (GrimHollowPG24)

- **Damage**: B(1-2)→**A(3-20)** — Verminkin+Swarming Strikes (สเกลตาม slot, pattern เดียวกับ Thralls)
- **Survivability**: B(1-2)→**A(3-20)** — Filth and Fortitude(immune poison+Con save prof)+Strength of the Swarm(lv15, redirect dmg)
- **Action Economy**: C(1-2)→**A(3-20)** — Swarming Strikes สั่ง swarm หลายตัวด้วย bonus action เดียว "ยิ่งลงทุน slot สูงยิ่งได้ action คุ้มค่ามาก"
- **Versatility**: C(1-2)→**B(3-20)** — จำนวน swarm สเกลตาม slot = พลิก Resource Fungibility

## Vigilante (VSS 🕰️)

- **Damage**: B(1-2)→**A(3-20)** — Hand-To-Hand(สเกล unarmed)+Biff!Bam!Pow!(lv11)+Catchphrase
- **Control**: C(1-6)→**B(7-20)** — Flashbang (lv7, AoE ปิดกั้น reaction/OA ของศัตรูรอบตัว — แคบแต่จริง)
- **Survivability**: B(1-2)→**A(3-20)** — Masked Persona(AC formula)+Catchphrase!(lv15, resist-all trigger-ง่าย)
- **Utility**: B(1-8)→A(9-16)→**S(17-20)** — Heroic Magic (Fly lv9/Passwall lv17 รับประกัน) = "utility mobility/exploration ระดับสูงมาก"
- **Versatility**: C(1-2)→**A(3-20)** — brawler/control/defense/mobility ผสมกว้าง

## Winter Walker (FRHoF)

- **Damage**: B(1-2)→**A(3-20)** — Frigid Explorer (extra dmg ไม่โดน resistance, unlimited)
- **Control**: C(1-2)→**A(3-20)** — Hunter's Rime(no-Disengage บนเป้า mark)+**Hold Person**/Ice Storm/Cone of Cold รับประกัน — ทะลุเพดาน Tier4 ที่ baseline ไม่เคยถึงเลย
- **Support**: D(1-6)→**B(7-20)** — Fortifying Soul (lv7, action ฮีล+adv-save-Frightened ให้ Wis-mod ally — "แก้จุดอ่อนใหญ่สุดของ baseline")
- **Survivability**: B(1-2)→**A(3-20)** — Resistance Cold+Hunter's Rime(temp HP on cast, ถี่)
- **Versatility**: C(1-2)→**A(3-20)** — ดาเมจ/control/support/survivability ครบทุกแกนในธีมเดียว = "breadth กว้างที่สุดในกลุ่ม Ranger"

---

## ข้อค้นพบสำคัญ

1. **คลาสแรกในระบบที่ baseline flat ทั้ง 7 axis กลับกลายเป็นคลาสที่ subclass overlay ขยับกว้างที่สุดเท่าที่เคยเจอ** — 19/19 archetype ขยับ Damage เป็น A หรือสูงกว่าทุกตัวไม่มีข้อยกเว้น (Damage baseline B flat คือแกนที่ "อ่อนสุด" ของทั้งไฟล์เพราะทุก subclass ผ่าน 2/4-threshold ได้ง่ายจาก baseline ที่มี modifier เดียวรออยู่แล้ว 1/4)
2. **⚠️ 2 subclass ทะลุเพดาน Control's Primary=C (never-Tier4) ที่ baseline วางไว้อย่างชัดเจน** — Monster Slayer's Hold Monster และ Winter Walker's Hold Person เป็นสเปลล์ paralysis-tier (Tier4) ของแท้ที่รับประกันติดตัว พิสูจน์ว่า baseline's "ไม่เคยถึง Tier4" เป็นข้อจำกัดของ chassis เปล่าเท่านั้น ไม่ใช่ข้อจำกัดถาวรของทั้งคลาส (คล้ายกับที่ Paladin's Support ceiling ถูกทะลุในคลาสก่อนหน้า)
3. **"Companion/summon สั่งงานด้วย bonus action" เป็น pattern ที่เกิดซ้ำ 4 ครั้งและเกือบทุกครั้งพลิก Action Economy 2 modifier พร้อมกัน (Extra-Action+Resource-Conversion)** — Beast Master/Drakewarden/Vermin Lord ทั้งหมดได้ AE A, และ Hollow Warden's Wrath-of-the-Wild transformation ให้ผลคล้ายกัน — ยืนยันว่า "ได้นักสู้/ทรัพยากรเพิ่มจากการสั่งงานครั้งเดียว" เป็นกลไกที่แรงพอข้ามเกณฑ์ 2-flip ของคลาสนี้ได้แทบทุกครั้ง
4. **Hollow Warden's Wrath of the Wild และ Winter Walker's ธีมความหนาวเดียว เป็น subclass คู่ที่ Versatility delta สูงสุด (+5 เท่ากัน)** ผ่าน single-transformation/theme ที่ครอบคลุมครบเกือบทุก axis พร้อมกัน — pattern เดียวกับ Necromancer's Necrodancer (cross-axis density สูงพอข้าม same-dimension-trap ปกติ)
5. **"Specialist framing" (breadth แคบ/เฉพาะทาง) ยังคงเป็นเพดานที่กัน Versatility ไม่ให้เกิน B แม้แกนอื่นจะแรงมาก** — Freerunner/Highwayman/Trophy Hunter/Spellbreaker ทั้ง 4 ตัวถูกจำกัดที่ B แม้ Spellbreaker's anti-magic kit จะแรงระดับ Control=S ก็ตาม — สอดคล้องกับ policy เดิมจาก Necromancer/Paladin
6. **มาตรฐานอนุรักษ์นิยม "single modest AE flip = 0 delta" ถูกใช้บ่อยที่สุดในไฟล์นี้ (7/19 ครั้ง)** — Beastborne/Freerunner/Gloom Stalker/Green Reaper/Monster Slayer/Primordial Archer/Swarmkeeper/Vermin Lord(Control)/Vigilante ล้วนมีฟีเจอร์ AE-adjacent เดี่ยวๆ ที่ old score บวกแค่ +1 แต่ไม่ผ่านเกณฑ์ 2-flip ของคลาสนี้ — สะท้อนว่า Action Economy เป็นแกนที่ "ฝืด" ที่สุดในการขยับของทั้งไฟล์ แม้ Damage จะขยับง่ายสุดก็ตาม
