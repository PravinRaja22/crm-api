

const { count } = require('console');
const { set } = require('lodash');
const { MongoClient } = require('mongodb');
async function getDashboardData(object, field) {
    console.log(object)
    console.log(field)
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, object, field)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function getDatas(client, object, field) {
    console.log(field)

    let query = [{
          
            $group: {
                _id: { field: "$$field" },
                count: { $sum: 1 },
            },       
    }]
    const cursor = await client.db(process.env.DB).collection(object).aggregate(query)
    const results = await cursor.toArray();
    return results
}
module.exports = {
    getDashboardData
}
