const Item = require("../models/postmodel")
const cloudinary = require("../utils/cloudinary")

const createposthandler = async (req, res) => {
    try {
        try {
            const { bio } = req.body;
            const image = req.file.path;
            if (bio !== "") {
                const uplaod = await cloudinary.uploader.upload(image, {
                    folder: ("minstagram images")
                });
                const imageurl = uplaod.secure_url;
                if (uplaod) {
                    const newItem = new Item({ bio, imageurl });
                    const savedItem = await newItem.save();

                    if (savedItem) {

                        res.json({ message: "Item saved successfully" })
                    }
                    else {
                        res.json({ message: "File system error" })
                    }
                } else {
                    res.json({ message: "Cloudinary error" })
                }

            } else {
                res.json({ message: "All fields required" })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    catch (err) {
        console.log(err)
    }
}

const getpostshandler = async (req, res) => {
    try {
        const items = await Item.findOne();
        if (items)
            res.json(items);
        console.log(items);
    }
    catch (err) {
        console.log(err)
    };
};

module.exports = { createposthandler, getpostshandler }