# Fighter — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Fighter + subclass feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [fighter-subclass-scorecard-2024.md](fighter-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดครบทั้ง 21 ตัวจากไฟล์ผสม XPHB/EGW/SCAG/TCE/XGE/FRHoF/homebrew Grim Hollow — 4 ตัวมีข้อมูลไม่ครบในไฟล์ต้นทาง: Arcane Archer/Blade Breaker/Rune Knight/Living Crucible ยังคงความระมัดระวังเดิม)
**Class Baseline อ้างอิง**: [fighter-level-baseline.md](fighter-level-baseline.md) — Damage B(1-10)→A(11-19)→S(20) · Control D(1-8)→C(9-20) · Support **D(1-20) flat** (floor) · Survivability B(1-8)→A(9-20) · Action Economy C(1)→B(2-10)→A(11-19)→S(20) · Utility **D(1-20) flat** (floor, absolute — ไม่มีกลไก Utility ใดๆ เลยใน baseline) · Versatility B(1)→A(2-20)
**รูปแบบตาราง**: Delta-only แบบย่อ (21 subclass)
**Subclass gate**: lv3/7/10/15/18 (ตาม chassis table) — ใช้เลขจริงที่ระบุชัดในระบบเดิมเมื่อมี
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก subclass**:
1. **Utility's floor เป็น floor ที่ "รั่ว" ที่สุดในระบบ — 18/21 subclass หลุด floor ได้** (ต่างจาก Craftsman/Dancer ที่ floor เข้มกว่ามาก) เพราะ baseline Utility=0 เต็ม (ไม่มีกลไกอะไรเลยแม้แต่ skill proficiency เดี่ยว) ทำให้ skill-proficiency เล็กๆ น้อยๆ ก็หลุด floor ได้ทันที (grade C) แม้จะแคบมากก็ตาม
2. **Versatility baseline หยุดที่ A (ไม่ใช่ S เหมือน 4 คลาสก่อนหน้า)** — เป็นคลาสแรกในชั้น 2 ที่ Versatility ยังมีที่ว่างให้ขยับได้จริง (Battle Master/Eldritch Knight/Psi Warrior ทำได้) ต่างจาก Cleric/Craftsman/Dancer/Druid ที่ชนเพดาน S ตั้งแต่ baseline แล้วขยับไม่ได้เลย
3. **Damage/Survivability/Action-Economy baseline แข็งมากอยู่แล้ว (Fighter เป็น "ตัวอย่าง outlier" ของ Anchor เอง)** — ทำให้ same-dimension-trap เกิดถี่มาก (13/21 subclass มี Damage old-score=9 แต่ส่วนใหญ่เป็น rider เดี่ยวไม่ข้าม threshold) — มีแค่กลไก multi-attack/AoE-nova/parallel-attack ที่แท้จริงเท่านั้นที่ผลัก Primary ได้เร็วกว่า baseline

---

## Arcane Archer (XGE 🕰️) — magic arrow shot

⚠️ ข้อมูล "Arcane Shot Options" ไม่ครบ (มีแค่ Curving Shot/Magic Arrow/Ever-Ready Shot ยืนยันได้)

- **Utility**: D(1-2)→**C(3-20**, Arcana/Nature prof+cantrip หลุด floor — narrow)
- ไม่มี delta อื่น (Damage/Control/Survivability ข้อมูลไม่พอยืนยัน, Action Economy old-score+1 modest)

## Banneret (FRHoF) — inspiring commander

Group Recovery(lv3, Second Wind→ฮีล ally)+Team Tactics(lv7)+Rallying Surge(lv3, Action Surge→ally free reaction atk)+Shared Resilience(lv15, Indomitable→ally reroll save)

- **Support**: D(1-2)→**S(3-20**, 4 กลไกทีมพร้อมกันตั้งแต่ gate แรก ทุกอย่างพ่วง resource เดิมไม่เสียเพิ่ม — เต็ม max เท่า Cleric's Order/Peace)
- **Utility**: D(1-2)→**C(3-20**, Knightly Envoy หลุด floor — narrow)

## Battle Master (XPHB) — maneuver specialist

Combat Superiority(lv3, Superiority Die + 9 maneuver ให้เลือกใช้ต่อการตี: Trip/Menacing/Disarm/Commander's Strike/Riposte/Parry ฯลฯ)

- **Control**: D(1-2)→**B(3-20**, maneuver ให้ Prone/Frightened/Disarm เลือกได้ต่อการตี — earlier+higher-severity กว่า baseline's Tactical Master ที่ lv9)
- **Support**: D(1-2)→**A(3-20**, Commander's Strike[ally free attack]+Rally[temp-HP] 2 กลไกพร้อมกัน)
- **Utility**: D(1-2)→**C(3-20**, Student of War หลุด floor — narrow)
- **Versatility**: A(2, unchanged)→**S(3-20**, maneuver เลือกใหม่ได้ต่อการตี = flip Adaptability-Under-Pressure ที่ baseline ยังไม่มี — **คลาสแรกในชั้น 2 ที่ Versatility ขยับได้จริง** เพราะ baseline หยุดที่ A ไม่ใช่ S)

## Blade Breaker (GrimHollowPlayerPack 🕰️) — stance duelist

⚠️ ข้อมูล "Blade Breaker Maneuvers" ไม่ครบ (มีแค่ 4 stance+feature เสริมยืนยันได้)

- **Control**: D(1-2)→**B(3-20**, Adamantine Bull stance's reaction-push หลุด floor)
- ไม่มี delta อื่น (Support/Utility=0 เต็มยืนยันชัด, Damage/Survivability old-score+1 reinforce เดิม)

## Bone Knight (VSS 🕰️) — undying skeleton knight

Bone Blades(lv3)+Adamant Ivory(lv3, AC ไม่สวมเกราะ 17→20+reaction dmg-reduction)+Master Osteoth(lv18, Hit-Die-exchange)

- **Survivability**: A(2, unchanged)→**S(3-20**, Adamant Ivory's AC-package สูงกว่าเกราะ+โล่ปกติชัดเจน — ระบบเดิมให้ full max 10/10)
- **Utility**: D(1-2)→**C(3-20**, Restructure หลุด floor — narrow)

## Brawler (VSS 🕰️) — unarmed grappler

Brute Force(lv3, bonus-action dmg-die-upgrade+grapple-option)+Owlbear Wrestler(lv15)+Haymaker(lv10)

- **Control**: D(1-2)→**B(3-20**, Brute Force's grapple-option+Owlbear Wrestler หลุด floor — grapple-specialist)
- **Utility**: D(1-2)→**C(3-20**, Imposing Physique หลุด floor — narrow)

## Bulwark Warrior (GrimHollowPG24) — taunt tank

Protective Taunt(lv3, disadvantage-เมื่อโจมตีคนอื่น)+Threatening Presence(lv7, AoE 5d6 psychic)+Weather the Storm(lv3, temp-HP ทุกเทิร์น)+Halt the Assault(lv18, reaction redirect+resist)

- **Damage**: B(1-6)→**S(7-20**, Threatening Presence's AoE nova ผลัก Primary ก่อน baseline lv11)
- **Control**: D(1-2)→**B(3-20**, Protective Taunt+Threatening Presence 2 กลไก taunt-control)
- **Survivability**: A(9-17,=baseline)→**S(18-20**, Halt the Assault flip Mitigation — มิติใหม่ที่ baseline ยังไม่แตะ)
- ⚠️ Utility ยังคง D flat (ยืนยันชัดว่า 0 เต็ม — 1 ใน 3 subclass เดียวในกลุ่มที่ไม่หลุด floor นี้)

## Cavalier (XGE 🕰️) — lockdown mounted knight

Unwavering Mark(lv3, bonus-action counter-atk+dmg เมื่อเป้าโจมตีคนอื่น)+Hold the Line(lv10, speed→0 บน OA)+Vigilant Defender(lv18, reaction OA พิเศษต่อศัตรูแต่ละตัว)+Warding Maneuver(lv3)

- **Damage**: B(1-2)→**S(3-20**, Unwavering Mark's bonus-action counter-attack ผลัก Primary ก่อน baseline)
- **Control**: D(1-2)→B(3-9, Unwavering Mark หลุด floor)→**A(10-20**, Hold the Line's speed-lock severity สูงขึ้น)
- **Support**: D(1-2)→**B(3-20**, Warding Maneuver ใช้กับ ally ได้)
- **Action Economy**: A(11-17,=baseline)→**S(18-20**, Vigilant Defender flip Reaction Value — มิติที่ 3 เหนือ baseline's 2-2 tie เดิม)
- **Utility**: D(1-2)→**C(3-20**, Bonus Proficiency หลุด floor — narrow)

## Celestial Lancer (VSS 🕰️) — falling-strike knight

Plunging Attack(lv3)+Earthshaker(lv10, AoE Prone)+Celestial Aura(lv15, Second Wind→ally temp-HP)+Meteor Jump(lv3)

- **Damage**: B(1-9,=baseline)→**S(10-20**, Earthshaker's AoE nova ผลัก Primary ก่อน baseline lv11)
- **Support**: D(1-2)→**B(15-20**, Celestial Aura หลุด floor — เฉพาะ lv15+)
- **Utility**: D(1-2)→**C(3-20**, Meteor Jump หลุด floor — narrow)

## Champion (XPHB) — pure striker

Improved/Superior Critical(lv3/15, ขยายช่วง crit)+Survivor(lv18)+Remarkable Athlete+Additional Fighting Style(lv7)

- **ไม่มี delta** — subclass เดียวใน 21 ตัวที่ 0 delta เต็ม: ทุกกลไก (crit-range, Survivor's death-save-reinforcement) เสริมมิติที่ above อยู่แล้วจาก baseline โดยตรง ไม่เปิดมิติใหม่เลยสักตัว — ตรงกับที่ระบบเดิมเรียกว่า "แก้จุดอ่อนของ baseline น้อยที่สุดในกลุ่ม"

## Corsair (VSS 🕰️) — sneak-attack duelist

Surprise Attack(lv3, sneak-dmg 1d6→4d6)+Untouchable Swordsman(lv18)+Three Sheets(lv7)+Slippery Positioning(lv15)+Charmed Life(lv3)

- **Control**: D(1-2)→**C(18-20**, Untouchable Swordsman หลุด floor — narrow/late)
- **Utility**: D(1-2)→**C(3-20**, Commandeer+Sleight of Hand หลุด floor — narrow)

## Dungeoneer (VSS 🕰️) — trap-savvy delver

Kick In The Door(lv3)+Monster Kill(lv10)+Danger Sense(lv3)+Lethality Prevention(lv15, dmg cap 50)+Avoidance(lv18, evasion เต็มรูปแบบ)

- **Survivability**: A(9-17,=baseline)→**S(18-20**, Avoidance = Evasion จริง flip Debuff Resistance — ตรงกับตัวอย่างเพดานที่ Anchor เองอ้างชื่อ Rogue/Monk/Dancer)
- **Utility**: D(1-2)→**B(3-20**, Dungeoneer's Intuition หลุด floor — breadth กว้างกว่า narrow ปกติ [trap/shapechanger/magic 3 ประเภท])

## Echo Knight (EGW 🕰️) — spectral duplicate

Unleash Incarnation(lv3, ตีเพิ่มจากตำแหน่ง echo, Con mod ครั้ง/rest)+Legion of One(lv18, echo 2 ตัว)+Shadow Martyr(lv10)+Echo Avatar(lv7, scout 1000ft)+Reclaim Potential(lv15)

- **Damage**: B(1-2)→**S(3-20**, Unleash Incarnation = extra-attack-via-subclass ผลัก Primary ก่อน baseline)
- **Support**: D(1-2)→**B(10-20**, Shadow Martyr หลุด floor)
- **Utility**: D(1-2)→**B(7-20**, Echo Avatar's remote-scouting 1000ft หลุด floor — magnitude สูงกว่า narrow ปกติ)

## Eldritch Knight (XPHB) — wizard-hybrid soldier

War Magic(lv3, แทนที่การโจมตีด้วย cantrip)+เข้าถึง spell list ของ Wizard(lv3)+Eldritch Strike(lv10)+Arcane Charge(lv15)

- **Control**: D(1-2)→**A(3-20**, เข้าถึง Web/Hold Person-tier ตรง peer's Tier4 benchmark โดยตรง)
- **Utility**: D(1-2)→**A(3-20**, cantrip/spell utility เต็มชุดของ Wizard [Detect Magic/Comprehend Languages/Knock] — magnitude กว้างเทียบเท่า full-caster subclass grant)
- **Versatility**: A(2, unchanged)→**S(3-20**, spell list ทั้งเล่มเปิด Target-Type Coverage[AoE vs single-target เลือกได้] ที่ baseline ไม่มี — คลาสที่ 2 ในไฟล์นี้ที่ทะลุเพดาน A)
- Support: ไม่มี delta — ⚠️ ยืนยันชัด "ขึ้นกับ spell ที่เลือกเอง" ไม่การันตี

## Living Crucible (GrimHollowPG24) — alchemical infusion warrior

⚠️ ข้อมูล "Compound Options" ไม่ครบ

- **Utility**: D(1-2)→**C(3-20**, Alchemist's tools double-prof หลุด floor — narrow, ข้อมูลไม่ครบ)
- ไม่มี delta อื่น — ⚠️ Support ยืนยันชัด "self-only" ไม่หลุด floor เลย

## Mage Hand Magus (VSS 🕰️) — spectral hand warrior

Warhand(lv10, Bigby's-Hand-tier: Clenched Fist dmg/Grasping Hand restrain/Forceful Hand push)+Combat Hands(lv3)+Handglide(lv15)

- **Damage**: B(1-9,=baseline)→**S(10-20**, Warhand ตี parallel ผ่าน action+bonus-action พร้อมกัน — extra-attack-family pattern)
- **Control**: D(1-9)→**A(10-20**, Warhand's Grasping Hand restrain ตรง peer's Tier4 benchmark)
- **Utility**: D(1-2)→**A(3-20**, Mage Hand ยกของ 5×level+remote check+Handglide บิน — toolkit กว้างที่สุดในกลุ่ม floor-escape นี้ [8/10 old-score สูงสุด])
- Support: ไม่มี delta (ยืนยันชัด =baseline)

## Nightwatcher (GrimHollowPG24) — night ambusher

Size Up(lv3, bonus-action disadvantage+resist debuff)+Warning Shout(lv3)+Night Stalker(lv10)+Ready for Action(lv15)+Beat Down(lv18)

- **Control**: D(1-2)→**B(3-20**, Size Up หลุด floor)
- **Support**: D(1-2)→**A(3-20**, Size Up ป้องกัน ally+Warning Shout แจก advantage-initiative ทีม 2 กลไกพร้อมกัน)
- **Utility**: D(1-2)→**A(3-20**, Darkvision+Adv-Perception+Expertise+2 skill prof — ชุดสอดแนมกว้าง)

## Psi Warrior (XPHB) — psionic energy warrior

Psionic Strike(lv3, extra force dmg pool สูงสุด 12d12)+Telekinetic Thrust(lv7)+Protective Field(lv3)+Guarded Mind(lv10, resist psychic+ล้าง charmed/frightened)+Bulwark of Force(lv15)+Telekinetic Movement(lv3)+Telekinetic Master(lv18, free Telekinesis)

- **Damage**: B(1-2)→**S(3-20**, Psionic Strike's ดาเมจ pool ขนาด 12d12 ผลัก Primary ก่อน baseline)
- **Control**: D(1-6)→**B(7-20**, Telekinetic Thrust หลุด floor)
- **Support**: D(1-2)→**A(3-20**, Protective Field ใช้กับ ally ได้+Bulwark of Force multi-target cover 2 กลไก)
- **Survivability**: A(9, unchanged)→**S(10-20**, Guarded Mind flip Mitigation+Debuff Resistance **พร้อมกันในฟีเจอร์เดียว** — clean 2-flip crossing)
- **Utility**: D(1-2)→B(3-17, Telekinetic Movement หลุด floor)→**A(18-20**, Telekinetic Master's free-cast Telekinesis ซ้อนมิติที่ 2)
- **Versatility**: A(2, unchanged)→**S(3-20**, Psionic Energy Dice ใช้ real-time ข้าม Damage/Control/Support/Utility ได้ทุกเทิร์น flip Adaptability-Under-Pressure)

## Purple Dragon Knight (Banneret) (SCAG 🕰️) — 2014 leader (เบากว่า Banneret)

Rallying Cry(lv3, Second Wind→ฮีล ally 3 ตัว)+Inspiring Surge(lv10, Action Surge→ally free reaction atk)+Bulwark(lv15, Indomitable→ally reroll แต่จำกัด Int/Wis/Cha)

- **Support**: D(1-2)→**S(3-20**, 3 กลไกทีมพร้อมกัน แม้เบากว่า Banneret เล็กน้อยก็ยังถึงเกณฑ์ multi-mechanism-stack)
- **Utility**: D(1-2)→**C(3-20**, Royal Envoy หลุด floor — narrow)

## Rune Knight (TCE 🕰️) — giant rune warrior

⚠️ รายละเอียด Rune เฉพาะตัว (Cloud/Fire/Frost/Hill/Stone/Storm) ไม่ครบ

Giant's Might(lv3, bonus-action dmg-die-upgrade+ขยายร่าง)+Runic Shield(lv7, reaction reroll ผู้โจมตี ally)

- **Control**: D(1-2)→**B(3-20**, Rune ธีม Frost/Storm บ่งชี้ control option — ให้คะแนนระมัดระวังตามระบบเดิม)
- **Support**: D(1-2)→**B(7-20**, Runic Shield หลุด floor)
- **Utility**: D(1-2)→**C(3-20**, smith's tools+ภาษา Giant หลุด floor — narrow/ข้อมูลไม่ครบ)

## Samurai (XGE 🕰️) — bushido duelist

Fighting Spirit(lv3, bonus-action Advantage-ทุกการโจมตี+temp-HP)+Rapid Strike(lv15)+Strength before Death(lv18)+Tireless Spirit(lv10)

- **Utility**: D(1-2)→**C(3-20**, Bonus Proficiency หลุด floor — narrow)
- ไม่มี delta อื่น (Damage/Survivability/AE old-score+1 ล้วนเป็น reinforcement ของ Advantage/temp-HP ที่ above อยู่แล้ว)

---

## สรุปเกรดที่ Lv20 (baseline + 21 subclass)

| Subclass | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | S | C | D | A | S | D | A |
| Arcane Archer | S | C | D | A | S | **C** | A |
| Banneret | S | C | **S** | A | S | **C** | A |
| Battle Master | S | **B** | **A** | A | S | **C** | **S** |
| Blade Breaker | S | **B** | D | A | S | D | A |
| Bone Knight | S | C | D | **S** | S | **C** | A |
| Brawler | S | **B** | D | A | S | **C** | A |
| Bulwark Warrior | **S**(from lv7) | **B** | D | **S** | S | D | A |
| Cavalier | **S**(from lv3) | **A** | **B** | A | **S**(lv18) | **C** | A |
| Celestial Lancer | **S**(from lv10) | C | **B** | A | S | **C** | A |
| Champion | S | C | D | A | S | D | A |
| Corsair | S | **C** | D | A | S | **C** | A |
| Dungeoneer | S | C | D | **S** | S | **B** | A |
| Echo Knight | **S**(from lv3) | C | **B** | A | S | **B** | A |
| Eldritch Knight | S | **A** | D | A | S | **A** | **S** |
| Living Crucible | S | C | D | A | S | **C** | A |
| Mage Hand Magus | **S**(from lv10) | **A** | D | A | S | **A** | A |
| Nightwatcher | S | **B** | **A** | A | S | **A** | A |
| Psi Warrior | **S**(from lv3) | **B** | **A** | **S** | S | **A** | **S** |
| Purple Dragon Knight | S | C | **S** | A | S | **C** | A |
| Rune Knight | S | **B** | **B** | A | S | **C** | A |
| Samurai | S | C | D | A | S | **C** | A |

*(Damage/AE คอลัมน์แสดงเกรด lv20 ทุกตัว = S เพราะ baseline เองแตะ S ที่ lv20 อยู่แล้ว — "S(from lvN)" หมายถึง onset เร็วกว่าที่ระบุ)*

---

## ข้อค้นพบเบื้องต้น

1. **Champion เป็น subclass เดียวใน 21 ตัวที่ 0 delta เต็ม** — ทุกกลไก (crit-range expansion, Survivor's death-save package) เสริมมิติที่ above อยู่แล้วจาก baseline's outlier-tier Damage/Survivability/AE โดยตรง ไม่เปิดมิติใหม่เลย — สอดคล้องกับที่ระบบเดิมเรียกว่า "แก้จุดอ่อนน้อยที่สุดในกลุ่ม" (Champion คือ "เรียบง่ายที่สุด" ของคลาสจริงๆ)
2. **Versatility ขยับได้ 3 ครั้ง (Battle Master/Eldritch Knight/Psi Warrior) — ครั้งแรกในชั้น 2 นับตั้งแต่ Channeler** เพราะ Fighter's baseline Versatility หยุดที่ A ไม่ใช่ S เหมือน 4 คลาสก่อนหน้า (Cleric/Craftsman/Dancer/Druid) — เปิดช่องให้ subclass ที่ flip Adaptability-Under-Pressure จริง (per-turn resource flexibility) ดันทะลุไปถึง S ได้
3. **Utility floor รั่วที่สุดในระบบ — 18/21 subclass หลุด (86%)** สูงกว่า Cleric(0% domain ไม่มี floor)/Craftsman(ไม่มี floor)/Dancer(?)/Druid(ไม่มี floor) เพราะ Fighter baseline Utility=0 เต็มจริงๆ (ไม่มี skill proficiency พิเศษแม้แต่ตัวเดียว) ทำให้แม้แต่ skill-proficiency-เดี่ยวก็หลุด floor ได้ (C) — Bulwark Warrior/Blade Breaker/Champion เป็น 3 ตัวเดียวที่ไม่หลุด (ยืนยันชัดว่า =0 จริง)
4. **Psi Warrior เป็น subclass เดียวที่ได้ delta ครบ 6 ใน 7 axis** (ขาดแค่ Damage-onset-เร็วสุด ซึ่งจริงๆก็ได้เหมือนกัน — เกือบครบทุก axis) ตรงกับที่ระบบเดิมให้ Overall สูงสุดร่วมกับ Battle Master (S) — Guarded Mind (lv10) เป็นตัวอย่างที่สะอาดที่สุดของ "1 feature flip 2 มิติพร้อมกัน" (Mitigation+Debuff Resistance) ในไฟล์นี้
5. **Survivability S เกิด 4 ครั้งผ่านกลไกที่ตรงกับตัวอย่างเพดานของ Anchor เองโดยตรง** (Dungeoneer's Avoidance=Evasion ที่ Anchor อ้างชื่อ Rogue/Monk/Dancer ไว้แล้ว) — ยืนยันว่าตัวอย่างเพดานใน Anchor ใช้ตรวจสอบ subclass ข้ามคลาสได้จริงสม่ำเสมอ
6. **Damage early-S เกิด 6/21** (Bulwark Warrior/Cavalier/Celestial Lancer/Echo Knight/Mage Hand Magus/Psi Warrior) แม้ baseline's Damage old-score จะสูงอยู่แล้ว (8/10) — มีแค่กลไก AoE-nova/extra-attack-family/parallel-attack ที่แท้จริงเท่านั้นที่ผ่านเกณฑ์ ส่วน 13 subclass ที่มี old-score=9 (rider ธรรมดา) ไม่ผ่าน — สัดส่วนใกล้เคียง Dancer(5/14)/Druid(5/17)
