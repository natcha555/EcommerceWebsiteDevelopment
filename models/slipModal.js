import mongoose from 'mongoose'

const SlipSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true 
    },
    images: {
        type: Array,
        required: true     
    },
    approve: {
        type: Boolean,
        default: false
    },
},
 {
    timestamps: true
})

let Dataset = mongoose.models.slip || mongoose.model('slip', SlipSchema)
export default Dataset