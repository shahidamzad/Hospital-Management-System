import express from 'express'
import { getUserProfile, updateUserProfile, userLogin, userRegister } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();


userRouter.post('/register' , userRegister);
userRouter.post('/login' ,  userLogin);
userRouter.get('/get-profile' , authUser , getUserProfile);
userRouter.post('/update-profile' ,upload.single('image'), authUser , updateUserProfile)



export default userRouter ;