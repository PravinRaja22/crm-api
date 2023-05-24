const { MongoClient } = require('mongodb');
async function renameCollection() {
    console.log("inside rename collection ")
    const url ='mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await deleteDatas(client)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
renameCollection().catch(console.error);

async function deleteDatas(client) {
    console.log("inside sub function are ")
    const cursor = await client.db("CRM").collection("Task").rename("Event")
    console.log("success") 
}
module.exports = { renameCollection }