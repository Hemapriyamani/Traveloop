import React from "react";
import { Link } from "react-router-dom";

const styles = `
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .dashboard { animation: fadeSlide 0.4s ease; }

  .welcome-banner {
    background: linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1e3a3a 100%);
    border-radius: 20px;
    padding: 36px 40px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .welcome-banner::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(212,168,67,0.2) 0%, transparent 70%);
    border-radius: 50%;
  }

  .welcome-banner::after {
    content: '✈️';
    position: absolute;
    right: 40px;
    font-size: 80px;
    opacity: 0.15;
    top: 50%;
    transform: translateY(-50%);
  }

  .welcome-text h2 {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
  }
  .welcome-text p {
    font-size: 15px;
    color: rgba(255,255,255,0.5);
    font-weight: 300;
  }

  .plan-btn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #c4622d, #d4a843);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.25s;
    white-space: nowrap;
    position: relative;
    z-index: 1;
  }
  .plan-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(196,98,45,0.4); }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }

  @media (max-width: 1100px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr; } }

  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e0d8cc;
    animation: countUp 0.5s ease both;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .stat-card:nth-child(2) { animation-delay: 0.1s; }
  .stat-card:nth-child(3) { animation-delay: 0.2s; }
  .stat-card:nth-child(4) { animation-delay: 0.3s; }

  .stat-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    margin-bottom: 16px;
  }
  .stat-icon.terracotta { background: rgba(196,98,45,0.12); }
  .stat-icon.teal { background: rgba(45,125,110,0.12); }
  .stat-icon.gold { background: rgba(212,168,67,0.12); }
  .stat-icon.green { background: rgba(74,173,160,0.12); }

  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: #1a1410;
    margin-bottom: 4px;
    display: block;
  }

  .stat-label { font-size: 13px; color: #8a7f74; font-weight: 400; }
  .stat-change {
    font-size: 12px;
    margin-top: 8px;
    font-weight: 500;
  }
  .stat-change.up { color: #2d7d6e; }
  .stat-change.neutral { color: #8a7f74; }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 900px) { .content-grid { grid-template-columns: 1fr; } }

  .card {
    background: white;
    border-radius: 16px;
    border: 1px solid #e0d8cc;
    overflow: hidden;
  }

  .card-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f0ebe0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1410;
  }

  .card-link {
    font-size: 13px;
    color: #c4622d;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .card-link:hover { color: #a0511e; }

  .trip-item {
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid #f5f0e8;
    transition: background 0.2s;
  }
  .trip-item:last-child { border-bottom: none; }
  .trip-item:hover { background: #faf7f2; }

  .trip-thumb {
    width: 48px; height: 48px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .trip-info { flex: 1; }
  .trip-name { font-size: 14px; font-weight: 600; color: #1a1410; margin-bottom: 3px; }
  .trip-city { font-size: 12px; color: #8a7f74; }

  .trip-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
  }
  .badge-upcoming { background: rgba(45,125,110,0.1); color: #2d7d6e; }
  .badge-planned { background: rgba(212,168,67,0.1); color: #a07810; }
  .badge-completed { background: rgba(138,127,116,0.1); color: #6b6058; }

  .budget-row {
    padding: 14px 24px;
    display: flex;
    align-items: center;
    gap: 14px;
    border-bottom: 1px solid #f5f0e8;
  }
  .budget-row:last-child { border-bottom: none; }

  .budget-label-wrap { flex: 1; }
  .budget-cat { font-size: 13px; font-weight: 500; color: #1a1410; margin-bottom: 6px; }
  .budget-bar-bg { height: 6px; background: #f0ebe0; border-radius: 10px; overflow: hidden; }
  .budget-bar { height: 100%; border-radius: 10px; transition: width 0.6s ease; }

  .budget-amount { font-size: 13px; font-weight: 600; color: #1a1410; white-space: nowrap; }

  .quick-actions {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  @media (max-width: 600px) { .quick-actions { grid-template-columns: 1fr; } }

  .quick-btn {
    padding: 18px 20px;
    background: white;
    border: 1.5px solid #e0d8cc;
    border-radius: 14px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    text-align: left;
    transition: all 0.25s;
    text-decoration: none;
    display: block;
  }
  .quick-btn:hover { border-color: #c4622d; background: #fef6f0; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
  .quick-btn-icon { font-size: 24px; margin-bottom: 8px; display: block; }
  .quick-btn-label { font-size: 14px; font-weight: 600; color: #1a1410; display: block; margin-bottom: 4px; }
  .quick-btn-desc { font-size: 12px; color: #8a7f74; display: block; }
`;

const trips = [
  { name: "Rajasthan Desert", city: "Jaisalmer, Rajasthan", emoji: "🏜️", bg: "rgba(212,168,67,0.12)", status: "upcoming" },
  { name: "Kerala Backwaters", city: "Alleppey, Kerala", emoji: "🌴", bg: "rgba(45,125,110,0.12)", status: "planned" },
  { name: "Goa Beach Trip", city: "North Goa", emoji: "🏖️", bg: "rgba(74,173,160,0.12)", status: "completed" },
];

const budgetItems = [
  { cat: "Hotels & Stay", amount: "₹20,000", pct: 40, color: "#c4622d" },
  { cat: "Food & Dining", amount: "₹10,000", pct: 20, color: "#d4a843" },
  { cat: "Transport", amount: "₹15,000", pct: 30, color: "#2d7d6e" },
  { cat: "Activities", amount: "₹5,000", pct: 10, color: "#4aada0" },
];

const badgeClass = { upcoming: "badge-upcoming", planned: "badge-planned", completed: "badge-completed" };

export default function Dashboard({ user }) {
  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>{greeting()}, {user?.name?.split(" ")[0] || "Traveller"}! 🌍</h2>
            <p>You have 2 upcoming trips this month. Time to explore!</p>
          </div>
          <Link to="/create" className="plan-btn">+ Plan a Trip</Link>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon terracotta">✈️</div>
            <span className="stat-number">8</span>
            <div className="stat-label">Total Trips</div>
            <div className="stat-change up">↑ 2 this year</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon teal">📍</div>
            <span className="stat-number">12</span>
            <div className="stat-label">Cities Visited</div>
            <div className="stat-change up">↑ 3 new</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon gold">💰</div>
            <span className="stat-number">₹50k</span>
            <div className="stat-label">Budget Tracked</div>
            <div className="stat-change neutral">This trip</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <span className="stat-number">24</span>
            <div className="stat-label">Items Packed</div>
            <div className="stat-change up">8 remaining</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Upcoming Trips */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Trips</h3>
              <Link to="/trips" className="card-link">View all →</Link>
            </div>
            {trips.map((t, i) => (
              <div className="trip-item" key={i}>
                <div className="trip-thumb" style={{ background: t.bg }}>{t.emoji}</div>
                <div className="trip-info">
                  <div className="trip-name">{t.name}</div>
                  <div className="trip-city">📍 {t.city}</div>
                </div>
                <span className={`trip-badge ${badgeClass[t.status]}`}>
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
              </div>
            ))}
          </div>

          {/* Budget */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Budget Summary</h3>
              <Link to="/budget" className="card-link">Details →</Link>
            </div>
            {budgetItems.map((b, i) => (
              <div className="budget-row" key={i}>
                <div className="budget-label-wrap">
                  <div className="budget-cat">{b.cat}</div>
                  <div className="budget-bar-bg">
                    <div className="budget-bar" style={{ width: `${b.pct}%`, background: b.color }}></div>
                  </div>
                </div>
                <div className="budget-amount">{b.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="/create" className="quick-btn">
            <span className="quick-btn-icon">✈️</span>
            <span className="quick-btn-label">New Trip</span>
            <span className="quick-btn-desc">Start planning a journey</span>
          </Link>
          <Link to="/packing" className="quick-btn">
            <span className="quick-btn-icon">🧳</span>
            <span className="quick-btn-label">Packing List</span>
            <span className="quick-btn-desc">Check what to pack</span>
          </Link>
          <Link to="/notes" className="quick-btn">
            <span className="quick-btn-icon">📓</span>
            <span className="quick-btn-label">Travel Notes</span>
            <span className="quick-btn-desc">Jot down ideas & tips</span>
          </Link>
        </div>
      </div>
    </>
  );
}
