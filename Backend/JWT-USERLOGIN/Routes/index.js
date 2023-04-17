const express=require('express');
const app = express()
const authRoutes=require("./JWT-USERLOGIN/routes/pathroutes")


app.use("/api/user",authRoutes)

app.listen(5000,()=>{
    console.log("connected to port succesfully");
})