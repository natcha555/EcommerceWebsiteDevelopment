//เป็นต้นแบบ,โครงร่างข้อมูล ในการเก็บฐานข้อมูล User ที่จะนำเข้ามาเก็บใน MongoDB 
//Mongoose ร่างโมเดลขึ้นมาเพื่อรองรับข้อมูลที่จะส่งไปยัง MongoDB ได้โดยการสร้างโมเดลขึ้นมาก่อนที่จะส่งไปยังฐานข้อมูล

import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    root:{
        type:Boolean,
        default:false
    },
    avatar:{
        type: String,
        default:'https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Photo.png'
    }

},{
    timestamps:true
})

let Dataset = mongoose.models.user || mongoose.model('user',userSchema) //โมเดลผู้ใช้ของเราสามารถเข้าถึงได้ทุกที่ในแอปพลิเคชัน
export default Dataset
//user ชื่อ collections หรือ table
 
