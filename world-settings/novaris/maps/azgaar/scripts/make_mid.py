"""Downscale the 16200x10800 occidentalavian Exandria map to the 3240x2160 working copy the other scripts read,
with Wildemount / Eiselcross / Shattered Teeth moved east (east_shift.py)."""
import sys
import numpy as np
from PIL import Image
from east_shift import shift_image

Image.MAX_IMAGE_PIXELS = None
src, out = sys.argv[1], sys.argv[2]
mid = Image.open(src).convert("RGB").resize((3240, 2160), Image.BOX)
Image.fromarray(shift_image(np.asarray(mid))).save(out)
