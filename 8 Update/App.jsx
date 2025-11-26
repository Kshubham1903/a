import React, { useState } from "react";

function App() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  
  const handleUpdate = async (e) => {
    e.preventDefault(); 

    try {
  
      const response = await fetch(`http://localhost:5000/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }), 
      });

      const result = await response.json(); 
      alert(result.message); 

     
      setId("");
      setName("");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Existing Item in MongoDB</h2>

      {/* Form to input item ID and new name */}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Enter item ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ padding: 8, width: 200, marginRight: 10 }}
          required
        />

        <input
          type="text"
          placeholder="Enter new name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 8, width: 200, marginRight: 10 }}
          required
        />

        <button type="submit" style={{ padding: 8 }}>
          Update
        </button>
      </form>
    </div>
  );
}

export default App;
