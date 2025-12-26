import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/homepage'
import { AboutPage } from './pages/aboutpage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
    </Routes>
  )
}

export default App
