import React, { useState } from "react";

const styles = `
  @keyframes fadeSlide { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes popIn { 0%{opacity:0;transform:scale(0.9)} 100%{opacity:1;transform:scale(1)} }

  .notes-page { animation: fadeSlide 0.4s ease; }

  .notes-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 20px;
    min-height: calc(100vh - 200px);
  }
  @media (max-width: 800px) { .notes-layout { grid-template-columns: 1fr; } }

  .notes-sidebar {
    background: white;
    border-radius: 16px;
    border: 1px solid #e0d8cc;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .notes-sidebar-header {
    padding: 18px 18px 12px;
    border-bottom: 1px solid #f0ebe0;
  }

  .notes-search {
    position: relative;
    margin-bottom: 12px;
  }
  .notes-search span { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); font-size: 14px; }
  .notes-search input {
    width: 100%;
    padding: 9px 12px 9px 32px;
    background: #faf7f2;
    border: 1.5px solid #e0d8cc;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #1a1410;
    outline: none;
    transition: border-color 0.2s;
  }
  .notes-search input:focus { border-color: #c4622d; background: white; }

  .new-note-btn {
    width: 100%;
    padding: 10px;
    background: linear-gradient(135deg, #c4622d, #a0511e);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: all 0.2s;
  }
  .new-note-btn:hover { opacity: 0.9; transform: translateY(-1px); }

  .note-list { flex: 1; overflow-y: auto; }

  .note-item {
    padding: 14px 18px;
    border-bottom: 1px solid #f5f0e8;
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
  }
  .note-item:hover { background: #faf7f2; }
  .note-item.active { background: linear-gradient(135deg, rgba(196,98,45,0.06), rgba(196,98,45,0.02)); border-left: 3px solid #c4622d; }

  .note-item-title {
    font-size: 14px;
    font-weight: 600;
    color: #1a1410;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .note-item-preview {
    font-size: 12px;
    color: #b5ada4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 6px;
  }
  .note-item-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: #c5bdb5;
  }

  .note-tag {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 100px;
    font-weight: 500;
  }

  .notes-editor {
    background: white;
    border-radius: 16px;
    border: 1px solid #e0d8cc;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .editor-toolbar {
    padding: 14px 20px;
    border-bottom: 1px solid #f0ebe0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .title-input {
    flex: 1;
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: #1a1410;
    border: none;
    outline: none;
    background: transparent;
    min-width: 0;
  }
  .title-input::placeholder { color: #d0c8c0; font-weight: 400; }

  .editor-actions { display: flex; gap: 8px; }

  .ed-btn {
    padding: 8px 16px;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1.5px solid #e0d8cc;
    background: white;
    color: #8a7f74;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .ed-btn:hover { border-color: #8a7f74; color: #1a1410; }
  .ed-btn.save { background: linear-gradient(135deg,#c4622d,#a0511e); color: white; border-color: transparent; }
  .ed-btn.save:hover { opacity: 0.9; transform: translateY(-1px); }
  .ed-btn.del:hover { border-color: #e05252; color: #e05252; }

  .tag-bar {
    padding: 10px 20px;
    border-bottom: 1px solid #f5f0e8;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    align-items: center;
  }
  .tag-bar-label { font-size: 12px; color: #8a7f74; font-weight: 500; margin-right: 4px; }

  .tag-chip {
    padding: 3px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border: 1.5px solid #e0d8cc;
    background: white;
    color: #8a7f74;
    transition: all 0.2s;
  }
  .tag-chip:hover { border-color: #c4622d; color: #c4622d; }
  .tag-chip.active { background: #c4622d; border-color: #c4622d; color: white; }

  .note-textarea {
    flex: 1;
    padding: 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.8;
    color: #1a1410;
    border: none;
    outline: none;
    resize: none;
    min-height: 400px;
    background: white;
  }
  .note-textarea::placeholder { color: #d0c8c0; }

  .editor-footer {
    padding: 10px 20px;
    border-top: 1px solid #f5f0e8;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #c5bdb5;
  }

  .no-note-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #c5bdb5;
    gap: 12px;
    padding: 60px;
  }
  .no-note-state span { font-size: 48px; }
  .no-note-state p { font-size: 15px; }
`;

const tagColors = {
  "Trip": { bg: "rgba(196,98,45,0.1)", color: "#c4622d" },
  "Idea": { bg: "rgba(212,168,67,0.1)", color: "#a07810" },
  "Budget": { bg: "rgba(45,125,110,0.1)", color: "#2d7d6e" },
  "Reminder": { bg: "rgba(74,173,160,0.1)", color: "#1e7a70" },
};

const initialNotes = [
  { id: 1, title: "Rajasthan Itinerary", content: "Day 1: Arrive Jaipur, visit Amber Fort\nDay 2: Hawa Mahal and City Palace\nDay 3: Drive to Jodhpur\nDay 4: Mehrangarh Fort\nDay 5: Jaisalmer\nDay 6: Desert Safari\nDay 7: Return flight", tag: "Trip", date: "May 9" },
  { id: 2, title: "Best Restaurants in Goa", content: "- Thalassa (Greek, Vagator beach)\n- Gunpowder (Assagao)\n- Vinayak (local Goan food)\n- Fisherman's Wharf (Cavelossim)\n- Britto's (Baga)", tag: "Idea", date: "Apr 28" },
  { id: 3, title: "Budget Breakdown Notes", content: "Hotel: Try OYO Rooms for budget stays\nFood: Local dhabas are great value\nTransport: Use RedBus for interstate buses", tag: "Budget", date: "Apr 20" },
];

const tags = ["Trip", "Idea", "Budget", "Reminder"];

export default function Notes() {
  const [notes, setNotes] = useState(initialNotes);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTag, setEditTag] = useState("Trip");
  const [saved, setSaved] = useState(false);

  const activeNote = notes.find(n => n.id === activeId);

  const selectNote = (note) => {
    setActiveId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditTag(note.tag);
    setSaved(false);
  };

  const newNote = () => {
    const n = { id: Date.now(), title: "Untitled Note", content: "", tag: "Idea", date: "Today" };
    setNotes(p => [n, ...p]);
    selectNote(n);
  };

  const save = () => {
    setNotes(prev => prev.map(n =>
      n.id === activeId ? { ...n, title: editTitle || "Untitled", content: editContent, tag: editTag } : n
    ));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteNote = () => {
    setNotes(prev => prev.filter(n => n.id !== activeId));
    setActiveId(null);
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  const wordCount = editContent.trim().split(/\s+/).filter(Boolean).length;

  return (
    <>
      <style>{styles}</style>
      <div className="notes-page">
        <div className="notes-layout">
          {/* Sidebar */}
          <div className="notes-sidebar">
            <div className="notes-sidebar-header">
              <div className="notes-search">
                <span>🔍</span>
                <input placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="new-note-btn" onClick={newNote}>+ New Note</button>
            </div>
            <div className="note-list">
              {filtered.map(note => (
                <div key={note.id} className={`note-item${activeId === note.id ? " active" : ""}`} onClick={() => selectNote(note)}>
                  <div className="note-item-title">{note.title}</div>
                  <div className="note-item-preview">{note.content.slice(0, 60)}...</div>
                  <div className="note-item-meta">
                    <span>{note.date}</span>
                    <span className="note-tag" style={tagColors[note.tag]}>
                      {note.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="notes-editor">
            {activeNote ? (
              <>
                <div className="editor-toolbar">
                  <input
                    className="title-input"
                    placeholder="Note title..."
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                  />
                  <div className="editor-actions">
                    <button className="ed-btn del" onClick={deleteNote}>🗑️ Delete</button>
                    <button className="ed-btn save" onClick={save}>
                      {saved ? "✅ Saved!" : "💾 Save"}
                    </button>
                  </div>
                </div>
                <div className="tag-bar">
                  <span className="tag-bar-label">Tag:</span>
                  {tags.map(t => (
                    <button
                      key={t}
                      className={`tag-chip${editTag === t ? " active" : ""}`}
                      onClick={() => setEditTag(t)}
                    >{t}</button>
                  ))}
                </div>
                <textarea
                  className="note-textarea"
                  placeholder="Start writing your travel notes... ✈️"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                />
                <div className="editor-footer">
                  <span>{wordCount} words</span>
                  <span>Press Ctrl+S to save</span>
                </div>
              </>
            ) : (
              <div className="no-note-state">
                <span>📓</span>
                <p>Select a note or create a new one</p>
                <button className="new-note-btn" style={{ width: "auto", padding: "10px 24px" }} onClick={newNote}>
                  + New Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
