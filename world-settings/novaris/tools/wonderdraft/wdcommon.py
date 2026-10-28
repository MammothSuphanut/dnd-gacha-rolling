"""Shared pieces for building Wonderdraft maps: stock sprites/themes from Wonderdraft.pck,
symbol/label/path records, the land mask image and the final map dict.

The map dict layout comes from a map saved by Wonderdraft itself (TEMPLATE); see wdmap.py
for the file format.
"""
import io, json, re, struct
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

import wdmap
from wdmap import Vec2, Color, Typed

Image.MAX_IMAGE_PIXELS = None
PCK = r'D:/Wonderdraft/Wonderdraft.pck'
TEMPLATE = r'D:/Wonderdraft Map/test.wonderdraft_map'

# ---------- Wonderdraft package (sprite metadata, images, themes, fonts) ----------
class Pck:
    def __init__(self, path):
        self.f = open(path, 'rb'); f = self.f
        f.read(20); f.read(64)
        n = struct.unpack('<I', f.read(4))[0]; self.ents = {}
        for _ in range(n):
            l = struct.unpack('<I', f.read(4))[0]; p = f.read(l).rstrip(b'\0').decode()
            off, sz = struct.unpack('<QQ', f.read(16)); f.read(16); self.ents[p] = (off, sz)
    def read(self, p):
        off, sz = self.ents[p]; self.f.seek(off); return self.f.read(sz)

pck = Pck(PCK)
_meta, _img = {}, {}

def sprite(tex):
    """tex = 'res://sprites/<cat>/<set>/<name>' -> (meta dict, PIL image)."""
    folder, name = tex.rsplit('/', 1)
    if folder not in _meta:
        _meta[folder] = json.loads(pck.read(folder + '/.wonderdraft_symbols'))
    m = _meta[folder]
    m = m.get(name, m) if 'radius' not in m else m
    if tex not in _img:
        _img[tex] = Image.open(io.BytesIO(pck.read(tex + '.wonderdraft_image'))).convert('RGBA')
    return m, _img[tex]

def set_files(folder):
    """all sprites of a stock set, e.g. set_files('res://sprites/mountains/inked_hills')"""
    pre = folder + '/'
    return sorted(p[:-len('.wonderdraft_image')] for p in pck.ents
                  if p.startswith(pre) and p.endswith('.wonderdraft_image') and '/' not in p[len(pre):])

def _color(s):
    return Color(*[float(v) for v in s.split(',')])

def builtin_theme(name, base):
    """A stock theme (res://themes/<name>.wonderdraft_theme, JSON) merged over a saved map's theme dict."""
    t = json.loads(pck.read('res://themes/%s.wonderdraft_theme' % name))
    out = dict(base)
    for k, v in t.items():
        if k == 'label_presets':
            out[k] = {n: {pk: (_color(pv) if 'color' in pk else float(pv) if isinstance(pv, (int, float)) else pv)
                          for pk, pv in p.items()} for n, p in v.items()}
        elif k in ('ground_colors', 'water_colors', 'symbol_custom_colors'):
            out[k] = [_color(c) for c in v]
        elif isinstance(v, str) and k.endswith('color'):
            out[k] = _color(v)
        elif k == 'coastline_style':
            out[k] = int(v)
        elif isinstance(v, (int, float)) and not isinstance(v, bool):
            out[k] = float(v)
        else:
            out[k] = v
    return out

# ---------- records ----------
# custom_colors sprites (the "Custom Colors" set) tint their red/green/blue channels with three colours
MARKER_COLORS = [Color(0.08, 0.08, 0.09, 1.0), Color(0.0, 0.0, 0.0, 1.0), Color(0.95, 0.93, 0.87, 0.9)]

def symbol(tex, x, y, scale, kind, mirror=False, sample=None, custom_colors=MARKER_COLORS):
    """kind: 'symbol' | 'mountain' | 'tree'. sample = ground colour for sample_color sprites."""
    tex = tex if tex.startswith('res://') else 'res://sprites/' + tex
    m, _ = sprite(tex)
    mode = m.get('draw_mode')
    custom = mode in ('custom_colors', 'custom_colors_2')
    return {
        'texture': tex, 'position': Vec2(x, y), 'rotation': 0.0, 'scale': Vec2(scale, scale),
        'z_index': 0, 'offset': Vec2(float(m['offset_x']), float(m['offset_y'])),
        'radius': float(m['radius']), 'type': kind, 'mirror': mirror, 'outline_width': 0,
        'outline_color': Color(1.0, 1.0, 1.0, 1.0),
        'sample': sample if (mode == 'sample_color' or kind == 'tree') else None,
        'custom_colors': list(custom_colors) if custom else None,
        'custom_color_mode': (2 if mode == 'custom_colors_2' else 1) if custom else None,
    }

def label(text, x, y, font, size, color, outline, outline_size=3, spacing=0):
    return {'position': Vec2(x, y), 'rotation': 0.0, 'text': text, 'font': font, 'size': int(size),
            'color': color, 'outline_size': outline_size, 'outline_color': outline, 'glow_size': 0,
            'glow_color': Color(1.0, 1.0, 1.0, 1.0), 'align': 1, 'curve': 0.0,
            'extra_spacing_char': spacing, 'z_index': 0}

def var2str_points(pts):
    return '[ ' + ', '.join('Vector2( %g, %g )' % (round(x, 3), round(y, 3)) for x, y in pts) + ' ]'

def path(pts, color, style, width, roughness=0.25, seed=0):
    return {'position': Vec2(0.0, 0.0), 'points': var2str_points(pts), 'color': color,
            'style': 'res://textures/paths/' + style, 'width': float(width), 'roughness': roughness,
            'noise_seed': seed, 'z_index': 0, 'straight': False}

# ---------- images ----------
def upscale(mask, W, H, blur=1.5):
    """bool mask -> soft 0..1 coverage at W x H"""
    f = Image.fromarray((mask * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(blur))
    f = np.asarray(f.resize((W, H), Image.BILINEAR)).astype(float) / 255
    return np.clip((f - 0.5) * 3 + 0.5, 0, 1)

def land_mask_rgba(alpha, fresh):
    """Wonderdraft 'mask': alpha = land, red = freshwater (rivers/lakes), rgb 1 elsewhere on land."""
    H, W = alpha.shape
    mask = np.zeros((H, W, 4), np.uint8)
    a8 = (alpha * 255).round().astype(np.uint8)
    mask[..., 3] = a8; mask[..., 0:3] = (a8 > 0)[..., None]
    mask[..., 0] = np.maximum(mask[..., 0], (fresh * 255).round().astype(np.uint8) * (a8 > 0))
    return mask

def assemble(tpl, W, H, theme, mask, symbols, labels, paths, ground=None):
    """Full map dict, keeping the template's packs, frame, layers and image object layout.
    mask/ground: H x W x 4 uint8 arrays, or memoryviews of them (big maps: no copy, use wdmap.save_stream)."""
    def image(rgba):
        cls, props = tpl['mask'].v
        data = rgba if isinstance(rgba, (bytes, memoryview)) else rgba.tobytes()
        props = [(k, dict(v, width=W, height=H, data=Typed(20, data)) if k == 'data' else v) for k, v in props]
        return Typed(17, (cls, props))
    blank = memoryview(np.zeros((H, W, 4), np.uint8)).cast('B')
    ground = blank if ground is None else ground
    m = dict(tpl)
    m.update({
        'map_width': float(W), 'map_height': float(H), 'theme': theme,
        'windroses': [], 'paths': paths, 'territories': {'territories': []},
        'symbols': sorted(symbols, key=lambda s: s['position'][1]), 'labels': labels, 'boxes': [],
        'mask': image(mask), 'ground': image(ground), 'water_tint': image(blank),
        'trace': None, 'grid': None, 'scale': None,
    })
    return m

# ---------- preview (rough, for checking placement without opening Wonderdraft) ----------
FONTS = {'Cinzel Decorative': 'fonts/Cinzel Decorative.ttf', 'IM FELL DW Pica': 'fonts/IM Fell DW Pica.ttf',
         'IM FELL English Italic': 'fonts/IM Fell English Italic.ttf'}

_fonts = {}
def text_box(text, font, size, spacing=0):
    """(width, height) of a label in map px, measured with the font Wonderdraft draws it in."""
    key = (font, size)
    if key not in _fonts:
        _fonts[key] = ImageFont.truetype(io.BytesIO(pck.read('res://' + FONTS[font])), size)
    lines = text.split('\n')
    w = max(_fonts[key].getlength(t) + spacing * max(0, len(t) - 1) for t in lines)
    return w, size * 1.15 * len(lines)

def preview(m, alpha, fresh, out, sea=(0.66, 0.73, 0.74), ground=(0.93, 0.94, 0.95), scale=1.0, ground_img=None):
    """Draw land, freshwater, paths, symbols and labels; scale < 1 renders a smaller image.
    alpha/fresh: 0..1 floats or uint8; ground_img: optional PIL image of the painted ground colours."""
    W, H = int(m['map_width'] * scale), int(m['map_height'] * scale)
    u8 = lambda a: a if a.dtype == np.uint8 else (np.clip(a, 0, 1) * 255).astype('uint8')
    alpha = np.asarray(Image.fromarray(u8(alpha)).resize((W, H), Image.BILINEAR)) / 255
    fresh = np.asarray(Image.fromarray(u8(fresh)).resize((W, H), Image.BILINEAR)) / 255
    a = np.clip(alpha - fresh, 0, 1)[..., None]
    g = np.asarray(ground_img.convert('RGB').resize((W, H), Image.BILINEAR)) if ground_img else np.array(ground) * 255
    img = Image.fromarray((np.array(sea) * 255 * (1 - a) + g * a).astype('uint8')).convert('RGBA')
    edge = Image.fromarray(((a[..., 0] > 0.5) * 255).astype('uint8')).filter(ImageFilter.FIND_EDGES)
    img.paste(Image.new('RGBA', img.size, (43, 48, 58, 255)), mask=edge)
    d = ImageDraw.Draw(img)
    for p in m['paths']:
        pts = [(float(x) * scale, float(y) * scale)
               for x, y in re.findall(r'Vector2\(\s*([-\d.e]+),\s*([-\d.e]+)\s*\)', p['points'])]
        c = tuple(int(v * 255) for v in p['color'])
        w = max(1, int(p['width'] * scale))
        if 'outlined' in p['style']: d.line(pts, fill=(43, 48, 58, 255), width=w + 4)
        d.line(pts, fill=c, width=w)
    for s in m['symbols']:
        _, sp = sprite(s['texture']); sc = s['scale'][0] * scale
        sp = sp.resize((max(1, round(sp.width * sc)), max(1, round(sp.height * sc))), Image.LANCZOS)
        if s['mirror']: sp = sp.transpose(Image.FLIP_LEFT_RIGHT)
        if s['custom_colors']:
            arr = np.asarray(sp).astype(float) / 255; cc = np.array([c[:3] for c in s['custom_colors']])
            w = arr[..., :3]; tot = w.sum(-1, keepdims=True) + 1e-6
            sp = Image.fromarray((np.dstack([(w / tot) @ cc, arr[..., 3:]]) * 255).astype('uint8'))
        elif s['sample'] is not None:  # sample_color sprites: white fill area tinted by ground
            arr = np.asarray(sp).astype(float); arr[..., :3] *= np.array(s['sample'][:3]); sp = Image.fromarray(arr.astype('uint8'))
        x = s['position'][0] * scale + s['offset'][0] * sc - sp.width / 2
        y = s['position'][1] * scale + s['offset'][1] * sc - sp.height / 2
        img.alpha_composite(sp, (int(x), int(y)))
    fonts = {}
    for l in m['labels']:
        size = max(4, int(l['size'] * scale))
        key = (l['font'], size)
        if key not in fonts:
            fonts[key] = ImageFont.truetype(io.BytesIO(pck.read('res://' + FONTS[l['font']])), size)
        c = tuple(int(v * 255) for v in l['color']); oc = tuple(int(v * 255) for v in l['outline_color'])
        d.multiline_text((l['position'][0] * scale, l['position'][1] * scale), l['text'], font=fonts[key], fill=c,
                         anchor='mm', align='center', stroke_width=max(0, int(l['outline_size'] * scale)), stroke_fill=oc)
    img.convert('RGB').save(out)
