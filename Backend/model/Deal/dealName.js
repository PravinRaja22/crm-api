const { MongoClient } = require('mongodb');
async function  getDealName(request) {
    
    let oppName = request
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, oppName)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getopportunityName().catch(console.error);
async function getDatas(client, oppName) {
    if(oppName){
        console.log("inside if statement of oppName")
        const cursor = await client.db(process.env.DB).collection("Deal").find({ opportunityName: new RegExp('^'+oppName)})
        const results = await cursor.toArray();
        let oppname = []
        if (results.length > 0) {
            results.forEach(element => {
                console.log(element.opportunityName);
                let opportunityName = {
                    opportunityName: element.opportunityName,
                    id: element._id
                }
                oppname.push(opportunityName)
            });
            return JSON.stringify(oppname)
        }
        else {
            return 'No data Found'
        }
    }
    else {
        console.log("inside Deal name test");
        const cursor = await client.db(process.env.DB).collection("Deal").find().limit(5)
        const results = await cursor.toArray();
        let oppname = []
        if (results.length > 0) {
            results.forEach(element => {
                console.log(element.opportunityName);
                let opportunityName = {
                    opportunityName: element.opportunityName,
                    id: element._id
                }
                oppname.push(opportunityName)
            });
            return JSON.stringify(oppname)
        }
        else {
            return "no data found";
        }
    }
}
module.exports = {
    getDealName
}