import express from 'express'
import upload from '../middlewares/multer.js'
import { addDoctor, adminLogin } from '../controllers/admin.Controller.js';


const adminRouter = express.Router();

adminRouter.post('/add-doctor',upload.single('image'),addDoctor);
adminRouter.post('/login',adminLogin);





export default adminRouter;