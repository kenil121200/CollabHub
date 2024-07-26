import profileService from "../../services/profile/profile.services";
import { Request, Response } from "express";

class ProfileController {
  constructor() {}

  //   async getProfiles(req: any, res: any) {
  //     try {
  //       const profiles = await profileService.getProfile(req, res);
  //       res.json(profiles);
  //     } catch (error) {
  //       res.status(500).json({ error });
  //     }
  //   }

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
}

export default new ProfileController();
