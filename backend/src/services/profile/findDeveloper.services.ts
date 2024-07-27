import { ObjectId, WithId } from "mongodb";
import { connectDB, client, dbName } from "../../config/mongoDb";
import { Profile } from "../../types/ProfileTypes";

class FindDeveloperServices {
  constructor() {}

  async fetchAllDevelopers(): Promise<Profile[]> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Profile>("profiles");

      const cursor = collection.find();
      const developers: WithId<Profile>[] = await cursor.toArray();

      return developers;
    } catch (error) {
      console.error("Error fetching developers:", error);
      return [];
    }
  }

  async fetchDeveloper(id: string): Promise<Profile | null> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Profile>("profiles");

      const objectId = new ObjectId(id);

      // Fetch the developer
      const developer = await collection.findOne({ _id: objectId });

      return developer;
    } catch (errors) {
      console.error("Failed to fetch developer:", errors);
      throw new Error("Failed to fetch developer");
    }
  }
}

export default new FindDeveloperServices();
