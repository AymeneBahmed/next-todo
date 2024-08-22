import { TriangleAlert } from "lucide-react";

export default function FormError({ message }: { message: string }) {
  return (
    <div className="flex items-center bg-destructive/10 p-5 pl-8 mt-5 rounded-lg text-red-700 gap-3">
      <TriangleAlert />
      <div>{message}</div>
    </div>
  );
}
