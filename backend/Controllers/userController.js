import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc   Auth user & get token
//@route  POST /login
//@access Public
const authUser = async(req,res)=>{
    
   try {

    const { email, password} = req.body

    if(!email || !password ){
        return res.json({message:'All fields are required'})
      }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        generateToken(res,user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            });
         } else {
                res.status(400).json({message:'Invalid email or password'})
            }
   } catch (error) {
    console.log(error.message)
    return res.status(500).json({message: "Internal Server Error"})
}
}
    


//@desc   Register
//@route  POST /api/users
//@access Public
const register = async(req,res)=>{ 
try {
    const {name,email,password}= req.body;

    const userExists = await User.findOne({email})

    if(userExists){
       return res.status(400).json({message: "User already exit"})
    }

    const user = await User.create({name,email,password});

    if(user){
        generateToken(res, user._id);
        return res.status(200).json({
            _id: user._id,
            name: user._name,
            email:user.email,      
        })
    }else{
       return res.status(400).json({message: "Invalid details"})    
    }
} catch (error) {
    // console.log(error.message)
    return res.status(500).json({message: "Internal Server Error"})
}
    
}

//@desc   Logout user/ clear cookie
//@route  POST /api/users/logout
//@access Private

const logoutUser = async(req,res)=>{
    // Clear the JWT (JSON Web Token) cookie
     res.cookie('jwt','',{
         httpOnly:true, // Make the cookie accessible only through HTTP(S) requests, not client-side JavaScript
         expires:new Date(0) // Set the expiration date to the past, effectively deleting the cookie
     });
 
       // Respond with a JSON message indicating successful user logout
     res.status(200).json({message:'User logged out successfully'})
 }
 // it clears the JWT cookie associated with the user by setting it to an empty string and making it expire immediately
 

export {authUser,register,logoutUser}
