import React, { useState } from "react";
import { Link } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [invitationCode, setInvitationCode] = useState("");

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Position:", position);
        console.log("Country/City:", country);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Password:", password);
        console.log("Invitation Code:", invitationCode);
        alert(`Account created for: ${firstName} ${lastName}`);
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1 className="signup-title">Sign Up</h1>
                <p className="signup-subtitle">Exclusive offers, co-owner privileges, and unforgettable experience.</p>
                <form onSubmit={handleSignUpSubmit} className="signup-form">
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="signup-input" />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="signup-input" />
                    <input type="text" placeholder="Professional Position" value={position} onChange={(e) => setPosition(e.target.value)} required className="signup-input" />
                    <input type="text" placeholder="Country/City" value={country} onChange={(e) => setCountry(e.target.value)} required className="signup-input" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="signup-input" />
                    <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="signup-input" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="signup-input" />
                    <input type="text" placeholder="Invitation Code (Optional)" value={invitationCode} onChange={(e) => setInvitationCode(e.target.value)} className="signup-input" />
                    <button type="submit" className="signup-button">Submit</button>
                </form>
                <p className="login-prompt">
                    Already a member? <Link to="/User/Login" className="login-link">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
