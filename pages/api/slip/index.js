import connectDB from '../../../utils/connectDB'
import Slip from '../../../models/slipModal'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createSlip(req, res)
            break;
        case "GET":
            await getSlip(req, res)
            break;
    }
}

const createSlip = async (req, res) => {
    try{
        // const result = await auth( req, res )
        // if(result.role !== 'user') 
        // return res.status(400).json({err: "Authentication is not valid."})

        const { images, id, approve }  = req.body
        // if(images.length === 0) return res.status(400).json({err: "Name can not be left blank."})
        // if(!images) return res.status(400).json({err: "Name can not be left blank."})
        // if(!id) return res.status(400).json({err: "Name can not be left blank."})

        const newSlip = new Slip({images, id, approve})

        await newSlip.save()

        res.json({msg: "Success! Create a new slip.", newSlip
    })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

const getSlip = async (req, res) => {
    try{
    //    const result = await(req,res)
    //    if(result.role !== 'user') 
    //    return res.status(400).json({err: "Authentication is not valid."})
        
        const slips = await Slip.find()
        res.json({slips})

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}