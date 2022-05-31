import express, { Router } from "express";
import { getAllDoctor, logDoctor, regDoctor , getDoctor , updateDoctor } from "../controller/doctorController.js";
import { getAllPatient, logPatient, regPatient, searchDoctor , updatePatient , getPatient } from "../controller/patientController.js";

const router = express.Router();
///////////////////////////////////////////////////////////////////
//Doctor
router.post("/adddoctor",regDoctor);
router.post("/logdoctor",logDoctor);
router.get("/getalldoctor",getAllDoctor);
router.get("/getdoctor/:id",getDoctor);
router.post("/updatedoctor",updateDoctor);

///////////////////////////////////////////////////////////////////
//Patient
router.post("/addpatient",regPatient);
router.post("/logpatient",logPatient);
router.get("/getallpatient",getAllPatient);
router.get("/getpatient/:id",getPatient);
router.get("/searchdoctor",searchDoctor);
router.post("/updatepatient",updatePatient);

///////////////////////////////////////////////////////////////////
//Admin


export default router;