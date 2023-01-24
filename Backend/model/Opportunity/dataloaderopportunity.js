const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function dataloaderOpportuntiy(request) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("data loader testing data for opportunity  " + JSON.stringify(request));
    let d = new Date();
    const formatDate = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    try {
        await client.connect();
        console.log("Request data "+JSON.stringify(request));
        request.forEach(function(variable){
            console.log("inside for loop before adding date ",variable);
            variable.createdDate=formatDate
            variable.modifiedDate=formatDate
            console.log("inside for loop after adding date  ",variable);

        });

        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];
        console.log("KEYS " + objdata);
        function toObject(names, values) {
            console.log("keys inside to Objeccts " + names);
            console.log("names " + JSON.stringify(values));
            for (let i = 0; i < names.length; i++)
                result[names[i]] = values[i];
                console.log("final results "+JSON.stringify(result));
        }
        toObject(objdata, objvalues)
        //  console.log("data loader array "+JSON.stringify(dataloaderarray));

        let data = await insertDataloaderOpportunity(client, result)

        // let data =  await upsertmultiplerecord(client,request._id,dataloaderarray)
        return data
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
dataloaderOpportuntiy().catch(console.error);
async function insertDataloaderOpportunity(client, insertdatas) {
    const result = await client.db("CRM").collection("Opportunity").insertMany(insertdatas);
    console.log("result of inserted count is  " + JSON.stringify(result.insertedCount));
}
module.exports = { dataloaderOpportuntiy }

