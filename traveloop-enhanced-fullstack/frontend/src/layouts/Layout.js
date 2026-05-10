import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const styles = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .app-shell {
    display: flex;
    min-height: 100vh;
    background: #f5f0e8;
    font-family: 'DM Sans', sans-serif;
  }

  .sidebar {
    width: 260px;
    background: #1a2e1a;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
    transition: transform 0.3s ease;
    box-shadow: 4px 0 24px rgba(0,0,0,0.15);
  }

  .sidebar-brand {
    padding: 28px 24px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 900;
    background: linear-gradient(135deg, #f5f0e8 0%, #d4a843 60%, #e8896a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    letter-spacing: -0.5px;
  }

  .brand-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-top: 2px;
    display: block;
  }

  .nav-section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    padding: 20px 24px 8px;
  }

  .nav-links {
    flex: 1;
    padding: 8px 12px;
    overflow-y: auto;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-radius: 10px;
    text-decoration: none;
    color: rgba(255,255,255,0.55);
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    margin-bottom: 2px;
    position: relative;
  }

  .nav-link:hover {
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.9);
  }

  .nav-link.active {
    background: linear-gradient(135deg, rgba(196, 98, 45, 0.85) 0%, rgba(160, 81, 30, 0.9) 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(196, 98, 45, 0.3);
  }

  .nav-link .nav-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 8px;
    background: rgba(255,255,255,0.06);
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .nav-link.active .nav-icon {
    background: rgba(255,255,255,0.15);
  }

  .sidebar-footer {
    padding: 16px 12px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .user-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 12px;
    background: rgba(255,255,255,0.05);
    margin-bottom: 8px;
  }

  .user-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c4622d, #d4a843);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 15px;
    flex-shrink: 0;
  }

  .user-info { flex: 1; min-width: 0; }

  .user-name {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .user-status {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    display: block;
    margin-top: 1px;
  }

  .status-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4aada0;
    margin-right: 5px;
    vertical-align: middle;
  }

  .logout-btn {
    width: 100%;
    padding: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: rgba(255,255,255,0.5);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .logout-btn:hover {
    background: rgba(224, 82, 82, 0.15);
    border-color: rgba(224, 82, 82, 0.3);
    color: #f87171;
  }

  .main-content {
    flex: 1;
    margin-left: 260px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .top-bar {
    background: white;
    border-bottom: 1px solid #e0d8cc;
    padding: 16px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #1a1410;
    letter-spacing: -0.3px;
  }

  .top-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .notification-btn {
    width: 38px;
    height: 38px;
    background: #f5f0e8;
    border: 1px solid #e0d8cc;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 17px;
    transition: all 0.2s;
    position: relative;
  }
  .notification-btn:hover { background: #ede6da; }

  .notif-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 16px;
    height: 16px;
    background: #c4622d;
    border-radius: 50%;
    font-size: 9px;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
  }

  .page-body {
    flex: 1;
    padding: 36px;
    animation: fadeIn 0.3s ease;
  }

  .mobile-toggle {
    display: none;
    width: 38px;
    height: 38px;
    background: #f5f0e8;
    border: 1px solid #e0d8cc;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
  }

  @media (max-width: 900px) {
    .sidebar { transform: translateX(-100%); }
    .sidebar.open { transform: translateX(0); }
    .main-content { margin-left: 0; }
    .mobile-toggle { display: flex; }
    .page-body { padding: 20px; }
    .top-bar { padding: 14px 20px; }
  }

  .mobile-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 99;
  }
  .mobile-overlay.visible { display: block; }
`;

const navItems = [
  { to: "/", icon: "🏠", label: "Dashboard" },
  { to: "/create", icon: "✈️", label: "Create Trip" },
  { to: "/trips", icon: "🗺️", label: "My Trips" },
  { to: "/budget", icon: "💰", label: "Budget" },
  { to: "/packing", icon: "🧳", label: "Packing List" },
  { to: "/notes", icon: "📓", label: "Notes" },
];

const pageTitles = {
  "/": "Dashboard",
  "/create": "Create New Trip",
  "/trips": "My Trips",
  "/budget": "Budget Analytics",
  "/packing": "Packing Checklist",
  "/notes": "Travel Notes",
};

export default function Layout({ user, onLogout, children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle = pageTitles[location.pathname] || "Traveloop";
  const initials = user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "T";

  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">
        {/* Mobile overlay */}
        <div
          className={`mobile-overlay${sidebarOpen ? " visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
          <div className="sidebar-brand">
            <span className="brand-name">Traveloop</span>
            <span className="brand-sub">Journey Planner</span>
          </div>

          <div className="nav-links">
            <div className="nav-section-label">Navigation</div>
            {navItems.map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link${location.pathname === to ? " active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">{icon}</span>
                {label}
              </Link>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">{initials}</div>
              <div className="user-info">
                <span className="user-name">{user?.name || "Traveller"}</span>
                <span className="user-status">
                  <span className="status-dot"></span>Active
                </span>
              </div>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              <span>🚪</span> Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="main-content">
          <div className="top-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <button className="mobile-toggle" onClick={() => setSidebarOpen(p => !p)}>☰</button>
              <h1 className="page-title">{pageTitle}</h1>
            </div>
            <div className="top-actions">
              <div className="notification-btn">
                🔔
                <span className="notif-badge">2</span>
              </div>
              <div className="notification-btn">⚙️</div>
            </div>
          </div>
          <main className="page-body">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
