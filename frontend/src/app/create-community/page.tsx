"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CreateCommunity() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleCreate = async () => {
        try {
            if (!name.trim()) {
                setError("Community name required");
                return;
            }

            const slug = name
                .toLowerCase()
                .replace(/\s+/g, "-")   // spaces → dash
                .replace(/[^\w-]+/g, ""); // remove special chars

            await API.post("/community", { name, slug });

            router.push(`/com/${slug}`);
        } catch (err: any) {
            console.log("ERROR:", err.response);
            setError(err.response?.data?.message || "Failed to create community");
        }
    };

    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center mt-20 gap-4">

                <h1 className="text-2xl font-bold">Create Community</h1>

                {error && <p className="text-red-500">{error}</p>}

                <input
                    className="border p-2 rounded w-64"
                    placeholder="Community name (e.g. tech)"
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    onClick={handleCreate}
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                    Create
                </button>

            </div>
        </ProtectedRoute>
    );
}