import connectDB from '../../../../utils/connectDB'
import Orders from '../../../../models/orderModel'
import auth from '../../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "PATCH":
            await approveOrder(req, res)
            break;
    }
}

const approveOrder = async(req,res) => {
    try{
        const result = await auth(req, res)
        
        if(result.role === 'admin'){
            const {id} = req.query
    
            await Orders.findOneAndUpdate({_id: id},{
                paidProm: true
            })
            res.json({msg: "Approve success!"})

        }

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
