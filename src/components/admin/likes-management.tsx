"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { toast } from "sonner"

interface NewsLike {
  id: number
  title: string
  likes: number
}

export function LikesManagement() {
  const [data, setData] = useState<NewsLike[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLikesData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/news/likes')
        if (!response.ok) throw new Error("Failed to fetch likes data")
        const result = await response.json()
        setData(result)
      } catch (error) {
        toast.error("Gagal memuat data likes")
      } finally {
        setLoading(false)
      }
    }

    fetchLikesData()
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Statistik Like Berita</h2>
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="likes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}