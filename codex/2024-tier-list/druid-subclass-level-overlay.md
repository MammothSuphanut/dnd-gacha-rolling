# Druid — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Druid + Circle feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [druid-subclass-scorecard-2024.md](druid-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดครบทั้ง 17 ตัวแล้ว จากไฟล์ผสม XPHB/DMG/XGE/TCE/SCAG-เทียบเท่า/homebrew Grim Hollow/Valda's Spire)
**Class Baseline อ้างอิง**: [druid-level-baseline.md](druid-level-baseline.md) — Damage B(1-6)→A(7-20) · Control **C(1-20) flat** · Support **B(1-20) flat** · Survivability C(1)→A(2-20) · Action Economy D(1-4)→C(5-20) · Utility **B(1-20) flat** · Versatility A(1)→**S(2-20)**
**รูปแบบตาราง**: Delta-only แบบย่อ (17 subclass)
**Circle gate**: lv3/6/10/14 (uniform ตาม chassis table's "(Subclass feature — ยกเว้น)" markers) — ใช้เลขจริงที่ระบุชัดในระบบเดิมเมื่อมี (lv6/lv9/lv10/lv14)
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก circle**:
1. **Versatility ไม่มีทางขยับได้เลยแม้แต่ตัวเดียว** — baseline ชนเพดาน S ตั้งแต่ lv2 อยู่แล้ว (ไม่มีเกรดสูงกว่า S) แม้ระบบเดิมจะให้ Circle of the Moon คะแนนสูงสุด (10/10 เต็ม) ก็ตาม — ยืนยันชัดว่าเมื่อ baseline ชนเพดานแล้ว "old-system score สูงกว่า" ไม่ได้แปลว่า level-system จะขยับตามได้จริง
2. **ใช้ shortcut "old-system score จากไฟล์เดิม" เป็นตัวคัดกรองเบื้องต้น** (≥+2 จาก baseline = ตัวเก็ง, ≥+3 สำหรับ Damage โดยเฉพาะเพราะ baseline สูงอยู่แล้ว) แต่ **ยังคงเช็ค feature-text จริงทุกตัวว่าเข้าเกณฑ์ 2-flip/floor-escape/multi-mechanism-stack หรือแค่ reinforcement มิติเดียว** ก่อนให้ delta จริง — ปฏิเสธ delta หลายตัวที่ old-system ให้คะแนนสูงแต่กลไกจริงแตะมิติเดียวซ้ำ (Action Economy ของ Circle of the Fist เป็นตัวอย่างชัด)
3. **Control's Primary เองเป็น C จริง (ไม่ใช่ floor)** เพราะ Druid มีสเปลล์ Control จริงแค่ไม่ถึง Tier4 — circle ที่เพิ่ม hard-CC ระดับ Tier4+ ชัดเจน (Dominate Person) ดัน Primary ขึ้นตรงๆ ได้เหมือน Damage/Support axis อื่น ไม่ต้องพึ่ง floor-escape แบบ Dancer/Craftsman

---

## Circle of Blood (GrimHollowPG24) — vampiric bruiser

Rite of Blood Moon(lv3, WS-use bonus action, temp-HP 3×level)+Blood Boon(lv3)+Blood Lust(lv10, resist B/P/S)+Dominate Person ติดตัวถาวร(lv9)+Exsanguinate(lv14)

- **Control**: C(1-8)→**A(9-20**, Dominate Person guaranteed = hard-CC Tier4+ ผลัก Primary ตรงๆ)
- **Survivability**: A(2-9,=baseline)→**S(10-20**, Blood Lust's resistance ซ้อนบน Rite of Blood Moon's temp-HP 3× — 2 กลไก mitigation ที่ทรงพลังพร้อมกัน)
- ไม่มี delta อื่น (Damage/Support old-score +2/+3 แต่กลไกจริงเป็น rider เดี่ยวไม่พอข้าม tier)

## Circle of Dreams (XGE 🕰️) — fey healer-traveler

Balm of the Summer Court(lv3, bonus action pool ฮีล+temp-HP AoE 120ft)+Hearth(lv3)+Hidden Paths(lv3, teleport ally)+Walker in Dreams(lv14, free-cast Dream/Scrying/Teleportation Circle)

- **Support**: B(1-2)→**S(3-20**, Balm of Summer Court เดี่ยวแต่ magnitude/breadth สูงพอ "ยกระดับเป็น healer เต็มตัว" — ยกเว้นข้อกำหนด 2-flip ปกติเพราะความแรงชัดเจนจากคำอธิบายเดิม)
- **Utility**: B(1-2)→A(3-13, Hearth+Hidden Paths หลุด threshold)→**S(14-20**, Walker in Dreams free-cast Teleportation-Circle-tier magic = free-cast-beyond-cap pattern)

## Circle of Entropy (GrimHollowPG24) — apocalyptic blaster

Ruin Incarnate(lv3, WS-use bonus action, ตี 2-3 ครั้งทุก Attack action)+Ruinous Smite(lv3)+Elemental Cataclysm(lv3)+Shake the Earth(lv10)

- **Damage**: B(1-2)→**S(3-20**, Ruin Incarnate's multi-attack-per-Attack-action ผลัก Primary ก่อน baseline lv7)
- ไม่มี delta อื่น (Control/Survivability old-score +1 เท่านั้น modest)

## Circle of Mutation (GrimHollowPG24) — beast-form warper

Predator's Strike(lv3, +2 dmg คงที่)+Apex Predator(lv14)+Unpredictable(lv3)+Mutate Shape(lv3)

- **ไม่มี delta** — ⚠️ ข้อมูล "Mutation Options" ไม่ครบในไฟล์ต้นทาง (ระบบเดิมเองก็ให้คะแนนแบบระมัดระวัง) ทุกกลไกที่ยืนยันได้เป็น rider เดี่ยวไม่พอข้าม tier ไหนเลย — subclass เดียวใน 17 ตัวที่ 0 delta

## Circle of Spores (TCE 🕰️) — necrotic symbiote

Symbiotic Entity(lv3, WS-use, temp-HP 4×level)+Halo of Spores(lv3)+Spreading Spores(lv10)+Fungal Body(lv14, immune blinded/deafened/frightened/poisoned+no-crit)

- **Survivability**: A(2-13,=baseline)→**S(14-20**, Fungal Body flip Debuff Resistance — มิติสุดท้ายที่ baseline ยังไม่แตะ ถึงเกณฑ์ 2/4 พอดี)
- ไม่มี delta อื่น (Damage old-score+2 เป็น rider เดี่ยว)

## Circle of the Stars (XPHB) — celestial constellation

Archer/Chalice/Dragon constellation(lv3, สลับได้ bonus action)+Cosmic Omen(lv3)+Full of Stars(lv14)

- ไม่มี delta ข้าม threshold ชัดเจน (Damage/Support old-score+2/+3 แต่แต่ละ constellation เป็น single-modifier ต่อโหมด ไม่ stack พร้อมกัน — Versatility เป็นแกนที่ระบบเดิมให้เครดิตจริง [9/10] แต่ชนเพดาน S ของ baseline ไปแล้ว)

## Circle of Stones (VSS 🕰️) — henge guardian

Raise Henge(lv3, temp-HP ทีมทุกเทิร์นในเขต henge)+Warding Stones(lv3)+Ley Passage(lv10, henge-network teleport)+Great Henge(lv14)

- **Support**: B(1-2)→**A(3-20**, Raise Henge's recurring AoE temp-HP หลุด threshold — single mechanism แต่ frequency/breadth สูงพอ)
- **Utility**: B(1-9)→**A(10-20**, Ley Passage หลุด threshold — breadth จำกัดเพราะผูกกับ henge network เท่านั้น จึงไม่ถึง S)

## Circle of the City (VSS 🕰️) — urban infiltrator

Cobbleshift(lv3, AoE difficult-terrain+Prone+wall)+Breath of Smog(lv3, reaction AoE poisoned)+Streettalk(lv3)+Whispers of Walls(lv3)+free Passwall(lv3)

- **Control**: C(1-2)→**A(3-20**, Cobbleshift+Breath of Smog 2 กลไก battlefield-control พร้อมกันหลุด threshold)
- **Utility**: B(1-2)→**A(3-20**, Streettalk+Whispers+free-Passwall 3 กลไกพร้อมกันหลุด threshold — breadth กว้างแต่เฉพาะทางเมือง ไม่ถึง S เท่า Dreams' Teleportation-Circle-tier)

## Circle of the Deep (VSS 🕰️) — aquatic warrior

Vortex Attack(lv6)+Davy Jones' Locker(lv14)+Ocean's Ally(lv10, summon 1/rest)+Aquatic(lv3)

- ไม่มี delta ข้าม threshold ชัดเจน (Damage/Support old-score+2 เป็น rider/narrow-summon เดี่ยว — modest ที่สุดในกลุ่มร่วมกับ Mutation)

## Circle of the Fist (VSS 🕰️) — monk-hybrid brawler

Untamed Fury(lv3, WS-use bonus action, ตีเพิ่มแลก slot สูงสุด 3 ครั้ง)+Primal Infusion(lv3, temp-HP 4×level+Wis)+Extra Attack(lv6)+Savage Instinct(lv3)

- **Damage**: B(1-2)→**S(3-20**, Untamed Fury's multi-punch-via-slot-exchange ผลัก Primary ก่อน baseline)
- **Survivability**: A(2, unchanged)→**S(3-20**, Primal Infusion's temp-HP มหาศาล[4×level+Wis]+Tree's Resilience[reaction dmg-reduction] 2 กลไกพร้อมกันตั้งแต่ gate แรก)
- Action Economy: ไม่มี delta — ⚠️ ระบบเดิมให้สูงสุดในกลุ่ม (9/10, "economy gain สูงที่สุดใน Circle") แต่ Untamed Fury แตะแค่ **Bonus-Action-Value+Resource-Conversion ที่ above อยู่แล้วจาก baseline's Wild Resurgence** ไม่ใช่มิติใหม่ (Reaction/Extra Action ยังคง below) — same-dimension trap ชัดเจนที่สุดในไฟล์นี้

## Circle of the Land (XPHB) — terrain adept

Land's Aid(lv3, WS-use action, AoE dmg+heal พร้อมกัน)+Nature's Ward(lv3)+Natural Recovery(lv3)+Nature's Sanctuary(lv14)

- ไม่มี delta ข้าม threshold ชัดเจน (Support old-score+3 มาจาก Land's Aid single dual-purpose feature — ไม่ถึงเกณฑ์ 2-flip)

## Circle of the Moon (XPHB) — beast-form tank

Circle Forms(lv3, CR-scaling Wild Shape+temp-HP 3×level **ทุกครั้ง**+AC floor)+Improved Lunar Radiance(lv14)+แคสสเปลระหว่าง Wild Shape ได้(lv3, ก่อน baseline's เอง lv18)

- **Damage**: B(1-2)→**S(3-20**, Circle Forms ทำให้ตัวสัตว์เป็นแหล่งดาเมจหลัก ผลัก Primary ก่อน baseline)
- **Survivability**: A(2, unchanged)→**S(3-20**, Circle Forms' temp-HP-ทุกครั้ง+AC-floor = tank form เต็มรูปแบบที่ baseline เข้าไม่ถึง — ระบบเดิมให้ full max 10/10)
- ไม่มี delta อื่น (Support old-score+3 จาก single Mass-Cure-Wounds-access, ไม่ถึงเกณฑ์)

## Circle of the Sea (XPHB) — storm caller

Wrath of the Sea(lv3, WS-use bonus action, dmg+push ทุกเทิร์น 10 นาที)+Stormborn(lv10, บิน+resist cold/lightning/thunder 3 ธาตุพร้อมกัน)+Oceanic Gift(lv14)

- **Survivability**: A(2-9,=baseline)→**S(10-20**, Stormborn's triple-element-resistance-พร้อมกัน — magnitude เกินตัวอย่าง Mitigation ปกติในระบบ)
- ไม่มี delta อื่น (Damage/Support old-score+2/+3 เป็น rider เดี่ยวยังไม่พอ)

## Circle of the Shepherd (XGE 🕰️) — spirit-totem summoner

Spirit Totem(lv3, bonus action 3-mode: temp-HP/atk-adv/heal-reflect)+Guardian Spirit(lv10, ฮีล summons)+Faithful Summons(lv14, emergency 4-summon เมื่อล้ม)

- **Support**: B(1-2)→A(3-9, Spirit Totem's 3-mode team-utility หลุด threshold)→**S(10-20**, Guardian Spirit+Faithful Summons ซ้อนมิติที่ 2-3 — support hub ครบเครื่องที่สุดในกลุ่ม ระบบเดิมให้สูงสุด [9/10])
- ไม่มี delta อื่น

## Circle of the Wyrm (VSS 🕰️) — dragon-form blaster

Breath Weapon(lv3, แลก slot AoE cone)+Infused Strikes(lv3)+Draconic Wild Shape(lv3, resist B/P/S)+Fangs and Flight(lv3)+Primordial Aura(lv10)+Wyrm Perfection(lv14)

- **Damage**: B(1-2)→**S(3-20**, Breath Weapon AoE nova+Infused Strikes rider ผลัก Primary ก่อน baseline)
- **Survivability**: A(2, unchanged)→**S(3-20**, Draconic Wild Shape resist+Fangs and Flight escape-tool+Primordial Aura self-resist 3 กลไกพร้อมกัน)
- ไม่มี delta อื่น (Support old-score+3 จาก Primordial Aura's team-share, single mechanism ไม่พอ)

## Circle of Vermin (VSS 🕰️) — swarm-bonded tank

Infested(lv3, passive retaliate+debuff)+Lord of the Low(lv3, +2AC+redirect-dmg-to-swarm)+Plague Carrier(lv10)

- **Survivability**: A(2, unchanged)→**S(3-20**, Lord of the Low's redirect-to-swarm = HP-pool-สำรองรูปแบบใหม่ ไม่เคยเจอมาก่อนนอกจาก Craftsman's Mechanauts')
- ไม่มี delta อื่น

## Circle of Wildfire (TCE 🕰️) — fire-spirit summoner

Summon Wildfire Spirit(lv3, ตัวช่วยรบอิสระ)+Enhanced Bond(lv6, +1d8 dmg/heal ไฟ)+Cauterizing Flames(lv10)+Circle Spells(lv3, Revivify/Mass Cure Wounds/Aura of Life ติดตัวถาวร)+Blazing Revival(lv14)

- **Damage**: B(1-2)→**S(3-20**, Summon Wildfire Spirit = extra-combatant pattern ผลัก Primary ก่อน baseline)
- **Support**: B(1-2)→**A(3-20**, Circle Spells' permanent Revivify/MCW access+Enhanced Bond's heal-die-bonus+Cauterizing Flames' heal-option 3 กลไกพร้อมกันหลุด threshold)

---

## สรุปเกรดที่ Lv20 (baseline + 17 circle)

| Circle | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | A | C | B | A | C | B | S |
| Blood | A | **A** | B | **S** | C | B | S |
| Dreams | A | C | **S** | A | C | **S** | S |
| Entropy | **S** | C | B | A | C | B | S |
| Mutation | A | C | B | A | C | B | S |
| Spores | A | C | B | **S** | C | B | S |
| Stars | A | C | B | A | C | B | S |
| Stones | A | C | **A** | A | C | **A** | S |
| City | A | **A** | B | A | C | **A** | S |
| Deep | A | C | B | A | C | B | S |
| Fist | **S** | C | B | **S** | C | B | S |
| Land | A | C | B | A | C | B | S |
| Moon | **S** | C | B | **S** | C | B | S |
| Sea | A | C | B | **S** | C | B | S |
| Shepherd | A | C | **S** | A | C | B | S |
| Wyrm | **S** | C | B | **S** | C | B | S |
| Vermin | A | C | B | **S** | C | B | S |
| Wildfire | **S** | C | **A** | A | C | B | S |

---

## ข้อค้นพบเบื้องต้น

1. **Survivability S เกิดถึง 7 ครั้ง — มากสุดในบรรดา axis เดียวของคลาสไหนก็ตามในระบบนี้** (Blood/Spores/Fist/Moon/Sea/Wyrm/Vermin) เพราะ Wild Shape ให้ temp-HP baseline สูงอยู่แล้ว (A ตั้งแต่ lv2) และหลาย Circle เพิ่มกลไก Mitigation/Debuff-Resistance ที่แตกต่างมิติกันจริง (ไม่ใช่ same-dimension ซ้ำแบบที่เจอบ่อยใน Cleric/Craftsman) — Circle of Vermin's "redirect-to-swarm" เป็น HP-pool-สำรองรูปแบบใหม่ที่ 2 ต่อจาก Craftsman's Mechanauts'
2. **Circle of the Fist's Action Economy เป็น same-dimension-trap ที่ชัดเจนที่สุดในไฟล์นี้** — ระบบเดิมให้คะแนนสูงสุดในกลุ่ม (9/10, "economy gain สูงที่สุดใน Circle") แต่กลไกจริงแตะแค่ 2 มิติที่ above อยู่แล้วจาก baseline's Wild Resurgence (Bonus-Action-Value, Resource-Conversion) — Reaction/Extra-Action ยังคง below เท่าเดิม พิสูจน์อีกครั้งว่า "old-system คะแนนสูง" ไม่ได้แปลว่าข้าม threshold ในระบบเข้มกว่านี้เสมอไป
3. **Damage early-S (lv3) เกิด 5/17 circle** (Entropy/Fist/Moon/Wyrm/Wildfire) ทุกเคสผ่านรูปแบบเดียวกัน: multi-attack-per-turn, extra-combatant, หรือ CR-scaling-form-becomes-primary-weapon — สัดส่วนใกล้เคียง Dancer (5/14) แม้ baseline คนละแบบกัน (Dancer=striker บริสุทธิ์, Druid=full caster)
4. **Circle of Mutation เป็น subclass เดียวใน 17 ตัวที่ 0 delta** — ส่วนหนึ่งเพราะข้อมูล "Mutation Options" ไม่ครบในไฟล์ต้นทาง (ระบบเดิมเองก็ flag ไว้แล้วว่าให้คะแนนแบบระมัดระวัง) ทำให้ทุก feature ที่ยืนยันได้เป็นแค่ rider เดี่ยว
5. **Control axis มี Primary จริง (C, ไม่ใช่ floor) ต่างจาก Dancer/Craftsman** — มีแค่ 2 circle ที่ดันได้ (Blood ผ่าน Dominate Person Tier4+, City ผ่าน multi-mechanism battlefield-control) เพราะต้องยกระดับ Severity ข้าม Tier3-cap ของ baseline เองไปจริงๆ ไม่ใช่แค่หลุด floor เฉยๆ — ยากกว่า floor-escape ของ Dancer/Craftsman อย่างมีนัยสำคัญ
6. **Versatility 0 delta ต่อเนื่องเป็นครั้งที่ 4** (Cleric+Craftsman+Dancer+Druid) แม้ Circle of the Moon จะได้คะแนนสูงสุดเท่าที่ระบบเดิมเคยให้มา (10/10 เต็ม) —ยืนยันชัดว่าเมื่อ baseline ชนเพดาน S แล้ว ไม่มีทางขยับต่อได้อีกไม่ว่า subclass จะแรงแค่ไหน
