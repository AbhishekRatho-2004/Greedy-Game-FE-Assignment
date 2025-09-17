const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true, 
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    seenBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }]
}, { timestamps: true })

const Person = mongoose.model("Person", personSchema)

module.exports = Person