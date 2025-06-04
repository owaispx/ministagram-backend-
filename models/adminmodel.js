  const mongoose = require ("mongoose")
  
  const Admin = mongoose.model( "Admin",{
    username : String ,
    email   :{
        type : String, unique: true ,require:true 
    },
    password : String
}) ;

module.exports = Admin ;