


//  API For Adding Doctors

export const addDoctor = async (req , res )=>{
    try {
        
        const {name , email, password , speciality, fees , about , degree , experience, address} = req.body;

        const imageFile =  req.file ;

       

        // checking for  all data  to add doctor

        if(!name || !email || !password || !speciality || !fees || !about || !degree || !experience || !address){
            return res.json({success: false , Message: "missing deatials"})

        }
        


    } catch (error) {
        
    }
}