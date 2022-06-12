import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const DoctorSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true,
    },
    email :{
        type: String,
        required:true, 
    },
    age :{
        type:Number,
        required:true,
    },
    password :{
        type:String,
        required:true,
    },
    mobile:{
        type: Number,
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    picture: {
        type: String,
        required: true,
    },
    speciality:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    language:[{
        type: String,
        
    }],
    verified :{
        type : Boolean,
        default :false
    },
    qualification:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    pendingRequests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        unique: true
    }],
    upcomingAppt:[{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            unique: true
        },
        time: {
            type: String,
        },
        date: {
            type: String,
        },
    }],
    pastAppt:[{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            unique: true
        },
        time: {
            type: String,
        },
        date: {
            type: String,
        },
    }]
})

DoctorSchema.pre("save",async function (next){

    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

const Doctor = new mongoose.model("Doctor",DoctorSchema);
export default Doctor;