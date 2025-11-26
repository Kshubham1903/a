//npm init -y
//npm i
//npm i express mongoose cors

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174", 
    methods: ["GET", "POST"],
  })
);


mongoose
  .connect("mongodb://localhost:27017/reactdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));


const ItemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", ItemSchema);


app.post("/add", async (req, res) => {
  try {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.json({ message: "Item inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});