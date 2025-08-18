"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Clock, TrendingUp, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "recent" | "trending" | "suggestion";
  query: string;
}

interface AdvancedSearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  suggestions?: SearchSuggestion[];
  showHistory?: boolean;
  showTrending?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AdvancedSearchBar({
  placeholder = "Search quotes, news & videos...",
  className,
  onSearch,
  suggestions = [],
  showHistory = true,
  showTrending = true,
  size = "md",
}: AdvancedSearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-12 px-4 text-base",
    lg: "h-14 px-5 text-lg",
  };

  const iconSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Save search history to localStorage
  const saveToHistory = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const newHistory = [
      searchQuery,
      ...searchHistory.filter((h) => h !== searchQuery),
    ].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    saveToHistory(searchQuery);
    onSearch?.(searchQuery);
    setQuery("");
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    handleSearch(suggestion.query);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const filteredSuggestions = suggestions.filter((s) =>
    s.text.toLowerCase().includes(query.toLowerCase())
  );

  const displaySuggestions = query.trim() ? filteredSuggestions : [];

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search
            className={cn(
              "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400",
              iconSize[size]
            )}
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow clicks
              setTimeout(() => {
                setIsFocused(false);
                setShowSuggestions(false);
              }, 200);
            }}
            placeholder={placeholder}
            className={cn(
              "w-full bg-white border-2 border-gray-200 rounded-lg pl-12 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
              sizeClasses[size],
              isFocused && "border-blue-500 shadow-lg"
            )}
          />

          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 bg-blue-600 hover:bg-blue-700 text-white px-3 text-sm font-medium"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions &&
        (displaySuggestions.length > 0 || searchHistory.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            {/* Recent Searches */}
            {showHistory && searchHistory.length > 0 && !query.trim() && (
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <History className="h-4 w-4" />
                    <span className="font-medium">Recent Searches</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-500 hover:text-gray-700"
                    onClick={clearHistory}
                  >
                    Clear
                  </Button>
                </div>
                <div className="space-y-1">
                  {searchHistory.slice(0, 5).map((item, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center space-x-2"
                      onClick={() => handleSearch(item)}
                    >
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Suggestions */}
            {showTrending && suggestions.length > 0 && (
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Trending
                  </span>
                </div>
                <div className="space-y-1">
                  {suggestions.slice(0, 3).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center space-x-2"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <TrendingUp className="h-3 w-3 text-blue-400" />
                      <span>{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {displaySuggestions.length > 0 && (
              <div className="p-3">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Suggestions
                </div>
                <div className="space-y-1">
                  {displaySuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="w-full text-left px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center space-x-2"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Search className="h-3 w-3 text-gray-400" />
                      <span>{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
