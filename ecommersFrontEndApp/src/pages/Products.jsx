import React, { useState, useEffect } from "react";
import API from "../services/api";

function Products() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchProducts();
        if (localStorage.getItem("role") === "ADMIN") setIsAdmin(true);
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/products");
            setProducts(res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch products");
        }
    };

    const addProduct = async () => {
        try {
            await API.post("/products", newProduct);
            alert("Product Added");
            setNewProduct({ name: '', price: '', description: '' });
            document.getElementById('add-modal').style.display = 'none';
            fetchProducts();
        } catch (err) {
            alert("Only admins can add products");
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await API.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            alert("Only admins can delete products");
        }
    };

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ margin: 0 }}>Discover Products</h1>
                {isAdmin && (
                    <button className="btn btn-primary" onClick={() => document.getElementById('add-modal').style.display = 'block'}>
                        + Add New
                    </button>
                )}
            </div>

            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '1.5rem',
                justifyContent: 'center'
            }}>
                {products.length === 0 ? (
                    <p style={{ width: '100%', textAlign: 'center', color: 'var(--text-muted)', padding: '4rem' }}>No products found. Login as admin to add some!</p>
                ) : products.map(p => (
                    <div key={p.id} className="card fade-in glass hover-lift" style={{ 
                        padding: '1rem', 
                        display: 'flex', 
                        flexDirection: 'row', 
                        gap: '1.25rem',
                        alignItems: 'center',
                        width: '450px',
                        minHeight: '130px',
                        flexGrow: 0,
                        flexShrink: 0
                    }}>
                        <div style={{ 
                            width: '140px', 
                            height: '140px', 
                            background: '#f1f5f9', 
                            borderRadius: '12px', 
                            flexShrink: 0,
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                            <span style={{ fontSize: '2.5rem' }}>🛍️</span>
                        </div>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{p.name}</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {p.description || "Premium quality product."}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>₹{p.price}</span>
                                {isAdmin && (
                                    <button onClick={() => deleteProduct(p.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>Delete</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Overlay */}
            <div id="add-modal" style={{ display: 'none', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
                <div className="card fade-in" style={{ maxWidth: '400px', margin: '100px auto' }}>
                    <h2 style={{ textAlign: 'center' }}>Add Product</h2>
                    <input className="input" placeholder="Name" value={newProduct.name || ''} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <input className="input" placeholder="Price" type="number" value={newProduct.price || ''} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <textarea className="input" placeholder="Description" style={{ minHeight: '100px' }} value={newProduct.description || ''} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={addProduct}>Create</button>
                        <button className="btn" style={{ flex: 1, backgroundColor: 'var(--border)' }} onClick={() => document.getElementById('add-modal').style.display = 'none'}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;