import express from 'express'
import { doctorList } from '../controllers/doctor.Controller.js';


const doctorRouter = express.Router();


doctorRouter.post('/list' , doctorList)



export default doctorRouter ;