const { MongoClient } = require('mongodb');
async function checkAccess(object, deparment, role) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, object, deparment, role)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getAccountdata().catch(console.error);
async function getDatas(client, objectdata, departmentdata, role) {
    console.log("inside get data for the access")
    console.log(" obj is : " + objectdata)
    console.log(" dept is : " + departmentdata)
    console.log(" role  is : " + role)

    const cursor = await client.db(process.env.DB).collection("Permissions").find({ department: departmentdata, "roleDetails.roleName": role }, { projection: { permissionSets: 1, _id: 0 } })
    const results = await cursor.toArray();
    let objectPermissions = []
    console.log(results.length)
    if (results.length > 0) {
        const data = { ...results }
        console.log(data[0].permissionSets)
        JSON.parse(data[0].permissionSets).forEach(e => {
            if (e.object == objectdata) {
                objectPermissions.push({ "permissions": e.permissions })
            }
        })

        return objectPermissions
    }
    else {
        return results
    }
}
module.exports = {
    checkAccess
}
