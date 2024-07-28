import nodemailer from "nodemailer";
import { InvitationData } from "../../types/InvitationTypes";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true, 
  auth: {
    user: "collabhub9@gmail.com", 
    pass: "aszxckeigpswpoyn" 
  }
});

export const sendInvitationEmail = async (invitationData: InvitationData) => {
  const { email, name, projectName, projectModerator, subject } = invitationData;

  const mailOptions = {
    from: "collabhub9@gmail.com",
    to: email,
    subject: subject,
    html: `
      <p>Hi ${name},</p>
      <p>${projectModerator} has invited you to join the project ${projectName}. 
      <a href="https://your-project-url.com/accept-invitation">Click here</a> to accept or reject the request.</p>
      <br>
      <p>From Team,<br>Collab-Hub</p>
      <hr>
      <p><small>This is from a non-federated email. Please refrain from replying to this email. 
      Instead, use the email of the project coordinator to communicate further.</small></p>
    `
  };

  await transporter.sendMail(mailOptions);
};