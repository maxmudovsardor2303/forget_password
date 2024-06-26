import { NavLink } from 'react-router-dom'
import Logo from "../../../assets/json logo.jpg"
import './sidebar.css'
NavLink
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <img src={Logo} alt="logo" />
        <NavLink to="/main" className="navlink" >
            Users
        </NavLink>
        <NavLink to="/main/brand" className="navlink" >
           Posts
        </NavLink>
        <NavLink to="/main/todos" className="navlink" >
           Todos
        </NavLink>
        <NavLink to="/main/albums" className="navlink" >
           Albums
        </NavLink>
        <NavLink to="/main/photos" className="navlink" >
           Photos
        </NavLink>
        <NavLink to="/main/comments" className="navlink" >
           Comments
        </NavLink>
        <NavLink to="/main/newcar" className="navlink" >
           New Car
        </NavLink>
        <NavLink to="/" className="logout">
           Log Out
        </NavLink>
    </div>
  )
}

export default Sidebar