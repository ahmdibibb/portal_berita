"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Comment {
  id: number
  user_name: string
  content: string
  news_title: string
  created_at: string
  status: 'pending' | 'approved' | 'rejected'
}

export function CommentsManagement() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/comments')
      if (!response.ok) throw new Error("Failed to fetch comments")
      const data = await response.json()
      setComments(data)
    } catch (error) {
      toast.error("Gagal memuat komentar")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: "DELETE",
      })
  
      if (!response.ok) throw new Error("Gagal menghapus komentar")
  
      toast.success("Komentar berhasil dihapus")
      fetchComments() // Refresh the list
    } catch (error) {
      toast.error("Gagal menghapus komentar")
    }
  }

  const handleUpdateStatus = async (commentId: number, newStatus: 'approved' | 'rejected') => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/comments/${commentId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Gagal mengupdate status komentar")

      toast.success(`Komentar berhasil di${newStatus === 'approved' ? 'setujui' : 'tolak'}`)
      fetchComments() // Refresh the list
    } catch (error) {
      toast.error("Gagal mengupdate status komentar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Kelola Komentar</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={fetchComments} disabled={loading}>
            Refresh
          </Button>
        </div>
      </div>

      {loading && comments.length === 0 ? (
        <p>Memuat komentar...</p>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`p-4 rounded-lg border ${
                comment.status === 'rejected' ? "bg-red-50 border-red-200" : 
                comment.status === 'pending' ? "bg-yellow-50 border-yellow-200" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{comment.user_name}</p>
                  <p className="text-sm text-gray-500">{comment.news_title}</p>
                  <p className="mt-2">{comment.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {comment.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateStatus(comment.id, 'approved')}
                        disabled={loading}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateStatus(comment.id, 'rejected')}
                        disabled={loading}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}