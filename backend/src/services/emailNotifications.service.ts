import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  message: string,
) => {
  await resend.emails.send({
    from,
    to,
    subject,
    html: message,
  });
};
