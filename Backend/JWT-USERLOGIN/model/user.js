const mongoose= require('mongoose')
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:5,
        max:255
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
//exporting this file to other files
//mongoose . model will wrap the data and give it to express
//wraping the data in the userSchema to user variable
module.exports = mongoose.model("User",userSchema)