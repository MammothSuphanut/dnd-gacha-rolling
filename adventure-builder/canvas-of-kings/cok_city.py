"""City-scale generation for Canvas of Kings, in feet (convert with FT when writing): organic streets, blocks cut by
those streets, alleys through big blocks, terraced houses along every block edge, props anchored to walls and roads.

Rules learned from the user's test_city (see COK-FORMAT.md): houses stand shoulder to shoulder round the edge of each
block facing the street, yards in the middle; streets curve and vary in width; nothing floats — every light comes from
a fire, every prop leans on a wall, a road or a stall.
"""
import math
import random

from shapely.geometry import LineString, Point, Polygon
from shapely.ops import unary_union


class Noise:
    """Smooth periodic noise in [-1, 1]: a few sine waves with random phases (no sudden jumps)."""

    def __init__(self, rng, freqs=(1, 2, 3, 5)):
        self.waves = [(f, rng.uniform(0, 2 * math.pi), 1 / f ** 0.7) for f in freqs]
        self.norm = sum(a for _, _, a in self.waves)

    def __call__(self, t):
        return sum(a * math.sin(f * t + p) for f, p, a in self.waves) / self.norm


def polar(r, a_deg):
    return math.cos(math.radians(a_deg)) * r, math.sin(math.radians(a_deg)) * r


def organic_ring(r, rng, amp, step=3):
    """Closed ring road round the centre: radius wanders smoothly by ±amp."""
    n = Noise(rng)
    return [polar(r + amp * n(math.radians(a)), a) for a in range(0, 361, step)]


def organic_radial(a, r0, r1, rng, drift=7.0, step=15):
    """Street from r0 out to r1, its bearing drifting smoothly by up to ±drift degrees."""
    n = Noise(rng, (1, 2))
    pts = []
    r = r0
    while r <= r1:
        pts.append(polar(r, a + drift * n((r - r0) / (r1 - r0) * math.pi * 2)))
        r += step
    return pts


def widths_along(pts, w_min, w_max, rng):
    """One width per segment, changing smoothly along the street."""
    n = Noise(rng, (1, 3))
    k = len(pts) - 1
    return [w_min + (w_max - w_min) * (n(i / max(1, k) * math.pi * 2) + 1) / 2 for i in range(k)]


def street_area(pts, widths):
    return unary_union([LineString([a, b]).buffer(w / 2, cap_style=1) for (a, b), w in zip(zip(pts, pts[1:]), widths)])


def long_axis(poly):
    r = poly.minimum_rotated_rectangle
    c = list(r.exterior.coords)
    e1 = (c[1][0] - c[0][0], c[1][1] - c[0][1])
    e2 = (c[2][0] - c[1][0], c[2][1] - c[1][1])
    l1, l2 = math.hypot(*e1), math.hypot(*e2)
    return (e1, l1, l2) if l1 >= l2 else (e2, l2, l1)


def split_blocks(blocks, rng, max_area, min_side, alley_w):
    """Run an alley across the long side of any block that is too big, until none are; returns (blocks, alleys)."""
    out, alleys, todo = [], [], list(blocks)
    while todo:
        b = todo.pop()
        if b.area <= max_area:
            out.append(b)
            continue
        (ex, ez), L, S = long_axis(b)
        if S < min_side * 2:
            out.append(b)
            continue
        ux, uz = ex / math.hypot(ex, ez), ez / math.hypot(ex, ez)
        c = b.centroid
        off = rng.uniform(-0.15, 0.15) * L
        cx, cz = c.x + ux * off, c.y + uz * off
        bend = rng.uniform(-0.08, 0.08)
        nx, nz = -uz + ux * bend, ux + uz * bend  # across the long axis, slightly skewed
        line = LineString([(cx - nx * L, cz - nz * L), (cx + nx * L * 0.5 + ux * rng.uniform(-6, 6), cz + nz * L * 0.5 + uz * rng.uniform(-6, 6)),
                           (cx + nx * L, cz + nz * L)])
        alley = line.buffer(alley_w / 2).intersection(b)
        alleys.append(alley)
        rest = b.difference(line.buffer(alley_w / 2))
        for g in getattr(rest, "geoms", [rest]):
            if g.geom_type == "Polygon" and g.area > 400:
                todo.append(g)
    return out, alleys


def terrace(block, rng, width=(18, 30), depth=(26, 40), gap_chance=0.0, min_w=12, streets=None, passage_w=10):
    """Houses shoulder to shoulder along every edge of the block, fronts on the street, backs to the yard.

    Houses never overlap (a house that would is made shallower or narrower, else left out). If streets is given,
    one or two gaps are left where the block faces a street, so the yard behind can be reached.
    Returns (houses, fronts, passages): rectangles, each one's street edge (a, b, depth), and passages (outside, inside).
    """
    edge = block.buffer(-1.0)
    if edge.is_empty or edge.geom_type != "Polygon":
        return [], [], []
    ring = LineString(edge.exterior.coords)  # walk the whole outline, curves included
    fit = edge.buffer(1.0)
    houses, fronts, passages, taken = [], [], [], None
    max_depth = max(14.0, min(depth[1], math.sqrt(block.area) * 0.42))
    d_noise = Noise(rng, (1, 2))
    total = ring.length

    def inward(p0, p1):
        chord = p0.distance(p1)
        ux, uz = (p1.x - p0.x) / chord, (p1.y - p0.y) / chord
        nx, nz = -uz, ux
        if not edge.contains(Point((p0.x + p1.x) / 2 + nx * 2, (p0.y + p1.y) / 2 + nz * 2)):
            nx, nz = -nx, -nz
        return nx, nz

    # gaps into the yard, only where the block faces a street (not the cavern wall), well apart
    gaps = []
    if streets is not None and block.area > 2500:
        want = 1 if block.area < 14000 else 2
        local = streets.intersection(block.buffer(12))  # only the streets round this block — the whole city's is far too slow
        cands = [s for s in range(10, int(total) - 10, 6) if not local.is_empty and local.distance(ring.interpolate(s)) < 7]
        rng.shuffle(cands)
        for s in cands:
            if len(gaps) >= want:
                break
            if all(min(abs(s - g), total - abs(s - g)) > total / 3 for g in gaps):
                gaps.append(s)
    for g in gaps:
        p = ring.interpolate(g)
        nx, nz = inward(ring.interpolate(g - 3), ring.interpolate(g + 3))
        passages.append(((p.x - nx * 4, p.y - nz * 4), (p.x + nx * (max_depth + 8), p.y + nz * (max_depth + 8))))

    s = rng.uniform(0, 5)
    while s < total - min_w:
        w = rng.uniform(*width)
        blocked = [g for g in gaps if s < g + passage_w / 2 and g - passage_w / 2 < s + w]
        if blocked:
            g = blocked[0]
            if g - passage_w / 2 - s >= min_w:
                w = g - passage_w / 2 - s
            else:
                s = g + passage_w / 2
                continue
        placed = False
        for ww in (w, w * 0.75):
            p0, p1 = ring.interpolate(s), ring.interpolate(min(s + ww, total))
            if p0.distance(p1) < min_w * 0.8:
                break
            nx, nz = inward(p0, p1)
            d = min(max_depth, max(14.0, (depth[0] + depth[1]) / 2 + (depth[1] - depth[0]) / 2 * d_noise(s / total * 2 * math.pi)))
            for dd in (d, d * 0.8, d * 0.6):
                a, b = (p0.x, p0.y), (p1.x, p1.y)
                h = Polygon([a, b, (b[0] + nx * dd, b[1] + nz * dd), (a[0] + nx * dd, a[1] + nz * dd)])
                if not fit.contains(h):
                    continue
                if taken is not None and h.intersection(taken).area > 0.02 * h.area:
                    continue
                houses.append(h)
                fronts.append((a, b, dd))
                taken = h if taken is None else taken.union(h)
                placed = True
                break
            if placed:
                s += ww
                break
        if not placed:
            s += 3
    return houses, fronts, passages


def near_points_along(line_pts, spacing, rng, jitter=0.25):
    """Points every ~spacing along a polyline, with the direction there."""
    line = LineString(line_pts)
    out, s = [], rng.uniform(0, spacing)
    while s < line.length:
        p, q = line.interpolate(s), line.interpolate(min(line.length, s + 1))
        out.append((p.x, p.y, math.degrees(math.atan2(q.y - p.y, q.x - p.x))))
        s += spacing * rng.uniform(1 - jitter, 1 + jitter)
    return out


__all__ = ["Noise", "polar", "organic_ring", "organic_radial", "widths_along", "street_area", "split_blocks", "terrace",
           "near_points_along", "long_axis"]
