"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutUser, getUser } from "@/lib/auth";

export default function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const updateAuth = () => {
            const currentUser = getUser();
            setUser(currentUser);
        };

        updateAuth();

        window.addEventListener("authChanged", updateAuth);

        return () => {
            window.removeEventListener("authChanged", updateAuth);
        };
    }, []);

    const logout = () => {
        logoutUser();
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-full mx-auto px-4 py-3 flex justify-between items-center">

                <Link href="/" className="text-xl font-bold text-orange-500">
                    Social Media Platform
                </Link>

                <div className="flex gap-3 items-center">

                    {!user ? (
                        <>
                            <Link href="/login">
                                <button className="btn-secondary">Login</button>
                            </Link>

                            <Link href="/signup">
                                <button className="btn-primary">Sign Up</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/">
                                <button className="btn-secondary">Home</button>
                            </Link>

                            <Link href="/communities">
                                <button className="btn-secondary">Communities</button>
                            </Link>

                            <div className="flex gap-2">
                                <Link href="/create-community">
                                    <button className="btn-primary">Create Community</button>
                                </Link>

                                <Link href="/create-post">
                                    <button className="btn-primary">Create Post</button>
                                </Link>
                            </div>

                            {/* 👤 Profile */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-orange-500 text-white flex items-center justify-center rounded-full">
                                    {user.username?.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium">{user.username}</span>
                            </div>

                            {/* 🚪 Logout */}
                            <button onClick={logout} className="btn-danger ml-8">
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}