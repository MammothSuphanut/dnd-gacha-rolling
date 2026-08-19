# Novice Job Line: Crusader (Swordsman → Crusader → Paladin → Royal Guard → Imperial Guard)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — แยกออกมาเป็นไฟล์เฉพาะสาย 1 ไฟล์ต่อ 1 fork ตั้งแต่ Second Class เป็นต้นไป (ดีไซน์ปัจจุบันข้าม First Class เป็น mechanical step แล้ว — เลือกตรงเป็น Second Class ตั้งแต่เลเวล 3) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ (ดูตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) สำหรับภาพรวมทั้ง 12 สาย) — คู่ fork ของสายนี้คือ [Knight.md](Knight.md) (ไฟล์นี้แทนที่ Swordsman.md เดิมที่ถูกแยกออกเป็น 2 ไฟล์)

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นวัตถุดิบอ้างอิง (real skill list จาก ROX/RO classic) สำหรับออกแบบ Job Path feature จริงทีหลัง ยังไม่ใช่ feature ที่ balance แล้ว ตาราง Swordsman (1st Class) ด้านล่างเป็นเนื้อหาที่ใช้ร่วมกันกับ [Knight.md](Knight.md) เพราะทั้งคู่สืบทอดมาจาก Swordsman เดิม — เก็บไว้เป็นวัตถุดิบสำหรับออกแบบ Mastery Branch pool ในอนาคต (ระบบ Mastery Branch เดิมถูกลบไปรอออกแบบใหม่ตามจังหวะเลเวลล่าสุด)

## ROX Skill Reference — Swordsman → Crusader

> ตารางด้านล่างดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database?page=1) (job-database/detail/1100, 1120-1123) ครบทุกสกิลของแต่ละอาชีพ — คอลัมน์ Type/Max Lv/Description คือข้อมูลสกิลจริงในเกม (คง `%s` ตามต้นฉบับไว้แทนค่าตัวเลขที่สเกลตามเลเวลสกิล) ทุกอาชีพยังมี Talent skill กลางชื่อ "Skill #1000107" (Toggle, Lv 1, ไม่มี description ในฐานข้อมูล) ซึ่งตัดออกจากตารางเพราะไม่มีข้อมูลให้อ้างอิง

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
