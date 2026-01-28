const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signup..
const signup = async(req,res)=>{
    try {
        const {userName,email,password} = req.body;

        if(!userName || !email ||!password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success:false,
                message:"User already exists.."
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            userName,
            email,
            password:hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET,{
            expiresIn:"2d",
        });

        res.cookie('token',token,{
            httpOnly:true,
            maxAge:2*24*60*60*1000,
        });

        res.status(201).json({
            success:true,
            message:"Signup successfully."
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error " + error.message,
        })
    }
}


//login
const login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{
            expiresIn:"2d"
        })

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:2*24*60*60*1000, //2days
        })

        res.status(200).json({
            success:true,
            message:"Login successful.."
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error" + error.message
        });
    }
}

//logout
const logout = async(req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({
            success:true,
            message:"Logout successful."
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error: " + error.message,
        })
    }
};

module.exports = {signup,login,logout}