import EmailVerificationMailTemplate from "@/components/mails/EmailVerificationMailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export function sendEmailVerificationMail(email: string, token: string) {
  resend.emails.send({
    // TODO: change later in production
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your account",
    react: EmailVerificationMailTemplate({ token }),
  });
}
