
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'JsonWebToken'




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