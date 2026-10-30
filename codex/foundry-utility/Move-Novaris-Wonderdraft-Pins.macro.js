/**
 * Move Novaris (Wonderdraft) Pins — puts the map pins back on the town dots after the 2026-10-30 map edits.
 * For Foundry VTT v14 + D&D 5e system 6.x
 *
 * How to use:
 *   1. Macro Directory → Create Macro → Type: "Script"
 *   2. Paste this whole file, then Execute (GM only).
 *
 * The pins of "Novaris (Wonderdraft)" were copied from the old Azgaar scene, so they sit on Azgaar's town spots.
 * The Wonderdraft map moved 112 town dots away from those: 47 moved by hand on 2026-10-30, the rest by
 * build_world_v2.py itself (Salsvault's hand-picked spot, Eiselcross poster sites, towns snapped out of the water).
 * Every one of the 426 town pins is checked against its own dot (by name); these are the ones more than 3 px off.
 * Each row: [note id, name, old x, old y, new x, new y] in scene coordinates (map px ×1.5 + scene padding).
 * Only "Novaris (Wonderdraft)" changes: the old "Novaris" scene and the continent scenes keep the Azgaar maps.
 * A pin that is neither at its old spot nor already moved (e.g. dragged by hand since) is left alone and listed.
 */
(async () => {
  const SCENE = "Novaris (Wonderdraft)";
  const MOVES = [
    ["HiOeItNJm29kPGAK", "Reedmoor", 16752, 8477, 16626, 8514],
    ["11yAPzHBpy6CHPBW", "Giftvik", 7912, 9890, 8024, 9938],
    ["yzX21X0bgPQPeQn8", "Twinhold", 17857, 4663, 17948, 4709],
    ["PfZCNDjVsD7U57Fb", "Scalehaven", 17877, 8110, 17782, 8102],
    ["emQtROy4gqZG4os6", "Salsvault", 16424, 3742, 16420, 3835],
    ["5xq0ZBsQ262h2VRJ", "Smedheim", 7306, 10021, 7298, 10088],
    ["aTVQeY6KUXWgncDf", "Yeti's Hollow", 16287, 3976, 16222, 3979],
    ["PocZOdejy6vZLchr", "Malmdal", 7337, 9970, 7356, 9911],
    ["fOIxgTjMT1HVNnR5", "Chaktun", 9331, 12796, 9362, 12843],
    ["GfmHfsL16pBbyaVv", "Lanternhold", 18294, 7472, 18252, 7435],
    ["4HV5ItknGWlIRJfU", "Waterdeep", 18490, 4447, 18510, 4396],
    ["8d3saaFfikf58Qvi", "Ban Nong บ้านหนอง", 5325, 10964, 5275, 10960],
    ["a9M6RbUiCaqZ7rIn", "Jarnstad", 7298, 10001, 7324, 10034],
    ["b0HdOtBzDTiEhhdN", "Lockwood", 16766, 8392, 16799, 8369],
    ["eMA30zN7JFGlaJil", "Kukmul", 9278, 12798, 9261, 12834],
    ["hJ3lpuODikypLktN", "Sector 32: Blackreef", 12910, 7598, 12875, 7580],
    ["5U7IUWrCTdVtQqFO", "Muyeong 無影", 6909, 8575, 6875, 8558],
    ["JAjPNdCdbEVUr02z", "Sector 11: Ashgate", 12440, 8735, 12413, 8710],
    ["Zqy8pm3HsHPaTWyY", "Laem Sai แหลมทราย", 5059, 10547, 5033, 10573],
    ["U1XKksOjECL7VKXk", "Fiorella", 15413, 7795, 15403, 7760],
    ["huH5ealldu617rI0", "Bang Bua บางบัว", 5349, 10935, 5380, 10925],
    ["8BZP16occB5IHX2E", "Cogwick", 17340, 6125, 17371, 6132],
    ["7r4uyqymoH9PJAJH", "Kaupstad", 8205, 10113, 8196, 10143],
    ["Qkj8yQGJRsb0kjIH", "Neverwinter", 18537, 4330, 18545, 4360],
    ["luAqP9v29Z42KuFK", "Sector 27: Freeharbor", 12531, 6334, 12542, 6362],
    ["69Ts6Xqv2NAM7FE8", "Sector 38: Brookfoot", 10578, 6688, 10598, 6710],
    ["LYuJotVCm4I5HL64", "Kuchil", 9501, 12844, 9530, 12839],
    ["kqXecVx67AOuGa8f", "Sector 09: Forgehold", 12136, 9238, 12108, 9245],
    ["XCZXRM7hRIvBDo6E", "Shirasagi 白鷺", 5568, 6441, 5560, 6468],
    ["wlIK9YXJVkTbWNry", "Sector 47: Regatta", 12244, 7185, 12243, 7157],
    ["XHPPpunOlRjagWRi", "Strandfeste", 6980, 13258, 6970, 13232],
    ["TOroTbJcvAG7J7YR", "Sector 10: Steelspire", 11364, 9102, 11380, 9080],
    ["p69PCYA5WKSqL7v6", "Velapura वेलापुर", 8072, 13022, 8070, 12995],
    ["QaTEkLd6knMNUZXE", "Sector 04: Ironhelm", 11954, 9411, 11938, 9390],
    ["nSwW8CrnpJUeuHFl", "Sector 66: Wreckers' Cove", 12811, 7718, 12803, 7693],
    ["pCOMst1qc4SPyxko", "Yeomjeon 鹽田", 7042, 8605, 7058, 8585],
    ["lwWjeLkpnXJucQNT", "Wormgrave", 15714, 3832, 15729, 3852],
    ["QJhvIbi2yI3rKenj", "Palebank Village", 17779, 4309, 17785, 4333],
    ["r4mkZB8qcLlCmboZ", "Hafenburg", 6010, 13219, 6030, 13205],
    ["5ntkCQULqfzHTVD1", "Nakhon Phet นครเพชร", 5353, 11023, 5373, 11036],
    ["eM46aGporpE94ix0", "Saltgate", 13774, 5610, 13785, 5630],
    ["EpnKdm6hy5FqVoTZ", "Westpost", 16425, 4270, 16447, 4271],
    ["x78tQNJNYF3s7VVz", "Skarvik", 7166, 9879, 7180, 9895],
    ["dCGLZxg2S96aVNzl", "Dangmun 唐門", 5265, 7897, 5280, 7882],
    ["2MCI3H13QF9kwdFe", "Duskraft", 15393, 3768, 15413, 3775],
    ["ZRXbPrPytZFuQSg1", "Sector 33: Tidehold", 12683, 7762, 12662, 7760],
    ["pSATHkx6Pvg7nl9j", "Amcho 暗礁", 7190, 8716, 7188, 8695],
    ["ZXfQay93x59RpTbv", "Chakha", 9573, 12938, 9555, 12948],
    ["4PxMvOBvx8LNjTXQ", "Setu सेतु", 9690, 11893, 9675, 11907],
    ["t3BwHh1tQcXNWEVE", "Heshet", 8781, 11047, 8770, 11030],
    ["PvavcrNoevvURYxc", "Marshgate", 16753, 8430, 16740, 8444],
    ["x0lL6Agbn6on78aC", "Marisola", 15805, 7979, 15805, 7960],
    ["ZIBWPTz9qyqpgEBB", "Fernbrook", 16999, 8261, 16990, 8245],
    ["qRyX7uebOkpvYfS3", "Karasuma 烏間", 9433, 5836, 9415, 5838],
    ["t8PjweE3nR6K2fBF", "Sakbe", 9296, 12802, 9311, 12792],
    ["yjPYwmXRZfEaHt6S", "Yartar", 18919, 4510, 18933, 4521],
    ["fmNm52PqzIu3raO4", "Isola Grande", 14778, 7892, 14777, 7875],
    ["Rt4gtcN8Mzzyx2ST", "Brimnes", 7225, 9787, 7240, 9795],
    ["nAnQK4ZeQlkQcJd8", "Tenmon 天文", 8885, 5335, 8893, 5320],
    ["CGsNb30PkbxQEgIX", "Nohha", 9510, 12704, 9515, 12720],
    ["dwes14vEBMHyxWfp", "Isola Nera", 14026, 8706, 14040, 8715],
    ["WAAEp6g0x1dCAb5i", "Rocca", 15190, 8245, 15200, 8258],
    ["UviMZ2rui8VDAE02", "Syrinlya", 16890, 4025, 16885, 4040],
    ["l7F3Q9L754wVUXqK", "Stonepride", 16015, 6336, 16020, 6351],
    ["6Ik9CldDGyUtvxc5", "Porto Vetro", 16183, 8047, 16193, 8035],
    ["9HddKNo9tHc0DKjl", "Sector 24: Bulwark Harbor", 11080, 5838, 11095, 5842],
    ["8WJT9pZFrIj5J9t1", "Hokuto 北斗", 8699, 5417, 8705, 5431],
    ["8Rbb7FVUUvzk6QYk", "Giantkeep", 12899, 5698, 12887, 5690],
    ["CGDwxBDpn20cMa0I", "Many Fires", 6456, 10251, 6465, 10262],
    ["a7b6XhXn4NeKNs1I", "Eaglecrest", 15918, 6637, 15932, 6638],
    ["l6QdUzyAOZ5S8Ike", "Ruins of Drakara", 17965, 7912, 17964, 7926],
    ["X13wTfKlCJRb9dn5", "Ratnakara रत्नाकर", 9722, 12083, 9715, 12095],
    ["swKLY36AlBGtFus7", "Shiftlands", 16064, 3534, 16068, 3547],
    ["dvn0MKUrNKYYhkQH", "Shikimura 式村", 8831, 5287, 8831, 5300],
    ["z2bA5fokXAdLQ0Dn", "Hillcrest", 17019, 8327, 17012, 8337],
    ["odzo5N4A7zUo7dne", "Tengudani 天狗谷", 5988, 6686, 5977, 6682],
    ["TSEdyJ7GtSeJEQ2x", "Pang Ma ปางม้า", 5643, 11450, 5649, 11459],
    ["BD1SRt5OEe8hBvOE", "Doi Mok ดอยหมอก", 5624, 11447, 5616, 11454],
    ["KUAYJfUknq3WYOC5", "Castra Solis", 8541, 10437, 8532, 10442],
    ["l1H6SfRFSJ28qdjr", "Kurozuka 黒塚", 9429, 5820, 9420, 5815],
    ["DeVfiOo7R2ADATwf", "Ashguard Garrison", 17882, 6469, 17884, 6479],
    ["IgxwiFe3tE3V56Fl", "Garden of Stone", 16649, 4417, 16647, 4427],
    ["S1nutInrQX4NadT2", "Fortress of the Dead Jarl", 16301, 3594, 16302, 3584],
    ["Njv2mOjPCkMF4Vsx", "Westreach", 14621, 6358, 14613, 6364],
    ["io99pA5a6uE1yzgd", "Netmouth", 18588, 6171, 18580, 6165],
    ["XBMZ4ELqzY96armi", "Suro-chae 水路寨", 7206, 8378, 7213, 8385],
    ["6QYH1zmA7voJDjFp", "Ixkab", 9118, 12935, 9114, 12944],
    ["y8AT93pbqZ0DzwFd", "Lagunara", 15482, 7449, 15473, 7445],
    ["7rRjrQMFm2FN8HdB", "Stillwater", 16753, 8412, 16749, 8404],
    ["F92G4cZ2chGu1mrW", "Harvel", 17416, 6797, 17412, 6789],
    ["VLN9lVdRYCvipAC0", "Belmare", 16556, 8200, 16563, 8205],
    ["OxGfmXxATVE5bDCO", "Triboar", 18829, 4456, 18821, 4459],
    ["40b1D80E1RMYyvE1", "Yuimori 結森", 8700, 5386, 8699, 5378],
    ["C82xA2SD0ORsZxpz", "Coppergate", 14953, 6331, 14949, 6338],
    ["qmKaQ2abB21ctOum", "Doi Fa ดอยฟ้า", 5631, 11417, 5638, 11413],
    ["vJQmZPnhXMjAgNR0", "Phandalin", 18613, 4420, 18617, 4427],
    ["8zqsbX349BnBXyK4", "Hopsdale", 16976, 7270, 16968, 7270],
    ["1Wb5yOEVRvnESghs", "Shankhapura शंखपुर", 9715, 12056, 9721, 12051],
    ["A0TkaMqyNW0U2dhV", "Firsthaven", 10732, 7320, 10725, 7317],
    ["m7UmG0N54gmiRJlP", "Sector 26: Arsenal Bay", 13002, 5925, 12995, 5928],
    ["47k0CrzkdvLcN8Or", "Fernridge", 17041, 8311, 17047, 8308],
    ["qaK1m85qQusGKJvz", "Sector 34: Neon Wharf", 13215, 6682, 13218, 6687],
    ["5rx3qKmi5cQeuTDH", "Ekchah", 8826, 12842, 8821, 12841],
    ["9eexkkerXeTQBSfn", "Ivoryden", 18801, 4367, 18806, 4366],
    ["33iaJhPeuknxymu3", "Syngorn", 14184, 10065, 14180, 10062],
    ["RDIndgclq9rmBrnm", "Sector 19: Goldbluff", 11315, 5505, 11315, 5510],
    ["V6NQjexrql1SK7S4", "Vena d'Oro", 15177, 6580, 15177, 6585],
    ["NXfJanJkZ7PcINEm", "Asahi 朝日", 9275, 5509, 9273, 5505],
    ["u5U0vNJklh9rYLXc", "Funado 船戸", 6019, 5648, 6018, 5652],
    ["zpzw43ZUJit7dyRG", "Verdella", 16154, 7740, 16158, 7740],
    ["ptobdG8MXenM06DG", "Kadali कदली", 9210, 12331, 9207, 12329],
    ["tVm4NEnll6KIPgWr", "Kantun", 8723, 12852, 8722, 12855]
  ];
  const NEAR = 4;   // px tolerance for "still at the old spot"

  if (!game.user.isGM) return ui.notifications.error("GM only.");
  const scene = game.scenes.getName(SCENE);
  if (!scene) return ui.notifications.error(`Scene "${SCENE}" not found — run Create-Novaris-Wonderdraft-Scene first.`);

  const updates = [], skipped = [];
  let done = 0;
  for (const [id, name, ox, oy, nx, ny] of MOVES) {
    const note = scene.notes.get(id);
    if (!note) { skipped.push(`${name} (pin missing)`); continue; }
    if (note.x === nx && note.y === ny) { done++; continue; }
    if (Math.hypot(note.x - ox, note.y - oy) > NEAR) { skipped.push(`${name} (moved by hand)`); continue; }
    updates.push({ _id: id, x: nx, y: ny });
  }
  if (updates.length) await scene.updateEmbeddedDocuments("Note", updates);

  if (skipped.length) console.warn(`${SCENE}: pins left alone:`, skipped);
  ui.notifications.info(`${SCENE}: moved ${updates.length} pins` + (done ? `, ${done} already in place` : "")
    + (skipped.length ? `, ${skipped.length} left alone (see console)` : "") + ".");
})();
