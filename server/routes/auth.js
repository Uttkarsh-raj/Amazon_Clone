const express=require('express');

const authRouter = express.Router();
authRouter.get('/user',(req,res)=>{
    res.json({msg:"naruto"});
});

//Since this file and its components can only be accessed from here we need to export it to access it from other places
module.exports=authRouter;