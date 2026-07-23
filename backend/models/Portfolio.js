const { readDB, writeDB } = require('../config/jsonDB');
const { v4: uuidv4 } = require('uuid');

class Portfolio {
    static findAll(userId) {
        const db = readDB();
        return db.portfolios.filter(p => p.userId === userId);
    }

    static findById(id) {
        const db = readDB();
        return db.portfolios.find(p => p.id === id);
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
        db.portfolios.push(newItem);
        writeDB(db);
        return newItem;
    }

    static update(id, userId, updateData) {
        const db = readDB();
        const index = db.portfolios.findIndex(p => p.id === id && p.userId === userId);
        if (index === -1) return null;
        
        db.portfolios[index] = { ...db.portfolios[index], ...updateData, updatedAt: new Date().toISOString() };
        writeDB(db);
        return db.portfolios[index];
    }
    
    static delete(id, userId) {
        const db = readDB();
        const index = db.portfolios.findIndex(p => p.id === id && p.userId === userId);
        if (index === -1) return null;
        
        const deleted = db.portfolios.splice(index, 1);
        writeDB(db);
        return deleted[0];
    }
}

module.exports = Portfolio;
