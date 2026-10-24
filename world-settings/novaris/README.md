# Novaris — README ส่งต่องาน (อ่านก่อนลงมือ)

> เขียน 2026-10-23 บน branch `devMammoth` · ไฟล์นี้คือ**ใบส่งต่องานชั่วคราว** ไม่ใช่เอกสารถาวรของโปรเจกต์
>
> **สำหรับแชทที่มาอ่านไฟล์นี้:**
> 1. อ่านทั้งไฟล์ก่อน แล้วทำหัวข้อ **"งานที่ต้องทำ"** ทีละข้อตามลำดับ
> 2. ตอบผู้ใช้เป็น**ภาษาไทย** · เรื่องที่ต้องตัดสินใจเรื่อง lore ให้**ถามผู้ใช้ก่อน** ห้ามเดาเอง
> 3. **เมื่อทำงานในไฟล์นี้เสร็จครบ ให้ลบไฟล์นี้ (`world-settings/novaris/README.md`) แล้ว commit + push** — เพื่อให้ที่ว่างสำหรับ README ส่งต่องานรอบหน้า
> 4. ถ้าทำไม่เสร็จในแชทเดียว ให้แก้ไฟล์นี้ให้ตรงกับสถานะล่าสุดแทนการลบ แล้ว commit + push

## Novaris คืออะไร

โลก homebrew ของผู้ใช้ (เดิมชื่อ Exandria+) ที่ดัดแปลงจาก Exandria ของ Critical Role — 5 ทวีป แต่ละโฟลเดอร์คือหนึ่งทวีป

| โฟลเดอร์ | ทวีป | ธีม |
|---|---|---|
| `aldenreich/` | Aldenreich | ยุคกลางตะวันตก (เยอรมัน/อิตาลี/อังกฤษ) |
| `voxaria/` | Voxaria | ยุคปัจจุบัน + เวท · ระบบ Sector |
| `shenzhou/` | Shenzhou | ตะวันออก — ครึ่งบนญี่ปุ่น ครึ่งล่างยุทธภพจีน-เกาหลี |
| `suvarna/` | Suvarna | เผ่าเล็กหลายวัฒนธรรม — ไทย อินเดีย โรมัน สปาร์ตา ไวกิ้ง ชนเผ่าทุ่ง มายา |
| `eldmere/` | Eldmere | หมู่เกาะในตำนานของเผ่ายิ่งใหญ่โบราณ (ไม่มีคน ไม่มีเมือง) — มีไฟล์ถิ่นครบ 7 ถิ่น + เกาะ |

ไฟล์สำคัญ:

- `contents/_canon-decisions.md` · `contents/_location-themes-draft.md` — **ไฟล์หลักของ canon** แก้ที่นี่แล้วรัน `python tools/split_canon.py` เพื่ออัปเดต `contents/canon/*.md` และหัวข้อ "ธีมและองค์กรของทวีป (sync จากไฟล์หลัก)" ท้าย overview ทุกทวีป (**ห้ามแก้หัวข้อนั้นตรง ๆ**)
- `contents/_name-table.md` — ตารางชื่อสถานที่ทั้งโลก (ชื่อเดิม → ชื่อ Novaris → ไฟล์)
- `maps/azgaar/README.md` — วิธีรัน/สร้างแอป Azgaar, endpoint เซฟ/export, สเกล
- `maps/azgaar/saves/novaris.map` = `novaris-v3.map` — แผนที่หลัก (สองไฟล์ต้องเหมือนกันทุกไบต์)
- `maps/azgaar/places-v3.json` — ตำแหน่งเมือง/ป้ายทั้งหมด ใช้ปักหมุด journal
- `tools/build_foundry_journal.py` — สร้าง journal JSON ของแต่ละทวีปให้ Foundry
- `codex/foundry-utility/Create-Novaris-Scene.macro.js` · `Create-Novaris-Journal.macro.js` (นอกโฟลเดอร์นี้) — macro ใน Foundry: สร้างฉาก/โฟลเดอร์ และ journal + หมุด (เห็นเฉพาะ GM)

## สถานะล่าสุด

งานใหญ่ที่จบแล้ว (2026-10-23–24): **lore ครบทุกจุดบนแผนที่** — เมืองที่ Azgaar สุ่มเติม 248 เมือง · Eldmere 7 ถิ่น · ทะเล · เกาะ 139 เกาะ · แม่น้ำ 82 สาย (ทุกไฟล์ติดป้าย "ร่าง — รอ DM ตรวจ" และ ✨ = ข้อเสนอที่ยังไม่ยืนยัน) · **งานข้อ 0 เสร็จแล้ว — เริ่มที่ข้อ 1**

| ทวีป | เมือง | ข้อตัดสินใจของผู้ใช้ |
|---|---|---|
| Aldenreich | 35 | เมืองรัฐ Dwendalian ที่อยู่ใน Costa Mosaica = **อาณานิคมของจักรวรรดิ** → `costa-mosaica/saltmarch/`, `costa-mosaica/green-march/` |
| Voxaria | 48 | **ระบบ Sector**: ทุกเมือง = "Sector NN: Name" เลขน้อย = เจริญกว่า · เลขตายตัว · ป้ายแผนที่ "Name (Snn)" · ตารางใน `voxaria/_overview.md` |
| Shenzhou | 66 | ผูกกับ**สำนัก ตระกูล และฝ่าย** — ดู `shenzhou/_overview.md` หัวข้อ "สำนัก ตระกูล และฝ่าย" · **พรรคมารสวรรค์ไม่เคยถูกทำลาย อยู่มาตั้งแต่ยุคแรก ไม่มีใครบุกตัวพรรค ("อย่าแตะเกล็ดย้อนของมังกร") ไล่ล่าคนของพรรคนอกเขตมารได้ ราชันมารแทบไม่ลงมือ** |
| Suvarna | 99 | **เผ่าเล็กหลายเผ่า** — ดู `suvarna/_overview.md` หัวข้อ "เผ่าและตระกูล" · ไวกิ้ง Jarnfell **อิสระ** · Ehrvarn **เผ่าเดียว ชื่อเยอรมัน** · ภูมิภาคใหม่ `suvarna/chakan-wilds/` ของ**เผ่ามายา 4 เผ่า** · ชนเผ่าทุ่งใช้ชื่ออังกฤษแบบบรรยายภาพ |
| Eldmere | 0 | ไม่มีเมืองสุ่ม |

## สิ่งที่ไม่อยู่ใน git (ต้องมีในเครื่องที่ทำงาน)

| ของ | อยู่ที่ไหน | ถ้าไม่มี |
|---|---|---|
| แอป Azgaar | `maps/azgaar/app/` (gitignored) | สร้างใหม่ตาม `maps/azgaar/README.md` หัวข้อ "สร้าง `app/` ใหม่" แล้ว `npm ci --ignore-scripts` ใน `app/` · เปิดด้วย preview ชื่อ `azgaar` (มีใน `.claude/launch.json`) |
| ภาพ export | `maps/azgaar/exports/*.png` (gitignored ยกเว้น `novaris-v3-atlas-noscale-x10.png`) | export ใหม่จาก Azgaar (ดูขั้นตอนท้ายไฟล์) |
| ภาพและ journal ใน Foundry | `D:\FoundryVTT_Data\Data\worlds\astral-nexus-constellation-protocol\World_Setting\Novaris\` — `novaris-v3-atlas.webp` + `novaris-v3-<ทวีป>.webp` 5 ไฟล์ + `journal/<ทวีป>.json` 5 ไฟล์ + `journal/seas.json` | สร้างใหม่ตามงานข้อ 1 |

## งานที่ต้องทำ

0. ✅ **ทำ lore ส่วนที่ยังขาด — เสร็จแล้วทั้งหมด** (commit `f17e783`) · ถ้าจะเพิ่ม lore อีกให้เสนอชื่อ/แนวคิดเป็นตารางให้ผู้ใช้อนุมัติก่อนเขียนทุกครั้ง
   - ✅ **Eldmere** (2026-10-23): ไฟล์ถิ่นครบ 7 ถิ่น — `stormwall.md` + 6 ถิ่นเป็นโฟลเดอร์ (`<ถิ่น>/_overview.md`) · ผนึก Tharizdun เขียนเป็นความลับของ DM ใน Mistholm · มังกรตั้งใหม่ทั้งหมด
   - ✅ **ทะเล 4 แห่ง**: โฟลเดอร์ใหม่ `seas/` (journal กลุ่มที่ 6 `seas` — หมุดขึ้นเฉพาะฉากโลก)
   - ✅ **เกาะที่ไม่มีชื่อ 139 เกาะ**: ตั้งชื่อ + ไฟล์ครบทุกเกาะ (131 ชื่อใหม่ · 8 เกาะมีชื่ออยู่แล้วแต่ป้ายลอยในทะเล) · หมู่เกาะใหม่ Saltfrost Isles · Isole del Vento · Utskjaer · Kaknab · รายชื่อทั้งหมดใน `contents/_name-table.md` หัวข้อ "เกาะ" · ป้ายบนแผนที่ byte-patch แล้ว
   - ✅ **ป้าย Chakan Wilds** ขึ้นแผนที่แล้ว · ป้าย Stormwall ขยับเข้ากรอบ Eldmere (y 955 → 963)
   - ✅ name table · overview · `places-v3.json` · export ภาพ · WebP · journal ทั้ง 6 กลุ่ม (เครื่องนี้)
   - ✅ **แม่น้ำ 82 สาย** (2026-10-24): ตั้งชื่อใหม่ตามธีมภูมิภาค + ไฟล์ lore ทุกสาย (เน้นใช้ทำฉาก: ตลอดสาย · จุดสำคัญ · ไอเดียฉาก) ใน `<ภูมิภาค>/rivers/` (Tsagaan Tal อยู่ `shenzhou/rivers/`) · ลำน้ำสาขาแยกไฟล์ · ป้ายแผนที่ "ชื่อ River" ทุกสาย (byte-patch ชื่อ + type) · Tuchtlan คงชื่อเดิม · รายชื่อใน `contents/_name-table.md` หัวข้อ "แม่น้ำ" · overview ภูมิภาคมีหัวข้อ "แม่น้ำ" · journal ใช้โฟลเดอร์ "แม่น้ำ" (หมุดครบ 82)
   - ✅ สรุปให้ผู้ใช้ฟังแล้ว — แชทถัดไปเริ่มที่ข้อ 1
1. **เช็คไฟล์ Foundry ในเครื่องนี้** — ดูว่าโฟลเดอร์ `World_Setting\Novaris\` ข้างบนมีครบไหม และ `journal/*.json` ใหม่กว่า commit ล่าสุดหรือเปล่า
   - ถ้าเป็นเครื่องเดิมที่เขียน README นี้ (มีครบแล้ว) ข้ามได้
   - ถ้าเพิ่ง pull มาเครื่องอื่น หรือไฟล์ขาด/เก่า: เตรียมแอป Azgaar → export ภาพโลก x10 และทวีปทั้ง 5 → แปลง WebP → รัน `build_foundry_journal.py` ครบ 5 ทวีป + seas (คำสั่งอยู่ท้ายไฟล์) — ถ้า path ของ Foundry ในเครื่องนี้ไม่ใช่ `D:\FoundryVTT_Data` ให้ถามผู้ใช้
2. **ให้ผู้ใช้รัน macro ใน Foundry** — `Create-Novaris-Journal` (และ `Create-Novaris-Scene` ถ้าเป็นโลก Foundry ใหม่) แล้วถามว่าหมุดขึ้นครบไหม · หมุดที่ไม่มีโดยตั้งใจ: overview ของทวีปและภูมิภาคย่อยบางอัน (เช่น `green-march`, `saltmarch`) · ของใหม่ที่ควรเห็นหมุด: เกาะ ทะเล ถิ่น Eldmere และแม่น้ำ 82 สาย (โฟลเดอร์ "แม่น้ำ" ใต้แต่ละภูมิภาค) · หมุดโล่ทองที่ป้ายประเทศ 10 ป้าย (2026-10-24 — เปิด journal ของประเทศนั้น ผูกไว้ใน `STATE_PINS` ของ `build_foundry_journal.py`)
3. **ถามผู้ใช้เรื่องที่ค้าง** (ทีละเรื่อง ทำเฉพาะที่ผู้ใช้สั่ง):
   - **ระยะทางไม่ตรงสเกล** ในไฟล์เดิมบางไฟล์ เช่น `shenzhou/amanokado/yugure-forest/kanmon.md` บอกว่าห่าง Kamizono "สองวันโดยม้า" แต่บนแผนที่ห่างเป็นพันไมล์ (1 หน่วย Azgaar = 43.2 ไมล์) — จะแก้ไฟล์ให้ตรงแผนที่ หรือปล่อยไว้
   - **PDF คู่มือผู้เล่น** ยังไม่ได้สร้างใหม่หลังแก้ lore พรรคมารใน `session-0/novaris-player-guide.md` (`python tools/build_player_guide_pdf.py`)
   - **ปมเรื่อง ✨** ที่ฝังในเมืองใหม่ รอผู้ใช้ตัดสิน (ไม่ต้องทำอะไรถ้าผู้ใช้ไม่สั่ง): Shenzhou — พรรคมารเตรียมบางอย่าง, ประมุข Namgung ถูกวางยา, วิญญาณไหลไป Gwisan · Suvarna — สัญญาสงบ Samudra–เผ่า Ha กำลังพัง, Jyotipura สั่งนับประชากรมายา, ของเรืองแสงจาก Lake Prabha, ปฏิทินรอบยาวของเผ่า Kaan + ดาวที่หายเมื่อ ~870 PD (โยงกับหอดาว Hoshimi ของ Shenzhou)
4. **เสร็จแล้วลบไฟล์นี้** แล้ว commit + push (ข้อความ commit ภาษาอังกฤษตามแบบ commit เดิมของ repo)

## กฎที่ต้องรู้ถ้าจะแก้ lore/แผนที่ต่อ

- **ห้ามเซฟ `.map` จากแอป Azgaar** (diff ใหญ่มาก) — แก้ด้วย Python byte-patch ทั้งสองไฟล์ · **ห้ามใช้ `sed` กับ `.map`** (ทำ line ending พัง)
- แม่แบบไฟล์เมือง: ดู `aldenreich/gramark/palebank-village.md` — หัวข้อ ข้อมูลด่วน (ตาราง; แถว "ประเภท" ใช้เลือกไอคอนหมุด) · ภาพรวม · ประวัติ (ปีปัจจุบัน 935 PD) · ผังและจุดสำคัญ ✨ · ผู้คน ✨ · การเมืองและความสัมพันธ์
- ห้ามใช้ชื่อวันในสัปดาห์หรือแบรนด์ของโลกจริง · **นามสกุลตัวละครห้ามซ้ำกับไฟล์อื่น** (grep ก่อน) · **อายุตัวละครต้องตรงกับปีเหตุการณ์** · องค์กร CR ที่มีทั่วโลก (เช่น The Clasp) ให้เป็นแค่ "สาขา" · ไม่ใช้ชื่อเทพจริงของมายาเป็นชื่อคน
- ลิงก์ระหว่างไฟล์ใช้ path สัมพัทธ์ · เขียนเสร็จให้เช็คลิงก์เสียทุกครั้ง

## คำสั่งอ้างอิง

**เปิดแผนที่ใน Azgaar** (หลัง `preview_start` ชื่อ `azgaar`):

```js
location.href='/Fantasy-Map-Generator/?maplink='+encodeURIComponent(location.origin+'/Fantasy-Map-Generator/__exandria/map?name=novaris-v3')
```

**export** (รอโหลด ~10 วิ แล้วรันใน console):

```js
options.app.labels.showAll = true; resetZoom(0); Layers.hide('scaleBar'); Layers.draw('labels');
const post = async (name, url) => (await fetch('/Fantasy-Map-Generator/__exandria/export?name=' + name, {method: 'POST', body: await (await fetch(url)).blob()})).text();
await post('novaris-v3-atlas-noscale-x10', await Services.ExportMap.getRegionImage({x0: 0, y0: 0, x1: 1800, y1: 1200, width: 1800, height: 1200}, 10));
// ทวีป: aldenreich (1045,44,1800,807) x18 · eldmere (1275,958,1799,1163) x27 · shenzhou (30,105,639,719) x18 · suvarna (20,697,769,1198) x18 · voxaria (650,240,1137,827) x27
await post('novaris-v3-suvarna', await Services.ExportMap.getRegionImage({x0: 20, y0: 697, x1: 769, y1: 1198, width: 749, height: 501}, 18));
```

**แปลง WebP ไป Foundry** (Python + Pillow, รันใน `maps/azgaar/`):

```python
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
D = r"D:\FoundryVTT_Data\Data\worlds\astral-nexus-constellation-protocol\World_Setting\Novaris"
Image.open("exports/novaris-v3-atlas-noscale-x10.png").convert("RGB").resize((16200, 10800), Image.LANCZOS).save(D + r"\novaris-v3-atlas.webp", "WEBP", quality=90, method=4)
for c in ["aldenreich", "eldmere", "shenzhou", "suvarna", "voxaria"]:
    Image.open(f"exports/novaris-v3-{c}.png").convert("RGB").save(D + rf"\novaris-v3-{c}.webp", "WEBP", quality=90, method=4)
```

**journal** (จาก root ของ repo — ต้องมี `pip install markdown`):

```bash
for c in aldenreich eldmere shenzhou suvarna voxaria seas; do python world-settings/novaris/tools/build_foundry_journal.py $c "D:/FoundryVTT_Data/Data/worlds/astral-nexus-constellation-protocol/World_Setting/Novaris/journal"; done
```

**places-v3.json** (ถ้าเปลี่ยนชื่อ/ตำแหน่งเมืองในแผนที่ ต้องสร้างใหม่ก่อนรัน journal):

```js
const r1 = v => Math.round(v * 100) / 100;
const labels = getLabelsData().filter(l => ['state', 'added', 'river'].includes(l.type)).map(l => ({type: l.type, name: l.text, x: r1(l.anchor[0]), y: r1(l.anchor[1])}));
const burgs = pack.burgs.filter(b => b && b.i && !b.removed).map(b => ({type: 'burg', name: b.name, x: r1(b.x), y: r1(b.y), group: b.group, capital: !!b.capital}));
await fetch('/Fantasy-Map-Generator/__exandria/map?name=places-v3', {method: 'POST', body: JSON.stringify({source: 'saves/novaris.map (v3)', exported: 'YYYY-MM-DD', places: [...burgs, ...labels]}, null, 1)});
// แล้ว: mv maps/azgaar/saves/places-v3.map maps/azgaar/places-v3.json
```
