const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connnectDB = require('./config/connectDB')
const router = require('./routes/index.js')
const cookieParser = require('cookie-parser');
const {app, server} = require('./socket/index')


// const app = express()

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 8080
app.get("/",(req,res)=>{
    res.json({
        message: "Server is running at "+ PORT
    })
})

//api end points
app.use('/api',router)


connnectDB().then(()=>{
    server.listen(PORT ,()=>{
        console.log("Server is running at " + PORT)
    })
})

