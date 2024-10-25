import { Outlet, useLocation } from "react-router-dom"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import { Provider } from "react-redux"
import { store } from "../store/Store"
import { useEffect, useState } from "react"
import Sidebar from "../components/header/Sidebar"

function Layout() {
  const { pathname } = useLocation()
  const [sidebarFlag, setSidebarFlag] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  },[pathname])

  return (
    <Provider store={store}>
      <Header setSidebarFlag={setSidebarFlag} sidebarFlag={sidebarFlag} />
      <Sidebar sidebarFlag={sidebarFlag} setSidebarFlag={setSidebarFlag} />
      <Outlet />
      <Footer />
    </Provider>
  )
}

export default Layout