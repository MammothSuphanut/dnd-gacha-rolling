# Subclass Scorecard Progress Tracker

**วันที่เริ่ม**: 2026-08-07
**ขอบเขต**: 30 class (รวม homebrew class ของโปรเจกต์เอง — Sacred Knight — และ **Tactician** ที่เพิ่มเข้า scope 2026-08-08 หลังพบว่ามันอยู่ในตารางสุ่ม `src/data/classes.json` มาตั้งแต่แรก แต่ตกหล่นจาก scope เดิมตอนตั้งระบบนี้ 2026-08-07 — Tactician เป็น 3rd-party class จาก "Drizzt's Travelogue of Everything" (DMs Guild) ไม่ใช่ WotC ทั้ง 2014/2024 ดูรายละเอียดที่ [tactician-subclass-scorecard-2024.md](tactician-subclass-scorecard-2024.md)) — **ไม่รวม 3 sidekick class** (Expert/Spellcaster/Warrior Sidekick) เพราะไม่มีโครงสร้าง subclass ให้ประเมิน baseline+subclass ตามระบบนี้ได้
**กติกาการให้คะแนน**: ดู [00-scorecard-methodology.md](00-scorecard-methodology.md) (7 axis, M/R/B, Class Baseline, ขอบเขต edition 2024)

**สถานะ**: ทุกช่องเริ่มที่ `[ ]` ยังไม่ได้ประเมิน — ติ๊ก `[x]` เมื่อประเมินเสร็จแล้ว (เขียนคะแนนราย axis ครบ + เหตุผลตามกติกาใน 00-scorecard-methodology.md แล้ว)

**หมายเหตุการ reconcile**: รายชื่อ subclass ด้านล่างมาจากการ deduped ระหว่าง `class-subclass-index.md` (794 รายการดิบ ก่อนหัก sidekick) กับไฟล์ tier-list รายคลาสชุดเก่า (ชื่อที่เปลี่ยนระหว่าง edition ถูกรวมเป็นแถวเดียวแล้ว ใช้ชื่อ 2024 ตามกติกา) — ไฟล์ tier-list ชุดเก่าทั้งหมด (28 ไฟล์ + rollup + wizard scorecard pilot + class-overview) **ถูกลบไปแล้ว 2026-08-07** กำลังเขียนใหม่ทั้งหมดตามกติกาใน 00-scorecard-methodology.md — รายชื่อด้านล่างเป็นแค่ผลลัพธ์ที่ deduped ไว้ก่อนลบ ไม่ใช่ไฟล์ที่ยังอ้างอิงอยู่จริง แถวที่มีธง 🆕 หรือ ⚠️ มีบริบทเพิ่มเติมให้อ่านก่อนประเมิน (ดูหัวข้อด้านล่าง)

---

## ⚠️ บริบทที่ควรรู้ก่อนเริ่มประเมิน (มาจากการ reconcile ก่อนลบไฟล์เก่า)

**🆕 subclass ที่ยังไม่เคยถูกวิเคราะห์มาก่อนเลย** (มีอยู่จริงในเกม อยู่ใน class-subclass-index.md แต่ไฟล์ tier-list เก่าไม่เคยมี heading ให้) — ไม่มีของเก่าให้อ้างอิง ต้องวิเคราะห์จากศูนย์:
- **Captain**: Demon Banner, Jolly Roger Banner, Siegeball Banner
- **Investigator**: Infernal Agent
- **Rogue**: Arachnoid Stalker
- **Sacred Knight**: Throne of Eternity and Creation, Throne of Fear and Sorrow, Throne of Doom and Slaughter, Throne of Protection and Mercy, Throne of Wisdom and Spirit, Throne of Order and Law (ทั้ง 6 ตัว homebrew ของโปรเจกต์นี้เอง — เพิ่งสร้างไฟล์จริงเสร็จ 2026-08-07)
- **Sorcerer**: The Ruined Flame (homebrew ของโปรเจกต์นี้เอง)
- **Warmage**: House of Lancers

**⚠️ ไฟล์ tier-list เก่าเคยเขียนด้วยชื่อ 2014 เดิม ทั้งที่มี 2024 rename แล้ว** (ขัดกติกา 2024-only scope) — ตอนเขียนไฟล์ Monk ใหม่ ให้ใช้ชื่อ 2024 เหล่านี้แทนชื่อเก่า:
- `Way of the Open Hand` → **`Warrior of the Open Hand`**
- `Way of Shadow` → **`Warrior of Shadow`**
- `Way of Mercy` → **`Warrior of Mercy`**

---

## Class Baseline Progress (30)

ตาราง Class Baseline (floor 0-10 ต่อ axis ของ class เปล่าๆ) ต้องเขียนก่อนเริ่มให้คะแนน subclass ตัวแรกของ class นั้นเสมอ — ดู [00-scorecard-methodology.md § Class Chassis Baseline](00-scorecard-methodology.md)

- [x] Alchemist
- [x] Artificer
- [x] Sacred Knight
- [x] Barbarian
- [x] Bard
- [x] Captain
- [x] Channeler
- [x] Cleric
- [x] Craftsman
- [x] Dancer
- [x] Druid
- [x] Fighter
- [x] Gunslinger
- [x] Investigator
- [x] Martyr
- [x] Monk
- [x] Monster Hunter
- [x] Mystic
- [x] Necromancer
- [x] Paladin
- [x] Ranger
- [x] Rogue
- [x] Sorcerer
- [x] Tactician
- [x] Vagabond
- [x] Warden
- [x] Warlock
- [x] Warmage
- [x] Witch
- [x] Wizard

---

## Subclass Scorecard Progress (478)

ประเมินราย axis ตามกติกาใน 00-scorecard-methodology.md — จัดกลุ่มตาม class เดียวกับ [class-subclass-index.md](../General/class-subclass-index.md)

### Alchemist (10)

- [x] Amorist
- [x] Apothecary
- [x] Dynamo Engineer
- [x] Mad Bomber
- [x] Mutagenist
- [x] Ooze Rancher
- [x] Pigmentist
- [x] Resonator
- [x] Venomsmith
- [x] Xenoalchemist

### Artificer (6)

- [x] Alchemist
- [x] Armorer
- [x] Artillerist
- [x] Battle Smith
- [x] Cartographer
- [x] Reanimator

### Barbarian (21)

- [x] Path of Heavy Metal
- [x] Path of the Ancestral Guardian
- [x] Path of the Battlerager
- [x] Path of the Beast
- [x] Path of the Berserker
- [x] Path of the Carrion Raven
- [x] Path of the Colossus
- [x] Path of the Fin
- [x] Path of the Fractured
- [x] Path of the Giant
- [x] Path of the Muscle Wizard
- [x] Path of the Primal Spirit
- [x] Path of the Rage Mage
- [x] Path of the Storm Herald
- [x] Path of the Totem Warrior
- [x] Path of the Wild Heart
- [x] Path of the World Tree
- [x] Path of the Wrathful Dead
- [x] Path of the Zealot
- [x] Path of Tranquility
- [x] Path of Wild Magic

### Bard (19)

- [x] College of Adventurers
- [x] College of Cantors
- [x] College of Creation
- [x] College of Dance
- [x] College of Eloquence
- [x] College of Fools
- [x] College of Glamour
- [x] College of Graffiti
- [x] College of Jesters
- [x] College of Lore
- [x] College of Masks
- [x] College of Requiems
- [x] College of Romance
- [x] College of Spirits
- [x] College of Swords
- [x] College of the Mad God
- [x] College of the Moon
- [x] College of Valor
- [x] College of Whispers

### Captain (29)

- [x] Adrenaline Junkie
- [x] Brigand
- [x] Daggermark
- [x] Demon Banner
- [x] Demon Brand
- [x] Dragon Banner
- [x] Eagle Banner
- [x] Feylost
- [x] Gourmand
- [x] Holy Icon
- [x] Houndmaster
- [x] Jolly Roger
- [x] Jolly Roger Banner
- [x] Knight Errant
- [x] Lion Banner
- [x] Plague Doctor
- [x] Pugilist
- [x] Ram Banner
- [x] Raven Banner
- [x] Rōnin
- [x] Siegeball Banner
- [x] Siegeball Jersey
- [x] Skull Banner
- [x] Star-Spangled Banner
- [x] Tower Banner
- [x] Treant Banner
- [x] Troubadour
- [x] Turtle Banner
- [x] Yellow Sign

### Channeler (4)

- [x] Order of Blinknights
- [x] Order of Dimensional Magi
- [x] Order of Titanfists
- [x] Order of Wild Hunters

### Cleric (27)

- [x] Ambition Domain
- [x] Arcana Domain
- [x] Death Domain
- [x] Destruction Domain
- [x] Eldritch Domain
- [x] Forge Domain
- [x] Grave Domain
- [x] Inquisition Domain
- [x] Knowledge Domain
- [x] Life Domain
- [x] Light Domain
- [x] Madness Domain
- [x] Nature Domain
- [x] Order Domain
- [x] Peace Domain
- [x] Pestilence Domain
- [x] Purification Domain
- [x] Rum Domain
- [x] Solidarity Domain
- [x] Strength Domain
- [x] Tempest Domain
- [x] Travel Domain
- [x] Trickery Domain
- [x] Twilight Domain
- [x] War Domain
- [x] Wealth Domain
- [x] Zeal Domain

### Craftsman (11)

- [x] Arcane Maesters' Guild
- [x] Armigers' Guild
- [x] Bladeworkers' Guild
- [x] Calibarons' Guild
- [x] Clockworkers' Guild
- [x] Courtiers' Guild
- [x] Forgeknights' Guild
- [x] Mechanauts' Guild
- [x] Thunderlords' Guild
- [x] Trappers' Guild
- [x] Wintercarvers' Guild

### Dancer (14)

- [x] Acrobat
- [x] Cheerleader
- [x] Contortionist
- [x] Courtesan
- [x] Danseur Macabre
- [x] Dramaturge
- [x] Fencer
- [x] Fey Ballerina
- [x] Fire Dancer
- [x] Harlequin
- [x] Marionettist
- [x] Mime
- [x] Shadow Dancer
- [x] Steelsinger

### Druid (17)

- [x] Circle of Blood
- [x] Circle of Dreams
- [x] Circle of Entropy
- [x] Circle of Mutation
- [x] Circle of Spores
- [x] Circle of the Stars
- [x] Circle of Stones
- [x] Circle of the City
- [x] Circle of the Deep
- [x] Circle of the Fist
- [x] Circle of the Land
- [x] Circle of the Moon
- [x] Circle of the Sea
- [x] Circle of the Shepherd
- [x] Circle of the Wyrm
- [x] Circle of Vermin
- [x] Circle of Wildfire

### Fighter (21)

- [x] Arcane Archer
- [x] Banneret
- [x] Battle Master
- [x] Blade Breaker
- [x] Bone Knight
- [x] Brawler
- [x] Bulwark Warrior
- [x] Cavalier
- [x] Celestial Lancer
- [x] Champion
- [x] Corsair
- [x] Dungeoneer
- [x] Echo Knight
- [x] Eldritch Knight
- [x] Living Crucible
- [x] Mage Hand Magus
- [x] Nightwatcher
- [x] Psi Warrior
- [x] Purple Dragon Knight (Banneret)
- [x] Rune Knight
- [x] Samurai

### Gunslinger (34)

- [x] Adrenaline Junkie
- [x] Big Game Hunter
- [x] Brigand
- [x] Covert Operative
- [x] Daggermark
- [x] Deadeye
- [x] Dragon Banner
- [x] Eagle Banner
- [x] Feylost
- [x] Gourmand
- [x] Grenadier
- [x] Gun Tank
- [x] Gun-Ko Master
- [x] Gundead
- [x] High Roller
- [x] Houndmaster
- [x] Janissary
- [x] Jolly Roger
- [x] Knight Errant
- [x] Musketeer
- [x] Pistolero
- [x] Plague Doctor
- [x] Pugilist
- [x] Rōnin
- [x] Secret Agent
- [x] Sharpshooter
- [x] Siegeball Jersey
- [x] Spellslinger
- [x] Storm Gunner
- [x] Trick Shot
- [x] Troubadour
- [x] Twice-Damned
- [x] White Hat
- [x] Yellow Sign

### Investigator (14)

- [x] Antiquarian
- [x] Archivist
- [x] Conspiracy Theorist
- [x] Containment Specialist
- [x] Detective
- [x] Exterminator
- [x] Infernal Agent
- [x] Infernum
- [x] Inquisitor
- [x] Kid Sleuth
- [x] Medium
- [x] Occultist
- [x] Spy
- [x] Time Operative

### Martyr (14)

- [x] Burden of Anonymity
- [x] Burden of Ascension
- [x] Burden of Atonement
- [x] Burden of Calamity
- [x] Burden of Discord
- [x] Burden of Fame
- [x] Burden of Levity
- [x] Burden of Mercy
- [x] Burden of Odyssey
- [x] Burden of Rebirth
- [x] Burden of Revolution
- [x] Burden of the End
- [x] Burden of Truth
- [x] Burden of Tyranny

### Monk (21)

- [x] Way of the Bow
- [x] Way of the Flagellant
- [x] Warrior of Mercy
- [x] Warrior of Pride
- [x] Warrior of Regret
- [x] Warrior of Shadow
- [x] Warrior of the Asura (Homebrew)
- [x] Warrior of the Elements
- [x] Warrior of the Leaden Crown
- [x] Warrior of the Open Hand
- [x] Warrior of the Street
- [x] Way of the Ascendant Dragon
- [x] Way of the Astral Self
- [x] Way of the Drunken Master
- [x] Way of the Four Elements
- [x] Way of the Four Fists
- [x] Way of the Kensei
- [x] Way of the Long Death
- [x] Way of the Mask
- [x] Way of the Rose
- [x] Way of the Sun Soul

### Monster Hunter (4)

- [x] Carver Guild
- [x] Devourer Guild
- [x] Occultist Guild
- [x] Trapper Guild

### Mystic (6)

- [x] Order of the Avatar
- [x] Order of the Awakened
- [x] Order of the Immortal
- [x] Order of the Nomad
- [x] Order of the Soul Knife
- [x] Order of the Wu Jen

### Necromancer (14)

- [x] Black Rider
- [x] Blood Ascendant
- [x] Corpse Florist
- [x] Crone
- [x] Dead Mist Acolyte
- [x] Death Knight
- [x] Necrodancer
- [x] Overlord
- [x] Pale Master
- [x] Pharaoh
- [x] Plague Lord
- [x] Reanimator
- [x] Reaper
- [x] Toymaker

### Paladin (19)

- [x] Oath of Conquest
- [x] Oath of Devotion
- [x] Oath of Eternal Night
- [x] Oath of Glory
- [x] Oath of Heresy
- [x] Oath of Pestilence
- [x] Oath of Redemption
- [x] Oath of Revelry
- [x] Oath of Slaughter
- [x] Oath of Storms
- [x] Oath of the Ancients
- [x] Oath of the Crown
- [x] Oath of the Noble Genies
- [x] Oath of The Sun
- [x] Oath of the Watchers
- [x] Oath of Vengeance
- [x] Oath of Winter
- [x] Oath of Zeal
- [x] Oathbreaker

### Ranger (19)

- [x] Beast Master
- [x] Beastborne
- [x] Drakewarden
- [x] Fey Wanderer
- [x] Freerunner
- [x] Gloom Stalker
- [x] Green Reaper
- [x] Highwayman
- [x] Hollow Warden
- [x] Horizon Walker
- [x] Hunter
- [x] Monster Slayer
- [x] Primordial Archer
- [x] Spellbreaker
- [x] Swarmkeeper
- [x] Trophy Hunter
- [x] Vermin Lord
- [x] Vigilante
- [x] Winter Walker

### Rogue (19)

- [x] Arachnoid Stalker — 🆕 ยังไม่เคยถูกวิเคราะห์ในไฟล์ tier-list เลย
- [x] Arcane Trickster
- [x] Assassin
- [x] Enforcer
- [x] Grifter
- [x] Highway Rider
- [x] Inquisitive
- [x] Mastermind
- [x] Misfortune Bringer
- [x] Phantom
- [x] Sanguine Thief
- [x] Scion of the Three
- [x] Scout
- [x] Shadow Master
- [x] Soulknife
- [x] Swashbuckler
- [x] Temporal Trickster
- [x] Thief
- [x] Titan Slayer

### Sacred Knight (6)

- [x] Throne of Doom and Slaughter
- [x] Throne of Eternity and Creation
- [x] Throne of Fear and Sorrow
- [x] Throne of Order and Law
- [x] Throne of Protection and Mercy
- [x] Throne of Wisdom and Spirit

### Sorcerer (20)

- [x] Aberrant Mind / Aberrant Sorcery
- [x] Apocalypse Sorcery
- [x] Clockwork Soul / Clockwork Sorcery
- [x] Divine Soul
- [x] Draconic Bloodline / Draconic Sorcery
- [x] Emotion Lord
- [x] Haunted Sorcery
- [x] Lunar Sorcery
- [x] Mirrorkin
- [x] Oozemaster
- [x] Pyromancer
- [x] Reincarnated Hero
- [x] Shadow Magic / Shadow Sorcery
- [x] Spellfire Sorcery
- [x] Spiritborn
- [x] Storm Sorcery
- [x] The Ruined Flame — 🆕 ยังไม่เคยถูกวิเคราะห์ในไฟล์ tier-list เลย
- [x] Toon Magic
- [x] Wild Magic / Wild Magic Sorcery
- [x] Wretched Bloodline Sorcery

### Tactician (6)

- [x] Gambler
- [x] Grandmaster
- [x] Medic
- [x] Mentalist
- [x] Scholar
- [x] War Mind

### Vagabond (18)

- [x] Adrenaline Junkie
- [x] Brigand
- [x] Daggermark
- [x] Dragon Banner
- [x] Eagle Banner
- [x] Feylost
- [x] Gourmand
- [x] Houndmaster
- [x] Jolly Roger
- [x] Knight Errant
- [x] Mage Brand
- [x] Plague Doctor
- [x] Pugilist
- [x] Rōnin
- [x] Siegeball Jersey
- [x] Tower Banner
- [x] Troubadour
- [x] Yellow Sign

### Warden (17)

- [x] Beastblood Guardian
- [x] Carrion King
- [x] Diabolist
- [x] Drake-Blooded
- [x] Fey Trailblazer
- [x] Godsworn
- [x] Grey Watchman
- [x] Hellkeeper
- [x] Iceheart Bastion
- [x] Loreseeker
- [x] Nightgaunt
- [x] Rimekeeper
- [x] Soulblood Shaman
- [x] Stoneheart Defender
- [x] Storm Sentinel
- [x] Verdant Protector
- [x] Witchbane Hunter

### Warlock (19)

- [x] Dead Mists
- [x] Future You Patron
- [x] Legacy
- [x] Magician
- [x] Symbiont
- [x] The Archfey
- [x] The Celestial
- [x] The Coven
- [x] The Fathomless
- [x] The Fiend
- [x] The First Vampire Patron
- [x] The Genie
- [x] The GM
- [x] The Great Old One
- [x] The Hexblade
- [x] The Parasite Patron
- [x] The Undead
- [x] The Undying
- [x] Undead Patron

### Warmage (11)

- [x] House of Bishops
- [x] House of Cards
- [x] House of Darts
- [x] House of Dice
- [x] House of Go
- [x] House of Kings
- [x] House of Knights
- [x] House of Lancers — 🆕 ยังไม่เคยถูกวิเคราะห์ในไฟล์ tier-list เลย
- [x] House of Pawns
- [x] House of Rooks
- [x] House of Roulette

### Witch (13)

- [x] Black Magic
- [x] Blood Magic
- [x] Blue Magic
- [x] Fragrant Magic
- [x] Gingerbread Magic
- [x] Green Magic
- [x] Purple Magic
- [x] Red Magic
- [x] Sky Magic
- [x] Steel Magic
- [x] Tea Magic
- [x] Technicolor Magic
- [x] White Magic

### Wizard (28)

- [x] Abjurer
- [x] Bladesinger
- [x] Chronomancer
- [x] Chronurgy Magic
- [x] Daemonologist
- [x] Diviner
- [x] Evoker
- [x] Familiar Master
- [x] Fumaturge
- [x] Gastronomer
- [x] Graviturgy Magic
- [x] Illusionist
- [x] Magic Missile Mage
- [x] Mystic Strategist
- [x] Order of Scribes
- [x] Plague Doctor
- [x] Protomancer
- [x] Sangromancer
- [x] School of Conjuration
- [x] School of Enchantment
- [x] School of Necromancy
- [x] School of Transmutation
- [x] Scroll Scribe
- [x] Wand Wizard
- [x] Somnomancer
- [x] Tyromancer
- [x] Universalist
- [x] War Magic

