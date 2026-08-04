import { renderToStaticMarkup } from 'react-dom/server'
import AdventureMarkdownView from '../components/AdventureMarkdownView'

// Clean semantic HTML (no Tailwind classes, but same link-rewriting as the
// in-app view) so pasting into a rich-text editor like FoundryVTT's journal
// editor keeps headers/tables/bold *and* working links back to our app.
export async function copyMarkdownToClipboard(content, path) {
  const html = renderToStaticMarkup(<AdventureMarkdownView content={content} basePath={path} />)
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([content], { type: 'text/plain' }),
      }),
    ])
  } catch {
    await navigator.clipboard.writeText(content)
  }
}
