import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

async function main() {
  const bytes = fs.readFileSync('src/data/5E_CharacterSheet_Fillable.pdf');
  const pdfDoc = await PDFDocument.load(bytes);
  const pages = pdfDoc.getPages();
  const page3 = pages[2];

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  const page3Fields = [];

  for (const field of fields) {
    const widgets = field.acroField.getWidgets();
    if (widgets.length > 0) {
      const widget = widgets[0];
      const ref = widget.P();
      if (ref === page3.ref) {
        // Get bounding box
        const rect = widget.Rect();
        if (rect) {
          // rect is an array [x1, y1, x2, y2]
          const x = rect.get(0).asNumber();
          const y = rect.get(1).asNumber();
          const w = rect.get(2).asNumber() - x;
          const h = rect.get(3).asNumber() - y;
          page3Fields.push({
            name: field.getName(),
            type: field.constructor.name,
            x,
            y,
            w,
            h
          });
        }
      }
    }
  }

  // Sort fields:
  // We want to group by columns. Let's see the range of X coordinates.
  // Left column: X is around 30-220
  // Middle column: X is around 220-410
  // Right column: X is around 410-600
  // Let's write the mapped fields out to inspect them.
  fs.writeFileSync('page3_visual_fields.json', JSON.stringify(page3Fields, null, 2));
  console.log(`Extracted ${page3Fields.length} fields from Page 3.`);
  
  // Print some statistics
  const xCoords = page3Fields.map(f => Math.round(f.x));
  const uniqueX = [...new Set(xCoords)].sort((a, b) => a - b);
  console.log('Unique X coordinates:', uniqueX);
}

main().catch(console.error);
