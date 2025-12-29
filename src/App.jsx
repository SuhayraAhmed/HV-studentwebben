// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ITSupport from './pages/ITSupport'
import Felanmalan from './pages/Felanmalan'
import NyStudent from './pages/NyStudent'
// Bibliotek har tagits bort här

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/it-support" element={<ITSupport />} />
          <Route path="/felanmalan" element={<Felanmalan />} />
          <Route path="/ny-student" element={<NyStudent />} />
          {/* Ta bort Bibliotek-routen här */}
          {/* <Route path="/bibliotek" element={<Bibliotek />} /> */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App