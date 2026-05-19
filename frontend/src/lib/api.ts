import axios from "axios";
import { getToken } from "./auth";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (token) {
        // config.headers.Authorization = token; // or `Bearer ${token}` (see below)
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default API;