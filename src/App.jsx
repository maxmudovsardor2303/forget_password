import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"
function App() {

  return (
    <>
    <ToastContainer />
    <Outlet/>
    </>
  )
}

export default App
