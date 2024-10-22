const express = require('express');
const categoryModel = require('../models/categories');
const router = express.Router();

// GET /categories: Retrieve all categories
router.get('/categories', (req, res) => {
    categoryModel.getCategories((err, categories) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(categories);
    });
});

// POST /categories: Add a new category
router.post('/categories', (req, res) => {
    const { name, type } = req.body;
    categoryModel.addCategory(name, type, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Category added successfully' });
    });
});

// DELETE /categories/:id: Delete a category
router.delete('/categories/:id', (req, res) => {
    const categoryId = req.params.id;
    categoryModel.deleteCategory(categoryId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Category deleted successfully' });
    });
});

module.exports = router;