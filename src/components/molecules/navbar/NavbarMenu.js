import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../atoms/Image"; // Import Image component
import Label from "../../atoms/Label"; // Import Label component
import '../../../styles/Navbar.css'; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NavbarMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicking outside of the dropdown area
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const navigate = useNavigate(); // Use useNavigate for navigation

  // Function to handle logout
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Also remove login or userInfo data if stored
    localStorage.removeItem('nip');
    localStorage.removeItem('userInfo');

    // Redirect user back to the login page
    navigate('/login', { replace: true }); // Use replace to prevent going back to previous page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Use Image component for logo */}
        <Image src="/img/to/logo.png" /> {/* Update the path to your logo image */}
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">
            <Label className="navbar-item">Home</Label> {/* Use Label component */}
          </Link>
        </li>
        <li>
          <Link to="/sektoral">
            <Label className="navbar-item">Sektoral</Label> {/* Use Label component */}
          </Link>
        </li>
        <li>
          <Link to="/buku">
            <Label className="navbar-item">Buku</Label> {/* Use Label component */}
          </Link>
        </li>
        <li>
          <Link to="/dataset">
            <Label className="navbar-item">DataSet</Label> {/* Use Label component */}
          </Link>
        </li>
        {/* Dropdown menu for Menu item */}
        <li className="menu-dropdown" onMouseLeave={closeDropdown}>
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            <Label className="navbar-item">Menu</Label> {/* Use Label component */}
          </div>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li className="dropdown-divider"></li> {/* Divider for separation */}
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarMenu;
