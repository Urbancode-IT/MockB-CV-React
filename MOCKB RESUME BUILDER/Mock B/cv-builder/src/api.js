import axios from "axios";

const PRODUCTION_API = "https://mockb-cv-react.onrender.com/api";

function resolveApiBaseUrl() {
    const raw = String(import.meta.env.VITE_API_URL ?? "").trim();
    let url = (raw || PRODUCTION_API).replace(/\/+$/, "");

    const isRelative = url.startsWith("/");
    const isVercel = /vercel\.app/i.test(url);
    const isLoopback = /localhost|127\.0\.0\.1/i.test(url);

    // Never call the Vercel SPA (POST /auth/login returns 405 there).
    if (isRelative || isVercel || (!import.meta.env.DEV && isLoopback)) {
        return PRODUCTION_API;
    }

    if (/^https:\/\/mockb-cv-react\.onrender\.com$/i.test(url)) {
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
