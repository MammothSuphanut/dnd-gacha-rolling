import math, random, numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageChops
random.seed(7)
SRC = r"D:/FoundryVTT_Data/Data/assets/characters/Ashvale/Ashvale.jpg"
S = 2048                 # work at 2x, downsample to 1024
cx, cy, R = 1024, 1150, 770
s = 2.5; ox, oy = 124, -10  # placement of 768px source

src = Image.open(SRC).convert("RGB")
mask = Image.open("mask.png").convert("L")
sw = int(768*s)
art = Image.new("RGB",(S,S)); art.paste(src.resize((sw,sw),Image.LANCZOS),(ox,oy))
fg = Image.new("L",(S,S),0); fg.paste(mask.resize((sw,sw),Image.LANCZOS),(ox,oy))
fg = fg.filter(ImageFilter.GaussianBlur(2))

def disc(r, blur=0):
    m = Image.new("L",(S,S),0); ImageDraw.Draw(m).ellipse((cx-r,cy-r,cx+r,cy+r),fill=255)
    return m.filter(ImageFilter.GaussianBlur(blur)) if blur else m

def shift(im,dx,dy):
    o=Image.new('RGBA',im.size,(0,0,0,0)); o.paste(im,(dx,dy)); return o
token = Image.new("RGBA",(S,S),(0,0,0,0))
# portrait inside, with inner vignette
inner = R-40
a = np.asarray(art).astype(np.float32)
yy,xx = np.mgrid[0:S,0:S]; d = np.hypot(xx-cx,yy-cy)/inner
vig = np.clip(1.15-0.55*d**3,0.35,1)[...,None]
art_v = Image.fromarray((a*vig).clip(0,255).astype(np.uint8))
token.paste(art_v,(0,0),disc(inner))

# ---- root / vine frame ----
frame = Image.new("RGBA",(S,S),(0,0,0,0)); fd = ImageDraw.Draw(frame)
def strand(phase, amp, freq, base, wmin, wmax, twist):
    pts=[]
    for i in range(1400):
        t = i/1400*2*math.pi
        r = R+base+amp*math.sin(freq*t+phase)+12*math.sin(23*t+phase*3)
        w = wmin+(wmax-wmin)*(0.5+0.5*math.sin(twist*t+phase*1.7))
        pts.append((cx+r*math.cos(t), cy+r*math.sin(t), w, t))
    return pts
strands=[strand(random.uniform(0,6.28), random.uniform(18,40), random.choice([5,6,7,9]),
               random.uniform(-30,30), 16, random.uniform(40,62), random.choice([3,4,5,7])) for _ in range(8)]
dark=(28,17,10,255)
for p in strands:                       # outline pass
    for x,y,w,t in p: fd.ellipse((x-w-5,y-w-5,x+w+5,y+w+5),fill=dark)
for k,p in enumerate(strands):          # bark fill + light
    base = random.choice([(78,52,32),(92,62,38),(70,48,30),(84,60,40)])
    for x,y,w,t in p:
        sh = 0.75+0.25*math.cos(t+2.3)  # light from top-left
        c = tuple(int(v*sh) for v in base)+(255,)
        fd.ellipse((x-w,y-w,x+w,y+w),fill=c)
    for x,y,w,t in p[::2]:
        hx,hy = x-w*0.35, y-w*0.35; hw=w*0.35
        fd.ellipse((hx-hw,hy-hw,hx+hw,hy+hw),fill=(118,86,56,110))
for _ in range(10):
    t=random.uniform(0,2*math.pi); r=R+random.uniform(-30,30); x,y=cx+r*math.cos(t),cy+r*math.sin(t); k=random.uniform(26,44)
    fd.ellipse((x-k-5,y-k*0.8-5,x+k+5,y+k*0.8+5),fill=dark); fd.ellipse((x-k,y-k*0.8,x+k,y+k*0.8),fill=(88,60,36,255))
    fd.ellipse((x-k*0.45,y-k*0.35,x+k*0.45,y+k*0.35),fill=(52,34,20,255))
# bark grain
grain = Image.new("RGBA",(S,S),(0,0,0,0)); gd=ImageDraw.Draw(grain)
for _ in range(900):
    t=random.uniform(0,2*math.pi); r=R+random.uniform(-60,60); L=random.uniform(0.02,0.07)
    pts=[(cx+(r+3*math.sin(j))*math.cos(t+L*j/6), cy+(r+3*math.sin(j))*math.sin(t+L*j/6)) for j in range(7)]
    gd.line(pts,fill=(30,18,10,140),width=3)
frame.alpha_composite(Image.composite(grain, Image.new("RGBA",(S,S)), frame.split()[3]))

# vines: thin green tendrils weaving + leaves
def leaf(d, x, y, ang, L):
    W=L*0.45; pts=[]
    for i in range(21):
        u=i/20; wid=W*math.sin(math.pi*u)
        pts.append((u*L, wid))
    pts += [(u*L,-W*math.sin(math.pi*u)) for u in [i/20 for i in range(20,-1,-1)]]
    ca,sa=math.cos(ang),math.sin(ang)
    poly=[(x+px*ca-py*sa, y+px*sa+py*ca) for px,py in pts]
    g=random.choice([(58,82,40),(72,96,46),(48,70,36),(88,104,52)])
    d.polygon(poly, fill=g+(255,), outline=(22,32,14,255))
    d.line([(x,y),(x+L*0.9*ca,y+L*0.9*sa)], fill=(110,134,70,255), width=3)
for v in range(3):
    ph=random.uniform(0,6.28); fr=random.choice([8,10,11])
    pts=[]
    for i in range(1600):
        t=i/1600*2*math.pi; r=R+42*math.sin(fr*t+ph)
        pts.append((cx+r*math.cos(t), cy+r*math.sin(t)))
    fd.line(pts+[pts[0]], fill=(20,30,14,255), width=16)
    fd.line(pts+[pts[0]], fill=(66,92,44,255), width=9)
    for i in range(0,1600,random.choice([60,75,90])):
        x,y=pts[i]; t=i/1600*2*math.pi
        out = t + random.uniform(-1.2,1.2)
        ang = math.atan2(y-cy,x-cx)+random.uniform(-1.6,1.6)
        leaf(fd,x,y,ang,random.uniform(46,96))
# curling tendrils + dangling roots
for _ in range(14):
    t=random.uniform(0,2*math.pi); r=R+random.uniform(20,50)
    x,y=cx+r*math.cos(t),cy+r*math.sin(t); ang=t+random.choice([-1,1])*0.6; L=random.uniform(50,110)
    pts=[]
    for j in range(60):
        u=j/59; rr=L*(1-u*0.85); a2=ang+u*5.5*random.choice([1])
        pts.append((x+u*L*math.cos(ang)+rr*0.25*math.cos(a2), y+u*L*math.sin(ang)+rr*0.25*math.sin(a2)))
    fd.line(pts, fill=(20,30,14,255), width=9); fd.line(pts, fill=(80,104,50,255), width=5)
def root(x,y,ang,L,w,depth):
    pts=[];a=ang
    for j in range(30):
        u=j/29; a+=random.uniform(-0.25,0.25)
        x+=math.cos(a)*L/30; y+=math.sin(a)*L/30; pts.append((x,y,max(2,w*(1-u))))
    for px,py,pw in pts: fd.ellipse((px-pw-3,py-pw-3,px+pw+3,py+pw+3),fill=dark)
    for px,py,pw in pts: fd.ellipse((px-pw,py-pw,px+pw,py+pw),fill=(70,48,30,255))
    if depth<2:
        for _ in range(random.choice([1,2])):
            i=random.randint(8,20); px,py,pw=pts[i]
            root(px,py,a+random.choice([-1,1])*random.uniform(0.5,0.9),L*0.5,pw*0.8,depth+1)
for _ in range(0):
    t=math.pi/2+random.uniform(-0.8,0.8); x,y=cx+(R+40)*math.cos(t),cy+(R+40)*math.sin(t)
    root(x,y,math.pi/2+(t-math.pi/2)*0.6,random.uniform(60,120),random.uniform(9,14),0)

# frame drop shadow
fa = frame.split()[3]
shadow = Image.new("RGBA",(S,S),(0,0,0,0)); shadow.putalpha(fa.filter(ImageFilter.GaussianBlur(14)).point(lambda v:int(v*0.7)))
shadow = shift(shadow,6,12)
token.alpha_composite(shadow); token.alpha_composite(frame)

# ---- overflow: head/hair above the ring ----
reg = Image.new("L",(S,S),0); ImageDraw.Draw(reg).rectangle((560,0,1330,cy-R+260),fill=255)
reg = reg.filter(ImageFilter.GaussianBlur(30))
reg_np=np.asarray(reg).copy(); reg_np[:30]=0; reg=Image.fromarray(reg_np)
over_a = ImageChops.multiply(fg, reg)
over_a = ImageChops.multiply(over_a, ImageChops.invert(disc(inner-10)) .point(lambda v:255) )  # full head layer
head = art.convert("RGBA"); head.putalpha(over_a)
# shadow of head onto frame
hs = Image.new("RGBA",(S,S),(0,0,0,0)); hs.putalpha(over_a.filter(ImageFilter.GaussianBlur(16)).point(lambda v:int(v*0.6)))
token.alpha_composite(shift(hs,8,14))
token.alpha_composite(head)

out = token.resize((1024,1024),Image.LANCZOS)
out.save(r"D:/FoundryVTT_Data/Data/assets/characters/Ashvale/Ashvale token.png")
prev = Image.new("RGBA",(1024,1024),(200,200,200,255)); prev.alpha_composite(out); pass
