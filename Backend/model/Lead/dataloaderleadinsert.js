const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function dataloaderLead(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    console.log("data loader testing data " + JSON.stringify(request));
    let d = new Date();
    const formatDate = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    // console.log("Before size");
    // console.log("After size");


    //     var dataloaderarray=[];
    //     request.forEach((variable)=>{
    //         console.log("inside for loop "+JSON.stringify(variable));
    //         var updatedatas={
    //             salutation: variable.salutation,
    //             firstName: variable.firstName,
    //             lastName: variable.lastName,
    //             fullName:variable.firstName+' '+variable.lastName,
    //             phone: variable.phone,
    //             leadSource: variable.leadSource,
    //             industry: variable.industry,
    //             leadStatus: variable.leadStatus,
    //             email: variable.email,
    //             createdbyId: variable.createdbyId,
    //             createdDate: formatDate,
    //             modifiedDate:formatDate,
    //         };
    //         dataloaderarray.push(updatedatas)
    //     });
    try {
        await client.connect();
        console.log("Request data "+JSON.stringify(request));

        request.forEach(function(variable){
            console.log("inside for loop before adding date lead insert data loader",variable);
            variable.createdDate=formatDate
            variable.modifiedDate=formatDate
            console.log("inside for loop after adding date lead insert data loader ",variable);

        });
        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];
        console.log("KEYS " + objdata);

        function toObject(names, values) {
            console.log("keys inside to Objeccts " + names);
            console.log("names " + JSON.stringify(values));
            for (let i = 0; i < names.length; i++)
                //  names.push(5,6)
                //  values.push(formatDate,formatDate)
               // result.push(dates)
                result[names[i]] = values[i];
                console.log("final results "+JSON.stringify(result));
            


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
dataloaderLead().catch(console.error);
async function upsertmultiplerecord(client, insertdatas) {
    const result = await client.db("CRM").collection("Lead").insertMany(insertdatas);
    console.log("result of inserted count is  " + JSON.stringify(result.insertedCount));
}
module.exports = { dataloaderLead }

