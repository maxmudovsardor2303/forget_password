import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../../components/ui/sidebar/sidebar"
import Header from "../../components/ui/header/header"
import ResponsiveDrawer from "../../components/layout"
import './main.css'
import { useEffect } from "react"
const Main = () => {
  const navigate = useNavigate()
  useEffect(()=> {
    if (!localStorage.getItem("access_token")) {
      navigate("/")
    }
  },[])
  return (
    <div>
      <ResponsiveDrawer/>
    </div>
    // <div className="main-layout">
    //     <Sidebar/>
    //     <div className="main-left">
    //         <Header/>
    //         <main>
    //             <Outlet/>
    //         </main>
    //     </div>
    // </div>
  )
}

export default Main