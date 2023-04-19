const nodemailer = require('nodemailer')
const path = require('path')
async function otpVerification(request,otp) {
 
    let subject = "OTP Verification Code";
    let Body = "Your otp code to signup clouddesk CRM tool is  "+otp;
    let emailId=request.body.emailId
    console.log('Email id is : '+emailId);
    console.log('Subject is : ' + subject);
    console.log('Body is : ' + Body);
  

            details = {
                to:emailId,
                subject: subject,
                text: Body,
            }

let mailtransporter = nodemailer.createTransport({
        service: process.env.GMAIL,
            auth: {
                user: process.env.FROMEMAILID,
                pass: process.env.PASSWORD,
            },

        })

        

        mailtransporter.sendMail(details, async (err) => {
            if (err) {
                console.log("inside error of send mail");
                console.log(err);
                return err.message;
            }
            else {
                console.log("inside else of node mailer "+otp);
                return otp;
            }
        })
    };
    module.exports = { otpVerification }


