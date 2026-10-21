"""สร้าง PDF (A4) ของคู่มือผู้เล่น Novaris จากไฟล์ markdown

- session-0/novaris-player-guide.md -> session-0/novaris-player-guide.pdf
- ใช้ python-markdown แปลงเป็น HTML แล้วพิมพ์ด้วย Chrome headless (ฟอนต์ Sarabun/Trirong จาก Google Fonts — ต้องออนไลน์)

แก้เนื้อหาที่ไฟล์ .md แล้วรันใหม่:
    python world-settings/novaris/tools/build_player_guide_pdf.py
"""
import pathlib
import subprocess
import tempfile

import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "session-0" / "novaris-player-guide.md"
OUT = ROOT / "session-0" / "novaris-player-guide.pdf"
CHROME = pathlib.Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")

CSS = """
@page { size: A4; margin: 18mm 16mm 18mm; }
* { box-sizing: border-box; }
body { font-family: 'Sarabun', 'Leelawadee UI', Tahoma, sans-serif; font-size: 10.5pt; line-height: 1.6;
  color: #1E2238; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3 { font-family: 'Trirong', Georgia, serif; line-height: 1.25; color: #141830; break-after: avoid; }
h1 { font-size: 26pt; margin: 0 0 2pt; }
h1 + p em { color: #8A5A0B; }
h2 { font-size: 17pt; margin: 0 0 8pt; padding-bottom: 4pt; border-bottom: 2px solid #D9A441; break-before: page; }
h2:first-of-type { break-before: auto; }
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
    body = markdown.markdown(SRC.read_text(encoding="utf-8"), extensions=["tables"])
    html = (f'<!doctype html><html lang="th"><head><meta charset="utf-8">'
            f'<title>Novaris — คู่มือโลกสำหรับผู้เล่น</title>{FONTS}<style>{CSS}</style></head>'
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
