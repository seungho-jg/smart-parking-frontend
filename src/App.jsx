import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Reservations from './pages/Reservations'
import MyPage from './pages/MyPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}

export default App
