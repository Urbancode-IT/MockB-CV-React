const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/ai/generate-resume
// @desc    Generate a mock resume based on JD
// @access  Private
router.post('/generate-resume', authMiddleware, (req, res) => {
    try {
        const { jobDescription, currentResume } = req.body;
        // Mock AI response
        res.json({
            summary: 'A highly motivated and adaptable professional with a proven track record, tailored for the provided Job Description.',
            skills: ['Tailored Skill 1', 'Tailored Skill 2', 'Industry Standard Tool'],
            experience: currentResume?.experience || [
                {
                    id: 'ai-mock-1',
                    company: 'AI Generated Corp',
                    role: 'Target Role',
                    start: '01/2020',
                    end: 'Present',
                    description: 'Successfully aligned with the key requirements of the target job description, delivering measurable results.'
                }
            ]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/ai/check-ats
// @desc    Check ATS score of a resume against JD
// @access  Private
router.post('/check-ats', authMiddleware, (req, res) => {
    try {
        const { jobDescription, resumeData } = req.body;
        // Mock ATS score
        const score = Math.floor(Math.random() * (95 - 70 + 1)) + 70; // random between 70 and 95
        res.json({
            score,
            feedback: [
                'Consider adding more keywords from the Job Description.',
                'Your experience section is well formatted.',
                'Ensure your contact information is up to date.'
            ]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/ai/generate-cover-letter
// @desc    Generate a mock cover letter based on JD
// @access  Private
router.post('/generate-cover-letter', authMiddleware, (req, res) => {
    try {
        const { jobDescription, resumeData } = req.body;
        // Mock AI response
        res.json({
            content: `Dear Hiring Manager,\n\nI am writing to express my strong interest in the open position as described in your recent job posting. With my background in the relevant industry and my proven track record of success, I am confident that I would make a valuable addition to your team.\n\nThank you for your time and consideration. I look forward to discussing my qualifications further.\n\nSincerely,\nApplicant`
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
