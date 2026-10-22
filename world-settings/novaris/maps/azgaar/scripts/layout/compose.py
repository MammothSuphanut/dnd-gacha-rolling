"""Rough layout sketch: cut continents from the atlas, rotate/shift them, paste on open ocean.

usage: compose.py atlas.png continents_dir config.json out_prefix
config: {"frame": [W, H], "origin": [ox, oy], "moves": {name: [angle_deg_ccw, dx, dy]}}
All coordinates in Azgaar map px (1800x1200 frame); output is rendered at SCALE px per map px.
"""
import json
import math
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

Image.MAX_IMAGE_PIXELS = None
SCALE = 2
HALO = 16  # coastal bands drawn around land in the atlas, map px

# continent title labels sit in the sea: move them with their continent
TITLES = {
    "shenzhou": [(55, 232, 205, 270)],
    "suvarna": [(595, 864, 705, 900), (95, 1058, 310, 1085), (45, 952, 215, 982)],
    "aldenreich": [(1530, 688, 1665, 722), (1200, 185, 1300, 210)],
    "eldmere": [(1345, 1024, 1435, 1052), (1625, 995, 1700, 1015), (1195, 895, 1310, 915)],
}
OCEAN_TILE = (770, 830, 960, 975)  # empty open sea to tile as background
REACH = 60  # map px of sea that travels with each continent
# sea names and other things that stay where they are
SEA_LABELS = [(850, 175, 975, 202), (515, 598, 600, 622), (925, 776, 1075, 802), (675, 1132, 745, 1158), (1640, 1158, 1795, 1198)]  # last: scale bar


def main():
    atlas_path, cdir, cfg_path, out = sys.argv[1:5]
    cfg = json.load(open(cfg_path))
    names = json.load(open(f"{cdir}/names.json"))
    cont = np.load(f"{cdir}/continents.npy")
    H0, W0 = cont.shape
    W, H = cfg["frame"]
    ox, oy = cfg.get("origin", [0, 0])

    atlas = Image.open(atlas_path).convert("RGB").resize((W0 * SCALE, H0 * SCALE), Image.LANCZOS)
    A = np.asarray(atlas).astype(np.float32)

    # background: original atlas on an ocean-tiled frame, every moved continent erased
    tx0, ty0, tx1, ty1 = [v * SCALE for v in OCEAN_TILE]
    tile = A[ty0:ty1, tx0:tx1]
    reps = (math.ceil(H * SCALE / tile.shape[0]), math.ceil(W * SCALE / tile.shape[1]), 1)
    ocean = np.tile(tile, reps)[: H * SCALE, : W * SCALE]
    canvas = ocean.copy()

    # every pixel within REACH of land belongs to the nearest continent (its coast bands and labels move with it)
    dists = np.stack([ndimage.distance_transform_edt(cont != k) for k in range(1, len(names) + 1)])
    nearest = dists.argmin(0) + 1
    near = dists.min(0) <= REACH
    # labels pasted on their own: sea names (moved by sea_moves) + any label boxes the config relocates
    loose = [(tuple(b), cfg.get("sea_moves", {}).get(str(i), [0, 0])) for i, b in enumerate(SEA_LABELS)]
    loose += [(tuple(l["box"]), l["to"]) for l in cfg.get("labels", [])]
    sea = np.zeros((H0, W0), bool)
    for (x0, y0, x1, y1), _ in loose:
        sea[y0:y1, x0:x1] = True
    masks = {}
    for k, name in enumerate(names, start=1):
        m = near & (nearest == k) & ~sea
        for (x0, y0, x1, y1) in TITLES.get(name, []):
            m[y0:y1, x0:x1] = True
        masks[name] = m & ~sea
    placed = {}
    zbuf = np.full((H * SCALE, W * SCALE), 1e9, np.float32)
    for k, name in enumerate(names, start=1):
        ang, dx, dy = cfg["moves"].get(name, [0, 0, 0])
        ys, xs = np.nonzero(cont == k)
        cx, cy = xs.mean(), ys.mean()
        img, a = transform(A, soft(masks[name], 8), cx, cy, ang, dx + ox, dy + oy, W, H)
        own = dists[k - 1].astype(np.float32)
        for (x0, y0, x1, y1) in TITLES.get(name, []):
            own[y0:y1, x0:x1] = 0
        own_hi = np.asarray(Image.fromarray(own).resize((W0 * SCALE, H0 * SCALE), Image.BILINEAR))
        d, _ = transform(None, own_hi + 1, cx, cy, ang, dx + ox, dy + oy, W, H)
        d[d <= 0] = 1e9  # outside the moved image
        win = (d < zbuf) & (a > 0.01)
        canvas[win] = canvas[win] * (1 - a[win][:, None]) + img[win] * a[win][:, None]
        zbuf[win] = d[win]
        land, _ = transform(None, (cont == k).astype(np.float32), cx, cy, ang, dx + ox, dy + oy, W, H, scale=1)
        placed[name] = land > 0.5

    # sea names and fixed islands on top, optionally relocated
    for (x0, y0, x1, y1), (ddx, ddy) in loose:
        m = np.zeros((H0, W0), bool)
        m[y0:y1, x0:x1] = True
        img, a = transform(A, soft(m, 2), 0, 0, 0, ox + ddx, oy + ddy, W, H)
        canvas = canvas * (1 - a[..., None]) + img * a[..., None]
    img, a = transform(A, soft(ndimage.binary_dilation(cont == -1, iterations=HALO) & ~sea, 4), 0, 0, 0, ox, oy, W, H)
    canvas = canvas * (1 - a[..., None]) + img * a[..., None]

    Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8)).save(out + ".png")
    overview(cont, names, placed, cfg, out + "-overview.png")
    report(placed)


def soft(mask, blur):
    im = Image.fromarray((mask * 255).astype(np.uint8)).resize((mask.shape[1] * SCALE, mask.shape[0] * SCALE), Image.BILINEAR)
    return np.asarray(im.filter(ImageFilter.GaussianBlur(blur)), np.float32) / 255


def transform(A, alpha, cx, cy, ang, dx, dy, W, H, scale=SCALE):
    """Rotate by ang (deg, counter-clockwise on screen) about (cx, cy), then shift; output frame W x H map px."""
    t = math.radians(ang)
    c, s = math.cos(t), math.sin(t)
    # output p' = R (p - c) + c + d ; screen y down, so ccw uses [[c, s], [-s, c]]
    R = np.array([[c, s], [-s, c]])
    Rinv = R.T
    ctr = np.array([cy, cx]) * scale
    d = np.array([dy, dx]) * scale
    # input = Rinv (out - ctr - d) + ctr, in (row, col)
    M = np.array([[Rinv[1, 1], Rinv[1, 0]], [Rinv[0, 1], Rinv[0, 0]]])
    offset = ctr - M @ (ctr + d)
    shape = (H * scale, W * scale)
    a = ndimage.affine_transform(alpha, M, offset=offset, output_shape=shape, order=1, cval=0)
    if A is None:
        return a, None
    img = np.stack([ndimage.affine_transform(A[..., ch], M, offset=offset, output_shape=shape, order=1, cval=0) for ch in range(3)], -1)
    return img, a


def overview(cont, names, placed, cfg, path):
    W, H = cfg["frame"]
    ox, oy = cfg.get("origin", [0, 0])
    img = np.full((H, W, 3), (28, 36, 70), np.uint8)
    old = np.zeros((H, W), bool)
    old[oy : oy + cont.shape[0], ox : ox + cont.shape[1]] = cont > 0
    edge = old ^ ndimage.binary_erosion(old)
    pal = [(220, 80, 80), (80, 200, 90), (90, 120, 230), (230, 200, 60), (180, 90, 220)]
    for i, name in enumerate(names):
        img[placed[name]] = pal[i]
    img[edge] = (200, 200, 200)
    im = Image.fromarray(img)
    dr = ImageDraw.Draw(im)
    dr.rectangle([ox, oy, ox + cont.shape[1] - 1, oy + cont.shape[0] - 1], outline=(120, 120, 120))
    im.save(path)


def report(placed):
    names = list(placed)
    dist = {n: ndimage.distance_transform_edt(~placed[n]) for n in names}
    for i, a in enumerate(names):
        for b in names[i + 1 :]:
            g = dist[a][placed[b]].min() if placed[b].any() else -1
            print(f"gap {a}-{b}: {g:.0f} px = {g * 43.2:,.0f} mi")
    for n in names:
        ys, xs = np.nonzero(placed[n])
        print(n, "bbox", xs.min(), ys.min(), xs.max(), ys.max())


main()
