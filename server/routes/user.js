const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

router.get('/guest', (req,res) => {
    res.status(200).json({message: 'Guest user'});
})

router.get('/:username', async (req,res) => {
    try {
        const {username} = req.params.username;
        if(username !== "guest"){
            const result = await UserModel.find({username: req.user.username});
            if(!result){
                return res.status(400).json({message: "User not found"});
            }
        }else{
            res.status(200).json({message: "Guest user"})
        }
    } catch (error) {
        console.error(error);
    }
})

module.exports = router