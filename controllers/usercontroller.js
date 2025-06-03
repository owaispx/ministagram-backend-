const User =require ("../models/usermodel")
const bcrypt = require ("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const registerhandler = async (req,res)=>{

     console.log("Body received:", req.body);
    try {
        const {username, email, password }= req.body;
        const existinguser = await User.findOne({email})
        if (!existinguser) {
            if(( username !== "" && email!=="" && password !== "" )){
                const hashespassword = await bcrypt.hash(password,10);
                const newuser = new User({username ,email, password:hashespassword});
                await newuser .save();
                res.json({ message : "regestration successfull"})
            }else{
                res.json ({message:"all credentials required"})
            }

        } else {
                res.json({message: "user already exist"})
            }
    }
    catch(err){
        res.json ({message :  err.message || "Internal Server Error"})
        console.log (err)
    }
}

const loginhandler = async (req,res)=>{
    try {   
        
    }


    catch(err){
        res.json ({message : err.message || "internal server error"})
    }
}

module.exports = {
    registerhandler,
}