const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteUser(dataid) {

    //filter the data based on the bedrooms bathroom and beds
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();

        let data = await deleteDatas(client, dataid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//deleteUser().catch(console.error);
async function deleteDatas(client, deleteuserdata) {

    try {
        const objectIdArray = deleteuserdata.map(id => ObjectId(id));
        const result = await client.db(process.env.DB).collection("User").deleteMany({ _id: { $in: objectIdArray } });
        console.log(result)
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} records deleted from User`);
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
    // const results = await client.db(process.env.DB).collection("User").deleteOne({ _id: ObjectId(deleteaccountdata) })
    // if (results) {
    //     return JSON.stringify(results)
    // }
    // else {
    //     console.log("no data found");
    // }
}
module.exports = { deleteUser }