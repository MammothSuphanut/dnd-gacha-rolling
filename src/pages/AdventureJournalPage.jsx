import { Link, useParams } from 'react-router-dom'
import AdventureJournalView from '../components/AdventureJournalView'
import { useGachaStore } from '../store/GachaStore'

export default function AdventureJournalPage() {
  const { campaignId } = useParams()
  const { state } = useGachaStore()
  const campaign = (state.campaigns ?? []).find((c) => c.id === campaignId) ?? null

  if (!campaign) {
    return (
      <div className="w-full p-4 md:p-8">
        <p className="mb-2 text-sm text-stone-400">ไม่พบแคมเปญนี้</p>
        <Link to="/campaigns" className="text-sm text-violet-700 underline">
          ← กลับไปหน้าแคมเปญ
        </Link>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <AdventureJournalView campaign={campaign} />
    </div>
  )
}
