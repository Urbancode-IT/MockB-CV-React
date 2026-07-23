const { readDB, writeDB } = require('../config/jsonDB');
const { v4: uuidv4 } = require('uuid');

class User {
    static findAll() {
        const db = readDB();
        return db.users;
    }

    static findById(id) {
        const db = readDB();
        return db.users.find(u => u.id === id);
    }

    static findByEmail(email) {
        const db = readDB();
        return db.users.find(u => u.email === email);
    }

    static create(userData) {
        const db = readDB();
        const newUser = {
            id: uuidv4(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        db.users.push(newUser);
        writeDB(db);
        return newUser;
    }

    static update(id, updateData) {
        const db = readDB();
        const index = db.users.findIndex(u => u.id === id);
        if (index === -1) return null;
        
        db.users[index] = { ...db.users[index], ...updateData, updatedAt: new Date().toISOString() };
        writeDB(db);
        return db.users[index];
    }
}

module.exports = User;
