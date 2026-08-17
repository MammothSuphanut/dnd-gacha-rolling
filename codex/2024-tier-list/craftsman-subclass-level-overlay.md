# Craftsman — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Craftsman + Guild feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [craftsman-subclass-scorecard-2024.md](craftsman-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดจาก `Valda's Spire of Secrets 2024` แล้วครบทั้ง 11 ตัว, ไม่มี 🕰️ orphan) — แปลผลจากคำอธิบาย feature จริงที่มีอยู่แล้ว
**Class Baseline อ้างอิง**: [craftsman-level-baseline.md](craftsman-level-baseline.md) — Damage A(1-10)→S(11-20) · Control **D(1-20) flat** (floor rule, ไม่มีกลไก Control เลย) · Support **B(1-20) flat** · Survivability B(1-17)→A(18-20) · Action Economy **C(1-20) flat** · Utility **C(1-20) flat** · Versatility **B(1-20) flat**
**รูปแบบตาราง**: Delta-only แบบย่อ (11 subclass — เกิน threshold ≤10 ที่เคยใช้ full-table เล็กน้อย จึงใช้แบบย่อเหมือน Barbarian/Bard/Captain/Cleric)
**Guild gate**: lv3/6/10/14 (uniform, ทุก guild มาจากไฟล์ 2024 เดียวกัน)
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก guild**:
1. **Control's D-lock เป็น floor rule (ไม่มีกลไกเลย) ไม่ใช่ modifier-tally-lock** — guild ไหนก็ตามที่เพิ่มกลไก control จริง (save-or-condition) จะ **หลุด floor ทันที** และประเมิน Primary ใหม่ตาม severity/breadth ของ feature นั้นเอง (ไม่ต้องนับ 2-flip เหมือน Action-Economy/Survivability's modifier-tally-lock)
2. **"Same-dimension double-reinforcement ไม่นับ delta" เกิดซ้ำอีก 2 ครั้ง** (Armigers' Fortify[AC+Resistance ทั้งคู่คือ Mitigation], Wintercarvers' Winter Core+Frostburn[cold+fire resist ทั้งคู่คือ Mitigation]) — ตอกย้ำ policy จาก Cleric's Forge Domain ว่า resistance/AC-package ที่ดูแรงในสายตาไม่นับถ้าแตะมิติเดียวซ้ำ
3. **Damage S-onset ที่ lv3 (ก่อน baseline's เอง lv11 ถึง 8 เลเวล) เกิดถึง 9/11 guild** — สูงกว่าทุกคลาสก่อนหน้าในสัดส่วนนี้ เพราะ baseline Damage เริ่มที่ A อยู่แล้ว (ไม่ใช่ B) ทำให้ guild feature ส่วนใหญ่แค่ต้องเพิ่ม modifier อีก 1-2 ตัวก็ดันเป็น S ได้ง่ายกว่าที่คลาสอื่นต้องไต่จาก B

---

## Arcane Maesters' Guild — real magic-item crafting

Arcane Strike(lv3, แทน attack ด้วย wizard cantrip/magic item) + Magic Item Crafting(lv3, คราฟต์ไอเทมวิเศษจริง) + Sever Connection(lv6, reaction ลด attune แลก AC) + capstone(lv14)

- **Damage**: A(1-2)→**S(3-20**, Arcane Strike's flexible cantrip/item damage source ผลัก Primary ก่อน baseline lv11)
- **Utility**: C(1-2)→**B(3-20**, Magic Item Crafting flip Breadth[real-magic-item access]+Magnitude พร้อมกัน — สูงสุดในกลุ่ม 11 guild ของ axis นี้)
- Survivability: ไม่มี delta (Sever Connection = Mitigation มิติเดียว)

## Armigers' Guild — heavy-armor taunt tank

Shining Steel(lv3, taunt AoE 30ft disadvantage-ถ้าไม่ตีตัวเอง) + Armored Slam(lv3, dmg=AC ตัวเอง) + Fortify(lv6, bonus action AC+mod+resist-ทุกชนิด) + Colossal Slam(lv14)

- **Damage**: A(1-2)→**S(3-20**, Armored Slam's AC-scaled damage ผลัก Primary ก่อน baseline)
- **Control**: D(1-2)→**B(3-20**, Shining Steel เป็นกลไก taunt/aggro จริง — หลุด floor)
- Survivability: ไม่มี delta — ⚠️ ระบบเดิมให้เต็ม S(10/10) แต่ Fortify's AC-bonus+Resistance ทั้งคู่คือ **Mitigation มิติเดียวกัน** ไม่นับ 2 flip (same-dimension trap เหมือน Cleric's Forge Domain)

## Bladeworkers' Guild — precision duelist

Weapon Versatilist(lv3, Advantage ฟรี 1/เทิร์น) + Bane Weapons(lv3, extra force dmg ต่อ creature type) + Defensive Disarm(lv6, reaction ปลดอาวุธศัตรู) + Vicious Strike(lv14, Advantage→auto-crit)

- **Damage**: A(1-2)→**S(3-20**, Weapon Versatilist+Bane Weapons ผลัก Primary ก่อน baseline)
- **Control**: D(1-5)→**B(6-20**, Defensive Disarm เป็นกลไก disarm จริง — หลุด floor แต่ severity แคบ[reactive-only, self-defense])

## Calibarons' Guild — exotic-ammo gunner

Exotic Ammunition(lv3, Drilling/Flechette) + Magazine(lv3) + Suppressive Fire(lv6, disadvantage ต่อเนื่องทุกนัดที่โดน) + Stopping Power(lv14)

- **Damage**: A(1-2)→**S(3-20**, Exotic Ammunition ผลัก Primary ก่อน baseline)
- **Control**: D(1-2)→**B(6-20**, Suppressive Fire เป็นกลไก debuff จริง — หลุด floor, Frequency สูง[ทุกนัดที่โดน] ชดเชย severity แคบ)

## Clockworkers' Guild — 2-construct commander

Clockwork Construct×2(lv3, โจมตีเองผ่าน 1 bonus action) + Death Burst(lv3) + Construct Enchantments(lv14)

- **Damage**: A(1-2)→**S(3-20**, construct 2 ตัวโจมตีเองทุกเทิร์น = แหล่งดาเมจคู่ขนานเต็มรูปแบบ ผลัก Primary ก่อน baseline)
- **Action Economy**: C(1-2)→**B(3-20**, สั่ง construct 2 ตัวผ่าน 1 bonus action flip ทั้ง Bonus-Action-Value+Extra-Action-Access พร้อมกัน — 2-2 tie กลับสู่ Primary B — economy multiplier แรงสุดในกลุ่ม)

## Courtiers' Guild — battlefield medic-buffer

Rapid Suturing(lv3, bonus action ฮีล) + Cosmetic Enchantments(lv3) + Petticoat Plate(lv6) + Adventuring Couture(lv14, bonus action Heroic Inspiration+temp-HP ทีม 30ft)

- **Support**: B(1-2)→A(3-13, Rapid Suturing's real-heal magnitude ผลัก Primary)→**S(14-20**, Adventuring Couture ซ้อนมิติที่ 2[Breadth ทีม-30ft])
- Damage: ไม่มี delta — guild เดียวใน 11 ตัวที่ไม่ดัน Damage เลย (คงที่ A(1-10)→S(11-20) เท่า baseline เป๊ะ)

## Forgeknights' Guild — fire-forge blaster

Flare Damage(lv3, reroll-max ดาเมจไฟ ไม่จำกัดครั้งเท่า Int mod) + Explosive Armory(lv3) + Scorching Steel(lv6) + Fire Burst(lv14, free Fireball)

- **Damage**: A(1-2)→**S(3-20**, Flare Damage's reroll-max reliability ผลัก Primary ก่อน baseline)
- ไม่มี delta อื่น (Scorching Steel = Mitigation มิติเดียว)

## Mechanauts' Guild — pilotable mech

Apparatus(lv3, Extra Attack ในตัว+HP pool แยก+Total Cover) + Ejector Seat(lv3, reaction สลัดตัวก่อนตาย) + Magitech Upgrade(lv14) + Frame Upgrade

- **Damage**: A(1-2)→**S(3-20**, apparatus's ตัว Extra Attack เองผลัก Primary ก่อน baseline)
- **Survivability**: B(1-2)→**S(3-20**, apparatus flip Mitigation[HP pool แยก+Total Cover]+Death Prevention[Ejector Seat] 2 มิติพร้อมกัน — ปัดเกิน Primary-reversion ธรรมดาไปถึง S เพราะเป็น 3-modifier stack เต็มรูปแบบ(รวม HP-pool ที่นับเป็นกลไกใหม่จริงๆ ไม่เคยเจอมาก่อน))
- Action Economy: ไม่มี delta (Rocket Engine = Bonus-Action-Value มิติเดียว)

## Thunderlords' Guild — electric chain-damage

Shock(lv3) + Arcing Jolt(lv3, chain เป้าที่ 2) + Static Charge(lv6, bonus action retaliate) + Ball Lightning(lv14, โซนถาวร)

- **Damage**: A(1-2)→**S(3-20**, Shock+Arcing Jolt ผลัก Primary ก่อน baseline)
- ไม่มี delta อื่น (Static Charge+Ball Lightning ทั้งคู่ bonus action = มิติเดียวกัน)

## Trappers' Guild — battlefield trap-controller

Traps(lv3, restrain/slow scaling ตามเลเวล) + Booby Trap(lv3) + Quick Deployment(lv6, bonus action วางกับดัก) + Escape Plan(lv6, reaction เคลื่อนที่+วางไม่โดน OA)

- **Damage**: A(1-2)→**S(3-20**, Traps' ดาเมจคู่ขนานผลัก Primary ก่อน baseline)
- **Control**: D(1-2)→**A(3-20**, Traps ให้ restrain/slow จริง breadth กว้าง(AoE placement)+frequency สูง — หลุด floor ตรงสู่ A ทันที เกรดสูงสุดในกลุ่มของ axis นี้)
- **Action Economy**: C(1-2)→**B(6-20**, Quick Deployment[bonus action]+Escape Plan[reaction] 2-2 tie กลับสู่ Primary B — guild เดียวที่แก้ทั้ง Control และ Action Economy พร้อมกัน สมดุลที่สุดในกลุ่ม)

## Wintercarvers' Guild — ice paralysis

Frigid Armory(lv3, อัปเกรด mastery property) + Sub-Zero(lv3, bonus action Con-save-or-Paralyzed) + Frostburn(lv6, free Fire Shield) + capstone(lv14)

- **Control**: D(1-2)→**A(3-20**, Sub-Zero ให้ **Paralyzed** จริง — severity สูงสุดเท่าที่เคยเจอในระบบ floor-escape ของคลาสไหนก็ตาม, ชดเชยด้วย single-target-only จึงหยุดที่ A ไม่ถึง S)
- ไม่มี delta อื่น — ⚠️ ระบบเดิมให้ Survivability เต็ม S(9/10) แต่ Winter Core[cold resist]+Frostburn[fire resist] ทั้งคู่คือ **Mitigation มิติเดียวกันซ้ำ** ไม่นับ 2 flip (same-dimension trap ครั้งที่ 2 ในไฟล์นี้)

---

## สรุปเกรดที่ Lv20 (baseline + 11 guild)

| Guild | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | S | D | B | A | C | C | B |
| Arcane Maesters' | S | D | B | A | C | **B** | B |
| Armigers' | S | **B** | B | A | C | C | B |
| Bladeworkers' | S | **B** | B | A | C | C | B |
| Calibarons' | S | **B** | B | A | C | C | B |
| Clockworkers' | S | D | B | A | **B** | C | B |
| Courtiers' | A | D | **S** | A | C | C | B |
| Forgeknights' | S | D | B | A | C | C | B |
| Mechanauts' | S | D | B | **S** | C | C | B |
| Thunderlords' | S | D | B | A | C | C | B |
| Trappers' | S | **A** | B | A | **B** | C | B |
| Wintercarvers' | S | **A** | B | A | C | C | B |

---

## ข้อค้นพบเบื้องต้น

1. **ไม่มี guild ไหน 0-delta เลยสักตัว** — ต่างจาก Cleric ที่มี 7/27 ตัว 0-delta เพราะ Craftsman baseline "โหลดมาแล้ว" ด้วย feature จำนวนมาก (25 feature) ที่ guild ส่วนใหญ่เพิ่มกลไกใหม่จริงจัง (real magic item, mecha, elemental system) ไม่ใช่แค่ rider เสริม — ยืนยันว่า "อัตรา 0-delta" ขึ้นกับความ "ว่าง" ของ baseline มากกว่าตัวคลาสเอง
2. **Control's floor-rule escape ให้ tier ตาม severity ของ feature ตรงๆ ไม่ต้องนับ 2-flip** — พบ 3 ระดับต่างกันในไฟล์เดียว: B(disarm/debuff แคบ: Armigers'/Bladeworkers'/Calibarons'), A(restrain scaling: Trappers', Paralyzed: Wintercarvers') — เป็นครั้งแรกที่เห็น floor-escape ให้ผลลัพธ์หลากหลายเกรดในคลาสเดียว (Weapon-Mastery floor-escape ก่อนหน้านี้ให้ B เท่ากันหมดทุกครั้ง)
3. **Damage S-onset ที่ lv3 เกิด 9/11 guild** — สูงสุดเท่าที่เคยเจอ (proportion-wise) เพราะ baseline Damage เริ่มที่ A ไม่ใช่ B ทำให้ต้องการแค่ modifier เดียวที่แรงพอก็ดันเป็น S ได้ ง่ายกว่าทุกคลาสก่อนหน้า — Courtiers' เป็น guild เดียวที่ไม่แตะ Damage เลย (โฟกัส healer/buffer เต็มตัว)
4. **"Same-dimension double-reinforcement" เกิดซ้ำอีก 2 ครั้ง** (Armigers', Wintercarvers') ทั้งคู่เป็น Survivability-Mitigation-only-package ที่ระบบเดิมให้เต็ม S แต่ระบบใหม่ 0 delta — สะสมรวม 3 ครั้งกับ Cleric's Forge Domain เป็นรูปแบบที่เกิดซ้ำมากพอจะพิจารณา codify เข้า Anchor Rubric ในอนาคต
5. **Mechanauts' Survivability เป็นเคสแรกที่ปัดเกิน Primary-reversion ธรรมดาไปถึง S** — เพราะ apparatus's HP-pool-แยก เป็นกลไกที่ไม่เคยเจอมาก่อนในระบบ (ปกติ modifier แค่ปรับ hit-chance/damage-reduction ธรรมดา แต่นี่คือ "พูล HP สำรองทั้งก้อน") ผสาน Death Prevention จาก Ejector Seat — 2 มิติชัดเจนไม่ใช่ same-dimension trap
6. **Action Economy escape (2-2 tie) เกิด 2 ครั้ง** (Clockworkers', Trappers') ทั้งคู่ผ่านคู่ bonus-action+reaction/extra-action ที่ต่างมิติกันจริง — Trappers' เป็น guild เดียวในไฟล์นี้ที่แก้ทั้ง Control และ Action Economy พร้อมกัน (สมดุลสุด ตรงกับที่ระบบเดิมให้ Overall=S เต็ม)
7. **Versatility ยังคง 0 delta ทุก guild** — ต่อเนื่องจาก Cleric's 0/27 แม้แต่ guild ที่ดูเปิด role ใหม่ชัดเจนที่สุด (Mechanauts', Courtiers') ก็ไม่ flip มิติใหม่ที่ baseline ยังไม่นับ (Target-Type/Adaptability-Under-Pressure ยังคง below อยู่ดี เพราะสลับได้แค่ Long Rest เหมือนเดิม) — ยืนยันว่า Versatility's net-cancellation ceiling (ไม่ว่าจะเป็น B หรือ S) ทะลุยากมากในทุกคลาสจนถึงตอนนี้
