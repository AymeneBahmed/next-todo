import SignupForm from "@/components/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App | Signup",
};

export default function SignupPage() {
  return <SignupForm />;
}
