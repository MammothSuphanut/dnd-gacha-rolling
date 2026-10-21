"""Build world-settings/exandria/_index.md: every place in the Exandria (Critical Role) archive by continent and region,
with its Critical Role Wiki link(s) and whether it is filed under a region yet.

usage: python world-settings/exandria/tools/build_index.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTINENTS = ["wildemount", "tal-dorei", "issylra", "marquet", "shattered-teeth"]
LINK = re.compile(r"\[Critical Role Wiki: ([^\]]+)\]\(([^)]+)\)")


def title(text, fallback):
    m = re.search(r"^# (.+)$", text, re.M)
    return m.group(1).strip() if m else fallback


def main():
    manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
    by_path = {c["contentPath"]: c for c in manifest["cards"]}
    rows, totals = [], {}
    for cont in CONTINENTS:
        for f in sorted((ROOT / cont).rglob("*.md")):
            if f.name.startswith("_"):
                continue
            rel = f.relative_to(ROOT).as_posix()
            parts = rel.split("/")
            region = "/".join(parts[1:-1]) if cont != "shattered-teeth" else "shattered-teeth"
            text = f.read_text(encoding="utf-8")
            card = by_path.get(f"/world-settings/exandria/{rel}")
            links = LINK.findall(text) or [(s["label"].removeprefix("Critical Role Wiki: "), s["url"])
                                          for s in (card or {}).get("sources", [])]
            wiki = " · ".join(f"[{l}]({u})" for l, u in links) or "—"
            lore = "ลิงก์อย่างเดียว" if "ยังไม่ได้สรุป lore" in text else "มี"
            rows.append((cont, region, title(text, f.stem), rel, wiki, lore, card is not None))
            t = totals.setdefault(cont, [0, 0, 0])
            t[0] += 1
            t[1] += bool(region)
            t[2] += lore == "มี"

    out = ["# ดัชนีสถานที่ Exandria (CR)", "",
           "> สร้างจาก `tools/build_index.py` — อย่าแก้ไฟล์นี้ตรง ๆ · ภูมิภาคตาม Critical Role Wiki (ดู `_wiki-sync-notes.md`) · **จัดแล้ว** = ไฟล์อยู่ในโฟลเดอร์ภูมิภาค",
           "", "| ทวีป | สถานที่ | จัดเข้าภูมิภาคแล้ว | มี lore | ลิงก์อย่างเดียว |", "|---|---|---|---|---|"]
    out += [f"| {c} | {n} | {r} | {l} | {n - l} |" for c, (n, r, l) in totals.items()]
    for cont in CONTINENTS:
        group = [r for r in rows if r[0] == cont]
        if not group:
            continue
        out += ["", f"## {cont}", "", "| ภูมิภาค | สถานที่ | Lore | การ์ดบนแผนที่ | CR Wiki |", "|---|---|---|---|---|"]
        for _, region, name, rel, wiki, lore, card in sorted(group, key=lambda r: (r[1] == "", r[1], r[2])):
            out.append(f"| {region or '_(ยังไม่จัด)_'} | [{name}]({rel}) | {lore} | {'✓' if card else '—'} | {wiki} |")
    (ROOT / "_index.md").write_text("\n".join(out) + "\n", encoding="utf-8")
    print(len(rows), "places")


if __name__ == "__main__":
    main()
