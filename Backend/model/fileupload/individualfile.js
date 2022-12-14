const { MongoClient } = require('mongodb');
async function getEachFiles(fileId) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
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
getEachFiles().catch
async function getindividualdata(client) {

    try{
        const cursor = await client.db("CRM").collection("Files").find()
        const results = await cursor.toArray();
        if (results.length > 0) {
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