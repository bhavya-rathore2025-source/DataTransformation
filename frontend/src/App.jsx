import { Routes, Route } from 'react-router-dom'
import { GoldPage } from './pages/goldpage'
import { BronzePage } from './pages/bronzepage'
import { Dashboard } from './pages/dashboard'
import { SilverPage } from './pages/silverpage'
import { Visualization } from './pages/visualization'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/silver' element={<SilverPage />} />
      <Route path='/bronze' element={<BronzePage />} />
      <Route path='/gold' element={<GoldPage />} />
      <Route path='/visualization' element={<Visualization />} />
    </Routes>
  )
}

export default App
