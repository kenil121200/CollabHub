import { Request, Response } from "express";
import { sendInvitationEmail } from "../../services/invitation/invitationService";
import { InvitationData } from "../../types/InvitationTypes";

export const sendInvitation = async (req: Request, res: Response) => {
  try {
    const invitationData: InvitationData = req.body;
    await sendInvitationEmail(invitationData);
    res.status(200).json({ message: "Invitation sent successfully" });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).json({ message: "Failed to send invitation" });
  }
};