const mongoose =require ("mongoose");


const post = mongoose.model("post",{
    imageurl : String,
    bio : String,
    likes: [

        { 
            type : mongoose.Schema.Types.ObjectId ,
            ref : "User"
    
        },
    ],
    comments :[
        {
            text :String,
            user :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            },

            createdat : {
                type :Date,
                default : Date.now
            }
        }
    ]
});

module.exports = post ;