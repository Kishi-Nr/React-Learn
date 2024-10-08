
import React from "react";
import NavbarMenu from "../molecules/navbar/NavbarMenu"; 
import "../../styles/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
      </div>
      <NavbarMenu />
    </nav>
  );
};

export default Navbar;
