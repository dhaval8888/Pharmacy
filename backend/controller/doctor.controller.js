import doctor from "../model/doctor.model.js";

// export const createDoctor = async (req,res) =>{
//     try {
//         // const {name,specialization,experience,consultationFee,contactEmail,contactPhone,availability,profileImage}= req.body

//         const newDoctor = new doctor(req.body)

//         const saveDoc = await newDoctor.save();
//         return res.status(201).json({message:"doctor saved",saveDoc})

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({message:"error has been occered in creating doctor"})
//     }
    
// }

export const createDoctor = async (req, res) => {
    try {
      const doctors = req.body; // expecting an array of doctors
      const saveDoc = await doctor.insertMany(doctors);
      return res.status(201).json({ message: "Doctors created successfully", saveDoc });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error occurred while creating doctors" });
    }
  };
  
export const getAllDoctor =async (req,res) =>{
    try {
        const allDoc= await doctor.find()
        return res.status(201).json({message:"All doctor fatched",allDoc})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in fatching all doctor"})
    }

}

export const getDoctor =async (req,res) =>{
    try {
        const doc= await doctor.findById(req.params.id)
        if(!doc){
            return res.status(404).json({message:"not found"})
        }
        return res.status(201).json({message:"doctor fatched",doc});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in fatching doctor"})
        
    }
}

export const updateDoctor =async (req,res) =>{
    try {
        const updateDdoctor = await doctor.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        
        if (!updateDdoctor) {
          return res.status(404).json({ message: 'doctor not found' });
        }
        return res.status(201).json({message:"doctor updated",updateDdoctor});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in update doctor"})
    }
    
}

export const deletedoctor = async (req, res) => {
    try {
      const deleted = await doctor.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'doctor not found' });
      }
      res.status(200).json({ message: 'doctor deleted successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error deleting doctor' });
    }
  };