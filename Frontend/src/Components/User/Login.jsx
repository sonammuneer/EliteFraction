import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook for navigation after login

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            console.log("➡️ Sending Login Data:", { email, password });

            // Make a login API call to your server (without JWT)
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            console.log("✅ Server Response:", response.data);

            // Save user data (excluding token) to localStorage
            localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user data directly

            // Redirect to profile/dashboard page
            navigate("/User/UserProfilePage");

        } catch (err) {
            console.error("❌ Login Error:", err.response?.data?.message || err.message);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <p className="login-subtitle">Stay updated on your Fractional Ownership world</p>

                {/* Show error message if login fails */}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleLoginSubmit} className="login-form">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <p className="forgot-password">
                        <Link to="/User/ResetPassword" className="forgot-password-link">
                            Forgot password?
                        </Link>
                    </p>

                    <button type="submit" className="sign-in-button">
                        Login
                    </button>
                </form>

                {/* Sign-up redirect */}
                <p className="join-now">
                    New to EliteFraction? <Link to="/User/SignUp" className="join-link">Join now</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
