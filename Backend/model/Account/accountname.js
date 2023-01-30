// const fastify = require('fastify')({logger :false})
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function getAccountName(accNames){
//     const accountCollection = await fastify.mongo.client.db('CRM').collection('Account')
//     let accname = []
//     let accountname={}
//     let results
//     if(accNames)
//     {
//             results =await  accountCollection.find({ accountName: new RegExp('^'+accNames)}).toArray();
//     }
//     else {
//             results =await  accountCollection.find().limit(5).toArray();
//     }
//     if (results.length > 0) {
//                 results.forEach(element => {
//                     console.log(element.accountName);
//                     accountname = {
//                         accountName: element.accountName,
//                         id: element._id
//                     }
//                     accname.push(accountname)
//                 });
//                 return JSON.stringify(accname)
//             }
//             else {
//                 return 'No data Found'
//             }
//         }

// module.exports = {getAccountName}

const { MongoClient } = require('mongodb');
async function getAccountName(request) {
    
    let accountName = request
    const url = process.env.MONGODBURL;
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
//getAccountName().catch(console.error);
async function getDatas(client, accNames) {
    if(accNames){
        console.log("inside if statement of accnames")
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

