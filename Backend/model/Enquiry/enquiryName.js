const { MongoClient } = require('mongodb');
async function enquiryName(request) {
    let leadname = request
    console.log("lead name "+leadName)
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, leadname)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//leadName().catch(console.error);
async function getDatas(client, leadname) {
    if (leadname) {
        console.log("inside if lead name")
        console.log(leadname)
        const cursor = await client.db(process.env.DB).collection("Lead").find({ fullName: new RegExp('^' + leadname) })
        const results = await cursor.toArray();
        let ledName = []
        if (results.length > 0) {
            results.forEach(element => {
                let leadName = {
                    leadName: element.fullName,
                    id: element._id
                }
                ledName.push(leadName)
            })
            return JSON.stringify(ledName)
        }
        else {
            return 'No Records Found'
        }
    }
    else {
        const cursor = await client.db(process.env.DB).collection("Lead").find().limit(5)
        const results = await cursor.toArray();
        let ledName = []
        if (results.length > 0) {
            results.forEach(element => {
                let leadName = {
                    leadName: element.fullName,
                    id: element._id
                }
                ledName.push(leadName)
            })
            return JSON.stringify(ledName)
        }
        else {
            return 'No Records Found'
        }
    }
}
module.exports = {
    enquiryName
}

