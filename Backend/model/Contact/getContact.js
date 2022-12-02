const { MongoClient } = require('mongodb');
async function getContact() {
    console.log('data :');
    //filter the data based on the bedrooms bathroom and beds
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        console.log("inside client");
        await client.connect();
        console.log("connected to client");
    let data =     await getDatas(client)
    return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getContact().catch(console.error);
async function getDatas(client)
{
const cursor = await client.db("CRM").collection("Contact").find({})
const results = await cursor.toArray();  
    if(results.length >0){
    return JSON.stringify(results)
}  
else{
    console.log("no data found");
}                                                                                                    
}
module.exports= {getContact}