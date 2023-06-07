const { MongoClient } = require('mongodb');
const { getFiles } = require('./getfiles');
var ObjectId = require('mongodb').ObjectId;
const filesystem = require('fs');
async function deleteFile(dataid) {

    //filter the data based on the bedrooms bathroom and beds
    const url =process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        await client.connect();

        let data = await deleteDatas(client, dataid)
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
//deleteAccount().catch(console.error);
async function deleteDatas(client, deleteFiledata) {
    console.log("inside delete files")
    console.log("id is "+deleteFiledata)
    const gitfilesdata = await client.db(process.env.DB).collection("Files").findOne({ _id: ObjectId(deleteFiledata) })
    console.log("get files inise files is ")
    console.log(gitfilesdata.filename)
    console.log(JSON.stringify(gitfilesdata.filename))
    // const read = filesystem.unlink('/uploads/',JSON.stringify(gitfilesdata.filename),'utf-8',(err) => {
    //     console.log("insdie delete unlink file ")
    //     if (err) {
    //         console.log("error inside file system delete")
    //         console.log(err.message)
    //     }
    //     else {
    //    console.log("file Deleted Succesfully")
    //     }
    // })
    // return "data got"
    const results = await client.db(process.env.DB).collection("Files").deleteOne({ _id: ObjectId(deleteFiledata) })
    if (results) {
        return results
    }
    else {
        return "no data found";
    }
}
module.exports = { deleteFile }
