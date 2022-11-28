
const { MongoClient } = require('mongodb')
async function inventoryManagmentData(request) {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    //    const url = process.env.MONGODB_URL;
    //    console.log("process data "+ process.env.MONGODB_URL);
    const client = new MongoClient(url);
    try {
        //Connecting to DB
        await client.connect();
        await createInventoryManagement(client, {
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

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
inventoryManagmentData().catch(console.error);

async function createInventoryManagement(client, newInventoryMangement) {
    const result = await client.db("CRM").collection("Inventory Management").insertOne(newInventoryMangement);
    console.log(`New Inventory  created with the following id : ${result.insertedId}`);
}
module.exports = { inventoryManagmentData }