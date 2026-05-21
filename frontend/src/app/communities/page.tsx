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
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Communities</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communities.map((c: any) => (
                    <Link key={c.id} href={`/com/${c.slug}`}>
                        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
                            <h2 className="font-semibold text-lg">r/{c.slug}</h2>
                            <p className="text-gray-500 text-sm">Community</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}