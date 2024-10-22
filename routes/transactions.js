const express = require('express');
const transactionModel = require('../models/transactions');
const router = express.Router();

// POST /transactions: Add a new transaction
router.post('/transactions', (req, res) => {
    const transaction = req.body;
    const userId = req.user.id;
    transactionModel.addTransaction(transaction, userId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Transaction added successfully' });
    });
});

// GET /transactions: Retrieve all transactions
router.get('/transactions', (req, res) => {
    const userId = req.user.id;
    transactionModel.getTransactions(userId, (err, transactions) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(transactions);
    });
});

// GET /transactions/:id: Retrieve a transaction by ID
router.get('/transactions/:id', (req, res) => {
    const transactionId = req.params.id;
    const userId = req.user.id;
    transactionModel.getTransactionById(transactionId, userId, (err, transaction) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    });
});

// PUT /transactions/:id: Update a transaction by ID
router.put('/transactions/:id', (req, res) => {
    const transactionId = req.params.id;
    const transaction = req.body;
    const userId = req.user.id;
    transactionModel.updateTransaction(transactionId, userId, transaction, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Transaction updated successfully' });
    });
});

// DELETE /transactions/:id: Delete a transaction by ID
router.delete('/transactions/:id', (req, res) => {
    const transactionId = req.params.id;
    const userId = req.user.id;
    transactionModel.deleteTransaction(transactionId, userId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Transaction deleted successfully' });
    });
});

module.exports = router;