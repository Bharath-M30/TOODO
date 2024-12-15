const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const registerController = async (req,res) => {
    try {
        const {username, email, password} = req.body;

        const existingEmail = await UserModel.findOne({email: email});
        if(existingEmail){
            return res.status(409).json({message: "Email already exists"});
        }

        const existingUsername = await UserModel.findOne({username: username});
        if(existingUsername){
            return res.status(409).json({message: "Username already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            tasks: []
        })
        const result = await newUser.save();
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
    }
}

module.exports = registerController

