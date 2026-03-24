import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", { username, password });
            const { token, role: userRole, userId } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("role", userRole);
            localStorage.setItem("userId", userId);
            alert("Login Success");
            navigate(userRole === "ADMIN" ? "/admin-dashboard" : "/products");
        } catch (err) {
            alert("Login failed. Check credentials.");
        }
    };

    const handleGoogleLogin = (selectedRole) => {
        window.location.href = `http://localhost:8081/oauth2/authorization/google?role=${selectedRole}`;
    };

    return (
        <div style={{ 
            minHeight: 'calc(100vh - 80px)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            background: 'radial-gradient(circle at top left, rgba(99, 102, 241, 0.05), transparent), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.05), transparent)'
        }}>
            <div className="card fade-in glass hover-lift" style={{ 
                width: '100%', 
                maxWidth: '440px', 
                textAlign: 'center',
                padding: '3rem 2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ 
                        width: '64px', 
                        height: '64px', 
                        background: 'var(--gradient)', 
                        borderRadius: '16px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)'
                    }}>
                        <span style={{ fontSize: '2rem' }}>🚀</span>
                    </div>
                    <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>E-Shop Portal</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Sign in to access your dashboard</p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button className="btn" style={{ 
                        width: '100%', 
                        gap: '0.75rem', 
                        border: '1px solid var(--border)', 
                        backgroundColor: 'white',
                        color: '#1e293b',
                        height: '50px',
                        boxShadow: 'var(--shadow-sm)'
                    }} onClick={() => handleGoogleLogin("USER")}>
                        <img src="https://www.google.com/favicon.ico" width="18" /> 
                        <span>Sign in as <strong>User</strong></span>
                    </button>

                    <button className="btn" style={{ 
                        width: '100%', 
                        gap: '0.75rem', 
                        border: '1px solid #6366f1', 
                        backgroundColor: 'rgba(99, 102, 241, 0.05)',
                        color: 'var(--primary)',
                        height: '50px',
                        boxShadow: 'var(--shadow-sm)'
                    }} onClick={() => handleGoogleLogin("ADMIN")}>
                        <img src="https://www.google.com/favicon.ico" width="18" /> 
                        <span>Sign in as <strong>Admin</strong></span>
                    </button>
                </div>

                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    margin: '1.5rem 0', 
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                    <span>LOGIN WITH PASSWORD</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                </div>

                <div style={{ textAlign: 'left' }}>
                    <input className="input" placeholder="Username" style={{ height: '50px' }} onChange={(e) => setUsername(e.target.value)} />
                    <input className="input" type="password" placeholder="Password" style={{ height: '50px' }} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <button className="btn btn-primary" style={{ 
                    width: '100%', 
                    height: '50px', 
                    fontSize: '1rem', 
                    marginTop: '0.5rem',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                }} onClick={handleLogin}>
                    Manual Login
                </button>

                <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    New here? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Create Account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;