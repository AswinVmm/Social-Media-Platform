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
        <nav className="bg-gray-800 border-b shadow-md sticky top-0 z-50 relative">
            <div className="max-w-full mx-auto px-4 py-3 flex justify-between items-center">

                <Link href="/" className="text-xl font-bold text-orange-500">
                    Social Media Platform
                </Link>

                <div className="flex gap-4 items-center">

                    {!user ? (
                        <>
                            <Link href="/signup">
                                <button className="btn-primary">Login/Sign Up</button>
                            </Link>
                        </>
                    ) : (
                        <>

                            <Link href="/communities" className="text-gray-700 hover:text-black">
                                <button className="btn-primary">Communities</button>
                            </Link>

                            <div className="flex gap-4">
                                <Link href="/create-community">
                                    <button className="btn-primary">Create Community</button>
                                </Link>

                                <Link href="/create-post">
                                    <button className="btn-primary"> + Post</button>
                                </Link>
                            </div>

                            {/* 👤 Profile */}
                            <div className="flex items-center gap-2">

                                <Link href="/profile" className="w-9 h-9 bg-green-500 text-white flex items-center justify-center rounded-full font-bold cursor-pointer hover:scale-105 transition">
                                    {user.username?.charAt(0).toUpperCase()}
                                </Link>

                                <span className="font-medium text-amber-50">{user.username}</span>
                            </div>

                            {/* 🚪 Logout */}
                            <button onClick={logout} className="btn-danger ml-8 text-shadow-blue-50 text-sm">
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}