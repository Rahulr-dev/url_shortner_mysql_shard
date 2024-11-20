const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const config = require('../config');

const router = express.Router();

// Database connection for authentication
const authDb = mysql.createPool(config.metadataDb);

// Secret key for JWT
const JWT_SECRET = config.jwtSecret;

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await authDb.query('INSERT INTO users (username, password) VALUES (?, ?)', [
            username,
            hashedPassword,
        ]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login an existing user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await authDb.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
