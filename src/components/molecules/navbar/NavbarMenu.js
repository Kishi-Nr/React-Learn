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
        <Image src="/img/navbar/satu_data.png" /> {/* Update the path to your logo image */}
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
            <Label className="navbar-item">Publikasi</Label> {/* Use Label component */}
          </Link>
        </li>
        <li>
          <Link to="/dataset">
            <Label className="navbar-item">DataSet</Label> {/* Use Label component */}
          </Link>
        </li>
        <li>
          <Link to="/dataset">
            <Label className="logout-button" onClick={handleLogout}>Logout</Label> {/* Use Label component */}
          </Link>
        </li>
        {/* Dropdown menu for Menu item */}
        </ul>
    </nav>
  );
};

export default NavbarMenu;
