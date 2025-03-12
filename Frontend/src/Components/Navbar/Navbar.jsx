import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about-us">About Us</Link></li>
      <li><Link to="/how-it-works">How It Works</Link></li>
      <li><Link to="/explore-investments">Explore Investments</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/user/signup">Sign Up</Link></li>
      <li><Link to="/user/login">Login</Link></li>
    </ul>
  );
};

export default Navbar;
