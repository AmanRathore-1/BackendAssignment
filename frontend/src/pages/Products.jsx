import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  // Generate a consistent color based on product name
  const getProductColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <>
      <Navbar />
      <div className="products-container">
        <div className="products-header">
          <div className="header-content">
            <h1>Our Products</h1>
          </div>
          <p className="header-subtitle">Discover our amazing collection</p>
        </div>

        <div className="product-grid">
          {products.map(p => (
            <div className="product-card" key={p._id}>
              {p.featured && (
                <div className="featured-badge">
                  <Star size={14} fill="currentColor" />
                  <span>Featured</span>
                </div>
              )}
              
              {/* Product Image - Generated from product name */}
              <div 
                className="product-image" 
                style={{ background: getProductColor(p.name) }}
              >
                <div className="product-image-text">
                  {p.name.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="product-content">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-company">{p.company}</p>
                <div className="product-footer">
                  <div className="product-price">₹{p.price}</div>
                  {p.rating && (
                    <div className="product-rating">
                      <Star size={16} fill="#fbbf24" color="#fbbf24" />
                      <span>{p.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}