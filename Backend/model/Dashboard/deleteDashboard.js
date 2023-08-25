const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
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
        const results = await client.db(process.env.DB).collection("Dashboard").deleteMany({ _id: { $in: objectIdArray } })
        if (results) {
            return results
        }
        else {
            return "no data found";
        }

    }
    catch (e) {
        console.log('Catch Block Delete Dashboard');
        return e.message;

    }

}
module.exports = { deleteDashboard }