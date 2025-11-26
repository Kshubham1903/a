import React, { useState } from "react";
import './App.css';
function App() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();
      alert(result.message);
      setName("");
    } catch (error) {
      alert("ERROR: Could not connect to backend");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Insert Item into MongoDB</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 8, width: 200 }}
          required
        />

        <button type="submit" style={{ marginLeft: 10, padding: 8 }}>
          Add
        </button>
      </form>
    </div>
  );
}

export default App;