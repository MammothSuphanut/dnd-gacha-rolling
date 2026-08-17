# Martyr — Subclass Level Overlay (Layer 2)

**ชั้น**: 2 (Subclass Overlay) ของ [Level-Indexed Tier System](00-level-anchor-rubric.md) — ให้คะแนน Martyr + Burden feature รวมกัน เทียบกับ **Anchor Rubric โดยตรง** ทุกเลเวล 1-20
**ที่มาข้อมูล**: อ้างอิงจาก [martyr-subclass-scorecard-2024.md](martyr-subclass-scorecard-2024.md) (ระบบเดิม, feature-text สกัดครบทั้ง 14 ตัวจาก `Valda's Spire of Secrets 2024`, ไม่มี 🕰️ orphan)
**Class Baseline อ้างอิง**: [martyr-level-baseline.md](martyr-level-baseline.md) — Damage B(1-2)→A(3-10)→S(11-20) · Control C(1-4)→B(5-20) · Support **B(1-20) flat** · Survivability B(1)→**S(2-20**, ชนเพดานแล้ว) · Action Economy C(1)→B(2)→A(3-20) · Utility **C(1-20) flat** · Versatility B(1)→A(2-20)
**รูปแบบตาราง**: Delta-only แบบย่อ (14 subclass)
**Burden gate**: lv3/6/14/18 (ตาม chassis table, ต่างจากคลาสอื่นที่ใช้ lv3/6/10/14) — ใช้เลขจริงที่ระบุชัดในระบบเดิมเมื่อมี
**สถานะ**: 🚧 first pass

⚠️ **กติกาเฉพาะของคลาสนี้ที่ใช้ซ้ำทุก Burden**:
1. **Survivability ชนเพดาน S ตั้งแต่ baseline เอง lv2 — ไม่มี Burden ไหนขยับได้เลยแม้แต่ตัวเดียว** แม้ระบบเดิมจะให้ทุก Burden คะแนน 9-10/10 (สูงสุดในกลุ่มเสมอ) ก็ตาม — ตัวอย่างชัดเจนที่สุดเท่าที่เคยเจอของ "old-score สูงไม่ได้แปลว่ามี room ให้ delta"
2. **Support baseline ต่ำผิดปกติ (old=3, new=B ที่ไม่มี resource คู่ขนาน)** ทำให้ Burden ที่เพิ่มกลไกทีมจริงจัง (ไม่ใช่แค่ narrow single-feature) ขยับได้ไกลถึง S — พบ pattern ใหม่ "debuff-absorption" (Sin Eater) ที่ไม่เคยเจอมาก่อนในระบบ
3. **Control's B(5-20) ต้องการ Tier4+ ที่เหนือกว่า Hold-Person-benchmark จริงๆ** — "free Mass Suggestion ไม่ต้อง concentration" (Fame) และ "free Dominate ไม่ต้อง repeat-save" (Tyranny) เป็น 2 เคสเดียวที่แรงพอถึง S

---

## Burden of Anonymity — shadow assassin

Silent Sacrifice(lv6, ตัด Radiant self-dmg เมื่อ unseen)+Fade from View(lv3)+False Martyrdom(lv14)+Passwall/Modify Memory/Sending ติดตัว

- **Utility**: C(1-2)→**B(3-20**, สเปลล์ utility ถาวรหลุด Primary threshold)
- ไม่มี delta อื่น (Survivability ชนเพดานอยู่แล้ว, Control old-score+2 modest single-mechanism)

## Burden of Ascension — demigod warrior

Herculean Surge+Xiphos relic(lv14)+Olympic Agility(lv6)+Oracle relic(free Commune)+Hold Monster ติดตัว(lv17)

- **Utility**: C(1-2)→**B(3-20**, Olympic Agility+Oracle relic 2 กลไกพร้อมกัน)
- ไม่มี delta อื่น

## Burden of Atonement — burden-bearer protector

Sin Eater(lv6, ดูดซับ Exhaustion/คำสาป/ability-drain/max-HP-loss/condition จาก ally มาไว้ที่ตัวเอง)+Sacrificial Luck(lv14)+Ever-Vigilant(lv18)

- **Support**: B(1-5,=baseline)→**S(6-20**, Sin Eater = pattern ใหม่ "debuff-absorption" ที่ไม่เคยเจอมาก่อน — ระบบเดิมยกให้เป็น "support tool ที่ทรงพลังที่สุดในกลุ่ม" เสริมด้วย Sacrificial Luck lv14)
- ไม่มี delta อื่น (AE's Ever-Vigilant = Reaction มิติเดียวกับที่ above อยู่แล้ว, Survivability ชนเพดาน)

## Burden of Calamity — apocalypse harbinger

Aura of Calamity(lv3, AoE emanation ต่อเนื่อง+Prone ซ้ำได้ทุกเทิร์น)+Doom Foretold(lv18, free Earthquake/Fire-Storm/Storm-of-Vengeance)+Apocalyptic Omen(lv6, universal +1d4)

- **Damage**: A(3-10,=baseline)→**S(3-20**, AoE nova ต่อเนื่องผลัก Primary เกิน baseline lv11 — Aura ทำงานตั้งแต่ gate แรก)
- **Control**: C(1-2)→**A(3-20**, Aura's recurring AoE Prone เกิน Hold-Person-tier ของ baseline ตั้งแต่ก่อน lv5)

## Burden of Discord — chaos gambler

Havoc! table(d10, ตีเมลีโดนแล้วทอย: dmg/Prone/disarm/Charmed-Frightened-Poisoned)+Sacrificial Burst(lv18)+Coin of Chaos(lv6)

- **Damage**: A(3-10,=baseline)→**S(3-20**, Havoc!+Sacrificial Burst's exploding-dice ผลัก Primary)
- **Control**: C(1-2)→**B(3-20**, Havoc! table ให้ผล control จริงบ่อยครั้ง — ไม่ flag RNG เพราะเป็นตัวเลือกที่ invoke ได้เอง ไม่ใช่สุ่มบังคับ)

## Burden of Fame — celebrity charmer

Starstruck+Crowd Suggestion(lv14, free Mass Suggestion 100 เป้า **ไม่ต้อง concentration**)+Superstar Aura(lv18)+Entourage(lv6, AC เท่าจำนวน Charmed)

- **Control**: B(5-13,=baseline)→**S(14-20**, Crowd Suggestion's no-concentration mass-CC — **Control สูงสุดในกลุ่ม 14 ตัวนี้ร่วมกับ Tyranny**)
- ไม่มี delta อื่น (Survivability ชนเพดาน แม้ Entourage จะดูแรง)

## Burden of Levity — trickster jester

Sacrificial Shenanigans(Taunt/Trip เลือกได้)+Matador Backstab(lv14, free Mass Suggestion 100 เป้า)+Just a Prank(lv6)

- **Control**: C(1-2)→B(3-13)→**A(14-20**, Matador Backstab's free Mass Suggestion — เกรดต่ำกว่า Fame เล็กน้อยเพราะไม่มี "no-concentration" explicit)
- ไม่มี delta อื่น

## Burden of Mercy — healer saint

Balm(Miraculous Healing → ฮีล ally ได้ด้วย)+Virtuous Blessings(lv6, บัฟรายวันทีม)+Anointed Healer(lv18, HP/temp-HP เข้าทุก heal spell)+Censuring Light(lv14)

- **Support**: B(1-2)→A(3-5,=baseline)→**S(6-20**, 3 กลไกฮีล/บัฟทีมพร้อมกัน — ระบบเดิมยกให้เป็น "healer kit ที่ทรงพลังที่สุดในบรรดา subclass ที่ทำมา" [10/10 เต็ม])
- ไม่มี delta อื่น

## Burden of Odyssey — wandering explorer

Misty Transposition(lv6)+Zephyr's Stride(lv14)+Argonaut(lv18, free Haste ไม่มี drawback)+Swift Reprisal(ใช้ Reprisal ไม่เสีย reaction)+Freedom of Movement/Passwall/Teleportation Circle/Water Walk

- **Action Economy**: A(3-5,=baseline)→**S(6-20**, Swift Reprisal ปลด reaction คืนจากการใช้ Reprisal = ได้ reaction-slot เพิ่มจริงๆ ไม่ใช่แค่เสริมมิติเดิม)
- **Utility**: C(1-2)→**B(3-20**, สเปลล์ exploration/travel ถาวร 4 ตัว)
- ไม่มี delta อื่น (Survivability ชนเพดาน แม้ Argonaut จะดูแรง)

## Burden of Rebirth — nature guardian

Surefooted(lv6, ขยาย terrain-immune ให้ ally)+Verdant Resilience(lv14)+Turn of the Wheel(lv18, ฟื้นคืนชีพเอง 1 ครั้ง)+Awaken/Reincarnate/Speak-with-Plants/Hallucinatory-Terrain

- **Utility**: C(1-2)→**B(3-20**, สเปลล์ nature-utility ถาวร 4 ตัว+familiar ฟรี)
- ไม่มี delta อื่น (Support's Surefooted = narrow single mechanism, Survivability ชนเพดาน)

## Burden of Revolution — people's champion

Kingslayer(lv14, Assault=bonus-action move+atk ฟรีบนฆ่า / Shatter-Morale=AoE Frightened / Break-Spells)+Sacrificial Inspiration(bonus action)+Rallying Strike(lv18, ally reaction atk ฟรี)+Aura of Tenacity(lv6)

- **Support**: B(1-5,=baseline)→**A(6-20**, Aura of Tenacity+Sacrificial Inspiration 2 กลไกทีมพร้อมกัน จาก lv6)
- ไม่มี delta อื่น (Control's Kingslayer-choice modest, AE's Assault = same-dimension bonus-action reinforcement, Survivability ชนเพดาน)

## Burden of the End — arcane devastator

เข้าถึง Chromatic Orb/Lightning Bolt/Cone of Cold+Banishment ติดตัว+Sacrificial Spell(lv14, Quicken=cast เป็น bonus action **เท่ากับแคส 2 ครั้ง/เทิร์น**/Heighten=save-disadvantage)+Counterspell/Telekinesis

- **Control**: C(1-2)→**A(3-20**, Banishment ติดตัวถาวร+Heighten's save-disadvantage 2 กลไก)
- **Action Economy**: A(3-13,=baseline)→**S(14-20**, Sacrificial Spell's Quicken = cast สเปลล์คู่ขนานจริง ไม่ใช่แค่เสริมมิติเดิม)
- **Versatility**: A(2)→**S(3-20**, double-cast real-time flip Adaptability-Under-Pressure — เหมือน Medium's Foretelling ในคลาส Investigator)

## Burden of Truth — herald prophet

Word of Terror/Word of Control/Divination/Legend Lore/Sending/Freedom of Movement ติดตัว+Forewarning(action, +5 AC ให้ ally/ตัวเอง)+Seer(lv6, Blindsight)+Sacrificial Foresight(lv18)

- **Control**: C(1-2)→**B(3-20**, Word of Terror/Control ติดตัวถาวร = hard-CC เข้าถึงได้)
- **Utility**: C(1-2)→**B(3-20**, สเปลล์ divination-tier ถาวร 4 ตัว+Seer)
- ไม่มี delta อื่น (Support's Forewarning = single narrow mechanism, Survivability ชนเพดาน)

## Burden of Tyranny — dominator despot

Death Stare(lv6, Frighten)+Totalitarian Control(lv18, free Dominate Beast/Monster/Person + save-disadvantage + **ไม่ต้อง repeat save**)+Sacrificial Resilience(lv14)

- **Control**: B(5-17,=baseline)→**S(18-20**, Totalitarian Control's guaranteed-unbreakable Dominate — **Control สูงสุดในกลุ่มร่วมกับ Fame**)
- ไม่มี delta อื่น (Survivability ชนเพดาน แม้ Sacrificial Resilience's temp-HP-return จะดูแรง)

---

## สรุปเกรดที่ Lv20 (baseline + 14 Burden)

| Burden | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|
| **Baseline** | S | B | B | S | A | C | A |
| Anonymity | S | B | B | S | A | **B** | A |
| Ascension | S | B | B | S | A | **B** | A |
| Atonement | S | B | **S** | S | A | C | A |
| Calamity | **S**(lv3) | **A** | B | S | A | C | A |
| Discord | **S**(lv3) | **B**(lv3) | B | S | A | C | A |
| Fame | S | **S**(lv14) | B | S | A | C | A |
| Levity | S | **A**(lv14) | B | S | A | C | A |
| Mercy | S | B | **S** | S | A | C | A |
| Odyssey | S | B | B | S | **S**(lv6) | **B** | A |
| Rebirth | S | B | B | S | A | **B** | A |
| Revolution | S | B | **A**(lv6) | S | A | C | A |
| The End | S | **A**(lv3) | B | S | **S**(lv14) | C | **S**(lv3) |
| Truth | S | **B**(lv3) | B | S | A | **B** | A |
| Tyranny | S | **S**(lv18) | B | S | A | C | A |

---

## ข้อค้นพบเบื้องต้น

1. **Survivability 0 delta เต็มทั้ง 14 ตัว — สม่ำเสมอที่สุดเท่าที่เคยเจอ** แม้ระบบเดิมจะให้ทุก Burden คะแนน 9-10/10 (สูงสุดเสมอในกลุ่ม 7 axis) ก็ตาม เพราะ baseline เองชนเพดาน S ตั้งแต่ lv2 ผ่าน Reprisal+Miraculous Healing — ตัวอย่างที่ชัดเจนที่สุดในระบบทั้งหมดของหลักการ "old-system score สูง ≠ มี room ให้ delta ในระบบใหม่"
2. **Support baseline อ่อนผิดปกติ (old-score=3, ต่ำสุดในบรรดา baseline ทุกแกนของ Martyr) เปิดช่องให้ 2 Burden ขยับถึง S เต็ม** (Atonement's Sin Eater = pattern "debuff-absorption" ใหม่ที่ไม่เคยเจอมาก่อนในระบบทั้งหมด, Mercy's 3-mechanism healer-stack ที่ระบบเดิมยกเป็น "ทรงพลังที่สุดในบรรดา subclass ที่ทำมา")
3. **The End เป็น Burden เดียวที่ Versatility ขยับได้** ผ่าน Quicken's real-time double-cast (Adaptability-Under-Pressure flip) — เหมือน pattern ของ Medium ในคลาส Investigator เป๊ะ ยืนยันว่า "real-time resource flexibility ที่ baseline ไม่มี" เป็น pattern ที่เกิดซ้ำได้ข้ามคลาส
4. **Control ต้องการ Tier4+ เหนือ Hold-Person-benchmark จริงๆ ถึงจะขยับได้ — พบ 2 เคส S ผ่าน "capstone ที่ตัดข้อจำกัดปกติของ spell ออก"** (Fame's Mass-Suggestion-ไม่ต้อง-concentration, Tyranny's Dominate-ไม่ต้อง-repeat-save) ทั้งคู่เป็น lv18 capstone ที่ทำให้สเปลล์ทรงพลังกว่าตัวจริงเสียอีก
5. **AE's Extra-Action-Access escape เกิด 2 ครั้งด้วยกลไกต่างรูปแบบกัน** (Odyssey's Swift Reprisal=ปลด reaction คืนจากการใช้ resource เดิม, The End's Quicken=cast สเปลล์คู่ขนานจริง) — ทั้งคู่ผ่านเกณฑ์ "ได้ action-slot เพิ่มจริง" ไม่ใช่แค่เสริมมิติที่ above อยู่แล้ว
