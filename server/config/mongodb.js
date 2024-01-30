
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mongodb:dfXquH3DJUfbbuVv@cluster0.kk9kxbw.mongodb.net/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
async function connect() {
    try {
      const database = client.db('sample_gc01');
      db = database
      return database;
    } catch(err) {
        console.log(err)
    }
  }

function getDb(){
    return db
}

module.exports = { connect, getDb };