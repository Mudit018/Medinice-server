import Patient from "../modal/PatientSchema.js";
import Doctor from "../modal/DoctorSchema.js";
import bcrypt from "bcryptjs";

export const regPatient = async(req,res) => {
    try {
        const {name, email, password, designation,mobile, gender, dob, address, age} = req.body;
        // console.log(req.body);
        if(!name||!email||!password||!mobile||!designation||!gender||!dob||!address||!age){
            return res.status(400).json({message:"Fill the fields properly"});
        }
        if(password != req.body.cpassword){
            return res.status(400).json({message:"Password and Confirm Password are not matching!"});
        }
        
        const exist = await Patient.findOne({email});
        if(exist){
            return res.status(500).json({message:"Email already exists!"});
        }
        
        const patientData = await new Patient({name,email,password,mobile,gender,dob,address,age,designation});
        await patientData.save();
        return res.status(200).json({message:"Patient Registered Successfully!"});

    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
} 

export const logPatient = async(req,res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Fill the Fields Properly!"});
        }

        const data = await Patient.findOne({email : email});
        if(!data) {
            return res.status(400).json({message:"Email Doesn't exists!"});
        }
        const isMatch = await bcrypt.compare(password, data.password);
        if(!isMatch) {
            return res.status(400).json({message:"Invaid Credentials!"});
        }

        return res.status(200).json({message:"Patient logged in Successfully",data});

    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

export const getAllPatient = async (req , res) => {
    try {
        const data = await Patient.find();
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
};

export const getPatient = async (req , res) => {
    try {
        const id = req.params.id;
        const data = await Patient.find({_id: id}).populate("upcomingAppt._id");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

export const updatePatient = async (req , res) => {
    try {
        const data = await Patient.findByIdAndUpdate({_id: req.body._id} , {$set:req.body} , {
            new: true,
        });
        return res.status(200).json({
          message: "User Updated",
          data,
        });
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

export const searchDoctor = async(req,res) => {
    try{
        const name = req.query.name;
        const country = req.query.country;
        const speciality = req.query.speciality
        const qualification = req.query.qualification;
        // console.log(name,country,speciality,qualification);
        
        if(name) {
            const data = await Doctor.find({name: {$regex : name , $options : "i"}});
            return res.status(200).json({message:"Doctor found!",data});
        }else if(country) {
            const data = await Doctor.find({country: country});
            return res.status(200).json({message:"Doctor found!",data});
        }else if(speciality) {
            const data = await Doctor.find({speciality: speciality});
            return res.status(200).json({message:"Doctor found!",data});
        }else if(qualification) {
            const data = await Doctor.find({qualification:qualification});
            return res.status(200).json({message:"Doctor found!",data});
        }else {
            const data = await Doctor.find();
            return res.status(200).json({message:"Doctor found!",data});
        }

    } catch(error){
        return res.status(500).json({message:"Server error!"});
    }  
}

export const addPatUpcomingAppt = async(req,res) => {
    try {
        console.log(req.body);
        const pid = req.body.pid;
        const did = req.body.did;
        const time = req.body.time;
        const date = req.body.date;

        const data = await Patient.findByIdAndUpdate({_id : pid} , {$addToSet: {upcomingAppt: {_id: did , time: time , date: date}}} , {new: true}).populate("upcomingAppt._id");
        res.status(200).json({message:"added successfully",data});
        
    } catch (error) {
        return res.status(500).json({message:"Server error!"});
    }
}