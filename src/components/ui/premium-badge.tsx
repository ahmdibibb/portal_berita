import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  text: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PremiumBadge({
  text,
  variant = "primary",
  size = "md",
  className,
}: PremiumBadgeProps) {
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600",
    secondary: "bg-gradient-to-r from-gray-500 to-gray-600",
    success: "bg-gradient-to-r from-green-500 to-green-600",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-bold text-white rounded-full shadow-sm",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {text}
    </span>
  );
}
