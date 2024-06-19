const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function deleteEvent(dataid) {
    const url =process.env.MONGODBURL;
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
//deleteTask().catch(console.error);
async function deleteDatas(client, deleteTaskdata) {
    try {
        const objectIdArray = deleteTaskdata.map(id => ObjectId(id));
        const result = await client.db(process.env.DB).collection("Event").deleteMany({ _id:{$in:objectIdArray }});
        console.log(result)
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} records deleted from Event`);
            return result.deletedCount;
        }
        else {
            return null;
        }

    }
    catch (e) {
        console.log('Catch Block Delete Event');
        return e.message;

    }


    // const results = await client.db(process.env.DB).collection("Event").deleteOne({ _id: ObjectId(deleteTaskdata) })
    // if (results) {
    //     return JSON.stringify(results)
    // }
    // else {
    //     console.log("no data found");
    // }
}
module.exports = { deleteEvent }