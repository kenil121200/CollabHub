import profileService from "../../services/profile/profile.services";
import { Request, Response } from "express";
import { Profile } from "../../types/ProfileTypes";

class ProfileController {
  constructor() {}

  async fetchProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      // Validate the request parameter
      if (!email) {
        return res.status(400).json({ message: "Email parameter is required" });
      }

      // Call the service method to fetch the profile
      const profile = await profileService.fetchProfile(email);

      if (profile) {
        return res.status(200).json(profile);
      } else {
        return res.status(404).json({ message: "Profile not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async setProfile(req: Request, res: Response): Promise<Response> {
    try {
      const {
        firstName,
        lastName,
        email,
        isVisible,
        gender,
        skills,
        typeOfUser,
        contactNumber,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !email ||
        !isVisible ||
        !gender ||
        !skills ||
        !typeOfUser ||
        !contactNumber
      ) {
        return res.status(400).json({ message: "Missing parameters" });
      }
      const insertResult = await profileService.setProfile(req.body); // Call the service method
      if (insertResult === "Profile created successfully") {
        return res
          .status(200)
          .json({ message: "Profile Created Successfully!" });
      } else {
        return res.status(500).json({ message: "Profile creation failed" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" }); // Correctly handle errors
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.body;

      // Validate the request parameters
      if (!email) {
        return res.status(400).json({ message: "Missing parameters" });
      }

      // Create the profile update object

      // Call the service method to update the profile
      const result = await profileService.updateProfile(email, req.body);
      if (result.modifiedCount === 1 || result.matchedCount === 1) {
        return res
          .status(200)
          .json({ message: "Profile updated successfully" });
      } else if (result.matchedCount !== 1) {
        return res.status(404).json({ message: "Profile not found" });
      } else {
        return res.status(500).json({ message: "Error updating profile" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ProfileController();
