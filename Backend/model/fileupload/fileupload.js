
const {MongoClient } = require('mongodb')
async function insertFile(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    //    const url = process.env.MONGODB_URL;
//    console.log("process data "+ process.env.MONGODB_URL);
console.log("inside File Upload insert "+request.file);
console.log("inside file protocol "+request.headers.host);
console.log("Files "+request.file.filename);
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
       let data =  await insertFiledata(client, {
        file:request.protocol + '://' + request.headers.host + '/ '+request.file.filename,
        })
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