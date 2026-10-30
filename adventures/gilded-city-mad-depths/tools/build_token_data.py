"""Build the room-creature list for every Waterdeep player map, for Place-Gilded-City-Tokens.

Reads the scene list from gilded-city.json (made by build_foundry_journal.py) and runs
extract_room_creatures on each map's EP file. DM copies are skipped: tokens go on the player maps.

Usage: python build_token_data.py <creatures.json> <journal dir>
  creatures.json  actors in Foundry's "Creatures" folder: [{id, name, src}, ...]
  journal dir     the folder holding gilded-city.json; writes gilded-city-tokens.json next to it

Hand fixes the text parser can't get right live in token-overrides.json (next to this script):
  {"<scene name>": {"<room code>": {"add": [{"actor": "Xanathar", "count": 1, "name": null}], "remove": ["Mimic"]}}}
"""
import json
import os
import sys

from extract_room_creatures import find_actor, load_actors, parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OVERRIDES = os.path.join(os.path.dirname(os.path.abspath(__file__)), "token-overrides.json")


def apply_overrides(rooms, fixes, actors, scene_name):
    by_code = {r["code"]: r for r in rooms}
    for code, fix in fixes.items():
        room = by_code.get(code) or by_code.setdefault(code, {"code": code, "title": "", "creatures": []})
        if room not in rooms:
            rooms.append(room)
        drop = {a.lower() for a in fix.get("remove", [])}
        room["creatures"] = [c for c in room["creatures"] if c["actor"].lower() not in drop]
        for add in fix.get("add", []):
            actor = find_actor(add["actor"], actors)
            if not actor:
                print(f"  ! {scene_name} {code}: no actor named {add['actor']}")
                continue
            room["creatures"].append({"actor": actor["name"], "actorId": actor["id"],
                                      "name": add.get("name"), "count": add.get("count", 1)})
    return [r for r in rooms if r["creatures"]]


if __name__ == "__main__":
    creatures_path, out_dir = sys.argv[1:3]
    actors = load_actors(creatures_path)
    data = json.load(open(os.path.join(out_dir, "gilded-city.json"), encoding="utf8"))
    overrides = json.load(open(OVERRIDES, encoding="utf8")) if os.path.exists(OVERRIDES) else {}
    out = {}
    for s in data["scenes"]:
        if s["dm"] or not s["journal"]:
            continue
        md = os.path.join(ROOT, s["journal"] + ".md")
        rooms = [r for r in parse(open(md, encoding="utf8").read(), actors) if r["creatures"]]
        rooms = apply_overrides(rooms, overrides.get(s["name"], {}), actors, s["name"])
        out[f"{s['source']}|{s['original']}"] = {"name": s["name"], "rooms": rooms}
        print(f"{s['name']}: {sum(c['count'] for r in rooms for c in r['creatures'])} tokens in {len(rooms)} rooms")
    path = os.path.join(out_dir, "gilded-city-tokens.json")
    json.dump(out, open(path, "w", encoding="utf8"), ensure_ascii=False, indent=1)
    print("->", path)
