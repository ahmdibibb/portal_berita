"use client";

import { AdminDashboard } from "@/components/admin/admin-dashboard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Users,
  MessageSquare,
  Heart,
  Tag,
  Plus,
  BarChart3,
  Settings,
  Globe,
  Search,
  Eye,
  Clock,
  TrendingUp,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Admin Dashboard Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">
            Selamat datang di panel administrasi Portal Berita
          </p>
        </div>

        {/* Admin Dashboard Component */}
        <AdminDashboard />
      </div>
    </div>
  );
}
