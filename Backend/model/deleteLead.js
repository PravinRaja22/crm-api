const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteLead(dataid) {
    console.log('data id :'+dataid);

    //filter the data based on the bedrooms bathroom and beds
    const url = "mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        console.log("inside delete Lead");
        await client.connect();
        
    let data =     await deleteDatas(client,dataid)
    return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
deleteLead().catch(console.error);
async function deleteDatas(client,deleteleaddata)
{
    console.log("inside data deleteing "+deleteleaddata)
const results = await client.db("CRM").collection("Lead").deleteOne({_id:ObjectId(deleteleaddata)})
console.log("results "+JSON.stringify(results))
    if(results){
       console.log(results);
       console.log(`${result.deletedCount} documents deleted in the Database`);
       return JSON.stringify(results)
}  
else{
    console.log("no data found");
}                                                                                                    
}
module.exports= {deleteLead}