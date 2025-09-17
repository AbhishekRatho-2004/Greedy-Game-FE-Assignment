const Person = require("../model/Person")

const getAllUsers = async (req,res)=>{
    const users = await Person.find().select("-password -__v")
    return res.status(200).json({
        success: true,
        users
    })
}

const getUserById = async (req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Please provide user id"
        })
    }
    const user = await Person.findById(id).select("-password -__v")
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    return res.status(200).json({
        success: true,
        user
    })
}

module.exports ={
    getAllUsers,
    getUserById
}