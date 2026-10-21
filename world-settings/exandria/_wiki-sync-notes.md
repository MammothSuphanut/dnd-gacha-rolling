# บันทึกการเทียบคลัง Exandria กับ Critical Role Wiki

> ทำเมื่อ 2026-10-21 · ยึด **Critical Role Wiki** เป็นหลัก: ภูมิภาคของ Wildemount / Issylra / Marquet / Shattered Teeth ตาม [Template:Nav-Places](https://criticalrole.fandom.com/wiki/Template:Nav-Places) · Tal'Dorei ใช้ภูมิภาคภูมิศาสตร์ตามหัวข้อ Geography ของ [หน้า Tal'Dorei](https://criticalrole.fandom.com/wiki/Tal%27Dorei) (Nav-Places แบ่ง Tal'Dorei ตามการปกครอง) · สถานที่ที่ไม่อยู่ในรายการใช้ช่อง region/location ใน infobox ของหน้านั้น
> ดึงข้อมูลผ่าน MediaWiki API ของ wiki · สร้างดัชนีใหม่: `python world-settings/exandria/tools/build_index.py`

## สรุป

- **2026-10-21: แก้ชื่อให้ตรงกับ wiki** ทั้งในคลังและบนแผนที่ Azgaar: Bisaft Port → Bisaft Isle, Darktow → Darktow Isle, Port Daxio → Fort Daxio, Artati → Aruati, Qorco → Qoreo, Gelvar/Gelvan → Gelvaan, Aeor Crash Site → Aeor, The Miskath Pit → Miskath Pit, Vesper Timberlands → Vesper Timberland, Tz'aarm → Tz'Arrm, Niirdal-Sarquet → Niirdal-Sarqet, Termor Falls → Tormor Falls, Foramere villages → Foramere Basin, Mooren → Mooren Lake, หลุมขุดค้น Tishtan → Tishtan excavation site (ตาราง "ชื่อไม่ตรงกับ wiki" ด้านล่างเป็นบันทึกก่อนแก้)
- ชื่อที่ Exandria+ ตั้งเอง (ไม่มีใน wiki) แยกไว้ที่ `exandria-plus/contents/_homebrew-names.md`
- **2026-10-21: ลบทุกสถานที่ที่ไม่อยู่บนแผนที่ Azgaar** (88 ไฟล์ — มี lore 17 ไฟล์ กู้คืนได้จากประวัติ git) รายชื่ออยู่หัวข้อ "ลบแล้ว" ท้ายไฟล์ · ตาราง "ขาด" และ "เกิน" ด้านล่างเป็นบันทึกก่อนลบ
- ไฟล์เดิม 210 ไฟล์ จัดเข้าภูมิภาคครบ (ย้าย 192 ไฟล์ด้วย `git mv`) · การ์ดใน `manifest.json` แก้ path และลิงก์ wiki แล้ว
- **ขาด** (มีใน wiki แต่ไม่มีไฟล์): 76 แห่ง → สร้างไฟล์แบบมีแค่ลิงก์แล้ว
- **เกิน** (ไม่มีใน wiki เลย): 1 ไฟล์
- **ไม่มีหน้าแยก** (wiki กล่าวถึงในหน้าอื่น): 36 ไฟล์
- **ชื่อไม่ตรงกับ wiki**: 9 ไฟล์
- **ซ้ำกัน**: 1 กลุ่ม
- โฟลเดอร์ `domunas/` → `shattered-teeth/` (wiki จัด Domunas อยู่ในกลุ่ม Shattered Teeth)

## เกิน — ไม่มีใน wiki

| ไฟล์ | หมายเหตุ |
|---|---|
| [Dampflan](wildemount/eiselcross/dampflan.md) | ไม่มีใน wiki — ซ้ำกับ Dampfkan · เดาภูมิภาคจากแผนที่ |

## ไม่มีหน้าแยก — ลิงก์ไปหน้าที่กล่าวถึง

| ไฟล์ | ลิงก์ไป | หมายเหตุ |
|---|---|---|
| [Galgarad](wildemount/xhorhas/galgarad.md) | Explorer's Guide to Wildemount | ไม่มีหน้าแยก — wiki กล่าวถึงแค่ว่าบทความ D&D Beyond "Wildemount: Dark Star" ใช้ Galgarad เป็นฉาก · ภูมิภาคเดาจากแผนที่ |
| [Ghostwall](wildemount/xhorhas/ghostwall.md) | Dryca | ไม่มีหน้า Ghostwall — กล่าวถึงในหน้า Dryca (Ghostlands ของ Xhorhas) |
| [Herathis Mines](wildemount/dwendalian-empire/herathis-mines.md) | Deastok | ไม่มีหน้าแยก — กล่าวถึงในหน้า Deastok |
| [Mordant Isle](wildemount/blightshore/mordant-isle.md) | Tooth of Zehir | ไม่มีหน้าแยก — ลิงก์ไป Tooth of Zehir ตามที่การ์ดเดิมใช้ |
| [Strathfell](wildemount/blightshore/strathfell.md) | Ebonglass Massif | ไม่มีหน้าแยก — กล่าวถึงในหน้า Ebonglass Massif |
| [Gatsibadow](tal-dorei/cliffkeep-mountains/gatsibadow.md) | Gatshadow Mountain | ไม่มีหน้า "Gatsibadow" — น่าจะคือ Gatshadow Mountain (สะกดต่างกัน) |
| [Murdoon Mines](tal-dorei/dividing-plains/murdoon-mines.md) | Bramblewood Forest | ไม่มีหน้าแยก — กล่าวถึงในหน้า Bramblewood Forest |
| [New O'Noa](tal-dorei/bladeshimmer-shoreline/new-onoa.md) | O'Noa | ไม่มีหน้า "New O'Noa" — ลิงก์ไป O'Noa |
| [Niirdal-Gan](tal-dorei/rifenmist-peninsula/niirdal-gan.md) | Qoniira Tetrarchy | ไม่มีหน้าแยก — กล่าวถึงในหน้า Qoniira Tetrarchy |
| [Niirdal-Hup](tal-dorei/rifenmist-peninsula/niirdal-hup.md) | Qoniira Tetrarchy | ไม่มีหน้าแยก — กล่าวถึงในหน้า Qoniira Tetrarchy |
| [Orencleft](tal-dorei/verdant-expanse/orencleft.md) | Tormor Falls | ไม่มีหน้าแยก — กล่าวถึงในหน้า Tormor Falls (Orencleft อยู่เหนือน้ำตก) |
| [Puddlefoot](tal-dorei/bladeshimmer-shoreline/puddlefoot.md) | Rill | ไม่มีหน้า Puddlefoot — กล่าวถึงในหน้า Rill (หมู่บ้านใน Shalesteps) |
| [Ruins of Port Udall](tal-dorei/verdant-expanse/ruins-of-port-udall.md) | Gladepools | ไม่มีหน้าแยก — เป็นจุดสำคัญในหน้า Gladepools (Verdant Expanse) |
| [Skyneedle](tal-dorei/bladeshimmer-shoreline/skyneedle.md) | Eye of the Storm | ไม่มีหน้าแยก — กล่าวถึงในหน้า Eye of the Storm (วิหารเอลฟ์เก่าใน Daggerbay Mountains ซึ่งอยู่ใน Bladeshimmer Shoreline) |
| [Heaven's Stair](issylra/othanzia/vesper-timberland/heavens-stair.md) | Vasselheim | ไม่มีหน้าแยก — กล่าวถึงในหน้า Vasselheim |
| [สุสานของ Purvan Suul (The Sunken Tomb)](issylra/unspecified/purvan-suul-tomb.md) | Purvan Suul | ไม่มีหน้าของสุสาน — ลิงก์ไปหน้า Purvan Suul · wiki ไม่ระบุภูมิภาคของสุสาน |
| [Dead Man's Crater](marquet/hellcatch-valley/dead-mans-crater.md) | Hellcatch Valley | ไม่มีหน้าแยก — กล่าวถึงในหน้า Hellcatch Valley |
| [Doan](marquet/aeshanadoor/doan.md) | Aeshanadoor | ไม่มีหน้าแยก — กล่าวถึงในหน้า Aeshanadoor |
| [Eish-Allay](marquet/oderan-wilds/eish-allay.md) | Oderan Wilds | ไม่มีหน้าแยก — กล่าวถึงในหน้า Oderan Wilds |
| [Goradire](marquet/oderan-wilds/goradire.md) | Oderan Wilds | ไม่มีหน้าแยก — กล่าวถึงในหน้า Oderan Wilds |
| [Gujjar-Serai](marquet/hellcatch-valley/gujjar-serai.md) | Hellcatch Valley | ไม่มีหน้าใน wiki — มีแค่ชื่อในรายการสถานที่ของ Hellcatch Valley |
| [King's Fall](marquet/hellcatch-valley/kings-fall.md) | Hellcatch Valley | ไม่มีหน้าแยก — กล่าวถึงในหน้า Hellcatch Valley |
| [Loonpur](marquet/hellcatch-valley/loonpur.md) | Hellcatch Valley | ไม่มีหน้าแยก — กล่าวถึงในหน้า Hellcatch Valley |
| [Nadigarh](marquet/hellcatch-valley/nadigarh.md) | Hellcatch Valley | ไม่มีหน้าแยก — กล่าวถึงในหน้า Hellcatch Valley |
| [Otaladume](marquet/oderan-wilds/otaladume.md) | Exandria | ไม่มีหน้าแยก — ชื่อปรากฏในหน้า Exandria และ Tal'Dorei ของ wiki แต่ไม่มีคำอธิบาย · ภูมิภาคเดาจากแผนที่ |
| [Rajarma](marquet/hellcatch-valley/rajarma.md) | Hellcatch Valley | ไม่มีหน้าแยก — กล่าวถึงในหน้า Hellcatch Valley |
| [Sapiro Haven](marquet/oderan-wilds/sapiro-haven.md) | Oderan Wilds | ไม่มีหน้าแยก — กล่าวถึงในหน้า Oderan Wilds |
| [Gujjar-Serai](marquet/hellcatch-valley/gujjar-serai.md) | Hellcatch Valley | ไม่มีหน้าใน wiki — มีแค่ชื่อในรายการสถานที่ของ Hellcatch Valley |
| [Biessel](wildemount/eiselcross/biessel.md) | Eiselcross | ไม่มีหน้าแยก — กล่าวถึงในหน้า Eiselcross (หัวข้อของเกาะ) |
| [Dampfkan](wildemount/eiselcross/dampfkan.md) | Eiselcross | ไม่มีหน้าแยก — กล่าวถึงในหน้า Eiselcross (หัวข้อของเกาะ) |
| [Frostbogen](wildemount/eiselcross/frostbogen.md) | Eiselcross | ไม่มีหน้าแยก — กล่าวถึงในหน้า Eiselcross (หัวข้อของเกาะ) |
| [Gelier](wildemount/eiselcross/gelier.md) | Eiselcross | ไม่มีหน้าแยก — กล่าวถึงในหน้า Eiselcross (หัวข้อของเกาะ) |
| [Kaltsel](wildemount/eiselcross/kaltsel.md) | Eiselcross | ไม่มีหน้าแยก — กล่าวถึงในหน้า Eiselcross (หัวข้อของเกาะ) |
| [Salsvault](wildemount/eiselcross/salsavault.md) | Foren | ไม่มีหน้าแยก — กล่าวถึงในหน้า Foren และ Frigid woe |
| [Schneescel](wildemount/eiselcross/schneescel.md) | Eiselcross | ไม่มีหน้าแยก — กล่าวถึงในหน้า Eiselcross (หัวข้อของเกาะ) |
| [Taergoss](wildemount/eiselcross/taergoss.md) | Eiselcross | ไม่มีหน้าแยก — กล่าวถึงในหน้า Eiselcross (หัวข้อของเกาะ) |

## ชื่อไม่ตรงกับ wiki

| ไฟล์ (ชื่อที่เราใช้) | ชื่อใน wiki |
|---|---|
| [Bisaft Port](wildemount/menagerie-coast/swavain-islands/bisaft-port.md) | Bisaft Isle |
| [Darktow (Isle)](wildemount/menagerie-coast/swavain-islands/darktow.md) | Darktow Isle |
| [Foramere villages](tal-dorei/dividing-plains/foramere-villages.md) | Foramere Basin |
| [Mooren](tal-dorei/lucidian-coast/mooren.md) | Mooren Lake |
| [Niirdal-Sarquet](tal-dorei/rifenmist-peninsula/niirdal-sarquet.md) | Niirdal-Sarqet |
| [Termor Falls](tal-dorei/verdant-expanse/termor-falls.md) | Tormor Falls |
| [Tz'aarm](tal-dorei/rifenmist-peninsula/tzaarm.md) | Tz'Arrm |
| [Gelvan (Gelvaan)](marquet/taloned-highlands/gelvan.md) | Gelvaan |
| [หลุมขุดค้น Tishtan](marquet/hellcatch-valley/tishatan-excavation.md) | Tishtan excavation site |

## ซ้ำกัน

| หน้า wiki | ไฟล์ |
|---|---|
| Dampfkan (ไม่มีหน้า) | `wildemount/eiselcross/dampfkan.md` · `wildemount/eiselcross/dampflan.md` |

## ขาด — สร้างไฟล์แบบมีแค่ลิงก์

| สถานที่ | ไฟล์ | หมายเหตุ |
|---|---|---|
| Lake Umamu | `issylra/caramarin-reach/lake-umamu.md` |  |
| Irriam Canyon | `issylra/demithore-valley/irriam-canyon.md` |  |
| Seedfeld | `issylra/demithore-valley/seedfeld.md` |  |
| Serratus Wilderness | `issylra/demithore-valley/serratus-wilderness.md` |  |
| Spectrum Gorge | `issylra/demithore-valley/spectrum-gorge.md` |  |
| Scaldseat | `issylra/othanzia/scaldseat.md` |  |
| Cindergrove | `issylra/othanzia/sunderpeak-mountains/cindergrove.md` |  |
| Crypts of Thomara | `issylra/othanzia/vesper-timberland/crypts-of-thomara.md` |  |
| Marrowglade Loch | `issylra/othanzia/vesper-timberland/marrowglade-loch.md` |  |
| Thar Amphala | `issylra/othanzia/vesper-timberland/thar-amphala.md` |  |
| Silted Vale | `issylra/othanzia/zenwick-mountains/silted-vale.md` |  |
| Thomara | `issylra/othanzia/zenwick-mountains/thomara.md` | ไม่มีหน้าใน wiki — มีแค่ชื่อในรายการสถานที่ (Template:Nav-Places) |
| Tordusk Pass | `issylra/othanzia/zenwick-mountains/tordusk-pass.md` | ไม่มีหน้าใน wiki — มีแค่ชื่อในรายการสถานที่ (Template:Nav-Places) |
| Ascendant Bridge Mountain | `issylra/unspecified/ascendant-bridge-mountain.md` |  |
| Bozon Caves | `issylra/unspecified/bozon-caves.md` | ไม่มีหน้าใน wiki — มีแค่ชื่อในรายการสถานที่ (Template:Nav-Places) |
| Cofferfall Hill | `issylra/unspecified/cofferfall-hill.md` |  |
| Seagate | `issylra/unspecified/seagate.md` |  |
| Thorain Tundra | `issylra/unspecified/thorain-tundra.md` |  |
| Utesspire Mountains | `issylra/unspecified/utesspire-mountains.md` |  |
| Gloomed Jungles | `marquet/aeshanadoor/gloomed-jungles.md` |  |
| Hablon River | `marquet/aeshanadoor/hablon-river.md` |  |
| Kaal Mountains | `marquet/aeshanadoor/kaal-mountains.md` |  |
| Lapis Channel | `marquet/aeshanadoor/lapis-channel.md` |  |
| Shallowlands | `marquet/aeshanadoor/shallowlands.md` | ไม่มีหน้าใน wiki — มีแค่ชื่อในรายการสถานที่ (Template:Nav-Places) |
| Bay of Gifts | `marquet/aggrad-mountains/bay-of-gifts.md` |  |
| Shumas | `marquet/aggrad-mountains/shumas.md` |  |
| The Rift | `marquet/hellcatch-valley/the-rift.md` |  |
| Heartmoor | `marquet/oderan-wilds/heartmoor.md` |  |
| Honored Trails | `marquet/oderan-wilds/honored-trails.md` |  |
| Serpentwind Peaks | `marquet/oderan-wilds/serpentwind-peaks.md` |  |
| Cael Morrow | `marquet/rumedam-desert/cael-morrow.md` |  |
| Smouldercrown Mountains | `marquet/rumedam-desert/smouldercrown-mountains.md` |  |
| Coven Peaks | `marquet/taloned-highlands/coven-peaks.md` | ไม่มีหน้าใน wiki — มีแค่ชื่อในรายการสถานที่ (Template:Nav-Places) |
| Beryl Sea | `marquet/unspecified/beryl-sea.md` |  |
| Panagrip Sands | `marquet/unspecified/panagrip-sands.md` |  |
| Scaldwind Sands | `marquet/unspecified/scaldwind-sands.md` |  |
| Suuthan Volcano | `marquet/unspecified/suuthan-volcano.md` |  |
| Athos Peak | `shattered-teeth/athos-peak.md` |  |
| Athova-Rae | `shattered-teeth/athova-rae.md` |  |
| Avalir | `shattered-teeth/avalir.md` |  |
| Cathmoíra | `shattered-teeth/cathmoira.md` |  |
| Domunas | `shattered-teeth/domunas.md` |  |
| Evaterena | `shattered-teeth/evaterena.md` |  |
| Fool's Curtain | `shattered-teeth/fools-curtain.md` |  |
| Igthuldus | `shattered-teeth/igthuldus.md` |  |
| Kalutha | `shattered-teeth/kalutha.md` |  |
| Mount Ygora | `shattered-teeth/mount-ygora.md` |  |
| Ruukva | `shattered-teeth/ruukva.md` |  |
| Slival | `shattered-teeth/slival.md` |  |
| Toramunda | `shattered-teeth/toramunda.md` |  |
| Yutazo | `shattered-teeth/yutazo.md` |  |
| Daggerbay | `tal-dorei/bladeshimmer-shoreline/daggerbay.md` |  |
| Salar | `tal-dorei/bladeshimmer-shoreline/salar.md` |  |
| Vos'sykriss | `tal-dorei/bladeshimmer-shoreline/vossykriss.md` |  |
| Pools of Wittebak | `tal-dorei/cliffkeep-mountains/pools-of-wittebak.md` |  |
| Vulkanon | `tal-dorei/cliffkeep-mountains/vulkanon.md` |  |
| Yug'Voril | `tal-dorei/cliffkeep-mountains/yugvoril.md` |  |
| K’Tawl Swamp | `tal-dorei/lucidian-coast/ktawl-swamp.md` |  |
| Summit Peaks | `tal-dorei/lucidian-coast/summit-peaks.md` |  |
| Alabaster Sierras | `tal-dorei/parchwood-timberlands/alabaster-sierras.md` |  |
| Beynsfal Plateaus | `tal-dorei/rifenmist-peninsula/beynsfal-plateaus.md` |  |
| Hallowroot Hills | `tal-dorei/rifenmist-peninsula/hallowroot-hills.md` |  |
| Mornset Countryside | `tal-dorei/rifenmist-peninsula/mornset-countryside.md` |  |
| Rifenmist Jungle | `tal-dorei/rifenmist-peninsula/rifenmist-jungle.md` |  |
| Stormpoint Mountains | `tal-dorei/rifenmist-peninsula/stormpoint-mountains.md` |  |
| Frostweald | `tal-dorei/stormcrest-mountains/frostweald.md` |  |
| Jotunborg | `tal-dorei/the-neverfields/jotunborg.md` |  |
| Cauldron Sea | `wildemount/blightshore/cauldron-sea.md` |  |
| Savalirwood | `wildemount/greying-wildlands/savalirwood.md` |  |
| Bwualli | `wildemount/menagerie-coast/swavain-islands/bwualli.md` |  |
| Gravid Archipelago | `wildemount/menagerie-coast/swavain-islands/gravid-archipelago.md` |  |
| Vashlow | `wildemount/menagerie-coast/vashlow.md` |  |
| Barren Valley | `wildemount/xhorhas/barren-valley.md` |  |
| Emerald Loop Caravan Stop | `wildemount/xhorhas/emerald-loop-caravan-stop.md` |  |
| Seepfeed River | `wildemount/xhorhas/seepfeed-river.md` |  |
| Wandering Oak's Grove | `wildemount/xhorhas/wandering-oaks-grove.md` |  |

## ภูมิภาคที่ต่างจากที่เคยเดาไว้

- Palebank Village, Mythburrow → Greying Wildlands (ไม่ใช่ Eiselcross)
- Grimgolir, Rockguard Garrison, Ashguard Garrison, Bladegarden, Talonstadt → Dwendalian Empire
- Ebonglass Massif, Strathfell, Far Hharom, Olc Skerry, Incanter's Rest, Miskath Pit, Mordant Isle → **Blightshore** (wiki แยก Blightshore ออกจาก Xhorhas)
- Wuyun Gates, Dolithil Mine → Menagerie Coast
- Swavain Islands เป็นภูมิภาคย่อยของ Menagerie Coast (`menagerie-coast/swavain-islands/`)
- Issylra: Othanzia มีภูมิภาคย่อย Sunderpeak Mountains / Vesper Timberland / Zenwick Mountains · Ivaadel, Hishari, Hug Hive, Thorain Tundra, Utesspire Mountains = wiki ไม่ระบุภูมิภาค (`unspecified/`)
- Marquet: มีภูมิภาค Aggrad Mountains (Shammel, Vault of Shumas)

## เดาภูมิภาค (wiki ไม่บอก)

- [Dampflan](wildemount/eiselcross/dampflan.md)

## ลบแล้ว — ไม่อยู่บนแผนที่ (2026-10-21)

| ภูมิภาคเดิม | สถานที่ | มี lore | CR Wiki |
|---|---|---|---|
| issylra/caramarin-reach | Lake Umamu | — | [Critical Role Wiki: Lake Umamu](https://criticalrole.fandom.com/wiki/Lake_Umamu) |
| issylra/caramarin-reach | Ria'Doin | ✓ | [Critical Role Wiki: Ria'Doin](https://criticalrole.fandom.com/wiki/Ria'Doin) |
| issylra/demithore-valley | Irriam Canyon | — | [Critical Role Wiki: Irriam Canyon](https://criticalrole.fandom.com/wiki/Irriam_Canyon) |
| issylra/demithore-valley | Serratus Wilderness | — | [Critical Role Wiki: Serratus Wilderness](https://criticalrole.fandom.com/wiki/Serratus_Wilderness) |
| issylra/demithore-valley | Spectrum Gorge | — | [Critical Role Wiki: Spectrum Gorge](https://criticalrole.fandom.com/wiki/Spectrum_Gorge) |
| issylra/othanzia | Scaldseat | — | [Critical Role Wiki: Scaldseat](https://criticalrole.fandom.com/wiki/Scaldseat) |
| issylra/othanzia | Shoresight Isle | ✓ | [Critical Role Wiki: Shoresight Isle](https://criticalrole.fandom.com/wiki/Shoresight_Isle) |
| issylra/othanzia/sunderpeak-mountains | Cindergrove | — | [Critical Role Wiki: Cindergrove](https://criticalrole.fandom.com/wiki/Cindergrove) |
| issylra/othanzia/vesper-timberland | Crypts of Thomara | — | [Critical Role Wiki: Crypts of Thomara](https://criticalrole.fandom.com/wiki/Crypts_of_Thomara) |
| issylra/othanzia/vesper-timberland | Heaven's Stair | ✓ | [Critical Role Wiki: Vasselheim](https://criticalrole.fandom.com/wiki/Vasselheim) |
| issylra/othanzia/vesper-timberland | Himblewood | ✓ | [Critical Role Wiki: Himblewood](https://criticalrole.fandom.com/wiki/Himblewood) |
| issylra/othanzia/vesper-timberland | Marrowglade Loch | — | [Critical Role Wiki: Marrowglade Loch](https://criticalrole.fandom.com/wiki/Marrowglade_Loch) |
| issylra/othanzia/vesper-timberland | Thar Amphala | — | [Critical Role Wiki: Thar Amphala](https://criticalrole.fandom.com/wiki/Thar_Amphala) |
| issylra/othanzia/zenwick-mountains | Silted Vale | — | [Critical Role Wiki: Silted Vale](https://criticalrole.fandom.com/wiki/Silted_Vale) |
| issylra/othanzia/zenwick-mountains | Thomara | — | — |
| issylra/othanzia/zenwick-mountains | Tordusk Pass | — | — |
| issylra/unspecified | Ascendant Bridge Mountain | — | [Critical Role Wiki: Ascendant Bridge Mountain](https://criticalrole.fandom.com/wiki/Ascendant_Bridge_Mountain) |
| issylra/unspecified | Bozon Caves | — | — |
| issylra/unspecified | Cofferfall Hill | — | [Critical Role Wiki: Cofferfall Hill](https://criticalrole.fandom.com/wiki/Cofferfall_Hill) |
| issylra/unspecified | Hug Hive | ✓ | [Critical Role Wiki: Hug Hive](https://criticalrole.fandom.com/wiki/Hug_Hive) |
| issylra/unspecified | สุสานของ Purvan Suul (The Sunken Tomb) | ✓ | [Critical Role Wiki: Purvan Suul](https://criticalrole.fandom.com/wiki/Purvan_Suul) |
| issylra/unspecified | Seagate | — | [Critical Role Wiki: Seagate](https://criticalrole.fandom.com/wiki/Seagate) |
| marquet/aeshanadoor | Doan | ✓ | [Critical Role Wiki: Aeshanadoor](https://criticalrole.fandom.com/wiki/Aeshanadoor) |
| marquet/aeshanadoor | Gloomed Jungles | — | [Critical Role Wiki: Gloomed Jungles](https://criticalrole.fandom.com/wiki/Gloomed_Jungles) |
| marquet/aeshanadoor | Hablon River | — | [Critical Role Wiki: Hablon River](https://criticalrole.fandom.com/wiki/Hablon_River) |
| marquet/aeshanadoor | Kaal Mountains | — | [Critical Role Wiki: Kaal Mountains](https://criticalrole.fandom.com/wiki/Kaal_Mountains) |
| marquet/aeshanadoor | Lapis Channel | — | [Critical Role Wiki: Lapis Channel](https://criticalrole.fandom.com/wiki/Lapis_Channel) |
| marquet/aeshanadoor | Shallowlands | — | — |
| marquet/aggrad-mountains | Bay of Gifts | — | [Critical Role Wiki: Bay of Gifts](https://criticalrole.fandom.com/wiki/Bay_of_Gifts) |
| marquet/aggrad-mountains | Shumas | — | [Critical Role Wiki: Shumas](https://criticalrole.fandom.com/wiki/Shumas) |
| marquet/hellcatch-valley | The Rift | — | [Critical Role Wiki: The Rift](https://criticalrole.fandom.com/wiki/The_Rift) |
| marquet/oderan-wilds | Heartmoor | — | [Critical Role Wiki: Heartmoor](https://criticalrole.fandom.com/wiki/Heartmoor) |
| marquet/oderan-wilds | Honored Trails | — | [Critical Role Wiki: Honored Trails](https://criticalrole.fandom.com/wiki/Honored_Trails) |
| marquet/oderan-wilds | Serpentwind Peaks | — | [Critical Role Wiki: Serpentwind Peaks](https://criticalrole.fandom.com/wiki/Serpentwind_Peaks) |
| marquet/rumedam-desert | Cael Morrow | — | [Critical Role Wiki: Cael Morrow](https://criticalrole.fandom.com/wiki/Cael_Morrow) |
| marquet/rumedam-desert | Smouldercrown Mountains | — | [Critical Role Wiki: Smouldercrown Mountains](https://criticalrole.fandom.com/wiki/Smouldercrown_Mountains) |
| marquet/taloned-highlands | Coven Peaks | — | — |
| marquet/unspecified | Panagrip Sands | — | [Critical Role Wiki: Panagrip Sands](https://criticalrole.fandom.com/wiki/Panagrip_Sands) |
| marquet/unspecified | Scaldwind Sands | — | [Critical Role Wiki: Scaldwind Sands](https://criticalrole.fandom.com/wiki/Scaldwind_Sands) |
| marquet/unspecified | Suuthan Volcano | — | [Critical Role Wiki: Suuthan Volcano](https://criticalrole.fandom.com/wiki/Suuthan_Volcano) |
| marquet/unspecified | เกาะ Viscan | ✓ | [Critical Role Wiki: Island of Viscan](https://criticalrole.fandom.com/wiki/Island_of_Viscan) |
| shattered-teeth | Athos Peak | — | [Critical Role Wiki: Athos Peak](https://criticalrole.fandom.com/wiki/Athos_Peak) |
| shattered-teeth | Athova-Rae | — | [Critical Role Wiki: Athova-Rae](https://criticalrole.fandom.com/wiki/Athova-Rae) |
| shattered-teeth | Avalir | — | [Critical Role Wiki: Avalir](https://criticalrole.fandom.com/wiki/Avalir) |
| shattered-teeth | Cathmoíra | — | [Critical Role Wiki: Cathmoíra](https://criticalrole.fandom.com/wiki/Cathmo%C3%ADra) |
| shattered-teeth | Domunas | — | [Critical Role Wiki: Domunas](https://criticalrole.fandom.com/wiki/Domunas) |
| shattered-teeth | Evaterena | — | [Critical Role Wiki: Evaterena](https://criticalrole.fandom.com/wiki/Evaterena) |
| shattered-teeth | Fool's Curtain | — | [Critical Role Wiki: Fool's Curtain](https://criticalrole.fandom.com/wiki/Fool's_Curtain) |
| shattered-teeth | Igthuldus | — | [Critical Role Wiki: Igthuldus](https://criticalrole.fandom.com/wiki/Igthuldus) |
| shattered-teeth | Kalutha | — | [Critical Role Wiki: Kalutha](https://criticalrole.fandom.com/wiki/Kalutha) |
| shattered-teeth | Mount Ygora | — | [Critical Role Wiki: Mount Ygora](https://criticalrole.fandom.com/wiki/Mount_Ygora) |
| shattered-teeth | Ruukva | — | [Critical Role Wiki: Ruukva](https://criticalrole.fandom.com/wiki/Ruukva) |
| shattered-teeth | Slival | — | [Critical Role Wiki: Slival](https://criticalrole.fandom.com/wiki/Slival) |
| shattered-teeth | Toramunda | — | [Critical Role Wiki: Toramunda](https://criticalrole.fandom.com/wiki/Toramunda) |
| shattered-teeth | Yutazo | — | [Critical Role Wiki: Yutazo](https://criticalrole.fandom.com/wiki/Yutazo) |
| tal-dorei/bladeshimmer-shoreline | Daggerbay | — | [Critical Role Wiki: Daggerbay](https://criticalrole.fandom.com/wiki/Daggerbay) |
| tal-dorei/bladeshimmer-shoreline | Salar | — | [Critical Role Wiki: Salar](https://criticalrole.fandom.com/wiki/Salar) |
| tal-dorei/bladeshimmer-shoreline | Skyneedle | ✓ | [Critical Role Wiki: Eye of the Storm](https://criticalrole.fandom.com/wiki/Eye_of_the_Storm) |
| tal-dorei/bladeshimmer-shoreline | Vos'sykriss | — | [Critical Role Wiki: Vos'sykriss](https://criticalrole.fandom.com/wiki/Vos'sykriss) |
| tal-dorei/cliffkeep-mountains | Emberhold | ✓ | [Critical Role Wiki: Emberhold](https://criticalrole.fandom.com/wiki/Emberhold) |
| tal-dorei/cliffkeep-mountains | Palace of Wonder | ✓ | [Critical Role Wiki: Palace of Wonder](https://criticalrole.fandom.com/wiki/Palace_of_Wonder) |
| tal-dorei/cliffkeep-mountains | Pools of Wittebak | — | [Critical Role Wiki: Pools of Wittebak](https://criticalrole.fandom.com/wiki/Pools_of_Wittebak) |
| tal-dorei/cliffkeep-mountains | Vulkanon | — | [Critical Role Wiki: Vulkanon](https://criticalrole.fandom.com/wiki/Vulkanon) |
| tal-dorei/cliffkeep-mountains | Yug'Voril | — | [Critical Role Wiki: Yug'Voril](https://criticalrole.fandom.com/wiki/Yug'Voril) |
| tal-dorei/dividing-plains | Throne of the Arch Heart | ✓ | [Critical Role Wiki: Throne of the Arch Heart](https://criticalrole.fandom.com/wiki/Throne_of_the_Arch_Heart) |
| tal-dorei/lucidian-coast | K’Tawl Swamp | — | [Critical Role Wiki: K’Tawl Swamp](https://criticalrole.fandom.com/wiki/K%E2%80%99Tawl_Swamp) |
| tal-dorei/lucidian-coast | Summit Peaks | — | [Critical Role Wiki: Summit Peaks](https://criticalrole.fandom.com/wiki/Summit_Peaks) |
| tal-dorei/ozmit-sea | Vesrah | ✓ | [Critical Role Wiki: Vesrah](https://criticalrole.fandom.com/wiki/Vesrah) |
| tal-dorei/parchwood-timberlands | Alabaster Sierras | — | [Critical Role Wiki: Alabaster Sierras](https://criticalrole.fandom.com/wiki/Alabaster_Sierras) |
| tal-dorei/rifenmist-peninsula | Beynsfal Plateaus | — | [Critical Role Wiki: Beynsfal Plateaus](https://criticalrole.fandom.com/wiki/Beynsfal_Plateaus) |
| tal-dorei/rifenmist-peninsula | Hallowroot Hills | — | [Critical Role Wiki: Hallowroot Hills](https://criticalrole.fandom.com/wiki/Hallowroot_Hills) |
| tal-dorei/rifenmist-peninsula | Heldenfaire | ✓ | [Critical Role Wiki: Heldenfaire](https://criticalrole.fandom.com/wiki/Heldenfaire) |
| tal-dorei/rifenmist-peninsula | Mornset Countryside | — | [Critical Role Wiki: Mornset Countryside](https://criticalrole.fandom.com/wiki/Mornset_Countryside) |
| tal-dorei/rifenmist-peninsula | Rifenmist Jungle | — | [Critical Role Wiki: Rifenmist Jungle](https://criticalrole.fandom.com/wiki/Rifenmist_Jungle) |
| tal-dorei/rifenmist-peninsula | Stormpoint Mountains | — | [Critical Role Wiki: Stormpoint Mountains](https://criticalrole.fandom.com/wiki/Stormpoint_Mountains) |
| tal-dorei/stormcrest-mountains | Frostweald | — | [Critical Role Wiki: Frostweald](https://criticalrole.fandom.com/wiki/Frostweald) |
| tal-dorei/the-neverfields | Jotunborg | — | [Critical Role Wiki: Jotunborg](https://criticalrole.fandom.com/wiki/Jotunborg) |
| tal-dorei/unspecified | Roch Mar | ✓ | [Critical Role Wiki: Roch Mar](https://criticalrole.fandom.com/wiki/Roch_Mar) |
| tal-dorei/verdant-expanse | Ruins of Port Udall | ✓ | [Critical Role Wiki: Gladepools](https://criticalrole.fandom.com/wiki/Gladepools) |
| wildemount/blightshore | Cauldron Sea | — | [Critical Role Wiki: Cauldron Sea](https://criticalrole.fandom.com/wiki/Cauldron_Sea) |
| wildemount/eiselcross | Dampflan | ✓ | — |
| wildemount/menagerie-coast/swavain-islands | Bwualli | — | [Critical Role Wiki: Bwualli](https://criticalrole.fandom.com/wiki/Bwualli) |
| wildemount/menagerie-coast/swavain-islands | Gravid Archipelago | — | [Critical Role Wiki: Gravid Archipelago](https://criticalrole.fandom.com/wiki/Gravid_Archipelago) |
| wildemount/menagerie-coast | Vashlow | — | [Critical Role Wiki: Vashlow](https://criticalrole.fandom.com/wiki/Vashlow) |
| wildemount/xhorhas | Barren Valley | — | [Critical Role Wiki: Barren Valley](https://criticalrole.fandom.com/wiki/Barren_Valley) |
| wildemount/xhorhas | Emerald Loop Caravan Stop | — | [Critical Role Wiki: Emerald Loop Caravan Stop](https://criticalrole.fandom.com/wiki/Emerald_Loop_Caravan_Stop) |
| wildemount/xhorhas | Seepfeed River | — | [Critical Role Wiki: Seepfeed River](https://criticalrole.fandom.com/wiki/Seepfeed_River) |
| wildemount/xhorhas | Wandering Oak's Grove | — | [Critical Role Wiki: Wandering Oak's Grove](https://criticalrole.fandom.com/wiki/Wandering_Oak's_Grove) |
