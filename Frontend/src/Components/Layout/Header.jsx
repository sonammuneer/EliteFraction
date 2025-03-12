// src/Components/Layout/Header.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"; // Import CSS for styling
import logo from "./Images/logo.png"; // Import the logo image

const Header = () => {
  const location = useLocation();

  // Check if the current route is SignUp or Login
  const isAuthPage = ["/User/SignUp", "/User/Login"].includes(location.pathname);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img 
            src={logo} 
            alt="Elite Fraction Logo" 
            className="logo-image"
          />
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/AboutUs">About Us</Link></li>
          <li><Link to="/how-it-works">How It Works</Link></li>
          <li><Link to="/explore-investments">Explore Investments</Link></li>
          <li><Link to="/pricing-benefits">Pricing & Benefits</Link></li>
          <li><Link to="/faqs">FAQs</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </nav>
      
      {!isAuthPage && (
        <div className="cta">
          <Link to="/User/SignUp" className="cta-button signup-button">Sign Up</Link>
          <Link to="/User/Login" className="cta-button login-button">Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
