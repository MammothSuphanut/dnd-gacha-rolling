# Novice Job Line: Blacksmith (Merchant → Blacksmith → Whitesmith → Mechanic → Meister)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — แยกออกมาเป็นไฟล์เฉพาะสาย 1 ไฟล์ต่อ 1 fork ตั้งแต่ Second Class เป็นต้นไป (ดีไซน์ปัจจุบันข้าม First Class เป็น mechanical step แล้ว — เลือกตรงเป็น Second Class ตั้งแต่เลเวล 3) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ (ดูตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) สำหรับภาพรวมทั้ง 12 สาย) — คู่ fork ของสายนี้คือ [Alchemist.md](Alchemist.md) (ไฟล์นี้แทนที่ Merchant.md เดิมที่ถูกแยกออกเป็น 2 ไฟล์)

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นวัตถุดิบอ้างอิง (real skill list จาก ROX/RO classic) สำหรับออกแบบ Job Path feature จริงทีหลัง ยังไม่ใช่ feature ที่ balance แล้ว ตาราง Merchant (1st Class) ด้านล่างเป็นเนื้อหาที่ใช้ร่วมกันกับ [Alchemist.md](Alchemist.md) เพราะทั้งคู่สืบทอดมาจาก Merchant เดิม — เก็บไว้เป็นวัตถุดิบสำหรับออกแบบ Mastery Branch pool ในอนาคต (ระบบ Mastery Branch เดิมถูกลบไปรอออกแบบใหม่ตามจังหวะเลเวลล่าสุด)
>
> *หมายเหตุชื่ออาชีพ*: ชื่อจริงในเกมของ tier Transcendent ของสายนี้คือ **Whitesmith** (ไม่ใช่ "Mastersmith" ตามที่ตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) ใน Novice-Concept.md เคยเดาไว้)

## ROX Skill Reference — Merchant → Blacksmith

> ตารางด้านล่างดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database?page=1) (job-database/detail/1600, 1610-1613) ครบทุกสกิลของแต่ละอาชีพ — คอลัมน์ Type/Max Lv/Description คือข้อมูลสกิลจริงในเกม (คง `%s` ตามต้นฉบับไว้แทนค่าตัวเลขที่สเกลตามเลเวลสกิล)

#### Merchant (1st Class)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Discount | Toggle | 5 | Enjoy a %s% discount when purchasing items from NPC shops and a %s% discount when purchasing items from the Chamber of Commerce using Zeny. |
| Overcharge | Toggle | 5 | Earn %s% more when selling items to NPC shops and %s% more when selling items to the Chamber of Commerce. |
| Enlarge Weight Limit | Toggle | 10 | Increases weight limit by %s. |
| Pushcart | Toggle | 5 | Allows the usage of pushcarts that can carry a heavy load. You can rent a pushcart that has an initial weight limit of 8000 from the Kafra Service. Each level up increases the weight limit by 500. Current weight limit is %s. |
| Cart Revolution | Active | 10 | Can only be used when equipped with a pushcart. After casting, attacks an enemy target within a circular area using the pushcart, dealing (%s% of ATK + %s) Neutral physical damage. After learning Weight Utility, the damage of this skill increases with maximum weight. |
| Crazy Uproar | Active | 10 | Lets out an incredible roar. After casting, all party members gain %s STR for 120 seconds. Loses effect if more than 30 meters from the caster. |
| Battle Will | Toggle | 10 | Whenever your normal attacks hit, your Physical Damage Bonus is increased by 20, increasing by %s more for every 50 STR. Can stack up to 8 times. Lasts for 5 seconds. |
| Midas Touch | Active | 10 | Deals (%s% ATK + %s) Neutral physical damage to an enemy and inflicts Bounty on it for 10 seconds. Killing a monster with Bounty earns you %s% more Zeny. |
| Mammonite | Active | 10 | Expends %s Zeny, dealing (%s% ATK + %s) physical damage of your weapon's attribute to an enemy. |
| Vending | Active | 10 | Set up a shop to sell items. You can list up to %s items for sale currently. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1600)

#### Blacksmith (2nd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Skin Tempering | Toggle | 5 | Receive %s% less damage from Fire attribute monsters and %s% less damage from Neutral attribute monsters. Increases Fire DMG dealt by %s%. |
| Weaponry Research | Toggle | 10 | When using a weapon, ATK increases by (%s + %s% of STR). |
| Over Thrust | Toggle | 10 | Casting Crazy Uproar increases your ATK by %s% and the Physical Attack of all party members within 30 meters by %s%. Loses effect if more than 30 meters from the caster. |
| Adrenaline Rush | Active | 10 | Increases the Final ASPD of all party members by %s% (increases by an additional 1% for every 50 AGI) for 40 seconds. Loses effect if more than 30 meters from the caster. |
| Weapon Perfection | Toggle | 5 | Adrenaline Rush causes all party members within 30 meters to gain %s% of base weapon modifier, up to 100%, for 40 seconds. Loses effect if more than 30 meters from the caster. |
| Cart Blitz | Active | 10 | Rides on the pushcart and charges forward, dealing Neutral attribute P.DMG equal to (%s% of P.ATK + %s) to enemies in the path within 3 meters of the pushcart. Enemies that have taken damage will not be damaged again within 1.5 seconds. During the charge, you gain the Endure and Control Immunity effects, with damage received decreased by %s%, and MSPD increased by %s. However, other attacks are disabled during this period. Lasts for 8 seconds. After Cart Blitz kills 8 targets or deals 32 hits, the charge will end prematurely. After learning Weight Utility, the damage of this skill increases with maximum weight. |
| Cart Hurl | Active | 10 | Hurls the pushcart forward, dealing (%s% of ATK + %s) Neutral physical damage to enemies in its path. The pushcart stays put after reaching the maximum distance for up to 5 seconds. Casting the skill again causes you to rush toward the pushcart's location and deal the same amount of physical damage to enemies near the pushcart. After learning Weight Utility, the damage of the first part of this skill increases with maximum weight. |
| Unfair Trick | Toggle | 10 | Decreases Zeny required to cast Mammonite, Hurl Zeny, and Zeny Storm by %s%. |
| Hammer Fall | Active | 10 | Slams the ground, dealing weapon attribute P.DMG equal to (%s% P.ATK + %s) to enemy units within 4 meters and has a %s% chance to stun them for 2 seconds. Can stun up to 8 targets. |
| Savage Slash | Active | 10 | Stuns the enemy for 1 second and slashes 5 times, dealing weapon attribute P.DMG equal to %s% of P.ATK in total. Every 50 STR increases the damage by an additional 5%, up to 800%. |
| Lunging Charge | Active | 10 | Charges towards the location of the pushcart. Upon reaching, deals (%s% ATK + %s) Neutral physical damage to enemies around you. |
| Weight Utility | Toggle | 10 | Increases damage of Cart Revolution, Cart Blitz (only for first instance of damage), Cart Hurl (only for the first stage), and Cart Termination by 1% for every increase of your maximum weight by %s. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1610)

#### Whitesmith (Transcendent)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Cart Boost | Active | 10 | Can only be used when equipped with a pushcart. After casting, removes the Decrease Agility state. Increases Movement Speed by %s% and Final Dodge Rate by %s% (increases by an additional 1% for every 30 VIT you have). Cannot be dispelled. Lasts for 6 seconds. Does not stack with other Movement Speed increase effects. |
| Greed | Toggle | 10 | Killing monsters in the wild earns you %s% more Zeny. |
| Melt Down | Active | 10 | Deals weapon attribute P.DMG equal to %s% of P.ATK to an enemy and has a %s% chance to break the enemy's armor. Every 30 STR increases the chance by an extra 1%. Lasts for 6 seconds. |
| Maximum Over Thrust | Active | 10 | Expends %s Zeny and increases the damage of your normal attacks by %s%. Lasts for 10 seconds. |
| Hurl Zeny | Active | 10 | Throws %s Zeny for a ranged attack, dealing Neutral attribute P.DMG equal to %s% of P.ATK to a single enemy target. This skill has a %s% chance to deal double damage. |
| Zeny Utility | Toggle | 10 | Increases the damage of Mammonite, Hurl Zeny, Zeny Storm, and Zenypult by %s%. |
| Zeny Storm | Active | 10 | Expends %s Zeny and blasts enemy units in a specified circular area with Zeny 6 times. Each blast deals (%s% of ATK + 400 (increases by an additional 100 for every 50 STR you have)) Neutral physical damage and slows the enemy by 50% for 3 seconds. |
| Cart Termination | Active | 10 | Deals (%s% ATK + %s) Neutral physical damage to enemy units within the area and stuns them for 3 seconds. After learning Weight Utility, the damage of this skill increases with maximum weight. |
| Cart Assault | Toggle | 10 | During Cart Blitz, increases damage by %s% and an additional increase of 20% each time the same target is hit. Knocks back the target 2 meters. (The same target will not be knocked back for 1.5 seconds.) |
| Savagery | Toggle | 10 | Casting Savage Slash and Melt Down grants you 1 stack of Savage for 10 seconds. Each stack grants you %s% Lifesteal and Final P.PEN, stacking up to 5 times. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1611)

#### Mechanic (3rd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Madogear License | Type 5 | 10 | Learns the basic skills to operate Magic Gear and ride it into battle, granting its effect for 120 sec. Magic Gear's Movement Speed is increased by 4 in PVE mode, and 2 in PVP mode. While riding it, all Cart-related skills are cast by the Magic Gear in a new way, however their effect remains unchanged. The Magic Gear manually launches normal attacks with its weapons, granting a 20% chance of dealing %sx normal damage and decreasing the target's Movement Speed by 50% for 2 sec. Overheating will be caused by boarding the Magic Gear too often, and you cannot ride the Magic Gear within 6 sec. |
| Neutral Barrier | Toggle | 10 | While riding Magic Gear, %s% of damage dealt and %s% of damage taken is converted into Energy, up to the equivalent of %s% Max HP. When Max HP is lower than %s%, accumulated Energy will be converted into a shield that remains in effect for 10 sec (can be triggered once every 24 sec). |
| Front Side Slide | Active | 10 | Propels the Magic Gear forward 10 meters, dealing Regular Physical Damage equal to %s% of Physical Attack to enemies within a 3-meter range upon reaching its final destination. |
| Suicidal Destruction | Active | 10 | Sets the countdown for the Magic Gear's detonator, then ejects yourself 4 meters backward. During the 2-second countdown, the Magic Gear pulls enemies within 6 meters toward its center. After the countdown, it explodes, dealing Fire attribute P.DMG equal to %s% of the target's Max HP to enemies within 6 meters. If the target is a BOSS, MVP, or MINI, it deals Fire attribute P.DMG equal to %s% of P.ATK. You cannot board the Magic Gear for 36 seconds after using this skill. |
| Knuckle Boost | Active | 10 | Fires a rocket punch from the Magic Gear, dealing weapon-based Physical Damage equal to %s% Physical Attack to a target, with a chance of reducing the cooldown for this skill by 1 sec for each crit dealt. |
| Vulcan Arm | Active | 10 | Deploys the Magic Gear's Vulcan Arm, unleashing a continuous 6-missile attack on targets within a 6-meter range for 3 seconds. Each bombardment deals Fire attribute P.DMG equal to %s% of P.ATK to enemies within range and an additional %s% damage to small and medium-sized monsters. It also has a %s% chance to slow down the targets within range by 50% for 3 seconds. |
| Arm Cannon | Active | 10 | Fires the Magic Gear's Arm Cannon in a fixed location, dealing Fire attribute P.DMG equal to %s% to all enemies within a 6-meter range. The Magic Gear can carry up to 5 cannon balls. |
| Savage Frenzy | Toggle | 10 | Grants 1 stack of Savage Fury for every crit triggered, increasing Physical Attack by %s% and Final Attack Speed by %s% for 3 sec. Can be stacked up to 6 times, after which Blood Thirst is granted, increasing Physical Lifesteal by %s% for 6 sec. Blood Thirst can be triggered once every 24 sec. |
| Magma Eruption | Toggle | 10 | Grants normal attacks a %s% chance of inflicting a powerful quake beneath the enemy's feet and an eruption of lava, dealing Fire Damage equal to %s% Physical Attack. This probability increases by %s% when a normal attack triggers a crit. |
| Axe Boomerang | Active | 10 | Hurls an axe in a desired direction, dealing weapon-based Physical Damage equal to %s% Physical Attack to all enemies in its path. After reaching its maximum trajectory, the axe will return to you, dealing an equal amount of damage to the enemies in its path. |
| Power Swing | Toggle | 10 | Increases the damage coefficient of Axe Boomerang by %s%. When thrown in the desired direction, targets in its path will be slowed by %s% for 2 sec. |
| Zenypult | Active | 10 | Places a launcher that hurls tons of Zeny every 0.5 sec up to 24 times (counted as each time a target takes damage), lasting for 18 sec max. The launcher affects targets within a 6-meter range, dealing Neutral Physical Damage equal to %s% Physical Attack. Up to 3 launchers can be placed at the same time, each costing 3000 Zeny. |
| Gainful Lure | Toggle | 10 | Inflicts Lure on targets who take damage from Mammonite, Hurl Zeny, Zeny Storm, or Zenypult, reducing their Final Physical Defense by %s%, which can be stacked up to 6 times. Also reduces their Movement Speed by %s% (not effective against boss-level monsters), which can be stacked up to 5 times. Both effects last for 6 seconds. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1612)

#### Meister (4th)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Activation Attack Machine | Active | 10 | Activates the drone attack system on the Magic Gear, attacking enemies in a 180-degree fan-shaped area in front, with each attack dealing weapon attribute P.DMG equal to %s% of P.ATK to up to 3 targets at a time. The drone can trigger critical hits when using a mace. The attack system can only be activated while mounted on the Magic Gear, lasts 20 seconds, and automatically deactivates when you exit the Magic Gear. |
| Activation Defense Machine | Active | 10 | Summons a 4-meter radius defensive field at your position, protecting all allies within it from damage coming from outside. The amount of damage blocked is equal to %s% of Meister's Max HP, and the field lasts for 5 seconds. The field can only be activated while mounted on the Magic Gear, but it doesn't block damage from enemies who have already entered the field. |
| ABR - Battle Warrior | Active | 10 | Summons the automated combat robot, Battle Warrior, which automatically joins the battle. After %s attacks, Battle Warrior performs a Strike, dealing Neutral attribute P.DMG equal to %s% of P.ATK to all enemies in a 180-degree fan-shaped area in front of the Battle Warrior, with a chance to trigger critical hits. Battle Warrior lasts up to %s seconds and consumes ABR Capsule x1 when summoned. ABR - Battle Warrior and ABR - Dual Cannon cannot be summoned at the same time. |
| ABR - Dual Cannon | Active | 10 | Summons the automated combat robot, Dual Cannon, which automatically joins the battle. Every %s seconds, Dual Cannon fires Arm Cannon, dealing Fire attribute P.DMG equal to %s% of P.ATK to the target and all enemies within a 4-meter radius. Dual Cannon lasts up to %s seconds and consumes ABR Capsule x1 when summoned. ABR - Battle Warrior and ABR - Dual Cannon cannot be summoned at the same time. |
| ABR - Infinity | Active | 10 | Commands ABR - Battle Warrior and ABR - Dual Cannon to repeatedly cast Strike and Arm Cannon within %s seconds. The attack frequency of the Magic Gear's drone attack system is also doubled. |
| ABR Mastery | Toggle | 10 | Summoning ABR - Battle Warrior increases the damage of Knuckle Boost, Activation Attack Machine, and Rush Quake by %s%. Summoning ABR - Dual Cannon increases the damage of Vulcan Arm, Arm Cannon, and Axe Stomp by %s%. |
| Rush Quake | Active | 10 | Dashes to the target location, creating ground shockwaves that pull in all enemies within 6 meters. Then, follow up with a powerful strike that deals weapon attribute P.DMG equal to %s% of P.ATK to the enemy, with a %s% chance to inflict Armor Break for 5 seconds to all enemies within the area. Requires a mace to use, and the damage can trigger critical hits. |
| Turbo Drive | Toggle | 10 | While mounted on the Magic Gear, your normal attacks utilize the Magic Gear's turbo weapon, reducing the ASPD bonus to %s% of the original but increasing base normal attack damage by %s%. Using the Turbo Drive hammer while in Magic Gear mode converts the damage of Midas Touch, Zeny Storm, Hurl Zeny, and Zenypult to weapon attribute. When your Final Crit is higher than Final P.PEN, all the above skills can trigger critical hits and generate substantial Threat when dealing damage. Threat won't be generated while Emergency Armor is active. |
| Axe Stomp | Active | 10 | Swings the axe to split the ground, creating a fissure that deals Fire attribute P.DMG equal to %s% of P.ATK to all targets within range and slows them down for 4 seconds. At the end of the fissure, flames erupt, dealing Fire attribute P.DMG equal to %s% of Max HP (capped at 2,000% P.ATK) to targets within a 6-meter radius and launching them into the air for 2 seconds. Requires an axe to use. |
| Mech Overhaul | Toggle | 10 | While mounted on Magic Gear, the damage of Cart Revolution, Cart Hurl, Cart Blitz, and Cart Termination is converted to Fire attribute. When Activation Attack Machine is active and Cart Hurl is cast, the drone stays at the initial position, dealing Fire attribute P.DMG equal to %s% of P.ATK every second to all enemies within the area. Casting Cart Blitz will apply the Activation Attack Machine effect. Cart Termination will deal additional Fire attribute P.DMG equal to %s% of P.ATK to enemies on the path. |
| Armor Swap | Toggle | 10 | While mounted on Magic Gear, there's a 2.5% chance to swap your armor attribute to resist damage when taking Earth, Fire, Water, and Wind attribute damage (damage from periodic effects caused by debuffs won't trigger this). This effect can be triggered once every 6 seconds. While mounted on Magic Gear and attacked by large, medium, or small monsters, you take 15%, 10%, and 5% less damage, respectively, and your PVP Final M.DMG RED and PVP Final P.DMG RED are increased by %s%. |
| Emergency Armor | Toggle | 10 | Using Suicidal Destruction to exit the Magic Gear activates Emergency Armor. While under the effect of Emergency Armor, your MSPD is increased by 4, and Suicidal Destruction is disabled, but other skills that require the Magic Gear remain usable. Armor Swap does not apply to Emergency Armor. Emergency Armor lasts for %s seconds. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1613)
