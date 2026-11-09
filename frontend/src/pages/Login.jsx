
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import "./Login.css";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [remember, setRemember] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    if (!form.email.trim() || !form.password) {
      setMessage("Please enter your email and password.");
      setMessageType("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (!isLogin) {
      if (!form.name.trim()) {
        setMessage("Please enter your full name.");
        setMessageType("error");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setMessage("Passwords do not match.");
        setMessageType("error");
        return;
      }
    }

    // Authentication API will be connected in the backend stage.
    setMessage(
      isLogin
        ? "Login interface is ready. Connect the Spring Boot authentication API to sign in."
        : "Registration interface is ready. Connect the Spring Boot API to create your account."
    );
    setMessageType("success");
  };

  const switchMode = (mode) => {
    setIsLogin(mode);
    setMessage("");
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <main className="auth-page">
      <div className="auth-wrapper">

        <section className="auth-brand-panel">
          <Link to="/" className="auth-logo">
            <span className="auth-logo-icon">
              <ShoppingBag size={25} />
            </span>
            <span>ShopSphere</span>
          </Link>

          <div className="auth-brand-content">
            <span className="auth-brand-label">
              YOUR SHOPPING DESTINATION
            </span>

            <h1>
              Everything you love,
              <br />
              all in one place.
            </h1>

            <p>
              Discover amazing products, enjoy exciting offers,
              and experience smarter shopping with ShopSphere.
            </p>

            <div className="auth-benefits">
              <div>
                <ShieldCheck size={20} />
                <span>Secure shopping experience</span>
              </div>
              <div>
                <ShoppingBag size={20} />
                <span>Explore thousands of products</span>
              </div>
              <div>
                <ArrowRight size={20} />
                <span>Easy order management</span>
              </div>
            </div>
          </div>

          <span className="auth-brand-footer">
            © 2026 ShopSphere. All rights reserved.
          </span>
        </section>

        <section className="auth-form-panel">
          <div className="auth-form-container">

            <div className="auth-mobile-logo">
              <ShoppingBag size={23} />
              <strong>ShopSphere</strong>
            </div>

            <div className="auth-heading">
              <span>WELCOME TO SHOPSPHERE</span>
              <h2>{isLogin ? "Welcome back!" : "Create an account"}</h2>
              <p>
                {isLogin
                  ? "Sign in to continue your shopping journey."
                  : "Join ShopSphere and discover more."}
              </p>
            </div>

            <div className="auth-tabs">
              <button
                type="button"
                className={isLogin ? "active" : ""}
                onClick={() => switchMode(true)}
              >
                Login
              </button>

              <button
                type="button"
                className={!isLogin ? "active" : ""}
                onClick={() => switchMode(false)}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">

              {!isLogin && (
                <div className="auth-field">
                  <label>Full Name</label>
                  <div className="auth-input-wrapper">
                    <User size={19} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={updateForm}
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label>Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail size={19} />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateForm}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={19} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={updateForm}
                    autoComplete={
                      isLogin ? "current-password" : "new-password"
                    }
                    required
                  />

                  <button
                    type="button"
                    className="auth-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="auth-field">
                  <label>Confirm Password</label>
                  <div className="auth-input-wrapper">
                    <Lock size={19} />
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={updateForm}
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="auth-eye"
                      onClick={() => setShowConfirm(!showConfirm)}
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirm ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="auth-options">
                  <label className="auth-remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="auth-forgot"
                    onClick={() => {
                      setMessage(
                        "Password recovery will be available after backend integration."
                      );
                      setMessageType("info");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {message && (
                <div className={`auth-message ${messageType}`}>
                  {message}
                </div>
              )}

              <button type="submit" className="auth-submit">
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={19} />
              </button>

            </form>

            <div className="auth-switch">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => switchMode(false)}>
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => switchMode(true)}>
                    Sign in
                  </button>
                </>
              )}
            </div>

            <div className="auth-bottom">
              <Link to="/">← Back to Shopping</Link>
              <span>Powered by ShopSphere</span>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

export default Login;


