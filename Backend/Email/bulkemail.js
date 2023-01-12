const nodemailer = require('nodemailer')
const path = require('path')
async function bulkemail(request) {
    console.log("Before Bulk email list is ");
    console.log(request);
    console.log("after bulk  email list is ");
    let subject = request.subject;
    let Body = request.htmlBody;
    console.log('Subject is : '+subject);
    console.log('Body is : '+Body);
    let emailarray=[]
    let namearray=[]
    request.recordsData.forEach(getemails => {
    console.log(getemails.email);
    emailarray.push(getemails.email)
    namearray.push(getemails.firstName)
})
console.log('Email array is : ',JSON.stringify(emailarray));
let mailtransporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"venkatpravin24@gmail.com",
        pass:"qttgtlvmsmwqwxvo"
    }
})
console.log("Arry length is : "+emailarray.length)
let details;
const filepath = path.join(__dirname, '../uploads/2023-01-10T09-30-57.169Z-wall.jpg')
console.log("File Path is : "+filepath)

if(emailarray.length > 1){

     details = {
        bcc:JSON.stringify(emailarray),
        subject:subject,
        text:Body,
        attachments:[
            {path:filepath}
                    ]
    }

}
else{
    
     details = {
        to:JSON.stringify(emailarray),
      //  to:request.email,
        subject:subject,
        text:Body,
        // attachments:[
        //     {filename:'2023-01-10T12-03-37.375Z-node js logs imp.png',path:filepath}
        //             ]
    }

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
};
module.exports = {bulkemail}