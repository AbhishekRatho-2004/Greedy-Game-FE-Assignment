const Person = require("../model/Person")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET


const registerController =  async (req,res)=>{
    const {name,email,password,role} = req.body
    if(!email || !name || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields"
        })
    }

    const existingUser = await Person.findOne({
        email:email
    })

    if(existingUser){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    
    const newUser = await Person.create({
        name,
        email,
        password:hashedPassword,
        role: role || "user"
    })

     const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, {
        expiresIn: "1d"
    });
     res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000 
    });

    
    req.session.user = {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role
    };

    return res.status(201).json({
        success: true,
        message: "User registered successfully"
    })
}

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the fields",
    });
  }

  const user = await Person.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  
  const cookieName = user.role === "admin" ? "admin_token" : "token";

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000,
  });

  req.session.user = {
    id: user._id,
    name: user.name,
    role: user.role,
  };

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    role: user.role,
    tokenType: cookieName,
    token:token,
    id: user._id,
  });
};


module.exports ={
    registerController,
    loginController
}