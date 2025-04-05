import React from "react";
import "./AboutUs.css";
import heroImage from "../../Image/AboutUs/hero-image.jpg"; // Adjust the path according to your folder structure

function AboutUs() {
  return (
    <div className="about-us-container">
      
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay">
          <h1>About Us</h1>
          <p>Revolutionizing luxury asset ownership through innovation and fractional investments.</p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="mission-vision">
        <div className="mission">
          <h2>Our Mission</h2>
          <p>To provide an innovative platform where individuals can experience luxury ownership without the financial burden of full investment.</p>
        </div>
        <div className="vision">
          <h2>Our Vision</h2>
          <p>To be the most trusted and accessible fractional ownership provider in the high-end luxury market.</p>
        </div>
      </section>

      {/* Project Timeline Section */}
      <section className="timeline">
        <h2>Our Project Journey</h2>
        <div className="timeline-grid">
          <div className="timeline-item">
            <span className="year">October 2024</span>
            <p>Project kick-off with a dedicated team of experts.</p>
          </div>
          <div className="timeline-item">
            <span className="year">May 2025</span>
            <p>Expected launch of our platform, bringing luxury ownership within reach.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <h3>Kapil Satish Raina</h3>
            <p>ID: 8229144</p>
          </div>
          <div className="team-member">
            <h3>Lancy Dsouza</h3>
            <p>ID: 8249738</p>
          </div>
          <div className="team-member">
            <h3>Vikas Sharma</h3>
            <p>ID: 8194117</p>
          </div>
          <div className="team-member">
            <h3>Sonam Muneer</h3>
            <p>ID: 8085687</p>
          </div>
          <div className="team-member">
            <h3>Meghana Reddi</h3>
            <p>ID: 8368867</p>
          </div>
          <div className="team-member">
            <h3>Aaron Gomes</h3>
            <p>ID: 8081669</p>
          </div>
          <div className="team-member supervisor">
            <h3>Supervisor: Huseyin Hisi</h3>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <h2>Get in Touch</h2>
        <p><strong>Email:</strong> <a href="mailto:info@elitefraction.com">info@elitefraction.com</a></p>
        <p><strong>Phone:</strong> +61 123 456 789</p>
        <p><strong>Address:</strong> 123 Elite Street, Sydney, Australia</p>
      </section>

    </div>
  );
}

export default AboutUs;
