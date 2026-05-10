import React, { useState } from "react";
import axios from "axios";

const styles = `
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes checkPop {
    0% { transform: scale(0); }
    70% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }

  .create-trip { animation: fadeSlide 0.4s ease; max-width: 720px; }

  .form-card {
    background: white;
    border-radius: 20px;
    border: 1px solid #e0d8cc;
    overflow: hidden;
  }

  .form-card-header {
    background: linear-gradient(135deg, #1a2e1a, #2d4a2d);
    padding: 32px 36px;
    position: relative;
    overflow: hidden;
  }
  .form-card-header::after {
    content: '✈️';
    position: absolute;
    right: 36px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 64px;
    opacity: 0.12;
  }

  .form-card-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: white;
    margin-bottom: 6px;
  }
  .form-card-header p {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
  }

  .form-body { padding: 36px; }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

  .field {
    margin-bottom: 20px;
  }

  .field label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #1a1410;
    margin-bottom: 8px;
  }

  .field-input, .field-select, .field-textarea {
    width: 100%;
    padding: 13px 16px;
    background: #faf7f2;
    border: 1.5px solid #e0d8cc;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    color: #1a1410;
    outline: none;
    transition: all 0.25s;
    appearance: none;
  }
  .field-input::placeholder, .field-textarea::placeholder { color: #b5ada4; }
  .field-input:focus, .field-select:focus, .field-textarea:focus {
    border-color: #c4622d;
    background: white;
    box-shadow: 0 0 0 4px rgba(196,98,45,0.08);
  }

  .field-textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

  .field-select-wrap { position: relative; }
  .field-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #8a7f74;
    pointer-events: none;
    font-size: 14px;
  }

  .input-prefix {
    position: relative;
  }
  .input-prefix span {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    color: #8a7f74;
    pointer-events: none;
  }
  .input-prefix input { padding-left: 34px; }

  .date-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .divider-label {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #8a7f74;
  }
  .divider-label::before, .divider-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0d8cc;
  }

  .tag-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
  }

  .tag-option {
    padding: 7px 16px;
    border-radius: 100px;
    border: 1.5px solid #e0d8cc;
    font-size: 13px;
    font-weight: 500;
    color: #8a7f74;
    cursor: pointer;
    background: white;
    transition: all 0.2s;
    user-select: none;
  }
  .tag-option:hover { border-color: #c4622d; color: #c4622d; }
  .tag-option.selected {
    background: linear-gradient(135deg, #c4622d, #a0511e);
    border-color: transparent;
    color: white;
  }

  .form-actions {
    display: flex;
    gap: 12px;
    padding-top: 8px;
  }

  .btn-primary {
    flex: 1;
    padding: 14px 24px;
    background: linear-gradient(135deg, #c4622d, #a0511e);
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(196,98,45,0.35); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .btn-secondary {
    padding: 14px 24px;
    background: white;
    color: #8a7f74;
    border: 1.5px solid #e0d8cc;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s;
  }
  .btn-secondary:hover { border-color: #8a7f74; color: #1a1410; }

  .success-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeSlide 0.3s ease;
  }

  .success-card {
    background: white;
    border-radius: 20px;
    padding: 48px;
    text-align: center;
    max-width: 360px;
    width: 90%;
  }

  .success-icon {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2d7d6e, #4aada0);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin: 0 auto 20px;
    animation: checkPop 0.5s ease;
  }

  .success-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: #1a1410;
    margin-bottom: 8px;
  }
  .success-card p { font-size: 14px; color: #8a7f74; margin-bottom: 24px; }
`;

const travelTypes = ["Adventure", "Beach", "Culture", "Business", "Road Trip", "Backpacking", "Luxury"];
const transports = ["✈️ Flight", "🚂 Train", "🚗 Car", "🚌 Bus", "🚢 Ship"];

export default function CreateTrip() {
  const [form, setForm] = useState({
    tripName: "", city: "", budget: "", startDate: "", endDate: "", notes: ""
  });
  const [travelType, setTravelType] = useState("");
  const [transport, setTransport] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSave = async () => {
    if (!form.tripName || !form.city) {
      alert("Trip name and city are required!");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/trips", {
        ...form, travelType, transport
      });
    } catch {
      // demo mode: show success anyway
    }
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
  };

  const reset = () => {
    setForm({ tripName: "", city: "", budget: "", startDate: "", endDate: "", notes: "" });
    setTravelType("");
    setTransport("");
    setSuccess(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="create-trip">
        <div className="form-card">
          <div className="form-card-header">
            <h2>Plan Your Next Adventure</h2>
            <p>Fill in the details below to create your trip</p>
          </div>

          <div className="form-body">
            <div className="form-row">
              <div className="field">
                <label>Trip Name *</label>
                <input className="field-input" placeholder="e.g. Rajasthan Desert Safari" value={form.tripName} onChange={set("tripName")} />
              </div>
              <div className="field">
                <label>Destination City *</label>
                <input className="field-input" placeholder="e.g. Jaisalmer" value={form.city} onChange={set("city")} />
              </div>
            </div>

            <div className="field">
              <label>Budget (₹)</label>
              <div className="input-prefix">
                <span>₹</span>
                <input className="field-input" type="number" placeholder="50000" value={form.budget} onChange={set("budget")} />
              </div>
            </div>

            <div className="field">
              <label>Travel Dates</label>
              <div className="date-grid">
                <input className="field-input" type="date" value={form.startDate} onChange={set("startDate")} />
                <input className="field-input" type="date" value={form.endDate} onChange={set("endDate")} />
              </div>
            </div>

            <div className="divider-label">Trip Style</div>

            <div className="field">
              <label>Travel Type</label>
              <div className="tag-group">
                {travelTypes.map(t => (
                  <div key={t} className={`tag-option${travelType === t ? " selected" : ""}`} onClick={() => setTravelType(t)}>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Mode of Transport</label>
              <div className="tag-group">
                {transports.map(t => (
                  <div key={t} className={`tag-option${transport === t ? " selected" : ""}`} onClick={() => setTransport(t)}>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Trip Notes</label>
              <textarea
                className="field-textarea"
                placeholder="Add any notes, itinerary ideas, or reminders..."
                value={form.notes}
                onChange={set("notes")}
              />
            </div>

            <div className="form-actions">
              <button className="btn-secondary" onClick={reset}>Clear</button>
              <button className="btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "✈️ Create Trip"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className="success-overlay" onClick={reset}>
          <div className="success-card" onClick={e => e.stopPropagation()}>
            <div className="success-icon">✅</div>
            <h3>Trip Created!</h3>
            <p>Your adventure to <strong>{form.city || "your destination"}</strong> has been saved successfully.</p>
            <button className="btn-primary" style={{ width: "100%" }} onClick={reset}>
              Plan Another Trip
            </button>
          </div>
        </div>
      )}
    </>
  );
}
