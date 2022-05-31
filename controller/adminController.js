import Doctor from "../modal/DoctorSchema.js";
export const verifyDoctor = async(req,res) => {
    try {
        const {id} = req.body;
        const doctor = await Doctor.findByIdAndUpdate({_id:id},{$set :{
            verified : true
        }});
        return res.status(200).json({message:"Doctor verified"});
    } catch (error) {
        return res.status(500).json({message:"Server Error"});
    }
}
