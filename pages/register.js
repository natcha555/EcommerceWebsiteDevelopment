import Head from "next/head"
import Link from "next/link"
import { useState, useContext, useEffect } from "react"
import valid from "../utils/valid" //เช็คเงื่อนไข
import { DataContext } from "../store/GlobalState"
import { postData } from "../utils/fetchData"
import { useRouter } from "next/router"

const Register = () => {
    const initialState = { name:"", email:"", password:"",cf_password:""} //ประกาศตัวแปรสถานะใหม่ในการจัดเก็บข้อมูล
    const[userData, setUserData] = useState(initialState) //useState เป็น React Hook ที่ให้เพิ่มตัวแปรสถานะ userData, setUserData 
    const{ name, email, password, cf_password} = userData

    //ดึงข้อมูลจาก DataContext ใน GlobalState
    const{state, dispatch} = useContext(DataContext)
    const { auth } = state

    //สร้างเส้นทางไปส่วนแสดงผลอื่น
    const router = useRouter()
    
    //เอาไว้เช็คเวลามีการ change ใน input เพื่อจัดการการเปลี่ยนแปลงอินพุต เวลากรอกข้อมูลจะสามารถแก้ไขหรือใส่ข้อมูลลงไปได้
    const handleChangeInput = e =>{
        // console.log(e.target.value)
        const{name,value} = e.target // e.target คืออินพุตที่ส่งผ่านฟังก์ชัน handleChange
        setUserData({...userData, [name]:value}) //ให้ค่าที่ value มาเก็บ // ...userData คือ copy userData แล้วเปลี่ยนให้เป็นค่า value
        dispatch({type:'NOTIFY',payload:{}})
    }


    const handleSubmit = async e => {
        e.preventDefault() //e.preventDefault() ถูกใช้เพื่อไม่ให้ browser reload หรือ refresh
        // console.log(userData) //ดู userData ที่เก็บ
        
        //ถ้ากด submit แล้วไม่ตรงตามเงื่อนไข ให้แสดง NOTIFY ข้อความ errMsg
        const errMsg = valid(name,email, password, cf_password)        
        if(errMsg) return dispatch({type:'NOTIFY',payload:{error:errMsg}}) //errMsg อยู่ใน Redux สร้างใน Toast.js

          dispatch({type:'NOTIFY', payload:{loading: true}})

          const res = await postData('auth/register', userData)

        if(res.err) return dispatch({type:'NOTIFY', payload:{error:res.err}}) 
      
      return dispatch({type:'NOTIFY',payload:{success:res.msg}})
    }

    useEffect(() => {
      if(Object.keys(auth).length !== 0) router.push("/")
    },[auth])

    return(
      <div>
          <Head>
            <title>Register Page</title>
          </Head>
          
          <form className="mx-auto my-4" style={{maxWidth: "500px"}} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name"
              name="name" value={name} onChange={handleChangeInput}/>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              name="email" value={email} onChange={handleChangeInput}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1"
              name="password" value={password} onChange={handleChangeInput}/>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword2">Confirm Password</label>
              <input type="password" className="form-control" id="exampleInputPassword2"
              name="cf_password" value={cf_password} onChange={handleChangeInput}/>
            </div>
           
            <button type="submit" className="btn btn-dark w-100">Register</button>
            
            <p className="my-2">
            Already have an account? <Link href="/signin"><a style={{color:"crimson"}}>Login Now</a></Link>
            </p>
          </form>
      </div>
    )
  }
  
  export default Register