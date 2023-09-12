const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the uri string with your connection string.
const uri = process.env.MONGODB;

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function connect() {
    try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Successfully connected to Atlas");

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const db = await client.db("users_db")
    // const users = db.collection("users")
    // console.log(users);
    return db
    } catch(error){
        console.log(error);
    }
}

module.exports = {connect}