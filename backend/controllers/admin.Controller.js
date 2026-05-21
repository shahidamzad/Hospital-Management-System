import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'



//  API For Adding Doctors

export const addDoctor = async (req, res) => {
    try {

        const { name, email, password, speciality, fees, about, degree, experience, address } = req.body;

        const imageFile = req.file;



        // checking for  all data  to add doctor

        if (!name || !email || !password || !speciality || !fees || !about || !degree || !experience || !address) {
            return res.json({ success: false, message: "missing deatials" })
        }

        // validating email formate 

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" })
        }
        // validating strong password 
        if (password.length > 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // uplaod image to cloudinary 

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            fees,
            about,
            experience,
            address: address,
            date: Date.now()
        }



        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Admin login api 

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid Credential " })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// api to get all daoctor list for admin panel

export const Alldoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}