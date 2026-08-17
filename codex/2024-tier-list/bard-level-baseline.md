# Bard — Class Baseline (Level-Indexed, 2024)

**ชั้น**: 1 (Class Baseline) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — เทียบ Bard เปล่าๆ (ไม่นับ Bard College subclass feature ใดๆ ที่ lv3/6/14) กับ Anchor Rubric ทุกเลเวล 1-20
**ที่มาข้อมูล**: `src/data/5etools/official/class/class-bard.json` (entry `source: "XPHB"`, `edition: "one"`) — `classFeature` + `classTableGroups` (Bardic Die/Cantrips/Prepared Spells/Spell Slots) ทั้งหมด ยืนยันจากไฟล์จริง ไม่ใช่ความจำ
**รูปแบบตาราง**: Compact grade+เหตุผล (Lv | Grade | เหตุผล) — ตามฟอร์แมตที่ยืนยันแล้วตั้งแต่ Alchemist/Artificer/Sacred Knight/Barbarian
**สถานะ**: ✅ เสร็จ 7/7 axis (คลาสที่ 5 ของชั้น 1 — **full caster ตัวแรกในชั้นนี้**)

⚠️ **ใช้ methodology ที่ยืนยันแล้วจาก Artificer (2026-08-16)**: **spell-list membership** (คลาสไหนได้สเปลล์ตัวไหน) ใช้ความรู้ทั่วไปของเกม เพราะไม่มีไฟล์ข้อมูลไหนในโปรเจกต์เก็บ field `classes`/`fromClassList` ไว้เลย — แต่**ตัวเลข/mechanic ของสเปลล์เอง** (dice/duration/save type) ยืนยันจาก `spells-xphb.json` เสมอ, และ **Magnitude ของคาสเตอร์ (cantrip DPR)** ใช้สูตรอ้างอิงเดียวกับ Anchor's generic full-caster cantrip track (Fire-Bolt-style: 1d10→2d10@5→3d10@11→4d10@17, ไม่บวก mod) เพื่อเทียบข้ามคลาสได้ตรง แม้ Bard's จริงจะใช้ Vicious Mockery (d4 Psychic, save-based ไม่ใช่ attack-roll, มี rider disadvantage-การโจมตีครั้งถัดไป) ก็ตาม — บันทึกความต่างไว้เป็น modifier แยกต่างหาก ไม่ปนกับ Magnitude หลัก

---

## สรุป Chassis

HD **d8** (ตรงกับ peer median เป๊ะ), full caster progression (slot cadence ตรงกับ Anchor's peer benchmark ทุกจุด — ยืนยันจาก `classTableGroups`), save prof DEX+CHA, armor light เท่านั้น, **Loadout Flexibility = tier "ต่ำ"** (ยืนยันจาก `class-bard.json` text "Changing Your Prepared Spells: Whenever you gain a Bard level, you can replace one spell..." — ตรงกับ Sorcerer/Warlock เป๊ะ, ตรงกับตารางที่ Anchor เขียนไว้แล้วด้วย)

| Lv | Bardic Die | Cantrips รู้ | Prepared รู้ | Slot สูงสุด | Milestone อื่น |
|---|---|---|---|---|---|
| 1 | d6 | 2 | 4 | 1 | Bardic Inspiration (Bonus Action, CHA mod uses/Long Rest), Spellcasting |
| 2 | d6 | 2 | 5 | 1 | **Expertise (×2 skill), Jack of All Trades** |
| 3 | d6 | 2 | 6 | 2 | (Subclass gate — ไม่นับ) |
| 4 | d6 | 3 | 7 | 2 | ASI/Feat (ไม่นับตาม convention) |
| 5 | d8 | 3 | 9 | 3 | **Font of Inspiration (regain BI ทุก Short Rest + แลก spell slot→BI ฟรีไม่เสีย action)** |
| 6 | d8 | 3 | 10 | 3 | (Subclass feature — ไม่นับ) |
| 7 | d8 | 3 | 11 | 4 | **Countercharm (Reaction, reroll save Charmed/Frightened + advantage รอบ 30ft)** |
| 8 | d8 | 3 | 12 | 4 | ASI/Feat |
| 9 | d8 | 3 | 14 | 5 | **Expertise รอบ 2 (×2 skill เพิ่ม, รวม 4)** |
| 10 | d10 | 4 | 15 | 5 | **Magical Secrets (ยืม prepared spell จาก Cleric/Druid/Wizard list ได้)** |
| 11 | d10 | 4 | 16 | 6 | ไม่มีจุดเปลี่ยน |
| 12 | d10 | 4 | 16 | 6 | ASI/Feat |
| 13 | d10 | 4 | 17 | 7 | ไม่มีจุดเปลี่ยน |
| 14 | d10 | 4 | 17 | 7 | (Subclass feature — ไม่นับ) |
| 15 | d12 | 4 | 18 | 8 | ไม่มีจุดเปลี่ยน |
| 16 | d12 | 4 | 18 | 8 | ASI/Feat |
| 17 | d12 | 4 | 19 | 9 | ไม่มีจุดเปลี่ยน |
| 18 | d12 | 4 | 20 | 9 | **Superior Inspiration (regain BI ถึง 2 ตอนทอย Initiative)** |
| 19 | d12 | 4 | 21 | 9 | Epic Boon (ไม่นับ) |
| 20 | d12 | 4 | 22 | 9 | **Words of Creation (PWH+PWK ติดตัวฟรีตลอด, ยิง 2 เป้าได้ถ้าอยู่ในระยะ 10ft)** |

---

## Damage

**Primary**: Magnitude (DPR) — ใช้สูตรคาสเตอร์อ้างอิงเดียวกับ Anchor (ไม่ใช่ Vicious Mockery จริง) เพื่อเทียบข้ามคลาสตรง

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | cantrip 1d10(ไม่มี mod)=**~6** ตรงเป๊ะกับ peer — modifier: **Resistance-proofing=above** (Vicious Mockery จริงเป็น Psychic เสมอตั้งแต่ lv1 ต่างจาก peer's Fire Bolt ที่เป็น Fire จนกว่าจะ pivot ชนิดดาเมจตอน lv11 ตาม Anchor) แต่ 1/4 ไม่พอขยับเกรด คงที่ B |
| 2-4 | =lv1 | Expertise/JOAT เป็น Utility ไม่กระทบ Damage |
| 5 | =lv1 | cantrip die bump: 2d10=**~11** ตรง peer — Font of Inspiration เป็น Support/Action Economy |
| 6-9 | =lv5 | ไม่มีจุดเปลี่ยน |
| 10 | =lv5 | Magical Secrets เปิดสเปลล์จาก Cleric/Druid/Wizard list — เป็น Breadth/Versatility ไม่ใช่ Magnitude โดยตรง (ยังต้องใช้ prepared-slot เดิม) |
| 11 | =lv5 | cantrip die bump: 3d10=**~17** ตรง peer (จุดที่มาร์เชียล/คาสเตอร์บรรจบกันตาม Anchor) |
| 12-16 | =lv11 | ไม่มีจุดเปลี่ยน |
| 17 | =lv11 | cantrip die bump: 4d10=**~22** ตรง peer (แซงมาร์เชียล peer มาตรฐานแล้วตาม Anchor) |
| 18-20 | =lv17 | Words of Creation (lv20) จัดอยู่ใน Control axis (PWK เป็น Severity/instant-kill ไม่ใช่ sustained Magnitude) — ไม่กระทบ Damage โดยตรง |

**สรุปเกรด**: B(1-20) แบนราบตลอดอาชีพ — **ตรงกับ Anchor's peer เป๊ะทุกจุด** เพราะ Bard เป็นคาสเตอร์ตัวแทนที่ Anchor's cantrip track อ้างอิงอยู่แล้ว มี modifier เดียว (Resistance-proofing จาก Psychic type ถาวร) ที่ไม่พอขยับเกรดตลอดทั้ง 20 เลเวล

---

## Control

**Primary**: Severity — Bard's spell list (ตามความรู้ทั่วไป) มี hard-CC ตัวหลักของเกมครบเกือบทั้งหมด (Sleep, Hold Person, Hypnotic Pattern, Hold Monster, Mass Suggestion ล้วนเป็นสเปลล์ในลิสต์ Bard เอง) **ตรงกับ Anchor's full-caster benchmark แบบตรงตัวที่สุดในบรรดา 5 คลาสที่ทำมา** เพราะ Anchor เองอ้างอิงจากสเปลล์ full-caster ทั่วไป

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Sleep(slot1) ตรง peer เป๊ะ (Tier4/Incap→Unconscious) — modifier: **Frequency=above** (Vicious Mockery ให้ minor debuff แบบ at-will ไม่จำกัดครั้ง/วัน ซ้อนบน slot-based CC หลัก ซึ่ง peer ไม่มี) แต่ 1/5 ไม่พอขยับ (ต้องการ ≥3/5 สำหรับ 6-มิติ) คงที่ B |
| 2 | =lv1 | ไม่มี slot ใหม่ |
| 3-4 | =lv1 | Hold Person(slot2) ตรง peer เป๊ะ |
| 5-6 | =lv1 | Hypnotic Pattern(slot3) ตรง peer เป๊ะ |
| 7-8 | =lv1 | Banishment เป็นสเปลล์ Cleric/Paladin/Warlock/Wizard list — Bard ไม่มีในลิสต์ตัวเองที่ lv7 (ยังไม่มี Magical Secrets) แต่มี **Dominate Person**(ทางเลือกเทียบเท่าจาก Bard's own list จริง, Tier3 Charmed) ทดแทนได้ใกล้เคียง — คงที่ B |
| 9-10 | B | Hold Monster(slot5) ตรง peer เป๊ะ (lv9) — **Magical Secrets ปลดล็อก (lv10)**: เปิดทางเลือกสเปลล์ Control จาก Cleric/Druid/Wizard list เพิ่ม (เช่น Banishment แบบเต็มตัว) → **Breadth=above** เพิ่มอีก 1 modifier = Frequency+Breadth = 2/5 ยังไม่ถึง ≥3/5 คงที่ B |
| 11-16 | =lv10 | Mass Suggestion(slot6, lv11) ตรง peer เป๊ะ (จุดเด่น Concentration-Risk=ไม่มี ที่ peer มีอยู่แล้ว ไม่ใช่โบนัสพิเศษของ Bard) |
| 17 | =lv10 | Power Word Stun/Kill(slot8-9) ตรง peer เป๊ะ — modifier tally เดิม (2/5) |
| 18-19 | =lv17 | ไม่มีจุดเปลี่ยน |
| 20 | B ⚠️ | **Words of Creation** — Power Word Kill ติดตัว**ฟรีตลอด**(ไม่กินโควตา prepared spell) + ยิง**2 เป้าพร้อมกัน**ถ้าอยู่ในระยะ 10ft (peer's benchmark เดิมเป็น single-target เท่านั้น) — Breadth เพิ่มขึ้นจริง (ตอนนี้นับเป็นข้อได้เปรียบเฉพาะ Bard ไม่ใช่ peer ทั่วไปแล้ว) แต่ยังคงแค่ 2/5 modifier ที่ above (Frequency+Breadth) **ไม่ถึงเกณฑ์ ≥3/5 ตามกฎนับจริง** แม้จะรู้สึกแรงกว่าตัวเลขบอก — คงที่ B ตามกฎ ไม่ปรับตามความรู้สึก |

**สรุปเกรด**: B(1-20) แบนราบตลอดอาชีพ — **Control ที่ดีที่สุดในบรรดา 5 คลาสที่ทำมา** (เทียบ Alchemist/Artificer/Sacred Knight/Barbarian ที่ทุกตัวติด C หรือต่ำกว่า) เพราะ Bard คือคาสเตอร์เต็มตัวที่ Anchor's benchmark อ้างอิงอยู่แล้วโดยตรง — lv20's Words of Creation เป็น close-call ที่ตัวเลขไม่ถึงเกณฑ์ขยับแม้จะดูแรงกว่าที่กราฟบอก (บันทึกไว้ตรงๆ ไม่ปัดขึ้นตามความรู้สึก)

---

## Support

**Primary**: Magnitude — ฮีล/บัฟสเปลล์ตรง peer เป๊ะ (สูตรเดียวกับ Anchor) แต่ **Bardic Inspiration เป็นทรัพยากรคู่ขนานที่ Anchor ไม่เคยโมเดลไว้เลย** — ให้ ally ทอย d6(→d8@5→d10@10→d12@15) เสริม d20 test ที่พลาดได้ภายใน 1 ชม. ผ่าน Bonus Action ไม่เสีย spell slot

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Healing Word/Cure Wounds ตรง peer เป๊ะ — modifier: **Proactive=above**(Bardic Inspiration เป็นเครื่องมือ proactive อีกชิ้นที่ไม่ผูก slot economy), **Concentration Risk=above**(BI เองไม่ต้อง concentration เลย) = 2/5 ยังไม่ถึง ≥3/5 คงที่ B |
| 2-4 | =lv1 | ไม่มีจุดเปลี่ยน (Expertise/JOAT เป็น Utility) |
| 5 | A | **Font of Inspiration** — BI regain ทุก Short Rest (ไม่ใช่แค่ Long Rest) + **แลก spell slot→BI 1 ครั้งได้ฟรีไม่เสีย action เลย** → **Frequency=above** เพิ่ม = Proactive+ConcentrationRisk+Frequency = **3/5 ถึงเกณฑ์ ≥3/5 พอดี** ขยับขึ้น 1 ขั้น B→A |
| 6 | =lv5 | ไม่มีจุดเปลี่ยน |
| 7 | =lv5 | **Countercharm** — Reaction ป้องกันปาร์ตี้จาก Charmed/Frightened (reroll+advantage) เสริม Proactive/Reactive dim ที่ above อยู่แล้วให้แน่นขึ้น ไม่ใช่มิติใหม่ ไม่เปลี่ยนเกรด |
| 8-9 | =lv5 | ไม่มีจุดเปลี่ยน |
| 10 | =lv5 | **Magical Secrets** — ดึงสเปลล์ heal/buff ที่ Bard's own list ไม่มี (เช่น Mass Cure Wounds/Heal/Holy Aura จาก Cleric list) → Breadth=above เพิ่ม (4/5 above แล้ว) แต่ modifier ขยับได้สูงสุด+1 ขั้นเท่าเดิม (กฎ cap) คงเพดาน A |
| 11-19 | =lv10 | ไม่มีจุดเปลี่ยน |
| 20 | S | **Words of Creation** — Power Word Heal ติดตัวฟรีตลอด (ไม่กินโควตา prepared) + ฮีล **2 เป้าพร้อมกัน**ถ้าอยู่ในระยะ 10ft — Primary(Magnitude) เองตอนนี้เหนือ peer's benchmark เดิม (peer=เลือกได้ 1 อย่างระหว่างกว้างสุด vs เดี่ยวการันตี, Bard ได้ทั้งคู่พร้อมกันฟรี) รวมกับ modifier 4/5 ที่ above อยู่แล้ว = **หลายมิติเหนือ peer พร้อมกันชัดเจนระดับ outlier** ตามนิยาม S |

**สรุปเกรด**: B(1-4) → A(5-19) → S(20) — Bardic Inspiration เป็นทรัพยากรคู่ขนานที่ดัน Bard เหนือ peer full-caster ทั่วไปตั้งแต่ lv5 (Font of Inspiration) และจบด้วย capstone S ที่ lv20 ต่างจาก Control axis ที่ Words of Creation ไม่พอขยับเกรด (Support's modifier tally เดิมสูงกว่าอยู่แล้วตั้งแต่ lv5 ทำให้ lv20 เป็นก้าวสุดท้ายที่พอดีข้ามเกณฑ์ ไม่ใช่ก้าวเดี่ยวโดดๆ แบบ Control)

---

## Survivability

**Primary**: Effective HP — d8 ตรง peer เป๊ะ (ไม่เหนือ/ไม่ต่ำกว่า)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Effective HP=11 ตรง peer(B) — modifier: Save Reliability=match(2 prof มาตรฐาน), Mitigation=D/below, Debuff Resistance=D/below(ยังไม่มี Countercharm), Death Prevention=D/below = **3/4 below ≥2/4** ขยับลง 1 ขั้น B→C |
| 2-6 | =lv1 | ไม่มีจุดเปลี่ยน (Expertise/JOAT/Font of Inspiration ไม่กระทบ 4 มิตินี้) |
| 7 | C | **Countercharm ปลดล็อก** — Debuff Resistance→above (Reaction reroll save Charmed/Frightened + advantage ให้ตัวเอง/ปาร์ตี้ 30ft) — tally ใหม่: above=1(DebuffResistance), below=2(Mitigation,DeathPrevention) ยัง **≥2/4 below ชนะอยู่ดี** (Countercharm 1 มิติไม่พอหักล้าง 2 มิติที่ขาด) คงที่ C |
| 8-20 | =lv7 | ไม่มีจุดเปลี่ยนเพิ่ม (Magical Secrets/Superior Inspiration/Words of Creation ไม่กระทบ 4 มิตินี้โดยตรง — Words of Creation's PWH ช่วยปาร์ตี้ได้จริงแต่เป็น Support ไม่ใช่ Death-Prevention ของตัวเอง) |

**สรุปเกรด**: C(1-20) แบนราบตลอดอาชีพ — รูปแบบเดียวกับ Barbarian's Action Economy (1 modifier แรง แต่แพ้ 2 modifier ที่ขาดไปตามกฎนับจำนวน) — Countercharm เป็นฟีเจอร์ดีจริงแต่ไม่พอยกเกรดคนเดียว

---

## Action Economy

**Primary**: Attack-Action Efficiency — **ประเด็น**: Vicious Mockery (cantrip หลักของ Bard จริง) เป็น save-based ไม่ใช่ attack-roll แต่ Bard มี simple weapon proficiency (จาก startingProficiencies) จึงยังมี "attack routine พื้นฐาน" แบบเดียวกับ Alchemist — ใช้หลักการเดียวกัน (**C ไม่ใช่ D**, ยืนยันจาก Anchor's Primary-dimension table ที่เขียนไว้ตอนทำ Alchemist)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Primary=C (attack routine พื้นฐานมี แต่ต่ำกว่า peer's 2-attack, เหมือน Alchemist) — modifier: **Bonus Action Value=above** (**Bardic Inspiration เป็น Bonus-Action outlier ตั้งแต่ lv1 — เทียบเท่า Barbarian's Rage ที่ Anchor เองยกเป็นตัวอย่างเด่นสุด แต่ Anchor ยังไม่เคยบันทึก Bard ไว้ในจุดนี้**) = 1/4 ไม่พอขยับ (ต้องการ ≥2/4) คงที่ C |
| 2-4 | =lv1 | Expertise/JOAT เป็น Utility |
| 5 | B | **Font of Inspiration** — แลก spell slot→BI use **ไม่เสีย action เลย** → **Resource-to-Action Conversion=above** (แรงกว่า peer's Quickened Spell ที่ยังต้องเสีย bonus action) = BonusAction+ResourceConversion = **2/4 ถึงเกณฑ์** ขยับขึ้น 1 ขั้น C→B |
| 6 | =lv5 | ไม่มีจุดเปลี่ยน |
| 7 | B | **Countercharm** — Reaction Value=above เพิ่ม (3/4 above แล้ว: BonusAction+ResourceConversion+Reaction) แต่ modifier ขยับได้สูงสุด+1 ขั้นเท่าเดิม (Primary=C ขยับได้แค่ถึง B เท่านั้นตามกฎ cap) คงเพดาน B |
| 8-17 | =lv7 | ไม่มีจุดเปลี่ยน |
| 18 | =lv7 | Superior Inspiration เสริม Bonus Action Value ที่ above อยู่แล้วให้แน่นขึ้น (regain BI ถึง 2 ตอน Initiative) ไม่ใช่มิติใหม่ |
| 19-20 | =lv18 | ไม่มีจุดเปลี่ยน |

**สรุปเกรด**: C(1-4) → B(5-20) — Bard เป็นคาสเตอร์ตัวแรกที่ทำได้ดีกว่า Alchemist/Artificer ในแกนนี้ (ทั้งคู่จบที่ C/สลับ B-C) เพราะ Font of Inspiration's "แลก slot ฟรีไม่เสีย action" แรงกว่า Metamagic's Quickened Spell ที่ peer ใช้เป็นมาตรฐานเปรียบเทียบ

---

## Utility

**Primary**: Magnitude — สเปลล์ Reveal Info/Solve Problem ตรง peer เป๊ะ (สูตรเดียวกับ Anchor) — **Skill-Check Layer เป็นจุดเด่นของ Bard โดยตรง เพราะ Anchor เองอ้าง Bard เป็นตัวอย่าง milestone ของมิตินี้ถึง 2 จุด (lv2, lv9)**

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | B | Detect Magic-เทียบเท่า ตรง peer เป๊ะ — Skill-Check Layer ยังไม่ active (Expertise ยังไม่มา) คงที่ B |
| 2 | B | **Jack of All Trades + Expertise ปลดล็อก** — **ตรงกับ milestone ที่ Anchor เองเขียนไว้ที่ lv2 พอดี** ("จุดเปลี่ยน — Bard Expertise (×2) + Jack of All Trades") → Skill-Check Layer=above = 1/4 ไม่พอขยับ (ต้องการ ≥2/4) คงที่ B |
| 3-6 | =lv2 | ไม่มีจุดเปลี่ยน |
| 7-8 | =lv2 | Countercharm เป็น Survivability/Action Economy ไม่กระทบ Utility |
| 9 | =lv2 | **Expertise รอบ 2** — **ตรงกับ milestone ที่ Anchor เขียนไว้ที่ lv9 พอดีอีกครั้ง** ("จุดเปลี่ยน — Bard/Ranger ตามทัน Rogue") — Skill-Check Layer ยังนับเป็น 1 modifier เดิม (ความลึกเพิ่มแต่ไม่ใช่มิติใหม่) คงที่ B |
| 10 | A | **Magical Secrets** — เปิดสเปลล์ utility จาก Cleric/Druid/Wizard list เพิ่ม (breadth ของการแก้ปัญหากว้างขึ้นจริง นอกเหนือจาก Bard's own list) → **Breadth=above** เพิ่ม = SkillCheckLayer+Breadth = **2/4 ถึงเกณฑ์** ขยับขึ้น 1 ขั้น B→A |
| 11-20 | =lv10 | ไม่มีจุดเปลี่ยนเพิ่ม (Words of Creation เป็น Damage/Control/Support ไม่กระทบ Utility) |

**สรุปเกรด**: B(1-9) → A(10-20) — Bard เป็นคลาสที่ Anchor's Utility milestone table cite ตรงชื่อถึง 2 จุด (lv2, lv9) ยืนยันว่า Bard เป็น "Utility generalist" ตัวจริงคู่กับ Rogue (Anchor's finding#2 เรียก Rogue ว่า "Utility specialist ที่ไม่มีสเปลล์" — Bard คือฝั่งตรงข้ามที่ได้ทั้งสเปลล์เต็มรูปแบบและ Skill-Check Layer พร้อมกัน)

---

## Versatility

**Primary**: Loadout Flexibility — tier "ต่ำ" (สลับ 1 ตัว/เลเวลอัพเท่านั้น, ยืนยันจาก text "Whenever you gain a Bard level, you can replace one spell") = **C** ตรงๆ ตามการแม็ปที่ยืนยันแล้ว (สูง=A, กลาง=B, ต่ำ=C)

| Lv | Grade | เหตุผล |
|---|---|---|
| 1 | C | Primary=C (tier "ต่ำ") — modifier: **Cross-Axis Coverage=above** (kit ครอบคลุม Damage+Control+Support+Action Economy = 4/6 axis ตั้งแต่ lv1 ผ่าน cantrip+prepared spell+Bardic Inspiration พร้อมกัน เกินมาตรฐาน peer's "~1-2 axis") = 1/4 ไม่พอขยับ (ต้องการ ≥2/4) คงที่ C |
| 2-4 | =lv1 | Expertise/JOAT เป็น Utility ไม่ใช่ Versatility dimension โดยตรง |
| 5 | B | **Font of Inspiration** — แลก spell slot→BI ได้ = **Resource Fungibility=above** (ตัวอย่าง fungibility ตรงตามที่ Anchor นิยามไว้ — 1 resource ซื้อผลอีกประเภทได้) = CrossAxis+ResourceFungibility = **2/4 ถึงเกณฑ์** ขยับขึ้น 1 ขั้น C→B |
| 6-9 | =lv5 | ไม่มีจุดเปลี่ยน |
| 10 | =lv5 | **Magical Secrets** — เพิ่มความกว้างของ Adaptability (เลือกสเปลล์ได้จากหลาย list มากขึ้น) → Adaptability=above เพิ่ม (3/4 above แล้ว) แต่ modifier ขยับได้สูงสุด+1 ขั้นเท่าเดิม (Primary=C ขยับได้แค่ถึง B ตามกฎ cap) คงเพดาน B |
| 11-20 | =lv10 | ไม่มีจุดเปลี่ยนเพิ่ม |

**สรุปเกรด**: C(1-4) → B(5-20) — Bard ไม่ตกไปที่ D เหมือนที่กฎทั่วไปของ marchial-ไม่มีสเปลล์กำหนดไว้ (เพราะมีสเปลล์จริง, tier "ต่ำ" ให้ C โดยตรง) แต่ก็ไม่ไต่ถึง A เหมือน Artificer (tier "สูง") — Font of Inspiration's fungibility คือตัวเดียวที่ดันเกรดขึ้นได้ตลอดอาชีพที่เหลือ

---

## สรุปรวม 7 axis

| Axis | เกรดตามเลเวล |
|---|---|
| Damage | B(1-20) |
| Control | B(1-20) |
| Support | B(1-4) → A(5-19) → S(20) |
| Survivability | C(1-20) |
| Action Economy | C(1-4) → B(5-20) |
| Utility | B(1-9) → A(10-20) |
| Versatility | C(1-4) → B(5-20) |

**ข้อค้นพบสำคัญ**:
1. **Bard เป็นคลาสแรกที่ไม่มี axis ไหนต่ำกว่า C เลยตลอดทั้ง 20 เลเวล** — ต่างจาก Alchemist/Artificer/Sacred Knight/Barbarian ที่ทุกตัวมีอย่างน้อย 1 axis เป็น D บางช่วง สะท้อนความเป็น full-caster ที่ Anchor's benchmark เองอ้างอิงอยู่แล้วโดยตรง ทำให้ไม่มีจุดอ่อนเชิงโครงสร้างแบบคลาสอื่น
2. **Damage/Control เป็น B แบนราบสนิททั้ง 20 เลเวล** — ครั้งแรกที่ 2 axis พร้อมกันจบที่เกรดเดียวตลอดอาชีพแบบไม่มีจุดเปลี่ยนเกรดเลยแม้แต่ครั้งเดียว (ต่างจาก Barbarian's Support/Utility ที่เป็น D แบนราบ — นี่คือ "B แบนราบ" ซึ่งเป็นรูปแบบใหม่ สะท้อนว่า Bard แค่ "ตรง peer เป๊ะ" ไม่ใช่ "ไม่มีกลไกเลย")
3. **Bardic Inspiration เป็นทรัพยากรคู่ขนานที่ Anchor ไม่เคยโมเดลไว้เลยตอนออกแบบ** — ให้เครดิต Support(lv5 Font of Inspiration)/Action Economy(lv5-7)/Versatility(lv5) พร้อมกันหลาย axis จากฟีเจอร์เดียว เป็นตัวอย่างที่ชัดที่สุดของ "1 มิติเด่นดันหลาย axis พร้อมกัน" ในชั้น 1 จนถึงตอนนี้ — ควรพิจารณาเพิ่ม Bard's Bardic Inspiration เป็นตัวอย่างอ้างอิงใน Anchor Rubric เองในอนาคต (ยังไม่ได้แก้ตอนนี้)
4. **lv20's Words of Creation ให้ผลต่างกันชัดเจนระหว่าง Support (S) กับ Control (คงที่ B)** แม้เป็นฟีเจอร์เดียวกันที่ให้ทั้ง Power Word Heal และ Power Word Kill พร้อมกัน — เพราะ Support's modifier tally สะสมมาสูงกว่าตั้งแต่ lv5 อยู่แล้ว (พอดีข้ามเกณฑ์ S ที่ lv20) ในขณะที่ Control's tally ยังต่ำกว่าเกณฑ์อยู่ (2/5 ไม่ถึง 3/5) — ตัวอย่างที่ดีว่า "ฟีเจอร์เดียวกัน คนละ axis ให้ผลต่างกันได้จริงตามกฎนับจำนวน ไม่ใช่ตามความรู้สึกว่าฟีเจอร์นั้น 'แรง' แค่ไหน"
5. **Skill-Check Layer ยืนยันบทบาท Bard ตามที่ Anchor เขียนไว้แล้วล่วงหน้าเป๊ะ** — milestone lv2/lv9 ที่ Anchor cite ชื่อ Bard ตรงๆ ทั้งคู่ตรงกับที่เกิดขึ้นจริงในไฟล์นี้ 100% (ครั้งแรกที่คลาสหนึ่งตรงกับ named-milestone ของ Anchor เป๊ะทุกจุดแบบนี้ ต่างจาก Barbarian ที่ Anchor cite "Relentless Rage" ตรงเป๊ะแค่จุดเดียว)
6. **Action Economy/Survivability/Versatility ทั้ง 3 axis มี pattern เดียวกัน**: modifier 1 ตัวแรงมาก (Bardic Inspiration/Countercharm) แต่ถูกจำกัดด้วยกฎ "ขยับได้สูงสุด+1 ขั้น" ไม่ว่าจะมี modifier above กี่ตัวเพิ่มขึ้นก็ตาม — เป็นรูปแบบที่เจอซ้ำหลายครั้งแล้วในชั้น 1 (Barbarian's Action Economy ก็เจอปัญหาคล้ายกันแต่ตรงข้ามทิศทาง — modifier below ชนะแทน) ยืนยันว่ากฎ cap "+1 ขั้นเท่านั้น" มีผลกระทบต่อผลลัพธ์จริงบ่อยกว่าที่คาดตอนออกแบบ Anchor