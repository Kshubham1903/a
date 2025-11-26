//npm init -y
//npm i
//npm i express mongoose cors


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


mongoose
  .connect("mongodb://localhost:27017/rit")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);


app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});