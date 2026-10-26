"""Build Foundry journal data for the Aeorian Cataclysm (Novaris) campaign from the campaign .md files.

    python adventures/aeorian-cataclysm-novaris/tools/build_foundry_journal.py <out_dir>

Writes <out_dir>/aeorian-novaris.json, read by codex/foundry-utility/Create-Aeorian-Journal.macro.js.
One journal per campaign file group (00 · campaign, Act 1, Act 2, ...), one page per section.
Pages marked "player" are visible to players (Observer); everything else is GM only.

Links inside the .md files become tokens the macro turns into Foundry links:
  - a Novaris place file  -> @NOVARIS[<path under world-settings/novaris>]{text}  (the place's Novaris journal)
  - a campaign file       -> @CAMPAIGN[<journal key>(/<page key>)]{text}          (that campaign journal / page)
  - anything else         -> plain text
"""
import json
import os
import re
import sys

import markdown

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # adventures/aeorian-cataclysm-novaris
REPO = os.path.dirname(os.path.dirname(HERE))
NOVARIS = os.path.join(REPO, "world-settings", "novaris")

# Campaign file -> what its links open: "<journal key>" or "<journal key>/<page key>"
CAMPAIGN_LINKS = {
    "00-campaign-brief.md": "00",
    "01-the-fragments.md": "00/fragments-rules",
    "ACT02-void-aldenreich/00-act-brief.md": "act02",
}


def read(rel):
    return open(os.path.join(HERE, rel), encoding="utf-8").read()


def sections(text, level):
    """Split text on headings of exactly `level` (#, ##, ###): [(heading or None, body)]."""
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


def find(secs, prefix):
    hits = [body for head, body in secs if head and head.startswith(prefix)]
    if len(hits) != 1:
        raise SystemExit(f"section '{prefix}': found {len(hits)}")
    return hits[0]


def links(md, src_rel):
    """Rewrite [text](path) relative to the campaign file src_rel."""
    src_dir = os.path.dirname(os.path.join(HERE, src_rel))

    def repl(m):
        text, target = m.group(1), m.group(2).split("#")[0]
        if not target or target.startswith("http"):
            return text
        path = os.path.normpath(os.path.join(src_dir, target))
        rel_campaign = os.path.relpath(path, HERE).replace("\\", "/")
        if rel_campaign in CAMPAIGN_LINKS:
            return f"@CAMPAIGN[{CAMPAIGN_LINKS[rel_campaign]}]{{{text}}}"
        rel_novaris = os.path.relpath(path, NOVARIS).replace("\\", "/")
        if not rel_novaris.startswith("..") and rel_novaris.endswith(".md"):
            return f"@NOVARIS[{rel_novaris}]{{{text}}}"
        return text

    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", repl, md)


LIST = re.compile(r"^( *)([-*]|\d+\.) ")


def lists(md):
    """The campaign files are GitHub-style markdown; python-markdown needs a blank line before a list
    and 4-space nesting, so add the blank line and double the indent of nested items."""
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


def html(md, src_rel):
    md = re.sub(r"^---\s*$", "", md, flags=re.M)  # page breaks replace the dividers
    md = re.sub(r"^\[← .*$", "", md, flags=re.M)  # back-navigation footer
    return markdown.markdown(lists(links(md, src_rel)).strip(), extensions=["tables"])


def page(key, name, md, src_rel, player=False):
    return {"key": key, "name": name, "html": html(md, src_rel), "player": player}


def campaign_journal():
    brief = read("00-campaign-brief.md")
    frag = read("01-the-fragments.md")
    b2 = sections(brief, 2)
    f2 = sections(frag, 2)
    preamble = b2[0][1].split("\n", 1)[1]  # drop the H1
    toc = find(b2, "สารบัญ Act")
    toc_main = sections(toc, 3)[0][1]  # the Act table, without the "### Act 1" detail (it goes to the Act 1 journal)
    return {
        "key": "00", "name": "00 · Aeorian Cataclysm", "sort": 100000,
        "pages": [
            page("brief", "Brief สำหรับผู้เล่น", find(b2, "Brief สำหรับผู้เล่น"), "00-campaign-brief.md", player=True),
            page("truth", "ความจริงเบื้องหลัง", find(b2, "DM Only — ความจริงเบื้องหลัง"), "00-campaign-brief.md"),
            page("toc", "สารบัญ Act", preamble + "\n\n" + toc_main, "00-campaign-brief.md"),
            page("fragments-rules", "The Fragments — กฎ",
                 "### Core Rules\n" + find(f2, "Core Rules") + "\n" + find(f2, "Fragment ทั้ง 5 ชิ้น"), "01-the-fragments.md", player=True),
            page("fragments-dm", "The Fragments — DM",
                 "### ตารางผลทอย\n" + find(f2, "DM Only") + "\n### Foundry\n" + find(f2, "Foundry") + "\n### ยังเปิดอยู่\n" + find(f2, "ยังเปิดอยู่"),
                 "01-the-fragments.md"),
            page("open", "ยังเปิดอยู่", find(b2, "ยังเปิดอยู่"), "00-campaign-brief.md"),
        ],
    }


def act1_journal():
    toc = find(sections(read("00-campaign-brief.md"), 2), "สารบัญ Act")
    return {
        "key": "act01", "name": "Act 1 · Wisdom — Eiselcross", "sort": 200000,
        "pages": [page("overview", "ภาพรวม Act 1", find(sections(toc, 3), "Act 1"), "00-campaign-brief.md")],
    }


def act_journal(key, name, sort, rel):
    """An Act brief: title table + first ## as the overview page, each ### under "โครงเรื่อง" and every other ## as a page."""
    s2 = sections(read(rel), 2)
    intro = s2[0][1].split("\n", 1)[1]
    head1, body1 = s2[1]
    pages = [page("overview", "ภาพรวมและผู้ถือ", intro + f"\n\n### {head1}\n" + body1, rel)]
    for i, (head, body) in enumerate(s2[2:], start=1):
        if head.startswith("โครงเรื่อง"):
            for j, (h3, b3) in enumerate(sections(body, 3)[1:], start=1):
                pages.append(page(f"story-{j}", h3, b3, rel))
        else:
            pages.append(page(f"section-{i}", head, body, rel))
    return {"key": key, "name": name, "sort": sort, "pages": pages}


def main():
    sys.stdout.reconfigure(encoding="utf-8")  # Thai page names on a Windows console
    out_dir = sys.argv[1]
    journals = [
        campaign_journal(),
        act1_journal(),
        act_journal("act02", "Act 2 · Void — Aldenreich", 300000, "ACT02-void-aldenreich/00-act-brief.md"),
    ]
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, "aeorian-novaris.json")
    json.dump({"journals": journals}, open(out, "w", encoding="utf-8"), ensure_ascii=False)
    print(out)
    for j in journals:
        print(f"  {j['name']}: " + " · ".join(("👁 " if p["player"] else "") + p["name"] for p in j["pages"]))
    tokens = sorted(set(re.findall(r"@(?:NOVARIS|CAMPAIGN)\[[^\]]+\]", json.dumps(journals, ensure_ascii=False))))
    print("  links:", ", ".join(tokens))


if __name__ == "__main__":
    main()
