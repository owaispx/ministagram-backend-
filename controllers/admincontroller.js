const mongoose = require ("mongoose")
const Admin = require ("../models/adminmodel")
const jwt = require ("jsonwebtoken")
const bcrypt = require("bcrypt")

const adminregisterhandler = async (req,res)=>{
        
    try{
        const {username,email,password}=req.body ;
        const existingadmin = await Admin.findOne({email})
        if (!existingadmin){
           if ((username && email && password !== "")){
            const hashedpassword = await bcrypt.hash(password,10);
            const newadmin = new Admin({username,email,password:hashedpassword});
            await newadmin.save();
            res.json({message :"Regestratoin successfull"})
           }else{
            res.json({message: "All credentials required"})
           }
        }else{
            res.json({message:"Admin already exists"})
        }

    }
    catch (err){
        res.json({message : res.message || "Internal  server error"})
        console.log (err)

    }
}
adminloginhandler = async (req,res)=>{
    try{
        const {email ,password}=req.body;
        const isadmin = await Admin.findOne({email});
       if (email && password !== ""){
        if (isadmin){
           const passvarify = await bcrypt.compare(password,isadmin.password);
           if (passvarify){
            const token = await jwt.sign({_id :isadmin._id},"oursecretkey")
            console.log(token,"this is your token")
            res.json ({message: "Logged in successfully"})
           } else{
            res.json ({message: "Password incorrect"})
           }

        } else {
            res.json( {message: "Admin not found"})
        }

       }else{
        res.json ({message : "All credentials required"})
       }
    }
    catch (err){
        console.log (err)
        res.json ({message: err.message || "Internal server error"})
    }
}

module.exports = {
    adminregisterhandler,
    adminloginhandler
}