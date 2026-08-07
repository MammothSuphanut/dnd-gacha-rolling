import { useState } from 'react'
import { Navigate, Route, Routes, matchPath, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import AdventureDocPage from './pages/AdventureDocPage'
import AdventureJournalPage from './pages/AdventureJournalPage'
import BoxManagerPage from './pages/BoxManagerPage'
import CampaignPage from './pages/CampaignPage'
import CharacterPage, { CharacterDetailPage } from './pages/CharacterPage'
import HomebrewRuleDocPage from './pages/HomebrewRuleDocPage'
import HomebrewRulesPage from './pages/HomebrewRulesPage'
import HomebrewSubclassDocPage from './pages/HomebrewSubclassDocPage'
import RollPage from './pages/RollPage'
import OptionsPage from './pages/OptionsPage'
import ShopPage from './pages/ShopPage'
import WorldPage from './pages/WorldPage'
import WorldSettingPage from './pages/WorldSettingPage'
import { GachaProvider } from './store/GachaStore'
import { ToastProvider } from './store/ToastContext'

// Routes meant to be opened in their own tab for distraction-free full-page
// reading (e.g. the campaign journal) skip the navbar entirely instead of
// just filling the space below it.
const STANDALONE_ROUTES = [
  '/campaigns/:campaignId/journal',
  '/world/:worldId',
  '/codex/*',
  '/homebrew-subclass/*',
  '/characters/:characterId',
]

function App() {
  const location = useLocation()
  const isStandalone = STANDALONE_ROUTES.some((pattern) => matchPath(pattern, location.pathname))

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
        <div className={isStandalone ? 'h-dvh bg-[#fdf8f0]' : 'flex h-dvh flex-col bg-[#fdf8f0]'}>
          {!isStandalone && <Navbar />}
          <div className={isStandalone ? 'h-full' : 'min-h-0 flex-1 overflow-y-auto'}>
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
              <Route path="/campaigns/:campaignId/journal" element={<AdventureJournalPage />} />
              <Route path="/options" element={<OptionsPage />} />
              <Route path="/world" element={<WorldPage />} />
              <Route path="/world/:worldId" element={<WorldSettingPage />} />
              <Route path="/codex" element={<HomebrewRulesPage />} />
              {/* Wildcard, not :slug — files live in per-category subfolders
                  (codex/<Category>/<Name>.md) so the slug itself contains a
                  "/". See HomebrewRuleDocPage.jsx. */}
              <Route path="/codex/*" element={<HomebrewRuleDocPage />} />
              {/* Wildcard, not :slug — files live in per-class subfolders
                  (homebrew-subclass/<ClassName>/<Name>.md) so the slug itself
                  contains a "/". See HomebrewSubclassDocPage.jsx. */}
              <Route path="/homebrew-subclass/*" element={<HomebrewSubclassDocPage />} />
              <Route path="/characters" element={<CharacterPage />} />
              <Route path="/characters/:characterId" element={<CharacterDetailPage />} />
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
