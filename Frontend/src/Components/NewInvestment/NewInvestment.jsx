import React, { useState } from "react";
import "./NewInvestment.css";

const NewInvestment = () => {
  const [selectedCategory, setSelectedCategory] = useState("luxury-cars");
  const [activeTab, setActiveTab] = useState("basic");
  const [investmentData, setInvestmentData] = useState({
    // Basic Information
    name: "",
    category: "luxury-cars",
    description: "",
    price: "", // AUD
    
    // Investment Details
    investmentType: "fractional",
    sharesAvailable: "",
    sharePrice: "", // AUD
    minShares: 1,
    expectedROI: "",
    
    // Operational Costs
    annualCosts: "", // AUD
    location: "",
    
    // Media
    images: [],
    videoUrl: ""
  });

  const categories = [
    { id: "luxury-cars", name: "Luxury Cars" },
    { id: "yachts", name: "Yachts" },
    { id: "medical-equipment", name: "Medical Equipment" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestmentData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setInvestmentData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Investment Data Submitted:", investmentData);
    alert("Investment Successfully Created!");
  };

  const renderBasicInfoTab = () => (
    <div className="form-tab">
      <div className="form-group">
        <label>Category*</label>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              type="button"
              className={selectedCategory === category.id ? "active" : ""}
              onClick={() => {
                setSelectedCategory(category.id);
                setInvestmentData(prev => ({ ...prev, category: category.id }));
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Asset Name*</label>
        <input
          type="text"
          name="name"
          value={investmentData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Description*</label>
        <textarea
          name="description"
          value={investmentData.description}
          onChange={handleChange}
          required
          rows="5"
        />
      </div>
      
      <div className="form-group">
        <label>Total Value (AUD)*</label>
        <input
          type="number"
          name="price"
          value={investmentData.price}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );

  const renderInvestmentDetailsTab = () => (
    <div className="form-tab">
      <div className="form-group">
        <label>Investment Type*</label>
        <select
          name="investmentType"
          value={investmentData.investmentType}
          onChange={handleChange}
          required
        >
          <option value="fractional">Fractional Ownership</option>
          <option value="full">Full Purchase</option>
        </select>
      </div>
      
      {investmentData.investmentType === "fractional" && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Total Shares*</label>
              <input
                type="number"
                name="sharesAvailable"
                value={investmentData.sharesAvailable}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Share Price (AUD)*</label>
              <input
                type="number"
                name="sharePrice"
                value={investmentData.sharePrice}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Min Shares*</label>
              <input
                type="number"
                name="minShares"
                value={investmentData.minShares}
                onChange={handleChange}
                required
                min="1"
              />
            </div>
            
            <div className="form-group">
              <label>Expected ROI (%)*</label>
              <input
                type="number"
                name="expectedROI"
                value={investmentData.expectedROI}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </>
      )}
      
      <div className="form-group">
        <label>Annual Costs (AUD)*</label>
        <input
          type="number"
          name="annualCosts"
          value={investmentData.annualCosts}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Location*</label>
        <input
          type="text"
          name="location"
          value={investmentData.location}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );

  const renderMediaTab = () => (
    <div className="form-tab">
      <div className="form-group">
        <label>Images*</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          required
        />
        <div className="image-preview">
          {investmentData.images.map((img, index) => (
            <div key={index} className="preview-item">
              <img src={img} alt={`Preview ${index}`} />
              <button 
                type="button" 
                onClick={() => setInvestmentData(prev => ({
                  ...prev,
                  images: prev.images.filter((_, i) => i !== index)
                }))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label>Video URL</label>
        <input
          type="url"
          name="videoUrl"
          value={investmentData.videoUrl}
          onChange={handleChange}
          placeholder="https://example.com/video"
        />
      </div>
    </div>
  );

  // Tab navigation
  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "investment", label: "Investment" },
    { id: "media", label: "Media" }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case "basic": return renderBasicInfoTab();
      case "investment": return renderInvestmentDetailsTab();
      case "media": return renderMediaTab();
      default: return null;
    }
  };

  return (
    <div className="new-investment-page">
      <h1>Create New Investment</h1>
      
      <div className="form-tabs">
        <div className="tab-header">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSubmit}>
          {renderTabContent()}
          
          <div className="form-actions">
            {activeTab !== "basic" && (
              <button 
                type="button" 
                onClick={() => {
                  const currentIndex = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[currentIndex - 1].id);
                }}
              >
                Previous
              </button>
            )}
            
            {activeTab !== "media" ? (
              <button 
                type="button" 
                onClick={() => {
                  const currentIndex = tabs.findIndex(t => t.id === activeTab);
                  setActiveTab(tabs[currentIndex + 1].id);
                }}
              >
                Next
              </button>
            ) : (
              <button type="submit">Create Investment</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvestment;