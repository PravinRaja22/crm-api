const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteLead(dataid) {
    //filter the data based on the bedrooms bathroom and beds
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
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
const results = await client.db("CRM").collection("Lead").deleteOne({_id:ObjectId(deleteleaddata)})
    if(results){
       return JSON.stringify(results)
}  
else{
    console.log("no data found");
}                                                                                                    
}
module.exports= {deleteLead}