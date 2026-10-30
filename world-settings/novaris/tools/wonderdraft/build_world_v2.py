"""Novaris world map v2 for Wonderdraft: build_world.py plus roads, borders, Exandria relief, missing islands.

What v2 adds over v1 (build_world.py, kept as is):
  relief      mountains, hills and forests placed where Exandria.jpeg paints them (colour classes of the
              poster, moved into the Novaris layout like the coastline) instead of the Azgaar heightmap;
              ground colours follow the same classes (snow, desert, forest, ranges), Novaris biomes for the rest
  roads       built like Exandria's: a spanning tree over each landmass's towns plus city-to-city shortcuts,
              routed around lakes, shore and ranges, merged into one net; Azgaar's sea routes kept (refitted)
  borders     Azgaar state borders from the same save, dash-dot-dot in the state-name red
  islands     every named island whose label has no traced land under it gets its Azgaar land shape
  lakes       traced from Exandria.jpeg's freshwater colour (v1 used holes in the traced coastline)
  rivers      all Azgaar rivers, sized by length and tributaries, dead ends carried on to water, soft edges, in Exandria's river blue (opaque, so the parchment
              sea no longer shows through); the run reports any that barely touch the traced land
  look        sea in Exandria's light blue (water_tint), brown snow-tipped mountains and dense green woods
              (conifer / broadleaf / jungle by region, placed by drawn shape off labels, water, roads and peaks)
              in the Wildemount poster's painted style
  eiselcross  peaks, lava river and site dots from the Wildemount poster trace (build_eiselcross.py)
  labels      sized for reading zoomed in; spaced sea/region names, river names tilted along their river
  places      Salsvault moved to the hand-picked spot of the Eiselcross map; label overlaps are counted
              and labels that still collide are shrunk step by step

Run:  python tools/wonderdraft/build_world_v2.py [out.wonderdraft_map] [--preview preview.png] [--preview-scale 0.33] [--preview-only]
Default out: D:/Wonderdraft Map/novaris-world-v2.wonderdraft_map (never v1's file).
Built at 16200x10800, saved at 10800x7200 (SAVE_SCALE): larger maps open but Wonderdraft cannot save them.
"""
import json, math, os, re, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as nd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import wdmap
import build_world as bw
from build_world import W, H, R, AW, AH, S, az, rng, soft, Layout, INK, PAPER, SEA_INK, STATE_INK, LAVA
from wdmap import Color
from wdcommon import (TEMPLATE, sprite, set_files, builtin_theme, symbol as _symbol, label as _label, path as _path,
                      text_box, assemble, preview, shrink)

SAVE = os.path.join(bw.AZ, 'saves', 'novaris-v3.map')
OUT = r'D:/Wonderdraft Map/novaris-world-v2.wonderdraft_map'
SAVE_SCALE = 2 / 3                # 16200x10800 -> 10800x7200, under Wonderdraft's save limit (wdcommon.shrink)
V1 = os.path.normcase(os.path.abspath(r'D:/Wonderdraft Map/novaris-world-v1.wonderdraft_map'))
sys.setrecursionlimit(10000)
CS = (3240, 2160)               # terrain classes are read from Exandria.jpeg at this size (5 map px per px)

def path(pts, color, style, width, roughness=0.08, seed=0):
    """every path on this map keeps Wonderdraft's roughness at 0.1 or less (user's rule: more wobble looks sloppy)"""
    return _path(pts, color, style, width, min(0.1, roughness), seed)

# ---------- Exandria terrain classes ----------
PLAIN, RANGE, FOREST, SNOW, DUSK, DESERT, ICE_RANGE, ISLE_GRASS = range(8)  # ISLE_GRASS: Eldmere's open ground  # DUSK = the purple Savalirwood / Greying Wildlands
# woods; ICE_RANGE = snow-covered mountains (Eiselcross, the Greying Wildlands), drawn grey on white

def _eldmere(a, pre_land, k):
    """layout/move_eldmere.py on any array in the shifted frame (pre_land = land before the move)"""
    x0, y0, x1, y1 = [round(v * k) for v in (1225, 810, 1745, 1015)]
    dx, dy = round(55 * k), round(150 * k)
    block = np.zeros_like(pre_land); block[y0:y1, x0:x1] = pre_land[y0:y1, x0:x1]
    out = a.copy(); out[block] = 0
    ys, xs = np.nonzero(block); ok = (ys + dy < a.shape[0]) & (xs + dx < a.shape[1])
    out[ys[ok] + dy, xs[ok] + dx] = a[ys[ok], xs[ok]]
    return out

def terrain_classes():
    """-> class map at CS in the Novaris layout (sea pixels are meaningless: mask with land)"""
    sys.path.insert(0, bw.SCRIPTS)
    from east_shift import shift_image
    cwd = os.getcwd(); os.chdir(bw.SCRIPTS)
    try:
        mid = Image.open(bw.EXANDRIA).convert('RGB').resize(CS, Image.BOX)
        mid = shift_image(np.asarray(mid))
        src = open('make_heightmap.py', encoding='utf8').read().split('# --- widen the strait')[0]
        src = src.replace('src, out, preview = sys.argv[1], sys.argv[2], sys.argv[3]', 'src = None')
        src = src.replace('im = Image.open(src).convert("RGB")', 'im = MID')
        ns = {'__name__': 'make_heightmap', 'MID': Image.fromarray(mid)}
        exec(compile(src, 'make_heightmap.py', 'exec'), ns)
        pre_land = ns['land']
    finally:
        os.chdir(cwd)
    sm = np.asarray(Image.fromarray(mid).filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.GaussianBlur(3)))
    f = sm.astype(np.float32) / 255
    r, g, b = f[..., 0], f[..., 1], f[..., 2]
    v = f.max(-1); s = (v - f.min(-1)) / (v + 1e-6)
    # the poster shades ranges with solid dark strokes; text, roads and grid lines are hairlines an
    # opening removes, so only the share of *thick* dark ink nearby marks a range
    lum = mid.astype(np.float32).mean(-1) / 255
    dark = nd.uniform_filter(nd.binary_opening(lum < 0.42, iterations=1).astype(np.float32), 15)
    green = (g > r) & (g > b)
    cls = np.full(v.shape, PLAIN, np.uint8)
    cls[green & (v < 0.52)] = FOREST
    cls[(r > g) & (b > g - 0.02) & (v < 0.55) & ((r - g) + (b - g) > 0.01)] = DUSK   # violet, also the greyer Savalirwood
    cls[~green & (cls == PLAIN) & (v < 0.72) & (dark > 0.12)] = RANGE
    cls[(r > g * 1.05) & (g > b * 1.12) & (v > 0.72) & (cls == PLAIN)] = DESERT
    # single trees and small clumps on the plains vanish in the blur: count dark-green ink directly
    m = mid.astype(np.float32) / 255
    dg = (m[..., 1] > m[..., 0] + 0.02) & (m[..., 1] > m[..., 2] + 0.02) & (m.mean(-1) < 0.42)
    cls[nd.binary_closing(nd.uniform_filter(dg.astype(np.float32), 5) > 0.3, iterations=1) & (cls == PLAIN)] = FOREST
    seaish = b > r + 0.04                                   # the poster's sea is blue-white, snow is warm white
    cls[(v > 0.85) & (s < 0.1) & ~seaish] = SNOW
    # snowfields: the poster sketches their peaks as grey (unsaturated) strokes on white, while names
    # there are brown ink and the coast has a dark outline, so count grey ink inside the coast only
    raw = mid.astype(np.float32)
    grey = (lum < 0.75) & ((raw.max(-1) - raw.min(-1)) / (raw.max(-1) + 1e-6) < 0.2)
    snowfield = nd.binary_dilation((v > 0.78) & (s < 0.16) & ~seaish, iterations=6) & nd.binary_erosion(pre_land, iterations=5)
    cls[snowfield & (nd.uniform_filter(grey.astype(np.float32), 11) > 0.08) & (cls != RANGE)] = ICE_RANGE
    cls[~pre_land] = PLAIN   # Novaris land where Exandria has sea (Crown Isle, islands added from Azgaar): its sea reads as snow
    out = np.full(v.shape, PLAIN, np.uint8)
    MIN = {RANGE: 60, FOREST: 4, DUSK: 12, DESERT: 40, SNOW: 40, ICE_RANGE: 60}  # px at CS; small woods are kept
    for c in (RANGE, FOREST, DUSK, DESERT, SNOW, ICE_RANGE):  # clean each class: no specks, no pinholes
        m = cls == c if c in (FOREST, DUSK) else nd.binary_opening(cls == c, iterations=2)   # woods: keep small clumps
        m = nd.binary_closing(m, iterations=2)
        lab, n = nd.label(m)
        if n:
            big = np.bincount(lab.ravel()) >= MIN[c]; big[0] = False
            m = big[lab]
        out[m] = c
    k = CS[0] / 1800
    # Eldmere (the Shattered Teeth) sits under the poster's grey mist, which the rules above misread:
    # there only saturated ink counts - dark/yellow-green tree clumps and brown peaks; the rest is grass
    x0, y0, x1, y1 = [round(v * k) for v in (1225, 810, 1745, 1015)]
    c = mid[y0:y1, x0:x1].astype(np.float32) / 255
    r, g, b = c[..., 0], c[..., 1], c[..., 2]; lum = c.mean(-1); cv = c.max(-1); cs = (cv - c.min(-1)) / (cv + 1e-6)
    tree = nd.binary_closing(nd.uniform_filter(((g > r + 0.02) & (g > b + 0.06) & (lum < 0.5)).astype(np.float32), 5) > 0.3, iterations=1)
    tree |= nd.binary_closing((r > 0.55) & (g > 0.5) & (b < 0.3), iterations=2)
    peak = nd.binary_closing(nd.binary_opening((r > g + 0.02) & (r > b + 0.05) & (lum < 0.45) & (cs > 0.15), iterations=1), iterations=2)
    lab, n = nd.label(peak); big = np.bincount(lab.ravel()) >= 8; big[0] = False; peak = big[lab]
    box = out[y0:y1, x0:x1]; isle = pre_land[y0:y1, x0:x1]
    box[isle] = ISLE_GRASS; box[tree & isle] = FOREST; box[peak & isle] = RANGE
    return _eldmere(out, pre_land, k)

# ---------- Azgaar save: routes, state borders ----------
def _save_lines():
    return open(SAVE, encoding='utf8').read().split('\n')

def rdp(pts, eps):
    """Ramer-Douglas-Peucker simplification"""
    if len(pts) < 3: return pts
    a, b = np.array(pts[0]), np.array(pts[-1]); P = np.array(pts)
    d = b - a; n = np.hypot(*d)
    Q = P - a
    dist = np.abs(d[0] * Q[:, 1] - d[1] * Q[:, 0]) / n if n else np.hypot(Q[:, 0], Q[:, 1])
    i = int(dist.argmax())
    if dist[i] <= eps: return [pts[0], pts[-1]]
    return rdp(pts[:i + 1], eps)[:-1] + rdp(pts[i:], eps)

def routes_and_borders(lines):
    routes = None; svg = None
    for l in lines:
        if routes is None and l.startswith('[{"i":0,"group":'): routes = json.loads(l)
        if svg is None and '<g id="stateBorders"' in l: svg = l
    m = re.search(r'<g id="stateBorders"[^>]*>(.*?)</g>', svg)
    borders = []
    for d in re.findall(r'd="([^"]+)"', m.group(1)):
        for sub in d.split('M')[1:]:
            pts = [tuple(map(float, q.split(','))) for q in re.findall(r'[-\d.]+,[-\d.]+', sub)]
            if len(pts) > 1: borders.append(pts)
    return routes, borders

def on_land_runs(pts, landA, min_len=3):
    """split a polyline (map px) where it leaves the land: -> list of polylines"""
    runs, cur = [], []
    for x, y in pts:
        ok = 0 <= x < W and 0 <= y < H and landA[int(y) // R, int(x) // R]
        if ok: cur.append((x, y))
        else:
            if len(cur) >= min_len: runs.append(cur)
            cur = []
    if len(cur) >= min_len: runs.append(cur)
    return runs

# ---------- missing islands ----------
def add_missing_islands(land, islands):
    """land: bool at 6480x4320. For each named island with no land near its label, OR in the Azgaar land
    patch around it (heightmap >= 20, the connected piece nearest the label). -> (land, names added)"""
    k = land.shape[1] / 1800
    hm = np.asarray(Image.open(os.path.join(bw.AZ, 'heightmaps', 'novaris.png')).resize(land.shape[::-1], Image.BILINEAR))
    az_land = hm >= 52                                     # make_heightmap: land >= 52 (lightness 0.2)
    added = []
    for p in islands:
        x, y = int(p['x'] * k), int(p['y'] * k); r = int(4 * k)
        if land[max(0, y - r):y + r, max(0, x - r):x + r].any(): continue
        R2 = int(14 * k)
        win = az_land[max(0, y - R2):y + R2, max(0, x - R2):x + R2]
        lab, n = nd.label(win)
        if not n: continue
        oy, ox = max(0, y - R2), max(0, x - R2)
        ys, xs = np.nonzero(lab)
        j = np.argmin((ys + oy - y) ** 2 + (xs + ox - x) ** 2)
        piece = lab == lab[ys[j], xs[j]]
        if piece.sum() < 4: continue  # a single heightmap cell: no islet (it read as a stray town dot)
        land[oy:oy + win.shape[0], ox:ox + win.shape[1]] |= piece
        added.append(p['name'])
    return land, added

# ---------- Salsvault ----------
def salsvault_az():
    """the Eiselcross map's hand-placed Salsvault (poster-crop px) back to Azgaar px through that map's fit"""
    import build_eiselcross as be
    burgs = {p['name']: p for p in json.load(open(be.PLACES, encoding='utf8'))['places'] if p['type'] == 'burg'}
    A = np.array([[burgs[k]['x'], burgs[k]['y'], 1] for k in be.CANON])
    M = np.linalg.lstsq(A, np.array(list(be.CANON.values()), float), rcond=None)[0]
    t = np.array(be.MANUAL['Salsvault'], float)
    return tuple(np.linalg.solve(M[:2].T, t - M[2]))

# ---------- labels ----------
# Sizes for a map that is read zoomed in (at play time) - v1's were sized to read the whole world at once
# and filled it with names. Markers shrink with their labels.
SIZE = {'continent': 280, 'sea': 110, 'state': 120, 'region': 0.55, 'archipelago': 28, 'island': 20, 'river': 15}   # rivers below villages (17)
# at whole-map distance only countries (states) and continents should read; regions are for zooming in
BURGS = {  # group -> (marker, width px, label size)
    'capital': ('symbols/custom_colors/s1_capital', 40, 34),
    'city':    ('symbols/custom_colors/s1_city', 32, 28),
    'town':    ('symbols/custom_colors/s1_town', 20, 21),
    'fort':    ('symbols/custom_colors/s1_fortress', 28, 19),
    'village': ('symbols/custom_colors/s1_town', 15, 17),
}

def river_spots(course, x, y):
    """label spots along a river course, nearest the Azgaar label first, each tilted with the river
    (kept readable: never upside down, at most ~35 degrees)"""
    out = []
    for i in sorted(range(len(course)), key=lambda i: (course[i][0] - x) ** 2 + (course[i][1] - y) ** 2):
        a, b = course[max(0, i - 2)], course[min(len(course) - 1, i + 2)]
        ang = math.atan2(b[1] - a[1], b[0] - a[0])
        if ang > math.pi / 2: ang -= math.pi
        if ang < -math.pi / 2: ang += math.pi
        ang = max(-0.6, min(0.6, ang))
        nx, ny = -math.sin(ang), math.cos(ang)                       # off the river, either side
        for d in (-22, 22, -40, 40, -60, 60):
            out.append((course[i][0] + nx * d, course[i][1] + ny * d, ang))
    return out

def layout_labels(places, sized, rivers):
    """v1's greedy placement, with more candidate spots and, if a label still collides, smaller sizes
    (down to 60 %). -> (labels, markers, keepout boxes, label boxes, overlap report)"""
    lay, labels, markers, keep, boxes = Layout(), [], [], [], []
    def put(text, cands, font, size, color, outline=PAPER, outline_size=5, spacing=0, block=False, kind=''):
        """cands: (x, y) or (x, y, rotation) spots; a tilted label reserves its rotated bounding box"""
        for f in (1.0, 0.88, 0.78, 0.7, 0.6):
            sz = max(8, round(size * f)); w0, h0 = text_box(text, font, sz, spacing * f)
            best = None
            for c in cands:
                cx, cy = c[0], c[1]; rot = c[2] if len(c) > 2 else 0.0
                w = abs(w0 * math.cos(rot)) + abs(h0 * math.sin(rot)); h = abs(w0 * math.sin(rot)) + abs(h0 * math.cos(rot))
                if not (w / 2 < cx < W - w / 2 and h / 2 < cy < H - h / 2): continue
                b = (cx - w / 2 - outline_size - 6, cy - h / 2 - 6, cx + w / 2 + outline_size + 6, cy + h / 2 + 6)
                o = lay.overlap(b)
                if best is None or o < best[0]: best = (o, (cx, cy, rot), b, sz)
                if o == 0: break
            if best and best[0] == 0: break
        if best is None:
            c = cands[0]; w, h = text_box(text, font, size, spacing)
            best = (0, (c[0], c[1], 0.0), (c[0] - w / 2, c[1] - h / 2, c[0] + w / 2, c[1] + h / 2), size)
        o, (x, y, rot), b, sz = best
        lay.add(b); boxes.append((text, kind, b))
        labels.append(_label(text, x, y, font, sz, color, outline, outline_size, round(spacing * sz / size)))
        labels[-1]['rotation'] = float(rot)
        if block: keep.append(b)
    def around(x, y, w, h, steps=(0, 0.6, -0.6, 1.2, -1.2, 1.8, -1.8, 2.4, -2.4, 3.0, -3.0)):
        return [(x + dx * w, y + dy * h) for dy in steps for dx in (0, 0.3, -0.3, 0.6, -0.6, 0.9, -0.9)]

    burgs = [p for p in places if p['type'] == 'burg']
    for p in burgs:
        tex, width, _ = BURGS[p['group']]
        x, y = az(p['x'], p['y'])
        markers.append((tex, x, y, width))
        b = (x - width / 2, y - width / 2, x + width / 2, y + width / 2)
        lay.add(b); boxes.append((p['name'], 'marker', b))
    keep += [tuple(b) for b in lay.boxes]

    added = [p for p in places if p['type'] == 'added']
    for p in added:
        x, y = az(p['x'], p['y'])
        if p['name'] in bw.CONTINENTS:
            t = p['name'].upper(); w, h = text_box(t, 'Cinzel Decorative', SIZE['continent'], 60)
            put(t, around(x, y, w, h), 'Cinzel Decorative', SIZE['continent'], INK, outline_size=8, spacing=60, kind='continent')
        elif p['name'] in bw.SEAS:
            w, h = text_box(p['name'], 'IM FELL English Italic', SIZE['sea'], 24)   # widely spaced, as on old charts
            put(p['name'], around(x, y, w, h), 'IM FELL English Italic', SIZE['sea'], SEA_INK, outline_size=0, spacing=24, kind='sea')
    for p in places:
        if p['type'] == 'state':
            x, y = az(p['x'], p['y']); t = p['name'].upper().replace('|', '\n')
            w, h = text_box(t, 'Cinzel Decorative', SIZE['state'], 14)
            put(t, around(x, y, w, h), 'Cinzel Decorative', SIZE['state'], STATE_INK, outline_size=5, spacing=14, kind='state')
    for p in added:
        n = p['name']
        if n in bw.CONTINENTS or n in bw.SEAS or not (n in sized or n in bw.ARCHIPELAGOS): continue
        size = round(sized[n] * SIZE['region']) if sized.get(n) else SIZE['archipelago']
        sp = max(3, round(size * 0.12))                             # spaced capitals for regions
        x, y = az(p['x'], p['y']); w, h = text_box(n, 'Cinzel Decorative', size, sp)
        put(n, around(x, y, w, h), 'Cinzel Decorative', size, INK, outline_size=4, spacing=sp, kind='region')
    for group in BURGS:
        for p, (tex, x, y, width) in zip(burgs, markers):
            if p['group'] != group: continue
            size = BURGS[group][2]; w, h = text_box(p['name'], 'IM FELL DW Pica', size)
            cands = []
            for k in (0, 1, 2, 3):
                r, g = width / 2 + k * h, 6
                cands += [(x, y + r + h / 2 + g), (x + r + w / 2 + g, y), (x - r - w / 2 - g, y), (x, y - r - h / 2 - g),
                          (x + r + w / 2, y + r + h / 2), (x - r - w / 2, y + r + h / 2),
                          (x + r + w / 2, y - r - h / 2), (x - r - w / 2, y - r - h / 2)]
            put(p['name'], cands, 'IM FELL DW Pica', size, INK, outline_size=3, block=True, kind='burg')
    for p in added:
        n = p['name']
        if n in bw.CONTINENTS or n in bw.SEAS or n in sized or n in bw.ARCHIPELAGOS: continue
        x, y = az(p['x'], p['y']); w, h = text_box(n, 'IM FELL DW Pica', SIZE['island'])
        put(n, around(x, y, w, h, (0, 0.8, -0.8, 1.6, -1.6, 2.4, -2.4, 3.2, -3.2, 4.0, -4.0)), 'IM FELL DW Pica', SIZE['island'], INK, outline_size=3, block=True, kind='island')
    lines = [[az(*q) for q in r['points']] for r in rivers]
    for p in places:
        if p['type'] != 'river': continue
        x, y = az(p['x'], p['y'])
        course = min(lines, key=lambda l: min((qx - x) ** 2 + (qy - y) ** 2 for qx, qy in l))
        put(p['name'], river_spots(course, x, y), 'IM FELL English Italic', SIZE['river'],
            LAVA_INK if p['name'] == 'Emberflow' else RIVER_INK, outline_size=3, block=True, kind='river')
    return labels, markers, keep, boxes

def count_overlaps(boxes, shrink=6):
    """pairs of label/label and label/marker boxes that overlap (pads removed) -> list of (a, b)"""
    B = np.array([[b[0] + shrink, b[1] + shrink, b[2] - shrink, b[3] - shrink] for _, _, b in boxes])
    kinds = [k for _, k, _ in boxes]
    out = []
    for i in range(len(B)):
        w = np.minimum(B[i + 1:, 2], B[i, 2]) - np.maximum(B[i + 1:, 0], B[i, 0])
        h = np.minimum(B[i + 1:, 3], B[i, 3]) - np.maximum(B[i + 1:, 1], B[i, 1])
        for j in np.nonzero((w > 0) & (h > 0))[0] + i + 1:
            if kinds[i] == 'marker' and kinds[j] == 'marker': continue  # two dots touching is not a label clash
            out.append((boxes[i][0], kinds[i], boxes[j][0], kinds[j]))
    return out

# ---------- colours ----------
CLASS_RGB = {RANGE: (150, 134, 118), FOREST: (92, 108, 56), SNOW: (234, 233, 228), DUSK: (104, 92, 112),
             DESERT: (214, 192, 145), ICE_RANGE: (234, 233, 228), ISLE_GRASS: (150, 168, 102)}
ROAD = Color(0.45, 0.26, 0.14, 0.9)
TRAIL = Color(0.50, 0.33, 0.20, 0.75)
SEAWAY = Color(0.36, 0.60, 0.68, 0.75)
RIVER_INK = Color(0.18, 0.42, 0.62, 1.0)   # river names: clear blue, apart from the brown place names   # light sea blue, softer than the land roads (user's pick)
BORDER = Color(0.55, 0.16, 0.10, 0.75)
# rivers / lakes: Exandria's pale river blue. Alpha 1: Wonderdraft lets freshwater show the sea layer
# through by (1 - alpha), and the sea here is parchment, which turned v1's rivers grey
FRESH = Color(0.59, 0.75, 0.80, 1.0)
# the sea: Exandria.jpeg's light blue. Wonderdraft ignores water_colors for the sea itself (they feed the
# tint brush) and draws its water texture, so the colour goes in as a full-map water_tint
SEA = Color(0.80, 0.875, 0.87, 1.0)
COAST_GLOW = Color(0.62, 0.78, 0.78, 0.45)   # the light glow Exandria draws along its coasts
FRESH_EDGE = Color(0.30, 0.43, 0.48, 1.0)

BROAD, CONIFER, JUNGLE = range(3)
FOREST_RGB = {BROAD: (98, 116, 58), CONIFER: (66, 92, 58), JUNGLE: (78, 106, 64)}

def forest_kind(c, bm):
    """tree type per pixel (c = terrain classes, bm = Novaris biomes, same grid). The poster's woods can't
    be told apart by colour (it shades every forest dark inside, light at the edge), so: conifers in the
    north, near snow, in cold biomes and the purple woods; jungle only in hot biomes of Suvarna and the
    Voxaria south (Exandria's Marquet jungles and Rifenmist); broadleaf elsewhere."""
    h, w = c.shape
    yy, xx = np.mgrid[0:h, 0:w]
    near_snow = nd.distance_transform_edt(~np.isin(c, (SNOW, ICE_RANGE))) < 0.03 * w
    conifer = (c == DUSK) | np.isin(bm, (9, 10, 11, 14)) | (yy < 0.3 * h) | near_snow
    jungle = np.isin(bm, (5, 7)) & ~conifer & ((yy > 0.62 * h) | ((xx > 0.45 * w) & (xx < 0.6 * w) & (yy > 0.5 * h)))
    k = np.full(c.shape, BROAD, np.uint8); k[conifer] = CONIFER; k[jungle] = JUNGLE
    return k

def ground_image(bm, cls):
    """ground at the biome-map size: Novaris biome palette, Exandria classes painted over it,
    Novaris blight / lava kept on top"""
    rgb = np.zeros(bm.shape + (3,), np.float32)
    for b, c in bw.PALETTE.items(): rgb[bm == b] = c
    c = np.asarray(Image.fromarray(cls).resize(bm.shape[::-1], Image.NEAREST))
    for k, col in CLASS_RGB.items(): rgb[c == k] = col
    kind = forest_kind(c, bm)
    for k, col in FOREST_RGB.items(): rgb[(c == FOREST) & (kind == k)] = col
    for b in (15, 16): rgb[bm == b] = bw.PALETTE[b]
    return Image.fromarray(rgb.astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6))

# ---------- lakes and rivers ----------
def exandria_lakes(land):
    """lakes where Exandria.jpeg paints freshwater (its grey-blue fill), at the land mask's size in the
    Novaris layout. Thin water (rivers, <= ~15 map px) is opened away; islands in lakes stay. Eldmere,
    which the layout moves, has no lakes on the poster and is left out."""
    sys.path.insert(0, bw.SCRIPTS)
    from east_shift import shift_image
    h, w = land.shape
    e = shift_image(np.asarray(Image.open(bw.EXANDRIA).convert('RGB').resize((w, h), Image.BOX))).astype(np.int16)
    r, g, b = e[..., 0], e[..., 1], e[..., 2]; mx = e.max(-1)
    # lake fill is ~(150,167,164): darker than the sea (~205,224,223), which also shows where Novaris has
    # land the poster does not (Crown Isle), and brighter than the blue-green jungle
    water = (b - r > 3) & (g - r > 6) & (mx < 200) & (mx >= 140) & (np.abs(g - b) < 30)   # greyer lakes too (Ivory, Sorrowsteep)
    water &= nd.binary_erosion(land, iterations=4)                  # not the sea glow along the coast
    k = w / 1800
    water[round(800 * k):, round(1200 * k):] = False                # Eldmere
    lakes = nd.binary_closing(nd.binary_opening(water, iterations=2), iterations=2)
    lab, n = nd.label(lakes)
    big = np.bincount(lab.ravel()) >= 80; big[0] = False
    return nd.binary_dilation(big[lab], iterations=1) & land        # take in the poster's lake outline

def finish_rivers(rivers, land, lakes):
    """Rivers that stop inland (not at the sea, a lake or another river) are carried on to the nearest of
    those, with a gentle wiggle. -> list of river indices that were extended"""
    k = land.shape[1] / 1800
    water = ~land | lakes
    _, (iy, ix) = nd.distance_transform_edt(~water, return_indices=True)
    pts = [np.array(r['points'], float) for r in rivers]
    done = []
    for i, p in enumerate(pts):
        ex, ey = p[-1]
        y, x = min(land.shape[0] - 1, int(ey * k)), min(land.shape[1] - 1, int(ex * k))
        tx, ty = ix[y, x] / k, iy[y, x] / k
        d_water = np.hypot(tx - ex, ty - ey)
        others = np.vstack([q for j, q in enumerate(pts) if j != i])
        j = np.hypot(*(others - p[-1]).T).argmin(); d_riv = np.hypot(*(others[j] - p[-1]))
        if min(d_water, d_riv) <= 4: continue                       # 4 Azgaar px ~ 36 map px: already joins
        if d_riv < d_water: tx, ty = others[j]
        n = max(2, int(np.hypot(tx - ex, ty - ey) / 1.5))
        t = np.linspace(0, 1, n + 1)[1:]
        dx, dy = tx - ex, ty - ey; L = np.hypot(dx, dy)
        wig = np.sin(t * np.pi * max(1, L / 12)) * min(2.0, L / 10) * np.sin(t * np.pi)
        ext = np.c_[ex + dx * t - dy / L * wig, ey + dy * t + dx / L * wig]
        rivers[i]['points'] = [list(q) for q in np.vstack([p, ext]).round(1)]
        pts[i] = np.vstack([p, ext]); done.append(i)
    return done

def rivers_img_sized(rivers):
    """Rivers as freshwater at W x H, widening from source to mouth by the river's size: long rivers and
    rivers that collect tributaries end wide (up to 13 px), short brooks stay thin (Exandria draws ~6 px)."""
    pts = [np.array(r['points'], float) for r in rivers]
    trib = [0] * len(rivers)
    for i, p in enumerate(pts):
        for j, q in enumerate(pts):
            if i != j and np.hypot(*(p - q[-1]).T).min() < 3: trib[i] += 1
    img = Image.new('L', (W, H), 0); d = ImageDraw.Draw(img)
    for p, t in zip(pts, trib):
        q = [az(x, y) for x, y in p]; n = len(q)
        wm = min(13.0, max(5.0, 3.5 + 0.12 * n + 2.0 * t))
        for i, (a, b) in enumerate(zip(q, q[1:])):
            d.line([a, b], fill=255, width=max(2, round(2.5 + (wm - 2.5) * i / max(1, n - 1))))
    return np.asarray(img)

# ---------- Eiselcross from the Wildemount poster ----------
EIS_BOX = (1240, 40, 1500, 192)      # Azgaar px: the archipelago, where poster peaks replace the class rule
LAVA_INK = Color(0.55, 0.20, 0.05, 1.0)

def eiselcross_poster():
    """the Eiselcross map's poster trace, brought to Azgaar px through the same site fit it uses:
    -> (sites {name: (x, y)}, peaks [(x, y, cap area)], lava [(x, y)])"""
    import build_eiselcross as be
    burgs = {p['name']: p for p in json.load(open(be.PLACES, encoding='utf8'))['places'] if p['type'] == 'burg'}
    A = np.array([[burgs[k]['x'], burgs[k]['y'], 1] for k in be.CANON])
    M = np.linalg.lstsq(A, np.array(list(be.CANON.values()), float), rcond=None)[0]
    inv = lambda x, y: tuple(np.linalg.solve(M[:2].T, np.array((x, y), float) - M[2]))
    land, lake, caps, lava = be.trace()
    sites = {n: inv(*t) for n, t in list(be.CANON.items()) + list(be.MANUAL.items())}
    return sites, [(*inv(x, y), a) for x, y, a in caps], [inv(x, y) for x, y in lava]

def in_eis(x, y):
    """map px inside the Eiselcross box"""
    x0, y0, x1, y1 = EIS_BOX
    return x0 * S <= x < x1 * S and y0 * S <= y < y1 * S

# ---------- towns and roads ----------
def snap_towns(places, land, lakes):
    """town dots that fall in the sea or a lake (Azgaar ports sit just past the traced coast, lakes now
    follow Exandria) move to the nearest dry ground, a few px in from the shore. -> moved names"""
    k = land.shape[1] / 1800
    dry = nd.binary_erosion(land & ~lakes, iterations=7)          # ~18 map px in: clear of the roads' shore margin
    _, (iy, ix) = nd.distance_transform_edt(~dry, return_indices=True)
    moved = []
    for p in places:
        if p['type'] != 'burg': continue
        y, x = min(land.shape[0] - 1, int(p['y'] * k)), min(land.shape[1] - 1, int(p['x'] * k))
        if dry[y, x]: continue
        p['x'], p['y'] = round(ix[y, x] / k, 2), round(iy[y, x] / k, 2)
        moved.append(p['name'])
    return moved

class Roads:
    """Land routes from Azgaar fitted to this map: split where they leave the land, led around lakes,
    stray stubs dropped, loose ends joined to the nearest town or road, towns without a road given a
    short trail, and trails that serve a capital or city drawn as main roads. Points are map px; paths
    are found on the analysis grid (R px) over dry land."""
    def __init__(self, landA, lakesA, towns):
        self.landA, self.lakesA = landA, lakesA
        self.coast = nd.distance_transform_edt(landA) * R
        # roads keep off the shore too: a road drawn 7 px wide (plus Wonderdraft's wobble) along the
        # last few px of land spills onto the sea
        self.wetA = lakesA | (self.coast < 14) | (nd.distance_transform_edt(~lakesA) * R < 8)
        self.dry = landA & ~self.wetA
        self.cost = np.where(self.dry, 1.0, np.where(landA & ~lakesA, 30.0, 5000.0))   # shore margin dear, water dearer
        self.towns = towns                                          # [(x, y, group)]
        self.T = np.array([(x, y) for x, y, g in towns])
        self.stats = dict(lake_detours=0, stubs_dropped=0, ends_joined=0, towns_linked=0, promoted=0)

    def wet(self, x, y):
        return self.wetA[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)]

    def route(self, a, b):
        """cheapest dry path a -> b (map px) on the analysis grid, or None"""
        from skimage.graph import MCP_Geometric
        (ax, ay), (bx, by) = a, b
        m = 60
        x0, x1 = int(max(0, min(ax, bx) // R - m)), int(min(AW, max(ax, bx) // R + m))
        y0, y1 = int(max(0, min(ay, by) // R - m)), int(min(AH, max(ay, by) // R + m))
        c = self.cost[y0:y1, x0:x1]
        s = (min(c.shape[0] - 1, int(ay // R) - y0), min(c.shape[1] - 1, int(ax // R) - x0))
        e = (min(c.shape[0] - 1, int(by // R) - y0), min(c.shape[1] - 1, int(bx // R) - x0))
        mcp = MCP_Geometric(c); mcp.find_costs([s], [e])
        pts = [((xx + x0) * R + R / 2, (yy + y0) * R + R / 2) for yy, xx in mcp.traceback(e)]
        return rdp(pts, 2.5) if len(pts) > 1 else None

    @staticmethod
    def dense(pts, step=6.0):
        out = [pts[0]]
        for a, b in zip(pts, pts[1:]):
            n = max(1, int(np.hypot(b[0] - a[0], b[1] - a[1]) // step))
            out += [(a[0] + (b[0] - a[0]) * t / n, a[1] + (b[1] - a[1]) * t / n) for t in range(1, n + 1)]
        return out

    def around_lakes(self, run):
        d = self.dense(run); wet = [self.wet(x, y) for x, y in d]
        if not any(wet): return run
        out, i = [], 0
        while i < len(d):
            if not wet[i]: out.append(d[i]); i += 1; continue
            j = i
            while j < len(d) and wet[j]: j += 1
            if not out or j >= len(d): i = j; continue              # starts/ends in a lake: just cut
            det = self.route(out[-1], d[j])
            if det: out += det[1:-1]; self.stats['lake_detours'] += 1
            i = j
        return rdp(out, 2.5) if len(out) > 1 else run

    @staticmethod
    def length(run):
        return float(sum(np.hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(run, run[1:])))

    def near_town(self, x, y):
        d = np.hypot(self.T[:, 0] - x, self.T[:, 1] - y); i = int(d.argmin())
        return i, float(d[i])

    def fit(self, routes):
        """routes: [(key, [map px points])] land routes -> [(key, run)]"""
        runs = []
        for key, pts in routes:
            pieces = [r for r in (self.around_lakes(run) for run in on_land_runs(pts, self.landA, 2)) if len(r) > 1]
            # pieces of one route split by a bay, lake or the shore margin: rejoin them over land when a dry
            # way round is not much longer than the gap, so a road never just stops
            merged = pieces[:1]
            for nxt in pieces[1:]:
                a, b = merged[-1][-1], nxt[0]
                gap = float(np.hypot(b[0] - a[0], b[1] - a[1]))
                link = self.route(a, b) if gap < 900 else None
                if link and self.length(link) < 3 * gap + 150 and not any(self.wet(x, y) and not self.landA[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)] or self.lakesA[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)] for x, y in self.dense(link)):
                    merged[-1] = merged[-1] + link[1:-1] + nxt; self.stats['gaps_joined'] = self.stats.get('gaps_joined', 0) + 1
                else:
                    merged.append(nxt)
            runs += [[key, r] for r in merged]
        keep = []
        for key, run in runs:                                       # stray stubs left by the coast cut
            ends = [self.near_town(*run[0])[1], self.near_town(*run[-1])[1]]
            if self.length(run) < 60 and min(ends) > 40: self.stats['stubs_dropped'] += 1; continue
            keep.append([key, run])
        runs = keep
        for r_ in runs:                                             # loose ends
            for end in (0, -1):
                x, y = r_[1][end]
                i, dt = self.near_town(x, y)
                if dt <= 8: continue
                if dt <= 120:                                       # the town it was heading for (maybe moved ashore)
                    target = tuple(self.T[i])
                else:
                    if self.coast[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)] <= 30: continue
                    others = np.vstack([np.array(q[1]) for q in runs if q is not r_])
                    do = np.hypot(others[:, 0] - x, others[:, 1] - y); j = int(do.argmin())
                    if do[j] <= 15: continue
                    target = tuple(others[j]) if do[j] < dt else tuple(self.T[i])
                    if min(do[j], dt) > 400: continue
                link = self.route((x, y), target)
                if not link: continue
                r_[1] = (link[::-1] + r_[1][1:]) if end == 0 else (r_[1][:-1] + link)
                self.stats['ends_joined'] += 1
        allp = np.vstack([np.array(q[1]) for q in runs])
        for x, y, g in self.towns:                                  # towns with no road: a short trail
            if np.hypot(allp[:, 0] - x, allp[:, 1] - y).min() <= 60: continue
            if hasattr(self, 'sea') and len(self.sea) and np.hypot(self.sea[:, 0] - x, self.sea[:, 1] - y).min() <= 60: continue
            d = np.hypot(allp[:, 0] - x, allp[:, 1] - y); j = int(d.argmin())
            if d[j] > 700: continue
            link = self.route((x, y), tuple(allp[j]))
            if link: runs.append(['trail', link]); self.stats['towns_linked'] += 1
        major = {i for i, (x, y, g) in enumerate(self.towns) if g in ('capital', 'city')}
        for r_ in runs:                                             # trails serving a capital or city: main road
            if r_[0] != 'trail': continue
            a, da = self.near_town(*r_[1][0]); b, db = self.near_town(*r_[1][-1])
            if (da <= 60 and a in major) or (db <= 60 and b in major):
                r_[0] = 'road'; self.stats['promoted'] += 1
        return runs

class SeaRoutes:
    """Sea routes kept on the water: Azgaar's routes re-found over the sea between their own stops (they
    were drawn against Azgaar's coast, not this one), then every island of some size and every port the
    network misses is joined to it, nearest first, so island chains (Eldmere) link up one by one.
    Paths run on a SG-px grid and keep a little off the shore."""
    SG = 6
    def __init__(self, landA):
        k = self.SG // R
        land = np.asarray(Image.fromarray(landA.astype(np.uint8) * 255).resize((AW // k, AH // k), Image.BOX)) > 0
        self.land = land; self.h, self.w = land.shape
        off = nd.distance_transform_edt(~land)                      # cells from the shore
        self.cost = np.where(land, np.inf, 1.0 + 6.0 * np.clip(3.0 - off, 0, 3))
        _, (self.iy, self.ix) = nd.distance_transform_edt(land, return_indices=True)
        self.stats = dict(rerouted=0, islands=0, ports=0)

    def cell(self, x, y):
        cy, cx = min(self.h - 1, max(0, int(y // self.SG))), min(self.w - 1, max(0, int(x // self.SG)))
        return int(self.iy[cy, cx]), int(self.ix[cy, cx])           # nearest sea cell

    def route(self, a, b, margin=80):
        from skimage.graph import MCP_Geometric
        (ay, ax), (by, bx) = self.cell(*a), self.cell(*b)
        y0, y1 = max(0, min(ay, by) - margin), min(self.h, max(ay, by) + margin)
        x0, x1 = max(0, min(ax, bx) - margin), min(self.w, max(ax, bx) + margin)
        mcp = MCP_Geometric(self.cost[y0:y1, x0:x1])
        costs, _ = mcp.find_costs([(ay - y0, ax - x0)], [(by - y0, bx - x0)])
        if not np.isfinite(costs[by - y0, bx - x0]): return None
        return [((xx + x0) * self.SG + self.SG / 2, (yy + y0) * self.SG + self.SG / 2) for yy, xx in mcp.traceback((by - y0, bx - x0))]

    def refit(self, pts):
        """an Azgaar route through stops ~250 px apart along it, each leg found over water"""
        d = np.r_[0, np.cumsum(np.hypot(*np.diff(np.array(pts), axis=0).T))]
        n = max(1, int(d[-1] // 250))
        stops = [tuple(np.interp(t, d, np.array(pts)[:, i]) for i in (0, 1)) for t in np.linspace(0, d[-1], n + 1)]
        out = [pts[0]]
        for a, b in zip(stops, stops[1:]):
            leg = self.route(a, b)
            out += (leg[1:] if leg else [b])
        out.append(pts[-1])
        return rdp(out, 3.0)

    def port_net(self, towns, landA):
        """Shipping lanes the way Exandria draws them: between the ports (coastal towns) of different
        landmasses. Every landmass with a port is tied in by its shortest lane (a spanning tree over
        landmasses, by sea distance), then each pair of landmasses may get one more lane between major
        ports when that saves a long way round. Lanes follow the water, off the shore."""
        from scipy.spatial import Delaunay
        lab, _ = nd.label(landA)
        coast = nd.distance_transform_edt(landA) * R
        ports = [(x, y, g) for x, y, g in towns if coast[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)] < 45]
        P = np.array([(x, y) for x, y, g in ports]); major = [g in ('capital', 'city') for x, y, g in ports]
        isl = [int(lab[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)]) for x, y in P]
        tri = Delaunay(P)
        pairs = {tuple(sorted((a, b))) for t in tri.simplices for a, b in ((t[0], t[1]), (t[1], t[2]), (t[0], t[2]))}
        cand = []
        for a, b in pairs:
            if isl[a] == isl[b]: continue
            d = float(np.hypot(*(P[a] - P[b])))
            if d > 6000: continue
            leg = self.route(tuple(P[a]), tuple(P[b]), margin=int(max(60, d / self.SG * 0.4)))
            if not leg: continue
            L_ = sum(np.hypot(q[0] - o[0], q[1] - o[1]) for o, q in zip(leg, leg[1:]))
            cand.append((L_, a, b, leg))
        cand.sort(key=lambda c: c[0])
        parent = {}
        def find(u):
            while parent.get(u, u) != u: u = parent[u]
            return u
        runs, used = [], {}
        for L_, a, b, leg in cand:                                  # spanning tree over landmasses
            ra, rb = find(isl[a]), find(isl[b])
            if ra == rb: continue
            parent[ra] = rb; used[tuple(sorted((isl[a], isl[b])))] = L_
            runs.append([tuple(P[a])] + leg + [tuple(P[b])])
        for L_, a, b, leg in cand:                                  # a second lane between major ports
            k_ = tuple(sorted((isl[a], isl[b])))
            if not (major[a] and major[b]) or k_ in used and used[k_] < 0: continue
            if k_ in used and L_ < 1.6 * used[k_]: continue
            used[k_] = -1; runs.append([tuple(P[a])] + leg + [tuple(P[b])])
        self.stats['lanes'] = len(runs); self.stats['ports'] = len(ports)
        return [rdp(r, 3.0) for r in runs]

    def build(self, sea, towns, landA):
        runs = self.port_net(towns, landA)                          # Azgaar's routes (sea) are not used any more
        net = lambda: np.vstack([np.array(r) for r in runs])
        # islands (land pieces >= 2000 px^2 at the analysis grid) and ports the network does not reach
        lab, n = nd.label(landA); sz = np.bincount(lab.ravel())
        shore = landA & ~nd.binary_erosion(landA)
        sl = lab[shore]; ys, xs = np.nonzero(shore)
        order = np.argsort(sl); sl, ys, xs = sl[order], ys[order], xs[order]
        cut = np.searchsorted(sl, np.arange(1, n + 2))
        targets = []
        for i in range(1, n + 1):
            if True: continue   # islands without a port get no lane (user's call); kept: ports only
            a, b = cut[i - 1], cut[i]
            targets.append(('island', np.c_[xs[a:b] * R + R / 2, ys[a:b] * R + R / 2][::2]))
        coast = nd.distance_transform_edt(landA) * R
        for x, y, g in towns:
            if coast[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)] < 40: targets.append(('port', np.array([[x, y]])))
        while True:
            from scipy.spatial import cKDTree
            P = net(); tree = cKDTree(P); best = None
            keep = []
            for ti, t in enumerate(targets):
                kind, Q = t
                dd, jj = tree.query(Q); j = int(dd.argmin()); dist = dd[j]
                if dist <= (120 if kind == 'island' else 80): continue   # reached: drop it
                keep.append(t)
                if best is None or dist < best[0]: best = (dist, t, tuple(Q[j]), tuple(P[jj[j]]))
            targets = keep
            if best is None: break
            dist, t, a, b = best; targets = [q for q in targets if q is not t]
            if dist > 6000: continue
            leg = self.route(a, b, margin=120)
            if not leg: continue
            runs.append(rdp([a] + leg + [b], 3.0)); self.stats['islands' if t[0] == 'island' else 'ports_linked'] = self.stats.get('islands' if t[0] == 'island' else 'ports_linked', 0) + 1
        return [self.smooth(r) for r in runs]

    def wet(self, pts, skip=40):
        """True when no point (away from the ends, which sit at ports) is on land"""
        P = np.array(pts); d = np.r_[0, np.cumsum(np.hypot(*np.diff(P, axis=0).T))]
        t = np.arange(skip, d[-1] - skip, 4)
        if not len(t): return True
        xs, ys = np.interp(t, d, P[:, 0]), np.interp(t, d, P[:, 1])
        return not self.land[np.clip((ys // self.SG).astype(int), 0, self.h - 1), np.clip((xs // self.SG).astype(int), 0, self.w - 1)].any()

    def smooth(self, pts):
        """Chaikin corner cutting turns the grid's stair-steps into curves; fewer rounds where a curve
        would cut a headland"""
        if len(pts) < 3: return pts
        for rounds in (4, 3, 2, 1):
            q = [tuple(pts[0])]
            cur = [tuple(p) for p in pts]
            for _ in range(rounds):
                nxt = [cur[0]]
                for (ax, ay), (bx, by) in zip(cur, cur[1:]):
                    nxt += [(0.75 * ax + 0.25 * bx, 0.75 * ay + 0.25 * by), (0.25 * ax + 0.75 * bx, 0.25 * ay + 0.75 * by)]
                nxt.append(cur[-1]); cur = nxt
            cur = rdp(cur, 0.8)
            if self.wet(cur):
                self.stats['smoothed'] = self.stats.get('smoothed', 0) + 1
                return cur
        return pts

DROP = {'Croaker Cave'}   # places left off this map (user's call)
CUT_SEA = [(150, 715, 262, 822), (85, 840, 122, 905)]   # Azgaar-px boxes: lanes crossing these are dropped (user's call)
NO_SEA = {'Syngorn', 'Ko Lom', 'Ko Hoi', 'Jeomchang-san'}   # towns with no sea lane (user's call)

def road_network(runs, towns, dry, merge=6, router=None):
    """Azgaar draws one route per pair of towns, so two routes to the same town run side by side and
    meet it as a fan of lines. Here every road is painted on the analysis grid, thickened by `merge`
    cells (lines closer than ~2*merge*R px become one band), kept on dry land, and thinned back to a
    single centreline; that skeleton is cut into one line per stretch between junctions. A stretch is a
    main road where most of it came from main roads. Towns the centreline passes close by get a short
    spur. runs: [(key, pts)], towns: [(x, y, group)] -> [(key, pts)]"""
    from skimage.morphology import skeletonize
    def paint(sel, width):
        im = Image.new('L', (AW, AH), 0); d = ImageDraw.Draw(im)
        for key, pts in runs:
            if sel(key): d.line([(x / R, y / R) for x, y in pts], fill=255, width=width)
        return np.asarray(im) > 0
    allr = paint(lambda k: True, 2)
    main = nd.binary_dilation(paint(lambda k: k == 'road', 2), iterations=merge + 2)
    band = nd.binary_dilation(allr, iterations=merge) & dry
    band = nd.binary_closing(band, iterations=2) & dry
    sk = skeletonize(band)
    # thinning leaves short whiskers on wide bands: drop end branches shorter than 2*merge cells
    nb = lambda m: nd.convolve(m.astype(np.uint8), np.ones((3, 3), np.uint8), mode='constant') - m
    T = np.array([(x / R, y / R) for x, y, g in towns]) if towns else np.zeros((0, 2))
    near_town = np.zeros_like(sk)
    for x, y in T.astype(int):
        near_town[max(0, y - 4):y + 5, max(0, x - 4):x + 5] = True
    for _ in range(2 * merge):
        deg = nb(sk) * sk
        tip = sk & (deg == 1) & ~near_town
        if not tip.any(): break
        sk &= ~tip
    # trace edges between nodes (degree != 2)
    deg = nb(sk) * sk
    H_, W_ = sk.shape
    node = sk & (deg != 2)
    seen = np.zeros_like(sk)
    def nbrs(y, x):
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if (dy or dx) and 0 <= y + dy < H_ and 0 <= x + dx < W_ and sk[y + dy, x + dx]:
                    yield y + dy, x + dx
    edges = []
    for y, x in zip(*np.nonzero(node)):
        for ny, nx in nbrs(y, x):
            if seen[ny, nx] and not node[ny, nx]: continue
            path_ = [(y, x), (ny, nx)]; py, px = y, x; cy, cx = ny, nx
            while not node[cy, cx]:
                seen[cy, cx] = True
                nxt = [q for q in nbrs(cy, cx) if q != (py, px) and not (seen[q] and not node[q])]
                if not nxt: break
                py, px = cy, cx; cy, cx = nxt[0]; path_.append((cy, cx))
            if len(path_) >= 2: edges.append(path_)
    seen_e = set(); out = []
    for e in edges:
        k_ = (min(e[0], e[-1]), max(e[0], e[-1]), len(e))
        if k_ in seen_e: continue
        seen_e.add(k_)
        ys = np.array([q[0] for q in e]); xs = np.array([q[1] for q in e])
        key = 'road' if main[ys, xs].mean() > 0.5 else 'trail'
        pts = [((x + 0.5) * R, (y + 0.5) * R) for y, x in e]
        if len(pts) >= 2: out.append([key, pts])
    # junction pixels come in clumps: treat each clump as one node, drop clump-internal scraps, and chain
    # stretches through nodes where only two meet, so each road is one line between real junctions
    clump, _ = nd.label(nd.binary_dilation(node, iterations=1))
    cid = lambda q: int(clump[int(q[1] // R), int(q[0] // R)])
    out = [e for e in out if not (cid(e[1][0]) and cid(e[1][0]) == cid(e[1][-1]) and len(e[1]) < 8)]
    for _ in range(4):
        inc = {}
        for i, (k_, pts_) in enumerate(out):
            for end in (0, -1):
                c_ = cid(pts_[end])
                if c_: inc.setdefault((c_, k_), []).append((i, end))
        used, merged = set(), []
        for (c_, k_), lst in inc.items():
            if len(lst) != 2: continue
            (i, ei), (j, ej) = lst
            if i == j or i in used or j in used: continue
            a = out[i][1] if ei == -1 else out[i][1][::-1]
            b = out[j][1] if ej == 0 else out[j][1][::-1]
            merged.append([k_, a + b[1:]]); used |= {i, j}
        if not merged: break
        out = [e for i, e in enumerate(out) if i not in used] + merged
    # whiskers and hooks the thinning leaves where a town sat beside the band: stretches with a loose end
    # (no other stretch, no town) go when short, and fragments loose at both ends go unless long
    T_ = np.array([(x, y) for x, y, g in towns])
    length = lambda pts_: sum(np.hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(pts_, pts_[1:]))
    for _ in range(5):
        ends = np.vstack([np.array([q[1][0], q[1][-1]]) for q in out])
        keep = []
        for i, (k_, pts_) in enumerate(out):
            others = np.delete(ends, [2 * i, 2 * i + 1], axis=0)
            loose = sum(np.hypot(*(others - e).T).min() > 15 and np.hypot(*(T_ - e).T).min() > 30 for e in (pts_[0], pts_[-1]))
            L_ = length(pts_)
            if (loose == 1 and L_ < 200) or (loose == 2 and L_ < 400) or L_ < 12: continue
            keep.append([k_, pts_])
        if len(keep) == len(out): break
        out = keep
    # every town on a road: towns the merged centreline passes by get a short spur over dry land
    if out:
        P = np.vstack([np.array(q[1]) for q in out])
        for x, y, g in towns:
            d = np.hypot(P[:, 0] - x, P[:, 1] - y); j = int(d.argmin())
            if d[j] <= 8 or d[j] > 240: continue
            link = router((x, y), tuple(P[j])) if router else None
            if not link or length(link) > 2.5 * d[j] + 40: link = [(x, y), tuple(P[j])] if d[j] < 120 else None
            if link: out.append(['road' if g in ('capital', 'city') else 'trail', [(x, y)] + list(link[1:-1]) + [tuple(P[j])]])
    # smooth each stretch (grid stair-steps), keep its ends fixed so junctions still meet
    def smooth(pts):
        pts = rdp(pts, 1.5)
        for _ in range(2):
            if len(pts) < 3: break
            nxt = [pts[0]]
            for (ax, ay), (bx, by) in zip(pts, pts[1:]):
                nxt += [(0.75 * ax + 0.25 * bx, 0.75 * ay + 0.25 * by), (0.25 * ax + 0.75 * bx, 0.25 * ay + 0.75 * by)]
            nxt.append(pts[-1]); pts = nxt
        return pts
    return [(k, smooth(p_)) for k, p_ in out]

def exandria_style_roads(roads, rangeA, forestA):
    """A road net drawn the way Exandria's are, instead of Azgaar's one-route-per-town-pair tangle:
    on each landmass the towns are joined by a minimum spanning tree over their Delaunay neighbours
    (every town reachable, no parallel duplicates), plus a few extra links between capitals and cities
    where the tree makes a long detour. Each link is routed over dry land, around lakes and the shore,
    through passes rather than over ranges. Links between capitals/cities (and any link in the tree
    with one of them at an end, if long) are main roads; the rest are trails.
    -> [(key, pts)] for road_network() to merge and smooth"""
    from scipy.spatial import Delaunay
    from scipy.sparse import coo_matrix
    from scipy.sparse.csgraph import minimum_spanning_tree, shortest_path
    from skimage.graph import MCP_Geometric
    cost = roads.cost * np.where(rangeA, 7.0, 1.0) * np.where(forestA, 1.4, 1.0)
    ELD = (1280 * S, 960 * S, 1800 * S, 1200 * S)
    towns = [t for t in roads.towns if not in_eis(t[0], t[1]) and not (ELD[0] <= t[0] < ELD[2] and ELD[1] <= t[1] < ELD[3])]
    T = np.array([(x, y) for x, y, g in towns]); G = [g for x, y, g in towns]   # Eiselcross / Eldmere: no roads (as Exandria)
    major = np.array([g in ('capital', 'city') for g in G])
    lab, _ = nd.label(roads.landA)
    isl = np.array([lab[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)] for x, y in T])
    edges = set()
    for k in np.unique(isl):
        idx = np.nonzero(isl == k)[0]
        if k == 0 or len(idx) < 2: continue
        P = T[idx]
        if len(idx) == 2: pairs = [(0, 1)]
        else:
            try:
                tri = Delaunay(P)
                pairs = {tuple(sorted((a, b))) for t in tri.simplices for a, b in ((t[0], t[1]), (t[1], t[2]), (t[0], t[2]))}
            except Exception:
                pairs = [(a, b) for a in range(len(idx)) for b in range(a + 1, len(idx))]
        pairs = [(a, b) for a, b in pairs if np.hypot(*(P[a] - P[b])) < 2500]
        if not pairs: continue
        w = np.array([np.hypot(*(P[a] - P[b])) for a, b in pairs])
        n = len(idx)
        Wm = coo_matrix((w, ([a for a, b in pairs], [b for a, b in pairs])), shape=(n, n)).tocsr()
        mst = minimum_spanning_tree(Wm).tocoo()
        tree = set(zip(mst.row.tolist(), mst.col.tolist()))
        edges |= {(idx[a], idx[b], True) for a, b in tree}
        # shortcuts between major towns where the tree wanders
        D = shortest_path(minimum_spanning_tree(Wm) + minimum_spanning_tree(Wm).T, directed=False)
        for (a, b), ww in zip(pairs, w):
            if (a, b) in tree or (b, a) in tree: continue
            if (major[idx[a]] and major[idx[b]] and D[a, b] > 1.7 * ww) or (ww < 900 and D[a, b] > 2.6 * ww):
                edges.add((idx[a], idx[b], False))          # Exandria's nets have loops and crossroads, not just a tree
    runs = []
    for a, b, in_tree in edges:
        (ax, ay), (bx, by) = T[a], T[b]
        m = 40
        x0, x1 = int(max(0, min(ax, bx) // R - m)), int(min(AW, max(ax, bx) // R + m))
        y0, y1 = int(max(0, min(ay, by) // R - m)), int(min(AH, max(ay, by) // R + m))
        c = cost[y0:y1, x0:x1]
        st = (min(c.shape[0] - 1, int(ay // R) - y0), min(c.shape[1] - 1, int(ax // R) - x0))
        en = (min(c.shape[0] - 1, int(by // R) - y0), min(c.shape[1] - 1, int(bx // R) - x0))
        mcp = MCP_Geometric(c); mcp.find_costs([st], [en])
        pts = [((xx + x0) * R + R / 2, (yy + y0) * R + R / 2) for yy, xx in mcp.traceback(en)]
        if len(pts) < 2: continue
        L_ = float(np.hypot(bx - ax, by - ay))
        key = 'road' if (major[a] and major[b]) or (in_tree and (major[a] or major[b]) and L_ > 500) else 'trail'
        runs.append([key, [tuple(T[a])] + rdp(pts, 2.5)[1:-1] + [tuple(T[b])]])
    roads.stats['links'] = len(runs)
    return runs

# ---------- build ----------
def build():
    land, lakes = bw.trace_land()                                   # 6480 x 4320
    places = [p for p in json.load(open(os.path.join(bw.AZ, 'places-v3.json'), encoding='utf8'))['places']
              if p['name'] not in DROP]
    sized = {l['text']: l.get('size') for l in json.load(open(os.path.join(bw.AZ, 'heightmaps', 'novaris-labels.json'), encoding='utf8'))}
    islands = [p for p in places if p['type'] == 'added' and p['name'] not in bw.CONTINENTS | bw.SEAS | bw.ARCHIPELAGOS
               and p['name'] not in sized]
    land, new_islands = add_missing_islands(land, islands)
    print('islands added from Azgaar:', len(new_islands), new_islands)

    sx, sy = salsvault_az()
    for p in places:
        if p['name'] == 'Salsvault': p['x'], p['y'] = round(sx, 2), round(sy, 2)
    print('Salsvault ->', round(sx, 1), round(sy, 1))

    old = nd.label(lakes)[1]
    land = nd.binary_fill_holes(land)   # sea pockets inside land are the traced lakes' rims: land now, lakes come from Exandria
    lab_, n_ = nd.label(land); sz_ = np.bincount(lab_.ravel())
    land &= (sz_ >= 12)[lab_]                                       # specks off the trace read as stray town dots
    alpha = soft(land, 1.0)
    lakes = exandria_lakes(land)
    print('lakes: %d traced from Exandria (was %d coastline holes)' % (nd.label(lakes)[1], old))
    eis_sites, eis_peaks, eis_lava = eiselcross_poster()
    for p in places:
        if p['type'] == 'burg' and p['name'] in eis_sites: p['x'], p['y'] = [round(v, 2) for v in eis_sites[p['name']]]
    print('town dots moved out of the water:', snap_towns(places, land, lakes))
    rivers = json.load(open(os.path.join(bw.AZ, 'heightmaps', 'novaris-rivers.json'), encoding='utf8'))
    print('rivers carried on to water:', finish_rivers(rivers, land, lakes))
    # soft river edges: the shader draws the outline where mask red ramps up and the fill only near 1,
    # so a hard-edged stroke gets no outline at all
    riv = Image.fromarray(rivers_img_sized(rivers)).filter(ImageFilter.GaussianBlur(1.2))
    fresh = np.maximum(soft(lakes, 1.0), np.asarray(riv)); del riv
    fresh[alpha < 128] = 0
    landA = np.asarray(Image.fromarray(alpha).resize((AW, AH), Image.BILINEAR)) > 127
    thin = []
    for i, r in enumerate(rivers):
        pts = [az(x, y) for x, y in r['points']]
        on = np.mean([0 <= x < W and 0 <= y < H and landA[int(y) // R, int(x) // R] for x, y in pts])
        if on < 0.5: thin.append((i, round(float(on), 2)))
    print('rivers drawn:', len(rivers), '| under half on traced land:', thin)
    print('masks ready')

    cls = terrain_classes()                                         # CS
    clsA = np.asarray(Image.fromarray(cls).resize((AW, AH), Image.NEAREST))
    freshA = np.asarray(Image.fromarray(fresh).resize((AW, AH), Image.BILINEAR)) > 60
    coastA = nd.distance_transform_edt(landA) * R
    iceA = (clsA == ICE_RANGE) & landA
    rangeA = ((clsA == RANGE) & landA) | iceA
    deep = nd.distance_transform_edt(rangeA) * R                    # how far inside a range
    bm_img = Image.open(os.path.join(bw.AZ, 'heightmaps', 'novaris-biomes.png'))
    bmA = np.asarray(bm_img.resize((AW, AH), Image.NEAREST))
    hm = np.asarray(Image.open(os.path.join(bw.AZ, 'heightmaps', 'novaris.png'))).astype(np.float32) / 2.55
    gsmall = ground_image(np.asarray(bm_img), cls)
    gA = np.asarray(gsmall.resize((AW, AH), Image.BILINEAR))
    ground = np.empty((H, W, 4), np.uint8)
    ground[..., :3] = np.asarray(gsmall.resize((W, H), Image.BILINEAR)); ground[..., 3] = 255
    print('ground ready')

    tpl = wdmap.load(TEMPLATE)
    theme = builtin_theme('Paper', tpl['theme'])
    theme.update({
        'water_colors': [SEA, Color(0.72, 0.82, 0.83, 1.0), Color(0.64, 0.77, 0.79, 1.0), Color(0.56, 0.71, 0.74, 1.0)],
        'water_hue': 0.0, 'water_saturation': 0.0, 'water_value': 0.0,
        'coastline_color': COAST_GLOW, 'coastal_fx_distance': 18.0,   # Exandria: a thin pale glow, not a band
        'landmass_outline_color': Color(0.16, 0.13, 0.10, 1.0), 'landmass_outline_blend': 1.0,
        'freshwater_color': FRESH, 'freshwater_outline_color': FRESH_EDGE,
        'vignette_strength': 0.35,
    })
    def ground_at(x, y):
        c = gA[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)] / 255
        return Color(float(c[0]), float(c[1]), float(c[2]), 1.0)
    def symbol(tex, x, y, scale, kind, mirror=False):
        return _symbol(tex, x, y, scale, kind, mirror, sample=ground_at(x, y))

    for p in places:
        if p['name'] == 'Emberflow': p['type'] = 'river'
    lava_az = rdp(eis_lava, 0.6)
    labels, markers, keepout, boxes = layout_labels(places, sized, rivers + [{'points': lava_az}])
    clashes = count_overlaps(boxes)
    print('label overlaps:', len(clashes))
    for c in clashes[:40]: print('   ', c)
    symbols = []
    for tex, x, y, width in markers:
        _, img = sprite('res://sprites/' + tex)
        symbols.append(symbol(tex, x, y, width / img.width, 'symbol'))

    # River Inferno / Emberflow as the poster draws it (Azgaar's lava course has 19 points and runs straight)
    lv = [az(x, y) for x, y in lava_az]
    onl = lambda q: landA[min(AH - 1, int(q[1]) // R), min(AW - 1, int(q[0]) // R)]
    while len(lv) > 2 and not onl(lv[1]): lv.pop(0)
    while len(lv) > 2 and not onl(lv[-2]): lv.pop()
    paths = [path(lv, LAVA, 'path_solid_outlined', 14, 0.08, 935)]
    routes, borders = routes_and_borders(_save_lines())
    np_ = {'border': 0, 'road': 0, 'trail': 0, 'searoute': 0}
    lakesA = np.asarray(Image.fromarray(lakes.astype(np.uint8) * 255).resize((AW, AH), Image.BILINEAR)) > 127
    dry_b = landA & ~nd.binary_dilation(lakesA, iterations=2)          # borders stop at lake shores, no stubs in the water
    for pts in borders:
        for run in on_land_runs([az(x, y) for x, y in rdp(pts, 0.4)], dry_b, 2):
            if Roads.length(run) < 60: continue
            paths.append(path(run, BORDER, 'path_dash_dot_dot', 6, 0.08, 935)); np_['border'] += 1   # thin: must not read as a road
    roads = Roads(landA, lakesA, [(*az(p['x'], p['y']), p['group']) for p in places if p['type'] == 'burg'])
    land_routes, sea = [], []
    for r in routes:
        pts = [az(p[0], p[1]) for p in rdp([tuple(p[:2]) for p in r['points']], 0.3)]
        if r['group'] == 'searoutes': sea.append(pts)
        else: land_routes.append(('road' if r['group'] == 'roads' else 'trail', pts))
    seaways = SeaRoutes(landA)
    ELDB = (1280 * S, 960 * S, 1800 * S, 1200 * S)
    sea_towns = [(*az(p['x'], p['y']), p['group']) for p in places if p['type'] == 'burg' and p['name'] not in NO_SEA
                 and not (ELDB[0] <= p['x'] * S < ELDB[2] and ELDB[1] <= p['y'] * S < ELDB[3])]
    sea = seaways.build(sea, sea_towns, landA)
    inbox = lambda q: any(x0 * S <= q[0] < x1 * S and y0 * S <= q[1] < y1 * S for x0, y0, x1, y1 in CUT_SEA)
    sea = [r for r in sea if sum(map(inbox, Roads.dense(r, 20))) < 3]
    roads.sea = np.vstack([np.array(q) for q in sea]) if sea else np.zeros((0, 2))
    for pts in sea:
        paths.append(path(pts, SEAWAY, 'path_dash_dot', 6, 0.08, 935)); np_['searoute'] += 1
    print('sea routes', seaways.stats)
    # Azgaar's land routes (land_routes) are no longer drawn: the net is built Exandria-style instead
    fitted = exandria_style_roads(roads, rangeA, np.isin(clsA, (FOREST, DUSK)) & landA)
    net = road_network(fitted, [t for t in roads.towns if not in_eis(t[0], t[1])], roads.dry | (roads.landA & ~roads.lakesA & (roads.coast >= 6)), router=roads.route)
    print('road network: %d routes -> %d stretches' % (len(fitted), len(net)))
    for key, run in net:
        st, col, wd = ('path_dash', ROAD, 7) if key == 'road' else ('path_dash', TRAIL, 4.5)   # dashed (user's pick); main roads darker/wider
        paths.append(path(run, col, st, wd, 0.08, 935)); np_[key] += 1   # little wobble: it pushed roads onto the shore
    print('paths', np_, roads.stats)

    def at(a, x, y): return a[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)]
    def scatter(step, jitter):
        for gy in range(step // 2, H, step):
            for gx in range(step // 2, W, step):
                x, y = gx + rng.uniform(-jitter, jitter), gy + rng.uniform(-jitter, jitter)
                if 0 <= x < W and 0 <= y < H and at(landA, x, y) and not at(freshA, x, y):
                    yield x, y

    # brown, snow-tipped painted mountains like the Wildemount poster (drawn as painted, no ground tint)
    large = set_files('res://sprites/mountains/brushed_colored_mountains_large')
    small = set_files('res://sprites/mountains/brushed_colored_mountains_small')
    hills = set_files('res://sprites/mountains/inked_hills') + set_files('res://sprites/mountains/inked_hills_02')
    ice_large = set_files('res://sprites/mountains/inked_mountains_large')
    ice_small = set_files('res://sprites/mountains/inked_mountains_small')
    # painted green trees, sparse: the forest itself is the green ground, as on the poster
    trees = {k: set_files('res://sprites/trees/' + k) for k in ('inked_palm', 'hatch_oak', 'hatch_pine')}
    TREE_WIDTH = {'inked_palm': (40, 50), 'hatch_oak': (30, 38), 'hatch_pine': (24, 30)}
    marsh = set_files('res://sprites/trees/marshy_grass')
    dead = set_files('res://sprites/symbols/dead_trees_paintable')

    # mountains are tested against what they must not cover with their actual drawn shape (sprite alpha)
    # on a fine grid: blocking labels and town markers, sea, rivers/lakes, roads and trails. Big names
    # (states, regions, continents) may sit over ranges, as on the poster. A spot that does not fit
    # is retried with a smaller sprite before it is given up.
    G = 6
    GH, GW = H // G + 1, W // G + 1
    hard = np.zeros((GH, GW), bool)
    for x0, y0, x1, y1 in keepout:
        hard[max(0, int(y0) // G):max(0, int(y1) // G + 1), max(0, int(x0) // G):max(0, int(x1) // G + 1)] = True
    grid = lambda a, f: np.asarray(Image.fromarray(a.astype(np.uint8) * 255).resize((GW, GH), Image.BOX))
    hard |= grid(~landA, 0) > 0                                     # any sea in the cell
    hard |= grid(freshA, 0) > 0
    rd = Image.new('L', (GW, GH), 0); dr = ImageDraw.Draw(rd)
    for pth in paths:
        if 'dot' in pth['style']: continue                         # borders and sea routes may run under peaks
        pts = [(float(a) / G, float(b) / G) for a, b in re.findall(r'Vector2\(\s*([-\d.e]+),\s*([-\d.e]+)', pth['points'])]
        dr.line(pts, fill=255, width=3)
    hard |= np.asarray(rd) > 0; del rd, dr
    _fp = {}
    def footprint(tex, scale, mirror):
        key = (tex, round(scale, 3), mirror)
        if key not in _fp:
            meta, img = sprite(tex)
            a = np.asarray(img.split()[3].resize((max(1, round(img.width * scale / G)), max(1, round(img.height * scale / G))), Image.BOX)) > 90
            if mirror: a = a[:, ::-1]
            _fp[key] = (a, float(meta['offset_x']) * scale, float(meta['offset_y']) * scale, img.width * scale, img.height * scale)
        return _fp[key]
    def fits(tex, x, y, scale, mirror, grid_=None):
        grid_ = hard if grid_ is None else grid_
        a, ox, oy, w, h = footprint(tex, scale, mirror)
        gx, gy = round((x + ox - w / 2) / G), round((y + oy - h / 2) / G)
        if gx < 0 or gy < 0 or gy + a.shape[0] > GH or gx + a.shape[1] > GW: return False
        return not (grid_[gy:gy + a.shape[0], gx:gx + a.shape[1]] & a).any()
    def stamp(tex, x, y, scale, mirror, grid_):
        a, ox, oy, w, h = footprint(tex, scale, mirror)
        gx, gy = round((x + ox - w / 2) / G), round((y + oy - h / 2) / G)
        grid_[gy:gy + a.shape[0], gx:gx + a.shape[1]] |= a
    def place(tex, x, y, width, kind, steps=(1.0, 0.85, 0.72, 0.6), grid_=None, block=None):
        """put a sprite where its drawn shape covers nothing in grid_, shrinking if needed -> size factor or None"""
        _, img = sprite(tex); mirror = rng.random() < 0.5
        for f in steps:
            sc = round(width * f / img.width, 3)
            if fits(tex, x, y, sc, mirror, grid_):
                symbols.append(symbol(tex, x, y, sc, kind, mirror))
                if block is not None: stamp(tex, x, y, sc, mirror, block)
                return f
        return None

    n = {'mountain': 0, 'hill': 0, 'tree': 0, 'other': 0, 'shrunk': 0, 'no_fit': 0, 'tree_no_fit': 0}
    tree_block = hard.copy()                                        # + mountain and hill shapes
    lava_line = Image.new('L', (GW, GH), 0)                         # peaks stay off the lava
    ImageDraw.Draw(lava_line).line([(x / G, y / G) for x, y in lv], fill=255, width=7)
    lava_block = hard | (np.asarray(lava_line) > 0); del lava_line
    for cx, cy, a in sorted(eis_peaks, key=lambda q: q[1]):        # Eiselcross: one peak per poster snow cap
        width = float(np.clip(58 + 4.5 * np.sqrt(a), 64, 140))
        x, y = cx * S, cy * S + 0.3 * width                         # the cap is the top; sprites stand on their base
        tex = rng.choice(ice_large if width >= 105 else ice_small)
        f = place(tex, x, y, width, 'mountain', grid_=lava_block, block=tree_block)
        if f is None: n['no_fit'] += 1; continue
        n['eis_peaks'] = n.get('eis_peaks', 0) + 1
    for x, y in scatter(46, 18):  # mountains: inside the ranges Exandria draws
        if not at(rangeA, x, y) or in_eis(x, y): continue
        d = at(deep, x, y)
        if d < 20 and rng.random() < 0.5: continue                  # range edges: thinner
        big = (d >= 70 and rng.random() < 0.75) or (d >= 35 and rng.random() < 0.4)   # high peaks inside the range
        ice = at(iceA, x, y)                                        # snowy peaks: white inked set
        tex = rng.choice((ice_large if big else ice_small) if ice else (large if big else small)); _, img = sprite(tex)
        width = (rng.uniform(120, 150) if big else rng.uniform(80, 100)) if ice else (rng.uniform(140, 175) if big else rng.uniform(92, 118))
        f = place(tex, x, y, width, 'mountain', (1.0, 0.85, 0.72, 0.6, 0.5, 0.45), block=tree_block)
        if f is None:                                               # among crowded towns: a hill instead
            if place(rng.choice(hills), x, y, rng.uniform(44, 56), 'mountain', (1.0, 0.8), block=tree_block): n['hill'] += 1
            else: n['no_fit'] += 1
            continue
        n['shrunk'] += f < 1
        n['mountain'] += 1
    # Eldmere's ranges are single drawn peaks, too small for the scatter: one sprite per peak blob
    ex0, ey0, ex1, ey1 = [round(t * S / R) for t in (1280, 960, 1800, 1165)]
    blobs, nb = nd.label(rangeA[ey0:ey1, ex0:ex1])
    for i, (cy, cx) in enumerate(nd.center_of_mass(blobs > 0, blobs, range(1, nb + 1)), 1):
        area = (blobs == i).sum() * R * R
        for j in range(max(1, min(4, round(area / 2500)))):
            x = (cx + ex0) * R + rng.uniform(-12, 12) * j; y = (cy + ey0) * R + 20 + rng.uniform(-8, 8) * j
            width = float(np.clip(50 + 0.9 * np.sqrt(area), 70, 130))
            if place(rng.choice(large if width >= 110 else small), x, y, width, 'mountain', (1.0, 0.8, 0.65, 0.5), block=tree_block):
                n['mountain'] += 1; n['eld_peaks'] = n.get('eld_peaks', 0) + 1
    # second, finer pass of small peaks: fills the gaps left between crowded town labels (Voxaria's Sectors)
    for x, y in scatter(30, 10):
        if not at(rangeA, x, y) or in_eis(x, y) or at(deep, x, y) < 8: continue
        ice = at(iceA, x, y)
        if place(rng.choice(ice_small if ice else small), x, y, rng.uniform(62, 80), 'mountain', (1.0, 0.8, 0.65), tree_block, tree_block):
            n['mountain'] += 1; n['gap_fill'] = n.get('gap_fill', 0) + 1
    near_range =nd.binary_dilation(rangeA, iterations=40 // R) & ~rangeA
    for x, y in scatter(86, 32):  # hills: foothills around the ranges, and Novaris uplands
        h = hm[min(1199, int(y / S)), min(1799, int(x / S))]
        if not (at(near_range, x, y) or 55 <= h < 71) or rng.random() > 0.5: continue
        if at(clsA, x, y) in (FOREST, DUSK) or in_eis(x, y): continue
        if place(rng.choice(hills), x, y, rng.uniform(48, 62), 'mountain', (1.0, 0.8), tree_block, tree_block): n['hill'] += 1
    # forests: dense like the poster's (trees may overlap each other, never labels, water, roads or peaks)
    kindA = forest_kind(clsA, bmA)
    MIX = {CONIFER: ('hatch_pine', 'hatch_oak', 0.8), BROAD: ('hatch_oak', 'hatch_pine', 0.8),
           JUNGLE: ('inked_palm', 'hatch_oak', 0.7)}
    for x, y in scatter(24, 9):
        c, b = int(at(clsA, x, y)), int(at(bmA, x, y))
        if c in (FOREST, DUSK):
            if rng.random() > 0.85: continue
            main, other, p = MIX[int(at(kindA, x, y))]
            kind = main if rng.random() < p else other
            if place(rng.choice(trees[kind]), x, y, rng.uniform(*TREE_WIDTH[kind]), 'tree', (1.0, 0.85, 0.7), tree_block):
                n['tree'] += 1
            else: n['tree_no_fit'] += 1
        elif b == 12 and rng.random() < 0.09:
            if place(rng.choice(marsh), x, y, 36, 'tree', (1.0, 0.8), tree_block): n['other'] += 1
        elif b == 15 and rng.random() < 0.11:
            if place(rng.choice(dead), x, y, 40, 'symbol', (1.0, 0.8), tree_block): n['other'] += 1
    print('relief', n)


    mask = np.zeros((H, W, 4), np.uint8)
    mask[..., 3] = alpha
    on = (alpha > 0).astype(np.uint8)
    mask[..., 1] = on; mask[..., 2] = on
    mask[..., 0] = np.maximum(on, fresh)
    del on
    mv = lambda a: memoryview(a).cast('B')
    tint = np.empty((H, W, 4), np.uint8); tint[:] = [round(c * 255) for c in SEA]
    m = assemble(tpl, W, H, theme, mv(mask), symbols, labels, paths, ground=mv(ground), water_tint=mv(tint))
    return m, alpha, fresh, theme, gsmall

if __name__ == '__main__':
    args = sys.argv[1:]
    out = args[0] if args and not args[0].startswith('--') else OUT
    if os.path.normcase(os.path.abspath(out)) == V1:
        sys.exit('refusing to overwrite the v1 map: ' + out)
    m, alpha, fresh, theme, gsmall = build()
    if '--preview' in args:
        p = args[args.index('--preview') + 1]
        sc = float(args[args.index('--preview-scale') + 1]) if '--preview-scale' in args else 1 / 6
        preview(m, alpha, fresh, p, sea=theme['water_colors'][0][:3], scale=sc, ground_img=gsmall)
        print('preview', p)
    if '--preview-only' not in args:
        m = shrink(m, SAVE_SCALE)
        wdmap.save_stream(out, m)
        print('wrote', out, '%dx%d' % (m['map_width'], m['map_height']), len(m['symbols']), 'symbols', len(m['labels']), 'labels', len(m['paths']), 'paths')
