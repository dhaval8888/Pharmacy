import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authanticate= async (req, res, next) =>{
    const token= req.cookies.jwt;
    // console.log(token)      
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    try {
        const decode= jwt.verify(token,'f0b3bfdd57eb09c9794b485e1e73dcca')
        req.user = await User.findById(decode.userId)
        console.log(req.user._id);    
        next(); 
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
};

export default {};