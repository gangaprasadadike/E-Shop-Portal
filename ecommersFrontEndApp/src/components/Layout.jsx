import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        <div className="fade-in">
          {children}
        </div>
      </main>
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
        &copy; 2024 E-Shop. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
