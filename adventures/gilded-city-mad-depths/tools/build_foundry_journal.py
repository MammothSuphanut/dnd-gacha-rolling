"""Build Foundry data for Gilded City, Mad Depths (Waterdeep: Dragon Heist + Dungeon of the Mad Mage, Thai).

    python adventures/gilded-city-mad-depths/tools/build_foundry_journal.py "D:/FoundryVTT_Data/Data/assets/campaigns/gilded-city-mad-depths/journal"

Writes <out_dir>/gilded-city.json, read by codex/foundry-utility/Setup-Gilded-City.macro.js:
  - journals: the campaign files (00-03), and per Act its outline, CH briefs and EPs — one journal per file,
    one page per "##" section (a very long section is split on "###"). Everything is GM only.
  - scenes: which Plutonium-imported scene (by its original name) goes to which Act/EP folder, whether it is
    the player copy or the DM copy (room numbers on the map), and the new name.

Links between campaign files become @CAMPAIGN[<journal key>]{text}; links to anything else become plain text.
"""
import json
import os
import re
import sys

import markdown

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # adventures/gilded-city-mad-depths

CAMPAIGN_FILES = {
    "00-overview.md": "00 · ภาพรวมแคมเปญ",
    "01-hook-and-antagonist.md": "01 · Hook & Antagonist",
    "02-npcs.md": "02 · NPC สำคัญ",
    "03-halasters-game-framework.md": "03 · Halaster's Game",
}
SPLIT_AT = 60000  # characters of markdown; longer "##" sections are split on "###"


def read(rel):
    return open(os.path.join(HERE, rel), encoding="utf-8").read()


def key_of(rel):
    return rel.replace("\\", "/")[:-3]


def sections(text, level):
    """Split text on headings of exactly `level`: [(heading or None, body)]."""
    mark = "#" * level + " "
    out, head, buf = [], None, []
    for line in text.splitlines():
        if line.startswith(mark):
            out.append((head, "\n".join(buf)))
            head, buf = line[len(mark):].strip(), []
        else:
            buf.append(line)
    out.append((head, "\n".join(buf)))
    return out


def links(md, src_rel, known):
    src_dir = os.path.dirname(os.path.join(HERE, src_rel))

    def repl(m):
        text, target = m.group(1), m.group(2).strip("<>").split("#")[0]
        if not target or target.startswith("http"):
            return m.group(0) if target.startswith("http") else text
        rel = os.path.relpath(os.path.normpath(os.path.join(src_dir, target)), HERE).replace("\\", "/")
        return f"@CAMPAIGN[{key_of(rel)}]{{{text}}}" if rel.endswith(".md") and key_of(rel) in known else text

    # [text](<path with spaces>) or [text](path); images (![...]) are left alone
    return re.sub(r"(?<!!)\[([^\]]+)\]\((<[^>]+>|[^)\s]+)\)", repl, md)


LIST = re.compile(r"^( *)([-*]|\d+\.) ")


def lists(md):
    """GitHub-style lists → python-markdown: blank line before a list, nested indent doubled to 4 spaces."""
    out, prev = [], ""
    for line in md.splitlines():
        m = LIST.match(line)
        if m:
            if prev.strip() and not LIST.match(prev) and not prev.startswith(" "):
                out.append("")
            line = " " * (len(m.group(1)) * 2) + line[len(m.group(1)):]
        out.append(line)
        prev = line
    return "\n".join(out)


def html(md, src_rel, known):
    md = re.sub(r"^---\s*$", "", md, flags=re.M)
    md = re.sub(r"^\[← .*$", "", md, flags=re.M)
    return markdown.markdown(lists(links(md, src_rel, known)).strip(), extensions=["tables"])


def pages_of(rel, known):
    """One page per "##"; the text before the first "##" (minus the H1) is the first page."""
    s2 = sections(read(rel), 2)
    intro = re.sub(r"^# .*\n?", "", s2[0][1], count=1).strip()
    raw = ([("ภาพรวม", intro)] if intro else []) + [(h, b) for h, b in s2[1:]]
    out = []
    for head, body in raw:
        if len(body) <= SPLIT_AT or "\n### " not in body:
            out.append((head, body))
            continue
        chunks, cur = [], ""
        for h3, b3 in sections(body, 3):
            part = (f"### {h3}\n" if h3 else "") + b3 + "\n"
            if cur and len(cur) + len(part) > SPLIT_AT:
                chunks.append(cur)
                cur = ""
            cur += part
        chunks.append(cur)
        out += [(f"{head} ({i}/{len(chunks)})", c) for i, c in enumerate(chunks, 1)]
    return [{"key": f"p{i:02d}", "name": h, "html": html(b, rel, known)} for i, (h, b) in enumerate(out, 1)]


def h1(rel):
    m = re.search(r"^# (.+)$", read(rel), flags=re.M)
    return m.group(1).strip() if m else os.path.basename(rel)[:-3]


def journal_name(rel):
    base = os.path.basename(rel)[:-3]
    if rel in CAMPAIGN_FILES:
        return CAMPAIGN_FILES[rel]
    if base == "00-act-outline":
        return "00 · ภาพรวม Act"
    if m := re.match(r"CH(\d+)-", base):
        title = re.split(r"\s+[—-]\s+", h1(rel), maxsplit=1)[-1]
        return f"CH{m.group(1)} · {title}"
    if m := re.match(r"EP(\d+) - (.+)", base):
        return f"EP{m.group(1)} · {m.group(2)}"
    return f"{base[:2]} · {h1(rel)}"


def file_list():
    """[(act key or None, rel)] in play order."""
    out = [(None, f) for f in CAMPAIGN_FILES]
    for act in sorted(d for d in os.listdir(HERE) if d.startswith("ACT")):
        files = sorted(os.listdir(os.path.join(HERE, act)))
        order = [f for f in files if f.startswith("00-")] + [f for f in files if f.startswith("CH")] \
            + [f for f in files if f.startswith("EP")]
        out += [(act, f"{act}/{f}") for f in order if f.endswith(".md")]
    return out


def act_name(act):
    """ACT01-dragon-heist → 'ACT01 · Dragon Heist' (title from the outline's H1 'Act 1 — Dragon Heist')."""
    title = re.split(r"\s+[—-]\s+", h1(f"{act}/00-act-outline.md"), maxsplit=1)[-1]
    return f"{act[:5]} · {title}"


# ---------------------------------------------------------------- scenes
# Plutonium scene name → (Act dir, folder, new name). Each location comes as a player copy and a DM copy
# (room numbers drawn on the map); the DM copy goes to that folder's "DM Reference" sub-folder.
ACT1 = "ACT01-dragon-heist"
CITY = "00 · City Maps"
CHAIN = "EP04-07 · Encounter Locations"  # the four villain encounter chains share these maps


def ep_folder(act, ep):
    hit = [f for f in os.listdir(os.path.join(HERE, act)) if f.startswith(f"EP{ep:02d} - ")]
    return journal_name(f"{act}/{hit[0]}")


WDH = {  # base name: (folder, player scene name or None, DM scene name or None)
    "Dock Ward": (CITY, "Dock Ward", None),
    "Field Ward": (CITY, "Field Ward Map", None),
    "Trades Ward": (CITY, "Trades Ward Map", None),
    "City of the Dead": (CITY, "City of the Dead Map", None),
    "Poster Map": (CITY, "Poster Map (Player Version)", "Poster Map"),
    "Zhent Warehouse": (1, "Zhent Warehouse, Lower (Player Version)", "Zhent Warehouse"),
    "Xanathar Guild Hideout": (1, "Xanathar Guild Hideout (Player Version)", "Xanathar Guild Hideout"),
    "Trollskull Alley": (2, "Trollskull Alley (Player Version)", "Trollskull Alley"),
    "Trollskull Alley, Taproom": (2, "Trollskull Alley, Taproom", None),
    "Trollskull Alley, Basement": (2, "Trollskull Alley, Basement", None),
    "Trollskull Manor": (2, "Trollskull Manor (Player Version)", "Trollskull Manor"),
    "Gralhund Villa": (3, "Gralhund Villa, Ground Floor (Player Version)", "Gralhund Villa"),
    "Alley": (CHAIN, "Alley (Player Version)", "Alley"),
    "Cellar Complex": (CHAIN, "Cellar Complex (Player Version)", "Cellar Complex"),
    "Courthouse": (CHAIN, "Courthouse, Main Level (Player Version)", "Courthouse"),
    "Mausoleum": (CHAIN, "Mausoleum, Ground (Player Version)", "Mausoleum"),
    "Mistshore": (CHAIN, "Mistshore (Player Version)", "Mistshore"),
    "Theater": (CHAIN, "Theater (Player Version)", "Theater"),
    "Tower": (CHAIN, "Tower, First Floor (Player Version)", "Tower"),
    "Windmill": (CHAIN, "Windmill, Ground Floor (Player Version)", "Windmill"),
    "Vault of Dragons": (8, "Vault of Dragons, Main Level (Player Version)", "Vault of Dragons"),
    "Xanathar Lair": (9, "Xanathar Lair, Level 1 (Player Version)", "Xanathar Lair"),
    "Cassalanter Villa": (10, "Cassalanter Villa, Main Area (Player Version)", "Cassalanter Villa"),
    "Temple of Asmodeus": (10, "Temple of Asmodeus, Lower Level (Player Version)", "Temple of Asmodeus"),
    "Scarlet Marpenoth": (11, "Scarlet Marpenoth, Upper Deck (Player Version)", "Scarlet Marpenoth"),
    "Ships": (11, "Ships, Main Deck (Player Version)", "Ships"),
    "Kolat Towers": (12, "Kolat Towers, Level 1 (Player Version)", "Kolat Towers"),
    "Sanctum": (12, "Sanctum (Player Version)", "Sanctum"),
}

WDMM_LEVEL = {  # Map N → (Act dir, EP number); Map 24-26 are Skullport
    1: ("ACT02-into-the-yawning-depths", 1), 2: ("ACT02-into-the-yawning-depths", 2),
    3: ("ACT03-the-sunless-sea", 1),
    4: ("ACT04-twisted-wilds", 1), 5: ("ACT04-twisted-wilds", 2), 6: ("ACT04-twisted-wilds", 3),
    7: ("ACT05-castle-and-swamp", 1), 8: ("ACT05-castle-and-swamp", 2), 9: ("ACT05-castle-and-swamp", 3),
    10: ("ACT06-muirals-gauntlet", 1), 11: ("ACT06-muirals-gauntlet", 2), 12: ("ACT06-muirals-gauntlet", 3),
    13: ("ACT07-graveyard-and-ruin", 1), 14: ("ACT07-graveyard-and-ruin", 2), 15: ("ACT07-graveyard-and-ruin", 3),
    16: ("ACT08-crystal-and-sea", 1), 17: ("ACT08-crystal-and-sea", 3), 18: ("ACT08-crystal-and-sea", 4),
    19: ("ACT09-the-deepest-halls", 1), 20: ("ACT09-the-deepest-halls", 2), 21: ("ACT09-the-deepest-halls", 3),
    22: ("ACT10-halasters-reckoning", 1), 23: ("ACT10-halasters-reckoning", 2),
    24: ("ACT03-the-sunless-sea", 2), 25: ("ACT03-the-sunless-sea", 2), 26: ("ACT03-the-sunless-sea", 2),
}

WDMMC = {  # Companion battle maps (no DM copy) → (Act dir, EP number, new name)
    "Lesser Temple of the Heretics—One Square = 10 ft.": ("ACT05-castle-and-swamp", 3, "Lesser Temple of the Heretics"),
    "The Violet Beacon—Top Platform Square = 5 ft.": ("ACT10-halasters-reckoning", 3, "The Violet Beacon"),
    "Snakes and Portals Diagram—One Square = 5 ft.": ("ACT10-halasters-reckoning", 4, "Snakes and Portals"),
    "Pillars of the Temple Rains—One Square = 5 ft.": ("ACT10-halasters-reckoning", 4, "Pillars of the Temple Rains"),
    "The Wreck of the Wight's Shadow—One Square = 5 ft.": ("ACT10-halasters-reckoning", 4, "The Wreck of the Wight's Shadow"),
}


def scenes():
    out = []

    def add(source, original, act, folder, name, dm, ep_key):
        out.append({"source": source, "original": original, "act": act_name(act), "folder": folder,
                    "name": name, "dm": dm, "journal": ep_key})

    for i, (base, (where, player, dm)) in enumerate(WDH.items()):
        if isinstance(where, int):
            folder = ep_folder(ACT1, where)
            hit = [f for f in os.listdir(os.path.join(HERE, ACT1)) if f.startswith(f"EP{where:02d} - ")][0]
            ep_key = key_of(f"{ACT1}/{hit}")
        else:
            folder, ep_key = where, None
        if player:
            add("WDH", player, ACT1, folder, base, False, ep_key)
        if dm:
            add("WDH", dm, ACT1, folder, f"{base} (DM)", True, ep_key)

    for n, (act, ep) in WDMM_LEVEL.items():
        hit = [f for f in os.listdir(os.path.join(HERE, act)) if f.startswith(f"EP{ep:02d} - ")][0]
        ep_key = key_of(f"{act}/{hit}")
        if n <= 23:
            title = re.sub(r"^EP\d+ · |\s*\(Level \d+\)|,? Part \d+ - .*", "", journal_name(f"{act}/{hit}"))
            base = f"Level {n:02d} · {title}"
        else:
            base = f"Skullport · Map {n}"
        add("WDMM", f"Map {n} (Player Version)", act, ep_folder(act, ep), base, False, ep_key)
        add("WDMM", f"Map {n}", act, ep_folder(act, ep), f"{base} (DM)", True, ep_key)

    for original, (act, ep, name) in WDMMC.items():
        hit = [f for f in os.listdir(os.path.join(HERE, act)) if f.startswith(f"EP{ep:02d} - ")][0]
        add("WDMMC", original, act, ep_folder(act, ep), name, False, key_of(f"{act}/{hit}"))
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    out_dir = sys.argv[1]
    files = file_list()
    known = {key_of(rel) for _, rel in files}
    journals = []
    for i, (act, rel) in enumerate(files, 1):
        journals.append({"key": key_of(rel), "act": act_name(act) if act else None, "name": journal_name(rel),
                         "sort": i * 1000, "pages": pages_of(rel, known)})
    data = {"journals": journals, "scenes": scenes()}
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, "gilded-city.json")
    json.dump(data, open(out, "w", encoding="utf-8"), ensure_ascii=False)
    print(out, f"{os.path.getsize(out) / 1e6:.1f} MB")
    for j in journals:
        print(f"  [{j['act'] or 'Campaign'}] {j['name']}: {len(j['pages'])} pages")
    print(f"  scenes: {len(data['scenes'])} ({sum(not s['dm'] for s in data['scenes'])} player, "
          f"{sum(s['dm'] for s in data['scenes'])} DM)")
    bad = sorted(set(re.findall(r"@CAMPAIGN\[([^\]]+)\]", json.dumps(journals, ensure_ascii=False))) - known)
    if bad:
        print("  UNRESOLVED links:", bad)


if __name__ == "__main__":
    main()
