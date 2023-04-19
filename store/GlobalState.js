import {createContext, useReducer,useEffect} from 'react'
import reducers from './Reducers'
import { getData } from "../utils/fetchData"

export const DataContext = createContext() //ช่วยให้เราสามารถแชร์ข้อมูลระหว่าง Components ได้โดยไม่ต้องส่ง Props

//ทุก component สามารถเข้าถึงได้ 
export const DataProvider = ({children}) => {
    const initialState = {
        notify: {}, auth:{}, cart:[], modal: [], orders: [], users: [] , categories: [], slip: [], 
    }
    //ใช้ useReducers มากำหนดรูปแบบการกระทำให้กับ state ว่ามีกระบวนการทำงานข้างในเป็นอย่างไร
    const [state, dispatch] = useReducer(reducers,initialState) //reducers => ชื่อที่จะทำงาน, initialState => state ที่จะส่งไปทำงาน
    //state = ผลจากการใช้ dispatch = เรียกใช้ Action แบบไหน 
    
    const { cart, auth, orders } = state

//ส่วนของ Login ใช้ useEffect ดักจับข้อมูล
    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin") //การเรียกใช้ข้อมูล "firstLogin" ของ Local Storage
        if(firstLogin){
            //รับข้อมูลจาก accessToken
            getData('auth/accessToken').then(res => {
                if(res.err) return localStorage.removeItem("firstLogin")
                dispatch({
                    type: "AUTH",
                    payload:{
                        token:res.access_token,
                        user: res.user
                    }
                })
            })
        }
        
        getData('categories').then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch({
                type: "ADD_CATEGORIES",
                payload: res.categories
            })
        })

        
    },[])
    
//ส่วนของตะกร้า
    useEffect(()=>{
       const __next__cart01__devat = JSON.parse(localStorage.getItem("__next__cart01__devat")) //การแปลงข้อความ String ต่างๆ ให้เป็น JSON 
       
       if(__next__cart01__devat) dispatch({ type:"ADD_CART",payload:__next__cart01__devat })
    },[])
//ส่วนของตะกร้า
    useEffect(()=>{
        localStorage.setItem("__next__cart01__devat",JSON.stringify(cart)) //stringify => แปลงข้อมมูลจาก JavaScript Object ให้อยู่ในรูปของ JSON String
    },[cart])

    useEffect(() => {
        if(auth.token){
            getData('order', auth.token)
            .then(res => {
                if(res.err) return dispatch({type: "NOTIFY", payload: {error: res.err}})

                dispatch({type: "ADD_ORDERS", payload: res.orders})
            })

        if(auth.user.role){
            getData('slip').then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            dispatch({
                type: "ADD_SLIP", payload: res.slips })
        })

        }

        if(auth.user.role === 'admin'){
            getData('user', auth.token)
            .then(res =>  {
                if(res.err) return dispatch({type: "NOTIFY", payload: {error: res.err}})

                dispatch({type: "ADD_USERS", payload: res.users})
            })
            }
        }else{
            dispatch({type: "ADD_ORDERS", payload: []})
            dispatch({type: "ADD_USERS", payload: []})
        }
    },[auth.token])

    
    return(
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}