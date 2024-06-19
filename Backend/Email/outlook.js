const { cloneWith } = require('lodash');
const nodemailer = require('nodemailer')
const path = require('path')
async function outlookemail(request) {
    console.log("inside outlookemail")
    let subject = request.body.subject;
    let Body = request.body.htmlBody;
    let emailId = request.body.emailId
    console.log('Email id is : ' + emailId);
    console.log('Subject is : ' + subject);
    console.log('Body is : ' + Body);
    console.log(process.env.OUTLOOKAUTHID, 'Email id is ')
    console.log(process.env.OUTLOOKPASSWORD, 'Password is  id is ')
    console.log(request.files)
    if (request.files.length > 0) {
        request.files.forEach(e => {
            console.log(e)

            if (e.filename) {
                console.log("inside file name of outlook");
                let attachmentname = e.filename
                console.log('file name  is : ' + attachmentname);
                const filepath = path.join(__dirname, '../uploads/' + attachmentname)
                console.log("File Path is : " + filepath)
                console.log("inside with file attachment outlook")

                details = {
                    //from address only required for outlook.com
                    from: process.env.OUTLOOKAUTHID,
                    to: emailId,
                    subject: subject,
                    text: Body,
                    attachments: [
                        { filename: attachmentname, path: filepath }
                    ]
                }
            }
        })

    } else {
        console.log("else of file name outlook");
        details = {
            //from address only required for outlook.com
            from: process.env.OUTLOOKAUTHID,
            to: emailId,
            subject: subject,
            text: Body,
        }
    }



    let mailtransporter = nodemailer.createTransport({
        //OUTLOOK SERVICE   
        host: process.env.HOTMAIL, // hostname 
        secureConnection: false,
        port: 587, // port for secure SMTP
        auth: {
            //outlook authentication
            user: process.env.OUTLOOKAUTHID,
            pass: process.env.OUTLOOKPASSWORD,


        },
        tls:
            { ciphers: 'SSLv3' }
    })
    mailtransporter.sendMail(details, async (err) => {
        if (err) {
            console.log("inside error of send mail");
            console.log(err);
            return err.message;
        }
        else {
            console.log("inside else of node mailer");
            return "Email sent successfully";
        }
    })
};
module.exports = { outlookemail }



