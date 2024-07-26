import profileService from "../../services/profile/profile.services";

class ProfileController {
  constructor() {}

  async getProfiles(req: any, res: any) {
    try {
      const profiles = await profileService.getProfile(req, res);
      res.status(200).json({ message: "success", profiles });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default new ProfileController();
