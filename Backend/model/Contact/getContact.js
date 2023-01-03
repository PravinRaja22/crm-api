// const fastify = require('fastify')({logger :false})
// fastify.register(require('../plugin/mongodb'))
// fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function getContact(){
//     console.log("inside get contact  of mongo db");
//     let queryobj = ([
//                 {
//                     $lookup:
//                     {
//                         from: 'Account',
//                         let: { "searchId": { $toObjectId: "$AccountId" } },
//                         pipeline: [
//                             { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
//                         ],
//                         as: 'Accountdetails'
//                     }
//                 }
//             ])
//     const contactCollection = await fastify.mongo.client.db('CRM').collection('Contact')
//     let results =await contactCollection.aggregate(queryobj).toArray();
//     try{
//     if (results.length > 0) {
//                     // console.log("contact data "+JSON.stringify(results))
//                     return JSON.stringify(results)
//                 }
//                 else {
//                     console.log("no data found");
//                 }
//             }
//             catch(e){
//                 return e.message
//             }
    
// }
// module.exports = {getContact}




(console.error);const { MongoClient } = require('mongodb');
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
getContact().catch
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
              //converting epoch time to ist
            // results.forEach((datearray)=>{
            //     console.log("date field "+datearray.date);
            //     if(datearray.date){
            //         var utcSeconds = datearray.date;
            //         var d = new Date(utcSeconds);
            //         datearray.date = d.toISOString().split('T')[0]
            //         console.log("resutles of contact data "+JSON.stringify(results));
            //     }
            // });
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