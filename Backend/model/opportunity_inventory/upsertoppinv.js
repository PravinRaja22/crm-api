const { MongoClient } = require('mongodb');
async function getContact() {
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getContact().catch(console.error);
async function getDatas(client) {
    let queryobj = ([
        {
            $lookup:
            {
                from: 'Account',
                let: { "searchId": { $toObjectId: "$AccountId" } },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
                ],
                as: 'Accountdetails'
            }
        }
    ])
    try{
        const cursor = await client.db("CRM").collection("Contact").aggregate(queryobj)
        const results = await cursor.toArray();
        if (results.length > 0) {
            results.forEach((datearray)=>{
                console.log("date field "+datearray.date);
                if(datearray.date){
                    var utcSeconds = datearray.date;
                    var d = new Date(utcSeconds);
                    console.log(d.toISOString().split('T')[0]) 
                    datearray.date = d.toISOString().split('T')[0]
                    console.log("resutles of contact data "+JSON.stringify(results));
                }
            });
            return JSON.stringify(results)
        }
        else {
            console.log("no data found");
        }
    }
    catch(e){
        return e.message
    }
}
module.exports = { getContact }