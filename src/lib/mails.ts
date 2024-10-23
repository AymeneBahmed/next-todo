import EmailVerificationMailTemplate from "@/components/mails/EmailVerificationMailTemplate";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "joewilliamdd31@gmail.com",
    pass: "orahazhvrejgwcww",
  },
});

export async function sendEmailVerificationMail(email: string, token: string) {
  await transporter.sendMail({
    // TODO: change later in production
    from: "Joe William <joewilliamdd31@gmail.com>",
    to: email,
    subject: "Verify your account",
    html: `Click <a href=${
      "https://next-todo-fawn-xi.vercel.app/email-verification?token=" + token
    }>here</a> to verify your account.
    `,
  });
}
