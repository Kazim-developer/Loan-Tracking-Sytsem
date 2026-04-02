import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  userEmail: string,
  sender: string,
  subject: string,
  message: string,
) => {
  await resend.emails.send({
    from: sender,
    to: userEmail,
    subject,
    html: message,
  });
};
