import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Basic role detection from token (best practice is to decode, but for simplicity we'll assume it's stored or checked on page)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // if we store it
    localStorage.removeItem("role"); // if we store it
    navigate("/");
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--primary)' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>E-Shop Portal</Link>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/products" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500 }}>Products</Link>
        {token ? (
          <>
            <Link to="/profile" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500 }}>Profile</Link>
            <button onClick={logout} className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: '#ef4444', color: 'white' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500 }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
