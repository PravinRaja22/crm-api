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
        console.log(data, 'Returned data ')
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
    let totalRecord = [];
    for (const e of insertdatas) {
        let d = new Date(e.appoinmentDate);
        const formatDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
        var someDate = new Date(formatDate);
        var utcdate = someDate.getTime();
        e.appoinmentDate = utcdate;
        let id;
        if (e._id) {
            console.log('IF')
            id = e._id;
            delete e._id;
            console.log(id)
        }

        const result = await client.db(process.env.DB).collection("Enquiry").updateOne({ _id: ObjectId(id) }, { $set: e }, { upsert: true });
        //for Upsert   
        if (result.matchedCount > 0) {
            totalRecord.push({ updatedCount: result.matchedCount });
        }

        else if (result.upsertedCount > 0) {
            totalRecord.push({ insertedCount: result.upsertedCount })

        }

    }
    // const result = await client.db(process.env.DB).collection("Enquiry").insertMany(insertdatas);
    // console.log("result of inserted count is  " + JSON.stringify(result.insertedCount));
    return totalRecord;

}


module.exports = { dataloaderEnquiry }

