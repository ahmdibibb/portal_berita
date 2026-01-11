"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    const progressEl = document.getElementById("route-progress");
    if (!progressEl) return;

    progressEl.classList.remove("hidden");
    progressEl.style.transform = "scaleX(0.2)";

    let raf: number | null = null;
    let progress = 0.2;

    const tick = () => {
      progress = Math.min(0.98, progress + 0.02);
      progressEl.style.transform = `scaleX(${progress})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      progressEl.style.transform = "scaleX(1)";
      setTimeout(() => {
        progressEl.classList.add("hidden");
        progressEl.style.transform = "scaleX(0)";
      }, 250);
    };
  }, [pathname]);

  return null;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const userData = await response.json();
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
