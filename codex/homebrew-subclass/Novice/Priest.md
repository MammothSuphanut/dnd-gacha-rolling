# Novice Job Line: Priest (Acolyte → Priest → High Priest → Archbishop → Cardinal)

> ส่วนหนึ่งของ [Novice-Concept.md](Novice-Concept.md) — แยกออกมาเป็นไฟล์เฉพาะสาย 1 ไฟล์ต่อ 1 fork ตั้งแต่ Second Class เป็นต้นไป (ดีไซน์ปัจจุบันข้าม First Class เป็น mechanical step แล้ว — เลือกตรงเป็น Second Class ตั้งแต่เลเวล 3) ตาม convention การแยกไฟล์ต่อสาย/subclass ของโปรเจกต์ (ดูตาราง [ROX Job Tree Reference](Novice-Concept.md#rox-job-tree-reference-ทางการ) สำหรับภาพรวมทั้ง 12 สาย) — คู่ fork ของสายนี้คือ [Monk.md](Monk.md) (ไฟล์นี้แทนที่ Acolyte.md เดิมที่ถูกแยกออกเป็น 2 ไฟล์)

> 🚧 **สถานะ: DRAFT** — ไฟล์นี้เป็นวัตถุดิบอ้างอิง (real skill list จาก ROX/RO classic) สำหรับออกแบบ Job Path feature จริงทีหลัง ยังไม่ใช่ feature ที่ balance แล้ว ตาราง Acolyte (1st Class) ด้านล่างเป็นเนื้อหาที่ใช้ร่วมกันกับ [Monk.md](Monk.md) เพราะทั้งคู่สืบทอดมาจาก Acolyte เดิม — เก็บไว้เป็นวัตถุดิบสำหรับออกแบบ Mastery Branch pool ในอนาคต (ระบบ Mastery Branch เดิมถูกลบไปรอออกแบบใหม่ตามจังหวะเลเวลล่าสุด)

## ROX Skill Reference — Acolyte → Priest

> ตารางด้านล่างดึงมาจากหน้า job detail จริงของ [ROXPEDIA Job Database](https://roxpedia.com/job-database?page=1) (job-database/detail/1200, 1210-1213) ครบทุกสกิลของแต่ละอาชีพ — คอลัมน์ Type/Max Lv/Description คือข้อมูลสกิลจริงในเกม (คง `%s` ตามต้นฉบับไว้แทนค่าตัวเลขที่สเกลตามเลเวลสกิล) ทุกอาชีพยังมี Talent skill กลาง (Toggle, Lv 1, ไม่มี description ในฐานข้อมูล) ซึ่งตัดออกจากตาราง

#### Acolyte (1st Class)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Heal | Active | 10 | Heals a friendly target and yourself for ((%s × (Character's level + INT) / 10) + %s) HP. If the target is an Undead or Demon monster, deals Holy magic damage to it equal to the amount the friendly unit is healed. |
| Blessing | Active | 10 | Increase the STR, DEX, and INT of all friendly targets within 30 meters by %s for 120 seconds and remove Curse and Petrify effects on all friendly targets. Loses effect if more than 30 meters from the caster. |
| Mace Mastery | Toggle | 10 | When equipped with a Mace, ATK increases by (%s + %s% of STR), not including STR gained through buffs. |
| Soulmender | Toggle | 5 | Increases healing effect of "Heal" skill by %s%. |
| Increase Agility | Toggle | 10 | Blessing gains the effects of Increase Agility. Increases all party members' ASPD by %s, AGI by %s, and Movement Speed by %s%. Loses its effect when the caster is more than 30 meters away. |
| Signum Crucis | Active | 10 | Deals Holy attribute M.DMG equal to (%s% M.ATK + %s) to enemies within a 4-meter area and lowers their P.DEF and M.DEF by (20 + 2% INT × %s) for 5 seconds. |
| Kyrie Eleison | Active | 10 | Grant a damage shield to a friendly target within 30 meters. The shield can be damaged up to %s times or withstand damage equal to %s% of the target's Max HP, losing its effect when either limit is exceeded, after 10 seconds, or when the caster is more than 30 meters away. |
| Holy Light | Active | 10 | Smite the enemy with divine light, dealing Holy magic damage equal to (%s% of M.ATK + %s) and dispelling the target's Kyrie Eleison effect. |
| Light Blessing | Active | 10 | Bless party members with holy power. After using this skill, heal friendly targets within 30 meters for (%s% of M.ATK + %s) HP for 10 seconds. Loses effect if more than 30 meters from the caster. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1200)

#### Priest (2nd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Increase SP Recovery | Toggle | 10 | Increase SP Regen, recovering (%s% of Max SP + %s) SP every 10 seconds and increasing the effect of SP recovery items by %s%. |
| Holy Booster | Toggle | 5 | Increases Holy Light's damage by %s%, with a %s% chance to deal double damage. If double damage is triggered, the target will be stunned for 2 seconds. |
| Impositio Manus | Active | 5 | Prays for allies, increasing their P.DMG (normal attack) by %s% for 15 seconds. While active, skills that deal P.DMG will also inflict additional Holy attribute P.DMG equal to %s% of the caster's P.ATK and ignore defense. The additional damage triggers once every 2 seconds. Damage from periodic debuffs won't trigger this effect. When the caster's Final Crit is higher than Final P.PEN, this skill's P.DMG may trigger critical damage. Loses its effect when the ally is more than 30 meters away from the caster. |
| Sanctuary | Active | 10 | Consecrates an area, healing party members for (%s% of M.ATK + %s) HP per 0.5 seconds (a character can receive up to two Sanctuary healing effects at the same time). Undead and Demon monsters that enter this area take (%s% of M.ATK + %s) Holy magic damage every second for 5 seconds. |
| Resurrection | Active | 5 | Consumes 60% of your Max SP to resurrect one friendly target and restore %s% (for every 30 INT, additionally increases this effect by 1%) of their HP. When cast on Demon or Undead monsters, it is equivalent to casting Turn Undead of the same level on them. |
| Gloria | Active | 10 | Increases the LUK of friendly targets within 30 meters by %s and your own Crit by %s% for 120 seconds. Loses effect if a party member is more than 30 meters away. |
| Ruwach | Active | 5 | Deal (%s% of M.ATK + %s) Holy magic damage to enemies within 3 meters. Through the power of the holy spirit, reveals nearby enemy units who are Hiding for 15 seconds. |
| Angelus | Active | 10 | Increases P.DEF of all party members within 30 meters by %s% (every 50 VIT adds extra 1%, up to 400%) for 10 seconds. Loses its effect when the caster is more than 30 meters away. |
| Magnificat | Active | 10 | After casting, increases the SP Regen of you and all party members within 30 meters by %s% and increases Magic Damage Bonus by %s. Lasts for 10 seconds. Loses effect if more than 30 meters from the caster. |
| Pneuma | Active | 10 | Erects a defensive barrier that is immune to ranged physical damage. The barrier can take up to %s hits, lasting %s seconds. |
| Assumptio | Toggle | 10 | When casting Angelus, additionally increases M.DEF of all party members within 30 meters by %s% (every 50 VIT adds an extra 1%, up to 400%) for 10 seconds. Loses its effect when the caster is more than 30 meters away. |
| Aspersio | Active | 5 | Converts your weapon or a party member's weapon within 30 meters to a Holy attribute weapon for %s seconds. Loses its effect when the caster is more than 30 meters away. Not effective when cast upon non-party members. |
| Turn Undead | Active | 10 | Using this skill has a chance to instantly kill an Undead target. If it fails, deals (%s% of M.ATK + %s) Holy magic damage instead. When used on a boss, this skill has a chance to Crit, dealing 50% more damage to Undead and Demon monsters. The chance to instantly kill is determined by your INT, LUK, Skill Level, and the target's current HP. |
| Expiatio | Toggle | 10 | When using a Mace, each normal attack has a 20% chance (increases by an additional 1% for every 50 STR you have) to deal a bonus of (%s% of ATK + %s) physical damage of your weapon's attribute. |
| Divine Protection | Toggle | 5 | Reduces damage received from Demon and Undead monsters by %s%. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1210)

#### High Priest (Transcendent)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Meditatio | Toggle | 10 | Increase your Max SP by %s%, SP Regen by %s%, and amount healed by %s%. Reduce SP consumption of skills by %s%. |
| Demon Bane | Toggle | 10 | Increases your ATK by (%s + %s% of STR) and deals %s% more damage to Demon and Undead monsters. |
| Magnus Exorcismus | Active | 10 | Creates a cross-shaped sanctuary at the specified location, dealing (%s% of M.ATK + %s) Holy M.DMG every 0.5 seconds to enemy units that enter the area. Undead and Demon enemies take 50% more damage. Lasts for 6 seconds. |
| Decrease Agility | Active | 5 | Decreases an enemy's MSPD by %s%, Final ASPD by %s%, and Final Haste by %s% for 10 seconds. Every 20 points of INT will decrease the enemy's Final ASPD by an additional 1% and Final Haste by 0.1%. Dispels Increase Agility and Sword Speed Boost effects on the target. |
| Judex | Active | 10 | Lay down judgment on an enemy, dealing (%s% of M.ATK + %s) Holy sacred magic damage that ignores DEF and half of that amount of Holy sacred magic damage to enemies within 3 meters of the target. |
| Suffragium | Active | 10 | Say a prayer of intercession for friendly targets within 30 meters, increasing their Final Haste by %s% for 120 seconds. Loses effect if more than 30 meters from the caster. |
| Coluceo Heal | Active | 10 | Heal party members for (%s% of M.ATK + %s) HP. |
| Safety Wall | Active | 10 | Creates a barrier at the specified location. You and all party members will be immune to melee P.DMG for %s seconds within the barrier. The barrier can block up to %s hits. |
| Lex Divina | Active | 10 | Immediately interrupts the enemy's casting or channeling, and silences all enemy units within 4 meters for %s seconds. |
| Sacred Blessing | Active | 10 | Protects you or a friendly unit with divine power, immediately granting immunity to death and restoring HP equal to %s% of Max HP (amount healed is also affected by Healing Effect) upon taking lethal damage. Lasts for %s seconds. Can only take effect once. Loses its effect when the caster is more than 30 meters away. |
| Lex Aeterna | Active | 10 | Increases the next active skill damage of a selected allied target by %s% for %s seconds. Can only take effect once. |
| Sacred Hammer | Active | 10 | Deals Holy sacred P.DMG equal to ((%s% + %s% x stacks of Holy Light mark) x P.ATK) to a single target, and the damage ignores the target's DEF. Meanwhile, deals Holy sacred P.DMG equal to ((150% + 15% x stacks of Holy Light mark) x P.ATK) to other targets within a 4-meter range of the single target (damage also ignores DEF). This skill deals double damage to Undead and Demon monsters. |
| Holy Strike | Active | 10 | For %s second(s), normal attacks with a Mace deal an additional %s% of your ATK as Holy sacred physical damage that ignores DEF. Inflicts the target with a stack of Holy Strike. Holy Strike can stack up to 20 times and lasts for 10 seconds. Each stack of Holy Strike on the target causes them to receive 2% more damage from your normal attacks. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1211)

#### Archbishop (3rd)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Epiclesis | Active | 10 | Summons the Life Tree to resurrect all dead party members within 30 meters and restore %s% of their HP. Surviving party members in range will be granted the Sigil of the Life Tree (members resurrected by the skill will not receive the sigil). The Sigil of the Life Tree restores 6% of the target's HP and SP while increasing Final Damage Reduction by %s% for %s seconds. Costs 1 Blue Gemstone to use. |
| Oper Auditorium | Active | 10 | Prayer offerings increase divine power for 6 seconds, increasing Bonus Heal by %s% and granting debuff immunity. Also removes debuffs from self and %s other party members. (Unable to grant immunity or remove debuffs from bosses. Debuff removal is done in order from highest to lowest; if tied, lowest HP to highest.) Costs 1 Blue Gemstone to use. |
| Praefatio | Active | 10 | Grants Kyrie Eleison to all party members (this skill's shield effect cannot be stacked but is given priority before other skills). Kyrie Eleison resists up to %s attacks for 10 sec. Once the amount of damage resisted exceeds %s% of the grantee's Max HP, the shield will disappear. |
| Divine Light | Toggle | 10 | Obtains the gift of the Holy Spirit and comprehends the mastery of the Holy attribute. Increases the Holy damage you deal to Earth, Fire, Water, and Wind attributes by %s%, and increases your M.ATK by (%s + VIT x %s%). |
| Sacrament | Toggle | 10 | Adds Sacrament to Oper Auditorium. Also decreases the fixed channeling time of party members by %s seconds and fixed cooldown by %s seconds. |
| Adoramus | Active | 10 | Deals Holy magic damage equal to %s% of M.ATK by using powerful divine light on an enemy unit and inflicts Reversed Bloodflow on the target. While under the effect of Reversed Bloodflow, all healing and lifesteal received by the enemy has no effect (has no effect on bosses) and %s% of the healing and lifesteal received will be converted into Neutral magic damage for 4 seconds. |
| Light Shackle | Active | 10 | Unleashes a holy light that pulls in all enemies within a 4-meter area, dealing Holy DMG equal to %s% of Adaptive ATK and slowing them by 50% every 0.5 seconds. The pull lasts for 3 seconds. At the end of the pull, any enemies still connected to the holy light will take Holy DMG equal to %s% of Adaptive ATK and be immobilized for %s seconds. The skill cannot be cast if there are no connectable units within range. Costs 1 Blue Gemstone to use. |
| Oratio | Toggle | 10 | Upon dealing Holy damage to enemies, gains the effect of Oratio, increasing Holy Enhancement by %s% for 5 seconds. This effect can only be triggered once every 25 seconds. |
| Admonishing | Toggle | 10 | Upon dealing Holy damage to enemies, inflicts the effect of Exhort on them. While under the effect of Exhort, the target's P.ATK and M.ATK decrease by %s% for 5 seconds. (Has no effect on bosses. This effect can be reduced by Weapon Breakage Resistance.) This effect can only be triggered once every 25 seconds. |
| Duple Light | Active | 10 | Summons two rays of divine light around oneself and deals %s% Holy damage of a type that matches their own to enemies within 3 meters every second. When dealing damage to the same target, damage increases by 5% each time. Lasts 12 seconds. |
| Holy Spirit Protection | Toggle | 10 | Blessed by the Holy Spirit, MSPD is increased by %s while in combat. Gains Holy Spirit Protection when your HP drops to 50%, during which each time you take damage, you will recover HP equal to %s% of the damage taken. Lasts 6 seconds. If fatal damage is received during this time, the Sacred Blessing effect will trigger automatically (only triggers once; Sacred Blessing must be learned). Holy Spirit Protection triggers up to once every 40 seconds. |
| Ascalon | Active | 10 | Your next normal attack within 12 seconds inflicts an Ascalon Mark on the target. This mark lasts for 4 seconds, during which time it will record the normal attack damage you deal to the target. When the duration of the Ascalon Mark ends, a Holy Spirit will be summoned, dealing (%s% × recorded damage) True DMG to the target using her sword. |
| Holy Hammer | Toggle | 10 | Dealing damage with a mace puts you in the Rule of Order state, increasing your Crit DMG Bonus by %s% and Final P.PEN by %s%, up to 5 stacks for 3 seconds. At full stacks, normal attacks have an 80% chance to reduce the cooldown of Sacred Hammer and Holy Strike by 0.25 seconds. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1212)

#### Cardinal (4th)

| Skill | Type | Max Lv | Description |
|---|---|---|---|
| Dilectio Heal | Toggle | 10 | Adds the Compassion effect to Light Blessing and Coluceo Heal, allowing party members within 30 meters to recover HP equal to %s% of the caster's Max HP every second. The Dilectio effect lasts for 5 seconds. For every %s INT the caster possesses, the healing effect is increased by 0.6%, up to 3%. This effect can be triggered once every 20 seconds. |
| Reparatio | Active | 10 | Heals a specified party member for an amount equal to (%s% of their lost HP + caster's INT x 2). For every %s INT the caster possesses, the healing effect is increased by 1%, up to 60%. |
| Mediale Votum | Toggle | 10 | Each time you heal a party member with an active skill, you receive 1 stack of Votum. Every stack of Votum boosts your Max HP by %s%. The Votum effect lasts for 6 seconds, stacking up to %s times. |
| Argutus Vita | Toggle | 10 | Casts Impositio Manus to increase the party members' M.DMG (normal attack) by an additional %s%. While active, skills that deal M.DMG will also inflict additional Holy attribute M.DMG equal to %s% of the caster's M.ATK and ignore defense. The additional damage triggers once every 2 seconds. Damage from periodic debuffs won't trigger this effect. Loses its effect when the ally is more than 30 meters away from the caster. |
| Portal Nexus | Active | 10 | Gathers energy at your location to summon the Portal Nexus. After 3 seconds, all party members within the area are teleported to the preselected location. |
| Effligo | Toggle | 10 | Normal attacks have a 9% chance to trigger the Destruction effect. If your Final Crit is higher than Final P.PEN, Destruction reduces the target's Final Anti-Crit by %s% and Crit DMG Reduction by %s%. If your Final P.PEN is higher than Final Crit, Destruction reduces the target's Final P.DEF by %s%. The Destruction effect lasts for 6 seconds. Enemies affected by Destruction will be randomly inflicted with one of the following debuffs: stun, trap, or immobilize for 3 seconds. |
| Petitio | Active | 10 | Receives the blessing of the Holy Light, gaining 1 stack of the Holy Light effect. During this time, each normal attack has an 11% chance to grant you 1 extra stack of Holy Light. While under the effect of Holy Light, every normal attack has a %s% chance to summon Holy Light to strike the enemy, dealing Holy attribute P.DMG equal to (%s% P.ATK x Holy Light stacks) that ignores defense. The Holy Light effect can stack up to 5 times and lasts for up to 6 seconds. |
| Presens Acies | Toggle | 10 | When your Final Crit is higher than Final P.PEN, Petitio, Presens Acies, and Sacred Hammer can trigger critical hits. When Holy Light is fully stacked, each Petitio triggered will also deal Holy attribute P.DMG equal to %s% of P.ATK that ignores defense to all enemies within 4 meters, with the damage split among the targets within range. |
| Fidus Animus | Toggle | 10 | Whenever you deal Holy DMG to an enemy, you gain 1 stack of Fidus Animus. Each stack of Fidus Animus increases your Debuff Resistance by %s% and Debuff Duration Reduction by %s%. Can be stacked up to 5 times and lasts 6 seconds. |
| Framen | Toggle | 10 | Using Signum Crucis, Judge, Magnus Exorcismus, or Pneumaticus Procella has a 10% chance to inflict the Requiem effect to all targets within range 1 time. Enemies under the effect of Requiem lose %s% of their Max SP per second, and all their buffs are temporarily suspended. Each time they take Holy DMG, there's a %s% chance they'll be stunned for 0.5 seconds. Requiem lasts for 6 seconds. For every 1 stack of Fidus Animus you have, the chance of inflicting Requiem increases by 4%. |
| Arbitrium | Active | 10 | Unleashes a powerful judgment of light on the target, dealing Holy attribute M.DMG equal to (%s% M.ATK + caster's INT x %s) that ignores defense (the extra damage coefficient increased by INT will not exceed 600%). If the target is a character, they will enter the Silent state, instantly interrupting their Solo, Ensemble, Chant, and Chorus skills and preventing them from using such skills for 6 seconds. If the target is a monster, they will enter the Justice state, causing each attack from a party member to deal Holy attribute M.DMG equal to (50% M.ATK + caster's INT x 25) that ignores defense (the extra damage coefficient increased by INT will not exceed 150%; the Holy DMG will not exceed 100% of the caster's M.ATK/P.ATK). The Justice effect lasts for 6 seconds. |
| Pneumaticus Procella | Active | 10 | Summons a holy spirit storm in the target area, dealing Holy attribute M.DMG equal to (%s% M.ATK + INT x %s) (the extra damage coefficient increased by INT will not exceed 150%) that ignores defense to all enemies within a 6-meter radius every 0.5 seconds. The damage is split among all targets in the area. Pneumaticus Procella lasts for 8 seconds. Undead and Demon monsters in the area take 50% additional damage. |

*Source:* [ROXPEDIA Job Database](https://roxpedia.com/job-database/detail/1213)
