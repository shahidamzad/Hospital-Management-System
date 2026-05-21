import express from 'express'
import { getUserProfile, userLogin, userRegister } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/authUser.js';


const userRouter = express.Router();


userRouter.post('/register' , userRegister);
userRouter.post('/login' ,  userLogin);
userRouter.get('/get-profile' , authUser , getUserProfile)



export default userRouter ;