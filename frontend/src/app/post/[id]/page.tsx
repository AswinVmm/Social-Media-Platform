"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPost = async () => {
            const res = await API.get(`/post/${id}`);
            setPost(res.data);
        };

        fetchPost();
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10">

            <button
                onClick={() => router.back()}
                className="mb-4 btn-primary text-sm text-gray-900"
            >
                ← Back
            </button>

            <p className="text-sm text-gray-500">
                r/{post.community?.name}
            </p>

            <h1 className="text-2xl font-bold mt-2">
                {post.title}
            </h1>

            {/* IMAGE */}
            {post.postType === "image" && post.imageUrl && (
                <img src={post.imageUrl} className="mt-4 rounded" />
            )}

            {/* LINK */}
            {post.postType === "link" && post.link && (
                <a
                    href={post.link}
                    target="_blank"
                    className="text-blue-500 underline mt-4 block truncate max-w-full"
                >
                    🔗{post.link}
                </a>
            )}

            {/* POLL */}
            {post.postType === "poll" && post.pollOptions && (
                <div className="mt-4">
                    {post.pollOptions.map((opt: string, i: number) => (
                        <button
                            key={i}
                            className="block w-full border p-2 mt-2 rounded hover:bg-gray-100"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
            <p className="mt-4">{post.content}</p>

        </div>
    );
}