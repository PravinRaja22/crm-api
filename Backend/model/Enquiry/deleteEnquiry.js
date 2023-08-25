const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
async function deleteEnquiry(dataid) {
    //filter the data based on the bedrooms bathroom and beds
    const url = process.env.MONGODBURL;
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
async function deleteDatas(client, deleteEnquirydata) {
    try {
        const objectIdArray = deleteEnquirydata.map(id => ObjectId(id));
        const result = await client.db(process.env.DB).collection("Enquiry").deleteMany({ _id: { $in: objectIdArray } });
        console.log(result)
        if (result.deletedCount > 0) {
            console.log(`${result.deletedCount} records deleted from Enquiry`);
            return result.deletedCount;
        }
        else {
            return null;
        }

    }
    catch (e) {
        console.log('Catch Block Delete Enquiry');
        return e.message;

    }

}
module.exports = { deleteEnquiry }