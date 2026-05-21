import jwt from 'jsonwebtoken';




// User  authantication middleware 

export const authUser = async (req , res , next)=>{
    try {
        
        const {token} = req.headers;
        
        if (!token) {
            return res.json({success:false,message:"not authrized login again"})  
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

       req.bo.userId = token_decode.id

        next()

    } catch (error) {
        console.log(error);
        res.json({success: false , message:error.message})
        
    }
}