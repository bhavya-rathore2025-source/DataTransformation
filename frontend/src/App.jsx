import { Routes, Route } from 'react-router-dom'

import { BronzePage } from './pages/bronzepage'
import { Dashboard } from './pages/dashboard'
import { SilverPage } from './pages/silverpage'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/silver' element={<SilverPage />} />
      <Route path='/bronze' element={<BronzePage />} />
    </Routes>
  )
}

export default App
