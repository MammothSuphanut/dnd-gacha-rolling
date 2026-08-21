# Novice Job Line: Knight (Swordsman → Knight → Lord Knight → Rune Knight → Dragon Knight)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — แยกออกมาเป็นไฟล์เฉพาะสาย 1 ไฟล์ต่อ 1 fork ตั้งแต่ Second Class เป็นต้นไป (ดีไซน์ปัจจุบันข้าม First Class เป็น mechanical step แล้ว — เลือกตรงเป็น Second Class ตั้งแต่เลเวล 3) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ (ดูตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) สำหรับภาพรวมทั้ง 12 สาย) — คู่ fork ของสายนี้คือ [Crusader.md](Crusader.md) (ไฟล์นี้แทนที่ Swordsman.md เดิมที่ถูกแยกออกเป็น 2 ไฟล์)

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นวัตถุดิบอ้างอิง (real skill list จาก ROX/RO classic) สำหรับออกแบบ Job Path feature จริงทีหลัง ยังไม่ใช่ feature ที่ balance แล้ว ตาราง Swordsman (1st Class) ด้านล่างเป็นเนื้อหาที่ใช้ร่วมกันกับ [Crusader.md](Crusader.md) เพราะทั้งคู่สืบทอดมาจาก Swordsman เดิม — เก็บไว้เป็นวัตถุดิบสำหรับออกแบบ Mastery Branch pool ในอนาคต (ระบบ Mastery Branch เดิมถูกลบไปรอออกแบบใหม่ตามจังหวะเลเวลล่าสุด)

## สาขาย่อยในสายนี้ (สรุปจากข้อมูล skill ด้านล่าง — ไว้ใช้ตอน curate Mastery Branch)

| สาขาย่อย | จุดเด่น |
|---|---|
| ดาบสองมือ | Crit/burst หนัก (Aura Blade, Bowling Bash AoE, Storm Slash) |
| หอก + ขี่ม้า/มังกร (Cavalry) | โจมตีเดี่ยวระยะไกล + mobility (Brandish Spear, Spiral Pierce, Dragon Breath ตอน 4th) |
| ดาบ/หอก + โล่ | สายตอบโต้/แทงค์ (Auto Counter, Weapon Blocking, Rune Shield) |

## D&D Feature Draft — Swordsman (1st Class)

> 🚧 **ฉบับร่างแรก (rev. 2)** ของการแปลง skill ROX Swordsman (1st Class) เป็น D&D feature จริง — ยังไม่ final ปรับได้หมด บันทึกไว้เป็นจุดเริ่มต้นก่อนแปลงสาย/tier อื่นต่อ อ้างอิง Mana pool = เลเวล×2 (level 3 = 6 mana) และ Save DC = 8 + Proficiency Bonus + primary ability modifier ตาม [Novice-Concept.md](Novice-Concept.md#level-progression) — **Short Rest คืน mana เท่ากับ Proficiency Bonus** (level 3 = +2) ส่วน Long Rest คืนเต็ม pool — rev. 2 ลด cost ทุกตัวลงเพราะ rev. 1 แพงเกินไปเทียบกับ pool 6 ที่ level 3 (ดูเหตุผลเต็มในแชท)

| Feature | Action | Mana | ผลลัพธ์ |
|---|---|---|---|
| **Provoke** | Bonus Action | 2 | เลือกศัตรู 1 ตัวในระยะ 60 ft ที่มองเห็น ให้ทอย **WIS Save** (DC สูตรกลาง) ถ้า fail: เป็นเวลา 1 นาที — เมื่อมันโจมตีเป้าหมายอื่นที่ไม่ใช่ Knight จะมี **Disadvantage**, เมื่อมันโจมตี Knight จะมี **Advantage** (ไม่ต้อง Concentration) |
| **Endure** | Reaction | 1 | Trigger: ถูกโจมตี/กำลังจะถูกโจมตี — ได้ **+3 AC** ย้อนหลัง (อาจทำให้ hit กลายเป็น miss) + **immune ต่อ prone/ผลักดัน** จนกว่าจะเริ่มเทิร์นถัดไปของตัวเอง |
| **Battle Will** | Bonus Action | 1 | ได้ **Advantage** กับการโจมตีด้วยอาวุธทุกครั้ง จนจบเทิร์นนี้ |
| **Bash** | Action | 1 | จ่าย 1 mana เมื่อโจมตีโดนเพื่อบังคับ **CON Save** (DC สูตรกลาง): fail = **Stunned จนจบเทิร์นถัดไปของเป้าหมาย** |
| **Magnum Break** | Action | 2 | ทุกตัวในระยะ 10 ft รอบตัว ทอย **DEX Save**: fail = **2d6 Fire dmg**, save = ครึ่งเดียว (ดาเมจอาจ scale ตามเลเวล/Job tier ทีหลัง) |
| **Increase HP Recovery** | Passive (ไม่ใช้ mana — ไม่ใช่การ "ใช้ท่า" กลางคัน) | — | จบ Short Rest แล้ว ฟื้น HP เพิ่มเท่ากับ **1d8 + Novice level** (บวกเพิ่มจาก Hit Dice ที่ใช้ปกติ) |
| **Fatal Blow** | Passive (ผูกกับ Bash) | — | เมื่อ Bash ทำให้เป้าหมายเหลือ 0 HP **หรือ** สตันเป้าหมายสำเร็จ → ฟื้น HP เท่ากับ Novice level **และ** คืน mana ที่จ่ายไปกับ Bash ครั้งนั้น 1 หน่วย |

**หมายเหตุการปรับจาก RO ต้นฉบับ**:
- Provoke: เปลี่ยนจาก "บังคับตีแต่ Knight" (RO ต้นฉบับ) → เป็น Advantage/Disadvantage แทน เพราะ D&D ไม่ค่อยมีกลไก "บังคับเป้าหมาย" ตรงๆ (ปัญหาเรื่อง immune to charm/mind-affecting) — ใช้ soft-compulsion แทน ให้ DM ตัดสินใจเองแต่มี incentive ทางกลไกชัดเจน คงราคาไว้ที่ 2 mana เพราะเอฟเฟกต์อยู่ยาว 1 นาที แรงกว่าตัวอื่นในตารางนี้
- Endure: ใส่ AC เป็น +3 (เทียบเคียง Shield spell ที่ +5 แต่ Shield คือ spell ระดับ 1 เต็มๆ อันนี้เป็นแค่ subclass feature เลยลดลง)
- Bash: **rev. 2 ตัดโบนัสดาเมจ +1d6 ออก** เหลือแค่โจมตีปกติฟรี (0 mana) + จ่าย 1 mana เฉพาะตอนอยากได้สตัน — ให้ Bash เป็น "ท่าตีหลักที่ใช้ได้ไม่จำกัด" เหมือน weapon attack ปกติของ Fighter จริงๆ ไม่ใช่ resource ที่ต้องแบ่งจ่ายทุกครั้งที่ตี
- Magnum Break: ลดจาก 3 → 2 mana ตามการปรับ cost รวมทั้งตาราง
- Fatal Blow: ตีความจาก "ฆ่าได้/บัพ/ฟื้น" เป็น proc เดียวจบ (heal + refund mana) แทนที่จะแยกเป็น 3 effect
- **Sword Mastery ตัดออก**: เป็นแค่ flat stat bonus ที่ D&D จัดการผ่าน proficiency/ASI อยู่แล้ว — จุดเชื่อมที่น่าสนใจคือ D&D 2024 มีระบบ **Weapon Mastery properties** (Cleave, Graze, Sap, Topple, Vex ฯลฯ) อยู่แล้ว อาจใช้เป็นช่องทางปลดล็อก mastery property ของดาบเร็วกว่าปกติแทน ไม่ต้องมี feature เดี่ยว
- **เหตุผลรวมของการลด cost รอบนี้**: pool 6 mana/long rest ตอน level 3 ถ้าใช้ราคา rev. 1 จะหมดตั้งแต่ fight แรก (Bash+stun 2 + Battle Will 2 = 4) ทำให้เหลือทั้งวันแค่ตีเปล่าไม่มี feature — ปรับให้ Bash ฟรี + ท่า BA/Reaction เหลือ 1 + Short Rest คืน = Prof Bonus ทำให้ทั้งวันใช้ได้จริง ~10 mana (6 + 2 + 2 จาก short rest 2 ครั้ง) ≈ 8 ครั้งทั้งวัน กระจายได้ทั่วถึงหลาย encounter โดยยังคง pool เป็นทรัพยากรแบบ Long Rest (ไม่ใช่คืนเต็มทุก short rest แบบ Warlock)

## ROX Skill Reference — Swordsman → Knight

> ตารางด้านล่างดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database?page=1) (job-database/detail/1100, 1110-1113) ครบทุกสกิลของแต่ละอาชีพ — คอลัมน์ Type/Max Lv/Description คือข้อมูลสกิลจริงในเกม (คง `%s` ตามต้นฉบับไว้แทนค่าตัวเลขที่สเกลตามเลเวลสกิล) ทุกอาชีพยังมี Talent skill กลางชื่อ "Skill #1000107" (Toggle, Lv 1, ไม่มี description ในฐานข้อมูล) ซึ่งตัดออกจากตารางเพราะไม่มีข้อมูลให้อ้างอิง

#### Swordsman (1st Class)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Bash | Active | 10 | Deal (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy. After learning Fatal Blow, this skill has a chance of stunning the target. The chance to stun increases as Fatal Blow's skill level increases. |
| Magnum Break | Active | 10 | Deals (%s% of ATK + %s) Fire physical damage to enemies within 3 meters. After casting this skill, your weapon will gain the Fire attribute, and normal attacks will deal 20% more damage for %s seconds. |
| Endure | Active | 5 | Gain the Endure effect, preventing you from being interrupted or knocked back when being attacked. Also increases DEF and M.DEF by %s. The Endure effect will be removed after 10 seconds or being attacked %s times. |
| Provoke | Active | 10 | Provoke an enemy unit within 4 meters, decreasing their DEF by %s%, increasing their ATK by %s%, and forcing them to attack you for 10 seconds. This skill does not affect players. |
| Increase HP Recovery | Toggle | 10 | Increases the effectiveness of HP recovery items by %s%. When your HP falls below 30% of Max HP, heal yourself for 4% of Max HP every 1 second for %s second(s). This effect can only trigger once every 60 seconds. After activating Self-Ignite in PVP, the skill's recovery effect will not be triggered. |
| Battle Will | Toggle | 10 | Whenever your normal attacks hit, your Physical Damage Bonus is increased by 20, increasing by %s more for every 50 STR. Can stack up to 8 times. Lasts for 5 seconds. |
| Fatal Blow | Toggle | 5 | When casting Bash, there's a %s% chance to apply Armor Break to the enemy for 5 seconds, stunning the target for 2 seconds. |
| Sword Mastery | Toggle | 10 | P.ATK is increased by (%s + %s% of STR) when equipped with a One-Handed Sword/Two-Handed Sword. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1100)

#### Knight (2nd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Spear Mastery | Toggle | 10 | P.ATK is increased by (%s + %s% of STR) when equipped with a Spear. |
| Sword Speed Boost | Active | 10 | For the next %s seconds, Final ASPD increases %s% (for every 25 AGI, effect increases 1%) points. |
| Steel Heart | Active | 10 | Within 12 seconds of using this skill, damage received decreases by %s% (increases by an additional 1% for every 50 VIT you have) and prevents you from being interrupted when being attacked. This effect will be removed after being attacked %s times. |
| Pierce | Active | 10 | Can only be used when equipped with a Spear. Continuously attack an enemy for a short time, dealing 5 attacks that inflict a total of (%s% of ATK + %s) physical damage of your weapon's attribute. Deals %s% more damage to Large targets. |
| Cavalry Combat | Toggle | 5 | Can mount Pecopeco while fighting, but Final ASPD decreases by %s% due to the restrictions of mounted combat. At max level of this skill, Final ASPD will return to normal. |
| Auto Counter | Active | 10 | Enters the Counter state and gains a shield that absorbs damage up to %s% of Max HP for 4.5 seconds. When the shield ends (it will end earlier if it reaches the damage limit), deals Neutral P.DMG equal to %s% of Max HP to all enemy units within 3 meters, and increases the target's Threat by a large amount. |
| Spear Stab | Active | 10 | Can only be used when equipped with a Spear. Deals weapon attribute P.DMG equal to (%s% P.ATK + %s) to enemy units within a 4x2 rectangular area in the direction you are facing, stunning them for 2 seconds. |
| Cavalry Mastery | Toggle | 10 | P.ATK is increased by (%s + %s% × STR) during Cavalry Combat. Each release of Normal Attacks or skills grants 1 stack of Courage, which increases MSPD by %s% and P.DEF by %s%. Stacks up to 3 times and lasts 6 seconds. Up to 1 stack of Courage can be obtained per second. |
| Bowling Bash | Active | 10 | Pulls up to 8 enemy units within 4 meters toward you, clashing with them to deal (%s% + (Number of Monsters - 1) × 50%) × ATK physical damage of your weapon's attribute. Affected targets are stunned for a short time and then knocked back 1 meter, toward their original location. |
| Spear Boomerang | Active | 10 | Can only be used when equipped with a Spear. Deals (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy unit. |
| Charge Attack | Active | 10 | Charges towards a faraway enemy target (cannot be silenced after the charge starts), dealing (%s% of ATK + %s) Neutral physical damage to enemies in a straight line and stunning them for 2 seconds. |
| Aura Blade | Active | 10 | Infuses your weapon with power, increasing Final Crit Rate by %s% (increases by an additional 1% for every 50 AGI you have) and Crit Damage Bonus by %s% (increases by an additional 1% for every 50 STR you have) for 10 seconds. Each critical hit refreshes the remaining buff time. |
| Double Blow | Toggle | 10 | When equipped with a Sword, each normal attack has a 20% chance (every 50 STR increases an additional 1%, up to 30%) of dealing bonus weapon attribute P.DMG equal to (%s% P.ATK + %s) that ignores defense. If the normal attack is critical, the bonus damage will also be critical. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1110)

#### Lord Knight (Transcendent)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Brandish Spear | Active | 10 | Can only be used when mounted in Cavalry Combat. Deals neutral attribute P.DMG equal to %s% of P.ATK to a single enemy target. (Every 60 STR increases the P.ATK coefficient by an additional %s%, up to 2,000%.) Also reduces the target's ASPD by %s% and MSPD by %s% for 4 seconds. Using a spear inflicts an additional %s% damage. |
| Weapon Blocking | Active | 10 | Enters Blocking status upon use. Has a %s% chance to weapon block enemy attacks when taking P.DMG from front enemies, up to 15 times within 6 seconds. Successful blocks negate the physical damage taken this time, and deal weapon attribute P.DMG equal to %s% P.ATK to the target (can trigger crit). When equipped with Two-Handed Sword, increases the damage coefficient by 100%. |
| Head Crush | Active | 10 | Increases P.ATK by %s% and Crit DMG by 50% for 40 seconds. Normal attacks now have a %s% chance to cause the target to Bleed for 5 seconds. When Bleeding, the target will take Neutral attribute P.DMG equal to 20% of the caster's P.ATK every second, reducing their P.ATK by 25% and their ASPD by 25%. They are not able to naturally recover HP and SP for the duration of the effect. |
| Spiral Pierce | Active | 10 | Can only be used when equipped with a Spear. Twirls the spear and rapidly thrusts at an enemy target, dealing weapon attribute P.DMG equal to (%s × STR + %s% of P.ATK). Every 80 STR increases the P.ATK coefficient by an additional %s%, up to 2,000%. |
| Concentration | Active | 10 | Marks the target on use. All friendly targets within 30 meters gain the Endure effect and deal %s% more damage to the marked target for 10 seconds. A party member will lose the Endure effect if they are more than 30 meters away from the caster. |
| Call of Justice | Toggle | 10 | Converts VIT to ATK, increasing ATK by 2 for every %s VIT (not including VIT gained through buffs) you have. |
| Joint Beat | Active | 10 | Damage an enemy's joints, reducing their combat capabilities. Deals (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy unit and has a %s% chance to cause them to gain a random debuff for 5 seconds. |
| Self-Ignite | Type 5 | 10 | Gain the Self-Ignite effect on use to inflict heavy damage upon enemies at the cost of your own HP. You will lose 1% of your Max HP every second while also dealing (%s% of Max HP + %s) Neutral sacred physical damage that ignores DEF to nearby enemies. This effect will be removed when your HP falls below 10%. You will be unable to naturally recover HP and SP while under the effect of Self-Ignite, and will be unable to trigger Increase HP Recovery's HP regen effect in PVP. This skill's damage does not work with Lifesteal. |
| Lord's Aura | Active | 10 | After using this skill, ATK of all party members within 30 meters increases by %s% for 120 seconds. A party member will lose this effect if they are more than 30 meters from the caster. |
| Berserk | Active | 10 | Gain the Berserk effect on use. Fully restores HP and empties SP, increases Max HP by %s%, ATK by %s%, and Movement Speed by 30%. Grants the Endure effect, and decreases DEF and M.DEF by 50%. While Berserk is in effect, you cannot actively use skills or healing items, healing effects are decreased by 100%, and HP and SP will not recover naturally. This effect is removed after 30 seconds or when HP falls below 5%. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1111)

#### Rune Knight (3rd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Dragon Training | Toggle | 10 | Increases damage dealt by Dragon's Breath by %s% after mounting your dragon, and damage dealt to small and medium Monsters by %s% when mounted with a spear. |
| Dragon Breath - Fire | Active | 10 | The dragon breathes scorching fire, dealing Fire attribute P.DMG equal to %s% of P.ATK to enemies in a 6-meter, 120-degree fan-shaped area at the front. Hit enemies have a %s% chance of being burned, losing 2% Max HP per second for 3 seconds. The burn effect is ineffective against MVP, MINI, and Boss. |
| Dragon Breath - Water | Active | 10 | The dragon breathes chilling air, dealing Water attribute P.DMG equal to %s% of P.ATK to enemies in a 6-meter, 120-degree fan-shaped area at the front. Hit enemies have a %s% chance of being frozen for 3 seconds. |
| Inverse Scale | Active | 10 | Your dragon projects a massive roar, dealing Regular Physical Damage equal to %s% Physical Attack to enemy targets within a 4-meter range, with a %s% chance of inflicting Terror. Targets suffering from Terror will move at random for 3 sec. Terror cannot affect Boss, MVP, or MINI targets. |
| Death Bound | Active | 10 | Inflicts Death Bound on an enemy. When attacked, %s% of lost HP will be converted into Regular Physical Damage and dealt to the bound enemy, along with multiple stacks of Threat for 4 sec (cannot be dispelled). Death Bound will be lifted when the distance between you and the target is greater than 12 meters. |
| Impact Blade | Active | 10 | Charges forward 8 meters in the desired direction and delivers a powerful blow, dealing weapon attribute P.DMG equal to (%s% P.ATK + %s% Max HP) in a 4-meter radius. |
| Rune Shield | Toggle | 10 | Summons the power of the Runes and enchants a shield, increasing the effect of [Unbreakable] when attacked. Each stack of [Unbreakable] increases Final Physical Defense and Final Magic Defense by %s% for 6 sec. Can be stacked up to 5 times, after which a Rune Shield equal to %s% of Max HP for 6 sec. This effect may be triggered once every 24 sec as long as a shield is equipped. |
| Phantom Strike | Active | 10 | Hurls a Spectral Spear in the desired direction, dragging the first enemy it touches back to you and dealing weapon attribute P.DMG equal to %s% of P.ATK. Can only be used when equipped with a Spear. The enemy will be immobilized, and their damage taken will be increased by %s% for 3 seconds when they are dragged back to you. |
| Hundred Spears | Active | 10 | Wields a lance, inflicting 10 quick jabs at a 150-degree fan-shaped area in 3 seconds and dealing weapon attribute P.DMG equal to (%s% of P.ATK + %s × STR) to all targets in range. Each time the target takes damage, the damage of the next Hundred Spears will be increased by 6%. Grants the Endure effect during the effective period. Each jab deals increased damage based on the number of enemies in range, and the increased amount equals the number of targets × 10%. |
| Wind Cutter | Toggle | 10 | Grants 1 stack of Wind Cutter effect every time a normal attack triggers a crit, increasing Crit DMG Bonus by %s% for 3 sec. Stacks up to 6 times. Upon reaching max stacks, deals an additional weapon attribute P.DMG equal to %s% P.ATK to the target each time a crit is triggered. Additional damage can crit as well. |
| Enchant Blade | Toggle | 10 | Enchants a weapon and modifies its attributes. After enhancement, normal attacks and damage will reflect the weapon's skill, with an increased %s% in corresponding elemental damage. This effect will not be triggered if a weapon's attributes are reset. |
| Dark Flame Sword | Active | 10 | Activate the power within your sword, creating a Dark Flame Sword array that follows you and grants you the Dark Flame Sword state for 24 seconds. While Dark Flame Sword is active, each normal attack that hits a target grants the party members within 30 meters a stack of the Dark Flame effect. Each stack of Dark Flame increases the Final Hit by %s% and the Final Crit by %s%. Stacks up to 12 times and lasts for 4 seconds. |
| Ignition Break | Active | 10 | Unleash a downward attack with a weapon, causing the ground to erupt in a violent explosion, inflicting Fire attribute P.DMG equal to %s% of the P.ATK to enemies within a 4-meter range. (Every 80 STR increases the P.ATK coefficient by an additional %s%, up to 1,500%.) Also inflicts a 25% Slow effect on the targets within range for 12 seconds, stacking up to 3 times. This skill can trigger crits, and the cooldown for this skill is reduced by 2 seconds every time a crit is triggered by a normal attack. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1112)

#### Dragon Knight (4th)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Servant Weapon | Toggle | 10 | The Dark Flame Sword summons 6 energy swords that transform into Servant Weapons for the duration the Dark Flame Sword exists. During normal attacks, there is a %s% chance to consume 1 energy sword to deal weapon attribute P.DMG equal to %s% of P.ATK to the target and deal weapon attribute P.DMG equal to %s% of P.ATK to all enemies within 4 meters of the target. The energy sword's damage can trigger crits. Every 5 seconds, 1 new energy sword is replenished, and for every 250% of Final ASPD, the replenishment time is reduced by 0.5 seconds, with a minimum replenishment time of 2.5 seconds for 1 energy sword. |
| Servant Weapon - Sign | Toggle | 10 | When equipped with a Servant Weapon, the range of normal attacks increases by 2 meters. Damage dealt by the Servant Weapon marks the primary target (splash damage does not mark additional enemies). While the target is marked, each time they are attacked by a member of the caster's party, there is a 20% chance to apply 1 additional mark for 10 seconds. When the mark reaches %s stacks, 1 Ultimate Servant Weapon will drop and it lasts for 10 seconds. When a party member picks it up, they instantly replenish 6 energy swords and gain the lv.%s Servant Weapon's damage effect for 10 seconds. If the caster picks it up, their energy swords will be fully replenished. No more than 1 Ultimate Servant Weapon can drop per %s seconds. |
| Servant Weapon - Phantom | Active | 10 | Teleports instantly to the target's side, dealing weapon attribute P.DMG equal to %s% of P.ATK to the target and all enemies within 6 meters of the target. This damage can trigger critical hits, and there's a %s% chance to inflict Blind to the target for 3 seconds. Casting this skill consumes all energy swords. For each 1 energy sword consumed, it increases the damage coefficient by %s%. You need at least 1 energy sword to use this skill. |
| Servant Weapon - Demolition | Active | 10 | Summons the Demolition Sword that orbits around you, with each energy sword dealing weapon attribute P.DMG equal to %s% of P.ATK every second to enemies within 6 meters. This damage can trigger critical damage. Casting this skill consumes all energy swords, and each critical hit restores 1 energy sword. The Demolition Sword lasts for %s seconds. You need at least 1 energy sword to use this skill. |
| Storm Slash | Toggle | 10 | Normal attacks and skills have a chance to grant 1 stack of Storm Force (12% chance for normal attacks, 36% for skills), lasting 8 seconds. Once you've gathered %s stacks of Storm Force, your next attack will trigger a Storm Slash, hitting the target 5 times, with each strike dealing weapon attribute P.DMG equal to %s% of P.ATK. The effect varies by weapon: Two-Handed Sword can trigger critical hits; One-Handed Sword + Shield gains +1% coefficient per 24 VIT (cap 520%); Spear gains +1% coefficient per 24 STR (cap 520%). |
| Dragonic Aura | Active | 10 | Summons a dragon from the sky to rain down blazing flames, scorching the ground and dealing Fire attribute P.DMG equal to %s% of P.ATK to enemies in a straight line. |
| Charging Pierce | Active | 10 | Using Pierce, Spear Stab, Spear Boomerang, Spiral Stab, Phantom Strike, Hundred Spears, or Madness Crusher grants you 1 stack of the Charge effect. When it reaches 12 stacks, you can activate the Pierce effect, dealing extra %s% damage with the skills listed above when using a spear, up to a maximum of 10 times. The Charging Pierce effect lasts for 12 seconds, and no further Charge stacks can be gained during that period. |
| Hack and Slasher | Active | 10 | Unleashes a powerful weapon swing, striking all targets within 4 meters and dealing weapon attribute P.DMG equal to %s% of P.ATK. If wielding a spear, deals bonus damage equal to 40 × STR. If attacking with a one-handed sword, deals bonus damage equal to 1.5% of Max HP and draws a lot of Threat. |
| Madness Crusher | Active | 10 | Harnesses the power of madness and hurls your spear at a targeted area, smashing the ground and dealing weapon attribute P.DMG equal to (%s% P.ATK + 40 × STR) to all enemies within a 6-meter radius. The impact creates a tremor that pulls enemies toward the center of the area and slows them by 33% for 5 seconds. |
| Vigor | Active | 10 | Sacrifices %s% of your Max HP to leave behind a Vigor at your location, lasting up to 12 seconds; it cannot be absorbed by you, but 1 party member can absorb it, gaining the Vigor buff. While under the effect, the party member's skill will be boosted by %s times, and their skill attacks deal bonus damage equal to %s% of the Dragon Knight's Max HP, capped at 400% of their own ATK. The Vigor buff lasts 15 seconds. If no one absorbs it, the caster recovers 10% of their HP when it disappears. |
| Two Handed Defense | Active | 10 | Charges up to enter a defensive stance, gaining %s% Final P.DMG RED and Final M.DMG RED. While charging, MSPD is reduced by %s%. When the charge ends, deals weapon attribute P.DMG equal to %s% of Max HP to all enemies within a 3-meter radius and taunts them for 0.5 seconds. For every additional 0.5 seconds of charging, the taunt range expands by 0.5 meters, the duration extends by 0.5 seconds, and extra damage equal to 0.5% of Max HP is added. |
| Dragonic Ride | Toggle | 10 | A dragon can be mounted during combat. When mounted, using Dragon Breath - Fire, Dragon Breath - Water, and Dragonic Aura increases the skill's damage coefficient by 1% for every %s STR/VIT possessed, up to 400%. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1113)
