import React, { useState } from "react";

const styles = `
  @keyframes fadeSlide { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes barGrow { from { width: 0; } to { width: var(--bar-w); } }

  .budget-page { animation: fadeSlide 0.4s ease; }

  .budget-overview {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }
  @media (max-width: 700px) { .budget-overview { grid-template-columns: 1fr; } }

  .budget-summary-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e0d8cc;
    text-align: center;
    transition: transform 0.2s;
  }
  .budget-summary-card:hover { transform: translateY(-3px); }

  .bsc-icon { font-size: 32px; margin-bottom: 12px; display: block; }
  .bsc-amount {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #1a1410;
    display: block;
    margin-bottom: 4px;
  }
  .bsc-label { font-size: 13px; color: #8a7f74; }
  .bsc-bar {
    height: 4px;
    border-radius: 100px;
    margin-top: 14px;
  }

  .budget-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 800px) { .budget-grid { grid-template-columns: 1fr; } }

  .b-card {
    background: white;
    border-radius: 16px;
    border: 1px solid #e0d8cc;
    overflow: hidden;
  }

  .b-card-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f0ebe0;
  }
  .b-card-header h3 {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a1410;
  }

  .expense-row {
    padding: 16px 24px;
    border-bottom: 1px solid #f5f0e8;
  }
  .expense-row:last-child { border-bottom: none; }

  .exp-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .exp-left { display: flex; align-items: center; gap: 10px; }
  .exp-emoji { font-size: 20px; }
  .exp-name { font-size: 14px; font-weight: 500; color: #1a1410; }
  .exp-amount { font-size: 14px; font-weight: 700; color: #1a1410; }

  .exp-bar-bg {
    height: 6px;
    background: #f0ebe0;
    border-radius: 100px;
    overflow: hidden;
  }
  .exp-bar {
    height: 100%;
    border-radius: 100px;
    animation: barGrow 1s ease both;
  }

  .exp-pct { font-size: 11px; color: #8a7f74; margin-top: 4px; }

  .add-expense-form {
    padding: 20px 24px;
    background: #faf7f2;
    border-top: 1px solid #e0d8cc;
  }
  .add-expense-form h4 {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #1a1410;
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  .add-row {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 8px;
  }

  .ae-input {
    padding: 10px 12px;
    background: white;
    border: 1.5px solid #e0d8cc;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #1a1410;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }
  .ae-input:focus { border-color: #c4622d; }
  .ae-input::placeholder { color: #b5ada4; }

  .ae-btn {
    padding: 10px 16px;
    background: linear-gradient(135deg, #c4622d, #a0511e);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }
  .ae-btn:hover { opacity: 0.9; transform: translateY(-1px); }

  .donut-wrap {
    padding: 30px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .donut-svg { width: 180px; height: 180px; }

  .donut-legend {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .legend-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
  .legend-left { display: flex; align-items: center; gap: 10px; }
  .legend-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .legend-label { color: #1a1410; font-weight: 500; }
  .legend-pct { color: #8a7f74; font-weight: 600; }
`;

const categories = [
  { name: "Hotels & Stay", emoji: "🏨", amount: 20000, pct: 40, color: "#c4622d" },
  { name: "Food & Dining", emoji: "🍽️", amount: 10000, pct: 20, color: "#d4a843" },
  { name: "Transport", emoji: "🚗", amount: 15000, pct: 30, color: "#2d7d6e" },
  { name: "Activities", emoji: "🎡", amount: 5000, pct: 10, color: "#4aada0" },
];

const totalBudget = 50000;
const totalSpent = 42000;
const remaining = totalBudget - totalSpent;

function Donut({ categories }) {
  let cumulative = 0;
  const r = 70, cx = 90, cy = 90, circumference = 2 * Math.PI * r;

  return (
    <svg className="donut-svg" viewBox="0 0 180 180">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0ebe0" strokeWidth="22" />
      {categories.map((cat, i) => {
        const portion = (cat.pct / 100) * circumference;
        const offset = -cumulative * circumference / 100;
        cumulative += cat.pct;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={cat.color}
            strokeWidth="22"
            strokeDasharray={`${portion} ${circumference - portion}`}
            strokeDashoffset={offset - circumference / 4}
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        );
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="13" fill="#8a7f74" fontFamily="DM Sans">Spent</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a1410" fontFamily="Playfair Display">₹42k</text>
    </svg>
  );
}

export default function Budget() {
  const [expenses, setExpenses] = useState(categories);
  const [newName, setNewName] = useState("");
  const [newAmt, setNewAmt] = useState("");

  const addExpense = () => {
    if (!newName || !newAmt) return;
    const amt = parseInt(newAmt);
    setExpenses(p => [...p, { name: newName, emoji: "💸", amount: amt, pct: Math.round(amt / totalBudget * 100), color: "#8a7f74" }]);
    setNewName(""); setNewAmt("");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="budget-page">
        <div className="budget-overview">
          <div className="budget-summary-card">
            <span className="bsc-icon">💰</span>
            <span className="bsc-amount">₹50,000</span>
            <span className="bsc-label">Total Budget</span>
            <div className="bsc-bar" style={{ background: "linear-gradient(90deg,#c4622d,#d4a843)" }}></div>
          </div>
          <div className="budget-summary-card">
            <span className="bsc-icon">💸</span>
            <span className="bsc-amount" style={{ color: "#c4622d" }}>₹42,000</span>
            <span className="bsc-label">Amount Spent</span>
            <div className="bsc-bar" style={{ background: "linear-gradient(90deg,#e05252,#c4622d)" }}></div>
          </div>
          <div className="budget-summary-card">
            <span className="bsc-icon">✅</span>
            <span className="bsc-amount" style={{ color: "#2d7d6e" }}>₹8,000</span>
            <span className="bsc-label">Remaining</span>
            <div className="bsc-bar" style={{ background: "linear-gradient(90deg,#2d7d6e,#4aada0)" }}></div>
          </div>
        </div>

        <div className="budget-grid">
          <div className="b-card">
            <div className="b-card-header"><h3>Category Breakdown</h3></div>
            {expenses.map((cat, i) => (
              <div className="expense-row" key={i}>
                <div className="exp-top">
                  <div className="exp-left">
                    <span className="exp-emoji">{cat.emoji}</span>
                    <span className="exp-name">{cat.name}</span>
                  </div>
                  <span className="exp-amount">₹{cat.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="exp-bar-bg">
                  <div className="exp-bar" style={{ width: `${cat.pct}%`, background: cat.color }}></div>
                </div>
                <div className="exp-pct">{cat.pct}% of budget</div>
              </div>
            ))}
            <div className="add-expense-form">
              <h4>Add Expense</h4>
              <div className="add-row">
                <input className="ae-input" placeholder="Category" value={newName} onChange={e => setNewName(e.target.value)} />
                <input className="ae-input" type="number" placeholder="Amount ₹" value={newAmt} onChange={e => setNewAmt(e.target.value)} />
                <button className="ae-btn" onClick={addExpense}>+ Add</button>
              </div>
            </div>
          </div>

          <div className="b-card">
            <div className="b-card-header"><h3>Budget Distribution</h3></div>
            <div className="donut-wrap">
              <Donut categories={categories} />
              <div className="donut-legend">
                {categories.map((cat, i) => (
                  <div className="legend-row" key={i}>
                    <div className="legend-left">
                      <div className="legend-dot" style={{ background: cat.color }}></div>
                      <span className="legend-label">{cat.name}</span>
                    </div>
                    <span className="legend-pct">{cat.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
