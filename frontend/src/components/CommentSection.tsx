"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function CommentSection({ postId }: any) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const fetchComments = async () => {
        const res = await API.get(`/comment?postId=${postId}`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const addComment = async () => {
        await API.post(
            "/comment",
            { content: text, postId },
            {
                headers: { Authorization: getToken() },
            }
        );

        fetchComments();
    };

    return (
        <div>
            <input onChange={(e) => setText(e.target.value)} placeholder="Add comment" />
            <button onClick={addComment}>Post</button>

            {comments.map((c: any) => (
                <p key={c.id}>{c.content}</p>
            ))}
        </div>
    );
}