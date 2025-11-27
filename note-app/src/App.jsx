import React, { useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  function addNote(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    setNotes([
      ...notes,
      { id: Date.now(), text: input.trim() }
    ]);
    setInput("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function startEdit(id, text) {
    setEditingId(id);
    setEditText(text);
  }

  function saveEdit(id) {
    if (editText.trim() === "") return;
    setNotes(notes.map((note) => 
      note.id === id ? { ...note, text: editText.trim() } : note
    ));
    setEditingId(null);
    setEditText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, borderRadius: 10, background: "#fff" }}>
      <h2>Список заметок</h2>
      <form onSubmit={addNote} style={{ display: "flex", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Ваша заметка..."
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 4,
            border: "1px solid #ccc",
            marginRight: 8
          }}
        />
        <button
          type="submit"
          style={{
            background: "#22908d",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            cursor: "pointer"
          }}
        >
          Добавить
        </button>
      </form>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            style={{
              marginBottom: 12,
              padding: 8,
              background: "#f5f5f5",
              borderRadius: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {editingId === note.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(note.id);
                    if (e.key === "Escape") cancelEdit();
                  }}
                  autoFocus
                  style={{
                    flex: 1,
                    padding: 6,
                    borderRadius: 4,
                    border: "1px solid #22908d",
                    marginRight: 8
                  }}
                />
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => saveEdit(note.id)}
                    style={{
                      background: "#22908d",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 12px",
                      cursor: "pointer"
                    }}
                  >
                    ✓
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      background: "#999",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 12px",
                      cursor: "pointer"
                    }}
                  >
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <span 
                  onDoubleClick={() => startEdit(note.id, note.text)}
                  style={{ flex: 1, cursor: "pointer" }}
                >
                  {note.text}
                </span>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => startEdit(note.id, note.text)}
                    style={{
                      background: "#4a90e2",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 12px",
                      cursor: "pointer"
                    }}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    style={{
                      background: "#e64242",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      padding: "4px 12px",
                      cursor: "pointer"
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
