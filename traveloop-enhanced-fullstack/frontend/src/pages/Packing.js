import React, { useState } from "react";

const styles = `
  @keyframes fadeSlide { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes checkBounce { 0%{transform:scale(0)} 60%{transform:scale(1.3)} 100%{transform:scale(1)} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

  .packing-page { animation: fadeSlide 0.4s ease; }

  .pack-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .progress-wrap {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e0d8cc;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .progress-circle {
    width: 80px; height: 80px;
    flex-shrink: 0;
    position: relative;
  }

  .progress-circle svg { width: 100%; height: 100%; transform: rotate(-90deg); }

  .progress-label {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: #2d7d6e;
  }
  .progress-label span { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 400; color: #8a7f74; }

  .progress-info { flex: 1; }
  .progress-info h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #1a1410; margin-bottom: 4px; }
  .progress-info p { font-size: 14px; color: #8a7f74; margin-bottom: 12px; }

  .progress-bar-bg { height: 8px; background: #f0ebe0; border-radius: 100px; overflow: hidden; }
  .progress-bar { height: 100%; border-radius: 100px; background: linear-gradient(90deg, #2d7d6e, #4aada0); transition: width 0.5s ease; }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .cat-card {
    background: white;
    border-radius: 16px;
    border: 1px solid #e0d8cc;
    overflow: hidden;
  }

  .cat-header {
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #f0ebe0;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
  }
  .cat-header:hover { background: #faf7f2; }

  .cat-icon { font-size: 22px; }
  .cat-name { font-size: 15px; font-weight: 600; color: #1a1410; flex: 1; }
  .cat-count { font-size: 12px; color: #8a7f74; background: #f5f0e8; padding: 3px 10px; border-radius: 100px; }

  .cat-items { padding: 8px 0; }

  .pack-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    transition: background 0.15s;
    animation: slideIn 0.3s ease;
    cursor: pointer;
    user-select: none;
  }
  .pack-item:hover { background: #faf7f2; }

  .custom-check {
    width: 20px; height: 20px;
    border: 2px solid #d0c8c0;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
    background: white;
  }
  .custom-check.checked {
    background: #2d7d6e;
    border-color: #2d7d6e;
    animation: checkBounce 0.3s ease;
  }
  .check-mark { color: white; font-size: 12px; font-weight: 700; }

  .item-label {
    font-size: 14px;
    color: #1a1410;
    flex: 1;
    transition: all 0.2s;
  }
  .item-label.done { text-decoration: line-through; color: #b5ada4; }

  .item-delete {
    opacity: 0;
    background: none;
    border: none;
    color: #e05252;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    transition: opacity 0.2s;
  }
  .pack-item:hover .item-delete { opacity: 1; }

  .add-item-row {
    display: flex;
    gap: 8px;
    padding: 12px 20px 16px;
    border-top: 1px solid #f5f0e8;
  }

  .add-item-input {
    flex: 1;
    padding: 9px 12px;
    background: #faf7f2;
    border: 1.5px solid #e0d8cc;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #1a1410;
    outline: none;
    transition: border-color 0.2s;
  }
  .add-item-input:focus { border-color: #2d7d6e; background: white; }
  .add-item-input::placeholder { color: #b5ada4; }

  .add-item-btn {
    padding: 9px 14px;
    background: #2d7d6e;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
    line-height: 1;
  }
  .add-item-btn:hover { background: #1e5a52; transform: scale(1.05); }

  .toolbar-right { display: flex; gap: 10px; }

  .clear-btn {
    padding: 9px 18px;
    background: white;
    border: 1.5px solid #e0d8cc;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #8a7f74;
    cursor: pointer;
    transition: all 0.2s;
  }
  .clear-btn:hover { border-color: #e05252; color: #e05252; }
`;

const initialCategories = [
  {
    id: 1, name: "Documents", icon: "📄", open: true,
    items: [
      { id: 11, label: "Passport", done: true },
      { id: 12, label: "Aadhar Card / ID Proof", done: true },
      { id: 13, label: "Hotel Booking Confirmation", done: false },
      { id: 14, label: "Travel Insurance", done: false },
    ]
  },
  {
    id: 2, name: "Clothing", icon: "👕", open: true,
    items: [
      { id: 21, label: "T-Shirts (5)", done: true },
      { id: 22, label: "Trousers / Jeans", done: false },
      { id: 23, label: "Warm Jacket", done: false },
      { id: 24, label: "Comfortable Shoes", done: true },
    ]
  },
  {
    id: 3, name: "Toiletries", icon: "🧴", open: false,
    items: [
      { id: 31, label: "Toothbrush & Paste", done: false },
      { id: 32, label: "Shampoo & Soap", done: false },
      { id: 33, label: "Sunscreen SPF 50", done: false },
      { id: 34, label: "Insect Repellent", done: false },
    ]
  },
  {
    id: 4, name: "Electronics", icon: "🔌", open: false,
    items: [
      { id: 41, label: "Phone Charger", done: true },
      { id: 42, label: "Power Bank", done: false },
      { id: 43, label: "Camera", done: false },
    ]
  },
];

export default function Packing() {
  const [cats, setCats] = useState(initialCategories);
  const [inputs, setInputs] = useState({});

  const totalItems = cats.flatMap(c => c.items).length;
  const doneItems = cats.flatMap(c => c.items).filter(i => i.done).length;
  const pct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  const toggle = (cId, iId) => setCats(prev => prev.map(c =>
    c.id === cId ? { ...c, items: c.items.map(i => i.id === iId ? { ...i, done: !i.done } : i) } : c
  ));

  const toggleCat = (cId) => setCats(prev => prev.map(c => c.id === cId ? { ...c, open: !c.open } : c));

  const deleteItem = (cId, iId) => setCats(prev => prev.map(c =>
    c.id === cId ? { ...c, items: c.items.filter(i => i.id !== iId) } : c
  ));

  const addItem = (cId) => {
    const label = inputs[cId]?.trim();
    if (!label) return;
    setCats(prev => prev.map(c =>
      c.id === cId ? { ...c, items: [...c.items, { id: Date.now(), label, done: false }] } : c
    ));
    setInputs(p => ({ ...p, [cId]: "" }));
  };

  const clearDone = () => setCats(prev => prev.map(c => ({ ...c, items: c.items.filter(i => !i.done) })));

  const r = 33, circum = 2 * Math.PI * r;

  return (
    <>
      <style>{styles}</style>
      <div className="packing-page">
        <div className="pack-header">
          <div></div>
          <div className="toolbar-right">
            <button className="clear-btn" onClick={clearDone}>Remove Packed</button>
          </div>
        </div>

        <div className="progress-wrap">
          <div className="progress-circle">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r={r} fill="none" stroke="#f0ebe0" strokeWidth="10" />
              <circle
                cx="40" cy="40" r={r}
                fill="none"
                stroke="#2d7d6e"
                strokeWidth="10"
                strokeDasharray={`${(pct / 100) * circum} ${circum}`}
                strokeDashoffset={circum / 4}
                style={{ transition: "stroke-dasharray 0.6s ease" }}
              />
            </svg>
            <div className="progress-label">
              {pct}%<span>done</span>
            </div>
          </div>
          <div className="progress-info">
            <h3>Packing Progress</h3>
            <p>{doneItems} of {totalItems} items packed</p>
            <div className="progress-bar-bg">
              <div className="progress-bar" style={{ width: `${pct}%` }}></div>
            </div>
          </div>
        </div>

        <div className="categories-grid">
          {cats.map(cat => {
            const catDone = cat.items.filter(i => i.done).length;
            return (
              <div className="cat-card" key={cat.id}>
                <div className="cat-header" onClick={() => toggleCat(cat.id)}>
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-count">{catDone}/{cat.items.length}</span>
                  <span style={{ color: "#8a7f74", fontSize: "12px" }}>{cat.open ? "▲" : "▼"}</span>
                </div>
                {cat.open && (
                  <div className="cat-items">
                    {cat.items.map(item => (
                      <div className="pack-item" key={item.id} onClick={() => toggle(cat.id, item.id)}>
                        <div className={`custom-check${item.done ? " checked" : ""}`}>
                          {item.done && <span className="check-mark">✓</span>}
                        </div>
                        <span className={`item-label${item.done ? " done" : ""}`}>{item.label}</span>
                        <button
                          className="item-delete"
                          onClick={e => { e.stopPropagation(); deleteItem(cat.id, item.id); }}
                          title="Remove item"
                        >×</button>
                      </div>
                    ))}
                    <div className="add-item-row">
                      <input
                        className="add-item-input"
                        placeholder="Add item..."
                        value={inputs[cat.id] || ""}
                        onChange={e => setInputs(p => ({ ...p, [cat.id]: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && addItem(cat.id)}
                        onClick={e => e.stopPropagation()}
                      />
                      <button className="add-item-btn" onClick={e => { e.stopPropagation(); addItem(cat.id); }}>+</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
