import Doctor from "../modal/DoctorSchema.js";
import bcrypt from "bcryptjs"

export const regDoctor = async(req,res) => {
    try {
        const {name,age,email,designation,mobile,password,speciality,address,gender,picture,experience,dob,qualification} = req.body;
        console.log(req.body);
        if(!name||!age||!email||!mobile|| !designation||!password||!speciality||!address||!gender||!picture||!experience||!dob||!qualification){
           return res.status(400).json({message:"Fill the fields properly"});
        }
        if(password != req.body.cpassword) {
            return res.status(400).json({message:"Password and Confirm Password are not matching!"});
        }

        const exist = await Doctor.findOne({email});
        if(exist) {
            return res.status(400).json({message:"Email already exists!"});
        }
        
        const docData = await new Doctor({name,age,designation,email,password,speciality,address,gender,picture,experience,dob,mobile,qualification});
        await docData.save();
        return res.status(200).json({message:"Doctor Registered Successfully!"});
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

export const logDoctor = async(req,res) => {
    try {
        const {email,password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({message:"Fill the Fields Properly!"});
        }

        const data = await Doctor.findOne({email}); 
        if(!data) {
            return res.status(400).json({message:"Email Doesn't exists!"});
        }
        const isMatch = await bcrypt.compare(password,data.password);
        if(!isMatch) {
            console.log("incorrect");
            return res.status(400).json({message:"Invaid Credentials!"});
        }

        return res.status(200).json({message:"Doctor logged in Successfully",data});

    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

export const getAllDoctor = async (req , res) => {
    try {
        const data = await Doctor.find();
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

export const getDoctor = async (req , res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const data = await Doctor.find({_id: id});
        return res.status(200).json(data);
    } catch {
        res.status(500).json({message: "Server Error"});
    }
}

export const updateDoctor = async (req , res) => {
    try {
        console.log(req.body);
        const updatedUser = await Doctor.findByIdAndUpdate({_id: req.body._id}, {$set: req.body}, {
      new: true
    });

    return res.status(200).json({
      message: "User Updated",
      updatedUser
    });
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}