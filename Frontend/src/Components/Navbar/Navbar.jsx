import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/how-it-works">How It Works</Link></li>
        <li><Link to="/explore-investment">Explore Investments</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/new-investment">New Investment</Link></li>
        <li><Link to="/user/signup">Sign Up</Link></li>
        <li><Link to="/user/login">Login</Link></li>
        <li><Link to="/User/ResetPassword">Reset Password</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
