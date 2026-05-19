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

    const handleSubmit = async () => {
        try {
            await API.post("/auth/signup", form);
            router.push("/login");
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex flex-col items-center mt-20 gap-4">
            <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">
                Sign Up
            </button>
        </div>
    );
}