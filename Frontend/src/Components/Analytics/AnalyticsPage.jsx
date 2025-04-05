import React, { useState } from "react";
import { FaChartLine, FaUsers, FaCoins, FaDollarSign } from "react-icons/fa";
import "./AnalyticsPage.css";

const AnalyticsPage = ({ userRole = "user" }) => { // Change this to "admin" to see admin view
    const [adminStats] = useState({
        totalUsers: 150,
        totalRevenue: 1200000,
        popularInvestments: [
            { name: "Luxury Cars", count: 55 },
            { name: "Yachts", count: 45 },
            { name: "Medical Equipment", count: 50 }
        ]
    });

    const [userStats] = useState({
        portfolioGrowth: 18.5,
        totalCredits: 1800,
        revenueEarned: 32000,
        activeInvestments: [
            { name: "Luxury Car", currentValue: 8000 },
            { name: "Yacht", currentValue: 10000 },
            { name: "Medical Equipment", currentValue: 5000 }
        ]
    });

    return (
        <div className="analytics-page">
            <h1>Analytics Dashboard</h1>
            {userRole === "admin" ? (
                <div className="admin-analytics">
                    <div className="card">
                        <FaUsers size={40} />
                        <h2>Total Users</h2>
                        <p>{adminStats.totalUsers}</p>
                    </div>
                    <div className="card">
                        <FaCoins size={40} />
                        <h2>Total Revenue</h2>
                        <p>${adminStats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="card">
                        <FaChartLine size={40} />
                        <h2>Popular Investments</h2>
                        <ul>
                            {adminStats.popularInvestments.map((item, index) => (
                                <li key={index}>{item.name}: {item.count} Investments</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="user-analytics">
                    <div className="card">
                        <FaChartLine size={40} />
                        <h2>Portfolio Growth</h2>
                        <p>{userStats.portfolioGrowth}%</p>
                    </div>
                    <div className="card">
                        <FaCoins size={40} />
                        <h2>Total Credits</h2>
                        <p>{userStats.totalCredits}</p>
                    </div>
                    <div className="card">
                        <FaDollarSign size={40} />
                        <h2>Revenue Earned</h2>
                        <p>${userStats.revenueEarned.toLocaleString()}</p>
                    </div>
                    <div className="card">
                        <FaChartLine size={40} />
                        <h2>Active Investments</h2>
                        <ul>
                            {userStats.activeInvestments.map((item, index) => (
                                <li key={index}>{item.name} - ${item.currentValue.toLocaleString()}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticsPage;
