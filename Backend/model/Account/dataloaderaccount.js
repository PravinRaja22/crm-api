const { MongoClient } = require('mongodb');
async function dataloaderAccount(request) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
   // console.log("data loader testing data for Account  " + JSON.stringify(request));
    let d = new Date();
    const formatDate = [d.getMonth() + 1,d.getDate(),d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    var someDate=new Date(formatDate);
    var someDate1 = someDate.getTime();
    try {
        await client.connect();
        // console.log("Request data "+JSON.stringify(request));
        // console.log("Before for loop");
        request.forEach(function(variable){
            // console.log("inside for loop before adding date ",variable);
            variable.createdDate=someDate1
            variable.modifiedDate=someDate1
            // console.log("inside for loop after adding date  ",variable);

        });
        // console.log("After for loop");
        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];
        console.log("KEYS " + objdata);
        function toObject(names, values) {
            // console.log("keys inside to Objeccts " + names);
            // console.log("names " + JSON.stringify(values));
            for (let i = 0; i < names.length; i++)
                result[names[i]] = values[i];
                // console.log("final results "+JSON.stringify(result));
        }
        toObject(objdata, objvalues)
        let data = await insertDataloaderAccount(client, result)
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
//dataloaderAccount().catch(console.error);
async function insertDataloaderAccount(client, insertdatas) {
    const result = await client.db(process.env.DB).collection("Account").insertMany(insertdatas);
    console.log("result of inserted count is  " + JSON.stringify(result.insertedCount));
    // if (result.insertedCount) {
    //     result.insertedIds.forEach(function(variable){
    //         return `Record inserted with the id ${variable}`
    //     });
    // }

}
module.exports = { dataloaderAccount }

