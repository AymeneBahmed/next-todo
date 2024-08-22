import { CheckCircle } from "lucide-react";

export default function FormSuccess({ message }: { message: string }) {
  return (
    <div className="flex items-center bg-emerald-400/10 p-5 pl-8 mt-5 rounded-lg text-emerald-700 gap-3">
      <CheckCircle />
      <div>{message}</div>
    </div>
  );
}
