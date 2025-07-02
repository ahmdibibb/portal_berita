"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Heart, Bookmark, Share2 } from "lucide-react"

interface NewsInteractionsProps {
  newsId: string
}

export function NewsInteractions({ newsId }: NewsInteractionsProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likes, setLikes] = useState(156)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleLike = () => {
    if (!user) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login untuk menyukai berita",
        variant: "destructive",
      })
      return
    }

    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))

    toast({
      title: isLiked ? "Batal menyukai" : "Menyukai berita",
      description: isLiked ? "Berita dihapus dari favorit" : "Berita ditambahkan ke favorit",
    })
  }

  const handleSave = () => {
    if (!user) {
      toast({
        title: "Login diperlukan",
        description: "Silakan login untuk menyimpan berita",
        variant: "destructive",
      })
      return
    }

    setIsSaved(!isSaved)

    toast({
      title: isSaved ? "Batal menyimpan" : "Menyimpan berita",
      description: isSaved ? "Berita dihapus dari daftar simpan" : "Berita disimpan untuk dibaca nanti",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Portal Berita",
          text: "Baca berita menarik ini!",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link disalin",
        description: "Link berita telah disalin ke clipboard",
      })
    }
  }

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

      <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center space-x-2 bg-transparent">
        <Share2 className="h-4 w-4" />
        <span>Bagikan</span>
      </Button>
    </div>
  )
}
