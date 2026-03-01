import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "./css/navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onLogoutClick = () => {
    logout(); 
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false); 
    }
  };

  return (
    <nav className="main-nav">
      <div className="logo desktop-logo">
        <NavLink to="/" onClick={handleLinkClick}>
          <h2><span>V</span>ote<span className="for">F</span>or<span>C</span>hange</h2>
        </NavLink>
      </div>
      
      <div className={isMobileMenuOpen ? "menu-link mobile-active" : "menu-link"}>
        <div className="logo mobile-logo">
            <NavLink to="/" onClick={handleLinkClick}>
              <h2>VoteForChange</h2>
            </NavLink>
        </div>

        <ul>
          <li><NavLink to="/" className={({isActive}) => isActive ? "active-link" : ""} onClick={handleLinkClick}>Home</NavLink></li>
          <li><NavLink to="/About" className={({isActive}) => isActive ? "active-link" : ""} onClick={handleLinkClick}>About</NavLink></li>
          <li><NavLink to="/Service" className={({isActive}) => isActive ? "active-link" : ""} onClick={handleLinkClick}>Features</NavLink></li>
          <li><NavLink to="/Contact" className={({isActive}) => isActive ? "active-link" : ""} onClick={handleLinkClick}>Contact Us</NavLink></li>
          
          {isAuthenticated && user?.role === 'user' && (
            <li><NavLink to="/voting" className={({isActive}) => isActive ? "active-link" : ""} onClick={handleLinkClick}>Voting</NavLink></li>
          )}

          {isAuthenticated && user?.role === 'admin' && (
            <li><NavLink to="/onlinevoting" className={({isActive}) => isActive ? "active-link" : ""} onClick={handleLinkClick}>Create Poll</NavLink></li>
          )}
          
          {isAuthenticated && (
            <li><NavLink to="/profile" className={({isActive}) => isActive ? "active-link" : ""} onClick={handleLinkClick}>Profile</NavLink></li>
          )}
          
          <li>
            {isAuthenticated ? (
              <button onClick={onLogoutClick} className="logout-button">Logout</button>
            ) : (
              <NavLink to="/Login" className="login-button" onClick={handleLinkClick}>Login</NavLink>
            )}
          </li>
        </ul>
      </div>

      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
