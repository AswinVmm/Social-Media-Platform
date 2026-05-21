"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { getUser } from "@/lib/auth";
import PostCard from "@/components/PostCard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        const currentUser = getUser(); // ✅ now runs ONLY in browser
        setUser(currentUser);

        if (currentUser) {
            fetchUserData(currentUser);
        }
    }, []);

    const fetchUserData = async (user: any) => {
        try {
            const postRes = await API.get(`/post?authorId=${user.id}`);
            const commentRes = await API.get(`/comment?userId=${user.id}`);

            setPosts(postRes.data);
            setComments(commentRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ProtectedRoute>
            <div className="max-w-3xl mx-auto mt-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border">
                    <h1 className="text-2xl font-bold mb-4">
                        👤 {user?.username}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Your activity overview
                    </p>
                </div>

                <h2 className="text-lg font-semibold mt-6 mb-2">Posts</h2>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}

                <h2 className="text-lg font-semibold mt-6 mb-2">Comments</h2>
                {comments.map((c) => (
                    <div key={c.id} className="border p-2 rounded mb-2">
                        <p>{c.content}</p>
                    </div>
                ))}
            </div>
        </ProtectedRoute>
    );
}