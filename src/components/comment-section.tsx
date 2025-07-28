"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import { MessageCircle, Send } from "lucide-react"
import type { Comment } from "@/lib/mock-data"

interface CommentSectionProps {
  newsId: string
}

export function CommentSection({ newsId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchComments()
  }, [newsId])

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${newsId}`)
      if (response.ok) {
        const commentsData = await response.json()
        setComments(commentsData)
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("Login diperlukan")
      return
    }

    if (!newComment.trim()) return

    setSubmitting(true)

    try {
      const response = await fetch(`/api/comments/${newsId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      })

      if (response.ok) {
        const comment = await response.json()
        setComments((prev) => [...prev, comment])
        setNewComment("")
        toast.success("Komentar berhasil ditambahkan")
      }
    } catch (error) {
      toast.error("Gagal menambahkan komentar")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Komentar ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Tulis komentar Anda..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <Button type="submit" disabled={submitting || !newComment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {submitting ? "Mengirim..." : "Kirim Komentar"}
            </Button>
          </form>
        ) : (
          <div className="text-center py-4 text-muted-foreground">Silakan login untuk memberikan komentar</div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {loading ? (
            <div>Loading comments...</div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-muted pl-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              Belum ada komentar. Jadilah yang pertama berkomentar!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
