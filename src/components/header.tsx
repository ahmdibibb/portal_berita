"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import {
  User,
  LogOut,
  X,
  Search,
  Calendar,
  Clock,
  Bell,
  Menu,
  Globe,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

const RealTimeClock = ({
  timezone,
  label,
}: {
  timezone: string;
  label: string;
}) => {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: timezone,
        };
        const formatter = new Intl.DateTimeFormat("id-ID", options);
        setTime(formatter.format(now));
      } catch (error) {
        setTime("--:--:--");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-1.5 px-2 py-1 bg-blue-900/20 rounded-md">
        <Clock className="h-3.5 w-3.5 text-blue-300" />
        <span className="text-xs font-medium text-blue-200">
          --:--:-- {label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1.5 px-2 py-1 bg-blue-900/20 rounded-md">
      <Clock className="h-3.5 w-3.5 text-blue-300" />
      <span className="text-xs font-medium text-blue-200">
        {time} {label}
      </span>
    </div>
  );
};

const RealTimeDate = () => {
  const [date, setDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateDate = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Jakarta",
        };
        const formatter = new Intl.DateTimeFormat("id-ID", options);
        setDate(formatter.format(now));
      } catch (error) {
        setDate("Loading...");
      }
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update setiap menit
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="text-sm font-medium text-blue-200 whitespace-nowrap">
        Loading...
      </div>
    );
  }

  return (
    <div className="text-sm font-medium text-blue-200 whitespace-nowrap">
      {date}
    </div>
  );
};

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg border-b border-blue-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center flex-shrink-0">
              <div className="w-[130px] h-[45px] relative mr-4">
                <div className="w-full h-full bg-blue-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              {/* Date and Time Section */}
              <div className="flex flex-col mr-8">
                <div className="text-sm font-medium text-blue-300">
                  Loading...
                </div>
                <div className="flex space-x-2 mt-1">
                  <div className="flex items-center space-x-1.5 px-2 py-1 bg-blue-900/20 rounded-md">
                    <Clock className="h-3.5 w-3.5 text-blue-300" />
                    <span className="text-xs font-medium text-blue-200">
                      --:--:-- WIB
                    </span>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-xl">
                <div className="w-full h-12 bg-blue-700 rounded animate-pulse"></div>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-20 h-8 bg-blue-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg border-b border-blue-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
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
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            {/* Date and Time Section */}
            <div className="flex flex-col mr-8">
              <RealTimeDate />
              <div className="flex space-x-2 mt-1">
                <RealTimeClock timezone="Asia/Jakarta" label="WIB" />
                <RealTimeClock timezone="Asia/Makassar" label="WITA" />
                <RealTimeClock timezone="Asia/Jayapura" label="WIT" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-xl">
              <div className="relative">
                <SearchBar placeholder="Cari berita, topik, atau penulis..." />
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-blue-200 hover:text-white hover:bg-blue-700/50"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={isSearchOpen ? "Tutup pencarian" : "Buka pencarian"}
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
                    className="flex items-center space-x-1.5 text-blue-200 hover:text-white hover:bg-blue-700/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-200" />
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
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
                  variant="ghost"
                  size="sm"
                  className="text-blue-200 hover:text-white hover:bg-blue-700/50 px-3 py-2"
                >
                  <Link href="/auth/login">SIGN IN</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-white text-blue-900 hover:bg-gray-100 shadow-sm px-4 py-2 font-medium"
                >
                  <Link href="/auth/register">CREATE FREE ACCOUNT</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-blue-700 bg-blue-800/50">
            <div className="mb-3">
              <SearchBar placeholder="Cari berita, topik, atau penulis..." />
            </div>
            {/* Mobile Date and Time Display */}
            <div className="flex flex-col space-y-2">
              <RealTimeDate />
              <div className="flex justify-between space-x-2">
                <RealTimeClock timezone="Asia/Jakarta" label="WIB" />
                <RealTimeClock timezone="Asia/Makassar" label="WITA" />
                <RealTimeClock timezone="Asia/Jayapura" label="WIT" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
