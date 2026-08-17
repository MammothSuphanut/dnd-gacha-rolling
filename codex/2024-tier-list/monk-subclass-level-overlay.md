# Monk — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Monk + subclass feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [monk-subclass-scorecard-2024.md](monk-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดครบทั้ง 21 ตัว — 8 native XPHB/GrimHollow/ValdaPlayerPack/Homebrew + 13 orphan 🕰️ จาก VSS/XGE/SCAG/TCE/FTD/PHB — 4 ตัวมีข้อมูลไม่ครบ: Ascendant Dragon/Four Elements ยังคงความระมัดระวังเดิม)
**Class Baseline อ้างอิง**: [monk-level-baseline.md](monk-level-baseline.md) — Damage B(1-5)→A(6-20) · Control D(1-4)→**A(5-20**, แข็งสุดในบรรดามาร์เชียล) · Support **D(1-20) flat** · Survivability C(1-2)→**A(3-20**, tally 4/4 เต็มตั้งแต่ lv14) · Action Economy C(1)→B(2)→A(3-20) · Utility **D(1-20) flat** (floor, นิยาม Anchor เข้มงวด — mobility ไม่นับ) · Versatility **D(1-20) flat** (floor rule, ไม่มีกลไกสลับ Flurry/Patient-Defense/Step-of-Wind เลย)
**รูปแบบตาราง**: Delta-only แบบย่อ (21 subclass)
**Subclass gate**: lv3/6/11/17 (ตาม chassis table, ต่างจากคลาสอื่นที่ใช้ lv3/6/10/14)
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก subclass**:
1. **Utility's floor เข้มงวดกว่าที่ old-system เคยให้เครดิต** — old-system นับ mobility (fly/climb/swim) เป็น Utility ได้ แต่ระบบใหม่ตาม Anchor's นิยามเข้มงวดไม่นับ (mobility = Survivability/Action-Economy-adjacent เท่านั้น) — ต้องกรอง feature ใหม่ทุกตัวเฉพาะ Reveal-Info/Solve-Problem จริงๆ (detection/illusion/utility-spell) เท่านั้น
2. **Versatility floor ต้องการ "กลไกสลับ" ที่ชัดเจน (ไม่ใช่แค่ตัวเลือกตอนสร้างตัว)** — คำว่า "สลับได้" (swap) ในคำอธิบายเดิมเป็นตัวชี้วัดสำคัญ พบแค่ 3 เคสที่ผ่านเกณฑ์ชัดเจน
3. **Action Economy ไม่มี subclass ไหนขยับได้เลยแม้แต่ตัวเดียว** แม้ old-score จะสูงถึง 9/10 ใน 12/21 ตัว — ทุกกลไกเป็นการเสริม Bonus-Action/Resource-Conversion ที่ above อยู่แล้ว ไม่มีตัวไหนให้ "extra full action" จริงที่จะ flip มิติที่ 4 (Extra-Action-Access) ได้
4. **Survivability tally เต็ม 4/4 ตั้งแต่ lv14 (เหมือน Gunslinger)** — ต้องพึ่ง exceptional-multi-mechanism-stack เท่านั้นถึงจะข้าม A ไป S ได้ พบ 4 เคส

---

## Warrior of Mercy (native XPHB)

Hand of Harm(lv3)+Hand of Healing(ฮีล ally ผ่าน Focus)+Physician's Touch(lv6)+Flurry of Healing and Harm(lv11)+Hand of Ultimate Mercy(lv17, free revive)

- **Support**: D(1-2)→A(3-16, Hand of Healing+Physician's Touch หลุด floor)→**S(17-20**, Hand of Ultimate Mercy's free-revive ซ้อนมิติที่ 2)

## Warrior of Shadow (native XPHB)

Shadow Step(lv3, bonus action teleport+advantage)+Cloak of Shadows(lv17, invisible+partial-incorporeal 1 นาที)+Darkvision/Minor Illusion/Darkness ฟรี(lv6)

- **Survivability**: A(3-16,=baseline)→**S(17-20**, Cloak of Shadows' partial-incorporeal เกินตัวอย่าง Mitigation ปกติในระบบ)
- **Utility**: D(1-2)→**B(3-20**, Darkvision+Minor Illusion+Darkness = genuine utility-spell access)

## Warrior of the Elements (native XPHB)

Elemental Burst(lv6, AoE 3×MA die)+Elemental Attunement(forced-move)+Elemental Epitome(lv17, resist ธาตุสลับได้)+Elementalism cantrip ฟรี

- **Damage**: A(3-5,=baseline)→**S(6-20**, Elemental Burst's AoE nova ผลัก Primary ก่อน baseline's เอง lv6-onset)
- **Utility**: D(1-2)→**C(3-20**, Elementalism cantrip หลุด floor — narrow)
- **Versatility**: D(1-2)→**B(3-20**, เลือกธาตุใหม่ได้อิสระต่อการใช้ = กลไกสลับจริง หลุด floor)

## Warrior of the Open Hand (native XPHB)

Open Hand Technique(lv3, เลือก Addle/Push/Topple ทุก Flurry)+Wholeness of Body(lv6)+Fleet Step(lv11)+Quivering Palm(lv17, delayed 10d12 Force)

- **Damage**: A(3-16,=baseline)→**S(17-20**, Quivering Palm = nova เดี่ยวใหญ่สุดในกลุ่ม)

## Warrior of Pride (GrimHollowPG24)

Assertive Attacker(lv3)+Bruised Ego(temp-HP ทุก Focus-use)+Ever Prideful(lv11, ยังมีสติที่ 0 HP ผ่าน Focus)+Egotistical(lv17)

- **Survivability**: A(3-10,=baseline)→**S(11-20**, Ever Prideful's "ยังมีสติ+ลงมือได้ที่ 0 HP" เกินกว่า Death-Prevention ปกติที่ above อยู่แล้ว — ระบบเดิมให้ full max 10/10)
- ไม่มี delta อื่น (Damage's old-score=9 เป็น conditional-rider reinforcement)

## Warrior of Regret (GrimHollowPG24)

Crushing Guilt(lv11, AoE 3×MA die psychic+prone)+Relive the Past(lv17, ตีเพิ่มจาก shade)+Aid Not Given(lv3)+The Road Not Traveled(lv6)

- **Damage**: A(3-10,=baseline)→**S(11-20**, Crushing Guilt's AoE+Relive the Past's extra-attack combo)
- **Support**: D(1-2)→**B(3-20**, Aid Not Given+Road Not Traveled 2 กลไกทีมพร้อมกัน)

## Warrior of the Leaden Crown (GrimHollowPG24)

Shatter/Hold Person/Hold Monster ผ่าน Focus(lv3)+Unsubtle Strike+Psychic Crush(lv11, Restrained)+Mage Hand/Levitate/Wall of Force

- **Control**: A(5-20,=baseline)→**S(3-20**, 3 กลไก control พร้อมกัน[Hold Person/Monster+forced-move+Restrained] — "ครบเครื่องที่สุดในกลุ่ม" ตามระบบเดิม, onset เร็วกว่า baseline's เอง lv5)
- **Utility**: D(1-2)→**B(3-20**, Mage Hand(no V/S)+Levitate+Wall of Force = utility-spell toolkit กว้าง)

## Warrior of the Street (native ValdaPlayerPack)

Combo(สะสม +2→+6)+Energy Blast(AoE)+K.O.(lv17, extra 3×MA die+incap)+Uppercut(lv3)+Guard Breaker

- **Damage**: A(3-16,=baseline)→**S(17-20**, K.O.'s extra-die+incap ซ้อนบน Combo+Energy Blast ที่ทำงานตั้งแต่ lv3)

## Way of the Bow (VSS 🕰️)

Soul Arrow(lv3)+Flurry of Arrows+Zen Archery(lv17)+Intercepting Shot(lv6)+Serenity of the Wind(lv11, blindsight ผ่าน ki)

- **Utility**: D(1-2)→**C(3-20**, Serenity of the Wind หลุด floor — detection เดี่ยวมิติ)
- ไม่มี delta อื่น (Damage's old-score=9 เป็น riders+reliability reinforcement)

## Way of the Flagellant (VSS 🕰️)

Penitent Lash(lv3)+Branding Palm+Scissorhand+Purity Through Pain(lv11)+Electroshock Strike

- **ไม่มี delta** — ทุกกลไกเป็น riders/reliability ที่ไม่ข้าม threshold ไหนเลย

## Way of the Four Fists (VSS 🕰️)

Flurry of Limbs(lv17, ตี 3 แทน 2)+Uncanny Dodge(lv11, ลดดาเมจครึ่งจากทุกชนิดดาเมจไม่จำกัดแค่ B/P/S)+Simian Swift+Nimbus(lv3)+Grasp of the Monkey

- **Survivability**: A(3-10,=baseline)→**S(11-20**, Uncanny Dodge's all-damage-type coverage เกิน baseline's Deflect Attacks ที่จำกัดแค่ B/P/S จนถึง lv13 — ระบบเดิมให้ full max 10/10)
- ไม่มี delta อื่น (Utility's Grasp of the Monkey/Nimbus = pure mobility ไม่นับตามนิยาม Anchor เข้มงวด)

## Way of the Mask (VSS 🕰️)

Heavyweight Champion(grapple ทุกขนาด+pin=restrain)+Choked Out(lv17, pin→unconscious ผ่าน ki)+Headbutt of Justice(lv3)

- **Control**: A(5-20,=baseline)→**S(3-20**, grapple-control ที่ "ทรงพลังที่สุดในกลุ่ม" ตามระบบเดิม — pin=Restrained+Choked-Out=Unconscious เป็น escalation Tier5)

## Way of the Rose (VSS 🕰️)

Colors of Love(lv11, เลือกออร่า Pink=Help-ฟรี/Red=extra-dmg-ally/White=temp-HP ตามสถานการณ์)+Blossom Burst(lv3)+Falling Petal Flurry+Wreathed in Thorns(lv17)

- **Support**: D(1-10,=baseline)→**A(11-20**, Colors of Love's 3-mode situational aura หลุด floor)
- **Versatility**: D(1-10,=baseline)→**B(11-20**, เลือกออร่าตามสถานการณ์ = กลไกสลับจริง)

## Way of the Ascendant Dragon (FTD 🕰️) — ⚠️ ข้อมูลไม่ครบ

Breath of the Dragon(lv3)+Wings Unfurled+Blindsight(lv17, Ascendant Aspect)

- **Utility**: D(1-2)→**C(3-20**, Blindsight หลุด floor — narrow, ข้อมูลไม่ครบ)
- ไม่มี delta อื่น

## Way of the Drunken Master (XGE 🕰️)

Redirect Attack(lv6)+Drunken Technique(free Disengage+speed)+Drunkard's Luck(lv11)+Intoxicated Frenzy(lv17, Flurry ตี 5 เป้าต่างกันแทน 2)

- **Damage**: A(3-16,=baseline)→**S(17-20**, Intoxicated Frenzy = multi-target expansion จริงของ Flurry)

## Way of the Kensei (XGE 🕰️)

Deft Strike+Sharpen the Blade(lv11)+Kensei's Shot+Unerring Accuracy(lv17)

- **ไม่มี delta** — ทุกกลไกเป็น riders/reliability ที่ไม่ข้าม threshold

## Way of the Long Death (SCAG 🕰️)

Hour of Reaping(lv6, AoE Frightened 30ft)+Touch of Death+Mastery of Death(lv11)+Touch of the Long Death(lv17, nova สูงสุด 20d10)

- **Damage**: A(3-16,=baseline)→**S(17-20**, Touch of the Long Death = nova เดี่ยวสูงสุดในกลุ่ม)

## Way of the Sun Soul (XGE 🕰️)

Radiant Sun Bolt(lv3)+Searing Arc Strike(lv6, free Burning-Hands-as-bonus-action)+Searing Sunburst(lv11, AoE)+Sun Shield(lv17)

- **Damage**: A(3-10,=baseline)→**S(11-20**, Searing Sunburst's AoE ซ้อนบน Searing Arc Strike's free-spell-channel ที่ทำงานตั้งแต่ lv6)

## Way of the Astral Self (TCE 🕰️)

Arms/Visage/Body ผ่าน ki(lv3)+Empowered Arms(lv11)+Astral Barrage(lv17, ตี 3 แทน 2)+Deflect Energy(lv11, เร็วกว่า baseline's เอง lv13, ครอบคลุม 6 ธาตุ)+Visage's darkvision/adv-Insight/telepathy

- **Damage**: A(3-10,=baseline)→**S(11-20**, Astral Barrage's multi-attack expansion)
- **Survivability**: A(3-10,=baseline)→**S(11-20**, Deflect Energy เร็วกว่า+ครอบคลุมกว่า baseline's เอง)
- **Utility**: D(1-2)→**B(3-20**, Visage's darkvision+adv-Insight/Intimidation+telepathic communication = genuine detection+social utility)

## Way of the Four Elements (PHB 🕰️) — ⚠️ ข้อมูลไม่ครบ

Elemental Disciplines(lv3, เลือก 4 จาก 9+ **สลับได้ทุกครั้งที่เรียนใหม่**)+Ride the Wind+Mist Stance

- **Versatility**: D(1-2)→**B(3-20**, "สลับได้ทุกครั้งที่เรียนใหม่" = กลไกสลับชัดเจน หลุด floor — แม้ข้อมูล discipline แต่ละตัวจะไม่ครบก็ตาม)
- ไม่มี delta อื่น

## Warrior of the Asura (Homebrew)

Asura Strike(lv3, nova สูงสุด ~13d12+Dex ตาเดียว — สูงสุดในกลุ่ม Monk ทั้งหมด)+Force Crit(lv17)+Wrathful Momentum(lv6)+Steel Body(lv11, resist ทุกชนิดดาเมจ)

- **Damage**: A(3-16,=baseline)→**S(17-20**, Asura Strike+Annihilating Fury's 3x-crit — nova magnitude สูงสุดในกลุ่ม Monk ทั้งหมดตามระบบเดิม)
- ไม่มี delta อื่น — ⚠️ Steel Body's resist-ทุกชนิด ดูแรงแต่แลกด้วย Speed 0+Disadvantage หนักมาก (net-neutral ตามที่ระบบเดิมวิเคราะห์เอง) ไม่ถึงเกณฑ์ exceptional-stack

---

## สรุปเกรดที่ Lv20 (baseline + 21 subclass)

| Subclass | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | A | A | D | A | A | D | D |
| Mercy | A | A | **S**(lv17) | A | A | D | D |
| Shadow | A | A | D | **S**(lv17) | A | **B** | D |
| Elements | **S**(lv6) | A | D | A | A | **C** | **B** |
| Open Hand | **S**(lv17) | A | D | A | A | D | D |
| Pride | A | A | D | **S**(lv11) | A | D | D |
| Regret | **S**(lv11) | A | **B** | A | A | D | D |
| Leaden Crown | A | **S**(lv3) | D | A | A | **B** | D |
| Street | **S**(lv17) | A | D | A | A | D | D |
| Bow | A | A | D | A | A | **C** | D |
| Flagellant | A | A | D | A | A | D | D |
| Four Fists | A | A | D | **S**(lv11) | A | D | D |
| Mask | A | **S**(lv3) | D | A | A | D | D |
| Rose | A | A | **A**(lv11) | A | A | D | **B**(lv11) |
| Ascendant Dragon | A | A | D | A | A | **C** | D |
| Drunken Master | **S**(lv17) | A | D | A | A | D | D |
| Kensei | A | A | D | A | A | D | D |
| Long Death | **S**(lv17) | A | D | A | A | D | D |
| Sun Soul | **S**(lv11) | A | D | A | A | D | D |
| Astral Self | **S**(lv11) | A | D | **S**(lv11) | A | **B** | D |
| Four Elements | A | A | D | A | A | D | **B** |
| Asura | **S**(lv17) | A | D | A | A | D | D |

---

## ข้อค้นพบเบื้องต้น

1. **Damage S เกิด 9/21 (≈43%) — สูงเป็นอันดับ 2 รองจาก Gunslinger** เพราะ baseline Damage แข็งอยู่แล้ว (A ตั้งแต่ lv6) และธีม Monk เน้น multi-attack/AoE/nova หนัก — ทุกเคสผ่านเกณฑ์ mechanism-check จริง (AoE/multi-target-expansion/exceptional-single-nova) ไม่ใช่แค่ old-score สูง (12/21 มี old-score=9 แต่มีแค่ 9 ตัวที่ผ่านการตรวจสอบกลไกจริง)
2. **Action Economy 0 delta เต็มทั้ง 21 ตัว — สม่ำเสมอที่สุดเท่าที่เคยเจอสำหรับ axis ที่มี old-score สูง** แม้ 12/21 subclass จะมี old-score=9/10 ก็ตาม เพราะไม่มีกลไกไหนให้ "extra full action" จริง มีแต่ bonus-action/reliability reinforcement ที่ already-above — พิสูจน์ชัดว่า Monk's design philosophy "ทุกอย่างผ่าน bonus action" ทำให้มิติที่ 4 (Extra-Action-Access) เป็นจุดบอดถาวรของทั้งคลาส
3. **Utility floor ต้องกรองกลไก mobility ออกอย่างเข้มงวด** — old-system เคยให้เครดิต fly/climb/swim เป็น Utility แต่ระบบใหม่ไม่นับ ทำให้หลาย subclass ที่ old-score สูง (Four Fists=8, Street=7) จบด้วย 0 delta เพราะกลไกทั้งหมดเป็น mobility ล้วน — มีแค่ 6/21 ที่หลุด floor จริงผ่าน genuine detection/illusion/utility-spell
4. **Versatility floor ต้องการคำว่า "สลับ" ชัดเจนในคำอธิบาย — พบแค่ 3 เคส** (Elements/Four Elements/Rose) ทั้งหมดผ่านกลไก "เลือกใหม่ได้ตามสถานการณ์/ทุกครั้งที่เรียนใหม่" ต่างจาก Kensei's weapon-selection ที่เป็นการสะสมความรู้ถาวรไม่ใช่การสลับ (จึงไม่ได้เครดิต)
5. **Survivability S เกิด 4 ครั้งผ่าน exceptional-stack เดียวกับ Gunslinger's pattern** (tally เต็ม 4/4 แล้วตั้งแต่ baseline) — Way of the Mask/Leaden Crown เป็น Control S คู่เดียวในกลุ่ม ทั้งคู่ผ่านการยกระดับ severity เกิน Stunning-Strike-benchmark จริง (grapple-chain-to-unconscious, Hold-Person/Monster-stack)
