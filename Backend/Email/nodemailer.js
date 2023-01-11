const nodemailer = require('nodemailer')
//createtransport will control the email
async function sendEmail() {
    console.log("inside node mailer function");
let mailtransporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"venkatpravin24@gmail.com",
        pass:"qttgtlvmsmwqwxvo"
    }
})

let details = {
    from:"venkatpravin24@gmail.com",
    to:"pravinsf24@gmail.com",
    subject:"sent mail from node to gmail",
    text:"Testing Email"
}


mailtransporter.sendMail(details,(err)=>{
    if(err){
        console.log("inside if");
        return err.message;
    }
    else{
        console.log("inside else of node mailer");
        return "Email send successfully with node js";
    }
})
}

module.exports = { 
    sendEmail
 }

