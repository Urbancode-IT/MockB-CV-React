const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/portfolios
// @desc    Get all user portfolios
// @access  Private
router.get('/', authMiddleware, (req, res) => {
    try {
        const items = Portfolio.findAll(req.user.id);
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/portfolios/:id
// @desc    Get a specific portfolio
// @access  Private
router.get('/:id', authMiddleware, (req, res) => {
    try {
        const item = Portfolio.findById(req.params.id);
        if (!item || item.userId !== req.user.id) {
            return res.status(404).json({ msg: 'Portfolio not found' });
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/portfolios
// @desc    Create a new portfolio
// @access  Private
router.post('/', authMiddleware, (req, res) => {
    try {
        const newItem = Portfolio.create(req.user.id, req.body);
        res.json(newItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/portfolios/:id
// @desc    Update a portfolio
// @access  Private
router.put('/:id', authMiddleware, (req, res) => {
    try {
        const updatedItem = Portfolio.update(req.params.id, req.user.id, req.body);
        if (!updatedItem) {
            return res.status(404).json({ msg: 'Portfolio not found or unauthorized' });
        }
        res.json(updatedItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/portfolios/:id
// @desc    Delete a portfolio
// @access  Private
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const deleted = Portfolio.delete(req.params.id, req.user.id);
        if (!deleted) {
            return res.status(404).json({ msg: 'Portfolio not found or unauthorized' });
        }
        res.json({ msg: 'Portfolio deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
