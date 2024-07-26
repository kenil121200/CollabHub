import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://Krutik:Web%40group5@cluster0.wnyus6e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "CollabHub";
const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  }
}

export { client, connectDB, dbName };
