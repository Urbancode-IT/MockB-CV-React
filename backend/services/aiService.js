const { GoogleGenAI } = require("@google/genai");
const ApiError = require("../utils/ApiError");

const getClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_google_gemini_api_key") {
        throw new ApiError(
            "Gemini API key is missing. Set a valid GEMINI_API_KEY in backend/.env",
            503
        );
    }

    return new GoogleGenAI({ apiKey });
};

// Prefer models that still have free-tier quota for new API keys
const MODEL_CANDIDATES = [
    "gemini-flash-latest",
    "gemini-2.0-flash",
    "gemini-2.0-flash-001",
];

/**
 * Parse Gemini JSON Response
 */
const parseJSON = (text) => {
    try {
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);
    } catch (err) {
        throw new ApiError("Failed to parse AI response.", 502);
    }
};

/**
 * Map Google GenAI errors to readable API errors
 */
const wrapGeminiError = (err) => {
    const raw = err?.message || "";
    let parsed;

    try {
        parsed = JSON.parse(raw);
    } catch {
        parsed = null;
    }

    const googleMsg = parsed?.error?.message || raw;
    const reason = parsed?.error?.details?.[0]?.reason || "";

    if (
        reason === "API_KEY_INVALID" ||
        /API key not valid/i.test(googleMsg) ||
        /API_KEY_INVALID/i.test(raw)
    ) {
        return new ApiError(
            "Invalid Gemini API key. Update GEMINI_API_KEY in backend/.env with a real key from https://aistudio.google.com/apikey",
            503
        );
    }

    if (/quota|rate limit|RESOURCE_EXHAUSTED/i.test(googleMsg)) {
        return new ApiError("Gemini API quota exceeded. Try again later.", 429);
    }

    return new ApiError(googleMsg || "AI service failed", 502);
};

/**
 * Generate AI Response (tries multiple models if quota/model unavailable)
 */
const generateAIResponse = async (prompt, expectJSON = true) => {
    const ai = getClient();
    let lastError;

    for (const model of MODEL_CANDIDATES) {
        try {
            const response = await ai.models.generateContent({
                model,
                contents: prompt,
            });

            const text = (response.text || "").trim();

            if (!text) {
                throw new ApiError("Empty response from AI.", 502);
            }

            return expectJSON ? parseJSON(text) : text;
        } catch (err) {
            if (err instanceof ApiError && err.statusCode !== 502) throw err;
            lastError = err;

            const raw = err?.message || "";
            const isQuota =
                /RESOURCE_EXHAUSTED|quota|rate limit/i.test(raw);
            const isMissing =
                /NOT_FOUND|no longer available|is not found/i.test(raw);

            // Try next model when this one is blocked / gone
            if (isQuota || isMissing) continue;
            throw wrapGeminiError(err);
        }
    }

    throw wrapGeminiError(lastError || new Error("All Gemini models failed"));
};

/**
 * Generate ATS Optimized Resume
 */
exports.generateResume = async ({ jobDescription, currentResume }) => {
    const prompt = `
You are an expert ATS Resume Writer with years of experience helping candidates get shortlisted.

Your task is to optimize the candidate's resume according to the job description.

IMPORTANT RULES

1. NEVER invent companies.
2. NEVER invent work experience.
3. NEVER invent projects.
4. NEVER invent job titles.
5. NEVER invent dates.
6. NEVER remove existing experience.
7. Rewrite existing experience using stronger ATS keywords.
8. Improve grammar and readability.
9. Add relevant technical skills ONLY if they are clearly related to the candidate's existing experience.
10. If no experience exists, return an empty experience array.
11. Return ONLY valid JSON.
12. Do not use markdown.

Job Description

${jobDescription}

Current Resume

${JSON.stringify(currentResume)}

Return JSON only.

{
  "summary":"",
  "skills":[],
  "experience":[]
}
`;

    return await generateAIResponse(prompt);
};

/**
 * ATS Resume Checker
 */
exports.checkATS = async ({ jobDescription, resumeData }) => {
    const prompt = `
You are an ATS Resume Scanner.

Compare the resume with the Job Description.

Give an ATS score between 0 and 100.

Provide practical suggestions to improve the score.

Do not invent information.

Job Description

${jobDescription}

Resume

${JSON.stringify(resumeData)}

Return ONLY JSON.

{
    "score":85,
    "matchedKeywords":[
        ""
    ],
    "missingKeywords":[
        ""
    ],
    "strengths":[
        ""
    ],
    "feedback":[
        ""
    ]
}
`;

    return await generateAIResponse(prompt);
};

/**
 * Cover Letter Generator
 */
exports.generateCoverLetter = async ({ jobDescription, resumeData }) => {
    const prompt = `
You are a professional HR Recruiter.

Generate a professional cover letter.

Candidate Resume

${JSON.stringify(resumeData)}

Job Description

${jobDescription}

Rules

- Professional tone
- 300-400 words
- Personalized
- Mention candidate strengths
- Mention matching skills
- Don't invent achievements
- Don't invent companies
- No markdown
- Return only the cover letter text.
`;

    const content = await generateAIResponse(prompt, false);

    return {
        content,
    };
};
