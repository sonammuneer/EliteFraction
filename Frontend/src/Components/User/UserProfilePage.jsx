    // UserProfilePage.jsx
    import React from "react";
    import { Link } from "react-router-dom";
    import { FaUser, FaFileAlt, FaChartBar, FaComments, FaPlus, FaSignOutAlt } from "react-icons/fa";
    import "./UserProfilePage.css";

    const UserProfilePage = () => {
        const user = {
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "/default-avatar.png",
            memberSince: "15/05/2023",
        };

        return (
            <div className="user-profile-page">
                {/* Sidebar */}
                <aside className="sidebar">
                         <nav className="sidebar-nav">
                        <Link to="/profile" className="nav-item active" title="Profile">
                            <FaUser /> Profile
                        </Link>
                        <Link to="/my-investments" className="nav-item" title="My Investments">
                            <FaFileAlt /> My Investments
                        </Link>
                        <Link to="/new-investment" className="nav-item" title="New Investment">
                            <FaPlus /> New Investment
                        </Link>
                        <Link to="/analytics" className="nav-item" title="Analytics">
                            <FaChartBar /> Analytics
                        </Link>
                        <Link to="/community-chat" className="nav-item" title="Community Chat">
                            <FaComments /> Community Chat
                        </Link>
                        <button className="nav-item logout" title="Logout">
                            <FaSignOutAlt /> Logout
                        </button>
                    </nav>
                </aside>

                {/* Main Profile Content */}
                <main className="main-content">
                    <h1>Welcome, {user.name}!</h1>
                    <div className="profile-info">
                        <img src={user.avatar} alt="Profile" className="avatar" />
                        <div className="details">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Member Since:</strong> {user.memberSince}</p>
                            <Link to="/profile/edit" className="btn">Edit Profile</Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    };

    export default UserProfilePage;
