const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
        minlength: 10
    },
    dueDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    dueTime:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    personId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    }
}, { timestamps: true })

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo