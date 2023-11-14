import Layout from './components/layout'
import Home from './pages/home'
import Login from './pages/login'
import './style/index.scss'
import { Route, Routes } from 'react-router-dom'
import { getCookie } from './api/cookie'

function App() {
  if (!localStorage.getItem('token')) return <Login />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default App
