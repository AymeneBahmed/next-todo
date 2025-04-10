import EmailVerificationMailTemplate from "@/components/mails/EmailVerificationMailTemplate";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "aymendd3131@gmail.com",
    pass: "ruchtbpdlradolbf",
  },
});

export async function sendEmailVerificationMail(email: string, token: string) {
  const url = process.env.URL || "http://localhost:3000";

  await transporter.sendMail({
    from: "Next Todo <aymendd3131@gmail.com>",
    to: email,
    subject: "Verify your account",
    html: `Visit this link to verify: ${
      url + "/email-verification?token=" + token
    }
    `,
  });
}
