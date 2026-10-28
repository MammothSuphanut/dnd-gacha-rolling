"""Build the Novaris world map for Wonderdraft: Exandria terrain, Wildemount colours, Novaris places.

  continents  traced from world-settings/exandria/Exandria.jpeg with the land rules of
              maps/azgaar/scripts/make_heightmap.py, moved into the Novaris layout the same way the
              Azgaar map was (east_shift.py: Wildemount/Eiselcross/Shattered Teeth 25 px east;
              layout/move_eldmere.py: Eldmere to the south-east)
  colours     ground painted per biome with a palette taken from the Wildemount poster
              (world-settings/exandria/Wildemount.jpg): parchment sea, grey-green plains, deep
              green woods, grey-brown ranges, white snowfields
  relief      Novaris heightmap / biome map / rivers (heightmaps/), which the same pipeline made from Exandria
  places      every name and position from Novaris (places-v3.json), at the Novaris atlas scale
              (9 map px per Azgaar px = the 16200x10800 world image used in Foundry)

Run:  python tools/wonderdraft/build_world.py [out.wonderdraft_map] [--preview preview.png]
The map is written with wdmap.save_stream (zlib blocks): the images alone are ~2 GB raw.
Wonderdraft will not open a map wider or taller than 16384 px (18000x12000 failed).
"""
import json, os, random, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as nd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import wdmap
from wdmap import Color
from wdcommon import (TEMPLATE, sprite, set_files, builtin_theme, symbol as _symbol, label as _label, path,
                      text_box, assemble, preview)

Image.MAX_IMAGE_PIXELS = None
NOVARIS = os.path.join(HERE, '..', '..')
AZ = os.path.join(NOVARIS, 'maps', 'azgaar')
SCRIPTS = os.path.join(AZ, 'scripts')
EXANDRIA = os.path.join(NOVARIS, '..', 'exandria', 'Exandria.jpeg')

W, H = 16200, 10800             # the Novaris world image in Foundry; Godot 3 (Wonderdraft) caps images at 16384 px
S = W / 1800                    # map px per Azgaar px
R = 3                           # analysis grids (coast distance, relief) run at W/R x H/R
AW, AH = W // R, H // R
rng = random.Random(935)

def az(x, y):
    return (x * S, y * S)

# ---------- continents ----------
def _extract(size):
    """make_heightmap.py's land mask from Exandria.jpeg at `size`, east shift applied, v3 Eldmere move."""
    sys.path.insert(0, SCRIPTS)
    from east_shift import shift_image
    cwd = os.getcwd(); os.chdir(SCRIPTS)  # aldenreich_ref resolves its files from here
    try:
        mid = Image.open(EXANDRIA).convert('RGB').resize(size, Image.BOX)
        mid = Image.fromarray(shift_image(np.asarray(mid)))
        src = open('make_heightmap.py', encoding='utf8').read().split('# --- widen the strait')[0]
        src = src.replace('src, out, preview = sys.argv[1], sys.argv[2], sys.argv[3]', 'src = None')
        src = src.replace('im = Image.open(src).convert("RGB")', 'im = MID')
        ns = {'__name__': 'make_heightmap', 'MID': mid}
        exec(compile(src, 'make_heightmap.py', 'exec'), ns)
        land = ns['land']
    finally:
        os.chdir(cwd)
    k = size[0] / 1800  # layout/move_eldmere.py: BOX and SHIFT in 1800 px
    x0, y0, x1, y1 = [round(v * k) for v in (1225, 810, 1745, 1015)]
    dx, dy = round(55 * k), round(150 * k)
    block = np.zeros_like(land); block[y0:y1, x0:x1] = land[y0:y1, x0:x1]
    out = land & ~block
    ys, xs = np.nonzero(block); ok = (ys + dy < land.shape[0]) & (xs + dx < land.shape[1])
    out[ys[ok] + dy, xs[ok] + dx] = True
    return out

def trace_land():
    """-> (land, lakes) at 6480x4320. The rules are tuned for 3240 px: that run decides what is land
    (no grid-line islets, rivers not cut into channels); the 6480 run only sharpens the coastline."""
    lo, hi = _extract((3240, 2160)), _extract((6480, 4320))
    lakes_lo = nd.binary_fill_holes(lo) & ~lo
    up = lambda m: np.asarray(Image.fromarray(m.astype(np.uint8) * 255).resize((6480, 4320), Image.NEAREST)) > 0
    L, lakes = up(lo), up(lakes_lo)
    band = nd.binary_dilation(L, iterations=4) & ~nd.binary_erosion(L, iterations=4)
    land = (L & ~band) | (hi & band)
    land = nd.binary_opening(land, iterations=1) | nd.binary_erosion(L, iterations=4)
    return land | lakes, lakes

def soft(mask_or_img, blur):
    """bool mask (any size) -> uint8 coverage at W x H with a crisp but anti-aliased edge"""
    img = mask_or_img if isinstance(mask_or_img, Image.Image) else Image.fromarray(mask_or_img.astype(np.uint8) * 255)
    img = img.filter(ImageFilter.GaussianBlur(blur)).resize((W, H), Image.BILINEAR)
    lut = [max(0, min(255, round((v - 127.5) * 3 + 127.5))) for v in range(256)]
    return np.asarray(img.point(lut))

def rivers_img(rivers):
    """Rivers as freshwater at W x H, widening from source (first point) to mouth."""
    img = Image.new('L', (W, H), 0); d = ImageDraw.Draw(img)
    for r in rivers:
        pts = [az(x, y) for x, y in r['points']]
        n = len(pts)
        for i, (a, b) in enumerate(zip(pts, pts[1:])):
            d.line([a, b], fill=255, width=round(5 + 11 * i / max(1, n - 1)))
    return np.asarray(img)

# ---------- colours (Wildemount poster palette) ----------
# Azgaar biome ids 0-12 + Exandria extras (heightmaps/novaris-biomes.json) -> ground colour
PALETTE = {
    0: (176, 172, 134), 1: (214, 192, 145), 2: (196, 186, 160), 3: (186, 178, 122), 4: (176, 172, 134),
    5: (112, 126, 66), 6: (118, 134, 80), 7: (88, 108, 52), 8: (96, 118, 70), 9: (98, 112, 78),
    10: (204, 201, 189), 11: (234, 233, 228), 12: (138, 146, 108), 13: (176, 148, 112),
    14: (122, 112, 124), 15: (150, 44, 38), 16: (196, 92, 44),
}
MOUNTAIN = np.array([150, 134, 118])
SEA = Color(0.77, 0.74, 0.66, 1.0)          # the poster's parchment sea
COAST_TEAL = Color(0.22, 0.47, 0.47, 0.8)   # its teal wave lines

def ground_image(bm_small, hm_small):
    """RGB ground at the biome-map size: biome palette, ranges shaded grey-brown (snow stays white)."""
    rgb = np.zeros(bm_small.shape + (3,), np.float32)
    for b, c in PALETTE.items(): rgb[bm_small == b] = c
    m = np.clip((hm_small - 62) / 16, 0, 1)[..., None] * ~np.isin(bm_small, (10, 11))[..., None]
    rgb = rgb * (1 - 0.8 * m) + MOUNTAIN * 0.8 * m
    img = Image.fromarray(rgb.astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6))
    return img

# ---------- places ----------
INK = Color(0.20, 0.16, 0.11, 1.0)
PAPER = Color(0.93, 0.89, 0.78, 0.85)
SEA_INK = Color(0.16, 0.33, 0.35, 1.0)
STATE_INK = Color(0.40, 0.13, 0.08, 1.0)
LAVA = Color(0.88, 0.36, 0.09, 1.0)

# burg group -> (marker, width px, label size)
BURGS = {
    'capital': ('symbols/custom_colors/s1_capital', 56, 58),
    'city':    ('symbols/custom_colors/s1_city', 46, 48),
    'town':    ('symbols/custom_colors/s1_town', 30, 36),
    'fort':    ('symbols/custom_colors/s1_fortress', 42, 32),
    'village': ('symbols/custom_colors/s1_town', 22, 30),
}
CONTINENTS = {'Aldenreich', 'Shenzhou', 'Suvarna', 'Eldmere'}
SEAS = {'The Pale Deep', 'Sundering Ocean', 'Donghai', 'Sagara', 'Skyrest'}
ARCHIPELAGOS = {'Chakan Wilds', 'Saltfrost Isles', 'Isole del Vento', 'Utskjaer', 'Kaknab', 'Frostreach'}
SIZE = {'continent': 340, 'sea': 160, 'state': 110, 'region': 1.7, 'archipelago': 80, 'island': 40, 'river': 36}

class Layout:
    """Greedy label placement: each label takes the first candidate spot that hits nothing placed so
    far (or the least-overlapping one), in priority order: big names, then settlements, islands, rivers."""
    def __init__(self):
        self.boxes = np.zeros((0, 4))
    def overlap(self, b):
        B = self.boxes
        if not len(B): return 0.0
        w = np.clip(np.minimum(B[:, 2], b[2]) - np.maximum(B[:, 0], b[0]), 0, None)
        h = np.clip(np.minimum(B[:, 3], b[3]) - np.maximum(B[:, 1], b[1]), 0, None)
        return float((w * h).sum())
    def add(self, b):
        self.boxes = np.vstack([self.boxes, b])
    def place(self, cands, w, h, pad=6):
        """cands: centre points in preference order -> best centre, and reserve its box"""
        best = None
        for cx, cy in cands:
            if not (w / 2 < cx < W - w / 2 and h / 2 < cy < H - h / 2): continue
            b = (cx - w / 2 - pad, cy - h / 2 - pad, cx + w / 2 + pad, cy + h / 2 + pad)
            o = self.overlap(b)
            if best is None or o < best[0]: best = (o, (cx, cy), b)
            if o == 0: break
        if best is None:
            cx, cy = cands[0]; best = (0, (cx, cy), (cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2))
        self.add(best[2]); return best[1], best[2]

def layout_labels(places, sized, rivers):
    """-> (label records, burg markers [(tex, x, y, width)], boxes that relief keeps off)"""
    lay, labels, markers, keep = Layout(), [], [], []
    def put(text, cands, font, size, color, outline=PAPER, outline_size=5, spacing=0, block=False):
        w, h = text_box(text, font, size, spacing)
        (x, y), b = lay.place(cands, w + 2 * outline_size, h)
        labels.append(_label(text, x, y, font, size, color, outline, outline_size, spacing))
        if block: keep.append(b)  # big names sit over the terrain, as on the poster
    def around(x, y, w, h, steps=(0, 0.6, -0.6, 1.2, -1.2, 1.8, -1.8, 2.4, -2.4)):
        return [(x + dx * w, y + dy * h) for dy in steps for dx in (0, 0.3, -0.3, 0.6, -0.6)]

    burgs = [p for p in places if p['type'] == 'burg']
    for p in burgs:  # markers are obstacles for every label
        tex, width, _ = BURGS[p['group']]
        x, y = az(p['x'], p['y'])
        markers.append((tex, x, y, width))
        lay.add((x - width / 2, y - width / 2, x + width / 2, y + width / 2))
    keep += [tuple(b) for b in lay.boxes]

    added = [p for p in places if p['type'] == 'added']
    for p in added:
        x, y = az(p['x'], p['y'])
        if p['name'] in CONTINENTS:
            t = p['name'].upper(); w, h = text_box(t, 'Cinzel Decorative', SIZE['continent'], 30)
            put(t, around(x, y, w, h), 'Cinzel Decorative', SIZE['continent'], INK, outline_size=10, spacing=30)
        elif p['name'] in SEAS:
            put(p['name'], [(x, y)], 'IM FELL English Italic', SIZE['sea'], SEA_INK, outline_size=0, spacing=8)
    for p in places:
        if p['type'] == 'state':
            x, y = az(p['x'], p['y']); t = p['name'].upper().replace('|', '\n')
            w, h = text_box(t, 'Cinzel Decorative', SIZE['state'], 12)
            put(t, around(x, y, w, h), 'Cinzel Decorative', SIZE['state'], STATE_INK, outline_size=7, spacing=12)
    for p in added:
        n = p['name']
        if n in CONTINENTS or n in SEAS or not (n in sized or n in ARCHIPELAGOS): continue
        size = round(sized[n] * SIZE['region']) if sized.get(n) else SIZE['archipelago']
        x, y = az(p['x'], p['y']); w, h = text_box(n, 'Cinzel Decorative', size, 4)
        put(n, around(x, y, w, h), 'Cinzel Decorative', size, INK, outline_size=6, spacing=4)
    for group in BURGS:
        for p, (tex, x, y, width) in zip(burgs, markers):
            if p['group'] != group: continue
            size = BURGS[group][2]; w, h = text_box(p['name'], 'IM FELL DW Pica', size)
            cands = []
            for k in (0, 1, 2):  # rings of spots around the marker, nearest first
                r, g = width / 2 + k * h, 6
                cands += [(x, y + r + h / 2 + g), (x + r + w / 2 + g, y), (x - r - w / 2 - g, y), (x, y - r - h / 2 - g),
                          (x + r + w / 2, y + r + h / 2), (x - r - w / 2, y + r + h / 2),
                          (x + r + w / 2, y - r - h / 2), (x - r - w / 2, y - r - h / 2)]
            put(p['name'], cands, 'IM FELL DW Pica', size, INK, outline_size=5, block=True)
    for p in added:  # single islands
        n = p['name']
        if n in CONTINENTS or n in SEAS or n in sized or n in ARCHIPELAGOS: continue
        x, y = az(p['x'], p['y']); w, h = text_box(n, 'IM FELL DW Pica', SIZE['island'])
        put(n, around(x, y, w, h, (0, 0.8, -0.8, 1.6, -1.6)), 'IM FELL DW Pica', SIZE['island'], INK, block=True)
    lines = [[az(*q) for q in r['points']] for r in rivers]
    for p in places:  # rivers: anywhere along their own course, nearest the Azgaar label first
        if p['type'] != 'river': continue
        x, y = az(p['x'], p['y'])
        course = min(lines, key=lambda l: min((qx - x) ** 2 + (qy - y) ** 2 for qx, qy in l))
        cands = sorted(course, key=lambda q: (q[0] - x) ** 2 + (q[1] - y) ** 2)
        cands = [(x, y)] + [(qx, qy + d) for qx, qy in cands for d in (-30, 30, -60, 60)]
        put(p['name'], cands, 'IM FELL English Italic', SIZE['river'], SEA_INK, outline_size=4, block=True)
    return labels, markers, keep

# ---------- relief and vegetation ----------
FOREST = {5: 'inked_palm', 6: 'inked_oak', 7: 'inked_palm', 8: 'inked_oak', 9: 'inked_pine', 14: 'inked_pine'}
TREE_WIDTH = {'inked_palm': (40, 50), 'inked_oak': (30, 38), 'inked_pine': (22, 30)}

def build():
    land, lakes = trace_land()
    alpha = soft(land, 1.0)                                         # W x H uint8
    rivers = json.load(open(os.path.join(AZ, 'heightmaps', 'novaris-rivers.json'), encoding='utf8'))
    fresh = np.maximum(soft(lakes, 1.0), rivers_img(rivers))
    fresh[alpha < 128] = 0
    print('masks ready')

    # analysis grids at W/R
    landA = np.asarray(Image.fromarray(alpha).resize((AW, AH), Image.BILINEAR)) > 127
    freshA = np.asarray(Image.fromarray(fresh).resize((AW, AH), Image.BILINEAR)) > 60
    coastA = nd.distance_transform_edt(landA) * R
    hm_img = Image.open(os.path.join(AZ, 'heightmaps', 'novaris.png'))
    hmA = np.asarray(hm_img.resize((AW, AH), Image.BILINEAR)).astype(np.float32) / 2.55
    bm_img = Image.open(os.path.join(AZ, 'heightmaps', 'novaris-biomes.png'))
    bmA = np.asarray(bm_img.resize((AW, AH), Image.NEAREST))

    # ground colours: biome palette at biome-map size, smoothed, then up to W x H
    hm_small = np.asarray(hm_img.resize(bm_img.size, Image.BILINEAR)).astype(np.float32) / 2.55
    gsmall = ground_image(np.asarray(bm_img), hm_small)
    gA = np.asarray(gsmall.resize((AW, AH), Image.BILINEAR))
    ground = np.empty((H, W, 4), np.uint8)
    ground[..., :3] = np.asarray(gsmall.resize((W, H), Image.BILINEAR)); ground[..., 3] = 255
    print('ground ready')

    tpl = wdmap.load(TEMPLATE)
    theme = builtin_theme('Paper', tpl['theme'])
    theme.update({
        'water_colors': [SEA, Color(0.74, 0.71, 0.62, 1.0), Color(0.70, 0.68, 0.60, 1.0), Color(0.66, 0.65, 0.58, 1.0)],
        'water_hue': 0.0, 'water_saturation': 0.0, 'water_value': 0.0,
        'coastline_color': COAST_TEAL, 'coastal_fx_distance': 40.0,
        'landmass_outline_color': Color(0.16, 0.13, 0.10, 1.0), 'landmass_outline_blend': 1.0,
        'freshwater_color': Color(0.40, 0.55, 0.55, 0.85), 'freshwater_outline_color': Color(0.16, 0.13, 0.10, 1.0),
        'vignette_strength': 0.35,
    })
    def ground_at(x, y):
        c = gA[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)] / 255
        return Color(float(c[0]), float(c[1]), float(c[2]), 1.0)
    def symbol(tex, x, y, scale, kind, mirror=False):
        return _symbol(tex, x, y, scale, kind, mirror, sample=ground_at(x, y))

    places = json.load(open(os.path.join(AZ, 'places-v3.json'), encoding='utf8'))['places']
    sized = {l['text']: l.get('size') for l in json.load(open(os.path.join(AZ, 'heightmaps', 'novaris-labels.json'), encoding='utf8'))}
    labels, markers, keepout = layout_labels(places, sized, rivers)
    symbols = []
    for tex, x, y, width in markers:
        _, img = sprite('res://sprites/' + tex)
        symbols.append(symbol(tex, x, y, width / img.width, 'symbol'))

    # coarse occupancy grid so relief/trees stay off labels and markers
    CELL = 20
    busy = np.zeros((H // CELL + 1, W // CELL + 1), bool)
    for x0, y0, x1, y1 in keepout:
        busy[max(0, int(y0) // CELL):max(0, int(y1) // CELL + 1), max(0, int(x0) // CELL):max(0, int(x1) // CELL + 1)] = True
    def free(x, y, r=0):
        cy, cx = int(y) // CELL, int(x) // CELL; rr = r // CELL
        return not busy[max(0, cy - rr):cy + rr + 1 + 3, max(0, cx - rr):cx + rr + 1].any()  # +3: sprites rise above their base
    def at(a, x, y): return a[min(AH - 1, int(y) // R), min(AW - 1, int(x) // R)]
    def scatter(step, jitter):
        for gy in range(step // 2, H, step):
            for gx in range(step // 2, W, step):
                x, y = gx + rng.uniform(-jitter, jitter), gy + rng.uniform(-jitter, jitter)
                if 0 <= x < W and 0 <= y < H and at(landA, x, y) and not at(freshA, x, y):
                    yield x, y

    large = set_files('res://sprites/mountains/inked_mountains_large')
    small = set_files('res://sprites/mountains/inked_mountains_small')
    hills = set_files('res://sprites/mountains/inked_hills') + set_files('res://sprites/mountains/inked_hills_02')
    trees = {k: set_files('res://sprites/trees/' + k) for k in set(FOREST.values())}
    marsh = set_files('res://sprites/trees/marshy_grass')
    dead = set_files('res://sprites/symbols/dead_trees_paintable')

    n = {'mountain': 0, 'hill': 0, 'tree': 0, 'other': 0}
    mtn = np.zeros_like(busy)
    for x, y in scatter(64, 24):  # mountains: Azgaar's relief rule, height >= 71
        h = at(hmA, x, y)
        if h < 71 or at(coastA, x, y) < 16 or not free(x, y, 40): continue
        big = h >= 78 and rng.random() < 0.6
        tex = rng.choice(large if big else small); _, img = sprite(tex)
        width = rng.uniform(110, 140) if big else rng.uniform(76, 96)
        symbols.append(symbol(tex, x, y, round(width / img.width, 3), 'mountain', rng.random() < 0.5))
        mtn[int(y) // CELL - 3:int(y) // CELL + 2, int(x) // CELL - 3:int(x) // CELL + 4] = True
        n['mountain'] += 1
    busy |= mtn
    for x, y in scatter(90, 34):  # hills: height 50-70
        h = at(hmA, x, y)
        if not (50 <= h < 71) or rng.random() > 0.55 or at(coastA, x, y) < 16 or not free(x, y, 20): continue
        tex = rng.choice(hills); _, img = sprite(tex)
        symbols.append(symbol(tex, x, y, round(rng.uniform(48, 62) / img.width, 3), 'mountain', rng.random() < 0.5))
        busy[int(y) // CELL - 1:int(y) // CELL + 1, int(x) // CELL - 2:int(x) // CELL + 3] = True
        n['hill'] += 1
    for x, y in scatter(36, 13):  # forests, marsh, blight
        b = int(at(bmA, x, y))
        if at(coastA, x, y) < 10 or not free(x, y): continue
        if b in FOREST:
            if rng.random() > 0.8: continue
            kind = FOREST[b]; tex = rng.choice(trees[kind]); _, img = sprite(tex)
            symbols.append(symbol(tex, x, y, round(rng.uniform(*TREE_WIDTH[kind]) / img.width, 3), 'tree', rng.random() < 0.5))
            n['tree'] += 1
        elif b == 12 and rng.random() < 0.25:
            tex = rng.choice(marsh); _, img = sprite(tex)
            symbols.append(symbol(tex, x, y, round(36 / img.width, 3), 'tree')); n['other'] += 1
        elif b == 15 and rng.random() < 0.3:
            tex = rng.choice(dead); _, img = sprite(tex)
            symbols.append(symbol(tex, x, y, round(40 / img.width, 3), 'symbol')); n['other'] += 1
    print('relief', n)

    lava = json.load(open(os.path.join(AZ, 'heightmaps', 'novaris-lava.json'), encoding='utf8'))
    paths = [path([az(x, y) for x, y in r['points']], LAVA, 'path_solid_outlined', 14, 0.2, 935) for r in lava]

    # Wonderdraft mask: alpha = land, red = freshwater, rgb 1 elsewhere on land
    mask = np.zeros((H, W, 4), np.uint8)
    mask[..., 3] = alpha
    on = (alpha > 0).astype(np.uint8)
    mask[..., 1] = on; mask[..., 2] = on
    mask[..., 0] = np.maximum(on, fresh)
    del on
    mv = lambda a: memoryview(a).cast('B')
    m = assemble(tpl, W, H, theme, mv(mask), symbols, labels, paths, ground=mv(ground))
    return m, alpha, fresh, theme, gsmall

if __name__ == '__main__':
    args = sys.argv[1:]
    out = args[0] if args and not args[0].startswith('--') else r'D:/Wonderdraft Map/novaris-world.wonderdraft_map'
    m, alpha, fresh, theme, gsmall = build()
    wdmap.save_stream(out, m)
    print('wrote', out, '%dx%d' % (W, H), len(m['symbols']), 'symbols', len(m['labels']), 'labels')
    if '--preview' in args:
        p = args[args.index('--preview') + 1]
        preview(m, alpha, fresh, p, sea=theme['water_colors'][0][:3], ground=(0.69, 0.67, 0.53), scale=1 / 6,
                ground_img=gsmall)
        print('preview', p)
