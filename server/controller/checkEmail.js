const UserModel = require("../models/UserModel.js")

async function checkEmail(req,res){
    try{

        const {email} = req.body
        const checkEmail = await UserModel.findOne({email}).select("-password")

        if(!checkEmail){
            return res.status(400).json({
                message : "User not exists",
                error : true
            })
        }

        return res.status(200).json({
            message : "VARIFIED EMAIL",
                success : true,
                data : checkEmail
        })

    }catch(error){
       res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
       })
    }
}

module.exports = checkEmail