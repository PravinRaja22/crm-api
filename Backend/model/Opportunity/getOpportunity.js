// const fastify = require('fastify')({logger :false})
// fastify.register(require('../plugin/mongodb'))
// // fastify.after(error => {error ? console.log(error):"plugin loaded successfully"});
// // fastify.ready(error => {error ? console.log(error):"All plugin loaded successfully"});
// async function getOpportunity(){
//     console.log("inside get Opportunity of mongo db");
//     let queryobj = ([
//                 {
//                     $lookup:
//                     {
//                         from: 'Inventory Management',
//                         let: { "searchId": { $toObjectId: "$propertyId" } },
//                         pipeline: [
//                         { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
//                         ],
//                         as: 'Propertydetails'
//                     }
//                 },
//                 {
//                     $lookup:
//                     {
//                         from: 'Lead',
//                         let: { "searchId": { $toObjectId: "$LeadId" } },
//                         pipeline: [
//                         { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
//                         ],
//                         as: 'Leaddetails'
//                     }
//                 }
//             ])
//     const opportunityCollection = await fastify.mongo.client.db('CRM').collection('Opportunity')
//     let results =await  opportunityCollection.aggregate(queryobj).toArray();
//     if(results.length >0){
//                 return JSON.stringify(results)
//         }  
//         else{
//             return "No data found";
//         }              

// }
// module.exports = {getOpportunity}

const { result } = require('lodash');
const { MongoClient } = require('mongodb');
async function getOpportunity() {
    //filter the data based on the bedrooms bathroom and beds
    const url = process.env.MONGODBURL;
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
//getOpportunity().catch(console.error);
async function getDatas(client) {
    let queryobj = ([
        {
            $lookup:
            {
                from: 'Inventory Management',
                let: { "searchId": { $toObjectId: "$InventoryId" } },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
                ],
                as: 'Inventorydetails'
            }
        },
        {
            $lookup:
            {
                from: 'Lead',
                let: { "searchId": { $toObjectId: "$LeadId" } },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$searchId"] } } },
                ],
                as: 'Leaddetails'
            }
        }
    ])
    const cursor = await client.db("CRM").collection("Opportunity").aggregate(queryobj)
    const results = await cursor.toArray();
    if (results.length > 0) {
        //converting epoch time to ist
        // results.forEach(oppdate => {
        //     console.log("opportunity date " + oppdate.closeDate);
        //     if (oppdate.closeDate) {
        //         var d = new Date(oppdate.closeDate);
        //         oppdate.closeDate = d.toISOString().split('T')[0]
        //         console.log("resutles of contact data " + JSON.stringify(results));
        //     }
        // })
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { getOpportunity }

