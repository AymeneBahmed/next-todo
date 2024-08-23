import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  text?: string;
}

export default function Divider({ className, text }: DividerProps) {
  return (
    <div
      className={cn("h-[2px] mx-auto bg-gray-300 relative my-10", className)}
    >
      {text && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 text-slate-500 bg-white">
          {text}
        </div>
      )}
    </div>
  );
}
