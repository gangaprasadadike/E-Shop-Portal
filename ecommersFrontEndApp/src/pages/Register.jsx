import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({ role: 'USER' });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await API.post("/auth/register", user);
            alert("Registered Successfully");
            navigate("/");
        } catch (err) {
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <div className="card fade-in" style={{ width: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create Account</h2>
                <input className="input" placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
                <input className="input" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input className="input" type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Role</label>
                <select className="input" onChange={(e) => setUser({ ...user, role: e.target.value })}>
                    <option value="USER">User (View Only)</option>
                    <option value="ADMIN">Admin (Full Access)</option>
                </select>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleRegister}>Create Account</button>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;