import React from "react";
import "./Contact.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        We’d love to hear from you! Reach out to us for any inquiries or assistance.
      </p>

      {/* Contact Information */}
      <div className="contact-info">
        <div className="info-item">
          <i className="fas fa-phone"></i>
          <p>+61 123 456 789</p>
        </div>
        <div className="info-item">
          <i className="fas fa-envelope"></i>
          <p>info@elitefraction.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            id="phone"
            placeholder="Your Mobile Number"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            id="message"
            placeholder="Your Message"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" className="contact-submit">
          Submit
        </button>
      </form>

      {/* Embedded Map for University of Wollongong */}
      <div className="map-container">
        <iframe
          title="University of Wollongong Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.722257060654!2d150.879911315204!3d-34.40607298078261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b1319b3a3e4f7a5%3A0x6b6f5f5b5b5b5b5b!2sUniversity%20of%20Wollongong!5e0!3m2!1sen!2sau!4v1631234567890!5m2!1sen!2sau"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Social Media Links */}
      <div className="social-links">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
};

export default Contact;