const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function insertEmail(request) {
    console.log("INSIDE INSERT EMAIL");
    console.log(request.body);
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        let d = new Date();
        const formatDate = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

        await client.connect();
        let result
        if(request.file){
             result =[{
                subject : request.body.subject,
                message : request.body.htmlBody,
                email:request.body.emailId,
                file:request.file,
                mailsendDate:formatDate
            }]

        }
        else if(!request.file){

             result =[{
                subject : request.body.subject,
                message : request.body.htmlBody,
                email:request.body.emailId,
                mailsendDate:formatDate
            }]

        }
       
        console.log("inset emial array after function is  : "+JSON.stringify(result));
        let data = await upsertmutiipleRecord(client,result)
        return data
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}

async function upsertmutiipleRecord(client, insertdatas) {
console.log("inside multiple insert Emails are are : "+JSON.stringify(insertdatas));
    const result = await client.db(process.env.DB).collection("Email").insertMany(insertdatas);
    console.log(JSON.stringify(result));
    console.log('inserted count of file is : '+JSON.stringify(result.insertedCount));

    // if (result.upsertedCount > 0) {
    //     console.log("Email inserted id are : "+result.upsertedCount);
    //     return `Record inserted with the id ${result.upsertedId}`
    // }
    // else {
    //     return `mail  not  Inserted Succesfully in the Database`
    // }
}


module.exports = { insertEmail }
