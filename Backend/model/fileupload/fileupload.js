
const {MongoClient } = require('mongodb')
async function insertFile(request) {
    const url = process.env.MONGODBURL;
console.log("inside functions "+request.files);
request.files.forEach((e)=>{
    console.log('inside for each');
console.log("request protocol is ==>> ")
console.log(request.protocol + '://' + request.headers.host + '/'+ e.filename);
e.fileUrl=request.protocol + '://' + request.headers.host + '/'+ e.filename
})
    var test =request.files
    console.log("test ",test);
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

       let data = await insertFiledata(client,request.files)
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//insertFile().catch(console.error);

async function insertFiledata(client,newContact){
    const result = await client.db(process.env.DB).collection("Files").insertMany(newContact);
    console.log("inserted records "+JSON.stringify(result));
    return result;
}
module.exports = {insertFile}
