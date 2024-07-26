import { connectDB, client, dbName } from "../../config/mongoDb";
import { Profile } from "../../types/ProfileTypes";

class ProfileServices {
  constructor() {}

  async fetchProfile(email: string): Promise<Profile | null> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Profile>("profiles");

      // Find the profile document based on the email
      const profile = await collection.findOne({ email: email });

      return profile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error; // Rethrow the error to be handled by the controller
    }
  }

  async setProfile(profile: Profile): Promise<String> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Profile>("profiles"); // Specify type for collection
      const result = await collection.insertOne(profile);
      if (result.insertedId) {
        return "Profile created successfully"; // Return success message
      } else {
        throw new Error("Profile creation failed"); // Throw an error if not successful
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      throw new Error("Internal server error");
    }
  }

  async updateProfile(
    email: string,
    updatedProfile: Partial<Profile>
  ): Promise<any> {
    try {
      const db = client.db(dbName);
      const collection = db.collection<Profile>("profiles");

      // Update the profile document based on the email
      const result = await collection.updateOne(
        { email: email },
        { $set: updatedProfile }
      );
      return result;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Rethrow the error to be handled by the controller
    }
  }
}

export default new ProfileServices();
