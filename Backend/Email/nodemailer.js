const nodemailer = require('nodemailer')
async function sendEmail(request) {
    let subject = request.subject;
    let Body = request.htmlBody;
    let toEmail = request.recordsdata.email
    let mailtransporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"venkatpravin24@gmail.com",
        pass:"qttgtlvmsmwqwxvo"
    }
})

const filepath = path.join(__dirname, '../uploads/' + attachmentname)
console.log("File Path is : " + filepath)
let details = {
    to:toEmail,
    subject:subject,
    text:Body,
    attachments: [
        { filename:attachmentname, path: filepath }
    ]
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

