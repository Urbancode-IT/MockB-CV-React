const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data.json');

// Initialize DB if it doesn't exist
const initDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        const initialData = {
            users: [],
            resumes: [],
            coverLetters: [],
            portfolios: [],
            templates: []
        };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
};

const readDB = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading DB:', error);
        return null;
    }
};

const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing DB:', error);
        return false;
    }
};

module.exports = {
    initDB,
    readDB,
    writeDB
};
