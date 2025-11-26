const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (local)
mongoose.connect("mongodb://localhost:27017/cruddb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Simple schema
const ItemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("items", ItemSchema);

// CREATE
app.post("/items", async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

// READ
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// UPDATE
app.put("/items/:id", async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
