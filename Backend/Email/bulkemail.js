const nodemailer = require('nodemailer')
const path = require('path')
async function bulkemail(request) {
    console.log("Before Bulk email list is ");
    console.log(request);
    console.log("after bulk  email list is "
    );
    let subject = request.body.subject;
    let Body = request.body.htmlBody;
    let attachmentname = request.file.filename
    console.log('Subject is : ' + subject);
    console.log('Body is : ' + Body);
    console.log('file name  is : ' + attachmentname);

    let emailarray = []
    let namearray = []
    //console.log(request.body.recordsData);
    let arrayfiledata = request.body.recordsData;
    console.log(arrayfiledata);
    console.log(Array.isArray(arrayfiledata));
    let objectarray =[];
    if(Array.isArray(arrayfiledata)){
        JSON.parse(arrayfiledata).forEach(getemails => {
            console.log(getemails.email);
            emailarray.push(getemails.email)
            namearray.push(getemails.firstName)
        })

    }
    else{
        console.log("inside else of not array");
        console.log('Email is : '+arrayfiledata.email);
         objectarray.push(arrayfiledata)
         console.log(objectarray);
         JSON.stringify(objectarray).forEach(getemail =>{
            console.log("inside else array");
            console.log(getemail.email);

         })

    }
  



    console.log('Email array is : ', JSON.stringify(emailarray));
    let mailtransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "venkatpravin24@gmail.com",
            pass: "qttgtlvmsmwqwxvo"
        }
    })
    console.log("Arry length is : " + emailarray.length)
    let details;
    //const filepath = path.join(__dirname, '../uploads/2023-01-10T09-30-57.169Z-wall.jpg')
    const filepath = path.join(__dirname, '../uploads/' + attachmentname)
    console.log("File Path is : " + filepath)
    if (emailarray.length > 1) {
        details = {
            bcc: JSON.stringify(emailarray),
            subject: subject,
            text: Body,
            attachments: [
                { filename:attachmentname, path: filepath }
            ]
        }

    }
    else {

        details = {
            to:JSON.stringify(emailarray),
            //to: email,
            subject: subject,
            text: Body,
            attachments: [
                { path: filepath }
            ]
        }

    }

    mailtransporter.sendMail(details, (err) => {
        if (err) {
            console.log("inside if");
            console.log(err.message);
            return err.message;
        }
        else {
            console.log("inside else of node mailer");
            return "Email sent successfully";
        }
    })
};
module.exports = { bulkemail }