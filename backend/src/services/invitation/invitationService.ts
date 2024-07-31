import nodemailer from "nodemailer";
import { InvitationData } from "../../types/InvitationTypes";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "collabhub9@gmail.com", 
    pass: "nzckhnrotigtsata" 
  }
});

export const sendInvitationEmail = async (invitationData: InvitationData) => {
  const { email, name, projectName, projectModerator, subject, projectId } = invitationData;

  const mailOptions = {
    from: "collabhub9@gmail.com",
    to: email,
    subject: subject,
    html: `
      <p>Hi ${name},</p>
      <p>${projectModerator} has invited you to join the project ${projectName}. 
      <a href="http://localhost:3000/accept-invitation?projectId=${projectId}&projectName=${encodeURIComponent(projectName)}">Click here</a> to accept or reject the request.</p>
      <br>
      <p>From Team,<br>Collab-Hub</p>
      <hr>
      <p><small>This is from a non-federated email. Please refrain from replying to this email. 
      Instead, use the email of the project coordinator to communicate further.</small></p>
    `
  };

  await transporter.sendMail(mailOptions);
};