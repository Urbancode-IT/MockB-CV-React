/**
 * Map backend AI resume response into the frontend resume store shape.
 */
export function mapAiResumeToStore(aiData, parsedData) {
    const experience = (aiData?.experience || []).map((exp, i) => ({
        id: `exp-ai-${i}`,
        company: exp.company || exp.employer || 'Company',
        role: exp.role || exp.title || 'Role',
        start: exp.start || '',
        end: exp.end || 'Present',
        description: Array.isArray(exp.bullets)
            ? exp.bullets.join('\n')
            : (exp.description || ''),
    }));

    return {
        ...parsedData,
        summary: aiData?.summary || parsedData.summary,
        skills: aiData?.skills?.length ? aiData.skills : parsedData.skills,
        experience: experience.length ? experience : parsedData.experience,
    };
}

/**
 * Map backend ATS check response into ResumeATSScoreChecker UI state.
 */
export function mapAtsResponseToUI(atsData) {
    const score = atsData?.score ?? 0;
    const strengths = (atsData?.strengths || []).map((text, i) => ({
        name: text,
        tip: 'Strength identified by AI analysis',
        score: Math.min(100, score + 10 - i * 2),
    }));

    const weaknesses = (atsData?.missingKeywords || atsData?.feedback || []).map((text, i) => ({
        name: typeof text === 'string' ? text : 'Improvement area',
        tip: 'Consider adding this to improve your ATS match',
        score: Math.max(20, score - 15 - i * 3),
    }));

    const metrics = {
        keyword_match: Math.min(100, score + 5),
        skills_match: Math.min(100, score),
        ats_parse: Math.min(100, score + 3),
        impact: Math.min(100, score - 5),
        formatting: Math.min(100, score + 2),
        summary: Math.min(100, score - 3),
        grammar: Math.min(100, score - 2),
        spelling: Math.min(100, score - 1),
        bullets: Math.min(100, score - 4),
        length: Math.min(100, score),
        projects: Math.min(100, score - 6),
        certs: Math.min(100, score - 8),
        repetition: Math.min(100, score - 5),
    };

    return { score, strengths, weaknesses, metrics };
}

export const readFileAsText = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result || '');
        reader.onerror = reject;
        reader.readAsText(file);
    });
