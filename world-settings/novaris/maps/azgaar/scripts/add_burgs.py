"""Byte-patch new burgs (and region labels) into an Azgaar .map without saving from the app.

    python scripts/add_burgs.py <in.map> <out.map> <burgs.json> [labels.json]

burgs.json: list of burg objects as Azgaar builds them (cell, x, y, i, group, label{dx,dy}, ...) —
the "i" values must continue pack.burgs and each cell must not hold a burg yet.
labels.json: optional list of {"text", "x", "y", "fontSize"} added labels (group "added").

Touches only: line 15 (pack.burgs), line 17 (pack.cells.burg), line 47 (added labels data)
and line 5 (SVG: burg icon, burg label, added label). Line endings stay \\r\\n.
"""
import json
import re
import sys

BURGS, CELL_BURG, ADDED, SVG = 15, 17, 47, 5


def fmt(n):
    return f"{n:g}"


def insert_in_group(svg, open_re, item):
    """Insert item before the first </g> after the group opening tag matched by open_re."""
    m = re.search(open_re, svg)
    if not m:
        raise SystemExit(f"group not found: {open_re!r}")
    end = svg.index(b"</g>", m.end())
    return svg[:end] + item + svg[end:]


def main():
    src, dst, burgs_file = sys.argv[1:4]
    labels = json.load(open(sys.argv[4], encoding="utf-8")) if len(sys.argv) > 4 else []
    burgs = json.load(open(burgs_file, encoding="utf-8"))
    lines = open(src, "rb").read().split(b"\r\n")

    existing = json.loads(lines[BURGS])
    cells = lines[CELL_BURG].split(b",")
    svg = lines[SVG]
    for b in burgs:
        assert b["i"] == len(existing), f"{b['name']}: i={b['i']} but next id is {len(existing)}"
        assert cells[b["cell"]] == b"0", f"{b['name']}: cell {b['cell']} already has burg {cells[b['cell']]}"
        existing.append(b)
        cells[b["cell"]] = str(b["i"]).encode()
        x, y, g, i = fmt(b["x"]), fmt(b["y"]), b["group"], b["i"]
        icon = f'<use id="burg{i}" data-id="{i}" href="#burgs-atlas-circle" x="{x}" y="{y}" width="1.2em" height="1.2em"/>'
        svg = insert_in_group(svg, rf'<g id="{g}" data-group="{g}"><g data-group="icons"[^>]*>'.encode(), icon.encode())
        dx, dy = fmt(b["label"]["dx"]), fmt(b["label"]["dy"])
        text = (f'<text id="burgLabel{i}" data-label-type="burg" data-id="{i}" transform="translate({dx}, {dy})" '
                f'data-label-shape="point" x="{x}" y="{y}" font-size="100%">{b["name"]}</text>')
        svg = insert_in_group(svg, rf'<g id="labels-{g}"[^>]*>'.encode(), text.encode("utf-8"))

    added = json.loads(lines[ADDED])
    for lab in labels:
        i = max(a["i"] for a in added) + 1
        label = {"text": lab["text"], "group": "added", "fontSize": lab["fontSize"]}
        added.append({"x": lab["x"], "y": lab["y"], "label": label, "i": i})
        text = (f'<text id="addedLabel{i}" data-label-type="added" data-id="{i}" data-label-shape="point" '
                f'x="{fmt(lab["x"])}" y="{fmt(lab["y"])}" font-size="{lab["fontSize"]}%">{lab["text"]}</text>')
        svg = insert_in_group(svg, rb'<g id="labels-added"[^>]*>', text.encode("utf-8"))

    lines[BURGS] = json.dumps(existing, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    lines[CELL_BURG] = b",".join(cells)
    lines[ADDED] = json.dumps(added, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    lines[SVG] = svg
    open(dst, "wb").write(b"\r\n".join(lines))
    print(f"{dst}: +{len(burgs)} burgs, +{len(labels)} labels")


if __name__ == "__main__":
    main()
