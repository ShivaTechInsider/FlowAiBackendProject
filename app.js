const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware/auth');
const app = express();
const db = require('./db'); // Initialize the database

app.use(bodyParser.json());

// Public routes for authentication
app.use('/api', authRoutes);

// Protected routes for transactions and categories
app.use('/api', authenticateToken, transactionRoutes);
app.use('/api', authenticateToken, categoryRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});