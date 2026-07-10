import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import BoxManagerPage from './pages/BoxManagerPage'
import RollPage from './pages/RollPage'
import StatRollPage from './pages/StatRollPage'
import { GachaProvider } from './store/GachaStore'
import { ToastProvider } from './store/ToastContext'

function App() {
  return (
    <ToastProvider>
      <GachaProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/roll" replace />} />
            <Route path="/roll" element={<RollPage />} />
            <Route path="/stats" element={<StatRollPage />} />
            <Route path="/boxes" element={<BoxManagerPage />} />
          </Routes>
        </div>
      </GachaProvider>
    </ToastProvider>
  )
}

export default App
