const { readDB, writeDB } = require('../config/jsonDB');
const { v4: uuidv4 } = require('uuid');

class Template {
    static findAll() {
        const db = readDB();
        return db.templates;
    }

    static findById(id) {
        const db = readDB();
        return db.templates.find(t => t.id === id);
    }

    static create(templateData) {
        const db = readDB();
        const newTemplate = {
            id: uuidv4(),
            ...templateData,
            tags: templateData.tags || [],
            createdAt: new Date().toISOString()
        };
        db.templates.push(newTemplate);
        writeDB(db);
        return newTemplate;
    }

    static update(id, updateData) {
        const db = readDB();
        const index = db.templates.findIndex(t => t.id === id);
        if (index === -1) return null;
        
        db.templates[index] = { ...db.templates[index], ...updateData };
        writeDB(db);
        return db.templates[index];
    }
    
    static delete(id) {
        const db = readDB();
        const index = db.templates.findIndex(t => t.id === id);
        if (index === -1) return null;
        
        const deleted = db.templates.splice(index, 1);
        writeDB(db);
        return deleted[0];
    }
}

module.exports = Template;
