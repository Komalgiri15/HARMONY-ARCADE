import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppLayout } from './components/layout/AppLayout'
import { Start } from './pages/Start'
import { Hub } from './pages/Hub'
import { Game1 } from './games/game1/Game1'
import { Game2 } from './games/game2/Game2'
import { Game3 } from './games/game3/Game3'

export default function App() {
  const location = useLocation()
  const isStart = location.pathname === '/'

  return (
    <AppLayout fullBleed={isStart}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Start />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/game/game1" element={<Game1 />} />
          <Route path="/game/game2" element={<Game2 />} />
          <Route path="/game/game3" element={<Game3 />} />
        </Routes>
      </AnimatePresence>
    </AppLayout>
  )
}
