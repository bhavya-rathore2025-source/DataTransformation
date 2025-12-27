import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/homepage'
import { AboutPage } from './pages/aboutpage'
import { BronzePage } from './pages/bronzepage'
import { Dashboard } from './pages/dashboard'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/bronze' element={<BronzePage />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App
