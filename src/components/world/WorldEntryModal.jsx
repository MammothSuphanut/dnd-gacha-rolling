import Modal from '../Modal'
import AdventureMarkdownView from '../AdventureMarkdownView'
import WorldSourceList from './WorldSourceList'

export default function WorldEntryModal({ card, onClose }) {
  return (
    <Modal open={!!card} onClose={onClose} title={card?.title} size="lg">
      {card && (
        <>
          {card.content ? (
            <AdventureMarkdownView content={card.content} basePath={card.contentPath} />
          ) : (
            <p className="text-sm text-stone-400">ยังไม่มีเนื้อหารายละเอียดสำหรับรายการนี้</p>
          )}
          <WorldSourceList sources={card.sources} />
        </>
      )}
    </Modal>
  )
}
