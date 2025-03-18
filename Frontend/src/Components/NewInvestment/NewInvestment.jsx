import React, { useState } from "react";
import "./NewInvestment.css";

const NewInvestment = () => {
  const [selectedCategory, setSelectedCategory] = useState("luxury-cars");
  const [investmentData, setInvestmentData] = useState({
    name: "",
    price: "",
    manufacturer: "",
    engine: "",
    horsepower: "",
    topSpeed: "",
    fuelType: "",
    transmission: "",
    investmentType: "fractional",
    sharesAvailable: "",
    roi: "",
    features: "",
    mainImage: null,
    gallery: [],
    videoUrl: "",
    pdf: null,
  });

  const categories = [
    { id: "luxury-cars", name: "Luxury Cars" },
    { id: "yachts", name: "Yachts" },
    { id: "medical-equipment", name: "Medical Equipment" }
  ];

  const handleChange = (e) => {
    setInvestmentData({ ...investmentData, [e.target.name]: e.target.value });
  };

  const handleMainImageUpload = (e) => {
    setInvestmentData({ ...investmentData, mainImage: URL.createObjectURL(e.target.files[0]) });
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const newGallery = files.map(file => URL.createObjectURL(file));
    setInvestmentData({ ...investmentData, gallery: [...investmentData.gallery, ...newGallery] });
  };

  const handlePdfUpload = (e) => {
    setInvestmentData({ ...investmentData, pdf: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Investment Data Submitted:", investmentData);
    alert("Investment Successfully Created!");
  };

  return (
    <div className="new-investment-page">
      <h1>Create a New Investment</h1>

      <div className="category-selection">
        {categories.map((category) => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? "active" : ""}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <form className="investment-form" onSubmit={handleSubmit}>
        <label>Investment Name:</label>
        <input type="text" name="name" value={investmentData.name} onChange={handleChange} required />

        <label>Price:</label>
        <input type="text" name="price" value={investmentData.price} onChange={handleChange} required />

        <label>Manufacturer:</label>
        <input type="text" name="manufacturer" value={investmentData.manufacturer} onChange={handleChange} required />

        {selectedCategory === "luxury-cars" && (
          <>
            <label>Engine Type:</label>
            <input type="text" name="engine" value={investmentData.engine} onChange={handleChange} required />

            <label>Horsepower (HP):</label>
            <input type="text" name="horsepower" value={investmentData.horsepower} onChange={handleChange} required />

            <label>Top Speed (km/h):</label>
            <input type="text" name="topSpeed" value={investmentData.topSpeed} onChange={handleChange} required />

            <label>Fuel Type:</label>
            <input type="text" name="fuelType" value={investmentData.fuelType} onChange={handleChange} required />

            <label>Transmission:</label>
            <input type="text" name="transmission" value={investmentData.transmission} onChange={handleChange} required />
          </>
        )}

        <label>Investment Type:</label>
        <select name="investmentType" value={investmentData.investmentType} onChange={handleChange}>
          <option value="fractional">Fractional Ownership</option>
          <option value="full">Full Purchase</option>
        </select>

        {investmentData.investmentType === "fractional" && (
          <>
            <label>Shares Available:</label>
            <input type="text" name="sharesAvailable" value={investmentData.sharesAvailable} onChange={handleChange} required />
          </>
        )}

        <label>Expected ROI / Benefits:</label>
        <input type="text" name="roi" value={investmentData.roi} onChange={handleChange} required />

        <label>Key Features (comma separated):</label>
        <input type="text" name="features" value={investmentData.features} onChange={handleChange} required />

        <label>Upload Main Image:</label>
        <input type="file" accept="image/*" onChange={handleMainImageUpload} required />
        {investmentData.mainImage && <img src={investmentData.mainImage} alt="Main Preview" className="preview-image" />}

        <label>Upload Gallery Images:</label>
        <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
        <div className="image-gallery">
          {investmentData.gallery.map((img, index) => (
            <img key={index} src={img} alt={`Gallery ${index}`} className="gallery-image" />
          ))}
        </div>

        <label>YouTube Video URL:</label>
        <input type="text" name="videoUrl" value={investmentData.videoUrl} onChange={handleChange} />
        {investmentData.videoUrl && (
          <iframe
            width="100%"
            height="200"
            src={investmentData.videoUrl.replace("watch?v=", "embed/")}
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}

        <label>Upload PDF (Brochure/Details):</label>
        <input type="file" accept="application/pdf" onChange={handlePdfUpload} required />
        {investmentData.pdf && <p>PDF Uploaded: {investmentData.pdf.name}</p>}

        <button type="submit" className="submit-btn">Create Investment</button>
      </form>
    </div>
  );
};

export default NewInvestment;
