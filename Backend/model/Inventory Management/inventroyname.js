const { MongoClient } = require('mongodb');
async function propertyName(request) {
    let propname = request
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, propname)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
propertyName().catch(console.error);
async function getDatas(client, propname) {
    if (propname) {
        console.log("inside property if ");
        const cursor = await client.db("CRM").collection("Inventory Management").find({ propertyName: new RegExp('^' + propname) })
        const results = await cursor.toArray();
        let propName = []
        if (results.length > 0) {
            results.forEach(element => {
                let propertyName = {
                    propertyName: element.propertyName,
                    id: element._id
                }
                propName.push(propertyName)
            })
            return JSON.stringify(propName)
        }
        
        else {
            return 'No Records Found'
        }

    }
    else {
        const cursor = await client.db("CRM").collection("Inventory Management").find().limit(5)
        const results = await cursor.toArray();
        let propName = []
        if (results.length > 0) {
            results.forEach(element => {
                let propertyName = {
                    propertyName: element.propertyName,
                    id: element._id
                }
                propName.push(propertyName)
            })
            return JSON.stringify(propName)
        }
        else {
            return 'No Records Found'
        }
    }
}
module.exports = {
    propertyName
}

