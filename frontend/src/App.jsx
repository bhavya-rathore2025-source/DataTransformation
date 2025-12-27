import { Routes, Route } from 'react-router-dom'

import { AboutPage } from './pages/aboutpage'
import { BronzePage } from './pages/bronzepage'
import { Dashboard } from './pages/dashboard'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/bronze' element={<BronzePage />} />
    </Routes>
  )
}

export default App
