"use client";

import VoteButtons from "./VoteButtons";
import Link from "next/link";
import API from "@/lib/api";
import { getUser } from "@/lib/auth";

type UserPayload = {
    id?: string;
    role?: string;
};

export default function PostCard({ post, onDelete }: any) {

    const user = getUser() as UserPayload | null;
    const upvotes = post.votes.filter((v: any) => v.type === "UP").length;
    const downvotes = post.votes.filter((v: any) => v.type === "DOWN").length;
    const isAuthor = user?.id === post.authorId;
    const isAdmin = user?.role === "admin";
    const canDelete = isAuthor || isAdmin;
    const score =
        post.votes.filter((v: any) => v.type === "UP").length -
        post.votes.filter((v: any) => v.type === "DOWN").length;

    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        try {
            await API.delete(`/post/${post.id}`);
            onDelete(post.id);
        } catch (err) {
            console.log("Delete error", err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border mt-4 hover:shadow-md transition">

            <div className="flex justify-between items-start">

                <div>
                    {/* Community */}
                    <p className="text-sm text-gray-500">
                        r/{post.community?.name}
                    </p>

                    {/* Title */}
                    <h2 className="text-lg font-semibold mt-1">
                        <Link href={`/post/${post.id}`}>
                            {post.title}
                        </Link>
                    </h2>

                    {/* Content */}
                    <p className="text-gray-700 mt-2">
                        {post.content}
                    </p>
                </div>

                {/* ✅ SHOW ONLY IF AUTHOR */}
                {canDelete && (
                    <button
                        onClick={handleDelete}
                        className="text-red-500 text-sm"
                    >
                        Delete
                    </button>
                )}

            </div>

            {/* Actions */}
            <div className="mt-3">
                <VoteButtons postId={post.id} initialVotes={{ upvotes, downvotes }} />
            </div>

        </div>
    );
}