const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

async function run() {
    try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const db = await client.db("users_db")
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const users = db.collection("users")
    console.log(users);
    } catch(error){
        return error
    }
}
run().catch(console.dir);
