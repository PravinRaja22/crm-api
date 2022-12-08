const { MongoClient } = require('mongodb');
async function getFiveAccountName() {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getFiveAccountName().catch(console.error);
async function getDatas(client) {
    const cursor = await client.db("CRM").collection("Account").find().limit(5)
    console.log("cursor " + JSON.stringify(cursor));
    const results = await cursor.toArray();
    console.log("result data " + results);
    let accname = []
    if (results.length > 0) {
        results.forEach(element => {
            console.log(element.accountName);
            let accountname = {
                accountName: element.accountName,
                id: element._id
            }
            accname.push(accountname)
        });
        return JSON.stringify(accname)
       
    }
    else {
        console.log("no data found");
    }
}


module.exports = {
    getFiveAccountName
}

