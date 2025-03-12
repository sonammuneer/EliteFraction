import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Import global styles
import Home from "./Components/Home/Home"; // Home Component
import AboutUs from "./Components/AboutUs/AboutUs"; // About Us Component
import Contact from "./Components/Contact/Contact"; // Contact Component
import Footer from "./Components/Layout/Footer"; // Footer Component
import Header from "./Components/Layout/Header"; // Header Component
import SignUp from "./Components/User/SignUp"; // ✅ Correct import
import Login from "./Components/User/Login"; 
import HowItWorks from "./Components/HowItWorks/HowItWorks";

console.log("App component rendered");
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header /> {/* Header appears on every page */}
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/User/SignUp" element={<SignUp />} /> {/* ✅ Correct route */}
          <Route path="/User/Login" element={<Login />} /> {/* ✅ Correct route */}
          <Route path="/how-it-works" element={<HowItWorks />} /> {/* ✅ Correct route */}
        </Routes>
        <Footer /> {/* Footer appears on every page */}
      </div>
    </Router>
  );
}

export default App;