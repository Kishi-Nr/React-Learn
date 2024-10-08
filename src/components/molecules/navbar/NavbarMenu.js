// src/components/molecules/navbar/NavbarMenu.js
import React from "react";
import NavbarItem from "../../atoms/navbar/NavbarItem";

const NavbarMenu = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        < NavbarItem label="Logo"/>
      </div>
      <ul className="navbar-menu">
        <NavbarItem label="About" />
        <NavbarItem label="Work" />
        <NavbarItem label="Contact" />
      </ul>
    </nav>
  );
};

export default NavbarMenu;
