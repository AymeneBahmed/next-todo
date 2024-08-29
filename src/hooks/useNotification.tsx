import { useToast } from "@/components/ui/use-toast";
import { BadgeInfo, CheckCircle, TriangleAlert } from "lucide-react";

interface NotificationProps {
  message: string;
  state: "neutral" | "success" | "error";
}

export function useNotification() {
  const { toast } = useToast();

  return {
    show({ message, state }: NotificationProps) {
      if (state === "error") {
        toast({
          description: (
            <div className="flex items-center gap-3">
              <TriangleAlert />
              <p>{message}</p>
            </div>
          ),
          variant: "destructive",
        });

        return;
      }

      if (state === "success") {
        toast({
          description: (
            <div className="flex items-center gap-3">
              <CheckCircle />
              <p>{message}</p>
            </div>
          ),
          variant: "success",
        });

        return;
      }

      toast({
        description: (
          <div className="flex items-center gap-3">
            <BadgeInfo />
            <p>{message}</p>
          </div>
        ),
        variant: "default",
      });
    },
  };
}
