"use client";

import { useState } from "react";
import API from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function VoteButtons({ postId, initialScore }: any) {
    const [score, setScore] = useState(initialScore || 0);

    const vote = async (type: string) => {
        try {
            const res = await API.post(
                "/vote",
                { postId, type },
                {
                    headers: { Authorization: getToken() },
                }
            );

            setScore(res.data.score); // ✅ real-time update
        } catch (err) {
            console.log("Vote error", err);
        }
    };

    return (
        <div className="flex items-center gap-3">
            <button onClick={() => vote("UP")} className="btn-secondary">
                ⬆️
            </button>

            {/* ✅ LIVE SCORE */}
            <span className="font-semibold">{score}</span>

            <button onClick={() => vote("DOWN")} className="btn-secondary">
                ⬇️
            </button>
        </div>
    );
}