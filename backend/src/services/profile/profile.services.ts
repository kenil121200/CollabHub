import { connectDB, client, dbName } from "../../config/mongoDb";

class ProfileServices {
  constructor() {}

  async getProfile(req: any, res: any) {
    try {
      // Connect to the MongoDB database
      const db = client.db(dbName);
      const collection = db.collection("profiles"); // Name of the collection

      // Fetch all profiles from the database
      const profiles = await collection.find({}).toArray();
      console.log("profile", profiles);
      // Send the profiles as a response
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  //please remove any
  async updateProfile(req: any) {
    console.log("profile");
  }
}

export default new ProfileServices();
