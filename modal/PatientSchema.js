import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const PatientSchema = new mongoose.Schema({
    name :{
        type: String,
        required:true,
    },
    email :{
        type: String,
        required:true, 
    },
    password :{
        type:String,
        required:true,
    },
    mobile:{
        type: Number,
        required:true,
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
    age:{
        type: Number,
        required: true,
    },
    upcomingAppt:[{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            unique: true
        },
        time: {
            type: String,
        },
        date: {
            type: String,
        },
        name: {
            type: String,
        }
    }],
    pastAppt:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            unique: true
        },
        time: {
            type: String,
        },
        date: {
            type: String,
        },
        name: {
            type: String,
        }
    }]
})

PatientSchema.pre("save", async function (next) {

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    } 
    next();

})

const Patient = new mongoose.model("Patient",PatientSchema);
export default Patient;