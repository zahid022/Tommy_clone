import { Outlet, useLocation } from "react-router-dom"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import { Provider } from "react-redux"
import { store } from "../store/Store"
import { useEffect } from "react"

function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  },[pathname])

  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  )
}

export default Layout