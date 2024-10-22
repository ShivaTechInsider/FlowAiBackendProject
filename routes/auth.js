const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const router = express.Router();

const JWT_SECRET = 'your_secret_key'; // Use a secure key in production

// POST /register: Register a new user
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    userModel.registerUser(username, password, (err) => {
        if (err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                return res.status(400).json({ error: 'Username already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// POST /login: Authenticate user and return JWT
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    userModel.authenticateUser(username, password, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: 'Invalid username or password' });

        // Generate JWT
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
});

module.exports = router;