import express from 'express'
import { bookAppointment, cancelAppointment, getUserProfile, ListAppointment, updateUserProfile, userLogin, userRegister } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();


userRouter.post('/register' , userRegister);
userRouter.post('/login' ,  userLogin);
userRouter.get('/get-profile' , authUser , getUserProfile);
userRouter.post('/update-profile' ,upload.single('image'), authUser , updateUserProfile);
userRouter.post('/book-appointment', authUser ,bookAppointment);
userRouter.get('/appointments',authUser, ListAppointment);
userRouter.post('/cancel-appointment',authUser, cancelAppointment );


export default userRouter ;