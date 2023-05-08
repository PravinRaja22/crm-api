const nodemailer = require('nodemailer')
const path = require('path')
async function gmail(request) {
 
    let subject = request.body.subject;
    let Body = request.body.htmlBody;
    let emailId=request.body.emailId
    console.log('Email id is : '+emailId);
    console.log('Subject is : ' + subject);
    console.log('Body is : ' + Body);
console.log(request.files)
if(request.files.lenngth < 0){
                    console.log("else of file name");
                        details = {
                            to:emailId,
                            subject: subject,
                            text: Body,
                        }
}
 else if(request.files.lenngth > 0)
        console.log("inside file name");
        console.log(request.files)
        request.files.forEach(e => {
            console.log(e)
            let attachmentname = e.filename
            console.log('file name  is : ' + attachmentname);
            const filepath = path.join(__dirname, '../uploads/' + attachmentname)
            console.log("File Path is : " + filepath)
            console.log("inside with file attachment")

                details = {
                    to:emailId,
                    subject: subject,
                    text: Body,
                    attachments: [
                        {filename:attachmentname, path: filepath }
                    ]
                }
        })
           
            
  
let mailtransporter = nodemailer.createTransport({
    //GMAIL SERVICE
        service: process.env.GMAIL,
            auth: {
               
        
               // Gmail authentication
                user: process.env.FROMEMAILID,
                pass: process.env.PASSWORD,
            },

        })
        mailtransporter.sendMail  (details, async (err) => {
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
    module.exports = { gmail }

//     let emailarray = []
//     let namearray = []
//     let arrayfiledata = request.body.recordsData;
//     console.log(arrayfiledata);
//     console.log("data test");
//     if(arrayfiledata){
//         console.log("inside array "+arrayfiledata);
// console.log('Email id of the if statement is '+arrayfiledata.email);
//         JSON.parse(arrayfiledata).forEach(getemails => {
//                 console.log(getemails.email);
//                 emailarray.push(getemails.email)
//                 namearray.push(getemails.firstName)
//         })
//     }
  
//     console.log('Email array is : ', JSON.stringify(emailarray));
//     let mailtransporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "venkatpravin24@gmail.com",
//             pass: "qttgtlvmsmwqwxvo"
//         }
//     })
//     console.log("Arry length is : " + emailarray.length)
//     let details;
// if(request.file.filename){
//     let attachmentname = request.file.filename
//     console.log('file name  is : ' + attachmentname);
//     const filepath = path.join(__dirname, '../uploads/' + attachmentname)
//     console.log("File Path is : " + filepath)
//     if (emailarray.length > 1) {
//         details = {
//             bcc: JSON.stringify(emailarray),
//             subject: subject,
//             text: Body,
//             attachments: [
//                 {filename:attachmentname, path: filepath }
//             ]
//         }
//     }
//     else {
//         console.log("inside the array "+JSON.stringify(emailarray));
//         details = {
//             to:JSON.stringify(emailarray),
//             subject: subject,
//             text: Body,
//             attachments: [
//                 {filename:attachmentname, path: filepath }
//             ]
//         }
//     }
// }
// else{
//     if (emailarray.length > 1) {
//         details = {
//             bcc: JSON.stringify(emailarray),
//             subject: subject,
//             text: Body,
//         }
//     }
//     else {
//         console.log("inside the array "+JSON.stringify(emailarray));
//         details = {
//             to:JSON.stringify(emailarray),
//             subject: subject,
//             text: Body,
//         }
//     }


// }


