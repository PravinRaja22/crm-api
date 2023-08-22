const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function dataloaderEnquiry(request, createdBy, modifiedBy) {
    console.log(createdBy, 'Created BY in Function');
    console.log(modifiedBy, 'Modified BY in Function');
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("data loader testing data " + JSON.stringify(request));
    let d = new Date();
    const formatDate = [d.getMonth() + 1, d.getDate(), , d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    var someDate = new Date(formatDate);
    var someDate1 = someDate.getTime();
    try {
        await client.connect();
        console.log("Request data " + JSON.stringify(request));

        request.forEach(function (variable) {
            console.log("inside for loop before adding date Enquiry insert data loader", variable);
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
            console.log("inside for loop after adding date Enquiry insert data loader ", variable);
        });
        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];
        console.log("KEYS " + objdata);

        function toObject(names, values) {
            console.log("keys inside to Objects " + names);
            console.log("names " + JSON.stringify(values));
            for (let i = 0; i < names.length; i++)
                result[names[i]] = values[i];
            console.log("final results " + JSON.stringify(result));
        }
        toObject(objdata, objvalues)
        //  console.log("data loader array "+JSON.stringify(dataloaderarray));

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
    console.log("inside upsert multiple record Enquiry object " + insertdatas);
    insertdatas.forEach(e => {
        console.log(e.appoinmentDate)
        let d = new Date(e.appoinmentDate);
        const formatDate = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
        console.log('format Date is ' + formatDate)
        var someDate = new Date(formatDate);
        var utcdate = someDate.getTime();
        console.log("utc date is " + utcdate)
        e.appoinmentDate = utcdate;
        console.log('appointment date is ' + e.appoinmentDate);
        console.log(e)

    })
    const result = await client.db(process.env.DB).collection("Enquiry").insertMany(insertdatas);
    console.log("result of inserted count is  " + JSON.stringify(result.insertedCount));
}
module.exports = { dataloaderEnquiry }

