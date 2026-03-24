import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OAuth2RedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const role = params.get("role");
        const username = params.get("username");
        const userId = params.get("userId");

        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("username", username);
            localStorage.setItem("userId", userId);
            
            alert(`Welcome back ${username}! Redirecting to your dashboard...`);
            navigate(role === "ADMIN" ? "/admin-dashboard" : "/user-dashboard");
        } else {
            alert("Login failed. No token received.");
            navigate("/login");
        }
    }, [location, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.2rem' }}>
            Authenticating with Google...
        </div>
    );
}

export default OAuth2RedirectHandler;
