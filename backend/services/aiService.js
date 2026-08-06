const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = "gemini-3.6-flash";

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
        throw new Error("Failed to parse AI response.");
    }
};

/**
 * Generate AI Response
 */
const generateAIResponse = async (prompt, expectJSON = true) => {

    const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
    });

    const text = response.text.trim();

    return expectJSON ? parseJSON(text) : text;
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