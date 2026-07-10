import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import BoxManagerPage from './pages/BoxManagerPage'
import RollPage from './pages/RollPage'
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
  })
  const [visibility, setVisibility] = useState({
    hiddenBoxIds: new Set(),
    showStatRoll: true,
  })

  return (
    <ToastProvider>
      <GachaProvider>
        <div className="min-h-screen bg-gray-50">
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
          </Routes>
        </div>
      </GachaProvider>
    </ToastProvider>
  )
}

export default App
