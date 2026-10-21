"""Novaris moves Wildemount, Eiselcross and the Shattered Teeth SHIFT Azgaar px east of where the source map
draws them, so the strait to Tal'Dorei is ~31 px (~1,350 mi) instead of ~6 px (~280 mi).

make_mid.py applies the shift to the working copy every other script reads, so their outputs and the hand-placed
coords in them are all in the shifted frame. LINE is a sea path between the two sides (source frame, Azgaar coords):
everything east of it moves.
"""
import numpy as np

SHIFT = 25
LINE = [(0, 1040), (240, 1030), (300, 1000), (320, 1000), (336, 1011), (344, 1031), (360, 1029), (364, 1035),
        (368, 1040), (372, 1057), (440, 1056), (470, 1065), (1200, 1080)]  # (y, x)


def line_x(y):
    ys, xs = zip(*LINE)
    return np.interp(y, ys, xs)


def is_east(x, y):
    """a point in the source frame"""
    return x > line_x(y)


def shift_point(x, y):
    return (x + SHIFT, y) if is_east(x, y) else (x, y)


def shift_image(a):
    """shift an image array covering the whole 1800x1200 map (any resolution) in the source frame. The strip
    left open at the line is filled with the sea colour at the line (median of nearby rows: skips grid lines)"""
    a = np.asarray(a)
    H, W = a.shape[:2]
    k = W / 1800
    s = round(SHIFT * k)
    out = a.copy()
    for y in range(H):
        L = int(round(line_x(y / k) * k))
        out[y, L + s:] = a[y, L:W - s]
        out[y, L:L + s] = np.median(a[max(0, y - 6):y + 7, L], axis=0).astype(a.dtype)
    return out
