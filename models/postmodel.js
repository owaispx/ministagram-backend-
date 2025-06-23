const mongoose =require ("mongoose");


const post = mongoose.model("post",{
    imageurl : String,
    bio : String,
});

module.exports = post ;