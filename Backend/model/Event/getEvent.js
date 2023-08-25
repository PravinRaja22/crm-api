const { MongoClient } = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
async function getEvent() {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client)
        return data;
    } catch (e) {
        console.error("get Event catch block " + e);
        return e.message
    } finally {
        await client.close();
    }
}
//getTask().catch(console.error);
async function getDatas(client) {

    let queryobj = ([
        {
            $lookup:
            {
                from: 'Account',
                //   let: { "searchId": { $toObjectId: "$AccountId" } },

                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $eq:
                                    ["$_id", {
                                        $convert: {
                                            input: "$AccountId",
                                            to: "objectId",
                                            onError: { error: true },
                                            onNull: { isnull: true }
                                        }
                                    }]
                            }
                        }
                    },
                ],
                as: 'Accountdetails'
            }
        },
        {
            $lookup:
            {
                from: 'Enquiry',
                // let: { "searchId": { $toObjectId: "$LeadId" } },

                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $eq:
                                    ["$_id", {
                                        $convert: {
                                            input: "$LeadId",
                                            to: "objectId",
                                            onError: { error: true },
                                            onNull: { isnull: true }
                                        }
                                    }]
                            }
                        }
                    },
                ],
                as: 'Leaddetails'
            }
        },
        {
            $lookup:
            {
                from: 'Deal',
                //  let: { "searchId": { $toObjectId: "$OpportunityId" } },

                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $eq:
                                    ["$_id", {
                                        $convert: {
                                            input: "$OpportunityId",
                                            to: "objectId",
                                            onError: { error: true },
                                            onNull: { isnull: true }
                                        }
                                    }
                                    ]
                            }
                        }
                    },
                ],
                as: 'Opportunitydetails'
            }
        }
    ])
    const cursor = await client.db(process.env.DB).collection("Event").aggregate(queryobj)
    console.log(process.env.DB)
    const results = await cursor.toArray();
    if (results.length > 0) {
        //converting epoch time to ist
        // results.forEach((element) => {
        //     if (element.startDate && element.EndDate) {
        //         let startdatesecs = new Date(element.startDate)
        //         element.startDate = startdatesecs.toISOString().split('T')[0]
        //         let enddatesecs = new Date(element.EndDate)
        //         element.EndDate = enddatesecs.toISOString().split('T')[0]
        //     }
        //     else if(element.startDate && !element.EndDate){
        //         let startdatesecs = new Date(element.startDate)
        //         element.startDate = startdatesecs.toISOString().split('T')[0]
        //     }
        //     else if(!element.startDate && element.EndDate){
        //         let enddatesecs = new Date(element.EndDate)
        //         element.EndDate = enddatesecs.toISOString().split('T')[0]
        //     }
        // })
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { getEvent }