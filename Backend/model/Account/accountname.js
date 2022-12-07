const { MongoClient } = require('mongodb');
async function getAccountName(request) {
    console.log("inside get AccountName lookup "+request)
    console.log(request.accountName);
    let accountName = request.accountName
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client,accountName)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getAccountName().catch(console.error);
async function getDatas(client,accNames) {
const cursor = await client.db("CRM").collection("Account").find({accountName : new RegExp('^'+accNames)})
console.log("cursor "+JSON.stringify(cursor));
    const results = await cursor.toArray();
    console.log("result data "+results);
    let accname =[]
    if (results.length > 0) {
        results.forEach(element => {
            console.log(element.accountName);
            let accountname={
                accountName:element.accountName,
                id:element._id
            }
           accname.push(accountname)
      
       });
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

