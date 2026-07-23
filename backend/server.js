const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDB } = require('./config/jsonDB');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize JSON DB
initDB();

// Routes
const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/templates');
const resumeRoutes = require('./routes/resumes');
const coverLetterRoutes = require('./routes/coverLetters');
const portfolioRoutes = require('./routes/portfolios');
const aiRoutes = require('./routes/ai');

app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/cover-letters', coverLetterRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => res.send('CV Backend API is running with JSON DB'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
