const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteRole(dataid) {

    //filter the data based on the bedrooms bathroom and beds
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("delete Role")
        await client.connect();
        let data = await deleteDatas(client, dataid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//deleteAccount().catch(console.error);
async function deleteDatas(client, deleteRoledata) {
    try {
        const objectIdArray = deleteRoledata.map(id => ObjectId(id));
        const result = await client.db(process.env.DB).collection("Role").deleteMany({ _id: { $in: objectIdArray } });
        console.log(result)
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} records deleted from Role`);
            return result.deletedCount;
        }
        else {
            return null;
        }

    }
    catch (e) {
        console.log('Catch Block Delete Account');
        return e.message;

    }
    // const results = await client.db(process.env.DB).collection("Role").deleteOne({ _id: ObjectId(deleteaccountdata) })
    // if (results) {
    //     return results
    // }
    // else {
    //     return "no data found";
    // }
}
module.exports = { deleteRole }