const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function dataloaderOpportuntiy(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    console.log("data loader testing data for opportunity  " + JSON.stringify(request));
    let d = new Date();
    const formatDate = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    try {
        await client.connect();
        console.log("Request data "+JSON.stringify(request));
        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];
        console.log("KEYS " + objdata);
        function toObject(names, values) {
            console.log("keys inside to Objeccts " + names);
            console.log("names " + JSON.stringify(values));
            for (let i = 0; i < names.length; i++)
            if (names[i] != '_id') {
                //  names.push(5,6)
                //  values.push(formatDate,formatDate)
               // result.push(dates)
                result[names[i]] = values[i];
                console.log("final results "+JSON.stringify(result));
            }


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
async function insertDataloaderOpportunity(client, updatedatas) {
    const result = await client.db("CRM").collection("Opportunity").insertMany(updatedatas);
    console.log("result of inserted count is  " + JSON.stringify(result.insertedCount));
    // if (result.insertedCount) {
    //     result.insertedIds.forEach(function(variable){
    //         return `Record inserted with the id ${variable}`
    //     });
    // }

}
module.exports = { dataloaderOpportuntiy }

