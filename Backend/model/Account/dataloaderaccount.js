const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function dataloaderAccount(request, createdBy, modifiedBy) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    // console.log("data loader testing data for Account  " + JSON.stringify(request));
    let d = new Date();
    const formatDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    var someDate = new Date(formatDate);
    var someDate1 = someDate.getTime();
    try {
        await client.connect();
        console.log('DataLoder Insert Accounts')
        request.forEach(function (variable) {
            variable.createdDate = someDate1;
            variable.modifiedDate = someDate1;
            variable.createdBy = createdBy;
            variable.modifiedBy = modifiedBy;
        });
        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];
        console.log("KEYS " + objdata);
        let Phonenum
        let accountNum
        function toObject(names, values) {
            for (let i = 0; i < names.length; i++) {
                if (typeof values[i].phone == 'string') {
                    Phonenum = parseInt(values[i].phone)
                }
                if (typeof values[i].accountNumber == 'string') {
                    accountNum = parseInt(values[i].accountNumber)
                }
                values[i].phone = Phonenum
                values[i].accountNumber = accountNum
                result[names[i]] = values[i];
            }
        }
        toObject(objdata, objvalues)
        console.log(result)
        console.log(result.length)
        let data = await insertDataloaderAccount(client, result)
        return data
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
async function insertDataloaderAccount(client, insertdatas) {
    let totalRecord = [];
    for (const e of insertdatas) {
        let id;
        if (e._id) {
            console.log('IF')
            id = e._id;
            delete e._id;
            console.log(id);
        }

        const result = await client.db(process.env.DB).collection("Account").updateOne({ _id: ObjectId(id) }, { $set: e }, { upsert: true });
        if (result.matchedCount > 0) {
            totalRecord.push({ updatedCount: result.matchedCount });
        }
        else if (result.upsertedCount > 0) {
            totalRecord.push({ insertedCount: result.upsertedCount });

        }
    }
    console.log(totalRecord .length ,"Records updated or inserted  in Account")
    return totalRecord;
    // const result = await client.db(process.env.DB).collection("Account").insertMany(insertdatas);
    // console.log(result)
    // console.log("result of inserted count is  " + JSON.stringify(result.insertedCount));
    // if (result.insertedCount) {
    //     result.insertedIds.forEach(function(variable){
    //         return `Record inserted with the id ${variable}`
    //     });
    // }
}
module.exports = { dataloaderAccount }

