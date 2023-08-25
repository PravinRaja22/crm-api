const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function dataloaderDeal(request, createdBy, modifiedBy) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    let d = new Date();
    const formatDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    var someDate = new Date(formatDate);
    var someDate1 = someDate.getTime();
    try {
        await client.connect();
        request.forEach(function (variable) {
            variable.createdDate = someDate1;
            variable.modifiedDate = someDate1;
            variable.createdBy = createdBy;
            variable.modifiedBy = modifiedBy

        });

        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];
        function toObject(names, values) {

            for (let i = 0; i < names.length; i++)
                result[names[i]] = values[i];
        }
        toObject(objdata, objvalues)
        let data = await insertDataloaderDeal(client, result)
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
//dataloaderOpportuntiy().catch(console.error);
async function insertDataloaderDeal(client, insertdatas) {
    let totalRecord = []
    for (const e of insertdatas) {
        // Extract _id and exclude it from the update
        let id;
        if (e._id) {
            console.log('IF')
            id = e._id;
            delete e._id;
            console.log(id)
        }

        const result = await client.db(process.env.DB).collection("Deal").updateOne({ _id: ObjectId(id) }, { $set: e }, { upsert: true });
        //for Upsert   
        if (result.matchedCount > 0) {
            totalRecord.push({ updatedCount: result.matchedCount });
        }

        else if (result.upsertedCount > 0) {
            totalRecord.push({ insertedCount: result.upsertedCount })

        }
    }
    return totalRecord;
    // const result = await client.db(process.env.DB).collection("Deal").insertMany(insertdatas);
    // console.log("result of inserted count is  " + JSON.stringify(result.insertedCount));
}
module.exports = { dataloaderDeal }

