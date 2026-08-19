# Novice Job Line: Swordsman → Knight/Crusader

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — แยกออกมาเป็นไฟล์เฉพาะสาย ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ (ดูตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) สำหรับภาพรวมทั้ง 6 สาย)

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นวัตถุดิบอ้างอิง (real skill list จาก ROX/RO classic) สำหรับออกแบบ Job Path feature จริงทีหลัง ยังไม่ใช่ feature ที่ balance แล้ว

## ROX Skill Reference — Swordsman → Knight/Crusader

> ตารางด้านล่างดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database?page=1) (job-database/detail/1100, 1110-1113, 1120-1123) ครบทุกสกิลของแต่ละอาชีพ — คอลัมน์ Type/Max Lv/Description คือข้อมูลสกิลจริงในเกม (คง `%s` ตามต้นฉบับไว้แทนค่าตัวเลขที่สเกลตามเลเวลสกิล) ทุกอาชีพยังมี Talent skill กลางชื่อ "Skill #1000107" (Toggle, Lv 1, ไม่มี description ในฐานข้อมูล) ซึ่งตัดออกจากตารางเพราะไม่มีข้อมูลให้อ้างอิง

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

#### Crusader (2nd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Riding Mastery | Toggle | 10 | You can ride the Pecopeco in battle. While mounted in Cavalry Combat, Physical Attack is increased by %s + (STR or VIT, whichever is higher) × %s%. |
| Holy Cure | Active | 10 | Recover the HP of a single friendly target unit, or your own, by Physical Attack×%s% (not affected by healing stat bonus and resistances). If the target is an undead or demon type, Holy Attribute Physical Damage equal to Physical Attack×%s% is dealt. |
| Faith | Toggle | 10 | Permanently increases max HP by %s, and increases self-healing effect by %s%. |
| Spear Mastery | Toggle | 10 | Physical Attack is increased by (%s + Strength × %s%) when using spear type weapons. |
| Holy Cross | Active | 10 | Use the strength of the holy cross to attack the enemy, dealing Holy Attribute Physical Damage to enemy units equal to %s% P.ATK. Grants a stack of Sacred Force, each of which increases P.ATK by %s% and MSPD by %s%. Stacks up to 3 times and lasts 6 seconds. Can be triggered once per second. Must have a Two-Handed Spear equipped to use. |
| Grand Cross | Active | 10 | Summon a cross-shaped holy shield around you, subjecting enemy units within 4 meters to Judex, dealing Holy Attribute Physical Damage equal to %s% P.ATK every 0.5 seconds. When there is Sacred Force, consumes one stack to increase the holy shield damage coefficient by %s% P.ATK. The holy shield lasts 3 seconds. Must have Two-Handed Spear equipped to use. |
| Shield Charge | Active | 10 | Use the shield to hit the enemy hard, dealing weapon attribute Physical Damage equal to (Physical Attack×%s% + own %s% Max HP + own Vitality×%s), with a %s% chance to stun the target for 1s. If the target is a monster, this generates a large amount of Threat. Must have Shield equipped to use. |
| Shield Boomerang | Active | 10 | Throw the shield at the enemy unit from a distance, dealing weapon attribute P.DMG equal to (%s% of P.ATK + %s% of Max HP + %s of VIT), ricocheting off the next enemy target within 6 meters. The ricochet damage equals the throwing damage and continues ricocheting for a maximum of 2 times (each target can only take damage from this skill once). Must have the shield equipped to use. |
| Guard | Toggle | 10 | When a shield is equipped, there is a %s% chance to defend automatically when attacked. Damage blocked cannot exceed %s% of Max HP. Must have Shield equipped to use. |
| Weapon Speed | Toggle | 10 | Each time the active skill is used, you enter a Quickened weapon state, where attack speed is increased by %s and Crit increased by %s for 10s. Can be activated a max of one time every 30s. |
| Sacrifice | Active | 10 | Deduct %s% Max HP from yourself to enter the Sacrifice state, where the next %s normal attacks each have an additional weapon attribute Physical Damage (can Crit) equal to %s% Max HP. The Sacrifice state lasts 6s, and in this state normal attacks cannot be dodged. At the end of the Sacrifice state, you recover HP equal to (0.8% Max HP × Number of Crits). (The recovery effect is not affected by healing bonuses and reductions.) Must have Two-Handed Sword equipped to use. |
| Cyclone Strike | Active | 10 | Swing the sword, dealing weapon attribute Physical Damage (can Crit) to enemies within 4 meters equal to (Physical Attack×%s% + own %s% Max HP), and recover HP equal to %s% of total damage dealt. (The recovery effect is not affected by healing bonuses and reductions.) Must have Two-Handed Sword equipped to use. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1120)

#### Paladin (Transcendent)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Punish | Active | 10 | Hit the target hard, dealing Holy Attribute Physical Damage to the target and targets within 3 meters equal to %s%. If the target is an undead or demon monster type, damage is increased by %s%. |
| Prestige | Active | 10 | Transforms your armor and that of %s team member(s) to the Holy Attribute, and increases Anti-Crit by %s% and Crit DMG reduction by %s%. Lasts %ss. |
| Gospel | Toggle | 10 | Each time a skill is used, you have a %s% chance to obtain the Holy Sound state, which increases the damage you deal by %s% for 3s. Can be activated a max of one time every 3s. |
| Pinpoint Attack | Toggle | 10 | Aim at the target's vitals, increasing the Final Physical Penetration by %s% when using Spear type weapons (every 50 STR increases Final Physical Penetration by an extra 1%), dealing an additional %s% damage to small and medium-sized monsters. |
| Moon Slasher | Active | 10 | Launch a sweeping attack on enemies within 4 meters, dealing weapon attribute Physical Damage equal to (%s% + (Number of targets -1) ×%s%) P.ATK, and stunning them for 2 seconds. This generates the Moon Formation within a range of 4 meters, and enemy units in it deal %s% reduced damage to you for 6s. Consumes all stacks of Sacred Force if any — depending on stacks consumed (2/6/10), Kyrie Eleison blocks 6%/18%/30% of Max HP damage over the next 12 seconds. Must have Two-Handed Spear equipped to use. |
| Pressure | Active | 10 | Deals Holy Attribute Physical Damage to the target equal to %s% P.ATK, inflicting a Pressure mark. Every time you're attacked by your Holy Attribute, an additional Pressure mark is added (each stack increases damage the target takes from team members by 1%, max %s stacks, lasts 6s). Consumes all stacks of Sacred Force if any; when Pressure ends, deals Holy Attribute Physical Damage equal to P.ATK × (313%/713%/1213% × stacks consumed). |
| Shield Reflect | Toggle | 10 | Every time you are hit by a melee Physical Attack that deals damage, the attacker is dealt weapon Physical Damage equal to own Max HP %s%, and damage from automatic defense will also reflect damage. Must have Shield equipped to use. |
| Defending Aura | Active | 10 | Summon a light shield to protect yourself; for 5s, damage you take is reduced by %s%. For 5s, it also reduces the attacker's Movement Speed by %s%, and damage from automatic defense also slows the attacker. Must have Shield equipped to use. |
| Earth Drive | Active | 10 | Slams the shield to the ground, dealing weapon attribute P.DMG to all enemies within 4 meters equal to (%s% P.ATK + %s% Max HP) and increasing the target's damage taken by %s% for 3 seconds. If there is only one target within range, an additional weapon attribute P.DMG equal to %s% of Max HP is dealt. If the target is a monster, a large amount of Threat is added. Must have Shield equipped to use. |
| Battle Intent | Toggle | 10 | Gain 1 stack of Battle Intent per normal Crit for 3s, stacking up to 50 times. Each stack increases Final Crit by %s% and Crit Damage Bonus by %s%. Whenever you take a hit exceeding 35% of your Max HP, (%s% × remaining Battle Intent stacks) damage is reduced (up to 20 stacks; can reduce True Damage, lowers Battle Intent after triggering). Must have Two-Handed Sword equipped to use. |
| Charge Up | Active | 10 | Gather energy and use up 10 stacks of Battle Intent to deal a heavy slash to the target, dealing weapon attribute Physical Damage (can Crit) equal to Physical Attack×(%s% + remaining Battle Intent stack × %s% × Max HP), recovering HP equal to %s% Max HP × remaining Battle Intent stacks. (Recovery not affected by healing bonuses/reductions.) Must have Two-Handed Sword equipped to use. |
| Fearless Charge | Active | 10 | At the cost of %s% of your Max HP, deal weapon attribute Physical Damage (can Crit) equal to (Physical Attack×%s% + %s%×own Max HP); if this triggers a Crit, %s% of Max HP is recovered and cooldown is reduced by 1s. (Recovery not affected by healing bonuses/reductions.) Must have Two-Handed Sword equipped to use. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1121)

#### Royal Guard (3rd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Gryphon Training | Toggle | 10 | You can ride the Gryphon in battle. While mounted, your slow and stun resistance is increased by %s%. |
| Trample | Active | 10 | The Gryphon rushes to the specified area, trampling all enemies within 4 meters when it reaches its destination, dealing weapon attribute physical Damage equal to Physical Attack×%s%, and stunning them for 5s. |
| King's Grace | Active | 10 | Applies a shield to all friendly units in your team equal to %s% of your Max HP, lasting up to 2s. When the shield disappears, it deals weapon physical Damage to all enemy units within 3 meters equal to %s% of the shield's initial value. |
| Over Brand | Active | 10 | Charge the target 4 times to make a crossed spear formation, with each charge dealing weapon attribute physical Damage equal to Physical Attack×%s%, inflicting a stack of Bleed. |
| Ray of Genesis | Active | 10 | The wrath of the messenger of gods descends from the sky, dealing Holy Attribute Physical Damage to all enemies within 4 meters of the specified location equal to %s% P.ATK. |
| Providence | Toggle | 10 | Increases your Holy attribute damage dealt to Earth, Fire, Water, and Wind attribute enemies by %s%. |
| Guardian Shield | Toggle | 10 | Increases Shield Charge, Shield Boomerang, and Earth Drive damage by %s%. When the shield is equipped, you gain an additional %s% Physical Defense and Magic Defense. |
| Devotion | Active | 10 | Demonstrates death-defying courage and enters the Devotion state, increasing Max HP by %s%. However, your P.ATK is reduced by 50% during the period. |
| Shield Press | Active | 10 | Raise the shield and charge straight ahead, inflicting Overpower on enemies along your path and knocking them back 8 meters. |
| Oath Blade | Toggle | 10 | When you take damage exceeding 30% of your Max HP within 3s, you enter an Oath Blade state and get a shield equal to %s% of your Max HP. |
| Life Vow | Active | 10 | Deduct 10% of your Max HP, and designate an enemy to form a Life Vow with (exclusive effect). |
| Inspiration | Active | 10 | Summons the Holy Spirit to possess you, entering the Inspiration state for 10s, during which your normal attacks are turned into Holy Spirit Radiance. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1122)

#### Imperial Guard (4th)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Offensive Stance | Type 5 | 10 | Enters an attack stance and gains effects based on the equipped weapon type: One-Handed Sword & Shield increases P.ATK by %s% and damage taken by %s%; Two-Handed Sword increases P.ATK by %s%; Two-Handed Spear increases Holy Enhancement by %s% and Neutral Enhancement by %s%. |
| Defensive Stance | Toggle | 10 | Enters Defensive Stance automatically upon deactivating Offensive Stance, increasing PVP Debuff Duration Reduction by %s and PVP Debuff Resistance by %s. While in Defensive Stance, switching back to Offensive Stance is not allowed within 10 seconds. |
| Overslash | Active | 10 | Can only be used in Offensive Stance. Teleports to the target and delivers a slashing attack, dealing weapon attribute P.DMG equal to %s% of P.ATK. Consumes all Rage stacks to deal additional weapon attribute P.DMG equal to (caster's 3% of Max HP × Rage stacks, up to %s times the caster's P.ATK). The skill can trigger crits. |
| Rage Burst | Toggle | 10 | Using skills that consume Max HP grants 2 Rage stacks, lasting 5 seconds (max 6 stacks). Each Rage stack increases Final Crit by %s% and Crit DMG Bonus by %s%. Each additional Rage stack makes normal attacks apply Sacrifice's additional damage effect once; a critical hit reduces Sacrifice's cooldown by 1 second (triggers once per stack). Switching to Defensive Stance stops Rage from stacking. |
| Stance Shift | Toggle | 10 | When Max HP falls below %s%, the stance shifts from offensive to defensive automatically. Recovering Max HP to %s% or remaining unharmed during Defensive Stance for 6 seconds restores Offensive Stance once its cooldown is over. Upon switching to Defensive Stance, all party members gain the Engagement effect for %s second(s), empowering their next attack with additional attribute damage equal to %s% of the attacker's Adaptive ATK. |
| Shield Shooting | Active | 10 | Hurls a shield, striking enemies within a 6-meter radius and dealing weapon attribute P.DMG equal to (%s% of P.ATK + (%s% of Max HP + %s × VIT, up to %s times the P.ATK)). After switching to Offensive Stance and releasing Shield Shooting, for the next 10 seconds using Shield Charge, Shield Boomerang, or Earth Drive grants a %s% chance to increase the skill's P.ATK coefficient by an additional %s%. |
| Rebound Shield | Active | 10 | Can only be used in Defensive Stance. Raises the shield to activate a Holy Shield Zone, absorbing damage for all allies within a 4-meter radius (excluding MVP/MINI/Boss damage). While active, MSPD is reduced by %s% and skills cannot be used; lasts 3 seconds. When it ends, enters Offensive Stance automatically and releases the absorbed damage in front, dealing weapon attribute P.DMG equal to (%s% of P.ATK + %s% of Max HP + %s × VIT, up to %s times the caster's P.ATK) to all enemies within a 12×6 meter straight-line area. |
| Ultimate Sacrifice | Active | 10 | Can only be used in Defensive Stance. Consumes %s% of Max HP to revive all fallen party members within a 30-meter radius, restoring them to %s% and %s% of their Max HP and Max SP, respectively. Casting this skill clears your Devotion status; switching to Offensive Stance is not allowed for the next 10 seconds. |
| Imperial Force - Unity | Toggle | 10 | Allows riding an Imperial Gryphon in combat. While in Offensive Stance, gains %s%/%s%/%s% Bonus DMG against Dragon/Undead/Formless monsters, sharing %s% of this effect with all party members. While in Defensive Stance, gains %s% Final P.DEF and %s% Final M.DEF, sharing %s% with all party members. For every additional party member, all allies gain 1 stack of Unity; each stack increases the shared effect by %s%. |
| Blessed Force | Toggle | 10 | While possessing Sacred Force, your weapon attribute becomes Holy. In Offensive Stance, automatically regenerates 1 stack of Sacred Force every %s seconds during combat. Using Holy Cross grants a %s% chance to gain 1 extra stack of Sacred Force. Using other skills has a %s% chance to consume 1 stack of Sacred Force. |
| Grand Judgment | Active | 10 | Can only be used in Offensive Stance. Summons holy light to sentence the target, dealing Holy weapon attribute P.DMG equal to %s% of P.ATK. Consumes all Sacred Force stacks to deal additional Holy attribute P.DMG equal to (%s% × Sacred Force stacks) of P.ATK. |
| Cross Rain | Active | 10 | Can only be used in Offensive Stance. Summons a holy field for 3 seconds, dealing Holy attribute P.DMG equal to %s% of P.ATK to all targets within a 6-meter radius every 0.3 seconds. With Sacred Force, damage is increased by an additional (%s% × Sacred Force stacks). When Cross Rain ends, it creates a Cross Field lasting 10 seconds, granting party members inside the Judgment effect, boosting damage dealt to MVP and MINI units by %s%. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1123)

## Mastery Branches (ทำแล้ว)

สายนี้เป็นสายเดียวที่มี Mastery Branch Pool ทำครบเป็นตัวอย่างแล้ว — ดู [Mastery-Branches.md § Mastery Branch Pool — Swordsman Lineage](Mastery-Branches.md#mastery-branch-pool--swordsman-lineage)
