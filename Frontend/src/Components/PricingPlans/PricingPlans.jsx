import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingPlans.css';

const PricingPlans = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Medical Equipment');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const tabs = ['Medical Equipment', 'Cars', 'Yachts'];

  const pricingData = {
    'Medical Equipment': [
      { plan: 'Basic Plan', price: '$10,000 / Share', benefits: ['5% - 10% Ownership', 'Periodic Returns', 'Limited Voting Rights'] },
      { plan: 'Standard Plan', price: '$25,000 / Share', benefits: ['10% - 25% Ownership', 'Moderate Returns', 'Priority Income', 'Partial Voting Rights'] },
      { plan: 'Premium Plan', price: '$50,000 / Share', benefits: ['25% - 50% Ownership', 'Highest Returns', 'Full Voting Rights', 'Direct Leasing Profits'] },
    ],
    'Cars': [
      { plan: 'Basic Plan', price: '$10,000 / Share', benefits: ['5% - 10% Ownership', 'Limited Usage Rights', 'Passive Income'] },
      { plan: 'Standard Plan', price: '$25,000 / Share', benefits: ['10% - 25% Ownership', 'More Frequent Usage', 'Higher Revenue Share'] },
      { plan: 'Premium Plan', price: '$50,000 / Share', benefits: ['25% - 50% Ownership', 'Exclusive Usage Rights', 'Highest Revenue Share'] },
    ],
    'Yachts': [
      { plan: 'Basic Plan', price: '$10,000 / Share', benefits: ['5% - 10% Ownership', 'Limited Days Access', 'Revenue Share from Charters'] },
      { plan: 'Standard Plan', price: '$25,000 / Share', benefits: ['10% - 25% Ownership', 'Extended Access', 'Priority Booking', 'Better Charter Revenue Share'] },
      { plan: 'Premium Plan', price: '$50,000 / Share', benefits: ['25% - 50% Ownership', 'Unrestricted Usage', 'Highest Revenue Share', 'Special Maintenance Privileges'] },
    ]
  };

  const handleInvestNow = (planName) => {
    if (user) {
      // Redirect to the payment page if the user is logged in
      navigate('/buy-credits');
    } else {
      // Redirect to the login page if the user is not logged in
      navigate('/User/Login');
    }
  };

  return (
    <div className="pricing-plans-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="pricing-plans">
        {pricingData[activeTab].map((plan, index) => (
          <div key={index} className="plan-card">
            <h2>{plan.plan}</h2>
            <p>{plan.price}</p>
            <ul>
              {plan.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
            <button 
              className="invest-now" 
              onClick={() => handleInvestNow(plan.plan)}
            >
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
