import User from "../models/user.models.js";
import validator from 'validator';
import bcrypt from 'bcrypt'


export const register = async(req,res,next)=>{
    try{
        const{name,username,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(500).json({message:'Already user exist'})
        }

        const userName= await User.findOne({username});
        if(userName){
            return res.status(500).json({message:'Username already exist'})
        }       
        if(!validator.isEmail(email)){
            res.status(400).json({message:'Invalid email format'})
        }

        if(!validator.isStrongPassword(password)){
            res.status(400).json({message:'use min 8 character, at least 1 lowercase, at least 1 uppercase, at least 1 number, at least 1 symbol'})
        }


        const hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            username,
            email,
            password:hashPassword
        })
        console.log(user)
        res.status(200).json({user})

    }

    catch(err){
        next(err)
    }
}   