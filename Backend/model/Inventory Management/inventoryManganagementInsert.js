const {MongoClient } = require('mongodb')
async function propertydata(request) {
const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";

   
   const client = new MongoClient(url);
    try {
        console.log('Inside insert Account')
        //Connecting to DB
        await client.connect();
      let data =   await createProperty(client, {
            projectName:request.projectName,
            propertyName:request.propertyName,
            propertyUnitNumber:request.propertyUnitNumber,
            type:request.type,
            tower:request.tower,
            country:request.country,
            city: request.city,
            floor:request.floor,
            status:request.status,
            totalArea:request.totalArea,
            createdbyId:request.createdbyId,
            createdDate:request.createdDate,
        })
        return data

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
propertydata().catch(console.error);

async function createProperty(client,newproperty){
    const result = await client.db("CRM").collection("Inventory Management").insertOne(newproperty);
    console.log(`New Property created with the following id : ${result.insertedId}`);
    return result.insertedId;
}
module.exports = {propertydata}