const jwt = require ("jsonwebtoken")

const isauthenticated = async (req , res )  =>{
 try {
     const token = req.headers.token || req.headers.authorization?.split(" ")[1] ;
     if (!token){
        return res.status (403).json ({message : "Forbidden"})
     }
     else {
          await jwt.verify(token , "oursecretkey ", (err,decode )=>{
            if (err){
                return res.json({message :"Unouthorised"})
            } else {
                req.info = decode ;
                return next();
            };
        });
     }
 } 
 catch (err){
    console.log (err)
 }

}
module.exports = isauthenticated ;