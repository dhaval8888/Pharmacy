import medicine from "../model/medicine.model.js";

// export const createMedi = async(req,res) =>{
//     // console.log("create")
//     try {
//         const newMedi = new medicine({
//             name:req.body.name,
//             category:req.body.category,
//             description:req.body.description,
//             price:req.body.price,
//             stock:req.body.stock,
//             image:req.body.image
//         })

//         const savedMedicine = await newMedi.save();
//         return res.status(201).json({message:"medicine saved",savedMedicine})

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({message:"error has been occered in creating medicine"})
//     }
    
// }
export const createMedi = async (req, res) => {
    try {
      const medicinesData = req.body.medicines // expecting array
  
      if (!Array.isArray(medicinesData) || medicinesData.length === 0) {
        return res.status(400).json({ message: "No medicines provided" })
      }
  
      const savedMedicines = await medicine.insertMany(medicinesData)
  
      return res.status(201).json({
        message: "Medicines saved successfully",
        savedMedicines,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: "An error occurred while creating medicines",
      })
    }
  }
  
export const getAllMedi =async (req,res) =>{
    try {
        const allMedi= await medicine.find()
        return res.status(201).json({message:"All medicine fatched",allMedi})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in fatching all medicines"})
    }

}

export const getMedi =async (req,res) =>{
    try {
        const Medi= await medicine.findById(req.params.id)
        if(!Medi){
            return res.status(404).json({message:"not found"})
        }
        return res.status(201).json({message:"medicine fatched",Medi});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in fatching all medicines"})
        
    }
}

export const updateMedi =async (req,res) =>{
    try {
        const updatedMedicine = await medicine.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        
        if (!updatedMedicine) {
          return res.status(404).json({ message: 'Medicine not found' });
        }
        return res.status(201).json({message:"medicine updated",updatedMedicine});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error has been occered in update medicines"})
    }
    
}

export const deleteMedi = async (req, res) => {
    try {
      const deleted = await medicine.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
      res.status(200).json({ message: 'Medicine deleted successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error deleting medicine' });
    }
  };


export const setDefaultImage = async (req, res) => {
    try {
        const defaultImage = "https://img.pikbest.com/png-images/qianku/pills-red-white-simple-medical-hospital-medicine_2199872.png!w700wp";
    
        const result = await medicine.updateMany({}, {
          $set: { image: defaultImage }
        });
    
        return res.status(200).json({ message: "Updated all medicines with default image", updated: result.modifiedCount });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating medicine images" });
      }
}
