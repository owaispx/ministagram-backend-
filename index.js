const express = require("express")
const mongoose = require("mongoose")
// const bodyparser = require("body-parser")
const cors =  require ("cors")
const multermid =require ("./middlewares/multer")
const { registerhandler,loginhandler,deleteuserhandler } = require("./controllers/usercontroller")
const { createposthandler, getpostshandler, togglelikehandler, commentshandler } = require("./controllers/postcontroller")
const isauthenticated = require("./middlewares/auth")
const port = 3000
const url = "mongodb://localhost:27017/myfirstdatabase"
const server = express()
server.use(express.json()); 
server.use (cors());

if (mongoose.connect(url)) {
    console.log("database connected ")
} else {
    console.log("database error")
}

server.post("/user/register", registerhandler)
server.post("/user/login", loginhandler)
server.post("/user/post", isauthenticated ,multermid,createposthandler)


server.put ("/user/like/:postid" , isauthenticated,togglelikehandler)
server.put ("/user/comment/:postid",isauthenticated,commentshandler)
// getrouts

server.get("/user/posts",getpostshandler)

server.listen(port, () => {
    console.log(`app is running on port ${port}`)
})