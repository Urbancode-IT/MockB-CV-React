const { readDB, writeDB } = require('../config/jsonDB');
const { v4: uuidv4 } = require('uuid');

class CoverLetter {
    static findAll(userId) {
        const db = readDB();
        return db.coverLetters.filter(c => c.userId === userId);
    }

    static findById(id) {
        const db = readDB();
        return db.coverLetters.find(c => c.id === id);
    }

    static create(userId, data) {
        const db = readDB();
        const newItem = {
            id: uuidv4(),
            userId,
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        db.coverLetters.push(newItem);
        writeDB(db);
        return newItem;
    }

    static update(id, userId, updateData) {
        const db = readDB();
        const index = db.coverLetters.findIndex(c => c.id === id && c.userId === userId);
        if (index === -1) return null;
        
        db.coverLetters[index] = { ...db.coverLetters[index], ...updateData, updatedAt: new Date().toISOString() };
        writeDB(db);
        return db.coverLetters[index];
    }
    
    static delete(id, userId) {
        const db = readDB();
        const index = db.coverLetters.findIndex(c => c.id === id && c.userId === userId);
        if (index === -1) return null;
        
        const deleted = db.coverLetters.splice(index, 1);
        writeDB(db);
        return deleted[0];
    }
}

module.exports = CoverLetter;
