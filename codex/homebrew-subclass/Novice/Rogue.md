# Novice Job Line: Rogue (Thief → Rogue → Stalker → Shadow Chaser → Abyss Chaser)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — แยกออกมาเป็นไฟล์เฉพาะสาย 1 ไฟล์ต่อ 1 fork ตั้งแต่ Second Class เป็นต้นไป (ดีไซน์ปัจจุบันข้าม First Class เป็น mechanical step แล้ว — เลือกตรงเป็น Second Class ตั้งแต่เลเวล 3) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ (ดูตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) สำหรับภาพรวมทั้ง 12 สาย) — คู่ fork ของสายนี้คือ [Assassin.md](Assassin.md) (ไฟล์นี้แทนที่ Thief.md เดิมที่ถูกแยกออกเป็น 2 ไฟล์)

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นวัตถุดิบอ้างอิง (real skill list จาก ROX/RO classic) สำหรับออกแบบ Job Path feature จริงทีหลัง ยังไม่ใช่ feature ที่ balance แล้ว ตาราง Thief (1st Class) ด้านล่างเป็นเนื้อหาที่ใช้ร่วมกันกับ [Assassin.md](Assassin.md) เพราะทั้งคู่สืบทอดมาจาก Thief เดิม — เก็บไว้เป็นวัตถุดิบสำหรับออกแบบ Mastery Branch pool ในอนาคต (ระบบ Mastery Branch เดิมถูกลบไปรอออกแบบใหม่ตามจังหวะเลเวลล่าสุด)

## สาขาย่อยในสายนี้ (สรุปจากข้อมูล skill ด้านล่าง — ไว้ใช้ตอน curate Mastery Branch)

| สาขาย่อย | จุดเด่น |
|---|---|
| Dagger Melee | โจมตีประชิด/ขโมยค่าสเตตัส (Back Stab, Raid, Snatcher) |
| Bow Ranged | ยิงธนูผสมพิษระยะไกล (Assault, Double Strafe, Ranged Toxic Attack) |
| Utility/Debuff | Strip อุปกรณ์ศัตรู, ขโมยสกิล, กับดักมิติ (Strip Weapon/Armor, Plagiarism, Dimension Door) |

## ROX Skill Reference — Thief → Rogue

> ตารางด้านล่างดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database?page=1) (job-database/detail/1400, 1420-1423) ครบทุกสกิลของแต่ละอาชีพ — คอลัมน์ Type/Max Lv/Description คือข้อมูลสกิลจริงในเกม (คง `%s` ตามต้นฉบับไว้แทนค่าตัวเลขที่สเกลตามเลเวลสกิล) Shadow Chaser มี Talent skill กลางเพิ่มเติม (Type 6, Lv 1, ไม่มี description ในฐานข้อมูล) ซึ่งตัดออกจากตาราง

#### Thief (1st Class)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Double Attack | Toggle | 10 | When you deal normal attacks while equipped with a Dagger, there will be a %s% chance to deal double damage. If Double Attack is triggered, then this attack is guaranteed to hit the target. After the Hiding status is removed, the first attack within 5 seconds is guaranteed to be triggered. |
| Improve Dodge | Toggle | 10 | Increases Final Flee by %s% and MSPD by %s%. Fleeing increases P.ATK by %s% and Final ASPD by %s% for 5 seconds. |
| Hiding | Active | 10 | After using this skill, you maintain %s% of your MSPD for 6 seconds and enter the Hiding state, becoming undetectable to enemies. Actively attacking, taking damage, or being affected by anti-stealth will cancel the Hiding state. After the Hiding state is removed, you will receive an Assassinate effect for 3 seconds. Dealing damage the first time under the Assassinate effect applies an Assassination mark to the first target that takes damage from you. This mark lasts for 6 seconds. Your attacks will deal %s% increased damage to the marked target. |
| Brute Force | Active | 10 | Deals (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy target and lowers their Movement Speed by 40% for 5 seconds. |
| Ambush | Active | 10 | Deals (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy. If used while Hiding, stuns the target for 2 seconds. |
| Venom Knife | Active | 10 | Attack with Venom Knife, dealing (%s% of ATK + %s) physical damage of your weapon's attribute to an enemy. If the target of Venom Knife is poisoned, deals an additional 100% physical damage of your weapon's attribute. |
| Detoxify | Active | 5 | Removes the Poison status from yourself and all party members within 30 meters and makes you and your party members immune to Poison for 8 seconds. Loses its effect when the caster is more than 30 meters away. When the Poison effect is removed by Detoxify, the target is healed for %s% of their current HP. |
| Enchant Poison | Active | 10 | Apply poison to your weapon. Your normal attacks deal %s% Poison physical damage for %s seconds and has a %s% chance to poison the target for 7 seconds. The poison on your weapon will not be removed when you are killed. When poisoned, the target will take Poison physical damage equal to 20% of the caster's Physical ATK every second, their DEF will be decreased by 25%, and they will not naturally recover HP and SP for the duration of the effect. The damage effect can stack up to 5 times. When the target's HP is less than 25%, they will stop taking damage, but the poison will still be in effect. |
| Grimtooth | Active | 10 | Shoots spikes in the specified direction, dealing (%s% of P.ATK + %s) weapon attribute P.DMG to enemies within the area and stuns them for 3 seconds. Every 7 STR increases the damage coefficient by an extra 1%, up to 1700%. When using this skill while Hiding, there is a %s% chance that using this skill will not cancel Hiding. If your Final Crit is higher than Final Penetration, this skill may trigger critical damage. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1400)

#### Rogue (2nd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Compulsion Discount | Toggle | 10 | Enjoy a %s% discount when purchasing items from NPC shops and a %s% discount when purchasing items from the Chamber of Commerce using Zeny. |
| Dip | Toggle | 10 | After using Enchant Poison, your weapon attribute will change to Poison. Each normal attack will have an 8% chance to grant you the Dip state. The Dip state can stack up to %s times and last for 10 seconds. Each stack of Dip increases your Poison Attribute Enhancement by 1%. |
| Evoked | Toggle | 10 | When equipped with a Dagger, gain a 20% chance to increase your P.PEN by %s when dealing damage. When equipped with a Bow, gain a 20% chance to increase your Crit by %s and your Crit DMG Bonus by %s% when dealing damage. This effect lasts 2 seconds. |
| Assault | Active | 10 | Launches a ranged attack that targets the enemy's vital points, dealing weapon attribute P.DMG equal to %s% of P.ATK. |
| Double Strafe | Active | 10 | Fires two arrows at the same time, each arrow dealing weapon attribute P.DMG equal to %s% of P.ATK to a single enemy target (this damage can be critical). Each critical normal attack reduces the skill's cooldown by 1 second. Must equip a Longbow to cast. |
| Ranged Toxic Attack | Active | 10 | Shoots a poisonous arrow, dealing 200% weapon attribute P.DMG to the target (this damage can be critical). When in the Dip state, you additionally deal Poison P.DMG equal to (42% x Dip Stacks ^1.8) x P.ATK to the target and enemies within 4 meters of the target (this damage can be critical). After this skill hits, it consumes all of your Dip stacks. Must equip a Longbow to cast. |
| Repeated Shot | Toggle | 10 | Normal attacks have an 8% chance to cast Lv.%s Double Strafe. Must equip a Longbow to trigger. |
| Vulture's Eye | Toggle | 10 | Increases the skill range of Bow Normal Attack, Assault, Ranged Toxic Attack, Double Strafe, Repeated Shot, Triangle Slot, and Bone Rotting Arrow by %s meters. Each point of STR additionally increases Hit by 1. |
| Dagger Mastery | Toggle | 10 | Rogue can equip two daggers. When using dagger-type weapons, P.ATK increases by (DEX x %s%). |
| Back Stab | Active | 10 | Deals weapon attribute P.DMG equal to %s% of P.ATK + DEX x %s to an enemy unit. When behind the target, increases damage dealt by 100%. Must equip a Dagger to cast. |
| Raid | Active | 10 | Deals weapon attribute P.DMG equal to %s% of P.ATK + %s x DEX to enemies within 4 meters and has a %s% chance to inflict the Blind state. The Blind state lasts 3 seconds. Must equip a Dagger to cast. |
| Close Confine | Active | 10 | Captures the target and afflicts them with Overpower for 6 seconds. Captured targets cannot move or use normal attacks, and take weapon attribute P.DMG equal to %s% of P.ATK + DEX x %s every 0.5 seconds. During Close Confine, you cannot use normal attacks or skills. Close Confine ends prematurely when you move or if the target dies. The target can use Hiding, Charge Attack, Sonic Wave, Trample, Shield Press, Body Relocation, Flame Shock, Roll Away, Warg Strike, Marionette Control, Front Side Slide, or Self Destruction to escape Close Confine, but cannot cast any other skills while it is active. Must equip a Dagger to cast. Close Confine's control effect does not work against MVP, Mini, and Boss units. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1420)

#### Stalker (Transcendent)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Plagiarism | Active | 5 | After use, there is a 50% chance of copying a random active attack skill from the enemy player. The level of the copied skill is (%s x max level of the target skill / 5). |
| Filch | Toggle | 10 | Boosts the Base EXP and Job EXP you acquire by %s%. When you kill a monster, there is a 15% chance to gain an additional %s% of Zeny from the monster. |
| Gangster's Paradise | Toggle | 10 | When the number of enemy units within 4 meters of yourself is less than 2, increases your P.ATK by %s%. |
| Strip Accessory | Active | 10 | Strips one of the enemy target's accessories in a very fast way. The base success rate of stripping is %s%. |
| Triangle Slot | Active | 10 | Shoot three arrows at the same time, each arrow dealing weapon attribute P.DMG equal to %s% of P.ATK, which can trigger Critical Hits. |
| Bone Rotting Arrow | Active | 10 | Rains down an Arrow Shower over a specified range of 4 meters, dealing weapon attribute P.DMG equal to %s% of P.ATK to all enemy targets. |
| Man Hole | Active | 10 | Draw a Man Hole trap on the ground with a radius of 3 meters, lasting 100 seconds. When triggered, the nearest 1 enemy in the area of effect will be sucked into the center of the trap. |
| Poison Death Arrow | Toggle | 10 | When Repeated Shot triggers Double Strafe, there is a %s% chance to add 1 stack of Dip to yourself. |
| Intimidate | Active | 10 | Deals weapon attribute P.DMG equal to (%s% of P.ATK + DEX x %s) to enemy units, with a (%s% + 1% x (Max((your level − the enemy's level), 0)^2) / 10) chance of hijacking the target to teleport to random nearby areas of the same map. |
| Strip Armor | Active | 10 | Strips the enemy target's armor, muffler, or shoes (one of the above) in a very fast way. The base success rate of stripping is %s%. |
| Shadow Pierce | Active | 10 | Attaches Shadow Power to your dagger and strikes forward within a range of 6 meters, dealing weapon attribute P.DMG equal to ((300% + (8 − number of Hits) x %s%) of P.ATK + DEX x (8 − number of targets) x 30) to each target in your path. |
| Reject Sword | Active | 10 | When enabled, you will enter the state of Reject Sword. When you receive melee P.DMG, reflects %s% of the damage to the attacker. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1421)

#### Shadow Chaser (3rd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Shadow Form | Active | 10 | Transforms yourself into a shadow form and attaches to the target's shadow. Cannot be selected by others. %s% of the damage received during this period will be taken by the target (up to 100% of your Max HP). Meanwhile, enjoys %s% of the target's healing received (up to 100% of your Max HP). The possession lasts 3 seconds. After it ends, slashes the target once, dealing weapon attribute P.DMG equal to (%s% of P.ATK + DEX x %s). During the possession, you cannot be selected as a skill target and you will be immune to area damage, but you are not immune to damage caused by the debuff that you are carrying. |
| Deadly Infect | Toggle | 10 | When you are inflicted with a debuff such as Freeze, Silence, Blind, Confuse, Petrify, Stun, Curse, or Immobilize, there is a %s% chance of inflicting the same one on the caster for 3 seconds. Triggers once at most every 9 seconds. |
| Feint Bomb | Active | 10 | Draw a dummy in place, then retreat 8 meters immediately. After 1 second, the dummy explodes, dealing weapon attribute P.DMG equal to (%s% of P.ATK + DEX x %s) to enemies within 4 meters. This skill consumes 1 Paint Brush and Surface Paint. |
| Chaos Panic | Toggle | 10 | The Rogue flashes out from the shadow. When you appear from Shadow Form or from Hiding, there is a %s% chance to put enemies within a 4-meter radius into the state of Confuse or Fear for 3 seconds. For every 1 enemy who enters the state of Confuse or Fear, gain a stack of Frenzy for yourself. Each stack of Frenzy increases your P.ATK by %s%, DEX by %s points, and MSPD by 0.2 points. Stacks up to 5 times, and lasts 10 seconds. |
| Dimension Door | Active | 10 | Draw the Dimension Door at the enemy target's location. 3 seconds later, teleport the target to the location of the Dimension Door. If the target is not in the current scene or the target is more than 20m away from the trap, they cannot be teleported. This skill consumes 1 Paint Brush and Surface Paint. |
| Shadow Spell | Active | 10 | Enter the Shadow Spell state after use. When attacking a target with Normal Attack, Double Strafe, Repeated Shot, or Triangle Slot, additionally deals weapon attribute P.DMG equal to %s% of the original skill damage to enemies within a 4m radius of your target (if this attack kills the target or if the target dies before the arrow hits, area damage cannot be triggered). The Shadow Spell state lasts 6 seconds. |
| Phantom Raid | Toggle | 10 | Rogues are proficient in hiding and launching attacks. When in the Hiding state, taking damage will not reveal yourself. The Hiding state also adds 20 stacks of Ghost Power to yourself, forcing your weapon attribute to turn into Ghost during the period. Launching normal attacks with a bow reduces 1 stack of Ghost Power; triggering Double Strafe with Repeated Shot, or releasing Ranged Toxic Attack, Double Strafe, Triangle Slot, or Bone Rotting Arrow reduces 3 stacks of Ghost Power. Using normal attacks or skills that consume Ghost Power, or casting Shadow Spell, will not reveal yourself. During Hiding, when normal attacks trigger Critical Hits, there is a %s% chance to add 1 stack of Ghost Power; when Ranged Toxic Attack, Double Strafe, Triangle Slot, or Bone Rotting Arrow triggers Critical Hits, there is a %s% chance to add 3 stacks of Ghost Power to yourself. When Hiding ends, the effect of Ghost Power will also end. |
| Dormancy | Toggle | 10 | Reduces damage received by %s% while Hiding. When Hiding is in cooldown, killing each enemy shortens the cooldown of Hiding by %s second(s). Killing an Adventurer shortens the cooldown of Hiding by an additional %s second(s). While under the effect of Hiding, using Enchant Poison will not clear your Hiding effect. |
| Strip Weapon | Active | 10 | Strips the enemy target's primary and secondary weapons in a very fast way. The base success rate of stripping is %s%. Based on the DEX difference on both sides, the success rate of this skill will be increased by (your DEX − target's DEX) / 5,000 x %s%. The stripped equipment cannot provide attribute bonus to the carrier within 10 seconds. Enemy units that have been disarmed cannot launch normal attacks. When casting the skill on monsters, decreases the monsters' P.ATK and M.ATK by %s%. |
| Snatcher | Active | 10 | Strike the target, dealing weapon attribute P.DMG equal to %s% of your P.ATK. There is a 50% chance to snatch %s points of the target's highest stat. Based on the DEX difference between you and the target, you may gain additional (your DEX − target DEX) / 100 points of the snatched stat for 8 seconds. While the target's stat is being snatched, they cannot be snatched again. You can snatch no more than one target at a time. A Dagger must be equipped to cast the skill. |
| Shadow Cage | Active | 10 | Summons a Shadow Cage around the target with a side length of 8 meters. The cage exists for 3 seconds, during which enemies other than the selected targets will be knocked back after entering the prison, and the Final P.DEF of enemy targets in the prison will be decreased by %s%. When the selected target leaves the Shadow Cage, they will receive True DMG equal to %s% of Max HP, and their MSPD will be decreased by 75% for 6 seconds. The Shadow Cage will disappear after the target leaves it. Must have a Dagger equipped to use. (This skill does not apply to MVP, MINI, and BOSS.) |
| Bloody Lust | Toggle | 10 | When you deal damage to an enemy using Ambush, Back Stab, Shadow Pierce, or Snatcher, inflicts Bleed on the target, causing them to receive neutral attribute P.DMG equal to %s% of your P.ATK per second for 10 seconds. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1422)

#### Abyss Chaser (4th)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Abyss Slayer | Active | 10 | Channels the abyssal power into the body, gaining 5 Abyssal Orbs, which grants the ability to harness abyssal power. Using this skill while Hiding does not remove the Hiding effect. Each active Abyssal Orb increases PVP Debuff Resistance by %s and PVP Debuff Duration Reduction by %s. While under the effect of Abyss Slayer, using skills or normal attacks, there's a %s% chance to deal extra damage equal to %s% of the target's Max HP (up to %s of the caster's P.ATK). This effect triggers once every 1 second and the Abyssal Orb lasts for 12 seconds. |
| Shadow Equipment Disarm | Toggle | 10 | Upon an unsuccessful equipment strip, when neither Double Strip nor Strip All fails to trigger, there's a chance to trigger Shadow Equipment Disarm. The base success rate is %s%, which increases based on the DEX difference between the caster and the target. For every %s DEX difference, the success rate increases by 1%, up to 20%. If successful, the target's Shadow Equipment's Inscription and Pioneer effects are disabled for the next 12 seconds. |
| Abyss Square | Active | 10 | Consumes 1 Abyssal Orb to summon a 6-meter-wide Abyss Square, dealing weapon attribute P.DMG equal to %s% of P.ATK every 0.5 seconds to all enemies within Abyss Square and pulling them toward the center. Abyss Square lasts for 5 seconds. If your Final Crit is higher than Final P.PEN, this skill may trigger critical damage. |
| Omega Abyss Strike | Active | 10 | Consumes 1 Abyssal Orb to call forth a devastating meteor, dealing weapon attribute P.DMG equal to %s% of P.ATK to all enemies within a 6-meter radius. Enemies within the Abyss Square receive an additional %s% damage. When possessing Abyssal Orbs, this skill's cooldown is reduced to 10 seconds. If your Final Crit is higher than Final P.PEN, Omega Abyss Strike may trigger critical damage. |
| From the Abyss | Toggle | 10 | When using a longbow, there's a %s% chance for Shadow Spell to consume 1 Abyssal Orb, creating a 4-meter radius abyssal zone that lasts for 3 seconds at the target area. Targets within the abyssal zone are inflicted with Blind and Confuse. Triggers once every 3 seconds. |
| Dagger & Bow Mastery | Toggle | 10 | When equipping a longbow, increases your damage dealt to Large monsters, Medium monsters, Small monsters, and Demi-Human monsters by %s%, %s%, %s%, %s%, respectively. For every 200 STR, your Hit is increased by %s. |
| Chain Reaction Shot | Active | 10 | Wraps an arrow with chains and fires it at the target, dealing weapon attribute P.DMG equal to %s% of P.ATK upon hit, with potential critical damage. The chains then trap the target, dealing the same damage to other enemies (up to 6) within 6 meters and trapping them as well. The trap effect lasts for 1.5 seconds. |
| Frenzy Shot | Active | 10 | With a surge of speed, rapidly fires 5 arrows, each dealing weapon attribute P.DMG equal to %s% of P.ATK. These arrows may trigger critical damage, and the caster becomes untargetable while casting the skill. Frenzy Shot deals an additional %s% damage to enemies within Abyss Square. |
| Magic Sword Mastery | Toggle | 10 | When equipping a dagger, increases your PVP Final P.DMG Bonus by %s%. When your DEX reaches 3,000, every additional DEX increases your P.ATK by 4. When attacking a target within Abyss Square, Deft Stab, Unlucky Rush, and Abyss Dagger deal an additional %s% damage. |
| Deft Stab | Active | 10 | Executes 5 rapid strikes on the target, dealing weapon attribute P.DMG equal to %s% of P.ATK in total. When attacking targets inflicted with Curse, Blind, Confuse, Fear, or Slow, their debuff durations are reset to 5 seconds (only applies on debuffs with less than 5 seconds remaining). For every successful debuff reset, your DEX is increased by %s%, stacking up to 5 times and lasting 10 seconds. |
| Unlucky Rush | Active | 10 | Dashes toward the target, dealing weapon attribute P.DMG equal to %s% of P.ATK and there's a %s% chance to inflict Curse on the enemy. While under the effect, the target's Max HP is reduced by %s%, with the healing received and recovery effect reduced by %s% (ineffective against MVP, MINI, and Boss). The Curse lasts for 10 seconds. |
| Abyss Dagger | Toggle | 10 | When possessing Abyssal Orbs, every dagger attack has a %s% chance to consume 1 Abyssal Orb, summoning 5 Abyss Daggers around the target and attacking the target 5 times, dealing weapon attribute P.DMG equal to %s% of P.ATK in total. Triggers once every 2 seconds. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1423)
