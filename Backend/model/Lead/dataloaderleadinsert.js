const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function dataloaderLead(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    console.log("data loader testing data "+JSON.stringify(request));









//     let d = new Date();

//     const formatDate = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
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

        let objdata = Object.keys(request);
        let objvalues = Object.values(request);
        let result = [{}];

        function toObject(names, values) {
            for (let i = 0; i < names.length; i++)
                if (names[i] != '_id') {
                    result[names[i]] = values[i];
                    console.log('inside upsert lead function ' + JSON.stringify(result));
                }
        }
        toObject(objdata, objvalues)
      //  console.log("data loader array "+JSON.stringify(dataloaderarray));

        let data =  await upsertmultiplerecord(client,result)

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
async function upsertmultiplerecord(client,updatedatas){
    const result = await client.db("CRM").collection("Lead").insertMany(updatedatas);
    console.log("result of inserted count is  "+JSON.stringify(result.insertedCount));
    // if (result.insertedCount) {
    //     result.insertedIds.forEach(function(variable){
    //         return `Record inserted with the id ${variable}`
    //     });
    // }

}
module.exports={dataloaderLead}

