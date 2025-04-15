import User from "../model/user.model.js";
import bycrypt from "bcryptjs";
import { z } from "zod";
import { generateTokenAndSaveInCookie } from "../jwt/token.js";

const userSchema = z.object({
    email: z.string().email({message:"invalide email"}),
    username: z.string().min(3),
    password: z.string().min(6, {message:"password must atleast 6 letters"}).max(20),
})

export const signup=async(req,res ) =>{
    // console.log("signup function called");
    try {
        const {username, password, email}= req.body;
        // console.log(username,email,password)

        if(!username ||!password|| !email){
            return res.status(201).json({massage:"all three are requird"})
        }

        const validation = userSchema.safeParse({username, password, email});
        if(!validation.success){
            const errorMsg= validation.error.errors.map((err) => err.message);
            return res.status(400).json({error:errorMsg})
        }
        
        const user= await User.findOne({email})
        if(user){
            return res.status(201).json({massage:"user already exist"})
        }

        const hashpassword = await bycrypt.hash(password,10)
         
        const newUser = new User({email,username,password:hashpassword});   
        await newUser.save();
        if(newUser){
            const token= await generateTokenAndSaveInCookie(newUser._id, res)
            return res.status(201).json({message:"user registerd successfully", newUser});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in singup"})
    }

}

export const login=async(req,res ) =>{
    // console.log("login function called");
    try {
        const {email,password} = req.body;

        if(!password|| !email){
            return res.status(201).json({massage:"both are requird"})
        }

        const user= await User.findOne({email}).select("+password");
        if(!user || !await (bycrypt.compare(password, user.password))){
            return res.status(202).json({massage:"invalide email or password "})
        }

        const token = await generateTokenAndSaveInCookie(user._id,res)
        return res.status(202).json({massage:"logged in successfully",user,token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in login"})
    }
}

export const logout=async(req,res ) =>{
    try {
        res.clearCookie("jwt",{
            path: "/"
        })
        return res.status(202).json({massage:"logged out"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in log out"})
    }
}