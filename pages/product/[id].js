import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    //กดเปลี่ยนรูป
    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    const [value, setValue] = useState("");
    const size = value

    const handleClick = () => {
        if(!value) return dispatch({type:"NOTIFY", payload:{error:"Please select the size you want."}})
        if(!product.size_s) return dispatch({type:"NOTIFY", payload:{error:"This product does not have S size."}})
        if(!product.size_m) return dispatch({type:"NOTIFY", payload:{error:"This product does not have M size."}})
        if(!product.size_l) return dispatch({type:"NOTIFY", payload:{error:"This product does not have L size."}})
        
        return dispatch(addToCart(product, cart, size)) 
    }

    return(
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="col-md-6">
                <img src={ product.images[tab].url } alt={ product.images[tab].url }
                className="d-block img-thumbnail rounded mt-4 w-100"
                style={{height: '600px'}} />

                <div className="row mx-0" style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}

                </div>
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product.title}</h2>
                <h5 className="text-danger">฿{product.price}</h5>

                <div className="row mx-0 d-flex justify-content-between">
                    {
                        product.inStock > 0
                        ? <h6 className="text-danger"></h6>
                        : <h6 className="text-danger">Out Stock</h6>
                    }

                    <h6 className="text-danger"></h6>
                </div>

                <div className="my-2">{product.description}</div>
                <div className="my-2">
                    {product.content}
                </div><br/>
                
                <div className="input-group-prepend">
                        <select value={value} onChange={(e)=>{setValue(e.target.value)}} className="custom-select text-capitalize" style={{width:"130px"}}>
                            <option value="">Choose Size</option>
                            <option value="S">Size: {product.size_s}</option>   
                            <option value="M">Size: {product.size_m}</option>
                            <option value="L">Size: {product.size_l}</option>
                        </select>
                    </div>

                <button type="button" className="btn btn-dark d-block my-3 px-5 " style={{width:"130px"}}
                onClick={handleClick} >
                    Buy
                </button>

            </div>
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`)
    // server side rendering
    return {
      props: { product: res.product } // will be passed to the page component as props
    }
}


export default DetailProduct