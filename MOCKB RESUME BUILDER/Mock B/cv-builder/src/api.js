import axios from "axios";

const PRODUCTION_API = "https://mockb-cv-react.onrender.com/api";
const AUTH_TOKEN_KEY = "mockb_auth_token";

export function getAuthToken() {
    try {
        return localStorage.getItem(AUTH_TOKEN_KEY) || "";
    } catch {
        return "";
    }
}

export function setAuthToken(token) {
    try {
        if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
        else localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch {
        // ignore storage errors (private mode)
    }
}

function resolveApiBaseUrl() {
    if (!import.meta.env.DEV) {
        return PRODUCTION_API;
    }

    const raw = String(import.meta.env.VITE_API_URL ?? "").trim();
    let url = (raw || PRODUCTION_API).replace(/\/+$/, "");

    const isRelative = url.startsWith("/");
    const isFrontendHost = /vercel\.app|netlify\.app/i.test(url);

    if (isRelative || isFrontendHost) {
        return PRODUCTION_API;
    }

    if (/^https:\/\/mockb-cv-react\.onrender.com$/i.test(url)) {
        return PRODUCTION_API;
    }

    if (/onrender\.com$/i.test(url) && !url.endsWith("/api")) {
        return `${url}/api`;
    }

    return url;
}

const api = axios.create({
    baseURL: resolveApiBaseUrl(),
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.";
        return Promise.reject({ ...error, message });
    }
);

export default api;
