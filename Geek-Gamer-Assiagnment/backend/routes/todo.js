const express = require("express");
const Todo = require("../model/Todo");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, dueDate, dueTime, status } = req.body;

  
    if (!title || !description || !dueDate || !dueTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const allowedStatuses = ["pending", "in-progress", "completed"];
    const todoStatus = status && allowedStatuses.includes(status.toLowerCase()) 
      ? status.toLowerCase() 
      : "pending";

    const todo = new Todo({
      title,
      description,
      dueDate,
      dueTime,
      status: todoStatus,
      personId: req.user.id,
    });

    await todo.save();
    res.status(201).json({ message: "Todo created", todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ personId: req.user.id }).sort({
      dueDate: 1,
    });
    res.json({ todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      personId: req.user.id,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, description, dueDate, dueTime, status } = req.body;

    const todo = await Todo.findOne({
      _id: req.params.id,
      personId: req.user.id,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (dueDate) todo.dueDate = dueDate;
    if (dueTime) todo.dueTime = dueTime;
    if (status) todo.status = status;

    await todo.save();
    res.json({ message: "Todo updated", todo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      personId: req.user.id,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
