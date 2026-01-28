const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"unauthorized:No token provided."
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found."
            })
        }

        req.user =  user; //Attach user to request
        next(); //Pass control to the next middleware

    } catch (error) {
        console.error("auth error:", error.message);
        res.status(500).json({
            success:false,
            message:"Internal server error: " + error.message
        })
    }
}

module.exports = {userAuth}