const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;

async function deleteManyEnquiry(dataid) {
    // Filter the data based on the bedrooms bathroom and beds
    const url = process.env.MONGODBURL;
    const client = new MongoClient(url);
    try {
        console.log('DELETE MANY ENQUIRY');
        console.log(dataid);
        await client.connect();
        const data = await deleteManyDatas(client.db(process.env.DB), dataid);
        return data;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function deleteManyDatas(db, deleteEnquirydata) {
    console.log("Delete Enquiry List =====>>>>>");
    
    try {
        const objectIdArray = deleteEnquirydata.map(id => ObjectId(id));
        const result = await db.collection("Enquiry").deleteMany({ _id: { $in: objectIdArray}});
        console.log(result);
        console.log(`${result.deletedCount} records deleted from Enquiry Account`);
        return result;
    } catch (err) {
        console.error('Error deleting records:', err);
    }
}

module.exports = { deleteManyEnquiry };
