const usermodel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.register = async (req, res) =>{

    try{
        const {name,email,password} = req.body;

        const alreadyExist = await usermodel.findOne({email});

        if(alreadyExist){
            return res.status(400).json({message:"User already exist"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new usermodel({

        name,
        email,
        password:hashedPassword
    })
    await newUser.save();

    const token  = jwt.sign({id:newUser.id},process.env.jwt_secret,{expiresIn:"1h"});

    res.status(201).json({message:"User Registered Successfully"});
    }catch (error) {
       
        return res.status(500).json({ 
            success: false, 
            message: 'Server error during registration processing' 
        });
    }

}


exports.login = async (req, res)=>{

    try{
        const {email,password} = req.body;

        const user = await usermodel.findOne({email});

        if(!user){
            return res.status(404).json({message:"User not Found"});
        }
        const isPasswordVaild = await bcrypt.compare(password, user.password);

        if(!isPasswordVaild){
            return res.status(401).json({message:"Invalid Password"});
        }

        const token  = jwt.sign({id:user.id},process.env.jwt_secret,{expiresIn:"1h"});

        res.status(200).json({message:"Login Successfull",token});
    }catch (error) {
        // Handle server/database errors cleanly
        return res.status(500).json({ 
            success: false, 
            message: 'Server error during login processing' 
        });
}
};