const { MongoClient } = require('mongodb');
async function getDealEnquiry(enquiryId) {
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log("Enquiry Id for Deal  "+enquiryId);
        await client.connect();
        let data = await getDealDatas(client,enquiryId)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function getDealDatas(client,enquiryId) {
    console.log("inside functionality Enquiry  id is : "+enquiryId);
    const cursor = await client.db(process.env.DB).collection("Deal").find({LeadId :new RegExp('^' + enquiryId)})
    const results = await cursor.toArray();
    console.log(results,"results getDealDatas");
    if (results.length > 0) {
        return JSON.stringify(results)
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    getDealEnquiry
}

