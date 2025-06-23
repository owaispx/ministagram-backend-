const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const registerhandler = async (req, res) => {

    console.log("Body received:", req.body);
    try {
        const { username, email, password } = req.body;
        const existinguser = await User.findOne({ email })
        if (!existinguser) {
            if ((username !== "" && email !== "" && password !== "")) {
                const hashespassword = await bcrypt.hash(password, 10);
                const newuser = new User({ username, email, password : hashespassword });
                await newuser.save();
                res.json({ message: "Regestration successfull" })
            } else {
                res.json({ message: "all credentials required" })
            }

        } else {
            res.json({ message: "user already exist" })
        }
    }
    catch (err) {
        res.json({ message: err.message || "Internal Server Error" })
        console.log(err)
    }
}

const loginhandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isuser = await User.findOne({ email })
        if (email !== "" && password !== "") {
            if (isuser) {
                const passvarify = await bcrypt.compare(password, isuser.password);
                if (passvarify) {
                    const token = await jsonwebtoken.sign({ _id: isuser._id }, "oursecretkey")
                    console.log ( "your token is ",token)
                    res.json({
                        message: "Logged in successfully", token

                    })
                } else {
                    res.json({ message: "password incorrect" })
                }
            }
            else {
                res.json({ message: "User not found" })
            }
        } else {
            res.json({ message: "All credentials required" })
        }

    }
    catch (err) {
        res.json({ message: err.message || "Internal server error" })
    }
}

 const deleteuserhandler = (req , res)=>{
        try {
         const {email,password} = req.body
        }
        catch(err){
            res.json({message :err.message || "Internal server error"})
        }
    }

module.exports = {
    registerhandler,
    loginhandler,
    deleteuserhandler,
}