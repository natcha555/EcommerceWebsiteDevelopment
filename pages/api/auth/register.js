import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel"
import valid from "../../../utils/valid";
import bcrypt from "bcrypt"


connectDB()

//สร้างเส้นทาง API Routes
export default async(req,res) => {
    switch(req.method){
        case "POST" : //การกำหนดรูปแบบการส่งข้อมูลจากฟอร์ม
            await register(req,res)
            break;
    }
}

const register = async(req,res) =>{
    try{
        const { name, email, password, cf_password } = req.body //อ่านข้อมูลที่ส่งแบบ POST และเก็บในตัวแปรที่เราสามารถนำมาใช้งานได้

        //ให้ errMsg เป็น valid ที่มีเงื่อนไข...
        const errMsg = valid(name, email, password, cf_password)
        //ถ้ามี errMsg ให้แสดง
        if(errMsg) return res.status(400).json({err: errMsg})
        //ถ้า email มีการใช้ซ้ำ
        const user = await Users.findOne({ email }) //ค้นหา email ใน Users 
        if(user) return res.status(400).json({err: "This Email has already been registered."}) //ถ้า user ตรงกัน

        const passwordHash = await bcrypt.hash(password, 12) //ป้องกันรหัสผ่าน
        
        //สร้าง newUser เพื่อเก็บ Users ที่มาการส่งเข้ามา
        const newUser = new Users({
            name, email, password:passwordHash, cf_password
        })
        // console.log(newUser)
        
        await  newUser.save() //ส่ง newUser ไป save
        res.json({msg:"Sign up successfully!"})
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}