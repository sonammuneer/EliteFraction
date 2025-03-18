import React, { useState } from "react";
import "./FAQ.css"; // Import the CSS file

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const faqData = [
    {
      category: "User Agreement",
      questions: [
        {
          question: "What is the user agreement?",
          answer: "The user agreement outlines the terms and conditions for using our platform, including your rights and responsibilities.",
        },
        {
          question: "How do I accept the user agreement?",
          answer: "You can accept the user agreement by checking the box during the sign-up process.",
        },
      ],
    },
    {
      category: "Common Questions",
      questions: [
        {
          question: "How does fractional ownership work?",
          answer: "Fractional ownership allows multiple investors to own a share of a luxury asset, such as a car, yacht, or medical equipment.",
        },
        {
          question: "What assets are available for investment?",
          answer: "We offer fractional ownership in luxury cars, yachts, and medical equipment.",
        },
      ],
    },
    {
      category: "Investment Risks & Returns",
      questions: [
        {
          question: "What are the risks of fractional ownership?",
          answer: "Risks include market fluctuations, asset depreciation, and liquidity challenges.",
        },
        {
          question: "What returns can I expect?",
          answer: "Returns vary based on the asset type, market conditions, and usage.",
        },
      ],
    },
    {
      category: "Exit Strategies",
      questions: [
        {
          question: "How can I exit my investment?",
          answer: "You can sell your share on our platform or wait for the asset to be sold.",
        },
        {
          question: "Is there a lock-in period?",
          answer: "Some assets may have a lock-in period, depending on the agreement.",
        },
      ],
    },
    {
      category: "How to Get Started",
      questions: [
        {
          question: "How do I sign up?",
          answer: "Create an account on our platform, complete KYC, and start investing.",
        },
        {
          question: "What documents are required?",
          answer: "You will need a government-issued ID and proof of address.",
        },
      ],
    },
  ];

  // Filter FAQs based on search term and category
  const filteredFAQs = faqData
    .filter(
      (faq) =>
        activeCategory === "all" || faq.category === activeCategory
    )
    .map((faq) => ({
      ...faq,
      questions: faq.questions.filter((q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((faq) => faq.questions.length > 0);

  return (
    <div className="faq-container">
      <h1>FAQ Section</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="category-buttons">
        <button onClick={() => setActiveCategory("all")}>All</button>
        {faqData.map((faq, index) => (
          <button key={index} onClick={() => setActiveCategory(faq.category)}>
            {faq.category}
          </button>
        ))}
      </div>
      <div className="faq-list">
        {filteredFAQs.map((faq, index) => (
          <div key={index} className="faq-category">
            <h2>{faq.category}</h2>
            {faq.questions.map((q, i) => (
              <div key={i} className="faq-item">
                <h3>{q.question}</h3>
                <p>{q.answer}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;