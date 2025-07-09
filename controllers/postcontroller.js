
const post = require("../models/postmodel")
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
                    const newItem = new post({ bio, imageurl });
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
        const items = await post.findOne();
        if (items)
            res.json(items);
        console.log(items);
    }
    catch (err) {
        console.log(err)
    };
};
togglelikehandler = async (req, res) => {
    try {
        const postid = req.params.postid;
        const userid = req.User.id;

        const post = await post.findById(postid)

        if (!post) {
            res.status(404).json({ message: "post not found" })
        }

        const hasliked = post.likes.includes(userid);

        if (hasliked) {
            post.likes.pull(userid);
        } else {
            post.likes.push(userid);
        }
        await post.save();
        res.status(200).json({
            message: hasliked ? "post unliked" : "post liked",
            liked: !hasliked,
            likescount: Item.likes.length,
            likes: post.likes

        })
        console.log(likescount);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error", error: error.message })
    }
}

commentshandler = async (req, res) => {
    try {
        const postid = req.params.postid;
        const itemid = req.user.id;
        const { text } = req.body;

        if (!text) {
            res.status(400).json({ message: "Comment is required" })
        }
        const post = await post.findById(postid);
        if (!post) {
            res.status(400).json({ message: "post not found" })
        }
        const comment = {
            text,
            user: userid
        };
        post.comments.push(comment);
        await post.save();
        res.status(500).json({ message: "comment added", comment })

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "server error", error: err.message })
    }

}
const deleteposthandler = async (req, res) => {
    try {
        const postid = req.params.id;
        const userid = req.user.id;
        const post = await post.findById(postid)
        if (!post) {
             res.json ({message : "post not found"})
        }
        if (post.user.toString() !== userid){
            res.json({message:"unauthorised to delete this post"})
        }

        await post.findByIdAndDelete(postid);
        res.json({message:"post deleted successfully"})
    }
    catch (err) {
        console.log(err)
        res.json ({message: "server error"})
    }
}

module.exports = { createposthandler, getpostshandler, togglelikehandler, commentshandler,deleteposthandler }