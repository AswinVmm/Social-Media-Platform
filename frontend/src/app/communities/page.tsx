"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import Link from "next/link";

export default function Communities() {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        API.get("/community").then((res) =>
            setCommunities(res.data)
        );
        // API.get(`/post?communityId=${communities.id}`);
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Communities</h1>

            <div className="flex flex-col gap-3">
                {communities.map((c: any) => (
                    <Link key={c.id} href={`/com/${c.slug}`}>
                        <div className="border p-3 rounded hover:bg-gray-100 cursor-pointer">
                            r/{c.slug}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}