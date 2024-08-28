export default function EmailVerificationMailTemplate({
  token,
}: {
  token: string;
}) {
  // TODO: change later in production
  const verificationLink = `http://localhost:3000/email-verification?token=${token}`;

  return (
    <>
      Click <a href={verificationLink}>here</a> to verify your account.
    </>
  );
}
