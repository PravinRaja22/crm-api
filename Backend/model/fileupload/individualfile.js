const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;

async function getEachFiles(fileId) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("incoming id of the file upload "+fileId);

    try {
        await client.connect();
        let data = await getindividualdata(client,fileId)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getEachFiles().catch(console.error)
async function getindividualdata(client,fileId) {

    try{
        const cursor = await client.db(process.env.DB).collection("Files").find({ _id: ObjectId(fileId) })
        const results = await cursor.toArray();
        if (results.length > 0) {
            console.log("individual file is : "+results);
            return JSON.stringify(results)
        }
        else {
            return 'No data found'
        }
    }
    catch(e){
        return e.message
    }
}
module.exports = { getEachFiles }