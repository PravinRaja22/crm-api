const { MongoClient } = require('mongodb');
async function getFiles() {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getfiledata(client)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getFiles().catch
async function getfiledata(client) {

    try{
        const cursor = await client.db("CRM").collection("File").find()
        const results = await cursor.toArray();
        if (results.length > 0) {
            return JSON.stringify(results)
        }
        else {
            console.log("no data found");
        }
    }
    catch(e){
        return e.message
    }
}
module.exports = { getFiles }