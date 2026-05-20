"use client";

import { useState } from "react";
import API from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function VoteButtons({ postId, initialVotes }: any) {
    const [votes, setVotes] = useState(initialVotes || { upvotes: 0, downvotes: 0 });

    const vote = async (type: string) => {
        try {
            const res = await API.post(
                "/vote",
                { postId, type },
                {
                    headers: { Authorization: `Bearer ${getToken()}` },
                }
            );

            setVotes(res.data); // ✅ real-time update
        } catch (err) {
            console.log("Vote error", err);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
                <button onClick={() => vote("UP")}>⬆️</button>
                <span>{votes.upvotes}</span>
            </div>

            <div className="flex flex-col items-center">
                <button onClick={() => vote("DOWN")}>⬇️</button>
                <span>{votes.downvotes}</span>
            </div>
        </div>
    );
}