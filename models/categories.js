const db = require('../db');

// Get all categories
function getCategories(callback) {
    const sql = 'SELECT * FROM categories';
    db.all(sql, [], callback);
}

// Add a new category
function addCategory(name, type, callback) {
    const sql = 'INSERT INTO categories (name, type) VALUES (?, ?)';
    db.run(sql, [name, type], callback);
}

// Delete a category
function deleteCategory(id, callback) {
    const sql = 'DELETE FROM categories WHERE id = ?';
    db.run(sql, [id], callback);
}

module.exports = {
    getCategories,
    addCategory,
    deleteCategory,
};