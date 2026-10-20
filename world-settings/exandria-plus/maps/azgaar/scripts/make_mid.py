"""Downscale the 16200x10800 occidentalavian Exandria map to the 3240x2160 working copy the other scripts read."""
import sys
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
src, out = sys.argv[1], sys.argv[2]
Image.open(src).convert("RGB").resize((3240, 2160), Image.BOX).save(out)
