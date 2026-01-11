import { Building2, DollarSign, Hash, Package, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./AddProduct.css";

export default function AddProduct() {
  const [form, setForm] = useState({
    productId: "",
    name: "",
    price: "",
    rating: "",
    company: "",
    featured: false
  });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || isNaN(form.price))
      return alert("Name required & price must be number");

    await API.post("/products", {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating)
    });

    alert("Product added");
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="header-icon">
              <Package size={28} />
            </div>
            <h2>Add New Product</h2>
            <p className="form-subtitle">Fill in the details to add a product</p>
          </div>

          <form className="product-form" onSubmit={submit}>
            <div className="form-group">
              <label className="form-label">
                <Hash size={18} />
                Product ID
              </label>
              <input 
                className="form-input"
                placeholder="Enter product ID" 
                required 
                onChange={e => setForm({ ...form, productId: e.target.value })} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Package size={18} />
                Product Name
              </label>
              <input 
                className="form-input"
                placeholder="Enter product name" 
                required 
                onChange={e => setForm({ ...form, name: e.target.value })} 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <DollarSign size={18} />
                  Price
                </label>
                <input 
                  className="form-input"
                  type="number" 
                  placeholder="0.00" 
                  required 
                  onChange={e => setForm({ ...form, price: e.target.value })} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Star size={18} />
                  Rating
                </label>
                <input 
                  className="form-input"
                  type="number" 
                  step="0.1" 
                  placeholder="0.0" 
                  onChange={e => setForm({ ...form, rating: e.target.value })} 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Building2 size={18} />
                Company
              </label>
              <input 
                className="form-input"
                placeholder="Enter company name" 
                required 
                onChange={e => setForm({ ...form, company: e.target.value })} 
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  className="checkbox-input"
                  onChange={e => setForm({ ...form, featured: e.target.checked })} 
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">
                  <Sparkles size={16} />
                  Mark as Featured Product
                </span>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              <Package size={20} />
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}