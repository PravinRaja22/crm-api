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
    cursor.forEach((variable)=>{
      //  console.log(variable)
        if(variable._id == ""){
            variable._id=null
        }
        console.log(variable)
    });
    return cursor
}
module.exports = {
    getDashboardData
}
