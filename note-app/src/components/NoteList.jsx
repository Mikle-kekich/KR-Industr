import React from "react";

export default function NoteList({ notes, onDelete }) {
  return (
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
          }}
        >
          <span>{note.text}</span>
          <button
            onClick={() => onDelete(note.id)}
            style={{
              background: "#e64242",
              color: "white",
              border: "none",
              borderRadius: 4,
              padding: "4px 12px",
              cursor: "pointer",
              marginLeft: 10,
            }}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}
