const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function dataloaderEnquiry(request, createdBy, modifiedBy) {

    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    let d = new Date();
    const formatDate = [d.getMonth() + 1, d.getDate(), , d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    var someDate = new Date(formatDate);
    var someDate1 = someDate.getTime();
    try {
        await client.connect();

        request.forEach(function (variable) {
            variable.createdDate = someDate1;
            variable.modifiedDate = someDate1;
            variable.createdBy = createdBy;
            variable.modifiedBy = modifiedBy;
            if (variable.firstName && variable.lastName) {
                variable.fullName = variable.firstName + ' ' + variable.lastName
            }
            else if (variable.firstName) {
                variable.fullName = variable.firstName

            }
        });
        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];

        function toObject(names, values) {

            for (let i = 0; i < names.length; i++)
                result[names[i]] = values[i];
        }
        toObject(objdata, objvalues)
        //  console.log("data loader array "+JSON.stringify(dataloaderarray));
        console.log(result, 'Requested id is')
        let data = await upsertmultiplerecord(client, result)

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
//dataloaderLead().catch(console.error);
async function upsertmultiplerecord(client, insertdatas) {
    const updateOperations = insertdatas.map(e => {
        let d = new Date(e.appoinmentDate);
        const formatDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
        var someDate = new Date(formatDate);
        var utcdate = someDate.getTime();
        e.appoinmentDate = utcdate

        // Convert to ISO format
        console.log(e._id, 'Id is ')
        return {
            updateOne: {
                filter: { _id: ObjectId(e.id) },
                update: { $set: { e } },
                upsert: true
            }
        }
    })
    // console.log(insertdatas ,'InsertDatas');
    // const result = await client.db(process.env.DB).collection("Enquiry").updateMany({ _id: ObjectId(id) }, { $set: insertdatas }, { upsert: true });
    // console.log("result of upserted count is  " + JSON.stringify(result.insertedCount));
    console.log(updateOperations, 'Update Operations');
    const result = await client.db(process.env.DB).collection("Enquiry").bulkWrite(updateOperations);

    console.log("Number of upserted records: " + JSON.stringify(result.upsertedCount));
}
module.exports = { dataloaderEnquiry }

