const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'venkatpravin24@gmail.com',
    pass:'Pravin22@'
  },
  port:465,
  host:'smpt.gmail.com'
})
const options = {
  from:'venkatpravin24@gmail.com',
  to:'pravinsf24@gmail.com',
  subject:'Sending Email wiht node js',
  text:"Got a Mail ????"
};

transporter.sendMail(options,function(err,info){
  if(err){
    console.log(err);
    return;
  }
  console.log("sent ",info.response);
})
