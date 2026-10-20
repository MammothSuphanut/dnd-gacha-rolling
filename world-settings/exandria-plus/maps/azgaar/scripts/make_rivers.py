"""Trace the rivers drawn on the occidentalavian Exandria map into polylines for Azgaar.

Rivers are thin lines in the same blue-grey as the lakes. They are skeletonised, split into paths
(longest first, so trunks come before tributaries) and oriented source -> mouth, where the mouth is
the end touching the sea, a lake or an already traced river.

Output JSON: [{"points": [[x, y], ...]}] in Azgaar map coordinates (1800x1200), source first.
"""
import json
import sys
from collections import deque

import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from skimage.morphology import skeletonize

src, heightmap, out, preview = sys.argv[1:5]
MAP_W, MAP_H = 1800, 1200
MIN_TRUNK, MIN_BRANCH = 40, 20  # path length in mid-res pixels (3240 wide)

im = Image.open(src).convert("RGB")
W, H = im.size
a = np.asarray(im).astype(np.int16)
land = np.asarray(Image.open(heightmap).convert("L").resize((W, H), Image.NEAREST)) >= 52
water = ~land

lakes = ndi.binary_erosion(ndi.binary_fill_holes(land) & ~land, iterations=3)
lake_rgb = a[lakes].mean(0) if lakes.any() else np.array([155, 171, 165])
inner = ndi.binary_erosion(land, iterations=3)
lake_coloured = np.sqrt(((a - lake_rgb) ** 2).sum(-1)) < 25
# faint rivers: noticeably bluer than the ground around them (and not darker ink)
af = a.astype(np.float32)
blue = af[..., 2] - (af[..., 0] + af[..., 1]) / 2
lum = af.mean(-1)
bluer = (blue - ndi.uniform_filter(blue, 21) > 9) & (lum - ndi.uniform_filter(lum, 21) > -10)
sat = (af.max(-1) - af.min(-1)) / np.maximum(af.max(-1), 1)
snowy = ndi.uniform_filter(((lum > 195) & (sat < 0.09)).astype(np.float32), 25) > 0.25  # snow shading reads blue
# purple-grey woods (Greying Wildlands) and white city icons also read as "bluer"
sm = np.stack([ndi.gaussian_filter(af[..., i], 6) for i in range(3)], -1)
purple = (sm[..., 2] - sm[..., 1] > 2) & (sm[..., 0] - sm[..., 1] > 2)
icons = ndi.binary_dilation((lum > 215) & (sat < 0.12) & ~snowy, iterations=6)
river = (lake_coloured | bluer) & inner & ~snowy & ~ndi.binary_dilation(purple, iterations=8) & ~icons
river = ndi.binary_closing(river, iterations=3) & land  # bridge small breaks in the drawn line
lab, n = ndi.label(river, structure=np.ones((3, 3)))
keep = np.zeros(n + 1, bool)
keep[1:] = ndi.sum(river, lab, range(1, n + 1)) >= 60
skel = skeletonize(keep[lab])

near_water = ndi.binary_dilation(water, iterations=6)
OFFS = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]


def neighbours(p, pool):
    y, x = p
    return [(y + dy, x + dx) for dy, dx in OFFS if (y + dy, x + dx) in pool]


def farthest(start, pool):
    """BFS over pool pixels; returns (farthest pixel, parent map)."""
    parent = {start: None}
    queue = deque([start])
    last = start
    while queue:
        last = queue.popleft()
        for q in neighbours(last, pool):
            if q not in parent:
                parent[q] = last
                queue.append(q)
    return last, parent


def path_to(end, parent):
    path = []
    while end is not None:
        path.append(end)
        end = parent[end]
    return path


traced = set()
rivers = []
sk_lab, sk_n = ndi.label(skel, structure=np.ones((3, 3)))
for comp in ndi.find_objects(sk_lab):
    ys, xs = np.nonzero(sk_lab[comp])
    pool = {(y + comp[0].start, x + comp[1].start) for y, x in zip(ys, xs)}
    pool = {p for p in pool if sk_lab[p] == sk_lab[next(iter(pool))]} if pool else pool
    min_len = MIN_TRUNK
    while len(pool) >= min_len:
        a_end, _ = farthest(next(iter(pool)), pool)
        b_end, parent = farthest(a_end, pool)
        path = path_to(b_end, parent)  # b_end ... a_end
        if len(path) < min_len:
            break

        def mouthness(p):
            y, x = p
            touches = any(q in traced for q in [(y + dy, x + dx) for dy, dx in OFFS])
            return 2 if touches else 1 if near_water[p] else 0

        if mouthness(path[0]) > mouthness(path[-1]):
            path = path[::-1]  # mouth must be last
        rivers.append(path)
        traced.update(path)
        pool -= set(path)
        # drop pixels hugging the trunk so its fringe doesn't come back as fake tributaries
        fringe = {p for p in pool if any(q in traced for q in neighbours(p, traced))}
        pool -= fringe
        min_len = MIN_BRANCH
        # keep only the biggest connected leftover each round; the rest are handled next iterations
        if pool:
            rest = list(pool)
            seen, groups = set(), []
            for p in rest:
                if p in seen:
                    continue
                _, par = farthest(p, pool)
                seen.update(par)
                groups.append(set(par))
            pool = set()
            for g in groups:
                if len(g) >= MIN_BRANCH:
                    pool |= g
            if len(groups) > 1:
                # trace each leftover group separately
                for g in sorted(groups, key=len, reverse=True)[1:]:
                    if len(g) < MIN_BRANCH:
                        continue
                    a2, _ = farthest(next(iter(g)), g)
                    b2, par2 = farthest(a2, g)
                    p2 = path_to(b2, par2)
                    if len(p2) < MIN_BRANCH:
                        continue
                    if mouthness(p2[0]) > mouthness(p2[-1]):
                        p2 = p2[::-1]
                    rivers.append(p2)
                    traced.update(p2)
                pool = max(groups, key=len) - traced if groups else set()

sx, sy = MAP_W / W, MAP_H / H
result = []
for path in rivers:
    pts = path[::4] if len(path) > 8 else path  # thin out: Azgaar cells are ~3 px apart anyway
    if pts[-1] != path[-1]:
        pts = pts + [path[-1]]
    result.append({"points": [[round(x * sx, 1), round(y * sy, 1)] for y, x in pts]})
with open(out, "w", encoding="utf-8") as f:
    json.dump(result, f)

base = Image.open(src).convert("RGB").resize((1620, 1080))
from PIL import ImageDraw  # noqa: E402

draw = ImageDraw.Draw(base)
for r in result:
    pts = [(x * 1620 / MAP_W, y * 1080 / MAP_H) for x, y in r["points"]]
    draw.line(pts, fill=(255, 0, 255), width=2)
    draw.ellipse([pts[-1][0] - 2, pts[-1][1] - 2, pts[-1][0] + 2, pts[-1][1] + 2], fill=(0, 0, 255))
base.save(preview)
print("rivers", len(result), "skeleton px", int(skel.sum()))
