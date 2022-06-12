import express, { Router } from "express";
import {
  getAllDoctor,
  logDoctor,
  regDoctor,
  getDoctor,
  updateDoctor,
  addPendingRequest,
  deletependingAppt,
  addupcomingAppt,
  addPastAppt,
  getUpcomingAppts,
  getPastAppts,
  getPendingAppts,
} from "../controller/doctorController.js";
import {
  getAllPatient,
  logPatient,
  regPatient,
  searchDoctor,
  updatePatient,
  getPatient,
  addPatUpcomingAppt,
} from "../controller/patientController.js";

const router = express.Router();

///////////////////////////////////////////////////////////////////
//Doctor

router.post("/adddoctor", regDoctor);
router.post("/logdoctor", logDoctor);
router.get("/getalldoctor", getAllDoctor);
router.get("/getdoctor/:id", getDoctor);
router.post("/updatedoctor", updateDoctor);
router.post("/addpendingrequest", addPendingRequest);
router.get("/getpendingappts/:id", getPendingAppts);
router.post("/deletependingreq", deletependingAppt);
router.post("/addupcomingappt", addupcomingAppt);
router.get("/getupcomingappts/:id", getUpcomingAppts)
router.post("/addpastappt", addPastAppt);
router.get("/getpastappts/:id", getPastAppts);

///////////////////////////////////////////////////////////////////
//Patient

router.post("/addpatient", regPatient);
router.post("/logpatient", logPatient);
router.get("/getallpatient", getAllPatient);
router.get("/getpatient/:id", getPatient);
router.get("/searchdoctor", searchDoctor);
router.post("/updatepatient", updatePatient);
router.post("/addpatupcomingappt", addPatUpcomingAppt);

///////////////////////////////////////////////////////////////////
//Admin


export default router;