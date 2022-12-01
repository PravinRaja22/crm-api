const { MongoClient } = require('mongodb');
async function getAccountName() {
    console.log("inside get AccountName")
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
getAccountName().catch(console.error);
async function getDatas(client) {
    const cursor = await client.db("CRM").collection("Account").find({})
    const results = await cursor.toArray();
    let accname =[]
    if (results.length > 0) {
        results.forEach(element => {
            console.log(element.accountName);
             accname.push(element.accountName)
           
      
       });
       console.log("acc name "+accname);
       return JSON.stringify(accname)
      // return JSON.stringify(results)
       
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    getAccountName
 }

