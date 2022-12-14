const { MongoClient } = require('mongodb');
async function getAccountName(request) {
    
    let accountName = request
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, accountName)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getAccountName().catch(console.error);
async function getDatas(client, accNames) {
    if(accNames){
        const cursor = await client.db("CRM").collection("Account").find({ accountName: new RegExp('^'+accNames)})
        const results = await cursor.toArray();
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
            return 'No data Found'
        }
    }
    else {
        console.log("inside account name test");
        const cursor = await client.db("CRM").collection("Account").find().limit(5)
        const results = await cursor.toArray();
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
            return "no data found";
        }

    }
  
}


module.exports = {
    getAccountName
}

