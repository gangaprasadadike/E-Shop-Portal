import React, { useState, useEffect } from "react";
import API from "../services/api";

function Profile() {
    const [user, setUser] = useState({ username: '', email: '' });
    const [password, setPassword] = useState("");
    const userId = localStorage.getItem("userId") || "1"; // Defaulting to 1 for demo

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await API.get(`/users/profile/${userId}`);
            setUser(res.data.data);
        } catch (err) {
            console.error("Failed to fetch profile");
        }
    };

    const handleUpdate = async () => {
        try {
            await API.put(`/users/profile/${userId}`, user);
            alert("Profile Updated");
        } catch (err) {
            alert("Failed to update profile");
        }
    };

    const handleChangePassword = async () => {
        try {
            // Backend expects @RequestParam String password in UserController.java:40
            await API.put(`/users/change-password/${userId}?password=${password}`);
            alert("Password Changed Successfully");
            setPassword("");
        } catch (err) {
            alert("Failed to change password");
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>User Profile</h1>
            
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3>Personal Information</h3>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                <input className="input" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input className="input" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <button className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
            </div>

            <div className="card">
                <h3>Account Security</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Enter a new password to update your accounts security.</p>
                <input className="input" type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-primary" onClick={handleChangePassword}>Update Password</button>
            </div>
        </div>
    );
}

export default Profile;
