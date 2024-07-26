import { connectDB, client, dbName } from "../../config/mongoDb";
import { User } from "../../types/UserTypes";

class UserServices {
  constructor() {}

  async setUser(user: User): Promise<string> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<User>("users");

      const existingUser = await collection.findOne({ username: user.username });

      if (existingUser) {
        return "User already exists";
      }

      const result = await collection.insertOne(user);
      if (result.insertedId) {
        return "User created successfully";
      } else {
        throw new Error("User creation failed");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Internal server error");
    }
  }
}

export default new UserServices();