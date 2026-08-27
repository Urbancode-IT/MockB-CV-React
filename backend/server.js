require("dotenv").config();
require("./config/env");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

const limiter = require("./middleware/rateLimiter");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const logger = require("./utils/logger");
const compression = require("compression");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");






connectDB();

const app = express();

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));

const stripTrailingSlash = (url) => (url ? url.trim().replace(/\/+$/, "") : "");

const allowedOrigins = new Set(
    [
        process.env.CLIENT_URL,
        process.env.CLIENT_URLS,
        process.env.CORS_ORIGINS,
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "https://mock-b-cv-react.vercel.app",
        "https://mockbcv.netlify.app",
        "https://www.mockbcv.netlify.app",
    ]
        .filter(Boolean)
        .flatMap((value) => String(value).split(","))
        .map(stripTrailingSlash)
        .filter(Boolean)
);

const isAllowedOrigin = (origin) => {
    const normalized = stripTrailingSlash(origin);
    if (allowedOrigins.has(normalized)) return true;
    try {
        const { protocol, hostname } = new URL(normalized);
        if (protocol !== "https:") return false;
        if (hostname.endsWith(".vercel.app") && hostname.includes("mock-b-cv-react")) return true;
        if (hostname.endsWith(".netlify.app") && hostname.includes("mockbcv")) return true;
        return false;
    } catch {
        return false;
    }
};

const corsOptions = {
    origin(origin, callback) {
        if (!origin || isAllowedOrigin(origin)) {
            return callback(null, true);
        }
        // Do not throw — a thrown CORS error returns 500 without ACAO headers.
        return callback(null, false);
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use(limiter);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/resumes", require("./routes/resumes"));
app.use("/api/coverLetters", require("./routes/coverLetters"));
app.use("/api/portfolios", require("./routes/portfolios"));
app.use("/api/templates", require("./routes/templates"));
app.use("/api/ai", require("./routes/ai"));

//swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(compression());
app.use(hpp());
app.use(mongoSanitize());
app.use(xss());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

// Error handling
app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        logger.error(`Port ${PORT} is already in use`);
        process.exit(1);
    }
    throw err;
});
