"""Build the Eiselcross region map for Wonderdraft, traced from the Wildemount poster.

Sources:
  world-settings/exandria/Wildemount.jpg        coastline, lakes, mountain icons, lava (traced)
  maps/azgaar/places-v3.json                    Novaris sites missing from the poster
                                                (Garden of Stone), placed through an Azgaar ->
                                                poster fit on the sites both maps share;
                                                Salsvault is placed by hand (MANUAL)

Canon names on the poster map to Novaris names (contents/_name-table.md): Foren = Highfrost,
Gelier = Glacia, Biessel = Northend, Dampfkan = Coldfire, Schneescel = Snowveil,
Frostbogen = Whiteout, Taergoss = Fishholm, Kaltsel = Icelet, Vurmas = Duskraft,
Mutalos = Shiftlands, Tomb of the Worm = Wormgrave, Allowak's Sanctuary = Yeti's Hollow,
Balenpost = Westpost, River Inferno = Emberflow.

Run:  python tools/wonderdraft/build_eiselcross.py [out.wonderdraft_map] [--preview preview.png]
Needs Wonderdraft installed (sprite metadata is read from Wonderdraft.pck) and the sample
map D:/Wonderdraft Map/test.wonderdraft_map as the template for theme/image fields.
"""
import json, os, random, sys
import numpy as np
from PIL import Image
from scipy import ndimage as nd

sys.path.insert(0, os.path.dirname(__file__))
import wdmap
from wdmap import Color
from wdcommon import (TEMPLATE, MARKER_COLORS, sprite, set_files, symbol as _symbol, label as _label, path,
                      upscale, land_mask_rgba, assemble, preview)

HERE = os.path.dirname(os.path.abspath(__file__))
NOVARIS = os.path.join(HERE, '..', '..')
POSTER = os.path.join(NOVARIS, '..', 'exandria', 'Wildemount.jpg')
PLACES = os.path.join(NOVARIS, 'maps', 'azgaar', 'places-v3.json')

# Eiselcross on the 9300x6600 poster, and the output size
CROP = (2850, 300, 4900, 1650)
K = 1.66                        # map px per poster px
W, H = round((CROP[2] - CROP[0]) * K), round((CROP[3] - CROP[1]) * K)
rng = random.Random(935)

def to_map(x, y):
    """poster-crop px -> map px"""
    return (x * K, y * K)

# ---------- tracing the poster ----------
# white poster text on land that would otherwise read as snow caps (poster-crop px boxes)
TEXT_ON_LAND = [(1320, 635, 1445, 690),   # FOREN
                (1360, 820, 1580, 960)]   # River Inferno

def trace():
    img = Image.open(POSTER).crop(CROP).convert('RGB')
    a = np.asarray(img).astype(int); R, G, B = a[..., 0], a[..., 1], a[..., 2]; L = a.mean(-1)

    # land: everything the sea can't reach from the border without crossing the black coast line
    barrier = nd.binary_dilation((L < 95) & (B - R < 12), iterations=2)
    lab, _ = nd.label(~barrier)
    border = list(set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])) - {0})
    land = ~np.isin(lab, border)
    land[1000:1130, 100:800] = False  # the poster's big "EISELCROSS" title encloses letter shapes
    land = nd.binary_opening(land, iterations=6)
    l2, n2 = nd.label(land); sz = nd.sum(land, l2, range(1, n2 + 1))
    land = np.isin(l2, 1 + np.where(sz > 3000)[0])

    # lakes: the poster's grey-green water inside the islands
    lake = (G >= R - 2) & (L > 140) & (L < 178) & (B - R < 0)
    lake = nd.median_filter(lake.astype(np.uint8), size=7) > 0
    lake &= nd.binary_erosion(land, iterations=12)
    lake = nd.binary_fill_holes(nd.binary_closing(lake, iterations=6))
    lake = nd.binary_opening(lake, iterations=4)
    l3, n3 = nd.label(lake); s3 = nd.sum(lake, l3, range(1, n3 + 1))
    lake = np.isin(l3, 1 + np.where(s3 > 1500)[0])

    # mountain icons: their pale (white to peach) snow caps
    snow = ((L > 222) | ((L > 198) & (R > 215))) & land & ~lake
    for x0, y0, x1, y1 in TEXT_ON_LAND: snow[y0:y1, x0:x1] = False
    for x, y in CANON.values(): snow[max(0, y - 16):y + 16, max(0, x - 16):x + 16] = False  # site dots
    l4, n4 = nd.label(snow)
    idx = range(1, n4 + 1); s4 = nd.sum(snow, l4, idx)
    caps = [(c[1], c[0], s) for c, s in zip(nd.center_of_mass(snow, l4, idx), s4) if s >= 10]

    # lava: centreline of the orange river, one point every 12 rows
    orange = (R > 190) & (G > 70) & (G < 170) & (B < 90) & (R - G > 50)
    ys, xs = np.nonzero(orange)
    lava = [(xs[ys // 12 == r].mean(), r * 12 + 6) for r in sorted(set(ys // 12))]

    return land, lake, caps, lava

# ---------- sites ----------
# Novaris name -> dot position on the poster (poster-crop px), from the poster's own dots
CANON = {
    'Syrinlya': (1800, 794), 'Westpost': (1336, 1036), 'Duskraft': (300, 506),
    "Yeti's Hollow": (1120, 740), 'Aeor Crash Site': (1176, 496),
    'Fortress of the Dead Jarl': (1212, 344), 'Wormgrave': (632, 608), 'Shiftlands': (980, 304),
}
NOT_ON_POSTER = ['Garden of Stone']
# sites placed by hand (poster-crop px)
MANUAL = {'Salsvault': (1324, 572)}   # east coast of Highfrost, below the Aeor ruins (user pick)

# plain map markers from the stock "Custom Colors" set: ring (s1_city) for inhabited
# outposts, dot (s1_town) for ruins and danger sites; (marker, width px, label dx, label dy)
DOT, RING = 'symbols/custom_colors/s1_town', 'symbols/custom_colors/s1_city'
SITES = {
    'Syrinlya':                  (RING, 40, -95, 0),
    'Westpost':                  (RING, 40, 0, 36),
    'Duskraft':                  (RING, 40, 0, 36),
    'Shiftlands':                (DOT, 26, 0, -34),
    'Fortress of the Dead Jarl': (DOT, 26, 0, 36),
    'Aeor Crash Site':           (DOT, 26, 0, 36),
    'Salsvault':                 (DOT, 26, 0, 36),
    'Wormgrave':                 (DOT, 26, 0, 36),
    "Yeti's Hollow":             (DOT, 26, 0, 36),
    'Garden of Stone':           (DOT, 26, 0, 36),
}
# island / region names where the poster puts them (poster-crop px) -> label size
ISLANDS = {
    'Northend': ((210, 57), 56), 'Coldfire': ((1593, 156), 52), 'Glacia': ((327, 776), 60),
    'Snowveil': ((580, 867), 50), 'Whiteout': ((950, 1152), 50), 'Fishholm': ((1513, 1272), 50),
    'Highfrost': ((1383, 663), 72), 'Icelet': ((1965, 925), 46),
}

def novaris_extra_sites(land):
    """Place sites the poster lacks via a least-squares Azgaar -> poster fit, snapped onto land."""
    burgs = {p['name']: p for p in json.load(open(PLACES, encoding='utf8'))['places'] if p['type'] == 'burg'}
    A = np.array([[burgs[k]['x'], burgs[k]['y'], 1] for k in CANON])
    M = np.linalg.lstsq(A, np.array(list(CANON.values()), float), rcond=None)[0]
    inner = nd.binary_erosion(land, iterations=22)
    _, (iy, ix) = nd.distance_transform_edt(~inner, return_indices=True)
    out = {}
    for name in NOT_ON_POSTER:
        x, y = np.array([burgs[name]['x'], burgs[name]['y'], 1]) @ M
        x, y = int(np.clip(x, 0, inner.shape[1] - 1)), int(np.clip(y, 0, inner.shape[0] - 1))
        out[name] = (int(ix[y, x]), int(iy[y, x]))
    return out

# ---------- map items ----------
SNOW = Color(0.93, 0.94, 0.95, 1.0)
INK = Color(0.17, 0.19, 0.23, 1.0)
PAPER = Color(0.95, 0.93, 0.87, 0.85)
LAVA = Color(0.88, 0.36, 0.09, 1.0)
SEA_INK = Color(0.25, 0.33, 0.38, 1.0)

def symbol(tex, x, y, scale, kind, mirror=False):
    return _symbol(tex, x, y, scale, kind, mirror, sample=SNOW)

def label(text, x, y, font, size, color=INK, outline=PAPER, outline_size=3, spacing=0):
    return _label(text, x, y, font, size, color, outline, outline_size, spacing)

def build():
    land, lake, caps, lava = trace()
    sites = dict(CANON); sites.update(novaris_extra_sites(land)); sites.update(MANUAL)
    alpha, fresh = upscale(land, W, H), upscale(lake, W, H)
    landbool = alpha > 0.5

    symbols, labels, keepout = [], [], []   # keepout: boxes (x0, y0, x1, y1) in map px
    def keep_label(x, y, text, size):
        w, h = len(text) * size * 0.55, size * 1.1
        keepout.append((x - w / 2, y - h / 2, x + w / 2, y + h / 2))

    for name, (tex, width, dx, dy) in SITES.items():
        x, y = to_map(*sites[name])
        _, img = sprite('res://sprites/' + tex)
        symbols.append(symbol(tex, x, y, width / img.width, 'symbol'))
        labels.append(label(name, x + dx, y + dy, 'IM FELL DW Pica', 30, outline_size=4))
        # mountain sprites are wide and drawn upward from their base, so clear a box under the marker
        keepout.append((x - 60, y - 25, x + 60, y + 50))
        keep_label(x + dx, y + dy, name, 30)
    for name, (pos, size) in ISLANDS.items():
        x, y = to_map(*pos)
        labels.append(label(name.upper(), x, y, 'Cinzel Decorative', size, outline_size=5, spacing=4))
        keep_label(x, y, name, size)
    x, y = to_map(1600, 840)
    labels.append(label('Emberflow', x, y, 'IM FELL English Italic', 40, color=Color(0.55, 0.18, 0.04, 1.0), outline_size=4))
    keep_label(x, y, 'Emberflow', 40)
    x, y = to_map(442, 1062)
    labels.append(label('EISELCROSS', x, y, 'Cinzel Decorative', 150, outline_size=6, spacing=10))
    x, y = to_map(260, 1265)
    labels.append(label('The Pale Deep', x, y, 'IM FELL English Italic', 64, color=SEA_INK, outline_size=0))

    def blocked(x, y, pad=0):
        return any(x0 - pad < x < x1 + pad and y0 - pad < y < y1 + pad + 30 for x0, y0, x1, y1 in keepout)

    lava_pts = [to_map(*p) for p in lava]
    on_land = lambda p: 0 <= p[0] < W and 0 <= p[1] < H and alpha[int(p[1]), int(p[0])] > 0.5
    while len(lava_pts) > 2 and not on_land(lava_pts[1]): lava_pts.pop(0)
    while len(lava_pts) > 2 and not on_land(lava_pts[-2]): lava_pts.pop()
    lava_pts = lava_pts[::2] if len(lava_pts) > 40 else lava_pts
    def near_lava(x, y, d):
        for (ax, ay), (bx, by) in zip(lava_pts, lava_pts[1:]):
            vx, vy = bx - ax, by - ay; t = max(0, min(1, ((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy + 1e-9)))
            if (ax + t * vx - x) ** 2 + (ay + t * vy - y) ** 2 < d * d: return True
        return False

    # one mountain per poster mountain icon: base sits a little below the snow cap
    coast_dist = nd.distance_transform_edt(landbool)
    large = set_files('res://sprites/mountains/inked_mountains_large')
    small = set_files('res://sprites/mountains/inked_mountains_small')
    for cx, cy, s in caps:
        x, y = to_map(cx, cy + 14)
        if not (0 <= x < W and 0 <= y < H) or coast_dist[int(y), int(x)] < 10: continue
        if fresh[int(y), int(x)] > 0.5 or blocked(x, y, 5) or near_lava(x, y - 15, 30): continue
        big = s > 60 and rng.random() < 0.7
        tex = rng.choice(large if big else small); _, img = sprite(tex)
        width = rng.uniform(78, 100) if big else rng.uniform(52, 72)
        symbols.append(symbol(tex, x, y, round(width / img.width, 3), 'mountain', rng.random() < 0.5))

    # paths: lava + sea route north of Icelet toward Palebank
    route = [to_map(*p) for p in [(1835, 770), (1880, 720), (1990, 705), (2080, 740)]]
    paths = [path(lava_pts, LAVA, 'path_solid_outlined', 12, 0.25, 935),
             path(route, Color(0.25, 0.33, 0.38, 0.9), 'path_dash', 5, 0.0, 560)]
    x, y = to_map(1890, 655)
    labels.append(label('to Palebank Village  ~9 days', x, y, 'IM FELL English Italic', 34, color=SEA_INK, outline_size=0))

    tpl = wdmap.load(TEMPLATE)
    theme = dict(tpl['theme'])
    theme.update({
        'water_texture': 'Paper', 'ground_texture': 'Paper',
        'water_hue': 0.0, 'water_saturation': -0.35, 'water_value': 0.02,
        'vignette_strength': 0.45, 'coastal_fx_distance': 26.0, 'coastline_style': 5,
        'coastline_color': Color(0.48, 0.58, 0.62, 0.65),
        'landmass_outline_color': INK, 'landmass_outline_blend': 1.0,
        'freshwater_color': Color(0.55, 0.70, 0.78, 0.5), 'freshwater_outline_color': INK,
        'ground_colors': [SNOW, Color(0.86, 0.89, 0.92, 1.0), Color(0.78, 0.82, 0.86, 1.0), Color(0.98, 0.98, 0.98, 1.0)],
        'water_colors': [Color(0.74, 0.79, 0.78, 1.0), Color(0.66, 0.73, 0.74, 1.0),
                         Color(0.56, 0.65, 0.68, 1.0), Color(0.45, 0.55, 0.60, 1.0)],
        'path_color': INK, 'windrose_color': Color(0.17, 0.19, 0.23, 0.35),
    })
    theme['label_presets'] = {
        'Town': {'font_name': 'IM FELL DW Pica', 'font_size': 30.0, 'font_color': INK, 'font_outline_width': 4.0, 'font_outline_color': PAPER},
        'Island': {'font_name': 'Cinzel Decorative', 'font_size': 60.0, 'font_color': INK, 'font_outline_width': 5.0, 'font_outline_color': PAPER},
        'Water': {'font_name': 'IM FELL English Italic', 'font_size': 64.0, 'font_color': SEA_INK, 'font_outline_width': 0.0, 'font_outline_color': PAPER},
    }

    m = assemble(tpl, W, H, theme, land_mask_rgba(alpha, fresh), symbols, labels, paths)
    return m, alpha, fresh

if __name__ == '__main__':
    args = sys.argv[1:]
    out = args[0] if args and not args[0].startswith('--') else r'D:/Wonderdraft Map/eiselcross.wonderdraft_map'
    m, alpha, fresh = build()
    wdmap.save(out, m)
    print('wrote', out, '%dx%d' % (W, H), len(m['symbols']), 'symbols', len(m['labels']), 'labels')
    if '--preview' in args:
        p = args[args.index('--preview') + 1]
        preview(m, alpha, fresh, p, ground=SNOW[:3]); print('preview', p)
