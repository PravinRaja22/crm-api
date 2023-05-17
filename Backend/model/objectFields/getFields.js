

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
    let keydta
    let filterObject;
    let filterObjecthighest=[];
    let tempobject;
    let indexvalue = 0
    var biggestNum
    var smallestNum
    result.forEach((variable) => {
        console.log(Object.keys(variable).length)
        if (indexvalue == 0) {
            biggestNum = Object.keys(variable).length;
            smallestNum = Object.keys(variable).length;
            filterObjecthighest = { filedNames: Object.keys(variable) }
        }
        else {
            console.log("inside else")
            console.log("biggest num is " + biggestNum)
            tempobject = { filedNames: Object.keys(variable) }
            let tmpsize = tempobject.filedNames.length;
            console.log('temp size ',tmpsize)
            if (tmpsize > biggestNum) {
                console.log("inside checking of biggest")
                console.log(variable)
                 filterObjecthighest= tempobject
            }
        }
        indexvalue++
        console.log("highest value is ")
        console.log(filterObjecthighest)
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
