const express = require('express')
const app = express();
const dotenv = require('dotenv')
const cookieparser=require('cookie-parser')

dotenv.config()
//importing the routes from the below path
const authroutes=require("./Routes/pathroutes.js")
const mongoose=require('mongoose');
const { findOne } = require('./model/user.js');
mongoose.connect('mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log("DB Connected");
    
})
const port = 8000;
app.use(cookieparser())
//with the help of this middleware we can able to get the data from the request
app.use(express.json());

//using the middle ware to make use of the imported file in all of the below code
app.use("/samplepage",authroutes)

app.listen(port,()=>{
    console.log(`conncted to  Port Number ${port}  succesfully`);
})


