
const {MongoClient } = require('mongodb')
async function insertFile(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    //    const url = process.env.MONGODB_URL;
//    console.log("process data "+ process.env.MONGODB_URL);
console.log("inside functions "+request.file.path);
test =request.file.path
console.log("test ",test);
console.log(test.substr(89,200));
const pathfil = test.substr(89,200);
console.log("path file ",pathfil);
// var ret = test.replace('C:\Users\Cloud\OneDrive - Cloud Desk Technology\Documents\GitHub\crm-backend-api\crm-api','')
// console.log("after removed path ",ret);
// console.log("inside file protocol "+request.headers.host);
// console.log("Files "+request.file.filename);
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
        let data =  await insertFiledata(client, {
        files:request.protocol + '://' + request.headers.host + '/' + request.file.filename,
        filedata:request.file,
        fileName:request.file.originalname,
        filePath:pathfil,
        fileSize:request.file.size,
        fileType:request.file.mimetype,
        })
        console.log("result "+JSON.stringify(data));
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
insertFile().catch(console.error);

async function insertFiledata(client,newContact){
    const result = await client.db("CRM").collection("Files").insertOne(newContact);
    console.log("inserted records "+JSON.stringify(result));
    return result;
   // console.log(`New file created with the following id : ${result.insertedId}`);
}
module.exports = {insertFile}
// const mongoose = require('mongoose');
// mongoose
//   .connect(
//     'mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority'
//   )
//   .then((result) => {
//     console.log('connected to mongo database');
//   })
//   .catch((err) => {
//     console.log('error connecting to database', err.message);
//   });
//   const personSchema = new mongoose.Schema({
//       name: String,
//       number: Number,
//       photo: String
//   })
//   personSchema.set('toJSON', {
//     transform: (document, returnedObj) => {
//       returnedObj.id = returnedObj._id.toString();
//       delete returnedObj._id;
//       delete returnedObj.__v;
//     },
//   });
//   module.exports = mongoose.model('Person', personSchema)