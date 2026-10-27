# Foundry VTT — การเก็บข้อมูล (Storage Layout)

กฎการจัดเก็บไฟล์ใน `D:\FoundryVTT_Data\Data` ตั้งแต่ 2026-10-27 (ตอนเปลี่ยนชื่อโลก Astral Nexus: Constellation Protocol → **Novaris**)
ไฟล์ทุกไฟล์ที่ Claude หรือสคริปต์สร้างให้ Foundry ต้องลงตามผังนี้

## หลักการ

1. **โฟลเดอร์โลกมีแค่ของที่ Foundry จัดการเอง** ได้แก่ DB, compendium, thumbnail ฉาก และไฟล์ตั้งค่าของโลกนั้น ห้ามเอารูป เสียง หรือแผนที่ไปเก็บในโลก
2. **ไฟล์สื่อทุกชนิดอยู่ใน `Data/assets/`** ซึ่งไม่ผูกกับชื่อโลก เวลาเปลี่ยนชื่อโลกหรือแยกโลกใหม่ ลิงก์จะไม่เสีย และหลายโลกใช้ไฟล์ร่วมกันได้
3. **ชั้นบนตั้งชื่อด้วยตัวเล็กและขีดกลาง** (`campaigns/aeorian-cataclysm/`) ไม่มีช่องว่าง ลิงก์จะไม่กลายเป็น `%20` **ชั้นล่างคงชื่อเดิม** (ชื่อตัวละคร, Category/Pack, ชื่อไฟล์)
4. **ไม่เก็บไฟล์ซ้ำ** ไฟล์ใหม่ต้องเช็ค hash กับของที่มีอยู่ก่อนวาง

## ผัง

```
D:\FoundryVTT_Data\
├─ Data\
│  ├─ worlds\novaris\                 ← โลก (id: novaris, title: Novaris)
│  │  ├─ world.json
│  │  ├─ data\  packs\                DB (LevelDB) + compendium ของโลก
│  │  ├─ assets\scenes\               thumbnail ฉากที่ Foundry สร้างเอง (ห้ามย้าย)
│  │  ├─ background.png / .webp       พื้นหลังหน้าเข้าโลก
│  │  └─ encounter-tables.json, token-action-hud-layout.json, character-sheet.pdf
│  │
│  ├─ assets\                         ← คลังไฟล์กลาง (Foundry อ้างเป็น "assets/...")
│  │  ├─ art\  srd5e\                 ของเดิม ไม่แตะ
│  │  ├─ characters\<ชื่อตัวละคร>\     PC + NPC ประจำ: portrait / token / crop
│  │  ├─ tokens\
│  │  │  ├─ face-tokens\              face token ทั่วไป
│  │  │  ├─ npc-default\              NPC มาตรฐาน (Vampire Mind Flayer ฯลฯ)
│  │  │  └─ npc-homebrew\             NPC homebrew (Croaker ฯลฯ)
│  │  ├─ map-assets\<Category>\<Pack>\   ของแต่งแมพ: Buildings Camp Dungeon Furniture Market
│  │  │                               Nature Props Treasure Water (Market/Treasure ไม่มีชั้น Pack)
│  │  ├─ scenes\                      ฉากที่ใช้ได้หลายแคมเปญ: Exandria Snow Shadowfell The Planes Remohaz Ship
│  │  ├─ world\novaris\               ข้อมูลโลก Novaris
│  │  │  ├─ atlas\                    novaris-v3-*.webp (แผนที่ DM + -player)
│  │  │  ├─ journal\<ทวีป>.json       ข้อมูลให้ Create-Novaris-Journal
│  │  │  └─ <Continent>\<Region>\<City|Map>\   แผนที่เมือง/battlemap + <key>.json
│  │  ├─ campaigns\<campaign-slug>\   ของเฉพาะแต่ละแคมเปญ แยกเป็น actors\ scenes\ journal\ (+ cover/banner)
│  │  │  ├─ aeorian-cataclysm\        (+ fragments\)
│  │  │  ├─ echoes-of-the-heroes\
│  │  │  ├─ frozen-sick\
│  │  │  └─ descent-of-phandelver\
│  │  ├─ audio\sfx\                   soundfxlibrary (Combat Creatures Misc Nature Tavern Town)
│  │  └─ source\                      วัตถุดิบดิบที่ไม่ได้ใช้ในฉากโดยตรง (PDF, แผนที่ต้นฉบับ, ภาพ AI)
│  │     ├─ aeorian-cataclysm\  heroic-trial\  shop-catalog\
│  │
│  ├─ Soundboards\                    เสียงมีม/soundboard (playlist อ้างอยู่ ไม่ย้าย)
│  ├─ modules\  systems\              Foundry จัดการเอง
│  └─ User Avatar\
│
└─ Backups\                           Foundry backup + manual-pre-<งาน>-<วันที่>\
```

## ของใหม่วางไว้ที่ไหน

| ของ | ที่วาง |
|---|---|
| รูป PC/NPC ประจำ (portrait, token) | `assets/characters/<ชื่อ>/` |
| NPC/มอนสเตอร์ของแคมเปญเดียว | `assets/campaigns/<slug>/actors/` |
| แผนที่ฉากของแคมเปญเดียว | `assets/campaigns/<slug>/scenes/<พื้นที่>/` |
| แผนที่ฉากใช้ซ้ำได้ | `assets/scenes/<ธีม>/` |
| แผนที่/เมือง/battlemap ในโลก Novaris (Canvas of Kings, Dungeondraft) | `assets/world/novaris/<Continent>/<Region>/<Name>/` |
| ไฟล์ JSON ข้อมูลให้ macro อ่าน (journal, city, battlemap) | อยู่ข้างไฟล์รูปที่มันอธิบาย |
| token ของแต่งแมพ (2MT ฯลฯ) | `assets/map-assets/<Category>/<Pack>/` |
| แคมเปญใหม่ | สร้าง `assets/campaigns/<slug-ตัวเล็ก-ขีดกลาง>/` |
| Upload Path ของ Universal Battlemap Importer | `assets/world/novaris/<Continent>/<Region>/<Map>` |

macro/สคริปต์ใน repo ห้ามใส่ `worlds/<id>/` ถ้าไม่ใช่ไฟล์ของโลกจริงๆ ถ้าต้องอ่าน DB ให้ใช้ `D:/FoundryVTT_Data/Data/worlds/novaris`

## ย้ายโฟลเดอร์ / เปลี่ยนชื่อโลก (ห้ามทำในหน้า Edit World ของ Foundry)

การเปลี่ยน Data Path ในหน้า Setup จะเปลี่ยนแค่ชื่อโฟลเดอร์ แต่ลิงก์ในฉาก, actor และ setting จะไม่เปลี่ยนตาม รูปจะหายทั้งโลก ให้ทำตามนี้แทน:

1. ปิด Foundry ให้สนิท (ปิดทั้งเซิร์ฟเวอร์ ไม่ใช่แค่ออกมาหน้า Setup)
2. backup ทั้งโลก: `robocopy <world> D:\FoundryVTT_Data\Backups\manual-pre-<งาน>-<วันที่>\<id> /E /MT:8`
3. แก้ `OPS` ใน [migrate-world-storage.cjs](migrate-world-storage.cjs) แล้วรัน `--dry-run` ดูรายการย้าย จำนวนลิงก์ และลิงก์ที่หาไฟล์ไม่เจอ
4. `--apply` ระบบจะแก้ลิงก์ใน DB, ย้ายไฟล์, เปลี่ยนชื่อโฟลเดอร์โลก และแก้ `world.json` ให้
5. เปิดโลก ตรวจฉากและ token ถ้าดีแล้วค่อยให้ผู้ใช้ลบ backup เอง
6. แก้ path ในไฟล์ของ repo (`git grep` หา path เก่า) และอัปเดตไฟล์นี้

ถ้าย้ายแค่ไม่กี่ไฟล์ตอนที่ Foundry เปิดอยู่ ใช้ [Relink-Moved-Assets.macro.js](Relink-Moved-Assets.macro.js) (Preview ก่อน Apply)

**อ่าน DB โดยไม่แก้:** ดู [read-party.cjs](read-party.cjs) (copy collection ไปที่อื่นแล้วเปิดด้วย `classic-level` ของ Foundry) **ห้ามเขียนลง DB ขณะ Foundry เปิดอยู่**

## บันทึกการย้าย 2026-10-27

- `worlds/astral-nexus-constellation-protocol` → `worlds/novaris` แก้ลิงก์ 1,703 จุด ใน 801 doc
- ย้ายไฟล์ออกจากโลกไป `assets/` 7,016 ไฟล์ (4.5 GB) เป็นการ rename บนไดรฟ์เดียวกัน ไม่มีการ copy
- ซ่อมลิงก์ที่เสียอยู่ก่อนแล้ว 3 จุด (soundfxlibrary setting, Vampire Mind Flayer, Beer Cella)
- ที่ยังเสียอยู่ 2 จุด เพราะไม่มีไฟล์จริงตั้งแต่ก่อนย้าย: `assets/characters/Oxton/Oxton token.png` และ `worlds/novaris/imported-from-worldA/characters/414_-_Stalin_chan/token.png`
- face token ที่ซ้ำ 107 ไฟล์ (จาก source) พักไว้ที่ `Backups/manual-pre-novaris-2026-10-27/_to-delete/`
- backup เต็มก่อนย้าย: `Backups/manual-pre-novaris-2026-10-27/astral-nexus-constellation-protocol/`
