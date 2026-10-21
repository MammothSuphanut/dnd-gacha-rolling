"""Grid review: cut the original Exandria map and our Azgaar export into a COLS x ROWS grid and
render side-by-side comparison images (one overview + one image per cell).

usage:
  python scripts/grid_compare.py overview            -> exports/grid/overview.png (+ prints land % per cell)
  python scripts/grid_compare.py cell B2 [B3 ...]    -> exports/grid/cell-B2.png

Columns are letters A.. (west -> east), rows are numbers 1.. (north -> south).
Both maps cover the same area, so cell B2 is the same land in both images.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from east_shift import shift_image

Image.MAX_IMAGE_PIXELS = None
ROOT = Path(__file__).resolve().parent.parent
ORIGINAL = Path("D:/FoundryVTT_Data/Data/worlds/astral-nexus-constellation-protocol/Campaigns/"
                "00 Gerneral Campaigns Data/scenes/Exandria/Exandria - Speculative 2024 (high res).png")
ATLAS = ROOT / "exports/novaris-atlas.png"
HEIGHTMAP = ROOT / "heightmaps/exandria.png"
OUT = ROOT / "exports/grid"
CACHE = OUT / "_original-5400-shifted.png"  # original at 3x Azgaar size with the east moved (east_shift.py); 16200 px is slow

W, H = 1800, 1200  # Azgaar map space
COLS, ROWS = 18, 12  # 100 x 100 Azgaar px per cell
CW, CH = W // COLS, H // ROWS
CELL_PX = 1200  # each half of a cell comparison image


def font(size):
    for f in ("LeelaUIb.ttf", "tahomabd.ttf", "arialbd.ttf", "DejaVuSans-Bold.ttf"):  # Leelawadee/Tahoma: Thai glyphs
        try:
            return ImageFont.truetype(f, size)
        except OSError:
            pass
    return ImageFont.load_default()


def original():
    if not CACHE.exists():
        OUT.mkdir(parents=True, exist_ok=True)
        o = Image.open(ORIGINAL).convert("RGB").resize((W * 3, H * 3), Image.BOX)
        Image.fromarray(shift_image(np.asarray(o))).save(CACHE)
    return Image.open(CACHE).convert("RGB")


def name(c, r):
    return f"{chr(65 + c)}{r + 1}"


def parse(cell):
    return ord(cell[0].upper()) - 65, int(cell[1:]) - 1


def land_share():
    h = np.asarray(Image.open(HEIGHTMAP).convert("RGB"))[:, :, 0] / 255 >= 0.2
    return {name(c, r): h[r * CH:(r + 1) * CH, c * CW:(c + 1) * CW].mean()
            for r in range(ROWS) for c in range(COLS)}


def grid(img, share=None):
    d = ImageDraw.Draw(img)
    k = img.width / W
    f = font(round(16 * k))
    for c in range(1, COLS):
        d.line([(c * CW * k, 0), (c * CW * k, img.height)], fill=(255, 0, 0), width=max(2, round(2 * k)))
    for r in range(1, ROWS):
        d.line([(0, r * CH * k), (img.width, r * CH * k)], fill=(255, 0, 0), width=max(2, round(2 * k)))
    for r in range(ROWS):
        for c in range(COLS):
            n = name(c, r)
            skip = share is not None and share[n] < 0.01
            d.text((c * CW * k + 8, r * CH * k + 4), n,
                   fill=(120, 120, 120) if skip else (255, 0, 0), font=f, stroke_width=3, stroke_fill="white")
    return img


def overview():
    share = land_share()
    size = (W, H)
    a = grid(original().resize(size, Image.LANCZOS), share)
    b = grid(Image.open(ATLAS).convert("RGB").resize(size, Image.LANCZOS), share)
    out = Image.new("RGB", (W, H * 2 + 60), "white")
    d = ImageDraw.Draw(out)
    d.text((10, 10), "ORIGINAL (top)  vs  EXANDRIA+ AZGAAR (bottom)", fill="black", font=font(32))
    out.paste(a, (0, 60))
    out.paste(b, (0, 60 + H))
    OUT.mkdir(parents=True, exist_ok=True)
    out.save(OUT / "overview.png")
    for n, s in share.items():
        print(f"{n}: land {s:.0%}")


def cell(n):
    c, r = parse(n)
    compare(n, (c * CW, r * CH, (c + 1) * CW, (r + 1) * CH), helper=False)


def compare(n, box, helper=True):
    """original | ours for one box. The review image (helper=False) shows only the cell, labelled in Thai;
    zoom crops (helper=True) add a magenta grid every 50 (or 10) Azgaar px for checking positions"""
    o = original()
    a = Image.open(ATLAS).convert("RGB")
    ka, ko = a.width / W, o.width / W
    pw = CELL_PX
    ph = round(CELL_PX * (box[3] - box[1]) / (box[2] - box[0]))
    own = ROOT / f"exports/ours-{n.lower()}.png"  # sharp per-cell export from Azgaar (see README), else a crop of the atlas
    pa = (Image.open(own).convert("RGB") if own.exists() and not helper else a.crop(tuple(round(v * ka) for v in box))).resize((pw, ph), Image.LANCZOS)
    po = o.crop(tuple(round(v * ko) for v in box)).resize((pw, ph), Image.LANCZOS)
    top = 80 if not helper else 60
    out = Image.new("RGB", (pw * 2 + 20, ph + top), "white")
    d = ImageDraw.Draw(out)
    if helper:
        f = font(30)
        d.text((10, 12), f"{n}  ORIGINAL   (Azgaar x {box[0]}-{box[2]}, y {box[1]}-{box[3]})", fill="black", font=f)
        d.text((pw + 30, 12), f"{n}  EXANDRIA+ AZGAAR", fill="black", font=f)
    else:
        f = font(48)
        d.text((pw / 2, top / 2), f"{n} ต้นฉบับ", fill="black", font=f, anchor="mm")
        d.text((pw * 1.5 + 20, top / 2), f"{n} ของเรา", fill="black", font=f, anchor="mm")
    step = 50 if box[2] - box[0] > 100 else 10  # helper grid in Azgaar px for comparing positions
    k = pw / (box[2] - box[0])
    for i, p in enumerate((po, pa)):
        if helper:
            dp = ImageDraw.Draw(p)
            for x in range((box[0] // step + 1) * step, box[2], step):
                dp.line([((x - box[0]) * k, 0), ((x - box[0]) * k, ph)], fill=(255, 0, 255), width=1)
            for y in range((box[1] // step + 1) * step, box[3], step):
                dp.line([(0, (y - box[1]) * k), (pw, (y - box[1]) * k)], fill=(255, 0, 255), width=1)
        out.paste(p, (i * (pw + 20), top))
    out.save(OUT / f"cell-{n}.png")
    print(OUT / f"cell-{n}.png")


def coast(n, box, hm=HEIGHTMAP):
    """original crop with the heightmap's coastline (land >= 51) drawn in red: checks the heightmap before Azgaar"""
    o = original()
    ko = o.width / W
    pw = CELL_PX
    ph = round(CELL_PX * (box[3] - box[1]) / (box[2] - box[0]))
    img = o.crop(tuple(round(v * ko) for v in box)).resize((pw, ph), Image.LANCZOS)
    h = np.asarray(Image.open(hm).convert("RGB"))[box[1]:box[3], box[0]:box[2], 0] >= 51
    m = np.asarray(Image.fromarray(h.astype(np.uint8) * 255).resize((pw, ph), Image.NEAREST)) > 0
    edge = m ^ np.roll(m, 1, 0) | m ^ np.roll(m, 1, 1)
    a = np.asarray(img).copy()
    edge[0, :] = edge[:, 0] = False
    a[edge] = (255, 0, 0)
    Image.fromarray(a).save(OUT / f"coast-{n}.png")
    print(OUT / f"coast-{n}.png")


if __name__ == "__main__":
    if sys.argv[1] == "coast":  # coast NAME x0 y0 x1 y1 [heightmap.png]
        coast(sys.argv[2], tuple(int(v) for v in sys.argv[3:7]), *sys.argv[7:8])
        sys.exit()
    if sys.argv[1] == "overview":
        overview()
    elif sys.argv[1] == "zoom":  # zoom NAME x0 y0 x1 y1 (Azgaar px)
        compare(sys.argv[2], tuple(int(v) for v in sys.argv[3:7]))
    else:
        for n in sys.argv[2:]:
            cell(n)
