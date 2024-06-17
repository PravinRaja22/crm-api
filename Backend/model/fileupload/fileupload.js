const { MongoClient } = require('mongodb')
async function insertFile(request) {
    const url = process.env.MONGODBURL;
    console.log('===')
    console.log(request.files);
    console.log(request.body.modifiedBy)
    let modifideBy = JSON.parse(request.body.modifiedBy)
    let createdBy = JSON.parse(request.body.createdBy)
    let relatedTo = JSON.parse(request.body.relatedTo)
    // console.log(modifideBy)
    // console.log(createdBy)
    // console.log(relatedTo)
    console.log(request.body)
    request.files.forEach((e) => {
        console.log('inside for each');
        console.log("request protocol is ==>> ")
        console.log(request.protocol + '://' + request.headers.host + '/' + e.filename);
        e.fileUrl = request.protocol + 's://' + request.headers.host + '/' + e.filename;
        e.createdDate = request.body.createdDate;
        e.modifiedDate = request.body.modifiedDate;
        e.createdBy = JSON.parse(createdBy);
        e.modifiedBy = JSON.parse(modifideBy);
        e.relatedTo = relatedTo;
        console.log(e);
    })
    var test = request.files;
    console.log("test ", test);
    const client = new MongoClient(url);
    console.log(request.files);
    try {
        await client.connect();
        let data = await insertFiledata(client, request.files);
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//insertFile().catch(console.error);

async function insertFiledata(client, newFile) {
    const result = await client.db(process.env.DB).collection("Files").insertMany(newFile);
    console.log("inserted records " + JSON.stringify(result));
    if (result.insertedCount > 0) {
        console.log("inserted done");
        return "file Uploaded successfully";

    }
    else {
        return "File not uploaded ";
    }
}
module.exports = { insertFile }
