"""Find the DM-map → player-map transform for each scene pair by image feature matching (SIFT + RANSAC),
then map the DM pins onto the player scene. Writes fixed-pins.json + check images (red dots on the player map).

Why: Plutonium's room pins on the *player* maps were converted from the DM map with a wrong scale/offset
(e.g. Xanathar Guild Hideout pins sat off the right edge). The DM-map pins are right, so they are the source.

Usage: python -I register_player_pins.py <work dir>
  <work dir>/pairs.json   [{player:{name,key,w,h,src}, dm:{...}, dmPins:[{text,x,y}]}] exported from the world DB
  <work dir>/imgs/        the map images, named "<WDH|WDMM|WDMMC>_<file>" (downloaded from each scene's src)
The result is post-filtered to pins inside the player map and saved as
Data/assets/campaigns/gilded-city-mad-depths/journal/gilded-city-player-pins.json for Link-Gilded-City-Pins.
"""
import json
import os
import sys

import cv2
import numpy as np

S = sys.argv[1]
pairs = json.load(open(os.path.join(S, "pairs.json"), encoding="utf8"))
img_path = lambda u: os.path.join(S, "imgs", u.split("/adventure/")[1].replace("/", "_"))
MAX = 2400
sift = cv2.SIFT_create(nfeatures=20000)
out, report = [], []
os.makedirs(os.path.join(S, "check"), exist_ok=True)


def load(u):
    im = cv2.imread(img_path(u), cv2.IMREAD_GRAYSCALE)
    if im is None:  # webp fallback through Pillow
        from PIL import Image
        im = np.array(Image.open(img_path(u)).convert("L"))
    f = min(1.0, MAX / max(im.shape))
    return im, cv2.resize(im, None, fx=f, fy=f, interpolation=cv2.INTER_AREA), f


for p in pairs:
    pl, dm = p["player"], p["dm"]
    pim, ps, pf = load(pl["src"])
    dim, ds, df = load(dm["src"])
    kd, dd = sift.detectAndCompute(ds, None)
    kp, dp = sift.detectAndCompute(ps, None)
    matches = cv2.BFMatcher().knnMatch(dd, dp, k=2)
    good = [m for m, n in (x for x in matches if len(x) == 2) if m.distance < 0.75 * n.distance]
    src = np.float32([kd[m.queryIdx].pt for m in good]) / df   # DM full-res px
    dst = np.float32([kp[m.trainIdx].pt for m in good]) / pf   # player full-res px
    M, inl = cv2.estimateAffinePartial2D(src, dst, method=cv2.RANSAC, ransacReprojThreshold=6, maxIters=20000)
    n_in = int(inl.sum()) if inl is not None else 0
    scale = float(np.hypot(M[0, 0], M[1, 0])) if M is not None else 0
    rot = float(np.degrees(np.arctan2(M[1, 0], M[0, 0]))) if M is not None else 0
    report.append(f"{pl['name'][:30]:30} matches {len(good):5} inliers {n_in:5} scale {scale:.3f} rot {rot:+.2f}")
    if M is None or n_in < 30:
        continue
    # scene px ↔ image px (the background fills the scene rect)
    dsx, dsy = dim.shape[1] / dm["w"], dim.shape[0] / dm["h"]
    psx, psy = pl["w"] / pim.shape[1], pl["h"] / pim.shape[0]
    pins = []
    for pin in p["dmPins"]:
        x, y = pin["x"] * dsx, pin["y"] * dsy
        X, Y = M @ np.array([x, y, 1.0])
        pins.append({"text": pin["text"], "x": round(X * psx), "y": round(Y * psy)})
    out.append({"key": pl["key"], "name": pl["name"], "pins": pins, "inliers": n_in})
    # check image: player map + moved pins (red)
    vis = cv2.cvtColor(pim, cv2.COLOR_GRAY2BGR)
    for pin in pins:
        cx, cy = int(pin["x"] / psx), int(pin["y"] / psy)
        cv2.circle(vis, (cx, cy), max(6, pim.shape[1] // 150), (0, 0, 255), -1)
        cv2.putText(vis, pin["text"].split(".")[0], (cx + 8, cy - 8), cv2.FONT_HERSHEY_SIMPLEX,
                    max(0.5, pim.shape[1] / 2500), (0, 0, 255), 2)
    f = min(1.0, 1600 / max(vis.shape[:2]))
    cv2.imwrite(os.path.join(S, "check", pl["name"].replace("·", "-").replace("'", "") + ".jpg"),
                cv2.resize(vis, None, fx=f, fy=f, interpolation=cv2.INTER_AREA))

json.dump(out, open(os.path.join(S, "fixed-pins.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
print("\n".join(report))
print(len(out), "maps fixed")
