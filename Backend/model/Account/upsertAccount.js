const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function upsertAccount(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("upsert Route " + request)
        var upsertdatas = {
            accountName: request.accountName,
            accountNumber: request.accountNumber,
            annualRevenue: request.annualRevenue,
            rating: request.rating,
            type: request.type,
            phone: request.phone,
            industry: request.industry,
            billingAddress: request.billingAddress,
            billingCountry: request.billingCountry,
            billingCity: request.billingCity,
            billingCities: request.billingCities,
            shippingAddress: request.shippingAddress,
            description: request.description,
            createdbyId: request.createdbyId,
            createdDate: request.createdDate,
           
        }
        console.log("upasert datas object datas " + JSON.stringify(upsertdatas))
          let data =  await upsertSingleRecord(client,request._id, upsertdatas)
          return data
    
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
upsertAccount().catch(console.error);
async function upsertSingleRecord(client, id, upsertdatas) {
    //update single record
    console.log("inside upsert  account ")
    const result = await client.db("CRM").collection("Account").updateOne({ _id:ObjectId(id) },{$set: upsertdatas},{upsert:true});
    console.log(JSON.stringify(result));
    if (result.upsertedCount > 0) {
        console.log(`one document was inserted with the id ${result.upsertedId}`);
        return `one document was inserted with the id ${result.upsertedId}`
    }
    else {
        console.log(`${result.modifiedCount} document(s) was were updated`);
        return `Account Updated Succesfully`
    }
}


module.exports = { upsertAccount }
