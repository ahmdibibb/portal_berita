"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, LogOut, X, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

const TimeZoneDisplay = ({ timezone }: { timezone: string }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("id-ID", options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const getZoneName = () => {
    if (timezone === "Asia/Jakarta") return "WIB";
    if (timezone === "Asia/Makassar") return "WITA";
    if (timezone === "Asia/Jayapura") return "WIT";
    return "";
  };

  return (
    <div className="flex items-center space-x-1">
      <Clock className="h-3 w-3 text-gray-400" />
      <span className="text-xs font-medium">
        {time} {getZoneName()}
      </span>
    </div>
  );
};

const DateDisplay = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      };
      const formatter = new Intl.DateTimeFormat("id-ID", options);
      setDate(formatter.format(new Date()));
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return <div className="text-xs text-gray-500 whitespace-nowrap">{date}</div>;
};

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-[120px] h-[40px] relative mr-4">
                <Image
                  src="/Logo.svg"
                  alt="Portal Berita"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center flex-1">
            {/* Date and Time Section */}
            <div className="flex flex-col mr-8">
              <DateDisplay />
              <div className="flex space-x-4 mt-1">
                <TimeZoneDisplay timezone="Asia/Jakarta" />
                <TimeZoneDisplay timezone="Asia/Makassar" />
                <TimeZoneDisplay timezone="Asia/Jayapura" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Cari berita"
                  className="w-full pr-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                {/* ... (dropdown menu tetap sama) */}
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/login">Masuk</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/auth/register">Daftar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t bg-gray-50">
            <div className="relative mb-3">
              <Input
                type="search"
                placeholder="Cari berita, topik, atau penulis..."
                className="w-full pr-10"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            <div className="flex flex-col">
              <DateDisplay />
              <div className="flex justify-between mt-2">
                <TimeZoneDisplay timezone="Asia/Jakarta" />
                <TimeZoneDisplay timezone="Asia/Makassar" />
                <TimeZoneDisplay timezone="Asia/Jayapura" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
