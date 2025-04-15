import mongoose from "mongoose";

const mediSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    description:{
        type: String,
    },
    price:{
        type: String,
        required:true
    },
    stock:{
        type: String,
        required:true,
        min:0
    },
    image:{
        type:String,
    }

})

const medicine = mongoose.model("medicine", mediSchema)

export default medicine;