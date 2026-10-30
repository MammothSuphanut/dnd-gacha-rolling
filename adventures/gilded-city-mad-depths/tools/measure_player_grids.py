"""(repo copy of the scratch tool used 2026-10-27; work dir = pairs.json + imgs/ as in register_player_pins.py)
Refine grid size (scene px) from an approximate value using the 3rd autocorrelation harmonic, find the phase,
write grid-final.json and one overlay sheet per batch of maps for eyeballing.
Usage: python finalgrid.py <work dir>"""
import json, os, sys
import cv2, numpy as np

S = sys.argv[1]
pairs = {p["player"]["name"]: p["player"] for p in json.load(open(os.path.join(S, "pairs.json"), encoding="utf8"))}
img_path = lambda u: os.path.join(S, "imgs", u.split("/adventure/")[1].replace("/", "_"))

# approximate Foundry cell (5 ft) in scene px, and which ink the drawn grid uses
APPROX = {
    "Tower": (50, "dark"), "Cassalanter Villa": (36.3, "gray"), "Courthouse": (59, "dark"), "Windmill": (61, "dark"),
    "Scarlet Marpenoth": (75.6, "dark"), "Zhent Warehouse": (59.3, "gray"), "Theater": (121, "dark"),
    "Xanathar Guild Hideout": (65, "dark"), "Temple of Asmodeus": (44.3, "dark"), "Sanctum": (59.3, "dark"),
    "Kolat Towers": (37, "dark"), "Mistshore": (77, "gray"), "Xanathar Lair": (52.6, "dark"), "Ships": (51.6, "gray"),
    "Gralhund Villa": (54.2, "gray"), "Vault of Dragons": (52.2, "dark"), "Alley": (58.6, "dark"),
    "Mausoleum": (59.7, "dark"), "Cellar Complex": (61.5, "dark"),
}  # Kolat Towers (diagonal drawn grid) and Trollskull Alley (street map) are left as they are
# WDMM / Skullport: drawn square = 10 ft = 2 cells → measure the drawn square, cell = half
for n, p in pairs.items():
    if n.startswith(("Level ", "Skullport")):
        APPROX[n] = (2 * (114 if n.startswith("Level 09") else p["grid"]), "dark", 2)


def strokes(m, horizontal, length):
    k = cv2.getStructuringElement(cv2.MORPH_RECT, (length, 1) if horizontal else (1, length))
    return cv2.morphologyEx(m, cv2.MORPH_OPEN, k)


def refine(profile, per):
    p = profile - profile.mean()
    ac = np.correlate(p, p, "full")[len(p) - 1:]
    ac = ac / ac[0]
    best = None
    for k in (3, 2, 1):
        c = int(round(per * k))
        if c + 3 >= len(ac):
            continue
        w = max(2, int(per * 0.08))
        l = max(range(c - w, c + w + 1), key=lambda i: ac[i])
        a, b, cc = ac[l - 1], ac[l], ac[l + 1]
        off = 0.5 * (a - cc) / (a - 2 * b + cc) if (a - 2 * b + cc) else 0
        best = (l + off) / k
        break
    return best


def phase(profile, per):
    n = len(profile)
    best, arg = -1, 0
    for o10 in range(int(per * 10)):
        idx = np.round(np.arange(o10 / 10, n, per)).astype(int)
        idx = idx[idx < n]
        s = (profile[np.clip(idx - 1, 0, n - 1)] + profile[idx] + profile[np.clip(idx + 1, 0, n - 1)]).mean()
        if s > best:
            best, arg = s, o10 / 10
    return arg


out, tiles = {}, []
for name, (g0, ink, *cells) in APPROX.items():
    pl = pairs[name]
    cells = cells[0] if cells else 1
    im = cv2.imread(img_path(pl["src"]), cv2.IMREAD_GRAYSCALE)
    if im is None:
        from PIL import Image
        im = np.array(Image.open(img_path(pl["src"])).convert("L"))
    sx, sy = pl["w"] / im.shape[1], pl["h"] / im.shape[0]
    m = ((im < 160) if ink == "dark" else ((im >= 150) & (im < 235))).astype(np.uint8)
    L = max(7, im.shape[1] // 250)
    cols, rows = strokes(m, False, L).mean(0), strokes(m, True, L).mean(1)
    px = refine(cols, g0 / sx) or g0 / sx
    py = refine(rows, g0 / sy) or g0 / sy
    gx, gy = px * sx, py * sy
    drawn = (gx + gy) / 2
    if cells == 2 and abs(gx - gy) / drawn > 0.005:  # noisy reading on a WDMM level: keep its (right) size
        drawn = g0
    ox, oy = phase(cols, drawn / sx) * sx, phase(rows, drawn / sy) * sy
    cell = drawn / cells
    out[pl["key"]] = {"name": name, "old": pl["grid"], "grid": round(cell), "exact": round(cell, 2),
                      "ox": round(ox % cell, 1), "oy": round(oy % cell, 1), "gx": round(gx, 2), "gy": round(gy, 2)}
    # overlay: red = proposed Foundry cells
    vis = cv2.cvtColor(im, cv2.COLOR_GRAY2BGR)
    x = (ox % cell) / sx
    while x < im.shape[1]:
        cv2.line(vis, (int(round(x)), 0), (int(round(x)), im.shape[0]), (0, 0, 255), 1); x += cell / sx
    y = (oy % cell) / sy
    while y < im.shape[0]:
        cv2.line(vis, (0, int(round(y))), (im.shape[1], int(round(y))), (0, 0, 255), 1); y += cell / sy
    half = int(cell / sx * 5)
    # crop where there is most ink, so the grid has something to line up against
    ink_map = cv2.blur(m.astype(np.float32), (2 * half + 1, 2 * half + 1))
    cy, cx = np.unravel_index(np.argmax(ink_map[half:-half, half:-half]), ink_map[half:-half, half:-half].shape)
    cy, cx = cy + half, cx + half
    crop = cv2.resize(vis[cy - half:cy + half, cx - half:cx + half], (330, 330), interpolation=cv2.INTER_AREA)
    cv2.putText(crop, f"{name[:26]} {cell:.1f}", (4, 16), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255, 0, 0), 1)
    tiles.append(crop)
    print(f"{name[:32]:32} old {pl['grid']:>4}  cell {cell:7.2f}  (drawn x {gx:.2f} y {gy:.2f})  phase {ox % cell:5.1f},{oy % cell:5.1f}")

json.dump(out, open(os.path.join(S, "grid-final.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
for i in range(0, len(tiles), 12):
    batch = tiles[i:i + 12] + [np.full_like(tiles[0], 255)] * (12 - len(tiles[i:i + 12]))
    sheet = np.vstack([np.hstack(batch[r * 4:(r + 1) * 4]) for r in range(3)])
    cv2.imwrite(os.path.join(S, "ov", f"final_{i // 12}.png"), sheet)
