

const { MongoClient } = require('mongodb');
async function getAllowedTabs(department,role) {
    console.log(department)
    console.log(role)
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client,department,role)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function getDatas(client,departmentdata,role) {
   
    console.log("inside get all tabs department  : "+departmentdata)
    console.log("inside get all tabs role  : "+role)
    let data ="Admin"
    console.log(data)
    const cursor = await client.db(process.env.DB).collection("Permissions").find({department:departmentdata,"roleDetails.roleName":role}, {projection:{permissionSets:1,_id:0}})
    const results = await cursor.toArray();
    let allowedCollections =[]
    if(results.length > 0){
        
        results.forEach(e=>{
            JSON.parse(e.permissionSets).forEach(element => {
                console.log(element)
                if(element.permissions.read == true){
                    if(element.object !== 'Opportunity Inventory' && element.object !=="Email"){
                        allowedCollections.push(element.object)
                    }
                }
            });
        })
    }
    console.log(allowedCollections.sort())
    return allowedCollections
}
module.exports = {
    getAllowedTabs
}
