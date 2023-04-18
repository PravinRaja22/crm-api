
const {MongoClient } = require('mongodb')
async function insertFile(request) {
    const url = process.env.MONGODBURL;
console.log("inside functions "+request.files);
request.files.forEach((e)=>{
    console.log(e.path);
})
var test =request.files
console.log("test ",test);
console.log(test.substr(89,200));
const pathfil = test.substr(89,200);
console.log("path file ",pathfil);
// var ret = test.replace('C:\Users\Cloud\OneDrive - Cloud Desk Technology\Documents\GitHub\crm-backend-api\crm-api','')
// console.log("after removed path ",ret);
// console.log("inside file protocol "+request.headers.host);
// console.log("Files "+request.file.filename);
    const client = new MongoClient(url);
    console.log(request.files);
    try {
        //Connecting to DB
        await client.connect();
        // let data =  await insertFiledata(client, {
        // files:request.protocol + '://' + request.headers.host + '/'+ request.file.filename,
        // filedata:request.file,
        // fileName:request.file.originalname,
        // filePath:test,
        // fileSize:request.file.size,
        // fileType:request.file.mimetype,
        // })
        // console.log("result "+JSON.stringify(data));

        console.log(request.protocol + '://' + request.headers.host + '/'+ request.file.filename);
        return request.protocol + '://' + request.headers.host + '/'+ request.file.filename;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//insertFile().catch(console.error);

async function insertFiledata(client,newContact){
    const result = await client.db("CRM").collection("Files").insertOne(newContact);
    console.log("inserted records "+JSON.stringify(result));
    return result;
}
module.exports = {insertFile}
