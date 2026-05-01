import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String , required:true},
    email: {type:String , required:true , unique:true},
    password: {type:String , required:true},
    image: {type:String ,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvOHqbpCYuVXU26syQXibpm_4-aV8SZwIWQg&s "},
    address : {type:Object, default:{line1:"", line2:""}},
    grender : {type:String , default:"not selected"},
    dob : {type:String , default:"not selected"},
    phone:{type:String , default:"000000 00000"}
})

const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel;