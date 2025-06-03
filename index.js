const express = require("express")
const mongoose = require("mongoose")
// const bodyparser = require("body-parser")
const { registerhandler,loginhandler } = require("./controllers/usercontroller")
const port = 3000
const url = "mongodb://localhost:27017/myfirstdatabase"
const server = express()
server.use(express.json()); 

if (mongoose.connect(url)) {
    console.log("database connected ")
} else {
    console.log("database error")
}

server.post("/user/register", registerhandler)
server.post("/user/login", loginhandler)

server.listen(port, () => {
    console.log(`app is running on port ${port}`)
})