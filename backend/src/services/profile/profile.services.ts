import { connectDB, client, dbName } from "../../config/mongoDb";
import { Profile } from "../../types/ProfileTypes";

class ProfileServices {
  constructor() {}

  // async getProfile(req: ProfileRequestResponse, res: ProfileRequestResponse) {
  //   try {
  //     // Connect to the MongoDB database
  //     const db = client.db(dbName);
  //     const collection = db.collection("profiles"); // Name of the collection

  //     // Fetch all profiles from the database
  //     const profiles = await collection.find({}).toArray();
  //     console.log("profile", profiles);
  //     // Send the profiles as a response
  //     res.json(profiles);
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // }

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
