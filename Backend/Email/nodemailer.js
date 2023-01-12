const nodemailer = require('nodemailer')
async function sendEmail(request) {
    let subject = request.subject;
    let Body = request.htmlBody;
    let toEmail = request.emailRec.email
    let mailtransporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"venkatpravin24@gmail.com",
        pass:"qttgtlvmsmwqwxvo"
    }
})
// console.log('node mailer attachments '+path.join(__dirname, '../uploads'));
// const filepath = path.join(__dirname, '../uploads')
let details = {
    to:toEmail,
    subject:subject,
    text:Body,
    // attachments:[
    //     {filename:'2023-01-10T12-03-37.375Z-node js logs imp.png',path:filepath}
    //             ]
}
mailtransporter.sendMail(details,(err)=>{
    if(err){
        console.log("inside if");
        console.log(err.message);
        return err.message;
    }
    else{
        console.log("inside else of node mailer");
        return "Email sent successfully";
    }
})
}

module.exports = {sendEmail}

