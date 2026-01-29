const express = require('express');
const {login,signup,logout} = require(".././controller/authController");
const { userAuth } = require('../middleware/userAuth');

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.get("/checkauth",userAuth,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        data:user
    });
});

module.exports = router