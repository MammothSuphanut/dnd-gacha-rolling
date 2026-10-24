"""Small helpers for writing Canvas of Kings .mommap files (format: COK-FORMAT.md, types: cok-types.json).

Only use filenames whose path_type / object_type appear in cok-types.json — the app silently skips anything else.
"""
import copy
import json
import math
import os
import random

HERE = os.path.dirname(os.path.abspath(__file__))
TYPES = json.load(open(os.path.join(HERE, "cok-types.json"), encoding="utf-8"))
WO = "res://Source/World/WorldObjects/"
WORLD = "res://Source/World/"


def object_type(fn):
    """Most common object_type seen for a WorldObjects file (e.g. 'woDecos/wo_tree_b.tscn')."""
    seen = TYPES["object_types"].get(fn)
    if not seen:
        raise KeyError(f"no known object_type for {fn} — get a sample saved from the app first")
    return int(max(seen, key=seen.get))


def variants(prefix):
    """All known WorldObjects files starting with prefix, e.g. variants('woDecos/wo_bush_')."""
    return sorted(k for k in TYPES["object_types"] if k.startswith(prefix))


def path_type(fn):
    seen = TYPES["path_types"].get(fn)
    if not seen:
        raise KeyError(f"no known path_type for {fn} — get a sample saved from the app first")
    return int(max(seen, key=seen.get))


def r(v):
    return round(v, 3)


TEMPLATES = json.load(open(os.path.join(HERE, "cok-templates.json"), encoding="utf-8"))  # blank map + one empty plot per kind
PLOT_TEMPLATES = TEMPLATES["plots"]


class Map:
    def __init__(self, template_path=None):
        """A new map: from a saved file's settings, or (no path) the blank map in cok-templates.json."""
        self.d = copy.deepcopy(TEMPLATES["base"]) if template_path is None else json.load(open(template_path, encoding="utf-8"))
        self.d["objects"], self.d["paths"], self.d["deco_labels"] = [], [], []
        self.d["layers"] = {"last_idx": -1, "map_layers": []}
        self.uid = 0

    def next_uid(self):
        self.uid += 1
        return self.uid

    def add_layer(self, name, visible=True):
        idx = self.d["layers"]["last_idx"] + 1
        layer = {"idx": idx, "name": name}
        if not visible:
            layer["is_visible"] = False
        self.d["layers"]["map_layers"].append(layer)
        self.d["layers"]["last_idx"] = idx
        self.d["info"]["map_layers_open"] = True
        return idx

    @staticmethod
    def _layer(o, layer):
        if layer is not None:
            o["assigned_map_layer_idx"] = layer
        return o

    def obj(self, fn, x, z, rot=0.0, scale=1.0, y=0.0, layer=None):
        o = {"filename": WO + fn, "position_x": r(x), "position_y": r(y), "position_z": r(z), "rotation_y": r(rot),
             "scale_x": r(scale), "scale_z": r(scale), "object_type": object_type(fn)}
        self.d["objects"].append(self._layer(o, layer))
        return o

    def label(self, text, x, z, scale=1.35):
        self.d["deco_labels"].append({"filename": "res://Source/Environment/du_deco_text_label.tscn", "position_x": r(x),
                                      "position_y": 0.0, "position_z": r(z), "rotation_y": 0.0, "scale_x": scale,
                                      "scale_z": round(scale * 0.32, 3), "text": text, "assigned_deco_legend_idx": 0})

    def path(self, fn, pts, closed=False, line_fn=None, layer=None, height=None, width=None, extra=None):
        """A path/plot. line_fn = one stretched piece per straight segment (walls, fences, roads)."""
        pts = [(r(x), r(z)) for x, z in pts]
        if closed and pts[0] != pts[-1]:
            pts = pts + [pts[0]]
        segs = list(zip(pts, pts[1:]))
        corners = pts[:-1] if closed else pts
        y = height or 0.0
        p = {"filename": WORLD + fn, "position_x": 0.0, "position_y": 0.0, "position_z": 0.0, "path_type": path_type(fn),
             "main_points": [{"x": x, "z": z} for x, z in pts], "in_out_handles": [],
             "points_objects": [self._layer({"filename": WO + "wo_placeholder.tscn", "position_x": x, "position_y": y, "position_z": z,
                                             "object_type": 1, "assigned_path_point_idx": i}, layer) for i, (x, z) in enumerate(corners)],
             "lines_objects": [], "lines_custom_objects": [], "lines_leaned_points": [], "lines_custom_scales": [width or 1.0] * len(segs),
             "click_and_placing_wo": {"filename": WO + "wo_placeholder_area.tscn", "position_x": pts[0][0], "position_y": 0.0,
                                      "position_z": pts[0][1], "object_type": 113, "uid": self.next_uid(), "assigned_path_area_idx": 33,
                                      "snap_to_grid_position_offset_x": 0.0, "snap_to_grid_position_offset_y": 0.0}}
        for i, (a, b) in enumerate(segs):
            objs = []
            if line_fn:
                dx, dz = b[0] - a[0], b[1] - a[1]
                L = math.hypot(dx, dz)
                o = {"filename": WO + line_fn, "position_x": r((a[0] + b[0]) / 2), "position_y": y, "position_z": r((a[1] + b[1]) / 2),
                     "rotation_y": r(-math.degrees(math.atan2(dz, dx))), "scale_x": r(L), "object_type": object_type(line_fn),
                     "assigned_path_line_idx": i, "custom_data_g_size": L}
                if width:
                    o.update({"scale_z": width, "custom_width": width, "custom_size": r(L)})
                objs.append(self._layer(o, layer))
            p["lines_objects"].append({"objects": objs})
        if closed:
            p["is_closed"] = True
            p["area_objects"] = []
        if height is not None:
            p["height_changing_position_y"] = height
        if width:
            p["width"] = width
        p.update(extra or {})
        self.d["paths"].append(self._layer(p, layer))
        return p

    def plateau(self, pts, texture=1, edge=2, height=2.0, gradient=0.1, layer=None):
        return self.path("Plots/Plateaus/papl_plateau_plateau.tscn", pts, closed=True, layer=layer, height=height,
                         extra={"texture_type": texture, "edge_texture_type": edge, "custom_gradient": gradient})

    def copy_path(self, p, dx, dz, layer=None):
        """Copy a path from a sample map, moved by (dx, dz) and put on a layer (for things too fiddly to build, e.g. stairs)."""
        p = copy.deepcopy(p)

        def move(o):  # children only: their positions are absolute, the path's own position stays 0
            if isinstance(o, dict):
                if "position_x" in o and "position_z" in o:
                    o["position_x"] = r(o["position_x"] + dx)
                    o["position_z"] = r(o["position_z"] + dz)
                if "filename" in o:
                    o.pop("assigned_map_layer_idx", None)
                    self._layer(o, layer)
                for v in o.values():
                    move(v)
            elif isinstance(o, list):
                for v in o:
                    move(v)

        for pt in p["main_points"]:
            pt["x"], pt["z"] = r(pt["x"] + dx), r(pt["z"] + dz)
        for key in ("points_objects", "lines_objects", "lines_custom_objects", "area_objects"):
            move(p.get(key, []))
        p["click_and_placing_wo"]["uid"] = self.next_uid()
        p.pop("assigned_map_layer_idx", None)
        self.d["paths"].append(self._layer(p, layer))
        return p

    def save(self, out):
        self.d["info"]["last_uid"] = self.uid
        json.dump(self.d, open(out, "w", encoding="utf-8"), indent="\t", ensure_ascii=False)


def carve_rock(m, open_area, bounds, rng, layer=None, cell=3.5, base=1.6, tops=0.35, inset=0.6, top_max=1.4):
    """Fill everything in bounds that is not open_area (a shapely geometry) with rock plateaus.

    Rock is cut into irregular chunks (Voronoi cells) so it reads as cracked stone, each a little higher or lower;
    some chunks get a smaller, taller mass on top. Chunks never have holes (plateaus can't).
    """
    from shapely.geometry import MultiPoint, Polygon, box
    from shapely.ops import voronoi_diagram

    x0, z0, x1, z1 = bounds
    rock = box(x0, z0, x1, z1).difference(open_area)
    seeds = MultiPoint([(rng.uniform(x0, x1), rng.uniform(z0, z1)) for _ in range(int((x1 - x0) * (z1 - z0) / cell ** 2))])
    pieces = []
    for c in voronoi_diagram(seeds, envelope=box(x0 - 5, z0 - 5, x1 + 5, z1 + 5)).geoms:
        part = rock.intersection(c)
        pieces += list(getattr(part, "geoms", [part]))

    def no_holes(p):  # split a polygon through each hole until none is left
        if p.geom_type != "Polygon" or p.is_empty:
            return []
        if not p.interiors:
            return [p]
        hx = p.interiors[0].centroid.x
        bx0, bz0, bx1, bz1 = p.bounds
        out = []
        for half in (box(bx0 - 1, bz0 - 1, hx, bz1 + 1), box(hx, bz0 - 1, bx1 + 1, bz1 + 1)):
            part = p.intersection(half)
            for g in getattr(part, "geoms", [part]):
                out += no_holes(g)
        return out

    count = 0
    for piece in pieces:
        for p in no_holes(piece):
            if p.area < 0.05:
                continue
            pts = list(p.simplify(0.005).exterior.coords)
            m.plateau(pts, texture=1 if rng.random() < 0.85 else 14, edge=2, height=round(base + rng.uniform(-0.3, 0.5), 2), layer=layer)
            count += 1
            inner = p.buffer(-inset)
            if not inner.is_empty and inner.area > top_max ** 2 * 0.4 and rng.random() < tops:
                c = inner.representative_point()
                rad = min(top_max, math.sqrt(inner.area) / 2)
                top = Polygon(blob(c.x, c.y, rad, rad * rng.uniform(0.7, 1.2), rng, n=rng.randint(6, 10), wobble=0.3)).intersection(inner)
                if top.geom_type == "Polygon" and not top.is_empty and top.area > top_max ** 2 * 0.1:
                    m.plateau(list(top.exterior.coords), texture=1, edge=2, height=round(base + rng.uniform(0.8, 2.2), 2), layer=layer)
                    count += 1
    return count


def walls(m, rect, doors=(), layer=None, door_layer=None, rng=None, wall="woPathObjects/wo_fence_c.tscn"):
    """Stone walls round a rectangle (x0, z0, x1, z1) with door gaps.

    doors: (side, centre, width) — side 'n' 's' 'e' 'w', centre measured along that side from its west/north end.
    A door object sits in each gap, turned across the wall like in the user's building sample.
    """
    x0, z0, x1, z1 = rect
    sides = {"n": ((x0, z0), (x1, z0)), "s": ((x0, z1), (x1, z1)), "w": ((x0, z0), (x0, z1)), "e": ((x1, z0), (x1, z1))}
    for side, (a, b) in sides.items():
        L = math.hypot(b[0] - a[0], b[1] - a[1])
        ux, uz = (b[0] - a[0]) / L, (b[1] - a[1]) / L
        cuts = sorted((c - w / 2, c + w / 2) for s, c, w in doors if s == side)
        t = 0.0
        for c0, c1 in cuts + [(L, L)]:
            if c0 - t > 0.05:
                m.path("Paths/pa_fence_3.tscn", [(a[0] + ux * t, a[1] + uz * t), (a[0] + ux * c0, a[1] + uz * c0)], line_fn=wall, layer=layer)
            if c1 > c0:
                mid = (c0 + c1) / 2
                ang = -math.degrees(math.atan2(uz, ux)) + 90
                fn = (rng or random).choice(variants("woDecos/woDecosRooms/wo_door_"))
                m.obj(fn, a[0] + ux * mid, a[1] + uz * mid, rot=ang, scale=min(1.0, (c1 - c0) / 0.9), layer=door_layer if door_layer is not None else layer)
            t = c1


def poly_walls(m, pts, doors=(), layer=None, door_layer=None, rng=None, wall="woPathObjects/wo_fence_c.tscn"):
    """Stone walls round any closed outline, with door gaps.

    doors: (x, z, width[, with_door]) — a gap of that width is cut wherever the outline passes within width/2 of (x, z),
    and a door object is placed there, turned across the wall (with_door=False leaves an open archway).
    """
    pts = list(pts)
    if pts[0] != pts[-1]:
        pts.append(pts[0])
    run = []

    def flush():
        clean = [p for i, p in enumerate(run) if i == 0 or math.hypot(p[0] - run[i - 1][0], p[1] - run[i - 1][1]) > 1e-3]
        if len(clean) >= 2:
            m.path("Paths/pa_fence_3.tscn", clean, line_fn=wall, layer=layer)
        run.clear()

    placed = set()
    for a, b in zip(pts, pts[1:]):
        L = math.hypot(b[0] - a[0], b[1] - a[1])
        if L < 1e-6:
            continue
        ux, uz = (b[0] - a[0]) / L, (b[1] - a[1]) / L
        cuts = []
        for i, door in enumerate(doors):
            dx, dz, w = door[:3]
            t = (dx - a[0]) * ux + (dz - a[1]) * uz
            off = abs((dx - a[0]) * uz - (dz - a[1]) * ux)
            if -w / 2 < t < L + w / 2 and off < w / 2:
                cuts.append((max(0.0, t - w / 2), min(L, t + w / 2), i, t))
        cuts.sort()
        if not run:
            run.append(a)
        for c0, c1, i, t in cuts:
            if c0 > 1e-3:
                run.append((a[0] + ux * c0, a[1] + uz * c0))
            flush()
            if i not in placed and 0 <= t <= L and (len(doors[i]) < 4 or doors[i][3]):
                fn = (rng or random).choice(variants("woDecos/woDecosRooms/wo_door_"))
                m.obj(fn, doors[i][0], doors[i][1], rot=-math.degrees(math.atan2(uz, ux)) + 90,
                      scale=min(1.0, doors[i][2] / 0.32), layer=door_layer if door_layer is not None else layer)
                placed.add(i)
            run.append((a[0] + ux * c1, a[1] + uz * c1))
        run.append(b)
    flush()


ROOFS = {  # (path file, line_object_type_idx) -> (roof piece, end pillar) — combinations seen in the user's test_city
    ("tiles", 0): ("woPathObjects/wo_roof_tiles_a.tscn", "woPathObjects/wo_roof_tiles_a_pillar_a.tscn"),
    ("tiles", 1): ("woPathObjects/wo_roof_tiles_b.tscn", "woPathObjects/wo_roof_tiles_a_pillar_a.tscn"),
    ("wooden", 0): ("woPathObjects/wo_roof_wooden_a.tscn", "woPathObjects/wo_roof_wooden_a_pillar_a.tscn"),
    ("wooden", 1): ("woPathObjects/wo_roof_wooden_b.tscn", "woPathObjects/wo_roof_wooden_b_pillar_a.tscn"),
}


def roof(m, a, b, half_width, kind="tiles", variant=0, layer=None, chimney=None, height=0.0):
    """A house seen from above = its roof: ridge from a to b, roof reaching half_width either side (like test_city).

    chimney: None, or (t, side) — t along the ridge 0..1, side 0/1 — placed the way test_city stores them.
    """
    piece, pillar = ROOFS[kind, variant]
    dx, dz = b[0] - a[0], b[1] - a[1]
    L = math.hypot(dx, dz)
    rot = r(-math.degrees(math.atan2(dz, dx)))
    hw = r(half_width)
    p = m.path(f"Paths/PathsRoofs/par_roof_{kind}.tscn", [a, b], layer=layer)
    p["lines_objects"] = [{"objects": [m._layer({
        "filename": WO + piece, "position_x": r((a[0] + b[0]) / 2), "position_y": 0.0, "position_z": r((a[1] + b[1]) / 2),
        "rotation_y": rot, "scale_x": r(L), "scale_z": hw, "object_type": object_type(piece), "assigned_path_line_idx": 0,
        "custom_data_g_size": L, "scale_custom_x": hw}, layer)]}]
    p["lines_custom_scales"] = [hw]
    p["line_object_type_idx"] = variant
    p["area_objects"] = [m._layer({"filename": WO + pillar, "position_x": r(x), "position_y": 0.0, "position_z": r(z),
                                   "rotation_y": r(rot + turn), "scale_z": hw, "object_type": object_type(pillar),
                                   "assigned_path_line_idx": 0, "is_clickable": False, "scale_custom_x": hw}, layer)
                         for (x, z), turn in ((a, 0), (b, 180))]
    if chimney:
        t, side = chimney
        nx, nz = -dz / L, dx / L
        off = half_width * 0.45 * (-1 if side == 0 else 1)
        cx, cz = a[0] + dx * t + nx * off, a[1] + dz * t + nz * off
        obj = m._layer({"filename": WO + "woPathObjects/wo_roof_chimney_a.tscn", "position_x": r(cx), "position_y": 0.0, "position_z": r(cz),
                        "rotation_y": r(rot + (180 if side == 0 else 0)), "scale_x": 1.0, "scale_z": 1.0, "object_type": 85,
                        "assigned_path_line_idx": 0, "is_clickable": False, "custom_layer": 4}, layer)
        p["lines_custom_objects"] = [{"line_idx": 0, "sites": [0, 1], "site_0_objects": [obj] if side == 0 else [],
                                      "site_1_objects": [obj] if side == 1 else []}]
    if height:  # test_city lifts or sinks ~60% of its roofs a little so the town isn't flat
        h = r(height)
        p["height_changing_position_y"] = h
        for o in p["points_objects"] + p["area_objects"] + [x for l in p["lines_objects"] for x in l["objects"]] + \
                [x for s in p["lines_custom_objects"] for k in ("site_0_objects", "site_1_objects") for x in s.get(k, [])]:
            o["position_y"] = h
            o["height_changing_position_y"] = h
    return p


def road(m, pts, width, layer=None, style=23):
    """Road like test_city's (pa_road, style 23 is the most common there). width: one value, or one per segment."""
    widths = width if isinstance(width, (list, tuple)) else None
    p = m.path("Paths/pa_road.tscn", pts, line_fn="woPathObjects/wo_road_a.tscn", width=widths[0] if widths else width, layer=layer,
               extra={"c_o_type": style})
    p["path_type"] = style
    if widths:
        p["lines_custom_scales"] = [r(w) for w in widths]
        for line, w in zip(p["lines_objects"], widths):
            for o in line["objects"]:
                o.update({"scale_z": r(w), "custom_width": r(w)})
    return p


# Turned the way the app's own District plots turn them (test_districts): road_rot = Canvas heading of the road there,
# i.e. -degrees(atan2(dz, dx)).
HUTS = {"merchant": "woBuildings/woHuts/wo_hut_tiles_", "craft": "woBuildings/woHuts/wo_hut_wooden_", "cottage": "woBuildings/woHuts/wo_hut_cottage_"}


def hut(m, kind, x, z, road_rot, rng, layer=None, square=None):
    """A ready-made house (District plot style), square to the road (0/90/180/270° off it)."""
    k = rng.choice((0, 1, 2, 3)) if square is None else square
    return m.obj(rng.choice(variants(HUTS[kind])), x, z, rot=road_rot + 90 * k + rng.uniform(-2, 2), scale=rng.uniform(0.92, 1.08), layer=layer)


def citizen(m, x, z, road_rot, rng, layer=None):
    """Someone walking along the road."""
    return m.obj("woUnits/wo_citizen_a.tscn", x, z, rot=road_rot + 90 + rng.choice((0, 180)) + rng.uniform(-10, 10), scale=rng.uniform(0.78, 0.9), layer=layer)


def bunting(m, x, z, road_rot, rng, layer=None):
    """Flags strung across the road, hung up off the ground like the app's."""
    o = m.obj("woDecos/wo_flag_rope_a.tscn", x, z, rot=road_rot + 90 + rng.uniform(-25, 25), scale=1.0, y=0.8, layer=layer)
    o["height_changing_position_y"] = 0.8
    return o


def roadside(m, prefix, x, z, road_rot, rng, along=False, layer=None):
    """A cart (across the road's line, like the app parks them) or a stall/crate (along it) at the road's edge."""
    rot = road_rot + (0 if along else 90) + rng.choice((0, 180)) + rng.uniform(-6, 6)
    return m.obj(rng.choice(variants(prefix)), x, z, rot=rot, scale=rng.uniform(0.8, 0.9), layer=layer)


# Plot-tool settings the app saves per plot (seen in the user's twinhold-level1-filled, 2026-10-24) — the panel's
# District Design switches: Roads / Buildings / Nature / Busy Roads / Roadside Decorations, and the design itself.
# Density / Populate Border off / Layout Rotation seen on Field plots (user's twinhold, 2026-10-24); a Lake's own
# colour is water_color + is_individual.
PLOT_SETTINGS = ("layout_type", "roads", "buildings", "nature", "busy_roads", "roadside_deco",
                 "custom_density", "has_no_border", "layout_rotation", "water_color", "is_individual")

# Presets so the user only presses "Populate Plot". Pick by place, then by quarter.
PRESETS = {
    "cave": {"nature": False},  # no trees under the mountain
    "outdoor": {"nature": True},
    "market": {"layout_type": 4, "roads": True, "buildings": True, "busy_roads": True, "roadside_deco": True},
    "residential": {"layout_type": 4, "roads": True, "buildings": True, "busy_roads": False, "roadside_deco": True},
    "workshops": {"layout_type": 4, "roads": True, "buildings": True, "busy_roads": True, "roadside_deco": True},
    "outskirts": {"layout_type": 3, "roads": True, "buildings": True, "busy_roads": False, "roadside_deco": False},
}


def preset(place, quarter):
    """Settings for a plot: the quarter's preset, then the place's (cave → no nature) on top."""
    return {**PRESETS.get(quarter, {}), **PRESETS.get(place, {})}


def district_plot(m, template, pts, layer=None, settings=None):
    """An empty Plot-tool plot (district, market, campsite, cottages, field, Castle surface…) on outline pts, ready for
    the user to fill in the app.

    template: that plot as the app saved it (test_districts / test_city) — its own fields are kept, its contents
    dropped. The app doesn't build the contents on load; the user presses Populate Plot. A raised plot (Castle surface,
    2.35) keeps its height and its corner pieces (towers).
    settings: PLOT_SETTINGS values to preset (see preset()) — only districts are known to have them.
    """
    p = copy.deepcopy(template)
    pts = [(r(x), r(z)) for x, z in pts]
    if pts[0] != pts[-1]:
        pts.append(pts[0])
    y = template.get("height_changing_position_y") if "PlotsLands" in template["filename"] else None
    p.pop("height_changing_position_y", None)
    corner = template["points_objects"][0] if template.get("points_objects") else {"filename": WO + "wo_placeholder.tscn", "object_type": 1}
    p["main_points"] = [{"x": x, "z": z} for x, z in pts]
    p["in_out_handles"] = []
    p["points_objects"] = []
    for i, (x, z) in enumerate(pts[:-1]):
        o = {"filename": corner["filename"], "position_x": x, "position_y": y or 0.0, "position_z": z, "object_type": corner["object_type"],
             "assigned_path_point_idx": i}
        if y:
            o["height_changing_position_y"] = y
        p["points_objects"].append(m._layer(o, layer))
    p["lines_objects"] = [{"objects": []} for _ in pts[:-1]]
    p["lines_custom_objects"], p["lines_leaned_points"] = [], []
    p["lines_custom_scales"] = [1.0] * (len(pts) - 1)
    p["area_objects"] = []
    if "sub_paths" in template:
        p["sub_paths"] = []
    p["click_and_placing_wo"] = {"filename": WO + "wo_placeholder_area.tscn", "position_x": pts[0][0], "position_y": y or 0.0, "position_z": pts[0][1],
                                 "object_type": 113, "uid": m.next_uid(), "assigned_path_area_idx": 33,
                                 "snap_to_grid_position_offset_x": 0.0, "snap_to_grid_position_offset_y": 0.0}
    if y:
        p["height_changing_position_y"] = y
        p["click_and_placing_wo"]["height_changing_position_y"] = y
    p.pop("assigned_map_layer_idx", None)
    for k, v in (settings or {}).items():
        if k not in PLOT_SETTINGS:
            raise KeyError(f"{k} isn't a plot setting seen in a saved file — get a sample first")
        p[k] = v
    m.d["paths"].append(m._layer(p, layer))
    return p


def floor(m, pts, layer=None):
    """Flat paved floor (the user's building sample: plateau texture 2, edge 1, no height)."""
    p = m.plateau(pts, texture=2, edge=1, height=None, layer=layer)
    p.pop("custom_gradient", None)
    return p


def blob(cx, cz, rx, rz, rng, n=9, wobble=0.25):
    """Irregular closed outline around a centre — rock masses, ponds."""
    pts = []
    for k in range(n):
        a = 2 * math.pi * k / n + rng.uniform(-0.15, 0.15)
        f = 1 + rng.uniform(-wobble, wobble)
        pts.append((cx + math.cos(a) * rx * f, cz + math.sin(a) * rz * f))
    return pts


def scatter(rng, n, inside, min_gap=0.0, tries=4000):
    """n random points inside(x, z) -> bool, at least min_gap apart."""
    out = []
    for _ in range(tries):
        if len(out) >= n:
            break
        x, z = rng.uniform(*inside.xr), rng.uniform(*inside.zr)
        if inside(x, z) and all(math.hypot(x - a, z - b) >= min_gap for a, b in out):
            out.append((x, z))
    return out


class Region:
    def __init__(self, test, xr, zr):
        self.test, self.xr, self.zr = test, xr, zr

    def __call__(self, x, z):
        return self.test(x, z)


__all__ = ["Map", "blob", "scatter", "Region", "random", "object_type", "path_type", "variants", "carve_rock", "walls", "poly_walls", "floor", "roof", "road", "hut", "citizen", "bunting",
           "roadside", "HUTS", "district_plot", "preset", "PRESETS", "PLOT_SETTINGS", "PLOT_TEMPLATES"]
