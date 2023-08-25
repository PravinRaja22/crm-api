const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function deletedeal(dataid) {
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
//deleteOpportunity().catch(console.error);
async function deleteDatas(client, deleteDealdata) {


    try {
        const objectIdArray = deleteaccountdata.map(id => ObjectId(id));
        const result = await client.db(process.env.DB).collection("Deal").deleteMany({ _id:{$in:objectIdArray }});
        console.log(result)
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} records deleted from Deal`);
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

    // const results = await client.db(process.env.DB).collection("Deal").deleteOne({ _id: ObjectId(deleteDealdata) })
    // if (results) {
    //     return JSON.stringify(results)
    // }
    // else {
    //     console.log("no data found");
    // }
}
module.exports = { deletedeal }