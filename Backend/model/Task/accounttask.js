const { MongoClient } = require('mongodb');
async function accountTask(accId) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    console.log("incoming id of the opportunity task "+accId);
    try {
        await client.connect();
        let data = await accounttaskDatas(client,accId)
        return data;
    } catch (e) {
        console.error("get task catch block " +e);
        return e.message
    } finally {
        await client.close();
    }
}
//accountTask().catch(console.error);
async function accounttaskDatas(client,accid) {
    console.log("account task datas "+accid);
    const cursor = await client.db(process.env.DB).collection("Task").find({AccountId : new RegExp('^' + accid)})
    const results = await cursor.toArray();
    console.log("account final results "+JSON.stringify(results));
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
module.exports = {accountTask}