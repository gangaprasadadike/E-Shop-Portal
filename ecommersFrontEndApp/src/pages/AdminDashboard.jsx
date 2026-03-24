import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [stats, setStats] = useState({ totalProducts: 0 });
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get("/products");
                const data = res.data.data || [];
                setProducts(data.slice(0, 4)); // Show first 4
                setStats({ totalProducts: data.length });
            } catch (err) {
                console.error("Failed to fetch dashboard stats");
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Control Center</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back, {username}. Here's what's happening today.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card glass hover-lift" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.5rem' }}>📦</span>
                        </div>
                        <h3 style={{ margin: 0 }}>Active Inventory</h3>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{stats.totalProducts}</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Total products currently live</p>
                </div>

                <div className="card glass hover-lift" style={{ borderLeft: '4px solid #10b981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.5rem' }}>👤</span>
                        </div>
                        <h3 style={{ margin: 0 }}>User Base</h3>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>--</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>System monitoring active</p>
                </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0 }}>Quick Inventory Overview</h2>
                    <Link to="/products" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View All →</Link>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
                    {products.map(p => (
                        <div key={p.id} className="card glass hover-lift" style={{ 
                            padding: '0.75rem', 
                            display: 'flex', 
                            gap: '1rem', 
                            alignItems: 'center',
                            width: '450px',
                            flexGrow: 0,
                            flexShrink: 0
                        }}>
                            <div style={{ width: '70px', height: '70px', background: '#f1f5f9', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.5rem' }}>🛍️</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{p.name}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 0.25rem 0', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                                <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>₹{p.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card glass" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🛠️</div>
                    <h2 style={{ marginBottom: '1rem' }}>Management Quick Actions</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                        Directly manage your ecommerce operations. Add new products, update pricing, or view the public face of your store.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/products" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Manage Products</Link>
                        <Link to="/profile" className="btn" style={{ border: '1px solid var(--border)', padding: '1rem 2rem' }}>Configure Settings</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
