import { Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function LiveIndicator({
  className,
  size = "md",
  showText = true,
}: LiveIndicatorProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center space-x-1.5", className)}>
      <div
        className={cn(
          "bg-red-500 rounded-full animate-pulse",
          sizeClasses[size]
        )}
      />
      {showText && (
        <span
          className={cn(
            "text-red-500 font-bold uppercase tracking-wider",
            textSizeClasses[size]
          )}
        >
          LIVE
        </span>
      )}
    </div>
  );
}
