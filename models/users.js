const db = require('../db');
const bcrypt = require('bcryptjs');

// Register a new user
function registerUser(username, password, callback) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.run(sql, [username, hashedPassword], callback);
    });
}

// Authenticate user by checking credentials
function authenticateUser(username, password, callback) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.get(sql, [username], (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(null, null);

        // Compare the hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return callback(err);
            if (isMatch) return callback(null, user);
            callback(null, null); // Password does not match
        });
    });
}

module.exports = {
    registerUser,
    authenticateUser,
};