# MockB CV Builder — Backend

> RESTful API server powering the MockB Resume / CV / Cover Letter / Portfolio builder.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure & File Purposes](#folder-structure--file-purposes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [How Data Is Stored](#how-data-is-stored)
- [Authentication Flow](#authentication-flow)
- [Seeding the Database](#seeding-the-database)
- [Road to Production — What's Needed to Ship](#road-to-production--whats-needed-to-ship)
- [License](#license)

---

## Architecture Overview

```
┌─────────────┐        HTTP/JSON         ┌───────────────────────┐
│  React App  │  ◄──────────────────►    │   Express.js Server   │
│  (Frontend) │                          │   (this backend)      │
└─────────────┘                          └──────────┬────────────┘
                                                    │
                                           ┌────────▼────────┐
                                           │   data.json     │
                                           │  (flat-file DB) │
                                           └─────────────────┘
```

The backend is a lightweight **Express.js** REST API.  
It stores all data in a single `data.json` file (no external database required for development).

---

## Tech Stack

| Technology    | Version | Purpose                                             |
|---------------|---------|-----------------------------------------------------|
| **Node.js**   | ≥ 18    | Runtime                                             |
| **Express**   | 4.x     | HTTP framework & routing                            |
| **bcryptjs**  | 3.x     | Password hashing (registration & login)             |
| **jsonwebtoken** | 9.x  | JWT token generation & verification                 |
| **uuid**      | 14.x   | Generating unique IDs for records                   |
| **cors**      | 2.x     | Cross-Origin Resource Sharing                       |
| **dotenv**    | 16.x   | Load environment variables from `.env`              |
| **nodemon**   | 2.x     | Auto-restart during development (dev dependency)    |

---

## Folder Structure & File Purposes

```
backend/
├── .env.example          # Template for environment variables
├── data.json             # Flat-file JSON database (auto-created)
├── package.json          # Dependencies & npm scripts
├── server.js             # Entry point — Express app bootstrap
│
├── config/
│   └── jsonDB.js         # JSON file DB engine (read / write / init)
│
├── middleware/
│   └── authMiddleware.js # JWT verification middleware (protects private routes)
│
├── models/               # Data access layer (CRUD classes operating on data.json)
│   ├── User.js           # User lookup, creation, update
│   ├── Resume.js         # Resume CRUD scoped to a user
│   ├── CoverLetter.js    # Cover Letter CRUD scoped to a user
│   ├── Portfolio.js       # Portfolio CRUD scoped to a user
│   └── Template.js       # Resume template management (public)
│
├── routes/               # Express route handlers
│   ├── auth.js           # POST /register, POST /login, GET /user
│   ├── resumes.js        # CRUD for resumes (private)
│   ├── coverLetters.js   # CRUD for cover letters (private)
│   ├── portfolios.js     # CRUD for portfolios (private)
│   ├── templates.js      # List / get / create templates (public)
│   └── ai.js             # Mock AI endpoints (resume gen, ATS check, cover letter gen)
│
└── seed/
    ├── seed.js           # Script to insert a sample template into data.json
    └── template.html     # HTML for the "Modern Resume" template
```

### What Each File Does

| File | Purpose |
|------|---------|
| **server.js** | Creates the Express app, registers middleware (CORS, JSON body parser), mounts all route modules, and starts listening on the configured port. |
| **config/jsonDB.js** | Provides `initDB()`, `readDB()`, and `writeDB()` functions. All models use this to read from and write to `data.json`. Think of it as a micro-ORM for a flat JSON file. |
| **middleware/authMiddleware.js** | Extracts the `Bearer` token from the `Authorization` header, verifies it with `jsonwebtoken`, and attaches the decoded user to `req.user`. Any route using this middleware becomes private. |
| **models/User.js** | Static class with `findAll`, `findById`, `findByEmail`, `create`, and `update` methods. Passwords are stored as bcrypt hashes. |
| **models/Resume.js** | CRUD for resumes. All queries are scoped by `userId` so users can only access their own resumes. |
| **models/CoverLetter.js** | Same pattern as Resume, but for cover letters. |
| **models/Portfolio.js** | Same pattern as Resume, but for portfolios. |
| **models/Template.js** | CRUD for HTML resume templates. Templates are global (no user scoping) and can be listed publicly. |
| **routes/auth.js** | Handles user registration (hashes password, creates user, returns JWT), login (validates credentials, returns JWT), and fetching the current user profile. |
| **routes/resumes.js** | Full CRUD endpoints for resumes. All routes are protected by `authMiddleware`. |
| **routes/coverLetters.js** | Full CRUD endpoints for cover letters. All routes are protected by `authMiddleware`. |
| **routes/portfolios.js** | Full CRUD endpoints for portfolios. All routes are protected by `authMiddleware`. |
| **routes/templates.js** | Public endpoints for listing templates, fetching a template by ID (JSON or raw HTML), and creating new templates. |
| **routes/ai.js** | Mock AI endpoints: generate a tailored resume, check an ATS compatibility score, and generate a cover letter. Currently returns hardcoded/random data as placeholders. |
| **seed/seed.js** | CLI script (`npm run seed`) that reads `template.html` and inserts it as a "Modern Resume" template into `data.json`. |
| **seed/template.html** | A clean, ATS-friendly HTML resume template used by the seeder. |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** (comes with Node.js)

### Installation

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# (On Windows: copy .env.example .env)

# 4. Seed the database with a sample template
npm run seed

# 5. Start the development server (auto-restart on save)
npm run dev
```

The server will start at **http://localhost:5000**.

---

## Environment Variables

Create a `.env` file in the `backend/` folder (see `.env.example`):

| Variable      | Default                         | Description                          |
|---------------|---------------------------------|--------------------------------------|
| `PORT`        | `5000`                          | Port the Express server listens on   |
| `JWT_SECRET`  | `super_secret_temporary_key_123`| Secret key for signing JWT tokens    |

> ⚠️ **IMPORTANT:** Change `JWT_SECRET` to a strong, random value before deploying.

---

## API Reference

### Authentication

| Method | Endpoint            | Auth | Description                    | Request Body                         |
|--------|---------------------|------|--------------------------------|--------------------------------------|
| POST   | `/api/auth/register`| ✗    | Register a new user            | `{ name, email, password }`          |
| POST   | `/api/auth/login`   | ✗    | Log in and receive JWT         | `{ email, password }`                |
| GET    | `/api/auth/user`    | ✓    | Get current user profile       | —                                    |

### Resumes

| Method | Endpoint            | Auth | Description                    |
|--------|---------------------|------|--------------------------------|
| GET    | `/api/resumes`      | ✓    | List all resumes for the user  |
| GET    | `/api/resumes/:id`  | ✓    | Get a specific resume          |
| POST   | `/api/resumes`      | ✓    | Create a new resume            |
| PUT    | `/api/resumes/:id`  | ✓    | Update a resume                |
| DELETE | `/api/resumes/:id`  | ✓    | Delete a resume                |

### Cover Letters

| Method | Endpoint                  | Auth | Description                        |
|--------|---------------------------|------|------------------------------------|
| GET    | `/api/cover-letters`      | ✓    | List all cover letters for user    |
| GET    | `/api/cover-letters/:id`  | ✓    | Get a specific cover letter        |
| POST   | `/api/cover-letters`      | ✓    | Create a new cover letter          |
| PUT    | `/api/cover-letters/:id`  | ✓    | Update a cover letter              |
| DELETE | `/api/cover-letters/:id`  | ✓    | Delete a cover letter              |

### Portfolios

| Method | Endpoint                | Auth | Description                       |
|--------|-------------------------|------|-----------------------------------|
| GET    | `/api/portfolios`       | ✓    | List all portfolios for user      |
| GET    | `/api/portfolios/:id`   | ✓    | Get a specific portfolio          |
| POST   | `/api/portfolios`       | ✓    | Create a new portfolio            |
| PUT    | `/api/portfolios/:id`   | ✓    | Update a portfolio                |
| DELETE | `/api/portfolios/:id`   | ✓    | Delete a portfolio                |

### Templates (Public)

| Method | Endpoint                    | Auth | Description                         |
|--------|-----------------------------|------|-------------------------------------|
| GET    | `/api/templates`            | ✗    | List all templates (without HTML)   |
| GET    | `/api/templates/:id`        | ✗    | Get full template (with HTML)       |
| GET    | `/api/templates/:id/html`   | ✗    | Get raw HTML of a template          |
| POST   | `/api/templates`            | ✗    | Create a new template               |

### AI (Mock Endpoints)

| Method | Endpoint                         | Auth | Description                          |
|--------|----------------------------------|------|--------------------------------------|
| POST   | `/api/ai/generate-resume`        | ✓    | Generate a tailored resume (mock)    |
| POST   | `/api/ai/check-ats`              | ✓    | Check ATS compatibility score (mock) |
| POST   | `/api/ai/generate-cover-letter`  | ✓    | Generate a cover letter (mock)       |

> **Auth ✓** = Include header: `Authorization: Bearer <token>`

---

## How Data Is Stored

All application data lives in a single **`data.json`** file at the project root:

```json
{
  "users": [...],
  "resumes": [...],
  "coverLetters": [...],
  "portfolios": [...],
  "templates": [...]
}
```

- The `config/jsonDB.js` module provides synchronized `readDB()` / `writeDB()` helpers.
- Each model class (e.g., `Resume.js`) reads the full JSON, filters/mutates the relevant array, and writes it back.
- Records are identified by **UUID v4** IDs (generated by the `uuid` package).

> This approach is perfect for development and demos. For production, migrate to a real database (see below).

---

## Authentication Flow

```
1. User registers → POST /api/auth/register
   └── Password hashed with bcrypt (10 salt rounds)
   └── JWT token returned (valid for 5 days)

2. User logs in → POST /api/auth/login
   └── Password compared against stored hash
   └── JWT token returned

3. Authenticated requests
   └── Client sends: Authorization: Bearer <token>
   └── authMiddleware verifies token, attaches user to request
   └── Route handler accesses req.user.id
```

---

## Seeding the Database

```bash
npm run seed
```

This reads `seed/template.html` and inserts (or updates) a **"Modern Resume"** template into `data.json`. You can run it multiple times safely — it will update the existing template if one already exists.

---

## Road to Production — What's Needed to Ship

Below is a prioritized roadmap of what you'd need to take MockB from a development prototype to a market-ready product.

### 🔴 Critical (Must-Have Before Launch)

| Area | What to Do | Why |
|------|-----------|-----|
| **Database** | Migrate from `data.json` to **MongoDB Atlas** or **PostgreSQL** (Supabase, Neon, PlanetScale). The Mongoose models in `config/db.js` were originally started for this — you can build on that pattern. | JSON files don't scale, have no concurrency control, and lose data on crashes. |
| **JWT Secret** | Set a strong, randomly generated `JWT_SECRET` via environment variable. Never commit it to source code. | The hardcoded fallback is a major security vulnerability. |
| **Input Validation** | Add **express-validator** or **Joi/Zod** schemas to all route handlers. Validate email format, password strength, required fields, max lengths. | Prevents injection, bad data, and unexpected crashes. |
| **Error Handling** | Add a global Express error handler (`app.use((err, req, res, next) => {...})`). Stop leaking stack traces in production. | Prevents information disclosure and unhandled crashes. |
| **Rate Limiting** | Add **express-rate-limit** on auth routes (and optionally all routes). | Prevents brute-force attacks and abuse. |
| **HTTPS** | Deploy behind a reverse proxy (Nginx, Caddy) or a platform that provides TLS (Vercel, Render, Railway). | Tokens sent over plain HTTP can be intercepted. |
| **CORS Config** | Replace `cors()` (allows all origins) with a whitelist of allowed frontend domains. | Prevents unauthorized sites from calling your API. |

### 🟡 Important (Should-Have for Quality)

| Area | What to Do | Why |
|------|-----------|-----|
| **Real AI Integration** | Replace the mock AI routes with calls to **OpenAI GPT-4**, **Google Gemini**, or **Anthropic Claude** APIs. Use proper prompt engineering for resume tailoring, ATS scoring, and cover letter generation. | The mock endpoints are placeholders — real AI is the core value proposition. |
| **PDF Export** | Add a `/api/resumes/:id/pdf` endpoint using **Puppeteer**, **Playwright**, or **html-pdf-node** to render the HTML template to PDF. | Users expect to download their resume as a PDF. |
| **File Uploads** | Integrate **Multer** + cloud storage (AWS S3, Cloudinary, GCS) for profile photos and portfolio images. | Currently there's no support for images or file attachments. |
| **Email Verification** | Send a verification email on registration using **Nodemailer** + **SendGrid/Resend**. | Prevents fake accounts and improves trust. |
| **Password Reset** | Add forgot-password and reset-password endpoints with time-limited tokens. | Standard user expectation. |
| **Logging** | Replace `console.log`/`console.error` with **Winston** or **Pino** structured logging. | Proper log levels, file rotation, and cloud log integration. |
| **Testing** | Add unit tests (**Jest**) for models and integration tests (**Supertest**) for routes. | Catch regressions before they reach users. |
| **API Versioning** | Prefix routes with `/api/v1/` to allow future breaking changes without disrupting existing clients. | Future-proofs the API. |

### 🟢 Nice-to-Have (Growth & Polish)

| Area | What to Do | Why |
|------|-----------|-----|
| **Real-Time Collaboration** | Add **Socket.IO** for live collaborative editing of resumes. | Differentiator feature. |
| **Template Marketplace** | Let users submit and browse community-created templates with ratings and categories. | Community engagement + potential monetization. |
| **Analytics Dashboard** | Track ATS scores over time, resume views, download counts per user. | Adds value and retention. |
| **OAuth / Social Login** | Add Google, GitHub, LinkedIn sign-in via **Passport.js**. | Reduces friction for new users. |
| **Subscription & Payments** | Integrate **Stripe** for premium features (unlimited AI generations, premium templates). | Monetization path. |
| **CI/CD Pipeline** | Set up GitHub Actions for automated testing, linting, and deployment. | Reduces manual deployment errors. |
| **Docker** | Add a `Dockerfile` and `docker-compose.yml` for consistent environments. | Makes deployment reproducible. |
| **API Documentation** | Add **Swagger/OpenAPI** docs using `swagger-jsdoc` + `swagger-ui-express`. | Makes the API self-documenting for frontend devs. |
| **Internationalization** | Support multiple languages for AI-generated content and templates. | Expands market reach globally. |

### Suggested Deployment Platforms

| Platform | Cost | Best For |
|----------|------|----------|
| **Render** | Free tier available | Quick MVP deployment |
| **Railway** | ~$5/mo | Simple Node.js hosting with DB add-ons |
| **Vercel** (serverless) | Free tier | If you refactor to serverless functions |
| **AWS EC2 / ECS** | Pay-as-you-go | Full control, scalable |
| **DigitalOcean App Platform** | $5/mo | Simple PaaS |

---

## npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node server.js` | Start production server |
| `dev` | `nodemon server.js` | Start dev server with auto-reload |
| `seed` | `node seed/seed.js` | Seed the database with a sample template |

---

## License

This project is part of the **MockB CV Builder** application.
