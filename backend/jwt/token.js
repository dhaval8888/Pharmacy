import jwt from "jsonwebtoken"

export const generateTokenAndSaveInCookie = async (userId, res) =>{
    // console.log("token token")
    const token= jwt.sign({userId},process.env.JWT_KEY,
        {expiresIn:"10d",}
    )

    res.cookie("jwt", token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"
    })
}