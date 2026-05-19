"use client";

import API from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function VoteButtons({ postId }: any) {
    const vote = async (type: string) => {
        await API.post(
            "/vote",
            { postId, type },
            {
                headers: { Authorization: getToken() },
            }
        );
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => vote("UP")}
                className="btn-secondary text-sm"
            >
                ⬆️
            </button>

            <button
                onClick={() => vote("DOWN")}
                className="btn-secondary text-sm"
            >
                ⬇️
            </button>
        </div>
    );
}