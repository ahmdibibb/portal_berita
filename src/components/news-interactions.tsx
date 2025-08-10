"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Heart, Bookmark, Share2 } from "lucide-react";

interface NewsInteractionsProps {
  newsId: string;
}

export function NewsInteractions({ newsId }: NewsInteractionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(`/api/news/${newsId}`);
        if (!res.ok) return;
        const data = await res.json();
        setIsLiked(!!data?.userLiked);
        setIsSaved(!!data?.userSaved);
        setLikes(data?.likes ?? 0);
      } catch (e) {
        // ignore
      }
    };
    init();
  }, [newsId]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Login diperlukan");
      return;
    }

    try {
      const res = await fetch(`/api/news/${newsId}/like`, { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      const payload = await res.json();
      const willLike = !!payload?.liked;
      setIsLiked(willLike);
      setLikes((prev) => (willLike ? prev + 1 : Math.max(0, prev - 1)));
      toast.success(willLike ? "Menyukai berita" : "Batal menyukai");
    } catch (e) {
      toast.error("Gagal memproses like");
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("Login diperlukan");
      return;
    }

    try {
      const res = await fetch(`/api/news/${newsId}/save`, { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      const payload = await res.json();
      const willSave = !!payload?.saved;
      setIsSaved(willSave);
      toast.success(willSave ? "Menyimpan berita" : "Batal menyimpan");
    } catch (e) {
      toast.error("Gagal memproses simpan");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Portal Berita",
          text: "Baca berita menarik ini!",
          url: window.location.href,
        });
      } catch {
        // ignore
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link disalin");
    }
  };

  return (
    <div className="flex items-center space-x-4 py-6 border-y">
      <Button
        variant={isLiked ? "default" : "outline"}
        size="sm"
        onClick={handleLike}
        className="flex items-center space-x-2"
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        <span>{likes}</span>
      </Button>

      <Button
        variant={isSaved ? "default" : "outline"}
        size="sm"
        onClick={handleSave}
        className="flex items-center space-x-2"
      >
        <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
        <span>{isSaved ? "Tersimpan" : "Simpan"}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="flex items-center space-x-2 bg-transparent"
      >
        <Share2 className="h-4 w-4" />
        <span>Bagikan</span>
      </Button>
    </div>
  );
}
