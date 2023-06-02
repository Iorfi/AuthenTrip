import { MongoClient } from "mongodb";

// Put below your own connections string//
const connectionString = "mongodb+srv://bautistaiorfida:votalindo@mymongodb.8ldltzy.mongodb.net/";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("austral");

export default db;