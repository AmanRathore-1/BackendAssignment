import { ArrowRight, Lock, Mail, Package, User, UserPlus } from "lucide-react";
import { useState } from "react";
import API from "../api/api";
import "./Login.css"; // Reuses the same CSS

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields required");

    try {
      const res = await API.post("/auth/signup", { name, email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/products";
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Package size={32} />
          </div>
          <h1>Create Account</h1>
          <p className="auth-subtitle">Sign up to get started with ProductApp</p>
        </div>

        <form className="auth-form" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">
              <User size={18} />
              Full Name
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your name"
              required
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail size={18} />
              Email Address
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              required
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={18} />
              Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Create a password"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            <UserPlus size={20} />
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <a href="/login" className="auth-link">
              Sign in
              <ArrowRight size={16} />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}