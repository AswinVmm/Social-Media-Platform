"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import PostCard from "@/components/PostCard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetchPosts();
  }, [sort]);

  const fetchPosts = async () => {
    const res = await API.get(`/post?sort=${sort}`);
    setPosts(res.data);
  };

  const handleDeletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-4">

        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">

          <h1 className="text-2xl font-bold">
            {sort === "latest" ? "🆕 Latest Posts" : "🔥 Trending"}
          </h1>
          <select
            value={sort}
            className="border px-3 py-2 rounded-lg bg-gray-50"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        {/* Posts */}
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
        ))}
      </div>
    </ProtectedRoute>
  );
}