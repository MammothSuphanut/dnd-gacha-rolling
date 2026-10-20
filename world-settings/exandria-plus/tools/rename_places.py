"""ร่างตารางเปลี่ยนชื่อสถานที่ Exandria (CR) → Aurelith — ยังไม่ใช้ (ปรับกลับเป็นชื่อเดิมแล้ว 2026-10-20)

    python tools/rename_places.py --log      เขียน contents/_rename-log.md จากตารางนี้
    python tools/rename_places.py --apply    แทนชื่อเก่าเป็นชื่อใหม่ในไฟล์ lore + ข้อมูลแผนที่ Azgaar

ชื่อที่เก็บไว้ (ไม่เปลี่ยน): Palebank Village, Eiselcross + ทุกที่บน Eiselcross, Dwendalian Empire
ไม่แตะ: ชื่อคน/เทพ/องค์กร/เดือน, contents/_cr-nations-reference.md (อ้างอิง canon CR ต้นฉบับ),
สคริปต์ใน maps/azgaar/scripts (อ้างถึงภาพต้นฉบับของ occidentalavian)
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# (เก่า, ใหม่, ประเภท, กลุ่ม) — กลุ่มใช้จัดหัวข้อใน log
WORLD = [
    ("Exandria+", "Aurelith", "โลก", "โลกและทวีป"),
    ("Exandria", "Aurelith", "โลก", "โลกและทวีป"),
    ("Wildemount", "Valdmark", "ทวีป", "โลกและทวีป"),
    ("Tal'Dorei", "Haneora", "ทวีป + ประเทศ", "โลกและทวีป"),
    ("Issylra", "Seiran", "ทวีป", "โลกและทวีป"),
    ("Marquet", "Meridane", "ทวีป", "โลกและทวีป"),
    ("Domunas", "Ulmerra", "ทวีปที่จมแล้ว", "โลกและทวีป"),
    ("Shattered Teeth", "Sunken Fangs", "หมู่เกาะ (ซาก Ulmerra)", "โลกและทวีป"),
    ("Lucidian Ocean", "Lumen Ocean", "มหาสมุทร", "โลกและทวีป"),
    ("Ozmit Sea", "Jade Sea", "ทะเล", "โลกและทวีป"),
    ("Beryl Sea", "Amber Sea", "ทะเล", "โลกและทวีป"),
    ("Frigid Depths", "Rimewater Deep", "ทะเล", "โลกและทวีป"),
    ("Emerald Gulch Sea", "Verdigris Sea", "ทะเล", "โลกและทวีป"),
]

VALDMARK = [  # Wildemount — ยุคกลางตะวันตก (เยอรมัน/อิตาลี)
    ("Rexxentrum", "Kaiserhald", "เมืองหลวง Dwendalian Empire", "Valdmark"),
    ("Zadash", "Halvenberg", "นคร", "Valdmark"),
    ("Hupperdook", "Pfeffenhof", "เมือง", "Valdmark"),
    ("Trostenwald", "Mirkenfeld", "เมือง", "Valdmark"),
    ("Alfield", "Ostrel", "หมู่บ้าน", "Valdmark"),
    ("Icehaven", "Frosthelm", "เมือง", "Valdmark"),
    ("Druvenlode", "Erzenlode", "เมือง", "Valdmark"),
    ("Nogvurot", "Korvund", "เมือง", "Valdmark"),
    ("Yrrosa", "Lindmere", "เมือง", "Valdmark"),
    ("Pride's Gall", "Wolfsgrund", "หมู่บ้าน", "Valdmark"),
    ("Kamordah", "Aschenfels", "หมู่บ้าน", "Valdmark"),
    ("Felderwin", "Kornwick", "หมู่บ้าน", "Valdmark"),
    ("Wuyun Gates", "Sturmtor", "เมืองด่าน", "Valdmark"),
    ("Talonstadt", "Varnstadt", "เมือง", "Valdmark"),
    ("Bladegarden", "Thornward", "ป้อม", "Valdmark"),
    ("Othe", "Ebbe", "หมู่บ้าน", "Valdmark"),
    ("Zemni Fields", "Ahrenfeld Plains", "ภูมิภาค", "Valdmark"),
    ("Marrow Valley", "Hollowrend Vale", "ภูมิภาค", "Valdmark"),
    ("Pearlbow Wilderness", "Silverbow Wilds", "ภูมิภาค", "Valdmark"),
    ("Greying Wildlands", "Greyfrost Wilds", "ภูมิภาค", "Valdmark"),
    ("Draconia", "Wyrmholt", "ซากนครลอยฟ้า", "Valdmark"),
    # Kryn Dynasty — เอลฟ์ทมิฬ
    ("Kryn Dynasty", "Velkyr Dynasty", "ประเทศ", "Valdmark"),
    ("Kryn", "Velkyr", "ประเทศ/ชนชาติ", "Valdmark"),
    ("Rosohna", "Nyxara", "เมืองหลวง Velkyr Dynasty", "Valdmark"),
    ("Xhorhas", "Nythrass", "ภูมิภาค", "Valdmark"),
    ("Blightshore", "Witherstrand", "ภูมิภาค", "Valdmark"),
    ("Dreemoth Ravine", "Hollowdeep Rift", "หุบเหว", "Valdmark"),
    ("Bazzoxan", "Vashkareth", "เมืองป้อม", "Valdmark"),
    ("Ghostwall", "Shadewall", "ป้อม", "Valdmark"),
    ("Asarius", "Ilvessar", "เมือง", "Valdmark"),
    ("Galgarad", "Morvhal", "เมือง", "Valdmark"),
    ("Dumaran", "Duskmere", "เมือง", "Valdmark"),
    # Clovis Concord — พ่อค้าแนวเวนิส
    ("Clovis Concord", "Serenza Concord", "ประเทศ", "Valdmark"),
    ("Clovis", "Serenza", "ประเทศ", "Valdmark"),
    ("Port Damali", "Porto Damarra", "เมืองหลวง Serenza Concord", "Valdmark"),
    ("Menagerie Coast", "Gilded Coast", "ภูมิภาค", "Valdmark"),
    ("Nicodranas", "Valmarenza", "นคร", "Valdmark"),
    ("Port Zoon", "Porto Sel", "เมืองท่า", "Valdmark"),
    ("Tussoa", "Tessara", "เมือง", "Valdmark"),
    ("Feolinn", "Fiorella", "เมือง", "Valdmark"),
    ("Palma Flora", "Palmavera", "หมู่บ้าน", "Valdmark"),
    ("Bisaft Port", "Porto Bisca", "เมืองท่า", "Valdmark"),
    ("Brokenbank", "Rottariva", "หมู่บ้าน", "Valdmark"),
    # Uthodurn — คนแคระ
    ("Diarchy of Uthodurn", "Diarchy of Brannhold", "ประเทศ", "Valdmark"),
    ("Uthodurn", "Brannhold", "นครคนแคระ", "Valdmark"),
]

HANEORA = [  # Tal'Dorei — ปัจจุบัน + เวท โทนมันฮวาเกาหลี
    ("Republic of Tal'Dorei", "Republic of Haneora", "ประเทศ", "Haneora"),
    ("Emon", "Seorin", "เมืองหลวง (มหานคร)", "Haneora"),
    ("Kymal", "Hwangdo", "นครกาสิโน", "Haneora"),
    ("Westruun", "Seohwan", "นคร", "Haneora"),
    ("Stilben", "Heukpo", "เมืองท่ามาเฟีย", "Haneora"),
    ("Drynna", "Dorim", "เมือง", "Haneora"),
    ("Port Daxio", "Daegang Port", "เมืองท่า", "Haneora"),
    ("Shalesteps", "Seokdan", "เมือง", "Haneora"),
    ("Turst Fields", "Teobang", "เมือง", "Haneora"),
    ("Jorenn Village", "Jiwon Village", "หมู่บ้าน", "Haneora"),
    ("Emerald Outpost", "Cheongok Outpost", "ด่าน", "Haneora"),
    ("New O'Noa", "Sinonam", "เมือง", "Haneora"),
    ("Lyrengorn", "Iryeon", "หมู่บ้าน", "Haneora"),
    ("Kraghammer", "Cheolbong", "นครรัฐคนแคระ", "Haneora"),
    ("Whitestone", "Baekseok", "นครรัฐ (บริษัทอาวุธ)", "Haneora"),
    ("Syngorn", "Sanglim", "นครรัฐเอลฟ์", "Haneora"),
    ("Tz'Arrm", "Gangcheol", "เมืองหลวง Iron Authority", "Haneora"),
    ("Hdar-Fye", "Hwasan", "เมือง", "Haneora"),
    ("Ezordam-Haar", "Jeoldo", "เมือง", "Haneora"),
    ("Rybad-Kol", "Ryeokgol", "เมือง", "Haneora"),
    ("Ortem-Vellak", "Ohtaek", "เมือง", "Haneora"),
    ("Zephrah", "Baramgol", "หมู่บ้าน Ashari ลม", "Haneora"),
    ("Vesrah", "Mulgol", "หมู่บ้าน Ashari น้ำ", "Haneora"),
    ("Terrah", "Heukgol", "หมู่บ้าน Ashari ดิน", "Haneora"),
    ("Dividing Plains", "Jungwon Plains", "ภูมิภาค", "Haneora"),
    ("Cliffkeep Mountains", "Bukak Range", "เทือกเขา", "Haneora"),
    ("Bladeshimmer Shoreline", "Eunbit Coast", "ชายฝั่ง", "Haneora"),
    ("Lucidian Coast", "Haedong Coast", "ชายฝั่ง", "Haneora"),
    ("Verdant Expanse", "Pureun Expanse", "ภูมิภาค (เขต Gate)", "Haneora"),
    ("Rifenmist Peninsula", "Angae Peninsula", "คาบสมุทร (เขต Gate)", "Haneora"),
    ("Rifenmist", "Angae", "คาบสมุทร (เขต Gate)", "Haneora"),
    ("Stormcrest Mountains", "Pokpung Range", "เทือกเขา", "Haneora"),
    ("Parchwood Timberlands", "Mareun Woods", "ป่า", "Haneora"),
    ("Qoniira", "Ohnara", "ซากอารยธรรม", "Haneora"),
]

SEIRAN = [  # Issylra — ตะวันออกยุคกลาง (จีนใต้ / ญี่ปุ่นตะวันตก)
    ("Othanzia", "Horai", "ประเทศ (เทวาธิปไตย)", "Seiran"),
    ("Vasselheim", "Shenjing", "นครแห่งเทพ", "Seiran"),
    ("Celestial Empire (TBD)", "Tianlong Empire", "ประเทศ (จีน)", "Seiran"),
    ("Imperial Capital (TBD)", "Longjing", "เมืองหลวง Tianlong Empire", "Seiran"),
    ("Utesspire Domains (TBD)", "Tsukihara Domains", "ประเทศ (แคว้นญี่ปุ่น)", "Seiran"),
    ("Shogun Seat (TBD)", "Hinokura", "ที่ตั้งโชกุน", "Seiran"),
    ("Muldire", "Beishan", "เมือง", "Seiran"),
    ("Josgren's Hollow", "Jiaogu", "เมือง", "Seiran"),
    ("Shorecomb", "Haibin", "เมือง", "Seiran"),
    ("Himblewood", "Qingmu", "เมือง", "Seiran"),
    ("Seedfeld", "Tanehara", "เมือง", "Seiran"),
    ("Ivaadel", "Lingxia", "เมือง", "Seiran"),
    ("Pyrah", "Kazan", "หมู่บ้าน Ashari ไฟ", "Seiran"),
    ("Hishari", "Hisame", "ซากเมือง", "Seiran"),
    ("Caramarin Reach", "Shiokaze Reach", "ภูมิภาค", "Seiran"),
    ("Utesspire Mountains", "Amagiri Mountains", "เทือกเขา", "Seiran"),
    ("Utesspire", "Amagiri", "เทือกเขา", "Seiran"),
    ("Demithore Valley", "Mizuho Valley", "หุบเขา", "Seiran"),
    ("Demithore", "Mizuho", "หุบเขา/วัฒนธรรม", "Seiran"),
    ("Vesper Timberlands", "Yinlin Forest", "ป่า", "Seiran"),
    ("Vesper Timberland", "Yinlin Forest", "ป่า", "Seiran"),
    ("Thorain Tundra", "Hanbei Tundra", "ทุนดรา", "Seiran"),
    ("Thorain", "Hanbei", "ทุนดรา/ชนเผ่า", "Seiran"),
    ("Zenwick Mountains", "Qingfeng Mountains", "เทือกเขา", "Seiran"),
    ("Zenwick", "Qingfeng", "เทือกเขา", "Seiran"),
    ("Sunderpeak Mountains", "Lieshan Mountains", "เทือกเขา", "Seiran"),
    ("Sunderpeak", "Lieshan", "เทือกเขา", "Seiran"),
    ("Gatshadow", "Kagezan", "ภูเขาต้องสาป", "Seiran"),
]

MERIDANE = [  # Marquet — โบราณหลายวัฒนธรรม
    ("Ank'Harel", "Valerium", "จักรวรรดิ + เมืองหลวง (โรมัน)", "Meridane"),
    ("Chandei Quorum", "Suwanchai Quorum", "ประเทศ (ไทย)", "Meridane"),
    ("Jrusar", "Siriphara", "เมืองหลวง Suwanchai Quorum", "Meridane"),
    ("Yios", "Vidyapura", "เมืองหลวง Court of the Lambent Path (อินเดีย)", "Meridane"),
    ("Sruwargas", "Lakedra", "เมืองหลวง Stratos Throne (สปาร์ตา)", "Meridane"),
    ("Bassur Republic", "Kasvar Republic", "ประเทศ", "Meridane"),
    ("Bassur", "Kasvar", "ประเทศ", "Meridane"),
    ("Gujjar-Serai", "Kasvarabad", "เมืองหลวง Kasvar Republic", "Meridane"),
    ("Shammel", "Skjoldvik", "เมือง (ไวกิ้ง)", "Meridane"),
    ("Shandal", "Sekhal", "เมือง", "Meridane"),
    ("Eish-Allay", "Chanthala", "เมือง", "Meridane"),
    ("Sapiro Haven", "Saphan Haven", "เมืองท่า", "Meridane"),
    ("Goradire", "Khaodon", "เมือง", "Meridane"),
    ("Otaladume", "Tondalum", "หมู่บ้าน", "Meridane"),
    ("Evishi", "Ekashi", "เมือง", "Meridane"),
    ("King's Fall", "Shahpatan", "เมือง", "Meridane"),
    ("Bassuras", "Azaran", "เมือง", "Meridane"),
    ("Loonpur", "Somapur", "เมือง", "Meridane"),
    ("Nadigarh", "Ranigarh", "เมือง", "Meridane"),
    ("Barinak", "Varunak", "เมือง", "Meridane"),
    ("Artati", "Aratika", "เมือง", "Meridane"),
    ("Qorco", "Tirupada", "เมือง", "Meridane"),
    ("Gelvar", "Pelaros", "เมือง", "Meridane"),
    ("Rumedam Desert", "Desheret Desert", "ทะเลทราย", "Meridane"),
    ("Rumedam", "Desheret", "ทะเลทราย", "Meridane"),
    ("Oderan Wilds", "Tavu Wilds", "ภูมิภาค", "Meridane"),
    ("Hellcatch Valley", "Brennach Valley", "หุบเขา (บาร์บาเรียน)", "Meridane"),
    ("Hellcatch", "Brennach", "หุบเขา/เผ่า", "Meridane"),
    ("Taloned Highlands", "Kraterai Highlands", "ที่ราบสูง", "Meridane"),
    ("Aeshanadoor", "Ashvaranya", "ป่าดึกดำบรรพ์", "Meridane"),
]

# ชื่อวัฒนธรรม/ศาสนาที่ผูกกับชื่อที่ (เฉพาะไฟล์ข้อมูล Azgaar)
DERIVED = [
    ("Shammeli", "Skjoldi", "วัฒนธรรม", "วัฒนธรรมและศาสนา"),
    ("Harelian", "Valerian", "วัฒนธรรม", "วัฒนธรรมและศาสนา"),
    ("Jrusari", "Siripharan", "วัฒนธรรม", "วัฒนธรรมและศาสนา"),
    ("Yiosi", "Vidyan", "วัฒนธรรม", "วัฒนธรรมและศาสนา"),
    ("Othanzian", "Horaian", "วัฒนธรรม", "วัฒนธรรมและศาสนา"),
    ("Celestial", "Tianlong", "วัฒนธรรม", "วัฒนธรรมและศาสนา"),
    ("Greying Wildlanders", "Greyfrost Wildlanders", "วัฒนธรรม", "วัฒนธรรมและศาสนา"),
    ("Xhorhas Badlands", "Nythrass Badlands", "biome", "วัฒนธรรมและศาสนา"),
    ("Rosohna Blight", "Nyxara Blight", "biome", "วัฒนธรรมและศาสนา"),
]

KEPT = [
    ("Palebank Village", "หมู่บ้านทางเหนือของ Valdmark ย้ายมาติดชายฝั่งให้ล่องเรือไป Syrinlya ได้"),
    ("Eiselcross", "หมู่เกาะน้ำแข็งเหนือ Valdmark รวมทุกชื่อบนเกาะ: Foren, Syrinlya, Balenpost, Vurmas, "
                   "Allowak's Sanctuary, Tomb of the Worm, Aeor / Aeor Crash Site, Salsvault, Fortress of the Dead Jarl, "
                   "Garden of Stone, Mutalos, Biessel, Gelier, Schneescel, Frostbogen, Taergoss, Kaltsel, Dampfkan"),
    ("Dwendalian Empire", "ชื่อประเทศเดิม (Dwendal) แต่เมืองในประเทศเปลี่ยนชื่อหมด"),
]

# วลีที่มีชื่อที่แต่เป็นชื่อคน — ห้ามแทน
PROTECT = ["Sovereign Uriel Tal'Dorei", "Oren Aldwyn Syngorn", "Leylas Kryn", "Exandria (CR)",
           "ดัดแปลงจาก Exandria", "occidentalavian", "Speculative 2024", "Exandria - Speculative",
           "Exandria.jpeg", "scenes/Exandria"]

PLACES = WORLD + VALDMARK + HANEORA + SEIRAN + MERIDANE
ALL = PLACES + DERIVED  # DERIVED ใช้กับไฟล์ข้อมูล Azgaar เท่านั้น ("Celestial" ใน lore เป็นคำทั่วไป)

LORE_GLOBS = ["contents/*.md", "*/_overview.md", "session-0/*.md", "maps/map-brief-935pd.md",
              "maps/README.md", "maps/azgaar/README.md", "tools/build_*.py", "tools/split_canon.py"]
SKIP = {"contents/_cr-nations-reference.md", "contents/_rename-log.md"}
# ไฟล์ที่ไม่แทนคำ "Exandria" เดี่ยว ๆ (เป็นการอ้างอิงภาพต้นฉบับ/ชื่อ heightmap ในโค้ด)
WORLD_PLUS_ONLY = {"maps/azgaar/README.md", "maps/README.md"}
AZGAAR_JSON = ["states", "burgs", "labels", "cultures", "religions"]


def pattern(pairs):
    olds = sorted({o for o, *_ in pairs}, key=len, reverse=True)
    # ไม่แตะชื่อที่เป็นส่วนของ path/ชื่อไฟล์ (เช่น maps/wildemount/Wildemount.jpg)
    return re.compile(r"(?<![A-Za-z'/])(" + "|".join(re.escape(o) for o in olds)
                      + r")(?![A-Za-z]|\.(?:jpe?g|png|webp|md))")


def rename_text(text, pairs):
    table = {o: n for o, n, *_ in pairs}
    keep = {}
    for i, p in enumerate(PROTECT):
        token = f"\x00{i}\x00"
        if p in text:
            text = text.replace(p, token)
            keep[token] = p
    text = pattern(pairs).sub(lambda m: table[m.group(1)], text)
    for token, p in keep.items():
        text = text.replace(token, p)
    return text


def apply():
    changed = []
    for g in LORE_GLOBS:
        for f in glob.glob(os.path.join(ROOT, g)):
            rel = os.path.relpath(f, ROOT).replace(os.sep, "/")
            if rel in SKIP:
                continue
            pairs = [p for p in PLACES if p[0] != "Exandria"] if rel in WORLD_PLUS_ONLY else PLACES
            with open(f, encoding="utf-8", newline="") as fh:
                old = fh.read()
            new = rename_text(old, pairs)
            if new != old:
                with open(f, "w", encoding="utf-8", newline="") as fh:
                    fh.write(new)
                changed.append(rel)
    # manifest: เปลี่ยนเฉพาะชื่อที่แสดง ไม่แตะ id/path
    mf = os.path.join(ROOT, "manifest.json")
    with open(mf, encoding="utf-8") as fh:
        man = json.load(fh)
    old_man = json.dumps(man, ensure_ascii=False)
    man["name"] = rename_text(man["name"], PLACES)
    for c in man["categories"]:
        c["title"] = rename_text(c["title"], PLACES)
    if json.dumps(man, ensure_ascii=False) != old_man:
        with open(mf, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(json.dumps(man, ensure_ascii=False, indent=2) + "\n")
        changed.append("manifest.json")
    hm = os.path.join(ROOT, "maps/azgaar/heightmaps")
    for name in AZGAAR_JSON:
        f = os.path.join(hm, f"exandria-{name}.json")
        with open(f, encoding="utf-8") as fh:
            data = json.load(fh)

        def walk(o):
            if isinstance(o, dict):
                return {k: walk(v) for k, v in o.items()}
            if isinstance(o, list):
                return [walk(v) for v in o]
            return rename_text(o, ALL) if isinstance(o, str) else o

        new = walk(data)
        if new != data:
            with open(f, "w", encoding="utf-8") as fh:
                json.dump(new, fh, ensure_ascii=False, indent=2)
            changed.append(f"maps/azgaar/heightmaps/exandria-{name}.json")
    print("\n".join(changed))


def log():
    groups = {}
    for old, new, kind, grp in ALL:  # noqa: B007
        if old == "Exandria+":
            continue
        groups.setdefault(grp, []).append((old, new, kind))
    out = ["# ตารางเปลี่ยนชื่อสถานที่ (Exandria → Aurelith)", "",
           "> สร้างจาก `tools/rename_places.py` — แก้ชื่อที่ตารางในสคริปต์แล้วรัน `--log` ใหม่ อย่าแก้ไฟล์นี้ตรง ๆ",
           "> ช่อง **Lore** ไว้ติ๊กเมื่อเขียน lore ของที่นั้นเสร็จ",
           "> **สถานะ: ร่าง ยังไม่ใช้** — เคย `--apply` แล้วปรับกลับเป็นชื่อเดิม (2026-10-20) ไฟล์ lore และแผนที่ตอนนี้ใช้ชื่อ CR เดิม", "",
           "## ชื่อที่เก็บไว้", "", "| ชื่อ | หมายเหตุ |", "|---|---|"]
    out += [f"| {n} | {note} |" for n, note in KEPT]
    out += ["", "## ต้องตัดสินใจ", "",
            "- ชื่อคนที่มีชื่อสถานที่เดิมอยู่ในนาม **ยังไม่เปลี่ยน**: Elder Oren Aldwyn **Syngorn** (เมืองเดิม → Sanglim), "
            "Sovereign Uriel **Tal'Dorei** (ทวีปเดิม → Haneora) — จะเปลี่ยนชื่อคนตาม หรือให้ชื่อคนกับชื่อเมืองไม่เหมือนกันก็ได้",
            "- `contents/_cr-nations-reference.md` เป็นไฟล์อ้างอิง canon CR จึงยังใช้ชื่อเดิม ใช้ตารางนี้เทียบ", ""]
    for grp, rows in groups.items():
        out += [f"## {grp}", "", "| ชื่อเดิม (CR) | ชื่อใหม่ | ประเภท | Lore |", "|---|---|---|---|"]
        out += [f"| {o} | **{n}** | {k} | ☐ |" for o, n, k in rows]
        out.append("")
    path = os.path.join(ROOT, "contents/_rename-log.md")
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(out))
    print(path, sum(len(r) for r in groups.values()), "rows")


if __name__ == "__main__":
    if "--log" in sys.argv:
        log()
    if "--apply" in sys.argv:
        apply()
