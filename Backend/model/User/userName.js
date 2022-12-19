const { MongoClient } = require('mongodb');
async function  getUserName(request) {
    
    let userName = request
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, userName)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getUserName().catch(console.error);
async function getDatas(client, userName) {
    if(userName){
        console.log("inside if statement of user names")
        const cursor = await client.db("CRM").collection("User").find({ firstName: new RegExp('^'+userName)})
        const results = await cursor.toArray();
        let username = []
        if (results.length > 0) {
            results.forEach(element => {
                console.log(element.firstName);
                let userName = {
                    userName: element.firstName,
                    id: element._id
                }
                username.push(userName)
            });
            return JSON.stringify(username)
        }
        else {
            return 'No data Found'
        }
    }
    else {
        console.log("inside user name test");
        const cursor = await client.db("CRM").collection("User").find().limit(5)
        const results = await cursor.toArray();
        let username = []
        if (results.length > 0) {
            results.forEach(element => {
                console.log(element.opportunityName);
                let userName = {
                    userName: element.firstName,
                    id: element._id
                }
                username.push(userName)
            });
            return JSON.stringify(username)
        }
        else {
            return "no data found";
        }
    }
}
module.exports = {getUserName}