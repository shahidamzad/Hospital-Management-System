
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'JsonWebToken'
import { v2 as cloudinary } from 'cloudinary';




// Api to  register  user 

export const userRegister = async (req, res) => {

    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details " })
        }

        // validating email  formate 

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: " enter a valid email " })
        }

        // checking user all ready login 
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // validating string password

        if (password.length < 8) {
            return res.json({ success: false, message: " Enter a strong password  " })
        }

        // hashing user password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userDate = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userDate)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// Api for user logIn

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        // checking user exits 
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({success: false, message: "User does not exist"})
        }

        // compare password

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
               res.json({success: true,token})
        }else{
            res.json({success: false, message: "Invalid credentials"   })
        }
    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
}
 //  api to get user profile data 

 export const getUserProfile = async (req , res)=>{
    try {
        const  userId  = req.userId
        console.log(userId)
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true , userData})

    } catch (error) {
        console.log(error)
        res.json({success: false,message: error.message})
    }
 }

 // api to upadate user datails 

export const updateUserProfile = async (req , res) => {

    try {
        const userId = req.userId;

        const { name, phone, address, dob, gender } = req.body;

        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {

            return res.json({
                success: false,
                message: "missing details"
            });

        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                name,
                phone,
                address: JSON.parse(address),
                dob,
                gender
            },
            { returnDocument: 'after' }
        );

        console.log(updatedUser);

        if (imageFile) {

            // upload image to cloudinary

            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path,
                { resource_type: 'image' }
            );

            const imageURL = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {
                image: imageURL
            });

        }

        res.json({
            success: true,
            message: "Profile Updated"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }

}