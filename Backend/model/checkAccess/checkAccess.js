const { MongoClient } = require('mongodb');
async function checkAccess(object,deparment,role) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client,object,deparment,role)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getAccountdata().catch(console.error);
async function getDatas(client,object,departmentdata,role) {
console.log("inside get data for the access")
console.log(" obj is : "+ object)
console.log(" dept is : "+ departmentdata)
console.log(" role  is : "+ role)

    const cursor = await client.db(process.env.DB).collection("Permissions").find({department:departmentdata})
    const results = await cursor.toArray();
    let objectPermissions = []
    if (results.length > 0) {
        results.forEach(e =>{
            console.log("inside for loop")
            if(e.roleDetails.roleName === role){
                console.log("filtered data is ==========")
                console.log(e)
                console.log(e.permissionSets)
                JSON.parse(e.permissionSets).forEach((e)=>{
                    console.log("inside permission set for loop ")
                    if(e.object == object){
                        objectPermissions.push({permissions:(e.permissions)})
                    }
                } )
            }
        })
        return objectPermissions
    }
    else {
        console.log("no data found");
    }
}
module.exports = { 
    checkAccess
 }
