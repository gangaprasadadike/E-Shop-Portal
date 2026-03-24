import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function UserDashboard() {
    const [products, setProducts] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get("/products");
                setProducts((res.data.data || []).slice(0, 4));
            } catch (err) {
                console.error("Failed to fetch products");
            }
        };
        fetchProducts();
    }, []);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome to E-Shop</h1>
                <p style={{ color: 'var(--text-muted)' }}>Hello, {username}! Ready to find something amazing today?</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                    <div className="card glass hover-lift" style={{ borderLeft: '4px solid var(--primary)', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.5rem' }}>🛍️</span>
                            </div>
                            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Shop Products</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Browse our curated collection of premium quality goods.</p>
                    </div>
                </Link>

                <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <div className="card glass hover-lift" style={{ borderLeft: '4px solid #f59e0b', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.5rem' }}>⚙️</span>
                            </div>
                            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Your Account</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage your preferences and security settings.</p>
                    </div>
                </Link>
            </div>

            <div style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ margin: 0 }}>Explore New Arrivals</h2>
                    <Link to="/products" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>See All Products →</Link>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
                    {products.map(p => (
                        <div key={p.id} className="card glass hover-lift" style={{ 
                            padding: '0.75rem', 
                            display: 'flex', 
                            flexDirection: 'row', 
                            gap: '1.25rem', 
                            alignItems: 'center',
                            width: '450px',
                            flexGrow: 0,
                            flexShrink: 0
                        }}>
                            <div style={{ width: '80px', height: '80px', background: '#f1f5f9', borderRadius: '12px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.5rem' }}>🛍️</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{p.name}</h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description || "Top rated item."}</p>
                                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>₹{p.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card glass" style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', textAlign: 'center', padding: '3rem 2rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Exclusive Offers just for you</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Join our VIP program to get early access to new releases and special member-only pricing.
                </p>
                <button className="btn btn-primary">Join Now</button>
            </div>
        </div>
    );
}

export default UserDashboard;
