import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAdventureDoc, resolveAdventureLink, toCleanAdventurePath } from '../utils/adventureJournals'
import { getHomebrewDoc, toHomebrewCleanPath } from '../utils/homebrewRules'

const LINK_CLASS = 'text-violet-700 underline decoration-dotted underline-offset-2 hover:text-violet-900'

function isExternalHref(href) {
  return /^([a-z][a-z0-9+.-]*:)/i.test(href) || href.startsWith('#')
}

// Adventure journals and homebrew rule docs link into each other (e.g. an
// EP linking to the Fatigue rules) — check both doc sets so either kind of
// crossing link still resolves to an in-app route.
function getKnownDoc(path) {
  return getAdventureDoc(path) ?? getHomebrewDoc(path)
}

function toAppPath(path) {
  return path.startsWith('/homebrew-rules/') ? toHomebrewCleanPath(path) : toCleanAdventurePath(path)
}

function AdventureLink({ basePath, href, children, ...props }) {
  if (!href || isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={LINK_CLASS} {...props}>
        {children}
      </a>
    )
  }

  const targetPath = resolveAdventureLink(basePath, href)
  if (!getKnownDoc(targetPath)) {
    // Not a doc we know about (e.g. an image or a link to text outside adventures/ and homebrew-rules/) — leave it alone.
    return (
      <a href={href} target="_blank" rel="noreferrer" className={LINK_CLASS} {...props}>
        {children}
      </a>
    )
  }

  // Absolute, origin-qualified, and shaped like a plain site path (no query
  // string) so the link still works after being copied into FoundryVTT (or
  // anywhere else) — it doesn't depend on the paste destination's own origin.
  const openUrl = `${window.location.origin}${toAppPath(targetPath)}`
  return (
    <a href={openUrl} target="_blank" rel="noreferrer" className={LINK_CLASS} {...props}>
      {children}
    </a>
  )
}

function buildComponents(basePath) {
  return {
    h1: (props) => <h1 className="font-cinzel mb-2 text-xl font-bold text-stone-900" {...props} />,
    h2: (props) => <h2 className="font-cinzel mt-5 mb-2 text-lg font-bold text-stone-800" {...props} />,
    h3: (props) => <h3 className="mt-4 mb-1.5 text-base font-semibold text-stone-800" {...props} />,
    p: (props) => <p className="mb-3 leading-relaxed text-stone-700" {...props} />,
    ul: (props) => <ul className="mb-3 list-disc space-y-1 pl-5 text-stone-700" {...props} />,
    ol: (props) => <ol className="mb-3 list-decimal space-y-1 pl-5 text-stone-700" {...props} />,
    li: (props) => <li className="leading-relaxed" {...props} />,
    blockquote: (props) => (
      <blockquote className="mb-3 border-l-2 border-violet-300 bg-violet-50/60 py-1.5 pl-3 italic text-stone-600" {...props} />
    ),
    hr: () => <hr className="my-5 border-[#e2cfb3]" />,
    strong: (props) => <strong className="font-semibold text-stone-900" {...props} />,
    table: (props) => (
      <div className="mb-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-[#f5ede0] text-left" {...props} />,
    th: (props) => <th className="border border-[#e2cfb3] px-2 py-1 font-semibold text-stone-700" {...props} />,
    td: (props) => <td className="border border-[#e2cfb3] px-2 py-1 align-top text-stone-700" {...props} />,
    a: (props) => <AdventureLink basePath={basePath} {...props} />,
    // `title` (the markdown "caption" syntax: ![alt](src "caption")) renders
    // as a figcaption, matching the image+credit-line look official 5e
    // journals use — src is always an absolute external URL (5e.tools /
    // homebrew-img), never a path needing basePath resolution.
    img: ({ src, alt, title }) => (
      <figure className="my-4">
        <img src={src} alt={alt} loading="lazy" className="w-full rounded-md border border-[#e2cfb3]" />
        {title && <figcaption className="mt-1 text-center text-xs italic text-stone-500">{title}</figcaption>}
      </figure>
    ),
  }
}

export default function AdventureMarkdownView({ content, basePath }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(basePath)}>
      {content}
    </ReactMarkdown>
  )
}
