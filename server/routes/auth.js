const express=require('express');
const User = require('../models/user');
const bcryptjs=require('bcryptjs');//used for hashing the password to make the app secure
const jwt=require('jsonwebtoken');
const { isValidObjectId } = require('mongoose');

const authRouter=express.Router();
authRouter.get('/',async (req,res)=>{res.json({'mssg':'hello'})});
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

//SIGN IN ROUTE
authRouter.post('/api/signin',async(req,res)=>{
    try{
        const {email,password}=req.body;
        // console.log(req.body)
        const user=await User.findOne({email});w
        // console.log(user);
        if(!user){
            return res.status(400).json({msg:'User with this email does not exists!'});
        }
        // console.log(user)
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Incorrect Password"});
        }
        const token = jwt.sign({id:user._id},"passwordKey");
        res.json({token,...user._doc});
    }catch(e){
        res.status(500).json({error:e.message});
    };
});

//Token Validator
authRouter.post('/tokenIsValid',async(res,req)=>{
    try{
        const token =req.header('x-auth-token');
        //if token does not exists
        if(!token)return res.json(false);
        //verify token is present or not
        const verified= await jwt.verify(token,'passwordKey');
        if(!verified) return res.json(false);
        //verify existing user
        const user=await User.findById(verified.id);
        if(!user) return res.json(false);

        return res.json(true);
    }catch(e){
        res.status(500).json({error:e.message});
    };
});
module.exports=authRouter;