import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "./Images/logo.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state and update on initial render and on localStorage change
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]); // Trigger the effect when route changes

  const isAuthPage = ["/User/SignUp", "/User/Login"].includes(location.pathname);

  const handleAuthClick = () => {
    navigate("/User/Login");
  };

  const handleLogoClick = () => {
    navigate("/Home");
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Elite Fraction Logo" className="logo-image" />
      </div>

      <nav className="nav">
        <ul>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/AboutUs">About Us</Link></li>
          <li><Link to="/how-it-works">How It Works</Link></li>
          <li 
            className="dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link to="/explore-investment" className="dropdown-link">
              Explore Investments ▾
            </Link>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/explore-investments/Yatch">Yacht</Link></li>
                <li><Link to="/explore-investments/MedicalEquipment">Medical Equipment</Link></li>
                <li><Link to="/explore-investments/LuxuryCar">Luxury Car</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/pricing-benefits">Pricing & Benefits</Link></li>
          <li><Link to="/faq">FAQs</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </nav>
      
      {/* Conditionally render based on login state */}
      {!isAuthPage && (
        <div className="cta">
          {isLoggedIn ? (
            <Link to="/User/UserProfilePage" className="cta-button dashboard-button">Dashboard</Link>
          ) : (
            <button onClick={handleAuthClick} className="cta-button auth-button">
              Login/SignUp
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
