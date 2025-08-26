import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
  <Route path="services" element={<Services />} />
  <Route path="contact" element={<Contact />} />
  <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
