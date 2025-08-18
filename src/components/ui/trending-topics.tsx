import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingTopic {
  id: string;
  hashtag: string;
  query: string;
  trend: "up" | "down" | "stable";
  count?: number;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
  className?: string;
  variant?: "default" | "compact" | "detailed";
  showIcon?: boolean;
  maxTopics?: number;
}

export function TrendingTopics({
  topics,
  className,
  variant = "default",
  showIcon = true,
  maxTopics = 5,
}: TrendingTopicsProps) {
  const displayTopics = topics.slice(0, maxTopics);

  const variantClasses = {
    default: "space-y-2",
    compact: "flex flex-wrap gap-2",
    detailed: "space-y-3",
  };

  const topicClasses = {
    default:
      "inline-flex items-center space-x-2 px-3 py-2 bg-blue-700/30 text-blue-100 rounded-full hover:bg-blue-700/50 transition-all duration-200 border border-blue-600 hover:border-blue-500 hover:scale-105",
    compact:
      "inline-flex items-center space-x-1 px-2.5 py-1.5 bg-blue-700/30 text-blue-100 rounded-full hover:bg-blue-700/50 transition-all duration-200 border border-blue-600 text-sm",
    detailed:
      "flex items-center justify-between p-3 bg-blue-700/30 text-blue-100 rounded-lg hover:bg-blue-700/50 transition-all duration-200 border border-blue-600",
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-400" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-400" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return "text-blue-300";
    }
  };

  return (
    <div className={cn("trending-topics", variantClasses[variant], className)}>
      {variant === "detailed" && (
        <div className="flex items-center space-x-2 text-blue-200 mb-3">
          {showIcon && <TrendingUp className="h-4 w-4" />}
          <span className="text-sm font-medium uppercase tracking-wider">
            Trending Topics
          </span>
        </div>
      )}

      {displayTopics.map((topic) => (
        <Link
          key={topic.id}
          href={`/search?q=${encodeURIComponent(topic.query)}`}
          className={cn("group", topicClasses[variant])}
        >
          {variant === "detailed" ? (
            <>
              <div className="flex items-center space-x-2">
                {getTrendIcon(topic.trend)}
                <span className="font-medium">{topic.hashtag}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                {topic.count && (
                  <span
                    className={cn("font-medium", getTrendColor(topic.trend))}
                  >
                    {topic.count.toLocaleString()}
                  </span>
                )}
                <span className={cn("text-xs", getTrendColor(topic.trend))}>
                  {topic.trend === "up"
                    ? "↗"
                    : topic.trend === "down"
                    ? "↘"
                    : "→"}
                </span>
              </div>
            </>
          ) : (
            <>
              {getTrendIcon(topic.trend)}
              <span className="font-medium">{topic.hashtag}</span>
            </>
          )}
        </Link>
      ))}
    </div>
  );
}
