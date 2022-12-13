const { MongoClient } = require('mongodb');
async function leadName(request) {
    let leadname = request
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
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
leadName().catch(console.error);
async function getDatas(client, leadname) {
    if (leadname) {
        const cursor = await client.db("CRM").collection("Lead").find({ firstName: new RegExp('^' + leadname) })
        const results = await cursor.toArray();
        let ledName = []
        if (results.length > 0) {
            results.forEach(element => {
                let leadName = {
                    leadName: element.firstName,
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
        console.log("inside else statement leadname is Null")
        const cursor = await client.db("CRM").collection("Lead").find().limit(5)
        const results = await cursor.toArray();
        let ledName = []
        if (results.length > 0) {
            results.forEach(element => {
                let leadName = {
                    leadName: element.firstName,
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
    leadName
}

