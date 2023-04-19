import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { imageUpload } from '../utils/imageUpload'
import { postData } from '../utils/fetchData'
import { updateItem} from '../store/Actions'
import { patchData } from '../utils/fetchData'

const CheckoutWithPrompay = ( {order, slip} ) => {
    const {state, dispatch} = useContext(DataContext)
    const { auth, orders} = state
    
    const [images, setImages] = useState([])

    
    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let err = ''
        let num = 0
        const files = [...e.target.files]
        // console.log(files)

        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

        files.forEach(file => {
            if(file.size > 3072 * 3072)
            return err = 'The largest image size is 3mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 1) newImages.push(file)
            return newImages;
        })
        // console.log(newImages)
        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})
        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please upload images'}})

        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)
      
        if(imgNewURL.length > 0 ) media = await imageUpload(imgNewURL)
        const id = order._id
 
        const res = await postData('slip',{id: id ,images: [...imgOldURL,...media], approve: false}, auth.token)
        // console.log(res)
        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        
        patchData(`order/payment/${order._id}`, {
          }, auth.token)
        .then(reb => {if(reb.err) return dispatch({type: 'NOTIFY', payload:{error:reb.err}})})

            

        dispatch(updateItem(orders, order._id, {
            ...order, 
            paidProm: true, 
          },"ADD_ORDERS"))

        
        
        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})

        
        
    }
    // console.log(slip[0].images[0].url)
    // console.log(order._id)
    // console.log(slip[1].images[1])
    // console.log(order._id === slip.map(item => item.id ))
    // console.log(order._id)
    // console.log(slip.map(item => item.id))
    

    return( 
    <div>
        <div className="mb-4 text-uppercase">
            <h4>Transfer Banking</h4>
            <img src="https://res.cloudinary.com/daqt8gqb8/image/upload/v1681054262/prompay_qaqowd.jpg" style={{width: '280px', height: '350px', borderRadius:'5px'}}/>
        </div>

        <div className="mb-4 text-uppercase">
            <h5>Payment notification</h5>

            <div className="mb-4">
                <div className="input-group-prepend" >
                    <span className="input-group-text">Upload</span>
                </div>
                
                <div className="custom-file border rounded">
                    <input type="file" className="custom-file-input" onChange={handleUploadInput} multiple accept="image/*"/>
                </div>
            </div>      
        </div>

        <div className="row img-up mx-0">
                        {
                            images.map((img, index) => (
                                <div key={index} className="file_img">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                     alt="" className="img-thumbnail rounded" />
                                     
                                     <span onClick={() => deleteImage(index)}>X</span>
                                </div>
                            ))
                        }
                    </div>

        <button type="submit" className="btn btn-dark mt-3" onClick={handleSubmit}>Submit</button>
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

        </div>
       
    </div>

    )
}


export default CheckoutWithPrompay