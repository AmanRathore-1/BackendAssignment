import { LogOut, Menu, Package, Plus, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/products", label: "Products", icon: Package },
    { path: "/add-product", label: "Add Product", icon: Plus },
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Logo/Brand */}
        <Link to="/" className="brand-logo">
          <div className="logo-icon">
            <Package size={24} strokeWidth={2.5} />
          </div>
          <span className="brand-name">ProductApp</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${isActive(path) ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions-desktop">
          <button onClick={logout} className="logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-nav-links">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`mobile-nav-link ${isActive(path) ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
          <div className="mobile-actions">
            <button onClick={logout} className="mobile-logout-btn">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}