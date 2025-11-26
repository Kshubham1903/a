// src/App.jsx
import React, { useEffect, useState } from "react";

const API = "http://localhost:3000/items";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // define fetchItems BEFORE useEffect so it's definitely available
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("fetchItems error:", err);
      // optionally show a UI error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // safe: this runs after first render when fetchItems is already defined
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps -> run once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({ name });
      const opts = {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body,
      };
      const url = editId ? `${API}/${editId}` : API;
      const res = await fetch(url, opts);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setName("");
      setEditId(null);
      await fetchItems();
    } catch (err) {
      console.error("submit error:", err);
      alert("Request failed — check console and server.");
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      await fetchItems();
    } catch (err) {
      console.error("delete error:", err);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", textAlign: "center" }}>
      <h2>Simple CRUD</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setName("");
            }}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <ul style={{ marginTop: 20 }}>
          {items.map((it) => (
            <li key={it._id} style={{ marginBottom: 10 }}>
              {it.name}
              <button
                onClick={() => {
                  setName(it.name);
                  setEditId(it._id);
                }}
                style={{ marginLeft: 8 }}
              >
                Edit
              </button>
              <button onClick={() => deleteItem(it._id)} style={{ marginLeft: 8 }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
