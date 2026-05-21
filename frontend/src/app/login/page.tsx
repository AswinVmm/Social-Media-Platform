"use client";

import { useState } from "react";
import API from "@/lib/api";
import { setToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

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
        <div className="min-h-fit flex items-center justify-center bg-gray-100">
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
            <div className="bg-white p-8 rounded-2xl shadow-md w-80 flex flex-col gap-4">
                <h1 className="text-xl font-bold text-center">Login</h1>
                <input
                    className="border p-2 rounded-lg"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input className="border p-2 rounded-lg" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handleLogin} className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                    Login
                </button>
            </div>
        </div>
    );
}