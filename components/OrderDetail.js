import Link from "next/link"
import PaypalBtn from "./paypalBtn"
import { patchData } from "../utils/fetchData"
import { updateItem } from "../store/Actions"
import CheckoutWithPrompay from "./CheckoutWithPrompay"
import { useState } from "react"


const OrderDetail = ({orderDetail, state, dispatch}) => {
    const {auth, orders, slip} = state
    const[parcelnumber, setParcelnumber] = useState('')

const handleDelivered = (order) => {

        patchData(`order/delivered/${order._id}`, null, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

            const { paid, dateOfPayment, method, delivered} = res.result

            dispatch(updateItem(orders, order._id,{
                ...order, paid, dateOfPayment, method, delivered
            }, 'ADD_ORDERS'))

            console.log(paid)
            // console.log(order)


            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }

    const handleClickApprove = (order) => {
        patchData(`order/approve/${order._id}`, {
            paidProm : true
          },auth.token)  
          .then(res => {
            if(res.err) return dispatch({type: "NOTIFY", payload: {error: res.err}})

            dispatch(updateItem(orders, order._id, {
              ...order, 
              paidProm: true, 
            },"ADD_ORDERS"))

          })

          
        
    }
  

if(!auth.user) return null;
   
    return(
        <>
        {
            orderDetail.map(order => (
                <div key={order._id} style={{ margin: '20px auto'}} className="row justify-content-around">

                <div className="text-uppercase my-3" style={{maxWidth: '1400px'}}>
                    <h2 className="text-break">Order {order._id}</h2>

                    <div className="mt-4 text-secondary">
                        <h3>Shipping</h3>
                        <p>Name: {order.user.name}</p>
                        <p>Email: {order.user.email}</p>
                        <p>Address: {order.address}</p>
                        <p>Mobile: {order.mobile}</p>

                        <div className={`alert ${order.delivered ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.delivered ? `Delivered on ${order.updatedAt}` : 'Not  Delivered'
                            }
                            {
                                auth.user.role === 'admin' && !order.delivered &&
                                <button className="btn btn-dark text-uppercase"
                                onClick={() => handleDelivered(order)}>
                                    Mark as delivered
                                </button>
                                
                            }
                        </div>

                    
                        

                        <h3>Payment</h3>
                        {/* {
                            order.method === 'Paypal' ? <h6>Method: <em>Paypal</em></h6>
                            : <h6>Method: <em>Prompay</em></h6>
                        } */}

                        {/* {
                            order.paymentId && <p>PaymentId: <em>{order.paymentId}</em></p>
                        } */}
                        <div className={`alert ${order.paid  ? 'alert-success' : 'alert-danger'}
                        d-flex justify-content-between align-items-center`} role="alert">
                            {
                                order.paid ? `Paid on ${order.dateOfPayment}` : 'Not  Paid'
                            }
                        </div>

                        

                        <div>
                    {
                        slip.length>0 && order._id === slip[0].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[0].images[0].url} alt='' />
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>1 && order._id === slip[1].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[1].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>2 && order._id === slip[2].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[2].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }      
                    {
                        slip.length>3 && order._id === slip[3].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[3].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }    
                    {
                        slip.length>4 && order._id === slip[4].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[4].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }  
                    {
                        slip.length>5 && order._id === slip[5].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[5].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }  
                    {
                        slip.length>6 && order._id === slip[6].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[6].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>7 && order._id === slip[7].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[7].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>8 && order._id === slip[8].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[8].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>9 && order._id === slip[9].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[9].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>11 && order._id === slip[11].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[11].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>12 && order._id === slip[12].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[12].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>13 && order._id === slip[13].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[13].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>14 && order._id === slip[14].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[14].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>15 && order._id === slip[15].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[15].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>16 && order._id === slip[16].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[16].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>17 && order._id === slip[17].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[17].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>18 && order._id === slip[18].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[18].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>19 && order._id === slip[19].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[19].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>20 && order._id === slip[20].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[20].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                     {
                        slip.length>21 && order._id === slip[21].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[21].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>22 && order._id === slip[22].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[22].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>23 && order._id === slip[23].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[23].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    } 
                    {
                        slip.length>24 && order._id === slip[24].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[24].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>25 && order._id === slip[25].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[25].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>26 && order._id === slip[26].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[26].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>27 && order._id === slip[27].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[27].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>28 && order._id === slip[28].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[28].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>29 && order._id === slip[29].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[29].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }
                    {
                        slip.length>30 && order._id === slip[30].id
                        ?<div><h5 className="mb-4 mt-3 text-uppercase">You have successfully paid.</h5>
                            <img className="card-img-top" style={{width: '300px', height: '350px', borderRadius:'5px'}} src={slip[30].images[0].url} alt=''/>
                        </div>
                        :<h6 className="mb-4 text-uppercase"></h6>
                    }

                        </div>

                        <div>
                            {   
                                auth.user.role === 'admin' &&
                                <button className="btn btn-dark text-uppercase" onClick={()=>handleClickApprove(order)}>
                                    Yes
                                </button>
                            }
                        </div>
                        <br/>
                    </div>

                    <div>
                        <h3>Order Items</h3>
                        {
                            order.cart.map(item => (
                                <div className="row border-bottom mx-0 p-2 justify-content-betwenn align-items-center" key={item._id} style = {{maxWidth:'1400px'}}>
                                    <img src={item.images[0].url} alt={item.images[0].url}
                                    style={{width: '80px', height: '75px', objectFit: 'cover'}}/>
                                    
                                    <h5 className="flex-fill text-secondary px-3 m-0">
                                        <Link href={`/product/${item._id}`}>
                                            <a>{item.title} Size: {item.size}</a>
                                        </Link>
                                    </h5>
                                    
                                    <span className="text-info m-0">
                                        {item.quantity} x ฿{item.price} = ฿{item.price * item.quantity}
                                    </span>

                                </div>
                            ))
                        }
                    </div>
                </div>
                
                        {
                            !order.paid && auth.user.role !== 'admin' &&
                            <div className="p-4">
                                <h2 className="mb-4 text-uppercase">Total: ฿{order.total}</h2>
                                <PaypalBtn order={order}/>             
                                <CheckoutWithPrompay order={order} slip={slip}/>
                            </div>
                        }
                        {/* {
                            auth.user.role === 'admin' &&
                            <div className="p-4">
                                <CheckoutWithPrompay order={order} slip={slip}/>
                            </div>
                        } */}
                
            </div>
            
            ))
        }           
    </>
    )
}

export default OrderDetail