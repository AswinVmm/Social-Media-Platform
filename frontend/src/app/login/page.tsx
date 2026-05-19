"use client";

import { useState } from "react";
import API from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
// import error from "next/dist/api/error";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", { email, password });

            setToken(res.data.token);
            router.push("/");
        } catch (err: any) {
            const message = err.response?.data?.message;

            if (message === "User not found") {
                setError("User not found. Redirecting to signup...");
                setTimeout(() => router.push("/signup"), 2000);
            } else if (message === "Invalid password") {
                setError("Wrong password. Try again.");
            } else {
                setError("Login failed");
            }
        }
    };

    return (
        <div className="flex flex-col items-center mt-20 gap-4">
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
            <input
                className="border p-2 rounded w-64"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input className="border p-2 rounded w-64" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2">
                Login
            </button>
        </div>
    );
}