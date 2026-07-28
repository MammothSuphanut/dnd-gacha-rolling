import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getAdventureDoc, resolveAdventureLink, toCleanAdventurePath } from '../utils/adventureJournals'

const LINK_CLASS = 'text-violet-700 underline decoration-dotted underline-offset-2 hover:text-violet-900'

function isExternalHref(href) {
  return /^([a-z][a-z0-9+.-]*:)/i.test(href) || href.startsWith('#')
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
  if (!getAdventureDoc(targetPath)) {
    // Not a doc we know about (e.g. an image or a link to text outside adventures/) — leave it alone.
    return (
      <a href={href} target="_blank" rel="noreferrer" className={LINK_CLASS} {...props}>
        {children}
      </a>
    )
  }

  // Absolute, origin-qualified, and shaped like a plain site path (no query
  // string) so the link still works after being copied into FoundryVTT (or
  // anywhere else) — it doesn't depend on the paste destination's own origin.
  const openUrl = `${window.location.origin}${toCleanAdventurePath(targetPath)}`
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
  }
}

export default function AdventureMarkdownView({ content, basePath }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(basePath)}>
      {content}
    </ReactMarkdown>
  )
}
