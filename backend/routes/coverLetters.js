const express = require('express');
const router = express.Router();
const CoverLetter = require('../models/CoverLetter');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/cover-letters
// @desc    Get all user cover letters
// @access  Private
router.get('/', authMiddleware, (req, res) => {
    try {
        const items = CoverLetter.findAll(req.user.id);
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/cover-letters/:id
// @desc    Get a specific cover letter
// @access  Private
router.get('/:id', authMiddleware, (req, res) => {
    try {
        const item = CoverLetter.findById(req.params.id);
        if (!item || item.userId !== req.user.id) {
            return res.status(404).json({ msg: 'Cover letter not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/cover-letters
// @desc    Create a new cover letter
// @access  Private
router.post('/', authMiddleware, (req, res) => {
    try {
        const newItem = CoverLetter.create(req.user.id, req.body);
        res.json(newItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/cover-letters/:id
// @desc    Update a cover letter
// @access  Private
router.put('/:id', authMiddleware, (req, res) => {
    try {
        const updatedItem = CoverLetter.update(req.params.id, req.user.id, req.body);
        if (!updatedItem) {
            return res.status(404).json({ msg: 'Cover letter not found or unauthorized' });
        }
        res.json(updatedItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/cover-letters/:id
// @desc    Delete a cover letter
// @access  Private
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const deleted = CoverLetter.delete(req.params.id, req.user.id);
        if (!deleted) {
            return res.status(404).json({ msg: 'Cover letter not found or unauthorized' });
        }
        res.json({ msg: 'Cover letter deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
