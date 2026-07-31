import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import AdventureDocPage from './pages/AdventureDocPage'
import BoxManagerPage from './pages/BoxManagerPage'
import CampaignPage from './pages/CampaignPage'
import CharacterPage from './pages/CharacterPage'
import RollPage from './pages/RollPage'
import OptionsPage from './pages/OptionsPage'
import ShopPage from './pages/ShopPage'
import WorldPage from './pages/WorldPage'
import WorldSettingPage from './pages/WorldSettingPage'
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
    shopAdjustments: {},
    overallAdjustment: { sign: '+', mode: 'percent', value: '' },
  })
  const [sellCartState, setSellCartState] = useState({
    items: [],
    shopAdjustments: {},
    overallAdjustment: { sign: '+', mode: 'percent', value: '' },
  })

  return (
    <ToastProvider>
      <GachaProvider>
        {/* h-dvh + the flex-1 overflow-y-auto wrapper below make the navbar a
            fixed-height flex item and the routed page fill exactly the rest
            of the viewport — most pages just scroll inside that wrapper like
            they used to scroll the window, but it also lets a page (e.g.
            WorldSettingPage's map) opt into filling that space exactly with
            its own internal flex layout instead of ever needing the window
            to scroll. */}
        <div className="flex h-dvh flex-col bg-[#fdf8f0]">
          <Navbar />
          <div className="min-h-0 flex-1 overflow-y-auto">
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
                element={
                  <ShopPage
                    cartState={cartState}
                    setCartState={setCartState}
                    sellCartState={sellCartState}
                    setSellCartState={setSellCartState}
                  />
                }
              />
              <Route path="/campaigns" element={<CampaignPage />} />
              <Route path="/options" element={<OptionsPage />} />
              <Route path="/world" element={<WorldPage />} />
              <Route path="/world/:worldId" element={<WorldSettingPage />} />
              <Route path="/characters" element={<CharacterPage />} />
              {/* Catch-all: lets links copied out of a journal (e.g. into FoundryVTT) resolve
                  as plain "/some-file.md" paths instead of a query-string route. Must stay last. */}
              <Route path="*" element={<AdventureDocPage />} />
            </Routes>
          </div>
        </div>
      </GachaProvider>
    </ToastProvider>
  )
}

export default App
