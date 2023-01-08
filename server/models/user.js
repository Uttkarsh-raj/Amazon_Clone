const mongoose =require('mongoose');

//Schema--Structure of the application
const userSchema=mongoose.Schema({
    name:  {
        required: true,
        type:String,
        trim: true,
    },
    email: {
        required:true,
        type:String,
        trim:true,
        validate:{
            validator:(value)=>{
                const re=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: 'Please enter a valid Email.',
        }
    },

    password: {
        type:String,
        required:true,
        validate:{
            validator:(value)=>{
                return value.length>6;
            },
            message: 'Password too short. Atleast 6 characters.',
        }
    },

    address:{
        type:String,
        default:'',
    },

    type:{
        type:String,
        default:'user',
    }
    //cart
});

const User=mongoose.model('User',userSchema);
module.exports=User;