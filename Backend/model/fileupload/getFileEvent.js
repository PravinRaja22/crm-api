const { MongoClient } = require('mongodb');
async function eventFile(eventId) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("incoming id of the files event "+eventId);
    try {
        await client.connect();
        let data = await eventFilesdata(client,eventId)
        return data;
    } catch (e) {
        console.error("get files  event catch block " +e);
        return e.message
    } finally {
        await client.close();
    }
}
//leadTask().catch(console.error);
async function eventFilesdata(client,eventId) {
    console.log("event files datas "+eventId);
    const cursor = await client.db(process.env.DB).collection("Files").find({"relatedTo.id" : new RegExp('^' + eventId)})
    const results = await cursor.toArray();
    console.log("event final results "+JSON.stringify(results));
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
module.exports = {eventFile}