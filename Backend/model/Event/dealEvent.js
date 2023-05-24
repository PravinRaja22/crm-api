const { MongoClient } = require('mongodb');
async function dealEvent(oppId) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("incoming id of the opportunity task "+oppId);
    try {
        await client.connect();
        let data = await opportunitytaskDatas(client,oppId)
        return data;
    } catch (e) {
        console.error("get task catch block " +e);
        return e.message
    } finally {
        await client.close();
    }
}
//opportunityTask().catch(console.error);
async function opportunitytaskDatas(client,oppid) {
    console.log("deal event datas "+oppid);
    const cursor = await client.db(process.env.DB).collection("Event").find({"relatedTo.id" :new RegExp('^' + oppid)})
    const results = await cursor.toArray();
    console.log("opportunity final results "+JSON.stringify(results));
    if (results.length > 0) {
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
module.exports = {dealEvent}