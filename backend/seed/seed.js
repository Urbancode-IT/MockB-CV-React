const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { initDB } = require('../config/jsonDB');
const Template = require('../models/Template');

async function run() {
  // Initialize the JSON DB (creates data.json if missing)
  initDB();
  console.log('JSON DB initialized for seeding');

  const html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

  // Check if a template with this title already exists
  const allTemplates = Template.findAll();
  const existing = allTemplates.find(t => t.title === 'Modern Resume');

  if (existing) {
    console.log('Template already exists, updating...');
    const updated = Template.update(existing.id, {
      htmlContent: html,
      description: 'A modern, ATS-friendly resume template.',
    });
    console.log('Updated template:', updated.id);
  } else {
    const tpl = Template.create({
      title: 'Modern Resume',
      description: 'A modern, ATS-friendly resume template.',
      htmlContent: html,
      tags: ['modern', 'ats', 'simple'],
    });
    console.log('Seeded template:', tpl.id);
  }

  console.log('Seeding complete!');
  process.exit(0);
}

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
