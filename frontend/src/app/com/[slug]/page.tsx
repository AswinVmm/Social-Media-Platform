"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import PostCard from "@/components/PostCard";

export default function CommunityPage() {
    const { slug } = useParams();

    const [community, setCommunity] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]);

    const handleDeletePost = (id: string) => {
        setPosts(prev => prev.filter(p => p.id !== id));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ get community by slug
                const comRes = await API.get(`/community/${slug}`);
                setCommunity(comRes.data);

                // ✅ NOW fetch posts using communityId
                const postRes = await API.get(
                    `/post?communityId=${comRes.data.id}`
                );

                setPosts(postRes.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [slug]);

    if (!community) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10">

            <h1 className="text-2xl font-bold mb-4">
                r/{community.name}
            </h1>

            {posts.map((post: any) => (
                <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
            ))}

        </div>
    );
}