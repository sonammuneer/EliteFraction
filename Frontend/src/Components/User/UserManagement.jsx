import React, { useState } from "react";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import "./UserManagement.css";

const UserManagementPage = () => {
    const [users, setUsers] = useState([
        { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", role: "user", status: "Pending", kycStatus: "Not Submitted", revenue: 1200 },
        { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", role: "user", status: "Approved", kycStatus: "Verified", revenue: 5000 },
        { id: 3, firstName: "Bob", lastName: "Brown", email: "bob.brown@example.com", role: "admin", status: "Approved", kycStatus: "Verified", revenue: 12000 },
        { id: 4, firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", role: "user", status: "Pending", kycStatus: "Submitted", revenue: 800 },
        { id: 5, firstName: "Charlie", lastName: "Williams", email: "charlie.williams@example.com", role: "user", status: "Approved", kycStatus: "Not Submitted", revenue: 1500 }
    ]);

    const handleApprove = (userId) => {
        const updatedUsers = users.map(user =>
            user.id === userId ? { ...user, status: "Approved", kycStatus: "Verified" } : user
        );
        setUsers(updatedUsers);
    };

    const handleRemove = (userId) => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
    };

    // Sorting Users: Display users with KYC verification required at the top
    const sortedUsers = users.sort((a, b) => {
        if (a.kycStatus === "Verified" && b.kycStatus !== "Verified") return 1;
        if (a.kycStatus !== "Verified" && b.kycStatus === "Verified") return -1;
        return 0;
    });

    return (
        <div className="user-management-page">
            <h1>User Management</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>KYC Status</th>
                        <th>Revenue Generated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => (
                        <tr key={user.id} className={user.kycStatus !== "Verified" ? "highlight-row" : ""}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>{user.kycStatus}</td>
                            <td>${user.revenue.toLocaleString()}</td>
                            <td>
                                {user.kycStatus !== "Verified" && (
                                    <button onClick={() => handleApprove(user.id)} className="approve-btn">
                                        <FaCheck /> Verify KYC
                                    </button>
                                )}
                                <button onClick={() => handleRemove(user.id)} className="remove-btn">
                                    <FaTrashAlt /> Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementPage;
