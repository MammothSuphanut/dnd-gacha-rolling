"""Blow the saved Novaris v2 map (10800x7200, with the user's edits) back up to 16200x10800 for export.

Wonderdraft cannot save a map this big (wdcommon.SAVE_LIMIT), so the 16k file is for Export only:
open it, Export at 1x (16200x10800 = the Foundry scene 'Novaris'), close without saving.
Labels, symbols and paths are drawn sharp at the new size; the painted images (mask/ground/water_tint)
are upscaled, so coastlines and colours stay as soft as the 10800 save.

Run:  python tools/wonderdraft/export_16k.py [in.wonderdraft_map] [out.wonderdraft_map]
"""
import os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import wdmap
from wdcommon import rescale

SRC = r'D:/Wonderdraft Map/novaris-world-v2.wonderdraft_map'
OUT = r'D:/Wonderdraft Map/novaris-world-v2-export16k.wonderdraft_map'
SIZE = 16200

if __name__ == '__main__':
    args = sys.argv[1:]
    src = args[0] if args else SRC
    out = args[1] if len(args) > 1 else OUT
    if os.path.normcase(os.path.abspath(src)) == os.path.normcase(os.path.abspath(out)):
        sys.exit('refusing to overwrite the source map: ' + out)
    m = wdmap.load(src)
    k = SIZE / m['map_width']
    n = (len(m['symbols']), len(m['labels']), len(m['paths']))
    m = rescale(m, k)
    assert (len(m['symbols']), len(m['labels']), len(m['paths'])) == n
    wdmap.save_stream(out, m)
    print('wrote', out, '%dx%d' % (m['map_width'], m['map_height']), '%d symbols %d labels %d paths' % n)
    print('Export only: Wonderdraft cannot save a map this big (saving writes an empty file).')
