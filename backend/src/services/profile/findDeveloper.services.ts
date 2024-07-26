import { WithId } from "mongodb";
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
}

export default new FindDeveloperServices();
