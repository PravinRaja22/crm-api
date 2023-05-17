

const { MongoClient } = require('mongodb');
async function getFieldsdata(objectName) {
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();
        let data = await getDatas(client, objectName)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//getAccountdata().catch(console.error);
async function getDatas(client, objectName) {

    console.log("inside field object Name is : " + objectName)
    const cursor = await client.db(process.env.DB).collection(objectName).find()
    let result = await cursor.toArray()
    let filterObjecthighest=[];
    let tempobject;
    let indexvalue = 0
    var biggestNum
    var smallestNum
    console.log(result)
    result.forEach((variable) => {
        console.log(Object.keys(variable).length)
        if (indexvalue == 0) {
            biggestNum = Object.keys(variable).length;
            smallestNum = Object.keys(variable).length;
            filterObjecthighest = { fieldNames: Object.keys(variable) }
        }
        else {
            console.log("inside else")
            console.log("biggest num is " + biggestNum)
            tempobject = { fieldNames: Object.keys(variable) }
            let tmpsize = tempobject.fieldNames.length;
            console.log('temp size ',tmpsize)
            if (tmpsize > biggestNum) {
                 filterObjecthighest= tempobject
            }
        }
        indexvalue++
    });

    if (filterObjecthighest) {
        //console.log(results);
        return JSON.stringify(filterObjecthighest)
    }
    else {
        console.log("no data found");
    }
}
module.exports = {
    getFieldsdata
}
