# Monastic Tradition: Warrior of the Asura

> Nothing within the body deserves to be saved for tomorrow — breath, ki, the last drop of blood, all of it exists only for the single moment it is unleashed. Warriors of the Asura believe the truest fist is not the one that conserves its power, but the one that burns everything it has into a single strike.

## Designer's Note

Inspired by the Asura Strike skill from the Monk/Champion class in Ragnarok Online — an ultimate move that spends all of your SP and requires a special buff (Explosion Spirits) to unleash one attack of unimaginable force.

Warrior of the Asura translates that mechanic into spending all of your Focus Points plus your Action, Bonus Action, and remaining Speed, combined with a stacking Spirit Sphere system (the equivalent of Explosion Spirits) that must be built up over at least 2-3 turns in advance before it can be unleashed — preventing a "walk in and end the fight turn one" scenario. But once the conditions are met, **Asura Strike is intentionally designed to be strong enough to one-shot a boss if every condition lands.** This is a deliberate design risk, not a bug to be fixed — fitting the all-in gambling theme of the original ultimate move.

The remaining features (Wrathful Momentum, Steel Body) shore up survivability during the build-up phase and immediately after an all-in release, since during those windows the character has no Focus Points left to protect themselves.

## Level 3 — Spirit Sphere & Asura Strike

*The ki gathered from combat never truly fades. It condenses into a sphere of energy circling your body, waiting for the moment it erupts.*

**Spirit Sphere.** Whenever you hit a target with an Unarmed Strike, you gain 1 Spirit Sphere (maximum 5). If you end your own turn without landing a single attack, all of your Spirit Spheres are lost immediately.

As long as you have at least the listed number of Spirit Spheres, you gain the following benefits (benefits from lower thresholds always remain active as well):

| Spirit Sphere | Effect |
|---|---|
| 1+ | Your Speed increases by 5 feet. |
| 2+ | When you fail a saving throw, you can spend your Reaction to reroll it once, and you must use the new result. |
| 3+ | The first attack you make on your turn has advantage. |
| 4+ | Each Focus Point you spend on Asura Strike (see below) grants a +1 bonus to that attack's attack roll. |
| 5 | You can use **Asura Strike** (see below). |

**Asura Strike.** When you have 5 Spirit Spheres, you can spend your Action, Bonus Action, and all remaining Speed this turn, along with every Focus Point you currently have and all 5 Spirit Spheres, to unleash the single most devastating Unarmed Strike you can muster:

- **Attack roll**: your normal attack modifier + the number of Focus Points spent.
- **Damage**: your Martial Arts die × (the number of Focus Points spent + 1) + your Dexterity modifier.
- **Force Crit**: if the total attack roll (after all bonuses) equals or exceeds **the target's AC + 15 + its Proficiency Bonus**, the attack automatically becomes a critical hit (a roll of 1 still always misses, per the normal rules).

After using Asura Strike, you have 0 Focus Points and 0 Spirit Spheres remaining until you next rest.

## Level 6 — Wrathful Momentum

*Every time an enemy falls before you, the fury within you grows more concentrated.*

When you reduce a target to 0 hit points with an Unarmed Strike, or score a critical hit (a normal one, not a Force Crit) with an Unarmed Strike, you immediately gain 1 Spirit Sphere (not exceeding the cap of 5) and gain temporary hit points equal to your Martial Arts die + your Monk level.

## Level 11 — Steel Body

*A body honed through relentless training becomes as unyielding as steel, able to withstand any blow for a brief moment.*

Once per Short Rest or Long Rest, you can use a Bonus Action to enter this stance until the start of your next turn: you have resistance to all damage, but your Speed becomes 0 and you have disadvantage on attack rolls for the duration.

This feature works well as an "emergency button" to survive a turn where you're being swarmed after emptying yourself with Asura Strike.

## Level 17 — Annihilating Fury

*In the instant everything burns away, that is when the true Asura awakens.*

A Force Crit from your Asura Strike now deals **triple damage** instead of double damage.
