const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function dataloaderLead(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    console.log("data loader testing data "+JSON.stringify(request));


    let d = new Date();

    const formatDate = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');



    var dataloaderarray=[];
    request.forEach((variable)=>{
        console.log("inside for loop "+JSON.stringify(variable));
        var updatedatas={
            salutation: variable.salutation,
            firstName: variable.firstName,
            lastName: variable.lastName,
            fullName:variable.firstName+' '+variable.lastName,
            phone: variable.phone,
            leadSource: variable.leadSource,
            industry: variable.industry,
            leadStatus: variable.leadStatus,
            email: variable.email,
            createdbyId: variable.createdbyId,
            createdDate: formatDate,
            modifiedDate:formatDate,
        };
        dataloaderarray.push(updatedatas)
    });
    try {
        await client.connect();
        console.log("data loader array "+JSON.stringify(dataloaderarray));

       
    let data =  await upsertmultiplerecord(client,request._id,dataloaderarray)
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
async function upsertmultiplerecord(client,id,updatedatas){
    const result = await client.db("CRM").collection("Lead").insertMany(updatedatas);
    console.log("result of inserted id "+JSON.stringify(result.insertedCount));
    // if (result.insertedCount) {
    //     result.insertedIds.forEach(function(variable){
    //         return `Record inserted with the id ${variable}`
    //     });
    // }

}
module.exports={dataloaderLead}

