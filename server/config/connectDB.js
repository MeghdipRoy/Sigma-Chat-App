const mongoose = require('mongoose')

async function connnectDB(){

    try{
        await mongoose.connect(process.env.MONGODB_URI)

        const connection = mongoose.connection
        connection.on('connented',()=>{
            console.log("Connect to DB")
        })

        connection.on('error',(error)=>{
            console.log("Something went wrong in DB ",error)
        })
        }catch(error){
     console.log("Something is wrong ",error)   
    }
}

module.exports = connnectDB