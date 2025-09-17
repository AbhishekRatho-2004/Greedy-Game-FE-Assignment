const express = require("express");
const Person = require("../model/Person");
const Todo = require("../model/Todo");
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roles");

const router = express.Router();


router.get("/users", verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await Person.find().select("-password"); 
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/todos", verifyToken, isAdmin, async (req, res) => {
  try {
    const todos = await Todo.find().populate("personId", "name email role");
    res.json({ todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/users/:id/todos", verifyToken, isAdmin, async (req, res) => {
  try {
    const todos = await Todo.find({ personId: req.params.id }).populate(
      "personId",
      "name email role"
    );
    res.json({ todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.patch("/users/:id/role", verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await Person.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    res.json({ message: "User promoted to admin", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/users/:id/todos", verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, description, dueDate, dueTime, status } = req.body;

    
    const user = await Person.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const todo = new Todo({
      title,
      description,
      dueDate,
      dueTime,
      status: status || "pending", 
      personId: user._id, 
    });

    await todo.save();

    res.status(201).json({
      message: `Todo assigned to ${user.name}`,
      todo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await Person.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Count todos
    const totalTodos = await Todo.countDocuments({ personId: user._id });
    const pendingTodos = await Todo.countDocuments({ personId: user._id, status: "pending" });
    const completedTodos = await Todo.countDocuments({ personId: user._id, status: "completed" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      stats: {
        total: totalTodos,
        pending: pendingTodos,
        completed: completedTodos,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
