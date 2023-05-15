const { isNull } = require('lodash');
const { MongoClient } = require('mongodb');
async function getRole(department,role) {
    console.log("inside get Role")
       const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data
        console.log("department name ",department)
        console.log("role name ",role)
        console.log("True or False : ",!role)
        if (department !==null && !role){
            console.log("inside only department ",department)
            data = await getRoleForDeparatment(client,department)
        }
        else if (department !==null && role !==null){
            console.log("inside deapartment and role")
            data = await getDepartmentRole(client,department,role)


        }
      
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function getRoleForDeparatment(client,department){
    try {
        console.log("department finding "+department)
        const cursor = await client.db(process.env.DB).collection("Role").find({departmentName:department})
        const results = await cursor.toArray();
        console.log("result inside function ")
        console.log(results)
        if (results.length > 0) {
             console.log("inside length")
            return JSON.stringify(results)
        }
        else {
            return "no data found";
        }
    } catch (error) {
        return error.message

    }

}

async function getDepartmentRole(client,department,role){
    try {
        console.log("department and Role finding "+department  ," And Role is :",role)
        const cursor = await client.db(process.env.DB).collection("Role").findOne({departmentName:department,roleName:role})
        const results = await cursor.toArray();
        console.log("result inside function ")
        console.log(results)
        if (results.length > 0) {
             //console.log(results);
             console.log(results)
            return JSON.stringify(results)
        }
        else {
            return "no data found";
        }
    } catch (error) {
        return error.message

    }

}
module.exports = { 
    getRole
 }
