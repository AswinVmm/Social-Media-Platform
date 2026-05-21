"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function CommentSection({ postId }: any) {
    const [comments, setComments] = useState<any[]>([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        const res = await API.get(`/comment?postId=${postId}`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const addComment = async () => {
        if (!text.trim()) return;

        try {
            setLoading(true);

            await API.post("/comment", {
                content: text,
                postId,
            });

            setText("");
            fetchComments(); // refresh instantly
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 bg-gray-50 border-t pt-3 rounded-xl">

            {/* Add Comment */}
            <div className="flex gap-2 mb-3">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment..."
                    className="border px-3 py-2 w-full rounded-lg bg-white"
                />
                <button
                    onClick={addComment}
                    disabled={loading}
                    className="bg-green-500 text-white px-3 rounded-3xl hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Post
                </button>
            </div>

            {/* Comments List */}
            <div className="flex flex-col gap-2">
                {comments.map((c) => (
                    <div key={c.id} className="bg-gray-100 p-3 shadow-sm rounded-lg">
                        <p className="text-sm font-semibold">
                            {c.author?.username || "User"}
                        </p>
                        <p className="text-sm">{c.content}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}