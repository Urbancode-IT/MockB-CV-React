const requiredDefaults = {
    PORT: "5000",
    JWT_SECRET: "dev-only-change-this-jwt-secret",
    MONGO_URI: "mongodb://127.0.0.1:27017/mockb_cv",
};

Object.entries(requiredDefaults).forEach(([key, value]) => {
    if (!process.env[key]) {
        process.env[key] = value;
    }
});

const { cleanEnv, str, port } = require("envalid");

module.exports = cleanEnv(process.env, {
    PORT: port(),
    JWT_SECRET: str(),
    MONGO_URI: str(),
    GEMINI_API_KEY: str({ default: "" }),
    CLIENT_URL: str({ default: "http://localhost:5173" }),
});
