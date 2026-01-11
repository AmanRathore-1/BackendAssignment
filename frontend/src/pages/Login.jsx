import { ArrowRight, Lock, LogIn, Mail, Package } from "lucide-react";
import { useState } from "react";
import API from "../api/api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("All fields required");

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/products";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Package size={32} />
          </div>
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <form className="auth-form" onSubmit={submit}>
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
              placeholder="Enter your password"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn">
            <LogIn size={20} />
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>
            New to ProductApp?{" "}
            <a href="/signup" className="auth-link">
              Create an account
              <ArrowRight size={16} />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}