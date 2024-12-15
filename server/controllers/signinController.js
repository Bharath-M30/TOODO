require("dotenv").config();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const signinController = async (req,res) => {
    try {
        const {username, password} = req.body;
        const foundUser = await UserModel.findOne({username: username});
        console.log(foundUser);
        if(!foundUser){
            return res.status(400).json({message: 'User not found'});
        }
        const match = await bcrypt.compare(password, foundUser.password);
        if(match){
            res.status(200).json({message: 'Login successful'});
        }else{
            res.status(401).json({message: 'Unauthorized'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

module.exports = signinController