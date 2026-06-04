import express from 'express'
import upload from '../middlewares/multer.js'
import { addDoctor, adminLogin, Alldoctors, appointmentCancel, getAllAdminAppointments } from '../controllers/admin.Controller.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctor.Controller.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor);
adminRouter.post('/login' ,adminLogin);
adminRouter.post('/all-doctors',authAdmin ,  Alldoctors);
adminRouter.post('/change-availability',authAdmin ,changeAvailablity);
adminRouter.get('/all-appointments', authAdmin, getAllAdminAppointments);
adminRouter.post('/cancel-appointment', authAdmin , appointmentCancel);





export default adminRouter;