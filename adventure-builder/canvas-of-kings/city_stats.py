"""Measure a Canvas of Kings city map: streets, houses (roofs), props, plots, density — numbers in feet.

    python city_stats.py <map.mommap>

Used to write CITY-COMPOSITION.md from the user's test_city.
"""
import json,math,collections,statistics as st,sys
from shapely.geometry import LineString,Polygon,Point
from shapely.ops import unary_union
from shapely.strtree import STRtree
c=json.load(open(sys.argv[1],encoding='utf-8'))
FT=1/0.075
def q(xs,ps=(10,50,90)):
    xs=sorted(xs); return [round(xs[min(len(xs)-1,int(len(xs)*p/100))]*FT,1) for p in ps] if xs else []
paths=c['paths']; objs=c['objects']
fn=lambda p:p['filename'].split('/')[-1].replace('.tscn','')
roads=[p for p in paths if fn(p)=='pa_road' and len(p['main_points'])>1]
print('ROADS',len(roads))
by=collections.defaultdict(list)
for p in roads:
    L=LineString([(a['x'],a['z']) for a in p['main_points']]).length
    by[p['path_type']].append((p.get('width',1),L,len(p['main_points']),len(p['in_out_handles'])))
for t,v in sorted(by.items()):
    print(f" style {t}: n={len(v)} width ft p10/50/90={q([x[0] for x in v])} length ft={q([x[1] for x in v])} pts med={st.median(x[2] for x in v)} curved={sum(1 for x in v if x[3])}")
road_geoms=[LineString([(a['x'],a['z']) for a in p['main_points']]).buffer(p.get('width',1)/2) for p in roads]
road_u=unary_union(road_geoms)
roofs=[p for p in paths if fn(p).startswith('par_roof')]
houses=[]
for p in roofs:
    hw=p['lines_custom_scales'][0] if p['lines_custom_scales'] else 0.7
    pts=[(a['x'],a['z']) for a in p['main_points']]
    if len(pts)<2: continue
    poly=unary_union([LineString([a,b]).buffer(hw,cap_style=2) for a,b in zip(pts,pts[1:])])
    houses.append((p,poly,pts,hw))
print('\nHOUSES',len(houses),'kinds',dict(collections.Counter(fn(h[0]) for h in houses)),'points/ridge',collections.Counter(len(h[2]) for h in houses).most_common(5))
print(' ridge length ft',q([LineString(h[2]).length for h in houses]),' depth ft',q([2*h[3] for h in houses]))
print(' footprint ft2',[round(sorted(h[1].area for h in houses)[int(len(houses)*p)]*FT*FT) for p in (0.1,0.5,0.9)])
print(' heights',collections.Counter(round(h[0].get('height_changing_position_y') or 0,1) for h in houses).most_common(6))
def has(h,k): return any(k in o['filename'] for s in h[0].get('lines_custom_objects') or [] for kk in s if kk.startswith('site_') for o in s[kk])
print(f" chimney {sum(has(h,'chimney') for h in houses)/len(houses):.0%}, dormer {sum(has(h,'dormer') for h in houses)/len(houses):.0%}, edge {sum(has(h,'edge') for h in houses)/len(houses):.0%}")
tree=STRtree(road_geoms)
setb=[h[1].distance(road_geoms[tree.nearest(h[1])]) for h in houses]
road_lines=[LineString([(a['x'],a['z']) for a in p['main_points']]) for p in roads]
lt=STRtree(road_lines); ang=[]
for p,poly,pts,hw in houses:
    l=road_lines[lt.nearest(poly.centroid)]
    d=l.project(poly.centroid); a=l.interpolate(max(0,d-1)); b=l.interpolate(min(l.length,d+1))
    rd=math.degrees(math.atan2(b.y-a.y,b.x-a.x)); hd=math.degrees(math.atan2(pts[1][1]-pts[0][1],pts[1][0]-pts[0][0]))
    ang.append(abs((hd-rd+90)%180-90))
print(' gap to nearest road edge ft',q(setb),f" touching road(<1.5ft) {sum(1 for s in setb if s*FT<1.5)/len(setb):.0%}")
print(' ridge-vs-road angle bins',sorted(collections.Counter(int(a//15)*15 for a in ang).items()))
ht=STRtree([h[1] for h in houses]); gaps=[]; ov=[]
for i,(p,poly,pts,hw) in enumerate(houses):
    near=[j for j in ht.query(poly.buffer(3)) if j!=i]
    gaps.append(min(poly.distance(houses[j][1]) for j in near) if near else 99)
    for j in ht.query(poly):
        if j>i:
            a=poly.intersection(houses[j][1]).area
            if a>0: ov.append(a/min(poly.area,houses[j][1].area))
gg=[g for g in gaps if g<99]
print(' neighbour gap ft',q(gg),f" touching(<0.5ft) {sum(1 for g in gaps if g*FT<0.5)/len(gaps):.0%}, isolated(>3u) {sum(1 for g in gaps if g==99)}")
print(' overlapping pairs',len(ov),'overlap/smaller p50,p90',[round(sorted(ov)[int(len(ov)*p)],2) for p in (0.5,0.9)] if ov else '')
houses_u=unary_union([h[1] for h in houses])
cats=collections.defaultdict(list)
for o in objs:
    n=o['filename'].split('/')[-1].replace('.tscn','')
    parts=n.split('_'); base='_'.join(parts[:-1]) if len(parts[-1])<=2 else n
    pt=Point(o['position_x'],o['position_z'])
    cats[base].append((pt.distance(houses_u),pt.distance(road_u)))
print('\nOBJECTS: count, dist to house ft p50, dist to road ft p50')
for k,v in sorted(cats.items(),key=lambda kv:-len(kv[1]))[:25]:
    print(f" {k:30s} {len(v):5d} house {round(st.median(x[0] for x in v)*FT,1):7} road {round(st.median(x[1] for x in v)*FT,1):7}")
print('\nPLOTS')
pc=collections.defaultdict(list)
for p in paths:
    if p.get('is_closed') and not fn(p).startswith('par_') and len(p['main_points'])>3:
        pc[fn(p)].append(Polygon([(a['x'],a['z']) for a in p['main_points']]).buffer(0).area*FT*FT)
for k,v in sorted(pc.items(),key=lambda kv:-len(kv[1])): print(f" {k}: {len(v)} area ft2 med {round(st.median(v))}")
print(' line paths',dict(collections.Counter(fn(p) for p in paths if not p.get('is_closed') and fn(p)!='pa_road' and not fn(p).startswith('par_'))))
hd=[LineString([(a['x'],a['z']) for a in p['main_points']]).distance(houses_u)*FT for p in paths if fn(p) in('pa_hedge','pa_fence_1','pa_fence_3') and len(p['main_points'])>1]
print(' hedges/fences dist to house ft p10/50/90',[round(sorted(hd)[int(len(hd)*p)],1) for p in (0.1,0.5,0.9)] if hd else '')
cx=st.median(h[1].centroid.x for h in houses); cz=st.median(h[1].centroid.y for h in houses)
rings=collections.defaultdict(lambda:[0,0.0])
for p,poly,pts,hw in houses:
    r=int(math.hypot(poly.centroid.x-cx,poly.centroid.y-cz)//20); rings[r][0]+=1; rings[r][1]+=poly.area
print('\nDENSITY (ring of 20 units = 270 ft from centre): houses, built share')
for r in sorted(rings):
    A=math.pi*((r+1)**2-r**2)*400
    print(f" {r*20}-{r*20+20}u: {rings[r][0]} houses, {rings[r][1]/A:.0%}")
