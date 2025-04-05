import React, { useState } from "react";
import { FaCoins, FaCar, FaAnchor, FaHeart, FaSync, FaCalendarCheck } from "react-icons/fa";
import "./MyInvestment.css";

const MyInvestment = () => {
    const [user, setUser] = useState({
        availableCredits: 1500,
        investments: [
            { id: 1, name: "Luxury Car", currentValue: 8000, votingRights: "5%", type: "Luxury Cars" },
            { id: 2, name: "Yacht", currentValue: 10000, votingRights: "10%", type: "Yachts" },
            { id: 3, name: "Medical Equipment", currentValue: 5000, votingRights: "3%", type: "Medical Equipment" }
        ],
        subscriptions: [
            { id: 1, name: "Exclusive Investment Access", status: "Active" },
            { id: 2, name: "VIP Member Benefits", status: "Active" }
        ]
    });

    const handleResell = (investmentId) => {
        // Logic to handle reselling
        console.log(`Resell clicked for investment ID: ${investmentId}`);
    };

    const handleBookUsage = (investmentId) => {
        // Logic to handle booking usage
        console.log(`Book Usage clicked for investment ID: ${investmentId}`);
    };

    return (
        <div className="my-investment-page">
            <h1>My Investments</h1>

            <div className="credits-section">
                <div className="card">
                    <FaCoins size={40} />
                    <h2>Available Credits</h2>
                    <p>{user.availableCredits} Credits</p>
                </div>
            </div>

            <div className="investments-section">
                <h2>My Investments</h2>
                <div className="investment-list">
                    {user.investments.map((investment) => (
                        <div className="investment-card" key={investment.id}>
                            <h3>{investment.name} ({investment.type})</h3>
                            <p>Current Value: ${investment.currentValue}</p>
                            <p>Voting Rights: {investment.votingRights}</p>
                            
                            {/* Resell and Book Usage buttons */}
                            <div className="investment-buttons">
                                <button onClick={() => handleResell(investment.id)} className="button-resell">
                                    <FaSync /> Resell
                                </button>
                                {investment.type !== "Medical Equipment" && (
                                    <button onClick={() => handleBookUsage(investment.id)} className="button-book">
                                        <FaCalendarCheck /> Book Usage
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="subscriptions-section">
                <h2>My Subscriptions</h2>
                <div className="subscription-list">
                    {user.subscriptions.map((subscription) => (
                        <div className="subscription-card" key={subscription.id}>
                            <FaHeart size={20} />
                            <p>{subscription.name} - Status: {subscription.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyInvestment;
