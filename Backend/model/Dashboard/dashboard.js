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
    var fielddatabase = field
    console.log("test " + fielddatabase)
    //      let querydata = [
    //         {
    //         $group: {
    //             _id: '$stage',
    //             field: { $first: '$stage' },
    //             count: { $sum: 1 },
    //         },
    //     },
    //     {
    //     }
    // ]
    // var query = {};
    // query[field] = field;
    // console.log(query.stage)
    // let ans = query.stage
    // console.log("ans is "+ans)
    const cursor = await client.db(process.env.DB).collection(object).aggregate([
        {
            $group: {
                _id:`$${field}`,
                count:{$sum:1}
            },
        },
        { 
            $sort: { 
                count: -1
            } 
        },
    ]).toArray()
    return cursor
}
module.exports = {
    getDashboardData
}
