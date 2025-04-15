import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({ 
    name:{
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true,
      },
      experience: {
        type: Number, // in years
        required: true,
      },
      consultationFee: {
        type: Number,
        required: true,
      },
      contactEmail: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
        required: true,
      },
      availability: {
        type: [String], // e.g. ["Monday", "Wednesday", "Friday"]
      },
      profileImage: {
        type: String, // image URL
      }

    });

const doctor = mongoose.model("doctor",doctorSchema)

export default doctor;