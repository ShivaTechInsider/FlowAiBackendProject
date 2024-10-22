const db = require('../db');

// Add a new transaction
function addTransaction(transaction, userId, callback) {
    const sql = `
    INSERT INTO transactions (type, category_id, amount, date, description, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    db.run(sql, [transaction.type, transaction.category_id, transaction.amount, transaction.date, transaction.description, userId], callback);
}

// Retrieve all transactions for a user
function getTransactions(userId, callback) {
    const sql = 'SELECT * FROM transactions WHERE user_id = ?';
    db.all(sql, [userId], callback);
}

// Retrieve a transaction by ID
function getTransactionById(transactionId, userId, callback) {
    const sql = 'SELECT * FROM transactions WHERE id = ? AND user_id = ?';
    db.get(sql, [transactionId, userId], callback);
}

// Update a transaction
function updateTransaction(transactionId, userId, transaction, callback) {
    const sql = `
    UPDATE transactions
    SET type = ?, category_id = ?, amount = ?, date = ?, description = ?
    WHERE id = ? AND user_id = ?
  `;
    db.run(sql, [transaction.type, transaction.category_id, transaction.amount, transaction.date, transaction.description, transactionId, userId], callback);
}

// Delete a transaction
function deleteTransaction(transactionId, userId, callback) {
    const sql = 'DELETE FROM transactions WHERE id = ? AND user_id = ?';
    db.run(sql, [transactionId, userId], callback);
}

module.exports = {
    addTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
};