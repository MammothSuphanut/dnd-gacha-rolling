"""Pull the creatures each room starts with out of an EP .md, for Place-Gilded-City-Tokens.

Rooms are headings that start with a room code ("### 6c. Uktarl's Room", "#### Q5. Sleeping Area").
Creatures are bold English names (**bandit captain**, **Grell**) that match an actor name in the
Plutonium "Creatures" folder; counts come from a number next to the name (digits or Thai words).
A bold named NPC followed by "(... **creature** ...)" becomes one token of that creature, renamed.

Output JSON: {"rooms": [{"code": "6c", "title": "...", "creatures": [{"actor": "Bandit Captain", "name": "Uktarl Krannoc", "count": 1}]}]}

Usage: python extract_room_creatures.py <ep.md> <creatures.json> <out.json>
"""
import json
import re
import sys

THAI_NUMBERS = {
    "หนึ่ง": 1, "สอง": 2, "สาม": 3, "สี่": 4, "ห้า": 5, "หก": 6, "เจ็ด": 7, "แปด": 8, "เก้า": 9, "สิบ": 10,
    "a": 1, "an": 1, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8,
    "nine": 9, "ten": 10, "twelve": 12, "a dozen": 12,
}
ROOM_RE = re.compile(r"^(#{2,6})\s+([A-Z]{0,2}\d+[a-z]?)[.:\s]\s*(.*)$")
BOLD_RE = re.compile(r"\*\*([^*]+?)\*\*")
NUM = r"(\d+|" + "|".join(sorted(map(re.escape, THAI_NUMBERS), key=len, reverse=True)) + r")"
# Words right before a name that mean it is a picture, statue or corpse, not a live creature
NOT_ALIVE = re.compile(r"(รูปปั้น|รอยสัก|สัญลักษณ์|ตรา|เครื่องหมาย|tattoo|symbol|ภาพวาด|ภาพสลัก|จิตรกรรม|statue|painting|carving|petrified|ศพ|corpse|โครงกระดูก|skeleton of|หุ่น)[^*]{0,80}$", re.I)
# Words right before a name that make it a reference ("รังของ **Xanathar**" = Xanathar's lair, "รับใช้ Xanathar"),
# not a creature standing in the room
REFERENCE = re.compile(r"(รัง(?:ของ)?|ที่ซ่อนของ|ไปยัง|ไปหา|ไปที่|ทางไป|รับใช้|ภักดีต่อ|ส่งมาจาก|ลูกน้องของ|สมุนของ|lair of)\s*\**\s*$", re.I)
# Sections inside a room that describe things which are not there at the start
SKIP_SUBHEAD = re.compile(r"treasure|tactics|development|รางวัล|สมบัติ|ของมีค่า", re.I)


def to_int(s):
    return int(s) if s.isdigit() else THAI_NUMBERS.get(s.lower(), 1)


def singular(name):
    n = name.strip().lower()
    for a, b in (("ies", "y"), ("ves", "f"), ("es", ""), ("s", "")):
        if n.endswith(a) and len(n) > len(a) + 2:
            yield n[: -len(a)] + b
    yield n


def load_actors(path):
    actors = json.load(open(path, encoding="utf8"))
    rank = {"WDMM": 0, "WDMMC": 0, "WDH": 0, "XMM": 1, "MM": 2}
    best = {}
    for a in actors:
        key = a["name"].lower()
        if key not in best or rank.get(a["src"], 3) < rank.get(best[key]["src"], 3):
            best[key] = a
    return best


def find_actor(name, actors):
    """Exact name, singular form, then the 2024 "<name> Warrior" rename (goblin → Goblin Warrior)."""
    for cand in [name.lower(), *singular(name)]:
        for key in (cand, cand + " warrior"):
            if key in actors:
                return actors[key]
    return None


def count_near(line, start, end):
    """A number right after the name ("bandit 6", "bandit มนุษย์ 4 คน") or right before it ("4 bandits", "สองตัว")."""
    after = line[end:end + 24]
    m = re.match(r"\*{0,2}\s*(?:[x×]\s*)?([^\s\d,;()x×]{1,12}\s*)?" + NUM, after, re.I)
    # "ยาว 210 ฟุต" is a size, "พื้นที่ 23" a room — not counts
    if m and not UNIT_RE.match(after[m.end():]) and not PLACE_RE.search(m.group(1) or ""):
        return sane(to_int(m.group(2)))
    before = line[max(0, start - 16):start]
    m = re.search(NUM + r"\s*(?:ตัว|คน)?\s*\*{0,2}$", before, re.I)
    if m:
        return sane(to_int(m.group(1)))
    return 1


PLACE_RE = re.compile(r"พื้นที่|ห้อง|ชั้น|เลเวล|ระดับ|area|level|room|dc|ac", re.I)
UNIT_RE = re.compile(r"\s*(?:ฟุต|ft|feet|foot|gp|sp|cp|pp|hp|hit|d\d|xp|นาที|ชั่วโมง|วัน|รอบ|%|ไมล์|ปอนด์|lb|ระดับ|\+|/)", re.I)


def sane(n):
    """More than 50 of one creature in one room is almost always a misread number."""
    return n if 0 < n <= 50 else 1


def parse(md, actors):
    rooms, room, skip_level = [], None, None
    for raw in md.splitlines():
        line = raw.rstrip()
        h = re.match(r"^(#{2,6})\s+(.*)$", line)
        if h:
            level = len(h.group(1))
            m = ROOM_RE.match(line)
            if m:
                room = {"code": m.group(2), "title": m.group(3).strip(), "creatures": []}
                rooms.append(room)
                skip_level = None
            elif room and (skip_level is None or level <= skip_level):
                skip_level = level if SKIP_SUBHEAD.search(h.group(2)) else None
                if level <= 2:
                    room = None
            continue
        if not room or skip_level is not None or re.match(r"^\s*\**(tactics|development)", line, re.I):
            continue
        consumed, found, labels = [], [], []
        for m in BOLD_RE.finditer(line):
            if any(a <= m.start() < b for a, b in consumed):
                continue
            text = m.group(1).strip()
            # "**vrock 5 ตัว**", "**Duergar x4**", "**Duergar (enlarged) x5**": the count sits inside the bold
            inner_count = re.match(r"^(.+?)\s*(?:\([^)]*\))?\s*(?:[x×]\s*(\d+)|(\d+)\s*(?:ตัว|คน)?)$", text)
            if inner_count and not find_actor(text, actors):
                text = inner_count.group(1).strip()
            actor = find_actor(text, actors)
            before = line[:m.start()]
            in_quote = (before.count('"') + before.count("“") - before.count("”")) % 2 == 1  # someone saying the name
            if actor and (NOT_ALIVE.search(before) or REFERENCE.search(before) or in_quote):
                continue
            if actor:
                n = inner_count and (inner_count.group(2) or inner_count.group(3))
                entry = {"actor": actor["name"], "actorId": actor["id"], "name": None,
                         "count": sane(int(n)) if n else count_near(line, m.start(), m.end())}
                # "- **Bandit Captain**: ..." is a bullet label; only counts if nothing else on the line does
                (labels if line[m.end():m.end() + 1] == ":" else found).append(entry)
                continue
            # Named NPC: **Uktarl Krannoc** (NE มนุษย์ **bandit captain** ...)
            paren = re.match(r"\s*\(([^)]*)\)", line[m.end():])
            if paren and text[:1].isupper():
                inner = BOLD_RE.search(paren.group(1))
                inner_actor = inner and find_actor(inner.group(1), actors)
                if inner_actor:
                    found.append({"actor": inner_actor["name"], "actorId": inner_actor["id"],
                                  "name": text, "count": 1})
                    consumed.append((m.end(), m.end() + paren.end()))
        room["creatures"] += found or labels
    # A parent room ("23") that has sub-rooms with creatures ("23a", "23c") only sums them up
    for r in rooms:
        subs = [x for x in rooms if x is not r and re.fullmatch(re.escape(r["code"]) + r"[a-z]", x["code"])]
        if any(x["creatures"] for x in subs):
            r["creatures"] = []
    for r in rooms:  # merge repeats of the same creature in one room
        merged = {}
        for c in r["creatures"]:
            k = (c["actorId"], c["name"])
            if k in merged:
                merged[k]["count"] = max(merged[k]["count"], c["count"])
            else:
                merged[k] = dict(c)
        r["creatures"] = list(merged.values())
    return rooms


if __name__ == "__main__":
    md_path, actors_path, out_path = sys.argv[1:4]
    rooms = parse(open(md_path, encoding="utf8").read(), load_actors(actors_path))
    json.dump({"rooms": rooms}, open(out_path, "w", encoding="utf8"), ensure_ascii=False, indent=1)
    print(f"{sum(len(r['creatures']) for r in rooms)} creature entries in {len(rooms)} rooms -> {out_path}")
