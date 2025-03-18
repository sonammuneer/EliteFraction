import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [invitationCode, setInvitationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const userData = {
            firstName,
            lastName,
            position,
            country,
            email,
            phone,
            password,
            invitationCode,
        };

        console.log("➡️ Sending Data to Backend:", userData);

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log("✅ Server Response:", data);

            if (response.ok) {
                alert(`✅ Account created successfully for ${firstName} ${lastName}`);
                // Reset the form fields
                setFirstName("");
                setLastName("");
                setPosition("");
                setCountry("");
                setEmail("");
                setPhone("");
                setPassword("");
                setInvitationCode("");
            } else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("❌ Error signing up:", error);
            setError("❌ Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1 className="signup-title">Sign Up</h1>
                <p className="signup-subtitle">
                    Exclusive offers, co-owner privileges, and unforgettable experiences.
                </p>

                {error && <p className="signup-error">{error}</p>}

                <form onSubmit={handleSignUpSubmit} className="signup-form">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <input
                        type="text"
                        placeholder="Professional Position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <input
                        type="text"
                        placeholder="Country/City"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <input
                        type="text"
                        placeholder="Invitation Code (Optional)"
                        value={invitationCode}
                        onChange={(e) => setInvitationCode(e.target.value)}
                        className="signup-input"
                    />
                    <button type="submit" className="signup-button" disabled={loading}>
                        {loading ? "Creating Account..." : "Submit"}
                    </button>
                </form>

                <p className="login-prompt">
                    Already a member? <Link to="/User/login" className="login-link">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
