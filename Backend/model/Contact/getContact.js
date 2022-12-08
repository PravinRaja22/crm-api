const { MongoClient } = require('mongodb');
async function getContact() {
    console.log('data :');
    //filter the data based on the bedrooms bathroom and beds
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        console.log("inside client");
        await client.connect();
        console.log("connected to client");
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

    let queryObjects = ([

        {
            $lookup: {
                //searching collection name
                from: 'Account',
                //setting variable [searchId] where your string converted to ObjectId
                'let': {"searchId": {$toObjectId: "$AccountId"}}, 
                //search query with our [searchId] value
                pipeline:[
                  //searching [searchId] value equals your field [_id]
                  {$match: {$expr:[ {"_id": "$$searchId"}]}},
                  //projecting only fields you reaaly need, otherwise you will store all - huge data loads
                  //{"$project":{"_id": 1}}

                ],

                as: 'Account'

              }
        }
    ])


let queryobj = ([
    {
        $lookup:
           {
              from:'Account',
              let: {"searchId": {$toObjectId: "$AccountId"}}, 
              pipeline:[
               // {$match: {   $expr : { $eq: [ "$$z", "$_id"] } }},
                {$match: { $expr : { $eq: [ "$_id", "$$searchId"] } }},
              ],
              as: 'Account'
           }
     }
])





    const cursor = await client.db("CRM").collection("Contact").aggregate(queryobj)
    const results = await cursor.toArray();
    if (results.length > 0) {
        // console.log("contact data "+JSON.stringify(results))
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { getContact }