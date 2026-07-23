const { readDB, writeDB } = require('../config/jsonDB');
const { v4: uuidv4 } = require('uuid');

class Resume {
    static findAll(userId) {
        const db = readDB();
        return db.resumes.filter(r => r.userId === userId);
    }

    static findById(id) {
        const db = readDB();
        return db.resumes.find(r => r.id === id);
    }

    static create(userId, resumeData) {
        const db = readDB();
        const newResume = {
            id: uuidv4(),
            userId,
            ...resumeData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        db.resumes.push(newResume);
        writeDB(db);
        return newResume;
    }

    static update(id, userId, updateData) {
        const db = readDB();
        const index = db.resumes.findIndex(r => r.id === id && r.userId === userId);
        if (index === -1) return null;
        
        db.resumes[index] = { ...db.resumes[index], ...updateData, updatedAt: new Date().toISOString() };
        writeDB(db);
        return db.resumes[index];
    }
    
    static delete(id, userId) {
        const db = readDB();
        const index = db.resumes.findIndex(r => r.id === id && r.userId === userId);
        if (index === -1) return null;
        
        const deleted = db.resumes.splice(index, 1);
        writeDB(db);
        return deleted[0];
    }
}

module.exports = Resume;
