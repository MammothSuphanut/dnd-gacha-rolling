"""Build Foundry journal data for the Thai campaigns that live in adventures/, Waterdeep-style.

    python codex/foundry-utility/build_campaign_journals.py

Uses the same rules as adventures/gilded-city-mad-depths/tools/build_foundry_journal.py (one journal per file:
00-02 campaign files, then per Act its outline, CH briefs and EPs; one page per "##" section) and writes
D:/FoundryVTT_Data/Data/assets/campaigns/<slug>/journal/<slug>.json for each campaign in CAMPAIGNS.
Read by Setup-Campaign-Journals.macro.js.
"""
import importlib.util
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # repo root
ASSETS = "D:/FoundryVTT_Data/Data/assets/campaigns"

CAMPAIGNS = {  # slug (assets/campaigns/<slug>) → adventures/<dir>
    "descent-of-phandelver": "the-descent-of-phandelver-novaris",
    "frozen-sick": "frozen-sick-the-plague-covenant",
}
CAMPAIGN_FILES = {
    "00-overview.md": "00 · ภาพรวมแคมเปญ",
    "01-hook-and-antagonist.md": "01 · Hook & Antagonist",
    "02-npcs.md": "02 · NPC สำคัญ",
}

spec = importlib.util.spec_from_file_location(
    "gcmd", os.path.join(ROOT, "adventures/gilded-city-mad-depths/tools/build_foundry_journal.py"))
gcmd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gcmd)
_read = gcmd.read


def read(rel):
    """Files whose sections start at "###" (no "##" at all) are shifted up one level, so they still get one page
    per section like the Waterdeep EPs."""
    text = _read(rel)
    if not re.search(r"^## ", text, flags=re.M):
        text = re.sub(r"^###(#*) ", r"##\1 ", text, flags=re.M)
    return text


gcmd.read = read


def build(slug, adventure):
    gcmd.HERE = os.path.join(ROOT, "adventures", adventure)
    gcmd.CAMPAIGN_FILES = {f: n for f, n in CAMPAIGN_FILES.items() if os.path.exists(os.path.join(gcmd.HERE, f))}
    files = gcmd.file_list()
    known = {gcmd.key_of(rel) for _, rel in files}
    journals = [{"key": gcmd.key_of(rel), "act": gcmd.act_name(act) if act else None, "name": gcmd.journal_name(rel),
                 "sort": i * 1000, "pages": gcmd.pages_of(rel, known)} for i, (act, rel) in enumerate(files, 1)]

    out_dir = os.path.join(ASSETS, slug, "journal")
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, f"{slug}.json")
    json.dump({"journals": journals}, open(out, "w", encoding="utf-8"), ensure_ascii=False)
    print(out, f"{os.path.getsize(out) / 1e6:.1f} MB")
    for j in journals:
        print(f"  [{j['act'] or 'Campaign'}] {j['name']}: {len(j['pages'])} pages")
    bad = sorted(set(re.findall(r"@CAMPAIGN\[([^\]]+)\]", json.dumps(journals, ensure_ascii=False))) - known)
    if bad:
        print("  UNRESOLVED links:", bad)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    for slug, adventure in CAMPAIGNS.items():
        build(slug, adventure)


if __name__ == "__main__":
    main()
