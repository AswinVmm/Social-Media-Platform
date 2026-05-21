"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            await API.post("/auth/signup", form);
            router.push("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            {error && (
                <p className="text-red-500 text-sm absolute top-10">
                    {error}
                </p>
            )}

            <div className="bg-white p-8 rounded-2xl shadow-md w-80 flex flex-col gap-4">

                <h1 className="text-xl font-bold text-center">
                    Sign Up
                </h1>

                <input
                    className="border p-2 rounded-lg"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <input
                    className="border p-2 rounded-lg"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                    }
                />

                <input
                    className="border p-2 rounded-lg"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                    Sign Up
                </button>

                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}