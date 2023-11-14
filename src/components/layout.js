import { Toaster } from 'react-hot-toast'
import MainHeader from './header'
import { Content } from '@carbon/react'

const Layout = ({ children }) => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <>
      <MainHeader logout={logout} />
      <Content children={children} />
      <Toaster />
    </>
  )
}

export default Layout
