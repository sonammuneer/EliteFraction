import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            navigate("/User/Login"); // Redirect if not logged in
        }
    }, [navigate]);

    const [credits, setCredits] = useState(0);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

    const handleCreditsChange = (e) => {
        setCredits(Number(e.target.value));
    };

    const handlePayment = () => {
        if (credits > 0) {
            const storedCredits = parseInt(localStorage.getItem('credits')) || 0;
            const updatedCredits = storedCredits + credits;
            localStorage.setItem('credits', updatedCredits);

            setPaymentSuccessful(true);

            setTimeout(() => {
                navigate('/User/UserProfilePage');
            }, 2000);
        } else {
            alert('Please enter a valid number of credits to purchase.');
        }
    };

    if (!user) {
        return null; // Prevent render until user is verified
    }

    return (
        <div className="payment-container">
            <h1>Buy Credits</h1>
            <div className="credit-input">
                <label>Enter Credits to Purchase:</label>
                <input 
                    type="number" 
                    value={credits} 
                    onChange={handleCreditsChange} 
                    min="1"
                />
            </div>
            <button className="payment-button" onClick={handlePayment}>Purchase Credits</button>
            {paymentSuccessful && <p className="success-message">Payment Successful! Redirecting to Dashboard...</p>}
        </div>
    );
};

export default Payment;
