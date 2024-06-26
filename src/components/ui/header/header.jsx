import React from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";



const Header = () => {
  return (
    <div className="header bg-blue">
      <nav className="navbar navbar-light ">
        <div className="container-fluid">
          <a className="navbar-brand"></a>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-border-primary btn-outline-primary text-color-white" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
