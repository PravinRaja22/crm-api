const { MongoClient } = require('mongodb');
async function enquiryEvent(leadId) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("incoming id of the lead task "+leadId);
    try {
        await client.connect();
        let data = await leadtaskDatas(client,leadId)
        return data;
    } catch (e) {
        console.error("get enquiry event catch block " +e);
        return e.message
    } finally {
        await client.close();
    }
}
//leadTask().catch(console.error);
async function leadtaskDatas(client,leadid) {
    console.log("Lead task datas "+leadid);
    const cursor = await client.db(process.env.DB).collection("Event").find({LeadId : new RegExp('^' + leadid)})
    const results = await cursor.toArray();
    console.log("lead final results "+JSON.stringify(results));
    if (results.length > 0) {
        results.forEach((element) => {
            if (element.startDate && element.EndDate) {
                let startdatesecs = new Date(element.startDate)
                element.startDate = startdatesecs.toISOString().split('T')[0]
                let enddatesecs = new Date(element.EndDate)
                element.EndDate = enddatesecs.toISOString().split('T')[0]
            }
            else if(element.startDate && !element.EndDate){
                let startdatesecs = new Date(element.startDate)
                element.startDate = startdatesecs.toISOString().split('T')[0]
            }
            else if(!element.startDate && element.EndDate){
                let enddatesecs = new Date(element.EndDate)
                element.EndDate = enddatesecs.toISOString().split('T')[0]
            }
        })
        return JSON.stringify(results)
    
    }
    else {
        console.log("no data found");
    }
}
module.exports = {enquiryEvent}