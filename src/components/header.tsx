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
import { cn } from "@/lib/utils";

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
    <div className="flex items-center space-x-1.5 px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md">
      <Clock className="h-3.5 w-3.5 text-blue-600" />
      <span className="text-xs font-medium text-blue-800">
        {time} <span className="font-bold">{getZoneName()}</span>
      </span>
    </div>
  );
};

const DateDisplay = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
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

  return (
    <div className="text-sm font-medium text-gray-700 whitespace-nowrap">
      {date}
    </div>
  );
};

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="w-[130px] h-[45px] relative mr-4 transition-all duration-300 group-hover:scale-105">
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
              <div className="flex space-x-2 mt-1">
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
                  placeholder="Cari berita..."
                  className="w-full pr-10 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-blue-50"
                >
                  <Search className="h-4 w-4 text-blue-600" />
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
              className="md:hidden text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1.5 hover:bg-blue-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">
                      {user.name.split(" ")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                >
                  <Link href="/auth/login">Masuk</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm"
                >
                  <Link href="/auth/register">Daftar</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="relative mb-3">
              <Input
                type="search"
                placeholder="Cari berita, topik, atau penulis..."
                className="w-full pr-10 border-gray-300 focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-blue-50"
              >
                <Search className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
            <div className="flex flex-col space-y-2">
              <DateDisplay />
              <div className="flex justify-between space-x-2">
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