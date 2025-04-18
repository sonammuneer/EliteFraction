import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Import global styles
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import ResetPassword from "./Components/User/ResetPassword"; 
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import UserProfilePage from "./Components/User/UserProfilePage";
import FAQ from "./Components/FAQ/FAQ";
import NewInvestment from "./Components/NewInvestment/NewInvestment";
import ExploreInvestment from "./Components/ExploreInvestment/ExploreInvestment";
import CommunityChatPage from './Components/CommunityChatPage/CommunityChatPage';
import PricingPlans from './Components/PricingPlans/PricingPlans';
import Payment from "./Components/Payment/Payment";
import AnalyticsPage from "./Components/Analytics/AnalyticsPage";
import UserManagement from "./Components/User/UserManagement";
import MyInvestment from "./Components/MyInvestment/MyInvestment";

console.log("App component rendered");

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header /> {/* Header appears on every page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/User/SignUp" element={<SignUp />} />
          <Route path="/User/Login" element={<Login />} />
          <Route path="/User/ResetPassword" element={<ResetPassword />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/User/UserProfilePage" element={<UserProfilePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/new-investment" element={<NewInvestment />} />
          <Route path="/explore-investment" element={<ExploreInvestment />} />
          <Route path="/community-chat" element={<CommunityChatPage />} />
          <Route path="/pricing-benefits" element={<PricingPlans />} />
          <Route path="/buy-credits" element={<Payment />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/my-investments" element={<MyInvestment />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
