const {User} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorResponseWithoutData, errorResponseData, successResponseData } = require("../utils/response");



const registerUser = async(req,res)=>{
try {
    const {user_name,email,password} = req.body;
    const existingUser = await User.findOne({where:{email:email}})
     if(existingUser){
            // return res.status(400).json({message:"User already exists"});
            return errorResponseWithoutData(res,"User already exists",400)
        }
           const hasedPassword = await bcrypt.hash(password,10);
    const user = await User.create({user_name,email,password:hasedPassword})
    // return res.status(200).json({meaasge:"User create successfully",user})
    return successResponseData(res,"User create successfully",user)
} catch (error) {
     console.error("Error registering user:",error);
//  return res.status(500).json({message:"Internal server error"});
       return errorResponseData(res,"Internal server error")
}
}


const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
         const user = await User.findOne({where:{email:email}});
         if(!user){
            // return res.status(404).json({message:"User not found"});
            return errorResponseWithoutData(res,"User not found",404)
        }
          const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            // return res.status(401).json({message:"Invalid Credentials"});
            return errorResponseWithoutData(res,"Invalid Credentials",401)
        }
        const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
           res.cookie("token", token, {
      httpOnly: true,
      secure: false,  
      maxAge: 3600000,
      path:"/"
    });
    const userData = {
      id: user.id,
      name: user.user_name,
      email: user.email,
    };
      // return res.status(201).json({message:"User login successfully",token,User:userData}); 
      return successResponseData(res,{User:userData,token},"User login successfully")
    } catch (error) {
             console.error("Error during user login:",error);
        // return res.status(500).json({message:"Invalid Credentials"});
        return errorResponseData(res,"Invalid Credentials",500)
    }
}




module.exports = {registerUser,userLogin}