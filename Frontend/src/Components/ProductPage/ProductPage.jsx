import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

const ProductPageFractionalOwnership = () => {
  const { investmentId } = useParams();
  const [investmentData, setInvestmentData] = useState(null);

  useEffect(() => {
    // Fetch investment data based on the investmentId
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/investments/${investmentId}`);
        const data = await response.json();
        setInvestmentData(data);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    fetchData();
  }, [investmentId]);

  if (!investmentData) return <div>Loading...</div>;

  return (
    <div className="product-page">
      <h1>{investmentData.name}</h1>
      <img src={investmentData.mainImage} alt={investmentData.name} className="main-image" />

      <div className="investment-details">
        <p>Price: {investmentData.price}</p>
        <p>Manufacturer: {investmentData.manufacturer}</p>
        <p>Investment Type: {investmentData.investmentType}</p>
        <p>Shares Available: {investmentData.sharesAvailable}</p>
        <p>Expected ROI: {investmentData.roi}</p>
        <p>Features: {investmentData.features}</p>
      </div>

      <div className="gallery">
        {investmentData.gallery.map((img, index) => (
          <img key={index} src={img} alt={`Gallery ${index}`} className="gallery-image" />
        ))}
      </div>

      {investmentData.videoUrl && (
        <div className="video-container">
          <iframe
            width="100%"
            height="400"
            src={investmentData.videoUrl.replace("watch?v=", "embed/")}
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {investmentData.pdf && (
        <div className="pdf-container">
          <a href={URL.createObjectURL(investmentData.pdf)} target="_blank" rel="noopener noreferrer">View Investment Brochure</a>
        </div>
      )}

      <button className="invest-btn">Invest Now</button>
    </div>
  );
};

export default ProductPageFractionalOwnership;
