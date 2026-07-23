const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// GET /api/templates - list all templates
router.get('/', (req, res) => {
  try {
    const templates = Template.findAll();
    // Exclude htmlContent for list view to save bandwidth
    const templatesWithoutHtml = templates.map(t => {
      const { htmlContent, ...rest } = t;
      return rest;
    });
    res.json(templatesWithoutHtml);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/templates/:id - get template metadata and content
router.get('/:id', (req, res) => {
  try {
    const tpl = Template.findById(req.params.id);
    if (!tpl) return res.status(404).json({ message: 'Template not found' });
    res.json(tpl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/templates/:id/html - return template HTML
router.get('/:id/html', (req, res) => {
  try {
    const tpl = Template.findById(req.params.id);
    if (!tpl) return res.status(404).send('Template not found');
    res.set('Content-Type', 'text/html');
    res.send(tpl.htmlContent || '');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST /api/templates - create a new template
router.post('/', (req, res) => {
  try {
    const { title, description, htmlContent, tags } = req.body;
    const tpl = Template.create({ title, description, htmlContent, tags });
    res.status(201).json(tpl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
