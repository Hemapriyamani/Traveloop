import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = `
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .my-trips { animation: fadeSlide 0.4s ease; }

  .trips-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .search-wrap {
    flex: 1;
    min-width: 200px;
    position: relative;
  }
  .search-wrap span {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    padding: 11px 16px 11px 40px;
    background: white;
    border: 1.5px solid #e0d8cc;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #1a1410;
    outline: none;
    transition: all 0.2s;
  }
  .search-input:focus { border-color: #c4622d; box-shadow: 0 0 0 3px rgba(196,98,45,0.08); }
  .search-input::placeholder { color: #b5ada4; }

  .filter-btn {
    padding: 11px 20px;
    background: white;
    border: 1.5px solid #e0d8cc;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #8a7f74;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .filter-btn:hover, .filter-btn.active { border-color: #c4622d; color: #c4622d; background: #fef6f0; }

  .add-trip-btn {
    padding: 11px 20px;
    background: linear-gradient(135deg, #c4622d, #a0511e);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.25s;
    white-space: nowrap;
  }
  .add-trip-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(196,98,45,0.35); }

  .trips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .trip-card {
    background: white;
    border-radius: 18px;
    border: 1px solid #e0d8cc;
    overflow: hidden;
    transition: transform 0.25s, box-shadow 0.25s;
    animation: fadeSlide 0.4s ease both;
  }
  .trip-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }

  .trip-card-banner {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    position: relative;
  }

  .trip-card-status {
    position: absolute;
    top: 14px;
    right: 14px;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 100px;
  }
  .status-upcoming { background: rgba(45,125,110,0.9); color: white; }
  .status-planned { background: rgba(212,168,67,0.9); color: white; }
  .status-completed { background: rgba(138,127,116,0.7); color: white; }

  .trip-card-body { padding: 20px; }
  .trip-card-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1410;
    margin-bottom: 6px;
  }
  .trip-card-city { font-size: 13px; color: #8a7f74; margin-bottom: 16px; display: flex; align-items: center; gap: 5px; }

  .trip-card-meta {
    display: flex;
    justify-content: space-between;
    padding-top: 14px;
    border-top: 1px solid #f0ebe0;
  }
  .meta-item { font-size: 12px; }
  .meta-label { color: #b5ada4; margin-bottom: 3px; }
  .meta-value { font-weight: 600; color: #1a1410; font-size: 13px; }

  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 20px;
  }
  .empty-state .empty-icon { font-size: 64px; margin-bottom: 16px; }
  .empty-state h3 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #1a1410; margin-bottom: 8px; }
  .empty-state p { font-size: 14px; color: #8a7f74; margin-bottom: 24px; }
`;

const demoTrips = [
  { id: 1, tripName: "Rajasthan Desert Safari", city: "Jaisalmer", budget: "35000", emoji: "🏜️", bg: "linear-gradient(135deg,#d4a843,#c4622d)", status: "upcoming", start: "15 Jun", days: "7" },
  { id: 2, tripName: "Kerala Backwaters", city: "Alleppey", budget: "28000", emoji: "🌴", bg: "linear-gradient(135deg,#2d7d6e,#4aada0)", status: "planned", start: "10 Jul", days: "5" },
  { id: 3, tripName: "Goa Beach Trip", city: "North Goa", budget: "15000", emoji: "🏖️", bg: "linear-gradient(135deg,#4aada0,#2d7d6e)", status: "completed", start: "1 Mar", days: "4" },
  { id: 4, tripName: "Himachal Adventure", city: "Manali", budget: "40000", emoji: "🏔️", bg: "linear-gradient(135deg,#6b8ab5,#3a5a8a)", status: "planned", start: "20 Aug", days: "8" },
];

const statusClass = { upcoming: "status-upcoming", planned: "status-planned", completed: "status-completed" };

export default function MyTrips() {
  const [trips, setTrips] = useState(demoTrips);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:8080/api/trips")
      .then(res => { if (res.data?.length) setTrips(res.data); })
      .catch(() => {});
  }, []);

  const filtered = trips.filter(t => {
    const matchSearch = t.tripName?.toLowerCase().includes(search.toLowerCase()) || t.city?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      <style>{styles}</style>
      <div className="my-trips">
        <div className="trips-toolbar">
          <div className="search-wrap">
            <span>🔍</span>
            <input
              className="search-input"
              placeholder="Search trips..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {["all", "upcoming", "planned", "completed"].map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <Link to="/create" className="add-trip-btn">+ New Trip</Link>
        </div>

        <div className="trips-grid">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🗺️</div>
              <h3>No trips found</h3>
              <p>Try a different search, or create your first trip!</p>
              <Link to="/create" className="add-trip-btn">Plan a Trip</Link>
            </div>
          ) : filtered.map((trip, i) => (
            <div className="trip-card" key={trip.id} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="trip-card-banner" style={{ background: trip.bg || "linear-gradient(135deg,#d4a843,#c4622d)" }}>
                {trip.emoji || "✈️"}
                <span className={`trip-card-status ${statusClass[trip.status] || "status-planned"}`}>
                  {(trip.status || "planned").charAt(0).toUpperCase() + (trip.status || "planned").slice(1)}
                </span>
              </div>
              <div className="trip-card-body">
                <div className="trip-card-name">{trip.tripName}</div>
                <div className="trip-card-city">📍 {trip.city}</div>
                <div className="trip-card-meta">
                  <div className="meta-item">
                    <div className="meta-label">Budget</div>
                    <div className="meta-value">₹{Number(trip.budget || 0).toLocaleString("en-IN")}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Departure</div>
                    <div className="meta-value">{trip.start || trip.startDate || "TBD"}</div>
                  </div>
                  <div className="meta-item">
                    <div className="meta-label">Duration</div>
                    <div className="meta-value">{trip.days || "—"} days</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
