"""Wild Sheep Chase (Plutonium WSC) -> Thai Foundry journal.

  python build.py extract   # wsc-en.html -> segments-en.json (numbered text segments)
  python build.py build     # wsc-en.html + segments-th.json -> wsc-th.html + Setup-Wild-Sheep-Chase macro
                            # (one journal page per "##" section, sub-headings added for the map pins)
"""
import json, re, sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parents[2]
MACRO = ROOT / "codex/foundry-utility/Setup-Wild-Sheep-Chase.macro.js"

# Plutonium's "(MM p341)" removed-text hover markers, dropped from the Thai copy
HOMEBREW = re.compile(r'\s*<span class="ve-rd-homebrew__disp-inline".*?>\[\.\.\.\]</span>', re.S)
# text-bearing elements, translated as whole inner HTML (inline tags/enrichers kept by the translator)
SEGMENT = re.compile(
    r'(<(p|li)\b[^>]*>(?:<span class="ve-rd__h ve-rd__h--3"[^>]*>.*?</span></span>)?)(.*?)(</\2>)'
    r'|(<span class="entry-title-inner ">)(.*?)(</span>)'
    r'|(<div class="ve-rd__image-title-inner">)(.*?)(</div>)', re.S)


# Sub-headings added in front of a paragraph (matched by the start of its English text) so map pins
# can open the exact spot; the source runs the whole house as one section. English, like every heading.
SUBHEADS = [
    ("The path to Noke's Tower", "Approach"),
    ("When the party arrives at the compound", "The Compound"),
    ("The door to the central platform", "Central Platform"),
    ("The tallest platform functions", "Noke's Bedroom"),
    ("The huts contain", "Huts"),
    ("No@UUID", "Confronting Noke"),
]
SECTION = re.compile(r'<div data-roll-name-ancestor="([^"]+)" class="ve-rd__b  ve-rd__b--named ve-rd__b--1">')


def slug(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def div_end(html, start):
    """Index just past the </div> closing the <div> that opens at start."""
    depth = 0
    for m in re.finditer(r"<div[\s>]|</div>", html[start:]):
        depth += -1 if m.group() == "</div>" else 1
        if depth == 0:
            return start + m.end()
    raise ValueError("unclosed div")


def split_pages(html):
    """[(key, name, html)] — one page per "##" section; the title block joins the first, the credits the last."""
    sections = []
    for m in SECTION.finditer(html):
        if sections and m.start() < sections[-1][2]:
            continue  # nested
        sections.append((m.group(1), m.start(), div_end(html, m.start())))
    pages = [[slug(n), n, html[a:b]] for n, a, b in sections]
    head = html[len(re.match(r"<div[^>]*>", html).group()):sections[0][1]]
    tail = html[sections[-1][2]:html.rindex("</div>")]
    pages[0][2] = head + pages[0][2]
    pages[-1][2] += tail
    return [tuple(p) for p in pages]


def load():
    return HOMEBREW.sub("", (HERE / "wsc-en.html").read_text(encoding="utf-8"))


def segments(html):
    out = []
    for m in SEGMENT.finditer(html):
        if m.group(1) is not None:
            out.append((m.start(3), m.end(3), m.group(3), m.start(1)))
    # headings and image titles stay in English; only body text is translated
    return [s for s in out if s[2].strip()]


def extract():
    segs = segments(load())
    (HERE / "segments-en.json").write_text(
        json.dumps({str(i): s[2] for i, s in enumerate(segs)}, ensure_ascii=False, indent=1), encoding="utf-8")
    print(len(segs), "segments")


def build():
    html = load()
    segs = segments(html)
    th = json.loads((HERE / "segments-th.json").read_text(encoding="utf-8"))
    missing = [str(i) for i in range(len(segs)) if str(i) not in th]
    if missing:
        sys.exit(f"missing translations: {missing}")
    heads = {}
    for en, title in SUBHEADS:
        hit = [s for s in segs if s[2].startswith(en)]
        if len(hit) != 1:
            sys.exit(f"sub-heading anchor {en!r} matched {len(hit)} paragraphs")
        heads[hit[0][3]] = (f'<h3 class="ve-rd__h ve-rd__h--2"> <span class="entry-title-inner ">{title}</span></h3>')
    for i, (a, b, _, tag) in reversed(list(enumerate(segs))):
        html = html[:a] + th[str(i)] + html[b:]
        if tag in heads:
            html = html[:tag] + heads[tag] + html[tag:]
    (HERE / "wsc-th.html").write_text(html, encoding="utf-8")
    pages = [{"key": k, "name": n, "content": c} for k, n, c in split_pages(html)]
    tpl = (HERE / "macro-template.js").read_text(encoding="utf-8")
    MACRO.write_text(tpl.replace("/*PAGES*/null", json.dumps(pages, ensure_ascii=False, indent=1)), encoding="utf-8")
    print(len(pages), "pages:", ", ".join(p["name"] for p in pages))
    print("wrote", MACRO)


{"extract": extract, "build": build}[sys.argv[1]]()
