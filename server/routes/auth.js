const express=require('express');
const User = require('../models/user');
const bcryptjs=require('bcryptjs');//used for hashing the password to make the app secure

const authRouter=express.Router();
authRouter.post('/api/signup',async (req,res)=>{
    //get the data from the user
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({msg:'User with same email already exists!'});
    }

    const hashedPassword= await bcryptjs.hash(password,8);//password , hasshvalue->a future so we need to await

    let user=new User({
        name,
        email,
        password: hashedPassword,
    })
    user=await user.save();
    res.json(user);
    //post the data to the server
    //return the data to the user
})
//Since this file and its components can only be accessed from here we need to export it to access it from other places
module.exports=authRouter;