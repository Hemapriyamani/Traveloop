import React, { useState } from "react";

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes floatReverse {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(-8deg); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .login-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'DM Sans', sans-serif;
  }

  @media (max-width: 768px) {
    .login-page { grid-template-columns: 1fr; }
    .login-left { display: none !important; }
    .login-right { padding: 40px 24px !important; }
  }

  .login-left {
    background: linear-gradient(145deg, #1a2e1a 0%, #2d4a2d 30%, #1e3a3a 60%, #0f2020 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
  }

  .login-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .floating-icon {
    position: absolute;
    opacity: 0.15;
    font-size: 80px;
    animation: float 6s ease-in-out infinite;
  }

  .floating-icon:nth-child(2) { top: 10%; left: 15%; animation-delay: -2s; font-size: 60px; }
  .floating-icon:nth-child(3) { top: 60%; right: 10%; animation: floatReverse 5s ease-in-out infinite; font-size: 70px; }
  .floating-icon:nth-child(4) { bottom: 15%; left: 20%; animation-delay: -3s; font-size: 50px; }
  .floating-icon:nth-child(5) { top: 35%; right: 25%; animation-delay: -1s; font-size: 40px; }

  .left-content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: white;
    animation: fadeUp 1s ease forwards;
  }

  .brand-logo {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    font-weight: 900;
    letter-spacing: -2px;
    background: linear-gradient(135deg, #f5f0e8 0%, #d4a843 50%, #e8896a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
    margin-bottom: 8px;
    display: block;
  }

  .brand-tagline {
    font-size: 16px;
    color: rgba(255,255,255,0.6);
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 60px;
  }

  .left-features {
    display: flex;
    flex-direction: column;
    gap: 24px;
    text-align: left;
    max-width: 320px;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards;
  }
  .feature-item:nth-child(1) { animation-delay: 0.3s; }
  .feature-item:nth-child(2) { animation-delay: 0.5s; }
  .feature-item:nth-child(3) { animation-delay: 0.7s; }

  .feature-icon-wrap {
    width: 44px;
    height: 44px;
    background: rgba(212, 168, 67, 0.15);
    border: 1px solid rgba(212, 168, 67, 0.3);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }

  .feature-text h4 {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    margin-bottom: 4px;
  }
  .feature-text p {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.5;
  }

  .login-right {
    background: #faf7f2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 80px;
  }

  .login-form-wrap {
    width: 100%;
    max-width: 400px;
    animation: fadeUp 0.8s ease 0.2s both;
  }

  .form-header {
    margin-bottom: 40px;
  }

  .form-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 700;
    color: #1a1410;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .form-header p {
    font-size: 15px;
    color: #8a7f74;
    font-weight: 300;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #1a1410;
    margin-bottom: 8px;
  }

  .form-input {
    width: 100%;
    padding: 14px 18px;
    background: white;
    border: 1.5px solid #e0d8cc;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #1a1410;
    outline: none;
    transition: all 0.25s ease;
  }

  .form-input::placeholder { color: #b5ada4; }

  .form-input:focus {
    border-color: #c4622d;
    box-shadow: 0 0 0 4px rgba(196, 98, 45, 0.1);
  }

  .form-input.error {
    border-color: #e05252;
    box-shadow: 0 0 0 4px rgba(224, 82, 82, 0.1);
  }

  .error-msg {
    font-size: 12px;
    color: #e05252;
    margin-top: 6px;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    margin-top: -4px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #8a7f74;
    cursor: pointer;
    user-select: none;
  }

  .checkbox-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #c4622d;
    cursor: pointer;
  }

  .forgot-link {
    font-size: 13px;
    color: #c4622d;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .forgot-link:hover { color: #a0511e; }

  .login-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #c4622d 0%, #a0511e 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
  }

  .login-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .login-btn:hover::before { opacity: 1; }
  .login-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(196, 98, 45, 0.35); }
  .login-btn:active { transform: translateY(0); }
  .login-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 28px 0;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0d8cc;
  }
  .divider span { font-size: 12px; color: #b5ada4; font-weight: 500; }

  .demo-btn {
    width: 100%;
    padding: 14px;
    background: white;
    color: #1a1410;
    border: 1.5px solid #e0d8cc;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .demo-btn:hover {
    border-color: #c4622d;
    background: #fef6f0;
    color: #c4622d;
  }

  .signup-prompt {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: #8a7f74;
  }
  .signup-prompt a {
    color: #c4622d;
    font-weight: 600;
    text-decoration: none;
  }
  .signup-prompt a:hover { text-decoration: underline; }

  .alert-box {
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .alert-error { background: #fef2f2; border: 1px solid #fca5a5; color: #b91c1c; }
  .alert-success { background: #f0fdf4; border: 1px solid #86efac; color: #166534; }

  .password-wrap { position: relative; }
  .toggle-pw {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #8a7f74;
    padding: 0;
    transition: color 0.2s;
  }
  .toggle-pw:hover { color: #c4622d; }
`;

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "At least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    // Demo credentials check
    if (email === "demo@traveloop.com" && password === "travel123") {
      onLogin({ name: "Travel Explorer", email });
    } else if (email && password.length >= 6) {
      onLogin({ name: email.split("@")[0], email });
    } else {
      setError("Invalid credentials. Try demo@traveloop.com / travel123");
    }
    setLoading(false);
  };

  const handleDemo = async () => {
    setEmail("demo@traveloop.com");
    setPassword("travel123");
    setError("");
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    onLogin({ name: "Travel Explorer", email: "demo@traveloop.com" });
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        {/* Left Panel */}
        <div className="login-left">
          <span className="floating-icon">✈️</span>
          <span className="floating-icon">🏔️</span>
          <span className="floating-icon">🌴</span>
          <span className="floating-icon">🗺️</span>
          <span className="floating-icon">🧳</span>

          <div className="left-content">
            <span className="brand-logo">Traveloop</span>
            <p className="brand-tagline">Your journey begins here</p>

            <div className="left-features">
              <div className="feature-item">
                <div className="feature-icon-wrap">🗺️</div>
                <div className="feature-text">
                  <h4>Smart Trip Planning</h4>
                  <p>Organize every detail of your journey in one place</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrap">💰</div>
                <div className="feature-text">
                  <h4>Budget Analytics</h4>
                  <p>Track and manage your travel expenses with ease</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrap">🧳</div>
                <div className="feature-text">
                  <h4>Packing Checklists</h4>
                  <p>Never forget essentials with smart packing lists</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="login-right">
          <div className="login-form-wrap">
            <div className="form-header">
              <h2>Welcome back,<br />traveller! 👋</h2>
              <p>Sign in to continue your adventures</p>
            </div>

            {error && (
              <div className="alert-box alert-error">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input${errors.email ? " error" : ""}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ""})); }}
                  autoComplete="email"
                />
                {errors.email && <p className="error-msg">⚠ {errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`form-input${errors.password ? " error" : ""}`}
                    placeholder="Your password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setErrors(p => ({...p, password: ""})); }}
                    autoComplete="current-password"
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPassword(p => !p)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && <p className="error-msg">⚠ {errors.password}</p>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <><span className="spinner"></span> Signing in...</>
                ) : (
                  <>Sign In ✈️</>
                )}
              </button>
            </form>

            <div className="divider"><span>or</span></div>

            <button className="demo-btn" onClick={handleDemo} disabled={loading}>
              🎒 Try Demo Account
            </button>

            <div className="signup-prompt">
              New to Traveloop? <a href="#">Create an account</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
