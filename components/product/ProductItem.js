import Link from "next/link"
import { useContext } from "react"
import { DataContext } from "../../store/GlobalState"
import { addToCart } from "../../store/Actions"


const ProductItem = ({product, handleCheck}) => {
    const {state, dispatch} = useContext(DataContext)
    const { cart, auth } = state
    
     
    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn1" style={{textDecoration:'none', color:'inherit',color:'white'}} 
                    >Buy</a>
                </Link> 
                {/* <button className="btn2"
                style={{marginLeft:'5px',flex:1}} 
                disabled={product.inStock === 0 ? true : false}
                onClick = {() => dispatch(addToCart( product, cart ))}>
                    Buy
                </button> */}               
            </>
        )
    }

    const adminLink = () => {
        return(
            <>
                <Link href={`create/${product._id}`}>
                    <a className="btn btn-dark"
                    style={{marginRight:'5px',flex:1}}>Edit</a>
                </Link>
                
                <button className="btn btn-danger"
                style={{marginLeft:'5px',flex:1}} 
                data-toggle="modal" data-target="#exampleModal"
                onClick={() => dispatch({
                    type: "ADD_MODAL",
                    payload: [{ 
                        data: '', id: product._id, 
                        title: product.title, type: 'DELETE_PRODUCT'
                    }]
                })}>
                    Delete
                </button>
            </>
        )
    }

  

    
    return(
        <div className="card" style={{width: '18rem'}}>
            {
                 auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked} 
                className="position-absolute"
                style={{height:'20px', width: '20px'}}
                onChange={() => handleCheck(product._id)}/>
            }
            <div style={{cursor: 'pointer'}}>
                <Link  href={`product/${product._id}`}>
                    <img className="card-img-top " src={product.images[0].url} alt={product.images[0].url}/>
                </Link>
            </div>
            <div className="card-body">
                <h5 className = "card-title text-capitalize" title={product.title}>
                    {product.title}
                </h5>

                <div className="row justify-content-between mx-0" role="alert">
                    <h6 className="text-danger">Price : {product.price}฿</h6>
                    {
                        product.inStock > 0
                        ?<h6 className="text-danger">In Stock</h6>
                        :<h6 className="text-danger">Out Of Stock</h6>
                        
                    }
                    
                </div>
                <div>
                    {   
                        auth.user && auth.user.role === 'admin' && <h6 className="text-danger">In Stock : {product.inStock} & Sold : {product.sold}</h6> 
                     }
                </div>
                
               


                <p className="card-text" title={product.description}>
                    {product.description}
                </p>

                <div className="row justify-content-between mx-0">
                    {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink()}

                </div>
            </div>
        </div>
    )
}

export default ProductItem