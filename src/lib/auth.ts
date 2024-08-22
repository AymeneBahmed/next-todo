interface CreateStackUserProps {
  access_token: string;
  refresh_token: string;
  user_id: string;
}

export async function createStackUser(email: string, password: string) {
  try {
    const response = await fetch(
      "https://api.stack-auth.com/api/v1/auth/password/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-stack-project-id": process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
          "x-stack-access-type": "server",
          "x-stack-secret-server-key": process.env.STACK_SECRET_SERVER_KEY!,
        },
        body: `{"email":"${email}","password":"${password}","verification_callback_url":"http://localhost:3000/handler/email-verification"}`,
      }
    );
    const data: CreateStackUserProps = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}
