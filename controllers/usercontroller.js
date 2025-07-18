const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")

// const registerhandler = async (req, res) => {

//     // console.log("Body received:", req.body);
//     try {
//         const { username, email, password } = req.body;
//         const existinguser = await User.findOne({ email })
//         if (!existinguser) {
//             if ((username !== "" && email !== "" && password !== "")) {
//                 const hashespassword = await bcrypt.hash(password, 10);
//                 const newuser = new User({ username, email, password : hashespassword });
//                 await newuser.save();
//                 res.json({ message: "Regestration successfull" })
//             } else {
//                 res.json({ message: "all credentials required" })
//             }

//         } else {
//             res.json({ message: "user already exist" })
//         }
//     }
//     catch (err) {
//         res.json({ message: err.message || "Internal Server Error" })
//         console.log(err)
//     }
// }

const registerhandler = async (req, res) => {
    try {
        const { username, email, password, image } = req.body;
        const existinguser = await User.findOne({ email })
        const hashedpassword = await bcrypt.hash(password, 10)

        if (username && email && password !== "") {
            if (!existinguser) {
                const upload = await cloudinary.uploader.upload(image, {
                    folder: "minstagram",
                });
                const profilepicurl = upload.secure_url;

                if (upload) {
                    const newuser = new User({
                        username,
                        email,
                        profilepicurl,
                        password: hashedpassword,
                    });
                    await newuser.save();
                    res.status(202).json({ message: "Regestration successfull" })
                } else {
                    res.json({ message: "Kindly select image less then 5mb" })

                }
            } else {
                res.json({ message: "User already exists" })
            }

        } else {
            res.json({ message: "All credentials required" })
        }

    }
    catch (err) {
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
                    console.log("your token is ", token)
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

const deleteuserhandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isuser = await User.findOne({ email });
        if (email && password !== "") {
            if (isuser) {
                const userid = isuser._id;
                const passvarify = await bcrypt.compare(password, isuser.password)
                if (passvarify) {
                    const deluser = await User.findByIdAndDelete(userid);
                    if (deluser) {
                        res.json({ message: "User deleted successfully" })
                    }
                } else {
                    res.json({ message: "password dose not match" })
                }

             
            } else {
                res.json({message : "user not found + already deleated"})
            }

        }   else {
                res.json({ message: "All credentials required" })
        }
    }
    catch (err) {
        res.json({ message: err.message || "Internal server error" })
    }
}

const getuserdetails = async (req, res) => {
    try {
        const userid = req.User._id;
        const user = await User.findById(userid).select("- passowrd")
        if (!user) {
            res.status(400).json({ message: "user not found" })
        }
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(505).json({ message: "server error" })
    }

}



module.exports = {
    registerhandler,
    loginhandler,
    deleteuserhandler,
    getuserdetails,
}