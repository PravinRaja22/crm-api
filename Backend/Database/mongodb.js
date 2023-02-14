const { MongoClient } = require('mongodb');
async function connectDB() {
    const url = process.env.MONGODBURL;
    console.log('URL is : '+url);
    const client = new MongoClient(url);
    try {
         await client.connect()
      //  console.log(connection);
        console.log('Mongo db connected successfully');
        return client;
    }
    catch(e){
        console.log("MONGO DB Connection Error is : "+e.message);
        
    }
    
}
module.exports = connectDB