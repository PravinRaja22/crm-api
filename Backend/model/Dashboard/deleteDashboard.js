const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function deleteDashboard(dataid) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log(dataid);
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
async function deleteDatas(client, deletedashboarddata) {
    try {
        const objectIdArray = deletedashboarddata.map(id => ObjectId(id));
        const result = await client.db(process.env.DB).collection("Dashboard").deleteMany({ _id: { $in: objectIdArray } })
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} records deleted from Contact`);
            return result.deletedCount;
        }
        else {
            return null;
        }

    }
    catch (e) {
        console.log('Catch Block Delete Dashboard');
        return e.message;

    }

}
module.exports = { deleteDashboard }