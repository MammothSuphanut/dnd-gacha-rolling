"""สร้าง PDF (A4) ฉบับ DM ของ Novaris จากไฟล์หลัก

- history-timeline, _canon-decisions, population-and-power, cosmology-and-tier-of-being (กฎกลาง),
  _location-themes-draft, _cr-nations-reference -> exports/novaris-canon.pdf
- ไม่อ่าน contents/canon/ (เป็นไฟล์ที่แตกออกมาจากไฟล์หลัก เนื้อหาซ้ำ)
- ใช้ python-markdown + Chrome headless (ฟอนต์ Sarabun/Trirong จาก Google Fonts — ต้องออนไลน์)

แก้ที่ไฟล์หลักแล้วรันใหม่:
    python world-settings/novaris/tools/build_canon_pdf.py
"""
import pathlib
import subprocess
import tempfile

import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRCS = [ROOT / "contents" / n for n in ("history-timeline.md", "_canon-decisions.md", "population-and-power.md")] + [ROOT.parent.parent / "codex" / "Core-Rules" / "cosmology-and-tier-of-being.md"] + [ROOT / "contents" / n for n in ("_location-themes-draft.md", "_cr-nations-reference.md")]
OUT = ROOT / "exports" / "novaris-canon.pdf"
CHROME = pathlib.Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
if not CHROME.exists():  # macOS
    CHROME = pathlib.Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")

CSS = """
@page { size: A4; margin: 18mm 16mm 18mm; }
* { box-sizing: border-box; }
body { font-family: 'Sarabun', 'Leelawadee UI', Tahoma, sans-serif; font-size: 10.5pt; line-height: 1.6;
  color: #1E2238; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3 { font-family: 'Trirong', Georgia, serif; line-height: 1.25; color: #141830; break-after: avoid; }
h1 { font-size: 26pt; margin: 0 0 2pt; }
h1 + p em { color: #8A5A0B; }
h2 { font-size: 17pt; margin: 0 0 8pt; padding-bottom: 4pt; border-bottom: 2px solid #D9A441; break-before: page; }
h1 { break-before: page; } h1:first-of-type { break-before: auto; }
h3 { font-size: 12.5pt; margin: 14pt 0 5pt; color: #8A5A0B; }
p { margin: 0 0 6pt; }
ul, ol { margin: 0 0 7pt; padding-left: 18pt; }
li { margin-bottom: 2pt; }
li::marker { color: #8A5A0B; }
strong { color: #141830; }
hr { display: none; }
blockquote { margin: 8pt 0; padding: 7pt 12pt; background: #F7EFDC; border-left: 4px solid #D9A441;
  border-radius: 4px; break-inside: avoid; }
blockquote p { margin: 0; }
table { width: 100%; border-collapse: collapse; margin: 4pt 0 10pt; font-size: 9.5pt; line-height: 1.45; }
tr { break-inside: avoid; }
th { background: #1E2238; color: #F4EFE4; text-align: left; font-weight: 600; padding: 4pt 7pt; }
td { padding: 4pt 7pt; border-bottom: 1px solid #DDD3BE; vertical-align: top; }
tr:nth-child(even) td { background: #F6F1E6; }
"""

FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
         'family=Trirong:wght@400;600;700&family=Sarabun:ital,wght@0,400;0,600;0,700;1,400&display=swap">')


def main():
    body = "".join(markdown.markdown(s.read_text(encoding="utf-8"), extensions=["tables"]) for s in SRCS)
    html = (f'<!doctype html><html lang="th"><head><meta charset="utf-8">'
            f'<title>Novaris — Canon (ฉบับ DM)</title>{FONTS}<style>{CSS}</style></head>'
            f'<body>{body}</body></html>')
    with tempfile.TemporaryDirectory() as tmp:
        page = pathlib.Path(tmp) / "guide.html"
        page.write_text(html, encoding="utf-8")
        subprocess.run([str(CHROME), "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                        "--virtual-time-budget=15000", f"--print-to-pdf={OUT}", page.as_uri()],
                       check=True, capture_output=True)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
