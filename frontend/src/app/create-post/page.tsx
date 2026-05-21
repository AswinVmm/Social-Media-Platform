"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreatePost() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [communityId, setCommunityId] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [communities, setCommunities] = useState([]);
    const [postType, setPostType] = useState("text");
    const [link, setLink] = useState("");

    useEffect(() => {
        API.get("/community").then((res) => {
            setCommunities(res.data);
        });
    }, []);

    useEffect(() => {
        setContent("");
        setImageUrl("");
        setLink("");
    }, [postType]);

    const handleCreate = async () => {
        try {
            await API.post("/post", {
                title,
                content,
                imageUrl,
                communityId,
                postType,
                link: postType === "link" ? link : null,
                pollOptions:
                    postType === "poll"
                        ? ["Option 1", "Option 2"] // later make dynamic
                        : null,
            });

            router.push("/");
        } catch (err: any) {
            console.log("FULL ERROR:", err);
            console.log("SERVER:", err.response?.data);
            setError(err.response?.data?.message || "Failed to create post");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md gap-4 mx-auto mt-10 flex flex-col">

            <h1 className="text-xl font-bold">Create Post</h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex gap-2 mt-2">
                <button onClick={() => setPostType("text")} className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                    Text
                </button>
                <button onClick={() => setPostType("image")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition">
                    Image
                </button>
                <button onClick={() => setPostType("link")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition">
                    Link
                </button>
                <button onClick={() => setPostType("poll")} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition">
                    Poll
                </button>
            </div>

            <input
                placeholder="Title"
                className="border p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                className="border p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setContent(e.target.value)}
            />

            {postType === "image" && (
                <input
                    placeholder="Image URL"
                    className="border p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            )}

            {postType === "link" && (
                <input
                    placeholder="Enter link"
                    className="border p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
            )}

            {postType === "poll" && (
                <div className="flex flex-col gap-2">
                    <input placeholder="Option 1" className="border p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <input placeholder="Option 2" className="border p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
            )}

            <select
                className="border p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => {
                    if (e.target.value === "new") {
                        router.push("/create-community");
                    } else if (e.target.value === "") {
                        setCommunityId(null);
                    } else {
                        setCommunityId(e.target.value);
                    }
                }}
            >
                <option value="">Select Community</option>

                {communities.map((c: any) => (
                    <option key={c.id} value={c.id}>
                        r/{c.name}
                    </option>
                ))}

                <option value="new">➕ Create New Community</option>
            </select>

            <button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                disabled={!title || !communityId}
            >
                Create Post
            </button>
        </div>
    );
}