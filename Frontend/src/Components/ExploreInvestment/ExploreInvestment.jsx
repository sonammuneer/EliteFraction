import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExploreInvestment.css";

const ExploreInvestment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [investmentData, setInvestmentData] = useState([]);

  // Fetch Investments from API
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/investments");
        setInvestmentData(response.data);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    fetchInvestments();
  }, []);

  const filteredInvestments = investmentData.filter((investment) => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || investment.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="investment-listings-container">
      <h1 className="title">Explore Investment Opportunities</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search investments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Investments</option>
          <option value="luxury-cars">Luxury Cars</option>
          <option value="yachts">Yachts</option>
          <option value="medical-equipment">Medical Equipment</option>
        </select>
      </div>

      <div className="investment-grid">
        {filteredInvestments.map((investment) => (
          <div key={investment._id} className="investment-card">
            {investment.mainImage && (
              <img src={investment.mainImage} alt={investment.name} className="investment-image" />
            )}
            <div className="investment-content">
              <h2 className="investment-title">{investment.name}</h2>
              <p className="investment-price">Price: {investment.price}</p>
              <p className="investment-shares">Shares Available: {investment.sharesAvailable}</p>
              <p className="investment-roi">Expected ROI: {investment.roi}</p>
              <p className="investment-features">Features: {investment.features}</p>
              {investment.videoUrl && (
                <iframe
                  width="100%"
                  height="200"
                  src={investment.videoUrl.replace("watch?v=", "embed/")}
                  title="Investment Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
              <button className="invest-button">Invest Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreInvestment;
