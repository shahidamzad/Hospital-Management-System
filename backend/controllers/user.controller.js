
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'JsonWebtoken'
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
            { new: true }
        );

       

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
        const { appointmentId } = req.body;

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
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true  });

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
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


export const paymentRazorpay = async (req, res) => {

    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found ' })
        }

        // creating option for razorpay payment 

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,

        }

        // creation of a order 
        const order = await razorpayInstance.orders.create(options)

        // Save order id to appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, {
            razorpayOrderId: order.id
        });

        res.json({ success: true, order })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Api to verify razorpay payment  

export const verifyRazorpay = async (req,res)=>{

    try {

        const {razorpay_order_id, razorpay_payment_id} = req.body ;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment : true, razorpay_payment_id: razorpay_payment_id})
            res.json({success:true , message : "Payment SuccessFull "})
        }else{
            res.json({success:false , message : "Payment Failed "})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }

}

// api to refound payment 

export const cancelAndRefund = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const userId = req.userId; // from auth middleware

        const appointment = await appointmentModel.findById(appointmentId);

        // Basic validations
        if (!appointment) {
            return res.json({ success: false, message: 'Appointment not found' });
        }
        if (appointment.userId.toString() !== userId) {
            return res.json({ success: false, message: 'Unauthorized' });
        }
        if (appointment.cancelled) {
            return res.json({ success: false, message: 'Already cancelled' });
        }
        if (!appointment.payment) {
            // No payment made, just cancel directly
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: 'Appointment cancelled' });
        }

        // Calculate hours until appointment
        const now = new Date();
        const appointmentTime = new Date(appointment.slotDate + ' ' + appointment.slotTime);
        const hoursLeft = (appointmentTime - now) / (1000 * 60 * 60);

        if (hoursLeft < 0) {
            return res.json({ success: false, message: 'Appointment already passed' });
        }

        // Determine refund amount
        const totalAmount = appointment.amount * 100; // in paise
        let refundAmount;

        if (hoursLeft > 4) {
            refundAmount = Math.round(totalAmount * 0.90); // 90% back
        } else {
            refundAmount = Math.round(totalAmount * 0.50); // 50% back
        }

        // Initiate Razorpay refund
        const refund = await razorpayInstance.payments.refund(appointment.razorpay_payment_id, {
            amount: refundAmount,
            notes: {
                reason: 'Appointment cancelled by user',
                appointmentId: appointmentId
            }
        });

        // Update appointment record
        await appointmentModel.findByIdAndUpdate(appointmentId, {
            cancelled: true,
            refund: {
                status: 'initiated',
                amount: refundAmount / 100,
                refundId: refund.id,
                initiatedAt: new Date()
            }
        });

        res.json({
            success: true,
            message: `Refund of ₹${refundAmount / 100} initiated. Will reflect in 3 business days.`,
            refundId: refund.id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};