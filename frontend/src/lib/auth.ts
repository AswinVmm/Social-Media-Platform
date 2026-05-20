import { jwtDecode } from "jwt-decode";
import { UserPayload } from "./types";

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("authChanged"));
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const logoutUser = () => {
    localStorage.removeItem("token");

    // 🔥 notify navbar
    window.dispatchEvent(new Event("authChanged"));
};

export const getUser = (): UserPayload | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return jwtDecode<UserPayload>(token); // { id, username }
    } catch {
        return null;
    }
};