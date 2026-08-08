# Martyr — Subclass Scorecard (2024)

**วิธีให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) — 7 axis, M/R/B scoring, Class Baseline, กติกาการเขียนเหตุผล

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 14 subclass (ดูรายชื่อใน [00-scorecard-progress.md § Martyr](00-scorecard-progress.md))
**สถานะปัจจุบัน**: เสร็จสมบูรณ์ — Class Baseline + Subclass Scoring ครบทั้ง 14 ตัว

**ที่มาข้อมูล chassis**: `src/data/5etools/homebrew/valdas-spire/Mage Hand Press; Valda's Spire of Secrets - 2024.json` — source `ValdaSpire24`

---

## Class Baseline (Martyr, 2024)

Floor 0-10 ต่อ axis ของ **Martyr เปล่าๆ ไม่นับ subclass feature ใดๆ เลย** — HD d12 (สูงสุดในเกมเท่า Barbarian), spellcasting ability Wis แบบ **Hit Point Spellcasting** (จ่าย HP เป็น Radiant damage แทน slot ปกติ ทะลุ resistance/immunity/temp HP), saving throw proficiency Str + Wis, armor proficiency light/shield, weapon proficiency simple+martial, Weapon Mastery, Extra Attack (lv5), Armor of Faith (lv1, เลือก Anointed Armor [medium armor, Wis แทน Dex เข้า AC] หรือ Unarmored Defense [10+Dex+Wis]), Miraculous Healing (lv2, Bonus Action ฮีลตัวเองด้วย Hit Dice), Reprisal (lv2, reaction ลดดาเมจที่โดนลงครึ่ง+สะท้อนดาเมจกลับ), Sacrifice (lv3, เลือก Sacrificial Strike [จ่าย 5 รับ deal 10 เพิ่ม] หรือ Sacrificial Skill [จ่าย 10 ได้ +5 บน check ที่ fail]), Sacrifice Foe (lv7), Divine Respite (lv9), Undying (lv10), Improved Sacrificial Strike (lv11), March Unto Destiny (lv15), Final Martyrdom (lv20)

| Axis | Baseline | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | Sacrificial Strike (lv3, Bonus Action) ให้จ่าย 5 Radiant damage ให้ตัวเองแลกกับเป้าหมายรับ extra 10 Radiant damage ที่ทะลุ resistance/immunity (เพิ่มเป็น 20 ที่ lv11) บวก Extra Attack (lv5) — magnitude สูงมากและใช้ได้ทุกเทิร์นตราบมี HP จ่ายไหว (ไม่ผูก resource แบบวันละกี่ครั้ง) [M:3/4] [R:2/3] [B:2/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ที่ยืนยันได้ติด chassis เลย [M:1/4] [R:1/3] [B:1/3] |
| **Support** | 3/10 (C) | Reprisal และ Miraculous Healing เป็น self-only ทั้งคู่ ไม่มี heal/buff ally ที่ยืนยันได้ติด chassis นอกเหนือจาก spell ที่เลือกเตรียมเอง [M:1/4] [R:1/3] [B:1/3] |
| **Survivability** | 9/10 (S) | HD d12 (สูงสุดในเกม) บวก Reprisal (lv2, reaction ลดดาเมจที่โดนลงครึ่งหนึ่งทุกครั้งที่โดนตีจากระยะประชิด) + Miraculous Healing (lv2, Bonus Action ฮีลด้วย Hit Dice สูงสุดครึ่งนึงของ Martyr level ต่อครั้ง) + Divine Respite (lv9, คืน Hit Dice ตอน short rest) + Undying (lv10, ตกลง 1 HP แทน 0 พร้อมฮีลฟรีทันที 1 ครั้ง/long rest) + March Unto Destiny (lv15, immune Paralyzed/Petrified/Stunned) — ชั้นการรอดชีวิตซ้อนกันมากที่สุดเท่าที่ทำมา [M:4/4] [R:3/3] [B:2/3] |
| **Action Economy** | 6/10 (B) | Miraculous Healing/Sacrificial Strike ใช้แค่ Bonus Action, Reprisal เป็น Reaction ฟรี, Undying ทำงานแบบ "no action required" — Hit Point Spellcasting เองก็ทำให้การร่ายคาถาไม่ผูกกับ slot pool ที่จำกัดต่อวันแบบ caster ทั่วไป (จำกัดแค่ HP ที่มี) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 6/10 (B) | Sacrificial Skill (lv3, 1 ครั้ง/เทิร์น) ให้จ่าย 10 Radiant damage แลก +5 บน D20 Test ที่กำลัง fail อยู่ (พลิกเป็นสำเร็จได้) ใช้ได้กับ check/save/attack roll อะไรก็ได้ ไม่ผูก resource วันละกี่ครั้ง [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | Armor of Faith ให้เลือก build path (medium armor Wis-AC vs unarmored Dex+Wis-AC) บวก Sacrifice ที่สลับใช้ Sacrificial Strike (รุก) หรือ Sacrificial Skill (utility) ได้อิสระตามสถานการณ์รายเทิร์นจาก resource เดียวกัน (HP ตัวเอง) [M:2/4] [R:2/3] [B:2/3] |

---

## Subclass Scoring (14)

**Class Baseline อ้างอิง**: Damage 7, Control 3, Support 3, Survivability 9, Action Economy 6, Utility 6, Versatility 6

ทั้ง 14 Burden มาจากไฟล์เดียวกัน (`Valda's Spire of Secrets 2024`, ไม่มี 🕰️ orphan เลย) ไม่มี subclass ตัวไหนมีกลไก explicit ที่ตัด baseline capability ออก — ทุกแกนจึงต้อง ≥ baseline เสมอ (เท่ากับ baseline ถ้าไม่มี feature เพิ่มด้านนั้น) หมายเหตุ: Survivability baseline สูงมากอยู่แล้ว (9) ทำให้หลาย subclass ยัง "เท่า baseline" แม้จะมี feature เสริมเพราะ magnitude ไม่พอข้าม tier

| Subclass | Overall | Damage | Control | Support | Surv. | AE | Utility | Versatility |
|---|---|---|---|---|---|---|---|---|
| Burden of Anonymity | A | 8 (A) | 5 (B) | 3 (C) | 10 (S) | 7 (A) | 8 (A) | 7 (A) |
| Burden of Ascension | A | 8 (A) | 5 (B) | 3 (C) | 10 (S) | 7 (A) | 8 (A) | 7 (A) |
| Burden of Atonement | S | 7 (A) | 5 (B) | 9 (S) | 10 (S) | 8 (A) | 8 (A) | 8 (A) |
| Burden of Calamity | A | 9 (S) | 6 (B) | 3 (C) | 9 (S) | 6 (B) | 7 (A) | 7 (A) |
| Burden of Discord | A | 9 (S) | 6 (B) | 3 (C) | 9 (S) | 7 (A) | 7 (A) | 8 (A) |
| Burden of Fame | S | 7 (A) | 9 (S) | 3 (C) | 10 (S) | 6 (B) | 7 (A) | 7 (A) |
| Burden of Levity | A | 7 (A) | 7 (A) | 3 (C) | 10 (S) | 7 (A) | 7 (A) | 7 (A) |
| Burden of Mercy | S | 8 (A) | 3 (C) | 10 (S) | 9 (S) | 6 (B) | 7 (A) | 6 (B) |
| Burden of Odyssey | A | 7 (A) | 3 (C) | 4 (C) | 10 (S) | 8 (A) | 8 (A) | 8 (A) |
| Burden of Rebirth | B | 7 (A) | 3 (C) | 5 (B) | 10 (S) | 6 (B) | 8 (A) | 7 (A) |
| Burden of Revolution | S | 8 (A) | 6 (B) | 7 (A) | 10 (S) | 8 (A) | 7 (A) | 8 (A) |
| Burden of the End | A | 8 (A) | 6 (B) | 3 (C) | 9 (S) | 8 (A) | 7 (A) | 8 (A) |
| Burden of Truth | S | 8 (A) | 6 (B) | 5 (B) | 10 (S) | 7 (A) | 8 (A) | 7 (A) |
| Burden of Tyranny | S | 8 (A) | 9 (S) | 3 (C) | 10 (S) | 6 (B) | 6 (B) | 7 (A) |

---

### Burden of Anonymity

**Overall**: A — ขยับขึ้น 6 ใน 7 axis แบบกลางๆ (Damage/Control/Survivability/AE/Utility/Versatility) มีแค่ Support ที่นิ่ง ไม่มี peak ถึง S เพิ่มเลย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Silent Sacrifice (lv6) ตัด Radiant self-damage ของ Sacrificial Strike ออกเมื่อโจมตีเป้าที่มองไม่เห็นเรา — ใช้ได้ถี่ขึ้นแบบไม่เสีย HP [M:2/4] [R:3/3] [B:3/3] |
| **Control** | 5/10 (B) | Silent Sacrifice ทำให้เป้าที่โดนเงียบสนิท (พูด/แคส Verbal component ไม่ได้จนจบเทิร์นถัดไป) [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Fade from View (ล่องหนตอน initiative ฟรี) + False Martyrdom (lv14, ปลอมตายทีเลพอร์ตหนีพร้อมศพปลอม) — ชั้นการหลบหลีกที่ทับซ้อนบน baseline ที่แข็งอยู่แล้ว [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Divine Assassin (lv18) แคส Invisibility/Greater Invisibility เป็น bonus action ได้ + เสีย Radiant damage ครึ่งเดียว [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Passwall/Modify Memory/Sending ติดตัวถาวร + Thieves' Tools proficiency — utility แทรกซึม/สายลับที่ baseline ไม่มี [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญนักฆ่าเงา ธีมเดียวแต่ครบเครื่อง [M:2/4] [R:2/3] [B:3/3] |

### Burden of Ascension

**Overall**: A — รูปแบบเดียวกับ Burden of Anonymity เป๊ะ (ตัวเลขเหมือนกันทุก axis) — กว้างแบบกลางๆ ไม่มี peak S เพิ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Herculean Surge (บวก Str/Dex ชั่วคราวเสริมโจมตี) + Xiphos relic (lv14, ตีเพิ่มฟรีทุกครั้งที่ครี/ฆ่า) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 5/10 (B) | Hold Monster ติดตัวถาวรตั้งแต่ lv17 เป็น hard-CC ที่ baseline ไม่มี [M:2/4] [R:1/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Legendary Resistance (lv18, เปลี่ยน failed save เป็น success 1/long rest) + Aegis relic (แคส Shield ฟรีไม่เสีย Radiant dmg) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Xiphos relic ให้ตีเพิ่มฟรีไม่เสีย action หลังครี/ฆ่า [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Olympic Agility (Climb+Swim Speed เต็ม + เพิกเฉย difficult terrain) + Oracle relic (แคส Commune ฟรี) [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ธีมเทพครึ่งองค์ที่เน้น Str/Dex + relic 3 แบบให้เลือกใช้ตามสถานการณ์ [M:2/4] [R:2/3] [B:3/3] |

### Burden of Atonement

**Overall**: S — Support กระโดด +6 (3→9, C→S) — แก้จุดอ่อนใหญ่สุดของ baseline ได้แรงสุดในกลุ่ม บวก Survivability เป็น S ด้วย และขยับตามอีก 4 axis


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม support/protector ล้วน) = เท่า baseline |
| **Control** | 5/10 (B) | Sacrificial Challenge (lv14) ให้เป้าที่โดน Sacrificial Strike มี Disadvantage โจมตีคนอื่น [M:2/4] [R:2/3] [B:1/3] |
| **Support** | 9/10 (S) | Sin Eater (lv6, action) ดูดซับ Exhaustion/คำสาป/ลด ability score/ลด max HP/หลาย condition จาก ally มาไว้ที่ตัวเองแทน — support tool ที่ทรงพลังที่สุดในกลุ่มเพราะรับความเสียหายแทนได้ทุกประเภท บวก Sacrificial Luck (lv14, แจก +1d6 ให้ ally ทุกคนที่เห็น) [M:3/4] [R:3/3] [B:3/3] |
| **Survivability** | 10/10 (S) | Ever-Vigilant (lv18) ให้ reaction พิเศษแยกต่างหากสำหรับ Reprisal/Redirection โดยเฉพาะ — เท่ากับป้องกันตัวเอง**และ**ปกป้อง ally ได้ในรอบเดียวกัน [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Ever-Vigilant คือ reaction เพิ่มจริงๆ ที่ baseline ไม่มี [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Sin Eater ใช้ล้างคำสาป/Exhaustion/ability drain ให้ ally ได้เหมือน Remove Curse ระดับสูง [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | เปิด role "protector สมบูรณ์แบบ" ที่ทั้งรับแทนดาเมจและรับแทนดีบัฟ [M:2/4] [R:3/3] [B:3/3] |

### Burden of Calamity

**Overall**: A — Damage เป็น S (9/10) บวก Control/Utility/Versatility ขยับตาม แต่ Support/Action Economy นิ่งสนิท


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Aura of Calamity (action, AoE emanation ต่อเนื่อง 1 นาที สเกล 1d8→4d8 ธาตุที่เลือก+Prone) + Doom Foretold (lv18, แคส Earthquake/Fire Storm/Storm of Vengeance ฟรี) — AoE nova ที่หนักที่สุดในกลุ่ม [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Aura of Calamity ทำให้เป้าล้ม Prone ซ้ำได้ทุกเทิร์นตราบอยู่ในออร่า [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | ไม่มี feature ป้องกันตัวเองใหม่ = เท่า baseline |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 7/10 (A) | Apocalyptic Omen (lv6, บวก 1d4 เข้า d20 test ทุกแบบนาน 1 ชม.) เป็นบัฟสากลที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | เลือกธาตุของ Aura ได้อิสระ + Apocalyptic Omen ใช้ได้ทุกสถานการณ์ [M:2/4] [R:2/3] [B:3/3] |

### Burden of Discord

**Overall**: A — Damage เป็น S บวกขยับกลางๆ อีก 3 axis (Control/AE/Versatility) กว้างกว่า Calamity เล็กน้อย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 9/10 (S) | Havoc! table (d10, ตีเมลีโดนแล้วทอย) มีตัวเลือกดาเมจเสริม+auto-crit บวก Sacrificial Burst (lv18, อัปเกรด Sacrificial Strike เป็น exploding dice สูงสุด 10 ก้อน) — magnitude สูงสุดในกลุ่ม [M:3/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Havoc! table มีตัวเลือก Prone/ดึงอาวุธหลุดมือ/Charmed-Frightened-Poisoned สุ่ม [M:2/4] [R:1/3] [B:3/3] |
| **Support** | 3/10 (C) | ตัวเลือกฮีลใน Havoc! เป็นแค่ฮีลตัวเอง 5 HP ไม่ใช่ ally-support = เท่า baseline |
| **Survivability** | 9/10 (S) | ไม่มี feature ป้องกันตัวเองใหม่โดยตรง = เท่า baseline |
| **Action Economy** | 7/10 (A) | Pandemonium (lv14) ตัด Radiant cost ของ Havoc! ออก + ทอยสองครั้งเลือกเอา — resource efficiency ที่ดีขึ้น [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Coin of Chaos (lv6, บวก +4/+1 เข้า d20 test ใดก็ได้ แชร์เหรียญกับ GM) เป็นบัฟสากลที่ baseline ไม่มี [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | ตาราง Havoc! สุ่มให้ผลได้ทั้งดาเมจ/control/utility/mobility จากกลไกเดียว — breadth กว้างที่สุดในกลุ่ม [M:2/4] [R:3/3] [B:3/3] |

### Burden of Fame

**Overall**: S — Control กระโดด +6 (3→9, C→S) — เลข Control สูงสุดในกลุ่มทั้งหมด บวก Survivability เป็น S ด้วย


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม charm/control ล้วน) = เท่า baseline |
| **Control** | 9/10 (S) | Starstruck (Charm Person ไม่เสียเปรียบจากการต่อสู้) + Crowd Suggestion (lv14, แคส Mass Suggestion ฟรีถึง 100 เป้าไม่ต้อง concentration) + Superstar Aura (lv18, AoE บังคับ Prone ทุกเทิร์นรอบตัว) — control kit ที่กว้างที่สุดในกลุ่ม [M:4/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่โดยตรง (ทุกอย่างเน้น charm ศัตรู) = เท่า baseline |
| **Survivability** | 10/10 (S) | Entourage (lv6, บวก AC เท่าจำนวนเป้า Charmed รอบตัว สูงสุดเท่า Wis mod) + Reactive Sanctuary (lv18, แคส Sanctuary ฟรีพร้อม Reprisal) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 7/10 (A) | Tongues/Teleportation Circle/Private Sanctum ติดตัวถาวร + Celebrity (Performance boost) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญ charm/celebrity ที่ป้องกันตัวเองได้ดีจากเป้าที่ charm ไว้ [M:2/4] [R:2/3] [B:3/3] |

### Burden of Levity

**Overall**: A — Control ขยับ +4 (C→A) บวกขยับกลางๆ อีก 3 axis (AE/Utility/Versatility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม trickster/control ล้วน) = เท่า baseline |
| **Control** | 7/10 (A) | Sacrificial Shenanigans (เลือก Taunt=Disadvantage หรือ Trip=Prone ทุกครั้งที่ใช้ Sacrificial Strike) + Matador Backstab (lv14, Mass Suggestion ฟรี 100 เป้า) [M:2/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 10/10 (S) | Just a Prank (lv6, ตีสวนศัตรูที่จะทำ OA ใส่เราก่อนที่ OA จะลง — เท่ากับยกเลิก OA ได้บ่อยๆ) + Zany Misdirection (lv18, Reprisal เปลี่ยนเป้าการโจมตีไปโดนตัวอื่นแทนได้เลย) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Just a Prank ให้ตีฟรีก่อนโดน OA ไม่เสีย reaction/action เพิ่ม [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 7/10 (A) | Dimension Door/Modify Memory/Seeming ติดตัวถาวร [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 7/10 (A) | Trickster ที่ผสม control+defense tricks ได้หลากหลาย [M:2/4] [R:2/3] [B:3/3] |

### Burden of Mercy

**Overall**: S — Support กระโดด +7 (3→10, C→S เต็มสเกล) — การแก้จุดอ่อนที่แรงที่สุดในทั้งคลาส


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Censuring Light (lv14, AoE 4d6 radiant ต่อเนื่องใส่ creature type ที่เลือก) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 10/10 (S) | Balm ให้ Miraculous Healing ฮีล ally ได้ด้วย (1d8/Hit Die ที่ใช้) + ล้าง condition + Virtuous Blessings (lv6, แจกบัฟรายวันให้ ally สูงสุดเท่า Wis mod) + Anointed Healer (lv18, บวก HP/temp HP เข้าทุก heal spell ที่แคส) — healer kit ที่ทรงพลังที่สุดในบรรดา subclass ที่ทำมา [M:4/4] [R:3/3] [B:3/3] |
| **Survivability** | 9/10 (S) | Censuring Light ให้ Advantage บน save ต้าน creature type ที่เลือกแก่ ally ไม่ใช่ตัวเอง = เท่า baseline |
| **Action Economy** | 6/10 (B) | Merciful Healing ตัด Radiant cost ออก แต่ไม่ใช่ extra-action = เท่า baseline |
| **Utility** | 7/10 (A) | Virtuous Blessings (Blessing of Alacrity/Eloquence/Vigilance) เป็น utility เสริมทีมที่กว้าง [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 6/10 (B) | โฟกัส healer เฉพาะทางสุดขั้ว ไม่ขยาย role อื่น = เท่า baseline |

### Burden of Odyssey

**Overall**: A — ขยับขึ้น 4 axis แบบกลางๆ (Support/AE/Utility/Versatility) ไม่มี peak เด่นชัด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม mobility ล้วน) = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 4/10 (C) | Misty Transposition (lv6, Misty Step ฟรีที่สลับที่กับ ally ได้ — ดึง ally ออกจากอันตราย) [M:1/4] [R:1/3] [B:2/3] |
| **Survivability** | 10/10 (S) | Zephyr's Stride (lv14, Disadvantage การโจมตีใส่เราหลังเคลื่อนที่ 30ft+) + Argonaut (lv18, Haste ฟรีตอน initiative ไม่มี drawback) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Swift Reprisal ให้ใช้ Reprisal ได้โดยไม่เสีย reaction เลยตอนเป็นเทิร์นตัวเอง [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 8/10 (A) | Freedom of Movement/Passwall/Teleportation Circle/Water Walk ติดตัวถาวร — exploration/travel utility ที่กว้างมาก [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 8/10 (A) | ธีมความเร็ว/มือสำรวจที่ขยายทั้ง defense/economy/utility [M:2/4] [R:3/3] [B:3/3] |

### Burden of Rebirth

**Overall**: B — ขยับแค่ 3 axis เล็กน้อย (Support/Utility/Versatility) Control/Action Economy นิ่งสนิท แคบที่สุดในกลุ่ม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 7/10 (A) | ไม่มี feature เพิ่มดาเมจใหม่ (ธีม nature/support ล้วน) = เท่า baseline |
| **Control** | 3/10 (C) | ไม่มี control feature ใหม่ = เท่า baseline |
| **Support** | 5/10 (B) | Surefooted (lv6) ขยายเพิกเฉย difficult terrain + ภูมิคุ้มกัน Entangle/Spike Growth/Plant Growth ให้ ally ในระยะ 30ft ด้วย [M:2/4] [R:2/3] [B:1/3] |
| **Survivability** | 10/10 (S) | Verdant Resilience (lv14, bonus action 1 นาที: ฟื้น HP ทุกเทิร์น + resistance B/P/S) + Turn of the Wheel (lv18, ฟื้นคืนชีพตัวเองได้ 1 ครั้งถ้ายังไม่ใช้ Final Martyrdom) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | ไม่มี economy gain ใหม่ที่ชัดเจน = เท่า baseline |
| **Utility** | 8/10 (A) | Awaken/Reincarnate/Speak with Plants/Hallucinatory Terrain ติดตัวถาวร + familiar ฟรี — nature utility ที่กว้างมาก [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | Nature-guardian ที่ผสม tank+utility+party mobility [M:2/4] [R:2/3] [B:3/3] |

### Burden of Revolution

**Overall**: S — ขยับขึ้นครบทั้ง 7 axis จาก baseline ไม่เหลือแกนไหนนิ่งเลย (Support +4 เด่นสุด) กว้างที่สุดในบรรดา Burden ทั้งหมด


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Kingslayer (lv14) เลือก Assault ได้: bonus action เคลื่อนที่+ตีฟรีทันทีที่ฆ่าศัตรู [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Kingslayer เลือก Shatter Morale (AoE Frightened ใส่พวกพ้องที่อ่อนแอกว่าของศัตรูที่ตาย) หรือ Break Spells (ยกเลิกเวทมนตร์ทั้งหมดบนศพ) [M:2/4] [R:1/3] [B:3/3] |
| **Support** | 7/10 (A) | Sacrificial Inspiration (bonus action, แจก Heroic Inspiration ให้ ally) + Rallying Strike (lv18, Sacrificial Strike → ally ได้ reaction attack ฟรี) + Aura of Tenacity (lv6, บวก initiative ให้ทั้งทีม) [M:2/4] [R:2/3] [B:3/3] |
| **Survivability** | 10/10 (S) | Ranged Reprisal ขยาย Reprisal จากระยะประชิดล้วนเป็นระยะ 60ft — เพิ่ม breadth ของ mitigation หลักของ baseline อย่างมีนัยสำคัญ [M:4/4] [R:3/3] [B:3/3] |
| **Action Economy** | 8/10 (A) | Kingslayer's Assault (bonus action ฟรีหลังฆ่า) + Rallying Strike (ally ได้ reaction attack ฟรี) [M:2/4] [R:3/3] [B:3/3] |
| **Utility** | 7/10 (A) | Telepathic Bond ติดตัวถาวร + Aura of Tenacity (initiative buff วงกว้าง) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | นักปฏิวัติที่ผสมดาเมจ/control/support/defense ครบทุกแกน [M:2/4] [R:3/3] [B:3/3] |

### Burden of the End

**Overall**: A — ขยับขึ้น 5 axis แบบกลางๆ (Damage/Control/AE/Utility/Versatility) ไม่มี peak ถึง S


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | เข้าถึง Chromatic Orb/Lightning Bolt/Cone of Cold + Sacrificial Spell's Quicken (lv14, แคส spell เป็น bonus action ได้ — เท่ากับแคสสองครั้ง/เทิร์น) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Banishment ติดตัวถาวร + Sacrificial Spell's Heighten (Disadvantage บน save ต้าน spell ตัวเอง) [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ = เท่า baseline |
| **Survivability** | 9/10 (S) | Vindictive Spell (lv18, reaction แคส spell ดาเมจตอบโต้ผู้โจมตี) เป็นการตอบโต้ไม่ใช่ mitigation โดยตรง = เท่า baseline |
| **Action Economy** | 8/10 (A) | Spell Recovery (ฟื้น spell use ตอน short rest) + Sacrificial Spell's Quicken (แคส spell เป็น bonus action) [M:3/4] [R:2/3] [B:3/3] |
| **Utility** | 7/10 (A) | Counterspell/Telekinesis ติดตัวถาวร + Mystical Wisdom (Arcana boost) [M:2/4] [R:2/3] [B:2/3] |
| **Versatility** | 8/10 (A) | Wizard-hybrid blaster/controller ที่แคสได้ 2 ครั้ง/เทิร์นด้วย Quicken [M:2/4] [R:3/3] [B:3/3] |

### Burden of Truth

**Overall**: S — ขยับขึ้นครบทั้ง 7 axis จาก baseline เหมือน Burden of Revolution ไม่เหลือแกนไหนนิ่งเลยสักตัว


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | เข้าถึง Word of Force/Word of Frailty (สเปลเฉพาะทาง VSS) ติดตัวถาวร [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 6/10 (B) | Word of Terror/Word of Control ติดตัวถาวรเป็น hard-CC เฉพาะทาง [M:2/4] [R:2/3] [B:2/3] |
| **Support** | 5/10 (B) | Forewarning (action, มอบ +5 AC ต้านการโจมตีครั้งถัดไปให้ ally ได้) [M:2/4] [R:1/3] [B:2/3] |
| **Survivability** | 10/10 (S) | Forewarning ใช้กับตัวเองได้เช่นกัน + Seer (lv6, Blindsight 30ft) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 7/10 (A) | Sacrificial Foresight (lv18, บวก +5 เข้า d20 test **ทุกอัน**จนจบเทิร์นจาก Sacrificial Skill ครั้งเดียว) [M:2/4] [R:2/3] [B:2/3] |
| **Utility** | 8/10 (A) | Divination/Legend Lore/Sending/Freedom of Movement ติดตัวถาวร + Seer [M:2/4] [R:2/3] [B:3/3] |
| **Versatility** | 7/10 (A) | ผู้เผยพระวจนะที่แตะทั้ง control/support/defense/utility [M:2/4] [R:2/3] [B:3/3] |

### Burden of Tyranny

**Overall**: S — Control กระโดด +6 (3→9, C→S) เท่า Burden of Fame บวก Survivability เป็น S ด้วย แม้ Support/AE/Utility จะยังนิ่งอยู่ก็ตาม


| Axis | คะแนน | เหตุผล |
|---|---|---|
| **Damage** | 8/10 (A) | Totalitarian Control's Psychic Recoil (lv18, 6d8 psychic เมื่อ Dominate spell จบ) [M:2/4] [R:2/3] [B:3/3] |
| **Control** | 9/10 (S) | Death Stare (lv6, Frighten เป้าตอน initiative หรือ action) + Totalitarian Control (lv18, แคส Dominate Beast/Monster/Person ฟรี พร้อม Disadvantage บน save + ไม่ต้อง repeat save ตอนโดนดาเมจ) — ระบบครอบงำที่ทรงพลังที่สุดในกลุ่ม [M:4/4] [R:2/3] [B:3/3] |
| **Support** | 3/10 (C) | ไม่มี feature เสริมทีมใหม่ (ทุกอย่างเน้นครอบงำศัตรู) = เท่า baseline |
| **Survivability** | 10/10 (S) | Sacrificial Resilience (lv14, ได้ temp HP เท่า Radiant damage ที่เสียจาก Sacrificial Strike — คืนทุนความเสียหายที่จ่ายไปทันที) [M:3/4] [R:3/3] [B:3/3] |
| **Action Economy** | 6/10 (B) | Vengeful Reprisal (Advantage การโจมตีใส่เป้าหลัง Reprisal) เป็น reliability boost ไม่ใช่ economy gain ใหม่ = เท่า baseline |
| **Utility** | 6/10 (B) | ไม่มี utility นอกคอมแบตใหม่ที่ชัดเจน = เท่า baseline |
| **Versatility** | 7/10 (A) | ผู้เชี่ยวชาญครอบงำ/ข่มขู่ที่มีระบบ self-sustain แข็งแกร่ง [M:2/4] [R:2/3] [B:3/3] |
