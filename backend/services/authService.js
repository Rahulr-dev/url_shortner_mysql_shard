const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const config = require('../config');

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Database connection for authentication
const authDb = mysql.createPool(config.metadataDb);

/**
 * Register a new user.
 * @param {string} username - The username of the new user.
 * @param {string} password - The plain text password of the new user.
 * @returns {Promise<string>} A success message.
 */
async function registerUser(username, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await authDb.query('INSERT INTO users (username, password) VALUES (?, ?)', [
            username,
            hashedPassword,
        ]);

        return 'User registered successfully';
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error('Username already exists');
        }
        throw error;
    }
}

/**
 * Authenticate a user by validating the username and password.
 * @param {string} username - The username of the user.
 * @param {string} password - The plain text password of the user.
 * @returns {Promise<string>} A JWT token if authentication is successful.
 */
async function authenticateUser(username, password) {
    try {
        const [rows] = await authDb.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            throw new Error('Invalid username or password');
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid username or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw error;
    }
}

/**
 * Verify the authenticity of a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {Promise<object>} Decoded token data if valid.
 */
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(new Error('Invalid token'));
            } else {
                resolve(decoded);
            }
        });
    });
}

module.exports = { registerUser, authenticateUser, verifyToken };
