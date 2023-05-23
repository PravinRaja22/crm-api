
const { MongoClient } = require('mongodb');
async function main() {
    const url ='mongodb+srv://smartcrm:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("inside delete function ")
        await deleteManyrecored(client)
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
main().catch(console.error);
async function deleteManyrecored(client){
    const result = await client.db("CRM").collection("Account").deleteMany();
    console.log(result);
    console.log(`${result.deletedCount} documents deleted in the Database`);
}


//Method 2
/*const { MongoClient } = require('mongodb');
async function main() {
    const url = "mongodb+srv://smartprocess.env.DB:smart123@cluster0.rbvicx9.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    try {
        await client.connect();
        await deleteManyrecored(client,"Green")
    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
main().catch(console.error);
//this will delete multiple records
async function deleteManyrecored(client,listings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({name:listings});
    console.log(result);
    console.log(`${result.deletedCount} documents deleted in the Database`);
    //console.log(`${result.main} documents were deleted from the database`);
}*/





