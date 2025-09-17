const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Todo = require("../model/Todo");


router.get("/:userId", async (req, res) => {
    try {
        const {userId }=req.params  

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todos = await Todo.find({
            personId: new mongoose.Types.ObjectId(userId), 
            dueDate: { $gte: today, $lt: tomorrow },
            seenBy: { $ne: new mongoose.Types.ObjectId(userId) } 
        }).sort({ dueDate: 1 });

        res.json({ success: true, todos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


router.post("/seen/:todoId/:userId", async (req, res) => {
    try {
        const { todoId, userId } = req.params;

        await Todo.findByIdAndUpdate(todoId, {
            $addToSet: { seenBy: new mongoose.Types.ObjectId(userId) }
        });

        res.json({ success: true, message: "Notification marked as seen" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

module.exports = router;
