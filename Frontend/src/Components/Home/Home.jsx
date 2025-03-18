import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Home.css";

// Import images
import picture1 from "./Images/picture 1.jpeg";
import picture4 from "./Images/picture 4.jpg";
import picture7 from "./Images/picture 7.jpg";
import picture10 from "./Images/picture 10.jpg";
import picture3 from "./Images/picture 3.jpg";
import picture6 from "./Images/picture 6.jpg";
import picture8 from "./Images/picture 8.jpg";

function Home() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/v1/testimonials");
        setTestimonials(response.data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className="hero-swiper"
        >
          <SwiperSlide>
            <div className="banner-slide" style={{ backgroundImage: `url(${picture10.replace(/ /g, "%20")})` }}>
              <h2>Exclusive Investment Opportunities</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner-slide" style={{ backgroundImage: `url(${picture4.replace(/ /g, "%20")})` }}>
              <h2>Luxury Yachts for Shared Ownership</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner-slide" style={{ backgroundImage: `url(${picture7.replace(/ /g, "%20")})` }}>
              <h2>Medical Innovations for the Future</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="banner-slide" style={{ backgroundImage: `url(${picture1.replace(/ /g, "%20")})` }}>
              <h2>Own a Piece of Automotive Excellence</h2>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Overview Section */}
      <section className="overview">
        <h2>What is Fractional Ownership?</h2>
        <p>Fractional ownership allows multiple investors to own a share of high-value assets such as luxury cars, yachts, and medical equipment.</p>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Investments</h2>
        <div className="product-grid">
          <div className="product">
            <img src={picture8} alt="Luxury Car" />
            <h3>Luxury Car</h3>
          </div>
          <div className="product">
            <img src={picture6} alt="Yacht" />
            <h3>Yacht</h3>
          </div>
          <div className="product">
            <img src={picture3} alt="Medical Equipment" />
            <h3>Medical Equipment</h3>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Invest?</h2>
        <Link to="/User/login" className="cta-button">Invest Now</Link>
      </section>


      {/* Investment Highlights */}
      <section className="investment-highlights">
        <h2>Why Choose Fractional Ownership?</h2>
        <ul>
          <li>Lower cost of entry</li>
          <li>Access to high-value assets</li>
          <li>Passive income opportunities</li>
          <li>Reduced maintenance costs</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
