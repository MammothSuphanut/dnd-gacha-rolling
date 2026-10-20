"""แตกไฟล์หลักของ Aurelith ออกเป็นไฟล์ย่อย (ไฟล์หลักไม่ถูกแก้)

- contents/_canon-decisions.md  -> contents/canon/*.md (แยกตามหมวด)
- contents/_location-themes-draft.md + องค์กรระดับทวีป -> ท้าย <ทวีป>/_overview.md

ไฟล์หลักคือต้นฉบับเสมอ: แก้ที่ไฟล์หลักแล้วรัน script นี้ใหม่
    python world-settings/exandria-plus/tools/split_canon.py
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENTS = ROOT / "contents"
CANON = CONTENTS / "_canon-decisions.md"
THEMES = CONTENTS / "_location-themes-draft.md"
OUT = CONTENTS / "canon"

# ไฟล์ย่อย -> (ชื่อเรื่อง, prefix ของหัวข้อ "## " ที่รวมเข้าไฟล์นี้)
SPLITS = [
    ("00-core-decisions.md", "การตัดสินใจหลักและศัพท์", ["ตัดสินใจแล้ว", "ศัพท์หลัก"]),
    ("01-eras.md", "ยุคสมัย", ["ข้อ 9: ยุคสมัย"]),
    ("02-gods-and-higher-beings.md", "เทพและตัวตนชั้นสูง",
     ["The Last Pantheon", "เทพที่รอด", "การวางเทพและตัวตนชั้นสูง"]),
    ("03-elder-star.md", "ดวงดาวทั้งเก้า (Elder Star)", ["ดวงดาวทั้งเก้า"]),
    ("04-magic-and-covenant.md", "เวทมนตร์ กฎหมาย และพันธะ",
     ["เวทในชีวิตประจำวัน", "กฎหมายเกี่ยวกับเวท", "พันธะ (Covenant)"]),
    ("05-organizations.md", "องค์กร", ["องค์กร (ข้อ 16)"]),
    ("06-calendar-festivals.md", "ปฏิทินเทศกาล", ["ปฏิทินเทศกาล"]),
    ("99-pending.md", "รอคุย", ["รอคุย"]),
]

# โฟลเดอร์ทวีป -> (prefix หัวข้อใน themes, prefix หัวข้อ "### " ขององค์กรระดับทวีป)
CONTINENTS = {
    "wildemount": ("❄️ Valdmark", "❄️ Valdmark"),
    "tal-dorei": ("🌾 Haneora", "🌾 Haneora"),
    "issylra": ("⛰️ Seiran", "⛰️ Seiran"),
    "marquet": ("☀️ Meridane", "☀️ Meridane"),
}
SYNC_HEADING = "## ธีมและองค์กรของทวีป (sync จากไฟล์หลัก)"

NOTE = ("> สร้างอัตโนมัติจาก `{src}` — **อย่าแก้{what}โดยตรง** "
        "แก้ที่ไฟล์หลักแล้วรัน `tools/split_canon.py`\n")


def sections(text, level):
    """แบ่ง text ตามหัวข้อระดับ level -> list ของ (หัวข้อ, เนื้อหารวมหัวข้อ)"""
    mark = "#" * level + " "
    parts, cur_title, cur = [], None, []
    for line in text.splitlines(keepends=True):
        if line.startswith(mark):
            if cur_title is not None:
                parts.append((cur_title, "".join(cur)))
            cur_title, cur = line[len(mark):].strip(), [line]
        elif cur_title is not None:
            cur.append(line)
    if cur_title is not None:
        parts.append((cur_title, "".join(cur)))
    return parts


def pick(parts, prefix):
    found = [body for title, body in parts if title.startswith(prefix)]
    assert len(found) == 1, f"หาหัวข้อ '{prefix}' ไม่เจอหรือเจอซ้ำ ({len(found)})"
    return found[0]


def strip_rule(body):
    return re.sub(r"\n-{3,}\s*$", "\n", body.rstrip() + "\n")


def split_canon():
    parts = sections(CANON.read_text(encoding="utf-8"), 2)
    used = set()
    OUT.mkdir(exist_ok=True)
    for fname, title, prefixes in SPLITS:
        bodies = []
        for p in prefixes:
            bodies.append(strip_rule(pick(parts, p)))
            used.update(t for t, _ in parts if t.startswith(p))
        text = f"# Aurelith — {title}\n\n" + NOTE.format(src="contents/_canon-decisions.md", what="ไฟล์นี้", extra="") + "\n"
        text += "\n".join(bodies)
        (OUT / fname).write_text(text, encoding="utf-8")
    missing = [t for t, _ in parts if t not in used]
    assert not missing, f"หัวข้อในไฟล์หลักที่ยังไม่ถูกแตกไฟล์: {missing}"


def sync_continents():
    themes = sections(THEMES.read_text(encoding="utf-8"), 2)
    org = pick(sections(CANON.read_text(encoding="utf-8"), 2), "องค์กร (ข้อ 16)")
    org_parts = sections(org, 3)
    for folder, (theme_prefix, org_prefix) in CONTINENTS.items():
        theme = strip_rule(pick(themes, theme_prefix)).replace("## ", "### ", 1)
        orgs = strip_rule(pick(org_parts, org_prefix)).replace("### ", "### องค์กร — ", 1)
        block = (SYNC_HEADING + "\n\n"
                 + NOTE.format(src="contents/_location-themes-draft.md` และ `contents/_canon-decisions.md", what="หัวข้อนี้", extra=" (เนื้อหาที่เขียนเองให้วางไว้เหนือหัวข้อนี้)")
                 + "\n" + theme + "\n" + orgs)
        path = ROOT / folder / "_overview.md"
        current = path.read_text(encoding="utf-8")
        head = current.split(SYNC_HEADING)[0].rstrip() + "\n\n"
        path.write_text(head + block, encoding="utf-8")


if __name__ == "__main__":
    split_canon()
    sync_continents()
    print("ok")
