const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    let authHeader = req.headers.authorization;
    console.log("hfjdvhdjkvb",authHeader)

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({message:"No token,authorised denied"})
        }
        try {
           const decode = jwt.verify(token,process.env.JWT_SECRET) 
           console.log("bhvghcgx",decode)
           req.user = decode;
           console.log("The user is decoded:",req.user)
           next();
        } catch (error) {

            res.status(400).json({message:"Token is not valid"})
        }
    }
}

module.exports =  authMiddleware