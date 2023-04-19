import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel"
import bcrypt from "bcrypt"
import {createAccessToken,createRefreshToken} from "../../../utils/generateToken"

connectDB()

export default async(req,res) => {
    switch(req.method){
        case "POST" :
            await login(req,res)
            break;
    }
}

const login = async(req,res) =>{
    try{
        const {email, password} = req.body //รับแค่ email กับ password

        const user = await Users.findOne({ email }) //หา email ว่ามีไหม 
        if(!user) return res.status(400).json({err: "This Email has not been registered yet."})

        const isMatch = await bcrypt.compare(password, user.password) //เช็ค password, user.password
        if(!isMatch) return res.status(400).json({err: "Password is incorrect."}) 

        //ให้ user เข้าถึง id
        const access_token = createAccessToken({id:user._id})
        const refresh_token = createRefreshToken({id:user._id})
        
        //response JSON ออกมา
        res.json({
            msg:"Login success!",
            refresh_token,
            access_token,
            user:{
                name:user.name,
                email:user.email,
                role:user.role,
                avatar:user.avatar,
                root:user.root
            }
        })
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}