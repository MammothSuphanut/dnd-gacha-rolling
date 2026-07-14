import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import BoxManagerPage from './pages/BoxManagerPage'
import CampaignPage from './pages/CampaignPage'
import CharacterPage from './pages/CharacterPage'
import RollPage from './pages/RollPage'
import ShopPage from './pages/ShopPage'
import { GachaProvider } from './store/GachaStore'
import { ToastProvider } from './store/ToastContext'

function App() {
  const [rollState, setRollState] = useState({
    config: {},
    boxResults: {},
    revealedIds: new Set(),
  })
  const [statRollState, setStatRollState] = useState({
    results: [],
    assignments: {},
    bonuses: {},
    minTotal: 75,
  })
  const [visibility, setVisibility] = useState({
    selectedBoxId: {},
    showStatRoll: true,
    defaultVisibilityApplied: false,
  })
  const [cartState, setCartState] = useState({
    items: [],
    shopDiscounts: {},
    overallDiscount: { type: 'percent', value: '' },
  })

  return (
    <ToastProvider>
      <GachaProvider>
        <div className="min-h-screen bg-[#fdf8f0]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/roll" replace />} />
            <Route path="/stats" element={<Navigate to="/roll" replace />} />
            <Route
              path="/roll"
              element={
                <RollPage
                  rollState={rollState}
                  setRollState={setRollState}
                  statRollState={statRollState}
                  setStatRollState={setStatRollState}
                  visibility={visibility}
                  setVisibility={setVisibility}
                />
              }
            />
            <Route path="/boxes" element={<BoxManagerPage />} />
            <Route
              path="/shop"
              element={<ShopPage cartState={cartState} setCartState={setCartState} />}
            />
            <Route path="/campaigns" element={<CampaignPage />} />
            <Route path="/characters" element={<CharacterPage />} />
          </Routes>
        </div>
      </GachaProvider>
    </ToastProvider>
  )
}

export default App
