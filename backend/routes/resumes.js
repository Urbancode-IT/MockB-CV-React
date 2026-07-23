const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/resumes
// @desc    Get all user resumes
// @access  Private
router.get('/', authMiddleware, (req, res) => {
    try {
        const resumes = Resume.findAll(req.user.id);
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/resumes/:id
// @desc    Get a specific resume
// @access  Private
router.get('/:id', authMiddleware, (req, res) => {
    try {
        const resume = Resume.findById(req.params.id);
        if (!resume || resume.userId !== req.user.id) {
            return res.status(404).json({ msg: 'Resume not found' });
        }
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/resumes
// @desc    Create a new resume
// @access  Private
router.post('/', authMiddleware, (req, res) => {
    try {
        const newResume = Resume.create(req.user.id, req.body);
        res.json(newResume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/resumes/:id
// @desc    Update a resume
// @access  Private
router.put('/:id', authMiddleware, (req, res) => {
    try {
        const updatedResume = Resume.update(req.params.id, req.user.id, req.body);
        if (!updatedResume) {
            return res.status(404).json({ msg: 'Resume not found or unauthorized' });
        }
        res.json(updatedResume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/resumes/:id
// @desc    Delete a resume
// @access  Private
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const deleted = Resume.delete(req.params.id, req.user.id);
        if (!deleted) {
            return res.status(404).json({ msg: 'Resume not found or unauthorized' });
        }
        res.json({ msg: 'Resume deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
