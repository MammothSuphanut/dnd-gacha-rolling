"""Read/write Wonderdraft .wonderdraft_map files.

Format: Godot 3 File.open_compressed(FASTLZ) + store_var(Dictionary).
FCMP container: b'GCPF', mode u32, block_size u32, total u32, block sizes u32[], blocks.
"""
import struct, math

# ---------- FastLZ ----------
def fastlz_decompress(src, maxout):
    level = (src[0] >> 5) + 1
    out = bytearray()
    ip = 0
    ctrl = src[ip] & 31; ip += 1
    n = len(src)
    while True:
        if ctrl >= 32:
            ln = (ctrl >> 5) - 1
            ofs = (ctrl & 31) << 8
            ref = len(out) - ofs - 1
            if ln == 7 - 1:
                if level == 1:
                    ln += src[ip]; ip += 1
                else:
                    while True:
                        c = src[ip]; ip += 1; ln += c
                        if c != 255: break
            if level == 1:
                ref -= src[ip]; ip += 1
            else:
                c = src[ip]; ip += 1
                ref -= c
                if c == 255 and ofs == (31 << 8):
                    ofs = (src[ip] << 8) | src[ip + 1]; ip += 2
                    ref = len(out) - ofs - 8191 - 1
            ln += 3
            for _ in range(ln):
                out.append(out[ref]); ref += 1
        else:
            ctrl += 1
            out += src[ip:ip + ctrl]; ip += ctrl
        if ip >= n: break
        ctrl = src[ip]; ip += 1
    return bytes(out)

def fastlz_literal(data):
    """Valid level-1 FastLZ stream using only literal runs (no compression)."""
    out = bytearray()
    for i in range(0, len(data), 32):
        chunk = data[i:i + 32]
        out.append(len(chunk) - 1); out += chunk
    return bytes(out)

def fastlz_compress(data):
    """Simple level-1 compressor (hash matches) - keeps files small."""
    n = len(data)
    if n < 13: return fastlz_literal(data)
    out = bytearray(); lit = bytearray(); table = {}
    i = 0
    def flush():
        for k in range(0, len(lit), 32):
            c = lit[k:k + 32]; out.append(len(c) - 1); out.extend(c)
        lit.clear()
    while i < n - 12:
        key = data[i:i + 3]
        ref = table.get(key); table[key] = i
        if ref is not None and 0 <= i - ref - 1 < 8191 and data[ref:ref + 3] == key:
            ln = 3
            while i + ln < n - 4 and ln < 264 and data[ref + ln] == data[i + ln]: ln += 1
            flush()
            dist = i - ref - 1; l = ln - 2
            if l < 7:
                out.append((l << 5) + (dist >> 8))
            else:
                out.append((7 << 5) + (dist >> 8)); out.append(l - 7)
            out.append(dist & 255)
            i += ln
        else:
            lit.append(data[i]); i += 1
    lit += data[i:]
    flush()
    return bytes(out)

def fcmp_read(path):
    d = open(path, 'rb').read()
    assert d[:4] == b'GCPF', d[:4]
    mode, bs, total = struct.unpack_from('<3I', d, 4)
    nb = (total + bs - 1) // bs
    sizes = struct.unpack_from('<%dI' % nb, d, 16)
    o = 16 + 4 * nb; out = bytearray()
    for k, s in enumerate(sizes):
        blk = d[o:o + s]; o += s
        want = min(bs, total - k * bs)
        out += fastlz_decompress(blk, want) if mode == 0 else _other(mode, blk)
    assert len(out) == total, (len(out), total)
    return bytes(out), (mode, bs)

def _other(mode, blk):
    import zlib
    if mode == 1: return zlib.decompress(blk)
    raise ValueError('mode %d' % mode)

def fcmp_write(path, data, bs=4096):
    blocks = [fastlz_compress(data[i:i + bs]) for i in range(0, len(data), bs)]
    with open(path, 'wb') as f:
        f.write(b'GCPF' + struct.pack('<3I', 0, bs, len(data)))
        f.write(struct.pack('<%dI' % len(blocks), *[len(b) for b in blocks]))
        for b in blocks: f.write(b)

# ---------- Godot 3 Variant ----------
class Typed:
    """Wraps a value that must keep a specific Godot type on re-encode."""
    def __init__(self, t, v): self.t, self.v = t, v
    def __repr__(self): return 'T%d(%r)' % (self.t, self.v)
    def __eq__(self, o): return isinstance(o, Typed) and o.t == self.t and o.v == self.v
    def __hash__(self): return hash((self.t, str(self.v)))

class Vec2(tuple):
    def __new__(cls, x, y): return tuple.__new__(cls, (x, y))
class Color(tuple):
    def __new__(cls, r, g, b, a=1.0): return tuple.__new__(cls, (r, g, b, a))

class I64(int): pass
class F64(float): pass

def _pad(n): return (4 - n % 4) % 4

def decode(d, o=0):
    h = struct.unpack_from('<I', d, o)[0]; o += 4
    t = h & 0xFF; f64 = h & (1 << 16)
    if t == 0: return None, o
    if t == 1: return bool(struct.unpack_from('<I', d, o)[0]), o + 4
    if t == 2:
        if f64: return I64(struct.unpack_from('<q', d, o)[0]), o + 8
        return struct.unpack_from('<i', d, o)[0], o + 4
    if t == 3:
        if f64: return F64(struct.unpack_from('<d', d, o)[0]), o + 8
        return struct.unpack_from('<f', d, o)[0], o + 4
    if t == 4:
        n = struct.unpack_from('<I', d, o)[0]; o += 4
        s = d[o:o + n].decode('utf8'); return s, o + n + _pad(n)
    fl = {5: 2, 6: 4, 7: 3, 8: 6, 9: 4, 10: 4, 11: 6, 12: 9, 13: 12}
    if t in fl:
        v = struct.unpack_from('<%df' % fl[t], d, o); o += 4 * fl[t]
        return (Vec2(*v) if t == 5 else Typed(t, v)), o
    if t == 14:
        return Color(*struct.unpack_from('<4f', d, o)), o + 16
    if t == 17:  # object (not full) -> encoded as id 0 / null
        if h & (1 << 16):
            return Typed(17, struct.unpack_from('<Q', d, o)[0]), o + 8
        n = struct.unpack_from('<I', d, o)[0]; o += 4
        if n == 0: return Typed(17, None), o
        cls = d[o:o + n].decode(); o += n + _pad(n)
        cnt = struct.unpack_from('<I', d, o)[0]; o += 4; props = []
        for _ in range(cnt):
            k, o = _str(d, o)
            v, o = decode(d, o); props.append((k, v))
        return Typed(17, (cls, props)), o
    if t == 18:
        n = struct.unpack_from('<I', d, o)[0] & 0x7FFFFFFF; o += 4; r = {}
        for _ in range(n):
            k, o = decode(d, o); v, o = decode(d, o)
            r[k] = v
        return r, o
    if t == 19:
        n = struct.unpack_from('<I', d, o)[0] & 0x7FFFFFFF; o += 4; r = []
        for _ in range(n):
            v, o = decode(d, o); r.append(v)
        return r, o
    if t == 20:
        n = struct.unpack_from('<I', d, o)[0]; o += 4
        return Typed(20, d[o:o + n]), o + n + _pad(n)
    if t in (21, 22):
        n = struct.unpack_from('<I', d, o)[0]; o += 4
        v = list(struct.unpack_from('<%d%s' % (n, 'i' if t == 21 else 'f'), d, o))
        return Typed(t, v), o + 4 * n
    if t == 23:
        n = struct.unpack_from('<I', d, o)[0]; o += 4; r = []
        for _ in range(n):
            s, o = _str(d, o); r.append(s)
        return Typed(23, r), o
    if t in (24, 25, 26):
        w = {24: 2, 25: 3, 26: 4}[t]
        n = struct.unpack_from('<I', d, o)[0]; o += 4
        v = struct.unpack_from('<%df' % (n * w), d, o)
        return Typed(t, [tuple(v[i:i + w]) for i in range(0, len(v), w)]), o + 4 * n * w
    raise ValueError('type %d at %d' % (t, o - 4))

def _str(d, o):
    n = struct.unpack_from('<I', d, o)[0]; o += 4
    return d[o:o + n].decode('utf8'), o + n + _pad(n)

def _estr(s):
    b = s.encode('utf8'); return struct.pack('<I', len(b)) + b + b'\0' * _pad(len(b))

def encode(v):
    if v is None: return struct.pack('<I', 0)
    if isinstance(v, bool): return struct.pack('<II', 1, int(v))
    if isinstance(v, I64): return struct.pack('<Iq', 2 | (1 << 16), v)
    if isinstance(v, F64): return struct.pack('<Id', 3 | (1 << 16), v)
    if isinstance(v, int):  # GDScript ints are 64-bit; Wonderdraft writes them that way
        return struct.pack('<Iq', 2 | (1 << 16), v)
    if isinstance(v, float):
        if struct.unpack('<f', struct.pack('<f', v))[0] == v: return struct.pack('<If', 3, v)
        return struct.pack('<Id', 3 | (1 << 16), v)
    if isinstance(v, str): return struct.pack('<I', 4) + _estr(v)
    if isinstance(v, Vec2): return struct.pack('<I2f', 5, *v)
    if isinstance(v, Color): return struct.pack('<I4f', 14, *v)
    if isinstance(v, dict):
        b = bytearray(struct.pack('<II', 18, len(v)))
        for k, x in v.items(): b += encode(k) + encode(x)
        return bytes(b)
    if isinstance(v, list):
        b = bytearray(struct.pack('<II', 19, len(v)))
        for x in v: b += encode(x)
        return bytes(b)
    if isinstance(v, Typed):
        t, x = v.t, v.v
        if t in (6, 7, 8, 9, 10, 11, 12, 13): return struct.pack('<I%df' % len(x), t, *x)
        if t == 17:
            if x is None: return struct.pack('<II', 17, 0)
            cls, props = x
            b = bytearray(struct.pack('<I', 17) + _estr(cls) + struct.pack('<I', len(props)))
            for k, y in props: b += _estr(k) + encode(y)
            return bytes(b)
        if t == 20: return struct.pack('<II', 20, len(x)) + bytes(x) + b'\0' * _pad(len(x))
        if t == 21: return struct.pack('<II%di' % len(x), 21, len(x), *x)
        if t == 22: return struct.pack('<II%df' % len(x), 22, len(x), *x)
        if t == 23: return struct.pack('<II', 23, len(x)) + b''.join(_estr(s) for s in x)
        if t in (24, 25, 26):
            flat = [c for p in x for c in p]
            return struct.pack('<II%df' % len(flat), t, len(x), *flat)
    raise TypeError(type(v))

# store_var writes a u32 length prefix before the encoded variant
def load(path):
    raw, _ = fcmp_read(path)
    n = struct.unpack_from('<I', raw, 0)[0]
    v, o = decode(raw, 4)
    assert o == 4 + n, (o, n)
    return v

def save(path, v):
    b = encode(v)
    fcmp_write(path, struct.pack('<I', len(b)) + b)

# ---------- streaming save (for big maps) ----------
# Godot's FileAccessCompressed reads the compression mode from the file header, so a map can be
# written with zlib (mode 1, DEFLATE) instead of FastLZ; much faster for multi-GB image data.
# Typed(20, ...) payloads may be numpy arrays or memoryviews and are never copied.
def _chunks(v):
    if isinstance(v, dict):
        yield struct.pack('<II', 18, len(v))
        for k, x in v.items():
            yield from _chunks(k); yield from _chunks(x)
    elif isinstance(v, list):
        yield struct.pack('<II', 19, len(v))
        for x in v: yield from _chunks(x)
    elif isinstance(v, Typed) and v.t == 20:
        mv = memoryview(v.v).cast('B')
        yield struct.pack('<II', 20, len(mv)); yield mv; yield b'\0' * _pad(len(mv))
    elif isinstance(v, Typed) and v.t == 17 and v.v is not None:
        cls, props = v.v
        yield struct.pack('<I', 17) + _estr(cls) + struct.pack('<I', len(props))
        for k, y in props:
            yield _estr(k); yield from _chunks(y)
    else:
        yield encode(v)

def save_stream(path, v, bs=4096, level=6):
    import zlib
    total = 4 + sum(len(c) for c in _chunks(v))
    nb = (total + bs - 1) // bs
    sizes, buf = [], bytearray(struct.pack('<I', total - 4))
    with open(path, 'wb') as f:
        f.write(b'GCPF' + struct.pack('<3I', 1, bs, total))
        table = f.tell(); f.write(b'\0' * 4 * nb)
        def flush():
            comp = zlib.compress(bytes(buf), level); f.write(comp); sizes.append(len(comp)); buf.clear()
        for c in _chunks(v):
            mv = memoryview(c)
            while len(mv):
                take = min(bs - len(buf), len(mv)); buf += mv[:take]; mv = mv[take:]
                if len(buf) == bs: flush()
        if buf: flush()
        assert len(sizes) == nb
        f.seek(table); f.write(struct.pack('<%dI' % nb, *sizes))
