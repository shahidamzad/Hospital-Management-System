
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'JsonWebToken'
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'




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
            return res.json({ success: false, message: "User does not exist" })
        }

        // compare password

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//  api to get user profile data 

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId

        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to upadate user datails 

export const updateUserProfile = async (req, res) => {

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


// Api to book appointment

export const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;

        const { docId, slotTime, slotDate } = req.body

        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData.available) {
            return res.json({
                success: false,
                message: 'Doctor not available'
            })
        }

        let slots_booked = docData.slots_booked

        // checking for slot availability

        if (slots_booked[slotDate]) {

            if (slots_booked[slotDate].includes(slotTime)) {

                return res.json({
                    success: false,
                    message: 'Slot not available'
                })

            } else {
                slots_booked[slotDate].push(slotTime)
            }

        } else {

            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)

        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            docData,
            userData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()

        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        // save new slots data in docData

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "appoinment booked" })

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
}


// Api to get user appointment for frontend  my -appointment page 

export const ListAppointment = async (req, res) => {
    try {
        const userId = req.userId;

        const appointments = await appointmentModel.find({ userId });

        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// api to cancel the appointment 

export const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const {  appointmentId } = req.body;

        // DB se appointment lao
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Appointment exist karti hai?
        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Kya yeh appointment isi user ki hai?
        if (appointmentData.userId.toString() !== userId.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized action" });
        }

        // Cancel karo
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Doctor ka slot free karo
        const { docId, slotDate, slotTime } = appointmentData;

        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment Cancelled" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// api to make payment of appointment using rozorpay

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET 
})

export const paymentRazorpay = async (req, res) =>{
    const {appointmentId} = req.body ;
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.cancelled) {
        return res.json({success:false , message:'Appointment Cancelled or not found '})
    }

    // creating option for razorpay payment 

    const option ={
        amount : appointmentData.amout *100 ,
        currency : process.env.CURRENCY,
        receipts : appointmentId ,

    }
};