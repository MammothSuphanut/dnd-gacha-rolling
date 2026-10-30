import cv2, numpy as np
src = r"D:/FoundryVTT_Data/Data/assets/characters/Ashvale/Ashvale.jpg"
img = cv2.imread(src)
h,w = img.shape[:2]
mask = np.full((h,w), cv2.GC_PR_BGD, np.uint8)
# definite background: edges
mask[:, :120] = cv2.GC_BGD; mask[:20,:] = cv2.GC_BGD
mask[:, 740:] = cv2.GC_BGD
# probable foreground: character body region
cv2.rectangle(mask,(200,35),(500,330),cv2.GC_PR_FGD,-1)   # head/hair
cv2.rectangle(mask,(150,300),(720,768),cv2.GC_PR_FGD,-1)  # body/cloak
# definite fg: face & torso core
cv2.ellipse(mask,(355,220),(70,100),0,0,360,cv2.GC_FGD,-1)
cv2.rectangle(mask,(250,420),(600,768),cv2.GC_FGD,-1)
bgd=np.zeros((1,65),np.float64); fgd=np.zeros((1,65),np.float64)
cv2.grabCut(img,mask,None,bgd,fgd,8,cv2.GC_INIT_WITH_MASK)
m = np.where((mask==1)|(mask==3),255,0).astype(np.uint8)
m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((5,5),np.uint8))
n,lab,st,_ = cv2.connectedComponentsWithStats(m)
big = 1+np.argmax(st[1:,cv2.CC_STAT_AREA]); m = np.where(lab==big,255,0).astype(np.uint8)
cv2.imwrite("mask.png", m)
vis = img.copy(); vis[m==0] = (vis[m==0]*0.25).astype(np.uint8)
pass
