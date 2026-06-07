import express from 'express'
import { bookAppointment, cancelAndRefund, cancelAppointment, getUserProfile, ListAppointment, paymentRazorpay, updateUserProfile, userLogin, userRegister, verifyRazorpay } from '../controllers/user.controller.js';
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
userRouter.post('/payment-razorpay' , authUser , paymentRazorpay);
userRouter.post('/verify-Razorpay', authUser , verifyRazorpay);
userRouter.post('/cancel-appointment', authUser , cancelAndRefund)


export default userRouter ;