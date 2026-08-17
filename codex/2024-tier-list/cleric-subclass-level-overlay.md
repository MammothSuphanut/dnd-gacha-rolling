# Cleric — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Cleric + domain feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [cleric-subclass-scorecard-2024.md](cleric-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดจาก `class-cleric.json` + homebrew JSON แล้วครบทั้ง 27 ตัวอยู่แล้ว) — แปลผลจากคำอธิบาย feature จริงที่มีอยู่ ไม่ได้สกัด JSON ใหม่ (ประหยัดเวลา, ข้อมูลต้นทางเดียวกัน)
**Class Baseline อ้างอิง**: [cleric-level-baseline.md](cleric-level-baseline.md) — Damage B(1-6)→A(7-20) · Control C(1-2)→B(3-20) · Support B(1)→A(2-19)→S(20) · Survivability **C(1-20) flat** · Action Economy **D(1-20) flat** · Utility **B(1-20) flat** · Versatility A(1)→**S(2-20)**
**รูปแบบตาราง**: Delta-only แบบย่อ (27 subclass — ใหญ่เป็นอันดับ 2 รองจาก Captain)
**Domain gate**: **lv3/6/17** สำหรับ domain ยุค 2024/reprint (Life, Light, Trickery, War, Eldritch, Inquisition, Purification, Pestilence, Grave, Knowledge) — **lv1/2/6/17** สำหรับ domain ยุค 2014-only 🕰️ (ที่เหลือทั้งหมด, lv8 Divine Strike/Blessed Strikes ไม่นับเพราะ baseline คลุมแล้ว)
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก domain**:
1. **Action Economy's D-lock แตกได้เฉพาะเมื่อ domain flip 2 ใน 4 มิติพร้อมกัน** (Bonus Action Value / Reaction Value / Extra Action Access / Resource-to-Action Conversion) → 2-2 tie กับ 2 มิติเดิมที่ below → net cancellation กลับไป Primary **C** (ไม่ใช่ B) — domain ที่มีแค่ bonus-action feature เดียว (1/4) ไม่พอ ต้องมี reaction feature คู่กันด้วย
2. **Survivability's C-lock แตกได้เฉพาะเมื่อ domain flip 2 ใน 3 มิติ below** (Mitigation/Debuff Resistance/Death Prevention, ไม่นับ Save Reliability ที่ตรงอยู่แล้ว) — **domain ที่มี 2 feature แต่ทั้งคู่แตะมิติเดียวกันซ้ำ (เช่น Mitigation 2 ชั้น) ไม่นับเป็น 2 flip** ตามนโยบาย "single-dimension reinforcement ไม่นับ delta" ที่ตั้งจาก Channeler — เจอเคสนี้ซ้ำหลายครั้งในไฟล์นี้ (Forge, Twilight, Strength, Rum, Life's Blessed Healer)
3. **"Free-cast/unlimited-use ข้าม resource economy ปกติของคลาส" ยังคง Primary-elevate ตรงๆ** (ไม่ต้องนับ modifier tally) ตาม pattern เดิม — พบแค่ 1 เคสจริงในไฟล์นี้ (Purification's Sear Imperfections, unlimited free-cast Restoration)
4. **"Extra Attack ผ่าน subclass" (bonus-action weapon attack)** เป็น Primary-elevating บน Damage ทันทีตั้งแต่เลเวลที่ปลดล็อก (ก่อน baseline's เอง lv7) แล้วซ้อนกับ Blessed Strikes ที่ lv7 กลายเป็น **S** — พบ 3 เคส (War's War Priest, Zeal's Priest of Zeal, Solidarity's Solidarity's Action แต่ Solidarity's Action ไม่ได้ผลักดัน Damage เพราะเป็น general-purpose attack ไม่ผูก weapon-focus ธีม เก็บไว้เป็น AE-only)

---

## Ambition Domain (PSA 🕰️) — illusion duplicity

Warding Flare(lv1, reaction disadvantage-on-attacker self/other) + Invoke Duplicity CD(lv2, illusory duplicate) + Cloak of Shadows(lv6) + Improved Duplicity(lv17, 4 duplicates)

- **ไม่มี delta** — ทุก feature แตะแค่ 1 มิติเดียว (Warding Flare=Mitigation อย่างเดียว) ไม่ถึงเกณฑ์ 2/4 ที่ไหนเลย — เป็น domain แรกในไฟล์นี้ที่ 0 delta

## Arcana Domain (SCAG 🕰️) — arcane hybrid

Arcane Initiate(lv1, wizard cantrip×2+Arcana prof) + Arcane Abjuration CD(lv2) + Spell Breaker(lv6) + Arcane Mastery(lv17, 4 wizard spell lv6-9 ติดตัวถาวร free-cast 1/วัน)

- **Utility**: =baseline(B)→**A(17-20**, Arcane Mastery flip Breadth[wizard-exclusive spell access]+Access-Cost[free-cast] พร้อมกัน)

## Death Domain (DMG 🕰️) — necrotic burst

Reaper(lv1, cantrip/necromancy hิต 2 เป้า)+Touch of Death CD(lv2, necrotic burst แยก resource)+Inescapable Destruction(lv6, necrotic ทะลุ resistance)+Improved Reaper(lv17)

- **Damage**: B(1)→A(2-6, Touch of Death[Magnitude]+Reaper[Breadth] ผลัก Primary ก่อน baseline เอง)→**S(7-20**, Inescapable Destruction[Reliability] ซ้อนที่ lv6 + baseline's lv7 elevation)

## Destruction Domain (VSS 🕰️) — blaster nova

Devastation Initiate(lv1)+Calamity CD(lv2, bonus action reroll-max ทุก spell damage die 1 นาที)+Shockwave(lv6)+Havoc Spell(lv17, bonus action แลก slot เพิ่ม radiant สูงสุด 5d6)

- **Damage**: B(1)→A(2-16, Calamity's reroll-max = Reliability-Primary-adjacent boost)→**S(17-20**, Havoc Spell ซ้อน Magnitude)
- Action Economy: ไม่มี delta (Calamity+Havoc Spell ทั้งคู่เป็น bonus action = มิติเดียวกัน ไม่นับ 2 flip)

## Eldritch Domain (GrimHollowPG24) — reality-warping curse

Eldritch Contagion/Prophecy of Doom(lv3, CD/spell-attached, AoE 15ft Wis-save, d8-table recurring)+Otherworldly Calm(lv6, psychic resist+adv-vs-charm/frightened+telepathy-counter)+Sing the Song that Ends the World(lv17, 10d10 nova มีเงื่อนไข)

- **Control**: C(1-2)→**A(3-20**, Prophecy of Doom flip Severity[d8-table]+Breadth[AoE]+Duration[recurring] พร้อมกัน)
- **Survivability**: C(1-5)→**B(6-20**, Otherworldly Calm flip Mitigation[psychic resist]+Debuff Resistance[adv charm/frightened] พร้อมกัน — 2 flip จริง ไม่ใช่ same-dimension)

## Forge Domain (XGE 🕰️) — armored tank-priest

Blessing of the Forge(lv1)+Artisan's Blessing CD(lv2)+Soul of the Forge(lv6, AC+1+fire resist ใน heavy armor)+Saint of Forge and Fire(lv17, fire immunity+BPS-nonmagical resist ใน heavy armor)

- **ไม่มี delta** — ⚠️ ดูแรงในระบบเดิม (Survivability 9/10 S) แต่ Soul of the Forge + Saint of Forge and Fire ทั้งคู่แตะ **Mitigation มิติเดียวกันซ้ำ** (ไม่ใช่ 2 มิติต่างกัน) → ไม่ถึงเกณฑ์ 2/4 → ตัวอย่างชัดเจนที่สุดของ "same-dimension reinforcement" policy ในไฟล์นี้

## Grave Domain (RHW) — undying support

Circle of Mortality/Path to the Grave CD(lv3, bonus action curse disadvantage-atk+save)+Sentinel at Death's Door(lv6, reaction ลดดาเมจครึ่ง/ยกเลิกคริท self/bloodied-ally)+capstone(lv17, ฮีลเมื่อศัตรูตายใกล้ๆ)

- **Damage**: B(3-6)→**S(7-20**, curse-triggered necrotic rider ผลัก Primary ก่อนซ้อนกับ baseline lv7)
- **Control**: B(3, =baseline gate)→**A(3-20**, curse's dual-disadvantage severity เกิน Hold-Person-tier)
- **Support**: A(baseline)→**S(3-20**, Circle of Mortality+curse-triggered heal+capstone ซ้อนหลายชั้น)
- **Action Economy**: D(3-5, แค่ curse's bonus action)→**C(6-20**, Sentinel's reaction เพิ่มมิติที่ 2 — 2-2 tie)

## Inquisition Domain (GrimHollowPG24) — anti-caster hunter

Spell Shield CD(lv3, bonus action temp-HP+adv-vs-spell-save+resist-spell-dmg self/ally)+Witch Hunter's Strike(lv3, extra force dmg, 2×ถ้าเป้า concentrating)+Rebuke Invoker(lv6, reaction force dmg สเกลตาม slot ศัตรู)+Supernal Safeguard(lv17, multi-target)

- **Damage**: B(3-5)→**S(6-20**, Witch Hunter's Strike ผลัก Primary + Rebuke Invoker ซ้อน Magnitude ที่ lv6)
- **Survivability**: C(1-2)→**B(3-20**, Spell Shield self-use flip Mitigation[resist]+Debuff Resistance[adv] พร้อมกัน)
- **Support**: A(baseline)→**S(3-20**, Spell Shield's triple-effect shield)
- **Action Economy**: D(3-5, แค่ bonus action)→**C(6-20**, Rebuke Invoker's reaction เพิ่มมิติที่ 2)

## Knowledge Domain (FRHoF) — omniscient scholar

Blessings of Knowledge(lv3)+Mind Magic CD(lv3)+Unfettered Mind(lv6, telepathy 60ft multi-target+Int-save-prof)+Divine Foreknowledge(lv17, bonus action adv-บน-d20-test-ทุกแบบ 1ชม.)

- **Utility**: B(1-5)→A(6-16, Unfettered Mind flip Breadth[telepathy])→**S(17-20**, Divine Foreknowledge ซ้อน Reliability[universal adv] — S peak สูงสุดในไฟล์นี้ของ axis นี้)

## Life Domain (XPHB) — pure healer

Disciple of Life(lv3, heal spell +2+slot-lv)+Preserve Life CD(lv3, แจกฮีล 5×level ไม่เสีย slot)+Blessed Healer(lv6, self-heal เมื่อฮีลคนอื่น)+Supreme Healing(lv17, heal die = ค่าสูงสุดเสมอ)

- **Support**: A(baseline)→**S(3-20**, Disciple of Life+Preserve Life 2 มิติพร้อมกันตั้งแต่ gate แรก — ตัวอย่าง "purest" ของ Support-focused domain ในไฟล์นี้)
- Survivability: ไม่มี delta (Blessed Healer แตะแค่ Death-Prevention มิติเดียว, 1/3 ไม่พอ)

## Light Domain (XPHB) — radiant guardian

Radiance of the Dawn CD(lv3, AoE 30ft radiant)+Warding Flare(lv3, reaction disadvantage-attacker refill short-rest ตั้งแต่ lv6)+Improved Warding Flare(lv6, +temp HP)+capstone(lv17)

- **Support**: A(baseline)→**S(3-20**, Warding Flare[Frequency สูงมาก]+Improved Warding Flare[Magnitude] 2 มิติซ้อน)
- Damage/Survivability: ไม่มี delta (Radiance of Dawn=Breadth มิติเดียว, Warding Flare self-use=Mitigation มิติเดียว — ทั้งคู่ 1/4 ไม่พอ)

## Madness Domain (VSS 🕰️) — chaotic mindbreak

Lunatic Insight(lv1)+Temporary Insanity CD(lv2, d20-table เอฟเฟกต์รุนแรง)+Fragmented Mind(lv6, adv-vs-charm/frightened/mind-read)+Embrace Unreality(lv17, AoE 120ft ปรับกฎสนามรบ 1 นาที)

- **Control**: C(1-2)→**A(2-20**, Temporary Insanity's d20-table severity ผลัก Primary ก่อนซ้อนกับ Embrace Unreality's AoE breadth ที่ lv17 — เท่ากับ Eldritch's tier พอดี ไม่ปัดเป็น S ตามวินัยไม่ปัดตามความรู้สึก)
- Survivability: ไม่มี delta (Fragmented Mind = Debuff Resistance มิติเดียว)

## Nature Domain (PHB 🕰️) — beast charmer

Acolyte of Nature(lv1)+Charm Animals and Plants CD(lv2, Turn-Undead-style ขยายชนิดเป้าหมาย)+Dampen Elements(lv6, reaction resist 1 ธาตุ)+Master of Nature(lv17)

- **ไม่มี delta** — Charm Animals and Plants เป็นโครงสร้างเดียวกับ baseline's Turn Undead (ขยายชนิดเป้าหมาย ไม่เพิ่ม severity ใหม่), Dampen Elements แตะแค่ Mitigation มิติเดียว — 0 delta เหมือน Ambition

## Order Domain (TCE 🕰️) — battlefield commander

Voice of Authority(lv1, passive: ally ตีฟรีทันทีเมื่อโดน buff spell lv1+)+Order's Demand CD(lv2, AoE 30ft Charmed+drop-weapon)+Embodiment of the Law(lv6, bonus action cast enchantment)+Order's Wrath(lv17)

- **Support**: B(baseline lv1)→**S(1-20**, Voice of Authority ทำงานตั้งแต่ lv1 — **S-onset เร็วที่สุดในไฟล์นี้** เร็วกว่าแม้แต่ baseline's เอง lv2)
- **Control**: C(1)→**A(2-20**, Order's Demand's AoE Charmed+disarm severity/breadth เกิน baseline's Command ตั้งแต่ lv2)
- Action Economy: ไม่มี delta (Voice of Authority เป็น ally's free attack ไม่ใช่ caster's เอง AE, Embodiment of Law แค่ 1/4)

## Peace Domain (TCE 🕰️) — bond protector

Emboldening Bond(lv1, +d4 attack/check/save ทีม)+Balm of Peace CD(lv2, เดิน+ฮีลกลุ่ม)+Protective Bond(lv6, reaction สลับรับดาเมจแทนกัน)+Expansive Bond(lv17)

- **Support**: B(baseline lv1)→**S(1-20**, Emboldening Bond ทีมกว้างตั้งแต่ lv1 — S-onset เท่า Order)
- **Survivability**: C(1-5)→**B(6-20**, Emboldening Bond[self save-boost]+Protective Bond[self Mitigation ผ่าน redirect] 2 มิติพร้อมกันจาก lv6)

## Pestilence Domain (ValdaSpire24Extras) — contagion debuffer

Carrier+Infection CD(lv3, Con-save 3-option persistent debuff)+Fester(lv6, บังคับ disadvantage บน Con-save ของเป้า)+Epidemic Infection(lv17, AoE spread+disadvantage ability-check/save)

- **Control**: B(3-5)→**A(6-16**, Infection[3-option]+Fester[Reliability] 2 มิติจาก lv6)→**S(17-20**, Epidemic Infection ซ้อน Breadth[AoE spread] มิติที่ 3)

## Purification Domain (GrimHollowPG24) — cleansing fire

Cleanse with Fire(lv3, extra fire dmg, Wis-mod+prof-bonus ครั้ง/วัน ฟื้นทั้ง short+long rest)+Unclean Brand CD(lv3)+Ward Against Corruption(lv6)+Sear Imperfections(lv17, free-cast Lesser/Greater Restoration ไม่จำกัด ไม่เสีย slot)

- **Damage**: B(3-6)→**S(7-20**, Cleanse with Fire's สูง-frequency rider ผลัก Primary ก่อนซ้อน baseline lv7)
- **Utility**: B(1-16)→**A(17-20**, Sear Imperfections = **free-cast/unlimited-use ข้าม resource economy** — Primary-elevate ตรงๆ ตามกติกาข้อ 3)

## Rum Domain (VSS 🕰️) — drunken brawler

Cup Floweth Over+Drunken Sway(lv1, AC=10+Dex+Wis เมื่อไม่ใส่เกราะ)+Intoxicate CD(lv2, reaction Poisoned+disadvantage-all-saves recurring)+Rumrunner(lv6)+Next Round's On Me(lv17)

- **ไม่มี delta** — Drunken Sway แตะ Mitigation มิติเดียว, Intoxicate ประเมินแล้วยังไม่ถึงเกณฑ์ 2 มิติเต็ม (M/R/B ของระบบเดิมเองก็ marginal) — 0 delta

## Solidarity Domain (PSA 🕰️) — team buffer-healer

Solidarity's Action(lv1, bonus action ตีอาวุธผ่าน Help)+Preserve Life CD(lv2, เหมือน Life Domain)+Oketra's Blessing(lv6, reaction +10 attack roll ally)+Supreme Healing(lv17, เหมือน Life Domain)

- **Support**: A(baseline lv2)→**S(2-20**, Preserve Life ตรง gate เดียวกับ baseline's เอง A-onset พอดี)
- **Action Economy**: D(1-5, แค่ bonus action)→**C(6-20**, Oketra's Blessing's reaction เพิ่มมิติที่ 2)

## Strength Domain (PSA 🕰️) — mighty warrior-priest

Acolyte of Strength(lv1)+Feat of Strength CD(lv2)+Rhonas's Blessing(lv6, reaction +10 Strength-roll ally)+Avatar of Battle(lv17, resist BPS-nonmagical)

- **ไม่มี delta** — Avatar of Battle แตะ Mitigation มิติเดียว, ที่เหลือเป็น Strength-check-only เฉพาะทางไม่แตะ combat axis ไหนตรงๆ — 0 delta

## Tempest Domain (PHB 🕰️) — storm blaster

Wrath of the Storm(lv1, reaction 2d8 lightning/thunder ผู้โจมตี)+Destructive Wrath CD(lv2, การันตีดาเมจสูงสุด)+Thunderbolt Strike(lv6, ผลัก 10ft)+Stormborn(lv17, บินถาวรกลางแจ้ง)

- **Damage**: B(1-6)→**S(7-20**, Wrath of Storm[reaction Magnitude]+Destructive Wrath[Reliability] ผลัก Primary ก่อนซ้อน baseline lv7)
- Action Economy: ไม่มี delta (Wrath of Storm เป็น reaction มิติเดียว, ไม่มี bonus-action คู่)

## Travel Domain (VSS 🕰️) — swift wanderer

Jaunt(lv1, bonus action 10ft ไม่โดน OA)+Divine Transportation CD(lv2)+Overland Expedition(lv6, เดินทางเร็ว)+Godspeed(lv17, Divine Strike 2d8→4d8 มีเงื่อนไข)

- **ไม่มี delta** — Godspeed แค่เสริม Divine Strike ที่ baseline คลุมอยู่แล้ว (ไม่ใช่มิติใหม่), Jaunt แตะแค่ 1 มิติในทุก axis ที่เกี่ยวข้อง — 0 delta ทั้งที่ระบบเดิมให้คะแนนกว้าง 5 axis (ตัวอย่างชัดว่าคะแนนกว้างแบบ holistic ไม่ได้แปลว่าข้าม threshold ในระบบใหม่)

## Trickery Domain (XPHB) — illusion trickster

Invoke Duplicity CD(lv3, duplicate ภาพลวงตา)+Trickster's Transposition(lv6, teleport-swap 120ft)+Improved Duplicity(lv17, Shared Distraction+Healing Illusion)

- **Support**: A(baseline)→**S(17-20**, Improved Duplicity flip Reliability[ally adv]+Frequency[heal-on-expire] พร้อมกัน — S-onset ช้าสุดในกลุ่ม Support-S ทั้งหมดในไฟล์นี้ เพราะ lv1-16 เป็นเครื่องมือส่วนตัวล้วน)

## Twilight Domain (TCE 🕰️) — dusk sentinel

Eyes of Night(lv1, darkvision 300ft แชร์ทีม)+Twilight Sanctuary CD(lv2, sphere 30ft เลือก temp-HP/cure ทุกเทิร์น)+Steps of Night(lv6, bonus action บิน)+Twilight Shroud(lv17, half cover)

- **Support**: A(baseline lv2)→**S(2-20**, Twilight Sanctuary's recurring-ทุกเทิร์น AoE)
- Survivability: ไม่มี delta (Sanctuary self-temp-HP+Shroud's half-cover ทั้งคู่แตะ Mitigation มิติเดียวกันซ้ำ — same-dimension เหมือน Forge)

## War Domain (XPHB) — martial priest

War Priest(lv3, bonus action ตีอาวุธเพิ่ม)+Guided Strike CD(lv3, reaction +10 attack roll self/ally)+War God's Blessing(lv6)+Avatar of Battle(lv17, resist BPS)

- **Damage**: B(3)→A(3-6, War Priest ผลัก Primary ก่อน baseline)→**S(7-20**, ซ้อนกับ baseline lv7)
- **Support**: A(baseline)→**S(3-20**, Guided Strike's near-guaranteed-hit reaction)
- **Action Economy**: D(1-2)→**C(3-20**, War Priest[bonus action]+Guided Strike[reaction] 2-2 tie ตั้งแต่ gate เดียวกัน — ครั้งที่ 2 ในไฟล์นี้ที่แตกตั้งแต่ lv3)

## Wealth Domain (VSS 🕰️) — merchant priest

Appraisal+Leverage(lv1)+Riches CD(lv2)+Bribe(lv6, action pacify 24ชม. เสียทอง)+Tycoon(lv17, เงินเพิ่ม 2 เท่า)

- **ไม่มี delta** — Bribe เป็น out-of-combat social tool ไม่แตะ Control's battlefield-severity มิติไหนตรงๆ (ธงช่องโหว่นิยามเดียวกับ Wealth Domain's Bribe ไม่ map เข้า combat Control), toolkit เศรษฐกิจแตะแค่ Breadth มิติเดียวใน Utility — 0 delta

## Zeal Domain (PSA 🕰️) — fanatic berserker-priest

Priest of Zeal(lv1, bonus action ตีอาวุธเพิ่ม)+Consuming Fervor CD(lv2, การันตีดาเมจสูงสุด)+Resounding Strike(lv6, ผลัก 10ft)+Blaze of Glory(lv17, reaction ที่ 0HP เดิน+ตี adv แล้วรับ 5d10+5d10)

- **Damage**: B(1)→A(1-16, Priest of Zeal ผลัก Primary ทันทีที่ lv1 — เร็วที่สุดในกลุ่ม bonus-action-attack ทั้งหมด, Consuming Fervor ซ้อน Reliability ที่ lv2)→**S(17-20**, Blaze of Glory nova มหาศาล — เกรดสูงสุดของ Damage axis ในไฟล์นี้ที่ onset เร็วสุดด้วย ตรงกับระบบเดิมที่ให้ 9/10 สูงสุดในกลุ่มเช่นกัน)
- **Action Economy**: D(1-16)→**C(17-20**, Priest of Zeal[bonus action]+Blaze of Glory[reaction] 2-2 tie ที่ lv17)
- Control: ไม่มี delta (Resounding Strike = มิติเดียว เหมือน Tempest's Thunderbolt Strike)

---

## สรุปเกรดที่ Lv20 (baseline + 27 domain)

| Domain | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | A | B | S | C | D | B | S |
| Ambition | A | B | S | C | D | B | S |
| Arcana | A | B | S | C | D | **A** | S |
| Death | **S** | B | S | C | D | B | S |
| Destruction | **S** | B | S | C | D | B | S |
| Eldritch | A | **A** | S | **B** | D | B | S |
| Forge | A | B | S | C | D | B | S |
| Grave | **S** | **A** | S | C | **C** | B | S |
| Inquisition | **S** | B | S | **B** | **C** | B | S |
| Knowledge | A | B | S | C | D | **S** | S |
| Life | A | B | S | C | D | B | S |
| Light | A | B | S | C | D | B | S |
| Madness | A | **A** | S | C | D | B | S |
| Nature | A | B | S | C | D | B | S |
| Order | A | **A** | S | C | D | B | S |
| Peace | A | B | S | **B** | D | B | S |
| Pestilence | A | **S** | S | C | D | B | S |
| Purification | **S** | B | S | C | D | **A** | S |
| Rum | A | B | S | C | D | B | S |
| Solidarity | A | B | S | C | **C** | B | S |
| Strength | A | B | S | C | D | B | S |
| Tempest | **S** | B | S | C | D | B | S |
| Travel | A | B | S | C | D | B | S |
| Trickery | A | B | S | C | D | B | S |
| Twilight | A | B | S | C | D | B | S |
| War | **S** | B | S | C | **C** | B | S |
| Wealth | A | B | S | C | D | B | S |
| Zeal | **S** | B | S | C | **C** | B | S |

---

## ข้อค้นพบเบื้องต้น

1. **7 domain จบด้วย 0 delta เต็ม** (Ambition, Forge, Nature, Rum, Strength, Travel, Wealth) — สูงกว่าทุกคลาสก่อนหน้ารวมกัน (Channeler มี 2, ที่เหลือมี 0-1) เพราะ Cleric baseline เป็น full-caster ที่ favorable อยู่แล้วหลายแกน (Support A/Versatility S ตั้งแต่ต้น) ทำให้ domain ส่วนใหญ่แค่ "เสริม" ไม่ "เปิดมิติใหม่" — Travel เป็นเคสเด่นสุด (ระบบเดิมให้ 13 คะแนนกว้างขวาง 5 axis แต่ระบบใหม่ 0 delta เป๊ะ เพราะทุก feature แตะแค่ 1 มิติ ไม่เคยถึง 2)
2. **"Same-dimension double-reinforcement ไม่นับ delta" เกิดซ้ำ 5 ครั้ง** (Forge's Soul+Saint of Forge, Twilight's Sanctuary+Shroud, Life's Blessed Healer, Strength's Avatar, Rum's Drunken Sway) — Forge เป็นตัวอย่างชัดสุด: ระบบเดิมให้ Survivability 9/10(S) เต็มที่ แต่ระบบใหม่ 0 delta เพราะ 2 feature (Soul of Forge + Saint of Forge and Fire) แตะ **Mitigation มิติเดียวกันซ้ำ** ไม่ใช่ 2 มิติต่างกัน — ยืนยัน methodology เข้มกว่าระบบเดิมจริง ไม่ใช่แค่แปลคะแนนตรงๆ
3. **2-2 tie บน Action Economy เกิด 5 ครั้งในคลาสเดียว** (War, Grave, Inquisition, Solidarity, Zeal) — มากกว่าทุกคลาสก่อนหน้ารวมกัน (7 ครั้งสะสมทั้งระบบก่อนหน้านี้) เพราะ Cleric's baseline AE เป็น D-lock แบบ modifier-tally (ไม่ใช่ floor rule) ตามที่ baseline file ค้นพบไว้แล้ว — domain ที่มี "bonus-action attack + reaction utility" คู่กัน (pattern ที่พบบ่อยมากใน domain design) จึงมักจะดันกลับไป Primary C ได้พอดี — ไม่มี domain ไหนทะลุไปถึง B เลยเพราะต้องการ 3/4 flip ซึ่งไม่มี domain ไหนทำได้
4. **Damage S เกิด 8 ครั้ง** (Death, Destruction, Grave, Inquisition, Purification, Tempest, War, Zeal) ทุกครั้งผ่าน pattern เดียวกัน: feature ที่ผลัก Primary=Magnitude ตรงๆ ตั้งแต่ก่อน baseline's เอง lv7 (Blessed Strikes) แล้วซ้อนกันกลายเป็น S — "Extra Attack ผ่าน subclass" (War/Zeal's bonus-action attack) เป็น sub-pattern ที่ให้ onset เร็วที่สุด (lv1 สำหรับ Zeal)
5. **Support S เกิด 10 ครั้ง** (Order, Peace, Life, Grave, Inquisition, Solidarity, War, Light, Twilight, Trickery) — Order และ Peace มี **S-onset ที่ lv1** เร็วกว่า baseline's เอง lv2 ด้วยซ้ำ (ผ่าน Voice of Authority/Emboldening Bond ที่ทำงานทันทีไม่ต้องรอ Channel Divinity ปลดล็อก) ส่วน Trickery's Support S มา **ช้าสุด (lv17)** เพราะ lv1-16 เป็นเครื่องมือส่วนตัวล้วนก่อน Improved Duplicity จะขยายเป็นเครื่องมือทีม
6. **Control ไม่มี domain ไหนถึง S เลย แม้ระบบเดิมให้ Eldritch/Madness/Pestilence คะแนนสูงสุดในกลุ่ม (8/10 เท่ากัน)** — วินัย "ไม่ปัดขึ้นตามความรู้สึก" (จาก baseline's Damage axis) ถูกใช้ตรงนี้ด้วย: Pestilence ถึง S ได้เพราะมี 3 มิติ flip ชัดเจน (Infection+Fester+Epidemic Infection) ส่วน Eldritch/Madness หยุดที่ A เพราะมีแค่ 2 มิติ แม้ magnitude ของแต่ละ feature จะดูทรงพลังพอกันในสายตา
7. **Versatility ไม่มี domain ไหนได้ delta เลยแม้แต่ตัวเดียว** — ตรงกับ pattern ที่พบทุกคลาสตั้งแต่ Dimensional Magi (Channeler): baseline ที่แตะ S ตั้งแต่ lv2 อยู่แล้วเป็นเพดานที่ทะลุยากมาก ไม่มี domain ไหนในคลาสไหนเคยข้ามได้เลยนับตั้งแต่พบ pattern นี้ครั้งแรก
