import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaFileAlt, FaChartBar, FaComments, FaPlus, FaSignOutAlt, FaUserShield, FaCogs, FaCoins, FaUpload } from "react-icons/fa";
import "./UserProfilePage.css";

const UserProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [kycDocument, setKycDocument] = useState(null);
    const [kycStatus, setKycStatus] = useState("Not Submitted");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser); 
            setProfilePic(localStorage.getItem("profilePic"));
            setKycStatus(localStorage.getItem("kycStatus") || "Not Submitted");
        } else {
            navigate("/User/Login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/User/Login");
    };

    const handleProfilePicUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                localStorage.setItem("profilePic", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleKycUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setKycDocument(file);
            setKycStatus("Pending Approval");
            localStorage.setItem("kycStatus", "Pending Approval");
            alert("KYC Document Uploaded Successfully. Waiting for approval.");
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="user-profile-page">
            <aside className="sidebar">
                <nav className="sidebar-nav">
                    <Link to="/User/UserProfilePage" className="nav-item active">
                        <FaUser /> Profile
                    </Link>
                    <Link to="/my-investments" className="nav-item">
                        <FaFileAlt /> My Investments
                    </Link>
                    <Link to="/new-investment" className="nav-item">
                        <FaPlus /> New Investment
                    </Link>
                    <Link to="/buy-credits" className="nav-item">
                        <FaCoins /> Buy Credits
                    </Link>
                    <Link to="/analytics" className="nav-item">
                        <FaChartBar /> Analytics
                    </Link>
                    {user.role === "admin" && (
                        <>
                            <Link to="/user-management" className="nav-item">
                                <FaUserShield /> User Management
                            </Link>
                            <Link to="/payment-gateway-settings" className="nav-item">
                                <FaCogs /> Payment Gateway Settings
                            </Link>
                        </>
                    )}
                    <Link to="/community-chat" className="nav-item">
                        <FaComments /> Community Chat
                    </Link>
                    <button className="nav-item logout" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </nav>
            </aside>

            <main className="main-content">
                <h1>Welcome, {user.firstName} {user.lastName}!</h1>
                <div className="profile-info">
                    <div className="avatar-section">
                        <img src={profilePic || "/default-avatar.png"} alt="Profile" className="avatar" />
                        <input type="file" accept="image/*" onChange={handleProfilePicUpload} />
                        <p><strong>Profile Picture</strong></p>
                    </div>
                    <div className="details">
                        <p><strong>First Name:</strong> {user.firstName}</p>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                        <p><strong>Position:</strong> {user.position}</p>
                        <p><strong>Country:</strong> {user.country}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Invitation Code:</strong> {user.invitationCode}</p>
                    </div>
                </div>

                {/* KYC Section Moved to Bottom */}
                <div className="kyc-section">
                    <h2>KYC Verification</h2>
                    <p><strong>KYC Status:</strong> {kycStatus}</p>
                    <input type="file" accept=".pdf,.jpg,.png" onChange={handleKycUpload} />
                    <p><strong>Upload KYC Document</strong></p>
                </div>
            </main>
        </div>
    );
};

export default UserProfilePage;
